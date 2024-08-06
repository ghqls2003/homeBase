package kr.or.kotsa.rims.vfc.service;

import java.util.List;
import java.util.Map;

public interface RntCnfCrtIsnHstrService {

	Object selectrntCnfCrtIsnHstrList(Map<String, Object> paramsMap);

	List<Map<String, Object>> selectrntCnfCrtIsnHstrListExcel(Map<String, Object> paramsMap);

	int selectrntCnfCrtIsnHstrListCnt(Map<String, Object> paramsMap);

	Object selectReIssuedData(Map<String, Object> paramsMap);

	int insertConfData(Map<String, Object> paramsMap);

	List<Map<String, Object>> selectDetailConfInfo(Map<String, Object> paramsMap);

}