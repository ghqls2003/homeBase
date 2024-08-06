package kr.or.kotsa.rims.stts.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface DefectSttsService {
	/**
	 * 대여차량결함 유형별 통계
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> defectCate(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 대여차량결함 내용별 통계
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> defectCntnt(Map<String, Object> paramsMap) throws RimsException;

	/**
	 * 대여차량 결함 현황
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> defectsData(Map<String, Object> paramsMap) throws RimsException;
	public int defectsDataCnt(Map<String, Object> paramsMap) throws RimsException;

}