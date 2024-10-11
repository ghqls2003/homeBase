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
                <li>|</li>
                <li><a href="">이용 약관</a></li>
            </ul>
            <ul class="f_info">
                <li>주소 : 39660 경상북도 김천시 혁신6로 17(율곡동,한국교통안전공단)</li>
                <li>운전자격 민원 전용 번호 : 054-459-7565</li>
                <li>일반상담(토요일 및 공휴일 휴무)</li>
            </ul>
            <p class="copy">Copyright(C) TS. All rights reserved.</p>
        </div>
        <a href="" class="logo">
<%--             <img src="${ contextPath }/images/f_logo.png" alt="운전자격검증시스템로고"> --%>
            <img src="https://www.kotsa.or.kr/web/images/content/img_ts_logo02.svg" alt="운전자격검증시스템로고" style="width:150px;">
        </a>
    </div>
</footer>