package kr.or.kotsa.rims.ma.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
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
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.ma.service.MainViewService;
import kr.or.kotsa.rims.ma.service.MyPageService;
import kr.or.kotsa.rims.ma.service.impl.MainViewDao;

@Controller
@RequestMapping("ma")
public class MyPageController extends CmmnAbstractServiceImpl {

	@Autowired
	private	MyPageService mypageService;

	@Autowired
	private MainViewService mainViewService;

	@Autowired
	private MainViewDao mainViewDao;

	/**
	 * 마이페이지 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("myPage")
	public ModelAndView myPage(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getSession();

		if(session.getAttribute("authrtCd").toString().equals("A01")){
	        try {
	        	response.setContentType("text/html; charset=utf-8");
	            PrintWriter w = response.getWriter();
	            w.write("<script>alert('"+"접근할 수 없는 페이지입니다."+"');location.href='"+"/"+"';</script>");
	            w.flush();
	            w.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			mav.setViewName("ma/myPage");
			mav.addObject("authrtCd", getAuthrtCd());
			mav.addObject("error", request.getAttribute("error"));
		}

		return mav;
	}

	/**
	 * 사용자 전환 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("switchAuthForAdmin")
	public ModelAndView viewSwitchAuthForAdmin(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getSession();

		if(session.getAttribute("authrtCd").toString().equals("Z01") || session.getAttribute("authrtCd").toString().equals("K01")){
			mav.setViewName("ma/switchAuthForAdmin");
			mav.addObject("authrtCd", getAuthrtCd());
			mav.addObject("bzmnSn", getBzmnSn());
			mav.addObject("ssoUserId", getSsoId());
			mav.addObject("ssoUserNm", getSsoName());
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
				e.printStackTrace();
			}
		}

		return mav;
	}

	/**
	 * 사용자 세션 전환 처리
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("switchSessionAuthrtCd")
	public ModelAndView switchSessionAuthrtCd(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		HttpSession session = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest().getSession();
		Map<String, Object> userData = getUserData();
		mav.setViewName("ma/main");

		userData.put("ssoUserId", paramsMap.get("userId"));
		userData.put("ssoUserNm", paramsMap.get("userNm"));
        userData.put("authrtCd", paramsMap.get("authrtCd"));
        if(paramsMap.get("bzmnSn") != null && paramsMap.get("bzmnSn") != "")
        	userData.put("bzmnSn", paramsMap.get("bzmnSn"));
        userData.put("cmptncZoneCd", paramsMap.get("cmptncZoneCd"));
        userData.put("userSn", paramsMap.get("userSn"));

        session.setAttribute("userData", userData);
        session.setAttribute("authrtCd", paramsMap.get("authrtCd"));

        // 메뉴
        Map<String, Object> heriracyMenuList = mainViewService.menuInfoList(request, userData);
        session.setAttribute("menuData", heriracyMenuList);

        paramsMap.put("typeCd", "사용자 전환");
        paramsMap.put("menuId", "PTS_SWITCH");
        paramsMap.put("userIp", getClientIP());
        paramsMap.put("userSn", Integer.parseInt(getUserSn()));
        paramsMap.put("url", request.getRequestURI().substring(request.getContextPath().length()));

        mainViewDao.insertUserConnLog(paramsMap);

        try {
            response.sendRedirect(request.getContextPath() + "/ma/main");
        } catch (IOException e) {
            throw new RimsException(e);
        }

		return mav;
	}

	/**
	 * 사용자 조회
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/myPage/myInfo.do")
	@ResponseBody
	public List<Map<String, Object>> selectmyInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException{
		paramsMap.put("userSn", getUserSn());
		return mypageService.myInfo(paramsMap);
	}

	/**
     * 자격확인이력 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("/myPage/drvVfcHist.do")
	@ResponseBody
    public Map<String, Object> selectdrvVfcHist(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        Map<String, Object> result = new HashMap<String, Object>();

        paramsMap.put("userSn", getUserSn());

        result.put("data" , mypageService.listView(paramsMap));
        result.put("total", mypageService.listViewCnt(paramsMap));

        return result;
    }

	/**
     * api 상태 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("/myPage/selectApiStts")
	@ResponseBody
    public Object ApiStts(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        paramsMap.put("userSn", getUserSn());

        return mypageService.selectApiStts(paramsMap);
    }

	/**
	 * 사용자 정보 수정
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/myPage/updateMyInfo.do")
	@ResponseBody
	public int updateMyInfo(@RequestBody Map<String, Object> paramsMap){

		return mypageService.updateMyInfo(paramsMap);
	}

	/**
	 * 사용자 탈퇴
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/myPage/updateMyWithdraw.do")
	@ResponseBody
	public int updateMyWithdraw(@RequestBody Map<String, Object> paramsMap){
		return mypageService.updateMyWithdraw(paramsMap);
	}

}