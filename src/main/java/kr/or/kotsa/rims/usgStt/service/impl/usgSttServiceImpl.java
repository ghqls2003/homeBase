package kr.or.kotsa.rims.usgStt.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.usgStt.service.usgSttService;

@Service
public class usgSttServiceImpl extends CmmnAbstractServiceImpl implements usgSttService {

	private static final Logger logger = LoggerFactory.getLogger(usgSttServiceImpl.class);

	@Autowired
	private usgSttDao usgSttDao;

	
	/**
     * 목록 조회
     * @return
     * @throws RimsException
     */
//	@Override
//	public List<Map<String, Object>> historylistView(Map<String, Object> paramsMap) throws HmtsException {
//		return usgSttDao.historylistView(paramsMap);
//	}
//	//목록 리스트
//	public Map<String, Object> historylistView(Map<String, Object> paramsMap) {
//		Map<String, Object> result = new HashMap<>();
//		List<Map<String, Object>> data = usgSttDao.historylistView(paramsMap);
//		int total = usgSttDao.historylistViewCnt(paramsMap);
//
//		result.put("data", data);
//		result.put("total", total);
//		System.out.println("papapapap -----> : " + data);
//		System.out.println("papapapap -----> : " + total);
//		return result;
//	}
	@Override
	public List<Map<String, Object>> selecthistorylistView(Map<String, Object> paramsMap) throws RimsException {
		return usgSttDao.selecthistorylistView(paramsMap);
	}

	@Override
	public int selecthistorylistViewCnt(Map<String, Object> paramsMap) throws RimsException {
		return usgSttDao.selecthistorylistViewCnt(paramsMap);
	}
	@Override
	public List<Map<String, Object>> selectusercnctListView(Map<String, Object> paramsMap) throws RimsException {
		return usgSttDao.selectusercnctListView(paramsMap);
	}

	@Override
	public int selectusercnctListViewCnt(Map<String, Object> paramsMap) throws RimsException {
		return usgSttDao.selectusercnctListViewCnt(paramsMap);
	}
	@Override
	public List<Map<String, Object>> selectcnctHistListView(Map<String, Object> paramsMap) throws RimsException {
		return usgSttDao.selectcnctHistListView(paramsMap);
	}
	
	@Override
	public int selectcnctHistListViewCnt(Map<String, Object> paramsMap) throws RimsException {
		return usgSttDao.selectcnctHistListViewCnt(paramsMap);
	}
	@Override
	public List<Map<String, Object>> selectloginView(Map<String, Object> paramsMap) throws RimsException {
		return usgSttDao.selectloginView(paramsMap);
	}
	
	@Override
	public int selectloginViewCnt(Map<String, Object> paramsMap) throws RimsException {
		return usgSttDao.selectloginViewCnt(paramsMap);
	}
	
//	public Map<String, Object> usercnctListView(Map<String, Object> paramsMap) {
//		Map<String, Object> result = new HashMap<>();
//		List<Map<String, Object>> data = usgSttDao.usercnctListView(paramsMap);
//		int total = usgSttDao.usercnctListViewCnt(paramsMap);
//		
//		result.put("data", data);
//		result.put("total", total);
//
//		return result;
//	}
//	public Map<String, Object> cnctHistListView(Map<String, Object> paramsMap) {
//		Map<String, Object> result = new HashMap<>();
//		List<Map<String, Object>> data = usgSttDao.cnctHistListView(paramsMap);
//		int total = usgSttDao.cnctHistListViewCnt(paramsMap);
//		
//		result.put("data", data);
//		result.put("total", total);
//		
//		return result;
//	}
	



}