package kr.or.kotsa.rims.vfc.service.impl;

import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.lib.mic.service.MipDidVpService;
import kr.or.kotsa.rims.cmmn.lib.mic.service.MipDidVpServiceImpl;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.vfc.service.DriveService;

import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@PropertySource("classpath:/egovframework/egovProps/globals.properties")
public class DriveServiceImpl extends CmmnAbstractServiceImpl implements DriveService {

	private DriveDao driveDao;
	private MipDidVpService mipDidVpService;

	@Value(value="${app.sp-server}")
    private String spServer;

	@Value(value="${app.sp-bi-image-url}")
	private String spBiImageUrl;

	@Value(value="${app.sp-ci}")
	private String spCi;

	String svcCode;
	static String branchName;
	static String trxcode;

	public DriveServiceImpl(DriveDao driveDao, MipDidVpService mipDidVpService) {
		this.driveDao = driveDao;
		this.mipDidVpService = mipDidVpService;
	}

    //차량정보 조회
	public Map<String, Object> selectCarList(Map<String, Object> paramsMap)
			throws RimsException {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> list = driveDao.selectCarList(paramsMap);
		int total = driveDao.selectCarListCnt(paramsMap);

		result.put("data", list);
		result.put("total", total);
		return result;
	}

	//운전자격 확인 코드
	public Map<String, Object> selectVerifyCd(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		Map<String, Object> rentNo = driveDao.selectRentNo(paramsMap);
		Map<String, Object> vin = driveDao.selectVin(paramsMap);

		result.putAll(rentNo);
		paramsMap.putAll(rentNo);
		result.put("code", driveDao.selectVerifyCd(paramsMap));
		if(vin != null) {
			paramsMap.putAll(vin);
			result.putAll(selectDefectList(paramsMap));
		}
		String successCode = (String) paramsMap.get("cd");
		
		if("00".equals(successCode)) {
			insertRent(paramsMap);
		}
		result.putAll(selectEtcInfo(paramsMap));
		return result;
	}

	//대여정보 등록
	public void insertRent(Map<String, Object> paramsMap) {
		paramsMap.put("rgtrSn", getUserSn());
		paramsMap.put("regIp", getClientIP());
		paramsMap.put("bzmnSn", getBzmnSn());

		driveDao.insertRentInfo(paramsMap);
//		driveDao.insertRentHstryInfo(paramsMap);
	}

	public String updateRentSttsCd(Map<String, Object> paramsMap) {
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());
		String rentalTypeYn = (String) paramsMap.get("rentalTypeYn");
		driveDao.insertRentHstryInfo(paramsMap);
		// 대여정보 대여확정처리
		driveDao.updateRentSttsCd(paramsMap);

