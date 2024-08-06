<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/sys/permManage.js"></script>

<style>

@media (max-width: 420px) {
	button.blue_btn {
	    width: 80px;
	}

	button.gray_btn {
	    width: 80px;
	}
}

</style>

<div class="subPage sub03">
	<!-- 콘텐츠 시작 -->
	<div id="container">
	    <div class="wrap">
	        <div class="titBox">
	            <div class="tit01">
	                <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
	              <h2><c:out value='${tableName}'/></h2>
	            </div>
	            <ul class="tit02">
	                <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li>시스템 관리</li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li class="current">권한 관리</li>
	            </ul>
	        </div>

	        <!-- 조회 조건 (시작) -->
			<div class="search_top">
			<form action="#" name="searchForm" id="searchForm" method="post">
				<input type="hidden" id="elxExcelDownReason" name="excelDownReason" />
				<input type="hidden" class="_csrf" name="${_csrf.parameterName}" value="${_csrf.token}" />
		            <div class="selec_wr">
		                <div class="mo_flex">
							<ul class="selec_box">
	                            <li class="li_slec">
	                                <label for="searchCol1" style="display: none">검색조건(선택)</label>
	                                <input type="text" id="searchCol1" class="searchCol1" aria-label="검색조건(선택)" placeholder="검색조건(선택)" />
	                            </li>
	                        </ul>
	                        <ul class="selec_box">
	                            <li class="li_slec">
	                                <label for="searchCol2" style="display: none">검색조건(선택)</label>
	                                <input type="text" id="searchCol2" class="searchCol2" aria-label="검색조건(선택)" placeholder="검색조건(선택)" />
	                            </li>
	                        </ul>
							<ul class="selec_box">
								<li class="li_slec">
									<label for="searchWrd"></label>
			                         <input id="searchWrd" class="input" aria-label="검색어를 입력하세요" placeholder="검색어를 입력하세요" oninput="charOnly(this)">
								</li>
				           	</ul>
		                </div>
		                <button type="button" class="yellow_btn searchBtn" >
		                    검색
		                    <img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘"/>
		                </button>
		            </div>
	            </form>
             </div>
			<!-- 조회 조건 (끝) -->

            <div class="contBox lastBox02">
                <div class="nameBox nameBox-flex">
                    <h4 class="name">권한 관리</h4>
                    <button class="download-btn excelDownBtn">
                        <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">
                        엑셀
                    </button>
                </div>

                <table id="permGrid">
                    <caption>권한 관리</caption>
                </table>

            </div>

			<div class="btn_flex">
                <button class="blue_btn register_btn">등록</button>
            </div>

            <!-- 권한 관리 등록 팝업 -->
            <div class="popup register_popup popup_type02">
	            <div class="box">
	                <div class="popup_top">
	                    <h4>권한 관리 등록</h4>
	                    <div class="close">
	                        <span></span>
	                        <span></span>
	                    </div>
	                </div>
	                <div class="content">
	                	<div class="scrollBar02">
	                        <div class="info_wr">
	                            <div class="contBox">
	                                <div class="nameBox nameBox-flex">
	                                    <h4 class="name">권한 관리 등록</h4>
	                                </div>
	                                <div class="cont cont-flex">
	                                    <table class="tb rental_tb01">
