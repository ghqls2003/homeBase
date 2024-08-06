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
//통합간편인증 공통 유틸
// TODO: index.html -> /test/index.jsp 경로 변경으로 인해 경로 수정 by junseong
document.write("<script type=\"text/javascript\" src=\"" + "../ext-lib/AnySign_26/interface/commSign4PCInterface.js\"></scr"+"ipt>");
document.write("<script type=\"text/javascript\" src=\"" + "../ext-lib/AnySign_26/interface/anySignOld4PCInterface.js\"></scr"+"ipt>");
document.write("<script type=\"text/javascript\" src=\"" + "../ext-lib/AnySign_26/interface/simpleSign4PCInterface.js\"></scr"+"ipt>");
//(구)공인인증서 javascript
// TODO: index.html -> /test/index.jsp 경로 변경으로 인해 경로 수정 by junseong
document.write("<!-- AnySign stylesheet -->");
document.write("<link rel='stylesheet' id='anySignCSS' type='text/css' href='../ext-lib/AnySign_26/AnySign4PC/css/common.css' />");
document.write("<script type=\"text/javascript\" src=\"" + "../ext-lib/AnySign_26/AnySign4PC/ext/crossStorageClient.min.js\"></scr"+"ipt>");
document.write("<script type=\"text/javascript\" src=\"" + "../ext-lib/AnySign_26/AnySign4PC/ext/xcryptoCore_min.js\"></scr"+"ipt>");
document.write("<script type=\"text/javascript\" src=\"" + "../ext-lib/AnySign_26/AnySign4PC/ext/SecureProto.js\"></scr"+"ipt>");
document.write("<script type=\"text/javascript\" src=\"" + "../ext-lib/AnySign_26/AnySign4PC/ext/xcrypto_min.js\"></scr"+"ipt>");
document.write("<script type=\"text/javascript\" src=\"" + "../ext-lib/AnySign_26/AnySign4PC/ext/FileSaver.min.js\"></scr"+"ipt>");
document.write("<script type=\"text/javascript\" src=\"" + "../ext-lib/AnySign_26/AnySign4PC/ext/integrity_min.js\"></scr"+"ipt>");
document.write("<script type=\"text/javascript\" src=\"" + "../ext-lib/AnySign_26/AnySign4PC/ext/ClassList.js\"></scr"+"ipt>");
//document.write("<script src=\"https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.12.1/polyfill.min.js\"></scr"+"ipt>");
//document.write("<script src=\"https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js\"></scr"+"ipt>");

//통합간편인증 설정
var AnySignProp = {
	/*
		AnySignOld : (구) 공동인증서 => SignDataCMS, SignDataWithVID 포함 모든 API가 기존 UI 적용
		AnySign : (구) 공동인증서 => SignDataCMS, SignDataWithVID 만 AS+ UI 적용
		SimpleSign : 간편인증서
		AnySignAll : (구)공인인증서[Active] & 간편인증서
		SimpleSignAll (기본값) : (구)공인인증서 & 간편인증서[Active]
	*/
	signType : 'AnySign',
	signLanguage : 'ko-KR', /*ko-KR(기본값) or en-US*/
	signDevice : false, /* 디바이스 환경 */

	aProtocol : document.location.protocol, // window.location.protocol (http:)
	aPort : document.location.port, // window.location.port (port)
	aHostName : '',

	aSimplePath :  contextPath + '/ext-lib/AnySign_26', // AS+ Base Path

	aUseRestApi : false, // Use AnySign Server Integrated REST API ( true:사용 / false:사용안함 )
	// AnySignServer REST API 옵션
	restApiInfo : {
		// ex) https://{domain}:{port}
		host : "http://192.168.60.29:7798", // 내부 테스트용 주소
		serviceCode : 1, // 서비스 코드
		idenReq : "/anysign/api/simpleAuth/sign", // TODO: FIX
		idenRes : "/anysign/api/simpleAuth/result", // TODO: FIX
		signReq : "/anysign/api/simpleAuth/sign",
		signRes : "/anysign/api/simpleAuth/result",
		signDec : "/anysign/api/simpleAuth/decrypt",
	},

	bInitPath : false,

	// 기본값 설정처리
	//extraInfo : { name : '홍길동' , hp : '01011112222' , jumin1 : '901111' , jumin2 : '1' }/*테스트용데이터*/ ,
	extraInfo : { name : '' , hp : '' , jumin1 : '' , jumin2 : '' } ,

	// 최근 사용 간편인증 자동 진입
	autoClick : false,
	// 최근 사용 간편인증 순서 정렬
	recentSort : false,

	cookieName : 'simpleSignList', /* 간편인증목록 쿠키명 */
	cookieExpiredays : 30, /* 간편인증목록 쿠키저장 일수 */

	cookieNameLast : 'simpleSignLast', /* 간편인증 최종 설정쿠키명 */
	cookieExpiredaysLast : 30, /* 간편인증 최종 쿠키저장 일수 */

	//TODO 간편인증 통합 환경설정에 필요한 항목 설정(index.html 화면의 정보를 참조하기때문에 실적용화면에따른 수정필요)
	initProp : function(){
		// 디바이스 환경
		var simpleSignDevice = commSign.isMobilePlatform();
		if(!commSign.isEmpty(simpleSignDevice)){
			AnySignProp.signDevice = simpleSignDevice;
		}
		// aSimplePath 경로 설정 세팅
		if(AnySignProp.bInitPath == false) {
			if(AnySignProp.aPort == "") {
				AnySignProp.aHostName = document.location.hostname;
			} else {
				AnySignProp.aHostName = document.location.host;
			}
			AnySignProp.aSimplePath = this.aProtocol + "//" + this.aHostName + AnySignProp.aSimplePath;
			AnySignProp.bInitPath = true;
		}
	},
}

