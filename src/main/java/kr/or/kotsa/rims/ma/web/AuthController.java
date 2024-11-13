package kr.or.kotsa.rims.ma.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.ma.service.AuthService;

@Controller
@RequestMapping("ma")
public class AuthController {

	@Autowired
	private AuthService authService;

	/**
	 * 권한신청 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("auth")
	public ModelAndView auth(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getSession();

		if(session.getAttribute("SSO_ID") != null){
			mav.setViewName("ma/auth");
			mav.addObject("error", request.getAttribute("error"));
		} else {
	        try {
	        	response.setContentType("text/html; charset=utf-8");
	            PrintWriter w = response.getWriter();
	            w.write("<script>alert('"+"접근할 수 없는 페이지입니다."+"');location.href='"+"/"+"';</script>");
	            w.flush();
	            w.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				System.out.println("IOException Occured");
			}
		}

		return mav;
	}

	/**
     * 시도
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("auth/selectCtpvNm")
	@ResponseBody
	public Object CtpvNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return authService.selectCtpvNm(paramsMap);
	}

	/**
     * 시군구
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("auth/selectSggNm")
	@ResponseBody
	public Object SggNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return authService.selectSggNm(paramsMap);
	}

	/**
     * 회사찾기 팝업 - 회사리스트
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("auth/selectCompanyList")
	@ResponseBody
	public Map<String, Object> CompanyList(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return authService.selectCompanyList(paramsMap);
	}

	/**
     * 지자체찾기 팝업 - 회사리스트
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("auth/selectLocGovList")
	@ResponseBody
	public Map<String, Object> LocGovList(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return authService.selectLocGovList(paramsMap);
	}

	/**
     * 사업자 등록 - 사업소종류 리스트
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("auth/selectBzmnSe")
	@ResponseBody
	public List<Map<String, Object>> BzmnSe(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return authService.selectBzmnSe(paramsMap);
	}

	/**
     * 사업자 등록 - 주사무소 리스트
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("auth/selectUpBrno")
	@ResponseBody
	public List<Map<String, Object>> UpBrno(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return authService.selectUpBrno(paramsMap);
	}

	/**
     * 사업자 등록 - 영업상태 리스트
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("auth/selectBsnStts")
	@ResponseBody
	public List<Map<String, Object>> BsnStts(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return authService.selectBsnStts(paramsMap);
	}

	/**
     * 중복확인
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("auth/selectDuplicChk")
	@ResponseBody
	public Object DuplicChk(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return authService.selectDuplicChk(paramsMap);
	}

	/**
     * 사업자 등록
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("auth/insertCmpny")
	@ResponseBody
	public Object insertCmpny(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return authService.insertCmpny(paramsMap);
	}

	/**
     * 신청요청
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("auth/insertUser")
	@ResponseBody
	public Object insertUser(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return authService.insertUser(paramsMap);
	}

	/**
     * 반려 후 재신청
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("auth/updateUser")
	@ResponseBody
	public Object updateUser(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return authService.updateUser(paramsMap);
	}

	/**
     * 기관 사업자일련번호
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("auth/selectBzmnSn")
	@ResponseBody
	public Map<String, Object> bzmnSn(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return authService.selectBzmnSn(paramsMap);
	}

}