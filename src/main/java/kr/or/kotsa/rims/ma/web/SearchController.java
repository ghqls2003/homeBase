package kr.or.kotsa.rims.ma.web;

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

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.ma.service.SearchService;

@Controller
@RequestMapping("ma")
public class SearchController extends CmmnAbstractServiceImpl {

	@Autowired
	private SearchService searchService;

	/**
	 * 문의하기 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("Search")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		String auth = getAuthrtCd();
//		System.out.println("AUTHTHTHTHTH" + auth);
		Boolean guestSearch = false;

		if (auth == null || auth.trim().isEmpty()) {
			guestSearch = true;
		} 
		mav.addObject("Search", paramsMap.get("searchword"));
		mav.addObject("guestSearch", guestSearch);
		mav.addObject("auth", auth);
		mav.setViewName("ma/Search");
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
	@RequestMapping("search/selectinquiry")
	@ResponseBody
	public Map<String, Object> selectinquiry(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return searchService.selectinquiry(paramsMap);
	}

	/**
	 * 공지사항 리스트
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("search/selectNoticeList")
	@ResponseBody
	public Map<String, Object> selectNoticeList(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return searchService.selectNoticeList(paramsMap);
	}

	/**
	 * FAQ 리스트
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("search/selectFAQList")
	@ResponseBody
	public Map<String, Object> selectFAQList(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return searchService.selectFAQList(paramsMap);
	}

	/**
	 * 문의하기 리스트
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("search/selectComment")
	@ResponseBody
	public List<Map<String, Object>> selectComment(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return searchService.selectComment(paramsMap);
	}

	/**
	 * 문의하기 상세
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("search/selectDetailInquiryInfo")
	@ResponseBody
	public Map<String, Object> selectDetailinquiryInfo(@RequestBody Map<String, Object> paramsMap)
			throws RimsException {

		return searchService.selectDetailinquiryInfo(paramsMap);
	}

	/**
	 * 문의하기 등록
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */

	@RequestMapping("/search/insertInquiry")
	@ResponseBody
	public int insertInquiry(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("mdfrSn", getUserSn());
//			paramsMap.put("mdfcnIp", getClientIP());
//			System.out.println("------d--> " +  paramsMap);
		return searchService.insertInquiry(paramsMap);
	}

	/**
	 * 문의하기 댓글작성
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("/search/Insertreply")
	@ResponseBody
	public int insertreply(@RequestBody Map<String, Object> paramsMap) {
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());
		paramsMap.put("authrtCd", getAuthrtCd());
//			System.out.println("------d--> " +  paramsMap);
		return searchService.Insertreply(paramsMap);
	}

	/**
	 * 문의하기 댓글보기
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("search/selectinquiryReply")
	@ResponseBody
	public Map<String, Object> selectinquiryReply(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return searchService.selectinquiryReply(paramsMap);
	}

	/**
	 * 메뉴
	 * 
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("search/menuShow")
	@ResponseBody
	public List<Map<String, Object>> selectmenuShow(@RequestBody Map<String, Object> paramsMap) throws RimsException {
		return searchService.selectmenuShow(paramsMap);
	}
}