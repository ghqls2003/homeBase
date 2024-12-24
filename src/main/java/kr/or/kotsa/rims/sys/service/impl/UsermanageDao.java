package kr.or.kotsa.rims.sys.service.impl;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;

@Repository("usermanageDao")
public class UsermanageDao extends CmmnAbstractMapper {

	public List<Map<String, Object>> selectAuth(Map<String, Object> paramsMap) {
		return selectList("usermanage.selectAuth", paramsMap);
	}

	public List<Map<String, Object>> selectSttsCd(Map<String, Object> paramsMap) {
		return selectList("usermanage.selectSttsCd", paramsMap);
	}

	public List<Map<String, Object>> listView(Map<String, Object> paramsMap) {
		return selectList("usermanage.listView", paramsMap);
	}

	public int listViewCnt(Map<String, Object> paramsMap) {
		return selectOne("usermanage.listViewCnt", paramsMap);
	}

	public int selectIdDupChk(Map<String, Object> paramsMap) {
		return selectOne("usermanage.selectIdDupChk", paramsMap);
	}

	public List<Map<String, Object>> selectAdminDetailInfo(Map<String, Object> paramsMap) {
		return selectList("usermanage.selectAdminDetailInfo", paramsMap);
	}

	public List<Map<String, Object>> selectUserDetailInfo(Map<String, Object> paramsMap) {
		return selectList("usermanage.selectUserDetailInfo", paramsMap);
	}

	public int updateDeleteUser(Map<String, Object> paramsMap) {
		return update("usermanage.updateDeleteUser", paramsMap);
	}

	public int updateApprove(Map<String, Object> paramsMap) {
		return update("usermanage.updateApprove", paramsMap);
	}

	public int updateReject(Map<String, Object> paramsMap) {
		return update("usermanage.updateReject", paramsMap);
	}

	public int updateLock(Map<String, Object> paramsMap) {
		return update("usermanage.updateLock", paramsMap);
	}

	public int updateUnlock(Map<String, Object> paramsMap) {
		return update("usermanage.updateUnlock", paramsMap);
	}

	public int updateLongterm(Map<String, Object> paramsMap) {
		return update("usermanage.updateLongterm", paramsMap);
	}

	public int updateReleaseStop(Map<String, Object> paramsMap) {
		return update("usermanage.updateReleaseStop", paramsMap);
	}

	public int updateWithdraw(Map<String, Object> paramsMap) {
		return update("usermanage.updateWithdraw", paramsMap);
	}

	public int updateAdminInfo(Map<String, Object> paramsMap) {
		return insert("usermanage.updateAdminInfo", paramsMap);
	}

	public List<Map<String, Object>> selectBzmnSe(Map<String, Object> paramsMap) {
		return selectList("usermanage.selectBzmnSe", paramsMap);
	}

	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap) {
		return selectList("usermanage.selectCtpvNm", paramsMap);
	}

	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap) {
		return selectList("usermanage.selectSggNm", paramsMap);
	}

	public List<Map<String, Object>> selectBsnStts(Map<String, Object> paramsMap) {
		return selectList("usermanage.selectBsnStts", paramsMap);
	}

	public int updateUserInfo(Map<String, Object> paramsMap) {
		return update("usermanage.updateUserInfo", paramsMap);
	}

	public List<Map<String, Object>> selectAuthrtNm(Map<String, Object> paramsMap) {
		return selectList("usermanage.selectAuthrtNm", paramsMap);
	}

	public Map<String, Object> selectApproveStts(Map<String, Object> paramsMap) {
		return selectOne("usermanage.selectApproveStts", paramsMap);
	}
	public Map<String, Object> selectAuthSearch(Map<String, Object> paramsMap) {
		return selectOne("usermanage.selectAuthSearch", paramsMap);
	}

	public List<Map<String, Object>> selectCompanyList(Map<String, Object> paramsMap) {
		return selectList("usermanage.selectCompanyList", paramsMap);
	}

	public int selectCompanyListCnt(Map<String, Object> paramsMap) {
		return selectOne("usermanage.selectCompanyListCnt", paramsMap);
	}

}
