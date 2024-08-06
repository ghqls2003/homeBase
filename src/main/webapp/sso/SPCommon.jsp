<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%

// ### PATH Setting ###
String DEFAULT_SSO_PATH="/sso";

String DEFAULT_SET_NAME="/home/tmax/webapps/tscss/WEB-INF/dreamsecurity/homepath";
String DEFAULT_SET_PATH="/WEB-INF/dreamsecurity/homepath";

// ### URL setting ###
String DEFAULT_RELAYSTATE                            = "/ma/main";
String ERROR_PAGE                                            = "/error.jsp";
String DEFAULT_BASE_URL                               = "https://rims.kotsa.or.kr"; //http://sp1.dev.com:8080
String DEFAULT_HISTORY_BACK                     = "/sso/Session-view.jsp"; // 다른 sp로 연계 실패시 돌아올 자신의 기본 URL

// String PAGE_URL_AFTER_LOGOUT               =  DEFAULT_RELAYSTATE;    // 로그아웃후 이동할 URL RelayState와 같으면 이대로 두고 다르면 URL세팅
String PAGE_URL_AFTER_LOGOUT               =  "/";    // 로그아웃후 이동할 URL RelayState와 같으면 이대로 두고 다르면 URL세팅
String ID_MAPPING_PAGE_URL = DEFAULT_SSO_PATH+"/LinkID.jsp";// 계정 연결페이지 링크

// ### Parameter setting ###
String PARAM_LOGIN_ID     = "userId";	// ID 파라미터명
String PARAM_LOGIN_PWD="userPw"; // PW 파라미터명
String TEMPLETE_PARAM_RELAYSTATE="RelayState";
String TEMPLETE_PARAM_FAILRTNURL="FailRtnUrl";

String SESSION_SSO_ID = "SSO_ID";



%>
<%!

public String XSSCheck(String value){
	if(null != value && value.trim().length()>0){
		value = value.trim();
		value = value.replaceAll("<", "&lt;");
		value = value.replaceAll(">", "&gt;");
		value = value.replaceAll("&", "&amp;");
		value = value.replaceAll("\"", "&quot;");
		value = value.replaceAll("\'", "&apos;");
	}
	return value;
}
%>
