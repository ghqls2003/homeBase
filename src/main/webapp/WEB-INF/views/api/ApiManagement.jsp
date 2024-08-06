<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }" />
<link rel="stylesheet" type="text/css"
	href="${contextPath}/css/custom/inquiry.css" />

<script src="${contextPath}/js/api/ApiManagement.js"></script>
<script>
	
</script>
<style>
#inquiryContent {
	height: 400px;
}

#file2 {
	width: 100%;
	height: 40px;
	background-color: #fff;
	border: 1px solid #DBE0EC;
	border-radius: 8px;
	padding-left: 19px;
	font-size: 1.6rem;
}
/* ********************************************************************************************************************* */
/* common */
#container {
	position: relative;
	width: 100%;
	height: calc(100vh - 203px);
	padding: 86px 0;
}

.adm_wrap {
	width: 1440px;
	margin: 0 auto;
}

img.ani_img01 {
	position: absolute;
	top: -116px;
	left: -79px;
	z-index: -1;
	animation: up-down 2s linear infinite alternate;
}

img.ani_img02 {
	position: absolute;
	bottom: 106px;
	left: 64px;
	z-index: -1;
	animation: deco-cycl-ani 5s linear infinite alternate;
}

img.ani_img03 {
	position: absolute;
	bottom: 50px;
	left: 50px;
	z-index: -1;
	animation: deco-ova-ani 40s linear infinite alternate;
}

.header .gnb-wr .gnb>li:nth-child(1) .depth-wr {
	margin-left: -442px;
}

.header .gnb-wr .gnb>li:nth-child(2) .depth-wr {
	margin-left: -186px;
}

.header .gnb-wr .gnb>li:nth-child(3) .depth-wr {
	margin-left: 69px;
}

.header .gnb-wr .gnb>li:nth-child(4) .depth-wr {
	margin-left: 326px;
}

.ham_menu .gnb>li:nth-child(1).active .gnb-depth {
	height: 140px;
}

.ham_menu .gnb>li:nth-child(2).active .gnb-depth {
	height: 104px;
}

.ham_menu .gnb>li:nth-child(3).active .gnb-depth {
	height: 176px;
}

.ham_menu .gnb>li:nth-child(4).active .gnb-depth {
	height: 104px;
}

.adm_tit {
	display: flex;
	align-items: center;
}

.adm_tit img.tit_icon {
	margin-right: 11px;
}

.adm_tit h2 {
	font-size: 3.5rem;
	line-height: 54px;
	font-weight: bold;
	color: #0C2556;
}

.adm_box {
	background-color: #fff;
	border-radius: 8px;
	border: 1px solid #E2E2E2;
}

.box_tit {
	width: 100%;
	background-color: #0C2556;
	border-radius: 8px 8px 0 0;
	padding: 10px 24px;
}

.box_tit h3 {
	font-size: 1.6rem;
	color: #fff;
	line-height: 26px;
	font-weight: 500;
}

button.blue_btn {
	width: 100%;
	height: 54px;
	background-color: #5A75F8;
	border-radius: 8px;
	font-size: 1.8rem;
	line-height: 26px;
	color: #fff;
	text-align: center;
	font-weight: 500;
}

button.blue_btn:hover {
	background-color: #fff;
	border: 1px solid #5A75F8;
	color: #5A75F8;
}

button.blue_btn02 {
	width: 100%;
	height: 54px;
	background-color: #818FD4;
	border-radius: 8px;
	font-size: 1.8rem;
	line-height: 26px;
	color: #fff;
	text-align: center;
	font-weight: 500;
}

button.blue_btn02:hover {
	background-color: #fff;
	border: 1px solid #818FD4;
	color: #818FD4;
}

button.blue_btn03 {
	width: 100%;
	height: 54px;
	background-color: #ABB4DC;
	border-radius: 8px;
	font-size: 1.8rem;
	line-height: 26px;
	color: #fff;
	text-align: center;
	font-weight: 500;
}

button.blue_btn03:hover {
	background-color: #fff;
	border: 1px solid #ABB4DC;
	color: #ABB4DC;
}

button.gray_btn {
	width: 100%;
	height: 54px;
	background-color: #DEDEDE;
	border-radius: 8px;
	font-size: 1.8rem;
	line-height: 26px;
	color: #000;
	text-align: center;
	font-weight: 500;
}

button.gray_btn:hover {
	background-color: #000;
	border: 1px solid #000;
	color: #DEDEDE;
}

button.lt_gray_btn {
	width: 100%;
	height: 54px;
	background-color: #5D5D5D;
	border-radius: 8px;
	font-size: 1.8rem;
	line-height: 26px;
	color: #fff;
	text-align: center;
	font-weight: 500;
}

button.lt_gray_btn:hover {
	background-color: #DEDEDE;
	border: 1px solid #DEDEDE;
	color: #5D5D5D;
}

button.exel_down {
	width: 75px;
	height: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #E2E2E2;
	border-radius: 8px;
	font-size: 1.4rem;
	color: #888888;
}

button.exel_down img {
	margin-right: 3px;
}

button.red_btn {
	width: 100%;
	height: 54px;
	background-color: #e04e36;
	border-radius: 8px;
	font-size: 1.8rem;
	line-height: 26px;
	color: #fff;
	text-align: center;
	font-weight: 500;
}

button.red_btn:hover {
	background-color: #fff;
	border: 1px solid #e04e36;
	color: #e04e36;
}

button.red_btn {
	width: 100%;
	height: 54px;
	background-color: #e04e36;
	border-radius: 8px;
	font-size: 1.8rem;
	line-height: 26px;
	color: #fff;
	text-align: center;
	font-weight: 500;
}

button.red_btn:hover {
	background-color: #fff;
	border: 1px solid #e04e36;
	color: #e04e36;
}

