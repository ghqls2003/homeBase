<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/vfc/rntCnfCrtIsnHstr.js"></script>

<script>
	var authrtCd = "${authrtCd}";
	var userTypeBool = '${userTypeBool}' === 'true';
</script>

<div class="subPage sub03">
	<!-- 콘텐츠 시작 -->
	<div id="container">
	    <div class="wrap">
	        <div class="titBox">
	            <div class="tit01">
	                <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
	            <h2><c:out value='${tableName}'/></h2>
	            </div>
	            <ul class="tit02">
	                <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li>대여사업자 관리</li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li class="current">대여확인증 발급 이력</li>
	            </ul>
	        </div>

	        <div class="search_top">
	        	<input type="hidden" id="elxExcelDownReason" name="excelDownReason" />
				<input type="hidden" class="_csrf" name="${_csrf.parameterName}" value="${_csrf.token}" />
                <div class="selec_wr">
                    <div class="mo_flex">
                        <div class="year_picker">
                        	<div class="s_tit" style="width: 50px;">검증일</div>
                            <ul class="yearBox">
                                <li class="mo_li">
                                    <label for="start-picker01">시작기간</label>
                                    <input id="start-picker01" title="datepicker"
                                    	aria-label="시작기간검색">
                                </li>
                                <li class="bar">-</li>
                                <li class="mo_li">
                                    <label for="end-picker01">종료기간</label>
                                    <input id="end-picker01" title="datepicker"
                                        aria-label="종료기간검색">
                                </li>
                            </ul>
                        </div>
