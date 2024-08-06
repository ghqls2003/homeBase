var kakaoPay = {

	//초기화 여부(최초 1회만 실행되어야할 기능)
	bInit : false,

	//카카오인증서 선택시(시적점)
	onClick : function() {
		if(this.bInit == false ) {
			this.bInit = true;
		}
		this.initLayout();
	},
	//인증시작 화면표시
	initLayout : function(){
		var div = [];		

		div.push('<!--팝업 메뉴 영역 : 전문보기1 -->');
		div.push('<div id="kakaopay_light" class="white_content_kakaopay">');
		div.push(commSign.getLanguage('kakaopay','L00100'));
		div.push('<div class="popBomt">');
		if(!AnySignProp.signDevice){
			div.push('<span><a href="javascript:void(0)" tabindex="4" onclick="SimpleSign.appendTabControl();document.getElementById(\'kakaopay_light\').style.display=\'none\';document.getElementById(\'kakaopay_fade\').style.display=\'none\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl();document.getElementById(\'kakaopay_light\').style.display=\'none\';document.getElementById(\'kakaopay_fade\').style.display=\'none\' }">' + commSign.getLanguage('kakaopay','L00009')  +'</a></span>');
		} else {
			div.push('<span><a href="javascript:void(0)" onclick = "document.getElementById(\'kakaopay_light\').style.display=\'none\';document.getElementById(\'kakaopay_fade\').style.display=\'none\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'block\'">' + commSign.getLanguage('kakaopay','L00009')  +'</a></span>');
		}
		div.push('</div>');		
		div.push('</div>');
		div.push('<div id="kakaopay_fade" class="black_overlay_kakaopay"></div>');
		
		div.push('<!--팝업 메뉴 영역 : 전문보기2 -->');
		div.push('<div id="kakaopay_light2" class="white_content_kakaopay">');
		div.push(commSign.getLanguage('kakaopay','L00101'));
		div.push('<div class="popBomt">');
		if(!AnySignProp.signDevice){
			div.push('<span><a href="javascript:void(0)" tabindex="4" onclick="SimpleSign.appendTabControl();document.getElementById(\'kakaopay_light2\').style.display=\'none\';document.getElementById(\'kakaopay_fade2\').style.display=\'none\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl();document.getElementById(\'kakaopay_light2\').style.display=\'none\';document.getElementById(\'kakaopay_fade2\').style.display=\'none\' }">' + commSign.getLanguage('kakaopay','L00009')  +'</a></span>');
		} else {
			div.push('<span><a href="javascript:void(0)" onclick = "document.getElementById(\'kakaopay_light2\').style.display=\'none\';document.getElementById(\'kakaopay_fade2\').style.display=\'none\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'block\'">' + commSign.getLanguage('kakaopay','L00009')  +'</a></span>');
		}
		div.push('</div>');		
		div.push('</div>');
		div.push('<div id="kakaopay_fade2" class="black_overlay_kakaopay"></div>');

		div.push('<ul>');
		div.push('<li tabindex="3" id="xTsign_icon_top" class="xTsignli iconTop" ><img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/icon_kakaopay.png" alt=""><a class="Atit">' + commSign.getLanguage('kakaopay','L00001')  +'</a></li>');
		div.push('</ul>');
		div.push('<div id="xTsign_kakaopay_con" class="kakaopay_con" tabindex="3">');
			div.push('<p id="xTsign_title">' + commSign.getLanguage('kakaopay','L00002')  +'</p>');
			div.push('<dl>');
				div.push('<dt><label for="name">' + commSign.getLanguage('kakaopay','L00010')  +'</label></dt>');
				div.push('<dd><input type="text" id="name" tabindex="3" title="' + commSign.getLanguage('kakaopay','L00010')  +'"></dd>');
			div.push('</dl>');
			div.push('<dl>');
				div.push('<dt><label for="birthday" >' + commSign.getLanguage('kakaopay','L00011')  +'</label></dt>');
				div.push('<dd>');
					div.push('<input tabindex="3" type="number" pattern="[0-9]*" id="birthday" title="' + commSign.getLanguage('kakaopay','L00011')  +'" placeholder="' + commSign.getLanguage('kakaopay','L00012')  +'" maxlength="8" onkeyup="return commSign.checkNumber(event);">');
				div.push('</dd>');
			div.push('</dl>');
			div.push('<dl>');
				div.push('<dt><label for="phone">' + commSign.getLanguage('kakaopay','L00015')  +'</label></dt>');
				div.push('<dd><input tabindex="3" type="number" pattern="[0-9]*" id="phone" title="' + commSign.getLanguage('kakaopay','L00015')  +'" placeholder="' + commSign.getLanguage('kakaopay','L00016')  +'" maxlength="11" onkeyup="return commSign.checkNumber(event);"></dd>');
			div.push('</dl>');

			div.push('<div class="consent">');
				div.push('<div class="agree">');
				div.push('<table>');				
				div.push('<tr>');
				div.push('<td>');
				if(!AnySignProp.signDevice){
					div.push('<input tabindex="3" type="radio" id="B3" name="B3" value="B3" class="viewInp" onclick="commSign.agreeCheckBox();"><label for="B3" onclick="commSign.agreeCheckBox();">' + commSign.getLanguage('kakaopay','L00038')  +'</label>');
					div.push('</td>');
					div.push('</tr>');
					div.push('<tr>');
					div.push('<td>');
					div.push('<input tabindex="3" type="checkbox" id="B1" name="B1" value="B1" class="viewInp"><label for="B1">' + commSign.getLanguage('kakaopay','L00017')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "SimpleSign.appendTabControl(document.getElementById(\'kakaopay_light\'));document.getElementById(\'kakaopay_light\').style.display=\'block\';document.getElementById(\'kakaopay_fade\').style.display=\'block\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl(document.getElementById(\'kakaopay_light\')); }">' + commSign.getLanguage('kakaopay','L00019')  +'</a>');
					div.push('<input tabindex="3" type="checkbox" id="B2" name="B2" value="B2" class="viewInp"><label for="B2">' + commSign.getLanguage('kakaopay','L00018')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "SimpleSign.appendTabControl(document.getElementById(\'kakaopay_light2\'));document.getElementById(\'kakaopay_light2\').style.display=\'block\';document.getElementById(\'kakaopay_fade2\').style.display=\'block\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl(document.getElementById(\'kakaopay_light2\')); }">' + commSign.getLanguage('kakaopay','L00019')  +'</a>');
					div.push('</td>');
				} else {
					div.push('<input tabindex="3" type="radio" id="B3" name="B3" value="B3" class="viewInp" onclick="commSign.agreeCheckBox();"><label for="B3" onclick="commSign.agreeCheckBox();">' + commSign.getLanguage('kakaopay','L00038')  +'</label>');
					div.push('</td>');
					div.push('</tr>');
					div.push('<tr>');
					div.push('<td>');
					div.push('<input type="checkbox" id="B1" name="B1" value="B1" class="viewInp"><label for="B1">' + commSign.getLanguage('kakaopay','L00017')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "document.getElementById(\'kakaopay_light\').style.display=\'block\';document.getElementById(\'kakaopay_fade\').style.display=\'block\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'none\'">' + commSign.getLanguage('kakaopay','L00019')  +'</a>');
					div.push('</br>');
					div.push('<input type="checkbox" id="B2" name="B2" value="B2" class="viewInp"><label for="B2">' + commSign.getLanguage('kakaopay','L00018')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "document.getElementById(\'kakaopay_light2\').style.display=\'block\';document.getElementById(\'kakaopay_fade2\').style.display=\'block\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'none\'">' + commSign.getLanguage('kakaopay','L00019')  +'</a>');
					div.push('</td>');
				}
				div.push('</tr>');
				div.push('</table>');
				div.push('</div>');
				
				div.push('<div class="use"><p class="use_text">' + commSign.getLanguage('kakaopay','L00004') +'</p><a id="xTsign_sign" tabindex="3" class="Retext">' + commSign.getLanguage('kakaopay','L00005') +'</a></div>');
		div.push('</div>');

		//화면표시
		SimpleSign.addSignContent(div.join(''),function(){
			
			//기본값 설정확인
			kakaoPay.initExtraInfo();
			
			//간편인증 목록 표시
			document.getElementById('xTsign_icon_top').onclick = function() { 
				if(!AnySignProp.signDevice){
					SimpleSign.addSignList();
				} else {
					SimpleSign.addMSignList();
				}
			};
			document.getElementById('xTsign_icon_top').onkeyup = function(e) {
				if(e.keyCode == 13) {
					if(!AnySignProp.signDevice){
						SimpleSign.addSignList();
					} else {
						SimpleSign.addMSignList();
					}
				}
			};

			//인증요청하기 버튼 클릭시
			document.getElementById('xTsign_sign').onclick = function() {
				kakaoPay.doSign();
			};
			document.getElementById('xTsign_sign').onkeyup = function(e) {
				if(e.keyCode == 13) {
					kakaoPay.doSign();
				}
			};
		});
	},
	
	// 기본값 설정처리
	//{ name : '홍길동' , hp : '01012345678' , jumin1 : '900101' , jumin2 : '1' }
	initExtraInfo : function(){
		
		if(!commSign.isEmpty(AnySignProp.extraInfo.name)){
			document.getElementById('name').value = AnySignProp.extraInfo.name;
			document.getElementById("name").readOnly = true;
		}
		
		if(!commSign.isEmpty(AnySignProp.extraInfo.hp)){
			document.getElementById('phone').value = AnySignProp.extraInfo.hp;
			document.getElementById("phone").readOnly = true;
		}
		
		if(!commSign.isEmpty(AnySignProp.extraInfo.jumin1)){
			document.getElementById('birthday').value = AnySignProp.extraInfo.jumin1;
			document.getElementById("birthday").readOnly = true;
		}
		
		if(SimpleSignProp.genderFlag){
			if(!commSign.isEmpty(AnySignProp.extraInfo.jumin2)){
				document.getElementById('gender').value = AnySignProp.extraInfo.jumin2;
				document.getElementById("gender").readOnly = true;
			}
		}
	},
	
	//진행중 화면표시
	initProcessLayout : function() {
		var div = [];		
		div.push('<dl>');
		div.push('<dt>' + commSign.getLanguage('kakaopay','L00002') +'</dt>');
		if(!AnySignProp.signDevice) {
			div.push('<img src="' + SimpleSign.pcWebImg + 'sign_step_kakao.png" alt="' + commSign.getLanguage('kakaopay','L00021')  +'"></img>');
		} else {
			div.push('<img src="' + SimpleSign.mobileWebImg + 'sign_step_kakao.png" alt="' + commSign.getLanguage('kakaopay','L00021')  +'"></img>');
		}
		div.push('</dl>');
		div.push('<div class="use"><p class="use_text">' + commSign.getLanguage('kakaopay','L00004') +'</p></div>');

		document.getElementById('xTsign_kakaopay_con').classList = '';
		document.getElementById('xTsign_kakaopay_con').classList.add('yessign_con');
		document.getElementById('xTsign_kakaopay_con').classList.remove('kakaopay_con');
		document.getElementById("xTsign_kakaopay_con").innerHTML = '';
		document.getElementById("xTsign_kakaopay_con").innerHTML = div.join('');
	},
	//인증오류 화면표시
	initErrorLayout : function(sMsg) {
		var div = [];		
		div.push('<dl>');
		div.push('<dt>' + commSign.getLanguage('kakaopay','L00007') +'</dt>');
		div.push('<dd>' + commSign.getLanguage('kakaopay','L00008') + sMsg +'</dd>');
		div.push('</dl>');
		div.push('<div class="use"><p class="use_text">' + commSign.getLanguage('kakaopay','L00004') +'</p><a tabindex="3" id="xTsign_sign" class="Retext">' + commSign.getLanguage('kakaopay','L00006') +'</a></div>');

		document.getElementById("xTsign_kakaopay_con").innerHTML = '';
		document.getElementById("xTsign_kakaopay_con").innerHTML = div.join('');

		//인증요청하기 버튼 클릭시
		document.getElementById('xTsign_sign').onclick = function() { 		
			kakaoPay.initLayout();	
		};
		document.getElementById('xTsign_sign').onkeyup = function(e) { 		
			if(e.keyCode == 13) {
				kakaoPay.initLayout();
			}
		};

		if(!AnySignProp.signDevice) {
			SimpleSign.appendTabControl();
		}

	},
	//인증최종확인 화면
	initResultLayout : function(param) {
		var div = [];		
		div.push('<dl>');
		div.push('<dt>' + commSign.getLanguage('kakaopay','L00002') +'</dt>');
		if(!AnySignProp.signDevice) {
			div.push('<img src="' + SimpleSign.pcWebImg + 'sign_step_kakao.png" alt="' + commSign.getLanguage('kakaopay','L00021')  +'"></img>');
		} else {
			div.push('<img src="' + SimpleSign.mobileWebImg + 'sign_step_kakao.png" alt="' + commSign.getLanguage('kakaopay','L00021')  +'"></img>');
		}
		div.push('</dl>');
		div.push('<div class="use"><p class="use_text">' + commSign.getLanguage('kakaopay','L00004') +'</p>');
		div.push('<a tabindex="3" id="xTsign_sign" class="agBtn">' + commSign.getLanguage('kakaopay','L00006') +'</a>');
		div.push('<a tabindex="3" id="xTsign_sign_ok" class="Retext">' + commSign.getLanguage('kakaopay','L00020') +'</a>');
		div.push('</div>');

		document.getElementById("xTsign_kakaopay_con").innerHTML = '';
		document.getElementById("xTsign_kakaopay_con").innerHTML = div.join('');

		if(!AnySignProp.signDevice) {
			SimpleSign.appendTabControl();
		}

		//인증재요청하기 버튼 클릭시
		document.getElementById('xTsign_sign').onclick = function() { 		
			kakaoPay.initLayout();
		};
		document.getElementById('xTsign_sign').onkeyup = function(e) { 		
			if(e.keyCode == 13) {
				kakaoPay.initLayout();
			}
		};

		//인증확인 버튼 클릭시
		document.getElementById('xTsign_sign_ok').onclick = function() { 		
			kakaoPay.initProcessLayout();
			setTimeout(function(){
				kakaoPaySDK.doSignOk(param);
			}, 1000);
		};
		document.getElementById('xTsign_sign_ok').onkeyup = function(e) { 		
			if(e.keyCode == 13) {
				kakaoPay.initProcessLayout();
				setTimeout(function(){
					kakaoPaySDK.doSignOk(param);
				}, 1000);
			}
		};
	},
	//인증요청하기 버튼 클릭시
	doSign : function(){
		var name = document.getElementById('name');
		if(commSign.isEmpty(name.value)){
			name.focus();
			alert(commSign.getLanguage('kakaopay','L00022'));
			return;
		}
		name.value = commSign.deleteSpace(name.value);

		var birthday = document.getElementById('birthday');
		if(commSign.isEmpty(birthday.value)){
			birthday.focus();
			alert(commSign.getLanguage('kakaopay','L00023'));
			return;
		}
		
		if(birthday.value.length < 8) {
			birthday.focus();
			alert(commSign.getLanguage('kakaopay','L00028'));
			return;
		}
		
		// if(SimpleSignProp.genderFlag){
		// 	var gender =  document.getElementById('gender');
		// 	if(commSign.isEmpty(gender.value)){
		// 		gender.focus();
		// 		alert(commSign.getLanguage('kakaopay','L00028'));
		// 		return;
		// 	}
		// }

		// var birth = '';
		// birth = commSign.checkIdnToBirth(birthday, gender);

		var phone = document.getElementById('phone');
		if(commSign.isEmpty(phone.value)){
			phone.focus();
			alert(commSign.getLanguage('kakaopay','L00024'));
			return;
		}
		if(phone.value.length < 10) {
			phone.focus();
			alert(commSign.getLanguage('kakaopay','L00029'));
			return;
		}

		var B1 = commSign.getRadioBoxValue('B1');
		if(commSign.isEmpty(B1)){
			alert(commSign.getLanguage('kakaopay','L00026'));
			return;
		}

		var B2 = commSign.getRadioBoxValue('B2');
		if(commSign.isEmpty(B2)){
			alert(commSign.getLanguage('kakaopay','L00027'));
			return;
		}
		
		kakaoPay.initProcessLayout();
		setTimeout(function(){
			if(SimpleSignProp.genderFlag){
				kakaoPaySDK.doSign(name.value,birthday.value,phone.value,gender.value);
			}else {
				kakaoPaySDK.doSign(name.value,birthday.value,phone.value,'');
			}
		}, 1000);
		
		//최근정보 쿠키저장
		SimpleSignProp.setLastSign('kakaopay');
	},
};


//SDK
var kakaoPaySDK = {

	//서명요청
	s310Url : AnySignProp.aSimplePath + '/SimpleSign/module/kakaoPaySignReq.jsp',
	//서명확인
	verifyUrl : AnySignProp.aSimplePath + '/SimpleSign/module/kakaoPaySignRes.jsp',

	// 전자서명 요청
	doSign: function (aName, aBirth, aPhone, aGender) {
		var param = {
			serviceKey: AnySignProp.restApiInfo.serviceCode,
			serviceProvider: SimpleSign.kakaoPayInfo.serviceVersion, csPhoneNo: SimpleSign.kakaoPayInfo.callCenterNo,
			userName: aName, birthday: aBirth, phoneNo: aPhone, gender: aGender,
			title: SimpleSign.kakaoPayInfo.signTitle, plain: SimpleSign.aPlain
		};
		if(param.plain.length > 500) {
			kakaoPay.initErrorLayout(commSign.getLanguage('kakaopay', 'L00030'));
			return;
		}
		commSign.ajaxPost("sign", kakaoPaySDK.s310Url, param, function (res) {
			var resData = AnySignProp.aUseRestApi ? res.item[0] : res;
			if (!commSign.isEmpty(resData.data)) {
				if (resData.data.result == 'Y') {
					param.body = resData.data;
					param.envUserInfo = resData.envUserInfo;
					kakaoPay.initResultLayout(param);
				} else {
					kakaoPay.initErrorLayout(commSign.getLanguage('kakaopay', 'L00007'));
				}
			} else {
				kakaoPay.initErrorLayout(resData.errmsg);
			}
		}, function (res) {
			var errMsg;
			if(res.detailMessage) errMsg = res.detailMessage;
			else errMsg = res;
			console.log(errMsg);
			kakaoPay.initErrorLayout(commSign.getLanguage('kakaopay', 'L00007'));
		});

	},
	// 전자서명 결과 조회
	doSignOk: function (signData) {
		var param = {
			serviceKey: AnySignProp.restApiInfo.serviceCode,
			serviceProvider: SimpleSign.kakaoPayInfo.serviceVersion, txId: signData.body.tx_id, envUserInfo: signData.envUserInfo,
			userName: signData.userName, birthday: signData.birthday, phoneNo: signData.phoneNo
		};
		commSign.ajaxPost("verify", kakaoPaySDK.verifyUrl, param, function (res) {
			var resData = AnySignProp.aUseRestApi ? res.item[0] : res;
			if (commSign.isEmpty(resData.errcode)) {
				var tmpOutput = "";
				tmpOutput = commSign.base64UrlToBase64(resData.signed_data);
				kakaoPaySDK.doFin(tmpOutput, resData.envCi);
			} else {
				alert(resData.errmsg);
				kakaoPay.initResultLayout(signData);
			}
		}, function (res) {
			var errMsg;
			if(res.detailMessage) errMsg = res.detailMessage;
			else errMsg = res;
			console.log(errMsg);
			kakaoPay.initErrorLayout(commSign.getLanguage('kakaopay', 'L00007'));
		});
	},
	// 옵션에 대한 처리, 서명 값 및 EnvCI 값에 구분자 처리
	doFin: function (aCmsSignedData, aEnvCi) {
		var signFuncName = SimpleSign.aFuncName;
		var signOption = SimpleSign.aOption;
		var outputHexFlag = true;
		var mediaID = SimpleSign.kakaoPayInfo.locationId;
		var tmpOutput = aCmsSignedData;

		if (signOption & 256)
			outputHexFlag = false;

		if (signFuncName == "SignDataWithVID" || signFuncName == "SignDataWithVID_Serial") {
			AnySign.mSimpleAuthEnvCi = aEnvCi + ":4";
		}

		if (outputHexFlag == true)
			tmpOutput = commSign.base64ToHex(tmpOutput);

		commSign.SetLastLocation(mediaID);
		SimpleSign.doSuccess(tmpOutput + ":4");
	},
};
