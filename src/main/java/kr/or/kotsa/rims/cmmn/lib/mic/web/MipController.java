package kr.or.kotsa.rims.cmmn.lib.mic.web;

import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.kotsa.rims.cmmn.lib.mic.service.MipDidVpService;
import kr.or.kotsa.rims.vfc.service.DriveService;

import java.util.Base64;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

@SuppressWarnings("unchecked")
@RestController
@RequestMapping("/mip")
public class MipController{

	private DriveService driveService;
	private MipDidVpService mipDidVpService;

	public MipController(DriveService driveService, MipDidVpService mipDidVpService) {
		this.driveService = driveService;
		this.mipDidVpService = mipDidVpService;
	}

	/**
	 * Profile 요청
	 *
	 * @param mipApiData {"data":"Base64로 인코딩된 M310 메시지"}
	 * @return {"result":true, "data":"Base64로 인코딩된 M310 메시지"}
	 * @throws ParseException
	 * @throws SpException
	 */
	@RequestMapping("/profile")
	public Object getProfile(@RequestBody Map<String, Object> paramsMap){
		String data = new String(Base64.getUrlDecoder().decode((String) paramsMap.get("data")));

		JSONParser parser = new JSONParser();
		JSONObject m310 = null;
		try {
			m310 = (JSONObject) parser.parse(data);
		} catch (ParseException e) { // TODO Auto-generated catch block
			System.out.println("ParserException Occured");
		}

		String profile = driveService.getProfile(m310);
		m310.put("profile", profile);

		paramsMap.put("result", true);
		paramsMap.put("data", Base64.getUrlEncoder().withoutPadding().encodeToString(m310.toString().getBytes()));

		return paramsMap;
	}

	/**
	 * VP 검증
	 *
	 * @param mipApiData {"data":"Base64로 인코딩된 M400 메시지"}
	 * @return {"result":true}
	 * @throws ParseException
	 * @throws SpException
	 */
	@RequestMapping("/vp")
	public Map<String, Object> verifyVP(@RequestBody Map<String, Object> paramsMap) throws ParseException {
		String data = new String(Base64.getUrlDecoder().decode((String) paramsMap.get("data")));

		JSONParser parser = new JSONParser();
        JSONObject m400 = (JSONObject) parser.parse(data);

        driveService.verifyVP(m400);

		paramsMap.put("result", true);

		return paramsMap;
	}

	/**
	 * 오류 전송
	 *
	 * @param mipApiData {"data":"Base64로 인코딩된 오류 메시지"}
	 * @return {"result":true}
	 * @throws ParseException
	 * @throws SpException
	 */
	@RequestMapping("/error")
	public Object sendError(@RequestBody Map<String, Object> paramsMap) throws ParseException {
		String data = new String(Base64.getUrlDecoder().decode((String) paramsMap.get("data")));

		JSONParser parser = new JSONParser();
        JSONObject m900 = (JSONObject) parser.parse(data);

        driveService.sendError(m900);

		paramsMap.put("result", true);

		return paramsMap;
	}

	/**
	 * VP data 조회
	 *
	 * @param mipApiData {"data":"base64로 인코딩된 VP"}
	 * @return {"result":true, "data":"base64로 인코딩된 VP data"}
	 * @throws SpException
	 */
	@RequestMapping("/vpdata")
	public Object getVPData(@RequestBody Map<String, Object> paramsMap) throws ParseException {
		return mipDidVpService.getVPData(paramsMap);
	}

}