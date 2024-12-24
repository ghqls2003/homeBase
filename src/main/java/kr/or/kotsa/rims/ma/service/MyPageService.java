package kr.or.kotsa.rims.ma.service;


import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface MyPageService {

	/**
     * 사용자 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	public List<Map<String, Object>> myInfo(Map<String, Object> paramsMap);

	public int updateMyInfo(Map<String, Object> paramsMap);

	public int updateMyWithdraw(Map<String, Object> paramsMap);

	public List<Map<String, Object>> listView(Map<String, Object> paramsMap);

	public int listViewCnt(Map<String, Object> paramsMap);

}