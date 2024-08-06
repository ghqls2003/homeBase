(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

    W.$auth = W.$auth || {};

	var authrtCd = '';
	var map = '';
	var marker = '';
	var maxZoomLevel = 18;
	var GPKICAList = "CA131000001, CA128000001, CA131000002, CA128000002, CA974000001, CA974000002, CA134100031";

    $(document).ready(function() {
		
        $auth.ui.pageLoad();		//최초 페이지 로드 시
        $auth.event.setUIEvent();
		PrintObjectTag();
    });

	$auth.ui = {
		pageLoad : function() {
			$auth.event.insertMap();
			$auth.ui.cmpnyGrid();
			$auth.ui.locgovGrid();
				$('#txtForuser').hide();
				$('#txtForPublic').hide();
				$('#txtForLAE').hide();
				$('#txtForuser2').hide();
//				$('#txtForPublic2').hide();
//				$('#txtForLAE2').hide();
			ajax(false, contextPath+"/ma/auth/selectCtpvNm", "", "", {}, function(data) {
				$(".ctpvNm").kendoDropDownList({
					dataSource: data,
			        dataTextField: "ctpv_nm",
					dataValueField: "ctpv_cd",
					optionLabel: "시도(선택)",
					change: function(e) {
						var param = {};
						if(e.sender.element[0].id == "ctpvNm"){
							param = {ctpvNm: $("#ctpvNm_label").next().children().children().text()};
						} else {
							param = {ctpvNm: $("#adminCmptncZoneCdCtpvNm_label").next().children().children().text()};
						}
					    ajax(false, contextPath+"/ma/auth/selectSggNm", "", "", param, function(data) {
							var dataSource = new kendo.data.DataSource({
		                        data: data
		                    });

							if(e.sender.element[0].id == "ctpvNm"){
								$("#sggNm").data("kendoDropDownList").setDataSource(dataSource);
							} else{
								$("#adminCmptncZoneCdSggNm").data("kendoDropDownList").setDataSource(dataSource);
							}
						});
					}
				});
			});

			ajax(false, contextPath+"/ma/auth/selectSggNm", "", "", {}, function(data) {
	            $(".sggNm").kendoDropDownList({
					dataSource: data,
			        dataTextField: "sgg_nm",
			        dataValueField: "stdg_cd",
					optionLabel: "시군구(선택)"
				});
			});

			$("#popupSearchCol").kendoDropDownList({
				dataSource: {
					data: [
					 	{name: "번호", value: "brno"},
					 	{name: "상호", value: "coNm"}
					]
				},
		        dataTextField: "name",
		        dataValueField: "value"
			});

			$("#authrtCd").kendoDropDownList({
				dataSource: {
					data: [
					 	{name: "한국교통안전공단", value: "K01"},
					 	{name: "국토교통부", value: "M01"}
					]
				},
		        dataTextField: "name",
		        dataValueField: "value",
				optionLabel: "신청권한(선택)",
				change: function() {
					authrtCd = $("#authrtCd").val();
					$("#ogdpNm").val(this.text());

					if(this.value() != '' && this.value() != null){
						ajax(false, contextPath+"/ma/auth/selectBzmnSn", "", "", {ogdpNm: $("#ogdpNm").val()}, function(result) {
				            if (result != null){
								$("#bzmnSn").val(result.bzmn_sn);
								$("#regCmptncCd").val(result.reg_cmptnc_cd);
							}
						});
					}
				}
			});

			$(".date").kendoDatePicker({
				format: "yyyy-MM-dd",
				value: new Date()
			});

			$(".num_pic").kendoNumericTextBox({
				format: "#"
			});

			ajax(false, contextPath+"/ma/auth/selectBzmnSe", "", "", {}, function(data) {
	            $("#bzmnSeCd").kendoDropDownList({
					dataSource: data,
			        dataTextField: "cd_nm",
			        dataValueField: "cd",
					optionLabel: "사업소종류(선택)",
					change: function() {
						if(this.value() == "2"){
							$(".upBrno").show();
						} else{
							$(".upBrno").hide();
						}
					}
				});
			});

			ajax(false, contextPath+"/ma/auth/selectUpBrno", 'body', '처리중입니다', {}, function(data) {
	            $("#upBrno").kendoDropDownList({
					filter: "contains",
					optionLabel: "주사무소(선택)",
					dataTextField: "up_brno",
					dataValueField: "bzmn_sn",
					dataSource: data,
					value: "up_brno"
				});
			});

			ajax(false, contextPath+"/ma/auth/selectBsnStts", "", "", {}, function(data) {
	            $("#bsnStts").kendoDropDownList({
					dataSource: data,
			        dataTextField: "cd_nm",
			        dataValueField: "cd"
				});
			});

			$(".date").prop("readonly", true);
		},

		cmpnyGrid : function() {
			$("#cmpnyGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read:{
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath+'/ma/auth/selectCompanyList',
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
							options.searchCol = $("#popupSearchCol").val();
							options.searchWrd = $("#popupSearchWrd").val();
							if($("#usrer_type01").is(":checked"))
								options.bzmnSeCd = "1";
							else if($("#usrer_type02").is(":checked"))
								options.bzmnSeCd = "2";
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
						if(authrtCd == "S01"){
						return  `
							<div class="result02" style="width: inherit; height: 235px;">
								<p class="result_txt">결과가 없습니다.</p>
		                    	<div class="btn_flex">
		                        	<button class="blue_btn" onclick=$auth.event.clickInsertBtn()>등록</button>
		                    	</div>
							</div>`
					} else{
						return "데이터가 없습니다."
					}
					}
				},
				columns: [
					{
                        title: "순번",
						width: 35,
                        field: "rn",
						template: "#: rn #"
                    },
					{
                        title: "사업자명(번호)",
						width: 120,
                        field: "co_nm",
						template: function(data) {return  "<span>" + data.co_nm + "</br>" + toBizrnoNumFormat(data.brno) + "</span>"}
                    },
                    {
                        title: "도로명주소(사업자구분)",
						width: 80,
                        field: "road_nm_addr",
                        attributes: {style: "text-align: left"},
						template: function(data) {
							return  "<span>" + data.road_nm_addr === 'null' || data.road_nm_addr === null ? '' : data.road_nm_addr
							 + "</br>" + data.cd_nm + "</span>"
						}
                    }
                ],
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
                change: $auth.ui.cmpnyRowClickEvent
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

			$('#company').val(data.co_nm);
			$('#road_num01').val(toBizrnoNumFormat(data.brno));
			$('#txtBzmnSeCd').val(data.cd_nm);
			$('#hiBzmnSeCd').val(data.bzmn_se_cd);
			$('#bzmnSn').val(data.bzmn_sn);
			$('#upBzmnSn').val(data.up_bzmn_sn);
			$('#regCmptncCd').val(data.reg_cmptnc_cd);
		},

		locgovGrid : function() {
			$("#locgovGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read:{
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath+'/ma/auth/selectLocGovList',
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
							if($("#sggNm").val() == '')
								options.ctpvNm = $("#ctpvNm").val();
							else
								options.stdgCd = $("#sggNm").val();
							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					pageSize: 7,
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
				columns: [
					{
                        title: "순번",
						width: 5,
                        field: "rn",
						template: "#: rn #"
                    },
                    {
                        title: "시도",
						width: 10,
                        field: "ctpv_nm",
						template: "#: ctpv_nm #"
                    },
                    {
                        title: "시군구",
						width: 10,
                        field: "sgg_nm",
						template: "#: nvl(sgg_nm, '전체') #"
                    }
                ],
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
                change: $auth.ui.locgovRowClickEvent
			});
		},

		locgovRowClickEvent : function(e) {
			var rows = e.sender.select();
            var data;

            rows.each(function(e) {
                var grid = $("#locgovGrid").data("kendoGrid");
                var dataItem = grid.dataItem(this);
                data = dataItem;
            });

			$('#cmptncZone').val(data.ctpv_nm + (data.sgg_nm == null ? '': ' ' + data.sgg_nm));

			$('#cmptncZoneCd').val(data.stdg_cd);
		},

		// 주소팝업
		addrDialogOpen: function() {
			var addr = fnCreateDialog("addrDialog");
			var addrCont = '<div id="addr-wrap" style="border-top: 2px solid #226882;"></div>';

			addr.kendoDialog({
				width: "528px",
				title: "주소 검색",
				closable: true,
				modal: true,
				content: addrCont,
				close: function() {
				}
			});
			addr.data("kendoDialog").open();

			// 주소 모달 위치 조정
			var top = Number($('.register_popup').css('top').replace('px', '') + 20)+'%';
			var left = Number($('.register_popup').css('left').replace('px', '') + 36)+'%';

			$('#addrDialog').parent().css("top", top);
			$('#addrDialog').parent().css("left", left);
		},

		addr: function(param) {
			var wrap = document.getElementById('addr-wrap');
			new daum.Postcode({
				width: $(".com_address01 .box").width()-74 + 'px',
				height: 450,
				oncomplete: function(data) {
					var fullBcode = data.bcode; // 최종 주소 코드
					var ctpvNm = ''; // 시도
					var stdgNm = ''; // 시구군
					var stdgCd = ''; // 시도
					var fullAddr = data.roadAddress; // 도로명 주소이자 풀 주소

					// 시도 / 시군구
					if(fullBcode != null) {
						ctpvNm = data.sido;
						stdgNm = data.sigungu;
						stdgCd = fullBcode.substr(0, 2);
						if (stdgCd == '36') {
							stdgCd = '3611000000'
						} else {
							stdgCd = fullBcode.substr(0, 5) + '00000';
						}
					}

					$("#sggCdCtpvNm").val(ctpvNm);
					$("#sggCdSggNm").val(stdgNm);

					if(param == "garage"){
						$('#garageRoadNmAddr').val(fullAddr);
					} else{
						$('#roadNmAddr').val(fullAddr);
						$('#lotnoAddr').val(data.jibunAddress);
						$("#sggCd").val(stdgCd);
					}

					$auth.ui.map().then(function(map) {
						if (param == 'office') {
							$auth.event.insertMapMaker(map); // 마커생성

							$("#lat").val(map.lat);
							$("#lot").val(map.lot);
						}
					});

			      $('.com_address01 .close').click();
			    }
			}).embed(wrap);
		},

		map: function() {
	        /**
	         * 주소 -> 좌표 변환
	         * @param x
	         * @param y
	         */
			var addr = $('#roadNmAddr').val();
            var deferred = $.Deferred();
			var params = {};

            try {
                var data = {
                    service: 'address',
                    request: 'getCoord',
                    key: 'ABB0EA1C-589F-3D7A-B4D4-AD66CA5F58B0',
                    type: 'ROAD',    /* PARCEL : 지번주소, ROAD : 도로명주소 */
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
                    beforeSend: function () {
                    },
                    complete: function (xhr, status) {
                    },
                    success: function (jsonObj) {
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
                    error: function (jxhr, textStatus) {
                        deferred.reject(textStatus);
                    }
                });
            } catch (err) {
                deferred.reject(err);
            }
            return deferred.promise();
		},
	};

    //이벤트 정의
   $auth.event = {
        setUIEvent : function() {
			//대여사업자 권한신청
			$('.S .apply_btn').click(function(){
				$(".authority_01").css('display', 'none');
				$(".authority_02").css('display', 'block');
				$('#txtForuser').show();
				$('#txtForuser2').show();
				
				authrtCd = "S01"
				$("#tab-1").addClass("current");
				$("#tab-2").removeClass("current");
				$("#tab-3").removeClass("current");

				var tab = $("div.current")[0].id;

				$("#"+ tab +"_userFileBtn").change(function() {
					var file = $(this).prop("files")[0];
					if(file != undefined){
						var fileName = file.name;

						let ext = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);

					    if(ext != 'jpg' && ext != 'jpeg' && ext != 'zip' && ext != 'png' && ext != 'pdf'){
					        alert("확장자가 jpg, jpeg, png, pdf, zip인\n파일만 업로드 할 수 있습니다.");
					        return false;
					    }

						$("#"+ tab +"_userFile").val(fileName);
					} else
						$("#"+ tab +"_userFile").val('');
				});

				$("#"+ tab +"_userFileBtn2").change(function() {
					var file = $(this).prop("files")[0];
					if(file != undefined){
						var fileName = file.name;

						let ext = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);

					    if(ext != 'jpg' && ext != 'jpeg' && ext != 'zip' && ext != 'png' && ext != 'pdf'){
					        alert("확장자가 jpg, jpeg, png, pdf, zip인\n파일만 업로드 할 수 있습니다.");
					        return false;
					    }

						$("#"+ tab +"_userFile2").val(fileName);
					} else
						$("#"+ tab +"_userFile2").val('');
				});

				$auth.event.resetUserInfo();
			});

			//공공기관 권한신청
			$('.I .apply_btn').click(function(){
				$(".authority_01").css('display', 'none');
				$(".authority_02").css('display', 'block');
				$('#txtForPublic').show();
				$('#txtForuser2').show();
				$("#tab-1").removeClass("current");
				$("#tab-2").addClass("current");
				$("#tab-3").removeClass("current");

				var tab = $("div.current")[0].id;

				$("#"+ tab +"_userFileBtn").change(function() {
					var file = $(this).prop("files")[0];
					if(file != undefined){
						var fileName = file.name;

						let ext = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);

					    if(ext != 'jpg' && ext != 'jpeg' && ext != 'zip' && ext != 'png' && ext != 'pdf'){
					        alert("확장자가 jpg, jpeg, png, pdf, zip인\n파일만 업로드 할 수 있습니다.");
					        return false;
					    }

						$("#"+ tab +"_userFile").val(fileName);
					} else
						$("#"+ tab +"_userFile").val('');
				});

				$auth.event.resetUserInfo();
			});

			//지자체 담당자 권한신청
			$('.G .apply_btn').click(function(){
				$(".authority_01").css('display', 'none');
				$(".authority_02").css('display', 'block');
				$('#txtForLAE').show();
				$('#txtForuser2').show();
				authrtCd = "G01"
				$("#tab-1").removeClass("current");
				$("#tab-2").removeClass("current");
				$("#tab-3").addClass("current");

				var tab = $("div.current")[0].id;

				$("#"+ tab +"_userFileBtn").change(function() {
					var file = $(this).prop("files")[0];
					if(file != undefined){
						var fileName = file.name;

						let ext = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);

					    if(ext != 'jpg' && ext != 'jpeg' && ext != 'zip' && ext != 'png' && ext != 'pdf'){
					        alert("확장자가 jpg, jpeg, png, pdf, zip인\n파일만 업로드 할 수 있습니다.");
					        return false;
					    }

						$("#"+ tab +"_userFile").val(fileName);
					} else
						$("#"+ tab +"_userFile").val('');
				});

				$auth.event.resetUserInfo();
			});

			$('.step2Btn').click(function(){
				$(".step3").css('display', 'none');
				if($("#chk_agree01").is(":checked")
					&& $("#chk_agree02").is(":checked")){
					$(".step1").css('display', 'none');
					$(".step2").css('display', 'block');
				} else{
					alert("모두 동의 후 다음 단계로 넘어갈 수 있습니다.")
				}
			});

			$('.homeBtn').click(function(){
				$(".authority_01").css('display', 'block');
				$(".authority_02").css('display', 'none');
				$(".step1").css('display', 'block');
				$(".step2").css('display', 'none');
				$("input:radio[name='agree']").prop("checked", false);
				$("input:radio[name='agree_02']").prop("checked", false);
			});

			$('.company_search').click(function(){
				$("#g_search_popup").removeClass("view");
				$("#popupSearchWrd").val("");
				$("#cmpnyGrid").data("kendoGrid").dataSource.page(1);
			});

			$('#cmpnySearchBtn').click(function(){
				$("#cmpnyGrid").data("kendoGrid").dataSource.page(1);
			});

			$('.locgov_search').click(function(){
				$("#g_search_popup").addClass("view");
				$('#ctpvNm').data("kendoDropDownList").value('');
				$('#sggNm').data("kendoDropDownList").value('');
				$("#locgovGrid").data("kendoGrid").dataSource.page(1);
			});

			$('.locgov_search .cancel_btn').click(function(){
				$("#g_search_popup").removeClass("view");
			});

			$('.locgov_search .close').click(function(){
				$("#g_search_popup").removeClass("view");
			});

			$('#locgovSearchBtn').click(function(){
				$("#locgovGrid").data("kendoGrid").dataSource.page(1);
			});

			$('.office').click(function(){
//				$auth.ui.addrDialogOpen();
				$auth.ui.addr("office");
			});

			$('.garage').click(function(){
//				$auth.ui.addrDialogOpen();
				$auth.ui.addr("garage");
			});

			$('.duplicChk').click(function(){
				$auth.event.duplicChk();
			});

			$("#bzmnFileBtn").change(function() {
				var file = $(this).prop("files")[0];
				var fileName = file.name;
				if(file != undefined){
					var fileName = file.name;

					let ext = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);

				    if(ext != 'jpg' && ext != 'jpeg' && ext != 'zip' && ext != 'png' && ext != 'pdf'){
				        alert("확장자가 jpg, jpeg, png, pdf, zip인\n파일만 업로드 할 수 있습니다.");
				        return false;
				    }

					$("#bzmnLicenseAtch").val(fileName);
				} else
					$("#bzmnLicenseAtch").val('');
			});

			$("#cocosFileBtn").change(function() {
				var file = $(this).prop("files")[0];
				var fileName = file.name;
				if(file != undefined){
					var fileName = file.name;

					let ext = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);

				    if(ext != 'jpg' && ext != 'jpeg' && ext != 'zip' && ext != 'png' && ext != 'pdf'){
				        alert("확장자가 jpg, jpeg, png, pdf, zip인\n파일만 업로드 할 수 있습니다.");
				        return false;
				    }

					$("#cocosAtch").val(fileName);
				} else
					$("#cocosAtch").val('');
			});

			$('.insertBtn').click(function(){
				$auth.event.setInsertParam();
			});

			$('#lat').on("input", function(){
				var latStr = $('#lat').val().replace(/[^0-9]/g, '');

				if (latStr.length < 2) {
			        $('#lat').val(latStr);
			 	} else {
			        var formattedLat = latStr.substr(0, 2) + '.' + latStr.substr(2);
			        $('#lat').val(formattedLat);
			    }
			});

			$('#lot').on("input", function(){
				var lotStr = $('#lot').val().replace(/[^0-9]/g, '');

				if (lotStr.length < 3) {
			        $('#lot').val(lotStr);
			 	} else {
			        var formattedLot = lotStr.substr(0, 3) + '.' + lotStr.substr(3);
			        $('#lot').val(formattedLot);
			    }
			});

			$(".cer_regis").on("click", function() {
//                PrintObjectTag();

				$auth.event.SignDataWithVID();
            });
            
            $auth.event.attachClickOne();
        },
        attachClickOne : function(){
			$('.requestBtn').one('click', function(){
				if($auth.event.checkClick()){
					$auth.event.setInsertUserParam();
				} else {
					$auth.event.attachClickOne();
				}
			});
		},
        
		checkClick : function() {
			var tab = $("div.current")[0].id;

			if(tab == "tab-1" && $('#company').val() == ''){
				alert("회사명을 입력해 주십시오.");
				return false;
			} else if(tab == "tab-2" && $('#authrtCd').val() == ''){
				alert("신청권한을 선택해 주십시오.");
				return false;
			} else if(tab == "tab-2" && $('#rmrk1').val() == ''){
				alert("사번을 입력해 주십시오.");
				return false;
			} else if(tab == "tab-3" && $('#cmptncZone').val() == ''){
				alert("등록 지자체를 입력해 주십시오.");
				return false;
			} else if(tab == "tab-2" && $('#ogdpDeptNm').val() == ''){
				alert("소속부서를 입력해 주십시오.");
				return false;
			} else {
				return true;
			}
		},
		
		SignDataWithVID : function() {
			var aXgateAddress = AnySign.mXgateAddress;
			var aCAList = GPKICAList;
			var aPlain = "이 내용이 전자 서명됩니다";
			var aOption = 0;
			var aDescription = "";
			var aLimitedTrial = 3;
			var aIdn = "";
			var aSvrCert = "";
			aSvrCert = s;

			AnySign.SignDataWithVID (
				aXgateAddress,
				aCAList,
				aPlain,
				aOption,
				aDescription,
				aLimitedTrial,
				aIdn,
				aSvrCert,
				$auth.event.SignData_callback,
				$auth.event.ErrCallback);
		},

		SignData_callback : function(aResult){
			$("#aSignedMsg").val(aResult);
			send_vid_info($auth.event.SignDataWithVID_UserCallback);
		},

		SignDataWithVID_UserCallback : function(aResult) {
			$("#aVidMsg").val(aResult);
			$auth.event.onSendToServer();
		},

		ErrCallback : function(aResult){
			console.log("오류 코드  : " + aResult.code, "오류 메세지 : " + aResult.msg)
		},

		onSendToServer : function() {
			var aMessage = "";

			var param = {
				aSignedMsg: $("#aSignedMsg").val(),
				aVidMsg: $("#aVidMsg").val()
			};

			ajax(false, contextPath + '/cmmn/signResult', 'body', '처리중입니다.', param, function(result) {
				if (result != null) {
					if(result.code != null) {
						alert ("오류코드:" + result.code + "\n" +
							   "오류메시지:" + result.reason);
						return;
					} else {
						aMessage += "서명 원문:\n" + result.plain + "\n";
						aMessage += "사용자 RDN:\n" + result.certificatePEM + "\n";
						aMessage += "사용자 인증서:\n" + result.subjectRDN + "\n";

						alert("등록 완료되었습니다.");
						$("#subjectRDN").val(result.subjectRDN);
						$("#crtfctSeCd").val(result.crtfctSeCd);
						var stdgNm = $("#cmptncZone").val().split(' ');
						if(result.subjectRDN.includes(stdgNm[0])){
							if(stdgNm[1] == undefined)
								$("#certYn").val("Y");
							else{
								if(result.subjectRDN.includes(stdgNm[1]))
									$("#certYn").val("Y");
								else
									$("#certYn").val("N");
							}
						}
						else
							$("#certYn").val("N");
						$("#cer").val("등록 완료");
						$(".cer_regis").css('display', 'none');
					}
				}
			});
		},

		clickInsertBtn : function() {
			$(".register_popup").addClass("view");

			$("#adminCmptncZoneCdCtpvNm").data("kendoDropDownList").setOptions({ optionLabel: "등록지역(선택)" });
			$("#adminCmptncZoneCdSggNm").data("kendoDropDownList").setOptions({ optionLabel: "등록지자체(선택)" });

			$auth.event.resetCmpnyInfo();
		},

		duplicChk : function() {
			ajax(false, contextPath+"/ma/auth/selectDuplicChk", "", "", {brno: $('#brno').val()}, function(result) {
	            if (result > 0){
					alert("중복된 사업자번호입니다.");
					$('#brno').val('');
				}
				else if (result == 0){
					alert("등록할 수 있는 사업자번호입니다.");
				}
			});
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

		// 마커 생성
		insertMapMaker: function(data) {
			//마커 초기화
			if (marker != "") {
				map.removeLayer(marker);
				marker = "";
			}

			if (data != undefined) {
				if (data.lat == 0 || data.lot == 0) {
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
				} else {
					map.off('click');
					marker = L.marker([data.lat, data.lot]).addTo(map);
					map.addLayer(marker);
					map.setView(marker.getLatLng(), maxZoomLevel);
				}
			}
		},

		setInsertParam : function() {
			// 등록관할코드
			var regCmptncCd = '';

			var ctpvCd = $('#adminCmptncZoneCdCtpvNm').val();
			var sggCd = $('#adminCmptncZoneCdSggNm').val();

			if (ctpvCd == '36') {
				regCmptncCd = '3611000000'; // 세종특별자치시 처리
			} else if (ctpvCd != '' && sggCd != '') {
				regCmptncCd = sggCd;
			} else if (ctpvCd != '' && sggCd == '') {
				regCmptncCd = ctpvCd + '00000000';
			}

			var param = {
				regCmptncCd: regCmptncCd,
				coNm: $('#coNm').val(),
				brno: $('#brno').val().replace(/-/g, ''),
				upBrno: $('#upBrno').val(),
				bzmnSeCd: $('#bzmnSeCd').val(),
				rprsvNm: $("#rprsvNm").val(),
				crno: $("#crno").val().replace(/-/g, ''),
				bizStrtDay: $('#bizStrtDay').val().replace(/-/g, ''),
//				roadNmAddr: $("#roadNmAddr").val() + ' ' + $("#roadNmAddrDetail").val(),
//				lotnoAddr: $("#lotnoAddr").val() + ' ' + $("#lotnoAddrDetail").val(),
//				garageRoadNmAddr: $('#garageRoadNmAddr').val() + ' ' + $("#garageRoadNmAddrDetail").val(),
				roadNmAddr: $("#roadNmAddr").val(),
				roadNmDaddr: $("#addrDetail").val(),
				lotnoAddr: $("#lotnoAddr").val(),
				garageRoadNmAddr: $('#garageRoadNmAddr').val(),
				garageRoadNmDaddr: $("#garageRoadNmAddrDetail").val(),
				bsnSttsCd: $('#bsnStts').val(),
				bsnSttsMdfcnDt: $("#bsnSttsMdfcnDt").val().replace(/-/g, ''),
				telno: $('#telno').val(),
				vhclRegCntom: $("#vhclRegCntom").val(),
				sednCarNoh: $("#sednCarNoh").val(),
				passVhcleNoh: $('#passVhcleNoh').val(),
				operBgngDt: $("#operBgngDt").val(),
				operEndDt: $('#operEndDt').val(),
				elecSednCarNoh: $("#elecSednCarNoh").val(),
				elecPassVhcleNoh: $("#elecPassVhcleNoh").val(),
				sggCd: $("#sggCd").val(),
				bzmnLicenseAtchSn: $("#insertUseYn").val(),
				cocosAtchSn: $("#insertSggNm").val(),
				rmrk: $("#rmrk").val()
			};

			if(param.coNm == '') {
				alert("회사명은 필수 입력 입니다.");
				return;
			} else if(param.brno == '') {
				alert("사업자번호는 필수 입력 입니다.");
				return;
			} else if(param.rprsvNm == '') {
				alert("대표자명은 필수 입력 입니다.");
				return;
			} else if($('#bzmnLicenseAtch').val() == '') {
				alert("사업자등록증은 필수 첨부 입니다.");
				return;
			} else if(param.bzmnSeCd == '') {
				alert("사업소종류는 필수 선택 입니다.");
				return;
			} else if(param.bzmnSeCd == '2' && param.upBrno == '') {
				alert("주사무소는 필수 선택 입니다.");
				return;
			} else if(ctpvCd == '') {
				alert("등록지역은 필수 선택 입니다.");
				return;
			} else if(param.roadNmAddr == '') {
				alert("도로명주소는 필수 입력 입니다.");
				return;
			} else if(param.bsnSttsCd == '') {
				alert("영업상태는 필수 선택 입니다.");
				return;
			}

			if($("#roadNmAddr").val()){
				$auth.ui.map().always(function(res) {
	                if (res !== undefined) {
						param.lat = parseFloat(res.lat).toFixed(7);
						param.lot = parseFloat(res.lot).toFixed(7);

						if($("#bzmnFileBtn").val() || $("#cocosFileBtn").val()){
							$auth.event.insertCmpnyFile(param);
						} else{
							$auth.event.insertCmpny(param);
						}
			        }
				});
			}
		},

		insertCmpnyFile : function(param) {
			if($("#bzmnFileBtn").val()){
				var formData = new FormData();
				formData.append('files', document.getElementById('bzmnFileBtn').files[0]);

					fileAjax(contextPath + "/cmmn/fileUpload", formData, function (response) {
					if (response != null) {
						param.bzmnLicenseAtchSn = nvl(response.fileSn, 0);
						if(!$("#cocosFileBtn").val())
							$auth.event.insertCmpny(param);
					}
				});
			}
			if($("#cocosFileBtn").val()){
				var formData = new FormData();
				formData.append('files', document.getElementById('cocosFileBtn').files[0]);

					fileAjax(contextPath + "/cmmn/fileUpload", formData, function (response) {
					if (response != null) {
						param.cocosAtchSn = nvl(response.fileSn, 0);
						$auth.event.insertCmpny(param);
					}
				});
			}
		},

		insertCmpny : function(param) {
			if(confirm("등록 하시겠습니까?")){
				ajax(false, contextPath+"/ma/auth/insertCmpny", "", "", param, function(result) {
		            if (result != null && result=="success"){
						alert("등록 완료되었습니다.");
						$('.register_popup .cancel_btn').click();
						$("#cmpnyGrid").data("kendoGrid").dataSource.page(1);
					}
				});
			}
		},

		authCheck: function(){
			if(authrtCd === 'S01'){
				if($("#bzmnAdmin").is(":checked")) {
			        return $('#hiBzmnSeCd').val() === '1' ? 'S01' : 'S02';
			    } else {
			        return 'S03';
			    }
			} else
		    	return authrtCd;
		},

		setInsertUserParam : function(){
			var authCheckVal = $auth.event.authCheck();
			var tab = $("div.current")[0].id;

			var param = {
				userNm: $('#'+ tab +'_user_name01').val(),
				mblTelno: $('#'+ tab +'_user_num01').val().replace(/-/g, ''),
				assiTelno: $('#'+ tab +'_second_num01').val().replace(/-/g, ''),
				emlAddr: $('#'+ tab +'_email01').val(),
				authrtCd: authCheckVal,
				bzmnSn: $('#bzmnSn').val(),
				cmptncZoneCd: $("#regCmptncCd").val()
			};

			if(authrtCd == "G01"){
				param.cmptncZoneCd = $("#cmptncZoneCd").val();
				param.subjectRDN = $("#subjectRDN").val();
				param.crtfctSeCd = $("#crtfctSeCd").val();
				param.certYn = $("#certYn").val();
			}

			if(tab == "tab-2"){
				param.ogdpNm = $("#ogdpNm").val();
				param.ogdpTelno = $("#ogdpTelno").val().replace(/-/g, '');
				param.ogdpDeptNm = $("#ogdpDeptNm").val();
			}

			if($("#"+ tab +"_userFileBtn").val() != ''){
				$auth.event.insertUserFile(param);
			} else if($("#tab-1_userFileBtn2").val() != ''){
				$auth.event.insertUserFile(param);
			} else if($("#tab-2_userFileBtn").val() != ''){
				$auth.event.insertUserFile(param);
			} else{
				$auth.event.insertUser(param);
			}
		},

		insertUserFile : function(param) {
			var formData = new FormData();
			var tab = $("div.current")[0].id;

			if(document.getElementById(tab + '_userFileBtn').files[0] != undefined)
				formData.append('files', document.getElementById(tab + '_userFileBtn').files[0]);
			else
				formData.append('files', document.getElementById(tab + '_userFileBtn2').files[0]);

			fileAjax(contextPath + "/cmmn/fileUpload", formData, function (response) {
				if (response != null) {
					param.atchFileSn = nvl(response.fileSn, 0);
					$auth.event.insertUser(param);
				}
			});
		},

		insertUser : function(param) {
			var tab = $("div.current")[0].id;
			if(tab == "tab-3" && param.certYn == '' && param.atchFileSn == undefined){
				alert("GPKI 인증서 혹은 공문을 첨부해 주십시오.");
				$auth.event.attachClickOne();				
			}
			else if(tab != "tab-3" && param.atchFileSn == undefined){
				alert("파일을 첨부해 주십시오.");
				$auth.event.attachClickOne();				
			}
			else if(tab != "tab-2" && param.atchFileSn == undefined){
				alert("파일을 첨부해 주십시오.");
				$auth.event.attachClickOne();				
			}
			else {
				if($('#message').val()!="null"){
					ajax(false, contextPath+"/ma/auth/updateUser", "", "", param, function(result) {
			            if (result != null && result=="success"){
							alert("신청 요청이 완료되었습니다.");
							$(".step1").css('display', 'none');
							$(".step2").css('display', 'none');
							$(".step3").css('display', 'block');
						}
					});
				} else{
					ajax(false, contextPath+"/ma/auth/insertUser", "", "", param, function(result) {
			            if (result != null && result=="success"){
							alert("신청 요청이 완료되었습니다.");
							$(".step1").css('display', 'none');
							$(".step2").css('display', 'none');
							$(".step3").css('display', 'block');
						}
					});
				}
			}
		},

		resetUserInfo : function() {
			$("#company").val('');
			$("#road_num01").val('');
			$("#txtBzmnSeCd").val('');
			$("#bzmnAdmin").prop("checked", false);;
			var tab = $("div.current")[0].id;
			$("#"+ tab +"_second_num01").val('');
			$("#"+ tab +"_userFile").val('');
			$("#"+ tab +"_userFileBtn").val('');
			$("#tab-1_userFile2").val('');
			$("#tab-1_userFileBtn2").val('');

			$("#ogdpNm").val('');
			$("#authrtCd").data("kendoDropDownList").value('');
			$("#rmrk1").val('');

			$("#cmptncZone").val('');
			$("#cer").val('');
		},

		resetCmpnyInfo : function() {
			$("#adminCmptncZoneCdCtpvNm").data("kendoDropDownList").value('');
			$("#adminCmptncZoneCdSggNm").data("kendoDropDownList").value('');
			$('#coNm').val('')
			$('#brno').val('');
			$('#upBrno').data("kendoDropDownList").value('');
			$(".upBrno").hide();
			$('#bzmnSeCd').data("kendoDropDownList").value('');
			$("#rprsvNm").val('');
			$("#crno").val('');
			$('#bizStrtDay').data("kendoDatePicker").value(new Date());
			$("#roadNmAddr").val('');
			$("#addrDetail").val('');
			$("#lotnoAddr").val('');
			$("#sggCd").val('');
			$('#garageRoadNmAddr').val('');
			$("#garageRoadNmAddrDetail").val('');
			$('#lat').val('');
			$("#lot").val('');
			$('#bsnStts').data("kendoDropDownList").select(0);
			$("#bsnSttsMdfcnDt").data("kendoDatePicker").value(new Date());
			$('#telno').val('');
			$("#vhclRegCntom").val(0);
			$("#sednCarNoh").val(0);
			$('#passVhcleNoh').val(0);
			$("#operBgngDt").val('');
			$('#operEndDt').val('');
			$("#elecSednCarNoh").val(0);
			$("#elecPassVhcleNoh").val(0);
			$("#sggCdSggNm").val('');
			$("#insertUseYn").val('');
			$("#insertSggNm").val('');
			$("#rmrk").val('');
			$("#bzmnLicenseAtch").val('');
			$("#bzmnFileBtn").val('');
			$("#cocosAtch").val('');
			$("#cocosFileBtn").val('');
		}
    };

}(window, document, jQuery));