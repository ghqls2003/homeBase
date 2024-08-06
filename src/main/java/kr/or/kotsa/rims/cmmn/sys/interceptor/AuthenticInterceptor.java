package kr.or.kotsa.rims.cmmn.sys.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.ModelAndViewDefiningException;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

/**
 * 인증여부 체크 인터셉터
 *
 * @author 공통서비스 개발팀 서준식
 * @version 1.0
 * @see <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2011.07.01  서준식          최초 생성
 *  2011.09.07  서준식          인증이 필요없는 URL을 패스하는 로직 추가
 *      </pre>
 * @since 2011.07.01
 */
public class AuthenticInterceptor extends HandlerInterceptorAdapter {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticInterceptor.class);


    /**
     * 세션에 계정정보(userData)가 있는지 여부로 인증 여부를 체크한다. 계정정보(userData)가 없다면, 로그인 페이지로
     * 이동한다.
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws ServletException {

//        HttpSession session = request.getSession();
//
//        Map<String, Object> userData = (Map<String, Object>) session.getAttribute("userData");
//
//        String reqUrl = request.getRequestURI().substring(request.getContextPath().length());
//
//        logger.info("preHandle reqUrl = {}",reqUrl);
//
//        if(session.getAttribute("isTiPage") == null) {
//            session.setAttribute("isTiPage", "N");
//        }
//
//        if (userData == null) {
//            //ajax session 만료 처리
//            if (isAjaxRequest(request)) {
//                try {
//                    response.sendError(403);
//                } catch (IOException e) {
//                    logger.error("IOException");
//                }
//                return false;
//            } else {
//
//                if (("/mm/login").equals(reqUrl) || ("/ti/login").equals(reqUrl) || ("/mo/login").equals(reqUrl)) {
//                    return true;
//                }
//
//                String old_url = request.getHeader("referer");
//
//                if(old_url == null){
//                	ModelAndView modelAndView = new ModelAndView("redirect:/mm/login");
//                    throw new ModelAndViewDefiningException(modelAndView);
//                }else if(old_url.contains("/ti/")){ //설치관리 세션 만료
//                    ModelAndView modelAndView = new ModelAndView("redirect:/ti/login");
//                    throw new ModelAndViewDefiningException(modelAndView);
//                }else if(old_url.contains("/mo/")){ //모바일 세션 만료
//                    ModelAndView modelAndView = new ModelAndView("redirect:/mo/login");
//                    throw new ModelAndViewDefiningException(modelAndView);
//                }else{
//                    ModelAndView modelAndView = new ModelAndView("redirect:/mm/login");
//                    throw new ModelAndViewDefiningException(modelAndView);
//                }
//            }
//
//        }
//        else {
//            // userData가 있고,
//            // 이전 주소가 ti를 포함하고있고, 현재 주소가 ti가 아닌 주소일때
//            if(session.getAttribute("isTiPage").toString() == "Y" && !reqUrl.contains("/ti/")) {
//
//                if (("/mm/login").equals(reqUrl) || ("/ti/login").equals(reqUrl) || ("/mo/login").equals(reqUrl)){
//                    session.invalidate();
////                    session.setMaxInactiveInterval(1);
//
//                    ModelAndView modelAndView = new ModelAndView("redirect:" + reqUrl);
//                    throw new ModelAndViewDefiningException(modelAndView);
//                }
//
//                if(session.getAttribute("isPwUpdate").toString() == "Y") {
//                    ModelAndView modelAndView = new ModelAndView("TMN.ti/trmnlInstLoginUpdate");
//                    throw new ModelAndViewDefiningException(modelAndView);
//                }
//                else {
//                    ModelAndView modelAndView = new ModelAndView("TMN.ti/gnrlzSttusList");
////                    ModelAndView modelAndView = new ModelAndView("TMN.ti/gnrlzSttusListTest");
//                    throw new ModelAndViewDefiningException(modelAndView);
//                }
//            }
//            else {
//                if ("00".equals(userData.get("confmCd"))) {
//                        if(!(("/mm/authRegist").equals(reqUrl) || ("/mm/authRequest").equals(reqUrl))){
//                            ModelAndView modelAndView = new ModelAndView("redirect:/mm/authRegist");
//                            throw new ModelAndViewDefiningException(modelAndView);
//                        }
//                    } else if ("01".equals(userData.get("confmCd"))) {
//                        if(!("/mm/authRegistStatus").equals(reqUrl)) {
//                            ModelAndView modelAndView = new ModelAndView("redirect:/mm/authRegistStatus");
//                            throw new ModelAndViewDefiningException(modelAndView);
//                        }
//                    } else if ("03".equals(userData.get("confmCd"))) { // 반려상태
//                        if(!("/mm/authRegistStatus").equals(reqUrl) && !("/mm/authRequest").equals(reqUrl)) {
//                            ModelAndView modelAndView = new ModelAndView("redirect:/mm/authRegistStatus");
//                            throw new ModelAndViewDefiningException(modelAndView);
//                        }
//                    } else if (("/mm/login").equals(reqUrl)) {
//                        ModelAndView modelAndView = new ModelAndView("redirect:/vm/rltmCntrl");
//                        throw new ModelAndViewDefiningException(modelAndView);
//                    } else if (("/mo/login").equals(reqUrl)) {
//                        ModelAndView modelAndView = new ModelAndView("redirect:/mo/trnsplanMoList");
//                        throw new ModelAndViewDefiningException(modelAndView);
//                    } else if (("/ti/login").equals(reqUrl)) {
//                        ModelAndView modelAndView = new ModelAndView("redirect:/ti/gnrlzSttusList");
//                        throw new ModelAndViewDefiningException(modelAndView);
//                } /* else if (("/mm/main").equals(reqUrl)) {
//                return true;
//            } else {
//
//                //허용되지 않은 메뉴 접근 처리
//              List<Map<String, Object>> menuList = (List<Map<String, Object>>) session.getAttribute("menuData");
//
//                Boolean prohibitUrl = true;
//
//                for(Map menuUrl : menuList){
//                    List<Map<String, Object>> subMenuList = (List<Map<String, Object>>) menuUrl.get("subMenuList");
//                    for(Map subUrl : subMenuList){
//
//                        String test = (String) subUrl.get("menuUrl");
//                        if(test.equals(reqUrl)){
//                            prohibitUrl = false;
//                            break;
//                        }
//                    }
//                }
//
//                if(prohibitUrl){
//                    ModelAndView modelAndView = new ModelAndView("redirect:/mm/main");
//                    throw new ModelAndViewDefiningException(modelAndView);
//                }
//
//            }*/
//            }
//        }

        return true;
    }

    /**
     * ajax 호출여부를 확인한다.
     */
    private boolean isAjaxRequest(HttpServletRequest request) {
        String header = request.getHeader("x-requested-with");
        if (header != null && header.equals("XMLHttpRequest"))
            return true;
        else
            return false;
    }


}
