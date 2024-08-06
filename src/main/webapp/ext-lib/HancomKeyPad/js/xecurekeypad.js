var XecureKeypad;

(function () 
{
	if(!XecureKeypad) XecureKeypad = {};
}());

XecureKeypad.Keypad = function ( aObjectName, aE2EURL ) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.Keypad = function ( aObjectName, aE2EURL )");
	console.log("xecurekeypad.js >>> XecureKeypad.Keypad = function ( aObjectName, aE2EURL )");

	var aArguments = [null];
	this.mUserCallback = null;
	var mObjectName = aObjectName;
	
	var mBrowserInformation = new XecureKeypad.XSBrowserInformation ();

	/************************************************************************/
	
	aArguments = [aE2EURL];

	this.getBrowserInformation = function () 
	{
		return mBrowserInformation;
	};

	this.getObjectName = function ()
	{
		return mObjectName;
	};

	gXSSession.Create('Keypad', mObjectName, aArguments);

	/************************************************************************/
};

/**
 * @brief local 모드 키패드 startKeypad.
 */
XecureKeypad.Keypad.prototype.startKeypad = function ( aUserCallback, aKeyPadType ) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.startKeypad = function ( aUserCallback, aKeyPadType )");
	console.log("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.startKeypad = function ( aUserCallback, aKeyPadType )");

	var aArguments = [aKeyPadType];
	
	/************************************************************************/

	this.mUserCallback = aUserCallback;
	gXSSession.executeMethod (this.getObjectName (), 'startKeypad', 'startKeypadCallback', aArguments);

	/************************************************************************/
};
/**
 * @brief local 모드 키패드 startKeypadCallback.
 */
XecureKeypad.Keypad.prototype.startKeypadCallback = function ( aResult ) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.startKeypadCallback = function ( aResult == " + aResult + " )");
	console.log("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.startKeypadCallback = function ( aResult == " + aResult + " )");

	var aCallbackFunction = null;

	var aJSONParser = null;
	var aSessionID = null;
	var aCount = 0;

	/************************************************************************/

	aJSONParser = eval (aResult);
	aSessionID = aJSONParser.sessionid;
	aCount = aJSONParser.count;
	aCallbackFunction = new Function ( this.mUserCallback + " (\"" + aSessionID + "\",\"" + aCount + "\" );");
	aCallbackFunction ();

	/************************************************************************/
};

/**
 * @brief E2E 모드 키패드 startKeypad.
 */
XecureKeypad.Keypad.prototype.startE2EKeypad = function ( aUserCallback, aKeyPadType ) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.startE2EKeypad = function ( aUserCallback, aKeyPadType )");
	console.log("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.startE2EKeypad = function ( aUserCallback, aKeyPadType )");

	var aArguments = [aKeyPadType];
	
	/************************************************************************/

	this.mUserCallback = aUserCallback;
	gXSSession.executeMethod (this.getObjectName (), 'startKeypad', 'startE2EKeypadCallback', aArguments);

	/************************************************************************/
};
/**
 * @brief E2E 모드 키패드 startKeypadCallback.
 */
XecureKeypad.Keypad.prototype.startE2EKeypadCallback = function ( aResult ) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.startE2EKeypadCallback = function ( aResult )");
	console.log("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.startE2EKeypadCallback = function ( aResult )");

	var aCallbackFunction = null;

	var aJSONParser = null;
	var aSessionID = null;
	var aToken = null;
	var aE2EData = null;
	var aCount = 0;

	/************************************************************************/

	aJSONParser = eval (aResult);
	aSessionID = aJSONParser.sessionid;
	aToken = aJSONParser.token;
	aE2EData = aJSONParser.e2edata;
	aCount = aJSONParser.count;
	aCallbackFunction = new Function ( this.mUserCallback + " (\"" + aSessionID + "\",\"" + aToken + "\",\"" + aE2EData + "\",\"" + aCount + "\" );");
	aCallbackFunction ();

	/************************************************************************/
};

/**
 * @brief local 모드 키패드에서는 데이터를 가져오기 위한 getData 함수가 필요.
 */
