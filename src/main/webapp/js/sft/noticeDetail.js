(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';

	W.$notice = W.$notice || {};
	const specialCharPattern = /[`!@#$%^&*()_+=[\]{};':"\\|<>/]/;

	$(document).ready(function() {
		$notice.ui.pageLoad();		//최초 페이지 로드 시
		$notice.event.setUIEvent();

		$(window).bind("pagehide", function() {
			history.pushState({ pstSn: pstSn == null ? history.state.pstSn : pstSn }, '', contextPath + "/sft/noticeDetail");
		});
	});

	$notice.ui = {
		pageLoad: function() {
			$notice.ui.selectNoticeDetail(pstSn == null ? history.state.pstSn : pstSn);

			if (authrtCd == "K01" || authrtCd == "Z01") {
				$(".update_btn").css('display', 'block');
				$(".delete_btn").css('display', 'block');
				$(".detail").css('display', 'none');
				$(".edit").css('display', 'revert');
			} else {
				$(".detail").css('display', 'revert');
				$(".edit").css('display', 'none');
				$("#useYnTr").hide();
			}
		},

		selectNoticeDetail: function(pstSn) {
			if (pstSn == null || pstSn == "") {
				alert("게시물 번호가 존재하지 않습니다.");
				location.replace(contextPath + "/sft/notice");
			} else {
				ajax(false, contextPath + "/sft/notice/selectDetailNoticeInfo", "", "", { pstSn: pstSn }, function(result) {
					if (result != null) {
						var replacePstCn = ((result.info.pst_cn).replace(/\\\$/g, '$')).replace(/\\\\/g, '\\');
						var replacePstTTl = ((result.info.pst_ttl).replace(/\\\$/g, '$')).replace(/\\\\/g, '\\');

						$('#pstTtl').html(replacePstTTl);
						$('#regDt').html(result.info.reg_dt);
						$('#inqCnt').html(result.info.inq_cnt);

						if (result.info.use_yn == 'Y') {
							$('#useYn').text('공개')
						} else {
							$('#useYn').text('비공개')
						}
						$('#pstCn').html(replacePstCn);
						$('#fileSn').html(result.info.file_sn);
						$('#atchFileNm').html(result.info.atch_file_nm);
						$('#prevPstTtl').html(result.title.prev_pst_ttl);
						$('#nextPstTtl').html(result.title.next_pst_ttl);
						$('#prevPstSn').html(result.title.prev_pst_sn);
						$('#nextPstSn').html(result.title.next_pst_sn);

						$('#title').val(replacePstTTl);
						$('#content').html(replacePstCn);
						$('#file').val(result.info.atch_file_nm);
						if (result.info.file_sn != null) {
							$(".ico").append('<img src="' + contextPath + '/images/icons/ico_file.png" alt="파일다운로드 아이콘"/>');
						}
					}
				});
			}
		}
	};

	//이벤트 정의
	$notice.event = {
		setUIEvent: function() {
			$('#prevPstTtl').click(function() {
				if ($('#prevPstSn').html() != '')
					postToURL(contextPath + "/sft/noticeDetail", { pstSn: $('#prevPstSn').html() });
				else
					alert('이전글이 없습니다.')
			});

			$('#nextPstTtl').click(function() {
				if ($('#nextPstSn').html() != '')
					postToURL(contextPath + "/sft/noticeDetail", { pstSn: $('#nextPstSn').html() });
				else
					alert('다음글이 없습니다.')
			});

			$('.cancel_btn').click(function() {
				location.replace(contextPath + "/sft/notice");
			});

			$('.detailFileIco').click(function() {
				//				fileDownload($('#fileSn').html(), $('#atchFileNm').html());

				var atchFileSn = $('#fileSn').html();
				var atchFileNm = $('#atchFileNm').html();
				var realFileNm = $('#atchFileNm').text();

				let web = document.createElement('a')
				web.href = `${contextPath}/cmmn/fileDownloadGet?atchmnflSn=${atchFileSn}&atchmnflNm=${atchFileNm}`;
				web.target = '_blank'; // 새 탭에서 파일 다운로드를 시작하도록 설정
				web.download = realFileNm; // 다운로드될 파일의 이름을 설정
				document.body.appendChild(web);
				web.click();
				document.body.removeChild(web);
			});

			$("#fileBtn").change(function() {
				var file = $(this).prop("files")[0];
				if (file != undefined) {
					var fileName = file.name;

					let ext = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);

					if (ext != 'jpg' && ext != 'jpeg' && ext != 'zip' && ext != 'png' && ext != 'pdf') {
						alert("확장자가 jpg, jpeg, png, pdf, zip인\n파일만 업로드 할 수 있습니다.");
						return false;
					}

					$("#file").val(fileName);
				} else
					$("#file").val('');
			});

			$('.update_btn').click(function() {
				$notice.event.setUpdateParam();
			});

			$('.delete_btn').click(function() {
				$notice.event.deleteNotice();
			});

			const emojis = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

			$('#title').on("input", function() {
				$(this).val($(this).val().replace(emojis, ""));
			});

			$('#content').on("input", function() {
				$(this).val($(this).val().replace(emojis, ""));
			});
		},

		setUpdateParam: function() {
				var pstTtl = $('#title').val()
				var pstCn = $('#content').val()
			var param = {
				pstSn: pstSn,
				menuCd: 'BBST01',
				pstTtl: $('#title').val(),
				pstCn: $('#content').val()
			}
			if (specialCharPattern.test(pstCn) || specialCharPattern.test(pstTtl)) {
				var specialpstCn = pstCn.match(specialCharPattern) || []
				alert('제목 및 내용에 특수문자 ' + specialpstCn + '가 포함되어 있습니다.')
			}else{
				if ($("#fileBtn").val()) {
					$notice.event.insertFile(param);
				} else {
					$notice.event.updateNotice(param);
				}	
			}


		},

		insertFile: function(param) {
			var formData = new FormData();
			formData.append('files', document.getElementById('fileBtn').files[0]);

			fileAjax(contextPath + "/cmmn/fileUpload", formData, function(response) {
				if (response != null) {
					param.atchFileSn = nvl(response.fileSn, 0);

					$notice.event.updateNotice(param);
				}
			});
		},

		updateNotice: function(param) {
			if ($("#title").val() == '')
				alert("제목을 입력해 주십시오.")
			else if ($("#content").val() == '')
				alert("공지내용을 입력해 주십시오.")
			else {
				ajax(false, contextPath + "/sft/notice/updateNotice", "", "", param, function(result) {
					if (result != null && result == "success") {
						alert("공지사항 수정이 완료되었습니다.");
						location.replace(contextPath + "/sft/notice");
					}
				});
			}
		},

		deleteNotice: function() {
			var param = {
				pstSn: pstSn,
				useYn: 'N',
				menuCd: 'BBST01'
			};

			if (confirm("삭제 하시겠습니까?")) {
				ajax(false, contextPath + "/sft/notice/updateDeleteNotice", "", "", param, function(result) {
					if (result != null && result == "success") {
						alert("삭제 완료되었습니다.");
						location.replace(contextPath + "/sft/notice");
					}
				});
			}
		},
		commentDeleteButton: function() {
			ajax(false, contextPath + "/sft/notice/updateDeleteNotice", "", "", param, function(result) {
				if (result != null && result == "success") {
					alert("삭제 완료되었습니다.");
					location.replace(contextPath + "/sft/notice");
				}
			});
		}
	};
}(window, document, jQuery));