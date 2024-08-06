package kr.or.kotsa.rims.vfc.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;

@Repository
public class RntCnfCrtIsnHstrDao extends CmmnAbstractMapper {

	public int selectrntCnfCrtIsnHstrListCnt(Map<String, Object> paramsMap) {
		return selectOne("vfc.rntCnfCrtIsnHstr.selectrntCnfCrtIsnHstrListCnt", paramsMap);
	}

	public List<Map<String, Object>> selectrntCnfCrtIsnHstrList(Map<String, Object> paramsMap) {
		return selectList("vfc.rntCnfCrtIsnHstr.selectrntCnfCrtIsnHstrList", paramsMap);
	}

	public Object selectReIssuedData(Map<String, Object> paramsMap) {
		return selectList("vfc.rntCnfCrtIsnHstr.selectReIssuedData", paramsMap);
	}

	public int insertConfData(Map<String, Object> paramsMap) {
		return insert("vfc.rntCnfCrtIsnHstr.insertConfData", paramsMap);
	}

	public List<Map<String, Object>> selectDetailConfInfo(Map<String, Object> paramsMap) {
		return selectList("vfc.rntCnfCrtIsnHstr.selectDetailConfInfo", paramsMap);
	}

}
