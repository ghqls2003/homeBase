<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>

<%@ page import="xecure.servlet.*" %>
<%@ page import="xecure.crypto.*" %>
<%@ page import="java.security.*" %>
<%@ page import="java.util.Random" %>

 <!-- XecureKeyPad Plugin, Lite(HTML5), E2E(XFS) -->
<script src="../ext-lib/HancomKeyPad/js/xkeypad_config.js"></script>
<script src="../ext-lib/HancomKeyPad/js/xkeypad_html5.js"></script>
<script src="../ext-lib/HancomKeyPad/js/xkeypad_plugin.js"></script>
<script src="../ext-lib/HancomKeyPad/js/xkeypad_desktop.js"></script>

<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${pageContext.request.contextPath}/js/ma/myPage.js"></script>

<script type="text/javascript">
document.write("<script type=\"text/javascript\" src=\"" + "../ext-lib/AnySign_26/anySign4PCInterface.js" + "?version=" + new Date().getTime() + "\"></scr"+"ipt>");
</script>

<script type='text/javascript'>
<%
	VidVerifier vid = new VidVerifier(new XecureConfig());
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

	//out.println("AnySign.mAnySignITGT = '" + HashedRandomValue + "';");
%>
AnySign.mCharset = "utf-8";
AnySign.mXecureKeyPadHTML5Enable = true;
</script>

<style>

.customBox div:hover{
	cursor: pointer;
}

.nameBox{
	width: 50%;
	background-color: #FFFFFF !important;
}

.customBox{
	display: flex;
	justify-content: space-around;
	text-align: center;
}

#heightChange{
	height: 455px;
}

.contBox .nameBox{
	padding: 10px;
}

.contBox .cont {
    flex-direction: column;
    justify-content: center;
    height: 90%;
    padding: 25px 44px;
}

</style>

<script>
	var authrtCd  = "${authrtCd}";
</script>

