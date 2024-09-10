/**
 * 대여사업자 통계
 *
 * date : 2023/08/17
 * author : 김경룡
 *
 */
(function (W, D, $) {
    'use strict';

    W.$statistics = W.$statistics || {};
    
    var toDayDate = new Date();
    var agoYearDate = new Date(toDayDate);
    	agoYearDate.setFullYear(toDayDate.getFullYear()-1);
    var areaDetailData = [];
    
    var accSd = [], accData = [];
    	
	var excelDetailData = null;
	
	/* 그리드 컬럼*/
	var gridAreaColumns = [
		{template: "#if(sdNm == '시도 합계') {#<span style='font-weight: bold;'>#: sdNm#</span>#"
				+ "} else {##: sdNm##}#", title: "시도", width: "150px", field: "sdNm"},
		{template: "#: sttsNormal#", title: "전체사업자수", width: "100px", field: "sttsNormal"},
		{template: "#: accession#", title: "가입사업자수", width: "100px", field: "accession"},
		{template: "#: accessionPer#", title: "가입비율(%)", width: "100px", field: "accessionPer"},
		{template: "#: sedan#", title: "승용차", width: "100px", field: "sedan"},
		{template: "#: van#", title: "승합차", width: "100px", field: "van"},
		{template: "#: special#", title: "특수차", width: "100px", field: "special"},
		{template: "#: conn#", title: "valued", width: "15%", field: "conn", hidden: "true"},
	];
	var gridAreaDetailColumns = [
		{template: "#: sggNm#", title: "<span style='font-weight: bold;'>시군구</span>", width: "150px", field: "sggNm"},
		{template: "#: sttsNormal#", title: "&nbsp;", width: "100px", field: "sttsNormal"},
		{template: "#: accession#", title: "&nbsp;", width: "100px", field: "accession"},
		{template: "#: accessionPer#", title: "&nbsp;", width: "100px", field: "accessionPer"},
		{template: "#: sedan#", title: "&nbsp;", width: "100px", field: "sedan"},
		{template: "#: van#", title: "&nbsp;", width: "100px", field: "van"},
		{template: "#: special#", title: "&nbsp;", width: "100px", field: "special"},
		{template: "#: conn#", title: "&nbsp;", width: "15%", field: "conn", hidden: "true"}
	];
	
    $(document).ready(function() {
        $statistics.ui.pageLoad();
    });
    
    $statistics.ui = {
        pageLoad : function() {
			
			var GAuthParams = {};
			if(authrtCd == 'G01') {
				GAuthParams = {
					"ctpvCd" : "not",
					"sggCd"  : "not"
				}
			} else {
				GAuthParams = {};
			}

			// 대여사업자 가입현황
			$statistics.ui.agencyAccessionChart(GAuthParams);
			
			// 대여사업자 현황 그리드
			ajax(true, contextPath + '/stts/totStts/agencyAreaGrid', 'body', '조회중입니다', GAuthParams, function(data) {
				areaDetailData = [];
				areaDetailData = data.agencyAreaDetailGrid;
				excelDetailData = data.agencyAreaDetailGrid;
				
				$statistics.ui.createAreaGrid(data.agencyAreaGrid);
			});
        },
        
		/* 대여사업자 가입현황 */
		createChartMulti: function(data) {
			var series = data.map(function(item) {
			    return {
			        type: "column",
			        data: [item.sttsNormal],
			        stack: false,
			        name: item.sdNm,
			        color: item.color,
			        overlay: { gradient: "none" },
			        border: { width: 0 },
			        axis: "stick"
			    };
			});
			
			$("#multi-chart").kendoChart({
				title: {text: ""},
                legend: {
					position: "bottom",
					labels: {
			            template: "#= series.name #", font: "20px sans-serif"
			        }
				},
                series: series,
				valueAxes: [
					{title: {text: "", font: "13px, Pretendard"}, name: "stick"}
				],
                tooltip: {
                	visible: true,
                    template: "#= series.name #: #= value +'건' #"
				}
			});
		},
		
		/*대여사업자 현황 지역별 그리드*/
		createAreaGrid: function(gridData) {
			var detailExportPromises = [];
			
			$("#grid01").kendoGrid({
                dataSource: gridData,
                columns: gridAreaColumns,
                navigatable: true,
                selectable: "row",
                editable: false,
				resizable: true,
				scrollable: true,
				height: "550px",
                sortable: true,
                detailInit: detailInit,
                dataBound: function() {
					detailExportPromises = [];
//					this.expandRow(this.tbody.find("tr.k-master-row").eq(1));  // 두번째 로우 확장
//					this.expandRow(this.tbody.find("tr.k-master-row").first());  // 첫번째 로우 확장
					$("#grid01 > tbody > tr:first-child > td.k-hierarchy-cell").css("visibility", "hidden");  // 확장 기능 제거
					$("#grid01 > tbody > tr:last-child > td.k-hierarchy-cell").css("visibility", "hidden");  // 확장 기능 제거
				},
//                pageable: { pageSize: 5, buttonCount: 5 },
//                noRecords: { template : "데이터가 없습니다." },
                toolbar: [{name: "excel", text:"다운로드"}],
                excel: { allPages: true },
				excelExport : function(e){
					if($("#grid01").data("kendoGrid").dataSource.total() == 0) {
						e.preventDefault();
						alert("데이터가 없어 다운로드를 할 수 없습니다.");
					} else {
//						e.workbook.fileName = "대여사업자현황.xlsx";
//						e.workbook.sheets[0].title = "대여사업자 현황";
						e.preventDefault();
	
					    var workbook = e.workbook;
					    var masterData = e.data;
					
					    detailExportPromises = [];
					
						for (var rowIndex = 0; rowIndex < masterData.length-1; rowIndex++) {
					    	exportChildData(masterData[rowIndex].conn, rowIndex);
						}
						
						var sheet = workbook.sheets[0];

					    // 시도 헤더
					    var sdHeader = {
					        background: "#303030", color: "#FFFFFF", bold: true
					    };
					    // 시도 데이터
					    var sdData = {
					        background: "#565656", color: "#FFFFFF", bold: true, borderTop: { color: "#000000", size: 2 }
					    };
					
					    // 헤더 행의 스타일 변경
					    var headerRow = sheet.rows[0];
					    for (var colIndex = 0; colIndex < headerRow.cells.length; colIndex++) {
					        Object.assign(headerRow.cells[colIndex], sdHeader);
					    }
					
					    // 나머지 행과 열에도 헤더 스타일 적용
					    for (var rowIndex = 1; rowIndex < sheet.rows.length-1; rowIndex++) {
					        var row = sheet.rows[rowIndex];
						    var rowEnd = sheet.rows[sheet.rows.length-1];
					        for (var colIndex = 0; colIndex < row.cells.length; colIndex++) {
					            Object.assign(row.cells[colIndex], sdData);
							    Object.assign(rowEnd.cells[colIndex], sdHeader);
					        }
					    }
					    
    					sheet.freezePane = { rowSplit: 1 };
    					
//    					for (var colIndex = 0; colIndex < 1; colIndex++) {
//						    for (var rowIndex = 0; rowIndex < sheet.rows.length; rowIndex++) {
//						        var cell = sheet.rows[rowIndex].cells[colIndex];
//						        Object.assign(cell, { background: "#303030" });
//						    }
//						}

					    $.when.apply(null, detailExportPromises).then(function() {
							var detailExports = $.makeArray(arguments);
							
					        detailExports.sort(function(a, b) {
					        	return a.masterRowIndex - b.masterRowIndex;
					        });
					
					        workbook.sheets[0].columns.unshift({
								width: 30
					        });
					
							workbook.sheets[0].rows[0].cells.unshift({background: "#303030"});
					        for (var i=1; i<workbook.sheets[0].rows.length; i++) {
						        i == workbook.sheets[0].rows.length-1 ? workbook.sheets[0].rows[i].cells.unshift({background: "#303030"})
						        : workbook.sheets[0].rows[i].cells.unshift({background: "#565656", borderTop: { color: "#000000", size: 2 }})
					        }
					
					        for (var i=detailExports.length-1; i>=0; i--) {
					        	var masterRowIndex = detailExports[i].masterRowIndex+1;
								var sheet = detailExports[i].sheet;
					
								for (var ci = 0; ci < sheet.rows.length; ci++) {
									if (sheet.rows[ci].cells[0].value) {
										sheet.rows[ci].cells.unshift({background: "#565656"});
									}
								}
					
					        	[].splice.apply(workbook.sheets[0].rows, [masterRowIndex + 1, 0].concat(sheet.rows));
					        }
					        
					        kendo.saveAs({
								dataURI: new kendo.ooxml.Workbook(workbook).toDataURL(),
								fileName: "대여사업자 현황.xlsx"
					        });
						});
					}
				}
			});
			
			function exportChildData(conn, rowIndex) {
				var dataSource = new kendo.data.DataSource({
					data : excelDetailData
				});
				dataSource.read();
				
			    var deferred = $.Deferred();
			
			    detailExportPromises.push(deferred);
			    dataSource.filter({ field: "conn", operator: "eq", value: conn});
			    
			    var exporter = new kendo.ExcelExporter({
					columns: [
			        	{title: "시군구", field: "sggNm"},
						{title: " ", field: "sttsNormal"},
						{title: " ", field: "accession"},
						{title: " ", field: "accessionPer"},
						{title: " ", field: "dedan"},
						{title: " ", field: "van"},
						{title: " ", field: "special"},
						{title: " ", field: "conn", hidden: "true"}
			        ],
					dataSource: dataSource
			    });
			
			    exporter.workbook().then(function(book, data) {
					deferred.resolve({
						masterRowIndex: rowIndex,
						sheet: book.sheets[0]
					});
			    });
			}
			
	        function detailInit(e) {
				var array = [];
				for(var i=0; i<areaDetailData.length; i++) {
					if(e.data.conn == areaDetailData[i].conn) {
						array.push(areaDetailData[i]);
					}
				}
				
				$("<div/>").appendTo(e.detailCell).kendoGrid({
		        	dataSource: array,
		            scrollable: false,
		            selectable: "row",
		            sortable: true,
		            pageable: true,
		            columns: gridAreaDetailColumns,
		            noRecords: { template : "데이터가 없습니다." },
		            excelExport: function(e) {
						e.preventDefault();
					}
				});
	        }
		},
		
		/**
		 * @name         : agencyAccessionChart
		 * @description  : 대여사업자 가입현황
		 * @date         : 2023.07.25
		 * @author       : 김경룡
		 */
		agencyAccessionChart: function(params) {
			ajax(false, contextPath + '/stts/totStts/agencyAccessionChart', 'body', '조회중입니다', params, function(data) {
				var randomColors = 
					[
						"#FF6F61", "#FFB347", "#FFD700", "#90EE90", "#87CEFA", "#FF69B4", "#BA55D3", "#32CD32", "#FFB6C1",
						"#FFA07A", "#98FB98", "#FFD700", "#40E0D0", "#9370DB", "#FFDAB9", "#7B68EE", "#FF1493", "#66CDAA"
					];
				    
				data.agencyAccessionChart.forEach(function(item, index) {
				    item.color = randomColors[index % randomColors.length];  // 색상 할당
				});
				
				$statistics.ui.createChartMulti(data.agencyAccessionChart);
			});
		}
	}
    
	$statistics.event = {
		excelDown: function(event) {
			if(event.target.closest("#areaGrid") != null) {
				$("#areaGrid").find(".k-grid-excel").click();
			}
		},
		
		/**
		 * @name         : ajaxSync
		 * @description  : ajax 동기통신 (csrf 토큰 포함)
		 * @date         : 2023.08.30
		 * @author       : 김경룡(modify)
		 */
		ajaxSync: function(isLodingBool, url, isLodingElement, beforeSendText, ajaxParam, fn_success, fn_complete) {
			isLodingElement = "body";
		    var loader = isLoading($(isLodingElement)[0], {
		        type: "overlay",
		        class : "fa fa-refresh fa-spin",
		        text: beforeSendText
		    });
		
		    if(beforeSendText != null){
		        if(beforeSendText.split('<br>').length > 1) {
		            beforeSendText = beforeSendText.split('<br>')[0]+"<br>"+beforeSendText.split('<br>')[1];
		        }
		    }
		
		    var header = $("meta[name='_csrf_header']").attr("content");
		    var token  = $("meta[name='_csrf']").attr("content");
		
		    $.ajax({
		        url : url,
		        type : 'POST',
				async: false,
		        contentType : "application/json",
		        data : JSON.stringify(ajaxParam),
		        dataType : "json",
		        beforeSend : function(xhr) {
		        	xhr.setRequestHeader(header, token);
		            if (isLodingBool) {
		                loader.loading();
		                $(".is-loading-text-wrapper").html(beforeSendText);
		            }
		        },
		        success : function(data) {
		            if(fn_success != null || fn_complete != undefined){
		                fn_success(data);
		            }
		        },
				error: function (request, status, error) {},
		        complete : function(xhr, status) {
		            if (isLodingBool) {loader.remove();}
		            $(".is-loading-element-overlay").remove();
		            if(fn_complete != null || fn_complete != undefined){fn_complete(xhr);}
		        }
		    });
		}
	};

}(window, document, jQuery));