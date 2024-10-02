package kr.or.kotsa.rims.sys.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.sys.service.MenuService;

@Controller
@RequestMapping("sys")
public class MenuController {

	@Autowired
	private MenuService menuService;
    @Autowired
    private CmmnService cmmnService;
	/**
	 * 메뉴 관리 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("menu")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {


        paramsMap.put("url", "sys/menu");
        List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
        String tableName = tableNameData.get(0).get("menu_nm").toString();
        mav.addObject("tableName",tableName);

		mav.setViewName("sys/menu");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	/**
     * 메뉴관리 목록
     *
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    @RequestMapping("menu/selectMenuList")
    @ResponseBody
    public Map<String, Object> selectMenuList(@RequestBody Map<String, Object> paramsMap) throws RimsException {

    	return menuService.selectMenuList(paramsMap);
    }

	/**
     * 메뉴 등록
     *
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    @RequestMapping("menu/insertMenu")
    @ResponseBody
    public String insertMenu(@RequestBody Map<String, Object> paramsMap) throws RimsException {

        return menuService.insertMenu(paramsMap);

    }

	/**
     * 메뉴 수정
     *
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    @RequestMapping("menu/updateMenu")
    @ResponseBody
    public String updateMenu(@RequestBody Map<String, Object> paramsMap) throws RimsException {

        return menuService.updateMenu(paramsMap);
    }

    /**
     * 메뉴순서 수정
     *
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    @RequestMapping("menu/updateMenuOrdr")
    @ResponseBody
    public String updateMenuOrdr(@RequestBody Map<String, Object> paramsMap) throws RimsException {

        return menuService.updateMenuOrdr(paramsMap);
    }

    /**
     * 메뉴 삭제
     *
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    @RequestMapping("menu/updateDeleteMenu")
    @ResponseBody
    public String updateDeleteMenu(@RequestBody Map<String, Object> paramsMap) throws RimsException {

        return menuService.updateDeleteMenu(paramsMap);
    }

    /**
     * 메뉴 순서
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("menu/selectMenuOrdr")
	@ResponseBody
	public int MenuOrdr(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return menuService.selectMenuOrdr(paramsMap);
	}
	
	/**
	 * 메뉴 접근 권한
	 * @author 김경룡
	 * @date 2024-10-02
	 */
	@RequestMapping("menu/mnAccAuth")
	@ResponseBody
	public List<Map<String, Object>> mnAccAuth(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return menuService.mnAccAuth(paramsMap);
	}

}