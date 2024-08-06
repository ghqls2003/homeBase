/*!
 * xCertshare, v1.1.0.6
 * 
 * For more information on this product, please see
 * https://www.hancomwith.com
 * 
 * Copyright (c) HANCOM WITH INC. All Rights Reserved.
 * 
 * Date: 2023-03-09
 */
document.write("<!-- XecureCertShare stylesheet -->");
document.write("<link rel='stylesheet' type='text/css' href='/HancomCertShare/XecureCertShare/css/xcs_common.css' />");
// xFree javascript
document.write("<script type=\"text/javascript\" src=\"" + "/HancomCertShare/XecureCertShare/ext/XecureCertShare_min.js\"></scr"+"ipt>");
document.write("<script type=\"text/javascript\" src=\"" + "/HancomCertShare/XecureCertShare/ext/SecureProto.js\"></scr"+"ipt>");
document.write("<script type=\"text/javascript\" src=\"" + "/HancomCertShare/XecureCertShare/qrcodejs/qrcode.min.js\"></scr"+"ipt>");

function XecureCertShareInitialize ()
{
	/*------------------------------------------------------------------------
	 * XecureCertShare 기본 세팅.
	 *----------------------------------------------------------------------*/
	// XecureCertShare 디렉토리 설치경로.
	// ex)aBasePath = window.location.protocol + "//reaver.softforum.com/...";
	var aServerPath = "http://192.168.50.55:27633";
	var aBasePath = window.location.protocol + "/HancomCertShare/XecureCertShare";

	// TransKey 디렉터리 설치 경로
	var aTransKeyPath = "/XecureDemo/transkeyServlet";

	// Client 버전 (ture인 경우 ActiveX, false인 경우 XFree)
	var aPluginMode = false;

	// 사이트에서 사용할  XecureCertShare Client 버전.
	var aXCSPlugin = {
			mVersion : "1.0.1.0"
	};
	
	var aXCSXFree = {
			mVersion : "1.0.0.12",
			mModuleLoad : false,
			mShowLoadImg : true,
			mShowLoadImgDiv: true,
			mShowLoadImgzIndex: 530000,
			mLiveUpdate : false,
			mSessionID : "",
			// extension setting
			mPort: 41026,
			mDirectPort: 40308,
			mTrialPortRange: 1,
			mDialog: "",
			mUseQR: true, // QR코드 형식 (인증서 내보내기에 적용).
			mUseScrap: false, // 스크래핑 방식
			mQRLength: 12,
			mInstallCheck_CB: null,
			mIgnoreInstallPage: false,
			mImgIntervalFunc: null,
			mImgIntervalError: false,
			mUserIdInfo: "",
			mRandNum: "",
			mLoadErrMsg:"CertShare가 아직 로딩되지 않았습니다. 잠시만 기다려 주십시요.",
			mSetUserIdErrMsg: "사용자 정보가 없습니다. SetUserId를 선행해주세요.",
			mScrapModeErrMsg: "잘못된 설정 방식입니다.",
	};
	

	// support ko-KR and en-US
	var aLanguage = "ko-KR";

	// 화면 내 DIV 영역으로 통합플러그인 UI 위치
	var aDivInsertOption = false;

	// 만료된 인증서 표시 여부
	var aShowExpiredCert = false;

	// Default 패스워드 틀린횟수.
	var aLimitPassword = 5;
	
	var aPasswordCheckOption = 0;

	var aCAList	= "";
	aCAList += ",signGATE CA5,signGATE CA6";
	aCAList += ",SignKorea CA3,SignKorea CA4";
	aCAList += ",CrossCertCA3,CrossCertCA4";
	aCAList += ",TradeSignCA3,TradeSignCA4";
	aCAList	+= ",yessignCA Class 2,yessignCA Class 3";

	var aStorage = "HARD,REMOVABLE";
	
	// 인증서 선택시 만료일 경고창 설정 (Alert)
	var aExpireDateAlert = false;

	// 인증서 유효 기간 시간 생략
	var aExpireDateShort = true;	// true 설정시 hh:mm:ss 생략
	
	// 인증서 내보내기시 모바일에서 사용할 비밀번호 입력 여부.
	var aUseMobilePwd = false;

	// XecureKeypad 사용 여부.
	var aXecureKeypadEnable = false;
	
	// XecureKeypad qwerty 타입 (qwerty 또는 qwertyspacebar)
	var aXecureKeypadType = "qwerty";

	// Inca nProtect KeyCrypt V6.5
	var aKeyCryptEnable = false;

	// Inca NOSv10 사용 여부.
	var aIncaNOSv10Enable = false;
	
	// Kings Non-activeX
	var aKOSKeyEnable = false;

	var aUISettings = {
		mCSSDefault : ""
	};

	// TransKey 체크박스 사용 여부.(xc는 미지원)
	//20190417 라온시큐어 이선호대리와 협의하여 aTransKeyCheckBoxEnable 지원안하기로 함
	var aTransKeyCheckBoxEnable = false;

	// TransKey 사용 여부.
	var aTransKeyEnable = false;
	
	//TransKey 수동 좌표 위치 조절값, ex)"30 30" 
	var aTransKeyXY = "";


	return new XCSInterface (aBasePath,
						     aServerPath,
							 aTransKeyPath,
							 aPluginMode,
							 aXCSPlugin,
							 aXCSXFree,
							 aLimitPassword,
							 aPasswordCheckOption,
							 aCAList,
							 aStorage,
							 aLanguage,
							 aExpireDateAlert,
							 aExpireDateShort,
							 aUISettings,
							 aDivInsertOption,
							 aShowExpiredCert,
							 aUseMobilePwd, 
							 aXecureKeypadEnable,
							 aXecureKeypadType,
							 aKeyCryptEnable,
							 aIncaNOSv10Enable,
							 aKOSKeyEnable,
							 aTransKeyCheckBoxEnable,
							 aTransKeyEnable,
							 aTransKeyXY);
}

