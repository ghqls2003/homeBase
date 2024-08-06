//금융인증 화면
var yesSign = {

	//초기화 여부(최초 1회만 실행되어야할 기능)
	bInit: false,
	initInfo: {},
	certType: "",

	loadCallbackEnd: function () {
		if (yesSign.certType == 'yessign_node') yesSign.sdk = FinCert.Sdk;
		else if (yesSign.certType == 'yessignCorp_node') yesSign.sdk = FinCertCorp.Sdk;
		else if (yesSign.certType == 'yessignInt_node') yesSign.sdk = FinCertInt.Sdk;

		if(ASL_appInfo == ANDROID_APP) {
			yeskeyAndroid.startInitSDK();
		} else if (ASL_appInfo == IOS_APP) {
			webkit.messageHandlers.startInitSdk.postMessage("startInitSdk");
		}
	},

	//금융인증서 선택시(시적점)
	onClick: function (certType) {
		var loading = document.getElementById('loading_layout');
		loading.style.display = 'block';
		yesSign.certType = certType;
		if (certType === 'yessign_node') initInfo = SimpleSign.fincertInfo;
		else if (certType == 'yessignCorp_node') initInfo = SimpleSign.fincertCorpInfo;
		else if (certType == 'yessignInt_node') initInfo = SimpleSign.fincertIntInfo;

		this.bInit = initInfo.init;
		SimpleSign.fincertCommon.sdk = initInfo.sdk;
		SimpleSign.fincertCommon.locationId = initInfo.locationId;

		var doInitCallback = function () {
			yesSignSDK.doSign();
		}
		var addJavascriptCallback = function () {
			if (certType === 'yessign_node') yesSign.sdk = FinCert.Sdk;
			else if (certType == 'yessignCorp_node') yesSign.sdk = FinCertCorp.Sdk;
			else if (certType == 'yessignInt_node') yesSign.sdk = FinCertInt.Sdk;
			yesSignSDK.doInit(doInitCallback);
		}
		var nativeLoadCallback = function () {
			if (commSign.isMobileOSCheck() == "android") {
				yeskeyAndroid.startLoadSDK();
			} else if(commSign.isMobileOSCheck() == "ios") {
				webkit.messageHandlers.startLoadSdk.postMessage("startLoadSdk");
			}
		}
		if (this.bInit == false) {
			initInfo.init = true;
			// Mobile Native
			if (SimpleSign.fincertCommon.mobileAppEnable && commSign.isMobilePlatform()) {
				commSign.addJavascript(AnySignProp.aSimplePath + '/SimpleSign/js/yessignMobile.js', nativeLoadCallback);
			}
			else { // PC Web, Mobile Web
				commSign.addJavascript(yesSignSDK.sdkJs(), addJavascriptCallback);
			}
		} else {
			// Mobile Native
			if (SimpleSign.fincertCommon.mobileAppEnable && commSign.isMobilePlatform()) {
				if (commSign.isMobileOSCheck() == "android") {
					yeskeyAndroid.startInitSDK();
				} else if(commSign.isMobileOSCheck() == "ios") {
					webkit.messageHandlers.startInitSdk.postMessage("startInitSdk");
				}
			}
			else { // PC Web, Mobile Web
				yesSignSDK.sdkJs(addJavascriptCallback);
			}
		}
		// this.initLayout();
	},
	//인증시작 화면표시
	initLayout: function () {
		var div = [];
		div.push('<ul>');
		div.push('<li tabindex="3" id="xTsign_icon_top" class="xTsignli iconTop"><img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/icon_yessign.png" alt=""><a class="Atit">' + commSign.getLanguage('yessign', 'L00001') + '</a></li>');
		div.push('</ul>');
		div.push('<div tabindex="3" id="xTsign_yessign_con" class="yessign_con">');
		div.push('<dl>');
		div.push('<dt>' + commSign.getLanguage('yessign', 'L00002') + '</dt>');
		div.push('<dd>' + commSign.getLanguage('yessign', 'L00003') + '</dd>');
		if (!AnySignProp.signDevice) {
			div.push('<img src="' + SimpleSign.pcWebImg + 'sign_step_yes.png" alt="' + commSign.getLanguage('yessign', 'L00009') + '"></img>');
		} else {
			div.push('<img src="' + SimpleSign.mobileWebImg + 'sign_step_yes.png" alt="' + commSign.getLanguage('yessign', 'L00009') + '"></img>');
		}

		div.push('</dl>');
		div.push('<div class="use"><p class="use_text">' + commSign.getLanguage('yessign', 'L00004') + '</p><a tabindex="3" id="xTsign_sign" class="Retext">' + commSign.getLanguage('yessign', 'L00005') + '</a></div>');
		div.push('</div>');

		//화면표시
		SimpleSign.addSignContent(div.join(''), function () {
			//간편인증 목록 표시
			document.getElementById('xTsign_icon_top').onclick = function () {
				if (!AnySignProp.signDevice) {
					SimpleSign.addSignList();
				} else {
					SimpleSign.addMSignList();
				}
			};
			document.getElementById('xTsign_icon_top').onkeyup = function (e) {
				if (e.keyCode == 13) {
					if (!AnySignProp.signDevice) {
						SimpleSign.addSignList();
					} else {
						SimpleSign.addMSignList();
					}
				}
			};

			//인증요청하기 버튼 클릭시
			document.getElementById('xTsign_sign').onclick = function () {
				//금융인증서 SDK 실행
				yesSignSDK.doInit(function () {
					yesSign.initProcessLayout();
					yesSignSDK.doSign();
				});

				//최근정보 쿠키저장
				SimpleSignProp.setLastSign('yessign');
			};
			document.getElementById('xTsign_sign').onkeyup = function (e) {
				if (e.keyCode == 13) {
					//금융인증서 SDK 실행
					yesSignSDK.doInit(function () {
						yesSign.initProcessLayout();
						yesSignSDK.doSign();
					});
				}
			};
		});
	},
	//진행중 화면표시
	initProcessLayout: function () {
		var div = [];
		div.push('<div id="xTsign_yessign_con" class="yessign_con">');
		div.push('<dl>');
		div.push('<dt>' + commSign.getLanguage('yessign', 'L00002') + '</dt>');
		div.push('<dd>' + commSign.getLanguage('yessign', 'L00003') + '</dd>');
		div.push('<dd class="loading"><img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/loading.gif" alt=""></dd>');
		div.push('</dl>');
		div.push('<div class="use"><p class="use_text">' + commSign.getLanguage('yessign', 'L00004') + '</p></div>');

		document.getElementById("xTsign_yessign_con").innerHTML = '';
		document.getElementById("xTsign_yessign_con").innerHTML = div.join('');
	},
	//인증오류 화면표시
	initErrorLayout: function (sMsg) {
		var div = [];
		div.push('<dl>');
		div.push('<dt>' + commSign.getLanguage('yessign', 'L00007') + '</dt>');
		div.push('<dd>' + commSign.getLanguage('yessign', 'L00008') + sMsg + '</dd>');
		div.push('</dl>');
		div.push('<div class="use"><p class="use_text">' + commSign.getLanguage('yessign', 'L00004') + '</p><a tabindex="3" id="xTsign_sign" class="Retext">' + commSign.getLanguage('yessign', 'L00006') + '</a></div>');

		document.getElementById("xTsign_yessign_con").innerHTML = '';
		document.getElementById("xTsign_yessign_con").innerHTML = div.join('');

		//인증요청하기 버튼 클릭시
		document.getElementById('xTsign_sign').onclick = function () {
			//금융인증서 SDK 실행
			yesSignSDK.doInit(function () {
				yesSignSDK.doSign();
			});
		};
		document.getElementById('xTsign_sign').onkeyup = function (e) {
			if (e.keyCode == 13) {
				//금융인증서 SDK 실행
				yesSignSDK.doInit(function () {
					yesSignSDK.doSign();
				});
			}
		};

		if (!AnySignProp.signDevice) {
			SimpleSign.appendTabControl();
		}
	},
};

