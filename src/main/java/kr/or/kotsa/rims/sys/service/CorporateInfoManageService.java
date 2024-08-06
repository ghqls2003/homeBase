package kr.or.kotsa.rims.sys.service;

import java.util.List;
import java.util.Map;

public interface CorporateInfoManageService {
	
	// 기업정보관리 목록 그리드
	public Map<String, Object> selectCrprtInfo(Map<String, Object> paramsMap);
	
	// 기업사용자관리 목록 그리드
	public Map<String, Object> selectCrprtUserInfo(Map<String, Object> paramsMap);
	
	// 영업소 등록 사업자번호 중복확인
	public Map<String, Object> requestCkDuple(Map<String, Object> paramsMap);
	
	// 영업소 등록 요청
	public Map<String, Object> insertCmpnyRequest(Map<String, Object> paramsMap);
	
	// 내기업정보 수정 요청
	public Map<String, Object> updateCmpnyRequest(Map<String, Object> paramsMap);

	// 내 기업정보 수정 팝업 기존 데이터 불러오기
	public List<Map<String, Object>> callDefaultData(Map<String, Object> paramsMap);
	
	// 수정요청 승인상태
	public List<Map<String, Object>> requestAprvStts(Map<String, Object> paramsMap);
	
	// 팝업옵션 - 시도(전체)
	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap);

	// 팝업옵션 - 시군구(전체)
	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap);

	// 팝업옵션 - 사업소종류(선택)
	public List<Map<String, Object>> selectBzmnSe(Map<String, Object> paramsMap);
	
	// 팝업옵션 - 상위 사업자번호
	public List<Map<String, Object>> selectUpBrno(Map<String, Object> paramsMap);
	
	// 팝업옵션 - 영업상태(전체)
	public List<Map<String, Object>> searchBsnStts(Map<String, Object> paramsMap);
	
	// 상세보기 - 승인
	public List<Map<String, Object>> approveBtn(Map<String, Object> paramsMap);
	// 상세보기 - 반려
	public List<Map<String, Object>> rejectBtn(Map<String, Object> paramsMap);
	// 상세보기 - 장기미접속해제
	public List<Map<String, Object>> disconnBtn(Map<String, Object> paramsMap);
	// 상세보기 - 삭제
	public List<Map<String, Object>> deleteBtn(Map<String, Object> paramsMap);
}