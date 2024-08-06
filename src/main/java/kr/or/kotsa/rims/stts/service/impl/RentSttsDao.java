package kr.or.kotsa.rims.stts.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class RentSttsDao extends CmmnAbstractMapper {

    /**
     * 메인 지도 데이터 조회
     * @param paramsMap
     * @return List<Map<String, Object>>
     * @throws RimsException
     */
	public List<Map<String, Object>> selectMapData(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.rentStts.MapData", paramsMap);
	}
	
	/**
	 * 시군구 데이터 조회
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectDetailMapData(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.rentStts.DetailMapData", paramsMap);
	}
	
	/**
	 * 대여이력 차종별 통계
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	//(년단위)
	public List<Map<String, Object>> rentCarmdlTime(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.rentStts.rentCarmdlTime", paramsMap);
	}
	//(지역단위)
	public List<Map<String, Object>> rentCarmdlArea(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.rentStts.rentCarmdlArea", paramsMap);
	}
	
	/**
	 * 대여사업자 현황 그리드
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	// (년단위)
	public List<Map<String, Object>> rentHistTimeGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.rentStts.rentHistTimeGrid", paramsMap);
	}
	// (지역단위)
	public List<Map<String, Object>> rentHistGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.rentStts.rentHistGrid", paramsMap);
	}
	public List<Map<String, Object>> agencyAreaDetailGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.rentStts.agencyAreaDetailGrid", paramsMap);
	}
	
	/**
	 * 대여이력 월/기간별 통계
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	// (지역별)
	public List<Map<String, Object>> mpChartArea(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.rentStts.mpChartArea", paramsMap);
	}
	// (기간별)
	public List<Map<String, Object>> mpChartTime(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.rentStts.mpChartTime", paramsMap);
	}
}
