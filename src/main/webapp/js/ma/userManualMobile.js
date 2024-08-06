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

	W.$userManualMobile = W.$userManualMobile || {};

	$(document).ready(function() {
		$userManualMobile.ui.pageLoad();		//최초 페이지 로드 시
		$userManualMobile.event.setUIEvent();
	});


	$userManualMobile.ui = {

		pageLoad: function() {
			$userManualMobile.event.swiperEvent();
			$('#tabBtn01').addClass('active');
		},


	};

	//이벤트 정의
	$userManualMobile.event = {
		setUIEvent: function() {
			$("#moveWeb").on("click", function() {
				window.location.href = `${contextPath}` + '/ma/userManual'
			});

			document.getElementById("Shortcuts02").addEventListener("click", function() {
				let app = document.createElement('a');
				app.href = contextPath + '/DQVuserguide/usermanualmobi.pdf';
				app.download = '운전자격확인시스템_사용자지침서_대여사업자용_모바일.pdf';
				document.body.appendChild(app);
				app.click();
				document.body.removeChild(app);
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

				direction: 'horizontal', // 방향을 수평으로 변경
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
				swiper.slideTo(2); // 3 번째 슬라이드로 이동
			});
			tabBtn02.on('click', function() {
				swiper.slideTo(11); // 12 번째 슬라이드로 이동
			});
			tabBtn03.on('click', function() {
				swiper.slideTo(12); // 13 번째 슬라이드로 이동
			});
			tabBtn04.on('click', function() {
				swiper.slideTo(13); // 14 번째 슬라이드로 이동
			});
			swiper.on('slideChange', function() {
				if (swiper.activeIndex >= 0 && swiper.activeIndex <= 10) {
					$('#tabBtn01').addClass('active');
				} else {
					$('#tabBtn01').removeClass('active');
				}
				if (swiper.activeIndex === 11) {
					$('#tabBtn02').addClass('active');
				} else {
					$('#tabBtn02').removeClass('active');
				}
				if (swiper.activeIndex === 12) {
					$('#tabBtn03').addClass('active');
				} else {
					$('#tabBtn03').removeClass('active');
				}
				if (swiper.activeIndex >= 13 && swiper.activeIndex <= 15) {
					$('#tabBtn04').addClass('active');
				} else {
					$('#tabBtn04').removeClass('active');
				}
			});
		}

	};

}(window, document, jQuery));