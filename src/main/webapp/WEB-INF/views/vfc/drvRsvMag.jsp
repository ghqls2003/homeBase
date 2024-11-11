<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/vfc/drvRsvMag.js"></script>
<link rel="stylesheet" type="text/css"
	href="${contextPath}/css/custom/rentalHistManage.css" />

<script>
	var authrtCd = "${authrtCd}";
	var userTypeBool = '${userTypeBool}' === 'true';
</script>

<style>
.k-picker-solid {
	height: 40px;
	background-color: #FFFFFF;
	border: 1px solid #DBE0EC;
	border-radius: 8px 0px 0px 8px;
	background-image: none;
	top: -5px;
}

.scrollBar02 {
	overflow-y: auto;
	max-height: calc(90vh - 40px); /* 내용이 넘칠 경우 스크롤 처리 */
}
.popup .content {
    max-height: 80vh;
    overflow-y: auto;
}

.popup .box {
	width: 850px;
	height: 621px;
	max-width: 90vw; /* 반응형을 위해 최대 너비 설정 */
	max-height: 90vh; /* 반응형을 위해 최대 높이 설정 */
	background-color: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 2;
	border-radius: 8px;
	overflow: hidden; /* box 밖으로 내용이 나가지 않도록 설정 */
}
}

#start-timePicker04+.k-input-button {
	background-image: none !important;
}

.popup .k-picker-solid {
	width: 100% !important;
	border-radius: 10px;
}

@media ( max-width : 376px) {
	.sub03 ul.yearBox {
		display: ruby;
	}
	.popup .k-picker-solid {
		width: 100% !important;
		border-radius: 10px;
	}
	.popup.detail_popup .box {
		width: 100%;
		height: auto;
	}
	.popup.detail_popup .info_wr {
		height: auto;
		padding: 20px;
	}
	.popup.detail_popup .tb_flex {
		flex-direction: column;
		align-items: flex-start;
	}
}

@media ( max-width : 360px) {
	.sub03 ul.yearBox {
		display: ruby;
	}
	.popup .k-picker-solid {
		width: 100% !important;
		border-radius: 10px;
	}
	.popup.detail_popup .box {
		width: 100%;
		height: auto;
	}
	.popup.detail_popup .info_wr {
		height: auto;
		padding: 20px;
	}
	.popup.detail_popup .tb_flex {
		flex-direction: column;
		align-items: flex-start;
	}
}

@media ( max-width : 390px) {
	.sub03 ul.yearBox {
		display: ruby;
	}
	.popup .k-picker-solid {
		width: 100% !important;
		border-radius: 10px;
	}
	.popup.detail_popup .box {
		width: 100%;
		height: auto;
	}
	.popup.detail_popup .info_wr {
		height: auto;
	}
	.popup.detail_popup .tb_flex {
		flex-direction: column;
	}
	.popup.detail_popup .btn_flex {
		/* 		flex-direction: column; */
		align-items: center;
	}
}

@media ( max-width : 650px) {
	.sub03 ul.yearBox {
		display: ruby;
	}
	.popup .k-picker-solid {
		width: 100% !important;
		border-radius: 10px;
	}
	.popup.detail_popup .box {
		width: 90%;
		height: auto;
	}
	.popup.detail_popup .info_wr {
		height: auto;
	}
	.popup.detail_popup .tb_flex {
		flex-direction: column;
	}
}

@media ( max-width : 420px) {
	.sub03 ul.yearBox {
		display: ruby;
	}
	.popup .k-picker-solid {
		width: 100% !important;
		border-radius: 10px;
	}
	button.red_btn {
		width: 100%;
		height: auto;
	}
	.sm_popup .sm_box {
		width: 90%;
		height: auto;
	}
	.sm_popup .content {
		height: auto;
	}
}

@media ( max-width : 480px) {
	.sub03 ul.yearBox {
		display: ruby;
	}
	.popup .k-picker-solid {
		width: 100% !important;
		border-radius: 10px;
	}
	button.red_btn {
		width: 100%;
		height: auto;
	}
	.popup.detail_popup .box {
		width: 100%;
	}
}

.info_text {
	font-weight: bold;
	padding-left: 45px;
	padding-top: 20px;
}

