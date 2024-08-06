package kr.or.kotsa.rims.sys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.sys.service.CmmnCdService;

@Service
public class CmmnCdServiceImpl extends CmmnAbstractServiceImpl implements CmmnCdService {

	@Autowired
	private CmmnCdDao cmmnCdDao;

	//공통코드 관리 조회
	public Map<String, Object> selectCmmnCdList(Map<String, Object> paramsMap) throws RimsException {
		Map<String, Object> result = new HashMap<>();
		List<Map<String, Object>> list = cmmnCdDao.selectCmmnCdList(paramsMap);
		int total = cmmnCdDao.selectCmmnCdListCnt(paramsMap);

		result.put("data", list);
		result.put("total", total);
		return result;
	}

	//그룹명
	public List<Map<String, Object>> selectCdGroupNm(Map<String, Object> paramsMap) throws RimsException {
		return cmmnCdDao.selectCdGroupNm(paramsMap);
	}

	//공통코드 등록
	public String insertCmmnCd(Map<String, Object> paramsMap) {
		paramsMap.put("rgtrSn", getUserSn());
		paramsMap.put("regIp", getClientIP());
		
		List<Map<String, Object>> result = cddpPrvnt(paramsMap);
		Map<String, Object> getItem = result.get(0);
		int codeCount = ((Number) getItem.get("case")).intValue();
		if(codeCount == 1) {
			return "코드가 중복 되었습니다.";
		}
		
		cmmnCdDao.insertCmmnCd(paramsMap);

		return "success";
	}
	
	private List<Map<String, Object>> cddpPrvnt(Map<String, Object> paramsMap){
		
		List<Map<String, Object>> atatcPrvnt =  cmmnCdDao.cddpPrvnt(paramsMap);
		
		return atatcPrvnt;
	}

	//공통코드 수정
	public String updateCmmnCd(Map<String, Object> paramsMap) {
		paramsMap.put("mdfrSn", getUserSn());
		paramsMap.put("mdfcnIp", getClientIP());

		cmmnCdDao.updateCmmnCd(paramsMap);

		return "success";
	}

	//공통코드 삭제
	public String updateDeleteCmmnCd(Map<String, Object> paramsMap) {
		cmmnCdDao.updateDeleteCmmnCd(paramsMap);

		return "success";
	}

}
