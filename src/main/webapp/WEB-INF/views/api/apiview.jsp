<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/api/ApiView.js"></script>
<script>
	var Auth = "${AuthCd}";
	var UserId = "${UserId}";
	var getUserData = "${getUserData}";
 	var User 			= "${UserSn}";
</script>
<style>
.input .readOnlyGrayBtn {
	background-color: #f5f5f5;
}

.k-pager-wrap {
	margin-top: 0px
}

.subPage #container.api_use {
	padding: 170px 0 108px;
}

.api_page .use_wr {
	margin: 7px;
	display: flex;
	border-radius: 8px;
	overflow: hidden;
}

.api_page .use_wr .use_bx {
	width: calc(100%/ 3);
}

.api_page .use_wr ul.bx_01 {
	background-color: #4A64F7;
	border: 1px solid #4A64F7;
}

.api_page .use_wr ul.bx_02 {
	background-color: #F5F8FE;
	border: 1px solid #E8EDF8;
}

.api_page .use_wr ul.bx_03 {
	background-color: #57BEA2;
	border: 1px solid #57BEA2;
}

.api_page .use_wr ul.bx_04 {
	background-color: #EDF7F3;
	border: 1px solid #E8EDF8;
}

.api_page .use_wr ul.bx_05 {
	background-color: #DA864E;
	height: 100% !important;
	border: 1px solid #DA864E;
}

