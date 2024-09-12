(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

	W.$contactlessVfc = W.$contactlessVfc || {};

	$(document).ready(function() {
		//$contactlessVfc.ui.pageLoad();		//최초 페이지 로드 시
		$contactlessVfc.event.setUIEvent();
	});


	$contactlessVfc.ui = {
		pageLoad : function() {
		},
		
		search: function(element){
			$('#rentInfo01').hide();
			$('#rentInfoNotice').hide();
			$('#rentInfo02').show();
			$('#clVfcInfo').show();
			$('#clVfcBtn').show();
			$('#rentInfoTitle').text("대여정보");
			$('#carNum').val(element[0].vhclRegNo);
			$('#clVfcStartDate').val(element[0].rentBgngDt);
			$('#clVfcEndDate').val(element[0].rentEndDt);
		},

	};
	
	
	$contactlessVfc.event = {
		setUIEvent : function() {
			$('.rentInfoNo_btn').on('click', function(){
				var param = {};
				param.rentNo = $('#rentInfoNo').val();
				ajax(true, contextPath+'/vfc/contactlessVfc/selectRentInfo', 'body', '처리중입니다.', param, function (data) {
					console.log(data);
					if(data.length<=0){
						alert("잘못된 대여정보일련번호입니다. 다시 입력해주세요.")
					}else{
						$contactlessVfc.ui.search(data);
					}
				});
				
			});
		}
		
	}
	

}(window, document, jQuery));