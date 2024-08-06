var IOS_APP = "iOSAPP";
var ANDROID_APP = "androidAPP";

var initParam = {};
var ASL_appInfo;
var ASL_initInfo;
var signParam = {};

var FinCert;
var appInfo;

function loadSdk(_appInfo) {
  // console.log("loadSdk");
  ASL_appInfo = _appInfo;
  // console.log(ASL_appInfo);
  var _scriptElem = document.createElement("script");
  var SDK_URL = SimpleSign.fincertCommon.sdk;
  _scriptElem.src = SDK_URL + "?" + new Date().getTime();
  _scriptElem.id = "fincertSdk";
  document.querySelector("body").appendChild(_scriptElem);
  _scriptElem.onerror = loadSdk_FailCallback;
  _scriptElem.onload = loadSdk_SucCallback;
}

function loadSdk_SucCallback() {
  if (ASL_appInfo == IOS_APP) {
    // iOS userContentController:didReceiveScriptMessage 호출(네이티브로 정보 전달)
    webkit.messageHandlers.loadSdk_Success.postMessage("SUCCESS");
  } else if (ASL_appInfo == ANDROID_APP) {
    // android javascript interface 호출(네이티브로 정보 전달)
    yeskeyAndroid.sendMessage("SUCCESS");
  } else {
    // 웹 브라우저인 경우 처리
    // initSDK(initParamStr);
  }
  yesSign.loadCallbackEnd();
}

function loadSdk_FailCallback(_error) {
  alert('loadSdk Fail Callback');
  if (ASL_appInfo == IOS_APP) {
    // iOS userContentController:didReceiveScriptMessage 호출(네이티브로 정보 전달)
    alert('error : ' + _error);
    webkit.messageHandlers.loadSdk_Failure.postMessage(makeFailMsg(_error));
  } else if (ASL_appInfo == ANDROID_APP) {
    // android javascript interface 호출(네이티브로 정보 전달)
    alert('error : ' + _error);
    yeskeyAndroid.sendMessage(makeFailMsg(_error));
  } else {
    // 웹 브라우저인 경우 처리
    // failCallback(_error);
  }
}

function getYYYYMMDD() {
  var _date = new Date();
  var _year = _date.getFullYear();
  var _month = new String(_date.getMonth() + 1);
  var _day = new String(_date.getDate());
  if (_month.length == 1) {
    _month = "0" + _month;
  }
  if (_day.length == 1) {
    _day = "0" + _day;
  }
  return _year + _month + _day;
}

// ////////////////////////////////////////////////////////
// 2. SDK 초기화
// ////////////////////////////////////////////////////////
// EXPORT - 앱에서 호출해야 하는 함수
function initSdk(_paramStr) {
  // console.log("initSdk!!!");
  // console.log(_paramStr);
  initParam = JSON.parse(_paramStr);

  initParam.orgCode = SimpleSign.fincertCommon.orgCode;
  initParam.apiKey = SimpleSign.fincertCommon.apiKey;
  initParam.lang = yesSignSDK.lang[AnySignProp.signLanguage];

  //  initParam = {
  //      orgCode: document.getElementById("orgCode").value,
  //      apiKey: document.getElementById("apiKey").value,
  //      lang: document.getElementById("lang").value
  //  };

  if(initParam.useAutoConnInfo == "true"){
    initParam.useAutoConnInfo = true;
  }

  initParam.success = initSdk_SucCallback;
  initParam.fail = initSdk_FailCallback;

  // console.log("FinCert.Sdk.init");
  //FinCert.Sdk.init(initParam);
  // ASL_initInfo = JSON.parse(_paramStr);
  // initSdk_SucCallback(ASL_appInfo)
  _init();
}

function initSdk_SucCallback() {
  if (ASL_appInfo == IOS_APP) {
    // iOS userContentController:didReceiveScriptMessage 호출(네이티브로 정보 전달)
    webkit.messageHandlers.initSdk_Success.postMessage("SUCCESS");
  } else if (ASL_appInfo == ANDROID_APP) {
    // android javascript interface 호출(네이티브로 정보 전달)
    // yeskeyAndroid.sendMessage("SUCCESS");
    yeskeyAndroid.succInitSdk();
    // yesSign.initSdkEnd();
  } else {
    // 웹 브라우저인 경우
    // alert("초기화가 성공적으로 완료 되었습니다.");
  }
}

