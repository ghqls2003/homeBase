package kr.or.kotsa.rims.ma.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface PrsnMngService {

	List<Map<String, Object>> selectPrsnMngList(Map<String, Object> paramsMap) throws RimsException;
}
