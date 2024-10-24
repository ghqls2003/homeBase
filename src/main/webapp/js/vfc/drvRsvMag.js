(function(W, D, $) {
	'use strict';

	W.$drvRsvMag = W.$drvRsvMag || {};

	$(document).ready(function() {
		//		kendo.ui.progress($(document.body), true);
		if (authrtCd.includes("Z") || authrtCd.includes("K")) {
			$('.register_btn').hide();
			$('#insertRsvInfo').hide();
		}
		$drvRsvMag.ui.pageLoad();		//최초 페이지 로드 시
		$drvRsvMag.event.setUIEvent();
	});
	var popClick = 0;
	var detaiCLick = null;
	var rentNoClick = null;
	var rsvStrData = null;
	var detailstartDate = null;
	var detailEndDate = null;
	var ClickSearchRsv = 0;
	var optVal = null;  // 차량 검색 조건
	var carListColmuns = [
		{ title: "순번", width: "40px", field: "rn", template: "#: rn #" },
		{ title: "대여번호", width: "200px", field: "rentNo", template: "#: rentNo != null ? rentNo : '-'#" },
		{ title: "회사명", width: "150px", field: "coNm", template: "#: coNm != null ? coNm : '-'#" },
		{ title: "처리일시", width: "140px", field: "rentPrcsDt", template: "#: rentPrcsDt != null ? rentPrcsDt : '-'#" },
		//		{ title: "등록일", width: "140px", field: "regDt", template: "#: regDt != null ? regDt : '-'#" },
		{ title: "대여시작일", width: "140px", field: "rentBgngDt", template: "#: rentBgngDt != null ? rentBgngDt : '-'#" },
		{ title: "대여종료일", width: "140px", field: "rentEndDt", template: "#: rentEndDt != null ? rentEndDt : '-'#" },
	];
	// 팝업창 로딩 체크
	var detailCk = 0;

	$drvRsvMag.ui = {
		pageLoad: function() {


			var nowYear = new Date().getFullYear();
			var nowMonth = new Date().getMonth();
			var nowDate = new Date().getDate();
			var nowHours = new Date().getHours();
			var nowMinutes = new Date().getMinutes();
			if (nowMinutes - 30 > 0) {
				nowMinutes = 30;
			} else {
				nowMinutes = 0;
			}
			//			$("#start-picker02").kendoDateTimePicker({
			//				format: "yyyy-MM-dd HH:mm",
			//				value: new Date(nowYear, nowMonth, nowDate)
			//			});

			var dropData = [
				{ value: '', text: "검색 조건(전체)" },
				{ value: "E1", text: "대여번호" },
				//				{ value: "E2", text: "면허 소유자" }
			];
			var dropData2 = [
				{ value: '', text: "먼허 종별(설정)" },
				{ value: "12", text: "1종보통" },
				{ value: "13", text: "1종소형" },
				{ value: "14", text: "대형견인" },
				{ value: "15", text: "구난차" },
				{ value: "16", text: "소형견인" },
				{ value: "32", text: "2종보통" },
				{ value: "33", text: "2종소형" },
				{ value: "38", text: "원동기" },
				//				{ value: "E2", text: "면허 소유자" }
			];
			$("#searchCd").kendoDropDownList({
				dataTextField: "text",
				dataSource: dropData,
				dataValueField: "value",
				value: '' // 초기값을 ''로 설정합니다.
			});
			//공통코드가 지금은 없어 하드코딩으로 대체
			//			ajax(false, contextPath + '/vfc/drvRsvMag/selectLncdDrop', 'body', '처리중입니다.', {}, function(data) {
			//				$("#lncdDrop").kendoDropDownList({
			//					optionLabel: '먼허 종별(설정)',
			//					autoWidth: true,
			//					dataTextField: "cdNm",
			//					dataValueField: "cd",
			//					dataSource: data.result,
			//					autoWidth: false,
			//					width: "250px"
			//				});
			//			});
				$("#lncdDrop").kendoDropDownList({
					dataTextField: "text",
					dataSource: dropData2,
					dataValueField: "value",
					value: '' // 초기값을 ''로 설정합니다.
				});
			ajax(false, contextPath + '/vfc/drvRsvMag/selectPeriodCd', 'body', '처리중입니다.', {}, function(data) {
				$("#periodRsv").kendoDropDownList({
					optionLabel: '예약 주기(설정)',
					autoWidth: true,
					dataTextField: "cdNm",
					dataValueField: "cd",
					dataSource: data.result,
					autoWidth: false,
					width: "250px"
				});
			});

			if (rsvStrData) {
				$("#start-picker02").kendoDateTimePicker({
					format: "yyyy-MM-dd HH:mm",
					parseFormats: ["yyyy-MM-dd HH:mm"],
					value: rsvStrData,
					min: rsvStrData,
					change: function() {
						var selectedDate = this.value();
						if (selectedDate < rsvStrData) {
							this.value(rsvStrData);
						}
					}
				});
			} else {
				$("#start-picker02").kendoDateTimePicker({
					format: "yyyy-MM-dd HH:mm",
					parseFormats: ["yyyy-MM-dd HH:mm"],


				});
			}
			$("#start-picker01").kendoDatePicker({
			    value: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 30),
			    dateInput: true,
			    format: "yyyy-MM-dd",
			    parseFormats: ["yyyy-MM-dd"],
			    max: new Date(),
			    change: function() {
			        var startDate = this.value();
			        var endDatePicker = $("#end-picker01").data("kendoDatePicker");
			        var endDate = endDatePicker.value();

			        if (startDate && endDate && startDate > endDate) {
			            alert("시작일이 종료일보다 늦을 수 없습니다.");
			            this.value(endDate);  // 종료일보다 빠른 시작일을 선택하면 시작일을 종료일로 맞춤
			            return;
			        }

			        if (startDate) {
			            var newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 30);
			            endDatePicker.min(startDate);
			            endDatePicker.max(newEndDate > new Date() ? new Date() : newEndDate);
			            endDatePicker.value(newEndDate > new Date() ? new Date() : newEndDate);
			        }
			    }
			});

			$("#end-picker01").kendoDatePicker({
			    value: new Date(),
			    dateInput: true,
			    format: "yyyy-MM-dd",
			    parseFormats: ["yyyy-MM-dd"],
			    max: new Date(),
			    change: function() {
			        var endDate = this.value();
			        var startDatePicker = $("#start-picker01").data("kendoDatePicker");
			        var startDate = startDatePicker.value();

			        if (startDate && endDate && startDate > endDate) {
			            alert("종료일이 시작일보다 빠를 수 없습니다.");
			            this.value(startDate);  // 시작일보다 빠른 종료일을 선택하면 종료일을 시작일로 맞춤
			            return;
			        }

			        if (startDate) {
			            var diffInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
			            if (diffInDays > 30) {
			                alert("30일 이내만 조회 가능합니다.");
			                this.value(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 30));
			            }
			        }
			    }
			});

			$drvRsvMag.ui.kendoGrid();
		},

		kendoGrid: function() {
			$("#rsvGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/vfc/drvRsvMag/selectRsvList',
							type: "POST",
							beforeSend: function(xhr) {

								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
						},
						parameterMap: function(options) {
							options.startDt = $('#start-picker01').val();
							options.endDt = $('#end-picker01').val();
							options.searchCd = $('#searchCd').val();
							options.lncdDrop = $('#lncdDrop').val();
							options.searchWrd = $('#searchWrd').val();
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
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: [
					{ field: "rn", title: "순번", width: "65px", template: "#=rn #" },
					{ field: "coNm", title: "회사명", width: "200px", template: "#= coNm != null ? coNm : '-' #" },
					{ field: "rentNo", title: "대여번호", width: "200px", template: "#= rentNo != null ? rentNo : '-' #" },
					{ field: "dln2", title: "면허번호", width: "180px", template: "#= dln2 != null ? dln2 : '-' #" },
					//					{ field: "lcnsFlnm", title: "면허 소유자", width: "180px", template: "#= lcnsFlnm != null ? lcnsFlnm : '-' #" },
					{ field: "lcnsAsortCd", title: "면허종별", width: "150px", template: "#= lcnsAsortCd != null ? lcnsAsortCd : '-' #" },
					{ field: "regNm2", title: "예약자", width: "150px", template: "#= regNm2 != null ? regNm2 : '-' #" },
					{
						field: "regDt",
						title: "예약 지정일",
						width: "150px",
						template: "#= regDt != null ? kendo.toString(new Date(regDt), 'yyyy-MM-dd HH:mm') : '-' #"
					},
					{ field: "mdfrNm2", title: "수정자", width: "150px", template: "#= mdfrNm2 != null ? mdfrNm2 : '-' #" },
					{
						field: "mdfcnDt",
						title: "수정일",
						width: "150px",
						template: "#= mdfcnDt != null ? kendo.toString(new Date(mdfcnDt), 'yyyy-MM-dd HH:mm') : '-' #"
					}],
				sortable: {
					mode: "single",
					allowUnsort: true
				},
				scrollable: true,
				editable: false,
				resizable: true,
				dataBound: function() {
					var formatTotal = FormatNumber(this.dataSource.total());
					$("#totCnt").text(formatTotal);
					kendo.ui.progress($(document.body), false);
				},
				selectable: "row",
				change: $drvRsvMag.ui.detailInfoPopup
			});
		},
		detailInfoPopup: function(e) {
			ClickSearchRsv += 1;
			var rows = e.sender.select();
			var data;
			var rowData;
			rows.each(function() {
				var grid = $("#rsvGrid").data("kendoGrid");
				var dataItem = grid.dataItem(this);
				data = dataItem;
			});
			rowData = data;

			var rentNo = data.rentNo;
			$("#detailRsv").addClass("view");

			$drvRsvMag.ui.detailGrid(rentNo);

		},
		detailGrid: function(rentNo) {
			function formatDate(date) {
				const d = new Date(date);
				const year = d.getFullYear();
				const month = String(d.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
				const day = String(d.getDate()).padStart(2, '0');
				const hours = String(d.getHours()).padStart(2, '0');
				const minutes = String(d.getMinutes()).padStart(2, '0');
				return `${year}-${month}-${day} ${hours}:${minutes}`;
			}
			var param = {}
			param.rentNo = rentNo;
			ajax(true, contextPath + '/vfc/drvRsvMag/selectdetailRsv', 'body', '확인중입니다.', param, function(data) {
				var endDate = new Date(data[0].rsvtEndYmd);
				var lastDate = new Date(data[0].lastVrfcYmd);

				$('#rsvedRentNo').val(data[0].rentNo);
				$('#rsvedModelYear').val(data[0].alcnsasortcd);
				$('#rsvedPeriod').val(data[0].vrfcPeriod);
				$('#RsvedlastCfDt').val(formatDate(data[0].lastVrfcYmd));
				$('#RsvedlastRst').val(data[0].lastVrfcRslt);
				$('#rsvedDln').val(data[0].dln);
				$('#rsvedCar').val(data[0].vhclRegNo);
				//				$('#RsvedlcnsFlnm').val(data[0].lcnsFlnm);
				$('#rsvedEndTime').val(formatDate(data[0].rsvtEndYmd));
				$('#RsvedNtCfDt').val(formatDate(data[0].nextVrfcYmd));

				var endDate = formatDate(data[0].rsvtEndYmd);
				var startDate = formatDate(data[0].rsvtBgngYmd);
				detailstartDate = startDate;
				detailEndDate = endDate;
				$drvRsvMag.ui.detailCondition();
			});
		},
		detailCondition: function() {
			//예약기간 설정 종료일 7일전으로 설정한 코드
			if (ClickSearchRsv === 1) {
				$("#start-picker03").kendoDatePicker({
					value: detailstartDate,
					format: "yyyy-MM-dd HH:mm",
					parseFormats: ["yyyy-MM-dd HH:mm"],
					min: detailstartDate,
					max: new Date(new Date(detailEndDate).setDate(new Date(detailEndDate).getDate() - 7)), // endDate의 7일 전까지 설정
					change: function() {
						var selectedDate = this.value();
						if (selectedDate < detailstartDate) {
							this.value(detailstartDate);
						} else if (selectedDate > new Date(new Date(detailEndDate).setDate(new Date(detailEndDate).getDate() - 7))) {
							this.value(new Date(new Date(detailEndDate).setDate(new Date(detailEndDate).getDate() - 7)));
						}
					}
				});
			} else {
				if ($("#start-picker03").data("kendoDateTimePicker")) {
					$("#start-picker03").data("kendoDateTimePicker").destroy(); // 기존 인스턴스 파괴
				}

				$("#start-picker03").kendoDatePicker({
					value: detailstartDate,
					format: "yyyy-MM-dd HH:mm",
					parseFormats: ["yyyy-MM-dd HH:mm"],
					min: detailstartDate,
					max: new Date(new Date(detailEndDate).setDate(new Date(detailEndDate).getDate() - 7)), // endDate의 7일 전까지 설정
					change: function() {
						var selectedDate = this.value();
						if (selectedDate < detailstartDate) {
							this.value(detailstartDate);
						} else if (selectedDate > new Date(new Date(detailEndDate).setDate(new Date(detailEndDate).getDate() - 7))) {
							this.value(new Date(new Date(detailEndDate).setDate(new Date(detailEndDate).getDate() - 7)));
						}
					}
				});
			}


			ajax(false, contextPath + '/vfc/drvRsvMag/selectPeriodCd', 'body', '처리중입니다.', {}, function(data) {
				$("#rsvedPeriod").kendoDropDownList({
					optionLabel: '예약 주기(설정)',
					autoWidth: true,
					dataTextField: "cdNm",
					dataValueField: "cd",
					dataSource: data.result,

				});
			});
		},

		carGrid: function() {
			popClick += 1;
			if (popClick == 1) {
				var gridId = "#carGrid";
				$drvRsvMag.ui.carGridModule(gridId);
			} else {
				var grid = $('#carGrid').data('kendoGrid');
				grid.dataSource.page(1);
			}
		},
		carGridModule: function(gridId) {
			$('#carGrid').kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/vfc/drvRsvMag/selectRsvNoList',
							type: "POST",
							beforeSend: function(xhr) {
								// Loading 창 표시
								kendo.ui.progress($("#carGrid"), true);

								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
							complete: function() {
								// Loading 창 숨김
								kendo.ui.progress($("#carGrid"), false);
							}
						},
						parameterMap: function(options) {
							options.searchWrd = $("#carSearchWrd").val().toString();
							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					pageSize: 5,
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
				columns: carListColmuns,
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
			});

		},
		checkRentNo: function() {
			var params = {}
			params.rentNo = $("#regRentNo").val();
			ajax(true, contextPath + '/vfc/drvRsvMag/selectCheckRentNo', 'body', '확인인중입니다.', params, function(data) {
				if (data == null || (Array.isArray(data) && data.length === 0) || (typeof data === 'string' && data.trim() === '')) {
					$drvRsvMag.ui.insertRsv();
				} else {
					alert('이미 예약된 대여번호입니다.')
				}
			});

		},
		insertRsv: function() {
			var params = {};

			params.vhclRegNo = $("#carVhclRegNoVal").val();
			params.carmdl = $("#carmdl").val();
			params.rentNo = $("#regRentNo").val();
			params.periodRsv = $("#periodRsv").val();
			params.startDt = $("#start-picker02").val();
			params.endtDt = $("#rsvEndTime").val();
			params.lastCfRst = $("#lastCfRst").val();
			params.dln = $("#regRgtrDln").val();
			//			params.lcnsFlnm = $("#lcnsFlnm").val();
			params.lcnsAsortCd = $("#ReglcnsAsortCd").val();
			params.lastRst = $("#RsvedlastRst").val();
			if (params.vhclRegNo == null || params.vhclRegNo == '') {
				alert("차량번호를 등록해 주세요");
			} else if (params.startDt == null || params.startDt == '') {
				alert("대여시작일시를 등록해 주세요");
			} else if (params.periodRsv == null || params.periodRsv == '') {
				alert("예약주기를 등록해 주세요");
			} else {

				ajax(true, contextPath + '/vfc/drvRsvMag/insertRsv', 'body', '확인인중입니다.', params, function(data) {
					alert("대여이력에 등록을 성공하셨습니다");
					location.reload();
				});
			}
		},
		updateRsv: function() {
			var params = {}
			params.srtDt = $('#start-picker03').val()
			params.rentNo = $('#rsvedRentNo').val()
			params.periodRsv = $('#rsvedPeriod').val()

			ajax(true, contextPath + '/vfc/drvRsvMag/updateRsv', 'body', '확인인중입니다.', params, function(data) {
				alert("대여이력에 수정을 성공하셨습니다");
				location.reload();
			});
		},
		deleteRsv: function() {
			var param = {}
			param.rentNo = $('#rsvedRentNo').val()

			ajax(true, contextPath + '/vfc/drvRsvMag/deleteRsv', 'body', '확인인중입니다.', param, function(data) {
				alert("대여이력에 삭제을 성공하셨습니다");
				location.reload();
			});
		},
		excelDown: function() {
			var options = {};
			options.startDt = $('#start-picker01').val();
			options.endDt = $('#end-picker01').val();
			options.searchCd = $('#searchCd').val();
			options.lncdDrop = $('#lncdDrop').val();
			options.searchWrd = $('#searchWrd').val();

			var filename = "drvRsvMag";

			//			excelDown("/os/OPSuseSttus/historylistexcelDown", options, filename, totalRowCount);
			excelDown("/vfc/drvRsvMag/listexcel", options, filename);

		},
	};

	//이벤트 정의
	$drvRsvMag.event = {
		setUIEvent: function() {
			$(".register_btn").on("click", function() {
				$drvRsvMag.event.registerRsv();
			});
			//			$(".detailPopupClose").on("click", function() {
			//				$drvRsvMag.event.detailDeleteBtn();
			//			});
			$(".detailPopupClose").on("click", function() {
				$drvRsvMag.event.detailDeleteBtn();
			});
			$("#rsvNoBtn").on("click", function() {
				$drvRsvMag.event.RsvGridPopup();
			});
			$("#carBtn").on("click", function() {
				$drvRsvMag.event.carGridPopup();
			});
			$("#carVhclRegNoVal").on("click", function() {

				if ($("#start-picker02").data("kendoDateTimePicker")) {
					$("#start-picker02").data("kendoDateTimePicker").destroy();
				}
				$drvRsvMag.event.carNoval();

			});
			$("#carPopupSearchBtn").on("click", function() {
				var grid = $('#carGrid').data('kendoGrid');
				grid.dataSource.page(1);
			});
			$("#searchBtn").on("click", function() {
				var startPickerValue = $("#start-Picker01").val();
				var endPickerValue = $("#end-Picker01").val();
				var searchKey = $('#searchWrd').val();
				var searchCd = $('#searchCd').val();
				if (startPickerValue && endPickerValue) {
					var startDate = new Date(startPickerValue);
					var endDate = new Date(endPickerValue);

					if (startDate > endDate) {
						alert("종료시간이 시작시간보다 빠릅니다. 올바른 시간 범위를 선택해주세요.");
						return;
					}
				} else if (searchCd != '' && searchKey == "") {
					alert('검색어를 입력하세요')
				} else {
					var grid = $('#rsvGrid').data('kendoGrid');
					grid.dataSource.page(1);
				}
			});
			$("#rentRegInsertBtn").on("click", function() {
				if (confirm('예약하시겠습니까?')) {
					$drvRsvMag.ui.checkRentNo();
				} else {
					alert('취소하였습니다.')
					location.reload();
				}
			});
			$(".excelDownBtn").on("click", function() {
				$drvRsvMag.ui.excelDown();
			});
			$(".regPopupClose").on("click", function() {
				$drvRsvMag.event.rsvNoClose();
			});
			// 예약 업데이트
			$("#updateRsv").on("click", function() {
				if (confirm("예약 일정을 수정하겠습니까?")) {

					$drvRsvMag.ui.updateRsv();
				} else {
					alert("취소되었습니다.")
				}
			});
			// 예약 삭제
			$("#deleteRsv").on("click", function() {
				if (confirm("예약 일정을 삭제하겠습니까?")) {
					$drvRsvMag.ui.deleteRsv();
				} else {
					alert("취소되었습니다.")
				}
			});
			$(".carClose").on("click", function() {
				$("#carPopup").removeClass("view");
				$("#carSearchWrd").val('');
				var grid = $("#carGrid").data("kendoGrid");
				if (grid) {
					grid.clearSelection();
					grid.dataSource.data([]);
				}
			});

			$(".carClose2").on("click", function() {
				$("#carTa").empty();
				if ($("#carTa")[0].children.length == 0) {
					$("#carSearchWrd").val('');
					$("#carTa").append("<table id='carGrid'><caption>대여예약</caption></table>");
				}

			});
			$("#carPopupSearchBtn").on("click", function() {
				if (ClickSearchRsv == '0') {
					ClickSearchRsv == '1';
					$drvRsvMag.ui.rentNoGrid();
				} else {
					$drvRsvMag.event.rentNoGrid();
				}
			});
		},
		carNoval: function() {
			var grid = $('#carGrid').data("kendoGrid");
			var selectedRow = grid.select();
			var data = grid.dataItem(selectedRow);

			if (data) {
				detaiCLick = data.vrfcHstrySn;
				rentNoClick = data.rentNo;
				$("#carVhclRegNoVal").val(data.vhclRegNo);
				$("#regVhclRegNo").val(data.vhclRegNo);
				$("#regRentNo").val(rentNoClick);
				$("#rsvEndTime").val(data.rentEndDt);
				$("#start-picker02").val(data.rentBgngDt);

				var params = {};
				params.detaiCLick = detaiCLick;

				ajax(true, contextPath + '/vfc/drvRsvMag/selectCheckRentRsvf', 'body', '확인 중입니다.', params, function(data2) {
					$("#lastCfRst").val(data2[0].vrfcRslt);
					//					$("#lcnsFlnm").val(data2[0].lcnsFlnm);
					$("#ReglcnsAsortCd").val(data2[0].lcnsAsortCd);
					$("#RsvedlastRst").val(data2[0].vrfcCd);
					$("#regRgtrDln").val(data2[0].dln);
					$("#lastCfDt").val(data2[0].vrfcDmndDt);
				});
			}

			var carRegNoVal = $("#regRentNo").val();
			var carRegNoVal2 = $("#rsvEndTime").val();
			var carRegNoVal3 = $("#start-picker02").val();
			var lcnsAsortCd = $("#ReglcnsAsortCd").val();
			//			var lcnsFlnm = $("#lcnsFlnm").val();

			$("#regRentNo").val(carRegNoVal);
			$("#rsvEndTime").val(carRegNoVal2);
			$("#ReglcnsAsortCd").val(lcnsAsortCd);
			$("#carPopup").removeClass("view");
			$("#carSearchWrd").val('');
			var grid = $("#carGrid").data("kendoGrid");
			if (grid) {
				grid.clearSelection();
				grid.dataSource.data([]);
			}
			rsvStrData = new Date(carRegNoVal3);
		},
		detailDeleteBtn: function() {


			$("#detailRsv").removeClass("view");
			var grid = $('#rsvGrid').data('kendoGrid');

			grid.dataSource.read();

		},
		registerRsv: function() {
			$("#insertRsvInfo").addClass("view");
		},
		rsvNoClose: function() {
			//			$("#insertRsvInfo").remove();
			//			$("#rentSttsCdConfUpdateBtn").remove();
			//			$('#rsvGrid').data('kendoGrid').dataSource.read();
			location.reload();
		},
		RsvGridPopup: function() {
			$("#RentRsvNoPopup").addClass("view");
		},
		RsvPopupSearch: function() {
			var grid = $('#rentNoGrid').data('kendoGrid');
			grid.dataSource.page(1);
		},
		carGridPopup: function() {
			$drvRsvMag.ui.carGrid();
			$("#carPopup").addClass("view");
		},
	};

}(window, document, jQuery));