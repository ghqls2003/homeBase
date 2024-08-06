<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="<c:out value='${pageContext.request.contextPath}/js/mm/authRegist.js'/>"></script>

<div class="header">
	<!-- header start -->
	<div class="pageSubj">
		<span>사용신청</span>
	</div>

</div>
<!-- header end -->

<div class="container">
	<!-- container start -->

	<div class="contBox">

		<div class="boHeader">
			<span>1. 개인정보 수집 및 이용 동의</span>
		</div>
		<div class="agreeCont">
			<!-- 
			한국교통안전공단은 대민서비스를 제공하기 위해 필요한 개인정보를 수집합니다. 필수항목에 해당하는 정보를 입력하시지 않는 경우
			사용신청이 불가능 하나, 선택항목에 당하는 정보는 입력하지 않으셔도 회원가입 및 서비스 이용에는 제한이 없습니다. <br />
			<br />*개인정보 수집항목 <br /> 필수: 아이디, 이름, 생년월일, 핸드폰번호, 사업자등록번호, 지역 <br /><br />
			*보유 및 이용기간 <br /> 수집된 개인정보는 개인의 탈퇴요청 시 까지 보유 이용됩니다. <br /> 정보주체는
			개인정보의 수집·이용목적에 대한 동의를 거부할 수 있으며, 동의 거부 시 한국교통안전공단 홈페이지에 회원가입이 되지 않으며,
			한국교통안전공단 홈페이지에서 제공하는 서비스를 이용할 수 없습니다.<br /> 선택정보를 입력하지 않은 경우에도 서비스 이용
			제한은 없으며 이용자의 기본적 인권 침해의 우려가 있는 민감한 개인 정보(인종, 사상 및 신조, 정치적 성향 이나 범죄기록,
			의료정보 등)는 기본적으로 수집하지 않습니다.<br /> 다만 불가피하게 수집이 필요한 경우 반드시 사전에 동의 절차를
			거치도록 하겠습니다
		-->
			국토교통부는 위험물질 운송정보 관리 및 운송 전 과정의 실시간 모니터링 등 사고대응체계 구축을 위해 필요한 개인정보를
			수집합니다. 필수항목에 해당하는 정보를 입력하시지 않는 경우 사용신청이 불가능 하나, 선택항목에 당하는 정보는 입력하지
			않으셔도 회원가입 및 서비스 이용에는 제한이 없습니다.<br /> <br /> * <span
				class="agreeHigh">개인정보 수집 및 이용 목적</span><br /> 위험물질 운송차량의 사고발생 시 사고
			정보 전파<br /> <br /> * <span class="agreeHigh">개인정보 수집 항목</span><br />
			필수 : 아이디, 성명, 휴대전화번호<br /> <br /> * <span class="agreeHigh">보유
				및 이용기간</span><br /> 수집된 개인정보는 개인의 탈퇴요청 시 까지 보유 이용됩니다.<br /> <br /> * <span
				class="agreeHigh">거부권 및 불이익</span><br /> 정보주체는 개인정보의 수집·이용목적에 대한
			동의를 거부할 수 있으며, 동의 거부 시 국토교통부 위험물질 안전운송 관리서비스 사용권한 승인이 되지 않으며, 제공하는
			서비스를 이용할 수 없습니다.<br /> 선택정보를 입력하지 않은 경우에도 서비스 이용 제한은 없으며 이용자의 기본적 인권
			침해의 우려가 있는 민감한 개인 정보(인종, 사상 및 신조, 정치적 성향이나 범죄기록, 의료정보 등)는 기본적으로 수집하지
			않습니다.<br /> 다만 불가피하게 수집이 필요한 경우 반드시 사전에 동의 절차를 거치도록 하겠습니다.<br /> <br />

		</div>
		<div class="agreeChk">
			<input type="checkbox" id="agreeChk01" /> <label for="agreeChk01">개인정보
				수집 및 이용에 동의합니다.</label>
		</div>

		<div class="boHeader">
			<span>2. 개인정보 제3자 제공 동의</span>
		</div>
		<div class="agreeCont">
			<!-- 
			① 개인정보를 제공받는 자 : 소방청, 환경부(한국환경공단, 화확물진안전원), 산자부(한국가스안전공사), 한국도로공사, 경찰청  <br />
			② 개인정보를 제공받는 자의 개인정보 이용 목적 : 위험물질 운송차량의 안전관리 (물류정책기본법 법률 제14714호 근거) <br />
			③ 제공하는 개인정보의 항목 : 운전자 성명, 생년월일, 전화번호  <br />
			④ 개인정보를 제공받는 자의 개인정보 보유 및 이용 기간 : 제공 후 4년  <br />
			⑤ 동의를 거부할 수 있으며, 동의 거부시 위험물질운송안전관리센터의 서비스가 제공되지 않습니다.  <br />
		-->
			* <span class="agreeHigh">개인정보를 제공받는 자</span><br /> 소방청, 한국도로공사,
			경찰청, 대테러센터, 국가위기관리센터<br /> <br /> * <span class="agreeHigh">개인정보를
				제공받는 자의 개인정보 이용 목적</span><br /> 위험물질 운송차량의 사고 관련 상황 감시 및 사고발생 시 사고 정보 전파
			(물류정책기본법 제29조2항 근거)<br /> <br /> * <span class="agreeHigh">제공하는
				개인정보의 항목</span><br /> 성명, 전화번호<br /> <br /> * <span class="agreeHigh">개인정보를
				제공받는 자의 개인정보 보유 및 이용 기간</span><br /> 업무목적이 완료된 시점으로부터 1년<br /> <br /> *
			<span class="agreeHigh">거부권 및 불이익</span><br /> 동의를 거부할 수 있으며, 동의 거부시
			위험물질 운송안전 관리센터의 서비스가 제공되지 않습니다.<br />
		</div>
		<div class="agreeChk">
			<input type="checkbox" id="agreeChk02" /> <label for="agreeChk02">개인정보
				제3자 제공에 동의합니다.</label>
		</div>
		<div class="boHeader">
			<span>3. 기본정보</span> <span class="e01">※ www.kotsa.or.kr 사이트
				회원가입한 정보로 자동 입력됩니다.</span>
		</div>
		<div class="wTableBox">
			<table class="wTable t01">
				<colgroup>
					<col width="120" />
					<col width="" />
				</colgroup>
				<tr>
					<th>아이디</th>
					<td id="userId"><c:out value='${userId}'/></td>
				</tr>
				<tr>
					<th>성명</th>
					<td id="userName"><c:out value='${userName}'/></td>
				</tr>
				<tr>
					<th>생년월일</th>
					<td id="userBirthday"><c:out value='${userBirthday}'/></td>
				</tr>
				<tr>
					<th>핸드폰번호</th>
					<td id="userMobileNo"><c:out value='${userMobileNo}'/></td>
				</tr>
			</table>
		</div>
		<div class="boHeader">
			<span>4. 신청정보</span>
		</div>
		<div class="wTableBox">
			<table class="wTable t01">
				<colgroup>
					<col width="120" />
					<col width="" />
				</colgroup>
				<tr>
					<th>신청권한</th>
					<td><select id="authType" class="select"></select></td>
				</tr>
				<tr>
					<th>소속</th>
					<td><select id="belongType" class="select"></select></td>
				</tr>
				<tr id="bizrNoTr" style='display: none;'>
					<th>사업자등록번호</th>
					<td>
						<input type="text" class="inp01" maxlength="12" id="bizrNo" />
						<a href="javascript:void(0)" class="wbtn01" id="btnBizrNo">확인</a>
						<span class="e01">※확인되지 않는 사업자 등록번호의 경우 관리자에게 연락 바랍니다. (TEL. 1899-2793(내선2번))</span>
					</td>
				</tr>
				<tr>
					<th>증명서류 파일</th>
					<td>
						<input type="text" class="inp01" readonly="readonly" />
						<input type="file" class="hidden" id="file_upload_field" name="file_upload_field" accept=".zip, .hwp, .doc, .docx, .ppt, .pptx, .xls, .xlsx, .txt, .bmp, .jpg, .jpeg, .gif, .png" onchange='fileAddCheck(this)' />
						<a href="javascript:void(0)" class="wbtn01">파일찾기</a>
						<span class="e01">※ 소속을 확인 할 수 있는 서류 첨부 바랍니다. (예 : 재직증명서, 건강보험납입증명서 등)</span>
					</td>
				</tr>
			</table>
		</div>
		<div class="btnBox">
			<a href="javascript:void(0)" id="btnRegist">신청</a>
		</div>
	</div>

</div>



