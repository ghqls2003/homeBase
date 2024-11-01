<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<link rel="stylesheet" type="text/css" href="${contextPath}/css/custom/drive.css" />

<script src="${contextPath}/js/vfc/contactlessVfc.js"></script>
<script>
var userType = '${userType}'
var userTypeDetail = '${userTypeDetail}' === 'true';  /* 모바일 웹을 구분 - true(웹), false(앱) */
var userTypeBool = '${userTypeBool}' === 'true';
var userOperSystemBool = '${userOperSystemBool}' === 'true';
var authrtCd = '${authrtCd}'
</script>
<style>
@media (max-width: 1200px) {
    #rentInfo02 th {
        font-size: 1.6rem !important;
    }
}
</style>


<div class="subPage sub02_03">
	<!-- 콘텐츠 시작 -->
	<div id="container">
	    <div class="wrap">
	        <div class="titBox">
	            <div class="tit01">
	                <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit">
	                <img src="${contextPath}/images/mobile01.png" alt="모바일" style="display: none;">
	               <h2>비대면 운전자격 검증</h2>
	            </div>
	            <ul class="tit02">
	                <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li class="current">비대면 운전자격 검증</li>
	            </ul>
	        </div>

	        <div class="contBox">
	            <div class="nameBox">
	                <h4 class="name" id="rentInfoTitle">대여정보 입력</h4>
	            </div>

            	<div class="cont" id="rentInfoNotice" style="padding-bottom: 0px;">
	            	<p class="tb_top" >※ 대여정보일련번호를 입력해주세요.</p>
            	</div>
	            <div class="cont cont-flex" style="padding-top: 0px;">
	                <table class="tb rental_tb01" id="rentInfo01">
	                    <caption>대여정보입력</caption>
	                    <tr>
	                        <td class="input-width">
	                            <div class="tb_flex">
	                                <label for="rentInfoNo">대여정보일련번호</label>
	                                <input id="rentInfoNo" class="input" aria-label="대여정보일련번호"  style="width: 100%;" maxlength="50" >
	                                <input id="vin" placeholder="차대번호" style="display:none">
	                                <input id="carmdl" placeholder="차종" style="display:none">
	                                <input id="modelYear" placeholder="연식" style="display:none">
	                                <input id="vhclNm" placeholder="차량명" style="display:none">
	                                <input id="bzmnSn" placeholder="사업자일련번호" style="display:none">
	                                <input id="engineType" placeholder="엔진형식" style="display:none">
	                                <input id="useYn" placeholder="사용여부" style="display:none">
	                                <input id="signguCd" placeholder="시군구코드" style="display:none">
	                                <input id="regDt" placeholder="등록일" style="display:none">
	                                <button class="yellow_btn rentInfoNo_btn">
	                                    확인
	                                </button>

	                            </div>
	                        </td>
	                    </tr>
	                </table>

	                <table class="tb rental_tb02" id="rentInfo02" style="display:none">
	                    <caption>대여정보입력</caption>
	                    <tr>
	                    	<td></td>
	                    </tr>
	                    <tr>
	                        <th scope="col">
	                            차량번호
	                        </th>
	                        <td class="input-width">
	                            <div class="tb_flex">
	                                <label for="carNum">차량번호</label>
	                                <input id="carNum" type="text" aria-label="차량번호"  readonly>
	                            </div>
	                        </td>
	                    </tr>
	                    <tr>
	                        <th scope="col">
	                            대여시작일
	                        </th>
	                        <td>
	                            <label for="clVfcStartDate">대여시작일</label>
	                            <input id="clVfcStartDate" type="text" aria-label="대여시작일" readonly>
	                        </td>
	                    </tr>
	                    <tr>
	                        <th scope="col">
	                            대여종료일
	                        </th>
	                        <td>
	                            <label for="clVfcEndDate">대여종료일</label>
	                            <input id="clVfcEndDate" type="text" aria-label="대여종료일" readonly>
	                        </td>
	                    </tr>
	                </table>
	            </div>
	        </div>
	        
	        <div class="contBox lastBox" id="clVfcInfo" style="display:none">
	            <div class="nameBox">
	                <h4 class="name">면허정보 입력</h4>
	            </div>
	            <div class="cont">
	            	<div class="select">
						<button class="select-btn photo_btn">
                            <img src="../images/sub/ico_photo.png" alt="면허증 촬영" class="basic_ico">
                            <img src="../images/sub/ico_photo02.png" alt="면허증 촬영" class="hover_ico">
                            면허증 촬영
                        </button>
                    </div>

                    <p class="tb_top">※ 외국인 : 성명란에 공백 없이 영어 대문자로 입력해주시기 바랍니다.</p>
                    <p class="tb_top" style="color:#FF7F50;">※ 면허증 촬영 시, 본인의 면허증 정보가 정확히 일치하는지 확인해 주시기 바랍니다.</p>
                    <p class="tb_top" style="color:#509cff;">※ 유사도 검증을 위해 수기입력이 제한됩니다.</p>
                    <div class="license_wr">
	                    <div class="license_bg">
	                    	<button class="info-btn info-btn01">
                                <img src="${contextPath}/images/sub/ico_info.png" alt="운전면허번호규칙 설명">
                            </button>
	                        <div class="license_flex">
	                            <div class="upload_box">
	                                <div class="upload_bg">
	                                </div>
	                            </div>
	                            <div class="input_form">
	                            <form>
	                                <ul class="input_num">
	                                    <li class="li_input">
	                                        <label for="num01"></label>
	                                        <input type="text" id="num01" class="license_input lc_input01" placeholder="00" style="width: 122px;">
	                                    </li>
	                                    <li class="line"></li>
	                                    <li class="li_input">
	                                        <label for="num02"></label>
	                                        <input type="text" id="num02" class="license_input lc_input01" placeholder="00" maxlength="2">
	                                    </li>
	                                    <li class="line"></li>
	                                    <li class="li_input">
	                                        <label for="num03"></label>
	                                        <input type="password" id="num03" class="license_input lc_input02" placeholder="000000" autocomplete="off" maxlength="6">
	                                    </li>
	                                    <li class="line"></li>
	                                    <li class="li_input">
	                                        <label for="num04"></label>
	                                        <input type="text" id="num04" class="license_input lc_input01" placeholder="00" maxlength="2">
	                                    </li>
	                                </ul>
	                                <ul class="name_box">
	                                    <li>
	                                        <div class="tit tit_flex">
	                                            <span>성</span>
	                                            <span>명</span>
	                                        </div>
	                                    </li>
	                                    <li>
	                                        <label for="name"></label>
	                                        <input type="text" id="name" class="license_input lc_input03" placeholder="성명" maxlength="40">
	                                    </li>
	                                </ul>
	                                <div class="type_box">
	                                    <div class="tit tit01">면허종별</div>
	                                    <ul class="type_cont">
	                                        <li class="tit small_tit">1종</li>
	                                        <li class="chkBox">
	                                            <ul class="chk_flex">
	                                                <li>
	                                                    <input id="chk01-1" value="11" type="radio" name="category01">
	                                                    <label for="chk01-1">대형</label>
	                                                </li>
	                                                <li>
	                                                    <input id="chk01-2" value="12" type="radio" name="category01">
	                                                    <label for="chk01-2">보통</label>
	                                                </li>
	                                                <li>
	                                                    <input id="chk01-3" value="13" type="radio" name="category01">
	                                                    <label for="chk01-3">소형</label>
	                                                </li>
	                                                <li>
	                                                    <input id="chk01-4" value="14" type="radio" name="category01">
	                                                    <label for="chk01-4">대형견인</label>
	                                                </li>
	                                                <li>
	                                                    <input id="chk01-5" value="16" type="radio" name="category01">
	                                                    <label for="chk01-5">소형견인</label>
	                                                </li>
	                                                <li>
	                                                    <input id="chk01-6" value="15" type="radio" name="category01">
	                                                    <label for="chk01-6">구난차</label>
	                                                </li>
	                                            </ul>
	                                        </li>
	                                    </ul>
	                                    <ul class="type_cont">
	                                        <li class="tit small_tit">2종</li>
	                                        <li class="chkBox">
	                                            <ul class="chk_flex">
	                                                <li>
	                                                    <input id="chk02-1" value="32" type="radio" name="category01">
	                                                    <label for="chk02-1">보통</label>
	                                                </li>
	                                                <li>
	                                                    <input id="chk02-2" value="33" type="radio" name="category01">
	                                                    <label for="chk02-2">소형</label>
	                                                </li>
	                                                <li>
	                                                    <input id="chk02-3" value="38" type="radio" name="category01">
	                                                    <label for="chk02-3">원동기</label>
	                                                </li>
	                                            </ul>
	                                        </li>
	                                    </ul>
	                                    <ul class="name_box">
		                                    <li>
		                                        <label for="name"></label>
		                                        <span id="licenseCareer"></span>
		                                    </li>
		                                </ul>
	                                </div>
	                            </form>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="license_info">
	                         <button class="info-btn info-btn02">
	                             <img src="${contextPath}/images/sub/ico_info.png" alt="운전면허번호규칙 설명">
	                         </button>
	                         <!--  운전면허 번호 규칙 가이드 팝업 -->
	                         <div class="rule_pop">
	                             <div class="box">
	                                 <div class="popup_top">
	                                     <h4>운전면허 번호 규칙 설명 가이드</h4>
	                                     <div class="close">
	                                         <span></span>
	                                         <span></span>
	                                     </div>
	                                 </div>
	                                 <div class="content">
	                                     <img src="${contextPath}/images/sub/lc_info01.jpg" alt="운전면허 번호 규칙">
	                                 </div>
	                             </div>
	                         </div>
						</div>
					</div>
                </div>
	        </div>
	        <p class="info">※ 본 웹사이트에 게시된 정보는 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 사용할 수 없습니다.</p>
	        <div class="btn_flex" id="clVfcBtn" style="display:none">
	            <button class="blue_btn verify-btn-app">운전자격 확인</button>
	            <button class="gray_btn reset-btn">초기화</button>
	        </div>
	    </div>
	</div>
