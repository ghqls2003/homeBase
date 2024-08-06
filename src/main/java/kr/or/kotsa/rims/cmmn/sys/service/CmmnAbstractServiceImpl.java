package kr.or.kotsa.rims.cmmn.sys.service;

import static kr.or.kotsa.rims.cmmn.sys.util.CommonUtil.getXSS;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Service("myBatisSupport")
public class CmmnAbstractServiceImpl extends EgovAbstractServiceImpl {

    static final Logger logger = LoggerFactory.getLogger(CmmnAbstractServiceImpl.class);
    private static final String USER_ID = "userId";
    private static final String USER_IP = "userIp";
    private static final String AUTHOR_ID = "authorId";
    private static final String REQUST_IP = "requstIp";
    private static final String REQUST_ID = "requstId";

    private static final String USER_SN = "userSn";
    private static final String AUTHRT_CD = "authrtCd";
    private static final String CMPTNC_ZONE_CD = "cmptncZoneCd";
    private static final String BZMN_SN 	= "bzmnSn";
    private static final String UP_BZMN_SN	= "upBzmnSn";

    @Autowired(required = false)
    @Qualifier("sqlSessionTemplate")
    protected SqlSessionTemplate sqlSession;

    @Autowired(required = false)
    @Qualifier("sqlSessionTemplateMsSql")
    protected SqlSessionTemplate sqlSessionMsSql;

    @Autowired
    ApplicationContext applicationContext;

    public MyBatisTransactionManager getTransactionManager() {
        return applicationContext.getBean(MyBatisTransactionManager.class);
    }

    /**
     * 사용자 접속 IP 가져오기
     *
     * @return
     */
    protected String getClientIP() {

        HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String ip = getXSS(httpServletRequest.getHeader("X-FORWARDED-FOR"));

        if (ip == null || ip.length() == 0) {
            ip = getXSS(httpServletRequest.getHeader("Proxy-Client-IP"));
        }

        if (ip == null || ip.length() == 0) {
            ip = getXSS(httpServletRequest.getHeader("WL-Proxy-Client-IP"));  // 웹로직
        }

        if (ip == null || ip.length() == 0) {
            ip = httpServletRequest.getRemoteAddr();
        }

        return ip;
    }

    /**
     * 로그인한 사용자정보 가져오기
     *
     * @return
     */
    @SuppressWarnings("unchecked")
	protected Map<String, Object> getUserData() {

    	HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getSession();


        Map<String, Object> userMap = (Map<String, Object>) session.getAttribute("userData");

        if (userMap != null && userMap.get(USER_SN) != null) {
            return userMap;
        } else {
            return null;
        }
    }

    /**
     * 로그인한 사용자일련번호 가져오기
     *
     * @return
     */
    protected String getUserSn() {
        String userSn = "";
        Map<String, Object> userMap = getUserData();
        if (userMap != null && userMap.get(USER_SN) != null) {
            userSn = userMap.get(USER_SN).toString();
        }
        return userSn;
    }

    /**
     * 로그인한 사용자 권한코드 가져오기
     *
     * @return
     */
    protected String getAuthrtCd() {
        String authrtCd = "";
        Map<String, Object> userMap = getUserData();
        if (userMap != null && userMap.get(AUTHRT_CD) != null) {
        	authrtCd = userMap.get(AUTHRT_CD).toString();
        }
        return authrtCd;
    }

    /**
     * 로그인한 사용자 관할구역 코드 가져오기
     *
     * @return
     */
    protected String getCmptncZoneCd() {
        String cmptncZoneCd = "";

        Map<String, Object> userMap = getUserData();
        if (userMap != null && userMap.get(CMPTNC_ZONE_CD) != null) {
        	cmptncZoneCd = userMap.get(CMPTNC_ZONE_CD).toString();
            final String REGEX = "[0-9]+";

            if(!cmptncZoneCd.matches(REGEX)) {
            	String optionNum = "0000000000";
        		cmptncZoneCd = optionNum;
        	}
        }

        return cmptncZoneCd;
    }

    /**
     * 로그인한 사용자 사업자 일련번호 가져오기
     *
     * @return
     */
    protected String getBzmnSn() {
        String bzmnSn = "";
        Map<String, Object> userMap = getUserData();
        if (userMap != null && userMap.get(BZMN_SN) != null) {
        	bzmnSn = userMap.get(BZMN_SN).toString();
        }
        return bzmnSn;
    }

    /**
     * 로그인한 사용자 상위 사업자 일련번호 가져오기
     *
     * @return
     */
    protected String getUpBzmnSn() {
        String upBzmnSn = "";
        Map<String, Object> userMap = getUserData();
        if (userMap != null && userMap.get(UP_BZMN_SN) != null) {
        	upBzmnSn = userMap.get(UP_BZMN_SN).toString();
        }
        return upBzmnSn;
    }

    /**
     * 사용자 등록 IP,ID, BIZRNO, LODNGCD 등록
     *
     * @param paramsMap
     * @return
     */
    protected Map<String, Object> setUserInfoToMap(Map<String, Object> paramsMap) {

        String mUserIp = getClientIP();
        String mUserId = getUserId();
        String mAuthorId = getAuthId();

        if (paramsMap.get(AUTHOR_ID) == null || StringUtils.isEmpty(paramsMap.get(AUTHOR_ID))) {
            paramsMap.put(AUTHOR_ID, mAuthorId);
        }

        paramsMap.put(REQUST_IP, mUserIp);
        paramsMap.put(REQUST_ID, mUserId);

        paramsMap.put(USER_ID, mUserId);
        paramsMap.put(USER_IP, mUserIp);

        return paramsMap;
    }


