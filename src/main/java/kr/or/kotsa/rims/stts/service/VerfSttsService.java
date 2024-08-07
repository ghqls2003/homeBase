package kr.or.kotsa.rims.stts.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface VerfSttsService {
	
	/**
	 * 검증결과카운트(시간별)
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> verfCount(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 검증결과카운트(사업자별)
	 * @return
	 * @throws RimsException
	 */
	public Map<String, Object> verfResult(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 권한 드롭다운(사업자별)
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> authSelected(Map<String, Object> paramsMap) throws RimsException;
}