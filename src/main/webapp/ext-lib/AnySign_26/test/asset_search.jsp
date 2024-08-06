<!DOCTYPE html>
<html>
<head>
<title>ANYSIGN FOR PC</title>
<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>
<meta http-equiv="Pragma" content="no-cache">
<link rel="stylesheet" type="text/css" href="css/anysign.css">
</head>
<body>

<%@ page contentType="text/html; charset=utf-8" %>

<script>
	function goHome(){
		location.href="login.jsp";
	}
</script>


<!---BEGIN_ENC--->
<div id="wrap">
	<!-- header -->
	<div id="header">
		<h1 class="logo"><a href="#" onClick="goHome()">A Bank</a></h1>
		<p class="hi"><em>홍길동</em>님 안녕하세요. 10:55<a href="#">연장</a></p>
		<a href="./login.jsp" class="btn logout">로그아웃</a>
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
		<ul class="lnb v2">
		<li><a href="#" class="m_lnb1">조회</a></li>
		<li><a href="#" class="m_lnb2">이체</a></li>
		<li><a href="#" class="m_lnb3">공과금</a></li>
		<li><a href="#" class="m_lnb4">예금/신탁</a></li>
		<li><a href="#" class="m_lnb5">펀드</a></li>
		<li><a href="#" class="m_lnb6">보험</a></li>
		</ul>
	</div>
	<!-- //header -->
	
	<hr>
	
	<!-- container -->
	<div id="container">
		<div id="content">
			<div class="visual_a">
				<h2>전계좌조회</h2>
			</div>
			<ul class="lst_a">
				<li class="on"><a href="#">예금/신탁</a></li>
				<li><a href="#">펀드</a></li>
				<li><a href="#">대출</a></li>
				<li><a href="#">외화</a></li>
				<li><a href="#">보험</a></li>
				<li class="last"><a href="#">전체계좌</a></li>
			</ul>
			<p class="bx_date">
				<span>
					최근접속일시:
					<em>2014.12.24 13:23:50</em>
				</span>
				<span>
					조회기준일시:
					<em>2015.01.05 17:41:02</em>
				</span>
			</p>
			<div class="a_result">
				<h3>예금/신탁</h3>
				<table class="tbl_a">
					<caption>예금/신탁</caption>
					<colgroup>
						<col style="width:165px">
						<col style="width:232px">
						<col style="width:108px">
						<col style="width:257px">
						<col style="width:230px">
					</colgroup>
					<thead>
						<tr>
							<th scope="col">예금명</th>
							<th scope="col">계좌번호</th>
							<th scope="col">최종거래일</th>
							<th scope="col" class="tr">잔액(원)</th>
							<th scope="col"><span class="h_direct">바로가기</span></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>우리꿈 통장</td>
							<td>123-456-891154-12</td>
							<td>2015.01.05</td>
							<td class="a_money">5,000,000</td>
							<td class="tr">
								<a href="#" class="btn search">조회</a>
								<a href="#" class="btn transfer">이체</a>
								<a href="#" class="btn manage">계좌관리</a>
							</td>
						</tr>
						<tr>
							<td>소포꿈통장</td>
							<td>257-658-254832-24</td>
							<td>2014.12.29</td>
							<td class="a_money">60,000,000</td>
							<td class="tr">
								<a href="#" class="btn search">조회</a>
								<a href="#" class="btn transfer">이체</a>
								<a href="#" class="btn manage">계좌관리</a>
							</td>
						</tr>
						<tr>
							<td>자녀학자금 통장</td>
							<td>548-154-487124-54</td>
							<td>2014.12.23</td>
							<td class="a_money">81.540.051</td>
							<td class="tr">
								<a href="#" class="btn search">조회</a>
								<a href="#" class="btn transfer">이체</a>
								<a href="#" class="btn manage">계좌관리</a>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="wrap_btn">
					<a href="#" class="btn changeorder">계좌정렬순위변경</a>
					<a href="#" class="btn save">엑셀저장</a>
					<a href="#" class="btn print">인쇄</a>
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