.k-timepicker .k-input-button.k-button.k-button-md.k-button-solid.k-button-solid-base.k-icon-button
	{
	background-image: none !important;
}

table.tb .tb_flex23 {
	align-items: center;
	justify-content: flex-start;
}

#box12 {
	width: 100%; /* 기본적으로 너비를 100%로 설정 */
	max-width: 1200px; /* 기본 최대 너비를 1200px로 설정 */
	background-color: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 2;
	border-radius: 8px;
}

/* 작은 화면에서의 반응형 스타일 */
@media ( max-width : 420px) {
	#box12 {
		max-width: 420px; /* 화면이 420px 이하일 때 최대 너비를 420px로 설정 */
	}
}

@media ( max-width : 376px) {
	#box12 {
		max-width: 376px; /* 화면이 376px 이하일 때 최대 너비를 376px로 설정 */
	}
}

@media ( max-width : 390px) {
	#box12 {
		max-width: 390px; /* 화면이 390px 이하일 때 최대 너비를 390px로 설정 */
	}
}

@media ( max-width : 650px) {
	#box12 {
		max-width: 650px; /* 화면이 650px 이하일 때 최대 너비를 650px로 설정 */
	}
}

@media ( max-width : 480px) {
	#box12 {
		max-width: 480px; /* 화면이 480px 이하일 때 최대 너비를 480px로 설정 */
	}
}

.mo_flex {
	display: flex;
	flex-wrap: wrap;
}

#yearPicker, #selectBox1 {
	display: flex;
	align-items: center;
}

#selectBox1 {
	flex: 1; /* 남은 공간을 채우기 위해 flex-grow 사용 */
}

#selectBox2 {
	clear: both; /* 이전 요소들과 줄바꿈 */
	margin-top: 10px; /* 위 요소들과 간격 */
	display: flex;
	align-items: center;
	width: 100%;
}

/* 반응형 미디어 쿼리 */
@media ( max-width : 768px) {
	.mo_flex {
		flex-direction: column;
	}
	#yearPicker, #selectBox1, #selectBox2 {
		width: 100%;
	}
	#selectBox2 {
		margin-top: 20px;
	}
}

.Move_btn {
	font-size: medium;
	background-color: #fff8df;
	color: #9D5F01;
	border: none;
	display: flex; /* 요소들을 가로 방향으로 배열합니다 */
	align-items: center; /* 이미지와 텍스트를 수직 정렬합니다 */
	padding: 8px 16px;
	border-radius: 5px;
	transition: background-color 0.3s ease, color 0.3s ease;
	cursor: pointer;
	display: flex;
}

.horizontal-list2 {
	padding: 10px;
	list-style-type: none;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.horizontal-list2 li {
	margin: 0 10px;
	padding: 0;
}

.year_picker {
	display: flex;
	flex-wrap: wrap;
}

.yearBox {
	list-style-type: none;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
}

.mo_li {
	margin-right: 10px;
	margin-bottom: 10px;
}

.bar {
	align-self: center;
	margin-right: 10px;
}

#rentalHistGrid table {
	min-width: 100%;
}

#container>div>div.contBox.lastBox.lastBox02>div.k-grid.k-widget.k-grid-display-block>div.k-grid-content.k-auto-scrollable>div.k-grid-norecords
	{
	justify-content: center;
}

.k-icon.k-i-clock.k-button-icon {
	display: none !important; /* 요소를 숨깁니다 */
}
</style>

