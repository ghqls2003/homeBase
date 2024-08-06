<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ include file="../cmm/include_gis.jsp"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/ma/auth.js"></script>

<%@ page import="xecure.servlet.*"%>
<%@ page import="xecure.crypto.*"%>
<%@ page import="java.security.*"%>
<%@ page import="java.util.Random"%>

<!-- XecureKeyPad Plugin, Lite(HTML5), E2E(XFS) -->
<script src="../ext-lib/HancomKeyPad/js/xkeypad_config.js"></script>
<script src="../ext-lib/HancomKeyPad/js/xkeypad_html5.js"></script>
<script src="../ext-lib/HancomKeyPad/js/xkeypad_plugin.js"></script>
<script src="../ext-lib/HancomKeyPad/js/xkeypad_desktop.js"></script>

<script type="text/javascript">
document.write("<script type=\"text/javascript\" src=\"" + "../ext-lib/AnySign_26/anySign4PCInterface.js" + "?version=" + new Date().getTime() + "\"></scr"+"ipt>");
</script>

<script type='text/javascript'>
<%VidVerifier vid = new VidVerifier(new XecureConfig());
out.println(vid.ServerCertWriteScript());

// AnySign 세션ID 설정
String HashedSessionID = "";

// 1. 고정 세션 ID
HashedSessionID = "reaverTestSID19810531";

// 2. 웹세션ID 해쉬
//String id = session.getId();
//HashedSessionID = cipher.getHash("SHA256",id);

//out.println("AnySign.mAnySignSID = '" + HashedSessionID + "';");

// 데몬 무결성 검증 기능 선택사항
String HashedRandomValue = "";

// 1. 무결성 검증 비활성화
//    AnySign.mAnySignITGT 변수 "" 설정 - 2번 부분 주석처리.
//

// 2. 랜덤값 기반 무결성 검증 설정
//    AnySign.mAnySignITGT = HashedRandomValue
//
//Cipher cipher = new Cipher( new XecureConfig());
//HashedRandomValue = cipher.getRamdomMsg(30);

//out.println("AnySign.mAnySignITGT = '" + HashedRandomValue + "';");%>
AnySign.mCharset = "utf-8";
AnySign.mXecureKeyPadHTML5Enable = true;
</script>

<!-- 다음 주소검색 API -->
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>

<%
// Retrieve data from session
String message = (String) session.getAttribute("message");

// If message exists, display it and then remove it from session
if (message != null && !message.isEmpty()) {
%>
<script>
        // Use JavaScript to display an alert with the message
        alert("<%=message%>
	");
<%// Remove the message from session
session.removeAttribute("message");%>
	
</script>
<%
}
%>

<%
String name = "-";
String phoneNum = "-";
String email = "-";

if (session.getAttribute("SSO_NAME") != null) {
	name = (String) session.getAttribute("SSO_NAME");
}

if (session.getAttribute("CHARGER_NM") != null) {
	name = (String) session.getAttribute("CHARGER_NM");
}

if (session.getAttribute("MBTLNUM") != null) {
	phoneNum = (String) session.getAttribute("MBTLNUM");
	if (session.getAttribute("MODE") == "dev")
		phoneNum = phoneNum.substring(0, 3) + '-' + phoneNum.substring(3, 7) + '-' + phoneNum.substring(7);
}

if (session.getAttribute("EMAIL") != null) {
	email = (String) session.getAttribute("EMAIL");
}
%>

<style>

.highlight {
	font-weight: bold;
	font-size: 18px;
	color: blue;
	margin-left: 20px;
}
.highlight3 {
	font-weight: bold;
	font-size: 18px;
	color: blue;
	margin-left: 20px;
}

.dlntxt {
	margin-left: 20px;
}
.dlntxt2 {
	margin-left: 20px;
		font-weight: bold;
	font-size: 18px;
	color: blue;
/* 	text-decoration: underline; */
	margin-left: 20px;
}
.dlntxt3 {
		font-weight: bold;
	font-size: 18px;
	color: blue;
/* 	text-decoration: underline; */
}

.highlight2 {
	font-weight: bold;
	color: green;
}

#bzmnAdmin {
	margin: 10px;
}

.checkDiv {
	display: flex;
	align-items: center;
	justify-content: center;
}

.checkSpan {
	font-size: 1.6rem;
	line-height: 20px;
	font-weight: 600;
}

#tab-2 .k-picker-solid {
	width: 180px;
}

.register_popup .contRead input:read-only {
	background-color: #f5f5f5
}

.sub03 .insert_popup {
	background-color: #d8e5ff;
	border-radius: 8px;
	padding: 10px 8px 10px 24px;
}

.popup .k-picker-solid {
	width: 150px !important;
}

@media ( max-width : 640px) {
	.BzmnSeCdDiv {
		width: 60%;
	}
	.checkDiv {
		width: 88px;
	}
	.checkSpan {
		font-size: 1.4rem;
	}
	#tab-2 .k-picker-solid {
		width: 100%;
	}
}

@media ( max-width : 480px) {
	.popup .k-picker-solid {
		width: 115px !important;
	}
}
</style>

<div class="subPage authority_01">
	<div id="container">
		<div class="wrap">
			<div class="titBox">
				<div class="tit01">
					<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘"
						class="ico_tit">
					<h2>권한신청</h2>
				</div>
				<ul class="tit02">
					<li class="home"><img
						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li>회원정보</li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li class="current">권한신청</li>
				</ul>
			</div>
			<div class="cont-flex">
				<div class="contBox flex-box">
					<div class="nameBox">
						<h4 class="name">주사무소/영업소(예약소)관리자</h4>
					</div>
					<div class="cont S">
						<p class="a_name">(사업자) 관리자</p>
						<div class="a_box">
							<img src="${contextPath}/images/sub/ico_authority01.png"
								alt="(사업자) 관리자">
						</div>
						<button class="blue_btn apply_btn">신청하기</button>
					</div>
				</div>
				<div class="contBox flex-box">
					<div class="nameBox">
						<h4 class="name">공공기관</h4>
					</div>
					<div class="cont I">
						<p class="a_name">교통안전공단, 국토부</p>
						<div class="a_box">
							<img src="${contextPath}/images/sub/ico_authority02.png"
								alt="(사업자) 일반">
						</div>
						<button class="blue_btn apply_btn">신청하기</button>
					</div>
				</div>
				<div class="contBox flex-box">
					<div class="nameBox">
						<h4 class="name">지자체 담당자</h4>
					</div>
					<div class="cont G">
						<p class="a_name">시·도 자동차 대여사업자 담당자</p>
						<div class="a_box">
							<img src="${contextPath}/images/sub/ico_authority03.png"
								alt="시·도 자동차 대여사업자 담당자">
						</div>
						<button class="blue_btn apply_btn">신청하기</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


