<%@ page import="xecure.crypto.*" %>
<%@ page import="xecure.servlet.*" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	request.setCharacterEncoding("UTF-8");

    // check parameter 
    String userName = request.getParameter("userName").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String birthday = request.getParameter("birthday").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String phoneNo = request.getParameter("phoneNo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", ""); 
    String requestDate = request.getParameter("requestDate").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String randomNum = request.getParameter("randomNum").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String consentType = request.getParameter("consentType").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String consent = request.getParameter("consent").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String deviceCode = request.getParameter("deviceCode").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String deviceBrowser = request.getParameter("deviceBrowser").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");

    /****************************************************************************/

    // API 호출
    XecureConfig aConfig = new XecureConfig();
    String result = "";

    try {
        ShinhanSign shinhanSign = new ShinhanSign(aConfig);

        shinhanSign.setUserInfo(userName, birthday, phoneNo);
        shinhanSign.setJsonData(requestDate, randomNum, deviceCode, deviceBrowser, consentType, consent);
        
        result = shinhanSign.reqSign("");
    } catch (Exception e) {
        out.print("[jsp]shinhanSign.reqSign Exception : " + e.getMessage());
    }

    out.print(result);
%>