<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<script src="${contextPath}/js/stts/defectStts.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/mainView.css" />
<script src="${contextPath}/ext-lib/kendoui.for.jquery.2021.3.1207.commercial/js/jszip.min.js"></script>

<style>
#areaGrid > div.k-grid.k-widget.k-grid-display-block > div.k-grid-content.k-auto-scrollable > div.k-grid-norecords {
	justify-content: center;
	font-size: 16px;
}
#areaGrid > div.k-grid.k-widget.k-grid-display-block > div.k-toolbar.k-grid-toolbar {
	display: none;
}
#grid01 > thead {
	font-weight: bold;
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
	                <li class="current">대여차량결함 통계</li>
				</ul>
			</div>
			<br />
	        <div class="cont-flex">
	            <div class="contBox flex-box">
	               	<div class="nameBox">
	                   	<h4 class="name">대여차량 결함 유형별 통계</h4>
					</div>
	                <div class="cont chart-flex" style="padding: 42px 20px 25px;">
	                   	<div id="defectCateChart" style="width:100%; height:100%;"></div>
	                   	<div id="null-donut-data" style="font-size:18px; font-weight:bold;">데이터가 존재하지 않습니다.</div>
					</div>
				</div>
				<div class="contBox flex-box">
	               	<div class="nameBox">
	                   	<h4 class="name">대여차량 결함 내용별 통계</h4>
					</div>
	                <div class="cont chart-flex" style="align-items: start; overflow: auto;">
	                   	<div id="defectCntntChart" style="width:100%; height: 100%; margin:0px;"></div>
					</div>
				</div>
			</div>
			<div id="areaGrid" class="contBox lastBox lastBox02">
	        	<div class="nameBox nameBox-flex">
	            	<h4 class="name">대여차량 결함 현황</h4>
	                <button class="download-btn" onClick="javaScript:$statistics.event.excelDown(event);">
	                	<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">다운로드
					</button>
				</div>
	            <table id="grid01">
	            	<caption>대여차량결함 현황</caption>
				</table>
			</div>
		</div>
	</div>
</div>