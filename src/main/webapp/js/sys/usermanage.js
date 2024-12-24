/**
 * 사용자관리
 *
 * history : 네이버시스템(주), 1.0, 2023/06/05  초기 작성
 * author : 백승엽
 * version : 1.0
 * see : jQuery 플러그인(라이브러리 모듈화), Immediately-invoked function
 *
 */
(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

    W.$usermanage = W.$usermanage || {};

    $(document).ready(function() {
        $usermanage.ui.pageLoad();		//최초 페이지 로드 시
        $usermanage.event.setUIEvent();
    });

    // jQuery custom function
    // 라이브러리를 사용하는 외부에서 접근할 수 있도록(전역함수) encapsulation
    // 객체 메소드는 jQuery.fn($.fn)으로 정의하여 사용함. jQuery.prototype 의 별칭
    $usermanage.ui = {
        /**
         *
         * @name         : pageLoad
         * @description  : 최초 페이지 로드 시 UI에 적용
         * @date         : 2023. 06. 05.
         * @author	     : 백승엽
         */
        pageLoad : function() {

			$usermanage.ui.selectSearchData();
			//$usermanage.ui.regPopupData();
			$usermanage.ui.authCheckAndGrid();
			$usermanage.ui.cmpnyGrid();

        },

		selectSearchData: function(){
			// 검색 조건
			var param = {};

			ajax(true, contextPath+'/sys/usermanage/selectCtpvNm.do', 'body', '처리중입니다.', param, function (data) {
				$('#search_ctpv_nm').kendoDropDownList({
		            optionLabel: "시도(전체)",
		            dataTextField: "ctpv_nm",
		            dataValueField: "ctpv_cd",
		            dataSource: data,
					value : "ctpv_cd",
					change: function() {
						if(this.value() == '') {
							$('#search_sgg_nm').data("kendoDropDownList").setDataSource(null);
						} else {
						    param.ctpvCd = this.value();
							ajax(true, contextPath+'/sys/usermanage/selectSggNm.do', 'body', '처리중입니다.', param, function (data) {
								if(data.length==0){
									$('#search_sgg_nm').kendoDropDownList({
										optionLabel: "시군구"
								    });
								}else{
									$('#search_sgg_nm').kendoDropDownList({
							            optionLabel: "시군구(전체)",
							            dataTextField: "sgg_nm",
							            dataValueField: "sgg_cd",
							            dataSource: data,
										value : "sgg_cd"
							        });
								}
								
							});
						}
					}
		        });
			});

			// 시구군
			$('#search_sgg_nm').kendoDropDownList({
	            optionLabel: "시군구(전체)",
	            dataSource: {}
	        });

			ajax(false, contextPath + '/sys/usermanage/selectSttsCd.do', 'body', '처리중입니다.', param, function(data) {
				$("#search_stts_cd").kendoDropDownList({
	              optionLabel: "계정상태(전체)",
	              dataTextField: "cd_nm",
	              dataValueField: "cd_nm",
	              dataSource: data,
	              value: "cd_nm"
				});
			});

			ajax(false, contextPath + '/sys/usermanage/selectAuth.do', 'body', '처리중입니다.', param, function(data) {
				$("#search_authrt_cd").kendoDropDownList({
	              optionLabel: "권한(전체)",
	              dataTextField: "authrt_nm",
	              dataValueField: "authrt_cd",
	              dataSource: data,
	              value: "authrt_cd"
				});
			});

			var searchOtherCondition = [
		        {value : "user_id", text : "아이디"},
		        {value : "user_nm", text : "성명"},
		        {value : "co_nm", text : "회사명"},
		        {value : "brno", text : "사업자번호"},
				{value : "bzmn_sn", text : "사업자일련번호"}
	    	];
	    	$("#search_other_condition").kendoDropDownList({
              optionLabel: "검색조건 선택",
              dataTextField: "text",
              dataValueField: "value",
              dataSource: searchOtherCondition,
              value: "value"
			});

			$("#popupSearchCol").kendoDropDownList({
				dataSource: {
					data: [
						{name: "회사명", value: "coNm"},
					 	{name: "사업자번호", value: "brno"}
					]
				},
		        dataTextField: "name",
		        dataValueField: "value"
			});

		},
		regPopupData: function() {
			var param = {};
			// 사업소종류
			ajax(true, contextPath+'/sys/usermanage/selectBzmnSe.do', 'body', '처리중입니다.', param, function (data) {
				$('#bzmn_se_cd_nm').kendoDropDownList({
		            optionLabel: "사업소종류(선택)",
		            dataTextField: "cd_nm",
		            dataValueField: "cd_nm",
		            dataSource: data,
					value : "cd_nm"
		        });
			});

			// 영업상태
			ajax(true, contextPath+'/sys/usermanage/selectBsnStts.do', 'body', '처리중입니다.', param, function (data) {
				$('#bsn_stts_cd_nm').kendoDropDownList({
		            optionLabel: "영업상태(선택)",
		            dataTextField: "cd_nm",
		            dataValueField: "cd",
		            dataSource: data,
					value : "cd_nm"
		        });
			});

			// 사업게시일
			$("#biz_strt_day").kendoDatePicker({
				value: new Date(),
                dateInput: true,
                format: "yyyy-MM-dd",
            });

			// 상태변경일시
			$("#bsn_stts_mdfcn_dt").kendoDatePicker({
                value: new Date(),
                dateInput: true,
                format: "yyyy-MM-dd",
            });

		},
		authCheckAndGrid : function(){

			var param = {};

				ajax(true, contextPath+'/sys/usermanage/selectAuthrtCd.do', 'body', '처리중입니다.', param, function (data) {

				param.sggCd = data.sggCd;
				param.ctpvCd = data.ctpvCd;
				param.authrtCd = data.authrtCd;

				if(typeof param.ctpvCd != "undefined" &&
					param.authrtCd != "K01" &&
					param.authrtCd != "M01" &&
					param.authrtCd != "Z01"){
					ajax(true, contextPath+'/sys/usermanage/selectSggNm.do', 'body', '처리중입니다.', param, function (data) {
						$('#search_sgg_nm').kendoDropDownList({
				            optionLabel: "시군구(전체)",
				            dataTextField: "sgg_nm",
				            dataValueField: "sgg_cd",
				            dataSource: data,
							value : "sgg_cd"
						});
						if(param.authrtCd == "G01" || param.authrtCd == "S01" || param.authrtCd == "S02"){
							$("#search_ctpv_nm").data("kendoDropDownList").value(param.ctpvCd);
							$("#search_sgg_nm").data("kendoDropDownList").value(param.sggCd);
							$("#search_ctpv_nm").data("kendoDropDownList").readonly();
					    	$("#search_sgg_nm").data("kendoDropDownList").readonly();
						}

					});

			    }

				$usermanage.ui.kendoGridLoad();
				});

		},

		kendoGridLoad: function(){
			$("#grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sys/usermanage/userListView',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {

							var sd = $("#search_ctpv_nm").val();
							var sgg = $("#search_sgg_nm").val();

							options.cmptnc_zone_cd = sd+sgg;
							options.authrt_cd = $("#search_authrt_cd").val();
							options.stts_cd = $("#search_stts_cd").val();
							options.search_other_condition = $("#search_other_condition").val();
							options.search_wrd = $("#search_box").val();
//							options.order_case = $("#orderCase").val();

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
					serverSorting:true,
					autoBind: false,
					//sort: [{ field: "rn", dir: "asc" }],
				},
				columns: [
					{ field: "rn", title: "순번", width: "40px", template: "#:rn #" , sortable: false},
					{ field: "user_id", title: "아이디", width: "100px", template: "#= user_id != null ? user_id : '-' #", sortable: true},
					{ field: "user_nm", title: "성명", width: "100px", template: "#: user_nm#", sortable: true},
					{ field: "co_nm", title: "회사명", width: "130px",
						template: function(data) {
							if(data.authrt_cd.startsWith('G')){
								return data.ctpv_nm != null ? data.ctpv_nm + (data.sgg_nm == null ? '': ' ' + data.sgg_nm) : "-";
							}
							else
								return data.co_nm != null ? data.co_nm : "-";
						},
						sortable: false
					},
					{ field: "authrt_nm", title: "권한명", width: "80px", template: "#= authrt_nm != null ? authrt_nm : '-' #", sortable: false},
					{ field: "authrt_cd", title: "권한코드", width: "70px", template: "#= authrt_cd != null ? authrt_cd : '-' #", sortable: false},
					{ field: "stts_cd", title: "계정상태", width: "70px", template: "#= stts_cd != null ? stts_cd : '-' #", sortable: false},
					{ field: "reg_dt", title: "가입승인일", width: "130px", template: "#= reg_dt != null ? reg_dt : '-' #", sortable: true}
				],
				navigatable: true,
				sortable: {
                    mode: "single",
                    allowUnsort: true
                },
				pageable: {
					pageSizes: [10, 20, 50, 100],
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
                change: $usermanage.ui.rowClickEvent
			});
		},
		rowClickEvent : function(e) {
			var rows = e.sender.select();
            var data;

            rows.each(function() {
                var grid = $("#grid").data("kendoGrid");
                var dataItem = grid.dataItem(this);
                data = dataItem;
            });

			if(data.authrt_cd.startsWith('G')){
				$("#gBox").attr('style', 'display: block');
				$("#sBox").attr('style', 'display: none');
				$("#oBox").attr('style', 'display: none');
			}else if(data.authrt_cd == 'K01' || data.authrt_cd == 'M01'){
				$("#sBox").attr('style', 'display: none');
				$("#gBox").attr('style', 'display: none');
				$("#oBox").attr('style', 'display: block');
			} else{
				$("#sBox").attr('style', 'display: block');
				$("#gBox").attr('style', 'display: none');
				$("#oBox").attr('style', 'display: none');
			}

			var userDetail = {};
			userDetail.userSn = data.user_sn;
			$usermanage.event.selectUserDetailInfo(userDetail);
		},

		cmpnyGrid : function() {
			$("#cmpnyGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read:{
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath+'/sys/usermanage/selectCompanyList',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
							complete : function(xhr, status) {
								if(xhr.status != 200) {
									if (xhr.status == 401) {
										alert("권한이 없습니다. 사용자 인증이 필요합니다.");
									} else if (xhr.status == 403) {
										alert("세션이 만료되었습니다. 로그인페이지로 이동합니다.");
										location.href = "/rims";
									} else {
										alert("처리 중 에러가 발생하였습니다.");
									}
								}
							},
						},
						parameterMap: function(options){

							var textType = $("#popupSearchWrd").val();

							if(isNaN(textType) == false){
								// 숫자데이터면 brno
								options.brno = $("#popupSearchWrd").val();

							}else{
								// 문자데이터면 coNm
								options.coNm = $("#popupSearchWrd").val();
							}

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
					template: function(e){
						return "데이터가 없습니다."
					}
				},
				columns: [
					{
                        title: "순번",
						width: "35px",
                        field: "rn",
						template: "#: rn #"
                    },
					{
                        title: "사업자명(번호)",
						width: "120px",
                        field: "co_nm",
						template: function(data) {return  "<span>" + data.co_nm + "</br>" + toBizrnoNumFormat(data.brno) + "</span>"}
                    },
                    {
                        title: "도로명주소(사업자구분)",
						width: "150px",
                        field: "road_nm_addr",
                        attributes: {style: "text-align: left"},
						template: function(data) {
							var addr = data.road_nm_addr != null ? data.road_nm_addr : '';
							var bzmn_nm = data.bzmn_se_cd == '1' ? '주사무소' : '영업소(예약소)';
							return  "<span>" + addr + "</br>" + bzmn_nm + "</span>"}
                    }
                ],
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
                change: $usermanage.ui.cmpnyRowClickEvent
			});

		},

		cmpnyRowClickEvent : function(e) {
			var rows = e.sender.select();
            var data;

            rows.each(function(e) {
                var grid = $("#cmpnyGrid").data("kendoGrid");
                var dataItem = grid.dataItem(this);
                data = dataItem;
            });

			$('#temp_co_nm').val(data.co_nm);
			$('#temp_bzmn_sn').val(data.bzmn_sn);
			$('#temp_brno').val(data.brno);
			$('#temp_reg_cmptnc_cd').val(data.reg_cmptnc_cd);
			$('#temp_cmptnc_zone_nm').val(data.cmptnc_zone_nm);
			$('#temp_bzmn_se_cd_nm').val(data.bzmn_se_cd_nm);
			$('#temp_oper_bgng_dt').val(data.oper_bgng_dt);
			$('#temp_oper_end_dt').val(data.oper_end_dt);
			$('#temp_addr').val(data.road_nm_addr);
			$('#temp_bsn_stts_cd_nm').val(data.bsn_stts_cd_nm);
			$('#temp_drma_mdfcn_dt').val(data.drma_mdfcn_dt);

		},

		toTelFormat : function(tel) {
			var formattedTel = '';
			if(tel != null) {
				if (tel.length == 9) {
			        formattedTel = tel.substr(0, 2) + '-' + tel.substr(2, 3) + '-' + tel.substr(5);
			    } else if (tel.length == 10) {
			        formattedTel = tel.substr(0, 3) + '-' + tel.substr(3, 3) + '-' + tel.substr(6);
			    } else if (tel.length == 11) {
			        formattedTel = tel.substr(0, 3) + '-' + tel.substr(3, 4) + '-' + tel.substr(7);
			    }
			} else {
				formattedTel = '-';
			}


			return formattedTel;
		}
	},

    //이벤트 정의
    $usermanage.event = {
        /**
         * @name         : setUIEvent
         * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
         * @date         : 2023. 06. 05.
         * @author	     : 백승엽
         */
        setUIEvent : function() {

			$("#userMngBtnSearch").on("click", function() {
                $usermanage.event.search();
            });

           	$('.register_popup .btn_flex .blue_btn').click( function(){
				$usermanage.event.insertAdmin();
			});

			$(".userPagePopupClose").on("click",function(){
			    $usermanage.event.closeDetailPopup();
			});

			$("#userUpdDelBtn").on("click",function(){
			    $usermanage.event.updateDeleteUser();
			});

			$("#userudtBtn").on("click",function(){
			    $usermanage.event.setUpdateParam();
			});

			$("#popupSearchWrd").on('focus keyup', function() {
				var regex =
				/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim;

				$(this).val($(this).val().replace(regex,''));
			});
			$("#search_box").on('keydown', function(e) {
				if (e.key === 'Enter') {
					$usermanage.event.search();
				}
        	});
			//회사찾기 팝업.확인버튼
			$("#tempToApply").on("click",function(){
			    var co = $('#temp_co_nm').val();
				var bz = $('#temp_bzmn_sn').val();
				var br = $('#temp_brno').val();

				var zo = $('#temp_cmptnc_zone_nm').val();
				var se = $('#temp_bzmn_se_cd_nm').val();
				var bg = $('#temp_oper_bgng_dt').val();
				var en = $('#temp_oper_end_dt').val();

				var ad = $('#temp_addr').val();
				var st = $('#temp_bsn_stts_cd_nm').val();
				var md = $('#temp_drma_mdfcn_dt').val();

				$("#detail_co_nm").val(co);
				$("#detail_bzmn_sn").val(bz);
				$("#detail_brno").val(br);

				$('#detail_sgg_cd').val($("#temp_reg_cmptnc_cd").val());
				$('#detail_cmptnc_zone_nm').val(zo);
				$('#detail_bzmn_se_cd_nm').val(se);
				$('#detail_oper_bgng_dt').val(bg);
				$('#detail_oper_end_dt').val(en);

				$('#detail_addr').val(ad);
				$('#detail_bsn_stts_cd_nm').val(st);
				$('#detail_drma_mdfcn_dt').val(md);

			});

			$("#detail_atch_file_nm").on("click", function() {
				var atchFileSn = $("#detail_file_sn").val();
				var atchFileNm = $("#detail_atch_file_nm").val();

				if(atchFileSn != '' || atchFileNm != ''){
//					fileDownload(fileSn, fileNm);
					var realFileNm = $("#detail_atch_file_nm").val();

					let web = document.createElement('a')
					web.href = `${contextPath}/cmmn/fileDownloadGet?atchmnflSn=${atchFileSn}&atchmnflNm=${atchFileNm}`;
					web.target = '_blank'; // 새 탭에서 파일 다운로드를 시작하도록 설정
					web.download = realFileNm; // 다운로드될 파일의 이름을 설정
					document.body.appendChild(web);
				    web.click();
				    document.body.removeChild(web);
				}
			});

			$("#fileBtn").change(function() {
				var file = $(this).prop("files")[0];
				var fileName = file.name;
				if(file != undefined){
					var fileName = file.name;
					$("#detail_atch_file_nm").val(fileName);
				} else
					$("#detail_atch_file_nm").val('');
			});

			$('.cmpny_close').click(function(){
	            $("#popupSearchWrd").val('');
			});

			$('#cmpnySearchBtn').click(function(){
				$("#cmpnyGrid").data("kendoGrid").dataSource.page(1);
			});

			$(".excelDownBtn").on("click", function() {
            	$usermanage.event.excelDownBtn();
        	});
        	$('input[type=checkbox][name=orderCase]').change(function() {
				var orderSwitch = $('#orderCase').is(':checked');
				if(orderSwitch == true){
					$('#orderCase').val("dateOrder");

					var grid = $('#grid').data('kendoGrid');
		            grid.dataSource.read();
				}else{
					$('#orderCase').val("AuthrtOrder");

					var grid = $('#grid').data('kendoGrid');
		            grid.dataSource.read();
				}

			});
        },
        search : function() {

			var searchReq1 = $("#search_authrt_cd").val();
			var searchReq2 = $("#search_stts_cd").val();
			var searchReq3 = $("#search_other_condition").val();
			var searchReq4 = $("#search_box").val();

			if(searchReq3 == '' && searchReq4 != '') {
                alert("검색조건을 선택해주세요");
            }
            else if(searchReq3 != '' && searchReq4 == '' ){
				alert("검색조건을 입력해주세요");
			}
			else{
				var grid = $('#grid').data('kendoGrid');
	            grid.dataSource.page(1);
			}
        },

		updateDeleteUser : function() {

			var param = {};
			param = {userSn : $("#userUpdDelBtn").val()};
			if(confirm("정말 삭제하시겠습니까?")){
				ajax(true, contextPath + '/sys/usermanage/updateDeleteUser.do', 'body', '확인인중입니다.', param, function (data) {
					alert("삭제처리되었습니다.");

					$usermanage.event.closeDetailPopup();
					$(".detail_popup").removeClass("view");
					var grid = $('#grid').data('kendoGrid');
		            grid.dataSource.page(1);
				});
			}
		},

		setUpdateParam : function(){
			var sd = $("#detail_ctpv_nm").val();
			var sgg = $("#detail_sgg_nm").val();
			var authrtCd = $('#detail_authrt_cd').val();
			var cmptnc_zone_cd;

			var param = {
				userSn : $("#detail_user_sn").val(),
				userLoginPath : $("#detail_user_login_path").val(),
				assiTelno : $("#detail_assi_telno").val().replace(/-/g, ''),
				authrtCd : $('#detail_authrt_cd').val(),
				bzmnSn : $('#detail_bzmn_sn').val().replace(/-/g, ''),
				cmptncZoneCd : $("#detail_sgg_cd").val()
			}

			if(authrtCd.startsWith('G')){
				// 세종시 예외처리
				if(sd == "36"){
					sgg = "110";
				}

				if(sd == null || sd == '' ){
					alert("담당할 지자체를 선택해주세요")
				}else if(sgg == null || sgg == ''){
					cmptnc_zone_cd = sd+"00000000";
					param.cmptncZoneCd = cmptnc_zone_cd;
				}else{
					cmptnc_zone_cd = sd+sgg+"00000";
					param.cmptncZoneCd = cmptnc_zone_cd;
				}
			}

			if($("#fileBtn").val()){
				$usermanage.event.insertFile(param);
			} else{
				$usermanage.event.updateUserInfo(param);
			}
		},

		insertFile : function(param){
			if($("#fileBtn").val()){
				var formData = new FormData();
				formData.append('files', document.getElementById('fileBtn').files[0]);

					fileAjax(contextPath + "/cmmn/fileUpload", formData, function (response) {
					if (response != null) {
						param.fileSn = nvl(response.fileSn, 0);
						$usermanage.event.updateUserInfo(param);
					}
				});
			}
		},

		updateUserInfo : function(param){
		    // 24.10.22 jeonghyewon  개발자 또는 관리자 로는 변경 불가 하도록 추가
            var selectedAuthrtCd = $('#detail_authrt_cd').val();
            if(selectedAuthrtCd.startsWith("Z") || selectedAuthrtCd.startsWith("D")) {
                 alert("해당 권한으로 수정할 수 없습니다.");
                 return ;
            }
			ajax(true, contextPath + '/sys/usermanage/updateUserInfo.do', 'body', '확인인중입니다.', param, function (data) {
				alert("수정되었습니다.");
			});
		},



		updateApprove: function(userSn, authrtCd){
			var param = {}
			param.userSn = userSn;
			param.authrtCd = authrtCd;
			param.aprvRjct = "승인";

            //지자체 일경우
			if($("#gBox").is(':visible') == true){
				ajax(true, contextPath + '/sys/usermanage/updateApprove.do', 'body', '확인인중입니다.', param, function (data) {
					alert("승인되었습니다.");

					$usermanage.event.closeDetailPopup();
					$usermanage.event.selectUserDetailInfo(param);

				});
			}
			else{
            // 지자체 외 권한 일 경우 . 소속 기업의 승인상태 확인 후 사용자 승인 되어야함
				ajax(true, contextPath+'/sys/usermanage/selectApproveStts.do', 'body', '처리중입니다.', param, function (data) {

						if(data.aprv_stts_cd == "2"){
							ajax(true, contextPath + '/sys/usermanage/updateApprove.do', 'body', '확인인중입니다.', param, function (data) {
								alert("승인되었습니다.");

								$usermanage.event.closeDetailPopup();
								$usermanage.event.selectUserDetailInfo(param);
							});
						}else{
						alert(data.aprv_stts_cd);
					}
				})
			}
		},

		updateReject: function(user_sn){
			var param = {
						userSn : user_sn,
						rjctRsn : $("#detail_rjct_rsn").val()
						};

			if(param.rjctRsn.length < 4){
				alert("반려사유를 5자 이상 적어주세요");
			}else{
				ajax(true, contextPath + '/sys/usermanage/updateReject.do', 'body', '확인인중입니다.', param, function (data) {
					alert("반려되었습니다.");

					$usermanage.event.closeDetailPopup();
					$usermanage.event.selectUserDetailInfo(param);

				});

			}

		},
		updateLock: function(user_sn){
			var param = {
				userSn : user_sn
			};
			ajax(true, contextPath + '/sys/usermanage/updateLock.do', 'body', '확인인중입니다.', param, function (data) {
				alert("정지되었습니다.");

				$usermanage.event.closeDetailPopup();
				$usermanage.event.selectUserDetailInfo(param);
			});
		},

		updateUnlock: function(user_sn){
			var param = {userSn : user_sn};
			ajax(true, contextPath + '/sys/usermanage/updateUnlock.do', 'body', '확인인중입니다.', param, function (data) {
				alert("잠김해제되었습니다.");

				$usermanage.event.closeDetailPopup();
				$usermanage.event.selectUserDetailInfo(param);

			});

		},

		updateLongterm: function(user_sn){
			var param = {userSn : user_sn};
			ajax(true, contextPath + '/sys/usermanage/updateLongterm.do', 'body', '확인인중입니다.', param, function (data) {
				alert("휴면해제되었습니다.");

				$usermanage.event.closeDetailPopup();
				$usermanage.event.selectUserDetailInfo(param);

			});

		},

		updateReleaseStop: function(user_sn){
			var param = {userSn : user_sn};
			ajax(true, contextPath + '/sys/usermanage/updateReleaseStop.do', 'body', '확인인중입니다.', param, function (data) {
				alert("정지해제되었습니다.");

				$usermanage.event.closeDetailPopup();
				$usermanage.event.selectUserDetailInfo(param);

			});

		},
		updateWithdraw: function(user_sn){
			var param = {userSn : user_sn};
			ajax(true, contextPath + '/sys/usermanage/updateWithdraw.do', 'body', '확인인중입니다.', param, function (data) {
				alert("탈퇴해제되었습니다.");

				$usermanage.event.closeDetailPopup();
				$usermanage.event.selectUserDetailInfo(param);

			});

		},

		excelDownBtn: function() {
			var params = {};
			var sd = $("#search_ctpv_nm").val();
			var sgg = $("#search_sgg_nm").val();

			params.cmptnc_zone_cd = sd + sgg;
			params.authrt_cd = $("#search_authrt_cd").val();
			params.stts_cd = $("#search_stts_cd").val();
			params.search_other_condition = $("#search_other_condition").val();
			params.search_wrd = $("#search_box").val();
//			params.order_case = $("#orderCase").val();
//			params.elxExcelDownReason = $('#elxExcelDownReason').val();
			params._csrf = $('._csrf').val();

//			checkPrivacyInfo("/sys/usermanage/excelDown", params, "usermanage")

			var totalRowCount = $("#grid").data("kendoGrid").dataSource.total();
			excelDown("/sys/usermanage/excelDown", params, "usermanage", totalRowCount);
		},

		selectUserDetailInfo : function(param){
			ajax(true, contextPath + '/sys/usermanage/selectUserDetailInfo.do', 'body', '확인인중입니다.', param, function (data) {

					var loginAuthrtCd  = data.loginAuthrtCd;
					var data = data.data[0];

					$("#detail_user_sn").val(data.user_sn);
					$("#detail_user_login_path").val(data.source_table);
					$("#detail_authrt_cd").val(data.authrt_cd);
					$("#detail_mbl_telno").val($usermanage.ui.toTelFormat(data.mbl_telno));
					$("#detail_assi_telno").val($usermanage.ui.toTelFormat(data.assi_telno));
					$("#detail_last_lgn_dt").val(data.last_lgn_dt);
					$("#detail_aprv_dmnd_dt").val(data.aprv_dmnd_dt);
					$("#detail_user_id").val(data.user_id);
					$("#detail_user_nm").val(data.user_nm);
					$("#detail_eml_addr").val(data.eml_addr);
					$("#detail_mdfcn_dt").val(data.mdfcn_dt);
					$("#detail_aprv_dt").val(data.aprv_dt);
					$("#detail_file_sn").val(data.file_sn);
					$("#detail_atch_file_nm").val(data.atch_file_nm);

					$("#detail_co_nm").val(data.co_nm);
					$("#detail_bzmn_sn").val(data.bzmn_sn);
					$("#detail_brno").val(toBizrnoFormat(data.brno));
					$("#detail_sgg_cd").val(data.sgg_cd);
					$("#detail_cmptnc_zone_nm").val(data.cmptnc_zone_nm);
					$("#detail_addr").val(data.road_nm_addr);
					$("#detail_bzmn_se_cd_nm").val(data.bzmn_se_cd_nm);
					$("#detail_bsn_stts_cd_nm").val(data.bsn_stts_cd_nm);
					$("#detail_oper_bgng_dt").val(data.oper_bgng_dt);
					$("#detail_oper_end_dt").val(data.oper_end_dt);
					$("#detail_drma_mdfcn_dt").val(data.drma_mdfcn_dt);

					$("#detail_ogdp_nm").val(data.ogdp_nm);
					$("#detail_ogdp_dept_nm").val(data.ogdp_dept_nm);
					$("#detail_ogdp_telno").val($usermanage.ui.toTelFormat(data.ogdp_telno));
					$("#detail_ogdp_mdfcn_dt").val(data.drma_mdfcn_dt);

					var real_authrt_cd = data.authrt_cd;
					var fileSn = data.file_sn;
					var fileNm = data.atch_file_nm;

					var param = {};
					var zone_cd = data.cmptnc_zone_cd;
					var ctpvVal;
					var sggVal;

					if(data.cmptnc_zone_cd != null){
						ctpvVal =  zone_cd.substring(0,2);
						sggVal =  zone_cd.substring(2,5);
					}

					ajax(true, contextPath+'/sys/usermanage/selectCtpvNm.do', 'body', '처리중입니다.', param, function (data) {
						$('#detail_ctpv_nm').kendoDropDownList({
				            optionLabel: "시도(전체)",
				            dataTextField: "ctpv_nm",
				            dataValueField: "ctpv_cd",
				            dataSource: data,
							value : "ctpv_cd",
							change: function() {
							    param.ctpvCd = this.value();

								ajax(true, contextPath+'/sys/usermanage/selectSggNm.do', 'body', '처리중입니다.', param, function (data) {
									$('#detail_sgg_nm').kendoDropDownList({
							            optionLabel: "시군구(전체)",
							            dataTextField: "sgg_nm",
							            dataValueField: "sgg_cd",
							            dataSource: data,
										value : "sgg_cd"
							        });
								});
							}
				        });
						if(zone_cd == null){
							// 시구군
							$('#detail_sgg_nm').kendoDropDownList({
								optionLabel: "시군구(전체)",
								dataSource: {}
							});
						}else{
							param.ctpvCd = ctpvVal;
							ajax(true, contextPath+'/sys/usermanage/selectSggNm.do', 'body', '처리중입니다.', param, function (data) {
								$('#detail_sgg_nm').kendoDropDownList({
									optionLabel: "시군구(전체)",
									dataTextField: "sgg_nm",
									dataValueField: "sgg_cd",
									dataSource: data,
									value : "sgg_cd"
								});
									$("#detail_ctpv_nm").data("kendoDropDownList").value(ctpvVal);
									$("#detail_ctpv_nm").val(ctpvVal);
									$("#detail_sgg_nm").data("kendoDropDownList").value(sggVal);
									$("#detail_sgg_nm").val(sggVal);
							});
						}
					});

					if(fileSn == '' || fileSn == null || fileNm == '' || fileNm == null){
						$("#detail_atch_file_nm").attr('style', '');
					}else{
						$("#detail_atch_file_nm").attr('style', 'cursor: pointer');
					}

					$(".detail_popup").addClass("view");

					$(".request").append(`${data.stts_cd}`);

					if(loginAuthrtCd == "K01" || loginAuthrtCd == "Z01"){

						$("#detail_authrt_cd").attr('readonly', false);
						$("#detail_authrt_cd").attr('class', 'input');

						$("#detail_co_nm").attr('class', 'input');
						$("#btn_setting").append(`
							<button
								class="yellow_btn company_search"
								onClick=$usermanage.event.companyPopup();
								>
								회사찾기
							</button>
						`);

						var param = {userSn : data.user_sn};

						ajax(true, contextPath+'/sys/usermanage/selectAuthrtNm.do', 'body', '처리중입니다.', param, function (data) {

							$('#detail_authrt_cd').kendoDropDownList({
					            optionLabel: data[0].user_authrt_nm,
					            dataTextField: "authrt_nm",
					            dataValueField: "authrt_cd",
					            dataSource: data,
								value : "authrt_cd",
								change: function(){
									if(this.value().startsWith('G')){
										$("#gBox").attr('style', 'display: block');
										$("#sBox").attr('style', 'display: none');
										$("#oBox").attr('style', 'display: none');
									}else if(this.value() == 'K01' || this.value() == 'M01'){
										$("#sBox").attr('style', 'display: none');
										$("#gBox").attr('style', 'display: none');
										$("#oBox").attr('style', 'display: block');
									} else{
										$("#sBox").attr('style', 'display: block');
										$("#gBox").attr('style', 'display: none');
										$("#oBox").attr('style', 'display: none');
									}
								}
					        });

					      	$("#detail_authrt_cd").data("kendoDropDownList").value(real_authrt_cd);
					      	$("#detail_authrt_cd").val(real_authrt_cd);

						});
					}
					if(data.rjct_rsn == null || data.rjct_rsn == ''){
						data.rjct_rsn = '반려사유 없음';
					}

					if(loginAuthrtCd != "Z01"){
						$("#userUpdDelBtn").remove();
					}

					if(loginAuthrtCd == "Z01" || loginAuthrtCd == "G01" || loginAuthrtCd == "K01"){
						if(data.stts_cd == '요청'){
							$(".stts_btns").append(`
							<button class="ap_btn"
								style=margin-right:"5px"
								onClick="$usermanage.event.updateApprove(${data.user_sn}, '${data.authrt_cd}')";>
								승인
							</button>
							<button class="ap_btn"
								style=margin-right:"5px"
								onClick="$usermanage.event.updateRejectForm(${data.user_sn}, '${data.authrt_cd}')";>
								반려
							</button>
							`);

							$(".reject_reason").append(`
	                            <th scope="col">반려사유</th>
	                            <td>
	                            <div class="tb_flex">
	                                <label for="detail_rjct_rsn">반려사유</label>
	                                <input type="text" id="detail_rjct_rsn" name="detail_rjct_rsn" class="input" style="margin-right:5px;"
	                                   placeholder="반려사유를 입력해주세요"/>
	                               <button class="ap_btn" style="margin-right:5px;" onclick="$usermanage.event.updateReject(${data.user_sn});">
									등록
									</button>
									<button class="ap_btn" style="margin-right:5px;" onclick="$usermanage.event.updateRejectCancel();">
									취소
									</button>
	                            </div>

	                            </td>
							`);

						}else if(data.stts_cd == '승인'){
							$(".stts_btns").append(`
							<button class="ap_btn"
								style=margin-right:"5px"
								onClick=$usermanage.event.updateLock(${data.user_sn});>
								정지
							</button>`);
						}else if(data.stts_cd == '잠김'){
							$(".stts_btns").append(`
							<button class="ap_btn"
								style=margin-right:"5px"
								onClick=$usermanage.event.updateLock(${data.user_sn});>
								잠김해제
							</button>`);
						}else if(data.stts_cd == '휴면'){
							$(".stts_btns").append(`
							<button class="ap_btn"
								style=margin-right:"5px"
								onClick=$usermanage.event.updateLongterm(${data.user_sn});>
								휴면해제
							</button>`);
						}else if(data.stts_cd == '정지'){
							$(".stts_btns").append(`
							<button class="ap_btn"
								style=margin-right:"5px"
								onClick=$usermanage.event.updateReleaseStop(${data.user_sn});>
								정지해제
							</button>`);
						}else if(data.stts_cd == '반려'){
							$(".stts_btns").append(`
							<p>반려사유 : ${data.rjct_rsn}</p>`);
						};
					}

					if(data.stts_cd == '탈퇴' && loginAuthrtCd == "Z01"){
						$(".stts_btns").append(`
						<button class="ap_btn"
							style=margin-right:"5px"
							onClick=$usermanage.event.updateWithdraw(${data.user_sn});>
							탈퇴해제
						</button>`);
					}
				}
			)
		},

		updateRejectForm: function(userSn, authrtCd){
			var param = {}
			param.userSn = userSn;
			param.authrtCd = authrtCd;
			param.aprvRjct = "반려";

			ajax(true, contextPath+'/sys/usermanage/selectApproveStts.do', 'body', '처리중입니다.', param, function (data) {

				if(data.authrt_cd == "2"){
					if(!data.authrt_cd || data.authrt_cd.length == 0){
						alert(data.aprv_stts_cd);
					}else if(data.aprv_stts_cd != null && data.aprv_stts_cd == "2"){
							$(".reject_reason").attr('style', 'display: contents');
					}else{
						alert(data.aprv_stts_cd);
					}
				}else{
					$(".reject_reason").attr('style', 'display: contents');
				}
			})
		},

		updateRejectCancel: function(){
			$(".reject_reason").attr('style', 'display: none');
			$(".reject_reason").val('');
		},

		closeDetailPopup : function () {
			$('.request')[0].innerText = '';
			$('.stts_btns')[0].innerHTML = '';

			$('.reject_reason').empty();
			$(".reject_reason").attr('style', 'display: none');
			$(".company_search").remove();

			var grid = $('#grid').data('kendoGrid');

			$("#fileBtn").val('');

		    grid.dataSource.read();
		},
		companyPopup: function(){
			$(".c_search_popup").addClass("view");
			$('#cmpnyGrid').data('kendoGrid').dataSource.page(1);
		}

    };

}(window, document, jQuery));