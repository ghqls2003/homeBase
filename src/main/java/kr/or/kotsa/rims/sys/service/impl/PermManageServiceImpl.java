package kr.or.kotsa.rims.sys.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sys.service.PermManageService;

@Service
public class PermManageServiceImpl extends CmmnAbstractServiceImpl implements PermManageService {

	@Autowired
	private PermManageDao permManageDao;

	// 권한관리 리스트
	@Override
	public Map<String, Object> selectPermManageInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		int total = permManageDao.selectPermManageInfoCnt(paramsMap);
		List<Map<String, Object>> data = permManageDao.selectPermManageInfo(paramsMap);

		result.put("total", total);
		result.put("data", data);

		return result;
	}

	// 포털관리메뉴 리스트 (등록팝업)
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> selectPtsMenuInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> list = null;

		int menuNo = (int) paramsMap.get("tabNo");
		if(menuNo == 1) {
			list = permManageDao.selectPtsMenuInfo(paramsMap);
		}else if(menuNo == 2) {
			list = permManageDao.selectOpsMenuInfo(paramsMap);
		}

		List<Map<String, Object>> menuList1 = new ArrayList<>();

		for (Map<String, Object> map : list) {
		    String menuCode = (String) map.get("menu_cd");
		    String menuNm = (String) map.get("menu_nm");
		    boolean checked = false;
		    boolean expanded = true;
		    BigDecimal menuLevelDecimal = (BigDecimal) map.get("menu_level");
		    int menuLevel = menuLevelDecimal.intValue();

		    if (menuLevel == 1) {
		        Map<String, Object> menu1 = new HashMap<>();
		        menu1.put("menuCode", menuCode);
		        menu1.put("text", menuNm);
		        menu1.put("checked", checked);
		        menu1.put("expanded", expanded);
		        menuList1.add(menu1);
		    }

		    if (menuLevel == 2) {
		        int lastIndex = menuList1.size() - 1;
		        Map<String, Object> menu1 = menuList1.get(lastIndex);
		        List<Map<String, Object>> menuList2 = (List<Map<String, Object>>) menu1.get("items");

		        // 6번째 자리가 동일한 경우에만 menuList2에 추가
		        if (menuCode.length() >= 6 && menuCode.charAt(5) == ((String)menu1.get("menuCode")).charAt(5)) {
		        	if (menuList2 == null) {
		                menuList2 = new ArrayList<>();
		                menu1.put("items", menuList2);
		            }

		            Map<String, Object> menu2 = new HashMap<>();
		            menu2.put("menuCode", menuCode);
		            menu2.put("text", menuNm);
		            menu2.put("checked", checked);
		            menu2.put("expanded", expanded);
		            menuList2.add(menu2);
		        }
		    }
		}
		result.put("data", menuList1);

		return result;
	}

	// 포털관리메뉴 리스트 (상세팝업)
	@Override
	@SuppressWarnings("unchecked")
	public Map<String, Object> selectPerDetailInfo(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		List<Map<String, Object>> list = null;

		int menuNo = (int) paramsMap.get("tabNo");
		if(menuNo == 1) {
			list = permManageDao.selectPtsMenuInfo(paramsMap);
		}else if(menuNo == 2) {
			list = permManageDao.selectOpsMenuInfo(paramsMap);
		}
		List<Map<String, Object>> menuCheck = permManageDao.selectAuthMenuCheck(paramsMap);

		ArrayList<String> check = new ArrayList<>();

		for (Map<String, Object> menuChk : menuCheck) {
			String menuCode = (String) menuChk.get("menu_cd");
			check.add(menuCode);
		}

		List<Map<String, Object>> menuList1 = new ArrayList<>();

		for (Map<String, Object> map : list) {
		    String menuCode1 = (String) map.get("menu_cd");
		    String menuNm = (String) map.get("menu_nm");
		    boolean checked = false;
		    boolean expanded = true;
		    BigDecimal menuLevelDecimal = (BigDecimal) map.get("menu_level");
		    int menuLevel = menuLevelDecimal.intValue();

		    // 메뉴체크
		    for (String code : check) {
		        if(menuCode1.equals(code)) {
		        	checked = true;
		        }
		    }

		    if (menuLevel == 1) {
		        Map<String, Object> menu1 = new HashMap<>();
		        menu1.put("menuCode", menuCode1);
		        menu1.put("text", menuNm);
		        menu1.put("checked", checked);
		        menu1.put("expanded", expanded);
		        menuList1.add(menu1);
		    }

		    if (menuLevel == 2) {
		        int lastIndex = menuList1.size() - 1;
		        Map<String, Object> menu1 = menuList1.get(lastIndex);
		        List<Map<String, Object>> menuList2 = (List<Map<String, Object>>) menu1.get("items");

		        // 6번째 자리가 동일한 경우에만 menuList2에 추가
		        if (menuCode1.length() >= 6 && menuCode1.charAt(5) == ((String)menu1.get("menuCode")).charAt(5)) {
		        	if (menuList2 == null) {
		                menuList2 = new ArrayList<>();
		                menu1.put("items", menuList2);
		            }

		            Map<String, Object> menu2 = new HashMap<>();
		            menu2.put("menuCode", menuCode1);
		            menu2.put("text", menuNm);
		            menu2.put("checked", checked);
		            menu2.put("expanded", expanded);
		            menuList2.add(menu2);
		        }
		    }
		}

		result.put("data", menuList1);

		return result;
	}

	// 등록
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> insertAuth(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

	    int insertAuth = permManageDao.insertAuth(paramsMap);
	    if(insertAuth > 0) {
	    	ArrayList<Map<String, Object>> menuDataList = (ArrayList<Map<String, Object>>) paramsMap.get("checkedItems");
		    Map<String, Object> menuMap = new HashMap<>();
		    String authrtCd = (String) paramsMap.get("authrtCd");
		    String rgtrSn = (String) paramsMap.get("rgtrSn");
		    String regIp = (String) paramsMap.get("regIp");

		    for (Map<String, Object> menuData : menuDataList) {
		        Boolean checked = (Boolean) menuData.get("checked");
		        String menuCode = (String) menuData.get("menuCode");
		        menuMap.put("authrtCd", authrtCd);
		        menuMap.put("menuCd", menuCode);
		        menuMap.put("useYn", checked ? "Y" : "N");
		        menuMap.put("rgtrSn", rgtrSn);
		        menuMap.put("regIp", regIp);
		        permManageDao.insertAuthMenu(menuMap);
		    }

	    	result.put("message", "권한 등록이 완료 되었습니다.");
	    	return result;
	    }else {
	    	result.put("message", "에러");
	    	return result;
	    }
	}

	// 수정
	@SuppressWarnings("unchecked")
	@Override
	public Map<String, Object> updateAuth(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		int updateAuth = permManageDao.updateAuth(paramsMap);

	    if(updateAuth > 0) {
	    	ArrayList<Map<String, Object>> menuDataList = (ArrayList<Map<String, Object>>) paramsMap.get("checkedItems");
		    Map<String, Object> menuMap = new HashMap<>();
		    String authrtCd = (String) paramsMap.get("authrtCd");
		    String mdfrSn = (String) paramsMap.get("mdfrSn");
		    String mdfcnIp = (String) paramsMap.get("mdfcnIp");

		    for (Map<String, Object> menuData : menuDataList) {
		        Boolean checked = (Boolean) menuData.get("checked");
		        String menuCode = (String) menuData.get("menuCode");
		        menuMap.put("authrtCd", authrtCd);
		        menuMap.put("menuCd", menuCode);
		        menuMap.put("useYn", checked ? "Y" : "N");
		        menuMap.put("mdfrSn", mdfrSn);
		        menuMap.put("mdfcnIp", mdfcnIp);
		        permManageDao.updateAuthMenu(menuMap);
		    }
	    	result.put("message", "권한 수정이 완료 되었습니다.");
	    	return result;
	    }else {
	    	result.put("message", "에러");
	    	return result;
	    }
	}

	// 삭제
	@Override
	public Map<String, Object> deleteAuth(Map<String, Object> paramsMap) {
		Map<String, Object> result = new HashMap<>();

		// 권한정보 삭제
		Map<String, Object> menuMap = new HashMap<>();
		String authrtCd = (String) paramsMap.get("authrtCd");
		menuMap.put("authrtCd", authrtCd);
		int deleteAuth = permManageDao.deleteAuth(paramsMap);

		if(deleteAuth > 0) {
			// 권한메뉴 삭제
			int authMemu = permManageDao.deleteAuthMenu(paramsMap);

			if(authMemu > 0) {
				result.put("message", "권한 삭제가 완료 되었습니다.");
				return result;
			}else {
				result.put("message", "에러");
				return result;
			}
		}else {
			result.put("message", "에러");
			return result;
		}

	}

}