<div class="subPage authority_02" style="display: none">
	<div id="container" class="step1">
		<div class="wrap">
			<div class="titBox">
				<div class="tit01">
					<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘"
						class="ico_tit">
					<h2>권한신청</h2>
				</div>
				<ul class="tit02">
					<li class="home"><img
						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li>회원정보</li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li class="current">권한신청</li>
				</ul>
			</div>

			<ul class="step_wr">
				<li class="current_step step">서비스 이용안내</li>
				<li class="step">정보 입력</li>
				<li class="step">신청 완료</li>
			</ul>

			<!-- 이용약관  -->
			<div class="contBox">
				<div class="nameBox">
					<h4 class="name">개인정보 수집 및 이용 동의</h4>
				</div>
				<div class="cont">
					<div class="cont_txt">
						<div class="txt" id="txtForuser">
							<p>국토교통부는 운전자격확인에 필요한 개인정보를 수집합니다.</p>
							<p>필수항목에 해당하는 정보를 입력하시지 않는 경우 사용신청이 불가능 하나, 선택항목에 당하는 정보는
								입력하지 않으셔도 회원가입 및 서비스 이용에는 제한이 없습니다.</p>
							<p>* 만 14세 미만는 가입을 할 수 없습니다. 이는 법적으로 개인정보 수집 및 이용에 대한 동의를 할 수 있는 최소 연령을 기준으로 합니다.</p>
							<br />
							<h3>* 개인정보 수집 및 이용 목적</h3>
							<p class="dlntxt">차량 대여 시 운전자격 확인</p>
							<br />
							<h3>* 개인정보 수집 항목</h3>
						    <p class="dlntxt">
						        사업자 필수: <span class="bold">담당자 이름</span>, <span class="bold">소속 회사</span>, <span class="bold">전화번호</span>, <span class="bold">휴대폰 번호</span>, <span class="bold">IP주소</span>
						    </p>
							<p class="dlntxt">사업자 선택: 보조 연락처</p>
							<br />
							<h3>* 보유 및 이용기간</h3>
							<p class="highlight3">수집된 개인정보는 개인의 탈퇴요청 시 까지 보유 이용됩니다.</p>
							<br />
							
							<h3>* 거부권 및 불이익</h3>
							<p class="dlntxt">※ 정보주체는 개인정보의 수집·이용목적에 대한 동의를 거부할 수 있으며, 동의
								거부 시 국토교통부 운전자격확인 서비스 사용권한 승인이 되지 않으며, 제공하는 서비스를 이용할 수 없습니다.</p>
							<p class="dlntxt">선택정보를 입력하지 않은 경우에도 서비스 이용 제한은 없으며 이용자의 기본적
								인권 침해의 우려가 있는 민감한 개인 정보(인종, 사상 및 신조, 정치적 성향이나 범죄기록, 의료정보 등)는
								기본적으로 수집하지 않습니다.</p>
							<p class="dlntxt">다만 불가피하게 수집이 필요한 경우 반드시 사전에 동의 절차를 거치도록
								하겠습니다.</p>
							<br />
							<p>※ 운전자격확인시스템은 정보주체의 동의 내용을 회원가입일자로 기록하며, 분쟁 발생 시 이를 입증할 수 있는 자료로 활용할 수 있습니다.</p>
							
								
						</div>

						<div class="txt" id="txtForPublic">
							<p>국토교통부는 운전자격확인에 필요한 개인정보를 수집합니다.</p>
							<p>필수항목에 해당하는 정보를 입력하시지 않는 경우 사용신청이 불가능 하나, 선택항목에 당하는 정보는
								입력하지 않으셔도 회원가입 및 서비스 이용에는 제한이 없습니다.</p>
							<p>* 만 14세 미만는 가입을 할 수 없습니다. 이는 법적으로 개인정보 수집 및 이용에 대한 동의를 할 수 있는 최소 연령을 기준으로 합니다.</p>
							<br />
							<h3>* 개인정보 수집 및 이용 목적</h3>
							<p class="dlntxt">차량 대여 시 운전자격 확인</p>
							<br />
							<h3>* 개인정보 수집 항목</h3>
							<p class="dlntxt">
							    공공기관 필수: <span class="bold">기관명</span>, <span class="bold">담당자 이름</span>, <span class="bold">소속부서명</span>, <span class="bold">휴대폰 번호</span>, <span class="bold">IP주소</span>
							</p>
							<p class="dlntxt">공공기관 선택: 보조 연락처</p>
							<br />
							<h3>* 보유 및 이용기간</h3>
							<p class="highlight3">수집된 개인정보는 개인의 탈퇴요청 시 까지 보유 이용됩니다.</p>
							<br />
							<h3>* 거부권 및 불이익</h3>
							<p class="dlntxt">※ 정보주체는 개인정보의 수집·이용목적에 대한 동의를 거부할 수 있으며, 동의
								거부 시 국토교통부 운전자격확인 서비스 사용권한 승인이 되지 않으며, 제공하는 서비스를 이용할 수 없습니다.</p>
							<p class="dlntxt">선택정보를 입력하지 않은 경우에도 서비스 이용 제한은 없으며 이용자의 기본적
								인권 침해의 우려가 있는 민감한 개인 정보(인종, 사상 및 신조, 정치적 성향이나 범죄기록, 의료정보 등)는
								기본적으로 수집하지 않습니다.</p>
							<p class="dlntxt">다만 불가피하게 수집이 필요한 경우 반드시 사전에 동의 절차를 거치도록
								하겠습니다.</p>
							<br />
							<p>※ 운전자격확인시스템은 정보주체의 동의 내용을 회원가입일자로 기록하며, 분쟁 발생 시 이를 입증할 수 있는 자료로 활용할 수 있습니다.</p>
							
						</div>

						<div class="txt" id="txtForLAE">
							<p>국토교통부는 운전자격확인에 필요한 개인정보를 수집합니다.</p>
							<p>필수항목에 해당하는 정보를 입력하시지 않는 경우 사용신청이 불가능 하나, 선택항목에 당하는 정보는
								입력하지 않으셔도 회원가입 및 서비스 이용에는 제한이 없습니다.</p>
							<p>* 만 14세 미만는 가입을 할 수 없습니다. 이는 법적으로 개인정보 수집 및 이용에 대한 동의를 할 수 있는 최소 연령을 기준으로 합니다.</p>
							<br />
							<h3>* 개인정보 수집 및 이용 목적</h3>
							<p class="dlntxt">차량 대여 시 운전자격 확인</p>
							<br />
							<h3>* 개인정보 수집 항목</h3>
							<p class="dlntxt">
						        지자체 필수: <span class="bold">등록 지자체</span>, <span class="bold">담당자 이름</span>,<span class="bold">휴대폰 번호</span>, <span class="bold">IP주소</span>
						    </p>
							<p class="dlntxt">지자체 선택: 보조 연락처</p>
							<br />
							<h3>* 보유 및 이용기간</h3>
							<p class="highlight3">수집된 개인정보는 개인의 탈퇴요청 시 까지 보유 이용됩니다.</p>
							<br />
							<h3>* 거부권 및 불이익</h3>
							<p class="dlntxt">※ 정보주체는 개인정보의 수집·이용목적에 대한 동의를 거부할 수 있으며, 동의
								거부 시 국토교통부 운전자격확인 서비스 사용권한 승인이 되지 않으며, 제공하는 서비스를 이용할 수 없습니다.</p>
							<p class="dlntxt">선택정보를 입력하지 않은 경우에도 서비스 이용 제한은 없으며 이용자의 기본적
								인권 침해의 우려가 있는 민감한 개인 정보(인종, 사상 및 신조, 정치적 성향이나 범죄기록, 의료정보 등)는
								기본적으로 수집하지 않습니다.</p>
							<p class="dlntxt">다만 불가피하게 수집이 필요한 경우 반드시 사전에 동의 절차를 거치도록
								하겠습니다.</p>
							<br />
							<p>※ 운전자격확인시스템은 정보주체의 동의 내용을 회원가입일자로 기록하며, 분쟁 발생 시 이를 입증할 수 있는 자료로 활용할 수 있습니다.</p>

						</div>


					</div>
					<div class="agree">
						<div class="txt">동의하시겠습니까?</div>
						<div class="radiobox">
							<ul>
								<li><input type="radio" id="chk_agree01" name="agree"></li>
								<li class="a_txt"><label for="chk_agree01">동의</label></li>
							</ul>
							<ul>
								<li><input type="radio" id="chk_disagree01" name="agree"></li>
								<li class="a_txt a_txt02"><label for="chk_disagree01">동의하지
										않음</label></li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 개인정보 수집 및 보호 안내 -->
			<div class="contBox lastBox">
				<div class="nameBox">
					<h4 class="name">개인정보 제3자 제공 동의</h4>
				</div>
				<div class="cont">
					<div class="cont_txt">
						<div class="txt" id="txtForuser2">
							<h3>* 개인정보를 제공받는 자</h3>
							<p class="highlight3">도로교통공단</p>
							<br />
							<h3>* 개인정보를 제공받는 자의 개인정보 이용 목적</h3>
							<p>여객자동차 운수사업법 제34조의2, 제34조의3, 동법 시행령 제45조의2에 의거하여 <span class="dlntxt3">대여사업자 운전자격확인 의무</span>를 확인하기 위한 목적으로 사용됩니다.</p>							<br />
							<h3>* 제공하는 개인정보의 항목</h3>
							<p class="dlntxt2">운전면허번호</p>
							<br />
							<h3>* 개인정보를 제공받는 자의 개인정보 보유 및 이용 기간</h3>
							<p class="highlight3">업무목적이 완료된 시점으로부터 1년</p>
							<br />
							<h3>* 거부권 및 불이익</h3>
							<p class="dlntxt">※ 동의를 거부할 수 있으며, 동의 거부시 운전자격확인 서비스가 제공되지
								않습니다.</p>
						</div>

						<!-- 						<div class="txt" id="txtForPublic2"> -->
						<!-- 						    <h3>* 개인정보를 제공받는 자</h3> -->
						<!-- 						    <p class="highlight">도로교통공단</p> -->
						<!-- 						    <br/> -->
						<!-- 						    <h3>* 개인정보를 제공받는 자의 개인정보 이용 목적</h3> -->
						<!-- 						    <p class="highlight">대여사업자 운전자격확인 의무</p> -->
						<!-- 						    <br/> -->
						<!-- 						    <h3>* 제공하는 개인정보의 항목</h3> -->
						<!-- 						    <p class="dlntxt">운전면허번호</p> -->
						<!-- 						    <br/> -->
						<!-- 						    <h3>* 개인정보를 제공받는 자의 개인정보 보유 및 이용 기간</h3> -->
						<!-- 						    <p class="highlight">업무목적이 완료된 시점으로부터 1년</p> -->
						<!-- 						    <br/> -->
						<!-- 						    <h3>* 거부권 및 불이익</h3> -->
						<!-- 						    <p class="dlntxt">※ 동의를 거부할 수 있으며, 동의 거부시 운전자격확인 서비스가 제공되지 않습니다.</p> -->
						<!-- 						</div> -->

						<!-- 						<div class="txt" id="txtForLAE2"> -->
						<!-- 						    <h3>* 개인정보를 제공받는 자</h3> -->
						<!-- 						    <p class="highlight">도로교통공단</p> -->
						<!-- 						    <br/> -->
						<!-- 						    <h3>개인정보를 제공받는 자의 개인정보 이용 목적</h3> -->
						<!-- 						    <p class="highlight">대여사업자 운전자격확인 의무</p> -->
						<!-- 						    <br/> -->
						<!-- 						    <h3>* 제공하는 개인정보의 항목</h3> -->
						<!-- 						    <p class="dlntxt">운전면허번호</p> -->
						<!-- 						    <br/> -->
						<!-- 						    <h3>* 개인정보를 제공받는 자의 개인정보 보유 및 이용 기간</h3> -->
						<!-- 						    <p class="highlight">업무목적이 완료된 시점으로부터 1년</p> -->
						<!-- 						    <br/> -->
						<!-- 						    <h3>* 거부권 및 불이익</h3> -->
						<!-- 						    <p class="dlntxt">※ 동의를 거부할 수 있으며, 동의 거부시 운전자격확인 서비스가 제공되지 않습니다.</p> -->
						<!-- 						</div> -->

					</div>
					<div class="agree">
						<div class="txt">동의하시겠습니까?</div>
						<div class="radiobox">
							<ul>
								<li><input type="radio" id="chk_agree02" name="agree_02"></li>
								<li class="a_txt"><label for="chk_agree02">동의</label></li>
							</ul>
							<ul>
								<li><input type="radio" id="chk_disagree02" name="agree_02"></li>
								<li class="a_txt a_txt02"><label for="chk_disagree02">동의하지
										않음</label></li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div class="btn_flex">
				<button class="blue_btn step2Btn">신청하기</button>
			</div>
		</div>
	</div>

	<div id="container" class="step2" style="display: none">
		<div class="wrap">
			<div class="titBox">
				<div class="tit01">
					<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘"
						class="ico_tit">
					<h2>권한신청</h2>
				</div>
				<ul class="tit02">
					<li class="home"><img
						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li>회원정보</li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li class="current">권한신청</li>
				</ul>
			</div>

			<ul class="step_wr">
				<li class="step">서비스 이용안내</li>
				<li class="current_step step">정보 입력</li>
				<li class="step">신청 완료</li>
			</ul>

			<!-- 정보입력 -->
			<div class="contBox">
				<div class="nameBox">
					<h4 class="name">사용자 정보 입력</h4>
				</div>
				<div class="cont">

					<!-- 정보 입력 폼 -->
					<!-- 대여사업자 정보 입력 폼 -->
					<div id="tab-1" class="tab-content">
						<div class="cont-flex">
							<table class="tb rental_tb01">
								<caption>사용자 정보입력</caption>
								<tr>
									<th scope="col">회사명 <span class="asterisk">*</span>
									</th>
									<td class="input-width">
										<div class="tb_flex">
											<label for="company">회사명</label> <input id="hiBzmnSeCd"
												aria-label="주사무소영업소구분" style="display: none"> <input
												id="bzmnSn" aria-label="사업자일련번호" style="display: none">
											<input id="upBzmnSn" aria-label="상위사업자일련번호"
												style="display: none"> <input id="regCmptncCd"
												aria-label="사업소관할구역코드" style="display: none"> <input
												id="upBzmnSn" aria-label="상위사업자일련번호" style="display: none">
											<input id="company" class="input" aria-label="사업자번호입력"
												placeholder="회사찾기 버튼을 클릭해 입력해주세요" readonly>
											<button class="yellow_btn company_search">회사찾기</button>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="col" style="display: flex">
										<div>
											주사무소/<br>영업소(예약소)
										</div> <span class="asterisk">*</span>
									</th>
									<td>
										<div style="display: flex; justify-content: flex-start;">
											<div class="BzmnSeCdDiv">
												<label for="txtBzmnSeCd">주사무소/영업소(예약소)</label> <input
													id="txtBzmnSeCd" class="input no_line" aria-label="주/영"
													placeholder="" maxlength="2" readonly>
											</div>
											<div class="checkDiv">
												<input type="checkbox" id="bzmnAdmin" name="userType"
													value="bzmnAdmin"> <label for="bzmnAdmin">관리자</label>
												<span class="checkSpan">관리자 여부</span>
											</div>
										</div>
									</td>
								</tr>
								<!-- <tr>
									<th scope="col">
				                    	인증서
				                    	<span class="asterisk">*</span>
				                    </th>
				                    <td class="input-width">
				                    	<div class="tb_flex">
				                        	<label for="cer">인증서</label>
				                        	<input id="cer" class="input" aria-label="인증서등록" placeholder="인증서를 등록해주세요">
				                        	<button class="yellow_btn cer_regis">등록</button>
				                      	</div>
				                    </td>
			                  	</tr> -->
								<tr>
									<th scope="col"></th>
									<td><span style="color: red;">※ 영업장의 관리자일 경우 선택합니다.
											관리자는 소속 사용자를 관리할 수 있는 권한을 부여받습니다. </span></td>
								</tr>
								<tr>
									<th scope="col">휴대폰 번호 <span class="asterisk">*</span>
									</th>
									<td><label for="tab-1_user_num01">휴대폰 번호</label> <input
										id="tab-1_user_num01" class="input no_line"
										aria-label="휴대폰 번호" value="<%=phoneNum%>" readonly></td>
								</tr>
								<tr>
									<th scope="col">보조 연락처</th>
									<td><label for="tab-1_second_num01">보조 연락처</label> <input
										id="tab-1_second_num01" class="input" aria-label="보조연락처입력"
										maxlength="13" oninput="telFormat(this)"></td>
								</tr>
							</table>
							<table class="tb rental_tb02">
								<caption>사용자 정보입력</caption>
								
								<tr>
									<th scope="col">사업자 번호 <span class="asterisk">*</span>
									</th>
									<td><label for="road_num01">사업자 번호</label> <input
										id="road_num01" class="input no_line" aria-label="사업자 번호"
										placeholder="" readonly></td>
								</tr>
								<tr>
									<th scope="col">성명 <span class="asterisk">*</span>
									</th>
									<td><label for="tab-1_user_name01">성명</label> <input
										id="tab-1_user_name01" class="input no_line" aria-label="성명"
										placeholder="성명" value="<%=name%>" readonly> <input
										id="message" value="<%=message%>" style="display: none">
									</td>
								</tr>
								<tr>
									<th scope="col">이메일 <span class="asterisk">*</span>
									</th>
									<td><label for="tab-1_email01">이메일</label> <input
										id="tab-1_email01" class="input no_line" aria-label="이메일"
										placeholder="OOOO @ OOO.com" value="<%=email%>" readonly>
									</td>
								</tr>
								<tr>
									<th scope="col">사업자등록증<span class="asterisk">*</span></th>
									<td class="input-width">
										<div class="tb_flex filebox">
											<label for="tab-1_userFile">사업자등록증</label> <input
												id="tab-1_userFile" class="upload-name01 input"
												aria-label="사업자등록증" readonly> <label
												for="tab-1_userFileBtn" class="file_btn">파일첨부</label> <input
												type="file" id="tab-1_userFileBtn"
												accept=".jpg, .jpeg, .png, .pdf, .zip">
										</div>
									</td>
								</tr>
								<tr>
									<th scope="col">건강보험자격득실<br/>확인서<span class="asterisk">*</span></th>
									<td class="input-width">
										<div class="tb_flex filebox">
											<label for="tab-1_userFile2">건강보험자격득실확인서</label> <input
												id="tab-1_userFile2" class="upload-name01 input"
												aria-label="건강보험자격득실확인서" readonly> <label
												for="tab-1_userFileBtn2" class="file_btn">파일첨부</label> <input
												type="file" id="tab-1_userFileBtn2"
												accept=".jpg, .jpeg, .png, .pdf, .zip">
										</div>
									</td>
								</tr>
							</table>
						</div>
					</div>

					<!-- 공공기관 관리자 정보 입력 폼 -->
					<div id="tab-2" class="tab-content">
						<div class="cont-flex">
							<table class="tb rental_tb01">
								<caption>사용자 정보입력</caption>
								<tr>
									<th scope="col">기관명 <span class="asterisk">*</span>
									</th>
									<td><label for="ogdpNm">기관명</label> <input id="ogdpNm"
										class="input no_line" aria-label="기관명입력" readonly></td>
								</tr>
								<tr>
									<th scope="col">성명 <span class="asterisk">*</span>
									</th>
									<td><label for="tab-2_user_name01">성명</label> <input
										id="tab-2_user_name01" class="input no_line" aria-label="성명"
										placeholder="성명" value="<%=name%>" readonly> <input
										id="message" value="<%=message%>" style="display: none">
									</td>
								</tr>
								<tr>
									<th scope="col">휴대폰 번호 <span class="asterisk">*</span>
									</th>
									<td><label for="tab-2_user_num01">휴대폰 번호</label> <input
										id="tab-2_user_num01" class="input no_line"
										aria-label="휴대폰 번호" value="<%=phoneNum%>" readonly></td>
								</tr>
								<tr>
									<th scope="col">보조 연락처</th>
									<td><label for="tab-2_second_num01">보조 연락처</label> <input
										id="tab-2_second_num01" class="input" aria-label="보조연락처입력"
										maxlength="13" oninput="telFormat(this)"></td>
								</tr>
								<tr>
									<th scope="col">공문첨부<span class="asterisk">*</span></th>
									<td class="input-width">
										<div class="tb_flex filebox">
											<label for="tab-2_userFile">공문첨부</label> <input
												id="tab-2_userFile" class="upload-name01 input"
												aria-label="공문첨부" readonly> <label
												for="tab-2_userFileBtn" class="file_btn">파일첨부</label> <input
												type="file" id="tab-2_userFileBtn"
												accept=".jpg, .jpeg, .png, .pdf, .zip">
										</div>
									</td>
								</tr>
							</table>
							<table class="tb rental_tb02">
								<caption>사용자 정보입력</caption>
								<tr>
									<th scope="col">신청권한 <span class="asterisk">*</span>
									</th>
									<td><label for="authrtCd">신청권한</label> <input
										id="authrtCd" class="select" aria-label="신청권한"></td>
								</tr>
								<tr>
									<th scope="col">소속부서명 <span class="asterisk">*</span>
									</th>
									<td><label for="ogdpDeptNm">소속부서명</label> <input
										id="ogdpDeptNm" class="input" aria-label="소속부서명"
										placeholder="" maxlength="15"></td>
								</tr>
								<tr>
									<th scope="col">소속 연락처</th>
									<td><label for="ogdpTelno">소속 연락처</label> <input
										id="ogdpTelno" class="input" aria-label="소속연락처입력"
										maxlength="13" oninput="telFormat(this)"></td>
								</tr>
								<tr>
									<th scope="col">이메일 <span class="asterisk">*</span>
									</th>
									<td><label for="tab-2_email01">이메일</label> <input
										id="tab-2_email01" class="input no_line" aria-label="이메일"
										placeholder="OOOO @ OOO.com" value="<%=email%>" readonly>
									</td>
								</tr>
							</table>
						</div>
					</div>

					<!-- 지자체 담당자 정보 입력 폼 -->
					<div id="tab-3" class="tab-content">
						<div class="cont-flex">
							<table class="tb rental_tb01">
								<caption>사용자 정보입력</caption>
								<tr>
									<th scope="col">등록 지자체 <span class="asterisk">*</span>
									</th>
									<td class="input-width">
										<div class="tb_flex">
											<label for="cmptncZoneCd">등록 지자체</label> <input
												id="cmptncZoneCd" aria-label="지자체관할구역코드"
												style="display: none"> <input id="cmptncZone"
												class="input" aria-label="등록 지자체"
												placeholder="지자체찾기 버튼을 클릭해 입력해주세요" readonly>
											<button class="yellow_btn locgov_search">지자체찾기</button>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="col">성명 <span class="asterisk">*</span>
									</th>
									<td><label for="tab-3_user_name01">성명</label> <input
										id="tab-3_user_name01" class="input no_line" aria-label="성명"
										placeholder="성명" value="<%=name%>" readonly> <input
										id="message" value="<%=message%>" style="display: none">
									</td>
								</tr>
								<tr>
									<th scope="col">휴대폰 번호 <span class="asterisk">*</span>
									</th>
									<td><label for="tab-3_user_num01">휴대폰 번호</label> <input
										id="tab-3_user_num01" class="input no_line"
										aria-label="휴대폰 번호" value="<%=phoneNum%>" readonly></td>
								</tr>
								<!-- 								<tr> -->
								<!-- 									<th scope="col">공문첨부</th> -->
								<!-- 									<td class="input-width"> -->
								<!-- 										<div class="tb_flex filebox"> -->
								<!-- 											<label for="tab-3_userFile">공문첨부</label> <input -->
								<!-- 												id="tab-3_userFile" class="upload-name01 input" -->
								<!-- 												aria-label="공문첨부" readonly> <label -->
								<!-- 												for="tab-3_userFileBtn" class="file_btn">파일첨부</label> <input -->
								<!-- 												type="file" id="tab-3_userFileBtn" -->
								<!-- 												accept=".jpg, .jpeg, .png, .pdf, .zip"> -->
								<!-- 										</div> -->
								<!-- 									</td> -->
								<!-- 								</tr> -->
							</table>
							<table class="tb rental_tb02">
								<caption>사용자 정보입력</caption>
								<!-- 								<tr> -->
								<!-- 									<th scope="col"></th> -->
								<!-- 				                    <td> -->
								<!-- 				                    	<input class="input no_line" readonly> -->
								<!-- 				                    </td> -->
								<!-- 								</tr> -->
								<tr>
									<th scope="col">이메일 <span class="asterisk">*</span>
									</th>
									<td><label for="tab-3_email01">이메일</label> <input
										id="tab-3_email01" class="input no_line" aria-label="이메일"
										placeholder="OOOO @ OOO.com" value="<%=email%>" readonly>
									</td>
								</tr>
								<tr>
									<th scope="col">보조 연락처</th>
									<td><label for="tab-3_second_num01">보조 연락처</label> <input
										id="tab-3_second_num01" class="input" aria-label="보조연락처입력"
										maxlength="13" oninput="telFormat(this)"></td>
								</tr>
								<tr>
									<th scope="col">공문첨부</th>
									<td class="input-width">
										<div class="tb_flex filebox">
											<label for="tab-3_userFile">공문첨부</label> <input
												id="tab-3_userFile" class="upload-name01 input"
												aria-label="공문첨부" readonly> <label
												for="tab-3_userFileBtn" class="file_btn">파일첨부</label> <input
												type="file" id="tab-3_userFileBtn"
												accept=".jpg, .jpeg, .png, .pdf, .zip">
										</div>
									</td>
									<!-- 									<th scope="col">GPKI 인증서</th> -->
									<!-- 									<td class="input-width"> -->
									<!-- 										<div class="tb_flex"> -->
									<!-- 											<label for="cer">GPKI 인증서</label> <input id="cer" -->
									<!-- 												class="input" aria-label="인증서등록" -->
									<!-- 												placeholder="GPKI 인증서를 등록해주세요" readonly> <input -->
									<!-- 												id="aSignedMsg" style="display: none;" /> <input -->
									<!-- 												id="aVidMsg" style="display: none;" /> <input -->
									<!-- 												id="subjectRDN" style="display: none"> <input -->
									<!-- 												id="crtfctSeCd" style="display: none"> <input -->
									<!-- 												id="certYn" style="display: none"> -->
									<!-- 											<button class="yellow_btn cer_regis">등록</button> -->
									<!-- 										</div> -->
									<!-- 									</td> -->
								</tr>
								<tr>
									<td colspan="2">
										<p>
											&nbsp;&nbsp;(공문 및 지자체 사업자 등록증 첨부)
										</p>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class="btn_flex">
				<button class="blue_btn requestBtn">신청요청</button>
				<button class="gray_btn homeBtn">취소</button>
			</div>
		</div>
	</div>

	<div id="container" class="step3" style="display: none">
		<div class="wrap">
			<div class="titBox">
				<div class="tit01">
					<img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘"
						class="ico_tit">
					<h2>권한신청</h2>
				</div>
				<ul class="tit02">
					<li class="home"><img
						src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li>회원정보</li>
					<li class="mid"><img
						src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
					<li class="current">권한신청</li>
				</ul>
			</div>

			<ul class="step_wr">
				<li class="step">서비스 이용안내</li>
				<li class="step">정보 입력</li>
				<li class="current_step step">신청 완료</li>
			</ul>

			<!-- 정보입력 -->
			<div class="contBox au_complete">
				<div class="cont">
					<p>권한신청이 완료되었습니다.</p>
					<p>승인까지 최대 3일 정도 소요될 수 있습니다.</p>
				</div>
			</div>
		</div>
	</div>

	<!-- 주소 -->
	<div class="popup com_address01" style="z-index: 10000;">
		<div class="box">
			<div class="popup_top">
				<h4>주소 검색</h4>
				<div class="close">
					<span></span> <span></span>
				</div>
			</div>

			<div class="content" id="addr-wrap"></div>
		</div>
	</div>
