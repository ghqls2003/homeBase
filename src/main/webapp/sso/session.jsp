<%@ page contentType="text/html; charset=utf-8" %>
<%@ page import="java.io.File" %>
<%@ page import="java.util.Enumeration" %>
<%@ page import="java.util.Collections" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>

<%
request.setCharacterEncoding("UTF-8");

%>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>MagicSSO Login Session view(확인 후, 삭제 요망)</title>
	<style type="text/css" media="screen">
		dl.row{border-top:1px dotted #777; magin:0; padding:0;clear:left;}
		dl.row dt{float:left; margin:0; padding:0; width:200px; height:25px; font-weight: bold; border-right:1px solid #AAA;}
		dl.row dd{float:left; margin:0; padding-left:2em;}
	</style>
	<script type="text/javascript">
		window.onunload = function()
		{
			MagicPass.monitor(7000);
		};
		
		function encStart(flag){
			if(flag==0){
				var frm = document.sView;
				var rlt1 = b64_sha256(frm.tartxt.value.trim());
				var rlt2 = hex_sha256(frm.tartxt.value.trim());
				frm.rlttxt.value=rlt2;
				alert("b64_sha256(var plainTxt) : \n"+rlt1+"\n-------------------------------------\nhex_sha256(var plainTxt) : \n"+rlt2);
			}else{
				hsf.start();
			}
		}
		
		function openPop(url){
			window.open(url,'mpop','width=510,height=360,status=yes,scrollbars=yes,resizable=yes');
		}
		
		function openPop1(url){
			window.open(url,'mpop','width=700,height=500,status=yes,scrollbars=yes,resizable=yes');
		}
		function symTest(){
			var txt = document.getElementById("symTxt").value;
			var n_ret = MagicPass.encryptSym(txt);
			alert(n_ret);
			var rlt="def";
			if(n_ret == 0)
				rlt = new String(MagicPass.getResult());
			alert(rlt);
		}
		
		function chkb(){
			 var IE = (navigator.appName.indexOf("Microsoft") > -1);
		     var IE7 = IE && (navigator.userAgent.indexOf("MSIE 7") > -1);
		     var IE8 = IE && (navigator.userAgent.indexOf("MSIE 8") > -1);
		     var IE9 = IE && (navigator.userAgent.indexOf("MSIE 9") > -1);
			  alert("IE7 : "+IE7+"\nIE8 : "+IE8+"\nIE9 : "+IE9);
			  alert(navigator.userAgent);
		      if(IE7) {
		       alert("IE 7 으로 접속하셨습니다.\n만약 호환성 보기에 체크되어 있다면 IE8이상으로 변경후 접속해 주시기 바랍니다.\n본 사이트는 IE9에 최적화되어 있으며 IE8까지만 지원합니다. 감사합니다.");
		      } else if (IE8 || IE9) {
		      } else {       
		       alert("본 사이트는 IE9에 최적화되어 있으며 IE8까지만 지원합니다. 감사합니다.");
		       //window.open('','_self').close();
		      }
		}
	</script>
</head>
<body>
<form id="sView" name="sView">
	
	<dl>
		<dd>
			<input type="text" id="symTxt" name="symTxt" />
			<input type="button" id="test" name="test" value="테스트" onclick="symTest();return false;"/>
		</dd>
	</dl>
<table border='1'>
<tr>
<th colspan="2">SESSION INFORMATION</th>
</tr>
<tr>
<th>SESSION FIELD NAME</th>
<th>SESSION FIELD VALUE</th>
</tr>
<tr>
<td>File Encoding</td>
<td><%=System.getProperty("file.encoding") %></td>
</tr>
<tr>
<td>Absolute Path</td>
<td><%=  new File(".").getAbsolutePath() %></td> 
</tr>
<tr>
<td>home dir</td>
<td><%= System.getProperty("dreamsecurity.home.path") %></td> 
</tr>
<tr>
<td>SESSION_ID</td>
<td><%= session.getId() %></td> 
</tr>
<%
	Enumeration sNames = session.getAttributeNames();
    //List<String> li = new ArrayList<String>();
	while(sNames.hasMoreElements())
	{
		Object so = sNames.nextElement();
		if(so != null){
			out.println("<tr><td>"+(String)so+"</td>");
			out.println("<td>"+session.getAttribute((String)so)+"</td></tr>");
		}
	}
	
%>

<!-- REQUEST -->
<tr>
<th colspan="2">REQUEST INFORMATION</th>
</tr>
<tr>
<td>METHOD</td>
<td><%= request.getMethod().toUpperCase() %></td> 
</tr>
<%

		Enumeration pNames = request.getParameterNames();
		while(pNames.hasMoreElements()){
			Object key = pNames.nextElement();
			if(key != null){
				out.println("<tr><td>"+(String)key+"</td>");
				out.println("<td>"+request.getParameter((String)key)+"</td></tr>");
			}
		}
%>
</table>

</form>
<div id="MagicLineArea"></div>
</body>
</html>