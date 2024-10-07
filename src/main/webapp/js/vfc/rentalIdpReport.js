(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

    W.$rental = W.$rental || {};

    $(document).ready(function() {
       $rental.ui.pageLoad();		//최초 페이지 로드 시
       $rental.event.setUIEvent();
    });

	$rental.ui = {
		urlPath : document.location.protocol + "//" + document.location.host,

		pageLoad : function() {
			html2xml('reportDiv');			// 리포트 조회
		},
	};

    //이벤트 정의
   $rental.event = {
        setUIEvent : function() {
        },

    };

}(window, document, jQuery));