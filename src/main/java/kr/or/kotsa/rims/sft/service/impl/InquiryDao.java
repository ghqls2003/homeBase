package kr.or.kotsa.rims.sft.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.or.kotsa.rims.cmmn.sys.dao.CmmnAbstractMapper;
import kr.or.kotsa.rims.cmmn.sys.exception.RimsException;

@Repository
public class InquiryDao extends CmmnAbstractMapper {
	
		//문의사항 리스트
		public List<Map<String, Object>> selectNoticeList(Map<String, Object> paramsMap) {
			return selectList("sft.inquiry.inquiryList", paramsMap);
		}

		public int selectinquiryListCnt(Map<String, Object> paramsMap) {
			return selectOne("sft.inquiry.inquiryListCnt", paramsMap);
		}

		//문의사항 상세
		public Map<String, Object> selectDetailinquiryInfo(Map<String, Object> paramsMap) {
			return selectOne("sft.inquiry.inquiryDetailInfo", paramsMap);
		}
		public Map<String, Object> selectDetailinquiryTitle(Map<String, Object> paramsMap) {
			return selectOne("sft.inquiry.inquiryDetailTitle", paramsMap);
		}

		// 문의사항 상세정보(내용 카운트)
		public int selectDetailinquiryInfoCnt(Map<String, Object> paramsMap) {
			return selectOne("sft.inquiry.inquiryDetailInfoCnt", paramsMap);
		}

		// 문의사항 (조회수+1 증가)
		public void updateNoticeCnt(Map<String, Object> paramsMap) {
			selectOne("sft.inquiry.updateinquiryCnt", paramsMap);
		}

		// 문의사항 상세정보(이전글이 없는 경우)
		public Map<String, Object> selectDetailNoticeNullPrevTitle(Map<String, Object> paramsMap) {
			return selectOne("sft.inquiry.inquiryDetailNullPrevTitle", paramsMap);
		}

		// 문의사항 상세정보(다음글이 없는 경우)
		public Map<String, Object> selectDetailNoticeNullNextTitle(Map<String, Object> paramsMap) {
			return selectOne("sft.inquiry.inquiryDetailNullNextTitle", paramsMap);
		}

		// 문의사항 상세정보(이전글, 다음글 제목)
//		public Map<String, Object> selectDetailinquiryTitle(Map<String, Object> paramsMap) {
//			return selectOne("sft.inquiry.selectDetailinquiryTitle", paramsMap);
//		}
		public Object insertInquiry(Map<String, Object> paramsMap) {
			return insert("sft.inquiry.insertInquiry", paramsMap);
		}
		// 자동화공격
		public List<Map<String, Object>> atatcPrvnt(Map<String, Object> paramsMap) {
			return selectList("sft.inquiry.atatcPrvnt", paramsMap);
		}
		public int Insertreply(Map<String, Object> paramsMap) {
			return insert("sft.inquiry.Insertreply", paramsMap);
		}
		//문의사항 리스트
		public List<Map<String, Object>> selectinquiryReply(Map<String, Object> paramsMap) {
			return selectList("sft.inquiry.inquiryReply", paramsMap);
		}
		public List<Map<String, Object>> selectcheckPswd(Map<String, Object> paramsMap) {
			return selectList("sft.inquiry.checkPswd", paramsMap);
		}
		public int selectinquiryReplyCnt(Map<String, Object> paramsMap) {
			return selectOne("sft.inquiry.inquiryReplyCnt", paramsMap);
		}
		
		public List<Map<String, Object>> selectComment(Map<String, Object> paramsMap) {
			return selectList("sft.inquiry.Comment", paramsMap);
		}
		// 파일명
		public Map<String, Object> selectFileNm(Map<String, Object> paramsMap) {
			return selectOne("sys.cmpnyManage.FileNm", paramsMap);
		}
		public int updateReply(Map<String, Object> paramsMap) {
			return update("sft.inquiry.updateReply", paramsMap);
		}
		public int updateInquiry(Map<String, Object> paramsMap) {
			return update("sft.inquiry.updateInquiry", paramsMap);
		}
		public int updateDeleteReply(Map<String, Object> paramsMap) {
			return update("sft.inquiry.updateDeleteReply", paramsMap);
		}
		public int updateInquieryuseY(Map<String, Object> paramsMap) {
			return update("sft.inquiry.updateInquieryuseY", paramsMap);
		}
		public int deleteInquiry(Map<String, Object> paramsMap) {
			return update("sft.inquiry.deleteInquiry", paramsMap);
		}
	}
