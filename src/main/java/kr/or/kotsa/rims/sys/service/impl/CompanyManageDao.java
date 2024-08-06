package kr.or.kotsa.rims.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class CompanyManageDao extends CmmnAbstractMapper {

	// 주 사업자등록번호
	public String selectBrno(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.Brno", paramsMap);
	}

	// 검색/등록팝업 옵션 - 시도(전체)
	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap) {
		return selectList("sys.cmpnyManage.CtpvNm", paramsMap);
	}

	// 검색/등록팝업 옵션 - 시군구(전체)
	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap) {
		return selectList("sys.cmpnyManage.SggNm", paramsMap);
	}

	// 등록팝업 - 기본정보 (등록지역, 등록지차체)
	public Map<String, Object> selectArea(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.Area", paramsMap);
	}

	// 등록팝업 - 기본정보 (상위 사업자번호)
	public List<Map<String, Object>> selectUpBrno(Map<String, Object> paramsMap) {
		return selectList("sys.cmpnyManage.UpBrno", paramsMap);
	}
	
	// 검색옵션 - 영업상태(전체)
	public List<Map<String, Object>> searchBsnStts(Map<String, Object> paramsMap) {
		return selectList("sys.cmpnyManage.searchBsnStts", paramsMap);
	}

	// 검색옵션 - 승인상태(전체)
	public List<Map<String, Object>> selectAprvStts(Map<String, Object> paramsMap) {
		return selectList("sys.cmpnyManage.AprvStts", paramsMap);
	}
	
	// 검색옵션 - 권한(전체)
	public List<Map<String, Object>> authSelected(Map<String, Object> paramsMap) {
		return selectList("sys.cmpnyManage.authSelected", paramsMap);
	}

	// 사업자 관리 목록 카운트
	public int selectCompanyManageInfoCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.CompanyManageInfoCnt", paramsMap);
	}

	// 사업자 관리 목록 그리드
	public List<Map<String, Object>> selectCompanyManageInfo(Map<String, Object> paramsMap) {
		return selectList("sys.cmpnyManage.CompanyManageInfo", paramsMap);
	}

	// 마스터 테이블
	public Map<String, Object> selectCmpnyMasterInfo(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.CmpnyMasterInfo", paramsMap);
	}

	// 마스터 요청 테이블
	public Map<String, Object> selectCmpnyRequestInfo(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.CmpnyRequestInfo", paramsMap);
	}

	// 사업소종류 검색조건
	public List<Map<String, Object>> selectBzmnSe(Map<String, Object> paramsMap) {
		return selectList("sys.cmpnyManage.BzmnSe", paramsMap);
	}

	// 파일명
	public Map<String, Object> selectFileNm(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.FileNm", paramsMap);
	}

	// 마스터 등록
	public int insertCmpny(Map<String, Object> paramsMap) {
		return insert("sys.cmpnyManage.insertCmpny", paramsMap);
	}

	// 히스토리 등록
	public int insertCmpnyHs(Map<String, Object> paramsMap) {
		return insert("sys.cmpnyManage.insertCmpnyHs", paramsMap);
	}

	// 마스터 요청 등록
	public int insertRequestCmpny(Map<String, Object> paramsMap) {
		return insert("sys.cmpnyManage.insertRequestCmpny", paramsMap);
	}

	// 마스터 수정
	public int updateCmpny(Map<String, Object> paramsMap) {
		return update("sys.cmpnyManage.updateCmpny", paramsMap);
	}



	// agency테이블에 해당 일련번호 조회
	public Map<String, Object> choiceBrno(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.choiceBrno", paramsMap);
	}
	// openAPI를 이용한 사업자등록정보 상태 업데이트: agency 테이블
	public int updateCmpnyBrnoToAgency(Map<String, Object> paramsMap) {
		return update("sys.cmpnyManage.updateCmpnyBrnoToAgency", paramsMap);
	}

	// openAPI를 이용한 사업자등록정보 상태 업데이트: agency 테이블
	public int updateCmpnyBrnoToRequst(Map<String, Object> paramsMap) {
		return update("sys.cmpnyManage.updateCmpnyBrnoToRequst", paramsMap);
	}


	// => 사용자 중지처리
	public int cmpUserStop(Map<String, Object> paramsMap) {
		return update("sys.cmpnyManage.stopUser", paramsMap);
	}

	// 요청일련번호 조회
	public String selectDmndSn(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.DmndSn", paramsMap);
	}

	// 마스터 요청 업데이트 (반려)
	public int updateRequestCompanion(Map<String, Object> paramsMap) {
		return update("sys.cmpnyManage.updateRequestCompanion", paramsMap);
	}

	// 마스터 업데이트 (반려시)
	public int updateCmpnyCompanion(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.updateCmpnyCompanion", paramsMap);
	}

	// 마스터 요청 업데이트 (반려확인시)
	public int updateRequestCompanionChk(Map<String, Object> paramsMap) {
		return update("sys.cmpnyManage.updateRequestCompanionChk", paramsMap);
	}

	// 마스터 삭제
	public int deleteCmpny(Map<String, Object> paramsMap) {
		return update("sys.cmpnyManage.deleteCmpny", paramsMap);
	}
		
	// 마스터 요청 삭제
	public int deleteRequestCmpny(Map<String, Object> paramsMap) {
		return delete("sys.cmpnyManage.deleteRequestCmpny", paramsMap);
	}
	
	// 해당 주사업소가 가진 영업소의 갯수
	public int selectOffiSn(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.OffiSn", paramsMap);
	}

	
	/**
	 * 사업소/사용자/차량 현황 버튼
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */		
	// 사업자 현황
	public List<Map<String, Object>> selectOfficeDetailInfo(Map<String, Object> paramsMap) {
		return selectList("sys.cmpnyManage.OfficeDetailInfo", paramsMap);
	}
	// 사업자 현황 - cnt
	public int selectOfficeDetailInfoCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.OfficeDetailInfoCnt", paramsMap);
	}
	// 사용자 현황
	public List<Map<String, Object>> selectUserCmp(Map<String, Object> paramsMap) {
		return selectList("sys.cmpnyManage.UserCmp", paramsMap);
	}
	// 사용자 현황 cnt
	public int selectUserCmpCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.UserCmpCnt", paramsMap);
	}
	// 차량 현황
	public List<Map<String, Object>> findCarCmp(Map<String, Object> paramsMap) {
		return selectList("sys.cmpnyManage.findCarCmp", paramsMap);
	}
	// 차량 현황 cnt
	public int findCarCmpCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.findCarCmpCnt", paramsMap);
	}

	// 사업자 관리 목록 그리드 (엑셀다운로드)
	public List<Map<String, Object>> selectExcelDown(Map<String, Object> paramsMap) {
		return selectList("sys.cmpnyManage.excelByCompanyManageInfo", paramsMap);
	}
	// 사업자 관리 목록 카운트 (엑셀다운로드)
	public int selectExcelDownCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.excelByCompanyManageInfoCnt", paramsMap);
	}

	// 이관팝업-지자체조회
	public String selectAreaNm(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.AreaNm", paramsMap);
	}

	// 상세팝업-이관요청 여부 (요청여부)
	public int selectRequestCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.RequestCnt", paramsMap);
	}

	// 상세팝업-이관요청여부 (마스터 여부)
	public int selectCmpnyCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.CmpnyCnt", paramsMap);
	}

	// 상세팝업-이관요청 여부 (반려여부)
	public int selectCompanionCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.CompanionCnt", paramsMap);
	}
	
	// 관할지역 수정 시, 사용자 관할코드 수정
	public int updateUserCmptnc(Map<String, Object> paramsMap) {
		return update("sys.cmpnyManage.updateUserCmptnc", paramsMap);
	}

	public String selectServicekey(Map<String, Object> paramsMap) {
		return selectOne("sys.cmpnyManage.selectServicekey",paramsMap);
	}


}
