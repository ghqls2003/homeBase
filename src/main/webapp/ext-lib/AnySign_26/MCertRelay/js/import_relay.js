/*******************************************************************************
 * Common Setting 
 *******************************************************************************/
var gLoadingImg_path = AnySign.mBasePath + "/../MCertRelay/img/loader.gif"
var XW_CERT_LOCATION_LOCALSTORAGE  = "2000";

/*******************************************************************************
 * Common function 
 *******************************************************************************/
function _alert(message, okCallback){
	if (AnySign.mLanguage == "ko-KR")
		okText = "확인";
	else
		okText = "Confirm";

	if( typeof(okCallback)=="function" ){
		window._modalOkCallback = okCallback;
	} else {
		window._modalOkCallback = null;
	}

	message = message.replace(/\n/gi, "<br/>");
	message = message.replace(/\\n/gi, "<br/>");
	message = message.replace(/\r\n/gi, "<br/>");


	var modalHTML = '\
					<div id="_commonModal" class="modal t2" tabindex="0" role="dialog">\
					<div class="modal-wrap">\
					<div class="md-header">\
					<button type="button" class="btn-close md-close">close</button>\
					</div>\
					<div class="md-body">\
					<p></p>\
					</div>\
					<div class="md-footer">\
					<div class="btn-wrap">\
					<a class="btn-sub md-close" href="javascript:void(0);">'+okText+'</a>\
					</div>\
					</div>\
					</div>\
					</div>\
					';


	var $modal = $(modalHTML);

	$modal.find("div.md-body > p").html(message);

	var $prevAlert = $("#_commonModal");
	if( $prevAlert.length>0 ) {
		$prevAlert.remove();
	}

	$("body").append($modal);
	$("#_commonModal").popup();

	window.$modalDef = $.Deferred();
	return window.$modalDef.promise();
}

function _modalCallbackBind(ok, cancel){
	if( typeof(ok)=="function" ){
		window._modalOkCallback = ok;
	} 
	if( typeof(cancel)=="function" ){
		window._modalCancelCallback = cancel;
	} 
}

function _modalOK(){
	if(window._modalOkCallback){
		window._modalOkCallback();
		_modalCallbackEmpty()
	} 
	$("div#_commonModal").hide();
	if($('.modal.active').length > 0 || $('.layer-pop.active').length > 0){
		$("div.dimmed").css("z-index", "995");
	} else {
		$("div.dimmed").remove();
	}
	window.$modalDef.resolve();
}

