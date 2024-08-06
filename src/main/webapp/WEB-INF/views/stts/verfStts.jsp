<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/stts/verfStts.js"></script>

<script>
	var authrtCd        = "${authrtCd}";
	var cmptncZoneCd    = "${cmptncZoneCd}";
	var bzmnSn          = "${bzmnSn}";
	var upBzmnSn        = "${upBzmnSn}";
</script>

<style>
.dayoff {
	color: red;
}
.sub05_01 .select button.select-btn {
    padding: 2px 12px;
    background-color: #F5F8FE;
    border: 1px solid #DBE0EC;
    border-radius: 8px;
    font-size: 2.4rem;
    line-height: 26px;
    color: #040404;
    font-weight: 500;
    margin-right: 10px;
}
.sub05_01 .select button.select-btn:hover {
	background-color: #364BC6; color: #fff;
}
.sub05_01 .select button.selected {
	background-color: #364BC6; color: #fff;
}
</style>

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
				<button class="select-btn tmDv selected">시간/월별</button>
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
		                    	<label for="checkMthd" style="width: 110px;">검증수단 : </label>
		                        <input type="text" id="checkMthd" class="checkMthd" aria-label="검증수단" placeholder="검증방법" />
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
			                	<label for="verfResultDateType" style="display: none;">연월일</label>
			                	<input id="verfResultDateType" class="ymd" aria-label="연월일" style="width: 80px;" />
			                	<label for="verfResultDatePick" style="display: none;">조회날짜</label>
			                	<input id="verfResultDatePick" class="date_pic" title="datepicker" aria-label="조회날짜" style="width: 130px;"/>
		                	</li>
		                	<li class="li_slec" style="display: flex; align-items: center">
			                	<label for="verfResultDrop" style="width: 110px;">검증결과 : </label>
			                	<input id="verfResultDrop" class="verfResultDrop" aria-label="검증결과" placeholder="검증결과" />
		                	</li>
		                	<li class="li_slec" style="display: flex; align-items: center">
			                	<label for="temporaryNum" style="width: 110px;">임시번호 : </label>
			                	<input id="temporaryNum" class="temporaryNum" aria-label="임시번호판유무" placeholder="임시번호판유무" />
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
	               	<h4 class="name">운전자격 확인 사업자별 통계</h4>
	               	<div style="display: flex; align-items: center;">
		                <button class="download-btn excelDownBtn" type="button" onClick="javaScript:$statistics.event.excelDown(event);">
	                        <img src="/images/sub/ico_down.png" alt="다운로드아이콘">다운로드
	                    </button>
	               	</div>
				</div>
	            <div id="verfResult-grid" class="" style="width: 100%; margin: 0px;"></div>
			</div>
<!-- 			<br /> -->
<!-- 			<div class="contBox"> -->
<!-- 	           	<div class="nameBox"> -->
<!-- 	               	<h4 class="name">운전자격 확인 결과</h4> -->
<!-- 				</div> -->
<!-- 	            <div id="" class="cont stack_cht_wr"> -->
<!-- 	               <div id="verf-chart" class="stack_cht" style="width: 100%; height: 300px; margin: 0px;"></div> -->
<!-- 	               <div id="null-verf-chart" style="font-size: 16px; display: none; text-align: center;">데이터가 없습니다.</div> -->
<!-- 				</div> -->
<!-- 			</div> -->
		</div>
	</div>
</div>