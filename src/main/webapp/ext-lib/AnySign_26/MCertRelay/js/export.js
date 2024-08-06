/*******************************************************************************
 * import cert relay -setting 
 *******************************************************************************/
var gXecureKeypad = {
	enable: true,
	maxInputSize: 30,
	width: 100,
	viewType: 'half', //normal
	numberKeyRowCount: 2,
	closeDelay: 0,
	hasPressEffect: true,
	position: {top:10, left:null},
	isE2E: false,
	onlyMobile: true,
	autoKeyResize: true
};
/*******************************************************************************
 * export cert relay -language
 *******************************************************************************/
var _CERTRELAY_LETTER_TITLE_CERTILIST =
{
	"ko-KR": "인증서 리스트",
	"en-US": "Certificate List"
};
var _CERTRELAY_LETTER_EXPIRE_DATE =
{
	"ko-KR": "만료일이 %s일 남았습니다",
	"en-US": "You have %s days left to expire."
};
var _CERTRELAY_LETTER_CERTIFICATE_NOT_EXIST =
{
	"ko-KR": "등록된 브라우저인증서가 없습니다.",
	"en-US": "There is no registered browser certificate."
};
var _CERTRELAY_LETTER_CERTIFICATE_EXPIRY_DATE =
{
	"ko-KR": "만료일 : ",
	"en-US": "Expiry date : "
};
var _CERTRELAY_LETTER_CERTIFICATE_SOURCE =
{
	"ko-KR": "출처 : ",
	"en-US": "Source : "
};
var _CERTRELAY_LETTER_TITLE_CERTKEYWORD =
{
	"ko-KR": "현재 인증서 암호",
	"en-US": "Certificate Password"
};
var _CERTRELAY_LETTER_CERTKEYWORD_LENGTH_GUIDE =
{
	"ko-KR": "최소 10자리 이상",
	"en-US": "10 or more digits"
};
var _CERTRELAY_LETTER_CERTKEYWORD_LENGTH_GUIDE_2 =
{
	"ko-KR": "영문+숫자+특수문자 조합 10자리 이상 입력",
	"en-US": "Enter 10 or more alphanumeric characters plus special characters"
};
var _CERTRELAY_LETTER_OK =
{
	"ko-KR": "확인",
	"en-US": "OK"
};
var _CERTRELAY_LETTER_CANCEL = 
{
	"ko-KR": "취소",
	"en-US": "Cancel"
};
var _CERTRELAY_LETTER_TITLE_EXPORT_KEYWORD =
{
	"ko-KR": "내보낼 인증서 암호",
	"en-US": "Certificate password to export"
};
var _CERTRELAY_LETTER_TITLE_EXPORT_CHANGE_KEYWORD =
{
	"ko-KR": "변경 인증서 암호",
	"en-US": "Certificate password to change"
};
var _CERTRELAY_LETTER_TITLE_EXPORT_CHANGE_CHECK_KEYWORD =
{
	"ko-KR": "변경 인증서 암호 확인",
	"en-US": "Check Certificate password to change"
};
var _CERTRELAY_LETTER_COMPLETE =
{
	"ko-KR": "마침",
	"en-US": "Complete"
};
var _CERTRELAY_LETTER_AUTH_CODE =
{
	"ko-KR": "인증 번호",
	"en-US": "Auth Code"
};
var _CERTRELAY_LETTER_AUTH_CODE_GUIDE =
{
	"ko-KR": "인증번호 이용방법",
	"en-US": "Auth Code Usage"
};
var _CERTRELAY_LETTER_GUIDE_CONTENT_1 =
{
	"ko-KR": "[브라우저 인증서 복사]",
	"en-US": "[Browser Certificate Copy]"
};
var _CERTRELAY_LETTER_GUIDE_CONTENT_2 =
{
	"ko-KR": "1. 인증서를 이동시킬 브라우저에서 '인증서 가져오기'를 수행합니다.",
	"en-US": "1. In the browser where you want to move the certificate, perform a 'import certificate'."
};
var _CERTRELAY_LETTER_GUIDE_CONTENT_3 =
{
	"ko-KR": "2. 화면에 표시된 인증번호를 입력 후 가져오기를 완료합니다.",
	"en-US": "2. Enter the auth code displayed on the screen and complete the import."
};
var _CERTRELAY_ALERT_NOT_SAME_KEYWORD =
{
	"ko-KR": "새 비밀번호가 일치하지 않습니다.",
	"en-US": "New passwords do not match."
};
var _CERTRELAY_ALERT_ENTER_KEYWORD =
{
	"ko-KR": "현재 인증서 암호를 입력해주세요.",
	"en-US": "Please enter your current certificate password."
};
var _CERTRELAY_ALERT_ENTER_NEW_KEYWORD =
{
	"ko-KR": "변경할 인증서 암호를 입력해주세요.",
	"en-US": "Please enter your certificate password for change."
};
var _CERTRELAY_ALERT_KEYWORD_COUNT_OVER =
{
	"ko-KR": "인증서 비밀번호 오류가 %s회 발생하였습니다. (" + AnySign.mLimitedTrial + "회제한)", 
	"en-US": "Certificate password error occurred % times. (" + AnySign.mLimitedTrial + "times limit)"
};
var _CERTRELAY_LETTER_OPEN =
{
	"ko-KR": "열기",
	"en-US": "열기"
}
/*******************************************************************************
 * export cert relay -html
 *******************************************************************************/
