
(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';

	W.$inquiry = W.$inquiry || {};
	var nextGridItem;
	var prevGridItem;
	var pageNum;
	var searchData = null;
	const specialCharPattern = /[`@#$%^&{}|<>]/;


	$(document).ready(function() {
		$inquiry.ui.pageLoad();		//최초 페이지 로드 시
		$inquiry.event.setUIEvent();
	});

	$inquiry.ui = {
		pageLoad: function() {
			if (Auth == 'Z01' || Auth == 'K01') {
				searchData =
					[
						{ field: "rn", width: "40px", title: "순번" },
						{ field: "reg_dt", width: "100px", title: "등록일" },
						{ field: "cd_nm", width: "100px", title: "유형" },
						{ field: "pst_ttl", width: "200px", title: "제목" },
						{ field: "masked_user_nm", width: "100px", title: "등록자" },
						{ field: "comment_status", width: "80px", title: "처리결과" },
						{
							field: "atch_file_sn",
							title: "파일첨부",
							width: "80px",
							template: function(data) {
								if (data.atch_file_sn) {
									return '<img style="margin-inline: auto;" className="fileIco" src="' + contextPath + '/images/icons/ico_file.png" alt="파일다운로드 아이콘"/>';
								} else {
									return '파일없음';
								}
							}
						},
						{ field: "inq_cnt", width: "60px", title: "조회수" },
						{
							field: "use_yn", width: "60px", title: "공개여부",
							template: function(data) {
								if (data.use_yn == "Y") {
									return '공개';
								} else {
									return '비공개';
								}
							}
						},

					];
			} else {
				searchData =
					[
						{ field: "rn", width: "40px", title: "순번" },
						{ field: "reg_dt", width: "100px", title: "등록일" },
						{ field: "cd_nm", width: "100px", title: "유형" },
						{ field: "pst_ttl", width: "200px", title: "제목" },
						{ field: "masked_user_nm", width: "100px", title: "등록자" },
						{ field: "comment_status", width: "80px", title: "처리결과" },
						{
							field: "atch_file_sn",
							title: "파일첨부",
							width: "80px",
							template: function(data) {
								if (data.atch_file_sn) {
									return '<img style="margin-inline: auto;" className="fileIco" src="' + contextPath + '/images/icons/ico_file.png" alt="파일다운로드 아이콘"/>';
								} else {
									return '파일없음';
								}
							}
						},
						{ field: "inq_cnt", width: "60px", title: "조회수" },

					];
			}
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
			var searchOtherCondition = [
				{ value: "Title", text: "제목" },
				{ value: "Auth", text: "등록자" }
			];

			$("#search_stts_cd").kendoDropDownList({
				optionLabel: "검색조건 선택",
				dataTextField: "text",
				dataValueField: "value",
				dataSource: searchOtherCondition,
				value: ""
			});

			var searchOtherCondition2 = [
				{ value: "Q01", text: "웹사이트" },
				{ value: "Q02", text: "운전자격검증" },
				{ value: "Q99", text: "기타" }
			];
			$("#search_stts_cd3").kendoDropDownList({
				optionLabel: "유형 선택",
				dataTextField: "text",
				dataValueField: "value",
				dataSource: searchOtherCondition2,
				value: ""
			});
			var inquirySn = $("#inquirySn").val()
			if (inquirySn) {
				$inquiry.ui.printDetail(inquirySn);
			}

			//			$("#grid").kendoGrid({
			//				navigatable: true,
			//				pageable: {
			//					pageSize: 10,
			//					buttonCount: 5
			//				},
			//				columns: searchData,
			//				dataSource: {
			//					schema: {
			//						data: "searchData",
			//						model: {
			//							fields: {
			//								rn: { type: "string" },
			//								pst_ttl: { type: "string" },
			//								reg_dt: { type: "string" },
			//								atch_file_sn: { type: "string" },
			//								inq_cnt: { type: "string" }
			//							}
			//						}
			//					},
			//				},
			//				noRecords: {
			//					template: "데이터가 없습니다."
			//				},
			//				editable: false,
			//				resizable: true,
			//				selectable: "row",
			//				scrollable: true,
			//				change: function(e) {
			//					var grid = $("#grid").data("kendoGrid");
			//					var dataItem = grid.dataItem(e.sender.select());
			//
			//					// 상세보기 페이지 이동
			//					postToURL(contextPath + "/sft/inquirydetail", { pstSn: dataItem.pst_sn });
			//				},
			//			});
			$inquiry.ui.kendoGridLoad();

		},

		kendoGridLoad: function() {
			$("#grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sft/inquiry/selectinquiryList',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							options.search_wrd = $("#searchWrd").val();
							options.searchSttsCd = $("#search_stts_cd").val();
							options.searchSttsCd3 = $("#search_stts_cd3").val();
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
				columns: searchData,
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
				selectable: "rpw",
				excel: {
					fileName: "건별 엑셀.xlsx",
					allPages: true,
					filterable: true
				},
				change: function(e) {
					var grid = $("#grid").data("kendoGrid");
					var dataItem = grid.dataItem(e.sender.select());

					// 상세보기 페이지 이동
					postToURL(contextPath + "/sft/inquirydetail", { pstSn: dataItem.pst_sn });
				},


			});
		},

		gridLoad: function() {
			const arg = {};
			arg.search_wrd = $("#searchWrd").val();
			arg.searchSttsCd = $("#search_stts_cd").val();
			arg.searchSttsCd3 = $("#search_stts_cd3").val();
			//			arg.Auth = Auth;
			ajax(true, contextPath + '/sft/inquiry/selectinquiryList', 'body', '조회중입니다', arg, function(data) {

				$inquiry.ui.findGrid(data);
			});
		},
		findGrid: function(searchData) {
			var arg = {};
			arg.stts_cd = $("#search_stts_cd").val();
			arg.search_wrd = $("#searchWrd").val();
			arg.searchSttsCd = $("#search_stts_cd").val();

			var grid = $('#grid').data('kendoGrid');
			grid.setDataSource(searchData);
		},
	};

	//이벤트 정의
	$inquiry.event = {
		setUIEvent: function() {
			// 엔터키 검색 함수
			$("#searchWrd").on('keydown', function(e) {
				if (e.key === 'Enter') {
					var grid = $('#grid').data('kendoGrid');
					grid.dataSource.page(1);
				}
			});
			$('#openPopup').click(function() {
				$("#notice").css('display', 'none');
				$("#noticeDetail").css('display', 'none');
				$("#inquiryEnroll").css('display', 'block');
				$(".ico").empty();
			});
			$('.detailFileIco').click(function() {
				//				console.log($('#fileSn').html())
				//				console.log($('#InquiryAtchNm').html())
				fileDownload($('#fileSn').html(), $('#InquiryAtchNm').html());
			});

			$("#prevPstTtl").click(function() {
				var prevPstSnValue = $("#prevPstSn").html();
				if (prevPstSnValue == "") {
					alert("처음 글입니다.")
				} else {
					$inquiry.ui.detailGrid(prevPstSnValue);
				}
			});
			$("#nextPstTtl").click(function() {
				var nextPstSnValue = $("#nextPstSn").html();
				if (nextPstSnValue == "") {
					alert("마지막 글입니다.")
				} else {
					$inquiry.ui.detailGrid(nextPstSnValue);
				}
			});
			$("#listbutton").click(function() {
				$inquiry.ui.optionGridClose();
			});

			$(".tit01").click(function() {
				$inquiry.ui.optionGridClose();
			});

			$("#commentSubmitButton").on("click", function() {
				if (Auth != 'K01' || Auth != 'D01' || Auth != 'Z01') {
					alert("관리자만 작성할 수 있습니다.")
				} else {
					var replyWrite = $('#replyWrite').val();
					$inquiry.ui.reply(replyWrite);
					$('#replyWrite').val('');
				}

			});

			$("#searchBtn").on("click", function() {
				var grid = $('#grid').data('kendoGrid');
				grid.dataSource.page(1);
			});

			$("#fileBtn").change(function() {
				var file = $(this).prop("files")[0];
				if (file != undefined) {
					var fileName = file.name;
					$('#file2').html(fileName);
				} else {
					$("#file").val('');
				}
			});

			$('.cancel_btn').click(function() {
				location.reload();

			});
			$('.insertBtn').click(function() {
				$inquiry.event.InsertParam();
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
			$('#inquiryContent').on('keydown', function(e) {
				if (e.keyCode === 13) {
					e.preventDefault();
					var content = $(this).val();
					$(this).val(content + '\n');
				}
			});

			$(document).ready(function() {
				$("#privacyAgreementText").click(function() {
					$("#privacyAgreement").prop("checked", !$("#privacyAgreement").prop("checked"));
				});
			});
		},
		InsertParam: function() {
			var pstCn = $('#inquiryContent').val()
			var pstTtl = $('#inquiryTitle').val();
			var param = {
				menuCd: 'BBST02',
				pstTtl: pstTtl,
				pstCn: pstCn
			};
			if (specialCharPattern.test(pstCn) || specialCharPattern.test(pstTtl)) {
				var specialpstCn = pstCn.match(specialCharPattern) || []
				alert('제목 및 내용에 특수문자 ' + specialpstCn + '가 포함되어 있습니다.')
			} else {
				if ($("#fileBtn").val()) {
					$inquiry.event.insertFile(param);
				} else {
					$inquiry.event.insertinquiry(param);
				}
			}

		},
		insertFile: function(param) {
			var uploadedFile = document.getElementById('fileBtn').files[0];

			if (uploadedFile) {
				var fileName = uploadedFile.name;
				var fileExtension = fileName.split('.').pop();

				if (fileExtension.toLowerCase() === 'txt') {
					alert('텍스트(.txt)파일은 업로드가 불가능합니다.');
					return;
				}

				var formData = new FormData();
				formData.append('files', uploadedFile);

				fileAjax(contextPath + "/cmmn/fileUpload", formData, function(response) {
					if (response != null) {
						param.fileSn = nvl(response.fileSn, 0);
						$inquiry.event.insertinquiry(param);
					}
				});
			}
		},


		insertinquiry: function(param) {
			var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[^$]{8,}$/;
			var inquirySection = $('#inquirySection').val();
			var inquiryTitle = $('#inquiryTitle').val().replace(/\$/g, "\\$");
			var inquiryContent = $('#inquiryContent').val().replace(/\$/g, "\\$");
			var inquiryFile = param.fileSn;
			var menuCd = "BBST02"
			var privacyAgreement = $('#privacyAgreement').is(':checked');
			var pswd = $('#inquiryPswd').val();
			if (false === reg.test(pswd)) {
				alert('비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자($제외)를 모두 포함해야 합니다.');
			} else {
				const arg = {};
				arg.inquirySection = inquirySection;
				arg.inquiryTitle = inquiryTitle;
				arg.inquiryContent = inquiryContent;
				arg.menuCd = menuCd;
				arg.pswd = pswd;
				if (inquiryFile) {
					arg.inquiryFile = inquiryFile;
				}
				if (pswd.indexOf(' ') !== -1) {
					alert('비밀번호에 공백을 포함할 수 없습니다.')
					return;
				}
				if (!privacyAgreement) {
					alert('개인정보 사용 동의 체크 해주세요.')
					return;
				}
				if (pswd.trim() == '') {
					alert('비밀번호를 입력해주세요');
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

			ajax(true, contextPath + '/sft/inquiry/insertInquiry', 'body', '확인인중입니다.', data, function(data) {
				if (data != null) {
					if (data == "success") {
						alert("등록되었습니다.");
						location.reload();
					} else {
						alert(data);
						location.reload();
					}
				}

			});
			return true;
		},
	};

}(window, document, jQuery));