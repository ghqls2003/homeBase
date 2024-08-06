/*!
 * AnySign, v1.0.2.26
 *
 * For more information on this product, please see
 * https://www.hancomwith.com
 *
 * Copyright (c) HANCOM WITH INC. All Rights Reserved.
 *
 * Date: 2023-04-13
 */
//설정항목
var SimpleSignProp = {

	// 탭이벤트 정의
	tabControl : null,

	// 탭이벤트 하위노드 설정
	oldTabEventNode : null,

	// 기존 이벤트 저장
	aOldKeyupEventListner : null,

	aOldKeydownEventListner : null,

	//카카오,토스,PAYCO,PASS 주민번호 뒷번호 한자리 입력여부 설정( false : 사용안함 )
	genderFlag : false,

	checkBackFlag : false,

	//선택가능한 전체항목
	totalSignList : [
		{ title :'naversign',	name : '' , textId : 'L00001', star: 0 },//네이버 인증서
		{ title :'tosssign',	name : '' , textId : 'L00001', star: 0 },//토스인증서
		{ title :'kakaotalk',	name : '' , textId : 'L00001', star: 0 },//카카오톡 인증서
		{ title :'kakaopay',	name : '' , textId : 'L00001', star: 0 },//카카오페이 인증서
		{ title :'passsign',	name : '' , textId : 'L00001', star: 0 },//PASS 인증서
		{ title :'paycosign',	name : '' , textId : 'L00001', star: 0 }, //PAYCO 인증서
		{ title :'shinhansign', name : '' , textId : 'L00001', star: 0 }, //신한인증서
		{ title :'yessign',		name : '' , textId : 'L00001', star: 0 },//금융결제원 금융인증서 (개인)
		{ title :'yessignCorp',	name : '' , textId : 'L00001', star: 0 },//금융결제원 금융인증서 (사업자)
		{ title :'yessignInt',	name : '' , textId : 'L00001', star: 0 },//금융결제원 금융인증서 (통합)
	],
	//선택된 간편인증목록(배열순서대로 화면에 표시)
	simpleSignList : [],

	// 간편인증 배너 alt 설정 ("" 설정 시 기존 alt 사용)
	bannerExplain : "",

	//간편인증서 목록 재정렬
	initCookieList : function(){
		SimpleSignProp.simpleSignList = [];
		var cookieList = commSign.getCookie(AnySignProp.cookieName);
		if(commSign.isEmpty(cookieList)){
			//저장된 쿠키값 없을경우 전체목록표시
			for( var i in SimpleSignProp.totalSignList){
				var signType = SimpleSignProp.totalSignList[i];
				SimpleSignProp.simpleSignList.push(signType);
			}
		}else{
			//저장된 쿠키목록 표시
			var simpleSignList = cookieList.split(',');

			//최종 선택정보 존재여부 확인
			// var simpleSignLast = SimpleSignProp.getLastSign();
			// if(!commSign.isEmpty(simpleSignLast)){
			// 	if(simpleSignList.indexOf(simpleSignLast) != -1){
			// 		SimpleSignProp.simpleSignList.push({ title : simpleSignLast , name : '' , textId : 'L00001' });
			// 	}
			// }

			for( var i in simpleSignList){
				var signType = simpleSignList[i];
				if(signType == 'none') continue;
				// if(signType == simpleSignLast) continue;
				var splitTemp = simpleSignList[i].split("|");
				SimpleSignProp.simpleSignList.push({ title : splitTemp[0] , name : '' , textId : 'L00001', star: parseInt(splitTemp[1]) });
			}
		}
	},
	//간편인증서 솔루션 js 파일추가
	addJSFile : function(aCallBack){
		var js = [];
		var tmpName;
		for( var i = 0; i < SimpleSignProp.totalSignList.length; ++i){
			var signType = SimpleSignProp.totalSignList[i].title;
			// js.push(AnySignProp.aSimplePath + '/SimpleSign/js/' + signType + '.js');
			tmpName = signType.indexOf('yessign') == 0 ? 'yessign' : signType;
			if(!js.some(function (item) { return item.indexOf('yessign') == 0 }))
				js.push(AnySignProp.aSimplePath + '/SimpleSign/js/' + tmpName + '.js');
		}
		commSign.addJavascripts(js,aCallBack);
	},
	//간편인증서 언어js파일 추가
	addLanguageFile : function(aCallBack){
		//이미 추가된 언어js파일삭제
		commSign.removeJsCssFile(AnySignProp.aSimplePath + '/SimpleSign/locale','js');
		//언어js파일 추가
		var js = [AnySignProp.aSimplePath + '/SimpleSign/locale/simplesign_' + AnySignProp.signLanguage + '.js'];
		var tmpName;

		for( var i = 0; i < SimpleSignProp.totalSignList.length; ++i){
			// var signType = SimpleSignProp.totalSignList[i];
			// js.push(AnySignProp.aSimplePath + '/SimpleSign/locale/' + signType.title + '_' + AnySignProp.signLanguage + '.js');
			var signType = SimpleSignProp.totalSignList[i].title;
			tmpName = signType.indexOf('yessign') == 0 ? 'yessign' : signType;
			if(!js.some(function (item) { return item.indexOf('yessign') == 0 }))
				js.push(AnySignProp.aSimplePath + '/SimpleSign/locale/' + tmpName + '_' + AnySignProp.signLanguage + '.js');
		}
		commSign.addJavascripts(js,function(){
			//타이틀 다국어적용
			for(var i = 0; i < SimpleSignProp.simpleSignList.length; ++i){
				var signType = SimpleSignProp.simpleSignList[i];
				SimpleSignProp.simpleSignList[i].name = commSign.getLanguage(signType.title,signType.textId);
			}
			for(var i = 0; i < SimpleSignProp.totalSignList.length; ++i){
				var signType = SimpleSignProp.totalSignList[i];
				SimpleSignProp.totalSignList[i].name = commSign.getLanguage(signType.title,signType.textId);
			}
			aCallBack();
		});
	},
	//최근 간편인증 설정
	setLastSign : function(title) {
		commSign.setCookie(AnySignProp.cookieNameLast, title, AnySignProp.cookieExpiredaysLast);
	},
	//최근 간편인증 설정정보 확인
	getLastSign : function() {
		var simpleTitle = commSign.getCookie(AnySignProp.cookieNameLast);
		return simpleTitle;
	}
}