.flex {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.flex_02 {
	display: flex;
	align-items: center;
}

/*  */
@media ( max-width : 480px) {
	img.ani_img01 {
		width: 253px;
	}
	img.ani_img02 {
		left: -7px;
		bottom: 83px;
		width: 131px;
	}
	img.ani_img03 {
		left: -10px;
		bottom: 29px;
		width: 82px;
	}
	.box_tit {
		padding: 10px 15px
	}
	.box_tit h3 {
		line-height: 18px;
	}
	.login button.blue_btn {
		height: 40px;
	}
	button.exel_down {
		width: 64px;
		height: 26px;
	}
	button.exel_down img {
		width: 15px;
	}
}

/* ********************************************************************************************************************* */
/* ******* kendo ******* */
/* grid */
.k-grid {
	font-family: 'Pretendard' !important;
	background-color: transparent !important;
	border-width: 0 !important;
}

.k-grid-header .k-header {
	vertical-align: middle !important;
}

.k-grid-header .k-header img.i_arrow {
	display: inline-block;
	margin-left: 6px;
	vertical-align: middle;
}

.k-grid td {
	text-align: center;
	border-bottom: 1px solid #E8EDF8;
	border-width: 0;
	border-bottom: 1px solid #E8EDF8;
	color: #000;
	font-size: 1.6rem;
	font-weight: 300;
	word-break: keep-all;
	white-space: nowrap; /*text-overflow: clip;*/
}

.k-header, th.k-header {
	background-color: #fff;
	border-width: 0;
	border-bottom: 1px solid #E8EDF8;
	height: 45px;
	font-size: 1.5rem;
	color: #989898;
	text-align: center;
	word-break: keep-all;
	white-space: nowrap;
	text-overflow: clip;
}

.k-cell-inner>.k-link {
	justify-content: center;
}

.k-grid tr.k-alt, .k-alt {
	background-color: #fff;
}

.k-grid tr:last-child td {
	border-bottom: 0;
}

/* datepicker */
.k-datepicker {
	width: 170px;
	height: 40px;
	background-color: #fff !important;
	border-radius: 8px;
	border: 1px solid #D5D5D5 !important;
	color: #000;
}

.date_pic {
	border: 0;
}

.k-button-solid-base {
	background-color: #fff;
	border: 0;
}

.k-button-solid-base:hover {
	background-color: #fff;
}

.k-button-md.k-icon-button>.k-i-calendar {
	opacity: 0;
}

.k-input-button {
	background: url('../images/sub/ico_calender02.png') no-repeat 0 50%;
}

.k-input-md .k-input-inner {
	font-size: 1.6rem;
	padding: 5px 8px 4px 14px
}

/* datepicker-calender */
.k-calendar .k-calendar-view .k-today {
	color: #4A64F5;
}

.k-calendar .k-calendar-td.k-hover .k-link, .k-calendar .k-calendar-td:hover .k-link
	{
	background-color: #ffefb8;
}

.k-calendar .k-calendar-td.k-selected .k-link {
	background-color: #FED64C;
}

.k-calendar .k-calendar-td.k-selected.k-hover .k-link, .k-calendar .k-calendar-td.k-selected:hover .k-link
	{
	background-color: #ffe076;
}

@media ( max-width :420px) {
	.k-header, th.k-header {
		font-weight: 500;
		height: 36px;
	}
	.k-grid td {
		font-size: 1.4rem;
		font-weight: 400;
	}
}

/* grid-pager */
.k-grid-pager {
	border-width: 0;
}

.k-pager-wrap {
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
}

.k-pager-info {
	display: none;
}

.k-pager-numbers .k-link {
	color: #000;
}

.k-pager-wrap .k-link:hover {
	background-color: transparent;
}

.k-pager-numbers .k-link.k-selected {
	background-color: #fff;
	border-radius: 8px;
	border: 1px solid #E2E2E2;
	color: #000;
	font-weight: 500;
}

.k-grid-header .k-i-sort-asc-sm, .k-grid-header .k-i-sort-desc-sm {
	color: #989898;
	display: none;
}

.k-i-sort-asc-sm::before {
	content: '\e013';
}

.k-i-sort-desc-sm::before {
	content: '\e015';
}

.k-pager-sm .k-pager-numbers-wrap select.k-dropdown, .k-pager-sm .k-pager-numbers-wrap select.k-dropdown-list
	{
	display: none !important;
}

.k-pager-sm .k-pager-numbers {
	display: flex;
}

@media ( max-width :42700px) {
	.k-pager-numbers .k-link {
		font-size: 1.4rem;
	}
}

/* dropdownlist */
.k-picker-solid {
	width: 170px;
	height: 40px;
	background-color: #fff;
	border: 1px solid #DBE0EC;
	border-radius: 8px;
	background-image: none;
}

.k-picker-solid.k-hover, .k-picker-solid:hover {
	background-color: #F5F8FE;
}

.k-input-value-text {
	font-size: 1.6rem;
	color: #000;
	font-weight: 500;
	padding-left: 6px;
	line-height: 26px;
}

.k-list-item.k-selected {
	background-color: #364BC6;
}

.k-list-item.k-selected.k-hover, .k-list-item.k-selected:hover {
	background-color: #8f9ff9;
}

.k-dropdownlist .k-input-button {
	background: url('../images/sub/ico_arrow_down.png') no-repeat 40% 50%;
}

.k-dropdownlist .k-icon-button .k-icon {
	opacity: 0;
}

/* treeview */
.k-treeview {
	font-size: 1.5rem;
}

.k-treeview-leaf.k-selected {
	background-color: transparent;
	color: #95B94A;
}

.k-treeview-leaf .k-sprite {
	margin-right: 9px;
}

.k-sprite.folder {
	background: url('../images/sub/ico_folder.svg') no-repeat center;
}

.k-sprite.html {
	background: url('../images/sub/ico_html.svg') no-repeat center;
}

.k-treeview-leaf.k-hover, .k-treeview-leaf:hover {
	background-color: transparent;
	color: #95B94A;
}

.k-item[aria-expanded="true"] .k-treeview-leaf .k-sprite.folder {
	background: url('../images/sub/ico_folder.svg') no-repeat center;
}

.k-item[aria-expanded="false"] .k-treeview-leaf .k-sprite.folder {
	background: url('../images/sub/ico_folder02.svg') no-repeat center;
}

/* ********************************************************************************************************************* */
/* 로그인 */
.login_input {
	width: 100%;
	height: 54px;
	background-color: #fff;
	border: 1px solid #E2E2E2;
	border-radius: 8px;
	font-size: 1.6rem;
	line-height: 26px;
	padding-left: 16px;
}

.login_input::placeholder {
	font-size: 1.6rem;
	line-height: 26px;
	color: #9FA1A2;
}

#container {
	background-color: #6A80F8;
	z-index: 1;
}

