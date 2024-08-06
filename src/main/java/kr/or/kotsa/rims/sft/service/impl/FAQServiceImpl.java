package kr.or.kotsa.rims.sft.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sft.service.FAQService;

import java.util.*;

@Service
public class FAQServiceImpl extends CmmnAbstractServiceImpl implements FAQService {

	@Autowired
	private FAQDao faqDao;

	//FAQ리스트
	public Map<String, Object> selectFAQList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> list = faqDao.selectFAQList(paramsMap);
		int total = faqDao.selectFAQListCnt(paramsMap);

		result.put("data", list);
		result.put("total", total);
		return result;
	}

}
