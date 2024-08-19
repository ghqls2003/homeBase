package kr.or.kotsa.rims.api.web;

import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.api.service.ApiAuthKeyService;
import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;

@Controller
@RequestMapping("api")
public class ApiAuthKeyController extends CmmnAbstractServiceImpl {

	private static final int TOO_MANY_ROWS = 50000;

	@Autowired
	private ApiAuthKeyService apiAuthKeyService;
	@Autowired
	private CmmnService cmmnService;

	/**
	 * API이용안내
	 *
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/apiAuthKey")

	public ModelAndView viewApiAuthKey(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		mav.addObject("UserSn", getUserSn());
		mav.addObject("authrtCd", getAuthrtCd());

		paramsMap.put("url", "api/apiAuthKey");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName", tableName);

		mav.setViewName("api/apiAuthKey");
		mav.addObject("error", request.getAttribute("error"));

		return mav;
	}

	@RequestMapping("apiAuthKey/listView")
	@ResponseBody
	public Object selectlistApiAuthKey(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request,
			HttpServletResponse response) throws RimsException {
		ModelAndView mav = new ModelAndView("jsonView");
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("authrtCd", getAuthrtCd());
		int total = apiAuthKeyService.selectlistViewCnt(paramsMap);
		paramsMap.put("total", total);

		List<Map<String, Object>> result = apiAuthKeyService.selectlistView(paramsMap);
		mav.addObject("data", result);
		mav.addObject("total", total);

		return mav;
	}

	@RequestMapping("apiAuthKey/checkstts")
	@ResponseBody
	public Object selectcheckstts(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request,
			HttpServletResponse response) throws RimsException {
		ModelAndView mav = new ModelAndView("jsonView");
		paramsMap.put("userSn2", getUserSn());
		paramsMap.put("userSn", getUserSn());

		int total = apiAuthKeyService.selectchecksttsCnt(paramsMap);

		int totalapi = apiAuthKeyService.selectcheckapiCnt(paramsMap);
		List<Map<String, Object>> result = apiAuthKeyService.selectcheckstts(paramsMap);

		mav.addObject("data", result);
		mav.addObject("totalapi", totalapi);
		mav.addObject("total", total);

		return mav;
	}

//	public Object selectapiInsert(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request,
//			HttpServletResponse response) throws RimsException {
//		ModelAndView mav = new ModelAndView("jsonView");
//		
//		int total = apiAuthKeyService.selectlistViewCnt(paramsMap);
//		paramsMap.put("total", total);
//		paramsMap.put("userSn", getUserSn());
//		List<Map<String, Object>> result = apiAuthKeyService.selectlistView(paramsMap);
//		mav.addObject("data", result);
//		mav.addObject("total", total);
//		
//		return mav;
//	}

	/**
	 * 상태 드롭다운
	 */
	@RequestMapping("apiAuthKey/sttsDrop")
	@ResponseBody
	public Object selectsttsDrop(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		List<Map<String, Object>> sttsDrop = apiAuthKeyService.selectsttsDrop(paramsMap);
		return sttsDrop;
	}

	/**
	 * API 재발급
	 *
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("apiAuthKey/updateSttCd")
	@ResponseBody
	public int updateStopApiUse(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("certKey", getApiKey());
		paramsMap.put("secretKey", getApiKey2());// 임의 값
		int tot = 0;
		int orgStop = apiAuthKeyService.updateSttCd(paramsMap);
//		int newApi = apiAuthKeyService.insertApiAuthKey(paramsMap);
		int newApi = apiAuthKeyService.insertReApi(paramsMap);
		int orgListUpdate = apiAuthKeyService.updateorgList(paramsMap);
		tot = orgStop + newApi + orgListUpdate;

		return tot;
	}

	/**
	 * 반료 후 신청
	 *
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("apiAuthKey/updateReStts")
	@ResponseBody
	public int updateReStts(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request,
			HttpServletResponse response) throws RimsException {
		int tot = 0;
		int orgStop = apiAuthKeyService.updateSttCd(paramsMap);
//		int newApi = apiAuthKeyService.insertApiAuthKey(paramsMap);
		int orgListUpdate = apiAuthKeyService.updateorgList(paramsMap);
		tot = orgStop + orgListUpdate;

		return tot;
	}

	@RequestMapping("apiAuthKey/insertApiNum")
	@ResponseBody
	public int insertApiNum(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("AuthCd", getAuthrtCd());
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());
		paramsMap.put("authrtCd", getAuthrtCd());

		return apiAuthKeyService.insertApiNum(paramsMap);

	}

	/**
	 * 인증키 승인/반려 버튼
	 * 
	 * @return
	 * @throws RimsException
	 */
	// 승인
	@RequestMapping("apiAuthKey/approve")
	@ResponseBody
	public int updateapproveBtn(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request,
			HttpServletResponse response) throws RimsException {
		paramsMap.put("autzr", getUserSn());

		return apiAuthKeyService.updateapproveBtn(paramsMap);
	}

	// 반려
	@RequestMapping("apiAuthKey/refuse")
	@ResponseBody
	public int updaterefuseBtn(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request,
			HttpServletResponse response) throws RimsException {
		paramsMap.put("autzr", getUserSn());

		return apiAuthKeyService.updaterefuseBtn(paramsMap);
	}

