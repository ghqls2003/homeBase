<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<script src="${contextPath}/js/stts/rentStts.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/mainView.css" />
<script src="${contextPath}/ext-lib/kendoui.for.jquery.2021.3.1207.commercial/js/jszip.min.js"></script>

<style>
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
#grid01 > tbody > tr.k-detail-row > td.k-detail-cell > div > div.k-grid-norecords {
	justify-content: center;
	font-size: 16px;
}
#timeGrid > div.k-grid.k-widget.k-grid-display-block > div.k-grid-norecords {
	justify-content: center;
	font-size: 16px;
}
#timeGrid > div.k-grid.k-widget.k-grid-display-block > div.k-toolbar.k-grid-toolbar {
	display: none;
}
#areaGrid > div.k-grid.k-widget.k-grid-display-block > div.k-toolbar.k-grid-toolbar {
	display: none;
}
#grid01 > thead {
	font-weight: bold;
}
#bbutton:hover {
	background-color: #98d0e6; color: #fff;
	border-radius: 5px;
}
#rbutton:hover {
	background-color: #98d0e6; color: #fff;
	border-radius: 5px;
}
.allCt:hover {
	cursor: pointer;
	background-color: #98d0e6; color: #fff;
	border-radius: 5px;
}
.sidoName:hover {
	cursor: pointer;
	background-color: #98d0e6; color: #fff;
	border-radius: 5px;
}
#timeGrid > div.k-grid.k-widget.k-grid-display-block > div.k-grid-content.k-auto-scrollable > div.k-grid-norecords {
	justify-content: center;
}
</style>

<script>
	var authrtCd        = "${authrtCd}";
	var cmptncZoneCd    = "${cmptncZoneCd}";
	var bzmnSn          = "${bzmnSn}";
	var upBzmnSn        = "${upBzmnSn}";
</script>

<div class="subPage sub05_01">
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
	                <li class="current">대여이력 통계</li>
				</ul>
			</div>
			<div class="select">
				<button class="select-btn areaDv selected">지역별</button>
				<button class="select-btn timeDv">기간별</button>
			</div>
			<br />
	        <div class="year_picker" style="display:none;">
		        <span class="name">· 기간</span>
				<ul class="yearBox">
	            	<li>
	                	<label for="start-picker1">시작기간</label>
	                    <input id="start-picker1" class="date_pic" title="datepicker" aria-label="시작기간조회" />
					</li>
					<li class="bar">-</li>
	                <li>
	                	<label for="end-picker1">종료기간</label>
	                    <input id="end-picker1" class="date_pic" title="datepicker" aria-label="종료기간조회" />
					</li>
				</ul>
	            <button class="yellow_btn yertBtn" onClick="javascript:$statistics.event.periodSearch()">
	            	조회<img src="${contextPath}/images/sub/ico_search02.png" alt="조회아이콘">
				</button>
			</div>
	        <div class="cont-flex">
	        	<div id="mapToggle" class="left-bx cmn-bx">
	            	<div class="contBox flex-box">
	                	<div class="nameBox">
	                    	<h4 class="name">지도통계</h4>
						</div>
	                    <div class="cont">
	                    	<div style="display:flex; justify-content: space-between;">
	                    		<span style="font-weight:bold; font-size:20px;">
	                    			[
	                    			<span id="allCt" onClick="javascript:$statistics.event.backButton();">전국</span>
	                    			<span id="sidoNamePre"></span>
	                    			<span id="sidoName" onClick="javascript:$statistics.event.sidoBack();"></span>
	                    			<span id="sigunguName"></span>
	                    			]
	                    		</span>
	                    		<div>
		                    		<button id="rbutton" style="font-weight:bold; font-size:20px;" onClick="javascript:$statistics.event.returnButton();">
		                    			<img style="float:left;" width="25px;" src="${contextPath}/images/sub/back.png" alt="뒤로가기" class="ico_tit">
		                    			&nbsp;<span>뒤로가기</span>
		                    		</button>
		                    		&nbsp;
		                    		<button id="bbutton" style="font-weight:bold; font-size:20px;" onClick="javascript:$statistics.event.backButton();">
		                    			<img style="float:left;" width="25px;" src="${contextPath}/images/sub/return.png" alt="처음으로" class="ico_tit">
		                    			&nbsp;<span>처음으로</span>
		                    		</button>
		                    	</div>
	                    	</div>
	                    	<div class="mapBox" style="width: 100%; height: 612px; margin-left: 0px;">
			                	<div id="mapid" style="height: 100%;"></div>
							</div>
						</div>
					</div>
				</div>
	            <div id="chartToggle" class="right-bx cmn-bx">
	            	<div id="contToggle1" class="contBox flex-box">
	                	<div class="nameBox">
	                    	<h4 class="name">대여이력 차종별 통계</h4>
						</div>
	                    <div class="cont chart-flex" style="padding: 42px 20px 25px;">
	                    	<div id="rentCarmdlChart" style="width:100%; height:100%;"></div>
	                    	<div id="null-donut-data" style="font-size:18px; font-weight:bold;">데이터가 존재하지 않습니다.</div>
						</div>
					</div>
					<div id="contToggle2" class="contBox flex-box">
	                	<div class="nameBox">
	                    	<h4 class="name">대여이력 월/기간별 통계</h4>
						</div>
	                    <div class="cont chart-flex chart-flex02">
	                    	<div id="mpChart" class="multi-chart" style="width:100%; height:100%; margin:0px;"></div>
						</div>
					</div>
				</div>
			</div>
			<div id="areaGrid" class="contBox lastBox lastBox02">
	        	<div class="nameBox nameBox-flex">
	            	<h4 class="name">대여이력 현황</h4>
	                <button class="download-btn" onClick="javaScript:$statistics.event.excelDown(event);">
	                	<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">다운로드
					</button>
				</div>
	            <table id="grid01">
	            	<caption>대여현황 조회</caption>
				</table>
			</div>
			<div id="timeGrid" class="contBox lastBox lastBox02">
	        	<div class="nameBox nameBox-flex">
	            	<h4 class="name">대여이력 현황</h4>
	                <button class="download-btn" onClick="javaScript:$statistics.event.excelDown(event);">
	                	<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">다운로드
					</button>
				</div>
	            <table id="grid02">
	            	<caption>대여현황 조회</caption>
				</table>
			</div>
		</div>
	</div>
</div>