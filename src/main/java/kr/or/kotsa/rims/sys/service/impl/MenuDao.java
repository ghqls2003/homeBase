package kr.or.kotsa.rims.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class MenuDao extends CmmnAbstractMapper {

	//메뉴관리 목록
    public List<Map<String, Object>> selectMenuList(Map<String, Object> paramsMap) throws RimsException {
        return selectList("sys.menu.selectMenuList", paramsMap);
    }

    //메뉴 등록
    public void insertMenu(Map<String, Object> paramsMap) {
		insert("sys.menu.insertMenu", paramsMap);
	}

    //메뉴 수정
	public void updateMenu(Map<String, Object> paramsMap) {
		update("sys.menu.updateMenu", paramsMap);
	}

	//메뉴순서 수정
	public void updateMenuOrdr(Map<String, Object> paramsMap) {
		update("sys.menu.updateMenuOrdr", paramsMap);
	}

	public void updateSub(Map<String, Object> paramsMap) {
		update("sys.menu.updateSub", paramsMap);
	}

	//메뉴 삭제
	public void updateDeleteMenu(Map<String, Object> paramsMap) {
		update("sys.menu.updateDeleteMenu", paramsMap);
	}

	//하위메뉴 삭제
	public void updateDeleteMenuSub(Map<String, Object> paramsMap) {
		update("sys.menu.updateDeleteMenuSub", paramsMap);
	}

	//메뉴 순서
	public int selectMenuOrdr(Map<String, Object> paramsMap) throws RimsException {
        return selectOne("sys.menu.selectMenuOrdr", paramsMap);
    }
	
	//메뉴 접근 권한
	public List<Map<String, Object>> mnAccAuth(Map<String, Object> paramsMap) throws RimsException {
		return selectList("sys.menu.mnAccAuth", paramsMap);
	}

}
