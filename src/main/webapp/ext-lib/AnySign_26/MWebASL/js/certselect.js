(function(window) {
	var MWebASLType = "certselect";
	var TRANSKEY_MOBILE_CONFIG = {
		enable: AnySign.mTransKeyMobileEnable
	};
	
	var XECUREKEYPAD_CONFIG = {
		enable: AnySign.mXecureKeyPadMobileEnable,
		handleridx: 1,
		maxInputSize: 30,
		width: 100,
		viewType: 'half',
		numberKeyRowCount: 2,
		closeDelay: 0,
		hasPressEffect: true,
		position: {top:10, left:null},
		isE2E: false,
		onlyMobile: true,
		autoKeyResize: true
	};

	var ZINDEX_CERTPOP = 1000;
	var ZINDEX_LOADINGWRAP = 20000;
	var ZINDEX_OCCUIPOPTRAY = 21000000;

	var SECUREINPUT_NATIVE = "0";
	var SECUREINPUT_XKPHTML5 = "13";
	var SECUREINPUT_TRANSKEY_MOBILE = "19";

	var CERT_LOCATION_LOCALSTORAGE = 2000;

	var locale = {};
	locale._CERTRELAY_LETTER_TITLE_FIRST_AUTH_NUM =
	{
		"ko-KR": "인증 번호 첫번째 자리",
		"en-US": "Input First Auth Code"
	};
	locale._CERTRELAY_LETTER_TITLE_SECOND_AUTH_NUM =
	{
		"ko-KR": "인증 번호 두번째 자리",
		"en-US": "Input Second Auth Code"
	};
	locale._CERTRELAY_LETTER_TITLE_THIRD_AUTH_NUM =
	{
		"ko-KR": "인증 번호 세번째 자리",
		"en-US": "Input Third Auth Code"
	};
	locale._CERTRELAY_LETTER_TITLE_FIRST_AUTH_NUM_INPUT =
	{
		"ko-KR": "첫번째 4자리 인증 번호",
		"en-US": "First 4-digit auth code"
	};
	locale._CERTRELAY_LETTER_TITLE_SECOND_AUTH_NUM_INPUT =
	{
		"ko-KR": "두번째 4자리 인증 번호",
		"en-US": "Second 4-digit auth code"
	};
	locale._CERTRELAY_LETTER_TITLE_THIRD_AUTH_NUM_INPUT =
	{
		"ko-KR": "세번째 4자리 인증 번호",
		"en-US": "Third 4-digit auth code"
	};
	locale._CERTRELAY_LETTER_TITLE_CLOSE =
	{
		"ko-KR": "닫기",
		"en-US": "Close"
	};
	locale._CERTRELAY_LETTER_TITLE_CERTILIST =
	{
		"ko-KR": "인증서",
		"en-US": "Certificate"
	};
	locale._CERTRELAY_LETTER_EXPIRE_DATE =
	{
		"ko-KR": "만료일이 %s일 남았습니다",
		"en-US": "You have %s days left to expire."
	};
	locale._CERTRELAY_LETTER_CERTIFICATE_NOT_EXIST =
	{
		"ko-KR": "등록된 브라우저인증서가 없습니다.",
		"en-US": "There is no registered browser certificate."
	};
	locale._CERTRELAY_LETTER_CERTIFICATE_EXPIRY_DATE =
	{
		"ko-KR": "만료일 : ",
		"en-US": "Expiry date : "
	};
	locale._CERTRELAY_LETTER_CERTIFICATE_SOURCE =
	{
		"ko-KR": "출처 : ",
		"en-US": "Source : "
	};
	locale._CERTRELAY_LETTER_TITLE_CERTKEYWORD =
	{
		"ko-KR": "인증서 암호",
		"en-US": "Certificate Password"
	};
	locale._CERTRELAY_LETTER_CERTKEYWORD_INPUT_GUIDE =
	{
		"ko-KR": "인증서암호를 입력하세요",
		"en-US": "Input certificate password"
	};
	locale._CERTRELAY_LETTER_OK =
	{
		"ko-KR": "확인",
		"en-US": "OK"
	};
	locale._CERTRELAY_LETTER_CANCEL = 
	{
		"ko-KR": "취소",
		"en-US": "Cancel"
	};
	locale._CERTRELAY_LETTER_AUTH_CODE =
	{
		"ko-KR": "인증번호",
		"en-US": "AuthCode"
	};
	locale._CERTRELAY_LETTER_AUTH_CODE_GUIDE =
	{
		"ko-KR": "인증번호 이용방법",
		"en-US": "Auth Code Usage"
	};
	locale._CERTRELAY_LETTER_GUIDE_CONTENT_1 =
	{
		"ko-KR": "[브라우저 인증서 복사]",
		"en-US": "[Browser Certificate Copy]"
	};
	locale._CERTRELAY_LETTER_GUIDE_CONTENT_2 =
	{
		"ko-KR": "1. 인증서를 이동시킬 브라우저 또는 PC에서 '인증서 내보내기'를 수행합니다.",
		"en-US": "1. In the browser or PC where you want to move the certificate, perform a 'export certificate'."
	};
	locale._CERTRELAY_LETTER_GUIDE_CONTENT_3 =
	{
		"ko-KR": "2. 화면에 표시된 인증번호를 입력 후 가져오기를 완료합니다.",
		"en-US": "2. Enter the auth code displayed on the screen and complete the import."
	};
	locale._CERTRELAY_LETTER_TITLE_LOGIN =
	{
		"ko-KR": "암호 입력",
		"en-US": "Input password"
	};
	locale._CERTRELAY_ALERT_ENTER_KEYWORD =
	{
		"ko-KR": "현재 인증서 암호를 입력해주세요.",
		"en-US": "Please enter your current certificate password."
	};
	locale._CERTRELAY_ALERT_KEYWORD_COUNT_OVER =
	{
		"ko-KR": "인증서 비밀번호 오류가 %s회 발생하였습니다. (" + AnySign.mLimitedTrial + "회제한)", 
		"en-US": "Certificate password error occurred % times. (" + AnySign.mLimitedTrial + "times limit)"
	};
	locale._CERTRELAY_LETTER_OPEN =
	{
		"ko-KR": "열기",
		"en-US": "열기"
	};
	locale._CERTRELAY_LETTER_IMPORT =
	{
		"ko-KR": "가져오기",
		"en-US": "Import"
	};
	locale._CERTRELAY_ALERT_BLANK_CODE =
	{
		"ko-KR": "인증번호를 입력하세요.",
		"en-US": "Please, Enter the auth code"
	};
	locale._CERTRELAY_ALERT_FIRST_BLANK_CODE =
	{
		"ko-KR": "첫번째 인증 번호 개수가 잘못되었습니다.",
		"en-US": "The number of the first auth code is incorrect."
	};
	locale._CERTRELAY_ALERT_SECOND_BLANK_CODE =
	{
		"ko-KR": "두번째 인증 번호 개수가 잘못되었습니다.",
		"en-US": "The number of the second auth code is incorrect."
	};
	locale._CERTRELAY_ALERT_THIRD_BLANK_CODE =
	{
		"ko-KR": "세번째 인증 번호 개수가 잘못되었습니다.",
		"en-US": "The number of the third auth code is incorrect."
	};
	locale._CERTRELAY_ALERT_IMPORT_COMPLETE =
	{
		"ko-KR": "브라우저 인증서 가져오기를 완료하였습니다.",
		"en-US": "You have completed importing a browser certificate."
	};
	locale._CERTRELAY_ALERT_DELETE_CERT =
	{
		"ko-KR": "유효기간이 지난 인증서입니다. 삭제하시겠습니까?",
		"en-US": "This certificate is out of date. Do you want to delete?"
	};
	locale._CERTRELAY_ALERT_DELETE_CERT_OK =
	{
		"ko-KR": "인증서가 삭제되었습니다.",
		"en-US": "The certificate has been deleted."
	};

	function Sandbox() {
		var args = Array.prototype.slice.call(arguments);
		var callback = args.pop();
		var modules = (args[0] && typeof args[0] === "string") ? args : args[0];
		var i;

		if(!(this instanceof Sandbox)){
			return new Sandbox(modules, callback);
		}

		this.xkeypad = XECUREKEYPAD_CONFIG;
		this.tkeymobile = TRANSKEY_MOBILE_CONFIG;
		this.locale = locale;
		this.cert = {};

		var length = modules.length;
		for(i = 0; i < length; i+=1) {
			Sandbox.modules[modules[i]](this);
		}
		
		callback(this);
	}

	Sandbox.prototype = {
		name: "AnySignLite for Mobile Web",
		version: "1.0",
		setLicense: function() {
		}
	};

	Sandbox.modules = {};
	Sandbox.modules.dom = function(common) {
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
					if (common.enableOpenCert()) $(".asl-cert-pop").css('z-index', ZINDEX_CERTPOP); 
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
						$("#hancomwith-div").parent().append('<div class="dimmed"></div>');
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

		function _modalCallbackBind(ok, cancel){
			if( typeof(ok)=="function" ){
				window._modalOkCallback = ok;
			} 
			if( typeof(cancel)=="function" ){
				window._modalCancelCallback = cancel;
			} 
		}


		function _modalCancel(){
			if(window._modalCancelCallback){
				window._modalCancelCallback();
				_modalCallbackEmpty()
			} 
			$("div#_commonModal").hide();
			if($('.modal.active').length > 0 || $('.layer-pop.active').length > 0){
				$("div.dimmed").css("z-index", "995");
			} else {
				$("div.dimmed").remove();
			}
			window.$modalDef.reject();
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

		common.replaceAll = function (targetStr, searchStr, replaceStr) {
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

		function toTimeObject (time) {
			var year  = time.substr(0,4);
			var month = time.substr(4,2) - 1; // 1월=0,12월=11
			var day   = time.substr(6,2);
			var hour  = time.substr(8,2);
			var min   = time.substr(10,2);

			return new Date(year,month,day,hour,min);
		};

		common.getDayInterval = function (time1, time2) {
			var date1 = toTimeObject(time1);
			var date2 = toTimeObject(time2);
			var day   = 1000 * 3600 * 24; //24시간

			return parseInt((date2 - date1) / day, 10);
		};

		common.getCurrentDateTime = function () {
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
		};

		common.alert = function (message, okCallback) {
			var okText, cancelText, normal = true;
			if (AnySign.mLanguage == "ko-KR")
				okText = "확인";
			else
				okText = "Confirm";

			if (AnySign.mLanguage == "ko-KR")
				cancelText = "취소";
			else
				cancelText = "Cancel";

			if( typeof(okCallback)=="function" ){
				window._modalOkCallback = okCallback;
			} else {
				window._modalOkCallback = null;
			}

			if (message == common.locale._CERTRELAY_ALERT_DELETE_CERT[AnySign.mLanguage])
				normal = false;

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
							';

			if (normal) {
				modalHTML += '\
							 <div class="btn-wrap">\
							 <a class="btn-sub md-close" href="javascript:void(0);">'+okText+'</a>\
							 </div>\
							 </div>\
							 </div>\
							 </div>\
							 ';
			} else {
				modalHTML += '\
							 <div class="btn-wrap col2">\
							 <a class="btn-sub md-close" href="javascript:void(0);">'+cancelText+'</a>\
							 <a class="btn-sub md-close" href="javascript:void(0);">'+okText+'</a>\
							 </div>\
							 </div>\
							 </div>\
							 </div>\
							 ';
			}

			var $modal = $(modalHTML);

			$modal.find("div.md-body > p").html(message);

			var $prevAlert = $("#_commonModal");
			if( $prevAlert.length>0 ) {
				$prevAlert.remove();
			}

			if (common.enableOpenCert()) $(".asl-cert-pop").css('z-index', ZINDEX_OCCUIPOPTRAY+1); 
			$("#hancomwith-div").parent().append($modal);
			$("#_commonModal").popup();

			window.$modalDef = $.Deferred();
			return window.$modalDef.promise();
		};

		common.loadingWithMask = function (type) {
			if( $("div#asl-loading-wrap").is(":hidden") ){
				$("div#asl-loading-wrap").show();
			} else {
				var maskHtml = '\
						   <div id="asl-loading-wrap" class="asl-loading-wrap">\
							   <div class="asl-loading">\
								   <p id="asl-loading-wrap-cont"></p>\
							   </div>\
							</div>\
							';

				$('body').append(maskHtml);
			}
			
			var openCertEnable = common.enableOpenCert();
			var zIndex;
			if (type == 'sign' && openCertEnable)
				zIndex = ZINDEX_OCCUIPOPTRAY + 1;
			else
				zIndex = ZINDEX_LOADINGWRAP;

			$("div#asl-loading-wrap").css('z-index', zIndex);	
		};

		common.closeLoadingWithMask = function() {
			if ($("#asl-loading-wrap").length) 
				$("div#asl-loading-wrap").hide();
		};

		common.inputKeyHandler = function (element) {
			if (XECUREKEYPAD_CONFIG.enable) 
			{
				if (!common.xkModule)
					common.xkModule = [];

				var aName = 'xk-pad' + element.attr('id') + XECUREKEYPAD_CONFIG.handleridx;

				if ($('#' + aName).length)
					return common.InputHandlerOld;

				var aXKModule = new XKModule();
				common.xkModule.push(aXKModule);

				var form = document.xkf;
				var inputPreviewList = document.querySelectorAll('.keypad-preview li');


				var aRet = aXKModule.initialize({
					name               : aName,
					editBox            : element[0],
					keyType            : 'qwertysmart',
					maxInputSize       : XECUREKEYPAD_CONFIG.maxInputSize,
					width              : XECUREKEYPAD_CONFIG.width,
					position           : XECUREKEYPAD_CONFIG.position,
					viewType           : XECUREKEYPAD_CONFIG.viewType, 
					numberKeyRowCount  : XECUREKEYPAD_CONFIG.numberKeyRowCount,
					closeDelay         : XECUREKEYPAD_CONFIG.closeDelay,
					autoKeyResize      : XECUREKEYPAD_CONFIG.autoKeyResize,
					isE2E              : XECUREKEYPAD_CONFIG.isE2E,
					onlyMobile		   : XECUREKEYPAD_CONFIG.onlyMobile,
					hasPressEffect	   : XECUREKEYPAD_CONFIG.hasPressEffect,
					onInputChange      : function (newLength) {
						if(newLength === XECUREKEYPAD_CONFIG.maxInputSize && aXKModule.isOpend()) {
							aXKModule.close();
						}
					},
					onKeypadClose      : function () {
					},
				});

				element.attr('readonly', true);
			} 
			else if (TRANSKEY_MOBILE_CONFIG.enable)
			{
				var aInputElement = document.getElementById("aslpwdPwd");
				
				aInputElement.setAttribute("data-tk-kbdType", "qwerty");
				aInputElement.setAttribute("data-tk-bottom", true);
				
				mtk_useButton = false;
				mtk_useTranskey = true;
				
				aInputElement.onclick = function() {
					 
					mtk.onKeyboard(this);
				};				
				
				initmTranskey();
			}

			return {
				getValue: function () {
					var aType;
					if (XECUREKEYPAD_CONFIG.enable)
						aType = Number(SECUREINPUT_XKPHTML5);
					else if (TRANSKEY_MOBILE_CONFIG.enable)
						aType = Number(SECUREINPUT_TRANSKEY_MOBILE);
					else
						aType = SECUREINPUT_NATIVE;

					var aResult;
					if (aType == SECUREINPUT_XKPHTML5) {
						return {type: aType, keypad: aXKModule};
					} else if (aType == SECUREINPUT_TRANSKEY_MOBILE) {
						mtk.crtPublicKey="MIIBCgKCAQEAwWmijy+IsrsM34E6ixbRWZln7ZEnsIFg7ey9wjBlXwn816iKXHVhdr6LIkl4Ks/FY2T/DFJ+Kltw7AICsBTNDLnNZz7nWWVQlq86IJq5ejkrZR88BtQ4aPRshkL8l+DH1Qf4a1A7r/HbGfo/Ad80ns4Z9Z4T5oywX9YMsF2QBAMh+ORE04nwWzkFhrjPkYUiM2sJpWrvJO6FOoidLkCMq8jVu+axhsx6LAraO13F67Ui9NlAydCHtBybZavcfnbhJSUs4QwVfeks58o1+QHLA/hZG4/XbUKWyVmZBK7tt/ZeZuXOtvZVljU3rmjvEb4+FON2kwoplq8iM7hRxFLbFQIDAQAB";
						aResult = transkey["aslpwdPwd"].getCipherData(new GenKey().tk_getrnd_int(), 'pkc');
					} else {
						aResult = element.val();
					}
					
					return aType + "$" + aResult;
				},
				clear: function () {
					if (XECUREKEYPAD_CONFIG.enable) {
						if (aXKModule.isOpend())
							aXKModule.close();
					} else if (TRANSKEY_MOBILE_CONFIG.enable) {
						var aInputElement = document.getElementById("aslpwdPwd");
						if (aInputElement != null) {
							if (transkey[aInputElement.id] != null)
								mtk.remove(aInputElement);
						}
					}
					
					element.val("");
				}
			}
		};

		common.event = {};
		common.event.focus_pwdPwd = function (e) {
			common.InputHandlerOld = new common.inputKeyHandler($(this));
			if (XECUREKEYPAD_CONFIG.enable) {
				var zIndex = 50995;
				if (common.enableOpenCert()) {
					zIndex = $(".occui_pop_tray").css('z-index');
					if (!zIndex) zIndex = $(".occui_pop_tray2").css('z-index');
				}
				$("#xk-padaslpwdPwd" + XECUREKEYPAD_CONFIG.handleridx).css('z-index', zIndex);
			}
		};
		common.event.keypress_pwdPwd = function (e) {
			if (XECUREKEYPAD_CONFIG.enable)
				return;

			e = e || window.event;
			var keyCode = e.which || e.keyCode;

			if (keyCode == 13) {
				MWebASL.verifyCertPwd();
			}
		};
		common.event.click_MWebASLBtn = function(e) {
			var expireDay = $(this).find("input[name=aslExpireDay]").val();
			if(expireDay < 0){
				common.delete( $(this) );
				return;
			}
			XCrypto.SetCloudTrayView(false);
			$(".asl-buttonWrapper").hide();
			common.select( $(this) );
		};
		common.event.keyup_inputauth = function(e) {
			$(this).val($(this).val().replace(/[^0-9]/g,""));
			// var aLength = $(this).val().length;
			// 인증번호 4자리 채워지면 다음 포커싱
			// if (aLength == 4) {
				// var aId = $(this).attr('id');
				// var aIdx = Number(aId.charAt(aId.length-1)) + 1;

				// var element = $("#aslauth" + aIdx);
				// if (element)
				// 	element.focus()
			// }
		};
		common.event.click_closepanel = function(e) {
			common.close();
		};
	};

	/***********************************************************************
	 *
	 *	인증서 리스트 다이얼로그
	 *
	 ***********************************************************************/
	Sandbox.modules.MWebASL = function(common) {
		var MWebASLHtml = '\
		<form name="xkf">\
			<button type="button" class="close-panel" title="'+common.locale._CERTRELAY_LETTER_TITLE_CLOSE[AnySign.mLanguage]+'"></button>\
			<div id="asl-certListArea" class="list-wrap cert-wrap">\
			</div>\
			<div id="asl-titleArea" style="display:none">\
				<div class="head-line">\
					<h3>'+common.locale._CERTRELAY_LETTER_TITLE_LOGIN[AnySign.mLanguage]+'</h3>\
				</div>\
				<div id="asl-passwdArea" style="display:none">\
					<p>'+common.locale._CERTRELAY_LETTER_TITLE_CERTKEYWORD[AnySign.mLanguage]+'</p>\
					<div class="input-wrap pd-0">\
						<label for="aslpwdPwd" class="lb-only">'+common.locale._CERTRELAY_LETTER_TITLE_CERTKEYWORD[AnySign.mLanguage]+'</label>\
						<input type="password" name="aslpwdPwd" id="aslpwdPwd" class="text secuKey" placeholder="'+common.locale._CERTRELAY_LETTER_CERTKEYWORD_INPUT_GUIDE[AnySign.mLanguage]+'">\
					</div>\
					<div class="btn-wrap col2 mg-t15">\
						<a class="btn-sub" href="javascript:MWebASL.cancel();">'+common.locale._CERTRELAY_LETTER_CANCEL[AnySign.mLanguage]+'</a>\
						<a class="btn-sub" href="javascript:MWebASL.verifyCertPwd();">'+common.locale._CERTRELAY_LETTER_OK[AnySign.mLanguage]+'</a>\
					</div>\
				</div>\
			</div>\
			<div id="asl-authcodeArea" style="display:none">\
				<div class="head-line">\
					<h3>'+common.locale._CERTRELAY_LETTER_AUTH_CODE[AnySign.mLanguage]+'</h3>\
				</div>\
				<div class="pa-autharea">\
					<div class="align-center">\
						<input class="input-auth" type="tel" id="aslauth1" name="aslauth1" maxlength="4" title="'+common.locale._CERTRELAY_LETTER_TITLE_FIRST_AUTH_NUM_INPUT[AnySign.mLanguage]+'">\
						<span class="line">-</span>\
						<input class="input-auth" type="tel" id="aslauth2" name="aslauth2" maxlength="4" title="'+common.locale._CERTRELAY_LETTER_TITLE_SECOND_AUTH_NUM_INPUT[AnySign.mLanguage]+'">\
						<span class="line">-</span>\
						<input class="input-auth" type="tel" id="aslauth3" name="aslauth3" maxlength="4" title="'+common.locale._CERTRELAY_LETTER_TITLE_THIRD_AUTH_NUM_INPUT[AnySign.mLanguage]+'">\
					</div>\
					<div class="agree-all">\
						<div class="list-wrap agree-wrap accordion-wrap">\
							<ul class="ul-accordion">\
								<li class="accordion-list agree-list">\
									<p class="certNumGuide">'+common.locale._CERTRELAY_LETTER_AUTH_CODE_GUIDE[AnySign.mLanguage]+'\
										<i class="blt"></i>\
									</p>\
									<div class="explain" style="display:block">\
										<dl>\
											<dt>'+common.locale._CERTRELAY_LETTER_GUIDE_CONTENT_1[AnySign.mLanguage]+'</dt>\
											<dd><p>'+common.locale._CERTRELAY_LETTER_GUIDE_CONTENT_2[AnySign.mLanguage]+'</p></dd>\
											<dd><p>'+common.locale._CERTRELAY_LETTER_GUIDE_CONTENT_3[AnySign.mLanguage]+'</p></dd>\
										</dl>\
									</div>\
								</li>\
							</ul>\
						</div>\
					</div>\
					<div class="btn-wrap col2 mg-t15">\
						<a class="btn-sub" href="javascript:MWebASL.cancel();">'+common.locale._CERTRELAY_LETTER_CANCEL[AnySign.mLanguage]+'</a>\
						<a class="btn-sub" href="javascript:MWebASL.import();">'+common.locale._CERTRELAY_LETTER_IMPORT[AnySign.mLanguage]+'</a>\
					</div>\
				</div>\
			</div>\
		</form>\
		';

		function createRandomAuth () {
			var aNumber = new Array();
			var cn = 0;
		
			create = function () {
				return parseInt((window.crypto || window.msCrypto).getRandomValues(new Uint16Array(1)) % 9999);
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

		$("#hancomwith-div").html(MWebASLHtml);

		common.setEvent = function (type) {
			if (type == "on") {
				$("a.MWebASLBtn").on("click", common.event.click_MWebASLBtn);
				$("#aslpwdPwd").on("focus", common.event.focus_pwdPwd);
				$("#aslpwdPwd").on("keypress", common.event.keypress_pwdPwd);
				$("input.input-auth").on("keyup", common.event.keyup_inputauth);
				$(".close-panel").on("click", common.event.click_closepanel);
			} else if (type == "off") {
				$("#aslpwdPwd").off("focus", common.event.focus_pwdPwd);
				$("#aslpwdPwd").off("keypress", common.event.keypress_pwdPwd);
				$("a.MWebASLBtn").off("click", common.event.click_MWebASLBtn);
				$("input.input-auth").off("keyup", common.event.keyup_inputauth);
				$(".close-panel").off("click", common.event.click_closepanel);
			}
		};

		common.showPCImport = function ()
		{
			$("#asl-passwdArea").hide();
			$("#asl-titleArea").hide();
			$("#asl-authcodeArea").show();
			$("#asl-certListArea").hide();
			$(".asl-buttonWrapper").hide();

			XCrypto.SetCloudTrayView(false);
			
			if (AnySign.mEnableAuthCodeForImportCertRelay == true)
			{
				aAuthCode = createRandomAuth();

				common.loadingWithMask('sign');

				_cb_registerAuthCodeForImportCertRelay = function (aResult) {

					var errCode = XCrypto.getLastErrCode();

					common.closeLoadingWithMask();

					returnMWebASLDialog = function() {
						$("#asl-authcodeArea").hide();

						common.show();
						$(".asl-buttonWrapper").show();
						common.setEvent("off");
						common.setEvent("on");
					};

					if (errCode != 0)
					{
						$("#aslauth1").val("");
						$("#aslauth2").val("");
						$("#aslauth3").val("");
						common.alert(XCrypto.getLastErrMsg()).then(returnMWebASLDialog);
					}
					else
					{
						$("#aslauth1").val(aAuthCode[0]);
						$("#aslauth2").val(aAuthCode[1]);
						$("#aslauth3").val(aAuthCode[2]);
					}

					$("#aslauth1").prop('readonly', true);
					$("#aslauth2").prop('readonly', true);
					$("#aslauth3").prop('readonly', true);

					aAuthCode.splice(0, aAuthCode.length);
					return;
				};
			
				XCrypto.registerAuthCodeForImportCertRelay(AnySign.mCertRelayFromBrowserServerUrl,
														aAuthCode[0].toString() + aAuthCode[1].toString() + aAuthCode[2].toString(),
														AnySign.mWithCredentialsForCORS,
														_cb_registerAuthCodeForImportCertRelay);
			}
		};

		common.attachImport = function ()
		{
			if (MWebASLType == "certdelete") return;

			var eleImport = $(".asl-buttonWrapper");
			if (eleImport.length == 0) {
				var importHtml;

				importHtml = '\
							 <div class="asl-buttonWrapper">\
							 ';

				importHtml += '\
							  <button class="btn-main" onclick="MWebASL.showPCImport();">가져오기</button>\
							  </div>\
							  ';

				$("#hancomwith-div").parent().append(importHtml);
			}

			if (common.enableOpenCert()) {
				var right = $(window).width() - $(".plus-button").width() - 16;
				$(".asl-buttonWrapper").css('right', right + 'px');
			}
		};

		common.showImport = function () {
			if (MWebASLType == "certdelete") return;

			var parentWidth = $(".asl-buttonWrapper").width();
			var	btnHtml = '\
						  <button type="button" name="asl-btn-web" class="btn-import-line btn-mg-03" onclick="MWebASL.showPCImport();">PC에서 가져오기</button>\
						  <button type="button" name="asl-btn-app" class="btn-import-line btn-mg-03">앱에서 가져오기</button>\
						  <button type="button" class="plus-button-b" onclick="MWebASL.closeImport();"></button>\
						  ';

			$(".asl-buttonWrapper").html(btnHtml);
			$(".asl-btm-buttonWrapper").html(btnHtml);

			var option = AnySign.mMobileWebImportOption;

			for(var idx in option) {
				var name = "button[name=asl-btn-" + option[idx] +"]";
				if (common.enableOpenCert()) {
					var width = -($(name).width());
					var marginRight = width + parentWidth;
					$(name).css('margin-right', marginRight + 'px');
				}
				$(name).show();
			}
		};

		common.closeImport = function () {
			if (MWebASLType == "certdelete") return;

			var btnHtml = '\
						  <button class="btn-main" onclick="MWebASL.showPCImport();">가져오기</button>\
						  ';

			$(".asl-buttonWrapper").html(btnHtml);
		};

		common.show = function (type) {
			if (type) MWebASLType = type;

			common.attachImport();

			if (document.location.protocol == "http:")
				AnySign.mOpenCertEnable = false;
			common.loadingWithMask();
			common.getCertTree();
		};

		/***********************************************************************/
		common.getCertTree = function () {
			var certType = 2;
			var searchType = 20;
			var caList = AnySign.mCAList;
			var serialList = "";
			var contentLevel = 5;

			var callback = function(aResult) {
				/* set Certificate Tree */
				var strList = "<ul>";
				if(aResult == "") {
					strList += '<li class="nodata">';
					strList += '<p></p>';
					strList += '<p class="not-exist">';
					strList += common.locale._CERTRELAY_LETTER_CERTIFICATE_NOT_EXIST[AnySign.mLanguage];
					strList += '</p></li>';
				} else {
					var arrayOfCerts = aResult.split("\t\n");
					var intArrayCount = arrayOfCerts.length - 1;

					if (intArrayCount < 1) {
						strList += '<li class="nodata">';
						strList += '<p></p>';
						strList += '<p class="not-exist">';
						strList += common.locale._CERTRELAY_LETTER_CERTIFICATE_NOT_EXIST[AnySign.mLanguage];
						strList += '</p></li>';
						return;
					}

					for (i =0 ; i<intArrayCount; i++) {
						var strOfCerts = arrayOfCerts[i];
						var arrayOfStrings = strOfCerts.split("$");
						var strDN = arrayOfStrings[2];

						var base_position = strDN.indexOf("cn="),
							next_position = strDN.indexOf(",", base_position);

						if (base_position != -1) {
							base_position += 3;
						} else {
							base_position = strDN.indexOf("ou=");
							next_position = strDN.indexOf(",", base_position);
							base_position += 3;
						}
						if (base_position == -1) {
							base_position = 0;
						}
						if (next_position == -1) {
							next_position = strDN.length;
						}

						strUserName = strDN.substring(base_position, next_position);

						if (strUserName.indexOf("(") != -1) {
							tmpUserName = strUserName.split("(");
							strUserName = tmpUserName[0];
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

						var today	= common.getCurrentDateTime().substr(0, 8); 
						var toDate	= common.replaceAll(certParam.TO, "-", ""); 

						var dayInterval		= common.getDayInterval( today, toDate ); 
						var statusClass		= ""; 
						var cloudClass		= ""; 
						var expireText		= ""; 
						if(dayInterval < 0){

							statusClass = "expire";
						} else if(dayInterval <= 30){
							statusClass	= "near";
							
							expireText = '<p class="alert"><i>!</i>';
							expireText += common.locale._CERTRELAY_LETTER_EXPIRE_DATE[AnySign.mLanguage].replace("%s", dayInterval);
							expireText += '</p>';
						}
						if(certParam.STORAGE==="OPENCERT"){
							cloudClass = "cloud";
						}

						var certLiHtml = '\
										 <li class="cert-list">\
										 <a href="javascript:void(0);" class="MWebASLBtn">\
										 <div class="cert-line">\
										 <input type="hidden" name="aslSerial" value="'+certParam.SERIAL+'" />\
										 <input type="hidden" name="aslIssuerDN" value="'+certParam.ISSUER_DN+'" />\
										 <input type="hidden" name="aslTo" value="'+toDate+'" />\
										 <input type="hidden" name="aslExpireDay" value="'+dayInterval+'" />\
										 <dl class="cert-info '+statusClass+' '+cloudClass+'">\
										 <dt>'+certParam.USER_NAME+'</dt>\
										 <dd>\
										 <p>'+certParam.USAGE+' / '+certParam.ISSUER+'</p>\
										 <p>'+common.locale._CERTRELAY_LETTER_CERTIFICATE_EXPIRY_DATE[AnySign.mLanguage]+certParam.TO+'</p>\
										 <p>'+common.locale._CERTRELAY_LETTER_CERTIFICATE_SOURCE[AnySign.mLanguage]+certParam.STORAGE+'</p>\
										 '+expireText+'\
										 </dd>\
										 </dl>\
										 </div>\
										 </a>\
										 </li>\
										 ';
						strList += certLiHtml;
					} 
				}

				strList += "</ul>";

				var certListTitle = "<div class='head-line'><h3>";
				certListTitle += common.locale._CERTRELAY_LETTER_TITLE_CERTILIST[AnySign.mLanguage];
				certListTitle += "</h3></div>";
				strList = certListTitle + strList;

				$("body").css("overflow", "hidden");

				var $certListArea = $("div#asl-certListArea");
				$certListArea.html(strList);
				$certListArea.show();

				setTimeout(function () {
					common.setEvent("on");
					common.closeLoadingWithMask();
				}, 0);
			}

			if (common.cert.serial) {
				serialList = common.cert.serial;
			}

			XCrypto.getCertTree(CERT_LOCATION_LOCALSTORAGE, certType, searchType, caList, serialList, contentLevel, callback);
		};
		/***********************************************************************/
		common.verifyCertPwd = function () {
			var prmKeyword = $("#aslpwdPwd").val();
			if (prmKeyword == "") {
				common.alert(common.locale._CERTRELAY_ALERT_ENTER_KEYWORD[AnySign.mLanguage]);
				return;
			}

			var _verifyCertPwdCallback = function(result) {

				if (result != 0) {
					common.closeLoadingWithMask();
					common.InputHandlerOld.clear();

					var _errCallback = function(){
						XCrypto.SetCloudTrayView(false);
						if(certErrorCount >= AnySign.mLimitedTrial){
							common.close();
						}
					};

					var errCode = XCrypto.getLastErrCode();
					if(errCode == "21") { 
						window.certErrorCount++;
						var message = common.locale._CERTRELAY_ALERT_KEYWORD_COUNT_OVER[AnySign.mLanguage];
						message = message.replace("%s", certErrorCount);
						common.alert(message).then(_errCallback);
						return;
					}

					common.alert("[" + errCode + "] " + XCrypto.getLastErrMsg()).then(_errCallback);
					setTimeout (function () {
						if (errCode == "2211") {
							var _height = Number($("#_commonModal").css('height').split('px')[0]) + 40;
							$("#_commonModal").css('max-height', _height + 'px');
							$("#_commonModal").css('height', _height + 'px');
						}
					},0);
				} 
				else 
				{
					if (MWebASLType == "certdelete") {
						_cb_deleteCertCallback = function () {
							var errCode = XCrypto.getLastErrCode();
							if (errCode == 0) {
								common.alert(common.locale._CERTRELAY_ALERT_DELETE_CERT_OK[AnySign.mLanguage]);
							} else {
								common.alert("[" + errCode + "] " + XCrypto.getLastErrMsg());
							}
		
							common.closeLoadingWithMask();
							common.show();
							common.setEvent("on");
							$("#asl-titleArea").hide();
						};
		
						if (!common.enableOpenCert()){
							common.loadingWithMask();
						}

						XCrypto.deleteCert (CERT_LOCATION_LOCALSTORAGE,
											2,
											MWebASL.data.prmIssuerDN,
											MWebASL.data.prmSerial,
											0,
											_cb_deleteCertCallback);
					} else {
						if (common.cert.funcName == "SignFileInfo" ||
							common.cert.funcName == "SignFileInfoWithSerial" ||
							common.cert.funcName == "SignFileInfoWithVID" ||
							common.cert.funcName == "SignFileInfoWithVID_Serial") {
							common.getSearchHashValue();
						} else {
							common.sign();
						}
					}
				}
			};

			if (common.xkeypad.enable) {
				XCrypto.setSecureInput(SECUREINPUT_XKPHTML5);
			} else if (common.tkeymobile.enable) {
				XCrypto.setSecureInput(SECUREINPUT_TRANSKEY_MOBILE);
			}else {
				XCrypto.setSecureInput(SECUREINPUT_NATIVE);
			}
			
			common.loadingWithMask('sign');

			XCrypto.verifyCertPwd (CERT_LOCATION_LOCALSTORAGE,
								   this.data.prmIssuerDN,
								   this.data.prmSerial,
								   this.InputHandlerOld.getValue(),
								   0,
								   _verifyCertPwdCallback);
		};
		/***********************************************************************/
		common.signVid = function (prmIssuerDN, prmSerial, sign) {
			var envelopIdnum_result;

			var _envelopIdNumCallback = function (result) {

				if (!result) {
					envelopIdnum_result = "";
				} else {
					envelopIdnum_result = result;
					AnySign.GetVidInfo = function (aUserCallback, aErrorCallback) {
						aUserCallback(envelopIdnum_result);
					}
				}

				common.cert.userCallback(sign);
				common.close();
			};

			XCrypto.envelopIdNum (CERT_LOCATION_LOCALSTORAGE,
								  prmIssuerDN,
								  prmSerial,
								  this.InputHandlerOld.getValue(),
								  common.cert.aIdn,
								  common.cert.svrCert,
								  0,
								  _envelopIdNumCallback);
		};
		/***********************************************************************/
		common.sign = function () {
			var prmIssuerDN = this.data.prmIssuerDN;
			var prmSerial = this.data.prmSerial;

			var _signDataCallback = function(sign) {
				common.closeLoadingWithMask();

				if(sign == "") {
					var errCode = XCrypto.getLastErrCode();
					if (errCode != 0) {
						common.alert(XCrypto.getLastErrMsg()).then(common.cancel);
						return;
					}
				}

				if (common.cert.funcName.indexOf("VID") != -1)
				{
					common.signVid(prmIssuerDN,
								prmSerial,
								sign);
					return;
				}

				common.close();

				common.cert.userCallback(sign);
			};

			if (common.cert.funcName == "SignFileInfo" ||
				common.cert.funcName == "SignFileInfoAdd" ||
				common.cert.funcName == "SignFileInfoWithSerial" ||
				common.cert.funcName == "SignFileInfoWithVID" ||
				common.cert.funcName == "SignFileInfoWithVID_Serial") {
				XCrypto.signFileInfo (CERT_LOCATION_LOCALSTORAGE,
									  prmIssuerDN,
									  prmSerial,
									  this.InputHandlerOld.getValue(),
									  common.cert.plain,
									  common.cert.option,
									  _signDataCallback);
			} else {
				XCrypto.signData (CERT_LOCATION_LOCALSTORAGE,
									  prmIssuerDN,
									  prmSerial,
									  this.InputHandlerOld.getValue(),
									  common.cert.plain,
									  common.cert.option,
									  _signDataCallback);
			}

		};
		/***********************************************************************/
		common.select = function ($this) {
			$("#asl-certListArea").css('display', 'none');
			$("#asl-passwdArea").css('display', '');
			$("#asl-titleArea").css('display', '');
			$(".asl-buttonWrapper").css('display', 'none');

			window.certErrorCount = 0;

			this.data = this.data || {};
			this.data.prmSerial = $this.find("input[name='aslSerial']").val();
			this.data.prmIssuerDN = $this.find("input[name='aslIssuerDN']").val();
			this.data.dateTime = this.data.dateTime || "/20191222142124017";
			this.data.prmKeyword = $this.find("input[name='aslpwdPwd']").val();
		};
		/***********************************************************************/
		common.import = function () {
			var auth_code1 = $("#aslauth1").val();
			var auth_code2 = $("#aslauth2").val();
			var auth_code3 = $("#aslauth3").val();

			// ALL BLANK
			if (auth_code1.length == 0 && auth_code2.length == 0 && auth_code3.length == 0) {
				common.alert(common.locale._CERTRELAY_ALERT_BLANK_CODE[AnySign.mLanguage]);
				return;
			}

			// Each Other Check
			if (auth_code1.length < 4) {
				common.alert(common.locale._CERTRELAY_ALERT_FIRST_BLANK_CODE[AnySign.mLanguage]);
				return;
			}
			else if(auth_code2.length < 4) {
				common.alert(common.locale._CERTRELAY_ALERT_SECOND_BLANK_CODE[AnySign.mLanguage]);
				return;
			}
			else if(auth_code3.length < 4) {
				common.alert(common.locale._CERTRELAY_ALERT_THIRD_BLANK_CODE[AnySign.mLanguage]);
				return;
			}

			_cb_importCertRelayToBrowser = function (result) {
				$("input#aslauth1").val("");
				$("input#aslauth2").val("");
				$("input#aslauth3").val("");

				common.closeLoadingWithMask();

				returnMWebASLDialog = function() {
					$("#asl-authcodeArea").hide();

					common.show();
					$(".asl-buttonWrapper").show();
					common.setEvent("off");
					common.setEvent("on");
				};

				var errCode = XCrypto.getLastErrCode();
				if (errCode == 0) {
					common.alert(common.locale._CERTRELAY_ALERT_IMPORT_COMPLETE[AnySign.mLanguage]).then(returnMWebASLDialog);
				} else {
					if (AnySign.mEnableAuthCodeForImportCertRelay == true)
						common.alert(XCrypto.getLastErrMsg()).then(returnMWebASLDialog);
					else
						common.alert(XCrypto.getLastErrMsg());
				}
			};

			MWebASL.closeImport();
			common.loadingWithMask();

			XCrypto.importCertRelayToBrowser(AnySign.mCertRelayFromBrowserServerUrl,
											auth_code1 + auth_code2 + auth_code3,
											AnySign.mWithCredentialsForCORS,
											_cb_importCertRelayToBrowser);

		};
		common.delete = function($this) {
			deleteCert = function () {
				_cb_deleteCertCallback = function () {
					var errCode = XCrypto.getLastErrCode();
					if (errCode == 0) {
						common.alert(common.locale._CERTRELAY_ALERT_DELETE_CERT_OK[AnySign.mLanguage]);
					} else {
						common.alert("[" + errCode + "] " + XCrypto.getLastErrMsg());
					}

					common.closeLoadingWithMask();
					common.show();
					common.setEvent("on");
				};

				if (!common.enableOpenCert())
					common.loadingWithMask();

				XCrypto.deleteCert (CERT_LOCATION_LOCALSTORAGE,
									2,
									$this.find("input[name='aslIssuerDN']").val(),
									$this.find("input[name='aslSerial']").val(),
									0,
									_cb_deleteCertCallback);
			};

			common.alert(common.locale._CERTRELAY_ALERT_DELETE_CERT[AnySign.mLanguage]).then(deleteCert);
		};
		/***********************************************************************/
		common.cancel = function () {
			$("#aslauth1").val("");
			$("#aslauth2").val("");
			$("#aslauth3").val("");
			$("input#aslpwdPwd").val("");

			$("#xk-padaslpwdPwd" + XECUREKEYPAD_CONFIG.handleridx).remove();

			$("#asl-passwdArea").hide();
			$("#asl-titleArea").hide();
			$("#asl-authcodeArea").hide();

			if (MWebASLType == "certselect") {
				$(".asl-buttonWrapper").show();
				MWebASL.closeImport();
			}

			common.show();
		};
		/***********************************************************************/
		common.close = function () {
			$("body").css("overflow", "visible");
			if (common.InputHandlerOld)
				common.InputHandlerOld.clear();
			common.setEvent("off");
			$('#hancomwith-div').parent().remove();
			XCrypto.SetCloudTrayView(false);
			
			XECUREKEYPAD_CONFIG.handleridx++;
			
			try {AnySign_cancelCallback();}catch(e) { console.log('AnySign_cancelCallback is not defined');}
		};
		/***********************************************************************/
		common.setParam = function (args) {
			common.cert.funcName = args[0];
			
			switch(common.cert.funcName) {
				case "SignDataCMS":
					common.cert.plain = args[1];
					common.cert.option = args[2];
					break;
				case "SignDataWithVID":
					common.cert.plain = args[1];
					common.cert.option = args[2];
					common.cert.aIdn = args[3];
					common.cert.svrCert = args[4];
					break;
				case "SignDataWithVID_Serial":
					common.cert.serial = args[1];
					common.cert.plain = args[2];
					common.cert.option = args[3];
					common.cert.aIdn = args[4];
					common.cert.svrCert = args[5];
					break;
				case "SignDataCMSWithSerial":
					common.cert.serial = args[1];
					common.cert.plain = args[2];
					common.cert.option = args[3];
					break;
				case "SignFileInfo":
					common.cert.fileInfo = args[1];
					common.cert.fileHash = args[2];
					common.cert.option = args[3];
					break;
				case "SignFileInfoAdd":
					common.cert.plain = args[1];
					common.cert.option = 0x00000020;
					break;
				case "SignFileInfoWithSerial":
					common.cert.serial = args[1];
					common.cert.fileInfo = args[2];
					common.cert.fileHash = args[3];
					common.cert.option = args[4];
					break;
				case "SignFileInfoWithVID":
					common.cert.fileInfo = args[1];
					common.cert.fileHash = args[2];
					common.cert.option = args[3];
					common.cert.aIdn = args[4];
					common.cert.svrCert = args[5];
					break;
				case "SignFileInfoWithVID_Serial":
					common.cert.serial = args[1];
					common.cert.fileInfo = args[2];
					common.cert.fileHash = args[3];
					common.cert.option = args[4];
					common.cert.aIdn = args[5];
					common.cert.svrCert = args[6];
					break;

			}

			common.cert.userCallback = args[args.length - 2];
			common.cert.errCallback = args[args.length - 1];
		};
		/***********************************************************************/
		common.enableOpenCert = function () {
			var enable = false;

			if (AnySign.mOpenCertEnable)
				enable = true;

			var element = $(".occui_pop_tray2");
			if (element.length)
				enable = true;

			return enable;
		};
		/***********************************************************************/
		common.getSearchHashValue = function() {
			var certType = 2;
			var searchType = 24;
			var caList = AnySign.mCAList;
			var serialList = "";
			var contentLevel = 0;
			
			var _getHashValueCallback = function (aResult) {
				var aCertInfoArray;
				var aHashAlgDescArray;
				var aHashAlg;
				var aFileHashArray;
				var aHashValueArray;
				var aFileHash = common.cert.fileHash;
				
				if (aResult == undefined || aResult == "" || aFileHash == undefined || aFileHash == "")
					return;
				
				aCertInfoArray = aResult.split("$");
				aHashAlgDescArray = aCertInfoArray[3].split("+");
				aHashAlgDescArray = aHashAlgDescArray[0].split("With");
				aHashAlg = aHashAlgDescArray[0].trim().toLowerCase();
				
				if (aHashAlg == undefined || aHashAlg == "")
					return;
				
				aFileHashArray = aFileHash.split("$");
				for (var i = 0; i < aFileHashArray.length; i++)
				{
					aHashValueArray = aFileHashArray[i].split("|");
					if (aHashValueArray.length < 2)
						break;
					
					if (aHashValueArray[0].trim().toLowerCase() == aHashAlg)
					{
						aFileHash = aHashValueArray[1];
						common.cert.plain = common.cert.fileInfo + "|" + aFileHash;
						break;
					}
				}
				
				common.sign();
			};
			
			XCrypto.getCertTree(CERT_LOCATION_LOCALSTORAGE, certType, searchType, this.data.prmIssuerDN, this.data.prmSerial, contentLevel, _getHashValueCallback);
		};
		/***********************************************************************/
	};

	window.MWebASL = Sandbox('dom', 'MWebASL', function(common) {
		XCrypto.setLicense(AnySign.mLicense);

		window.onorientationchange = function () {
			setTimeout(function() {
				MWebASL.closeImport();
				MWebASL.attachImport();
			}, 0);
		}

		$(window).on("orientationchange load resize", function () {
			setTimeout(function() {
				MWebASL.closeImport();
				MWebASL.attachImport();
			}, 0);
		});

	});
})(window);
