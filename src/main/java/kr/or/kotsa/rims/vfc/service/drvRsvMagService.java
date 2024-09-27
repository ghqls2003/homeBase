package kr.or.kotsa.rims.vfc.service;

import java.util.List;
import java.util.Map;


public interface drvRsvMagService {

	Object selectRsvList(Map<String, Object> paramsMap);
	Object selectRsvNoList(Map<String, Object> paramsMap);
	Object selectPeriodCd(Map<String, Object> paramsMap);
	Object selectLncdDrop(Map<String, Object> paramsMap);

	int insertRsv(Map<String, Object> paramsMap);
	int updateRsv(Map<String, Object> paramsMap);
	int deleteRsv(Map<String, Object> paramsMap);
	Object selectSearchRentNo(Map<String, Object> paramsMap);

	List<Map<String, Object>> selectdetailRsv(Map<String, Object> paramsMap);
	List<Map<String, Object>> selectCheckRentNo(Map<String, Object> paramsMap);

}