var certrelayHtml = '\
<form name="xkf">\
	<div id="certListArea" class="list-wrap cert-wrap"></div>\
	<div id="passwdArea" style="display:none">\
		<div>\
			<h3>'+_CERTRELAY_LETTER_TITLE_CERTKEYWORD[AnySign.mLanguage]+'</h3>\
		</div>\
		<div class="input-wrap pd-0">\
			<label for="pwdPwd" class="sr-only">'+_CERTRELAY_LETTER_TITLE_CERTKEYWORD[AnySign.mLanguage]+'</label>\
			<input type="password" name="pwdPwd" id="pwdPwd" class="text secuKey" placeholder="'+_CERTRELAY_LETTER_CERTKEYWORD_LENGTH_GUIDE[AnySign.mLanguage]+'">\
		</div>\
		<div style="margin-top:40px">\
			<h3>'+_CERTRELAY_LETTER_TITLE_EXPORT_KEYWORD[AnySign.mLanguage]+'</h3>\
		</div>\
		<div class="input-wrap pd-0">\
		<label for="newpwdPwd" class="sr-only">'+_CERTRELAY_LETTER_TITLE_EXPORT_CHANGE_KEYWORD[AnySign.mLanguage]+'</label>\
			<input type="password" name="newpwdPwd" id="newpwdPwd" class="text secuKey" placeholder="'+_CERTRELAY_LETTER_CERTKEYWORD_LENGTH_GUIDE_2[AnySign.mLanguage]+'">\
		</div>\
		<div class="input-wrap pd-0">\
			<label for="chkpwdPwd" class="sr-only">'+_CERTRELAY_LETTER_TITLE_EXPORT_CHANGE_CHECK_KEYWORD[AnySign.mLanguage]+'</label>\
			<input type="password" name="chkpwdPwd" id="chkpwdPwd" class="text secuKey" placeholder="'+_CERTRELAY_LETTER_CERTKEYWORD_LENGTH_GUIDE_2[AnySign.mLanguage]+'">\
		</div>\
		<div class="btn-wrap col2 mg-t15">\
			<a class="btn-sub" href="javascript:_cert.cancel();">'+_CERTRELAY_LETTER_CANCEL[AnySign.mLanguage]+'</a>\
			<a class="btn-sub" href="javascript:_cert.export();">'+_CERTRELAY_LETTER_OK[AnySign.mLanguage]+'</a>\
		</div>\
	</div>\
</form>\
<div id="authcodeArea" style="display:none">\
<div style="text-align:center;margin:0 0 1.6rem"><h3>'+_CERTRELAY_LETTER_AUTH_CODE[AnySign.mLanguage]+'</h3></div>\
<div style="text-align:center">\
	<input class="input-auth" type="tel" id="auth1" name="auth1" maxlength="4" readOnly>\
		<span class="line">-</span>\
	<input class="input-auth" type="tel" id="auth2" name="auth2" maxlength="4" readOnly>\
		<span class="line">-</span>\
	<input class="input-auth" type="tel" id="auth3" name="auth3" maxlength="4" readOnly>\
</div>\
<div class="agree-all">\
	<div class="list-wrap agree-wrap accordion-wrap">\
	<ul class="ul-accordion">\
		<li class="accordion-list agree-list">\
			<a href="#">'+_CERTRELAY_LETTER_AUTH_CODE_GUIDE[AnySign.mLanguage]+'\
				<i class="blt"></i>\
			</a>\
			<div class="term" style="display:block">\
				<dl>\
					<dt>'+_CERTRELAY_LETTER_GUIDE_CONTENT_1[AnySign.mLanguage]+'</dt>\
					<dd><p>'+_CERTRELAY_LETTER_GUIDE_CONTENT_2[AnySign.mLanguage]+'</p></dd>\
					<dd><p>'+_CERTRELAY_LETTER_GUIDE_CONTENT_3[AnySign.mLanguage]+'</p></dd>\
				</dl>\
			</div>\
		</ul>\
	</div>\
	<div class="btn-wrap mg-t20">\
		<button type="button" onclick="_cert.cancel();" class="btn-main">'+_CERTRELAY_LETTER_COMPLETE[AnySign.mLanguage]+'</button>\
	</div>\
</div>\
</div>\
';
$("#hancomwith-div").html(certrelayHtml);
/*******************************************************************************
 * export cert relay -document on
 *******************************************************************************/
