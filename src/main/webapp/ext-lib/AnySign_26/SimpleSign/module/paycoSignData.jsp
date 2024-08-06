<%@ page import="xecure.crypto.*" %>
<%@ page import="xecure.crypto.param.*" %>
<%@ page import="xecure.servlet.*" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	request.setCharacterEncoding("UTF-8");

	String signData = request.getParameter("encData").replaceAll("<", "&lt;").replaceAll(">","&gt;").replaceAll("\"","&quot;").replaceAll("script", "");

	String decData = "";
	
	try {
		decData = PaycoAESCipher.decrypt(signData);
	} catch (Exception e) {
		out.print("[jsp]PaycoAESCipher.decrypt Exception : " + e.getMessage());
	}
	
	out.print(decData);
%>
