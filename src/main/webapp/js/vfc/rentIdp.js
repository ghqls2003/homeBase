(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

    W.$rentIdp = W.$rentIdp || {};

	var carListColmuns = [
		{ title: "순번", width: "40px", field: "rn", template: "#: rn #" },
		{ title: "차량등록번호", width: "130px", field: "vhclRegNo", template: "#: vhclRegNo #" },
		{ title: "차대번호", width: "180px", field: "vin", template: "#: vin #" },
		{ title: "차종", width: "80px", field: "carmdl", template: "#: carmdl != null ? carmdl : '-'#" },
		{ title: "연식", width: "100px", field: "mdlyr", template: "#: mdlyr #" },
		{ title: "소유자명", width: "130px", field: "ownrNm", template: "#: ownrNm #" },
		{ title: "사용여부", width: "100px", field: "useYn", template: "#: useYn #" },
		{ title: "등록일", width: "140px", field: "regDt", template: "#: regDt #" }
	];

	var searchParamsArc = {};
	
	var optVal = null;  // 차량 검색 조건
	
	var boundTotal = null;  // 엑셀다운로드 시 로직 안돌도록 빠르게.
	
		
	// 팝업창 로딩 체크
	var detailCk = 0;
	
	var sq = '1';
	
	
    $(document).ready(function() {
		$rentIdp.ui.pageLoad();		//최초 페이지 로드 시
		$rentIdp.event.setUIEvent();
		
		$(".excelDownBtn").attr("disabled", true);
		$("#searchBtn").attr("disabled", true);
		$("#searchBtn").trigger("click");
    });


	$rentIdp.ui = {
		pageLoad: function() {
			
			//날짜데이터 세팅
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
			
			var oneWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7));
			
			$("#start-picker01").kendoDatePicker({
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				value: new Date(oneWeekAgo)
			});

			$("#start-picker01").attr("readonly", true);

			$("#end-picker01").kendoDatePicker({
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				value: new Date(nowYear, nowMonth, nowDate)
			});

			$("#end-picker01").attr("readonly", true);

			$("#rent-picker").kendoDatePicker({
				format: "yyyy-MM-dd",
				parseFormats: ["yyyy-MM-dd"],
				value: new Date(nowYear, nowMonth, nowDate),
				 
			});
			var datepickerButton = $("#rent-picker").data("kendoDatePicker").wrapper.find("button");
			datepickerButton.attr("id", "rentIdprentPicker");
			datepickerButton.addClass("rentIdprentPicker");
			
			$("#rent-picker").attr("readonly", true);
			
			$("#start-picker02").kendoDateTimePicker({
				format: "yyyy-MM-dd HH:mm",
				value: new Date(nowYear, nowMonth, nowDate)
			});

			$("#end-picker02").kendoDateTimePicker({
				format: "yyyy-MM-dd HH:mm",
				value: new Date(nowYear, nowMonth, nowDate, nowHours, nowMinutes)
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
			
			$("#start-picker03").kendoDateTimePicker({
				format: "yyyy-MM-dd HH:mm",
				value: new Date(2023, 5, 1)
			});
			
			$("#end-picker03").kendoDateTimePicker({
				format: "yyyy-MM-dd HH:mm",
				value: new Date(nowYear, nowMonth, nowDate, nowHours, nowMinutes)
			});
			
			$rentIdp.event.setData();
			$rentIdp.ui.rentIdpGrid();
			
			if (authrtCd.startsWith('G')) {
				var grid = $("#rentIdpGrid").data("kendoGrid");
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
		
		rentIdpGrid : function(){
			$("#rentIdpGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/vfc/rentIdp/selectRentIdpList',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
						},
						parameterMap: function(options) {
							options.startDt	= searchParamsArc.startDt;
							options.endDt	= searchParamsArc.endDt;
//							options.rentDt = searchParamsArc.rentBgngDt;
//							options.rentDt = searchParamsArc.rentEndDt;
							options.rentDt = searchParamsArc.rentDt;
							options.lcnsIdntfCd = searchParamsArc.lcnsIdntfCd;
							//options.rentSttsCd = searchParamsArc.rentSttsCd;
							options.vhclRegNo = searchParamsArc.vhclRegNo;
							options.coNm = searchParamsArc.coNm;
							//options.dln = searchParamsArc.dln;
							//options.selectQuery = sq;
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
						{title: "순번", field: "rn", template: "#: rn #", width : "50px"},
						{title: "대여번호", field: "rentNo", template: "#: rentNo #", width : "100px"},
						{title: "회사명", field: "coNm", template: "#: nvl(coNm, '-') #", width : "100px"},
						{title: "차량번호", field: "vhclRegNo", template: "#: vhclRegNo #", width : "100px"},
						{title: "요청일시", field: "regDt", template:  "#: $rentIdp.event.dateFomat(regDt) #", width : "100px"},
						{title: "대여 시작일시", field: "rentBgngDt",template: "#: $rentIdp.event.dateFomat(rentBgngDt) #", width : "100px"},
						{title: "대여 종료일시", field: "rentEndDt", template: "#: $rentIdp.event.dateFomat(rentEndDt) #", width : "100px"},
						//{title: "면허 종류", field: "lcnsIdntfCd", template: "#: lcnsIdntfCd #"},
						{title: "대여상태", field: "rentSttsNm", template: "#: rentSttsNm #", width : "100px"},
						{field: "대여 확인증", exportable: false, width : "100px", template: "<button class='gray_btn' style='width: 70px;height: 30px;' onclick='javascript:$rentIdp.event.issued(`#:rentNo#`, `#:rentSttsNm#`);'>발급</button>" }
				],
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
				dataBound: function() {
					boundTotal = this.dataSource.total();
					var formatTotal = FormatNumber(this.dataSource.total());
					$("#totCnt").text(formatTotal);
					kendo.ui.progress($(document.body), false);
					$(".excelDownBtn").attr("disabled", false);
					$("#searchBtn").attr("disabled", false);
				},
				excel: { allPages: true },
				excelExport: function(e) {
					e.workbook.fileName = "국제면허 대여이력([" + searchParamsArc.rentDt + "]포함).xlsx";
					e.workbook.sheets[0].title = searchParamsArc.rentDt + " 포함";
				},
				change: function(e) {
					var rows = e.sender.select();
					var data;

					rows.each(function(e) {
						var grid = $("#rentIdpGrid").data("kendoGrid");
						var dataItem = grid.dataItem(this);
						data = dataItem;
					});

					$rentIdp.event.detailInfoPopup(data);
				},
			});
		},
		
		detailCarGrid: function() {
			var gridId = "#detailCarGrid";
			optVal = $("#popupSearchWrd").val();
			$rentIdp.ui.carGridModule(gridId);
		},
		
		carGrid: function() {
			var gridId = "#carGrid";
			optVal = $("#carSearchWrd").val();
			$rentIdp.ui.carGridModule(gridId);
		},
		
		carGridModule: function(gridId) {
			$(gridId).kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/vfc/rentIdp/selectCarList',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
						},
						parameterMap: function(options) {
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

					if (gridId == "#carGrid") {
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
   $rentIdp.event = {
	   setUIEvent: function() {
		
		   $(".carClose").on("click", function() {
			   $("#carTa").empty();
			   if ($("#carTa")[0].children.length == 0) {
				   $("#carSearchWrd").val('');
				   $("#carTa").append("<table id='carGrid'><caption>자동차리스트</caption></table>");
			   }

		   });
		   $(".dt_carClose").on("click", function() {
			   $("#dt_carTa").empty();
			   if ($("#dt_carTa")[0].children.length == 0) {
				   $("#popupSearchWrd").val('');
				   $("#dt_carTa").append("<table id='detailCarGrid'><caption>자동차리스트</caption></table>");
			   }

		   });
		   $("#rentUpdateBtn").on("click", function() {
			   $rentIdp.event.rentUpdateBtn();
		   });

        	$("#carBtn").on("click", function() {
            	$rentIdp.event.carGridPopup();
        	});

        	$("#detailCarBtn").on("click", function() {
            	$rentIdp.event.detailCarGridPopup();
        	});

        	$("#closeException").on("click", function() {
				$("#detailCarPopup").removeClass("view");
        	});

        	$("#popupSearchBtn").on("click", function() {
            	// 대여이력상세 차량찾기
            	$rentIdp.event.detailCarSearch();
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
			
		   $(".detailPopupClose").on("click", function() {
			   $rentIdp.event.detailDeleteBtn();
		   });

        	$(".red_btn").on("click", function() {
				$rentIdp.event.updateDeleteYn();
        	});

			$(".register_btn").on("click",function(){
				$rentIdp.event.regiPopup();
			});
			
		   $("#rentRegInsertBtn").on("click", function() {
			   $rentIdp.event.insertRentReg();
		   });

		   $("#carVhclRegNoVal").on("click", function() {
			   $rentIdp.event.carNoval();
		   });

		   $("#carPopupSearchBtn").on("click", function() {
			   $rentIdp.event.carPopupSearch();
		   });

		   $("#internationalLicenseBtn").on("click", function() {
			   $("#files").click();
			   $rentIdp.event.InternationalLicenseBtnClickHandler()
		   });

		   $(".regPopupClose").on("click", function() {
			   $rentIdp.event.regPopupClose();
		   });

		   $("#searchBtn").on("click", function() {
			   // 엑셀 다운로드 및 데이터 유지용 파라미터
				var searchRenDt = $("#rent-picker").val()
			   searchParamsArc.rentDt = searchRenDt.replace(/-/g, "");
			   searchParamsArc.vhclRegNo = $("#searchWrd").val();
			   searchParamsArc.coNm = $("#searchCoNm").val();
			   
			   searchParamsArc.rentSttsCd = $("#searchRentSttsCd").val();

			   $(".excelDownBtn").attr("disabled", true);
			   $("#searchBtn").attr("disabled", true);

			   $("#rentIdpGrid").data("kendoGrid").dataSource.page(1);
		   });

	   },
        setData: function() {
			searchParamsArc = {};
			searchParamsArc.startDt = $("#start-picker01").val();
			searchParamsArc.endDt = $("#end-picker01").val();
			searchParamsArc.rentDt = $("#rent-picker").val();
			searchParamsArc.vhclRegNo = $("#searchWrd").val();
			searchParamsArc.coNm = $("#searchCoNm").val();
			searchParamsArc.lcnsIdntfCd = $("#searchLcnsCd").val();
			searchParamsArc.rentSttsCd = $("#searchRentSttsCd").val();
		},

	   carPopupSearch: function() {
		   optVal = $("#carSearchWrd").val();
		   var grid = $('#carGrid').data('kendoGrid');
		   grid.dataSource.page(1);
	   },
	   detailCarSearch: function() {
		   optVal = $("#popupSearchWrd").val();
		   var grid = $("#detailCarGrid").data('kendoGrid');
		   grid.dataSource.page(1);
	   },

	   dateFomat: function(data) {
		   var date = new Date(data);

		   var year = date.getFullYear();
		   var month = String(date.getMonth() + 1).padStart(2, '0');
		   var day = String(date.getDate()).padStart(2, '0');

		   return year + '-' + month + '-' + day
	   },

	   issued: function(rentNo, rentSttsNm) {

		   var params = {}

		   params.rentNo = rentNo;

		   if (rentNo == null || rentNo == '')
			   alert('대여번호가 없어 확인증을 발급할 수 없습니다.');
		   else if (rentSttsNm == "미확정")
			   alert('대여 확정 후 확인증을 발급할 수 있습니다.');
		   else {
			   popupReport(contextPath + '/vfc/rentIdpReport', params);
			   $rentIdp.event.confInsert(params);
		   }
	   },

	   detailInfoPopup: function(param) {
			$("#detailInfoPopup").addClass("view");
			detailCk = 0;
			
			var params = {}
			var setParamTime = param.regDt ||  new Date(); 
			var setParamTimeMdf = param.mdfcnDt || null; 
			var date = new Date(setParamTime); // 전체 밀리초를 날짜로 변환(등록일)
			var date2 = new Date(setParamTimeMdf); // 전체 밀리초를 날짜로 변환(수정일)
			var regDt = date.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD 형식으로 변환
			var mdfcnDt = date2.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD 형식으로 변환
			params.rentNo = param.rentNo;
			//params.vrfcHstrySn = param.vrfcHstrySn;
			if(setParamTimeMdf == null){
				params.DateMaker = regDt;
			}else{
				params.DateMaker = mdfcnDt;
			}
			
			//대여이력 상세
		   ajax(true, contextPath + '/vfc/rentIdp/selectDetailRentInfo', 'body', '확인중입니다.', params, function(data) {
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
			   if (data[0].rentSttsNm == '대여확정') {
				   $("#rentSttsCdUpdateBtn").remove();
				   $("#rentSttsCdConfUpdateBtn").remove();

				   var a = data[0].rentNo.toString();
				   $("#btn_bottom button:eq(1)")
					   .after(`<button id="rentSttsCdUpdateBtn" class='gray_btn cancel_btn' style="margin-right: 10px"
							value = '${a}' onclick=$rentIdp.event.rentSttsCdUpdateBtn();> 대여취소</button>`);
			   } else if (data[0].rentSttsNm == '미확정') {
				   $("#rentSttsCdUpdateBtn").remove();
				   $("#rentSttsCdConfUpdateBtn").remove();

				   var a = data[0].rentNo.toString();
				   $("#btn_bottom button:eq(1)")
					   .after(`<button id="rentSttsCdConfUpdateBtn" class='gray_btn cancel_btn' style="margin-right: 10px"
							value = '${a}' onclick=$rentIdp.event.rentSttsCdConfUpdateBtn();>대여확정</button>`);
			   }
				detailCk++;

		   });
			//대여정보이력
			//$rentIdp.event.hsDetailRent(params);
			
		   var ckInterval = setInterval(function() {
			   if (detailCk >= 3) {
				   kendo.ui.progress($("#detailContent"), false);
				   clearInterval(ckInterval);
			   }
		   });
	   },

	   rentSttsCdUpdateBtn: function() {
		   if (confirm("대여를 취소하시겠습니까?")) {
			   var params = {};
			   params.rentNo = $("#detailRentNo").val();
			   params.rentBgngDt = $("#start-picker03").val();
			   params.rentEndDt = $("#end-picker03").val();
			   params.rentSttsCd = 'cancel';

			   ajax(true, contextPath + '/vfc/rentIdp/updateRentInfo', 'body', '확인인중입니다.', params, function(data) {
				   alert("대여를 취소하였습니다.");
				   $("#rentSttsCdUpdateBtn").remove();
				   $rentIdp.event.detailInfoPopup(params);
			   });
		   }
	   },
		rentSttsCdConfUpdateBtn: function(){
			if(confirm("대여를 확정하시겠습니까?")){
				var params = {};
				params.rentNo = $("#detailRentNo").val();
				params.rentSttsCd = 'confirmed';
				ajax(true, contextPath + '/vfc/rentIdp/updateRentInfo', 'body', '확인인중입니다.', params, function (data) {
					alert("대여를 확정하였습니다.");
					$("#rentSttsCdConfUpdateBtn").remove();
					$rentIdp.event.detailInfoPopup(params);
				});
			}
		},
		
		rentUpdateBtn : function(){
			if (confirm("수정하시겠습니까?")) {

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

				ajax(true, contextPath + '/vfc/rentIdp/updateRentInfo', 'body', '확인인중입니다.', params, function(data) {
					if (data != null) {
						// 완료or실패
						alert("수정을 " + data.resultMsg + "했습니다.");
					}
					$rentIdp.event.detailDeleteBtn();
					// 대여이력 갱신
					//$rentIdp.event.hsDetailRent(params);
					
				});
			}
		},
		
		// 대여정보이력 수정 후, 갱신을 위해 따로 뺌
	   hsDetailRent: function(params) {
		   ajax(true, contextPath + '/vfc/rentIdp/selectHisDetailRentInfo', 'body', '처리중입니다.', params, function(data) {
			   var total = data.total;
			   var data = data.data;

			   var html = '';

			   for (var i = 0; i < data.length; i++) {

				   html += '<div class="detail_popup top_info">';
				   html += '	<div style="color: #000">';
				   html += '       <span>수정</span>';
				   html += '       <span id="" style="margin-left: 5px; color: red">' + nvl(total, ' ') + '</span>';
				   html += '	</div>';
				   html += '	<div>';
				   html += '       <span class="mdfcnDate">수정일시</span>';
				   html += '       <span id="" style="margin-left: 5px; color: red">' + nvl(data[i].regDt, ' ') + '</span>';
				   html += '	</div>';
				   html += '	<div>';
				   html += '       <span class="mdfcnName">수정자명</span>';
				   html += '       <span id="" style="margin-left: 5px; color: blue;">' + nvl(data[i].userNm, ' ') + '</span>';
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
				   html += '						<input type="text" id="" name="detailRentNo" class="input no_line" value="' + nvl(data[i].rentNo, ' ') + '" readonly/>';
				   html += '					</div>';
				   html += '				</td>';
				   html += '			</tr>';
				   html += '			<tr>';
				   html += '				<th scope="col">면허종류</th>';
				   html += '				<td>';
				   html += '					<div class="tb_flex">';
				   html += '						<label for="detailLcnsIdntfNm">면허종류</label>';
				   html += '						<input type="text" id="" name="detailLcnsIdntfNm" class="input no_line" value="' + nvl(data[i].lcnsIdntfNm, ' ') + '" readonly/>';
				   html += '					</div>';
				   html += '				</td>';
				   html += '			</tr>';
				   html += '			<tr>';
				   html += '				<th scope="col">대여시작일</th>';
				   html += '				<td>';
				   html += '					<div class="tb_flex">';
				   html += '						<label for="start-picker03">시작기간</label>';
				   html += '						<input type="text" id="" name="" class="input no_line" value="' + nvl(data[i].rentBgngDt, ' ') + '" readonly/>';
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
				   html += '						<input type="text" id="" name="" class="input no_line" value="' + nvl(data[i].vhclRegNo, ' ') + '" readonly/>';
				   html += '					</div>';
				   html += '				</td>';
				   html += '			</tr>';
				   html += '			<tr>';
				   html += '				<th scope="col">대여 상태</th>';
				   html += '				<td>';
				   html += '					<div class="tb_flex">';
				   html += '						<label for="detailRentSttsNm">대여 상태</label>';
				   html += '						<input type="text" id="" name="detailRentSttsNm" class="input no_line" value="' + nvl(data[i].rentSttsNm, ' ') + '" readonly/>';
				   html += '					</div>';
				   html += '				</td>';
				   html += '			</tr>';
				   html += '			<tr>';
				   html += '				<th scope="col">대여종료일</th>';
				   html += '				<td>';
				   html += '					<div class="tb_flex">';
				   html += '						<label for="end-picker03">종료기간</label>';
				   html += '						<input type="text" id="" name="" class="input no_line" value="' + nvl(data[i].rentEndDt, ' ') + '" readonly/>';
				   html += '					</div>';
				   html += '				</td>';
				   html += '			</tr>';

				   //국제 면허의 경우 첨부된 면허증 사본(다운로드) 필드 노출 여부
				   if (data[i].lcnsIdntfCd === '2') {
					   //파일이 존재하는 경우
					   if (data[i].atchFileSn && data[i].atchFileNm !== '-') {
						   html += '			<tr>';
						   html += '				<th scope="col">국제 면허증 파일</th>';
						   html += '				<td>';
						   html += '					<div class="tb_flex">';
						   html += '						<label for="detailFileDown">파일 다운로드</label>';
						   html += '						<input type="text" id="" name="detailFileDown" class="input no_line" value="' + nvl(data[i].atchFileNm, ' ') + '" >';
						   html += '					</div>';
						   html += '				</td>';
						   html += '			</tr>';
					   } else {

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
		
	   carGridPopup: function() {
		   $rentIdp.ui.carGrid();
		   $("#carPopup").addClass("view");
	   },

	   detailCarGridPopup: function() {
		   $rentIdp.ui.detailCarGrid();
		   $("#detailCarPopup").addClass("view");
	   },

	   detailDeleteBtn: function() {
		   $("#rentSttsCdUpdateBtn").remove();
		   $("#rentSttsCdConfUpdateBtn").remove();
		   $('#rentIdpGrid').data('kendoGrid').dataSource.read();
	   },

		updateDeleteYn : function(){
			if(confirm("삭제하시겠습니까?")){

				var params = {};

				params.rentNo = $("#detailRentNo").val();

				ajax(true, contextPath + '/vfc/rentIdp/updateDeleteYn', 'body', '확인인중입니다.', params, function (data) {
					alert("대여이력이 삭제되었습니다.");
				});
			}
		},
		
	   regiPopup: function() {
		   $("#globalLicense").addClass("view");
		   $("#regi").addClass("view");
		   $("#regChk01").prop("checked", true);
		   //			$("#licenseView").attr('style', 'display: none');
		   $("#files").val('');
		   $(".filetype").val('');

	   },
	   carNoval: function() {
		   var carRegNoVal = $("#carVhclRegNoVal").val();
		   $("#regVhclRegNo").val(carRegNoVal);
	   },

	   carPopupSearch: function() {
		   optVal = $("#carSearchWrd").val();
		   var grid = $('#carGrid').data('kendoGrid');
		   grid.dataSource.page(1);
	   },


	   insertRentReg: function() {
		   var params = {};
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

		   if (params.vhclRegNo == null || params.vhclRegNo == '') {
			   alert("차량번호를 등록해 주세요");
		   } else if (params.rentBgngDt == null || params.rentBgngDt == '') {
			   alert("대여시작일시를 등록해 주세요");
		   } else if (params.rentEndDt == null || params.rentEndDt == '') {
			   alert("대여종료일시를 등록해 주세요");
		   } else if (filedata == null) {
			   alert("면허증 사본을 등록해 주세요");
		   } else {
			   encryptFileAjax(contextPath + "/cmmn/encryptFileUpload", formData, function(response) {
				   if (response != null) {
					   params.atchFileSn = response.fileSn;
					   if (regVal == 'intLic')
						   params.lcnsIdntfCd = "2";	// 국제 면허
					   else
						   params.lcnsIdntfCd = "1"; // 국내 면허

					   ajax(true, contextPath + '/vfc/rentIdp/insertRentReg', 'body', '확인인중입니다.', params, function(data) {
						   alert("대여이력에 등록을 성공하셨습니다");
							$rentIdp.event.regPopupClose();
						   $("#regi").removeClass("view");
						   $('#rentIdpGrid').data('kendoGrid').dataSource.page(1);
					   });
				   }
			   });
		   }
	   },

	   InternationalLicenseBtnClickHandler: function() {
		   $(".filetype").val('');

		   /* 엑셀 클라이언트 파싱 처리 */
		   $("#files").on("change", function(e) {

			   var ext = $("#files").val().split(".").pop().toLowerCase();

			   if (ext.length > 0) {
				   if ($.inArray(ext, ["jpg", "jpeg", "png", "pdf",]) == -1) {
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

	   excelDownBtn: function() {
		   if (boundTotal == 0) {
			   alert("데이터가 없어 다운로드를 할 수 없습니다.");
		   } else if (boundTotal > 10000) {
			   alert("10,000 건 이하의 데이터만 다운로드 가능합니다.");
		   } else {
			   $("#rentIdpGrid").data("kendoGrid").saveAsExcel();
		   }
	   },

	   confInsert: function(params) {
		   ajax(true, contextPath + '/vfc/rentIdp/insertConfData', 'body', '확인인중입니다.', params, function(data) {
			   //				alert("대여확인증이 발급되었습니다.");
		   });
	   },

	   regPopupClose: function() {

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
		   $("#regVhclRegNo").val('');
		   $("#regRentNo").val('');
		   $("#regRgtrSn").val('');
		   $('#start-picker02').data("kendoDateTimePicker").value(new Date(nowYear, nowMonth, nowDate, nowHours, nowMinutes))
		   $('#end-picker02').data("kendoDateTimePicker").value(new Date(nowYear, nowMonth, nowDate, nowHours, nowMinutes));
		   $('#rentIdpGrid').data('kendoGrid').dataSource.read();
	   },
		
    };

}(window, document, jQuery));