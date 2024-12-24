/**
 * 마이페이지 JS
 *
 * history : 네이버시스템(주), 1.0, 2023/06/05  초기 작성
 * author : 백승엽
 * version : 1.0
 *
 */
(function (W, D, $) {
    'use strict';

	W.$mypage = W.$mypage || {};

	var userData = null;
	var GPKICAList = "CA131000001, CA128000001, CA131000002, CA128000002, CA974000001, CA974000002, CA131100001, CA131100002, CA134100031";

	$(document).ready(function() {
		$mypage.ui.pageLoad();
		$mypage.event.setUIEvent();
		if(authrtCd == 'G01')
			PrintObjectTag();
	});

	$mypage.ui = {
		/**
		 * @name         : pageLoad
		 * @description  : 최초 페이지 로드 시
		 * @date         : 2023. 06. 16.
		 * @author	     : 백승엽
		 */
		pageLoad : function() {
			$(".datepicker").kendoDatePicker({
				format: "yyyy-MM-dd",
				value: new Date()
			});

			$mypage.ui.dataLoad();
			$mypage.ui.gridLoad();
		},

		dataLoad: function(){

			var param = {};
			// 기본정보 ajax
			ajax(false, contextPath + '/ma/myPage/myInfo.do', 'body', '처리중입니다.', param, function(data) {
				userData = data[0];
				var cd = data[0].authrtCd;

				$("#userSn").val(data[0].userSn);
				$("#userNm").val(data[0].userNm);
				$("#userId").val(data[0].userId);
				$("#mblTelno").val($mypage.ui.toTelFormat(data[0].mblTelno));
				$("#assiTelno").val($mypage.ui.toTelFormat(data[0].assiTelno));
				$("#emlAddr").val(data[0].emlAddr);
				$("#userLoginPath").val(data[0].userLoginPath);
				$("#authrtNm").val(data[0].authrtNm);
				var certYn = data[0].certYn == 'Y' ? "등록 완료" : "등록 필요";

				if(data[0].certYn == 'Y')
					$(".cer_mng_01").css('display', 'revert');

				// 권한에따른 화면구성 변경
				if(cd.startsWith('S') || cd == 'I01'){
					// 주사업소, 영업소, 일반회원일 떄
					$("#coNmOrSggNm").html('기업명');
//					$("#cerTr").css('display', 'revert');
					$("#my_cer").val(certYn);
					if(data[0].coNm != null){
						$("#coNmOrSggNmVal").val(data[0].coNm);
					}else{
						$("#coNmOrSggNmVal").val("-");
					}
				}else if(cd.startsWith('G')){
					// 지자체 담당자
					$("#coNmOrSggNm").html('지자체');
					$("#coNmOrSggNmVal").val(data[0].stdgNm);
					$("#gpkiTr").css('display', 'revert');
					$("#gpki_cer").val(certYn);
					$(".nameBox").css('width', '100%');
					if(cd == "G01")
						$("#serviceLog").css('display', 'none');
				}else{
					// 관리자, 게스트 등등
					$("#coNmOrSggNmTr").css('display', 'none');
//					$("#cerTr").css('display', 'revert');
//					$("#my_cer").val(certYn);
				}
			});
		},

		toTelFormat : function(tel) {
			var formattedTel = '';

			if(tel != null){
				if (tel.length == 9) {
			        formattedTel = tel.substr(0, 2) + '-' + tel.substr(2, 3) + '-' + tel.substr(5);
			    } else if (tel.length == 10) {
			        formattedTel = tel.substr(0, 3) + '-' + tel.substr(3, 3) + '-' + tel.substr(6);
			    } else if (tel.length == 11) {
			        formattedTel = tel.substr(0, 3) + '-' + tel.substr(3, 4) + '-' + tel.substr(7);
			    }
			}

			return formattedTel;
		},

		gridLoad: function(){
			// 서비스이용내역 grid
			$("#grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/ma/myPage/drvVfcHist.do',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							options.dt = $("#date-picker").val();
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
				columns: [
					{ field: "sn", 			title: "순번",        width: "50px",  template: "#:sn #" },
					{ field: "dln",         title: "면허번호",     	width: "200px", template: "#= dln != null ? dln : '-' #"},
					{ field: "lcnsType",    title: "면허종별",     	width: "80px",  template: "#= lcnsType != null ? lcnsType : '-' #"},
					{ field: "vrfcDmndDt",  title: "확인요청일시", 	width: "150px", template: "#= vrfcDmndDt != null ? vrfcDmndDt : '-' #"},
					{ field: "vrfcMthd",    title: "확인방법",    	width: "130px", template: "#= vrfcMthd != null ? vrfcMthd : '-' #"},
					{ field: "resNm",       title: "확인결과",     	width: "150px", template: "#= resNm != null ? resNm : '-' #"},
					{ field: "rqstrNm",     title: "요청자",       width: "150px", template: "#= rqstrNm != null ? rqstrNm : '-' #"}
				],
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
				selectable: "row",
			});
		}
	};

	$mypage.event = {
		/**
		 *
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date         : 2023. 06. 16.
		 * @author	     : 백승엽
		 */
		setUIEvent : function() {
			$("#modifyBtn").on("click", function() {
                $mypage.event.modifyForm();
            });

            $("#updateMyInfoBtn").on("click", function() {
                $mypage.event.updateMyInfoBtn();
            });

            $("#modifyCancelBtn").on("click", function() {
                $mypage.event.modifyCancel();
            });

            $("#userWithdrawBtn").on("click", function() {
                $mypage.event.userWithdraw();
            });

            $("#basicInfo").on("click", function() {
                $mypage.event.basicInfo();
            });

			$("#etcInfo").on("click", function() {
                $mypage.event.etcInfo();
            });

            $("#serviceLog").on("click", function() {
                $mypage.event.serviceLog();
            });

			$(".cer_regis_01").on("click", function() {
				$mypage.event.SignDataCMS();
            });

            $(".cer_regis_02").on("click", function() {
				$mypage.event.SignDataWithVID();
            });

			$(".cer_mng_01").on("click", function() {
				AnySign.ShowCertManager();
            });

			$('#searchBtn').click(function() {
				$("#grid").data("kendoGrid").dataSource.page(1);
			});
		},

		SignDataCMS : function() {
			var aXgateAddress = AnySign.mXgateAddress;
			var aCAList;
			if(authrtCd == 'G01')
				aCAList = GPKICAList;
			else
				aCAList = AnySign.mCAList;
			var aPlain = "이 내용이 전자 서명됩니다";
			var aOption = 0;
			var aDescription = "";
			var aLimitedTrial = 3;

			AnySign.SignDataCMS (
				aXgateAddress,
				aCAList,
				aPlain,
				aOption,
				aDescription,
				aLimitedTrial,
				$mypage.event.SignData_callback,
				$mypage.event.ErrCallback);
		},

		SignDataWithVID : function() {
			var aXgateAddress = AnySign.mXgateAddress;
			var aCAList;
			if(authrtCd == 'G01')
				aCAList = GPKICAList;
			else
				aCAList = AnySign.mCAList;
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
				$mypage.event.SignData_callback,
				$mypage.event.ErrCallback);
		},

		SignData_callback : function(aResult) {
			$("#aSignedMsg").val(aResult);
			if(authrtCd == 'G01'){
				send_vid_info($mypage.event.SignDataWithVID_UserCallback);
			}
			else
				$mypage.event.onSendToServer(aResult);
		},

		SignDataWithVID_UserCallback : function(aResult) {
			$("#aVidMsg").val(aResult);
			$mypage.event.onSendToServer();
		},

		ErrCallback : function(aResult) {
			console.log("오류 코드  : " + aResult.code, "오류 메세지 : " + aResult.msg)
		},

		onSendToServer : function() {
			var aMessage = "";

			var param = {};

			if(authrtCd == 'G01'){
				param.aSignedMsg = $("#aSignedMsg").val();
				param.aVidMsg = $("#aVidMsg").val();
			}
			else
				param.SIGNED = $("#aSignedMsg").val();

			ajax(false, contextPath + '/cmmn/signResult', 'body', '처리중입니다.', param, function(result) {
				if (result != null) {
					if(authrtCd == 'G01'){
						if(result.vidCode != null && result.vidCode != '0') {
							alert("오류코드:" + result.vidCode + "\n" +
								   "오류메시지:" + result.vidReason);
							return;
						} else {
//							aMessage += "서명 원문:\n" + result.plain + "\n";
							aMessage += "사용자 이름:\n" + result.vidRealName + "\n";
							aMessage += "사용자 인증서:\n" + result.subjectRDN + "\n";

							alert("등록 완료되었습니다.");
							$("#gpki_cer").val("등록 완료");
							$("#subjectRDN").val(result.subjectRDN);
							$("#crtfctSeCd").val(result.crtfctSeCd);

							var stdgNm = $("#coNmOrSggNmVal").val().split(' ');

							if(result.subjectRDN.includes(stdgNm[0])){
								if(stdgNm[1] == '')
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
							$(".cer_regis_02").css('display', 'none');

//							AnySign.GetVidInfo($mypage.event.GetVidInfo_callback);
						}
					}
					else{
						if(result.code != null && result.code != '0') {
							alert("오류코드:" + result.code + "\n" +
								   "오류메시지:" + result.reason);
							return;
						} else {
							aMessage += "사용자 인증서:\n" + result.subjectRDN + "\n";
//							aMessage += "사용자 id:\n" + result.userID + "\n";

							alert("등록 완료되었습니다.");
							$("#my_cer").val("등록 완료");
							$("#subjectRDN").val(result.subjectRDN);
							$("#crtfctSeCd").val(result.crtfctSeCd);
							$("#certYn").val("Y");
							$(".cer_regis_01").css('display', 'none');
						}
					}

				}
			});
		},

		GetVidInfo_callback : function(aResult) {
			console.log(aResult)
		},

		modifyForm : function() {
			$mypage.event.infoFormChange();
		},

		updateMyInfoBtn: function(){

			var param = {};

			param = {
				assiTelno:$("#assiTelno").val().replace(/-/g, ''),
				userLoginPath:$("#userLoginPath").val(),
				userSn:$("#userSn").val(),
				subjectRDN:$("#subjectRDN").val(),
				crtfctSeCd: $('#crtfctSeCd').val(),
				certYn: $('#certYn').val()
			}

			if(confirm("수정하시겠습니까?")){

				ajax(false, contextPath + '/ma/myPage/updateMyInfo.do', 'body', '처리중입니다.', param, function(data) {
					alert("수정완료");

					$mypage.ui.dataLoad();
					$mypage.event.infoFormChange();
				});

			}else{
				alert("수정취소");
			}
		},

		modifyCancel: function(){

			// value 초기화
			$("#assiTelno").val($mypage.ui.toTelFormat(userData.assiTelno));
			$("#emlAddr").val(userData.emlAddr);
			$("#my_cer").val(userData.certYn == 'Y' ? "등록 완료" : "등록 필요");
			$mypage.event.infoFormChange();
		},

		userWithdraw: function(){
			var param = {};

			param = {userSn:$("#userSn").val()};

			if($("#userSn").val() && confirm("탈퇴하시겠습니까?")){
				ajax(false, contextPath + '/ma/myPage/updateMyWithdraw.do', 'body', '처리중입니다.', param, function(data) {
					alert("탈퇴처리 되었습니다.");
					location.href=contextPath+'/ma/logout'
				});
			}
		},

		infoFormChange: function(){
			if($("#assiTelno").attr('readonly') == 'readonly'){
				// readonly제거
				$("#assiTelno").attr('readonly', false);
				$("#my_cer").attr('readonly', false);
				// input선 토글
				$("#assiTelno").toggleClass('no_line');
				$("#my_cer").toggleClass('no_line');
				$("#gpki_cer").toggleClass('no_line');

				//버튼정보 변경
				$("#updateMyInfoBtn").css("display","block");
				$("#modifyCancelBtn").css("display","block");
   				$(".cer_regis_01").css("display","block");
				$(".cer_regis_02").css("display","block");
				$(".cer_mng_01").css("display","none");
				$("#modifyBtn").css("display","none");
				$("#userWithdrawBtn").css("display","none");
			}else{
				// readonly 추가
				$("#assiTelno").attr('readonly', true);
				$("#my_cer").attr('readonly', true);
				// input선 토글
				$("#assiTelno").toggleClass('no_line');
				$("#my_cer").toggleClass('no_line');
				$("#gpki_cer").toggleClass('no_line');

				//버튼정보 변경
				$("#updateMyInfoBtn").css("display","none");
				$("#modifyCancelBtn").css("display","none");
				$(".cer_regis_01").css("display","none");
				$(".cer_regis_02").css("display","none");
				if(userData.certYn == 'Y')
					$(".cer_mng_01").css("display","block");
				$("#modifyBtn").css("display","block");
				$("#userWithdrawBtn").css("display","block");
			}
		},

		basicInfo: function(){
			// 버튼 토글
			$('#basicInfo').attr('style', 'background-color: #F5F8FE !important');
			$('#etcInfo').attr('style', 'background-color: #FFFFFF !important');
			if(authrtCd != 'G01')
				$('#serviceLog').attr('style', 'background-color: #FFFFFF !important');
			// 화면 전환
			$('#basicInfoView').css('display', 'flex');
			$('#etcInfoView').css('display', 'none');
			$('#serviceLogView').css('display', 'none');
			$('.btn_flex').css('display', 'none');
			$('#heightChange').attr('style', 'height: 455px !important')
			$("#formChange").attr('class','mypage_cont');
		},

		etcInfo: function(){
			// 버튼 토글
			$('#basicInfo').attr('style', 'background-color: #FFFFFF !important');
			$('#etcInfo').attr('style', 'background-color: #F5F8FE !important');
			if(authrtCd != 'G01')
				$('#serviceLog').attr('style', 'background-color: #FFFFFF !important');
			// 화면 전환
			$('#basicInfoView').css('display', 'none');
			$('#etcInfoView').css('display', 'flex');
			$('#serviceLogView').css('display', 'none');
			$('.btn_flex').css('display', 'flex');
			$('#heightChange').attr('style', 'height: 368px !important')
			$("#formChange").attr('class','mypage_cont');
		},

		serviceLog: function(){
			// 버튼 토글
			$('#basicInfo').attr('style', 'background-color: #FFFFFF !important');
			$('#etcInfo').attr('style', 'background-color: #FFFFFF !important');
			$('#serviceLog').attr('style', 'background-color: #F5F8FE !important');
			// 화면 전환
			$('#basicInfoView').css('display', 'none');
			$('#etcInfoView').css('display', 'none');
			$('#serviceLogView').css('display', 'block');
			$('.btn_flex').css('display', 'none');
			$('#heightChange').attr('style', 'height: 600px !important')
			$("#formChange").attr('class','cont');
		}
	};
}(window, document, jQuery));