/*** popup ***/
(function (w, $) {
	var pluginName = 'popup';
	function Plugin(element, options){
		this.element = element;
		this.$element = $(element);
		this.settings = $.extend( {}, this.defaults, options );
		this.init();
		this.setEvent();
	}
	Plugin.prototype = {	
		defaults : { 
			modalClose : '.md-close', 
			dimmed : true, 
			dimOpacity : .8, 
			clickDimmed : false,
			func : null
		}, 
		init: function(){
			this.detect = { 
				$doc : $(document), 
				$win : $(window), 
				$html : $('html'),
				$body : $('body')
			}; 
			this.$modalId = $(this.element).attr('id');
			this.$modalClose = this.$element.find(this.settings.modalClose);
			this.$mLink = $('.modal-popup[data-popup="#' + this.$modalId + '"]');

			if(!$(this.element).hasClass('full')){
				if($(this.element).width() %2){
					$(this.element).css('width', $(this.element).width() + 1);
				}
				if($(this.element).height() %2){
					$(this.element).css({
						'height' : $(this.element).height() + 1,
						'max-height' : $(this.element).height() + 1,
					});
					$(this.element).find('modal-body').css({
						'height' : $(this.element).find('modal-body').height() + 1,
						'max-height' : $(this.element).find('modal-body').height() + 1,
					});
				} else {
					$(this.element).css({
						'height' : $(this.element).height(),
						'max-height' : $(this.element).height(),
					});
				}
			}
		}, setEvent: function(){
			var _self = this;
			var scrollTop = $(window).scrollTop();
			this.$modalClose.on('click', function(e) {
				_self.settings.fade || $(_self.$targetData).hasClass('fade') ? _self._modalFadeOut() : _self._modalHide();
			   	_self.$mLink.length >= 1 ? _self.$mLink.focus() : _self.detect.$body.focus();
				var $modal = $(this).parents("div.modal");
				var $btnWrap = $modal.find("div.btn-wrap");
				if( $btnWrap.hasClass("col2") ) { 
					var isCancelBtn = false;
					if( $(this).prop("tagName").toUpperCase()=="BUTTON" ) { 
						isCancelBtn = true;
					} else if($btnWrap.has(e.target).length > 0 && $btnWrap.children("a").index(e.target) == 0){
						isCancelBtn = true;
					}

					if(isCancelBtn){
						_modalCancel()
					} else {
						_modalOK();
					}
				} else {
					_modalOK();
				}
				if($('.modal.active').length >= 1 || $('.layer-pop.active').length >= 1){
					return false;
				} else {
					$('body').removeClass('lock-scroll');
					$('body .wrap').css('margin-top', 0);
					$(document).scrollTop(scrollTop);
				}
		 	});
		},
		_modalShow : function() {
			$(this.element).addClass('active').show();
			if($('.modal.active').length > 1){
				$(this.element).css('z-index', '1000');
			}
			this._focusIn();  
			this.settings.dimmed && this._setDimmed();
			this._dimShow();

			if($(this.element).hasClass('slider')){
				var mdWrap = $(this.element).find('.slider-wrap'),
					mw_w = $(this.element).find('.slider-wrap').width(),
					mb_w = $(this.element).find('.slider-wrap').children('.list-wrap').width(),
					slidebar = $(this.element).find('.slidebar'),
					sBar = slidebar.find('.bar');
				sBar.css('width', (mw_w * slidebar.width() / mb_w));

				mdWrap.scroll(function(){
					var scrollLeft = mdWrap.scrollLeft(),
						sWidth = slidebar.width() - sBar.width(),
						mWidth = mb_w - mw_w;
					sBar.css('left', scrollLeft * (sWidth / mWidth));
				});
			}
			
			/** tab **/
			if($(this.element).find('.nav-tab')){
				$('.line').each(function(){
					if($(this).parents('.nav-tab').hasClass('flex')){
						if($(this).parents('.nav-tab').hasClass('flex-1')){
							$(this).css('width', '100%');
						} else {
							$(this).css('width', $(this).prev('span').width());
						}
					}
				});
			}
		},
		_modalHide : function() { 
			$(this.element).removeClass('active').hide(); 
			this._dimHide();
			this._focusOut(); 
		}, 
		_modalFadeOut : function() { 
			$(this.element).fadeOut(this.config.fadeSpeed); 
			this._dimFadeOut(); 
			this._focusOut();
		}, 
		_focusIn : function() { 
			$(this.element).attr('tabindex', 0).focus(); 
		}, 
		_focusOut : function() { 
			$(this.element).attr('tabindex', -1); 
		}, 
		_setDimmed : function() { 
			this.$dimLayer = $('.dimmed');
			var dimLayerConfig = { 
				'display' : 'none', 
				'position' : 'fixed', 
				'left' : 0, 
				'right' : 0, 
				'top' : 0, 
				'bottom' : 0, 
				'background' : '#000', 
				'z-index' : 995
			};
			if(this.$dimLayer.length < 1){
				this.detect.$body.append('<div class="dimmed"></div>'); 
				this.$dimLayer.css(dimLayerConfig).css({opacity : this.settings.dimOpacity}); 
			} else {
				this.$dimLayer.css('z-index', '999');
			}
		}, 
		_dimFadeIn : function () { 
			this.settings.dimmed && this.$dimLayer.fadeIn(); 
		},
		_dimFadeOut : function () { 
			if($('.modal.active').length > 0){
				this.$dimLayer.css('z-index', '995');
			} else {
				this.settings.dimmed && this.$dimLayer.fadeOut();
			} 
		}, 
		_dimShow : function () { 
			this.settings.dimmed && this.$dimLayer.show(); 
		}, 
		_dimHide : function () { 
			if($('.modal.active').length > 0 || $('.layer-pop.active').length > 0){
				this.$dimLayer.css('z-index', '995');
			} else {
				this.settings.dimmed && this.$dimLayer && this.$dimLayer.hide(); 
			}
		}
	};
	$[pluginName] = $.fn[pluginName] = function(options){
		if(!options){
			options = {};
		}

		this.each(function(){
			if(!$.data(this, "plugin_" + pluginName)){
				$.data(this, "plugin_" + pluginName, new Plugin(this, options));
			}
			var $p = $.data(this, "plugin_" + pluginName);
			scrollTop = $(window).scrollTop();
			if(options && options.action==="close"){
				$p._modalHide();
			} else {
				$p._modalShow();
				if(options){
					_modalCallbackBind(options.ok, options.cancel);
				}
				if($('.modal.active').length <= 1){
					$('body').addClass('lock-scroll');
					$('body .wrap').css('margin-top', -scrollTop);
				}
			}
		});

		window.$modalDef = $.Deferred();
		return $modalDef.promise();
	};
}(window, jQuery));

