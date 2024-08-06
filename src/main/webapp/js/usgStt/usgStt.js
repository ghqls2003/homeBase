/**
 * 확인이력조회
 *
 * history : 네이버시스템(주), 1.0, 2023/06/28  초기 작성
 * author : 김상훈
 * version : 1.0
 * see : jQuery 플러그인(라이브러리 모듈화), Immediately-invoked function
 *
 */
(function(W, D, $) {
	'use strict';

	W.$usgStt = W.$usgStt || {};
	var searchVal = {};

	$(document).ready(function() {
		$usgStt.ui.pageLoad();		//최초 페이지 로드 시
		$usgStt.event.setUIEvent();
	});


	$usgStt.ui = {

		pageLoad: function() {

			$("#tabview1").hide();
			$("#tabview3").hide();
			$("#tabview4").hide();
			$("#search_box1").hide();
			$("#search_box3").hide();
			$("#search_box4").hide();

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

					if (startDate) {
						var diffInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
						if (diffInDays > 30) {
							this.value(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 30));
						}
					}
				}
			});

			$("#start-picker01").kendoDatePicker({
				value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date(),
				change: function() {
					var startDate = this.value();
					var endDatePicker = $("#end-picker01").data("kendoDatePicker");

					if (startDate) {
						var newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 30);
						endDatePicker.min(startDate);
						endDatePicker.value(newEndDate > new Date() ? new Date() : newEndDate);
					}
				}
			});

			//			$("#end-picker02").kendoDatePicker({
			//				value: new Date(),
			//				dateInput: true,
			//				format: "yyyy-MM-dd",
			//				parseFormats: ["yyyy-MM-dd"],
			//				max: new Date()
			//			});
			$("#end-picker02").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date(),
				change: function() {
					var endDate = this.value();
					var startDatePicker = $("#start-picker02").data("kendoDatePicker");
					var startDate = startDatePicker.value();

					if (startDate) {
						var diffInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
						if (diffInDays > 30) {
							this.value(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 30));
						}
					}
				}
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
						var newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 30);
						endDatePicker.min(startDate);
						endDatePicker.value(newEndDate > new Date() ? new Date() : newEndDate);
					}
				}
			});
			$("#end-picker03").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date(),
				change: function() {
					var endDate = this.value();
					var startDatePicker = $("#start-picker03").data("kendoDatePicker");
					var startDate = startDatePicker.value();

					if (startDate) {
						var diffInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
						if (diffInDays > 30) {
							this.value(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 30));
						}
					}
				}
			});
			$("#start-picker03").kendoDatePicker({
				value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date(),
				change: function() {
					var startDate = this.value();
					var endDatePicker = $("#end-picker03").data("kendoDatePicker");

					if (startDate) {
						var newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 30);
						endDatePicker.min(startDate);
						endDatePicker.value(newEndDate > new Date() ? new Date() : newEndDate);
					}
				}
			});
			$("#end-picker04").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date(),
				change: function() {
					var endDate = this.value();
					var startDatePicker = $("#start-picker04").data("kendoDatePicker");
					var startDate = startDatePicker.value();

					if (startDate) {
						var diffInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
						if (diffInDays > 30) {
							this.value(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 30));
						}
					}
				}
			});
			$("#start-picker04").kendoDatePicker({
				value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
				dateInput: true,
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				max: new Date(),
				change: function() {
					var startDate = this.value();
					var endDatePicker = $("#end-picker04").data("kendoDatePicker");

					if (startDate) {
						var newEndDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 30);
						endDatePicker.min(startDate);
						endDatePicker.value(newEndDate > new Date() ? new Date() : newEndDate);
					}
				}
			});

			$("#search_type_cd").kendoDropDownList({
				dataSource: {
					data: [
						{ name: "요청유형", value: "" },
						{ name: "조회", value: "R" },
						{ name: "입력", value: "C" },
						{ name: "수정", value: "U" },
						{ name: "삭제", value: "D" },
						{ name: "화면조회", value: "화면조회" },
						{ name: "파일 다운로드", value: "파일 다운로드" },
					]
				},
				dataTextField: "name",
				dataValueField: "value"
			});
			$("#search_type_cd2").kendoDropDownList({
				dataSource: {
					data: [
						{ name: "검색조건 선택", value: "" },
						{ name: "메뉴명", value: "메뉴명" },
						{ name: "상위메뉴명", value: "상위메뉴명" },
					]
				},
				dataTextField: "name",
				dataValueField: "value"
			});
			$("#search_type_cd3").kendoDropDownList({
				dataSource: {
					data: [
						{ name: "검색조건 선택", value: "" },
						{ name: "성명", value: "성명" },
						{ name: "ID", value: "ID" },
					]
				},
				dataTextField: "name",
				dataValueField: "value"
			});
			$("#search_type_cd4").kendoDropDownList({
				dataSource: {
					data: [
						{ name: "검색조건 선택", value: "" },
						{ name: "로그인", value: "I" },
						{ name: "로그아웃", value: "O" },
					]
				},
				dataTextField: "name",
				dataValueField: "value"
			});
			$("#search_type_cd5").kendoDropDownList({
				dataSource: {
					data: [
						{ name: "검색조건 선택", value: "" },
						{ name: "PC", value: "PC" },
						{ name: "Mobile", value: "Mobile" },
					]
				},
				dataTextField: "name",
				dataValueField: "value"
			});
			$("#privateYn").kendoDropDownList({
				dataSource: {
					data: [
						{ name: "검색조건 선택", value: "" },
						{ name: "개인식별정보포함", value: "Y" },
						{ name: "개인식별정보미포함", value: "N" },
					]
				},
				dataTextField: "name",
				dataValueField: "value"
			});
			$("#search_type_cd6").kendoDropDownList({
				dataSource: {
					data: [
						{ name: "다운로드사유여부 (전체)", value: "" },
						{ name: "Y", value: "Y" },
						{ name: "N", value: "N" },
					]
				},
				dataTextField: "name",
				dataValueField: "value"
			});
			$usgStt.ui.kendoGridLoad(); //건별접속이력
			$usgStt.ui.usercnct();		//메뉴별
			$usgStt.ui.cnctHist();		//사용자별이용
			$usgStt.ui.loginView();		//로그인 로그

		},
		//건별접속이력
		kendoGridLoad: function() {
			$("#grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/usgStt/usgStt/historylistView',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							options.useId = $("#searchOwn").val();
							options.useNm = $("#searchTwo").val();
							options.startDt = $("#start-picker01").val();
							options.endDt = $("#end-picker01").val();
							options.typeCd = $("#search_type_cd").val();
							options.pageSize = $("#grid").data("kendoGrid").dataSource.pageSize();
							options.page = $("#grid").data("kendoGrid").dataSource.page();
							options.prvcIdntfYn = $("#prvcIdntfYn").val();
							options.menuCd = $("#menuCd").val();
							options.downLoadYn = $("#search_type_cd6").val();
							options.inqNocs = $("#inqNocs").val();
							if ($("#chkExtWrk").is(":checked"))
								options.chkExtWrk = "Y";
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
					{ field: "rn", title: "순번", attributes: { "class": "table-cell" }, width: 80 },
					{ field: "dmnd_dt", title: "요청시간", attributes: { "class": "table-cell" }, width: 200 },
					{ field: "user_ip_addr", title: "접속IP", attributes: { "class": "table-cell" }, width: 130 },
					{ field: "sso_user_nm", title: "사용자명", attributes: { "class": "table-cell" }, width: 100 },
					{ field: "sso_user_id", title: "유저아이디", attributes: { "class": "table-cell" }, width: 80 },
					{
						field: "menu_cd",
						title: "접속유형",
						attributes: { "class": "table-cell" },
						width: 80,
						template: function(dataItem) {
							var menuCode = dataItem.menu_cd || '';
							var extractedUrl = dataItem.extracted_url;

							if (menuCode.startsWith("PMNU_")) {
								return "PTS";
							} else if (extractedUrl == "/ma/main") {
								return "PTS";
							} else if (menuCode.startsWith("OMNU_")) {
								return "OPS";
							} else if (extractedUrl == "ssoLogin") {
								return "PTS"; // "PTS"로 설정
							} else if (extractedUrl == "/ma/ssoLogin") {
								return "PTS";
							} else if (extractedUrl == "/ma/logout") {
								return "PTS";
							} else {
								return menuCode;
							}
						}
					},

					{ field: "dmnd_type_cd", title: "작업유형", attributes: { "class": "table-cell" }, width: 100 },
					{
						field: "menu_nm", title: "메뉴이름", attributes: { "class": "table-cell" }, width: 150, template: function(dataItem) {
							var extractedUrl = dataItem.extracted_url;
							if (extractedUrl == "/ma/ssoLogin") {
								return "PTS 로그인";
							} else if (extractedUrl == "/ma/logout") {
								return "PTS 로그아웃";
							} else if (extractedUrl == "/ma/main") {
								return "메인 페이지";
							} else if (extractedUrl == null && extractedUrl == '') {
								return "-";
							}
							else {
								return dataItem.menu_nm;
							}
						}
					},
					{ field: "dmnd_url_addr", title: "요청URL", attributes: { "class": "table-cell" }, width: 200 },
					{ field: "dmnd_parameter", title: "요청파라미터값", attributes: { "class": "table-cell wrap-text" }, width: 500 },
					{
						field: "dwnld_rsn", title: "다운로드 사유", attributes: { "class": "table-cell wrap-text2" }, width: 300,
						template: function(dataItem) {
							return dataItem.dwnld_rsn ? dataItem.dwnld_rsn : '-';

						}
					},
					{
						field: "inq_nocs",
						title: "이용건수",
						attributes: { "class": "table-cell wrap-text" },
						width: 300,
						template: function(dataItem) {
							if (dataItem.inq_nocs == null || dataItem.inq_nocs === '') {
								return '0 건';
							} else {
								return dataItem.inq_nocs + ' 건';
							}
						}
					}],
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
				change: $usgStt.ui.rowClickEvent

			});
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
			var apiSn = data.damsapi;
			$(".api_pop").addClass("view");

			$usgStt.ui.selectApiDetailInfo(rowData);
		},
		usercnct: function() {
			$usgStt.ui.usercnctGridLoad();

			$(window).resize(function() {
				resizeGrid();
			});

			var gridElement = $("#usercnctListView");

			function resizeGrid() {
				gridElement.data("kendoGrid").resize();
			}
		},
		//메뉴별 통계 이력
		usercnctGridLoad: function() {
			$("#usercnctListView").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/usgStt/usgStt/usercnctListView',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							options.useId = $("#searchOwn2").val();
							options.search_type_cd2 = $("#search_type_cd2").val();
							options.startDt = $("#start-picker03").val();
							options.endDt = $("#end-picker03").val();
							options.pageSize = $("#usercnctListView").data("kendoGrid").dataSource.pageSize();
							options.page = $("#usercnctListView").data("kendoGrid").dataSource.page();
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
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: [
					{ field: "seq_num", title: "번호", attributes: { "class": "table-cell" }, width: 50 },
					{
						field: "dmnd_date",
						title: "일자",
						attributes: { "class": "table-cell" },
						width: 150,
						template: "#= kendo.toString(new Date(dmnd_date), 'yyyy-MM-dd') #"
					},
					{
						field: "up_menu_cd",
						title: "접속유형",
						attributes: { "class": "table-cell" },
						width: 100,
						template: function(dataItem) {
							var menuCode = dataItem.menu_cd || ''; // 값이 없을 경우를 대비해 기본값 설정
							if (menuCode.startsWith("PMNU_")) {
								return "PTS";
							} else if (menuCode.startsWith("OMNU_")) {
								return "OPS";
							} else {
								return menuCode; // 패턴과 일치하지 않으면 원래 값을 표시
							}
						}
					},
					{ field: "menu_cd", title: "메뉴ID", attributes: { "class": "table-cell" }, width: 150 },
					{ field: "menu_nm", title: "메뉴명", attributes: { "class": "table-cell" }, width: 100 },
					{ field: "up_menu_name", title: "상위메뉴명", attributes: { "class": "table-cell" }, width: 100 },
					{ field: "duplicate_count", title: "조회 횟수", attributes: { "class": "table-cell" }, width: 150 },
					{ field: "ratio", title: "조회 비율", attributes: { "class": "table-cell" }, width: 150 },
				],
				navigatable: true,
				pageable: { pageSizes: true, buttonCount: 5 },
				editable: false,
				resizable: true,
				excel: {
					fileName: "사용자별접속횟수.xlsx",
					allPages: true,
					filterable: true
				},
			});
		},
		//로그인 로그
		loginView: function() {
			$("#loginView").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/usgStt/usgStt/loginView',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							options.useId = $("#searchOwn4").val();
							options.search_type_cd = $("#search_type_cd4").val();
							options.search_type_cd2 = $("#search_type_cd5").val();
							options.startDt = $("#start-picker04").val();
							options.endDt = $("#end-picker04").val();
							options.pageSize = $("#loginView").data("kendoGrid").dataSource.pageSize();
							options.page = $("#loginView").data("kendoGrid").dataSource.page();
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
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: [
					{ field: "seq_num", title: "번호", attributes: { "class": "table-cell" }, width: 50 },
					{
						field: "cntn_dt",
						title: "접속일시",
						attributes: { "class": "table-cell" },
						width: 150,
						template: function(dataItem) {
							var date = new Date(dataItem.cntn_dt);
							return kendo.toString(date, "yyyy-MM-dd HH:mm:ss");
						}
					},
					{ field: "sso_user_id", title: "유저ID", attributes: { "class": "table-cell" }, width: 150 },
					{ field: "sso_user_nm", title: "유저이름", attributes: { "class": "table-cell" }, width: 150 },
					{ field: "login_logout", title: "로그인/로그아웃", attributes: { "class": "table-cell" }, width: 150 },
					{ field: "cd_nm", title: "로그인유형", attributes: { "class": "table-cell" }, width: 150 },
					{ field: "cntn_mthd_cd", title: "PC/Mobile", attributes: { "class": "table-cell" }, width: 100 },
					{ field: "cntn_ip_addr", title: "접속IP", attributes: { "class": "table-cell" }, width: 100 },
					//					{ field: "user_login_count", title: "접속 건수", attributes: { "class": "table-cell" }, width: 150 },
				],
				navigatable: true,
				pageable: { pageSizes: true, buttonCount: 5 },
				editable: false,
				resizable: true,
				excel: {
					fileName: "로그인.xlsx",
					allPages: true,
					filterable: true
				},
			});
		},
		cnctHist: function() {
			$usgStt.ui.cnctHistGridLoad();

			$(window).resize(function() {
				resizeGrid();
			});

			var gridElement = $("#cnctHistListView");

			function resizeGrid() {
				gridElement.data("kendoGrid").resize();
			}
		},
		//사용자별이용횟수 
		cnctHistGridLoad: function() {
			$("#cnctHistListView").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/usgStt/usgStt/cnctHistListView',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							options.useId = $("#searchOwn3").val();
							//							options.useNm = $("#searchTwo3").val();
							options.search_type_cd3 = $("#search_type_cd3").val();
							options.startDt = $("#start-picker02").val();
							options.endDt = $("#end-picker02").val();
							options.pageSize = $("#cnctHistListView").data("kendoGrid").dataSource.pageSize();
							options.page = $("#cnctHistListView").data("kendoGrid").dataSource.page();
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
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: [
					{ field: "rn", title: "번호", attributes: { "class": "table-cell" }, width: 50 },
					{ field: "dmnd_date", title: "접속일시", attributes: { "class": "table-cell" }, width: 100 },
					{ field: "sso_user_nm", title: "성명", attributes: { "class": "table-cell" }, width: 100 },
					{ field: "sso_user_id", title: "아아디", attributes: { "class": "table-cell" }, width: 100 },
					{
						field: "up_menu_cd", title: "접속유형", attributes: { "class": "table-cell" }, width: 100,
						template: function(dataItem) {
							var menuCode = dataItem.up_menu_cd || '';
							if (menuCode.startsWith("PMNU")) {
								return "PTS";
							} else if (menuCode.startsWith("OMNU")) {
								return "OPS";
							} else {
								return menuCode;
							}
						}
					},
					{ field: "menu_nm", title: "메뉴이름", attributes: { "class": "table-cell" }, width: 100 },
					{ field: "menu_view_count", title: "조회 횟수", attributes: { "class": "table-cell" }, width: 100 },
				],
				navigatable: false,
				pageable: { pageSizes: true, buttonCount: 5 },
				editable: false,
				resizable: false,
				excel: {
					fileName: "메뉴별 통계이력.xlsx",
					allPages: true,
					filterable: true
				},

			});
		},
	};

	//이벤트 정의
	$usgStt.event = {
		// 조회 버튼 클릭 핸들러
		setUIEvent: function() {
			$('#searchBtn').on('click', function() {
				var startPickerValue = $("#start-picker01").val();
				var endPickerValue = $("#end-picker01").val();

				if (startPickerValue && endPickerValue) {
					var startDate = new Date(startPickerValue);
					var endDate = new Date(endPickerValue);

					if (startDate > endDate) {
						alert("종료일이 시작일보다 빠릅니다. 올바른 날짜 범위를 선택해주세요.");
						return; // 검색 중지
					}
				}

				$("#grid").data("kendoGrid").dataSource.page(1);
			});
			$('#searchBtn2').on('click', function() {
				var startPickerValue = $("#start-picker03").val();
				var endPickerValue = $("#end-picker03").val();

				if (startPickerValue && endPickerValue) {
					var startDate = new Date(startPickerValue);
					var endDate = new Date(endPickerValue);

					if (startDate > endDate) {
						alert("종료일이 시작일보다 빠릅니다. 올바른 날짜 범위를 선택해주세요.");
						return; // 검색 중지
					}
				}

				$("#usercnctListView").data("kendoGrid").dataSource.page(1);
			});

			$('#searchBtn3').on('click', function() {
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

				$("#cnctHistListView").data("kendoGrid").dataSource.page(1);
			});
			$('#searchBtn4').on('click', function() {
				var startPickerValue = $("#start-picker04").val();
				var endPickerValue = $("#end-picker04").val();

				if (startPickerValue && endPickerValue) {
					var startDate = new Date(startPickerValue);
					var endDate = new Date(endPickerValue);

					if (startDate > endDate) {
						alert("종료일이 시작일보다 빠릅니다. 올바른 날짜 범위를 선택해주세요.");
						return; // 검색 중지
					}
				}
				$("#loginView").data("kendoGrid").dataSource.page(1);
			});
			$('#historylistViewExcel').on('click', function() {
				$usgStt.event.historylistExcel();
			});
			$('#cnctHistListViewExcel').on('click', function() {
				$usgStt.event.cnctHistExcel();
			});
			$('#usercnctListViewExcel').on('click', function() {
				$usgStt.event.usercnctExcel();
			});
			$('#loginViewExcel').on('click', function() {
				$usgStt.event.loginViewExcel();
			});
			$(".k-master-row .k-grid tbody tr").on("click", function() {
				$(".cmn_detail").addClass("view");
			});

			$(".cmn_detail .cancel_btn").on("click", function() {
				$(".cmn_detail").removeClass("view");
			});
			$(".search_btn").on("click", function() {
				var grid = $('#key_grid').data("kendoGrid");
				grid.dataSource.read();
			});
			$(".cmn_detail .close").on("click", function() {
				$(".cmn_detail").removeClass("view");
			});
			$(document).on("click", "#tabBtn01", function() {
				$("#tabBtn01").addClass("on");
				$("#tabBtn02").removeClass("on");
				$("#tabBtn03").removeClass("on");
				$("#tabBtn04").removeClass("on");

				$("#search_box1").show();
				$("#search_box2").hide();
				$("#search_box3").hide();
				$("#search_box4").hide();

				$("#tabview1").show();
				$("#tabview2").hide();
				$("#tabview3").hide();
				$("#tabview4").hide();
			});

			$(document).on("click", "#tabBtn02", function() {
				$("#tabBtn01").removeClass("on");
				$("#tabBtn02").addClass("on");
				$("#tabBtn03").removeClass("on");
				$("#tabBtn04").removeClass("on");

				$("#search_box1").hide();
				$("#search_box2").show();
				$("#search_box3").hide();
				$("#search_box4").hide();

				$("#tabview1").hide();
				$("#tabview2").show();
				$("#tabview3").hide();
				$("#tabview4").hide();
			});

			$(document).on("click", "#tabBtn03", function() {
				$("#tabBtn01").removeClass("on");
				$("#tabBtn02").removeClass("on");
				$("#tabBtn03").addClass("on");
				$("#tabBtn04").removeClass("on");


				$("#search_box1").hide();
				$("#search_box2").hide();
				$("#search_box3").show();
				$("#search_box4").hide();

				$("#tabview1").hide();
				$("#tabview2").hide();
				$("#tabview4").hide();
				$("#tabview3").show();
			});
			$(document).on("click", "#tabBtn04", function() {
				$("#tabBtn01").removeClass("on");
				$("#tabBtn02").removeClass("on");
				$("#tabBtn03").removeClass("on");
				$("#tabBtn04").addClass("on");

				$("#search_box1").hide();
				$("#search_box2").hide();
				$("#search_box3").hide();
				$("#search_box4").show();

				$("#tabview1").hide();
				$("#tabview2").hide();
				$("#tabview3").hide();
				$("#tabview4").show();
			});
			$("#chkExtWrk").change(function() {
				if ($("#chkExtWrk").is(":checked")) {
					$("#extwrk").val('Y');
				} else {
					$("#extwrk").val('N');
				}
			});
		},
		//		historylistExcel: function() {
		//			var params = {};
		//			params.useId = $("#searchOwn").val();
		//			params.useNm = $("#searchTwo").val();
		//			params.startDt = $("#start-picker01").val();
		//			params.endDt = $("#end-picker01").val();
		//			params.typeCd = $("#search_type_cd").val();
		//			params.inqireCo = $('#inqireCo').val();
		//			params.privateYn = $('#privateYn').val();
		//			params.downLoadYn = $('#search_type_cd6').val();
		//			params.extwrk = $('#extwrk').val();
		//
		//			var filename = "useSttus";
		//
		//
		//			//			excelDownAjax("/usgStt/usgStt/historylistexcelDown", options, filename);
		//			var totalRowCount = $("#grid").data("kendoGrid").dataSource.total();
		//
		//			excelDown("/usgStt/usgStt/historylistexcelDown", params, filename, totalRowCount);
		//
		//
		//		},
		historylistExcel: function() {
			var options = {};
			options.useId = $("#searchOwn").val();
			options.useNm = $("#searchTwo").val();
			options.startDt = $("#start-picker01").val();
			options.endDt = $("#end-picker01").val();
			options.typeCd = $("#search_type_cd").val();
			options.prvcIdntfYn = $("#prvcIdntfYn").val();
			options.menuCd = $("#menuCd").val();
			options.inqNocs = $("#inqNocs").val();
			options.downLoadYn = $("#search_type_cd6").val();
			if ($("#chkExtWrk").is(":checked"))
				options.chkExtWrk = "Y";
			var totalRowCount = $("#grid").data("kendoGrid").dataSource.total();

			var filename = "useSttus";

			//			excelDown("/os/OPSuseSttus/historylistexcelDown", options, filename, totalRowCount);
			excelDown("/usgStt/usgStt/historylistexcelDown", options, filename, totalRowCount);

		},
		cnctHistExcel: function() {
			var params = {};
			params.useId = $("#searchOwn3").val();
			params.search_type_cd3 = $("#search_type_cd3").val();
			params.startDt = $("#start-picker02").val();
			params.endDt = $("#end-picker02").val();
			params.pageSize = $("#cnctHistListView").data("kendoGrid").dataSource.pageSize();
			params.page = $("#cnctHistListView").data("kendoGrid").dataSource.page();
			params._csrf = $('._csrf').val();
			var filename = "siteSttus";
			//			excelDownAjax("/usgStt/usgStt/cnctHistExcelexcelDown", options, filename);
			var totalRowCount = $("#cnctHistListView").data("kendoGrid").dataSource.total();

			excelDown("/usgStt/usgStt/cnctHistExcelexcelDown", params, filename, totalRowCount);



		},
		usercnctExcel: function() {
			var today = new Date();
			var year = today.getFullYear();
			var month = (today.getMonth() + 1).toString().padStart(2, "0");
			var day = today.getDate().toString().padStart(2, "0");
			var params = {};
			params.useId = $("#searchOwn2").val();
			params.search_type_cd2 = $("#search_type_cd2").val();
			params.startDt = $("#start-picker03").val();
			params.endDt = $("#end-picker03").val();
			params.pageSize = $("#usercnctListView").data("kendoGrid").dataSource.pageSize();
			params.page = $("#usercnctListView").data("kendoGrid").dataSource.page();
			params._csrf = $('._csrf').val();
			var filename = "menuSttus";
			//			excelDownAjax("/usgStt/usgStt/usercnctExcel", options, filename);
			var totalRowCount = $("#usercnctListView").data("kendoGrid").dataSource.total();

			excelDown("/usgStt/usgStt/usercnctExcel", params, filename, totalRowCount);


		},
		loginViewExcel: function() {
			var params = {};

			params.useId = $("#searchOwn4").val();
			params.search_type_cd = $("#search_type_cd4").val();
			params.search_type_cd2 = $("#search_type_cd5").val();
			params.startDt = $("#start-picker04").val();
			params.endDt = $("#end-picker04").val();
			params.pageSize = $("#loginView").data("kendoGrid").dataSource.pageSize();
			params.page = $("#loginView").data("kendoGrid").dataSource.page();
			params.pageSize = $("#loginView").data("kendoGrid").dataSource.pageSize();
			params.page = $("#loginView").data("kendoGrid").dataSource.page();
			params._csrf = $('._csrf').val();
			var filename = "loginSttus"
			//			excelDownAjax("/usgStt/usgStt/loginViewExcel", options, filename);

			var totalRowCount = $("#loginView").data("kendoGrid").dataSource.total();

			excelDown("/usgStt/usgStt/loginViewExcel", params, filename, totalRowCount);
		},

	};

}(window, document, jQuery));
