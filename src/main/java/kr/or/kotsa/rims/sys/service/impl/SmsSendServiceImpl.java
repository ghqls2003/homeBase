package kr.or.kotsa.rims.sys.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sys.service.SmsSendService;

@Service
public class SmsSendServiceImpl extends CmmnAbstractServiceImpl implements SmsSendService {

	@Autowired
	private SmsSendDao smsSendDao;
	

	// 문자 발송 이력 그리드
	@Override
	public Map<String, Object> selectSmsSendInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		int total = smsSendDao.selectSmsSendInfoCnt(paramsMap);
		List<Map<String, Object>> data = smsSendDao.selectSmsSendInfo(paramsMap);
		
		result.put("total", total);
		result.put("data", data);

		return result; 
	}
	
	// 수신자 목록 그리드
	@Override
	public Map<String, Object> selectReceiverList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		int total = smsSendDao.selectReceiverListCnt(paramsMap);
		List<Map<String, Object>> data = smsSendDao.selectReceiverList(paramsMap);

		result.put("total", total);
		result.put("data", data);

		return result;
	}
	
	// 권한
	@Override
	public List<Map<String, Object>> selectAuth(Map<String, Object> paramsMap) {
		return smsSendDao.selectAuth(paramsMap);
	}

	// 그룹 발송 그리드
	@Override
	public Map<String, Object> selectGroupReceiverList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		int total = smsSendDao.selectGroupReceiverListCnt(paramsMap);
		List<Map<String, Object>> data = smsSendDao.selectGroupReceiverList(paramsMap);
		result.put("total", total);
		result.put("data", data);
		return result;
	}

	// 권한별 회사목록
	@Override
	public List<Map<String, Object>> selectCrno(Map<String, Object> paramsMap) {
		return smsSendDao.selectCrno(paramsMap);
	}

	// 문자 발송
	@Override
	@Transactional
	public Map<String, Object> insertSendMsg(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		int sms = smsSendDao.insertSendMsg(paramsMap);
		
		
		ArrayList<String> nameList = (ArrayList<String>) paramsMap.get("rcvr");
		ArrayList<String> telnoList = (ArrayList<String>) paramsMap.get("rcvr_telno");
		int smsLists = 0;
		for(int i=0; i<nameList.size(); i++) {
			paramsMap.put("rcvr", nameList.get(i));
			paramsMap.put("rcvr_telno", telnoList.get(i));
			int smsList = smsSendDao.insertSendMsgList(paramsMap);
			smsLists += smsList;
		}
		if(sms > 0 && smsLists == nameList.size()) {
			result.put("message", "문자가 발송되었습니다.");
			return result;
		}else {
			result.put("message", "에러");
			return result;
		}
	}

	// 개별 발송 그리드
	@Override
	public Map<String, Object> selectIndivReceiverList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		
		ArrayList<String> userSnList = (ArrayList<String>) paramsMap.get("user_sn");
		String userSn = userSnList.toString();
		userSn = userSn.substring(1, userSn.length() - 1);
		paramsMap.put("user_sn", userSn);
		
		int total = smsSendDao.selectIndivReceiverListCnt(paramsMap);
		List<Map<String, Object>> data = smsSendDao.selectIndivReceiverList(paramsMap);
		
		result.put("total", total);
		result.put("data", data);

		return result; 
	}
	
	

}
