/**
 * 사업자관리
 *
 * history : 네이버시스템(주), 1.0, 2023/06/05  초기 작성
 * author : 허윤정
 * version : 1.0
 * 
 * history : 네이버시스템(주), 1.1, 2023/10/01 개선 작업
 * modifier : 김경룡
 * version : 1.1
 *
 */
(function(W, D, $) {
	'use strict';
	
	W.$cmpnymanage = W.$cmpnymanage || {};

	var bzmnSn = '';
	var rowStts = '';
	var transferNo = false;
	var bzFileCkd = false;
	var coFileCkd = false;
	var detailParms = {};
	var map, map2, map3 = '';
	var marker = '';
	var maxZoomLevel = 18;
	
	var carCrno = null;
	
	var excelDownArc = {};

	$(document).ready(function() {
		kendo.ui.progress($(document.body), true);
		
		$cmpnymanage.ui.pageLoad();		//최초 페이지 로드 시
		$cmpnymanage.event.setUIEvent();
	});

	$cmpnymanage.ui = {
		pageLoad: function() {
			
			// Z01관리자, K01교통안전공단, D01개발자
			if(authrtCd == "Z01" || authrtCd == "K01" || authrtCd == "D01") {
				$cmpnymanage.ui.searchAdmin(); //검색조건
				$('.insertPopupBtn').show();
				$('.admin').show();
				$('.g01').hide();
				$('.g01Arv').show();
				$("#biz_strt_day").removeClass("input readOnlyGrayBtn")
				$("#biz_strt_day").removeAttr("readOnly");
				$("#biz_strt_day").kendoDatePicker({
					value: new Date(),
					dateInput: true,
					format: "yyyy-MM-dd",
					max: new Date()
				});

				// M01 국토부
			} else if(authrtCd == "M01") {
				$cmpnymanage.ui.searchAdmin(); //검색조건
				$('.insertPopupBtn').hide();
				$('.admin').hide();
				$('.country').hide();
				$('.g01').show();
				$('.g01Arv').hide();
				
				// G01 지자체
			} else if(authrtCd == "G01") {
				$cmpnymanage.ui.searchG01(); //검색조건
				$('.insertPopupBtn').show();
				$('.admin').hide();
				$('.g01').show();
				$('.g01Arv').show();
				$("#biz_strt_day").removeClass("input readOnlyGrayBtn")
				$("#biz_strt_day").removeAttr("readOnly");
				$("#biz_strt_day").kendoDatePicker({
					value: new Date(),
					dateInput: true,
					format: "yyyy-MM-dd",
					max: new Date()
				});
				
				// G02 대여사업자조합
			} else if(authrtCd == "G02") {
				$cmpnymanage.ui.searchG01(); //검색조건
				$('.insertPopupBtn').hide();
				$('.admin').hide();
				$('.country').hide();
				$('.g01').show();
				$('.g01Arv').hide();

				// S01 주사무소, S02 영업소(예약소)
			} else if(authrtCd == "S01" || authrtCd == "S02") {
				$cmpnymanage.ui.searchG01();
				$('.admin').hide();
				$('.insertPopupBtn').hide();
				$('.g01').show();
				$('.g01Arv').hide();
			}

			// 사업자 관리 목록 그리드
			$cmpnymanage.ui.companyManageInfo();
			// 사용자현황 그리드
			$cmpnymanage.ui.userCarPopGrid();
			
			// 상태변경일시
			$("#bsn_stts_mdfcn_dt").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				max: new Date()
			});
			
			$cmpnymanage.event.insertMap();				 // 등록팝업 지도 조기화
			$cmpnymanage.event.detailMap1();			 // 상세팝업 지도 조기화 (수정가능팝업)
			$cmpnymanage.event.detailMap2();			 // 상세팝업 지도 조기화 (수정불가능팝업)
		},

		// 검색옵션
		searchAdmin: function() {
			var param = {};

			// 시도 및 시군구
			var ctId = "#searchCtpvNm";
			var sggId = "#searchSggNm"
			$cmpnymanage.comm.ctSggDropDown(param, ctId, sggId);

			// 승인상태
			$cmpnymanage.ui.aprvSttsDropDown(param);

			// 영업상태
			var divId = "#searchBsnStts";
			$cmpnymanage.ui.bsnSttsDropDown(param, divId);
			
			// 권한
			$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/companyManage/authSelected', 'body', '처리중입니다.', param, function(data) {
				$("#authSelected").kendoDropDownList({
					optionLabel: "권한(전체)",
					dataTextField: "cd_nm",
					dataValueField: "cd",
					dataSource: data,
					value: "cd"
				});
			});
			
			// 조건선택
			$cmpnymanage.ui.selectCond();
			
			// 삭제여부
			$cmpnymanage.ui.delYn();
		},

		// 검색옵션
		searchG01: function() {
			var param = {
				regCmptncCd: getCmptncZoneCd,
				searchAprvStts : '',
				searchBsnStts  : '',
				authSelected   : ''
			};
			
			// 시도(원본)
			$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/companyManage/ctpvNm', 'body', '처리중입니다.', param, function(data) {
				$("#searchCtpvNm").kendoDropDownList({
					dataTextField: "ctpv_nm",
					dataValueField: "ctpv_cd",
					dataSource: data,
					value: "ctpv_nm"
				});
			});
			// 시도(지자체 개선본)
			/*$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/companyManage/ctpvNm', 'body', '처리중입니다.', {}, function(data) {
				var g01CtDrop = $("#searchCtpvNm").kendoDropDownList({
					optionLabel: "시군구(전체)",
					dataTextField: "ctpv_nm",
					dataValueField: "ctpv_cd",
					dataSource: data,
					value: "ctpv_nm",
					change: function() {
						if(this.value() == '') {
							$("#searchSggNm").data("kendoDropDownList").setDataSource(null);
						} else {
							var deparam = {}
							deparam.ctpvCd = this.value();
							$cmpnymanage.comm.syncAjax(true, true, contextPath + '/sys/companyManage/sggNm', 'body', '처리중입니다.', deparam, function(data) {
								$("#searchSggNm").kendoDropDownList({
									optionLabel: "시군구(전체)",
									dataTextField: "sgg_nm",
									dataValueField: "stdg_cd",
									dataSource: data,
									value: "sgg_nm"
								});
							});
						}
					}
				}).data("kendoDropDownList");
				
				
				$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/companyManage/ctpvNm', 'body', '처리중입니다.', param, function(data) {
					g01CtDrop.value(data[0].ctpv_cd)
				});
			});*/

			// 시군구
			if (param.regCmptncCd == "3611000000") { // 세종특별자차시
				$("#searchSggNm").kendoDropDownList({
					optionLabel: "시군구(전체)"
				});
			} else if(param.regCmptncCd.substring(2, param.regCmptncCd.length) == "00000000") { // 광역지자체
				param.ctpvCd = param.regCmptncCd.substring(0, 2);
				param.regCmptncCd = '';
				$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/company/selectSggNm', 'body', '처리중입니다.', param, function(data) {
					$("#searchSggNm").kendoDropDownList({
						optionLabel: "시군구(전체)",
						dataTextField: "sgg_nm",
						dataValueField: "stdg_cd",
						dataSource: data,
						value: "sgg_nm"
					});
				});
			} else {
				// 원본
				$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/company/selectSggNm', 'body', '처리중입니다.', param, function(data) {
					$("#searchSggNm").kendoDropDownList({
						dataTextField: "sgg_nm",
						dataValueField: "stdg_cd",
						dataSource: data,
						value: "sgg_nm"
					});
				});
				/*var sggParams = {};
				sggParams.ctpvCd = param.regCmptncCd.substring(0, 2);
				$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/company/selectSggNm', 'body', '처리중입니다.', sggParams, function(data) {
					var g01SggDrop = $("#searchSggNm").kendoDropDownList({
						optionLabel: "시군구(전체)",
						dataTextField: "sgg_nm",
						dataValueField: "stdg_cd",
						dataSource: data,
						value: "sgg_nm"
					}).data("kendoDropDownList");
					
					$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/company/selectSggNm', 'body', '처리중입니다.', param, function(data) {
						g01SggDrop.value(data[0].stdg_cd)
					});
				});*/
			}

			// 승인상태
			$cmpnymanage.ui.aprvSttsDropDown(param);

			// 영업상태
			var divId = "#searchBsnStts";
			$cmpnymanage.ui.bsnSttsDropDown(param, divId);

			// 권한
			$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/companyManage/authSelected', 'body', '처리중입니다.', param, function(data) {
				$('#authSelected').kendoDropDownList({
					optionLabel: "권한(전체)",
					dataTextField: "cd_nm",
					dataValueField: "cd",
					dataSource: data,
					value: "cd"
				});
			});
			
			// 조건선택
			$cmpnymanage.ui.selectCond();
			
			// 삭제여부
			$cmpnymanage.ui.delYn();
		},

		// 지자체 이관 옵션
		searchTransfer: function() {
			var param = {};
			
			// 시도 및 시군구
			var ctId = "#ctpv";
			var sggId = "#sgg";
			$cmpnymanage.comm.ctSggDropDown(param, ctId, sggId);
		},

		// 상세 팝업
		detailSearch: function() {
			var param = {};
			
			// 지역 및 지자체
			var ctId = "#cmptncCtpvnm_admin";
			var sggId = "#cmptncSggnm_admin";
			$cmpnymanage.comm.ctSggDropDown(param, ctId, sggId);

			// 사업소종류
			$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/companyManage/bzmnSe', 'body', '처리중입니다.', param, function(data) {
				$('#bzmn_se_cd_nm').kendoDropDownList({
					optionLabel: "사업소종류(선택)",
					dataTextField: "cd_nm",
					dataValueField: "cd",
					dataSource: data,
					value: "cd_nm",
					change: function() {
						param.cd = this.value();
						if (param.cd == '2') {
							$(".up_brno1").show();
						} else {
							$(".up_brno1").hide();
						}
					}
				});
			});

			// 주사무소 사업자번호
			$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/companyManage/upBrno', 'body', '처리중입니다.', param, function(data) {
				$('#up_brno').kendoDropDownList({
					filter: "contains",
					optionLabel: "주사무소(선택)",
					dataTextField: "up_brno",
					dataValueField: "bzmn_sn",
					dataSource: data,
					value: "up_brno"
				});
			});

			// 영업상태
			var divId = "#bsn_stts_cd_nm";
			$cmpnymanage.ui.bsnSttsDropDown(param, divId);
		},
		
		// 등록팝업
		insertSearch: function() {
			var param = {
				"sttsInsertCont": "sttsDrop"
			};

			// 등록지역 및 등록지자체
			var ctId = "#adminCmptncZoneCdCtpvNm";
			var sggId = "#adminCmptncZoneCdSggNm";
			$cmpnymanage.comm.ctSggDropDown(param, ctId, sggId);

			// 사업소종류
			$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/companyManage/bzmnSe', 'body', '처리중입니다.', param, function(data) {
				$('#bzmnSeCd').kendoDropDownList({
					optionLabel: "사업소종류(선택)",
					dataTextField: "cd_nm",
					dataValueField: "cd",
					dataSource: data,
					value: "cd_nm",
					change: function() {
						param.cd = this.value();
						if (param.cd == '2') {
							$(".upCompanyNo").show();
						} else {
							$(".upCompanyNo").hide();
						}
					}
				});
			});

			// 주사무소 사업자번호
			$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/companyManage/upBrno', 'body', '처리중입니다.', param, function(data) {
				$('#insertUpBrno').kendoDropDownList({
					filter: "contains",
					optionLabel: "주사무소(선택)",
					dataTextField: "up_brno",
					dataValueField: "bzmn_sn",
					dataSource: data,
					value: "up_brno"
				});
			});

			// 사업게시일
			$("#bizStrtDay").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				max: new Date()
			});

			// 영업상태
			var divId = "#bsnStts";
			$cmpnymanage.ui.bsnSttsDropDown(param, divId);

			// 상태변경일시
			$("#bsnSttsMdfcnDt").kendoDatePicker({
				value: new Date(),
				dateInput: true,
				format: "yyyy-MM-dd",
				max: new Date()
			});

		},

		// 사업자 관리 목록
		companyManageInfo: function() {
			$("#cmpnymanageGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sys/companyManage/selectCompanyManageInfo',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							var param = $cmpnymanage.event.filter();
							if(param.regCmptncCd.substring(2, param.regCmptncCd.length) == '00000000') {
								options.regCmptncCd = param.regCmptncCd.substring(0, 2);
							} else {
								options.regCmptncCd = param.regCmptncCd;
							}
							options.bzmnSn         = param.bzmnSn;
							options.brno           = param.brno;
							options.stdgCd         = param.regCmptncCd;
							options.searchAprvStts = param.searchAprvStts;
							options.searchBsnStts  = param.searchBsnStts;
							options.authSelected   = param.authSelected;
							options.selectCond     = param.selectCond;
							options.searchWrd      = param.searchWrd;
							options.searchChk      = param.searchChk;
							options.authrtCd       = authrtCd;
							options.delYn            = param.delYn;
							
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
					{ field: "rn", title: "순번", width: "50px", template: "#: rn #", sortable: false },
					{ field: "co_nm", title: "회사명", width: "150px", template: "#= co_nm != null ? co_nm : '-' #", sortable: true },
					{ field: "bzmn_se_cd_nm", title: "권한", width: "100px", 	template: "#= bzmn_se_cd_nm != null ? bzmn_se_cd_nm : '-' #", sortable: false},
					{ field: "brno", title: "사업자등록번호", width: "120px", template: "#= (brno != null && brno != '          ' ) ? brno : '-' #", sortable: false },
					{ field: "crno", title: "법인등록번호", width: "130px", template: "#= (crno != null && crno != '             ' ) ? crno : '-' #", sortable: false },
					{ field: "aprv_stts_cd_nm", title: "승인상태", width: "60px", template: "#= aprv_stts_cd_nm != null ? aprv_stts_cd_nm : '-' #", sortable: false },
					{ field: "bsn_stts_cd_nm", title: "영업상태", width: "60px", template: "#= bsn_stts_cd_nm != null ? bsn_stts_cd_nm : '-' #", sortable: false },
					{ field: "road_nm_addr", title: "주소", width: "200px", template: "#= (road_nm_addr != null && road_nm_addr != ' ' && road_nm_addr != '') ? road_nm_addr : '-' #", sortable: false },
					{ field: "telno", title: "연락처", width: "100px",
					  template: "# if( (telno != null && telno != '')) {"
										+"if(telno.substring(0, 1) !== '0') {##= '0' + telno##} else {##=telno ##}"
								+"} else {##= '-' ##}#", sortable: false
					},
					{ field: "jurisdiction", title: "관할지", width: "100px", template: "#= jurisdiction != ' ' ? jurisdiction : '-' #", sortable: false },
					{ field: "locgov", title: "소재지", width: "100px", template: "#= locgov != ' ' ? locgov : '-' #", sortable: false },
					{ field: "user_cnt", title: "가입자수", width: "60px", template: "#= user_cnt != null ? user_cnt : '0' #", sortable: false },
					{
						field: "bzmn_se_cd_nm", title: "<div style='font-size: 12px;'>주사무소 현황 /<br />영업소 현황</div>", width: "90px",
						template: "# if( bzmn_se_cd_nm == '주사무소'){#"
										+"<button class='gray_btn' style='width: 80px; height: 25px;' onClick='javascript:$cmpnymanage.event.issued(`1`, `#:bzmn_sn#`);'> #='영업소'# </button>" 
									+"#} else {#" 
										+"<button class='gray_btn' style='width: 80px; height: 25px;' onClick='javascript:$cmpnymanage.event.issued(`2`, `#:up_brno#`);'> #='주사무소'# </button>" 
									+"#}#", 
						sortable: false
					},
					{
						field: "bzmn_se_cd_nm", title: "사용자 현황", width: "90px",
						template: "# if(aprv_stts_cd == '2') {#"
										+"<button class='gray_btn' style='width: 80px; height: 25px;' onClick='javascript:$cmpnymanage.event.ucPopup(`1`, `#:bzmn_sn#`)'>상세보기</button>"
									+"#} else {##='-'##}#", 
						sortable: false
					},
					{
						field: "bzmn_se_cd_nm", title: "차량 현황", width: "90px",
						template: "# if(aprv_stts_cd == '2') {#"
										+"<button class='gray_btn' style='width: 80px; height: 25px;' onClick='javascript:$cmpnymanage.event.ucPopup(`2`, `#:bzmn_sn#`, `#:crno #`)'>상세보기</button>"
									+"#} else {# #='-'##}#",
						sortable: false
					},
				],
				navigatable: true,
				scrollable: true,
				pageable: {
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				editable: false,
				resizable: true,
				selectable: "row",
				dataBound: function(e) {
					kendo.ui.progress($(document.body), false);
				},
				change: $cmpnymanage.ui.rowClickEvent
			});
		},

		// row 상세팝업
		rowClickEvent: function(e) {
			kendo.ui.progress($("#cmpnymanageGrid"), true);
			
			var rows = e.sender.select();
			var dataItem = null;
			
			rows.each(function() {
				var grid = $("#cmpnymanageGrid").data("kendoGrid");
				dataItem = grid.dataItem(this);
			});
            var ReqestBsnSttsCd = dataItem.bsn_stts_cd;
            var ReqestBsnSttsNm = dataItem.bsn_stts_cd_nm;
			bzmnSn = dataItem.bzmn_sn;
			rowStts = dataItem.aprv_stts_cd_nm;
			$cmpnymanage.ui.detailSearch(); // 상세팝업 드롭다운 데이터 주입

            // row클릭시 사업자 상태 조회 - DB 저장 - 갱신된 정보로 상세정보 출력
            var brno = dataItem.brno;

            var responseData = {} ;
            responseData.brno = brno;
            responseData.bzmnSn = bzmnSn;
            var master = '';
            var hsParams = {};

         ajax(true, contextPath + '/sys/companyManage/selectCmpnyDetailInfo', 'body', '처리중입니다.', responseData, function(data) {
             master = data.master;
            if(master !== null && master !== ' ' && master !== '' && master !== undefined){ // 마스터 일때만 히스토리 저장
                detailParms = data;
                hsParams = $cmpnymanage.event.hsParamsFn(); // 히스토리입력 데이터
                hsParams =  $cmpnymanage.event.updateTrim(hsParams); // input창 공백제거
                master = data.master;
            }
            $cmpnymanage.event.detailPopup(bzmnSn, rowStts);
              //===================== openApi를 이용한 회사상태 업데이트 server 에서 openApi 요청하는 로직  ===========
              // 마스터, 승인상태 일때만 openApi를 이용한 회사상태 업데이트 및 히스토리 저장
            if(rowStts == '승인' ){
                            $cmpnymanage.event.updateCmpnyBrno(master,responseData,hsParams);
                            $cmpnymanage.event.detailPopup(bzmnSn, rowStts);
            }
             //=================================================================================================
          });

         },


         /**
         *
         * @name         : userCarPopGrid
         * @description  : 사용자현황 / 차량현황 그리드
         * @date         : 2023. 11. 28
         * @author       : 김경룡
         */
		userCarPopGrid: function() {
			// 사용자 현황
			$("#compUserTable").kendoGrid({
				dataSource: null,
				columns: [
					{template: "#=sn #", title: "순번", width: 50, field: "sn"},
					{template: "#=userNm #", title: "이름", field: "userNm"},
					{template: "#=userId #", title: "아이디", field: "userId"},
					{template: "#=sttsCd #", title: "계정상태", field: "sttsCd"},
					{template: "#=authrtNm #", title: "권한명", field: "authrtNm"},
					{template: "#=userSn #", title: "일련번호", field: "userSn"},
					{template: "#=regDt #", title: "가입일", field: "regDt"},
//					{template: "<button class='gray_btn' style='width: 80px; height: 20px;' onClick='confirm(`사용자 관리 페이지로 이동합니다. \n수정하시겠습니까?`)'>수정</button>",
////								"<button class='gray_btn' style='width: 80px; height: 20px;' onClick='javascript:$cmpnymanage.event.ucPopup(`2`)'>상세보기</button>"
//								title: "수정하기", field: "etc"
//					},
				],
				navigatable: true,
				pageable: { buttonCount: 5 },
				noRecords: { template: "데이터가 없습니다." },
				scrollable: false,
				editable: false,
				resizable: true,
				selectable: "row"
			});$
			// 차량 현황
			$("#compCarTable").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sys/companyManage/findCarCmp',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							options.crno = carCrno;
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
					{template: "#=sn #", title: "순번", width: 50, field: "sn"},
					{template: "#=vhclRegNo #", title: "차량등록번호", width: 140, field: "vhclRegNo"},
					{template: "#=vin #", title: "차대번호", width: 200, field: "vin"},
					{template: "#=carmdl #", title: "차종", field: "carmdl"},
					{template: "#=vhclNm #", title: "차명", field: "vhclNm"},
					{template: "#=modelYear #", title: "연식", field: "modelYear"},
					{template: "#=useYn #", title: "사용여부", field: "useYn"},
					{template: "#=sttscd #", title: "차량상태", field: "sttscd"},
					{template: "#=prcsSttsCd #", title: "결함여부", field: "prcsSttsCd"},
					{template: "#=regDt #", title: "최초등록일", width: 130, field: "regDt"},
				],
				navigatable: true,
				pageable: {buttonCount: 5, pageSize:10},
				noRecords: { template: "데이터가 없습니다." },
				scrollable: false,
				editable: false,
				resizable: true,
				selectable: "row",
				dataBound: function() {
					$("#carCnt").text("총 "+ this.dataSource.total().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +"대")
				}
			});
		},

		// 엑셀다운로드
		excelDown: function() {
			var fileNm = 'companyManage';
			var param = $cmpnymanage.event.filter();
			var totalRowCount = $("#cmpnymanageGrid").data("kendoGrid").dataSource.total();

			if(totalRowCount == 0) {
				alert("데이터가 존재하지 않습니다.");
			} else {
				if(Object.keys(excelDownArc).length === 0) {
					excelDownArc.authrtCd = authrtCd;
					excelDownArc.stdgCd = param.regCmptncCd;
					excelDownArc.regCmptncCd = param.regCmptncCd;
					excelDownArc.searchAprvStts = "2";
					excelDownArc.searchBsnStts = "0";
					excelDownArc.searchChk = "jurisdiction";
				}

				excelDown("/sys/companyManage/excelDown", excelDownArc, fileNm, totalRowCount);
			}
		},

		/**
         *
         * @name         : aprvSttsDropDown
         * @description  : 승인상태 드롭다운
         * @date         : 2024. 03. 22
         * @author       : 김경룡
         */
		aprvSttsDropDown: function(param) {
			$cmpnymanage.comm.syncAjax(false, true, contextPath + "/sys/companyManage/aprvStts", "body", "처리중입니다.", param, function(data) {
				$("#searchAprvStts").kendoDropDownList({
					optionLabel: "승인상태(전체)",
					dataTextField: "cd_nm",
					dataValueField: "cd",
					dataSource: data,
					value: "cd_nm"
				});

				var searchAprvStts = $("#searchAprvStts").data("kendoDropDownList");
				searchAprvStts.select(2);
			});
		},

		/**
         *
         * @name         : bsnSttsDropDown
         * @description  : 영업상태 드롭다운
         * @date         : 2024. 03. 22
         * @author       : 김경룡
         */
		bsnSttsDropDown: function(param, divId) {
			$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/companyManage/searchBsnStts', 'body', '처리중입니다.', param, function(data) {
				if(divId == "#bsn_stts_cd_nm") {
					$(divId).kendoDropDownList({
						optionLabel: "영업상태(전체)",
						dataTextField: "cd_nm",
						dataValueField: "cd",
						dataSource: data,
						value: "cd_nm"
					});
				} else {
					$(divId).kendoDropDownList({
						optionLabel: "영업상태(전체)",
						dataTextField: "cd_nm",
						dataValueField: "cd",
						dataSource: data,
						value: "cd_nm"
					});

					var bsnStts = $(divId).data("kendoDropDownList");
					bsnStts.select(1);
				}
			});
		},
		
		/**
         *
         * @name         : selectCond
         * @description  : 조건선택 드롭다운
         * @date         : 2024. 07. 05
         * @author       : 김경룡
         */
		selectCond: function() {
			$("#selectCond").kendoDropDownList({
				optionLabel: "조건선택",
				dataTextField: "text",
				dataValueField: "value",
				dataSource: [
					{value: "1", text: "회사명"},
					{value: "2", text: "사업자등록번호"},
					{value: "3", text: "법인등록번호"}
				],
				value: "value"
			});
		},
		
		/**
         *
         * @name         : delYn
         * @description  : 조건선택 드롭다운
         * @date         : 2024. 07. 05
         * @author       : 김경룡
         */
		delYn: function() {
			$('#delYn').kendoDropDownList({
				optionLabel: "삭제여부(전체)",
				dataTextField: "text",
				dataValueField: "value",
				dataSource: [
					{value: "Y", text: "삭제"},
					{value: "N", text: "미삭제"},
				],
				value: "value"
			});
			var delYn = $('#delYn').data("kendoDropDownList");
			delYn.select(2);
			
		}		
	};

	//이벤트 정의
	$cmpnymanage.event = {

		setUIEvent: function() {
			$("#searchAprvStts").on('change', function(e) {
        		selectedAprvStts = $(this).val();
        	});



//			$cmpnymanage.ui.rowClickEvent();
			// 엔터키 검색 함수
			$("#searchWrd").on('keydown', function(e) {
				if(e.key === 'Enter') {$('.searchBtn').click();}
			});

			// 엑셀다운로드버튼
			$(".excelDownBtn").on("click", function() {
				$cmpnymanage.ui.excelDown();
			});

			// 검색 버튼
			$cmpnymanage.event.searchClick();

			// 등록 팝업 X, 닫기 버튼
			$(".insertClose").on("click", function() {
				location.reload();
        	});

			// 상세 팝업 X, 닫기 버튼
			$(".detailClose").on("click",function(){
                var grid = $("#cmpnymanageGrid").data("kendoGrid");
                grid.dataSource.read();
                $("#businessStatus").html("");
				$("#insert_mdfcn_rsn").val('');  // 수정사유 입력 input 초기화
				$("#cmpnymanageGrid").data("kendoGrid").clearSelection();  // 상세보기 팝업창 닫았을 때, select 해제
                $('#transferBtn').text('지자체 이관요청');
                $('#transferBtn').css('background-color', '#00127B');
				// datePicker 변경 상태에서 다시 readOnly로
//				$("#bsn_stts_mdfcn_dt").data("kendoDatePicker").readonly(true);
//			    $("#bsn_stts_mdfcn_dt").addClass("readOnlyGrayBtn");
//			    $('.sub03 .readOnlyGrayBtn .k-input-button').css('background-color', '#f5f5f5');

			    // 스크롤 바 최상단으로 이동
			    $(".scrollBar02").scrollTop(0);
			    $("body").css("overflow", "auto");
			});

			// 권한 주사무소 버튼 팝업 X, 닫기 버튼
			$(".subcontract").on("click", function() {
				$("#brnoCnt").empty();
				$("#compUser").hide();
				$("#compUser").removeClass("view");
				$("#compCar").hide();
				$("#compCar").removeClass("view");
				$("body").css("overflow", "auto");
			});

			// 등록팝업 버튼
			$(".insertPopupBtn").on("click", function() {
//				map.invalidateSize();
				$cmpnymanage.ui.insertSearch(); // 등록팝업
				$(".register_popup").addClass("view");
				$("body").css("overflow", "hidden");
				if (authrtCd === 'G01') {
					var params = { stdgCd: getCmptncZoneCd };
					ajax(false, contextPath + '/sys/companyManage/area', 'body', '처리중입니다.', params, function(data) {
						$('#cmptncZoneCdCtpvNm').val(data.ctpvNm);
						$('#cmptncZoneCdSggNm').val(data.sggNm);
					});
				}
			});

			// 등록팝업 - 등록버튼
			$(".insertBtn").on("click", function() {
				$cmpnymanage.event.insertBtn();
			});

			// 등록팝업 - 사업자등록증 파일 업로드
			$('.bzmnFileUpload').on("click", function() {
				$("#bzFileUpload").click();
				$("#bzFileUpload").change(function() {
					var ext = $("#bzFileUpload").val().split(".").pop().toLowerCase();
					var files = ["jpg", "jpeg", "gif", "png", "pdf"];

					if (ext.length > 0) {
						if ($.inArray(ext, files) == -1) {
							alert("첨부파일 형식을 다시 확인해주세요. \n 첨부가능 확장자 : jpg, jpeg, gif, png, pdf");
							$("#bzFileUpload").val("");
							$("#bzmnLicenseAtch").val("");
							return false;
						} else {
							var file = $(this).prop("files")[0]; // 선택된 파일 가져오기
							var fileName = file.name; // 파일명 가져오기
							$("#bzmnLicenseAtch").val(fileName); // 파일명을 사업자등록증 input 태그에 설정
						}
					}
				});
			});

			// 등록팝업 - 법인인감증명서 파일 업로드
			$('.coFileUpload').on("click", function() {
				$("#coFileUpload").click();
				$("#coFileUpload").change(function() {
					var ext = $("#coFileUpload").val().split(".").pop().toLowerCase();
					var files = ["jpg", "jpeg", "gif", "png", "pdf"];

					if (ext.length > 0) {
						if ($.inArray(ext, files) == -1) {
							alert("첨부파일 형식을 다시 확인해주세요. \n 첨부가능 확장자 : jpg, jpeg, gif, png, pdf");
							$("#coFileUpload").val("");
							$("#cocosAtch").val("");
							return false;
						} else {
							var file = $(this).prop("files")[0]; // 선택된 파일 가져오기
							var fileName = file.name; // 파일명 가져오기
							$("#cocosAtch").val(fileName); // 파일명을 법인인감증명서 input 태그에 설정
						}
					}
				});
			});

			// 등록팝업 - 비고 5줄제한
			$("#insertRmrk").on("input", function() {
				var lines = this.value.split("\n");
				if (lines.length > 5) {
					this.value = lines.slice(0, 5).join("\n");
				}
			});

			// 상세팝업 - 수정사유 5줄제한
			$("#insert_mdfcn_rsn").on("input", function() {
				var lines = this.value.split("\n");
				if (lines.length > 5) {
					this.value = lines.slice(0, 5).join("\n");
				}
			});

			// 상세팝업 - 지자체이관팝업버튼
			$(".transferBtn").on("click", function() {
				// 이관 요청 여부
				var params = $cmpnymanage.event.paramsInfo();
				var param = {
					bzmnSn: params.bzmnSn
				}
				ajax(true, contextPath + '/sys/companyManage/cmpnyCnt', 'body', '처리중입니다.', param, function(data) {
					if (data == 1) {
						alert("이관 요청 대기중인 사업자 입니다.")
					} else if (data == 0) {
						$cmpnymanage.ui.searchTransfer();

						$(".transfer_popup").show();
						$(".transfer_popup").addClass("detail_popup");
						$(".transfer_popup").addClass("view");
						$("body").css("overflow", "hidden");
					}
				});

			});

			// 상세팝업 - 지자체이관버튼 (요청)
			$(".transferRequestBtn").on("click", function() {
				$cmpnymanage.event.transferInfo();
			});

			// 상세팝업 - 지자체이관팝업버튼 (닫기)
			$(".transferCancelBtn").on("click", function() {
				$(".transfer_popup").removeClass("detail_popup");
				$(".transfer_popup").removeClass("view");
				$("body").css("overflow", "auto");
				$(".transfer_popup").hide();
			});

			// 상세팝업 - 사업자등록증 파일 다운로드 (수정가능팝업)
			$('#bzmnLicenseAtchNm').on("click", function() {
				var atchFileSn = $("#bzFileNo").val();
				var atchFileNm = $("#bzmnLicenseAtchNm").val();
				fileDownloadget(atchFileSn, atchFileNm);
			});

			// 상세팝업 - 법인인감증명서 파일 다운로드 (수정가능팝업)
			$('#cocsAtchNm').on("click", function() {
				var atchFileSn = $("#coFileNo").val();
				var atchFileNm = $("#cocsAtchNm").val();
				fileDownloadget(atchFileSn, atchFileNm);
			});

			// 상세팝업 - 사업자등록증 파일 다운로드 (수정불가능팝업)
			$('#bzmnLicenseAtchNm2').on("click", function() {
				var atchFileSn = $("#bzFileNo2").val();
				var atchFileNm = $("#bzmnLicenseAtchNm2").val();
				fileDownloadget(atchFileSn, atchFileNm);
			});


			// 상세팝업 - 법인인감증명서 파일 다운로드 (수정불가능팝업)
			$('#cocsAtchNm2').on("click", function() {
				var atchFileSn = $("#coFileNo2").val();
				var atchFileNm = $("#cocsAtchNm2").val();
				fileDownloadget(atchFileSn, atchFileNm);
			});

			// 상세팝업 - 사업자등록증 파일 다운로드 (수정요청시-마스터)
			$('#bzmnLicenseAtchNm_update').on("click", function() {
				var atchFileSn = $("#bzFileNo_update").val();
				var atchFileNm = $("#bzmnLicenseAtchNm_update").val();
				fileDownloadget(atchFileSn, atchFileNm);
			});

			// 상세팝업 - 법인인감증명서 파일 다운로드 (수정요청시-마스터)
			$('#cocsAtchNm_update').on("click", function() {
				var atchFileSn = $("#coFileNo_update").val();
				var atchFileNm = $("#cocsAtchNm_update").val();
				fileDownloadget(atchFileSn, atchFileNm);
			});

			// 상세팝업 - 사업자등록증 파일 업로드
			$('.bzmnDetailFileUpload').on("click", function() {
				$("#bzmnDetailFileUpload").click();
				$("#bzmnDetailFileUpload").change(function() {
					var ext = $("#bzmnDetailFileUpload").val().split(".").pop().toLowerCase();
					var files = ["jpg", "jpeg", "gif", "png", "pdf"];

					if (ext.length > 0) {
						if ($.inArray(ext, files) == -1) {
							alert("첨부파일 형식을 다시 확인해주세요. \n 첨부가능 확장자 : jpg, jpeg, gif, png, pdf");
							$("#bzmnDetailFileUpload").val("");
							$("#bzmnLicenseAtchNm").val("");
							return false;
						} else {
							var file = $(this).prop("files")[0]; // 선택된 파일 가져오기
							var fileName = file.name; // 파일명 가져오기
							$("#bzmnLicenseAtchNm").val(fileName); // 파일명을 사업자등록증 input 태그에 설정
							bzFileCkd = true;
						}
					}
				});
			});

			// 상세팝업 - 법인인감증명서 파일 업로드
			$('.coDetailFileUpload').on("click", function() {
				$("#coDetailFileUpload").click();
				$("#coDetailFileUpload").change(function() {
					var ext = $("#coDetailFileUpload").val().split(".").pop().toLowerCase();
					var files = ["jpg", "jpeg", "gif", "png", "pdf"];

					if (ext.length > 0) {
						if ($.inArray(ext, files) == -1) {
							alert("첨부파일 형식을 다시 확인해주세요. \n 첨부가능 확장자 : jpg, jpeg, gif, png, pdf");
							$("#coDetailFileUpload").val("");
							$("#cocsAtchNm").val("");
							return false;
						} else {
							var file = $(this).prop("files")[0]; // 선택된 파일 가져오기
							var fileName = file.name; // 파일명 가져오기
							$("#cocsAtchNm").val(fileName); // 파일명을 법인인감증명서 input 태그에 설정
							coFileCkd = true;
						}
					}
				});
			});

			// 상세팝업 - 승인상태버튼(승인)
			$('.approvalBtn').on("click", function() {
				$cmpnymanage.event.approvalBtn();
			});

			// 상세팝업 - 승인상태버튼(반려)
			$('.rejectBtn').on("click", function() {
				var rejectInput = $("#rejectionReason").val();
				if (rejectInput != null && rejectInput != '') {
					$cmpnymanage.event.rejectBtn();
				} else {
					alert("반려사유를 입력해주세요.");
				}
			});

			// 상세팝업 - 수정버튼
			$(".updateBtn").on("click", function() {
				// 이관 요청 여부
				var params = $cmpnymanage.event.paramsInfo();
				var param = {
					bzmnSn: params.bzmnSn
				}
				ajax(true, contextPath + '/sys/companyManage/cmpnyCnt', 'body', '처리중입니다.', param, function(data) {
					if (data == 1) {
						alert("이관 요청 대기중인 사업자 입니다.")
					} else if (data == 3) {
						alert("이관 반려 처리가 된 사업자 입니다.\n반려확인부터 진행해주세요")
					} else if (data == 0) {
						$cmpnymanage.event.updateBtn();
					}
				});
			});

			// 상세팝업 - 삭제버튼 (마스터 관리자 / 사업자 전체 삭제 됨 - 요청, 마스터, 이력)
			$(".deleteBtn").on("click", function() {
				var params = $cmpnymanage.event.paramsInfo();

				if (authrtCd === 'Z01' || authrtCd === 'K01' || authrtCd === "D01") {
					if (confirm("사업자를 삭제 하시겠습니까?")) {
						ajax(true, contextPath + '/sys/companyManage/deleteCmpny', 'body', '처리중입니다.', params, function(data) {
							alert(data.message);
							$(".detail_popup").removeClass("view");
							location.reload();
						});
					}
				} else {
					alert("공단 관리자 경우만 사업자를 삭제 할 수 있습니다.");
				}
			});

			// 상세팝업 - 반려확인버튼 (요청테이블)
			$(".rejectChkBtn").on("click", function() {
				$cmpnymanage.event.deleteRequestCmpny("반려");
			});
		},

		searchClick: function() {
			$('.searchBtn').on("click", function() {
				var param = $cmpnymanage.event.filter();

				if(param.selectCond == '' && param.searchWrd != '') {
					alert("조건을 선택해주세요.");
					$("#selectCond").focus();
				} else {
					excelDownArc.authrtCd = authrtCd;
					excelDownArc.regCmptncCd = param.regCmptncCd;
					excelDownArc.bzmnSn = param.bzmnSn;
					excelDownArc.brno = param.brno;
					excelDownArc.stdgCd = param.regCmptncCd;
					excelDownArc.searchAprvStts = param.searchAprvStts;
					excelDownArc.searchBsnStts = param.searchBsnStts;
					excelDownArc.authSelected = $("#authSelected").val();
					excelDownArc.selectCond = param.selectCond;
					excelDownArc.searchWrd = param.searchWrd;
					excelDownArc.searchChk = param.searchChk;
					excelDownArc.delYn = param.delYn;
					excelDownArc.elxExcelDownReason = $('#elxExcelDownReason').val();
					excelDownArc._csrf = $('._csrf').val();
	
					$("#cmpnymanageGrid").data("kendoGrid").dataSource.page(1);
				}
			});
		},

		issued: function(num, bzmn_sn) {
			var noDataText = '';
			var param = {};

			if(num == '1') {
				$("#includeComp").text("소속 영업소 목록");
				noDataText = '등록된 소속 영업소(예약소)가 없습니다.';
				param.bzmnSn = bzmn_sn;
			} else if(num == '2') {
				$("#includeComp").text("소속 주사무소 목록");
				noDataText = '등록된 소속 주사무소가 없습니다.';
				param.upBzmn = bzmn_sn;
			}

			ajax(true, contextPath + '/sys/companyManage/selectOfficeDetailInfo', 'body', '처리중입니다.', param, function(data) {
				var total = data.total;
				var data = data.data;

				if(num == '1' && total != 0) {
					$("#brnoCnt").text("총 "+ total +"개소")
				}

				var html = '';
				if (data != '') {
					$(".scroll").addClass("scrollBar02");

					for (var i = 0; i < total; i++) {

						// 사업자등록번호
						var brno = data[i].brno;
						if (brno != null && brno != '        ') {
							data[i].brno = toBizrnoNumFormat(data[i].brno);
						} else {
							data[i].brno = '';
						}

						// 법인등록번호
						var crno = data[i].crno;
						if (crno != null && crno != '        ') {
							data[i].crno = toCorporateNumFormat(data[i].crno);
						} else {
							data[i].crno = '';
						}

						// 사업게시일
						var day = data[i].biz_strt_day;
						if (day != null && day != '        ') {
							data[i].biz_strt_day = day.substring(0, 4) + '-' + day.substring(4, 6) + '-' + day.substring(6, 8);
						} else {
							data[i].biz_strt_day = '';
						}

						// 전화번호
						var tel = data[i].telno;
						if (tel != null) {
							if (tel.substring(0, 1) !== '0') {
								tel = '0' + tel; // 맨 앞에 0 추가
							}

							var telLength = tel.length;
							if (telLength == 9) {
								data[i].telno = tel.substring(0, 2) + '-' + tel.substring(2, 5) + '-' + tel.substring(5, 9);
							} else if (telLength == 10) {
								data[i].telno = tel.substring(0, 3) + '-' + tel.substring(3, 6) + '-' + tel.substring(6, 10);
							} else if (telLength == 11) {
								data[i].telno = tel.substring(0, 3) + '-' + tel.substring(3, 7) + '-' + tel.substring(7, 11);
							}

						} else {
							data[i].telno = ''
						}

						html += '<div class="detail_popup top_info">';
						html += '	<p style="color: #000">';
						if(num == '1') {
							html += '		<span>순번</span>';
							html += '       <span id="rn" style="margin-left: 5px; color: red">' + (i + 1) + '</span>';
						}
						html += '       <span id="auth" style="margin-left: 5px; color: blue;">' + nvl(data[i].bzmn_se_cd_nm, ' ') + '</span>';
						html += '	</p>';
						html += '</div>';

						html += '<div class="contBox">';
						html += '	<div class="nameBox office-flex" >';
						html += '		<h4 class="name">';
						html += '			<spen class="name">회사명 : ' + nvl(data[i].co_nm, ' ');
						html += '			<spen class="name" style="margin-left: 30px;">대표자 : ' + nvl(data[i].rprsv_nm, ' ');
						html += '		</h4>';
						html += '	</div>';
						html += '	<div class="cont cont-flex">';
						html += '		<table class="tb rental_tb01">';
						html += '			<tr>';
						html += '				<th scope="col">관할지</th>';
						html += '				<td>';
						html += '					<div class="tb_flex">';
						html += '						<label for="">관할지</label>';
						html += '						<input type="text" id="" class="input no_line" aria-label="관할지" placeholder="관할지" value="' + nvl(data[i].cmptnccdctpvnm, ' ') + '" readonly/>';
						html += '					</div>';
						html += '				</td>';
						html += '			</tr>';
						html += '				<th scope="col">사업자등록번호</th>';
						html += '				<td>';
						html += '					<div class="tb_flex">';
						html += '						<label for="">사업자등록번호</label>';
						html += '						<input type="text" id="" class="input no_line" aria-label="사업자등록번호" placeholder="사업자등록번호" value="' + nvl(data[i].brno, ' ') + '" readonly/>';
						html += '					</div>';
						html += '				</td>';
						html += '			</tr>';
						html += '			<tr>';
						html += '				<th scope="col">승인상태</th>';
						html += '				<td>';
						html += '					<div class="tb_flex">';
						html += '						<label for="">승인상태</label>';
						html += '						<input type="text" id="" class="input no_line" aria-label="승인상태" placeholder="승인상태" value="' + nvl(data[i].aprv_stts_cd_nm, ' ') + '" readonly/>';
						html += '					</div>';
						html += '				</td>';
						html += '			</tr>';
						html += '			<tr>';
						html += '				<th scope="col">연락처</th>';
						html += '				<td>';
						html += '					<div class="tb_flex">';
						html += '						<label for="">연락처</label>';
						html += '						<input type="text" id="" class="input no_line" aria-label="연락처" placeholder="연락처" value="' + nvl(data[i].telno, ' ') + '" readonly/>';
						html += '					</div>';
						html += '				</td>';
						html += '			</tr>';
						html += '			<tr>';
						html += '				<th scope="col">도로명주소</th>';
						html += '				<td>';
						html += '					<div class="tb_flex">';
						html += '						<label for="">도로명주소</label>';
						html += '						<input type="text" id="" class="input no_line" aria-label="도로명주소" placeholder="도로명주소" value="' + nvl(data[i].road_nm_addr + ' ') + nvl(data[i].road_nm_daddr + ' ') + '" readonly/>';
						html += '					</div>';
						html += '				</td>';
						html += '			</tr>';
						html += '		</table>';
						html += '		<table class="tb rental_tb01">';
						html += '			<tr>';
						html += '				<th scope="col">소재지</th>';
						html += '				<td>';
						html += '					<div class="tb_flex">';
						html += '						<label for="cdSggNm">소재지</label>';
						html += '						<input type="text" id="" class="input no_line" aria-label="소재지" placeholder="소재지" value="' + nvl(data[i].cmptnccdsggnm, ' ') + '" readonly/>';
						html += '					</div>';
						html += '				</td>';
						html += '			</tr>';
						html += '			<tr>';
						html += '				<th scope="col">법인등록번호</th>';
						html += '				<td>';
						html += '					<div class="tb_flex">';
						html += '						<label for="cdSggNm">법인등록번호</label>';
						html += '						<input type="text" id="" class="input no_line" aria-label="법인등록번호" placeholder="법인등록번호" value="' + nvl(data[i].crno, ' ') + '" readonly/>';
						html += '					</div>';
						html += '				</td>';
						html += '			</tr>';
						html += '			<tr>';
						html += '				<th scope="col">영업상태</th>';
						html += '				<td>';
						html += '					<div class="tb_flex">';
						html += '						<label for="cdSggNm">영업상태</label>';
						html += '						<input type="text" id="" class="input no_line" aria-label="영업상태" placeholder="영업상태" value="' + nvl(data[i].bsn_stts_cd_nm, ' ') + '" readonly/>';
						html += '					</div>';
						html += '				</td>';
						html += '			</tr>';
						html += '			<tr>';
						html += '				<th scope="col">사업개시일</th>';
						html += '				<td>';
						html += '					<div class="tb_flex">';
						html += '						<label for="cdSggNm">사업개시일</label>';
						html += '						<input type="text" id="" class="input no_line" aria-label="사업개시일" placeholder="사업개시일" value="' + nvl(data[i].biz_strt_day, ' ') + '" readonly/>';
						html += '					</div>';
						html += '				</td>';
						html += '			</tr>';
						html += '			<tr>';
						html += '				<th scope="col">차고지도로명주소</th>';
						html += '				<td>';
						html += '					<div class="tb_flex">';
						html += '						<label for="">차고지도로명주소</label>';
						html += '						<input type="text" id="" class="input no_line" aria-label="차고지도로명주소" placeholder="차고지도로명주소" value="' + nvl(data[i].garage_road_nm_addr, ' ') + nvl(data[i].garage_road_nm_daddr, ' ') + '" readonly/>';
						html += '					</div>';
						html += '				</td>';
						html += '			</tr>';
						html += '		</table>';
						html += '	</div>';
						html += '</div>';

						html += '<div style="margin: 50px"></div>';
					}

				} else {
					html += '<div>';
					html += '       <span id="" style="display:flex; justify-content: center; color: red">' + noDataText + '</span>';
					html += '</div>';
				}
				$('#officeContent').html(html);
				$(".office").show();
				$(".office").addClass("view");
				$("body").css("overflow", "hidden");
			});

		},

		/**
         *
         * @name         : ucPopup
         * @description  : 사용자현황 / 차량현황 팝업
         * @date         : 2023. 11. 28
         * @author       : 김경룡
         */
		ucPopup: function(uc, bzrm, crno) {
			var param = {
				bzmnSn: bzrm,
				crno: crno
			}
			if(uc == '1') {
				kendo.ui.progress($("#compUser"), true);
				$("#compUser").show();
				$("#compUser").addClass("view");

				ajax(true, contextPath + '/sys/companyManage/selectUserCmp', 'body', '처리중입니다.', param, function(data) {
					$("#compUserTable").data("kendoGrid").setDataSource(data.data);

					kendo.ui.progress($("#compUser"), false);
				});
			} else if(uc == '2') {
				kendo.ui.progress($("#compCar"), true);

				carCrno = crno;
				$("#compCarTable").data("kendoGrid").dataSource.page(1);

				$("#compCar").show();
				$("#compCar").addClass("view");

				kendo.ui.progress($("#compCar"), false);
			}
			$("body").css("overflow", "hidden");
		},

		filter: function() {
			// 등록관할코드
			var regCmptncCd = '';
			var bzmnSn = '';
			var brno = '';

			if (authrtCd === 'Z01' || authrtCd === 'M01' || authrtCd === 'K01' || authrtCd === "D01") {
				var ctpvCd = $('#searchCtpvNm').val();
				var sggCd = $('#searchSggNm').val();
				if (ctpvCd != '' && sggCd != '') {
					regCmptncCd = sggCd;
				} else if (ctpvCd != '' && sggCd == '') {
					regCmptncCd = ctpvCd;
				}
			} else if (authrtCd == 'G01') {
				var ctpvCd = $('#searchCtpvNm').val();
				var sggCd = $('#searchSggNm').val();
//				if(getCmptncZoneCd.substring(2, getCmptncZoneCd.length) == "00000000" && sggCd != '') {
				if(ctpvCd != '' && sggCd != '') {
					regCmptncCd = sggCd;
				} else {
					regCmptncCd = ctpvCd;
				}
			} else if(authrtCd == 'G02') {
				var ctpvCd = $('#searchCtpvNm').val();
				var sggCd = $('#searchSggNm').val();
				if (sggCd != '') {
					regCmptncCd = sggCd;
				} else if (sggCd == '') {
					regCmptncCd = ctpvCd;
				}
			} else if (authrtCd === 'S01') {
				regCmptncCd = getCmptncZoneCd;
				bzmnSn = getBzmnSn;
				brno = getBrno;
			} else if (authrtCd === 'S02') {
				regCmptncCd = getCmptncZoneCd;
				bzmnSn = getBzmnSn;
			}

			var params = {};
			params.regCmptncCd	  = regCmptncCd;
			params.bzmnSn 		  = bzmnSn;
			params.brno     	  = brno;
			params.searchAprvStts = $('#searchAprvStts').val();
			params.searchBsnStts  = $('#searchBsnStts').val();
			params.authSelected   = $("#authSelected").val();
			params.selectCond     = $("#selectCond").val();
			params.searchWrd 	  = $('#searchWrd').val().trim();
			params.searchChk 	  = $("input[name='searchChk']:checked").val();
			params.delYn = $("#delYn").val();
			return params;

		},

		// 등록팝업 정보
		insertBtn: function() {

			// 등록관할코드
			var regCmptncCd = '';

			if (authrtCd === 'Z01' || authrtCd === 'K01' || authrtCd === "D01") {
				var ctpvCd = $('#adminCmptncZoneCdCtpvNm').val();
				var sggCd = $('#adminCmptncZoneCdSggNm').val();

				if (ctpvCd == '36') {
					regCmptncCd = '3611000000'; // 세종특별자치시 처리
				} else if (ctpvCd != '' && sggCd != '') {
					regCmptncCd = sggCd;
				} else if (ctpvCd != '' && sggCd == '') {
					regCmptncCd = ctpvCd + '00000000';
				} else if (ctpvCd == '' && sggCd == '') {
					alert("등록지역을 선택해주세요");
					return;
				}
			} else if (authrtCd === 'G01') {
				regCmptncCd = getCmptncZoneCd;
			}

			// 사업자등록번호
			var insertBrno = $('#insertBrno').val();
			var brno = insertBrno.replace(/[^0-9]/g, "");

			// 법인등록번호
			var insertCrno = $('#insertCrno').val();
			var crno = insertCrno.replace(/[^0-9]/g, "");

			// 사업개시일시
			var biz_strt_day = $('#bizStrtDay').val();
			var bizStrtDay = biz_strt_day.replace(/-/g, "");

			// 영업상태수정일시
			var today = new Date(); // 현재 날짜를 가져옵니다.
			var year = today.getFullYear(); // 현재 년도를 가져옵니다.
			var month = today.getMonth() + 1; // 현재 월을 가져옵니다. (0부터 시작하므로 +1을 해줍니다.)
			var day = today.getDate(); // 현재 날짜를 가져옵니다.

			// 월과 일이 한 자리 수인 경우 앞에 0을 붙여 두 자리로 만듭니다.
			if (month < 10) {month = "0"+ month};
			if (day < 10) {day = "0"+ day};

			// 변수를 조합하여 날짜 형식을 만듭니다.
			var bsnSttsMdfcnDt = year + month + day;

			// 연락처
			var tel = nvl($('#telNumber').val());
			var telno = tel.replace(/-/g, "");

			// 문자열의 처음과 끝에 있는 공백을 제거합니다.
			var coNm = $('#coNm').val();
			coNm = coNm.trim();
			var rprsvNm = $('#rprsvNm').val();
			rprsvNm = rprsvNm.trim();
			var garageRoadNmDaddr = $('#garageRoadNmDaddr').val();
			garageRoadNmDaddr = garageRoadNmDaddr.trim();
			var roadNmDaddr = $('#roadNmDaddr').val();
			roadNmDaddr = roadNmDaddr.trim();
			var insertRmrk = $('#insertRmrk').val();
			insertRmrk = insertRmrk.trim();

			var params = {

				regCmptncCd: regCmptncCd,
				coNm: nvl(coNm, null),
				brno: nvl(brno, null),
				bzmnLicenseAtchSn: nvl($('#bzmnLicenseAtch').val(), null),
				bzmnSeCd: nvl($('#bzmnSeCd').val(), null),
				rprsvNm: nvl(rprsvNm, null),
				crno: nvl(crno, null),
				cocosAtchSn: nvl($('#cocosAtch').val(), null),
				bizStrtDay: nvl(bizStrtDay, null),
				upBrno: nvl($('#insertUpBrno').val(), null),

				sggCd: nvl($('#sggNm_hide').val(), null),
				roadNmAddr: nvl($('#roadNmAddr').val(), null),
				roadNmDaddr: nvl(roadNmDaddr, null),
				lat: nvl($('#lat').val(), 0),
				lot: nvl($('#lot').val(), 0),
				lotnoAddr: nvl($('#lotnoAddr').val(), null),
				garageRoadNmAddr: nvl($('#garageRoadNmAddr').val(), null),
				garageRoadNmDaddr: nvl(garageRoadNmDaddr, null),

				bsnSttsCd: nvl($('#bsnStts').val(), null),
				bsnSttsMdfcnDt: nvl(bsnSttsMdfcnDt, null),
				telno: nvl(telno, null),
				vhclRegCntom: nvl($('#vhclRegCntom').val(), 0),
				sednCarNoh: nvl($('#sednCarNoh').val(), 0),
				passVhcleNoh: nvl($('#passVhcleNoh').val(), 0),
				operBgngDt: nvl($('#operBgngDt').val(), null),
				operEndDt: nvl($('#operEndDt').val(), null),
				elecSednCarNoh: nvl($('#elecSednCarNoh').val(), 0),
				elecPassVhcleNoh: nvl($('#elecPassVhcleNoh').val(), 0),
				rmrk: nvl(insertRmrk, null),
				aprvSttsCd: nvl('2', null) // 관리자 등록으로 승인상태
			}

			var bzFile = $('#bzmnLicenseAtch').val();
			var coFile = $('#cocosAtch').val();
			var opentime = params.operBgngDt;
			var closetime = params.operEndDt;
			var brnoLength = params.brno;
			var crnoLength = params.crno;

			if(params.lat != null && params.lat != "" && params.lat != "0") {
				var latInput = $("#lat");
				var latPattern = /^\d{2}\.[0-9]+$/;
				if (!latPattern.test(latInput.val())) {
			        alert("위치정보에서 위도를 확인해주세요");
			        latInput.focus();
			        return;
   				 }
			}

			if(params.lot != null && params.lot != "" && params.lot != "0") {
				var lotInput = $("#lot");
				var lotPattern = /^\d{3}\.[0-9]+$/;
				if (!lotPattern.test(lotInput.val())) {
			        alert("위치정보에서 경도를 확인해주세요");
			        lotInput.focus();
			        return;
   				 }
			}

			if (params.coNm == null || params.coNm == "") {
				alert("회사명 입력은 필수입니다");
				return;
			} else if (params.brno == null || params.brno == "") {
				alert("사업자등록번호 입력은 필수입니다");
				return;
			} else if (brnoLength.length != 10) {
				alert("사업자등록번호를 확인해주세요");
				return;
			} else if (params.crno != null && crnoLength.length >= 1) {
				if (crnoLength.length != 13) {
					alert("법인등록번호를 확인해주세요");
					return;
				}
			} else if (bzFile == null || bzFile == "") {
				alert("사업자등록증 첨부는 필수입니다");
				return;
			} else if (params.bzmnSeCd == null || params.bzmnSeCd == "") {
				alert("사업소종류 선택은 필수입니다");
				return;
			} else if (params.bzmnSeCd == "2") {
				if (params.upBrno == null || params.upBrno == "") {
					alert("사업소가 영업소(예약소)이면 주사무소 선택은 필수입니다");
					return;
				}
			} else if (params.rprsvNm == null || params.rprsvNm == "") {
				alert("대표자명 입력은 필수입니다");
				return;
			} else if(params.bsnSttsCd == null || params.bsnSttsCd == '') {
				alert("영업상태 선택은 필수입니다");
				return;
			} else if (opentime != null && opentime != "" ) {
				var firstTwoDigits = opentime.substr(0, 2);
				var lastTwoDigits = opentime.substr(opentime.length - 2, 2);
				if (firstTwoDigits > 24 || lastTwoDigits >= 60 || opentime.length != 5) {
				  alert("오픈 시간 형식이 잘못되었습니다.");
				  return;
				}
			} else if (closetime != null && closetime != "" ) {
				var firstTwoDigits = closetime.substr(0, 2);
				var lastTwoDigits = closetime.substr(closetime.length - 2, 2);
				if (firstTwoDigits > 24 || lastTwoDigits >= 60 || closetime.length != 5) {
				  alert("마감 시간 형식이 잘못되었습니다.");
				  return;
				}
			}

			if (bzFile != '') {
				if (confirm("등록 하시겠습니까?")) {
					if (coFile != '') {
						var formData = new FormData();
						formData.append('files', document.getElementById('bzFileUpload').files[0]);

						fileAjax(contextPath + "/cmmn/fileUpload", formData, function(response) {
							if (response != null) {
								params.bzmnLicenseAtchSn = nvl(response.fileSn, 0);

								var formData = new FormData();
								formData.append('files', document.getElementById('coFileUpload').files[0]);

								fileAjax(contextPath + "/cmmn/fileUpload", formData, function(response) {
									if (response != null) {
										params.cocosAtchSn = nvl(response.fileSn, 0);
										$cmpnymanage.event.insertCmpny(params);
									}
								});
							}
						});
					} else {
						var formData = new FormData();
						formData.append('files', document.getElementById('bzFileUpload').files[0]);

						fileAjax(contextPath + "/cmmn/fileUpload", formData, function(response) {
							if (response != null) {
								params.bzmnLicenseAtchSn = nvl(response.fileSn, 0);
								$cmpnymanage.event.insertCmpny(params);
							}
						});
					}
				}
			} else if (coFile != '') {
				if (confirm("등록 하시겠습니까?")) {
					var formData = new FormData();
					formData.append('files', document.getElementById('coFileUpload').files[0]);

					fileAjax(contextPath + "/cmmn/fileUpload", formData, function(response) {
						if (response != null) {
							params.cocosAtchSn = nvl(response.fileSn, 0);
							$cmpnymanage.event.insertCmpny(params);
						}
					});
				}
			} else {
				if (confirm("등록 하시겠습니까?")) {
					$cmpnymanage.event.insertCmpny(params);
				}
			}
		},

		// 등록
		insertCmpny: function(params) {
			ajax(true, contextPath + '/sys/companyManage/insertCmpny', 'body', '처리중입니다.', params, function(data) {
				alert(data.message);
				$(".register_popup").removeClass("view");
				location.reload();
			});
		},

		/**
         *
         * @name         : detailPopup
         * @description  : 상세보기 팝업
         * @date         : 2023. 10. 13
         * @author       : 김경룡(수정자)
         */
		detailPopup: function(bzmnSn, rowStts) {

			var param = {
				bzmnSn: bzmnSn
			};

			ajax(true, contextPath + '/sys/companyManage/selectCmpnyDetailInfo', 'body', '처리중입니다.', param, function(data) {

				detailParms = data;
				var master = data.master;
				var request = data.request;

				// 지도 마커 불러오기
				$cmpnymanage.event.detailMapInfo();

				// Z01 관리자, K01 교통안전공단
				if (authrtCd === 'Z01' || authrtCd === 'K01' || authrtCd === "D01") {
					$(".transferBtn2").hide();
					$(".update_top_info").hide();
					$(".insert_top_info").hide();

                if(master !== null && master !== '' && master !== ' ' && master !== undefined){
                    if(master.del_yn == 'Y') {
                            $(".deleteBtn").hide();
                        } else {
                            $(".deleteBtn").show();
                        }
                }

					if (request != null && request.closed_yn != 'Y' && rowStts != '승인') {
						$cmpnymanage.event.detailInfo(request);
						$(".modifiable").hide();
//						if(request.aprv_stts_cd_nm != '반려') {
							$(".uncorrectable").show();
//						} else {
//							$(".uncorrectable").hide();
//							$(".modifiable").show();
//						}
						$(".requestInfo").show();
						$(".updateBtn").hide();
						$(".m_info2").show();
						$(".data").show();
						$(".update").hide();
						if (request.aprv_stts_cd_nm == '요청') {
							$(".requestStatus").show();
							$(".rejectStatus").hide();
							if (request.aprv_stts_cd_nm == '요청' && request.aprv_dmnd_cd == '1') { //등록요청
								transferNo = false;
								$(".redText").removeClass("readOnlyRedText");
								$(".insertInfo").show();
								$(".updateInfo").hide();
								$(".transferInfo").hide();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							} else if (request.aprv_stts_cd_nm == '요청' && request.aprv_dmnd_cd == '2') { //수정요청
								$cmpnymanage.event.detailUpdateInfo(master);
								transferNo = false;
								$(".redText").addClass("readOnlyRedText");
								$(".data").hide();
								$(".update").show();
								$(".insertInfo").hide();
								$(".updateInfo").show();
								$(".transferInfo").hide();
								$(".update_top_info").show();
								$(".insert_top_info").hide();
							} else if (request.aprv_stts_cd_nm == '요청' && request.aprv_dmnd_cd == '3') { //이관요청
								transferNo = true;
								$(".redText").removeClass("readOnlyRedText");
								$('#transferInfo').val(nvl(master.cmptnccdctpvnm, '') + ' ' + nvl(master.cmptnccdsggnm, '') + ' 지자체 이관요청 건');
								$(".insertInfo").hide();
								$(".updateInfo").hide();
								$(".transferInfo").show();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							}
						} else if (request.aprv_stts_cd_nm == '반려') {
							$(".requestStatus").hide();
							$(".updateInfo").hide();
							$(".rejectStatus").show();
							$(".redText").removeClass("readOnlyRedText");
							if (request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '1') { //등록요청
								transferNo = false;
								$(".insertInfo").show();
								$(".updateInfo").hide();
								$(".data").show();
								$(".update").hide();
								$(".transferInfo").hide();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							} else if (request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '2') { //수정요청
								$(".redText").addClass("readOnlyRedText");
								$cmpnymanage.event.detailUpdateInfo(master);
								transferNo = false;
								$(".insertInfo").hide();
								$(".updateInfo").show();
								$(".data").hide();
								$(".update").show();
								$(".transferInfo").hide();
								$(".update_top_info").show();
								$(".insert_top_info").hide();
							} else if (request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '3') { //이관요청
								transferNo = true;
								$('#transferInfo').val(nvl(master.cmptnccdctpvnm, '') + ' ' + nvl(master.cmptnccdsggnm, '') + ' 지자체 이관요청 건');
								$(".rejectChkBtn").hide();
								$(".insertInfo").hide();
								$(".updateInfo").hide();
								$(".transferInfo").show();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							}
						}
					} else if (master != null) {
						$cmpnymanage.event.detailInfo(master);
						$cmpnymanage.event.sttsChange(master.bsn_stts_cd, master.bsn_stts_mdfcn_dt);
						$(".modifiable").show();
						$(".uncorrectable").hide();
						$("#transferBtn").removeClass("readOnlyRedBtn");
						$(".transferBtn").show();
						$(".transferBtn2").hide();
						$(".updateBtn").show();
						if (request != null) {
							if (master.aprv_stts_cd_nm == '승인' && request.aprv_stts_cd_nm == '요청' && request.aprv_dmnd_cd == '3') { // 이관요청
								$('#transferBtn').text('지자체 이관요청 대기중');
								$('#transferBtn').css('background-color', '#ff3838');
							} else if (master.aprv_stts_cd_nm == '승인' && request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '3' && request.closed_yn != 'Y') { // 이관요청
								$(".transferBtn").hide();
								$(".transferBtn2").show();
								$('#transferBtn2').css('background-color', '#ff3838');
							} else if (master.aprv_stts_cd_nm == '승인' && request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '3' && request.closed_yn == 'Y') {
								$(".transferBtn").show();
								$(".transferBtn2").hide();
							}
						}
					}
					// M01 국토부, G02 대여사업자조합
				} else if (authrtCd === 'M01' || authrtCd === 'G02') {
					$(".uncorrectable").show();
					$(".updateBtn").hide();
					$(".m_info1").show();
					$(".m_info2").hide();
					$(".update_top_info").hide();
					$(".insert_top_info").hide();
					if (request != null && request.closed_yn != 'Y' && rowStts != '승인') {
						$(".requestInfo").show();
						$(".requestStatus").hide();
						$(".data").show();
						$(".update").hide();
						$cmpnymanage.event.detailInfo(request);
						if (request.aprv_stts_cd_nm == '요청') {
							$(".rejectStatus").hide();
							if (request.aprv_stts_cd_nm == '요청' && request.aprv_dmnd_cd == '1') { //등록요청
								transferNo = false;
								$(".redText").removeClass("readOnlyRedText");
								$(".insertInfo").show();
								$(".updateInfo").hide();
								$(".transferInfo").hide();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							} else if (request.aprv_stts_cd_nm == '요청' && request.aprv_dmnd_cd == '2') { //수정요청
								$cmpnymanage.event.detailUpdateInfo(master);
								transferNo = false;
								$(".redText").addClass("readOnlyRedText");
								$('#aprv_stts_cd2').val('요청');
								$(".insertInfo").hide();
								$(".updateInfo").show();
								$(".transferInfo").hide();
								$(".update_top_info").show();
								$(".insert_top_info").hide();
								$(".data").hide();
								$(".update").show();
							} else if (request.aprv_stts_cd_nm == '요청' && request.aprv_dmnd_cd == '3') { //이관요청
								transferNo = true;
								$(".redText").removeClass("readOnlyRedText");
								$('#transferInfo').val(nvl(master.cmptnccdctpvnm, '') + ' ' + nvl(master.cmptnccdsggnm, '') + ' 지자체 이관요청 건');
								$(".insertInfo").hide();
								$(".updateInfo").hide();
								$(".transferInfo").show();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							}
						} else if (request.aprv_stts_cd_nm == '반려') {
							$(".requestStatus").hide();
							$(".rejectStatus").show();
							$(".redText").removeClass("readOnlyRedText");
							if (request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '1') { //등록요청
								transferNo = false;
								$(".insertInfo").show();
								$(".updateInfo").hide();
								$(".transferInfo").hide();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							} else if (request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '2') { //수정요청
								$cmpnymanage.event.detailUpdateInfo(master);
								transferNo = false;
								$(".redText").addClass("readOnlyRedText");
								$(".insertInfo").hide();
								$(".updateInfo").show();
								$(".transferInfo").hide();
								$(".update_top_info").show();
								$(".insert_top_info").hide();
								$(".data").hide();
								$(".update").show();
							} else if (request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '3') { //이관요청
								transferNo = true;
								$('#transferInfo').val(nvl(master.cmptnccdctpvnm, '') + ' ' + nvl(master.cmptnccdsggnm, '') + ' 지자체 이관요청 건');
								$(".insertInfo").hide();
								$(".updateInfo").hide();
								$(".transferInfo").show();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							}
						}
					} else if (master != null) {
						if (master.aprv_stts_cd_nm == '승인') {
							$cmpnymanage.event.detailInfo(master);
							$(".uncorrectable").show();
							$(".requestInfo").hide();
						}
					}
					// G01 지자체
				} else if (authrtCd === 'G01') {
					$(".top_info").show();
					$(".update_top_info").hide();
					$(".insert_top_info").hide();
					if (request != null && request.closed_yn != 'Y' && rowStts != '승인') {
						$cmpnymanage.event.detailInfo(request);
						$(".modifiable").hide();
						$(".uncorrectable").show();
						$(".requestInfo").show();
						$(".updateBtn").hide();
						$(".m_info2").show();
						$(".data").show();
						$(".update").hide();
						if (request.aprv_stts_cd_nm == '요청') {
							$(".requestStatus").show();
							$(".rejectStatus").hide();
							if (request.aprv_stts_cd_nm == '요청' && request.aprv_dmnd_cd == '1') { //등록요청
								transferNo = false;
								$(".redText").removeClass("readOnlyRedText");
								$(".insertInfo").show();
								$(".updateInfo").hide();
								$(".transferInfo").hide();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							} else if (request.aprv_stts_cd_nm == '요청' && request.aprv_dmnd_cd == '2') { //수정요청
								$cmpnymanage.event.detailUpdateInfo(master);
								transferNo = false;
								$(".redText").addClass("readOnlyRedText");
								$(".insertInfo").hide();
								$(".updateInfo").show();
								$(".transferInfo").hide();
								$(".update_top_info").show();
								$(".insert_top_info").hide();
								$(".data").hide();
								$(".update").show();
							} else if (request.aprv_stts_cd_nm == '요청' && request.aprv_dmnd_cd == '3') { //이관요청
								transferNo = true;
								$(".redText").removeClass("readOnlyRedText");
								$('#transferInfo').val(master.cmptnccdctpvnm + ' ' + nvl(master.cmptnccdsggnm, '') + ' 지자체 이관요청 건');
								$(".insertInfo").hide();
								$(".updateInfo").hide();
								$(".transferInfo").show();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							}
						} else if (request.aprv_stts_cd_nm == '반려') {
							$(".requestStatus").hide();
							$(".rejectStatus").show();
							$(".redText").removeClass("readOnlyRedText");
							if (request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '1') { //등록요청
								transferNo = false;
								$(".insertInfo").show();
								$(".updateInfo").hide();
								$(".transferInfo").hide();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							} else if (request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '2') { //수정요청
								$cmpnymanage.event.detailUpdateInfo(master);
								transferNo = false;
								$(".redText").addClass("readOnlyRedText");
								$(".insertInfo").hide();
								$(".updateInfo").show();
								$(".transferInfo").hide();
								$(".update_top_info").show();
								$(".insert_top_info").hide();
								$(".data").hide();
								$(".update").show();
							} else if (request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '3') { //이관요청
								transferNo = true;
								$('#transferInfo').val(nvl(master.cmptnccdctpvnm, '') + ' ' + nvl(master.cmptnccdsggnm, '') + ' 지자체 이관요청 건');
								$(".insertInfo").hide();
								$(".updateInfo").hide();
								$(".transferInfo").show();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							}
						}
					} else if (master != null) {
						$cmpnymanage.event.detailInfo(master);
						$cmpnymanage.event.sttsChange(master.bsn_stts_cd, master.bsn_stts_mdfcn_dt);
						$(".modifiable").show();
						$(".uncorrectable").hide();
						$("#transferBtn").removeClass("readOnlyRedBtn");
						$(".transferBtn").show();
						$(".transferBtn2").hide();
						$(".updateBtn").show();
						if (request != null) {
							if (master.aprv_stts_cd_nm == '승인' && request.aprv_stts_cd_nm == '요청' && request.aprv_dmnd_cd == '3') { // 이관요청
								$('#transferBtn').text('지자체 이관요청 대기중');
								$('#transferBtn').css('background-color', '#ff3838');
							} else if (master.aprv_stts_cd_nm == '승인' && request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '3' && request.closed_yn != 'Y') { // 이관요청
								$(".transferBtn").hide();
								$(".transferBtn2").show();
								$('#transferBtn2').css('background-color', '#ff3838');
							} else if (master.aprv_stts_cd_nm == '승인' && request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '3' && request.closed_yn == 'Y') {
								$(".transferBtn").show();
								$(".transferBtn2").hide();
							}
						}
					}
					// S01 주사무소, S02 영업소(예약소)
				} else if (authrtCd === 'S01' || authrtCd === 'S02') {
					$(".uncorrectable").show();
					$(".updateBtn").hide();
					$(".m_info1").show();
					$(".m_info2").hide();
					$(".update_top_info").hide();
					$(".insert_top_info").hide();
					if (request != null && request.closed_yn != 'Y' && rowStts != '승인') {
						$(".requestInfo").show();
						$(".requestStatus").hide();
						$(".data").show();
						$(".update").hide();
						$cmpnymanage.event.detailInfo(request);
						if (request.aprv_stts_cd_nm == '요청') {
							$(".rejectStatus").hide();
							if (request.aprv_stts_cd_nm == '요청' && request.aprv_dmnd_cd == '1') { //등록요청
								transferNo = false;
								$(".redText").removeClass("readOnlyRedText");
								$(".insertInfo").show();
								$(".updateInfo").hide();
								$(".transferInfo").hide();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							} else if (request.aprv_stts_cd_nm == '요청' && request.aprv_dmnd_cd == '2') { //수정요청
								$cmpnymanage.event.detailUpdateInfo(master);
								transferNo = false;
								$(".redText").addClass("readOnlyRedText");
								$('#aprv_stts_cd2').val('요청');
								$(".insertInfo").hide();
								$(".updateInfo").show();
								$(".transferInfo").hide();
								$(".update_top_info").show();
								$(".insert_top_info").hide();
								$(".data").hide();
								$(".update").show();
							} else if (request.aprv_stts_cd_nm == '요청' && request.aprv_dmnd_cd == '3') { //이관요청
								transferNo = true;
								$(".redText").removeClass("readOnlyRedText");
								$('#transferInfo').val(nvl(master.cmptnccdctpvnm, '') + ' ' + nvl(master.cmptnccdsggnm, '') + ' 지자체 이관요청 건');
								$(".insertInfo").hide();
								$(".updateInfo").hide();
								$(".transferInfo").show();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							}
						} else if (request.aprv_stts_cd_nm == '반려') {
							$(".requestStatus").hide();
							$(".rejectStatus").show();
							$(".redText").removeClass("readOnlyRedText");
							if (request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '1') { //등록요청
								transferNo = false;
								$(".insertInfo").show();
								$(".updateInfo").hide();
								$(".transferInfo").hide();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							} else if (request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '2') { //수정요청
								$cmpnymanage.event.detailUpdateInfo(master);
								transferNo = false;
								$(".redText").addClass("readOnlyRedText");
								$(".insertInfo").hide();
								$(".updateInfo").show();
								$(".transferInfo").hide();
								$(".update_top_info").show();
								$(".insert_top_info").hide();
								$(".data").hide();
								$(".update").show();
							} else if (request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '3') { //이관요청
								transferNo = true;
								$('#transferInfo').val(nvl(master.cmptnccdctpvnm, '') + ' ' + nvl(master.cmptnccdsggnm, '') + ' 지자체 이관요청 건');
								$(".insertInfo").hide();
								$(".updateInfo").hide();
								$(".transferInfo").show();
								$(".update_top_info").hide();
								$(".insert_top_info").show();
							}
						}
					} else if (master != null) {
						if (master.aprv_stts_cd_nm == '승인') {
							$cmpnymanage.event.detailInfo(master);
							$(".uncorrectable").show();
							$(".requestInfo").hide();
						}
					}
				}
			});

			$(".office").hide();
			$(".detail_popup").addClass("view");
			$("body").css("overflow", "hidden");
		},

		detailMapInfo: function() {

			// 위경도 마커
			var defaultLat = '';
			var defaultLot = '';
			var defaultLat2 = '';
			var defaultLot2 = '';

			var master = detailParms.master;
			var request = detailParms.request;

			if (request != null) {
				if ((request.aprv_stts_cd_nm == '요청' && request.aprv_dmnd_cd == '2') || (request.aprv_stts_cd_nm == '반려' && request.aprv_dmnd_cd == '2')) { //수정요청
					var mLat = Number.isInteger(master.lat);
					var mLot = Number.isInteger(master.lot);
					var rLat = Number.isInteger(request.lot);
					var rLot = Number.isInteger(request.lot);

					if (mLat == true || mLot == true || rLat == true || rLot == true) {
						defaultLat = 36.124566704;
						defaultLot = 128.183676375;
						defaultLat2 = 36.124566704;
						defaultLot2 = 128.183676375;
					} else {
						defaultLat = master.lat;
						defaultLot = master.lot;
						defaultLat2 = request.lat;
						defaultLot2 = request.lot;
					}

					var data = [
						{ lat: defaultLat, lot: defaultLot },
						{ lat: defaultLat2, lot: defaultLot2 }
					];
					$cmpnymanage.event.detailMapMaker("map4", data);

				} else {
					var mLat = Number.isInteger(request.lat);
					var mLot = Number.isInteger(request.lot);

					if (mLat == true || mLot == true) {
						defaultLat = 36.124566704;
						defaultLot = 128.183676375;
					} else {
						defaultLat = request.lat;
						defaultLot = request.lot;
					}

					var data = {
						lat: defaultLat,
						lot: defaultLot
					}
					$cmpnymanage.event.detailMapMaker("map3", data);
				}
			} else if (master != null) {
				var mLat = Number.isInteger(master.lat);
				var mLot = Number.isInteger(master.lot);

				if (mLat == true || mLot == true) {
					defaultLat = 36.124566704;
					defaultLot = 128.183676375;
				} else {
					defaultLat = master.lat;
					defaultLot = master.lot;
				}

				var data = {
					lat: defaultLat,
					lot: defaultLot
				}
				$cmpnymanage.event.detailMapMaker("map2", data);
				$cmpnymanage.event.detailMapMaker("map3", data);
			}
		},

      	/**
         *
         * @name         : detailInfo
         * @description  : 상세보기 팝업 정보 주입
         * @date         : 2023. 10. 13
         * @author       : 김경룡(수정자)
         */
		detailInfo: function(data) {
			// 사업소 종류가 주사무소(1)이면 주사무소번호 선택 감추기
			var cd = data != null ? data.bzmn_se_cd : null;
			cd == '2' ? $(".upCompanyNo").show() : $(".upCompanyNo").hide();
			
			// 사업자등록번호
			var brno = ''
			if (data.brno != '        ' && data.brno != null) {
				brno = toBizrnoNumFormat(data.brno);
			} else {
				brno = '';
			}

			// 법인등록번호
			var crno = '';
			if (data.crno != '        ' && data.crno != null) {
				crno = toCorporateNumFormat(data.crno);
			} else {
				crno = '';
			}

			// 연락처
			var tel = '';
			var telno = data.telno;
			if (data.telno != '' && data.telno != null) {
				if (telno.substring(0, 1) !== '0') {
					telno = '0' + telno; // 맨 앞에 0 추가
				}
				var telLength = telno.length;
				if (telLength == 9) {
					tel = telno.substring(0, 2) + '-' + telno.substring(2, 5) + '-' + telno.substring(5, 9);
				} else if (telLength == 10) {
					tel = telno.substring(0, 3) + '-' + telno.substring(3, 6) + '-' + telno.substring(6, 10);
				} else if (telLength == 11) {
					tel = telno.substring(0, 3) + '-' + telno.substring(3, 7) + '-' + telno.substring(7, 11);
				}
			} else {
				tel = ''
			}

			// 사업게시일
			var day = new Date();
			if (data.biz_strt_day != '        ' && data.biz_strt_day != null) {
				day = data.biz_strt_day;
				var bizStrtDay = day.substring(0, 4) + "-" + day.substring(4, 6) + "-" + day.substring(6, 8);
			} else {
				var bizStrtDay = dateToStr(day);
			}

			// 위경도
			var lat = data.lat;
			var lot = data.lot;

			var formattedLat = lat.toFixed(7);
			data.lat = parseFloat(formattedLat);
			var formattedLat = lot.toFixed(7);
			data.lot = parseFloat(formattedLat);

			// 상태변경일시
			if (data.bsn_stts_mdfcn_dt != '        ' && data.bsn_stts_mdfcn_dt != null) {
				var bsnSttsMdfcnDt = data.bsn_stts_mdfcn_dt.substring(0, 4) + "-" + data.bsn_stts_mdfcn_dt.substring(4, 6) + "-" + data.bsn_stts_mdfcn_dt.substring(6, 8);
			} else {
				var bsnSttsMdfcnDt = dateToStr(new Date());
			}
			
			// 관할지 지역
			var regCmptncCd = data.reg_cmptnc_cd;
			var ctpvCd = regCmptncCd != null ? regCmptncCd.substring(0, 2) : '';

			// 지자체 및 회사 기본 정보
			$('[name="company_no"]').val(data.bzmn_sn);
			$("#cmptncCtpvnm_admin").data("kendoDropDownList").value(ctpvCd);
			$("#cmptncSggnm_admin").data("kendoDropDownList").value(data.reg_cmptnc_cd);
			$('[name="cmptncCtpvnm2"]').val(data.cmptnccdctpvnm);
			$('[name="cmptncSggnm2"]').val(data.cmptnccdsggnm);
			$('[name="cmptncSggnm_hide"]').val(data.reg_cmptnc_cd);
			$('[name="presentCtpv"]').val(data.cmptnccdctpvnm);
			$('[name="co_nm"]').val(data.co_nm);
			$('[name="brno"]').val(brno);
			$('[name="bzFileNo"]').val(data.bzmn_license_atch_sn);
			$('[name="bzmnLicenseAtchNm"]').val(data.bzmnLicenseAtchNm);
			$('[name="coFileNo"]').val(data.cocs_atch_sn);
			$('[name="cocsAtchNm"]').val(data.cocsAtchNm);
			$('[name="presentSgg"]').val(data.cmptnccdsggnm);
			$('[name="rprsv_nm"]').val(data.rprsv_nm);
			$('[name="crno"]').val(crno);
			$("#bzmn_se_cd_nm").data("kendoDropDownList").value(data.bzmn_se_cd);
			$("#up_brno").data("kendoDropDownList").value(data.up_brno);
			$('[name="bzmn_se_cd_nm2"]').val(data.bzmn_se_nm);
			$('[name="up_brno2"]').val(data.up_brno_nm);
			$('[name="biz_strt_day"]').val(bizStrtDay);

			// 회사 소재지 정보
			$('[name="ctpv_nm"]').val(data.ctpv_nm);
			$('[name="sgg_nm"]').val(data.sgg_nm);
			$('[name="sgg_nm_hide"]').val(data.sgg_cd);
			$('[name="road_nm_addr"]').val(data.road_nm_addr);
			$('[name="location_lat"]').val(data.lat);
			$('[name="location_lot"]').val(data.lot);
			$('[name="lotno_addr"]').val(data.lotno_addr);
			$('[name="garage_road_nm_addr"]').val(data.garage_road_nm_addr);
			$('[name="road_nm_daddr"]').val(data.road_nm_daddr);
			$('[name="garage_road_nm_daddr"]').val(data.garage_road_nm_daddr);

			// 회사 상태 정보
			$("#bsn_stts_cd_nm").data("kendoDropDownList").value(data.bsn_stts_cd);
			$('[name="bsn_stts_cd_nm2"]').val(data.bsn_stts_nm);
			$("#bsn_stts_mdfcn_dt").data("kendoDatePicker").value(new Date(bsnSttsMdfcnDt));
			$('[name="bsn_stts_mdfcn_dt"]').val(bsnSttsMdfcnDt);
			$('[name="telno"]').val(tel);
			$('[name="vhcl_reg_cntom"]').val(data.vhcl_reg_noh);
			$('[name="sedn_car_noh"]').val(data.car_noh);
			$('[name="pass_vhcle_noh"]').val(data.van_noh);
			$('[name="oper_bgng_dt"]').val(data.oper_bgng_dt);
			$('[name="oper_end_dt"]').val(data.oper_end_dt);
			$('[name="elec_sedn_car_noh"]').val(data.elcty_car_noh);
			$('[name="elec_pass_vhcle_noh"]').val(data.elcty_van_noh);
			$('[name="rmrk"]').val(data.rmrk);
			$('[name="mdfcn_rsn"]').val(data.mdfcn_rsn);
			$("#mdfcn_rsn2").val(data.mdfcn_rsn);
			$('[name="aprv_stts_cd_update"]').val(data.aprv_stts_cd_nm);
			$('[name="aprv_stts_cd"]').val(data.aprv_stts_cd_nm);

			var endKey = 0;
			
			setTimeout(function() {
				map2.invalidateSize();
				map3.invalidateSize();
				endKey = 1;
			}, 100);
			
			var interval = setInterval(function() {
				if(endKey == 1) {
					kendo.ui.progress($("#cmpnymanageGrid"), false);
					clearInterval(interval);
				}
			});
	
		},

		detailUpdateInfo: function(master) {

			// 사업소 종류가 주사무소(1)이면 주사무소번호 선택 감추기
			if (master != null) {
				var cd = master.bzmn_se_cd;
			}

			if (cd == '2') {
				$(".upCompanyNo").show();
			} else {
				$(".upCompanyNo").hide();
			}

			// 사업자등록번호
			var brno = ''
			if (master.brno != '        ' && master.brno != null) {
				brno = toBizrnoNumFormat(master.brno);
			} else {
				brno = '';
			}

			// 법인등록번호
			var crno = '';
			if (master.crno != '        ' && master.crno != null) {
				crno = toCorporateNumFormat(master.crno);
			} else {
				crno = '';
			}

			// 연락처
			var tel = '';
			var telno = master.telno;
			if (master.telno != '' && master.telno != null) {
				if (telno.substring(0, 1) !== '0') {
					telno = '0' + telno; // 맨 앞에 0 추가
				}
				var telLength = telno.length;
				if (telLength == 9) {
					tel = telno.substring(0, 2) + '-' + telno.substring(2, 5) + '-' + telno.substring(5, 9);
				} else if (telLength == 10) {
					tel = telno.substring(0, 3) + '-' + telno.substring(3, 6) + '-' + telno.substring(6, 10);
				} else if (telLength == 11) {
					tel = telno.substring(0, 3) + '-' + telno.substring(3, 7) + '-' + telno.substring(7, 11);
				}
			} else {
				tel = ''
			}

			// 사업게시일
			var day = new Date();
			if (master.biz_strt_day != '        ' && master.biz_strt_day != null) {
				day = master.biz_strt_day;
				var bizStrtDay = day.substring(0, 4) + "-" + day.substring(4, 6) + "-" + day.substring(6, 8);
			} else {
				var bizStrtDay = dateToStr(day);
			}

			// 위경도
			var lat = master.lat;
			var lot = master.lot;

			var formattedLat = lat.toFixed(7);
			master.lat = parseFloat(formattedLat);
			var formattedLat = lot.toFixed(7);
			master.lot = parseFloat(formattedLat);

			// 상태변경일시
			var updateDay = new Date();
			if (master.bsn_stts_mdfcn_dt != '        ' && master.bsn_stts_mdfcn_dt != null) {
				updateDay = master.bsn_stts_mdfcn_dt;
				var bsnSttsMdfcnDt = updateDay.substring(0, 4) + "-" + updateDay.substring(4, 6) + "-" + updateDay.substring(6, 8);
			} else {
				var bsnSttsMdfcnDt = dateToStr(updateDay);
			}

			// 지자체 및 회사 기본 정보
			$('[name="cmptncCtpvnm_update"]').val(master.cmptnccdctpvnm);
			$('[name="co_nm_update"]').val(master.co_nm);
			$('[name="brno_update"]').val(brno);
			$('[name="bzFileNo_update"]').val(master.bzmn_license_atch_sn);
			$('[name="bzmnLicenseAtchNm_update"]').val(master.bzmnLicenseAtchNm);
			$('[name="coFileNo_update"]').val(master.cocs_atch_sn);
			$('[name="cocsAtchNm_update"]').val(master.cocsAtchNm);
			$('[name="cmptncSggnm_update"]').val(master.cmptnccdsggnm);
			$('[name="rprsv_nm_update"]').val(master.rprsv_nm);
			$('[name="crno_update"]').val(crno);
			$("#bzmn_se_cd_nm_update").val(master.bzmn_se_cd);
			$("#up_brno_update").val(master.up_brno);
			$('[name="bzmn_se_cd_nm_update"]').val(master.bzmn_se_nm);
			$('[name="up_brno_update"]').val(master.up_brno_nm);
			$('[name="biz_strt_day_update"]').val(bizStrtDay);

			// 회사 소재지 정보
			$('[name="ctpv_nm_update"]').val(master.ctpv_nm);
			$('[name="sgg_nm_update"]').val(master.sgg_nm);
			$('[name="road_nm_addr_update"]').val(master.road_nm_addr);
			$('[name="location_lat_update"]').val(master.lat);
			$('[name="location_lot_update"]').val(master.lot);
			$('[name="lotno_addr_update"]').val(master.lotno_addr);
			$('[name="garage_road_nm_addr_update"]').val(master.garage_road_nm_addr);
			$('[name="road_nm_daddr_update"]').val(master.road_nm_daddr);
			$('[name="garage_road_nm_daddr_update"]').val(master.garage_road_nm_daddr);

			// 회사 상태 정보
			$('[name="bsn_stts_cd_nm_update"]').val(master.bsn_stts_nm);
			$('[name="bsn_stts_mdfcn_dt_update"]').val(bsnSttsMdfcnDt);
			$('[name="telno_update"]').val(tel);
			$('[name="vhcl_reg_cntom_update"]').val(master.vhcl_reg_noh);
			$('[name="sedn_car_noh_update"]').val(master.car_noh);
			$('[name="pass_vhcle_noh_update"]').val(master.van_noh);
			$('[name="oper_bgng_dt_update"]').val(master.oper_bgng_dt);
			$('[name="oper_end_dt_update"]').val(master.oper_end_dt);
			$('[name="elec_sedn_car_noh_update"]').val(master.elcty_car_noh);
			$('[name="elec_pass_vhcle_noh_update"]').val(master.elcty_van_noh);
			$('[name="rmrk_update"]').val(master.rmrk);
			$('[name="mdfcn_rsn"]').val(master.mdfcn_rsn);
			$('[name="aprv_stts_cd"]').val(master.aprv_stts_cd_nm);

		},
		
		sttsChange: function(cd, bsn_stts_mdfcn_dt) {
			$("#bsn_stts_cd_nm").on("change", function () {
				var bsnDatePicker = $("#bsn_stts_mdfcn_dt").data("kendoDatePicker");
				var selectedValue = $(this).val();
			  
				if (selectedValue != cd) {
					bsnDatePicker.readonly(false);
					$("#bsn_stts_mdfcn_dt").removeClass("readOnlyGrayBtn");
					$('.sub03 .readOnlyGrayBtn .k-input-button').css('background-color', '#FFF');
				} else {
					bsnDatePicker.readonly(true);
					var bsnSttsMdfcnDt = bsn_stts_mdfcn_dt.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
					$('#bsn_stts_mdfcn_dt').val(bsnSttsMdfcnDt);
			    	$("#bsn_stts_mdfcn_dt").addClass("readOnlyGrayBtn"); 
			    	$('.sub03 .readOnlyGrayBtn .k-input-button').css('background-color', '#f5f5f5');
			  	}
			});
		},

		// 위, 경도 좌표
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
					type: pickType, /* PARCEL : 지번주소, ROAD : 도로명주소 */
					address: addr,
					crs: 'epsg:4326',  /* WGS84 경위도 */
					refine: false     /* 정제 처리 여부 */
				}

				$.ajax({
					url: "https://api.vworld.kr/req/address",
					cache: false,
					dataType: "jsonp",
					jsonp: "callback",
					contentType: "application/json",
					data: data,
					type: 'POST',
					beforeSend: function() {},
					complete: function(xhr, status) {},
					success: function(jsonObj) {
						if (typeof jsonObj == "object" && jsonObj != null && jsonObj != "undefined") {
							if (jsonObj.response.status === 'OK' && nvl(jsonObj.response.result) !== '') {
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
					error: function(jxhr, textStatus) {
						deferred.reject(textStatus);
					}
				});
			} catch (err) {
				deferred.reject(err);
			}
			return deferred.promise(); // 프로미스 객체 반환
		},

		// 주소찾기
		addr: function(Request, param) {
			$('.com_address01').show();
			$(".com_address01").addClass("view");
			$("body").css("overflow", "hidden");

			var wrap = document.getElementById('addr-wrap');
			new daum.Postcode({
				width: $(".com_address01 .box").width() - 74 + 'px',
				height: 450,
				oncomplete: function(data) {
					var fullBcode = data.bcode; // 최종 주소 코드
					var dataType = data.addressType;
					var ctpvNm = ''; // 시도
					var stdgNm = ''; // 시구군
					var stdgCd = ''; // 시도
					var fullAddr = data.roadAddress; // 도로 명주소

					// 시도 / 시군구
					if (fullBcode != null) {
						ctpvNm = data.sido;
						stdgNm = data.sigungu;
						stdgCd = fullBcode.substr(0, 2);
						if (stdgCd == '36') {stdgCd = '3611000000'}
						else {stdgCd = fullBcode.substr(0, 5) + '00000';}
					}

					$cmpnymanage.event.map(fullAddr, dataType).then(function(map) {
						if (Request == 'insert' && param == 'office') {
							$cmpnymanage.event.insertMapMaker("insert", map); // 마커생성
							$('[name="lat"]').val(map.lat);
							$('[name="lot"]').val(map.lot);
						} else if (Request == 'update' && param == 'office') {
							$cmpnymanage.event.insertMapMaker("update", map); // 마커생성
							$('[name="location_lat"]').val(map.lat);
							$('[name="location_lot"]').val(map.lot);
						}
					});

					if (Request == 'insert' && param == 'office') {
						$('[name="ctpvNm"]').val(ctpvNm);
						$('[name="sggNm"]').val(stdgNm);
						$('[name="sggNm_hide"]').val(stdgCd);
						$('[name="roadNmAddr"]').val(fullAddr);
						$('[name="lotnoAddr"]').val(data.jibunAddress != '' ? data.jibunAddress : data.autoJibunAddress);
					} else if (Request == 'insert' && param == 'garage') {
						$('[name="garageRoadNmAddr"]').val(fullAddr);
					} else if (Request == 'update' && param == 'office') {
						$('[name="ctpv_nm"]').val(ctpvNm);
						$('[name="sgg_nm"]').val(stdgNm);
						$('[name="sgg_nm_hide"]').val(stdgCd);
						$('[name="road_nm_addr"]').val(fullAddr);
						$('[name="lotno_addr"]').val(data.jibunAddress != '' ? data.jibunAddress : data.autoJibunAddress);
					} else if (Request == 'update' && param == 'garage') {
						$('[name="garage_road_nm_addr"]').val(fullAddr);
					}

					$('.com_address01 .close').click();
				}
			}).embed(wrap);
		},

		detailParms: function() {

			// 등록관할코드
			var regCmptncCd = '';

			if (getCmptncZoneCd != null && getCmptncZoneCd != '') { // 지자체경우
				regCmptncCd = getCmptncZoneCd;
			} else { // 관리자경우
				regCmptncCd = detailParms.request.reg_cmptnc_cd;
			}

			var params = {
				regCmptncCd: regCmptncCd,
				bzmnSn: detailParms.request.bzmn_sn,
				bzmnSeCd: detailParms.request.bzmn_se_cd,
				dmndSn: detailParms.request.dmnd_sn,
				offiSn: detailParms.request.offi_sn,
				upBrno: detailParms.request.up_brno,
				brno: detailParms.request.brno,
				crno: detailParms.request.crno,
				coNm: detailParms.request.co_nm,
				rprsvNm: detailParms.request.rprsv_nm,
				bizStrtDay: detailParms.request.biz_strt_day,
				sggCd: detailParms.request.sgg_cd,
				roadNmAddr: detailParms.request.road_nm_addr,
				lotnoAddr: detailParms.request.lotno_addr,
				garageRoadNmAddr: detailParms.request.garage_road_nm_addr,
				bsnSttsCd: detailParms.request.bsn_stts_cd,
				bsnSttsMdfcnDt: detailParms.request.bsn_stts_mdfcn_dt,
				telno: detailParms.request.telno,
				vhclRegCntom: detailParms.request.vhcl_reg_noh,
				sednCarNoh: detailParms.request.car_noh,
				passVhcleNoh: detailParms.request.van_noh,
				operBgngDt: detailParms.request.oper_bgng_dt,
				operEndDt: detailParms.request.oper_end_dt,
				elecSednCarNoh: detailParms.request.elcty_car_noh,
				elecPassVhcleNoh: detailParms.request.elcty_van_noh,
				lat: detailParms.request.lat,
				lot: detailParms.request.lot,
				mdfcnRsn: detailParms.request.mdfcn_rsn,
				aprvSttsCd: detailParms.request.aprv_dmnd_cd,
				rmrk: detailParms.request.rmrk,
				bzmnLicenseAtchSn: detailParms.request.bzmn_license_atch_sn,
				cocosAtchSn: detailParms.request.cocs_atch_sn,
				roadNmDaddr: detailParms.request.road_nm_daddr,
				lotnoDaddr: detailParms.request.lotno_daddr,
				garageRoadNmDaddr: detailParms.request.garage_road_nm_daddr,
				autzrSn: detailParms.request.autzr_sn,
				aprvDmndDt: detailParms.request.aprv_dmnd_dt,
				aprvDt: detailParms.request.aprv_dt
			};

			return params;
		},

		// 상세정보 팝업 - 승인버튼
		approvalBtn: function() {
			var params = $cmpnymanage.event.detailParms();

			// 이관요청승인
			if (transferNo == true) {
				if(confirm("지자체 이관 승인을 하시겠습니까?")) {
					params.aprvSttsCd = '2';
					ajax(true, contextPath + '/sys/companyManage/updateTransferRequestApproval', 'body', '처리중입니다.', params, function(data) {
						alert(data.message);
						$(".detail_popup").removeClass("view");
						location.reload();
					});
				}
			// 수정요청 승인
			} else if(params.aprvSttsCd == "2") {
				if(confirm("수정요청을 승인 하시겠습니까?")) {
					ajax(true, contextPath + '/sys/companyManage/updateRequestApproval', 'body', '처리중입니다.', params, function(data) {
						alert(data.message);
						$(".detail_popup").removeClass("view");
						location.reload();
					});
				}
			// 등록요청 승인
			} else if(params.aprvSttsCd == "1") {
				params.aprvSttsCd = "2";
				if(confirm("등록요청을 승인 하시겠습니까?")) {
					ajax(true, contextPath + '/sys/companyManage/insertRequestApproval', 'body', '처리중입니다.', params, function(data) {
						alert(data.message);
						$(".detail_popup").removeClass("view");
						location.reload();
					});
				}
			}
		},

		// 상세팝업 - 반려버튼
		rejectBtn: function() {
			var params = $cmpnymanage.event.detailParms();
			params.aprvSttsCd = '3';
			params.rjctRsn = $("#rejectionReason").val();

			var meg = '';
			if (transferNo == true) {
				meg = "지자체 이관 반려 처리를 하시겠습니까?";
			} else {
				meg = "반려 처리를 하시겠습니까?";
			}

			if (confirm(meg)) {
				ajax(true, contextPath + '/sys/companyManage/updateReject', 'body', '처리중입니다.', params, function(data) {
					alert(data.message);
					$(".detail_popup").removeClass("view");
					location.reload();
				});
			}
		},

		paramsInfo: function() {

			// 등록관할코드
			var regCmptncCd = '';
			var cmptncCtpvnm = '';
			var cmptncSggnm = '';

			if (authrtCd === 'Z01' ||  authrtCd === 'K01' || authrtCd === "D01") {
				cmptncCtpvnm = $('[name="cmptncCtpvnm"]').val();
				cmptncSggnm = $('[name="cmptncSggnm"]').val();
				if(cmptncCtpvnm != '' && cmptncCtpvnm == '36') {
					regCmptncCd = '3611000000';
				}else if(cmptncCtpvnm != '' && cmptncSggnm == '') {
					regCmptncCd = cmptncCtpvnm + '00000000';
				}else if(cmptncCtpvnm != '' && cmptncSggnm != '') {
					regCmptncCd = cmptncSggnm
				}
			} else if(authrtCd === 'M01') {
				regCmptncCd = $('[name="cmptncSggnm_hide"]').val();
			} else if (authrtCd === 'G01' || authrtCd === 'S01' || authrtCd === 'S02') {
				regCmptncCd = getCmptncZoneCd;
			}

			// 사업자등록번호
			var updateBrno = $('#brno').val();
			var brno = updateBrno.replace(/[^0-9]/g, "");

			// 법인등록번호
			var updateCrno = $('#crno').val();
			var crno = updateCrno.replace(/[^0-9]/g, "");

			// 사업개시일시
			var biz_strt_day = $('#biz_strt_day').val();
			var bizStrtDay = biz_strt_day.replace(/-/g, "");

			// 영업상태수정일시
			var bsn_stts_mdfcn_dt = $('#bsn_stts_mdfcn_dt').val();
			var bsnSttsMdfcnDt = bsn_stts_mdfcn_dt.replace(/-/g, "");

			var tel = nvl($('#telno').val());
			var telno = tel.replace(/-/g, "");

			var params = {

				regCmptncCd: regCmptncCd,
				bzmnSn: detailParms.master.bzmn_sn,
				bzmnSeCd: nvl($('#bzmn_se_cd_nm').val()),
				offiSn: detailParms.master.offi_sn,
				upBrno: nvl($('#up_brno').val(), null),
				coNm: nvl($('#co_nm').val(), null),
				brno: nvl(brno, null),
				bzmnLicenseAtchSn: nvl($('#bzmnLicenseAtch').val(), null),
				rprsvNm: nvl($('#rprsv_nm').val(), null),
				crno: nvl(crno, null),
				cocosAtchSn: nvl($('#cocosAtch').val(), null),
				bizStrtDay: nvl(bizStrtDay, null),

				sggCd: nvl($('#sgg_nm_hide').val(), null),
				lat: nvl($('#location_lat').val(), null),
				lot: nvl($('#location_lot').val(), null),
				roadNmAddr: nvl($('#road_nm_addr').val(), null),
				roadNmDaddr: nvl($('#road_nm_daddr').val(), null),
				lotnoAddr: nvl($('#lotno_addr').val(), null),
				garageRoadNmAddr: nvl($('#garage_road_nm_addr').val(), null),
				garageRoadNmDaddr: nvl($('#garage_road_nm_daddr').val(), null),

				bsnSttsCd: nvl($('#bsn_stts_cd_nm').val(), null),
				bsnSttsMdfcnDt: nvl(bsnSttsMdfcnDt, null),
				telno: nvl(telno, null),
				vhclRegCntom: nvl($('#vhcl_reg_cntom').val(), 0),
				sednCarNoh: nvl($('#sedn_car_noh').val(), 0),
				passVhcleNoh: nvl($('#pass_vhcle_noh').val(), 0),
				operBgngDt: nvl($('#oper_bgng_dt').val(), null),
				operEndDt: nvl($('#oper_end_dt').val(), null),
				elecSednCarNoh: nvl($('#elec_sedn_car_noh').val(), 0),
				elecPassVhcleNoh: nvl($('#elec_pass_vhcle_noh').val(), 0),
				rmrk: nvl($('#rmrk').val(), null),
				mdfcnRsn: nvl($('#insert_mdfcn_rsn').val(), null),

				aprvDmndDt: detailParms.master.aprv_dmnd_dt,
				aprvDt: detailParms.master.aprv_dt,
				autzrSn: detailParms.master.autzr_sn,

				aprvSttsCd: nvl('2', null) // 관리자 등록으로 승인상태
			}

			return params;
		},

		// 상세정보 팝업 - 수정버튼
		updateBtn: function() {
			var params = $cmpnymanage.event.paramsInfo();

			// 기존 파일 번호
			var fileParams = {
				bzFile: detailParms.master.bzmn_license_atch_sn,
				coFile: detailParms.master.cocs_atch_sn
			};
			
			var opentime = params.operBgngDt;
			var closetime = params.operEndDt;
			var brnoLength = params.brno;
			var crnoLength = params.crno;
			
			if(params.lat != null && params.lat != "" && params.lat != "0") {
				var latInput = $("#location_lat");
				var latPattern = /^\d{2}\.[0-9]+$/;
				if (!latPattern.test(latInput.val())) {
			        alert("위치정보에서 위도를 확인해주세요");
			        latInput.focus();
			        return;
   				 }
			}
			
			if(params.lot != null && params.lot != "" && params.lot != "0") {
				var lotInput = $("#location_lot");
				var lotPattern = /^\d{3}\.[0-9]+$/;
				if (!lotPattern.test(lotInput.val())) {
			        alert("위치정보에서 경도를 확인해주세요");
			        lotInput.focus();
			        return;
   				 }
			}
			
			if (crnoLength != null) {
				if (crnoLength.length != 13) {
					alert("법인등록번호를 확인해주세요");
					return;
				}
			}
			if(params.regCmptncCd == null || params.regCmptncCd == "") {
				alert("관할지 지역을 선택해주세요");
				return;
			}else if (params.coNm == null || params.coNm == "") {
				alert("회사명 입력은 필수입니다");
				return;
			} else if (params.brno == null || params.brno == "") {
				alert("사업자등록번호 입력은 필수입니다");
				return;
			} else if (brnoLength.length != 10) {
				alert("사업자등록번호를 확인해주세요");
				return;
//			} else if (params.bzmnLicenseAtchSn == null || params.bzmnLicenseAtchSn == "") {
//				alert("사업자등록증 첨부는 필수입니다");
//				return;
			} else if (params.bzmnSeCd == null || params.bzmnSeCd == "") {
				alert("사업소종류 선택은 필수입니다");
				return;
			} else if (params.bzmnSeCd == "2") {
				if (params.upBrno == null || params.upBrno == "") {
					alert("사업소가 영업소(예약소)이면 주사무소 선택은 필수입니다");
					return;
				}
			} else if (params.rprsvNm == null || params.rprsvNm == "") {
				alert("대표자명 입력은 필수입니다");
				return;
			} else if (opentime != null && opentime != "" ) {
				var firstTwoDigits = opentime.substr(0, 2);
				var lastTwoDigits = opentime.substr(opentime.length - 2, 2);
				if (firstTwoDigits > 24 || lastTwoDigits >= 60 || opentime.length != 5) {
				  alert("오픈 시간 형식이 잘못되었습니다.");
				  return;
				}
			} else if (closetime != null && closetime != "" ) {
				var firstTwoDigits = closetime.substr(0, 2);
				var lastTwoDigits = closetime.substr(closetime.length - 2, 2);
				if (firstTwoDigits > 24 || lastTwoDigits >= 60 || closetime.length != 5) {
				  alert("마감 시간 형식이 잘못되었습니다.");
				  return;
				}
			}

			if (params.mdfcnRsn == null || params.mdfcnRsn == "") {
				alert("수정사유를 입력해주세요");
				return;
			} else if(params.bsnSttsCd == '3') {
				if(confirm("폐업상태로 수정하시면 사업자 소속 사용자 계정도 모두 중지됩니다.\n수정하시겠습니까?")) {
					$cmpnymanage.event.updateFile(fileParams, params);
				}
			} else if (confirm("수정 하시겠습니까?")) {
				$cmpnymanage.event.updateFile(fileParams, params);
			}
		},

		// 파일 수정
		updateFile: function(fileParams, params) {

			// 새 파일 업로드
			if (bzFileCkd == true) {

				if (coFileCkd == true) {

					// 기존 파일 삭제
					if (params.bzmnLicenseAtchSn != null && params.bzmnLicenseAtchSn != '') {
						if (fileParams.bzFile != null) {
							$cmpnymanage.event.deleteFile(fileParams.bzFile);
						}
					}

					if (params.cocosAtchSn != null && params.cocosAtchSn != '') {
						if (fileParams.coFile != null) {
							$cmpnymanage.event.deleteFile(fileParams.coFile);
						}
					}

					var formData = new FormData();
					formData.append('files', document.getElementById('bzmnDetailFileUpload').files[0]);

					fileAjax(contextPath + "/cmmn/fileUpload", formData, function(response) {
						if (response != null) {
							params.bzmnLicenseAtchSn = nvl(response.fileSn, 0);

							var formData = new FormData();
							formData.append('files', document.getElementById('coDetailFileUpload').files[0]);

							fileAjax(contextPath + "/cmmn/fileUpload", formData, function(response) {
								if (response != null) {
									params.cocosAtchSn = nvl(response.fileSn, 0);
									$cmpnymanage.event.updateCmpny(params);
								}
							});
						}
					});
				} else {

					// 기존 파일 삭제
					if (params.bzmnLicenseAtchSn != null && params.bzmnLicenseAtchSn != '') {
						if (fileParams.bzFile != null) {
							$cmpnymanage.event.deleteFile(fileParams.bzFile);
						}
					}

					var formData = new FormData();
					formData.append('files', document.getElementById('bzmnDetailFileUpload').files[0]);

					fileAjax(contextPath + "/cmmn/fileUpload", formData, function(response) {
						if (response != null) {
							params.bzmnLicenseAtchSn = nvl(response.fileSn, 0);
							params.cocosAtchSn = nvl(fileParams.coFile, 0);
							$cmpnymanage.event.updateCmpny(params);
						}
					});
				}

			} else if (coFileCkd == true) {

				// 기존 파일 삭제
				if (params.cocosAtchSn != null && params.cocosAtchSn != '') {
					if (fileParams.coFile != null) {
						$cmpnymanage.event.deleteFile(fileParams.coFile);
					}
				}

				var formData = new FormData();
				formData.append('files', document.getElementById('coDetailFileUpload').files[0]);

				fileAjax(contextPath + "/cmmn/fileUpload", formData, function(response) {
					if (response != null) {
						params.bzmnLicenseAtchSn = nvl(fileParams.bzFile, 0);
						params.cocosAtchSn = nvl(response.fileSn, 0);
						$cmpnymanage.event.updateCmpny(params);
					}
				});
			} else {
				params.bzmnLicenseAtchSn = nvl(fileParams.bzFile, 0);
				params.cocosAtchSn = nvl(fileParams.coFile, 0);
				$cmpnymanage.event.updateCmpny(params);
			}
		},

		// 파일 삭제
		deleteFile: function(file_sn) {
			var param = {};
			param.fileSn = file_sn;
			ajax(true, contextPath + '/cmmn/deleteFile', 'body', '처리중입니다.', param, function(data) {
			});
		},

		updateCmpny: function(params) {
		var hsParams = $cmpnymanage.event.hsParamsFn(); // 히스토리입력 데이터
			$cmpnymanage.event.updateTrim(params); // input창 공백제거
			$cmpnymanage.event.updateTrim(hsParams); // input창 공백제거
			
			var combParams = [params, hsParams];
			
			ajax(true, contextPath + '/sys/companyManage/updateCmpny', 'body', '처리중입니다.', combParams, function(data) {
				alert(data.message);
				$(".register_popup").removeClass("view");
				location.reload();
			});
		},

		hsParamsFn : function (){
				var hsParams = {
        				regCmptncCd: nvl(detailParms.master.reg_cmptnc_cd, null),
        				bzmnSn: nvl(detailParms.master.bzmn_sn, null),
        				bzmnSeCd: nvl(detailParms.master.bzmn_se_cd, null),
        				offiSn: nvl(detailParms.master.offi_sn, null),
        				upBrno: nvl(detailParms.master.up_brno, null),
        				coNm: nvl(detailParms.master.co_nm, null),
        				brno: nvl(detailParms.master.brno, null),
        				bzmnLicenseAtchSn: nvl(detailParms.master.bzmn_license_atch_sn, null),
        				rprsvNm: nvl(detailParms.master.rprsv_nm, null),
        				crno: nvl(detailParms.master.crno, null),
        				cocosAtchSn: nvl(detailParms.master.cocs_atch_sn, null),
        				bizStrtDay: nvl(detailParms.master.biz_strt_day, null),

        				sggCd: nvl(detailParms.master.sgg_cd, null),
        				lat: nvl(detailParms.master.lat, null),
        				lot: nvl(detailParms.master.lot, null),
        				roadNmAddr: nvl(detailParms.master.road_nm_addr, null),
        				roadNmDaddr: nvl(detailParms.master.road_nm_daddr, null),
        				lotnoAddr: nvl(detailParms.master.lotno_addr, null),
        				garageRoadNmAddr: nvl(detailParms.master.garage_road_nm_addr, null),
        				garageRoadNmDaddr: nvl(detailParms.master.garage_road_nm_daddr, null),

        				bsnSttsCd: nvl(detailParms.master.bsn_stts_cd, null),
        				bsnSttsMdfcnDt: nvl(detailParms.master.bsn_stts_mdfcn_dt, null),
        				telno: nvl(detailParms.master.telno, null),
        				vhclRegCntom: nvl(detailParms.master.vhcl_reg_noh, null),
        				sednCarNoh: nvl(detailParms.master.car_noh, null),
        				passVhcleNoh: nvl(detailParms.master.van_noh, null),
        				operBgngDt: nvl(detailParms.master.oper_bgng_dt, null),
        				operEndDt: nvl(detailParms.master.oper_end_dt, null),
        				elecSednCarNoh: nvl(detailParms.master.elcty_car_noh, null),
        				elecPassVhcleNoh: nvl(detailParms.master.elcty_van_noh, null),
        				rmrk: nvl(detailParms.master.rmrk, null),
        				mdfcnRsn: nvl(detailParms.mdfcnRsn, null),

        				aprvDmndDt: nvl(detailParms.master.aprv_dmnd_dt, null),
        				aprvDt: nvl(detailParms.master.aprv_dt, null),
        				autzrSn: nvl(detailParms.master.autzr_sn, null),

        				aprvSttsCd: nvl(detailParms.master.aprv_stts_cd, null), // 관리자 등록으로 승인상태
        			}
                return hsParams;
		},
		updateTrim: function(params) {
			// 회사명, 대표자명, 상세주소, 차고지 도로명상세주소, 비고, 수정사유입력
			
			
			/* 리팩토링 시작 */
			if(params.coNm != null ){
				var paramsConm = params.coNm;
				var coNm = paramsConm.trim();
				params.coNm = coNm;
			}
			
			if(params.rprsvNm != null ){
				var paramsRprsvNm = params.rprsvNm;
				var rprsvNm = paramsRprsvNm.trim();
				params.rprsvNm = rprsvNm;
			}
			
			if(params.roadNmDaddr != null ) {
				var paramsRoadNmDaddr = params.roadNmDaddr;
				var roadNmDaddr = paramsRoadNmDaddr.trim();
				params.roadNmDaddr = roadNmDaddr;
			}
			
			if(params.garageRoadNmDaddr != null ) {
				var paramsGarageRoadNmDaddr = params.garageRoadNmDaddr;
				var garageRoadNmDaddr = paramsGarageRoadNmDaddr.trim();
				params.garageRoadNmDaddr = garageRoadNmDaddr;
			}
			
			if(params.rmrk != null ) {
				var paramsRmrk = params.rmrk;
				var rmrk = paramsRmrk.trim();
				params.rmrk = rmrk
			}
			
			if(params.mdfcnRsn != null ) {
				var paramsMdfcnRsn = params.mdfcnRsn;
				var mdfcnRsn = paramsMdfcnRsn.trim();
				params.mdfcnRsn = mdfcnRsn
			}
			return params
		},

		// 반려확인버튼
		deleteRequestCmpny: function(aprv) {
			var companionText = '';
			if (aprv == "반려") {
				var params = $cmpnymanage.event.detailParms();
				companionText = "확인 버튼 클릭시 삭제 됩니다. \n확인하시겠습니까?";
			} else if (aprv == "승인") {
				var params = $cmpnymanage.event.paramsInfo();
				companionText = "확인 버튼을 클릭시 재 요청이 가능합니다.\n확인하시겠습니까?";
			}
			var param = {
				bzmnSn: params.bzmnSn
			}
			if (confirm(companionText)) {
				ajax(true, contextPath + '/sys/companyManage/updateRequestCompanionChk.do', 'body', '처리중입니다.', param, function(data) {
					alert(data.message);
					$(".register_popup").removeClass("view");
					location.reload();
				});
			}
		},

		// 이관정보
		transferInfo: function() {
			var params = $cmpnymanage.event.paramsInfo();
			params.bzmnLicenseAtchSn = detailParms.master.bzmn_license_atch_sn;
			params.cocosAtchSn = detailParms.master.cocs_atch_sn;
			params.aprvSttsCd = nvl('1', null); // 타 지자체 이관 처리로 요청처리
			params.presentCtpv = $('#presentCtpv').val();
			params.presentSgg = $('#presentSgg').val();
			params.ctpv = $('#ctpv').val();
			params.regCmptncCd = $('#sgg').val();

			if (params.ctpv == '36') {
				params.regCmptncCd = '3611000000';
			} else if (params.regCmptncCd == '') {
				params.regCmptncCd = params.ctpv + '00000000';
			}

			// 지자체 이름 조회
			ajax(true, contextPath + "/sys/companyManage/areaNm", "body", "처리중입니다.", params, function(data) {
				params.presentAreaName = params.presentCtpv + ' ' + params.presentSgg
				params.areaName = data;
				params.aprvDmndCd = "3"; // 이관요청코드

				if (confirm("현재 지자체 : " + params.presentAreaName + "\n이관 할 지자체 : " + params.areaName + " \n요청 하시겠습니까?")) {

					// 요청
					ajax(true, contextPath + "/sys/companyManage/updateRequestTransferInfo", "body", "처리중입니다.", params, function(data) {
						alert(data.message);
						$(".register_popup").removeClass("view");
						location.reload();
					});
				}
			});
		},

		// 마커 생성
		insertMapMaker: function(request, data) {

			//마커 초기화
			if (marker != "") {
				map.removeLayer(marker);
				map2.removeLayer(marker);
				marker = "";
			}

			if (data != undefined) {
				if (data.lat == 0 || data.lot == 0) {
					if (request == "insert") {
						map.on('click', function(e) {
							var lat = e.latlng.lat.toFixed(9);
							var lot = e.latlng.lng.toFixed(9);

							$("#lat").val(lat);
							$("#lot").val(lot);

							if (marker) {
								map.removeLayer(marker);
							}
							marker = L.marker([lat, lot]).addTo(map);
						});
					} else if (request == "update") {

						map2.on('click', function(e) {
							var lat = e.latlng.lat.toFixed(9);
							var lot = e.latlng.lng.toFixed(9);

							$("#location_lat").val(lat);
							$("#location_lot").val(lot);

							$("#lat").val(lat);
							$("#lot").val(lot);

							if (marker) {
								map2.removeLayer(marker);
							}
							marker = L.marker([lat, lot]).addTo(map2);
						});
					}
				} else {
					if (request == "insert") {
						map.off('click');
						marker = L.marker([data.lat, data.lot]).addTo(map);
						map.addLayer(marker);
						map.setView(marker.getLatLng(), maxZoomLevel);
					} else if (request == "update") {
						map2.off('click');
						marker = L.marker([data.lat, data.lot]).addTo(map2);
						map2.addLayer(marker);
						map2.setView(marker.getLatLng(), maxZoomLevel);
					}
				}
			}
		},

		// 마커불러오기
		detailMapMaker: function(map, data) {
			if (map == "map2") {
				//마커 초기화
				if (marker != "") {
					map2.removeLayer(marker);
					marker = "";
				}

				if (data != undefined) {
					map2.off('click');
					marker = L.marker([data.lat, data.lot]).addTo(map2);
					map2.addLayer(marker);
					map2.setView(marker.getLatLng(), maxZoomLevel);
				}
				
			}

			if (map == "map3") {
				//마커 초기화
				if (marker != "") {
					map3.removeLayer(marker);
					marker = "";
				}
				if (marker !== null) {
					for (var i = 0; i < marker.length; i++) {
						map3.removeLayer(marker[i]);
					}
					marker = [];
				}
				
				if (data != undefined) {
					map3.off('click');
					marker = L.marker([data.lat, data.lot]).addTo(map3);
					map3.addLayer(marker);
					map3.setView(marker.getLatLng(), maxZoomLevel);
				}

			} else if (map == "map4") {
				// 마커 초기화
				if (marker != "") {
					map3.removeLayer(marker);
					marker = "";
				}
				if (marker !== null) {
					for (var i = 0; i < marker.length; i++) {
						map3.removeLayer(marker[i]);
					}
					marker = [];
				}

				// 새로운 마커 추가
				for (var i = 0; i < data.length; i++) {

					var color = ['#000000', '#ff3838']

					var colorIcon = L.divIcon({
						className: 'custom-div-icon',
						html: '<div style="background-color: ' + color[i] + '; border-radius: 50%; width: 20px; height: 20px;"></div>',
						iconSize: [20, 20]
					});

					var newMarker = L.marker([data[i].lat, data[i].lot], { icon: colorIcon }).addTo(map3);
					marker.push(newMarker);
				}

				// 마커들의 중심 계산
				var markerBounds = L.latLngBounds();
				for (var i = 0; i < marker.length; i++) {
					D
					markerBounds.extend(marker[i].getLatLng());
				}

				// 마커들의 중심 좌표 계산
				var centerLatLng = markerBounds.getCenter();

				// 지도의 중심을 마커들의 중심으로 이동
				map3.setView(centerLatLng, 12);
			}
		},

		// 등록팝업 지도
		insertMap: function() {

			var mapOptions = {}; // 맵 옵션
			// 맵밖으로 못가게 제한
			var corner1 = L.latLng(32, 124);
			var corner2 = L.latLng(39, 132);
			var bounds = L.latLngBounds(corner1, corner2);

			map = setRimsMap(map, "insertMap", mapOptions, bounds); // 지도 생성
			map.options.minZoom = 8;   //초기zoom조절
			map.setView(new L.latLng(36.276267, 127.376912), 8);
		},

		// 상세팝업 지도 (수정가능)
		detailMap1: function() {

			var mapOptions = {}; // 맵 옵션
			// 맵밖으로 못가게 제한
			var corner1 = L.latLng(32, 124);
			var corner2 = L.latLng(39, 132);
			var bounds = L.latLngBounds(corner1, corner2);

			map2 = setRimsMap2(map2, "detailMap1", mapOptions, bounds); // 지도 생성
			map2.options.minZoom = 8;   //초기zoom조절
			map2.setView(new L.latLng(36.276267, 127.376912), 8);
		},

		// 상세팝업 지도 (수정불가능)
		detailMap2: function() {

			var mapOptions = {};
			// 맵밖으로 못가게 제한
			var corner1 = L.latLng(32, 124);
			var corner2 = L.latLng(39, 132);
			var bounds = L.latLngBounds(corner1, corner2);

			map3 = setRimsMap3(map3, "detailMap2", mapOptions, bounds); // 지도 생성
			map3.options.minZoom = 8;	//초기zoom조절
			map3.setView(new L.latLng(36.276267, 127.376912), 8);
		},

        /**
         * @name         : updateCmpnyBrno
         * @description  : openAPI를 이용한 사업자등록정보 상태 업데이트
         * @author       : 정혜원 24.08.23
         */
        updateCmpnyBrno: function(master,responseData,hsParams){
            // 마스터 일때만 openApi를 이용한 회사상태 업데이트 및 히스토리 저장
                var combParams = [responseData, hsParams];
                $cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/companyManage/updateCmpnyBrnoBySituation', 'body', '처리중입니다.', combParams, function(data) {
                 },function(data){
                     var message =JSON.parse(data.responseText).message;
                     var bsnSttsCd =JSON.parse(data.responseText).bsnSttsCd;
                     if(message.includes("등록되지 않은 사업자등록번호")){
                          $('#businessStatus').css("color","#ff3838");
                     }else{
                          $('#businessStatus').css("color","#364BC6");
                     }

                     $('#businessStatus').append(`
                         <span >${message}</span>
                     `);

                });
        }
	};
	
	$cmpnymanage.comm = {
		/**
		 * @Description : AJAX 통신 Sync Choice 모드
		 * @Author      : 비동기 처리 (토근포함)
		 */
		syncAjax: function(choiceSync, isLodingBool, url, isLodingElement, beforeSendText, ajaxParam, fn_success, fn_complete) {

			var loader = isLoading($(isLodingElement)[0], {
				type: "overlay",
				class: "fa fa-refresh fa-spin",
				text: beforeSendText
			});

			var header = $("meta[name='_csrf_header']").attr("content");
			var token = $("meta[name='_csrf']").attr("content");

			$.ajax({
				url: url,
				type: 'POST',
				async: choiceSync,
				contentType: "application/json",
				data: JSON.stringify(ajaxParam),
				dataType: "json",
				beforeSend: function(xhr) {

					xhr.setRequestHeader(header, token);

					if (isLodingBool) {
						loader.loading();
					}
				},
				success: function(data) {
					if (fn_success != null || fn_complete != undefined) {
						fn_success(data);
					}
				},
				error: function(xhr, textStatus) {
					if (xhr.status == 401) {
						alert("권한이 없습니다. 사용자 인증이 필요합니다.");
					} else if (xhr.status == 403) {
						alert("세션이 만료되었습니다. 다시 로그인하세요.\n" + textStatus);
						location.href = "/rims";
					} else {
						alert("처리 중 에러가 발생하였습니다.");
					}
				},
				complete: function(xhr, status) {
					if (isLodingBool) {
						loader.remove();
					}
					$(".is-loading-element-overlay").remove();
					if (fn_complete != null || fn_complete != undefined) {
						fn_complete(xhr);
					}
				}
			});
		},
		
      	/**
         * @name         : ctSggDropDown
         * @description  : 시도/시군구 드롭다운 공통
         * @date         : 2024. 05. 13
         * @author       : 김경룡
         */
		ctSggDropDown: function(param, ctId, sggId) {
			var label = {};
			if(ctId == "#cmptncCtpvnm_admin") {
				label.ct = "지역(전체)";
				label.sgg = "지자체(전체)";
			} else if(ctId == "#adminCmptncZoneCdCtpvNm") {
				label.ct = "등록지역(전체)";
				label.sgg = "등록지자체(전체)";  
			} else {
				label.ct = "시도(전체)";
				label.sgg = "시군구(전체)";
			}
			
			$cmpnymanage.comm.syncAjax(true, true, contextPath + '/sys/companyManage/ctpvNm', 'body', '처리중입니다.', param, function(data) {
				$(ctId).kendoDropDownList({
					optionLabel: label.ct,
					dataTextField: "ctpv_nm",
					dataValueField: "ctpv_cd",
					dataSource: data,
					value: "ctpv_nm",
					change: function() {
						if(this.value() == '') {
							$(sggId).data("kendoDropDownList").setDataSource(null);
						} else {
							param.ctpvCd = this.value();
							$cmpnymanage.comm.syncAjax(true, true, contextPath + '/sys/companyManage/sggNm', 'body', '처리중입니다.', param, function(data) {
								$(sggId).kendoDropDownList({
									optionLabel: label.sgg,
									dataTextField: "sgg_nm",
									dataValueField: "stdg_cd",
									dataSource: data,
									value: "sgg_nm"
								});
							});
						}
					}
				});
			});
			
			if(sggId == "#cmptncSggnm_admin") {
				$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/companyManage/sggNm', 'body', '처리중입니다.', {}, function(data) {
					$(sggId).kendoDropDownList({
						optionLabel: "지자체(전체)",
						dataTextField: "sgg_nm",
						dataValueField: "stdg_cd",
						dataSource: data,
						value: "sgg_nm"
					});
				});
				var adminSggSet = setInterval(function() {
					if($(ctId)[0].value != '') {
						var sggVal = {"ctpvCd" : $(ctId)[0].value};
						$cmpnymanage.comm.syncAjax(false, true, contextPath + '/sys/companyManage/sggNm', 'body', '처리중입니다.', sggVal, function(data) {
							$(sggId).data("kendoDropDownList").setDataSource(data);
						});
						clearInterval(adminSggSet);
					}
				});
			} else if(sggId == "#adminCmptncZoneCdSggNm") {
				$(sggId).kendoDropDownList({
					optionLabel: "등록지자체(전체)",
					dataSource: {}
				});
			} else {
				$(sggId).kendoDropDownList({
					optionLabel: "시군구(전체)",
					dataSource: {}
				});
			}
		}

	};

}(window, document, jQuery));