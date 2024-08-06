 /**
 * 기업정보 관리
 * author : 김경룡
 */
(function (W, D, $) {
    'use strict';

    W.$crprtInfoManage = W.$crprtInfoManage || {};

	var map = null;
	var setMap = null;
	var marker = null;
	var defaultLat = 36.124566704;
	var defaultLng = 128.183676375;
	
	// 버튼 활성화 권한
	var authList = ["S01", "S02"];
	
	// 사업자번호 중복확인 체크용
//	var requestCkTf = null;
	
	// 파일 수정 여부 체크
	var bzmnChangeCk = false;
	var cocosChangeCk = false;
	// 파일 변경 시 기존 데이터 비교
	var bzmnOrigin = null;
	var cocosOrigin = null;
	
	// 승인/반려/장기미접속해제/삭제 데이터
	var gridData = null;
	var selectedItem = null;
	var clickParams = {};
	var userSnParam = {};
	
	var crprtColumns = [
		{ template: "#:sn #", title: "순번", width: "65px", field: "sn"},
		{ template: "#= brno != '' ? brno : '-' #", title: "사업자번호", field: "brno"},
//		{ template: "#= bzmn_sn != '' ? bzmn_sn : '-' #", title: "일련번호", width: "140px", field: "bzmn_sn"},
		{ template: "#= corp != '' ? corp : '-' #", title: "사업소종류", width: "100px", field: "corp"},
		{ template: "#= co_nm != '' ? co_nm : '-' #", title: "사업자명", width: "240px", field: "co_nm"},
//		{ template: "#= crno #", title: "법인번호", field: "crno"},
//		{ template: "#= aprv_stts_cd_nm #", title: "승인상태", field: "aprv_stts_cd_nm"},
		{ template: "#= bsn_stts_cd_nm != '' ? bsn_stts_cd_nm : '-' #", title: "영업상태", width: "100px", field: "bsn_stts_cd_nm"},
		{ template: "#= telno != '' ? telno : '-' #", title: "연락처", width: "170px", field: "telno"},
		{ template: "#= biz_strt_day != '' ? biz_strt_day : '-' #", title: "사업개시일", width: "160px", field: "biz_strt_day"},
		{ template: "#= road_nm.trim() != '' ? road_nm : '-' #", title: "사업지주소", field: "road_nm"},
//		{ template: "#= garage_road_nm #", title: "차고지주소", field: "garage_road_nm"},
	];
	
	var crprtUserColumns = [
		{ template: "#:sn #", title: "순번", width: "60px", field: "sn" },
		{ template: "#= user_id != null ? user_id : '-' #", title: "아이디", width: "100px", field: "user_id" },
		{ template: "#= user_nm != null ? $crprtInfoManage.event.masking(user_nm) : '-' #", title: "성명", width: "100px", field: "user_nm" },
		{ template: "#= telno != null ? $crprtInfoManage.event.masking(telno) : '-' #", title: "연락처", width: "100px", field: "telno" },
		{ template: "#= addr != null ? $crprtInfoManage.event.masking(addr) : '-' #", title: "이메일", width: "100px", field: "addr" },
		{ template: "#= stts_acnt != null ? stts_acnt : '-' #", title: "계정상태", width: "100px", field: "stts_acnt"},
		{ template: "#= stts_aprv != null ? stts_aprv : '-' #", title: "승인상태", width: "100px", field: "stts_aprv"},
		{ template: "#= author != null ? author : '-' #", title: "권한", width: "130px", field: "author" },
		{ template: "#= approver != '' ? approver : '-' #", title: "승인자(ID)", width: "130px", field: "approver" },
		{ template: "#= log_day != null ? log_day : 0 #", title: "미접속일", field: "log_day", hidden: "true" },
		{ template: "#= user_sn != null ? user_sn : 0 #", title: "계정pk", field: "user_sn", hidden: "true" }
	];
	
	var excelDataArc = {};
	var excelDataArcUser = {};

	$(document).ready(function() {
		kendo.ui.progress($(document.body), true);
		
        $crprtInfoManage.ui.pageLoad();		// 최초 페이지 로드 시
        $crprtInfoManage.event.setUIEvent();
//        $crprtInfoManage.event.dupleAddrInput();
    });

    $crprtInfoManage.ui = {
        /**
         *
         * @name         : pageLoad
         * @description  : 최초 페이지 로드 시 UI에 적용
         * @date         : 2023. 09. 13.
         * @author	     : 김경룡
         */
        pageLoad : function() {
			$crprtInfoManage.ui.authButton();

			$crprtInfoManage.ui.searchCondition();
			
			$crprtInfoManage.ui.insertAddOn();
			$crprtInfoManage.ui.updateAddOn();

			$crprtInfoManage.ui.companyManageInfo();
			$crprtInfoManage.ui.companyManageUserInfo();
			$crprtInfoManage.ui.rowClickUserDetail();
			
			//
			$crprtInfoManage.event.prcssBtnClick();
		},
		
        /**
         * @name         : companyManageInfo
         * @description  : 기업정보관리 그리드
         * @date         : 2023. 11. 01.
         * @author	     : 김경룡
         */
		companyManageInfo: function() {
			$("#crprtGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sys/crprtInfoManage/selectCrprtInfo',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							options.bzmnSeDrop = $("#bzmnSeDrop").val();
							options.bsnSttsDrop = $("#bsnSttsDrop").val();
							options.searchWrd  = $("#searchWrd").val();
							options.authrtCd   = authrtCd;
							options.bzmnSn     = bzmnSn;
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
					serverSorting:false,
					autoBind: false,
				},
				columns: crprtColumns,
				navigatable: true,
				pageable: {
					pageSizes: [5, 10, 20],
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				editable: false,
				resizable: true,
				selectable: "row",
				dataBound: function() {
					kendo.ui.progress($(document.body), false);
				},
				change: function(e) {
					var rows = e.sender.select();
					var dataItem = null;
					var dataUse = null;
					
					rows.each(function() {
						var grid = $("#crprtGrid").data("kendoGrid");
						dataItem = grid.dataItem(this);
					}); 
					
					dataUse = dataItem.bzmn_sn;
					
					$crprtInfoManage.event.existData(dataUse);
				}
			});
		},
		
        /**
         * @name         : pageLoad
         * @description  : 사용자정보관리 그리드
         * @date         : 2023. 11. 01.
         * @author	     : 김경룡
         */
		companyManageUserInfo: function(){
			$("#grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sys/crprtInfoManage/selectCrprtUserInfo',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							options.userAcntStts = $("#userAcntStts").val();
							options.userAprvStts = $("#userAprvStts").val();
							options.searchWrd  = $("#searchWrdUser").val();
							options.authrtCd   = authrtCd;
							options.bzmnSn     = bzmnSn;
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
					serverSorting:false,
					autoBind: false,
				},
				columns: crprtUserColumns,
				navigatable: true,
				pageable: {
					pageSizes: [5, 10, 20],
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				editable: false,
				resizable: true,
				selectable: "row"
			});
		},

      	/**
        *
        * @name         : rowClickUserDetail
        * @description  : 그리드 셀 클릭 시, 상세 팝업
        * @date         : 2023. 07. 11
        * @author       : 김경룡
        */
		rowClickUserDetail: function() {
			
			$("#grid").on("click", "tr", function() {
				gridData = null;
				selectedItem = null;
				
				gridData = $("#grid").data("kendoGrid");
				selectedItem = gridData.dataItem(gridData.select());
				
				$("#d_userId").text(selectedItem.user_id);
				$("#d_userNm").text(selectedItem.user_nm);
				$("#d_telno").text(selectedItem.telno);
				$("#d_email").text(selectedItem.addr);
				$("#d_state").text(selectedItem.stts_acnt+" / "+selectedItem.stts_aprv);
				$("#d_author").text(selectedItem.author);
				$("#d_approve").text(selectedItem.approver);
				
				userSnParam = {
					"uSn"   : selectedItem.user_sn
				};
				
				var stts_req = selectedItem.stts_aprv;
				
				// 주사업소, 영업소 권한
				if(authList.includes(authrtCd) && selectedItem.author == "일반회원") {
					if(stts_req == "가입 요청") {
						$(".approve_btn").show();
						$(".reject_btn").show();
					}
					// 장기미접속 해제
					if(selectedItem.acnt_stts_cd == '3') {
						$(".disconnect_btn").show();
					}
					// 계정삭제
					if(selectedItem.acnt_stts_cd == "1" && stts_req == "가입 완료") {
						$(".delete_btn").show();
					}
				}
				
				$("#detailPopup").addClass("view");
				$("body").css("overflow", "hidden");
			});
      	},
      	
      	/**
        *
        * @name         : searchCondition
        * @description  : 기업: (사업소종류, 영업상태), 사용자: (계정상태, 승인상태, 권한)
        * @date         : 2023. 11. 02
        * @author       : 김경룡
        */
		searchCondition: function() {
			// 사업소종류
			ajax(true, contextPath+'/sys/crprtInfoManage/selectBzmnSe', 'body', '처리중입니다.', {}, function (data) {
				$("#bzmnSeDrop").kendoDropDownList({
			    	optionLabel: "사업소종류(전체)",
			        dataTextField: "cd_nm",
			        dataValueField: "cd",
			        dataSource: data,
					value : "cd_nm",
				});
			});
			// 영업상태
			ajax(true, contextPath+'/sys/crprtInfoManage/searchBsnStts', 'body', '처리중입니다.', {}, function (data) {
				$("#bsnSttsDrop").kendoDropDownList({
			    	optionLabel: "영업상태(전체)",
			        dataTextField: "cd_nm",
			        dataValueField: "cd",
			        dataSource: data,
					value : "cd_nm",
				});
			});
		    
		    // 계정상태 
			ajax(true, contextPath+'/sys/crprtInfoManage/userAcntStts', 'body', '처리중입니다.', {}, function (data) {
				$("#userAcntStts").kendoDropDownList({
					optionLabel: "계정상태(전체)",
			        dataTextField: "cd_nm",
			        dataValueField: "cd",
			        dataSource: data,
					value : "cd_nm"
			    });
		    });
		    // 승인상태
			ajax(true, contextPath+'/sys/crprtInfoManage/userAprvStts', 'body', '처리중입니다.', {}, function (data) {
				$("#userAprvStts").kendoDropDownList({
					optionLabel: "승인상태(전체)",
			        dataTextField: "cd_nm",
			        dataValueField: "cd",
			        dataSource: data,
					value : "cd_nm"
			    });
		    });
		},

		// 영업소 등록 팝업
		insertAddOn: function() {
			// 사업게시일
			var bizStrtId = "#bizStrtDay"; 
			$crprtInfoManage.event.datePicker(bizStrtId);

			// 상태변경일시
			var bsnSttsMdId = "#bsnSttsMdfcnDt"; 
			$crprtInfoManage.event.datePicker(bsnSttsMdId);

			// 사업소종류
			var pobId = "#bzmnSeCd";
			$crprtInfoManage.event.placeOfbusiness(pobId, '1', authrtCd);
 
			// 시도
			var ctId = "#sggCdCtpvNm";
			$crprtInfoManage.event.ctStateNm(ctId);

			// 시구군
			var ctCId = "#sggCdSggNm";
			$crprtInfoManage.event.ctCounty(ctCId);

			// 영업상태
			var bsnSttsId = "#bsnStts";
			$crprtInfoManage.event.bsnStts(bsnSttsId);
			
			// 영업소 등록 팝업 관련
			$crprtInfoManage.event.insertPopAddOn();
		},

		// 내기업정보 수정 팝업
		updateAddOn: function() {
			// 사업게시일
			var biz_strt_id = "#biz_strt_day"; 
			$crprtInfoManage.event.datePicker(biz_strt_id);

			// 상태변경일시
			var bsn_stts_md_id = "#bsn_stts_mdfcn_dt"; 
			$crprtInfoManage.event.datePicker(bsn_stts_md_id);

			// 사업소종류
			var pobId = "#bzmn_se_cd_nm";
			$crprtInfoManage.event.placeOfbusiness(pobId, '2', authrtCd);

			// 시도
			var ctId = "#ctpv_nm";
			$crprtInfoManage.event.ctStateNm(ctId);

			// 시구군
			var ctCId = "#sgg_nm";
			$crprtInfoManage.event.ctCounty(ctCId);

			// 영업상태
			var bsnSttsId = "#bsn_stts_cd_nm";
			$crprtInfoManage.event.bsnStts(bsnSttsId);
			
			// 내 기업정보 수정 팝업 관련
			$crprtInfoManage.event.updatePopAddOn();
		},
		
      	/**
        *
        * @name         : mapView
        * @description  : 기업 위치 및 마커 표기
        * @date         : 2023. 09. 07
        * @author       : 김경룡
        */		
		mapView: function(mapId, lat, lng){
			lat == null ? lat = defaultLat : lat;
			lng == null ? lng = defaultLng : lng;
			var mapOptions = {}; // 맵 옵션
			
			var LRowLatLng = L.latLng(32, 124);
			var RHighLatLng = L.latLng(39, 132);
			var bounds  = L.latLngBounds(LRowLatLng, RHighLatLng);

			setMap = setRimsMap2(map, mapId, mapOptions, bounds); // 지도 생성
			marker = L.marker([lat.toFixed(7), lng.toFixed(7)]).addTo(setMap); 
			setMap.options.minZoom = 8;   //초기zoom조절
			setMap.setView(marker.getLatLng(), 18);
		},
		
      	/**
        *
        * @name         : authButton
        * @description  : S03의 insert, update 방지
        * @date         : 2024. 01. 02
        * @author       : 김경룡
        */			
		authButton: function() {
			// 수정요청 버튼 권한
			if(authList.includes(authrtCd)) {
				$("#insertBtnDiv").show();
				$(".updateBtn_btn").show();
				$(".insert_popup").show();
				$("#mdfcnAuth").show();
//			} else if(authrtCd == "S03") {
			} else {
				$(".s03auth").css("cursor", "default");
				$(".s03auth").prop("readOnly", true);
				$(".s03auth").addClass("no_line");
				$(".s03authDs").prop("disabled", true);
				$(".s03authBtn").hide();
			}
		}
    };

    //이벤트 정의
    $crprtInfoManage.event = {

        setUIEvent : function() {
			
			// 검색창 엔터키
			$(".searchWrd").on('keydown', function(e) {
				if (e.key == "Enter") {
					$crprtInfoManage.event.searchClick(e);
				}
			});

			// 엑셀다운로드버튼(기업)
			$("#crprtExcel").on("click", function() {
				var totCount = $("#crprtGrid").data("kendoGrid").dataSource.total();
				if(totCount == 0 ) {
					alert("데이터가 존재하지 않습니다.");
				} else {
					if(Object.keys(excelDataArc).length === 0) {
						excelDataArc.authrtCd = authrtCd;
						excelDataArc.bzmnSn = bzmnSn;
					}
					
					var fileName = "corporate"
					excelDown("/sys/crprtInfoManage/excelDown", excelDataArc, fileName, totCount);
				}
        	});
			// 엑셀다운로드버튼(기업사용자)
			$("#crprtUsrExcel").on("click", function() {
				var totCount = $("#grid").data("kendoGrid").dataSource.total();
				if(totCount == 0) {
					alert("데이터가 존재하지 않습니다.");
				} else {
					if(Object.keys(excelDataArcUser).length === 0) {
						excelDataArcUser.authrtCd = authrtCd;
						excelDataArcUser.bzmnSn = bzmnSn;
					}
					
					var fileName = "corporateUser"
					excelDown("/sys/crprtInfoManage/excelDownUser", excelDataArcUser, fileName, totCount);
				}
        	});

			// 팝업창 X 버튼, 닫기 버튼 관련
			$crprtInfoManage.event.closeAddOn();

			// 수정 팝업 - 사업자등록증 파일 다운로드
			$('#bzmnLicenseAtchNm').on("click", function() {
				var atchFileSn = $("#bzFileNo").val();
				var atchFileNm = $("#bzmnLicenseAtchNm").val();
				fileDownload(atchFileSn, atchFileNm);
			});

			// 수정 팝업 - 법인인감증명서 파일 다운로드
			$('#cocsAtchNm').on("click", function() {
				var atchFileSn = $("#coFileNo").val();
				var atchFileNm = $("#cocsAtchNm").val();
				fileDownload(atchFileSn, atchFileNm);
			});
        },

		/**
	     * @name         : searchClick
	     * @description  : 조회버튼 클릭
	     * @date         : 2023. 11. 03
	     * @author       : 김경룡
	     */ 
		searchClick: function(e) {
			// 조회버튼
			if($(e.target).closest("#searchForm").length == 1) {
				var bzmnSeDrop = $("#bzmnSeDrop").val();
				var bsnSttsDrop = $("#bsnSttsDrop").val();
				var wrd = $("#searchWrd").val();
				var excelDown = $("#elxExcelDownReason").val();
				var gridId = "#crprtGrid";
	           	$crprtInfoManage.event.searchBtn(bzmnSeDrop, bsnSttsDrop, wrd, excelDown, gridId);
			} else if($(e.target).closest("#searchUserForm").length == 1) {
				var userAcntStts = $("#userAcntStts").val();
				var userAprvStts = $("#userAprvStts").val();
				var wrd = $("#searchWrdUser").val();
				var excelDown = $("#elxExcelDownReasonUser").val();
				var gridId = "#grid";
	           	$crprtInfoManage.event.searchBtn(userAcntStts, userAprvStts, wrd, excelDown, gridId);
			}
		},

		/**
	     * @name         : closeAddOn
	     * @description  : 팝업 X 버튼, 닫기 버튼 이벤트
	     * @date         : 2023. 07. 11
	     * @author       : 김경룡
	     */
		closeAddOn: function() {
			// 상세 팝업 X, 닫기 버튼
			$(".detailPop_close").on("click", function() {
				$(".approve_btn").hide();
				$(".reject_btn").hide();
				$(".disconnect_btn").hide();
				$(".delete_btn").hide();
				$("#detailPopup").removeClass('view');
				$("body").css("overflow", "auto");
				$("#rjrs_div").hide();
			});
			
			// X 버튼
			$(".d_Close").on("click", function() {
				$crprtInfoManage.event.closeReset();
			});
			// 닫기 버튼
			$(".cancelBtn").on("click", function() {
				$crprtInfoManage.event.closeReset();
	        });
		},
        
      	/**
         *
         * @name         : insertPopAddOn
         * @description  : 영업소 등록 팝업 관련 이벤트
         * @date         : 2023. 07. 12
         * @author       : 김경룡
         */
		insertPopAddOn: function() {
			// 영업소 등록 팝업 - 창 버튼
			$(".insertPopup").on("click", function() {
				var mapId = "crprtCoordMap";
				$crprtInfoManage.ui.mapView(mapId, defaultLat, defaultLng);
				
//				$crprtInfoManage.event.rightBtnClick();  // 마커 우클릭
				
			    $(".register_popup").addClass("view");
			    $("body").css("overflow", "hidden");
			});
			
			// 영업소 등록 팝업 - 사업자번호 중복확인
			/*var insertCkBtn = "#requestDuple"; 
			var insertBrnoVal = "#insertBrno";
			$crprtInfoManage.event.brnoDupleCk(insertCkBtn, insertBrnoVal);*/

			// 영업소 등록 팝업 - 사업자등록증 파일 업로드
			$('.bzmnFileUpload').on("click", function() {
				$("#bzFileUpload").click();
				$("#bzFileUpload").change(function() {
					var file = $(this).prop("files")[0]; // 선택된 파일 가져오기
					var fileName = file.name; // 파일명 가져오기
					$("#bzmnLicenseAtch").val(fileName); // 파일명을 사업자등록증 input 태그에 설정
				});
			});

			// 영업소 등록 팝업 - 법인인감증명서 파일 업로드
			$('.coFileUpload').on("click", function() {
				$("#coFileUpload").click();
				$("#coFileUpload").change(function() {
					var file = $(this).prop("files")[0]; // 선택된 파일 가져오기
					var fileName = file.name; // 파일명 가져오기
					$("#cocosAtch").val(fileName); // 파일명을 법인인감증명서 input 태그에 설정
				});
			});

			// 영업소 등록 팝업 - 주소 찾기
			$('.addrBtn01').on("click", function() {
				var insertLat = "#locationLat";
				var insertLng = "#locationLot";
				var insertCt = "#sggCdCtpvNm";
				var insertSgg = "#sggCdSggNm";
				var insertRoad = "#roadNmAddr";
				var insertLotno = "#lotnoAddr";
				 
				$crprtInfoManage.event.addrDialogOpen();
				$crprtInfoManage.event.addrFindRoad(insertLat, insertLng, insertCt, insertSgg, insertRoad, insertLotno);
			});

			// 영업소 등록 팝업 - 차고지 주소 찾기
			$('.addrGrgInsert').on("click", function() {
				var inputId = "#garageRoadNmAddr";
				$crprtInfoManage.event.addrDialogOpen();
				$crprtInfoManage.event.addrGrg(inputId);
			});

			// 등록요청 버튼
			$(".insertBtn").on("click", function() {
				$crprtInfoManage.event.insertBtn();
			});
		},
		
      	/**
         *
         * @name         : updatePopAddOn
         * @description  : 내 기업정보 수정 팝업 관련 이벤트
         * @date         : 2023. 07. 13
         * @author       : 김경룡
         */
		updatePopAddOn: function() {
			// 내 기업정보 수정 팝업 - 사업자번호 중복확인
			// 영업소 등록 팝업 - 사업자번호 중복확인
			/*var updateCkBtn = "#fixrequestDuple"; 
			var updateBrnoVal = "#updateBrno";
			$crprtInfoManage.event.brnoDupleCk(updateCkBtn, updateBrnoVal);*/
			
			// 상세팝업 - 사업자등록증 파일 업로드
			$('.bzmnDetailFileUpload').on("click", function() {
				$("#bzmnDetailFileUpload").click();
				$("#bzmnDetailFileUpload").change(function() {
					var file = $(this).prop("files")[0]; // 선택된 파일 가져오기
					var fileName = file.name; // 파일명 가져오기
					$("#bzmnLicenseAtchNm").val(fileName); // 파일명을 사업자등록증 input 태그에 설정
					bzmnChangeCk = true;
				});
			});

			// 상세팝업 - 법인인감증명서 파일 업로드
			$('.coDetailFileUpload').on("click", function() {
				$("#coDetailFileUpload").click();
				$("#coDetailFileUpload").change(function() {
					var file = $(this).prop("files")[0]; // 선택된 파일 가져오기
					var fileName = file.name; // 파일명 가져오기
					$("#cocsAtchNm").val(fileName); // 파일명을 법인인감증명서 input 태그에 설정
					cocosChangeCk = true;
				});
			});

			// 내 기업정보 수정 팝업 - 주소찾기
			$('.addrBtn11').on("click", function() {
				var updateLat = "#location_lat";
				var updateLng = "#location_lot";
				var updateCt = "#ctpv_nm";
				var updateSgg = "#sgg_nm";
				var updateRoad = "#road_nm_addr";
				var updateLotno = "#lotno_addr";

				$crprtInfoManage.event.addrDialogOpen();
				$crprtInfoManage.event.addrFindRoad(updateLat, updateLng, updateCt, updateSgg, updateRoad, updateLotno);
			});

			// 내 기업정보 수정 팝업 - 차고지 주소 찾기
			$('.addrGrgUpdate').on("click", function() {
				var inputId = "#garage_road_nm_addr";
				$crprtInfoManage.event.addrDialogOpen();
				$crprtInfoManage.event.addrGrg(inputId);
			});

			// 수정요청 버튼
			$(".updateBtn_btn").on("click", function() {
				$crprtInfoManage.event.updateBtn();
			});
		},

      	/**
         *
         * @name         : dupleAddrInput
         * @description  : 도로명/지번 상세주소 동시입력
         * @date         : 2023. 07. 11
         * @author       : 김경룡
         */
		dupleAddrInput: function() {
			// 등록요청 (양방향 처리)
//			$("#roadNmDaddr").on('input', function() {
//				$("#lotnoDaddr").val($(this).val());
//			});
//			$("#lotnoDaddr").on('input', function() {
//				$("#roadNmDaddr").val($(this).val());
//			});

//			// 수정요청(양방향 처리)
//			$("#road_nm_daddr").on('input', function() {
//				$("#lotno_daddr").val($(this).val());
//			});
//			$("#lotno_daddr").on('input', function() {
//				$("#road_nm_daddr").val($(this).val());
//			});
		},

        /**
        *
        * @name         : searchBtn
        * @description  : input, dropdown 조건이 있어도 현재 리스트만 엑셀 데이터로 사용
        * @date         : 2023. 07. 10
        * @author       : 김경룡
        */
		searchBtn: function(condition1, condition2, wrd, excelDown, gridId) {
			if(gridId == "#crprtGrid") {
				excelDataArc.bzmnSeDrop 		= condition1;
				excelDataArc.bsnSttsDrop 		= condition2;
				excelDataArc.searchWrd 			= wrd;
				excelDataArc.authrtCd 			= authrtCd;
				excelDataArc.bzmnSn 			= bzmnSn;
				excelDataArc.elxExcelDownReason = excelDown;
				excelDataArc._csrf 				= $('._csrf').val();
			} else {
				excelDataArcUser.userAcntStts		= condition1;
				excelDataArcUser.userAprvStts		= condition2;
				excelDataArcUser.searchWrd			= wrd;
				excelDataArcUser.authrtCd 			= authrtCd;
				excelDataArcUser.bzmnSn 			= bzmnSn;
				excelDataArcUser.elxExcelDownReason = excelDown;
				excelDataArcUser._csrf				= $('._csrf').val();
			}
			$(gridId).data("kendoGrid").dataSource.page(1);
		},

		/**
	     *
	     * @name         : closeReset
	     * @description  : 등록 / 수정 팝업 닫기 버튼
	     * @date         : 2023. 07. 12
	     * @author       : 김경룡
	     */
		closeReset: function() {
			// 상세보기 팝업 버튼 초기화
			$(".register_popup").removeClass('view');
			$("#updatePopup").removeClass('view');
//			$crprtInfoManage.event.searchBtn();
			location.reload();
		},

		/**
	     *
	     * @name         : brnoDupleCk
	     * @description  : 사업자번호 중복확인 공통처리
	     * @date         : 2023. 07. 14
	     * @author       : 김경룡
	     */
		brnoDupleCk: function(btn, val) {
			$(btn).on("click", function() {
				requestCkTf = null;
				var dupleCk = {"dupleCk" : $(val).val(), "myBzmnSn" : bzmnSn};

				if($(val).val() == null || $(val).val() == '') {
					alert("사업자번호를 입력 해주시기 바랍니다.");
					$(val).focus();
					return;
				} else {
					ajax(true, contextPath+'/sys/crprtInfoManage/requestCkDuple', 'body', '처리중입니다.', dupleCk, function(data) {
						var request = data.request;
						var master = data.master;

						if(request == null && master == null) {
							requestCkTf = true;
							alert("사용 가능한 사업자 번호입니다.");
						} else if(master != null && dupleCk.myBzmnSn != master.bzmn_sn) {
							alert("이미 등록되어 있는 사업자 번호입니다.");
							$(val).focus();
							requestCkTf = false;
							return;
						} else if(master == null && request != null) {
							alert("현재 등록 요청중인 사업자 번호입니다.");
							$(val).focus();
							requestCkTf = false;
							return;
						} else if(master != null && dupleCk.myBzmnSn == master.bzmn_sn) {
							alert("기존 사업자 번호를 유지합니다.");
							requestCkTf = true;
						}
					});
				}
			});
		},

        /**
         *
         * @name         : placeOfbusiness
         * @description  : 사업소 종류 공통처리
         * @date         : 2023. 07. 13
         * @author       : 김경룡
         */
		placeOfbusiness: function(id, ck, cd) {
			if(cd == 'S02') {
				$(id).kendoDropDownList({
					dataTextField: "cd_nm",
			        dataValueField: "cd",
			        dataSource: [{"cd_nm": "영업소(예약소)", "cd": "2"}],
					value : "cd_nm",
				});
				
				$(".upCompanyNo").show();
			} else {
				ajax(true, contextPath+'/sys/crprtInfoManage/selectBzmnSe', 'body', '처리중입니다.', {}, function (data) {
					$(id).kendoDropDownList({
			            optionLabel: "사업소종류(선택)",
			            dataTextField: "cd_nm",
			            dataValueField: "cd",
			            dataSource: data,
						value : "cd_nm",
						change: function(e) {
							var val = this.value();
							val == '2' ? $(".upCompanyNo").show() : $(".upCompanyNo").hide() 
						}
			        });
				});
			}
			
			// 주사무소 사업자번호
			var upB = '';
			ck == '1' ? upB = '#insertUpBrno' : upB = '#updateUpBrno';
			ajax(true, contextPath + '/sys/crprtInfoManage/selectUpBrno', 'body', '처리중입니다.', {}, function(data) {
				$(upB).kendoDropDownList({
					filter: "contains",
					optionLabel: "주사무소(선택)",
					dataTextField: "up_brno",
					dataValueField: "bzmn_sn",
					dataSource: data,
					value: "up_brno"
				});
			});
		},

        /**
         *
         * @name         : ctStateNm
         * @description  : 시도 공통처리
         * @date         : 2023. 07. 13
         * @author       : 김경룡
         */
		ctStateNm: function(id) {
			ajax(true, contextPath+'/sys/crprtInfoManage/selectCtpvNm', 'body', '처리중입니다.', {}, function (data) {
				$(id).kendoDropDownList({
		            optionLabel: "시도(전체)",
		            dataTextField: "ctpv_nm",
		            dataValueField: "ctpv_cd",
		            dataSource: data,
					value : "ctpv_nm",
		        });
			});
		},

        /**
         *
         * @name         : ctCounty
         * @description  : 시군구 공통처리
         * @date         : 2023. 07. 13
         * @author       : 김경룡
         */
		ctCounty: function(id) {
			ajax(true, contextPath+'/sys/crprtInfoManage/selectSggNm', 'body', '처리중입니다.', {}, function (data) {
				$(id).kendoDropDownList({
		            optionLabel: "시군구(전체)",
		            dataTextField: "sgg_nm",
		            dataValueField: "stdg_cd",
		            dataSource: data,
					value : "sgg_nm"
		        });
			});
		},

        /**
         *
         * @name         : bsnStts
         * @description  : 영업상태 공통처리
         * @date         : 2023. 07. 13
         * @author       : 김경룡
         */
		bsnStts: function(id) {
			var param = {};
			id == "#bsnStts" ? param.sttsInsertCont = "sttsDrop" : param = {}; 
			ajax(true, contextPath+'/sys/crprtInfoManage/searchBsnStts', 'body', '처리중입니다.', param, function (data) {
				$(id).kendoDropDownList({
			    	optionLabel: "영업상태(전체)",
			        dataTextField: "cd_nm",
			        dataValueField: "cd",
			        dataSource: data,
					value : "cd_nm"
			    });

			    var bsnStts = $(id).data("kendoDropDownList");
				bsnStts.select(1);
			});
		},

        /**
         *
         * @name         : datePicker
         * @description  : kendoDatePicker 공통처리
         * @date         : 2023. 07. 18
         * @author       : 김경룡
         */
		datePicker: function(dateId) {
			$(dateId).kendoDatePicker({
				value: new Date(),
	            dateInput: true,
	            format: "yyyy-MM-dd",
			});
		},

        /**
        *
        * @name         : insertBtn
        * @description  : 영업소등록 팝업 insert
        * @date         : 2023. 09. 12
        * @author       : 김경룡
        */
		insertBtn: function() {
			var params = {
				regCmptncCd : getCmptncZoneCd,

				bzmnSn: null,
				coNm : nvl($('#coNm').val()),
				brno : nvl($('#insertBrno').val().replace(/[^0-9]/g, ""), null),
				upBrno: nvl($("#insertUpBrno").val(), null),
				bzmnLicenseAtchSn : nvl($('#bzmnLicenseAtch').val(), null),
				bzmnSeCd : nvl($('#bzmnSeCd').val()),
				rprsvNm : nvl($('#rprsvNm').val()),
				crno : nvl($('#insertCrno').val().replace(/[^0-9]/g, ""), null),
				cocosAtchSn : nvl($('#cocosAtch').val(), null),
				bizStrtDay : nvl($('#bizStrtDay').val().replace(/-/g, "")),

				sggCd : nvl($("#sggCdSggNm").val(), null),
				roadNmAddr : nvl($('#roadNmAddr').val()),
				roadNmDaddr : nvl($('#roadNmDaddr').val()),
				lotnoAddr : nvl($("#lotnoAddr").val(), null),
				locationLat : nvl($("#locationLat").val(), null),
				locationLng : nvl($("#locationLot").val(), null),
				garageRoadNmAddr : nvl($('#garageRoadNmAddr').val()),
				garageRoadNmDaddr : nvl($('#garageRoadNmDaddr').val().trim()),

				bsnSttsCd : nvl($('#bsnStts').val()),
				bsnSttsMdfcnDt : $("#bsnSttsMdfcnDt").val().replace(/-/g, ""),
				telno : nvl($('#telNumber').val().replace(/-/g, "")),
				vhclRegCntom : nvl($('#vhclRegCntom').val(),0),
				sednCarNoh : nvl($('#sednCarNoh').val(),0),
				passVhcleNoh : nvl($('#passVhcleNoh').val(),0),
				operBgngDt : nvl($('#operBgngDt').val()),
				operEndDt : nvl($('#operEndDt').val()),
				elecSednCarNoh : nvl($('#elecSednCarNoh').val(),0),
				elecPassVhcleNoh : nvl($('#elecPassVhcleNoh').val(),0),
				rmrk : nvl($('#insertRmrk').val()),
				aprvSttsCd : '1', // 등록 요청
				aprvDmndCd : '1'  // 새로 추가된 컬럼[승인요청코드(1등록,2수정,3이관)]
			}
			var bzFile = $('#bzmnLicenseAtch').val();
			var coFile = $('#cocosAtch').val();

			if(params.coNm == null || params.coNm == '') { alert("사업자명을 입력해주세요."); return; }
			if(params.brno == null || params.brno == '') { alert("사업자번호를 입력해주세요."); return; }
			if(params.bzmnLicenseAtchSn == null || params.bzmnLicenseAtchSn == '') { alert("사업자등록증을 첨부해주세요."); return; }
			if(params.bzmnSeCd == null || params.bzmnSeCd == '') { alert("사업소종류를 선택해주세요."); return; }
			if(params.bzmnSeCd == '2') {
				if(params.upBrno == '' || params.upBrno == null) {
					alert("사업소가 영업소(예약소)이면 주사무소 선택은 필수입니다");
					return;
				}
			}
			if(params.rprsvNm == null || params.rprsvNm == '') { alert("대표자명을 입력해주세요."); return; }
			if(params.bsnSttsCd == null || params.bsnSttsCd == '') { alert("영업상태 선택은 필수입니다"); return; }
//			if(requestCkTf != true) { alert("사업자 번호를 중복확인 해주시기 바랍니다."); return; }
			if(confirm("등록 하시겠습니까?")) {
				if(bzFile == '' && coFile == '') {
					$crprtInfoManage.event.insertCmpnyRequest(params);
				} else if(bzFile != '' && coFile == '') {
					var formData = new FormData();
					formData.append('files', document.getElementById('bzFileUpload').files[0]);

					fileAjax(contextPath + "/cmmn/fileUpload", formData, function (response) {
						if (response != null) {
							params.bzmnLicenseAtchSn = nvl(response.fileSn, 0);
							$crprtInfoManage.event.map(params);
							$crprtInfoManage.event.insertCmpnyRequest(params);
						}
					});
				} else if(bzFile != '' && coFile != '') {
					var formData = new FormData();
					formData.append('files', document.getElementById('bzFileUpload').files[0]);

					fileAjax(contextPath + "/cmmn/fileUpload", formData, function (response) {
						if (response != null) {
							params.bzmnLicenseAtchSn = nvl(response.fileSn, 0);

							var formData2 = new FormData();
							formData2.append('files', document.getElementById('coFileUpload').files[0]);

							fileAjax(contextPath + "/cmmn/fileUpload", formData2, function (response) {
								if (response != null) {
									params.cocosAtchSn = nvl(response.fileSn, 0);
									$crprtInfoManage.event.map(params);
									$crprtInfoManage.event.insertCmpnyRequest(params);
								}
							});
						}
					});
				}
			}
		},

        /**
        *
        * @name         : updateBtn
        * @description  : 내기업정보수정 팝업 수정요청
        * @date         : 2023. 09. 11(최초 07. 17)
        * @author       : 김경룡
        */
		updateBtn: function() {
			var params = {
				regCmptncCd : getCmptncZoneCd,

				bzmnSn : $("#update_bzmn_sn").val(),
				coNm : nvl($('#co_nm').val()),
				brno : nvl($('#updateBrno').val().replace(/[^0-9]/g, ""), null),
				upBrno : $("#updateUpBrno").val(),
				bzmnLicenseAtchSn : nvl($('#bzmnLicenseAtchNm').val(), null),
				bzmnSeCd : nvl($("#bzmn_se_cd_nm").val()),
				rprsvNm : nvl($('#rprsv_nm').val()),
				crno : nvl($('#crno').val().replace(/[^0-9]/g, ""), null),
				cocosAtchSn : nvl($('#coFileNo').val(), null),
				bizStrtDay : nvl($('#biz_strt_day').val().replace(/-/g, "")),

				sggCd : nvl($("#sgg_nm").val(), null),
				roadNmAddr : nvl($('#road_nm_addr').val()),
				roadNmDaddr : nvl($('#road_nm_daddr').val()),
				lotnoAddr : nvl($("#lotno_addr").val(), null),
				locationLat : nvl($('#location_lat').val()),
				locationLng : nvl($('#location_lot').val()),
				garageRoadNmAddr : nvl($('#garage_road_nm_addr').val()),
				garageRoadNmDaddr : nvl($('#garage_road_nm_daddr').val()),

				bsnSttsCd : nvl($('#bsn_stts_cd_nm').val()),
				bsnSttsMdfcnDt : $("#bsn_stts_mdfcn_dt").val().replace(/-/g, ""),
				telno : nvl($('#telno').val().replace(/-/g, "")),
				vhclRegCntom : nvl($('#vhcl_reg_noh').val(),0),
				sednCarNoh : nvl($('#sedn_car_noh').val(),0),
				passVhcleNoh : nvl($('#pass_vhcle_noh').val(),0),
				operBgngDt : nvl($('#oper_bgng_dt').val()),
				operEndDt : nvl($('#oper_end_dt').val()),
				elecSednCarNoh : nvl($('#elec_sedn_car_noh').val(),0),
				elecPassVhcleNoh : nvl($('#elec_pass_vhcle_noh').val(),0),
				rmrk : nvl($('#rmrk').val(), ''),
				mdfcnRsn : nvl($("#insert_mdfcn_rsn").val(), ''),
				aprvSttsCd : '1', // 요청(원래는 4 수정요청이었으나 없어짐)
				aprvDmndCd : '2'  // 새로 추가된 컬럼[승인요청코드(1등록,2수정,3이관)]
			}

			if(params.coNm == null || params.coNm == '') { alert("사업자명을 입력해주세요."); return; }
			if(params.brno == null || params.brno == '') { alert("사업자번호를 입력해주세요."); return; }
			if(params.bzmnLicenseAtchSn == null || params.bzmnLicenseAtchSn == '') { alert("사업자등록증을 첨부해주세요."); return; }
			if(params.bzmnSeCd == null || params.bzmnSeCd == '') { alert("사업소종류를 선택해주세요."); return; }
			if(params.bzmnSeCd == '2') {
				if(params.upBrno == null || params.upBrno == '') { alert("주사무소를 선택해주세요."); return; }
			}
			if(params.rprsvNm == null || params.rprsvNm == '') { alert("대표자명을 입력해주세요."); return; }
			if(params.mdfcnRsn == null || params.mdfcnRsn == '') { alert("수정사유를 입력해주세요."); return; }
//			if(requestCkTf != true) { alert("사업자 번호를 중복확인 해주시기 바랍니다."); return; }
			if(confirm("수정 하시겠습니까?")) {
				if(bzmnChangeCk == false && cocosChangeCk == false) {
					$crprtInfoManage.event.updateCmpnyRequest(params);
				} else {
					if(bzmnChangeCk == true && cocosChangeCk == true) {
						// 기존 파일 지우기
						if(cocosOrigin != '' && cocosOrigin != null) {
							var paramBzmn = {fileSn : bzmnOrigin};
							var paramCocos = {fileSn : cocosOrigin};
							ajax(true, contextPath+'/cmmn/deleteFile', 'body', '처리중입니다.', paramBzmn, function (data) {});
							ajax(true, contextPath+'/cmmn/deleteFile', 'body', '처리중입니다.', paramCocos, function (data) {});
						} else {
							var paramBzmn = {fileSn : bzmnOrigin};
							ajax(true, contextPath+'/cmmn/deleteFile', 'body', '처리중입니다.', paramBzmn, function (data) {});
						}

						var formData = new FormData();
						formData.append('files', document.getElementById('bzmnDetailFileUpload').files[0]);

						fileAjax(contextPath + "/cmmn/fileUpload", formData, function (response) {
							if (response != null) {
								params.bzmnLicenseAtchSn = nvl(response.fileSn, 0);

								var formData = new FormData();
								formData.append('files', document.getElementById('coDetailFileUpload').files[0]);

								fileAjax(contextPath + "/cmmn/fileUpload", formData, function (response) {
									if (response != null) {
										params.cocosAtchSn = nvl(response.fileSn, 0);
										$crprtInfoManage.event.map(params);
										$crprtInfoManage.event.updateCmpnyRequest(params);
									}
								});
							}
						});
					} else if(bzmnChangeCk == true && cocosChangeCk == false) {
						// 기존 파일 지우기
						var paramBzmn = {fileSn : bzmnOrigin};
						ajax(true, contextPath+'/cmmn/deleteFile', 'body', '처리중입니다.', paramBzmn, function (data) {});

						var formData = new FormData();
						formData.append('files', document.getElementById('bzmnDetailFileUpload').files[0]);

						fileAjax(contextPath + "/cmmn/fileUpload", formData, function (response) {
							if (response != null) {
								params.bzmnLicenseAtchSn = nvl(response.fileSn, 0);
								$crprtInfoManage.event.map(params);
								$crprtInfoManage.event.updateCmpnyRequest(params);
							}
						});
					} else if(bzmnChangeCk == false && cocosChangeCk == true) {
						// 기존 파일 지우기
						if(cocosOrigin != '' && cocosOrigin != null) {
							var paramCocos = {fileSn : cocosOrigin};
							ajax(true, contextPath+'/cmmn/deleteFile', 'body', '처리중입니다.', paramCocos, function (data) {});
						}

						var formData = new FormData();
						formData.append('files', document.getElementById('coDetailFileUpload').files[0]);

						fileAjax(contextPath + "/cmmn/fileUpload", formData, function (response) {
							if (response != null) {
								params.cocosAtchSn = nvl(response.fileSn, 0);
								$crprtInfoManage.event.map(params);
								$crprtInfoManage.event.updateCmpnyRequest(params);
							}
						});
					}
				}
			}
		},

		map: function(roadNmAddr, type) {
			/**
			 * 주소 -> 좌표 변환
		     * @param x
		     * @param y
		     */
			var addr = roadNmAddr;
		    var deferred = $.Deferred();
		    var params = {};
		    var pickType = null;

		    type == 'R' ? pickType = 'ROAD' : pickType = 'PARCEL';

			try {
		    	var data = {
		        	service: 'address',
		            request: 'getCoord',
		            key: 'ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0',
		            type: pickType,    /* PARCEL : 지번주소, ROAD : 도로명주소 */
		            address: addr,
		            crs: 'epsg:4326',  /* WGS84 경위도 */
		            refine: false     /* 정제 처리 여부 */
				};

				$.ajax({
		        	url: "https://api.vworld.kr/req/address",
		            cache: false,
		            dataType: "jsonp",
		            jsonp: "callback",
		            contentType: "application/json",
		            data: data,
		            type: 'POST',
		            beforeSend: function () {},
		            complete: function (xhr, status) {},
		            success: function (jsonObj) {
		                if(typeof jsonObj == "object" && jsonObj != null && jsonObj != "undefined") {
		                	if(jsonObj.response.status === 'OK' && nvl(jsonObj.response.result) !== '') {
								params.lat = parseFloat(jsonObj.response.result.point.y).toFixed(7); // 위도
								params.lot = parseFloat(jsonObj.response.result.point.x).toFixed(7); // 경도
								deferred.resolve(params);
		                	} else {
								params.lat = 0; // 위도
								params.lot = 0; // 경도
								deferred.resolve(params);
		                    }
		                }
		            },
		            error: function (jxhr, textStatus) {
		            	deferred.reject(textStatus);
		            }
		        });
		    } catch (err) {
				deferred.reject(err);
		    }
		    return deferred.promise(); // 프로미스 객체 반환
		},

		// 등록 요청
		insertCmpnyRequest: function(params) {
			ajax(true, contextPath+'/sys/crprtInfoManage/insertCmpnyRequest', 'body', '처리중입니다.', params, function (data) {
				alert(data.message);
				$(".register_popup").removeClass("view");
				location.reload();
			});
		},

		// 수정 요청
		updateCmpnyRequest: function(params) {
			ajax(true, contextPath+'/sys/crprtInfoManage/updateCmpnyRequest', 'body', '처리중입니다.', params, function (data) {
				alert(data.message);
				$("#updatePopup").removeClass("view");
				location.reload();
			});
		},

		/**
	     *
	     * @name         : existData
	     * @description  : 수정 팝업에서 기존데이터 불러오기
	     * @date         : 2023. 07. 14
	     * @author       : 김경룡
	     */
		existData: function(dataUse){
			var params = {bzmnSn : dataUse};
			ajax(true, contextPath+'/sys/crprtInfoManage/callDefaultData', 'body', '처리중입니다.', params, function(data) {
				if(data.length != 0) {
					var data = data[0];
					
					// 회사 기본 정보
					$("#co_nm").val(data.coNm);
					$("#update_bzmn_sn").val(data.bzmnSn);
					$("#updateBrno").val(toBizrnoNumFormat(data.brno));
					$("#bzFileNo").val(data.bzmnLicenseAtchSn);
					$("#bzmnLicenseAtchNm").val(data.bzmnLicenseFileNm);
					$("#bzmn_se_cd_nm").data("kendoDropDownList").value(data.bzmnSeCd);
					data.bzmnSeCd == '2' ? $(".upCompanyNo").show() : $(".upCompanyNo").hide();
					data.upBrno != null ? $("#updateUpBrno").data("kendoDropDownList").value(data.upBrno) : $("#updateUpBrno").data("kendoDropDownList").value(''); 
					$("#rprsv_nm").val(data.rprsvNm);
					$("#coFileNo").val(data.cocsAtchSn);
					$("#crno").val(toCorporateNumFormat(data.crno));
					$("#cocsAtchNm").val(data.cocsLicenseFileNm);
					var day = new Date();
					if(data.bizStrtDay != null) {
						if(data.bizStrtDay.trim() != '') {
							day = data.bizStrtDay;
							var correctDay = day.substring(0, 4) +"-"+ day.substring(4, 6) +"-"+ day.substring(6, 8);
						}
					} else {
						var correctDay = dateToStr(day);
					}
					$("#biz_strt_day").data("kendoDatePicker").value(new Date(correctDay));
					
					bzmnOrigin = data.bzmnLicenseAtchSn;
					cocosOrigin = data.cocsAtchSn;
					
					// 회사 소재지 정보
					$("#ctpv_nm").data("kendoDropDownList").value(data.ctpvCd);
					$("#sgg_nm").data("kendoDropDownList").value(data.sggCd); 
					$("#road_nm_addr").val(data.roadNmAddr);
					$("#road_nm_daddr").val(data.roadNmDaddr);
					$("#lotno_addr").val(data.lotnoAddr);
					data.lat == null ? $("#location_lat").val(defaultLat.toFixed(7)) : $("#location_lat").val(data.lat.toFixed(7));
					data.lot == null ? $("#location_lot").val(defaultLng.toFixed(7)) : $("#location_lot").val(data.lot.toFixed(7));
					$("#garage_road_nm_addr").val(data.garageRoadNmAddr);
					$("#garage_road_nm_daddr").val(data.garageRoadNmDaddr);
					
					// 회사 상태 정보
					$("#bsn_stts_cd_nm").data("kendoDropDownList").value(data.bsnSttsCd);
					var sttsDay = new Date();
					if(data.bsnSttsMdfcnDt != null) {
						if(data.bsnSttsMdfcnDt.trim() != '') {
							sttsDay = data.bsnSttsMdfcnDt;
							var sttsCorrectDay = sttsDay.substring(0, 4) +"-"+ sttsDay.substring(4, 6) +"-"+ sttsDay.substring(6, 8);
						}
					} else {
						var sttsCorrectDay = dateToStr(sttsDay);
					}
					$("#bsn_stts_mdfcn_dt").data("kendoDatePicker").value(new Date(sttsCorrectDay));
					$("#telno").val(data.telno);
					$("#oper_bgng_dt").val(data.operBgngDt); $("#oper_end_dt").val(data.operEndDt);
					$("#vhcl_reg_noh").val(data.vhclRegNoh);
					$("#sedn_car_noh").val(data.carNoh);
					$("#pass_vhcle_noh").val(data.vanNoh);
					$("#elec_sedn_car_noh").val(data.elctyCarNoh);
					$("#elec_pass_vhcle_noh").val(data.elctyVanNoh);
					$("#rmrk").val(data.rmrk);
					$("#mdfcn_rsn").val(data.mdfcnRsn);
					
					var mapId = "crprt_coord_map";
					$crprtInfoManage.ui.mapView(mapId, data.lat, data.lot);
					
//					$crprtInfoManage.event.rightBtnClick();
				} else {
					alert("내 기업정보가 존재하지 않습니다.");
					$("#updatePopup").removeClass('view');
					$("body").css("overflow", "auto");
					return;
				}
			});
			ajax(true, contextPath+'/sys/crprtInfoManage/requestAprvStts/', 'body', '처리중입니다.', params, function(data) {
				if(data.length != 0) {
					$(".updateBtn_btn").css("background-color", "#DEDEDE");
					$(".updateBtn_btn").css("color", "#000");
					$(".updateBtn_btn").attr("disabled", true);
					setTimeout(function() {alert("수정요청 건이 존재합니다.\n승인 또는 반려 처리 후 수정요청이 가능합니다.");}, 50);
				}
			});
			
			$("#updatePopup").addClass("view");
			$("body").css("overflow", "hidden");
		},

		/**
	     * @name         : rightBtnClick
	     * @description  : 맵에서 우클릭 시, 마커 찍기
	     * @date         : 2023. 09. 08
	     * @author       : 김경룡
	     */
		rightBtnClick: function(){
			setMap.on('contextmenu', function(event) {
			    // 우클릭한 위치의 좌표
			    var latlng = event.latlng;
			
			    // 마커를 생성하고 지도에 추가
			    if(marker != null) {
					setMap.removeLayer(marker);
					marker = null;
				}
			    marker = L.marker([latlng.lat, latlng.lng]).addTo(setMap);
//			    marker.bindPopup("위도: " + latlng.lat.toFixed(6) + "<br>경도: " + latlng.lng.toFixed(6));

				// 위도/경도 주입
//				$("#location_lat").val(latlng.lat.toFixed(7));
//				$("#location_lot").val(latlng.lng.toFixed(7));
			});
		},

		/**
	     * @name         : addrDialogOpen
	     * @description  : 주소찾기 팝업창
	     * @date         : 2023. 09. 12
	     * @author       : 김경룡
	     */
		addrDialogOpen: function() {
			var addr = fnCreateDialog("addrDialog");
			var addrCont = '<div id="addr-wrap" style="border-top: 2px solid #226882;"></div>';

			addr.kendoDialog({
				width: "528px",
				title: "주소 검색",
				closable: true,
				modal: true,
				content: addrCont,
				close: function() {}
			});
			addr.data("kendoDialog").open();

			// 주소 모달 위치 조정
			var top = Number($('#insertPopup').parent().css('top').replace('px', '') + 10)+'%';
			var left = Number($('#insertPopup').parent().css('left').replace('px', '') + 36)+'%';

			$('#addrDialog').parent().css("top", top);
			$('#addrDialog').parent().css("left", left);
		},

		/**
	     * @name         : addrFindRoad
	     * @description  : 주소찾기 시, Postcode 로직
	     * @date         : 2023. 09. 12(함수화)
	     * @author       : 김경룡
	     */
		addrFindRoad: function(lat, lng, ctpvNm, sggNm, roadNm, lotno) {
			var wrap = document.getElementById('addr-wrap');
			new daum.Postcode({
				oncomplete: function(data) {
					var fullBcode = data.bcode; // 최종 주소 코드
					var dataType = data.addressType;
					var ctpvCd = ''; // 시도
					var stdgCd = ''; // 시구군
					var fullAddr = data.address; // 도로명 주소
					
					// 시도 / 시군구
					if(fullBcode != null) {
						ctpvCd = fullBcode.substr(0, 2);
						if(ctpvCd == '36') {
							stdgCd = '3611000000'
						} else {
							stdgCd = fullBcode.substr(0, 5)+'00000';
						}
					}

					$crprtInfoManage.event.map(fullAddr, dataType).then(function(map) {
						$(lat).val(map.lat);
						$(lng).val(map.lot);
						if(marker != null) {
							setMap.removeLayer(marker);
							marker = null;
						}
						marker = L.marker([map.lat, map.lot]).addTo(setMap);
						setMap.setView(marker.getLatLng(), 18);
					});
					
					$(ctpvNm).data("kendoDropDownList").value(ctpvCd);
					$(sggNm).data("kendoDropDownList").value(stdgCd);

					$(roadNm).val(data.roadAddress);
					$(lotno).val(data.jibunAddress != '' ? data.jibunAddress : data.autoJibunAddress);

				    $('#addrDialog').data("kendoDialog").close();
				}
			}).embed(wrap);
		},

		addrGrg: function(inputId) {
			var wrap = document.getElementById('addr-wrap');
			new daum.Postcode({
				oncomplete: function(data) {
				    $(inputId).val(data.roadAddress);
				    $('#addrDialog').data("kendoDialog").close();
				}
			}).embed(wrap);
		},

		/**
	     * @name         : prcssBtnClick
	     * @description  : 승인/반려/장기미접속버튼 클릭
	     * @date         : 2023. 10. 1
	     * @author       : 김경룡
	     */
		prcssBtnClick: function() {
			// 승인버튼
			$('.approve_btn').on("click", function() {
				if(confirm("승인 하시겠습니까?")) {
					ajax(true, contextPath+'/sys/crprtInfoManage/approveBtn', 'body', '처리중입니다.', userSnParam, function(data) {
						alert("승인 처리가 완료되었습니다");
						$(".detailPop_close").click();
					});
					location.reload();
				}
			});
			// 반려버튼
			$('.reject_btn').on("click", function() {
				if($("#rjrs_div").hasClass("vOff")) {
					$("#rjrs_div").show();
					$("#rjrs_div").removeClass("vOff");
				} else {
					$("#rjrs_div").hide();
					$("#rjrs_div").addClass("vOff");
				}
			});
			// 반려확인버튼
			$('#reject_agree').on("click", function() {
				clickParams = {};
				var rejectInput = $("#rejection_reason").val();
				
				if(rejectInput == null || rejectInput == '') {
					alert("반려사유를 입력하세요");
				} else {
					clickParams = {
						"uSn"       : selectedItem.user_sn,
						"rejectRsn" : rejectInput
					};
					if(confirm("반려 하시겠습니까?")) {
						ajax(true, contextPath+'/sys/crprtInfoManage/rejectBtn', 'body', '처리중입니다.', clickParams, function(data) {
							alert("반려 처리가 완료되었습니다");
							$(".detailPop_close").click();
							$("#rjrs_div").hide();
						});
						location.reload();
					}
				}
			});
			// 장기미접속해제버튼
			$(".disconnect_btn").on("click", function() {
				if(confirm("장기미접속해제 하시겠습니까?")) {
					ajax(true, contextPath+'/sys/crprtInfoManage/disconnBtn', 'body', '처리중입니다.', userSnParam, function(data) {
						alert("장기미접속해제 처리가 완료되었습니다.");
						$(".detailPop_close").click();
					});
					location.reload();
				}
			});
			// 삭제버튼
			$(".delete_btn").on("click", function() {
				if(confirm("사용자 계정을 삭제 하시겠습니까?")) {
					ajax(true, contextPath+'/sys/crprtInfoManage/deleteBtn', 'body', '처리중입니다.', userSnParam, function(data) {
						alert("사용자 계정 삭제가 완료되었습니다.");
						$(".detailPop_close").click();
					})
					location.reload();
				}
			});
		},
		
		/**
	     * @name         : tabClick
	     * @description  : tab 버튼 클릭
	     * @date         : 2023. 11. 01
	     * @author       : 김경룡
	     */
		tabClick: function(e) {
			if(!$(e.target).hasClass("tabCk")) {
				$(e.target).addClass("tabCk");
				if(e.target.id == "tab1") {
					$("#tab2").removeClass("tabCk");
					$(".crprtSelf").show();
					$(".crprtUser").hide();
					if(!authList.includes(authrtCd)) {
						$("#insertBtnDiv").hide();
					}
				} else if(e.target.id == "tab2") {
					$("#tab1").removeClass("tabCk");
					$(".crprtSelf").hide();
					$(".crprtUser").show();
				}
			}
		},

		/**
	     * @name         : masking
	     * @description  : 개인정보 마스킹처리
	     * @date         : 2024. 05. 21
	     * @author       : 김경룡
	     */
		masking: function(str) {
			var frontPart = null;
			var maskedPart = null;
			
			if(str.indexOf("@") == -1) {
				frontPart = str.substring(0, str.length - str.length/3);
			    maskedPart = '*'.repeat(str.length/3);
			} else if(str.length == 2) {
				frontPart = str.substring(0, 1);
			    maskedPart = '*'.repeat(1);
			} else {
				frontPart = '*'.repeat(str.length/3);
			    maskedPart = str.substring(str.length/3, str.length);
			}
		    
		    return frontPart+maskedPart;
		}
    };

}(window, document, jQuery));