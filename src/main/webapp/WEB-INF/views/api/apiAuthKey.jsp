<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/api/ApiAuthKey.js"></script>
<script>
	var UserSn = "<c:out value='${UserSn}'/>";
	var authrtCd = "<c:out value='${authrtCd}'/>";
</script>
<style>
.k-grid td {
	white-space: normal !important;
	word-wrap: break-word;
}

.red_btn {
	width: 100%;
	height: 54px;
	background-color: #e04e36;
	border-radius: 8px;
	font-size: 1.8rem;
	line-height: 26px;
	color: #fff;
	text-align: center;
	font-weight: 500;
}

.api_page .api_list {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
}

.api_page ul.tabs {
	padding: 37px;
	width: 30%;
	height: 100%;
	min-height: 623px;
	margin-right: 16px;
	background-color: #F5F8FE;
}

.api_page ul.tabs li {
	margin-bottom: 18px;
}

.api_page ul.tabs li:last-child {
	margin-bottom: 0;
}

.api_page ul.tabs li button {
	position: relative;
	font-size: 1.8rem;
	font-weight: 500;
	color: #000;
	white-space: nowrap;
}

.api_page ul.tabs li.current button {
	color: #00127B;
	font-weight: bold;
}

.api_page .tab_cont {
	position: relative;
	text-align: center;
	padding: 37px;
	width: 70%;
}

.api_page .tab-content {
	display: none;
}

.api_page .tab-content.current {
	display: inherit;
}

.api_page ul.api_cont li {
	display: flex;
	align-items: flex-start;
	margin-bottom: 32px;
}

.api_page .tit {
	font-size: 1.6rem;
	color: #000;
	font-weight: 600;
	text-align: left;
	width: 123px;
	margin-right: 40px;;
}

.api_page .t_cont {
	font-size: 1.6rem;
	color: #9FA1A2;
	width: 100%;
	text-align: left;
}

.api_page ul.api_cont .btn_flex {
	margin-top: 0;
}

.api_page .tb_wr {
	width: 100%;
}

.api_page table.api_tb {
	width: 100%;
	background-color: #fff;
	border-radius: 5px;
	border-style: hidden;
	box-shadow: 0 0 0 1px #E8EDF8;
}

.api_page table.api_tb tr th, .api_page table.api_tb tr td {
	border: 1px solid #E8EDF8;
}

.api_page table.api_tb tr th {
	font-size: 1.5rem;
	color: #989898;
	padding: 15px 12px;
}

.api_page table.api_tb tr td {
	font-size: 1.6rem;
	color: #000;
	padding: 13px 12px;
}

@media ( max-width :1280px) {
	.api_page ul.tabs {
		min-height: 718px;
	}
}

@media ( max-width :960px) {
	.api_page ul.tabs {
		min-height: 754px;
	}
}

@media ( max-width :820px) {
	.api_page ul.tabs {
		min-height: 754px;
	}
}

@media ( max-width :768px) {
	.api_page ul.tabs {
		min-height: 679px;
	}
	.api_page .tit {
		width: 70px;
		margin-right: 20px;
	}
}

@media ( max-width :680px) {
	.api_page .api_list {
		flex-direction: column;
	}
	.api_page ul.tabs {
		width: 100%;
		margin-right: 0;
		min-height: auto;
		margin-bottom: 15px;
	}
	.api_page .tab_cont {
		width: 100%;
	}
}

@media ( max-width :550px) {
	.api_page ul.tabs {
		padding: 25px 18px;
	}
	.api_page .tab_cont {
		padding: 25px 18px;
	}
	.api_page table.api_tb tr th {
		padding: 13px 10px;
	}
	.api_page table.api_tb tr td {
		padding: 11px 10px;
	}
}

@media ( max-width :480px) {
	.api_page ul.tabs li {
		margin-bottom: 12px;
	}
	.api_page ul.api_cont li {
		flex-direction: column;
	}
	.api_page .tit {
		width: 100%;
		margin-right: 0;
		margin-bottom: 12px;
	}
}

