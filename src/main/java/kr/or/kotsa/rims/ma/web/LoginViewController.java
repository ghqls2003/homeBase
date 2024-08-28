package kr.or.kotsa.rims.ma.web;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.ma.service.LoginViewService;
import kr.or.kotsa.rims.ma.service.MainViewService;
import kr.or.kotsa.rims.ma.service.impl.LoginViewDao;

@Controller
@PropertySource("classpath:/egovframework/egovProps/globals.properties")
@RequestMapping("ma")
public class LoginViewController {

	private static final Logger logger = LoggerFactory.getLogger(LoginViewController.class);
	private static final String USERDATA = "userData";
	private static final String CONFMCD = "confmCd";
	private static final String SSO_ID = "SSO_ID";
	private static final String AUTHOR_LV = "AUTHOR_LV";

	final String isLogin = "isLogin";

	@Autowired
	private	LoginViewService loginViewService;

	@Autowired
	private	LoginViewDao loginViewDao;

	@Autowired
	private CmmnService cmmnService;

	@Value("${Globals.mode}")
    private String mode;

	/**
	 * 로그인 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("login")
	public ModelAndView login(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		
		mav.addObject("mode", mode);
		mav.setViewName("ma/login");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

//	/**
//	 * 개발용 로그인
//	 *
//	 * @param paramsMap
//	 * @return
//	 * @throws HmtsException
//	 */
//	@RequestMapping("ttLogin")
//	public ModelAndView ttlogin(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
//			HttpServletRequest request, HttpServletResponse response, HttpSession session) throws HmtsException {
//
//	    Map<String, Object> resultMap = loginViewService.selectTTUserInfo(paramsMap, request);
//	    if (resultMap != null) {
//	        // 로그인 성공
//	        mav.setViewName("redirect:/");
//	        session.setAttribute("authrtCd", resultMap.get("authrtCd"));
//	        session.setAttribute("userData", resultMap);
//	        @SuppressWarnings("unchecked")
//			Map<String, Object> userData = (Map<String, Object>) session.getAttribute("userData");
//	        loginViewDao.insertLoginLog(userData, isLogin, request);
//
//	    } else {
//	        mav.setViewName("redirect:/ma/login");
//	        session.setAttribute("message", "로그인 정보를 확인해 주세요.");
//	    }
//
//	    return mav;
//	}