function XCSInterface (  aBasePath,
						 aServerPath,
						 aTransKeyPath,
						 aPluginMode,
						 aXCSPlugin,
						 aXCSXFree,
						 aLimitPassword,
						 aPasswordCheckOption,
						 aCAList,
						 aStorage,
						 aLanguage,
						 aExpireDateAlert,
						 aExpireDateShort,
						 aUISettings,
						 aDivInsertOption,
						 aShowExpiredCert,
						 aUseMobilePwd,
						 aXecureKeypadEnable,
						 aXecureKeypadType,
						 aKeyCryptEnable,
						 aIncaNOSv10Enable,
						 aKOSKeyEnable,
						 aTransKeyCheckBoxEnable,
						 aTransKeyEnable,
						 aTransKeyXY)
{
	this.mXecureCertShareInstance = (function() {
			var req;
			if (window.XMLHttpRequest) {
				req = new window.XMLHttpRequest;
			}
			else {
				req = new ActiveXObject("MSXML2.XMLHTTP.3.0");
			}
					
			
			if(aPluginMode == true)
				req.open ('GET', aBasePath+"/XecureCertSharePlugin.js", false);
			else
				req.open ('GET', aBasePath+"/XecureCertShare.js", false);
			
			req.send (null);

			return eval(GetSafeResponse(req.responseText));	

		})();


	this.mPlatformList = 
	[
/*
		// plugin package 
		{
			aName			: "linux",
			aSearchWord		: "Linux",
			aInstallPath	: 
			[
				"../install/xecurecertshare-plugin_" + aXCSPlugin.mVersion + "_i386.deb",
				"../install/xecurecertshare-plugin-" + aXCSPlugin.mVersion + "-1.i386.rpm",
				"../install/xecurecertshare-plugin_" + aXCSPlugin.mVersion + "_amd64.deb",
				"../install/xecurecertshare-plugin-" + aXCSPlugin.mVersion + "-1.x86_64.rpm"
			],
			aInstallPage	: "./install.html"
		},
		{
			aName			: "mac universal",
			aSearchWord		: "Mac",
			aInstallPath	: "../install/xcs_install_mac_universal.pkg",
			aInstallPage	: "./install.html"
		},
		{
			aName			: "windows 32bit",
			aSearchWord		: "Win32",
			aCABInstallPath	: "../install/xcs_install_windows_x86.cab",
			aInstallPath	: "../install/xcs_install_windows_x86.exe",
			aInstallPage	: "./install.html"
		}//,
*/
/*		{
			aName			: "windows 64bit",
			aSearchWord		: "Win64",
			aCABInstallPath	: "../install/xcs_install_windows_x64.cab",
			aInstallPath	: "../install/xcs_install_windows_x64.exe",
			aInstallPage	: "./install.html"
		}//,
*/
		// xFree package
		{
			aName			: "linux",
			aSearchWord		: "Linux",
			aInstallPath	: 
			[
				"../install/certsharexfree_" + aXCSXFree.mVersion + "_i386.deb",
				"../install/certsharexfree-" + aXCSXFree.mVersion + "-1.i386.rpm",
				"../install/certsharexfree_" + aXCSXFree.mVersion + "_amd64.deb",
				"../install/certsharexfree-" + aXCSXFree.mVersion + "-1.x86_64.rpm",
			],
			aInstallPage	: "./installCertShare.html"
		},
		{
			aName			: "mac universal",
			aSearchWord		: "Mac",
			aInstallPath	: "../install/certsharexfree_mac_universal.pkg",
			aInstallPage	: "./installCertShare.html"
		},
		{
			aName			: "windows 32bit",
			aSearchWord		: "Win32",
			aInstallPath	: "../install/CertShare_Installer.exe",
			aInstallPage	: "./installCertShare.html"
		}
	];

	this.mBrowserList = 
	[
		{
			aName			: "opera",
			aSearchWord		: "OPR",
			aSearchLength	: 4,
			aMinVersion		: "20.00"
		},
		{
			aName			: "explorer",
			aSearchWord		: "Edge",
			aSearchLength	: 5,
			aMinVersion		: "12.0"
		},
		{
			aName 			: "opera",
			aSearchWord 	: "Opera",
			aSearchWord2	: "Version",
			aSearchLength	: 8,
			aMinVersion 	: "20.00"
		},
		{
			aName			: "chrome",
			aSearchWord		: "Chrome",
			aSearchLength	: 7,
			aMinVersion		: "24.0"
		},
		{
			aName			: "firefox",
			aSearchWord		: "Firefox",
			aSearchLength	: 8,
			aMinVersion		: "27.0"
		},
		{
			aName			: "safari",
			aSearchWord		: "Safari",
			aSearchWord2	: "Version",
			aSearchLength	: 8,
			aMinVersion		: "4.0"
		},
		{
			aName			: "explorer",
			aSearchWord		: "MSIE",
			aSearchLength	: 5,
			aMinVersion		: "7.0"
		},
		{
			aName			: "explorer",
			aSearchWord		: "Trident",
			aSearchWord2	: "rv",
			aSearchLength	: 3,
			aMinVersion		: "7.0"
		}
	];

	try
	{
		this.mPluginMode = aPluginMode;
		this.mXCSPlugin = aXCSPlugin;
		this.mXCSPlugin.mID = "XecureCertShareCtrl";
		this.mXCSPlugin.mMimeType = "application/xecurecertshare-plugin";
		this.mXCSPlugin.mClassID = "CLSID:F656F3ED-9B53-496A-BE97-BA82A87FD9BC";
		this.mXCSXFree = aXCSXFree;
		this.mServerPath = aServerPath;
		this.mLimitPassword = aLimitPassword;
		this.mPasswordCheckOption = aPasswordCheckOption;
		this.mCAList = aCAList;
		this.mStorage = aStorage;
		this.mLanguage = aLanguage;
		this.mBasePath = aBasePath;
		this.mExpireDateAlert = aExpireDateAlert;
		this.mExpireDateShort = aExpireDateShort;
		this.mPlatform = this.GetPlatform ();
		this.mBrowser = this.GetBrowser ();
		this.mBrowser.aVersion = this.GetBrowserVersion ();
		this.mUISettings= aUISettings;
		this.mDivInsertOption = aDivInsertOption;
		this.mShowExpiredCert = aShowExpiredCert;
		this.mUseMobilePwd = aUseMobilePwd;
		this.mXecureKeypadEnable = aXecureKeypadEnable;
		this.mXecureKeypadType = aXecureKeypadType;
		this.mKeyCryptEnable = aKeyCryptEnable;
		this.mIncaNOSv10Enable = aIncaNOSv10Enable;
		this.mKOSKeyEnable = aKOSKeyEnable;
		this.mURLExtension = "";

		this.mTransKeyPath = aTransKeyPath;
		this.mTransKeyEnable = aTransKeyEnable;
		this.mTransKeyXY = aTransKeyXY;
		this.mTransKeyCheckBoxEnable = aTransKeyCheckBoxEnable;
		this.mTransKeyIsXC = false;
		
		if(this.mPlatform.aSearchWord != "Win32" && this.mPluginMode == true)
		{
			this.mXecureKeypadEnable = false;
			this.mKeyCryptEnable = false;
		}
	}
	catch (aException)
	{
		var aMessage = null;

		switch (aException)
		{
			case "UPE_UNKNOWN_PLATFORM":
				aMessage = "Unknown Platform";
				break;
			case "UPE_UNKNOWN_BROWSER":
				aMessage = "Unknown Browser";
				break;
			case "UPE_BROWSER_SEARCHWORD_FAIL":
				aMessage = "Set Browser Search Word";
				break;
			default:
				aMessage = "Unknown Exception";
				break;
		}

		alert ("EXCEPTION\n" + aMessage);
	}
}

