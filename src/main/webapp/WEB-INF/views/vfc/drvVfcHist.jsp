<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/vfc/drvVfcHist.js"></script>
<script>
   var curAuthrtCd = '${authrtCd}';
</script>
<style>
    .ap .k-input-value-text {
        color: #364BC6;
    }
    .timePicker01{
        height: 38px;
        text-align: center;
    }
#start-timePicker01, #end-timePicker01 {width: 100px;}
    .searchBsnStts1{
        width: 130px;
        height: 40px;
        font-size: 16px;
        line-height: 1.42857143;
        font-weight:500;
        text-align: center;
        border: 1px solid #DBE0EC;
        border-radius: 10px;
        background-color: white;

    }

    .searchBsnStts2{
        width: 277px;
        height: 40px;
        font-size: 16px;
        line-height: 1.42857143;
        font-weight:500;
        text-align: center;
        border: 1px solid #DBE0EC;
        border-radius: 10px;
        background-color: white;

    }

    @media (max-width:900px) {
        .timePicker01 {width: 100%; text-align: left;}
        .searchBsnStts1{ font-size: 11px; text-align: left; padding-left: 12px;}
        .searchBsnStts2{ font-size: 11px; text-align: left; padding-left: 12px;}
    }
    @media (max-width:780px) {
        .searchBsnStts2 { width: 200px;}
    }

    @media (max-width:590px) {
        .yearBox {display: flex; flex-direction: column; }
        .datePicker{text-align: left;}
        .searchBsnStts2 { width: 270px;}
    }



</style>

<div class="subPage sub03">

    <!-- 콘텐츠 시작 -->
    <div id="container">
        <div class="wrap">

            <!-- title -->
            <div class="titBox">
                <div class="tit01">
                    <img src="${contextPath}/images/sub/ico_tit.png" alt="타이틀아이콘" class="ico_tit"/>
                   <h2><c:out value='${tableName}'/></h2>
                </div>
                <ul class="tit02">
                    <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"/></li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"/></li>
                    <li>지자체관리</li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"/></li>
                    <li class="current">자격확인 이력</li>
                </ul>
            </div>

            <!-- 검색조건 -->
            <div class="search_top" >
			    <div class="selec_wr" >
			        <div class="mo_flex">
			        	<div class="year_picker">
                            <ul class="yearBox" >
                                <li class="mo_li">
                                    <label for="start-picker01">시작기간</label>
                                    <input id="start-picker01" class = "datePicker" title="datepicker"
                                        aria-label="시작기간검색">
                                </li>
                                <li class="mo_li">
                                    <label for="start-timePicker01">시작시간</label>
                                    <input id="start-timePicker01" title="timePicker" class = "timePicker01"
                                        aria-label="시작시간검색">
                                </li>
                                <li class="bar">-</li>
                                <li class="mo_li">
                                    <label for="end-picker01">종료기간</label>
                                    <input id="end-picker01"  class = "datePicker" title="datepicker"
                                        aria-label="종료기간검색">
                                </li>
                                <li class="mo_li">
                                    <label for="end-timePicker01">종료시간</label>
                                    <input id="end-timePicker01" title="timePicker" class = "timePicker01"
                                        aria-label="종료시간검색">
                                </li>
                            </ul>
                        </div>

			            <ul class="selec_box" >
							<li class="li_slec">
								<input type="text" id="searchMthd" class="searchBsnStts" aria-label= "확인방법" >
							</li>
                            <li class="li_slec">
                                <input type="text" id="ckResults" class="searchBsnStts"aria-label= "확인결과">
                            </li>
                            <li class="li_slec">
                                <input type="text" id="searchCoNm" class="searchBsnStts2" aria-label= "회사명, 사업자등록번호를 입력 조회조건" placeholder = "회사명, 사업자등록번호를 입력하세요." >
                            </li>
                            <li class="li_slec">
                                <input type="text" id="rqstrNm" class="searchBsnStts1" aria-label="요청자 명" placeholder = "요청자 명">
                            </li>
			            </ul>

			        </div>
			        <button id="btnSearch" class="yellow_btn" type="button">
			        	조회
			        	<img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘" />
			        </button>
			    </div>
<!-- 		    <div class="tooltop_wr">
 			        <p class="p_info">※ 렌터카 업체에 대한 관할지 변경 안내</p>
			        <div class="tooltip">
			            <button>
			                <img src="${contextPath}/images/sub/ico_tooltip.png" alt="" />
			            </button>
			            <span class="tooltiptext tooltip-right">
			                관련 내용 <br />
			                관련 내용 <br />
			                관련 내용 <br />
			            </span>
			        </div>
			    </div> -->
			</div>

			<!-- 자격확인 이력 그리드 -->
			<div class="contBox lastBox lastBox02">
			    <div class="nameBox nameBox-flex">
			        <div style="display: flex; align-items: center;">
                       <h4 class="name" id = "pageName">자격확인 이력</h4>&emsp;
                    	총&nbsp;<span id="totalRowCnt" style="font-weight: bold;"></span>건
			        </div>
 			        <button class="download-btn excelDownBtn" type="button">
 			            <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘" />
 			            엑셀
 			        </button>
			    </div>
			    <div>
				    <table id="grid"></table>
			    </div>
			</div>
        </div>
    </div>
</div>