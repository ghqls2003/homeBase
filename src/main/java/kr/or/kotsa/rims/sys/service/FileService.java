package kr.or.kotsa.rims.sys.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface FileService {


	//파일 조회
	public Object selectNomalFileList(Map<String, Object> paramsMap);
	//파일 조회 건수
	public int selectNomalFileListCnt(Map<String, Object> paramsMap);

}