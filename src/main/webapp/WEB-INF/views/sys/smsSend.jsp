<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/sys/smsSend.js"></script>

<script>
    var authrtCd = '${authrtCd}';
    var userCmptncZoneCd = '${userCmptncZoneCd}';
</script>

<div class="subPage sub04">

	<!-- 콘텐츠 시작 -->
	<div id="container">
	    <div class="wrap">
	    
	    	<!-- title -->
	        <div class="titBox">
	            <div class="tit01">
	                <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit"/>
	                <h2>문자 발송 이력</h2>
	            </div>
	            <ul class="tit02">
                    <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"/></li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"/></li>
                    <li>대여사업자 관리</li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"/></li>
                    <li class="current">문자 발송 이력</li>
                </ul>
	        </div>
	        
	        <!-- 조회조건 -->
	        <div class="search_top">
		        <form action="#" name="searchForm" id="searchForm" method="post">
		        	<input type="hidden" id="elxExcelDownReason" name="excelDownReason" />
					<input type="hidden" class="_csrf" name="${_csrf.parameterName}" value="${_csrf.token}" />
			            <div class="selec_wr">
			                <div class="mo_flex">
			                	<ul class="selec_box">
			                        <li class="li_slec">
			                            <label for="send_slec_01" hidden>기간유형</label>
			                            <input type="text" id="dateType" class="dateType" aria-label="기간유형" placeholder="기간유형">
			                        </li>
			                    </ul>
			                    <div class="year_picker">
		                            <ul class="yearBox">
		                                <li class="mo_li">
		                                    <label for="start-picker01">시작기간</label>
		                                    <input id="start-picker01" title="datepicker"
		                                    	aria-label="시작기간조회">
		                                </li>
		                                <li class="bar">-</li>
		                                <li class="mo_li">
		                                    <label for="end-picker01">종료기간</label>
		                                    <input id="end-picker01" title="datepicker"
		                                        aria-label="종료기간조회">
		                                </li>
		                            </ul>
		                        </div>
			                    <ul class="selec_box">
			                        <li class="li_slec">
			                            <label for="send_slec_01" hidden>발송유형</label>
			                            <input type="text" id="sendType" class="sendType" aria-label="발송유형(전체)" placeholder="발송유형(전체)">
			                        </li>
			                    </ul>
			                    <ul class="selec_box">
			                        <li class="li_slec">
			                            <label for="send_slec_01" hidden>전체(삭제계정 제외)</label>
			                            <input type="text" id="searchType" class="searchType" aria-label="전체" placeholder="전체">
			                        </li>
			                    </ul>
			                    <ul class="selec_box">
		                            <li class="li_slec">
			                            <label for="searchWrd" hidden>조회조건</label>
			                            <input type="text" id="searchWrd" class="searchWrd input" aria-label="내용, 수신자명, 수신자번호"  placeholder="검색 내용을 입력하세요." maxLength="80" oninput="charOnly(this)" />
		                            </li>
		                        </ul>
			                </div>
			                <button class="yellow_btn searchBtn" type="button">
					        	조회
					        	<img src="${contextPath}/images/sub/ico_search02.png" alt="조회아이콘" />
					        </button>
			            </div>
		         </form>
	        </div>
	        
	        <!-- 문자발송이력 그리드 -->
	        <div class="contBox grid_wr">
	            <div class="nameBox nameBox-flex">
                    <h4 class="name">문자 발송 이력</h4>
                    <button class="download-btn excelDownBtn" type="button">
                        <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">
                        엑셀
                    </button>
                </div>
                
	            <table id="smsSendGrid">
	            </table>
	        </div>
	        
	        <div class="btn_flex">
			    <button type="button" class="blue_btn send_btn">발송하기</button>
			</div>
	
	        <!-- 팝업 -->
	        <!-- 문자 발송 기록(19) 팝업 -->
	        <div class="popup sub04_popup viewMsg_popup msg_view01 popup_type02">
	            <div class="box">
	                <div class="popup_top">
	                    <h4>문자 조회</h4>
	                    <div class="close" id="close">
	                        <span></span>
	                        <span></span>
	                    </div>
	                </div>
	                <div class="content">
	                    <div class="cont_inner">
	                        <div class="view_wr">
	                            <ul class="msg_view_lists">
	                                <li class="msg_view_list1 msg_view_list">
	                                    <div class="cont_header">
	                                        <span>발송 일자</span>
	                                    </div>
	                                    <div class="cont_body">
	                                    	<p id="detail_send_date"></p>
                                        </div>
	                                </li>
	                                <li class="msg_view_list2 msg_view_list">
	                                    <div class="cont_header">
	                                        <span>수신자</span>
	                                    </div>
	                                    <div class="cont_body">
	                                    	<p id=detail_user_nm></p>
	                                    </div>
	                                </li>
	                                <li class="msg_view_list3 msg_view_list">
	                                    <div class="cont_header hidden">
	                                        <span>내용</span>
	                                    </div>
	                                    <div class="cont_body">
	                                        <div class="msg_text_view">
	                                       	   <p id="detail_msg"></p>
	                                        </div>
	                                    </div>
	                                </li>
	                            </ul>
	                        </div>
	                    </div>
	                </div>
	                <div class="btn_flex">
	                    <button class="blue_btn" id="resendMsg">재전송</button>
	                    <button class="gray_btn cancel_btn">취소</button>
	                </div>
	            </div>
	        </div>
	        <!-- 문자 발송(5) 팝업 -->
	        <div id="send" class="popup send_popup msg_send01 msg_send popup_type02">
	            <div class="box">
	                <div class="popup_top">
	                    <h4>대여사업자 문자 발송</h4>
	                    <div class="close" id="close">
	                        <span></span>
	                        <span></span>
	                    </div>
	                </div>
	                <div class="content">
		                <div class="scrollBar02">
		                    <div class="cont_inner">
		                        <div class="selec_box">
		                            <div class="box_head">
		                                <div class="cont_wr">
		                                    <h5>수신자 선택</h5>
		                                    <div class="input_wr">
		                                        <input type="checkbox" name="exceptTel" id="except_tel">
		                                        <label for="except_tel">유선전화 제외</label>
		                                    </div>
		                                </div>
		                                <div class="btn_wr">
		                                    <button type="button" class="indivSelec_btn btn_s btn_fill">개별선택</button>
		                                </div>
		                            </div>
		                            <div class="box_cont">
		                                <div class="visual_box">
		                                    <div class="group_reciever inner">
		                                        <ul class="selec_lists">
		                                            <li class="selec_list1 selec_list">
		                                                <input type="radio" name="selec_target" id="all">
		                                                <label for="all">전체 &#40;삭제된 계정 제외&#41;</label>
		                                            </li>
		                                            <li class="selec_list2 selec_list">
		                                                <input type="radio" name="selec_target" id="auth" checked>
		                                                <label for="auth">권한별</label>
		                                            </li>
		                                            <li class="selec_list3 selec_list">
		                                                <input type="radio" name="selec_target" id="inc">
		                                                <label for="inc">법인별 &#40;하위영업소 포함&#41;</label>
		                                            </li>
		                                             <li class="selec_list4 selec_list">
		                                                <input type="radio" name="selec_target" id="api">
		                                                <label for="api">API 사용자</label>
		                                            </li>
		                                        </ul>
		                                    </div>
		                                </div>
		                                <div class="selec_visual_box">
		                                    <div class="auth_box show">
		                                        <div class="group_reciever_detail inner">
		                                            <ul class="box_lists">
		                                                <li class="box_list box_list1">
		                                                    <div class="cont_header">
		                                                        <span>권한 선택</span>
		                                                    </div>
		                                                    <div class="cont_body">
		                                                        <ul class="auth_lists">
		                                                            <li class="auth_list1 auth_list"><input type="checkbox" name="auth_01" id="auth_01"><label for="auth_01">주사업소</label></li>
		                                                            <li class="auth_list2 auth_list"><input type="checkbox" name="auth_02" id="auth_02"><label for="auth_02">영업소</label></li>
		                                                            <li class="auth_list3 auth_list"><input type="checkbox" name="auth_03" id="auth_03"><label for="auth_03">배달플랫폼</label></li>
		                                                            <li class="auth_list4 auth_list"><input type="checkbox" name="auth_04" id="auth_04"><label for="auth_04">PM</label></li>
		                                                        </ul>
		                                                    </div>
		                                                </li>
		                                            </ul>
		                                        </div>
		                                    </div>
		                                    <div class="inc_box">
		                                        <div class="inner">
		                                            <ul class="box_lists">
		                                                <li class="box_list box_list1">
		                                                    <div class="cont_header">
		                                                        <span>법인 선택</span>
		                                                    </div>
		                                                    <div class="cont_body">
		                                                        <label for="inc_selec_01" hidden> 법인 선택</label>
		                                                        <input id="inc_selec_01">
		                                                    </div>
		                                                </li>
		                                                <li class="box_list box_list2">
		                                                    <div class="cont_header">
		                                                        <span>수신자 목록</span>
		                                                    </div>
		                                                    <div class="cont_body">
		                                                        <label for="inc_selec_01" hidden> 수신자 목록</label>
		                                                        <div class="inc_receiver_lists">
		                                                        </div>
		                                                    </div>
		                                                </li>
		                                            </ul>
		                                        </div>
		                                    </div>
		                                </div>
		                            </div>
		                        </div>
		                        <div class="msg_box">
		                            <div class="box_head">
		                                <div class="btn_wr">
		                                    <input type="checkbox" id="sendReservation" hidden>
		                                    <label for="sendReservation" class="btn_s btn_fill">발송예약</label>
		                                    <div class="input_wr">
		                                        <label for="msg_reserv_time" hidden>문자 예약 발송 시간</label>
		                                        <input id="msg_reserv_time" class="msg_reserv_time" title="datepicker" aria-label="대여사업자 문자 예약 발송 시간 설정">
		                                    </div>
		                                </div>
		                            </div>
		                            <div class="box_cont">
										<div class="byteInfoWrap"><span class="byteInfo" id="byteInfo">0</span> / 2000bytes</div>
		                                <div class="msg_write_box">
		                                    <textarea name="msg_val" id="msg_val" placeholder="내용 입력" onKeyUp="javascript:$smsSend.event.fnChkByte(this,'2000')"></textarea>
		                                </div>
		                            </div>
		                        </div>
		                    </div>
	                    </div>
	                    <div class="btn_flex">
	                        <button class="blue_btn" id="sendMsg">발송</button>
	                        <button class="gray_btn cancel_btn">취소</button>
	                    </div>
	                </div>
	            </div>
	            
	        </div>
	        <!-- 개별 발송 팝업 -->
	        <div class="popup indivSelec_popup msg_send msg_send02 popup_type02">
	            <div class="box">
	                <div class="popup_top">
	                    <h4>대여사업자 문자 발송</h4>
	                    <div class="close" id="close">
	                        <span></span>
	                        <span></span>
	                    </div>
	                    <div class="backDiv" style="position:absolute; right:60px; top:13px;">
	                    <button class="back">
                            <img style="width:20px;height:20px;" src="${contextPath}/images/sub/back_2.png" alt="뒤로가기">
                        </button>
                        </div>
	                </div>
	                <div class="content">
		                <div class="scrollBar02">
		                 <div class="search_top">
		                                <div class="selec_wr">
		                                    <div class="mo_flex">
		                                        <ul class="selec_box">
		                                            <li class="li_slec">
		                                                <label for="searchCtpvNm" hidden> 시도(전체)</label>
		                                                <input id="searchCtpvNm">
		                                            </li>
		                                            <li class="li_slec">
		                                                <label for="searchSggNm" hidden> 시군구(전체)</label>
		                                                <input id="searchSggNm">
		                                            </li>
		                                            <li class="li_slec">
		                                                <label for="searchSttsCd" hidden> 계정상태(전체)</label>
		                                                <input id="searchSttsCd">
		                                            </li>
		                                            <li class="li_slec">
		                                                <label for="searchAuthrtCd" hidden> 권한(전체)</label>
		                                                <input id="searchAuthrtCd">
		                                            </li>
		                                            <li class="li_slec">
					                           	    	<label for="searchOtherCondition" hidden> 검색조건(전체)</label>
	                                                    <input id="searchOtherCondition">
						                            </li>
						                             <li class="li_slec">
							                            <label for="searchBox" hidden>검색 내용</label>
		                                                    <input id="searchBox" class="input" aria-label="검색어 내용" placeholder="검색어를 입력하세요.">
						                            </li>
						                            <li class="li_slec">
		                                                <input type="checkbox" name="receiverExceptTel" id="receiver_except_tel" >
		                                                <label for="receiver_except_tel">유선전화 제외</label>
		                                            </li>
		                                            <li>
		                                            	<button class="search_btn" id="receiverSearchBtn">
					                                        검색<img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘">
					                                    </button>
		                                            </li>
		                                        </ul>
		                                    </div>
		                                    
		                                </div>
		                            </div>
		                    <div class="cont_inner">
		                        <div class="selec_box">
		                           
		                            <div class="indivSelec_lists" id="receiverListGrid_box">
		                                <table id="receiverListGrid">
		                                </table>
		                            </div>
		                        </div>
		                        <div class="selec_box2">
		                      	  <div class="selectBtnBox">
									<button class="select-btn recDv">수신자 목록</button>
									<button class="select-btn msgDv selected">메시지 작성</button>
							 	 </div>
		                        	<div class="input_box">
			                            <div class="indivReceiver_lists_wrap" style="display:none;">
			                                <div class="cont_header">
			                                    <div><b>수신자 목록</b> (총 <p id="totalRowCnt" style="font-weight: bold; display: inline;"></p> 건)</div>
			                                    <span>※ 최대 50건 선택 가능</span>
			                                </div>
			                                <div class="indivReceiver_lists">
			                                
			                                </div>
			                            </div>
		                       		
		                            
			                            <div class="msg_box">
			                                <div class="box_head">
			                                    <div class="btn_wr">
			                                        <input type="checkbox" id="sendIndiviReservation" hidden>
			                                        <label for="sendIndiviReservation" class="btn_s btn_fill">발송예약</label>
			                                        <div class="input_wr">
			                                            <label for="indivMsg_reserv_time" hidden>문자 예약 발송 시간</label>
			                                            <input id="indivMsg_reserv_time" class="msg_reserv_time" title="datepicker" aria-label="대여사업자 문자 예약 발송 시간 설정">
			                                        </div>
			                                    </div>
			                                </div>
			                                <div class="box_cont">
			                                	<div class="byteInfoWrap"><span class="byteInfo" id="indivByteInfo">0</span> / 2000bytes</div>
			                                    <div class="msg_write_box">
			                                        <textarea name="indiv_msg_val" id="indiv_msg_val" placeholder="내용 입력" onKeyUp="javascript:$smsSend.event.fnChkByte(this,'2000')"></textarea>
			                                    </div>
			                                </div>
			                            </div>
		                            
		                            
		                          </div>    
		                        </div>
		                    </div>
		                </div>
	                    <div class="btn_flex">
	                        <button class="blue_btn" id="sendIndivMsg">발송</button>
	                        <button class="gray_btn cancel_btn">취소</button>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <!-- 문자 발송 확인 팝업 -->
	        <div class="popup chkSend_popup msg_view02 popup_type02">
	            <div class="box">
	                <div class="popup_top">
	                    <h4>대여사업자 문자 발송</h4>
	                    <div class="close" id="final_close">
	                        <span></span>
	                        <span></span>
	                    </div>
	                </div>
	                <div class="content">
		                <div class="scrollBar02">
		                    <div class="cont_inner">
		                        <div class="view_receivers_wr">
		                            <div class="cont_header">
		                                <h5>수신자 목록</h5>
		                            </div>
		                            <div class="cont_body" id="grid_box">
		                                <table id="receiver_grid">
		                                </table>
		                            </div>
		                        </div>
		                        <div class="view_msgView_wr">
		                            <div class="cont_header">
		                                <h5>발송 희망 시각</h5>
		                                <span class="send_exp_time" id = check_send_date></span>
		                            </div>
		                            <div class="cont_body">
		                                <div class="msg_box">
		                                    <p id = check_msg>
		                                    </p>
		                                </div>
		                            </div>
		                        </div>
		                    </div>
	                    </div>
	                </div>
	                <div class="btn_flex">
	                    <button class="blue_btn" id="realSendMsg">발송</button>
	                    <button class="gray_btn final_cancel_btn">취소</button>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
</div>