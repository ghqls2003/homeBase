/**
 * 
 *//**
* 이용자 메뉴얼
*
* history : 네이버시스템(주), 1.0, 2023/08/21  초기 작성
* author : 김상훈
* version : 1.0
* see : jQuery 플러그인(라이브러리 모듈화), Immediately-invoked function
*
*/
(function(W, D, $) {
	'use strict';

	W.$userManual = W.$userManual || {};

	$(document).ready(function() {
		$userManual.ui.pageLoad();		//최초 페이지 로드 시
		$userManual.event.setUIEvent();
	});


	$userManual.ui = {

		pageLoad: function() {
			$userManual.event.swiperEvent();
			$('#tabBtn01').addClass('active')
		},


	};

	//이벤트 정의
	$userManual.event = {
		setUIEvent: function() {

			$("#moveMobile").on("click", function() {
				window.location.href = `${contextPath}` + '/ma/userManualMobile'
			});
			document.getElementById("Shortcuts01").addEventListener("click", function() {
				let web = document.createElement('a');
				web.href = contextPath + '/DQVuserguide/sidomanual.pdf';
				web.download = '운전자격확인시스템_사용자지침서_지자체용_v1.0_웹.pdf';
				document.body.appendChild(web);
				web.click();
				document.body.removeChild(web);
			});

		},
		swiperEvent: function() {
			$('.manual_btn').on('click', function() {
				$('.manual_btn').removeClass('active');
				$(this).addClass('active');
			});

			const tabBtn01 = $('#tabBtn01');
			const tabBtn02 = $('#tabBtn02');
			const tabBtn03 = $('#tabBtn03');
			const tabBtn04 = $('#tabBtn04');
			const swiper = new Swiper('.swiper', {

				direction: 'horizontal',
				loop: false,

				pagination: {
					el: '.swiper-pagination',
				},

				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},

				scrollbar: {
					el: '.swiper-scrollbar',
				},
			});
			tabBtn01.on('click', function() {
				swiper.slideTo(2); // 웹 서비스 가입 및 권한 신청
			});
			tabBtn02.on('click', function() {
				swiper.slideTo(11); // 대여사업자
			});
			tabBtn03.on('click', function() {
				swiper.slideTo(23); // 통계
			});
			tabBtn04.on('click', function() {
				swiper.slideTo(30); // 고객지원
			});
			swiper.on('slideChange', function() {
				if (swiper.activeIndex >= 0 && swiper.activeIndex <= 10) {
					$('#tabBtn01').addClass('active');
				} else {
					$('#tabBtn01').removeClass('active');
				}

				if (swiper.activeIndex >= 11 && swiper.activeIndex <= 22) {
					$('#tabBtn02').addClass('active');
				} else {
					$('#tabBtn02').removeClass('active');
				}

				if (swiper.activeIndex >= 23 && swiper.activeIndex <= 29) {
					$('#tabBtn03').addClass('active');
				} else {
					$('#tabBtn03').removeClass('active');
				}
				if (swiper.activeIndex >= 30) {
					$('#tabBtn04').addClass('active');
				} else {
					$('#tabBtn04').removeClass('active');
				}
			});
		},
		


	};

}(window, document, jQuery));