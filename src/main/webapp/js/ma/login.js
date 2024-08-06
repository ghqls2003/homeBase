/**
 * 로그인 JS
 *
 * history : 네이버시스템(주), 1.0, 2023/06/05  초기 작성
 * author : 김형진
 * version : 1.0
 *
 */
(function (W, D, $) {
    'use strict';

	W.$main = W.$main || {};

	$(document).ready(function() {
		$main.ui.pageLoad();
		$main.event.setUIEvent();
	});

	$main.ui = {
		/**
		 * @name         : pageLoad
		 * @description  : 최초 페이지 로드 시
		 * @date         : 2023. 06. 05.
		 * @author	     : 김형진
		 */
		pageLoad : function() {
			// host url에 따른 로그인 처리
			var hostName = location.hostname;
//			if (hostName == "localhost") {
			if (mode == "dev") {
//				$("#loginForm").attr("action", contextPath + "/ma/ttLogin"); // 개발용
				$("#loginForm").attr("action", contextPath + "/ma/ssoLogin");
			} else {
				$('#loginForm').attr("action", "https://rims.kotsa.or.kr/sso/CreateRequestAuth.jsp");
			}
			
			var userId = getCookie('userId');
			var rememberMe = getCookie('remember_id');
			
			if (rememberMe === 'true') {
			    $('#remember_id').prop('checked', true);
			    $('#userId').val(userId);
			}
			
			$('#remember_id').change(function() {
			    if ($(this).is(':checked')) {
			        var userId = $('#userId').val();
			        setCookie('userId', userId, 30); // 30일 동안 쿠키 저장
			        setCookie('remember_id', 'true', 30);
			    } else {
			        setCookie('userId', '', -1); // 쿠키 만료
			        setCookie('remember_id', 'false', 30);
			    }
			});
			
			  // 아이디 필드 변경 시 쿠키에 저장
			$('#userId').change(function() {
			    if ($('#remember_id').is(':checked')) {
			        setCookie('userId', $(this).val(), 30);
			    }
		    });
		}
	}


	// 쿠키 설정 함수
	function setCookie(name, value, days) {
	    var expires = "";
	    if (days) {
		    var date = new Date();
		    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		    expires = "; expires=" + date.toUTCString();
	    }
	    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
	}
	
	// 쿠키 가져오기 함수
	function getCookie(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	    	var c = ca[i];
	    	while (c.charAt(0)==' ') c = c.substring(1,c.length);
	    	if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	  	}
	    return null;
	}
	
	$main.event = {
		/**
		 *
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date         : 2023. 06. 05.
		 * @author	     : 김형진
		 */
		setUIEvent : function() {
			// 로그인 버튼 클릭 (SSO)
			$("#loginBtn").on("click", function() {
				$main.event.login();
			});

			// 엔터로 로그인 요청
			var input = document.getElementById('userPw');
			input.addEventListener('keydown', function(event) {
			  if (event.key === "Enter") {
			    $main.event.login();
			  }
			});
		},

		login : function() {

	        if($("#userId").val() == ""){
	            alert("아이디를 입력하세요.");
	            return false;
	        }
	        if($("#userPw").val() == ""){
	            alert("비밀번호를 입력하세요.");
	            return false;
	        }

        	$('#loginForm').submit();

		},
	};

}(window, document, jQuery));