<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>ENC DEMO</title>
<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
<meta http-equiv="Pragma" content="no-cache">
</head>
<body>

<%@ page contentType="text/html; charset=utf-8" %>
<%@ page buffer="16kb" %>
<%@ page language="java" extends="xecure.servlet.jsp.XecureHttpJspPage"  %>
<%@ page import="xecure.servlet.*" %>
<%@ page import="xecure.crypto.*" %>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.security.*" %>
<%@ page import="java.util.Random" %>

<script language='javascript' src='../anySign4PCInterface.js'></script>
<script>
<%
    VidVerifier vid = new VidVerifier(new XecureConfig());
    out.println(vid.ServerCertWriteScript());
%>
PrintObjectTag ();
</script>

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 1</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 2</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 3</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 4</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 5</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 6</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 7</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 8</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 9</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 10</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 1</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 2</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 3</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 4</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 5</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 6</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 7</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 8</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 9</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<!---BEGIN_ENC--->
<p align='center'><big><strong>RESULT 10</strong></big></p>

<table border='1' width='100%'>
	<tr>
		<td width='17%'><strong>user MAC address :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("MAC") %>
		</strong></td>
	</tr>
	<tr>
		<td width='17%'><strong>user hard serial :</strong></td>
		<td width='83%'><strong>
				<%=request.getSession().getAttribute("Serial") %>
		</strong></td>
	</tr>
<tr>
<td width='17%'><strong>Client Request QueryString :</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString abc:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("abc" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Client Request QueryString pop:</strong></td>
<td width='83%'><strong>
<%=((XecureHttpServletRequest)request).req.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString :</strong></td>
<td width='83%'><strong>
<%=request.getQueryString( ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString abc :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("abc" ) %> 
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted QueryString pop :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("pop" ) %>
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field1 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field1" ) %>
	
</strong></td>
</tr>
<tr>
<td width='17%'><strong>Decrypted text_field2 :</strong></td>
<td width='83%'><strong>
<%=request.getParameter("text_field2" ) %>
</strong></td>
</tr>
</table>
<!---END_ENC--->

<p> </p>
<p align='center'></p>

</body>
</html>
