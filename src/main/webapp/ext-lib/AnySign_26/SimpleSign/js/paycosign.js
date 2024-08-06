var paycoSign = {

	//초기화 여부(최초 1회만 실행되어야할 기능)
	bInit : false,

	//PAYCO 인증서 선택시(시적점)
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
		div.push('<div id="payco_light" class="white_content_payco">');
		div.push(commSign.getLanguage('paycosign','L00100'));
		div.push('<div class="popBomt">');
		if(!AnySignProp.signDevice){
			div.push('<span><a href="javascript:void(0)" tabindex="4" onclick = "SimpleSign.appendTabControl();document.getElementById(\'payco_light\').style.display=\'none\';document.getElementById(\'payco_fade\').style.display=\'none\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl();document.getElementById(\'payco_light\').style.display=\'none\';document.getElementById(\'payco_fade\').style.display=\'none\'}">' + commSign.getLanguage('paycosign','L00009')  +'</a></span>');
		} else {
			div.push('<span><a href="javascript:void(0)" onclick = "document.getElementById(\'payco_light\').style.display=\'none\';document.getElementById(\'payco_fade\').style.display=\'none\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'block\'">' + commSign.getLanguage('paycosign','L00009')  +'</a></span>');
		}
		
		div.push('</div>');		
		div.push('</div>');
		div.push('<div id="payco_fade" class="black_overlay_payco"></div>');
		
		div.push('<!--팝업 메뉴 영역 : 전문보기2 -->');
		div.push('<div id="payco_light2" class="white_content_payco">');
		div.push(commSign.getLanguage('paycosign','L00101'));
		div.push('<div class="popBomt">');
		if(!AnySignProp.signDevice){
			div.push('<span><a href="javascript:void(0)" tabindex="4" onclick = "SimpleSign.appendTabControl();document.getElementById(\'payco_light2\').style.display=\'none\';document.getElementById(\'payco_fade2\').style.display=\'none\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl();document.getElementById(\'payco_light2\').style.display=\'none\';document.getElementById(\'payco_fade2\').style.display=\'none\'}">' + commSign.getLanguage('paycosign','L00009')  +'</a></span>');
		} else {
			div.push('<span><a href="javascript:void(0)" onclick = "document.getElementById(\'payco_light2\').style.display=\'none\';document.getElementById(\'payco_fade2\').style.display=\'none\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'block\'">' + commSign.getLanguage('paycosign','L00009')  +'</a></span>');
		}
		div.push('</div>');		
		div.push('</div>');
		div.push('<div id="payco_fade2" class="black_overlay_payco"></div>');

		div.push('<ul>');
		div.push('<li tabindex="3" id="xTsign_icon_top" class="xTsignli iconTop"><img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/icon_paycosign.png" alt=""><a class="Atit">' + commSign.getLanguage('paycosign','L00001')  +'</a></li>');
		div.push('</ul>');
		div.push('<div id="xTsign_paycosign_con" class="paycosign_con" tabindex="3">');
			div.push('<p id="xTsign_title">' + commSign.getLanguage('paycosign','L00002')  +'</p>');
			div.push('<dl>');
				div.push('<dt><label for="name">' + commSign.getLanguage('paycosign','L00010')  +'</label></dt>');
				div.push('<dd><input type="text" id="name" tabindex="3" title="' + commSign.getLanguage('paycosign','L00010')  +'"></dd>');
			div.push('</dl>');
			div.push('<dl>');
				div.push('<dt><label for="birthday">' + commSign.getLanguage('paycosign','L00011')  +'</label></dt>');
				div.push('<dd>');
				div.push('<input tabindex="3" type="number" pattern="[0-9]*" id="birthday" title="' + commSign.getLanguage('paycosign','L00011')  +'" placeholder="' + commSign.getLanguage('paycosign','L00012')  +'" maxlength="8" onkeyup="return commSign.checkNumber(event);">');
				div.push('</dd>');
			div.push('</dl>');
			div.push('<dl>');
				div.push('<dt><label for="phone">' + commSign.getLanguage('paycosign','L00015')  +'</label></dt>');
				div.push('<dd><input tabindex="3" type="number" pattern="[0-9]*" id="phone" title="' + commSign.getLanguage('paycosign','L00015')  +'" placeholder="' + commSign.getLanguage('paycosign','L00016')  +'" maxlength="11" onkeyup="return commSign.checkNumber(event);"></dd>');
			div.push('</dl>');

			div.push('<div class="consent">');
				div.push('<div class="agree">');
				div.push('<table>');				
				div.push('<tr>');
				div.push('<td>');
				if(!AnySignProp.signDevice){
					div.push('<input tabindex="3" type="radio" id="B3" name="B3" value="B3" class="viewInp" onclick="commSign.agreeCheckBox();"><label for="B3" onclick="commSign.agreeCheckBox();">' + commSign.getLanguage('paycosign','L00038')  +'</label>');
					div.push('</td>');
					div.push('</tr>');
					div.push('<tr>');
					div.push('<td>');
					div.push('<input tabindex="3" type="checkbox" id="B1" name="B1" value="B1" class="viewInp"><label for="B1">' + commSign.getLanguage('paycosign','L00017')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "SimpleSign.appendTabControl(document.getElementById(\'payco_light\'));document.getElementById(\'payco_light\').style.display=\'block\';document.getElementById(\'payco_fade\').style.display=\'block\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl(document.getElementById(\'payco_light\'));document.getElementById(\'payco_light\').style.display=\'block\';document.getElementById(\'payco_fade\').style.display=\'block\' }">' + commSign.getLanguage('paycosign','L00019')  +'</a>');
					div.push('<input tabindex="3" type="checkbox" id="B2" name="B2" value="B2" class="viewInp"><label for="B2">' + commSign.getLanguage('paycosign','L00018')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "SimpleSign.appendTabControl(document.getElementById(\'payco_light2\'));document.getElementById(\'payco_light2\').style.display=\'block\';document.getElementById(\'payco_fade2\').style.display=\'block\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl(document.getElementById(\'payco_light2\'));document.getElementById(\'payco_light2\').style.display=\'block\';document.getElementById(\'payco_fade2\').style.display=\'block\' }">' + commSign.getLanguage('paycosign','L00019')  +'</a>');
					div.push('</td>');
				} else {
					div.push('<input tabindex="3" type="radio" id="B3" name="B3" value="B3" class="viewInp" onclick="commSign.agreeCheckBox();"><label for="B3" onclick="commSign.agreeCheckBox();">' + commSign.getLanguage('paycosign','L00038')  +'</label>');
					div.push('</td>');
					div.push('</tr>');
					div.push('<tr>');
					div.push('<td>');
					div.push('<input type="checkbox" id="B1" name="B1" value="B1" class="viewInp"><label for="B1">' + commSign.getLanguage('paycosign','L00017')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "document.getElementById(\'payco_light\').style.display=\'block\';document.getElementById(\'payco_fade\').style.display=\'block\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'none\'">' + commSign.getLanguage('paycosign','L00019')  +'</a>');
					div.push('</br>');
					div.push('<input type="checkbox" id="B2" name="B2" value="B2" class="viewInp"><label for="B2">' + commSign.getLanguage('paycosign','L00018')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "document.getElementById(\'payco_light2\').style.display=\'block\';document.getElementById(\'payco_fade2\').style.display=\'block\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'none\'">' + commSign.getLanguage('paycosign','L00019')  +'</a>');
					div.push('</td>');
				}
				div.push('</tr>');
				div.push('</table>');
				div.push('</div>');
				
				div.push('<div class="use"><p class="use_text">' + commSign.getLanguage('paycosign','L00004') +'</p><a id="xTsign_sign" tabindex="3" class="Retext">' + commSign.getLanguage('paycosign','L00005') +'</a></div>');				div.push('</div>');
		div.push('</div>');

		//화면표시
		SimpleSign.addSignContent(div.join(''),function(){
			
			//기본값 설정확인
			paycoSign.initExtraInfo();
			
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
				paycoSign.doSign();	
			};
			document.getElementById('xTsign_sign').onkeyup = function(e) { 				  
				if(e.keyCode == 13) {
					paycoSign.doSign();
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
		div.push('<dt>' + commSign.getLanguage('paycosign','L00002') +'</dt>');
		if(!AnySignProp.signDevice) {
			div.push('<img src="' + SimpleSign.pcWebImg + 'sign_step_payco.png" alt="' + commSign.getLanguage('paycosign','L00021')  +'"></img>');
		} else {
			div.push('<img src="' + SimpleSign.mobileWebImg + 'sign_step_payco.png" alt="' + commSign.getLanguage('paycosign','L00021')  +'"></img>');
		}
		div.push('</dl>');
		div.push('<div class="use"><p class="use_text">' + commSign.getLanguage('paycosign','L00004') +'</p></div>');

		document.getElementById('xTsign_paycosign_con').classList = '';
		document.getElementById('xTsign_paycosign_con').classList.add('yessign_con');
		document.getElementById('xTsign_paycosign_con').classList.remove('paycosign_con');
		document.getElementById("xTsign_paycosign_con").innerHTML = '';
		document.getElementById("xTsign_paycosign_con").innerHTML = div.join('');
	},
	//인증오류 화면표시
	initErrorLayout : function(sMsg) {
		var div = [];		
		div.push('<dl>');
		div.push('<dt>' + commSign.getLanguage('paycosign','L00007') +'</dt>');
		div.push('<dd>' + commSign.getLanguage('paycosign','L00008') + sMsg +'</dd>');
		div.push('</dl>');
		div.push('<div class="use"><p class="use_text">' + commSign.getLanguage('paycosign','L00004') +'</p><a tabindex="3" id="xTsign_sign" class="Retext">' + commSign.getLanguage('paycosign','L00006') +'</a></div>');

		document.getElementById("xTsign_paycosign_con").innerHTML = '';
		document.getElementById("xTsign_paycosign_con").innerHTML = div.join('');

		//인증요청하기 버튼 클릭시
		document.getElementById('xTsign_sign').onclick = function() { 		
			paycoSign.initLayout();	
		};
		document.getElementById('xTsign_sign').onkeyup = function(e) { 		
			if(e.keyCode == 13) {
				paycoSign.initLayout();
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
		div.push('<dt>' + commSign.getLanguage('paycosign','L00002') +'</dt>');
		if(!AnySignProp.signDevice) {
			div.push('<img src="' + SimpleSign.pcWebImg + 'sign_step_payco.png" alt="' + commSign.getLanguage('paycosign','L00021')  +'"></img>');
		} else {
			div.push('<img src="' + SimpleSign.mobileWebImg + 'sign_step_payco.png" alt="' + commSign.getLanguage('paycosign','L00021')  +'"></img>');
		}
		div.push('</dl>');
		div.push('<div class="use"><p class="use_text">' + commSign.getLanguage('paycosign','L00004') +'</p>');
		div.push('<a tabindex="3" id="xTsign_sign" class="agBtn">' + commSign.getLanguage('paycosign','L00006') +'</a>');
		div.push('<a tabindex="3" id="xTsign_sign_ok" class="Retext">' + commSign.getLanguage('paycosign','L00020') +'</a>');
		div.push('</div>');

		document.getElementById("xTsign_paycosign_con").innerHTML = '';
		document.getElementById("xTsign_paycosign_con").innerHTML = div.join('');

		if(!AnySignProp.signDevice) {
			SimpleSign.appendTabControl();
		}

		//인증재요청하기 버튼 클릭시
		document.getElementById('xTsign_sign').onclick = function() { 		
			paycoSign.initLayout();
		};
		document.getElementById('xTsign_sign').onkeyup = function(e) { 		
			if(e.keyCode == 13) {
				paycoSign.initLayout();
			}
		};

		//인증확인 버튼 클릭시
		document.getElementById('xTsign_sign_ok').onclick = function() { 		
			paycoSign.initProcessLayout();
			setTimeout(function(){
				paycoSignSDK.doSignOk(param);
			}, 1000);
		};
		document.getElementById('xTsign_sign_ok').onkeyup = function(e) { 		
			if(e.keyCode == 13) {
				paycoSign.initProcessLayout();
				setTimeout(function(){
					paycoSignSDK.doSignOk(param);
				}, 1000);
			}
		};
	},
	//인증요청하기 버튼 클릭시
	doSign : function(){
		var name = document.getElementById('name');
		if(commSign.isEmpty(name.value)){
			name.focus();
			alert(commSign.getLanguage('paycosign','L00022'));
			return;
		}
		name.value = commSign.deleteSpace(name.value);

		var birthday = document.getElementById('birthday');
		if(commSign.isEmpty(birthday.value)){
			birthday.focus();
			alert(commSign.getLanguage('paycosign','L00023'));
			return;
		}
		
		if(birthday.value.length < 8) {
			birthday.focus();
			alert(commSign.getLanguage('paycosign','L00028'));
			return;
		}
		
		// if(SimpleSignProp.genderFlag){
		// 	var gender =  document.getElementById('gender');
		// 	if(commSign.isEmpty(gender.value)){
		// 		gender.focus();
		// 		alert(commSign.getLanguage('paycosign','L00028'));
		// 		return;
		// 	}
		// }

		// var birth = '';
		// birth = commSign.checkIdnToBirth(birthday, gender);

		var phone = document.getElementById('phone');
		if(commSign.isEmpty(phone.value)){
			phone.focus();
			alert(commSign.getLanguage('paycosign','L00024'));
			return;
		}
		if(phone.value.length < 10) {
			phone.focus();
			alert(commSign.getLanguage('paycosign','L00029'));
			return;
		}

		var B1 = commSign.getRadioBoxValue('B1');
		if(commSign.isEmpty(B1)){
			alert(commSign.getLanguage('paycosign','L00026'));
			return;
		}

		var B2 = commSign.getRadioBoxValue('B2');
		if(commSign.isEmpty(B2)){
			alert(commSign.getLanguage('paycosign','L00027'));
			return;
		}

		paycoSign.initProcessLayout();
		setTimeout(function(){
			if(SimpleSignProp.genderFlag){
				paycoSignSDK.doSign(name.value,birthday.value,phone.value,gender.value);
			} else {
				paycoSignSDK.doSign(name.value,birthday.value,phone.value,'');
			}
		}, 1000);
		
		//최근정보 쿠키저장
		SimpleSignProp.setLastSign('paycosign');
	},
};


//SDK
var paycoSignSDK = {
	//서명요청
	singUrl : AnySignProp.aSimplePath + '/SimpleSign/module/paycoSignReq.jsp',
	//서명확인
	singFindUrl : AnySignProp.aSimplePath + '/SimpleSign/module/paycoSignRes.jsp',
	//서명복호화
	singDataUrl : AnySignProp.aSimplePath + '/SimpleSign/module/paycoSignData.jsp',

	// 전자서명 요청
	doSign: function (aName, aBirth, aPhone, aGender) {
		var param = {
			serviceKey: AnySignProp.restApiInfo.serviceCode,
			serviceProvider: SimpleSign.paycoInfo.serviceVersion, channel: SimpleSign.paycoInfo.channelCode,
			userName: aName, birthday: aBirth, phoneNo: aPhone, gender: aGender,
			title: SimpleSign.paycoInfo.signTitle, plain: SimpleSign.aPlain
		};
		if(!AnySignProp.aUseRestApi) {
			param.contentsType = SimpleSign.paycoInfo.contentsTypeCode;
			param.contentsView = SimpleSign.paycoInfo.contentsViewTypeCode;
		}
		if(param.plain.length > 500) {
			paycoSign.initErrorLayout(commSign.getLanguage('paycosign', 'L00030'));
			return;
		}
		commSign.ajaxPost("sign", paycoSignSDK.singUrl, param, function (res) {
			var data = AnySignProp.aUseRestApi ? res.item[0] : res;
			if (data.header.isSuccessful == true) {
				param.body = data.body;
				param.envUserInfo = data.envUserInfo;
				paycoSign.initResultLayout(param);
			} else {
				paycoSign.initErrorLayout(commSign.getLanguage('paycosign', 'PAYCO' + data.header.resultCode));
			}
		}, function (res) {
			var errMsg;
			if(res.detailMessage) errMsg = res.detailMessage;
			else errMsg = res;
			console.log(errMsg);
			paycoSign.initErrorLayout(commSign.getLanguage('paycosign', 'L00007'));
		});
	},
	// 전자서명 결과 조회
	doSignOk: function (signData) {
		var param = {
			serviceKey: AnySignProp.restApiInfo.serviceCode, serviceProvider: SimpleSign.paycoInfo.serviceVersion,
			userName: signData.userName, birthday: signData.birthday, phoneNo: signData.phoneNo, gender: signData.gender,
			txId: encodeURIComponent(signData.body.paycoTransactionId),
			// clientTransactionId: encodeURIComponent(signData.body.clientTransactionId),
			envUserInfo : signData.envUserInfo
		};
		commSign.ajaxPost("verify", paycoSignSDK.singFindUrl, param, function (res) {
			var data = AnySignProp.aUseRestApi ? res.item[0] : res;
			if (data.header.isSuccessful == true) {
				paycoSignSDK.doSignData(data.body);
			} else {
				alert(commSign.getLanguage('paycosign', 'PAYCO' + data.header.resultCode));
				paycoSign.initResultLayout(signData);
			}
		}, function (res) {
			var errMsg;
			if(res.detailMessage) errMsg = res.detailMessage;
			else errMsg = res;
			console.log(errMsg);
			paycoSign.initErrorLayout(commSign.getLanguage('paycosign', 'L00007'));
		});
	},
	//서명정보 복호화
	doSignData: function (signData) {
		var param = { serviceProvider: "payco" };
		param.encData = AnySignProp.aUseRestApi ? signData.signedData : encodeURIComponent(signData.signedData);
		commSign.ajaxPost("decrypt", paycoSignSDK.singDataUrl, param, function (res) {
			var data = AnySignProp.aUseRestApi ? res.item[0].result : res.result;
			if (!commSign.isEmpty(data)) {
				paycoSignSDK.doFin(data, signData.personalInformation.ci)
			} else {
				paycoSign.initErrorLayout(commSign.getLanguage('paycosign', 'L00007'));
			}
		}, function (res) {
			var errMsg;
			if(res.detailMessage) errMsg = res.detailMessage;
			else errMsg = res;
			console.log(errMsg);
			paycoSign.initErrorLayout(commSign.getLanguage('paycosign', 'L00007'));
		});
	},
	// 옵션에 대한 처리, 서명 값 및 EnvCI 값에 구분자 처리
	doFin: function (aCmsSignedData, aEnvCi) {
		var signFuncName = SimpleSign.aFuncName;
		var signOption = SimpleSign.aOption;
		var outputHexFlag = true;
		var mediaID = SimpleSign.paycoInfo.locationId;
		var tmpOutput = aCmsSignedData;

		if (signOption & 256)
			outputHexFlag = false;

		if (signFuncName == "SignDataWithVID" || signFuncName == "SignDataWithVID_Serial") {
			AnySign.mSimpleAuthEnvCi = aEnvCi + ":2";
		}

		if (outputHexFlag == true)
			tmpOutput = commSign.base64ToHex(tmpOutput);

		commSign.SetLastLocation(mediaID);
		SimpleSign.doSuccess(tmpOutput + ":2");
	},
};
