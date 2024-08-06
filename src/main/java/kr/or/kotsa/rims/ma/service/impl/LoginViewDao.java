package kr.or.kotsa.rims.ma.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class LoginViewDao extends CmmnAbstractMapper {
	
	private static final String IS_MOBILE = "MOBI";
	private static final String IS_PC = "PC";

	/**
     * 사용자 정보 조회 (개발용)
     *
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    public Map<String, Object> selectTTUserInfo(Map<String, Object> paramsMap) throws RimsException {
        return selectOne("ma.login.selectTTUserInfo", paramsMap);
    }
    
	/**
     * 사용자 정보 조회
     *
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    public Map<String, Object> selectUserInfo(Map<String, Object> paramsMap) throws RimsException {
        return selectOne("ma.login.selectUserInfo", paramsMap);
    }
    
    
    
    public int insertLoginLog(Map<String, Object> paramsMap, String userAgent, 
    		HttpServletRequest request) throws RimsException {
    	String userType = isDevice(request);
    	if(userType == "PC") {
    		paramsMap.put("deviceType", "PC");
        } else {
        	paramsMap.put("deviceType", "Mobile");
        }
        
        return insert("ma.login.insertLoginLog", paramsMap);
    }

	/*
	 * private static boolean isMobileDevice(String userAgent){ String[] deviceArray
	 * = new String[]{"android", "iphone", "ipad", "blackberry", "windows phone"};
	 * if (userAgent != null) { userAgent = userAgent.toLowerCase(); for (String
	 * device : deviceArray) { if (userAgent.contains(device)) { return true; //
	 * Mobile device } } } return false; // PC or Unknown }
	 */
    
    public static String isDevice(HttpServletRequest req) {
	    String userAgent = req.getHeader("User-Agent").toUpperCase();
	    if(userAgent.contains(IS_MOBILE) || userAgent.contains("IPAD") || 
	       (userAgent.contains("ANDROID") && !userAgent.contains("MOBILE")) || 
	       userAgent.contains("SM-T")) {
	        return IS_MOBILE;
	    } else {
	        return IS_PC;
	    }
	}

	/**
     * 사용자 반려사유 조회
     *
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    public Map<String, Object> seletRjctRsn(Map<String, Object> paramsMap) throws RimsException {
        return selectOne("ma.login.seletRjctRsn", paramsMap);
    }
    
	public void updateUserInfo(Map<String, Object> paramsMap) {
		update("ma.login.updateUserInfo", paramsMap);
	}
	//6개월 초과 휴먼상태로 변경
	public void updateAcntCd(Map<String, Object> paramsMap) {
		update("ma.login.updateAcntCd", paramsMap);
	}
	
	//최종로그인일시업데이트
	public void updateLastDt(Map<String, Object> paramsMap) {
		update("ma.login.updateLastDt", paramsMap);
	}
    
}
