<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<!-- footer -->
<footer class="footer">
    <div class="inner">
        <div class="content">
            <ul class="f_menu">
                <li><a id="privacy" href="/ma/privacy" style="color: blue;font-weight:bold;">개인정보 처리방침</a></li>
            </ul>
            <ul class="f_info">
                <li>Email : ghqls2003@naver.com</li>
            </ul>
            <p class="copy">Copyright(C) 日滿. All rights reserved.</p>
        </div>
        <a href="" class="logo">
            <img src="${ contextPath }/images/sun_logo_back.png" alt="해가득로고" style="width:150px;">
        </a>
    </div>
</footer>