var AnySign = {

	bInitAnySign : false, /* (구)공인인증 초기화 여부(최초 1회만 실행되어야할 기능) */
	bInitSimpleSign : true, /* 통합간편인증 초기화 여부(최최 1회만 실행되어야할 기능) */

	// 기본값 설정처리
	//{ name : '홍길동' , hp : '01012345678' , jumin1 : '900101' , jumin2 : '1' }
	setExtraInfo : function(aOptions) {
		AnySignProp.extraInfo = aOptions;
	},

	//AnySign 실행여부(중복실행방지)
	isAnySignShow : function() {
		if ( !commSign.isEmpty(document.getElementsByClassName('xTsign-layout')) ) {
			return true;
		}
		return false;
	},

	//간편인증UI에서 서명확인창 실행 여부 확인
	signVerifyOption: function(aOption) {
		if(aOption == 1 || aOption % 2 != 0) {
			return true;
		} else {
			return false;
		}
	},

	//통합간편인증 필요정보 설정
	initSimpleSign : function(aFuncName, aPlain, aOption, aIdn, aTotal, aDelimeter, aFileInfo, aFileHash, aUserCallback) {
		if(this.bInitSimpleSign == false ) {
			this.bInitSimpleSign = true;

			//최초1회 통합간편인증 javascript 파일 추가
			commSign.addJavascript(AnySignProp.aSimplePath + '/interface/simpleSign4PCInterface.js',function(){
				SimpleSign.initSimpleSign(aFuncName, aPlain, aOption, aIdn, aTotal, aDelimeter, aFileInfo, aFileHash, aUserCallback);
			});
	    }else {
			SimpleSign.initSimpleSign(aFuncName, aPlain, aOption, aIdn, aTotal, aDelimeter, aFileInfo, aFileHash, aUserCallback);
		}
	},

	//(구)공인인증 필요정보 설정
	initAnySign : function() {
		//var args = Array.from(arguments); // polyfill 로 가능
		//var args = [...arguments];  // babel-plugin 설치해야하는데 webpack, npm 사용으로 가능 ...
		var args = Array.prototype.slice.call(arguments);
		//var args = [].slice.call(arguments);

		var oldAnySignAPI = function (funcName, args) {
			var res = 0;

			if(args == undefined || funcName == undefined) {
				if(AnySignProp.signLanguage == "ko-KR")
					AnySign.errorCallback("파라미터 값이 잘못되었습니다.");
				else
					AnySign.errorCallback("Invalid parameter value.");
				return;
			}
			switch(funcName) {
				case "SignDataCMS" :
					if(arguments[1].length != 8) {
						res = -1;
						break;
					}
					AnySign.SignDataCMSOld.apply(AnySign, arguments[1]);
					//AnySign.SignDataCMSOld(...args); // babel-plugin 설치해야하는데 webpack, npm 사용으로 가능 ...
					break;
				case "SignDataWithVID" :
					if(arguments[1].length != 10) {
						res = -1;
						break;
					}
					AnySign.SignDataWithVIDOld.apply(AnySign, arguments[1]);
					break;
				case "SignDataWithVID_Serial" :
					if(arguments[1].length != 12) {
						res = -1;
						break;
					}
					AnySign.SignDataWithVID_SerialOld.apply(AnySign, arguments[1]);
					break;
				case "MultiSignWithSerial" :
					if(arguments[1].length != 6) {
						res = -1;
						break;
					}
					MultiSignWithSerialOld.apply(AnySign, arguments[1]);
					break;
				case "SignDataUCPID" :
					if(arguments[1].length != 4) {
						res = -1;
						break;
					}
					AnySign.SignDataUCPIDOld.apply(AnySign, arguments[1]);
					break;
				case "SignFileInfo" :
					if(arguments[1].length != 9) {
						res = -1;
						break;
					}
					AnySign.SignFileInfoOld.apply(AnySign, arguments[1]);
					break;
				case "SignFileInfoWithVID" :
					if (arguments[1].length != 11) {
						res = -1;
						break;
					}
					AnySign.SignFileInfoWithVIDOld.apply(AnySign, arguments[1]);
					break;
				case "SignFileInfoAdd" :
					if(arguments[1].length != 8) {
						res = -1;
						break;
					}
					AnySign.SignFileInfoAddOld.apply(AnySign, arguments[1]);
					break;
				case "MultiSignFileInfo" :
					if(arguments[1].length != 11) {
						res = -1;
						break;
					}
					MultiSignFileInfoOld.apply(AnySign, arguments[1]);
					break;
				case "MultiSignFileInfoWithVID" :
					if(arguments[1].length != 13) {
						res = -1;
						break;
					}
					MultiSignFileInfoWithVIDOld.apply(AnySign, arguments[1]);
					break;
				default :
					if(AnySignProp.signLanguage == "ko-KR")
						AnySign.errorCallback("해당 옵션은 지원되지 않는 API입니다.");
					else
						AnySign.errorCallback("This option is not a supported API.");
					return;
			}

			if(res < 0) {
				if(AnySignProp.signLanguage == "ko-KR")
					AnySign.errorCallback("파라미터 길이가 잘못되었습니다.");
				else
					AnySign.errorCallback("Invalid parameter length.");
				return;
			}
		};

	    if(this.bInitAnySign == false ) {
			this.bInitAnySign = true;
			//최초 1회 (구)공인인증 css 및 js 추가
			commSign.addStylesheet(AnySignProp.aSimplePath + '/AnySign4PC/css/common.css');

			//기존 AnySign 내부에서 mUITarget을 타겟으로 설정된것을 id="xTsign" 설정하도록 추가 ( AnySign Module내에서 parentNode 설정되기때문에 하위 Node 설정 )
			if(AnySign.mShowInfoDialog.enable) {
				AnySign.mUISettings.mUITarget_xTsign = document.getElementById('tabs_anysign');
			}

			//id값 xwup_cert_pop_embedded_area 설정하면 overlay 미표시됨.
			AnySign.mUISettings.mUITarget = document.getElementById('xwup_cert_pop_embedded_area');

			//AnySign.SignDataCMSOld(aXgateAddress,aCAList,aPlain,aOption,aDescription,aLimitedTrial,aUserCallback,aErrCallback);
			oldAnySignAPI(args.pop(), args);
	    } else{
			//기존 AnySign 내부에서 mUITarget을 타겟으로 설정된것을 id="xTsign" 설정하도록 추가 ( AnySign Module내에서 parentNode 설정되기때문에 하위 Node 설정 )
			if(AnySign.mShowInfoDialog.enable) {
				AnySign.mUISettings.mUITarget_xTsign = document.getElementById('tabs_anysign');
			}

			AnySign.mUISettings.mUITarget = document.getElementById('xwup_cert_pop_embedded_area');

			oldAnySignAPI(args.pop(), args);
		}

		AnySign.showAnySignUI();
	},

	showAnySignUI : function () {
		//(구)공인인증서 팝업화면 위치 재조정후 hidden 삭제
		setTimeout (function check_xwup_cert_pop() {
			if ( commSign.isEmpty(document.getElementsByClassName('xwup_cert_pop')) ) {
				setTimeout (check_xwup_cert_pop, 100);
			} else {
				//CSS 추가적용
				var xwup_cert_pop = document.getElementsByClassName('xwup_cert_pop')[0];
				xwup_cert_pop.classList.add('xwup_cert_pop_anysign');

				//취소버튼 클릭시
				document.getElementById('xwup_CancelButton').onclick = function() {
					SimpleSign.onClose();
				};

				//(구)공인인증서 화면 존재여부 확인후 미존재시 통합간편인증 화면 종료
				setTimeout (function check_xwup_cert_pop_display() {
					if ( commSign.isEmpty(document.getElementsByClassName('xwup_cert_pop')) ) {
						SimpleSign.hide();
					} else {
						setTimeout (check_xwup_cert_pop_display, 1000);
					}
				}, 1000);
			}
		}, 100);
	},

	//기존 솔루션 코드수정없이 적용을 위해 최초진입점을 그대로 유지함. (SignType 설정값에 따라 실행)
	SignDataCMS : function (aXgateAddress,aCAList,aPlain,aOption,aDescription,aLimitedTrial,aUserCallback,aErrCallback)
	{
		// AnySignOld 타입일 경우와 certselectwide일 경우
		if(AnySignProp.signType == "AnySignOld" || AnySign.mDivInsertOption == 1) {
			AnySign.SignDataCMSOld(aXgateAddress,aCAList,aPlain,aOption,aDescription,aLimitedTrial,aUserCallback,aErrCallback);
			return;
		}

		//서명확인창 실행 여부 확인 (추후 고도화 예정)
		if(this.signVerifyOption(aOption)) {
			if(AnySignProp.signLanguage == "ko-KR")
				this.errorCallback("해당 옵션은 지원되지 않는 기능입니다.");
			else
				this.errorCallback("This option is not a supported feature.");
			return;
		}

		//실행여부 확인(중복실행방지)
		if(this.isAnySignShow()) {
			return;
		}

		//통합 간편인증 환경설정
		AnySignProp.initProp();

		if(!AnySignProp.signDevice) {
			AnySign.mCertselectHeaderExist = false;

			//통합 간편인증 화면
			AnySign.initSimpleSign("SignDataCMS", aPlain, aOption, null, null, null, null, null, aUserCallback);

			//(구)공인인증 화면
			setTimeout (function check_xTsign_layout() {
				if ( commSign.isEmpty(document.getElementsByClassName('xTsign-layout')) ) {
					setTimeout (check_xTsign_layout, 100);
				} else {
					if(AnySignProp.signType != 'SimpleSign') {
						//SimpleSign 단독 실행 외에는 (구)공인인증 화면추가
						AnySign.initAnySign(aXgateAddress,aCAList,aPlain,aOption,aDescription,aLimitedTrial,aUserCallback,aErrCallback,"SignDataCMS");
					}
				}
			}, 100);
		} else {
			if(AnySignProp.signType == 'AnySign') {
				AnySign.initAnySign(aXgateAddress,aCAList,aPlain,aOption,aDescription,aLimitedTrial,aUserCallback,aErrCallback,"SignDataCMS");
			} else if (AnySignProp.signType == 'SimpleSign') {
				AnySign.initSimpleSign("SignDataCMS", aPlain, aOption, null, null, null, null, null, aUserCallback);
			}
		}
	},

	// SignDataWithVID API 지원
	SignDataWithVID : function (aXgateAddress,aCAList,aPlain,aOption,aDescription,aLimitedTrial,aIdn,aSvrCert,aUserCallback,aErrCallback)
	{
		if(AnySignProp.signType == "AnySignOld" || AnySign.mDivInsertOption == 1) {
			AnySign.SignDataWithVIDOld(aXgateAddress,aCAList,aPlain,aOption,aDescription,aLimitedTrial,aIdn,aSvrCert,aUserCallback,aErrCallback);
			return;
		}

		//서명확인창 실행 여부 확인 (추후 고도화 예정)
		if(this.signVerifyOption(aOption)) {
			if(AnySignProp.signLanguage == "ko-KR")
				this.errorCallback("해당 옵션은 지원되지 않는 기능입니다.");
			else
				this.errorCallback("This option is not a supported feature.");
			return;
		}

		//실행여부 확인
		if(this.isAnySignShow()) {
			return;
		}

		//통합 간편인증 환경설정
		AnySignProp.initProp();

		if(!AnySignProp.signDevice) {
			AnySign.mCertselectHeaderExist = false;

			//통합 간편인증 화면
			AnySign.initSimpleSign("SignDataWithVID", aPlain, aOption, aIdn, null, null, null, null, aUserCallback);

			//(구)공인인증 화면
			setTimeout (function check_xTsign_layout() {
				if ( commSign.isEmpty(document.getElementsByClassName('xTsign-layout')) ) {
					setTimeout (check_xTsign_layout, 100);
				} else {
					if(AnySignProp.signType != 'SimpleSign') {
						//SimpleSign 단독 실행 외에는 (구)공인인증 화면추가
						AnySign.initAnySign(aXgateAddress,aCAList,aPlain,aOption,aDescription,aLimitedTrial,aIdn,aSvrCert,aUserCallback,aErrCallback,"SignDataWithVID");
					}
				}
			}, 100);
		} else {
			if(AnySignProp.signType == 'AnySign') {
				AnySign.initAnySign(aXgateAddress,aCAList,aPlain,aOption,aDescription,aLimitedTrial,aIdn,aSvrCert,aUserCallback,aErrCallback,"SignDataWithVID");
			} else if (AnySignProp.signType == 'SimpleSign') {
				AnySign.initSimpleSign("SignDataWithVID", aPlain, aOption, aIdn, null, null, null, null, aUserCallback);
			}
		}
	},

	// SignDataWithVID_Serial API 지원
	SignDataWithVID_Serial : function (aXgateAddress,aCAList,aCertSerial,aCertLocation,aPlain,aOption,aDescription,aLimitedTrial,aIdn,aSvrCert,aUserCallback,aErrCallback)
	{
		if(AnySignProp.signType == "AnySignOld" || AnySign.mDivInsertOption == 1) {
			AnySign.SignDataWithVID_SerialOld(aXgateAddress,aCAList,aCertSerial,aCertLocation,aPlain,aOption,aDescription,aLimitedTrial,aIdn,aSvrCert,aUserCallback,aErrCallback);
			return;
		}

		//서명확인창 실행 여부 확인 (추후 고도화 예정)
		if(this.signVerifyOption(aOption)) {
			if(AnySignProp.signLanguage == "ko-KR")
				this.errorCallback("해당 옵션은 지원되지 않는 기능입니다.");
			else
				this.errorCallback("This option is not a supported feature.");
			return;
		}

		//실행여부 확인
		if(this.isAnySignShow()) {
			return;
		}

		//통합 간편인증 환경설정
		AnySignProp.initProp();

		if(!AnySignProp.signDevice) {
			AnySign.mCertselectHeaderExist = false;

			//통합 간편인증 화면
			AnySign.initSimpleSign("SignDataWithVID_Serial", aPlain, aOption, aIdn, null, null, null, null, aUserCallback);

			//(구)공인인증 화면
			setTimeout (function check_xTsign_layout() {
				if ( commSign.isEmpty(document.getElementsByClassName('xTsign-layout')) ) {
					setTimeout (check_xTsign_layout, 100);
				} else {
					if(AnySignProp.signType != 'SimpleSign') {
						//SimpleSign 단독 실행 외에는 (구)공인인증 화면추가
						AnySign.initAnySign(aXgateAddress,aCAList,aCertSerial,aCertLocation,aPlain,aOption,aDescription,aLimitedTrial,aIdn,aSvrCert,aUserCallback,aErrCallback,"SignDataWithVID_Serial");
					}
				}
			}, 100);
		} else {
			if(AnySignProp.signType == 'AnySign') {
				AnySign.initAnySign(aXgateAddress,aCAList,aCertSerial,aCertLocation,aPlain,aOption,aDescription,aLimitedTrial,aIdn,aSvrCert,aUserCallback,aErrCallback,"SignDataWithVID_Serial");
			} else if (AnySignProp.signType == 'SimpleSign') {
				AnySign.initSimpleSign("SignDataWithVID_Serial", aPlain, aOption, aIdn, null, null, null, null, aUserCallback);
			}
		}
	},

	SignDataUCPID : function (aJsonString,aOption,aUserCallback,aErrCallback)
	{
		//실행여부 확인(중복실행방지)
		if(this.isAnySignShow()) {
			return;
		}

		//통합 간편인증 환경설정
		AnySignProp.initProp();

		if(!AnySignProp.signDevice) {
			AnySign.mCertselectHeaderExist = false;

			AnySign.initSimpleSign("SignDataUCPID", "", aOption, null, null, null, null, null, aUserCallback);

			//(구)공인인증 화면
			setTimeout (function check_xTsign_layout() {
				if ( commSign.isEmpty(document.getElementsByClassName('xTsign-layout')) ) {
					setTimeout (check_xTsign_layout, 100);
				} else {
					if(AnySignProp.signType != 'SimpleSign') {
						//SimpleSign 단독 실행 외에는 (구)공인인증 화면추가
						AnySign.initAnySign(aJsonString,aOption,aUserCallback,aErrCallback,"SignDataUCPID");
					}
				}
			}, 100);
		} else {
			if (AnySignProp.signType == 'AnySign') {
				AnySign.initAnySign(aJsonString,aOption,aUserCallback,aErrCallback,"SignDataUCPID");
			} else if (AnySignProp.signType == 'SimpleSign') {
				AnySign.initSimpleSign("SignDataUCPID", "", aOption, null, null, null, null, null, aUserCallback);
			}
		}
	},

	errorCallback: function(aMsg) {
		alert(aMsg);
		SimpleSign.onClose();
	},

	GetLastLocation : function (aUserCallback)
	{
		// AnySignOld 타입일 경우와 certselectwide일 경우
		if(AnySignProp.signType == "AnySignOld" || AnySign.mDivInsertOption == 1) {
			AnySign.GetLastLocationOld(aUserCallback);
			return;
		}

		//통합 간편인증 환경설정
		AnySignProp.initProp();

		if(AnySignProp.signType == 'AnySign') {
			AnySign.GetLastLocationOld(aUserCallback);
		} else {
			commSign.GetLastLocation(aUserCallback);
		}
	},
	SetLastLocation : function (aMediaID)
	{
		// AnySignOld 타입일 경우와 certselectwide일 경우
		if(AnySignProp.signType == "AnySignOld" || AnySign.mDivInsertOption == 1) {
			alert('지원하지 않는 기능입니다.');
			return;
		}

		//통합 간편인증 환경설정
		AnySignProp.initProp();

		if(AnySignProp.signType == 'AnySign') {
			alert('지원하지 않는 기능입니다.');
		} else {
			commSign.SetLastLocation(aMediaID);
		}
	},
	CleanLastLocation : function ()
	{
		// AnySignOld 타입일 경우와 certselectwide일 경우
		if(AnySignProp.signType == "AnySignOld" || AnySign.mDivInsertOption == 1) {
			alert('지원하지 않는 기능입니다.');
			return;
		}

		//통합 간편인증 환경설정
		AnySignProp.initProp();

		if(AnySignProp.signType == 'AnySign') {
			alert('지원하지 않는 기능입니다.');
		} else {
			commSign.CleanLastLocation();
		}
	},
	SignFileInfo : function (aXgateAddress, aCAList, aFileInfo, aFileHash, aOption, aDescription, aLimitedTrial, aUserCallback, aErrCallback) {

		//서명확인창 실행 여부 확인 (추후 고도화 예정)
		if(this.signVerifyOption(aOption)) {
			if(AnySignProp.signLanguage == "ko-KR")
				this.errorCallback("해당 옵션은 지원되지 않는 기능입니다.");
			else
				this.errorCallback("This option is not a supported feature.");
			return;
		}

		//실행여부 확인(중복실행방지)
		if(this.isAnySignShow()) {
			return;
		}

		//통합 간편인증 환경설정
		AnySignProp.initProp();

		if(!AnySignProp.signDevice) {
			AnySign.mCertselectHeaderExist = false;

			//통합 간편인증 화면
			AnySign.initSimpleSign("MultiSignFileInfo", "", aOption, null, 1, null, aFileInfo, aFileHash, aUserCallback);

			//(구)공인인증 화면
			setTimeout (function check_xTsign_layout() {
				if ( commSign.isEmpty(document.getElementsByClassName('xTsign-layout')) ) {
					setTimeout (check_xTsign_layout, 100);
				} else {
					if(AnySignProp.signType != 'SimpleSign') {
						//SimpleSign 단독 실행 외에는 (구)공인인증 화면추가
						AnySign.initAnySign(aXgateAddress,aCAList,aFileInfo,aFileHash,aOption,aDescription,aLimitedTrial,aUserCallback,aErrCallback,"SignFileInfo");
					}
				}
			}, 100);
		} else {
			if(AnySignProp.signType == 'AnySign') {
				AnySign.initAnySign(aXgateAddress,aCAList,aFileInfo,aFileHash,aOption,aDescription,aLimitedTrial,aUserCallback,aErrCallback,"SignFileInfo");
			} else if (AnySignProp.signType == 'SimpleSign') {
				AnySign.initSimpleSign("MultiSignFileInfo", aFileHash, aOption, null, 1, null, aFileInfo, aFileHash, aUserCallback);
			}
		}
	},

	SignFileInfoWithVID : function (aXgateAddress, aCAList, aFileInfo, aFileHash, aOption, aDescription, aLimitedTrial, aIdn, aSvrCert, aUserCallback, aErrCallback) {

		//서명확인창 실행 여부 확인 (추후 고도화 예정)
		if(this.signVerifyOption(aOption)) {
			if(AnySignProp.signLanguage == "ko-KR")
				this.errorCallback("해당 옵션은 지원되지 않는 기능입니다.");
			else
				this.errorCallback("This option is not a supported feature.");
			return;
		}

		//실행여부 확인(중복실행방지)
		if(this.isAnySignShow()) {
			return;
		}

		//통합 간편인증 환경설정
		AnySignProp.initProp();

		if(!AnySignProp.signDevice) {
			AnySign.mCertselectHeaderExist = false;

			//통합 간편인증 화면
			AnySign.initSimpleSign("MultiSignFileInfoWithVID", aFileHash, aOption, aIdn, 1, null, aFileInfo, aFileHash, aUserCallback);

			//(구)공인인증 화면
			setTimeout (function check_xTsign_layout() {
				if ( commSign.isEmpty(document.getElementsByClassName('xTsign-layout')) ) {
					setTimeout (check_xTsign_layout, 100);
				} else {
					if(AnySignProp.signType != 'SimpleSign') {
						//SimpleSign 단독 실행 외에는 (구)공인인증 화면추가
						AnySign.initAnySign(aXgateAddress,aCAList,aFileInfo,aFileHash,aOption,aDescription,aLimitedTrial,aIdn,aSvrCert,aUserCallback,aErrCallback,"SignFileInfoWithVID");
					}
				}
			}, 100);
		} else {
			if(AnySignProp.signType == 'AnySign') {
				AnySign.initAnySign(aXgateAddress,aCAList,aFileInfo,aFileHash,aOption,aDescription,aLimitedTrial,aIdn,aSvrCert,aUserCallback,aErrCallback,"SignFileInfoWithVID");
			} else if (AnySignProp.signType == 'SimpleSign') {
				AnySign.initSimpleSign("SignFileInfoWithVID", aFileHash, aOption, aIdn, 1, null, aFileInfo, aFileHash, aUserCallback)
			}
		}
	},

	SignFileInfoAdd : function (aXgateAddress, aCAList, aPlain, aOption, aDescription, aLimitedTrial, aUserCallback, aErrCallback) {

		//서명확인창 실행 여부 확인 (추후 고도화 예정)
		if(this.signVerifyOption(aOption)) {
			if(AnySignProp.signLanguage == "ko-KR")
				this.errorCallback("해당 옵션은 지원되지 않는 기능입니다.");
			else
				this.errorCallback("This option is not a supported feature.");
			return;
		}

		//실행여부 확인(중복실행방지)
		if(this.isAnySignShow()) {
			return;
		}

		//통합 간편인증 환경설정
		AnySignProp.initProp();

		if(!AnySignProp.signDevice) {
			AnySign.mCertselectHeaderExist = false;

			//통합 간편인증 화면
			AnySign.initSimpleSign("SignFileInfoAdd", aPlain, aOption, null, 1, null, null, null, aUserCallback);

			//(구)공인인증 화면
			setTimeout (function check_xTsign_layout() {
				if ( commSign.isEmpty(document.getElementsByClassName('xTsign-layout')) ) {
					setTimeout (check_xTsign_layout, 100);
				} else {
					if(AnySignProp.signType != 'SimpleSign') {
						//SimpleSign 단독 실행 외에는 (구)공인인증 화면추가
						AnySign.initAnySign(aXgateAddress, aCAList, aPlain, aOption, aDescription, aLimitedTrial, aUserCallback, aErrCallback, "SignFileInfoAdd");
					}
				}
			}, 100);
		} else {
			if(AnySignProp.signType == 'AnySign') {
				AnySign.initAnySign(aXgateAddress, aCAList, aPlain, aOption, aDescription, aLimitedTrial, aUserCallback, aErrCallback, "SignFileInfoAdd");
			} else if (AnySignProp.signType == 'SimpleSign') {
				AnySign.initSimpleSign("SignFileInfoAdd", aPlain, aOption, null, 1, null, null, null, aUserCallback);
			}
		}
	}
};

