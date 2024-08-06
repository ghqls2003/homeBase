package kr.or.kotsa.rims.stts.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface RentSttsService {

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
	 * 대여이력 차종별 통계
	 * @return
	 * @throws RimsException
	 */
	// (년단위)
	public List<Map<String, Object>> rentCarmdlTime(Map<String, Object> paramsMap) throws RimsException;
	// (지역단위)
	public List<Map<String, Object>> rentCarmdlArea(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 대여사업자 현황 그리드
	 * @return
	 * @throws RimsException
	 */
	//(년단위)
	public List<Map<String, Object>> rentHistTimeGrid(Map<String, Object> paramsMap) throws RimsException;
	//(지역단위)
	public List<Map<String, Object>> rentHistGrid(Map<String, Object> paramsMap) throws RimsException;
	public List<Map<String, Object>> agencyAreaDetailGrid(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 대여이력 월/기간별 통계
	 * @return
	 * @throws RimsException
	 */
	// (지역별)
	public List<Map<String, Object>> mpChartArea(Map<String, Object> paramsMap) throws RimsException;
	// (기간별)
	public List<Map<String, Object>> mpChartTime(Map<String, Object> paramsMap) throws RimsException;

}