XecureKeypad.Keypad.prototype.getData = function (aSessionID, aUserCallback) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.getData = function (aSessionID, aUserCallback)");
	console.log("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.getData = function (aSessionID, aUserCallback)");

	var aArguments = [null];
	
	/************************************************************************/

	this.mUserCallback = aUserCallback;

	aArguments = [aSessionID];
	gXSSession.executeMethod (this.getObjectName (), 'getData', 'getDataCallback', aArguments);

	/************************************************************************/
};
/**
 * @brief local 모드 키패드에서는 데이터를 가져오기 위한 callback 함수.
 */
XecureKeypad.Keypad.prototype.getDataCallback = function ( aResult ) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.getDataCallback = function ( aResult ) == " + aResult);
	console.log("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.getDataCallback = function ( aResult ) == " + aResult);

	var aCallbackFunction = null;

	var aJSONParser = null;
	var aData = null;

	/************************************************************************/

	aJSONParser = eval (aResult);

	aData = aJSONParser.data;
	aCallbackFunction = new Function ( this.mUserCallback + " (\"" + aData + "\" );");
	aCallbackFunction ();

	/************************************************************************/
};

// emkim
/**
 * @brief local 모드 키패드에서는 데이터를 가져오기 위한 getData 함수가 필요.
 */
XecureKeypad.Keypad.prototype.getEncryptedData = function (aSessionID, aUserCallback) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.getEncryptedData = function (aSessionID, aUserCallback)");
	console.log("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.getEncryptedData = function (aSessionID, aUserCallback)");

	var aArguments = [null];
	
	/************************************************************************/

	this.mUserCallback = aUserCallback;

	aArguments = [aSessionID];
	gXSSession.executeMethod (this.getObjectName (), 'getEncryptedData', 'getEncryptedDataCallback', aArguments);

	/************************************************************************/
};
/**
 * @brief local 모드 키패드에서는 데이터를 가져오기 위한 callback 함수.
 */
XecureKeypad.Keypad.prototype.getEncryptedDataCallback = function ( aResult ) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.getEncryptedDataCallback = function ( aResult ) :: " + aResult);
	console.log("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.getEncryptedDataCallback = function ( aResult ) :: " + aResult);

	var aCallbackFunction = null;

	var aJSONParser = null;
	var aData = null;
	var aRandomValue = null;

	/************************************************************************/

	aJSONParser = eval (aResult);
	aData = aJSONParser.aData;
	aRandomValue = aJSONParser.aRandomValue;

	aCallbackFunction = new Function ( this.mUserCallback + " (\"" + aData + "\",\"" + aRandomValue + "\" );");
	aCallbackFunction ();

	/************************************************************************/
};
/**
 * @brief local 모드 키패드에서는 데이터를 가져오기 위한 getData 함수가 필요.
 */
XecureKeypad.Keypad.prototype.getDecryptedData = function (aEncryptedData, aRandomValue, aUserCallback) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.getDecryptedData = function (aSessionID, aUserCallback)");
	console.log("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.getDecryptedData = function (aSessionID, aUserCallback)");

	var aArguments = [null];
	
	/************************************************************************/

	this.mUserCallback = aUserCallback;

	aArguments = [aEncryptedData, aRandomValue];
	gXSSession.executeMethod (this.getObjectName (), 'getDecryptedData', 'getDecryptedDataCallback', aArguments);

	/************************************************************************/
};
/**
 * @brief local 모드 키패드에서는 데이터를 가져오기 위한 callback 함수.
 */
XecureKeypad.Keypad.prototype.getDecryptedDataCallback = function ( aResult ) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.getDecryptedDataCallback = function ( aResult ) :: " + aResult);
	console.log("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.getDecryptedDataCallback = function ( aResult ) :: " + aResult);

	var aCallbackFunction = null;

	var aJSONParser = null;
	var aData = null;
	var aRandomValue = null;

	/************************************************************************/

	aJSONParser = eval (aResult);
	aData = aJSONParser.aData;

	aCallbackFunction = new Function ( this.mUserCallback + " (\"" + aData + "\" );");
	aCallbackFunction ();

	/************************************************************************/
};

XecureKeypad.Keypad.prototype.deleteObject = function ()
{
//	alert("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.deleteObject = function ()");
	console.log("xecurekeypad.js >>> XecureKeypad.Keypad.prototype.deleteObject = function ()");

	/************************************************************************/

	gXSSession.deleteObject (this.getObjectName());

	/************************************************************************/
};

