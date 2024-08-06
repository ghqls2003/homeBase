<!DOCTYPE html>
<html>
<head>
<title>AnyPIN(애니핀)</title>
<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
<meta http-equiv="Pragma" content="no-cache">
<link rel="stylesheet" type="text/css" href="css/anysign.css">
</head>
<body>

<%@ page contentType="text/html; charset=utf-8" %>
<script>
	function goHome(){
		location.href="./login.jsp";
	}
</script>


<!---BEGIN_ENC--->
<div id="wrap">
	<!-- header -->
	<div id="header">
		<h1 class="logo"><a href="#" onClick="goHome();">A Bank</a></h1>
		<div class="gnb">
			<ul>
			<li><a href="#" class="m_gnb1">개인</a></li>
			<li><a href="#" class="m_gnb2">기업</a></li>
			<li><a href="#" class="m_gnb3">카드</a></li>
			<li><a href="#" class="m_gnb4">전체서비스</a></li>
			</ul>
			<div class="inp_box">
				<fieldset>
				<legend>검색</legend>
				<input type="text" title="검색어 입력">
				<button type="button">검색하기</button>
				</fieldset>
			</div>
		</div>
	</div>
	<!-- //header -->
	
	<hr>
	
	<!-- container -->
	<div id="container">
		<div id="content">
			<div class="visual_result v6">
				<h3>로그인 실패</h3>
<%
	if(!("".equals(request.getParameter("code")) || request.getParameter("code") == null)){
%>
				<p>실패 코드 : <%=request.getParameter("code") %> <br/> 실패 사유 : <%=request.getParameter("reason") %> </p>
<%
	}
%>
				<p>요청하신 로그인에 실패하였습니다.<br>계속적으로 문제가 발생할 경우 당사 고객센터로 문의해 주시기 바랍니다.</p> 
				<div class="wrap_btn">
					<a href="./login.jsp" class="btn submit">확인</a>
				</div>
			</div>
			<div class="wrap_quick">
				<div class="block">
					<h3 class="blind">바로가기메뉴</h3>
					<strong>조회/이체</strong>
					<ul>
						<li><a href="#">계좌조회</a></li>
						<li><a href="#">거래내역조회</a></li>
						<li><a href="#">즉시이체/예약이체</a></li>
						<li><a href="#">즐겨찾는이체</a></li>
						<li><a href="#">이체결과조회</a></li>
						<li><a href="#">자동이체</a></li>
					</ul>
				</div>
				<div class="block">
					<strong>공과금</strong>
					<ul>
						<li><a href="#">지로납부</a></li>
						<li><a href="#">지방세</a></li>
						<li><a href="#">전화요금</a></li>
						<li><a href="#">아파트관리비</a></li>
						<li><a href="#">통합징수보험료</a></li>
						<li><a href="#">등록금</a></li>
					</ul>
				</div>
				<div class="block">
					<strong>금융상품</strong>
					<ul>
						<li><a href="#">예금신규</a></li>
						<li><a href="#">펀드신규</a></li>
						<li><a href="#">펀드계좌조회</a></li>
						<li><a href="#">대출신청</a></li>
						<li><a href="#">대출이자납부</a></li>
						<li><a href="#">해외송금</a></li>
					</ul>
				</div>
				<div class="block">
					<strong>뱅킹관리</strong>
					<ul>
						<li><a href="#">자주쓰는입금계좌관리</a></li>
						<li><a href="#">계좌별명달기</a></li>
						<li><a href="#">SMS통지서비스</a></li>
						<li><a href="#">증명서발급</a></li>
						<li><a href="#">보안서비스</a></li>
						<li><a href="#">분실신고</a></li>
					</ul>
				</div>
				<div class="inner_quick">
					<strong>주요서비스 바로가기</strong>
					<ul>
						<li class="m_inner1"><span>인터넷뱅킹</span><a href="#" class="btn">체험하기</a></li>
						<li class="m_inner2"><span>보안프로그램</span><a href="#" class="btn">설치하기</a></li>
						<li class="m_inner3"><span>유의사항</span><a href="#" class="btn">알아보기</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<!-- //container -->
	<hr>
	
	<!-- footer -->
	<div id="footer">
		<p class="f_menu">
			<a href="#">개인정보처리방침</a> <span>|</span>
			<a href="#">영업점안내</a> <span>|</span>
			<a href="#">사이트맵</a>
		</p>
		<p class="copy">COPYRIGHT(C) 2015 SOFTFORUM. ALL RIGHTS RESERVED.</p>
		<ul>
			<li><a href="#" class="btn twitter">트위터 바로가기</a></li>
			<li><a href="#" class="btn facebook">페이스북 바로가기</a></li>
		</ul>
	</div>
	<!-- //footer -->
</div>
<!---END_ENC--->

</body>
</html>
