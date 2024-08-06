<%@ page import="xecure.crypto.*" %>
<%@ page import="xecure.crypto.param.*" %>
<%@ page import="xecure.servlet.*" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
	request.setCharacterEncoding("UTF-8");

    String name = request.getParameter("userName").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String birthday = request.getParameter("birthday").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String phone_no = request.getParameter("phoneNo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String tx_id = request.getParameter("txId").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String envUserInfo = request.getParameter("envUserInfo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");

    // Request 설정
	VerifyReqParam verifyReqParam = new VerifyReqParam();
	verifyReqParam.setTx_id(tx_id);
	verifyReqParam.setUserName(name);
	verifyReqParam.setUserBirthday(birthday);
	verifyReqParam.setUserPhone(phone_no);
	
    // API 호출
    XecureConfig aConfig = new XecureConfig();
    String kakaoPaySignRes = "";

    try {
        KakaoPayApiClient kakaoPayApiClient = new KakaoPayApiClient(aConfig);
        kakaoPaySignRes = kakaoPayApiClient.callVerify("",verifyReqParam,envUserInfo);
    } catch (Exception e) {
        out.print("[jsp]KakaoPayApiClient.callVerify Exception : " + e.getMessage());
    }
	
    out.print(kakaoPaySignRes);
%>
