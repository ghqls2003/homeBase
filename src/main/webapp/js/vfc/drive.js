var rentno;
var sn;
var vrfcMthd=1;
var popupinPopupType = '';
var choiceVin = '';
var choiceVhclRegNo = '';
var tempHtml = ''; // 팝업 그리드 동적 html
var detailMobiDefectData = ''; // 차량결함상세데이터 전역변수
var vrfcHstrySn = ''; // 운전자격이력 일련번호 전역변수
var similarityChk = false; // 유사도 검증 체크박스 전역변수
var similarityImage = false; // 유사도 검증 이미지유무 전역변수
(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

	W.$drive = W.$drive || {};

	$(document).ready(function() {
		$drive.ui.pageLoad();		//최초 페이지 로드 시
		$drive.event.setUIEvent();
	});

	var pcColumns = [
		{title: "순번", width: "40px", field: "rn", template: "#: rn #"},
		{title: "차량등록번호", width: "120px", field: "vhclRegNo", template: "#: vhclRegNo #"},
		{title: "차대번호", width: "150px", field: "vin", template: "#: vin #"},
		{title: "차종", width: "60px", field: "carmdl", template: "#: carmdl #"},
		{title: "연식", width: "60px", field: "mdlyr",template: "#: mdlyr #"},
		{title: "소유자명", width: "120px", field: "ownrNm", template: "#: ownrNm #"},
		{title: "등록일", width: "120px", field: "regDt", template: "#: regDt #"}
	];
	
	var pcColumns_agency = [
		{ title: "즐겨찾기", width: "60px", field: "bookmark" 
			, template:function(dataItem) {
					        var value = dataItem.regYn == "Y" ? "Y" : "N";
					        var imageName = value=="Y" ? "star_y.png" : "star_n.png";
					        return '<div class="bookmark" value="' + value + '"><img src="' + contextPath + '/images/sub/' + imageName + '"></div>';
			}
		},
		{title: "순번", width: "40px", field: "rn", template: "#: rn #"},
		{title: "차량등록번호", width: "120px", field: "vhclRegNo", template: "#: vhclRegNo #"},
		{title: "차대번호", width: "150px", field: "vin", template: "#: vin #"},
		{title: "차종", width: "60px", field: "carmdl", template: "#: carmdl #"},
		{title: "연식", width: "60px", field: "mdlyr",template: "#: mdlyr #"},
		{title: "소유자명", width: "120px", field: "ownrNm", template: "#: ownrNm #"},
		{title: "등록일", width: "120px", field: "regDt", template: "#: regDt #"}
	];

	var mobiColumns = [
		{title: "순번", width: "40px", field: "rn", template: "#: rn #"},
		{title: "차량등록번호", width: "120px", field: "vhclRegNo", template: "#: vhclRegNo #"},
		{title: "차종", width: "60px", field: "carmdl", template: "#: carmdl #"}
	];

    // 차량결함 그리드 컬럼
	var defectColumns =[
                    { field: "rn", title: "순번", width:"50px", template: "#= !rn ? '' : rn #" },
                    { field: "vhclRegNo", title: "차량등록번호", width: "100px", template: "#= !vhclRegNo ? '-' : vhclRegNo #"},
//                    { field: "vin", title: "차대번호", width: "101px", template: "#= !vin ? '-' : vin #" },
                    { field: "coNm", title: "회사명", width: "100px", template: "#= !coNm ? '-': coNm #" },
//                    { field: "ownrNm", title: "소유자명", width: "100px", template: "#= !ownrNm ? '-' : ownrNm #" },
                    { field: "prcsSttsCd", title: "처리상태코드", width: "150px", attributes: {"class": "table-cell",style: "white-space: normal;text-align: left;"}, template:"#= !prcsSttsCd ? '-': prcsSttsCd #"},
                    { field: "defectsCn", title: "결함내용", width: "150px", attributes: {"class": "table-cell ",style: "white-space: normal;text-align: left;" },  template:"#= !defectsCn ? '-': defectsCn #"},
//                    { field: "useYn", title: "사용여부", width: "40px", template: "#= !useYn ? '-' : useYn #" },
					{ field: "defectYn", title: "결함여부", width: "40px", template: "#= !defectYn ? '-' : defectYn #", hidden:true},
    ];

    // 운전자격이력 그리드 컬럼 ✂️todo : 대여이력을 운전자격이력에서 가져올때 사용할 컬럼
    var rentalHistManageColumns = [
               { field: "sn",          title: "순번",         width: "65px",  template: "#=sn #" },
               { field: "dln",         title: "면허번호",     width: "180px", template: "#= dln != null ? dln : '-' #"},
//               { field: "lcnsType",    title: "면허종별",     width: "80px",  template: "#= lcnsType != null ? lcnsType : '-' #"},
               { field: "vrfcDmndDt",  title: "확인요청일시", width: "150px", template: "#= vrfcDmndDt != null ? $drive.ui.dateFomat(vrfcDmndDt) : '-' #"},
               { field: "vrfcMthd",    title: "확인방법",     width: "130px", template: "#= vrfcMthd != null ? vrfcMthd : '-' #"},
               { field: "resNm",       title: "확인결과",     width: "150px", template: "#= verifyNm != null ? verifyNm : '-' #"},
//               { field: "rqstrNm",     title: "요청자",       width: "150px", template: "#= rqstrNm != null ? rqstrNm : '-' #"},
               { field: "coNm",        title: "회사명",   width: "150px", template: "#= coNm != null ? coNm : '-' #"}
            ];
    // 대여이력 그리드 컬럼
//    var rentalHistManageColumns = [
//    		{ title: "순번", field: "rn", template: "#: rn #", width: 50 },
//    		{ title: "회사명", field: "coNm", template: "#: nvl(coNm, '-') #", width: 80 },
//    		{ title: "차량번호", field: "vhclRegNo", template: "#: vhclRegNo #", width: 80 },
//    		{
//    			title: "검증요청일시",
//    			field: "regDt",
//    			width: 150,
//    			template: function(dataItem) {
//    				var date = new Date(dataItem.regDt);
//    				var yyyy = date.getFullYear();
//    				var mm = ("0" + (date.getMonth() + 1)).slice(-2);
//    				var dd = ("0" + date.getDate()).slice(-2);
//    				var hh = ("0" + date.getHours()).slice(-2);
//    				var min = ("0" + date.getMinutes()).slice(-2);
//    				return yyyy + "-" + mm + "-" + dd + " " + hh + ":" + min;
//    			}
//    		},
//    	];



	$drive.ui = {
		pageLoad : function() {
			
			if(userType=="PC"){  // 신규 앱 배포 시 주석 해제
				$(".similarityChkBox").css("display", "none");  // 신규 앱 배포 시 주석 해제
				$("#similarity_tb_top").css("display", "none");  // 신규 앱 배포 시 주석 해제
			} else if(userType == "MOBI" && userTypeDetail) {  // 신규 앱 배포 시 주석 해제
				$(".similarityChkBox").css("display", "none");
				$("#similarity_tb_top").css("display", "none");
			} else if(userType == "MOBI" && !userTypeDetail && old_new == "OLD") {  // 신규 앱 배포 시 주석 해제
				$(".similarityChkBox").css("display", "none");  // 신규 앱 배포 시 주석 해제
				$("#similarity_tb_top").css("display", "none");  // 신규 앱 배포 시 주석 해제
			}  // 신규 앱 배포 시 주석 해제
			
			$drive.ui.kendoGrid();
			$drive.ui.detailDefectGrid();
			
			if(userTypeBool){
				$(".photo_btn").remove();
				$(".verify-btn").css("display", "block");
			} else {
				if(userType == "MOBI" && userTypeDetail) {
					$(".photo_btn").remove();
					$(".verify-btn").css("display", "block");
				} else if(userType == "MOBI" && !userTypeDetail && old_new == "OLD") {  // 신규 앱 배포 시 주석 해제
					$(".upload_btn").remove();  // 신규 앱 배포 시 주석 해제
					$(".verify-btn").css("display", "block");  // 신규 앱 배포 시 삭제
				} else {
					$(".upload_btn").remove();
//					$(".verify-btn").css("display", "block");  // 신규 앱 배포 시 삭제
					$(".verify-btn-app").css("display", "block");  // 신규 앱 배포 시 주석 해제
				}
			}

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

			// 운전면허번호 (-) 추가
			/*var lastValue = '';
			document.getElementById('license_num').addEventListener('keyup', function (e) {
			    var target = e.target;
			    var newValue = target.value.replace(/\D/g, '').replace(/(\d{2})?(\d{6})?(\d{2})?/, function(_, p1, p2, p3){
			        var res = '';
			        if(p1) res += p1 + '-';
			        if(p2) res += p2 + '-';
			        if(p3) res += p3;
			        return res;
			    });

			    // '-'를 지우려는 시도가 아니면 값을 업데이트
			    if (!(lastValue.length > target.value.length && lastValue.slice(0, -1) === target.value)) {
			        target.value = newValue;
			        target.setSelectionRange(target.value.length, target.value.length);
			    }

			    // 마지막으로 처리된 값을 저장
			    lastValue = target.value;
			});*/
			
			
			if(userType=="MOBI" && !userTypeDetail && old_new == "OLD"){  // 신규 앱 배포 시 주석 해제
				$("#versionNotice").css("display", "block");  // 신규 앱 배포 시 주석 해제
			}  // 신규 앱 배포 시 주석 해제
			
			var modal_background = document.querySelector('.similarity_pop')
			window.addEventListener('touchstart', (e) => {
				if (e.target === modal_background) {
					$(".similarity_pop").css("display", "none");
				}
			});


		},

        dateFomat: function(data) {
         var date = new Date(data);
         return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
        },

		columns : function() {
			if(authrtCd.includes('S')){
				return userTypeBool ? pcColumns_agency : mobiColumns;
			}else{
				return userTypeBool ? pcColumns : mobiColumns;
			}
		},

		kendoGrid : function() {
			$("#carNum_grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read:{
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath+'/vfc/drive/selectCarList',
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
							options.carNum = $("#car_num_pop").val();
							options.crno = $("#crno").val();
							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					pageSize: 5,
					serverPaging: true,
				},
				navigatable: true,
				pageable: {
					pageSizes: [5, 10, 20],
					buttonCount: 5
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: $drive.ui.columns(),
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
                change: $drive.ui.carRowClickEvent
			});
		},
		
		carRowClickEvent : function(e) {
			var rows = e.sender.select();
            var data;

            rows.each(function(e) {
                var grid = $("#carNum_grid").data("kendoGrid");
                var dataItem = grid.dataItem(this);
                data = dataItem;
            });

			$('#car_num').val(data.vhclRegNo);
			$('#vin').val(data.vin);
			$('#carmdl').val(data.carmdl);
			$('#modelYear').val(data.mdlyr);
			$('#vhclNm').val(data.vhclNm);
			$('#bzmnSn').val(data.bzmnSn);
			$('#engineType').val(data.engineFom);
			$('#useYn').val(data.useYn);
			$('#signguCd').val(data.sggCd);
			$('#regDt').val(data.regDt);
		},
		popupGridLoad : function(gridId,selectedUrl,columns) {
			$(gridId).kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read:{
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + selectedUrl,
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
						    // 대여자 이력 정보
						    if(gridId == '#rentalHistManage_grid'){
						        //  최근 7일 이력 조회
//						        var dln = '251301689481'; // 🚗 todo 더미
						        var dln =  $('#num01').val() + $('#num02').val() + $('#num03').val() + $('#num04').val();// todo 더미 추후 풀기
                                 //✂️todo : 대여정보이력일때
//                                var now = new Date();
//                                var endDt = dateToStr(now);
//                                var startDt = dateToStr(new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7));
//                                options.startDt = startDt;
//                                options.endDt = endDt;
//                                options.dln = dln; // 면허등록정보
//                                options.rentSttsCd = '2'; // 대여확정
//                                options.lcnsIdntfCd = ''; // 국내 , 국제 면허 (전체)

                                //✂️todo : 운전자격이력일때
                                var dateData = $drive.event.vfcHistDateDt();
                                var startDtTm = dateData.startDtTm;
                                var endDtTm = dateData.endDtTm;

                                options.startDtTm = startDtTm;
                                options.endDtTm = endDtTm;
                                options.dln = dln; // 면허등록정보

                            // 검색 차량의 결함 정보
                            }else if(gridId == '#mobiDefect_grid'){
                                var gridOptions = {};
                                gridOptions.searchCol = 'vhclRegNo'; // 차량번호 조건
//                                gridOptions.searchWrd = '01하5030';// 🚗 tODO !! 더미넣음 이걸로 변경하기 $("#car_num").val(); 01하5030
                                gridOptions.searchWrd = $("#car_num").val(); //
                                options.searchYn = 'Y';//	and defect_yn = #{searchYn} // 결함 여부
                                Object.assign(options, gridOptions);
                            }
						    return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					pageSize: 5,
					serverPaging: true,
				},
				navigatable: true,
				pageable: {
					pageSizes: [5, 10, 20],
					buttonCount: 5
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: gridId == '#rentalHistManage_grid' ? rentalHistManageColumns : defectColumns ,
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
                change: $drive.ui.popupRowClickEvent
            });

        },


        popupRowClickEvent : function(e) {
//            $('#popup_drvVfcHist_box').css('display', 'none');
//            $("#popup_drvVfcHist_box").removeClass("view");

            $(".detail input").val('');
            $(".scrollBar02").scrollTop(0);

            var rows = e.sender.select();

            rows.each(function(e) {
                if(popupinPopupType == '#rentalHistManage_grid'){
                   var grid = $("#rentalHistManage_grid").data("kendoGrid");
                }else{
                    var grid = $("#mobiDefect_grid").data("kendoGrid");
//                    var dataItem = grid.dataItem(this);
//                    detailMobiDefectData = dataItem;
                }
                var dataItem = grid.dataItem(this);
                detailMobiDefectData = dataItem;


            });

        },

        detailDefectGrid : function() {
            $("#detail_defectGrid").kendoGrid({
                dataSource: null,
                navigatable: true,
                pageable: {
                    pageSizes: [5, 10, 20],
                    buttonCount: 5
                },
                noRecords: {
                    template: "데이터가 없습니다."
                },
                columns: [
                     { title: "순번", width: "40px", field: "rn", template: "#: rn #" },
                     {title: "결함유형", width: "60px", field: "defectNm", template: "#: defectNm #" },
                     {title: "처리상태코드", width: "150px", field: "prcsSttsCd",	template: "#: prcsSttsCd #"},
                     {title: "발생일시", width: "130px", field: "ocrnDt", template: "#: ocrnDt #"}
                ],
                scrollable: true,
                editable: false,
                resizable: true,
                selectable: "row",
            });
        },
		//==================================================================================================================zz
		fnQrInfoReq : function() {
			var param = {
				cmd: "510",
				mode: "direct",
				svcCode: "kotsa.3",
				branchName: "운전자격확인시스템",
				deviceId: "123456789"
			};

			$("#qrCodeArea").css('display', 'block');
			$('.qr_txt').empty();
			var html = `모바일 신분증 앱으로 <br>
                        QR코드를 촬영해 주세요.`;
			$('.qr_txt').append(html);

			ajax(false, contextPath+"/vfc/drive/qrmpm/start", "", "", param, function(result) {
				if (result != null){
					let resultData = atob(result);

					$('#qrCodeArea').empty();

					let TRX_CODE = JSON.parse(atob(resultData)).trxcode;
					param.trxcode = TRX_CODE;

					let qrCodeArea = document.getElementById("qrCodeArea");
					let width = qrCodeArea.clientWidth - 20;
					let size = width > 300 ? 300:width;

					new QRCode(qrCodeArea, {
						  width: size
						, height: size
						, text: resultData
					});
				}
			});
		},

		getVPData : function() {
		    ajax(false, contextPath+"/mip/vpdata", "", "", {}, function(result) {
				if (result != null && JSON.stringify(result) !== '{}'){
					$('#name').val(result.name);
					$("#num01").data("kendoDropDownList").value(result.dlno.substr(0,2));
					$('#num02').val(result.dlno.substr(2,2));
					$('#num03').val(result.dlno.substr(4,6));
					$('#num04').val(result.dlno.substr(10,2));

					var asortStr = result.asort;

					if(asortStr.includes('|'))
						asortStr = asortStr.split('|', 1)[0];

					var asort;
					if(asortStr.includes('1종')){
						switch(asortStr){
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
						switch(asortStr){
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
//					$("#name").attr('disabled', true);
//					$("#num01").data("kendoDropDownList").readonly();
//					$("#num02").attr('disabled', true);
//					$("#num03").attr('disabled', true);
//					$("#num04").attr('disabled', true);
//					$('input[type=radio]').attr("disabled", true);

					vrfcMthd = 3;

					$('.license_popup .cancel_btn').click();
		        } else{
					alert("QR 인증 후 완료 버튼을 클릭해 주십시오.")
				}
		    });
		},

		cretePolicyPopup : function(title) {
			$('.policy_popup').css('display', 'block');
			$('.policy_popup').addClass("view");
			$('.policy_popup .popup_top h4').empty();
			$('.policy_popup .popup_top h4').append(title);
			$('.policy_popup .text').empty();
			var html;

			if(title == "개인정보 이용 동의"){
				$('.policy_popup .text').addClass("scrollBar02");
				html = `
					본인은 “운전자격확인시스템“이 제공하는 모바일 면허증(QR)인증 서비스(이하 ‘서비스’라 합니다)를 이용하기 위해, 다음과 같이 기관이 본인의 개인정보를 수집/이용하고, 개인정보의 취급을 위탁하는 것에 동의합니다.
					<br/><br/>
	      			(1) 수집항목
	      			<br/>
	      			- 이름, 생년월일, 운전면허번호, 면허종별, 적성검사 시작 및 종료일, 발급일자, 운전면허증 사진
					<br/><br/>
					(2) 이용목적
					<br/>
					- 이용자가 웹사이트 또는 Application에 입력한 본인확인정보의 정확성 여부 확인 (본인확인서비스 제공)
					<br/>
					- 해당 웹사이트 또는 Application에 연계정보(CI)
					<br/>
					- 서비스 관련 상담 및 불만 처리 등
					<br/>
					- 이용 웹사이트/Application 정보 등에 대한 분석 및 세분화를 통한, 이용자의 서비스 이용 선호도 분석
					<br/><br/>
					(3) 개인정보의 보유기간 및 이용기
					<br/>
					- 이용자가 서비스를 이용하는 기간에 한하여 보유 및 이용. 다만, 아래의 경우는 제외
					<br>
					- 법령에서 정하는 경우 해당 기간까지 보유(상세 사항은 기관의 개인정보취급방침에 기재된 바에 따름)
					<br/><br/>
					(4) 본인확인서비스 제공을 위한 개인정보의 취급위탁
					<br/>
					수탁자 : “운전자격확인시스템”
					<br/>
					취급위탁 업무 : 본인확인정보의 정확성 여부 확인(본인확인서비스 제공), 연계정보(CI), 서비스 관련 상담 및 불만 처리, 휴대폰인증보호 서비스, 이용자의 서비스 이용 선호도 분석정보 제공관련 시스템 구축 및 위탁영업 등
					<br/>
					수탁자의 상세 개인정보 취급 위탁 내용은 각 수탁자가 정하는 절차와 방법에 따라 수탁자 홈페이지 등에 게시된 수탁자의 개인정보 취급방침 및 제3자 제공 동의 방침 등에 따릅니다.
					<br/>
					<br/>
					(5) 상기 개인정보 수집 및 이용과 취급위탁에 동의하지 않으실 경우, 서비스를 이용하실 수 없습니다.
					<br/>
					기관 제공하는 서비스와 관련된 개인정보의 취급과 관련된 사항은, 기관의 개인정보취급방침(기관 홈페이지 www.mois.go.kr)에 따릅니다. 본인은 위 내용을 숙지하였으며 이에 동의합니다.
					<br/><br/>
					“운전자격확인시스템“ 귀중
					<br/><br/>
					본인은 서비스를 제공함에 있어 본인의 개인정보를 수집·이용하고자 하는 경우에는 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」및 「신용 정보의 이용 및 보호에 관한 법률」 에 따라 본인의 동의를 얻어야 합니다. 이에 본인은 귀사가 아래와 같이 본인의 개인정보를 수집·이용하는데 동의합니다.
					<br/><br/>
					[제1조] 개인정보의 수집·이용 목적
					<br/>
					가. 사업자의 서비스 이용을 위한 본인확인, 식별확인 업무처리 및 정보제공
					<br/>
					나. “운전자격확인시스템“ 에 이용자 정보를 전송하여 본인확인 및 휴대폰 정보의 일치 여부 확인
					<br/>
					다. 휴대폰 사용자 확인을 위한 SMS(또는 LMS) 인증번호 전송
					<br/>
					라. 부정 이용 방지 및 수사의뢰
					<br/>
					마. 이용자 본인 요청에 의한 본인확인 이력정보 제공, 민원처리, 추후 분쟁조정을 위한 기록보존, 고지사항 전달 등
					<br/>
					바. 부가서비스 제공 및 해제(서비스 가입자에 한함)
					<br/>
					사. 기타 법률에서 정한 목적
					<br/><br/>
					[제2조] 수집하는 개인정보의 항목
					<br/>
					가. 이름, 생년월일, 운전면허번호, 면허종별, 적성검사 시작 및 종료일, 발급일자, 운전면허증 사진
					<br/><br/>
					[제3조] 개인정보의 보유·이용 기간
					<br/>
					개인정보는 개인정보의 수집목적 또는 제공받은 목적이 소멸되면 파기됩니다. 단, ‘개인정보보호법’, ‘정보통신망 이용 촉진 및 정보보호 등에 관한 법률’, ‘신용정보의 이용 및 보호에 관한 법률’등 기타 관련 법령의 규정에 의하여 법률관계의 확인 등을 이유로 특정한 기간 동안 보유하여야 할 필요가 있을 경우 에는 아래에 정한 기간 동안 보유합니다.
					<br/>
					가. 신용정보의 이용 및 보호의 관한 법률에 의거 정보 보존 기간: 3년
					<br/>
					나. 계약 또는 청약철회 등에 관한 기록 : 5년
					<br/>
					다. 대금결제 및 재화 등의 공급에 관한 기록 : 5년
					<br/>
					라. 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년
					<br/>
					마. 기타 다른 법률의 규정에 의하여 보유가 허용되는 기간
					<br/>
				`;
			} else if(title == "고유식별정보처리동의"){
				$('.policy_popup .text').removeClass("scrollBar02");
				html = `
					운전자격확인시스템은 정보주체의 동의, 전자정부법 제9조 3항에 따른 동법 시행령 제90조, 개인정보 보호법 제17조 및 제18조에 해당하는 경우에 아래와 같이 고유식별정보 처리(수집이용 및 제3자 제공)를 하고 있습니다.
					<br/><br/>
					1. 수집 및 이용 목적 : 운전자격확인시스템 운전자격확인 서비스 이용 시
					<br/>
					2. 수집 항목 : 이름, 생년월일, 운전면허번호, 면허종별, 적성검사 시작 및 종료일, 발급일자, 운전면허증 사진
					<br/>
					3. 고유식별정보의 보유 및 이용기간 : 3년 보유 후 삭제
					<br/><br/>
					위 고유식별번호 처리에 관한 사항에 대한 동의를 거부할 수 있습니다. 다만, 관련 서비스 이용 등 목적에 따른 혜택의 제한이 있을 수 있습니다.
				`;
			}
			$('.policy_popup .text').append(html);
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
			similarityImage = true;
			$drive.ui.getOcrData(data);
        },
		getOcrData:function(data){
			//alert(data.id.org_image_path);
			$('.license_bg input').removeAttr('readonly');
			$('.license_bg input[type="radio"]').removeAttr('disabled');
			$('.license_bg input').css('background-color', '');
			$("#num01").data("kendoDropDownList").readonly(false);
			$("#num01").closest("span").css("background-color", "");
				
				
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
//			$("#name").attr('disabled', true);
//			$("#num01").data("kendoDropDownList").readonly();
//			$("#num02").attr('disabled', true);
//			$("#num03").attr('disabled', true);
//			$("#num04").attr('disabled', true);
//			$('input[type=radio]').attr("disabled", true);
			vrfcMthd = 2;
//			$drive.event.lessThan1Year(data.idIssueDate);
		}
	};

	//이벤트 정의
	$drive.event = {
		setUIEvent : function() {
			$('.verify-btn').click(function(){
				$drive.event.verifyLicense();
			});
			$('.verify-btn-app').click(function(){
				if($('#car_num').val() == '') {
					alert("차량번호를 입력해 주십시오.");
				} else if(($('#num01').val()!='' && $('#num02').val()!='' && $('#num03').val()!='' && $('#num04').val()!='' &&
				$('#user_name02').val()!='' && $("input[type=radio][name=category01]:checked").val() !=undefined)&& similarityChk==true && similarityImage == false){
					alert("유사도 검증은 면허증 촬영시에만 가능합니다.");
				} else if(($('#num01').val()!='' && $('#num02').val()!='' && $('#num03').val()!='' && $('#num04').val()!='' &&
				$('#user_name02').val()!='' && $("input[type=radio][name=category01]:checked").val() !=undefined)&&similarityChk==true && similarityImage == true){
					$drive.ui.similarityApp();
				}else if($('#num01').val()!='' && $('#num02').val()!='' && $('#num03').val()!='' && $('#num04').val()!='' &&
				$('#user_name02').val()!='' && $("input[type=radio][name=category01]:checked").val() !=undefined){
					$drive.event.verifyLicense();
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

            // 대여유형 포함 코드 =======================================
//			$('#rentCfm').click(function(){
//			    var onewayYn = $("input[type=radio][name=category02]:checked").val();
//			    var vrfcHstrySn1 = vrfcHstrySn;
//			    var param = {onewayYn : onewayYn,
//			                 vrfcHstrySn : vrfcHstrySn1
//			                 };
//				if ($('#car_num').val() == ''){
//					alert('차량번호를 입력해주세요.');
//
//				}else if (onewayYn =='' || onewayYn == null || onewayYn == ' '){
//				    alert('대여유형을 선택해주세요.');
//				}
//				else {
//					$drive.event.updateRentSttsCdInclRentalType(param);
//				}
//			});
			//================================================end=======

            // 대여유형 미포함 코드 =======================================
			$('#rentCfm').click(function(){
				if ($('#car_num').val() == ''){
					alert('차량번호를 입력해주세요.');
				} else {
					$drive.event.updateRentSttsCd();
				}
			});
			//================================================end=======


			$('.carNum_btn').click(function(){
				$('#car_num_pop').val('');
				$("#carNum_grid").data("kendoGrid").dataSource.page(1);
			});

			$('.carSearch_btn').click(function(){
				$("#carNum_grid").data("kendoGrid").dataSource.page(1);
			});

			$('.license_btn').click(function() {
				$('#all_chk').prop("checked", false);
				$('input[type=checkbox][name=agreeInfo]').prop('checked', false);
				$("#qrCodeArea").css('display', 'none');
				$(".qrCfm").removeClass('blue_btn');
				$(".qrCfm").attr('disabled', true);
		    });

			$(".photo_btn").on("click",function(){
				$drive.ui.showAndroidToast();
		  	});


			/**
			 * 면허증 업로드 관련
			 * 김경룡
		     * 2023.08.07
			*/
			// 운전자격검증 - 면허증 업로드 팝업 관련
			$(".upload_btn").on("click",function(){
				$(".upload_popup").addClass("view");
				$(".upload_popup").css("display", "block");
			});
			$(".upload_popup .cancel_btn").on("click",function(){
				document.getElementById("findFile").value = '';
				$('.filetype').val('');
				$(".upload_popup").removeClass("view");
				$(".upload_popup").css("display", "none");
			});
			$(".upload_popup .close").on("click",function(){
				document.getElementById("findFile").value = '';
				$('.filetype').val('');
		    	$(".upload_popup").removeClass("view");
				$(".upload_popup").css("display", "none");
			});
			// 파일 찾기
			$("#searchFile").on("click", function() {
				$("#findFile").click();
			});
			$("#findFile").on("change", function() {
				$('.filetype').val($("#findFile").val());
			})
			// 업로드 버튼 클릭
			$("#fileSubmit").click(function() {
				kendo.ui.progress($(".upload_popup"), true);
				var fileData = $("#findFile")[0].files[0] != undefined ? $("#findFile")[0].files[0] : null;

				if(fileData != null) {
					var jpgFile = fileData.name.slice(-3).toLowerCase() == 'jpg' ? 'jpg' : null;
					var jpegFile = fileData.name.slice(-4).toLowerCase() == 'jpeg' ? 'jpeg' : null;
				}

				if(!fileData) {
					alert("파일을 선택해주세요.");
					kendo.ui.progress($("body"), false);
					return;
				} else if(jpgFile == null && jpegFile == null) {
					alert("파일은 jpg 또는 jpeg만 가능합니다.");
					kendo.ui.progress($("body"), false);
					return;
				} else {
			        var formData = new FormData();
		        	formData.append("files", fileData);

					fileAjax(contextPath+'/vfc/scan/id_auto', formData, function (response) {

						if(response != null) {
							var data = JSON.parse(response);
							if(data.result_code == "SUCCESS") {
								if(data.id.name != '' && data.id.driver_license.driver_number != '') {
									var driver_license = data.id.driver_license;
									var license_parts = driver_license.driver_number.split('-');

									$('#name').val(data.id.name);
									$("#num01").data("kendoDropDownList").value(license_parts[0]);
									$('#num02').val(license_parts[1]);
									$('#num03').val(license_parts[2]);
									$('#num04').val(license_parts[3]);

									var asort;
									if(driver_license.driver_type.includes('1종')){
										switch(driver_license.driver_type.split(',')[0]){
											case '1종대형': asort = 11; break;
											case '1종보통': asort = 12; break;
											case '1종소형': asort = 13; break;
											case '1종대형견인': asort = 14; break;
											case '1종소형견인': asort = 16; break;
											case '1종구난차': asort = 15; break;
										}
									} else {
										switch(driver_license.driver_type.split(',')[0]){
											case '2종보통': asort = 32; break;
											case '2종소형': asort = 33; break;
											case '2종원동기': asort = 38; break;
										}
									}

									$('input[type=radio][value='+asort+']').prop("checked", true);
//									$("#name").attr('disabled', true);
//									$("#num01").data("kendoDropDownList").readonly();
//									$("#num02").attr('disabled', true);
//									$("#num03").attr('disabled', true);
//									$("#num04").attr('disabled', true);
//									$('input[type=radio]').attr("disabled", true);

									vrfcMthd = 2;

									$drive.event.lessThan1Year(data.id.issued_date, license_parts);
									kendo.ui.progress($(".upload_popup"), false);
								} else {
									alert("식별되지 않는 정보가 있습니다.\n이미지 상태를 확인해주시기 바랍니다");
									kendo.ui.progress($(".upload_popup"), false);
								}
							} else if(data.result_code == "ERR_CANNOT_CROP_CARD") {
								alert("면허증의 위치가 올바르지 않습니다.\n<예시>와 같이 찍어서 업로드 해주시기 바랍니다.");
								kendo.ui.progress($(".upload_popup"), false);
							} else if(data.result_code == "ERR_CANNOT_RECOG_CARD") {
								alert("면허증의 정보를 인식하지 못했습니다.\n이미지 파일을 확인 해주시기 바랍니다.");
								kendo.ui.progress($(".upload_popup"), false);
							} else if(data.result_code == "ERR_INIT_FAIL_TESSDATA") {
								alert("인식파일T 초기화를 실패했습니다.\n관리자에게 문의바랍니다.");
								kendo.ui.progress($(".upload_popup"), false);
							} else if(data.result_code == "ERR_INIT_SCANNER") {
								alert("스캐너 초기화를 실패했습니다.\n관리자에게 문의 바랍니다.");
								kendo.ui.progress($(".upload_popup"), false);
							} else if(data.result_code == "ERR_TIMEOUT") {
								alert("정보 인식이 지연되고 있습니다.\n이미지 파일을 확인 해주시기 바랍니다.");
								kendo.ui.progress($(".upload_popup"), false);
							} else if(data.result_code == "ERR_EXPIRED_LICENSE") {
								alert("라이선스 에러가 발생하였습니다.\n관리자에게 문의 바랍니다.");
								kendo.ui.progress($(".upload_popup"), false);
							} else {
								alert("인식되지 않고 있습니다.\n관리자에게 문의 바랍니다.");
								kendo.ui.progress($(".upload_popup"), false);
							}

							document.getElementById("findFile").value = '';
							$('.filetype').val('');
							$(".upload_popup").removeClass("view");
						} else {
							alert("데이터가 확인되지 않습니다");
						}
					});
				}
		    });


			 $(".photo_popup .cancel_btn").on("click",function(){
			    $(".photo_popup").removeClass("view");
		  	});
			  $(".photo_popup .close").on("click",function(){
			    $(".photo_popup").removeClass("view");
		  	});
			$('#all_chk').change(function() {
		        var checked = $('#all_chk').is(':checked');

				if(checked){
					$('input[type=checkbox][name=agreeInfo]').prop('checked', true);
					$(".qrCfm").attr('disabled', false);
					$(".qrCfm").removeClass('gray_btn');
					$(".qrCfm").addClass('blue_btn');
					$drive.ui.fnQrInfoReq();
				}
				else{
					$('input[type=checkbox][name=agreeInfo]').prop('checked', false);
					$(".qrCfm").removeClass('blue_btn');
					$(".qrCfm").addClass('gray_btn');
					$(".qrCfm").attr('disabled', true);
				}
		    });

			$('input[type=checkbox][name=agreeInfo]').change(function() {
		        if($('#agreeInfo_01').prop("checked") && $('#agreeInfo_02').prop("checked")){
					$('#all_chk').prop("checked", true);
					$(".qrCfm").attr('disabled', false);
					$(".qrCfm").removeClass('gray_btn');
					$(".qrCfm").addClass('blue_btn');
					$drive.ui.fnQrInfoReq();
				} else{
					$('#all_chk').prop("checked", false);
					$(".qrCfm").removeClass('blue_btn');
					$(".qrCfm").addClass('gray_btn');
					$(".qrCfm").attr('disabled', true);
				}
		    });

			$('.qrCfm').click(function(){
				$drive.ui.getVPData();
			});

			$('.agree_view01').click(function(){
				var title = "개인정보 이용 동의";
				$drive.ui.cretePolicyPopup(title);
			});

			$('.agree_view02').click(function(){
				var title = "고유식별정보처리동의";
				$drive.ui.cretePolicyPopup(title);
			});

			$('.license_popup .cancel_btn').click(function(){
				$('.qr_txt').empty();
				var html = `
					"서비스 이용에 대한 동의"를 하시면 <br>
                    QR 이미지가 발급 됩니다.
				`;
				$('.qr_txt').append(html);
			});

			$('.license_popup .close').click(function(){
				$('.license_popup .cancel_btn').click();
			});

			$('.policy_popup .cancel_btn').click(function(){
				$('.policy_popup').css('display', 'none');
				$('.policy_popup').removeClass("view");
			});

			$('.policy_popup .close').click(function(){
				$('.policy_popup .cancel_btn').click();
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
				if($('#resetChk').prop("checked"))
					$drive.event.resetInput();
				location.reload();
			});

            $(".cancel_popup_btn").on("click",function(){
                    $('.result_popup_in_popup').css('display', 'none');
                    $(".result_popup_in_popup").removeClass("view");
                    $("#rentalHistManage_grid").empty();
//                    location.reload();
                });

			$('.result_popup .close').click(function(){
				$('.result_popup .cancel_btn').click();
			});
            $('.result_popup_in_popup .cancel_btn').click(function(){
                $('.result_popup_in_popup').css('display', 'none');
                $('.result_popup_in_popup').removeClass("view");
            });

			$('.result_popup_in_popup .close').click(function(){
				$('.result_popup_in_popup .cancel_btn').click();
			});
			
			$('#similarityChk').on('change', function() {
				if ($('#similarityChk').prop('checked')) {
					similarityChk = true
					// 유사도 검증 안내 팝업
					$(".similarity_pop").css("display", "flex");
				} else {
					similarityChk = false
				}
				
			});
			
			$(".similarity_pop .close").on("click",function(){
			    $(".similarity_pop").css("display", "none");
			});
		
		},

        // 2024.07.31 jeonghyewon code add
        popupClose: function(){
            $('.result_popup').css('display', 'block');
            $(".result_popup").addClass("view");
            $('#popup_drvVfcHist_box').hide();
            $('#popup_mobiDefect_box').hide();
            $('.result_popup_in_popup').css('display', 'none');
            $(".result_popup_in_popup").removeClass("view");
            $("#rentalHistManage_grid").data("kendoGrid").dataSource.page(1);
        },

        // 2024.08.01 jeonghyewon code add
        popupRntlHsListClick : function(){
            $('.result_popup').css('display', 'none');
            $(".result_popup").removeClass("view");

            popupinPopupType = '#rentalHistManage_grid';

            $('.result_popup_in_popup').css('display', 'block');
            $('#popup_drvVfcHist_box').css('display', 'block');
            $('#popup_drvVfcHist_box').addClass("view");
        },

        // 2024.07.31 jeonghyewon code add
        popupRntlHsList : function(){
            tempHtml = `    <div class="box">
                            	<div class="popup_top">
                                	<h4>대여 이력 정보</h4>
                        		        <div class="close">
                        			        <span></span>
                        			        <span></span>
                        		        </div>
                            	</div>
                              	<div class="content">
                              		<div class="contBox" >
                                        <div class="nameBox">
                                            <h4 class="name">대여 이력 정보</h4>
                                        </div>
                                            <table class = "popoup_grid" id="rentalHistManage_grid">
                                                <caption>대여 이력 정보</caption>
                                            </table>
                                    </div>
                                    <div class="btn_flex" style = "padding-top: 30px;">
                                        <button class="gray_btn cancel_popup_btn" onclick= $drive.event.popupClose();>닫기</button>
                                    </div>
                        		</div>
                            </div>`;
            $('#popup_drvVfcHist_box').append(tempHtml);
                 // ✂️todo
            //            $drive.ui.popupGridLoad('#rentalHistManage_grid','/vfc/rentalHistManage/selectRentalHistList', rentalHistManageColumns);
            $drive.ui.popupGridLoad('#rentalHistManage_grid','/vfc/drvVfcHist/listView.do', rentalHistManageColumns);

        },

        // 2024.08.01 jeonghyewon code add
        popupVhclDfctListClick : function(){
            $('.result_popup').css('display', 'none');
            $(".result_popup").removeClass("view");

            popupinPopupType = '#mobiDefect_grid';
            $('.result_popup_in_popup').css('display', 'block');
            $('#popup_mobiDefect_box').css('display', 'block');
            $('#popup_mobiDefect_box').addClass("view");

        },

        // 2024.07.31 jeonghyewon code add
        popupVhclDfctList : function(){
            tempHtml = ` <div class="box" >
                                <div class="popup_top">
                                    <h4>차량 결함 정보</h4>
                                        <div class="close">
                                            <span></span>
                                            <span></span>
                                        </div>
                                </div>
                                <div class="content">
                                <h2 class = "h2" style ="text-align:center; margin-bottom:30px;">해당 대여차량의 결함정보가 <span style="color: red;">존재</span>합니다.</h2>
                                    <div class="contBox" >
                                        <div class="nameBox">
                                            <h4 class="name">차량 결함 정보</h4>
                                        </div>
                                            <table class = "popoup_grid" id="mobiDefect_grid">
                                                <caption>차량 결함 정보</caption>
                                            </table>
                                    </div>
                                    <div class="btn_flex" style = "padding-top: 30px;">
                                        <button class="blue_btn mobiDefect-btn"  style = "width: 250px;" onclick= $drive.event.detailMobiDefectUi();>차량 결함정보 상세내용 확인</button>
                                        <button class="gray_btn cancel_popup_btn" onclick= $drive.event.popupClose(); >닫기</button>
                                    </div>
                                </div>
                            </div>`;
            $('#popup_mobiDefect_box').append(tempHtml);
            $drive.ui.popupGridLoad('#mobiDefect_grid','/sys/carManage/selectCarList',defectColumns);
        },

        // 2024.07.31 jeonghyewon code add
        detailMobiDefectUi: function(){
            var data = detailMobiDefectData;
            if(data == null || data == '' || data == ' '){
                alert("데이터를 선택한 후 버튼을 클릭해 주세요.");
                return;
            }
            $('#popup_mobiDefect_box').css('display', 'none');
            $("#popup_mobiDefect_box").removeClass("view");
            // 차량 결함정보 상세내용 팝업 데이터 주입
                        /** ownr left */
                        var crno = !data.crno ? '-' : toCorporateNumFormat(data.crno);
                        $('#detail_crno').val(crno);
                        $('#detail_coNm').val(data.coNm);
                        $('#detail_ownrNm').val(data.ownrNm);

                        /** ownr right */
                        var brno = !data.brno ? "-" : toBizrnoNumFormat(data.brno);
                        $('#detail_brno').val(brno);
                        /** ownr right - 지역 */
                        if(!data.sggCd){
                            var ctpvNm = '-';
                            var sggNm = ''
                            $('#detail_ctpvSggNm').val(ctpvNm + ' ' + sggNm);
                        } else {
                            ajax(false, contextPath+'/sys/carManage/selectCtpvSggNm', 'body', '처리중입니다.', { sggCd: data.sggCd }, function (sggNmData) {
                                var ctpvNm = sggNmData.ctpv_nm;
                                var sggNm = sggNmData.sgg_nm;
                                if(!sggNm){
                                    sggNm = '';
                                }
                                $('#detail_ctpvSggNm').val(ctpvNm + ' ' + sggNm);
                            });
                        }
                        /** car info  left */
                        $('#detail_vhclRegNo').val(!data.vhclRegNo ? "-" : data.vhclRegNo);
                        $('#detail_vin').val(!data.vin ? "-" : data.vin);
                        $('#detail_carmdl').val(!data.carmdl ? "-" : data.carmdl);
                        $('detail_#vhclNm').val(!data.vhclNm ? "-" : data.vhclNm);
                        $('#detail_mdlyr').val(!data.mdlyr ? "-" : data.mdlyr);
                        $('#detail_engineFom').val(!data.engineFom ? "-" : data.engineFom );

                        /** car info  right */
                        $('#detail_sggNm').val(!data.sggNm ? "-" : data.sggNm);
                        $('#detail_frstRegYmd').val(!data.frstRegYmd ? "-" : data.frstRegYmd);
                        $('#detail_expryYmd').val(!data.expryYmd ? "-" : data.expryYmd);
                        $('#detail_regDt').val(!data.regDt ? "-" : data.regDt);
                        $('#detail_defectYn').val(!data.defectYn ? "-" : data.defectYn);
                        if(auth === "s0123"){
                            $('#detail_useYn').data("kendoDropDownList").value(data.useYn);
                        } else {
                            $('#detail_useYn').val(data.useYn);
                        }

                        /** 결함정보 표출여부 */
                        if(data.defectYn === 'Y'){
                            $("#defectInfo").show();
                            ajax(true, contextPath+'/sys/carManage/selectDefectList', 'body', '처리중입니다.', {vin : data.vin}, function (data1) {
                                $("#detail_defectGrid").data("kendoGrid").setDataSource(data1.data);
                            });
                        } else {
                            $("#defectInfo").hide();
                        }
                        $(".detail_popup").addClass("view");

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
        
		// 웹으로 결과 전달(2)  // 앱테스트중
		alcheraCheckResult: function(json) {
			var data = JSON.parse(json);
			if(data.similarityConfidence != null && data.livenessConfidence != null) {
				$drive.event.verifyLicense(data);
			} else {
				alert('data 없음'); //추후 수정
			}
		},
		
		verifyLicense : function(similarityData = {similarityConfidence: null, livenessConfidence: null}) {
			if(userType == "MOBI" && !userTypeDetail && old_new =="NEW"){  // 신규 앱 배포 시 주석 해제
				if(userOperSystemBool){  // 신규 앱 배포 시 주석 해제
					ocrInterface.deleteLicenseImageFile();  // 신규 앱 배포 시 주석 해제
				} else {  // 신규 앱 배포 시 주석 해제
					window.webkit.messageHandlers.deleteLicenseImageFile.postMessage('');  // 신규 앱 배포 시 주석 해제
				}  // 신규 앱 배포 시 주석 해제
			}  // 신규 앱 배포 시 주석 해제
				
                var dateData = $drive.event.vfcHistDateDt();
                var startDtTm = dateData.startDtTm;
                var endDtTm = dateData.endDtTm;

				
			var param = {
				num: $('#num01').val() + $('#num02').val() + $('#num03').val() + $('#num04').val(),
				name: $('#name').val(),
				type: $("input[type=radio][name=category01]:checked").val(),
				carNum: $('#car_num').val(),
//				userName: $('#user_name').val(),
//				userTel: $("#user_tel").val().replace(/-/g, ''),
				startDt: $('#start-picker02').val().replace(/-/g, ''),
				endDt: $("#end-picker02").val().replace(/-/g, ''),
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
				vrfcMthd: vrfcMthd,
				similarityConfidence: similarityData.similarityConfidence,
				livenessConfidence: similarityData.livenessConfidence
			};


			if(param.carNum == '')
				alert('차량번호를 입력해 주십시오.')
			else if($('#num01').val()!='' && $('#num02').val()!='' && $('#num03').val()!='' && $('#num04').val()!='' &&
				$('#user_name02').val()!='' && $("input[type=radio][name=category01]:checked").val() !=undefined){

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

							$("#resetChk").prop('checked', false);
							if (result.respCode == 500) {

								var html = `<p class="current_info">
			                        운전면허정보 조회 결과 <span class="point02">비정상</span> 입니다.
			                        <br>
			                        <span class="red">*</span> 비정상 사유 : 운전자격확인 프로세스가 정상적으로 이루어지지 않았습니다.` +
			                    '</p>';
								$('#result').append(html);
								$('#rentCfm').css('display', 'none');
								return;
							}

							param.cd = data.body.f_rtn_code;
							param.sn = data.vrfc_hstry_sn;
							param.dln = $('#num01').val() + $('#num02').val() + $('#num03').val() + $('#num04').val();
							$drive.cmmn.cusAjax(true, contextPath+"/vfc/drive/selectVerifyCd", '#loadingMessage', '처리 중 입니다. 잠시만 기다려 주세요. ',param, function(result) {
//							ajax(true, contextPath+"/vfc/drive/selectVerifyCd", 'body', '처리중입니다.', param, function(result) {
								if (result != null && result != "") {
									rentno = result.rentno;
									if(data.body.f_rtn_code == '00'){
                                        $drive.event.popupRntlHsList();
										if(result.data != undefined && result.total != 0){
											var html = `<p class="current_info" >
						                        차량 결함 정보는
						                        <span class = "popupSpan" id ="rslt_vehicleDefect" onclick =$drive.event.popupVhclDfctListClick()>존재</span> 합니다.
						                    </p>`;
											$('#result').prepend(html);
										} else{
											var html = `<p class="current_info">
						                        차량 결함 정보가 없습니다.
						                    </p>`;
											$('#result').prepend(html);
										}

										// ✂️todo : 대여이력건수 result.rentCnt
                                        //										if(result.rentCnt == 0){
                                        //											var html = `<br><p class="current_info" >
                                        //						                        최근 7일 대여이력이 없습니다.
                                        //						                    </p><br>`;
                                        //											$('#result').prepend(html);
                                        //										} else {
                                        //                                        $drive.event.popupVhclDfctList();
                                        //					                    	var html = `<br><p class="current_info">
                                        //						                        최근 7일 대여이력은
                                        //						                        <span class = "popupSpan" id = "rslt_rentalHistory" onclick =$drive.event.popupRntlHsListClick(); >`+ result.rentCnt + `건</span> 입니다.
                                        //						                    </p><br>`;
                                        //											$('#result').prepend(html);
                                        //										}
										//==================================================대여이력건수 end

                                        // ✂️todo  운전자격확인 이력 건수 result.VfcHistCnt
										if(result.VfcHistCnt == 0){
											var html = `<br><p class="current_info" >
						                        최근 7일 운전자격확인 이력이 없습니다.
						                    </p><br>`;
											$('#result').prepend(html);
										} else {
                                        	$drive.event.popupVhclDfctList();
											var html = `<p class="current_info">
						                        최근 7일 운전자격확인 건수는
						                        <span class = "popupSpan" id = "rslt_rentalHistory" onclick =$drive.event.popupRntlHsListClick(); >`+ result.VfcHistCnt + `건</span> 입니다.
						                    </p><br>`;
											$('#result').prepend(html);
										}
										
										if(userType == "MOBI" && userTypeDetail == false && similarityData.similarityConfidence != null && similarityData.livenessConfidence != null){
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
										}
										//==================================================운전자격확인 이력 건수 end
										var html = `<p class="current_info">운전면허정보 조회 결과 <span class="point">정상</span> 입니다.</p>`;
										$('#result').prepend(html);
										$('#rentCfm').css('display', 'block');
									} else{
										var html = `<p class="current_info">
					                        운전면허정보 조회 결과 <span class="point02">비정상</span> 입니다.
					                        <br>
					                        <span class="red">*</span> 비정상 사유 : `+ result.code.cdNm +
					                    '</p>';
										$('#result').append(html);
										$('#rentCfm').css('display', 'none');
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
			} else{
				alert("필수입력 정보를 입력해 주십시오.");
			}
		},

		lessThan1Year: function(issued, license_parts) {
			var today = new Date();
			var todayYear = today.getFullYear();
			var sdt = new Date(dateFormatting(issued));
			var dayMinu = (today.getTime() - sdt.getTime()) / (1000*60*60*24);

			if (license_parts[1] == todayYear.toString().slice(-2) && dayMinu < 365) {
				$("#licenseCareer").html("※ 면허 발급 기준 <span style='color:red'>1년 미만</span>의 면허증입니다.");
				for(var i=1; i<5; i++) {
					$("#num0"+i).css({"color":"white", "background-color":"red"});
				}
			} else if(license_parts[1] < todayYear.toString().slice(-2) && license_parts[3].slice(-1) == 0 && dayMinu < 365) {
				$("#licenseCareer").html("※ 면허 발급 기준 <span style='color:red'>1년 미만</span>의 면허증입니다.");
				for(var i=1; i<5; i++) {
					$("#num0"+i).css({"color":"white", "background-color":"red"});
				}
			}
		},

//        // 대여유형 포함
//        updateRentSttsCdInclRentalType : function(param) {
//            var obj = param;
//            obj.rentno = rentno;
//            obj.rentalTypeYn = 'Y';
//            if($(".point02").length) {
//                alert("면허정보 조회 결과 비정상이기 때문에 대여처리 할 수 없습니다.");
//            } else {
//                ajax(false, contextPath+"/vfc/drive/updateRentSttsCd", "", "", obj, function(result) {
//                    if (result != null && result=="success"){
//                        alert("대여처리 완료되었습니다.");
//                        $(".result_popup").removeClass("view");
//                        location.reload();
//                    }
//                });
//            }
//        },
//
//        // 대여유형 미!!!포함
        updateRentSttsCd : function() {
            var obj1 = {};
            obj1.rentno = rentno;
            obj1.rentalTypeYn = 'N';
            if($(".point02").length) {
                alert("면허정보 조회 결과 비정상이기 때문에 대여처리 할 수 없습니다.");
            } else {
                ajax(false, contextPath+"/vfc/drive/updateRentSttsCd", "", "", obj1, function(result) {
                    if (result != null && result=="success"){
                        alert("대여처리 완료되었습니다.");
                        $(".result_popup").removeClass("view");
                        location.reload();
                    }
                });
            }
        },

		resetInput : function() {
			$("#num01").data("kendoDropDownList").select(0);
			$("#start-picker02").data("kendoDatePicker").value(new Date());
            $("#end-picker02").data("kendoDatePicker").value(new Date());
			$('#car_num').val('');
			$('#car_num_pop').val('');
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
			if($("#similarityChk").is(":checked")) {
				$("#similarityChk").prop("checked", false);
			}
		},

	};

    $drive.cmmn = {
            // 로딩 표시하는 ajax
            cusAjax :function(isLodingBool, url, isLodingElement, beforeSendText, ajaxParam, fn_success, fn_complete){
                var temHtml  = `<div id="loadingMessage" class="center-message" style="display:none;"></div>`;
                $('body').append(temHtml);
                var loader = isLoading($(isLodingElement)[0], {
                    type: "overlay",
                    class : "fa fa-refresh fa-spin",
                    text: beforeSendText
                });

                var header = $("meta[name='_csrf_header']").attr("content");
                var token  = $("meta[name='_csrf']").attr("content");

                $.ajax({
                    url : url,
                    type : 'POST',
    //                async: choiceSync,
                    contentType : "application/json",
                    data : JSON.stringify(ajaxParam),
                    dataType : "json",
                    beforeSend : function(xhr) {
                        $("#loadingMessage").css("display","block");
                        xhr.setRequestHeader(header, token);
                        if (isLodingBool) {
                            loader.loading();
                        }
                    },
                    success : function(data) {
                        if(fn_success != null || fn_complete != undefined){
                            fn_success(data);
                        }
                    },
                    error : function(xhr, textStatus) {
                        if (xhr.status == 401) {
                            alert("권한이 없습니다. 사용자 인증이 필요합니다.");
                        } else if (xhr.status == 403) {
                            alert("세션이 만료되었습니다. 다시 로그인하세요.\n" + textStatus);
                            location.href = contextPath;
                        } else {

                            alert("처리 중 에러가 발생하였습니다.");
                        }
                    },
                    complete : function(xhr, status) {
                               if(isLodingBool){
                                   $("#loadingMessage").css("display", "none");
                                   loader.remove();
                               }

                        if(fn_complete != null || fn_complete != undefined){
                            fn_complete(xhr);
                        }
                    }
                });
            }

    };

}(window, document, jQuery));