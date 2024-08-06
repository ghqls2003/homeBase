<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ page import="com.softforum.xk.e2e.XKUnpackRequestSet"%>
<%@ page import="com.softforum.xk.e2e.XKUnpackRequest"%>
<%@ page import="com.softforum.xk.XKLocalUnpack"%>
<%@ page import="com.softforum.xk.e2e.XKUnpackDB"%>
<%
	// 테스트용 값 체크 변수
	String validPassword = "qwer1234";
	String authenticationResult = "success";

	// 클라이언트에서 전달한 파라미터 반환
	String aUserId       = (String)request.getParameter("userid");
	//String aUserPW     = (String)request.getParameter("userpasswd");
	String aUserPW1      = (String)request.getParameter("userpasswd1");
	String aUserPW2      = (String)request.getParameter("userpasswd2");

	// 파라미터중 - XK 가상키패드로 입력한 값 반환 (복호화 처리)
	String aSessionId1   = (String)request.getParameter("xksessionid1");
	String aSecToken1    = (String)request.getParameter("xksectoken1");
	String aPackedIndex1 = (String)request.getParameter("xkindexed1");
	
	String aSessionId2   = (String)request.getParameter("xksessionid2");
	String aSecToken2    = (String)request.getParameter("xksectoken2");
	String aPackedIndex2 = (String)request.getParameter("xkindexed2");

	// 복호화 타입 가이드용 변수
	// xkunpackrequest : XKUnpackRequest 복호화  (서블릿 URL)
	// xklocalunpack   : XKLocalUnpack 복호화    (API 복호화 - 한개의 WebContext 구축되어있을 경우)
	// (주로 사용) xkunpackdb      : XKUnpackDB 복호화       (DB 복호화 - 별도의 WebContext 구축되어있을 경우)
	// String xkUnpackType = (String)request.getParameter("xkUnpackType");
	String xkUnpackType = "xkunpackdb";

	// XK 복호화 객체
	XKUnpackRequestSet xkUnpackSet = null;
	
	// XK 결과 데이터 반환 변수 선언
	String aResultCode1 = null;
	String aResultMessage1 = null;
	String aUnpacked1 = null;
	
	String aResultCode2 = null;
	String aResultMessage2 = null;
	String aUnpacked2 = null;


	////////////////////////////////////////////////////////////////////////////////////
	System.out.println("================================================================");
	System.out.println("001. aUserId             =====   " + aUserId);
	System.out.println("002. aUserPW1            =====   " + aUserPW1);
	System.out.println("003. aUserPW2            =====   " + aUserPW2);
	System.out.println("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ");
	System.out.println("004. aSessionId1         =====   " + aSessionId1);
	System.out.println("005. aSecToken1          =====   " + aSecToken1);
	System.out.println("006. aPackedIndex1       =====   " + aPackedIndex1);
	System.out.println("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ");
	System.out.println("007. aSessionId2         =====   " + aSessionId2);
	System.out.println("008. aSecToken2          =====   " + aSecToken2);
	System.out.println("009. aPackedIndex2       =====   " + aPackedIndex2);
	System.out.println("================================================================");
	System.out.println("");
	System.out.println("");
	////////////////////////////////////////////////////////////////////////////////////

