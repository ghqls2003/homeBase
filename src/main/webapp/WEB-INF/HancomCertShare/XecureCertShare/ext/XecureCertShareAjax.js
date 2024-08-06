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
if (typeof XecureCertShareExtension == "undefined") {
	XecureCertShareExtension = {};
}

XecureCertShareExtension.XecureCertShareAjax = function () {
	var gURL;
	var xdrSocket = null;
	var callback = null;
	var gErrObject = {code: 0, msg: ""};
	var gSendDataList = [];
	var gDecData = [];
	var gProtocolType = "general";
	var _createJSONData = null;

	var enableWS = false;
	var gConnectFailCount = 0;

	var gPingFunction;
	var gPingEnable = true;
	var gPongRandom = null;
	var gPongMessage = null;
	var gPingRandom = null;
	var gPingMessage = "heartbeat!";
	var gPingTime = 30000;
	var gIdleTime = 20000;
	var gLastMessageTime;

	var gStartInterval = 300;
	var gSecondInterval = 200;   
	var gAsynchSendInterval = 230;
	var gSendInterval = 0;
	var gSocketTimeout = 0;

	var gSessionID = XecureCertShare.mXCSXFree.mSessionID;

	var gDirectConnect = false;

	var gServicePort;
	var gConnectPort;
	var gTrialNumber;

	var gLauncherSocket = false;

	var gRandomNumber = 0;
	var gDecExeSend = false;
	var gDecResultList = [];

	var gRunUpdate = false;
	var gUpdateStartTime = 0;

	var gIntegrityRet;

	eval(GetSafeResponse (loadSecurePro ("XecureCertShare_min.js")));
	eval(GetSafeResponse (loadSecurePro ("SecureProto.js")));
	eval(GetSafeResponse (loadSecurePro ("jquery-1.11.1.js")));

	var SofoXecureCertShareJQuery = jQuery.noConflict();

	function loadSecurePro (aName)
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
			alert("Failed to load: " + aName);
			return;
		}
		return aRequest.responseText;
	}

	function _checkPingPong () {
		var currentTime = new Date().getTime();
		if ((currentTime - gLastMessageTime) > gIdleTime) {
			if (gPingEnable) {
				if(gPongMessage != null)
				{
					if(gPongMessage != gPingMessage || gPongRandom != gPingRandom)
					{
						// assume Local Server is disable or not executed.
						clearInterval (gPingFunction);
						gPongRandom = null;
						gPongMessage = null;
						gPingRandom = null;
						_getWebSocket();
					}
				}

				if (gPingEnable) 
					gPingRandom = _sendPingInfo(gPingMessage ,gAsynchSendInterval);
			}
		}
	}

	function reRun () {
		webSocket = null;
		enableWS = false;
		gLauncherSocket = false;
		XecureCertShare.mXCSXFree.mModuleLoad = false;
		var protocol = gURL.substring(0, gURL.length-5);
		gURL = protocol + gServicePort;

		_getWebSocket ();
	}

	function _getWebSocket () {

		xdrSocket = new XDomainRequest();
		if (!gLauncherSocket && gDirectConnect == false)
		{
			var message = _setDemonInfo ();
			setTimeout (function () {_doSend (message);}, 300);
		}
		else
		{
			if (gURL.indexOf("https:") == 0)
			{
				_setAttributeInfo (gStartInterval);
			}
			else if(gURL.indexOf("http:") == 0)
			{
				Secure.start("envelope",_doAjaxSend);
			}
		}
		
		xdrSocket.onload = function() {
			var aData, aProtocolData, aContact, aFuncname, aType, aValue, aMessageUID, aSessionID;
			var isDec = false;

			gLastMessageTime = new Date().getTime();
			gPingEnable = true;

			aData = xdrSocket.responseText;
			aProtocolData = JSON.parse(aData);
			aProtocolType = aProtocolData.protocolType;
			aContact = aProtocolData.message;

			if (aProtocolType == "secure")
			{
				XecureCertShare.mXCSXFree.mImgIntervalError = true;
				alert("Ajax 통신에는 secure 보안프로토콜이 사용되지 않습니다.");
				return;
			}

			if (aProtocolType == "envelope")
			{
				try {
					aMessageType = aContact.messageType;
					switch (aMessageType)
					{
						case "application":
							aContact = JSON.parse (Secure.receiveApplication (aProtocolData));
							break;
						case "server_hello":
							if (Secure.handShake (_doAjaxSend, aProtocolData))
							{
								gProtocolType = "envelope";
								_createJSONData = function (message) {
									var JSONData = JSON.stringify(message);
									return Secure.sendApplication (JSONData);
								}
								_setAttributeInfo (gSecondInterval);
							}
							else
							{
								alert("[Envelope Secure Protocol Error] Handshake Fail.\n\nCertificate is invalid. Retry handshake.");
								_getWebSocket();
							}
							return;
						default:
							alert(aContact.code);
							return;
					}
				}
				catch (err)
				{
					alert("envelope protocol try/catch error : " + err);
				}
			}
	
			aFuncname = aContact.InterfaceName;
			aType = aContact.ReturnType;
			aMessageUID = aContact.MessageUID;
			aSessionID = aContact.SessionID;
			if (aType == "number")
				aValue = Number(aContact.ReturnValue);
			else
				aValue = aContact.ReturnValue;

			gErrObject.code = aContact.InterfaceErrorCode;
			gErrObject.msg = aContact.InterfaceErrorMessage;

			if (gErrObject.code == "21000") {
				if (XecureCertShare.mXCSXFree.mInstallCheck_CB != null) {
					XecureCertShare.mXCSXFree.mInstallCheck_CB ("XecureCertShare_INTEGRITY_FAIL");
				} else {
					alert("[integrity error] 파일이 변조되었습니다.\n악의적 공격에 의해 수정되었을 가능성이 있습니다.\n재설치 하시기 바랍니다.");
					location.href = XecureCertShare.mPlatform.aInstallPage;
				}

				return;
			}

			switch (aFuncname)
			{
				case "launcher":
					if (gErrObject.code == "30000" || gErrObject.code == "30002" ||
						gErrObject.code == "30003" || gErrObject.code == "30004" || gErrObject.code == "30005")
					{
						XecureCertShare.mXCSXFree.mImgIntervalError = true;

						var msg = "[" + gErrObject.code + "] [" + eval("XecureCertShare_ERROR_" + gErrObject.code) + "]";
						alert(msg);
						return;
					}
					else if (gErrObject.code == "30001")
					{
						// update
						if (XecureCertShare.mXCSXFree.mInstallCheck_CB != null) 
						{
							XecureCertShare.mXCSXFree.mInstallCheck_CB ("XecureCertShare_NEED_UPDATE");
							XecureCertShare.mXCSXFree.mInstallCheck_CB = null;
							return;
						}

						if (XecureCertShare.mXCSXFree.mLiveUpdate)
						{
							if (gRunUpdate) {
								var time = new Date().getTime();
								if ((time - gUpdateStartTime) > 120000)
									location.href = XecureCertShare.mPlatform.aInstallPage;
								else
									setTimeout (function () {reRun ();}, 2000);
							} else {
								var aElement = document.getElementById("CertShare4PCLoadingImg");
								aElement.src = XecureCertShare.mBasePath + "/img/loading_update.gif";

								gUpdateStartTime = new Date().getTime();
								gRunUpdate = true;
								console.log ("[CertShareXFree] send message: updateready");
								_setUpdateState ("updateready");
							}
						}
						else
						{
							if (XecureCertShare.mXCSXFree.mIgnoreInstallPage != true)
								location.href = XecureCertShare.mPlatform.aInstallPage;
						}
					}
					else if (gErrObject.code == 0)
					{
						if (gRunUpdate)
						{
							gRunUpdate = false;
						}

						enableWS = true;
						gLauncherSocket = true;
						var portList = aValue.split(","); 
						var protocol = gURL.substring(0, gURL.length-5);
						if (protocol.indexOf("https:") == 0)
						{
							gConnectPort = portList[1];
							gURL = protocol + portList[1];
						}
						else
						{
							gConnectPort = portList[0];
							gURL = protocol + portList[0];
						}

						_getWebSocket();
					}
					else
					{
						location.href = XecureCertShare.mPlatform.aInstallPage;
					}
					break;
				case "setAttributeInfo":
					if (gErrObject.code == 30006 || gErrObject.code == 30001) {
						gDirectConnect = false;
						port = Number(XecureCertShare.mXCSXFree.mPort);
						if(window.location.protocol.indexOf("https:") == 0) {
							gServicePort = port + 1;
							gURL = "https://127.0.0.1:" + gServicePort;
						}
						else {
							gServicePort = port;
							gURL = "http://127.0.0.1:" + gServicePort;
						}

						reRun ();
						return;
					}
					XecureCertShare.mXCSXFree.mModuleLoad = true;
					console.log("[CertShareXFree][XecureCertShareAjax_onmessage_01004]");

					// check setAttribute result
					if (gErrObject.code == 20015)
					{
						XecureCertShare.mXCSXFree.mModuleLoad = false;
						alert(gErrObject.msg + " attribute setting failed");
						return;
					}

					if (XecureCertShare.mXCSXFree.mInstallCheck_CB != null) 
					{
						XecureCertShare.mXCSXFree.mInstallCheck_CB ("XecureCertShare_NORMAL");
						XecureCertShare.mXCSXFree.mInstallCheck_CB = null;
					}

					gPingFunction = setInterval(_checkPingPong, gPingTime);
					gDecExeSend = true;
					break;
				case "pong":
					gPongRandom = aMessageUID; 
					gPongMessage = aValue;
					break;
				case "updateready":
					console.log ("[CertShareXFree] receive message: updateready");
					if (gErrObject.code == 0)
					{
						console.log ("[CertShareXFree] send message: updatestart");
						_setUpdateState ("updatestart");
					}
					else
					{
						alert("[CertShareXFree] 중계 프로그램의 업데이트 설치에 실패하였습니다. 설치페이지로 이동합니다.\n" + "[오류코드] : " + gErrObject.code);
						location.href = XecureCertShare.mPlatform.aInstallPage;
					}
					break;
				case "updatestart":
					console.log ("[CertShareXFree] receive message: updatestart");
					setTimeout (reRun, gSendInterval);
					break;
				default:
					if (callback) {
						var exeFunc = callback;
						callback = null;
						exeFunc (aValue);
					}
			}
		};

		xdrSocket.onerror = function() {
			if (enableWS)
			{
				console.log("[CertShareXFree][XecureCertShareAjax_error_10000]");
				if (gPingFunction)
					clearInterval (gPingFunction);

				if (gConnectFailCount > 3)
				{
					var selectResult = confirm ("안정적인 동작을 위해 CertShareXFree 인증서 중계 프로그램의 재설치가 필요합니다.\n[확인]을 선택하시면 설치페이지로 연결됩니다.");
					if (selectResult)
						location.href = XecureCertShare.mPlatform.aInstallPage;

					XecureCertShare.mXCSXFree.mImgIntervalError = true;

					return;
				}

				try {
					var element = document.getElementById("xcs_title_guidewindow");
					if (element != null)
					{
						XecureCertShare.mXCSXFree.mDialog.oncancel ();
					}
				}catch(e) {}

				gConnectFailCount++;
				reRun ();
			}
			else if (gRunUpdate == true)
			{
				console.log("[CertShareXFree][XecureCertShareAjax_error_10001]");
				var time = new Date().getTime();
				if ((time - gUpdateStartTime) > 120000)
					location.href = XecureCertShare.mPlatform.aInstallPage;
				else
					reRun ();
			}
			else if (gIntegrityRet == "FAILED")
			{
				return;
			}
			else if (gDirectConnect) {
				gDirectConnect = false;
				gTrialNumber = 0;
				port = Number(XecureCertShare.mXCSXFree.mPort);

				if(window.location.protocol.indexOf("https:") == 0 )
				{
					gServicePort = port + 1;
					gURL = "https://127.0.0.1:" + gServicePort;
				}
				else
				{
					gServicePort = port;
					gURL = "http://127.0.0.1:" + gServicePort;
				}

				console.log("[CertShareXFree][XecureCertShareAjax_error_10004]");
				reRun ();
			}
			else
			{
				if (gTrialNumber < XecureCertShare.mXCSXFree.mTrialPortRange)
				{
					var type;

					if(window.location.protocol.indexOf("https:") == 0 )
						type = "https://127.0.0.1:";
					else
						type = "http://127.0.0.1:";

					gServicePort = gServicePort + 2;
					gURL = type + gServicePort;

					console.log("[CertShareXFree][XecureCertShareAjax_error_10005][" + gServicePort + "]");
					gTrialNumber++;
					_getWebSocket ();
				}
				else
				{
					console.log("[CertShareXFree][XecureCertShareAjax_error_10006]");
					if (XecureCertShare.mXCSXFree.mInstallCheck_CB != null)
					{
						XecureCertShare.mXCSXFree.mInstallCheck_CB ("XecureCertShare_NEED_INSTALL");
						XecureCertShare.mXCSXFree.mInstallCheck_CB = null;
					}
					else if (XecureCertShare.mXCSXFree.mIgnoreInstallPage != true)
					{
						var selectResult = confirm ("[CertShareXFree] 인증서 중계 프로그램 설치가 필요합니다.\n[확인]을 선택하시면 설치페이지로 연결됩니다.");
						if (selectResult)
							location.href = XecureCertShare.mPlatform.aInstallPage;

						XecureCertShare.mXCSXFree.mImgIntervalError = true;
					}
				}
			}
		};

		xdrSocket.ontimeout = function(){};
		xdrSocket.onprogress = function(){};
		xdrSocket.timeout = gSocketTimeout;
	}

	function _doSend (message) {
		gPingEnable = false;
		xdrSocket.open("POST", gURL);
		xdrSocket.send(message);
	}

	function _doAjaxSend (message, timeout) {

		gPingEnable = false;

		if( timeout === undefined)
		{
			setTimeout( function () {_doSend (message);}, gStartInterval);
		}
		else
		{
			setTimeout( function () {_doSend (message);}, timeout );
		}
	}

	function _createData (args) {
		// Create protocol message
		var interfaceName = args[0];
		var messageuid = args[args.length-1];

		var data = [];
		for (i = 0; i < args.length-2; i++)
			data[i] = String(args[i+1]);

		var paramLength = String(args.length-2);
	
		var aMemberFilter = {InterfaceName:interfaceName,
							 ParameterLength:paramLength,
							 Parameter:data,
							 MessageUID: messageuid,
							 SessionID: gSessionID};

		return aMemberFilter;
	}

	_createJSONData = function (aMemberFilter) {
		var aJSONProtocol = {protocolType:gProtocolType,
							 message:aMemberFilter,
							 hash:""};

		return JSON.stringify(aJSONProtocol);
	}

	function _setAttributeInfo (timeout) {
		var input = [];
		var aRandom = new Date().getTime() + Math.floor(Math.random() * 1000);

		input.push("setAttributeInfo");
		input.push("check_Version=" + XecureCertShare.mXCSXFree.mVersion);
//		input.push("put_LicenseN=" + XecureCertShare.mLicense);
//		input.push("put_StorageN=" + XecureCertShare.mStorage);
//		input.push("put_SecOptionN=" + XecureCertShare.mSecurityOption);
//		input.push("put_SecContextN=" + XecureCertShare.mSecurityContext);
//		input.push("put_LanguageN=" + XecureCertShare.mLanguage);
//		input.push("put_CharsetN=" + XecureCertShare.mCharset);
//		input.push("put_ProxyUsageN=" + XecureCertShare.mXCSXFree.mProxyUsage);
//		input.push("put_TransKeyN=");
//		if (XecureCertShare.mXCSXFree.mITGT)
//			input.push("put_Integrity=" + XecureCertShare.mXCSXFree.mITGT);
		input.push(aRandom);

		var message = _createData(input);
		var result = _createJSONData (message);

		_doAjaxSend (result,timeout); 
	}

	function _setDemonInfo (timeout) {
		var input = [];
		var aRandom = new Date().getTime() + Math.floor(Math.random() * 1000);

		input.push("launcher");
		input.push(XecureCertShare.mBrowser.aName);
		input.push(1);
		input.push(XecureCertShare.mXCSXFree.mVersion);
		input.push(aRandom);

		var message = _createData(input);
		var result = JSON.stringify(message);

		return result;
	}

	function _sendPingInfo (payload,timeout) {
		var input = [];
		var aRandom = new Date().getTime() + Math.floor(Math.random() * 1000);

		input.push ("ping");
		input.push (payload);
		input.push (aRandom);

		var message = _createData(input);
		var result = _createJSONData(message);

		_doAjaxSend(result,timeout);
		
		return aRandom;
	}

	function _setUpdateState (type) {
		var input = [];
		var aRandom = new Date().getTime() + Math.floor(Math.random() * 1000);

		input.push (type);
		input.push (XecureCertShare.mXCSXFree.mVersion);
		input.push (aRandom);

		var message = _createData(input);
		var result = _createJSONData(message);

		_doAjaxSend (result);
	}

	function _getLastErrCode () {
		return gErrObject.code;
	}

	function _getLastErrMsg () {
		return gErrObject.msg;
	}

	function _resetErrAndMsg () {
		gErrObject.code = "";
		gErrObject.msg = "";
	}

	function onSendToServer(value)
	{
		if (XecureCertShare.mXCSXFree.mITGT == "")
			return 0;

		var aRet = -1;
		var aRequest = new XMLHttpRequest ();
		var aResponse = "";
		var aURL = "";
		var aMessage = "";

		aMessage = "SIGNED=" + encodeURIComponent(value);
		aMessage +=	"&ITGTVALUE=" + XecureCertShare.mXCSXFree.mITGT;
		aMessage += "&PORTVALUE=" + gConnectPort;

		aURL = XecureCertShare.mBasePath + XecureCertShare.mXCSXFree.mIntegrityPageURL;
		aRequest.open ("POST", aURL, false);
		aRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		aRequest.send (aMessage);

		try
		{
			aResponse = eval (aRequest.responseText);

			if (parseInt (aResponse["code"]) != 0)
			{
				XecureCertShare.mXCSXFree.mImgIntervalError = true;

				if (XecureCertShare.mXCSXFree.mInstallCheck_CB != null) {
					XecureCertShare.mXCSXFree.mInstallCheck_CB ("XecureCertShare_NEED_INSTALL");
					XecureCertShare.mXCSXFree.mInstallCheck_CB = null;
				}

				if (parseInt (aResponse["code"]) == -3)
					alert ("CertShareXFree 인증서 중계 프로그램이 정상적으로 동작하지 않습니다.\n재설치 또는 관리자에게 문의해주시기 바랍니다.");
				else
					alert ("오류코드:" + aResponse["code"] + "\n" + "오류메시지:" + aResponse["reason"]);
			}
			else
			{
				aRet = 0;
			}
		}
		catch (evalException)
		{
			alert ("Evaluate exception(" + evalException + "):\n" + aRequest.responseText);
		}

		return aRet;
	}

	function stripAndExecuteScript(text) {
		var scripts = '';
		var cleaned = text.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(){
			 scripts += arguments[1] + '\n';
			 return '';
		});
		
		if (scripts != "") {
			var head = document.getElementsByTagName('head')[0] || document.documentElement;
			var scriptElement = document.createElement('script');
			scriptElement.setAttribute('type', 'text/javascript');
			scriptElement.text = scripts;
			head.insertBefore(scriptElement, head.firstChild);
			head.removeChild(scriptElement);
		}
		return cleaned;
	}

	Array.prototype.removeElement = function (index)
	{
		this.splice (index, 1);
		return this;
	};

	// public
	return {
		GetWebSocket: function () {
			var port;
			if (XecureCertShare.mPlatform.aName.indexOf("windows") != 0) {
				gTrialNumber = 0;
				port = Number(XecureCertShare.mXCSXFree.mPort);
			}
			else {
				gDirectConnect = true;
				port = Number(XecureCertShare.mXCSXFree.mDirectPort);
			}

			if(window.location.protocol.indexOf("https:") == 0 ) {
				gServicePort = port + 1;
				gURL = "https://127.0.0.1:" + gServicePort;
			}
			else {
				gServicePort = port;
				gURL = "http://127.0.0.1:" + gServicePort;
			}

			if (XecureCertShare.mPlatform.aName.indexOf("windows") == 0)
				gConnectPort = gServicePort;
			
			gLauncherSocket = false;
			_getWebSocket ();
		},
		doSend: function () {
			var aRandom = new Date().getTime() + Math.floor(Math.random() * 1000);
			var mainArguments = Array.prototype.slice.call(arguments);
			mainArguments.push(aRandom);

			var message = _createData (mainArguments);
			var result = _createJSONData (message);

			_doAjaxSend(result,gSendInterval);
		},
		doAsyncSend: function () {
			var mainArguments = Array.prototype.slice.call(arguments);
			var aRandom = gRandomNumber++;
			var aDecObj;
			aDecObj = {messageuid: aRandom, elementID: mainArguments[0], funcObj: mainArguments[7], funcObjParam: mainArguments[8]}

			mainArguments.shift();
			mainArguments.push(aRandom);

			var message = _createData (mainArguments);
			
			gSendDataList.push (message);

			var aDecIntervalFunc = setInterval(function() { 
				if (gDecExeSend) {
					if (gSendDataList.length != 0) 
					{
						gDecExeSend = false;

						var result = _createJSONData (gSendDataList[0]);
						gSendDataList.shift ();
						_doSend (result);
					}
				}

				for (var i = 0; i < gDecResultList.length; i++)
				{
					for (var j = 0; i < gDecData.length; j++)
					{
						if (gDecResultList[i].MessageUID == gDecData[j].messageuid)
						{
							clearInterval(aDecIntervalFunc);
							if (gDecData[i].funcObj)
								gDecData[i].funcObj(gDecResultList[i].ReturnValue, gDecData[i].funcObjParam);
							else
								SofoXecureCertShareJQuery("#"+gDecData[j].elementID).append(gDecResultList[i].ReturnValue);

							gDecData.removeElement(j);
							gDecResultList.removeElement(i);
							break;
						}
					}
				}

			}, 10);

			gDecData.push(aDecObj);
		},
		setcallbackFunc: function (func) {
			callback = func;
		},
		getLastErrCode: function () {
			return _getLastErrCode ();
		},
		getLastErrMsg: function () {
			return _getLastErrMsg ();
		},
		resetErrAndMsg: function () {
			_resetErrAndMsg ();
		},
		resetcallbackFunc: function ()
		{
			callback = null;
		}
	};
};