XCSInterface.prototype.GetPlatform = function ()
{
	var aResult = null;
	var aIter = 0;
	var aStartPosition = 0;

	for (aIter = 0; aIter < this.mPlatformList.length; ++aIter)
	{
		aStartPosition = navigator.platform.indexOf (this.mPlatformList [aIter].aSearchWord);
		if (aStartPosition == -1)
		{
			continue;
		}

		aResult = this.mPlatformList [aIter];
	}

	if (aResult == null)
	{
		throw ("UPE_UNKNOWN_PLATFORM");
	}

	return aResult;
};

XCSInterface.prototype.GetBrowser = function ()
{
	var aResult = null;
	var aIter = 0;
	var aCurrentBrowser = 0;
	var aStartPosition = 0;

	for (aIter = 0; aIter < this.mBrowserList.length; ++aIter)
	{
		aStartPosition = navigator.userAgent.indexOf (this.mBrowserList [aIter].aSearchWord);

		if (aStartPosition == -1)
		{
			continue;
		}

		aResult = this.mBrowserList [aIter];
		break;
	}

	if (aResult == null)
	{
		throw ("UPE_UNKNOWN_BROWSER");
	}

	return aResult;
};

XCSInterface.prototype.GetBrowserVersion = function ()
{
	var aResult = null;
	var aStartPosition = 0;
	var aEndPosition = 0;

	if (this.mBrowser.aSearchWord2 != undefined)
	{
		aStartPosition = navigator.userAgent.indexOf (this.mBrowser.aSearchWord2);
	}
	else
	{
		aStartPosition = navigator.userAgent.indexOf (this.mBrowser.aSearchWord);
	}

	if (aStartPosition == -1)
	{
		throw ("UPE_BROWSER_SEARCHWORD_FAIL");
	}

	aStartPosition += this.mBrowser.aSearchLength;
	aResult = navigator.userAgent.substr (aStartPosition);

	aEndPosition = aResult.indexOf (" ");
	if (aEndPosition == -1)
	{
		aResult = aResult.substr (0);
	}
	else
	{
		aResult = aResult.substring (0, aEndPosition);
	}

	aResult = aResult.replace (";", "");
	aResult = aResult.replace (")", "");

	return aResult;
};