/***************************************************************************************
	// XKUnpackRequest 복호화 (서블릿 URL)
	if(xkUnpackType.equals("xkunpackrequest")) {
		// E2E 처리한 데이터를 복호화 하기 위한 XecureKeypad Unpack 서블릿 설정
		String url = "http://192.168.50.55:8888/xk/xkunpack";
		
		// XKUnpackRequest 복호화 설정 (url / sessionID / secToken / packedIndex)
		XKUnpackRequest xkUnpackRequest = new XKUnpackRequest(url, aSessionId, aSecToken, aPackedIndex);
		
		// Servlet Unpack 복호화 데이터 객체 반환
		xkUnpackSet = xkUnpackRequest.request();

	// XKLocalUnpack 복호화 (Local API) 
	} else if (xkUnpackType.equals("xklocalunpack")) {
		// API Unpack 요청
		XKLocalUnpack xkLocalUnpack = new XKLocalUnpack (aSessionId, aSecToken, aPackedIndex);
		
		// API Unpack 복호화 데이터 객체 반환
		xkUnpackSet = xkLocalUnpack.unpack();
		
	// XKUnpackDB 복호화 (DB)
	//} else if (xkUnpackType.equals("xkunpackdb")) {
	} else {
		// DB Unpack 요청
		XKUnpackDB xkUnpackDB = new XKUnpackDB(aSessionId, aSecToken, aPackedIndex, "false");
		
		// DB Unpack 복호화 데이터 객체 반환
	    xkUnpackSet = xkUnpackDB.unpack();
	}
***************************************************************************************/
	
	// 첫번째 패스워드 복호화 처리
	// DB Unpack 요청
	XKUnpackDB xkUnpackDB = new XKUnpackDB(aSessionId1, aSecToken1, aPackedIndex1, "true");
		
	// DB Unpack 복호화 데이터 객체 반환
	xkUnpackSet = xkUnpackDB.unpack();

	// 복호화 결과 반환
	aResultCode1 = xkUnpackSet.getResultCode();			// 복호화 수행 결과 코드
	aResultMessage1 = xkUnpackSet.getResultMessage();	// 복호화 수행 결과 메세지
	aUnpacked1 = xkUnpackSet.getResultValue();			// 복호화 데이터 값 (클라이언트에서 입력한 값)

	System.out.println("================================================================");
	System.out.println("AAA. aResultCode1       =====   " + aResultCode1);
	System.out.println("BBB. aResultMessage1    =====   " + aResultMessage1);
	System.out.println("CCC. aUnpacked1         =====   " + aUnpacked1);
	System.out.println("================================================================");
	System.out.println("");
	System.out.println("");
	
	// 두번째 패스워드 복호화 처리
	// DB Unpack 요청
	xkUnpackDB = new XKUnpackDB(aSessionId2, aSecToken2, aPackedIndex2, "true");
		
	// DB Unpack 복호화 데이터 객체 반환
	xkUnpackSet = xkUnpackDB.unpack();

	// 복호화 결과 반환
	aResultCode2 = xkUnpackSet.getResultCode();			// 복호화 수행 결과 코드
	aResultMessage2 = xkUnpackSet.getResultMessage();	// 복호화 수행 결과 메세지
	aUnpacked2 = xkUnpackSet.getResultValue();			// 복호화 데이터 값 (클라이언트에서 입력한 값)

	System.out.println("================================================================");
	System.out.println("DDD. aResultCode2       =====   " + aResultCode2);
	System.out.println("EEE. aResultMessage2    =====   " + aResultMessage2);
	System.out.println("FFF. aUnpacked2         =====   " + aUnpacked2);
	System.out.println("================================================================");
	System.out.println("");
	System.out.println("");

// (테스트 - 가상키패드 입력값과 validPassword 변수값이 같을 경우 체크 )
/***************************************************************************************
	if(!validPassword.equals(aUnpacked)) {
		authenticationResult = "Different" + " === " + aUnpacked;
	} else {
		authenticationResult = "OK!!" + " === " + aUnpacked;
	}
***************************************************************************************/
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>XecureKeypad E2E Mobile Web Version Demo.</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta charset="utf-8" />
	<style type="text/css">
		body {
			font: normal 11pt Trebuchet MS,Arial,sans-serif;
		}
	</style>
</head>

<body>
	<fieldset>
		<legend>XecureKeypad E2E Logon Sample</legend>
		<hr/> 
		<p><label for="pass">Your 1st password is <%=aUserPW1 %></label></p>
		<p><label for="description">Packed Your password is <%=aPackedIndex1 %></label></p>
		<hr noshade></hr>
		<p><label for="unpacked">plain Your password is : <%=aUnpacked1 %></label></p>
		<p><label for="resultCode">ResultCode : <%=aResultCode1 %></label></p>
		<p><label for="resultMessage">resultMessage : <%=aResultMessage1 %></label></p>
		
		<hr/>
		<p><label for="pass">Your 2nd password is <%=aUserPW2 %></label></p>
		<p><label for="description">Packed Your password is <%=aPackedIndex2 %></label></p>
		<hr noshade></hr>
		<p><label for="unpacked">plain Your password is : <%=aUnpacked2 %></label></p>
		<p><label for="resultCode">ResultCode : <%=aResultCode2 %></label></p>
		<p><label for="resultMessage">resultMessage : <%=aResultMessage2 %></label></p>
		<hr/>
		<span style="background-color: #FFFFcc">
			<label for="id"><%=aUserId %> authentication <%=authenticationResult %></label>
		</span>
	</fieldset>
</body>
</html>
