package kr.or.kotsa.rims.sys.service;

import java.util.List;
import java.util.Map;

public interface CompanyInfoUpdateHistoryService {

	// 검색옵션 - 시도(전체)
	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap);

	// 검색옵션 - 시군구(전체)
	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap);

	// 검색옵션 - 영업상태(전체)
	public List<Map<String, Object>> searchBsnStts(Map<String, Object> paramsMap);

	// 사업자 정보 갱신 이력 그리드
	public Map<String, Object> selectCompanyHistoryInfo(Map<String, Object> paramsMap);

	// 상세팝업 정보
	public Map<String, Object> selectDetailInfo(Map<String, Object> paramsMap);
}