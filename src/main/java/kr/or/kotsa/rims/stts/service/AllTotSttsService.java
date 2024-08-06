package kr.or.kotsa.rims.stts.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface AllTotSttsService {

	/**
	 * 지역별 차량관련현황(Top5)
	 * @return
	 * @throws RimsException
	 */
	// 대여현황
	public List<Map<String, Object>> areaRentTop5(Map<String, Object> paramsMap) throws RimsException;
	public List<Map<String, Object>> agencyRentTop5(Map<String, Object> paramsMap) throws RimsException;  // 지자체
	// 결함현황
	public List<Map<String, Object>> areaFlawTop5(Map<String, Object> paramsMap) throws RimsException;
	public List<Map<String, Object>> agencyFlawTop5(Map<String, Object> paramsMap) throws RimsException;  // 지자체
	// 보유현황
	public List<Map<String, Object>> areaHaveTop5(Map<String, Object> paramsMap) throws RimsException;
	public List<Map<String, Object>> agencyHaveTop5(Map<String, Object> paramsMap) throws RimsException;  // 지자체
	
	/**
	 * 면허조회 결과
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> verfResult(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 최상단 대여사업자 종합 현황
	 * @return
	 * @throws RimsException
	 */
	// 대여사업자
	public List<Map<String, Object>> agencyTimeYearGrid(Map<String, Object> paramsMap) throws RimsException;
	// 정보갱신이력
	public int agencyHsGrid(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 지역 / 계절별 차량 대여 현황
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> areaSeasonRent(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 차량 결함정보 그리드
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> carDefectsInfo(Map<String, Object> paramsMap) throws RimsException;	
}