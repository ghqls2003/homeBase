<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/sys/usermanage.js"></script>

<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/excelDown.css" />

<style>
	input#detail_oper_bgng_dt,
	input#detail_oper_end_dt {
		width: 75px;
    	padding-right:19px;
    }
</style>
<div class="subPage sub03">
            <div id="container">
            <!--  대여차량 찾기 팝업 -->

                <div class="wrap">

                    <div class="titBox">
                        <div class="tit01">
                            <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit"/>
                           <h2><c:out value='${tableName}'/></h2>
                        </div>
                        <ul class="tit02">
                            <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"/></li>
                            <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"/></li>
                            <li>시스템 관리</li>
                            <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"/></li>
                            <li class="current">사용자 관리</li>
                        </ul>
                    </div>

                    <div class="search_top">
						<input type="hidden" class="_csrf" name="${_csrf.parameterName}" value="${_csrf.token}" />
                        <div class="selec_wr">
                            <div class="mo_flex">
                           		<ul class="selec_box">
                           			<li class="li_slec">
			                            <div class="dropdown">
			                            	<label for="search_ctpv_nm"></label>
				                            <input id="search_ctpv_nm">
			                            </div>
		                            </li>
		                            <li class="li_slec">
			                            <div class="dropdown">
			                            	<label for="search_sgg_nm"></label>
				                            <input id="search_sgg_nm">
			                            </div>
		                            </li>
	                           		<li class="li_slec">
			                            <div class="dropdown">
			                            	<label for="search_stts_cd"></label>
				                            <input id="search_stts_cd">
			                            </div>
		                            </li>
		                            <li class="li_slec">
			                            <div class="dropdown">
				                            <label for="search_authrt_cd"></label>
				                            <input id="search_authrt_cd">
			                            </div>
		                            </li>
		                            <li class="li_slec">
			                            <div class="dropdown">
			                            	<label for="search_other_condition"></label>
				                            <input id="search_other_condition">
			                            </div>
		                            </li>
		                            <li class="li_slec">
			                            <label for="search_box"></label>
			                            <input id="search_box" class="input" aria-label="검색어를 입력하세요" placeholder="검색어를 입력하세요">
		                            </li>
	                            </ul>
                            </div>
	                        <button class="yellow_btn" id="userMngBtnSearch" type="button" style="width: 80px;">
	                            조회<img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘"/>
	                        </button>
                        </div>
                    </div>

                    <div class="contBox lastBox lastBox02">
                        <div class="nameBox nameBox-flex">
                            <h4 class="name">사용자 현황</h4>
                            <div class="gridTopMenu" style="display: flex; align-items: center;">