//간편인증
var SimpleSign = {

	simpleSignCSS : AnySignProp.aSimplePath + '/SimpleSign/css/xTsign.css', /*간편인증서 화면 스타일 파일경로*/
	simpleSignMCSS : AnySignProp.aSimplePath + '/MWebASL/css/xTsign_m.css', /*간편인증서 화면 스타일 파일경로*/

	pcWebImg : 		AnySignProp.aSimplePath + '/SimpleSign/img/',
	mobileWebImg : 	AnySignProp.aSimplePath + '/MWebASL/img/',

	bInitSimpleSign : false, /*통합간편인증 초기화 여부(최최 1회만 실행되어야할 기능)*/
	aUserCallback : null, /*응답처리 콜백(호출한곳으로 결과값전달)*/

	// TODO: 간편인증 공용 파라미터 변수 by junseong
	// index.jsp 에서 입력한 값을 간편인증에서 사용해야할 경우 정보값을 담아주는 공용 변수
	aPlain : "",
	aOption : 0,
	aFuncName : "",
	aIdn : "",

	// 공통 인터페이스 옵션
	commonInfo : {
		companyNameKor : "OOOO",	// 이용기관명 한글  ex) 한컴위드
		companyNameEng : "OOOO"		// 이용기관명 영문	ex) Hancomwith
	},
	// TODO: 간편인증 사용시 각각의 간편인증 마다 인터페이스 옵션화 시키기 위해 추가함 by junseong
	// 네이버 인터페이스 옵션
	naverInfo : {
		// 네아로 콜백 URL
		/**** < 주의 사항 > ****/
		// 중요!!! : developers.naver.com 사이트에서 "네이버아이디로그인 Callback URL" 경로와 동일해야 함. 즉, 고객사마다 경로 수정해줘야 함.
		// 상단 Application 탭 -> 해당하는 내 애플리케이션 목록 선택 -> API 설정 탭 -> 네이버아이디로그인 Callback URL (최대 5개) -> 리스트에 경로 등록
		/*** ----------- *****/
		serviceVersion : "naver_v2",
		callCenterNo : "1588-3820", // 고객센터 번호
		mode : "sign_v1",
		deviceBrowser : "WB",
		deviceCode : "PC",
		onlineCenter : "https://help.naver.com/support/alias/membership/p.membership/p.membership_82.naver",
		onlineMobileCenter : "https://m.help.naver.com/support/alias/membership/m.membership/m.membership_67.naver",
		locationId : 5020
	},
	// 토스 인터페이스 옵션
	tossInfo : {
		serviceVersion : "toss_v2",
		signTitle : "전자서명", // 전자서명 제목
		locationId : 5030
	},
	// 금융인증서 공통 인터페이스 옵션
	fincertCommon : {
		orgCode : "DE00090000",
		apiKey : "2bb81cdf-c50a-4478-a11c-616f5c8d9e76",
		type : "CMS", //CMS or PKCS1
		encoding : "UTF-8", // UTF-8 or EUC-KR
		algorithm : "RSASSA-PKCS1-v1_5_SHA256", // RSASSA-PKCS1-v1_5_SHA256 or RSASSA-PSS_SHA256_MGF_SHA256
		oid : {
			'1.2.410.200005.1.1.1.10': true, // 금융인증서 OID
		},
		signType : "99", // 01:로그인 | 02:송금 | 03:금융상품가입/해지(예적금,대출,보험,펀드 등)
		// 04:전자계약체결/해지 | 05:납부/결제(공과금 납구,카드대금 결제 등) | 06:증명서발급
		// 07:자산연동(오픈뱅킹,마이데이터 등) | 08:인증수단관리(인증서,보안매체 폐지 등)
		// 99: 기타
		viewPlain : false,       // 금융인증서 사용중 평문확인창 활성화 유무
		crlMethod : "native", // native / api
		mobileAppEnable : false, // MobileApp에서 구현시 설정
	},
	// 금융인증서 (개인) 인터페이스 옵션
	fincertInfo : {
		init : false,
		sdk : "https://t-4user.yeskey.or.kr/v1/fincert.js", // sdk 개발 주소
		//sdk : "https://4user.yeskey.or.kr/v1/fincert.js", // sdk 운영 주소
		locationId : 5010
	},
	// 금융인증서 (사업자) 인터페이스 옵션
	fincertCorpInfo : {
		init : false,
		sdk : "https://t-4user.yeskey.or.kr/v1/fincertCorp.js", // sdk 개발 주소
		//sdk : "https://4user.yeskey.or.kr/v1/fincertCorp.js", // sdk 운영 주소
		locationId : 5011
	},
	// 금융인증서 (통합) 인터페이스 옵션
	fincertIntInfo : {
		init : false,
		sdk : "https://t-4user.yeskey.or.kr/v1/fincertInt.js", // sdk 개발 주소
		//sdk : "https://4user.yeskey.or.kr/v1/fincertInt.js", // sdk 운영 주소
		locationId : 5012
	},
	// 페이코 인터페이스 옵션
	paycoInfo : {
		serviceVersion : "payco",
		channelCode : "PC_WEB", // 요청 환경 코드 : PC_WEB, MOBILE_APP, MOBILE_WEB
		signTitle : "전자서명", // 전자서명 제목
		contentsTypeCode : "TEXT", // 전자 서명 원문 유형 코드 : JSON, TEXT, QUERY_STRING
		contentsViewTypeCode : "TEXT", // 전자 서명 원문 노출 유형 코드 : TEXT, TABLE
		locationId : 5040
	},
	// 카카오 페이 인터페이스 옵션
	kakaoPayInfo : {
		serviceVersion : "kakaoPay",
		signTitle : "전자서명", // 전자서명 제목
		callCenterNo : "1644-7405", // 고객센터 번호
		locationId : 5050
	},
	// 패스 인터페이스 옵션
	passInfo : {
		serviceVersion : "pass",
		reqTitle : "전자서명", // 인증요청 알림 제목
		reqContent : "전자서명 요청", // 인증요청 알림 내용
		signTargetTycd : "1", // 서명원문 형태 [1:text, 2:hash, 3:url, 4:nonce]
		callCenterNo : "1800-4273", // 고객센터 번호
		locationId : 5060
	},
	// 카카오 톡 인터페이스 옵션
	kakaoTalkInfo : {
		mode : "K3510", // String : K1110 (간편 인증) | K3510 (단일 전자서명) | K3511 (단일/다중 전자서명)
		requestIdentityTitle : "본인인증",	// K1110 요청 구분
		requestSignTitle : "전자서명", 	// K3510 & K3511 요청 구분
		requestOrgName : "한컴위드_테스트", // 전자서명을 요청하는 이용기관 이름
		//callCenterNo : "1644-7405", // 이용기관 고객센터 번호 (미구현)
		onlineCenter : "https://cs.kakao.com/requests?service=179&locale=ko",
		encVersion : 1, // 암복호화 키 버전
		type: "PERSONAL_INFO",
		encrypted: true, // 서명 데이터 암호화 유무 (default : true)
		locationId : 5070
	},
	// 신한sign 인터페이스 옵션
	shinhanInfo : {
		serviceVersion : "shinhan",
		deviceCode : "PC", // 요청 환경 코드 - PC, TB: Tablet, MO: Mobile
		deviceBrowser : "WB", // 요청 브라우저 - WB: Web Browser, NA: Native App, HY: Hybrid App
		consentType : "2", // 거래 구분 코드 - 1: 본인인증, 2: 전자서명
		locationId : 5080
	},

	// common initSimpleSign
	initSimpleSign : function(aFuncName, aPlain, aOption, aIdn, aTotal, aDelimeter, aFileInfo, aFileHash, aUserCallback) {
		//목록 재정렬
		if(AnySignProp.recentSort) SimpleSignProp.initCookieList();

		SimpleSign.aUserCallback = aUserCallback;
		SimpleSign.aFuncName = aFuncName;	// SignDataCMS, SignDataWithVID, SignDataWithVID_Serial, MultiSignWithSerial
		SimpleSign.aPlain = aPlain;		// 기존(구:공동인증서)의 경우 gDialogObj.args.plain 을 사용하여 가져왔었음
		SimpleSign.aOption = aOption;	// 기존(구:공동인증서)의 경우 gDialogObj.args.option 을 사용하여 가져왔었음
		SimpleSign.aIdn = aIdn;
		SimpleSign.aTotal = aTotal;
		SimpleSign.aDelimeter = aDelimeter;
		SimpleSign.aFileInfo = aFileInfo;
		SimpleSign.aFileHash = aFileHash;

		if(SimpleSign.bInitSimpleSign == false) {
			SimpleSign.bInitSimpleSign = true;

			//간편인증서 CSS 파일추가
			if(!AnySignProp.signDevice){
				commSign.addStylesheet(this.simpleSignCSS);
			} else {
				commSign.addStylesheet(this.simpleSignMCSS);
			}

			//간편인증서 언어js파일 추가
			SimpleSignProp.addLanguageFile(function(){
				//간편인증서 솔루션 js 파일추가
				SimpleSignProp.addJSFile(function(){
					//기본 화면 HTML 표시
					if(!AnySignProp.signDevice){
						SimpleSign.initLayout();
					} else {
						SimpleSign.initMLayout();
					}
				});
			});
		}else{
			//간편인증서 언어js파일 추가
			SimpleSignProp.addLanguageFile(function(){
				//기본 화면 HTML 표시
				if(!AnySignProp.signDevice) {
					SimpleSign.initLayout();
				} else {
					SimpleSign.initMLayout();
				}
			});
		}
	},

	//기본 화면 HTML 표시
	initLayout : function() {

		//이미 화면표시중일 경우 skip
		if(!commSign.isEmpty(document.getElementsByClassName('xTsign-layout')[0])){
			return;
		}

		//화면 HTML 생성 및 추가
		var div = [];
		//--------------인증서추가 팝업------------------
		div.push('<div tabindex="299" id="xTsign_light" class="white_content">');
			div.push('<div  tabindex="201" id="xTsign_light_popupTop" class="popupTop">');
				div.push('<p>'+ commSign.getLanguage('simplesign','L00005') +'</p>');
				div.push('<p class="popStit">'+ commSign.getLanguage('simplesign','L00006') +'</p>');
			div.push('</div>');

			div.push('<ul id="sign_popup_content">');
			div.push('</ul>');

			div.push('<div class="popBomt">');
				div.push('<span tabindex="297" ><a href="#" id="xTsign_sign_popup_ok" >'+ commSign.getLanguage('simplesign','L00007') +'</a></span>');
				div.push('<span tabindex="298" class="cols"><a href="#" id="xTsign_sign_popup_cancel">'+ commSign.getLanguage('simplesign','L00008') +'</a></span>');
			div.push('</div>');
		div.push('</div>');
		div.push('<div id="xTsign_fade" class="black_overlay"></div>');
		//------------------통합 간편인증서 화면----------------------
		div.push('<div id="xTsign_container" class="container">');
		div.push('<!--탭 메뉴 영역 -->');

			//공동인증서&간편인증서 탭
			div.push('<ul id="tabs" class="tabs tabs-all">');
				div.push('<li tabindex="3" id="xTsign_tab1_title" class="tab1 tab1-title" style="border-radius:16px 0 0 0;"><img id="xTsign_tab1_img" class="tab1-img" src="" alt="' + commSign.getLanguage('simplesign','L00013') +'"></li>');
				div.push('<li tabindex="3" id="xTsign_tab2_title" class="tab2 tab2-title" style="border-radius:0 16px 0 0;"><img id="xTsign_tab2_img" class="tab2-img" src="" alt="' + commSign.getLanguage('simplesign','L00014') +'"></li>');
			div.push('</ul>');

			//공동인증서 단독 탭
			div.push('<ul id="tabs_anysign" class="tabs tabs-anysign" style="display:none;">');
				div.push('<li tabindex="3" id="xTsign_tab1_title_anysign" class="tab1 tab1-title" style="border-radius:16px 16px 0 0;width:100%"><img id="xTsign_tab3_img" class="tab1-img" src="" alt="' + commSign.getLanguage('simplesign','L00013') +'"></li>');
			div.push('</ul>');

			//간편인증서 단독탭
			div.push('<ul id="tabs_simplesign" class="tabs tabs-simplesign" style="display:none;">');
				div.push('<li tabindex="3" id="xTsign_tab2_title_simplesign" class="tab2 tab2-title" style="border-radius:16px 16px 0 0;width:100%"><img id="xTsign_tab4_img" class="tab2-img" src="" alt="' + commSign.getLanguage('simplesign','L00014') +'"></li>');
			div.push('</ul>');

			div.push('<!--탭 콘텐츠 영역 -->');
			div.push('<div class="tab_container">');
				div.push('<div id="loading_layout" class="xTsign-overlay" style="display:none">');
					div.push('<div id="loading_layout_content" style="position:absolute;top:200px;left:120px;width:100%;height:100%;">');
						div.push('<img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/loading_B.gif">');
					div.push('</div>');
				div.push('</div>');

				div.push('<div id="xTsign_tab1_content" class="tab_content tab1-content">');
					div.push('<div id="tab1_loader"></div>');
					div.push('<div id="xwup_cert_pop_embedded_area" style="display:none;"></div>');
				div.push('</div>');

				div.push('<div id="xTsign_tab2_content" class="tab_content tab2-content"  >');
					if(SimpleSignProp.bannerExplain != "") {
						div.push('<div><img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/banner_img.png" class="banner" alt="' + SimpleSignProp.bannerExplain +'"></div>');
					} else {
						div.push('<div><img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/banner_img.png" class="banner" alt="' + commSign.getLanguage('simplesign','L00015') +'"></div>');
					}
					div.push('<div class="centerLine"><p>'+ commSign.getLanguage('simplesign','L00002') +'</p><span></span></div>');
					//-----------탭 컨텐츠 동적변경 영역-----------
					div.push('<ul id="sign_list_content" class="scrollT">');
					div.push('</ul>');
					//-------------------------------------------
				div.push('</div>');

				div.push('<div id="xTsign_bottom_button" class="bottom_button">');
					div.push('<button type="button" class="btn_border1" id="xTsign_sign_ok">'+ commSign.getLanguage('simplesign','L00003') +'</button>');
					div.push('<button type="button" class="btn_border2" id="xTsign_sign_cancel" tabindex="3">'+ commSign.getLanguage('simplesign','L00004') +'</button>');
					div.push('<div class="symbol"></div>');
				div.push('</div>');

			div.push('</div>');

		div.push('</div>');
		//----------------------

		//body에 통합간편인증 HTML 추가
		var divLayout = document.createElement("div");
		divLayout.id = 'xTsign';
		divLayout.className = 'xTsign-layout';
		divLayout.innerHTML = div.join('');
		document.body.appendChild(divLayout);

		//body에 백그라운드 HTML 추가
		var divLayoutShadow = document.createElement("div");
		divLayoutShadow.id = 'xTsign_overlay';
		divLayoutShadow.className = 'xTsign-overlay';
		document.body.appendChild(divLayoutShadow);

		//드래그설정
		commSign.dragElement(divLayout,'tabs');
		commSign.dragElement(divLayout,'tabs_anysign');
		commSign.dragElement(divLayout,'tabs_simplesign');

		//이벤트 설정
		this.initLayoutEvent();

		// 탭 이벤트
		if(AnySignProp.signType.indexOf("AnySign") > -1) {
			setTimeout (function check_anysign_tab_event() {
				var dialog = document.getElementById('xwup_body');
				if(dialog) {
					if(dialog.parentNode.tabControl)
						dialog.parentNode.tabControl.remove();
				}
				SimpleSignProp.tabControl = SimpleSign.appendTabControl();
			}, 200);
		}

		// 높이를 동적으로 창 중앙 (old)
		// var top = (window.innerHeight) / 2 + window.scrollY;
		// document.getElementById("xTsign").style.top = top + 'px';
		// 높이를 동적으로 창 중앙
		var agent = navigator.userAgent.toLowerCase();
		var top = 0;
		if((navigator.appName == "Netscape" && navigator.userAgent.search("Trident") != -1) || (agent.indexOf("msie") != -1)) {
				if(document.documentElement.clientHeight == 0) {
					top = (window.document.body.clientHeight) / 2; // + window.pageYOffset;
				} else {
					top = (document.documentElement.clientHeight) / 2; // + window.pageYOffset;
				}
		} else {
				top = (window.innerHeight) / 2; // + window.scrollY;
		}
		document.getElementById("xTsign").style.top = top + 'px';
	},

	//이벤트설정
	initLayoutEvent : function(){
		//(구)공인인증서 탭 클릭시
		document.getElementById('xTsign_tab1_title').onclick = function() {
			if(commSign.isEmpty(document.getElementById('xTsign_tab1_title').classList)
				|| this.classList.contains('active') ){
				return;
			}

			document.getElementById('xTsign_bottom_button').style.display = 'none';
			document.getElementById('xTsign_tab2_content').style.display = 'none';
			document.getElementById('xTsign_tab2_title').classList.remove('active');

			document.getElementById('xTsign_tab1_content').style.display = 'block';
			document.getElementById('xTsign_tab1_title').classList.add('active');

			document.getElementById('xTsign_tab1_img').src = AnySignProp.aSimplePath + '/SimpleSign/img/Tob_01_on_' + AnySignProp.signLanguage + '.png';
			document.getElementById('xTsign_tab2_img').src = AnySignProp.aSimplePath + '/SimpleSign/img/Tob_02_off_' + AnySignProp.signLanguage + '.png';

			document.getElementById('xTsign_tab1_img').alt = commSign.getLanguage('simplesign','L00020');
			document.getElementById('xTsign_tab2_img').alt = commSign.getLanguage('simplesign','L00014');
		};

		//(구)공인인증서 키보드 접근
		document.getElementById('xTsign_tab1_title').onkeyup = function(e) {
			if(e.keyCode == 13) {
				if(commSign.isEmpty(document.getElementById('xTsign_tab1_title').classList)
					|| this.classList.contains('active') ){
					return;
				}

				document.getElementById('xTsign_bottom_button').style.display = 'none';
				document.getElementById('xTsign_tab2_content').style.display = 'none';
				document.getElementById('xTsign_tab2_title').classList.remove('active');

				document.getElementById('xTsign_tab1_content').style.display = 'block';
				document.getElementById('xTsign_tab1_title').classList.add('active');

				document.getElementById('xTsign_tab1_img').src = AnySignProp.aSimplePath + '/SimpleSign/img/Tob_01_on_' + AnySignProp.signLanguage + '.png';
				document.getElementById('xTsign_tab2_img').src = AnySignProp.aSimplePath + '/SimpleSign/img/Tob_02_off_' + AnySignProp.signLanguage + '.png';

				document.getElementById('xTsign_tab1_img').alt = commSign.getLanguage('simplesign','L00020');
				document.getElementById('xTsign_tab2_img').alt = commSign.getLanguage('simplesign','L00014');
			}
		};

		//통합간편인증서 탭 클릭시
		document.getElementById('xTsign_tab2_title').onclick = function() {
			if(commSign.isEmpty(document.getElementById('xTsign_tab2_title').classList)
				|| this.classList.contains('active') ){
				return;
			}

			document.getElementById('xTsign_tab1_content').style.display = 'none';
			document.getElementById('xTsign_tab1_title').classList.remove('active');

			document.getElementById('xTsign_bottom_button').style.display = 'block';
			document.getElementById('xTsign_sign_ok').style.display = 'none';
			document.getElementById('xTsign_tab2_content').style.display = 'block';
			document.getElementById('xTsign_tab2_title').classList.add('active');

			document.getElementById('xTsign_tab1_img').src = AnySignProp.aSimplePath + '/SimpleSign/img/Tob_01_off_' + AnySignProp.signLanguage + '.png';
			document.getElementById('xTsign_tab2_img').src = AnySignProp.aSimplePath + '/SimpleSign/img/Tob_02_on_' + AnySignProp.signLanguage + '.png';

			document.getElementById('xTsign_tab1_img').alt = commSign.getLanguage('simplesign','L00013');
			document.getElementById('xTsign_tab2_img').alt = commSign.getLanguage('simplesign','L00021');
			//간편인증 목록 html 추가
			SimpleSign.addSignList(10);
		};

		//통합간편인증서 키보드 접근
		document.getElementById('xTsign_tab2_title').onkeyup = function(e) {
			if(e.keyCode == 13) {
				if(commSign.isEmpty(document.getElementById('xTsign_tab2_title').classList)
					|| this.classList.contains('active') ){
					return;
				}

				document.getElementById('xTsign_tab1_content').style.display = 'none';
				document.getElementById('xTsign_tab1_title').classList.remove('active');

				document.getElementById('xTsign_bottom_button').style.display = 'block';
				document.getElementById('xTsign_sign_ok').style.display = 'none';
				document.getElementById('xTsign_tab2_content').style.display = 'block';
				document.getElementById('xTsign_tab2_title').classList.add('active');

				document.getElementById('xTsign_tab1_img').src = AnySignProp.aSimplePath + '/SimpleSign/img/Tob_01_off_' + AnySignProp.signLanguage + '.png';
				document.getElementById('xTsign_tab2_img').src = AnySignProp.aSimplePath + '/SimpleSign/img/Tob_02_on_' + AnySignProp.signLanguage + '.png';

				document.getElementById('xTsign_tab1_img').alt = commSign.getLanguage('simplesign','L00013');
				document.getElementById('xTsign_tab2_img').alt = commSign.getLanguage('simplesign','L00021');

				//간편인증 목록 html 추가
				SimpleSign.addSignList(10);
			}
		};

		//확인버튼 클릭시
		document.getElementById('xTsign_sign_ok').onclick = function() {
			SimpleSign.onClose();
		};

		//취소버튼 클릭시
		document.getElementById('xTsign_sign_cancel').onclick = function() {
			SimpleSign.onClose();
		};

		//간편인증 추가 팝업 이벤트
		// SimpleSign.initLayoutPopupEvent();

		//Active 화면 설정
		SimpleSign.initLayoutActive();

	},

	initMLayout : function() {
		//이미 화면표시중일 경우 skip
		if(!commSign.isEmpty(document.getElementsByClassName('mobile-layout')[0])){
			return;
		}

		document.body.style.overflow = 'hidden';

		//화면 HTML 생성 및 추가
		var div = [];
		div.push('<div id="xTsign_tab2_content" class="tab_content tab2-content"  >');

		div.push('<!--탭 콘텐츠 영역 -->');
		div.push('<div id="xTsign_container" class="tab_container">');
				div.push('<div id="loading_layout" class="xTsign-overlay" style="display:none">');
					div.push('<div id="loading_layout_content" style="position:absolute;top:35%;left:25%;width:100%;height:100%;">');
						div.push('<img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/loading_B.gif">');
					div.push('</div>');
				div.push('</div>');
			div.push('<div id="xTsign_tab2_content" class="tab_content tab2-content">');
			div.push('<ul id="sign_list_content1" class="scrollT">');
			div.push('<li id="banner">');
			if(SimpleSignProp.bannerExplain != "") {
				div.push('<img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/banner_img.png" class="banner" style="width:100%;" alt="' + SimpleSignProp.bannerExplain +'">');
			} else {
				div.push('<img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/banner_img.png" class="banner" style="width:100%;" alt="' + commSign.getLanguage('simplesign','L00015') +'">');
			}
			div.push('</li>');
			div.push('</ul>');

				//-----------탭 컨텐츠 동적변경 영역-----------
				div.push('<ul id="sign_list_content" class="scrollT">');
				div.push('</ul>');
				//-------------------------------------------
			div.push('</div>');

			div.push('<div id="xTsign_sign_cancel" class="footerBtn"><a>닫기</a></div>');

		div.push('</div>');

		//body에 통합간편인증 HTML 추가
		var divLayout = document.createElement("div");
		divLayout.id = 'xTsign';
		divLayout.className = 'mobile-layout';
		divLayout.innerHTML = div.join('');
		document.body.prepend(divLayout);

		//이벤트 설정
		this.initMLayoutEvent();
	},
	//이벤트설정
	initMLayoutEvent : function(){
		document.getElementById('xTsign_tab2_content').style.display = 'block';

		//간편인증 목록 html 추가
		SimpleSign.addMSignList(10);

		//취소버튼 클릭시
		document.getElementById('xTsign_sign_cancel').onclick = function() {
			SimpleSign.onClose();
		};

		//탭 루프
		document.getElementById('xTsign_container').onfocus = function() {
			document.getElementById('sign_list_content').focus();
		};
	},

	//추가 팝업 이벤트
	// initLayoutPopupEvent : function(){
	// 	//추가팝업 OK 이벤트
	// 	document.getElementById('xTsign_sign_popup_ok').onclick = function() {
	// 		//선택여부
	// 		var sign_popup_bar = document.getElementsByClassName('sign-popup-bar active');
	// 		if(sign_popup_bar.length == 0 ){
	// 			alert(commSign.getLanguage('simplesign','L00011'));
	// 			return;
	// 		}
	// 		for(var i = 0 ; i < sign_popup_bar.length ; i++){
	// 			var signObj = commSign.objectFindByKey(SimpleSignProp.totalSignList, 'title', sign_popup_bar[i].id);
	// 			if(commSign.isEmpty(signObj)){
	// 				alert(commSign.getLanguage('simplesign','L00012'));
	// 				break;
	// 			}
	// 			//선택 간편인증추가
	// 			signObj.name = commSign.getLanguage(signObj.title,signObj.textId);
	// 			SimpleSignProp.simpleSignList.push(signObj);
	// 		}
	// 		//팝업목록제거
	// 		document.getElementById("sign_popup_content").innerHTML = '';

	// 		//간편인증 목록 html 추가
	// 		SimpleSign.addSignList(10);

	// 		document.getElementById('xTsign_sign_popup_cancel').click();
	// 	};
	// 	//추가팝업 cancel 이벤트
	// 	document.getElementById('xTsign_sign_popup_cancel').onclick = function() {
	// 		document.getElementById('xTsign_light').style.display='none';
	// 		document.getElementById('xTsign_fade').style.display='none'
	// 	};
	// },
	//Active 화면 설정
	initLayoutActive : function(){
		//최초 간편인증 탭 선택처리
		if(AnySignProp.signType == 'AnySign'){
			// AnySign : (구)공인인증서
			document.getElementById('xTsign_tab1_title').click();

			document.getElementById('xTsign_tab3_img').src= AnySignProp.aSimplePath + '/SimpleSign/img/Tob_01_off_' + AnySignProp.signLanguage + '.png';

			document.getElementsByClassName('tabs-all')[0].style.display='none';
			document.getElementsByClassName('tabs-anysign')[0].style.display='block';
			document.getElementsByClassName('tabs-simplesign')[0].style.display='none';

		}else if(AnySignProp.signType == 'SimpleSign') {
			// SimpleSign : 간편인증서
			document.getElementById('xTsign_tab2_title').click();

			document.getElementById('xTsign_tab4_img').src = AnySignProp.aSimplePath + '/SimpleSign/img/Tob_02_off_' + AnySignProp.signLanguage + '.png';

			document.getElementsByClassName('tabs-all')[0].style.display='none';
			document.getElementsByClassName('tabs-anysign')[0].style.display='none';
			document.getElementsByClassName('tabs-simplesign')[0].style.display='block';

		}else if(AnySignProp.signType == 'AnySignAll') {
			// AnySignAll : (구)공인인증서[Active] & 간편인증서
			document.getElementById('xTsign_tab1_title').click();

			document.getElementsByClassName('tabs-all')[0].style.display='block';
			document.getElementsByClassName('tabs-anysign')[0].style.display='none';
			document.getElementsByClassName('tabs-simplesign')[0].style.display='none';

		}else {
			// SimpleSignAll (기본값) : (구)공인인증서 & 간편인증서[Active]
			document.getElementById('xTsign_tab2_title').click();

			document.getElementsByClassName('tabs-all')[0].style.display='block';
			document.getElementsByClassName('tabs-anysign')[0].style.display='none';
			document.getElementsByClassName('tabs-simplesign')[0].style.display='none';

		}
	},
	//통합 간편인증 선택에따른 컨텐츠 HTML 변경
	addSignContent : function(aHtml,aCallBack) {
		commSign.slideUp(document.getElementById("sign_list_content"),function(){
			document.getElementById("sign_list_content").innerHTML = '';
		 	document.getElementById("sign_list_content").innerHTML = aHtml;
			if(!AnySignProp.signDevice) {
				setTimeout(function () {SimpleSignProp.tabControl = SimpleSign.appendTabControl();}, 0);
			}
			commSign.slideDown(document.getElementById("sign_list_content"),aCallBack);
		});
	},
	//통합 간편인증 목록 추가 simpleSignList 설정된 순서대로 추가
	addSignList : function(aDuration) {
		commSign.slideUp(document.getElementById("sign_list_content"),function(){
			document.getElementById("sign_list_content").innerHTML = '';

			// var cookieList = ['none'];
			var div = [];
			//목록표시
			var tabindex = 1;

			var cookieList = commSign.getCookie(AnySignProp.cookieName);

			if(commSign.isEmpty(cookieList)){
				cookieList = ['none'];
			}else{
				//저장된 쿠키목록 표시
				var simpleSignList = cookieList.split(',');

				SimpleSignProp.simpleSignList = [];

				// 간편인증 리스트 체크
				if(simpleSignList.length != SimpleSignProp.totalSignList.length + 1) {
					SimpleSignProp.totalSignList.forEach(function(v, i){
						simpleSignList[i+1] = v.title + "|" + v.star;
					});
					simpleSignList.length = SimpleSignProp.totalSignList.length + 1;
				}

				for( var i in simpleSignList){
					if(i != "isEmpty"){
						var signType = simpleSignList[i];
					if(signType == 'none') continue;
					// if(signType == simpleSignLast) continue;
					var splitTemp = simpleSignList[i].split("|");


					SimpleSignProp.simpleSignList.push({ title : splitTemp[0] , name : commSign.getLanguage(splitTemp[0],'L00001')
						, textId : 'L00001', star: parseInt(splitTemp[1]) });
					}
				}
			}

			// for(var i in SimpleSignProp.simpleSignList){
			/* for(var i in SimpleSignProp.totalSignList){
				// var signType = SimpleSignProp.simpleSignList[i];
				var signType = SimpleSignProp.totalSignList[i];
				div.push('<li id="' + signType.title +'_node" tabindex="'+ (tabindex +1) +'" class="xTsignli" >');
				div.push('<img src="../SimpleSign/img/icon_' + signType.title +'.png" alt="' + commSign.getLanguage(signType.title, 'L00031') + '"><a class="Atit" id="' + signType.title +'">' + signType.name +'</a>');
				// div.push('<img id="' + signType.title +'_icon_close" class="icon-close" src="../SimpleSign/img/icon_x.png" alt="' + commSign.getLanguage('simplesign', 'L00016') +'" tabindex="'+ ( tabindex + 2 ) +'">');
				div.push('</li>');
				// cookieList.push(signType.title);
				tabindex += 2;
			} */

			var tmpCookieList = ['none'];
			var listArray;
			if(AnySignProp.recentSort) listArray = SimpleSignProp.simpleSignList;
			else listArray = SimpleSignProp.totalSignList;

			for(var i = 0; i < listArray.length; ++i){
				var signType = listArray[i];
				var tmpTitle = signType.title.indexOf('yessign') == 0 ? 'yessign' : signType.title
				div.push('<li id="' + signType.title +'_node" tabindex="3" class="xTsignli" style="line-height:1.5;">');
				div.push('<img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/icon_' + tmpTitle +'.png" alt=""><a class="Atit" id="' + signType.title +'">' + signType.name +'</a>');
				if(AnySignProp.recentSort) {
					if(signType.star)
						div.push('<img id="' + signType.title +'_icon_star" class="icon-star" src="../SimpleSign/img/icon_star_on.png" alt="' + commSign.getLanguage('simplesign', 'L00019') +'" tabindex="'+ ( tabindex + 2 ) +'">');
					else
						div.push('<img id="' + signType.title +'_icon_star" class="icon-star" src="../SimpleSign/img/icon_star_off.png" alt="' + commSign.getLanguage('simplesign', 'L00016') +'" tabindex="'+ ( tabindex + 2 ) +'">');
				}

				div.push('</li>');
				tmpCookieList.push(signType.title + "|" + signType.star);
				// tabindex += 2;
			}

			// for(var i = 0; i < SimpleSignProp.simpleSignList.length; ++i){
			// 	var signType = SimpleSignProp.simpleSignList[i];
			// 	div.push('<li id="' + signType.title +'_node" tabindex="3" class="xTsignli" style="line-height:1.5;">');
			// 	div.push('<img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/icon_' + signType.title +'.png" alt=""><a class="Atit" id="' + signType.title +'">' + signType.name +'</a>');
			// 	div.push('</li>');
			// 	tabindex += 2;
			// }

			//30일간 최종 선택목록 쿠키저장
			commSign.setCookie(AnySignProp.cookieName, tmpCookieList.join(','), AnySignProp.cookieExpiredays);

			//간편인증 추가 HMTL 추가
			// var removeCount = SimpleSignProp.totalSignList.length - SimpleSignProp.simpleSignList.length;
			// for(var i = 0 ; i < removeCount ; i++) {
			// 	if(i == 0){
			// 		div.push('<li class="xTsignliB" tabindex="99">');
			// 		div.push('<a class="xTsignliTxt" id="add_simplesign" href="#">');
			// 		div.push(commSign.getLanguage('simplesign','L00010'));//추가버튼을 눌러주세요.
			// 		div.push('</a>');
			// 		div.push('</li>');
			// 	}else{
			// 		div.push('<li class="borderSt"></li>');
			// 	}
			// }
			document.getElementById("sign_list_content").innerHTML = div.join('');

			//간편인증 연결목록 이벤트 설정
			SimpleSign.initSignListEvent();

			setTimeout (function check_anysign_tab_event() {
				var dialog = document.getElementById('xwup_body');
				if(dialog) {
					if(dialog.parentNode.tabControl)
						dialog.parentNode.tabControl.remove();
				}
				SimpleSignProp.tabControl = SimpleSign.appendTabControl();
			}, 200);
			//content 영역 슬라이드 효과
			commSign.slideDown(document.getElementById("sign_list_content"));
			// 가장 최근 사용한 간편인증 선택 (옵션 기능)
			if(AnySignProp.autoClick) SimpleSign.autoClick();
		},aDuration);
	},
	//통합 간편인증 목록 추가 simpleSignList 설정된 순서대로 추가
	addMSignList : function(aDuration) {
		commSign.slideUp(document.getElementById("sign_list_content"),function(){
			document.getElementById("sign_list_content").innerHTML = '';

			var div = [];
			//목록표시
			//var tabindex = 10;
			/* for(var i in SimpleSignProp.simpleSignList){
				var signType = SimpleSignProp.simpleSignList[i];
				div.push('<li id="' + signType.title +'_node" tabindex="'+ (tabindex +1) +'" class="xTsignli" >');
				div.push('<img src="../SimpleSign/img/icon_' + signType.title +'.png" alt="' + commSign.getLanguage(signType.title, 'L00031') + '"><a class="Atit" id="' + signType.title +'">' + signType.name +'</a>');
				div.push('</li>');
				tabindex += 2;
			} */

			var tabindex = 1;

			var cookieList = commSign.getCookie(AnySignProp.cookieName);

			if(commSign.isEmpty(cookieList)){
				cookieList = ['none'];
			}else{
				//저장된 쿠키목록 표시
				var simpleSignList = cookieList.split(',');

				SimpleSignProp.simpleSignList = [];

				// 간편인증 리스트 체크
				if(simpleSignList.length != SimpleSignProp.totalSignList.length + 1) {
					SimpleSignProp.totalSignList.forEach(function(v, i){
						simpleSignList[i+1] = v.title + "|" + v.star;
					});
					simpleSignList.length = SimpleSignProp.totalSignList.length + 1;
				}

				for( var i in simpleSignList){
					var signType = simpleSignList[i];
					if(signType == 'none') continue;
					// if(signType == simpleSignLast) continue;
					var splitTemp = simpleSignList[i].split("|");


					SimpleSignProp.simpleSignList.push({ title : splitTemp[0] , name : commSign.getLanguage(splitTemp[0],'L00001')
						, textId : 'L00001', star: parseInt(splitTemp[1]) });
				}
			}


			var tmpCookieList = ['none'];

			var listArray;
			if(AnySignProp.recentSort) listArray = SimpleSignProp.simpleSignList;
			else listArray = SimpleSignProp.totalSignList;

			for(var i = 0; i < listArray.length; ++i){
				var signType = listArray[i];
				var tmpTitle = signType.title.indexOf('yessign') == 0 ? 'yessign' : signType.title
				div.push('<li id="' + signType.title +'_node" tabindex="3" class="xTsignli" style="line-height:1.5;">');
				div.push('<img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/icon_' + tmpTitle +'.png" alt=""><a class="Atit" id="' + signType.title +'">' + signType.name +'</a>');
				if(AnySignProp.recentSort) {
					if(signType.star)
						div.push('<img id="' + signType.title +'_icon_star" class="icon-star" src="../SimpleSign/img/icon_star_on.png" alt="' + commSign.getLanguage('simplesign', 'L00019') +'" tabindex="'+ ( tabindex + 2 ) +'">');
					else
						div.push('<img id="' + signType.title +'_icon_star" class="icon-star" src="../SimpleSign/img/icon_star_off.png" alt="' + commSign.getLanguage('simplesign', 'L00016') +'" tabindex="'+ ( tabindex + 2 ) +'">');
				}

				div.push('</li>');
				tmpCookieList.push(signType.title + "|" + signType.star);
				// tabindex += 2;
			}

			// for(var i = 0; i < SimpleSignProp.simpleSignList.length; ++i){
			// 	var signType = SimpleSignProp.simpleSignList[i];
			// 	div.push('<li id="' + signType.title +'_node" tabindex="3" class="xTsignli" style="line-height:1.5;">');
			// 	div.push('<img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/icon_' + signType.title +'.png" alt=""><a class="Atit" id="' + signType.title +'">' + signType.name +'</a>');
			// 	div.push('</li>');
			// 	tabindex += 2;
			// }

			//30일간 최종 선택목록 쿠키저장
			commSign.setCookie(AnySignProp.cookieName, tmpCookieList.join(','), AnySignProp.cookieExpiredays);
			// for(var i =0; i < listArray.length; ++i){
			// 	var signType = listArray[i];
			// 	div.push('<li id="' + signType.title +'_node" class="xTsignli" >');
			// 	div.push('<img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/icon_' + signType.title +'.png" alt="' + commSign.getLanguage(signType.title, 'L00031') + '"><a class="Atit" id="' + signType.title +'">' + signType.name +'</a>');
			// 	div.push('</li>');
			// }

			document.getElementById("sign_list_content").innerHTML = div.join('');

			SimpleSign.initMSignListEvent();

			//content 영역 슬라이드 효과
			commSign.slideDown(document.getElementById("sign_list_content"));
			if(AnySignProp.autoClick) SimpleSign.autoClick();
		},aDuration);
	},
	//간편인증  연결목록 이벤트 설정 , 목록이 늘어날경우 추가하여 확장
	//선택후의 기능은 각각js파일에서 구현
	initSignListEvent : function(){
		var listArray;
		if(AnySignProp.recentSort) listArray = SimpleSignProp.simpleSignList;
		else listArray = SimpleSignProp.totalSignList;

		for(var i in listArray){
			var signType = listArray[i];
			var target = document.getElementById(signType.title + '_node');
			var targetStar = document.getElementById(signType.title+'_icon_star');
			if( signType.title == 'naversign'){
				target.onclick = function() {
					if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
						alert(commSign.getLanguage('simplesign','L00018'));
						return;
					} else {
						naverSign.onClick();
					}
				};
				target.onkeyup = function(e) {
					if(e.keyCode == 13) {
						if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
							alert(commSign.getLanguage('simplesign','L00018'));
							return;
						} else {
							naverSign.onClick();
						}
					}
				};
				if(targetStar != null) {
					targetStar.onclick = function() {
						event.stopPropagation(); // 버블링 제거
						SimpleSign.imgStarToggle(this);
						SimpleSign.addSignList(10);
						// SimpleSign.removeSignList('naversign')
					};
					targetStar.onkeyup = function(e) {
						if(e.keyCode == 13) {
							event.stopPropagation(); // 버블링 제거
							SimpleSign.imgStarToggle(this);
							SimpleSign.addSignList(10);
						}
					};
				}
			}
			else if(signType.title == 'yessign' || signType.title == 'yessignCorp' || signType.title == 'yessignInt') {
				target.onclick = function() {
					yesSign.onClick(this.id);
				};
				target.onkeyup = function(e) {
					if(e.keyCode == 13) {
						yesSign.onClick(this.id);
					}
				};
				if(targetStar != null) {
					targetStar.onclick = function() {
						event.stopPropagation(); // 버블링 제거
						SimpleSign.imgStarToggle(this);
						SimpleSign.addSignList(10);
						// SimpleSign.removeSignList('naversign')
					};
					targetStar.onkeyup = function(e) {
						if(e.keyCode == 13) {
							event.stopPropagation(); // 버블링 제거
							SimpleSign.imgStarToggle(this);
							SimpleSign.addSignList(10);
						}
					};
				}
			}
			else if( signType.title == 'tosssign'){
				target.onclick = function() {
					if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
						alert(commSign.getLanguage('simplesign','L00018'));
						return;
					} else {
						tossSign.onClick();
					}
				};
				target.onkeyup = function(e) {
					if(e.keyCode == 13) {
						if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
							alert(commSign.getLanguage('simplesign','L00018'));
							return;
						} else {
							tossSign.onClick();
						}
					}
				};
				if(targetStar != null) {
					targetStar.onclick = function() {
						event.stopPropagation(); // 버블링 제거
						SimpleSign.imgStarToggle(this);
						SimpleSign.addSignList(10);
						// SimpleSign.removeSignList('naversign')
					};
					targetStar.onkeyup = function(e) {
						if(e.keyCode == 13) {
							event.stopPropagation(); // 버블링 제거
							SimpleSign.imgStarToggle(this);
							SimpleSign.addSignList(10);
						}
					};
				}
			}
			else if( signType.title == 'kakaopay'){
				target.onclick = function() {
					if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
						alert(commSign.getLanguage('simplesign','L00018'));
						return;
					} else {
						kakaoPay.onClick();
					}
				};
				target.onkeyup = function(e) {
					if(e.keyCode == 13) {
						if(SimpleSign.aFuncName == "SignDataWithVID" || SimpleSign.aFuncName == "SignDataWithVID_Serial" || SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
							alert(commSign.getLanguage('simplesign','L00018'));
							return;
						} else {
							kakaoPay.onClick();
						}
					}
				};
				if(targetStar != null) {
					targetStar.onclick = function() {
						event.stopPropagation(); // 버블링 제거
						SimpleSign.imgStarToggle(this);
						SimpleSign.addSignList(10);
						// SimpleSign.removeSignList('naversign')
					};
					targetStar.onkeyup = function(e) {
						if(e.keyCode == 13) {
							event.stopPropagation(); // 버블링 제거
							SimpleSign.imgStarToggle(this);
							SimpleSign.addSignList(10);
						}
					};
				}
			}
			else if( signType.title == 'kakaotalk'){
				target.onclick = function() {
					if((SimpleSign.aFuncName == "MultiSignWithSerial" && (SimpleSign.kakaoTalkInfo.mode == "K1110" || SimpleSign.kakaoTalkInfo.mode == "K3510"))
						|| SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
						alert(commSign.getLanguage('simplesign','L00018'));
						return;
					}
					kakaoTalk.onClick();
				};
				target.onkeyup = function(e) {
					if(e.keyCode == 13) {
						if((SimpleSign.aFuncName == "MultiSignWithSerial" && (SimpleSign.kakaoTalkInfo.mode == "K1110" || SimpleSign.kakaoTalkInfo.mode == "K3510"))
							|| SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
							alert(commSign.getLanguage('simplesign','L00018'));
							return;
						}
						kakaoTalk.onClick();
					}
				};
				if(targetStar != null) {
					targetStar.onclick = function() {
						event.stopPropagation(); // 버블링 제거
						SimpleSign.imgStarToggle(this);
						SimpleSign.addSignList(10);
						// SimpleSign.removeSignList('naversign')
					};
					targetStar.onkeyup = function(e) {
						if(e.keyCode == 13) {
							event.stopPropagation(); // 버블링 제거
							SimpleSign.imgStarToggle(this);
							SimpleSign.addSignList(10);
						}
					};
				}
			}
			else if( signType.title == 'passsign'){
				target.onclick = function() {
					if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
						alert(commSign.getLanguage('simplesign','L00018'));
						return;
					} else {
						passSign.onClick();
					}
				};
				target.onkeyup = function(e) {
					if(e.keyCode == 13) {
						if(SimpleSign.aFuncName == "SignDataWithVID" || SimpleSign.aFuncName == "SignDataWithVID_Serial" || SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
							alert(commSign.getLanguage('simplesign','L00018'));
							return;
						} else {
							passSign.onClick();
						}
					}
				};
				if(targetStar != null) {
					targetStar.onclick = function() {
						event.stopPropagation(); // 버블링 제거
						SimpleSign.imgStarToggle(this);
						SimpleSign.addSignList(10);
						// SimpleSign.removeSignList('naversign')
					};
					targetStar.onkeyup = function(e) {
						if(e.keyCode == 13) {
							event.stopPropagation(); // 버블링 제거
							SimpleSign.imgStarToggle(this);
							SimpleSign.addSignList(10);
						}
					};
				}
			}
			else if( signType.title == 'paycosign'){
				target.onclick = function() {
					if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
						alert(commSign.getLanguage('simplesign','L00018'));
						return;
					} else {
						paycoSign.onClick();
					}
				};
				target.onkeyup = function(e) {
					if(e.keyCode == 13) {
						if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
							alert(commSign.getLanguage('simplesign','L00018'));
							return;
						} else {
							paycoSign.onClick();
						}
					}
				};
				if(targetStar != null) {
					targetStar.onclick = function() {
						event.stopPropagation(); // 버블링 제거
						SimpleSign.imgStarToggle(this);
						SimpleSign.addSignList(10);
						// SimpleSign.removeSignList('naversign')
					};
					targetStar.onkeyup = function(e) {
						if(e.keyCode == 13) {
							event.stopPropagation(); // 버블링 제거
							SimpleSign.imgStarToggle(this);
							SimpleSign.addSignList(10);
						}
					};
				}
			}
			else if( signType.title == 'shinhansign'){
				target.onclick = function() {
					if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
						alert(commSign.getLanguage('simplesign','L00018'));
						return;
					} else {
						shinhanSign.onClick();
					}
				};
				target.onkeyup = function(e) {
					if(e.keyCode == 13) {
						if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
							alert(commSign.getLanguage('simplesign','L00018'));
							return;
						} else {
							shinhanSign.onClick();
						}
					}
				};
				if(targetStar != null) {
					targetStar.onclick = function() {
						event.stopPropagation(); // 버블링 제거
						SimpleSign.imgStarToggle(this);
						SimpleSign.addSignList(10);
						// SimpleSign.removeSignList('naversign')
					};
					targetStar.onkeyup = function(e) {
						if(e.keyCode == 13) {
							event.stopPropagation(); // 버블링 제거
							SimpleSign.imgStarToggle(this);
							SimpleSign.addSignList(10);
						}
					};
				}
			}
		}
		//간편인증 추가버튼 이벤트 설정
		// if(SimpleSignProp.totalSignList.length != SimpleSignProp.simpleSignList.length){
		// 	document.getElementById('add_simplesign').onclick = function() {
		// 		document.getElementById("sign_popup_content").innerHTML = '';
		// 		var div = [];
		// 		var tabindex = 210;
		// 		for(var i in SimpleSignProp.totalSignList){
		// 			var signType = SimpleSignProp.totalSignList[i];
		// 			var signObj  = commSign.objectFindByKey(SimpleSignProp.simpleSignList, 'title', signType.title);
		// 			if(commSign.isEmpty(signObj)){
		// 				div.push('<li tabindex="'+ (tabindex) +'" id="' + signType.title +'" class="sign-popup-bar"><a href="#"><img src="../SimpleSign/img/icon_' + signType.title +'.png" alt="">' + signType.name +'</a></li>');
		// 			}
		// 			tabindex += 1;
		// 		}
		// 		document.getElementById("sign_popup_content").innerHTML = div.join('');
		// 		document.getElementById('xTsign_light').style.display='block';
		// 		document.getElementById('xTsign_fade').style.display='block';

		// 		//선택처리
		// 		var sign_popup_bar = document.getElementsByClassName('sign-popup-bar');
		// 		for(var i = 0; i < sign_popup_bar.length; i++) {
		// 			sign_popup_bar[i].onclick = function(e) {
		// 				this.classList.toggle('active');
		// 			};
		// 		}

		// 		document.getElementById('xTsign_light').focus();

		// 	};
		// }

		//탭 루프
		document.getElementById('xTsign_light').onfocus = function() {
			document.getElementById('xTsign_light_popupTop').focus();
		};

	},

	initMSignListEvent : function(){
		var listArray;
		if(AnySignProp.recentSort) listArray = SimpleSignProp.simpleSignList;
		else listArray = SimpleSignProp.totalSignList;

		for(var i in listArray){
			var signType = listArray[i];
			var target = document.getElementById(signType.title + '_node');
			var targetStar = document.getElementById(signType.title+'_icon_star');

			if( signType.title == 'naversign'){
				target.onclick = function() {
					if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
                        alert(commSign.getLanguage('simplesign','L00018'));
                        return;
                    } else {
                        naverSign.onClick();
                    }
				};
				if(targetStar != null) {
                    targetStar.onclick = function() {
                        event.stopPropagation(); // 버블링 제거
                        SimpleSign.imgStarToggle(this);
                        SimpleSign.addMSignList(10);
                    };
				}
			}
			else if(signType.title == 'yessign' || signType.title == 'yessignCorp' || signType.title == 'yessignInt') {
				target.onclick = function() {
					yesSign.onClick(this.id);
				};
				if(targetStar != null) {
                    targetStar.onclick = function() {
                        event.stopPropagation(); // 버블링 제거
                        SimpleSign.imgStarToggle(this);
                        SimpleSign.addMSignList(10);
                    };
				}
			}
			else if( signType.title == 'tosssign'){
				target.onclick = function() {
					if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
                        alert(commSign.getLanguage('simplesign','L00018'));
                        return;
                    } else {
                        tossSign.onClick();
                    }
				};
				if(targetStar != null) {
                    targetStar.onclick = function() {
                        event.stopPropagation(); // 버블링 제거
                        SimpleSign.imgStarToggle(this);
                        SimpleSign.addMSignList(10);
                    };
				}
			}
			else if( signType.title == 'kakaopay'){
				target.onclick = function() {
					if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
						alert(commSign.getLanguage('simplesign','L00018'));
						return;
					} else {
						kakaoPay.onClick();
					}
				};
				if(targetStar != null) {
                    targetStar.onclick = function() {
                        event.stopPropagation(); // 버블링 제거
                        SimpleSign.imgStarToggle(this);
                        SimpleSign.addMSignList(10);
                    };
				}
			}
			else if( signType.title == 'kakaotalk'){
				target.onclick = function() {
					if((SimpleSign.aFuncName == "MultiSignWithSerial" && (SimpleSign.kakaoTalkInfo.mode == "K1110" || SimpleSign.kakaoTalkInfo.mode == "K3510"))
						|| SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
						alert(commSign.getLanguage('simplesign','L00018'));
						return;
					}
					kakaoTalk.onClick();
				};
				if(targetStar != null) {
                    targetStar.onclick = function() {
                        event.stopPropagation(); // 버블링 제거
                        SimpleSign.imgStarToggle(this);
                        SimpleSign.addMSignList(10);
                    };
				}
			}
			else if( signType.title == 'passsign'){
				target.onclick = function() {
					if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
                        alert(commSign.getLanguage('simplesign','L00018'));
                        return;
                    } else {
                        passSign.onClick();
                    }
				};
				if(targetStar != null) {
                    targetStar.onclick = function() {
                        event.stopPropagation(); // 버블링 제거
                        SimpleSign.imgStarToggle(this);
                        SimpleSign.addMSignList(10);
                    };
				}
			}
			else if( signType.title == 'paycosign'){
				target.onclick = function() {
					if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
                        alert(commSign.getLanguage('simplesign','L00018'));
                        return;
                    } else {
                        paycoSign.onClick();
                    }
				};
				if(targetStar != null) {
                    targetStar.onclick = function() {
                        event.stopPropagation(); // 버블링 제거
                        SimpleSign.imgStarToggle(this);
                        SimpleSign.addMSignList(10);
                    };
				}
			}
			else if( signType.title == 'shinhansign'){
				target.onclick = function() {
					if(SimpleSign.aFuncName == "MultiSignWithSerial" || SimpleSign.aFuncName == "MultiSignFileInfo" || SimpleSign.aFuncName == "MultiSignFileInfoWithVID" || SimpleSign.aFuncName == "SignFileInfoAdd") {
                        alert(commSign.getLanguage('simplesign','L00018'));
                        return;
                    } else {
                        shinhanSign.onClick();
                    }
				};
				if(targetStar != null) {
                    targetStar.onclick = function() {
                        event.stopPropagation(); // 버블링 제거
                        SimpleSign.imgStarToggle(this);
                        SimpleSign.addMSignList(10);
                    };
				}
			}
		}
	},

	//간편인증 목록 삭제
	removeSignList : function(aTitle){
		// get index of object with id:37
		var removeIndex = SimpleSignProp.simpleSignList.map(function(item) { return item.title; }).indexOf(aTitle);
		// remove object
		SimpleSignProp.simpleSignList.splice(removeIndex, 1);

		//간편인증 목록 html 추가
		SimpleSign.addSignList(10);
	},
	hide : function(){
		//기본화면 html 삭제
		commSign.removeElement(document.getElementById('xTsign'));
		//백그라운드 html 삭제
		commSign.removeElement(document.getElementById('xTsign_overlay'));
		//모바일 html 삭제
		commSign.removeElement(document.getElementById('xTsign_m'));

		//AnySign.mUISettings.mUITarget_xTsign = undefined; // 특정 사이트 이슈로 인한 주석 제거, 내부 테스트시 문제 있으면 복구 예정
		AnySign.mCertselectHeaderExist = true;

		SimpleSignProp.checkBackFlag = false;

		if(SimpleSignProp.tabControl)
			SimpleSignProp.tabControl.remove();
	},
	//성공시 호출 콜백 응답
	doSuccess : function(sMsg) {
		SimpleSign.hide();
		document.body.style.overflow = 'visible';
		//호출한곳으로 응답

		if( typeof AnySignForPC.RemoveDialogOffset === 'function'){
			AnySignForPC.RemoveDialogOffset();
		}

		if( typeof SimpleSign.aUserCallback === 'function'){
			SimpleSign.aUserCallback(sMsg);
		}
	},
	//종료
	onClose : function(){
		SimpleSign.hide();
		document.body.style.overflow = 'visible';

		if( typeof AnySignForPC.RemoveDialogOffset === 'function'){
			AnySignForPC.RemoveDialogOffset();
		}

		try {AnySign_cancelCallback();}catch(e) { console.log('AnySign_cancelCallback is not defined');}
	},
	appendTabControl : function(element){
		var i,
			aTabableElements = [],
			aElement = document.getElementById("xTsign_container"),
			aNode,
			aCurrentElementIndex = 0;

		if(element == "" || element == undefined) {
			if(AnySignProp.signType == 'SimpleSign' || AnySignProp.signType == 'AnySign') {
				aElement = document.getElementsByClassName("tab_container")[0];
			}
		} else {
			aElement = element;
		}
		var aChildNodeList = aElement.getElementsByTagName("*");

		if(document.getElementById('xTsign_icon_top')) {
			aCurrentElementIndex = 2;
		}

		if(!(document.getElementById('xTsign_tab2_title').classList.contains('active'))
			|| (document.getElementById('tabs').style.display == 'none')) {
			aCurrentElementIndex = -1;
		}

		function _tabSort (e1, e2) {
			return e1.getAttribute("tabindex", 0) - e2.getAttribute("tabindex", 0);
		}

		function _nextFocus () {
			var aNext,
				aPass;

			aCurrentElementIndex = ++aCurrentElementIndex % aTabableElements.length;

			aNext = aTabableElements[aCurrentElementIndex];
			aPass  = aNext.disabled || aNext.offsetWidth == 0;

			if (aPass) {
				_nextFocus();
			} else {
				aNext.focus();
			}
		}

		function _previousFocus() {
			var aPrev,
				aPass;

			--aCurrentElementIndex;
			if (aCurrentElementIndex < 0) {
				aCurrentElementIndex = aTabableElements.length - 1;
			}

			aPrev = aTabableElements[aCurrentElementIndex];
			aPass  = aPrev.disabled || aPrev.offsetWidth == 0;

			if (aPass) {
				_previousFocus();
			} else {
				aPrev.focus();
			}
		}

		function _reverseFocusElement(e, aStartElementIndex) {

			var aCheckReverse = aStartElementIndex - aCurrentElementIndex;

			if (e.shiftKey) {
				if(aCheckReverse < 0)
				{
					if( aStartElementIndex == 0)
					{
						return false;
					}

					return true;
				}
				else
				{
					return false;
				}
			}
			else
			{
				if(aCheckReverse > 0)
				{
					if( aStartElementIndex == aTabableElements.length)
					{
						return false;
					}

					return true;
				}
				else
				{
					return false;
				}
			}
		}

		function _keyupHandler (e) {
			e = e || window.event;
			var aKeyCode = e.which || e.keyCode;

			var aStartElementIndex = aCurrentElementIndex;

			if (aKeyCode == 9) {
				if (e.shiftKey) {
					_previousFocus();
				} else {
					_nextFocus();
				}

				if (e.stopPropagation) {
					e.stopPropagation();
				} else {
					e.cancelBubble = true;
				}

				if (e.preventDefault) {
					e.preventDefault();
				} else {
					e.returnValue = false;
				}

				return _reverseFocusElement(e, aStartElementIndex);
			}
		}

		function _onfocus (e) {
			var i = 0;
			for (i = 0; i < aTabableElements.length; i++) {
				if (aTabableElements[i] == this) {
					aCurrentElementIndex = i;
					break;
				}
			}
		}

		for (i = 0; i < aChildNodeList.length; i++) {
			aNode = aChildNodeList[i];
			if (aNode.getAttribute("tabindex",0) > 0) {
				if (aNode.tagName.toUpperCase() == "TR") {
					continue;
				}

				aTabableElements.push(aNode);
				aNode.onfocus = _onfocus;
			}
		}

		if (aTabableElements.length == 0) {
			return;
		}

		aTabableElements.sort (_tabSort);

		if(SimpleSignProp.oldTabEventNode !== aChildNodeList) {
			SimpleSignProp.aOldKeyupEventListner = document.onkeyup;
			SimpleSignProp.aOldKeydownEventListner = document.onkeydown;
			SimpleSignProp.oldTabEventNode = aChildNodeList;
		}
		document.onkeyup = _keyupHandler;
		document.onkeydown = function(e) {
			if(e.keyCode == 9 || e.keyCode == 38 || e.keyCode == 40)
				return false;
		};

		return {
			remove : function () {
				document.onkeyup = SimpleSignProp.aOldKeyupEventListner;
				document.onkeydown = SimpleSignProp.aOldKeydownEventListner;
			}
		}
	},
	// 가장 최근 사용한 간편인증 선택 (옵션 기능)
	autoClick : function() {
		var locationCallback = function(location) {
			if(location == null) return;
			else if(location == '5010') yesSign.onClick('yessign_node');
			else if(location == '5011') yesSign.onClick('yessignCorp_node');
			else if(location == '5012') yesSign.onClick('yessignInt_node');
			else if(location == '5020') naverSign.onClick();
			else if(location == '5030') tossSign.onClick();
			else if(location == '5040') paycoSign.onClick();
			else if(location == '5050') kakaoPay.onClick();
			else if(location == '5060') passSign.onClick();
			else if(location == '5070') kakaoTalk.onClick();
		}

		if(SimpleSignProp.checkBackFlag) {
			return;
		} else {
			SimpleSignProp.checkBackFlag = !SimpleSignProp.checkBackFlag;
			commSign.GetLastLocation(locationCallback);
		}
	},
	imgStarToggle : function (element) {
		var imgName = element.src.split('/')[element.src.split('/').length-1];
		var signTitle = element.id.split("_")[0];
		var target = commSign.objectFindByKey(SimpleSignProp.simpleSignList, 'title', signTitle);
		var insertIndex = 1;
		var cookieListArray = commSign.getCookie(AnySignProp.cookieName).split(",");
		for(var i=0; i<cookieListArray.length; i++) {
			// 즐겨찾기 설정된 것들중 마지막 인덱스 검색 arr.indexOf("|1");
			if(cookieListArray[i].indexOf("|1") != -1) insertIndex++;
		}
		var arrIndex = cookieListArray.indexOf(target.title + "|" + target.star);
		cookieListArray.splice(arrIndex, 1);
		if(imgName == 'icon_star_on.png') {
			// on -> off : 마지막 별 위치를 찾아 그 뒤에 추가 하기
			element.src = element.src.replace('icon_star_on.png', 'icon_star_off.png');
			element.alt = commSign.getLanguage('simplesign', 'L00016');
			target.star = 0;
			cookieListArray.splice(insertIndex-1, 0, target.title + "|" + target.star);
		} else {
			// off -> on : 최상단에 추가
			element.src = element.src.replace('icon_star_off.png', 'icon_star_on.png');
			element.alt = commSign.getLanguage('simplesign', 'L00019');
			target.star = 1;
			cookieListArray.splice(1, 0, target.title + "|" + target.star);
		}
		commSign.setCookie(AnySignProp.cookieName, cookieListArray.join(','), AnySignProp.cookieExpiredaysLast);
	}
};
