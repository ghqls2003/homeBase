package kr.or.kotsa.rims.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;

@Repository
public class CompanyInfoUpdateHistoryDao extends CmmnAbstractMapper {

	// 검색옵션 - 시도(전체)
	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap) {
		return selectList("sys.company.selectCtpvNm", paramsMap);
	}

	// 검색옵션 - 시군구(전체)
	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap) {
		return selectList("sys.company.selectSggNm", paramsMap);
	}

	// 검색옵션 - 영업상태(전체)
	public List<Map<String, Object>> searchBsnStts(Map<String, Object> paramsMap) {
		return selectList("sys.company.searchBsnStts", paramsMap);
	}

	// 사업자 정보 갱신 이력 갯수
	public int selectCompanyHistoryInfoCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.company.selectCompanyHistoryInfoCnt", paramsMap);
	}

	// 사업자 정보 갱신 이력 그리드
	public List<Map<String, Object>> selectCompanyHistoryInfo(Map<String, Object> paramsMap) {
		return selectList("sys.company.selectCompanyHistoryInfo", paramsMap);
	}

	// 상세팝업 정보 - 수정된 갯수
	public int selectmdfCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.company.selectmdfCnt", paramsMap);
	}

	// 상세팝업 정보
	public List<Map<String, Object>> selectDetailInfo(Map<String, Object> paramsMap) {
		return selectList("sys.company.selectDetailInfo", paramsMap);
	}
}