<div class="subPage sub03">
	<!-- 콘텐츠 시작 -->
	<div id="container">
		<div class="wrap">
			<div class="titBox">
				<div class="tit01">
					<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘"
						class="ico_tit">
					<h2>
						<c:out value='${tableName}' />
					</h2>
				</div>
				<ul class="tit02">
					<li class="home"><img
						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li>대여사업자 관리</li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li class="current"><c:out value='${tableName}'/></li>
					
				</ul>
			</div>
			<!-- 			<div class="search_top"> -->
			<input type="hidden" id="elxExcelDownReason" name="excelDownReason" />
			<input type="hidden" class="_csrf" name="${_csrf.parameterName}"
				value="${_csrf.token}" />
			<div class="selec_wr" style="margin-bottom: 20px;">
				<div class="mo_flex">
					<ul class="yearBox" id="time1">
						<li class="mo_li" style="width: 150px;"><label
							for="start-picker01"></label> <input id="start-picker01"
							title="datepicker" aria-label="시작기간조회"></li>
						<li class="bar">-</li>
						<li class="mo_li" style="width: 150px;"><label
							for="end-picker01"></label> <input id="end-picker01"
							title="datepicker" aria-label="종료기간조회"></li>
						<!-- 					</ul> -->
						<!-- 					<ul class="selec_box" id="selectBox1"> -->
						<li class="mo-li"><label for="lncdDrop"></label> <input
							id="lncdDrop"></li>
						<li class="mo-li"><label for="searchCd"></label> <input
							id="searchCd"></li>
						<li class="mo_li"><label for="searchWrd"
							style="display: none"></label> <input type="text" id="searchWrd"
							class="searchWrd input" aria-label="대여번호를 입력하세요"
							placeholder="대여번호를 입력하세요" maxLength="16" oninput="charOnly(this)">
						</li>
					</ul>
				</div>

				<button class="yellow_btn" id="searchBtn">
					조회<img src="${contextPath}/images/sub/ico_search02.png" alt="조회아이콘">
				</button>
			</div>
			<!-- 			</div> -->
			<div class="contBox lastBox lastBox02">
				<div class="nameBox nameBox-flex">
					<div style="display: flex; align-items: center;">
						<h4 class="name">
							<c:out value='${tableName}' />
						</h4>
						&emsp; 총&nbsp;<span id="totCnt" style="font-weight: bold;"></span>건
					</div>
					<ul class="horizontal-list"
						style="list-style: none; padding: 0; display: flex; justify-content: start;">
						<li class="pdfSelect">
							<button href="javascript:void(0)"
								class="download-btn excelDownBtn">
								<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">
								엑셀
							</button>
						</li>
					</ul>

				</div>
				<table id="rsvGrid">
					<caption>자격확인 반복예약 현황</caption>
				</table>
			</div>

			<div class="btn_flex">
				<button class="blue_btn register_btn">예약 등록</button>
			</div>
		</div>
	</div>
</div>


<!-- 예약목록 -->
<!-- <div id="rsvDetail" class="popup detail_popup popup_type02"> -->
<!-- 	<div class="box" id="box12"> -->
<!-- 		<div class="popup_top"> -->
<!-- 			<h4>반복조회 예약목록</h4> -->
<!-- 			<div class="close rsvshowClose"> -->
<!-- 				<span></span> <span></span> -->
<!-- 			</div> -->
<!-- 		</div> -->
<!-- 		<div class="content"> -->
<!-- <!-- 			<div class="scrollBar02" style="height: 400px;"> -->
<!-- 			<div class="scrollBar02"> -->
<!-- 				<div class="search_top"> -->
<!-- 					<div class="selec_wr" style="display: flex;"> -->
<!-- 						<div class="mo_flex" style="display: flex;"> -->
<!-- 							<ul class="yearBox" style="display: flex;"> -->
<!-- 								<li class="mo_li"><label for="start-picker05">시작기간</label> -->
<!-- 									<input id="start-picker05" title="datepicker" -->
<!-- 									aria-label="시작기간조회"></li> -->
<!-- 								<li class="bar">-</li> -->
<!-- 								<li class="mo_li"><label for="end-picker05">종료기간</label> <input -->
<!-- 									id="end-picker05" title="datepicker" aria-label="종료기간조회"> -->
<!-- 								</li> -->
<!-- 							</ul> -->
<!-- 							<ul class="selec_box" style="display: flex;"> -->
<!-- 								<li class="li_slec"><label for="searchBsnSttsRsv"></label> -->
<!-- 									<input id="searchBsnSttsRsv" -->
<!-- 									style="border-radius: 8px; background-color: #fff;"></li> -->
<!-- 								<li class="li_slec"><label for="search_box"></label> <input -->
<!-- 									type="text" id="searchRsvCar" class="searchWrd input" -->
<!-- 									placeholder="차량번호를 입력하세요."></li> -->
<!-- 								<li class="li_slec"><label for="search_box"></label> <input -->
<!-- 									type="text" id="searchRsvRentNo" class="searchWrd input" -->
<!-- 									placeholder="대여번호를 입력하세요."></li> -->
<!-- 							</ul> -->
<!-- 						</div> -->
<!-- 						<button class="yellow_btn" id="searchBtnRsv"> -->
<%-- 							조회<img src="${contextPath}/images/sub/ico_search02.png" --%>
<!-- 								alt="조회아이콘"> -->
<!-- 						</button> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 				<div class="contBox lastBox lastBox02"> -->
<!-- 					<div class="nameBox nameBox-flex"> -->
<!-- 						<div style="display: flex; align-items: center;"> -->
<!-- 							<h4 class="name">반복조회 예약목록</h4> -->
<!-- 							<span id="totCnt" style="font-weight: bold;"></span> -->
<!-- 						</div> -->
<!-- 						<button class="download-btn rsvExcelDownBtn"> -->
<%-- 							<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘"> --%>
<!-- 							엑셀 -->
<!-- 						</button> -->
<!-- 					</div> -->
<!-- 					<table id="rsvHistGrid"> -->
<%-- 						<caption>대여이력 현황</caption> --%>
<!-- 					</table> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 			<div class='btn_flex'> -->
<!-- 				<button class='gray_btn cancel_btn rsvshowClose' type="submit" -->
<!-- 					style="margin-right: 10px" value="Cancel">닫기</button> -->
<!-- 			</div> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- </div> -->