</div>

<!-- 결과 팝업 -->
<div class="popup result_popup drvie_popup view sub02_04">
    <div class="box">
    	<div class="popup_top">
        	<h4>운전자격확인 결과</h4>
		        <div class="close">
			        <span></span>
			        <span></span>
		        </div>
    	</div>
      	<div class="content">
      		<div class="contBox">
                <div class="nameBox">
                    <h4 class="name">운전자격확인 결과</h4>
                </div>
                <div class="cont" id="result" style="flex-direction: column">
                	<div class="grid_wr" style="display: none;">
	                	<table id="defectGrid">
                            <caption>차량 결함 조회</caption>
                        </table>
                       </div>
                </div>
            </div>
            <!-- 대여 미포함 -->
           <div class="contBox" id = "rentalTypeBox" style = "margin-top: 10px;display: none;" >
            <!-- 대여 포함 -->
             <!--  <div class="contBox" id = "rentalTypeBox" style = "margin-top: 10px;" > -->
                            <div class="nameBox nameTolltip" >
                                <h4 class="name"> 대여 유형 </h4>
                                <div class="tooltip" style ="margin-top: 3px;">
						            <button>
						                <img src="${contextPath}/images/sub/ico_tooltip.png" alt="" />
						            </button>
						            <span class="tooltiptext tooltip-right">
						            	편도: 서울-김천 <br />
										왕복: 서울-김천-서울 <br />
						            </span>
						        </div>
                            </div>
                            <div class="cont" id="result" style="height: auto; justify-content: flex-start;">
                                <ul class="" style ="align-self: flex-start; display: flex; align-items: center; gap: 24px;">
                                    <li>
                                        <input id="rentalType_1" value="Y" type="radio" name="category02">
                                        <label for="rentalType_1">편도</label>
                                    </li>
                                    <li>
                                        <input id="rentalType_2" value="N" type="radio" name="category02">
                                        <label for="rentalType_2">왕복</label>
                                    </li>
                                </ul>
                            </div>
            </div>
            <p class="p_info">※ 본 웹사이트에 게시된 정보는 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 사용할 수 없습니다.</p>
			<br/>

            <div class="btn_flex">
                <button class="gray_btn cancel_btn" id ="cancelAndInit">닫기</button>
            </div>
		</div>
    </div>
</div>

<!-- 유사도 검증 안내 팝업 -->
<div class="similarity_pop">
    <div class="box">
        <div class="popup_top">
            <h4>유사도 검증 안내</h4>
            <div class="close">
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="content">
        	 <img src="${contextPath}/images/sub/sv_info.png" alt="유사도 검증 안내">
        	 <p>운전자격 확인 버튼 클릭 시, 운전면허증 사진과의 유사도 검증을 위해 얼굴 인식 촬영이 시작됩니다.</p>
        </div>
    </div>
</div>



