<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html lang="ko">
<style>
.header {
	display: none;
}
.footerWrap {
	display: none;
}
#title {
	position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
<script>
	top.document.title = 'openAppOrStoreParams'
	
	$(document).ready(function() {
		function openAppOrStore() {
	        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	        console.log("userAgent.js >>", userAgent);
	        var userAgent = '${userAgent}';
	        console.log("userAgent.java >>", userAgent);
            
			const url = new URLSearchParams(window.location.search);
			url.set('rentNo', 'R24-000927638');
	        
			var rentNo = null;
	         
	        url.get('rentNo') != null ? rentNo = url.get('rentNo') : rentNo;
        	
			console.log(rentNo);	  
				
	        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
	        	window.location = "rimsapp://?rentNumber="+rentNo;

	            setTimeout(function() {
	                if (!document.webkitHidden || !document.hidden) {
	                    window.location.href = "https://apps.apple.com/kr/app/해양교통안전정보/id6462842483";
	                }
	            }, 1000);
	        } else if (/android/i.test(userAgent)) {
	        	window.location = "intent://kr.or.kotsa.rims#Intent;scheme=rimsapp;package=kr.or.kotsa.rims;S.rentNumber="+rentNo+";end";
	        	
	            setTimeout(function() {
	                if (!document.webkitHidden || !document.hidden) {
	                    window.location.href = "https://play.google.com/store/apps/details?id=kr.or.kotsa.rims";
	                }
	            }, 1000);
	        }
	    }

        openAppOrStore();
	});
</script>
<h2 id="title">페이지 이동중입니다.</h2>