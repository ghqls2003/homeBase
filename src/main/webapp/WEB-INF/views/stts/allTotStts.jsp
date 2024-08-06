<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<script src="${contextPath}/js/stts/allTotStts.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/mainView.css" />
<script src="${contextPath}/ext-lib/kendoui.for.jquery.2021.3.1207.commercial/js/jszip.min.js"></script>
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/allTotStts.css" />


<script>
	var authrtCd        = "${authrtCd}";
	var cmptncZoneCd    = "${cmptncZoneCd}";
	var bzmnSn          = "${bzmnSn}";
	var upBzmnSn        = "${upBzmnSn}";
</script>

<div class="subPage sub05_01 sub05_02">
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
	                <li class="current">종합 통계</li>
				</ul>
			</div>
			<br />
			<div class="sch_bx">
		        <div id="year_picker" class="year_picker">
			        <span class="name">조회년도</span>
					<ul class="yearBox">
		                <li>
		                	<label for="date_drop">조회년도</label>
		                    <input id="date_drop" class="date_pic" title="datedrop" aria-label="조회년도" />
						</li>
					</ul>
		            <button class="yellow_btn yertBtn" onClick="javascript:$statistics.event.periodSearch()">
		            	조회<img src="${contextPath}/images/sub/ico_search02.png" alt="조회아이콘">
					</button>
				</div>
			</div>
			<div id="gridMng" class="grid_fx">
				<div class="grid_bx cont1">
		            <table id="grid02" class="cmn_grid">
		            	<caption>대여사업자현황</caption>
					</table>
				</div>
				<div class="mo_fx">
					<div class="grid_bx cont2 cont_pd">
			            <table id="grid03" class="cmn_grid">
			            	<caption>차량합계</caption>
						</table>
					</div>
					<div class="grid_bx cont3 cont_pd" style="margin-right: 0px;">
			            <table id="grid04" class="cmn_grid">
			            	<caption>정보갱신이력</caption>
						</table>
					</div>
				</div>
			</div>
			<br />
			<div class="contBox">
	           	<div class="nameBox">
	               	<h4 class="name">운전자격 확인 결과</h4>
				</div>
	            <div id="verfDiv" class="cont stack_cht_wr">
	               <div id="verf-chart" class="stack_cht" style="width: 100%; height: 300px; margin: 0px;"></div>
	               <div id="null-verf-chart" style="font-size: 16px; display: none; text-align: center;">데이터가 없습니다.</div>
				</div>
			</div>
			<br />
	        <div class="cht_wr" style="padding-bottom: 0px;">
	            <div class="contBox flex-box">
	               	<div class="nameBox">
	                   	<h4 class="name"><span id="nb1">지역별</span> 차량 대여 현황(Top<span id="num1">5</span>)</h4>
					</div>
	                <div class="cont chart-flex">
	                   	<div id="donut-chart" style="width:100%; height:100%;"></div>
	                   	<div id="null-donut-data" style="font-size:16px; display: none;">데이터가 없습니다.</div>
					</div>
				</div>
	            <div class="contBox flex-box">
	               	<div class="nameBox">
	                   	<h4 class="name"><span id="nb2">지역별</span> 차량 결함 현황(Top<span id="num2">5</span>)</h4>
					</div>
	                <div class="cont chart-flex">
	                   	<div id="donut-chart2" style="width:100%; height:100%;"></div>
	                   	<div id="null-donut-data2" style="font-size:16px; display: none;">데이터가 없습니다.</div>
					</div>
				</div>
	            <div class="contBox flex-box">
	               	<div class="nameBox">
	                   	<h4 class="name"><span id="nb3">지역별</span> 차량 보유 현황(Top<span id="num3">5</span>)</h4>
					</div>
	                <div class="cont chart-flex">
	                   	<div id="donut-chart3" style="width:100%; height:100%;"></div>
	                   	<div id="null-donut-data3" style="font-size:16px; display: none;">데이터가 없습니다.</div>
					</div>
				</div>
			</div>
			<br />
			<div class="contBox">
	           	<div class="nameBox">
	              	<h4 class="name">차량 가동률</h4>
				</div>
	            <div id="carUse" class="cont stack_cht_wr">
	            	<div id="useCar-chart" class="stack_cht" style="height: 300px;"></div>
	            	<div id="null-useCar-chart" style="font-size:16px; text-align: center; display: none;">데이터가 없습니다.</div>
				</div>
			</div>
			<br />			
			<div class="contBox">
	           	<div class="nameBox">
	               	<h4 class="name">차량 결함 정보</h4>
				</div>
	            <div id="carRecall" class="cont stack_cht_wr" style="margin: 0px; padding: 5px 0px !important;">
	               	<div id="dfInfo-grid" class="stack_cht" style="width: 100%; height: 300px;"></div>
				</div>
			</div>
			<br />			
			<div id="authDiv" class="contBox" style="display: none;">
	           	<div class="nameBox">
	               	<h4 class="name">지역 / 계절별 차량 대여현황</h4>
				</div>
	            <div id="areaSeason" class="cont stack_cht_wr" style="margin:0px;">
	               	<div id="multi-chart3" class="multi-chart" style="height: 300px;"></div>
	               	<div id="null-multi-chart3" style="font-size: 16px; text-align: center; display: none;">데이터가 없습니다.</div>
				</div>
			</div>
		</div>
	</div>
</div>