function LoadingWithMask(path) {
	var maskHeight = $(document).height();
	var maskWidth  = window.document.body.clientWidth;

	var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
	var loadingImg = "<img id='loadingImg' src='"+ path +"' style='position: absolute; top: 15%; left: 50%; transform: translateX(-50%)'/>";

	$('body').append(loadingImg);
	$('body').append(mask)

	$('#mask').css({
		'width' : maskWidth,
		'height': maskHeight,
		'opacity' :'0.3'
	});

	$('#mask').show();
}

function CloseLoadingWithMask() {
	 $('#mask, #loadingImg').hide();
     $('#mask, #loadingImg').empty(); 
}

function createRandomAuth () {
	var aNumber = new Array();
	var cn = 0;

	create = function () {
		return parseInt((window.crypto || window.msCrypto).getRandomValues(new Uint32Array(1)) % 9999);
	}

	while (aNumber.length < 3) {
		var n = create();
		if (n.toString().length != 4)
			continue;
		if (aNumber.indexOf(n) < 0)
			aNumber.push(n);
	}

	return aNumber;
}

/*******************************************************************************
 * import cert relay -setting 
 *******************************************************************************/
var gImportCert_callback = function () {
	window.close();
};
/*******************************************************************************
 * import cert relay -language
 *******************************************************************************/
 var _CERTRELAY_LETTER_TITLE_IMPORT =
 {
	 "ko-KR": "인증서 가져오기",
	 "en-US": "Certificate Import"
 };
