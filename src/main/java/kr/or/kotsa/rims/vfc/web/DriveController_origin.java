package kr.or.kotsa.rims.vfc.web;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.htrace.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.JSONObject;
import org.sonar.api.internal.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.vfc.service.DriveService;

@Controller
@PropertySource("classpath:/egovframework/egovProps/globals.properties")
@RequestMapping("vfc")
public class DriveController_origin extends CmmnAbstractServiceImpl {
	@Autowired
	private DriveService driveService;

	@Autowired
	private CmmnService cmmnService;

	@Value("${Globals.verifyLicense}")
	private String verifyLicense;

	@Value("${Globals.secreKeyHeader}")
	private String secreKeyHeader;

	@Value("${Globals.secreKeyValue}")
	private String secreKeyValue;

	private static final String IS_MOBILE = "MOBI";
	private static final String IS_PC = "PC";
	private static boolean IS_MW = false;

	private String poket;

	/**
	 * 자격검증 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/drive")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
								 HttpServletRequest request, HttpServletResponse response) throws RimsException {



		String userType = isDevice(request);
		boolean userTypeDetail = isAccMthd(request);
		Boolean userTypeBool = true;
		Boolean userOperSystemBool = true;
		
		if(userType == "MOBI") {
			userTypeBool = false;
			String userOperSystem = getOperatingSystem(request);
			if(userOperSystem == "iOS") {
				userOperSystemBool = false;
			}
		}


		paramsMap.put("url", "vfc/drive");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName",tableName);


		mav.addObject("userType", userType);
		mav.addObject("userTypeDetail", userTypeDetail);
		mav.addObject("userTypeBool", userTypeBool);
		mav.addObject("userOperSystemBool", userOperSystemBool);
		mav.addObject("authrtCd", getAuthrtCd());
		mav.setViewName("vfc/drive");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	public static String isDevice(HttpServletRequest req) {
		String userAgent = req.getHeader("User-Agent").toUpperCase();
		if(userAgent.contains(IS_MOBILE) || userAgent.contains("IPAD") ||
				(userAgent.contains("ANDROID") && !userAgent.contains("MOBILE")) ||
				userAgent.contains("SM-T")) {
			return IS_MOBILE;
		} else {
			return IS_PC;
		}
	}
	
	public static boolean isAccMthd(HttpServletRequest req) {
		String userAgent = req.getHeader("User-Agent").toUpperCase();
		System.out.println("뭐야"+userAgent);
		if(userAgent.contains("INRIMSAPP")) {
			return IS_MW;
		} else {
			return true;
		}
	}

	public static String getOperatingSystem(HttpServletRequest req) {
		String userAgent = req.getHeader("User-Agent").toUpperCase();

		if (userAgent.contains("IPHONE") || userAgent.contains("IPAD") || userAgent.contains("IPOD") || userAgent.contains("MAC OS")) {
			return "iOS";
		} else {
			return "Android";
		}
	}

	/**
	 * 법인번호 조회
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("drive/selectCrno")
	@ResponseBody
	public Object Crno(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return driveService.selectCrno(paramsMap);
	}

	/**
	 * 차량정보 조회
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("drive/selectCarList")
	@ResponseBody
	public Object CarList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("userSn", getUserSn());
		return driveService.selectCarList(paramsMap);
	}

	/**
	 * 운전자격 확인 코드
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("drive/selectVerifyCd")
	@ResponseBody
	public Object selectVerifyCd(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return driveService.selectVerifyCd(paramsMap);
	}

	/**
	 * 대여처리
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("drive/updateRentSttsCd")
	@ResponseBody
	public String updateRentSttsCd(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return driveService.updateRentSttsCd(paramsMap);
	}

	/**
	 * 지역 코드
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("drive/selectAreaCd")
	@ResponseBody
	public Object AreaCd(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return driveService.selectAreaCd(paramsMap);
	}

	/** URL Connection SSL ignore **/
	public static TrustManager[] createTrustManagers() {
		TrustManager[] trustAllCerts = new TrustManager[]{ new X509TrustManager() {
			public void checkClientTrusted(java.security.cert.X509Certificate[] x509Certificates, String s) { }
			public void checkServerTrusted(java.security.cert.X509Certificate[] x509Certificates, String s) { }
			public java.security.cert.X509Certificate[] getAcceptedIssuers() { return new java.security.cert.X509Certificate[]{}; }
		}};

		return trustAllCerts;
	}

