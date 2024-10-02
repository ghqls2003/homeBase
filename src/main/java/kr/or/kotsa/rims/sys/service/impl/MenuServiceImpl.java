package kr.or.kotsa.rims.sys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sys.service.MenuService;

@Service
public class MenuServiceImpl extends CmmnAbstractServiceImpl implements MenuService {

	@Autowired
	private MenuDao menuDao;

	//메뉴관리 목록
	public Map<String, Object> selectMenuList(Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<>();
		paramsMap.put("menuDiv", "PMNU");
		List<Map<String, Object>> pts = menuDao.selectMenuList(paramsMap);
		paramsMap.put("menuDiv", "OMNU");
		List<Map<String, Object>> ops = menuDao.selectMenuList(paramsMap);

		result.put("pts", pts);
		result.put("ops", ops);
		return result;
	}

	//메뉴 등록
	public String insertMenu(Map<String, Object> paramsMap) {
		menuDao.insertMenu(paramsMap);

		return "success";
	}

	//메뉴 수정
	public String updateMenu(Map<String, Object> paramsMap) {
		menuDao.updateMenu(paramsMap);

		return "success";
	}

	//메뉴순서 수정
	public String updateMenuOrdr(Map<String, Object> paramsMap) {
		menuDao.updateMenuOrdr(paramsMap);
		menuDao.updateSub(paramsMap);

		return "success";
	}

	//메뉴 삭제
	public String updateDeleteMenu(Map<String, Object> paramsMap) {
		menuDao.updateDeleteMenu(paramsMap);

		if(paramsMap.get("upMenuCd")=="")
			menuDao.updateDeleteMenuSub(paramsMap);

		return "success";
	}

	//메뉴 순서
	public int selectMenuOrdr(Map<String, Object> paramsMap) throws RimsException {
		return menuDao.selectMenuOrdr(paramsMap);
	}
	
	//메뉴 접근 권한
	public List<Map<String, Object>> mnAccAuth(Map<String, Object> paramsMap) throws RimsException {
		return menuDao.mnAccAuth(paramsMap);
	}

}
