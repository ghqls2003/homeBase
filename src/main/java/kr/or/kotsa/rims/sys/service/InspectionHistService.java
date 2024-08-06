package kr.or.kotsa.rims.sys.service;

import java.util.Map;

public interface InspectionHistService {

	public Map<String, Object> selectInspectionHistInfo(Map<String, Object> paramsMap);

	public int insertInspectionHist(Map<String, Object> paramsMap);

}
