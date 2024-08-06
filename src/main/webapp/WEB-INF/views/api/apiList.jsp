<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/api/ApiList.js"></script>
<script>
	var User = ${UserSn};
	var authrtCd = "${authrtCd}";
</script>
<style>
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
/* 	color: #00127B; */
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
		display : flex;
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
</style>

<div class="subPage api_page">
	<!-- 콘텐츠 시작 -->
	<div id="container">
		<div class="wrap">
			<div class="titBox">
				<div>
					<div class="tit01">
						<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘"
							class="ico_tit">
						<h2>
							<span class="t_txt"><c:out value='${tableName}'/></span>
						</h2>
					</div>

				</div>
				<ul class="tit02">
					<li class="home"><img
						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li>오픈 API</li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li class="current"><c:out value='${tableName}' /></li>
				</ul>
			</div>


			<div class="api_list">
				<ul class="tabs contBox">
					<li class="tab-link current" data-tab="tab-1"><button
							id="ApiNm"></button></li>
				</ul>
				<div class="contBox tab_cont">
					<div id="tab-1" class="tab-content current">
						<ul class="api_cont">
							<li>
								<div class="tit">API 설명</div>
								<div id="ApiExplain" class="t_cont">-</div>
							</li>
							<li>
								<div class="tit">요청주소</div>
								<div id="apiAdr" class="t_cont">-</div>
							</li>
							<li>
								<div class="tit">요청정보</div>
								<div class="tb_wr">
									<table id="apiRequest" class="api_tb">
										<colgroup>
											<col style="width: 20%">
											<col style="width: 20%">
											<col style="width: 20%">
											<col style="width: 40%">
										</colgroup>
										<caption>요청정보</caption>
										<thead>
											<tr>
												<th>-</th>
												<th>-</th>
												<th>-</th>
												<th>-</th>
											</tr>
										</thead>
										<tbody id="Forrequest">
											<tr>
												<td id="paramRequest">-</td>
												<td id="viRequest">-</td>
												<td id="YnRequest">-</td>
												<td id="ExplainRequest">-</td>
											</tr>
										</tbody>
									</table>
								</div>
							</li>
							<li>
								<div class="tit">응답정보</div>
								<div class="tb_wr">
									<table id="ApiResponse" class="api_tb">
										<colgroup>
											<col style="width: 30%">
											<col style="width: 30%">
											<col style="width: 40%">
										</colgroup>
										<caption>응답정보</caption>
										<thead>
											<tr>
												<th>-</th>
												<th>-</th>
												<th>-</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td id="paramResponse">-</td>
												<td id="viResponse">-</td>
												<td id="ExplainResponse">-</td>
											</tr>
										</tbody>
									</table>
								</div>
							</li>
						</ul>
						<div>
							<div class="tit" id="sttsName" style = "display: contents; font-size: 24px;"></div> 
						</div>
						<div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