$(document).on({
	click: function(e) {
		var expireDay = $(this).find("input[name=prmExpireDay]").val();
		if(expireDay<0){
			return;
		}
		_cert.select( $(this) );
	}
}, "a.certSelectBtn");

$(document).on({
	keyup: function(e) {
		$(this).val($(this).val().replace(/[^0-9]/g,""));
		var aLength = $(this).val().length;
		console.log(aLength);
	}
}, "input.input-auth");

$(document).on({
	focus: function (e) {
		_cert.InputHandlerOld = new _cert.inputKeyHandler($(this));
	}
}, "#pwdPwd");

$(document).on({
	focus: function (e) {
		_cert.InputHandlerNew = new _cert.inputKeyHandler($(this));
	}
}, "#newpwdPwd");

$(document).on({
	focus: function (e) {
		_cert.InputHandlerChk = new _cert.inputKeyHandler($(this));
	}
}, "#chkpwdPwd");

/*******************************************************************************
 * export cert relay -function
 *******************************************************************************/
function createRandomAuth () {
	var aNumber = new Array();
	var cn = 0;

	create = function () {
		return parseInt((window.crypto || window.msCrypto).getRandomValues(new Uint16Array(1)) % 9999);
	}

	while (aNumber.length < 3) {
		var n = create();
		if (n.toString().length != 4)
			continue;
		if (aNumber.indexOf(n) < 0)
			aNumber.push(n);
	}

	return aNumber;
}

function fncGetCertTree_callback(aResult){
	_cert.setCertTree(aResult);
}

function _setOpenStorageCallback(resultCode){
	if(resultCode == "0"){
		if (typeof window.fncGetCertTree_callback === "function") {
			_cert.getCertTree();
		} else {
			CloseLoadingWithMask();
		}
	} else {
		CloseLoadingWithMask();
		_alert(XCrypto.getLastErrCode() + " : " + XCrypto.getLastErrMsg());
	}
}

function getCurrentDateTime(){
	var d = new Date();
	var year = d.getFullYear()+"";
	var month = d.getMonth()+1;
	var day = d.getDate();
	var hour = d.getHours();
	var minute = d.getMinutes();
	var second = d.getSeconds();
	var milSecond = "0";

	var addZero = function(val){
		if(val<10){
			return "0"+val;
		} else {
			return ""+val;
		}
	}

	month		= addZero(month);
	day			= addZero(day);
	hour		= addZero(hour);
	minute		= addZero(minute);
	second		= addZero(second);
	return year+month+day+hour+minute+minute+second+milSecond;
}

function toTimeObject(time) { //parseTime(time)
	// Time 스트링을 자바스크립트 Date 객체로 반환
	var year  = time.substr(0,4);
	var month = time.substr(4,2) - 1; // 1월=0,12월=11
	var day   = time.substr(6,2);
	var hour  = time.substr(8,2);
	var min   = time.substr(10,2);

	return new Date(year,month,day,hour,min);
}

