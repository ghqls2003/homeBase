package kr.or.kotsa.rims.stts.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface TotSttsService {
	/**
	 * 대여사업자 현황 그리드
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> agencyAreaGrid(Map<String, Object> paramsMap) throws RimsException;
	public List<Map<String, Object>> agencyAreaDetailGrid(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 지자체별 가입 사용자 현황 그리드
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> gvAccUserGrid(Map<String, Object> paramsMap) throws RimsException;
	public List<Map<String, Object>> gvAccUserDetailGrid(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 대여사업자 등록 현황
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> agencyAccessionChart(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 권한 가져오기
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> authrt(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 카쉐어링 업체 현황
	 * @return
	 * @throws RimsException
	 */
	public Map<String, Object> carShareGrid(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 지역 드롭다운
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> areaDrop(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 카쉐어링 업체 등록
	 * @return
	 * @throws RimsException
	 */
	public int insertCarShare(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 카쉐어링 업체 상세 팝업
	 * @return
	 * @throws RimsException
	 */
	public Map<String, Object> detailCarshare(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 카쉐어링 업체 수정
	 * @return
	 * @throws RimsException
	 */
	public int updateCarShare(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 카쉐어링 업체 삭제
	 * @return
	 * @throws RimsException
	 */
	public int deleteCarShare(Map<String, Object> paramsMap) throws RimsException;
}