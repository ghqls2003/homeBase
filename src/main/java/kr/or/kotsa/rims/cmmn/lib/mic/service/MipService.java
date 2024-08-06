package kr.or.kotsa.rims.cmmn.lib.mic.service;

import java.util.Map;

public interface MipService {

	/**
	 * Profile 요청
	 *
	 * @MethodName : getProfile
	 * @param trxInfoSvc 거래 & 서비스정보
	 * @return Base64로 인코딩된 Profile
	 * @throws SpException
	 */
	public String getProfile(Map<String, Object> paramsMap);

}