@media ( max-width :420px) {
	.api_page table.api_tb tr th {
		padding: 10px 4px;
	}
	.api_page table.api_tb tr td {
		padding: 8px 4px;
	}
}

button.gray_btn:hover {
	cursor: default;
	color: black;
	background-color: #DEDEDE;
}

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
	width: calc(100%/ 2);
}
#DevuseClick{
    background-color: #939393;
    border: #939393;
}
#DevuseClick{
    background-color: #939393;
    border: #939393;
}
#DevstopClick{
    background-color: #D2D2D2;
    border: #D2D2D2;
}

/* .api_page .use_wr ul.bx_01 { */
/* 	background-color: #4A64F7; */
/* 	border: 1px solid #4A64F7; */
/* } */

/* .api_page .use_wr ul.bx_02 { */
/* 	background-color: #F5F8FE; */
/* 	border: 1px solid #E8EDF8; */
/* } */

/* .api_page .use_wr ul.bx_03 { */
/* 	background-color: #57BEA2; */
/* 	border: 1px solid #57BEA2; */
/* } */

/* .api_page .use_wr ul.bx_04 { */
/* 	background-color: #EDF7F3; */
/* 	border: 1px solid #E8EDF8; */
/* } */
.api_page .use_wr ul.bx_05_01 {
	background-color: #4A64F7;
	height: 100% !important;
	border: 1px solid #4A64F7;
}

.api_page .use_wr ul.bx_02 {
	background-color: #EDF7F3;
	height: 100% !important;
	border: 1px solid #EDF7F3;
}

.api_page .use_wr ul.bx_05_03 {
	background-color: #57BEA2;
	height: 100% !important;
	border: 1px solid #57BEA2;
}

.api_page .use_wr ul.bx_05 {
	background-color: #DA864E;
	height: 100% !important;
	border: 1px solid #DA864E;
}