.login .login-wr {
	width: 100%;
	height: 100%;
	background-color: #fff;
	border-radius: 22px;
	display: flex;
	align-items: center;
	overflow: hidden;
	margin: 0 auto;
}

.login .login-wr .login_bg {
	
}

.login .login-wr .login_bg img.lg_bg {
	margin-bottom: -21px;
	object-position: bottom;
}

.login .adm_tit {
	margin-bottom: 26px;
}

.login .login-wr .adm_login {
	padding: 52px 48px;
	width: 100%;
}

.login .login-wr .adm_login .login_form {
	padding: 29px 32px 22px;
}

.login .login-wr .adm_login button.login_btn {
	margin-top: 33px;;
}

.login table.lg_tb th, .login table.lg_tb td {
	padding: 5px 0;
}

.login table.lg_tb th {
	text-align: left;
	font-size: 1.6rem;
	line-height: 26px;
	color: #000;
	font-weight: 600;
}

.login ul.find_link {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
}

.login ul.find_link li.link {
	
}

.login ul.find_link li.line {
	width: 1px;
	height: 22px;
	background-color: #E2E2E2;
	margin: 0 27px;
}

.login ul.find_link li.link a {
	font-size: 1.6rem;
	line-height: 26px;
	color: #888888;
}

/*  */
@media ( min-width : 1921px) {
	.login #container {
		padding: 277px 0;
	}
}

@media ( max-width : 1440px) {
	.login #container {
		padding: 48px 0
	}
	.login .adm_wrap {
		width: 1024px;
	}
	.login .login-wr .login_bg {
		width: 45%;
	}
	.login .login-wr .login_bg img.lg_bg {
		width: 100%;
		margin-bottom: -210px;
	}
	.login .login-wr .adm_login {
		width: 55%;
		padding: 30px 25px;
	}
}

@media ( max-width : 1200px) {
	.login #container {
		padding: 70px 0;
	}
	.login .adm_wrap {
		width: 820px;
	}
	.login .login-wr .login_bg img.lg_bg {
		margin-bottom: -235px;
	}
	.login .login-wr .adm_login .login_form {
		padding: 29px 22px 22px;
	}
}

@media ( max-width : 920px) {
	.login .adm_wrap {
		width: 540px;
	}
	.login .login-wr .login_bg {
		display: none;
	}
	.login .login-wr .adm_login {
		width: 100%;
		padding: 30px 42px
	}
}

@media ( max-width : 768px) {
	.login .adm_tit {
		margin-bottom: 15px;
	}
	.login .adm_tit img.tit_icon {
		width: 35px;
	}
}

@media ( max-width : 540px) {
	.login .adm_wrap {
		width: 100%;
		padding: 0 30px
	}
	.login .login-wr .adm_login {
		padding: 30px 25px;
	}
}

@media ( max-width : 480px) {
	.login #container {
		height: 100%;
	}
	.login .adm_tit img.tit_icon {
		width: 27px;
		margin-right: 8px;
	}
	.login .adm_tit h2 {
		font-size: 2.4rem;
		line-height: 24px;
	}
	.login .login-wr .adm_login {
		padding: 25px 15px
	}
	.login .login-wr .adm_login .login_form {
		padding: 14px 12px 18px;
	}
	.login table.lg_tb th {
		padding: 2px 8px;
		word-break: keep-all;
	}
	.login table.lg_tb td {
		padding: 3px 0;
	}
	.login .login-wr .adm_login button.login_btn {
		margin-top: 12px;
	}
	.login ul.find_link {
		margin-top: 8px;
	}
	.login ul.find_link li.line {
		height: 14px;
	}
	.login_input {
		height: 42px;
	}
}

/* ********************************************************************************************************************* */
/* sub common */
.adm_sub #container {
	background-color: #F5F8FE;
	height: 100%;
}

.adm_sub .tit_line {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 45px;
}

.adm_sub ul.arrow_tit {
	display: flex;
	align-items: center;
}

.adm_sub ul.arrow_tit li.mid {
	margin: 0 10px;
}

.adm_sub ul.arrow_tit li {
	font-size: 1.6rem;
	line-height: 26px;
	color: #888888;
}

.adm_sub ul.arrow_tit li.current {
	color: #000;
}

.adm_sub ul.searchBox {
	display: flex;
	align-items: center;
	margin-bottom: 19px;
}

.adm_sub ul.searchBox li {
	margin-right: 10px;
}

.adm_sub ul.searchBox li:last-child {
	margin-right: 0;
}

.adm_sub ul.searchBox label.adm_label {
	display: none;
}

.adm_sub ul.searchBox li.tit {
	margin-right: 0;
}

.adm_sub ul.searchBox li.tit span {
	display: inline-block;
	font-size: 1.6rem;
	color: #000;
	font-weight: 500;
	margin-right: 14px;
}

.adm_sub .adm_input {
	width: 229px;
	height: 40px;
	background-color: #fff;
	border: 1px solid #D5D5D5;
	border-radius: 8px;
	font-size: 1.6rem;
	line-height: 26px;
	font-weight: 500;
	color: #000;
	padding-left: 14px;
}

.adm_sub .adm_input::placeholder {
	font-size: 1.6rem;
	line-height: 26px;
	color: #9FA1A2;
}

.adm_sub .read_input {
	border: 0;
	color: #000;
	font-weight: 400;
}

.adm_sub .read_input::placeholder {
	color: #000;
	font-weight: +400;
}

.adm_sub .read_input:focus {
	outline: none;
}

