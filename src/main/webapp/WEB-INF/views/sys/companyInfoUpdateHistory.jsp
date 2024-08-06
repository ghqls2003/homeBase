<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<script src="${contextPath}/js/sys/companyInfoUpdateHistory.js"></script>
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/companyInfoUpdateHistory.css" />

<script>
    var authrtCd = '${authrtCd}';
    var getCmptncZoneCd = '';
    if (authrtCd == 'Z01' || authrtCd == 'M01' || authrtCd == 'K01') {
    	getCmptncZoneCd = '';
	} else if (authrtCd == 'G01' || authrtCd == 'G02') {
		getCmptncZoneCd = '${getCmptncZoneCd}';
	}
</script>

<style>
#container > div > div.contBox.lastBox02 > div.k-grid.k-widget.k-grid-display-block > div.k-grid-content.k-auto-scrollable > div.k-grid-norecords {
	justify-content: center;
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
	                <li>대여사업자 관리</li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li class="current">사업자 정보 갱신 이력</li>
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
	                                <label for="searchCtpvNm" hidden>시도(전체)</label>
	                                <input type="text" id="searchCtpvNm" class="searchCtpvNm" placeholder="시도(전체)" />
	                            </li>
	                        </ul>
	                        <ul class="selec_box">
	                            <li class="li_slec">
	                                <label for="searchSggNm" hidden>시군구(전체)</label>
	                                <input type="text" id="searchSggNm" class="searchSggNm" placeholder="시군구(전체)" />
	                            </li>
	                        </ul>
	                        <ul class="selec_box">
	                        	<!-- 추후에 넣어보자! -->
<!-- 	                            <li class="li_slec"> -->
<!-- 	                                <label for="dropCond" hidden>조건드롭다운</label> -->
<!-- 	                                <input type="text" id="dropCond" class="dropCond" maxLength="80"/> -->
<!-- 	                            </li> -->
	                            <li class="li_slec">
	                                <label for="searchCompany" hidden>조회조건</label>
	                                <input type="text" id="searchCompany" class="searchCompany input" placeholder="회사명을 입력해주세요" maxLength="80"/>
	                            </li>
	                        </ul>
	                        <ul class="selec_box">
	                            <li class="li_slec">
	                                <label for="searchBsnStts" hidden>영업상태(전체)</label>
	                                <input type="text" id="searchBsnStts" class="searchBsnStts" placeholder="영업상태(전체)" />
	                            </li>
	                        </ul>
							 <ul class="selec_box mSelect_box">
								<li class="li_slec">
									<input id="searchChk01" type="radio" name="searchChk" value="jurisdiction" checked />
	 			                    <label for="searchChk01" class="mSearchChk01">관할지</label>
	 			                    <input id="searchChk02" type="radio" name="searchChk" value="location" />
	 			                    <label for="searchChk02">소재지</label>
								</li>
	                        </ul>
		                </div>
		                <button type="button" class="yellow_btn searchBtn" >
		                    조회
		                    <img src="${contextPath}/images/sub/ico_search02.png" alt="조회아이콘"/>
		                </button>
		            </div>
	            </form>
	        </div>
			<!-- 조회 조건 (끝) -->

            <div class="contBox lastBox02">
                <div class="nameBox nameBox-flex">
                    <h4 class="name">사업자 정보 갱신 이력</h4>
                    <button class="download-btn excelDownBtn">
                        <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">
                        엑셀
                    </button>
                </div>

                <table id="companyGrid">
                    <caption>사업자 정보 갱신 이력</caption>
                </table>

            </div>

            <!-- 사업자 정보 갱신 이력 상세 팝업 -->
            <div class="popup detail_popup popup_type02" style="z-index: 999">
		        <div class="box">
		            <div class="popup_top">
		                <h4>사업자 정보 갱신 이력 상세정보</h4>
		                <div class="close popClose">
		                    <span></span>
		                    <span></span>
		                </div>
		            </div>

		    		<div class="content">
						<div class="scrollBar02">
							<div class="info_wr">
								<div id="detailContent"></div>
							</div>
						</div>
					</div>

					<div class="btn_flex">
						<button class="gray_btn cancel_btn popClose" value="Cancel">닫기</button>
					</div>
				</div>
	        </div>
	        <!-- 사업자 정보 갱신 이력 상세 팝업 (끝) -->

		</div>
	</div>
</div>