function initSdk_FailCallback(_error) {
  alert('initSdk Fail Callback');
  if (ASL_appInfo == IOS_APP) {
    // iOS userContentController:didReceiveScriptMessage 호출(네이티브로 정보 전달)
    alert('initSdk Fail : ' + _error);
    webkit.messageHandlers.initSdk_Failure.postMessage(makeFailMsg(_error));
  } else if (ASL_appInfo == ANDROID_APP) {
    // android javascript interface 호출(네이티브로 정보 전달)
    alert('initSdk Fail : ' + _error);
    yeskeyAndroid.sendMessage(makeFailMsg(_error));
  } else {
    // 웹 브라우저인 경우
    // alert("초기화가 성공적으로 완료 되었습니다.");
  }
}

function _init() {
  // if (!FinCert) {
  if (!yesSign.sdk) {
    // console.log("!FinCert");
    setTimeout(_init, 200);
    return;
  }

  // console.log("FinCert.Sdk.init");
  // console.log("yesSign.sdk.init");
  // FinCert.Sdk.init(initParam);
  yesSign.sdk.init(initParam);
}

function makeFailMsg(_error) {
  //var _failMsg = 'error.message: ' + _error.message + '|' + 'error.code: ' + _error.code;
  var _failMsg = 'error|' + _error.code + '|' + _error.message;
  console.log(_failMsg);
  return _failMsg;
}

//금융인증서 창 호출
// function sign(_signParamStr) {
//   // console.log(_signParamStr);
//   // signParam = JSON.parse(_signParamStr);

//   // alert('signParam : ');
//   // alert(signParam);
//   console.log(signParam);
//   signParam.success = sign_SucCallback;
//   signParam.fail = sign_FailCallback;

//   // FinCert.Sdk.sign(signParam);
//   yesSign.sdk.sign(signParam);
//   // yesSignSDK.doSign(signParam);
// }

//전자서명 성공 callback
// function sign_SucCallback(result) {
//   var signedValString = '';
//   // signedVals : Array of String(전자서명값)
//   for (var i = 0; i < result.signedVals.length; i++) {
//     if (signedValString != '') {
//       signedValString = signedValString + '|';
//     }
//     signedValString = signedValString + result.signedVals[i];
//   }
//   signedValString = signedValString + '$' + result.certSeqNum;

//   if (ASL_appInfo == IOS_APP) {
//     // iOS userContentController:didReceiveScriptMessage 호출(네이티브로 정보 전달)	
//     webkit.messageHandlers.sign_Success.postMessage(signedValString);
//   }
//   else if (ASL_appInfo == ANDROID_APP) {
//     console.log(signedValString);
//     // Android JavascriptInterface 호출(네이티브로 정보 전달)
//     yeskeyAndroid.sendMessage(signedValString);
//   }
//   else {
//     // 웹 브라우저인 경우
//     //alert("서명이 성공적으로 완료 되었습니다.");
//     //alert('전자서명 수행한 인증서의 일련번호 : ' + result.certSeqNum);
//     console.log("else");
//     document.getElementById("output_id1").value = signedValString;
//   }
// }

//전자서명 실패 callback
// function sign_FailCallback(_error) {
//   if (ASL_appInfo == IOS_APP) {
//     alert('IOS error : ' + _error);
//     // iOS userContentController:didReceiveScriptMessage 호출(네이티브로 정보 전달)		
//     webkit.messageHandlers.sign_Failure.postMessage(makeFailMsg(_error));
//   }
//   else if (ASL_appInfo == ANDROID_APP) {
//     console.log("sign error");
//     alert('Android error : ' + _error);
//     // Android JavascriptInterface 호출(네이티브로 정보 전달)
//     yeskeyAndroid.sendMessage(makeFailMsg(_error));
//   }
//   else {
//     alert('Web error : ' + _error);
//     // 웹 브라우저인 경우
//     //failCallback(_error);
//   }
//   alert('sign Fail - End');
// }

// function issue(_issueParamStr) {
//   console.log("issue");
//   var _issueParam = JSON.parse(_issueParamStr);

//   _issueParam.success = issue_SucCallback;
//   _issueParam.fail = issue_FailCallback;

//   FinCert.Sdk.issue(_issueParam);
// }

// function issue_SucCallback(response) {
//   console.log("issue_SucCallback");
//   if (appInfo == IOS_APP) {
//     if (response != undefined) {
//       _issueResultStr = response.certSeqNum.toString + '|' + response.simpleKeyToken;
//     }
//     else {
//       _issueResultStr = " ";
//     }
//     // iOS userContentController:didReceiveScriptMessage 호출(네이티브로 정보 전달)
//     webkit.messageHandlers.issue_Success.postMessage(_issueResultStr);
//   }
//   else if (appInfo == ANDROID_APP) {
//     if (response != undefined) {
//       _issueResultStr = response.certSeqNum.toString + '|' + response.simpleKeyToken;
//     }
//     else {
//       _issueResultStr = " ";
//     }
//     // Android JavascriptInterface 호출(네이티브로 정보 전달)
//     yeskeyAndroid.sendMessage(_issueResultStr);
//   }
//   else {
//     if (response != undefined) {
//       alert('successCallback() Called!\n'
//         + 'response.certSeqNum: ' + response.certSeqNum + '\n'
//         + 'response.simpleKeyToken: ' + response.simpleKeyToken);

