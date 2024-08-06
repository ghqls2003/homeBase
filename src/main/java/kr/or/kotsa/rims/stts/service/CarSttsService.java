package kr.or.kotsa.rims.stts.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface CarSttsService {
	/**
	 * 대여차량 차종
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> carmdl(Map<String, Object> paramsMap) throws RimsException;
	
	/**
	 * 대여차량 연식
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> mdlyr(Map<String, Object> paramsMap) throws RimsException;

	/**
	 * 법인별 대여차량
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> crprtnData(Map<String, Object> paramsMap) throws RimsException;
	public List<Map<String, Object>> crprtnCarData(Map<String, Object> paramsMap) throws RimsException;

}