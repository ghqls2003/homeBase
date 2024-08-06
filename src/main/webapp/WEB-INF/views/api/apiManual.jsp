<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="<c:out value='${contextPath}/js/api/ApiManual.js'/>"></script>
<style>
.api_page .contBox .cont{padding: 40px 44px 35px;}
.api_page.guide .btn_flex{margin-top: 73px;}
.api_page p.guide_info{font-size: 1.8rem;font-weight: 500;color: #000;line-height: 26px;}
.api_page ul.method_wr{display: flex;align-items: center;justify-content: center;margin-top: 33px;}
.api_page ul.method_wr li.mid{margin: -70px 48px 0;}
.api_page ul.method_wr li .img_bx{width: 99px;height: 99px; background-color: #F5F8FE;border: 1px solid #DBE0EC;border-radius: 100%;display: flex;align-items: center;justify-content: center;margin: 0 auto;}
.api_page ul.method_wr li p{font-size: 1.6rem;font-weight: 500;color: #040404;line-height: 26px;text-align: center;margin-top: 11px;}

@media (max-width:1500px) {
    .api_page .contBox .cont {padding: 32px 28px 25px;}
}
@media (max-width:680px) {
    .api_page p.guide_info{line-height: 22px;}
    .api_page ul.method_wr li.mid{margin: -60px 15px 0;}
    .api_page ul.method_wr li p{line-height: 22px;}
}
@media (max-width:640px) {
    .api_page .contBox .cont{padding: 22px 18px;}
}
@media (max-width:480px) {
    .api_page p.guide_info{font-size: 1.6rem;}
    .api_page ul.method_wr li p{font-size: 1.5rem;line-height: 18px;}
    .api_page ul.method_wr li p br{display: none;word-break: keep-all;}
}


</style>
<div class="subPage api_page">
	<!-- 콘텐츠 시작 -->
	<div id="container">
		<div class="wrap">
			<div class="titBox">
				<div>
					<div class="tit01">
						<img src="<c:out value='${contextPath}/images/sub/ico_tit.png'/>" alt="타이틀아이콘" class="ico_tit" />
						<h2>
							<span class="t_txt"><c:out value='${tableName}'/></span>
						</h2>
					</div>

				</div>
					<ul class="tit02">
						<li class="home"><img src="<c:out value='${contextPath}/images/sub/ico_home.png'/>" alt="홈아이콘" /></li>
						<li class="mid"><img src="<c:out value='${contextPath}/images/sub/ico_menuLine.png'/>" alt="라인" /></li>
						<li>오픈 APi</li>
						<li class="mid"><img src="<c:out value='${contextPath}/images/sub/ico_menuLine.png'/>" alt="라인" /></li>
						<li class="current"><c:out value='${tableName}' /></li>
					</ul>
			</div>
			<div class="contBox">
				<div class="nameBox">
					<h4 class="name">오픈 API 이용 자격 - 서비스 대상</h4>
				</div>
				<div class="cont">
					<p class="guide_info">
						본 시스템에서 제공되는 운전자격조회서비스는 자동차운송사업법에 근거하여 <span class="darkgreen">"자동차
							대여사업자" 를 대상으로 서비스</span> 됩니다. <br> 따라서 서비스 이용자격은 자동차대여사업자에 한정되며, 오픈
						API를 이용한 인터페이스는 승인된 사업자 및 승인된 <span class="darkgreen">사업자의
							특정 시스템에서만 접근/사용이 가능</span>합니다.
					</p>

				</div>
			</div>
			<div class="contBox lastBox">
				<div class="nameBox">
					<h4 class="name">오픈 API를 이용한 조회방법</h4>
				</div>
				<div class="cont">
					<p class="guide_info">
						제공하는 오픈 API 사용을 위해서는 다음의 절차에 따라 개발 및 테스트가 요구되며, 시스템 관리자의 최종 확인 후
						시스템 접근이 가능합니다. 
						<br> 오픈 API를 이용한 조회 방법은 홈페이지의 “오픈 API”를 참고
						바랍니다.
					</p>
					<ul class="method_wr">
						<li>
							<div class="img_bx">
								<img src="<c:out value='${contextPath}/images/sub/ico_guide1.png'/>" alt="회원가입시 인증키자동발급" class="guide_img">
							</div>
							<p>
								회원가입 시 API 사용을 위한 인증키가 <br> 자동으로 발급됩니다.
							</p>
						</li>
						<li class="mid"><img src="<c:out value='${contextPath}/images/sub/ico_guide_arrow.png'/>"></li>
						<li>
							<div class="img_bx">
								<img src="<c:out value='${contextPath}/images/sub/ico_guide2.png'/>" alt="인증키로 API주소요청" class="guide_img">
							</div>
							<p>
								발급받은 인증키로 사용할 API 주소로 <br> 요청합니다.
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>