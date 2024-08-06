package kr.or.kotsa.rims.ma.service.impl;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.ma.service.LoginViewService;

@Service
public class LoginViewServiceImpl extends CmmnAbstractServiceImpl implements LoginViewService {

	private static final Logger logger = LoggerFactory.getLogger(LoginViewServiceImpl.class);

	@Autowired
	private LoginViewDao loginViewDao;

	@Override
    public Map<String, Object> selectTTUserInfo(Map<String, Object> paramsMap, HttpServletRequest httpServletRequest) throws RimsException {
        return loginViewDao.selectUserInfo(paramsMap);
	}
	
	@Override
    public Map<String, Object> selectUserInfo(Map<String, Object> paramsMap, HttpServletRequest httpServletRequest) throws RimsException {
        return loginViewDao.selectUserInfo(paramsMap);
	}
	
	// 사용자 반려사유 조회
	@Override
    public Map<String, Object> seletRjctRsn(Map<String, Object> paramsMap, HttpServletRequest httpServletRequest) throws RimsException {
        return loginViewDao.seletRjctRsn(paramsMap);
	}
	
	//반려 후 재신청
	public Object updateUserInfo(Map<String, Object> paramsMap) { 
		loginViewDao.updateUserInfo(paramsMap);
		return "success";
	}
	//6개월 초과 휴먼상태로 변경
	public Object updateAcntCd(Map<String, Object> paramsMap) {
		loginViewDao.updateAcntCd(paramsMap);
		return "success";
	}
	
	//최종로그인일시업데이트
	public Object updateLastDt(Map<String, Object> paramsMap) {
		loginViewDao.updateLastDt(paramsMap);
		return "success";
	}
	
//
//	/**
//	 * 로그인 성공시 로그처리
//	 */
//	public  Map<String, Object> insertLoginLog (Map<String, Object> paramsMap, HttpServletRequest httpServletRequest) throws HmtsException {
//		HttpServletRequest request = 
//	        ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
//	    
//	    String userAgent = request.getHeader("User-Agent");
//	    if(isMobileDevice(userAgent)) {
//	    	 paramsMap.put("deviceType", "Mobile");
//	    } else {
//	    	paramsMap.put("deviceType", "PC");
//	    }
//	    
//	    loginViewDao.insertLoginLog(paramsMap);
//        return paramsMap;
//    }
//	
//	private static boolean isMobileDevice(String userAgent){
//        String[] deviceArray = new String[]{"android", "iphone", "ipad", "blackberry", "windows phone"};
//        if (userAgent != null) {
//            userAgent = userAgent.toLowerCase();
//            for (String device : deviceArray) {
//                if (userAgent.contains(device)) {
//                    return true;  // Mobile device
//                }
//            }
//        }
//        return false;  // PC or Unknown
//    }

}