// MultiSignWithSerial API 지원
function MultiSignWithSerial (aTotal,aPlainMsg,aDelimeter,aCertSerial,aCertLocation,aUserCallback)
{
	if(AnySignProp.signType == "AnySignOld" || AnySign.mDivInsertOption == 1) {
		MultiSignWithSerialOld(aTotal,aPlainMsg,aDelimeter,aCertSerial,aCertLocation,aUserCallback);
		return;
	}

	//실행여부 확인
	if(AnySign.isAnySignShow()) {
		return;
	}

	//통합 간편인증 환경설정
	AnySignProp.initProp();

	if(!AnySignProp.signDevice) {
		AnySign.mCertselectHeaderExist = false;

		//통합 간편인증 화면
		AnySign.initSimpleSign("MultiSignWithSerial", aPlainMsg, null, null, aTotal, aDelimeter, null, null, aUserCallback);

		//(구)공인인증 화면
		setTimeout (function check_xTsign_layout() {
			if ( commSign.isEmpty(document.getElementsByClassName('xTsign-layout')) ) {
				setTimeout (check_xTsign_layout, 100);
			} else {
				if(AnySignProp.signType != 'SimpleSign') {
					//SimpleSign 단독 실행 외에는 (구)공인인증 화면추가
					AnySign.initAnySign(aTotal,aPlainMsg,aDelimeter,aCertSerial,aCertLocation,aUserCallback,"MultiSignWithSerial");
				}
			}
		}, 100);
	} else {
		if(AnySignProp.signType == 'AnySign') {
			AnySign.initAnySign(aTotal,aPlainMsg,aDelimeter,aCertSerial,aCertLocation,aUserCallback,"MultiSignWithSerial");
		} else if (AnySignProp.signType == 'SimpleSign') {
			AnySign.initSimpleSign("MultiSignWithSerial", aPlainMsg, null, null, aTotal, aDelimeter, null, null, aUserCallback);
		}
	}
}

