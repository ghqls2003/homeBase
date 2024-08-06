<%@page import="java.net.URL"%>
<%@page import="com.naru.provider.IdentificationProvider,java.io.*"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">
function txtcls(){
	parent.document.getElementById("dumcon").innerText="";
}
</script>
</head>
<body onload="txtcls();return false;">
<%! 
String tab = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp";
String rn = "<br/>";
public String htmlMsg(String msg){
	return htmlMsg(msg, 0);
} 
public String htmlMsg(String msg, int type){
	msg = msg+rn;
	if(type == 1)
		return tab+msg+rn;
	return msg;
} 
public String convTag(String msg){
	msg = msg.replaceAll("<", "&lt;");
	msg = msg.replaceAll(">", "&gt;");
	return msg;
}
public String boldTag(String msg){
	msg = "<b>"+msg+"</b>";
	return msg;
}
%>
<%
String cmd = request.getParameter("cmd");
if(cmd.equals("LoaderTest"))
{
	out.write(htmlMsg(boldTag(" ### Class Loader Test Start ...<br/>")));
	out.write(htmlMsg(boldTag("1. com.naru.util.LoaderTest find ...")));
	String reqName = "com.naru.util.LoaderTest";
	try{
		URL classUrl = this.getClass().getResource("/com/naru/util/LoaderTest.class");
        if (classUrl == null) {
            out.write(htmlMsg("<font color='red'>"+ reqName + "  not found.</font>",1));
        } else {
        	out.write(htmlMsg( "<font color='blue'>SUCCESS : </font>"+ reqName+ " : [ " + classUrl.getFile() + " ]",1));
        }
	}catch(Exception e){
		out.write(htmlMsg("<font color='red'>"+e.toString()+"</font>",1));
	}
}else{
	String type = request.getParameter("type");

	String result = "";
	out.write(htmlMsg(boldTag(" ### Provider Loader Test Start ...<br/>")));
	try{
		
			
		if(type.equals("SP")){
			out.write(htmlMsg(boldTag("2. com.naru.provider.ServiceProvider loding ...")));
			com.naru.provider.ServiceProvider sp = (com.naru.provider.ServiceProvider)com.naru.provider.ProviderFactory.getProviderTest();
				
			if(sp instanceof com.naru.provider.ServiceProvider)
				out.write(htmlMsg( "<font color='blue'>SUCCESS</font><br/>",1));
			else{
				
			}
			out.write(htmlMsg(boldTag("3. make sample XML  ...")));
			
			org.opensaml.saml2.core.AuthnRequest ar = sp.generateAuthRequest(session.getId());
			String sampleTxt = com.naru.Util.domToStr(ar.getDOM().getOwnerDocument(), false);
			if(sampleTxt == null)
				throw new Exception("resultTxt is null");
			out.write(htmlMsg("<font color='blue'>SUCCESS</font><br/>",1));
			out.write(htmlMsg(" result (0~300 text) : ",1));
		    sampleTxt = convTag(sampleTxt);
		    sampleTxt = sampleTxt.substring(0,300);
			out.write(htmlMsg(sampleTxt,1));
		}
		else if(type.equals("IDP")){
			out.write(htmlMsg(boldTag("2. com.naru.provider.IdentificationProvider loding ...")));
			com.naru.provider. IdentificationProvider idp = (com.naru.provider.IdentificationProvider)com.naru.provider. ProviderFactory.getProviderTest(); 
			if(idp instanceof com.naru.provider.IdentificationProvider)
				out.write(htmlMsg( "<font color='blue'>SUCCESS</font><br/>",1));
			out.write(htmlMsg(boldTag("3. make sample XML  ...")));
			org.opensaml.saml2.core.AuthnRequest ar =idp.receiveAuthRequest(request);
			String sampleTxt = com.naru.Util.domToStr(ar.getDOM().getOwnerDocument(), false);
			if(sampleTxt == null)
				throw new Exception("resultTxt is null");
			out.write(htmlMsg("<font color='blue'>SUCCESS</font><br/>",1));
			out.write(htmlMsg(" result (0~300 text) : ",1));
		    sampleTxt = convTag(sampleTxt);
		    sampleTxt = sampleTxt.substring(0,300);
			out.write(htmlMsg(sampleTxt,1));
		}
		
		// license test
			out.write(htmlMsg(boldTag("4. License Check  and DB connect Check (only IDP)...")));
			int returnCode = -1;
			StringBuffer xmlString = new StringBuffer();
		    com.naru.api. SSOApiAdmin mnApi= new com.naru.api.SSOApiAdmin();
		    returnCode = mnApi.serviceCheck(request, xmlString);
			String rmsg = (returnCode == 0)?"<font color='blue'>SUCCESS</font>":"<font color='red'>FAILURE</font>";
			out.write(htmlMsg(rmsg,1));
			String licRlt = xmlString.toString();
			licRlt = convTag(licRlt);
			out.write(htmlMsg(licRlt,1));
			if(returnCode !=0)
				return;
	}catch(Exception e){
		out.write(htmlMsg("<font color='red'>"+e.toString()+"</font>",1));
	}finally{
		out.write(htmlMsg(boldTag("Test END ...")));
	}
}

%>

</body>
</html>