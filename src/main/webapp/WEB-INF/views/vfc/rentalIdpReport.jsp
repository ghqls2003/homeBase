<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@page import="com.clipsoft.clipreport.oof.connection.OOFConnectionHTTP"%>
<%@page import="com.clipsoft.clipreport.oof.OOFFile"%>
<%@page import="com.clipsoft.clipreport.oof.OOFDocument"%>
<%@page import="com.clipsoft.clipreport.oof.connection.*"%>
<%@page import="java.io.File"%>
<%@page import="java.util.*"%>
<%@page import="com.clipsoft.clipreport.server.service.ReportUtil"%>
<c:out value="${resultKey}"/>

<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<spring:eval expression="@config['Globals.mode']" var="mode"/>

<%
OOFDocument oof = OOFDocument.newOOF();
//서식파일 연결
OOFFile file = oof.addFile("crf.root", "%root%/crf/rentIdp.crf");

String rentNo = request.getParameter("rentNo");

Map<String, Object> userMap = (Map<String, Object>)session.getAttribute("userData");

//리포트에 파라메터 전달
oof.addField ("RENT_NO", rentNo);
if(session.getAttribute("SSO_NAME")!=null) {
	oof.addField ("USER_NM", (String)session.getAttribute("SSO_NAME"));
}
if(session.getAttribute("SSO_ID")!=null) {
	oof.addField ("USER_ID", (String)session.getAttribute("SSO_ID"));
}
if((String)userMap.get("bzmnSn")!=null) {
	oof.addField ("BZMN_SN", (String)userMap.get("bzmnSn"));
}

String mode = (String) pageContext.getAttribute("mode");
if(mode.contains("dev")){
	oof.addConnectionData("*","dev");
}
else if(mode.contains("op")){
	oof.addConnectionData("*","op");
}

// oof.addConnectionData("*","dqvs");
%>

<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/vfc/rentalIdpReport.js"></script>
<%-- <link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/rentalHistManage.css" /> --%>

<link rel="stylesheet" type="text/css" href="${contextPath}/ext-lib/ClipReport5/css/clipreport5.css">
<link rel="stylesheet" type="text/css" href="${contextPath}/ext-lib/ClipReport5/css/UserConfig5.css">
<link rel="stylesheet" type="text/css" href="${contextPath}/ext-lib/ClipReport5/css/font.css">

<script type='text/javascript' src='${contextPath}/ext-lib/ClipReport5/js/jquery-1.11.1.js'></script>
<script type='text/javascript' src='${contextPath}/ext-lib/ClipReport5/js/clipreport5.js'></script>
<script type='text/javascript' src='${contextPath}/ext-lib/ClipReport5/js/UserConfig5.js'></script>

<%@include file="/ext-lib/ClipReport5/Property.jsp"%>
<%
String resultKey =  ReportUtil.createReport(request, oof, "false", "false", request.getRemoteAddr(), propertyPath);
%>

<script type='text/javascript'>
	function html2xml(divPath){
    	var reportkey = "<%=resultKey%>";
		var report = createReport("${contextPath}/ext-lib/ClipReport5/report_server.jsp", reportkey, document.getElementById(divPath));

// 		report.setCustomSaveButton(false,false,true,false);
    	report.view();
	}
</script>

<!-- 리포트 -->
<div id='reportDiv' data-key="${resultKey}"></div>