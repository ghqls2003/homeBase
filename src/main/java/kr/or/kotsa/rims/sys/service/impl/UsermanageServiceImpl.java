package kr.or.kotsa.rims.sys.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sys.service.UsermanageService;

@Service("usermanageService")
public class UsermanageServiceImpl extends CmmnAbstractServiceImpl implements UsermanageService {

	@Resource(name = "usermanageDao")
	private UsermanageDao usermanageDao;

	@Override
	public List<Map<String, Object>> selectAuth(Map<String, Object> paramsMap) {
		return usermanageDao.selectAuth(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectSttsCd(Map<String, Object> paramsMap) {
		return usermanageDao.selectSttsCd(paramsMap);
	}

	@Override
	public int listViewCnt(Map<String, Object> paramsMap) {
		return usermanageDao.listViewCnt(paramsMap);
	}

	@Override
	public List<Map<String, Object>> listView(Map<String, Object> paramsMap) {
		return usermanageDao.listView(paramsMap);
	}

	@Override
	public int selectIdDupChk(Map<String, Object> paramsMap) {
		return usermanageDao.selectIdDupChk(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectAdminDetailInfo(Map<String, Object> paramsMap) {
		return usermanageDao.selectAdminDetailInfo(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectUserDetailInfo(Map<String, Object> paramsMap) {
		return usermanageDao.selectUserDetailInfo(paramsMap);
	}

	@Override
	public int updateDeleteUser(Map<String, Object> paramsMap) {
		return usermanageDao.updateDeleteUser(paramsMap);
	}

	@Override
	public int updateApprove(Map<String, Object> paramsMap) {
//		System.out.println("sdaffasd" + paramsMap);
		return usermanageDao.updateApprove(paramsMap);
	}

	@Override
	public int updateReject(Map<String, Object> paramsMap) {
		return usermanageDao.updateReject(paramsMap);
	}

	@Override
	public int updateLock(Map<String, Object> paramsMap) {
		if(paramsMap.get("api").equals("Y")) {
			usermanageDao.updateApiKey(paramsMap);
			usermanageDao.updateApiStts(paramsMap);
		}

		return usermanageDao.updateLock(paramsMap);
	}

	@Override
	public int updateUnlock(Map<String, Object> paramsMap) {
		return usermanageDao.updateUnlock(paramsMap);
	}

	@Override
	public int updateLongterm(Map<String, Object> paramsMap) {
		return usermanageDao.updateLongterm(paramsMap);
	}

	@Override
	public int updateReleaseStop(Map<String, Object> paramsMap) {
		return usermanageDao.updateReleaseStop(paramsMap);
	}

	@Override
	public int updateWithdraw(Map<String, Object> paramsMap) {
		return usermanageDao.updateWithdraw(paramsMap);
	}

	@Override
	public int updateAdminInfo(Map<String, Object> paramsMap) {
		return usermanageDao.updateAdminInfo(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectApiStts(Map<String, Object> paramsMap) {
		return usermanageDao.selectApiStts(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectBzmnSe(Map<String, Object> paramsMap) {
		return usermanageDao.selectBzmnSe(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap) {
		return usermanageDao.selectCtpvNm(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap) {
		return usermanageDao.selectSggNm(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectBsnStts(Map<String, Object> paramsMap) {
		return usermanageDao.selectBsnStts(paramsMap);
	}

	@Override
	public int updateUserInfo(Map<String, Object> paramsMap) {
		return usermanageDao.updateUserInfo(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectAuthrtNm(Map<String, Object> paramsMap) {
		return usermanageDao.selectAuthrtNm(paramsMap);
	}

	@Override
	public Map<String, Object> selectApproveStts(Map<String, Object> paramsMap) {
		Map<String, Object> obj = new HashMap<>();
		String aprvRjct = (String) paramsMap.get("aprvRjct");
		Map<String, Object> selectApproveStts = usermanageDao.selectApproveStts(paramsMap);


		if(paramsMap.get("authrtCd").equals("G01")) {
			obj.put("aprv_stts_cd", null);
		}
		if(selectApproveStts == null){
			obj.put("aprv_stts_cd","해당 사용자를 "+aprvRjct+"하기 전에 해당 사용자가\n소속된 기업정보가 먼저 승인되어야 합니다.");
		}else {
			String aprv_stts_cd = (String) selectApproveStts.get("aprv_stts_cd");
			obj.put("aprv_stts_cd",aprv_stts_cd);
		}
		obj.put("authrt_cd", usermanageDao.selectAuthSearch(paramsMap).get("authrt_cd"));
		return obj;
	}

	@Override
	public Map<String, Object> selectCompanyList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> list = usermanageDao.selectCompanyList(paramsMap);
		int total = usermanageDao.selectCompanyListCnt(paramsMap);

		result.put("data", list);
		result.put("total", total);
		return result;
	}


}