XCSInterface.prototype.IsSupportedBrowser = function ()
{
	var aResult = false;
	var aRoopCount = 0;
	var aIter = 0;
	var aLocalVersion = null;
	var aMinVersion = null;

	aLocalVersion = this.mBrowser.aVersion.split (".");
	aMinVersion = this.mBrowser.aMinVersion. split (".");

	if (aLocalVersion.length - aMinVersion.length > 0)
	{
		aRoopCount = aLocalVersion.length;
	}
	else
	{
		aRoopCount = aMinVersion.length;
	}

	for (aIter = 0;aRoopCount > aIter;aIter++)
	{
		if (aLocalVersion [aIter] == undefined)
		{
			aLocalVersion [aIter] = '0';
		}

		if (aMinVersion [aIter] == undefined)
		{
			aMinVersion [aIter] = '0';
		}

		if (aLocalVersion [aIter] - aMinVersion [aIter] < 0)
		{
			aResult = false;
			break;
		}

		if (aLocalVersion [aIter] - aMinVersion [aIter] > 0)
		{
			aResult = true;
			break;
		}

		if (aRoopCount - 1 == aIter)
		{
			aResult = true;
		}
	}

	if (aResult == false)
	{
		return aResult;
	}

	return aResult;
};

XCSInterface.prototype.UpdatePackage = function ()
{
	if (this.IsNeedUpdatePlugin (true) == true)
	{
		this.InstallPackage ();
	}
};

XCSInterface.prototype.IsNeedUpdate = function (aWriteActiveXObject, aUserCallback)
{
	var aResult;
	var aBrowserVersion;
	var aUserAgent = navigator.userAgent;

	if (aUserCallback == undefined) {
		alert ("callback error");
		return;
	}

	if (aUserAgent.indexOf("MSIE") >= 0 || aUserAgent.indexOf("Trident") >= 0)
		aBrowserVersion = Number(this.mBrowser.aVersion);

	if (XecureCertShare.mPluginMode == true) {
		aResult = this.IsNeedUpdatePlugin (aWriteActiveXObject);
		if (aResult)
			aResult = "XCS_NEED_INSTALL";
		else
			aResult = "XCS_NORMAL";

		if (aUserCallback)
			aUserCallback (aResult);
		else
			return aResult;
	}
	else {
		XecureCertShare.mXCSXFree.mInstallCheck_CB = aUserCallback;
		this.StartXecureCertShare ();
	}
}