<div class="subPage mypage">
    <!-- 콘텐츠 시작 -->
    <div id="container">
        <div class="wrap">
            <div class="titBox">
                <div>
                    <div class="tit01">
                        <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
                        <h2>마이페이지</h2>
                    </div>

                </div>
                <ul class="tit02">
                    <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
                    <li class="current">마이페이지</li>
                </ul>
            </div>
			<!-- basicInfo 시작 -->
            <div id="formChange" class="mypage_cont">
                <div id="heightChange" class="contBox">
                 	<div class="customBox">
                    <div id="basicInfo" class="nameBox" style="background-color: #F5F8FE !important;">
                        <h4 class="name">기본정보</h4>
                    </div>
                    <div id="etcInfo" class="nameBox">
                        <h4 class="name">부가정보</h4>
                    </div>
                    <div id="serviceLog" class="nameBox">
                        <h4 class="name">운전자격 확인이력</h4>
                    </div>
                    </div>
                    <div id="basicInfoView" class="cont" style="display: flex;">
                        <table class="tb">
                            <caption>마이페이지 기본정보</caption>
                            <tr>
                                <th scope="col">권한명</th>
                                <td>
                                    <label for="authrtNm">권한명</label>
                                    <input type="text" id="authrtNm" class="input no_line" aria-label="권한명" placeholder="권한1" readonly>
                                </td>
                            </tr>
                            <tr id="coNmOrSggNmTr">
                                <th scope="col" id="coNmOrSggNm">기업/지자체명</th>
                                <td>
                                    <label for="coNmOrSggNmVal">기업/지자체명</label>
                                    <input type="text" id="coNmOrSggNmVal" class="input no_line" aria-label="기업/지자체명" placeholder="명칭1" readonly>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">성명</th>
                                <td>
                                    <label for="userNm">성명</label>
                                    <input type="text" id="userNm" class="input no_line" aria-label="성명" placeholder="성명1" readonly>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">아이디</th>
                                <td>
                                    <label for="userId">아이디</label>
                                    <input type="text" id="userId" class="input no_line" aria-label="아이디" placeholder="test" readonly>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">휴대폰 번호</th>
                                <td>
                                    <label for="mblTelno">휴대폰 번호</label>
                                    <input type="text" id="mblTelno" class="input no_line" aria-label="휴대폰 번호" placeholder="000-0000-0000" readonly>
                                </td>
                            </tr>
                            <tr>
                                <th scope="col">이메일</th>
                                <td>
                                    <label for="emlAddr">이메일</label>
                                    <input type="text" id="emlAddr" class="input no_line" aria-label="이메일" placeholder="email@naver.com" readonly>
                                </td>
                            </tr>
                            <tr style="display: none;">
                                <th scope="col">로그인 경로</th>
                                <td>
                                    <label for="userLoginPath">이메일</label>
                                    <input type="text" id="userLoginPath" class="input no_line" aria-label="userLoginPath" readonly>
                                </td>
                            </tr>
                            <tr style="display: none;">
                                <th scope="col">사용자 일련번호</th>
                                <td>
                                    <label for="userSn">사용자 일련번호</label>
                                    <input type="text" id="userSn" class="input no_line" aria-label="userSn" readonly>
                                </td>
                            </tr>
                        </table>
                        <div style="font-weight: bold; margin-top: 15px;">
	                        ※ 해당 페이지에서는 보조연락처만 수정 가능합니다.<br/>
	                        다른 정보 변경이 필요한 경우, 공단 홈페이지에서 진행해 주시기 바랍니다.
	                   	</div>
                    </div>
                    <!-- 부가정보  -->
                    <div id="etcInfoView" class="cont" style="display: none;">
                        <table class="tb">
                            <caption>마이페이지 부가정보</caption>
                            <tr>
                                <th scope="col">보조 연락처(선택)</th>
                                <td>
                                    <label for="assiTelno">보조 연락처(선택)</label>
                                    <input type="text" id="assiTelno" class="input no_line" aria-label="보조 연락처" placeholder="000-0000-0000" maxlength="13" oninput="telFormat(this)" readonly>
                                    <input id="subjectRDN" style="display: none">
                                    <input id="crtfctSeCd" style="display: none">
                                    <input id="certYn" style="display: none">
                                </td>
                            </tr>
                            <tr id="cerTr" style="display: none;">
                                <th scope="col">인증서 등록 여부</th>
                                <td class="input-width">
                                 <div class="tb_flex">
                                     <label for="my_cer">인증서 등록 여부</label>
                                     <input id="my_cer" class="input no_line" aria-label="인증서 등록 여부" placeholder="등록 필요" readonly>
                                     <button class="yellow_btn cer_regis_01" style="display: none;">등록</button>
                                     <button class="yellow_btn cer_mng_01" style="display: none;">관리</button>
                                 </div>
                                </td>
                            </tr>
                            <tr id="gpkiTr" style="display: none;">
                                <th scope="col">GPKI인증서 등록 여부</th>
                                <td class="input-width">
                                 <div class="tb_flex">
                                     <label for="gpki_cer">GPKI인증서 등록 여부</label>
                                     <input id="gpki_cer" class="input no_line" aria-label="인증서 등록 여부" placeholder="등록 필요" readonly>
                                     <input id="aSignedMsg" style="display: none;"/>
                                     <input id="aVidMsg" style="display: none;"/>
                                     <button class="yellow_btn cer_regis_02" style="display: none;">등록</button>
                                     <button class="yellow_btn cer_mng_01" style="display: none;">관리</button>
                                 </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!-- 운전자격 확인이력  -->
                    <div id="serviceLogView" class="cont" style="display: none;">
                    	<div class="search_top sub03">
				        	<input type="hidden" id="elxExcelDownReason" name="excelDownReason" />
							<input type="hidden" class="_csrf" name="${_csrf.parameterName}" value="${_csrf.token}" />
			                <div class="selec_wr">
			                    <div class="mo_flex">
			                        <div class="year_picker">
			                            <ul class="yearBox">
			                                <li class="mo_li">
			                                    <label for="date-picker">조회일</label>
			                                    <input id="date-picker" class="datepicker" title="datepicker"
			                                    	aria-label="조회일">
			                                </li>
			                            </ul>
			                        </div>
			                    </div>
			                    <button class="yellow_btn" id="searchBtn">
			                        조회<img src="${contextPath}/images/sub/ico_search02.png" alt="조회아이콘">
			                    </button>
			                </div>
			            </div>
                    	<table id="grid"></table>
                    </div>
                </div>
                <div style="text-align: center;">
	                <button id="switchAuthBtn" class="blue_btn" style="display: none;">사용자 전환</button>
                </div>
                <div class="btn_flex" style="display: none;">
                    <button id="modifyBtn" class="blue_btn" style="display: block;">수정</button>
                    <button id="userWithdrawBtn" class="gray_btn" style="display: block;">탈퇴</button>
                    <button id="updateMyInfoBtn" class="blue_btn" style="display: none;">저장</button>
                    <button id="modifyCancelBtn" class="gray_btn" style="display: none;">취소</button>
                </div>
            </div>
        </div>
    </div>

    <!-- footer -->
</div>