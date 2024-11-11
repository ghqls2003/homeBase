/**
 * 대여사업자 통계
 *
 * date : 2024/09/17
 * author : 김경룡
 *
 */
(function (W, D, $) {
    'use strict';

    W.$statistics = W.$statistics || {};
    
    var toDayDate = new Date();
    var agoYearDate = new Date(toDayDate);
    	agoYearDate.setFullYear(toDayDate.getFullYear()-1);
    
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth()+1;
	month = month < 10 ? "0"+month : month;
	var day = now.getDate();
	var setDate = year+"-"+month+"-"+day;
	
	/* 그리드 컬럼*/
	// 대여사업자 현황
	var gridAreaColumns = [
		{template: "#if(sdNm == '시도 합계') {#<span style='font-weight: bold;'>#: sdNm#</span>#"
				+ "} else {##: sdNm##}#", title: "시도", width: "150px", field: "sdNm"},
		{template: "#: sttsNormal#", title: "전체사업자수", width: "100px", field: "sttsNormal"},
		{template: "#: accession#", title: "가입사업자수", width: "100px", field: "accession"},
		{template: "#: accessionPer#", title: "가입비율(%)", width: "100px", field: "accessionPer"},
		{template: "#: sedan#", title: "승용차", width: "100px", field: "sedan"},
		{template: "#: van#", title: "승합차", width: "100px", field: "van"},
		{template: "#: special#", title: "특수차", width: "100px", field: "special"},
		{template: "#: conn#", title: "valued", width: "15%", field: "conn", hidden: "true"}
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
	
	// 지자체별 가입 사용자 현황
	var gvAccColumns = [
		{template: "#if(ctpvNm == '시도 합계') {#<span style='font-weight: bold;'>#: ctpvNm#</span>#"
				+ "} else {##: ctpvNm##}#", title: "시도", width: "100px", field: "sdNm"},
		{template: "#: userCnt#", title: "사용자수", width: "110px", field: "userCnt"},
		{template: "#: loginCnt#", title: "접속건수", width: "110px", field: "loginCnt"},
		{template: "#: mnUseCnt#", title: "메뉴사용건수", width: "110px", field: "mnUseCnt"},
		{template: "#: loginAvg#", title: "평균접속건수", width: "110px", field: "loginAvg"},
		{template: "#: conn#", title: "valued", width: "15%", field: "conn", hidden: "true"}
	];
	var gvAccDetailColumns = [
		{template: "#: sggNm#", title: "<span style='font-weight: bold;'>시군구</span>", width: "100px", field: "sggNm"},
		{template: "#: userCnt#", title: "&nbsp;", width: "110px", field: "userCnt"},
		{template: "#: loginCnt#", title: "&nbsp;", width: "110px", field: "loginCnt"},
		{template: "#: mnUseCnt#", title: "&nbsp;", width: "110px", field: "mnUseCnt"},
		{template: "#: loginAvg#", title: "&nbsp;", width: "110px", field: "loginAvg"},
		{template: "#: conn#", title: "&nbsp;", width: "15%", field: "conn", hidden: "true"}
	];
	
	// 카쉐어링 업체 현황
	var carShareColumns = [
		{template: "#: rn#", title: "순번", width: "50px", field: "rn"},
		{template: "#if(se == '합계') {#<span style='font-weight: bold;'>#: se#</span>#"
				+ "} else {##: se##}#", title: "구분", width: "100px", field: "se"},
		{template: "#: coNm#", title: "회사명", width: "110px", field: "coNm"},
		{template: "#: regNoh#", title: "차량등록대수", width: "110px", field: "regNoh"},
		{template: "#: mbrCnt#", title: "회원수", width: "110px", field: "mbrCnt"},
		{template: "#: bsnoffice#", title: "영업소", width: "110px", field: "bsnoffice"},
		{template: "#: rsrvtnoffice#", title: "예약소", width: "110px", field: "rsrvtnoffice"},
		{template: "#: rmrk#", title: "비고", width: "15%", field: "rmrk"}
	];

	// 최초 로딩
	var loadCk = 0;
	
	// 접근 권한
	var authParams = {};
	
	/* 지자체별 가입 사용자 현황 동적 데이터 */
	var gvData = null, gvDetailData = null; 
	
	var detailParams = null;
	
    $(document).ready(function() {
		kendo.ui.progress($("body"), true);
		
		$("#nowTime").text(setDate);
        $statistics.ui.pageLoad();
        
        // 최초 로딩 제거
        var setLoad = setInterval(function() {
			if(loadCk >= 3) {
				kendo.ui.progress($("body"), false);
				clearInterval(setLoad);
			}
		})
		
		// 클릭 이벤트
		$statistics.event.setClickEvent();
    });
    
    $statistics.ui = {
        pageLoad : function() {
			
			// G 권한 파라미터 처리 해야함~~~~~!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			if(authrtCd == 'G01') {
				authParams = {
					"ctpvCd" : "not",
					"sggCd"  : "not"
				}
			} else {
				authParams = {};
			}
			
			// 대여사업자 현황 그리드
			ajax(true, contextPath + '/stts/totStts/agencyAreaGrid', 'body', '조회중입니다', authParams, function(data) {
				var grid1 = "#grid01";
				$statistics.kendo.createExpandGrid(grid1, gridAreaColumns, gridAreaDetailColumns, data.agencyAreaGrid, data.agencyAreaDetailGrid);
			});

			// 대여사업자 등록 현황
			$statistics.kendo.setChart(authParams);
			
			//  지자체별 가입 사용자 현황 권한 드롭다운
			ajax(true, contextPath + '/stts/totStts/authrt', 'body', '조회중입니다', authParams, function(data) {
				$("#auth").kendoDropDownList({
					optionLabel: "(전체)",
					dataTextField: "authrtNm",
					dataValueField: "authrtCd",
					dataSource: data
				});
			});
			
			// 지자체별 가입 사용자 현황
			ajax(true, contextPath + '/stts/totStts/gvAccUserGrid', 'body', '조회중입니다', authParams, function(data) {
				var grid2 = "#gvAccGrid";
				gvData = data.gvAccUserGrid;
				gvDetailData = data.gvAccUserDetailGrid;
				$statistics.kendo.createExpandGrid(grid2, gvAccColumns, gvAccDetailColumns, gvData, gvDetailData);
			});
			
			// 카쉐어링 업체 현황
			var gridId = "#carShareGrid";
			$statistics.kendo.createNrmGrid(gridId);
			
//			// 카쉐어링 업체 등록 지역 드롭다운
//			ajax(true, contextPath + '/stts/totStts/areaDrop', 'body', '조회중입니다', authParams, function(data) {
//				$("#areaDrop").kendoDropDownList({
//					optionLabel: "지역(선택)",
//					dataTextField: "ctpvNm",
//					dataValueField: "ctpvCd",
//					dataSource: data,
//					value: "ctpvNm"
//				});
//			});
        }        
	}
	
    $statistics.kendo = {	
		/* 확장 그리드 및 detailInit 공통 */
		createExpandGrid: function(gridId, gridColumn, detailColumn, gridData, detailData) {
			var detailExportPromises = [];
			
			$(gridId).kendoGrid({
                dataSource: gridData,
                columns: gridColumn,
                navigatable: true,
                selectable: "row",
                editable: false,
				resizable: true,
				scrollable: true,
				height: "550px",
                sortable: false,  // 문자열 FM으로 데이터 가져와서 솔팅 의미없음
                detailInit: detailInit,
                dataBound: function() {
					detailExportPromises = [];
//					this.expandRow(this.tbody.find("tr.k-master-row").eq(1));  // 두번째 로우 확장
//					this.expandRow(this.tbody.find("tr.k-master-row").first());  // 첫번째 로우 확장

					if($(gridId).data("kendoGrid").dataSource.total() == 2) {
						$(gridId+" > tbody > tr:first-child > td.k-hierarchy-cell").css("visibility", "hidden");  // 확장 기능 제거
					} else {
						$(gridId+" > tbody > tr:first-child > td.k-hierarchy-cell").css("visibility", "hidden");  // 확장 기능 제거
						$(gridId+" > tbody > tr:last-child > td.k-hierarchy-cell").css("visibility", "hidden");  // 확장 기능 제거
					}
					
					loadCk++;
					kendo.ui.progress($(gridId), false);
					kendo.ui.progress($("#areaGrid"), false);
				},
//                pageable: { pageSize: 5, buttonCount: 5 },
//                noRecords: { template : "데이터가 없습니다." },
                toolbar: [{name: "excel", text:"다운로드"}],
                excel: { allPages: true },
				excelExport : async function(e){
					if($(gridId).data("kendoGrid").dataSource.total() == 0) {
						e.preventDefault();
						alert("데이터가 없어 다운로드를 할 수 없습니다.");
					} else {
//						e.workbook.fileName = "대여사업자현황.xlsx";
//						e.workbook.sheets[0].title = "대여사업자 현황";
						e.preventDefault();
						
						var a_data = e.data;
						var accUrl = "/stts/totStts/excelDown";
						var success = await kendoExcelAOPAcc(a_data, accUrl);
						
						if(success) {
							
						    var workbook = e.workbook;
						    var masterData = e.data;
						
						    detailExportPromises = [];
						
							for (var rowIndex = 0; rowIndex < masterData.length-1; rowIndex++) {
						    	exportChildData(masterData[rowIndex].conn, rowIndex, gridId, detailData);
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
						        
						        if(gridId == "#grid01") {
									var ckNm = "";
									if($("#se1").is(":checked")) {
										ckNm = "(주사무소)";
									}
							        kendo.saveAs({
										dataURI: new kendo.ooxml.Workbook(workbook).toDataURL(),
										fileName: "대여사업자 현황"+ckNm+".xlsx"
							        });
								} else {
							        kendo.saveAs({
										dataURI: new kendo.ooxml.Workbook(workbook).toDataURL(),
										fileName: "지자체별 가입 사용자 현황.xlsx"
							        });
								}
							});
						}
					}
				}
			});
			
			function exportChildData(conn, rowIndex, gridId, detailData) {
				var dataSource = new kendo.data.DataSource({
					data : detailData
				});
				dataSource.read();
				
			    var deferred = $.Deferred();
			
			    detailExportPromises.push(deferred);
			    dataSource.filter({ field: "conn", operator: "eq", value: conn});
			    
			    if(gridId == "#grid01") {
				    var exporter = new kendo.ExcelExporter({
						columns: [
				        	{title: "시군구", field: "sggNm"},
							{title: " ", field: "sttsNormal"},
							{title: " ", field: "accession"},
							{title: " ", field: "accessionPer"},
							{title: " ", field: "sedan"},
							{title: " ", field: "van"},
							{title: " ", field: "special"},
							{title: " ", field: "conn", hidden: "true"}
				        ],
						dataSource: dataSource
				    });
				} else {
				    var exporter = new kendo.ExcelExporter({
						columns: [
				        	{title: "시군구", field: "sggNm"},
							{title: " ", field: "userCnt"},
							{title: " ", field: "loginCnt"},
							{title: " ", field: "mnUseCnt"},
							{title: " ", field: "loginAvg"},
							{title: " ", field: "conn", hidden: "true"}
				        ],
						dataSource: dataSource
				    });
				}
			
			    exporter.workbook().then(function(book, data) {
					deferred.resolve({
						masterRowIndex: rowIndex,
						sheet: book.sheets[0]
					});
			    });
			}
			
	        function detailInit(e) {
				var array = [];
				for(var i=0; i<detailData.length; i++) {
					if(e.data.conn == detailData[i].conn) {
						array.push(detailData[i]);
					}
				}
				
				$("<div/>").appendTo(e.detailCell).kendoGrid({
		        	dataSource: array,
		            scrollable: false,
		            selectable: "row",
		            sortable: false,  // 문자열 FM으로 데이터 가져와서 솔팅 의미없음
		            pageable: true,
		            columns: detailColumn,
		            noRecords: { template : "데이터가 없습니다." },
		            excelExport: function(e) {
						e.preventDefault();
					}
				});
	        }
		},
		
		/* 일반 그리드(카쉐어링 업체 현황) */
		createNrmGrid: function(gridId) {
			$(gridId).kendoGrid({
                dataSource: {
					data: null,
					transport: {
						read:{
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath+'/stts/totStts/carShareGrid',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total"
					},
					page: 1,
					pageSize: 10,
					serverPaging: false,
					serverSorting: false,
					autoBind: false
				},
                columns: carShareColumns,
                navigatable: true,
                selectable: "row",
                editable: false,
                pageable: {buttonCount: 5},
				resizable: true,
				scrollable: true,
//				height: "550px",
                sortable: false,  // 문자열 FM으로 데이터 가져와서 솔팅 의미없음
                dataBound: function() {
					loadCk++;
					kendo.ui.progress($(gridId), false);
				},
                noRecords: { template : "데이터가 없습니다." },
                toolbar: [{name: "excel", text:"다운로드"}],
                change: function(e) {
					detailParams = null;
					
					var row = e.sender.select();
					var dataItem = null;
					
					row.each(function() {
						var grid = $(gridId).data("kendoGrid");
						dataItem = grid.dataItem(this);
					});
					
					detailParams = {"detailSn": dataItem.sn};
					
					var param = {"detailSn": dataItem.sn};
					
					ajax(true, contextPath + '/stts/totStts/detailCarshare', 'body', '처리중입니다.', param, function(data) {
						$("#areaDropDetail").val(data.se);
						$("#cmpNmDetail").val(data.coNm);
						$("#regCarDetail").val(data.regNoh);
						$("#userCntDetail").val(data.mbrCnt);
						$("#bsnOffcCntDetail").val(data.bsnofficeCnt);
						$("#rsrvtnOffcCntDetail").val(data.rsrvtnofficeCnt);
						$("#bsnOffcDetail").val(data.bsnoffice);
						$("#rsrvtnOffcDetail").val(data.rsrvtnoffice);
						$("#rmrkDetail").val(data.rmrk);
					});
					
					$(".detail_popup").addClass("view");
					$("body").css("overflow", "hidden");
				},
                excel: { allPages: true },
				excelExport : async function(e){
					if($(gridId).data("kendoGrid").dataSource.total() == 0) {
						e.preventDefault();
						alert("데이터가 없어 다운로드를 할 수 없습니다.");
					} else {
						e.preventDefault();
						
						var a_data = e.data;
						var accUrl = "/stts/totStts/excelDown";
						var success = await kendoExcelAOPAcc(a_data, accUrl);
						
						if(success) {
							e.workbook.fileName = "카쉐어링 업체 현황.xlsx";
							e.workbook.sheets[0].title = "업체 현황";
							
							kendo.saveAs({
								dataURI: new kendo.ooxml.Workbook(e.workbook).toDataURL(),
				                   fileName: e.workbook.fileName
						    });
						}
					}
				}
			});
		},
		
		/* 대여사업자 등록 현황 차트 */
		createChartMulti: function(data) {
			var categories = data.map(function(item) {
			    return item.sdNm;
			});			
			var series = [{
		        type: "column",
		        data: data.map(function(item) { return item.sttsNormal; }),
		        stack: false,
		        name: "대여사업자 등록 현황",
		        color: "#00127B",
		        overlay: { gradient: "none" },
		        axis: "stick",
		        border: { width: 0 },
		        tooltip: {
                	visible: true,
                    template: "#= series.name #: #= value +'개소' #"
				}
		    }];
			var line_series = [{
		        type: "line",
		        data: data.map(function(item) { return item.accessionPer; }),
		        stack: false,
		        name: "가입비율",
		        color: "#FF8C00 ",
		        overlay: { gradient: "none" },
		        axis: "line",
		        border: { width: 0 },
		        tooltip: {
                	visible: true,
                    template: "#= series.name #: #= value +'%' #"
				}/*,
			    labels: {
			        visible: true,
			        template: "#= value + '%' #",  // 값을 원하는 형식으로 표시
			        font: "8px sans-serif",          // 글꼴 설정
			        position: "above"                 // 값의 위치를 바 위로 설정
			    }*/
		    }];
			
			$("#multi-chart").kendoChart({
				title: {text: ""},
                legend: {
					position: "bottom",
					labels: {
			            template: "#= series.name #", font: "20px sans-serif"
			        }
				},
                series: series.concat(line_series),
				valueAxes: [
					{title: {text: "대여사업자 등록현황"}, name: "stick"},
					{title: {text: "가입비율(%)", rotation: "90"}, name: "line"}
				],
				categoryAxis: {
		            categories: categories,
		            axisCrossingValues: [0, 20],
		            labels: {
			            rotation: 300
			        }
		        },
				chartArea: {
					height: 480
				},
				render: function() {
					loadCk++;
				}
			});
		},
		
		/* 차트 세팅 */
		setChart: function(key) {
			ajax(false, contextPath + '/stts/totStts/agencyAccessionChart', 'body', '조회중입니다', key, function(data) {
				var randomColors = 
					[
						"#FF6F61", "#FFB347", "#FFD700", "#90EE90", "#87CEFA", "#FF69B4", "#BA55D3", "#32CD32", "#FFB6C1",
						"#FFA07A", "#98FB98", "#FFD700", "#40E0D0", "#9370DB", "#FFDAB9", "#7B68EE", "#FF1493", "#66CDAA"
					];
						    
				data.agencyAccessionChart.forEach(function(item, index) {
					item.color = randomColors[index % randomColors.length];  // 색상 할당
				});
						
				$statistics.kendo.createChartMulti(data.agencyAccessionChart);
			});
		}
    }
    
	$statistics.event = {
		/* 클릭 이번트 핸들러 */
		setClickEvent: function() {
			// 등록 버튼
			$(".insertBtn").on("click", function() {
				$statistics.event.autoCompleteCoNm();
				$(".register_popup").addClass("view");
				$("body").css("overflow", "hidden");
			});
			
			/* 닫기, X 버튼 클릭 */
			// 등록 팝업
			$(".insertClose").on("click", function() {
				$("#areaDrop, #cmpNm, #bsnOffc, #rsrvtnOffc, #insertRmrk").val("");
				$("#regCar, #userCnt, #bsnOffcCnt, #rsrvtnOffcCnt").val(0);
				
				$(".register_popup").removeClass("view");
				$("body").css("overflow", "auto");
			});
			// 상세 팝업
			$(".detailClose").on("click", function() {
				$("#carShareGrid").data("kendoGrid").clearSelection();
				
				$(".detail_popup").removeClass("view");
				$("body").css("overflow", "auto");
			});
			// 주사무소만 보기
			$("#se1").change(function() {
				kendo.ui.progress($("#areaGrid"), true);
				
				$("#grid01").data("kendoGrid").destroy(); // Kendo Grid 인스턴스 파괴
				$("#areaGrid > div.k-grid.k-widget.k-grid-display-block").remove();
				$("#areaGrid").append(`
				    <table id="grid01">
				        <caption>대여사업자현황</caption>
				    </table>
				`);
				
				var key = {"checkBox": this.value};
				
				if($("#se1").is(":checked")) {
					ajax(true, contextPath + '/stts/totStts/agencyAreaGrid', 'body', '조회중입니다', key, function(data) {
						$statistics.kendo.createExpandGrid("#grid01", gridAreaColumns, gridAreaDetailColumns, data.agencyAreaGrid, data.agencyAreaDetailGrid);
					});
					$statistics.kendo.setChart(key);
				} else {
					ajax(true, contextPath + '/stts/totStts/agencyAreaGrid', 'body', '조회중입니다', {}, function(data) {
						$statistics.kendo.createExpandGrid("#grid01", gridAreaColumns, gridAreaDetailColumns, data.agencyAreaGrid, data.agencyAreaDetailGrid);
					});
					$statistics.kendo.setChart({});
				}
			})
		},
		
		excelDown: function(event) {
			if(event.target.closest("#areaGrid") != null) {
				$("#areaGrid").find(".k-grid-excel").click();
			} else if(event.target.closest("#gvAccession") != null) {
				$("#gvAccession").find(".k-grid-excel").click();
			} else if(event.target.closest("#carShare") != null) {
				$("#carShare").find(".k-grid-excel").click();
			}
		},
		
		autoCompleteCoNm: function() {
			ajax(false, contextPath + '/stts/totStts/selectCoNm', 'body', '처리중입니다.', {}, function(data) {
				$("#cmpNm").kendoAutoComplete({
	              filter: "contains",
					placeholder: '회사명을 입력하세요.',
					clearButton: false,
					dataTextField: "coNm",
			        dataSource: data,
					select: function(e) {
	                    var dataItem = this.dataItem(e.item.index());
	                    var coNm = dataItem ? dataItem.coNm : null;
	                    var sd = dataItem ? dataItem.sd : null;
						$("#cmpNm").val(coNm);
						$("#areaDrop").val(sd);
                	}
				}).data("kendoAutoComplete");
			});
		},
		
		gvAccSearch: function() {
			kendo.ui.progress($("#gvAccGrid"), true);
			authParams.authrt = $("#auth").val();
			ajax(true, contextPath + '/stts/totStts/gvAccUserGrid', 'body', '조회중입니다', authParams, function(data) {
				gvData = data.gvAccUserGrid;
				gvDetailData = data.gvAccUserDetailGrid;
				$("#gvAccGrid").data("kendoGrid").setDataSource(gvData);
			});
		},
		
		insertCarShare: function() {
			var params = {
				"area"					: $("#areaDrop").val(),
				"cmpNm"			: $("#cmpNm").val(),
				"regCar"				: $("#regCar").val(),
				"userCnt"			: $("#userCnt").val(),
				"bsnOffcCnt"		: $("#bsnOffcCnt").val(),
				"rsrvtnOffcCnt"	: $("#rsrvtnOffcCnt").val(),
				"bsnOffc"			: $("#bsnOffc").val(),
				"rsrvtnOffc"		: $("#rsrvtnOffc").val(),
				"rmrk"					: $("#insertRmrk").val()
			}
			
			var emCk = $statistics.event.dataEmptyCk(params);
			
			if (emCk) {
			    alert("정보를 입력 해주시기 바랍니다.");
			} else {
				ajax(true, contextPath + '/stts/totStts/insertCarShare', 'body', '조회중입니다', params, function(data) {
					if(data == 1) {
						alert("등록이 완료되었습니다.");
						$(".register_popup").removeClass("view");
						$("body").css("overflow", "auto");
						$("#carShareGrid").data("kendoGrid").dataSource.read();
					} else {
						alert("에러가 발생했습니다.");
					}
				});
			}
		},
		
		dataEmptyCk: function(params) {
			var allEmpty = Object.values(params).every(function(value) {
			    return value === null || (typeof value === 'string' && value.trim() === "") || (typeof value === 'number' && value === 0);
			});
			
			return allEmpty;
		},
		
		updateCarShare: function() {
			detailParams.area = $("#areaDropDetail").val();
			detailParams.cmpNm = $("#cmpNmDetail").val();
			detailParams.regCar = $("#regCarDetail").val();
			detailParams.userCnt = $("#userCntDetail").val();
			detailParams.bsnOffcCnt = $("#bsnOffcCntDetail").val();
			detailParams.rsrvtnOffcCnt = $("#rsrvtnOffcCntDetail").val();
			detailParams.bsnOffc = $("#bsnOffcDetail").val();
			detailParams.rsrvtnOffc = $("#rsrvtnOffcDetail").val();
			detailParams.rmrk = $("#rmrkDetail").val();
			
			var emCk = $statistics.event.dataEmptyCk(detailParams);
			
			if (emCk) {
			    alert("정보를 입력 해주시기 바랍니다.");
			} else {
				if(confirm("정보를 수정하시겠습니까?")) {
					ajax(true, contextPath + '/stts/totStts/updateCarShare', 'body', '조회중입니다', detailParams, function(data) {
						if(data == 1) {
							alert("수정이 완료되었습니다.");
							$(".detail_popup").removeClass("view");
							$("body").css("overflow", "auto");
							$("#carShareGrid").data("kendoGrid").dataSource.read();
						} else {
							alert("수정 중 에러가 발생했습니다.");
						}
					});
				}
			}
		}, 
		
		deleteCarShare: function() {
			if(confirm("삭제 하시겠습니까?")) {
				ajax(true, contextPath + '/stts/totStts/deleteCarShare', 'body', '조회중입니다', detailParams, function(data) {
					if(data ==1) {
						alert("삭제가 완료되었습니다.");
						$(".detail_popup").removeClass("view");
						$("body").css("overflow", "auto");
						$("#carShareGrid").data("kendoGrid").dataSource.read();
					} else {
						alert("삭제 중 에러가 발생했습니다.");
					}
				});
			}
		}
	};
}(window, document, jQuery));