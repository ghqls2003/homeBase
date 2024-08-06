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

XecureCertShareExtension.XecureCertShareNormal = function () {
	var gURL;
	var webSocket;
	var callback = null;
	var gErrObject = {code: 0, msg: ""};
	var gSendDataList = [];
	var gDecData = [];
	var gRandomList = [];
	var gProtocolType = "general";
	var _createJSONData = null;

	var enableWS = false;
	var gProtocolFinish = false;

	var gSessionID = XecureCertShare.mXCSXFree.mSessionID;

	var gServicePort;
	var gConnectPort;
	var gTrialNumber;
	var gDynamicPortRange;

	var gDirectConnect;

	var gIntegrityRet;

	var aBrowser = XecureCertShare.mBrowser.aName;

	var gRunUpdate = false;

	var gUpdateStartTime = 0;

	eval(GetSafeResponse (loadSecurePro ("jquery-1.11.1.js")));
	var SofoXecureCertShareJQuery = jQuery.noConflict();

	function reRun () {
		if (webSocket != null)
			webSocket.close ();
		webSocket = null;
		enableWS = false;
		callback = null;
		XecureCertShare.mXCSXFree.mModuleLoad = false;
		var protocol = gURL.substring(0, gURL.length-5);
		gURL = protocol + gServicePort;

		_getWebSocket ();
	}

	function errorEventProcess () {
		if (enableWS)
		{
			console.log("[CertShareXFree][XecureCertShareNormal_error_10000]");
			try {
				var element = document.getElementById("xcs_title_guidewindow");
				if (element != null)
				{
					XecureCertShare.mXCSXFree.mDialog.oncancel ();
					alert("[onerror guide test]\n CertShare4PC.exe가 비정상적으로 종료되었습니다. 재실행합니다.");
				}
			} catch(e) {}
			reRun ();
		}
		else if (gRunUpdate == true)
		{
			console.log("[CertShareXFree][XecureCertShareNormal_error_10001]");
			var time = new Date().getTime();
			if ((time - gUpdateStartTime) > 120000)
				location.href = XecureCertShare.mPlatform.aInstallPage;
			else
				setTimeout (reRun, 2000);
		}
		else if (gIntegrityRet == "FAILED")
		{
			return;
		}
		else if (gDirectConnect == true) {
			var wsAttribute;
			if (webSocket.url)
				wsAttribute = webSocket.url;
			else
				wsAttribute = webSocket.URL;

			if (window.location.protocol == "http:" && wsAttribute.indexOf("wss:") == 0) {
				gServicePort = XecureCertShare.mXCSXFree.mDirectPort;
				gConnectPort = gServicePort;
				gURL = "ws://127.0.0.1:" + gConnectPort;
				_getWebSocket();
			}
			else {
				console.log("[CertShareXFree][XecureCertShareNormal_error_10004]");

				gDirectConnect = false;
				_serviceConnect ();
			}
		}
		else
		{
			var wsAttribute =  null;
			if (gTrialNumber < gDynamicPortRange)
			{
				if (webSocket.url)
					wsAttribute = webSocket.url;
				else
					wsAttribute = webSocket.URL;

				var type;

				if (gServicePort%2 == 0)
				{
					// ws->wss
					type = "wss";
					gServicePort = gServicePort+3;
				}
				else
				{
					// wss->ws
					type = "ws";
					gServicePort = gServicePort-1;
					gTrialNumber++;
				}

				if (window.location.protocol == "https:" && type == "ws")
				{
					// https only wss
					type = "wss";
					gServicePort = gServicePort+3;
				}

				if (aBrowser == "explorer")
					gURL = type + "://127.0.0.1:" + gServicePort;
				else
					gURL = type + "://localhost:" + gServicePort;

				console.log("[CertShareXFree][XecureCertShareNormal_error_10005][" + gServicePort + "]");
				_getWebSocket ();
			} 
			else {
				console.log("[CertShareXFree][XecureCertShareNormal_error_10006]");
				if (XecureCertShare.mXCSXFree.mInstallCheck_CB != null) 
				{
					setTimeout (function () {
							XecureCertShare.mXCSXFree.mInstallCheck_CB ("XecureCertShare_NEED_INSTALL");
							XecureCertShare.mXCSXFree.mInstallCheck_CB = null;
					}, 100);
				}
				else if (XecureCertShare.mXCSXFree.mIgnoreInstallPage != true)
				{
					alert ("[CertShareXFree] 인증서 중계 프로그램 설치가 필요합니다.\n[확인]을 선택하시면 설치페이지로 연결됩니다.");
					location.href = XecureCertShare.mPlatform.aInstallPage;
				}
			}
		}
	}

	function _getWebSocket () {
		try
		{
			webSocket = new WebSocket(gURL);
		}
		catch (err)
		{
			alert ("[WebSocket Error Message] : " + err);
		}
		
		webSocket.onopen = function(e) {
			var wsAttribute;
			if (webSocket.url)
				wsAttribute = webSocket.url;
			else
				wsAttribute = webSocket.URL;

			if (wsAttribute.indexOf(gServicePort) < 0 || gDirectConnect == true)
			{
				enableWS = true;
				if (wsAttribute.indexOf("wss:") == 0)
				{
					gProtocolFinish = true;
					_setAttributeInfo ();
				}
				else if(wsAttribute.indexOf("ws:") == 0)
				{
					Secure.start("secure", _doSend);
				}
			}
			else
			{
				setTimeout(_setDemonInfo, 30);
			}
		};
		
		webSocket.onclose = function(e) {
			if (aBrowser == "safari")
				errorEventProcess ();
		};

		webSocket.onmessage = function(e) {
			var aData, aProtocolData, aContact, aFuncname, aType, aValue, aMessageUID, aSessionID;
			var isDec = false;

			aData = e.data;
			aProtocolData = JSON.parse(aData);
			aProtocolType = aProtocolData.protocolType;
			aContact = aProtocolData.message;

			if (aProtocolType == "secure")
			{
				try {
					aMessageType = aContact.messageType;
					switch (aMessageType)
					{
						case "finish":
							if (Secure.finish (aProtocolData))
							{
								gProtocolType = "secure";
								gProtocolFinish = true;
								_createJSONData = function (message) {
									var JSONData = JSON.stringify(message);
									return Secure.sendApplication (JSONData);
								}
								_setAttributeInfo ();
							}
							else {
								_getWebSocket ();
							}
							return;
						case "application":
							aContact = JSON.parse (Secure.receiveApplication (aProtocolData));
							break;
						case "server_hello":
							Secure.handShake (_doSend, aProtocolData);
							return;
						default:
							alert(aContact.code);
							return;
					}
				}
				catch (err)
				{
					alert("secure protocol try/catch error : " + err);
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

				if (XecureCertShare.mXCSXFree.mInstallCheck_CB != null)
					XecureCertShare.mXCSXFree.mInstallCheck_CB ("XecureCertShare_INTEGRITY_FAIL");
				else {
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
						// error
						XecureCertShare.mXCSXFree.mImgIntervalError = true;

						var msg = "[" + gErrObject.code + "] [" + eval("XecureCertShare_ERROR_" + gErrObject.code) + "]";
						reRun ();
						alert(msg);
					}
					else if (gErrObject.code == "30001")
					{
						// update
						if (XecureCertShare.mXCSXFree.mInstallCheck_CB != null) 
						{
							webSocket.close ();
							setTimeout (function () {
								XecureCertShare.mXCSXFree.mInstallCheck_CB ("XecureCertShare_NEED_UPDATE");
								XecureCertShare.mXCSXFree.mInstallCheck_CB = null;
							}, 100);
							return;
						}

						if (XecureCertShare.mXCSXFree.mLiveUpdate)
						{
							if (gRunUpdate) {
								var time = new Date().getTime();
								if ((time - gUpdateStartTime) > 120000)
									location.href = XecureCertShare.mPlatform.aInstallPage;
								else
									setTimeout (_setDemonInfo, 2000);
							} else {
								gUpdateStartTime = new Date().getTime();
								console.log ("send message: updateready");
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
						// run Demon
						var portList = aValue.split(","); 
						var protocol = gURL.substring(0, gURL.length-5);
						if (protocol.indexOf("wss:") == 0)
						{
							gConnectPort = portList[1];
							gURL = protocol + portList[1];
						}
						else
						{
							gConnectPort = portList[0];
							gURL = protocol + portList[0];
						}

						webSocket = null;

						if (gRunUpdate)
						{
							gRunUpdate = false;
							setTimeout (_getWebSocket, 2000);
						}
						else
						{
							_getWebSocket ();
						}
					}
					else
					{
						location.href = XecureCertShare.mPlatform.aInstallPage;
					}
					break;
				case "setAttributeInfo":
					if (gErrObject.code == 30006 || gErrObject.code == 30001) {
						gDirectConnect = false;
						gProtocolFinish = false;
						_serviceConnect ();
						return;
					}

					XecureCertShare.mXCSXFree.mModuleLoad = true;
					console.log("[CertShareXFree][XecureCertShareNormal_onmessage_01004]");

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
					break;
				case "updateready":
					console.log ("receive message: updateready");
					if (gErrObject.code == 0)
					{
						var aElement = document.getElementById("CertShare4PCLoadingImg");
						aElement.src = XecureCertShare.mBasePath + "/img/loading_update.gif";

						gRunUpdate = true;
						console.log ("send message: updatestart");
						_setUpdateState ("updatestart");
						setTimeout (reRun, 5000);
					}
					else
					{
						alert("[CertShareXFree] 중계 프로그램의 업데이트 설치에 실패하였습니다. 설치페이지로 이동합니다.\n" + "[오류코드] : " + gErrObject.code);
						location.href = XecureCertShare.mPlatform.aInstallPage;
					}
					break;
				case "updatestart":
					console.log ("receive message: updatestart");
					break;
				default:
					if (callback)
						callback (aValue);
			}
		};

		webSocket.onerror = function(e) {
			errorEventProcess ();
		};
	}

	function _doSend (message) {
		if (webSocket.readyState == 0) {
			setTimeout (function () {webSocket.send(message);}, 100);
		} else {
			webSocket.send(message);
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
	
		// Create 'message' 
		var aMemberFilter = {InterfaceName:interfaceName,
							 ParameterLength:paramLength,
							 Parameter:data,
							 MessageUID: messageuid,
							 SessionID: gSessionID};

		return aMemberFilter;
	}

	_createJSONData = function (aMemberFilter) {
		// Create protocol json text
		var aJSONProtocol = {protocolType:gProtocolType,
							 message:aMemberFilter,
							 hash:""};

		return JSON.stringify(aJSONProtocol);
	}

	function _setAttributeInfo () {
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

		_doSend (result);
	}

	function _setDemonInfo () {
		var input = [];
		var aRandom = new Date().getTime() + Math.floor(Math.random() * 1000);

		input.push("launcher");
		input.push(aBrowser);
		input.push(1);
		input.push(XecureCertShare.mXCSXFree.mVersion);
		input.push(aRandom);

		var message = _createData(input);
		var result = JSON.stringify(message);

		_doSend (result);
	}

	function _getVersionInfo () {
		var input = [];
		var aRandom = new Date().getTime() + Math.floor(Math.random() * 1000);

		input.push ("getVersionInfo");
		input.push ("");
		input.push (aRandom);

		var message = _createData(input);
		var result = _createJSONData(message);

		_doSend (result);
	}

	function _setUpdateState (type) {
		var input = [];
		var aRandom = new Date().getTime() + Math.floor(Math.random() * 1000);

		input.push (type);
		input.push (XecureCertShare.mXCSXFree.mVersion);
		input.push (aRandom);

		var message = _createData(input);
		var result = _createJSONData(message);

		_doSend (result);
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

	function _getRandomUID () {
		var randN;
		var getRandomFlag = false;
		while(!getRandomFlag)
		{
			randN = Math.floor(Math.random() * 1000);
			gRandomList.push(randN);
			if (gRandomList.length == 1)
				getRandomFlag = true;

			for (var i = 0; i < gRandomList.length-1; i++)
			{
				if (gRandomList[i] == randN)
				{
					getRandomFlag = false;
					break;
				}
				else
					getRandomFlag= true;
			}

			if (getRandomFlag)
				break;
		}
		return randN;
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
					return;
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

		var head = document.getElementsByTagName('head')[0];
		var scriptElement = document.createElement('script');
		scriptElement.setAttribute('type', 'text/javascript');
		if (aBrowser == "firefox") {
			scriptElement.innerHTML = scripts;
		}
		else {
			scriptElement.innerText = scripts;
		}
		head.appendChild(scriptElement);
		head.removeChild(scriptElement);
		
		return cleaned;
	}

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

	function _serviceConnect () {
		gDirectConnect = false;
		gServicePort = Number(XecureCertShare.mXCSXFree.mPort)+1;

		if (aBrowser == "explorer")
			gURL = "wss://127.0.0.1:" + gServicePort;
		else
			gURL = "wss://localhost:" + gServicePort;

		gTrialNumber = 0;

		gDynamicPortRange = XecureCertShare.mXCSXFree.mTrialPortRange;
		if (window.location.protocol == "http:")
			gDynamicPortRange = gDynamicPortRange + 1;

		_getWebSocket ();
	}

	// public
	return {
		GetWebSocket: function () {
			// default wss
			if (XecureCertShare.mPlatform.aName.indexOf("windows") == 0)
			{
				gDirectConnect = true;
				gServicePort = Number(XecureCertShare.mXCSXFree.mDirectPort)+1;
				gConnectPort = gServicePort;
				if (aBrowser == "explorer")
					gURL = "wss://127.0.0.1:" + gServicePort;
				else
					gURL = "wss://localhost:" + gServicePort;

				_getWebSocket ();
			}
			else
			{
				_serviceConnect ();
			}
		},
		doSend: function () {
			var aRandom = new Date().getTime() + Math.floor(Math.random() * 100) + 1;
			var mainArguments = Array.prototype.slice.call(arguments);
			mainArguments.push(aRandom);

			var message = _createData (mainArguments);
			var result = _createJSONData (message);

			_doSend(result);
		},
		doAsyncSend: function () {
			var mainArguments = Array.prototype.slice.call(arguments);
			var aRandom = _getRandomUID ();
			var aDecObj;
			aDecObj = {messageuid: aRandom, elementID: mainArguments[0], funcObj: mainArguments[7], funcObjParam: mainArguments[8]}

			gDecData.push(aDecObj);

			mainArguments.shift();
			mainArguments.push(aRandom);

			var message = _createData (mainArguments);
			var result = _createJSONData (message);
			
			if (gProtocolFinish)
				_doSend(result);
			else
				gSendDataList.push(message);
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
		resetcallbackFunc: function () {
			callback = null;
		}
	};
};
