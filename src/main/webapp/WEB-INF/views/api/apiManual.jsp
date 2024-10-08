<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<script
	src="
https://cdn.jsdelivr.net/npm/swiper@10.2.0/swiper-bundle.min.js
"></script>
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
<script
	src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>

<script src="<c:out value='${contextPath}/js/api/ApiManual.js'/>"></script>
<style>
.api_page .contBox .cont {
	padding: 40px 44px 35px;
}

.swiper-slide img {
	max-width: 65%;
	height: auto;
}

.swiper-slide {
	display: flex;
	justify-content: center;
	align-items: center;
}

.api_page.guide .btn_flex {
	margin-top: 73px;
}

.api_page p.guide_info {
	font-size: 1.8rem;
	font-weight: 500;
	color: #000;
	line-height: 26px;
}

.api_page ul.method_wr {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 33px;
}

.api_page ul.method_wr li.mid {
	margin: -70px 48px 0;
}

.api_page ul.method_wr li .img_bx {
	width: 99px;
	height: 99px;
	background-color: #F5F8FE;
	border: 1px solid #DBE0EC;
	border-radius: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
}

.api_page ul.method_wr li p {
	font-size: 1.6rem;
	font-weight: 500;
	color: #040404;
	line-height: 26px;
	text-align: center;
	margin-top: 11px;
}

@media ( max-width :1500px) {
	.api_page .contBox .cont {
		padding: 32px 28px 25px;
	}
}

@media ( max-width :680px) {
	.swiper-slide img {
		max-width: 100%;
		height: auto;
	}
	.api_page p.guide_info {
		line-height: 22px;
	}
	.api_page ul.method_wr li.mid {
		margin: -60px 15px 0;
	}
	.api_page ul.method_wr li p {
		line-height: 22px;
	}
}

@media ( max-width :640px) {
	.swiper-slide img {
		max-width: 100%;
		height: auto;
	}
	.api_page .contBox .cont {
		padding: 22px 18px;
	}
}

@media ( max-width :480px) {
	.swiper-slide img {
		max-width: 100%;
		height: auto;
	}
	.api_page p.guide_info {
		font-size: 1.6rem;
	}
	.api_page ul.method_wr li p {
		font-size: 1.5rem;
		line-height: 18px;
	}
	.api_page ul.method_wr li p br {
		display: none;
		word-break: keep-all;
	}
}

<
style>.swiper {
	width: 100%;
	height: 100%;
}

.swiperContent {
	height: 100%;
}

.manual_btn {
	width: 152px;
	height: 54px;
	background-color: #DEDEDE;
	border-radius: 8px;
	font-size: 1.8rem;
	font-weight: 500;
	color: #000;
}

.manual_btn:hover {
	background-color: #ccc;
}

/* 파란색 버튼 스타일 */
.manual_btn.active {
	background-color: #364BC6;
	color: white;
}

.horizontal-list2 {
	background-color: white;
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

.Move_btn {
	font-size: medium;
	background-color: #fff8df;
	color: #9D5F01;
	border: none;
	display: flex;
	align-items: center;
	padding: 8px 16px;
	border-radius: 5px;
	transition: background-color 0.3s ease, color 0.3s ease;
	cursor: pointer;
	display: flex;
}

.Move_btn img {
	margin-right: 5px;
}

.Move_btn:hover {
	background-color: black;
	color: white;
}
</style>
<div class="subPage sub03">
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
						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘" /></li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인" /></li>
					<li>오픈 APi</li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인" /></li>
					<li class="current"><c:out value='${tableName}' /></li>
				</ul>

			</div>
			<div class="link_wrap" id="Web">
				<div>
					<div>
						<ul class="horizontal-list2">
							<li>
								<button class="Move_btn" id="Shortcuts01"
									style="font-size: medium; width: 140px;">
									<img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘" />
									PDF 다운로드
								</button>
							</li>
						</ul>
						<ul class="horizontal-list"
							style="list-style: none; padding: 0; display: flex; justify-content: start;">
							<li class="pdfSelect" style="width: 120px;">
								<button href="javascript:void(0)" id="tabBtn01"
									style="font-size: medium; width: 90%" class="manual_btn">
									목록<br />
								</button>
							</li>
							<li class="pdfSelect" style="width: 120px;">
								<button href="javascript:void(0)" id="tabBtn02"
									style="font-size: medium; width: 90%" class="manual_btn">
									개요 및 <br /> 상세
								</button>
							</li>
							<li class="pdfSelect" style="width: 120px;">
								<button href="javascript:void(0)" id="tabBtn03"
									style="font-size: medium; width: 90%" class="manual_btn">
									첨부표</button>
							</li>
							<li class="pdfSelect" style="width: 120px;">
								<button href="javascript:void(0)" id="tabBtn04"
									style="font-size: medium; width: 90%" class="manual_btn">개발예시</button>
							</li>
							<li></li>
						</ul>
					</div>
					<div id="ForUser">
						<div class="swiperContent" id="ForWeb">
							<div class="swiper">
								<div class="swiper-wrapper">

									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0001.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0002.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0003.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0004.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0005.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0006.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0007.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0008.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0009.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0010.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0011.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0012.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0013.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0014.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0015.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0016.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0017.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0018.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0019.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0020.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0021.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0022.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0023.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0024.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0025.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0026.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0027.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0028.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0029.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0030.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0031.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/apiManual/0032.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>

								</div>
								<div class="swiper-pagination"></div>
								<div class="swiper-button-prev"></div>
								<div class="swiper-button-next"></div>
								<div class="swiper-scrollbar"></div>
							</div>
						</div>
						<div></div>
					</div>
				</div>
			</div>


		</div>
	</div>

</div>