<!--                         <div class="s_tit" style="width: 250px;">면허소유자 성명</div> -->
<!-- 				          	<label for="mainSearchWrd" style="display: none">검색조건</label> -->
<!-- 				          	<input class="input" id="mainSearchWrd" aria-label="검색조건 입력" placeholder="면허소유자 성명을 입력하세요"> -->
                    </div>
                    <button class="yellow_btn" id="searchBtn">
                        조회<img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘">
                    </button>
                </div>
            </div>
            <div class="contBox lastBox lastBox02">
                <div class="nameBox nameBox-flex">
                    <h4 class="name">대여확인증 발급 이력 현황</h4>
                    <button class="download-btn excelDownBtn">
                        <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘">
                        엑셀
                    </button>
                </div>
                <table id="rntCnfCrtIsnHstrGrid">
                    <caption>대여확인증 발급 이력</caption>
                </table>
            </div>
			<!-- 대여 확인증 팝업 -->
				<div id="confInfoPopup" class="popup detail_popup popup_type02">
					<div class="box">
                    	<div class="popup_top">
                        	<h4>대여확인증</h4>
                        	<div class="close confPopupClose">
                            	<span></span>
                            	<span></span>
                      		</div>
                      </div>
                      <div class="content">
                      	<div class="scrollBar02">
                        	<div class="info_wr">
                            	<div class="contBox">
                                   <div class="nameBox nameBox-flex">
                                       <h4 class="name">차량정보</h4>
                                   </div>
                                   <div class="cont cont-flex">
                                       <table class="tb rental_tb01">
                                           <tr>
                                               <th scope="col">차량모델</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="confVhclNm">차량모델</label>
                                                   <input type="text" id="confVhclNm" name="confVhclNm" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">차량번호</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="start-picker03">차량번호</label>
													<input type="text" id="confVhclNm" name="confVhclNm" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">차량 등록 번호</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confVin">차량 등록 번호</label>
													<input type="text" id="confVin" name="confVin" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                       </table>
                                   </div>
                               </div>
                               <div class="contBox">
                                   <div class="nameBox nameBox-flex">
                                       <h4 class="name">회사정보</h4>
                                   </div>
                                   <div class="cont cont-flex">
                                       <table class="tb rental_tb01">
                                           <tr>
                                               <th scope="col">회사 이름</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="confCoNm">대여번호</label>
                                                   <input type="text" id=""confCoNm"" name=""confCoNm"" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">회사 주소</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confAddr">회사 주소</label>
													<input type="text" id="confAddr" name="confAddr" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">회사 연락처</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confTelno">회사 연락처</label>
													<input type="text" id="confTelno" name="confTelno" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                       </table>
                                   </div>
                               </div>
                               <div class="contBox">
                                   <div class="nameBox nameBox-flex">
                                       <h4 class="name">대여자 정보</h4>
                                   </div>
                                   <div class="cont cont-flex">
                                       <table class="tb rental_tb01">
                                           <tr>
                                               <th scope="col">운전면허증 번호</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confDln">운전면허증 번호</label>
													<input type="text" id="confDln" name="confDln" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                       </table>
                                   </div>
                               </div>
                               <div class="contBox">
                                   <div class="nameBox nameBox-flex">
                                       <h4 class="name">대여기간</h4>
                                   </div>
                                   <div class="cont cont-flex">
                                       <table class="tb rental_tb01">
                                           <tr>
                                               <th scope="col">대여시작일시</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="confRentBgngDt">대여시작일시</label>
                                                   <input type="text" id="confRentBgngDt" name="confRentBgngDt" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">대여종료일시</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confRentEndDt">대여종료일시</label>
													<input type="text" id="confRentEndDt" name="confRentEndDt" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">총 대여기간</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confDiffddhhmm">총 대여기간</label>
													<input type="text" id="confDiffddhhmm" name="confDiffddhhmm" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr style="display: none;">
                                               <th scope="col">대여번호</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confRentNo">대여번호</label>
													<input type="text" id="confRentNo" name="confRentNo" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr style="display: none;">
                                               <th scope="col">대여이력번호</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="confCertHstryNo">대여이력번호</label>
													<input type="text" id="confCertHstryNo" name="confCertHstryNo" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                       </table>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div class='btn_flex'>
                           <button class='blue_btn confPrintAndInsert'>출력하기</button>
                           <button class='gray_btn cancel_btn confPopupClose' type="submit" style="margin-right: 10px" value="Cancel">닫기</button>
                       </div>
               		</div>
            	</div>
			</div>
			<!-- 팝업창 만들 공간 -->
			<!-- 상세 팝업 -->
				<div id="detailInfoPopup" class="popup detail_popup popup_type02">
					<div class="box">
                    	<div class="popup_top">
                        	<h4>대여확인증 발급 이력</h4>
                        	<div class="close detailPopupClose">
                            	<span></span>
                            	<span></span>
                      		</div>
                      </div>
                      <div class="content">
                      	<div class="scrollBar02">
                        	<div class="info_wr">
                            	<div class="contBox">
                                   <div class="nameBox nameBox-flex">
                                       <h4 class="name">대여확인증 발급 이력 상세</h4>
                                   </div>
                                   <div class="cont cont-flex">
                                       <table class="tb rental_tb01">

                                           <tr>
                                               <th scope="col">대여번호</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="detailRentNo">대여번호</label>
                                                   <input type="text" id="detailRentNo" name="detailRentNo" class="input no_line"
                                                       readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">대여시작일</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="startDt">시작기간</label>
													<input type="text" id="startDt" class="input no_line" title="startDt"
													readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">대여종료일</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="endDt">종료기간</label>
													<input type="text" id="endDt" class="input no_line" title="endDt"
													readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                       </table>
                                       <table class="tb rental_tb01">
	                                       <tr>
                                               <th scope="col">차량번호</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="detailVhclRegNo">차량번호</label>
                                                   <input type="text" id="detailVhclRegNo" name="detailVhclRegNo" class="input no_line"
                                                       readonly/>
                                               </div>

                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">대여 상태</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="detailRentSttsNm">대여 상태</label>
                                                   <input type="text" id="detailRentSttsNm" name="detailRentSttsNm" class="input no_line"
                                                      maxlength="11" readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr>
                                               <th scope="col">확인증발급 일시</th>
                                               <td>
                                               <div class="tb_flex">
													<label for="mdfcnDt">확인증발급 일시</label>
													<input type="text" id="mdfcnDt" class="input no_line" title="mdfcnDt"
													readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                           <tr style="display: none;">
                                               <th scope="col">대여 이력 번호</th>
                                               <td>
                                               <div class="tb_flex">
                                                   <label for="detailRentHstryNo">대여 이력 번호</label>
                                                   <input type="text" id="detailRentHstryNo" name="detailRentHstryNo" class="input no_line"
                                                      maxlength="11" readonly/>
                                               </div>
                                               </td>
                                           </tr>
                                       </table>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div class='btn_flex'>
                           <button class='gray_btn cancel_btn detailPopupClose' type="submit" style="margin-right: 10px" value="Cancel">닫기</button>
                       </div>
               		</div>
            	</div>
			</div>

			<!-- 팝업창 만들 공간 -->
		</div>
	</div>
</div>