.api_page .use_wr ul.bx {
	padding: 29px 33px;
	height: calc(100%/ 2);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.api_page .use_wr ul.bx li {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 21px;
}

.api_page .use_wr ul.bx li:last-child {
	margin-bottom: 0;
}

.api_page .use_wr ul.bx span.name {
	font-size: 1.8rem;
	color: #fff;
	font-weight: bold;
}

.api_page .use_wr ul.bx_02 span.name {
	color: #575757;
}

.api_page .use_wr ul.bx_04 span.name {
	color: #575757;
}

.api_page .use_wr ul.bx .num_cont {
	font-size: 2.4rem;
	color: #fff;
	font-weight: bold;
}

.api_page .use_wr ul.bx_02 .num_cont {
	color: #575757;
}

.api_page .use_wr ul.bx_04 .num_cont {
	color: #575757;
}

.api_page .use_wr ul.bx .num_cont span.color1 {
	color: #4A64F7;
}

.api_page .use_wr ul.bx .num_cont span.color2 {
	color: #57BEA2;
}

.api_page .use_wr ul.bx p.p_cont {
	font-size: 1.5rem;
}

.api_page .use_wr ul.bx_01 p.p_cont {
	color: #C6D8FF;
}

.api_page .use_wr ul.bx_03 p.p_cont {
	color: #E8FFF9;
}

.api_page .use_wr ul.bx_04 p.p_cont {
	color: #5C776F;
}

.api_page .use_wr ul.bx_05 p.p_cont {
	color: #FFDBC1;
}

.api_page .popup.detail_popup .box {
	height: 650px;
}

@media ( max-width :768px) {
	.api_page .use_wr {
		margin: 25px;
	}
}

@media ( max-width :640px) {
	.api_page .year_picker {
		flex-direction: column;
		align-items: flex-start;
	}
	.api_page .year_picker span.name {
		font-size: 1.6rem;
	}
	.api_page .use_wr {
		margin: 21px 0 0;
	}
}

@media ( max-width :540px) {
	.api_page .use_wr {
		flex-direction: column;
	}
	.api_page .use_wr .use_bx {
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 6px;
		border-radius: 8px;
		overflow: hidden;
	}
	.api_page .use_wr .use_bx:last-child {
		margin-bottom: 0;
	}
	.api_page .use_wr ul.bx {
		width: calc(100%/ 2);
		min-height: 101px;
		padding: 16px 20px;
	}
	/* .api_page .use_wr ul.bx_01{border-radius: 8px 0 0 8px;} */
	.api_page .use_wr ul.bx_05 {
		width: 100% !important;
	}
}

@media ( max-width :480px) {
	.api_page .use_wr ul.bx span.name {
		font-size: 1.6rem;
	}
	.api_page .use_wr ul.bx .num_cont {
		font-size: 2rem;
	}
	.api_page .popup.detail_popup .box {
		height: 580px;
	}
}

@media ( max-width :400px) {
	.api_page .use_wr ul.bx {
		height: 95px;
	}
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

			<div class="selec_wr" id="search_area" style="margin-bottom: 20px;">
				<div class="mo_flex">
					<ul class="selec_box">
						<!-- 						<li class="li_slec"><label for="start-date"></label> <input -->
						<!-- 							id="start-picker02"></li> -->
						<!-- 						<li class="li_slec"><label for="end-date"></label> <input -->
						<!-- 							id="end-picker02"></li> -->
						<!-- 							<li class="li_slec"> -->
						<!-- 								<div class="dropdown"> -->
						<!-- 									<label for="search_stts_cd">API명</label> -->
						<!-- 								</div> -->
						<!-- 							</li> -->
						<li class="li_slec" id="search">
							<div class="dropdown">
								<label for="search_stts_cd2"></label> <input
									id="search_stts_cd2">
							</div>
						</li>
						<li class="li_slec">
							<div class="dropdown">
								<label for="search_stts_cd"></label> <input id="search_stts_cd">
							</div>
						</li>
						<li class="li_slec" id="search_box1"><label for="search_box"></label>
							<input id="search_box" class="input" aria-label="검색어를 입력하세요"
							placeholder="검색어를 입력하세요"></li>

					</ul>
					<button class="yellow_btn" id="userMngBtnSearch" type="button"
						style="width: 80px;">
						조회<img src="${contextPath}/images/sub/ico_search02.png"
							alt="조회아이콘" />
					</button>
				</div>
			</div>
			<div class="use_wr">
				<div class="use_bx">
					<ul class="bx bx_01">
						<li><span class="name">신청</span> <!-- 							<div id= "APiapplication" class="num_cont"></div> -->
							<span id="APiapplication" class="num_cont"></span></li>
						<li>
							<p class="p_cont">신청중인 단계</p>
						</li>
					</ul>
					<ul class="bx bx_02">
						<li><span class="name">보류</span>
							<div class="num_cont">
								<span id="ApiHold" class="color1"></span>
							</div></li>
						<li><span class="name">반려</span>
							<div id="ApiReject" class="num_cont"></div></li>
					</ul>
				</div>
				<div class="use_bx">
					<ul class="bx bx_03">
						<li><span class="name">활용</span>
							<div id="ApiUse" class="num_cont"></div></li>
						<li>
							<p class="p_cont">승인되어 활용중인 단계</p>
						</li>
					</ul>
					<ul class="bx bx_04">
						<li><span class="name">변경신청</span>
							<div class="num_cont">
								<span id="ApiChange" class="color2"></span>
							</div></li>
						<li>
							<p class="p_cont">신청중인 단계</p>
						</li>
					</ul>
				</div>

				<div class="use_bx">
					<ul class="bx bx_05">
						<li><span class="name">중지</span>
							<div id="ApiStop" class="num_cont">건</div></li>
						<li>
							<p class="p_cont">중지 신청하여 운영이 중지된 단계</p>
						</li>
					</ul>
				</div>
			</div>


			<div class="contBox">
				<div class="contBox lastBox02" id="tabview1">
					<div class="nameBox nameBox-flex">
						<h4 class="name">API 이용 이력</h4>
					</div>
					<table id="grid">
					</table>
				</div>
				<div class="popup detail_popup popup_type02" id="detail_popup">
					<div class="box">
						<div class="popup_top">
							<h4>API이용 상세</h4>
							<div class="close userPagePopupClose"
								onclick=$openapi.ui.closePopupAndRefreshGrid(${data[0].apiSn})>
								<span></span> <span></span>
							</div>
						</div>
						<div class="content">
							<div class="scrollBar02">
								<div class="info_wr" id="detail_popup">
									<div class="cont cont-flex">
										<table class="tb rental_tb01">
											<caption>API 이용 현황</caption>
											<tr>
												<th scope="col">상태</th>
												<td>
													<div class="tb_flex">
														<label for="user_auth">상태</label> <input
															id="detail_api_stt" class="input readOnlyGrayBtn"
															aria-label="상태" readOnly>
													</div>
												</td>
											</tr>
											<tr>
												<th scope="col">신청일</th>
												<td><label for="user_id">신청일</label> <input
													id="detail_api_sbmd" class="input readOnlyGrayBtn"
													aria-label="신청일" readOnly></td>
											</tr>
											<tr>
												<th scope="col">만료 예정일</th>
												<td><label for="user_phone">만료 예정일</label> <input
													id="detail_assi_exd" class="input readOnlyGrayBtn"
													aria-label="만료 예정일" readOnly></td>
											</tr>
											<tr>
												<th scope="col">제공자</th>
												<td><label for="user_phone">원제공자</label> <input
													id="detail_platformNm" class="input readOnlyGrayBtn"
													aria-label="원제공자" readOnly></td>
											</tr>
										</table>
										<table class="tb rental_tb01">
											<caption>API 이용 현황</caption>
											<tr>
												<th scope="col">API명</th>
												<td>
													<div class="tb_flex">
														<label for="user_auth">상태</label> <input
															id="detail_api_nm" class="input readOnlyGrayBtn"
															aria-label="상태" readOnly>
													</div>
												</td>
											</tr>
											<tr>
												<th scope="col">이용건수</th>
												<td><label for="user_id">신청일</label> <input
													id="detail_api_use_cnt" class="input readOnlyGrayBtn"
													aria-label="신청일" readOnly></td>
											</tr>
											<tr>
												<th scope="col">반려일시</th>
												<td><label for="user_phone">반려일시</label> <input
													id="detail_api_rjctDt" class="input readOnlyGrayBtn"
													aria-label="반려 일시" readOnly></td>
											</tr>
											<tr>
												<th scope="col">반려사유</th>
												<td><label for="user_phone">반려사유</label> <input
													id="detail_api_rjctRsn" class="input readOnlyGrayBtn"
													aria-label="반려사유" readOnly></td>
											</tr>
											<tr>
												<th scope="col">반려처리자</th>
												<td><label for="user_phone">만료 예정일</label> <input
													id="detail_api_rjctUserSn" class="input readOnlyGrayBtn"
													aria-label="만료 예정일" readOnly></td>
											</tr>
										</table>
									</div>
									<div class="contBox">
										<div class="contBox lastBox02" id="tabview1">
											<div class="nameBox nameBox-flex">
												<h4 class="name">API 이용 이력</h4>
												<ul class="selec_box">
													<li class="li_slec"><label for="start-date"></label> <input
														id="end-picker02"></li>
												</ul>
											</div>
											<table id="grid2">
											</table>
										</div>
									</div>
								</div>
							</div>
							<div class='btn_flex'>
								<button id='apiUseStopBtn' class='blue_btn ' value="Update"
									onClick=$openapi.ui.stopUseApi(${data[0].apiSn})>사용중지</button>
								<button id='apiReUseBtn' class='blue_btn' value="Update"
									onClick=$openapi.ui.ReUse(${data[0].apiSn})>중지해제</button>
								<button id='apiUseExtensionBtn' class='blue_btn' value=""
									style="margin-right: 10px"
									onClick=$openapi.ui.extenUseApi(${data[0].apiSn})>기간연장</button>
								<button class='gray_btn cancel_btn userPagePopupClose'
									type="submit" style="margin-right: 10px" value="Cancel"
									onclick=$openapi.ui.closePopupAndRefreshGrid(${data[0].apiSn})>닫기</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

