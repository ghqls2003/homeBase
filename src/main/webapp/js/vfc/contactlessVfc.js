var rentno;
var sn;
var vrfcMthd=1;
var popupinPopupType = '';
var choiceVin = '';
var choiceVhclRegNo = '';
var tempHtml = ''; // 팝업 그리드 동적 html
var detailMobiDefectData = ''; // 차량결함상세데이터 전역변수
var vrfcHstrySn = ''; // 운전자격이력 일련번호 전역변수
var updateRentNo = "";
(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

	W.$drive = W.$drive || {};

	$(document).ready(function() {
		$drive.ui.pageLoad();		//최초 페이지 로드 시
		$drive.event.setUIEvent();
	});

	$drive.ui = {
		pageLoad : function() {
			$(".license_bg input").attr('readonly', true);
			$('.license_bg input[type="radio"]').attr('disabled', true);
			$('.license_bg input').css('background-color', '#f5f5f5');
			
			$(".verify-btn-app").css("display", "block");

			$("#start-picker02").kendoDatePicker({
				format: "yyyy-MM-dd",
				min: new Date(),
				value: new Date()
			});

            $("#end-picker02").kendoDatePicker({
				format: "yyyy-MM-dd",
				value: new Date(),
				min: new Date(),
				change: function() {
					if($("#start-picker02").val() > $("#end-picker02").val()){
						alert("대여시작일 이후 날짜를 선택해 주십시오.")
						$('#end-picker02').data("kendoDatePicker").value(new Date($('#start-picker02').val()));
					}
			    }
			});

			ajax(false, contextPath+'/vfc/drive/selectAreaCd', 'body', '처리중입니다.', {}, function (data) {
				$("#num01").kendoDropDownList({
		            dataTextField: "cdNm",
		            dataValueField: "cd",
		            dataSource: data
		        });
			});

			$(".datePicker").prop("readonly", true);

			if(authrtCd.includes('S')){
				ajax(false, contextPath+'/vfc/drive/selectCrno', 'body', '처리중입니다.', {}, function (data) {
					if(data!=null)
						$("#crno").val(data.crno);
				});
			}
			
			if(userType=="MOBI" && userTypeDetail==true){
				alert("면허증 촬영 및 유사도 검증 기능 사용을 위해 최신 버전의 어플리케이션으로 업데이트 해주십시오.");
				$("#rentInfoNo").attr('readonly', true);
				$("#rentInfoNo").css("background-color", "#f5f5f5"); 
			}
			
			var modal_background = document.querySelector('.similarity_pop')
			window.addEventListener('touchstart', (e) => {
				if (e.target === modal_background) {
					$(".similarity_pop").css("display", "none");
				}
			});

		},
		
		search: function(element){
			$('#rentInfo01').hide();
			$('#rentInfoNotice').hide();
			$('#rentInfo02').show();
			$('#clVfcInfo').show();
			$('#clVfcBtn').show();
			$('#rentInfoTitle').text("대여정보");
			$('#carNum').val(element[0].vhclRegNo);
			$('#clVfcStartDate').val(element[0].rentBgngDt);
			$('#clVfcEndDate').val(element[0].rentEndDt);
			
			$('#vin').val(element[0].vin);
			$('#carmdl').val(element[0].carmdl);
			$('#modelYear').val(element[0].mdlyr);
			$('#vhclNm').val(element[0].vhclNm);
			$('#bzmnSn').val(element[0].bzmnSn);
			$('#engineType').val(element[0].engineFom);
			$('#useYn').val(element[0].useYn);
			$('#signguCd').val(element[0].sggCd);
			$('#regDt').val(element[0].regDt);
			$('#rgtrSn').val(element[0].rgtrSn);
			
		},

		//app 에 호출 함수들
		similarityApp: function() {  // 유사도  // 앱테스트중
			if(userOperSystemBool){
				ocrInterface.runAlcheraLicenseCheck();
			} else {
				window.webkit.messageHandlers.runAlcheraLicenseCheck.postMessage('');
			}
		},
		showAndroidToast: function() {
			if(userOperSystemBool){
			  	ocrInterface.photographyOCR();
			}else {
				window.webkit.messageHandlers.photographyOCR.postMessage('');
			}
	  	},
		//app에서 web 호출 하는 함수 사용중 삭제 금지
		ocrResult: function(json) {
            const data = JSON.parse(json);
			data.idLicenseNumber = data.idLicenseNumber.replace(/-/g, '');
			const idLicenseTypeArray = data.idLicenseType.split(',');
			data.idLicenseType = idLicenseTypeArray[0].trim();
			$drive.ui.getOcrData(data);
        },
		getOcrData:function(data){
			$('.license_bg input').removeAttr('readonly');
			$('.license_bg input[type="radio"]').removeAttr('disabled');
			$('.license_bg input').css('background-color', '');
			
			$('#name').val(data.idName);
			$("#num01").data("kendoDropDownList").value(data.idLicenseNumber.substr(0,2));
			$('#num02').val(data.idLicenseNumber.substr(2,2));
			$('#num03').val(data.idLicenseNumber.substr(4,6));
			$('#num04').val(data.idLicenseNumber.substr(10,2));

			var asort;
			if(data.idLicenseType.includes('1종')){
				switch(data.idLicenseType){
					case '1종대형':
						asort = 11;
						break;
					case '1종보통':
						asort = 12;
						break;
					case '1종소형':
						asort = 13;
						break;
					case '1종대형견인':
						asort = 14;
						break;
					case '1종소형견인':
						asort = 16;
						break;
					case '1종구난차':
						asort = 15;
						break;
				}
			} else{
				switch(data.idLicenseType){
					case '2종보통':
						asort = 32;
						break;
					case '2종소형':
						asort = 33;
						break;
					case '2종원동기':
						asort = 38;
						break;
				}
			}
			$('input[type=radio][value='+asort+']').prop("checked", true);
			vrfcMthd = 2;
		},
		
		//app에서 web 호출 하는 함수 사용중 삭제 금지
		getRentNo: function(json) {
            const data = JSON.parse(json);
			$('#rentInfoNo').val(data.rentNo);
        },
	};

	//이벤트 정의
	$drive.event = {
		setUIEvent : function() {
			$('.rentInfoNo_btn').on('click', function(){
				var param = {};
				param.rentNo = $('#rentInfoNo').val();
				ajax(true, contextPath+'/vfc/contactlessVfc/selectRentInfo', 'body', '처리중입니다.', param, function (data) {
					if(data.length<=0){
						alert("잘못된 대여정보일련번호입니다. 다시 입력해주세요.")
					}else{
						$(".similarity_pop").css("display", "flex");
						$drive.ui.search(data);
						updateRentNo = data[0].rentNo;
					}
				});
				
			});
			
			$('.verify-btn-app').click(function(){
				if($('#car_num').val() == '') {
					alert("차량번호를 입력해 주십시오.");
				} else if($('#num01').val()!='' && $('#num02').val()!='' && $('#num03').val()!='' && $('#num04').val()!='' &&
				$('#user_name02').val()!='' && $("input[type=radio][name=category01]:checked").val() !=undefined){
					$drive.ui.similarityApp();
				} else {
					alert("면허증 촬영 및 면허증 정보를 입력해 주십시오.");
				}
			});

			$('#homeBtn').click(function(){
				$('.sub02_03').css('display', 'block');
//				$('.sub02_04').css('display', 'none');
				$('#result').empty();
				$drive.event.resetInput();
			});
			$('.blue_btn').click(function(){
				$('.carNum_popup').removeClass("view");
			});
			$('.reset-btn').click(function(){
				$drive.event.resetInput();
			});
			$(".photo_btn").on("click",function(){
				$drive.ui.showAndroidToast();
		  	});
			 $(".photo_popup .cancel_btn").on("click",function(){
			    $(".photo_popup").removeClass("view");
		  	});
			  $(".photo_popup .close").on("click",function(){
			    $(".photo_popup").removeClass("view");
		  	});

			$('#car_num').on("input", function(){
				$(this).val($(this).val().replace(/[^ㄱ-힣0-9]/gi, ""));
			});
			$('#user_tel').on("input", function(){
				$(this).val($(this).val().replace(/[^0-9-]/gi, ""));
			});
			$('#num02').on("input", function(){
				$(this).val($(this).val().replace(/[^0-9]/gi, ""));
			});
			$('#num03').on("input", function(){
				$(this).val($(this).val().replace(/[^0-9]/gi, ""));
			});
			$('#num04').on("input", function(){
				$(this).val($(this).val().replace(/[^0-9]/gi, ""));
			});
			$('#name').on("input", function(){
				$(this).val($(this).val().replace(/[^ㄱ-힣.ㆍᆢa-zA-Z]/gi, ""));
			});

			$("#cancelAndInit").on("click",function(){
				$('.result_popup').css('display', 'none');
			    $(".result_popup").removeClass("view");
				window.location.href = `${contextPath}/`;
			});

			$('.result_popup .close').click(function(){
				$('.result_popup .cancel_btn').click();
			});

			$(".similarity_pop .close").on("click",function(){
			    $(".similarity_pop").css("display", "none");
			 });
		
		},

		// todo : !! 최근이력 7일
        // 운전자격이력 건수 관련 Date 셋팅
        vfcHistDateDt: function(){
            var now = new Date();
            var endDt = dateToStr(now);
            var startDt = dateToStr(new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7));
            var startTime ='00:00';
            var endTime = '23:59';
            var startDtTm = startDt +" "+ startTime;
            var endDtTm = endDt +" "+ endTime;
            var param = {
                startDtTm :startDtTm,
                endDtTm : endDtTm
            }
            return param;
        },
        
		// 웹으로 결과 전달(2)
		alcheraCheckResult: function(json) {
			var data = JSON.parse(json);
				$drive.event.verifyLicense(data);
		},
		
		verifyLicense : function(similarityData) {
			if(userOperSystemBool){
				ocrInterface.deleteLicenseImageFile();
			} else {
				window.webkit.messageHandlers.deleteLicenseImageFile.postMessage('');
			}
                var dateData = $drive.event.vfcHistDateDt();
                var startDtTm = dateData.startDtTm;
                var endDtTm = dateData.endDtTm;

			var param = {
				num: $('#num01').val() + $('#num02').val() + $('#num03').val() + $('#num04').val(),
				name: $('#name').val(),
				type: $("input[type=radio][name=category01]:checked").val(),
				carNum: $('#carNum').val(),
//				userName: $('#user_name').val(),
//				userTel: $("#user_tel").val().replace(/-/g, ''),
				startDt: $('#clVfcStartDate').val().replace(/-/g, '').substring(0, 8),
				endDt: $('#clVfcEndDate').val().replace(/-/g, '').substring(0, 8),
                startDtTm : startDtTm , //이건 체크하기
                endDtTm : endDtTm , // 이건 체크하기
				vin: $('#vin').val(),
				carmdl: $("#carmdl").val(),
				modelYear: $('#modelYear').val(),
				vhclNm: $('#vhclNm').val(),
				bzmnSn: $("#bzmnSn").val(),
				engineType: $('#engineType').val(),
				useYn: $("#useYn").val(),
				signguCd: $("#signguCd").val(),
				regDt: $("#regDt").val(),
				rgtrSn: $("#rgtrSn").val(),
				vrfcMthd: vrfcMthd,
				similarityConfidence: similarityData.similarityConfidence,
				livenessConfidence: similarityData.livenessConfidence
			};

			//⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 🚗 todo : 반드시 추후 주석 풀것!!!!!!!!!!!!!!!!!!!!!!
			if(param.carNum == '')
				alert('차량번호를 입력해 주십시오.')
			else if($('#num01').val()!='' && $('#num02').val()!='' && $('#num03').val()!='' && $('#num04').val()!='' &&
				$('#user_name02').val()!='' && $("input[type=radio][name=category01]:checked").val() !=undefined){
            //======================================================== end =========================
				ajax(true, contextPath+"/vfc/drive/verifyLicense", 'body', '처리중입니다.', param, function(data) {
					if(data != null && data != ""){

						var resultHeaderCd = data.header.f_rtn_cd;
						var resultHeaderMsg = data.vrfcRsltMsg;
						resultHeaderCd = resultHeaderCd.padStart(2,'0');

					/*	 resultHeaderCd(vrfc_rslt ) : 00 또는 1 일때 성공
                         resultHeaderCd(vrfc_rslt ) : 나머지  또는 2 일때 실패*/

						if (resultHeaderCd == '00' || resultHeaderCd == '01' ) { // api 통신 성공 일때
                            // 운전자격이력 일련번호
                            vrfcHstrySn  = data.vrfc_hstry_sn;
							$('#result').empty();

							$('.result_popup').css('display', 'block');
							$('.result_popup').addClass("view");

							if (result.respCode == 500) {

								var html = `<p class="current_info">
			                        운전면허정보 조회 결과 <span class="point02">비정상</span> 입니다.
			                        <br>
			                        <span class="red">*</span> 비정상 사유 : 운전자격확인 프로세스가 정상적으로 이루어지지 않았습니다.` +
			                    '</p>';
								$('#result').append(html);
								return;
							}

							param.cd = data.body.f_rtn_code;
							param.sn = data.vrfc_hstry_sn;
							param.updateRentNo = updateRentNo;
//							param.dln ='251301689481'; //✂️todo
							param.dln = $('#num01').val() + $('#num02').val() + $('#num03').val() + $('#num04').val(); //✂️todo
							ajax(true, contextPath+"/vfc/contactlessVfc/selectVerifyCd", 'body', '처리중입니다.', param, function(result) {
								if (result != null && result != "") {
									rentno = result.rentno;
									if(data.body.f_rtn_code == '00'){
										if(result.data != undefined && result.total != 0){
											var html = `<p class="current_info" >
						                        차량 결함 정보가
						                        <span class = "popupSpan" id ="rslt_vehicleDefect">존재</span> 합니다.
						                    </p>`;
											$('#result').prepend(html);
										} else{
											var html = `<p class="current_info">
						                        차량 결함 정보가 없습니다.
						                    </p>`;
											$('#result').prepend(html);
										}

                                        // ✂️todo  운전자격확인 이력 건수 result.VfcHistCnt
										if(result.VfcHistCnt == 0){
											var html = `<br><p class="current_info" >
						                        최근 7일 운전자격확인 이력이 없습니다.
						                    </p><br>`;
											$('#result').prepend(html);
										} else {
					                    	var html = `<p class="current_info">
						                        최근 7일 운전자격확인 건수는
						                        <span class = "popupSpan" id = "rslt_rentalHistory" onclick =$drive.event.popupRntlHsListClick(); >`+ result.VfcHistCnt + `건</span> 입니다.
						                    </p><br>`;
											$('#result').prepend(html);
										}
										
										var similarityConfidence = parseFloat(similarityData.similarityConfidence);
										var livenessConfidence = parseFloat(similarityData.livenessConfidence);
										
										if (Number.isInteger(similarityConfidence)) {
										    similarityConfidence = parseFloat(similarityConfidence) * 100;
										} else {
										    similarityConfidence = (parseFloat(similarityConfidence) * 100).toFixed(2); 
										}
										
										if (Number.isInteger(livenessConfidence)) {
										    livenessConfidence = parseFloat(livenessConfidence) * 100;
										} else {
										    livenessConfidence = (parseFloat(livenessConfidence) * 100).toFixed(2); 
										}
											
										var html = `<br><p class="current_info">
												유사도 검증 결과 유사도는 ` + similarityConfidence + `%이며,<br>
												생체 감지는 ` + livenessConfidence + `%입니다.
						                    </p><br>`;
										$('#result').prepend(html);
										
										//==================================================운전자격확인 이력 건수 end
										var html = `<p class="current_info">운전면허정보 조회 결과 <span class="point">정상</span> 입니다.</p>`;
										$('#result').prepend(html);
									} else{
										var html = `<p class="current_info">
					                        운전면허정보 조회 결과 <span class="point02">비정상</span> 입니다.
					                        <br>
					                        <span class="red">*</span> 비정상 사유 : `+ result.code.cdNm +
					                    '</p>';
										$('#result').append(html);
									}
								}
							});
		                } else{   // api 통신 실패 일때
                            //============================================ 실패처리 24.02.14
                                alert(resultHeaderMsg);
						}
					} else{
						alert("운전자격 확인 중 오류가 발생하였습니다.");
					}
	            });
//// 🚗 todo 추후주석 풀기
			} else{
				alert("필수입력 정보를 입력해 주십시오.");
			}
// =====================end =================
		},

		resetInput : function() {
			$("#num01").data("kendoDropDownList").select(0);
			$('#user_tel').val('');
			$('#license_num').val('');
			$('#name').val('');
			$('#num02').val('');
			$('#num03').val('');
			$('#num04').val('');
			$("input[type=radio][name=category01]").prop('checked', false);
//			$("#name").attr('disabled', false);
			$("#num01").data("kendoDropDownList").readonly(false);
			$("#num02").attr('disabled', false);
			$("#num03").attr('disabled', false);
			$("#num04").attr('disabled', false);
			$('input[type=radio]').attr("disabled", false);
			vrfcMthd = 1;
		}
	};

}(window, document, jQuery));