<div id="insertRsvInfo" class="popup detail_popup popup_type02">
	<div class="box">
		<!-- style="width: 50%;" -->
		<div class="popup_top">
			<h4>예약설정 등록</h4>
			<div class="close regPopupClose">
				<span></span> <span></span>
			</div>
		</div>
		<div class="info_text">
			<p>* 반복조회는 대여 종료 시기까지 반복됩니다.</p>
			<p>* 예약 종료일은 대여 종료일입니다.</p>
			<p>* 차량번호를 먼저 검색하시고 예약을 진행해주세요.</p>
			<p>* 대여번호는 검색 버튼을 클릭하시면 조회 됩니다.</p>
			<p>* 예약 설정은 시작일자와 종료일자 간의 차이가 최소 7일 이상이어야 가능합니다.</p>
		</div>
		<div class="content">
			<!--  -->
			<div class="scrollBar02">
				<div class="info_wr">
					<div class="contBox">
						<div class="nameBox nameBox-flex">
							<h4 class="name">반복예약 등록</h4>
						</div>
						<div class="cont cont-flex">
							<table class="tb rental_tb01">
								<tr>
									<th scope="col">대여번호 <span class="asterisk">*</span>
									</th>
									<td>
										<div class="tb_flex">
											<ul class="selec_box mSelect_box">
												<li class="li_slec" style="display: flex;"><label
													for="regRentNo">대여번호</label> <input type="text"
													id="regRentNo" name="regRentNo" class="input"
													placeholder="검색버튼을 클릭해주세요." readonly />
													<button id="carBtn" class="yellow_btn carBtn">
														<img src="${contextPath}/images/sub/ico_search02.png"
															alt="검색아이콘">
													</button></li>
											</ul>
										</div>

									</td>
								</tr>
								<tr>
									<th scope="col">차량번호</th>
									<td style='width: 200px;'>
										<div class="tb_flex">
											<label for="regVhclRegNo">차량번호</label> <input type="text"
												id="regVhclRegNo" name="regVhclRegNo" class="input" readonly />
										</div>
									</td>
								</tr>
								<tr>
									<th scope="col">예약 주기</th>
									<td>
										<div class="tb_flex">
											<label for="periodRsv"></label> <input id="periodRsv">
										</div>
									</td>
								</tr>
								<tr style="display: none;">
									<th scope="col">최종검증일자</th>
									<td>
										<div class="tb_flex">
											<label for="lastCfDt">최종검증일자</label> <input type="text"
												id="lastCfDt" name="lastCfDt" class="input" readonly />
										</div>
									</td>
								</tr>
								<tr style="display: none;">
									<th scope="col">최종검증결과</th>
									<td>
										<div class="tb_flex">
											<label for="lastCfRst">최종검증결과</label> <input type="text"
												id="lastCfRst" name="lastCfRst" class="input" readonly />
										</div>
									</td>
								</tr>
								<tr style="display: none;">
									<th scope="col">면허증종별</th>
									<td>
										<div class="tb_flex">
											<label for="ReglcnsAsortCd">최종검증결과</label> <input type="text"
												id="ReglcnsAsortCd" name="ReglcnsAsortCd" class="input"
												readonly />
										</div>
									</td>
								</tr>
								<tr style="display: none;">
									<th scope="col">면허증</th>
									<td>
										<div class="tb_flex">
											<label for="regRgtrDln">면허증</label> <input type="text"
												id="regRgtrDln" name="regRgtrDln" class="input" readonly />
										</div>
									</td>
								</tr>
								<tr style="display: none;">
									<th scope="col">차종</th>
									<td>
										<div class="tb_flex">
											<label for="carmdl">차량번호</label> <input type="text"
												id="carmdl" name="carmdl" class="input" readonly />
										</div>
									</td>
								</tr>
								<tr style="display: none;">
									<th scope="col">면허성명</th>
									<td>
										<div class="tb_flex">
											<label for="lcnsFlnm">면허성명</label> <input type="text"
												id="lcnsFlnm" name="lcnsFlnm" class="input" readonly />
										</div>
									</td>
								</tr>
								<tr style="display: none;">
									<th scope="col">엔진형식</th>
									<td>
										<div class="tb_flex">
											<label for="regEngineType">엔진형식</label> <input type="text"
												id="regEngineType" name="regEngineType" class="input"
												readonly />
										</div>
									</td>
								</tr>
								<tr style="display: none;">
									<th scope="col">연식</th>
									<td>
										<div class="tb_flex">
											<label for="regModelYear">연식</label> <input type="text"
												id="regModelYear" name="regModelYear" class="input" readonly />
										</div>
									</td>
								</tr>

							</table>
							<table class="tb rental_tb01">
								<tr>
									<th scope="col">예약 시작일 <span class="asterisk">*</span>
									</th>
									<td style='width: 200px;'>
										<div class="tb_flex">
											<label for="start-picker02">예약 시작일시</label> <input
												id="start-picker02" class="date" title="datepicker"
												aria-label="시작기간검색">
										</div>
									</td>
								</tr>
								<tr>
									<th scope="col">예약 종료일</th>
									<td>
										<div class="tb_flex">
											<label for="rsvEndTime">연식</label> <input type="text"
												id="rsvEndTime" name="rsvEndTime" class="input" readonly />
										</div>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class='btn_flex'>
				<button id='rentRegInsertBtn' class='blue_btn'>등록</button>
				<button class='gray_btn cancel_btn regPopupClose' type="submit"
					style="margin-right: 10px" value="Cancel">닫기</button>
			</div>
		</div>
	</div>
