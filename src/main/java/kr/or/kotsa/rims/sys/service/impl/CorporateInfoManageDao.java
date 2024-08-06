package kr.or.kotsa.rims.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;

@Repository
public class CorporateInfoManageDao extends CmmnAbstractMapper {
	
	// 기업정보관리 목록 그리드
	public List<Map<String, Object>> selectCrprtInfo(Map<String, Object> paramsMap) {
		return selectList("sys.crprtInfoManage.CrprtInfo", paramsMap);
	}
	// 기업정보관리 목록 카운트
	public int selectCrprtInfoCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.crprtInfoManage.CrprtInfoCnt", paramsMap);
	}

	// 기업사용자관리 목록 그리드
	public List<Map<String, Object>> selectCrprtUserInfo(Map<String, Object> paramsMap) {
		return selectList("sys.crprtInfoManage.CrprtUserInfo", paramsMap);
	}
	// 기업사용자관리 목록 카운트
	public int selectCrprtUserInfoCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.crprtInfoManage.CrprtUserInfoCnt", paramsMap);
	}
	
	// 영업소 등록 사업자번호 중복확인(요청 테이블)
	public Map<String, Object> requestCkDuple(Map<String, Object> paramsMap) {
		return selectOne("sys.crprtInfoManage.requestCkDuple", paramsMap);
	}
	// 영업소 등록 사업자번호 중복확인(마스터 테이블)
	public Map<String, Object> masterCkDuple(Map<String, Object> paramsMap) {
		return selectOne("sys.crprtInfoManage.masterCkDuple", paramsMap);
	}

	// 영업소 등록 요청(Request 테이블 insert)
	public int insertCmpnyRequest(Map<String, Object> paramsMap) {
		return insert("sys.crprtInfoManage.insertCmpnyRequest", paramsMap);
	}
	
	// 내 기업정보 수정 팝업 기존 데이터 불러오기
	public List<Map<String, Object>> callDefaultData(Map<String, Object> paramsMap) {
		return selectList("sys.crprtInfoManage.callDefaultData", paramsMap);
	}
	
	// 수정요청 승인상태확인
	public List<Map<String, Object>> requestAprvStts(Map<String, Object> paramsMap) {
		return selectList("sys.crprtInfoManage.requestAprvStts", paramsMap);
	}
	
	// 팝업옵션 - 시도(전체)
	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap) {
		return selectList("sys.crprtInfoManage.CtpvNm", paramsMap);
	}

	// 팝업옵션 - 시군구(전체)
	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap) {
		return selectList("sys.crprtInfoManage.SggNm", paramsMap);
	}
	
	// 팝업옵션 - 사업소종류(선택)
	public List<Map<String, Object>> selectBzmnSe(Map<String, Object> paramsMap) {
		return selectList("sys.crprtInfoManage.BzmnSe", paramsMap);
	}
	
	// 팝업옵션 - 상위 사업자번호
	public List<Map<String, Object>> selectUpBrno(Map<String, Object> paramsMap) {
		return selectList("sys.crprtInfoManage.UpBrno", paramsMap);
	}
	
	// 팝업옵션 - 영업상태(전체)
	public List<Map<String, Object>> searchBsnStts(Map<String, Object> paramsMap) {
		return selectList("sys.crprtInfoManage.searchBsnStts", paramsMap);
	}
	
	// 상세보기 - 승인
	public List<Map<String, Object>> approveBtn(Map<String, Object> paramsMap) {
		return selectList("sys.crprtInfoManage.approveBtn", paramsMap);
	}
	// 상세보기 - 반려
	public List<Map<String, Object>> rejectBtn(Map<String, Object> paramsMap) {
		return selectList("sys.crprtInfoManage.rejectBtn", paramsMap);
	}
	// 상세보기 - 장기미접속해제
	public List<Map<String, Object>> disconnBtn(Map<String, Object> paramsMap) {
		return selectList("sys.crprtInfoManage.disconnBtn", paramsMap);
	}
	// 상세보기 - 삭제
	public List<Map<String, Object>> deleteBtn(Map<String, Object> paramsMap) {
		return selectList("sys.crprtInfoManage.deleteBtn", paramsMap);
	}
	
	// 기업사용자관리 - 계정상태
	public List<Map<String, Object>> userAcntStts(Map<String, Object> paramsMap) {
		return selectList("sys.crprtInfoManage.userAcntStts", paramsMap);
	}
	// 기업사용자관리 - 승인상태
	public List<Map<String, Object>> userAprvStts(Map<String, Object> paramsMap) {
		return selectList("sys.crprtInfoManage.userAprvStts", paramsMap);
	}

	// 파일명
	public Map<String, Object> selectFileNm(Map<String, Object> paramsMap) {
		return selectOne("sys.crprtInfoManage.FileNm", paramsMap);
	}
}