XecureKeypad.XSInitialize = function () 
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSInitialize = function ()");

};

/**
 * @brief Send Web Request Message for Platform WebView
 */
XecureKeypad.XSWebRequest = function() {};
XecureKeypad.XSWebRequest.prototype.mMetroUI = function ( aNameList, aSessionID, aArguments ) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSWebRequest.prototype.mMetroUI = function ( aNameList, aSessionID, aArguments )");
	console.log("xecurekeypad.js >>> XecureKeypad.XSWebRequest.prototype.mMetroUI = function ( aNameList, aSessionID, aArguments )");

	var aTempArguments = [];
	var aRequestArguments = null;
	
	/************************************************************************/

	for (var aIter = 0; aIter < aArguments.length; ++aIter)
	{
		var aName = aArguments[aIter];

		aTempArguments.push (encodeURIComponent (aIter) + "=" + encodeURIComponent (aName));
	}
	
	aRequestArguments = aTempArguments.join('&');
	
	window.external.notify("XecureKeypad://" + aNameList + "/" + aSessionID + "?" + aRequestArguments);

	/************************************************************************/

};
XecureKeypad.XSWebRequest.prototype.mIPhone = function( aNameList, aSessionID, aArguments ) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSWebRequest.prototype.mIPhone = function( aNameList, aSessionID, aArguments )");
	console.log("xecurekeypad.js >>> XecureKeypad.XSWebRequest.prototype.mIPhone = function( aNameList, aSessionID, aArguments )");

	var aURL = null;
	var aTempArguments = [];
	var aRequestArguments = null;
	
	/************************************************************************/

	for (var aIter = 0; aIter < aArguments.length; ++aIter)
	{
		var aName = aArguments[aIter];

		aTempArguments.push (encodeURIComponent (aIter) + "=" + encodeURIComponent (aName));
	}
	
	aRequestArguments = aTempArguments.join('&');
	
	aURL = "XecureKeypad://" + aNameList + "/" + aSessionID + "?" + aRequestArguments;

	document.location = aURL;
	
	/************************************************************************/
};
XecureKeypad.XSWebRequest.prototype.mAndroid = function( aNameList, aSessionID, aArguments ) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSWebRequest.prototype.mAndroid = function( aNameList, aSessionID, aArguments )");
	console.log("xecurekeypad.js >>> XecureKeypad.XSWebRequest.prototype.mAndroid = function( aNameList, aSessionID, aArguments )");

	var aURL = null;
	var aTempArguments = [];
	var aRequestArguments = null;
	
	/************************************************************************/

	for (var aIter = 0; aIter < aArguments.length; ++aIter)
	{
		var aName = aArguments[aIter];

		aTempArguments.push (encodeURIComponent (aIter) + "=" + encodeURIComponent (aName));
	}
	
	aRequestArguments = aTempArguments.join('&');
	
	aURL = "XecureKeypad://" + aNameList + "/" + aSessionID + "?" + aRequestArguments;

	document.location = aURL;
	
	/************************************************************************/
};

/**
 * @brief Current Browser Information Value
 */