XCSInterface.prototype.IsNeedUpdatePlugin = function (aWriteActiveXObject)
{
	var aResult = false;
	var aLocalVersion = null;
	var aLocalVersionArray = null;
	var aSerVerVersionArray = null;
	var aIter = 0;
	var aServerVersionPoint;
	var aLocalVersionPoint;

	if (aWriteActiveXObject == true && this.mBrowser.aName == "explorer")
	{
		// <body onLoad> or window.onload 에서 document.write 사용 불가
		var aPluginVersion = this.mXCSPlugin.mVersion.split(".").join(",");		
		var aObjectTag = null;
		
		aObjectTag = "<object ";
		aObjectTag += "id='" + "ObjXCS" + "' ";
		aObjectTag += "classid='" + this.mXCSPlugin.mClassID + "' ";
 		aObjectTag += "codeBase='" + "#Version=" + this.mXCSPlugin.mVersion + "' ";
 		aObjectTag += "width=0 height=0>";
 		aObjectTag += "</object>";
 		
 		document.write (aObjectTag);
 		
		if (typeof(document.ObjXCS) == "undefined" || document.ObjXCS == null || document.ObjXCS.object == null)
 			aResult = true;
	}
	else
	{
		aLocalVersion = this.GetVersion();

		if (!aLocalVersion)
		{
			// 처음 설치 시.
			aResult = true;
		}
		else
		{
			// 업데이트 설치 시.
			aLocalVersionArray = aLocalVersion.split ('.');
			aSerVerVersionArray = this.mXCSPlugin.mVersion.split ('.');

			for (aIter = 0;aIter < 4;aIter++)
			{
				aServerVersionPoint = parseInt (aSerVerVersionArray [aIter], 10);
				aLocalVersionPoint = parseInt (aLocalVersionArray [aIter], 10);
				if (aServerVersionPoint > aLocalVersionPoint) {
					aResult = true;
					break;
				} else if (aServerVersionPoint < aLocalVersionPoint) {
					aResult = false;
					break;
				}
			}
		}
	}

	return aResult;
};

XCSInterface.prototype.GetVersion = function (aIgnoreInstall)
{
	var aPluginVersion;

	if (this.mBrowser.aName == "explorer")
	{
		if (!(typeof(document.XecureCertShareCtrl) == "undefined" || document.XecureCertShareCtrl == null || document.XecureCertShareCtrl.object == null) || aIgnoreInstall)
		{
			try
			{
				var aActiveX = new ActiveXObject ("XCSActiveX.XCSCtrl.1");
				aPluginVersion = aActiveX.GetVersion ();
			}
			catch (ActiveXException)
			{
			}
		}
		else
		{
			aPluginVersion = "";
		}
	}
	else
	{
		var aMimeType = navigator.mimeTypes [this.mXCSPlugin.mMimeType];

		if (aMimeType)
		{

			aPluginDescription = aMimeType.enabledPlugin.description; 

			aPluginVersion = aPluginDescription.split('v');
			aPluginVersion = aPluginVersion[aPluginVersion.length - 1];
		}
	}

	return aPluginVersion;
};

XCSInterface.prototype.InstallPackage = function ()
{
	var aIter = 0;
	var aIter2 = 0;
	var aInstallPath = null;

	if (this.mPlatform.aSearchWord2 != undefined)
	{
		for (aIter = 0; aIter < this.mPlatform.aSearchWord2.length; ++aIter)
		{
			for (aIter2 = 0; aIter2 < this.mPlatform.aSearchWord2 [aIter].length; ++aIter2)
			{
				aStartPosition = navigator.userAgent.indexOf (this.mPlatform.aSearchWord2 [aIter][aIter2]);
				if (aStartPosition == -1)
				{
					continue;
				}

				aInstallPath = this.mPlatform.aInstallPath [aIter];
				break;
			}
		}
	}
	else
	{
		aInstallPath = this.mPlatform.aInstallPath;
	}

	if (this.mPlatform.aInstallPage != null)
	{
		aInstallPath = this.mPlatform.aInstallPage;
	}

	window.open (aInstallPath, '_self');
};

XCSInterface.prototype.IsNull = function (aCheckValue,
	   												aDefaultValue)
{
	var aResult = null;

	if (aCheckValue == null || aCheckValue.length == 0)
	{
		aResult = aDefaultValue;
	}
	else
	{
		aResult = aCheckValue;
	}

	return aResult;
};

XCSInterface.prototype.PrintObjectTag = function (aIgnoreInstallpage, aTargetElement)
{
	var aObjectTag = null;

	if (this.IsSupportedBrowser () == false)
	{
		alert (this.mBrowser.aName + " " + this.mBrowser.aVersion +
			   "은(는) 지원하지 않는 브라우저입니다.");
		return -1;
	}

	if (!aIgnoreInstallpage)
		this.UpdatePackage ();

	aObjectTag = "<object ";
	aObjectTag += "id='" + this.mXCSPlugin.mID + "' ";
	if (this.mBrowser.aName == "explorer")		// MSIE
	{
		var aPluginVersion = this.mXCSPlugin.mVersion.split(".").join(",");
 		aObjectTag += "classid='" + this.mXCSPlugin.mClassID + "' ";
 		aObjectTag += "codebase='" + this.mPlatform.aCABInstallPath + "#Version=" + this.mXCSPlugin.mVersion + "' ";
	}
	else
	{
		aObjectTag += "type='"		+ this.mXCSPlugin.mMimeType + "' ";
	}
	aObjectTag += "width=0 height=0>";

	if(this.mURLExtension != "")
	{
		aObjectTag += "<param name=\"URLExtension\"		value=\""	+ this.mURLExtension + "\">";
	}
	
	aObjectTag+= "No XecureCertShare PlugIn";
	aObjectTag += "</object>";

	if (this.IsNeedUpdatePlugin (true) == false || this.mBrowser.aName == "explorer") // IE cab 설치
	{
		// <body onLoad> or window.onload 에서 document.write 사용 불가
		if (aTargetElement) {
			aTargetElement.innerHTML = aObjectTag;
		} else {
			if(document.getElementById("XCSXecureCertShareCtrl") == null) {
				document.write (aObjectTag);
			}
		}
	}
};