//       console.info('successCallback() Called! '
//         + '(response.certSeqNum: ' + response.certSeqNum + ', '
//         + ' response.simpleKeyToken: ' + response.simpleKeyToken + ')');
//     }
//     //alert('successCallback() Called!');       
//   }
// }

// function issue_FailCallback(_error) {
//   console.log("issue_FailCallback");
//   if (appInfo == IOS_APP) {
//     // iOS userContentController:didReceiveScriptMessage 호출(네이티브로 정보 전달)		
//     webkit.messageHandlers.issue_Failure.postMessage(makeFailMsg(_error));
//   }
//   else if (appInfo == ANDROID_APP) {
//     // Android JavascriptInterface 호출(네이티브로 정보 전달)
//     yeskeyAndroid.sendMessage(makeFailMsg(_error));
//   }
//   else {
//     // 웹 브라우저인 경우
//     //failCallback(_error);
//   }
// }

// function getCertInfoList(_simpleKeyReqStr) {
//   var _certInfoListParam = {
//     "simpleKeyReq": _simpleKeyReqStr,
//     "success": getCertInfoList_SucCallback,
//     "fail": getCertInfoList_FailCallback
//   }

//   FinCert.Sdk.getCertInfoList(_certInfoListParam);
// }

// function getCertInfoList_SucCallback(result) {
//   var certInfoListData;

//   console.log("getCertInfoList_Success!");
//   result.certInfos.forEach(function (element) {
//     certInfoListData = JSON.stringify(element);
//   });

//   console.log(certInfoListData);

//   if (appInfo == IOS_APP) {

//   } else if (appInfo == ANDROID_APP) {
//     yeskeyAndroid.sendMessage(certInfoListData);
//   } else {

//   }
//   //console.log("간편인증 등록을 위한 간편인증토큰 : " + result.simpleKeyToken);
// }

// function getCertInfoList_FailCallback(_error) {
//   console.log(_error.code + " : " + _error.message);

//   if (appInfo == IOS_APP) {

//   } else if (appInfo == ANDROID_APP) {
//     yeskeyAndroid.sendMessage(makeFailMsg(_error));
//   } else {

//   }
// }

// function disconnectCloudConn() {
//   var _result = {
//     "success": function () {
//       console.log("DisconnectCloudConn_Success!");
//       if (appInfo == IOS_APP) {

//       } else if (appInfo == ANDROID_APP) {
//         yeskeyAndroid.sendMessage("DisconnectCloudConn_Success!");
//       } else {

//       }

//     },
//     "fail": function () {
//       console.log("DisconnectCloudConn_Fail!");
//       if (appInfo == IOS_APP) {

//       } else if (appInfo == ANDROID_APP) {
//         yeskeyAndroid.sendMessage("DisconnectCloudConn_Fail!");
//       } else {

//       }
//     }
//   }
//   FinCert.Sdk.disconnectCloudConn(_result);
// }

// function checkCloudConn(_checkCloudConnParamStr) {
//   console.log("checkCloudConn start!");

//   var _checkCloudConnParam = {
//     "success": checkCloudConn_SucCallback,
//     "fail": checkCloudConn_failCallback
//   }

//   FinCert.Sdk.checkCloudConn(_checkCloudConnParam);
// }

// function checkCloudConn_SucCallback(result) {
//   console.log("checkCloudConn_SucCallback!");

//   if (appInfo == IOS_APP) {

//   } else if (appInfo == ANDROID_APP) {
//     console.log("CheckCloudConnect : " + result.isConnected);
//     _checkCloudConnResultStr = "CheckCloudConnect : " + result.isConnected + "\n";
//     if (result.isConnected === false) {
//       console.log("Api Trance ID : " + result.apiTranId);   //대체인증을 위한 거래 ID
//       _checkCloudConnResultStr += "Api Trance ID : " + result.apiTranId;
//     }
//   }
//   yeskeyAndroid.sendMessage(_checkCloudConnResultStr);
// }

// function checkCloudConn_failCallback(_error) {
//   console.log("checkCloudConn_FailCallback");

//   if (appInfo == IOS_APP) {

//   } else if (appInfo == ANDROID_APP) {
//     yeskeyAndroid.sendMessage(makeFailMsg(_error));
//   }
// }

