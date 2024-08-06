(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';

	W.$inquiry = W.$inquiry || {};
	const specialCharPattern = /[`@#$%^&{}|<>]/;

	$(document).ready(function() {
		$inquiry.ui.pageLoad();		//최초 페이지 로드 시
		$inquiry.event.setUIEvent(Auth);
		//		$inquiry.ui.showButton(Auth);
		$inquiry.ui.replyAuth(Auth);

		$(window).bind("pagehide", function() {
			history.pushState({ pstSn: pstSn == null ? history.state.pstSn : pstSn }, '', contextPath + "/sft/inquirydetail");
		});
	});

	$inquiry.ui = {
		pageLoad: function() {
			$inquiry.ui.detailGrid(pstSn == null ? history.state.pstSn : pstSn);
			$inquiry.ui.commentList(pstSn == null ? history.state.pstSn : pstSn);
				$("#inquiryupdateYN").hide();
				$("#InquirydeleteYn").hide();
				$("#commentDeleteButton").hide();
				$("#InquieryuseY").hide();
			$('#deletedOne').hide();
			$('#replyUpdate').hide();
			$('#inquirySectionForupdate').hide();
			$('#replyShow2').show();

			var dropdownData = [
				{ text: "웹사이트 이용", value: "Q01" },
				{ text: "운전자격검증", value: "Q02" },
				{ text: "기타", value: "Q99" }
			];

			$("#inquirySection").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "value",
				dataSource: dropdownData
			});
			var dropdownData3 = [
				{ text: "웹사이트", value: "웹사이트" },
				{ text: "운전자격검증", value: "운전자격검증" },
				{ text: "기타", value: "기타" }
			];
			$("#search_stts_cd3").kendoDropDownList({
				optionLabel: "유형",
				dataTextField: "text",
				dataValueField: "유형",
				dataSource: dropdownData3,
				value: "유형"
			});

		},

		replyAuth: function(Auth) {
			if (Auth == 'K01' || Auth == 'D01' || Auth == 'Z01') {
				$("#replyWritetr").show();
				$("#showSubmitButton").show();
				$("#InquirydeleteYn").show();
			} else {
				$("#useYnTr").hide();
				$("#replyWritetr").hide();
				$("#showSubmitButton").hide();
				$("#commentSubmitButton").hide();
				$("#InquirydeleteYn").hide();
			}
		},
		detailGrid: function(pstSn) {
			var param = {}
			if (pstSn == null || pstSn == "") {
				alert("게시물 번호가 존재하지 않습니다.");
				location.replace(contextPath + "/sft/inquiry");
			} else {
				param.Auth = Auth
				param.pstSn = pstSn
				ajax(false, contextPath + "/sft/inquiry/selectDetailinquiryInfo", "", "", param, function(result) {

					var ogdp = result.info.ogdp
					$('#pstTtl').html('');
					$('#regDt').html('');
					$('#inqCnt').html('');
					$('#useYn').html('');
					$('#pstCn').html('');
					$('#fileSn').html('');
					$('#InquiryAtchNm').html('');
					$('#prevPstTtl').html('');
					$('#nextPstTtl').html('');
					$('#nextPstSn').html('');
					$(".ico").empty();
					$('#DeletedpstTtl').html('');
					$('#DeletedregDt').html('');
					$('#DeletedinqCnt').html('');
					$('#DeletedpstCn').html('');
					$('#fileSn').html('');
					$('#DeletedInquiryAtchNm').html('');
					$('#DeletedprevPstTtl').html('');
					$('#DeletednextPstTtl').html('');
					$('#DeletedprevPstSn').html('');
					$('#DeletednextPstSn').html('');
					$(".ico").empty();


					$inquiry.ui.detailPopup(result);
					$inquiry.ui.commentList(result.info.pst_sn);
					//					$inquiry.ui.showButton(ogdp);
				});
			}
		},
		detailPopup: function(result) {
			if (result.info.rgtr_sn == UserSn || Auth == "K01" || Auth == "Z01") {
				$("#inquiryupdateYN").show();
				$("#InquirydeleteYn").show();
				$("#commentDeleteButton").show();
			} else {
				$('#inquiryupdateYN').hide();
				$('#commentDeleteButton').hide();
			}
			if (result != null && result.info.use_yn == 'N') {
				$('#inquiryupdateYN').hide();
				$('#InquirydeleteYn').hide();
				$('#commentDeleteButton').hide();
				$('#InquieryuseY').show();
				if (result.info.file_sn != null) {
					$(".ico").append('<img src="' + contextPath + '/images/icons/ico_file.png" alt="파일다운로드 아이콘"/>');
				}
			}
			if (result.info.use_yn == "Y") {
				$('#useYn').text("공개");
			} else {
				$('#useYn').text("비공개");
			}
			$('#InquieryuseY').hide();
			$('#pstTtl').html(result.info.pst_ttl);
			$('#regDt').html(result.info.reg_dt);
			$('#inqCnt').html(result.info.inq_cnt);

			$('#pstCn').html(result.info.pst_cn);
			$('#fileSn').html(result.info.atch_file_sn);
			$('#InquiryAtchNm').html(result.info.atch_file_nm);
			$('#file').html(result.info.atch_file_nm);
			$('#inquiryContent').html(result.info.pst_cn);
			$('#inquiryTitle2').html(result.info.pst_ttl);
			$('#inquiryType').html(result.info.cd_nm);
			$('#inquiryType2').html(result.info.cd_nm);
			$('#prevPstTtl').html(result.title.prev_pst_ttl);
			$('#nextPstTtl').html(result.title.next_pst_ttl);
			$('#prevPstSn').html(result.title.prev_pst_sn);
			$('#nextPstSn').html(result.title.next_pst_sn);


		},
		reply: function(result) {

			const arg = {};
			arg.pstSn = pstSn;
			arg.replyWrite = result;
			if (arg.replyWrite.trim() == '') {
				alert("문의 답변을 입력해주세요");
			} else {
				var flagIncl = false;
				var pJumin = /(\d{6}[ ,-]-?[1-4]\d{6})|(\d{6}[ ,-]?[1-4])/;
				var pCert = /(\d{2}-\d{2}-\d{6}-\d{2})/;
				var pTelNum = /(\d{2,3}[ ,-]-?\d{2,4}[ ,-]-?\d{4})/;
				var pAddr = /((([가-힣]+(\d{1,5}|\d{1,5}(,|.)\d{1,5})+(읍|면|동|가|리))(^구|)((\d{1,5}(~|-)\d{1,5}|\d{1,5})(가|리|)|))([](산(\d{1,5}(~|-)\d{1,5}|\d{1,5}))|)|(([가-힣]|(\d{1,5}(~|-)\d{1,5})|\d{1,5})+(로|길)))/;
				var pCard = /[34569][0-9]{3}[-~.[ ]][0-9]{4}[-~.[ ]][0-9]{4}[-~.[ ]][0-9]{4}/;
				var pPort = /([a-zA-Z]{1}|[a-zA-Z]{2})\d{8}/;
				var pForg = /([01][0-9]{5}[[:space:]~-]+[1-8][0-9]{6}|[2-9][0-9]{5}[[:space:]~-]+[1256][0-9]{6})/;

				if (specialCharPattern.test(arg.replyWrite) ||pJumin.test(arg.replyWrite) || pCert.test(arg.replyWrite) || pTelNum.test(arg.replyWrite) || pCard.test(arg.replyWrite) || pPort.test(arg.replyWrite) || pForg.test(arg.replyWrite)) {
					alert("내용에 개인식별정보(주민번호, 외국인번호, 면허번호, 여권번호, 전화번호, 카드번호)가 포함되어 있습니다.\n개인 식별정보를 제거 후 등록해주세요.");
					return;
				}
				ajax(true, contextPath + '/sft/inquiry/Insertreply', 'body', '확인인중입니다.', arg, function(result) {
					alert("등록되었습니다.");
					location.reload();

				});
			}
		},
		replyUpdate: function(arg) {

			if (arg.updateWrite.trim() == '') {
				alert("문의 답변을 입력해주세요");
			} else {
				var flagIncl = false;
				var pJumin = /(\d{6}[ ,-]-?[1-4]\d{6})|(\d{6}[ ,-]?[1-4])/;
				var pCert = /(\d{2}-\d{2}-\d{6}-\d{2})/;
				var pTelNum = /(\d{2,3}[ ,-]-?\d{2,4}[ ,-]-?\d{4})/;
				var pAddr = /((([가-힣]+(\d{1,5}|\d{1,5}(,|.)\d{1,5})+(읍|면|동|가|리))(^구|)((\d{1,5}(~|-)\d{1,5}|\d{1,5})(가|리|)|))([](산(\d{1,5}(~|-)\d{1,5}|\d{1,5}))|)|(([가-힣]|(\d{1,5}(~|-)\d{1,5})|\d{1,5})+(로|길)))/;
				var pCard = /[34569][0-9]{3}[-~.[ ]][0-9]{4}[-~.[ ]][0-9]{4}[-~.[ ]][0-9]{4}/;
				var pPort = /([a-zA-Z]{1}|[a-zA-Z]{2})\d{8}/;
				var pForg = /([01][0-9]{5}[[:space:]~-]+[1-8][0-9]{6}|[2-9][0-9]{5}[[:space:]~-]+[1256][0-9]{6})/;

				if (specialCharPattern.test(arg.updateWrite) ||pJumin.test(arg.updateWrite) || pCert.test(arg.updateWrite) || pTelNum.test(arg.updateWrite) || pCard.test(arg.updateWrite) || pPort.test(arg.updateWrite) || pForg.test(arg.updateWrite)) {
					alert("내용에 개인식별정보(주민번호, 외국인번호, 면허번호, 여권번호, 전화번호, 카드번호)가 포함되어 있습니다.\n개인 식별정보를 제거 후 등록해주세요.");
					return;
				}
				ajax(true, contextPath + '/sft/inquiry/updateReply', 'body', '확인인중입니다.', arg, function(result) {
					alert("수정되었습니다.");
					location.reload();
				});
			}
		},
		commentList: function(pstSn) {
			var param = {}
			param.pstSn = pstSn
			ajax(false, contextPath + "/sft/inquiry/selectComment", "", "", { pstSn: pstSn }, function(result) {
				if (result != null && result != '') {
					$("#replyWritetr").hide();
					$("#replyShow2").show();
				}

				$inquiry.ui.replyShow(result);

			});

		},
		replyShow: function(result) {
			$("#replyShow2").hide();
			$("#replyUpdate").hide();
			if (result != null && result != '') {
				$("#replyShow2").show();
				$('#ReplyShow').html(result[0].pst_ttl);
				$('#content222').html(result[0].pst_ttl);
				$('#replyUpdateWrite').html(result[0].pst_ttl);

			}
		},
		deleteInquiry: function(arg) {
			ajax(false, contextPath + "/sft/inquiry/deleteInquiry", "", "", { pstSn: pstSn }, function(result) {
				alert("삭제 되었습니다.");
				location.replace(contextPath + "/sft/inquiry");
			});
		},
		InquieryuseY: function(arg) {
			ajax(false, contextPath + "/sft/inquiry/updateInquieryuseY", "", "", { pstSn: pstSn }, function(result) {
				alert("공개 되었습니다.");
				location.replace(contextPath + "/sft/inquiry");
			});
		},
		updateCheck: function(arg) {
			ajax(false, contextPath + "/sft/inquiry/selectComment", "", "", { pstSn: pstSn }, function(result) {
				if (UserSn == result[0].wrtrsn) {
					$inquiry.ui.replyUpdate(arg);
				} else {
					alert("작성자만 수정할 수 있습니다.");
				}
			});
		},
		updateCheck2: function(arg) {
			var CheckPswd = $('#CheckPswd').val().replace(/\$/g, "\\$");
			var pst_Sn = pstSn;
			const param = {};
			param.pst_Sn = pst_Sn
			param.pswd = CheckPswd;

			ajax(false, contextPath + "/sft/inquiry/checkPswd", "", "", param, function(result) {

				if (result.data.length == 0) {
					alert("비밀번호를 확인해주세요.");
				} else {
					$("#notice").css('display', 'none');
					$("#noticeDetail").css('display', 'none');
					$("#inquiryEnroll").css('display', 'block');
					$("#checkWriter").css('display', 'none');
					$(".ico").empty();
				}

			});
		},

	};

	//이벤트 정의
	$inquiry.event = {
		setUIEvent: function() {

			$('#prevPstTtl').click(function() {
				if ($('#prevPstSn').html() != '')
					postToURL(contextPath + "/sft/inquirydetail", { pstSn: $('#prevPstSn').html() });
				else
					alert('이전글이 없습니다.')
			});

			$('#nextPstTtl').click(function() {

				if ($('#nextPstSn').html() != '')
					postToURL(contextPath + "/sft/inquirydetail", { pstSn: $('#nextPstSn').html() });
				else
					alert('다음글이 없습니다.')
			});

			$('#DeletedprevPstTtl').click(function() {
				if ($('#DeletedprevPstSn').html() != '')
					postToURL(contextPath + "/sft/inquirydetail", { pstSn: $('#DeletedprevPstSn').html() });
				else
					alert('이전글이 없습니다.')
			});

			$('#DeletednextPstTtl').click(function() {

				if ($('#DeletednextPstSn').html() != '')
					postToURL(contextPath + "/sft/inquirydetail", { pstSn: $('#DeletednextPstSn').html() });
				else
					alert('다음글이 없습니다.')
			});

			$('#cancelinquiry').click(function() {
				location.replace(contextPath + "/sft/inquiry");
			});
			$('#cancelinquiry2').click(function() {
				location.replace(contextPath + "/sft/inquiry");
			});

			$('#InquirydeleteYn').click(function() {
				var deleteButton = confirm("삭제 하시겠습니까?")
				var pst_Sn = pstSn;
				const arg = {}
				arg.PstSn = pst_Sn;
				if (deleteButton == true) {
					$inquiry.ui.deleteInquiry(arg);
				}
				if (deleteButton == false) {
					alert("최소되었습니다.")
					location.reload();
				}
			});
			$('#showSubmitButton').click(function() {
				$('#replyUpdate').show();
				$('#replyShow2').hide();

			});


			$("#commentSubmitButton").on("click", function() {
				if (Auth != 'K01' || Auth != 'D01' || Auth != 'Z01') {
					// 권한있어야 등록
					var result = $('#replyWrite').val();
					if (specialCharPattern.test(result)) {
						var specialpstCn = result.match(specialCharPattern) || []
						alert('답변에 특수문자 ' + specialpstCn + '가 포함되어 있습니다.')
					} else {
						$inquiry.ui.reply(result);
					}
				} else {
					// 권한없으면 등록안됨
					$("#replyWritetr").hide();
				}

			});
			$('.detailFileIco').click(function() {
				var atchFileSn = $('#fileSn').html();
				var atchFileNm = $('#InquiryAtchNm').html();
				var realFileNm = $('#InquiryAtchNm').text();

				let web = document.createElement('a')
				web.href = `${contextPath}/cmmn/fileDownloadGet?atchmnflSn=${atchFileSn}&atchmnflNm=${atchFileNm}`;
				web.target = '_blank';
				web.download = realFileNm;
				document.body.appendChild(web);
				web.click();
				document.body.removeChild(web);

			});

			$('#inquiryupdateYN').click(function() {
				$("#notice").css('display', 'none');
				$("#noticeDetail").css('display', 'none');
				$("#inquiryEnroll").css('display', 'none');
				$("#checkWriter").css('display', 'block');
				$(".ico").empty();
			});
			$('#InquieryuseY').click(function() {
				if (confirm("게시물을 다시 공개하시겠습니까?")) {
					if ((confirm("일반 사용자에게 이 게시물이 다시 표시됩니다."))) {
						var pst_Sn = pstSn;
						const arg = {}
						arg.pst_Sn = pst_Sn;
						$inquiry.ui.InquieryuseY(arg);
					} else {
						alert("취소되었습니다.");
					}
				} else {
					alert("취소되었습니다.");
				}
			});
			$('#UpdateEnrollBtnChck').click(function() {
				$("#notice").css('display', 'none');
				$("#noticeDetail").css('display', 'none');
				$("#inquiryEnroll").css('display', 'none');
				$("#checkWriter").css('display', 'block');
				$(".ico").empty();
			});

			$("#updateSubmitButton").on("click", function() {
				var pst_Sn = pstSn;
				var pstCn = $('#replyUpdateWrite').val();
				if (specialCharPattern.test(pstCn)) {
					var specialpstCn = pstCn.match(specialCharPattern) || []
					alert('답변에 특수문자 ' + specialpstCn + '가 포함되어 있습니다.')
				} else {
					const arg = {}
					arg.pst_Sn = pst_Sn;
					arg.updateWrite = pstCn

					$inquiry.ui.updateCheck(arg);
				}


			});
			$("#noSubmitButton").on("click", function() {
				$("#replyShow2").show();
				$("#replyUpdate").hide();

			});
			$("#inquiryupdateButton").on("click", function() {
				var pswd = $('#CheckPswd').val().replace(/\$/g, "\\$");

				var pst_Sn = pstSn;
				const arg = {}
				arg.pst_Sn = pst_Sn;

				arg.pwsd = pswd
				//				arg.userSn = UserSn;
				$inquiry.event.updateInquiry(arg);

			});
			$("#commentDeleteButton").on("click", function() {
				var pst_Sn = pstSn;
				const arg = {}
				arg.pst_Sn = pst_Sn;
				//				arg.userSn = UserSn;

				// 확인 대화상자 표시
				if (confirm("정말로 삭제하시겠습니까?")) {
					$inquiry.event.commentDeleteButton(arg);
				} else {
				}
			});

			$("#listbutton").click(function() {
				location.replace(contextPath + "/sft/inquiry");
			});
			$("#listbutton2").click(function() {
				location.replace(contextPath + "/sft/inquiry");
			});

			$('.cancel_btn').click(function() {
				$("#notice").css('display', 'block');
				$("#noticeDetail").css('display', 'none');
				$("#inquiryEnroll").css('display', 'none');
			});

			$(".inquiryFileUpload").on("click", function() {
				var file = $(this).prop("files")[0];
				var fileName = file.name;
				$("#file").val(fileName);
				$inquiry.event.insertFile();
			});
			$("#fileBtn").change(function() {
				var file = $(this).prop("files")[0];
				var fileName = file.name;
				$("#file").val(fileName);
			});


			$('.insertBtn').click(function() {
				var pst_Sn = pstSn;
				var pswd = $('#CheckPswd').val().replace(/\$/g, "\\$");
				const arg = {}
				arg.pst_Sn = pst_Sn;
				//				arg.userSn = UserSn;
				arg.pswd = pswd;
				$inquiry.ui.updateCheck2(arg);
			});

			$('#showInquirySectionForupdate2').click(function() {

				$('#showInquirySectionForupdate').hide();
				$('#inquirySectionForupdate').show();
			});
			$(document).ready(function() {
				$("#privacyAgreementText").click(function() {
					$("#privacyAgreement").prop("checked", !$("#privacyAgreement").prop("checked"));
				});
			});

			$("#inquiryContent").keyup(function(e) {
				var content = $(this).val();
				$("#textLengthCheck").val("(" + content.length + "/ 3500)"); //실시간 글자수 카운팅
				if (content.length > 3500) {
					Alert("최대 3500자까지 입력 가능합니다.");
					$(this).val(content.substring(0, 500));
					$('#textLengthCheck').html("(3500 / 최대 3500자)");
				}
			});

			$("#replyUpdateWrite").keyup(function(e) {
				var content = $(this).val();
				$("#textLengthCheck2").val("(" + content.length + "/ 1000)"); //실시간 글자수 카운팅
				if (content.length > 1000) {
					Alert("최대 1000자까지 입력 가능합니다.");
					$(this).val(content.substring(0, 500));
					$('#textLengthCheck2').html("(1000 / 최대 1000자)");
				}
			});

			$("#replyWrite").keyup(function(e) {
				var content = $(this).val();
				$("#textLengthCheck3").val("(" + content.length + "/ 1000)"); //실시간 글자수 카운팅
				if (content.length > 1000) {
					Alert("최대 1000자까지 입력 가능합니다.");
					$(this).val(content.substring(0, 500));
					$('#textLengthCheck3').html("(1000 / 최대 1000자)");
				}
			});
		},
		InsertParam: function() {

			var param = {
				pst_sn: pstSn,
				//				user_sn: UserSn,
				menuCd: 'BBST02',
				pstTtl: $('inquiryTitle'),
				pstCn: $('inquiryContent')
			};
			if ($("#file").val()) {
				$inquiry.event.insertFile(param);
			} else {
				$inquiry.event.insertinquiry(param);
			}
		},
		updateInquiry: function() {

			var param = {
				pst_sn: pstSn,
				//				user_sn: UserSn,
				menuCd: 'BBST02',
				pstTtl: $('inquiryTitle'),
				pstCn: $('inquiryContent')
			};
			if ($("#fileBtn").val()) {
				$inquiry.event.insertFile2(param);
			} else {
				$inquiry.event.insertinquiry2(param);
			}
		},
		insertFile: function(param) {
			var formData = new FormData();
			formData.append('files', document.getElementById('fileBtn').files[0]);
			fileAjax(contextPath + "/cmmn/fileUpload", formData, function(response) {
				if (response != null) {
					param.fileSn = nvl(response.fileSn, 0);

					$inquiry.event.insertinquiry(param);
				}
			});
			$(document).ready(function() {
				$("#privacyAgreementText").click(function() {
					$("#privacyAgreement").prop("checked", !$("#privacyAgreement").prop("checked"));
				});
			});
		},
		insertFile2: function(param) {
			var formData = new FormData();
			formData.append('files', document.getElementById('fileBtn').files[0]);
			fileAjax(contextPath + "/cmmn/fileUpload", formData, function(response) {
				if (response != null) {
					param.fileSn = nvl(response.fileSn, 0);

					$inquiry.event.insertinquiry2(param);
				}
			});
			$(document).ready(function() {
				$("#privacyAgreementText").click(function() {
					$("#privacyAgreement").prop("checked", !$("#privacyAgreement").prop("checked"));
				});
			});
		},

		insertinquiry: function(param) {

			var inquirySection = $('#inquirySection').val();
			var inquiryTitle = $('#inquiryTitle2').val();
			var inquiryContent = $('#inquiryContent').val();
			var inquiryFile = param.fileSn;
			var Checkpswd = $('#CheckPswd').val().replace(/\$/g, "\\$");
			var privacyAgreement = $('#privacyAgreement').is(':checked');
			if (specialCharPattern.test(inquiryTitle) || specialCharPattern.test(inquiryContent)) {
				var specialpstCn = inquiryContent.match(specialCharPattern) || []
				alert('내용에 특수문자 ' + specialpstCn + '가 포함되어 있습니다.')
			} else {
				const arg = {};
				arg.inquirySection = inquirySection;
				arg.inquiryTitle = inquiryTitle;
				arg.inquiryContent = inquiryContent;
				arg.Pst_Sn = pstSn
				arg.Checkpswd = Checkpswd
				arg.UserSn = UserSn
				if (inquiryFile) {
					arg.inquiryFile = inquiryFile;
				}
				if (!privacyAgreement) {
					alert('개인정보 사용 동의 체크 해주세요.')
					return;
				}
				if (Checkpswd.trim() == '') {
					alert("비밀번호 확인해야 합니다.");
				}
				if (inquiryTitle.trim() == '' || inquiryContent.trim() == '') {
					alert('제목 및 내용 입력해주세요.')
					return;
				}
				var flagIncl = false;
				var pJumin = /(\d{6}[ ,-]-?[1-4]\d{6})|(\d{6}[ ,-]?[1-4])/;
				var pCert = /(\d{2}-\d{2}-\d{6}-\d{2})/;
				var pTelNum = /(\d{2,3}[ ,-]-?\d{2,4}[ ,-]-?\d{4})/;
				var pAddr = /((([가-힣]+(\d{1,5}|\d{1,5}(,|.)\d{1,5})+(읍|면|동|가|리))(^구|)((\d{1,5}(~|-)\d{1,5}|\d{1,5})(가|리|)|))([](산(\d{1,5}(~|-)\d{1,5}|\d{1,5}))|)|(([가-힣]|(\d{1,5}(~|-)\d{1,5})|\d{1,5})+(로|길)))/;
				var pCard = /[34569][0-9]{3}[-~.[ ]][0-9]{4}[-~.[ ]][0-9]{4}[-~.[ ]][0-9]{4}/;
				var pPort = /([a-zA-Z]{1}|[a-zA-Z]{2})\d{8}/;
				var pForg = /([01][0-9]{5}[[:space:]~-]+[1-8][0-9]{6}|[2-9][0-9]{5}[[:space:]~-]+[1256][0-9]{6})/;

				if (specialCharPattern.test(inquiryContent) ||pJumin.test(inquiryContent) || pCert.test(inquiryContent) || pTelNum.test(inquiryContent) || pCard.test(inquiryContent) || pPort.test(inquiryContent) || pForg.test(inquiryContent)) {
					alert("내용에 개인식별정보(주민번호, 외국인번호, 면허번호, 여권번호, 전화번호, 카드번호)가 포함되어 있습니다.\n개인 식별정보를 제거 후 등록해주세요.");
					return;
				}
				$inquiry.event.ggi(arg);
			}

		},
		insertinquiry2: function(param) {

			var inquirySection = $('#inquirySection').val();
			var inquiryTitle = $('#inquiryTitle2').val();
			var inquiryContent = $('#inquiryContent').val();
			var inquiryFile = param.fileSn;
			var privacyAgreement = $('#privacyAgreement').is(':checked');
			if (specialCharPattern.test(inquiryTitle) || specialCharPattern.test(inquiryContent)) {
				var specialpstCn = inquiryContent.match(specialCharPattern) || []
				alert('내용에 특수문자 ' + specialpstCn + '가 포함되어 있습니다.')
			} else {
				const arg = {};
				arg.inquirySection = inquirySection;
				arg.inquiryTitle = inquiryTitle;
				arg.inquiryContent = inquiryContent;
				arg.Pst_Sn = pstSn
				arg.UserSn = UserSn
				if (inquiryFile) {
					arg.inquiryFile = inquiryFile;
				}
				if (!privacyAgreement) {
					alert('개인정보 사용 동의 체크 해주세요.')
					return;
				}
				if (inquiryTitle.trim() == '' || inquiryContent.trim() == '') {
					alert('제목 및 내용 입력해주세요.')
					return;
				}
				var flagIncl = false;
				var pJumin = /(\d{6}[ ,-]-?[1-4]\d{6})|(\d{6}[ ,-]?[1-4])/;
				var pCert = /(\d{2}-\d{2}-\d{6}-\d{2})/;
				var pTelNum = /(\d{2,3}[ ,-]-?\d{2,4}[ ,-]-?\d{4})/;
				var pAddr = /((([가-힣]+(\d{1,5}|\d{1,5}(,|.)\d{1,5})+(읍|면|동|가|리))(^구|)((\d{1,5}(~|-)\d{1,5}|\d{1,5})(가|리|)|))([](산(\d{1,5}(~|-)\d{1,5}|\d{1,5}))|)|(([가-힣]|(\d{1,5}(~|-)\d{1,5})|\d{1,5})+(로|길)))/;
				var pCard = /[34569][0-9]{3}[-~.[ ]][0-9]{4}[-~.[ ]][0-9]{4}[-~.[ ]][0-9]{4}/;
				var pPort = /([a-zA-Z]{1}|[a-zA-Z]{2})\d{8}/;
				var pForg = /([01][0-9]{5}[[:space:]~-]+[1-8][0-9]{6}|[2-9][0-9]{5}[[:space:]~-]+[1256][0-9]{6})/;

				if (pJumin.test(inquiryContent) || pCert.test(inquiryContent) || pTelNum.test(inquiryContent) || pCard.test(inquiryContent) || pPort.test(inquiryContent) || pForg.test(inquiryContent)) {
					alert("내용에 개인식별정보(주민번호, 외국인번호, 면허번호, 여권번호, 전화번호, 카드번호)가 포함되어 있습니다.\n개인 식별정보를 제거 후 등록해주세요.");
					return;
				}
				$inquiry.event.ggi(arg);
			}

		},
		ggi: function(data) {

			ajax(true, contextPath + '/sft/inquiry/updateInquiry', 'body', '확인인중입니다.', data, function(data) {
				//새로고침
				alert("수정되었습니다.")
				location.reload();

			});
			return true;
		},
		commentDeleteButton: function(arg) {
			ajax(true, contextPath + '/sft/inquiry/updateDeleteReply', 'body', '확인인중입니다.', arg, function(data) {
				//새로고침
				alert("삭제되었습니다.")
				location.reload();

			});

		}


	};

}(window, document, jQuery));