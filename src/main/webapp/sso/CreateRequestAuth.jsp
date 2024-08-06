<%@ page import="org.opensaml.saml2.core.AuthnRequest"%>
<%@ page import="com.naru.config.SSOConfig, com.naru.provider.ServiceProvider, com.naru.provider.ProviderFactory"%>
<%@ page import="java.util.Map, java.util.Iterator, java.net.URLEncoder, java.net.URL, java.net.MalformedURLException"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="SPCommon.jsp" %>
<%
    out.clear();
    String id = request.getSession(true).getId();
    SSOConfig.setHomeDir(this.getServletConfig().getServletContext(),DEFAULT_SET_PATH);
    ServiceProvider sp = (ServiceProvider) ProviderFactory.getProvider();
    AuthnRequest authrequest = sp.generateAuthRequest(id, XSSCheck(request.getParameter(PARAM_LOGIN_ID)), XSSCheck(request.getParameter(PARAM_LOGIN_PWD)),SSOConfig.getApplCode());
    String relayState = XSSCheck(request.getParameter("RelayState"))==null? "https://www.kotsa.or.kr/mbs/inqFrmLogin.do":  XSSCheck(request.getParameter("RelayState"));
    URL relayURL;
    try
    {
        relayURL = new URL(relayState);
    }
    catch(MalformedURLException e)
    {
    	int svrport = request.getServerPort();
    	
        relayURL = new URL("http://" + request.getServerName() + relayState);
    }

    Map parameterMap = request.getParameterMap();

    StringBuffer addParam = new StringBuffer();
    
    // relayState URL 조립 : id/pw를 제외한 파라미터를 relaystate에 더함
    if(parameterMap.size()>3)
    {
        Iterator iterator = parameterMap.keySet().iterator();
        addParam.append("?");
        while(iterator.hasNext())
        {
            String name = (String) iterator.next();
            if(name.equals("RelayState") || name.equals(PARAM_LOGIN_ID) || name.equals(PARAM_LOGIN_PWD) )
            {
                continue;
            }
            addParam.append(name).append("=").append(XSSCheck(request.getParameter(name)));
            if(iterator.hasNext())
            {
                addParam.append("&");
            }
        }
    }
    relayState = URLEncoder.encode(relayURL.toString() + addParam.toString(),"UTF-8");
    session.setAttribute("relayState", relayState);
    session.setAttribute("userIP", request.getRemoteAddr());
    if(authrequest != null && !"".equals(authrequest))
    {
        response.setHeader("P3P","CP='CAO PSA CONi OTR OUR DEM ONL'");
        if(sp.redirectAuthnRequest(authrequest, response, relayState))
        {
            return;
        }
    }
    else
    {
    String base = sp.getBasePath(request);
    String errorPage = XSSCheck(base+DEFAULT_SSO_PATH+ERROR_PAGE);
%>
<html>
  <head><title>Create Request page</title></head>
  <body onload="document.form1.submit();" >
  <form name="form1" action="<%=errorPage%>" method="post">
      <input type="hidden" name="error" value="<%=sp.getErrorCode()%>">
      <input type="hidden" name="errorMsg" value="<%=sp.getErrorMsg()%>">
  </form>
  </body>
</html>
<%
    }
%>
