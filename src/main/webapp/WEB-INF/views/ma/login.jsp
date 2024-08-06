<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${pageContext.request.contextPath}/js/ma/login.js"></script>
<script type="text/javascript">
var mode = '${mode}'
</script>

<style>
/* 우측 숨김처리로 임시 수정사항 */
@media (min-width:1500px) {
	.wrapCustom {
	    width: 800px;
	    margin: 0 auto;
	}
}
</style>
<%
    // Retrieve data from session
    String message = (String) session.getAttribute("message");

    // If message exists, display it and then remove it from session
    if (message != null && !message.isEmpty()) {
%>
    <script>
        // Use JavaScript to display an alert with the message
        alert("<%= message %>");

        <% // Remove the message from session
           session.removeAttribute("message");
        %>
    </script>
<%
    }
%>
<div class="subPage login">
	<!-- 콘텐츠 시작 -->
	<div id="container">
	    <div class="wrap wrapCustom">
	        <div class="titBox">
	            <div class="tit01">
	                <img src="${ contextPath }/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
	                <h2>로그인</h2>
	            </div>
	            <ul class="tit02">
	                <li class="home"><img src="${ contextPath }/images/sub/ico_home.png" alt="홈아이콘"></li>
	                <li class="mid"><img src="${ contextPath }/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li class="current">로그인</li>
	            </ul>
	        </div>
	        <div class="cont-flex">
	            <div class="contBox flex-box Box01">
	                <div class="nameBox">
	                    <h4 class="name">아이디 로그인</h4>
	                </div>
	                <div class="cont">

	                <form id="loginForm" name="loginForm" action="#" method="post">
	                	<input class="_csrf" type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
						<input type="hidden" id="RelayState" name="RelayState" value="https://rims.kotsa.or.kr/ma/login">
						<input type="hidden" id="FailRtnUrl" name="FailRtnUrl" value="https://rims.kotsa.or.kr/ma/login">
	                    <table class="tb">
	                        <caption>아이디로그인</caption>
	                        <tr>
	                            <th scope="col">아이디 </th>
	                            <td>
	                                <label for="id_input">아이디</label>
	                                <input type="text" id="userId" name="userId" class="input" aria-label="아이디입력" placeholder="아이디를 입력하세요">
	                            </td>
	                        </tr>
	                        <tr>
	                            <th scope="col">비밀번호</th>
	                            <td>
	                                <label for="password_input">비밀번호</label>
	                                <input type="password" id="userPw" name="userPw" class="input" aria-label="비밀번호입력"
	                                    placeholder="비밀번호를 입력하세요" autocomplete="off">
	                            </td>
	                        </tr>
	                    </table>
	                </form>

	                    <button id="loginBtn" class="blue_btn loginMove_btn">로그인</button>
	                    <ul class="login_link">
	                    	<li><label for="remember_id"></label> <input type="checkbox" name="remember_id" id="remember_id" style="line-height: 26px; color: #888888; font-size: 1.6rem;"></input> <spen style="line-height: 26px; color: #888888; font-size: 1.6rem;"> 아이디 저장</spen></li>
							<li class="line"></li>
	                        <li><button onClick="location.href='https://www.kotsa.or.kr/tsum/mbs/inqFrmFindMemberId.do?menuCode=08030000'" style="line-height: 26px; color: #888888; font-size: 1.6rem;">아이디 찾기</button></li>
	                        <li class="line"></li>
	                        <li><button onClick="location.href='https://www.kotsa.or.kr/tsum/mbs/inqFrmFindMemberPw.do?menuCode=08040000'" style="line-height: 26px; color: #888888; font-size: 1.6rem;">비밀번호 찾기</button></li>
	                        <li class="line"></li>
	                        <li><button onClick="location.href='${ contextPath }/ma/join'" style="line-height: 26px; color: #888888; font-size: 1.6rem;">회원가입</button></li>
	                    </ul>
	                </div>
	            </div>