var _CERTRELAY_LETTER_AUTH_CODE =
{
	"ko-KR": "인증 번호",
	"en-US": "Auth Code"
};
var _CERTRELAY_LETTER_TITLE_FIRST_AUTH_NUM =
{
	"ko-KR": "인증 번호 첫번째 자리",
	"en-US": "Input First Auth Code"
};
var _CERTRELAY_LETTER_TITLE_SECOND_AUTH_NUM =
{
	"ko-KR": "인증 번호 두번째 자리",
	"en-US": "Input Second Auth Code"
};
var _CERTRELAY_LETTER_TITLE_THIRD_AUTH_NUM =
{
	"ko-KR": "인증 번호 세번째 자리",
	"en-US": "Input Third Auth Code"
};
var _CERTRELAY_LETTER_TITLE_FIRST_AUTH_NUM_INPUT =
{
	"ko-KR": "첫번째 4자리 인증 번호",
	"en-US": "First 4-digit auth code"
};
var _CERTRELAY_LETTER_TITLE_SECOND_AUTH_NUM_INPUT =
{
	"ko-KR": "두번째 4자리 인증 번호",
	"en-US": "Second 4-digit auth code"
};
var _CERTRELAY_LETTER_TITLE_THIRD_AUTH_NUM_INPUT =
{
	"ko-KR": "세번째 4자리 인증 번호",
	"en-US": "Third 4-digit auth code"
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
	"ko-KR": "1. 인증서를 이동시킬 브라우저 또는 PC에서 '인증서 내보내기'를 수행합니다.",
	"en-US": "1. In the browser or PC where you want to move the certificate, perform a 'export certificate'."
};
var _CERTRELAY_LETTER_GUIDE_CONTENT_3 =
{
	"ko-KR": "2. 화면에 표시된 인증번호를 입력 후 가져오기를 완료합니다.",
	"en-US": "2. Enter the auth code displayed on the screen and complete the import."
};
var _CERTRELAY_LETTER_OPEN =
{
	"ko-KR": "열기",
	"en-US": "Open"
};
var _CERTRELAY_LETTER_CLOSE =
{
	"ko-KR": "닫기",
	"en-US": "Close"
};
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
var _CERTRELAY_ALERT_FIRST_BLANK_CODE =
{
	"ko-KR": "첫번째 인증 번호 개수가 잘못되었습니다.",
	"en-US": "The number of the first auth code is incorrect."
};
var _CERTRELAY_ALERT_SECOND_BLANK_CODE =
{
	"ko-KR": "두번째 인증 번호 개수가 잘못되었습니다.",
	"en-US": "The number of the second auth code is incorrect."
};
var _CERTRELAY_ALERT_THIRD_BLANK_CODE =
{
	"ko-KR": "세번째 인증 번호 개수가 잘못되었습니다.",
	"en-US": "The number of the third auth code is incorrect."
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
<div class="asl-cert-pop asl-common">\
	<div class="main-div">\
		<button type="button" class="close-panel" onClick="window.close()" title="'+_CERTRELAY_LETTER_CLOSE[AnySign.mLanguage]+'"></button>\
		<div id="asl-certListArea">\
			<div class="head-line">\
				<h3>'+_CERTRELAY_LETTER_TITLE_IMPORT[AnySign.mLanguage]+'</h3>\
			</div>\
		</div>\
	</div>\
</div>\
<div id="authcodeArea">\
	<div style="text-align:center;margin:0 0 1.6rem"><h3>'+_CERTRELAY_LETTER_AUTH_CODE[AnySign.mLanguage]+'</h3></div>\
	<div style="text-align:center">\
		<input class="input-auth" type="tel" id="auth1" name="auth1" maxlength="4" title="'+_CERTRELAY_LETTER_TITLE_FIRST_AUTH_NUM_INPUT[AnySign.mLanguage]+'">\
			<span class="line">-</span>\
		<input class="input-auth" type="tel" id="auth2" name="auth2" maxlength="4" title="'+_CERTRELAY_LETTER_TITLE_SECOND_AUTH_NUM_INPUT[AnySign.mLanguage]+'">\
			<span class="line">-</span>\
		<input class="input-auth" type="tel" id="auth3" name="auth3" maxlength="4" title="'+_CERTRELAY_LETTER_TITLE_THIRD_AUTH_NUM_INPUT[AnySign.mLanguage]+'">\
	</div>\
	<div class="agree-all">\
		<div class="list-wrap agree-wrap accordion-wrap">\
			<ul class="ul-accordion">\
				<li class="accordion-list agree-list">\
					<p class="certNumGuide">'+_CERTRELAY_LETTER_AUTH_CODE_GUIDE[AnySign.mLanguage]+'\
						<i class="blt"></i>\
					</p>\
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
		// var aLength = $(this).val().length;
		// if (aLength == 4) {
		// 	var aId = $(this).attr('id');
		// 	var aIdx = Number(aId.charAt(aId.length-1)) + 1;

		// 	var element = $("#auth" + aIdx);
		// 	if (element)
		// 		element.focus()
		// };
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

		if (auth_code1.length == 0 && auth_code2.length == 0 && auth_code3.length == 0) {
			_alert(_CERTRELAY_ALERT_BLANK_CODE[AnySign.mLanguage]);
			return;
		}

		if (auth_code1.length < 4) {
			_alert(_CERTRELAY_ALERT_FIRST_BLANK_CODE[AnySign.mLanguage]);
			return;
		}
		else if (auth_code2.length < 4) {
			_alert(_CERTRELAY_ALERT_SECOND_BLANK_CODE[AnySign.mLanguage]);
			return;
		}
		else if (auth_code3.length < 4) {
			_alert(_CERTRELAY_ALERT_THIRD_BLANK_CODE[AnySign.mLanguage]);
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
			{
				if (AnySign.mEnableAuthCodeForImportCertRelay == true)
					_alert(XCrypto.getLastErrMsg()).then(gImportCert_callback);
				else
					_alert(XCrypto.getLastErrMsg());
			}
				
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

	if (AnySign.mEnableAuthCodeForImportCertRelay == true)
	{
		aAuthCode = createRandomAuth();

		LoadingWithMask(gLoadingImg_path);

		_cb_registerAuthCodeForImportCertRelay = function (aResult) {

			var errCode = XCrypto.getLastErrCode();

			CloseLoadingWithMask();
			
			if (errCode != 0)
			{
				$("#auth1").val("");
				$("#auth2").val("");
				$("#auth3").val("");
				_alert(XCrypto.getLastErrMsg()).then(gImportCert_callback);
			}
			else
			{
				$("#auth1").val(aAuthCode[0]);
				$("#auth2").val(aAuthCode[1]);
				$("#auth3").val(aAuthCode[2]);
			}

			$("#auth1").prop('readonly', true);
			$("#auth2").prop('readonly', true);
			$("#auth3").prop('readonly', true);

			aAuthCode.splice(0, aAuthCode.length);
			return;
		};
	
		XCrypto.registerAuthCodeForImportCertRelay(AnySign.mCertRelayFromBrowserServerUrl,
												aAuthCode[0].toString() + aAuthCode[1].toString() + aAuthCode[2].toString(),
												AnySign.mWithCredentialsForCORS,
												 _cb_registerAuthCodeForImportCertRelay);
	}
} else {
	alert('XCrypto not exist');
}
