
var rowData;
var expryYmd;

(function(W, D, $) {

	W.$apiHist = W.$apiHist || {};
	var tabClick = true;

	$(document).ready(function() {

		$apiHist.ui.pageLoad();		//최초 페이지 로드 시
		$apiHist.event.setUIEvent();
	});

	$apiHist.ui = {
		/**
		 *
		 * @name         : pageLoad
		 * @description  : 최초 페이지 로드 시 UI에 적용
		 * @date         : 2018. 09. 13.
		 * @author	     : 이광호
		 */
		pageLoad: function() {

			if (Auth == 'K01' || Auth == 'D01' || Auth == 'Z01') {
				$("#tabview1").show();
				$("#tabview2").hide();
				$("#search_area_Dev").hide();
				$("#search_area2_Dev").hide();
				$("#search_area2").hide();
				$("#search_area").show();
			} else {
				$("#tabview1").show();
				$("#tabview2").hide();
				$("#search_area_Dev").hide();
				$("#search_area2_Dev").hide();
				$("#search_area2").show();
				$("#search_area").hide();
			}
			$('#apiReUseBtn').hide();
			/*관리자 일때 데이터피커*/
			$("#start-Picker01").kendoDatePicker({
				value: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 2),
				//				value: new Date(2024, 3, 1),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date(),
				change: function() {
					var startDate = this.value();
					var endDatePicker = $("#end-Picker01").data("kendoDatePicker");

					if (startDate) {
						var newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
						endDatePicker.min(startDate);
						endDatePicker.max(newEndDate > new Date() ? new Date() : newEndDate);
						endDatePicker.value(newEndDate > new Date() ? new Date() : newEndDate);
					}
				}
			});
			$("#end-Picker01").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date(),
				change: function() {
					var endDate = this.value();
					var startDatePicker = $("#start-Picker01").data("kendoDatePicker");
					var startDate = startDatePicker.value();

					if (startDate) {
						var diffInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
						if (diffInDays > 2) {
							alert("2일 이내만 조회 가능합니다.");
							this.value(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1));
						}
					}
				}
			});

			$("#start_Picker_Dev01").kendoDatePicker({
				value: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 2),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date(),
				change: function() {
					var startDate = this.value();
					var endDatePicker = $("#end_Picker_Dev01").data("kendoDatePicker");

					if (startDate) {
						var newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 2);
						endDatePicker.min(startDate);
						endDatePicker.max(newEndDate > new Date() ? new Date() : newEndDate);
						endDatePicker.value(newEndDate > new Date() ? new Date() : newEndDate);
					}
				}
			});
			$("#end_Picker_Dev01").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date(),
				change: function() {
					var endDate = this.value();
					var startDatePicker = $("#start_Picker_Dev01").data("kendoDatePicker");
					var startDate = startDatePicker.value();

					if (startDate) {
						var diffInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
						if (diffInDays > 2) {
							alert("2일 이내만 조회 가능합니다.");
							this.value(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 2));
						}
					}
				}
			});
			
			/*사업자 일떄 데이트피커*/
			
			$("#start-Picker02").kendoDatePicker({
				value: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 2),
				//				value: new Date(2024, 3, 1),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date(),
				change: function() {
					var startDate = this.value();
					var endDatePicker = $("#end-Picker02").data("kendoDatePicker");

					if (startDate) {
						var newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1);
						endDatePicker.min(startDate);
						endDatePicker.max(newEndDate > new Date() ? new Date() : newEndDate);
						endDatePicker.value(newEndDate > new Date() ? new Date() : newEndDate);
					}
				}
			});
			$("#end-Picker02").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date(),
				change: function() {
					var endDate = this.value();
					var startDatePicker = $("#start-Picker02").data("kendoDatePicker");
					var startDate = startDatePicker.value();

					if (startDate) {
						var diffInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
						if (diffInDays > 2) {
							alert("2일 이내만 조회 가능합니다.");
							this.value(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1));
						}
					}
				}
			});

			$("#start_Picker_Dev02").kendoDatePicker({
				value: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 2),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date(),
				change: function() {
					var startDate = this.value();
					var endDatePicker = $("#end_Picker_Dev02").data("kendoDatePicker");

					if (startDate) {
						var newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 2);
						endDatePicker.min(startDate);
						endDatePicker.max(newEndDate > new Date() ? new Date() : newEndDate);
						endDatePicker.value(newEndDate > new Date() ? new Date() : newEndDate);
					}
				}
			});
			$("#end_Picker_Dev02").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date(),
				change: function() {
					var endDate = this.value();
					var startDatePicker = $("#start_Picker_Dev02").data("kendoDatePicker");
					var startDate = startDatePicker.value();

					if (startDate) {
						var diffInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
						if (diffInDays > 2) {
							alert("2일 이내만 조회 가능합니다.");
							this.value(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 2));
						}
					}
				}
			});




			$apiHist.ui.selectSearchData();
			$(document).ready(function() {
				kendo.ui.progress($(document.body), true);

				$apiHist.ui.apiView();

			});
		},
		AuthCheck: function() {
			if (Auth == 'K01' || Auth == 'D01' || Auth == 'Z01' || Auth == 'S04') {
				$("#search_area").show();
				$("#search_area2").hide();
			} else {
				$("#search_area").hide();
				$("#search_area2").show();
			}

		},


		selectSearchData: function() {
			var searchOtherCondition = [
				//				{ value: "", text: "API 선택" },
				{ value: "1", text: "운전자격확인 단건 조회	" },
				{ value: "2", text: "운전자격확인 배치 조회" },
			];
			ajax(true, contextPath + '/api/apiHist/ckapiList', 'body', '처리중입니다.', {}, function(data) {
				var ckResults = data.ckResults;
				var defaultValue = "1";
				$('#search_stts_cd').kendoDropDownList({
					//					optionLabel: "API 선택 (전체)",
					dataTextField: "apiNm",
					dataValueField: "apiSn",
					dataSource: ckResults,
					value: defaultValue,
				});
				$("#search_stts_cd_Dev01").kendoDropDownList({
					dataTextField: "apiNm",
					dataValueField: "apiSn",
					dataSource: ckResults,
					value: defaultValue,
				});
				$("#search_stts_cd_api").kendoDropDownList({
					dataTextField: "apiNm",
					dataValueField: "apiSn",
					dataSource: ckResults,
					value: defaultValue,
				});
				$("#search_stts_cd_api_Dev").kendoDropDownList({
					dataTextField: "apiNm",
					dataValueField: "apiSn",
					dataSource: ckResults,
					value: defaultValue,
				});
			});



			//						$("#search_stts_cd_Dev01").kendoDropDownList({
			//							dataTextField: "text",
			//							dataSource: searchOtherCondition,
			//							dataValueField: "value"
			//							, value: "1"
			//						});
//			$("#search_stts_cd_api").kendoDropDownList({
//				dataTextField: "text",
//				dataSource: searchOtherCondition,
//				dataValueField: "value"
//				, value: "1"
//			});
//			$("#search_stts_cd_api_Dev").kendoDropDownList({
//				dataTextField: "text",
//				dataSource: searchOtherCondition,
//				dataValueField: "value"
//				, value: "1"
//			});
			var searchOtherCondition2 = [
				{ value: "", text: "회사명 (선택)" },
				{ value: "user", text: "요청사" },
				{ value: "Ruser", text: "원요청사" }
			];
			$("#search_stts_cd2").kendoDropDownList({
				dataTextField: "text",
				dataSource: searchOtherCondition2,
				dataValueField: "value"
			});
			$("#search_stts_cd_Dev02").kendoDropDownList({
				dataTextField: "text",
				dataSource: searchOtherCondition2,
				dataValueField: "value"
			});
			var searchOtherCondition3 = [
				{ value: "", text: "에러유무 (선택)" },
				{ value: "E1", text: "정상" },
				{ value: "E2", text: "에러" }
			];
			var searchOtherCondition4 = [
				{ value: "", text: "에러유무 (선택)" },
				{ value: "E1", text: "정상" },
				{ value: "E2", text: "에러" }
			];
			$("#search_stts_cd_error").kendoDropDownList({
				dataTextField: "text",
				dataSource: searchOtherCondition4,
				dataValueField: "value",
				value: "E1"

			});
			$("#search_stts_cd_error_dev").kendoDropDownList({
				dataTextField: "text",
				dataSource: searchOtherCondition3,
				dataValueField: "value"
			});
			$("#search_stts_cd3").kendoDropDownList({
				dataTextField: "text",
				dataSource: searchOtherCondition3,
				dataValueField: "value",
				value: "E1"
			});
			$("#search_stts_cd_Dev03").kendoDropDownList({
				dataTextField: "text",
				dataSource: searchOtherCondition3,
				dataValueField: "value"
			});
		},

		apiView: function() {
			$("#grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/api/apiHist/listView',
							type: "POST",
							beforeSend: function(xhr) {
								kendo.ui.progress($(document.body), true); // 프로그레스 인디케이터 표시
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
							complete: function() {
								kendo.ui.progress($(document.body), false); // 프로그레스 인디케이터 숨김
							}
						},
						parameterMap: function(options) {
							var startTime = $("#start-Picker01").val();
							var endtime = $("#end-Picker01").val();
							var resultTime = startTime.replace(/-/g, '')
							var resultTime2 = endtime.replace(/-/g, '')
							var startTime2 = $("#start-Picker02").val();
							var endtime2 = $("#end-Picker02").val();
							var resultTime3 = startTime2.replace(/-/g, '')
							var resultTime4 = endtime2.replace(/-/g, '')
							if (Auth == 'K01' || Auth == 'D01' || Auth == 'Z01') {
								options.endPicker02 = resultTime2;
								options.startPicker02 = resultTime;
								options.searchSttsCd = $("#search_stts_cd").val();
								options.searchSttsCd2 = $("#search_stts_cd2").val();
								options.detailYN = $("#search_stts_cd3").val();
								options.searchReq = $("#search_box").val();
							} else {
								options.endPicker02 = resultTime4;
								options.startPicker02 = resultTime3;
								options.searchSttsCd = $("#search_stts_cd_api").val();
								options.detailYN = $("#search_stts_cd_error").val();
							}
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
					serverSorting: true,
					autoBind: false,
				},
				columns: [
					{ field: "rn", title: "순번", width: 120 },
					{ field: "apiNm", title: "API명", width: 150 },
					{ field: "rq", title: "요청사", width: 200 },
					{ field: "orq", title: "원요청사", width: 200 },
					{
						field: "dmndDt",
						title: "요청일",
						width: 200,
						template: "#= kendo.toString(new Date(dmndDt), 'yyyy-MM-dd HH:mm:ss') #"
					},
					{
						field: "dln2",
						title: "면허번호",
						attributes: { "class": "table-cell" },
						width: 100,
						template: function(dataItem) {
							return dataItem.dln2 !== null ? dataItem.dln2 : '-';
						}
					},
					{ field: "rsltMsg", title: "요청결과(코드/설명)", width: 100 },
					{ field: "reqHr", title: "소요시간", width: 80 },
					{ field: "dmndCnt", title: "요청건수", width: 80 },
				],
				navigatable: true,
				pageable: {
					pageSizes: [10, 20, 50, 100],
					buttonCount: 5,
					serverPaging: true
				},
				dataBound: function(e) {
					kendo.ui.progress($(document.body), false);
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				editable: false,
				resizable: true,
				excel: {
					fileName: "excel.xlsx",
					allPages: true,
					filterable: true
				},
				selectable: "row",
			});
		},
		apiView02: function() {
			$("#grid02").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/api/apiHist/listViewDev',
							type: "POST",
							beforeSend: function(xhr) {
								kendo.ui.progress($(document.body), true); // 프로그레스 인디케이터 표시
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
							complete: function() {
								kendo.ui.progress($(document.body), false); // 프로그레스 인디케이터 숨김
							}
						},
						parameterMap: function(options) {
							var startTime = $("#start_Picker_Dev01").val();
							var endtime = $("#end_Picker_Dev01").val();
							var resultTime = startTime.replace(/-/g, '')
							var resultTime2 = endtime.replace(/-/g, '')
							if (Auth == 'K01' || Auth == 'D01' || Auth == 'Z01' || Auth == 'S04') {
								options.endPicker02 = endtime;
								options.startPicker02 = startTime;
								options.searchSttsCd = $("#search_stts_cd_Dev01").val();
								options.searchSttsCd2 = $("#search_stts_cd_Dev02").val();
								options.detailYN = $("#search_stts_cd_Dev03").val();
								options.searchReq = $("#search_box_Dev01").val();
							} else {
								var startTime2 = $("#start_Picker_Dev02").val();
								var endtime2 = $("#end_Picker_Dev02").val();
								var resultTime3 = startTime2.replace(/-/g, '')
								var resultTime4 = endtime2.replace(/-/g, '')
								options.startPicker02 = resultTime3
								options.endPicker02 = resultTime4

								options.searchSttsCd = $("#search_stts_cd_api").val();
								options.detailYN = $("#search_stts_cd_error").val();
							}
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
					serverSorting: true,
					autoBind: false,
				},
				columns: [
					{ field: "rn", title: "순번", width: 120 },
					{ field: "apiNm", title: "API명", width: 150 },
					{ field: "rq", title: "요청사", width: 200 },
					{ field: "orq", title: "원요청사", width: 200 },
					{
						field: "dmndDt",
						title: "요청일",
						width: 200,
						template: "#= kendo.toString(new Date(dmndDt), 'yyyy-MM-dd HH:mm:ss') #"
					},
					{
						field: "dln2",
						title: "면허번호",
						attributes: { "class": "table-cell" },
						width: 100,
						template: function(dataItem) {
							return dataItem.dln2 !== null ? dataItem.dln2 : '-';
						}
					},
					{ field: "rsltMsg", title: "요청결과(코드/설명)", width: 100 },
					{ field: "reqHr", title: "소요시간", width: 80 },
					{ field: "dmndCnt", title: "요청건수", width: 80 },
				],
				navigatable: true,
				pageable: {
					pageSizes: [10, 20, 50, 100],
					buttonCount: 5,
					serverPaging: true
				},
				dataBound: function(e) {
					kendo.ui.progress($(document.body), false);
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				editable: false,
				resizable: true,
				excel: {
					fileName: "excel.xlsx",
					allPages: true,
					filterable: true
				},
				selectable: "row",
			});
		},

		execlDownload: function() {
			var startTime = $("#start-Picker01").val();
			var endtime = $("#end-Picker01").val();
			var resultTime = startTime.replace(/-/g, '')
			var resultTime2 = endtime.replace(/-/g, '')
			var startTime2 = $("#start-Picker02").val();
			var endtime2 = $("#end-Picker02").val();
			var resultTime3 = startTime2.replace(/-/g, '')
			var resultTime4 = endtime2.replace(/-/g, '')
			var options = {}
			if (Auth == 'K01' || Auth == 'D01' || Auth == 'Z01') {
				options.endPicker02 = resultTime2;
				options.startPicker02 = resultTime;
				options.searchSttsCd = $("#search_stts_cd").val();
				options.searchSttsCd2 = $("#search_stts_cd2").val();
				options.detailYN = $("#search_stts_cd3").val();
				options.searchReq = $("#search_box").val();
			} else {
				options.endPicker02 = resultTime4;
				options.startPicker02 = resultTime3;
				options.searchSttsCd = $("#search_stts_cd_api").val();
				options.detailYN = $("#search_stts_cd_error").val();
			}
			var filename = "apiHist"
			var totalRowCount = $("#grid").data("kendoGrid").dataSource.total();

			excelDown("/api/apiHist/excelDown", options, filename, totalRowCount);

		},
		execlDownloadDev: function() {
			var startTime = $("#start_Picker_Dev01").val();
			var endtime = $("#end_Picker_Dev01").val();
			var resultTime = startTime.replace(/-/g, '')
			var resultTime2 = endtime.replace(/-/g, '')
			var startTime2 = $("#start_Picker_Dev02").val();
			var endtime2 = $("#end_Picker_Dev02").val();
			var resultTime3 = startTime2.replace(/-/g, '')
			var resultTime4 = endtime2.replace(/-/g, '')
			var options = {}
			if (Auth == 'K01' || Auth == 'D01' || Auth == 'Z01' || Auth == 'S04') {

				options.endPicker02 = endtime
				options.startPicker02 = startTime
				options.searchSttsCd = $("#search_stts_cd_Dev01").val();
				options.searchSttsCd2 = $("#search_stts_cd_Dev02").val();
				options.detailYN = $("#search_stts_cd_Dev03").val();
				options.searchReq = $("#search_box_Dev01").val();
			} else {
				options.endPicker = endtime2
				options.startPicker = startTime2
				options.searchSttsCdAPI = $("#search_stts_cd_api_Dev").val();
				options.ErrorCd = $("#search_stts_cd_error_dev").val();
				//								options.searchReq = $("#search_box").val();
			}
			var filename = "apiHistDev"
			var totalRowCount = $("#grid02").data("kendoGrid").dataSource.total();

			excelDown("/api/apiHist/excelDownDev", options, filename, totalRowCount);

		},

	};


	//이벤트 정의
	$apiHist.event = {
		setUIEvent: function() {
			$(document).on("click", "#tabBtn01", function() {
				$("#tabBtn01").addClass("on");
				$("#tabBtn02").removeClass("on");
				$("#tabview1").show();
				$("#tabview2").hide();
				var grid = $('#grid').data('kendoGrid');
				grid.dataSource.page(1);
				if (Auth == 'K01' || Auth == 'D01' || Auth == 'Z01' || Auth == 'S04') {
					$("#search_area_Dev").hide();
					$("#search_area2_Dev").hide();
					$("#search_area").show();
					$("#search_area2").hide();
				} else {
					$("#search_area_Dev").hide();
					$("#search_area2_Dev").hide();
					$("#search_area").hide();
					$("#search_area2").show();
				}
			});
			var buttons = document.querySelectorAll('.select-btn');

			buttons.forEach(function(button) {
				button.addEventListener('click', function() {
					buttons.forEach(function(btn) {
						btn.classList.remove('selected');
					});
					button.classList.add('selected');
				});
			});
			$(document).on("click", "#tabBtn02", function() {
				$("#tabBtn01").removeClass("on");
				$("#tabBtn02").addClass("on");

				if (tabClick) {
					$apiHist.ui.apiView02();
					tabClick = false;
				} else {
					var grid = $('#grid02').data('kendoGrid');
					grid.dataSource.page(1);
				}

				if (Auth == 'K01' || Auth == 'D01' || Auth == 'Z01' || Auth == 'S04') {
					$("#search_area_Dev").show();
					$("#search_area2_Dev").hide();
					$("#search_area").hide();
					$("#search_area2").hide();
				} else {
					$("#search_area_Dev").hide();
					$("#search_area2_Dev").show();
					$("#search_area").hide();
					$("#search_area2").hide();
				}
				var buttons = document.querySelectorAll('.select-btn');

				buttons.forEach(function(button) {
					button.addEventListener('click', function() {
						buttons.forEach(function(btn) {
							btn.classList.remove('selected');
						});
						button.classList.add('selected');
					});
				});
				$("#tabview1").hide();
				$("#tabview2").show();

			});

			$("#userMngBtnSearch").on("click", function() {
				$apiHist.event.search();
			});
			$("#userMngBtnSearch2").on("click", function() {
				$apiHist.event.search2();
			});
			$("#SearchBtn_Dev").on("click", function() {
				$apiHist.event.searchDev();
			});
			$("#SearchBtn_Dev02").on("click", function() {
				$apiHist.event.search2Dev();
			});
			$('#apiOperationExcel').on("click", function() {
				$apiHist.ui.execlDownload();
			})
			$('#apiDevExcel').on("click", function() {
				$apiHist.ui.execlDownloadDev();
			})
		},
		search: function() {
			var startPickerValue = $("#start-Picker01").val();
			var endPickerValue = $("#end-Picker01").val();

			if (startPickerValue && endPickerValue) {
				var startDate = new Date(startPickerValue);
				var endDate = new Date(endPickerValue);

				if (startDate > endDate) {
					alert("종료시간이 시작시간보다 빠릅니다. 올바른 시간 범위를 선택해주세요.");
					return; // 검색 중지
				}
			}
			var grid = $('#grid').data('kendoGrid');
			grid.dataSource.page(1);
		},
		search: function() {
			var startPickerValue = $("#start-Picker01").val();
			var endPickerValue = $("#end-Picker01").val();

			if (startPickerValue && endPickerValue) {
				var startDate = new Date(startPickerValue);
				var endDate = new Date(endPickerValue);

				// 시작일과 종료일의 차이 계산 (밀리초 단위)
				var diffInMilliseconds = endDate - startDate;
				// 밀리초를 일 단위로 변환
				var diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

				// 시작일이 종료일보다 빠른 경우 경고
				if (startDate > endDate) {
					alert("종료시간이 시작시간보다 빠릅니다. 올바른 시간 범위를 선택해주세요.");
					return; // 검색 중지
				}

				// 날짜 차이가 2일을 초과하는 경우 경고
				if (diffInDays > 2) {
					alert("2일 이내로 조회해야 합니다.");
					return; // 검색 중지
				}
			}

			var grid = $('#grid').data('kendoGrid');
			grid.dataSource.page(1);
		},

		searchDev: function() {
			var startPickerValue = $("#start_Picker_Dev01").val();
			var endPickerValue = $("#end_Picker_Dev01").val();

			if (startPickerValue && endPickerValue) {
				var startDate = new Date(startPickerValue);
				var endDate = new Date(endPickerValue);

				if (startDate > endDate) {
					alert("종료시간이 시작시간보다 빠릅니다. 올바른 시간 범위를 선택해주세요.");
					return; // 검색 중지
				}
			}
			var grid = $('#grid02').data('kendoGrid');
			grid.dataSource.page(1);
		},
		search2: function() {
			var startPickerValue = $("#start-Picker02").val();
			var endPickerValue = $("#end-Picker02").val();

			if (startPickerValue && endPickerValue) {
				var startDate = new Date(startPickerValue);
				var endDate = new Date(endPickerValue);

				if (startDate > endDate) {
					alert("종료시간이 시작시간보다 빠릅니다. 올바른 시간 범위를 선택해주세요.");
					return; // 검색 중지
				}
			}
			var grid = $('#grid').data('kendoGrid');
			grid.dataSource.page(1);
		},
		search2Dev: function() {
			var grid = $('#grid02').data('kendoGrid');
			grid.dataSource.page(1);
		},
	};
}(window, document, jQuery));
