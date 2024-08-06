<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<link rel="stylesheet" type="text/css"
	href="${contextPath}/css/custom/notice.css" />

<script src="${contextPath}/js/sft/faq.js"></script>

<style>
/* @media ( max-width :920px) { */
/* 	.detail-template { */
/* 		width: 100%; */
/* 		word-wrap: break-word; */
/* 		white-space: normal; */
/* 		text-align: left; */
/* 	} */
/* } */
/* .k-hierarchy-cell, k-hierarchy-cell k-header { */
/* 	width: 10px; */
/* } */

/*  #detailTable td {  */
/* 	white-space: break-spaces; */
/* 	word-wrap: break-word; */
/*  	width : 780px;  */
/* } */

/* #detailTitle { */
/* 	width: 10%; */
/* } */
/* .details { */
/*     width: 500px; /* 원하는 너비로 조정하세요 */ */
/* } */

/* #detailcnt { */
/* 	width: 90%; */
/* } */

/* #detailFileNm { */
/* 	width: 90%; */
/* } */

/* #detailcntFileSn { */
/* 	display: none; */
/* } */

/* #detailTitle { */
/* 	width: 70px; */
/* 	height: 45px; */
/* 	font-size: 1.5rem; */
/* 	font-weight: bold; */
/* 	white-space: break-spaces; */
/* } */
</style>

<div class="subPage sub03">
	<div id="container">
		<div class="wrap" id="notice">
			<div class="titBox">
				<div class="tit01">
					<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘"
						class="ico_tit">
					<h2>
						<c:out value='${tableName}' />
					</h2>
				</div>
				<ul class="tit02">
					<li class="home"><img
						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li>고객지원</li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li class="current">자주 묻는 질문(FAQ)</li>
				</ul>
			</div>

			<div class="search_top">
				<div class="selec_wr">
					<div class="mo_flex">
						<ul class="selec_box">
							<li class="li_slec" style="display: flex"><label
								for="searchWrd" style="width: 50px; align-self: center;">제목</label>
								<input type="text" id="searchWrd" class="searchWrd input"
								placeholder="제목을 입력하세요."></li>
						</ul>
					</div>
					<button class="yellow_btn" id="searchBtn">
						검색<img src="${contextPath}/images/sub/ico_search02.png"
							alt="검색아이콘">
					</button>
				</div>
			</div>

			<div class="contBox lastBox02">
				<div class="nameBox nameBox-flex">
					<h4 class="name">FAQ</h4>
				</div>
				<table id="grid">
					<caption>FAQ 목록</caption>
				</table>
			</div>
		</div>
	</div>
</div>
<script id="detail-template" type="text/x-kendo-template">
    <div class='detail-template'>
<tr role="row" class="k-detail-row k-alt" aria-rowindex="13">
<td role="gridcell" class="k-hierarchy-cell"><p>내용</p></td>
<td role="gridcell" class="k-detail-cell" colspan="4">
    <div class="detail-template">
        <p>#= pst_cn != null ? pst_cn : '-' #</p>
    </div>
</td>
</tr>
<tr role="row" class="k-detail-row k-alt" aria-rowindex="13">
<td role="gridcell" class="k-hierarchy-cell"><p>첨부파일</p></td>
<td role="gridcell" class="k-detail-cell" colspan="4">
    <div class="detail-template">
    </div>
</td>
</tr>
</script>


