package kr.or.kotsa.rims.sys.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.kotsa.rims.cmmn.biz.service.CmmnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.cmmn.sys.util.GenericExcelView;
import kr.or.kotsa.rims.sys.service.UsermanageService;

@Controller
@RequestMapping("sys")
public class UsermanageController extends CmmnAbstractServiceImpl {

    @Resource(name = "usermanageService")
    private UsermanageService usermanageService;
    @Autowired
    private CmmnService cmmnService;

    /**
     * 사용자관리 화면
     *
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    @RequestMapping("/usermanage")
    public ModelAndView viewUsermanage(@RequestParam Map<String, Object> paramsMap, ModelAndView mav,
                                       HttpServletRequest request, HttpServletResponse response) throws RimsException {

        paramsMap.put("url", "sys/usermanage");
        List<Map<String, Object>> tableNameData = cmmnService.findTableNameByUrl(paramsMap);
        String tableName = tableNameData.get(0).get("menu_nm").toString();
        mav.addObject("tableName", tableName);

        mav.setViewName("sys/usermanage");
        return mav;
    }

    @RequestMapping("/usermanage/userListView")
    @ResponseBody
    public ModelAndView selectlistView(@RequestBody Map<String, Object> paramsMap) {

        List<Map<String, Object>> list;
        int total;
        paramsMap.put("LoginUserAuthrtCd", getAuthrtCd());
        // G01(지자체담당자)일 경우 해당 시군구만 조회가능
        if (getAuthrtCd().equals("G01")) {

            paramsMap.put("cmptnc_zone_cd", getCmptncZoneCd());

            list = usermanageService.listView(paramsMap);
            total = usermanageService.listViewCnt(paramsMap);
        } else if (getAuthrtCd().equals("K01") || getAuthrtCd().equals("M01") || getAuthrtCd().equals("Z01")) {

            list = usermanageService.listView(paramsMap);
            total = usermanageService.listViewCnt(paramsMap);

        } else if (getAuthrtCd().equals("S01")) {

            paramsMap.put("LoginUserBzmnSn", getBzmnSn());
            paramsMap.put("cmptnc_zone_cd", getCmptncZoneCd());

            list = usermanageService.listView(paramsMap);
            total = usermanageService.listViewCnt(paramsMap);

        } else {
            list = usermanageService.listView(paramsMap);
            total = usermanageService.listViewCnt(paramsMap);
        }

        ModelAndView mav = new ModelAndView("jsonView");

        mav.addObject("data", list);
        mav.addObject("total", total);

        return mav;
    }

    @RequestMapping("/usermanage/selectCompanyList")
    @ResponseBody
    public Map<String, Object> CompanyList(@RequestBody Map<String, Object> paramsMap) {
        return usermanageService.selectCompanyList(paramsMap);
    }

    @RequestMapping("/usermanage/selectAuth.do")
    @ResponseBody
    public List<Map<String, Object>> Auth(@RequestBody Map<String, Object> paramsMap) {
        return usermanageService.selectAuth(paramsMap);
    }

    @RequestMapping("/usermanage/selectSttsCd.do")
    @ResponseBody
    public List<Map<String, Object>> SttsCd(@RequestBody Map<String, Object> paramsMap) {
        return usermanageService.selectSttsCd(paramsMap);
    }

    @RequestMapping(value = "/usermanage/selectBzmnSe.do")
    @ResponseBody
    public List<Map<String, Object>> BzmnSe(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        return usermanageService.selectBzmnSe(paramsMap);
    }

    @RequestMapping(value = "/usermanage/selectCtpvNm.do")
    @ResponseBody
    public List<Map<String, Object>> CtpvNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        return usermanageService.selectCtpvNm(paramsMap);
    }

    @RequestMapping(value = "/usermanage/selectSggNm.do")
    @ResponseBody
    public List<Map<String, Object>> SggNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        return usermanageService.selectSggNm(paramsMap);
    }

    @RequestMapping(value = "/usermanage/selectAuthrtNm.do")
    @ResponseBody
    public List<Map<String, Object>> AuthrtNm(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        return usermanageService.selectAuthrtNm(paramsMap);
    }

    @RequestMapping(value = "/usermanage/selectBsnStts.do")
    @ResponseBody
    public List<Map<String, Object>> BsnStts(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        return usermanageService.selectBsnStts(paramsMap);
    }

    @RequestMapping("/usermanage/selectIdDupChk.do")
    @ResponseBody
    public int IdDupChk(@RequestBody Map<String, Object> paramsMap) {
        return usermanageService.selectIdDupChk(paramsMap);
    }

    @RequestMapping("/usermanage/updateDeleteUser.do")
    @ResponseBody
    public int updateDeleteUser(@RequestBody Map<String, Object> paramsMap) {
        paramsMap.put("mdfrSn", getUserSn());
        paramsMap.put("mdfcnIp", getClientIP());
        return usermanageService.updateDeleteUser(paramsMap);
    }

    @RequestMapping("/usermanage/selectAdminDetailInfo")
    @ResponseBody
    public List<Map<String, Object>> selectAdminDetailInfo(@RequestBody Map<String, Object> paramsMap) {
        return usermanageService.selectAdminDetailInfo(paramsMap);
    }

    @RequestMapping("/usermanage/selectUserDetailInfo")
    @ResponseBody
    public Map<String, Object> selectUserDetailInfo(@RequestBody Map<String, Object> paramsMap) {

        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> list = usermanageService.selectUserDetailInfo(paramsMap);
        result.put("data", list);
        result.put("loginAuthrtCd", getAuthrtCd());

        return result;
    }

    @RequestMapping(value = "/usermanage/selectApproveStts.do")
    @ResponseBody
    public Map<String, Object> ApproveStts(@RequestBody Map<String, Object> paramsMap) throws RimsException {
        return usermanageService.selectApproveStts(paramsMap);
    }

    @RequestMapping("/usermanage/updateApprove.do")
    @ResponseBody
    public int updateApprove(@RequestBody Map<String, Object> paramsMap) {
        paramsMap.put("mdfrSn", getUserSn());
        paramsMap.put("mdfcnIp", getClientIP());
        return usermanageService.updateApprove(paramsMap);
    }

    @RequestMapping("/usermanage/updateReject.do")
    @ResponseBody
    public int updateReject(@RequestBody Map<String, Object> paramsMap) {
        paramsMap.put("mdfrSn", getUserSn());
        paramsMap.put("mdfcnIp", getClientIP());
        return usermanageService.updateReject(paramsMap);
    }

    @RequestMapping("/usermanage/updateLock.do")
    @ResponseBody
    public int updateLock(@RequestBody Map<String, Object> paramsMap) {
        paramsMap.put("mdfrSn", getUserSn());
        paramsMap.put("mdfcnIp", getClientIP());
        return usermanageService.updateLock(paramsMap);
    }

    @RequestMapping("/usermanage/updateUnlock.do")
    @ResponseBody
    public int updateUnlock(@RequestBody Map<String, Object> paramsMap) {
        paramsMap.put("mdfrSn", getUserSn());
        paramsMap.put("mdfcnIp", getClientIP());
        return usermanageService.updateUnlock(paramsMap);
    }

    @RequestMapping("/usermanage/updateLongterm.do")
    @ResponseBody
    public int updateLongterm(@RequestBody Map<String, Object> paramsMap) {
        paramsMap.put("mdfrSn", getUserSn());
        paramsMap.put("mdfcnIp", getClientIP());
        return usermanageService.updateLongterm(paramsMap);
    }

    @RequestMapping("/usermanage/updateReleaseStop.do")
    @ResponseBody
    public int updateReleaseStop(@RequestBody Map<String, Object> paramsMap) {
        paramsMap.put("mdfrSn", getUserSn());
        paramsMap.put("mdfcnIp", getClientIP());
        return usermanageService.updateReleaseStop(paramsMap);
    }

    @RequestMapping("/usermanage/updateWithdraw.do")
    @ResponseBody
    public int updateWithdraw(@RequestBody Map<String, Object> paramsMap) {
        paramsMap.put("mdfrSn", getUserSn());
        paramsMap.put("mdfcnIp", getClientIP());
        return usermanageService.updateWithdraw(paramsMap);
    }

    @RequestMapping("/usermanage/updateUserInfo.do")
    @ResponseBody
    public int updateAdminInfo(@RequestBody Map<String, Object> paramsMap) {
        paramsMap.put("mdfrSn", getUserSn());
        paramsMap.put("mdfcnIp", getClientIP());

        return usermanageService.updateUserInfo(paramsMap);
    }

    @RequestMapping("/usermanage/selectAuthrtCd.do")
    @ResponseBody
    public Map<String, Object> AuthrtCd(@RequestBody Map<String, Object> paramsMap) {


        paramsMap.put("authrtCd", getAuthrtCd());

        if (getCmptncZoneCd() != null && getCmptncZoneCd().matches("\\d+")) {
            paramsMap.put("cmptncZoneCd", getCmptncZoneCd());
            paramsMap.put("ctpvCd", getCmptncZoneCd().substring(0, 2));
            paramsMap.put("sggCd", getCmptncZoneCd().substring(2, 5));
        }

        return paramsMap;
    }

    // 사용자 관리 엑셀다운로드
    @PostMapping("/usermanage/excelDown")
    public GenericExcelView excelDown(@RequestBody Map<String, Object> paramsMap, Map<String, Object> modelMap,
                                      HttpServletRequest request, HttpServletResponse response) throws RimsException {
        String fileName = "사용자 관리";
        String colName[] = {"순번", "권한코드", "권한명", "아이디", "성명", "관할지역", "회사명", "계정상태", "이메일", "휴대폰", "보조연락처", "가입승인일"};
        String valName[] = {"rn", "authrt_cd", "authrt_nm", "user_id", "user_nm", "sdsgg_nm", "co_nm", "stts_cd", "eml_addr", "user_tel", "assi_telno", "reg_dt"};

        List<Map<String, Object>> colValue;
        int total;
        paramsMap.put("LoginUserAuthrtCd", getAuthrtCd());
        // G01(지자체담당자)일 경우 해당 시군구만 조회가능
        if (getAuthrtCd().equals("G01")) {

            paramsMap.put("cmptnc_zone_cd", getCmptncZoneCd());

            colValue = usermanageService.listView(paramsMap);
            total = usermanageService.listViewCnt(paramsMap);
        } else if (getAuthrtCd().equals("K01") || getAuthrtCd().equals("M01") || getAuthrtCd().equals("Z01")) {

            colValue = usermanageService.listView(paramsMap);
            total = usermanageService.listViewCnt(paramsMap);

        } else if (getAuthrtCd().equals("S01")) {

            paramsMap.put("LoginUserBzmnSn", getBzmnSn());
            paramsMap.put("cmptnc_zone_cd", getCmptncZoneCd());

            colValue = usermanageService.listView(paramsMap);
            total = usermanageService.listViewCnt(paramsMap);

        } else {
            colValue = usermanageService.listView(paramsMap);
            total = usermanageService.listViewCnt(paramsMap);
        }

        modelMap.put("excelName", fileName);
        modelMap.put("colName", colName);
        modelMap.put("valName", valName);
        modelMap.put("colValue", colValue);
        paramsMap.put("total", total);

        return new GenericExcelView();
    }

}