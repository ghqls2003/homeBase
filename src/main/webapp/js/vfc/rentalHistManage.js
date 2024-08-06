(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

    W.$rentalHistManage = W.$rentalHistManage || {};

    $(document).ready(function() {
		kendo.ui.progress($(document.body), true);

		$rentalHistManage.ui.pageLoad();		//최초 페이지 로드 시
		$rentalHistManage.event.setUIEvent();
    });

	var pcColumns = [
		{title: "순번", field: "rn", template: "#: rn #"},
		{title: "대여번호", field: "rentNo", template: "#: rentNo #"},
		{title: "회사명", field: "coNm", template: "#: nvl(coNm, '-') #"},
		{title: "차량번호", field: "vhclRegNo", template: "#: vhclRegNo #"},
		{
		    title: "요청일시",
		    field: "regDt",
		    template: function(dataItem) {
		        var date = new Date(dataItem.regDt);
		        var yyyy = date.getFullYear();
		        var mm = ("0" + (date.getMonth() + 1)).slice(-2);
		        var dd = ("0" + date.getDate()).slice(-2);
		        var hh = ("0" + date.getHours()).slice(-2);
		        var min = ("0" + date.getMinutes()).slice(-2);
		        return yyyy + "-" + mm + "-" + dd + " " + hh + ":" + min;
		    }
		},
		{title: "대여 시작일시", field: "rentBgngDt",template: "#: rentBgngDt #"},
		{title: "대여 종료일시", field: "rentEndDt", template: "#: rentEndDt #"},
		{title: "면허 종류", field: "lcnsIdntfNm", template: "#: lcnsIdntfNm #"},
		{title: "대여상태", field: "rentSttsNm", template: "#: rentSttsNm #"},
		{field: "대여 확인증", exportable: false, template: "<button class='gray_btn' style='width: 70px;height: 30px;' onclick='javascript:$rentalHistManage.event.issued(`#:rentNo#`, `#:rentSttsNm#`);'>발급</button>"}
	];

	var mobiColumns = [
		{title: "순번", field: "rn", width: "60px", template: "#: rn #"},
		{title: "대여번호", field: "rentNo", width: "150px", template: "#: rentNo #"},
		{title: "회사명", field: "coNm", width: "150px", template: "#: nvl(coNm, '-') #"},
		{title: "차량번호", field: "vhclRegNo", width: "120px", template: "#: vhclRegNo #"},
		{title: "대여 시작일시", field: "rentBgngDt", width: "180px", template: "#: rentBgngDt #"},
		{title: "대여 종료일시", field: "rentEndDt", width: "180px", template: "#: rentEndDt #"},
		{title: "면허 종류", field: "lcnsIdntfNm", width: "120px", template: "#: lcnsIdntfNm #"},
		{title: "대여상태", field: "rentSttsNm", width: "80px", template: "#: rentSttsNm #"},
		{field: "대여 확인증", width: "90px", exportable: false, template: "<button class='gray_btn' style='width: 70px;height: 30px;' onclick='javascript:$rentalHistManage.event.issued(`#:rentNo#`, `#:rentSttsNm#`);'>발급</button>"}
	];

	var carListColmuns = [
		{title: "순번", width: "40px", field: "rn", template: "#: rn #"},
		{title: "차량등록번호", width: "130px", field: "vhclRegNo", template: "#: vhclRegNo #"},
		{title: "차대번호", width: "180px", field: "vin", template: "#: vin #"},
		{title: "차종", width: "80px", field: "carmdl", template: "#: carmdl != null ? carmdl : '-'#"},
		{title: "연식", width: "100px", field: "mdlyr", template: "#: mdlyr #"},
		{title: "소유자명", width: "130px", field: "ownrNm", template: "#: ownrNm #"},
		{title: "사용여부", width: "100px", field: "useYn", template: "#: useYn #"},
		{title: "등록일", width: "140px", field: "regDt", template: "#: regDt #"}
	];

	var searchParamsArc = {};

	var optVal = null;  // 차량 검색 조건
	
	// 팝업창 로딩 체크
	var detailCk = 0;

	$rentalHistManage.ui = {
		pageLoad : function() {

			//날짜데이터 세팅
			var nowYear = new Date().getFullYear();
			var nowMonth = new Date().getMonth();
			var nowDate = new Date().getDate();
			var nowHours = new Date().getHours();
			var nowMinutes = new Date().getMinutes();
			if(nowMinutes - 30 > 0){
				nowMinutes = 30;
			}else{
				nowMinutes = 0;
			}

			var oneWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7));

			$("#start-picker01").kendoDatePicker({
				format: "yyyy-MM-dd",
				value: new Date(oneWeekAgo)
			});

            $("#end-picker01").kendoDatePicker({
				format: "yyyy-MM-dd",
				value: new Date(nowYear, nowMonth, nowDate)
			});
			
			$("#rent-picker").kendoDatePicker({
				format: "yyyy-MM-dd",
				value: new Date(nowYear, nowMonth, nowDate)
			});

			var lcnsIdntData = [
				{ cd_nm: "국내 면허", cd: "1" },
				{ cd_nm: "국제 면허", cd: "2" }
			];
			$("#searchLcnsCd").kendoDropDownList({
				optionLabel: "국내, 국제 면허(전체)",
				dataTextField: "cd_nm",
				dataValueField: "cd",
				dataSource: lcnsIdntData,
			});

			var rentSttsData = [
				{ cd_nm: "미확정", cd: "1" },
				{ cd_nm: "대여확정", cd: "2" }
			];
			$("#searchRentSttsCd").kendoDropDownList({
				optionLabel: "대여상태(선택)",
				dataTextField: "cd_nm",
				dataValueField: "cd",
				dataSource: rentSttsData,
			});

			$("#searchRentSttsCd").data("kendoDropDownList").select(2);

			$("#start-picker02").kendoDateTimePicker({
				format: "yyyy-MM-dd HH:mm",
				value: new Date(nowYear, nowMonth, nowDate)
			});

            $("#end-picker02").kendoDateTimePicker({
				format: "yyyy-MM-dd HH:mm",
				value: new Date(nowYear, nowMonth, nowDate, nowHours, nowMinutes)
			});
			
			$('#start-picker02').on('change', function(){
				if(new Date($('#start-picker02').val()) > new Date($('#end-picker02').val())){
					alert("시작일은 종료일보다 늦을 수 없습니다.");
						$('#start-picker02').data("kendoDateTimePicker").value(new Date($('#end-picker02').val()));
				}
			});
			
			$('#end-picker02').on('change', function(){
				if(new Date($('#end-picker02').val()) < new Date($('#start-picker02').val())){
					alert("종료일은 시작일보다 빠를 수 없습니다.");
						$('#end-picker02').data("kendoDateTimePicker").value(new Date($('#start-picker02').val()));
				}
			});

			$("#start-picker03").kendoDateTimePicker({
				format: "yyyy-MM-dd HH:mm",
				value: new Date(2023,5,1)
			});

            $("#end-picker03").kendoDateTimePicker({
				format: "yyyy-MM-dd HH:mm",
				value: new Date(nowYear, nowMonth, nowDate, nowHours, nowMinutes)
			});

			$('#start-picker03').on('change', function(){
				if(new Date($('#start-picker03').val()) > new Date($('#end-picker03').val())){
					alert("시작일은 종료일보다 늦을 수 없습니다.");
						$('#start-picker03').data("kendoDateTimePicker").value(new Date($('#end-picker03').val()));
				}
			});
			
			$('#end-picker03').on('change', function(){
				if(new Date($('#end-picker03').val()) < new Date($('#start-picker03').val())){
					alert("종료일은 시작일보다 빠를 수 없습니다.");
						$('#end-picker03').data("kendoDateTimePicker").value(new Date($('#start-picker03').val()));
				}
			});
			
			

//			$(".regChk").on('change', function(){
//				var regVal = $("input[name='regChk']:checked").val();
//				if(regVal == 'intLic'){
//					$("#licenseView").attr('style', 'display: contents');
//				}else{
//					$("#licenseView").attr('style', 'display: none');
//				}
//			});

			$rentalHistManage.ui.kendoGrid();

			if(authrtCd.startsWith('G')){
				var grid = $("#rentalHistGrid").data("kendoGrid");
				grid.hideColumn("대여 확인증");

				$("#rentUpdateBtn").remove();
				$(".red_btn").remove();
				$("#rentSttsCdUpdateBtn").remove();
				$(".register_btn").remove();
				$("#detailCarBtn").css('pointer-events', 'none');
				var startDatetimepicker = $("#start-picker03").data("kendoDateTimePicker");
				var endDatetimepicker = $("#end-picker03").data("kendoDateTimePicker");
				startDatetimepicker.readonly();
				endDatetimepicker.readonly();
			}

			$(".date").prop("readonly", true);
		},

		kendoGrid : function() {
			$("#rentalHistGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read:{
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath+'/vfc/rentalHistManage/selectRentalHistList',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
						},
						parameterMap: function(options){
							options.startDt = $("#start-picker01").val();
							options.endDt = $("#end-picker01").val();
							options.rentDt = $("#rent-picker").val();
							options.lcnsIdntfCd = $("#searchLcnsCd").val();
							options.vhclRegNo = $("#searchWrd").val();
							options.coNm = $("#searchCoNm").val();
							options.dln = $("#searchDln").val();
							options.rentSttsCd = $("#searchRentSttsCd").val();
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
				columns: userTypeBool ? pcColumns : mobiColumns,
                sortable: {
                    mode: "single",
                    allowUnsort: true
                },
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
				/**
				 * history : 2024/03/27 수정
				 * modifier : 김경룡
				 */
				dataBound: function() {
					var formatTotal = FormatNumber(this.dataSource.total());
					$("#totCnt").text(formatTotal);
					kendo.ui.progress($(document.body), false);
				},
                change: function(e) {
					var rows = e.sender.select();
		            var data;

		            rows.each(function(e) {
		                var grid = $("#rentalHistGrid").data("kendoGrid");
		                var dataItem = grid.dataItem(this);
		                data = dataItem;
		            });

					$rentalHistManage.event.detailInfoPopup(data);
				}
			});
		},

		carGrid : function() {
			var gridId = "#carGrid";
			optVal = $("#carSearchWrd").val();
			$rentalHistManage.ui.carGridModule(gridId);
		},

		detailCarGrid : function(){
			var gridId = "#detailCarGrid";
			optVal = $("#popupSearchWrd").val();
			$rentalHistManage.ui.carGridModule(gridId);
		},

		/**
         *
         * @name         : carGridModule
         * @description  : 차량 그리드 공통
         * @date         : 2024. 01. 04
         * @author       : 김경룡
         */
		carGridModule: function(gridId) {
			$(gridId).kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read:{
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath+'/vfc/rentalHistManage/selectCarList',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
						},
						parameterMap: function(options){
							options.searchWrd = optVal;
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
                change: function(e) {
					var rows = e.sender.select();
					var data = null;

					rows.each(function(e) {
						var grid = $(gridId).data("kendoGrid");
						var item = grid.dataItem(this);
						data = item;
					})

					if(gridId == "#carGrid") {
						$("#carVhclRegNoVal").val(data.vhclRegNo);
			            $("#regRentNo").val(data.rentNo);
			            $("#regRgtrSn").val(data.rgtrSn);
			            $("#regVin").val(data.vin);
			            $("#regCarmdl").val(data.carmdl);
			            $("#regVhclNm").val(data.vhclNm);
			            $("#regBzmnSn").val(data.bzmnSn);
			            $("#regCrno").val(data.crno);
			            $("#regEngineType").val(data.engineFom);
			            $("#regModelYear").val(data.mdlyr);
					} else {
						$("#detailVhclRegNo").val(data.vhclRegNo);
			            $("#detailRgtrSn").val(data.rgtrSn);
			            $("#detailVin").val(data.vin);
			            $("#detailCarmdl").val(data.carmdl);
			            $("#detailVhclNm").val(data.vhclNm);
			            $("#detailBzmnSn").val(data.bzmnSn);
			            $("#detailCrno").val(data.crno);
			            $("#detailEngineType").val(data.engineFom);
			            $("#detailModelYear").val(data.mdlyr);
					}
				}
			});
		}
	};

    //이벤트 정의
   $rentalHistManage.event = {
        setUIEvent : function() {

			/**
	         *
	         * @description  : 차량조회 창 닫기 시, 그리드 초기화
	         * @date         : 2024. 01. 04
	         * @author       : 김경룡
	         */
			$(".carClose").on("click", function() {
				$("#carTa").empty();
				if($("#carTa")[0].children.length == 0) {
					$("#carSearchWrd").val('');
					$("#carTa").append("<table id='carGrid'><caption>자동차리스트</caption></table>");
				}

			});
			$(".dt_carClose").on("click", function() {
				$("#dt_carTa").empty();
				if($("#dt_carTa")[0].children.length == 0) {
					$("#popupSearchWrd").val('');
					$("#dt_carTa").append("<table id='detailCarGrid'><caption>자동차리스트</caption></table>");
				}

			});

			$("#searchBtn").on("click",function(){
				// 엑셀 다운로드용 파라미터
				searchParamsArc.startDt = $("#start-picker01").val();
				searchParamsArc.endDt = $("#end-picker01").val();
				searchParamsArc.rentDt = $("#rent-picker").val();
				searchParamsArc.vhclRegNo = $("#searchWrd").val();
				searchParamsArc.coNm = $("#searchCoNm").val();
				searchParamsArc.lcnsIdntfCd = $("#searchLcnsCd").val();
				searchParamsArc.rentSttsCd = $("#searchRentSttsCd").val();
				searchParamsArc.elxExcelDownReason = $('#elxExcelDownReason').val();
				searchParamsArc._csrf = $('._csrf').val();

				var start = new Date($("#start-picker01").val());
				var end = new Date($("#end-picker01").val());
				if(end > new Date(new Date(start).setDate(start.getDate() + 7))){
					alert("일주일 이상으로 선택할 수 없습니다.");
					$('#start-picker01').data("kendoDatePicker").value(new Date(new Date(end).setDate(end.getDate() - 7)));
					return;
				}
				
				if(new Date($('#start-picker01').val()) > new Date($('#end-picker01').val())){
					alert("시작일은 종료일보다 늦을 수 없습니다.");
//					$('#end-picker01').data("kendoDatePicker").value(new Date($('#start-picker01').val()));
					return;
				}

				$rentalHistManage.event.search();
			});

			$(".register_btn").on("click",function(){
				$rentalHistManage.event.regiPopup();
			});

			$(".excelDownBtn").on("click", function() {
            	$rentalHistManage.event.excelDownBtn();
        	});

        	$("#carBtn").on("click", function() {
            	$rentalHistManage.event.carGridPopup();
        	});

        	$("#detailCarBtn").on("click", function() {
            	$rentalHistManage.event.detailCarGridPopup();
        	});

        	$("#carVhclRegNoVal").on("click", function() {
            	$rentalHistManage.event.carNoval();
        	});

        	$("#rentRegInsertBtn").on("click", function() {
            	$rentalHistManage.event.insertRentReg();
        	});

        	$("#rentUpdateBtn").on("click", function() {
            	$rentalHistManage.event.rentUpdateBtn();
        	});

        	$("#popupSsearchBtn").on("click", function() {
            	// 대여이력상세 차량찾기
            	$rentalHistManage.event.detailCarSearch();
        	});

        	$(".detailPopupClose").on("click", function() {
            	$rentalHistManage.event.detailDeleteBtn();
        	});

        	$(".regPopupClose").on("click", function() {
            	$rentalHistManage.event.regPopupClose();
        	});

        	$("#carPopupSearchBtn").on("click", function() {
            	$rentalHistManage.event.carPopupSearch();
        	});

        	$("#internationalLicenseBtn").on("click", function() {
				$("#files").click();
				$rentalHistManage.event.InternationalLicenseBtnClickHandler()
        	});

        	$(".confPrintAndInsert").on("click", function() {
            	$rentalHistManage.event.confInsert();
        	});

        	$("#searchWrd").on('keydown', function(e) {
				if (e.key === 'Enter') {
					$rentalHistManage.event.search();
				}
        	});

        	$("#closeException").on("click", function() {
				$("#detailCarPopup").removeClass("view");
        	});

        	$(".red_btn").on("click", function() {
				$rentalHistManage.event.updateDeleteYn();
        	});

			$(".sm_popup .cancel_btn").on("click",function(){
				$(".sm_popup").removeClass("view");
			});

			$(".sm_popup .close").on("click",function(){
				$(".sm_popup").removeClass("view");
			});
			
			$("#regChk02").on("click", function() {
				$("#globalLicense").addClass("view");
			});

        },
        search: function() {
			var grid = $('#rentalHistGrid').data('kendoGrid');
			grid.dataSource.page(1);
        },
        carPopupSearch: function(){
			optVal = $("#carSearchWrd").val();
			var grid = $('#carGrid').data('kendoGrid');
			grid.dataSource.page(1);
		},
		detailCarSearch: function(){
			optVal = $("#popupSearchWrd").val();
			var grid = $("#detailCarGrid").data('kendoGrid');
            grid.dataSource.page(1);
		},

        regiPopup : function() {
			$("#regi").addClass("view");
			$("#regChk01").prop("checked", true);
//			$("#licenseView").attr('style', 'display: none');
			$("#files").val('');
			$(".filetype").val('');

        },

        excelDownBtn: function() {
			var totalRowCount = $("#rentalHistGrid").data("kendoGrid").dataSource.total();
			if(totalRowCount == 0) {
				alert("데이터가 존재하지 않습니다.");
			} else {
				if(Object.keys(searchParamsArc).length === 0) {
					searchParamsArc.startDt = $("#start-picker01").val();
					searchParamsArc.endDt = $("#end-picker01").val();
					searchParamsArc.rentDt = $("#rent-picker").val();
					searchParamsArc.vhclRegNo = $("#searchWrd").val();
					searchParamsArc.coNm = $("#searchCoNm").val();
					searchParamsArc.lcnsIdntfCd = $("#searchLcnsCd").val();
					searchParamsArc.rentSttsCd = $("#searchRentSttsCd").val();
				}
				excelDown("/vfc/rentalHistManage/excelDown", searchParamsArc, "rentalHistManage", totalRowCount);
			}
        },
		carGridPopup : function() {
			$rentalHistManage.ui.carGrid();
			$("#carPopup").addClass("view");
        },
        detailCarGridPopup : function() {
			$rentalHistManage.ui.detailCarGrid();
			$("#detailCarPopup").addClass("view");
//			$("#popupSearchWrd").val("");
//			$rentalHistManage.event.detailCarSearch();
        },
        carNoval : function(){
			var carRegNoVal = $("#carVhclRegNoVal").val();
			$("#regVhclRegNo").val(carRegNoVal);
		},
		insertRentReg: function(){
			var params ={};
			var regVal = $("input[name='regChk']:checked").val();
			var formData = new FormData();
			var filedata = document.getElementById('files').files[0]
			formData.append('files', filedata);
			params.vhclRegNo = $("#regVhclRegNo").val();
			params.rentNo = $("#regRentNo").val();
			params.rgtrSn = $("#regRgtrSn").val();
			params.vin = $("#regVin").val();
			params.carmdl = $("#regCarmdl").val();
			params.vhclNm = $("#regVhclNm").val();
			params.bzmnSn = $("#regBzmnSn").val();
			params.crno = $("#regCrno").val();

			params.engineType = $("#regEngineType").val();
			params.rentBgngDt = $("#start-picker02").val();
			params.rentEndDt = $("#end-picker02").val();

			if(params.vhclRegNo == null || params.vhclRegNo == ''){
				alert("차량번호를 등록해 주세요");
			}else if(params.rentBgngDt == null || params.rentBgngDt == ''){
				alert("대여시작일시를 등록해 주세요");
			}else if(params.rentEndDt == null || params.rentEndDt == ''){
				alert("대여종료일시를 등록해 주세요");
			}else if(filedata == null){
			 	alert("면허증 사본을 등록해 주세요");
			}else{
				encryptFileAjax(contextPath + "/cmmn/encryptFileUpload", formData, function (response) {
					if (response != null) {
						params.atchFileSn = response.fileSn;
						if(regVal == 'intLic')
							params.lcnsIdntfCd = "2";	// 국제 면허
						else
							params.lcnsIdntfCd = "1"; // 국내 면허

						ajax(true, contextPath + '/vfc/rentalHistManage/insertRentReg.do', 'body', '확인인중입니다.', params, function (data) {
							alert("대여이력에 등록을 성공하셨습니다");
							$("#regi").removeClass("view");
					        $('#rentalHistGrid').data('kendoGrid').dataSource.page(1);
					    });
					}
				});
			}
		},
		
		detailInfoPopup: function(param){
			$("#detailInfoPopup").addClass("view");
			kendo.ui.progress($("#detailContent"), true);
			detailCk = 0;
			
			var params = {}
			var setParamTime = param.regDt; 
			var setParamTimeMdf = param.mdfcnDt; 
			var date = new Date(setParamTime); // 전체 밀리초를 날짜로 변환(등록일)
			var date2 = new Date(setParamTimeMdf); // 전체 밀리초를 날짜로 변환(수정일)
			var regDt = date.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD 형식으로 변환
			var mdfcnDt = date2.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD 형식으로 변환
			params.rentNo = param.rentNo;
			params.vrfcHstrySn = param.vrfcHstrySn;
			if(setParamTimeMdf == null){
				params.DateMaker = regDt;
			}else{
				params.DateMaker = mdfcnDt;
			}

			/**
			 * @name : 대여이력 상세
			 * @history : 2024/04/04 수정
			 * @description : 데이터 분리 성능개선 건
			 * @modifier : 김경룡
			 */
			ajax(true, contextPath + '/vfc/rentalHistManage/selectDetailRentInfo', 'body', '확인중입니다.', params, function (data) {
				$("#detailFileDown").off('click');  //기존 클릭이벤트 핸들러 제거
				
//				$("#verfDln").val('');
//				$("#verfDmnd").val('');
//				$("#verfMthd").val('');
//				$("#verfRslt").val('');

				$("#detailRentNo").val(data[0].rentNo);
				$("#detailLcnsIdntfNm").val(data[0].lcnsIdntfNm);
				$("#detailVhclRegNo").val(data[0].vhclRegNo);
				$("#detailRentSttsNm").val(data[0].rentSttsNm);
				$("#detailRentHstryNo").val(data[0].rentHstryNo);
				$("#delYnVal").val(data[0].delYn);
				
				//Z관리자, G지자체, K공단 만 삭제여부 컬럼 노출
				if (authrtCd.includes("Z") || authrtCd.includes("G") || authrtCd.includes("K")) {
					$("#delYn").attr('style', 'display: contents');
				}

				//국제 면허의 경우 첨부된 면허증 사본(다운로드) 필드 노출 여부
				$("#detailFileDown").val(data[0].atchFileNm);
				//파일이 존재하는 경우
				if(data[0].atchFileSn && data[0].atchFileNm !== '-'){
					$("#detailFileDown").css("cursor", "pointer").hover(function () {
						$(this).css("color", "#364BC6");
					}, function() {
						$(this).css("color", "");
					});
					$("#detailFileDown").click(function(){
						decryptFileDownload(data[0].atchFileSn, data[0].atchFileNm);
					});
				//파일이 없는 경우
				} else{
					$("#detailFileDown").off('mouseenter mouseleave');
					$("#detailFileDown").css("cursor", "default");
				}

				$("#start-picker03").data("kendoDateTimePicker").value(data[0].rentBgngDt);
				$("#end-picker03").data("kendoDateTimePicker").value(data[0].rentEndDt);
				// 권한처리 필요한지 여부 물어보고 필요한 내용 추가
				if(data[0].rentSttsNm == '대여확정'){
					$("#rentSttsCdUpdateBtn").remove();
					$("#rentSttsCdConfUpdateBtn").remove();

					var a = data[0].rentNo.toString();
					$("#btn_bottom button:eq(1)")
						.after(`<button id="rentSttsCdUpdateBtn" class='gray_btn cancel_btn' style="margin-right: 10px"
							value = '${a}' onclick=$rentalHistManage.event.rentSttsCdUpdateBtn();> 대여취소</button>`);
				} else if(data[0].rentSttsNm == '미확정'){
					$("#rentSttsCdUpdateBtn").remove();
					$("#rentSttsCdConfUpdateBtn").remove();

					var a = data[0].rentNo.toString();
					$("#btn_bottom button:eq(1)")
						.after(`<button id="rentSttsCdConfUpdateBtn" class='gray_btn cancel_btn' style="margin-right: 10px"
							value = '${a}' onclick=$rentalHistManage.event.rentSttsCdConfUpdateBtn();>대여확정</button>`);
				}
				
				detailCk++;
			});
			
			/**
			 * @name : 자격확인정보
			 * @history : 2024/04/04 추가
			 * @description : 데이터 분리 성능개선 건
			 * @modifier : 김경룡
			 */			
			ajax(true, contextPath + '/vfc/rentalHistManage/selectDetailVerfInfo', 'body', '확인중입니다.', params, function (data) {
				if(data.length != 0) {
					
					$("#verfDln").val(data[0].dln);
					var dmndDate = new Date(data[0].vrfcDmndDt2);
					var dmndYear = dmndDate.getFullYear();
					var dmndMonth = (dmndDate.getMonth()+1) > 9 ? (dmndDate.getMonth()+1) : "0"+(dmndDate.getMonth()+1);
					var dmndDay = dmndDate.getDate() > 9 ? dmndDate.getDate() : "0"+dmndDate.getDate();
					var dmndHour = dmndDate.getHours() > 9 ? dmndDate.getHours() : "0"+dmndDate.getHours();
					var dmndMin = dmndDate.getMinutes() > 9 ? dmndDate.getMinutes() : "0"+dmndDate.getMinutes();
					var dmndSec = dmndDate.getSeconds() > 9 ? dmndDate.getSeconds() : "0"+dmndDate.getSeconds();
					$("#verfDmnd").val(dmndYear+"-"+dmndMonth+"-"+dmndDay+" "+dmndHour+":"+dmndMin+":"+dmndSec);
					$("#verfMthd").val(data[0].vrfcMthd);
					$("#verfRslt").val(data[0].vrfcRslt);
				} else {
					$("#verfDln").val('-'); $("#verfDmnd").val('-'); $("#verfMthd").val('-'); $("#verfRslt").val('-');
				}
				
				detailCk++;
			});

			//대여정보이력
			$rentalHistManage.event.hsDetailRent(params);
			
			var ckInterval = setInterval(function() {
				if(detailCk >= 3) {
					kendo.ui.progress($("#detailContent"), false);
					clearInterval(ckInterval);
				}
			});
			
		},
		// 대여정보이력 수정 후, 갱신을 위해 따로 뺌 - 김경룡
		hsDetailRent: function(params) {
			ajax(true, contextPath + '/vfc/rentalHistManage/selectHisDetailRentInfo', 'body', '처리중입니다.', params, function(data) {
				var total = data.total;
				var data = data.data;

				var html = '';

				for(var i=0; i<data.length; i++) {

					html += '<div class="detail_popup top_info">';
					html += '	<div style="color: #000">';
					html += '       <span>수정</span>';
					html += '       <span id="" style="margin-left: 5px; color: red">'+nvl(total,' ')+'</span>';
					html += '	</div>';
					html += '	<div>';
					html += '       <span class="mdfcnDate">수정일시</span>';
					html += '       <span id="" style="margin-left: 5px; color: red">'+nvl(data[i].regDt,' ')+'</span>';
					html += '	</div>';
					html += '	<div>';
					html += '       <span class="mdfcnName">수정자명</span>';
					html += '       <span id="" style="margin-left: 5px; color: blue;">'+nvl(data[i].userNm,' ')+'</span>';
					html += '	</div>';
					html += '</div>';

					html += '<div class="contBox">';
					html += '   <div class="nameBox nameBox-flex">';
					html += '       <h4 class="name">대여이력 상세</h4>';
					html += '   </div>';
					html += '	<div class="cont cont-flex">';
					html += '		<table class="tb rental_tb01">';
					html += '			<tr>';
					html += '				<th scope="col">대여번호</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="detailRentNo">대여번호</label>';
					html += '						<input type="text" id="" name="detailRentNo" class="input no_line" value="'+nvl(data[i].rentNo,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">면허종류</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="detailLcnsIdntfNm">면허종류</label>';
					html += '						<input type="text" id="" name="detailLcnsIdntfNm" class="input no_line" value="'+nvl(data[i].lcnsIdntfNm,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">대여시작일</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="start-picker03">시작기간</label>';
					html += '						<input type="text" id="" name="" class="input no_line" value="'+nvl(data[i].rentBgngDt,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					/*html += '			<tr id="" style="display: none;">';
					html += '				<th scope="col">삭제여부</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="delYnVal">삭제여부</label>';
					html += '						<input type="text" id="" name="delYnVal" class="input no_line" value="'+nvl(data[i].delYn,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';*/
					html += '		</table>';
					html += '		<table class="tb rental_tb01">';
					html += '			<tr>';
					html += '				<th scope="col">차량번호</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="detailVhclRegNo">차량번호</label>';
					html += '						<input type="text" id="" name="" class="input no_line" value="'+nvl(data[i].vhclRegNo,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">대여 상태</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="detailRentSttsNm">대여 상태</label>';
					html += '						<input type="text" id="" name="detailRentSttsNm" class="input no_line" value="'+nvl(data[i].rentSttsNm,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">대여종료일</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="end-picker03">종료기간</label>';
					html += '						<input type="text" id="" name="" class="input no_line" value="'+nvl(data[i].rentEndDt,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';

					//국제 면허의 경우 첨부된 면허증 사본(다운로드) 필드 노출 여부
					if(data[i].lcnsIdntfCd === '2'){
						//파일이 존재하는 경우
						if(data[i].atchFileSn && data[i].atchFileNm !== '-'){
							html += '			<tr>';
							html += '				<th scope="col">국제 면허증 파일</th>';
							html += '				<td>';
							html += '					<div class="tb_flex">';
							html += '						<label for="detailFileDown">파일 다운로드</label>';
							html += '						<input type="text" id="" name="detailFileDown" class="input no_line" value="'+nvl(data[i].atchFileNm,' ')+'" >';
							html += '					</div>';
							html += '				</td>';
							html += '			</tr>';
						} else{

						}
					} else {

					}
					html += '		</table>';
					html += '	</div>';
					html += '</div>';

					total -= 1;
				}

				$('#rentalHistDetailGrid').html(html);
				
				detailCk++;
			});
		},
		rentUpdateBtn: function(){
			if(confirm("수정하시겠습니까?")){

				var params = {};

				params.rentBgngDt = $("#start-picker03").val();
				params.rentEndDt = $("#end-picker03").val();
				params.rentNo = $("#detailRentNo").val();
				params.vhclRegNo = $("#detailVhclRegNo").val();

				params.rentHstryNo = $("#detailRentHstryNo").val();

				params.vin = $("#detailVin").val();
				params.rgtrSn = $("#detailRgtrSn").val();
				params.carmdl = $("#detailCarmdl").val();
				params.vhclNm = $("#detailVhclNm").val();
				params.bzmnSn = $("#detailBzmnSn").val();
				params.engineType = $("#detailEngineType").val();
				params.modelYear = $("#detailModelYear").val();

				params.rentSttsCd = '';

				ajax(true, contextPath + '/vfc/rentalHistManage/updateRentInfo', 'body', '확인인중입니다.', params, function (data) {
					alert("대여이력이 수정되었습니다.")
					$rentalHistManage.event.detailDeleteBtn();
					// 대여이력 갱신
					$rentalHistManage.event.hsDetailRent(params);
				});
			}
		},
		rentSttsCdUpdateBtn: function(){
			if(confirm("대여를 취소하시겠습니까?")){
				var params = {};
				params.rentNo = $("#detailRentNo").val();
				params.rentBgngDt = $("#start-picker03").val();
				params.rentEndDt = $("#end-picker03").val();
				params.rentSttsCd = 'cancel';

				ajax(true, contextPath + '/vfc/rentalHistManage/updateRentInfo', 'body', '확인인중입니다.', params, function (data) {
					alert("대여를 취소하였습니다.");
					$("#rentSttsCdUpdateBtn").remove();
					$rentalHistManage.event.detailInfoPopup(params);
				});
			}
		},
		rentSttsCdConfUpdateBtn: function(){
			if(confirm("대여를 확정하시겠습니까?")){
				var params = {};
				params.rentNo = $("#detailRentNo").val();
				params.rentSttsCd = 'confirmed';
				ajax(true, contextPath + '/vfc/rentalHistManage/updateRentInfo', 'body', '확인인중입니다.', params, function (data) {
					alert("대여를 확정하였습니다.");
					$("#rentSttsCdConfUpdateBtn").remove();
					$rentalHistManage.event.detailInfoPopup(params);
				});
			}
		},
		detailDeleteBtn: function(){
			$("#rentSttsCdUpdateBtn").remove();
			$("#rentSttsCdConfUpdateBtn").remove();
			$('#rentalHistGrid').data('kendoGrid').dataSource.read();
		},
		regPopupClose : function(){

			var nowYear = new Date().getFullYear();
			var nowMonth = new Date().getMonth();
			var nowDate = new Date().getDate();
			var nowHours = new Date().getHours();
			var nowMinutes = new Date().getMinutes();
			if(nowMinutes - 30 > 0){
				nowMinutes = 30;
			}else{
				nowMinutes = 0;
			}
			$("#regVhclRegNo").val('');
			$("#regRentNo").val('');
			$("#regRgtrSn").val('');
			$('#start-picker02').data("kendoDateTimePicker").value(new Date(2023,5,1));
			$('#end-picker02').data("kendoDateTimePicker").value(new Date(nowYear, nowMonth, nowDate, nowHours, nowMinutes));
			$('#rentalHistGrid').data('kendoGrid').dataSource.read();
		},
		issued: function(rentNo, rentSttsNm){
			var params = {}

			params.rentNo = rentNo;

			if (rentNo == null || rentNo == '')
				alert('대여번호가 없어 확인증을 발급할 수 없습니다.');
			else if (rentSttsNm == "미확정")
				alert('대여 확정 후 확인증을 발급할 수 있습니다.');
			else {
				popupReport(contextPath + '/vfc/rentalReport', params);
				$rentalHistManage.event.confInsert(params);
			}

			/*ajax(true, contextPath + '/vfc/rentalHistManage/selectIssuedData', 'body', '확인인중입니다.', params, function (data) {

				var confData = data[0]
				$("#confInfoPopup").addClass("view");

				$("#confAtchFileSn").val(confData.atchFileSn);
				$("#confRentNo").val(confData.rentNo);
				$("#confRentHstryNo").val(confData.rentHstryNo);

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
		confInsert: function(params){
			ajax(true, contextPath + '/vfc/rentalHistManage/insertConfData', 'body', '확인인중입니다.', params, function (data) {
//				alert("대여확인증이 발급되었습니다.");
			});
		},
		InternationalLicenseBtnClickHandler : function() {

			$(".filetype").val('');

			/* 엑셀 클라이언트 파싱 처리 */
			$("#files").on("change", function(e) {

				var ext = $("#files").val().split(".").pop().toLowerCase();

				if(ext.length > 0) {
					if($.inArray(ext, ["jpg","jpeg","png","pdf",]) == -1) {
						alert("첨부파일 형식을 다시 확인해주세요.\n첨부가능 확장자 : jpg, jpeg, png, pdf");

						$("#files").val("");
						$(".filetype").val("");
						return false;
					}
				}

				var file = $(this).prop("files")[0];
				var fileName = file.name;
				$('.filetype').val(fileName);

			});
		},
		updateDeleteYn : function(){
			if(confirm("삭제하시겠습니까?")){

				var params = {};

				params.rentNo = $("#detailRentNo").val();

				ajax(true, contextPath + '/vfc/rentalHistManage/updateDeleteYn', 'body', '확인인중입니다.', params, function (data) {
					alert("대여이력이 삭제되었습니다.");
				});
			}
		}

    };

}(window, document, jQuery));