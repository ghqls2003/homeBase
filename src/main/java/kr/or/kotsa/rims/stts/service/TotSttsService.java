package kr.or.kotsa.rims.stts.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface TotSttsService {
	/**
	 * 대여사업자 영업현황 통계
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> agencyArea(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 대여사업자 현황 그리드
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> agencyAreaGrid(Map<String, Object> paramsMap) throws RimsException;
	public List<Map<String, Object>> agencyAreaDetailGrid(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 사업 개시 및 폐업 비율 통계
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> agencyOpenCloseChart(Map<String, Object> paramsMap) throws RimsException;
}