<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />

<script src="${contextPath}/js/sys/menu.js"></script>

<link rel="stylesheet" type="text/css" href="${contextPath}/css/style_op.css" />

<style>
.header .gnb-wr .gnb:hover > li .depth-wr {  height: 100%;}
.header .gnb-wr .gnb > li:nth-child(1) .depth-wr { margin-left: -767px; }
.header .gnb-wr .gnb > li:nth-child(2) .depth-wr { margin-left: -511px; }
.header .gnb-wr .gnb > li:nth-child(3) .depth-wr { margin-left: -256px; }
.header .gnb-wr .gnb > li:nth-child(4) .depth-wr { margin-left: 1px; }
.header .gnb-wr .gnb > li:nth-child(5) .depth-wr { margin-left: 256px;}
.header .gnb-wr .gnb > li:nth-child(6) .depth-wr{margin-left: 511px;}
.header .gnb-wr .gnb > li:nth-child(7) .depth-wr{margin-left: 766px;}
.header .gnb-wr .gnb > li .depth-wr > li { line-height: 1; }
</style>


<div class="adm_sub adm_menu">
	<!-- 콘텐츠 시작 -->
	<div id="container">
	    <div class="adm_wrap">
	        <div class="tit_line">
	            <div class="adm_tit">
	                <img src="${contextPath}/images/adm/adm_tit.png" alt="타이틀아이콘" class="tit_icon">
	              <h2><c:out value='${tableName}'/></h2>
	            </div>
	            <ul class="arrow_tit">
	                <li class="home"><img src="${contextPath}/images/sub/ico_home.png" alt="홈아이콘"></li>
	                <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li>시스템 관리</li>
                    <li class="mid"><img src="${contextPath}/images/sub/ico_menuLine.png" alt="라인"></li>
	                <li class="current">메뉴 관리</li>
	            </ul>
	        </div>

			<div class="content">
				<ul class="tabs">
                    <li class="tab-link current" data-tab="tab-2" id="PMNU"><button>포털</button></li>
					<li class="tab-link" data-tab="tab-1" id="OMNU"><button>관리자</button></li>
				</ul>

<!-- 				<div class="treeCont" id="treeview1" style="height: 92%; overflow: auto;"></div> -->
				<ul id="menu1">
					<li>Create</li>
					<li>Delete</li>
				</ul>
				<ul id="menu2">
					<li>Create</li>
					<li>Delete</li>
				</ul>

				<div class="tab_cont">
					<div id="tab-1" class="tab-content current">
                        <div class="fx-cont">
                            <div class="menu-wr adm_box fx-box">
                                <div id="treeview1"></div>
                                <div id="treeview2"></div>
							</div>

                            <div class="input-wr fx-box">
                                <div class="adm_box">
                                    <table class="sf-input">
                                        <caption>메뉴관리 입력폼</caption>
                                        <tbody>
                                            <tr>
                                                <th scope="row">메뉴명</th>
                                                <td>
                                                    <ul class="tb-flex">
                                                        <li>
                                                            <label for="menuNm"></label>
                                                            <input type="text" id="menuNm" class="adm_input" readonly>
                                                        </li>
                                                        <li>
                                                            <label for="menuCd"></label>
                                                            <input type="text" id="menuCd" class="adm_input read_input" readonly>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">URL</th>
                                                <td>
                                                    <ul class="tb-flex">
                                                        <li>
                                                            <label for="menuUrl"></label>
                                                            <input type="text" id="menuUrl" class="adm_input">
                                                        </li>
                                                        <li>
<!--                                                             <label for="adm_input04"></label> -->
<!--                                                             <input type="text" id="adm_input04" class="adm_input" placeholder="UserId"> -->
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">상위메뉴명</th>
                                                <td>
                                                    <ul class="tb-flex">
                                                        <li>
                                                            <label for="upMenuNm"></label>
                                                            <input type="text" id="upMenuNm" class="adm_input read_input" readonly>
                                                        </li>
                                                        <li>
                                                            <label for="upMenuCd"></label>
                                                            <input type="text" id="upMenuCd" class="adm_input read_input" readonly>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">정렬순서</th>
                                                <td>
                                                    <ul class="tb-flex">
                                                        <li>
                                                            <label for="menuOrdr"></label>
                                                            <input type="text" id="menuOrdr" class="adm_input read_input" placeholder="1" readonly>
                                                        </li>
                                                        <li>
                                                            <div class="sort-btn-wr">
                                                                <button class="sort-btn">
                                                                    위로
                                                                    <img src="${contextPath}/images/sub/ico_arrow_up.png"
                                                                        alt="위로" class="icon">
                                                                </button>
                                                                <button class="sort-btn">
                                                                    아래로
                                                                    <img src="${contextPath}/images/sub/ico_arrow_down.png"
                                                                        alt="아래로" class="icon">
                                                                </button>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <!-- <tr>
                                                <th scope="row">메뉴 유형</th>
                                                <td>
                                                    <label for="mu_sh_01"></label>
                                                    <input id="mu_sh_01">
                                                </td>
                                            </tr> -->
                                            <tr>
                                                <th scope="row">공개여부</th>
                                                <td>
                                                    <label for="useYn"></label>
                                                    <input id="useYn">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">개인식별정보</th>
                                                <td>
                                                    <label for="prvcIdntfYn"></label>
                                                    <input id="prvcIdntfYn">
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">메뉴접근권한</th>
                                                <td>
                                                	<label for="mnAccAuth"></label>
                                                    <input type="text" id="mnAccAuth" class="adm_input read_input" readonly>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="btn_flex">
                                    <button class="blue_btn save_btn">저장</button>
                                    <button class="blue_btn02 insert_btn">대메뉴 추가</button>
                                    <button class="blue_btn03 update_btn">수정</button>
                                  <button class="red_btn adm_btn" id ="delete_btn">삭제</button>
                                    <button class="gray_btn cancel_btn">취소</button>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>

				<script id="treeview-template" type="text/kendo-ui-template">
					<a href="javascript:$menu.ui.detailView('#: item.menuCd#','#: item.menuNm#','#: nvl(item.menuUrl, "")#','#: nvl(item.upMenuCd, "")#','#: nvl(item.upMenuNm, "")#','#: item.menuOrdr#','#: item.useYn#','#: item.prvcIdntfYn#');">#: item.menuNm #</a>
			 	</script>
			</div>
		</div>
	</div>
</div>
