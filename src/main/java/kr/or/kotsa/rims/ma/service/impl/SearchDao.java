package kr.or.kotsa.rims.ma.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class SearchDao extends CmmnAbstractMapper {
	
	//공지사항 리스트
		public List<Map<String, Object>> selectinquiry(Map<String, Object> paramsMap) {
			return selectList("ma.search.inquiryList", paramsMap);
		}

		public int selectinquiryCnt(Map<String, Object> paramsMap) {
			return selectOne("ma.search.inquiryListCnt", paramsMap);
		}
		//공지사항 리스트
		public List<Map<String, Object>> selectNoticeList(Map<String, Object> paramsMap) {
			return selectList("ma.search.NoticeList", paramsMap);
		}

		public int selectNoticeListCnt(Map<String, Object> paramsMap) {
			return selectOne("ma.search.NoticeListCnt", paramsMap);
		}
		//FAQ 리스트
		public List<Map<String, Object>> selectFAQList(Map<String, Object> paramsMap) {
			return selectList("ma.search.FAQList", paramsMap);
		}

		public int selectFAQListCnt(Map<String, Object> paramsMap) {
			return selectOne("ma.search.FAQListCnt", paramsMap);
		}

		//공지사항 상세
		public Map<String, Object> selectDetailinquiryInfo(Map<String, Object> paramsMap) {
			return selectOne("sft.inquiry.inquiryDetailInfo", paramsMap);
		}

		// 공지사항 상세정보(내용 카운트)
		public int selectDetailNoticeInfoCnt(Map<String, Object> paramsMap) {
			return selectOne("sft.inquiry.inquiryDetailInfoCnt", paramsMap);
		}

		// 공지사항 (조회수+1 증가)
		public void updateNoticeCnt(Map<String, Object> paramsMap) {
			selectOne("sft.inquiry.updateinquiryCnt", paramsMap);
		}

		// 공지사항 상세정보(이전글이 없는 경우)
		public Map<String, Object> selectDetailNoticeNullPrevTitle(Map<String, Object> paramsMap) {
			return selectOne("sft.inquiry.inquiryDetailNullPrevTitle", paramsMap);
		}

		// 공지사항 상세정보(다음글이 없는 경우)
		public Map<String, Object> selectDetailNoticeNullNextTitle(Map<String, Object> paramsMap) {
			return selectOne("sft.inquiry.inquiryDetailNullNextTitle", paramsMap);
		}

		// 공지사항 상세정보(이전글, 다음글 제목)
		public Map<String, Object> selectDetailNoticeTitle(Map<String, Object> paramsMap) {
			return selectOne("sft.inquiry.inquiryDetailTitle", paramsMap);
		}
		public int insertInquiry(Map<String, Object> paramsMap) {
			return insert("sft.inquiry.insertInquiry", paramsMap);
		}
		public int Insertreply(Map<String, Object> paramsMap) {
			return insert("sft.inquiry.Insertreply", paramsMap);
		}
		//공지사항 리스트
		public List<Map<String, Object>> selectinquiryReply(Map<String, Object> paramsMap) {
			return selectList("sft.inquiry.inquiryReply", paramsMap);
		}
		public int selectinquiryReplyCnt(Map<String, Object> paramsMap) {
			return selectOne("sft.inquiry.inquiryReplyCnt", paramsMap);
		}
		
		public List<Map<String, Object>> selectComment(Map<String, Object> paramsMap) {
			return selectList("sft.inquiry.Comment", paramsMap);
		}
		
		public List<Map<String, Object>> selectmenuShow(Map<String, Object> paramsMap) {
			return selectList("ma.search.menuShow", paramsMap);
		}
		// 파일명
		public Map<String, Object> selectFileNm(Map<String, Object> paramsMap) {
			return selectOne("sft.inquiry.FileNm", paramsMap);
		}
	}
