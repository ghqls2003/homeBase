<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/error.css"/>
<!-- link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/default.css" -->
<div class="wrap_page">
	<div class="page_notice">
		<div class="wrap_notice1">
			<div class="wrap_notice">
				<img src="${contextPath}/images/error1.png"
					alt="서비스 이용에 불편을 드려 죄송합니다" width="154" height="141" />
				<div class="cont_notice mt50">
					<h2>이용에 불편을 드려 죄송합니다.</h2>
					<p>
						서비스가 지연되고 있습니다.<br> 문제가 계속 발생하면 관리자에게 문의하시기 바랍니다.
					</p>
				</div>
			</div>
		</div>
	</div>
	<div class="footer1">
		<button class="btn01" onclick="history.back()">확인</button>
	</div>
</div>