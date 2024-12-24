<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<script src="${contextPath}/js/ma/headerSearch.js"></script>
<link rel="stylesheet" type="text/css"
	href="${contextPath}/css/custom/header.css" />
<script src="${contextPath}/js/ma/server_stat.js"></script>
<script src="${contextPath}/ext-lib/eventsource.js"></script>

<link rel="stylesheet" type="text/css"
	href="${contextPath}/css/custom/mainView.css" />
<!-- header -->
<!-- 본문바로가기 -->
<div id="skip_to_container">
	<a href="#container" id="skipNav">본문 바로가기</a>
</div>

<!-- header -->
<div class="header">
	<div class="inner">
		<a href="${contextPath}/" class="logo"><img src="${contextPath}/images/sun_logo.png" alt="해가득로고" style="width: 150px;"></a>
		<div class="gnb-wr">

			<ul class="gnb pcGnb">
			</ul>
			<div class="login_wr">

				<%
				// Retrieve data from session
				String authrtCd = (String) session.getAttribute("authrtCd");

				// If message exists, display it and then remove it from session
				if (authrtCd != null && !authrtCd.isEmpty() && !authrtCd.equals("A01")) {
				%>
				<button class="hr_btn login_btn"
					onClick="location.href='${ contextPath }/ma/logout'">
					<!-- <button class="hr_btn login_btn"
					onClick="location.href='https://rims.kotsa.or.kr/rims/sso/SPLogout.jsp'"> -->
					로그아웃
				</button>
				<div class="member_wr" onclick="location.href='${ contextPath }/ma/myPage'">
					<span class="k-picker k-dropdownlist k-picker-solid k-picker-md k-rounded-md" style="width: 132px;">
						<span class="k-input-inner">
							<span class="k-input-value-text">마이페이지</span>
						</span>
					</span>
				</div>
				<%
				} else {
				%>
				<button class="hr_btn login_btn" onClick="location.href='${ contextPath }/ma/login'">로그인</button>
				<%
				}
				%>
				<!-- 1. 로그인 전 나타나는 영역 끝-->
			</div>
		</div>
		<div class="ham_menu_btn">
			<img src="${contextPath}/images/ico_ham.png" alt="">
		</div>
	</div>
</div>

<!--hambtn-->
<div class="ham_menu">
	<div class="ham_menu_btn close_ham">
		<a href="/" class="ham_logo"><img
			src="${ contextPath }/images/sun_logo.png" alt="해가득로고"></a> <img
			src="${ contextPath }/images/ico_close.png" alt="사이드메뉴 닫기 버튼">
	</div>
	<div class="mo_scroll">
		<div class="inner">
			<ul class="gnb mobileGnb">
			</ul>
			<!-- 2. 로그인전 나타나는 영역 시작-->
			<div class="ham_login_wr">
				<%
				// Retrieve data from session
				// If message exists, display it and then remove it from session
				if (authrtCd != null && !authrtCd.isEmpty() && !authrtCd.equals("A01")) {
				%>
				<button class="hr_btn login_btn" onClick="location.href='${ contextPath }/ma/logout'">로그아웃
				</button>
				<button class="hr_btn login_btn" onClick="location.href='${ contextPath }/ma/myPage'">마이페이지</button>
				<%
				} else {
				%>
				<button class="hr_btn login_btn" onClick="location.href='${ contextPath }/ma/login'">로그인</button>
				<%
				}
				%>
			</div>
			<!-- 2. 로그인전 나타나는 영역 시작-->
		</div>
	</div>
</div>
<div class="ham_bg"></div>
<!-- header 끝 -->
<%
if (authrtCd != null && !authrtCd.isEmpty() && authrtCd.equals("K01")) {
%>

<div class="main">
	<div class="serverStatusBar wt_box">
		<div class="bar_head">
			<h4>최신 근황</h4>
		</div>
		<div class="bar_cont">
			<ul class="server_list">
				<li class="server_list_item server_list_item1" id="chck1">
					<div class="server_list_item_inner">
						<div class="status_icon_wrap">
							<div class="status_icon"></div>
						</div>
						<p class="server_name">새로운 글</p>
						<div class="status">
							<p class="status_text">확인중</p>
						</div>
					</div>
				</li>
				<li class="server_list_item server_list_item2" id="chck2">
					<div class="server_list_item_inner">
						<div class="status_icon_wrap">
							<div class="status_icon"></div>
						</div>
						<p class="server_name">새로운 댓글</p>
						<div class="status">
							<p class="status_text">확인중</p>
						</div>
					</div>
				</li>
				<li class="server_list_item server_list_item3" id="chck3">
					<div class="server_list_item_inner">
						<div class="status_icon_wrap">
							<div class="status_icon"></div>
						</div>
						<p class="server_name">새로운 사진</p>
						<div class="status">
							<p class="status_text">확인중</p>
						</div>
					</div>
				</li>
			</ul>
			<div class="chart_wrap scrollBar">
				<div id="server_chart"></div>
			</div>
		</div>
	</div>
</div>
<%
}
%>

<script>
	window.onload = function() {
		defaultMenuInfoList();
	};
</script>

<script type="text/javascript">
	var admstt = "${sessionScope.userData.authrtCd}"
	    var admstt = ['K01', 'D01', 'Z01', 'Z02', 'S04'].includes(admstt);
	var auth = "${sessionScope.userData.authrtCd}";
	var lBizRno = "${sessionScope.userData.bizrno}";
	var sessionMenuId = "${sessionScope.userData.menuId}";

	function getGAuth2() {
		return seLogin = "${sessionScope.userData.authorLv}";
	}
</script>