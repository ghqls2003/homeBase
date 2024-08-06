/*!
 * xCertshare, 1.1.0.6
 * 
 * For more information on this product, please see
 * https://www.hancomwith.com
 * 
 * Copyright (c) HANCOM WITH INC. All Rights Reserved.
 * 
 * Date: 2023-03-09
 */
var XCS_SECUREINPUT_NATIVEINPUT		= 00;
var XCS_SECUREINPUT_TRANSKEY		= 01;

var XCS_SECUREINPUT_XECUREKEYPAD 	= 04; 
var XCS_SECUREINPUT_INCA_NOS10		= 09;
var XCS_SECUREINPUT_KDFDEC    		= 10;
var XCS_SECUREINPUT_TOUCHENNXKEY	= 11;

var XCS_CERT_LOCATION_HARD			= 0;
var XCS_CERT_LOCATION_REMOVABLE		= 100;

var XecureCertShare_ERROR_30000	= "XecureCertShare 실행 실패";
var XecureCertShare_ERROR_30001	= "버전 업그레이드 필요";
var XecureCertShare_ERROR_30002	= "프로세스 실행에 필요한 정보 획득 실패";
var XecureCertShare_ERROR_30003	= "할당 가능한 포트 정보가 없음";
var XecureCertShare_ERROR_30004	= "socket listen timeout";
var XecureCertShare_ERROR_30005	= "socket listen 시 해당 프로세스 종료";

var gTarget;

var gStartTime;
var gGuideDialog = null;
var gTimeIntervalFunc;

if(window.console == undefined) console = {log:function(){}};

// error callback 을 지정해 주지 않으면 이걸 사용한다
function gErrCallback_common(aResult)
{
	var aErrMsg;
	
	if (!aResult.msg)
	{
		aErrMsg = XecureCertShare.GetErrMsg(aResult.code);
		
		if(!aErrMsg || aErrMsg == "")
		{
			aErrMsg = "Unknown Error";
		}
	}
	else
	{
		aErrMsg = aResult.msg;
	}
	
	alert("[" + aResult.code + "] " + aErrMsg);
}

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/gi, "");
};

XecureCertShareInterface = function(aSandBox)
{
	this.mSandBox = aSandBox;
};

XecureCertShareInterface.prototype.checkFunction= function (aFunctionName)
{
	var aObject;
	
	if (XecureCertShare.mPluginMode == false)
	{
		return true;
	}
	else
	{
		aObject = this.mSandBox.plugin();

		if (aFunctionName in aObject)
			return true;
		else
			return false;
	}
};

XecureCertShareInterface.prototype.XCSPCUpload = function (aServerURL)
{
	this.mSandBox.extension.doSend ("XCSPCUpload", aServerURL);
	return "";
};

XecureCertShareInterface.prototype.XCSPCDownload = function (aServerURL)
{
	this.mSandBox.extension.doSend("XCSPCDownload", aServerURL);
	return "";
};

XecureCertShareInterface.prototype.getMediaList = function (aReturnType)
{
	this.mSandBox.extension.doSend("getMediaList", aReturnType);
	return "";
};

XecureCertShareInterface.prototype.setErrorLogLevel = function ()
{
	this.mSandBox.extension.doSend("setErrorLogLevel");
	return "";
		
};

XecureCertShareInterface.prototype.getCertificateList = function (aMediaID)
{

	/************************************************************************/

	this.mSandBox.extension.doSend("getCertificateList", aMediaID);
	
	return "";
	
	/************************************************************************/

};

XecureCertShareInterface.prototype.setAuthenticateCodeAndMediaID = function (aAuthenticateCode,
																			 aMediaID)
{

	/************************************************************************/

	this.mSandBox.extension.doSend("setAuthenticateCodeAndMediaID", aAuthenticateCode, aMediaID);
	
	return "";

	/************************************************************************/

};

XecureCertShareInterface.prototype.setAuthenticateCodeAndCertificate = function (aAuthenticateCode,
																				 aMediaID,
																				 aIssuerRDN,
																				 aCertSerial,
																				 aPassword,
																				 aNewPassword)
{

	/************************************************************************/

	this.mSandBox.extension.doSend("setAuthenticateCodeAndCertificate",
									aAuthenticateCode,
									aMediaID,
									aIssuerRDN,
									aCertSerial,
									aPassword, 
									aNewPassword);

	return "";

	/************************************************************************/

};

XecureCertShareInterface.prototype.setAuthenticateCodeAndCertificateTK = function (aAuthenticateCode,
																					aMediaID,
																					aIssuerRDN,
																					aCertSerial,
																					aPassword,
																					aNewPassword,
																					aHostName,
																					aEncryptID1,
																					aEncryptID2)
{

/************************************************************************/

this.mSandBox.extension.doSend("setAuthenticateCodeAndCertificateTK",
									aAuthenticateCode,
									aMediaID,
									aIssuerRDN,
									aCertSerial,
									aPassword, 
									aNewPassword,
									aHostName,
									aEncryptID1,
									aEncryptID2);

return "";

/************************************************************************/

};

XecureCertShareInterface.prototype.setCertificate = function (aAuthenticateCodeLength,
															  aMediaID,
															  aIssuerRDN,
															  aCertSerial,
															  aPassword,
															  aNewPassword)
{

/************************************************************************/

this.mSandBox.extension.doSend("setCertificate",
								aAuthenticateCodeLength,
								aMediaID,
								aIssuerRDN,
								aCertSerial,
								aPassword, 
								aNewPassword);

return "";

/************************************************************************/

};

