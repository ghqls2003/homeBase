<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/usgStt/usgStt.js"></script>

<script>
	var menuCd = "${menuCd}";
</script>


<style>
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


<div class="subPage sub03">

	<!-- 콘텐츠 시작 -->
	<div id="container">
		<div class="wrap">

			<!-- title -->
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
					<li>시스템관리</li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인" /></li>
					<li class="current"><c:out value='${tableName}' /></li>
				</ul>
			</div>

			<!-- 조회조건 -->
			<div class="search_top" id="search_box1">
				<input type="hidden" id="elxExcelDownReason" name="excelDownReason" />
				<div class="selec_wr">
					<div class="mo_flex">
						<div class="year_picker">
							<ul class="yearBox">
								<li class="mo_li"><label for="start-picker01">시작기간</label>
									<input id="start-picker01" title="datepicker"
									aria-label="시작기간조회"></li>
								<li class="bar">-</li>
								<li class="mo_li"><label for="end-picker01">종료기간</label> <input
									id="end-picker01" title="datepicker" aria-label="종료기간조회">
								</li>
							</ul>
						</div>
						<ul class="selec_box">
							<li class="li_slec"><label for="search_box"></label> <input
								type="text" id="searchOwn" class="searchWrd input"
								placeholder="유저아이디를 입력하세요."></li>
							<li class="li_slec"><label for="search_box"></label> <input
								type="text" id="searchTwo" class="searchWrd input"
								placeholder="이름을 입력하세요."></li>
							<li class="li_slec">
								<div class="dropdown">
									<label for="search_type_cd"></label> <input id="search_type_cd">
								</div>
							</li>
							<li class="li_slec">
								<div class="dropdown">
									<label for="search_type_cd6"></label> <input id="search_type_cd6">
								</div>
							</li>
