<%@ page import="xecure.crypto.*" %>
<%@ page import="xecure.servlet.*" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
	request.setCharacterEncoding("UTF-8");

	// check parameter 
	String name = request.getParameter("userName").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String birthday = request.getParameter("birthday").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String phone_no = request.getParameter("phoneNo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String gender = request.getParameter("gender").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String enc_version = request.getParameter("encVersion").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String requestTitle = request.getParameter("title").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String requestOrgName = request.getParameter("orgCode").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String callNo = request.getParameter("csPhoneNo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String encrypted = request.getParameter("encrypted").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", ""); 
	String plain = request.getParameter("plain").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");

	/****************************************************************************/

	XecureConfig aConfig = new XecureConfig();

	KakaoTalk_3510 kakaoTalk = new KakaoTalk_3510(aConfig);

	kakaoTalk.setEnc_version(enc_version);
	kakaoTalk.setPhone_no(phone_no);
	kakaoTalk.setName(name);
	kakaoTalk.setBirthday(birthday);
	kakaoTalk.setRequestTitle(requestTitle);
	kakaoTalk.setRequestOrgName(requestOrgName);
	kakaoTalk.setEncrypted(encrypted);
	kakaoTalk.setPlain(plain);

	String kakaoTalkSignRes = "";

	/****************************************************************************/

	try {
		kakaoTalkSignRes = kakaoTalk.reqSign("");
	} catch (Exception e) {
		out.print("[jsp]KakaoTalk.reqSign Exception : " + e.getMessage());
	}

	out.print(kakaoTalkSignRes);
%>