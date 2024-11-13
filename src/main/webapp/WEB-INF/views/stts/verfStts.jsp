<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/stts/verfStts.js"></script>
<script src="${contextPath}/ext-lib/kendoui.for.jquery.2021.3.1207.commercial/js/jszip.min.js"></script>
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/verfStts.css" />

<script>
	var authrtCd        = "${authrtCd}";
	var cmptncZoneCd    = "${cmptncZoneCd}";
</script>

<div class="subPage sub03 sub05_01 sub05_02">
	<div id="container">
		<!-- 콘텐츠 시작 -->
	    <div class="wrap">
	    	<div class="titBox">
	        	<div class="tit01">
	            	<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
	               <h2><c:out value='${tableName}'/></h2>
				</div>
	            <ul class="tit02">
	            	<li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li>통계</li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li class="current">운전자격확인결과 통계</li>
				</ul>
			</div>
			<br />
			
			<!-- 시간별통계/검증결과통계 탭버튼 -->
			<div class="select">
				<button class="select-btn tmDv selected">시간별</button>
				<button class="select-btn rmDv">사업자/결과별</button>
			</div>
			<br />
			
			<!-- 시간별 조회조건 -->
            <div class="search_top tmCond">
				<div class="selec_wr">
					<div class="mo_flex">
		            	<ul class="selec_box">
		                	<li class="li_slec" >
			                	<label for="verfDatePick" >조회날짜 :&nbsp;</label>
			                	<input id="verfDatePick" class="date_pic" title="datepicker" aria-label="조회기간" style="width: 130px;"/>
		                	</li>
		                </ul>
		            	<ul class="selec_box">
		                	<li class="li_slec" style="display: flex; align-items: center">
		                    	<label for="checkMthd" style="width: 110px;">검증방법 : </label>
		                        <input type="text" id="checkMthd" class="checkMthd" aria-label="검증방법" placeholder="검증방법" />
							</li>
						</ul>
					</div>
					<button id="searchTimeBtn" class="yellow_btn searchBtn" type="button">
						조회 <img src="${contextPath}/images/sub/ico_search02.png" alt="조회아이콘" />
					</button>
				</div>
			</div>
			<!-- 시간별 그리드 -->
			<div id="timeMonth" class="contBox tmCond">
	           	<div class="nameBox" style="display: flex; justify-content: space-between;">
	               	<h4 class="name">운전자격 확인 시간별 통계</h4>
	               	<div style="display: flex; align-items: center;">
		                <button class="download-btn excelDownBtn" type="button" onClick="javaScript:$statistics.event.excelDown(event);">
	                        <img src="/images/sub/ico_down.png" alt="다운로드아이콘">다운로드
	                    </button>
	               	</div>
				</div>
	            <div id="verf-grid" class="verf-grid" style="width: 100%; margin: 0px;"></div>
			</div>
			
			<!-- 결과별 조회조건 -->
            <div class="search_top rmCond" style="display: none;">
				<div class="selec_wr">
					<div class="mo_flex">
		            	<ul class="selec_box">
		            		<li class="li_slec">
			                	<label for="verfResultDateType">기준 : </label>
			                	<input id="verfResultDateType" class="ymd" aria-label="연월일" style="width: 80px;" />
			                	<label for="verfResultDatePick" style="display: none;">조회날짜</label>
			                	<input id="verfResultDatePick" class="date_pic" title="datepicker" aria-label="조회날짜" style="height: 40px; width: 100px;"/>
