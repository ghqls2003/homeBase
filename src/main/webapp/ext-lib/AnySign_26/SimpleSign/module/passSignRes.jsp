<%@ page import="xecure.crypto.*" %>
<%@ page import="xecure.crypto.param.*" %>
<%@ page import="xecure.servlet.*" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	request.setCharacterEncoding("UTF-8");

	// TODO 요청항목 유효성 검사등은 실제 적용환경에 맞게 적용
	//String companyCd = request.getParameter("companyCd");
	String reqTxId = request.getParameter("txId").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String certTxId = request.getParameter("certTxId").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String phoneNo = request.getParameter("phoneNo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String userNm = request.getParameter("userName").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String birthday = request.getParameter("birthday").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String envUserInfo = request.getParameter("envUserInfo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");

	// Request 설정
	ResultReqParam resultReqParam = new ResultReqParam();
	//resultReqParam.setCompanyCd(companyCd);
	resultReqParam.setReqTxId(reqTxId);
	resultReqParam.setCertTxId(certTxId);
	resultReqParam.setPhoneNo(phoneNo);
	resultReqParam.setBirthDay(birthday);
	resultReqParam.setUserNm(userNm);

	// API 호출
	XecureConfig aConfig = new XecureConfig();
	String passSignResult = "";

	try {
		PassApiClient passApiClient = new PassApiClient(aConfig);
		passSignResult = passApiClient.callResult("", resultReqParam, envUserInfo);
	} catch (Exception e){
		out.print("[jsp]PassApiClient.callResult Exception : " + e.getMessage());
	}
	
	out.print(passSignResult);
%>
