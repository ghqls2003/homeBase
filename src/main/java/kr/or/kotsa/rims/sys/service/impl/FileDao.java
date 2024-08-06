package kr.or.kotsa.rims.sys.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class FileDao extends CmmnAbstractMapper {

	// 파일 조회
	public Object selectNomalFileList(Map<String, Object> paramsMap) {
		return selectList("sys.file.nomalFileList", paramsMap);
	}

	// 파일 조회 건수
	public int selectNomalFileListCnt(Map<String, Object> paramsMap) {
		return selectOne("sys.file.nomalFileListCnt", paramsMap);
	}

}