function MultiSignFileInfo (aXgateAddress, aCAList, aTotal, aDelimeter, aFileInfo, aFileHash, aOption, aDescription, aLimitedTrial, aUserCallback, aErrCallback)
{
	//실행여부 확인(중복실행방지)
	if(AnySign.isAnySignShow()) {
		return;
	}

	//통합 간편인증 환경설정
	AnySignProp.initProp();

	if(!AnySignProp.signDevice) {
		AnySign.mCertselectHeaderExist = false;

		//통합 간편인증 화면
		AnySign.initSimpleSign("MultiSignFileInfo", "", aOption, null, aTotal, aDelimeter, aFileInfo, aFileHash, aUserCallback);

		//(구)공인인증 화면
		setTimeout (function check_xTsign_layout() {
			if ( commSign.isEmpty(document.getElementsByClassName('xTsign-layout')) ) {
				setTimeout (check_xTsign_layout, 100);
			} else {
				if(AnySignProp.signType != 'SimpleSign') {
					//SimpleSign 단독 실행 외에는 (구)공인인증 화면추가
					AnySign.initAnySign(aXgateAddress,aCAList,aTotal,aDelimeter,aFileInfo,aFileHash,aOption,aDescription,aLimitedTrial,aUserCallback,aErrCallback,"MultiSignFileInfo");
				}
			}
		}, 100);
	} else {
		if(AnySignProp.signType == 'AnySign') {
			AnySign.initAnySign(aXgateAddress,aCAList,aTotal,aDelimeter,aFileInfo,aFileHash,aOption,aDescription,aLimitedTrial,aUserCallback,aErrCallback,"MultiSignFileInfo");
		} else if (AnySignProp.signType == 'SimpleSign') {
			AnySign.initSimpleSign("MultiSignFileInfo", "", aOption, null, aTotal, aDelimeter, aFileInfo, aFileHash, aUserCallback);
		}
	}
}