<!-- 	            <div class="contBox flex-box Box02"> -->
<!-- 	                <div class="nameBox"> -->
<!-- 	                    <h4 class="name">인증서 로그인</h4> -->
<!-- 	                </div> -->
<!-- 	                <div class="cont"> -->
<!-- 	                    <ul class="cer_login cer_login01"> -->
<!-- 	                        <li class="li_01"> -->
<!-- 	                            <button class="cerType"> -->
<%-- 	                                <img src="${ contextPath }/images/sub/ico_type01.png" alt="디지털원패스" class="ico_type"> --%>
<%-- 	                                <img src="${ contextPath }/images/sub/ico_type01_2.png" alt="디지털원패스" --%>
<!-- 	                                    class="ico_type ico_type02"> -->
<!-- 	                                디지털원패스 -->
<!-- 	                            </button> -->
<!-- 	                            <p>하나의 아이디로 여러 전자정부 서비스가 <br> 가능합니다.</p> -->
<!-- 	                        </li> -->
<!-- 	                        <li> -->
<!-- 	                            <button class="cerType"> -->
<%-- 	                                <img src="${ contextPath }/images/sub/ico_type02.png" alt="간편인증" class="ico_type"> --%>
<%-- 	                                <img src="${ contextPath }/images/sub/ico_type02_2.png" alt="간편인증" --%>
<!-- 	                                    class="ico_type ico_type02"> -->
<!-- 	                                간편인증 -->
<!-- 	                            </button> -->
<!-- 	                            <p>민간인증서를 이용하여 로그인 하실 수 <br> 있습니다.</p> -->
<!-- 	                        </li> -->
<!-- 	                    </ul> -->
<!-- 	                    <ul class="cer_login"> -->
<!-- 	                        <li class="li_01"> -->
<!-- 	                            <button class="cerType cerType03"> -->
<%-- 	                                <img src="${ contextPath }/images/sub/ico_type03.png" alt="휴대폰 본인인증" class="ico_type"> --%>
<%-- 	                                <img src="${ contextPath }/images/sub/ico_type03_2.png" alt="휴대폰 본인인증" --%>
<!-- 	                                    class="ico_type ico_type02"> -->
<!-- 	                                휴대폰 본인인증 -->
<!-- 	                            </button> -->
<!-- 	                            <p>본인명의의 휴대폰을 이용해 인증합니다.</p> -->
<!-- 	                        </li> -->
<!-- 	                        <li> -->
<!-- 	                            <button class="cerType"> -->
<%-- 	                                <img src="${ contextPath }/images/sub/ico_type04.png" alt="인증서 로그인" class="ico_type"> --%>
<%-- 	                                <img src="${ contextPath }/images/sub/ico_type04_2.png" alt="인증서 로그인" --%>
<!-- 	                                    class="ico_type ico_type02"> -->
<!-- 	                                인증서 로그인 -->
<!-- 	                            </button> -->
<!-- 	                            <p>인증서를 이용해 인증합니다.</p> -->
<!-- 	                        </li> -->
<!-- 	                    </ul> -->
<!-- 	                </div> -->
<!-- 	            </div> -->
	        </div>
<!-- 	        <div class="p_info_wr"> -->
<!-- 	            <p class="info">※ 키보드 보안 프로세스를 구동합니다.</p> -->
<!-- 	            <p class="info info_02"> -->
<!-- 	                ※ 보안프로그램 설치페이지로 이동 -->
<!-- 	                <button class="install_btn"> -->
<!-- 	                    설치페이지 이동 -->
<!-- 	                    <img src="../images/sub/ico_install.png" alt="설치페이지" class="ico_install"> -->
<!-- 	                    <img src="../images/sub/ico_install02.png" alt="설치페이지" class="ico_install ico_install02"> -->
<!-- 	                </button> -->
<!-- 	            </p> -->
<!-- 	        </div> -->
	    </div>
	</div>
</div>
