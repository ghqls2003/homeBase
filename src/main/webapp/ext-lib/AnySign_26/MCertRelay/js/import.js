/*******************************************************************************
 * import cert relay -setting 
 *******************************************************************************/
var gImportCert_callback = function () {
	window.close();
};
/*******************************************************************************
 * import cert relay -language
 *******************************************************************************/
var _CERTRELAY_LETTER_AUTH_CODE =
{
	"ko-KR": "인증 번호",
	"en-US": "Auth Code"
};
var _CERTRELAY_LETTER_AUTH_CODE_GUIDE =
{
	"ko-KR": "인증번호 이용방법",
	"en-US": "Auth Code Usage"
};
var _CERTRELAY_LETTER_GUIDE_CONTENT_1 =
{
	"ko-KR": "[브라우저 인증서 복사]",
	"en-US": "[Browser Certificate Copy]"
};
var _CERTRELAY_LETTER_GUIDE_CONTENT_2 =
{
	"ko-KR": "1. 인증서를 이동시킬 브라우저에서 '인증서 내보내기'를 수행합니다.",
	"en-US": "1. In the browser where you want to move the certificate, perform a 'import certificate'."
};
var _CERTRELAY_LETTER_GUIDE_CONTENT_3 =
{
	"ko-KR": "2. 화면에 표시된 인증번호를 입력 후 가져오기를 완료합니다.",
	"en-US": "2. Enter the auth code displayed on the screen and complete the import."
};
var _CERTRELAY_LETTER_OPEN =
{
	"ko-KR": "열기",
	"en-US": "열기"
}
var _CERTRELAY_LETTER_IMPORT =
{
	"ko-KR": "가져오기",
	"en-US": "Import"
};
var _CERTRELAY_ALERT_BLANK_CODE =
{
	"ko-KR": "인증번호를 입력하세요.",
	"en-US": "Please, Enter the auth code"
};
var _CERTRELAY_ALERT_IMPORT_COMPLETE =
{
	"ko-KR": "브라우저 인증서 가져오기를 완료하였습니다.",
	"en-US": "You have completed importing a browser certificate."
};
/*******************************************************************************
 * import cert relay -html
 *******************************************************************************/
var certrelayHtml = '\
<div id="loadingImg"></div>\
<form>\
<div id="authcodeArea">\
	<div style="text-align:center;margin:0 0 1.6rem"><h3>'+_CERTRELAY_LETTER_AUTH_CODE[AnySign.mLanguage]+'</h3></div>\
	<div style="text-align:center">\
		<input class="input-auth" type="tel" id="auth1" name="auth1" maxlength="4">\
			<span class="line">-</span>\
		<input class="input-auth" type="tel" id="auth2" name="auth2" maxlength="4">\
			<span class="line">-</span>\
		<input class="input-auth" type="tel" id="auth3" name="auth3" maxlength="4">\
	</div>\
	<div class="agree-all">\
		<div class="list-wrap agree-wrap accordion-wrap">\
			<ul class="ul-accordion">\
				<li class="accordion-list agree-list">\
					<a href="#">'+_CERTRELAY_LETTER_AUTH_CODE_GUIDE[AnySign.mLanguage]+'\
						<i class="blt"></i>\
					</a>\
					<div class="term" style="display:block">\
						<dl>\
							<dt>'+_CERTRELAY_LETTER_GUIDE_CONTENT_1[AnySign.mLanguage]+'</dt>\
							<dd><p>'+_CERTRELAY_LETTER_GUIDE_CONTENT_2[AnySign.mLanguage]+'</p></dd>\
							<dd><p>'+_CERTRELAY_LETTER_GUIDE_CONTENT_3[AnySign.mLanguage]+'</p></dd>\
						</dl>\
					</div>\
				</li>\
			</ul>\
		</div>\
	</div>\
	<div class="btn-wrap mg-t20">\
		<button type="button" onclick="_cert.import();" class="btn-main">'+_CERTRELAY_LETTER_IMPORT[AnySign.mLanguage]+'</button>\
	</div>\
</div>\
</form>\
';
$("#hancomwith-div").html(certrelayHtml);
/*******************************************************************************
 * import cert relay -document on
 *******************************************************************************/
$(document).on({
	keyup: function(e) {
		$(this).val($(this).val().replace(/[^0-9]/g,""));
		var aLength = $(this).val().length;
		if (aLength == 4) {
			var aId = $(this).attr('id');
			var aIdx = Number(aId.charAt(aId.length-1)) + 1;

			var element = $("#auth" + aIdx);
			if (element)
				element.focus()
		};
	}

}, "input.input-auth");
/*******************************************************************************
 * import cert relay -core
 *******************************************************************************/
var _cert = {
	import: function () {
		var auth_code1 = $("#auth1").val();
		var auth_code2 = $("#auth2").val();
		var auth_code3 = $("#auth3").val();

		if (auth_code1.length == 0 || auth_code2.length == 0 || auth_code3.length == 0) {
			_alert(_CERTRELAY_ALERT_BLANK_CODE[AnySign.mLanguage]);
			return;
		}

		if (auth_code1.length < 4 || auth_code2.length < 4 || auth_code3.length < 4) {
			_alert(languageMap[lang.CERTRELAY_ALERT_BLANK_CODE][AnySign.mLanguage]);
			return;
		}

		_cb_importCertRelayToBrowser = function (result) {
			$("input#auth1").val("");
			$("input#auth2").val("");
			$("input#auth3").val("");

			CloseLoadingWithMask();

			var errCode = XCrypto.getLastErrCode();
			if (errCode == 0)
				_alert(_CERTRELAY_ALERT_IMPORT_COMPLETE[AnySign.mLanguage]).then(gImportCert_callback);
			else
				_alert(XCrypto.getLastErrMsg());
		};

		LoadingWithMask(gLoadingImg_path);

		XCrypto.importCertRelayToBrowser(AnySign.mCertRelayFromBrowserServerUrl,
										auth_code1 + auth_code2 + auth_code3,
										AnySign.mWithCredentialsForCORS,
										_cb_importCertRelayToBrowser);
	}
};
/*******************************************************************************
 * import cert relay -init 
 *******************************************************************************/
if (XCrypto) {
	XCrypto.setLicense(AnySign.mLicense);
} else {
	alert('XCrypto not exist');
}
