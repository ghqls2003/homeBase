package kr.or.kotsa.rims.sft.web;

import java.lang.reflect.Array;
import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sft.service.InquiryService;

@Controller
@RequestMapping("sft")
public class InquiryController extends CmmnAbstractServiceImpl {

	private static final int TOO_MANY_ROWS = 50000;

	@Autowired
	private InquiryService inquiryService;
	@Autowired
	private CmmnService cmmnService;

	/**
	 * 문의하기 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("inquiry")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
//		String[] vaildAuth = { "Z01", "K01", "M01", "D01", "G01", "G02" };
//		if (Arrays.asList(vaildAuth).contains(getAuthrtCd())) {
			mav.addObject("inquiry", paramsMap.get("inquiry"));
			paramsMap.put("User", getUserSn());
			paramsMap.put("AuthCd", getAuthrtCd());
			mav.addObject("Auth", getAuthrtCd());
			mav.addObject("UserSn", getUserSn());
			mav.addObject("UserId", getUserId());
			mav.addObject("getUserData", getUserData());
			paramsMap.put("User", getUserSn());
			paramsMap.put("url", "sft/inquiry");
			List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
			String tableName = tableNameData.get(0).get("menu_nm").toString();
			mav.addObject("tableName", tableName);

			mav.setViewName("sft/inquiry");
//			mav.addObject("error", request.getAttribute("error"));
//		} else {
//			mav.setViewName("redirect:/");
//		}
		return mav;
	}

	/**
	 * 문의하기 상세 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("inquirydetail")
	public ModelAndView viewDetail(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		mav.setViewName("sft/inquirydetail");
		mav.addObject("Auth", getAuthrtCd());
		mav.addObject("UserSn", getUserSn());
		mav.addObject("UserId", getUserId());
		mav.addObject("getUserData", getUserData());
		paramsMap.put("userSn", getUserSn());

		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	/**
	 * 문의하기 리스트
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("inquiry/selectinquiryList")
	@ResponseBody
	public Map<String, Object> selectinquiryList(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("Auth", getAuthrtCd());
		paramsMap.put("userSn", getUserSn());

		return inquiryService.selectinquiryList(paramsMap);
	}

	/**
	 * 문의하기 리스트
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("inquiry/selectComment")
	@ResponseBody
	public List<Map<String, Object>> selectComment(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("userSn", getUserSn());

		return inquiryService.selectComment(paramsMap);
	}

	/**
	 * 문의하기 상세
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("inquiry/selectDetailinquiryInfo")
	@ResponseBody
	public Map<String, Object> selectDetailinquiryInfo(@RequestBody Map<String, Object> paramsMap)
			throws RimsException {
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("ClientIP", getClientIP());
		paramsMap.put("Auth", getAuthrtCd());
		paramsMap.put("userSn", getUserSn());

		return inquiryService.selectDetailinquiryInfo(paramsMap);
	}

	/**
	 * 문의하기 등록
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */

	@RequestMapping("/inquiry/insertInquiry")
	@ResponseBody
	public Object insertInquiry(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("userSn", getUserSn());
		paramsMap.put("ClientIP", getClientIP());
		paramsMap.put("ssoUserNm", getSsoName());
		paramsMap.put("assiTelno", getSsoMbtlnum());
		paramsMap.put("ssoEmail", getSsoEmail());

		return inquiryService.insertInquiry(paramsMap);
	}

	/**
	 * 문의하기 댓글작성
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/inquiry/Insertreply")
	@ResponseBody
	public int insertreply(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("authrtCd", getAuthrtCd());
		paramsMap.put("userSn", getUserSn());
		return inquiryService.Insertreply(paramsMap);
	}

	/**
	 * 문의하기 댓글보기
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("inquiry/selectinquiryReply")
	@ResponseBody
	public Map<String, Object> selectinquiryReply(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("userSn", getUserSn());

		return inquiryService.selectinquiryReply(paramsMap);
	}

	/**
	 * 문의하기 댓글보기
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("inquiry/checkPswd")
	@ResponseBody
	public Map<String, Object> selectcheckPswd(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		paramsMap.put("userSn", getUserSn());

		return inquiryService.selectcheckPswd(paramsMap);
	}

	@RequestMapping("inquiry/updateReply")
	@ResponseBody
	public int updateReply(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("AuthCd", getAuthrtCd());
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());
		paramsMap.put("authrtCd", getAuthrtCd());
		paramsMap.put("userSn", getUserSn());

		return inquiryService.updateReply(paramsMap);

	}

	@RequestMapping("inquiry/updateInquiry")
	@ResponseBody
	public int updateInquiry(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("AuthCd", getAuthrtCd());
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());
		paramsMap.put("authrtCd", getAuthrtCd());
		paramsMap.put("userSn", getUserSn());

		return inquiryService.updateInquiry(paramsMap);

	}

	@RequestMapping("inquiry/updateDeleteReply")
	@ResponseBody
	public int updateDeleteReply(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("AuthCd", getAuthrtCd());
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());
		paramsMap.put("authrtCd", getAuthrtCd());
		paramsMap.put("userSn", getUserSn());

		return inquiryService.updateDeleteReply(paramsMap);

	}

	@RequestMapping("inquiry/updateInquieryuseY")
	@ResponseBody
	public int updateInquieryuseY(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("AuthCd", getAuthrtCd());
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());
		paramsMap.put("authrtCd", getAuthrtCd());
		paramsMap.put("userSn", getUserSn());

		return inquiryService.updateInquieryuseY(paramsMap);

	}

	@RequestMapping("inquiry/deleteInquiry")
	@ResponseBody
	public int deleteInquiry(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("AuthCd", getAuthrtCd());
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());
		paramsMap.put("authrtCd", getAuthrtCd());
		paramsMap.put("userSn", getUserSn());

		return inquiryService.deleteInquiry(paramsMap);

	}

}