<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ include file="../cmm/include_gis.jsp" %>
<script>
	top.document.title = 'openAppOrStoreParams'
	
	$(document).ready(function() {
// 		$("#forcingClick").click();
	});
	    function openAppOrStore() {
	        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	
	        const url = new URLSearchParams(window.location.search);
	        url.set('rentNo', 'R24-000927638');
	
	        var rentNo = null;
	
	        url.get('rentNo') != null ? rentNo = url.get('rentNo') : rentNo;
	
	        console.log(rentNo);
	
	        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
	            window.location = "rimsapp://?rentNumber="+rentNo;
	
	            setTimeout(function() {
	                if (!document.webkitHidden || !document.hidden) {
	                    window.location.href = "https://apps.apple.com/kr/app/운전자격확인시스템/id6462968145"; 
	                }
	            }, 1000);
	        } else if (/android/i.test(userAgent)) {
	            window.location = "rimsapp://kr.or.kotsa.rims?rentNumber="+rentNo;
	
	            setTimeout(function() {
	                if (!document.webkitHidden || !document.hidden) {
	                    window.location.href = "https://play.google.com/store/apps/details?id=kr.or.kotsa.rims";
	                }
	            }, 1000);
	        }
	    }
</script>

<div style="display: flex; justify-content: center; margin: 300px 0px 180px 0px;">
	<button id="forcingClick" class="yellow_btn searchBtn" type="button" onclick="openAppOrStore()"
					style="width: 240px; height: 80px; font-size:20px; font-weight: bold;">
		운전자격확인시스템 앱 열기
	</button>
<!-- 	<h2>페이지 이동중입니다.</h2> -->
</div>