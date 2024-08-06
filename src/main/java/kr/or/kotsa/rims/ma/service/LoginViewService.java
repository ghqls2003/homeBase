package kr.or.kotsa.rims.ma.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface LoginViewService {

	/**
     * 사용자 조회 (개발용)
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    public Map<String, Object> selectTTUserInfo(Map<String, Object> paramsMap, HttpServletRequest httpServletRequest) throws RimsException;
    
	/**
     * 사용자 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    public Map<String, Object> selectUserInfo(Map<String, Object> paramsMap, HttpServletRequest httpServletRequest) throws RimsException;
    
	/**
     * 사용자 반려사유 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    public Map<String, Object> seletRjctRsn(Map<String, Object> paramsMap, HttpServletRequest httpServletRequest) throws RimsException;
    
    Object updateUserInfo(Map<String, Object> paramsMap);
    
  //6개월 초과 휴먼상태로 변경
    Object updateAcntCd(Map<String, Object> paramsMap);
    
  //최종로그인일시업데이트
    Object updateLastDt(Map<String, Object> paramsMap);
    
//    /**
//     * 사용자 조회
//     * @param paramsMap
//     * @return
//     * @throws HmtsException
//     */
//    public Map<String, Object> insertLoginLog(Map<String, Object> paramsMap, HttpServletRequest httpServletRequest) throws HmtsException;

}