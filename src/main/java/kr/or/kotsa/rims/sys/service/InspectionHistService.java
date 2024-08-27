package kr.or.kotsa.rims.sys.service;

import java.util.List;
import java.util.Map;

public interface InspectionHistService {

	public List<Map<String, Object>> agencyList(Map<String, Object> paramsMap);
	
	public List<Map<String, Object>> agencyInfo(Map<String, Object> paramsMap);
	
	public Map<String, Object> selectInspectionHistInfo(Map<String, Object> paramsMap);

	public int insertInspectionHist(Map<String, Object> paramsMap);

	public List<Map<String, Object>> ctpvNm(Map<String, Object> paramsMap);

	public List<Map<String, Object>> sggNm(Map<String, Object> paramsMap);

	public List<Map<String, Object>> bsnStts(Map<String, Object> paramsMap);

	public List<Map<String, Object>> selectAuth(Map<String, Object> paramsMap);

	public int updateInspectionHist(Map<String, Object> paramsMap);

	public int updateDeleteYn(Map<String, Object> paramsMap);


}
 