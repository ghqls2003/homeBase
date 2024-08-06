<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>

<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="xecure.servlet.*" %>
<%@ page import="xecure.crypto.*" %>
<%@ page import="java.security.*" %>
<%@ page import="java.util.Random" %>
<%@ include file="../cmm/include.jsp"%>

<link rel="stylesheet" type="text/css" href="${contextPath}/css/kendo-default-ocean-blue-min.css" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/reset.css" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/common.css" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/ani.css" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/main.css" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/style.css" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/header.css" />

<script type="text/javascript">
document.write("<script type=\"text/javascript\" src=\"" + "../ext-lib/AnySign_26/anySign4PCInterface.js" + "?version=" + new Date().getTime() + "\"></scr"+"ipt>");
</script>

<script type="text/javascript">
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
//


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

function fn_Download (type)
{
	var downURL;
	if (type == "ANYSIGN")
	{
		if (AnySign.mPlatform.aName == "linux")
		{
			if (confirm("AnySign for PC 설치를 위해서는 브라우저가 재실행 될 수 있습니다. 설치하시겠습니까?"))
			{
				var i386deb = document.createElement("a");
				i386deb.text = "i386_deb";
				var i386rpm = document.createElement("a");
				i386rpm.text = "i386_rpm"
				var x86_64_deb = document.createElement("a");
				x86_64_deb.text = "x86_64_deb";
				var x86_64_rpm = document.createElement("a");
				x86_64_rpm.text = "x86_64_rpm";

				i386deb.href = AnySign.mPlatform.aAnySignInstallPath[0];
				i386rpm.href = AnySign.mPlatform.aAnySignInstallPath[1];
				x86_64_deb.href = AnySign.mPlatform.aAnySignInstallPath[2];
				x86_64_rpm.href = AnySign.mPlatform.aAnySignInstallPath[3];

				document.getElementById("AnySign4PC_download").appendChild (document.createElement("br"));
				document.getElementById("AnySign4PC_download").appendChild (i386deb);
				document.getElementById("AnySign4PC_download").appendChild (document.createElement("br"));
				document.getElementById("AnySign4PC_download").appendChild (i386rpm);
				document.getElementById("AnySign4PC_download").appendChild (document.createElement("br"));
				document.getElementById("AnySign4PC_download").appendChild (x86_64_deb);
				document.getElementById("AnySign4PC_download").appendChild (document.createElement("br"));
				document.getElementById("AnySign4PC_download").appendChild (x86_64_rpm);
				document.getElementById("AnySign4PC_download").appendChild (document.createElement("br"));
			}
		}
		else
		{
			downURL = AnySign.mPlatform.aAnySignInstallPath;
			document.location = downURL;
		}

		var checkInterval = setInterval (function () {
			if (!AnySign.mAnySignLoad && AnySign.mExtensionSetting.mInstallCheck_CB == null) {
				AnySign4PC_installCheck (installCheck_callback);
			} else if (AnySign.mAnySignLoad == true) {
				clearInterval(checkInterval);
			}
		}, 2000);
	}
}

function installCheck_callback (result) {
	var aElement1 = document.getElementById("software_btn");

	switch (result)
	{
		case "ANYSIGN4PC_NORMAL":
			aElement1.style.backgroundColor = "#00127B";
			aElement1.innerHTML = "설치됨";
			aElement1.disabled = true;
			break;
		case "ANYSIGN4PC_INTEGRITY_FAIL":
		case "ANYSIGN4PC_NEED_INSTALL":
		case "ANYSIGN4PC_NEED_UPDATE":
			if (result == "ANYSIGN4PC_INTEGRITY_FAIL") {
				aElement1.style.backgroundColor = "red";
				aElement1.innerHTML = '미설치<img src="${contextPath}/images/sub/ico_install03.png" alt="수동설치">';
			}
			else if (result == "ANYSIGN4PC_NEED_INSTALL") {
				aElement1.style.backgroundColor = "red";
				aElement1.innerHTML = '미설치<img src="${contextPath}/images/sub/ico_install03.png" alt="수동설치">';
			}
			else
			{
				aElement1.style.backgroundColor = "green";
				aElement1.innerHTML = '업데이트필요<img src="${contextPath}/images/sub/ico_install03.png" alt="업데이트">';
			}

			break;
	}
}