<!--                             	<div class="chkbox"> -->
<!-- 	                                <input id="orderCase" type="checkbox" name="orderCase"> -->
<!-- 	                                <label for="orderCase">승인일 정렬</label> -->
<!--                                 </div> -->
	                           	<button class="download-btn excelDownBtn" style="margin-left: 5px;">
						            <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘" />
						            엑셀
						        </button>
					        </div>
                        </div>

                        <table id="grid">
							<thead>
								<tr>
									<th>순번</th>
									<th>아이디</th>
									<th>성명</th>
									<th>회사명</th>
									<th>권한명</th>
									<th>권한코드</th>
									<th>계정상태</th>
									<th>가입승인일</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td colspan="8"></td>
								</tr>
							</tbody>
						</table>
                    </div>
                </div>

                <!-- 사업자상세 팝업 -->
                <div class="popup detail_popup popup_type02">
					<div class="box">
                        <div class="popup_top">
                            <h4>사용자 상세</h4>
                            <div class="close userPagePopupClose">
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div class="content">
	                        <div class="scrollBar02">
	                            <div class="info_wr">
	                                <div class="contBox">
	                                    <div class="nameBox nameBox-flex">
	                                        <h4 class="name">기본정보</h4>
	                                    </div>
	                                    <div class="cont cont-flex">
	                                        <table class="tb rental_tb01">
	                                            <tr>
	                                                <th scope="col">권한명</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_authrt_cd">권한명</label>
	                                                    <input type="text" id="detail_authrt_cd" name="detail_authrt_cd" class="input no_line"
	                                                        readOnly/>
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <th scope="col">휴대폰 번호</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_mbl_telno">휴대폰 번호</label>
	                                                    <input type="text" id="detail_mbl_telno" name="detail_mbl_telno" class="input no_line"
	                                                      readonly/>
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <th scope="col">보조전화 번호</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_assi_telno">보조전화 번호</label>
	                                                    <input type="text" id="detail_assi_telno" name="detail_assi_telno" class="input"
	                                                     oninput="telFormat(this)" maxlength="13"/>
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <th scope="col">최종로그인</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_last_lgn_dt">최종로그인</label>
	                                                    <input type="text" id="detail_last_lgn_dt" name="detail_last_lgn_dt" class="input no_line"
	                                                         readOnly/>
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <th scope="col">가입신청일시</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_aprv_dmnd_dt">가입신청일시</label>
	                                                    <input type="text" id="detail_aprv_dmnd_dt" name="detail_aprv_dmnd_dt" class="input no_line"
	                                                        readOnly />
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <th scope="col">계정상태</th>
	                                                    <td>
	                                                    <div class="tb_flex">
	                                                        <p class="request"></p>
															<div class="stts_btns"></div>
	                                                    </div>
	                                                </td>
	                                            </tr>
	                                            <tr class="reject_reason" style="display:none">

	                                            </tr>
	                                        </table>
	                                        <table class="tb rental_tb01">
	                                        	<tr style="display: none;">
	                                                <th scope="col">사용자 일련번호</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_user_sn">사용자 일련번호</label>
	                                                    <input type="text" id="detail_user_sn" name="detail_user_sn" class="input no_line"
	                                                         readOnly/>
	                                                </div>
	                                                </td>
	                                            </tr>
	                                        	<tr style="display: none;">
	                                                <th scope="col">로그인 경로</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_user_login_path">로그인 경로</label>
	                                                    <input type="text" id="detail_user_login_path" name="detail_user_login_path" class="input no_line"
	                                                         readOnly/>
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <th scope="col">아이디</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_user_id">아이디</label>
	                                                    <input type="text" id="detail_user_id" name="detail_user_id" class="input no_line"
	                                                         readOnly/>
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <th scope="col">성명</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_user_nm">성명</label>
	                                                    <input type="text" id="detail_user_nm" name="detail_user_nm" class="input no_line"
	                                                       readonly/>
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <th scope="col">이메일</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_eml_addr">이메일</label>
	                                                    <input type="text" id="detail_eml_addr" name="detail_eml_addr" class="input no_line"
	                                                       readonly/>
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <th scope="col">최종수정일시</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_mdfcn_dt">최종수정일시</label>
	                                                    <input type="text" id="detail_mdfcn_dt" name="detail_mdfcn_dt" class="input no_line"
	                                                         readOnly/>
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <th scope="col">가입승인일시</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_aprv_dt">가입승인일시</label>
	                                                    <input type="text" id="detail_aprv_dt" name="detail_aprv_dt" class="input no_line"
	                                                         readOnly/>
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr style="display: none;">
	                                                <th scope="col">파일 순번</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_file_sn">파일 순번</label>
	                                                    <input type="text" id="detail_file_sn" name="detail_file_sn" class="input no_line"
	                                                         readOnly />
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <th scope="col">첨부파일</th>
	                                                <td>
	                                                <div class="tb_flex filebox">
			                                            <label for="detail_atch_file_nm">첨부파일</label>
			                                            <input id="detail_atch_file_nm" name="detail_atch_file_nm" class="no_line input" aria-label="첨부파일" readonly>

			                                            <label for="fileBtn" class="file_btn">파일첨부</label>
			                                            <input type="file" id="fileBtn">
			                                        </div>
	                                                </td>
	                                            </tr>
	                                        </table>
	                                    </div>
	                                </div>
	                                <div class="contBox" id="sBox">
	                                    <div class="nameBox nameBox-flex">
	                                        <h4 class="name">기업정보</h4>
	                                    </div>
	                                    <div class="cont cont-flex">
	                                        <table class="tb rental_tb01">
	                                            <tr>
	                                                <th scope="col">회사명</th>
	                                                <td>
	                                                <div class="tb_flex" id="btn_setting">
	                                                    <label for="detail_co_nm">회사명</label>
	                                                    <input type="text" id="detail_co_nm" name="detail_co_nm" class="input no_line"
	                                                        readOnly />
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <th scope="col">사업자등록번호</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_brno">사업자등록번호</label>
	                                                    <input type="text" id="detail_brno" name="detail_brno" class="input no_line"
	                                                         readOnly />
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <!-- 작업 231017 s-->
	                                            <tr>
				                                    <th scope="col">주소</th>
				                                    <td>
					                                   	<div class="tb_flex">
					                                        <label for="detail_addr">주소</label>
					                                        <input type="text" id="detail_addr" name="detail_addr" class="input no_line"
					                                        	readOnly />
					                                    </div>
				                                    </td>
			                               		</tr>
			                               		<tr>
				                                    <th scope="col">영업상태</th>
				                                    <td>
					                                    <div class="tb_flex">
					                                        <label for="detail_bsn_stts_cd_nm">영업상태</label>
					                                        <input type="text" id="detail_bsn_stts_cd_nm" name="detail_bsn_stts_cd_nm" class="input no_line" readOnly/>
					                                    </div>
				                                    </td>
			                               		</tr>
			                               		<tr>
	                                                <th scope="col">최종수정일시</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_drma_mdfcn_dt">최종수정일시</label>
	                                                    <input type="text" id="detail_drma_mdfcn_dt" name="detail_drma_mdfcn_dt" class="input no_line"
	                                                         readOnly/>
	                                                </div>
	                                                </td>
	                                            </tr>
			                               		<!-- 작업 231017 e-->
	                                        </table>
	                                        <table class="tb rental_tb01">
	                                            <tr>
	                                                <th scope="col">사업자일련번호</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_bzmn_sn">사업자일련번호</label>
	                                                    <input type="text" id="detail_bzmn_sn" name="detail_bzmn_sn" class="input no_line"
	                                                         readOnly />
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <!-- 작업 231017 s -->
	                                            <tr>
	                                                <th scope="col">관할 구역</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_cmptnc_zone_nm">관할 구역</label>
	                                                    <input type="text" id="detail_cmptnc_zone_nm" name="detail_cmptnc_zone_nm" class="input no_line"
	                                                         readOnly />
	                                                    <input type="text" id="detail_sgg_cd" style="display: none;"/>
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr>
	                                                <th scope="col">사업소 종류</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_bzmn_se_cd_nm">사업소 종류</label>
	                                                    <input type="text" id="detail_bzmn_se_cd_nm" name="detail_bzmn_se_cd_nm" class="input no_line"
	                                                         readOnly />
	                                                </div>
	                                                </td>
	                                            </tr>
	                                           <tr>
			                                    	<th scope="col">평일운영시간</th>
				                                    <td>
				                                    	<div class="tb_flex">
				                                    		<label for="detail_oper_bgng_dt">평일오픈시간</label>
				                                    		<input type="text" id="detail_oper_bgng_dt" name="detail_oper_bgng_dt" class="input no_line" aria-label="평일오픈시간"
				                                    			placeholder="00:00" readOnly />
			                                    			~
			                                    			<label for="detail_oper_end_dt">평일마감시간</label>
			                                    			<input type="text" id="detail_oper_end_dt" name="detail_oper_end_dt" class="input no_line" aria-label="평일마감시간"
			                                    			placeholder="00:00" readOnly />
				                                        </div>
				                                    </td>
			                                	</tr>
	                                            <!-- 작업 231017 e -->
	                                            <tr style="display: none;">
	                                                <th scope="col">임시 회사명</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="temp_co_nm">임시 회사명</label>
	                                                    <input type="text" id="temp_co_nm" name="temp_co_nm" class="input no_line"
	                                                         readOnly />
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr style="display: none;">
	                                                <th scope="col">임시 사업자 일련번호</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="temp_bzmn_sn">임시 사업자 일련번호</label>
	                                                    <input type="text" id="temp_bzmn_sn" name="temp_bzmn_sn" class="input no_line"
	                                                         readOnly />
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr style="display: none;">
	                                                <th scope="col">임시 사업자 등록번호</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="temp_brno">임시 사업자 등록번호</label>
	                                                    <input type="text" id="temp_brno" name="temp_brno" class="input no_line"
	                                                         readOnly />
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr style="display:none;">
		                                            <td>
		                                            	<input type="text" id="temp_reg_cmptnc_cd" name="temp_cmptnc_zone_nm" class="input no_line">
		                                            	<input type="text" id="temp_cmptnc_zone_nm" name="temp_cmptnc_zone_nm" class="input no_line">
		                                            	<input type="text" id="temp_bzmn_se_cd_nm" name="temp_bzmn_se_cd_nm" class="input no_line">
		                                            	<input type="text" id="temp_oper_bgng_dt" name="temp_oper_bgng_dt" class="input no_line">
		                                            	<input type="text" id="temp_oper_end_dt" name="temp_oper_end_dt" class="input no_line">
		                                            	<input type="text" id="temp_addr" name="temp_addr" class="input no_line">
		                                            	<input type="text" id="temp_bsn_stts_cd_nm" name="temp_bsn_stts_cd_nm" class="input no_line">
		                                            	<input type="text" id="temp_drma_mdfcn_dt" name="temp_drma_mdfcn_dt" class="input no_line">
		                                            </td>
	                                            </tr>

	                                        </table>
	                                    </div>
	                                </div>

	                                <div class="contBox" id="gBox" style="display: none;">
	                                    <div class="nameBox nameBox-flex">
	                                        <h4 class="name">지자체정보</h4>
	                                    </div>
	                                    <div class="cont cont-flex">
	                                        <table class="tb rental_tb01">
	                                            <tr id="deCtNm">
	                                                <th scope="col">시도(전체)</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_ctpv_nm">시도(전체)</label>
	                                                    <input id="detail_ctpv_nm" name="detail_ctpv_nm"/>
	                                                </div>
	                                                </td>
	                                            </tr>
	                                        </table>
	                                        <table class="tb rental_tb01">
	                                        	<tr id="deSgNm">
	                                                <th scope="col">시군구(전체)</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_sgg_nm">시군구(전체)</label>
	                                                    <input id="detail_sgg_nm" name="detail_sgg_nm"/>
	                                                </div>
	                                                </td>
	                                            </tr>
	                                        </table>
	                                    </div>
	                                </div>

	                                <div class="contBox" id="oBox" style="display: none;">
	                                    <div class="nameBox nameBox-flex">
	                                        <h4 class="name">기관정보</h4>
	                                    </div>
	                                    <div class="cont cont-flex">
	                                        <table class="tb rental_tb01">
	                                            <tr>
	                                                <th scope="col">기관명</th>
	                                                <td>
	                                                <div class="tb_flex" id="btn_setting">
	                                                    <label for="detail_ogdp_nm">기관명</label>
	                                                    <input type="text" id="detail_ogdp_nm" name="detail_ogdp_nm" class="input no_line"
	                                                        readOnly />
	                                                </div>
	                                                </td>
	                                            </tr>
	                                            <tr>
				                                    <th scope="col">소속부서명</th>
				                                    <td>
					                                   	<div class="tb_flex">
					                                        <label for="detail_ogdp_dept_nm">소속부서명</label>
					                                        <input type="text" id="detail_ogdp_dept_nm" name="detail_ogdp_dept_nm" class="input no_line"
					                                        	readOnly />
					                                    </div>
				                                    </td>
			                               		</tr>
	                                        </table>
	                                        <table class="tb rental_tb01">
	                                        	<tr>
				                                    <th scope="col">소속전화번호</th>
				                                    <td>
					                                    <div class="tb_flex">
					                                        <label for="detail_ogdp_telno">소속전화번호</label>
					                                        <input type="text" id="detail_ogdp_telno" name="detail_ogdp_telno" class="input no_line" readOnly/>
					                                    </div>
				                                    </td>
												</tr>
	                                            <tr>
	                                                <th scope="col">최종수정일시</th>
	                                                <td>
	                                                <div class="tb_flex">
	                                                    <label for="detail_ogdp_mdfcn_dt">최종수정일시</label>
	                                                    <input type="text" id="detail_ogdp_mdfcn_dt" name="detail_ogdp_mdfcn_dt" class="input no_line" readOnly/>
	                                                </div>
	                                                </td>
	                                            </tr>
	                                        </table>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
	                        <div class='btn_flex'>
	                            <button id='userudtBtn' class='blue_btn' value="Update">수정</button>
	                            <button id='userUpdDelBtn' class='gray_btn' value="" style="margin-right: 10px">삭제</button>
	                            <button class='gray_btn cancel_btn userPagePopupClose' type="submit" style="margin-right: 10px" value="Cancel">닫기</button>
	                        </div>
	                </div>
                        </div>
					</div>


					<!-- 회사찾기 팝업 -->
					<div class="authority_02" style="width:800px;">
						<div class="popup c_search_popup">
						  	<div id="carPopupBox" class="box">
						    	<div class="popup_top">
									<h4>회사찾기</h4>
						      		<div class="close cmpny_close resizeBox">
							          	<span></span>
							         	<span></span>
						      		</div>
								</div>
							<div class="content">
						       	<div class="search_wr">
						         	<div class="s_tit">검색</div>
						         	<div class="popup_flex">
							          	<div class="dropdown">
<!-- 							            	<label for="popupSearchCol" style="display: none">검색조건</label> -->
<!-- 							            	<input id="popupSearchCol"> -->
							          	</div>
							          	<label for="popupSearchWrd" style="display: none">검색조건</label>
							          	<input id="popupSearchWrd" class="input pop_address" aria-label="검색조건 입력" placeholder="회사명또는 사업자번호">
						        	</div>
						         	<button class="yellow_btn" id="cmpnySearchBtn">
						           		검색
						           		<img src="${contextPath}/images/sub/ico_search02.png" alt="검색">
						            </button>
						        </div>
						        	<div class="result scrollBar02">
						        		<table id="cmpnyGrid">
						                    <caption>회사리스트</caption>
						                </table>
									</div>
						            <div class="btn_flex">
						             	<button id="tempToApply" class="blue_btn cancel_btn cmpny_close resizeBox">확인</button>
						            	<button class="gray_btn cancel_btn cmpny_close resizeBox">취소</button>
						            </div>
								</div>
							</div>
						</div>
					</div>


                </div>
                </div>
