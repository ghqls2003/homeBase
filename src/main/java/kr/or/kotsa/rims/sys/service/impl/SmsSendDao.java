package kr.or.kotsa.rims.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.log4j.MDC;
import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class SmsSendDao extends CmmnAbstractMapper {

	public List<Map<String, Object>> selectSttsCd(Map<String, Object> paramsMap) {
		return selectList("sys.smsSend.selectSttsCd", paramsMap);
	}
	
	public List<Map<String, Object>> selectAuth(Map<String, Object> paramsMap) {
		return selectList("sys.smsSend.selectAuth", paramsMap);
	}
	
	public int selectSmsSendInfoCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.smsSend.SmsSendInfoCnt", paramsMap);
	}

	public List<Map<String, Object>> selectSmsSendInfo(Map<String, Object> paramsMap) {
		return selectList("sys.smsSend.SmsSendInfo", paramsMap);
	}
	
	public int selectReceiverListCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.smsSend.ReceiverListCnt", paramsMap);
	}

	public List<Map<String, Object>> selectReceiverList(Map<String, Object> paramsMap) {
		return selectList("sys.smsSend.ReceiverList", paramsMap);
	}

	public List<Map<String, Object>> selectGroupReceiverList(Map<String, Object> paramsMap) {
		return selectList("sys.smsSend.GroupReceiverList", paramsMap);
	}

	public int selectGroupReceiverListCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.smsSend.GroupReceiverListCnt", paramsMap);
	}

	public List<Map<String, Object>> selectCrno(Map<String, Object> paramsMap) {
		return selectList("sys.smsSend.selectCrno", paramsMap);
	}

	public int insertSendMsg(Map<String, Object> paramsMap) {
		return insert("sys.smsSend.insertSendMsg", paramsMap);
	}

	public List<Map<String, Object>> selectIndivReceiverList(Map<String, Object> paramsMap) {
		return selectList("sys.smsSend.IndivReceiverList", paramsMap);
	}

	public int selectIndivReceiverListCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.smsSend.IndivReceiverListCnt", paramsMap);
	}
	
	public int insertSendMsgList(Map<String, Object> paramsMap) {
		return insert("sys.smsSend.insertSendMsgList", paramsMap);
	}

	public List<Map<String, Object>> selectCtpvNm(Map<String, Object> paramsMap) {
		return selectList("sys.smsSend.selectCtpvNm", paramsMap);
	}

	public List<Map<String, Object>> selectSggNm(Map<String, Object> paramsMap) {
		return selectList("sys.smsSend.selectSggNm", paramsMap);
	}


	
}
