<%@ page import="xecure.crypto.*" %>
<%@ page import="xecure.crypto.param.*" %>
<%@ page import="xecure.servlet.*" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
	request.setCharacterEncoding("UTF-8");

	// check parameter 
	String name = request.getParameter("userName").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String birthday = request.getParameter("birthday").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String phone_no = request.getParameter("phoneNo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String gender = request.getParameter("gender").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String title = request.getParameter("title").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String token = request.getParameter("plain").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String callNo = request.getParameter("csPhoneNo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");

    /****************************************************************************/
    // Request 설정
	S310ReqParam s310ReqParam = new S310ReqParam();

	s310ReqParam.setPhone_no(phone_no);
	s310ReqParam.setName(name);
	s310ReqParam.setBirthday(birthday);
	s310ReqParam.setCall_center_no(callNo);
	s310ReqParam.setTitle(title);
	s310ReqParam.setToken(token);

    // API 호출
	XecureConfig aConfig = new XecureConfig();
	String kakaoPaySignRes = "";

	try {
		KakaoPayApiClient kakaoPayApiClient = new KakaoPayApiClient(aConfig);
		kakaoPaySignRes = kakaoPayApiClient.callS310("",s310ReqParam);
	} catch (Exception e) {
		out.print("[jsp]KakaoPayApiClient.callSign Exception : " + e.getMessage());
	}
	

    out.print(kakaoPaySignRes);

%>