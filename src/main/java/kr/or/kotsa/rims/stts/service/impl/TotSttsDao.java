package kr.or.kotsa.rims.stts.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class TotSttsDao extends CmmnAbstractMapper {

    /**
     * 메인 지도 데이터 조회
     * @param paramsMap
     * @return List<Map<String, Object>>
     * @throws RimsException
     */
	public List<Map<String, Object>> selectMapData(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.MapData", paramsMap);
	}
	
	/**
	 * 시군구 데이터 조회
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectDetailMapData(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.DetailMapData", paramsMap);
	}
	
	/**
	 * 대여사업자 영업현황 통계
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	//(년단위)
	public List<Map<String, Object>> agencyTimeYear(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyTimeYear", paramsMap);
	}
	//(월단위)
	public List<Map<String, Object>> agencyTimeMonth(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyTimeMonth", paramsMap);
	}
	//(지역단위)
	public List<Map<String, Object>> agencyArea(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyArea", paramsMap);
	}
	
	/**
	 * 대여사업자 현황 그리드
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	// (년단위)
	public List<Map<String, Object>> agencyTimeYearGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyTimeYearGrid", paramsMap);
	}
	// (월단위)
	public List<Map<String, Object>> agencyTimeMonthGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyTimeMonthGrid", paramsMap);
	}
	// (지역단위)
	public List<Map<String, Object>> agencyAreaGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyAreaGrid", paramsMap);
	}
	public List<Map<String, Object>> agencyAreaDetailGrid(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyAreaDetailGrid", paramsMap);
	}
	
	/**
	 * 사업 개시 및 폐업 비율 통계
	 * @param paramsMap
	 * @return List<Map<String, Object>>
	 * @throws RimsException
	 */
	// (지역별)
	public List<Map<String, Object>> agencyOpenCloseChart(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyOpenCloseChart", paramsMap);
	}
	// (기간별/년도별)
	public List<Map<String, Object>> agencyOpenCloseChartPeriodYear(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyOpenCloseChartPeriodYear", paramsMap);
	}
	// (기간별/월별)
	public List<Map<String, Object>> agencyOpenCloseChartPeriod(Map<String, Object> paramsMap)throws RimsException {
		return selectList("stts.totStts.agencyOpenCloseChartPeriod", paramsMap);
	}

}
