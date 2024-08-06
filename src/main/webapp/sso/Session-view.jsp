<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ page import="java.util.Enumeration" %>
<%@ page import="com.naru.config.SSOConfig"%>
<%
	String MPS_USER_ID = "SSO_ID";     						    // SSO 사용자 ID
	String MPS_USER_USERNAME = "SSO_NAME";   	// SSO 사용자 NAME
	String MPS_CPA_ID = "MEMBER_TYPE";    	//
	String MPS_GIS_ID = "LASTLOGIN_TIME";    	//
//	String MPS_APPLICATION_LIST = "ssoApplicationList";    	
%>
<html>
<head>
<title>:::: SSO 업무서버 테스트 ::::</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<style type="text/css">
#content
{
	width:100%
}
#content table { width:100%; border:1px }
#content table thead { text-align:center;background:#B3CDEE }
#content table td { padding:.1em; border-right:1px solid #CCC; border-bottom:1px solid #CCC;}

form table { width:50%; border:1px }
form table thead { text-align:center;background:#B3CDEE }
form table td { padding:.1em; border-right:1px solid #CCC; border-bottom:1px solid #CCC;}

</style>

<script type="text/javascript">
var selectNames = new Array(
		'SP1',
		'SP2',
		'SP3'  );
var selectValues  = new Array(
		'http://sp1.dev.com:40004',
	    'http://sp2.dev.com:40007',
	    'http://sp3.dev.com:40010'     );

var reqPage = "/sso/CreateRequest.jsp";
var relayPage = "/sso/Session-view.jsp";

	function moveToOtherSystem()
	{
		document.form1.action = document.getElementById("SP").value;

		var isNewWindow = document.form1.isNewWindow.checked;

		if (isNewWindow)
		{
			document.form1.target = "_blank";
		}
		else
		{
			document.form1.target = "_self";
		}

		document.form1.submit();
	}
	
	function targetInit(){
		var optionsHtml = "";
		for(var i=0; i<selectNames.length; i++){
			optionsHtml += "<option value='"+selectValues[i]+"'>"+selectNames[i]+"</option>";
		}
		var selFrm = document.getElementById("SU");
		selFrm.innerHTML = optionsHtml;
		document.form1.SP.value=selFrm.value+reqPage;
		document.form1.RelayState.value = selFrm.value+relayPage;
	}
	
	function targetSelect(){
		var selFrm = document.getElementById("SU");
		document.form1.SP.value=selFrm.value+reqPage;
		document.form1.RelayState.value = selFrm.value+relayPage;
	}

</script>
</head>

<body onload="targetInit();">
<h1 align="center">Magic SSO 연계 테스트 페이지 :   <%=SSOConfig.getSiteName() %></h1>
<a href="SPLogout.jsp?status=init"><h4 align="right">logout</h4></a>
<div id="content">
<table>
	<thead>
		<tr>
			<td width="20%">Header Variable</td>
			<td >Header Value</td>
		</tr>
	</thead>
	<tbody>
<%
    Enumeration eh = request.getHeaderNames();
	while(eh.hasMoreElements()){
		String skey = (String)eh.nextElement();
    	out.println("<tr>");
    	out.println("<td>"+skey+"</td>");
    	out.println("<td>"+request.getHeader(skey)+"</td>");
    	out.println("</tr>");
	}
%>
	</tbody>
</table>

<table>
	<thead>
		<tr>
			<td width="20%">Session Variable</td>
			<td>Session Value</td>
		</tr>
	</thead>
	<tbody>
    <tr>
		<td>session id</td>
		<td><%=session.getId() %></td>
	</tr>
<%
    Enumeration em = session.getAttributeNames();
    while(em.hasMoreElements()){
    	String skey = (String)em.nextElement();
    	out.println("<tr>");
    	out.println("<td>"+skey+"</td>");
    	out.println("<td>"+session.getAttribute(skey)+"</td>");
    	out.println("</tr>");
    }
%>
	</tbody>
</table>
</div>

<p>
<form name="form1" method="post" action="">
<fieldset>

<table>
	<thead>
		<tr>
			<th colspan="2">연계정보입력</th>
		</tr>
	</thead>
	<tfoot></tfoot>
	<tbody>
		<tr>
			<td width="30%"><label for="SU">연계시스템</label></td>
			<td>
				<select name="SU" id="SU" onchange="targetSelect();">
					
				</select>
				<input type="hidden" id="SP" name="SP" value="" />
			</td>
		</tr>

		<tr>
			<td><label for="RelayState">Target Page URL</label></td>
			<td>
				<input type="text"  name="RelayState" id="RelayState" size="50"/>
			</td>
		</tr>
		<tr>
			<td><label for="FailRtnUrl">실패시 돌아올 Url</label></td>
			<td>
				<input type="text" name="FailRtnUrl" id="FailRtnUrl"    value="http://sp2.dev.com:40007/sso/Session-view.jsp" size="50"/>
			</td>
		</tr>
		<tr>
			<td colspan="2"><input type="checkbox" name="isNewWindow" id="isNewWindow" /><label for="isNewWindow">새창으로 띄움</label></td>
		</tr>
		<tr>
			<td colspan="2" align="center"><input type="button" value="이 동" onclick="moveToOtherSystem()"/></td>
		</tr>
	</tbody>
</table>
</fieldset>
</form>


</p>

</body>
</html>
