/**
 * 종합통계
 *
 * date : 2023/10/17
 * author : 김경룡
 *
 */
(function (W, D, $) {
    'use strict';

    W.$statistics = W.$statistics || {};
    
    var authPage = {};
    
    var toDayDate = new Date();
    var nowYear = toDayDate.getFullYear();
    
    var ldCk = 0; 
    	
	/* 그리드 컬럼*/
	var gridTimeColumns = [
		{template: "#: tot#", title: "총 사업자수", field: "tot", attributes: {"class": "w_bold"}},
		{template: "#: newAgency#", title: "신규", field: "newAgency"},
		{template: "#: sttsClose#", title: "폐업", field: "sttsClose"},
		{template: "#: sttsNormal#", title: "정상", field: "sttsNormal"},
		{template: "#: sttsRest#", title: "휴업", field: "sttsRest"},
		{template: "#: sttsBreak#", title: "정지", field: "sttsBreak"},
		{template: "#: sttsEtc#", title: "기타", field: "sttsEtc"},
	];
	var gridTimeCarColumns = [
		{template: "#: vhclCountCloseMinu#", title: "차량합계(대)", field: "vhclCountCloseMinu"},
	];
	var gridTimeHsColumns = [
		{template: "#: agencyHsGrid#", title: "정보갱신이력", field: "agencyHsGrid"},
	];
	var dfInfoColumns = [
		{template: "#: ocrnDt#", title: "발생일시", field: "ocrnDt", width: 160},
		{template: "#: defectsSn#", title: "결함일련번호", field: "defectsSn", width: 120},
		{template: "#: defectsTypeCd#", title: "결함처리유형", field: "defectsTypeCd", width: 100},
		{template: "#: prcsSttsCd#", title: "결함내용", field: "prcsSttsCd", width: 400, sortable: false},
		{template: "#: FormatNumber(cnt)#", title: "해당차량대수", field: "cnt", width: 100},
	]
	
    $(document).ready(function() {
		if(cmptncZoneCd.substr(0,2) == '42') { cmptncZoneCd = '51'+cmptncZoneCd.substr(2, cmptncZoneCd.length); }
		if(authrtCd == 'G01' || authrtCd == 'G02') { $("#nb1").text("대여사업자별"); $("#nb2").text("대여사업자별"); $("#nb3").text("대여사업자별"); }
		
		/* 최초 권한 설정 */
		if(authrtCd == "G01") {
			authPage = {"authrtCd" : "G01", "cmptncZoneCd" : cmptncZoneCd};
		} else if(authrtCd == "G02") {
			authPage = {"authrtCd" : "G02", "cmptncZoneCd" : cmptncZoneCd};
		} else {
			authPage = {};
		}
	    
	    $statistics.ui.createTimeGrid();
	    $statistics.ui.createHsGrid();
		
		$statistics.ui.createDfInfoGrid();
		
        $statistics.datePicker.bsYearDate();
				
		$statistics.event.periodSearch();
    });
    
    $statistics.ui = {
		
		/*(Top5)차량대여현황, 차량결함현황, 차량보유현황*/
		createChartDonut: function(id, dataSet) {
			$(id).kendoChart({
				title: {position: "top", text: " "},
                legend: {
					visible: false
				},
                chartArea: {background: ""},
                seriesDefaults: {
                	overlay: {gradient: "sharpBevel"}
				},
                series: [{
                	type: "donut",
                    startAngle: 90,
                    data: dataSet,
					labels: {
			            color: "#000",
			            position: "outsideEnd",
			            template: "#: dataItem.category #",
			            visible: true
		          	},
		          	autoFit: true,
				}],
				tooltip: {
                	visible: true,
                    template: "#= category # : #= kendo.format('{0:n0}', value) #대"
				},
				render: function() {
					ldCk++;
				}
			});
		},
		
		/**
		 * @name         : verfResult
		 * @description  : 면허조회 결과
		 * @date         : 2023. 11. 21
		 * @author       : 김경룡
		 */
		verfResult: function(data) {
			$("#verf-chart").kendoChart({
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
	                    data: [data.s1, data.s2, data.s3, data.s4, data.s5],
	                    labels: {
	                        visible: true,
	                        template: "#= kendo.format('{0:N0}', value)#",
	                        background: "transparent",
	                    },
	                    stack: false,
	                    name: "성공",
	                    color: "#A2DED0",
	                    overlay: {gradient: "sharpBevel"},
	                    border: {width: 1},
                    },
					{
	                	type: "column",
	                    data: [data.f1, data.f2, data.f3, data.f4, data.f5],
	                    labels: {
	                        visible: true,
	                        template: "#= kendo.format('{0:N0}', value)#",
	                        background: "transparent",
	                    },
	                    stack: false,
	                    name: "실패",
	                    color: "#FFD1DC",
	                    overlay: {gradient: "sharpBevel"},
	                    border: {width: 1},
                    }
				],
				valueAxes: [{
					min: 0,
					labels: { 
//			            template: "#= kendo.format('{0:N0}', value)#",
//			            style: {
//							color: "red" 
//						},
						visible: false
			        },
			        // Y 축 눈금을 숨김
			        majorTicks: {
			            visible: false
			        }
				}],
                categoryAxis: {
                    categories: ["직접입력", "OCR", "모바일면허증", "API", "기타"],
                    color: "#585858"
				},
                tooltip: {
                	visible: true,
                    template: "#= series.name #: #= kendo.format('{0:n0}', value)#건"
				},
				render: function() {
					ldCk++;
				}
			});
		},

		/**
		 * @name         : useCarPer
		 * @description  : 차량 가동률
		 * @date         : 2023. 12. 18
		 * @author       : 김경룡
		 */
		useCarPer: function() {
			$("#useCar-chart").kendoChart({
				title: {text: ""},
                legend: {
					position: "right",
					labels: {
			            template: "#= series.name #", font: "20px sans-serif"
			        }
				},
                series: [
					{
	                	type: "bar",
	                    data: [0],
	                    labels: {
	                        visible: false,
	                        background: "transparent",
	                    },
	                    stack: false,
	                    name: "가동중",
	                    color: "#aaffaa",
	                    overlay: {gradient: "sharpBevel"},
	                    border: {width: 1},
	                    axis: "stick",
	                    stack: "stack"
                    },
					{
	                	type: "bar",
	                    data: [0],
	                    labels: {
	                        visible: false,
	                        background: "transparent",
	                    },
	                    stack: false,
	                    name: "대기중",
	                    color: "#ffd699",
	                    overlay: {gradient: "sharpBevel"},
	                    border: {width: 1},
	                    axis: "stick",
	                    stack: "stack"
                    },
					{
	                	type: "bar",
	                    data: [0],
	                    labels: {
	                        visible: false,
	                        background: "transparent",
	                    },
	                    stack: false,
	                    name: "수리중",
	                    color: "#ff9999",
	                    overlay: {gradient: "sharpBevel"},
	                    border: {width: 1},
	                    axis: "stick",
	                    stack: "stack"
                    }
				],
				valueAxes: [{
					min: 0,
					max: 100,
					name: "stick",
				}],
                categoryAxis: {
                    axisCrossingValues: [0, 0, 10, 10],
                    color: "#585858"
				},
                tooltip: {
                	visible: true,
                    template: "#= series.name #: #= value +'%' #"
				},
				render: function() {
					ldCk++;
				}
			});
			
		},

		/**
		 * @name         : areaSeason
		 * @description  : 지역, 계절별 차량 대여 현황
		 * @date         : 2023. 10. 27
		 * @author       : 김경룡
		 */
		areaSeason: function(spring, summer, autumn, winter, area) {
			$("#multi-chart3").kendoChart({
                legend: {
					position: "right",
					labels: { template: "#= series.name #", font: "20px sans-serif" }
				},
                series: [
					{
	                	type: "column",
	                    data: spring,
	                    stack: false,
	                    name: "봄",
	                    color: "#FFC0CB",
	                    overlay: {gradient: "none"},
	                    border: {width: 0},
	                    axis: "stick"
                    }, 
                    {
                    	type: "column",
                        data: summer,
                        stack: false,
                        name: "여름",
                        color: "#ADD8E6",
                        overlay: {gradient: "none"},
                        border: {width: 0},
                        axis: "stick"
					},
                    {
                    	type: "column",
                        data: autumn,
                        stack: false,
                        name: "가을",
                        color: "#FFD700",
                        overlay: {gradient: "none"},
                        border: {width: 0},
                        axis: "stick"
					},
                    {
                    	type: "column",
                        data: winter,
                        stack: false,
                        name: "겨울",
                        color: "#DCDCDC",
                        overlay: {gradient: "none"},
                        border: {width: 0},
                        axis: "stick"
					}
				],
				valueAxes: [
					{title: {text: "", font: "13px, Pretendard"}, name: "stick"}
				],
                categoryAxis: {
                	categories: area,
                    axisCrossingValues: [0, 0, 10, 10],
                    color: "#585858"
				},
                tooltip: {
                	visible: true,
                    template: "#= series.name #: #= value +'대' #"
				},
				render: function() {
					ldCk++;
				}
			});
		},
		
		/*대여사업자 현황 그리드*/
		createTimeGrid: function(data) {
			$("#grid02").kendoGrid({
                dataSource: data,
                columns: gridTimeColumns,
                navigatable: true,
                editable: false,
				resizable: true,
				scrollable: false,
                noRecords: { template : "데이터가 없습니다." },
                dataBound: function() {ldCk++;}
			});
			
			$("#grid03").kendoGrid({
                dataSource: data,
                columns: gridTimeCarColumns,
                navigatable: true,
                editable: false,
				resizable: true,
				scrollable: false,
                noRecords: { template : "데이터가 없습니다." }, 
                dataBound: function() {ldCk++;}
			});
		}, 
		
		/* 대여사업자 정보갱신이력 */
		createHsGrid: function() {
			$("#grid04").kendoGrid({
                dataSource: null,
                columns: gridTimeHsColumns,
                navigatable: true,
                editable: false,
				resizable: true,
				scrollable: false,
                noRecords: { template : "데이터가 없습니다." }, 
                dataBound: function() {ldCk++;}
			});			
		},
		
		/* 차량 결함 정보 */		
		createDfInfoGrid: function() {
			$("#dfInfo-grid").kendoGrid({
				dataSource: null,
                columns: dfInfoColumns,
                navigatable: true,
                editable: false,
				resizable: true,
				scrollable: true,
				sortable: true,
                noRecords: { template : "데이터가 없습니다." }, 
                dataBound: function() {ldCk++;}
			});
		},	
    };
    
    $statistics.datePicker = {
		bsYearDate: function() {
			var yearArr = [];
			var yearStrt = 2023;
			for(var i=nowYear; i>=yearStrt; i--) {
				yearArr.push({text: i.toString(), value: i.toString()});
			}
			
			$("#date_drop").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: yearArr,
				value: "value"
			});
		}
	};
	
	$statistics.event = {
				
		/**
		 * @name         : periodSearch
		 * @description  : 조회년도 검색 버튼 / 전체 차트 조회
		 * @date         : 2023. 11. 02
		 * @author       : 김경룡
		 */
		periodSearch: function() {
			kendo.ui.progress($("body"), true);
			$("body").css("overflow", "hidden");
			
			ldCk = 0;
			
			var params = {};
			
			if(authPage.authrtCd == "G01") {
				params = {
					"yearStand"  : $("#date_drop").val(),
					"sggCd"      : authPage.cmptncZoneCd
				};
			} else {
				params = {
					"yearStand"  : $("#date_drop").val()
				};
			}
			
			// 대여사업자 현황
			ajax(true, contextPath + '/stts/allTotStts/agencyTimeYearGrid', 'body', '조회중입니다', params, function(data) {
				$("#grid02").data("kendoGrid").setDataSource([data.agencyTimeYearGrid[0]]);
				$("#grid03").data("kendoGrid").setDataSource([data.agencyTimeYearGrid[0]]);
			});
			
			// 대여사업자 정보갱신이력
			ajax(true, contextPath + '/stts/allTotStts/agencyHsGrid', 'body', '조회중입니다', params, function(data) {
				if(data.agencyHsGrid == 0) {
					if($("#grid02").data("kendoGrid").dataSource.total() == 0) {
						$("#grid04").data("kendoGrid").setDataSource(); 
					} else {
						$("#grid04").data("kendoGrid").setDataSource([{"agencyHsGrid" : 0}]); 
					}
				} else {
					$("#grid04").data("kendoGrid").setDataSource([data]); 
				}
			});
			
			// 면허정보 조회
			ajax(true, contextPath + '/stts/allTotStts/verfResult', 'body', '조회중입니다', params, function(data) {
				if(data.verfResult.length == 0) {
					$("#null-verf-chart").show();
					$("#verf-chart").hide();
				} else {
					$("#null-verf-chart").hide();
					$("#verf-chart").show();
					$statistics.ui.verfResult(data.verfResult[0]);
				}
			});
			
			// 지역별/대여사업자별 차량 대여 현황
			ajax(true, contextPath + '/stts/allTotStts/areaRentTop5', 'body', '조회중입니다', params, function(data) {
				if(authrtCd == 'G01') {
					if(data.agencyRentTop5.length == 0) {
						$("#donut-chart").hide();
						$("#null-donut-data").show();
						ldCk++;
					} else {
						$("#donut-chart").show();
						$("#null-donut-data").hide();
						var id = "#donut-chart";
						var yn = data.agencyRentTop5;
						var color = ["#3498DB", "#52B3D9", "#68C3A3", "#F2C938", "#F29F38"];
						var dataSet = [];
						if(yn.length >= 5) {
							for(var i=0; i<5; i++) {
								dataSet.push({category: yn[i].coNm, value: yn[i].cnt, color: color[i]});
							}
							$("#num1").text('5');
						} else {
							for(var i=0; i<yn.length; i++) {
								dataSet.push({category: yn[i].coNm, value: yn[i].cnt, color: color[i]});
							}
							$("#num1").text(yn.length);
						}
						
						$statistics.ui.createChartDonut(id, dataSet);
					}
				} else {
					if(data.areaRentTop5.length == 0) {
						$("#donut-chart").hide();
						$("#null-donut-data").show();
						ldCk++;
					} else {
						$("#donut-chart").show();
						$("#null-donut-data").hide();
						var id = "#donut-chart";
						var yn = data.areaRentTop5;
						var color = ["#3498DB", "#52B3D9", "#68C3A3", "#F2C938", "#F29F38"];
						var dataSet = [];
						if(yn.length >= 5) {
							for(var i=0; i<5; i++) {
								dataSet.push({category: yn[i].sido, value: yn[i].cnt, color: color[i]});
							}
							$("#num1").text('5');
						} else {
							for(var i=0; i<yn.length; i++) {
								dataSet.push({category: yn[i].sido, value: yn[i].cnt, color: color[i]});
							}
							$("#num1").text(yn.length);
						}
						
						$statistics.ui.createChartDonut(id, dataSet);
					}
				}
			});
			// 지역별/대여사업자별 차량 결함 현황
			ajax(true, contextPath + '/stts/allTotStts/areaFlawTop5', 'body', '조회중입니다', params, function(data) {
				if(authrtCd == 'G01') {
//					if(data.agencyFlawTop5.length == 0) {
					if(1) {
						$("#donut-chart2").hide();
						$("#null-donut-data2").show();
						ldCk++;
					} else {
						$("#donut-chart2").show();
						$("#null-donut-data2").hide();
						var id = "#donut-chart2";
						var yn = data.agencyFlawTop5;
						var color = ["#FF6B6B", "#FF8F8F", "#FFADAD", "#FFD7D7", "#FFC3A0"];
						var dataSet = [];
						if(yn.length >= 5) {
							for(var i=0; i<5; i++) {
								dataSet.push({category: yn[i].coNm, value: yn[i].cnt, color: color[i]});
							}
							$("#num2").text('5');
						} else {
							for(var i=0; i<yn.length; i++) {
								dataSet.push({category: yn[i].coNm, value: yn[i].cnt, color: color[i]});
							}
							$("#num2").text(yn.length);
						}
						
						$statistics.ui.createChartDonut(id, dataSet);
					}
				} else {
//					if(data.areaFlawTop5.length == 0) {
					if(1) {
						$("#donut-chart2").hide();
						$("#null-donut-data2").show();
						ldCk++;
					} else {
						$("#donut-chart2").show();
						$("#null-donut-data2").hide();
						var id = "#donut-chart2";
						var yn = data.areaFlawTop5;
						var color = ["#FF6B6B", "#FF8F8F", "#FFADAD", "#FFD7D7", "#FFC3A0"];
						var dataSet = [];
						if(yn.length >= 5) {
							for(var i=0; i<5; i++) {
								dataSet.push({category: yn[i].sido, value: yn[i].cnt, color: color[i]});
							}
							$("#num2").text('5');
						} else {
							for(var i=0; i<yn.length; i++) {
								dataSet.push({category: yn[i].sido, value: yn[i].cnt, color: color[i]});
							}
							$("#num2").text(yn.length);
						}
						
						$statistics.ui.createChartDonut(id, dataSet);
					}
				}
			});
			// 지역별/대여사업자별 차량 보유 현황
			ajax(true, contextPath + '/stts/allTotStts/areaHaveTop5', 'body', '조회중입니다', params, function(data) {
				if(authrtCd == 'G01') {
					if(data.agencyHaveTop5.length == 0) {
						$("#donut-chart3").hide();
						$("#null-donut-data3").show();
						ldCk++;
					} else {
						$("#donut-chart3").show();
						$("#null-donut-data3").hide();
						var id = "#donut-chart3";
						var yn = data.agencyHaveTop5;
						var color = ["#6BFF6B", "#8FFF8F", "#ADFFAD", "#D7FFD7", "#A0FFC3"];
						var dataSet = [];
						if(yn.length >= 5) {
							for(var i=0; i<5; i++) {
								dataSet.push({category: yn[i].coNm, value: yn[i].cnt, color: color[i]});
							}
							$("#num3").text('5');
						} else {
							for(var i=0; i<yn.length; i++) {
								dataSet.push({category: yn[i].coNm, value: yn[i].cnt, color: color[i]});
							}
							$("#num3").text(yn.length);
						}
						
						$statistics.ui.createChartDonut(id, dataSet);
					}
				} else {
					if(data.areaHaveTop5.length == 0) {
						$("#donut-chart3").hide();
						$("#null-donut-data3").show();
						ldCk++;
					} else {
						$("#donut-chart3").show();
						$("#null-donut-data3").hide();
						var id = "#donut-chart3";
						var yn = data.areaHaveTop5;
						var color = ["#6BFF6B", "#8FFF8F", "#ADFFAD", "#D7FFD7", "#A0FFC3"];
						var dataSet = [];
						if(yn.length >= 5) {
							for(var i=0; i<5; i++) {
								dataSet.push({category: yn[i].sido, value: yn[i].cnt, color: color[i]});
							}
							$("#num3").text('5');
						} else {
							for(var i=0; i<yn.length; i++) {
								dataSet.push({category: yn[i].sido, value: yn[i].cnt, color: color[i]});
							}
							$("#num3").text(yn.length);
						}
						
						$statistics.ui.createChartDonut(id, dataSet);
					}
				}
			});
			
			// 차량 가동률
			if(1) {
				$("#useCar-chart").hide();
				$("#null-useCar-chart").show();
				ldCk++;
			} else {
				$("#useCar-chart").show();
				$("#null-useCar-chart").hide();
				
				$statistics.ui.useCarPer();
			}
			
			// 차량 결함정보
			ajax(true, contextPath + '/stts/allTotStts/carDefectsInfo', 'body', '조회중입니다', params, function(data) {
				$("#dfInfo-grid").data("kendoGrid").setDataSource(data.carDefectsInfo);
			});	
			
			// 지역/계절별 차량 대여 현황
			if(authrtCd == 'G01') {
				$("#authDiv").hide();
			} else {
				$("#authDiv").show();
				ajax(true, contextPath + '/stts/allTotStts/areaSeasonRent', 'body', '조회중입니다', params, function(data) {
					if(data.areaSeasonRent.length == 0) {
						$("#multi-chart3").hide();
						$("#null-multi-chart3").show();
					} else {
						$("#multi-chart3").show();
						$("#null-multi-chart3").hide();
						
						var spring = [];
						var summer = [];
						var autumn = [];
						var winter = [];
						var area = [];
						
						for(var i=0; i<data.areaSeasonRent.length; i++) {
							spring.push(data.areaSeasonRent[i].spring);
							summer.push(data.areaSeasonRent[i].summer);
							autumn.push(data.areaSeasonRent[i].autumn);
							winter.push(data.areaSeasonRent[i].winter);
							area.push(data.areaSeasonRent[i].sido);
						}
						
						$statistics.ui.areaSeason(spring, summer, autumn, winter, area);
					}
				});
			}
			
			var loading = setInterval(function() {
				if(ldCk >= 8) {
					kendo.ui.progress($("body"), false);
					$("body").css("overflow", "scroll");
					clearInterval(loading);
				}
			});
		}
	};

}(window, document, jQuery));