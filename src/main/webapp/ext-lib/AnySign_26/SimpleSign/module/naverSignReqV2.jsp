<%@ page import="xecure.crypto.*" %>
<%@ page import="xecure.servlet.*" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%

	// check parameter 
	String plain = request.getParameter("plain").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String contactInfo = request.getParameter("csPhoneNo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String userName = request.getParameter("userName").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String userBirthday = request.getParameter("birthday").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String userPhone = request.getParameter("phoneNo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String mode = request.getParameter("mode").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String deviceBrowser = request.getParameter("deviceBrowser").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String deviceCode = request.getParameter("deviceCode").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");

	/****************************************************************************/
	XecureConfig aConfig = new XecureConfig();
	String result = "";

	try {
		Naver_v2 naver = new Naver_v2(aConfig);
		naver.setUserInfo(userName, userBirthday, userPhone);
		naver.setJsonData("sign", plain, "", contactInfo, deviceBrowser, deviceCode);
		result = naver.reqSign("");
	} catch (Exception e) {
		out.print("[jsp]naver.reqSign Exception : " + e.getMessage());
	}
	out.print(result);
%>