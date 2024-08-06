package kr.or.kotsa.rims.api.web;

import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.util.Date;
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

import kr.or.kotsa.rims.api.service.ApiListService;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;

@Controller
@RequestMapping("api")
public class ApiListController extends CmmnAbstractServiceImpl {

	private static final int TOO_MANY_ROWS = 50000;

	@Autowired
	private ApiListService apiListService;
	@Autowired
	private CmmnService cmmnService;
	/**
	 *
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/apiList")
	public ModelAndView viewApiList(@RequestParam Map<String, Object> paramsMap, ModelAndView mav, HttpServletRequest request,
			HttpServletResponse response) throws RimsException {

		paramsMap.put("url", "api/apiList");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName",tableName);


		mav.addObject("UserSn", getUserSn());
		mav.setViewName("api/apiList");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	@RequestMapping("apiList/listView")
	@ResponseBody
	public Object selectlistApiList(@RequestBody Map<String, Object> paramsMap, HttpServletRequest request,
			HttpServletResponse response) throws RimsException {
		ModelAndView mav = new ModelAndView("jsonView");
		int total = apiListService.selectlistViewCnt(paramsMap);

		paramsMap.put("total", total);
		paramsMap.put("userSn", getUserSn());
		
		mav.addObject("data_req", apiListService.selectlistViewReq(paramsMap));
		mav.addObject("data_res", apiListService.selectlistViewRes(paramsMap));
		mav.addObject("total", total);

		return mav;
	}
	

}
