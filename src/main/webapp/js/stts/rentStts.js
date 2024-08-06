/**
 * 대여이력 통계
 *
 * date : 2024/02/22
 * author : 김경룡
 *
 */
(function (W, D, $) {
    'use strict';

    W.$statistics = W.$statistics || {};
    
    var authPage = {};
    
    var toDayDate = new Date();
    var agoYearDate = new Date(toDayDate);
    agoYearDate.setFullYear(toDayDate.getFullYear()-1);
    var areaDetailData = [];
    
    var mpMonth = [],
    	mpLess7 = [],
    	mpLess14 = [],
    	mpLess21 = [],
    	mpMore21 = [];
    	
    var loadCk1 = 0;
    
	var map;
	var colorMap;
	var backButtonVal = null;
	var backCkData = null;
	
	var excelDateVal1 = null,
		excelDateVal2 = null;
	
	var excelDetailData = null;
	
	var metroYN = null;
	
	/* 그리드 컬럼*/
	var gridAreaColumns = [
		{template: "#if(sdNm == '시도 합계') {#<span style='font-weight: bold;'>#: sdNm#</span>#"
				+ "} else {##: sdNm##}#", title: "시도", width: "150px", field: "sdNm"},
		{template: "#: less7#", title: "7일이하", width: "100px", field: "less7"},
		{template: "#: less14#", title: "8일~14일", width: "100px", field: "less14"},
		{template: "#: less21#", title: "15일~21일", width: "100px", field: "less21"},
		{template: "#: more21#", title: "22일이상", width: "100px", field: "more21"},
		{template: "#: conn#", title: "valued", width: "15%", field: "conn", hidden: "true"},
	];
	var gridAreaDetailColumns = [
		{template: "#: sggNm#", title: "<span style='font-weight: bold;'>시군구</span>", width: "150px", field: "sggNm"},
		{template: "#: less7#", title: "&nbsp;", width: "100px", field: "less7"},
		{template: "#: less14#", title: "&nbsp;", width: "100px", field: "less14"},
		{template: "#: less21#", title: "&nbsp;", width: "100px", field: "less21"},
		{template: "#: more21#", title: "&nbsp;", width: "100px", field: "more21"},
		{template: "#: conn#", title: "&nbsp;", width: "15%", field: "conn", hidden: "true"}
	];
	var gridTimeColumns = [
		{template: "#: bsYear#", title: "구분", width: "150px", field: "bsYear"},
		{template: "#: less7#", title: "7일이하", width: "100px", field: "less7"},
		{template: "#: less14#", title: "8일~14일", width: "100px", field: "less14"},
		{template: "#: less21#", title: "15일~21일", width: "100px", field: "less21"},
		{template: "#: more21#", title: "22일이상", width: "100px", field: "more21"},
	];
	
    $(document).ready(function() {
//		kendo.ui.progress($(document.body), true);
		if(cmptncZoneCd.substr(0,2) == '42') {
			cmptncZoneCd = '51'+cmptncZoneCd.substr(2, cmptncZoneCd.length)
		} else if(cmptncZoneCd.substr(0,2) == '45') {
			cmptncZoneCd = '52'+cmptncZoneCd.substr(2, cmptncZoneCd.length)
		}
		
		if(cmptncZoneCd.substring(2, cmptncZoneCd.length) == '00000000') {
			metroYN = 'Y';
		}

		/* 최초 권한 설정 */    
	    authrtCd == "G01" ? authPage = {"authrtCd" : "G01", "cmptncZoneCd" : cmptncZoneCd} : 
	    authrtCd == "G02" ? authPage = {"authrtCd" : "G02", "cmptncZoneCd" : cmptncZoneCd} : 
	    authrtCd == "S01" ? authPage = {"authrtCd" : "S01", "bzmnSn" : bzmnSn} :
	    authrtCd == "S02" ? authPage = {"authrtCd" : "S02", "bzmnSn" : bzmnSn} :
	    authrtCd == "S03" ? authPage = {"authrtCd" : "S03", "bzmnSn" : bzmnSn} :
	    authPage = {};
		
		$statistics.event.areaBtnClick();
		$statistics.event.periodBtnClick();
		
        $statistics.ui.mapPageLoad();
        
        $statistics.datePicker.bsYearDate();
        
	    if(authPage.authrtCd == "S01" || authPage.authrtCd == "S02" || authPage.authrtCd == "S03") {
			$("#mapToggle").hide();
	        var loadInter = setInterval(() => {
				if(loadCk1 == 1) {
					$(".timeDv").click();
					$(".areaDv").hide();
					$(".timeDv").hide();
//					kendo.ui.progress($(document.body), false);
				    clearInterval(loadInter);
				}
	        }, 1);
		}
		
//		kendo.ui.progress($(document.body), false);
    });
    
    $statistics.ui = {
        mapPageLoad : function() {
			$statistics.ui.mapLoad();
			
			// 뒤로가기 값 주입 및 버튼 숨김
			backButtonVal = 1;
			$("#rbutton").hide();
			$("#bbutton").hide();
	        $("#timeGrid").hide();
	        
	        $("#null-donut-data").hide();
	        
			var GAuthParams = {};
			if(authrtCd == 'G01' || authrtCd == 'G02') {
				GAuthParams = {
					"ctpvCd" : "not",
					"sggCd"  : "not"
				}
			} else {
				GAuthParams = {};
			}
			
			// 대여이력 차종별 통계
			ajax(false, contextPath + '/stts/rentStts/rentCarmdlArea', 'body', '조회중입니다', GAuthParams, function() {
				$("#rentCarmdlChart").hide();
				$("#null-donut-data").show();
			});

			// 대여이력 월/기간별 통계(지역별)
			$statistics.ui.mpChartFunc(GAuthParams);
					
			// 대여이력 현황 그리드
			ajax(true, contextPath + '/stts/rentStts/rentHistGrid', 'body', '조회중입니다', GAuthParams, function(data) {
				areaDetailData = [];
				areaDetailData = data.agencyAreaDetailGrid;
				
				excelDetailData = data.agencyAreaDetailGrid;
				
				$statistics.ui.createAreaGrid(data.rentHistGrid);
			});
			
			ajax(true, contextPath + '/stts/rentStts/rentHistTimeGrid', 'body', '조회중입니다', GAuthParams, function(data) {
				$statistics.ui.createTimeGrid(data.rentHistTimeGrid);
				loadCk1 = 1;
			});			
        },
        
        mapLoad: function() {
			var min = null;
			var setView = null;
			if(window.matchMedia("(max-width: 640px)").matches) { min = 6, setView = [36.8265, 128.8179] }
			else { min = 7, setView = [35.9265, 128.179]}
			
			map = L.map('mapid', {
			    zoomControl: true,
			    dragging: true,
			    touchZoom: false,
			    doubleClickZoom: false,
			    scrollWheelZoom: false,
				minZoom: min,
				maxZoom:10,
			    boxZoom: false,
			    keyboard: false
			});
			map.setView(setView, min);

			colorMap = {
	            "Level1": "#FF0000",
	            "Level2": "#FE642E",
	            "Level3": "#FAAC58",
	            "Level4": "#F5DA81",
	            "Level5": "#F2F5A9",
	            "Level6": "#9FF781",
	            "Level7": "#D0F5A9",
	            "Level8": "#ECF6CE"
	        };
			ajax(true, contextPath + '/stts/rentStts/selectMapData', 'body', '조회중입니다', null, function(data) {
				$statistics.ui.creatPolygonMap(data);
				if(window.matchMedia("(max-width: 640px)").matches) {$(".download-btn").hide()};
			});
		},
        
		//폴리곤 맵 그림
		creatPolygonMap: function(data){
			if(authrtCd == 'G01' || authrtCd == 'G02') {
				var ctpvCd = {};
				// 광역지자체 여부에 따라 작동기능
				if(cmptncZoneCd.substring(2, cmptncZoneCd.length) == '00000000') {
					ctpvCd.ctpvCd = cmptncZoneCd.substring(0, 2);
				} else {
					ctpvCd.cmptncZoneCd = cmptncZoneCd;
				}
		
				ajax(false, contextPath + '/stts/rentStts/selectDetailMapData', 'body', '조회중입니다', ctpvCd, function(data) {
					var gridData = null;
					
					var mainLayer = L.geoJSON(data, {
				    	onEachFeature: function(feature, layer) {
							const color = colorMap[feature.properties.groupLevel];
							                
							layer.setStyle({fillColor: color, color: "black"});
							
							if(window.matchMedia("(max-width: 640px)").matches) {
								$("#sidoNamePre").html(" > <br />");
							} else {
								$("#sidoNamePre").text(" > ");
							}
							$("#sidoName").text(feature.properties.ctpvNm+" ");
					
							const detectIn = () => {layer.setStyle({fillOpacity: 1});};
							const detectOut = () => {layer.setStyle({fillOpacity: 0.7});};
							const detailsgg = (e) => {
								
								var sggCd = null;
								var sggGridData = null;
												
								if(window.matchMedia("(max-width: 640px)").matches) {
									$("#sigunguName").html(" > <br />"+feature.properties.sggNm+" ");
								} else {
									$("#sigunguName").text(" > "+feature.properties.sggNm+" ");
								}
								
								if(ctpvCd.ctpvCd != undefined && ctpvCd.cmptncZoneCd == undefined) {
									$("#sidoName").addClass("sidoName");
									sggCd = {"sggCd" : e.target.feature.properties.sggCd};
									backButtonVal = 3;
									if(window.matchMedia("(max-width: 640px)").matches) { $("#rbutton").hide(); } 
									else { $("#rbutton").show(); }
									$("#bbutton").show();
								} else {
									sggCd = {"sggCd" : cmptncZoneCd.slice(0, 5)};
								}

								// 대여이력 차종별 통계
								ajax(false, contextPath + '/stts/rentStts/rentCarmdlArea', 'body', '조회중입니다', sggCd, function() {
									$("#rentCarmdlChart").hide();
									$("#null-donut-data").show();
								});
								
								// 대여이력 현황 그리드
								ajax(true, contextPath + '/stts/rentStts/rentHistGrid', 'body', '조회중입니다', sggCd, function(data) {
									sggGridData = data.rentHistGrid;
									areaDetailData = [];
									areaDetailData = data.agencyAreaDetailGrid;
													
									excelDetailData = data.agencyAreaDetailGrid;
													
									$("#grid01").data("kendoGrid").setDataSource(sggGridData);
								});
								
								// 대여이력 월/기간별 통계(지역별)
								$statistics.ui.mpChartFunc(sggCd);
													
								map.eachLayer(function(layer) {
									if(layer instanceof L.Polygon) {
										layer.setStyle({fillColor: "white", color: "black"});
									}
								});
													
								layer.setStyle({fillColor: color});
													
								map.fitBounds(layer.getBounds());
							}
							
							// 광역지자체 여부에 따라 작동기능
							if(ctpvCd.ctpvCd == undefined && ctpvCd.cmptncZoneCd != undefined) {
								detailsgg();
							} 
						
							layer.on({
								mouseover: detectIn,
							    mouseout: detectOut,
							    click: detailsgg,
							});
						},
						style: function(feature) {
							var color = colorMap[feature.properties.groupLevel];
						    return {
						    	color: color,
						        weight: 2,
						        opacity: 1,
						        fillColor: color,
						        fillOpacity: 0.7,
							};
						}
					}).bindTooltip(function(layer) {
						return `<div style="font-weight: bold; font-size:16px;">${layer.feature.properties.sggNm}</div>`;
					}).addTo(map);
					
					var bounder = mainLayer.getBounds();
					map.setMaxBounds(bounder);
					map.fitBounds(bounder);
					
					// 광역지자체 여부에 따라 작동기능
					if(ctpvCd.ctpvCd != undefined && ctpvCd.cmptncZoneCd == undefined) {
						backCkData = ctpvCd;
						
						// 대여이력 차종별 통계
						ajax(false, contextPath + '/stts/rentStts/rentCarmdlArea', 'body', '조회중입니다', ctpvCd, function() {
							$("#rentCarmdlChart").hide();
							$("#null-donut-data").show();
						});
									
						// 대여이력 현황 그리드
						ajax(true, contextPath + '/stts/rentStts/rentHistGrid', 'body', '조회중입니다', ctpvCd, function(data) {
							gridData = data.rentHistGrid;
							areaDetailData = [];
							areaDetailData = data.agencyAreaDetailGrid;
										
							excelDetailData = data.agencyAreaDetailGrid;
										
							$("#grid01").data("kendoGrid").setDataSource(gridData);
						});
									
						// 대여이력 월/기간별 통계(지역별)
						$statistics.ui.mpChartFunc(ctpvCd);
					}
					
				});
			} else {
				var mainLayer = L.geoJSON(data, {
					onEachFeature: function(feature, layer) {
						
		                const color = colorMap[feature.properties.groupLevel];
		                
		                layer.setStyle({
		                    fillColor: color,
		                    color: "black"
		                });
	
		                const detectIn = () => {layer.setStyle({fillOpacity: 1})};
		                const detectOut = () => {layer.setStyle({fillOpacity: 0.7})};
		                const enLarge = (e) => {
							var ctpvCd = null;
							var gridData = null;
							
							backButtonVal = 2;
							if(window.matchMedia("(max-width: 640px)").matches) { $("#rbutton").hide(); } 
							else { $("#rbutton").show(); }
							$("#bbutton").show();
							
							$("#allCt").addClass("allCt");
							
							ctpvCd = {"ctpvCd" : e.target.feature.properties.ctpvCd};
							
							backCkData = ctpvCd;
	
							if (layer instanceof L.Polygon) {
								map.eachLayer(function(layer) {
	//								layer.setStyle({fillColor: "white"});
									layer.remove();
								});
							}
							
							if(window.matchMedia("(max-width: 640px)").matches) {
								$("#sidoNamePre").html(" > <br />");
							} else {
								$("#sidoNamePre").text(" > ");
							}
							$("#sidoName").text(e.target.feature.properties.ctpvNm);
							
							// 지도 확대
							ajax(false, contextPath + '/stts/rentStts/selectDetailMapData', 'body', '조회중입니다', ctpvCd, function(data) {
								var subLayer = L.geoJSON(data, {
				                    onEachFeature: function(feature, layer) {
						                const color = colorMap[feature.properties.groupLevel];
						                
							            layer.setStyle({fillColor: color, color: "black"});
					
						                const detectIn = () => {layer.setStyle({fillOpacity: 1});};
						                const detectOut = () => {layer.setStyle({fillOpacity: 0.7});};
						                const detailsgg = (e) => {
											var sggCd = null;
											var sggGridData = null;
											
											backButtonVal = 3;
											if(window.matchMedia("(max-width: 640px)").matches) { $("#rbutton").hide(); } 
											else { $("#rbutton").show(); }
											$("#bbutton").show();
											
											$("#sidoName").addClass("sidoName");
											
											sggCd = {"sggCd" : e.target.feature.properties.sggCd};
											
											if(window.matchMedia("(max-width: 640px)").matches) {
												$("#sigunguName").html(" > <br />"+e.target.feature.properties.sggNm+" ");
											} else {
												$("#sigunguName").text(" > "+e.target.feature.properties.sggNm+" ");
											}
											$("#sigunguName").show();
											
											// 대여이력 차종별 통계
											ajax(false, contextPath + '/stts/rentStts/rentCarmdlArea', 'body', '조회중입니다', sggCd, function() {
												$("#rentCarmdlChart").hide();
												$("#null-donut-data").show();
											});
											
											// 대여이력 현황 그리드
											ajax(true, contextPath + '/stts/rentStts/rentHistGrid', 'body', '조회중입니다', sggCd, function(data) {
												sggGridData = data.rentHistGrid;
												areaDetailData = [];
												areaDetailData = data.agencyAreaDetailGrid;
												
												excelDetailData = data.agencyAreaDetailGrid;
												
												$("#grid01").data("kendoGrid").setDataSource(sggGridData);
											});
											
											// 대여이력 월/기간별 통계(지역별)
											$statistics.ui.mpChartFunc(sggCd);
											
											map.eachLayer(function(layer) {
												if (layer instanceof L.Polygon) {
													layer.setStyle({fillColor: "white", color: "black"});
												}
											});
											
											layer.setStyle({fillColor: color});
											
											map.fitBounds(layer.getBounds());
										}
					
						                layer.on({
						                    mouseover: detectIn,
						                    mouseout: detectOut,
						                    click: detailsgg,
						                });
					            	},
					                style: function(feature) {
					                    var color = colorMap[feature.properties.groupLevel];
					                    return {
					                        color: color,
					                        weight: 2,
					                        opacity: 1,
					                        fillColor: color,
					                        fillOpacity: 0.7,
					                    };
					                }
				            	}).bindTooltip(function(layer) {
									return `<div style="font-weight: bold; font-size:16px;">${layer.feature.properties.sggNm}</div>`;
								}).addTo(map);
								
								if(window.matchMedia("(max-width: 640px)").matches) {
									map.invalidateSize();
									map.fitBounds(layer.getBounds());
							    } else {
									map.invalidateSize();
									map.setMaxBounds(subLayer.getBounds());
									map.fitBounds(subLayer.getBounds());
								}
							});
							
							// 대여이력 차종별 통계
							ajax(false, contextPath + '/stts/rentStts/rentCarmdlArea', 'body', '조회중입니다', ctpvCd, function() {
								$("#rentCarmdlChart").hide();
								$("#null-donut-data").show();
							});
							
							// 대여이력 현황 그리드
							ajax(true, contextPath + '/stts/rentStts/rentHistGrid', 'body', '조회중입니다', ctpvCd, function(data) {
								gridData = data.rentHistGrid;
								areaDetailData = [];
								areaDetailData = data.agencyAreaDetailGrid;
								
								excelDetailData = data.agencyAreaDetailGrid;
								
								$("#grid01").data("kendoGrid").setDataSource(gridData);
							});
							
							// 대여이력 월/기간별 통계(기간별)
							$statistics.ui.mpChartFunc(ctpvCd);
						}
						
		                layer.on({
		                    mouseover: detectIn,
		                    mouseout: detectOut,
		                    click: enLarge,
		                });
		            },
	                style: function(feature) {
	                    var color = colorMap[feature.properties.groupLevel];
	                    return {
	                        color: color,
	                        weight: 2,
	                        opacity: 1,
	                        fillColor: color,
	                        fillOpacity: 0.7,
	                    };
	                }
	            }).bindTooltip(function(layer) {
					return `<div style="font-weight: bold; font-size:16px;">${layer.feature.properties.ctpvNm}</div>`;
				}).addTo(map);
				
				var bounder = mainLayer.getBounds();
				map.setMaxBounds(bounder);
				map.fitBounds(bounder);
			}
		},
		
		/* 대여이력 차종별 통계 */
		createChartDonut: function(yn) {
			$("#rentCarmdlChart").kendoChart({
				title: {position: "bottom", text: ""},
                legend: {
					position: "bottom",
					labels: {
			            template: "#= dataItem.category #(#= value+'%' #)", font: "18px sans-serif"
			        }
				},
                chartArea: {background: ""},
                seriesDefaults: {
                	overlay: {gradient: "none"},
				},
                series: [{
                	type: "donut",
                    startAngle: 90,
                    data: [
						{category: "정상", value: yn.sttsNormal, color: "#45C596"},
						{category: "휴업", value: yn.sttsRest, color: "#F5CB68"}, 
						{category: "폐업", value: yn.sttsClose, color: "#9750CA"}, 
						{category: "정지", value: yn.sttsBreak, color: "#FF0000"}, 
						{category: "기타", value: yn.sttsEtc, color: "#5783DE"},
					]
				}],
				tooltip: {
                	visible: true,
                    template: "#= category # : #= value #%"
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
                sortable: true,
                detailInit: detailInit,
                dataBound: function() {
					detailExportPromises = [];
					this.expandRow(this.tbody.find("tr.k-master-row").first());
					$("#grid01 > tbody > tr:last-child > td.k-hierarchy-cell").css("visibility", "hidden");
				},
//                pageable: { pageSize: 5, buttonCount: 5 },
                noRecords: { template : "데이터가 없습니다." },
                toolbar: [{name: "excel", text:"다운로드"}],
                excel: { allPages: true },
				excelExport : function(e){
					if($("#grid01").data("kendoGrid").dataSource.total() == 0 ||
						$("#grid01").data("kendoGrid").dataSource.options.data[0].sdNm == '시도 합계') {
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
								fileName: "대여이력 현황(지역별).xlsx"
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
						{title: " ", field: "less7"},
						{title: " ", field: "less14"},
						{title: " ", field: "less21"},
						{title: " ", field: "more21"},
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
		
		/* 대여이력 현황 기간별 그리드 */
		createTimeGrid: function(gridData) {
			$("#grid02").kendoGrid({
                dataSource: gridData,
                columns: gridTimeColumns,
                navigatable: true,
                selectable: "row",
                editable: false,
				resizable: true,
				scrollable: true,
                sortable: true,
                pageable: { pageSize: 5, buttonCount: 5 },
                noRecords: { template : "데이터가 없습니다." }, 
                toolbar: [{name: "excel", text:"다운로드"}],
                excel: { allPages: true },
				excelExport : function(e){
					if($("#grid02").data("kendoGrid").dataSource.total() == 0) {
						e.preventDefault();
						alert("데이터가 없어 다운로드를 할 수 없습니다.");
					} else {
						e.workbook.fileName = "("+excelDateVal1+"-"+excelDateVal2+")대여이력 현황.xlsx";
						e.workbook.sheets[0].title = "대여이력 현황";
					}
				}
			});
		},
		
		/**
		 * @name         : mpChartFunc
		 * @description  : 월/기간별 차트 그리기
		 * @date         : 2024.02.23
		 * @author       : 김경룡
		 */
		mpChartFunc: function(params) {
			ajax(false, contextPath + '/stts/rentStts/mpChartArea', 'body', '조회중입니다', params, function(data) {
				mpMonth = []; mpLess7 = []; mpLess14 = []; mpLess21 = []; mpMore21 = [];
				
				for(var i=0; i<data.mpChartArea.length; i++) {
					mpMonth.push(data.mpChartArea[i].m);
					mpLess7.push(data.mpChartArea[i].less7);
					mpLess14.push(data.mpChartArea[i].less14);
					mpLess21.push(data.mpChartArea[i].less21);
					mpMore21.push(data.mpChartArea[i].more21);
				}
				
				$statistics.chart.mpChart(mpMonth, mpLess7, mpLess14, mpLess21, mpMore21);
			});
		}
    };
    
    $statistics.datePicker = {
		bsYearDate: function() {
			$("#start-picker1").kendoDatePicker({
				value:agoYearDate,
				dateInput: true,
				format: "yyyy",
				parseFormats: ["yyyy"],
				max: toDayDate,
				min: new Date('2023-01-01'),
				start: "decade",
    			depth: "decade"
			});
			$("#end-picker1").kendoDatePicker({
				value:toDayDate,
				dateInput: true,
				format: "yyyy",
				parseFormats: ["yyyy"],
				max: toDayDate,
				min: new Date('2023-01-01'),
				start: "decade",
    			depth: "decade"
			});
		}
	};
	
	$statistics.chart = {
		/* 대여이력 월/기간별 통계 */
		mpChart: function(mpMonth, mpLess7, mpLess14, mpLess21, mpMore21) {
			$("#mpChart").kendoChart({
				title: {text: ""},
                legend: {
					position: "bottom",
					labels: {
			            template: "#= series.name #", font: "20px sans-serif"
			        }
				},
                series: [
					{
	                	type: "column",
	                    data: mpLess7,
	                    stack: false,
	                    name: "7일이하",
	                    color: "#45C596",
	                    border: {width: 0},
	                    axis: "stick"
                    }, 
                    {
                    	type: "column",
                        data: mpLess14,
                        stack: false,
                        name: "8일~14일",
                        color: "#F5CB68",
                        border: {width: 0},
                        axis: "stick"
					},
                    {
                    	type: "column",
                        data: mpLess21,
                        stack: false,
                        name: "15일~21일",
                        color: "#0000FF",
                        border: {width: 0},
                        axis: "stick"
					},
                    {
                    	type: "column",
                        data: mpMore21,
                        stack: false,
                        name: "22일이상",
                        color: "pink",
                        border: {width: 0},
                        axis: "stick"
					},
				],
				valueAxes: [
					{
						title: {text: "", font: "11px, Pretendard"}, name: "stick",
						labels: { 
				            template: "#= kendo.format('{0:N0}', value)#"
			        	}
					},
				],
                categoryAxis: {
                	categories: mpMonth,
                    axisCrossingValues: [0, 10, 10, 10],
                    color: "#585858"
				},
                tooltip: {
                	visible: true,
                    template: "#= series.name #: #= kendo.format('{0:N0}', value)#건"
				}
			});
		},
	},
	$statistics.event = {
		
		/**
		 * @name         : areaBtnClick
		 * @description  : 지역별 탭 클릭
		 * @date         : 2023.07.25
		 * @author       : 김경룡
		 */
		areaBtnClick: function() {
			$(".areaDv").click(function() {
				if(!$(this).hasClass("selected")) {
					$(this).addClass("selected");
					$(".timeDv").removeClass("selected");
					$(".year_picker").hide();
					$("#mapToggle").show();
					if(window.matchMedia("(max-width: 640px)").matches) {
						$("#chartToggle").css({"display":"block", "width":"100%"});
					} else {
						$("#chartToggle").css({"display":"block", "width":"50%"});
					}
					$("#contToggle1").css("width", "100%");
					$("#contToggle2").css("width", "100%");
					
					$("#timeGrid").hide();
					$("#areaGrid").show();
					
					$("#sidoNamePre").text('');
					$("#sidoName").text('');
					$("#sigunguName").text('');
					$("#rbutton").hide();
					$("#bbutton").hide();
					
					$("#allCt").removeClass("allCt");
					$("#sidoName").removeClass("sidoName");
					
					var GAuthParams = {};
					if(authrtCd == 'G01' || authrtCd == 'G02') {
						GAuthParams = {
							"ctpvCd" : "not",
							"sggCd"  : "not"
						}
					} else {
						GAuthParams = {};
					}
					
					$statistics.ui.mapLoad();
					
					ajax(false, contextPath + '/stts/rentStts/rentCarmdlArea', 'body', '조회중입니다', GAuthParams, function() {
						$("#rentCarmdlChart").hide();
						$("#null-donut-data").show();
					});
					
					ajax(true, contextPath + '/stts/rentStts/rentHistGrid', 'body', '조회중입니다', GAuthParams, function(data) {
						areaDetailData = [];
						areaDetailData = data.agencyAreaDetailGrid;
						
						excelDetailData = data.agencyAreaDetailGrid;
						
						$("#grid01").data("kendoGrid").setDataSource(data.rentHistGrid);
					});
					
					/* 대여이력 월/기간별 통계(지역별) */
					$statistics.ui.mpChartFunc(GAuthParams);			
				}
			});
		},
		
		/**
		 * @name         : periodBtnClick
		 * @description  : 기간별 탭 클릭
		 * @date         : 2023.07.25
		 * @author       : 김경룡
		 */		
		periodBtnClick: function() {
			$(".timeDv").click(function() {
				if(!$(this).hasClass("selected")) {
					$(this).addClass("selected");
					$(".areaDv").removeClass("selected");
					$(".year_picker").show();
					$("#mapToggle").hide();
					if(window.matchMedia("(max-width: 640px)").matches) {
						$("#chartToggle").css({"display":"block", "width":"100%"});
						$("#contToggle1").css("width", "100%");
						$("#contToggle2").css("width", "100%");
					} else {
						$("#chartToggle").css({"display":"flex", "width":"100%"});
						$("#contToggle1").css("width", "50%");
						$("#contToggle2").css("width", "50%");
					}
					
					$("#timeGrid").show();
					$("#areaGrid").hide();
					
					$("#rentCarmdlChart").hide();
					$("#null-donut-data").show();
					
					map.remove();
					
					$statistics.event.periodSearch();
				}
			});			
		},

		/**
		 * @name         : periodSearch
		 * @description  : 기간별 탭에서 조회 버튼
		 * @date         : 2023.07.23
		 * @author       : 김경룡
		 */
		periodSearch: function() {
			var params = {};
			var gridData = [];
			
			excelDateVal1 = null, excelDateVal2 = null;
			
			if($("#start-picker1").val() > $("#end-picker1").val()) {
				alert("시작 년도가 종료 년도보다 최근일 수 없습니다.");
				return;
			} else {
				excelDateVal1 = $("#start-picker1").val(), excelDateVal2 = $("#end-picker1").val();
				
				if(authPage.authrtCd == "S01" || authPage.authrtCd == "S02" || authPage.authrtCd == "S03"
					|| authPage.authrtCd == "G01" || authPage.authrtCd == "G02") {
					params = {
						"yearStrt" : $("#start-picker1").val(),
						"yearEnd"  : $("#end-picker1").val(),
						"bzmnSn"   : authPage.bzmnSn,
						"sggCd"   : authPage.cmptncZoneCd
					};
				} else {
					params = {
						"yearStrt" : $("#start-picker1").val(),
						"yearEnd"  : $("#end-picker1").val()
					};
				}
				
				// 대여이력 차종별 통계
				ajax(true, contextPath + '/stts/rentStts/rentCarmdlTime', 'body', '조회중입니다', params, function() {
					$("#rentCarmdlChart").hide();
					$("#null-donut-data").show();
				});
					
				// 대여이력 현황(기간별)
				ajax(true, contextPath + '/stts/rentStts/rentHistTimeGrid', 'body', '조회중입니다', params, function(data) {
					gridData = data.rentHistTimeGrid;
					$("#grid02").data("kendoGrid").setDataSource(gridData);
				});
				
				// 대여이력 월/기간별 통계(기간별)
				ajax(false, contextPath + '/stts/rentStts/mpChartTime', 'body', '조회중입니다', params, function(data) {
					mpMonth = []; mpLess7 = []; mpLess14 = []; mpLess21 = []; mpMore21 = [];
					
					for(var i=0; i<data.mpChartTime.length; i++) {
						mpMonth.push(data.mpChartTime[i].m);
						mpLess7.push(data.mpChartTime[i].less7);
						mpLess14.push(data.mpChartTime[i].less14);
						mpLess21.push(data.mpChartTime[i].less21);
						mpMore21.push(data.mpChartTime[i].more21);
					}
					
					$statistics.chart.mpChart(mpMonth, mpLess7, mpLess14, mpLess21, mpMore21);
				});	
			}
		}, 
		
		/**
		 * @name         : returnButton
		 * @description  : 지역별 확대 시 뒤로 돌아가거나 시도/전국으로 돌아가기
		 * @date         : 2023.09.05
		 * @author       : 김경룡
		 */
		returnButton: function() {
			if(backButtonVal == 2) {
				$statistics.event.backButton();
			} else if(backButtonVal == 3) {
				$statistics.event.sidoBack();
			}
		}, 

		/**
		 * @name         : sidoBack
		 * @description  : 시군구 레벨에서 시도 레벨로 이동
		 * @date         : 2023.09.05
		 * @author       : 김경룡
		 */	
		sidoBack: function() {
			if(backButtonVal == 3) {
				$("#sigunguName").text('');
				$("#sigunguName").hide();
				
				$("#sidoName").removeClass("sidoName");
				
				map.remove();
				
				var min = null;
				window.matchMedia("(max-width: 640px)").matches ? min = 6 : min = 7;
				
				map = L.map('mapid', {
				    zoomControl: true,
				    dragging: true,
				    touchZoom: false,
				    doubleClickZoom: false,
				    scrollWheelZoom: false,
					minZoom: min,
					maxZoom: 10,
				    boxZoom: false,
				    keyboard: false
				});
		
				colorMap = {
			    	"Level1": "#FF0000",
			        "Level2": "#FE642E",
			        "Level3": "#FAAC58",
			        "Level4": "#F5DA81",
			        "Level5": "#F2F5A9",
			        "Level6": "#9FF781",
			        "Level7": "#D0F5A9",
			        "Level8": "#ECF6CE"
			    };
			        
				ajax(false, contextPath + '/stts/rentStts/selectDetailMapData', 'body', '조회중입니다', backCkData, function(data) {
					var backLayer = L.geoJSON(data, {
						onEachFeature: function(feature, layer) {
							const color = colorMap[feature.properties.groupLevel];
							                
							layer.setStyle({fillColor: color, color: "black"});
						
							const detectIn = () => {layer.setStyle({fillOpacity: 1});};
							const detectOut = () => {layer.setStyle({fillOpacity: 0.7});};
							const detailsgg = (e) => {
								var sggCd = null;
								var sggGridData = null;
												
								backButtonVal = 3;
								if(window.matchMedia("(max-width: 640px)").matches) { $("#rbutton").hide(); } 
								else { $("#rbutton").show(); }
								$("#bbutton").show();
								
								$("#sidoName").addClass("sidoName");
												
								sggCd = {"sggCd" : e.target.feature.properties.sggCd};
								
								if(window.matchMedia("(max-width: 640px)").matches) {
									$("#sigunguName").html(" > <br />"+e.target.feature.properties.sggNm+" ");
								} else {
									$("#sigunguName").text(" > "+e.target.feature.properties.sggNm+" ");
								}
								$("#sigunguName").show();
												
								// 대여이력 차종별 통계
								ajax(false, contextPath + '/stts/rentStts/rentCarmdlArea', 'body', '조회중입니다', sggCd, function() {
									$("#rentCarmdlChart").hide();
									$("#null-donut-data").show();
								});
												
								// 대여이력 현황 그리드
								ajax(true, contextPath + '/stts/rentStts/rentHistGrid', 'body', '조회중입니다', sggCd, function(data) {
									sggGridData = data.rentHistGrid;
									areaDetailData = [];
									areaDetailData = data.agencyAreaDetailGrid;
												
									excelDetailData = data.agencyAreaDetailGrid;
													
									$("#grid01").data("kendoGrid").setDataSource(sggGridData);
								});
												
								// 대여이력 월/기간별 통계(지역별)
								$statistics.ui.mpChartFunc(sggCd);
												
								map.eachLayer(function(layer) {
									if (layer instanceof L.Polygon) {
										layer.setStyle({fillColor: "white", color: "black"});
									}
								});
												
								layer.setStyle({fillColor: color});
												
								map.fitBounds(layer.getBounds());
							}
						
							layer.on({
								mouseover: detectIn,
							    mouseout: detectOut,
							    click: detailsgg,
							});
						},
						style: function(feature) {
							var color = colorMap[feature.properties.groupLevel];
						    return {
						    	color: color,
						        weight: 2,
						        opacity: 1,
						        fillColor: color,
						        fillOpacity: 0.7,
							};
						}
							
					}).bindTooltip(function(layer) {
						return `<div style="font-weight: bold; font-size:16px;">${layer.feature.properties.sggNm}</div>`;
					}).addTo(map);
					
					var bounder = backLayer.getBounds();
					map.setMaxBounds(bounder);
					map.fitBounds(bounder);
						
					// 대여이력 차종별 통계
					ajax(false, contextPath + '/stts/rentStts/rentCarmdlArea', 'body', '조회중입니다', backCkData, function() {
						$("#rentCarmdlChart").hide();
						$("#null-donut-data").show();
					});
								
					// 대여이력 현황 그리드
					ajax(true, contextPath + '/stts/rentStts/rentHistGrid', 'body', '조회중입니다', backCkData, function(data) {
						areaDetailData = [];
						areaDetailData = data.agencyAreaDetailGrid;
						excelDetailData = data.agencyAreaDetailGrid;
								
						$("#grid01").data("kendoGrid").setDataSource(data.rentHistGrid);
					});
								
					// 대여이력 월/기간별 통계(지역별)
					$statistics.ui.mpChartFunc(backCkData);					
				});
					
				backButtonVal = 2;
				
				if(metroYN == 'Y') {
					$("#rbutton").hide();
					$("#bbutton").hide();
				}
			}
		},
		
		/**
		 * @name         : backButton
		 * @description  : 지역별 확대 시 처음으로 돌아가는 버튼
		 * @date         : 2023.08.24
		 * @author       : 김경룡
		 */
		backButton: function() {
			// 처음으로 돌아가기
			if(metroYN == 'Y') {
				$statistics.event.sidoBack();
				$("#rbutton").hide();
				$("#bbutton").hide();
			} else {
				if(backButtonVal == 2 || backButtonVal == 3) {
					map.remove();
					$statistics.ui.mapLoad();
					
					$("#sidoNamePre").text('');
					$("#sidoName").text('');
					$("#sigunguName").text('');
					
					$("#rbutton").hide();
					$("#bbutton").hide();
					
					$("#allCt").removeClass("allCt");
					
					// 대여이력 차종별 통계
					ajax(false, contextPath + '/stts/rentStts/rentCarmdlArea', 'body', '조회중입니다', {}, function() {
						$("#rentCarmdlChart").hide();
						$("#null-donut-data").show();
					});
					
					// 대여이력 현황 그리드
					ajax(true, contextPath + '/stts/rentStts/rentHistGrid', 'body', '조회중입니다', {}, function(data) {
						areaDetailData = [];
						areaDetailData = data.agencyAreaDetailGrid;
						
						excelDetailData = data.agencyAreaDetailGrid;
						
						$("#grid01").data("kendoGrid").setDataSource(data.rentHistGrid);
					});
					
					// 대여이력 월/기간별 통계(지역별)
					$statistics.ui.mpChartFunc({});
					
					backButtonVal = 1;
				}
			}
		},
		
		/* kendo Excel 사용 */
		excelDown: function(event) {
			// 지역별
			if(event.target.closest("#areaGrid") != null) {
				$("#areaGrid").find(".k-grid-excel").click();
			}
			// 기간별
			if(event.target.closest("#timeGrid") != null) {
				$("#timeGrid").find(".k-grid-excel").click();
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