.adm_sub .adm_select {
	width: 170px;
	height: 40px;
	background-color: #fff;
	border: 1px solid #D5D5D5;
	border-radius: 8px;
	font-size: 1.6rem;
	line-height: 26px;
	font-weight: 500;
	color: #000;
	padding-left: 14px;
}

.adm_sub .btn_flex {
	margin-top: 87px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.adm_sub .btn_flex button {
	width: 152px;
	margin-right: 10px;
}

.adm_sub .btn_flex button:last-child {
	margin-right: 0;
}

.adm_sub button.search_btn {
	width: 80px;
	height: 38px;
	background-color: #5A75F8;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.6rem;
	color: #fff;
	line-height: 26px;
	font-weight: 500;
}

.adm_sub button.ap_btn {
	width: 157px;
	height: 42px;
	border-radius: 8px;
	text-align: center;
	font-size: 1.6rem;
	line-height: 26px;
	font-weight: 500;
	color: #fff;
}

.adm_sub button.ap_btn.type_01 {
	background-color: #5A75F8;
}

.adm_sub button.ap_btn.type_02 {
	background-color: #6BB5D6;
}

.adm_sub button.ap_btn.type_03 {
	background-color: #E04E36;
}

.adm_sub button.ap_btn.type_04 {
	background-color: #D5D5D5;
	color: #000;
}

.adm_sub .adm_txtarea {
	width: 100%;
	height: 137px;
	border: 1px solid #E2E2E2;
	border-radius: 8px;
	padding: 14px;
}

.adm_sub .year_picker label {
	display: none;
}

.adm_sub ul.dateBox {
	display: flex;
	align-items: center;
}

.adm_sub ul.dateBox li {
	margin-right: 0;
}

.adm_sub ul.dateBox li.bar {
	margin: 0 4px
}

/*  */
@media ( max-width : 1600px) {
	.adm_sub .adm_wrap {
		width: 100%;
		padding: 0 60px;
	}
}

@media ( max-width : 800px) {
	.adm_sub ul.searchBox {
		flex-direction: column;
		margin-bottom: 14px;
	}
	.adm_sub ul.searchBox li {
		width: 100%;
		margin-right: 0;
		margin-bottom: 6px;
	}
	.adm_sub ul.searchBox li:last-child {
		margin-bottom: 0;
	}
	.adm_sub ul.searchBox .k-picker-solid {
		width: 100%;
	}
	.adm_sub ul.searchBox .adm_input {
		width: 100%;
	}
	.adm_sub ul.searchBox button.search_btn {
		width: 100%;
	}
	.adm_sub ul.dateBox li.mo_li {
		width: 100%;
		margin-bottom: 0;
	}
	.adm_sub ul.dateBox li .k-datepicker {
		width: 100%;
	}
	.adm_sub ul.dateBox li.bar {
		width: auto;
	}
}

@media ( max-width : 540px) {
	.adm_sub .tit_line {
		flex-direction: column;
	}
	.adm_sub .adm_tit img.tit_icon {
		width: 35px;
	}
	.adm_sub .adm_tit h2 {
		font-size: 3rem;
		line-height: 33px;
	}
	.adm_sub ul.arrow_tit {
		margin-top: 8px;
	}
	.adm_sub .btn_flex button {
		width: 127px;
	}
}

@media ( max-width : 480px) {
	.adm_sub #container {
		padding: 64px 0;
	}
	.adm_sub .adm_wrap {
		padding: 0 20px
	}
	.adm_sub .adm_tit img.tit_icon {
		width: 28px;
	}
	.adm_sub ul.arrow_tit li {
		font-size: 1.4rem;
		line-height: 16px;
	}
	.adm_sub ul.arrow_tit li.mid {
		margin: 0 6px
	}
	.adm_sub ul.arrow_tit li.home img {
		width: 10px;
	}
	.adm_sub .btn_flex {
		margin-top: 72px;
	}
	.adm_sub .btn_flex button {
		width: 90px;
		height: 38px;
		margin-right: 6px;
	}
	.adm_sub ul.searchBox button.search_btn img {
		width: 27px;
	}
	.adm_sub button.ap_btn {
		width: 98px;
		height: 33px;
	}
	.adm_sub .tit_line {
		margin-bottom: 35px;
	}
}

/* 팝업 */
.popup {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0px;
	left: 0px;
	transform: translateX(100%);
	opacity: 0;
	transition: opacity .2s 0s, transform 0s .4s;
	z-index: 9999;
}

.popup::before {
	position: absolute;
	top: 0;
	left: 0;
	content: '';
	width: 100%;
	height: 100%;
	background-color: #000a;
}

.popup.view {
	transform: translateX(0%);
	opacity: 1;
	transition: opacity 1s 0s, transform 0s 0s;
}

.popup .box {
	width: 589px;
	height: 577px;
	background-color: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 2;
	border-radius: 8px;
}

.popup .box .popup_top {
	background-color: #0C2556;
	border: 1px solid #0C2556;
	width: 100%;
	height: 46px;
	border-radius: 8px 8px 0 0;
}

.popup .box .popup_top h4 {
	color: #fff;
	font-size: 1.8rem;
	font-weight: 600;
	line-height: 44px;
	padding-left: 25px;
}

.popup .box .content {
	width: 100%;
	padding: 28px 37px 0;
}

.popup .close {
	position: absolute;
	top: 0px;
	right: 24px;
	width: 20px;
	height: 20px;
	cursor: pointer;
	border-radius: 50px;
}

.popup .close span {
	position: absolute;
	top: 24px;
	left: 50%;
	transform: translate(-50%, -50%) rotate(-45deg);
	width: 18px;
	height: 2px;
	background-color: #fff;
}

.popup .close span:nth-child(2) {
	transform: translate(-50%, -50%) rotate(45deg);
}

.popup .flex .adm_input {
	margin-right: 10px;
}

.popup .adm_input {
	width: 100%;
	height: 42px;
}

.popup .btn_flex {
	margin-top: 33px;
}

