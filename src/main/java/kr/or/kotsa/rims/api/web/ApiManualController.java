package kr.or.kotsa.rims.api.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
@Controller
@RequestMapping("api")
public class ApiManualController extends CmmnAbstractServiceImpl {

	private static final int TOO_MANY_ROWS = 50000;
	@Autowired
	private CmmnService cmmnService;
//	@Autowired
//	private ApiViewService2 apiViewService2;
	/**
	 * API이용안내
	 *
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/apiManual")
	public ModelAndView viewapiManual(@RequestParam Map<String, Object> paramsMap, ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws RimsException {

		paramsMap.put("url", "api/apiManual");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName",tableName);


		mav.addObject("UserSn",getUserSn());
		mav.setViewName("api/apiManual");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}
	
	
}