XecureKeypad.XSBrowserInformation = function () 
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSBrowserInformation = function ()");
	console.log("xecurekeypad.js >>> XecureKeypad.XSBrowserInformation = function ()");

	var aBrowserInformation = this.getBrowserInformation ();
	
	var mIsMetroUI = aBrowserInformation["metroui"];
	var mIsIPhone = aBrowserInformation["iphone"];
	var mIsAndroid = aBrowserInformation["android"];

	var mBrowserVersion = aBrowserInformation["browserversion"];
	
	var mWebRequest = aBrowserInformation["webrequest"];

	/************************************************************************/

	this.isMetroUI = function() { return mIsMetroUI; };
	this.isIPhone = function() { return mIsIPhone; };
	this.isAndroid = function() { return mIsAndroid; };
	this.sendWebRequest = function(aFunctionName, aCallback, aArguments) { mWebRequest(aFunctionName, aCallback, aArguments); };
	
	this.getBrowserVersion = function() { return mBrowserVersion; };

	/************************************************************************/
};
XecureKeypad.XSBrowserInformation.prototype.getBrowserInformation = function () 
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSBrowserInformation.prototype.getBrowserInformation = function ()");
	console.log("xecurekeypad.js >>> XecureKeypad.XSBrowserInformation.prototype.getBrowserInformation = function ()");

	var aResult = new Array(); 
	var aIsMetroUI = false;
	var aIsIPhone = false;
	var aIsAndroid = false;
	
	var aBrowserVersion = null;
	
	var aWebRequest = null;
	
	var aUserAgent		= navigator.userAgent;

	// Web Browser Constant List 
	var aMSIE					= "MSIE";
	var aXECUREWEBIPHONE		= "AppleWebKit";
	var aMETROUI				= "WebView";
	var aANDROID				= "Android";
		
	var aUNSUPPORT				= "Unsupport";
	
	/************************************************************************/
	
	if (aUserAgent.indexOf (aMSIE) != -1 && aUserAgent.indexOf(aMETROUI) != -1)				// MetroUI WebView
	{
		aIsMetroUI = true;
		aWebRequest = new XecureKeypad.XSWebRequest().mMetroUI;
	}
	else if (aUserAgent.indexOf (aANDROID) != -1)		// Android WebView
	{
		aIsAndroid = true;
		aWebRequest = new XecureKeypad.XSWebRequest().mAndroid;
	}
	else if (aUserAgent.indexOf (aXECUREWEBIPHONE) != -1 && aUserAgent.indexOf ("Mobile") != -1)			// XecureWeb for iPhone
	{
		aIsIPhone = true;
		aWebRequest = new XecureKeypad.XSWebRequest().mIPhone;
		
		//version
		var fromIndex;
		fromIndex = aUserAgent.indexOf (aXECUREWEBIPHONE);
		fromIndex += aXECUREWEBIPHONE.length;
		aBrowserVersion = aUserAgent.substring (fromIndex + 1);
		aBrowserVersion = aBrowserVersion.substring (0, aBrowserVersion.indexOf (" "));
	}
	
	aResult["metroui"] = aIsMetroUI;
	aResult["iphone"] = aIsIPhone;
	aResult["android"] = aIsAndroid;
	aResult["browserversion"] = aBrowserVersion;
	aResult["webrequest"] = aWebRequest;
	
	/************************************************************************/

	return aResult;
};

/**
 * @brief Asynchronism Management Queue 
 */
XecureKeypad.XSJobQueue = function() 
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSJobQueue = function()");
	console.log("xecurekeypad.js >>> XecureKeypad.XSJobQueue = function()");

	/************************************************************************/

	this.mQueue = [];
	this.mTimer = null;
	this.mIsRun = false;

	/************************************************************************/
};

XecureKeypad.XSJobQueue.prototype.push = function (aObject) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSJobQueue.prototype.push = function (aObject)");
	console.log("xecurekeypad.js >>> XecureKeypad.XSJobQueue.prototype.push = function (aObject)");

	/************************************************************************/

	if(this.mTimer == null)	
	{
		this.mQueue.push (aObject);
		this.mTimer = setInterval (this.runJobQueue, 100, this);
	}
	else
		this.mQueue.push(aObject);

	/************************************************************************/
};
XecureKeypad.XSJobQueue.prototype.shift = function() 
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSJobQueue.prototype.shift = function()");
	console.log("xecurekeypad.js >>> XecureKeypad.XSJobQueue.prototype.shift = function()");

	/************************************************************************/

	return this.mQueue.shift();

	/************************************************************************/
};
XecureKeypad.XSJobQueue.prototype.end = function() 
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSJobQueue.prototype.end = function()");
	console.log("xecurekeypad.js >>> XecureKeypad.XSJobQueue.prototype.end = function()");

	/************************************************************************/

	this.mIsRun = false;

	/************************************************************************/
};
XecureKeypad.XSJobQueue.prototype.runJobQueue = function ( aThis ) 
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSJobQueue.prototype.runJobQueue = function ( aThis )");
	console.log("xecurekeypad.js >>> XecureKeypad.XSJobQueue.prototype.runJobQueue = function ( aThis )");

	var aJob = [];
	var aFunctionName = null;
	
	/************************************************************************/
	
	if(aThis.mIsRun == true)
		return;
	
	aThis.mIsRun = true;
	
	aJob = aThis.shift();

	aFunctionName = aJob[0];

	if (aFunctionName == "runCreate")
	{
		gXSSession.runCreate(aJob[1], aJob[2], aJob[3]);
	}
	else if (aFunctionName == "runExecuteMethod")
	{
		gXSSession.runExecuteMethod (aJob[1], aJob[2], aJob[3], aJob[4]);
	}
	else if (aFunctionName == "runDeleteObject")
	{
		gXSSession.runDeleteObject (aJob[1]);
	}
		
	if(aThis.mQueue.length == 0)
	{
		clearInterval(aThis.mTimer);
		aThis.mTimer = null;
	}
	
	/************************************************************************/
};

