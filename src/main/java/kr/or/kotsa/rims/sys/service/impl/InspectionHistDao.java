package kr.or.kotsa.rims.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;

@Repository
public class InspectionHistDao extends CmmnAbstractMapper {

	public int selectInspectionHistInfoCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.inspectionHist.InspectionHistInfoCnt", paramsMap);
	}

	public List<Map<String, Object>> selectInspectionHistInfo(Map<String, Object> paramsMap) {
		return selectList("sys.inspectionHist.InspectionHistInfo", paramsMap);
	}

	public int insertInspectionHist(Map<String, Object> paramsMap) {
		return insert("sys.inspectionHist.insertInspectionHist", paramsMap);
	}

}
