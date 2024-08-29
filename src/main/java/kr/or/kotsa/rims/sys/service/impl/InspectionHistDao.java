package kr.or.kotsa.rims.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;

@Repository
public class InspectionHistDao extends CmmnAbstractMapper {

	public List<Map<String, Object>> agencyList(Map<String, Object> paramsMap) {
		return selectList("sys.inspectionHist.AgencyList", paramsMap);
	}
	
	public List<Map<String, Object>> agencyInfo(Map<String, Object> paramsMap) {
		return selectList("sys.inspectionHist.AgencyInfo", paramsMap);
	}
	
	public int selectInspectionHistInfoCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.inspectionHist.InspectionHistInfoCnt", paramsMap);
	}

	public List<Map<String, Object>> selectInspectionHistInfo(Map<String, Object> paramsMap) {
		return selectList("sys.inspectionHist.InspectionHistInfo", paramsMap);
	}

	public int insertInspectionHist(Map<String, Object> paramsMap) {
		return insert("sys.inspectionHist.insertInspectionHist", paramsMap);
	}

	public List<Map<String, Object>> ctpvNm(Map<String, Object> paramsMap) {
		return selectList("sys.inspectionHist.CtpvNm", paramsMap);
	}

	public List<Map<String, Object>> sggNm(Map<String, Object> paramsMap) {
		return selectList("sys.inspectionHist.SggNm", paramsMap);
	}

	public List<Map<String, Object>> bsnStts(Map<String, Object> paramsMap) {
		return selectList("sys.inspectionHist.BsnStts", paramsMap);
	}

	public List<Map<String, Object>> selectAuth(Map<String, Object> paramsMap) {
		return selectList("sys.inspectionHist.selectAuth", paramsMap);
	}

	public int updateInspectionHist(Map<String, Object> paramsMap) {
		return update("sys.inspectionHist.updateInspectionHist", paramsMap);
	}

	public int updateDeleteYn(Map<String, Object> paramsMap) {
		return update("sys.inspectionHist.updateDeleteYn", paramsMap);
	}


}
