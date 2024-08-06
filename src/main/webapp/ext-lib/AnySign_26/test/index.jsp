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
<title>AnySign4PC/AnySignLite TEST</title>
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

<script>

//AnySign.mAnySignSID = 'reaverTestSID19810531'; 구)공인인증서 AnySign 객체접근이 필요하므로 동적으로 로딩완료후 호출하는것으로 변경

// AnySign4PC 설치 확인 및 초기화
//PrintObjectTag ();
//AnySign.mCharset = "utf-8"; 구)공인인증서 AnySign 객체접근이 필요하므로 동적으로 로딩완료후 호출하는것으로 변경

</script>
<script>
var useTranskey = false;
var aSessionKey = "";

function init()
{
	//(구)공인인증서 AnySign 객체접근이 필요하므로 동적으로 로딩완료후 호출하는것으로 변경
	initCommonOptionSetting();
	initForm();  
	numbering();
	
	
	// 키보드 보안 모듈 초기화
	//initKeyboard();

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

	var aAutoClick = document.getElementsByName("SimpleSignAutoClick");
	for (var i = 0; i < aAutoClick.length; i++)
	{
		if (AnySignProp.autoClick.toString() == aAutoClick[i].value)
		{
			aAutoClick[i].checked = true;
			break;
		}
	}

	var aRecentSort = document.getElementsByName("SimpleSignRecentSort");
	for (var i = 0; i < aRecentSort.length; i++)
	{
		if (AnySignProp.recentSort.toString() == aRecentSort[i].value)
		{
			aRecentSort[i].checked = true;
			break;
		}
	}

	var aRest = document.getElementsByName("SimpleSignRest");
	for (var i = 0; i < aRest.length; i++)
	{
		if (AnySignProp.aUseRestApi.toString() == aRest[i].value)
		{
			aRest[i].checked = true;
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

function enableSimpleSignAutoClickOption(element)
{
	AnySignProp.autoClick = (element.value === 'true');
}

function enableSimpleSignRecentSortOption(element)
{
	AnySignProp.recentSort = (element.value === 'true');
}

function enableSimpleSignRestOption(element)
{
	AnySignProp.aUseRestApi = (element.value === 'true');
}

function settingSimpleSignRestInfo(host, code, req, res, dec)
{
	AnySignProp.restApiInfo.host = host;
	AnySignProp.restApiInfo.serviceCode = parseInt(code);
	AnySignProp.restApiInfo.signReq = req;
	AnySignProp.restApiInfo.signRes = res;
	AnySignProp.restApiInfo.signDec = dec;
}

//(구)공인인증서 AnySign 객체접근이 필요하므로 동적으로 로딩완료후 호출하는것으로 변경
function initForm ()
{
	//AnySign.mAnySignSID = 'reaverTestSID19810531'; 
	//AnySign.mCharset = "utf-8";

	// form_SignDataCMS
	document.getElementById ("form_SignDataCMS").aXgateAddress.value = AnySign.mXgateAddress;
	document.getElementById ("form_SignDataCMS").aCAList.value = AnySign.mCAList;
	document.getElementById ("form_SignDataCMS").aLimitedTrial.value = AnySign.mLimitedTrial;

	if(document.getElementById ("form_SignDataCMS").aPlain.value == "") {
		document.getElementById ("form_SignDataCMS").aPlain.value = "Test 전자서명 내용";
	}

	// form_SignDataWithVID
	document.getElementById ("form_SignDataWithVID").aXgateAddress.value = AnySign.mXgateAddress;
	document.getElementById ("form_SignDataWithVID").aCAList.value = AnySign.mCAList;
	if(document.getElementById ("form_SignDataWithVID").aPlain.value == "") {
		document.getElementById ("form_SignDataWithVID").aPlain.value = "Test 전자서명 내용";
	}
	
	document.getElementById ("form_SignDataWithVID").aCert.value = s;
	document.getElementById ("form_SignDataWithVID").aLimitedTrial.value = AnySign.mLimitedTrial;
	
	// form_SignDataWithVID_Serial
	document.getElementById ("form_SignDataWithVID_Serial").aXgateAddress.value = AnySign.mXgateAddress;
	document.getElementById ("form_SignDataWithVID_Serial").aCAList.value = AnySign.mCAList;
	document.getElementById ("form_SignDataWithVID_Serial").aPlain.value = "이 내용이 전자서명됩니다.";
	document.getElementById ("form_SignDataWithVID_Serial").aCert.value = s;
	document.getElementById ("form_SignDataWithVID_Serial").aLimitedTrial.value = AnySign.mLimitedTrial;

	// form_MultiSignEx
	document.getElementById ("form_MultiSignEx").aXgateAddress.value = AnySign.mXgateAddress;
	document.getElementById ("form_MultiSignEx").aCAList.value = AnySign.mCAList;
	document.getElementById ("form_MultiSignEx").aPlain.value = "이 내용이 전자서명됩니다.|이 내용도 전자서명됩니다.|이 내용 또한 전자서명이 될겁니다.|";
	document.getElementById ("form_MultiSignEx").aDelimiter.value = "|";
	document.getElementById ("form_MultiSignEx").aTotal.value = 3;
	document.getElementById ("form_MultiSignEx").aCert.value = s;

	// REST_INFO
	document.getElementsByName("aRestHost")[0].value = AnySignProp.restApiInfo.host;
	document.getElementsByName("aRestCode")[0].value = AnySignProp.restApiInfo.serviceCode;
	document.getElementsByName("aRestRequest")[0].value = AnySignProp.restApiInfo.signReq;
	document.getElementsByName("aRestResponse")[0].value = AnySignProp.restApiInfo.signRes;
	document.getElementsByName("aRestDecrypt")[0].value = AnySignProp.restApiInfo.signDec;

	console.debug('================================');
	console.debug(AnySign);
	console.debug('================================');
}

function SignDataCMS_callback (aResult)
{
	document.getElementById ("form_SignDataCMS").aResult.value = aResult;
}

function DeleteCertificatePassword_callback (aResult)
{
	alert(aResult);
}

function SignDataWithVID_callback (aResult)
{
	document.getElementById ("form_SignDataWithVID").aSignedMsg.value = aResult;

	send_vid_info(SignDataWithVID_UserCallback);
}

function SignDataWithVID_UserCallback (aResultVid)
{
	document.getElementById ("form_SignDataWithVID").aVidMsg.value = aResultVid;
}

function GetLastLocation_callback (aResult)
{
	alert(aResult);
}

function SignDataWithVID_Serial_callback (aResult)
{
	document.getElementById ("form_SignDataWithVID_Serial").aSignedMsg.value = aResult;
	AnySign.GetVidInfo(SignDataWithVID_Serial_UserCallback);
}

function SignDataWithVID_Serial_UserCallback (aResultVid)
{
	document.getElementById ("form_SignDataWithVID_Serial").aVidMsg.value = aResultVid;
}

function MultiSignEx_callback (aResult)
{
	document.getElementById ("form_MultiSignEx").aResult.value = aResult;
}

function GetVidInfo_callback (aResult)
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
												<td width="15%">AutoClick</td>
												<td width="85%" colspan="2">
													<input type="radio" class="inputcheck" name="SimpleSignAutoClick" value="false" onClick="enableSimpleSignAutoClickOption(this)"> Off <b>(기본값)</b>
													<input type="radio" class="inputcheck" name="SimpleSignAutoClick" value="true" onClick="enableSimpleSignAutoClickOption(this)"> On
												</td>
											</tr>
											<tr>
												<td width="15%">RecentList</td>
												<td width="85%" colspan="2">
													<input type="radio" class="inputcheck" name="SimpleSignRecentSort" value="false" onClick="enableSimpleSignRecentSortOption(this)"> Off <b>(기본값)</b>
													<input type="radio" class="inputcheck" name="SimpleSignRecentSort" value="true" onClick="enableSimpleSignRecentSortOption(this)"> On
												</td>
											</tr>
											<tr>
												<td width="15%">REST API</td>
												<td width="85%" colspan="2">
													<input type="radio" class="inputcheck" name="SimpleSignRest" value="false" onClick="enableSimpleSignRestOption(this)"> 사용안함 <b>(기본값)</b>
													<input type="radio" class="inputcheck" name="SimpleSignRest" value="true" onClick="enableSimpleSignRestOption(this)"> 사용함
												</td>
											</tr>

											<tr>
												<td width="15%" rowspan="6">REST INFO</td>
												<td width="10%">REST(host)</td>
												<td width="75%" colspan="2"><input type="text" class="inputtext" name="aRestHost"/></td>
											</tr>
											<tr>
												<td width="10%">REST(serviceCode)</td>
												<td width="75%" colspan="2"><input type="text" class="inputtext" name="aRestCode"/></td>
											</tr>
											<tr>
												<td width="10%">REST(req)</td>
												<td width="75%" colspan="2"><input type="text" class="inputtext" name="aRestRequest"/></td>
											</tr>
											<tr>
												<td width="10%">REST(res)</td>
												<td width="75%" colspan="2"><input type="text" class="inputtext" name="aRestResponse"/></td>
											</tr>
											<tr>
												<td width="10%">REST(dec)</td>
												<td width="75%" colspan="2"><input type="text" class="inputtext" name="aRestDecrypt"/></td>
											</tr>
											<tr>
												<td colspan="2">
													<input type="button" class="inputbutton" style="height:auto;" value="REST INFO init"
													onClick="settingSimpleSignRestInfo (document.getElementsByName('aRestHost')[0].value,
																						document.getElementsByName('aRestCode')[0].value,
																						document.getElementsByName('aRestRequest')[0].value,
																						document.getElementsByName('aRestResponse')[0].value,
																						document.getElementsByName('aRestDecrypt')[0].value);"/>
													<br/>
												</td>
											</tr>
										</table>
										<!-- 간편인증 통합 공통 설정 끝 -->
										<br/>

										<h3 id="5">SignDataCMS</h3>
										<form id="form_SignDataCMS" name="form_SignDataCMS" method="post" action="#">
										<table class="test">
											<tr>
												<td width="10%" rowspan="7">Input</td>
												<td width="20%">aXgateAddress</td>
												<td width="70%"><input type="text" class="inputtext" name="aXgateAddress"/></td>
											</tr>
											<tr>
												<td width="20%">aCAList</td>
												<td width="70%"><input type="text" class="inputtext" name="aCAList"/></td>
											</tr>
											<tr>
												<td width="20%">aPlain</td>
												<td width="70%"><textarea class="inputtextarea" name="aPlain" rows="7"></textarea></td>
											</tr>
											<tr>
												<td width="20%">aOption</td>
												<td width="70%" style="text-align:left;">
													<input type="checkbox" class="inputcheck" name="aOption" value="0" checked disabled="true"/>
													0 : 기본 서명<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="1" disabled="true"/>
													1 : 서명확인창을 보여준다.<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="256"/>
													256 : 출력 값을 Base64로 <br/>
												</td>
											</tr>
											<tr>
												<td width="20%">aDescription</td>
												<td width="70%"><input type="text" class="inputtext" name="aDescription"/></td>
											</tr>
											<tr>
												<td width="20%">aLimitedTrial</td>
												<td width="70%"><input type="text" class="inputtext" name="aLimitedTrial"/></td>
											</tr>
											<tr>
												<td width="10%">Run</td>
												<td colspan="6" width="90%">
													<input type="button" class="inputbutton" style="height:auto;" value="AnySign.SignDataCMS"
													onClick="AnySign.SignDataCMS (this.form.aXgateAddress.value,
																					this.form.aCAList.value,
																					this.form.aPlain.value,
																					sumCheckbox (this.form.aOption),
																					this.form.aDescription.value,
																					this.form.aLimitedTrial.value,
																					SignDataCMS_callback);"/>
													<br/>
													<input type="button" class="inputbutton" style="height:auto;" value="AnySign.DeleteCertificatePassword (only mobile)"
													onClick="AnySign.DeleteCertificatePassword (DeleteCertificatePassword_callback);"/>
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
													<input type="button" class="inputbutton" id="SignDataCMSBtn" value="AnySign.GetLastLocation"
											       		onClick="AnySign.GetLastLocation (GetLastLocation_callback);"/>
													<br/>
													<input type="text" name="aMediaID"/>
													<input type="button" id="SignDataCMSBtn" value="AnySign.SetLastLocation"
											       		onClick="AnySign.SetLastLocation (document.getElementsByName('aMediaID')[0].value);"/>
													<br/>
													<input type="button" class="inputbutton" id="SignDataCMSBtn" value="AnySign.CleanLastLocation"
											       		onClick="AnySign.CleanLastLocation ();"/>
												</td>
											</tr>
											
										</table>
										</form>
										<br/>

										<h3 id="9">SignDataWithVID</h3>
										<table class="test">
										<form id="form_SignDataWithVID" name="form_SignDataWithVID" method=post action='#'>
											<tr>
												<td width="10%" rowspan="8">Input</td>
												<td width="20%">aXgateAddress</td>
												<td width="70%"><input type="text" class="inputtext" name="aXgateAddress"/></td>
											</tr>
											<tr>
												<td width="20%">aCAList</td>
												<td width="70%"><input type="text" class="inputtext" name="aCAList"/></td>
											</tr>
											<tr>
												<td width="20%">aPlain</td>
												<td width="70%"><textarea class="inputtext" name="aPlain" rows="7"></textarea></td>
											</tr>
											<tr>
												<td width="20%">aCert</td>
												<td width="70%"><textarea class="inputtext" name="aCert" rows="7"></textarea></td>
											</tr>
											<tr>
												<td width="20%">aOption</td>
												<td width="70%" style="text-align:left;">
													<strong>(공통 옵션)</strong><br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="0" checked disabled="true"/>
													0: 기본 서명<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="1" disabled="true"/>
													1 : 서명확인창을 보여준다.<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="8"/>
													8: <strong>WEB(aIdn)</strong>으로 부터 직접 VID를 입력받는다  <strong>(VID입력창 뜨지 않음)</strong><br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="16"/>
													16: IDN값을 입력받지 않는다 ""로 IDN대체 <strong>(VID입력창을 띄우지 않음)</strong><br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="256"/>
													256: 출력 값을 Base64로 <br/>
												</td>
											</tr>
											<tr>
												<td width="20%">aIdn</td>
												<td width="70%"><input type="text" class="inputtext" name="aIdn"/></td>
											</tr>
											<tr>
												<td width="20%">aDescription</td>
												<td width="70%"><input type="text" class="inputtext" name="aDescription"/></td>
											</tr>
											<tr>
												<td width="20%">aLimitedTrial</td>
												<td width="70%"><input type="text" class="inputtext" name="aLimitedTrial"/></td>
											</tr>
											<tr>
												<td width="10%">Run</td>
												<td colspan="2" width="90%">
													<input type="button" class="inputbutton" style="height:auto;" value="AnySign.SignDataWithVID"
													onClick="AnySign.SignDataWithVID (this.form.aXgateAddress.value,
																					this.form.aCAList.value,
																					this.form.aPlain.value,
																					sumCheckbox (this.form.aOption),
																					this.form.aDescription.value,
																					this.form.aLimitedTrial.value,
																					this.form.aIdn.value,
																					this.form.aCert.value,
																					SignDataWithVID_callback);"/>
													<br/>
													<input type="button" class="inputbutton" style="height:auto;" value="Sign_with_vid_user" 
													onClick="Sign_with_vid_user (sumCheckbox (this.form.aOption), 
																				 this.form.aPlain.value, 
																				 this.form.aCert.value,
																				 SignDataWithVID_callback);"/>
													<br/>
													<input type="button" class="inputbutton" style="height:auto;" value="Sign_with_vid_web" 
													onClick="Sign_with_vid_web (sumCheckbox (this.form.aOption), 
																				this.form.aPlain.value, 
																				this.form.aIdn.value, 
																				this.form.aCert.value,
																				SignDataWithVID_callback);"/>
													<br/>
												</td>
											</tr>
											<tr>
												<td width="10%">Output</td>
												<td colspan="2" width="90%">
													<textarea class="inputtext" name="aSignedMsg" rows="7"></textarea>
												</td>
											</tr>
											<tr>
												<td width="10%">VID Output</td>
												<td colspan="2" width="90%">
													<textarea class="inputtext" name="aVidMsg" rows="7"></textarea>
												</td>
											</tr>
											
											<tr>
                                                <td>Send</td>
                                                    <td colspan="4" height="25">
													<button onClick="this.form.action='<%=yeskey_vid_result_page%>';this.form.submit();">금융인증서 VID 검증</button>
													<button onClick="this.form.action='<%=simple_vid_result_page%>';this.form.submit();">간편인증 CI 복호화</button>
												</td>
											</tr>
											
										</form>
										</table>
										<br/>

										<h3 id="10">SignDataWithVID_Serial</h3>
										<form id="form_SignDataWithVID_Serial" name="form_SignDataWithVID_Serial" method="post" action="#">
										<table class="test">
											<tr>
												<td width="50" rowspan="10">Input</td>
												<td width="120">aXgateAddress</td>
												<td width="524"><input type="text" class="inputtext" name="aXgateAddress"/></td>
											</tr>
											<tr>
												<td>aCAList</td>
												<td><input type="text" class="inputtext" name="aCAList"/></td>
											</tr>
											<tr>
												<td>aSerial</td>
												<td><input type="text" class="inputtext" name="aSerial"/></td>
											</tr>
											<tr>
												<td>aLocation</td>
												<td><input type="text" class="inputtext" name="aLocation"/></td>
											</tr>
											<tr>
												<td>aPlain</td>
												<td><textarea class="inputtext" name="aPlain" rows="7"></textarea></td>
											</tr>
											<tr>
												<td>aCert</td>
												<td><textarea class="inputtext" name="aCert" rows="7"></textarea></td>
											</tr>
											<tr>
												<td>aOption</td>
												<td style="text-align:left;">
													<strong>(공통 옵션)</strong></br>
													<input type="checkbox" class="inputcheck" name="aOption" value="0" checked disabled="true"/>
													0 : 기본 서명<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="1" disabled="true"/>
													1 : 서명확인창을 보여준다.<br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="8"/>
													8 : <strong>WEB(aIdn)</strong>으로 부터 직접 VID를 입력받는다  <strong>(VID입력창 뜨지 않음)</strong><br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="16"/>
													16 : IDN값을 입력받지 않는다 ""로 대체 <strong>(VID입력창 뜨지 않음)</strong><br/>
													<input type="checkbox" class="inputcheck" name="aOption" value="256"/>
													256: 출력 값을 Base64로 <br/>
												</td>
											</tr>
											<tr>
												<td>aIdn</td>
												<td><input type="text" class="inputtext" name="aIdn"/></td>
											</tr>
											<tr>
												<td>aDescription</td>
												<td><input type="text" class="inputtext" name="aDescription"/></td>
											</tr>
											<tr>
												<td>aLimitedTrial</td>
												<td><input type="text" class="inputtext" name="aLimitedTrial"/></td>
											</tr>
											<tr>
												<td>Run</td>
												<td colspan="2">
													<input type="button" class="inputbutton" style="height:auto;" value="AnySign.SignDataWithVID_Serial"
													onClick="AnySign.SignDataWithVID_Serial (this.form.aXgateAddress.value,
																							 this.form.aCAList.value,
																							 this.form.aSerial.value,
																							 this.form.aLocation.value,
																							 this.form.aPlain.value,
																							 sumCheckbox (this.form.aOption),
																							 this.form.aDescription.value,
																							 this.form.aLimitedTrial.value,
																							 this.form.aIdn.value, 
																							 this.form.aCert.value,
																							 SignDataWithVID_Serial_callback);"/>
													<br/>
													<input type="button" class="inputbutton" style="height:auto;" value="Sign_with_vid_user_serial"
													onClick="Sign_with_vid_user_serial (this.form.aSerial.value,
																						this.form.aLocation.value,
																						sumCheckbox (this.form.aOption),
																						this.form.aPlain.value,
																						this.form.aCert.value,
																						SignDataWithVID_Serial_callback);"/>
													<input type="button" class="inputbutton" style="height:auto;" value="Sign_with_vid_web_serial"
													onClick="Sign_with_vid_web_serial (this.form.aSerial.value,
																					   this.form.aLocation.value, 
																					   sumCheckbox (this.form.aOption), 
																					   this.form.aPlain.value,  
																					   this.form.aCert.value,
																					   this.form.aIdn.value, 
																					   SignDataWithVID_Serial_callback);"/>
   													<br/>
   													<input type="button" class="inputbutton" style="height:auto;" value="AnySign.GetLastLocation"
   													onClick="AnySign.GetLastLocation (function(aResult){alert(aResult);})"/>
												</td>
											</tr>
											<tr>
												<td>Output</td>
												<td colspan="2">
													<textarea class="inputtext" name="aSignedMsg" rows="7"></textarea>
												</td>
											</tr>
											<tr>
												<td>Vid Output</td>
												<td colspan="2">
													<textarea class="inputtext" name="aVidMsg" rows="7"></textarea>
												</td>
											</tr>
											<tr>
												<td>Send</td>
												<td colspan="3" height="25">
													<button onClick="this.form.action='<%=yeskey_vid_result_page%>';this.form.submit();">금융인증서 VID 검증</button>
													<button onClick="this.form.action='<%=simple_vid_result_page%>';this.form.submit();">간편인증 CI 복호화</button>
												</td>
											</tr>
										</table>
										</form>
										<br/>

										<h3 id="11">MultiSignEx</h3>
										<form id="form_MultiSignEx" name="form_MultiSignEx" method="post" action="#">
										<table class="test">
											<tr>
												<td width="50" rowspan="8">Input</td>
												<td width="120">aXgateAddress</td>
												<td width="524"><input type="text" class="inputtext" name="aXgateAddress"/></td>
											</tr>
											<tr>
												<td>aCAList</td>
												<td><input type="text" class="inputtext" name="aCAList"/></td>
											</tr>
											<tr>
												<td>aPlain</td>
												<td><textarea class="inputtextarea" name="aPlain" rows="7" 
													  onChange="this.form.aTotal.value=this.form.aPlain.value.split(this.form.aDelimiter.value).length-1"></textarea></td>
											</tr>
												<td>aTotal</td>
												<td><input type="text" class="inputtext" name="aTotal"/></td>
											</tr>
											<tr>
												<td>aDelimiter</td>
												<td><input type="text" class="inputtext" name="aDelimiter"/></td>
											</tr>
											<tr>
												<td>aCertSerial</td>
												<td><input type="text" class="inputtext" name="aCertSerial"/></td>
											</tr>
											<tr>
												<td>aCertLocation</td>
												<td><input type="text" class="inputtext" name="aLocation"/></td>
											</tr>
											<tr>
												<td>aCert</td>
												<td><textarea class="inputtextarea" name="aCert" rows="7"></textarea></td>
											</tr>
											<tr>
												<td>Run</td>
												<td colspan="2">
													<input type="button" class="inputbutton" style="height:auto;" value="MultiSignWithSerial"
													onClick="MultiSignWithSerial(this.form.aTotal.value,
																				 this.form.aPlain.value,
																				 this.form.aDelimiter.value,
																				 this.form.aCertSerial.value,
																				 this.form.aLocation.value,
																				 MultiSignEx_callback);"/>
												</td>
											</tr>
											<tr>
												<td rowspan="1">Output</td>
												<td colspan="2">
													<textarea class="inputtextarea" name="aResult" id="output_id6" rows="7"></textarea>
												</td>
											</tr>
											<!-- <tr>
												<td colspan="2">
													<input type="button" class="inputbutton" style="height:auto;" value="AnySign.GetVidInfo()" 
														onclick="AnySign.GetVidInfo(GetVidInfo_callback)"/>
												</td>
											</tr> -->
											<tr>
												<td>Send</td>												
												<td colspan="2">
													<button onClick="verifyMessage(document.getElementById('output_id6').value, this.form.aTotal.value, this.form.aDelimiter.value); return false;">서버에 확인</button>
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