function MultiSignFileInfoWithVID (aXgateAddress, aCAList, aTotal, aDelimeter, aFileInfo, aFileHash, aOption, aDescription, aLimitedTrial, aIdn, aSvrCert, aUserCallback, aErrCallback)
{
	//실행여부 확인(중복실행방지)
	if(AnySign.isAnySignShow()) {
		return;
	}

	//통합 간편인증 환경설정
	AnySignProp.initProp();

	if(!AnySignProp.signDevice) {
		AnySign.mCertselectHeaderExist = false;

		//통합 간편인증 화면
		AnySign.initSimpleSign("MultiSignFileInfoWithVID", "", aOption, aIdn, aTotal, aDelimeter, aFileInfo, aFileHash, aUserCallback);

		//(구)공인인증 화면
		setTimeout (function check_xTsign_layout() {
			if ( commSign.isEmpty(document.getElementsByClassName('xTsign-layout')) ) {
				setTimeout (check_xTsign_layout, 100);
			} else {
				if(AnySignProp.signType != 'SimpleSign') {
					//SimpleSign 단독 실행 외에는 (구)공인인증 화면추가
					AnySign.initAnySign(aXgateAddress,aCAList,aTotal,aDelimeter,aFileInfo,aFileHash,aOption,aDescription,aLimitedTrial,aIdn, aSvrCert,aUserCallback,aErrCallback,"MultiSignFileInfoWithVID");
				}
			}
		}, 100);
	} else {
		if(AnySignProp.signType == 'AnySign') {
			AnySign.initAnySign(aXgateAddress,aCAList,aTotal,aDelimeter,aFileInfo,aFileHash,aOption,aDescription,aLimitedTrial,aIdn,aSvrCert,aUserCallback,aErrCallback,"MultiSignFileInfoWithVID");
		} else if (AnySignProp.signType == 'SimpleSign') {
			AnySign.initSimpleSign("MultiSignFileInfoWithVID", "", aOption, aIdn, aTotal, aDelimeter, aFileInfo, aFileHash, aUserCallback);
		}
	}
}