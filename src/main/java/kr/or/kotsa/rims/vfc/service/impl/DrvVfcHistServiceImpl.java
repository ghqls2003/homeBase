package kr.or.kotsa.rims.vfc.service.impl;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;
import kr.or.kotsa.rims.cmmn.sys.service.CmmnAbstractServiceImpl;
import kr.or.kotsa.rims.vfc.service.DrvVfcHistService;

@Service
public class DrvVfcHistServiceImpl extends CmmnAbstractServiceImpl implements DrvVfcHistService {

	private static final Logger logger = LoggerFactory.getLogger(DrvVfcHistServiceImpl.class);

	@Autowired
	private DrvVfcHistDao drvVfcHistDao;


	/**
     * 목록 조회
     * @return
     * @throws RimsException
     */
	@Override
	public List<Map<String, Object>> listView(Map<String, Object> paramsMap) {
		paramsMap.put("authrtCd", getAuthrtCd());
		paramsMap.put("userSn", getUserSn());

		if (getAuthrtCd().startsWith("S") ) { // 주사무소, 영업소
			paramsMap.put("bzmnSn", getBzmnSn());
		}
		if (getAuthrtCd().startsWith("G")) { // 지자체
			String cmptncZone = getCmptncZoneCd();
			String objSub = cmptncZone.substring(2, 4);
			if(objSub.equals("00")) {
				paramsMap.put("subSignguCd", cmptncZone.substring(0,2)); //  광역자치단체 일 경우
			}else {
				if(getCmptncZoneCd().substring(4,10).equals("000000")) {
					if(getCmptncZoneCd().substring(0,4).equals("4374")) {
						paramsMap.put("subSignguCd", cmptncZone.substring(0,5));// 충청북도 영동군(4자리 끊으면 증평군 자료까지 조회되어 5자리로 함)
					} else {
						paramsMap.put("subSignguCd", cmptncZone.substring(0,4));// 기초자치단체 일 경우
					}
				} else {
					paramsMap.put("subSignguCd", cmptncZone.substring(0,5));// 기초자치단체 일 경우
				}
			}
		}

		return drvVfcHistDao.listView(paramsMap);
	}

    /**
     * 목록 카운트 조회
     * @return
     * @throws RimsException
     */
	@Override
	public int listViewCnt(Map<String, Object> paramsMap) {
		return drvVfcHistDao.listViewCnt(paramsMap);
	}

	/**
	 * 확인결과리스트
	 * @param paramsMap
	 * @return
	 * @throws RimsException
	 */
	@Override
	public Object ckResults(Map<String, Object> paramsMap) {
		return drvVfcHistDao.ckResults(paramsMap);
	}
}