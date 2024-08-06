package kr.or.kotsa.rims.sys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sys.service.CmmnCdService;
import kr.or.kotsa.rims.sys.service.FileService;
import kr.or.kotsa.rims.vfc.service.impl.DrvVfcHistDao;

@Service
public class FileServiceImpl extends CmmnAbstractServiceImpl implements FileService {

	@Autowired
	private FileDao fileDao;

	//파일 조회
	@Override
	public Object selectNomalFileList(Map<String, Object> paramsMap) {
		return fileDao.selectNomalFileList(paramsMap);
	}

	//파일 조회 건수
	@Override
	public int selectNomalFileListCnt(Map<String, Object> paramsMap) {
		return fileDao.selectNomalFileListCnt(paramsMap);
	}




}
