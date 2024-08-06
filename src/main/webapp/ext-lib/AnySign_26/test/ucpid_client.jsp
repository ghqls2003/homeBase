<!DOCTYPE HTML>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="xecure.servlet.*" %>
<%@ page import="xecure.crypto.*" %>
<%@ page import="java.security.*" %>
<%@ page import="java.util.Random" %>
<%@ page import="java.io.File" %>
<% request.setCharacterEncoding("utf-8"); %>
<% response.setContentType("text/html; charset=utf-8"); %>
<%
        String charset = "utf-8";
        String yeskey_sign_result_page = "./yeskey_sign_result.jsp";
        String yeskey_vid_result_page = "./yeskey_vid_result.jsp";
        String simple_sign_result_page = "./simple_sign_result.jsp";
        String simple_vid_result_page = "./simple_vid_result.jsp";
		String sign_result_page = "./sign_result.jsp";
        String link_charset = "euc-kr";
        String link_page = "./AnySign4PCTest_euckr.jsp";
%>
<html>
<head>
<title>AnySignLite UCPID Test</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
<style type="text/css">
<!--
form			{margin:0px 0px 0px 0px;}
input.largebtn	{ width: 500px; }
input.mediumbtn	{ width: 300px; }
input.smallbtn	{ width: 150px; }
h1, h2, h3, h4  { margin:0;}
h3              { font-size:13pt; background-color:#EEE;}
.test			{border:1px dashed gray; width:100%}
.test td		{font-size: 9pt;color: #333333;background: #EEEEEE;text-align: center;}
select.combo	{width:150px; font-size: 9pt;color: #333333;;}
.inputtext		{width: 98%;}
.inputtextarea	{width: 99%;word-break:break-all;}
.inputselect	{width: 100%;}
ainput{border:0px; margin:2px; padding:1px;}
.inputbutton	{width: 100%;height: 100%; border:1px solid #d3d3d3; margin:2px; padding:1px;}
.inputcheck		{width: 14px;height: 14px;}
-->
</style>

<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script type="text/javascript">
document.write("<script type=\"text/javascript\" src=\"" + "../anySign4PCInterface.js" + "?version=" + new Date().getTime() + "\"></scr"+"ipt>");
</script>

<script language='javascript'>
<%
	VidVerifier vid = new VidVerifier(new XecureConfig());
	out.println(vid.ServerCertWriteScript());
%>
</script>


<!-- XecureKeyPad Plugin, Lite(HTML5), E2E(XFS) -->
<script type="text/javascript" src="../XecureKeypad/js/xkeypad_config.js"></script>
<script type="text/javascript" src="../XecureKeypad/js/xkeypad_html5.js"></script>
<script type="text/javascript" src="../XecureKeypad/js/xkeypad_plugin.js"></script>
<script type="text/javascript" src="../XecureKeypad/js/xkeypad_desktop.js"></script>

<script>
var useTranskey = false;
var aSessionKey = "";

function init()
{
	//(구)공인인증서 AnySign 객체접근이 필요하므로 동적으로 로딩완료후 호출하는것으로 변경
	initCommonOptionSetting();
	initForm();  
	numbering();
	checkKeyboard();

	// 키보드 보안 모듈 초기화
	//initKeyboard();
}

// 키보드 보안, 가상 키패드 설정
function enableSecureKey(element)
{
	// 가상 키패드
	if (element.id == "Enable_XecureKeyPad") {
		AnySign.mXecureKeyPadEnable =! AnySign.mXecureKeyPadEnable;
		AnySign.mXecureKeyPadHTML5Enable =! AnySign.mXecureKeyPadHTML5Enable;
		if (AnySign.mXecureKeyPadEnable) {
			AnySign.mTransKeyEnable = false;
			AnySign.mOpenkeyboardEnable = false;
			AnySign.mIncaNOSv10Enable = false;
			AnySign.mIncaNOSv10KeypadEnable = false;
		}
	}
	checkKeyboard();
}

function checkKeyboard()
{
	// AnySign4PC
	var aKeypad = document.getElementById("Enable_XecureKeyPad");
	/* aKeypad.value = AnySign.mXecureKeyPadEnable; */

	for (var i = 0; i < aKeypad.length; i++)
	{
		if (AnySign.mXecureKeyPadEnable == aKeypad[i].value)
		{
			/* AnySign.mLanguage = AnySignProp.signLanguage; */
			aLanguage[i].checked = true;
			break;
		}
	}
}

function base64UrlEncode(str) {
	return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
}

function base64UrlDecode(str) {
	return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
}

function sumCheckbox (aCheckbox)
{
	var aIter;
	var aTotal = 0;

	for (aIter = 0;aIter < aCheckbox.length;aIter++)
	{
		if (aCheckbox[aIter].checked)
			aTotal += parseInt (aCheckbox[aIter].value);
	}
	return aTotal;
}

function numbering ()
{
	var aElements = document.getElementsByTagName('h3');

	for (i = 0 ; i < aElements.length ; i++)
	{
		aElements[i].innerHTML = (i + 1) + ". " + aElements[i].innerHTML;
		aElements.id = "elem" + (i + 1);
	}
}

function initCommonOptionSetting()
{

	var aSignType = document.getElementsByName("SimpleSignType");
	for (var i = 0; i < aSignType.length; i++)
	{
		if (AnySignProp.signType == aSignType[i].value)
		{
			aSignType[i].checked = true;
			break;
		}
	}

	var aLanguage = document.getElementsByName("SimpleSignLanguage");
	for (var i = 0; i < aLanguage.length; i++)
	{
		if (AnySignProp.signLanguage == aLanguage[i].value)
		{
			AnySign.mLanguage = AnySignProp.signLanguage;
			aLanguage[i].checked = true;
			break;
		}
	}

	/*
	// AnySignProp 설정 옵션변수를 공통 설정창에 선택되도록 표시
	// 전자서명창 화면설정
	var simpleSignType = commSign.getRadioBoxValue('SimpleSignType');
	AnySignProp.signType = simpleSignType;

	// 언어 설정
	var simpleSignLanguage = commSign.getRadioBoxValue('SimpleSignLanguage');
	AnySignProp.signLanguage = simpleSignLanguage;
	// AnySign 의 언어설정도 설정값 적용
	AnySign.mLanguage = simpleSignLanguage;
	*/
}

function enableSimpleSignTypeOption(element)
{
	AnySignProp.signType = element.value;
}

function enableSimpleSignLanguageOption(element)
{
	AnySignProp.signLanguage = element.value;
	AnySign.mLanguage = AnySignProp.signLanguage;
}

//(구)공인인증서 AnySign 객체접근이 필요하므로 동적으로 로딩완료후 호출하는것으로 변경
function initForm ()
{
	//AnySign.mAnySignSID = 'reaverTestSID19810531'; 
	//AnySign.mCharset = "utf-8";

	// form_SignDataUCPID
	document.getElementById ("form_SignDataUCPID").aOrgCode.value = "123";
	document.getElementById ("form_SignDataUCPID").aIspUrlInfo.value = "www.mydata.or.kr";

	if(document.getElementById ("form_SignDataUCPID").aUserAgreement.value == "") {
		document.getElementById ("form_SignDataUCPID").aUserAgreement.value = "본인확인 이용약관:본인확인 요청에 동의합니다.";
	}

	if(document.getElementById ("form_SignDataUCPID").aConsent.value == "") {
		document.getElementById ("form_SignDataUCPID").aConsent.value = "Test 계좌 정보 내용...";
	}

	var ucpidNonce = document.getElementsByName('aUcpidNonce');
	var consentNonce = document.getElementsByName('aConsentNonce');

	var tmp;

	tmp = generateRandom(16);
	document.getElementById("form_SignDataUCPID").aUcpidNonce.value = base64UrlEncode(tmp);

	tmp = generateRandom(16);
	document.getElementById("form_SignDataUCPID").aConsentNonce.value = base64UrlEncode(tmp);

	console.debug('================================');
	console.debug(AnySign);
	console.debug('================================');
}

function generateRandom(byte)
{
	var tmp = "";
	var i;
	var rnd;
	for (i = 0; i < byte; i++)
	{
		rnd = Math.floor(Math.random() * 256);
		tmp += String.fromCharCode(rnd);
	}
	return tmp;
}

function SignDataUCPID_callback (aResult)
{
	document.getElementById ("form_SignDataUCPID").aResult.value = aResult;
}

function GetLastLocation_callback (aResult)
{
	alert(aResult);
}

function onSendToServer(value)
{

	var aRequest = new XMLHttpRequest ();
	var aResponse = "";
	var aURL = "";
	var aMessage = "";

	aURL = "<%=sign_result_page%>";
	aRequest.open ("POST", aURL, false);
	aRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	aRequest.send ("SIGNED=" + encodeURIComponent(value));

	if (aRequest.status == 200)
	{
		try
		{
			aResponse = eval (aRequest.responseText);

			if (parseInt (aResponse["code"]) != 0)
			{
				alert ("오류코드:" + aResponse["code"] + "\n" +
					   "오류메시지:" + aResponse["reason"]);
				return;
			}
		}
		catch (evalException)
		{
			alert ("Evaluate exception(" + evalException + "):\n" + aRequest.responseText);
			return;
		}

		aMessage += "서명 원문:\n" + aResponse["plain"] + "\n";
		aMessage += "사용자 RDN:\n" + aResponse["subjectRDN"] + "\n";
		aMessage += "사용자 인증서:\n" + aResponse["certificatePEM"] + "\n";
		
		alert (aMessage);
	}
	else
	{
		aMessage += "Server error\n";
		aMessage += "HTTP Status: " + aRequest.status + " ";
		aMessage += "(" + aRequest.statusText + ")";
		
		alert (aMessage);
	}
}

function verifyMessage (value, total, delimeter)
{
	var aSignedMsg = "";
	var aVerifiedMsg = "";
	var aResult = "";
	var aLength = "";
	var aIndex = "";

	aSignedMsg = value;

	for (i = 0; i < total; i++)
	{
		aLength = aSignedMsg.aLength;
		aIndex = aSignedMsg.indexOf (delimeter);
		onSendToServer (aSignedMsg.substring(0, aIndex), true);
		aSignedMsg = aSignedMsg.substring (aIndex+1, aLength);
	}

}

// AnySign4PC 설치 확인 및 초기화
function checkAnySign4PC()
{
	document.getElementById("AnySign4PC_Version").innerHTML = AnySign.mVersion;
	document.getElementById("Enable_AnySignLoad").value = AnySign.mAnySignLoad;
	
	if (AnySign.mAnySignLoad == true)
		document.getElementById("Enable_AnySignLoad").style.fontWeight = "bold";
}

function initAnySign4PC()
{
	checkAnySign4PC();
	if (!AnySign.mAnySignLoad) {
		AnySign4PC_LoadCallback (checkAnySign4PC);
		PrintObjectTag ();
	}
}

// AnySignLite 설정
function checkAnySignLite()
{
	document.getElementById("Enable_AnySignLite").value = AnySign.mAnySignLiteEnable;
}

function enableAnySignLite()
{
	AnySign.mAnySignLiteEnable =! AnySign.mAnySignLiteEnable;
	document.getElementById("Enable_AnySignLite").value = AnySign.mAnySignLiteEnable;
}

function addValue() {
	// form_SignDataUCPID
	document.getElementById ("form_SignDataUCPID").aOrgCode.value += "|456";
	document.getElementById ("form_SignDataUCPID").aIspUrlInfo.value += "|www.mydata2.or.kr";

	document.getElementById ("form_SignDataUCPID").aUserAgreement.value += "|본인확인 이용약관2:본인확인 요청에 동의합니다.";

	document.getElementById ("form_SignDataUCPID").aConsent.value += "|Test 계좌 정보 내용...2";

	var ucpidNonce = document.getElementsByName('aUcpidNonce');
	var consentNonce = document.getElementsByName('aConsentNonce');

	var tmp;

	tmp = generateRandom(16);
	document.getElementById("form_SignDataUCPID").aUcpidNonce.value += "|" + base64UrlEncode(tmp);

	tmp = generateRandom(16);
	document.getElementById("form_SignDataUCPID").aConsentNonce.value += "|" + base64UrlEncode(tmp);
}

function makeJsonArray() {
	var jsonArray = new Array(); 			// 최종 결과물
	var finalJsonObject1 = new Object();
	var finalJsonObject2 = new Object();
	var jsonObject1 = new Object();
	var jsonObject2 = new Object();

	var orgCode = document.getElementById ("form_SignDataUCPID").aOrgCode.value.split("|");
	var userAgreement = document.getElementById ("form_SignDataUCPID").aUserAgreement.value.split("|");
	var ispUrlInfo = document.getElementById ("form_SignDataUCPID").aIspUrlInfo.value.split("|");
	var ucpidNonce = document.getElementById ("form_SignDataUCPID").aUcpidNonce.value.split("|");
	var consentNonce = document.getElementById ("form_SignDataUCPID").aConsentNonce.value.split("|");
	var consent = document.getElementById ("form_SignDataUCPID").aConsent.value.split("|");

	var len = orgCode.length;

	for(var i=0;i<len;i++) {
		var finalJsonObject1 = new Object();
		var finalJsonObject2 = new Object();
		var jsonObject1 = new Object();
		var jsonObject2 = new Object();
		finalJsonObject1["orgCode"] = orgCode[i];

		finalJsonObject2["userAgreement"] = userAgreement[i];

		if(document.getElementById("form_SignDataUCPID").aRealName.checked) {
			jsonObject1["realName"] = true;
		} else {
			jsonObject1["realName"] = false;
		}
		if(document.getElementById("form_SignDataUCPID").aGender.checked) {
			jsonObject1["gender"] = true;
		} else {
			jsonObject1["gender"] = false;
		}
		if(document.getElementById("form_SignDataUCPID").aNationalInfo.checked) {
			jsonObject1["nationalInfo"] = true;
		} else {
			jsonObject1["nationalInfo"] = false;
		}
		if(document.getElementById("form_SignDataUCPID").aBirthDate.checked) {
			jsonObject1["birthDate"] = true;
		} else {
			jsonObject1["birthDate"] = false;
		}
		if(document.getElementById("form_SignDataUCPID").aCi.checked) {
			jsonObject1["ci"] = true;
		} else {
			jsonObject1["ci"] = false;
		}

		finalJsonObject2["userAgreeInfo"] = jsonObject1;
		finalJsonObject2["ispUrlInfo"] = ispUrlInfo[i];
		finalJsonObject2["ucpidNonce"] = ucpidNonce[i];

		finalJsonObject1["ucpidRequestInfo"] = finalJsonObject2;

		jsonObject2["consent"] = "{" + consent[i] + "}";
		jsonObject2["consentNonce"] = consentNonce[i];
		finalJsonObject1["consentInfo"] = jsonObject2;

		jsonArray.push(finalJsonObject1);
	}

	console.log(JSON.stringify(jsonArray));

	return JSON.stringify(jsonArray);
}


//SetConvertTable();
</script>
</head>
<body onload="init();" leftmargin="0" topmargin="0" style="padding-top:0px; padding-left:10px; padding-right:10px;">

<!--br><a title="새창" id="cert_login" href="#">공인인증서 로그인</a><p-->
<form name='xecure'><input type=hidden name='p'>
</form>
<br>
	<table width="100%" align='center' border="0" cellspacing="0" cellpadding="0" height="100%" style="max-width: 1024px;">
		<!-- Header -->
		<tr>
			<td>
				<div id="xecure_header" />
			</td>
		</tr>

		<!-- Body -->
		<tr>
			<td valign="top">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<!-- contents start -->
						<td>
							<!-- CENTER START -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td colspan="3">
										<!-- 간편인증 통합 공통 설정 시작 -->
										<h3 id="5">간편인증 통합[SimpleSign] 공통 설정</h3>
										<table class="test" style="border: 1px dashed #e81212;">
											<tr>
												<td width="15%">화면선택</td>
												<td width="85%" style="text-align: left;" colspan="2">
													<input type="radio" class="inputcheck" name="SimpleSignType" value="SimpleSignAll" onClick="enableSimpleSignTypeOption(this)"> (신UI)공동인증서 &  간편인증서[Active] <b>(기본값)</b><br/>
													<input type="radio" class="inputcheck" name="SimpleSignType" value="AnySignAll" onClick="enableSimpleSignTypeOption(this)"> (신UI)공동인증서[Active] &  간편인증서 <br/>
													<input type="radio" class="inputcheck" name="SimpleSignType" value="SimpleSign" onClick="enableSimpleSignTypeOption(this)"> 간편인증서<br/>
													<input type="radio" class="inputcheck" name="SimpleSignType" value="AnySign" onClick="enableSimpleSignTypeOption(this)"> (신UI)공동인증서<br/>
													<input type="radio" class="inputcheck" name="SimpleSignType" value="AnySignOld" style="opacity:0.5" onClick="enableSimpleSignTypeOption(this)"><span style="color:grey"> (구UI)공동인증서 (미사용권고)</span><br/>													
												</td>
											</tr>
											<tr>
												<td width="15%">Language</td>
												<td width="85%" colspan="2">
													<input type="radio" class="inputcheck" name="SimpleSignLanguage" value="ko-KR" onClick="enableSimpleSignLanguageOption(this)"> ko-KR <b>(기본값)</b>
													<input type="radio" class="inputcheck" name="SimpleSignLanguage" value="en-US" onClick="enableSimpleSignLanguageOption(this)"> en-US
												</td>
											</tr>
											<tr>
												<td width="15%">가상 키패드</td>
												<td width="85%" colspan="2">
													<input type="radio" class="inputcheck" name="Enable_XecureKeyPad" id="Enable_XecureKeyPad" value=false onClick="enableSecureKey(this)" checked> none <b>(기본값)</b>
													<input type="radio" class="inputcheck" name="Enable_XecureKeyPad" id="Enable_XecureKeyPad" value=true onClick="enableSecureKey(this)"> XecureKeyPad
												</td>
											</tr>
										</table>
										<!-- 간편인증 통합 공통 설정 끝 -->
										<br/>

										<h3 id="5">SignDataUCPID</h3>
										<form id="form_SignDataUCPID" name="form_SignUCPID" method="post" action="#">
										<table class="test">
											
											<tr>
												<td width="10%" rowspan="8">Input</td>
												<td width="20%">ucpidNonce</td>
												<td width="70%"><input type="text" class="inputtext" name="aUcpidNonce"/></td>
											</tr>
											<tr>
												<td width="20%">consentNonce</td>
												<td width="70%"><input type="text" class="inputtext" name="aConsentNonce"/></td>
											</tr>
											<tr>
												<td width="20%">orgCode</td>
												<td width="70%"><input type="text" class="inputtext" name="aOrgCode"/></td>
											</tr>
											<tr>
												<td width="20%">userAgreement</td>
												<td width="70%"><textarea class="inputtextarea" name="aUserAgreement" rows="7"></textarea></td>
											</tr>
											<tr>
												<td width="20%">userAgreeInfo</td>
												<td width="70%" style="text-align:left;">
													<input type="checkbox" class="inputcheck" name="aRealName" checked/>
													실명 여부<br/>
													<input type="checkbox" class="inputcheck" name="aGender" checked/>
													성별 여부<br/>
													<input type="checkbox" class="inputcheck" name="aNationalInfo" checked/>
													국적 여부<br/>
													<input type="checkbox" class="inputcheck" name="aBirthDate" checked/>
													생년월일 여부<br/>
													<input type="checkbox" class="inputcheck" name="aCi" checked/>
													CI 정보 여부<br/>
												</td>
											</tr>
											<tr>
												<td width="20%">ispUrlInfo</td>
												<td width="70%"><input type="text" class="inputtext" name="aIspUrlInfo"/></td>
											</tr>
											<tr>
												<td width="20%">consent</td>
												<td width="70%"><textarea class="inputtextarea" name="aConsent" rows="7"></textarea></td>
											</tr>
											<tr>
												<td width="20%">aOption</td>
												<td width="70%" style="text-align:left;">
													<input type="checkbox" class="inputcheck" name="aOption" value="0" checked disabled="true"/>
													0 : 기본 서명<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="256"/>
													0x100 : 출력 값 형태 : Base64<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="1024"/>
													0x400 : 출력 값 형태 : Base64Url<br/>
												</td>
											</tr>
											<tr>
												<td width="10%">function</td>
												<td colspan="2" width="90%">
													<input type="button" class="inputbutton" style="height:auto;" value="add json Array"
													onClick="addValue();"/>
													<br/>
												</td>
											</tr>
											<tr>
												<td width="10%">Run</td>
												<td colspan="2" width="90%">
													<input type="button" class="inputbutton" style="height:auto;" value="AnySign.SignDataUCPID"
													onClick="AnySign.SignDataUCPID (makeJsonArray(),
																					sumCheckbox (this.form.aOption),
																					SignDataUCPID_callback);"/>
													<br/>
												</td>
											</tr>
											<tr>
												<td width="10%">Output</td>
												<td colspan="2" width="90%">
													<textarea class="inputtextarea" id="output_id1" name="aResult" rows="7"></textarea>
												</td>
											</tr>
											<tr>
												<td width="10%">Verify</td>
												<td colspan="2" width="90%">
													<button onClick="this.form.action='<%=yeskey_sign_result_page%>';this.form.submit();">서버 검증</button>
												</td>
											</tr>
											<tr>
												<td width="10%">Location</td>
												<td colspan="2" width="90%">
													<input type="button" id="SignDataUCPIDBtn" value="AnySign.GetLastLocation"
											       		onClick="AnySign.GetLastLocation (GetLastLocation_callback);"/>
												</td>
											</tr>
										</table>
										</form>
										<br/>
									</td>
								</tr>
							</table>
							<!-- CENTER END -->
						</td>
						<!-- contents end -->
					</tr>
				</table>
			</td>
		</tr>

		<!-- Footer -->
		<tr>
			<td>
				<div id="xecure_footer" />
			</td>
		</tr>
	</table>
</body>
</html>
