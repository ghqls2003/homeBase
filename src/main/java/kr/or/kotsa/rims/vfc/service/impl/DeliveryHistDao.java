package kr.or.kotsa.rims.vfc.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class DeliveryHistDao extends CmmnAbstractMapper {
	
	/**
     * 목록 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	public List<Map<String, Object>> listView(Map<String, Object> paramsMap) {
		return selectList("vfc.deliveryHist.listView", paramsMap);
	}

	
    /**
     * 목록 카운트 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	public int listViewCnt(Map<String, Object> paramsMap) {
		return selectOne("vfc.deliveryHist.listViewCnt", paramsMap);
	}



	/**
	 * 소속자업자명 리스트 조회
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	public Object selectCoNm(Map<String, Object> paramsMap) {
		return selectList("vfc.deliveryHist.coNmList", paramsMap);
	}


	/**
	 * 확인결과리스트
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	public Object ckResults(Map<String, Object> paramsMap) {
		return selectList("vfc.deliveryHist.ckResults", paramsMap);
	}
}
