package kr.or.kotsa.rims.api.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class ApiManagementDao extends CmmnAbstractMapper {
	
	/**
     * 목록 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	public List<Map<String, Object>> selectlistView(Map<String, Object> paramsMap) {
		return selectList("mm.apimanagement.selectlistView", paramsMap);
	}
	public int selectlistViewCnt(Map<String, Object> paramsMap) {
		return selectOne("mm.apimanagement.selectlistViewCnt", paramsMap);
	}
	public List<Map<String, Object>> selectdetailApiList(Map<String, Object> paramsMap) {
		return selectList("mm.apimanagement.selectdetailApiList", paramsMap);
	}
	public int selectdetailApiListCnt(Map<String, Object> paramsMap) {
		return selectOne("mm.apimanagement.selectdetailApiListCnt", paramsMap);
	}
	public int updateApproveApiUse(Map<String, Object> paramsMap) {
		return update("mm.apimanagement.updateApproveApiUse", paramsMap);
	}
	public int updateRejectApiUse(Map<String, Object> paramsMap) {
		return update("mm.apimanagement.updateRejectApiUse", paramsMap);
	}
	public int updateStopApiUse(Map<String, Object> paramsMap) {
		return update("mm.apimanagement.updateStopApiUse", paramsMap);
	}
	public int updateReuseApiUse(Map<String, Object> paramsMap) {
		return update("mm.apimanagement.updateReuseApiUse", paramsMap);
	}
}
