<%@ page import="xecure.crypto.*" %>
<%@ page import="xecure.servlet.*" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	request.setCharacterEncoding("UTF-8");

	// TODO 요청항목 유효성 검사등은 실제 적용환경에 맞게 적용
	String requestDate = request.getParameter("requestDate").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String randomNum = request.getParameter("randomNum").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String certTxId = request.getParameter("certTxId").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String envUserInfo = request.getParameter("envUserInfo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");

	// API 호출
	XecureConfig aConfig = new XecureConfig();
	String shinhanSignResult = "";

	// Request 설정
	ShinhanSign shinhanSign = new ShinhanSign(aConfig);

	try {
		shinhanSignResult = shinhanSign.reqSignResult("", requestDate, randomNum, certTxId, envUserInfo);
	} catch (Exception e){
		out.print("[jsp]shinhanSign.callResult Exception : " + e.getMessage());
	}
	
	out.print(shinhanSignResult);
%>
