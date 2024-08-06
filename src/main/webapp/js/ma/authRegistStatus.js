/**
 * 권한신청현황 화면에 대한 클래스
 *
 * history : 네이버시스템(주), 1.0, 2018/10/15  초기 작성
 * author : 이광호
 * version : 1.0
 * see : jQuery 플러그인(라이브러리 모듈화), Immediately-invoked function
 *
 */
var bizrConfrim = false; //사업자 등록번호 확인 여부
(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

	W.$authRegistStatus = W.$authRegistStatus || {};

	$(document).ready(function() {

		$authRegistStatus.ui.pageLoad();		//최초 페이지 로드 시
		$authRegistStatus.event.setUIEvent();

        history.pushState(null, null, location.href);

        window.onpopstate = function(event) {

            history.go(1);

        };
});

    // jQuery custom function
    // 라이브러리를 사용하는 외부에서 접근할 수 있도록(전역함수) encapsulation
    // 객체 메소드는 jQuery.fn($.fn)으로 정의하여 사용함. jQuery.prototype 의 별칭
	$authRegistStatus.ui = {

			/**
			 * @name         : pageLoad
			 * @description  : 최초 페이지 로드 시
			 * @date         : 2018. 10. 15.
			 * @author	     : 이광호
			 */
			pageLoad : function() {

			var confmCd = $("#confmCd").val();

			if(confmCd == "03") {
				//권한 리스트 생성
				$("#authType").kendoDropDownList({
					dataTextField: "authorNm",
					dataValueField: "authorId",
					dataSource: {
						transport: {
							read: {
								type: "POST",
								contentType: "application/json; charset=utf-8",
								url: contextPath + "/cmmn/authType",
								dataType: 'json',
								beforeSend: function (xhr) {
									xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
								}
							}
						}
					},
					change: function onChange(e) {

						var value = this.value();

						//운송사업자일경우에만 사업자 등록번호 노출
						if (value == 'C') {
							$('#bizrNoTr').show();
						} else {
							$('#bizrNoTr').hide();
						}
					},
				});

				//소속 리스트 생성
				$("#belongType").kendoDropDownList({
					cascadeFrom: "authType",
					dataTextField: "authorDc",
					dataValueField: "belongId",
					autoBind: false,
					dataSource: {
						transport: {
							read: {
								type: "POST",
								contentType: "application/json; charset=utf-8",
								url: contextPath + "/cmmn/belongType",
								dataType: 'json',
								beforeSend: function (xhr) {
									xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
								}
							},
							parameterMap: function (options) {
								var values = $('#authType').data('kendoDropDownList').value();
								return JSON.stringify({
									authType: values
								});
							}
						}
					},
					change: function onChange(e) {
						var value = this.value();
						var belongType = $("#belongType").data("kendoDropDownList");

						//운송사업자의 경우 소속을 선택하지 않고 사업자등록번호 확인을 통해 입력
						if (value == 'C00') {
							belongType.readonly();
							belongType.text("");
						} else {
							belongType.readonly(false);
						}
					},
				});

				var authList = $("#authType").data("kendoDropDownList");
				var auth = $("#auth").val().substring(0, 1);

				authList.value(auth);
				authList.trigger("change");

				var belongList = $("#belongType").data("kendoDropDownList");
				var role = $("#auth").val();
				belongList.value(role);
				if (auth == 'C') {
					var psitnNm = $("#psitnNm").val();
					belongList.text(psitnNm);
				}
			}

		},
		/**
		 * @name         : bizrNoConfrim
		 * @description  : 사업자등록번호 확인
		 * @date         : 2018. 10. 08.
		 * @author	     : 이광호
		 */
		bizrNoConfrim : function() {
			var data = {};

			data.bizrNo = $("#bizrNo").val();

			ajax(true, contextPath + '/mm/bizrNoConfirm', 'body', '확인인중입니다.', data, function (data) {

				if (data != null) {
//					console.log('data == ', data);
					var belongType = $("#belongType").data("kendoDropDownList");

					if(data.isTrue == 'true'){
						belongType.text(data.cmpnyNm);
						bizrConfrim = true;
					}else{
						var dataSource = new kendo.data.DataSource({
							data: [ " " ]
						});
						belongType.text('  ');
						bizrConfrim = false;
						alert("확인되지 않는 사업자등록번호 입니다. 관리자에게 문의하세요 \n(TEL : 054-459-7864)");
					}

					belongType.readonly();

				}

			});

		},
		/**
		 * @name         : authRequest
		 * @description  : 권한 신청 등록
		 * @date         : 2018. 10. 08.
		 * @author	     : 이광호
		 */
		authRequest : function() {

			var authType = $("#authType").data("kendoDropDownList");
			var belongType = $("#belongType").data("kendoDropDownList");
			var fileReuseYN = $("#fileReuseYN").is(":checked");


			if(authType.value() == 'C'){  //운송사업자
				if (!bizrConfrim) {
					alert("사업자등록 번호가 확인되지 않았습니다.");
					$("#btnBizrNo").focus();
					return;
				}
			}

			if (!$('#file_upload_field').val()) {
				alert("증명서류 파일이 선택되지 않았습니다.");
				$("#file_upload_field").focus();
				return;
			}

			// 파일 업로드
			var formData = new FormData();
			formData.append('files', document.getElementById('file_upload_field').files[0]);

			if (confirm("재 신청 하시겠습니까?")) {
				fileAjax(contextPath + "/cmmn/fileUpload", formData, function (response) {

					var data = {};

					if (response != null) {
						data.userId = $("#userId").text();

						if(authType.value() == 'C'){  //운송사업자
							data.bizrno = $("#bizrNo").val();
							data.authorId = 'C00';
						}else{
							data.bizrno = null;
							data.authorId = belongType.value();
						}

						data.psitnNm = belongType.text();
						data.atchFileSn = response.atchFileSn;

						ajax(true, contextPath + '/mm/authRequest', 'body', '신청중입니다.', data, function (data) {

							if (data != null) {
								alert("재 신청 되었습니다.");

								window.location.href = contextPath + "/mm/authRegistStatus";
							}

						});

					}

				});
			}



		},
	};

	//이벤트 정의
	$authRegistStatus.event = {

		/**
		 *
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다.
		 * @date         : 2018. 10. 15.
		 * @author	     : 이광호
		 */
		setUIEvent : function() {
			// 사업자번호 확인 버튼
			$("#btnBizrNo").on("click", function() {
				$authRegistStatus.ui.bizrNoConfrim();
			});
			// 재신청 버튼
			$("#btnRegist").on("click", function(){
				$authRegistStatus.ui.authRequest();
			});
			// 사업자등로번호 키 이벤트auth
			$("#bizrNo").keyup(function() {
				var belongType = $("#belongType").data("kendoDropDownList");
				belongType.text('');
				bizrConfrim = false;
			});
		}
	};

}(window, document, jQuery));