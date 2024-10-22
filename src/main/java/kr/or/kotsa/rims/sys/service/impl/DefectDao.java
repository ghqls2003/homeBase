package kr.or.kotsa.rims.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class DefectDao extends CmmnAbstractMapper {
	public int selectDefectInfoCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.defect.selectDefectInfoCnt", paramsMap);
	}

	public List<Map<String, Object>> selectDefectInfo(Map<String, Object> paramsMap) {
		return selectList("sys.defect.selectDefectInfo", paramsMap);
	}
	
	
	public List<Map<String, Object>> selectDefectList(Map<String, Object> paramsMap) {
		return selectList("sys.defect.selectDefectList", paramsMap);
	}
	

	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap) {
		return selectList("sys.defect.selectCtpvNm", paramsMap);
	}

	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap) {
		return selectList("sys.defect.selectSggNm", paramsMap);
	}
	

	public int selectDetailDefectInfoCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.defect.selectDetailDefectInfoCnt", paramsMap);
	}
	
	public List<Map<String, Object>> selectDetailDefectInfo(Map<String, Object> paramsMap) {
		return selectList("sys.defect.selectDetailDefectInfo", paramsMap);
	}
	
}		