button.double_chk {
	width: 101px;
	height: 42px;
	background-color: #888888;
	border-radius: 8px;
	font-size: 1.6rem;
	color: #fff;
	font-weight: 500;
	text-align: center;;
}

.popup .radius_box {
	background-color: #fff;
	border-radius: 8px;
	border: 1px solid #E8EDF8;
	width: 100%;
	margin-bottom: 10px;
}

.popup .radius_box .nameBox {
	padding: 11px 24px;
	background-color: #F5F8FE;
	border-bottom: 1px solid #E8EDF8;
	border-radius: 8px 8px 0px 0px;
}

.popup .radius_box .nameBox h4 {
	color: #000;
	font-size: 1.5rem;
}

.popup .radius_box .cont {
	padding: 12px 20px;
}

.popup .flex {
	justify-content: flex-start;
}

.popup .tb_wr_flex {
	display: flex;
}

table.popup_tb {
	width: 100%;
}

table.popup_tb tr th, table.popup_tb tr td {
	padding: 5px 6px;
}

table.popup_tb tr th {
	width: 124px;
	text-align: left;
	font-size: 1.6rem;
	font-weight: 600;
	white-space: nowrap;
}

.popup th.th_top {
	vertical-align: top;
	padding-top: 15px;
}

/* 파일첨부 */
.filebox .upload-name {
	display: inline-block;
	width: 80%;
	height: 41px;
	background-color: #fff;
	border: 1px solid #E2E2E2;
	border-radius: 8px;
	padding-left: 16px;
	font-size: 1.6rem;
}

.filebox .upload-name::placeholder {
	color: #9FA1A2;
	font-weight: 400;
}

.filebox label.file_btn {
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #E2E2E2;
	width: 101px;
	height: 41px;
	border-radius: 8px;
	font-size: 1.6rem;
	line-height: 26px;
	color: #888888;
	font-weight: 500;
	text-align: center;
	line-height: 40px;
}

.filebox input[type="file"] {
	position: absolute;
	width: 0;
	height: 0;
	padding: 0;
	overflow: hidden;
	border: 0;
}

.filebox label:focus {
	outline: #000;
}

/* ********************************************************************************************************************* */
/* 시스템 관리 */
/* 사용자 상세, 관리자 상세 팝업*/
.popup.user_detail .box {
	width: 772px;
	height: 700px;
}

.popup.user_detail .adm_input {
	width: 157px;
}

.popup.user_detail02 .box {
	width: 772px;
	height: 517px;
}

.popup.user_detail02 .adm_input {
	width: 157px;
}

.popup.user_detail table.mo_tb label.adm_label {
	width: 124px;
	text-align: left;
	font-size: 1.6rem;
	font-weight: 600;
	white-space: nowrap;
}

.adm_sub .popup .adm_select {
	width: 100%;
}

.adm_sub .popup .k-input-value-text {
	padding-left: 0;
	font-weight: 400;
}

/* 공통코드 등록 팝업 */
.popup.cmn_pop .box {
	height: 649px;
}

/*  */
@media ( max-width : 768px) {
	.popup .box {
		width: 520px;
		height: 561px;
	}
	table.popup_tb tr th {
		width: 105px;
	}
	.popup.user_detail .box {
		width: 620px;
	}
	.popup.user_detail02 .box {
		width: 720px;
	}
}

@media ( max-width : 640px) {
	.popup.user_detail .box {
		width: 510px;
	}
	.popup.user_detail02 .box {
		height: 700px;
	}
	.popup.user_detail .box .content {
		overflow-x: scroll;
		height: 534px;
	}
	.popup.user_detail .adm_input {
		width: 100%;
	}
	.popup.user_detail table.popup_tb tr th {
		width: 88px;
	}
	.popup.user_detail table.mo_tb label.adm_label {
		width: 115px;
	}
	.popup .tb_wr_flex {
		flex-direction: column;
	}
	.popup.user_detail table.mo_tb tr td {
		display: flex;
		flex-direction: column;
	}
	/* .popup.user_detail table.mo_tb .flex .adm_input{width: inherit;} */
}

@media ( max-width : 540px) {
	.popup .box {
		width: 430px;
	}
	.popup.user_detail .box {
		width: 450px;
	}
}

@media ( max-width : 480px) {
	.popup .box {
		width: 320px;
		height: 504px;
	}
	.popup.user_detail .box {
		width: 320px;
		height: 597px;
	}
	.popup .box .content {
		padding: 20px 10px 0;
	}
	.popup button.double_chk {
		height: 38px;
	}
	.popup .flex .adm_input {
		height: 38px;
	}
	.popup.user_detail table.mo_tb label.adm_label {
		width: 153px;
	}
	.popup.user_detail .box .content {
		height: 453px;
	}
	/* .popup.user_detail table.mo_tb .flex .adm_input{width: 60%;} */
	table.popup_tb tr th {
		width: 80px;
	}
	.popup .adm_input {
		height: 38px;
	}
	.adm_sub .adm_select {
		height: 38px;
	}
	.popup.cmn_pop .box {
		height: 605px;
	}
}

/* 권한관리 */
/* 탭메뉴 */
.popup ul.tabs {
	display: flex;
	align-items: center;
}

.popup ul.tabs li {
	display: inline-block;
	text-align: center;
}

.popup ul.tabs li button {
	font-size: 1.6rem;
	font-weight: 600;
	color: #000;
	padding: 11px 24px;
	background-color: #F3F7F9;
	border-radius: 8px 8px 0 0;
	border: 1px solid #E2E2E2;
	border-bottom: 0;
}

.popup ul.tabs li.current {
	position: relative;
}

.popup ul.tabs li.current02 {
	position: relative;
}

.popup ul.tabs li.current button {
	background-color: #fff;
}

.popup ul.tabs li.current02 button {
	background-color: #fff;
}

.popup .tab_cont {
	position: relative;
	width: 100%;
	height: 100%;
}

.popup .tab-content {
	display: none;
	background-color: #fff;
	border: 1px solid #E2E2E2;
	border-radius: 0 8px 8px 8px;
	width: 100%;
	height: 584px;
	padding: 26px 25px;
}

