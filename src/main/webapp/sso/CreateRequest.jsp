<%@ page import="org.opensaml.saml2.core.AuthnRequest"%>
<%@ page import="com.naru.config.SSOConfig"%>
<%@ page import="com.naru.provider.ServiceProvider"%>
<%@ page import="com.naru.provider.ProviderFactory"%>
<%@ page import="java.util.Map, java.util.Iterator, java.net.URLEncoder, java.net.URL, java.net.MalformedURLException"%>
<%@ page import="com.naru.Util" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="SPCommon.jsp" %>
<%
    out.clear();
    long jstartTime = Util.getTime();
    String id = request.getSession(true).getId();
    SSOConfig.setHomeDir(this.getServletConfig().getServletContext(),DEFAULT_SET_PATH);
    ServiceProvider sp = (ServiceProvider) ProviderFactory.getProvider();
    AuthnRequest authrequest = sp.generateAuthRequest(id, SSOConfig.getApplCode());
    String relayState = XSSCheck(request.getParameter("RelayState"))==null?DEFAULT_RELAYSTATE:XSSCheck(request.getParameter("RelayState"));
    String failRtnUrl = XSSCheck(request.getParameter("FailRtnUrl"))==null?DEFAULT_BASE_URL:XSSCheck(request.getParameter("FailRtnUrl"));
    
    session.setAttribute("relayState", relayState);
    session.setAttribute("userIP", request.getRemoteAddr());
    session.setAttribute("failRtnUrl",failRtnUrl);
    
    // url 조립 - 시작
    URL relayURL;
    try
    {
        relayURL = new URL(relayState);
    }
    catch(MalformedURLException e)
    {
    	int sport = request.getServerPort();
    	if(sport == 80)
        	relayURL = new URL("http://" + request.getServerName() + relayState);
    	else
    		relayURL = new URL("http://" + request.getServerName() +":"+sport+ relayState);
    }

    Map parameterMap = request.getParameterMap();
    StringBuffer addParam = new StringBuffer();
    
        Iterator iterator = parameterMap.keySet().iterator();
        addParam.append("?");
        while(iterator.hasNext())
        {
            String name = (String) iterator.next();
            if(!name.equals(TEMPLETE_PARAM_FAILRTNURL) )
            {
                continue;
            }
            addParam.append(name).append("=").append(XSSCheck(request.getParameter(name)));
    }
    // URL 조립 - 끝
    
    relayState = URLEncoder.encode(relayURL.toString() + addParam.toString(),"UTF-8");
    
    if(authrequest != null && !"".equals(authrequest))
    {
        if(sp.redirectAuthnRequest(authrequest, response, relayState))
        {
            return;
        }
    }
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