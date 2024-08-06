var XCS_SECUREINPUT_NATIVEINPUT		= 00;
var XCS_SECUREINPUT_XECUREKEYPAD 	= 04; 
var XCS_SECUREINPUT_KEYCRYPT        = 08;
var XCS_CERT_LOCATION_HARD			= 0;
var XCS_CERT_LOCATION_REMOVABLE		= 100;

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

XecureCertShareInterface.prototype.XCSPCUpload = function (aServerURL)
{
	return this.mSandBox.plugin().XCSPCUpload (aServerURL);
};

XecureCertShareInterface.prototype.XCSPCDownload = function (aServerURL)
{
	return this.mSandBox.plugin().XCSPCDownload (aServerURL);
};

XecureCertShareInterface.prototype.getMediaList = function (aReturnType)
{
	return this.mSandBox.plugin().getMediaList (aReturnType);
};

XecureCertShareInterface.prototype.setErrorLogLevel = function ()
{
	return this.mSandBox.plugin().setErrorLogLevel ();
};

XecureCertShareInterface.prototype.getCertificateList = function (aMediaID)
{
	var aResult = "";

	/************************************************************************/

	aResult = this.mSandBox.plugin().getCertificateList(aMediaID);

	/************************************************************************/

	return aResult;
};

XecureCertShareInterface.prototype.setAuthenticateCodeAndMediaID = function (aAuthenticateCode,
																						  aMediaID)
{
	var aResult;

	/************************************************************************/

	aResult = this.mSandBox.plugin ().setAuthenticateCodeAndMediaID (aAuthenticateCode,
																	 aMediaID);
	
	/************************************************************************/

	return aResult;
};

XecureCertShareInterface.prototype.setAuthenticateCodeAndCertificate = function (aAuthenticateCode,
																							  aMediaID,
																							  aIssuerRDN,
																							  aCertSerial,
																							  aPassword,
																							  aNewPassword)
{
	var aResult;

	/************************************************************************/

	aResult = this.mSandBox.plugin ().setAuthenticateCodeAndCertificate (aAuthenticateCode,
																		 aMediaID,
																		 aIssuerRDN,
																		 aCertSerial,
																		 aPassword, 
																		 aNewPassword);

	/************************************************************************/

	return aResult;
};

XecureCertShareInterface.prototype.verifyPassword = function (aMediaID,
																		   aIssuerRDN,
																		   aCertSerial,
																		   aPassword)
{
	var aResult;

	/************************************************************************/

	aResult = this.mSandBox.plugin ().verifyPassword (aMediaID,
													  aIssuerRDN,
													  aCertSerial,
													  aPassword);

	/************************************************************************/

	return aResult;
};

XecureCertShareInterface.prototype.changePassword = function (aMediaID,
																		   aIssuerRDN,
																		   aCertSerial,
																		   aPassword,
																		   aNewPassword)
{
	var aResult;

	/************************************************************************/

	aResult = this.mSandBox.plugin ().changePassword (aMediaID,
													  aIssuerRDN,
													  aCertSerial,
													  aPassword,
													  aNewPassword);

	/************************************************************************/

	return aResult;
};

XecureCertShareInterface.prototype.checkPassword = function(aNewPassword, aPasswordConfirm, aCheckPasswordConfirm)
{
	var aResult;

	aResult = this.mSandBox.plugin().checkPassword(aNewPassword, aPasswordConfirm, aCheckPasswordConfirm);
	
	return aResult;
};

XecureCertShareInterface.prototype.checkPasswordWithOption = function(aNewPassword, aPasswordConfirm, aCheckPasswordConfirm, aOption)
{
	var aResult;

	aResult = this.mSandBox.plugin().checkPasswordWithOption(aNewPassword, aPasswordConfirm, aCheckPasswordConfirm, aOption);
	return aResult;
};

XecureCertShareInterface.prototype.setErrCodeAndMsg = function ()
{
	var aResult = {};
	//var XCS_ERROR = 450000;
	var aErrMsg = "";
	var aErrCode = 0;
	
	aErrCode = this.mSandBox.plugin().getLastErrorCode();
	//aResult.msg = this.mSandBox.plugin().getLastErrorMessage();
	
	aResult.code = aErrCode;
	aResult.msg = aErrMsg;
	
	return aResult;
};


XecureCertShareInterface.prototype.XK_MakeRandomKeypadID = function ()
{
	return this.mSandBox.plugin().XK_MakeRandomKeypadID();
};

