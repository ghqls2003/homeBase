<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/sys/file.js"></script>
<script>
   var curAuthrtCd = '${authrtCd}';
</script>
<style>
    .ap .k-input-value-text {
        color: #364BC6;
    }

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
                    <li>시스템관리</li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"/></li>
                    <li class="current">파일 관리</li>
                </ul>
            </div>

            <!-- 검색조건 -->
            <div class="search_top">
			    <div class="selec_wr">
			        <div class="mo_flex">
			        	<div class="year_picker">
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

			            <ul class="selec_box">
							<li class="li_slec">
								<input type="text" id="fileEncryYn" class="searchBsnStts2" aria-label= "암호화파일유무" >
							</li>
                            <li class="li_slec">
                                <input type="text" id="actlFlnm" class="searchBsnStts1" aria-label="실제파일 명" maxLengh="250"  placeholder = "실제파일 명">
                            </li>
			            </ul>

			        </div>
			        <button id="btnSearch" class="yellow_btn" type="button">
			        	조회
			        	<img src="${contextPath}/images/sub/ico_search02.png" alt="검색아이콘" />
			        </button>
			    </div>

			</div>

			<!-- 파일 관리 그리드 -->
			<div class="contBox lastBox lastBox02">
			    <div class="nameBox nameBox-flex">
			        <h4 class="name">파일 관리</h4>
 			        <button class="download-btn excelDownBtn" type="button">
 			            <img src="${contextPath}/images/sub/ico_down.png" alt="다운로드아이콘" />
 			            엑셀
 			        </button>
			    </div>
			    <div>
				    <table id="file_grid"></table>
			    </div>

			</div>
        </div>
    </div>
</div>