.api_page .use_wr ul.bx {
	width: 100% !important;
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
				<div>
					<div class="tit01">
						<img src="<c:out value='${contextPath}/images/sub/ico_tit.png'/>"
							alt="타이틀아이콘" class="ico_tit">
						<h2>
							<span class="t_txt"><c:out value='${tableName}' /></span>
						</h2>
					</div>

				</div>
				<ul class="tit02">
					<li class="home"><img
						src="<c:out value='${contextPath}/images/sub/ico_home.png'/>"
						alt="홈아이콘"></li>
					<li class="mid"><img
						src="<c:out value='${contextPath}/images/sub/ico_menuLine.png'/>"
						alt="라인"></li>
					<li>오픈 API</li>
					<li class="mid"><img
						src="<c:out value='${contextPath}/images/sub/ico_menuLine.png'/>"
						alt="라인"></li>
					<li class="current"><c:out value='${tableName}' /></li>
				</ul>
			</div>
			<div class="selec_wr" id="managerSearch" style="margin-bottom: 20px;">
				<div class="mo_flex">
					<ul class="selec_box">
						<li class="li_slec"><label for="start-date"></label> <input
							id="start-picker02"></li>
						<li class="li_slec"><label for="end-date"></label> <input
							id="end-picker02"></li>
						<!-- 						<li class="li_slec"> -->
						<!-- 							<div class="dropdown"> -->
						<!-- 								<label for="sttsDrop"></label> <input id="sttsDrop"> -->
						<!-- 							</div> -->
						<!-- 						</li> -->
						<li class="li_slec">
							<div class="dropdown">
								<label for="searchCondition"></label> <input
									id="searchCondition">
							</div>
						</li>
						<li class="li_slec"><label for="search_box"></label> <input
							id="search_box" class="input" aria-label="API명를 입력하세요"
							placeholder=""></li>

					</ul>
					<button class="yellow_btn" id="BtnSearch" type="button"
						style="width: 80px;">
						조회<img src="${contextPath}/images/sub/ico_search02.png"
							alt="검색아이콘" />
					</button>
				</div>
			</div>
			<div class="selec_wr" id="userSearch" style="margin-bottom: 20px;">
				<div class="mo_flex">
					<ul class="selec_box">
						<li class="li_slec">
							<div class="dropdown">
								<label for="sttsDrop"></label> <input id="sttsDrop2">
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="use_wr">
				<div class="use_bx">
					<ul class="bx bx_05_01" id="applicationClick">
						<li><span class="name">신청</span>
						 <!-- 							<div id= "APiapplication" class="num_cont"></div> -->
							<span id="APiapplication" class="num_cont"></span></li>
						<li>
							<p class="p_cont">신청중인 단계</p>
						</li>
					</ul>
				</div>
				<div class="use_bx">
					<ul class="bx bx_05_03" id="useClick">
						<li><span class="name">활용</span>
							<div id="ApiUse" class="num_cont"></div></li>
						<li>
							<p class="p_cont">승인되어 활용중인 단계</p>
						</li>
					</ul>
				</div>
				<div class="use_bx">
					<ul class="bx bx_02" id="rejectClick">
						<li><span class="name">반려</span>
							<div id="ApiReject" class="num_cont"></div></li>
						<li>
							<p class="p_cont">반려된 신청</p>
						</li>
					</ul>
				</div>
				<div class="use_bx">
					<ul class="bx bx_05" id="stopClick">
						<li><span class="name">중지</span>
							<div id="ApiStop" class="num_cont">건</div></li>
						<li>
							<p class="p_cont">중지 신청하여 운영이 중지된 단계</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="use_wr">
<!-- 				<div class="use_bx"> -->
<!-- 					<ul class="bx bx_05_01" id="applicationClick"> -->
<!-- 						<li><span class="name">신청</span> -->
<!-- 						 							<div id= "APiapplication" class="num_cont"></div> -->
<!-- 							<span id="APiapplication" class="num_cont"></span></li> -->
<!-- 						<li> -->
<!-- 							<p class="p_cont">신청중인 단계</p> -->
<!-- 						</li> -->
<!-- 					</ul> -->
<!-- 				</div> -->
				<div class="use_bx">
					<ul class="bx bx_05_03" id="DevuseClick">
						<li><span class="name">개발 활용</span>
							<div id="DevApiUse" class="num_cont"></div></li>
						<li>
							<p class="p_cont">승인되어 활용중인 개발키</p>
						</li>
					</ul>
				</div>
<!-- 				<div class="use_bx"> -->
<!-- 					<ul class="bx bx_02" id="rejectClick"> -->
<!-- 						<li><span class="name">반려</span> -->
<!-- 							<div id="ApiReject" class="num_cont"></div></li> -->
<!-- 						<li> -->
<!-- 							<p class="p_cont">반려된 신청</p> -->
<!-- 						</li> -->
<!-- 					</ul> -->
<!-- 				</div> -->
				<div class="use_bx">
					<ul class="bx bx_05" id="DevstopClick">
						<li><span class="name">개발 중지</span>
							<div id="DevApiStop" class="num_cont">건</div></li>
						<li>
							<p class="p_cont" style = "color:#2C2C2C;">중지된 개발키 </p>
						</li>
					</ul>
				</div>
			</div>
			<div class="contBox">
				<div class="nameBox" style="display: flex; align-items: center;">
					<h4 class="name">
						<c:out value='${tableName}' />
					</h4>
				</div>

				<table id="operator_grid">
					<caption>인증키 현황 조회</caption>
				</table>

				<script id="op-gird-row" type="text/x-kendo-tmpl">
                        <tr data-uid="#: uid #">
                            <td scope="row">#: key1#</td>
                            <td>#: key2#</td>
                            <td>#: key3#</td>
                            <td>#: key4#</td>
                        </tr>
                </script>
			</div>
			<div class="btn_flex" style="margin-top: 70px;">
				<button class="blue_btn reissuance" style="display: none;">재발급</button>
				<button class="blue_btn apply" style="display: none;">신청하기</button>
				<button class="blue_btn ReApi" style="display: none;">신청하기</button>
				<button class="blue_btn extend" style="display: none;">연장하기</button>
				<button class="gray_btn Applying" style="display: none;">신청중</button>
				<button class="gray_btn TestKey" style="display: none;">개발키
					신청</button>
			</div>
		</div>
	</div>
</div>
