<%@ page import="org.opensaml.saml2.core.LogoutRequest"%>
<%@ page import="org.opensaml.saml2.core.StatusCode"%>
<%@ page import="org.opensaml.saml2.core.LogoutResponse"%>
<%@ page import="com.naru.SAMLUtil"%>
<%@ page import="com.naru.Util"%>
<%@ page import="com.naru.provider.ServiceProvider"%>
<%@ page import="com.naru.provider.ProviderFactory"%>
<%@ page import="com.naru.provider.CommonProvider"%>
<%@ page import="com.naru.Util" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="SPCommon.jsp" %>
<%
   out.clear();
   System.out.println(" ###################### SPLogout Start  ###################### ");
    long jstartTime = Util.getTime();
    ServiceProvider sp = (ServiceProvider) ProviderFactory.getProvider();
    String samlrequest = request.getParameter(CommonProvider.TEMPLETE_PARAM_SAMLREQUEST);
    System.out.println("samlrequest : "+samlrequest);
    // IDP에서 URL api를 통해서 호출될때 수행
    if(samlrequest != null)
    {
    	System.out.println(" ### samlrequest is not null ###");
        LogoutRequest logoutRequest = sp.receiveLogoutRequest(samlrequest);
        LogoutResponse logoutResponse;
        System.out.println("logoutRequest.getNameID().getValue() : "+logoutRequest.getNameID().getValue());
        sp.logoutSession(logoutRequest.getNameID().getValue()); // 단독 로그아웃 (실제 - 사용여부 확인 필요)
        logoutResponse = sp.generateLogoutResponse(logoutRequest, StatusCode.SUCCESS_URI);
        SAMLUtil.checkAndMarshall(logoutResponse);
        System.out.println(" ### encxmlstr : "+Util.domToStr(logoutResponse.getDOM().getOwnerDocument(), false));
        String encxmlstr = Util.encode(Util.domToStr(logoutResponse.getDOM().getOwnerDocument(), false)).replace("\n", "");
        out.println(encxmlstr);
        System.out.println(Util.getProcTime("SPLogout.jsp",jstartTime));
        return;
    }
    System.out.println(" ### samlrequest is  Null ###");
    String userId = (String) session.getAttribute(SESSION_SSO_ID);

    if(userId == null)
    {
%>
<html>
  <head><title>Logout</title></head>
  <script type="text/javascript">
          /* top.location.href = 'https://rims.kotsa.or.kr/rims'; */
// 		  top.location.href = 'https://rims2.kotsa.or.kr';
		  top.location.href = 'https://rims.kotsa.or.kr';
  </script>
</html>
<%
    }
    // 1st 실행..
    else
    {
    	System.out.println(" ## Logout start when samlrequest is null ~~");
    	System.out.println(" ## userid : "+userId);
        sp.logoutSession(userId);
        LogoutRequest logoutRequest = sp.generateLogoutRequest(userId);
        // sp.redirectLogoutRequest(logoutRequest, response, "sso/SPLogout.jsp");
        try{
        	session.invalidate();
        }catch(Exception e){
        	System.out.println("Error: session already invalidated~");
        }
       	sp.redirectLogoutRequest(logoutRequest, response, PAGE_URL_AFTER_LOGOUT);  // test : sso/Session-view.jsp <- relaystate 세팅
        System.out.println(Util.getProcTime(" ######################  SPLogout.jsp",jstartTime));
        return;
    }
%>