.popup .tab-content.current {
	display: flex;
}

.popup .tab-content.current02 {
	display: flex;
}

.popup.auth_pop .box {
	width: 772px;
	height: 813px;
	transform: translate(-50%, -45%);
}

.popup.auth_pop .treeview_wr {
	width: 50%;
	border-right: 1px solid #E2E2E2;
	padding-right: 21px;
}

.popup.auth_pop .treeview_wr ul.view_list>li {
	margin-bottom: 10px;
}

.popup.auth_pop .tb_wr {
	width: 50%;
	padding-left: 21px;
}

.popup.auth_pop table.popup_tb tr th {
	width: 96px;
}

.popup.auth_pop .adm_txtarea {
	height: 126px;
}

.popup.auth_pop .k-treeview-top.k-treeview-bot {
	background-color: #F3F7F9;
	border-radius: 20px;
	padding: 4px 16px;
	font-size: 1.4rem;
	font-weight: 600;
	color: #000;
	margin-bottom: 4px;
}

.popup.auth_pop .k-treeview-leaf {
	padding: 2px 5px;
}

.popup.auth_pop .k-treeview-leaf.k-selected {
	background-color: #F3F7F9;
	color: #000;
}

.popup.auth_pop .k-treeview-leaf.k-hover, .popup.auth_pop .k-treeview-leaf:hover
	{
	background-color: #F3F7F9;
	color: #000;
}

.popup.auth_pop .k-checkbox {
	border-color: #888888;
	width: 14px;
	height: 14px;
	border-radius: 2px;
}

.popup.auth_pop .a.k-treeview-itemuth_pop .k-checkbox.k-checked, .popup.auth_pop .k-checkbox:checked
	{
	background-color: #5A75F8;
	border-color: #5A75F8;
}

.popup.auth_pop .k-treeview-item {
	padding-left: 0;
}

.popup.auth_pop .k-treeview-group>li {
	font-size: 1.4rem;
	color: #888888;
}

.popup.auth_pop .k-treeview-toggle {
	position: absolute;
	right: 20px;
	background: url('../images/sub/gird_arrow.png') no-repeat 90% 50%;
	width: 20px;
	height: 20px;
}

.popup.auth_pop .k-treeview-toggle .k-icon {
	opacity: 0;
}

.popup.auth_pop .k-treeview-bot, .popup.auth_pop .k-treeview-mid, .popup.auth_pop .k-treeview-top
	{
	padding-left: 37px;
}

@media ( max-width : 820px) {
	.popup.auth_pop .box {
		width: 674px;
		height: 700px;
	}
	.popup.auth_pop .tab-content {
		height: 464px;
	}
}

@media ( max-width : 768px) {
	.popup.auth_pop .box {
		width: 572px;
	}
}

@media ( max-width : 540px) {
	.popup.auth_pop .box {
		width: 465px;
	}
	.popup.auth_pop .tab-content {
		padding: 22px 12px
	}
	.popup.auth_pop .treeview_wr {
		padding-right: 10px;
	}
	.popup.auth_pop .tb_wr {
		padding-left: 10px;
	}
}

@media ( max-width : 480px) {
	.popup ul.tabs li button {
		padding: 11px 17px
	}
	.popup.auth_pop .box {
		width: 320px;
		height: 670px;
	}
	.popup.auth_pop .tab-content {
		flex-direction: column;
		overflow-x: scroll;
	}
	.popup.auth_pop .treeview_wr {
		width: 100%;
		padding-right: 0;
		border-right: 0;;
		border-bottom: 1px solid #E2E2E2;
		padding-bottom: 10px;
	}
	.popup.auth_pop .tb_wr {
		width: 100%;
		padding-left: 0;
		padding-top: 15px;
	}
}

/* 메뉴관리 */
.adm_menu .fx-cont {
	display: flex;
	justify-content: space-between;
}

.adm_menu .fx-cont .menu-wr {
	width: 490px;
	padding: 29px 23px;
	margin-right: 16px;
	border-radius: 0 0 8px 8px;
	border-top: 0;
}

.adm_menu .fx-cont .input-wr {
	width: calc(100% - 500px);
}

.adm_menu .fx-cont .input-wr .adm_box {
	padding: 37px 24px 127PX;
}

.adm_menu  .k-treeview {
	font-size: 1.5rem;
	color: #000;
	font-weight: 400;
}

.adm_menu  .k-treeview-leaf.k-selected {
	color: #0C2556;
	font-weight: 600;
}

.adm_menu  .k-treeview-leaf.k-hover, .adm_menu  .k-treeview-leaf:hover {
	background-color: transparent;
	color: #0C2556;
	font-weight: bold;
}

.adm_menu .k-treeview-top.k-treeview-bot {
	background-color: #F3F7F9;
	border-radius: 20px;
	padding: 4px 16px;
	font-size: 1.4rem;
	font-weight: 600;
	color: #000;
	margin-bottom: 4px;
}

.adm_menu .k-checkbox:checked {
	background-color: #0C2556;
}

.adm_menu .k-checkbox.k-checked, .k-checkbox:checked {
	background-image: url('../images/adm/ico_chk_on.png');
	background-size: 8px;
}

.adm_menu .k-checkbox.k-indeterminate, .adm_menu  .k-checkbox:indeterminate
	{
	background-image: url('../images/adm/ico_chk_inter.png');
	background-size: 8px;
}

.adm_menu .k-treeview-top.k-treeview-bot {
	background-color: #F3F7F9;
	border-radius: 20px;
	padding: 4px 16px;
	font-size: 1.4rem;
	font-weight: 600;
	color: #000;
	margin-bottom: 4px;
}

.adm_menu .k-treeview-toggle {
	background: url('../images/sub/gird_arrow.png') no-repeat 95% 50%;
	position: absolute;
	right: 20px;
	width: 20px;
	height: 20px;
}

.adm_menu .k-treeview-toggle .k-icon {
	opacity: 0;
}

.adm_menu table.sf-input tr th, .adm_menu table.sf-input tr td {
	padding: 8px 12px;
}