XecureCertShareInterface.prototype.XK_MakeIndex = function(aKeypadID, aKeypadType)
{
	return this.mSandBox.plugin().XK_MakeIndex(aKeypadID, aKeypadType);
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
		req.open ('GET', XecureCertShare.mBasePath+"/module/"+moduleName+".js", false);
		req.send (null);	

		eval (req.responseText);

		var moduleConstructor = eval("__" + moduleName);

		return moduleConstructor (__SANDBOX);
	}

	function __isFailed (aResult, aErrCallback)
	{
		if ( (typeof(aResult) == "string" && aResult === "") || (typeof(aResult) == "number" && aResult !== 0 ) )
		{
			var aErrorObject = __SANDBOX.xcsInterface().setErrCodeAndMsg();	

			if (aErrorObject.code !== "0")
			{
				if (aErrCallback)
					aErrCallback (aErrorObject);

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
		var aOriInput = aOriInputObj;
		
		var aXecureKeypadEnable = XecureCertShare.mXecureKeypadEnable;
		var aXKModule = null;
		var aXecureKeypadElements;
		var aXKName = "xk_dialog_" + aOriInput.name;
		var aXKSessionId = null;
		var aKeyCryptEnable = XecureCertShare.mKeyCryptEnable;
		
		if(aXecureKeypadEnable)
		{
			 aXKSessionId = __SANDBOX.xcsInterface().XK_MakeRandomKeypadID();
		 
			 aXKModule = new XKModule();
			 
			 if(aXKSessionId != "")
			 {
				 var aXKModuleSpan = null;
				 
				 if(aImgSpan == null)
				 {			
					 aXKModuleSpan = document.createElement("SPAN");
					 aXKModuleSpan.id = aXKName + "_span";
					 aXKModuleSpan.style.display ='inline-block';
					 aXKModuleSpan.style.padding ='0px';
					 aXKModuleSpan.style.margin = '0px';
					 
					 if(document.getElementById(aXKModuleSpan.id) == null)
						 aOriInput.parentNode.appendChild(aXKModuleSpan);
				 }
				 else {
					 aXKModuleSpan = aImgSpan;
					 aXKModuleSpan.style.margin = '0px';
				 }
				
				 var aMakeIndexFunction = function()
				 {				 
					 aXKModule.setTimer(60);
					 
					 aXecureKeypadElements = __SANDBOX.xcsInterface().XK_MakeIndex(aXKSessionId, "qwerty").split(",");
					 
					 return aXecureKeypadElements;				 
				 };
				 
				 aXKModule.makeIndex = aMakeIndexFunction;
				 
				 aXKModule.initialize(aXKName, aXKModuleSpan, aOriInput, aNewWidth, 'qwerty', false);
			 }
		}
        else if (aKeyCryptEnable)
        {
            try
            {
                if (checkInstallKeyCrypt() == true)
                {
                    OnInitHtml5Option(true);
                }
                else
                {
                    aKeyCryptEnable = false;
                }     
            }   
            catch (e)
            {
                aKeyCryptEnable = false;
            }                
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
					aXKModule.enter = aOKFunction;
				}
			},

			generateSessionID : function() {
				var aResult = "";
				var aKeyType = "";

				// 1. check input type
				if(aXecureKeypadEnable && aXKModule.get_Vinput().length > 0) {
					aKeyType = XCS_SECUREINPUT_XECUREKEYPAD;
				} 
				else if(aKeyCryptEnable)
				{
					aKeyType = XCS_SECUREINPUT_KEYCRYPT;
				}
				else {
					aKeyType = XCS_SECUREINPUT_NATIVEINPUT;
				}
				
				if(aKeyType == XCS_SECUREINPUT_XECUREKEYPAD)
				{
					 if(aXKSessionId != null)
					 {
						 aResult = aXKSessionId;
					 }
				}
				else if(aKeyType == XCS_SECUREINPUT_KEYCRYPT)
				{
					aResult = "keycrypt";
				}
				
				return aResult;

			},
			getValue : function (aSessionID) {
				var aType = 0;
				var aResult = "";
				
				if(aXecureKeypadEnable && aXKModule.get_Vinput().length > 0)
				{
					aType = XCS_SECUREINPUT_XECUREKEYPAD;
					aResult = aXKSessionId + "|" + aXKModule.get_input();
				}
				else if(aKeyCryptEnable)
				{
				    aType = XCS_SECUREINPUT_KEYCRYPT;
				    aResult = aOriInput.value.length + "$" + aOriInput.value + GetHtml5option();
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
					aXKModule.stop();
					
					var xkLayer = document.getElementById(aXKName);
					if(xkLayer != null)
						xkLayer.parentNode.removeChild(xkLayer);
				}
			},
			getElement : function() {
				return aOriInput;
			},
			onEnterKeyPress : function(aTarget) {

			},
			getLength : function() {
				var aResult = 0;
				var aTarget;

				aTarget = aOriInput;

				if(aTarget || aTarget.value)
					aResult = aTarget.value.length;				

				return aResult;
			},
			focus : function() {
				if(aOriInput.disabled != true) {
					aOriInput.focus();
					return true;
				}

				return false;
			},
			refresh: function() {
				
				if(aXecureKeypadEnable)
				{
					aXKModule.stop(); // Timer Stop
					var xkLayer = document.getElementById(aXKName);
					if(xkLayer != null)
						xkLayer.parentNode.removeChild(xkLayer);

				}
                else if (aKeyCryptEnable)
                {
                    try
                    {
                        if (checkInstallKeyCrypt() == true)
                        {
                            OnInitHtml5Option(true);
                        }
                        else
                        {
                            aKeyCryptEnable = false;
                        }
                    }      
                    catch (e)
                    {
                        aKeyCryptEnable = false;
                    }
                }                               
			},
			enable: function(aEnable) {
				aOriInput.disabled = !aEnable;
				aOriInput.style.backgroundColor = aEnable ? '#FFFFFF' : '#EEEEEE';
			},
			finish: function() {
			    if (aKeyCryptEnable) {
			        OnInitHtml5Option(false);
			    }
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
		eval (aRequest.responseText);

		aExtension = new XecureCertShareUnifiedPluginExtension[aName]();
		return aExtension;
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
					oncancel:  function () { dialog.dispose (); }
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
	}
};

})();


//@ sourceURL=XecureCertShare.js