	// 중지
	@RequestMapping("apiAuthKey/stopUse")
	@ResponseBody
	public int updatestopUse(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request,
			HttpServletResponse response) throws RimsException {
		paramsMap.put("autzr", getUserSn());

		return apiAuthKeyService.updatestopUse(paramsMap);
	}

	// 중지해제
	@RequestMapping("apiAuthKey/ReUse")
	@ResponseBody
	public int updateReUse(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request,
			HttpServletResponse response) throws RimsException {
		paramsMap.put("autzr", getUserSn());

		return apiAuthKeyService.updateReUse(paramsMap);
	}

	// 연장하기
	@RequestMapping("apiAuthKey/extendAPi")
	@ResponseBody
	public int updateextendAPi(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request,
			HttpServletResponse response) throws RimsException {
		paramsMap.put("userSn", getUserSn());
		return apiAuthKeyService.updateextendAPi(paramsMap);
	}

	@RequestMapping("apiAuthKey/insertApiAuthKey")
	@ResponseBody
	public int insertApiAuthKey(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("certKey", getApiKey());
		paramsMap.put("secretKey", getApiKey2());// 임의 값
		paramsMap.put("userSn", getUserSn());
		return apiAuthKeyService.insertApiAuthKey(paramsMap);
	}
	
	@RequestMapping("apiAuthKey/insertApiTestKey")
	@ResponseBody
	public int insertApiTestKey(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("certKey", getApiKeyTestKey2()); //
		paramsMap.put("secretKey", getApiKeyTestKey());
		paramsMap.put("userSn", getUserSn());
		return apiAuthKeyService.insertApiTestKey(paramsMap);
	}

	public String getApiKey() throws RimsException {
		String str = getUserId() + new Timestamp(new Date().getTime()).toString();
		String SHA = "";
		try {
			MessageDigest sh = MessageDigest.getInstance("SHA-256");
			sh.update(str.getBytes(Charset.forName("UTF-8")));
			byte byteData[] = sh.digest();
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < byteData.length; i++) {
				sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
			}
			SHA = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			SHA = null;
		}

		return SHA;
	}

	public String getApiKey2() throws RimsException {
//		비밀키는 임의로 userSn으로 생성했음 -> 추후 비밀키 생성 방법이 정해지면 변경 예정
		String str = getUserSn() + new Timestamp(new Date().getTime()).toString();
		String SHA = "";
		try {
			MessageDigest sh = MessageDigest.getInstance("SHA-256");
			sh.update(str.getBytes(Charset.forName("UTF-8")));
			byte byteData[] = sh.digest();
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < byteData.length; i++) {
				sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 32).substring(1));
			}
			SHA = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			SHA = null;
		}

		return SHA;
	}

	public String getApiKeyTestKey() throws RimsException {
//		테스트키 인증키 임의로 userSn으로 생성했음 -> 추후 비밀키 생성 방법이 정해지면 변경 예정
	    Calendar cal = Calendar.getInstance();
	    cal.add(Calendar.HOUR_OF_DAY, -1); 
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	    String oneHourAgoStr = sdf.format(cal.getTime());

	    // oneHourAgoStr과 userId을 조합하여 문자열 생성
	    String str = getUserId() + oneHourAgoStr;
	    // 테스트키 인증키 생성
	    String SHA = "";
		try {
			MessageDigest sh = MessageDigest.getInstance("SHA-256");
			sh.update(str.getBytes(Charset.forName("UTF-8")));
			byte byteData[] = sh.digest();
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < byteData.length; i++) {
				sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 32).substring(1));
			}
			SHA = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			SHA = null;
		}

		return SHA;
	}
	public String getApiKeyTestKey2() throws RimsException {
	    // 현재 시간과 1시간 전의 시간을 계산
	    Calendar cal = Calendar.getInstance();
	    cal.add(Calendar.HOUR_OF_DAY, -1); 
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	    String oneHourAgoStr = sdf.format(cal.getTime());

	    // oneHourAgoStr과 userSn을 조합하여 문자열 생성
	    String str = getUserSn() + oneHourAgoStr;

	    // SHA-256 해시 생성
	    String SHA = "";
	    try {
	        MessageDigest sh = MessageDigest.getInstance("SHA-256");
	        sh.update(str.getBytes(Charset.forName("UTF-8")));
	        byte byteData[] = sh.digest();
	        StringBuffer sb = new StringBuffer();
	        for (int i = 0; i < byteData.length; i++) {
	            sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 32).substring(1));
	        }
	        SHA = sb.toString();
	    } catch (NoSuchAlgorithmException e) {
	        SHA = null;
	    }

	    return SHA;
	}
	@RequestMapping("apiAuthKey/apiSttsview")
	@ResponseBody
	public Object selectlistApiSttsView(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("userSn", getUserSn());
		int total = apiAuthKeyService.selectApiSttsViewCnt(paramsMap);
		paramsMap.put("total", total);
		List<Map<String, Object>> list = apiAuthKeyService.selectApiSttsView(paramsMap);
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("data", list);
		mav.addObject("total", total);

		return mav;
	}
	
}
