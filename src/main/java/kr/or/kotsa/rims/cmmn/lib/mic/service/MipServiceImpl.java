package kr.or.kotsa.rims.cmmn.lib.mic.service;

import java.util.Map;
import java.util.Base64;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
@PropertySource("classpath:/egovframework/egovProps/globals.properties")
public class MipServiceImpl implements MipService {

	@Value(value="${app.sp-server}")
    private String spServer;

	/**
	 * Profile 요청
	 *
	 * @MethodName : getProfile
	 * @param trxInfoSvc 거래 & 서비스정보
	 * @return Base64로 인코딩된 Profile
	 * @throws SpException
	 */
	public String getProfile(Map<String, Object> paramsMap) {
		String resultStr = executeHttpPost(spServer + "/mip/profile", paramsMap);

		JSONParser parser = new JSONParser();
        JSONObject outputData = null;
		try {
			outputData = (JSONObject) parser.parse(resultStr);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			System.out.println("ParseException Occured");
		}

        String data = null;

		if (outputData.get("result") != null) {
			data = new String(Base64.getUrlDecoder().decode((String) outputData.get("data")));
		}

		return data;
	}

	public static String executeHttpPost(String url, Object param) {
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = null;

		try {
			response = restTemplate.postForEntity(url, param, String.class);
		} catch (RestClientException e) {
			System.out.println("RestClientException Occured");
		}

		return response.getBody();
	}
}