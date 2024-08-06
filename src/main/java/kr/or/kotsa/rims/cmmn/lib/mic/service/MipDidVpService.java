package kr.or.kotsa.rims.cmmn.lib.mic.service;

import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

public interface MipDidVpService {

	/**
	 * Profile 요청
	 *
	 * @MethodName : getProfile
	 * @param trxInfoSvc 거래 & 서비스정보
	 * @return Base64로 인코딩된 Profile
	 * @throws SpException
	 */
	public String getProfile(Map<String, Object> paramsMap);

	/**
	 * VP 검증
	 *
	 * @param mipApiData {"data":"Base64로 인코딩된 M400 메시지"}
	 * @return {"result":true}
	 * @throws ParseException
	 * @throws SpException
	 */
	public Boolean verifyVP(String trxcode, JSONObject vp);

	/**
	 * VP data 조회
	 *
	 * @MethodName : getVPData
	 * @param vp VP
	 * @throws SpException
	 */
	public Object getVPData(Map<String, Object> paramsMap);

}