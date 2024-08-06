<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/notice.css" />

<script src="${contextPath}/js/sft/noticeDetail.js"></script>

<script>
    var pstSn = <%=request.getParameter("pstSn")%>;
    var authrtCd = "<%=session.getAttribute("authrtCd")%>";
</script>

<div class="subPage sub03">
	<div id="container">
	    <div class="wrap" id="noticeDetail">
	        <div class="titBox">
	            <div class="tit01">
	                <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
	                <h2>공지사항</h2>
	            </div>
	            <ul class="tit02">
	                <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li>고객지원</li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li class="current">공지사항</li>
	            </ul>
	        </div>

            <table class="boardTbl">
            	<tr>
                    <th>제목</th>
                    <td colSpan=3 id="pstTtl" class="detail"></td>

                    <td colSpan=3 class="edit">
                    	<label for="title" style="display:none">제목</label>
                        <input id="title" class="input" aria-label="제목" >
                    </td>
                </tr>
                <tr>
                    <th>작성일</th>
                    <td class="date" id="regDt"></td>

                    <th class="viewNum">조회수</th>
                    <td id="inqCnt"></td>
                </tr>
                <tr id = useYnTr>
                    <th>공개여부</th>
                    <td class="date" id="useYn"></td>
                </tr>
                <tr>
				<th>첨부 파일</th>
					<td colSpan=3 class="detail">
						<div class="detailFileIco" style="cursor: pointer; width: fit-content;">
	                    	<span id="fileSn" style="display:none"></span>
	                    	<span id="atchFileNm"></span>
	                    	<a class="ico">
	                  		</a>
	                  	</div>
	              	</td>

	              	<td colSpan=3 class="edit">
						<div class="tb_flex filebox" style="display:flex">
                            <label for="file" style="display:none">파일첨부</label>
                            <input id="file" class="upload-name01 input" aria-label="파일첨부" readonly>

                            <label for="fileBtn" class="file_btn">파일첨부</label>
                            <input type="file" id="fileBtn" accept=".jpg, .jpeg, .png, .pdf, .zip">
                        </div>
	              	</td>
	          	</tr>
	          	<tr>
                    <th>공지<br/>내용</th>
                    <td colSpan=3 class="content detail">
                    	<pre id="pstCn" style="font-family: 'Pretendard'; color: #787878; word-break: break-all; white-space: pre-wrap;"></pre>
                    </td>

                    <td colSpan=3 class="content edit">
                    	<label for="content" style="display:none">내용</label>
                        <textarea name="note" id="content" cols="30" rows="10" class="noteBox input" style="height: 100%; width: 180%"></textarea>
                    </td>
                </tr>

                <tr>
                    <td class="prevNext">▲ 이전</td>
                    <td colSpan=3 class="point" id="prevPstTtl"></td>
                    <td id="prevPstSn" style="display:none"></td>
                </tr>
                <tr>
                    <td class="prevNext">▼ 다음</td>
                    <td colSpan=3 class="point" id="nextPstTtl"></td>
                    <td id="nextPstSn" style="display:none"></td>
                </tr>
            </table>

            <div class="btn_flex">
            	<button class="blue_btn update_btn" style="display:none">수정</button>
            	<button class="blue_btn delete_btn" style="display:none">삭제</button>
            	<button class="gray_btn cancel_btn">목록</button>
            </div>
	    </div>
    </div>
</div>