		if(rentalTypeYn.equals("Y")){ // 대여유형 포함 : Y
			// 대여처리시 운전자격이력에 대여유형 업데이트
			driveDao.updateRentType(paramsMap);
		}
		return "success";
	}


	//운전자격검증 부가정보 등록
	public void insertEtcInfo(Map<String, Object> paramsMap) {
		driveDao.insertEtcInfo(paramsMap);
	}

	//운전자격 확인 결과
	public Map<String, Object> selectEtcInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		//대여이력 건수
		int rentCnt = driveDao.selectRentCnt(paramsMap);
		result.put("rentCnt", rentCnt);
		// 최근 7일 운전자격이력 건수
		int VfcHistCnt = driveDao.selectVfcHistCnt(paramsMap);
		result.put("VfcHistCnt", VfcHistCnt);


		if(rentCnt > 0) {
			paramsMap.put("rentCnt", rentCnt);
			paramsMap.put("typeCd", "1");
			paramsMap.put("rsltCd", "1");

			//운전자격검증 부가정보 등록
			insertEtcInfo(paramsMap);
		} else if(rentCnt == 0) {
			paramsMap.put("rentCnt", rentCnt);
			paramsMap.put("typeCd", "1");
			paramsMap.put("rsltCd", "2");

			//운전자격검증 부가정보 등록
			insertEtcInfo(paramsMap);
		}

		return result;
	}

	//결함정보 조회
	public Map<String, Object> selectDefectList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> list  = driveDao.selectDefectList(paramsMap);
		int total = driveDao.selectDefectListCnt(paramsMap);
		result.put("data", list);
		result.put("total", total);

		return result;
	}

	//지역 코드
	public List<Map<String, Object>> selectAreaCd(Map<String, Object> paramsMap) {
		return driveDao.selectAreaCd(paramsMap);
	}

	//모바일신분증 - QR생성
	@SuppressWarnings("unchecked")
	public String start(Map<String, Object> paramsMap) {
		Map<String, Object> m200 = null;

		svcCode = (String) paramsMap.get("svcCode");
		branchName = (String) paramsMap.get("branchName");

		m200 = this.directStart(paramsMap);

		JSONObject jsonObject = new JSONObject();

		for(Map.Entry<String, Object> entry : m200.entrySet()) {
			jsonObject.put(entry.getKey(), entry.getValue());
		}

		String m200Base64 = Base64.getUrlEncoder().withoutPadding().encodeToString((jsonObject.toString()).getBytes());

		MipDidVpServiceImpl.vpData = "";

		return m200Base64;
	}

	/**
	 * QR-MPM 시작(Direct 모드)
	 *
	 * @MethodName : directStart
	 * @param trxInfo
	 * @return
	 * @throws SpException
	 */
	private Map<String, Object> directStart(Map<String, Object> paramsMap) {
		trxcode = genTrxcode();
		String mode = (String) paramsMap.get("mode");

		Map<String, Object> m200 = new HashMap<>();

		m200.put("type", "mip");
		m200.put("version", "1.0.0");
		m200.put("cmd", "200");
		m200.put("image", spBiImageUrl);
		m200.put("trxcode", trxcode);
		m200.put("mode", mode);
		m200.put("ci", spCi);
		m200.put("host", spServer);

		return m200;
	}

	/**
	 * 거래코드 생성 - 현재시간 yyyyMMddhhmmssSSS + 시큐어난수 (8자리)
	 *
	 * @MethodName : genTrxcode
	 * @return 거래코드
	 */
	public static String genTrxcode() {
		Date today = new Date();
		SimpleDateFormat formater = new SimpleDateFormat("yyyyMMddhhmmssSSS", Locale.KOREA);
		String second = secRandom(4); // 4자리 생성하고 hex code로 표현되므로 8개 자리가 나옴

		String first = formater.format(today);
		String result = first + second;
		return result;
	}

	/**
	 * 난수 생성
	 *
	 * @MethodName : SecRandom
	 * @param genNum
	 * @return 난수
	 */
	public static String secRandom(int genNum) {
		SecureRandom random = new SecureRandom();

		byte bytes[] = new byte[genNum];

		random.nextBytes(bytes);

		return bytesToHexString(bytes);
	}

	/** Base Hex Chars */
	private static final char[] HEX_CHARS = "0123456789ABCDEF".toCharArray();

	/**
	 * Byte Array to Hex String
	 *
	 * @MethodName : bytesToHexString
	 * @param bytes Byte Array
	 * @return Hex String
	 */
	public static String bytesToHexString(byte[] bytes) {
		if (bytes == null) {
			return null;
		}

		char[] hexChars = new char[bytes.length * 2];

		for (int i = 0; i < bytes.length; i++) {
			int value = bytes[i] & 0xff;

			hexChars[i * 2] = HEX_CHARS[value >>> 4];
			hexChars[i * 2 + 1] = HEX_CHARS[value & 0x0f];
		}

		return new String(hexChars);
	}

	/**
	 * Profile 요청
	 *
	 * @MethodName : getProfile
	 * @param m310 M310 메세지
	 * @return M310 메세지 + Profile
	 * @throws SpException
	 */
	@Override
	public String getProfile(Map<String, Object> paramsMap) {
		Map<String, Object> trxInfoSvc = new HashMap<>();
		trxInfoSvc.put("trxcode", paramsMap.get("trxcode"));
		trxInfoSvc.put("trxStsCode", "0001");
		trxInfoSvc.put("vpVerifyResult", "N");
		trxInfoSvc.put("svcCode", svcCode);
		trxInfoSvc.put("branchName", branchName);

		String profile;

		profile = mipDidVpService.getProfile(trxInfoSvc);

		return profile;
	}

	/**
	 * VP 검증
	 *
	 * @param mipApiData {"data":"Base64로 인코딩된 M400 메시지"}
	 * @return {"result":true}
	 * @throws ParseException
	 * @throws SpException
	 */
	public Boolean verifyVP(Map<String, Object> paramsMap) {
		String trxcode = (String) paramsMap.get("trxcode");
		JSONObject vp = (JSONObject) paramsMap.get("vp");

		Boolean result = null;

		result = mipDidVpService.verifyVP(trxcode, vp);

		return result;
	}

	/**
	 * 오류 전송
	 *
	 * @MethodName : sendError
	 * @param m900 M900 메세지
	 * @throws SpException
	 */
	@Override
	public void sendError(Map<String, Object> paramsMap){
		Map<String, Object> trxInfo = new HashMap<>();

		trxInfo.put("trxcode", paramsMap.get("trxcode"));
		trxInfo.put("errcode", paramsMap.get("errcode"));
		trxInfo.put("errmsg", paramsMap.get("errmsg"));
	}

	//법인번호 조회
	public Object selectCrno(Map<String, Object> paramsMap) {
		paramsMap.put("bzmnSn", getBzmnSn());
		return driveDao.selectCrno(paramsMap);
	}

	// 해당 코드에 대한 공통코드 테이블에서 메시지 가져오기
	@Override
	public List<Map<String, Object>> getRtnMsg(Map<String, Object> paramsMap) {
		return driveDao.getRtnMsg(paramsMap);
	}

}