//금융인증 SDK
var yesSignSDK = {
	//js파일
	sdkJs: function (callback) {
		if (typeof callback == 'function') return callback();
		return SimpleSign.fincertCommon.sdk + '?dt=' + commSign.getFormatDate();
	},

	//언어설정에따른 금융인증SDK 언어설정
	lang: { 'ko-KR': 'kor', 'en-US': 'eng' },

	//SDK 초기화
	doInit: function (aNextCallBack) {
		if (SimpleSign.aPlain == null) {
			yesSign.initErrorLayout(commSign.getLanguage('yessign', 'L00014'));
			return;
		}

		yesSign.sdk.init({
			orgCode: SimpleSign.fincertCommon.orgCode,
			apiKey: SimpleSign.fincertCommon.apiKey,
			lang: yesSignSDK.lang[AnySignProp.signLanguage],
			success: function () {
				if (typeof aNextCallBack === 'function') {
					aNextCallBack();
				}
			},
			fail: function (error) {
				yesSign.initErrorLayout(error.code + " : " + error.message);
			},
		});
	},
	//인증실행
	doSign: function () {
		// index.jsp 정보에 따른 각각의 처리 (aOption 값 및 API 호출명) by junseong
		var signFuncName = SimpleSign.aFuncName;
		var signOption = SimpleSign.aOption;
		var outputHexFlag = true;
		var mediaID = SimpleSign.fincertCommon.locationId;

		var tmpPlain = SimpleSign.aPlain;

		if (!Array.isArray(tmpPlain))
			SimpleSign.aPlain = tmpPlain.split(SimpleSign.aDelimeter);

		if (signOption & 256)
			outputHexFlag = false;

		switch (signFuncName)
		{
			case "SignFileInfoAdd": 
				if (SimpleSign.aPlain[0].length == 0) {
					alert(commSign.getLanguage('yessign', 'L00014'));
					SimpleSign.onClose();
					return;
				}
				SimpleSign.aFileInfo = commSign.detachFileInfo(SimpleSign.aPlain[0]);

				var _base64url = new Array();
				var _base64;
				for (var i = 0; i < SimpleSign.aPlain.length; i++) {
					if (SimpleSign.aPlain[i].startsWith("3082")) {
						_base64 = commSign.hexToBase64(SimpleSign.aPlain[i]);
					} else {
						_base64 = SimpleSign.aPlain[i];
					}
					_base64url[i] = _base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=+$/, "");
				}

				SimpleSign.signedData = _base64url;
			case "SignDataCMS":
				SimpleSign.fincertCommon.cmsInfo = "";
				break;
			case "SignDataWithVID":
			case "SignDataWithVID_Serial":
				if ((signOption & 16) && (signOption & 8)) {
					alert(commSign.getLanguage('yessign', 'L00010'));
					SimpleSign.onClose();
					return;
				} else if (signOption & 16) {
					SimpleSign.fincertCommon.cmsInfo = "dummy";
				} else if (signOption & 8) {
					SimpleSign.fincertCommon.cmsInfo = SimpleSign.aIdn;
				} else {
					alert(commSign.getLanguage('yessign', 'L00011'));
					SimpleSign.onClose();
					return;
				}
				break;
			case "MultiSignWithSerial":
				SimpleSign.fincertCommon.cmsInfo = "";
				for (i = SimpleSign.aPlain.length - 1; i >= 0; i--) {
					if (SimpleSign.aPlain[i] == "")
						SimpleSign.aPlain.splice(i, 1);
				}
				if (SimpleSign.aPlain.length != SimpleSign.aTotal) {
					alert(commSign.getLanguage('yessign', 'L00013'));
					SimpleSign.onClose();
					return;
				}
				break;
			case "MultiSignFileInfoWithVID":
				if ((signOption & 16) && (signOption & 8)) {
					alert(commSign.getLanguage('yessign', 'L00010'));
					SimpleSign.onClose();
					return;
				} else if (signOption & 16) {
					SimpleSign.fincertCommon.cmsInfo = "dummy";
				} else if (signOption & 8) {
					SimpleSign.fincertCommon.cmsInfo = SimpleSign.aIdn;
				} else {
					alert(commSign.getLanguage('yessign', 'L00011'));
					SimpleSign.onClose();
					return;
				}
			case "MultiSignFileInfo":
				if (!Array.isArray(SimpleSign.aFileHash)) {
					var hashes = new Array();
					var total = SimpleSign.aTotal;

					var fileHash = SimpleSign.aFileHash;
					fileHash = fileHash.split(SimpleSign.aDelimeter);
					for (var i = 0; i < total; i++) {
						hashes[i] = commSign.getSearchHashValue (fileHash[i]);
					}

					SimpleSign.aFileHash = hashes;
				}
				break;
			default:
				yesSign.initErrorLayout(commSign.getLanguage('yessign', 'L00012'));
				return;
		}

		signParam = {
			signFormat: {
				type: SimpleSign.fincertCommon.type,
				CMSInfo: {
					ssn: SimpleSign.fincertCommon.cmsInfo
				}
			},
			content: {
				plainText: {
					plainTexts: SimpleSign.aPlain,
					encoding: SimpleSign.fincertCommon.encoding,
				}
			},
			algorithms: SimpleSign.fincertCommon.algorithm,
			view: {
				lastAccessCert: false,
				// oid: SimpleSign.fincertCommon.oid,
				enableTextView: SimpleSign.fincertCommon.viewPlain
			},
			info: {
				signType: SimpleSign.fincertCommon.signType
			},
			success: function (result) {
				var loading = document.getElementById('loading_layout');
				loading.style.display = 'none';

				var tmpOutput = new Array();
				var resBase64 = commSign.base64UrlToBase64(result.signedVals);

				if (outputHexFlag == true) {
					for (i = 0; i < resBase64.length; i++) {
						tmpOutput[i] = commSign.base64ToHex(resBase64[i]);
					}
				} else {
					for (i = 0; i < resBase64.length; i++) {
						tmpOutput[i] = resBase64[i];
					}
				}

				// 인증서 유효성 검증 방식
				if (SimpleSign.fincertCommon.crlMethod == "api")
					tmpOutput += ":8";

				if ((signFuncName == "SignDataWithVID") || (signFuncName == "SignDataWithVID_Serial")) {
					AnySign.mSimpleAuthEnvCi = tmpOutput;
				} else if (signFuncName == "MultiSignWithSerial") {
					tmpOutput = tmpOutput.join(SimpleSign.aDelimeter);
					tmpOutput += SimpleSign.aDelimeter;
					SimpleSign.aDelimeter = undefined;
				} else if (signFuncName == "MultiSignFileInfo"
						|| signFuncName == "MultiSignFileInfoWithVID"
						|| signFuncName == "SignFileInfoAdd") {
					AnySign.mSimpleAuthEnvCi = tmpOutput;
					tmpOutput = commSign.attachFileInfo(tmpOutput, SimpleSign.aFileInfo, SimpleSign.aDelimeter);
				}

				if (SimpleSign.fincertCommon.mobileAppEnable && commSign.isMobilePlatform()) {
					if (ASL_appInfo == IOS_APP) {
						// iOS userContentController:didReceiveScriptMessage 호출(네이티브로 정보 전달)	
						webkit.messageHandlers.sign_Success.postMessage(tmpOutput);
					} else if (ASL_appInfo == ANDROID_APP) {
						// Android JavascriptInterface 호출(네이티브로 정보 전달)
						yeskeyAndroid.sendMessage(tmpOutput);
					}
				}
				commSign.SetLastLocation(mediaID);
				SimpleSign.doSuccess(tmpOutput);
			},
			fail: function (error) {
				var loading = document.getElementById('loading_layout');
				loading.style.display = 'none';
				// 800000 대한 에러는 예외 처리 by junseong
				if (error.code == 800000) {
					// yesSign.initLayout();
				}
				else {
					if (SimpleSign.fincertCommon.mobileAppEnable && commSign.isMobilePlatform()) {
						if (ASL_appInfo == IOS_APP) {
							// iOS userContentController:didReceiveScriptMessage 호출(네이티브로 정보 전달)		
							alert('IOS error : ' + error);
							webkit.messageHandlers.sign_Failure.postMessage(makeFailMsg(error));
						}
						else if (ASL_appInfo == ANDROID_APP) {
							alert('Android error : ' + error);
							// Android JavascriptInterface 호출(네이티브로 정보 전달)
							yeskeyAndroid.sendMessage(makeFailMsg(error));
						}
					} else {
						alert(error.code + ' : ' + error.message);
					}
					SimpleSign.onClose();
				}
			},
		}

		if (signFuncName == "MultiSignFileInfo" || signFuncName == "MultiSignFileInfoWithVID") {
			delete signParam.content.plainText;

			signParam.signFormat.withoutContent = true;
			signParam.content.hash = {
				hashes: SimpleSign.aFileHash,
				hashAlgorithm: 'SHA-256'
			};
		} else if (signFuncName == "SignFileInfoAdd") {
			delete signParam.content.plainText;

			signParam.content.multiSigner = {
				signedData: SimpleSign.signedData
			};
		}

		yesSign.sdk.sign(signParam);
	},
};
