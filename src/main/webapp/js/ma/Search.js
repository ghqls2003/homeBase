(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';

	W.$search = W.$search || {};
	var nextGridItem;
	var prevGridItem;
	var pageNum;



	$(document).ready(function() {
		$search.ui.pageLoad();		//최초 페이지 로드 시
		$search.ui.searchVal();		//최초 페이지 로드 시
		$search.event.setUIEvent();
	});


	$search.ui = {
		pageLoad: function() {
			var sss = $("#searchWrd").val();
			//			console.log();
			$("#search_stts_cd").kendoDropDownList({
				dataSource: {
					data: [
						{ name: "검색 조건(선택)", value: "" },
						{ name: "제목", value: "pst_ttl" },
						{ name: "내용", value: "pst_cn" },
					]
				},
				dataTextField: "name",
				dataValueField: "value",
				value: "pst_ttl"  // 기본 선택 값 설정
			});
			var inquirySn = $("#inquirySn").val()
			if (inquirySn) {
				//				$search.ui.printDetail(inquirySn);
			}

			$("#noticeList").kendoGrid({
				navigatable: true,
				pageable: {
					pageSize: 10,
					buttonCount: 5
				},
				columns: [
					{ field: "rn", title: "순번", },
					{ field: "pst_ttl", title: "제목", },
					{ field: "reg_dt", title: "등록일자", },
				],
				dataSource: {
					schema: {
						data: "searchData",
						model: {
							fields: {
								rn: { type: "string" },
								pst_ttl: { type: "string" },
								reg_dt: { type: "string" },
							}
						}
					},
				},
				noRecords: {
					template: '<div class ="MenuURl">데이터가 없습니다.</div>'
				},
				sortable: false,
				editable: false,
				resizable: false,
				selectable: "row",
				scrollable: false,

				change: function(e) {
					var grid = $("#noticeList").data("kendoGrid");
					var dataItem = grid.dataItem(e.sender.select());

					// 상세보기 페이지 이동
					postToURL(contextPath + "/sft/noticeDetail", { pstSn: dataItem.pst_sn });
				},
				//
				//				detailTemplate: ({ pst_cn }) => {
				//					const decode = $search.ui.decodeHtml(pst_cn);
				//					const text = decode.replace(/\./g, '.<br />');
				//
				//					// CSS 클래스를 추가하여 스타일 적용
				//					return `<div class="grid-detail-content">${text}</div>`;
				//
				//				},

				dataBound: function(e) {
					$('.k-i-expand').hide();

					var grid = e.sender;
					$('#noticeList').data('kendoGrid').tbody[0]
					grid.tbody.find("tr.k-master-row").each(function() {
						grid.expandRow(this);
					});

				}
			});


			$("#inquiryList").kendoGrid({
				navigatable: true,
				pageable: {
					pageSize: 10,
					buttonCount: 5
				},
				columns: [
					{ field: "rn", title: "순번", sortable: false },
					{ field: "pst_ttl", title: "제목", sortable: false },
					{ field: "reg_dt", title: "등록일자", sortable: false },
				],
				dataSource: {
					schema: {
						data: "searchData",
						model: {
							fields: {
								rn: { type: "string" },
								pst_ttl: { type: "string" },
								reg_dt: { type: "string" },
							}
						}
					},
				},
				noRecords: {
					template: '<div class ="MenuURl">데이터가 없습니다.</div>'
				},
				sortable: false,
				editable: false,
				resizable: false,
				selectable: "row",
				scrollable: false,
				change: function(e) {
					var grid = $("#inquiryList").data("kendoGrid");
					var dataItem = grid.dataItem(e.sender.select());

					postToURL(contextPath + "/sft/inquirydetail", { pstSn: dataItem.pst_sn });
				}, detailTemplate: ({ pst_cn }) => {
					const decode = $search.ui.decodeHtml(pst_cn);
					const text = decode.replace(/\./g, '.<br />');

					return `<div class="grid-detail-content">${text}</div>`;
				},

				dataBound: function(e) {
					$('.k-i-expand').hide();

					var grid = e.sender;
					$('#inquiryList').data('kendoGrid').tbody[0]
					grid.tbody.find("tr.k-master-row").each(function() {
						grid.expandRow(this);
					});

				}
			});

			$("#FaqList").kendoGrid({
				navigatable: true,
				pageable: {
					pageSize: 10,
					buttonCount: 5
				},
				columns: [
					{ field: "rn", title: "순번" },
					{ field: "pst_ttl", title: "제목" },
					{ field: "reg_dt", title: "등록일" }
				],
				dataSource: {
					schema: {
						data: "searchData",
						model: {
							fields: {
								rn: { type: "string" },
								pst_ttl: { type: "string" },
								reg_dt: { type: "string" },
								pst_cn: { type: "String" }
							}
						}
					},
				},
				noRecords: {
					template: '<div class ="MenuURl">데이터가 없습니다.</div>'
				},
				sortable: false,
				editable: false,
				resizable: false,
				selectable: "row",
				scrollable: false,
				detailTemplate: ({ pst_cn }) => `<div class="alpha"  style="text-align: left; white-space: normal; word-wrap: break-word; ">내용: ${kendo.htmlEncode(pst_cn.replace('&lt;', '>').replace('&gt;', '>'))}</div>`,
				dataBound: function(e) {
					$('.k-i-expand').hide();
					var grid = e.sender;
					grid.tbody.find("tr.k-master-row").each(function() {
						grid.expandRow(this);
					});
				}
			});

		},

		decodeHtml: function(html) {
			var txt = document.createElement("textarea");
			txt.innerHTML = html;
			return txt.value;
		},
		rowClickEventNotice: function(e) {
			var rows = e.sender.select();
			var data;

			rows.each(function(e) {
				var grid = $("#noticeList").data("kendoGrid");
				var dataItem = grid.dataItem(this);
				data = dataItem;
			});

			$search.ui.detailGrid2(data.pst_sn);
		},

		rowClickEvent: function(e) {
			var rows = e.sender.select();
			var data;

			rows.each(function(e) {
				var grid = $("#inquiryList").data("kendoGrid");
				var dataItem = grid.dataItem(this);
				data = dataItem;
			});

			$search.ui.detailGrid(data.pst_sn);
		},

		searchVal: function() {
			if (Search_Header == "") {
				alert("검색어를 입력하세요.");
			} else {
				const arg = {};
				arg.headerSearch = Search_Header;
				arg.search_wrd = Search_Header;
				arg.searchSttsCd = $("#search_stts_cd").val();
				$search.ui.gridLoad(arg);
				$search.ui.gridLoad2(arg);
				$search.ui.gridLoad3(arg);
				$search.ui.MenuList(arg);
				const searchParams = new URLSearchParams(location.search);
				$('#searchKeyWrd').val(searchParams.get('searchword'));
			}
		},
		MenuList: function(arg) {

			ajax(true, contextPath + '/ma/search/menuShow', 'body', '조회중입니다', arg, function(data) {
				//				alert(JSON.stringify(data));
				$search.ui.menuShow(data);
			})

		},
		menuShow: function(data) {
			var menuContainer = $('#menuContainer');
			menuContainer.empty(); // 메뉴 컨테이너를 비웁니다.:

			if (data && data.length > 0) {

				data.forEach(function(menuItem) {
					var menuName = menuItem.menu_nm;
					var upMenu = menuItem.upmenu;
					var menuURL = menuItem.menu_url;

					var menuText = menuName;
					if (upMenu && upMenu !== '') {
						menuText = upMenu + ' -> ' + menuName;
					}

					var menuElement = $('<div class ="MenuURl">').text(menuText);
					menuElement.on('click', function() {

						//						console.log();
						//						깃 올릴때
						window.location.href = `${contextPath}` + '/' + `${menuURL}`;
						//						로컬에서 할때						
						//						window.location.href = 'http://localhost:8080/rims/' + menuURL;
					});

					menuContainer.append(menuElement);
				});
			} else {
				var menuElement = $('<div class ="MenuURl">').text('메뉴가 없습니다.');
				menuContainer.append(menuElement);
			}
		}
		,
		gridLoad: function(arg) {

			ajax(true, contextPath + '/ma/search/selectinquiry', 'body', '조회중입니다', arg, function(data) {
				$search.ui.findGrid(data);
			});
		},
		gridLoad2: function(arg) {
			ajax(true, contextPath + '/ma/search/selectNoticeList', 'body', '조회중입니다', arg, function(data) {
				$search.ui.findGrid2(data);
			});
		},
		gridLoad3: function(arg) {
			ajax(true, contextPath + '/ma/search/selectFAQList', 'body', '조회중입니다', arg, function(data) {
				$search.ui.findGrid3(data);
			});
		},
		findGrid: function(searchData) {

			var grid = $('#inquiryList').data('kendoGrid');
			if (grid != '' && grid != null) {
				grid.setDataSource(searchData);
				$search.ui.highlightWord(searchData);
			}

		},
		highlightWord: function(search_wrd) {
			var entityGrid = $("#inquiryList").data("kendoGrid");
			var data = entityGrid.dataSource.data();
			var search_wrd = $("#searchKeyWrd").val();

			var regex = new RegExp(`(${search_wrd})`, 'gi'); // 정규식을 사용하여 단어를 찾음

			// 켄도그리드의 columns.template 설정
			entityGrid.setOptions({
				columns: [
					{ field: "rn", title: "순번" },
					{
						field: "pst_ttl",
						title: "제목",
						template: function(dataItem) {
							// 제목에 대해 하이라이트 적용
							var highlightedTitle = dataItem.pst_ttl.replace(regex, '<span class="highlight quiry-cell">$1</span>');
							return highlightedTitle;
						}
					},
					{ field: "reg_dt", title: "등록일자" },
				],
				detailTemplate: function(dataItem) {
					var search_wrd = $("#searchKeyWrd").val();
					var regex = new RegExp(`(${search_wrd})`, 'gi'); // 정규식을 사용하여 단어를 찾음

					// 내용에 대해 하이라이트 적용
					var highlightedContent = dataItem.pst_cn.replace(regex, '<span class="highlight quiry-cell">$1</span>');

					// 텍스트 길이가 100자 이상인 경우 뒷 부분을 "..."으로 대체
					if (highlightedContent.length > 100) {
						highlightedContent = highlightedContent.substr(0, 100) + "...";
					}

					return "<div class='content-container'>" + highlightedContent + "</div>";
				},
			});
		},



		findGrid2: function(searchData) {
			var grid = $('#noticeList').data('kendoGrid');
			var gridrefresh = grid.setDataSource(searchData);
			if (grid != '' && grid != null) {
				grid.setDataSource(searchData);
				$search.ui.highlightWord2(searchData);
			}
		},
		highlightWord2: function(search_wrd) {
			var entityGrid = $("#noticeList").data("kendoGrid");
			var data = entityGrid.dataSource.data();
			var search_wrd = $("#searchKeyWrd").val();

			var regex = new RegExp(`(${search_wrd})`, 'gi'); // 정규식을 사용하여 단어를 찾음

			// 켄도그리드의 columns.template 설정
			entityGrid.setOptions({
				columns: [
					{ field: "rn", title: "순번" },
					{
						field: "pst_ttl",
						title: "제목",
						template: function(dataItem) {
							// 제목에 대해 하이라이트 적용
							var highlightedTitle = dataItem.pst_ttl.replace(regex, '<span class="highlight quiry-cell">$1</span>');
							return highlightedTitle;
						}
					},
					{ field: "reg_dt", title: "등록일자" },
				],
				detailTemplate: function(dataItem) {
					var highlightedDetail = dataItem.pst_cn.replace(regex, '<span class="highlight quiry-cell">$1</span>');

					if (highlightedDetail.length > 75) {
						highlightedDetail = highlightedDetail.substr(0, 75) + "...";
					}

					return "<div>" + highlightedDetail + "</div>";
				}
			});
		},


		findGrid3: function(searchData) {


			var grid = $('#FaqList').data('kendoGrid');
			if (grid != '' && grid != null) {
				grid.setDataSource(searchData);
				$search.ui.highlightWord3(searchData);
			}

		},
		highlightWord3: function(search_wrd) {
			var entityGrid = $("#FaqList").data("kendoGrid");
			var data = entityGrid.dataSource.data();
			var search_wrd = $("#searchKeyWrd").val();

			var regex = new RegExp(`(${search_wrd})`, 'gi'); // 정규식을 사용하여 단어를 찾음

			// 켄도그리드의 columns.template 설정
			entityGrid.setOptions({
				columns: [
					{ field: "rn", title: "순번" },
					{
						field: "pst_ttl",
						title: "제목",
						template: function(dataItem) {
							// 제목에 대해 하이라이트 적용
							var highlightedTitle = dataItem.pst_ttl.replace(regex, '<span class="highlight quiry-cell">$1</span>');
							return highlightedTitle;
						}
					},

					{ field: "reg_dt", title: "등록일자" },
					//					{ field: "atch_file_sn", title: "파일첨부", attributes: { "class": "quiry-cell" } },
					//					{ field: "inq_cnt", title: "조회수", attributes: { "class": "quiry-cell" } },

				],
				detailTemplate: function(dataItem) {
					// 상세 정보에 대해 하이라이트 적용
					var highlightedDetail = dataItem.pst_cn.replace(regex, '<span class="highlight quiry-cell">$1</span>');
					return "<div id ='hDetail'>" + highlightedDetail + "</div>";

				}
			});
		},


	};

	//이벤트 정의
	$search.event = {
		setUIEvent: function() {
			$("#commentSubmitButton").on("click", function() {
				if (Auth != 'K01' || Auth != 'D01' || Auth != 'Z01') {
					alert("관리자만 작성할 수 있습니다.")
				} else {
					var replyWrite = $('#replyWrite').val();
					$search.ui.reply(replyWrite);
					$('#replyWrite').val('');
				}

			});
			$('.detailFileIco').click(function() {
				var FileSn = $('#fileSn').html();
				var FileNm = $('#InauiryAtchNm').html();
				fileDownload(FileSn, FileNm);
			});

			$("#prevPstTtl").click(function() {
				var prevPstSnValue = $("#prevPstSn").html();
				$search.ui.detailGrid(prevPstSnValue);
			});
			$("#nextPstTtl").click(function() {
				var nextPstSnValue = $("#nextPstSn").html();
				$search.ui.detailGrid(nextPstSnValue);
			});
			$("#prevPstTtl2").click(function() {
				var prevPstSnValue = $("#prevPstSn2").html();
				$search.ui.detailGrid2(prevPstSnValue);
			});
			$("#nextPstTtl2").click(function() {
				var nextPstSnValue = $("#nextPstSn2").html();
				$search.ui.detailGrid2(nextPstSnValue);
			});
			$("#listbutton").click(function() {
				$search.ui.optionGridClose();
			});
			$("#listbutton2").click(function() {
				$search.ui.optionGridClose2();
			});
			$(".tit01").click(function() {
				$search.ui.optionGridClose();
			});

			function EnterKeyForSearch(event) {
				if (event.key === 'Enter') {
					event.preventDefault();

					if ($("#searchKeyWrd").val() == "" || $("#search_stts_cd").val() == "") {
						alert("검색어를 입력하세요.");
					} else {
						const arg = {};
						var searchWrd = $("#searchKeyWrd").val();
						if (searchWrd == '') {
							arg.search_wrd = Search_Header
							arg.searchSttsCd = $("#search_stts_cd").val();
						} else {
							arg.search_wrd = $("#searchKeyWrd").val();
							arg.searchSttsCd = $("#search_stts_cd").val();
						}


						$('#searchWrd').val($("#searchKeyWrd").val());

						$search.ui.gridLoad(arg);
						$search.ui.gridLoad2(arg);
						$search.ui.gridLoad3(arg);
						$search.ui.MenuList(arg);
					}
				}
			}

			$("#searchKeyWrd").on('keydown', function(event) {
				EnterKeyForSearch(event);
			});

			$("#searchBtn").on("click", function() {
				if ($("#searchKeyWrd").val() == "" || $("#search_stts_cd").val() == "") {
					alert("검색어 및 검색조건을 입력하세요.");
				} else {
					var reg = /[^\w\s]/;
					const arg = {};
					var inquiryContent = $('#searchKeyWrd').val().replace(/\$/g, "\\$");
					arg.search_wrd = inquiryContent
					arg.searchSttsCd = $("#search_stts_cd").val();
					var searchWrd = $("#searchKeyWrd").val();
					if (searchWrd == '') {
						arg.search_wrd = Search_Header
						arg.searchSttsCd = $("#search_stts_cd").val();
					} else {
						arg.search_wrd = inquiryContent
						arg.searchSttsCd = $("#search_stts_cd").val();
					}
					$('#searchWrd').val($("#searchKeyWrd").val());

					$search.ui.gridLoad(arg);
					$search.ui.gridLoad2(arg);
					$search.ui.gridLoad3(arg);
					$search.ui.MenuList(arg);
				}
			});

			$("#openPopup").on("click", function() {
				$('.detail_popup').addClass('view');
			});

			$("#inquiryEnrollBtn").on("click", function() {
				$search.ui.insertInquiry();
				//location.reload();
			});
			$("#commentSubmitButton").on("click", function() {
				var replyWrite = $('#replyWrite').val();
				$search.ui.reply(replyWrite);
				$('#replyWrite').val('');
			});
		},
		//		light: function() {
		//			var search_wrd = $('#searchKeyWrd').val();
		//			var element = document.getElementById('noticeList'); // 하이라이트를 적용할 요소의 ID
		//			var element2 = document.getElementById('inquiryList'); // 하이라이트를 적용할 요소의 ID
		//			var element3 = document.getElementById('FaqList'); // 하이라이트를 적용할 요소의 ID
		//			var regex = new RegExp(`(${search_wrd})`, 'gi'); // 정규식을 사용하여 단어를 찾음
		//			var content = element.innerHTML;
		//			var content2 = element2.innerHTML;
		//			var content3 = element3.innerHTML;
		//			var highlightedContent = content.replace(regex, '<span class="highlight">$1</span>'); // 찾은 단어를 감싸고 CSS 클래스 적용
		//			var highlightedContent2 = content2.replace(regex, '<span class="highlight">$1</span>'); // 찾은 단어를 감싸고 CSS 클래스 적용
		//			var highlightedContent3 = content3.replace(regex, '<span class="highlight">$1</span>'); // 찾은 단어를 감싸고 CSS 클래스 적용
		//			element.innerHTML = highlightedContent;
		//			element2.innerHTML = highlightedContent2;
		//			element3.innerHTML = highlightedContent3;
		//		}
	};

}(window, document, jQuery));
