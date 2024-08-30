(function(W, D, $) {

	W.$apiAuth = W.$apiAuth || {};

	var apiListColumns = null;
	var colSetTime = 0;  // 컬럼 생성 전에 그리드 생성 방지용
	var normalUserStts = '';
	var authAdmin = 0;
	$(document).ready(function() {
		$apiAuth.ui.pageLoad();		//최초 페이지 로드 시
		$apiAuth.event.setUIEvent();
		$apiAuth.ui.apiSttsview();
	});

	$apiAuth.ui = {
		/**
		 *
		 * @name         : pageLoad
		 * @description  : 최초 페이지 로드 시 UI에 적용
		 * @date         : 2023. 10. 10.
		 * @author	     : 김상훈
		 */
		pageLoad: function() {
			$("#managerSearch").hide()
			$("#userSearch").hide()

			$apiAuth.ui.setColumnsEtc();
			$apiAuth.ui.checkApiNum();

			var startIn = setInterval(function() {
				if (colSetTime == 1) {
					$apiAuth.ui.ApiSet();
					clearInterval(startIn);
				}
			}, 5);
			//			var searchOtherCondition2 = [
			//				{ value: "", text: "상태 선택" },
			//				{ value: "1", text: "신청" },
			//				{ value: "2", text: "활용" },
			//				{ value: "3", text: "반려" },
			//				{ value: "4", text: "중지" }
			//			];
			//			$("#sttsDrop").kendoDropDownList({
			//				dataTextField: "text",
			//				dataSource: searchOtherCondition2,
			//				dataValueField: "value",
			//			});
			var searchCondition = [
				{ value: "", text: "검색조건 선택" },
				{ value: "companyNm", text: "회사명" },
				{ value: "userNm", text: "사용자명" },
				{ value: "userId", text: "사용자ID" }

			];
			$("#searchCondition").kendoDropDownList({
				dataTextField: "text",
				dataSource: searchCondition,
				dataValueField: "value",
			});

			//			$("#sttsDrop2").kendoDropDownList({
			//				dataTextField: "text",
			//				dataSource: searchOtherCondition2,
			//				dataValueField: "value",
			//				change: function(e) {
			//					var grid = $('#operator_grid').data('kendoGrid');
			//					grid.dataSource.page(1);
			//					grid.dataSource.read();
			//					$apiAuth.ui.apiSttsview();
			//				}
			//			});

			$(document).on('click', '.copy-key', function() {
				var keyToCopy = $(this).data('key');

				var tempInput = $("<input>");
				$("body").append(tempInput);
				tempInput.val(keyToCopy).select();
				document.execCommand("copy");
				tempInput.remove();

				alert(keyToCopy + " 복사되었습니다.");
			});
			var currentDate = new Date();
			var threeMonthsAgo = new Date();
			threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

			$("#start-picker02").kendoDatePicker({
				value: threeMonthsAgo,
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: currentDate,
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
				value: currentDate,
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"]
			});
		},

		/**
		 *
		 * @name         : checkApiNum
		 * @description  : api 자동 신청
		 * @date         : 2023. 12. 12.
		 * @author	     : 김상훈
		 */

		checkApiNum: function() {

			if (authrtCd == 'Z01' || authrtCd == 'K01' || authrtCd == 'D01') {
				$(".apply").hide();
				$(".reissuance").hide();
				$(".extend").hide();
				$(".Applying").hide();
				$(".NewApi").hide();
				$(".TestKey").hide();
			} else {
				//				var userSn = UserSn
				var param = {}
				//				param.userSn = userSn
				ajax(true, contextPath + '/api/apiAuthKey/listView', 'body', '조회중입니다', param, function(data) {
					var apiData = data;

					//					var hasOperSeCdZero = apiData.data.some(function(item) {
					//						return item.operSeCd === '0';
					//					});
					//
					//
					$(".apply").hide();
					$(".reissuance").hide();
					$(".extend").hide();
					$(".Applying").hide();
					$(".NewApi").hide();
					let found = false;

					//										for (let i = 0; i < apiData.data.length; i++) {
					//											if (apiData.data[i].sttsCd == '1' && apiData.data[i].operSeCd == '1') {
					//												$(".Applying").show();
					//												found = true;
					//												break;
					//											}
					//										}

					if (!found) {
						if (apiData.data.length == 0) {
							$(".apply").show();
							$(".extend").hide();
							$(".Applying").hide();
							$(".reissuance").hide();
						} else {
							if (apiData.data[0].sttsCd == '1') {
								$(".Applying").show();

							}
							if (apiData.data[0].sttsCd == '2') {
								$(".apply").hide();
								$(".reissuance").show();
								$(".extend").show();
							}
							if (apiData.data[0].sttsCd == '3') {
								$(".ReApi").show();
								$(".reissuance").hide();
								$(".extend").hide();
							}
							if (apiData.data[0].sttsCd == '4') {
								$(".ReApi").show();
								$(".reissuance").hide();
								$(".extend").hide();
							}
						}
					}

					//					if (apiData.data.length == 0) {
					//						$(".apply").show();
					//						$(".extend").hide();
					//						$(".Applying").hide();
					//						$(".reissuance").hide();
					//					} else {
					//						if (apiData.data[0].sttsCd == '1') {
					//							$(".Applying").show();
					//						}
					//						if (apiData.data[0].sttsCd == '2') {
					//							$(".apply").hide();
					//							$(".reissuance").show();
					//							$(".extend").show();
					//						}
					//						if (apiData.data[0].sttsCd == '3') {
					//							$(".ReApi").show();
					//							$(".reissuance").hide();
					//							$(".extend").hide();
					//						}
					//						if (apiData.data[0].sttsCd == '4') {
					//							$(".ReApi").show();
					//							$(".reissuance").hide();
					//							$(".extend").hide();
					//						}
					//					}
				});

			}


		},

		/**
		 *
		 * @name         : setColumnsEtc
		 * @description  : 권한에 따른 컬럼 등 설정
		 * @date         : 2023. 11. 15.
		 * @author	     : 김경룡
		 */
		setColumnsEtc: function() {
			if (authrtCd == 'Z01' || authrtCd == 'K01' || authrtCd == 'D01') {
				authAdmin = 1;
				apiListColumns =
					[
						{ field: "sn", title: "순번", width: 30 },
						{ field: "issuDt", title: "발급일", width: 60 },
						{
							field: "coNm", title: "회사명", width: 60,
							template: function(dataItem) {
								return dataItem.coNm ? "<span class='cell-popup copy-key' data-key='" + dataItem.coNm + "'>" + dataItem.coNm + "</span>" : '-';
							}
						},
						{ field: "rqstrNm", title: "사용자명", width: 60 },
						{ field: "userId", title: "사용자ID", width: 60 },
						{
							field: "certKey",
							title: "인증키",
							width: 180,
							template: function(dataItem) {
								return "<span class='cell-popup copy-key' data-key='" + dataItem.certKey + "'>" + dataItem.certKey + "</span>";
							}
						},
						{
							field: "secretKey",
							title: "비밀키",
							width: 180,
							template: function(dataItem) {
								return "<span class='cell-popup copy-key' data-key='" + dataItem.secretKey + "'>" + dataItem.secretKey + "</span>";
							}
						},
						//						{
						//							field: "operSeCd",
						//							title: "구분",
						//							width: 30,
						//							template: function(dataItem) {
						//								if (dataItem.operSeCd == '1') {
						//									return '운영'
						//								} else {
						//									return '개발'
						//								}
						//							}
						//						},
						{ field: "statusDescription", title: "상태", width: 30 },
						{
							template: "#if(sttsCd == '1') {#"
								+ "<button id='appr' class='blue_btn' style='width:40px; height:30px;' onClick='javascript:$apiAuth.event.approveBtn(event);'>승인</button>&nbsp;"
								+ "<button id='refs' class='red_btn' style='width:40px; height:30px;' onClick='javascript:$apiAuth.event.refuseBtn(event);'>반려</button>"
								+ "#}if(sttsCd == '2') {#"
								+ "<button id='stopUse' class='red_btn' style='width:40px; height:30px;' onClick='javascript:$apiAuth.event.stopUseBtn(event);'>중지</button>"
								+ "#}if(sttsCd == '3') {#"
								+ "<span>반려 중</span>"
								+ "#}if(sttsCd == '4') {#"
								+ "<button id='ReUse' class='gray_btn' style='width:80px; height:30px;' onClick='javascript:$apiAuth.event.ReUse(event);'>중지 해제</button>"
								+ "#}#",
							title: "승인 / 반려",
							width: 50
						},
					];
			} else {
				apiListColumns =
					[
						{ field: "sn", title: "순번", attributes: { "class": "table-cell" }, width: 30 },
						{ field: "issuDt", title: "발급일", attributes: { "class": "table-cell" }, width: 40 },
						{ field: "coNm", title: "회사명", attributes: { "class": "table-cell" }, width: 40 },
						{ field: "rqstrNm", title: "사용자이름", attributes: { "class": "table-cell" }, width: 40 },
						{
							field: "certKey",
							title: "인증키",
							width: 180,
							template: function(dataItem) {
								return "<span class='cell-popup copy-key' data-key='" + dataItem.certKey + "'>" + dataItem.certKey + "</span>";
							}
						},
						{
							field: "secretKey",
							title: "비밀키",
							width: 180,
							template: function(dataItem) {
								return "<span class='cell-popup copy-key' data-key='" + dataItem.secretKey + "'>" + dataItem.secretKey + "</span>";
							}
						},
						//						{
						//							field: "operSeCd",
						//							title: "구분",
						//							width: 30,
						//							template: function(dataItem) {
						//								if (dataItem.operSeCd == '1') {
						//									return '운영'
						//								} else {
						//									return '개발'
						//								}
						//							}
						//						},
						{ field: "statusDescription", title: "상태", attributes: { "class": "table-cell" }, width: 30 },
					];

				$(".reissuance").show();
			}

			colSetTime = 1;

		},

		ApiSet: function() {
			if (authrtCd == 'Z01' || authrtCd == 'K01' || authrtCd == 'D01') {
				$("#managerSearch").show()
				$("#userSearch").hide()
				const arg = {};
				//				arg.UserSn = UserSn;
				$apiAuth.ui.apiView();

			} else {
				$("#userSearch").show()
				$("#managerSearch").hide()
				const arg = {};
				//				arg.UserSn = UserSn;

				$apiAuth.ui.apiView();

			}

		},

		apiView: function() {
			$("#operator_grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/api/apiAuthKey/listView',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							if (authrtCd == "K01" || authrtCd == "Z01" || authrtCd == 'D01') {
								options.startPicker02 = $("#start-picker02").val();
								options.endPicker02 = $("#end-picker02").val();
								options.searchCondition = $("#searchCondition").val();
								options.searchText = $("#search_box").val();
								options.authrtCd = authrtCd
								//								options.sttsCd = $("#sttsDrop").val()
								options.sttsCd = normalUserStts
							} else {
								//								options.userSn = UserSn
								options.sttsCd = normalUserStts
								//								options.authrtCd = authrtCd
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
					serverSorting: false,
					autoBind: false,
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: apiListColumns,
				navigatable: true,
				pageable: {
					pageSizes: [10, 20, 50, 100],
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},

				editable: false,
				resizable: true,
				excel: {
					fileName: "건별 엑셀.xlsx",
					allPages: true,
					filterable: true
				},
			});
		},

		// 재발급 버튼 클릭
		updatesttCd: function() {
			//			var UserSn = UserSn
			const arg = {};
			//			arg.userSn = UserSn;
			if (confirm("인증키를 재발급(재신청) 하시겠습니까?")) {
				if (confirm("기존 인증키는 중지되고, 새로운 인증키가 발급됩니다. 계속하시겠습니까?")) {
					ajax(true, contextPath + '/api/apiAuthKey/updateSttCd', 'body', '확인중입니다.', arg, function(data) {
						alert("재발급 요청이 되었습니다.");
						location.reload();
					});
				} else {
					alert("취소되었습니다.");
				}
			} else {
				alert("취소되었습니다.");
			}
		},
		issueAPi: function() {
			var param = {}
			//			param.operSn = 1
			ajax(true, contextPath + '/api/apiAuthKey/insertApiAuthKey', 'body', '확인중입니다.', param, function(data) {
				alert("API가 신청되었습니다.");
				$apiAuth.ui.ApplyStts();
				//				$apiAuth.ui.testKey();
				location.reload();

			});
		},
		reissueAPi: function() {
			var param = {}
			//			param.operSn = 1
			ajax(true, contextPath + '/api/apiAuthKey/insertApiAuthKey', 'body', '확인중입니다.', param, function(data) {
				alert("API가 신청되었습니다.");
				location.reload();
			});
		},
		//		testKey: function() {
		//			var param = {}
		//			//			param.operSeCd = '0'
		//			ajax(true, contextPath + '/api/apiAuthKey/insertApiTestKey', 'body', '확인중입니다.', param, function(data) {
		//				alert("API 개발용 키가 신청되었습니다.");
		//				$apiAuth.ui.ApplyStts();
		//			});
		//		},
		apiSttsview: function() {
			const options = {};
			if (authrtCd == "K01" || authrtCd == "Z01" || authrtCd == 'D01') {
				options.startPicker02 = $("#start-picker02").val();
				options.endPicker02 = $("#end-picker02").val();
				options.searchCondition = $("#searchCondition").val();
				options.searchText = $("#search_box").val();
				options.authrtCd = authrtCd
				//				options.sttsCd = $("#sttsDrop").val()
				options.sttsCd = normalUserStts
			} else {
				//								options.userSn = UserSn
				//				options.authrtCd = authrtCd
				options.sttsCd = normalUserStts
			}
			ajax(true, contextPath + '/api/apiAuthKey/apiSttsview', 'body', '조회중입니다', options, function(data) {
				// 초기값 설정
				$('#APiapplication').html('0 건');
				$('#ApiUse').html('0 건');
				$('#ApiReject').html('0 건');
				$('#ApiStop').html('0 건');
				$('#ApiHold').html('0 건');
				$('#ApiChange').html('0 건');

				if (data.data.length > 0) {
					for (var i = 0; i < data.data.length; i++) {
						if (data.data[i].stts == "신청") {
							$('#APiapplication').html(data.data[i].count + ' 건');//신청
						}
						if (data.data[i].stts == "활용") {
							$('#ApiUse').html(data.data[i].count + ' 건');//활용
						}
						if (data.data[i].stts == "반려") {
							$('#ApiReject').html(data.data[i].count + ' 건');//반려
						}
						if (data.data[i].stts == "중지") {
							$('#ApiStop').html(data.data[i].count + ' 건');//중지
						}
					}
				}
			});
		},
		ApplyStts: function() {
			var param = {}
			//			var userSn = UserSn;
			//			param.userSn = userSn
			ajax(true, contextPath + '/api/apiAuthKey/checkstts', 'body', '확인중입니다.', param, function(data) {
				var apiCount = data.data.length;
				var apiuser = data.totalapi;
				// 추가 API가 있을 떄 
				if (apiuser < apiCount && apiuser != 0) {

					function generateNumbersInRange(start, end) {
						var numbersInRange = [];
						var difference = Math.abs(end - start);

						if (difference < 1) {
							return numbersInRange;
						}

						var smallerNumber = start < end ? start : end;

						for (var i = 1; i <= difference; i++) {
							numbersInRange.push(smallerNumber + i);
						}

						return numbersInRange;
					}
					var result1 = generateNumbersInRange(apiuser, apiCount);
					$apiAuth.ui.insertNewApiParam(result1);
				}
				// 최초 신청
				if (apiuser == 0) {


					$apiAuth.ui.insertStts(data);

				} else {
					location.reload();
				}

			});
		},

		insertNewApiParam: function(result1) {
			if (result1.length != 0) {
				for (var i = 0; i < result1.length; i++) {
					var param = {}
					//					var UserSn = UserSn
					//					param.userSn2 = UserSn
					param.apiSn = result1[i]
					//					param.UserSn = UserSn
					ajax(true, contextPath + '/api/apiAuthKey/insertApiNum', 'body', '확인중입니다.', param, function(data) {
					});
					location.reload();
				}
			}
		},
		insertStts: function(data) {
			var count = data.data.length
			//			var UserSn = userSn

			var param = {}
			for (var i = 0; i < count; i++) {
				var apiSn = data.data[i].apiSn
				param.apiSn = apiSn
				//				param.userSn = UserSn
				ajax(true, contextPath + '/api/apiAuthKey/insertApiNum', 'body', '확인중입니다.', param, function(data) {
				});
			}
			location.reload();

		},
		extendAPi: function() {
			var param = {}
			//			var userSn = UserSn
			//			param.UserSn = UserSn
			ajax(true, contextPath + '/api/apiAuthKey/extendAPi', 'body', '확인중입니다.', param, function(data) {
			});
			alert("2년 연장되었습니다.")
			location.reload();

		},
		extendAPi: function() {
			var param = {}
			//			var userSn = UserSn
			//			param.UserSn = UserSn
			ajax(true, contextPath + '/api/apiAuthKey/extendAPi', 'body', '확인중입니다.', param, function(data) {
			});
			alert("2년 연장되었습니다.")
			location.reload();

		},


	};


	//이벤트 정의
	$apiAuth.event = {
		setUIEvent: function() {
			// 재발급버튼 클릭
			$('.NewApi').click(function() {
				$apiAuth.ui.CheckStts();
			});
			//신청 (일반)
			$('#applicationClick').click(function() {
				if (authAdmin == 1) {

					normalUserStts = '1';
					var grid = $('#operator_grid').data('kendoGrid');
					//				grid.dataSource.page(1);
					grid.dataSource.page(1);
					$apiAuth.ui.apiSttsview();
				}
			});
			//활용 (일반)
			$('#useClick').click(function() {
				if (authAdmin == 1) {
					normalUserStts = '2';
					var grid = $('#operator_grid').data('kendoGrid');
					grid.dataSource.page(1);
					$apiAuth.ui.apiSttsview();
				}
			});
			//반려 (일반)
			$('#rejectClick').click(function() {
				if (authAdmin == 1) {

					normalUserStts = '3';
					var grid = $('#operator_grid').data('kendoGrid');
					grid.dataSource.page(1);
					$apiAuth.ui.apiSttsview();
				}
			});
			//중지 (일반)
			$('#stopClick').click(function() {
				if (authAdmin == 1) {

					normalUserStts = '4';
					var grid = $('#operator_grid').data('kendoGrid');
					grid.dataSource.page(1);
					$apiAuth.ui.apiSttsview();
				}
			});
			$('.reissuance').click(function() {
				$apiAuth.ui.updatesttCd();
			});

			$('#BtnSearch').click(function() {
				var grid = $('#operator_grid').data('kendoGrid');
				//				grid.dataSource.page(1);
				grid.dataSource.page(1);
				$apiAuth.ui.apiSttsview();

			});
			// 반려상태일때 사용자가 신청하기를 클릭한다.
			$('.ReApi').click(function() {
				//				var confirmation = confirm("API를 신청하시겠습니까?");
				var confirmation = confirm("API를 신청하시겠습니까?");
				if (confirmation) {
					$apiAuth.ui.reissueAPi();
				} else {
					return alert('취소되었습니다.')
				}
			});
			// 초기 사용자가 신청하기를 클릭한다.
			$('.apply').click(function() {
				var confirmation = confirm("API를 신청하시겠습니까?");
				//				var confirmation = confirm("API를 신청시 테스트키도 같이 발급됩니다. 신청하시겠습니까?");
				if (confirmation) {
					$apiAuth.ui.issueAPi();
					//					$apiAuth.ui.testKey();
				} else {
					return alert('취소되었습니다.')
				}
			});

			// 연장하기 버튼 클릭 시 
			$('.extend').click(function() {
				var confirmation = confirm("API 연장 신청하시겠습니까?");

				if (confirmation) {
					$apiAuth.ui.extendAPi();
				} else {
					return alert('취소되었습니다.')
				}
			});
			// 기존 사용자가 개발키 발급을 신청한다.
			//			$('.TestKey').click(function() {
			//				var confirmation = confirm("개발용 API를 신청하시겠습니까?");
			//
			//				if (confirmation) {
			//					$apiAuth.ui.testKey();
			//				} else {
			//					return alert('취소되었습니다.')
			//				}
			//			});

		},

		copyKey: function(event, text) {
			const textarea = document.createElement('textarea');
			textarea.value = text;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			document.body.removeChild(textarea);

			alert('텍스트가 복사되었습니다: ' + text);
		},

		/**
		 *
		 * @name         : approveBtn
		 * @description  : 공단/관리자 승인 버튼
		 * @date         : 2023. 11. 15.
		 * @author	     : 김경룡
		 */
		approveBtn: function(e) {

			var target = $(e.target).closest("tr");
			var userData = $("#operator_grid").data("kendoGrid").dataItem(target);
			var param = {
				userSn: userData.userSn,
				cert: userData.certKey,
				//				autzr: UserSn
			};

			if (confirm("승인하시겠습니까?")) {
				ajax(true, contextPath + '/api/apiAuthKey/approve', 'body', '확인중입니다.', param, function(data) {
					alert("승인처리 되었습니다");
					//				var grid = $('#grid').data('kendoGrid');
					//				grid.dataSource.page(1);
					location.reload();

				});
			}
		},

		/**
		 *
		 * @name         : refuseBtn
		 * @description  : 공단/관리자 반려 버튼
		 * @date         : 2023. 11. 15.
		 * @author	     : 김경룡
		 */
		refuseBtn: function(e) {
			var target = $(e.target).closest("tr");
			var userData = $("#operator_grid").data("kendoGrid").dataItem(target);
			var param = {
				userSn: userData.userSn,
				cert: userData.certKey,
				//				autzr: UserSn
			};

			if (confirm("반려 하시겠습니까?")) {
				ajax(true, contextPath + '/api/apiAuthKey/refuse', 'body', '확인중입니다.', param, function(data) {
					alert("반려처리 되었습니다");
					//				var grid = $('#grid').data('kendoGrid');
					//				grid.dataSource.page(1);
					location.reload();

				});
			}
		},
		ReUse: function(e) {
			var target = $(e.target).closest("tr");
			var userData = $("#operator_grid").data("kendoGrid").dataItem(target);
			var param = {
				userSn: userData.userSn,
				cert: userData.certKey,
				//				autzr: UserSn
			};

			if (confirm("중지 해제 하시겠습니까?")) {
				ajax(true, contextPath + '/api/apiAuthKey/ReUse', 'body', '확인중입니다.', param, function(data) {
					alert("중지 해제 되었습니다");
					//				var grid = $('#grid').data('kendoGrid');
					//				grid.dataSource.page(1);
					location.reload();

				});
			}
		},

		/**
		*
		* @name         : stopUseBtn
		* @description  : 공단/관리자 중지 버튼
		* @date         : 2023. 11. 22.
		* @author	     : 김상훈
		*/
		stopUseBtn: function(e) {
			var target = $(e.target).closest("tr");
			var userData = $("#operator_grid").data("kendoGrid").dataItem(target);
			var param = {
				userSn: userData.userSn,
				cert: userData.certKey,
				//				autzr: UserSn
			};
			if (confirm("중지 하시겠습니까?")) {
				ajax(true, contextPath + '/api/apiAuthKey/stopUse', 'body', '확인중입니다.', param, function(data) {
					alert("중지 되었습니다");
					//				var grid = $('#grid').data('kendoGrid');
					//				grid.dataSource.page(1);
					location.reload();
				});
			}
		},


	};
}(window, document, jQuery));
