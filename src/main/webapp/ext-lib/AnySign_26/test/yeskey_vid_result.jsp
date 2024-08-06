<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page buffer="16kb" %>
<%@ page import="xecure.servlet.*" %>
<%@ page import="xecure.crypto.*" %>
<%@ page import="java.io.*" %>
<%
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html; charset=UTF-8");
	String aCharset = "UTF-8";

	XecureConfig aXecureConfig = new XecureConfig ();
	SignVerifier	verifier = null;

	String aResult = request.getParameter("aSignedMsg");
	int aErrCode = 0;
	String aErrReason = "";
	String aPlain = "";
	String aCertificate = "";
	String aSubjectRDN = "";
	String aSerial = "";

	if (aResult == null || aResult.equals(""))
	{
		aErrCode = -1;
		aErrReason = "invalid parameter";
	}
	else if (aResult.length() < 10)
	{
		aErrCode = -1;
		aErrReason = "invalid parameter (short)";
	}
	else
	{
		if (aResult.substring(0, 4).equalsIgnoreCase("3082"))
		{
			/* Hex encoded Data */
			verifier = new SignVerifier (aXecureConfig , aResult, aCharset, 0);
		}
		else
		{
			/* Base64 encoded Data */
			verifier = new SignVerifier (aXecureConfig , aResult, aCharset, 1);
			//verifier = new SignVerifier (aXecureConfig , aResult, 1);
		}


		if (verifier.getLastError() != 0)
		{
			aErrCode = verifier.getLastError();
			aErrReason = verifier.getLastErrorMsg();
		}
		else
		{
			aPlain = verifier.getVerifiedMsg_Text();
			aCertificate = verifier.getSignerCertificate().getCertPem().replaceAll ("\n", "");
			aSubjectRDN = verifier.getSignerCertificate().getSubject();
			aSerial = verifier.getSignerCertificate().getSerial();
		}

	}

	/* 식별번호 검증 */
	VidVerifier vid = null;

	String aVidMsg = request.getParameter("aVidMsg");
	String aServerIdn = request.getParameter("aServerIdn");
	String aIdn = request.getParameter("aIdn");
	int aIsVid = 0;
	int aVidErrCode = 0;
	String aVidErrReason = "";
	String aVidCertSubjectRDN = "";
	String aRealName = "";

	if (aVidMsg != null && aVidMsg.length() > 0 )
	{
		vid = new VidVerifier(aXecureConfig);
		vid.virtualIDVerifyS(aVidMsg, verifier.getSignerCertificate().getCertPem(), aIdn);

		if (vid.getLastError() == 0)
		{
			aVidCertSubjectRDN = verifier.getSignerCertificate().getSubject();
			aIdn = vid.getIdn();
			aRealName = vid.getRealName();
		}

		if (vid.getLastError() != 0)
		{
			aVidErrCode = vid.getLastError();
			aVidErrReason = vid.getLastErrorMsg();
		}
	}
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="cache-control" content="no-cache">
</head>
<body>
<h3>서명값 검증 결과</h3>
<ul>
	<li>오류 코드: <%=aErrCode%>
	<li>오류 메세지: <%=aErrReason%>
	<li>서명 원문: <%=aPlain%>
	<li>서명 인증서 주체: <%=aSubjectRDN%>
	<li>서명 인증서 시리얼: <%=aSerial%>
	<li>서명 인증서: <div><textarea cols="100" rows="10"><%=aCertificate%></textarea></div>
</ul>

<h3>식별번호 검증 결과</h3>
<ul>
	<li>암호화된 VID: <div><textarea cols="100" rows="10"><%=aVidMsg%></textarea></div>
	<li>오류 코드: <%=aVidErrCode%>
	<li>오류 메세지: <%=aVidErrReason%>
	<li>인증서 : <%=aVidCertSubjectRDN%>
	<li>주민등록번호(사업자 등록번호):  <%=aIdn%>
	<li>사용자 실명: <%=aRealName%>
</ul>

</body>
</html>