PrintObjectTag (true);
setTimeout(function () {
	AnySign4PC_installCheck (installCheck_callback);
}, 500);

function goBack() {
	window.history.back();
}

</script>

<div class="subPage software">
	<div id="container">
		<div class="wrap">
            <div class="titBox">
                <div class="tit01">
                    <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
                    <h2>소프트웨어 설치</h2>
                </div>
                <ul class="tit02">
                    <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
                    <li>로그인</li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
                    <li class="current">소프트웨어 설치</li>
                </ul>
            </div>
            <div class="txt_wr">
                <p class="p_01">회원님의 소중한 정보보호를 위해 보안프로그램을 설치합니다.</p>
                <ul class="txt txt_01">
                    <li class="li_01"><span class="darkgreen">운전자격검증 시스템</span> 서비스를 안전하게 이용하기 위한 프로그램들을 설치하실 수
                        있습니다.</li>
                    <li>
                        <p class="p_02">· 수동설치 후에는 반드시 새로고침을 하거나 다시 접속하시기 바랍니다.</p>
                        <p class="p_02">· 설치완료 메시지가 반복적으로 나오는 경우는 브라우저 종료 및 해당 프로그램 삭제 후 재설치 하시기 바랍니다.</p>
                    </li>
                </ul>
                <ul class="txt txt_02">
                    <li class="li_01"><span class="darkgreen">키보드 보안</span> : 키보드보안 프로그램을 설치하지 않을 경우, 서비스를 위해 입력하는
                        중요한 정보(주민번호, 비밀번호 등)가 유출될 수 있습니다.</li>
                    <li>
                        <p class="p_02">· 키보드 보안프로그램설치 없어도 서비스를 이용할 수 있습니다.</p>
                    </li>
                </ul>
            </div>

            <!-- pc용 -->
            <table class="software_tb">
                <caption>소프트웨어설치</caption>
                <tr>
                    <th scope="row" class="th_flex th_flex01">
                        <div class="type">
                            AnySignForPC
                            <span class="i_type i_essential">필수</span>
                        </div>
                    </th>
                    <td>Non-ActiveX 공인인증서 전자서명을 지원해주는 프로그램입니다.</td>
                    <td class="center not_installed">확인중</td>
                    <td class="center">
                        <button class="software_btn software_btn01" id="software_btn" onclick="javascript:fn_Download('ANYSIGN');">
                            수동설치
                            <img src="${contextPath}/images/sub/ico_install03.png" alt="공인인증서 보안 수동설치">
                        </button>
                    </td>
                </tr>
            </table>

            <!-- 모바일용 -->
            <table class="software_tb software_tb_mo tb_mo_01">
                <caption>소프트웨어설치 모바일</caption>
                <tr>
                    <th scope="row" class="th_flex th_flex01">
                        <div class="type">
                            <span class="i_type i_essential">필수</span>
                            AnySignForPC
                        </div>
                    </th>
                </tr>
                <tr class="tr_02">
                    <td>Non-ActiveX 공인인증서 전자서명을 지원해주는 프로그램입니다.</td>
                </tr>
                <tr>
                    <td class="center not_installed mo_flex">
                        확인중
                        <button class="software_btn software_btn01">
                            수동설치
                            <img src="${contextPath}/images/sub/ico_install03.png" alt="공인인증서 보안 수동설치">
                        </button>
                    </td>
                </tr>
            </table>
            <div class="btn_flex">
                <button class="gray_btn prev_btn" onclick="javascript:goBack();">이전으로</button>
            </div>
        </div>
    </div>
</div>