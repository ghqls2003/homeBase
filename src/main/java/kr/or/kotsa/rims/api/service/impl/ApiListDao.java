package kr.or.kotsa.rims.api.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class ApiListDao extends CmmnAbstractMapper {
	
	/**
     * 목록 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	public List<Map<String, Object>> selectlistViewReq(Map<String, Object> paramsMap) {
		return selectList("mm.apiList.listViewReq", paramsMap);
	}
	
	public List<Map<String, Object>> selectlistViewRes(Map<String, Object> paramsMap) {
		return selectList("mm.apiList.listViewRes", paramsMap);
	}
	
	public int selectlistViewCnt(Map<String, Object> paramsMap) {
		return selectOne("mm.apiList.listViewCnt", paramsMap);
	}

//	public int listViewCnt(Map<String, Object> paramsMap) {
//		return selectOne("mm.apiList.listViewCnt", paramsMap);
//	}

//	public int updateSttCd(Map<String, Object> paramsMap) {
//		return update("mm.apiList.updateSttCd", paramsMap);
//	}
}
