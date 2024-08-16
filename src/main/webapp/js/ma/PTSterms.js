/**
 * 개인정보보호서약
 *
 */
(function (W, D, $) {
    'use strict';

	W.$terms = W.$terms || {};
	
	$(document).ready(function() {
		$terms.ui.pageLoad();	
		$terms.event.setUIEvent();
	});

    // jQuery custom function
    // 라이브러리를 사용하는 외부에서 접근할 수 있도록(전역함수) encapsulation
    // 객체 메소드는 jQuery.fn($.fn)으로 정의하여 사용함. jQuery.prototype 의 별칭
	$terms.ui = {
			
		pageLoad : function() {
            var today = new Date();
            
			$("#lblYear").text(today.getFullYear());
            $("#lblMon").text(today.getMonth() + 1);
            $("#lblDate").text(today.getDate());
        }
	};
	
	//이벤트 정의
	$terms.event = {
			
		setUIEvent : function() {
			$(document).on("click", "#getDataList01", function() {
				$("#getDataList01").addClass("on");
			});
		},

        selectAgree : function() {
            // 동의 처리 후 메인페이지로 이동
            var param = {};
            
            if (confirm("동의 처리 하시겠습니까?")) {
                param.termsAgre = 'Y';				
		
                ajax(true, contextPath + '/ma/main/updateTermsInfo', 'body', '처리중입니다.', param, function (data) {
                    if (data != null) {
                        if (data > 0) {
                            alert("동의 처리 되었습니다.");
                            window.location.href = contextPath + '/ma/main/';
                        } 
                    }
                });
            }
        },

		selectdeAgree: function() {
			if (confirm("동의 거부 하시겠습니까?")) {
				location.href='/ma/logout'				
			}
		}
	};

}(window, document, jQuery));