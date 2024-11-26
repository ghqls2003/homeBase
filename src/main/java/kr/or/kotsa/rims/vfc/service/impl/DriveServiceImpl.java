package kr.or.kotsa.rims.vfc.service.impl;

import kr.or.kotsa.rims.vfc.service.DrvVfcHistService;
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

	@Value(value = "${app.sp-server}")
	private String spServer;

	@Value(value = "${app.sp-bi-image-url}")
	private String spBiImageUrl;

	@Value(value = "${app.sp-ci}")
	private String spCi;

	String svcCode;
	static String branchName;
	static String trxcode;

	public DriveServiceImpl(DriveDao driveDao, MipDidVpService mipDidVpService, DrvVfcHistService drvVfcHistService) {
		this.driveDao = driveDao;
		this.mipDidVpService = mipDidVpService;
	}

	//차량정보 조회
	public Map<String, Object> selectCarList(Map<String, Object> paramsMap)
			throws RimsException {

		Map<String, Object> result = new HashMap<>();
		String crno = selectCorpNumIfSAuthrtCd(paramsMap);
		paramsMap.put("crno", crno);
		List<Map<String, Object>> list = driveDao.selectCarList(paramsMap);
		int total = driveDao.selectCarListCnt(paramsMap);
		result.put("data", list);
		result.put("total", total);
		return result;
	}

	//운전자격 확인 코드
	public Map<String, Object> selectVerifyCd(Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<>();


		Map<String, Object> rentNo = driveDao.selectRentNo(paramsMap);
		Map<String, Object> vin = driveDao.selectVin(paramsMap);
		result.putAll(rentNo);
		paramsMap.putAll(rentNo);
		result.put("code", driveDao.selectVerifyCd(paramsMap));
		if (vin != null) {
			paramsMap.putAll(vin);
			result.putAll(selectDefectList(paramsMap));
		}
		String successCode = (String) paramsMap.get("cd");

		if ("00".equals(successCode)) {
			insertRent(paramsMap);
		}

		// 최근 7일 운전자격이력 건수
		int VfcHistCnt = driveDao.selectVfcHistCnt(paramsMap);
		result.put("VfcHistCnt", VfcHistCnt);
		return result;
	}

	//대여정보 등록
	public void insertRent(Map<String, Object> paramsMap) {
		paramsMap.put("rgtrSn", getUserSn());
		paramsMap.put("regIp", getClientIP());
		paramsMap.put("bzmnSn", getBzmnSn());
		driveDao.insertRentInfo(paramsMap);
	}

	public String updateRentSttsCd(Map<String, Object> paramsMap) {
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());
		// 대여정보 대여확정처리 : dvs_dqv_mt_rent update
		driveDao.updateRentSttsCd(paramsMap);
		// 대여정보 대여확정처리 : dvs_dqv_hs_rent insert
		driveDao.insertRentHstryInfo(paramsMap);
		return "success";
	}



