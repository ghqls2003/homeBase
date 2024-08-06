<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<link rel="stylesheet" type="text/css"
	href="${contextPath}/css/custom/search.css" />
<script type="text/javascript">
	var Search_Header = "${Search}";
	var guestSearch = '${guestSearch}' === 'true'
	// 	var auth = '${auth}'
</script>

<style>
@media ( max-width : 1500px) .li_slecsearch {
	min-width
	
	
	
	
	
	
	:
	
	
	
	 
	
	
	
	100
	
	
	
	
	
	
	%;
	visibility
	
	
	
	
	
	
	:
	
	
	
	 
	
	
	
	visible
	
	
	
	
	
	
	;
	display
	
	
	
	
	
	
	:
	
	
	
	 
	
	
	
	flex
	
	
	
	
	
	
	;
}

#hDetail {
	white-space: break-spaces;
}

#contentAll {
	width: 80%
}

#menuContainer {
	cursor: pointer;
}

#menuContainer {
	padding: 42px 44px 25px;
}

.content-container {
	white-space: normal;
	word-break: break-all;
}

/* @media (max-width: 1500px) */
/* .content2 { */
/*  	min-width: 480px;  */
/* 	max-width: 1400px; */
/* } */
</style>
<script src="${contextPath}/js/ma/Search.js"></script>

<%-- <input type="hidden" id="inquirySn" value="${inquiry}"> --%>
<div class="subPage sub03">
	<div id="container">
		<div class="wrap" id="notice">
			<div class="titBox">
				<div class="tit01">
					<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘"
						class="ico_tit">
					<h2>통합조회</h2>
				</div>
				<ul class="tit02">
					<li class="home"><img
						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li>통합조회</li>
				</ul>
			</div>

			<div class="search_top">
				<div class="selec_wr">
					<div class="mo_flex">
						<div class="year_picker">
							<ul class="selec_box">
								<li class="li_slec">
									<div class="dropdown">
										<label for="search_stts_cd"></label><input id="search_stts_cd">
									</div>
								</li>
							</ul>
						</div>
						<ul class="selec_box">
							<li class="li_slec" style="display: flex"><label
								for="searchKeyWrd"
								style="width: 0px; align-self: center; margin-left: 10px;"></label>
								<input type="text" id="searchKeyWrd" class="searchWrd input"
								placeholder="키워드을 입력하세요."></li>
						</ul>
					</div>
					<button class="yellow_btn" id="searchBtn">
						조회<img src="${contextPath}/images/sub/ico_search02.png"
							alt="조회아이콘">
					</button>
				</div>
			</div>
			<div class="contBox lastBox02" id="highlight">

				<%
				Boolean guestSearch = (Boolean) request.getAttribute("guestSearch");
				if (guestSearch != null && guestSearch == true) {
				%>
				<div class="contBox lastBox02">
					<div class="nameBox nameBox-flex">
						<h4 class="name">공지사항</h4>
					</div>
					<table id="noticeList">
						<caption>통합조회 목록</caption>
					</table>
				</div>
				<div class="contBox lastBox02">
					<div class="nameBox nameBox-flex">
						<h4 class="name">FAQ</h4>
					</div>
					<table id="FaqList">
						<caption>통합조회 목록</caption>
					</table>
				</div>
				<%
				} else {
				%>
				<div class="contBox" id='menuShow'>
					<div class="nameBox nameBox-flex">
						<h4 class="name">메뉴</h4>
					</div>
					<div id="menuContainer"></div>
				</div>
				<div class="contBox lastBox02" id='inquiryShow'>
					<div class="nameBox nameBox-flex">
						<h4 class="name">문의사항</h4>
					</div>
					<table id="inquiryList">
						<caption>통합조회 목록</caption>
					</table>
				</div>
				<div class="contBox lastBox02">
					<div class="nameBox nameBox-flex">
						<h4 class="name">공지사항</h4>
					</div>
					<table id="noticeList">
						<caption>통합조회 목록</caption>
					</table>
				</div>

				<div class="contBox lastBox02">
					<div class="nameBox nameBox-flex">
						<h4 class="name">FAQ</h4>
					</div>
					<table id="FaqList">
						<caption>통합조회 목록</caption>
					</table>
				</div>
				<%
				}
				%>
			</div>

		</div>
	</div>
</div>