XecureCertShareInterface.prototype.setCertificateWithSecureInput = function (aAuthenticateCode,
																			 aMediaID,
																			 aIssuerRDN,
																			 aCertSerial,
																			 aPassword,
																			 aNewPassword)
{

/************************************************************************/

this.mSandBox.extension.doSend("setCertificateWithSecureInput",
								aAuthenticateCode,
								aMediaID,
								aIssuerRDN,
								aCertSerial,
								aPassword, 
								aNewPassword);

return "";

/************************************************************************/

};

XecureCertShareInterface.prototype.verifyPassword = function (aMediaID,
															  aIssuerRDN,
															  aCertSerial,
															  aPassword)
{

	/************************************************************************/

	this.mSandBox.extension.doSend("verifyPassword",
									aMediaID,
									aIssuerRDN,
									aCertSerial,
									aPassword);

	return "";

	/************************************************************************/

};

XecureCertShareInterface.prototype.verifyPasswordTransKey = function (aMediaID,
	aIssuerRDN,
	aCertSerial,
	aPassword,
	aHostName,
	aEncryptID)
{

/************************************************************************/
this.mSandBox.extension.doSend("verifyPasswordTransKey",
								aMediaID,
								aIssuerRDN,
								aCertSerial,
								aPassword,
								aHostName,
								aEncryptID);

	return "";

/************************************************************************/

};

XecureCertShareInterface.prototype.changePassword = function (aMediaID,
															  aIssuerRDN,
															  aCertSerial,
															  aPassword,
															  aNewPassword)
{

	/************************************************************************/

	this.mSandBox.extension.doSend("changePassword",
									aMediaID,
									aIssuerRDN,
									aCertSerial,
									aPassword,
									aNewPassword);

	return "";

	/************************************************************************/

};

XecureCertShareInterface.prototype.checkPassword = function(aNewPassword, aPasswordConfirm, aCheckPasswordConfirm)
{

	this.mSandBox.extension.doSend("checkPassword",
									aNewPassword,
									aPasswordConfirm,
									aCheckPasswordConfirm);
	return "";

};

XecureCertShareInterface.prototype.checkPasswordWithOption = function(aNewPassword, aPasswordConfirm, aCheckPasswordConfirm, aOption)
{

	this.mSandBox.extension.doSend("checkPasswordWithOption",
									aNewPassword, 
									aPasswordConfirm, 
									aCheckPasswordConfirm, 
									aOption);
	return "";

};

XecureCertShareInterface.prototype.checkPasswordTransKey = function(aNewPassword, aPasswordConfirm, aCheckPasswordConfirm, aOption, aHostName, aEncryptID1, aEncryptID2)
{

	this.mSandBox.extension.doSend("checkPasswordTransKey",
									aNewPassword, 
									aPasswordConfirm, 
									aCheckPasswordConfirm, 
									aOption,
									aHostName,
									aEncryptID1,
									aEncryptID2);
	return "";

};

XecureCertShareInterface.prototype.setErrCodeAndMsg = function ()
{
	var aResult = {};
	//var XCS_ERROR = 450000;
	var aErrMsg = "";
	var aErrCode = 0;
	
	aErrCode = this.mSandBox.extension.getLastErrCode();
	//aErrMsg = this.mSandBox.extension.getLastErrMsg();
	
	aResult.code = aErrCode;
	aResult.msg = aErrMsg;
	
	return aResult;
};


XecureCertShareInterface.prototype.XK_MakeRandomKeypadID = function ()
{
	this.mSandBox.extension.doSend("XK_MakeRandomKeypadID");

	return "";

};

XecureCertShareInterface.prototype.XK_MakeIndex = function(aKeypadID, aKeypadType)
{
	this.mSandBox.extension.doSend("XK_MakeIndex", aKeypadID, aKeypadType);

	return "";

};

