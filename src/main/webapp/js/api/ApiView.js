
var rowData;
var expryYmd;

(function(W, D, $) {

	W.$openapi = W.$openapi || {};

	$(document).ready(function() {
		$openapi.ui.pageLoad();		//최초 페이지 로드 시
		$openapi.event.setUIEvent();
	});

	$openapi.ui = {
		/**
		 *
		 * @name         : pageLoad
		 * @description  : 최초 페이지 로드 시 UI에 적용
		 * @date         : 2018. 09. 13.
		 * @author	     : 이광호
		 */
		pageLoad: function() {
			$('#apiReUseBtn').hide();

			$openapi.ui.selectSearchData();
			$openapi.ui.apiView();
			$openapi.ui.apiSttsview();
			$openapi.ui.AuthCheck(Auth);
		},
		AuthCheck: function() {
			if (Auth == 'K01' || Auth == 'D01' || Auth == 'Z01') {
				$("#apiUseStopBtn").show();
				$("#search_area").show();
				$("#showSubmitButton").show();
				$("#InquirydeleteYn").show();
			} else {
				$("#apiUseStopBtn").hide();
				$("#search_area").hide();
				$("#showSubmitButton").hide();
				$("#commentSubmitButton").hide();
				$("#InquirydeleteYn").hide();
			}

		},

		apiSttsview: function() {
			const param = {};
//			param.userSn = User
			param.startPicker02 = $("#start-picker02").val();
			param.endPicker02 = $("#end-picker02").val();
			param.searchSttsCd = $("#search_stts_cd").val();
			param.searchSttsCd2 = $("#search_stts_cd2").val();
			param.searchReq = $("#search_box").val();
			ajax(true, contextPath + '/api/apiview/apiSttsview', 'body', '조회중입니다', param, function(data) {
				// 초기값 설정
				$('#APiapplication').html('0 건');
				$('#ApiUse').html('0 건');
				$('#ApiReject').html('0 건');
				$('#ApiStop').html('0 건');
				$('#ApiHold').html('0 건');
				$('#ApiChange').html('0 건');

				if (data.data.length > 0) {
					for (var i = 0; i < data.data.length; i++) {
						if (data.data[i].status == "신청") {
							$('#APiapplication').html(data.data[i].count + ' 건');//신청
						}
						if (data.data[i].status == "활용") {
							$('#ApiUse').html(data.data[i].count + ' 건');//활용
						}
						if (data.data[i].status == "반려") {
							$('#ApiReject').html(data.data[i].count + ' 건');//반려
						}
						if (data.data[i].status == "중지") {
							$('#ApiStop').html(data.data[i].count + ' 건');//중지
						}
					}
				}
			});
		},


		selectSearchData: function() {
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


			var searchOtherCondition = [
				{ value: "", text: "검색조건 선택" },
				{ value: "RCompnay", text: "요청사" },
				{ value: "RCompanyId", text: "요청사ID" },
				{ value: "APINm", text: "API명" },
			];
			$("#search_stts_cd").kendoDropDownList({
				dataTextField: "text",
				dataSource: searchOtherCondition,
				dataValueField: "value"
			});
			var searchOtherCondition3 = [
				{ value: "", text: "검색조건 선택" },
				{ value: "", text: "요청사" },
				{ value: "", text: "요청사ID" },
			];
			$("#search_stts_cd3").kendoDropDownList({
				dataTextField: "text",
				dataSource: searchOtherCondition3,
				dataValueField: "value"
			});
			var searchOtherCondition2 = [
				{ value: "", text: "상태 선택" },
				{ value: "1", text: "신청" },
				{ value: "2", text: "활용" },
				{ value: "3", text: "반려" },
				{ value: "4", text: "중지" }
			];
			$("#search_stts_cd2").kendoDropDownList({
				dataTextField: "text",
				dataSource: searchOtherCondition2,
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
							url: contextPath + '/api/apiview/listView',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							options.startPicker02 = $("#start-picker02").val();
							options.endPicker02 = $("#end-picker02").val();
//							options.userSn = User
							options.searchSttsCd = $("#search_stts_cd").val();
							options.searchSttsCd2 = $("#search_stts_cd2").val();
							options.searchReq = $("#search_box").val();
							//							  options.AuthCd = param.AuthCd; // apiSn 값을 options 객체에 추가
							options.pageSize = $("#grid").data("kendoGrid").dataSource.pageSize();
							options.page = $("#grid").data("kendoGrid").dataSource.page();
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
				columns: [
					{ field: "rn", title: "순번", width: 50 },
					{
						field: "sttsCd",
						title: "상태",
						width: 50,
						template: function(dataItem) {
							var status = "";
							switch (dataItem.sttsCd) {
								case "1":
									status = "신청";
									break;
								case "2":
									status = "활용";
									break;
								case "3":
									status = "반려";
									break;
								case "4":
									status = "중지";
									break;
								default:
									status = "알 수 없음";
									break;
							}
							return status;
						}
					}, { field: "apiNm", title: "API명", width: 100 },
					{
						field: "coNmid",
						title: "요청자/아이디",
						width: 100
					},
					{
						field: "dmndDt",
						title: "신청일",
						width: 100,
						template: "#= kendo.toString(new Date(dmndDt), 'yyyy-MM-dd') #"
					},
					{
						field: "expryYmd",
						title: "만료예정일",
						width: 100,
						template: function(dataItem) {
							var currentDate = new Date();
							var expryDateStr = dataItem.expryYmd;

							if (!expryDateStr) {
								return ""; // expryDateStr 값이 없을 경우 빈 문자열 반환
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
					{
						field: "dmndCnt", title: "사용건수", width: 100,
						template: function(dataItem) {
							if (dataItem.dmndCnt === null || dataItem.dmndCnt === undefined) {
								return 0;
							} else {
								return dataItem.dmndCnt;
							}
						}
					},
//						{
//							template: "#if(sttsCd == '1') {#"
//								+ "<button id='appr' class='blue_btn' style='width:40px; height:30px;' onClick='javascript:$openapi.event.approveBtn(event);'>승인</button>&nbsp;"
//								+ "<button id='refs' class='red_btn' style='width:40px; height:30px;' onClick='javascript:$openapi.event.refuseBtn(event);'>연장하기</button>"
//								+ "#}if(sttsCd == '2') {#"
//								+ "<button id='stopUse' class='red_btn' style='width:40px; height:30px;' onClick='javascript:$openapi.event.stopUseBtn(event);'>중지</button>"
//								+ "#}if(sttsCd == '3') {#"
//								+ "<span>반려 중</span>"
//								+ "#}if(sttsCd == '4') {#"
//								+ "<button id='ReUse' class='gray_btn' style='width:80px; height:30px;' onClick='javascript:$openapi.event.ReUse(event);'>중지 해제</button>"
//								+ "#}#",
//							title: "승인 / 반려",
//							width: 50
//						},
				],
				navigatable: true,
				pageable: {
					pageSize: 10,
					buttonCount: 5,
					serverPaging: true

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


			function refreshGrid() {
				var grid = $("#grid").data("kendoGrid");
				grid.dataSource.read(); // 데이터 다시 조회
			}

		},
		rowClickEvent: function(e) {
			var rows = e.sender.select();
			var data;

			rows.each(function() {
				var grid = $("#grid").data("kendoGrid");
				var dataItem = grid.dataItem(this);
				data = dataItem;
			});
			rowData = data;
			var apiDetail = {};
			var apiSn = data.apiSn;
			var RowuserSn = data.userSn;
			$(".detail_popup").addClass("view");
			apiDetail.apiSn = apiSn; // api_sn 변수 할당
			apiDetail.userSn = RowuserSn; // user_sn 변수 할당

			$openapi.ui.selectApiDetailInfo(apiDetail);
		},
		selectApiDetailInfo: function(param) {
			var closeGrid = function() {
				var gridElement = $("#grid2");
				var grid = gridElement.data("kendoGrid");
				if (grid) {
					grid.destroy(); // 그리드 제거
					gridElement.empty(); // 그리드 요소 비우기
				}
			};
			$openapi.ui.detailpop(param);
			$openapi.ui.detaildata(param);
		},
		detailpop: function(param) {
			$("#grid2").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/api/apiview/detaillistView',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							options.apiSn = param.apiSn
//							options.userSn = param.userSn
							options.endPicker02 = $("#end-picker02").val();
							options.pageSize = $("#grid2").data("kendoGrid").dataSource.pageSize();
							options.page = $("#grid2").data("kendoGrid").dataSource.page();
							//							options.endPicker02 = $("#end-picker02").val();
							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
				},
				columns: [
					{ field: "rn", title: "순번", attributes: { "class": "table-cell" }, width: 100 },
					{
						field: "dmnd_dt",
						title: "요청일시",
						attributes: { "class": "table-cell" },
						width: 200,
						template: function(dataItem) {
							const date = new Date(dataItem.dmnd_dt);
							const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` +
								`:${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
							return formattedDate;
						}
					},
					{
						field: "co_nm_user_id2", title: "요청사(ID)", attributes: { "class": "table-cell" }, width: 150,
						template: function(dataItem) {
							return dataItem.co_nm_user_id2 !== null ? dataItem.co_nm_user_id2 : '-';
						}
					},
					{
						field: "co_nm_user_id", title: "원요청사(ID)", attributes: { "class": "table-cell" }, width: 270,
						template: function(dataItem) {
							return dataItem.co_nm_user_id !== null ? dataItem.co_nm_user_id : '-';
						}
					},
					{
						field: "cd_expln", title: "요청결과", attributes: { "class": "table-cell" }, width: 250,
						template: function(dataItem) {
							return dataItem.cd_expln !== null ? dataItem.cd_expln : '-';
						}
					},
					{
						field: "dln",
						title: "면허번호",
						attributes: { "class": "table-cell" },
						width: 200,
						template: function(dataItem) {
							return dataItem.dln !== null ? dataItem.dln : '-';
						}
					},
					//					{
					//						field: "dmndCnt", title: "사용횟수", attributes: { "class": "table-cell" }, width: 150
					//					},
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
				excel: {
					fileName: "excel.xlsx",
					allPages: true,
					filterable: true
				},
				selectable: "row",
				change: $openapi.ui.rowClickEvent2
			});
		},
		rowClickEvent2: function(param) {
			var rows = $("#grid2").data("kendoGrid").select();
			var data;

			rows.each(function(e) {
				var grid = $("#grid2").data("kendoGrid");
				var dataItem = grid.dataItem(this);
				data = dataItem;
			});
			$openapi.ui.detaildata(param);

		},
		detaildata: function(param) {

			var arg = {}
			arg.apiSn = param.apiSn
			arg.UserSn = User
			//			arg.startPicker02 = $("#start-picker02").val();
			//			arg.endPicker02 = $("#end-picker02").val();

			ajax(true, contextPath + '/api/apiview/listView', 'body', '조회중입니다', arg, function(data) {
				$('#detail_api_stt').html('');//상태
				$('#detail_api_sbmd').html('');//신청일
				$('#detail_assi_exd').html('');//만료예정일
				$('#detail_api_nm').html('');//APi명
				$('#detail_platformNm').html('');//원제공자
				$('#detail_api_use_cnt').html('');//이용건수
				$('#detail_api_rjctDt').html('');//반려일시
				$('#detail_api_rjctRsn').html('');//반려사유
				$('#detail_api_rjctUserSn').html('');//반려처리자
				$(".ico").empty();

				$openapi.ui.detailPopup(data);
				//				$inquiry.ui.commentList(data.info.pst_sn);
			});
		},
		detailPopup: function(data) {
			if (data.total[0].sttsCd == "4") {
				$('#apiUseStopBtn').hide();
				$('#apiReUseBtn').show();
			} else {
				$('#apiUseStopBtn').show();
				$('#apiReUseBtn').hide();
			}
			if (data != null) {
				//				$('#detail_api_stt').val(data.total[0].sttsCd);          // 상태
				if (data.total[0].sttsCd == "1") {
					$('#detail_api_stt').val('신청')
				}
				if (data.total[0].sttsCd == "2") {
					$('#detail_api_stt').val('활동')
				}
				if (data.total[0].sttsCd == "3") {
					$('#detail_api_stt').val('반려')
				}
				if (data.total[0].sttsCd == "4") {
					$('#detail_api_stt').val('중지')
				}
				$('#detail_api_nm').val(data.total[0].apiNm);          // API명
				$('#detail_api_use_cnt').val(data.total[0].countApiSn);              // 이용건수
				$('#detail_api_rjctRsn').val(data.total[0].rjctRsn);   // 반려사유
				$('#detail_api_rjctRsn').val(data.total[0].detailPlatformNm);   // 원제공자
				var dateString = data.total[0].expryYmd;

				var formattedDate = kendo.toString(new Date(parseInt(data.total[0].dmndDt)), 'yyyy-MM-dd');
				var formattedDate4 = dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');

				// 신청일
				$('#detail_assi_exd').val(formattedDate4);
				$('#detail_api_sbmd').val(formattedDate);
				var rjctDtValue = data.total[0].rjctDt;

				if (rjctDtValue) {
					var formattedDate2 = kendo.toString(new Date(parseInt(rjctDtValue)), 'yyyy-MM-dd');
					$('#detail_api_rjctDt').val(formattedDate2);
				} else {
					$('#detail_api_rjctDt').text('');
				}

			}
		},

		closePopupAndRefreshGrid: function() {
			location.reload();
		},

		extenUseApi: function() {
			var sttsCd = rowData.sttsCd;
			var apiSn = rowData.apiSn;

			if (parseInt(sttsCd) === 4) {
				alert("사용 중지 중입니다.");
			} if (parseInt(sttsCd) === 3) {
				alert("반려 중인 API는 연장할 수 없습니다.");
			} if (parseInt(sttsCd) === 1) {
				alert("신청 중안 API는 연장할 수 없습니다.");
			} if (parseInt(sttsCd) === 2) {
				var param = {
					sttsCd: sttsCd,
					apiSn: apiSn
				};
				ajax(true, contextPath + '/api/apiview/UseExtendApi', 'body', '확인 중입니다.', param, function(data) {
				});
				alert("1년 연장 되었습니다.");
				window.location.href = contextPath + "/api/apiview";

			}
		},

		// 사용중지 버튼을 눌러 삭제한다.
		stopUseApi: function() {
			var sttsCd = rowData.sttsCd;
			var apiSn = rowData.apiSn;

			if (parseInt(sttsCd) === 4) {
				alert("해당 API는 이미 정지 중입니다.");
			} if (parseInt(sttsCd) === 1) {
				alert("신청 중인 API는 중지할 수 없습니다.");
			} if (parseInt(sttsCd) === 3) {
				alert("반려 중인 API는 중지할 수 없습니다.");
			} if (parseInt(sttsCd) === 2) {
				var param = {
					sttsCd: sttsCd,
					apiSn: apiSn
				};
				ajax(true, contextPath + '/api/apiview/StopApiUse', 'body', '확인 중입니다.', param, function(data) {
				});

				alert("정지되었습니다.");
				window.location.href = contextPath + "/api/apiview";

			}
		},
		ReUse: function() {
			var sttsCd = rowData.sttsCd;
			var apiSn = rowData.apiSn;
			var param = {
				sttsCd: sttsCd,
				apiSn: apiSn,
				UserSn: User

			}
			ajax(true, contextPath + '/api/apiview/ApiReUse', 'body', '확인 중입니다.', param, function(data) {
				alert("API가 다시 신청되었습니다.")

				$openapi.ui.detaildata(param);

			});
		},
		execlDownload: function() {
			var options = {};
			options.startPicker02 = $("#start-picker02").val();
			options.endPicker02 = $("#end-picker02").val();
			options.searchSttsCd = $("#search_stts_cd").val();
			options.searchSttsCd2 = $("#search_stts_cd2").val();
			options.searchReq = $("#search_box").val();
			var filename = "API 이용 현황"

			excelDownAjax("/api/apiview/excelDown", options, filename);

		},

	};


	//이벤트 정의
	$openapi.event = {
		setUIEvent: function() {
			$("#userMngBtnSearch").on("click", function() {
				$openapi.event.search();
			});
			$('.download-btn').on("click", function() {
				$openapi.ui.execlDownload();
			})
			$('#end-picker02').change(function() {
				$openapi.event.search2();

			});
		},
		search: function() {
			var startPickerValue = $("#start-picker02").val();
			var endPickerValue = $("#end-picker02").val();

			if (startPickerValue && endPickerValue) {
				var startDate = new Date(startPickerValue);
				var endDate = new Date(endPickerValue);

				if (startDate > endDate) {
					alert("종료일이 시작일보다 빠릅니다. 올바른 날짜 범위를 선택해주세요.");
					return; // 검색 중지
				}
			}
			var grid = $('#grid').data('kendoGrid');
			grid.dataSource.page(1);
//			grid.dataSource.read();
//			$openapi.ui.apiSttsview();

		},
		search2: function() {
			//			var startPickerValue = $("#start-picker02").val();
			//			var endPickerValue = $("#end-picker02").val();

			//			if (startPickerValue && endPickerValue) {
			//				var startDate = new Date(startPickerValue);
			//				var endDate = new Date(endPickerValue);
			//
			//				if (startDate > endDate) {
			//					alert("종료일이 시작일보다 빠릅니다. 올바른 날짜 범위를 선택해주세요.");
			//					return; // 검색 중지
			//				}
			//			}
			var grid = $('#grid2').data('kendoGrid');
			grid.dataSource.page(1);
//			grid.dataSource.read();
//			$openapi.ui.apiSttsview();

		},
	};
}(window, document, jQuery));
