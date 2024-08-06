<%@ page import="com.softforum.xk.e2e.XKUnpackRequestSet"%>
<%@ page import="com.softforum.xk.e2e.XKUnpackRequest"%>
<%@ page import="com.softforum.xk.XKLocalUnpack"%>			
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%
	String validPassword = "thffntusWkd";
	String authenticationResult = "success";
	String aUserId = (String)request.getParameter("userid");
	String aUserPW = (String)request.getParameter("userpasswd");
	
	String aSessionId = (String)request.getParameter("xkinfosessionid");
	String aSecToken = (String)request.getParameter("xkinfosectoken");
	String aPackedIndex = (String)request.getParameter("xkinfoindexed");
	
	String aSessionId2 = (String)request.getParameter("xkinfosessionid2");
	String aSecToken2 = (String)request.getParameter("xkinfosectoken2");
	String aPackedIndex2 = (String)request.getParameter("xkinfoindexed2");
	
	String aResultCode = null;
	String aResultMessage = null;
	String aUnpacked = null;
	
	String aResultCode2 = null;
	String aResultMessage2 = null;
	String aUnpacked2 = null;
	
	String aPrintString = "";
	int aLength = 0;
	
	String aPrintString2 = "";
	int aLength2 = 0;

	if(aPackedIndex.length() > 0) {
		// api unpack 요청
		XKLocalUnpack xkLocalUnpack = new XKLocalUnpack (aSessionId, aSecToken, aPackedIndex);
		XKUnpackRequestSet xkUnpackSet = xkLocalUnpack.unpack();
		aResultCode = xkUnpackSet.getResultCode();
		aResultMessage = xkUnpackSet.getResultMessage();
		aUnpacked = xkUnpackSet.getResultValue();
		
		aPrintString = "";
		aLength = aUnpacked.length();
		
		for(int i=0; i<aLength; i++) {
			if(aUnpacked.charAt(i) == ' ') {
				aPrintString += "&nbsp;";
			} else {
				aPrintString += aUnpacked.charAt(i);				
			}
		}
	}
	if(aPackedIndex2.length() > 0) {
		// api unpack 요청
		XKLocalUnpack xkLocalUnpack = new XKLocalUnpack (aSessionId2, aSecToken2, aPackedIndex2);
		XKUnpackRequestSet xkUnpackSet = xkLocalUnpack.unpack();
		aResultCode2 = xkUnpackSet.getResultCode();
		aResultMessage2 = xkUnpackSet.getResultMessage();
		aUnpacked2 = xkUnpackSet.getResultValue();
		
		aPrintString2 = "";
		aLength2 = aUnpacked2.length();
		
		for(int i=0; i<aLength2; i++) {
			if(aUnpacked2.charAt(i) == ' ') {
				aPrintString2 += "&nbsp;";
			} else {
				aPrintString2 += aUnpacked2.charAt(i);				
			}
		}
	}
	
// http 통신 unpack 요청
/***************************************************************************************
	String url = "http://192.168.70.171:8080/xkService/xkunpack";
	
	if(aPackedIndex.length() > 0) {
		// http 통신 unpack 요청
		XKUnpackRequest xkUnpackRequest = new XKUnpackRequest(url, aSessionId, aSecToken, aPackedIndex);
		XKUnpackRequestSet xkUnpackSet = xkUnpackRequest.request(1);
		aResultCode = xkUnpackSet.getResultCode();
		aResultMessage = xkUnpackSet.getResultMessage();
		aUnpacked = xkUnpackSet.getResultValue();

		aPrintString = "";
		aLength = aUnpacked.length();
		
		for(int i=0; i<aLength; i++) {
			if(aUnpacked.charAt(i) == ' ') {
				aPrintString += "&nbsp;";
			} else {
				aPrintString += aUnpacked.charAt(i);				
			}
		}
	}
	
	if(aPackedIndex2.length() > 0) {
		// http 통신 unpack 요청
		XKUnpackRequest xkUnpackRequest = new XKUnpackRequest(url, aSessionId2, aSecToken2, aPackedIndex2);
		XKUnpackRequestSet xkUnpackSet = xkUnpackRequest.request();
		aResultCode2 = xkUnpackSet.getResultCode();
		aResultMessage2 = xkUnpackSet.getResultMessage();
		aUnpacked2 = xkUnpackSet.getResultValue();
		
		aPrintString2 = "";
		aLength2 = aUnpacked2.length();
		
		for(int i=0; i<aLength2; i++) {
			if(aUnpacked2.charAt(i) == ' ') {
				aPrintString2 += "&nbsp;";
			} else {
				aPrintString2 += aUnpacked2.charAt(i);				
			}
		}
	}
***************************************************************************************/

	if(!validPassword.equals(aUnpacked))
		authenticationResult = "falied";
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta charset="utf-8" />
  <title>Xecure Virtual Keyboard E2E Demo.</title>
  <style type="text/css">
  	body {
		font: normal 11pt Trebuchet MS,Arial,sans-serif;
	}
  </style>
</head>
<body>
<fieldset>
  <legend>E2E Qwerty Logon Sample</legend> 
  <p>
  <label for="pass">Your password is <%=aUserPW %></label>
  </p>
  <p>
  <label for="description">Packed Your password is <%=aPackedIndex %></label>
  </p>
  <hr noshade></hr>
  <p>
  <label for="unpacked">plain Your password is : '<%=aPrintString %>' (length = <%=aLength%>)</label>
  </p>
  <p>
  <label for="unpacked">plain Your password2 is : '<%=aPrintString2 %>' (length = <%=aLength2%>)</label>
  </p>
  
  <p>
  <label for="resultCode">ResultCode : <%=aResultCode %></label>
  </p>
  <p>
  <label for="resultMessage">resultMessage : <%=aResultMessage %></label>
  </p>
  <span style="background-color: #FFFFcc">
  <label for="id"><%=aUserId %> authentication <%=authenticationResult %></label>
  </span>
</fieldset>
</body>
</html>