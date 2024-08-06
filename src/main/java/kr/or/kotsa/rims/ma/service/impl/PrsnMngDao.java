package kr.or.kotsa.rims.ma.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
@Repository
public class PrsnMngDao extends CmmnAbstractMapper{
	// 리스트
	public List<Map<String, Object>> selectPrsnMngList(Map<String, Object> paramsMap) {
		return selectList("ma.prsnMng.prsnMngList", paramsMap);
	}
}