</div>

<!-- 회사찾기 팝업 -->
<div class="authority_02" style="width: 800px;">
	<div class="popup c_search_popup">
		<div class="box">
			<div class="popup_top">
				<h4>회사찾기</h4>
				<div class="close">
					<span></span> <span></span>
				</div>
			</div>
			<div class="content">
				<div class="search_wr">
					<div class="s_tit" style="width: 42px;">사업자</div>
					<div class="popup_flex">
						<!-- <div class="dropdown">
		            	<label for="popupSearchCol" style="display: none">검색조건</label>
		            	<input id="popupSearchCol">
		          	</div> -->
						<label for="popupSearchWrd" style="display: none">검색조건</label> <input
							id="popupSearchWrd" class="input pop_address"
							aria-label="검색조건 입력" placeholder="검색조건을 입력하세요">
					</div>
					<button class="yellow_btn" id="cmpnySearchBtn">
						검색 <img src="${contextPath}/images/sub/ico_search02.png" alt="검색">
					</button>
				</div>
				<div class="result scrollBar02">
					<table id="cmpnyGrid">
						<caption>회사리스트</caption>
					</table>
				</div>
				<div class="btn_flex">
					<button class="blue_btn cancel_btn">확인</button>
					<button class="gray_btn cancel_btn">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 지자체찾기 팝업 -->
