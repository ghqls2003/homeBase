<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<link rel="stylesheet" type="text/css"
	href="${contextPath}/css/custom/privacyCommon.css" />
<link rel="stylesheet" type="text/css"
	href="${contextPath}/css/custom/privacyContent.css" />

<%-- <script src="${contextPath}/js/sft/privacy.js"></script> --%>
<head>
<script type="text/javascript">
$(function(){
	$('#label_layer_0a').hover(function(){
		$('#label_layer_0').show();
	}, function(){
		$('#label_layer_0').hide();
	});
	$('#label_layer_1a').hover(function(){
		$('#label_layer_1').show();
	}, function(){
		$('#label_layer_1').hide();
	});
	$('#label_layer_2a').hover(function(){
		$('#label_layer_2').show();
	}, function(){
		$('#label_layer_2').hide();
	});
	$('#label_layer_3a').hover(function(){
		$('#label_layer_3').show();
	}, function(){
		$('#label_layer_3').hide();
	});
	$('#label_layer_4a').hover(function(){
		$('#label_layer_4').show();
	}, function(){
		$('#label_layer_4').hide();
	});
	$('#label_layer_5a').hover(function(){
		$('#label_layer_5').show();
	}, function(){
		$('#label_layer_5').hide();
	});
	
	var tmp = "";
	document.getElementById("table01").style.display = "none";
	document.getElementById("table02").style.display = "none";
	document.getElementById("table03").style.display = "none";
	document.getElementById("table04").style.display = "none";
	document.getElementById("table05").style.display = "none";
	document.getElementById("table06").style.display = "none";
	document.getElementById("table07").style.display = "none";
	document.getElementById("table08").style.display = "none";
	document.getElementById("table09").style.display = "none";
	document.getElementById("table10").style.display = "none";
	document.getElementById("table11").style.display = "none";
	document.getElementById("table12").style.display = "none";
	document.getElementById("table13").style.display = "none";

		
	
	// 표 펼치기/접기
	$(".toggle-table").on("click", ".toggle-button", function(){
		var button = $(this);
		
		if(button.attr("id") == "btn_01"){
			tmp = document.getElementById("table01");
		} else if(button.attr("id") == "btn_02") {
			tmp = document.getElementById("table02");
		} else if(button.attr("id") == "btn_03") {
			tmp = document.getElementById("table03");
		} else if(button.attr("id") == "btn_04") {
			tmp = document.getElementById("table04");
		} else if(button.attr("id") == "btn_05") {
			tmp = document.getElementById("table05");
		} else if(button.attr("id") == "btn_06") {
			tmp = document.getElementById("table06");
		} else if(button.attr("id") == "btn_07") {
			tmp = document.getElementById("table07");
		} else if(button.attr("id") == "btn_08") {
			tmp = document.getElementById("table08");
		} else if(button.attr("id") == "btn_09") {
			tmp = document.getElementById("table09");
		} else if(button.attr("id") == "btn_10") {
			tmp = document.getElementById("table10");
		} else if(button.attr("id") == "btn_11") {
			tmp = document.getElementById("table11");
		} else if(button.attr("id") == "btn_12") {
			tmp = document.getElementById("table12");
		} else if(button.attr("id") == "btn_13") {
			tmp = document.getElementById("table13");
		} 
		
		if (button.hasClass("on")){ //접었을 때
		
			var table = button.removeClass("on").next();
			table.stop().animate({height: 0}, 300);
			
			tmp.style.display = "none";
		} else { //펼쳤을 때
			
			var table = button.addClass("on").next().stop();
			
			var beginHeight = table.height();
			
			tmp.style.display = "";
			
			table.css({height: "auto"});
			var targetHeight = table.height();
			
			//애니메이션
			table.css({height: beginHeight}).animate({height: targetHeight}, 300);
			
		}
	});

}); 
</script>
</head>
<div class="subPage sub03">
<div id="container">
<div class="wrap" id="notice">
<div data-summary="default">
	<div>
		<i><img alt="" src="/images/privacy/tenju.png" style="vertical-align:middle;"></i>
		<em>한국교통안전공단 개인정보처리방침</em>
		<p>한국교통안전공단은 개인정보 보호법에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 아래와 같이 개인정보 처리방침을 두고 있습니다. 본 방침은 별도의 설명이 없는 한 한국교통안전공단에서 운영하는 모든 웹사이트의 개인정보 처리에도 적용됨을 알려드립니다.</p>
		
<!-- 주요 개인정보 처리 표시(라벨링) 시작 -->
		<div class="privacy_label_wrap">
			<p class="tit01 ac" style="font-size:large;"><strong>주요 개인정보 처리 표시(라벨링)</strong></p>
			<div class="privacy_label">	
				<a href="#next3" id="label_layer_0a" class="label_box" title="처리항목">
					<img src="/images/privacy/privacyPolicy_icon02-1.png" alt="처리항목" style="width:85px; height:85px;">
					<p class="label_cnt">처리항목</p>
					<div id="label_layer_0" class="label_layer num0">
						<div class="label_desc_top">
							<p style="color:#fff;">
								<strong>일반 개인정보 수집</strong>
							</p>
						</div>
						<div class="label_desc_btm">
							<p>서비스별로 수집하는 개인정보 항목이 다릅니다.</p>
							<table class="tbl-type01 type01-1">
								<colgroup>
									<col style="width: 20%">
									<col style="width: 20%">
									<col>
								</colgroup>
								<thead>
									<tr>
										<th>서비스명</th>
										<th>개인정보파일명</th>
										<th>개인정보 항목</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td rowspan="3" class="desc_title1">대표<br>홈페이지시스템</td>
										<td class="desc_title2">홈페이지<br>회원정보(개인회원, 외국인회원)</td>
										<td class="desc_content">(필수) 이름,  핸드폰, E-Mail,  아이디, 비밀번호, 연계정보(CI), IP주소, 내/외국인구분 <br>(선택) 집연락처, 집주소
										</td>
									</tr>
									<tr>
										<td class="desc_title2">홈페이지<br>회원정보(기업회원)</td>
										<td class="desc_content">
											(필수) 이름, 핸드폰, E-Mail, 아이디, 비밀번호, 직장명, IP주소 <br>(선택) 직장연락처, 직장주소
										</td>
									</tr>
									<tr>
										<td class="desc_title2">뉴스레터</td>
										<td class="desc_content">
											(필수) 이름, E-Mail, 아이디
										</td>
									</tr>
								</tbody>
							</table>									
						</div>
					</div>
				</a>
				<a href="#next1" id="label_layer_1a" class="label_box" title="개인정보의 처리 목적">
					<img src="/images/privacy/privacyPolicy_icon01.png" alt="개인정보의 처리 목적" style="width:85px; height:85px;">
					<p class="label_cnt">개인정보의 처리 목적</p>
					<div id="label_layer_1" class="label_layer num1" style="display: none;">
						<div class="label_desc_top">
							<p style="color:#fff;">
								<strong>개인정보의 처리 목적</strong>
							</p>
						</div>
						<div class="label_desc_btm">
							<p>개인정보보호법 제32조에 따라 등록·공개하는 개인정보파일의 처리목적은 다음과 같습니다.</p>
							<table class="tbl-type01 type01-1">
								<caption>개인정보파일별 서비스명, 처리목적</caption>
								<colgroup>
									<col style="width: 20%">
									<col style="width: 21%">
									<col>
								</colgroup>
								<thead>
									<tr>
										<th>서비스명</th>
										<th>개인정보파일명</th>
										<th>처리 목적</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td rowspan="3" class="desc_title1">대표<br>홈페이지시스템</td>
										<td class="desc_title2">홈페이지<br>회원정보(개인회원, 외국인회원)</td>
										<td class="desc_content">웹사이트 회원에 대한 정보제공, 민원처리 목적</td>
									</tr>
									<tr>
										<td class="desc_title2">홈페이지<br>회원정보(기업회원)</td>
										<td class="desc_content">웹사이트 회원에 대한 정보제공, 민원처리 목적</td>
									</tr>
									<tr>
										<td class="desc_title2">뉴스레터</td>
										<td class="desc_content">도로, 철도, 항공 각 분야의 다양한 정보제공 목적</td>
									</tr>
								</tbody>
							</table>	
							<p>※ 모든 개인정보파일 및 처리목적은 아래에서 확인하여 주시기 바랍니다.</p>									
						</div>
					</div>
				</a>
				<a href="#next3" id="label_layer_2a" class="label_box" title="개인정보의 보유기간">
					<img src="/images/privacy/privacyPolicy_icon02-2.png" alt="개인정보의 보유기간" style="width:85px; height:85px;">
					<p class="label_cnt">개인정보의 보유기간</p>
					<div id="label_layer_2" class="label_layer num2" style="display: none;">
						<div class="label_desc_top">
							<p style="color:#fff;">
								<strong>개인정보의 보유기간</strong>
							</p>
						</div>
						<div class="label_desc_btm">
							<p>각각의 개인정보 처리 및 보유기간은 다음과 같습니다.</p>
							<table class="tbl-type01 type01-1">
								<caption>개인정보별 서비스명, 보유기간</caption>
								<colgroup>
									<col style="width: 20%">
									<col style="width: 21%">
									<col>
								</colgroup>
								<thead>
									<tr>
										<th>서비스명</th>
										<th>개인정보파일명</th>
										<th>보유기간</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td rowspan="3" class="desc_title1">대표<br>홈페이지시스템</td>
										<td class="desc_title2">홈페이지<br>회원정보(개인회원, 외국인회원)</td>
										<td class="desc_content">회원 탈퇴 시 까지, 회원 가입 후 2년마다 미동의 시</td>
									</tr>
									<tr>
										<td class="desc_title1">홈페이지<br>회원정보(기업회원)</td>
										<td class="desc_content">회원 탈퇴 시 까지, 회원 가입 후 2년마다 미동의 시</td>
									</tr>
									<tr>
										<td class="desc_title1">뉴스레터</td>
										<td class="desc_content">회원 탈퇴 시까지</td>
									</tr>
								</tbody>
							</table>									
						</div>
					</div>
				</a>
				<a href="#next18" id="label_layer_3a" class="label_box" title="개인정보 관리수준 평가 결과">
				<img src="/images/privacy/privacyPolicy_icon16.png" alt="개인정보 관리수준 평가 결과" style="width:85px; height:85px;">
				<p class="label_cnt">개인정보 관리수준 평가 결과</p>
				<div id="label_layer_3" class="label_layer num3" style="display: none;">
				<div class="label_desc_top">
					<p style="color:#fff;">
						<strong>개인정보 관리수준 평가 결과</strong>
					</p>
				</div>
				<div class="label_desc_btm">
					<figure style="margin-top:0px;">
						<img id="personInfo4" src="/images/privacy/privacyPolicy_labeling01.png" style="width:400px; height:300px;">
						<figurecaption>
							<div id="label_layer_0" class="label_layer num4">
								<div class="label_desc_top">
									<p><strong>개인정보 관리수준 평가 결과</strong></p>
								</div>
					
							</div>
						</figurecaption>
					</figure>				
				</div>
				</div>
				</a>
				<a href="#next9" id="label_layer_4a" class="label_box" title="개인정보 처리위탁">
					<img src="/images/privacy/privacyPolicy_icon08.png" alt="처리 위탁" style="width:85px; height:85px;">
					<p class="label_cnt">처리 위탁</p>
					<div id="label_layer_4" class="label_layer num4" style="display: none;">
						<div class="label_desc_top">
							<p style="color:#fff;">
								<strong>처리 위탁</strong>
							</p>
						</div>									
						<div class="label_desc_btm">
							<table class="tbl-type01 type01-1" style="table-layout: auto; width:100%; table-layout:fixed;">
								<caption>개인정보 처리위탁</caption>
								<colgroup>
									<col style="width : 16.3%">
									<col style="width : 18.2%">
									<col style="width : 22.2%">
									<col style="width : 43.3%">
								</colgroup>
								<thead>
									<tr>
										<th>부서명</th>
										<th colspan="2">수탁업체</th>
										<th>개인정보 처리업무 위탁 명</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td class="desc_content_consignment" rowspan="2">정보운영처</td>
										<td class="desc_content_consignment">대신정보통신</td>
										<td class="desc_content_consignment">(주)씨유소프트</td>
										<td class="desc_content" rowspan="2">2024~2025 한국교통안전공단 정보시스템 통합 유지관리 용역</td>
									</tr>
									<tr>
										<td class="desc_content_consignment">㈜엠티데이타</td>
										<td class="desc_content_consignment">㈜유니디아</td>
									</tr>
									<tr>
										<td class="desc_content_consignment">교통물류정책처</td>
										<td class="desc_content_consignment" colspan="2">네이버시스템즈</td>
										<td class="desc_content_consignment">2024년 위험물질운송안전관리시스템 유지보수 용역</td>
									</tr>
									<tr>
										<td class="desc_content_consignment">대외협력실</td>
										<td class="desc_content_consignment" colspan="2">경성문화사</td>
										<td class="desc_content_consignment">TS매거진 제작 용역</td>
									</tr>
									<tr>
										<td class="desc_content_consignment">정보보안처</td>
										<td class="desc_content_consignment" colspan="2">㈜싸이버원</td>
										<td class="desc_content_consignment">공단 정보시스템 웹취약점 점검</td>
									</tr>
									<tr>
										<td class="desc_content_consignment">운영지원처</td>
										<td class="desc_content_consignment" colspan="2">㈜현대이지웰페어</td>
										<td class="desc_content_consignment">선택적 복리후생 컨설팅 및 서비스협약서</td>
									</tr>
									<tr>
										<td class="desc_content_consignment" rowspan="3">인재개발처</td>
										<td class="desc_content_consignment" colspan="2">㈜휴스테이션</td>
										<td class="desc_content_consignment">직무중심 채용위탁 용역</td>
									</tr>
									<tr>
										<td class="desc_content_consignment" colspan="2">인트로맨㈜</td>
										<td class="desc_content_consignment">기간제근로자 채용 위탁 용역</td>
									</tr>
									<tr>
										<td class="desc_content_consignment" colspan="2">㈜현대경제연구원</td>
										<td class="desc_content_consignment">사이버연수원 위탁운영</td>
									</tr>
									<tr>
										<td class="desc_content_consignment">고객소통처</td>
										<td class="desc_content_consignment">한국능률협회컨설팅</td>
										<td class="desc_content_consignment">㈜코리아리서치인터내셔널</td>
										<td class="desc_content_consignment">2024년도 공공기관 고객만족도 조사</td>
									</tr>
									<tr>
										<td class="desc_content_consignment">검사운영처</td>
										<td class="desc_content_consignment" colspan="2">스마트솔루션</td>
										<td class="desc_content_consignment">모바일공인전자 안내(자동차검사 사전안내 전자문서)</td>
									</tr>
									<tr>
										<td class="desc_content_consignment">검사운영처</td>
										<td class="desc_content_consignment" colspan="2">장애인자립지원단</td>
										<td class="desc_content_consignment">자동차검사 사전안내문(우편) 제작 용역</td>
									</tr>
									<tr>
										<td class="desc_content_consignment">리콜센터</td>
										<td class="desc_content_consignment" colspan="2">㈜포스토피아</td>
										<td class="desc_content_consignment">리콜통지문 및 창봉투 제작·발송</td>
									</tr>										
								</tbody>
							</table>																
						</div>
					</div>
				</a>
			<a href="#next16" id="label_layer_5a" class="label_box" title="고충처리 부서">
				<img src="/images/privacy/privacyPolicy_icon14-2.png" alt="고충처리 부서" style="width:85px; height:85px;">
				<p class="label_cnt">고충처리 부서</p>
				<div id="label_layer_5" class="label_layer num5" style="display: none;">
					<div class="label_desc_top">
						<p style="color:#fff;">
							<strong>고충처리 부서</strong>
						</p>
					</div>
					<div class="label_desc_btm">
						<p>한국교통안전공단은 개인정보의 고충처리가 신속하게 처리되도록 노력하겠습니다.</p>
						<ul class="desc_wrap">
							<li class="desc_box">												
								<p class="desc_tit">처리 부서</p>
								<p class="desc_cnt txtr">
									정보보안처
								</p>
							</li>
						</ul>
					</div>
				</div>
			</a>
		</div>
		<p class="txt_orange">※ 기호에 마우스 커서를 대시면 세부 사항을 확인할 수 있으며, 자세한 내용은 아래의 개인정보 처리방침을 확인하시기 바랍니다.</p>
		</div>
