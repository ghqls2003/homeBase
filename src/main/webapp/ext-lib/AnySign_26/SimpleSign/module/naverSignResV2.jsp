<%@ page import="xecure.crypto.*" %>
<%@ page import="xecure.servlet.*" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%
	// check parameter 
	String txId = request.getParameter("txId").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String envUserInfo = request.getParameter("envUserInfo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");

	/****************************************************************/
	XecureConfig aConfig = new XecureConfig();
	String result = "";

	try {
		Naver_v2 naver = new Naver_v2(aConfig);
		result = naver.reqSignResult("", txId, envUserInfo);
	} catch (Exception e) {
		out.print("[jsp]naver.reqSignResult Exception : " + e.getMessage());
	}
	out.print(result);
%>