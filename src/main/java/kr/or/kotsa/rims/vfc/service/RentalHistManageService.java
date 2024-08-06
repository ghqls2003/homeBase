package kr.or.kotsa.rims.vfc.service;

import java.util.List;
import java.util.Map;


public interface RentalHistManageService {

	Object selectRentalHistList(Map<String, Object> paramsMap);

	List<Map<String, Object>> selectRentalHistListEx(Map<String, Object> paramsMap);

	int selectRentalHistListCnt(Map<String, Object> paramsMap);

	Object selectCarList(Map<String, Object> paramsMap);

	int insertRentReg(Map<String, Object> paramsMap);
	
	int insertRentRegHs(Map<String, Object> paramsMap);

	/* 대여이력 상세 */
	List<Map<String, Object>> selectDetailRentInfo(Map<String, Object> paramsMap);
	
	int updateRentInfo(Map<String, Object> paramsMap);

	int insertRentInfo(Map<String, Object> paramsMap);

	int insertRentHisInfo(Map<String, Object> paramsMap);

	List<Map<String, Object>> selectIssuedData(Map<String, Object> paramsMap);

	int insertConfData(Map<String, Object> paramsMap);

	int updateDeleteYn(Map<String, Object> paramsMap);

	Map<String, Object> selectHisDetailRentInfo(Map<String, Object> paramsMap);
}