</div>

<div id="carPopup" class="sm_popup car_register02">
	<div id="carPopupBox" class="sm_box">
		<div class="popup_top">
			<h4>대여번호 찾기</h4>
			<div class="sm_close sm_close_btn carClose">
				<span></span> <span></span>
			</div>
		</div>
		<div class="content">
			<div class="search_wr">
				<div class="search_flex" style="display: flex; align-items: center;">
					<span style="font-size: 1.4rem;"></span> <label for="carSearchWrd"
						style="display: none">검색조건</label> <input id="carSearchWrd"
						class="input com_input" aria-label="검색조건 입력"
						placeholder="예약번호를 입력하세요">
					<button class="yellow_btn" id="carPopupSearchBtn">
						검색 <img src="${contextPath}/images/sub/ico_search02.png" alt="검색">
					</button>
				</div>
			</div>

			<div id="carTa" class="result">
				<table id="carGrid">
					<caption>대여번호 리스트</caption>
				</table>
			</div>
			<div class="btn_flex" style="margin-top: 80px;">
				<button id="carVhclRegNoVal" class="blue_btn resizeBox carClose">확인</button>
				<button class="gray_btn resizeBox carClose">취소</button>
			</div>
		</div>
	</div>
</div>



<div id="detailRsv" class="popup detail_popup popup_type02">
	<div class="box">
		<div class="popup_top">
			<h4>반복예약 상세</h4>
			<div class="close detailPopupClose">
				<span></span> <span></span>
			</div>
		</div>
		<div class="content">
			<div class="scrollBar02">
				<div class="contBox">
					<div class="nameBox nameBox-flex">
						<h4 class="name">반복예약 상세</h4>
					</div>
					<div class="cont cont-flex">
						<table class="tb rental_tb01">
							<tr>
								<th scope="col">대여번호</th>
								<td style='width: 200px;'>
									<div class="tb_flex">
										<label for="rsvedRentNo">대여번호</label> <input
											style='border-radius: 0px; border: 0px solid;' type="text"
											id="rsvedRentNo" name="rsvedRentNo" class="input" readonly />
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">차량번호</th>
								<td>
									<div class="tb_flex">
										<label for="rsvedCar">차량번호</label> <input
											style='border-radius: 0px; border: 0px solid;' type="text"
											id="rsvedCar" name="regCarmdl" class="input" readonly />
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">면허증</th>
								<td>
									<div class="tb_flex">
										<label for="rsvedDln">면허증</label> <input
											style='border-radius: 0px; border: 0px solid;' type="text"
											id="rsvedDln" name="rsvedDln" class="input" readonly />
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">면허종별</th>
								<td>
									<div class="tb_flex">
										<label for="rsvedModelYear">면허종별</label> <input
											style='border-radius: 0px; border: 0px solid;' type="text"
											id="rsvedModelYear" name="rsvedModelYear" class="input"
											readonly />
									</div>
								</td>
							</tr>
