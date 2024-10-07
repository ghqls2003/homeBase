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

	W.$apiManual = W.$apiManual || {};

	$(document).ready(function() {
		$apiManual.ui.pageLoad();		//최초 페이지 로드 시
		$apiManual.event.setUIEvent();
	});


	$apiManual.ui = {

		pageLoad: function() {
			$apiManual.event.swiperEvent();
			$('#tabBtn01').addClass('active')
//			$('#Web').hide();
//			$('#ForCidoWeb').show();
		},


	};

	//이벤트 정의
	$apiManual.event = {
		setUIEvent: function() {

			document.getElementById("Shortcuts01").addEventListener("click", function() {
				let web = document.createElement('a');
				web.href = contextPath + '/DQVuserguide/apiManual.pdf';
				web.download = '운전자격확인시스템_운전자격검증_통신규약_v1.0.pdf';
				document.body.appendChild(web);
				web.click();
				document.body.removeChild(web);
			});
//			document.getElementById("Shortcuts02").addEventListener("click", function() {
//				let web = document.createElement('a');
//				web.href = contextPath + '/DQVuserguide/운전자격확인시스템_사용자지침서_지자체용_v1.0_웹';
//				web.download = '운전자격확인시스템_사용자지침서_지자체용_v1.0_웹';
//				document.body.appendChild(web);
//				web.click();
//				document.body.removeChild(web);
//			});
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
				swiper.slideTo(1); // 2번째 슬라이드로 이동
			});
			tabBtn02.on('click', function() {
				swiper.slideTo(4); // 5 번째 슬라이드로 이동
			});
			tabBtn03.on('click', function() {
				swiper.slideTo(24); // 25 번째 슬라이드로 이동
			});
			tabBtn04.on('click', function() {
				swiper.slideTo(29); // 26 번째 슬라이드로 이동
			});
			swiper.on('slideChange', function() {
				if (swiper.activeIndex >= 0 && swiper.activeIndex <= 3) {
					$('#tabBtn01').addClass('active');
				} else {
					$('#tabBtn01').removeClass('active');
				}
				if (swiper.activeIndex >= 4 && swiper.activeIndex < 24 ) {
					$('#tabBtn02').addClass('active');
				} else {
					$('#tabBtn02').removeClass('active');
				}
				if (swiper.activeIndex >= 24 && swiper.activeIndex < 29 ) {
					$('#tabBtn03').addClass('active');
				} else {
					$('#tabBtn03').removeClass('active');
				}
				if (swiper.activeIndex >=  29) {
					$('#tabBtn04').addClass('active');
				} else {
					$('#tabBtn04').removeClass('active');
				}
			});
		},
		swiperEventForCido: function() {
			$('.manual_btn').on('click', function() {
				$('.manual_btn').removeClass('active');
				$(this).addClass('active');
			});

			const tabBtn05 = $('#tabBtn01');
			const tabBtn06 = $('#tabBtn02');
			const tabBtn07 = $('#tabBtn03');
			const tabBtn08 = $('#tabBtn04');
			const swiper2 = new Swiper('.swiper', {

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
			tabBtn05.on('click', function() {
				swiper.slideTo(2); // 3 번째 슬라이드로 이동
			});
			tabBtn06.on('click', function() {
				swiper.slideTo(14); // 13 번째 슬라이드로 이동
			});
			tabBtn07.on('click', function() {
				swiper.slideTo(15); // 14 번째 슬라이드로 이동
			});
			tabBtn08.on('click', function() {
				swiper.slideTo(16); // 17 번째 슬라이드로 이동
			});
			swiper2.on('slideChange', function() {
				if (swiper2.activeIndex >= 0 && swiper2.activeIndex <= 13) {
					$('#tabBtn05').addClass('active');
				} else {
					$('#tabBtn05').removeClass('active');
				}
				if (swiper2.activeIndex === 14) {
					$('#tabBtn06').addClass('active');
				} else {
					$('#tabBtn06').removeClass('active');
				}
				if (swiper2.activeIndex === 15) {
					$('#tabBtn07').addClass('active');
				} else {
					$('#tabBtn07').removeClass('active');
				}
				if (swiper2.activeIndex >= 17) {
					$('#tabBtn08').addClass('active');
				} else {
					$('#tabBtn08').removeClass('active');
				}
			});
		},


	};

}(window, document, jQuery));