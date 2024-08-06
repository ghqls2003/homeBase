<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/inquiry.css" />
<script>
		var Auth = "<c:out value='${authrtCd}'/>";
</script>
<style>
#inquiryContent {
	height: 400px;
}

#file2 {
	width: 100%;
	height: 40px;
	background-color: #fff;
	border: 1px solid #DBE0EC;
	border-radius: 8px;
	padding-left: 19px;
	font-size: 1.6rem;
}
</style>
<script src="${contextPath}/js/sft/inquiry.js"></script>

<%-- <input type="hidden" id="inquirySn" value="${inquiry}"> --%>
<div class="subPage sub03">
	<div id="container">
		<div class="wrap" id="notice">
			<div class="titBox">
				<div class="tit01">
					<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘"
						class="ico_tit">
					<h2><c:out value='${tableName}'/></h2>
				</div>
				<ul class="tit02">
					<li class="home"><img
						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li>고객지원</li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li class="current"><c:out value='${tableName}' /></li>
				</ul>
			</div>

			<div class="search_top">
				<div class="selec_wr">
					<div class="mo_flex">
						<div class="year_picker">
							<ul class="selec_box">

								<li class="li_slec">
									<div class="dropdown">
										<label for="search_stts_cd"></label> <input
											id="search_stts_cd3">
									</div>
								</li>
							</ul>
							<ul class="selec_box">

								<li class="li_slec">
									<div class="dropdown">
										<label for="search_stts_cd"></label> <input
											id="search_stts_cd">
									</div>
								</li>
							</ul>
						</div>

						<ul class="selec_box">
							<li class="li_slec" style="display: flex"><label
								for="searchWrd" style="width: 0px; align-self: center;"></label>
								<input type="text" id="searchWrd" class="searchWrd input"
								placeholder="키워드를 입력하세요."></li>
						</ul>
					</div>
					<button class="yellow_btn" id="searchBtn">
						조회<img src="${contextPath}/images/sub/ico_search02.png"
							alt="검색아이콘">
					</button>
				</div>
			</div>

			<div class="contBox lastBox02">
				<div class="nameBox nameBox-flex">
					<h4 class="name">문의하기</h4>
				</div>
				<table id="grid">
					<caption>문의하기 목록</caption>
				</table>
			</div>
			<div class="btn_flex">
				<button id="openPopup" class="blue_btn writeBtn" style="margin: 0">등록하기</button>
			</div>
		</div>

		<div class="wrap" id="noticeDetail" style="display: none">
			<div class="titBox">
				<div class="tit01" style="cursor: pointer;">
					<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘"
						class="ico_tit">
					<h2>문의하기</h2>
				</div>
				<ul class="tit02">
					<li class="home"><img
						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li>고객지원</li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li class="current2">문의하기</li>
				</ul>
			</div>
			<table class="boardTbl">
				<tr>
					<th>제목</th>
					<td colSpan=3 id="pstTtl"></td>
				</tr>
				<tr>
					<th>작성일</th>
					<td class="date" id="regDt"></td>

					<th class="viewNum">조회수</th>
					<td id="inqCnt"></td>
				</tr>
				<tr>
					<th>첨부 파일</th>
					<td colSpan=3>
						<div class="detailFileIco"
							style="cursor: pointer; width: fit-content;">
							<span id="fileSn" style="display: none"></span> <span
								id="InquiryAtchNm"></span> <a class="ico"> </a>
						</div>
					</td>
				</tr>
				<tr>
					<th>문의사항</th>
					<td colSpan=3 class="content2" id="pstCn"></td>
				</tr>
				<!-- <tr>
					<th>문의 답변</th>
					<td colspan="3" class="content" id="pstCn"></td>
				</tr> -->
				<%
				// Retrieve data from session
				String authrtCd = (String) session.getAttribute("authrtCd");

				// If message exists, display it and then remove it from session
				if (authrtCd == "") {
				%>
				<tr>
					<th>답글 입력</th>
					<td colspan="3"><label for="inquiryTitle"></label> <input
						id="replyWrite" class="input" aria-label="제목"></td>
					<td>
						<button id="commentSubmitButton" class="yellow_btn2">작성</button>
					</td>
				</tr>
				<%
				} else {
				%>

				<%
				}
				%>
				<tr>
					<th>답글 보기</th>
					<td colspan="3">
						<table id="replygrid">
							<caption>문의하기 목록</caption>
						</table>
					</td>
				</tr>
				<tr>
					<td class="prevNext">▲ 이전</td>
					<td colSpan=3 class="point" id="prevPstTtl"></td>
					<td id="prevPstSn" style="display: none"></td>
				</tr>
				<tr>
					<td class="prevNext">▼ 다음</td>
					<td colSpan=3 class="point" id="nextPstTtl"></td>
					<td id="nextPstSn" style="display: none"></td>
				</tr>
			</table>
			<div class="btn_flex">
				<button class='gray_btn cancel_btn userPagePopupClose'
					id='listbutton' type="submit" style="margin-right: 10px"
					value="Cancel" onclick="">목록</button>
			</div>
		</div>
		<!-- 		<div class="wrap" id="noticeInsert" style="display: none"> -->
		<!-- 			<div class="titBox"> -->
		<!-- 				<div class="tit01"> -->
		<%-- 					<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" --%>
		<!-- 						class="ico_tit"> -->
		<!-- 					<h2>공지사항</h2> -->
		<!-- 				</div> -->
		<!-- 				<ul class="tit02"> -->
		<!-- 					<li class="home"><img -->
		<%-- 						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li> --%>
		<!-- 					<li class="mid"><img -->
		<%-- 						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li> --%>
		<!-- 					<li>고객지원</li> -->
		<!-- 					<li class="mid"><img -->
		<%-- 						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li> --%>
		<!-- 					<li class="current">공지사항</li> -->
		<!-- 				</ul> -->
		<!-- 			</div> -->

		<!-- 			<table class="boardTbl"> -->
		<!-- 				<tr> -->
		<!-- 					<th>제목</th> -->
		<!-- 					<td colSpan=3><label for="title" style="display: none">제목</label> -->
		<!-- 						<input id="title" class="input" aria-label="제목" maxlength='200'></td> -->
		<!-- 				</tr> -->
		<!-- 				<tr> -->
		<!-- 					<th>작성자</th> -->
		<!-- 					<td class="date"><label for="writer" style="display: none">작성자</label> -->
		<!-- 						<input id="writer" class="input no_line" aria-label="작성자" -->
		<!-- 						placeholder="3500자까지 입력 가능합니다." maxlength='3500' readonly></td> -->
		<!-- 				</tr> -->
		<!-- 				<tr> -->
		<!-- 					<th>첨부 파일</th> -->
		<!-- 					<td colSpan=3> -->
		<!-- 						<div class="tb_flex filebox" style="display: flex"> -->
		<!-- 							<label for="file" style="display: none">파일첨부</label> <input -->
		<!-- 								id="file" class="upload-name01 input" aria-label="파일첨부" readonly> -->
		<!-- 							<label for="fileBtn" class="file_btn">파일첨부</label> <input -->
		<!-- 								type="file" id="fileBtn"> -->
		<!-- 						</div> -->
		<!-- 					</td> -->
		<!-- 				</tr> -->

		<!-- 				<tr> -->
		<!-- 					<th>문의<br />내용 -->
		<!-- 					</th> -->
		<!-- 					<td colSpan=3 class="content"><label for="content" -->
		<!-- 						style="display: none">내용</label> <textarea name="note" -->
		<!-- 							id="content" cols="30" rows="10" class="noteBox input" -->
		<!-- 							style="height: fit-content;"></textarea></td> -->
		<!-- 				</tr> -->

		<!-- 			</table> -->

		<!-- 			<div class="btn_flex"> -->
		<!-- 				<button class="blue_btn insertBtn">등록</button> -->
		<!-- 				<button class="gray_btn cancel_btn">취소</button> -->
		<!-- 			</div> -->
		<!-- 		</div> -->

		<div class="wrap inquiryEnroll" id="inquiryEnroll"
			style="display: none">
			<div class="titBox">
				<div class="tit01">
					<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘"
						class="ico_tit">
					<h2>문의하기</h2>
				</div>
				<ul class="tit02">
					<li class="home"><img
						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li>고객지원</li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li class="current">문의하기</li>
				</ul>
			</div>

			<table class="boardTbl">
				<caption>문의하기</caption>
				<tr>
					<th scope="col">문의구분</th>
					<td class="input-width">
						<div class="dropdown">
							<label for="inquirySection"></label> <input id="inquirySection">
						</div>
					</td>
				</tr>
