package kr.or.kotsa.rims.ma.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository("myPageDao")
public class MyPageDao extends CmmnAbstractMapper {

	/**
     * 사용자 정보 조회
     *
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	public List<Map<String, Object>> myInfo(Map<String, Object> paramsMap) {
		return selectList("myPage.myInfo", paramsMap);
	}

	public int updateMyInfo(Map<String, Object> paramsMap) {
		return update("myPage.updateMyInfo", paramsMap);
	}

	public int updateMyWithdraw(Map<String, Object> paramsMap) {
		return update("myPage.updateMyWithdraw", paramsMap);
	}

	public List<Map<String, Object>> listView(Map<String, Object> paramsMap) {
		return selectList("myPage.listView", paramsMap);
	}

	public int listViewCnt(Map<String, Object> paramsMap) {
		return selectOne("myPage.listViewCnt", paramsMap);
	}

	public List<Map<String, Object>> selectApiStts(Map<String, Object> paramsMap) {
		return selectList("myPage.selectApiStts", paramsMap);
	}

	public int updateApiKey(Map<String, Object> paramsMap) {
		return update("myPage.updateApiKey", paramsMap);
	}

	public int updateApiStts(Map<String, Object> paramsMap) {
		return update("myPage.updateApiStts", paramsMap);
	}

}
