package kr.or.kotsa.rims.ma.service;

import java.util.List;
import java.util.Map;

public interface AuthService {

    //시도
    List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap);

  	//시군구
    List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap);

    //회사리스트
    Map<String, Object> selectCompanyList(Map<String, Object> paramsMap);

 	//지자체리스트
	Map<String, Object> selectLocGovList(Map<String, Object> paramsMap);

	//사업자 등록 - 사업소종류 리스트
	List<Map<String, Object>> selectBzmnSe(Map<String, Object> paramsMap);

	//사업자 등록 - 주사무소 리스트
	List<Map<String, Object>> selectUpBrno(Map<String, Object> paramsMap);

	//사업자 등록 - 영업상태 리스트
	List<Map<String, Object>> selectBsnStts(Map<String, Object> paramsMap);

	//중복확인
	Object selectDuplicChk(Map<String, Object> paramsMap);

	//사업자 등록
	Object insertCmpny(Map<String, Object> paramsMap);

	//신청요청
	Object insertUser(Map<String, Object> paramsMap);

	//반려 후 재신청
	Object updateUser(Map<String, Object> paramsMap);

	//기관 사업자일련번호
	Map<String, Object> selectBzmnSn(Map<String, Object> paramsMap);

}