package kr.or.kotsa.rims.vfc.service;

import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

import java.util.List;

public interface ContactlessVfcService {
    public List<Map<String, Object>> selectRentInfo(Map<String, Object> paramsMap) throws RimsException;

    public Map<String, Object> selectVerifyCd(Map<String, Object> paramsMap);
}