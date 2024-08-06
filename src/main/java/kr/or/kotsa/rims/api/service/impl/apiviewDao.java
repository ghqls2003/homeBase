package kr.or.kotsa.rims.api.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class apiviewDao extends CmmnAbstractMapper {
	
	/**
     * 목록 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	public List<Map<String, Object>> selectlistView(Map<String, Object> paramsMap) {
		return selectList("api.apiview.listApiview", paramsMap);
	}
	public List<Map<String, Object>> selectApiSttsView(Map<String, Object> paramsMap) {
		return selectList("api.apiview.apiSttsView", paramsMap);
	}
	public List<Map<String, Object>> selectdetaillistView(Map<String, Object> paramsMap) {
		return selectList("api.apiview.detaillistView", paramsMap);
	}
	public int selectlistViewCnt(Map<String, Object> paramsMap) {
		return selectOne("api.apiview.listApiviewCnt", paramsMap);
	}
	public int selectdetaillistViewCnt(Map<String, Object> paramsMap) {
		return selectOne("api.apiview.detaillistViewCnt", paramsMap);
	}

	public int selectApiSttsViewCnt(Map<String, Object> paramsMap) {
		return selectOne("api.apiview.apiSttsViewCnt", paramsMap);
	}
//		public List<Map<String, Object>> detaillistViewCnt(Map<String, Object> paramsMap) {
//			return selectList("api.apiview.detaillistViewCnt", paramsMap);
//		
//	}
//	public List<Map<String, Object>> paramview(Map<String, Object> paramsMap) {
//		return selectList("api.apiview.paramview", paramsMap);
//	}
	public int updateStopApiUse(Map<String, Object> paramsMap) {
		return update("api.apiview.updateStopApiUse", paramsMap);
	}
	public int updateApiReUse(Map<String, Object> paramsMap) {
		return update("api.apiview.updateApiReUse", paramsMap);
	}
	public int updateUseExtendApi(Map<String, Object> paramsMap) {
		return update("api.apiview.updateUseExtendApi", paramsMap);
	}
    
}
