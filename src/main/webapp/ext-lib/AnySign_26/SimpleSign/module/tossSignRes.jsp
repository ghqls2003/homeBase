<%@ page import="xecure.servlet.*" %>
<%@ page import="xecure.crypto.*" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	request.setCharacterEncoding("UTF-8");
	String accessToken = request.getParameter("accessToken").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String txId = request.getParameter("txId").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String envUserInfo = request.getParameter("envUserInfo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String envSessionInfo = request.getParameter("envSessionInfo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");

	XecureConfig aConfig = new XecureConfig();
    Toss_v2 toss = new Toss_v2(aConfig);
	toss.setAccessToken(accessToken);

	String res = "";

	try {
		res = toss.requestSignResult("", txId, envUserInfo, envSessionInfo);
	} catch (Exception e) {
		out.print("[jsp]toss.requestSignResult Exception : " + e.getMessage());
	}
	
	out.print(res);
%>	
