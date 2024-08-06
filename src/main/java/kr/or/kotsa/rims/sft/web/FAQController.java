package kr.or.kotsa.rims.sft.web;

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
import kr.or.kotsa.rims.sft.service.FAQService;

@Controller
@RequestMapping("sft")
public class FAQController {

	@Autowired
	private FAQService faqService;
	@Autowired
	private CmmnService cmmnService;
	/**
	 * FAQ 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("faq")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		paramsMap.put("url", "sft/faq");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName",tableName);

		mav.setViewName("sft/faq");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	/**
     * FAQ 리스트
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("faq/selectFAQList")
	@ResponseBody
	public Map<String, Object> selectFAQList(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return faqService.selectFAQList(paramsMap);
	}

}