/**
 * @brief Session Management 
 */
XecureKeypad.XSSession = function ( )
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSSession = function ( )");
	console.log("xecurekeypad.js >>> XecureKeypad.XSSession = function ( )");

	this.aInstance = null;
	this.aSessionDictionary = [];
	this.mJobQueue = new XecureKeypad.XSJobQueue ();

	var mSessionObjectName = null;
	var mObjectName = null;
	var mClassName = null;
	var mExcuteCallback = null;
		
	var mBrowserInformation = new XecureKeypad.XSBrowserInformation ();

	/************************************************************************/

	this.getBrowserInformation = function() 
	{
		return mBrowserInformation;
	}

	this.setSessionObjectName = function (aSessionObjectName)
	{
		mSessionObjectName = aSessionObjectName;
	}
	this.getSessionObjectName = function ()
	{
		return mSessionObjectName;
	}

	this.setClassName = function (aClassName)
	{
		mClassName = aClassName;
	}
	this.getClassName = function ()
	{
		return mClassName;
	}
	this.setObjectName = function (aObjectName)
	{
		mObjectName = aObjectName;
	}
	this.getObjectName = function ()
	{
		return mObjectName;
	}
	this.setExcuteCallback = function (aExcuteCallback)
	{
		mExcuteCallback = aExcuteCallback;
	}
	this.getExcuteCallback = function ()
	{
		return mExcuteCallback;
	}

	/************************************************************************/
};
XecureKeypad.XSSession.getInstance = function ( aSessionObjectName )
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSSession.getInstance = function ( aSessionObjectName )");
	console.log("xecurekeypad.js >>> XecureKeypad.XSSession.getInstance = function ( aSessionObjectName )");

	/************************************************************************/

	if (this.aInstance == null)
	{
		this.aInstance = new XecureKeypad.XSSession ();
		this.aInstance.setSessionObjectName( aSessionObjectName );

		return this.aInstance;
	}

	/************************************************************************/

	return this.aInstance;
};
XecureKeypad.XSSession.prototype.Create = function (aClassName, aObjectName, aArguments)
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.Create = function (aClassName, aObjectName, aArguments)");
	console.log("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.Create = function (aClassName, aObjectName, aArguments)");

	/************************************************************************/

	this.mJobQueue.push (["runCreate",
						aClassName,
						aObjectName,
						aArguments]);

	/************************************************************************/
};
XecureKeypad.XSSession.prototype.runCreate = function (aClassName, aObjectName, aArguments)
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.runCreate = function (aClassName, aObjectName, aArguments)");
	console.log("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.runCreate = function (aClassName, aObjectName, aArguments)");

	var aIter = 0;

	this.setClassName (aClassName);	
	this.setObjectName (aObjectName);

	/************************************************************************/

	for (aIter = 0; aIter < this.aSessionDictionary.count; aIter++)
	{
		if (this.aSessionDictionary[aIter].key == aObjectName)
		{
			return;
		}
	}

	this.getBrowserInformation().sendWebRequest (aClassName +".Construct." + this.getSessionObjectName () + "/CreateCallback/",
												 "",
												 aArguments);
	
	/************************************************************************/
};
XecureKeypad.XSSession.prototype.CreateCallback = function (aSessionID)
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.CreateCallback = function (aSessionID)");
	console.log("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.CreateCallback = function (aSessionID)");

	/************************************************************************/

	this.mJobQueue.end ();

	this.aSessionDictionary.push({key : this.getObjectName (),
								  value : aSessionID,
								  className : this.getClassName ()});

	/************************************************************************/
};
XecureKeypad.XSSession.prototype.executeMethod = function (aObjectName, aFunctionName, aCallback, aArguments)
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.executeMethod = function (aObjectName, aFunctionName, aCallback, aArguments)");
	console.log("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.CreateCallback = function (aSessionID)");

	/************************************************************************/

	this.mJobQueue.push (["runExecuteMethod",
						aObjectName,
						aFunctionName,
						aCallback,
						aArguments]);

	/************************************************************************/
};
XecureKeypad.XSSession.prototype.runExecuteMethod = function (aObjectName, aFunctionName, aCallback, aArguments)
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.runExecuteMethod = function (aObjectName, aFunctionName, aCallback, aArguments)");
	console.log("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.runExecuteMethod = function (aObjectName, aFunctionName, aCallback, aArguments)");

	var aIter = 0;
	var aSessionID = null;
	var aClassName = null;

	this.setExcuteCallback (aCallback);

	/************************************************************************/

	for (aIter = 0; aIter < this.aSessionDictionary.length; aIter++)
	{
		if (this.aSessionDictionary[aIter].key == aObjectName)
		{
			aSessionID = this.aSessionDictionary[aIter].value;
			aClassName = this.aSessionDictionary[aIter].className;
		}
	}

	this.getBrowserInformation().sendWebRequest (aClassName +"." + aFunctionName + "." + this.getSessionObjectName () + "/executeMethodCallback" + "/" + aCallback,
												 aSessionID,
												 aArguments);

	/************************************************************************/
};
XecureKeypad.XSSession.prototype.executeMethodCallback = function (aSessionID, aCallback, aResult)
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.executeMethodCallback = function (aSessionID = " + aSessionID + ", aCallback = " + aCallback + ", aResult = " + aResult + ")");
	console.log("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.executeMethodCallback = function (aSessionID = " + aSessionID + ", aCallback = " + aCallback + ", aResult = " + aResult + ")");

	var aIter = 0;
	var aReturnString = null;
	var aID = null;

	this.mJobQueue.end ();

	/************************************************************************/

	aReturnString = aResult;

	for (aIter = 0; aIter < this.aSessionDictionary.length; aIter++)
	{
		if (this.aSessionDictionary[aIter].value == aSessionID)
		{
			aID = this.aSessionDictionary[aIter].key;
		}
	}
	
	eval (aID + "." + aCallback + "(" + aReturnString + ");");

	/************************************************************************/
};
XecureKeypad.XSSession.prototype.deleteObject = function (aObjectName)
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.deleteObject = function (aObjectName)");
	console.log("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.deleteObject = function (aObjectName)");

	/************************************************************************/

	this.mJobQueue.push(["runDeleteObject",
						aObjectName]);

	/************************************************************************/
};
XecureKeypad.XSSession.prototype.runDeleteObject = function (aObjectName)
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.runDeleteObject = function (aObjectName)");
	console.log("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.runDeleteObject = function (aObjectName)");

	var aIter = 0;
	var aArguments = [null];
	var aSessionID = null;
	var aClassName = null;

	/************************************************************************/

	for (aIter = 0; aIter < this.aSessionDictionary.length; aIter++)
	{
		if (this.aSessionDictionary[aIter].key == aObjectName)
		{
			aSessionID = this.aSessionDictionary[aIter].value;
			aClassName = this.aSessionDictionary[aIter].className;
		}
	}

	this.getBrowserInformation().sendWebRequest (aClassName + ".deleteObject." + this.getSessionObjectName () + "/deleteObjectCallback/",
												 aSessionID,
												 aArguments);

	/************************************************************************/
};
XecureKeypad.XSSession.prototype.deleteObjectCallback = function (aSessionID)
{
//	alert("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.deleteObjectCallback = function (aSessionID)");
	console.log("xecurekeypad.js >>> XecureKeypad.XSSession.prototype.deleteObjectCallback = function (aSessionID)");

	var aIter = 0;

	this.mJobQueue.end ();

	/************************************************************************/

	for (aIter = 0; aIter < this.aSessionDictionary.length; aIter++)
	{
		if (this.aSessionDictionary[aIter].value == aSessionID)
		{
			this.aSessionDictionary.splice(aIter, 1);
		}
	}

	/************************************************************************/
};

var gXSSession = XecureKeypad.XSSession.getInstance ('gXSSession');
