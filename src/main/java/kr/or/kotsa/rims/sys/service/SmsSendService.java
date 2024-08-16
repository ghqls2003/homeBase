package kr.or.kotsa.rims.sys.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface SmsSendService {

	public Map<String, Object> selectSmsSendInfo(Map<String, Object> paramsMap);

	public List<Map<String, Object>> selectSttsCd(Map<String, Object> paramsMap);
	
	public List<Map<String, Object>> selectAuth(Map<String, Object> paramsMap);
	
	public Map<String, Object> selectReceiverList(Map<String, Object> paramsMap);

	public Map<String, Object> selectGroupReceiverList(Map<String, Object> paramsMap);

	public List<Map<String, Object>> selectCrno(Map<String, Object> paramsMap);
	
	public Map<String, Object> insertSendMsg(Map<String, Object> paramsMap);

	public Map<String, Object> selectIndivReceiverList(Map<String, Object> paramsMap);

	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap);

	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap);


}