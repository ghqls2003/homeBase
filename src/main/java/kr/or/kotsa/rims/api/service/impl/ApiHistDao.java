package kr.or.kotsa.rims.api.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class ApiHistDao extends CmmnAbstractMapper {
	
	/**
     * 목록 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	public List<Map<String, Object>> selectlistView(Map<String, Object> paramsMap) {
		return selectList("api.apiHist.listViewapiHist", paramsMap);
	}

	public List<Map<String, Object>> selectApiSttsView(Map<String, Object> paramsMap) {
		return selectList("api.apiHist.apiSttsView", paramsMap);
	}
	public List<Map<String, Object>> selectdetaillistView(Map<String, Object> paramsMap) {
		return selectList("api.apiHist.detaillistView", paramsMap);
	}

	public int selectdetaillistViewCnt(Map<String, Object> paramsMap) {
		return selectOne("api.apiHist.detaillistViewCnt", paramsMap);
	}
	public int selectlistViewCnt(Map<String, Object> paramsMap) {
		return selectOne("api.apiHist.listViewapiHistCnt", paramsMap);
	}
	public List<Map<String, Object>> selectlistViewapiHistDev(Map<String, Object> paramsMap) {
	return selectList("api.apiHist.listViewapiDevHist", paramsMap);
}
	public int selectlistViewapiHistDevCnt(Map<String, Object> paramsMap) {
		return selectOne("api.apiHist.listViewapiHistDevCnt", paramsMap);
	}
	public int selectApiSttsViewCnt(Map<String, Object> paramsMap) {
		return selectOne("api.apiHist.apiSttsViewCnt", paramsMap);
	}
	public int updateStopApiUse(Map<String, Object> paramsMap) {
		return update("api.apiHist.updateStopApiUse", paramsMap);
	}
	public int updateApiReUse(Map<String, Object> paramsMap) {
		return update("api.apiHist.updateApiReUse", paramsMap);
	}
	public int updateUseExtendApi(Map<String, Object> paramsMap) {
		return update("api.apiHist.updateUseExtendApi", paramsMap);
	}
	public Object ckapiList(Map<String, Object> paramsMap) {
		return selectList("api.apiHist.ckapiList", paramsMap);
	}
}
