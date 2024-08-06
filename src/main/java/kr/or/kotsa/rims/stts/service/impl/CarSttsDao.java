package kr.or.kotsa.rims.stts.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class CarSttsDao extends CmmnAbstractMapper {
	
	/**
	 * 대여차량 차종
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> carmdl(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.carStts.carmdl", paramsMap);
	}
	
	/**
	 * 대여차량 연식
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> mdlyr(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.carStts.mdlyr", paramsMap);
	}
	
	/**
	 * 법인별 대여차량
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> crprtnData(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.carStts.crprtnData", paramsMap);
	}
	public List<Map<String, Object>> crprtnCarData(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.carStts.crprtnCarData", paramsMap);
	}
}