	/**
	 * SSO 로그인 처리
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("ssoLogin")
	public ModelAndView selectssoLogin(@RequestParam Map<String, Object> paramsMap, HttpServletRequest httpServletRequest, HttpServletResponse response, ModelAndView mav, HttpSession session) throws RimsException {
		HttpSession httpSession = httpServletRequest.getSession();
		
		httpSession.setAttribute("MODE", "op");
		if (mode.equals("dev")) {
			// 개발에서 SSO 테스트 할때 사용됨
			httpSession.setAttribute(SSO_ID, paramsMap.get("userId"));
			httpSession.setAttribute("SSO_NAME", "testSsoName");
			httpSession.setAttribute("CHARGER_NM", "testChargetNm");
			httpSession.setAttribute("MBTLNUM","01011112222");
			httpSession.setAttribute("EMAIL", "testEma");
			httpSession.setAttribute("MODE", "dev");
		}

		if (httpSession.getAttribute(SSO_ID) != null) { // SSO 로그인
			paramsMap.put(SSO_ID, httpSession.getAttribute(SSO_ID).toString());
			paramsMap.put("userId", httpSession.getAttribute(SSO_ID).toString());
			if (httpSession.getAttribute("SSO_NAME") != null) {
				paramsMap.put("userNm", httpSession.getAttribute("SSO_NAME").toString());
			}
			if (httpSession.getAttribute("CHARGER_NM") != null) {
				paramsMap.put("chargerNm", httpSession.getAttribute("CHARGER_NM").toString());
			}
			if (httpSession.getAttribute("EMAIL") != null) {
				paramsMap.put("email", httpSession.getAttribute("EMAIL").toString());
			}
			if (httpSession.getAttribute("MBTLNUM") != null) {
				paramsMap.put("mbtlnum", httpSession.getAttribute("MBTLNUM").toString());
			}
			
			// SSO 로그인 정보 업데이트
			loginViewService.updateUserInfo(paramsMap);
			
			Map<String, Object> resultMap = loginViewService.selectUserInfo(paramsMap, httpServletRequest);
			
			if (resultMap != null) { // 사용자 정보 있을 시
				// 계정상태 체크 (1:정상, 2:잠김, 3:휴면, 4:정지, 5:삭제, 6:탈퇴)
				
				if (!resultMap.get("acntSttsCd").equals("1")) {
					if (resultMap.get("acntSttsCd").equals("2")) {
						// 잠김
				        mav.setViewName("redirect:/ma/login");
				        session.setAttribute("message", "잠금상태인 계정입니다.");
				        return mav;
					} else if (resultMap.get("acntSttsCd").equals("3")) {
						// 휴면
				        mav.setViewName("redirect:/ma/login");
				        session.setAttribute("message", "휴면상태인 계정입니다.");
				        return mav;
					} else if (resultMap.get("acntSttsCd").equals("4")) {
						// 정지
				        mav.setViewName("redirect:/ma/login");
				        session.setAttribute("message", "정지된 계정입니다.");
				        return mav;
					} else if (resultMap.get("acntSttsCd").equals("5")) {
						// 삭제
				        mav.setViewName("redirect:/ma/login");
				        session.setAttribute("message", "삭제된 계정입니다.");
				        return mav;
					} else if (resultMap.get("acntSttsCd").equals("6")) {
						// 탈퇴
				        mav.setViewName("redirect:/ma/login");
				        session.setAttribute("message", "탈퇴된 계정입니다.");
				        return mav;
					} else {
						mav.setViewName("redirect:/ma/login");
				        session.setAttribute("message", "접속이 거부되었습니다. 관리자에게 문의 바랍니다.");
				        return mav;
					}
				}
				
				Timestamp timestamp = (java.sql.Timestamp) resultMap.get("lastLgnDt");
				LocalDateTime lastLoginDate = timestamp.toLocalDateTime();
				
				if (lastLoginDate.isBefore(LocalDateTime.now().minusMonths(6))) {
					mav.setViewName("redirect:/ma/login");
			        session.setAttribute("message", "6개월 미접속 계정으로 휴면상태로 변경되었습니다.");
			        loginViewService.updateAcntCd(resultMap);
			        return mav;
				}  
				
				if (resultMap.get("aprvSttsCd").equals("1")) {
					// 권한요청 상태 : 로그인으로
			        mav.setViewName("redirect:/ma/login");
			        session.setAttribute("message", "권한 신청중인 계정입니다. 승인까지 최대 3일 소요될 수 있습니다.");
			        return mav;
				} else if (resultMap.get("aprvSttsCd").equals("3")) {
					// 권한요청 반려 상태 : 권한신청으로
					mav.setViewName("redirect:/ma/auth");
			        Map<String, Object> rjctRsn = loginViewService.seletRjctRsn(paramsMap, httpServletRequest);
			        if (rjctRsn != null) {
			        	session.setAttribute("message", "권한 신청 반려된 계정입니다.\\n(반려사유 : "+rjctRsn.get("rjctRsn")+")");
			        } else {
			        	session.setAttribute("message", "권한 신청 반려된 계정입니다.\\n");
			        }
			        return mav;
				} else if (resultMap.get("aprvSttsCd").equals("2")) {
					// 권한 승인 상태 : 메인으로
					resultMap.put("SSO_ID", httpSession.getAttribute("SSO_ID").toString());
					if (httpSession.getAttribute("SSO_NAME") != null) {
						resultMap.put("SSO_NAME", httpSession.getAttribute("SSO_NAME").toString());
					}
					if (httpSession.getAttribute("EMAIL") != null) {
						resultMap.put("SSO_EMAIL", httpSession.getAttribute("EMAIL").toString());
					}
					if (httpSession.getAttribute("MBTLNUM") != null) {
						resultMap.put("SSO_MBTLNUM", httpSession.getAttribute("MBTLNUM").toString());
					}
					session.setAttribute("authrtCd", resultMap.get("authrtCd"));
					session.setAttribute("userData", resultMap);
					//최종로그인일시업데이트
					loginViewService.updateLastDt(resultMap);
					Map<String, Object> userData = (Map<String, Object>) session.getAttribute("userData");
					userData.put("setInOut", "I");
					userData.put("lgnType", "1");
					loginViewDao.insertLoginLog(userData, isLogin, httpServletRequest);
					
					
					String authrtCd = (String) resultMap.get("authrtCd");
					//authrtCd = "S01";
					
					if ("S01".equals(authrtCd) || "S02".equals(authrtCd)) {
						if ("Y".equals(resultMap.get("prvcPrcsAgreYn")) && resultMap.get("prvcPrcsAgreDt") != null) {
							mav.setViewName("redirect:/");	
						} else {
							mav.setViewName("ma/PTSterms");
							return mav;
						}
					}else {
						mav.setViewName("redirect:/");
					}
				} else {
			        mav.setViewName("redirect:/ma/login");
			        session.setAttribute("message", "계정의 승인 상태를 확인하여 주세요.");
			        return mav;
				}

			} else {
		        // 사용자 정보가 없을 시 권한 신청 화면으로 이동
				mav.setViewName("redirect:/ma/auth");
				return mav;
			}

		} else {
	        mav.setViewName("redirect:/ma/login");
	        session.setAttribute("message", "로그인 정보를 확인해 주세요.");
	        return mav;
		}

		return mav;
	}

    /**
     * 로그아웃
     * @return
     * @throws RimsException
     */
	@RequestMapping("logout")
	public String selectlogout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)
			throws RimsException {
		HttpSession httpSession = httpServletRequest.getSession();
		String r_url = "redirect:/";
		
		Map<String, Object> userData = (Map<String, Object>) httpSession.getAttribute("userData");
		userData.put("setInOut", "O");
		userData.put("lgnType", "1");
		loginViewDao.insertLoginLog(userData, isLogin, httpServletRequest);
		if (mode.equals("op")) {
			r_url = "redirect:https://rims.kotsa.or.kr/sso/SPLogout.jsp";
		}
		httpSession.invalidate();
		return r_url; 
	}
}