//	//운전자격검증 부가정보 등록
//	public void insertEtcInfo(Map<String, Object> paramsMap) {
//		driveDao.insertEtcInfo(paramsMap);
//	}
//	//운전자격 확인 결과
//	public Map<String, Object> selectEtcInfo(Map<String, Object> paramsMap) {
//		Map<String, Object> result = new HashMap<>();
//		//대여이력 건수
//		int rentCnt = driveDao.selectRentCnt(paramsMap);
//		result.put("rentCnt", rentCnt);
//		// 최근 7일 운전자격이력 건수
//		int VfcHistCnt = driveDao.selectVfcHistCnt(paramsMap);
//		result.put("VfcHistCnt", VfcHistCnt);
//
//
//		if(rentCnt > 0) {
//			paramsMap.put("rentCnt", rentCnt);
//			paramsMap.put("typeCd", "1");
//			paramsMap.put("rsltCd", "1");
//
//			//운전자격검증 부가정보 등록
//			insertEtcInfo(paramsMap);
//		} else if(rentCnt == 0) {
//			paramsMap.put("rentCnt", rentCnt);
//			paramsMap.put("typeCd", "1");
//			paramsMap.put("rsltCd", "2");
//
//			//운전자격검증 부가정보 등록
//			insertEtcInfo(paramsMap);
//		}
//
//		return result;
//	}

	// 해당 차량 결함정보 상세팝업 출력 :24.11.26 jeonghyewon
	@Override
	public Map<String, Object> selectDefectList(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> list = driveDao.selectDefectList(paramsMap);
		int total = driveDao.selectDefectListCnt(paramsMap);
		result.put("data", list);
		result.put("total", total);

		return result;
	}

	// 해당 차량 상세 조회 :24.11.26 jeonghyewon
	@Override
	public Map<String, Object> selectDetailCarList(Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> list;
		int total = 0;

		String crno = selectCorpNumIfSAuthrtCd(paramsMap); // S 권한만 법인번호 조회
		paramsMap.put("crno", crno);
		paramsMap.put("authrtCd", getAuthrtCd());
		list  = driveDao.selectDetailCarList(paramsMap);
		total = driveDao.selectDetailCarListCnt(paramsMap);
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

		for (Map.Entry<String, Object> entry : m200.entrySet()) {
			jsonObject.put(entry.getKey(), entry.getValue());
		}

		String m200Base64 = Base64.getUrlEncoder().withoutPadding().encodeToString((jsonObject.toString()).getBytes());

		MipDidVpServiceImpl.vpData = "";

		return m200Base64;
	}

	/**
	 * QR-MPM 시작(Direct 모드)
	 *
	 * @param paramsMap trxInfo
	 * @return
	 * @MethodName : directStart
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
	 * @return 거래코드
	 * @MethodName : genTrxcode
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
	 * @param genNum
	 * @return 난수
	 * @MethodName : SecRandom
	 */
	public static String secRandom(int genNum) {
		SecureRandom random = new SecureRandom();

		byte bytes[] = new byte[genNum];

		random.nextBytes(bytes);

		return bytesToHexString(bytes);
	}

	/**
	 * Base Hex Chars
	 */
	private static final char[] HEX_CHARS = "0123456789ABCDEF".toCharArray();

	/**
	 * Byte Array to Hex String
	 *
	 * @param bytes Byte Array
	 * @return Hex String
	 * @MethodName : bytesToHexString
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
	 * @param paramsMap m310 M310 메세지
	 * @return M310 메세지 + Profile
	 * @MethodName : getProfile
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
	 * @param paramsMap mipApiData {"data":"Base64로 인코딩된 M400 메시지"}
	 * @return {"result":true}
	 * @throws ParseException
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
	 * @param paramsMap M900 메세지
	 * @throws
	 * @MethodName : sendError
	 */
	@Override
	public void sendError(Map<String, Object> paramsMap) {
		Map<String, Object> trxInfo = new HashMap<>();

		trxInfo.put("trxcode", paramsMap.get("trxcode"));
		trxInfo.put("errcode", paramsMap.get("errcode"));
		trxInfo.put("errmsg", paramsMap.get("errmsg"));
	}

	//법인번호 조회
	public List<Map<String, Object>> selectCrno(Map<String, Object> paramsMap) {
		paramsMap.put("bzmnSn", getBzmnSn());
		return driveDao.selectCrno(paramsMap);
	}

	// 해당 코드에 대한 공통코드 테이블에서 메시지 가져오기
	@Override
	public List<Map<String, Object>> getRtnMsg(Map<String, Object> paramsMap) {
		return driveDao.getRtnMsg(paramsMap);
	}


	// 면허번호에 해당하는 최근 7일간의 대여이력 조회  24.10.25 jeonghyewon
	@Override
	public List<Map<String, Object>> drvListView(Map<String, Object> paramsMap) {
		return driveDao.drvListView(paramsMap);
	}

	// 면허번호에 해당하는 최근 7일간의 대여이력 조회 건수 24.10.25 jeonghyewon
	@Override
	public int drvListViewCnt(Map<String, Object> paramsMap) {
		return driveDao.drvListViewCnt(paramsMap);
	}


	// 해당 법인 차량 유무 조회   24.10.28 ->수정 24.11.06 jeonghyewon
	@Override
	public Object selectBzmnCarAndDefectedCarInfo(Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<>();
		String bzmnCarType = "";
		String crno = selectCorpNumIfSAuthrtCd(paramsMap);
		paramsMap.put("crno", crno);
		//1. 로그인 유저의 해당하는 법인번호 유무 : S권한일 경우만 법인 번호 조회됨
		if (crno.isEmpty()) {
			bzmnCarType = "법인없음";
			result.put("bzmnCarType", bzmnCarType);
			return result;
		} else {
			paramsMap.put("crno", crno);
		}
		//2. 해당 법인 차량 유무
		int carCnt = driveDao.selectBzmnCarYn(paramsMap);
		if (carCnt == 0) {
			bzmnCarType = "미등록차량";
			result.put("bzmnCarType", bzmnCarType);
			return result;
		}
		// 3. 해당 법인 차량의 결함 유무
		Map<String, Object> res = driveDao.selectBzmnDefectedCarYn(paramsMap).get(0);
		if (res != null) {
			String regYn = (String) res.get("regYn");
			if (regYn.equals("Y")) {
				bzmnCarType = "결함차량존재";
			} else {
				bzmnCarType = "결함차량미존재";
			}
		}
		result.put("bzmnCarType", bzmnCarType);
		return result;
	}


	//S권한 일 경우만 법인번호 가져오기 24.11.06 jeonghyewon
	@Override
	public String selectCorpNumIfSAuthrtCd(Map<String, Object> paramsMap) {
		paramsMap.put("bzmnSn", getBzmnSn());
		String authrtCd = getAuthrtCd();
		String crno = "";
		//1. S권한 일 경우만 법인번호 가져오기
		if (authrtCd.startsWith("S")) {
			List<Map<String, Object>> response = driveDao.selectCorpNumIfSAuthrtCd(paramsMap);

			if (response != null && !response.isEmpty() && response.get(0) != null) {
				Map<String, Object> firstElement = response.get(0);
				crno = (String) response.get(0).get("crno");
			}
		}
		return crno;
	}


}

