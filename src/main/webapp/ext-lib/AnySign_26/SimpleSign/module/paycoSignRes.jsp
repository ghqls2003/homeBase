<%@ page import="xecure.crypto.*" %>
<%@ page import="xecure.crypto.param.*" %>
<%@ page import="xecure.servlet.*" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	request.setCharacterEncoding("UTF-8");

	// TODO 요청항목 유효성 검사등은 실제 적용환경에 맞게 적용
	String targetQuery_name = request.getParameter("userName").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String targetQuery_birthday = request.getParameter("birthday").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String targetQuery_cellphoneNumber = request.getParameter("phoneNo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String paycoTransactionId = request.getParameter("txId").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	//String clientTransactionId = request.getParameter("clientTransactionId").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String envUserInfo = request.getParameter("envUserInfo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");

	// Request 설정
	SignFindReqParam signFindReqParam = new SignFindReqParam();

	signFindReqParam.setTargetQuery_name(targetQuery_name);
	signFindReqParam.setTargetQuery_birthday(targetQuery_birthday);
	signFindReqParam.setTargetQuery_cellphoneNumber(targetQuery_cellphoneNumber);
	signFindReqParam.setPaycoTransactionId(paycoTransactionId);
	//signFindReqParam.setClientTransactionId(clientTransactionId);

	XecureConfig aConfig = new XecureConfig();
	String resPaycoResult = "";

	// API 호출
	try {
		PaycoApiClient paycoApiClient = new PaycoApiClient(aConfig);
		resPaycoResult = paycoApiClient.callSignFind("", signFindReqParam, envUserInfo);
	} catch (Exception e) {
		out.print("[jsp]PaycoApiClient.callSignFind Exception : " + e.getMessage());
	}
	
	out.print(resPaycoResult);
%>
