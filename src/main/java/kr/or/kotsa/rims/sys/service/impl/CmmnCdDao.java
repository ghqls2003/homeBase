package kr.or.kotsa.rims.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class CmmnCdDao extends CmmnAbstractMapper {

    //공통코드 관리 조회
    public List<Map<String, Object>> selectCmmnCdList(Map<String, Object> paramsMap) throws RimsException {
        return selectList("sys.cmmnCd.selectCmmnCdList", paramsMap);
    }

    public int selectCmmnCdListCnt(Map<String, Object> paramsMap) throws RimsException {
        return selectOne("sys.cmmnCd.selectCmmnCdListCnt", paramsMap);
    }

    //공통코드 등록
    public void insertCmmnCd(Map<String, Object> paramsMap) {
    	insert("sys.cmmnCd.insertCmmnCd", paramsMap);
	}

    //공통코드 수정
    public void updateCmmnCd(Map<String, Object> paramsMap) {
    	update("sys.cmmnCd.updateCmmnCd", paramsMap);
    }

    //공통코드 삭제
    public void updateDeleteCmmnCd(Map<String, Object> paramsMap) {
    	delete("sys.cmmnCd.updateDeleteCmmnCd", paramsMap);
	}

    //그룹명
    public List<Map<String, Object>> selectCdGroupNm(Map<String, Object> paramsMap) throws RimsException {
        return selectList("sys.cmmnCd.selectCdGroupNm", paramsMap);
    }
    
    public List<Map<String, Object>> cddpPrvnt(Map<String, Object> paramsMap) {
		return selectList("sys.cmmnCd.cddpPrvnt", paramsMap);
	}

}
