package kr.or.kotsa.rims.stts.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class AllTotSttsDao extends CmmnAbstractMapper {
	
	/**
	 * 지역별 차량관련현황(Top5)
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	// 대여현황
	public List<Map<String, Object>> areaRentTop5(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.allTotStts.areaRentTop5", paramsMap);
	}
	public List<Map<String, Object>> agencyRentTop5(Map<String, Object> paramsMap)throws RimsException {  // 지자체
		return selectList("stts.allTotStts.agencyRentTop5", paramsMap);
	}
	// 결함현황
	public List<Map<String, Object>> areaFlawTop5(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.allTotStts.areaFlawTop5", paramsMap);
	}
	public List<Map<String, Object>> agencyFlawTop5(Map<String, Object> paramsMap)throws RimsException {  // 지자체
		return selectList("stts.allTotStts.agencyFlawTop5", paramsMap);
	}
	// 보유현황
	public List<Map<String, Object>> areaHaveTop5(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.allTotStts.areaHaveTop5", paramsMap);
	}
	public List<Map<String, Object>> agencyHaveTop5(Map<String, Object> paramsMap)throws RimsException {  // 지자체
		return selectList("stts.allTotStts.agencyHaveTop5", paramsMap);
	}
	
	/**
	 * 면허조회 결과
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> verfResult(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.allTotStts.verfResult", paramsMap);
	}
	
	/**
	 * 최상단 대여사업자 종합 현황
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	// 대여사업자
	public List<Map<String, Object>> agencyTimeYearGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.allTotStts.agencyTimeYearGrid", paramsMap);
	}
	// 정보갱신이력
	public int agencyHsGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectOne("stts.allTotStts.agencyHsGrid", paramsMap);
	}
	
	/**
	 * 지역 / 계절별 차량 대여 현황
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> areaSeasonRent(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.allTotStts.areaSeasonRent", paramsMap);
	}
	
	/**
	 * 차량 결함정보 그리드
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> carDefectsInfo(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.allTotStts.carDefectsInfo", paramsMap);
	}	
}
