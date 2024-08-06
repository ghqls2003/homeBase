<%@ page import="xecure.crypto.*" %>
<%@ page import="xecure.servlet.*" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
	request.setCharacterEncoding("UTF-8");

    String tx_id = request.getParameter("txId").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String envUserInfo = request.getParameter("envUserInfo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");

	/****************************************************************************/

	XecureConfig aConfig = new XecureConfig();

	KakaoTalk kakaoTalk = new KakaoTalk(aConfig);
	kakaoTalk.setTxId(tx_id);
	
	String kakaoTalkSignRes = "";

	/****************************************************************************/

	try {
		kakaoTalkSignRes = kakaoTalk.reqSignResult("", envUserInfo);
	} catch (Exception e) {
		out.print("[jsp]KakaoTalk.reqSignResult Exception : " + e.getMessage());
	}

	out.print(kakaoTalkSignRes);
%>