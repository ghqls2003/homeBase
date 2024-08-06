<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png"> -->

<link rel="stylesheet" type="text/css" href="${contextPath}/css/kendo-default-ocean-blue-min.css" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/reset.css" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/common.css" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/ani.css" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/main.css" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/style.css" />
<script defer src="${contextPath}/js/cmm/common.js"></script>
<script defer src="${contextPath}/js/ma/prsnMng.js"></script>


<script src="${contextPath}/ext-lib/jquery/jquery-3.6.0.min.js"></script>
<%-- <script src="${contextPath}/ext-lib/jquery/jquery-ui.min.js"></script> --%>
<script src="${contextPath}/ext-lib/jquery/jquery.mscrollbar.js"></script>

<script src="${contextPath}/ext-lib/kendoui.for.jquery.2021.3.1207.commercial/js/kendo.all.min.js"></script>
<script src="${contextPath}/ext-lib/kendoui.for.jquery.2021.3.1207.commercial/js/cultures/kendo.culture.ko-KR.min.js"></script>
<script src="${contextPath}/ext-lib/kendoui.for.jquery.2021.3.1207.commercial/js/messages/kendo.messages.ko-KR.js"></script>

<script>kendo.culture("ko-KR");</script>

<script src="${contextPath}/ext-lib/slick.min.js"></script>
<script src="${contextPath}/ext-lib/is-loading/isLoading.js"></script>

<script src="${contextPath}/js/ext/durian-v2.0.js"></script>
<script src="${contextPath}/js/ext/hmts.service.absAPI.js"></script>


<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
<script src="${contextPath}/js/cmm/commonUtil.js"></script>

<script>
    var contextPath = '<%=request.getContextPath()%>';
</script>
