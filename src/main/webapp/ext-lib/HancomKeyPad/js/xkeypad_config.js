var g_XKBasePath = window.location.protocol + "//" + window.location.host + "/ext-lib/HancomKeyPad";

var XKConfigPlugin = {
	version						: "1.0.0.4", // WARNING! Do not change "version" property, without ActiveX client version update.
	server						: window.location.protocol + "//" + window.location.host + "/xkservice",
	contextRoot					: g_XKBasePath + "/js",
	imgRoot						: g_XKBasePath + "/img",
	cssPath						: g_XKBasePath + "/css/xkp_plugin.css",
	logoImgPath					: g_XKBasePath + "/img/logo_white.png",
	buttonImgPath				: g_XKBasePath + "/img/button.png",
	bannerText					: "[HancomKeypad] 화면캡쳐 공격을 방어하기 위해 가상커서가 랜덤하게 배치됩니다.",
	invalidSessionErrorMessage	: "보안세션이 만료되었습니다. 키패드를 갱신 하세요.",
	functionKeyButtonStyle		: "text", // "symbol"
	maxInputSize				: 56,
	useCloseFocusOut			: true
};

var XKConfigDesktop = {
	server					: window.location.protocol + "//" + window.location.host + "/xkscriptservice",
	contextRoot				: g_XKBasePath + "/js",
	imgRoot					: g_XKBasePath + "/img",
	cssPath					: g_XKBasePath + "/css/xkp_plugin.css",
	logoImgPath				: g_XKBasePath + "/img/logo_white.png",
	buttonImgPath			: g_XKBasePath + "/img/button.png",
	functionKeyButtonStyle	: "text", // "symbol"
	maxInputSize			: 56,
	textInputView			: 0,
	sessionValidTime		: 300,
	enableSessionTime		: false,
	useCloseFocusOut		: true,
	useTabIndexFocus : false,
	focusDelayTime : 100, //300, 500, ...
	langs: {
		kor: { // default
			bannerText : "[HancomKeypad] 화면캡쳐 공격을 방어하기 위해 가상커서가 랜덤하게 배치됩니다.",
			sessionTimeInfoText: "초 후에 보안세션이 만료됩니다.",
			sessionTimeExpireText: "보안세션이 만료되었습니다.",
			invalidSessionErrorMessage : "보안세션이 만료되었습니다. 키패드를 갱신 하세요."
		},
		eng: {
			bannerText : "[HancomKeypad] Virtual cursors are randomly placed to defend screen capture attacks.",
			sessionTimeInfoText: " seconds left until the security session expires.",
			sessionTimeExpireText: "Security session has expired.",
			invalidSessionErrorMessage : "Security session has expired. Please refresh your keypad."
		}
	},
};

var XKConfigHTML5 = {
	contextRoot					: g_XKBasePath + "/js",
	imgRoot						: g_XKBasePath + "/img",
	cssPath						: g_XKBasePath + "/css/xkp_html5.css",
	logoImgPath					: g_XKBasePath + "/img/logo_white_html.png",
	buttonImgPath				: g_XKBasePath + "/img/button.png",
	bannerText					: "[HancomKeypad] 화면캡쳐 공격을 방어하기 위해 가상커서가 랜덤하게 배치됩니다.",
	invalidSessionErrorMessage	: "보안세션이 만료되었습니다. 키패드 갱신을 위해 재배열을 클릭해주세요.",
	functionKeyButtonStyle		: "text", // "symbol"
	maxInputSize				: 56,
	sessionValidTime			: 300,
	useCloseFocusOut			: true
};

// for Mobile Web
var XKConfigMobile = {
        version						: "1.0.5.1",
        server						: window.location.protocol + "//" + window.location.host + "/xkscriptservice",
        contextRoot					: g_XKBasePath + "/js",
        cssPath						: g_XKBasePath + "/css/xkp_mobile.css",
        logoImgPath					: g_XKBasePath + "/img/logo.png",
        inputObjectBackgroundColor	: "#E4E4E4",
        inputObjectBorderStyle		: "1px solid #9E9E9E",
        invalidSessionErrorMessage	: "보안세션이 만료되었습니다.\n'확인'을 누르면 키패드가 갱신 됩니다.",
        invalidSessionAutoRefresh	: true,
        enableAccessibility			: false,
        useCustomAlert				: false,
        functionKeyButtonStyle		: "text", // "symbol"
        maxInputSize				: 56,
        textInputView				: 0,
        touchOption					: 0, //0:touchstart 1:touchend
		useCloseFocusOut : true
};
