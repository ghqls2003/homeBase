<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/api/ApiHist.js"></script>
<script>
	var Auth = "${AuthCd}";
	var UserId = "${UserId}";
	var User = "${UserSn}";
</script>
<style>
.api_page .select button.select-btn {
	padding: 2px 12px;
	background-color: #F5F8FE;
	border: 1px solid #DBE0EC;
	border-radius: 8px;
	font-size: 2.4rem;
	line-height: 26px;
	color: #040404;
	font-weight: 500;
	margin-right: 10px;
	cursor: pointer;
}

.api_page .select button.select-btn:hover {
	background-color: #364BC6;
	color: #fff;
}

.api_page .select button.selected {
	background-color: #364BC6;
	color: #fff;
}

.ap .k-input-value-text {
	color: #364BC6;
}

.wrap-text {
	white-space: normal !important;
	word-wrap: break-word;
}

.subPage #container {
	min-height: 100%;
	min-width: 380px;
}

.horizontal-list {
	list-style: none;
	padding: 0;
	display: flex;
	justify-content: space-between;
}

.horizontal-list li {
	width: 120px;
}

.nameBox-flex {
	justify-content: space-evenly;
}

.horizontal-list .on {
	border-bottom: 2px solid #007bff;
	font-weight: bold;
}
</style>
<div class="subPage sub03 api_page">
	<div id="container">
		<div class="wrap">
			<div class="titBox">
				<div class="tit01">
					<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘"
						class="ico_tit" />
					<h2>
						<c:out value='${tableName}' />
					</h2>
				</div>
				<ul class="tit02">
					<li class="home"><img
						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘" /></li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인" /></li>
					<li>오픈 APi</li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인" /></li>
					<li class="current"><c:out value='${tableName}' /></li>
				</ul>
			</div>
			<br />

			<!-- 운영/개발키 이력 탭버튼 -->
			<div class="select">
				<button class="select-btn selected" id="tabBtn01">운영</button>
				<button class="select-btn" id="tabBtn02">개발</button>
			</div>
			<br />

			<div class="selec_wr" id="search_area" style="margin-bottom: 20px;">
				<div class="mo_flex">
					<ul class="yearBox" id='time1'>
						<li class="mo_li"><label for="start-Picker01">시작시간</label> <input
							id="start-Picker01" title="timePicker" class="timePicker01"
							aria-label="시작시간검색"></li>
						<li class="bar">-</li>
						<li class="mo_li"><label for="end-Picker01">종료기간</label> <input
							id="end-Picker01" title="datepicker" aria-label="종료기간검색">
						</li>
					</ul>
					<ul class="selec_box">
						<li class="li_slec">
							<div class="dropdown">
								<label for="search_stts_cd"></label> <input id="search_stts_cd">
							</div>
						</li>
						<li class="li_slec">
							<div class="dropdown">
								<label for="search_stts_cd3"></label> <input
									id="search_stts_cd3">
							</div>
						</li>
						<li class="li_slec">
							<div class="dropdown">
								<label for="search_stts_cd2"></label> <input
									id="search_stts_cd2">
							</div>
						</li>

						<li class="li_slec"><label for="search_box"></label> <input
							id="search_box" class="input" aria-label="API명를 입력하세요"
							placeholder="검색어를 입력하세요"></li>

					</ul>
					<button class="yellow_btn" id="userMngBtnSearch" type="button"
						style="width: 80px;">
						조회<img src="${contextPath}/images/sub/ico_search02.png"
							alt="조회아이콘" />
					</button>
				</div>
			</div>
			<div class="selec_wr" id="search_area_Dev"
				style="margin-bottom: 20px;">
				<div class="mo_flex">
					<ul class="yearBox" id='time1'>
						<li class="mo_li"><label for="start_Picker_Dev01">시작시간</label>
							<input id="start_Picker_Dev01" title="timePicker"
							class="timePicker01" aria-label="시작시간검색"></li>
						<li class="bar">-</li>
						<li class="mo_li"><label for="end_Picker_Dev01">종료기간</label>
							<input id="end_Picker_Dev01" title="datepicker"
							aria-label="종료기간검색"></li>
					</ul>
					<ul class="selec_box">
						<li class="li_slec">
							<div class="dropdown">
								<label for="search_stts_cd_Dev01"></label> <input
									id="search_stts_cd_Dev01">
							</div>
						</li>
						<li class="li_slec">
							<div class="dropdown">
								<label for="search_stts_cd_Dev03"></label> <input
									id="search_stts_cd_Dev03">
							</div>
						</li>
						<li class="li_slec">
							<div class="dropdown">
								<label for="search_stts_cd_Dev02"></label> <input
									id="search_stts_cd_Dev02">
							</div>
						</li>
						<li class="li_slec"><label for="search_box"></label> <input
							id="search_box_Dev01" class="input" aria-label="API명를 입력하세요"
							placeholder="검색어를 입력하세요"></li>
					</ul>
					<button class="yellow_btn" id="SearchBtn_Dev" type="button"
						style="width: 80px;">
						조회<img src="${contextPath}/images/sub/ico_search02.png"
							alt="조회아이콘" />
					</button>
				</div>
			</div>
			<div class="selec_wr" id="search_area2" style="margin-bottom: 20px;">
				<div class="mo_flex">
					<ul class="yearBox" id='time2'>
						<li class="mo_li"><label for="start-Picker02">시작시간</label> <input
							id="start-Picker02" title="timePicker" class="timePicker01"
							aria-label="시작시간검색"></li>
						<li class="bar">-</li>
						<li class="mo_li"><label for="end-Picker02">종료기간</label> <input
							id="end-Picker02" title="datepicker" aria-label="종료기간검색">
						</li>
					</ul>
					<ul class="selec_box">
						<li class="li_slec">
							<div class="dropdown">
								<label for="search_stts_cd_api"></label> <input
									id="search_stts_cd_api">
							</div>
						</li>
						<li class="li_slec">
							<div class="dropdown">
								<label for="search_stts_cd_error"></label> <input
									id="search_stts_cd_error">
							</div>
						</li>
					</ul>
					<button class="yellow_btn" id="userMngBtnSearch2" type="button"
						style="width: 80px;">
						조회<img src="${contextPath}/images/sub/ico_search02.png"
							alt="조회아이콘" />
					</button>
				</div>
			</div>
			<div class="selec_wr" id="search_area2_Dev"
				style="margin-bottom: 20px;">
				<div class="mo_flex">
					<ul class="yearBox" id='time2'>
						<li class="mo_li"><label for="start_Picker_Dev02">시작시간</label>
							<input id="start_Picker_Dev02" title="timePicker"
							class="timePicker01" aria-label="시작시간검색"></li>
						<li class="bar">-</li>
						<li class="mo_li"><label for="end_Picker_Dev02">종료기간</label>
							<input id="end_Picker_Dev02" title="datepicker"
							aria-label="종료기간검색"></li>
					</ul>
					<ul class="selec_box">
						<li class="li_slec">
							<div class="dropdown">
								<label for="search_stts_cd_api_dev"></label> <input
									id="search_stts_cd_api_Dev">
							</div>
						</li>
						<li class="li_slec">
							<div class="dropdown">
								<label for="search_stts_cd_error_dev"></label> <input
									id="search_stts_cd_error_dev">
							</div>
						</li>
					</ul>
					<button class="yellow_btn" id="SearchBtn_Dev02" type="button"
						style="width: 80px;">
						조회<img src="${contextPath}/images/sub/ico_search02.png"
							alt="조회아이콘" />
					</button>
				</div>
			</div>
			<div class="tooltop_wr">
				<p class="info">
					<span>※</span> API 이용이력 표시 설명
				</p>
				<div class="tooltip">
					<button>
						<img src="${contextPath}/images/sub/ico_tooltip.png" alt="" />
					</button>
					<span class="tooltiptext tooltip-right"> <!-- 						API 이용 통계 페이지는 하루를 기준으로 사용자와 사용자가 사용한 API에 대한 통계를 제공하고 있습니다.<br/>  -->
						하단 표에서는 API 이력을 확인 할 수 있습니다. <br /> API 이력 표 우측 상단 날짜를 선택하시면 해당
						일의 데이터를 확인할 수 있습니다.
					</span>
				</div>
			</div>
			<!--api 개발 주석 해제하고 쓰면 됨 -->
				<div class="contBox lastBox02" id="tabview1">
					<div class="nameBox nameBox-flex">
						<h4 class="name">API 운영 이용이력</h4>
						<button class="download-btn excelDownBtn" id="apiOperationExcel">
							<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘" />
							엑셀
						</button>
					</div>
					<table id="grid">
					</table>
				</div>
				<div class="contBox lastBox02" id="tabview2"">
					<div class="nameBox nameBox-flex">
						<h4 class="name">API 개발 이용이력</h4>
						<button class="download-btn" id="apiDevExcel">
							<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘" />
							엑셀
						</button>
					</div>
					<table id="grid02"></table>
				</div>
			<!--  -->

			<!-- 			<div class="contBox"> -->
			<!-- 				<div class="nameBox nameBox-flex"> -->
			<!-- 					<h4 class="name">API 이용 이력</h4> -->
			<!-- 					<button class="download-btn excelDownBtn" id="download-btn"> -->
			<%-- 						<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘" /> --%>
			<!-- 						엑셀 -->
			<!-- 					</button> -->
			<!-- 				</div> -->
			<!-- 				<table id="grid"> -->
			<!-- 				</table> -->
			<!-- 			</div> -->
		</div>
	</div>
</div>

