(function(W, D, $) {

	W.$apimanaul = W.$apimanaul || {};

	$(document).ready(function() {
		$apimanaul.ui.pageLoad();		//최초 페이지 로드 시
		$apimanaul.event.setUIEvent();
	});

	$apimanaul.ui = {
		/**
		 *
		 * @name         : pageLoad
		 * @description  : 최초 페이지 로드 시 UI에 적용
		 * @date         : 2018. 09. 13.
		 * @author	     : 이광호
		 */
		pageLoad: function() {
//					$apimanaul.ui.issueApi();		//최초 페이지 로드 시

		},
//		issueApi: function() {
//			const arg = {};
//			ajax(true, contextPath + '/api/apiAuthKey/checkApi', 'body', '확인인중입니다.', arg, function(data) {
//			});
//
//		},


	};


	//이벤트 정의
	$apimanaul.event = {
		setUIEvent: function() {
			
		},
	};
}(window, document, jQuery));