function getDayInterval(time1,time2) {
	// 두 Time이 몇일 차이가 나는지?
	var date1 = toTimeObject(time1);
	var date2 = toTimeObject(time2);
	var day   = 1000 * 3600 * 24; //24시간

	return parseInt((date2 - date1) / day, 10);
}

function replaceAll(targetStr, searchStr, replaceStr) {
	var i=0;
	var j=0;
	if (targetStr == null || searchStr == null || replaceStr == null) return "";

	var tmpStr = "";
	var tlen = targetStr.length;
	var slen = searchStr.length;

	var i=0;
	var j=0;
	while (i < tlen - slen+1) {
		j = i + slen;

		if (targetStr.substring(i,j) == searchStr) {
			tmpStr += replaceStr;
			i += slen;
		} else {
			tmpStr += targetStr.substring(i, i + 1);
			i++;
		}
	}
	if(typeof targetStr == 'string'){
		tmpStr +=  targetStr.substring(i);
	}

	return tmpStr;
}
/*******************************************************************************
 * export cert relay -core
 *******************************************************************************/
var _cert = {
	getCertTree: function () {
		var media = XW_CERT_LOCATION_LOCALSTORAGE;
		var certType = "0";
		var searchType = "0"
		var caList = "";
		var serialList = "";
		var contentLevel = "5";

		var callback = function(aResult) {
			/* set Certificate Tree */
			var strList = "<ul>";
			if(aResult == "") {
				strList += '<li class="nodata"><p>';
				strList += _CERTRELAY_LETTER_CERTIFICATE_NOT_EXIST[AnySign.mLanguage];
				strList += '</p></li>';
			} else {
				var arrayOfCerts = aResult.split("\t\n");
				var intArrayCount = arrayOfCerts.length - 1;

				if (intArrayCount < 1) {
					strList += '<li class="nodata"><p>';
					strList += _CERTRELAY_LETTER_CERTIFICATE_NOT_EXIST[AnySign.mLanguage];
					strList += '</p></li>';
					return;
				}

				for (i =0 ; i<intArrayCount; i++) {
					var strOfCerts = arrayOfCerts[i];
					var arrayOfStrings = strOfCerts.split("$");
					var strDN = arrayOfStrings[2];

					var arrayDN = strDN.split("cn=");
					var strUserName = "";

					if (arrayDN.length > 1) {
						strUserName = arrayDN[1];
						arrayDN = strUserName.split("(");
						if (arrayDN.length > 0) {
							strUserName = arrayDN[0];
						}
					}

					var certParam = {
						SERIAL : arrayOfStrings[6]
									 , ISSUER_DN : arrayOfStrings[5]
									 , USER_NAME : strUserName
									 , USAGE : arrayOfStrings[1]
									 , ISSUER : arrayOfStrings[3]
									 , TO : arrayOfStrings[4]
									 , STORAGE : arrayOfStrings[7] || "LOCAL"
					}

					var today	= getCurrentDateTime().substr(0, 8); 
					var toDate	= replaceAll(certParam.TO, "-", ""); 

					var dayInterval		= getDayInterval( today, toDate ); 
					var statusClass		= ""; 
					var cloudClass		= ""; 
					var expireText		= ""; 
					if(dayInterval<0){

						statusClass = "expire";
					} else if(dayInterval<=30){

						statusClass	= "near";
						
						expireText = '<p class="alert"><i>!</i>';
						expireText += _CERTRELAY_LETTER_EXPIRE_DATE[AnySign.mLanguage].replace("%s", dayInterval);
						expireText += '</p>';
					}
					if( certParam.STORAGE==="OPENCERT" ){
						cloudClass = "cloud";
					}

					var certLiHtml = '\
									 <li>\
									 <a href="javascript:void(0);" class="certSelectBtn">\
									 <input type="hidden" name="prmSerial" value="'+certParam.SERIAL+'" />\
									 <input type="hidden" name="prmIssuerDN" value="'+certParam.ISSUER_DN+'" />\
									 <input type="hidden" name="prmTo" value="'+toDate+'" />\
									 <input type="hidden" name="prmExpireDay" value="'+dayInterval+'" />\
									 <dl class="cert-info '+statusClass+' '+cloudClass+'">\
									 <dt>'+certParam.USER_NAME+'</dt>\
									 <dd>\
									 <p>'+certParam.USAGE+' / '+certParam.ISSUER+'</p>\
									 <p>'+_CERTRELAY_LETTER_CERTIFICATE_EXPIRY_DATE[AnySign.mLanguage]+certParam.TO+'</p>\
									 <p>'+_CERTRELAY_LETTER_CERTIFICATE_SOURCE[AnySign.mLanguage]+certParam.STORAGE+'</p>\
									 '+expireText+'\
									 </dd>\
									 </dl>\
									 </a>\
									 </li>\
									 ';
					strList += certLiHtml;

				} 
			}

			strList += "</ul>";
		
			var certListTitle = "<div style='text-align:center;border-bottom:0.5rem solid #ebeef0'><h3>";
			certListTitle += _CERTRELAY_LETTER_TITLE_CERTILIST[AnySign.mLanguage];
			certListTitle += "<h3></div>";
			strList = certListTitle + strList;

			var $certListArea = $("div#certListArea");
			$certListArea.html(strList);
			$certListArea.show();

			CloseLoadingWithMask();
		}

		XCrypto.getCertTree(media, certType, searchType, caList, serialList, contentLevel, callback);
	},
	select: function ($this) {
		$("#certListArea").css('display', 'none');
		$("#passwdArea").css('display', '');

		window.certErrorCount = 0;

		_cert.data = _cert.data || {};
		_cert.data.prmSerial = $this.find("input[name='prmSerial']").val();
		_cert.data.prmIssuerDN = $this.find("input[name='prmIssuerDN']").val();
		_cert.data.dateTime = _cert.data.dateTime || "/20190920142124017";
		_cert.data.prmKeyword = $this.find("input[name='pwdPwd']").val();
	}, 
	export: function () {
		var prmKeyword = $("#pwdPwd").val();
		if (prmKeyword == "") {
			_alert(_CERTRELAY_ALERT_ENTER_KEYWORD[AnySign.mLanguage]);
			return;
		}

		if ($("#newpwdPwd").val() == "" || $("#chkpwdPwd").val() == "") {
			_alert(_CERTRELAY_ALERT_ENTER_NEW_KEYWORD[AnySign.mLanguage]);
			return;
		}

		if ($("#newpwdPwd").val() != $("#chkpwdPwd").val()) {
			_alert(_CERTRELAY_ALERT_NOT_SAME_KEYWORD[AnySign.mLanguage]);
			$("input#newpwdPwd").val("");
			$("input#chkpwdPwd").val("");
			return;
		}

		var _signDataCallback = function(sign) {
			if(sign=="") {
				var _errCallback = function(){
					$("input#pwdPwd").val("");
				};

				var errCode = XCrypto.getLastErrCode();
				if(errCode == "453182725") {
					window.certErrorCount++;
					if(certErrorCount >= AnySign.mLimitedTrial){
						_cert.cancel();
					}
					var message = _CERTRELAY_ALERT_KEYWORD_COUNT_OVER[AnySign.mLanguage];
					message = message.replace("%s", certErrorCount);
					_alert(message).then(_errCallback);
					return;
				}
				_alert("[" + errCode + "] " + XCrypto.getLastErrMsg()).then(_errCallback);
			} else {
				var authCode = createRandomAuth();
				var aTotalAuthCode = "";
				authCode.forEach (function (num) {
					aTotalAuthCode += num;
				});

				var _cb_exportCertRelayFromBrowser = function () {
					CloseLoadingWithMask();

					_cert.InputHandlerOld.clear();
					_cert.InputHandlerNew.clear();
					_cert.InputHandlerChk.clear();

					var errCode = XCrypto.getLastErrCode();
					if (errCode != 0) {
						_alert(XCrypto.getLastErrMsg()).then(_cert.cancel);
						return;
					}

					$("#auth1").val(authCode[0]);	
					$("#auth2").val(authCode[1]);	
					$("#auth3").val(authCode[2]);	

					$("#passwdArea").hide();
					$("#authcodeArea").show();
				};

				XCrypto.exportCertRelayFromBrowser (AnySign.mCertRelayFromBrowserServerUrl,
													aTotalAuthCode,
													_cert.data.prmIssuerDN,
													_cert.data.prmSerial,
													_cert.InputHandlerOld.getValue(),
													_cert.InputHandlerNew.getValue(),
													AnySign.mWithCredentialsForCORS,
													_cb_exportCertRelayFromBrowser);

				LoadingWithMask(gLoadingImg_path);
			}
		} 

		if (gXecureKeypad.enable)
			XCrypto.setSecureInput("13");
		else
			XCrypto.setSecureInput("0");

		XCrypto.signData(XW_CERT_LOCATION_LOCALSTORAGE,
						 _cert.data.prmIssuerDN,
						 _cert.data.prmSerial,
						 _cert.InputHandlerOld.getValue(),
						 _cert.data.dataTime,
						 1048576,
						 _signDataCallback);
	},
	setOpenCert: function () {
		var aOpenCertEventListener = function (listener) {
			if(listener == "connect" ||
			   listener == "disconnect" ||
			   listener == "setPKCS12" ||
			   listener == "removeCertFromTray")
			{
				LoadingWithMask(gLoadingImg_path);
				_cert.getCertTree();
			}
		};

		LoadingWithMask(gLoadingImg_path);

		if (AnySign.mOpenCertEnable)
			XCrypto.setOpenStorage(AnySign.mOpenApi, [AnySign.mOpenCertJS, AnySign.mOpenCertRelayJS], aOpenCertEventListener, null, _setOpenStorageCallback);
		else
			_cert.getCertTree();
	},
	inputKeyHandler: function (aElement) {

		if (gXecureKeypad.enable) 
		{
			if (!_cert.xkModule)
				_cert.xkModule = [];

			var aXKModule = new XKModule();
			_cert.xkModule.push(aXKModule);

			var form = document.xkf;
			var inputPreviewList = document.querySelectorAll('.keypad-preview li');

			var aName = 'xk-pad' + aElement.attr('id');

			var aRet = aXKModule.initialize({
				name               : aName,
				editBox            : aElement[0],
				keyType            : 'qwertysmart',
				maxInputSize       : gXecureKeypad.maxInputSize,
				width              : gXecureKeypad.width,
				position           : gXecureKeypad.position,
				viewType           : gXecureKeypad.viewType, 
				numberKeyRowCount  : gXecureKeypad.numberKeyRowCount,
				closeDelay         : gXecureKeypad.closeDelay,
				autoKeyResize      : gXecureKeypad.autoKeyResize,
				isE2E              : gXecureKeypad.isE2E,
				onlyMobile		   : gXecureKeypad.onlyMobile,
				hasPressEffect	   : gXecureKeypad.hasPressEffect,
				onInputChange      : function (newLength) {
					if(newLength === gXecureKeypad.maxInputSize && aXKModule.isOpend()) {
						aXKModule.close();
					}
				},
				onKeypadClose      : function () {
				},
			});

			aElement.attr('readonly', true);
		} 
		else
		{
		}

		return {
			getValue: function () {
				var aType;
				if (gXecureKeypad.enable)
					aType = 13;
				else
					aType = 0;

				if (aType == 13)
					return {type: aType, keypad: aXKModule};
				else
					return aType + "$" + aElement.val();
			},
			clear: function () {
				if (gXecureKeypad.enable) {
					aXKModule.close();
				} else {
					aElement.val("");
				}
			}
		}
	},
	cancel: function() {
		$("input#pwdPwd").val("");
		$("input#newpwdPwd").val("");
		$("input#chkpwdPwd").val("");

		if (_cert.xkModule) {
			_cert.xkModule.forEach(function (ele) {
				ele.close();
			});
		}

		$("#passwdArea").hide();
		$("#authcodeArea").hide();
		$("#certListArea").show();
	}
};

/*******************************************************************************
 * export cert relay -init 
 *******************************************************************************/
if (XCrypto) {
	XCrypto.setLicense(AnySign.mLicense);
	_cert.setOpenCert();
} else {
	_alert('XCrypto not exist');
}
