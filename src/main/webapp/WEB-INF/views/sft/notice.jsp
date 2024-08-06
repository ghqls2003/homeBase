<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/notice.css" />

<script src="${contextPath}/js/sft/notice.js"></script>
<%-- <input type="hidden" id="noticeSt" value="${notice}"> --%>

<script>
	var authrtCd        = "${authrtCd}";
</script>

<div class="subPage sub03">
	<div id="container">
		<div class="wrap" id="notice">
	        <div class="titBox">
	            <div class="tit01">
	                <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
	               <h2><c:out value='${tableName}'/></h2>
	            </div>
	            <ul class="tit02">
	                <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li>고객지원</li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li class="current">공지사항</li>
	            </ul>
	        </div>

	        <div class="search_top">
                <div class="selec_wr">
                    <div class="mo_flex">
                    	<div class="year_picker">
                            <ul class="yearBox">
                                <li class="mo_li">
                                    <label for="start-picker01">시작기간</label>
                                    <input id="start-picker01" title="datepicker" class="datepicker"
                                        aria-label="시작기간검색">
                                </li>
                                <li class="bar">-</li>
                                <li class="mo_li">
                                    <label for="end-picker01">종료기간</label>
                                    <input id="end-picker01" title="datepicker" class="datepicker"
                                        aria-label="종료기간검색">
                                </li>
                            </ul>
                        </div>
                        <ul class="selec_box">
                            <li class="li_slec" style="display:flex">
	                            <label for="searchWrd" style="width: 50px; align-self: center; margin-left: 10px;">제목</label>
	                            <input type="text" id="searchWrd" class="searchWrd input" placeholder="제목을 입력하세요.">
	                            <%
	                            	String name=(String)session.getAttribute("SSO_NAME");
								%>
                            </li>
                        </ul>
                    </div>
                    <button class="yellow_btn" id="searchBtn">
                        검색<img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘">
                    </button>
                </div>
            </div>

            <div class="contBox lastBox02">
                <div class="nameBox nameBox-flex">
                    <h4 class="name">공지사항</h4>
                </div>
                <table id="grid">
                    <caption>공지사항 목록</caption>
                </table>
            </div>
	    </div>

	    <div class="wrap" id="noticeInsert" style="display:none">
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
                    <td>
                    	<label for="title" style="display:none">제목</label>
                        <input id="title" class="input" aria-label="제목" >
                    </td>
                </tr>
                <tr>
                    <th>작성자</th>
                    <td class="date">
                    	<label for="writer" style="display:none">작성자</label>
                        <input id="writer" class="input no_line" value="<%=name %>" aria-label="작성자" readonly>
                    </td>
                </tr>
                <tr>
				<th>첨부 파일</th>
					<td>
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
                    <td class="content">
                    	<label for="content" style="display:none">내용</label>
                        <textarea name="note" id="content" cols="30" rows="10" class="noteBox input" style="height: fit-content;"></textarea>
                    </td>
                </tr>
            </table>

            <div class="btn_flex">
	            <button class="blue_btn insertBtn">등록</button>
	            <button class="gray_btn cancel_btn">취소</button>
	        </div>
	    </div>
    </div>
</div>