<!-- 							<tr> -->
<!-- 								<th scope="col">면허성명</th> -->
<!-- 								<td> -->
<!-- 									<div class="tb_flex"> -->
<!-- 										<label for="RsvedlcnsFlnm">면허성명</label> <input -->
<!-- 											style='border-radius: 0px; border: 0px solid;' type="text" -->
<!-- 											id="RsvedlcnsFlnm" name="RsvedlcnsFlnm" class="input" -->
<!-- 											readonly /> -->
<!-- 									</div> -->
<!-- 								</td> -->
<!-- 							</tr> -->
							<tr>
								<th scope="col">최종검증결과</th>
								<td>
									<div class="tb_flex">
										<label for="RsvedlastRst">최종 검증결과</label> <input
											style='border-radius: 0px; border: 0px solid;' type="text"
											id="RsvedlastRst" name="RsvedlastRst" class="input" readonly />
									</div>
								</td>
							</tr>

						</table>
						<table class="tb rental_tb01">
							<tr>
								<th scope="col">예약 시작일 <span class="asterisk">*</span>
								</th>
								<td style='width: 200px;'>
									<div class="tb_flex">
										<label for="start-picker03">예약 시작일시</label> <input
											id="start-picker03" class="date" title="datepicker"
											aria-label="시작기간검색">
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">예약 종료일</th>
								<td>
									<div class="tb_flex">
										<label for="rsvedEndTime">예약 종료일</label> <input
											style='border-radius: 0px; border: 0px solid;' type="text"
											id="rsvedEndTime" name="rsvedEndTime" class="input" readonly />
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">예약 주기</th>
								<td>
									<div class="tb_flex">
										<label for="rsvedPeriod"></label> <input id="rsvedPeriod"
											style="left:;">
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">다음 검증일시</th>
								<td>
									<div class="tb_flex">
										<label for="RsvedNtCfDt">다음 검증일자</label> <input
											style='border-radius: 0px; border: 0px solid;' type="text"
											id="RsvedNtCfDt" name="RsvedNtCfDt" class="input" readonly />
									</div>
								</td>
							</tr>
							<tr>
								<th scope="col">최종검증일자</th>
								<td>
									<div class="tb_flex">
										<label for="RsvedlastCfDt">최종 검증일자</label> <input
											style='border-radius: 0px; border: 0px solid;' type="text"
											id="RsvedlastCfDt" name="RsvedlastCfDt" class="input"
											readonly />
									</div>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class='btn_flex'>
				<button id='updateRsv' class='blue_btn'>수정</button>
				<button id='deleteRsv' class='blue_btn'
					style="background-color: #FF3838;">삭제</button>
				<button class='gray_btn cancel_btn detailPopupClose' type="submit"
					style="margin-right: 10px" value="Cancel">닫기</button>
			</div>
		</div>
	</div>
</div>



