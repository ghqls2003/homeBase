package kr.or.kotsa.rims.usgStt.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class usgSttDao extends CmmnAbstractMapper {
	
	/**
     * 목록 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */

	public List<Map<String, Object>> selecthistorylistView(Map<String, Object> paramsMap) throws RimsException {
		return selectList("usgStt.usgStt.historylistView", paramsMap);
	}
	
	public int selecthistorylistViewCnt(Map<String, Object> paramsMap) {
		return selectOne("usgStt.usgStt.historylistViewCnt", paramsMap);
	}
	public List<Map<String, Object>> selectusercnctListView(Map<String, Object> paramsMap) throws RimsException {
		return selectList("usgStt.usgStt.usercnctListView", paramsMap);
	}
	
	public int selectusercnctListViewCnt(Map<String, Object> paramsMap) {
		return selectOne("usgStt.usgStt.usercnctListViewCnt", paramsMap);
	}
	public List<Map<String, Object>> selectcnctHistListView(Map<String, Object> paramsMap) throws RimsException {
		return selectList("usgStt.usgStt.cnctHistListView", paramsMap);
	}
	public int selectcnctHistListViewCnt(Map<String, Object> paramsMap) {
		return selectOne("usgStt.usgStt.cnctHistListViewCnt", paramsMap);
	}
	public List<Map<String, Object>> selectloginView(Map<String, Object> paramsMap) throws RimsException {
		return selectList("usgStt.usgStt.loginView", paramsMap);
	}
	public int selectloginViewCnt(Map<String, Object> paramsMap) {
		return selectOne("usgStt.usgStt.loginViewCnt", paramsMap);
	}

}
