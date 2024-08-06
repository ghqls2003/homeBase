package kr.or.kotsa.rims.sft.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class FAQDao extends CmmnAbstractMapper {

	//FAQ 리스트
	public List<Map<String, Object>> selectFAQList(Map<String, Object> paramsMap) {
		return selectList("sft.faq.FAQList", paramsMap);
	}

	public int selectFAQListCnt(Map<String, Object> paramsMap) {
		return selectOne("sft.faq.FAQListCnt", paramsMap);
	}

}
