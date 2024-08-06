/**
 * 대여차량 통계
 *
 * date : 2024/02/19
 * author : 김경룡
 *
 */
(function (W, D, $) {
    'use strict';

    W.$statistics = W.$statistics || {};
    
    var areaDetailData = [];
    	
	var excelDetailData = null;
	
	/* 그리드 컬럼*/
	var crprtnColumns = [
		{template: "#if(coNm == '합계') {#<span style='font-weight: bold;'>#: coNm#</span>#"
				+ "} else {##: coNm##}#", title: "법인명", width: "150px", field: "coNm"},
		{template: "#: sdn#", title: "승용", width: "100px", field: "sdn"},
		{template: "#: suv#", title: "승합", width: "100px", field: "suv"},
		{template: "#: etc#", title: "기타", width: "100px", field: "etc"},
		{template: "#: tot#", title: "차량합계", width: "120px", field: "tot"},
		{template: "#: crno#", title: "&nbsp;", width: "1px", field: "crno", hidden: "true"}
	];
	var gridAreaDetailColumns = [
		{template: "#: vin#", title: "차대번호", width: "150px", field: "vin"},
		{template: "#: vhclRegNo#", title: "차량등록번호", width: "120px", field: "vhclRegNo"},
		{template: "#: carmdl#", title: "차종", width: "100px", field: "carmdl"},
		{template: "#: mdlyr#", title: "연식", width: "100px", field: "mdlyr"},
		{template: "#: frstRegYmd#", title: "최초등록일자", width: "100px", field: "frstRegYmd"},
		{template: "#: expryYmd#", title: "만료일자", width: "100px", field: "expryYmd"},
		{template: "#: crno#", title: "&nbsp;", width: "1px", field: "crno", hidden: "true"}
	];
	
    $(document).ready(function() {
//		kendo.ui.progress($(document.body), true);
		if(cmptncZoneCd.substr(0,2) == '42') {
			CmptncZoneCd= '51'+cmptncZoneCd.substr(2, cmptncZoneCd.length)
		} else if(cmptncZoneCd.substr(0,2) == '45') {
			CmptncZoneCd= '52'+cmptncZoneCd.substr(2, cmptncZoneCd.length)
		}
		
        $statistics.ui.pageLoad();
        
//		kendo.ui.progress($(document.body), false);
    });
    
    $statistics.ui = {
        pageLoad : function() {
	        $("#null-donut-data").hide();
			
			// 대여차량 차종별 통계
			ajax(false, contextPath + '/stts/carStts/carmdl', 'body', '조회중입니다', {}, function(data) {
				var dataList = [];
				var colorHex = ["#FFD1DC", "#B2FBA5", "#AEE0FF", "#E6CFFF", "#FFF0B3"];
				
				for(var i=0; i<data.length; i++) {
					if(i >= 5) {
						break;
					} else {
						dataList.push({category: data[i].carmdl, value: data[i].count, color: colorHex[i]})
					}
				}
				
				if(data.length == 0) {
					$("#carmdlChart").hide();
					$("#null-donut-data").show();
				} else {
					$("#carmdlChart").show();
					$("#null-donut-data").hide();
					$statistics.ui.carmdlChart(dataList);
				}
			});
	        
			// 대여차량 연식별 통계
			ajax(false, contextPath + '/stts/carStts/mdlyr', 'body', '조회중입니다', {}, function(data) {
				var dataList = [];
				
				for(var i=0; i<data.length; i++) {
					dataList.push({mdlyr: data[i].mdlyr, cnt: data[i].count, trg: data[i].count*1.2});
				}
				
				$statistics.ui.mdlyrChart(dataList);
			});
					
			// 대여차량 통계 그리드
			ajax(true, contextPath + '/stts/carStts/crprtnData', 'body', '조회중입니다', {}, function(data) {
				areaDetailData = [];
				excelDetailData = [];
				
				// 추후 생각해보자 => 한번에 백만건 이상 표출이 안된다. 로그가 남아서 과부하
				/*if(data.crprtnData != null) {
					ajax(true, contextPath + '/stts/carStts/crprtnCarData', 'body', '조회중입니다', {}, function(data) {
						areaDetailData = data.crprtnCarData;
						excelDetailData = data.crprtnCarData;

						areaDetailData = [];
						excelDetailData = [];
					});
				} */
				
				/* 대용량 데이터 테스트 */
				var testArray = [];
				for(var i=0; i<300; i++) {
					testArray.push(...data.crprtnData)
				}
				
				$statistics.ui.createAreaGrid(testArray);
				
//				$statistics.ui.createAreaGrid(data.crprtnData);
//				$statistics.ui.createAreaGrid(null);
			});
        },
        
		/* 대여차량 차종별 */
		carmdlChart: function(dataList) {
			$("#carmdlChart").kendoChart({
				title: {position: "bottom", text: ""},
                legend: {
					position: "right",
					labels: {
			            template: "#= dataItem.category #(#= FormatNumber(value)#대)", font: "18px sans-serif"
			        }
				},
                chartArea: {background: ""},
                seriesDefaults: {
                	overlay: {gradient: "none"},
				},
                series: [{
                	type: "donut",
                    startAngle: 90,
                    data: dataList
				}],
				tooltip: {
                	visible: true,
                    template: "#= category # : #= FormatNumber(value)#대"
				}
			});
		},
		
		/* 대여차량 연식별 */
		mdlyrChart: function(dataList) {
			$("#mdlyrChart").kendoChart({
				dataSource: {
					data: dataList
	            },
	            chartArea: {
					height: 1200,
					width: 600
				},
	            title: {text: ""},
	            series: [{
	              	type: "bullet",
	              	currentField: "cnt",
	              	targetField: "trg",
	              	target: {
						color: "white"
					},
	              	labels: {
	                	visible: true,
	                    template: "#= kendo.format('{0:N0}', dataItem.cnt)#대",
	                    background: "transparent",
	                },
	            }],
	            categoryAxis: {
	              	field: "mdlyr",
	              	title: {
	                	text: "연식"
	              	}
	            },
	            valueAxis: {
			        visible: false
			    },
	            tooltip: {
                	visible: true,
                    template: "#= category # : #= FormatNumber(dataItem.cnt)#대"
				}
			});
		},
		
		/* 대여차량 통계 그리드 */
		createAreaGrid: function(gridData) {
			var detailExportPromises = [];
			
			$("#grid01").kendoGrid({
                dataSource: gridData,
                columns: crprtnColumns,
                navigatable: true,
                selectable: "row",
                editable: false,
				resizable: true,
				height: "500px",
				scrollable: true,
				pageable: {buttonCount: 5, pageSize:10},
                sortable: true,
//                detailInit: detailInit,  추후 생각해보자
                dataBound: function() {
					detailExportPromises = [];
					// 행을 열어 놓을지 닫아 놓을지 정하는 코드
//					this.expandRow(this.tbody.find("tr.k-master-row").first());
					$("#grid01 > tbody > tr:last-child > td.k-hierarchy-cell").css("visibility", "hidden");
				},
                noRecords: { template : "데이터가 없습니다." },
                toolbar: [{name: "excel", text:"다운로드"}],
                excel: { allPages: true },
				/**
		 		 * @description  : 데이터 사이즈를 정해서 시트로 분할 시키기
		 		 * @date         : 2024.03.04
		 		 * @author       : 김경룡
		 		 */
				excelExport : function(e){
					if($("#grid01").data("kendoGrid").dataSource.total() == 0 ||
						$("#grid01").data("kendoGrid").dataSource.options.data[0].coNm == '합계') {
						e.preventDefault();
						alert("데이터가 없어 다운로드를 할 수 없습니다.");
					} else {
						e.preventDefault();
//						e.workbook.fileName = "대여차량 현황.xlsx";
//						e.workbook.sheets[0].title = "대여차량 현황";
//						
//						kendo.saveAs({
//							dataURI: new kendo.ooxml.Workbook(e.workbook).toDataURL(),
//							fileName: "대여차량 현황.xlsx"
//					    });
//						
//						kendo.ui.progress($("#grid01"), false);
						
						
//   ---------------------------------이하 시트 나누기------------------------------------------------------						
						
						
				        const data = e.workbook.sheets[0];
				        
				        /* 시트 수, 데이터 사이즈 정하기 */
						const dataLength = e.data.length;
						const chunkSize = 10000;
						const numberOfChunks = Math.ceil(dataLength/chunkSize);
						
						/* 동적으로 변수 생성(데이터와 시트) */
						var variables = {};
						var sheetVar = {};
						for(let i=0; i<numberOfChunks; i++) {
							const start = i * chunkSize;
							const end = Math.min((i + 1) * chunkSize, dataLength);
						
							variables[`sheetData${i}`] = [data.rows[0]];
							for(var j=start; j<end; j++) {
								variables[`sheetData${i}`].push({
									"type": "data",
									"level": null,
									"cells": [
										/* 헤더에 대한 컬럼에 맞게 주입*/
										{"value": e.data[j].coNm},
										{"value": e.data[j].sdn},
										{"value": e.data[j].suv},
										{"value": e.data[j].etc},
										{"value": e.data[j].tot}
									]
								});
							}
							
							/* 시트 구성짜기 */
							if(i==0) {
								sheetVar[`sheet${i+1}`] = data;
								sheetVar[`sheet${i+1}`].rows = variables[`sheetData${i}`];
								sheetVar[`sheet${i+1}`].title = `sheet${i+1}`;
							} else {
								sheetVar[`sheet${i+1}`] = {
									columns: data.columns,
									rows: variables[`sheetData${i}`],
									title: `sheet${i+1}`
								};
								e.workbook.sheets.push(sheetVar[`sheet${i+1}`]);
							}

						}
						
						/* kendo.savaAs()를 사용하여 다운로드 하면, 엑셀 파일이 다운로드 완료되는 시점에서 아래 이후가 작동한다. */
						kendo.saveAs({
							dataURI: new kendo.ooxml.Workbook(e.workbook).toDataURL(),
							fileName: "대여차량 현황.xlsx"
					    });
						
						kendo.ui.progress($("#grid01"), false);

						e.workbook.fileName = "대여차량 현황.xlsx";
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
						{title: " ", field: "tot"},
						{title: " ", field: "sttsNormal"},
						{title: " ", field: "sttsRest"},
						{title: " ", field: "sttsClose"},
						{title: " ", field: "sttsBreak"},
						{title: " ", field: "sttsEtc"},
						{title: " ", field: "vhclCount"},
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
				if(areaDetailData != null && areaDetailData != []) {
					for(var i=0; i<areaDetailData.length; i++) {
						if(e.data.conn == areaDetailData[i].conn) {
							array.push(areaDetailData[i]);
						}
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
		}
    };
    
	$statistics.event = {
		/* kendo Excel 사용 */
		excelDown: function(event) {
			if(event.target.closest("#areaGrid") != null) {
				kendo.ui.progress($("#grid01"), true);
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