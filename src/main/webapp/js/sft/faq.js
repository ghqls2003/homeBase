(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';

	W.$faq = W.$faq || {};
	
	var columnsData = [
		{
			title: "순번",
			width: "80px",
			field: "rn",
			template: "#: rn #"
		},
		{
			title: "제목",
			width: "80px",
			field: "pst_ttl",
			template: "#: pst_ttl #"
		},
		{
			title: "유형",
			width: "80px",
			field: "cd_nm",
			template: "#: cd_nm #"
		},
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
	]
	$(document).ready(function() {
		$faq.ui.pageLoad();		//최초 페이지 로드 시
		$faq.event.setUIEvent();
	});

	$faq.ui = {
		pageLoad: function() {
			$faq.ui.kendoGrid();


		},

		kendoGrid: function() {
			let encode = kendo.htmlEncode;
			let expandedRow = null; // 현재 확장된 행을 추적하는 변수

			$("#grid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sft/faq/selectFAQList',
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
				columns: columnsData,
				scrollable: true,
				editable: false,
				resizable: false,
				selectable: "row",
				change: function(e) {
					var grid = e.sender;
					var selectedRow = grid.select();
					var selectedDataItem = grid.dataItem(selectedRow);

					var decoded_pst_cn = $("<div>").html(selectedDataItem.pst_cn).text();

					if (expandedRow !== null) {
						expandedRow.next("#detailTable").remove();
					}

					var detailTable = $("<table>").attr("id", "detailTable");
					var fileInfo = selectedDataItem.atch_file_sn;

					var tr1 = $("<tr>").appendTo(detailTable);
					var tdN = $("<td>").attr("id", "detailTitle").appendTo(tr1);

					$("<span>").text("내용").attr("id", "detailSpan").appendTo(tdN);
					$("<td>").attr("id", "detailcnt").text(decoded_pst_cn).appendTo(tr1);

					if (fileInfo != null) {
						var tr2 = $("<tr>").appendTo(detailTable);
						var tdN = $("<td>").attr("id", "detailTitle").appendTo(tr2);

						$("<span>").text("첨부 파일").attr("id", "detailSpan").appendTo(tdN);
						$("<td>").attr("id", "detailFileNm").text(selectedDataItem.atch_file_nm || '첨부 파일 없음').appendTo(tr2);

						var tr3 = $("<tr>").appendTo(detailTable);
						$("<td>").attr("id", "detailcntFileSn").text(selectedDataItem.atch_file_sn || '-').appendTo(tr3);
					}

					if (expandedRow !== selectedRow) {
						$(selectedRow).after(detailTable);
						expandedRow = selectedRow;
					} else {
						expandedRow = null;
					}

					var gridWidth = $('#grid').width() - 10;
					$('#detailTable').css({ 'width': gridWidth + 'px' });
					$('#detailTable #detailTitle').css({ 'width': '15%', 'text-size': '1.8rem', 'border-right': '1px solid #E8EDF8' });
					$('#detailTable #detailcnt').css({ 'width': '70%', 'white-space': 'break-spaces' });
					$('#detailTable #detailcntFileSn').css({ 'display': 'none' });
					$('#detailTable #detailSpan').css({ 'font-size': '1.5rem', 'font-weight': 'bold' });

					$('#detailFileNm').click(function() {
						var atchFileSn = $('#detailcntFileSn').html();
						var atchFileNm = $('#detailFileNm').text();
						fileDownloadget(atchFileSn, atchFileNm);
						$(this).nextAll('tr').slideDown('slow');
					});
				}

			});
		},

		collapseRow: function() {
			var grid = $("#grid").data("kendoGrid");
			$(".k-master-row").each(function() {
				grid.collapseRow(this);
			});
		}
	};

	//이벤트 정의
	$faq.event = {
		setUIEvent: function() {

			// 엔터키 검색 함수
			$("#searchWrd").on('keydown', function(e) {
				if (e.key === 'Enter') {
					$("#grid").data("kendoGrid").dataSource.read();
					$("#grid").data("kendoGrid").dataSource.page(1);
				}
			});
			$("#file_02").change(function() {
				var file = $(this).prop("files")[0];
				if (file != undefined) {
					var fileName = file.name;

					let ext = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);

					if (ext != 'jpg' && ext != 'jpeg' && ext != 'zip' && ext != 'png' && ext != 'pdf') {
						alert("확장자가 jpg, jpeg, png, pdf, zip인\n파일만 업로드 할 수 있습니다.");
						return false;
					}

					$("#file_name02").val(fileName);
				} else
					$("#file_name02").val('');
			});
			$('#FileNm').click(function() {
				//				var atchFileSn = $(this).find("#FileSn").text();
				//				var realFileNm = $(this).find("#FileNm").text();
				alert('dddd');
				// fileDownload(atchFileSn, realFileNm);
				// fileDownloadGet(atchFileSn, realFileNm);
			});
			$("#file_01").change(function() {
				var file = $(this).prop("files")[0];
				if (file != undefined) {
					var fileName = file.name;

					let ext = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);

					if (ext != 'jpg' && ext != 'jpeg' && ext != 'zip' && ext != 'png' && ext != 'pdf') {
						alert("확장자가 jpg, jpeg, png, pdf, zip인\n파일만 업로드 할 수 있습니다.");
						return false;
					}

					$("#file_name").val(fileName);
				} else
					$("#file_name").val('');

			});

			$('#searchBtn').click(function() {
				$("#grid").data("kendoGrid").dataSource.page(1);
			});
			$(document).on('click', '.k-icon.k-i-expand', function() {
				var clickedRow = $(this).closest("tr");

				$(".k-master-row").not(clickedRow).each(function() {
					var grid = $("#grid").data("kendoGrid");
					grid.collapseRow(this);
				});
			});

		},
	};

}(window, document, jQuery));