XCSInterface.prototype.LoadExtension= function (aName)
{
	if (this.mPluginMode == true) return "";
	
	return this.mXecureCertShareInstance.LoadExtension(aName);
};

XCSInterface.prototype.StartXecureCertShare = function (aIgnoreInstallpage, aTargetElement)
{
	var aUserAgent = navigator.userAgent,
					 aBrowserVersion,
					 aRegExp,
					 aXecureCertShareModule,
					 aCheckInstalled = false;

	if (this.IsSupportedBrowser () == false)
	{
		alert (this.mBrowser.aName + " " + this.mBrowser.aVersion +
			   "은(는) 지원하지 않는 브라우저입니다.\n최신버전으로 업데이트하시기 바랍니다.");
		return -1;
	}

	if (aUserAgent.indexOf("MSIE") >= 0 || aUserAgent.indexOf("Trident") >= 0)
	{
		aBrowserVersion = parseInt(this.mBrowser.aVersion);
	}

//	if (aBrowserVersion < 7)
//	{
//		this.PrintObjectTag (aIgnoreInstallpage, aTargetElement);
//		//var aElement = document.getElementById("AnyShare4PCLoadingImg");
//		//if (aElement)
//		//	aElement.parentNode.removeChild (aElement);
//		AnyShare.mAnyShareEnable = !AnyShare.mAnyShareEnable;
//	}
//	else
//	{
		if(aIgnoreInstallpage != undefined)
			XecureCertShare.mXCSXFree.mIgnoreInstallPage = aIgnoreInstallpage;
		
		if (XecureCertShare.mXCSXFree.mShowLoadImg)
		{
			XecureCertShare.mXCSXFree.mImgIntervalFunc = setInterval (showXecureCertShareLoadingImg, 50);
		}

//		var aName;
//		if (typeof (aBrowserVersion) == 'undefined')
//			console.log ("[CertShare4PC] Browser: " + this.mBrowser.aName);
//		else
//			console.log ("[CertShare4PC] " + this.mBrowser.aName + ": " + aBrowserVersion);

		if (aBrowserVersion < 10)
		{
			if (aBrowserVersion == 7)
				aName = "XecureCertShareJSONP.js";
			else
				aName = "XecureCertShareAjax.js";
		}
		else
		{
			aName = "XecureCertShareNormal.js";
		}

		if (aName != "XecureCertShareJSONP.js") {
			try {
				var JSONData = {"certShare":[{"module":"ext"}]}
				var JSONResult = JSON.stringify (JSONData);
			} catch (e) {
				aXecureCertShareModule = this.LoadExtension ("json2.js");
			}
		}

		aXecureCertShareModule = this.LoadExtension (aName);
		this.mXecureCertShareInstance.SetExtension(aXecureCertShareModule);
//	}
};

XCSInterface.prototype.XCSImport = function (aErrCallback)
{
	if (XecureCertShare.mPluginMode == false && XecureCertShare.mXCSXFree.mModuleLoad != true)
	{
		alert(XecureCertShare.mXCSXFree.mLoadErrMsg);
		return;
	}
	
	return this.mXecureCertShareInstance.XCSImport(aErrCallback);
};

XCSInterface.prototype.XCSExport = function (aErrCallback)
{
	if (XecureCertShare.mPluginMode == false && XecureCertShare.mXCSXFree.mModuleLoad != true)
	{
		alert(XecureCertShare.mXCSXFree.mLoadErrMsg);
		return;
	} else if (XecureCertShare.mXCSXFree.mUseScrap == true) {
		alert(XecureCertShare.mXCSXFree.mScrapModeErrMsg);
		return;
	}
	
	return this.mXecureCertShareInstance.XCSExport(aErrCallback);
};

