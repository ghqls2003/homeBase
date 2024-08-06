<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ page buffer="16kb" %>
<%
	request.setCharacterEncoding("utf-8");
	response.setContentType("text/html; charset=utf-8");
	
	response.setHeader("Pragma", "no-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", 0);
	
	String sign_result_page = "./sign_result.jsp";
%>
<%@ page import="xecure.servlet.*" %>
<%@ page import="xecure.crypto.*" %>
<%@ page import="java.io.*" %>
<%@ page import="java.security.*" %>
<%@ page import="java.util.Random" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
<title>Page Title - mini</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<style type="text/css">
.test			{border:1px dashed gray;}
.test td		{font-size: 9pt;color: #333333;background: #EEEEEE;text-align: center;}
</style>

<script type="text/javascript">
document.write("<script type=\"text/javascript\" src=\"" + "../anySign4PCInterface.js" + "?version=" + new Date().getTime() + "\"></scr"+"ipt>");
</script>

<script language="javascript" type="text/javascript">
<%
    VidVerifier vid = new VidVerifier(new XecureConfig());
    out.println(vid.ServerCertWriteScript());

	// AnySign 세션ID 설정
	String HashedSessionID = "";

	// 1. 고정 세션 ID
	HashedSessionID = "reaverTestSID19810531";
	
	// 2. 웹세션ID 해쉬
	//String id = session.getId();
	//HashedSessionID = cipher.getHash("SHA256",id);

	out.println("AnySign.mAnySignSID = '" + HashedSessionID + "';");
	//


	// 데몬 무결성 검증 기능 선택사항
	String HashedRandomValue = "";
	
	// 1. 무결성 검증 비활성화
	//    AnySign.mAnySignITGT 변수 "" 설정 - 2번 부분 주석처리.
	//

	// 2. 랜덤값 기반 무결성 검증 설정
	//    AnySign.mAnySignITGT = HashedRandomValue
	//
	Cipher cipher = new Cipher( new XecureConfig());
	HashedRandomValue = cipher.getRamdomMsg(30);

	out.println("AnySign.mAnySignITGT = '" + HashedRandomValue + "';");
%>

//PrintObjectTag(); 

function checkAnySign4PC()
{
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

function onSendToServer(value)
{

	var aRequest = new XMLHttpRequest ();
	var aResponse = "";
	var aURL = "";
	var aMessage = "";

	aURL = "./sign_result.jsp";
	aRequest.open ("POST", aURL, false);
	aRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	aRequest.send ("SIGNED=" + encodeURIComponent(value));

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

	aMessage += "사용자 RDN:\n" + aResponse["subjectRDN"] + "\n";
	aMessage += "사용자 인증서:\n" + aResponse["certificatePEM"] + "\n";

	alert (aMessage);

}

function signResult_callback (aResult)
{
	document.getElementById('signature_data').value = aResult;
}

function init () {
	checkAnySign4PC();
	checkAnySignLite();
}

function sign () {
	AnySign.mDivInsertOption = 2;
	AnySign.SetUITarget(document.getElementById('certDialog'));	

	AnySign.SignDataCMS (AnySign.mXgateAddress, AnySign.mCAList, "hello", 0, "", 3, signResult_callback);
}
</script>
</head> 
<body onload="init();">
<table class="test">
	<tr>
		<td width="694" colspan="3"><h4>설정</h4></td>
	</tr>
	<tr>
		<td width="208" colspan="2">AnySign4PC 초기화</td>
		<td width="486" >
			<input id="Enable_AnySignLoad" type="button" style="width:100%" onclick="initAnySign4PC(this);">
		</td>
	</tr>
	<tr>
		<td width="208" colspan="2">AnySignLite 사용 유무</td>
		<td width="486" >
			<input id="Enable_AnySignLite" type="button" style="width:100%" onclick="enableAnySignLite(this);">
		</td>
	</tr>
	<tr>
		<td width="208" colspan="2">Run</td>
		<td width="486" >
			<input id="Run_SignDataCMS" type="button" style="width:100%" value="AnySign.SignDataCMS" onclick="sign();">
		</td>
	</tr>
</table>
<div id="certDialog"></div>
<br>
<br>
<br>
전자서명 결과<br>
<textarea id="signature_data" style="width:700px;height:100px"></textarea><br>
<input type="button" value="서버에 확인" onclick="onSendToServer (document.getElementById('signature_data').value); return false;">
</body>
</html>
