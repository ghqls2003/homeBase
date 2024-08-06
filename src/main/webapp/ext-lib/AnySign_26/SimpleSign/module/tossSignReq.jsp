<%@ page import="xecure.servlet.*" %>
<%@ page import="xecure.crypto.*" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%
        // getParameter
        request.setCharacterEncoding("UTF-8");
        String name = request.getParameter("userName").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
        String birth = request.getParameter("birthday").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
        String phone = request.getParameter("phoneNo").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
        String docTitle = request.getParameter("title").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
        String doc = request.getParameter("plain").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");
        String mode = request.getParameter("mode").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");

        // AccessToken 발급
        String resToken = "";

        XecureConfig aConfig = new XecureConfig();

	Toss_v2 toss = null;
        try {
                toss = new Toss_v2(aConfig);
                resToken = toss.requestAccessToken("");
        } catch (Exception e) {
                out.print("[jsp]toss.requestAccessToken Exception : " + e.getMessage());
        }

        // Sign Request
        String resSign = "";

        toss.setOption("docTitle", docTitle);
        toss.setOption("userName", name);
        toss.setOption("userPhone", phone);
        toss.setOption("userBirthday", birth);

        try {
                resSign = toss.requestSign("", Integer.parseInt(mode), doc);
        } catch (Exception e) {
                out.print("[jsp]toss.requestSign Exception : " + e.getMessage());
        }

        out.print(resSign);
%>
