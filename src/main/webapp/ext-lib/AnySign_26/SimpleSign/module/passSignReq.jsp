<%@ page import="xecure.crypto.*" %>
<%@ page import="xecure.crypto.param.*" %>
<%@ page import="xecure.servlet.*" %>


<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	request.setCharacterEncoding("UTF-8");

    // check parameter 
    String userNm = request.getParameter("userName").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String birthday = request.getParameter("birthday").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String phoneNo = request.getParameter("phoneNo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", ""); 
    String reqTitle = request.getParameter("title").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String reqContent = request.getParameter("content").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String signTargetTycd = request.getParameter("signTargetTycd").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String reqCSPhoneNo = request.getParameter("csPhoneNo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String signTarget = request.getParameter("plain").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");

    /****************************************************************************/
	// Param 설정
    NoticeReqParam noticeReqParam = new NoticeReqParam();
    
	noticeReqParam.setPhoneNo(phoneNo);
	noticeReqParam.setUserNm(userNm);
	noticeReqParam.setBirthday(birthday);
	noticeReqParam.setReqTitle(reqTitle);
	noticeReqParam.setReqContent(reqContent);
	noticeReqParam.setReqCSPhoneNo(reqCSPhoneNo);
	noticeReqParam.setSignTargetTycd(signTargetTycd);
	noticeReqParam.setSignTarget(signTarget);
    noticeReqParam.setIsCombineAuth("Y");

    // API 호출
    XecureConfig aConfig = new XecureConfig();

    String passSignRes = "";

    try {
        PassApiClient passApiClient = new PassApiClient(aConfig);
	    passSignRes = passApiClient.callNotice("",noticeReqParam);
    } catch (Exception e) {
        out.print("[jsp]PassApiClient.callSign Exception : " + e.getMessage());
    }

    out.print(passSignRes);
%>