<!-- 							<li class="li_slec"> -->
<!-- 								<div class="dropdown"> -->
<!-- 									<label for="privateYn"></label> <input id="privateYn"> -->
<!-- 								</div> -->
<!-- 							</li> -->
<!-- 							<li class="li_slec"><label for="search_box"></label> -->
<!-- 								<div -->
<!-- 									style="margin-top: 9px; padding-left: 17px; width: 400px; float: left;"> -->
<!-- 									<input type="checkbox" id="chkExtWrk" class="k-checkbox"> -->
<!-- 									<label class="k-checkbox-label" for="chkExtWrk">근무시간 -->
<!-- 										외(평일 00시~06시, 주말) 접속</label> -->
<!-- 								</div> <input type="hidden" id="extwrk" name="extwrk"></li> -->
						</ul>
					</div>
					<!-- 					<div class="mo_flex"> -->
					<!-- 						<ul class="selec_box"> -->
					<!-- 							<li class="li_slec"> -->
					<!-- 								<div class="dropdown"> -->
					<!-- 									<label for="privateYn"></label> <input id="privateYn"> -->
					<!-- 								</div> -->
					<!-- 							</li> -->
					<!-- 							<li class="li_slec"><label for="search_box"></label> <input -->
					<!-- 								style="width: 100px;" type="text" class="searchWrd input" -->
					<!-- 								id="inqireCo" name="inqireCo" placeholder="조회건수 (건 이상)" -->
					<!-- 								style="width: 65px;" /></li> -->
					<!-- 							<li class="li_slec"><label for="search_box"></label> -->
					<!-- 								<div -->
					<!-- 									style="margin-top: 9px; padding-left: 17px; width: 400px; float: left;"> -->
					<!-- 									<input type="checkbox" id="chkExtWrk" class="k-checkbox"> -->
					<!-- 									<label class="k-checkbox-label" for="chkExtWrk">근무시간 -->
					<!-- 										외(평일 00시~06시, 주말) 접속</label> -->
					<!-- 								</div> <input type="hidden" id="extwrk" name="extwrk"></li> -->
					<!-- 						</ul> -->
					<!-- 					</div> -->
					<button class="yellow_btn" id="searchBtn">
						조회<img src="${contextPath}/images/sub/ico_search02.png"
							alt="조회아이콘">
					</button>
				</div>
			</div>

			<div class="search_top" id="search_box2">
				<div class="selec_wr">
					<div class="mo_flex">
						<div class="year_picker">
							<ul class="yearBox">
								<li class="mo_li"><label for="start-picker01">시작기간</label>
									<input id="start-picker03" title="datepicker"
									aria-label="시작기간조회"></li>
								<li class="bar">-</li>
								<li class="mo_li"><label for="end-picker02">종료기간</label> <input
									id="end-picker03" title="datepicker" aria-label="종료기간조회">
								</li>
							</ul>
						</div>
						<ul class="selec_box">
							<li class="li_slec">
								<div class="dropdown">
									<label for="search_type_cd2"></label> <input
										id="search_type_cd2">
								</div>
							</li>
							<li class="li_slec"><label for="search_box"></label> <input
								type="text" id="searchOwn2" class="searchWrd input"
								placeholder="조회어를 입력하세요."></li>
						</ul>
					</div>
					<button class="yellow_btn" id="searchBtn2">
						조회<img src="${contextPath}/images/sub/ico_search02.png"
							alt="조회아이콘">
					</button>
				</div>
			</div>

			<div class="search_top" id="search_box3">
				<div class="selec_wr">
					<div class="mo_flex">
						<div class="year_picker">
							<ul class="yearBox">
								<li class="mo_li"><label for="start-picker01">시작기간</label>
									<input id="start-picker02" title="datepicker"
									aria-label="시작기간조회"></li>
								<li class="bar">-</li>
								<li class="mo_li"><label for="end-picker02">종료기간</label> <input
									id="end-picker02" title="datepicker" aria-label="종료기간조회">
								</li>
							</ul>
						</div>
						<ul class="selec_box">
							<li class="li_slec">
								<div class="dropdown">
									<label for="search_type_cd"></label> <input
										id="search_type_cd3">
								</div>
							</li>
							<li class="li_slec"><label for="search_box"></label> <input
								type="text" id="searchOwn3" class="searchWrd input"
								placeholder="조회어를 입력하세요."></li>
							<!-- 							<li class="li_slec"><label for="search_box"></label> <input -->
							<!-- 								type="text" id="searchTwo3" class="searchWrd input" -->
							<!-- 								placeholder="성명을 입력하세요."></li> -->
						</ul>
					</div>
					<button class="yellow_btn" id="searchBtn3">
						조회<img src="${contextPath}/images/sub/ico_search02.png"
							alt="조회아이콘">
					</button>
				</div>
			</div>

			<div class="search_top" id="search_box4">
				<div class="selec_wr">
					<div class="mo_flex">
						<div class="year_picker">
							<ul class="yearBox">
								<li class="mo_li"><label for="start-picker01">시작기간</label>
									<input id="start-picker04" title="datepicker"
									aria-label="시작기간조회"></li>
								<li class="bar">-</li>
								<li class="mo_li"><label for="end-picker02">종료기간</label> <input
									id="end-picker04" title="datepicker" aria-label="종료기간조회">
								</li>
							</ul>
						</div>
						<ul class="selec_box">
							<li class="li_slec">
								<div class="dropdown">
									<label for="search_type_cd"></label> <input
										id="search_type_cd4">
								</div>
							</li>
							<li class="li_slec">
								<div class="dropdown">
									<label for="search_type_cd"></label> <input
										id="search_type_cd5">
								</div>
							</li>
							<li class="li_slec"><label for="search_box"></label> <input
								type="text" id="searchOwn4" class="searchWrd input"
								placeholder="유저 아이디를 입력하세요."></li>
							<!-- 							<li class="li_slec"><label for="search_box"></label> <input -->
							<!-- 								type="text" id="searchTwo3" class="searchWrd input" -->
							<!-- 								placeholder="성명을 입력하세요."></li> -->
						</ul>
					</div>
					<button class="yellow_btn" id="searchBtn4">
						조회<img src="${contextPath}/images/sub/ico_search02.png"
							alt="조회아이콘">
					</button>
				</div>
			</div>

			<!-- 자격확인 이력 그리드 -->
			<div class="contBox lastBox lastBox02">
				<div class="nameBox nameBox-flex">
					<ul class="horizontal-list"
						style="list-style: none; padding: 0; display: flex; justify-content: space-between;">
						<li style="width: 80px;"><a href="javascript:void(0)"
							id="tabBtn02" class="on">메뉴별 통계</a></li>
						<li style="width: 120px;"><a href="javascript:void(0)"
							id="tabBtn03">사용자별이용횟수</a></li>
						<li style="width: 90px;"><a href="javascript:void(0)"
							id="tabBtn01">건별접속이력</a></li>
						<li style="width: 80px;"><a href="javascript:void(0)"
							id="tabBtn04">로그인 로그</a></li>
					</ul>
					<!-- 			        <button class="download-btn" onClick={clickExcelBtn}> -->
					<%-- 			            <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘" /> --%>
					<!-- 			            엑셀 -->
					<!-- 			        </button> -->
				</div>
				<div class="contBox lastBox02" id="tabview1">
					<div class="nameBox nameBox-flex">
						<h4 class="name">건별접속이력</h4>
						<button class="download-btn excelDownBtn"
							id="historylistViewExcel">
							<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘" />
							엑셀
						</button>
					</div>
					<table id="grid">
					</table>
				</div>
				<div class="contBox lastBox02" id="tabview2"">
					<div class="nameBox nameBox-flex">
						<h4 class="name">메뉴별 통계 이력</h4>
						<button class="download-btn excelDownBtn"
							id="usercnctListViewExcel">
							<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘" />
							엑셀
						</button>
					</div>
					<table id="usercnctListView"></table>
				</div>
				<div class="contBox lastBox02" id="tabview3">
					<div class="nameBox nameBox-flex">
						<h4 class="name">사용자별이용횟수</h4>
						<button class="download-btn excelDownBtn"
							id="cnctHistListViewExcel">
							<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘" />
							엑셀
						</button>
					</div>
					<table id="cnctHistListView"></table>
				</div>
				<div class="contBox lastBox02" id="tabview4">
					<div class="nameBox nameBox-flex">
						<h4 class="name">로그인 로그</h4>
						<button class="download-btn excelDownBtn" id="loginViewExcel">
							<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘" />
							엑셀
						</button>
					</div>
					<table id="loginView"></table>
				</div>
				<!-- 				<div class="contBox lastBox02" id="tabview5"> -->
				<!-- 					<div class="nameBox nameBox-flex"> -->
				<!-- 						<h4 class="name">API 이용현황</h4> -->
				<!-- 						<button class="download-btn excelDownBtn" id="loginViewExcel"> -->
				<%-- 							<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘" /> --%>
				<!-- 							엑셀 -->
				<!-- 						</button> -->
				<!-- 					</div> -->
				<!-- 					<table id="loginView"></table> -->
				<!-- 				</div> -->
			</div>

		</div>
	</div>