.adm_menu table.sf-input tr th {
	width: 120px;
	font-size: 1.6rem;
	font-weight: 600;
	color: #000000;
	text-align: left;
}

.adm_menu .adm_input {
	width: 100%;
}

.adm_menu .k-picker-solid {
	width: 100%;
}

.adm_menu .tb-flex {
	width: 100%;
	display: flex;
	align-items: center;
}

.adm_menu .tb-flex li {
	margin-right: 10px;
}

.adm_menu .tb-flex li:first-child {
	width: 59%;
}

.adm_menu .tb-flex li:last-child {
	width: 41%;
	margin-right: 0;
}

.adm_menu .sort-btn-wr {
	display: flex;
	align-items: center;
}

.adm_menu .sort-btn-wr button.sort-btn {
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #F3F3F3;
	border: 1px solid #E2E2E2;
	border-radius: 8px;
	font-size: 1.6rem;
	color: #000;
	font-weight: 400;
	margin-right: 10px;
	padding: 12px 0;
}

.adm_menu .sort-btn-wr button.sort-btn:hover {
	background-color: #e1e1e1;
}

.adm_menu .sort-btn-wr button.sort-btn:last-child {
	margin-right: 0;
}

.adm_menu .sort-btn-wr button.sort-btn img.icon {
	margin-left: 14px;
}

.adm_menu .btn_flex {
	margin-top: 16px;
}

/* 탭메뉴 */
.adm_menu ul.tabs {
	display: flex;
	align-items: center;
	width: 488px;
}

.adm_menu ul.tabs li {
	width: 50%;
	text-align: center;
	background-color: #0C2556;
	border-radius: 8px 8px 0 0;
	border-top: 1px solid #E2E2E2;
	border-left: 1px solid #E2E2E2;
	border-right: 1px solid #E2E2E2;
	padding: 14px 0;
}

.adm_menu ul.tabs li button {
	font-size: 1.6rem;
	font-weight: 500;
	color: #fff;
}

.adm_menu ul.tabs li.current {
	background-color: #fff;
}

.adm_menu ul.tabs li.current button {
	color: #000;
}

.adm_menu .tab_cont {
	position: relative;
	width: 100%;
}

.adm_menu .tab-content {
	display: none;
}

.adm_menu .tab-content.current {
	display: inherit;
}

/*  */
@media ( max-width : 1080px) {
	.adm_menu .fx-cont {
		flex-direction: column;
	}
	.adm_menu .fx-cont .menu-wr {
		width: 100%;
		margin-bottom: 10px;
		margin-right: 0;
	}
	.adm_menu .fx-cont .input-wr {
		width: 100%;
	}
}

@media ( max-width : 640px) {
	.adm_menu ul.tabs {
		width: 100%;
	}
	.adm_menu .fx-cont .input-wr .adm_box {
		padding: 37px 24px 45px;
	}
}

@media ( max-width : 480px) {
	.adm_menu .fx-cont .menu-wr {
		padding: 20px 15px
	}
	.adm_menu .fx-cont .input-wr .adm_box {
		padding: 20px 15px 28px
	}
	.adm_menu table.sf-input tr th, .adm_menu table.sf-input tr td {
		padding: 4px 8px;
	}
	.adm_menu table.sf-input tr th {
		width: 90px;
		vertical-align: top;
		padding-top: 16px;
	}
	.adm_menu .tb-flex {
		flex-direction: column;
	}
	.adm_menu .tb-flex li {
		margin-right: 0;
		margin-bottom: 10px;
	}
	.adm_menu .tb-flex li:first-child, .adm_menu .tb-flex li:last-child {
		width: 100%;
	}
}

/* ********************************************************************************************************************* */
/* 오픈 API 관리 */

/* API 사용관리 */
/* API 상세 팝업 */
.popup.api_pop .box {
	height: 619px;
}

.popup.api_pop table.popup_tb tr th {
	width: 162px;
}

/*  */
@media ( max-width : 480px) {
	.popup.api_pop .box {
		height: 549px;
		transform: translate(-50%, -45%);
	}
	.popup.api_pop table.popup_tb tr th {
		width: 112px;
	}
}

/* ********************************************************************************************************************* */
/* 시스템 통계 */

/* API 이용 통계 */
/* API 이용 통계 상세 팝업 */
.popup.api_detail .box {
	width: 939px;
	height: 658px;
}

.popup.api_detail .k-input-button {
	background-size: 17px;
}

.popup.api_detail .radius_box {
	margin: 19px 0 75px;
}

.popup.api_detail table.popup_tb01 {
	margin-right: 22px;
}

/*  */
@media ( max-width : 960px) {
	.api_page ul.searchBox {
		flex-direction: column;
	}
	.api_page ul.searchBox>li {
		width: 100%;
		margin-bottom: 6px;
	}
	.api_page ul.dateBox li.mo_li {
		width: 100%;
	}
	.api_page ul.dateBox li .k-datepicker {
		width: 100%;
	}
	.api_page .k-picker-solid {
		width: 100%;
	}
	.api_page .adm_input {
		width: 100%;
	}
	.api_page button.search_btn {
		width: 100%;
	}
	.popup.api_detail .box {
		width: 752px;
	}
	.popup.api_detail .k-datepicker {
		width: 136px;
	}
	.popup.api_detail table.popup_tb tr th {
		width: 78px;
	}
}

@media ( max-width : 820px) {
	.popup.api_detail .box {
		height: 622px;
	}
}

@media ( max-width : 768px) {
	.popup.api_detail .tb_wr_flex {
		flex-direction: column;
	}
	.popup.api_detail ul.dateBox li.mo_li {
		width: 100%;
	}
	.popup.api_detail .k-datepicker {
		width: 100%;
	}
	.popup.api_detail .box {
		width: 596px;
		height: 715px;
	}
}

@media ( max-width : 640px) {
	.popup.api_detail .box {
		width: 440px;
		height: 681px;
	}
}