    /**
     * 로그인한 사용자 ID 가져오기
     *
     * @return
     */
    protected String getUserId() {
        String userId = "";
        Map<String, Object> userMap = getUserData();
        if (userMap != null && userMap.get(USER_ID) != null) {
            userId = userMap.get(USER_ID).toString();
        }
        return userId;
    }

    /**
     * 로그인한 사용자 권한ID 가져오기
     *
     * @return
     */
    protected String getAuthId() {
        String authorId = "";
        Map<String, Object> userMap = getUserData();
        if (userMap != null && userMap.get(AUTHOR_ID) != null) {
            authorId = userMap.get(AUTHOR_ID).toString();
        }
        return authorId;
    }

    /**
     * SSO 연락처
     *
     * @return
     */
    protected String getSsoMbtlnum() {
        String SSO_MBTLNUM = "";
        Map<String, Object> userMap = getUserData();
        if (userMap != null && userMap.get("SSO_MBTLNUM") != null) {
        	SSO_MBTLNUM = userMap.get("SSO_MBTLNUM").toString();
        }
        return SSO_MBTLNUM != "" ? SSO_MBTLNUM : "-";
    }

    /**
     * SSO 이메일
     *
     * @return
     */
    protected String getSsoEmail() {
        String SSO_EMAIL = "";
        Map<String, Object> userMap = getUserData();
        if (userMap != null && userMap.get("SSO_EMAIL") != null) {
        	SSO_EMAIL = userMap.get("SSO_EMAIL").toString();
        }
        return SSO_EMAIL != "" ? SSO_EMAIL : "-";
    }

    /**
     * SSO 이름
     *
     * @return
     */
    protected String getSsoName() {
        String ssoUserNm = "";
        Map<String, Object> userMap = getUserData();
        if (userMap != null && userMap.get("ssoUserNm") != null) {
        	ssoUserNm = userMap.get("ssoUserNm").toString();
        }
        return ssoUserNm != "" ? ssoUserNm : "-";
    }

    /**
     * SSO 아이디
     *
     * @return
     */
    protected String getSsoId() {
        String ssoUserId = "";
        Map<String, Object> userMap = getUserData();
        if (userMap != null && userMap.get("ssoUserId") != null) {
        	ssoUserId = userMap.get("ssoUserId").toString();
        }
        return ssoUserId != "" ? ssoUserId : "-";
    }

    /**
     * 하이라키 메뉴 구조 생성
     *
     * @param menuList
     * @return
     * @throws RimsException
     */
	@SuppressWarnings("all")
	protected List<Map<String, Object>> getMenuHire(List<Map<String, Object>> menuList) throws RimsException {

		List<Map<String, Object>> mainMenuList = null;
		List<Map<String, Object>> subMenuList = null;
		List<Map<String, Object>> thrMenuList = null;

		if (menuList == null || menuList.isEmpty()) {
			return mainMenuList;
		}

		String upperMenuId = null;
		String upper2MenuId = null;

		Map<String, Object> mainMenuMap = null;
		Map<String, Object> subMenuMap = null;

		mainMenuList = new ArrayList();

		for (Map<String, Object> menuMap : menuList) {
			// 1st 메뉴
			if (menuMap.get("upperMenuId") == null || "".equals(menuMap.get("upperMenuId"))) {
				if ((mainMenuMap != null) && (mainMenuMap.size() > 0)) { // !mainMenuMap.isEmpty()) {
					if (subMenuMap != null) {
						if (thrMenuList != null) {
							subMenuMap.put("thrMenuList", thrMenuList);
						}
						// subMenuList.add(subMenuMap);
					}
					mainMenuMap.put("subMenuList", subMenuList);
					mainMenuList.add(mainMenuMap);
					subMenuList = null;
					thrMenuList = null;
				}

				mainMenuMap = new HashMap<String, Object>(menuMap);
				upperMenuId = (String) menuMap.get("menuId");
				// 2nd 메뉴
			} else if (menuMap.get("depth").equals(2)) {

				if (subMenuList == null) {
					subMenuList = new ArrayList<Map<String, Object>>();
				} else {
					if (upperMenuId.equals(menuMap.get("upperMenuId"))) {
						subMenuMap.put("thrMenuList", thrMenuList);

						thrMenuList = null;
					}
				}
				subMenuMap = new HashMap<String, Object>(menuMap);
				subMenuList.add(subMenuMap);
				upper2MenuId = (String) menuMap.get("menuId");
				// 3rd 메뉴
			} else if (menuMap.get("depth").equals(3)) {
				if (thrMenuList == null) {
					thrMenuList = new ArrayList<Map<String, Object>>();
				}

				if (upper2MenuId.equals(menuMap.get("upperMenuId"))) {
					thrMenuList.add(menuMap);
				}
			}

		}
		if (mainMenuMap != null && !mainMenuMap.isEmpty()) {
			if (subMenuList != null && !subMenuList.isEmpty()) {
				mainMenuMap.put("subMenuList", subMenuList);
			}
			mainMenuMap.put("subMenuList", subMenuList);
			mainMenuMap.put("spriteCssClass", "rootfolder");
			mainMenuList.add(mainMenuMap);
		}

		return mainMenuList;
	}
}