<div class="authority_02" style="width: 800px;">
	<div class="popup c_search_popup" id="g_search_popup">
		<div class="box">
			<div class="popup_top">
				<h4>지자체찾기</h4>
				<div class="close">
					<span></span> <span></span>
				</div>
			</div>
			<div class="content">
				<div class="search_wr">
					<div class="s_tit">검색</div>
					<div class="popup_flex">
						<div class="dropdown">
							<label for="ctpvNm" style="display: none">시도</label> <input
								id="ctpvNm" class="ctpvNm">
						</div>
						<div class="dropdown">
							<label for=sggNm style="display: none">시군구</label> <input
								id="sggNm" class="sggNm">
						</div>
					</div>
					<button class="yellow_btn" id="locgovSearchBtn">
						검색 <img src="${contextPath}/images/sub/ico_search02.png" alt="검색">
					</button>
				</div>
				<div class="result scrollBar02">
					<table id="locgovGrid">
						<caption>시군구 리스트</caption>
					</table>
				</div>
				<div class="btn_flex">
					<button class="blue_btn cancel_btn">확인</button>
					<button class="gray_btn cancel_btn">취소</button>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 사업자등록 팝업 -->
<div class="sub03">
	<div class="popup register_popup popup_type02">
		<div class="box">
			<div class="popup_top">
				<h4>사업자 등록</h4>
				<div class="close">
					<span></span> <span></span>
				</div>
			</div>
			<div class="content">
				<div class="scrollBar02">
					<div class="info_wr">
						<div class="insert_popup top_info">
							<p>
								(<span style="color: #57BEA2;">*</span>)은 필수입력 입니다.
							</p>
						</div>

						<div class="contBox">
							<div class="nameBox nameBox-flex">
								<h4 class="name">회사 기본 정보</h4>
							</div>
							<div class="cont cont-flex">
								<table class="tb rental_tb01">
									<caption>회사 기본 정보</caption>
									<tr>
										<th scope="col">회사명<span class="asterisk">*</span></th>
										<td><label for="coNm">회사명</label> <input id="coNm"
											class="input" aria-label="회사명" maxLength="20"
											oninput="charOnly(this)"></td>
									</tr>
									<tr>
										<th scope="col">사업자번호<span class="asterisk">*</span></th>
										<!-- 	                                    <td class="input-width"> -->
										<td>
											<!-- 	                                        <div class="tb_flex"> -->
											<label for="brno">사업자번호</label> <input id="brno"
											class="input" aria-label="사업자번호" maxlength="12"
											oninput="brnoFormat(this)"> <!-- 	                                            <button class="yellow_btn duplicChk">중복확인</button> -->
											<!-- 	                                        </div> -->
										</td>
									</tr>
									<tr>
										<th scope="col">사업자등록증<span class="asterisk">*</span></th>
										<td class="input-width">
											<div class="tb_flex filebox">
												<label for="bzmnLicenseAtch">사업자등록증</label> <input
													id="bzmnLicenseAtch" class="upload-name01 input"
													aria-label="사업자등록증" readonly> <label
													for="bzmnFileBtn" class="file_btn">파일첨부</label> <input
													type="file" id="bzmnFileBtn"
													accept=".jpg, .jpeg, .png, .pdf, .zip">
											</div>
										</td>
									</tr>
									<tr>
										<th scope="col">사업소종류<span class="asterisk">*</span></th>
										<td><label for="bzmnSeCd">사업소종류</label> <input
											id="bzmnSeCd" aria-label="사업소종류"></td>
									</tr>
									<tr class="upBrno" style="display: none;">
										<th scope="col">주사무소<span class="asterisk">*</span></th>
										<td><label for="upBrno">주사무소</label> <input id="upBrno"
											aria-label="주사무소"></td>
									</tr>
								</table>

								<table class="tb rental_tb01">
									<caption>회사 기본 정보</caption>
									<tr>
										<th scope="col">대표자명<span class="asterisk">*</span></th>
										<td><label for="rprsvNm">대표자명</label> <input id="rprsvNm"
											class="input" aria-label="대표자명" maxLength="20"
											oninput="textOnly(this)"></td>
									</tr>
									<tr>
										<th scope="col">법인번호</th>
										<td><label for="crno">법인번호</label> <input id="crno"
											class="input" aria-label="법인번호" maxlength="14"
											oninput="crnoFormat(this)"></td>
									</tr>
									<tr>
										<th scope="col">법인인감증명서</th>
										<td class="input-width">
											<div class="tb_flex filebox">
												<label for="cocosAtch">법인인감증명서</label> <input id="cocosAtch"
													class="upload-name02 input" aria-label="법인인감증명서" readonly>

												<label for="cocosFileBtn" class="file_btn">파일첨부</label> <input
													type="file" id="cocosFileBtn"
													accept=".jpg, .jpeg, .png, .pdf, .zip">
											</div>
										</td>
									</tr>
									<tr>
										<th scope="col">사업게시일</th>
										<td><label for="bizStrtDay">사업게시일</label> <input
											id="bizStrtDay" class="date" title="datepicker"
											aria-label="사업게시일"></td>
									</tr>
								</table>
							</div>
						</div>

						<div class="contBox">
							<div class="nameBox nameBox-flex">
								<h4 class="name">회사 관할 구역</h4>
							</div>
							<div class="cont cont-flex">
								<table class="tb rental_tb01">
									<tr>
										<th scope="col">등록지역<span class="asterisk">*</span></th>
										<td><label for="adminCmptncZoneCdCtpvNm">등록지역</label> <input
											id="adminCmptncZoneCdCtpvNm" class="ctpvNm" aria-label="등록지역"
											placeholder='등록지역' /></td>
									</tr>
								</table>
								<table class="tb rental_tb01">
									<tr>
										<th scope="col">등록지자체</th>
										<td><label for="adminCmptncZoneCdSggNm">등록지자체</label> <input
											id="adminCmptncZoneCdSggNm" class="sggNm" aria-label="등록지자체"
											placeholder='등록지자체' /></td>
									</tr>
								</table>
							</div>
						</div>

						<div class="contBox contRead">
							<div class="nameBox nameBox-flex">
								<h4 class="name">회사 소재지 정보</h4>
							</div>
							<div class="cont cont-flex">
								<table class="tb rental_tb01">
									<tr>
										<th scope="col">시도<span class="asterisk">*</span></th>
										<td><label for="sggCdCtpvNm"></label> <input
											id="sggCdCtpvNm" class="input" readonly></td>
									</tr>
									<tr>
										<th scope="col">도로명주소<span class="asterisk">*</span></th>
										<td class="input-width">
											<div class="tb_flex">
												<label for="roadNmAddr">도로명주소</label> <input id="roadNmAddr"
													class="input" aria-label="도로명주소" readonly>
												<button class="yellow_btn office office_ad01">주소찾기</button>
											</div>
										</td>
									</tr>
									<tr>
										<th scope="col">지번주소</th>
										<td><label for="lotnoAddr">지번주소</label> <input
											id="lotnoAddr" class="input" aria-label="지번주소" readonly>
										</td>
									</tr>
									<tr>
										<th scope="col">차고지 도로명 주소</th>
										<td class="input-width">
											<div class="tb_flex">
												<label for="garageRoadNmAddr">차고지 도로명 주소</label> <input
													id="garageRoadNmAddr" class="input" aria-label="차고지 도로명 주소"
													readonly>
												<button class="yellow_btn garage office_ad01">주소찾기</button>
											</div>
										</td>
									</tr>
								</table>
								<table class="tb rental_tb01">
									<tr>
										<th scope="col">시군구<span class="asterisk">*</span></th>
										<td><label for="sggCdSggNm"></label> <input
											id="sggCdSggNm" class="input" readonly> <input
											type="hidden" id="sggCd" name="sggNm_hide"
											style="display: none;" /></td>
									</tr>
									<tr>
										<th scope="col">위치정보</th>
										<td>
											<div class="tb_flex">
												<span style="margin-right: 5px">위도</span> <label for="lat">위도</label>
												<input type="text" id="lat" name="lat" class="input clear"
													placeholder="위도" maxLength="10" aria-label="위도" /> <span
													style="margin: 0px 5px">경도</span> <label for="lot">경도</label>
												<input type="text" id="lot" name="lot" class="input clear"
													placeholder="경도" maxLength="11" aria-label="경도" />
											</div>
										</td>
									</tr>
									<tr>
										<th scope="col">상세주소</th>
										<td>
											<div class="tb_flex">
												<label for="addrDetail">상세주소</label> <input id="addrDetail"
													class="input" aria-label="상세주소" maxLength="200"
													oninput="charOnly(this)">
											</div>
										</td>
									</tr>
									<tr>
										<th scope="col">차고지 도로명상세주소</th>
										<td>
											<div class="tb_flex">
												<label for="garageRoadNmAddrDetail">차고지 도로명상세주소</label> <input
													id="garageRoadNmAddrDetail" class="input"
													aria-label="차고지 도로명 주소" maxLength="200"
													oninput="charOnly(this)">
											</div>
										</td>
									</tr>
								</table>
							</div>
							<div class="cont">
								<div class="mapName cont-flex" style="margin-bottom: 10px;">
									<h3>사업자 위치</h3>
									<span class="locationNo" style="color: #ff3838">※ 주소찾기를
										선택 후에도 사업자 위치가 나오지 않을 경우 지도에서 위치를 클릭하세요</span>
								</div>
								<div id="insertMap" class="insertPopupMap"
									style="width: 100%; height: 300px;"></div>
							</div>
						</div>
						<div class="contBox">
							<div class="nameBox nameBox-flex">
								<h4 class="name">회사 상태 정보</h4>
							</div>
							<div class="cont cont-flex">
								<table class="tb rental_tb01">
									<caption>회사상태정보</caption>
									<tr>
										<th scope="col">영업상태<span class="asterisk">*</span></th>
										<td><label for="bsnStts">영업상태</label> <input id="bsnStts"
											aria-label="영업상태"></td>
									</tr>
									<tr>
										<th scope="col">상태변경일시<span class="asterisk">*</span></th>
										<td><label for="bsnSttsMdfcnDt">상태변경일시</label> <input
											id="bsnSttsMdfcnDt" class="date" title="datepicker"
											aria-label="상태변경일시"></td>
									</tr>
									<tr>
										<th scope="col">연락처</th>
										<td><label for="telno">연락처</label> <input id="telno"
											class="input" aria-label="연락처" maxLength="13"
											oninput="telFormat(this)"></td>
									</tr>
									<tr>
										<th scope="col">차량등록대수</th>
										<td><label for="vhclRegCntom">차량등록대수</label> <input
											id="vhclRegCntom" class="input" name="Num_pic1" type="text"
											value="0" aria-label="차량등록대수" maxLength="7"
											oninput="numberOnly(this)"></td>
									</tr>
									<tr>
										<th scope="col">승용차대수</th>
										<td><label for="sednCarNoh">승용차대수</label> <input
											id="sednCarNoh" class="input" name="Num_pic2" type="text"
											value="0" aria-label="승용차대수" maxLength="7"
											oninput="numberOnly(this)"></td>
									</tr>
									<tr>
										<th scope="col">승합차대수</th>
										<td><label for="passVhcleNoh">승합차대수</label> <input
											id="passVhcleNoh" class="input" name="Num_pic3" type="text"
											value="0" aria-label="승합차대수" maxLength="7"
											oninput="numberOnly(this)"></td>
									</tr>
								</table>

								<table class="tb rental_tb01">
									<caption>회사상태정보</caption>
									<tr>
										<th scope="col">평일운영시간</th>
										<td>
											<ul class="hours">
												<li class="hour_input"><label for="operBgngDt">평일운영시간</label>
													<input type="time" id="operBgngDt" class="input"
													aria-label="평일운영시간" placeholder="00:00" maxLength="5"
													oninput="timeFormat(this)"></li>
												<li class="bar">~</li>
												<li class="hour_input"><label for="operEndDt">평일운영시간</label>
													<input type="time" id="operEndDt" class="input"
													aria-label="평일운영시간" placeholder="00:00" maxLength="5"
													oninput="timeFormat(this)"></li>
											</ul>
										</td>
									</tr>
									<tr>
										<th scope="col">전기승용차</th>
										<td><label for="elecSednCarNoh">전기승용차</label> <input
											id="elecSednCarNoh" class="input" name="Num_pic4" type="text"
											value="0" aria-label="전기승용차" maxLength="7"
											oninput="numberOnly(this)"></td>
									</tr>
									<tr>
										<th scope="col">전기승합차</th>
										<td><label for="elecPassVhcleNoh">전기승합차</label> <input
											id="elecPassVhcleNoh" class="input" name="Num_pic5"
											type="text" value="0" aria-label="전기승합차" maxLength="7"
											oninput="numberOnly(this)"></td>
									</tr>
									<tr>
										<th scope="col" class="note_name">비고</th>
										<td class="textarea_wr"><label for="rmrk">비고</label> <textarea
												name="note" id="rmrk" cols="30" rows="10" class="noteBox"
												maxLength="1000" placeholder="비고란"></textarea></td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="btn_flex">
				<button class="blue_btn insertBtn">등록</button>
				<button class="gray_btn cancel_btn">취소</button>
			</div>
		</div>
	</div>
</div>