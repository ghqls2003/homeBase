var shinhanSign = {

	//초기화 여부(최초 1회만 실행되어야할 기능)
	bInit : false,

	//SHINHAN 인증서 선택시(시적점)
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
		div.push('<div id="shinhan_light" class="white_content_shinhan">');
		div.push(commSign.getLanguage('shinhansign','L00100'));
		div.push('<div class="popBomt">');
		if(!AnySignProp.signDevice){
			div.push('<span><a href="javascript:void(0)" tabindex="4" onclick = "SimpleSign.appendTabControl();document.getElementById(\'shinhan_light\').style.display=\'none\';document.getElementById(\'shinhan_fade\').style.display=\'none\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl();document.getElementById(\'shinhan_light\').style.display=\'none\';document.getElementById(\'shinhan_fade\').style.display=\'none\' }">' + commSign.getLanguage('shinhansign','L00009')  +'</a></span>');
		} else {
			div.push('<span><a href="javascript:void(0)" onclick = "document.getElementById(\'shinhan_light\').style.display=\'none\';document.getElementById(\'shinhan_fade\').style.display=\'none\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'block\'">' + commSign.getLanguage('shinhansign','L00009')  +'</a></span>');
		}
		div.push('</div>');		
		div.push('</div>');
		div.push('<div id="shinhan_fade" class="black_overlay_shinhan"></div>');
		
		div.push('<!--팝업 메뉴 영역 : 전문보기2 -->');
		div.push('<div id="shinhan_light2" class="white_content_shinhan">');
		div.push(commSign.getLanguage('shinhansign','L00101'));
		div.push('<div class="popBomt">');
		if(!AnySignProp.signDevice){
			div.push('<span><a href="javascript:void(0)" tabindex="4" onclick = "SimpleSign.appendTabControl();document.getElementById(\'shinhan_light2\').style.display=\'none\';document.getElementById(\'shinhan_fade2\').style.display=\'none\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl();document.getElementById(\'shinhan_light2\').style.display=\'none\';document.getElementById(\'shinhan_fade2\').style.display=\'none\' }">' + commSign.getLanguage('shinhansign','L00009')  +'</a></span>');
		} else {
			div.push('<span><a href="javascript:void(0)" onclick = "document.getElementById(\'shinhan_light2\').style.display=\'none\';document.getElementById(\'shinhan_fade2\').style.display=\'none\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'block\'">' + commSign.getLanguage('shinhansign','L00009')  +'</a></span>');
		}
		div.push('</div>');		
		div.push('</div>');
		div.push('<div id="shinhan_fade2" class="black_overlay_shinhan"></div>');

		div.push('<ul>');
		div.push('<li tabindex="3" id="xTsign_icon_top" class="xTsignli iconTop"><img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/icon_shinhansign.png" alt=""><a class="Atit">' + commSign.getLanguage('shinhansign','L00001')  +'</a></li>');
		div.push('</ul>');
		div.push('<div id="xTsign_shinhansign_con" class="shinhansign_con" tabindex="3">');
			div.push('<p id="xTsign_title">' + commSign.getLanguage('shinhansign','L00002')  +'</p>');
			div.push('<dl>');
				div.push('<dt><label for="name">' + commSign.getLanguage('shinhansign','L00010')  +'</label></dt>');
				div.push('<dd><input type="text" id="name" tabindex="3" title="' + commSign.getLanguage('shinhansign','L00010')  +'"></dd>');
			div.push('</dl>');
			div.push('<dl>');
				div.push('<dt><label for="birthday">' + commSign.getLanguage('shinhansign','L00011')  +'</label></dt>');
				div.push('<dd>');
				div.push('<input tabindex="3" type="number" pattern="[0-9]*" id="birthday" title="' + commSign.getLanguage('shinhansign','L00011')  +'" placeholder="' + commSign.getLanguage('shinhansign','L00012')  +'" maxlength="8" onkeyup="return commSign.checkNumber(event);">');
				div.push('</dd>');
			div.push('</dl>');
			div.push('<dl>');
				div.push('<dt><label for="phone">' + commSign.getLanguage('shinhansign','L00015')  +'</label></dt>');
				div.push('<dd><input tabindex="3" type="number" pattern="[0-9]*" id="phone" title="' + commSign.getLanguage('shinhansign','L00015')  +'" placeholder="' + commSign.getLanguage('shinhansign','L00016')  +'" maxlength="11" onkeyup="return commSign.checkNumber(event);"></dd>');
			div.push('</dl>');

			div.push('<div class="consent">');
				div.push('<div class="agree">');
				div.push('<table>');				
				div.push('<tr>');
				div.push('<td>');
				if(!AnySignProp.signDevice){
					div.push('<input tabindex="3" type="radio" id="B3" name="B3" value="B3" class="viewInp" onclick="commSign.agreeCheckBox();"><label for="B3" onclick="commSign.agreeCheckBox();">' + commSign.getLanguage('shinhansign','L00038')  +'</label>');
					div.push('</td>');
					div.push('</tr>');
					div.push('<tr>');
					div.push('<td>');
					div.push('<input tabindex="3" type="checkbox" id="B1" name="B1" value="B1" class="viewInp"><label for="B1">' + commSign.getLanguage('shinhansign','L00017')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "SimpleSign.appendTabControl(document.getElementById(\'shinhan_light\'));document.getElementById(\'shinhan_light\').style.display=\'block\';document.getElementById(\'shinhan_fade\').style.display=\'block\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl(document.getElementById(\'shinhan_light\'));document.getElementById(\'shinhan_light\').style.display=\'block\';document.getElementById(\'shinhan_fade\').style.display=\'block\' }">' + commSign.getLanguage('shinhansign','L00019')  +'</a>');
					div.push('<input tabindex="3" type="checkbox" id="B2" name="B2" value="B2" class="viewInp"><label for="B2">' + commSign.getLanguage('shinhansign','L00018')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "SimpleSign.appendTabControl(document.getElementById(\'shinhan_light2\'));document.getElementById(\'shinhan_light2\').style.display=\'block\';document.getElementById(\'shinhan_fade2\').style.display=\'block\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl(document.getElementById(\'shinhan_light2\'));document.getElementById(\'shinhan_light2\').style.display=\'block\';document.getElementById(\'shinhan_fade2\').style.display=\'block\' }">' + commSign.getLanguage('shinhansign','L00019')  +'</a>');
					div.push('</td>');
				} else {
					div.push('<input tabindex="3" type="radio" id="B3" name="B3" value="B3" class="viewInp" onclick="commSign.agreeCheckBox();"><label for="B3" onclick="commSign.agreeCheckBox();">' + commSign.getLanguage('shinhansign','L00038')  +'</label>');
					div.push('</td>');
					div.push('</tr>');
					div.push('<tr>');
					div.push('<td>');
					div.push('<input type="checkbox" id="B1" name="B1" value="B1" class="viewInp"><label for="B1">' + commSign.getLanguage('shinhansign','L00017')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "document.getElementById(\'shinhan_light\').style.display=\'block\';document.getElementById(\'shinhan_fade\').style.display=\'block\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'none\'">' + commSign.getLanguage('shinhansign','L00019')  +'</a>');
					div.push('</br>');
					div.push('<input type="checkbox" id="B2" name="B2" value="B2" class="viewInp"><label for="B2">' + commSign.getLanguage('shinhansign','L00018')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "document.getElementById(\'shinhan_light2\').style.display=\'block\';document.getElementById(\'shinhan_fade2\').style.display=\'block\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'none\'">' + commSign.getLanguage('shinhansign','L00019')  +'</a>');
					div.push('</td>');
				}
				div.push('</tr>');
				div.push('</table>');
				div.push('</div>');
				
				div.push('<div class="use"><p class="use_text">' + commSign.getLanguage('shinhansign','L00004') +'</p><a id="xTsign_sign" tabindex="3" class="Retext">' + commSign.getLanguage('shinhansign','L00005') +'</a></div>');
		div.push('</div>');

		//화면표시
		SimpleSign.addSignContent(div.join(''),function(){
			
			//기본값 설정확인
			shinhanSign.initExtraInfo();
			
			//간편인증 목록 표시
			document.getElementById('xTsign_icon_top').onclick = function() { 
				if(!AnySignProp.signDevice) {
					SimpleSign.addSignList();
				} else {
					SimpleSign.addMSignList();
				}
			};
			document.getElementById('xTsign_icon_top').onkeyup = function(e) {
				if(e.keyCode == 13) {
					if(!AnySignProp.signDevice) {
						SimpleSign.addSignList();
					} else {
						SimpleSign.addMSignList();
					}
				}
			};

			//인증요청하기 버튼 클릭시
			document.getElementById('xTsign_sign').onclick = function() { 		
				shinhanSign.doSign();	
			};
			document.getElementById('xTsign_sign').onkeyup = function(e) { 		
				if(e.keyCode == 13) {
					shinhanSign.doSign();
				}
			};
			
			//tabIndex 
			document.getElementById('xTsign_shinhansign_con').onfocus = function() { 		
				//document.getElementById('name').focus();
			};
			//tabIndex 
			document.getElementById('xTsign_title').onfocus = function() { 		
				 document.getElementById('name').focus();
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
		div.push('<dt>' + commSign.getLanguage('shinhansign','L00002') +'</dt>');
		if(!AnySignProp.signDevice) {
			div.push('<img src="' + SimpleSign.pcWebImg + 'sign_step_shinhan.png" alt="' + commSign.getLanguage('shinhansign','L00021')  +'"></img>');
		} else {
			div.push('<img src="' + SimpleSign.mobileWebImg + 'sign_step_shinhan.png" alt="' + commSign.getLanguage('shinhansign','L00021')  +'"></img>');
		}
		div.push('</dl>');
		div.push('<div class="use"><p class="use_text">' + commSign.getLanguage('shinhansign','L00004') +'</p></div>');

		document.getElementById('xTsign_shinhansign_con').classList = '';
		document.getElementById('xTsign_shinhansign_con').classList.add('yessign_con');
		document.getElementById('xTsign_shinhansign_con').classList.remove('shinhansign_con');
		document.getElementById("xTsign_shinhansign_con").innerHTML = '';
		document.getElementById("xTsign_shinhansign_con").innerHTML = div.join('');
	},
	//인증오류 화면표시
	initErrorLayout : function(sMsg) {
		var div = [];		
		div.push('<dl>');
		div.push('<dt>' + commSign.getLanguage('shinhansign','L00007') +'</dt>');
		div.push('<dd>' + commSign.getLanguage('shinhansign','L00008') + sMsg +'</dd>');
		div.push('</dl>');
		div.push('<div class="use"><p class="use_text">' + commSign.getLanguage('shinhansign','L00004') +'</p><a tabindex="3" id="xTsign_sign" class="Retext">' + commSign.getLanguage('shinhansign','L00006') +'</a></div>');

		document.getElementById("xTsign_shinhansign_con").innerHTML = '';
		document.getElementById("xTsign_shinhansign_con").innerHTML = div.join('');

		//인증요청하기 버튼 클릭시
		document.getElementById('xTsign_sign').onclick = function() { 		
			shinhanSign.initLayout();	
		};
		document.getElementById('xTsign_sign').onkeyup = function(e) { 		
			if(e.keyCode == 13) {
				shinhanSign.initLayout();
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
		div.push('<dt>' + commSign.getLanguage('shinhansign','L00002') +'</dt>');
		if(!AnySignProp.signDevice) {
			div.push('<img src="' + SimpleSign.pcWebImg + 'sign_step_shinhan.png" alt="' + commSign.getLanguage('shinhansign','L00021')  +'"></img>');
		} else {
			div.push('<img src="' + SimpleSign.mobileWebImg + 'sign_step_shinhan.png" alt="' + commSign.getLanguage('shinhansign','L00021')  +'"></img>');
		}
		div.push('</dl>');
		div.push('<div class="use"><p class="use_text">' + commSign.getLanguage('shinhansign','L00004') +'</p>');
		div.push('<a tabindex="3" id="xTsign_sign" class="agBtn">' + commSign.getLanguage('shinhansign','L00006') +'</a>');
		div.push('<a tabindex="3" id="xTsign_sign_ok" class="Retext">' + commSign.getLanguage('shinhansign','L00020') +'</a>');
		div.push('</div>');

		document.getElementById("xTsign_shinhansign_con").innerHTML = '';
		document.getElementById("xTsign_shinhansign_con").innerHTML = div.join('');

		if(!AnySignProp.signDevice) {
			SimpleSign.appendTabControl();
		}

		//인증재요청하기 버튼 클릭시
		document.getElementById('xTsign_sign').onclick = function() { 		
			shinhanSign.initLayout();
		};
		document.getElementById('xTsign_sign').onkeyup = function(e) { 		
			if(e.keyCode == 13) {
				shinhanSign.initLayout();
			}
		};

		//인증확인 버튼 클릭시
		document.getElementById('xTsign_sign_ok').onclick = function() { 		
			shinhanSign.initProcessLayout();
			setTimeout(function(){
				shinhanSignSDK.doSignOk(param);
			}, 1000);
		};
		document.getElementById('xTsign_sign_ok').onkeyup = function(e) { 		
			if(e.keyCode == 13) {
				shinhanSign.initProcessLayout();
				setTimeout(function(){
					shinhanSignSDK.doSignOk(param);
				}, 1000);
			}
		};
	},
	//인증요청하기 버튼 클릭시
	doSign : function(){
		var name = document.getElementById('name');
		if(commSign.isEmpty(name.value)){
			name.focus();
			alert(commSign.getLanguage('shinhansign','L00022'));
			return;
		}
		
		var birthday = document.getElementById('birthday');
		if(commSign.isEmpty(birthday.value)){
			birthday.focus();
			alert(commSign.getLanguage('shinhansign','L00023'));
			return;
		}
		if(birthday.value.length < 6) {
			birthday.focus();
			alert(commSign.getLanguage('shinhansign','L00028'));
			return;
		}
		
		// if(SimpleSignProp.genderFlag){
		// 	var gender =  document.getElementById('gender');
		// 	if(commSign.isEmpty(gender.value)){
		// 		gender.focus();
		// 		alert(commSign.getLanguage('shinhansign','L00028'));
		// 		return;
		// 	}
		// }

		// var birth = '';
		// birth = commSign.checkIdnToBirth(birthday, gender);
		
		var phone = document.getElementById('phone');
		if(commSign.isEmpty(phone.value)){
			phone.focus();
			alert(commSign.getLanguage('shinhansign','L00024'));
			return;
		}
		if(phone.value.length < 10) {
			phone.focus();
			alert(commSign.getLanguage('shinhansign','L00029'));
			return;
		}
		
		var B1 = commSign.getRadioBoxValue('B1');
		if(commSign.isEmpty(B1)){
			alert(commSign.getLanguage('shinhansign','L00026'));
			return;
		}

		var B2 = commSign.getRadioBoxValue('B2');
		if(commSign.isEmpty(B2)){
			alert(commSign.getLanguage('shinhansign','L00027'));
			return;
		}

		SimpleSign.shinhanInfo.requestDate = commSign.getFormatFullDate();
		SimpleSign.shinhanInfo.randomNum = commSign.generateRandom();
		
		shinhanSign.initProcessLayout();
		setTimeout(function(){
			if(SimpleSignProp.genderFlag){
				shinhanSignSDK.doSign(name.value,birthday.value,phone.value,gender.value);
			} else {
				shinhanSignSDK.doSign(name.value,birthday.value,phone.value,'');
			}
		}, 1000);
		
		//최근정보 쿠키저장
		SimpleSignProp.setLastSign('shinhansign');
	},
};


//SDK
var shinhanSignSDK = {
	//서명요청
	noticeUrl : AnySignProp.aSimplePath + '/SimpleSign/module/shinhanSignReq.jsp',
	//서명확인
	resultUrl : AnySignProp.aSimplePath + '/SimpleSign/module/shinhanSignRes.jsp',

	//인증요청
	doSign: function (aName, aBirth, aPhone, aGender) {
		var param = {
			serviceKey: AnySignProp.restApiInfo.serviceCode, serviceProvider: SimpleSign.shinhanInfo.serviceVersion,
			userName: aName, birthday: aBirth, phoneNo: aPhone, gender: aGender,
			requestDate: SimpleSign.shinhanInfo.requestDate, randomNum : SimpleSign.shinhanInfo.randomNum,
			consentType: SimpleSign.shinhanInfo.consentType, consent: SimpleSign.aPlain,
			deviceCode: SimpleSign.shinhanInfo.deviceCode, deviceBrowser: SimpleSign.shinhanInfo.deviceBrowser
		};

		if(commSign.isMobilePlatform()) param.deviceCode = "MO";

		if(param.consent.length > 7000) {
			shinhanSign.initErrorLayout(commSign.getLanguage('shinhansign', 'L00030'));
			return;
		}
		commSign.ajaxPost("sign", shinhanSignSDK.noticeUrl, param, function (res) {
			var data = AnySignProp.aUseRestApi ? res.item[0] : res;
			if (data.rtnCode == "00000") {
				param.body = data;
				shinhanSign.initResultLayout(param);
			} else {
				var msg = data.rtnCode + ' : ' + data.rtnMsgSub;
				shinhanSign.initErrorLayout(msg);
			}
		}, function (res) {
			var errMsg;
			if(res.responseData) errMsg = res.responseData;
			console.log(res.responseCode + " : " + errMsg);
			shinhanSign.initErrorLayout(commSign.getLanguage('shinhansign', 'L00007'));
		});
	},
	//인증확인요청
	doSignOk: function (signData) {
		var param = {
			serviceKey: AnySignProp.restApiInfo.serviceCode, serviceProvider: SimpleSign.shinhanInfo.serviceVersion,
			requestDate: SimpleSign.shinhanInfo.requestDate, randomNum : SimpleSign.shinhanInfo.randomNum,
			certTxId: signData.body.cert_tx_id, envUserInfo: signData.body.envUserInfo
		};
		commSign.ajaxPost("verify", shinhanSignSDK.resultUrl, param, function (res) {
			var data = AnySignProp.aUseRestApi ? res.item[0] : res;
			if (data.rtnCode == "00000") {
				shinhanSignSDK.doFin(data.cmsSignedData, data.envCi);
			}
			else if (data.rtnCode == "RE2030") {
				alert(commSign.getLanguage('shinhansign', 'SHINHAN02'));
				shinhanSign.initResultLayout(signData);
			}
			else {
				var msg = data.rtnCode + ' : ' + data.rtnMsgSub;
				shinhanSign.initErrorLayout(msg);
			}
		}, function (res) {
			var errMsg;
			if(res.responseData) errMsg = res.responseData;
			console.log(res.responseCode + " : " + errMsg);
			shinhanSign.initErrorLayout(commSign.getLanguage('shinhansign', 'L00007'));
		});
	},
	// 옵션에 대한 처리, 서명 값 및 EnvCI 값에 구분자 처리
	doFin: function (aCmsSignedData, aEnvCi) {
		var signFuncName = SimpleSign.aFuncName;
		var signOption = SimpleSign.aOption;
		var outputHexFlag = true;
		var mediaID = SimpleSign.shinhanInfo.locationId;
		var tmpOutput = aCmsSignedData;

		if (signOption & 256)
			outputHexFlag = false;

		if (signFuncName == "SignDataWithVID" || signFuncName == "SignDataWithVID_Serial") {
			AnySign.mSimpleAuthEnvCi = aEnvCi + ":7";
		}

		if (outputHexFlag == false)
			tmpOutput = commSign.hexToBase64(tmpOutput);

		commSign.SetLastLocation(mediaID);
		this.doClear();
		SimpleSign.doSuccess(tmpOutput + ":7");
	},
	// 값 초기화
	doClear: function () {
		SimpleSign.shinhanInfo.requestDate = "";
		SimpleSign.shinhanInfo.randomNum = "";
	}
};
