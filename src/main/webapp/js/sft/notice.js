(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';
	var searchData = null;
	W.$notice = W.$notice || {};
    const specialCharPattern = /[`!@#$%^&*()_+=[\]{};':"\\|<>/]/;

	$(document).ready(function() {
		$notice.ui.pageLoad();		//최초 페이지 로드 시
		$notice.event.setUIEvent();
	});

	$notice.ui = {
		pageLoad: function() {
			//			var noticeSn = $("#noticeSt").val()
			//			if(noticeSn){
			//				$notice.ui.printDetail(noticeSn);
			//			}
			if (authrtCd == 'Z01' || authrtCd == 'K01') {
				searchData =
					[
						{
							title: "순번",
							width: "40px",
							field: "rn",
							template: "#: rn #"
						},
						{
							title: "제목",
							width: "200px",
							field: "pst_ttl",
							template: function(dataItem) {
								return ((dataItem.pst_ttl).replace(/\\\$/g, '$')).replace(/\\\\/g, '\\')
							}
						},
						{
							title: "등록일",
							width: "100px",
							field: "reg_dt",
							template: "#: reg_dt #"
						},
						{
							title: "파일첨부",
							width: "60px",
							field: "file_sn",
							template: function(dataItem) {
								if (dataItem.file_sn != null)
									return '<img style="margin-inline: auto;" className="fileIco" src="' + contextPath + '/images/icons/ico_file.png" alt="파일다운로드 아이콘"/>';
								else
									return "";
							}
						},
						{
							title: "조회수",
							width: "60px",
							field: "inq_cnt",
							template: "#: inq_cnt #"
						},
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
						{
							title: "순번",
							width: "40px",
							field: "rn",
							template: "#: rn #"
						},
						{
							title: "제목",
							width: "200px",
							field: "pst_ttl",
							template: function(dataItem) {
								return ((dataItem.pst_ttl).replace(/\\\$/g, '$')).replace(/\\\\/g, '\\')
							}
						},
						{
							title: "등록일",
							width: "100px",
							field: "reg_dt",
							template: "#: reg_dt #"
						},
						{
							title: "파일첨부",
							width: "60px",
							field: "file_sn",
							template: function(dataItem) {
								if (dataItem.file_sn != null)
									return '<img style="margin-inline: auto;" className="fileIco" src="' + contextPath + '/images/icons/ico_file.png" alt="파일다운로드 아이콘"/>';
								else
									return "";
							}
						},
						{
							title: "조회수",
							width: "60px",
							field: "inq_cnt",
							template: "#: inq_cnt #"
						}
					];
			}

			var today = new Date();
			var oneYearAgo = new Date();
			oneYearAgo.setFullYear(today.getFullYear() - 1);
			$(".datepicker").kendoDatePicker({
				format: "yyyy-MM-dd",
				value: new Date()
			});

			$("#start-picker01").data("kendoDatePicker").value(oneYearAgo);

			if (authrtCd == "K01" || authrtCd == "Z01") {
				var html = `
				<div class="btn_flex">
		        	<button class="blue_btn writeBtn" style="margin: 0">글쓰기</button>
		        </div>
				`;
				$("#notice").append(html);
			}

			$('#start-picker01').on('change', function() {
				if (new Date($('#start-picker01').val()) > new Date($('#end-picker01').val())) {
					alert("시작일은 종료일보다 늦을 수 없습니다.");
					$('#start-picker01').data("kendoDatePicker").value(new Date($('#end-picker01').val()));
				}
			});

			$notice.ui.kendoGrid();
		},

		kendoGrid: function() {
			$("#grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sft/notice/selectNoticeList',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							},
							complete: function(xhr, status) {
								if (xhr.status != 200) {
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
						parameterMap: function(options) {
							options.authrtCd = authrtCd
							options.searchWrd = $("#searchWrd").val();
							options.startDt = $("#start-picker01").val();
							options.endDt = $("#end-picker01").val();

							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					pageSize: 10,
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
				columns: searchData,
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
				change: function(e) {
					var grid = $("#grid").data("kendoGrid");
					var dataItem = grid.dataItem(e.sender.select());

					// 상세보기 페이지 이동
					postToURL(contextPath + "/sft/noticeDetail", { pstSn: dataItem.pst_sn });
				},
			});
		}
	};

	//이벤트 정의
	$notice.event = {
		setUIEvent: function() {

			// 엔터키 검색 함수
			$("#searchWrd").on('keydown', function(e) {
				if (e.key === 'Enter') {
					$("#grid").data("kendoGrid").dataSource.read();
					$("#grid").data("kendoGrid").dataSource.page(1);
				}
			});

			$('#searchBtn').click(function() {
				$("#grid").data("kendoGrid").dataSource.page(1);
			});

			$('.writeBtn').click(function() {
				$("#notice").css('display', 'none');
				$("#noticeInsert").css('display', 'block');
				$(".ico").empty();
				$notice.event.resetNotice();
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

			$('.insertBtn').click(function() {
				$notice.event.setInsertParam();
			});

			$('.cancel_btn').click(function() {
				$("#noticeInsert").css('display', 'none');
				$("#notice").css('display', 'block');
			});
		},

		setInsertParam: function() {
			var pstTtl = $('#title').val();
			var pstCn = $('#content').val();
			var param = {
				menuCd: 'BBST01',
				pstTtl: $('#title').val(),
				pstCn: $('#content').val()
			};
			if (specialCharPattern.test(pstCn) || specialCharPattern.test(pstTtl)) {
				var specialpstCn = pstCn.match(specialCharPattern) || []
				alert('제목 및 내용에 특수문자 ' + specialpstCn + '가 포함되어 있습니다.')
			} else {
				if ($("#file").val()) {
					$notice.event.insertFile(param);
				} else {
					$notice.event.insertNotice(param);
				}
			}
//			if ($("#fileBtn").val()) {
//				$notice.event.insertFile(param);
//			} else {
//				$notice.event.insertNotice(param);
//			}
		},

		insertFile: function(param) {
			var formData = new FormData();
			formData.append('files', document.getElementById('fileBtn').files[0]);

			fileAjax(contextPath + "/cmmn/fileUpload", formData, function(response) {
				if (response != null) {
					param.atchFileSn = nvl(response.fileSn, 0);

					$notice.event.insertNotice(param);
				}
			});
		},

		insertNotice: function(param) {
			if ($("#title").val() == '')
				alert("제목을 입력해 주십시오.")
			else if ($("#content").val() == '')
				alert("공지내용을 입력해 주십시오.")
			else {
				ajax(false, contextPath + "/sft/notice/insertNotice", "", "", param, function(result) {
					if (result != null) {
						if (result == "success") {
							alert("공지사항 등록이 완료되었습니다.");
							$("#noticeInsert").css('display', 'none');
							$("#notice").css('display', 'block');
							$("#grid").data("kendoGrid").dataSource.page(1);
						} else {
							alert(result);
							$("#noticeInsert").css('display', 'none');
							$("#notice").css('display', 'block');
							$("#grid").data("kendoGrid").dataSource.page(1);
						}
					}
				});
			}
		},

		resetNotice: function() {
			$('#title').val('');
			$('#content').val('');
			$('#file').val('');
			$('#fileBtn').val('');
		}
	};

}(window, document, jQuery));