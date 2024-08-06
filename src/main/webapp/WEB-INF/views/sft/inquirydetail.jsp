<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<link rel="stylesheet" type="text/css"
	href="${contextPath}/css/custom/inquiry.css" />

<script src="${contextPath}/js/sft/inquiryDetail.js"></script>

<script>
	var pstSn =
<%=request.getParameter("pstSn")%>
	;
	var Auth = "${Auth}";
	var UserSn = "${UserSn}";
	var UserId = "${UserId}";
	var getUserData = "${getUserData}";
</script>
<style>
.red_btn2{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ff3838;
    width: 45px;
    height: 30px;
    border-radius: 8px;
    font-size: 1.6rem;
    line-height: 13px;
    color: #ffffff;
    font-weight: 300;
    margin-left: -15px;
}
#replyWrite {
	height: 200px;
}

#replyUpdateWrite {
	height: 200px;
}

#inquiryContent {
	height: 400px;
}

#replyWritetr {
	height: 200px;
}

#ReplyShow {
	white-space: pre-line; /* 줄바꿈을 유지하면서 연속 공백 제거 */
	height: 200px;
}

#pstCn {
	white-space: pre-line; /* 줄바꿈을 유지하면서 연속 공백 제거 */
	height: 350px;
}

.inquiry {
	width: 500px;
}

#DeletedpstTtl {
	height: 500px;
}

.button.gray_btn:hover {
	
}
</style>
<!-- <div class="subPage sub03"> -->
<div id="container" style="margin-top: 100px;">
	<div class="wrap" id="noticeDetail">
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
				<li class="current">문의사항</li>
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
			<tr id ="useYnTr">
				<th>공개여부</th>
				<td class="date" id="useYn"></td>
			</tr>
			<tr>
				<th>첨부<br /> 파일
				</th>
				<td colSpan=3>
					<div class="detailFileIco"
						style="cursor: pointer; width: fit-content;">
						<span id="fileSn" style="display: none"></span> <span
							id="InquiryAtchNm"></span> <a class="ico"> </a>
					</div>
				</td>
			</tr>
			<tr>
				<th>문의<br />유형
				</th>
				<td colSpan=3 class="content2" id="inquiryType"></td>
			</tr>
			<tr>
				<th>문의<br />내용
				</th>
				<td colSpan=3 class="content2" id="pstCn"></td>
			</tr>
			<tr id="replyWritetr">
				<th>답변 입력</th>
				<!-- 					<td colspan="3"><label for="inquiryTitle"></label> <input -->
				<!-- 						id="replyWrite" class="input" aria-label="제목"></td> -->
				<td colspan="3"><label for="replyWrite"></label> <textarea
						id="replyWrite" class="input" aria-label="문의내용"
						placeholder="1000자까지 입력 가능합니다." maxlength='1000'
						style="font-size: 18px;"></textarea> <input type="text"
					placeholder="글자 수" id="textLengthCheck3"></td>
				<!-- 					<td>	 -->
				<td>
					<button id="commentSubmitButton" class="yellow_btn2">작성</button>
				</td>
			</tr>
			<tr id="replyUpdate">
				<th scope="col">답변 수정</th>
				<td colspan="3"><label for="replyUpdateWrite"></label> <textarea
						id="replyUpdateWrite" class="input" aria-label="문의내용"
						placeholder="1000자까지 입력 가능합니다." maxlength='1000'
						style="font-size: 18px;"></textarea> <input type="text"
					placeholder="글자 수" id="textLengthCheck2"></td>
				<td style="display: flex;">
					<button id="updateSubmitButton" class="yellow_btn2">수정</button>
				</td>
			</tr>
			<tr id="replyShow2">
				<th>답변<br />내용
				</th>
				<td colSpan=3 class="content2" id="ReplyShow"></td>

				<td style = "display : table-cell;">
					<button style ="margin-bottom : 10px"  id="showSubmitButton" class="yellow_btn2">수정</button>
					<button style = "color : ff3838;" id="commentDeleteButton" class="red_btn2">삭제</button>
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
			<button class='blue_btn' id='inquiryupdateYN' type="submit"
				style="margin-right: 10px" onclick="">수정하기</button>