<!-- //주요 개인정보 처리 표시(라벨링) 끝 -->

<!-- 목차 시작-->
				<table class="table scroll" id="personInfo_contents">
						<caption>개인정보처리방침 목차를 안내하는 표입니다.</caption>
						<colgroup>
							<col style="width: 18%;">
							<col>
						</colgroup>
						<thead>
							<tr>
								<th scope="col" colspan="3">목차</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon01.png" alt="개인정보의 처리 목적" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next1">제1조 (개인정보의 처리 목적)</a>
								</td>
							</tr>
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon19.png" alt="개인정보파일 등록 현황" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next2">제2조 (개인정보파일 등록 현황)</a>
								</td>
							</tr>							
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon02-1.png" alt="개인정보의 처리 항목 및 보유기간" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
									<img src="/images/privacy/privacyPolicy_icon02-2.png" alt="개인정보의 처리 항목 및 보유기간" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next3">제3조 (개인정보의 처리 항목 및 보유기간)</a>
								</td>
							</tr>
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
								<img alt="" src="/images/privacy/privacyPolicy_icon03.png" alt="14세 미만 아동의 개인정보 처리에 관한 사항" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">	
								</td>							
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next4">제4조 (14세 미만 아동의 개인정보 처리에 관한 사항)</a>
								</td>
							</tr>
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">																							
									<img src="/images/privacy/privacyPolicy_icon04.png" alt="개인정보 영향평가의 수행 결과" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next5">제5조 (개인정보 영향평가의 수행 결과)</a>
								</td>
							</tr>
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon05.png" alt="개인정보의 파기절차 및 파기방법" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next6">제6조 (개인정보의 파기절차 및 파기방법)</a>
								</td>
							</tr>
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon06.png" alt="개인정보의 제3자 제공" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next7">제7조 (개인정보의 제3자 제공)</a>
								</td>
							</tr>
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next8">제8조 (추가적인 이용·제공의 판단기준)</a>
								</td>
							</tr>
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon08.png" alt="개인정보 처리의 위탁" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next9">제9조 (개인정보 처리의 위탁)</a>
								</td>
							</tr>
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon09.png" alt="개인정보의 안전성 확보 조치" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next10">제10조 (개인정보의 안전성 확보 조치)</a>
								</td>							
							</tr>
								<tr><td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon10.png" alt="민감정보의 공개 가능성 및 비공개를 선택하는 방법" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next11">제11조 (민감정보의 공개 가능성 및 비공개를 선택하는 방법)</a>
								</td>
							</tr>
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon20.png" alt="개인정보파일 등록 현황" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next12">제12조 (가명정보 처리에 관한 사항)</a>
								</td>
							</tr>							
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon11.png" alt="개인정보 자동 수집하는 장치의 설치·운영 및 거부에 관한 사항" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next13">제13조 (개인정보 자동 수집하는 장치의 설치·운영 및 거부에 관한 사항)</a>
								</td>
							</tr>
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon12.png" alt="정보주체와 법정대리인의 권리·의무 및 그 행사 방법에 관한 사항" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next14">제14조 (정보주체와 법정대리인의 권리·의무 및 그 행사 방법에 관한 사항)</a>
								</td>
							</tr>
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon13.png" alt="개인정보의 열람등 청구를 접수·처리하는 부서" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next15">제15조 (개인정보의 열람등 청구를 접수·처리하는 부서)</a>
								</td>								
							</tr>
								<tr><td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon14-1.png" alt="개인정보 보호책임자의 성명 또는 개인정보보호 업무 및 관련 고충사항을 처리하는 부서의 명칭과 전화번호 등 연락처 및 담당자 연락처" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
									<img src="/images/privacy/privacyPolicy_icon14-2.png" alt="개인정보 보호책임자의 성명 또는 개인정보보호 업무 및 관련 고충사항을 처리하는 부서의 명칭과 전화번호 등 연락처 및 담당자 연락처" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next16">제16조 (개인정보 보호책임자의 성명 또는 개인정보보호 업무 및 관련 고충사항을 처리하는 부서의 명칭과 전화번호 등 연락처 및 담당자 연락처)</a>
								</td>
							</tr>
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon15.png" alt="정보주체의 권익침해에 대한 구제 방법" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next17">제17조 (정보주체의 권익침해에 대한 구제 방법)</a>
								</td>
							</tr>
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon16.png" alt="개인정보 관리수준 평가 결과" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next18">제18조 (개인정보 보호수준 평가 결과)</a>
								</td>
							</tr>
							<tr>
								<td style="border:none; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon17.png" alt="고정형·이동형 영상정보처리기기 운영·관리에 관한 사항" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; text-align:left; padding-left:40px">
									<a href="#next19">제19조 (고정형·이동형 영상정보처리기기 운영·관리에 관한 사항)</a>
								</td>
							</tr>
							<tr>
								<td style="border:none; border-bottom:1px solid #CED3D6; text-align:left; padding-left:40px">
									<img src="/images/privacy/privacyPolicy_icon18.png" alt="개인정보 처리방침의 변경" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
								</td>
								<td style="border:none; border-bottom:1px solid #CED3D6; text-align:left; padding-left:40px">
									<a href="#next20">제20조 (개인정보 처리방침의 변경)</a>
								</td>
							</tr>
						</tbody>
					</table>
<!-- // 목차 끝 -->

