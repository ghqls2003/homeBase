<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/sys/cmmnCd.js"></script>

<link rel="stylesheet" type="text/css" href="${contextPath}/css/style_op.css" />



<style>
.adm_sub .popup .adm_select {
    width: 100% !important;
}

.header .gnb-wr .gnb:hover > li .depth-wr {  height: 100%;}
.header .gnb-wr .gnb > li:nth-child(1) .depth-wr { margin-left: -767px; }
.header .gnb-wr .gnb > li:nth-child(2) .depth-wr { margin-left: -511px; }
.header .gnb-wr .gnb > li:nth-child(3) .depth-wr { margin-left: -256px; }
.header .gnb-wr .gnb > li:nth-child(4) .depth-wr { margin-left: 1px; }
.header .gnb-wr .gnb > li:nth-child(5) .depth-wr { margin-left: 256px;}
.header .gnb-wr .gnb > li:nth-child(6) .depth-wr{margin-left: 511px;}
.header .gnb-wr .gnb > li:nth-child(7) .depth-wr{margin-left: 766px;}
.header .gnb-wr .gnb > li .depth-wr > li { line-height: 1; }

</style>

<div class="adm_sub">
	<!-- 콘텐츠 시작 -->
	<div id="container">
	    <div class="adm_wrap">
	        <div class="tit_line">
	            <div class="adm_tit">
	                <img src="${contextPath}/images/adm/adm_tit.png" alt="타이틀아이콘" class="tit_icon">
	             <h2><c:out value='${tableName}'/></h2>
	            </div>
	            <ul class="arrow_tit">
	                <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li>시스템 관리</li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li class="current">공통코드 관리</li>
	            </ul>
	        </div>

	        <div class="content">
                <ul class="searchBox">
                    <li>
                        <label for="searchCol"></label>
                        <input id="searchCol">
                    </li>
                    <li>
                        <label for="searchWrd" class="adm_label">검색조건입력</label>
                        <input type="text" class="adm_input" id="searchWrd" placeholder="검색조건을 입력하세요.">
                    </li>
                    <li>
                        <label for="searchUseYn"></label>
                        <input id="searchUseYn" class="useYn">
                    </li>
                    <li><button class="search_btn">검색 <img src="${contextPath}/images/adm/ico_search.png" alt="검색"></button></li>
                </ul>
            </div>

            <div class="adm_box">
				<div class="box_tit flex">
                    <h3>공통코드 관리 목록</h3>
                    <button class="exel_down excelDownBtn">
                        <img src="${contextPath}/images/adm/ico_excel.png" alt="엑셀다운"> 엑셀
                    </button>
                </div>
                <div class="grid_wr">
                    <div class="grid_wr">
                    <table id="grid">
                        <caption>공통코드 조회</caption>
                    </table>
                </div>
                </div>
            </div>

            <div class="btn_flex">
                <button class="blue_btn adm_btn">등록</button>
            </div>
		</div>
	</div>

	<!-- 등록 팝업 -->
	<div class="popup register_popup cmn_pop">
	    <div class="box">
	    	<div class="popup_top">
	        	<h4>공통코드 등록</h4>
		        <div class="close">
			        <span></span>
			        <span></span>
		        </div>
	    	</div>

	      	<div class="content">
	            <div class="tb_wr">
					<table class="tb rental_tb01">
						<caption>공통코드 등록</caption>
                        <tr>
                            <th scope="col"><label for="insertCd">코드</label><span class="asterisk">*</span></th>
                            <td>
                        		<input type="text" id="insertCd" name="insertCd" maxLength="30" class="adm_input" aria-label="코드"/>
                            </td>
                        </tr>
                        <tr>
							<th scope="col"><label for="insertCdNm">코드명</label></th>
							<td>
								<input type="text" id="insertCdNm" name="insertCdNm" maxLength="100" class="adm_input cdNm_input" aria-label="코드명"/>
                            </td>
                        </tr>
                        <tr>
                             <th scope="col"><label for="insertCdGroup">그룹코드</label><span class="asterisk">*</span></th>
                             <td>
                             	<input type="text" id="insertCdGroup" name="insertCdGroup" maxLength="30" class="adm_input read_input" aria-label="그룹코드" readOnly/>
                             </td>
                        </tr>
                        <tr>
							<th scope="col"><label for="insertCdGroupNm">그룹명</label><span class="asterisk">*</span></th>
                            <td>
                             	<input type="text" id="insertCdGroupNm" name="insertCdGroupNm" class="cdGroupNm adm_select" maxLength="100" aria-label="그룹명"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="col"><label for="insertCdExpln">설명</label></th>
                            <td>
								<textarea id="insertCdExpln" name="insertCdExpln" cols="30" rows="5" maxLength="1000" class="adm_txtarea" aria-label="설명"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th scope="col"><label for="insertSortOrdr">정렬순서</label></th>
                            <td>
                            	<input type="number" id="insertSortOrdr" name="sortOrdr" min="1" max="10000" class="adm_input" aria-label="정렬순서"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="col"><label for="insertUseYn">사용여부</label><span class="asterisk">*</span></th>
                            <td>
                            	<input type="text" id="insertUseYn" name="insertUseYn" class="useYn adm_select" maxLength="1" aria-label="사용유무"/>
                            </td>
						</tr>
					</table>
				</div>
			</div>
			<div class="btn_flex">
             	<button class="blue_btn insert_btn">등록</button>
              	<button class="gray_btn cancel_btn">취소</button>
            </div>
		</div>
	</div>

	<!-- 상세 팝업 -->
	<div class="popup detail_popup cmn_pop">
	    <div class="box">
	    	<div class="popup_top">
	        	<h4>공통코드 상세</h4>
		        <div class="close">
			        <span></span>
			        <span></span>
		        </div>
	    	</div>

	      	<div class="content">
	            <div class="tb_wr">
                     <table class="popup_tb">
                     	<caption>공통코드 상세</caption>
                        <tr>
                        	<th scope="col"><label for="cd">코드</label></th>
                            <td>
                                <input type="text" id="cd" name="cd" maxLength="30" class="adm_input read_input" aria-label="코드" readOnly/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="col"><label for="cdNm">코드명</label></th>
                            <td>
                                <input type="text" id="cdNm" name="cdNm" maxLength="100" class="adm_input cdNm_input" aria-label="코드명"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="col"><label for="cdGroup">그룹코드</label></th>
                            <td>
                                <input type="text" id="cdGroup" name="cdGroup" maxLength="30" class="adm_input read_input" aria-label="그룹코드" readOnly/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="col"><label for="cdGroupNm">그룹명</label></th>
                            <td>
                                <input type="text" id="cdGroupNm" name="cdGroupNm" class="cdGroupNm adm_select" maxLength="100" aria-label="그룹명"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="col"><label for="cdExpln">설명</label></th>
                            <td class="textarea_wr">
                                <textarea id="cdExpln" name="cdExpln" cols="30" rows="5" maxLength="1000" class="adm_txtarea" aria-label="설명"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th scope="col"><label for="sortOrdr">정렬순서</label></th>
                            <td>
                                <input type="number" id="sortOrdr" name="sortOrdr" min="1" max="10000" class="adm_input" aria-label="정렬순서"/>
                            </td>
                        </tr>
                        <tr>
                            <th scope="col"><label for="useYn">사용여부</label></th>
                            <td>
                                <input type="text" id="useYn" name="useYn" class="useYn adm_select" maxLength="1" aria-label="사용유무"/>
                            </td>
                        </tr>
                    </table>
				</div>
			</div>

			<div class="btn_flex">
             	<button class="blue_btn update_btn">수정</button>
             	<button class="lt_gray_btn delete_btn">삭제</button>
              	<button class="gray_btn cancel_btn">취소</button>
			</div>
		</div>
	</div>
</div>