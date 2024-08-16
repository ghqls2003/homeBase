package kr.or.kotsa.rims.ma.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface MainViewService {

	/**
	 * 메인지도 조회
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectShpMap(Map<String, Object> paramsMap) throws RimsException;

	/**
	 * 공지사항 조회
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> searchTopNotice(Map<String, Object> paramsMap) throws RimsException;

	/**
     * 메뉴 조회
     * @param paramsMap
     * @return
     * @throws MtisException
     */
    Map<String, Object> menuInfoList(HttpServletRequest request,Map<String, Object> paramsMap) throws RimsException;
    
    /**
     * 현재 매뉴ID 조회
     * @return
     * @throws RimsException
     */
    public String selectMenuCd(Map<String, Object> paramsMap) throws RimsException;

    /**
   	 * 메인화면 팝업 조회
     * @param authrtCd 
   	 */
   public List<Map<String, Object>> selectMainPopup(String authrtCd) throws RimsException ;

	/**
	 * api 서버 상태 조회
	 * @return
	 * @throws RimsException
	 */
   public Map<String, Object> selectSvrStat() throws RimsException ;
   
   /**
    * 개인정보보호 서약 처리
    * @param paramsMap
    * @return
    * @throws RimsException
    */
   int updateAgre(Map<String, Object> paramsMap) throws RimsException;

	/**
	 * 시간별 API 요청 건수 조회
	 * @return
	 */
	public Map<String, Object> selectStChartHour() throws RimsException;
}