// 5. 자동연결정보 설정
function makeAutoConnInfo() {
  var _makeAutoConnInfoParam = {};

  // console.log("makeAutoConnInfo start!");

  _makeAutoConnInfoParam.success = makeAutoConnInfo_SucCallback;
  _makeAutoConnInfoParam.fail = makeAutoConnInfo_FailCallback;

  // FinCert.Sdk.makeAutoConnInfo(_makeAutoConnInfoParam);
  yesSign.sdk.makeAutoConnInfo(_makeAutoConnInfoParam);
}

function makeAutoConnInfo_SucCallback(response) {
  if (ASL_appInfo == IOS_APP) {
    if (response != undefined) {
      _makeAutoConnInfoResultStr = response.autoConnInfo;
    }
    else {
      _makeAutoConnInfoResultStr = " ";
    }
    webkit.messageHandlers.makeAutoConnInfo_Success.postMessage(_makeAutoConnInfoResultStr);
  }
  else if (ASL_appInfo == ANDROID_APP) {
    if (response != undefined) {
      _makeAutoConnInfoResultStr = response.autoConnInfo;
    }
    else {
      _makeAutoConnInfoResultStr = " ";
    }
    yeskeyAndroid.succMakeAutoConnInfo(_makeAutoConnInfoResultStr)
  }
}

function makeAutoConnInfo_FailCallback(_error) {
  alert('makeAutoConnInfo fail Callback');
  if (ASL_appInfo == IOS_APP) {
    alert('Error : ' + _error);
    webkit.messageHandlers.makeAutoConnInfo_Failure.postMessage(makeFailMsg(_error));
  }
  else if (ASL_appInfo == ANDROID_APP) {
    alert('Error : ' + _error);
    yeskeyAndroid.sendMessage(makeFailMsg(_error));
  }
}

// EXPORT - 앱에서 호출해야 하는 함수
function setAutoConnInfo(_setAutoConnInfoParamStr) {
  var _setAutoConnInfoParam = {};

  if(ASL_appInfo == IOS_APP) {
    _setAutoConnInfoParam = JSON.parse(_setAutoConnInfoParamStr);
  } else if(ASL_appInfo == ANDROID_APP) {
    _setAutoConnInfoParam.autoConnInfo = _setAutoConnInfoParamStr;
  }

  // _setAutoConnInfoParam.autoConnInfo = _setAutoConnInfoParamStr;
  _setAutoConnInfoParam.success = setAutoConnInfo_SucCallback;
  _setAutoConnInfoParam.fail = setAutoConnInfo_FailCallback;

  // FinCert.Sdk.setAutoConnInfo(_setAutoConnInfoParam);
  yesSign.sdk.setAutoConnInfo(_setAutoConnInfoParam);
}

function setAutoConnInfo_SucCallback(response) {
  if (ASL_appInfo == IOS_APP) {
    // console.log("appInfo == iOS_App!");
    if (response != undefined) {
      _setAutoConnInfoResultStr = response.needAutoConnInfo + '|' + response.isConnected + '|' + response.apiTranId;
      // console.log("자동연결 정보 재생성 필요 여부 : " + response.needAutoConnInfo);
      // console.log("자동연결 여부 : " + response.isConnected);
      if (response.isConnected === false) {
	      // console.log("대체인증(MO생략)을 위한 거래ID : " + response.apiTranId);
    	}
    }
    else {
      // console.log("response == undefined!");
      _setAutoConnInfoResultStr = " ";
    }
    webkit.messageHandlers.setAutoConnInfo_Success.postMessage(_setAutoConnInfoResultStr);
  }
  else if (ASL_appInfo == ANDROID_APP) {
    // console.log("appInfo == Android_App!");
    if (response != undefined) {
      _setAutoConnInfoResultStr = response.needAutoConnInfo + '|' + response.isConnected + '|' + response.apiTranId;
      // console.log("자동연결 정보 재생성 필요 여부 : " + response.needAutoConnInfo);
      // console.log("자동연결 여부 : " + response.isConnected);
      if (response.isConnected === false) {
        // console.log("대체인증(MO생략)을 위한 거래ID : " + response.apiTranId);
      }
    }
    else {
      // console.log("response != undefined!");
      _setAutoConnInfoResultStr = " ";
    }
    yeskeyAndroid.succSetAutoConnInfo(response.needAutoConnInfo);
  }
  yesSignSDK.doSign();
  // sign();
}

function setAutoConnInfo_FailCallback(_error) {
  alert('setAutoConnInfo Fail Callback');
  // console.log("setAutoConnInfo_FailCallback start!");
  if (ASL_appInfo == IOS_APP) {
    alert('Error : ' + _error);
    webkit.messageHandlers.setAutoConnInfo_Failure.postMessage(makeFailMsg(_error));
  }
  else if (ASL_appInfo == ANDROID_APP) {
    alert('Error : ' + _error);
    yeskeyAndroid.sendMessage(makeFailMsg(_error));
  }
}