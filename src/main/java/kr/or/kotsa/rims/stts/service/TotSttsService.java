package kr.or.kotsa.rims.stts.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface TotSttsService {

	/**
	 * 메인지도 데이터 조회
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectMapData(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 시군구 데이터 조회
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectDetailMapData(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 대여사업자 영업현황 통계
	 * @return
	 * @throws RimsException
	 */
	// (년단위)
	public List<Map<String, Object>> agencyTimeYear(Map<String, Object> paramsMap) throws RimsException;
	// (월단위)
	public List<Map<String, Object>> agencyTimeMonth(Map<String, Object> paramsMap) throws RimsException;
	// (지역단위)
	public List<Map<String, Object>> agencyArea(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 대여사업자 현황 그리드
	 * @return
	 * @throws RimsException
	 */
	//(년단위)
	public List<Map<String, Object>> agencyTimeYearGrid(Map<String, Object> paramsMap) throws RimsException;
	//(월단위)
	public List<Map<String, Object>> agencyTimeMonthGrid(Map<String, Object> paramsMap) throws RimsException;
	//(지역단위)
	public List<Map<String, Object>> agencyAreaGrid(Map<String, Object> paramsMap) throws RimsException;
	public List<Map<String, Object>> agencyAreaDetailGrid(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 사업 개시 및 폐업 비율 통계
	 * @return
	 * @throws RimsException
	 */
	// (지역별)
	public List<Map<String, Object>> agencyOpenCloseChart(Map<String, Object> paramsMap) throws RimsException;
	// (기간별/년도별)
	public List<Map<String, Object>> agencyOpenCloseChartPeriodYear(Map<String, Object> paramsMap) throws RimsException;
	// (기간별/월별)
	public List<Map<String, Object>> agencyOpenCloseChartPeriod(Map<String, Object> paramsMap) throws RimsException;

}