@media ( max-width : 480px) {
	.popup.api_detail .radius_box {
		margin: 10px 0 60px
	}
	.popup.api_detail .box {
		width: 320px;
		height: 632px;
	}
}

/* ********************************************************************************************************************* */
/* 게시판 관리 */

/* 공지사항 관리 */
.popup.notice_popup .box {
	height: 498px;
}

/*  */
@media ( max-width : 480px) {
	.popup.notice_popup .box {
		height: 463px;
	}
}

/* 공지사항 관리 */
.popup.inquiry_pop .box {
	height: 600px;
}

/*  */
@media ( max-width : 480px) {
	.popup.inquiry_pop .box {
		height: 553px;
	}
}
</style>

<%-- <input type="hidden" id="inquirySn" value="${inquiry}"> --%>
<div class="adm_sub">
	<div id="container">
		<div class="adm_wrap">
			<div class="tit_line">
				<div class="adm_tit">
					<img src="../images/adm/adm_tit.png" class="tit_icon" alt="타이틀아이콘">
					<h2>API 사용 관리</h2>
				</div>
				<ul class="arrow_tit">
					<li class="home"><img src="../images/sub/ico_home.png"
						alt="홈아이콘"></li>
					<li class="mid"><img src="../images/sub/ico_menuLine.png"
						alt="라인"></li>
					<li>오픈 API 관리</li>
					<li class="mid"><img src="../images/sub/ico_menuLine.png"
						alt="라인"></li>
					<li class="current">API 사용 관리</li>
				</ul>
			</div>
			<div class="content">
				<ul class="searchBox">
					<li class="li_slec"><label for="start-date"></label> <input
						id="start-picker02"></li>
					<li class="li_slec"><label for="end-date"></label> <input
						id="end-picker02"></li>
					<li class="li_slec">
						<div class="dropdown">
							<label for="search_stts_cd2"></label> <input id="search_stts_cd2">
						</div>
					</li>
					<li class="li_slec">
						<div class="dropdown">
							<label for="search_stts_cd"></label> <input id="search_stts_cd">
						</div>
					</li>
					<li><label for="txt_input" class="adm_label">조회조건입력</label> <input
						type="text" class="adm_input" id="txt_input"
						placeholder="조회조건을 입력하세요."></li>
					<li><button class="search_btn">
							조회 <img src="../images/adm/ico_search.png" alt="조회">
						</button></li>
				</ul>
				<div class="adm_box">
					<div class="box_tit flex">
						<h3>인증키 발급 목록</h3>
						<button class="exel_down">
							<img src="../images/adm/ico_excel.png" alt="엑셀"> 엑셀
						</button>
					</div>
					<div class="grid_wr">
						<table id="key_grid">
							<caption>인증키 발급 조회</caption>
							<colgroup>
								<col style="width: 5%">
								<col style="width: 10%">
								<col style="width: 10%">
								<col style="width: 15%">
								<col style="width: 10%">
								<col style="width: 20%">
								<col style="width: 10%">
								<col style="width: 10%">
								<col style="width: 10%">
							</colgroup>
						</table>

						<script id="key-row" type="text/x-kendo-tmpl">
                                <tr data-uid="#: uid #">
                                    <td>#: key1#</td>
                                    <td>#: key2#</td>
                                    <td>#: key3#</td>
                                    <td>#: key4#</td>
                                    <td>#: key5#</td>
                                    <td>#: key6#</td>
                                    <td>#: key7#</td>
                                    <td>#: key8#</td>
                                    <td>#: key9#</td>
                                 </tr>
                            </script>
					</div>

					<!-- API 상세 팝업 -->
					<div class="popup cmn_detail api_pop">
						<div class="box">
							<div class="popup_top">
								<h4>API 상세</h4>
								<div class="close">
									<span></span> <span></span>
								</div>
							</div>
							<div class="content">
								<div class="tb_wr">
									<table class="popup_tb">
										<caption>API 상세</caption>
										<tbody>
											<tr>
												<th><label for="api_com" class="adm_label">회사명</label></th>
												<td><input type="text" id="api_com"
													class="adm_input read_input" readonly></td>
											</tr>
											<tr>
												<th><label for="api_id" class="adm_label">아이디</label></th>
												<td><input type="text" id="api_id"
													class="adm_input read_input" readonly></td>
											</tr>
											<tr>
												<th><label for="api_comNum">사업자 등록번호</label></th>
												<td><input type="text" id="api_comNum"
													class="adm_input read_input" readonly></td>
											</tr>
											<tr>
												<th><label for="api_state">상태</label></th>
												<td><input type="text" id="api_state"
													class="adm_input read_input" readonly></td>
											</tr>
											</tr>
											<tr>
												<th><label for="api_name">API 명</label></th>
												<td><input type="text" id="api_name"
													class="adm_input read_input" readonly></td>
											</tr>
											</tr>
											<tr>
												<th><label for="api_date01">승인일시</label></th>
												<td><input type="text" id="api_date01"
													class="adm_input read_input" readonly></td>
											</tr>
											<tr>
												<th><label for="api_date02">만료 예정일</label></th>
												<td><input id="api_date02" class="adm_input read_input"
													readonly></td>
												<td><input id="apiSn" class="adm_input read_input"
													type="hidden"></td>
												<td><input id="userSn" class="adm_input read_input"
													type="hidden"></td>
											</tr>
											<tr>
												<th><label for="api_app">요청 건수</label></th>
												<td><input id="api_app" class="adm_input read_input"
													placeholder="511" readonly></td>
											</tr>
										</tbody>
									</table>

								</div>
							</div>
							<div class="btn_flex">
								<button id="approveApi" class="blue_btn">승인</button>
								<button id="rejectApi" class="red_btn">반려</button>
								<!-- <button class="red_btn">중지</button> -->
								<button class="gray_btn cancel_btn">취소</button>
								<button id="stopApi" class="red_btn">중지</button>
								<button id="reuseApi" class="blue_btn">중지해제</button>
							</div>

						</div>
					</div>
					<script>
						// 						});
					</script>

				</div>

			</div>
		</div>
	</div>
</div>

