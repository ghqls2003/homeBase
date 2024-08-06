package kr.or.kotsa.rims.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;

@Repository
public class PermManageDao extends CmmnAbstractMapper {

	// 권한관리 리스트 카운트
	public int selectPermManageInfoCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.permManage.selectPermManageInfoCnt", paramsMap);
	}

	// 권한관리 리스트
	public List<Map<String, Object>> selectPermManageInfo(Map<String, Object> paramsMap) {
		return selectList("sys.permManage.selectPermManageInfo", paramsMap);
	}

	// 포털관리메뉴 리스트
	public List<Map<String, Object>> selectPtsMenuInfo(Map<String, Object> paramsMap) {
		return selectList("sys.permManage.selectPtsMenuInfo", paramsMap);
	}

	// 운영관리메뉴 리스트
	public List<Map<String, Object>> selectOpsMenuInfo(Map<String, Object> paramsMap) {
		return selectList("sys.permManage.selectOpsMenuInfo", paramsMap);
	}

	// 등록
	public int insertAuth(Map<String, Object> paramsMap) {
		return insert("sys.permManage.insertAuth", paramsMap);
	}

	// 권한관리-등록정보(권한id에 대한 메뉴체크등록)
	public void insertAuthMenu(Map<String, Object> paramsMap) {
		insert("sys.permManage.insertAuthMenu", paramsMap);
	}

	// 권한관리-상세정보(권한id에 대한 메뉴체크등록)
	public void updateAuthMenu(Map<String, Object> paramsMap) {
		update("sys.permManage.updateAuthMenu", paramsMap);
	}

	// 권한관리-상세정보(권한id에 대한 메뉴체크확인)
	public List<Map<String, Object>> selectAuthMenuCheck(Map<String, Object> paramsMap) {
		return selectList("sys.permManage.selectAuthMenuCheck", paramsMap);
	}

	// 권한관리-체크박스메뉴삭제(권한id에 대한 메뉴삭제)
	public int deleteAuthMenu(Map<String, Object> paramsMap) {
		return delete("sys.permManage.deleteAuthMenu", paramsMap);
	}

	// 수정
	public int updateAuth(Map<String, Object> paramsMap) {
		return update("sys.permManage.updateAuth", paramsMap);
	}

	// 삭제
	public int deleteAuth(Map<String, Object> paramsMap) {
		return update("sys.permManage.deleteAuth", paramsMap);
	}




}
