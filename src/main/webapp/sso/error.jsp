<%@ page import="com.naru.provider.IdentificationProvider"%>
<%@ page import="com.naru.provider.ServiceProvider"%>
<%@ page import="com.naru.provider.ProviderFactory"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="SPCommon.jsp" %>
<html>
  <head><title>Request ERROR Page</title></head>
<%
ServiceProvider sp = (ServiceProvider) ProviderFactory.getProvider();
%>
  <script type="text/javascript">
          alert("인증요청이 정상이 아닙니다.\n[<%=sp.getErrorCode()%>]\n<%=sp.getErrorMsg()%>");
         // history.back(-3);
         location.href="<%=DEFAULT_BASE_URL%>";
  </script>
</html>