(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';

	W.$rntCnfCrtIsnHstr = W.$rntCnfCrtIsnHstr || {};

	$(document).ready(function() {
		$rntCnfCrtIsnHstr.ui.pageLoad();		//최초 페이지 로드 시
		$rntCnfCrtIsnHstr.event.setUIEvent();
	});

	var pcColumns = [
		{title: "순번", field: "rn", template: "#: rn #"},
		{title: "대여번호", field: "rentNo", template: "#: rentNo #"},
		{title: "차량번호", field: "vhclRegNo", template: "#: vhclRegNo #"},
		{title: "확인증발급 일시", field: "mdfcnDt", template: "#: mdfcnDt #"},
		{field: "대여 확인증", exportable: false, template: "<button class='gray_btn' style='width: 70px;height: 30px;' onclick='javascript:$rntCnfCrtIsnHstr.event.issued(`#:rentNo#`,`#:cnfrmnHstryNo#`);'>재발급</button>"}
	];

	var mobiColumns = [
		{title: "순번", field: "rn", width: "40px", template: "#: rn #"},
		{title: "대여번호", field: "rentNo", width: "130px", template: "#: rentNo #"},
		{title: "차량번호", field: "vhclRegNo", width: "80px", template: "#: vhclRegNo #"},
		{title: "확인증발급 일시", field: "mdfcnDt", width: "100px", template: "#: mdfcnDt #"},
		{field: "대여 확인증", width: "100px", exportable: false, template: "<button class='gray_btn' style='width: 70px;height: 30px;' onclick='javascript:$rntCnfCrtIsnHstr.event.issued(`#:rentNo#`,`#:cnfrmnHstryNo#`);'>재발급</button>"}
	];

	$rntCnfCrtIsnHstr.ui = {
		pageLoad: function() {
			var oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));
			$("#start-picker01").kendoDatePicker({
				format: "yyyy-MM-dd",
				value: new Date(oneMonthAgo)
			});

			$("#end-picker01").kendoDatePicker({
				format: "yyyy-MM-dd",
				value: new Date(),
			});

			$rntCnfCrtIsnHstr.ui.kendoGrid();

			if(authrtCd == 'G01'){
				var grid = $("#rntCnfCrtIsnHstrGrid").data("kendoGrid");
				grid.hideColumn("대여 확인증");
			}
		},

		kendoGrid: function() {
			$("#rntCnfCrtIsnHstrGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/vfc/rntCnfCrtIsnHstr/selectrntCnfCrtIsnHstrList',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
							complete: function(xhr, status) {
								if (xhr.status != 200) {
									if (xhr.status == 401) {
										alert("권한이 없습니다. 사용자 인증이 필요합니다.");
									} else if (xhr.status == 403) {
										alert("세션이 만료되었습니다. 로그인페이지로 이동합니다.");
										location.href = "/rims";
									} else {
										alert("처리 중 에러가 발생하였습니다.");
									}
								}
							},
						},
						parameterMap: function(options) {
							options.startDt = $("#start-picker01").val();
							options.endDt = $("#end-picker01").val();

							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					pageSize: 10,
					serverPaging: true
				},
				navigatable: true,
				pageable: {
					pageSizes: [5, 10, 20],
					buttonCount: 5
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: userTypeBool ? pcColumns : mobiColumns,
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
				change: $rntCnfCrtIsnHstr.ui.rowClickEvent
			});
		},
		rowClickEvent: function(e) {
			var rows = e.sender.select();
			var data;

			rows.each(function(e) {
				var grid = $("#rntCnfCrtIsnHstrGrid").data("kendoGrid");
				var dataItem = grid.dataItem(this);
				data = dataItem;
			});
			$rntCnfCrtIsnHstr.event.detailInfoPopup(data.rentNo, data.cnfrmnHstryNo);
		}
	};

	//이벤트 정의
	$rntCnfCrtIsnHstr.event = {
		setUIEvent: function() {

			$("#searchBtn").on("click", function() {
				var start = new Date($("#start-picker01").val());
				var end = new Date($("#end-picker01").val());
				if(end > new Date(new Date(start).setMonth(start.getMonth() + 1))){
					alert("한 달 이상으로 선택할 수 없습니다.");
					$('#start-picker01').data("kendoDatePicker").value(new Date(new Date(end).setMonth(end.getMonth() - 1)));
					return;
				}

				if(new Date($('#start-picker01').val()) > new Date($('#end-picker01').val())){
					alert("시작일은 종료일보다 늦을 수 없습니다.");
//					$('#end-picker01').data("kendoDatePicker").value(new Date($('#start-picker01').val()));
					return;
				}

				$rntCnfCrtIsnHstr.event.search();
			});

			$(".excelDownBtn").on("click", function() {
				$rntCnfCrtIsnHstr.event.excelDownBtn();
			});

			$(".detailPopupClose").on("click", function() {
				var grid = $("#rntCnfCrtIsnHstrGrid").data("kendoGrid");
				grid.dataSource.read();
			});

			$(".confPrintAndInsert").on("click", function() {
				$rntCnfCrtIsnHstr.event.confPrint();
				$rntCnfCrtIsnHstr.event.confInsert();
				$('#rntCnfCrtIsnHstrGrid').data('kendoGrid').dataSource.read();
			});

			$(".confPopupClose").on("click", function() {
				$('#rntCnfCrtIsnHstrGrid').data('kendoGrid').dataSource.read();
			});

		},
		search: function() {
			var grid = $('#rntCnfCrtIsnHstrGrid').data('kendoGrid');
			grid.dataSource.page(1);
		},

		excelDownBtn: function() {
			var fileNm = "rntCnfCrtIsnHstr";
			var params = {};

			params.startDt = $("#start-picker01").val();
			params.endDt = $("#end-picker01").val();
			params.elxExcelDownReason = $('#elxExcelDownReason').val();
			params._csrf = $('._csrf').val();
			var totalRowCount = $("#rntCnfCrtIsnHstrGrid").data("kendoGrid").dataSource.total();

			excelDown("/vfc/rntCnfCrtIsnHstr/excelDown", params, fileNm, totalRowCount);
		},

		issued: function(rentNo, confCertHstryNo) {
			var params = {}
			params.rentNo = rentNo;
			params.confCertHstryNo = confCertHstryNo;

			if (rentNo == null || rentNo == '')
				alert('대여번호가 없어 확인증을 발급할 수 없습니다.')
			else {
				popupReport(contextPath + '/vfc/reRentalReport', params);
				$rntCnfCrtIsnHstr.event.confInsert();
			}

			/*ajax(true, contextPath + '/vfc/rntCnfCrtIsnHstr/selectReIssuedData', 'body', '확인인중입니다.', params, function (data) {
				var confData = data[0]
				$("#confInfoPopup").addClass("view");

				$("#confRentNo").val(confData.rentNo);
				$("#confCertHstryNo").val(confData.confCertHstryNo);

				$("#confVhclNm").val(confData.vhclNm);
				$("#confVhclRegNo").val(confData.vhclRegNo);
				$("#confVin").val(confData.vin);

				$("#confCoNm").val(confData.coNm);
				$("#confAddr").val(confData.addr);
				$("#confTelno").val(confData.telno);

				$("#confDln").val(confData.dln);

				$("#confRentBgngDt").val(confData.rentBgngDt);
				$("#confRentEndDt").val(confData.rentEndDt);
				$("#confDiffddhhmm").val(confData.diffDdHhMm);

			});*/
		},
		confPrint: function() {
//			console.log("확인증 프린트할 함수");
		},
		confInsert: function() {

			var params = {};
			params.rentNo = $("#confRentNo").val();
			params.confCertHstryNo = $("#confCertHstryNo").val();

			ajax(true, contextPath + '/vfc/rntCnfCrtIsnHstr/insertConfData', 'body', '확인인중입니다.', params, function(data) {
//				alert("대여확인증이 재발급되었습니다.");
			});
		},
		detailInfoPopup: function(rentNo, confCertHstryNo) {

			var params = {};
			params.rentNo = rentNo;
			params.confCertHstryNo = confCertHstryNo;

			ajax(true, contextPath + '/vfc/rntCnfCrtIsnHstr/selectDetailConfInfo', 'body', '확인인중입니다.', params, function(data) {
				$("#detailRentNo").val(data[0].rentNo);
				$("#detailVhclRegNo").val(data[0].vhclRegNo);
				$("#detailRentSttsNm").val(data[0].rentSttsNm);
				$("#detailRentHstryNo").val(data[0].rentHstryNo);
				$("#startDt").val(data[0].rentBgngDt);
				$("#endDt").val(data[0].rentEndDt);
				$("#mdfcnDt").val(data[0].mdfcnDt);
			});

			$("#detailInfoPopup").addClass("view");
		},

	};

}(window, document, jQuery));