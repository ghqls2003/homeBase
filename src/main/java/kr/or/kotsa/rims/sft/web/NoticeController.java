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
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sft.service.NoticeService;

@Controller
@RequestMapping("sft")
public class NoticeController extends CmmnAbstractServiceImpl {

	@Autowired
	private NoticeService noticeService;


	@Autowired
	private CmmnService cmmnService;
	/**
	 * 공지사항 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("notice")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {

		paramsMap.put("url", "sft/notice");
		List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
		String tableName = tableNameData.get(0).get("menu_nm").toString();
		mav.addObject("tableName",tableName);


		mav.addObject("notice", paramsMap.get("notice"));
		mav.addObject("authrtCd", getAuthrtCd());
		mav.setViewName("sft/notice");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	/**
	 * 공지사항 상세 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("noticeDetail")
	public ModelAndView viewDetail(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
			HttpServletRequest request, HttpServletResponse response) throws RimsException {
		mav.setViewName("sft/noticeDetail");
		mav.addObject("error", request.getAttribute("error"));
		return mav;
	}

	/**
     * 공지사항 리스트
     * @param paramsMap
     * @return
     * @throws RimsException
     */
	@RequestMapping("notice/selectNoticeList")
	@ResponseBody
	public Map<String, Object> selectNoticeList(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return noticeService.selectNoticeList(paramsMap);
	}

	/**
	 * 공지사항 상세
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("notice/selectDetailNoticeInfo")
	@ResponseBody
	public Map<String, Object> selectDetailNoticeInfo(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return noticeService.selectDetailNoticeInfo(paramsMap);
	}

	/**
	 * 공지사항 등록
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("notice/insertNotice")
	@ResponseBody
	public Object insertNotice(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return noticeService.insertNotice(paramsMap);
	}

	/**
	 * 공지사항 수정
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("notice/updateNotice")
	@ResponseBody
	public Object updateNotice(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return noticeService.updateNotice(paramsMap);
	}

	/**
	 * 공지사항 삭제
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("notice/updateDeleteNotice")
	@ResponseBody
	public Object updateDeleteNotice(@RequestBody Map<String, Object> paramsMap) throws RimsException {

		return noticeService.updateDeleteNotice(paramsMap);
	}
}