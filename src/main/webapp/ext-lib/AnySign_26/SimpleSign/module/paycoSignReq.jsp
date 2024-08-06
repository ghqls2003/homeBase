<%@ page import="xecure.crypto.*" %>
<%@ page import="xecure.crypto.param.*" %>
<%@ page import="xecure.servlet.*" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	request.setCharacterEncoding("UTF-8");

 	// check parameter 
	String name = request.getParameter("userName").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
	String birthday = request.getParameter("birthday").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String cellphoneNumber = request.getParameter("phoneNo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String channel = request.getParameter("channel").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String title = request.getParameter("title").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String plain = request.getParameter("plain").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String contentType = request.getParameter("contentsType").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
    String contentView = request.getParameter("contentsView").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");

    /****************************************************************************/
    SignReqParam signReqParam = new SignReqParam();

    signReqParam.setTargetQuery_name(name);
	signReqParam.setTargetQuery_birthday(birthday);
    signReqParam.setTargetQuery_cellphoneNumber(cellphoneNumber);
    
    signReqParam.setRequestChannelCode(channel);
    signReqParam.setSign_title(title);
    signReqParam.setSign_contents(plain);
    signReqParam.setSign_contentsTypeCode(contentType);
    signReqParam.setSign_contentsViewTypeCode(contentView);

    XecureConfig aConfig = new XecureConfig();

    String paycoSignRes = "";

    try {
        PaycoApiClient paycoApiClient = new PaycoApiClient(aConfig);
        paycoSignRes = paycoApiClient.callSign("",signReqParam);
    } catch(Exception e) {
        out.print("[jsp]PaycoApiClient.callSign Exception : " + e.getMessage());
    }

    out.print(paycoSignRes);
%>
