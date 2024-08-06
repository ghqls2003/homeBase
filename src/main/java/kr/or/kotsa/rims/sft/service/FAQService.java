package kr.or.kotsa.rims.sft.service;

import java.util.Map;

public interface FAQService {

    //FAQ 리스트
    Map<String, Object> selectFAQList(Map<String, Object> paramsMap);

}