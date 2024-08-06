<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<!-- gnb start -->
<a class="map_menu_btn">MENU</a>
<div class="map_menu_wrap">
	<div class="inner">

		<c:if test="${sessionScope.menuData != null}">
			<c:forEach items="${sessionScope.menuData}" var="menu">
				<c:if test="${menu.subMenuList != null}">
					<%-- <dd style="<c:choose><c:when test="${fn:containsIgnoreCase(requestScope['javax.servlet.forward.request_uri'], menu.menuUrl)}">display:block;</c:when><c:otherwise>display:none;</c:otherwise></c:choose>"> --%>
					<ul class="lnb ${menu.subMenuList[0].upperMenuId}">
						<a href="javascript:void(0)" id="${menu.menuId}"
							data-gnb="gnb_${menu.menuId}" class="toggle_menu_dept1"> <%-- <img src="${contextPath}/images/ico/${menu.menuId}.png" alt="menu"/> --%>
							<span>${menu.menuNm}</span>
						</a>

						<c:forEach items="${menu.subMenuList}" var="subMenu">
							<li><a
								href="<c:out value='${contextPath}${subMenu.menuUrl}'/>" 
								<c:if test="${menu.menuId == 'PMNU_0600'}">
								onclick="window.open(this.href, '대쉬보드', 'width=1920px, height=2160px, scrollbars = no,location= no, toolbars= no, status= no'); return false;"
								</c:if> 
								<c:if test="${requestScope['javax.servlet.forward.request_uri'] == subMenu.menuUrl}"> class="active"</c:if>
								data-menu-id="${subMenu.menuId}" data-prv-yn="${subMenu.prvYn}">${subMenu.menuNm}</a>
							</li>
						</c:forEach>
					
					</ul>
					<%-- </dd> --%>
				</c:if>
			</c:forEach>
		</c:if>
	</div>
	<div class="login_area">
		<a href="/rms/mm/logout" class="log_btn"
			style="padding: 4px 16px; border-radius: 50px; background: #ccc; font-size: 12px; font-weight: 500; position: absolute; right: 10px; top: 10px;">로그아웃</a>
	</div>
</div>

<script>
      $(function() {
        $('.map_menu_btn').click(function() {
          $('.map_menu_btn').toggleClass('active');
          $('.map_menu_wrap').toggleClass('active');
        });
        $('html').click(function(e) {
          if (!$(e.target).is(".map_menu_btn") && !$(e.target).is(".map_menu_wrap")) {
            $('.map_menu_wrap').removeClass('active');
            $('.map_menu_btn').removeClass('active');
          }
        });
      });
    </script>
<!-- 2차인증 팝업 -->
<div id="secondLoginPop" role="dialog" tabindex="-1"></div>
<!-- gnb end -->

<script type="text/javascript">
	var auth = "${sessionScope.userData.authorId}";
	var lBizRno = "${sessionScope.userData.bizrno}";
	var sessionMenuId = "${sessionScope.userData.menuId}";
	
	function getGAuth2() {
		return seLogin = "${sessionScope.userData.authorLv}";
	}
</script>