<!-- 	                                    	<tr> -->
<!-- 	                                            <td> -->
<!-- 	                                                <label for="authrt_memu">메뉴</label> -->
<!-- 	                                                <div class="treeBox"> -->
<!-- 														<ul class="treeTabs"> -->
<!-- 															<li style="padding: 10px;"> -->
<!-- 																<a id="tab_memu1">포털</a> -->
<!-- 																<a id="tab_memu2">운영</a> -->
<!-- 															</li> -->
<!-- 														</ul> -->
<!-- 														<div id="authrt_memu"></div> -->
<!-- 													 </div> -->
<!-- 	                                            </td> -->
<!-- 	                                        </tr> -->
	                                        <tr>
	                                            <td>
	                                                <label for="authrt_memu">권한메뉴</label>
	                                                <div id="authrt_memu"></div>
	                                            </td>
	                                        </tr>
	                                    </table>
	                                    <table class="tb rental_tb01" style="margin-top: 30px;">
	                                        <tr>
	                                            <th scope="col">권한코드</th>
	                                            <td>
	                                                <label for="authrt_cd">권한코드</label>
	                                                <input id="authrt_cd" class="input" aria-label="권한코드" placeholder="권한코드를 입력해주세요" oninput="charOnly(this)">
	                                            </td>
	                                        </tr>
	                                        <tr>
	                                            <th scope="col">권한명</th>
	                                            <td>
	                                                <label for="authrt_nm">권한명</label>
	                                                <input id="authrt_nm" class="input" aria-label="권한명" placeholder="권한명을 입력해주세요" oninput="charOnly(this)">
	                                            </td>
	                                        </tr>
	                                        <tr>
	                                            <th scope="col">사용여부</th>
	                                            <td>
	                                                <label for="use_yn">사용여부</label>
	                                                <input id="use_yn" class="input use_yn" aria-label="사용여부">
	                                            </td>
	                                        </tr>
	                                        <tr>
	                                            <th scope="col" class="note_name">권한설명</th>
	                                            <td class="textarea_wr">
	                                                <label for="authrt_expln">권한설명</label>
	                                                <textarea id="authrt_expln" class="noteBox clear" maxLength={1000} cols="20" rows="5"
	                                                			aria-label="권한설명" placeholder="권한에 대한 설명을 입력해주세요" oninput="charOnly(this)"></textarea>
	                                            </td>
	                                        </tr>
	                                    </table>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	            	</div>
	         	<div class="btn_flex">
	                 <button class="blue_btn insert_btn">등록</button>
	                 <button class="gray_btn cancelBtn">닫기</button>
	             </div>
	        	</div>
	    	</div>
           <!-- 권한 관리 등록 팝업 -->

            <!-- 권한 관리 상세 팝업 -->
            <div class="popup detail_popup popup_type02">
	            <div class="box">
	                <div class="popup_top">
	                    <h4>권한 관리 상세</h4>
	                    <div class="close">
	                        <span></span>
	                        <span></span>
	                    </div>
	                </div>
	                <div class="content">
	                	<div class="scrollBar02">
	                        <div class="info_wr">
	                            <div class="contBox">
	                                <div class="nameBox nameBox-flex">
	                                    <h4 class="name">권한 관리 상세</h4>
	                                </div>
	                                <div class="cont cont-flex">
	                                    <table class="tb rental_tb01">
<!-- 	                                    	<tr> -->
<!-- 	                                            <td> -->
<!-- 	                                                <label for="authrtMemu">메뉴</label> -->
<!-- 	                                                <div class="treeBox"> -->
<!-- 														<ul class="treeTabs"> -->
<!-- 															<li style="padding: 10px;"> -->
<!-- 																<a id="tabMemu1">포털</a> -->
<!-- 																<a id="tabMemu2">운영</a> -->
<!-- 															</li> -->
<!-- 														</ul> -->
<!-- 														<div id="authrtMemu"></div> -->
<!-- 													 </div> -->
<!-- 	                                            </td> -->
<!-- 	                                        </tr> -->
	                                        <tr>
	                                            <td>
	                                                <label for="authrtMemu">포털메뉴</label>
	                                                <div id="authrtMemu"></div>
	                                            </td>
	                                        </tr>
	                                    </table>
	                                    <table class="tb rental_tb01" style="margin-top: 30px;">
	                                        <tr>
	                                            <th scope="col">권한코드</th>
	                                            <td>
	                                                <label for="authrtCd">권한코드</label>
	                                                <input id="authrtCd" class="input no_line" aria-label="권한코드" readonly>
	                                            </td>
	                                        </tr>
	                                        <tr>
	                                            <th scope="col">권한명</th>
	                                            <td>
	                                                <label for="authrtNm">권한명</label>
	                                                <input id="authrtNm" class="input no_line" aria-label="권한명" >
	                                            </td>
	                                        </tr>
	                                        <tr>
	                                            <th scope="col">사용여부</th>
	                                            <td>
	                                                <label for="useYn">사용여부</label>
	                                                <input id="useYn" class="input useYn" aria-label="사용여부">
	                                            </td>
	                                        </tr>
	                                        <tr>
	                                            <th scope="col" class="note_name">권한설명</th>
	                                            <td class="textarea_wr">
	                                                <label for="authrtExpln">권한설명</label>
	                                                <textarea id="authrtExpln" class="noteBox clear" maxLength={1000} cols="20" rows="5"
	                                                			aria-label="권한설명" placeholder="권한에 대한 설명을 입력해주세요" oninput="charOnly(this)"></textarea>
	                                            </td>
	                                        </tr>
	                                    </table>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	            	</div>
	         	<div class="btn_flex">
	                 <button class="blue_btn update_btn">수정</button>
<!-- 	                 <button class="blue_btn delete_btn" style="margin-right: 10px">삭제</button> -->
	                 <button class="gray_btn cancel_btn">닫기</button>
	             </div>
	        	</div>
	    	</div>
           <!-- 권한 관리 상세 팝업 -->
		</div>
	</div>
</div>