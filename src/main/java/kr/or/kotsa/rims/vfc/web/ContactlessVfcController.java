package kr.or.kotsa.rims.vfc.web;

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
import kr.or.kotsa.rims.vfc.service.ContactlessVfcService;

@Controller
@RequestMapping("vfc")
public class ContactlessVfcController extends CmmnAbstractServiceImpl {

	@Autowired
	private ContactlessVfcService contactlessVfcService;

	/**
	 * 자격검증 화면
	 *
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@RequestMapping("contactlessVfc")
	public ModelAndView viewMain(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
								 HttpServletRequest request, HttpServletResponse response) throws RimsException {
		return mav;
	}

	@RequestMapping("contactlessVfc/selectRentInfo")
	@ResponseBody
    public List<Map<String, Object>> selectlistView(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        return contactlessVfcService.selectRentInfo(paramsMap);
    }
}