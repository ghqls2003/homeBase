package kr.or.kotsa.rims.vfc.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.vfc.service.RntCnfCrtIsnHstrService;

@Service
public class RntCnfCrtIsnHstrServiceImpl extends CmmnAbstractServiceImpl implements RntCnfCrtIsnHstrService {
	
	@Autowired
	private RntCnfCrtIsnHstrDao rntCnfCrtIsnHstrDao;

	@Override
	public Object selectrntCnfCrtIsnHstrList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		
		List<Map<String, Object>> list = rntCnfCrtIsnHstrDao.selectrntCnfCrtIsnHstrList(paramsMap);
		int total = rntCnfCrtIsnHstrDao.selectrntCnfCrtIsnHstrListCnt(paramsMap);
		
		result.put("data", list);
		result.put("total", total);
		return result;
	}

	@Override
	public List<Map<String, Object>> selectrntCnfCrtIsnHstrListExcel(Map<String, Object> paramsMap) {
		return rntCnfCrtIsnHstrDao.selectrntCnfCrtIsnHstrList(paramsMap);
	}

	@Override
	public int selectrntCnfCrtIsnHstrListCnt(Map<String, Object> paramsMap) {
		return rntCnfCrtIsnHstrDao.selectrntCnfCrtIsnHstrListCnt(paramsMap);
	}

	@Override
	public Object selectReIssuedData(Map<String, Object> paramsMap) {
		return rntCnfCrtIsnHstrDao.selectReIssuedData(paramsMap);
	}

	@Override
	public int insertConfData(Map<String, Object> paramsMap) {
		return rntCnfCrtIsnHstrDao.insertConfData(paramsMap);
	}

	@Override
	public List<Map<String, Object>> selectDetailConfInfo(Map<String, Object> paramsMap) {
		return rntCnfCrtIsnHstrDao.selectDetailConfInfo(paramsMap);
	}
	
	

	



}