<!-- 			<button class='blue_btn' id='InquieryuseY' type="submit" -->
<!-- 				style="margin-right: 10px" onclick="">공개하기</button> -->
			<button id='InquirydeleteYn' class="red_btn deleteBtn admin">삭제</button>
		</div>

	</div>
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
			<tr id='inquirySectionForupdate'>
				<th scope="col">문의<br />구분
				</th>
				<td class="input-width">
					<div class="dropdown">
						<label for="inquirySection"></label> <input id="inquirySection">
					</div>
				</td>
			</tr>
			<tr id='showInquirySectionForupdate'>
				<th>문의<br />구분
				</th>
				<td colSpan=3 class="content2" id="inquiryType2"></td>
				<td>
					<button id="showInquirySectionForupdate2" class="yellow_btn2"
						style="margin: 0">수정</button>
				</td>
			</tr>
			<tr>
				<th scope="col" class="lc_name">제목</th>
				<td><label for="inquiryContent"></label> <textarea
						id="inquiryTitle2" class="input" aria-label="제목"
						style="font-size: 18px;"></textarea></td>
			</tr>
			<tr>
				<th scope="col">문의<br />내용
				</th>
				<td colspan="3"><label for="inquiryContent"></label> <textarea
						id="inquiryContent" class="input" aria-label="문의내용"
						placeholder="3500자까지 입력 가능합니다." maxlength='3500'
						style="font-size: 18px;"></textarea> <input type="text"
					placeholder="글자 수" id="textLengthCheck3"></td>
			</tr>
			<tr>
				<th scope="col">파일<br />첨부<span class="asterisk">*</span></th>
				<td>
					<div class="tb_flex filebox"
						style="display: flex; width: fit-content;">
						<textarea id="file" class="input" aria-label="파일이름"></textarea>
						<label for="file" style="display: none">파일첨부</label> <input
							id="file" class="upload-name01 input" style="visibility: hidden;"
							aria-label="파일첨부" readonly> <label for="fileBtn"
							class="file_btn" style="width: 150px;" >파일첨부</label> <input
							type="file" id="fileBtn" accept=".jpg, .jpeg, .png, .pdf, .zip">
					</div>
					<div class="detailFileIco"
						style="cursor: pointer; width: fit-content;">
						<span id="fileSn" style="display: none"></span> <span
							id="InquiryAtchNm"></span> <a class="ico"> </a>
					</div>
				</td>
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
			<button id='cancelinquiry' class="gray_btn cancel_btn"
				style="margin-right: 10px">취소</button>
			<button id="inquiryupdateButton" class="blue_btn"
				style="margin-right: 10px">수정</button>
		</div>
	</div>
	<div class="wrap" id="deletedOne">
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
				<li class="current">문의사항</li>
			</ul>
		</div>

		<table class="boardTbl">
			<tr>
				<th>안내</th>
				<td colSpan=3 id="DeletedpstTtl"></td>
			</tr>
			<tr>
				<td class="prevNext">▲ 이전</td>
				<td colSpan=3 class="point" id="DeletedprevPstTtl"></td>
				<td id="DeletedprevPstSn" style="display: none"></td>
			</tr>
			<tr>
				<td class="prevNext">▼ 다음</td>
				<td colSpan=3 class="point" id="DeletednextPstTtl"></td>
				<td id="DeletednextPstSn" style="display: none"></td>
			</tr>
		</table>
		<div class="btn_flex">
			<button class='gray_btn cancel_btn userPagePopupClose'
				id='listbutton2' type="submit" style="margin-right: 10px"
				value="Cancel" onclick="">목록</button>
		</div>
	</div>


	<div class="wrap inquiryEnroll" id="checkWriter"
		style="display: none; height: 250px;">
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
				<th scope="col" class="lc_name">비밀번호 <br />확인
				</th>
				<td><label for="CheckPswd"></label> <input id="CheckPswd"
					class="input" aria-label="비밀번호 확인"></td>
			</tr>
		</table>

		<div class="btn_flex">
			<button id='cancelinquiry2' class="gray_btn cancel_btn"
				style="margin-right: 10px">취소</button>
			<button class="blue_btn insertBtn" style="margin-right: 10px">수정</button>
		</div>
	</div>

</div>