<!-- 			                	~ -->
<!-- 			                	<label for="verfResultDatePick2" style="display: none;">조회날짜</label> -->
<!-- 			                	<input id="verfResultDatePick2" class="date_pic" title="datepicker" aria-label="조회날짜" style="height: 40px; width: 100px;"/> -->
		                	</li>
		                	<li class="li_slec" style="display: flex; align-items: center">
			                	<label for="verfResultMthd" style="width: 110px;">검증방법 : </label>
			                	<input id="verfResultMthd" class="verfResultMthd" aria-label="검증방법" placeholder="검증방법" />
		                	</li>
		                	<li class="li_slec" style="display: flex; align-items: center">
			                	<label for="authSelected" style="width: 60px;">권한 : </label>
			                	<input id="authSelected" class="authSelected" aria-label="권한" placeholder="권한" />
		                	</li>
		                	<li class="li_slec" style="display: flex; align-items: center">
		                    	<label for="verfOfCompany" style="width: 100px;">사업자명 : </label>
		                        <input type="text" id="verfOfCompany" class="searchWrd input" aria-label="사업자명" placeholder="사업자명을 입력하세요" maxLength="80" oninput="charOnly(this)" />
							</li>
						</ul>
					</div>
					<button id="searchResultBtn" class="yellow_btn searchBtn" type="button">
						조회 <img src="${contextPath}/images/sub/ico_search02.png" alt="조회아이콘" />
					</button>
				</div>
			</div>
			<!-- 결과별 그리드 -->
			<div id="resultCmp" class="contBox rmCond" style="display: none;">
	           	<div class="nameBox" style="display: flex; justify-content: space-between;">
	               	<h4 class="name">운전자격 확인 사업자/결과별 종합</h4>
				</div>
				<div style="width: 100%; overflow: auto;">
					<table class="tg">
						<thead>
							<tr>
							    <td class="tg-qodv" rowspan="2" style="width: 60px;">총 건수</td>
							    <td class="tg-qodv" rowspan="2" style="width: 60px;">정상</td>
							    <td class="tg-qodv" rowspan="2" style="width: 60px;">비정상<br>(전체)</td>
							    <td class="tg-qodv darker" rowspan="4" style="width: 70px;">비정상<br/>항목상세<br></td>
							    <td class="tg-qodv darker">면허정보없음</td>
							    <td class="tg-qodv darker">재발급된면허</td>
							    <td class="tg-qodv darker">분실된면허</td>
							    <td class="tg-qodv darker">사망취소된면허</td>
							    <td class="tg-qodv darker">취소된면허</td>
							    <td class="tg-qodv darker">정지된면허</td>
							    <td class="tg-qodv darker">기간중취소면허</td>
							    <td class="tg-qodv darker">기간중정지면허</td>
							</tr>
							<tr>
								<td id="cd01" class="tg-dh8m"></td>
							    <td id="cd02" class="tg-dh8m"></td>
							    <td id="cd03" class="tg-dh8m"></td>
							    <td id="cd04" class="tg-dh8m"></td>
							    <td id="cd11" class="tg-dh8m"></td>
							    <td id="cd12" class="tg-dh8m"></td>
							    <td id="cd13" class="tg-dh8m"></td>
							    <td id="cd14" class="tg-dh8m"></td>
							</tr>
							<tr>
							    <td id="cd_tot" class="tg-dh8m" rowspan="2"></td>
							    <td id="cd_nrml" class="tg-dh8m" rowspan="2"></td>
							    <td id= "cd_ab_nrml" class="tg-dh8m" rowspan="2"></td>
							    <td class="tg-qodv darker">정보불일치(이름)</td>
							    <td class="tg-qodv darker">정보불일치(생년월일)</td>
							    <td class="tg-qodv darker">정보불일치(암호일련번호)</td>
							    <td class="tg-qodv darker">정보불일치(종별)</td>
							    <td class="tg-qodv darker">필수값누락(대여기간)</td>
							    <td class="tg-qodv darker">암호화안된면허</td>
							    <td class="tg-qodv darker">검증실패</td>
							    <td class="tg-vq54"></td>
							</tr>
							<tr>
							    <td id="cd21" class="tg-dh8m"></td>
							    <td id="cd22" class="tg-dh8m"></td>
							    <td id="cd23" class="tg-dh8m"></td>
							    <td id="cd24" class="tg-dh8m"></td>
							    <td id="cd25" class="tg-dh8m"></td>
							    <td id="cd31" class="tg-dh8m"></td>
							    <td id="cd51" class="tg-dh8m"></td>
							    <td class="tg-vq54"></td>
							</tr>
						</thead>
					</table>
				</div>
	           	<div class="nameBox" style="display: flex; justify-content: space-between;">
	               	<h4 class="name">운전자격 확인 사업자/결과별 상세</h4>
	               	<div style="display: flex; align-items: center;">
		                <button class="download-btn excelDownBtn" type="button" onClick="javaScript:$statistics.event.excelDown(event);">
	                        <img src="/images/sub/ico_down.png" alt="다운로드아이콘">다운로드
	                    </button>
	               	</div>
				</div>
	            <div id="verfResult-grid"  style="width: 100%; margin: 0px;"></div>
			</div>
		</div>
	</div>
</div>