<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>
    
	<script src="${contextPath}/js/ma/PTSterms.js"></script>
	<link rel="stylesheet" type="text/css" href="<c:url value="/css/custom.css"/>" media="all">
	
	<style>
	#divCon{
		width: 60%;
		margin: auto;
	}
	.hNm{
	    line-height: 24px;
	    color: #00127B;
	    font-weight: 500;
	    text-align: center;
	}
	.texNm{
		font-size: 1.8rem;
	    font-weight: 500;
	    color: #000;
	    line-height: 26px;
	}
	.termFooter{
		float: right;
	}
	.agreBtn{
	    width: 152px;
	    height: 54px;
	    background-color: #364BC6;
	    border-radius: 8px;
	    font-size: 2.4rem;
	    line-height: 26px;
	    color: #fff;
	    margin-right: 20px;
	}
	.agreBtn:hover{
		background-color: #fff;
	    color: #364BC6;
	    border: 1px solid #364BC6;
	}
	.degreBtn{
		width: 152px;
	    height: 54px;
	    background-color: #DEDEDE;
	    border-radius: 8px;
	    font-size: 2.4rem;
	    font-weight: 500;
	    color: #000;
	}
	.degreBtn:hover{
		background-color: #000;
    	color: #fff;
	}
	</style>

	<div class="container on"><!-- container start -->

		<div id="divCon" class="contBox">
			<br />
			<br />
			<br />
			<h1 class="hNm">개인정보보호 보안 서약서</h1>
			<br />
			<br />
			<br />
			<br />
            <br />
			<p class="texNm">본인은 개인정보를 처리·취급하는 업무에 있어 아래 사항과 개인정보보호법을 성실히 준수할 것을 서약합니다.</p>
			<br />
			<br />
			<p class="termItem">
				1. 본인은 재직 중 또는 퇴직 후에도 다음 각 호의 사항을 사전 허가없이 개인정보 수집 목적 이외의 용도로 사용, 복제, 누설 또는 유출하지 않을 것을 서약합니다.<br />
				<br />
				&emsp;가. 개인정보 업무에 사용하기 위한 목적으로 도입, 실시한 모든 시스템에 관한 정보<br />
				&emsp;나. 정보주체 또는 타기관 또는 시스템에서 연계받은 모든 개인정보<br />
				&emsp;다. 개인정보 업무와 관련되어 생성된 모든 산출물<br />
				<br />
				<br />
				2. 본인은 보직 이동 등의 원인으로 인하여 개인정보 처리업무를 하지 않게 되는 경우에도 제1항의 사항을 준수할 것을 서약 합니다.<br />
			</p>
			<br />
			<br />
			<p class="termBody">본인은 본 서약서의 내용을 충분히 검토하고 자유로운 의사에 따라 이에 서명함을 확인하며, 위 각 사항을 준수하지 않음으로 인하여 발생되는 모든 책임은 본인에게 있음을 인정하고, 국토교통부에서 정하는 바에 의해 처리됨을 동의합니다.</p>
			<br />
			<br />
			<p class="termFooter"><span id="lblYear"></span>년 <span id="lblMon"></span> 월 <span id="lblDate"></span> 일</p>
<%--
            <p class="termBody">소속 :                    성명 :          (서 명)</p> > --%>
 		</div>

		<br />
		<br />
		<br />
		
        <div class="pbtnBox" style="display:flex; justify-content: center; text-align: center;">
            <button class="agreBtn" onClick="javascript:$terms.event.selectAgree();">동의</button>
	        <button class="degreBtn" onClick="javascript:$terms.event.selectdeAgree();" type="submit">거부</button>
        </div>
		<br />
		<br />
		<br />
        
	</div><!-- container end -->
