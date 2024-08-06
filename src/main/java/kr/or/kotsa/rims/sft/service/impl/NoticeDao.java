package kr.or.kotsa.rims.sft.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class NoticeDao extends CmmnAbstractMapper {

	//공지사항 리스트
	public List<Map<String, Object>> selectNoticeList(Map<String, Object> paramsMap) {
		return selectList("sft.notice.selectNoticeList", paramsMap);
	}

	public int selectNoticeListCnt(Map<String, Object> paramsMap) {
		return selectOne("sft.notice.selectNoticeListCnt", paramsMap);
	}

	//공지사항 상세
	public Map<String, Object> selectDetailNoticeInfo(Map<String, Object> paramsMap) {
		return selectOne("sft.notice.selectDetailNoticeInfo", paramsMap);
	}

	// 공지사항 상세정보(내용 카운트)
	public int selectDetailNoticeInfoCnt(Map<String, Object> paramsMap) {
		return selectOne("sft.notice.selectDetailNoticeInfoCnt", paramsMap);
	}

	// 공지사항 (조회수+1 증가)
	public void updateNoticeCnt(Map<String, Object> paramsMap) {
		selectOne("sft.notice.updateNoticeCnt", paramsMap);
	}

	// 공지사항 상세정보(이전글이 없는 경우)
	public Map<String, Object> selectDetailNoticeNullPrevTitle(Map<String, Object> paramsMap) {
		return selectOne("sft.notice.selectDetailNoticeNullPrevTitle", paramsMap);
	}

	// 공지사항 상세정보(다음글이 없는 경우)
	public Map<String, Object> selectDetailNoticeNullNextTitle(Map<String, Object> paramsMap) {
		return selectOne("sft.notice.selectDetailNoticeNullNextTitle", paramsMap);
	}

	// 공지사항 상세정보(이전글, 다음글 제목)
	public Map<String, Object> selectDetailNoticeTitle(Map<String, Object> paramsMap) {
		return selectOne("sft.notice.selectDetailNoticeTitle", paramsMap);
	}

	//공지사항 등록
	public void insertNotice(Map<String, Object> paramsMap) {
		insert("sft.notice.insertNotice", paramsMap);
	}
	// 자동화공격
	public List<Map<String, Object>> atatcPrvnt(Map<String, Object> paramsMap) {
		return selectList("sft.notice.atatcPrvnt", paramsMap);
	}

	//공지사항 수정
	public void updateNotice(Map<String, Object> paramsMap) {
		update("sft.notice.updateNotice", paramsMap);
	}

	//공지사항 삭제
	public void updateDeleteNotice(Map<String, Object> paramsMap) {
		update("sft.notice.updateDeleteNotice", paramsMap);
	}
}
