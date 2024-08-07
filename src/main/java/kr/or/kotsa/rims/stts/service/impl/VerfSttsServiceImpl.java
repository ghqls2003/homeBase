package kr.or.kotsa.rims.stts.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.stts.service.VerfSttsService;

@Service
public class VerfSttsServiceImpl extends CmmnAbstractServiceImpl implements VerfSttsService {

	@Autowired
	private VerfSttsDao verfSttsDao;
	
    /**
     * 검증결과카운트(시간별)
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> verfCount(Map<String, Object> paramsMap) throws RimsException {
    	return verfSttsDao.verfCount(paramsMap);
    }
    
    /**
     * 검증결과카운트(사업자별)
     * @return
     * @throws RimsException
     */
    @Override
    public Map<String, Object> verfResult(Map<String, Object> paramsMap) throws RimsException {
    	Map<String, Object> vrData = new HashMap<>();

		List<Map<String, Object>> data = verfSttsDao.verfResult(paramsMap);
		int total = verfSttsDao.verfResultCnt(paramsMap);

		vrData.put("data", data);
		vrData.put("total", total);

    	return vrData;
    }
    
    /**
     * 권한 드롭다운(사업자별)
     * @return
     * @throws RimsException
     */
    @Override
    public List<Map<String, Object>> authSelected(Map<String, Object> paramsMap) throws RimsException {
    	return verfSttsDao.authSelected(paramsMap);
    }
}
