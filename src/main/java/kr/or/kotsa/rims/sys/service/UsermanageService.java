package kr.or.kotsa.rims.sys.service;

import java.util.List;
import java.util.Map;


public interface UsermanageService {

	List<Map<String, Object>> selectAuth(Map<String, Object> paramsMap);

	List<Map<String, Object>> selectSttsCd(Map<String, Object> paramsMap);

	int listViewCnt(Map<String, Object> paramsMap);

	List<Map<String, Object>> listView(Map<String, Object> paramsMap);

	int selectIdDupChk(Map<String, Object> paramsMap);

	List<Map<String, Object>> selectAdminDetailInfo(Map<String, Object> paramsMap);

	List<Map<String, Object>> selectUserDetailInfo(Map<String, Object> paramsMap);

	int updateDeleteUser(Map<String, Object> paramsMap);

	int updateApprove(Map<String, Object> paramsMap);

	int updateReject(Map<String, Object> paramsMap);

	int updateLock(Map<String, Object> paramsMap);

	int updateUnlock(Map<String, Object> paramsMap);

	int updateLongterm(Map<String, Object> paramsMap);

	int updateReleaseStop(Map<String, Object> paramsMap);

	int updateWithdraw(Map<String, Object> paramsMap);

	List<Map<String, Object>> selectApiStts(Map<String, Object> paramsMap);

	List<Map<String, Object>> selectBzmnSe(Map<String, Object> paramsMap);

	List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap);

	List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap);

	List<Map<String, Object>> selectBsnStts(Map<String, Object> paramsMap);

	int updateAdminInfo(Map<String, Object> paramsMap);

	int updateUserInfo(Map<String, Object> paramsMap);

	List<Map<String, Object>> selectAuthrtNm(Map<String, Object> paramsMap);

	Map<String, Object> selectApproveStts(Map<String, Object> paramsMap);

	Map<String, Object> selectCompanyList(Map<String, Object> paramsMap);

}