XCSInterface.prototype.XCSScrap = function (aUserCallback, aErrCallback)
{
	if (XecureCertShare.mPluginMode == false && XecureCertShare.mXCSXFree.mModuleLoad != true) {
		alert(XecureCertShare.mXCSXFree.mLoadErrMsg);
		return;
	} else if (XecureCertShare.mXCSXFree.mUserIdInfo === "") {
		alert(XecureCertShare.mXCSXFree.mSetUserIdErrMsg);
		return;
	} else if (XecureCertShare.mXCSXFree.mUseScrap != true) {
		alert(XecureCertShare.mXCSXFree.mScrapModeErrMsg);
		return;
	} else if (aUserCallback == undefined) {
		alert("callback error");
		return;
	}

	var userId = XecureCertShare.mXCSXFree.mUserIdInfo;

	return this.mXecureCertShareInstance.XCSScrap(userId, aUserCallback, aErrCallback);
};

XCSInterface.prototype.XCSSetErrorLogLevel = function ()
{
	if (XecureCertShare.mPluginMode == false && XecureCertShare.mXCSXFree.mModuleLoad != true)
	{
		alert(XecureCertShare.mXCSXFree.mLoadErrMsg);
		return;
	}
	
	return this.mXecureCertShareInstance.setErrorLogLevel();
};

XCSInterface.prototype.SetLanguage = function (aLanguage, aErrCallback)
{
	var aResult = this.mXecureCertShareInstance.SetLanguage(aLanguage, aErrCallback);
	if(aResult == 0) {
		this.mLanguage = aLanguage;
	}
};

XCSInterface.prototype.SetUITarget = function (aElement)
{
	if(XecureCertShare.mDivInsertOption == true) {
		XecureCertShare.mUISettings.mUITarget = aElement;
	}
};

XCSInterface.prototype.GetErrMsg = function (aErrCode)
{
	var XCS_ERROR = 450000;
	var aErrMsg = "";
	
	if(aErrCode == XCS_ERROR + 1)
		aErrMsg = "입력값이 올바르지 않습니다.";
	else if(aErrCode == XCS_ERROR + 2)
		aErrMsg = "메모리 할당에 실패했습니다.";
	else if(aErrCode == XCS_ERROR + 3)
		aErrMsg = "데이터 인코딩 중 오류가 발생했습니다.";
	else if(aErrCode == XCS_ERROR + 4)
		aErrMsg = "데이터 인코딩 중 오류가 발생했습니다.";
	else if(aErrCode == XCS_ERROR + 5)
		aErrMsg = "지원하지 않는 입력 값입니다.";
	else if(aErrCode == XCS_ERROR + 6)
		aErrMsg = "새 비밀번호가 일치하지 않습니다.";
	else if(aErrCode == XCS_ERROR + 7)
		aErrMsg = "비밀번호 형식이 올바르지 않습니다.\r\n비밀번호는 10자리 이상으로, 숫자, 영문자, 특수문자('\"\\|제외)를 조합해야 합니다.";
	else if(aErrCode > XCS_ERROR + 500 && aErrCode < XCS_ERROR + 503)
		aErrMsg = "인증서 검색에 실패했습니다.";
	else if(aErrCode == XCS_ERROR + 504)
		aErrMsg = "인증서 저장에 실패했습니다.";
	else if(aErrCode > XCS_ERROR + 100 && aErrCode < XCS_ERROR + 199)
		aErrMsg = "PC에서 인증서 업로드 중 오류가 발생했습니다.";
	else if(aErrCode > XCS_ERROR + 200 && aErrCode < XCS_ERROR + 299)
		aErrMsg = "PC에서 인증서 다운로드 중 오류가 발생했습니다.";
	else if(aErrCode > XCS_ERROR + 600 && aErrCode < XCS_ERROR + 1399)
		aErrMsg = "인증서 관련 동작 중 오류가 발생하였습니다.";
	//server error
	else if(aErrCode == 431020)
		aErrMsg = "인증 번호가 유효하지 않습니다. 인증 번호를 확인해 주세요.";
	else if(aErrCode == 432009)
		aErrMsg = "가져올 인증서가 없습니다.";
	else if(aErrCode == XCS_ERROR + 9)
		aErrMsg = "무결성 검증값이 올바르지 않습니다. 재설치 후 다시 시도해 주세요.";
	
	return aErrMsg;
};

XCSInterface.prototype.XecureCertShare_installCheck = function (aUserCallback)
{
	this.mXecureCertShareInstance.XecureCertShare_installCheck (aUserCallback);
};

XCSInterface.prototype.XCSSetUserId = function (aUserId)
{
	this.mXCSXFree.mUserIdInfo = aUserId;
};

XCSInterface.prototype.XCSGetUserId = function ()
{
	return this.mXCSXFree.mUserIdInfo;
};

XCSInterface.prototype.XCSCleanUserId = function ()
{
	this.mXCSXFree.mUserIdInfo = "";
};

XCSInterface.prototype.XCSSetRandomValue = function (random)
{
	this.mXCSXFree.mRandNum = random;
};

XCSInterface.prototype.XCSGetRandomValue = function ()
{
	return this.mXCSXFree.mRandNum;
};

