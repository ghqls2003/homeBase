<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>

<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${pageContext.request.contextPath}/js/ma/switchAuthForAdmin.js"></script>

<style>
.checkDiv {
	text-align: right;
}

.txt_wr {
	margin-bottom: 50px;
}

.txt {
	margin-bottom: 15px;
}

.p_01 {
	border-bottom: solid #DBE0EC;
	height: 40px;
	font-size: 2rem !important;
}
</style>

<c:choose>
<c:when test="${authrtCd == 'Z01' || authrtCd == 'K01'}">
<div class="subPage software">
	<div id="container">
		<div class="wrap">
            <div class="titBox">
                <div class="tit01">
                    <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
                    <h2>사업자 권한으로 전환</h2>
                </div>
            </div>
            <div class="txt_wr">
                <p class="p_01">1. 사업자권한 획득 주의사항</p>
                <div class="txt txt_01">
					<p class="p_02">
						사업자 권한으로 전환 시 해당 내역이 기록/보관되며, 목적 외 사용 또는 불법적인 방법으로 접근 시 처벌 받을 수 있습니다.<br />
						권한을 획득하여 해당사업자의 영업 비밀을 침해하거나 손해를 끼칠 경우 민형사상 책임을 물을 수 있습니다.<br />
						<br />
						획득한 권한은 로그아웃 시점에 모두 반환됩니다.<br />
					</p>
                </div>
                <div class="checkDiv">
	             	<input type="checkbox" id="warnChk" name="warnChk">
		            <label for="warnChk">위 사항을 확인하였으며 이용에 동의합니다.</label>
		        </div>
            </div>

            <div class="txt_wr">
                <p class="p_01">2. 현재권한정보</p>
                <div class="cont-flex">
					<table class="tb">
	                	<caption>현재권한정보</caption>
						<colgroup>
							<col width="120" />
							<col width="" />
						</colgroup>
						<tr>
		                    <th>권한</th>
		                    <td id="authrtCd"><c:out value='${authrtCd}'/></td>
		                </tr>
						<tr>
							<th>성명</th>
							<td id="userNm"><c:out value='${ssoUserNm}'/> (<c:out value='${ssoUserId}'/>)</td>
						</tr>
						<tr>
							<th>사업자번호</th>
							<td id="bzmnSn"><c:out value='${bzmnSn}'/></td>
						</tr>
					</table>
				</div>
            </div>

            <div class="txt_wr">
                <p class="p_01">3. 신청정보</p>
                <div class="cont-flex">
					<table class="tb">
	                	<caption>신청정보</caption>
						<colgroup>
							<col width="120" />
							<col width="300" />
							<col width="200" />
							<col width="" />
						</colgroup>
						<tr>
		                    <th>신청사용자(ID)</th>
		                    <td>
		                        <input type="text" id="userId" />
		                    </td>
		                    <td>
		                        <span style="padding-left: 15px">두 글자 이상 입력 후 선택</span>
		                    </td>
		                    <td></td>
		                </tr>
					</table>
				</div>
            </div>

            <div class="btn_flex">
                <button class="blue_btn" id="switchBtn" style="margin-right: 0">전환</button>
            </div>
        </div>
    </div>
</div>
</c:when>
</c:choose>