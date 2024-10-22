package kr.or.kotsa.rims.vfc.service;

import java.util.List;
import java.util.Map;

public interface RentIdpService {
	
	Object selectRentIdpList(Map<String, Object> paramsMap);
	
	List<Map<String, Object>> selectDetailRentInfo(Map<String, Object> paramsMap);
	
	int updateRentInfo(Map<String, Object> paramsMap);
	
	Object selectCarList(Map<String, Object> paramsMap);
	
	int updateDeleteYn(Map<String, Object> paramsMap);
	
	int insertRentReg(Map<String, Object> paramsMap);
	
	int insertConfData(Map<String, Object> paramsMap);
}
