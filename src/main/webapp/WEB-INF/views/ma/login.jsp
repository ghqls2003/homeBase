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
	                    </ul>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
</div>
