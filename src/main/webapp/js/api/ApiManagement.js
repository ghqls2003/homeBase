
(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';
	var rowData;
	W.$apimanagement = W.$apimanagement || {};


	$(document).ready(function() {
		$apimanagement.ui.pageLoad();		//최초 페이지 로드 시
		$apimanagement.ui.apiView();		//최초 페이지 로드 시
		$apimanagement.event.setUIEvent();
	});

	$apimanagement.ui = {
		pageLoad: function() {
			var searchOtherCondition = [
				{ value: "", text: "전체" },
				{ value: "ApiNm2", text: "API명" },
				{ value: "userId2", text: "아이디" }
			];
			var searchOtherCondition2 = [
				{ value: "", text: "전체" },
				{ value: "Q1", text: "신청" },
				{ value: "Q2", text: "활용" },
				{ value: "Q3", text: "반려" },
				{ value: "Q4", text: "중지" }
			];

			$("#search_stts_cd2").kendoDropDownList({
				dataTextField: "text",
				dataSource: searchOtherCondition2,
				dataValueField: "value"
			});
			$("#search_stts_cd").kendoDropDownList({
				dataTextField: "text",
				dataSource: searchOtherCondition,
				dataValueField: "value"
			});
			$("#start-picker02").kendoDatePicker({

				value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date(),
				change: function() {
					var startDate = this.value();
					var endDatePicker = $("#end-picker02").data("kendoDatePicker");
					if (startDate) {
						endDatePicker.min(startDate); // Set minimum date for end-picker02
					}
					if (new Date($('#start-picker02').val()) > new Date($('#end-picker02').val())) {
						alert("시작일은 종료일보다 늦을 수 없습니다.");
						$('#start-picker02').data("kendoDatePicker").value(new Date($('#end-picker02').val()));
					}
				}
			});

			$("#end-picker02").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date()
			});


		},
		apiView: function() {
			$("#key_grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/api/ApiManagement/selectApiList',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							options.startPicker02 = $("#start-picker02").val();
							options.endPicker02 = $("#end-picker02").val();
							options.searchSttsCd = $("#search_stts_cd").val();
							options.searchSttsCd2 = $("#search_stts_cd2").val();
							options.searchReq = $("#txt_input").val();
							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
				},
				columns: [
					{ field: "rn", title: "번호", width: 50 },
					{ field: "ogdpNm", title: "회사명", width: 100 },
					{ field: "userId", title: "아이디", width: 100 },
					{ field: "bzmnSn", title: "사업자등록번호", width: 100 },
					{ field: "cdnm", title: "상태", width: 100 },
					{ field: "apiNm", title: "API명", width: 150 },
					{
						field: "dmndDt", title: "요청일자", width: 100,
						template: function(dataItem) {
							var dmndDate = new Date(dataItem.dmndDt);
							var dmndDateStr = kendo.toString(dmndDate, "yyyy-MM-dd");
							return dmndDateStr;
						}
					},
					{
						field: "aprvDt", title: "승인일시", width: 100,
						template: function(dataItem) {
							if (dataItem.aprvDt) {
								var aprvDate = new Date(dataItem.aprvDt);
								var aprvDateStr = kendo.toString(aprvDate, "yyyy-MM-dd");
								return aprvDateStr;
							} else {
								return "-";
							}
						}
					},
					{
						field: "expryYmd", title: "만료예정일", width: 100,
						template: function(dataItem) {
							var currentDate = new Date();
							var expryDateStr = dataItem.expryYmd;

							if (!expryDateStr) {
								return "-";
							}

							expryDateStr = expryDateStr.substring(0, 4) + '-' + expryDateStr.substring(4, 6) + '-' + expryDateStr.substring(6, 8);
							var expryDate = new Date(expryDateStr);

							if (isNaN(expryDate.getTime())) {
								return "-";
							}

							var differenceInDays = Math.floor((expryDate - currentDate) / (1000 * 60 * 60 * 24));

							if (differenceInDays < 30) {
								return '<span style="color: red;">' + expryDateStr + '</span>';
							} else {
								return expryDateStr;
							}
						}
					},
					{ field: "sec", title: "요청건수", width: 100 },
				],
				navigatable: true,
				pageable: {
					pageSize: 10,
					buttonCount: 5
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				editable: false,
				resizable: true,
				scrollable: {
					virtual: true,
					scrollX: true,
				},
				excel: {
					fileName: "excel.xlsx",
					allPages: true,
					filterable: true
				},
				selectable: "row",
				change: $apimanagement.ui.rowClickEvent
			});

		},
		rowClickEvent: function(e) {
			var rows = e.sender.select();
			var data;

			rows.each(function() {
				var grid = $("#key_grid").data("kendoGrid");
				var dataItem = grid.dataItem(this);
				data = dataItem;
			});
			rowData = data;

			var apiDetail = {};
			var apiSn = data.damsapi;
			$(".api_pop").addClass("view");

			$apimanagement.ui.selectApiDetailInfo(rowData);
		},
		selectApiDetailInfo: function(rowData) {
			var apiSn = rowData.damsapi
			var userSn = rowData.userSn
			var startPicker02 = $("#start-picker02").val();
			var endPicker02 = $("#end-picker02").val();
			var param = {};
			param.apiSn = apiSn
			param.userSn = userSn
			param.startPicker02 = startPicker02
			param.endPicker02 = endPicker02
			ajax(true, contextPath + '/api/ApiManagement/selectdetailApiList', 'body', '조회중입니다', param, function(data) {
				$('#api_com').val(data.data[0].ogdpNm);
				$('#api_id').val(data.data[0].userId);
				$('#api_comNum').val(data.data[0].bzmnSn);
				$('#api_state').val(data.data[0].cdnm);
				$('#api_name').val(data.data[0].apiNm);
				//				if ($('#api_date01').val(data.data[0].aprvDt) == null && $('#api_date01').html(data.data[0].aprvDt) == '') {
				//					return "-"
				//				} else {
				//					$('#api_date01').val(data.data[0].aprvDt)
				//				};
				var timestamp = data.data[0].aprvDt; // 타임스탬프 값 (예: 1698389177674)

				var date = new Date(timestamp);

				var year = date.getFullYear();
				var month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
				var day = String(date.getDate()).padStart(2, '0');

				var formattedDate = year + month + day;

				$('#api_date01').val(formattedDate);
				$('#api_date02').val(data.data[0].expryYmd);

				$('#api_app').val(data.data[0].sec);
				$('#apiSn').val(data.data[0].damsapi);
				$('#userSn').val(data.data[0].userSn);

				var cdnm = $('#api_state').val();
				if (cdnm == "중지") {
					$("#reuseApi").show();
					$("#stopApi").hide();
				}
				if (cdnm == "신청") {
					$("#approveApi").show();
					$("#rejectApi").show();
					$("#stopApi").hide();
					$("#reuseApi").hide();
				}
				if (cdnm == "활용") {
					$("#approveApi").hide();
					$("#rejectApi").hide();
					$("#stopApi").show();
					$("#reuseApi").hide();
				}
				if (cdnm == "반려") {
					$("#approveApi").hide();
					$("#rejectApi").hide();
					$("#stopApi").hide();
					$("#reuseApi").hide();
				}

			});
		},
		approveApi: function(param) {
			const arg = param
			ajax(true, contextPath + '/api/ApiManagement/updateApproveApiUse', 'body', '조회중입니다', arg, function(data) {
				alert("API가 승인 되었습니다.")
				var grid = $('#key_grid').data('kendoGrid');
				location.reload();

			});

		},
		rejectApi: function(param) {
			const arg = param
			ajax(true, contextPath + '/api/ApiManagement/updateRejectApiUse', 'body', '조회중입니다', arg, function(data) {
				alert("API가 반려 되었습니다.")
				var grid = $('#key_grid').data('kendoGrid');
				location.reload();

			});
		},
		stoptApi: function(param) {
			const arg = param
			ajax(true, contextPath + '/api/ApiManagement/updateStopApiUse', 'body', '조회중입니다', arg, function(data) {
				alert("API가 중지 되었습니다.")
				var grid = $('#key_grid').data('kendoGrid');
				location.reload();

			});
		},
		reuseApi: function(param) {
			const arg = param
			ajax(true, contextPath + '/api/ApiManagement/updateReuseApiUse', 'body', '조회중입니다', arg, function(data) {
				alert("API가 중지해제 되었습니다.")
				var grid = $('#key_grid').data('kendoGrid');
				location.reload();

			});
		},
		execlDownload: function() {
			var options = {};
			options.startPicker02 = $("#start-picker02").val();
			options.endPicker02 = $("#end-picker02").val();
			options.searchSttsCd = $("#search_stts_cd").val();
			options.searchSttsCd2 = $("#search_stts_cd2").val();
			options.searchReq = $("#txt_input").val();
			var filename = "API사용관리"

			excelDownAjax("/api/ApiManagement/excelDown", options, filename);

		},
	};

	//이벤트 정의
	$apimanagement.event = {
		setUIEvent: function() {
			$(".k-master-row .k-grid tbody tr").on("click", function() {
				$(".cmn_detail").addClass("view");
			});

			$(".cmn_detail .cancel_btn").on("click", function() {
				$(".cmn_detail").removeClass("view");
			});
			$(".search_btn").on("click", function() {
				var grid = $('#key_grid').data("kendoGrid");
				grid.dataSource.page(1);
				grid.dataSource.read();
			});
			$(".cmn_detail .close").on("click", function() {
				$(".cmn_detail").removeClass("view");
			});
			$("#approveApi").on("click", function() {
				const param = {}
				param.apiSn = $('#apiSn').val();
				param.userSn = $('#userSn').val();
				$apimanagement.ui.approveApi(param);

			});
			$("#rejectApi").on("click", function() {
				const param = {}
				param.apiSn = $('#apiSn').val();
				param.userSn = $('#userSn').val();
				$apimanagement.ui.rejectApi(param);
			});
			$("#stopApi").on("click", function() {
				const param = {}
				param.apiSn = $('#apiSn').val();
				param.userSn = $('#userSn').val();
				$apimanagement.ui.stoptApi(param);

			});
			$("#reuseApi").on("click", function() {
				const param = {}
				param.apiSn = $('#apiSn').val();
				param.userSn = $('#userSn').val();
				$apimanagement.ui.reuseApi(param);
			});
			$(".exel_down").on("click", function() {
				const param = {}
				param.apiSn = $('#apiSn').val();
				param.userSn = $('#userSn').val();
				$apimanagement.ui.execlDownload(param);
			});
		},

	};

}(window, document, jQuery));