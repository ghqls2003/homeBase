package kr.or.kotsa.rims.sys.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface MenuService {

	//메뉴관리 목록
	public Map<String, Object> selectMenuList(Map<String, Object> paramsMap) throws RimsException;

	//메뉴 등록
	public String insertMenu(Map<String, Object> paramsMap);

	//메뉴 수정
	public String updateMenu(Map<String, Object> paramsMap);

	//메뉴순서 수정
	public String updateMenuOrdr(Map<String, Object> paramsMap);

	//메뉴 삭제
	public String updateDeleteMenu(Map<String, Object> paramsMap);

	//메뉴 순서
	public int selectMenuOrdr(Map<String, Object> paramsMap) throws RimsException;
	
	//메뉴 접근 권한
	public List<Map<String, Object>> mnAccAuth(Map<String, Object> paramsMap) throws RimsException;

}