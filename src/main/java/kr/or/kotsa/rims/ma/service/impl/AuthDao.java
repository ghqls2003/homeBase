package kr.or.kotsa.rims.ma.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class AuthDao extends CmmnAbstractMapper {

    //시도
    public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap) {
		return selectList("ma.auth.selectCtpvNm", paramsMap);
	}

    //시군구
	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap) {
		return selectList("ma.auth.selectSggNm", paramsMap);
	}

	//회사리스트
	public List<Map<String, Object>> selectCompanyList(Map<String, Object> paramsMap) {
		return selectList("ma.auth.selectCompanyList", paramsMap);
	}

	public int selectCompanyListCnt(Map<String, Object> paramsMap) {
		return selectOne("ma.auth.selectCompanyListCnt", paramsMap);
	}

	//지자체리스트
	public List<Map<String, Object>> selectLocGovList(Map<String, Object> paramsMap) {
		return selectList("ma.auth.selectLocGovList", paramsMap);
	}

	public int selectLocGovListCnt(Map<String, Object> paramsMap) {
		return selectOne("ma.auth.selectLocGovListCnt", paramsMap);
	}

	//사업자 등록 - 사업소종류 리스트
	public List<Map<String, Object>> selectBzmnSe(Map<String, Object> paramsMap) {
		return selectList("ma.auth.selectBzmnSe", paramsMap);
	}

	//사업자 등록 - 주사무소 리스트
	public List<Map<String, Object>> selectUpBrno(Map<String, Object> paramsMap) {
		return selectList("ma.auth.selectUpBrno", paramsMap);
	}

	//사업자 등록 - 영업상태 리스트
	public List<Map<String, Object>> selectBsnStts(Map<String, Object> paramsMap) {
		return selectList("ma.auth.selectBsnStts", paramsMap);
	}

	//중복확인
	public int selectDuplicChk(Map<String, Object> paramsMap) {
		return selectOne("ma.auth.selectDuplicChk", paramsMap);
	}

	//사업자 등록
	public void insertCmpny(Map<String, Object> paramsMap) {
		insert("ma.auth.insertCmpny", paramsMap);
	}

	//신청요청
	public void insertUser(Map<String, Object> paramsMap) {
		insert("ma.auth.insertUser", paramsMap);
	}

	public void insertSso(Map<String, Object> paramsMap) {
		insert("ma.auth.insertSso", paramsMap);
	}

	public int selectUserSn(Map<String, Object> paramsMap) {
		return selectOne("ma.auth.selectUserSn", paramsMap);
	}

	//반려 후 재신청
	public void updateUser(Map<String, Object> paramsMap) {
		update("ma.auth.updateUser", paramsMap);
	}

	//기관 사업자일련번호
	public Map<String, Object> selectBzmnSn(Map<String, Object> paramsMap) {
		return selectOne("ma.auth.selectBzmnSn", paramsMap);
	}
}
