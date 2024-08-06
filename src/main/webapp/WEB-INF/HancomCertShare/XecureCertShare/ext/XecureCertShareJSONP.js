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

XecureCertShareExtension.XecureCertShareJSONP = function () {
	var	JSONPObject = null,
		JpMap,
		gSendDataList,
		gReceiveDataList = [],
		gDecDataList = [],
		gURL,
		gConnectPort,
		gIntegrityRet,
		gTrialNumber,
		gDirectConnect,
//		gDirectConnectFailCount = 0;
		gConnectFailCount = 0,
		gRandomNumber = new Date().getTime() + Math.floor(Math.random() * 1000);
		gBlockSize = 1000,
		gSessionID = XecureCertShare.mXCSXFree.mSessionID,
		gProtocolType = "general",
		gCallback = null,
		gRunUpdate = false,
		gUpdateStartTime = 0,
		gIdleTime = 20000,
		gLastMessageTime = null,
		gPingFunction = null,
		gPongMessage = "",
		gPingPongStart = false,
		gAjaxTimeout = 5000,
		gErrObject = {code: 0, msg: ""};

	eval(GetSafeResponse (loadSecurePro ("json2.js")));
	eval(GetSafeResponse (loadSecurePro ("jquery-1.11.1.js")));

	var SofoXecureCertShareJQuery = jQuery.noConflict();

	JpMap = function () {
		this.map = new Object();
	}

	JpMap.prototype = {
		put: function (key, value) {
			this.map[key] = value;
		},
		get: function (key) {
			return this.map[key];
		},
		remove: function (key) {
			delete this.map[key];
		},
		size: function () {
			var count = 0;
			for (var prop in this.map) {
				count++;
			}
			return count;
		},
		shift: function (key) {
			this.map[key].shift ();
		}
	}

	gSendDataList = new JpMap ();

	function _startJSONP () {
		this.isConnected = false;
		this.settingOK = false;
		this.isExec = true;
		this.send = function (aRequestMessage) {
			SofoXecureCertShareJQuery.ajax({
				url: gURL,
				type: 'GET',
				data: {'senddata': aRequestMessage},
				dataType: 'jsonp',
				jsonp: 'callback',
				timeout: gAjaxTimeout,
				success: function (aResultData) {
					JSONPObject.isConnected = true;
					gLastMessageTime = new Date().getTime();

					if (typeof aResultData.message == "undefined")
					{
						gReceiveDataList.push (aResultData);
					}
					else if (aResultData.message.InterfaceName == "pong")
					{
						gPongMessage = aResultData.message.ReturnValue;
					}
					else
					{
						gReceiveDataList.push (aResultData.message);
					}

					JSONPObject.isExec = true;
				},
				error: function () {
					if (gRunUpdate == true)
					{
						console.log("[CertShareXFree][XecureCertShareSONP_error_10001]");
						var time = new Date().getTime();
						if ((time - gUpdateStartTime) > 120000)
							location.href = XecureCertShare.mPlatform.aInstallPage;
						else
							setTimeout (reRun, 2000);
					}
					else if (JSONPObject.isConnected == true)
					{
						console.log("[CertShareXFree][XecureCertShareJSONP_error_10000]");
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
							if (element != null) {
								XeecureCertShare.mXCSXFree.mDialog.oncancel ();
							}
						}
						catch(e) {}

						gConnectFailCount++;
						reRun ();
					}
					else if (gIntegrityRet == "FAILED")
					{
						return;
					}
					else if (gDirectConnect == true) {
						/*
						gDirectConnectFailCount++;
						if (gDirectConnectFailCount >= 5) {
							gDirectConnectFailCount = 0;
							gDirectConnect = false;
							gServicePort = Number(XecureCertShare.mXCSXFree.mPort) + 1;
							gTrialNumber = 0;
							console.log("[CertShareXFree][XecureCertShareJSONP_error_10004]");

							reRun ();
						} else {
							console.log("[CertShareXFree][XecureCertShareJSONP_error_10007][" + gDirectConnectFailCount + "]");
							JSONPObject = null;
							setTimeout (_getWebSocket, 1000);
						}
						*/
						gDirectConnect = false;
						gServicePort = Number(XecureCertShare.mXCSXFree.mPort) + 1;
						gTrialNumber = 0;
						console.log("[CertShareXFree][XecureCertShareJSONP_error_10004]");

						reRun ();
					}
					else
					{
						if (gTrialNumber < XecureCertShare.mXCSXFree.mTrialPortRange)
						{
							gTrialNumber++;
							gServicePort = gServicePort + 2;							
							console.log("[CertShareXFree][XecureCertShareJSONP_error_10005][" + gServicePort + "]");
							reRun();
						}
						else
						{
							console.log("[CertShareXFree][XecureCertShareJSONP_error_10006]");
							// 미설치 또는 서비스 접속 실패. 
							if (XecureCertShare.mXCSXFree.mInstallCheck_CB != null) 
							{
								XecureCertShare.mXCSXFree.mInstallCheck_CB ("XecureCertShare_NEED_INSTALL");
								XecureCertShare.mXCSXFree.mInstallCheck_CB = null;
							}
							else 
							{
								var selectResult = confirm("[CertShareXFree] 인증서 중계 프로그램 설치가 필요합니다.\n[확인]을 선택하시면 설치페이지로 연결됩니다.");
								if (selectResult)
									location.href = XecureCertShare.mPlatform.aInstallPage;

								XecureCertShare.mXCSXFree.mImgIntervalError = true;
							}
						}
					}
				}
			});
		}
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

				if (parseInt (aResponse["code"]) == -1200)
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

		if (scripts != "")
			window.execScript(scripts);
		
		return cleaned;
	}

	function _onMessage (aData, aElementID, aFunc, aFuncParam) {

		
		var aInterfaceName = aData.InterfaceName;
		var aType = aData.ReturnType;
		var aValue = aData.ReturnValue;
		var aMessageUID = aData.messageuid;
		if (aType == "number")
			aValue = Number(aData.ReturnValue);
		else
			aValue = aData.ReturnValue;

		gErrObject.code = aData.InterfaceErrorCode;
		gErrObject.msg = aData.InterfaceErrorMessage;

		if (gErrObject.code == "21000") {
			alert("[integrity error] 파일이 변조되었습니다.\n악의적 공격에 의해 수정되었을 가능성이 있습니다.\n재설치 하시기 바랍니다.");

			if (XecureCertShare.mXCSXFree.mInstallCheck_CB != null)
				XecureCertShare.mXCSXFree.mInstallCheck_CB ("XecureCertShare_INTEGRITY_FAIL");
			else
				location.href = XecureCertShare.mPlatform.aInstallPage;

			return;
		}

		switch (aInterfaceName)
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
						XecureCertShare.mXCSXFree.mInstallCheck_CB ("XecureCertShare_NEED_UPDATE");
						XecureCertShare.mXCSXFree.mInstallCheck_CB = null;
						return;
					}

					if (XecureCertShare.mXCSXFree.mLiveUpdate) {
						if (gRunUpdate) {
							var time = new Date().getTime();
							if ((time - gUpdateStartTime) > 120000)
								location.href = XecureCertShare.mPlatform.aInstallPage;
							else
								setTimeout (_setDemonInfo, 2000);
						} else {
							gUpdateStartTime = new Date().getTime();
							gAjaxTimeout = 120000;
							setTimeout (function () {
								var aElement = document.getElementById("CertShare4PCLoadingImg");
								aElement.src = XecureCertShare.mBasePath + "/img/loading_update.gif";
							}, 2000);
							_setUpdateState ("updateready");
						}
					}
					else {
						if (XecureCertShare.mXCSXFree.mIgnoreInstallPage != true)
							location.href = XecureCertShare.mPlatform.aInstallPage;
					}
				}
				else if (gErrObject.code == 0)
				{
					// run Demon
					var portList = aValue.split(","); 
					var protocol = gURL.substring(0, gURL.length-5);
					gURL = protocol + portList[1];
					gConnectPort = portList[1];

					if (gRunUpdate)
					{
						gRunUpdate = false;
						setTimeout (function () {
										JSONPObject = new _startJSONP ();
										_setAttributeInfo ();
									}, 2000);
					}
					else
					{
						//JSONPObject = new _startJSONP ();
						_setAttributeInfo ();
					}
				}
				else
				{
					location.href = XecureCertShare.mPlatform.aInstallPage;
				}
				break;
			case "setAttributeInfo":
				if (gErrObject.code == 30006 || gErrObject.code == 30001) {
					gServicePort = Number(XecureCertShare.mXCSXFree.mPort) + 1;
					gDirectConnect = false;
					reRun ();
					return;
				}

				XecureCertShare.mXCSXFree.mModuleLoad = true;
				console.log("[CertShareXFree][XecureCertShareJSONP_onmessage_01004]");
				gAjaxTimeout = 120000;

				// check setAttribute result
				if (gErrObject.code == 20015)
				{
					XecureCertShare.mXCSXFree.mModuleLoad = false;
					alert("[CertShareXFree] CertShare4PC.exe 프로그램 초기화에 실패하였습니다.\n" + "[실패 명령어] : " + gErrObject.msg);
					return;
				}

				if (XecureCertShare.mXCSXFree.mInstallCheck_CB != null) 
				{
					XecureCertShare.mXCSXFree.mInstallCheck_CB ("XecureCertShare_NORMAL");
					XecureCertShare.mXCSXFree.mInstallCheck_CB = null;
				}

				// ping pong start.
				if (gPingFunction == null)
					gPingFunction = setInterval(_checkPingPong, 30000);
				break;
			case "updateready":
				if (gErrObject.code == 0)
				{
					gRunUpdate = true;
					_setUpdateState ("updatestart");
				}
				else
				{
					alert("[CertShareXFree] update error : " + gErrObject.code + "n설치페이지로 이동합니다.");
					alert("[CertShareXFree] 중계 프로그램의 업데이트 설치에 실패하였습니다. 설치페이지로 이동합니다.\n" + "[오류코드] : " + gErrObject.code);
					location.href = XecureCertShare.mPlatform.aInstallPage;
				}
				break;
			case "updatestart":
				setTimeout (reRun, 0);
				break;
			default:
				if (gCallback)
				{
					var exeFunc = gCallback;
					gCallback = null;
					exeFunc (aValue);
				}
		}
	}

	function reRun () 
	{
		gURL = "https://127.0.0.1:" + gServicePort;
		JSONPObject = null;
		JSONPObject = new _startJSONP ();
		_setDemonInfo ();
	}
	
	_doSend = function (aMessage, aMessageUID, aCurrentCnt, aTotalCnt, aElementID, isSplitData, aFuncObj, aFuncObjParam)
	{
		if (isSplitData == false)
		{
			_splitMessage (aMessage, aMessageUID, aElementID, aFuncObj, aFuncObjParam);
			return;
		}

		var aRequestJSONPData = new _setRequestJSONPData (aMessageUID, aCurrentCnt, aTotalCnt, aElementID, aFuncObj, aFuncObjParam);

		var aIntervalID = setInterval(function () {
			if (aRequestJSONPData.sendOK == true && JSONPObject.isExec == true)
			{
				var data;

				JSONPObject.isExec = false;

				data = gSendDataList.get (aRequestJSONPData.messageuid);
				data = data[0];
				data = _createData (data, aRequestJSONPData, true);

				JSONPObject.send (data);
				data = null;
				gSendDataList.shift (aRequestJSONPData.messageuid);
				aRequestJSONPData.sendOK = false;
			}
			
			for (var i = 0; i < gReceiveDataList.length; i++)
			{
				if (gReceiveDataList[i].MessageUID == aRequestJSONPData.messageuid)
				{
					clearInterval (aIntervalID);

					if (gReceiveDataList[i].InterfaceName == "JSONP")
					{
						var currentCnt = ++aRequestJSONPData.currentCnt;
						var totalCnt = aRequestJSONPData.totalCnt;
						gReceiveDataList.splice (i, 1);
						_doSend ("", aMessageUID, currentCnt, totalCnt, aElementID, true, aFuncObj, aFuncObjParam);
					}
					else
					{
						_onMessage (gReceiveDataList[i], aRequestJSONPData.elementid, aRequestJSONPData.funcObj, aRequestJSONPData.funcObjParam);
						aRequestJSONPData = null;
						gReceiveDataList.splice (i, 1);
					}
				}
			}
		}, 10);
	}

	_splitMessage = function (aMessage, aMessageUID, aElementID, aFuncObj, aFuncObjParam) 
	{
		var dataList = [];
		var index = 0;

		var size = aMessage.length;
		var splitSize = parseInt (size/gBlockSize);

		if ( (size%gBlockSize) > 0)
			splitSize++;

		for (var i = 0; i < splitSize; i++)
		{
			index += gBlockSize;
			var sData = aMessage.substring (i*gBlockSize, index);

			dataList.push (sData);
		}

		gSendDataList.put (aMessageUID, dataList);
		_doSend (aMessage, aMessageUID, 0, splitSize, aElementID, true, aFuncObj, aFuncObjParam);
	}

	function _checkPingPong () {
		var currentTime = new Date().getTime();
		if ((currentTime - gLastMessageTime) > gIdleTime) {
			if (JSONPObject.isExec == true) {
				JSONPObject.isExec = false;
				if (gPongMessage != "heartbeat" && gPingPongStart == true)
				{
					// assume Local Server is disable or not executed.
					clearInterval (gPingFunction);
					reRun ();
				}
				else
				{
					_sendPingInfo ();
				}
			}
		}
	}

	//------------------------------------------------------------------------------
	// create data.
	//------------------------------------------------------------------------------
	_createJSONData = function (aMemberFilter) {
		// Create protocol json text
		var aJSONProtocol = {protocolType:gProtocolType,
							 message:aMemberFilter,
							 hash:""};

		return JSON.stringify(aJSONProtocol);
	}

	function _setRequestJSONPData (aMessageUID, aCurrentCnt, aTotalCnt, aElementID, aFuncObj, aFuncObjParam)
	{
		this.messageuid = aMessageUID;
		this.funcObj = aFuncObj;
		this.funcObjParam = aFuncObjParam;
		this.currentCnt = aCurrentCnt;
		this.totalCnt = aTotalCnt;
		this.elementid = aElementID;
		this.sendOK = true;
	}

	function _createData (args, infoObject, isBase64)
	{
		// Create protocol message
		var interfaceName,
			paramLength,
			messageuid,
			data = [];

		if (isBase64)
			interfaceName = "JSONP";
		else
			interfaceName = args[0];

		if (isBase64)
		{
			data[0] = infoObject.currentCnt.toString();
			data[1] = infoObject.totalCnt.toString();
			data[2] = args;

			messageuid = infoObject.messageuid.toString();
			paramLength = "3";
		}
		else
		{
			messageuid = args[args.length-1];
			messageuid = messageuid.toString();
			for (i = 0; i < args.length-2; i++)
				data[i] = String(args[i+1]);

			paramLength = String(args.length-2);
		}
	
		// Create 'message' 
		var aMemberFilter = {InterfaceName:interfaceName,
							 ParameterLength:paramLength,
							 Parameter:data,
							 MessageUID: messageuid,
							 SessionID: gSessionID};

		if (isBase64)
			return JSON.stringify (aMemberFilter);
		else
			return aMemberFilter;
	}
	//------------------------------------------------------------------------------
	//------------------------------------------------------------------------------

	//------------------------------------------------------------------------------
	// setting.
	//------------------------------------------------------------------------------
	function _setAttributeInfo () {
		var result,
			message,
			input = [],
			aRandom = gRandomNumber++;

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

		message = _createData(input, false);
		result = _createJSONData (message);
		result = encodeURIComponent (result);

		_doSend (result, aRandom, 0, 0, "", false);
	}

	function _setDemonInfo () {
		var input = [],
			aRandom = gRandomNumber++;

		input.push("launcher");
		input.push(XecureCertShare.mBrowser.aName);
		input.push(1);
		input.push(XecureCertShare.mXCSXFree.mVersion);
		input.push(aRandom);

		var message = _createData(input, false);
		var result = JSON.stringify(message);
		result = encodeURIComponent (result);

		_doSend (result, aRandom, 0, 0, "", false);
	}

	function _setUpdateState (type) {
		var input = [],
			aRandom = gRandomNumber++;

		input.push (type);
		input.push (XecureCertShare.mXCSXFree.mVersion);
		input.push (aRandom);

		var message = _createData(input);
		var result = _createJSONData(message);
		result = encodeURIComponent (result);

		_doSend (result, aRandom, 0, 0, "", false);
	}

	function _sendPingInfo () {
		var input = [],
			aRandom = gRandomNumber++;

		input.push ("ping");
		input.push ("heartbeat");
		input.push (aRandom);

		var message = _createData(input);
		var result = _createJSONData(message);
		result = encodeURIComponent (result);

		result = _createData (result, {messageuid: aRandom, currentCnt: 0, totalCnt: 1}, true);
		gPingPongStart = true;
		JSONPObject.send (result);
	}
	//------------------------------------------------------------------------------
	//------------------------------------------------------------------------------

	//------------------------------------------------------------------------------
	// etc.
	//------------------------------------------------------------------------------
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

	function _getWebSocket () {
		if (XecureCertShare.mPlatform.aName.indexOf("windows") == 0) {
			gDirectConnect = true;
			gServicePort = Number(XecureCertShare.mXCSXFree.mDirectPort)+1;
			gConnectPort = gServicePort;
		} else {
			gServicePort = Number(XecureCertShare.mXCSXFree.mPort) + 1;
		}

		gURL = "https://127.0.0.1:" + gServicePort;

		if (JSONPObject == null)
			JSONPObject = new _startJSONP ();

		if (XecureCertShare.mPlatform.aName.indexOf("windows") == 0) {
			_setAttributeInfo ();
		}
		else {
			gTrialNumber = 0;
			_setDemonInfo ();
		}
	}
	//------------------------------------------------------------------------------
	//------------------------------------------------------------------------------

	return {
		GetWebSocket: function () {
			_getWebSocket();
		},
		doSend: function () {
			var aRandomN = gRandomNumber++;
			var mainArguments = Array.prototype.slice.call(arguments);
			mainArguments.push(aRandomN);

			var message = _createData (mainArguments);
			var result = _createJSONData (message);
			result = encodeURIComponent (result);

			_doSend (result, aRandomN, 0, 0, "", false);
		},
		doAsyncSend: function () {
			var mainArguments = Array.prototype.slice.call(arguments);
			var aRandomN = gRandomNumber++;
			var aElementID = mainArguments[0];

			mainArguments.shift();
			mainArguments.push(aRandomN);

			var message = _createData (mainArguments);
			var result = _createJSONData (message);
			result = encodeURIComponent (result);

			var argument_funcObj, argument_funcObjParam;
			argument_funcObj = mainArguments[6];
			argument_funcObjParam = mainArguments[7];

			if (XecureCertShare.mXCSXFree.mModuleLoad) 
				_doSend (result, aRandomN, 0, 0, aElementID, false, argument_funcObj, argument_funcObjParam);
			else
				gDecDataList.push ({messageuid: aRandomN, message: result, elementid: aElementID, funcObj: argument_funcObj, funcObjParam: argument_funcObjParam});
		},
		setcallbackFunc: function (func) {
			gCallback = func;
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
			gCallback = null;
		}
	};
};
