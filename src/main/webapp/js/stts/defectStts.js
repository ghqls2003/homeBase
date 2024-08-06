/**
 * 대여차량 통계
 *
 * date : 2024/02/20
 * author : 김경룡
 *
 */
(function (W, D, $) {
    'use strict';

    W.$statistics = W.$statistics || {};
    
	/* 그리드 컬럼*/
	var crprtnColumns = [
		{template: "#: sn#", title: "순번", width: "50px", field: "sn"},
		{template: "#: defectsSn#", title: "결함일련번호", width: "80px", field: "defectsSn"},
		{template: "#: coNm#", title: "법인명", width: "150px", field: "coNm"},
		{template: "#: crno#", title: "법인번호", width: "100px", field: "crno"},
		{template: "#: vin#", title: "차대번호", width: "120px", field: "vin"},
		{template: "#: vhclRegNo#", title: "차량등록번호", width: "100px", field: "vhclRegNo"},
		{template: "#: carmdl#", title: "차종", width: "80px", field: "carmdl"},
		{template: "#: mdlyr#", title: "연식", width: "80px", field: "mdlyr"},
		{template: "#: defectsTypeCd#", title: "결함유형", width: "80px", field: "defectsTypeCd"},
		{template: "#: prcsSttsCd#", title: "결함내용", width: "200px", field: "prcsSttsCd"}
	];
	
    $(document).ready(function() {
		kendo.ui.progress($(document.body), true);
		if(cmptncZoneCd.substr(0,2) == '42') {
			CmptncZoneCd= '51'+cmptncZoneCd.substr(2, cmptncZoneCd.length)
		} else if(cmptncZoneCd.substr(0,2) == '45') {
			CmptncZoneCd= '52'+cmptncZoneCd.substr(2, cmptncZoneCd.length)
		}
		
        $statistics.ui.pageLoad();
    });
    
    $statistics.ui = {
        pageLoad : function() {
	        $("#null-donut-data").hide();
			
			// 대여차량 차종별 통계
			ajax(false, contextPath + '/stts/defectStts/defectCate', 'body', '조회중입니다', {}, function(data) {
				var dataList = [];
				var colorHex = ["#FFD1DC", "#AEE0FF"];
				
				dataList.push({category: "리콜", value: data[0].recall, color: colorHex[0]});
				dataList.push({category: "무상수리", value: data[0].refair, color: colorHex[1]});
				
				if(data.length == 0) {
					$("#defectCateChart").hide();
					$("#null-donut-data").show();
				} else {
					$("#defectCateChart").show();
					$("#null-donut-data").hide();
					$statistics.ui.defectCateChart(dataList);
				}
			});
	        
			// 대여차량 연식별 통계
			ajax(false, contextPath + '/stts/defectStts/defectCntnt', 'body', '조회중입니다', {}, function(data) {
				var dataList = [];
				
				for(var i=0; i<data.length; i++) {
					dataList.push({cate: data[i].defectsSn, cnt: data[i].cnt, trg: data[i].cnt*1.5, content: data[i].prcsSttsCd});
				}
				
				$statistics.ui.defectCntntChart(dataList);
			});
			
			// 대여차량 결함 현황
			$statistics.ui.createAreaGrid();
        },
        
		/* 대여차량결함 유형별 */
		defectCateChart: function(dataList) {
			$("#defectCateChart").kendoChart({
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
		
		/* 대여차량결함 내용별 */
		defectCntntChart: function(dataList) {
			$("#defectCntntChart").kendoChart({
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
	              	field: "cate",
	              	title: {
	                	text: "결함일련번호"
	              	}
	            },
	            valueAxis: {
			        visible: false
			    },
	            tooltip: {
                	visible: true,
                    template: "#= dataItem.content#"
//                    template: "#= category # : #= FormatNumber(dataItem.cnt)#대"
				}
			});
		},
		
		/* 대여차량 결함 통계 그리드 */
		createAreaGrid: function() {
			$("#grid01").kendoGrid({
                dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/stts/defectStts/defectsData',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							options.authEx = "";
							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					page: 1,
					pageSize: 10,
					serverPaging: true,
					serverSorting: false,
					autoBind: false,
				},
                columns: crprtnColumns,
                navigatable: true,
                selectable: "row",
                editable: false,
				resizable: true,
				pageable: {
					pageSizes: [5, 10, 20],
					buttonCount: 5,
					serverPaging: true
				},
				scrollable: true,
                sortable: true,
                dataBound: function() {
					$("#grid01 > tbody > tr:last-child > td.k-hierarchy-cell").css("visibility", "hidden");
					kendo.ui.progress($(document.body), false);
				},
                noRecords: { template : "데이터가 없습니다." },
                toolbar: [{name: "excel", text:"다운로드"}],
                excel: { allPages: true },
				excelExport : function(e){
					if($("#grid01").data("kendoGrid").dataSource.total() == 0) {
						e.preventDefault();
						alert("데이터가 없어 다운로드를 할 수 없습니다.");
					} else {
					    e.workbook.fileName = "대여차량 결함현황.xlsx";
						e.workbook.sheets[0].title = "차량 결함현황";
					}
				}
			});
		}
    };
    
	$statistics.event = {
		/* kendo Excel 사용 */
		excelDown: function(event) {
			alert("개발중입니다.");
//			if(event.target.closest("#areaGrid") != null) {
//				$("#areaGrid").find(".k-grid-excel").click();
//			}
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