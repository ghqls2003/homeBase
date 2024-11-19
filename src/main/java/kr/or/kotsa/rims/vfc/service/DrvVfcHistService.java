package kr.or.kotsa.rims.vfc.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface DrvVfcHistService {

    /**
     * 목록 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	List<Map<String, Object>> listView(Map<String, Object> paramsMap);
	
    /**
     * 목록 카운트 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	int listViewCnt(Map<String, Object> paramsMap);

    /**
     * 확인결과리스트
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    Object ckResults(Map<String, Object> paramsMap);
}