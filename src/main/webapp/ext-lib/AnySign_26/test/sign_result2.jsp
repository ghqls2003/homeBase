<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@ page buffer="16kb" %>
<%@ page import="xecure.servlet.*" %>
<%@ page import="xecure.crypto.*" %>
<%@ page import="java.io.*" %>
<%
	//out.println(java.nio.charset.Charset.defaultCharset().name());
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html; charset=UTF-8");
	String aCharset = "UTF-8";
	
	XecureConfig aXecureConfig = new XecureConfig ();
	MultiSignVerifier verifier = null;

	String aResult = request.getParameter("aResult2");
	int aErrCode = 0;
	String aErrReason = "";
	String aPlain = "";
	String aPlainHex = "";
	String aCertificate = "";
	String aSubjectRDN = "";
	int aSignerNum = 0;
	
	String aUserID = "";
	String aRealID = "";
	String aSerial = "";
	
	String operatoId = "internet";
	String corp_code = "0000";
	
	String ip = "192.168.60.60";
	int port = 30000;
	int caType = 2;
	int caRMPType = 2;
	XecureCA ca = new XecureCA (aXecureConfig, ip, port, caType, caRMPType);
		
	SplitSign aSplitSign = new SplitSign(aXecureConfig);
	String aRequestPlain = request.getParameter("aPlain");	
	byte[] aPlainByte = null;
	String aSignedData = "";
		
	String[] aOptions = request.getParameterValues("aOption");	
	int aOption = 0;
	for (int i = 0; aOptions !=null && i < aOptions.length; i++)
	{
		aOption += Integer.parseInt(aOptions[i]);
	}
	
	/* 분리 서명 검증 시 */
	if ((aOption & 0x100) == 0 && (aOption & 0x200) == 0x200 && (aOption & 0x1000) == 0x1000)
	{
		aPlainByte = aRequestPlain.getBytes(aCharset);
		aSignedData = aSplitSign.merge(aResult, aPlainByte);
		if (aSplitSign.getLastError() != 0)
		{
			aErrCode = aSplitSign.getLastError();
			aErrReason = aSplitSign.getLastErrorMsg();
			out.println ("분리 서명 데이터 오류<br>");
			out.println ("Error Code: " + aErrCode + "<br>");
			out.println ("Error Reason: " + aErrReason + "<br>");
			return;
		}
		
		aResult = aSignedData;
	}
	
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
			verifier = new MultiSignVerifier (aXecureConfig , aResult, aCharset);
		}
		else
		{
			/* Base64 encoded Data */
			verifier = new MultiSignVerifier (aXecureConfig , aResult, aCharset);
		}

		if (verifier.getLastError() != 0)
		{
			aErrCode = verifier.getLastError();
			aErrReason = verifier.getLastErrorMsg();
		}
		else
		{
			// 서명 원문
			aPlain = verifier.getVerifiedMsg_Text();
			
			// 서명 원문(Hex)
			if(aPlain != null) {
				byte[] buf = verifier.getVerifiedMsg();
				String tmp = "";
				for (int i = 0; i < buf.length; i++)
				{
					tmp = Integer.toHexString(0xFF & buf[i]);
					if (tmp.length() == 1) tmp = "0" + tmp;
					aPlainHex += tmp;
				}
			}
			
			// 서명 인증서
			aSignerNum = verifier.getNumberOfSigner();
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
	<li>서명 원문(Hex): <%=aPlainHex%>
	<li>서명자 수: <%=aSignerNum%>
<%
	for (int i = 0; i < aSignerNum; i++)
	{
		aCertificate = verifier.getSignerCertificate(i).getCertPem().replaceAll ("\n", "");
		aSubjectRDN = verifier.getSignerCertificate(i).getSubject();
		aSerial = verifier.getSignerCertificate(i).getSerial();
			
		int result = ca.viewCertificateWithRealUserId(operatoId,aSerial,corp_code);
		if(result ==1){
			aUserID = (String)ca.getResponseFromCertView("USERID",1);
			aRealID = (String)ca.getResponseFromCertView("REALID",1);
		} else {
			aUserID = "";
			aRealID = "";
		}
%>
	<li>User ID: <%=aUserID%>
	<li>Real ID: <%=aRealID%>
	<li>서명 인증서 [<%=i+1%>]: <%=aSubjectRDN%>
	<div><textarea cols="100" rows="10"><%=aCertificate%></textarea></div>
<%
	}
%>
</ul>
</body>
</html>
