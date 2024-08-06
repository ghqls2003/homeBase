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