<!--본문 시작-->
<div class="area_join mt30" data-guide="terms">
	
	<article>
			<h5 class="mt0" id="next1">제1조 (개인정보의 처리 목적)
				<img src="/images/privacy/privacyPolicy_icon01.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>① 한국교통안전공단은 대국민 서비스 제공 및 민원처리, 소관업무 수행 등의 목적으로 필요에 의한 최소한의 개인정보를 처리하고 있습니다.</p>
			<p>② 한국교통안전공단에서 처리하고 있는 개인정보는 수집 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
			<p>③ 한국교통안전공단에서 등록·공개하고 있는 개인정보파일의 처리 목적은 다음과 같습니다.</p>
			
			<div class="toggle-table">
	<a class="button blue toggle-button" id="btn_01">개인정보의 처리 목적▼</a>
	<div>
		<table style="width:100%; table-layout:fixed;" class="table" id="table01">
			<caption>개인정보의 처리 목적</caption>
			<colgroup>
				<col style="width: 15%;">
				<col style="width: 15%;">
				<col style="width: 20%;">
				<col style="width: 20%;">
			</colgroup>				
			<thead>
				<tr>
					<th scope="col">시스템명</th>
					<th scope="col">개인정보파일명</th>
					<th scope="col">운영 근거</th>
					<th scope="col">처리 목적</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style="word-break:break-all" rowspan="2">
						<p style="text-align:center; font-size:80%">운전자격확인시스템</p>
					</td>
					<td style="word-break:break-all">
						<p style="text-align:center; font-size:80%"> 사용자</p>
					</td>
					<td style="word-break:break-all">
						<p style="text-align:center; font-size:80%">「개인정보 보호법」 제15조제1항제1호에 따른 정보주체의 동의</p>
					</td>
					<td style="word-break:break-all">
						<p style="text-align:center; font-size:80%">사용자 관리 및 권한관리 </p>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
			
			<br>
		
			<h5 class="mt0" id="next2">제2조 (개인정보파일 등록 현황)
				<img src="/images/privacy/privacyPolicy_icon19.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>① 한국교통안전공단은 개인정보를 개인정보 처리방침에서 명시한 범위 내에서 처리하고 있으며, 「개인정보 보호법」 제32조에 따라 개인정보파일을 운영하고 있습니다.</p>
			<p>② 개인정보파일의 처리목적⋅보유기간 및 항목은 개인정보파일의 특성에 따라 달리 규정하고 있으며, 개인정보파일별 상세한 내용은 아래의 링크를 통해 확인할 수 있습니다.</p>
			<p>※ <한국교통안전공단>의 개인정보 파일 등록사항 공개는 개인정보보호위원회 개인정보포털(www.privacy.go.kr)의 개인서비스→ 정보주체 권리행사 → 개인정보의 열람 등 요구 → 개인정보파일 검색 → 기관명에 “한국교통안전공단”으로 입력 후 조회하시면 확인하실 수 있습니다.</p>
			<div class="btn">
				<a class="button blue" href="https://www.privacy.go.kr/front/wcp/dcl/per/personalInfoFileSrhList.do" target="_blank">개인정보파일 검색</a>
			</div>
		
			<br>
			
			<h5 class="mt0" id="next3">제3조 (개인정보의 처리 항목 및 보유기간)
				<img src="/images/privacy/privacyPolicy_icon02-1.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
				<img src="/images/privacy/privacyPolicy_icon02-2.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>① 한국교통안전공단에서 처리하는 개인정보는 수집·이용 목적으로 명시한 범위 내에서 처리하며, 개인정보 보호법 및 관련 법령에서 정하는 보유기간을 준용하여 이행하고 있습니다.</p>
			<p>② 한국교통안전공단은 법률의 특별한 규정을 준수하거나 법령 등에서 정하는 소관 업무의 수행하기 위하여 다음과 같이 개인정보를 수집⋅이용합니다.</p>
			
			<div class="toggle-table">
				<a class="button blue toggle-button" id="btn_02">개인정보의 처리 항목 및 보유기간 (법령 등)▼</a>			
				<div>
					<table style="width:100%; table-layout:fixed;" class="table" id="table02">
						<caption>개인정보의 처리 목적, 처리하는 개인정보의 항목, 처리 및 보유기간</caption>
						<colgroup>
							<col style="width: 15%;">
							<col style="width: 15%;">
							<col style="width: 20%;">
							<col style="width: 20%;">
							<col style="width: 20%;">
							<col style="width: 15%;">
						</colgroup>				
						<thead>
							<tr>
								<th rowspan="2" scope="col">시스템명</th>
								<th rowspan="2" scope="col">개인정보파일명</th>
								<th scope="col" colspan="2">개인정보의 항목</th>
								<th rowspan="2" scope="col">운영근거</th>
								<th rowspan="2" scope="col">보유기간</th>
							</tr>
							<tr>
								<th scope="col">필수</th>
								<th scope="col">선택</th>
							</tr>
						</thead>
						<tbody>
							<tr>
							<td><p style="text-align:center; font-size:80%">운전자격확인시스템</p></td>
							<td><p style="text-align:center; font-size:80%"> 운전자격확인이력</p></td>
							<td><p style="text-align:center; font-size:80%">운전면허번호</p></td>
							<td><p style="text-align:center; font-size:80%">면허성명, 면허종별</p></td>
							<td><p style="text-align:center; font-size:80%">「개인정보 보호법」 제15조제1항제3호, 「여객자동차 운수사업법」 제34조의2제2항, 제34조의3제1항, 같은 법 시행령 제38조제3항제9의2호 및 제45조의2</p></td>
							<td><p style="text-align:center; font-size:80%">1년</p></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<p>③ 한국교통안전공단은 원활한 서비스 제공을 위해 다음의 경우 정보주체의 동의를 얻어 필요 최소한의 범위로만 개인정보를 수집⋅이용합니다.</p>
			<div class="toggle-table">
				<a class="button blue toggle-button" id="btn_13">개인정보의 처리 항목 및 보유기간 (동의)▼</a>			
				<div>
					<table style="width:100%; table-layout:fixed;" class="table" id="table13">
						<caption>개인정보의 처리 목적, 처리하는 개인정보의 항목, 처리 및 보유기간</caption>
						<colgroup>
							<col style="width: 15%;">
							<col style="width: 15%;">
							<col style="width: 20%;">
							<col style="width: 20%;">
							<col style="width: 20%;">
							<col style="width: 15%;">
						</colgroup>				
						<thead>
							<tr>
								<th rowspan="2" scope="col">시스템명</th>
								<th rowspan="2" scope="col">개인정보파일명</th>
								<th scope="col" colspan="2">개인정보의 항목</th>
								<th rowspan="2" scope="col">운영근거</th>
								<th rowspan="2" scope="col">보유기간</th>
							</tr>
							<tr>
								<th scope="col">필수</th>
								<th scope="col">선택</th>
							</tr>
						</thead>
						<tbody>
							<tr>
							
							<td><p style="text-align:center; font-size:80%">운전자격확인시스템</p></td>
							<td><p style="text-align:center; font-size:80%"> 사용자</p></td>
							<td><p style="text-align:center; font-size:80%">이름, IP주소, (주사무소⋅영업소(예약소)) 소속 회사, 전화번호, (공공기관) 기관명, 소속부서명, (지자체 담당자) 등록 지자체</p></td>
							<td><p style="text-align:center; font-size:80%">핸드폰, 보조 연락처</p></td>
							<td><p style="text-align:center; font-size:80%">「개인정보 보호법」 제15조제1항제1호에 따른 정보주체의 동의</p></td>
							<td><p style="text-align:center; font-size:80%">회원탈퇴시까지</p></td>
							</tr>
							<tr>
							
						</tbody>
					</table>
				</div>
			</div>			
		

			<br>
			
			<h5 class="mt0" id="next4">제4조 (14세 미만 아동의 개인정보 처리에 관한 사항)
				<img src="/images/privacy/privacyPolicy_icon03.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>① 한국교통안전공단은 14세 미만 아동에 대해 개인정보를 수집할 때 법정대리인의 동의를 얻어 해당 서비스 수행에 필요한 최소한의 개인정보를 수집합니다.</p>
			<p>② 한국교통안전공단은 “자동차사고 피해자 가족 등 지원업무” 및 “교육신청 및 수강(무인비행장치교육)” 목적과 관련하여 아동의 개인정보를 수집할 경우에는 법정대리인으로부터 별도의 동의를 얻습니다.</p>	
			<p>③ 한국교통안전공단은 14세 미만 아동의 개인정보를 수집할 때에는 아동에게 법정대리인의 성명, 연락처와 같이 최소한의 정보를 요구할 수 있으며, 동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고, 그 동의 표시를 확인했음을 법정대리인의 휴대전화 문자메시지로 알리는 방법으로 적법한 법정대리인이 동의하였는지를 확인합니다.</p>

			<br>
			
			<h5 class="mt0" id="next5">제5조 (개인정보 영향평가의 수행 결과)
				<img src="/images/privacy/privacyPolicy_icon04.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>① 한국교통안전공단은 운영하고 있는 개인정보처리시스템이 정보주체의 개인정보파일에 미칠 영향에 대해 조사, 분석, 평가하기 위해 ｢개인정보 보호법｣ 제33조에 따라 “개인정보 영향평가”받고 있습니다.</p>
			<p>② 한국교통안전공단은 다음 개인정보파일에 대해 영향평가를 수행하였습니다.</p>
			<div class="toggle-table">
				<a class="button blue toggle-button" id="btn_03">개인정보 영향평가의 수행▼</a>
				<div>
					<table style="width:100%; table-layout:fixed;" class="table" id="table03">
						<caption>개인정보 영향평가의 수행</caption>
						<colgroup>
							<col style="width: 20%;">
							<col style="width: 15%;">
							<col style="width: 30%;">
							<col style="width: 25%;">
						</colgroup>				
						<thead>
							<tr>
								<th scope="col">시스템명</th>
								<th scope="col">개인정보파일명</th>
								<th scope="col">사업명</th>
								<th scope="col">수행년도</th>
							</tr>
						</thead>
						<tbody>
							<tr>
							<td rowspan="2"><p style="text-align:center; font-size:80%">운전자격확인시스템</p></td>
							<td><p style="text-align:center; font-size:80%">사용자</p></td>
							<td rowspan="2"><p style="text-align:center; font-size:80%">2024년 운전자격확인시스템 구축 및 운영 사업 개인정보영향평가 용역</p></td>
							<td rowspan="2"><p style="text-align:center; font-size:80%">2024.07~2024.08</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">운전자격확인이력</p></td>
							</tr>
							<tr>
							<td rowspan="5"><p style="text-align:center; font-size:80%">운전자격확인시스템</p></td>
							<td><p style="text-align:center; font-size:80%">사용자(내부)</p></td>
							<td rowspan="5"><p style="text-align:center; font-size:80%">운전자격확인시스템 구축 및 운영 사업 개인정보영향평가 용역</p></td>
							<td rowspan="5"><p style="text-align:center; font-size:80%">2023.11~2023.12</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">개인정보 사용이력</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">운전자격확인이력</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">대여정보이력</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">API 이용이력</p></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>			

			<br>
			
			<h5 class="mt0" id="next6">제6조 (개인정보의 파기절차 및 파기방법)
				<img src="/images/privacy/privacyPolicy_icon05.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>① 한국교통안전공단은 원칙적으로 개인정보 처리목적이 달성된 개인정보는 지체 없이 파기합니다. 별도의 공간에 옮겨져 내부 방침 및 기타 관련법령에 따라 일정기간 저장된 후 파기됩니다.</p>
			<p>② 개인정보 파기의 절차 및 방법은 다음과 같습니다.</p>
			<ul>
				<li>- 파기절차
					<ul>
						<li>- 개인정보 보유기간이 만료되었거나, 개인정보의 처리목적 달성, 해당 업무 폐지 등 그 개인정보가 불필요하게 되었을 때 지체 없이 파기합니다.</li>
					</ul>
				</li>
				<li>- 파기 방법
					<ul>
						<li>- 전자적 파일형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하며, 종이 문서에 기록⦁저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.</li>
					</ul>
				</li>
			</ul>
		
			<br>
			
			<h5 class="mt0" id="next7">제7조 (개인정보의 제3자 제공)
				<img src="/images/privacy/privacyPolicy_icon06.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>① 한국교통안전공단은 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다. </p>
			<p>② 한국교통안전공단은 법률의 특별한 규정을 준수하거나 법령 등에서 정하는 소관 업무의 수행하기 위하여 다음과 같이 개인정보를 제공합니다.</p>
			<div class="toggle-table">
				<a class="button blue toggle-button" id="btn_04">개인정보의 제3자 제공 (법령 등)▼</a>			
				<div>
					<table style="width:100%; table-layout:fixed;" class="table" id="table04">
						<caption>개인정보의 제3자 제공 (법률)</caption>
						<colgroup>
							<col style="width: 17%;">
							<col style="width: 13%;">
							<col style="width: 15%;">
							<col style="width: 15%;">
							<col style="width: 15%;">
							<col style="width: 15%;">
							<col style="width: 15%;">
						</colgroup>				
						<thead>
							<tr>
								<th scope="col">시스템명</th>
								<th scope="col">개인정보파일명</th>
								<th scope="col">제공받는 자</th>
								<th scope="col">제공 목적</th>
								<th scope="col">제공 항목</th>
								<th scope="col">보유 및 이용기간</th>
								<th scope="col">제공 근거</th>								
							</tr>
						</thead>
						<tbody>
							<tr>
							<td><p style="text-align:center; font-size:80%">지역무관콜센터(채권관리)시스템</p></td>
							<td><p style="text-align:center; font-size:80%">채권매입 신청 정보</p></td>
							<td><p style="text-align:center; font-size:80%">금융기관(은행 : 우리, 신한, 하나, 농협, 부산, 대구, 국민, 광주)</p></td>
							<td><p style="text-align:center; font-size:80%">채권매입 요청</p></td>
							<td><p style="text-align:center; font-size:80%">주민(외국인)등록번호, 이름, 주소</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「지방세기본법 시행령」 제95조 1항, 
							금융실명거래 및 비밀보장에 관한 법률」 제3조 및 같은 법 시행령 제4조의2</p></td>
							</tr>
							<tr>
							<td rowspan="3"><p style="text-align:center; font-size:80%">운수종사자관리시스템</p></td>
							<td rowspan="3"><p style="text-align:center; font-size:80%">운수종사자 정보</p></td>
							<td><p style="text-align:center; font-size:80%">지자체(시·도) 및 조합, 운수업체</p></td>
							<td><p style="text-align:center; font-size:80%">운수종사자 현황 </p></td>
							<td><p style="text-align:center; font-size:80%">운수회사현황, 재직운전자명단, 입퇴사자명단, 운전면허취소,정지,철회자 명단, 운전정밀검사 미수검자명단, 버스･택시 자격증미취득자명단, 중대교통사고야기자 명단, 입퇴사7일경과 등록명단</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「여객자동차 운수사업법」 제22조제1항, 제27조제2항
							「운수종사자 관리시스템의 구축·운영 및 이용방법 등에 관한 규정」 제15조제2항</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">지자체(시·도) 및 조합, 운수업체</p></td>
							<td><p style="text-align:center; font-size:80%">운수종사자 현황 </p></td>
							<td><p style="text-align:center; font-size:80%">중대교통사고 발생자명단, 사고운전면허 취소자명단, 운전정밀검사 미수검자명단, 화물자격증 미취득자명단, 운수회사현황, 교통법규위반</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「화물자동차 운수사업법」 제10조의2제3항
							「운수종사자 관리시스템의구축·운영 및 이용방법 등에 관한 규정」 제15조제2항</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">운수업체</p></td>
							<td><p style="text-align:center; font-size:80%">신규채용(채용 예정 포함) 또는 재직운전자 관리</p></td>
							<td><p style="text-align:center; font-size:80%">주민(외국인)등록번호, 이름, 입퇴사 이력, 교통사고 법규위반정보, 운전정밀검사 이력, 운전면허 행정처분 이력, 운송종사자격증 취득 이력, 운수종사자 교육 이수 이력</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「운수종사자 관리시스템의 구축·운영 및 이용방법 등에 관한 규정」 제18조 제3항, 별지 제8호서식</p></td>
							</tr>
							<tr>
							<td rowspan="6"><p style="text-align:center; font-size:80%">국가자격시험 통합시스템(도로)</p></td>
							<td rowspan="5"><p style="text-align:center; font-size:80%">도로(화물, 버스, 택시) 자격시험 응시자 및 소유자 관리</p></td>
							<td><p style="text-align:center; font-size:80%">국가평생교육진흥원</p></td>
							<td><p style="text-align:center; font-size:80%">학점인정</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 생년월일, 자격증번호, 취득일자</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「학점인정 등에 관한 법률」 제7조 제2항 제4호</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">충청북도 개인택시 운송사업조합</p></td>
							<td><p style="text-align:center; font-size:80%">신규 택시 자격번호 부여</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 주민등록번호, 자격증번호, 취득일자</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「운수종사자 관리시스템의 구축·운영 및 이용 방법 등에 관한 규정」 제15조</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">지자체 및 조합, 경찰청, 국방부, 채용업체, 화물복지단체</p></td>
							<td><p style="text-align:center; font-size:80%">도로자격 자격증 진위여부</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 생년월일, 핸드폰, 검사결과, 자격번호, 취득일자, 재발급이력, 성별</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「여객자동차 운수사업법」 제22조의 2</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">지자체 및 조합, 경찰청, 국방부</p></td>
							<td><p style="text-align:center; font-size:80%">도로자격시험 예약내역 검증</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 생년월일, 핸드폰, 예약내역</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「여객자동차 운수사업법」 제22조의 2</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">지자체</p></td>
							<td><p style="text-align:center; font-size:80%">카드단말기 상 자격번호 입력</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 주민등록번호, 자격증번호</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「여객자동차 운수사업법」 제38조 제7항</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">교통안전관리자 자격시험 응시자 및 소유자 관리</p></td>
							<td><p style="text-align:center; font-size:80%">국가평생교육진흥원</p></td>
							<td><p style="text-align:center; font-size:80%">학점인정</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 생년월일, 자격증번호, 취득일자</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「학점인정 등에 관한 법률」 제7조 제2항 제4호</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">위험물질운송 안전관리시스템</p></td>
							<td><p style="text-align:center; font-size:80%">운전자정보</p></td>
							<td><p style="text-align:center; font-size:80%">소방청, 한국도로공사, 경찰청, 대테러센터, 국가위기관리센터, 대통령경호처, 단말기통신사(SKT, KT, 에스원)</p></td>
							<td><p style="text-align:center; font-size:80%">고속도로 사고 발생 시 대응, 이용자에 대한 정보지원금의 분리납부 및 A/S 지원</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 핸드폰</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「물류정책기본법 제29조 제2항 제4호</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">지원사업정보시스템</p></td>
							<td><p style="text-align:center; font-size:80%">자동차사고 피해지원자파일</p></td>
							<td><p style="text-align:center; font-size:80%">국민권익위원회</p></td>
							<td><p style="text-align:center; font-size:80%">공공기관의 종합청렴도 평가를위한 민원인, 직원에 대한 설문조사 실시</p></td>
							<td><p style="text-align:center; font-size:80%">생활자금대출 및 장학금지원 민원인의 이름, 전화번호, 이메일</p></td>
							<td><p style="text-align:center; font-size:80%">종합청렴도
							조사완료시까지</p></td>
							<td><p style="text-align:center; font-size:80%">「개인정보보호법」제18조제2항제2호,
							「부패방지 및 국민권익위원회의 설치와 운영에 관한 법률」
							12조제6호,제27조의2,제29조</p></td>
							</tr>
							<tr>
							<td rowspan="4"><p style="text-align:center; font-size:80%">국가자격시험 통합시스템(철도)</p></td>
							<td rowspan="4"><p style="text-align:center; font-size:80%">자격시험응시</p></td>
							<td><p style="text-align:center; font-size:80%">국가평생교육진흥원</p></td>
							<td><p style="text-align:center; font-size:80%">학점인증 신청관련 자격 진위여부</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 생년월일, 자격면허종류, 취득일, 자격유효기간</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「개인정보보호법 제15조 제1항 제3호, 제17조 제1항 제2호</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">병무청</p></td>
							<td><p style="text-align:center; font-size:80%">확인신체검사, 병역의무이행일 연기관련 정보 확인</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 생년월일, 자격면허종류, 취득일, 자격유효기간</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「개인정보보호법」 제15조제1항제3호, 병역법 제11조의2 및 제77조의 2</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">철도운영기관</p></td>
							<td><p style="text-align:center; font-size:80%">채용 지원자 자격진위 확인</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 생년월일, 자격면허종류, 취득일, 자격유효기간</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「개인정보보호법 제15조 제1항 제3호, 제17조 제1항 제2호</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">철도사법경찰대</p></td>
							<td><p style="text-align:center; font-size:80%">철도사고. 사건 관련 철도종사자 자격 관련 진위 확인</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 생년월일, 자격면허번호, 자격면허종류, 취득일, 자격유효기간</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">개인정보보호법 제15조 제1항 제3호, 형사소송법 제199조</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">자동차검사 관리시스템</p></td>
							<td><p style="text-align:center; font-size:80%">자동차 소유자 정보</p></td>
							<td><p style="text-align:center; font-size:80%">행정안전부</p></td>
							<td><p style="text-align:center; font-size:80%">자동차 검사(튜닝)에 따른 등록면허세 납부</p></td>
							<td><p style="text-align:center; font-size:80%">소유자 이름, 소유자 주소, 차대번호, 자동차등록번호</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「공공기관 운영에 관한 법률」 제13조제2항, 같은 법 시행령 제17조제3항</p></td>
							</tr>
							<tr>
							<td rowspan="3"><p style="text-align:center; font-size:80%">사이버검사소 시스템</p></td>
							<td><p style="text-align:center; font-size:80%">자동차 소유자 정보</p></td>
							<td><p style="text-align:center; font-size:80%">한국도로공사</p></td>
							<td><p style="text-align:center; font-size:80%">자동차의 소유자 진위확인에 이용</p></td>
							<td><p style="text-align:center; font-size:80%">자동차 소유자 진위 여부</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「자동차관리법」 제69조의2, 제77조 제10항 같은 법 시행령 제14조의2, 제14조의3, 제14조의4, 같은 법 시행규칙 제150조제2항</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">홈페이지 회원정보</p></td>
							<td><p style="text-align:center; font-size:80%">국민권익위원회</p></td>
							<td><p style="text-align:center; font-size:80%">공공기관의 종합청렴도 평가를위한 민원인, 직원에 대한 설문조사 실시</p></td>
							<td><p style="text-align:center; font-size:80%">튜닝승인 민원인의 이름, 전화번호, 이메일</p></td>
							<td><p style="text-align:center; font-size:80%">종합청렴도
							조사완료시까지</p></td>
							<td><p style="text-align:center; font-size:80%">「개인정보보호법」제18조제2항제2호,
							「부패방지 및 국민권익위원회의 설치와 운영에 관한 법률」
							12조제6호,제27조의2,제29조</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">교육신청자 정보</p></td>
							<td><p style="text-align:center; font-size:80%">고용노동부(직업능력개발정보)</p></td>
							<td><p style="text-align:center; font-size:80%">근로자직업능력개발 훈련에 관한 사무</p></td>
							<td><p style="text-align:center; font-size:80%">주민(외국인)등록번호, 이름</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">「고용보험법」 시행령 제145조의2,「국민 평생 직업능력개발법 시행령」제145조의2</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">특수검사 관리시스템</p></td>
							<td><p style="text-align:center; font-size:80%">특수검사 대상 업체정보</p></td>
							<td><p style="text-align:center; font-size:80%">국민권익위원회</p></td>
							<td><p style="text-align:center; font-size:80%">공공기관의 종합청렴도 평가를위한 민원인, 직원에 대한 설문조사 실시</p></td>
							<td><p style="text-align:center; font-size:80%">기기정도검사 민원인의 이름, 전화번호, 이메일</p></td>
							<td><p style="text-align:center; font-size:80%">종합청렴도
							조사완료시까지</p></td>
							<td><p style="text-align:center; font-size:80%">「개인정보보호법」제18조제2항제2호,
							「부패방지 및 국민권익위원회의 설치와 운영에 관한 법률」
							12조제6호,제27조의2,제29조</p></td>
							</tr>
							<tr>
							<td rowspan="2"><p style="text-align:center; font-size:80%">통합경영관리시스템(회계·계약)</p></td>
							<td rowspan="2"><p style="text-align:center; font-size:80%">회계및계약정보</p></td>
							<td><p style="text-align:center; font-size:80%">국세청</p></td>
							<td><p style="text-align:center; font-size:80%">국세청에 세무신고 및 납세</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 생년월일, 주민등록번호, 사업자등록번호, 법인등록번호</p></td>
							<td><p style="text-align:center; font-size:80%">5년</p></td>
							<td><p style="text-align:center; font-size:80%">「법인세법」제3조(납세의무자) 및제4조(과세소득의범위), 「소득세법」제2조(납세의무) 및제137조(근로소득세액의 연말정산), 「부가가치세법」제3조(납세의무자), 「지방세법」및「지방세징수법」, 「국가계약법」제6조(계약사무의위임·위탁) 및제7조(계약의방법), 「국세기본법」제85조의 3(장부등의비치와보존)</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">국민권익위원회</p></td>
							<td><p style="text-align:center; font-size:80%">공공기관의 종합청렴도 평가를위한 민원인, 직원에 대한 설문조사 실시</p></td>
							<td><p style="text-align:center; font-size:80%">계약 및 관리 업무(측정업무명) 민원인 및 소속 직원의 이름, 전화번호, 이메일</p></td>
							<td><p style="text-align:center; font-size:80%">종합청렴도
							조사완료시까지</p></td>
							<td><p style="text-align:center; font-size:80%">「개인정보보호법」제18조제2항제2호,
							「부패방지 및 국민권익위원회의 설치와 운영에 관한 법률」
							12조제6호,제27조의2,제29조</p></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			
			<p>③ 한국교통안전공단은 원활한 서비스 제공을 위해 다음의 경우 정보주체의 동의를 얻어 필요 최소한의 범위로만 제공합니다.</p>
			<div class="toggle-table">
				<a class="button blue toggle-button" id="btn_05">개인정보의 제3자 제공 (동의)▼</a>			
				<div>
					<table style="width:100%; table-layout:fixed;" class="table" id="table05">
						<caption>개인정보의 제3자 제공 (동의)</caption>
						<colgroup>
							<col style="width: 15%;">
							<col style="width: 15%;">
							<col style="width: 15%;">
							<col style="width: 15%;">
							<col style="width: 15%;">
							<col style="width: 15%;">
							<col style="width: 15%;">
						</colgroup>				
						<thead>
							<tr>
								<th scope="col">시스템명</th>
								<th scope="col">개인정보파일명</th>
								<th scope="col">제공받는 자</th>
								<th scope="col">제공 목적</th>
								<th scope="col">제공 항목</th>
								<th scope="col">보유 및 이용기간</th>
								<th scope="col">제공 근거</th>								
							</tr>
						</thead>
						<tbody>
							<tr>
							<td><p style="text-align:center; font-size:80%">국가자격시험 통합시스템(도로)</p></td>
							<td><p style="text-align:center; font-size:80%">도로분야(화물, 버스, 택시) 자격시험 응시자 및 소유자 관리</p></td>
							<td><p style="text-align:center; font-size:80%">네이버</p></td>
							<td><p style="text-align:center; font-size:80%">취득 자격정보를 자격증 서비스에서 확인</p></td>
							<td><p style="text-align:center; font-size:80%">자격증번호, 자격증종류, 사진</p></td>
							<td><p style="text-align:center; font-size:80%">서비스 가입 해지 시 또는 네이버 회원 탈퇴 시까지</p></td>
							<td><p style="text-align:center; font-size:80%">정보주체의 동의</p></td>
							</tr>
							<tr>
							<td rowspan="2"><p style="text-align:center; font-size:80%">운전적성 정밀검사시스템</p></td>
							<td><p style="text-align:center; font-size:80%">검사결과 정보</p></td>
							<td><p style="text-align:center; font-size:80%">지자체 및 조합, 경찰청, 국방부, 채용업체, 화물복지단체</p></td>
							<td><p style="text-align:center; font-size:80%">운전적성 정밀검사 결과 검증</p></td>
							<td><p style="text-align:center; font-size:80%">성명, 생년월일, 검사 결과, 재발급이력(필요시), 성별(필요시)</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성시까지</p></td>
							<td><p style="text-align:center; font-size:80%">정보주체의 동의</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">홈페이지 예약정보</p></td>
							<td><p style="text-align:center; font-size:80%">지자체 및 조합, 경찰청, 국방부</p></td>
							<td><p style="text-align:center; font-size:80%">운전적성정밀검사 예약내역 검증</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 생년월일, 예약내역</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성시까지</p></td>
							<td><p style="text-align:center; font-size:80%">정보주체의 동의</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">드론 정보통합시스템</p></td>
							<td><p style="text-align:center; font-size:80%">비행승인</p></td>
							<td><p style="text-align:center; font-size:80%">경찰청</p></td>
							<td><p style="text-align:center; font-size:80%">비행승인여부 확인</p></td>
							<td><p style="text-align:center; font-size:80%">성명, 생년월일, 연락처</p></td>
							<td><p style="text-align:center; font-size:80%">비행승인의 비행기간 종료시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">정보주체의 동의</p></td>
							</tr>
							<tr>
							<td rowspan="3"><p style="text-align:center; font-size:80%">기계식주차장 정보시스템</p></td>
							<td><p style="text-align:center; font-size:80%">기계식 주차장 관리인 교육정보</p></td>
							<td><p style="text-align:center; font-size:80%">국토교통부, 지자체</p></td>
							<td><p style="text-align:center; font-size:80%">기계식주차장 관리인교육 수료여부 확인</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 생년월일, 자택주소, 근무지주소, 휴대폰번호, 수료번호</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시까지</p></td>
							<td><p style="text-align:center; font-size:80%">정보주체의 동의</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">기계식 주차장 관리자 정보</p></td>
							<td><p style="text-align:center; font-size:80%">국토교통부, 승강기안전공단, 주차안전기술원, 지자체</p></td>
							<td><p style="text-align:center; font-size:80%">검사일정 및 검사이력 관리</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 핸드폰번호, 일반전화번호, 설치장소</p></td>
							<td><p style="text-align:center; font-size:80%">관리자 변경 시 삭제조치</p></td>
							<td><p style="text-align:center; font-size:80%">정보주체의 동의</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">기계식주차장 사고조사 정보</p></td>
							<td><p style="text-align:center; font-size:80%">국토교통부, 지자체</p></td>
							<td><p style="text-align:center; font-size:80%">기계식주차장 사고조사</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 전화번호, 기계식주차장정보, 사고발생일시 및 피해정도등</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">정보주체의 동의</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">자동차제작결함 시스템</p></td>
							<td><p style="text-align:center; font-size:80%">자동차 결함정보 수집파일(결함신고)</p></td>
							<td><p style="text-align:center; font-size:80%">한국소비자원</p></td>
							<td><p style="text-align:center; font-size:80%">소비자 보호를 위한 결함정보 공유</p></td>
							<td><p style="text-align:center; font-size:80%">이름, 핸드폰, E-Mail, 결함내용,제작사명, 차명</p></td>
							<td><p style="text-align:center; font-size:80%">목적 달성 시 까지</p></td>
							<td><p style="text-align:center; font-size:80%">정보주체의 동의</p></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>	
			<p>④ 한국교통안전공단은 「개인정보보호법」 제18조제1항에 따라 수집⋅이용 및 제공 범위를 초과하여 개인정보를 이용하거나 제공하지 않습니다. 한국교통안전공단은 「개인정보보호법」 제18조제2항에 따라 다른 법률에 특별한 규정이 있는 경우 등에는 개인정보를 목적 외의 용도로 이용하거나 이를 제3자에게 제공할 수 있습니다. </p>
			<p>※ 보다 상세한 <한국교통안전공단>의 개인정보 목적 외 이용⋅제공에 관한 사항은 공단 홈페이지(www.kotsa.or.kr)의 이용안내 → 개인정보처리방침 → 개인정보 목적 외 이용⋅제공 게시판에서 조회 및 확인하실 수 있습니다.</p>
			<div class="btn">
				<a class="button blue" href="https://www.kotsa.or.kr/portal/bbs/privprovision_list.do?menuCode=07020300" target="_blank">개인정보 목적 외 이용⋅제공</a>
			</div>
			
			<br>			
			
			<h5 class="mt0" id="next8">제8조 (추가적인 이용 · 제공의 판단기준)</h5>
			<h6 class="title_none">① 개인정보의 추가적인 이용 여부</h6>
			<p>현재 한국교통안전공단이 수집, 이용중인 개인정보파일중에서 개인정보의 추가적인 이용 및 제공 사항은 없습니다.</p>
			<h6 class="title_none">② 개인정보의 추가적인 이용 및 제공의 기준</h6>
			<p>한국교통안전공단은 「개인정보보호법」제15조제3항 및 제17조제4항, 「개인정보보호법 시행령」제14조의2 제1'항에 따라 정보주체의 동의 없이 개인정보를 추가적으로 이용 · 제공할 수 있습니다. 이에 따라, 공단이 정보주체의 동의 없이 추가적인 이용 및 제공을 하기 위해서는 다음과 같은 사항을 고려할 예정입니다.</p>
			<ul>
				<li>- 개인정보를 추가적으로 이용 · 처리하려는 목적이 당초 수집 목적과 관련성이 있는지 여부</li>
				<li>- 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용 · 제공에 대한 예측가능성이 있는지 여부</li>
				<li>- 개인정보의 추가적인 이용 · 제공이 정보주체의 이익을 부당하게 침해하는지 여부</li>
				<li>- 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부</li>
			</ul>				

			<br>

			<h5 class="mt0" id="next9">제9조 (개인정보 처리의 위탁)
				<img src="/images/privacy/privacyPolicy_icon08.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>① 한국교통안전공단은 원활한 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁 하고 있습니다.</p>
			<div class="toggle-table">
				<a class="button blue toggle-button" id="btn_06">개인정보 처리의 위탁▼</a>
				<div>
					<table style="width:100%; table-layout:fixed;" class="table" id="table06">
						<caption>개인정보 처리의 위탁</caption>
						<colgroup>
							<col style="width: 10%;">
							<col style="width: 20%;">
							<col style="width: 20%;">
							<col style="width: 20%;">
							<col style="width: 30%;">
						</colgroup>				
						<thead>
							<tr>
								<th scope="col" rowspan="2">순번</th>
								<th scope="col" rowspan="2">부서명</th>
								<th scope="col" colspan="2">위탁받는 자</th>
								<th scope="col" rowspan="2">위탁 업무</th>
							</tr>
							<tr>
								<th scope="col">수탁자</th>
								<th scope="col">재수탁자</th>
							</tr>							
						</thead>
						<tbody>
							<tr>
							<td rowspan="2"><p style="text-align:center; font-size:80%">1</p></td>
							<td rowspan="2"><p style="text-align:center; font-size:80%">한국교통안전공단 정보운영처</p></td>
							<td><p style="text-align:center; font-size:80%">대신정보통신</p></td>
							<td><p style="text-align:center; font-size:80%">㈜씨유소프트</p></td>
							<td rowspan="2"><p style="text-align:center; font-size:80%">2024~2025 한국교통안전공단 정보시스템 통합 유지관리 용역</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">㈜엠티데이타</p></td>
							<td><p style="text-align:center; font-size:80%">㈜유니디아</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">2</p></td>
							<td><p style="text-align:center; font-size:80%">한국교통안전공단 교통물류정책처</p></td>
							<td colspan="2"><p style="text-align:center; font-size:80%">네이버시스템즈</p></td>
							<td colspan="2"><p style="text-align:center; font-size:80%">2024년 위험물질운송 안전관리시스템 유지보수 용역</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">3</p></td>
							<td><p style="text-align:center; font-size:80%;">한국교통안전공단 대외협력실</p></td>
							<td colspan="2"><p style="text-align:center; font-size:80%;">칼리그램</p></td>
							<td colspan="2"><p style="text-align:center; font-size:80%;">TS매거진 제작 용역</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">4</p></td>
							<td><p style="text-align:center; font-size:80%;">한국교통안전공단 정보보안처</p></td>
							<td colspan="2"><p style="text-align:center; font-size:80%;">(주)싸이버원</p></td>
							<td colspan="2"><p style="text-align:center; font-size:80%;">공단 정보시스템 웹취약점 점검</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">5</p></td>
							<td><p style="text-align:center; font-size:80%;">한국교통안전공단 운영지원처</p></td>
							<td colspan="2"><p style="text-align:center; font-size:80%;">(주)현대이지웰페어</p></td>
							<td colspan="2"><p style="text-align:center; font-size:80%;">선택적 복리후생 컨설팅 및 서비스협약서</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">6</p></td>
							<td><p style="text-align:center; font-size:80%;">한국교통안전공단 인재개발처</p></td>
							<td colspan="2"><p style="text-align:center; font-size:80%;">㈜휴스테이션</p></td>
							<td colspan="2"><p style="text-align:center; font-size:80%;">직무중심 채용위탁 용역</p></td>
							</tr>
							<tr>
							<td><p style="text-align:center; font-size:80%">7</p></td>
							<td><p style="text-align:center; font-size:80%;">한국교통안전공단 인재개발처</p></td>
							<td colspan="2"><p style="text-align:center; font-size:80%;">인트로맨(주)</p></td>
							<td colspan="2"><p style="text-align:center; font-size:80%;">기간제근로자 채용 위탁 용역</p></td>
							</tr>
							<tr>
								<td><p style="text-align:center; font-size:80%">8</p></td>
								<td><p style="text-align:center; font-size:80%;">한국교통안전공단 인재개발처</p></td>
								<td colspan="2"><p style="text-align:center; font-size:80%;">(주)현대경제연구원</p></td>
								<td colspan="2"><p style="text-align:center; font-size:80%;">사이버연수원 위탁운영</p></td>
							</tr>
							<tr>
								<td><p style="text-align:center; font-size:80%">9</p></td>
								<td><p style="text-align:center; font-size:80%;">한국교통안전공단 고객소통처</p></td>
								<td><p style="text-align:center; font-size:80%;">한국능률협회컨설팅</p></td>
								<td><p style="text-align:center; font-size:80%;">㈜코리아리서치인터내셔널</p></td>
								<td><p style="text-align:center; font-size:80%;">2024년도 공공기관 고객만족도 조사</p></td>
							</tr>
							<tr>
								<td><p style="text-align:center; font-size:80%">10</p></td>
								<td><p style="text-align:center; font-size:80%;">한국교통안전공단 검사운영처</p></td>
								<td colspan="2"><p style="text-align:center; font-size:80%;">(주)카카오페이</p></td>
								<td colspan="2"><p style="text-align:center; font-size:80%;">모바일공인전자 안내(자동차검사 사전안내 전자문서)</p></td>
							</tr>
							<tr>
								<td><p style="text-align:center; font-size:80%">11</p></td>
								<td><p style="text-align:center; font-size:80%;">한국교통안전공단 검사운영처</p></td>
								<td colspan="2"><p style="text-align:center; font-size:80%;">장애인자립지원단</p></td>
								<td colspan="2"><p style="text-align:center; font-size:80%;">자동차검사 사전안내문(우편) 제작 용역</p></td>
							</tr>
							<tr>
								<td><p style="text-align:center; font-size:80%">12</p></td>
								<td><p style="text-align:center; font-size:80%;">한국교통안전공단 모빌리티플랫폼처</p></td>
								<td colspan="2"><p style="text-align:center; font-size:80%;">네이버시스템즈</p></td>
								<td colspan="2"><p style="text-align:center; font-size:80%;">운전자격확인시스템 관리</p></td>
							</tr>
							<tr>
								<td><p style="text-align:center; font-size:80%">13</p></td>
								<td><p style="text-align:center; font-size:80%;">한국교통안전공단 리콜센터</p></td>
								<td colspan="2"><p style="text-align:center; font-size:80%;">(주)포스토피아</p></td>
								<td colspan="2"><p style="text-align:center; font-size:80%;">리콜통지문 및 창봉투 제작·발송</p></td>
							</tr>							
						</tbody>
					</table>
				</div>
			</div>				
			<p>② 한국교통안전공단은 개인정보의 처리업무를 위탁하는 경우 아래의 내용이 포함된 문서 에 의하여 처리하고 있으며, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.</p>
			<ul>
				<li>- 위탁업무 수행 목적 외 개인정보의 처리 금지에 관한 사항</li>
				<li>- 개인정보의 관리적·기술적 보호조치에 관한 사항</li>
				<li>- 개인정보의 안전관리에 관한 사항 : 위탁업무의 목적 및 범위, 재위탁 제한에 관한 사항, 개인정보 안전성 확보 조치에 관한 사항, 위탁업무와 관련하여 보유하고 있는 개인정보의 관리현황점검 등 감독에 관한 사항, 수탁자가 준수하여야 할 의무를 위반한 경우의 손해배상책임에 관한 사항</li>
			</ul>
			<p>③「개인정보 보호법」 제26조 제6항에 따라 수탁자가 당사의 개인정보 처리업무를 재위탁하는 경우 한국교통안전공단의 동의를 받고 있습니다.</p>
			<p>④ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 본 개인정보 처리방침을 통 하여 공개하도록 하겠습니다.</p>

			<br>
			
			<h5 class="mt0" id="next10">제10조 (개인정보의 안전성 확보 조치)
				<img src="/images/privacy/privacyPolicy_icon09.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>한국교통안전공단은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
			<h6 class="title_none">- 개인정보 취급 직원의 최소화 및 교육</h6>
			<p>개인정보를 취급하는 직원은 반드시 필요한 인원에 한하여 지정  ·  관리하고 있으며 취급직원을 대상으로 안전한 관리를 위한 교육을 실시하고 있습니다.</p>
			<h6 class="title_none">- 개인정보에 대한 접근 제한</h6>
			<p>개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여 · 변경 · 말소를 통하여 개인정보에 대한 접근통제를 위한 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.</p>
			<h6 class="title_none">- 접속기록의 보관</h6>
			<p>개인정보처리시스템에 접속한 기록을 최소 1년 이상 보관 · 관리하고 있습니다.<br>다만, 5만 명 이상의 정보주체에 관하여 개인정보를 처리하거나, 고유식별정보 또는 민감정보를 처리하는 개인정보처리시스템의 경우에는 2년 이상 보관·관리하고 있습니다.</p>
			<h6 class="title_none">- 개인정보의 암호화</h6>
			<p>개인정보는 암호화 등을 통해 안전하게 저장 및 관리되고 있습니다. 또한 중요한 데이터는 저장 및 전송 시 암호화하여 사용 하는 등의 별도 보안기능을 사용하고 있습니다.</p>
			<h6 class="title_none">- 보안프로그램 설치 및 주기적 점검 · 갱신</h6>
			<p>해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적으로 갱신 · 점검 하고 있습니다.</p>
			<h6 class="title_none">- 비인가자에 대한 출입 통제</h6>
			<p>개인정보를 보관하고 있는 개인정보시스템의 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.</p>
			<h6 class="title_none">- 정기적인 자체 점검 실시</h6>
			<p>개인정보 취급 관련 안전성 확보를 위해 정기적으로 개인정보 보호 관리 점검을 실시하고 있습니다.</p>
			<h6 class="title_none">- 내부관리 계획의 수립</h6>
			<p>개인정보의 안전한 처리를 위하여 내부관리계획을 수립하여 시행하고 있습니다.</p>

			<br>

			<h5 class="mt0" id="next11">제11조 (민감정보의 공개 가능성 및 비공개를 선택하는 방법)
				<img src="/images/privacy/privacyPolicy_icon10.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>① 한국교통안전공단은 일부 개인정보처리시스템에서 정보주체의 민감정보를 법령 또는 정보주체의 동의에 따라 수집하고 있으며, 수집 목적 이외에는 공개하고 있지 않습니다.</p>
			
			<br>			

			<h5 class="mt0" id="next12">제12조 (가명정보 처리에 관한 사항)
				<img src="/images/privacy/privacyPolicy_icon20.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>① 한국교통안전공단은 수집한 개인정보를 개인정보 보호법 제28조의2에 따라 통계작성, 과학적 연구, 공익적 기록보존 등을 위하여 특정 개인을 알아볼 수 없도록 가명처리하여 다음과 같이 활용하고 있습니다.</p>
			<ul>
				<li>- 가명정보의 처리에 관한 사항</li>
			</ul>	
			<div class="toggle-table">
				<a class="button blue toggle-button" id="btn_11">가명정보의 처리에 관한 사항 ▼</a>
				<div>
					<table style="width:100%; table-layout:fixed;" class="table" id="table11">
						<caption>가명정보의 처리에 관한 사항</caption>
						<colgroup>
							<col style="width: 25%;">
							<col style="width: 25%;">
							<col style="width: 25%;">
							<col style="width: 25%;">
						</colgroup>				
						<thead>
							<tr>
								<th>구분</th>
								<th>처리 목적</th>
								<th>처리 항목</th>
								<th>처리 기간</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><p style="text-align:center; font-size:80%">GTX-A 노선 개통에 따른 대중교통 통행패턴변화 연구</p></td>
								<td><p style="text-align:center; font-size:80%">GTX-A 노선 개통에 따른 대중교통 통행패턴변화 분석</p></td>
								<td><p style="text-align:center; font-size:80%">카드번호, 차량번호, 승⋅하차 시간</p></td>
								<td><p style="text-align:center; font-size:80%">2024.09.19.~2024.09.30.</p></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<ul>
				<li>- 가명정보의 제3자 제공에 관한 사항</li>
			</ul>
			<div class="toggle-table">
				<a class="button blue toggle-button" id="btn_12">가명정보의 제3자 제공에 관한 사항 ▼</a>
				<div>
					<table style="width:100%; table-layout:fixed;" class="table" id="table12">
					<caption>가명정보의 제3자 제공에 관한 사항</caption>
						<colgroup>
							<col style="width: 25%;">
							<col style="width: 25%;">
							<col style="width: 25%;">
							<col style="width: 25%;">
						</colgroup>				
						<thead>
							<tr>
								<th>제공받는 자</th>
								<th>제공받는 자의 이용 목적</th>
								<th>제공하는 항목</th>
								<th>제공받는 자의 보유 및 이용기간</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><p style="text-align:center; font-size:80%">경기도 성남시</p></td>
								<td><p style="text-align:center; font-size:80%">GTX-A 노선 개통에 따른 대중교통 통행패턴변화 분석</p></td>
								<td><p style="text-align:center; font-size:80%">카드번호, 차량번호, 승⋅하차 시간</p></td>
								<td><p style="text-align:center; font-size:80%">2024.09.23.~2024.09.30.</p></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>		
			<ul>
				<li>- 가명정보 처리의 위탁을 하고 있지 않습니다.</li>
				<li>- 법 제28조의4(가명정보에 대한 안전조치 의무 등)에 따른 가명정보의 안전성 확보조치에 관한 사항
					<ul>
						<li>• 관리적 조치 : 내부관리계획 수립・시행, 정기적 직원 교육</li>
						<li>• 기술적 조치 : 가명정보 처리자 및 추가정보 처리자 접근권한 관리, 접근통제시스템 설치, 보안프로그램 설치 및 운영, 공단 망분리 통한 인터넷 연결 원천 차단 등</li>
						<li>• 물리적 조치 : 정보통신실 등의 접근통제 실시</li>
					</ul>
				</li>
			</ul>			
				
			<br>
				
			<h5 class="mt0" id="next13">제13조 (개인정보 자동 수집하는 장치의 설치ㆍ운영 및 거부에 관한 사항)
				<img src="/images/privacy/privacyPolicy_icon11.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<h6 class="title_none">< 설치·운영하는 개인정보 자동 수집 장치 ></h6>
			<p style="margin-left:0px;">① 한국교통안전공단은 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.</p>
			<p>② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에 보내는 소량의 정보이며 이용자의 PC 컴퓨터 내의 하드디스크에 저장되기도 합니다.</p>
			<ul>
				<li>1. 쿠키의 사용목적 : 이용자가 방문한 각 서비스와 웹사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.</li>
			</ul>
			<p>③ 정보주체는 웹 브라우저 옵션 설정을 통해 쿠키 허용, 차단 등의 설정을 할 수 있습니다. 다만, 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</p>
			<ul>
				<li>- 웹 브라우저에서 쿠키 허용/차단
					<ul>
						<li>• 크롬(Chrome) : 웹 브라우저 설정 > 개인정보 보호 및 보안 > 인터넷 사용 기록 삭제</li>
						<li>• 엣지(Edge) : 웹 브라우저 설정 > 쿠키 및 사이트 권한 > 쿠키 및 사이트 데이터 관리 및 삭제</li>
					</ul>
				</li>
				<li>- 모바일 브라우저에서 쿠키 허용/차단
					<ul>
						<li>• 크롬(Chrome) : 모바일 브라우저 설정 > 개인정보 보호 및 보안 > 인터넷 사용 기록 삭제</li>
						<li>• 사파리(Safari) : 모바일 기기 설정 > 사파리(Safari) > 고급 > 모든 쿠키 차단</li>
						<li>• 삼성 인터넷 : 모바일 브라우저 설정 > 인터넷 사용 기록 > 인터넷 사용 기록 삭제</li>
					</ul>
				</li>
			</ul>			
			<h6 class="title_none">< 행태정보의 수집・이용・제공 및 거부 등에 관한 사항 ></h6>			
			<p style="margin-left:0px;">① 한국교통안전공단은 서비스 이용과정에서 정보주체에게 최적화된 맞춤형 서비스 및 혜택, 온라인 맞춤형 광고 등을 제공하기 위하여 쿠키를 활용하여 개인을 식별하고, 행태정보를 수집・이용하지 않습니다.</p>	
			<p>② 한국교통안전공단은 사상, 신념, 학력・병력 등 개인의 권리・이익이나 사생활을 침해할 우려가 있는 민감한 행태정보를 수집하지 않습니다.</p>	

			<br>
				
			<h5 class="mt0" id="next14">제14조 (정보주체와 법정대리인의 권리 · 의무 및 그 행사 방법에 관한 사항)
				<img src="/images/privacy/privacyPolicy_icon12.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>① 정보주체는 한국교통안전공단에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 및 철회 요구, 자동화된 결정에 대한 거부 또는 설명 요구 등의 권리를 행사할 수 있습니다.<br/>
			※ 14세 미만의 아동에 관한 개인정보의 열람등 요구는 법정대리인이 직접해야 하며, 14세 이상의 미성년자인 정보주체는 정보주체의 개인정보에 관하여 미성년자 본인이 권리를 행사하거나 법정대리인을 통하여 권리를 행사할 수도 있습니다.
			</p>
			<p>② 정보주체의 권리 행사는 한국교통안전공단에 대해 「개인정보 보호법」 시행령 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 한국교통안전공단은 이에 대해 지체없이 조치하겠습니다. </p>
				<ul>
					<li>- 정보주체는 언제든지 홈페이지 ‘마이페이지 > 내정보관리’에서 개인정보를 직접 조회・수정・삭제하거나 열람을 요청할 수 있습니다. </li>
					<li>- 정보주체는 언제든지 ‘마이페이지 > 회원탈퇴’를 통해 개인정보의 수집 및 이용 동의 철회가 가능합니다. </li>
					<li>- 정보주체는 언제든지 홈페이지 ‘민원⋅신고 > 상담문의’를 통해 자동화된 결정의 설명 및 거부 요구가 가능합니다.</li>
				</ul>
				<ul>
					<li>< 개인정보 열람 요구 >
						<p>한국교통안전공단에서 보유하고 있는 개인정보파일은 「개인정보보호법」 제35조(개인정 보의 열람)에 따라 자신의 개인정보에 대한 열람을 요구할 수 있습니다. 다만, 개인정보 열람 요구는 법 제35조 4항에 의하여 아래와 같이 제한될 수 있습니다.</p>
						<ul>
							<li>- 법률에 따라 열람이 금지되거나 제한되는 경우</li>
							<li>- 다른 사람의 생명·신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이 익을 부당하게 침해할 우려가 있는 경우</li>
							<li>- 공공기관이 아래 각 목의 어느 하나에 해당하는 업무를 수행할 때 중대한 지장 을 초래하는 경우
								<ul>
									<li>· 조세의 부과·징수 또는 환급에 관한 업무</li>
									<li>· 학력·기능 및 채용에 관한 시험, 자격 심사에 관한 업무</li>
									<li>· 보상금·급부금 산정 등에 대하여 진행 중인 평가 또는 판단에 관한 업무</li>
									<li>· 다른 법률에 따라 진행 중인 감사 및 조사에 관한 업무</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>			
				<div class="mt10">
					<a title="새창열림" class="button ico right down" href="/resources/upload/weblink/개인정보(열람, 정정ㆍ삭제, 처리정지, 동의철회) 요구서.hwp" target="_blank">개인정보 열람 요구서</a>
				</div>			
				<ul>
					<li>< 개인정보 정정·삭제 요구 >
						<p>한국교통안전공단에서 보유하고 있는 개인정보파일은 「개인정보보호법」 제36조(개인 정보의 정정·삭제)에 따라 정정·삭제를 요구할 수 있습니다. 다만, 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다. 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.</p>
					</li>
				</ul>
				<div class="mt10">
					<a title="새창열림" class="button ico right down" href="/resources/upload/weblink/개인정보(열람, 정정ㆍ삭제, 처리정지, 동의철회) 요구서.hwp" target="_blank">개인정보 정정ㆍ삭제 요구서</a>
				</div>	
				<ul>
					<li>< 개인정보 처리정지 등 요구 >
						<p>한국교통안전공단에서 보유하고 있는 개인정보파일은 「개인정보보호법」 제37조(개인 정보의 처리정지 등)에 따라 처리정지 또는 동의철회를 요구할 수 있습니다. 다만, 개인정보 처리정 지 요구 시 법 제37조 2항에 의하여 처리정지 또는 동의철회 요구가 거절될 수 있습니다.</p>
						<ul>
							<li>- 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우 </li>
							<li>- 다른 사람의 생명·신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의    이익을 부당하게 침해할 우려가 있는 경우</li>
							<li>- 공공기관이 개인정보를 처리하지 아니하면 다른 법률에서 정하는 소관 업무를 수행할 수 없는 경우</li>
							<li>- 개인정보를 처리하지 아니하면 정보주체와 약정한 서비스를 제공하지 못하는 등 계약의 이행이 곤란한 경우로서 정보주체가 그 계약의 해지 의사를 명확하게 밝히지 아니한 경우</li>
						</ul>
					</li>
				</ul>
				<p>한국교통안전공단은 정보주체가 「개인정보 보호법」 제37조제1항에 따라 동의를 철회한 때에는 지체없이 수집된 개인정보를 복구⋅재생할 수 없도록 파기합니다. 다만 「개인정보 보호법」 제37조제2항 각 호의 어느 하나에 해당하는 경우에는 동의 철회에 따른 조치를 하지 않을 수 있습니다.
				한국교통안전공단은 「개인정보 보호법」 제37조제2항 단서에 따라 처리정지 요구를 거절하거나 제3항 단서에 따라 동의 철회에 따른 조치를 하지 않았을 때에는 정보주체에게 지체없이 그 사유를 알려드립니다.
				한국교통안전공단은 정보주체의 요구에 따라 처리가 정지된 개인정보에 대하여 지체없이 해당 개인정보의 파기등 필요한 조치를 합니다.
				</p>
				<div class="mt10">
					<a title="새창열림" class="button ico right down" href="/resources/upload/weblink/개인정보(열람, 정정ㆍ삭제, 처리정지, 동의철회) 요구서.hwp" target="_blank">개인정보 처리정지·동의철회 요구서</a>
				</div>		
				<ul>
					<li>< 정보주체의 권리행사 요구 거절 시 불복을 위한 이의제기 절차 >
						<p>개인정보 관리책임자는 열람 등 요구에 대한 연기 또는 거절 시, 요구 받은 날로부터 10일 이내에 연기 또는 거절의 정당한 사유 및 이의제기 방법 등을 통지합니다. 정 보주체는 열람등 요구에 대한 거절 등 조치에 대하여 불복이 있는 경우 개인정보 열 람등 요구 결정 이의신청서 서식으로 이의신청할 수 있습니다.</p>
					</li>
				</ul>				
				<div class="mt10">
					<a title="새창열림" class="button ico right down" href="/resources/upload/weblink/개인정보 열람등 요구결정 이의신청서.hwp" target="_blank">개인정보 열람등 요구 결정 이의신청서</a>
				</div>
			<p>③ 권리행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</p>	
				<div class="mt10">
					<a title="새창열림" class="button ico right down" href="/resources/upload/weblink/위임장.hwp" target="_blank">위임장</a>
				</div>
			<p>④ 정보주체가 개인정보 열람 및 처리 정지를 요구할 권리는 「개인정보 보호법」 제35조 제4항 및 제37조 제2항에 의하여 제한될 수 있습니다.</p>
			<p>⑤ 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 해당 개인정보의 삭제를 요구할 수 없습니다.</p>		
			<p>⑥ 자동화된 결정이 이루어진다는 사실에 대해 정보주체의 동의를 받았거나, 계약 등을 통해 미리 알린 경우, 법률에 명확히 규정이 있는 경우에는 자동화된 결정에 대한 거부는 인정되지 않으며 설명 및 검토 요구만 가능합니다.</p>		
			<ul>
				<li>- 또한 자동화된 결정에 대한 거부・설명 요구는 다른 사람의 생명・신체・재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 등 정당한 사유가 있는 경우에는 그 요구가 거절될 수 있습니다.</li>
			</ul>
			<p>⑦ 한국교통안전공단은 정보주체 권리에 따른 열람, 정정·삭제, 처리정지 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</p>	
			<p>⑧ 한국교통안전공단은 개인정보의 열람등 청구를 제13조에 따른 부서에 할 수 있습니다. 한국교통안전공단은 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.</p>	

			<br>

			<h5 class="mt0" id="next15">제15조 (개인정보의 열람등 청구를 접수·처리하는 부서)
				<img src="/images/privacy/privacyPolicy_icon13.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<h6 class="title_none">① 개인정보 열람 등 요구 방법</h6>
			<p>정보주체는 개인정보의 열람, 정정 · 삭제, 처리정지, 동의철회 청구를 한국교통안전공단에 직접 신청하시거나 개인정보보호위원회를 통하여 하실 수 있습니다.</p>
			<ul>
				<li>
					- 한국교통안전공단 개인정보 보호담당자 또는 개인정보파일별 운영담당자를 통한 신청
					<div class="box_blue">
						<ul>
							<li><strong>※ 개인정보 보호담당자</strong>
								<ul>
									<li>- 개인정보의 열람청구 접수 · 처리 부서 : 한국교통안전공단 정보보안처</li>
									<li>- 개인정보의 열람청구 접수 · 처리 담당자 : 정보보안처 장지혜</li>
									<li>- 연락처 : <a href="tel:0544597483">054-459-7483</a></li>
									<li>- 팩스번호 : 0502-384-5457</li>
									<li>- 이메일 : <a class="txt_blue" href="mailto:jangjh@kotsa.or.kr">jangjh@kotsa.or.kr</a></li>
								</ul>
							</li>
							<li>※ 개인정보파일별 운영담당자</li>
						</ul>		
					<div class="toggle-table">
						<a class="button blue toggle-button" id="btn_07">개인정보파일별 운영담당자▼</a>
					<div>
						<table style="width:100%; table-layout:fixed;" class="table" id="table07">
							<caption>개인정보파일별 운영담당자</caption>
							<colgroup>
								<col style="width: 15%;">
								<col style="width: 15%;">
								<col style="width: 15%;">
								<col style="width: 15%;">
								<col style="width: 15%;">
								<col style="width: 15%;">							
							</colgroup>				
							<thead>
								<tr>
									<th scope="col">시스템</th>
									<th scope="col">개인정보파일</th>
									<th scope="col">부서명</th>
									<th scope="col">연락처</th>
									<th scope="col">FAX</th>
									<th scope="col">E-Mail</th>
								</tr>
							</thead>
							<tbody>
								<tr>
								<td rowspan="3"><p style="text-align:center; font-size:80%">대표 홈페이지</p></td>
								<td><p style="text-align:center; font-size:80%">홈페이지 회원정보(개인회원, 외국인회원)</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">대외협력실</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">054-459-7032</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">0502-384-5320</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">kym5318@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">홈페이지 회원정보(기업회원)</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">뉴스레터</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">통합회원포털</p></td>
								<td><p style="text-align:center; font-size:80%">통합회원정보</p></td>
								<td><p style="text-align:center; font-size:80%">정보운영처</p></td>
								<td><p style="text-align:center; font-size:80%">054-459-7477</p></td>
								<td><p style="text-align:center; font-size:80%">0502-384-5457</p></td>
								<td><p style="text-align:center; font-size:80%">smllem1678@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">VOC(고객의소리)통합관리</p></td>
								<td><p style="text-align:center; font-size:80%">VOC(고객의소리) 신고자 정보</p></td>
								<td><p style="text-align:center; font-size:80%">고객소통처</p></td>
								<td><p style="text-align:center; font-size:80%">054-459-7179</p></td>
								<td><p style="text-align:center; font-size:80%">0502-384-5397</p></td>
								<td><p style="text-align:center; font-size:80%">purewhite79@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">고객콜센터</p></td>
								<td><p style="text-align:center; font-size:80%">콜센터 상담정보</p></td>
								<td><p style="text-align:center; font-size:80%">고객소통처</p></td>
								<td><p style="text-align:center; font-size:80%">054-459-7899</p></td>
								<td><p style="text-align:center; font-size:80%">0502-384-5397</p></td>
								<td><p style="text-align:center; font-size:80%">kimhj0118@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td rowspan="3"><p style="text-align:center; font-size:80%">운수종사자관리</p></td>
								<td><p style="text-align:center; font-size:80%">기관사용자 정보</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">교통안전처</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">054-459-7276</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">0502-384-5420</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">uh01083@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">운수종사자 정보</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">운수회사담당자 정보</p></td>
								</tr>
								<tr>
								<td rowspan="2"><p style="text-align:center; font-size:80%">안전운전체험교육</p></td>
								<td><p style="text-align:center; font-size:80%">홈페이지 회원정보</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">교통안전교육처</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">054-459-7653</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">0502-384-5370</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">hwang2351@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">체험교육 학사관리 정보</p></td>
								</tr>
								<tr>
								<td rowspan="2"><p style="text-align:center; font-size:80%">온라인 교통안전교육 통합플랫폼</p></td>
								<td><p style="text-align:center; font-size:80%">회원정보</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">교통안전교육처</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">054-459-7658</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">0502-384-5370</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">jiyukwon@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">교육신청정보</p></td>
								</tr>
								<tr>
								<td rowspan="2"><p style="text-align:center; font-size:80%">건설기계조종사경력관리</p></td>
								<td><p style="text-align:center; font-size:80%">건설기계 경력관리정보</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">자격관리처</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">054-459-7286</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">0502-384-5440</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">ljk1206@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">건설기계소유자정보</p></td>
								</tr>
								<tr>
								<td rowspan="2"><p style="text-align:center; font-size:80%">국가자격시험통합(도로)</p></td>
								<td><p style="text-align:center; font-size:80%">도로분야(화물, 버스, 택시) 자격시험 응시자·소유자 및 체험교육자 정보</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">자격관리처</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">054-459-7273</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">0502-384-5440</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">seowj@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">교통안전관리자 자격시험 응시자·소유자 및 일부과목 면제자 정보</p></td>
								</tr>
								<tr>
								<td rowspan="4"><p style="text-align:center; font-size:80%">운전적성정밀검사</p></td>
								<td><p style="text-align:center; font-size:80%">검사결과 정보</p></td>
								<td rowspan="4"><p style="text-align:center; font-size:80%">자격관리처</p></td>
								<td rowspan="4"><p style="text-align:center; font-size:80%">054-459-7278</p></td>
								<td rowspan="4"><p style="text-align:center; font-size:80%">0502-384-5440</p></td>
								<td rowspan="4"><p style="text-align:center; font-size:80%">higudwns@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">홈페이지 예약정보</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">알림문자 서비스 정보</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">사용자정보</p></td>
								</tr>
								<tr>
								<td rowspan="2"><p style="text-align:center; font-size:80%">위험물질 운송안전 관리</p></td>
								<td><p style="text-align:center; font-size:80%">운전자정보</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">교통물류정책처</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">054-459-7435</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">0502-384-5468</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">sundance@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">회원정보</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">지원사업정보</p></td>
								<td><p style="text-align:center; font-size:80%">자동차사고 피해지원자파일</p></td>
								<td><p style="text-align:center; font-size:80%">교통복지처</p></td>
								<td><p style="text-align:center; font-size:80%">054-459-7368</p></td>
								<td><p style="text-align:center; font-size:80%">0502-384-5450</p></td>
								<td><p style="text-align:center; font-size:80%">ujinee@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td rowspan="2"><p style="text-align:center; font-size:80%">국가자격시험통합(철도)</p></td>
								<td><p style="text-align:center; font-size:80%">홈페이지 회원정보</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">철도안전처</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">054-459-7331</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">0502-384-5479</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">wckim1977@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">자격시험응시</p></td>
								</tr>
								<tr>
								<td rowspan="2"><p style="text-align:center; font-size:80%">항공교육훈련 통합관리</p></td>
								<td><p style="text-align:center; font-size:80%">입과자격 신청정보</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">항공안전처</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">054-459-7396</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">0502-384-5452</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">kmin.k@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">홈페이지 회원정보</p></td>
								</tr>
								<tr>
								<td rowspan="2"><p style="text-align:center; font-size:80%">항공안전정보 통합관리</p></td>
								<td><p style="text-align:center; font-size:80%">항공안전정보지 구독 정보</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">항공안전처</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">054-459-7396</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">0502-384-5452</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">kmin.k@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">항공자율보고 신고접수현황</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">국가자격시험통합(항공)</p></td>
								<td><p style="text-align:center; font-size:80%">항공종사자 자격시험 응시자 정보</p></td>
								<td><p style="text-align:center; font-size:80%">항공자격처</p></td>
								<td><p style="text-align:center; font-size:80%">02-3151-1514</p></td>
								<td><p style="text-align:center; font-size:80%">0502-384-5452</p></td>
								<td><p style="text-align:center; font-size:80%">p01648@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td rowspan="2"><p style="text-align:center; font-size:80%">드론 비행경력(전자출결)</p></td>
								<td><p style="text-align:center; font-size:80%">교육기관 정보</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">드론관리처</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">054-459-7937</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">0502-384-5453</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">cjy4493@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">일반회원</p></td>
								</tr>
								<tr>
								<td rowspan="5"><p style="text-align:center; font-size:80%">드론 정보통합</p></td>
								<td><p style="text-align:center; font-size:80%">기체신고정보</p></td>
								<td rowspan="5"><p style="text-align:center; font-size:80%">드론관리처</p></td>
								<td rowspan="5"><p style="text-align:center; font-size:80%">054-459-7937</p></td>
								<td rowspan="5"><p style="text-align:center; font-size:80%">0502-384-5453</p></td>
								<td rowspan="5"><p style="text-align:center; font-size:80%">cjy4493@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">사용사업체정보</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">자격정보</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">보험가입정보</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">비행승인</p></td>
								</tr>
								<tr>
								<td rowspan="2"><p style="text-align:center; font-size:80%">자동차검사관리</p></td>
								<td><p style="text-align:center; font-size:80%">기관 사용자 정보</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">검사운영처</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">054-440-3097</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">0502-384-5495</p></td>
								<td rowspan="2"><p style="text-align:center; font-size:80%">pipa9402@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">자동차 소유자 정보</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">TS 튜닝 알리고</p></td>
								<td><p style="text-align:center; font-size:80%">자동차튜닝 기술 업체 담당자</p></td>
								<td><p style="text-align:center; font-size:80%">기술안전처</p></td>
								<td><p style="text-align:center; font-size:80%">054-429-3524</p></td>
								<td><p style="text-align:center; font-size:80%">0502-384-5365</p></td>
								<td><p style="text-align:center; font-size:80%">dolabwa@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td rowspan="4"><p style="text-align:center; font-size:80%">사이버검사소</p></td>
								<td><p style="text-align:center; font-size:80%">자동차 소유자 정보</p></td>
								<td rowspan="4"><p style="text-align:center; font-size:80%">기술승인처</p></td>
								<td rowspan="4"><p style="text-align:center; font-size:80%">054-429-3555</p></td>
								<td rowspan="4"><p style="text-align:center; font-size:80%">0502-384-5497</p></td>
								<td rowspan="4"><p style="text-align:center; font-size:80%">kwonjt@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">홈페이지 회원정보</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">교육신청자 정보</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">교육신청자 환불 계좌정보</p></td>
								</tr>
								<tr>
								<td rowspan="3"><p style="text-align:center; font-size:80%">특수검사관리</p></td>
								<td><p style="text-align:center; font-size:80%">궤도운영자 및 종사자</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">특수검사처</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">054-440-3067</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">0502-384-5463</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">hdlee@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">특수검사 대상 업체정보</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">궤도종사자 교육정보</p></td>
								</tr>
								<tr>
								<td rowspan="3"><p style="text-align:center; font-size:80%">기계식주차장 정보</p></td>
								<td><p style="text-align:center; font-size:80%">기계식 주차장 관리인 교육생 정보</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">주차안전처</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">054-440-3076</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">0502-384-5465</p></td>
								<td rowspan="3"><p style="text-align:center; font-size:80%">tmvksh@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">기계식 주차장 관리자 정보</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">기계식주차장 사고조사 정보</p></td>
								</tr>
								<tr>
								<td rowspan="5"><p style="text-align:center; font-size:80%">운전자격확인</p></td>
								<td><p style="text-align:center; font-size:80%">사용자(내부)</p></td>
								<td rowspan="5"><p style="text-align:center; font-size:80%">모빌리티플랫폼처</p></td>
								<td rowspan="5"><p style="text-align:center; font-size:80%">054-459-7461</p></td>
								<td rowspan="5"><p style="text-align:center; font-size:80%">0502-384-5430</p></td>
								<td rowspan="5"><p style="text-align:center; font-size:80%">yura3020@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">개인정보 사용이력</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">운전자격확인이력</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">대여정보이력</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">API 이용이력</p></td>
								</tr>
								<tr>
								<td rowspan="4"><p style="text-align:center; font-size:80%">자동차제작결함</p></td>
								<td><p style="text-align:center; font-size:80%">자동차 결함정보 수집파일(결함신고)</p></td>
								<td rowspan="4"><p style="text-align:center; font-size:80%">리콜센터</p></td>
								<td rowspan="4"><p style="text-align:center; font-size:80%">031-369-0443</p></td>
								<td rowspan="4"><p style="text-align:center; font-size:80%">0502-384-5327</p></td>
								<td rowspan="4"><p style="text-align:center; font-size:80%">safetysin@kotsa.or.kr</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">자동차 결함정보수집 파일(리콜불만신고)</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">자동차리콜센터 리콜알리미 서비스</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">자동차리콜센터 온라인상담 서비스</p></td>
								</tr>
								<tr>
								<td><p style="text-align:center; font-size:80%">자동차안전하자관리</p></td>
								<td><p style="text-align:center; font-size:80%">자동차 교환·환불 신청서 및 판정문</p></td>
								<td><p style="text-align:center; font-size:80%">자동차안전하자 심의위원회사무국</p></td>
								<td><p style="text-align:center; font-size:80%">031-369-0392</p></td>
								<td><p style="text-align:center; font-size:80%">0502-384-5498</p></td>
								<td><p style="text-align:center; font-size:80%">chlwnstlr100@kotsa.or.kr</p></td>
								</tr>
							</tbody>
						</table>
					</div>	
				</div>	
			</div>
			<h6 class="title_none">② 개인정보보호위원회 개인정보보호종합포털 웹사이트(www.privacy.go.kr) → 개인서비스 → 정보주체 권리행사 → 개인정보 열람등요구 → 열람등요구(본인인증 필요)</h6>		
			<br>
			<h5 class="mt0" id="next16">제16조 (개인정보 보호책임자의 성명 또는 개인정보보호 업무 및 관련 고충사항을 처리하는 부서의 명칭과 전화번호 등 연락처 및 담당자 연락처)
				<img src="/images/privacy/privacyPolicy_icon14-1.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
				<img src="/images/privacy/privacyPolicy_icon14-2.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>① 한국교통안전공단은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자 및 고충처리 담당자를 지정하고 있습니다.</p>
			<div class="box_blue">
				<ul>
					<li><strong>※ 개인정보 보호책임자 : 정보보안처장 정충희</strong>
						<ul>
							<li>- 이메일 : <a class="txt_blue" href="mailto:chjeong@kotsa.or.kr">chjeong@kotsa.or.kr</a></li>
							<li>- 전화번호 : <a href="tel:0544597480">054-459-7480</a></li>
						</ul>
					</li>
					<li class="mt20"><strong>※ 개인정보보호 및 고충처리 담당자 : 정보보안처 양륜겸, 장지혜</strong>
						<ul>
							<li>- 이메일 : <a class="txt_blue" href="mailto:yeti@kotsa.or.kr">yeti@kotsa.or.kr</a>, <a class="txt_blue" href="mailto:jangjh@kotsa.or.kr">jangjh@kotsa.or.kr</a></li>
							<li>- 전화번호 : <a href="tel:0544597485">054-459-7485</a>, <a href="tel:0544597483">054-459-7483</a></li>
							<li>- Fax : 팩스번호 0502-384-5457</li>
							<li>- 주소 : 우)39660 경상북도 김천시 혁신6로 17 (율곡동)</li>
						</ul>
					</li>
				</ul>
			</div>
			<p>② 정보주체는 한국교통안전공단의 서비스를 이용하시면서 발생한 모든 개인정보보호 관련문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의할 수 있습니다. 한국교통안전공단은 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.</p>		
			
			<br>
			
			<h5 class="mt0" id="next17">제17조 (정보주체의 권익침해에 대한 구제 방법)
				<img src="/images/privacy/privacyPolicy_icon15.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>① 정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.</p>
			<p>② 한국교통안전공단은 정보주체의 개인정보자기결정권을 보장하고, 개인정보침해로 인한 상담 및 피해 구제를 위해 노력하고 있으며, 신고나 상담이 필요한 경우 제14조의 담당부서로 연락해 주시기 바랍니다.</p>
			<div class="box_blue">
				<ul>
					<li>※ 개인정보 분쟁조정 : (국번없이) 1833-6972(www.kopico.go.kr)</li>
					<li>※ 개인정보 침해센터 : (국번없이) 118(privacy.kisa.or.kr)</li>
					<li>※ 대검찰청 : (국번없이) 1301(www.spo.go.kr)</li>
					<li>※ 경찰청 : (국번없이) 182(ecrm.cyber.go.kr)</li>
				</ul>
			</div>
			<p>③ 「개인정보 보호법」 제35조(개인정보의 열람), 제36조(개인정보의 정정・삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.</p>
			<div class="box_blue">
				<ul>
					<li>※ 중앙행정심판위원회 : (국번없이) 110(<a title="새창열림" class="txt_blue" href="https://www.simpan.go.kr/" target="_blank">www.simpan.go.kr</a>)</li>
				</ul>
			</div>
			
			<br>
			
			<h5 class="mt0" id="next18">제18조 (개인정보 관리수준 평가 결과)
				<img src="/images/privacy/privacyPolicy_icon16.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>① 한국교통안전공단은 개인정보를 안전하게 관리하기 위해 ｢개인정보 보호법｣ 제11조에 따라 매년 개인정보위에서 실시하는 “공공기관 개인정보 관리수준 진단”을 받고 있습니다.</p>
			<p>② 한국교통안전공단은 2023년 개인정보 관리수준 진단 평가 결과 ‘A’ 등급을 획득하였습니다.</p>
			<p>③ 한국교통안전공단은 개인정보 처리절차 개선, 시스템 보안(개인정보 암호화 등) 강화 등을 추진하여 개인정보 유출 방지를 위해 노력하고 있습니다.</p>
			
			<br>
			
			<h5 class="mt0" id="next19">제19조 (고정형·이동형 영상정보처리기기 운영·관리에 관한 사항)
				<img src="/images/privacy/privacyPolicy_icon17.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>① 한국교통안전공단은 ｢개인정보 보호법｣ 제25조제1항에 따라 시설안전 및 화재, 범죄 예방을 목적으로 고정형 영상정보처리기기를 설치·운영하고 있으며, 자세한 내용은 "영상정보처리기기 운영·관리 방침"을 통해 확인하시기 바랍니다.</p>
			<p>※ 보다 상세한 <한국교통안전공단>의 영상정보처기기기 운영·관리 방침에 관한 사항은 공단 홈페이지(www.kotsa.or.kr)의 이용안내 → 개인정보처리방침 → 고정형·이동형 영상정보처기기기 운영·관리 방침 게시판에서 조회 및 확인하실 수 있습니다.</p>
			<div class="btn">
				<a class="button blue" href="https://www.kotsa.or.kr/portal/contents.do?menuCode=07030000" target="_blank">고정형·이동형 영상정보처리기기 운영·관리 방침</a>
			</div>
			
			<br>
			
			<h5 class="mt0" id="next20">제20조 (개인정보 처리방침의 변경)
				<img src="/images/privacy/privacyPolicy_icon18.png" style="width:50px; height: 50px; bottom:0px; vertical-align:middle;">
			</h5>
			<p>이 개인정보 처리방침은 2024. 10. 10 부터 적용됩니다.</p>
			<p>정보주체는 개인정보 처리방침 신·구 대비표를 통해 개정된 내용을 확인하실 수 있습니다.</p>
			
			<div data-indent="box">
				<table style="width:100%;" class="table">
				<colgroup>
					<col style="width: 25%;">
					<col style="width: 15%;">
					<col style="width: 30%;">
					<col style="width: 25%;">
				</colgroup>
				<thead>
					<tr>
						<th scope="col">적용기간</th>
						<th scope="col">변경 사항</th>
						<th scope="col">변경 전⋅후</th>
						<th scope="col">바로가기</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<p style="text-align:center; font-size:80%">2024.10.10.~현재</p>
						</td>
						<td>
							<p style="text-align:center; font-size:80%">개인정보 처리 항목 및 근거</p>
						</td>
						<td>
							<p style="text-align:center; font-size:80%">개인정보 처리 항목, 근거 명확화</p>
						</td>
						<td>
							<p style="text-align:center; font-size:80%">2024.10.10.~현재 적용</p>
						</td>						
					</tr>
					<tr>
						<td rowspan="4">
							<p style="text-align:center; font-size:80%">2024.10.02.~2024.10.09</p>
						</td>
						<td>
							<p style="text-align:center; font-size:80%">개인정보의 처리 항목</p>
						</td>				
						<td>
							<p style="text-align:center; font-size:80%">정보주체의 동의를 받아 처리하는 개인정보와 정보주체의 동의 없이 처리할 수 있는 개인정보의 항목 및 법적 근거 구분</p>
						</td>
						<td rowspan="4">
							<p style="text-align:center; font-size:80%"><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=38&amp;menuCode=07020200')">2024.10.02.~2024.10.09<br/>적용 ☞ 바로가기</a></p>
						</td>
					</tr>
					<tr>
						<td>
							<p style="text-align:center; font-size:80%">개인정보의 제3자 제공</p>
						</td>				
						<td>
							<p style="text-align:center; font-size:80%">제공 기관·업체 추가 1개</p>
						</td>
					</tr>
					<tr>
						<td>
							<p style="text-align:center; font-size:80%">개인정보 처리의 위탁</p>
						</td>				
						<td>
							<p style="text-align:center; font-size:80%">위탁 기관·업체 추가 1개</p>
						</td>
					</tr>
					<tr>
						<td>
							<p style="text-align:center; font-size:80%">가명정보의 처리</p>
						</td>				
						<td>
							<p style="text-align:center; font-size:80%">신설(제12조)</p>
						</td>
					</tr>
					<tr>
						<td rowspan="2">
							<p style="text-align:center; font-size:80%">2024.09.13.~2024.10.01.</p>
						</td>
						<td>
							<p style="text-align:center; font-size:80%">개인정보파일의 등록</p>
						</td>				
						<td>
							<p style="text-align:center; font-size:80%">개인정보파일 73개→69개</p>
						</td>
						<td rowspan="2">
							<p style="text-align:center; font-size:80%"><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=36&amp;menuCode=07020200')">2024.09.13.~2024.10.03.<br/>적용 ☞ 바로가기</a></p>
						</td>
					</tr>
					<tr>
						<td>
							<p style="text-align:center; font-size:80%">개인정보의 제3자 제공</p>
						</td>				
						<td>
							<p style="text-align:center; font-size:80%">제공 기관 추가 1개</p>
						</td>
					</tr>
					<tr>
						<td rowspan="5">
							<p style="text-align:center; font-size:80%">2024.08.20.~2024.09.12.</p>
						</td>
						<td>
							<p style="text-align:center; font-size:80%">목차 신설 및 순서 변경</p>
						</td>				
						<td>
							<p style="text-align:center; font-size:80%">목차 신설(제3조)
							<br/>목차 변경
							<br/>(제15조→제4조, 제11조→제6조, 제14조→제7조, 제12조→제8조, 제6조→제9조, 제13조→제11조, 제8조→제13조, 제7조→제14조, 제9조→제15조로 변경)</p>
						</td>
						<td rowspan="5">
							<p style="text-align:center; font-size:80%"><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=34&amp;menuCode=07020200')">2024.08.20.~2024.09.12.<br/>적용 ☞ 바로가기</a></p>
						</td>
					</tr>
					<tr>
						<td>
							<p style="text-align:center; font-size:80%">제목 변경</p>
						</td>
						<td>
							<p style="text-align:center; font-size:80%">제16조(개인정보 관리수준 진단 결과→개인정보 보호수준 평가 결과)</p>
						</td>				
					</tr>			
					<tr>
						<td>
							<p style="text-align:center; font-size:80%">개인정보파일 등 자동 표출 기능 개선</p>
						</td>
						<td>
							<p style="text-align:center; font-size:80%">제1조, 제2조, 제4조, 제6조, 제8조, 제13조</p>
						</td>				
					</tr>
					<tr>			
						<td>
							<p style="text-align:center; font-size:80%">이전 개인정보처리방침 자동 표출 기능 개선</p>
						</td>
						<td>
							<p style="text-align:center; font-size:80%">제18조</p>
						</td>				
					</tr>
					<tr>
						<td>
							<p style="text-align:center; font-size:80%">정보주체 권리행사 등 내용 현행화</p>
						</td>				
						<td>
							<p style="text-align:center; font-size:80%">제8조, 제11조, 제12조, 제14조, 제15조</p>
						</td>				
					</tr>
					<tr>
						<td rowspan="3">
							<p style="text-align:center; font-size:80%">2024.04.30.~2024.08.19.</p>
						</td>
						<td>
							<p style="text-align:center; font-size:80%">개인정보파일의 등록</p>
						</td>				
						<td>
							<p style="text-align:center; font-size:80%">개인정보파일 72개→73개</p>
						</td>
						<td rowspan="3">
							<p style="text-align:center; font-size:80%"><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=31&amp;menuCode=07020200')">2024.04.30.~2024.08.19.<br/>적용 ☞ 바로가기</a></p>
						</td>
					</tr>
					<tr>
						<td>
							<p style="text-align:center; font-size:80%">개인정보 처리의 위탁</p>
						</td>		
						<td>
							<p style="text-align:center; font-size:80%">수탁 기관·업체 15개→12개</p>
						</td>					
					</tr>
					<tr>
						<td>
							<p style="text-align:center; font-size:80%">개인정보의 제3자 제공</p>
						</td>		
						<td>
							<p style="text-align:center; font-size:80%">제공 기관·업체 37개→40개</p>
						</td>					
					</tr>
					<tr>
						<td rowspan="2">
							<p style="text-align:center; font-size:80%">2024.02.06.~2024.04.29.</p>
						</td>
						<td>
							<p style="text-align:center; font-size:80%">개인정보파일의 등록</p>
						</td>
						<td>
							<p style="text-align:center; font-size:80%">개인정보처리시스템 27개→28개, 개인정보파일 67개→72개</p>
						</td>
						<td rowspan="2">
							<p style="text-align:center; font-size:80%"><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=30&amp;menuCode=07020200')">2024.02.06.~2024.04.29.<br/>적용 ☞ 바로가기</a></p>
						</td>
					</tr>
					<tr>
						<td>
							<p style="text-align:center; font-size:80%">개인정보 영향평가 수행</p>
						</td>
						<td>
							<p style="text-align:center; font-size:80%">개인정보 영향평가 33개→34개</p>
						</td>			
					</tr>
				</tbody>
			</table>		
			<p>③ 이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.</p>
			<div class="toggle-table">
				<a class="button blue toggle-button" id="btn_08">2024~ 개인정보 처리방침▼</a>			
				<div id="table08">
					<ul>
						<li><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=38&amp;menuCode=07020200')">· 2024.10.02 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=36&amp;menuCode=07020200')">· 2024.09.13 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=34&amp;menuCode=07020200')">· 2024.08.20 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=31&amp;menuCode=07020200')">· 2024.04.30 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=30&amp;menuCode=07020200')">· 2024.02.06 자 개인정보처리방침(클릭)</a></li>
					</ul>
				</div>
			</div>	
			<div class="toggle-table">
				<a class="button blue toggle-button" id="btn_09">2020~2023 개인정보 처리방침▼</a>			
				<div id="table09">
					<ul>
						<li><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=27&amp;menuCode=07020200')">· 2023.09.25 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=24&amp;menuCode=07020200')">· 2023.08.10 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=24&amp;menuCode=07020200')">· 2023.03.02 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=20&amp;menuCode=07020200')">· 2023.02.10 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=18&amp;menuCode=07020200')">· 2022.08.03 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=9&amp;menuCode=07020200')">· 2022.02.07 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/contents.do?bbscCode=privhist&amp;ctntVers=2&amp;menuCode=07020200')">· 2022.01.03 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=19&amp;menuCode=07020200')">· 2021.10.12 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=18&amp;menuCode=07020200')">· 2021.06.21 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=17&amp;menuCode=07020200')">· 2021.02.03 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=16&amp;menuCode=07020200')">· 2021.01.05 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=15&amp;menuCode=07020200')">· 2020.03.17 자 개인정보처리방침(클릭)</a></li>
					</ul>
				</div>
			</div>		
			<div class="toggle-table">
				<a class="button blue toggle-button" id="btn_10">2011~2019 개인정보 처리방침▼</a>			
				<div id="table10">
					<ul>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=14&amp;menuCode=07020200')">· 2019.12.03 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=13&amp;menuCode=07020200')">· 2019.11.25 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=11&amp;menuCode=07020200')">· 2018.04.16 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=10&amp;menuCode=07020200')">· 2016.12.31 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=9&amp;menuCode=07020200')">· 2015.11.17 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=8&amp;menuCode=07020200')">· 2015.11.09 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=7&amp;menuCode=07020200')">· 2015.10.28 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=6&amp;menuCode=07020200')">· 2015.07.08 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=5&amp;menuCode=07020200')">· 2015.05.15 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=4&amp;menuCode=07020200')">· 2014.10.23 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=3&amp;menuCode=07020200')">· 2013.07.26 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=2&amp;menuCode=07020200')">· 2013.06.18 자 개인정보처리방침(클릭)</a></li>
						<li><a title="새창열림" onclick="window.open('/portal/bbs/privhist_view.do?bbscCode=privhist&amp;bbscSeqn=1&amp;menuCode=07020200')">· 2011 자 개인정보처리방침(클릭)</a></li>
					</ul>
				</div>
			</div>		
		</div>
	</article>
	
	<div class="area_btnbox">
		<a class="button" href="/portal/bbs/privhist_list.do?menuCode=07020200" target="_blank">이전 개인정보 처리방침 보기</a>
	</div>
</div>
<!--//본문 끝--></div></div></div></div></div>