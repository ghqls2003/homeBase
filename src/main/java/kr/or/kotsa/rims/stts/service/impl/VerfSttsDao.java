package kr.or.kotsa.rims.stts.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class VerfSttsDao extends CmmnAbstractMapper {
	
	/**
	 * 검증결과카운트(시간별)
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> verfCount(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.verfStts.verfCount", paramsMap);
	}
	
	/**
	 * 검증결과카운트(사업자별)
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> verfResult(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.verfStts.verfResult", paramsMap);
	}
	public int verfResultCnt(Map<String, Object> paramsMap)throws RimsException {
		return selectOne("stts.verfStts.verfResultCnt", paramsMap);
	}
	
	/**
	 * 권한 드롭다운(사업자별)
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> authSelected(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.verfStts.authSelected", paramsMap);
	}
}
