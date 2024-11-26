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
		<a href="${contextPath}/" class="logo"><img
			src="${contextPath}/images/logo.png" alt="운전자격확인시스템로고"></a>
		<div class="gnb-wr">

			<ul class="gnb pcGnb">
				<%-- <li><a href="" class="titFont">서비스소개</a>
	              <ul class="depth-wr">
	                <li><p class="titFont">서비스소개</p>
	                  <ul class="depth">
	                    <li><a href="">- 서비스 이용안내</a></li>
	                  </ul>
	                </li>
	              </ul>
	            </li>
	            <li><a href="" class="titFont">운전자격검증</a>
	              <ul class="depth-wr">
	                <li><p class="titFont">운전자격검증</p>
	                  <ul class="depth">
	                    <li><a href="${contextPath}/vfc/drive">- 운전자격검증</a></li>
	                  </ul>
	                </li>
	              </ul>
	            </li>
	            <li><a href="" class="titFont">지자체관리</a>
	              <ul class="depth-wr">
	                <li><p class="titFont">지자체관리</p>
	                  <ul class="depth">
	                    <li><a href="${contextPath}/sys/cmpnymanage">- 사업자 관리</a></li>
	                    <li><a href="${contextPath}/sys/usermanage">- 사용자 관리</a></li>
	                    <li><a href="">- 사업자 정보 갱신 이력</a></li>
	                    <li><a href="">- 차량정보 관리</a></li>
	                  </ul>
	                </li>
	              </ul>
	            </li>
	            <li><a href="" class="titFont">대여사업자관리</a>
	              <ul class="depth-wr">
	                <li><p class="titFont">대여사업자관리</p>
	                  <ul class="depth">
	                    <li><a href="">- 기업정보 관리</a></li>
	                    <li><a href="">- 대여정보 조회</a></li>
	                    <li><a href="${contextPath}/vfc/drvVfcHist">- 운전자격 검증이력 조회</a></li>
	                    <li><a href="">- 대여이력 관리</a></li>
	                    <li><a href="">- 대여확인증 발급 이력</a></li>
	                  </ul>
	                </li>
	              </ul>
	            </li>
	            <li><a href="" class="titFont">통계</a>
	              <ul class="depth-wr">
	                <li><p class="titFont">통계</p>
	                  <ul class="depth">
	                    <li><a href="">- 종합 통계</a></li>
	                      <li><a href="">- 대여사업자 통계</a></li>
	                      <li><a href="">- 대여차량 통계</a></li>
	                      <li><a href="">- 대여이력 통계</a></li>
	                      <li><a href="">- 대여차량 결함 통계</a></li>
	                  </ul>
	                </li>
	              </ul>
	            </li>
	            <li><a href="" class="titFont">오픈API</a>
	                <ul class="depth-wr">
	                  <li><p class="titFont">오픈API</p>
	                    <ul class="depth">
	                        <li><a href="">- 오픈 API 사용 가이드</a></li>
	                        <li><a href="">- 인증키 현황</a></li>
	                        <li><a href="">- API 목록</a></li>
	                        <li><a href="${contextPath}/mm/apiview">- API 이용 현황</a></li>
	                    </ul>
	                  </li>
	                </ul>
	              </li>
	              <li><a href="" class="titFont">고객지원</a>
	                <ul class="depth-wr">
	                  <li><p class="titFont">고객지원</p>
	                    <ul class="depth">
	                      <li><a href="">- 공지사항</a></li>
	                      <li><a href="">- FAQ</a></li>
	                      <li><a href="">- 문의하기</a></li>
	                    </ul>
	                  </li>
	                </ul>
	              </li> --%>
			</ul>
			<div class="login_wr">

				<%
				// Retrieve data from session
				String authrtCd = (String) session.getAttribute("authrtCd");

				// If message exists, display it and then remove it from session
				if (authrtCd != null && !authrtCd.isEmpty() && !authrtCd.equals("A01")) {
				%>
				<div class="input2">
					<label for="searchWrd_header">검색창</label> <input class="input"
						id="searchWrd_header" aria-label="검색창"
						style="position: relative; width: 253px; height: 43px; border-radius: 22px; background-color: #fff; font-size: 1.6rem; line-height: 26px; border-color: #4A64F5; padding-left: 15px;">
					<button class="hr_btn2" id="searchBtnHeader">
						<img src="${contextPath}/images/ico_search.png" alt="검색 아이콘">
					</button>
				</div>
				<button class="hr_btn login_btn"
					onClick="location.href='${ contextPath }/ma/logout'">
					<!-- <button class="hr_btn login_btn"
					onClick="location.href='https://rims.kotsa.or.kr/rims/sso/SPLogout.jsp'"> -->
					로그아웃
				</button>
				<div class="member_wr"
					onclick="location.href='${ contextPath }/ma/myPage'">
					<!-- <span title=""
						class="k-picker k-dropdownlist k-picker-solid k-picker-md k-rounded-md"
						unselectable="on" role="combobox" aria-expanded="false"
						tabindex="0" aria-controls="mem_select_listbox"
						aria-disabled="false" aria-readonly="false" aria-busy="false"
						aria-describedby="ddee3875-0968-4e7d-b195-8378d38e4208"
						style="width: 132px;"
						aria-activedescendant="eeb085a6-a96e-41de-8713-9cd691d8ebd6">
						<span id="ddee3875-0968-4e7d-b195-8378d38e4208" unselectable="on"
						class="k-input-inner"> <span class="k-input-value-text">마이페이지</span>
					</span>
					</span> -->

					<span
						class="k-picker k-dropdownlist k-picker-solid k-picker-md k-rounded-md"
						style="width: 132px;"> <span class="k-input-inner">
							<span class="k-input-value-text">마이페이지</span>
					</span>
					</span>

				</div>
				<%
				} else {
				%>
				<div class="input2">
					<input class="input" id="searchWrd_header" aria-label="검색창"
						style="position: relative; width: 253px; height: 43px; border-radius: 22px; background-color: #fff; font-size: 1.6rem; line-height: 26px; border-color: #4A64F5; padding-left: 15px;">
					<button class="hr_btn3" id="searchBtnHeader">
						<img src="${contextPath}/images/ico_search.png" alt="검색 아이콘">
					</button>
				</div>
				<button class="hr_btn login_btn"
					onClick="location.href='${ contextPath }/ma/login'">로그인</button>
				<button class="hr_btn join_btn"
					onClick="location.href='${ contextPath }/ma/join'">회원가입</button>
				<%
				}
				%>

				<!-- 1. 로그인 전 나타나는 영역 끝-->


				<!-- 2. 로그인했을 때 나타나는 영역 시작-->
				<!-- 	            <div class="member_wr"> -->
				<!-- 	                <label for="mem_select">회원정보</label> -->
				<!-- 	                <select id="mem_select" > -->
				<!-- 	                    <option value="0" selected>회원정보</option> -->
				<!-- 	                    <option value="1">권한신청</option> -->
				<!-- 	                    <option value="2">마이페이지</option> -->
				<!-- 	                </select> -->
				<!-- 	            </div> -->
				<!-- 2. 로그인했을 때 나타나는 영역 끝-->
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
		<a href="/rims" class="ham_logo"><img
			src="${ contextPath }/images/logo.png" alt="운전자격확인시스템로고"></a> <img
			src="${ contextPath }/images/ico_close.png" alt="사이드메뉴 닫기 버튼">
	</div>
	<div class="mo_scroll">
		<div class="inner">

			<!-- 1. 로그인했을 때 나타나는 영역 시작-->
			<!-- 	            <div class="side_member"> -->
			<!-- 	                <h4> -->
			<%-- 	                    <img src="${ contextPath }/images/ico_member.png" alt="회원정보"> --%>
			<!-- 	                    회원정보 -->
			<!-- 	                </h4> -->
			<!-- 	                <ul class="link"> -->
			<!-- 	                    <li><a href="">권한신청</a></li> -->
			<!-- 	                    <li class="bar"></li> -->
			<!-- 	                    <li><a href="">마이페이지</a></li> -->
			<!-- 	                </ul> -->
			<!-- 	            </div> -->
			<!-- 1. 로그인했을 때 나타나는 영역 끝-->
			<!--   				<input id="searchBtnHeader" class="hr_search" aria-label="검색창">   -->

			<!-- 			<div class="selec_wr"> -->
			<!-- 				<div class="mo_flex"> -->
			<!-- 					<ul class="selec_box"> -->
			<!-- 						<li class="li_slecsearch"><label for="searchWrd" -->
			<!-- 							style="width: 100%;"></label> <input type="text" -->
			<!-- 							id="searchWrd_header2" class="hr_search2" -->
			<!-- 							placeholder="검색어을 입력하세요." -->
			<!-- 							style="width: 100%; position: relative; width: 90%; height: 43px; border-radius: 22px; background-color: #fff; font-size: 1.6rem; line-height: 26px; border-color: #4A64F5; padding-left: 15px;"> -->
			<!-- 							<button class="hr_btn2" id="searchBtnHeader2"> -->
			<%-- 								<img src="${contextPath}/images/ico_search.png"> --%>
			<!-- 							</button></li> -->
			<!-- 						<li></li> -->
			<!-- 					</ul> -->
			<!-- 				</div> -->
			<!-- 			</div> -->
			<!-- 			<input class="hr_search" id="searchWrd_header2" aria-label="검색창"> -->
			<!-- 			<button class="hr_btn_mobile" id="searchBtnHeader2"> -->
			<%-- 				<img src="${contextPath}/images/ico_search.png"> --%>
			<!-- 			</button> -->
			<div class="input2">
				<label for="searchWrd_header2">검색창</label> <input class="input"
					id="searchWrd_header2" aria-label="검색창"
					style="position: relative; height: 43px; border-radius: 22px; background-color: #fff; font-size: 1.6rem; line-height: 26px; border-color: #4A64F5; padding-left: 15px;">
				<button class="hr_btn3" id="searchBtnHeader2">
					<img src="${contextPath}/images/ico_search.png" alt="검색 아이콘">
				</button>
			</div>
			<ul class="gnb mobileGnb">
				<%-- <li><a class="titFont">서비스소개</a>
	                    <ul class="gnb-depth">
	                    <li><a href="">- 서비스 이용안내</a></li>
	                    </ul>
	                </li>
	                <li><a class="titFont">운전자격검증</a>
	                    <ul class="gnb-depth">
	                        <li><a href="">- 운전자격검증</a></li>
	                    </ul>
	                </li>
	                <li><a class="titFont">지자체관리</a>
	                    <ul class="gnb-depth">
	                        <li><a href="">- 사업자 관리</a></li>
	                        <li><a href="${contextPath}/sys/usermanage">- 사용자 관리</a></li>
	                        <li><a href="">- 사업자 정보 갱신 이력</a></li>
	                        <li><a href="">- 차량정보 관리</a></li>
	                    </ul>
	                </li>
	                <li><a class="titFont">대여사업자관리</a>
	                    <ul class="gnb-depth">
	                        <li><a href="">- 기업정보 관리</a></li>
	                        <li><a href="">- 대여정보 조회</a></li>
	                        <li><a href="">- 운전자격 검증이력 조회</a></li>
	                        <li><a href="">- 대여이력 관리</a></li>
	                        <li><a href="">- 대여확인증 발급 이력</a></li>
	                    </ul>
	                </li>
	                <li><a class="titFont">통계</a>
	                    <ul class="gnb-depth">
	                        <li><a href="">- 종합 통계</a></li>
	                        <li><a href="">- 대여사업자 통계</a></li>
	                        <li><a href="">- 대여차량 통계</a></li>
	                        <li><a href="">- 대여이력 통계</a></li>
	                        <li><a href="">- 대여차량 결함 통계</a></li>
	                    </ul>
	                </li>
	                <li><a class="titFont">오픈API</a>
	                    <ul class="gnb-depth">
	                        <li><a href="">- 오픈 API 사용 가이드</a></li>
	                        <li><a href="">- 인증키 현황</a></li>
	                        <li><a href="">- API 목록</a></li>
	                        <li><a href="">- API 이용 현황</a></li>
	                    </ul>
	                </li>
	                <li><a class="titFont">고객지원</a>
	                    <ul class="gnb-depth">
	                        <li><a href="">- 공지사항</a></li>
	                        <li><a href="">- FAQ</a></li>
	                        <li><a href="">- 문의하기</a></li>
	                    </ul>
	                </li> --%>
			</ul>


			<!-- 2. 로그인전 나타나는 영역 시작-->
			<div class="ham_login_wr">
				<%
				// Retrieve data from session
				// If message exists, display it and then remove it from session
				if (authrtCd != null && !authrtCd.isEmpty() && !authrtCd.equals("A01")) {
				%>
				<button class="hr_btn login_btn"
					onClick="location.href='${ contextPath }/ma/logout'">로그아웃
				</button>
				<button class="hr_btn login_btn"
					onClick="location.href='${ contextPath }/ma/myPage'">마이페이지</button>
				<%
				} else {
				%>
				<button class="hr_btn login_btn"
					onClick="location.href='${ contextPath }/ma/login'">로그인</button>
				<button class="hr_btn join_btn"
					onClick="location.href='${ contextPath }/ma/join'">회원가입</button>
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
// Retrieve data from session
// If message exists, display it and then remove it from session
if (authrtCd != null && !authrtCd.isEmpty() && authrtCd.equals("K01")) {
%>

<div class="main">
	<%--             <c:if test="${admstt}"> --%>
	<div class="serverStatusBar wt_box">
		<div class="bar_head">
			<h4>서버 상태</h4>
		</div>
		<div class="bar_cont">
			<ul class="server_list">
				<li class="server_list_item server_list_item1" id="chck1">
					<div class="server_list_item_inner">
						<div class="status_icon_wrap">
							<div class="status_icon"></div>
						</div>
						<p class="server_name">운전자격확인시스템 서버</p>
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
						<p class="server_name">도로교통공단 서버</p>
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
						<p class="server_name">경찰청 서버</p>
						<div class="status">
							<p class="status_text">확인중</p>
						</div>
					</div>
				</li>
			</ul>
			<div class="chart_wrap scrollBar">
				<div id="server_chart"></div>
			</div>
			<div class="server_btn_wrap">
				<a id="transfrom_btn" href="${contextPath}/ma/switchAuthForAdmin"
					aria-label="사용자 전환 페이지로 이동">사용자 전환</a>
			</div>
		</div>
<!-- 		<div class="server_alarm_wrap"> -->
<!-- 			<div class="server_alarm_icon off"> -->
<%-- 				<audio id="sirenAd" src="${contextPath}/audio/siren_01.mp3"></audio> --%>
<!-- 				<div id="if-siren"></div> -->
<!-- 			</div> -->
<!-- 			<div class="switch_wrap"> -->
<!-- 				<p>알림설정</p> -->
<!-- 				<label class="switch" aria-label="서버 상태 알림 설정"> <input -->
<!-- 					type="checkbox"> <span></span> -->
<!-- 				</label> -->
<!-- 			</div> -->
<!-- 		</div> -->
	</div>
	<%--             </c:if> --%>
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