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

/*******************************************************************************
 * import cert relay -setting 
 *******************************************************************************/
var gXecureKeypad = {
	enable: AnySign.mXecureKeyPadMobileEnable,
	maxInputSize: 30,
	width: 100,
	viewType: 'half', //normal
	numberKeyRowCount: 2,
	closeDelay: 0,
	hasPressEffect: true,
	position: {top:10, left:null},
	isE2E: false,
	onlyMobile: true,
	autoKeyResize: true
};
var gTranskeyMobile = {
	enable: AnySign.mTransKeyMobileEnable
};
/*******************************************************************************
 * export cert relay -language
 *******************************************************************************/
 var _CERTRELAY_LETTER_TITLE_EXPORT =
 {
	 "ko-KR": "인증서 내보내기",
	 "en-US": "Certificate Export"
 };
var _CERTRELAY_LETTER_TITLE_CERTILIST =
{
	"ko-KR": "인증서 리스트",
	"en-US": "Certificate List"
};
var _CERTRELAY_LETTER_EXPIRE_DATE =
{
	"ko-KR": "만료일이 %s일 남았습니다",
	"en-US": "You have %s days left to expire."
};
var _CERTRELAY_LETTER_CERTIFICATE_NOT_EXIST =
{
	"ko-KR": "등록된 브라우저인증서가 없습니다.",
	"en-US": "There is no registered browser certificate."
};
var _CERTRELAY_LETTER_CERTIFICATE_EXPIRY_DATE =
{
	"ko-KR": "만료일 : ",
	"en-US": "Expiry date : "
};
var _CERTRELAY_LETTER_CERTIFICATE_SOURCE =
{
	"ko-KR": "출처 : ",
	"en-US": "Source : "
};
var _CERTRELAY_LETTER_TITLE_CERTKEYWORD =
{
	"ko-KR": "현재 인증서 암호",
	"en-US": "Certificate Password"
};
var _CERTRELAY_LETTER_CERTKEYWORD_LENGTH_GUIDE =
{
	"ko-KR": "최소 10자리 이상",
	"en-US": "10 or more digits"
};
var _CERTRELAY_LETTER_CERTKEYWORD_LENGTH_GUIDE_2 =
{
	"ko-KR": "영문+숫자+특수문자 조합 10자리 이상 입력",
	"en-US": "Enter 10 or more alphanumeric characters plus special characters"
};
var _CERTRELAY_LETTER_OK =
{
	"ko-KR": "확인",
	"en-US": "OK"
};
var _CERTRELAY_LETTER_CANCEL = 
{
	"ko-KR": "취소",
	"en-US": "Cancel"
};
var _CERTRELAY_LETTER_TITLE_EXPORT_KEYWORD =
{
	"ko-KR": "내보낼 인증서 암호",
	"en-US": "Certificate password to export"
};
var _CERTRELAY_LETTER_TITLE_EXPORT_CHANGE_KEYWORD =
{
	"ko-KR": "변경 인증서 암호",
	"en-US": "Certificate password to change"
};
var _CERTRELAY_LETTER_TITLE_EXPORT_CHANGE_CHECK_KEYWORD =
{
	"ko-KR": "변경 인증서 암호 확인",
	"en-US": "Check Certificate password to change"
};
var _CERTRELAY_LETTER_COMPLETE =
{
	"ko-KR": "마침",
	"en-US": "Complete"
};
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
	"ko-KR": "1. 인증서를 이동시킬 브라우저에서 '인증서 가져오기'를 수행합니다.",
	"en-US": "1. In the browser where you want to move the certificate, perform a 'import certificate'."
};
var _CERTRELAY_LETTER_GUIDE_CONTENT_3 =
{
	"ko-KR": "2. 화면에 표시된 인증번호를 입력 후 가져오기를 완료합니다.",
	"en-US": "2. Enter the auth code displayed on the screen and complete the import."
};
var _CERTRELAY_ALERT_NOT_SAME_KEYWORD =
{
	"ko-KR": "새 비밀번호가 일치하지 않습니다.",
	"en-US": "New passwords do not match."
};
var _CERTRELAY_ALERT_ENTER_KEYWORD =
{
	"ko-KR": "현재 인증서 암호를 입력해주세요.",
	"en-US": "Please enter your current certificate password."
};
var _CERTRELAY_ALERT_ENTER_NEW_KEYWORD =
{
	"ko-KR": "변경할 인증서 암호를 입력해주세요.",
	"en-US": "Please enter your certificate password for change."
};
var _CERTRELAY_ALERT_KEYWORD_COUNT_OVER =
{
	"ko-KR": "인증서 비밀번호 오류가 %s회 발생하였습니다. (" + AnySign.mLimitedTrial + "회제한)", 
	"en-US": "Certificate password error occurred % times. (" + AnySign.mLimitedTrial + "times limit)"
};
var _CERTRELAY_LETTER_OPEN =
{
	"ko-KR": "열기",
	"en-US": "열기"
};
var _CERTRELAY_LETTER_CLOSE =
{
	"ko-KR": "닫기",
	"en-US": "Close"
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
/*******************************************************************************
 * export cert relay -html
 *******************************************************************************/
var certrelayHtml = '\
<form name="xkf">\
	<div class="asl-cert-pop asl-common">\
		<div class="main-div">\
			<button type="button" class="close-panel" onClick="window.close()" title="'+_CERTRELAY_LETTER_CLOSE[AnySign.mLanguage]+'"></button>\
			<div id="asl-certListArea">\
				<div class="head-line">\
					<h3>'+_CERTRELAY_LETTER_TITLE_EXPORT[AnySign.mLanguage]+'</h3>\
				</div>\
			</div>\
		</div>\
	</div>\
	<div id="certListArea" class="list-wrap cert-wrap"></div>\
	<div id="passwdArea" style="display:none">\
		<div>\
			<h3>'+_CERTRELAY_LETTER_TITLE_CERTKEYWORD[AnySign.mLanguage]+'</h3>\
		</div>\
		<div class="input-wrap pd-0">\
			<label for="pwdPwd" class="sr-only">'+_CERTRELAY_LETTER_TITLE_CERTKEYWORD[AnySign.mLanguage]+'</label>\
			<input type="password" name="pwdPwd" id="pwdPwd" class="text secuKey" placeholder="'+_CERTRELAY_LETTER_CERTKEYWORD_LENGTH_GUIDE[AnySign.mLanguage]+'">\
		</div>\
		<div style="margin-top:40px">\
			<h3>'+_CERTRELAY_LETTER_TITLE_EXPORT_KEYWORD[AnySign.mLanguage]+'</h3>\
		</div>\
		<div class="input-wrap pd-0">\
		<label for="newpwdPwd" class="sr-only">'+_CERTRELAY_LETTER_TITLE_EXPORT_CHANGE_KEYWORD[AnySign.mLanguage]+'</label>\
			<input type="password" name="newpwdPwd" id="newpwdPwd" class="text secuKey" placeholder="'+_CERTRELAY_LETTER_CERTKEYWORD_LENGTH_GUIDE_2[AnySign.mLanguage]+'">\
		</div>\
		<div class="input-wrap pd-0">\
			<label for="chkpwdPwd" class="sr-only">'+_CERTRELAY_LETTER_TITLE_EXPORT_CHANGE_CHECK_KEYWORD[AnySign.mLanguage]+'</label>\
			<input type="password" name="chkpwdPwd" id="chkpwdPwd" class="text secuKey" placeholder="'+_CERTRELAY_LETTER_CERTKEYWORD_LENGTH_GUIDE_2[AnySign.mLanguage]+'">\
		</div>\
		<div class="btn-wrap col2 mg-t15">\
			<a class="btn-sub" href="javascript:_cert.cancel();">'+_CERTRELAY_LETTER_CANCEL[AnySign.mLanguage]+'</a>\
			<a class="btn-sub" href="javascript:_cert.export();">'+_CERTRELAY_LETTER_OK[AnySign.mLanguage]+'</a>\
		</div>\
	</div>\
</form>\
<div id="authcodeArea" style="display:none">\
<div style="text-align:center;margin:0 0 1.6rem"><h3>'+_CERTRELAY_LETTER_AUTH_CODE[AnySign.mLanguage]+'</h3></div>\
<div style="text-align:center">\
	<input class="input-auth" type="tel" id="auth1" name="auth1" maxlength="4" readOnly title="'+_CERTRELAY_LETTER_TITLE_FIRST_AUTH_NUM_INPUT[AnySign.mLanguage]+'">\
		<span class="line">-</span>\
	<input class="input-auth" type="tel" id="auth2" name="auth2" maxlength="4" readOnly title="'+_CERTRELAY_LETTER_TITLE_SECOND_AUTH_NUM_INPUT[AnySign.mLanguage]+'">\
		<span class="line">-</span>\
	<input class="input-auth" type="tel" id="auth3" name="auth3" maxlength="4" readOnly title="'+_CERTRELAY_LETTER_TITLE_THIRD_AUTH_NUM_INPUT[AnySign.mLanguage]+'">\
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
		</ul>\
	</div>\
	<div class="btn-wrap mg-t20">\
		<button type="button" onclick="_cert.cancel();" class="btn-main">'+_CERTRELAY_LETTER_COMPLETE[AnySign.mLanguage]+'</button>\
	</div>\
</div>\
</div>\
';
$("#hancomwith-div").html(certrelayHtml);
/*******************************************************************************
 * export cert relay -document on
 *******************************************************************************/
$(document).on({
	click: function(e) {
		var expireDay = $(this).find("input[name=prmExpireDay]").val();
		if(expireDay<0){
			return;
		}
		_cert.select( $(this) );
	}
}, "a.certSelectBtn");

$(document).on({
	keyup: function(e) {
		$(this).val($(this).val().replace(/[^0-9]/g,""));
		var aLength = $(this).val().length;
		console.log(aLength);
	}
}, "input.input-auth");

$(document).on({
	focus: function (e) {
		_cert.InputHandlerOld = new _cert.inputKeyHandler($(this));
	}
}, "#pwdPwd");

$(document).on({
	focus: function (e) {
		_cert.InputHandlerNew = new _cert.inputKeyHandler($(this));
	}
}, "#newpwdPwd");

$(document).on({
	focus: function (e) {
		_cert.InputHandlerChk = new _cert.inputKeyHandler($(this));
	}
}, "#chkpwdPwd");

/*******************************************************************************
 * export cert relay -function
 *******************************************************************************/
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

function fncGetCertTree_callback(aResult){
	_cert.setCertTree(aResult);
}

function _setOpenStorageCallback(resultCode){
	if(resultCode == "0"){
		if (typeof window.fncGetCertTree_callback === "function") {
			_cert.getCertTree();
		} else {
			CloseLoadingWithMask();
		}
	} else {
		CloseLoadingWithMask();
		_alert(XCrypto.getLastErrCode() + " : " + XCrypto.getLastErrMsg());
	}
}

function getCurrentDateTime(){
	var d = new Date();
	var year = d.getFullYear()+"";
	var month = d.getMonth()+1;
	var day = d.getDate();
	var hour = d.getHours();
	var minute = d.getMinutes();
	var second = d.getSeconds();
	var milSecond = "0";

	var addZero = function(val){
		if(val<10){
			return "0"+val;
		} else {
			return ""+val;
		}
	}

	month		= addZero(month);
	day			= addZero(day);
	hour		= addZero(hour);
	minute		= addZero(minute);
	second		= addZero(second);
	return year+month+day+hour+minute+minute+second+milSecond;
}

function toTimeObject(time) { //parseTime(time)
	// Time 스트링을 자바스크립트 Date 객체로 반환
	var year  = time.substr(0,4);
	var month = time.substr(4,2) - 1; // 1월=0,12월=11
	var day   = time.substr(6,2);
	var hour  = time.substr(8,2);
	var min   = time.substr(10,2);

	return new Date(year,month,day,hour,min);
}

function getDayInterval(time1,time2) {
	// 두 Time이 몇일 차이가 나는지?
	var date1 = toTimeObject(time1);
	var date2 = toTimeObject(time2);
	var day   = 1000 * 3600 * 24; //24시간

	return parseInt((date2 - date1) / day, 10);
}

function replaceAll(targetStr, searchStr, replaceStr) {
	var i=0;
	var j=0;
	if (targetStr == null || searchStr == null || replaceStr == null) return "";

	var tmpStr = "";
	var tlen = targetStr.length;
	var slen = searchStr.length;

	var i=0;
	var j=0;
	while (i < tlen - slen+1) {
		j = i + slen;

		if (targetStr.substring(i,j) == searchStr) {
			tmpStr += replaceStr;
			i += slen;
		} else {
			tmpStr += targetStr.substring(i, i + 1);
			i++;
		}
	}
	if(typeof targetStr == 'string'){
		tmpStr +=  targetStr.substring(i);
	}

	return tmpStr;
}
/*******************************************************************************
 * export cert relay -core
 *******************************************************************************/
var _cert = {
	getCertTree: function () {
		var media = XW_CERT_LOCATION_LOCALSTORAGE;
		var certType = "0";
		var searchType = "0"
		var caList = "";
		var serialList = "";
		var contentLevel = "5";

		var callback = function(aResult) {
			/* set Certificate Tree */
			var strList = "<ul>";
			if(aResult == "") {
				strList += '<li class="nodata"><p>';
				strList += _CERTRELAY_LETTER_CERTIFICATE_NOT_EXIST[AnySign.mLanguage];
				strList += '</p></li>';
			} else {
				var arrayOfCerts = aResult.split("\t\n");
				var intArrayCount = arrayOfCerts.length - 1;

				if (intArrayCount < 1) {
					strList += '<li class="nodata"><p>';
					strList += _CERTRELAY_LETTER_CERTIFICATE_NOT_EXIST[AnySign.mLanguage];
					strList += '</p></li>';
					return;
				}

				for (i =0 ; i<intArrayCount; i++) {
					var strOfCerts = arrayOfCerts[i];
					var arrayOfStrings = strOfCerts.split("$");
					var strDN = arrayOfStrings[2];

					var arrayDN = strDN.split("cn=");
					var strUserName = "";

					if (arrayDN.length > 1) {
						strUserName = arrayDN[1];
						arrayDN = strUserName.split("(");
						if (arrayDN.length > 0) {
							strUserName = arrayDN[0];
						}
					}

					var certParam = {
						SERIAL : arrayOfStrings[6]
									 , ISSUER_DN : arrayOfStrings[5]
									 , USER_NAME : strUserName
									 , USAGE : arrayOfStrings[1]
									 , ISSUER : arrayOfStrings[3]
									 , TO : arrayOfStrings[4]
									 , STORAGE : arrayOfStrings[7] || "LOCAL"
					}

					var today	= getCurrentDateTime().substr(0, 8); 
					var toDate	= replaceAll(certParam.TO, "-", ""); 

					var dayInterval		= getDayInterval( today, toDate ); 
					var statusClass		= ""; 
					var cloudClass		= ""; 
					var expireText		= ""; 
					if(dayInterval<0){

						statusClass = "expire";
					} else if(dayInterval<=30){

						statusClass	= "near";
						
						expireText = '<p class="alert"><i>!</i>';
						expireText += _CERTRELAY_LETTER_EXPIRE_DATE[AnySign.mLanguage].replace("%s", dayInterval);
						expireText += '</p>';
					}
					if( certParam.STORAGE==="OPENCERT" ){
						cloudClass = "cloud";
					}

					var certLiHtml = '\
									 <li>\
									 <a href="javascript:void(0);" class="certSelectBtn">\
									 <input type="hidden" name="prmSerial" value="'+certParam.SERIAL+'" />\
									 <input type="hidden" name="prmIssuerDN" value="'+certParam.ISSUER_DN+'" />\
									 <input type="hidden" name="prmTo" value="'+toDate+'" />\
									 <input type="hidden" name="prmExpireDay" value="'+dayInterval+'" />\
									 <dl class="cert-info '+statusClass+' '+cloudClass+'">\
									 <dt>'+certParam.USER_NAME+'</dt>\
									 <dd>\
									 <p>'+certParam.USAGE+' / '+certParam.ISSUER+'</p>\
									 <p>'+_CERTRELAY_LETTER_CERTIFICATE_EXPIRY_DATE[AnySign.mLanguage]+certParam.TO+'</p>\
									 <p>'+_CERTRELAY_LETTER_CERTIFICATE_SOURCE[AnySign.mLanguage]+certParam.STORAGE+'</p>\
									 '+expireText+'\
									 </dd>\
									 </dl>\
									 </a>\
									 </li>\
									 ';
					strList += certLiHtml;

				} 
			}

			strList += "</ul>";
		
			// var certListTitle = "<div style='text-align:center;border-bottom:0.5rem solid #ebeef0'><h3>";
			// certListTitle += _CERTRELAY_LETTER_TITLE_CERTILIST[AnySign.mLanguage];
			// certListTitle += "<h3></div>";
			// strList = certListTitle + strList;

			var $certListArea = $("div#certListArea");
			$certListArea.html(strList);
			$certListArea.show();

			CloseLoadingWithMask();
		}

		XCrypto.getCertTree(media, certType, searchType, caList, serialList, contentLevel, callback);
	},
	select: function ($this) {
		$("#certListArea").css('display', 'none');
		$("#passwdArea").css('display', '');

		window.certErrorCount = 0;

		_cert.data = _cert.data || {};
		_cert.data.prmSerial = $this.find("input[name='prmSerial']").val();
		_cert.data.prmIssuerDN = $this.find("input[name='prmIssuerDN']").val();
		_cert.data.dateTime = _cert.data.dateTime || "/20190920142124017";
		_cert.data.prmKeyword = $this.find("input[name='pwdPwd']").val();
	}, 
	export: function () {
		var prmKeyword = $("#pwdPwd").val();
		if (prmKeyword == "") {
			_alert(_CERTRELAY_ALERT_ENTER_KEYWORD[AnySign.mLanguage]);
			return;
		}

		if ($("#newpwdPwd").val() == "" || $("#chkpwdPwd").val() == "") {
			_alert(_CERTRELAY_ALERT_ENTER_NEW_KEYWORD[AnySign.mLanguage]);
			return;
		}

		if ($("#newpwdPwd").val() != $("#chkpwdPwd").val()) {
			_alert(_CERTRELAY_ALERT_NOT_SAME_KEYWORD[AnySign.mLanguage]);
			$("input#newpwdPwd").val("");
			$("input#chkpwdPwd").val("");
			return;
		}

		var _signDataCallback = function(sign) {
			if(sign=="") {
				var _errCallback = function(){
					$("input#pwdPwd").val("");
				};

				var errCode = XCrypto.getLastErrCode();
				if(errCode == "453182725") {
					window.certErrorCount++;
					if(certErrorCount >= AnySign.mLimitedTrial){
						_cert.cancel();
					}
					var message = _CERTRELAY_ALERT_KEYWORD_COUNT_OVER[AnySign.mLanguage];
					message = message.replace("%s", certErrorCount);
					_alert(message).then(_errCallback);
					return;
				}
				_alert("[" + errCode + "] " + XCrypto.getLastErrMsg()).then(_errCallback);
			} else {
				var authCode = createRandomAuth();
				var aTotalAuthCode = "";
				authCode.forEach (function (num) {
					aTotalAuthCode += num;
				});

				var _cb_exportCertRelayFromBrowser = function () {
					CloseLoadingWithMask();

					_cert.InputHandlerOld.clear("pwdPwd");
					_cert.InputHandlerNew.clear("newpwdPwd");
					_cert.InputHandlerChk.clear("chkpwdPwd");

					var errCode = XCrypto.getLastErrCode();
					if (errCode != 0) {
						_alert(XCrypto.getLastErrMsg()).then(_cert.cancel);
						return;
					}

					$("#auth1").val(authCode[0]);	
					$("#auth2").val(authCode[1]);	
					$("#auth3").val(authCode[2]);	

					$("#passwdArea").hide();
					$("#authcodeArea").show();
				};

				XCrypto.exportCertRelayFromBrowser (AnySign.mCertRelayFromBrowserServerUrl,
													aTotalAuthCode,
													_cert.data.prmIssuerDN,
													_cert.data.prmSerial,
													_cert.InputHandlerOld.getValue("pwdPwd"),
													_cert.InputHandlerNew.getValue("newpwdPwd"),
													AnySign.mWithCredentialsForCORS,
													_cb_exportCertRelayFromBrowser);

				LoadingWithMask(gLoadingImg_path);
			}
		} 

		if (gXecureKeypad.enable)
			XCrypto.setSecureInput("13");
		else if (gTranskeyMobile.enable)
			XCrypto.setSecureInput("19");
		else
			XCrypto.setSecureInput("0");

		XCrypto.signData(XW_CERT_LOCATION_LOCALSTORAGE,
						 _cert.data.prmIssuerDN,
						 _cert.data.prmSerial,
						 _cert.InputHandlerOld.getValue("pwdPwd"),
						 _cert.data.dataTime,
						 1048576,
						 _signDataCallback);
	},
	setOpenCert: function () {
		var aOpenCertEventListener = function (listener) {
			if(listener == "connect" ||
			   listener == "disconnect" ||
			   listener == "setPKCS12" ||
			   listener == "removeCertFromTray")
			{
				LoadingWithMask(gLoadingImg_path);
				_cert.getCertTree();
			}
		};

		LoadingWithMask(gLoadingImg_path);

		if (AnySign.mOpenCertEnable)
			XCrypto.setOpenStorage(AnySign.mOpenApi, [AnySign.mOpenCertJS, AnySign.mOpenCertRelayJS], aOpenCertEventListener, null, _setOpenStorageCallback);
		else
			_cert.getCertTree();
	},
	setTranskey: function () {
		$('#pwdPwd').attr('data-tk-kbdType','qwerty');
		$('#pwdPwd').attr('data-tk-bottom','true');
		$('#pwdPwd').attr('onfocus','mtk.onKeyboard(this)');

		$('#newpwdPwd').attr('data-tk-kbdType','qwerty');
		$('#newpwdPwd').attr('data-tk-bottom','true');
		$('#newpwdPwd').attr('onfocus','mtk.onKeyboard(this)');

		$('#chkpwdPwd').attr('data-tk-kbdType','qwerty');
		$('#chkpwdPwd').attr('data-tk-bottom','true');
		$('#chkpwdPwd').attr('onfocus','mtk.onKeyboard(this)');
		
		initmTranskey();
	},
	inputKeyHandler: function (aElement) {

		if (gXecureKeypad.enable) 
		{
			if (!_cert.xkModule)
				_cert.xkModule = [];

			var aXKModule = new XKModule();
			_cert.xkModule.push(aXKModule);

			var form = document.xkf;
			var inputPreviewList = document.querySelectorAll('.keypad-preview li');

			var aName = 'xk-pad' + aElement.attr('id');

			var aRet = aXKModule.initialize({
				name               : aName,
				editBox            : aElement[0],
				keyType            : 'qwertysmart',
				maxInputSize       : gXecureKeypad.maxInputSize,
				width              : gXecureKeypad.width,
				position           : gXecureKeypad.position,
				viewType           : gXecureKeypad.viewType, 
				numberKeyRowCount  : gXecureKeypad.numberKeyRowCount,
				closeDelay         : gXecureKeypad.closeDelay,
				autoKeyResize      : gXecureKeypad.autoKeyResize,
				isE2E              : gXecureKeypad.isE2E,
				onlyMobile		   : gXecureKeypad.onlyMobile,
				hasPressEffect	   : gXecureKeypad.hasPressEffect,
				onInputChange      : function (newLength) {
					if(newLength === gXecureKeypad.maxInputSize && aXKModule.isOpend()) {
						aXKModule.close();
					}
				},
				onKeypadClose      : function () {
				},
			});

			aElement.attr('readonly', true);
		} 

		return {
			getValue: function (aId) {
				var aType;
				if (gXecureKeypad.enable)
					aType = 13;
				else if (gTranskeyMobile.enable)
					aType = 19;
				else
					aType = 0;

				var aResult;
				if (aType == 13) {
					return {type: aType, keypad: aXKModule};
				} else if (aType == 19) {
					mtk.crtPublicKey="MIIBCgKCAQEAwWmijy+IsrsM34E6ixbRWZln7ZEnsIFg7ey9wjBlXwn816iKXHVhdr6LIkl4Ks/FY2T/DFJ+Kltw7AICsBTNDLnNZz7nWWVQlq86IJq5ejkrZR88BtQ4aPRshkL8l+DH1Qf4a1A7r/HbGfo/Ad80ns4Z9Z4T5oywX9YMsF2QBAMh+ORE04nwWzkFhrjPkYUiM2sJpWrvJO6FOoidLkCMq8jVu+axhsx6LAraO13F67Ui9NlAydCHtBybZavcfnbhJSUs4QwVfeks58o1+QHLA/hZG4/XbUKWyVmZBK7tt/ZeZuXOtvZVljU3rmjvEb4+FON2kwoplq8iM7hRxFLbFQIDAQAB";
					aResult = transkey[aId].getCipherData(new GenKey().tk_getrnd_int(), 'pkc');
				} else {
					aResult = aElement.val();
				}
				return aType + "$" + aResult;
			},
			clear: function (aId) {
				if (gXecureKeypad.enable) {
					aXKModule.close();
				} else if (gTranskeyMobile.enable) {
					var aInputElement = document.getElementById("aId");
					if (aInputElement != null) {
						if (transkey[aInputElement.id] != null)
							mtk.remove(aInputElement);
					}
				} else {
					aElement.val("");
				}
			}
		}
	},
	cancel: function() {
		$("input#pwdPwd").val("");
		$("input#newpwdPwd").val("");
		$("input#chkpwdPwd").val("");

		if (_cert.xkModule) {
			_cert.xkModule.forEach(function (ele) {
				ele.close();
			});
		}

		$("#passwdArea").hide();
		$("#authcodeArea").hide();
		$("#certListArea").show();
	}
};

/*******************************************************************************
 * export cert relay -init 
 *******************************************************************************/
if (XCrypto) {
	XCrypto.setLicense(AnySign.mLicense);
	_cert.setOpenCert();
	
	if (gTranskeyMobile.enable) {
		_cert.setTranskey();
	}
} else {
	_alert('XCrypto not exist');
}
