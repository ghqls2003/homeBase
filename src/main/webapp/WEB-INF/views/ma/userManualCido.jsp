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
<script src="${contextPath}/js/ma/userManualCido.js"></script>

<script>
var userType = '${userType}'
var userTypeBool = '${userTypeBool}' === 'true';
var userOperSystemBool = '${userOperSystemBool}' === 'true';
</script>

<style>
.swiper {
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
  display : flex;
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
					<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
					<h2>서비스 이용안내(지자체)</h2>
				</div>
				<ul class="tit02">
					<li class="home"><img
						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li>고객지원</li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li class="current">서비스 이용안내</li>

				</ul>

			</div>
			<div class="link_wrap" id="Web">
				<div>
					<div>
						<ul class="horizontal-list2">
							<li>
								<button class="Move_btn"
									id="Shortcuts01" style="font-size: medium; width:140px;">
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
									가입 및<br /> 권한 신청
								</button>
							</li>
							<li class="pdfSelect" style="width: 120px;">
								<button href="javascript:void(0)" id="tabBtn02"
									style="font-size: medium; width: 90%" class="manual_btn">
									대여사업자 <br />  관리
								</button>
							</li>
							<li class="pdfSelect" style="width: 120px;">
								<button href="javascript:void(0)" id="tabBtn03"
									style="font-size: medium; width: 90%" class="manual_btn">
									통계
								</button>
							</li>
							<li class="pdfSelect" style="width: 120px;">
								<button href="javascript:void(0)" id="tabBtn04"
									style="font-size: medium; width: 90%" class="manual_btn">고객지원</button>
							</li>
							<li></li>
						</ul>
					</div>
					<div id ="ForUser">
						<div class="swiperContent" id="ForWeb">
							<div class="swiper">
								<div class="swiper-wrapper">

									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0001.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0002.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0003.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0004.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0005.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0006.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0007.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0008.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0009.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0010.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0011.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0012.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0013.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0014.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0015.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0016.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0017.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0018.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0019.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0020.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0021.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0022.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0023.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0024.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0025.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0026.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0027.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0028.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0029.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0030.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0031.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0032.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0033.jpg"
											alt="서비스이용안내(web)" width="100%">
									</div>
									<div class="swiper-slide">
										<img src="${contextPath}/images/manualCido/0034.jpg"
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