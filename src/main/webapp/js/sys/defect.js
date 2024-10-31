(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

    W.$defect = W.$defect || {};

	var vin;
	var defects_sn;
	   
	var boundTotal = null;  // 엑셀다운로드 시 로직 안돌도록 빠르게.

	//그리드 처음 로딩여부
    $(document).ready(function() {
		$defect.ui.pageLoad();		//최초 페이지 로드 시
		$defect.ui.defectInfo();  // 대여차량 결함정보 그리드
		$defect.event.setUIEvent();
    });

	$defect.ui = {
		
		pageLoad : function() {
			$defect.ui.search();
			
		},
		
		defectInfo: function() {
			$("#defectGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sys/defect/selectDefectInfo',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
							complete: function() {
							}
						},
						parameterMap: function(options) {
							var sd = $("#start-picker01").val();
							var ed = $("#end-picker01").val();
							var startDt = sd.replace(/-/g, "");
							var endDt = ed.replace(/-/g, "");
							options.coNm = $("#searchCoNm").val();
							options.startDt = startDt;
							options.endDt = endDt;
							options.vhclRegNo = $("#searchCarNum").val();
							options.crrtvactRslt = $("#crrtvactRslt").val();

							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					pageSize: 10,
					serverPaging: true,
				},
				navigatable: true,
				pageable: {
					pageSizes: [5, 10, 20],
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: [
					{ field: "rn", title: "순번", width: "50px", template: "#:rn #", sortable: false },
					{ field: "co_nm", title: "회사명", width: "75px", template: "#= co_nm != null ? co_nm : '-' #", sortable: false },
					{ field: "vin", title: "차대번호", width: "100px", template: "#= vin != null ? vin : '-' #", sortable: true },
					{ field: "vhcl_reg_no", title: "차량번호", width: "100px", template: "#= vhcl_reg_no != null ? vhcl_reg_no : '-' #", sortable: true },
					{ field: "defects_sn", title: "결함일련번호", width: "100px", template: "#= defects_sn != null ? defects_sn : '-' #", sortable: true },
					{ field: "ocrn_dt", title: "발생일시", width: "100px", template: "#: $defect.event.dateFomat(ocrn_dt) #", sortable: true },
					{ field: "defects_type_cd", title: "결함유형", width: "100px", template: "#= defects_type_cd != null ? defects_type_cd : '-' #", sortable: true },
					{ field: "prcs_stts_cd", title: "처리상태코드", width: "100px", template: "#= prcs_stts_cd != null ? prcs_stts_cd : '-' #", sortable: true },
					{ field: "defects_cn", title: "결함내용", width: "100px", template: "#= defects_cn != null ? defects_cn : '-' #", sortable: true },
					{ field: "crrtvact_rslt_nm", title: "시정조치 결과", width: "100px", template: "#= crrtvact_rslt_nm != null ? crrtvact_rslt_nm : '-' #", sortable: true },
				],
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
				dataBound: function(e) {
					boundTotal = this.dataSource.total();
					kendo.ui.progress($(document.body), false);
				},
				excel: { allPages: true },
				excelExport: function(e) {
					e.workbook.fileName = "대여차량 결함정보([" +$("#start-picker01").val() +' ~ '+  $("#end-picker01").val()+ "] 기간).xlsx";
					e.workbook.sheets[0].title = $("#start-picker01").val() +' ~ '+  $("#end-picker01").val() + " 기간";
				},
				change: $defect.ui.rowClickEvent
			})

		},
		
		rowClickEvent: function(e) {
			var rows = e.sender.select();
			var dataItem = null;
			
			rows.each(function(e) {
				var grid = $("#defectGrid").data("kendoGrid");
				dataItem = grid.dataItem(this);
			});
			
			$defect.event.detailInfoPopup(dataItem);
		},
		
		decttGridrowClickEvent: function(e) {
			var rows = e.sender.select();
			var dataItem = null;

			rows.each(function(e) {
				//var grid = $("#defectCarGrid").data("kendoGrid");
				dataItem = grid.dataItem(this);
				$("#insertDefectSn").val(dataItem.defects_sn);
			});			
		},
		
		
		search : function(){
			var param = {};
			
			//기간 검색
			var oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));
			
			$("#start-picker01").kendoDatePicker({
				dateInput: true,
				format: "yyyy-MM-dd",
				value: new Date(oneMonthAgo),
			});
			$("#start-picker01").attr("readonly", true);

			$("#end-picker01").kendoDatePicker({
				format: "yyyy-MM-dd",
				value: new Date(),
			});
			$("#end-picker01").attr("readonly", true);	
			
			
			$("#insertRegDt").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				max: new Date()
			});
			
			$("#insertActnDt").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				max: new Date()
			});

			// 조치 여부
			var crrtvactRslt = [
				{ value: "Y", text: "조치" },
				{ value: "N", text: "미조치" },
			];
			
			//사용 여부
			var useYn = [
				{ value: "Y", text: "사용" },
				{ value: "N", text: "미사용" },
			];
			
			//조치 유형 코드
			var actnTyCd = [
				{ value: "Y", text: "수리" },
				{ value: "N", text: "미수리" },
			];
			
			//시정조치 내용
			var actnCn = [
				{ value: "Y", text: "성공" },
				{ value: "N", text: "실패" },
			];
			
			//시정조치 결과 코드
			var actnRs = [
				{ value: "Y", text: "결과 코드 1" },
				{ value: "N", text: "결과 코드 2" },
			];
			
			
			$("#crrtvactRslt").kendoDropDownList({
				optionLabel: '조치여부(전체)',
				dataTextField: "text",
				dataValueField: "value",
				dataSource: crrtvactRslt
			});
			
			
			$("#useYn").kendoDropDownList({
				optionLabel: '사용여부(전체)',
				dataTextField: "text",
				dataValueField: "value",
				dataSource: useYn
			});
			
		
			$("#insertActnYn").kendoDropDownList({
				optionLabel: '조치여부(전체)',
				dataTextField: "text",
				dataValueField: "value",
				dataSource: crrtvactRslt
			});
			
			$("#insertActnTyCd").kendoDropDownList({
				optionLabel: '시정조치 유형코드(전체)',
				dataTextField: "text",
				dataValueField: "value",
				dataSource: actnTyCd
			});

			$("#insertActnRsCd").kendoDropDownList({
				optionLabel: '시정조치 결과코드(전체)',
				dataTextField: "text",
				dataValueField: "value",
				dataSource: actnRs
			});
			
			$("#detailActnCn").kendoDropDownList({
				optionLabel: '시정조치 내용(전체)',
				dataTextField: "text",
				dataValueField: "value",
				dataSource: actnCn
			});
			
			ajax(true, contextPath + '/sys/defect/selectCtpvNm', 'body', '처리중입니다.', param, function(data) {
				$('#ctpvNm').kendoDropDownList({
					optionLabel: "시도",
					dataTextField: "ctpv_nm",
					dataValueField: "ctpv_cd",
					dataSource: data,
					value: "ctpv_cd",
					change: function() {
						if (this.value() == '') {
							$('#sggNm').data("kendoDropDownList").setDataSource(null);
						} else {
							param.ctpvCd = this.value();
							ajax(true, contextPath + '/sys/defect/selectSggNm', 'body', '처리중입니다.', param, function(data) {
								$('#sggNm').kendoDropDownList({
									optionLabel: "시군구",
									dataTextField: "sgg_nm",
									dataValueField: "full_sgg_cd",
									dataSource: data,
									value: "sgg_cd"
								});
							});
						}
					}
				});
			});
			
		
			ajax(true, contextPath + '/sys/defect/selectSggNm', 'body', '처리중입니다.', param, function(data) {
				$('#sggNm').kendoDropDownList({
					optionLabel: "시군구",
					dataTextField: "sgg_nm",
					dataValueField: "full_sgg_cd",
					dataSource: data,
					value: "sgg_cd"
				});
			});
			
		},
	};

    //이벤트 정의
	$defect.event = {
		setUIEvent: function() {
			
			// 등록 팝업 X, 닫기 버튼
			$("#close, .cancle_btn").on("click", function() {
				//location.reload();
				$(".viewDefect_popup").removeClass("view");
			});
			
			// 대여차량 결함정보 조회 버튼
			$(".searchBtn").on("click", function() {
				var start = new Date($("#start-picker01").val());
				var end = new Date($("#end-picker01").val());
				if (end > new Date(new Date(start).setMonth(start.getMonth() + 1))) {
					alert("한 달 이상으로 선택할 수 없습니다.");
					$('#start-picker01').data("kendoDatePicker").value(new Date(new Date(end).setMonth(end.getMonth() - 1)));
					return;
				}

				if (new Date($('#start-picker01').val()) > new Date($('#end-picker01').val())) {
					alert("시작일은 종료일보다 늦을 수 없습니다.");
					$('#end-picker01').data("kendoDatePicker").value(new Date($('#start-picker01').val()));
					return;
				}

				$defect.event.sendListSearch();
			});

			// 엑셀다운로드 버튼
			$(".exel_down").on("click", function() {
				$defect.event.excelDownBtn();
			});
	
			$(".sm_popup .cancel_btn").on("click", function() {
				$(".sm_popup").removeClass("view");
			});
		},
		
		dateFomat: function(data) {
			var date = new Date(data);

			var year = date.getFullYear();
			var month = String(date.getMonth() + 1).padStart(2, '0');
			var day = String(date.getDate()).padStart(2, '0');

			return year + '-' + month + '-' + day
		},

		sendListSearch: function() {
			var grid = $('#defectGrid').data('kendoGrid');
			grid.dataSource.page(1);
		},
			
		detailInfoPopup: function(dataItem) {
			var params = {
				vin : dataItem.vin,
				defects_sn : dataItem.defects_sn, 
			};
			vin = dataItem.vin;
			defects_sn = dataItem.defects_sn;
			
	
			$("#actnVin").val(dataItem.vin);
			$("#actnDefectsSn").val(dataItem.defects_sn);
			$("#actnPrcsSttsCd").val(dataItem.prcs_stts_cd);
			$("#actnDefectsCn").val(dataItem.defects_cn);
			$("#actnDefectsTypeCd").val(dataItem.defects_type_cd);
			$("#actnOcrnDt").val(dataItem.ocrn_dt);
			
			
			ajax(true, contextPath + '/sys/defect/selectDetailDefectInfo', 'body', '확인중입니다.', params, function(data) {
		
				$("#detaildefectsRegNo").val(data.data[0].defectsRegNo);      //시정조치 일련번호
				$("#detailVin").val(data.data[0].vin);            			  //차대번호
				$("#detailCarRegNo").val(data.data[0].vhclRegNo); 			  //차량번호
				$("#detailCmptnYnNm").val(data.data[0].cmptnYnNm);     		  //시정조치 결과
				$("#detailActnDefectSn").val(data.data[0].defectsSn); 		  //결함일련번호
				$('#detailActnCrrtvActTtl').val(data.data[0].crrtvactTtl);    //시정조치 유형
				$('#detailActnCrrtvActYnNm').val(data.data[0].crrtvactYnNm);  //조치여부
				
				//$("#detailActnNm").val(data.data[0].usersn);        		  //등록자
				//$("#detailActnRmrk").val(data.); 		 					  //비고
				//$('#detailActnCn').data("kendoDropDownList").value(data.data[0].defectsCn); // 결함내용(시정조치 내용)
				
				const crrtvactStrtDay = data.data[0].crrtvactStrtDay;				
				if (!crrtvactStrtDay) {
					$("#detailActnCrrTvActStrtDay").val('0000-00-00');
				} else {
					$("#detailActnCrrTvActStrtDay").val(crrtvactStrtDay);
				}
					
				const regDt = data.data[0].regDt;
				if (!regDt) {
					$("#detailActnRegDt").val('0000-00-00');
				} else {
					$("#detailActnRegDt").val(regDt);
				}
			
				$(".viewDefect_popup").addClass("view");
			});
		},

		excelDownBtn: function() {
			if (boundTotal == 0) {
				alert("데이터가 없어 다운로드를 할 수 없습니다.");
			} else if (boundTotal > 10000) {
				alert("10,000 건 이하의 데이터만 다운로드 가능합니다.");
				return;
			} else {
				$("#defectGrid").data("kendoGrid").saveAsExcel();
			}
		},
	};
}(window, document, jQuery));