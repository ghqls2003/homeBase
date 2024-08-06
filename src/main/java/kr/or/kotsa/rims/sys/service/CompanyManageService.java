package kr.or.kotsa.rims.sys.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface CompanyManageService {

	// 주 사업자등록번호
	public String selectBrno(Map<String, Object> paramsMap);

	// 검색/등록팝업 옵션 - 시도(전체)
	public List<Map<String, Object>> ctpvNm(Map<String, Object> paramsMap);

	// 검색/등록팝업 옵션 - 시군구(전체)
	public List<Map<String, Object>> sggNm(Map<String, Object> paramsMap);

	// 등록팝업 - 기본정보 (등록지역, 등록지차체)
	public Map<String, Object> area(Map<String, Object> paramsMap);

	// 등록팝업 - 기본정보 (상위 사업자번호)
	public List<Map<String, Object>> upBrno(Map<String, Object> paramsMap);

	// 검색옵션 - 승인상태(전체)
	public List<Map<String, Object>> aprvStts(Map<String, Object> paramsMap);

	// 검색옵션 - 영업상태(전체)
	public List<Map<String, Object>> searchBsnStts(Map<String, Object> paramsMap);
	
	// 검색옵션 - 권한(전체)
	public List<Map<String, Object>> authSelected(Map<String, Object> paramsMap);

	// 사업자 관리 목록 그리드
	public Map<String, Object> selectCompanyManageInfo(Map<String, Object> paramsMap);

	// 사업자 관리 상세정보
	public Map<String, Object> selectCmpnyDetailInfo(Map<String, Object> paramsMap);

	// 상세팝업옵션 - 사업소종류(선택)
	public List<Map<String, Object>> bzmnSe(Map<String, Object> paramsMap);

	// 사업자 관리 등록
	public Map<String, Object> insertCmpny(Map<String, Object> paramsMap);

	// 사업자 관리 상세팝업 수정
	public Map<String, Object> updateCmpny(List<Map<String, Object>> paramsMap);

	// 사업자 관리 상세팝업 반려
	public Map<String, Object> updateReject(Map<String, Object> paramsMap);

	// 사업자 관리 수정요청 승인
	public Map<String, Object> updateRequestApproval(Map<String, Object> paramsMap);
	
	// 사업자 관리 등록요청 승인
	public Map<String, Object> insertRequestApproval(Map<String, Object> paramsMap);

	
	/**
	 * 사업소/사용자/차량 현황 버튼
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */		
	// 사업소 현황
	public Map<String, Object> selectOfficeDetailInfo(Map<String, Object> paramsMap);
	// 사용자 현황
	public Map<String, Object> selectUserCmp(Map<String, Object> paramsMap);
	// 차량 현황
	public Map<String, Object> findCarCmp(Map<String, Object> paramsMap);

	
	// 이관팝업-지자체조회
	public String areaNm(Map<String, Object> paramsMap);

	// 이관팝업-요청
	public Map<String, Object> updateRequestTransferInfo(Map<String, Object> paramsMap);

	// 상세팝업-이관요청여부
	public int cmpnyCnt(Map<String, Object> paramsMap);

	// 상세팝업-이관요청승인
	public Map<String, Object> updateTransferRequestApproval(Map<String, Object> paramsMap);

	// 상세팝업-반려확인
	public Map<String, Object> updateRequestCompanionChk(Map<String, Object> paramsMap);

	// 상세팝업-삭제
	public Map<String, Object> deleteCmpny(Map<String, Object> paramsMap);

	// 상황별 : openAPI를 이용한 사업자등록정보 상태 업데이트
	Map<String, Object> updateCmpnyBrnoBySituation(List<Map<String, Object>> paramsMap) throws UnsupportedEncodingException;

}