package kr.or.kotsa.rims.stts.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class DefectSttsDao extends CmmnAbstractMapper {
	
	/**
	 * 대여차량결함 유형별 통계
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> defectCate(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.defectStts.defectCate", paramsMap);
	}
	
	/**
	 * 대여차량결함 내용별 통계
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> defectCntnt(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.defectStts.defectCntnt", paramsMap);
	}
	
	/**
	 * 대여차량 결함 현황
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> defectsData(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.defectStts.defectsData", paramsMap);
	}
	public int defectsDataCnt(Map<String, Object> paramsMap)throws RimsException {
		return selectOne("stts.defectStts.defectsDataCnt", paramsMap);
	}
}