XecureCertShareUnifiedPlugin = (function ()
{
// private
	var xcsObject = null;

	var aUserAgent = navigator.userAgent;

	var aBrowserName = "unknown";
	var aBrowserVersion = 0; //Rendering version

	//Check Version 
	var aRegExp;
	if (aUserAgent.indexOf("MSIE") >= 0 || aUserAgent.indexOf("Trident") >= 0)
	{
		aBrowserName = "trident";

		if(document.compatMode == "BackCompat") {
			aBrowserVersion = 5;
		} else if(document.documentMode) {
			aBrowserVersion = document.documentMode;
		} else {
			aRegExp  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		}
	}
	else if (aUserAgent.indexOf("Firefox") >= 0)
	{
		aBrowserName = "firefox";
		aRegExp  = new RegExp("Firefox\/([0-9]{1,}[\.0-9]{0,})");
	}
	else if (aUserAgent.indexOf("Chrome") >= 0)
	{
		aBrowserName = "chrome";
		aRegExp = new RegExp("Chrome\/([0-9]{1,}[\.0-9]{0,})");
	}
	else if (aUserAgent.indexOf("Safari") >= 0)
	{
		aBrowserName = "safari";
		aRegExp = new RegExp("Version\/([0-9]{1,}[\.0-9]{0,})");
	}
	else if (aUserAgent.indexOf("Opera") >= 0)
	{
		aBrowserName = "opera";
		aRegExp = new RegExp("Version\/([0-9]{1,}[\.0-9]{0,})");
	}
	else
	{
		alert("unknown browser");
	}

	if (aRegExp && aRegExp.exec(aUserAgent) != null)
			aBrowserVersion = parseFloat( RegExp.$1 );

	var __SANDBOX =
	{	    
	    loadModule: __loadModule,
	    plugin: function () { return document.getElementById ("XecureCertShareCtrl"); },
		browserName: aBrowserName,
	    browserVersion: aBrowserVersion,
	    IEVersion: (function() {
			if( aBrowserName == "trident" )
				return aBrowserVersion;
			else
				return NaN;
		})(),
	    isIE: function() { return __SANDBOX.IEVersion; },
		getSafeResponse: function(aText) { return aText; },
		localPathSeperator: "\\",
	    xcsInterface: function () { return xcsObject; },
		isFailed: __isFailed,
		setButton: __setButton,
		setLocationEnable: __setLocationEnable,
		certLocationSet: {},
		inputKeyHandler:  __inputKeyHandler,
		addDialogOffset: __addDialogOffset,
		removeDialogOffset: __removeDialogOffset,
		dialogOffset: 530000,
		dialogStack: []
	};

	__SANDBOX.convertTable = new Array();

	function gCheckTime ()
	{
/*		var existDialog = document.getElementById("xwup_xvvcursor_disabled");
		if (existDialog == null)
			clearInterval (gTimeIntervalFunc);

		var currentTime = new Date().getTime();
		if ((currentTime - gStartTime) > 2000)
		{
			clearInterval (gTimeIntervalFunc);
			var aGuideModule = __SANDBOX.loadModule("guidewindow");
			gGuideDialog = aGuideModule({
							type: "login",
							args: "",
							onconfirm: "",
							oncancel: function () {}
			});

			gGuideDialog.show();
		}*/
	}

	function __isCheckFunction (aFunctionName)
	{
		return __SANDBOX.xcsInterface().checkFunction (aFunctionName);		
	}

	function __addDialogOffset () {
		return __SANDBOX.dialogOffset += 10;
	}

	function __removeDialogOffset () {
		return __SANDBOX.dialogOffset -= 10;
	}

	if (aStorage) {
		var aCertLocationArray = aStorage.split(","),
			i;

		for (i= 0; i < aCertLocationArray.length; i++) {
			__SANDBOX.certLocationSet[aCertLocationArray[i].toLowerCase()] = true;
		}
	}

	if(navigator.platform.indexOf("Win") != 0)
		__SANDBOX.localPathSeperator = "/";

	if(__SANDBOX.isIE() && typeof(document.documentMode) == "undefined")
	{
		document.documentMode = __SANDBOX.isIE();
	}

	xcsObject = new XecureCertShareInterface(__SANDBOX);

	var loadModule = __loadModule;

	function __loadModule (moduleName)
	{
		var req;
		if (window.XMLHttpRequest) {
			req = new window.XMLHttpRequest;
		}
		else {
			req = new ActiveXObject("MSXML2.XMLHTTP.3.0");
		}

		var path = XecureCertShare.mBasePath + "/module/" + moduleName + ".js?version=" + new Date().getTime();
		req.open ('GET', path, false);
		req.send (null);

		eval (__SANDBOX.getSafeResponse(req.responseText));
		var moduleConstructor = eval(__SANDBOX.getSafeResponse("__" + moduleName));

		return moduleConstructor (__SANDBOX);
	}

	function __isFailed (aResult, aErrCallback)
	{
		if ( (typeof(aResult) == "string" && aResult === "") || (typeof(aResult) == "number" && aResult !== 0 ) )
		{
			var aErrorObject = __SANDBOX.xcsInterface().setErrCodeAndMsg();	

			if (aErrorObject.code !== "0")
			{
				if (aErrorObject.code == 20000008) {
					alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
				} else if (aErrCallback) {
					aErrCallback (aErrorObject);
				}
				return true;
			}
			else
			{
				//Something is wrong but what can we do?
				return true;
			}
		}

		return false;
	}

	function __setButton(aElements, aAttributeType, aValue, aIsWin){
		// WIN32, WIN64
		if(aIsWin){
			if(navigator.platform == "Win32" || navigator.platform == "Win64"){
				if(aAttributeType == "checked")
					aValue = true;
				else
					aValue = false;
			}
		}

		switch(aAttributeType){
			case "checked":
				for(var i = 0; i < aElements.length; i++){
					if(aValue)
						aElements[i].checked = true;
					else
						aElements[i].checked = false;
				}
				break;
			case "disabled":
				for(var i = 0; i < aElements.length; i++){
					if(aValue)
						aElements[i].disabled = true;
					else
						aElements[i].disabled = false;
				}
				break;
		}
	}

	function __setLocationEnable(aLocations, aElements, aIsWin32Only, aDisableLocation) {
		var aDisable = false,
			i;

		if(aIsWin32Only) {
			if(navigator.platform == "Win32")
				aDisable = false;
			else
				aDisable = true;
		}

		if (aDisable == false) {
			aDisable = true;
			for (i=0; i < aLocations.length; i++) {
				if (__SANDBOX.certLocationSet[aLocations[i]]) {
					aDisable = false;
					break;
				}
			}
		}

		if (aDisableLocation && aIsWin32Only != true) {
			aDisable = false;
			if (navigator.platform != "Win32")
				__SANDBOX.certLocationSet[aDisableLocation] = false;
		}

		for (i=0; i < aElements.length; i++) {
			aElements[i].disabled = aDisable;
		}
	}

	function __inputKeyHandler (aName, aOriInputObj, aImgSpan, aIndex, aX, aY, aKeyType, aMaxSize, aNewWidth) {
		var aOriInput = aOriInputObj
		var orgbk = '#FFFFFF';
		
		var aXecureKeypadEnable = XecureCertShare.mXecureKeypadEnable;
		var aXKModule = null;
		var aXKName = "xk_dialog_" + aOriInput.name + "_img";
		var aXecureKeypadElements;

		// Inca NOSv10
		var aIncaNOSv10Enable = XecureCertShare.mIncaNOSv10Enable;
		
		// kings
		var aKOSKeyEnable = XecureCertShare.mKOSKeyEnable;

		//transkey var
		var aTransKeyInputFlag = false;
		var aTransKeyID;
		var aTransKey;
		var aTransKeyInputID;
		var aTransKeyCheckboxID;
		var aTransKeyCheckbox;
		var aTransKeyPath = XecureCertShare.mTransKeyPath;
		var aTransKeyEnable = XecureCertShare.mTransKeyEnable;
		
		// touchenkey var
		var aTouchEnKeyObj = document.getElementById ("TouchEnKey");
		var aTouchEnKeyEnable = XecureCertShare.mTouchEnKeyEnable != false && aTouchEnKeyObj !=null && typeof(aTouchEnKeyObj) != "undefined";
		
		var aTouchEnKeyName;
		var aTouchEnKeyInputName;

		//transkey references
		var _TransKeyName,
			_GenerateSessionKeyRef,
			_KeyTypeRef,
			_GenKeyRef,
			_TransKeyPage;

/*		
		if (XecureCertShare.mPlatform.aName == "linux" || XecureCertShare.mPlatform.aName == "mac universal")
		{
			aIncaNOSv10Enable = false;
		}
*/		
		if(aXecureKeypadEnable)
		{
			 aXKModule = new XKModule_plugin ();

			 var aMakeIndexCallback;
			 var aXKModuleSpan;

			 var aXKKeyType = XecureCertShare.mXecureKeypadType;

			 aXKModuleSpan = document.createElement ("SPAN");
			 aXKModuleSpan.id = "xk_dialog_" + aOriInput.name + "_span";

			 aOriInput.parentNode.appendChild (aXKModuleSpan);
			 
			 var CB_XK_MakeIndex = function (result)
			 {
			 	aMakeIndexCallback (result.split (","));
			 }

			 var CB_XK_MakeRandomKeypadID = function (result)
			 {
			 	if (aXKModule.sessionID == null)
				{
					aXKModule.sessionID = result;
				}

				aXKModule.setTimer (120);
				var aXecureKeypadElements = __SANDBOX.xcsInterface ().XK_MakeIndex (aXKModule.sessionID, aXKKeyType);

				if (XecureCertShare.mPluginMode == true)
				{
					CB_XK_MakeIndex (aXecureKeypadElements);
				}
				else
				{
					__SANDBOX.extension.setcallbackFunc (CB_XK_MakeIndex);
				}
			 }

			 var aMakeIndexFunction = function (callback)
			 {
			 	var aResult;
				aMakeIndexCallback = callback;

				if (aXKModule.sessionID == null)
				{
					aResult = __SANDBOX.xcsInterface ().XK_MakeRandomKeypadID ();
				}

				if (XecureCertShare.mPluginMode == false && aXKModule.sessionID == null)
				{
					__SANDBOX.extension.setcallbackFunc (CB_XK_MakeRandomKeypadID);
				}
				else
				{
					CB_XK_MakeRandomKeypadID (aResult);
				}
			 }

			 aXKModule.makeIndex = aMakeIndexFunction;
			 aXKModule.initialize (aXKName, aXKModuleSpan, aOriInput, aNewWidth, aXKKeyType, false);
		}

		
		// Init Inca NOSv10
		var aParentForm;
		aParentForm = aOriInput.form;
		/*
		aParentForm = aOriInput;
		while (aParentForm) {
			if (aParentForm.tagName && (aParentForm.tagName.toUpperCase() == "FORM")) {
				break;
			}
			aParentForm = aParentForm.parentNode;
		}
		*/
		if (aIncaNOSv10Enable) {
			aOriInput.setAttribute ("npkencrypt", "re");
			if(aKeyType.indexOf("number") == 0)	{
				aOriInput.setAttribute ("data-keypad-type", "num");
			} else {
				aOriInput.setAttribute ("data-keypad-type", "alpha");
			}
			
			// Regist Dynamic Field
			npPfsCtrl.RegistDynamicField(aParentForm, aOriInput.name);
		}

		//init Kings Key
		if (aKOSKeyEnable) {
			var pubKey = "MIGIAoGA2YhqjntsWGq1ex5qRdXIKEpX+TlvZ6iaXsVsO5fSUCdaUwSAajpVRkGm2S4zOBYX1/cYDDcAf3uPhpadjemvbP6nf4SEvI8vgs5jQp0bhlIMajhjEatnxZigpnBl7XaJKth+wKQFGDfqHmEI685lVhf+zICESgKU1ahNtlEB6SECAwEAAQ==";
			
			KOS.registerElementWithKey(aOriInput, 
					                   'none', 
					                   'data-kdf-e2e-pubkey',
					                   pubKey); 
				
		}

		//init var about TransKey	
		if (aTransKeyEnable)
		{
			if (typeof xc_TransKey != "undefined") {
				XecureCertShare.mTransKeyIsXC = true;
				//old version
				_TransKeyName = "xc_TransKey";
				_GenerateSessionKeyRef = xc_generateSessionKey;
				_KeyTypeRef = aKeyType.substr(0, aKeyType.indexOf("_crt"));
				_GenKeyRef = tk_getrnd_hex;
				_TransKeyPage = aTransKeyPath + "/index.jsp";

				aOriInput.style.width = aNewWidth +"px";
				aTransKeyID = aName + "_tk" + aIndex;
				aTransKeyInputID = aName + "_tk" + aIndex + "_input";

				eval(__SANDBOX.getSafeResponse(aTransKeyID + "= null"));
				_GenerateSessionKeyRef (_TransKeyPage);
				eval(__SANDBOX.getSafeResponse(aTransKeyID +" = new " + _TransKeyName  + " (aTransKeyID, aX, aY, _TransKeyPage, _KeyTypeRef, aMaxSize, 'password');"));

				eval(__SANDBOX.getSafeResponse("aTransKey = " + aTransKeyID));
				aOriInput = document.getElementById(aTransKeyInputID);
			} else {
				XecureCertShare.mTransKeyIsXC = false;
				_TransKeyName = "TransKey";
				_GenerateSessionKeyRef = generateSessionKeyForCRT;
				_KeyTypeRef = aKeyType;
				_GenKeyRef = new GenKey().GenerateKey;
				_TransKeyPage = aTransKeyPath;

				if (!XecureCertShare.mTransKeyCheckBoxEnable)
				{
					aOriInput.style.width = aNewWidth +"px";					
		
					if(aName == "certselect") {
						aTransKeyID = aName + "_tk" + aIndex;
						aTransKeyInputID = "xcs_" + aName + "_tek_input" + aIndex;
					} else if(aName == "xcsexport") {

						aTransKeyID = aName + "_tk" + (aIndex-1);
						aTransKeyInputID = "xcs_export_tek_input" + (aIndex-1);
					}
					
					eval(aTransKeyID + "= null");

					//2013.02.18, wbr : 라온시큐어 이남열대리 가이드로 세션키 생성 시점을 트랜스키 객체 생성 전으로 변경
					_GenerateSessionKeyRef (_TransKeyPage);
					eval(aTransKeyID +" = new " + _TransKeyName  + " (aTransKeyID, aX, aY, _TransKeyPage, _KeyTypeRef, aMaxSize, 'password');");

					eval("aTransKey = " + aTransKeyID);
					aOriInput = document.getElementById(aTransKeyInputID);

					var aElementPosition = aOriInput.getBoundingClientRect();
					var aInputTransKeyXY = parseInt(aElementPosition.left) + " " + (parseInt(aElementPosition.top) + parseInt(aOriInput.offsetHeight) + parseInt(window.pageYOffset));
					
					if(XecureCertShare.mTransKeyXY != "")
					{
						aOriInput.setAttribute ("data-tk-kbdxy", XecureCertShare.mTransKeyXY); 
					}
					else
					{
						aOriInput.setAttribute ("data-tk-kbdxy", aInputTransKeyXY);
					}

					transkey[aTransKeyInputID].button.src=transkey_url+'/images/on.png';
					transkey[aTransKeyInputID].useTranskey=true;
					transkey[aTransKeyInputID].inputObj.readOnly=true;
					transkey[aTransKeyInputID].checkValue.value="transkey";
					transkey[aTransKeyInputID].buttonListener = function(btnObj, inputId){return;};

					transkey[aTransKeyInputID].button.parentNode.onclick = function() {
						aElementPosition = aOriInput.getBoundingClientRect();
						aInputTransKeyXY = parseInt(aElementPosition.left) + " " + (parseInt(aElementPosition.top) + parseInt(aOriInput.offsetHeight) + parseInt(window.pageYOffset));
						if(XecureCertShare.mTransKeyXY != "")
						{
							aOriInput.setAttribute ("data-tk-kbdxy", XecureCertShare.mTransKeyXY); 
						}
						else
						{
							aOriInput.setAttribute ("data-tk-kbdxy", aInputTransKeyXY);
						}
					};
				}
				//20190417 라온시큐어 이선호대리와 협의하여 mTransKeyCheckBoxEnable는 지원안하기로 함
				/*else
				{
					aTransKeyID = aName + "_tk" + aIndex;
					aTransKeyInputID = "xwup_" + aName + "_tek_input" + aIndex;
					aTransKeyCheckboxID = aName + "_tk" + aIndex + "_button"; 

					aX -= 78;

					//2013.02.18, wbr : 라온시큐어 이남열대리 가이드로 세션키 생성 시점을 트랜스키 객체 생성 전으로 변경
					//_GenerateSessionKeyRef (_TransKeyPage);
					eval(aTransKeyID +" = new " + _TransKeyName  + " (aTransKeyID, aX, aY, _TransKeyPage, _KeyTypeRef, aMaxSize, 'password', '" + aTransKeyInputID + "');");
					eval (aTransKeyID + ".useTransKey = false");
					eval("aTransKey = " + aTransKeyID);
					aTransKeyCheckbox = document.getElementById(aTransKeyCheckboxID);
				}*/
			}
		}

		//init vars about TouchEnKey
		if (aTouchEnKeyEnable) {
			aTouchEnKeyName = aOriInput.form.name;
			if (!aTouchEnKeyName) {
				alert("XWUP error [" + aTouchEnKeyName.outerHTML + "] doesn't have name");
			}
			aTouchEnKeyInputName = aName + "_tek_input" + aIndex;
			aOriInput.setAttribute ("enc", "on");
			aOriInput.setAttribute ("kbd", "off"); 
		}


		return {
			onComplete : function (completeHandle) {
				if(aXecureKeypadEnable)
				{
					aOKFunction = function() {
						aXKModule.stop(); // Timer Stop
						var xkLayer = document.getElementById(aXKName);
						if(xkLayer != null)
							xkLayer.parentNode.removeChild(xkLayer);
						
						aOriInput.readOnly = false;
						
						aOriInput.onkeydown = function(e)
						{
							if(aXecureKeypadEnable && aXKModule.get_Vinput().length > 0)
							{
								if(e.keyCode == 8) //backspace
								{
									aXKModule.clear();
								}
								else
								{
									return false;
								}
							}
						};
						
						completeHandle.ok();
					};
					
					var aRefreshCallback = function (aResult)
					{
						aXKModule.genkeypad (aResult);
					}

					var aRefreshFunction = function ()
					{
						aXKModule.clear ();
						aXKModule.makeIndex (aRefreshCallback);
					}
					aXKModule.enter = aOKFunction;
					aXKModule.refresh = aRefreshFunction;
				} else if (aTransKeyEnable) {
					var aOkFunction = function() {
						aTransKeyInputFlag = (_KeyTypeRef.indexOf("number") == 0 || _KeyTypeRef.indexOf("qwerty") == 0); //number use close func only
						completeHandle.ok();
					}
					var aCloseFunction = function() {
						aTransKeyInputFlag = (_KeyTypeRef.indexOf("number") == 0 || _KeyTypeRef.indexOf("qwerty") == 0); //number use close func only
						completeHandle.close();
					}
					aTransKey.onCompleteInput = aOkFunction;
					aTransKey.onCompleteClose = aCloseFunction;
				}
			},

			generateSessionID : function (aCallback) {
				var aResult = "";
				var aKeyType = "";
				var aSetData = "";
				var aSetPreData = "";
				var aIsPreData = false;

				_setSecureInput_setData = function() {
					if (aKeyType == XCS_SECUREINPUT_TOUCHENNXKEY) {
						TK_GetEncXW(aTouchEnKeyName, aTouchEnKeyInputName, aResult, aCallback);
					} else if(aCallback == undefined) {
						return;
					} else {
						aCallback(aResult);
					}
				}
				_generateRandom = function (result) {
					if(result)
						aResult = result;

					if (aIsPreData == false) {
						if(aSetPreData.length > 0) {
							aSetPreData += "$";
						}
						aSetData = aSetPreData + aKeyType + "|" + aResult;
					} else {
						aSetData = aSetPreData;
					}

					_setSecureInput_setData();
				}

				_checkPreData = function() {
					if (aIsPreData == false) {
						if(aKeyType == XCS_SECUREINPUT_TRANSKEY) {
							aResult = _GenKeyRef(10);
						}
					} else {
						aSetData = aSetPreData;
					}
					_generateRandom();
				}

				// 1. check input type
				if(aXecureKeypadEnable && aXKModule.get_Vinput().length > 0) {
					aKeyType = XCS_SECUREINPUT_XECUREKEYPAD;
				} 
				else if (aIncaNOSv10Enable) {
					aKeyType = XCS_SECUREINPUT_INCA_NOS10;
				}
				// kings
				else if (aKOSKeyEnable) {
					aKeyType = XCS_SECUREINPUT_KDFDEC;
				}
				// transkey
				else if (aTransKeyInputFlag && aTransKey.getHiddenData().length > 0) {
					aKeyType = XCS_SECUREINPUT_TRANSKEY;
					_checkPreData();
				}
				else {
					aKeyType = XCS_SECUREINPUT_NATIVEINPUT;
				}
				
				if(aKeyType == XCS_SECUREINPUT_XECUREKEYPAD)
				{
					 if(aXKModule.sessionID != null)
					 {
						 aResult = aXKModule.sessionID;
					 }
				}
				else if (aIncaNOSv10Enable) 
				{
					//aResult = "keycrypt";
				}
				
				
				return aResult;

			},
			getValue : function (aSessionID) {
				var aType = 0;
				var aResult = "";
				var aKOSSessionKey="";
				
				if(aXecureKeypadEnable && aXKModule.get_Vinput().length > 0)
				{
					aType = XCS_SECUREINPUT_XECUREKEYPAD;
					aResult = aXKModule.sessionID + "|" + aXKModule.get_input();
				}
				else if (aIncaNOSv10Enable) {
					aType = XCS_SECUREINPUT_INCA_NOS10;
					aResult = aOriInput.value.length + "$" + npPfsCtrl.GetReplaceField(aOriInput.form, aOriInput.name) + npPfsCtrl.GetResultField(aOriInput.form, aOriInput.name);	
//					aResult = aOriInput.value.length + "$" + npPfsCtrl.GetReplaceField(aParentForm, aOriInput.name) + npPfsCtrl.GetResultField(aParentForm, aOriInput.name);
				} // kings
				else if (aKOSKeyEnable && ( (aKOSSessionKey = KOS.getEncryptedKey(aOriInput)) !=null || (aKOSSessionKey = KOS.getEncryptedKey(aOriInput)) !="" ) ) {
					aType = XCS_SECUREINPUT_KDFDEC;
					aResult = KOS.getEncryptedKey(aOriInput)+ "|" +KOS.getEncryptedValue(aOriInput);
					console.log("XecureCertShare_input_name:" + aOriInput.name);
					console.log("KOS_result:"+aResult);
				}
				else if (aTransKey != null && aTransKey.getHiddenData().length > 0) {
					aType = XCS_SECUREINPUT_TRANSKEY;
					aResult = aTransKey.getCipherData (aSessionID);
					aTransKeyInputFlag = false;
				}
				else
				{
					aType = XCS_SECUREINPUT_NATIVEINPUT;
					aResult = aOriInput.value;
				}
				
				if (aResult != null && typeof(aResult) == "string" && aResult.length > 0) {
					return aType + "$" + aResult;
				} else {
					return "";
				}
			
			},
			clear : function () {
				aOriInput.value = "";

				if(aXecureKeypadEnable)
				{
					aOriInput.onkeydown = function(e) {return true;};
					
					aXKModule.clear();
					
					var xkLayer = document.getElementById(aXKName);
					if(xkLayer != null)
						xkLayer.parentNode.removeChild(xkLayer);
				} else if (aIncaNOSv10Enable) {
					aOriInput.value = "";
					npVCtrl.resetKeypad(aOriInput.name);
				} else if (aTransKeyEnable && document.getElementById(aTransKeyInputID)) {
					aTransKey.clear();
					document.getElementById(aTransKeyInputID).value = "";
				} else if (aTouchEnKeyEnable) {
					document[aTouchEnKeyName][aTouchEnKeyInputName].value = "";
				}
			},
			getElement : function() {
				return aOriInput;
			},
			onEnterKeyPress : function(aTarget) {
// yjyoon
			var aInputElement;

			if (aTouchEnKeyEnable) {
				aInputElement = document[aTouchEnKeyName][aTouchEnKeyInputName];
			} else {
				aInputElement = aOriInput;
			}
				
			aInputElement.onkeypress = function(e) {
				if(!e)
					e = event;	
				var aKeyCode = e.which || e.keyCode,
					aDispatcher;
					
					// K-Defense
					//console.log (aKeyCode);
					if (aKeyCode == 13) {
						//2013.02.15, AI-065, added
						//if (AnySign.mDivInsertOption == true) {
								//return false;
						//}
						//debugger;
						aTarget.focus();

						if (aTarget.dispatchEvent) {
							var evt = document.createEvent("HTMLEvents");
							evt.initEvent("click", true, true);
							aDispatcher = function () {
								//20130325 ldg ie9 enter key can one touch modify 
								//if (__SANDBOX.isIE () > 0)
								if (__SANDBOX.isIE () < 9)
								{
									return;
								}

								aTarget.dispatchEvent(evt);
							};
						}
						else {
							aDispatcher = function () {
								aTarget.fireEvent("onclick");
							};
						}

						setTimeout(aDispatcher, 0); // for AOS

						return false;
					}
				}

			},
			getLength : function() {
				var aResult = 0;
				var aTarget;

				if (aTransKeyEnable && document.getElementById(aTransKeyInputID)) {
					aTarget = document.getElementById(aTransKeyInputID);
				} else if (aTouchEnKeyEnable) {
					aTarget = document[aTouchEnKeyName][aTouchEnKeyInputName];
				} else {
					aTarget = aOriInput;
				}

				if(aTarget || aTarget.value)
					aResult = aTarget.value.length;				

				return aResult;
			},
			focus : function() {
				if (aTouchEnKeyEnable) {
					if (document[aTouchEnKeyName][aTouchEnKeyInputName].disabled != true) {
						document[aTouchEnKeyName][aTouchEnKeyInputName].focus();
						return true;
					}
				} else {
					if(aOriInput.disabled != true) {
						aOriInput.focus();
						return true;
					}
				}

				return false;
			},
			refresh: function() {
				if (aTransKeyEnable && document.getElementById(aTransKeyInputID)) {
					//	aTransKey.close();
				} 
				else if(aXecureKeypadEnable)
				{
					var xkLayer = document.getElementById ("xk-dialog");
					if (xkLayer)
					{
						document.body.removeChild (xkLayer);
					}
/*
					aXKModule.stop(); // Timer Stop
					var xkLayer = document.getElementById(aXKName);
					if(xkLayer != null)
						xkLayer.parentNode.removeChild(xkLayer);
*/
				}
				if (aTouchEnKeyEnable)
				{
					if (navigator.appName == 'Microsoft Internet Explorer' || navigator.userAgent.match('Trident/7.0') || navigator.userAgent.match('MSIE'))
					{
						if(aTouchEnKeyInputName == 'verifyhsm_tek_input1'||aTouchEnKeyInputName =='certselect_tek_input1' || aTouchEnKeyInputName =='inputpasswd_tek_input1' || aTouchEnKeyInputName == 'certselectwide_tek_input1')
						{
							setTimeout(function(){TouchEnKey_EnqueueList(aTouchEnKeyName,aTouchEnKeyInputName);}, 0);
						}
						else if(aTouchEnKeyInputName =='savepasswd_tek_input1')
						{
							setTimeout(function(){TouchEnkey_EnqueueList_frm(aTouchEnKeyName);}, 0);
      					}	
						else
						{ 
							setTimeout(function(){document.getElementById("TouchEnKey").ReScanDocument();}, 0);
						}
					}
					else
					{ //multi browser
						setTimeout(function(){TouchEnKey_ApplySecurity();}, 0);
					}
				}
			},
			enable: function(aEnable) {
				//원본
				// aOriInput.disabled = !aEnable;
				// aOriInput.style.backgroundColor = aEnable ? '#FFFFFF' : '#EEEEEE';
				if(aOriInput.disabled != true)
				{
					 orgbk = aOriInput.style.backgroundColor;
				}
				aOriInput.disabled = !aEnable;
				if(aEnable)
				{
					if(orgbk == "")
						orgbk = '#FFFFFF';
					aOriInput.style.backgroundColor = orgbk;
				}
				else
					aOriInput.style.backgroundColor ='#EEEEEE';

				if (aTransKeyEnable && aTransKeyCheckbox !=null && typeof(aTransKeyCheckbox) != "undefined") {
					aTransKeyCheckbox.style.display = (aEnable == true ? "" : "none");
				}
			},
			finish: function() {
			}
		}
	}

/// public
return {
	LoadExtension: function (aName)
	{
		var aRequest,
			aExtension;
		if (window.XMLHttpRequest) {
			aRequest = new window.XMLHttpRequest;
		} else {
			aRequest = new ActiveXObject("MSXML2.XMLHTTP.3.0");
		}
		aRequest.open ('GET', XecureCertShare.mBasePath + "/ext/" + aName, false);
		aRequest.send (null);
		if (aRequest.status != 200) {
			alert("Failed to load extension");
			return;
		}
		eval (__SANDBOX.getSafeResponse(aRequest.responseText));

		if (aName == "json2.js")
			return;

		var index = aName.indexOf(".");
		var extName = aName.substring(0, index);

		aExtension = new XecureCertShareExtension[extName]();
		return aExtension;
	},

	SetExtension: function (aExtension)
	{
		__SANDBOX.extension = aExtension;
		
		if (!XecureCertShare.mXCSXFree.mIgnoreInstallPage)
			__SANDBOX.extension.GetWebSocket ();
	},
	
	SetLanguage: function (aLanguage, aErrCallback)
	{
		var aResult;

		if (aErrCallback == undefined)
		{
			aErrCallback = gErrCallback_common;
		}

		aResult = __SANDBOX.xcsInterface().setLanguage(aLanguage);

		if ( __SANDBOX.isFailed(aCertList, aErrCallback) )
		{
			return;
		}

		return aResult;
	},

	XCSImport: function(aErrCallback)
	{
		var module = null;
		var dialog = null;
		
		if (aErrCallback == undefined)
		{
			aErrCallback = gErrCallback_common;
		}

		if(XecureCertShare.mDivInsertOption == 1)
		{
			module = loadModule ("xcsimportwide");
			dialog = module (
					{
						args: {
							errCallback: aErrCallback
						},
						onconfirm: function () { },
						oncancel:  function () { }
					});
		}
		else
		{
			module = loadModule ("xcsimport");
			dialog = module (
					{
					args: {
						errCallback: aErrCallback
					},
					onconfirm: function () { dialog.dispose (); },
					oncancel:  function () {
						dialog.dispose ();
						try {XecureCertShare_cancelCallback();}catch(e) { console.log('XecureCertShare_cancelCallback is not defined');}
					}
				});
		}
		
		if (dialog)
			dialog.show();
		
		return dialog;

	},

	XCSExport: function(aErrCallback)
	{
		var module = null;
		var dialog = null;
		
		if (aErrCallback == undefined)
		{
			aErrCallback = gErrCallback_common;
		}

		if(XecureCertShare.mDivInsertOption == 1)
		{
			module = loadModule ("xcsexportwide");
			dialog = module (
					{
						args: {
							caList: XecureCertShare.mCAList,
							errCallback: aErrCallback
						},
						onconfirm: function () { },
						oncancel:  function () { }
					});
		}
		else
		{
			module = loadModule ("xcsexport");
			dialog = module (
					{
						args: {
							caList: XecureCertShare.mCAList,
							errCallback: aErrCallback
						},
						onconfirm: function () { dialog.dispose (); },
						oncancel:  function () {
							dialog.dispose ();
							try {XecureCertShare_cancelCallback();}catch(e) { console.log('XecureCertShare_cancelCallback is not defined');}
						}
					});
		}

		if (dialog)
			dialog.show();
		
		return dialog;

	},
	
	XCSScrap: function(aUserId, aUserCallback, aErrCallback)
	{
		var module = null;
		var dialog = null;
		
		if (aErrCallback == undefined)
		{
			aErrCallback = gErrCallback_common;
		}

		if(XecureCertShare.mDivInsertOption == 1)
		{
			module = loadModule ("xcsexportwide");
			dialog = module (
					{
						args: {
							userId: aUserId,
							userCallback: aUserCallback,
							errCallback: aErrCallback
						},
						onconfirm: function () { },
						oncancel:  function () { }
					});
		}
		else
		{
			module = loadModule ("xcsexport");
			dialog = module (
					{
						args: {
							userId: aUserId,
							userCallback: aUserCallback,
							errCallback: aErrCallback
						},
						onconfirm: function () { dialog.dispose (); },
						oncancel:  function () { dialog.dispose (); }
					});
		}
		
		if (dialog)
			dialog.show();
		
		return dialog;

	},

	setErrorLogLevel: function ()
	{
		var aResult = 0;
		__SANDBOX.xcsInterface().setErrorLogLevel();	
		
		return aResult;
	},
	
	escape_url: function(url)
	{
		var i;
		var ch;
		var out = '';
		var url_string = '';

		url_string = String(url);

		for (i=0; i<url_string.length; i++) {
			ch = url_string.charAt(i);
			if (ch == ' ')		out += '%20';
			else if (ch == '%')	out += '%25';
			else if (ch == '&') out += '%26';
			else if (ch == '+') out += '%2B';
			else if (ch == '=') out += '%3D';
			else if (ch == '?') out += '%3F';
			else				out += ch;
		}
		return out;
	},

	XecureCertShare_installCheck: function (aUserCallback)
	{
		XecureCertShare.mXCSXFree.mInstallCheck_CB = aUserCallback;
		__SANDBOX.extension.GetWebSocket ();
	}

};

})();


//@ sourceURL=XecureCertShare.js
