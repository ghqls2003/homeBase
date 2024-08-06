package kr.or.kotsa.rims.sys.service;

import java.util.Map;

public interface PermManageService {

	// 권한관리 리스트
	public Map<String, Object> selectPermManageInfo(Map<String, Object> paramsMap);

	// 포털관리메뉴 리스트 (등록팝업)
	public Map<String, Object> selectPtsMenuInfo(Map<String, Object> paramsMap);

	// 포털관리메뉴 리스트 (상세팝업)
	public Map<String, Object> selectPerDetailInfo(Map<String, Object> paramsMap);

	// 등록
	public Map<String, Object> insertAuth(Map<String, Object> paramsMap);

	// 수정
	public Map<String, Object> updateAuth(Map<String, Object> paramsMap);

	// 삭제
	public Map<String, Object> deleteAuth(Map<String, Object> paramsMap);





}