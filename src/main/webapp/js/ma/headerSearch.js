(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';

	W.$headerSearch = W.$headerSearch || {};


	$(document).ready(function() {
		$headerSearch.ui.pageLoad();		//최초 페이지 로드 시
		//최초 페이지 로드 시


		$headerSearch.event.setUIEvent();
	});

	$headerSearch.ui = {
		pageLoad: function() { },
	};
	//이벤트 정의
	$headerSearch.event = {
		setUIEvent: function() {
			function handleEnterKey(event, searchBtnElement, searchWrdElement) {
				if (event.key === 'Enter') {
					event.preventDefault();

					const grp = {};
					grp.searchword = $(searchWrdElement).val();
					
					if (!grp.searchword) {
						alert("검색어를 입력하세요.");
					} else {
						getToURL(contextPath + '/ma/Search', grp);
					}
				}
			}

			$("#searchWrd_header").on('keydown', function(event) {
				handleEnterKey(event, "#searchBtnHeader", "#searchWrd_header");
			});

			$("#searchWrd_header2").on('keydown', function(event) {
				handleEnterKey(event, "#searchBtnHeader2", "#searchWrd_header2");
			});

			$("#searchBtnHeader").on('click', function(e) {
				e.preventDefault();
				const grp = {};
				grp.searchword = $("#searchWrd_header").val();
				if (!grp.searchword) {
					alert("검색어를 입력하세요.")
				} else {
					getToURL(contextPath + '/ma/Search', grp);
				}
			});

			$("#searchBtnHeader2").on('click', function(e) {
				e.preventDefault();
				const grp = {};
				grp.searchword = $("#searchWrd_header2").val();
				if (!grp.searchword) {
					alert("검색어를 입력하세요.")
				} else {
					getToURL(contextPath + '/ma/Search', grp);
				}
			});

		},

	};

}(window, document, jQuery));