	/**
	 * 운전자격 확인
	 * @param paramsMap
	 * @param request
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("drive/verifyLicense")
	@ResponseBody
	public Map<String,Object> verifyLicense(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request) throws IOException {
//		String response = "";
		Map<String,Object> response = new HashMap<>();
		Map<String,Object> resultMap = new HashMap<>();
		String f_rtn_cd ="";
		String userType = isDevice(request);
		if(userType == "MOBI") {
			poket = "2";
		} else {
			poket = "1";
		}

		String encoded = URLEncoder.encode(poket, "UTF-8");
		String encodeName = null;

		try {
			encodeName = URLEncoder.encode(paramsMap.get("name").toString(), "UTF-8");
		} catch(UnsupportedEncodingException e) {
			System.out.printf("UnsupportedEncodingException Occured");
		}

		try {
			//ssl연결을 설정
			SSLContext sc = SSLContext.getInstance("SSL");
			sc.init(null, createTrustManagers(), new java.security.SecureRandom());
			HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory()); // ssl 을 연결하기 위한 소캣팩토리를 설정한다.
			HostnameVerifier allHostsValid = (hostname, session) -> true;  //hostname,ssssion값이 무엇이든 true 로 설정하여 모든값에 대해 허용
			HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
		} catch (NoSuchAlgorithmException e) {
			System.out.println("알고리즘을 찾을 수 없습니다.");
		} catch (KeyManagementException e) {
			System.out.println("키 관리 예외가 발생했습니다.");
		} catch (Exception e) {
			System.out.println("운전자격 검증 중 예상치 못한 예외가 발생했습니다.");
		}

		String verifyUrl = verifyLicense + "/drvAuth?f_license_no=" + paramsMap.get("num").toString() +
				"&f_resident_name=" + encodeName + "&f_licn_con_code=" + paramsMap.get("type").toString() +
				"&f_vrfc_mthd=" + paramsMap.get("vrfcMthd").toString() +
				"&f_from_date=" + paramsMap.get("startDt").toString() + "&f_to_date=" + paramsMap.get("endDt").toString() +
				"&user_sn=" + getUserSn() + "&userType=" + encoded;

		HttpURLConnection connection = null;

		try {
			URL url = new URL(verifyUrl);
			connection = (HttpURLConnection) url.openConnection();

			connection.setRequestProperty(secreKeyHeader, secreKeyValue);

			try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
				StringBuffer stringBuffer = new StringBuffer();
				String inputLine;

				while ((inputLine = bufferedReader.readLine()) != null) {
					stringBuffer.append(inputLine);
					String data = stringBuffer.toString();
					// JsonPasing
					ObjectMapper objectMapper = new ObjectMapper();
					resultMap = objectMapper.readValue(data, Map.class);
					Map<String,Object> header = new HashMap<>();
					f_rtn_cd = (String) ((Map<String, Object>) resultMap.get("header")).get("f_rtn_cd");
					f_rtn_cd = String.format("%02d",Integer.parseInt(f_rtn_cd));
					// vrfcRslt의 해당 코드에 대한 공통코드 테이블에서 코드명 가져오기
					if(f_rtn_cd != "01" && f_rtn_cd != "00"){

						//02 -> 03 실패코드로 처리하기로함  ---
						if(f_rtn_cd =="02"){
							f_rtn_cd = "03";
						}
					paramsMap.put("fRtnCd",f_rtn_cd);
					String vrfcRsltMsg = (String)  driveService.getRtnMsg(paramsMap).get(0).get("cdNm");
					response = resultMap;
					response.put("vrfcRsltMsg",vrfcRsltMsg);
					}

					header.put("f_rtn_cd",f_rtn_cd);
					response.put("header",header);
				}
			}
		} catch (IOException e) {
			System.out.printf("IOException Occured");
		} finally {
			if (connection != null) {
				connection.disconnect();
			}
		}
		return response;
	}

	/**
	 * 운전자격 확인
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("drive/verifyTest")
	@ResponseBody
	public String verifyTest(@RequestBody Map<String, Object> paramsMap) throws IOException {
		String encodeName = null;
		String response = null;

		try {
			encodeName = URLEncoder.encode(paramsMap.get("name").toString(), "UTF-8");
		} catch(UnsupportedEncodingException e) {
			System.out.printf("UnsupportedEncodingException Occured");
		}

		String verifyUrl = verifyLicense + "/test?f_license_no=" + paramsMap.get("num").toString() +
				"&f_resident_name=" + encodeName + "&f_licn_con_code=" + paramsMap.get("type").toString() + "&f_vrfc_mthd=" + paramsMap.get("vrfcMthd").toString() +
				"&f_from_date=" + paramsMap.get("startDt").toString() + "&f_to_date=" + paramsMap.get("endDt").toString() + "&user_sn=" + getUserSn();

		//System.out.println("verifyUrl : " + verifyUrl);
		URL url = new URL(verifyUrl);
		HttpURLConnection connection = null;
		BufferedReader bufferedReader = null;
		StringBuffer stringBuffer = new StringBuffer();
		String inputLine = null;

		try {
			connection = (HttpURLConnection) url.openConnection();
			bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));

			while ((inputLine = bufferedReader.readLine()) != null)  {
				stringBuffer.append(inputLine);
			}
			response = stringBuffer.toString();
		} catch (IOException e) {
			System.out.printf("IOException Occured");
		} finally {
			if (connection != null) connection.disconnect();
			if (bufferedReader != null) bufferedReader.close();
		}

		return response;
	}

	/**
	 * 모바일신분증 - QR생성
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("drive/qrmpm/start")
	@ResponseBody
	public Object start(@RequestBody Map<String, Object> paramsMap) throws IOException {
		String data = driveService.start(paramsMap);

		String encodedText = Base64.getUrlEncoder().withoutPadding().encodeToString(data.getBytes());

		return encodedText;
	}

}