var XecureCertShare = XecureCertShareInitialize ();

XecureCertShareStart = function (aIgnoreInstallpage, aTargetElement)
{	
	if(XecureCertShare.mPluginMode == true)
		XecureCertShare.PrintObjectTag (aIgnoreInstallpage, aTargetElement);
	else	
		XecureCertShare.StartXecureCertShare (aIgnoreInstallpage, aTargetElement);
};

function getIEVersion () {
	var aUserAgent = navigator.userAgent,
		aBrowserVersion,
		aRegExp;

	if (aUserAgent.indexOf("MSIE") >= 0 || aUserAgent.indexOf("Trident") >= 0)
	{
		if(document.documentMode) {
			aBrowserVersion = document.documentMode;
		} else {
			aRegExp  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		}
	}

	if (aRegExp && aRegExp.exec(aUserAgent) != null)
		aBrowserVersion = parseFloat( RegExp.$1 );

	return aBrowserVersion;
}

function GetSafeResponse(aText) { return aText; };

function initIncaNOSv10 ()
{
	npPfsStartup (document.form1, false, true, false, true, "npkencrypt", "on");
}

function showXecureCertShareLoadingImg (aType)
{
	var aImgElement = document.getElementById ("CertShare4PCLoadingImg");
	var aOverlayElement = document.getElementById ("CertShare4PCLoadingImg_overlay");

	if (document.body != null && aImgElement == null)
	{
		if (XecureCertShare.mXCSXFree.mShowLoadImgDiv)
		{
			var aOverlay = document.createElement ('div');

			aOverlay.style.zIndex = XecureCertShare.mXCSXFree.mShowLoadImgzIndex;
			aOverlay.style.backgroundImage = 'none';
			aOverlay.style.marginLeft = '0px';
			
			aOverlay.style.cursor = 'auto';
			aOverlay.onclick = null;
			aOverlay.id = 'CertShare4PCLoadingImg_overlay';
			aOverlay.style.position = 'fixed';
			aOverlay.style.width = '100%';
			aOverlay.style.height = '100%';
			aOverlay.style.top = '0';
			aOverlay.style.left = '0';

			if (XecureCertShare.mBrowser.aVersion < 9)
			{
				aOverlay.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + XecureCertShare.mBasePath + "/img/gray.png', sizingMethod='scale')";
			}
			else if (XecureCertShare.mBrowser.aName == "chrome" && XecureCertShare.mBrowser.aVersion > 9)
			{
				aOverlay.style.background = '-webkit-radial-gradient(rgba(127, 127, 127, 0.5), rgba(127, 127, 127, 0.5) 35%, rgba(0, 0, 0, 0.7))';
			}
			else if (XecureCertShare.mBrowser.aName == "firefox")
			{
				aOverlay.style.background = '-moz-radial-gradient(rgba(127, 127, 127, 0.5), rgba(127, 127, 127, 0.5) 35%, rgba(0, 0, 0, 0.7))';
			}
			else
			{
				aOverlay.style.backgroundColor = '#333333';
				aOverlay.style.opacity = '0.2';
			}
			document.body.appendChild (aOverlay);
		}

		var aImage = document.createElement ("img");
		aImage.src = XecureCertShare.mBasePath + "/img/loading.gif";
		aImage.style.width = 'auto';
		aImage.style.height = 'auto';
		aImage.style.position = 'fixed';
		aImage.style.top = '20%';
		aImage.style.left = '40%';
		aImage.style.zIndex = XecureCertShare.mXCSXFree.mShowLoadImgzIndex + 10;
		aImage.id = 'CertShare4PCLoadingImg';

		document.body.appendChild (aImage);
	}

	if ((XecureCertShare.mXCSXFree.mModuleLoad == true && aImgElement != null)
		|| XecureCertShare.mXCSXFree.mImgIntervalError == true)
	{
		if (aImgElement)
		{
			clearInterval (XecureCertShare.mXCSXFree.mImgIntervalFunc);
			aImgElement.parentNode.removeChild (aImgElement);

			if (aOverlayElement)
			{
				document.body.removeChild (aOverlayElement);
			}
		}
	}
}

function XecureCertShare_installCheck (aUserCallback)
{
	var aVersion = parseInt (XecureCertShare.mBrowser.aVersion);

	if (XecureCertShare.mPluginMode == true || ((XecureCertShare.mBrowser.aName == "explorer") && aVersion < 7))
	{
		// XecureCertShare Plugin 설치 Callback 함수 추가.
	}
	else
	{
		XecureCertShare.mXCSXFree.mImgIntervalError = true;
		XecureCertShare.XecureCertShare_installCheck (aUserCallback);
	}
}

function XecureCertShare_cancelCallback ()
{
	console.log('XecureCertShare_cancelCallback');
}
