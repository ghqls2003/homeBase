<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<script src="${contextPath}/js/stts/totStts.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/mainView.css" />
<script src="${contextPath}/ext-lib/kendoui.for.jquery.2021.3.1207.commercial/js/jszip.min.js"></script>

<style>
#grid01 > tbody > tr.k-detail-row > td.k-detail-cell > div > div.k-grid-norecords {
	justify-content: center;
	font-size: 16px;
}
#areaGrid > div.k-grid.k-widget.k-grid-display-block > div.k-toolbar.k-grid-toolbar {
	display: none;
}
#grid01 > thead {
	font-weight: bold;
}
#zone1 {
	width: 70%;
}
#areaGrid, #areaChart {
	height : 570px;;
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
	                <li class="current">대여사업자 통계</li>
				</ul>
			</div>
			<br />
	        <div class="cont-flex">
	        	<div id="zone1" class="left-bx cmn-bx">
	            	<div id="areaGrid"  class="contBox flex-box">
	                	<div class="nameBox" style="display: flex; justify-content: space-between;">
	                    	<h4 class="name">대여사업자 현황</h4>
	                    	<button class="download-btn" onClick="javaScript:$statistics.event.excelDown(event);">
			                	<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">다운로드
							</button>
						</div>
			            <table id="grid01">
			            	<caption>대여사업자현황 조회</caption>
						</table>
					</div>
				</div>
	            <div class="right-bx cmn-bx">
					<div id="areaChart" class="contBox flex-box">
	                	<div class="nameBox">
	                    	<h4 class="name">대여사업자 가입 현황</h4>
						</div>
	                    <div class="cont chart-flex chart-flex02" style="height: 100%; ">
	                    	<div id="multi-chart" class="multi-chart" style="width:100%; height:100%; margin:0px;"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>