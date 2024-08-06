<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@page import="com.naru.config.SSOConfig"%>
<%@ page import="java.net.URLDecoder"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="javax.servlet.http.HttpSession" %>
<%@ page import="com.naru.provider.ServiceProvider"%>
<%@ page import="com.naru.provider.ProviderFactory"%>
<%@ page import="com.naru.token.SSOToken" %>
<%@ page import="com.naru.Util" %>
<%@ include file="SPCommon.jsp" %>
<%!
String rowSep = "###";
String fieldSep = "@@@";
private void setIDMapping(HttpSession httpsession){
	Object mapString = httpsession.getAttribute("ID_MAP_STR");
	if(mapString instanceof String){
		String idmapStr = (String)mapString;
		java.util.StringTokenizer st = new java.util.StringTokenizer(idmapStr,rowSep);
		while(st.hasMoreElements()){
			String token = st.nextToken();
			String[] vals = token.split(fieldSep);
			if(vals.length > 1){
				httpsession.setAttribute(vals[0]+"_ID",vals[1]);
			}
		}
		httpsession.removeAttribute("ID_MAP_STR");
	}
}
/*
private boolean checkLegcyID(HttpSession httpsession){
	String siteName = SSOConfig.getSiteName();
	Object oid = idMap.get(siteName);
	if(oid != null && (oid instanceof String) ){
		String legcyID = (String)oid;
		System.out.println(siteName+" legcyID : "+legcyID);
		if(!legcyID.trim().equals(""))
	    return true;
	}
	
	// session clear
	String ssoId = "";
	try{
		ssoId = (String)httpsession.getAttribute("SSO_ID");
		java.util.Enumeration em = httpsession.getAttributeNames();
		while(em.hasMoreElements()){
			String param = (String)em.nextElement();
			httpsession.removeAttribute(param);
		}
	}catch(Exception e){}
	httpsession.setAttribute("SSO_ID",ssoId );
	return false;
}
*/
%>
<%
    out.clear();
	long jstartTime = Util.getTime();
    Map sessionAttrMap = new HashMap();
    // ### sessionAttrMap : key=samlresponse attribute 이름 value=session에 세팅할 이름
    sessionAttrMap.put(SSOToken.PROP_NAME_ID, "SSO_ID");
    sessionAttrMap.put(SSOToken.PROP_NAME_NAME, "SSO_NAME");
    sessionAttrMap.put(SSOToken.PROP_NAME_TOKEN_VALUE, ServiceProvider.SESSION_TOKEN);
    sessionAttrMap.put("USER_PASSWORD", "USER_PASSWORD");
	sessionAttrMap.put("SSN", "SSN");
    sessionAttrMap.put("MEMBER_TYPE", "MEMBER_TYPE");
    sessionAttrMap.put("EMAIL", "EMAIL");
	sessionAttrMap.put("BRTHDY", "BRTHDY");
	sessionAttrMap.put("SOL_LUN_CD", "SOL_LUN_CD");
	sessionAttrMap.put("ZIP", "ZIP");
	sessionAttrMap.put("ADRES", "ADRES");
	sessionAttrMap.put("DETAIL_ADRES", "DETAIL_ADRES");
	sessionAttrMap.put("TELNO", "TELNO");
	sessionAttrMap.put("MBTLNUM", "MBTLNUM");
	sessionAttrMap.put("SMS_RP_YN", "SMS_RP_YN");
	sessionAttrMap.put("SEXDSTN_CD", "SEXDSTN_CD");
	sessionAttrMap.put("USER_CL", "USER_CL");
	sessionAttrMap.put("NEWS_RP_YN", "NEWS_RP_YN");
	sessionAttrMap.put("INFLOW_PATH_YN", "INFLOW_PATH_YN");
	sessionAttrMap.put("JOIN_MOTIVE_YN", "JOIN_MOTIVE_YN");
	sessionAttrMap.put("BIZRNO", "BIZRNO");
	sessionAttrMap.put("JURIRNO", "JURIRNO");
	sessionAttrMap.put("CMPNY_NM", "CMPNY_NM");
	sessionAttrMap.put("ENTRPRS_SE", "ENTRPRS_SE");
	sessionAttrMap.put("ENTRPRS_TELNO", "ENTRPRS_TELNO");
	sessionAttrMap.put("ENTRPRS_FXNUM", "ENTRPRS_FXNUM");
	sessionAttrMap.put("CHARGER_NM", "CHARGER_NM");
	sessionAttrMap.put("ENTRPRS_ZIP", "ENTRPRS_ZIP");
	sessionAttrMap.put("ENTRPRS_ADRES", "ENTRPRS_ADRES");
	sessionAttrMap.put("ENTRPRS_DETAIL_ADRES", "ENTRPRS_DETAIL_ADRES");
	sessionAttrMap.put("FRST_REGIST_ID", "FRST_REGIST_ID");
	sessionAttrMap.put("FRST_REGIST_IP", "FRST_REGIST_IP");
	sessionAttrMap.put("FRST_REGIST_DT", "FRST_REGIST_DT");
	sessionAttrMap.put("LAST_UPDT_ID", "LAST_UPDT_ID");
	sessionAttrMap.put("LAST_UPDT_IP", "LAST_UPDT_IP");
	sessionAttrMap.put("LAST_UPDT_DT", "LAST_UPDT_DT");
	sessionAttrMap.put("JOB_SE", "JOB_SE");
	sessionAttrMap.put("ENTRPRS_SCHOOL_NM", "ENTRPRS_SCHOOL_NM");
	sessionAttrMap.put("V_DISCR_NO", "V_DISCR_NO");
    sessionAttrMap.put("LASTLOGIN_TIME", "LASTLOGIN_TIME");
    sessionAttrMap.put("DI", "DI");
	sessionAttrMap.put("AREA", "AREA");
	sessionAttrMap.put("PARENT_DI", "PARENT_DI");
	sessionAttrMap.put("CAR_YN", "CAR_YN");
     
    boolean result = ((ServiceProvider) ProviderFactory.getProvider()).readResponse(request, response, sessionAttrMap);
    if(!result)
    {
        String errorPage = ERROR_PAGE;
        response.setContentType("text/html; charset=UTF-8");
        request.getRequestDispatcher(errorPage).include(request, response);
    }
    else
    {
    	setIDMapping(session);
        String relayState = URLDecoder.decode(request.getParameter(TEMPLETE_PARAM_RELAYSTATE), "UTF-8");
        /*
        if(!checkLegcyID(session)){
        	relayState = ID_MAPPING_PAGE_URL;
        }
        */
        if(relayState == null || relayState.equals(""))
        {
            //relayState = "https://www.kotsa.or.kr/mbs/inqFrmLogin.do";
// 			relayState = "https://rims2.kotsa.or.kr/ma/login";
			relayState = "https://rims.kotsa.or.kr/ma/login";
        }
        response.setContentType("text/html; charset=UTF-8");
        //if(relayState == "운전자격확인 시스템 Url"){response.sendRedirect(relayState);}else{out.println("허가되지 않은 Url입니다.");}
        //response.sendRedirect("/rims/ma/ssoLogin");
		response.sendRedirect("/ma/ssoLogin");
    }
%>