<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<div class="lnbArea">
	<!-- lnb start -->
	<h1>
		<a href="<c:url value="/mm/main"/>" class="btnHome"><img
			src="${contextPath}/images/etc/etc_logo.png" alt="logo" /></a> <a
			href="javascript:void(0)" class="btnTotalMenu"><img
			src="${contextPath}/images/ico/ico_totalMenu.png" alt="total menu" /></a>
	</h1>
	<div class="myinfo" id="myinfo"
		data-ssudnm="${sessionScope.userData.userNm}"
		data-ssudid="${sessionScope.userData.userId}">
		<div class="pic">
			<img src="${contextPath}/images/ico/ico_member.png" alt="member" />
		</div>
		<p>
			<span style="color: black;" id="sNm">${sessionScope.userData.userNm}
			</span> <span id="sId">(${sessionScope.userData.userId})</span>
		</p>
		<img id="btnLogOut" src="${contextPath}/images/ico/ico_logout.png"
			class="button" alt="logout" />
	</div>
	<dl class="lnbList">
		<c:if test="${sessionScope.menuData != null}">
			<c:forEach items="${sessionScope.menuData}" var="menu">
				<dt>
					<a href="javascript:void(0)" id="${menu.menuId}"
						<c:if test="${fn:containsIgnoreCase(requestScope['javax.servlet.forward.request_uri'], menu.menuUrl)}"> class="active on" </c:if>>
						<img src="${contextPath}/images/ico/${menu.menuId}.png" alt="menu" />
						<span>${menu.menuNm}</span>
					</a>
				</dt>

				<c:if test="${menu.subMenuList != null}">
					<dd
						style="<c:choose><c:when test="${fn:containsIgnoreCase(requestScope['javax.servlet.forward.request_uri'], menu.menuUrl)}">display:block;</c:when><c:otherwise>display:none;</c:otherwise></c:choose>">
						<ul>
							<c:forEach items="${menu.subMenuList}" var="subMenu">
								<li><a
									href="<c:out value='${contextPath}${subMenu.menuUrl}'/>"
									<c:if test="${requestScope['javax.servlet.forward.request_uri'] == subMenu.menuUrl}"> class="active"</c:if>>${subMenu.menuNm}</a>
								</li>
							</c:forEach>
						</ul>
					</dd>
				</c:if>
			</c:forEach>
		</c:if>
	</dl>

	<div class="lnbEtc">
		<!-- <a href="javascript:void(0)" class="btnLnbControll">좌측열고닫기</a> -->
		<ul>
			<li><a href="#" id="btnVIDMng">가상계정관리</a></li>
			<li><a href="https://www.kotsa.or.kr/portal/contents.do?menuCode=07010000"
				target="_blank" class="left">이용약관</a> <a
				href="http://www.kotsa.or.kr/html/ise/ISEPriPol.do" target="_blank"
				style="color: #fe5621;" class="right">개인정보취급방침</a></li>
			<li>
				<!--            <a href="http://stat.molit.go.kr/portal/quality/qualityCenterWrite.do?system_id=S0038" target="_blank" class="left">품질오류신고</a> -->
				<a
				href="https://data.molit.go.kr/systemQuality/write?system_id=S0038"
				target="_blank" class="left">품질오류신고</a> <!--            <a href="http://stat.molit.go.kr/portal/quality/qualityCenterList.do?system_id=S0038" target="_blank" class="right">품질오류신고확인</a> -->
				<a
				href="https://data.molit.go.kr/systemQuality/list?system_id=S0038"
				target="_blank" class="right">품질오류신고확인</a>
			</li>
			<li><a
				href="http://www.law.go.kr/lsSc.do?menuId=0&p1=&subMenu=1&nwYn=1&section=&query=%EA%B3%B5%EA%B3%B5%EB%8D%B0%EC%9D%B4%ED%84%B0&x=0&y=0"
				target="_blank" style="">공공데이터이용정책</a></li>
		</ul>
		<p style="color: #8696A7; text-align: center; width: 100%;">문의 :
			1899-2793(내선2번)</p>
		<div class="lnbLogo">
			<img class="lnbTs" src="${contextPath}/images/etc/etc_ts.png"
				alt="logo" /> <img class="lnbSdg"
				src="${contextPath}/images/etc/etc_sdg.png" alt="title" />
		</div>
	</div>
</div>

<!-- 2차인증 팝업 -->
<div id="secondLoginPop" role="dialog" tabindex="-1"></div>
<!-- lnb end -->

<script type="text/javascript">
	var auth = "${sessionScope.userData.authorId}";
	var lBizRno = "${sessionScope.userData.bizrno}";
	
	function getGAuth2() {
		return seLogin = "${sessionScope.userData.authorLv}";
	}
</script>