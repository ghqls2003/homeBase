package kr.or.kotsa.rims.stts.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class TotSttsDao extends CmmnAbstractMapper {
	/**
	 * 대여사업자 현황 그리드
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> agencyAreaGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyAreaGrid", paramsMap);
	}
	public List<Map<String, Object>> agencyAreaDetailGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyAreaDetailGrid", paramsMap);
	}
	
	/**
	 * 대여사업자 가입 현황
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> agencyAccessionChart(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyAccessionChart", paramsMap);
	}
}
