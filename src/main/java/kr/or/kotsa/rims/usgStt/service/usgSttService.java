package kr.or.kotsa.rims.usgStt.service;

import java.util.List;
import java.util.Map;

import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

public interface usgSttService {

    /**
     * 목록 조회
     * @param paramsMap
     * @return
     * @throws RimsException
     */
//	List<Map<String, Object>> historylistView(Map<String, Object> paramsMap)throws HmtsException;
//    Map<String, Object> historylistView(Map<String, Object> paramsMap);
	List<Map<String, Object>> selecthistorylistView(Map<String, Object> paramsMap) throws RimsException;
	int selecthistorylistViewCnt(Map<String, Object> paramsMap) throws RimsException;
	List<Map<String, Object>> selectusercnctListView(Map<String, Object> paramsMap) throws RimsException;
	int selectusercnctListViewCnt(Map<String, Object> paramsMap) throws RimsException;
	List<Map<String, Object>> selectcnctHistListView(Map<String, Object> paramsMap) throws RimsException;
	int selectcnctHistListViewCnt(Map<String, Object> paramsMap) throws RimsException;
	List<Map<String, Object>> selectloginView(Map<String, Object> paramsMap) throws RimsException;
	int selectloginViewCnt(Map<String, Object> paramsMap) throws RimsException;

//    Map<String, Object> usercnctListView(Map<String, Object> paramsMap);
//    Map<String, Object> cnctHistListView(Map<String, Object> paramsMap);

}