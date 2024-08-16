package kr.or.kotsa.rims.ma.service.impl;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class MainViewDao extends CmmnAbstractMapper {

    /**
     * 메인 지도 조회
     * @param paramsMap
     * @return List<Map<String, Object>>
     * @throws RimsException
     */
	public List<Map<String, Object>> selectShpMap(Map<String, Object> paramsMap)throws RimsException {
		String agencyCheck = (String) selectOne("ma.main.agencyCheck", paramsMap);
		if ("Y".equals(agencyCheck)) {
			return selectList("ma.main.selectHardCodeShpMap", paramsMap);
		}
		
		return selectList("ma.main.selectShpMap", paramsMap);
	}

	 /**
     * 공지사항 조회
     * @param paramsMap
     * @return List<Map<String, Object>>
     * @throws RimsException
     */
	public List<Map<String, Object>> searchTopNotice(Map<String, Object> paramsMap)throws RimsException {
		return selectList("ma.main.searchTopNotice", paramsMap);
	}

	 /**
     * 메뉴정보 조회
     *
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    public List<Map<String, Object>> selectMenuInfo (Map<String, Object> paramsMap) throws RimsException {
        return selectList("ma.main.selectMenuInfo", paramsMap);
    }
    /**
     * 현재 메뉴ID 조회
     *
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    public String selectMenuCd(Map<String, Object> paramsMap) throws RimsException {
        return (String) selectOne("ma.main.selectMenuCd", paramsMap);
    }
    
    /**
     * 전체 메뉴조회
     * @param paramsMap
     * @return List<Map<String, Object>>
     * @throws RimsException
     */
    public List<Map<String, Object>> selectAllMenu() throws RimsException {
        return selectList("ma.main.selectAllMenu");
    }
    /**
	 * 유저 히스토리 정보 저장
	 * @param paramsMap
	 * @return
	 * @throws DqvsException
	 */

	public int insertUserConnLog(Map<String, Object> paramsMap) throws RimsException {
		return insert("ma.main.insertUserConnLog", paramsMap);
	}
	
	/**
	 * 메인화면 팝업 조회
	 */
	public List<Map<String, Object>> selectMainPopup() throws RimsException {
		return selectList("ma.main.selectMainPopup");
	}

	/**
	 * api 서버 상태 조회
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectSvrStat() throws RimsException {
		return selectList("ma.main.selectSvrStat");
	}
	
    /**
     * 개인정보보호 서약 처리
     * @param paramsMap
     * @return
     * @throws RimsException
     */
    public int updateAgre(Map<String, Object> paramsMap) throws RimsException {
        return update("ma.main.updateAgre", paramsMap);
    }

	/**
	 * 시간별 API 요청 건수 조회
	 * @return
	 * @throws RimsException
	 */
	public List<Map<String, Object>> selectStChartHour() throws RimsException{
		return selectList("ma.main.selectStChartHour");
	}
}