<!-- 				<tr> -->
<!-- 					<th scope="col">공개여부</th> -->
<!-- 					<td class="input-width"> -->
<!-- 						<div class="dropdown"> -->
<!-- 							<label for="inquirySection"></label> <input id="privateSection"> -->
<!-- 						</div> -->
<!-- 					</td> -->
<!-- 				</tr> -->
				<tr>
					<th scope="col" class="lc_name">제목</th>
					<td><label for="inquiryTitle"></label> <input
						id="inquiryTitle" class="input" aria-label="제목"></td>
				</tr>
				<tr>
					<th scope="col">문의내용</th>
					<td colspan="3"><label for="inquiryContent"></label> <textarea
							id="inquiryContent" class="input" aria-label="문의내용"
							placeholder="3500자까지 입력 가능합니다." maxlength='3500'
							style="font-size: 18px;"></textarea> <input type="text"
						placeholder="글자 수" id="textLengthCheck3"></td>
				</tr>
				<tr>
					<th scope="col">비밀번호</th>
					<td><label for="inquiryPswd"></label> <input
						placeholder="비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자($제외)를 모두 포함해야 합니다."
						id="inquiryPswd" class="input" aria-label="비밀번호"></td>
				</tr>
				<tr>
					<th>첨부 파일</th>
					<td colSpan=3>
						<div class="tb_flex filebox" style="display: flex">
							<label for="file" style="display: none">파일첨부</label>
							<!--   							<input id="file" class="upload-name01 input" aria-label="파일첨부" readonly> -->
							<span id="file2"></span> <label for="fileBtn" class="file_btn">파일첨부</label>
							<input type="file" id="fileBtn" accept=".jpg, .jpeg, .png, .pdf, .zip">
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="2" class="separate-row">
						<div class="privacy-info">
							<div class="privacy-info-text privacy-info-text-layer"
								style="text-align: center;">
								<div class="privacy-info-text2" style="text-align: left;">
									<p>개인정보 수집 및 이용목적</p>
									<p>수집된 개인정보는 고객제안의 원활한 행정처리 용도로만 사용됩니다.</p>
									<p>개인정보 수집범위</p>
									<p>필수정보: 성명, 연락처</p>
									<p>※ 개인정보 수집동의를 거부할 권리는 있으나 서비스 이용에 제한이 있을 수 있습니다.</p>
									<p>개인정보 보유기간: 게시물 삭제 후 5년</p>
								</div>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<div class="privacy-info-agree">
							<input type="checkbox" id="privacyAgreement"
								aria-label="개인정보 보호법에 의거한 업무 처리를 위한 개인정보 사용 동의"> <span
								id="privacyAgreementText">개인정보 보호법에 의거한 업무 처리를 위한 개인정보 사용
								동의</span>
						</div>
					</td>
				</tr>
			</table>

			<div class="btn_flex">
				<button class="blue_btn insertBtn">등록</button>
				<button class="gray_btn cancel_btn">취소</button>
			</div>
		</div>

		<!--  -->

	</div>
</div>

