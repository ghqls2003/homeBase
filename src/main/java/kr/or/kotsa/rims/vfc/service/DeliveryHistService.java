package kr.or.kotsa.rims.vfc.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface DeliveryHistService {

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
     * 소속자업자명 리스트 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    Object selectCoNm(Map<String, Object> paramsMap);

    /**
     * 현재 사용자 권한코드 조회
     * @param
     * @return
     * @throws RimsException
     */
    String curAuthrtCd();


    /**
     * 확인결과리스트
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    Object ckResults(Map<String, Object> paramsMap);
}