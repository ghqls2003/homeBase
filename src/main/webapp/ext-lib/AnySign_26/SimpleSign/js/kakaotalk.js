var kakaoTalk = {

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
		div.push('<div id="kakaotalk_light" class="white_content_kakaotalk">');
		div.push(commSign.getLanguage('kakaotalk','L00100'));
		div.push('<div class="popBomt">');
		if(!AnySignProp.signDevice){
			div.push('<span><a href="javascript:void(0)" tabindex="4" onclick = "SimpleSign.appendTabControl();document.getElementById(\'kakaotalk_light\').style.display=\'none\';document.getElementById(\'kakaotalk_fade\').style.display=\'none\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl();document.getElementById(\'kakaotalk_light\').style.display=\'none\';document.getElementById(\'kakaotalk_fade\').style.display=\'none\'}">' + commSign.getLanguage('kakaotalk','L00009')  +'</a></span>');
		} else {
			div.push('<span><a href="javascript:void(0)" onclick = "document.getElementById(\'kakaotalk_light\').style.display=\'none\';document.getElementById(\'kakaotalk_fade\').style.display=\'none\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'block\'">' + commSign.getLanguage('kakaotalk','L00009')  +'</a></span>');
		}
		div.push('</div>');		
		div.push('</div>');
		div.push('<div id="kakaotalk_fade" class="black_overlay_kakaotalk"></div>');
		
		div.push('<!--팝업 메뉴 영역 : 전문보기2 -->');
		div.push('<div id="kakaotalk_light2" class="white_content_kakaotalk">');
		div.push(commSign.getLanguage('kakaotalk','L00101'));
		div.push('<div class="popBomt">');
		if(!AnySignProp.signDevice){
			div.push('<span><a href="javascript:void(0)" tabindex="4" onclick = "SimpleSign.appendTabControl();document.getElementById(\'kakaotalk_light2\').style.display=\'none\';document.getElementById(\'kakaotalk_fade2\').style.display=\'none\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl();document.getElementById(\'kakaotalk_light2\').style.display=\'none\';document.getElementById(\'kakaotalk_fade2\').style.display=\'none\'}">' + commSign.getLanguage('kakaotalk','L00009')  +'</a></span>');
		} else {
			div.push('<span><a href="javascript:void(0)" onclick = "document.getElementById(\'kakaotalk_light2\').style.display=\'none\';document.getElementById(\'kakaotalk_fade2\').style.display=\'none\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'block\'">' + commSign.getLanguage('kakaotalk','L00009')  +'</a></span>');
		}
		div.push('</div>');		
		div.push('</div>');
		div.push('<div id="kakaotalk_fade2" class="black_overlay_kakaotalk"></div>');

		div.push('<ul>');
		div.push('<li tabindex="3" id="xTsign_icon_top" class="xTsignli iconTop" ><img src="' + AnySignProp.aSimplePath + '/SimpleSign/img/icon_kakaotalk.png" alt=""><a class="Atit">' + commSign.getLanguage('kakaotalk','L00001')  +'</a></li>');
		div.push('</ul>');
		div.push('<div id="xTsign_kakaotalk_con" class="kakaotalk_con" tabindex="3">');
			div.push('<p id="xTsign_title">' + commSign.getLanguage('kakaotalk','L00002')  +'</p>');
			div.push('<dl>');
				div.push('<dt><label for="name">' + commSign.getLanguage('kakaotalk','L00010')  +'</label></dt>');
				div.push('<dd><input type="text" id="name" tabindex="3" title="' + commSign.getLanguage('kakaotalk','L00010')  +'"></dd>');
			div.push('</dl>');
			div.push('<dl>');
				div.push('<dt><label for="birthday" >' + commSign.getLanguage('kakaotalk','L00011')  +'</label></dt>');
				div.push('<dd>');
					div.push('<input tabindex="3" type="number" pattern="[0-9]*" id="birthday" title="' + commSign.getLanguage('kakaotalk','L00011')  +'" placeholder="' + commSign.getLanguage('kakaotalk','L00012')  +'" maxlength="8" onkeyup="return commSign.checkNumber(event);">');
				div.push('</dd>');
			div.push('</dl>');
			div.push('<dl>');
				div.push('<dt><label for="phone">' + commSign.getLanguage('kakaotalk','L00015')  +'</label></dt>');
				div.push('<dd><input tabindex="3" type="number" pattern="[0-9]*" id="phone" title="' + commSign.getLanguage('kakaotalk','L00015')  +'" placeholder="' + commSign.getLanguage('kakaotalk','L00016')  +'" maxlength="11" onkeyup="return commSign.checkNumber(event);"></dd>');
			div.push('</dl>');

			div.push('<div class="consent">');
				div.push('<div class="agree">');
				div.push('<table>');				
				div.push('<tr>');
				div.push('<td>');
				if(!AnySignProp.signDevice){
					div.push('<input tabindex="3" type="radio" id="B3" name="B3" value="B3" class="viewInp" onclick="commSign.agreeCheckBox();"><label for="B3" onclick="commSign.agreeCheckBox();">' + commSign.getLanguage('kakaotalk','L00038')  +'</label>');
					div.push('</td>');
					div.push('</tr>');
					div.push('<tr>');
					div.push('<td>');
					div.push('<input tabindex="3" type="checkbox" id="B1" name="B1" value="B1" class="viewInp"><label for="B1">' + commSign.getLanguage('kakaotalk','L00017')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "SimpleSign.appendTabControl(document.getElementById(\'kakaotalk_light\'));document.getElementById(\'kakaotalk_light\').style.display=\'block\';document.getElementById(\'kakaotalk_fade\').style.display=\'block\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl(document.getElementById(\'kakaotalk_light\')); }">' + commSign.getLanguage('kakaotalk','L00019')  +'</a>');
					div.push('<input tabindex="3" type="checkbox" id="B2" name="B2" value="B2" class="viewInp"><label for="B2">' + commSign.getLanguage('kakaotalk','L00018')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "SimpleSign.appendTabControl(document.getElementById(\'kakaotalk_light2\'));document.getElementById(\'kakaotalk_light2\').style.display=\'block\';document.getElementById(\'kakaotalk_fade2\').style.display=\'block\'" onkeyup="if(this.keyCode == 13) { SimpleSign.appendTabControl(document.getElementById(\'kakaotalk_light2\')); }">' + commSign.getLanguage('kakaotalk','L00019')  +'</a>');
					div.push('</td>');
				} else {
					div.push('<input tabindex="3" type="radio" id="B3" name="B3" value="B3" class="viewInp" onclick="commSign.agreeCheckBox();"><label for="B3" onclick="commSign.agreeCheckBox();">' + commSign.getLanguage('kakaotalk','L00038')  +'</label>');
					div.push('</td>');
					div.push('</tr>');
					div.push('<tr>');
					div.push('<td>');
					div.push('<input type="checkbox" id="B1" name="B1" value="B1" class="viewInp"><label for="B1">' + commSign.getLanguage('kakaotalk','L00017')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "document.getElementById(\'kakaotalk_light\').style.display=\'block\';document.getElementById(\'kakaotalk_fade\').style.display=\'block\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'none\'">' + commSign.getLanguage('kakaotalk','L00019')  +'</a>');
					div.push('</br>');
					div.push('<input type="checkbox" id="B2" name="B2" value="B2" class="viewInp"><label for="B2">' + commSign.getLanguage('kakaotalk','L00018')  +'</label><a class="viewBtm" tabindex="3" href = "javascript:void(0)" onclick = "document.getElementById(\'kakaotalk_light2\').style.display=\'block\';document.getElementById(\'kakaotalk_fade2\').style.display=\'block\';document.getElementById(\'xTsign_sign_cancel\').style.display=\'none\'">' + commSign.getLanguage('kakaotalk','L00019')  +'</a>');
					div.push('</td>');
				}
				div.push('</tr>');
				div.push('</table>');
				div.push('</div>');
				
				div.push('<div class="use"><p class="use_text" style="padding-top: 0;">' + commSign.getLanguage('kakaotalk','L00004') + ' ' + 
						'<a href="' + SimpleSign.kakaoTalkInfo.onlineCenter + '" class="onlineText" tabindex="3" target=_blink>' + 
						commSign.getLanguage('kakaotalk', 'L00032') + '</a></p><a id="xTsign_sign" tabindex="3" class="Retext">' + commSign.getLanguage('kakaotalk','L00005') +'</a></div>');
		div.push('</div>');

		//화면표시
		SimpleSign.addSignContent(div.join(''),function(){
			
			//기본값 설정확인
			kakaoTalk.initExtraInfo();
			
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
				kakaoTalk.doSign();	
			};
			document.getElementById('xTsign_sign').onkeyup = function(e) { 		
				if(e.keyCode == 13) {
					kakaoTalk.doSign();
				}
			};
			
			//tabIndex 
			document.getElementById('xTsign_kakaotalk_con').onfocus = function() { 		
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
		div.push('<dt>' + commSign.getLanguage('kakaotalk','L00002') +'</dt>');
		if(!AnySignProp.signDevice) {
			div.push('<img src="' + SimpleSign.pcWebImg + 'sign_step_kakao.png" alt="' + commSign.getLanguage('kakaotalk','L00021')  +'"></img>');
		} else {
			div.push('<img src="' + SimpleSign.mobileWebImg + 'sign_step_kakao.png" alt="' + commSign.getLanguage('kakaotalk','L00021')  +'"></img>');
		}
		div.push('</dl>');
		div.push('<div class="use"><p class="use_text" style="padding-top: 0;padding-left: 0;">' + commSign.getLanguage('kakaotalk','L00004') + ' ' + 
		'<a href="' + SimpleSign.kakaoTalkInfo.onlineCenter + '" class="onlineText" tabindex="3" target=_blink>' + 
		commSign.getLanguage('kakaotalk', 'L00032') + '</a></p></div>');

		document.getElementById('xTsign_kakaotalk_con').classList = '';
		document.getElementById('xTsign_kakaotalk_con').classList.add('yessign_con');
		document.getElementById('xTsign_kakaotalk_con').classList.remove('kakaotalk_con');
		document.getElementById("xTsign_kakaotalk_con").innerHTML = '';
		document.getElementById("xTsign_kakaotalk_con").innerHTML = div.join('');

	},
	//인증오류 화면표시
	initErrorLayout : function(sMsg) {
		var div = [];		
		div.push('<dl>');
		div.push('<dt>' + commSign.getLanguage('kakaotalk','L00007') +'</dt>');
		div.push('<dd>' + commSign.getLanguage('kakaotalk','L00008') + sMsg +'</dd>');
		div.push('</dl>');
		div.push('<div class="use"><p class="use_text" style="padding-top: 0;padding-left: 0;">' + commSign.getLanguage('kakaotalk','L00004') + ' ' + 
		'<a href="' + SimpleSign.kakaoTalkInfo.onlineCenter + '" class="onlineText" tabindex="3" target=_blink>' + 
		commSign.getLanguage('kakaotalk', 'L00032') + '</a></p><a tabindex="3" id="xTsign_sign" class="Retext">' + commSign.getLanguage('kakaotalk','L00006') +'</a></div>');

		document.getElementById("xTsign_kakaotalk_con").innerHTML = '';
		document.getElementById("xTsign_kakaotalk_con").innerHTML = div.join('');

		//인증요청하기 버튼 클릭시
		document.getElementById('xTsign_sign').onclick = function() { 		
			kakaoTalk.initLayout();	
		};
		document.getElementById('xTsign_sign').onkeyup = function(e) { 		
			if(e.keyCode == 13) {
				kakaoTalk.initLayout();
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
		div.push('<dt>' + commSign.getLanguage('kakaotalk','L00002') +'</dt>');
		if(!AnySignProp.signDevice) {
			div.push('<img src="' + SimpleSign.pcWebImg + 'sign_step_kakao.png" alt="' + commSign.getLanguage('kakaotalk','L00021')  +'"></img>');
		} else {
			div.push('<img src="' + SimpleSign.mobileWebImg + 'sign_step_kakao.png" alt="' + commSign.getLanguage('kakaotalk','L00021')  +'"></img>');
		}
		div.push('</dl>');
		div.push('<div class="use"><p class="use_text" style="padding-top: 0;padding-left: 0;">' + commSign.getLanguage('kakaotalk','L00004') + ' ' + 
		'<a href="' + SimpleSign.kakaoTalkInfo.onlineCenter + '" class="onlineText" tabindex="3" target=_blink>' + 
		commSign.getLanguage('kakaotalk', 'L00032') + '</a></p>');
		div.push('<a tabindex="3" id="xTsign_sign" class="agBtn">' + commSign.getLanguage('kakaotalk','L00006') +'</a>');
		div.push('<a tabindex="3" id="xTsign_sign_ok" class="Retext">' + commSign.getLanguage('kakaotalk','L00020') +'</a>');
		div.push('</div>');

		document.getElementById("xTsign_kakaotalk_con").innerHTML = '';
		document.getElementById("xTsign_kakaotalk_con").innerHTML = div.join('');

		if(!AnySignProp.signDevice) {
			SimpleSign.appendTabControl();
		}

		//인증재요청하기 버튼 클릭시
		document.getElementById('xTsign_sign').onclick = function() { 		
			kakaoTalk.initLayout();
		};
		document.getElementById('xTsign_sign').onkeyup = function(e) { 		
			if(e.keyCode == 13) {
				kakaoTalk.initLayout();
			}
		};

		//인증확인 버튼 클릭시
		document.getElementById('xTsign_sign_ok').onclick = function() { 		
			kakaoTalk.initProcessLayout();
			setTimeout(function(){
				kakaoTalkSDK.doSignOk(param);
			}, 1000);
		};
		document.getElementById('xTsign_sign_ok').onkeyup = function(e) { 		
			if(e.keyCode == 13) {
				kakaoTalk.initProcessLayout();
				setTimeout(function(){
					kakaoTalkSDK.doSignOk(param);
				}, 1000);
			}
		};
	},
	//인증요청하기 버튼 클릭시
	doSign : function(){
		var name = document.getElementById('name');
		if(commSign.isEmpty(name.value)){
			name.focus();
			alert(commSign.getLanguage('kakaotalk','L00022'));
			return;
		}
		name.value = commSign.deleteSpace(name.value);

		var birthday = document.getElementById('birthday');
		if(commSign.isEmpty(birthday.value)){
			birthday.focus();
			alert(commSign.getLanguage('kakaotalk','L00023'));
			return;
		}
		
		if(birthday.value.length < 8) {
			birthday.focus();
			alert(commSign.getLanguage('kakaotalk','L00028'));
			return;
		}
		
		// if(SimpleSignProp.genderFlag){
		// 	var gender =  document.getElementById('gender');
		// 	if(commSign.isEmpty(gender.value)){
		// 		gender.focus();
		// 		alert(commSign.getLanguage('kakaotalk','L00028'));
		// 		return;
		// 	}
		// }

		// var birth = '';
		// birth = commSign.checkIdnToBirth(birthday, gender);

		var phone = document.getElementById('phone');
		if(commSign.isEmpty(phone.value)){
			phone.focus();
			alert(commSign.getLanguage('kakaotalk','L00024'));
			return;
		}
		if(phone.value.length < 10) {
			phone.focus();
			alert(commSign.getLanguage('kakaotalk','L00029'));
			return;
		}

		var B1 = commSign.getRadioBoxValue('B1');
		if(commSign.isEmpty(B1)){
			alert(commSign.getLanguage('kakaotalk','L00026'));
			return;
		}

		var B2 = commSign.getRadioBoxValue('B2');
		if(commSign.isEmpty(B2)){
			alert(commSign.getLanguage('kakaotalk','L00027'));
			return;
		}
		
		kakaoTalk.initProcessLayout();
		setTimeout(function(){
			if(SimpleSignProp.genderFlag){
				kakaoTalkSDK.doSign(name.value,birthday.value,phone.value,gender.value);
			}else {
				kakaoTalkSDK.doSign(name.value,birthday.value,phone.value,'');
			}
		}, 1000);
		
		//최근정보 쿠키저장
		SimpleSignProp.setLastSign('kakaotalk');
	},
};


//SDK
var kakaoTalkSDK = {

	// K1110 요청
	k1110Identity : AnySignProp.aSimplePath + '/SimpleSign/module/kakaoTalkIdentityReq.jsp',
	// K1110 검증
	k1110Verify : AnySignProp.aSimplePath + '/SimpleSign/module/kakaoTalkIdentityRes.jsp',
	// K3510 요청
	k3510Sign : AnySignProp.aSimplePath + '/SimpleSign/module/kakaoTalkK3510Req.jsp',
	// K3510 검증
	k3510Verify : AnySignProp.aSimplePath + '/SimpleSign/module/kakaoTalkK3510Res.jsp',
	// K3511 요청
	k3511Sign : AnySignProp.aSimplePath + '/SimpleSign/module/kakaoTalkSignReq.jsp',
	// K3511 검증
	k3511Verify : AnySignProp.aSimplePath + '/SimpleSign/module/kakaoTalkSignRes.jsp',

	// 전자서명 요청
	doSign: function (aName, aBirth, aPhone, aGender) {
		var moduleStartUrl, restStartType, limitLength;
		var param = {
			serviceKey: AnySignProp.restApiInfo.serviceCode,
			encVersion: SimpleSign.kakaoTalkInfo.encVersion,
			userName: aName, birthday: aBirth, phoneNo: aPhone, gender: aGender,
			orgCode: SimpleSign.kakaoTalkInfo.requestOrgName,
			csPhoneNo: SimpleSign.kakaoTalkInfo.callCenterNo,
		};
		
		// mode 별 세팅
		switch(SimpleSign.kakaoTalkInfo.mode) {
			case "K1110" :
				param.title = SimpleSign.kakaoTalkInfo.requestIdentityTitle;
				moduleStartUrl = kakaoTalkSDK.k1110Identity;
				restStartType = "identity";
				param.serviceProvider = "kakaotalk";
				param.encrypted = SimpleSign.kakaoTalkInfo.encrypted.toString();
				limitLength = 40;
				break;
			case "K3510" :
				param.title = SimpleSign.kakaoTalkInfo.requestSignTitle;
				moduleStartUrl = kakaoTalkSDK.k3510Sign;
				restStartType = "sign";
				param.serviceProvider = "kakaoTalk_3510";
				param.encrypted = SimpleSign.kakaoTalkInfo.encrypted.toString();
				limitLength = 3000;
				break;
			case "K3511" :
				param.title = SimpleSign.kakaoTalkInfo.requestSignTitle;
				moduleStartUrl = kakaoTalkSDK.k3511Sign;
				restStartType = "sign";
				param.serviceProvider = "kakaotalk_new";
				limitLength = 3000;
				param.delimeter = "\\" + SimpleSign.aDelimeter;
				break;
			default :
				alert('Not Support Mode');
				return;
		}

		if(SimpleSign.aFuncName !== "MultiSignWithSerial") { // 단일 서명
			param.plain = SimpleSign.aPlain;
			if(param.plain.length > limitLength) {
				kakaoTalk.initErrorLayout(commSign.getLanguage('kakaotalk', 'L00030'));
				return;
			}
		} else {	// 다중 서명
			var tmpPlain = SimpleSign.aPlain;
			var tmpArray = new Array();
			var tmpArrayLength;
			
			if(!Array.isArray(tmpPlain)) {
				tmpArray = tmpPlain.split(SimpleSign.aDelimeter);
				tmpArray.splice(-1, 1);
			}
			
			tmpArray.findIndex(function(item) {
				if(item.length > limitLength) {
					kakaoTalk.initErrorLayout(commSign.getLanguage('kakaotalk', 'L00030'));
					return;
				}
			});
			param.plain = tmpPlain;
			tmpArrayLength = tmpArray.length;
		}

		if(AnySignProp.aUseRestApi) {
			param.count = (tmpArrayLength || 1).toString();
			param.documentsData = param.count > 1 ? param.plain.slice(0, -1) : param.plain;
			param.encVersion = param.encVersion.toString();
			param.delimeter = undefined;
		}
		
		commSign.ajaxPost(restStartType, moduleStartUrl, param, function (res) {
			var resData = AnySignProp.aUseRestApi ? res.item[0] : res;
			if (resData.responseCode == 200) {
				if (resData.result == 'Y') {
					param.tx_id = resData.txId;
					param.envUserInfo = resData.envUserInfo;
					kakaoTalk.initResultLayout(param);
				} else {
					kakaoTalk.initErrorLayout(commSign.getLanguage('kakaotalk', 'L00007'));
				}
			} else {
				var msg = resData.responseCode + ' ' + resData.responseData;
				kakaoTalk.initErrorLayout(msg);
			}
		}, function (res) {
			var errMsg;
			if(res.detailMessage) errMsg = res.detailMessage;
			else errMsg = res;
			console.log(errMsg);
			kakaoTalk.initErrorLayout(commSign.getLanguage('kakaotalk', 'L00007'));
		});

	},
	// 전자서명 결과 조회
	doSignOk: function (signData) {
		var moduleEndUrl, restEndType;
		var param = {
			serviceKey: AnySignProp.restApiInfo.serviceCode,
			txId: signData.tx_id, envUserInfo: signData.envUserInfo
		};

		switch(SimpleSign.kakaoTalkInfo.mode) {
			case "K1110" :
				moduleEndUrl = kakaoTalkSDK.k1110Verify;
				restEndType = "result";
				param.serviceProvider = "kakaotalk";
				break;
			case "K3510" :
				moduleEndUrl = kakaoTalkSDK.k3510Verify;
				restEndType = "verify";
				param.serviceProvider = "kakaoTalk_3510";
				break;
			case "K3511" :
				moduleEndUrl = kakaoTalkSDK.k3511Verify;
				restEndType = "verify";
				param.serviceProvider = "kakaotalk_new";
				break;
			default :
				alert('Not Support Mode');
				return;
		}

		commSign.ajaxPost(restEndType, moduleEndUrl, param, function (res) {
			var resData = AnySignProp.aUseRestApi ? res.item[0] : res;
			if (!commSign.isEmpty(resData.status)) {
				if(resData.status == "COMPLETED") {
					kakaoTalkSDK.doFin(resData.signed_data || resData.signed_document || resData.signed_documents, resData.envCi);
				} else {
					switch(resData.status) {
						case "REQUESTED" :
							alert(commSign.getLanguage('kakaotalk', 'KAKAO_E200'));
							kakaoTalk.initResultLayout(signData);
							break;
						case "EXPIRED" :
							alert(commSign.getLanguage('kakaotalk', 'KAKAO_E201'));
							kakaoTalk.initLayout();
							break;
						default : 
							kakaoTalk.initErrorLayout(commSign.getLanguage('kakaotalk', 'L00007'));
					}
				}
			} else {
				var msg = resData.responseCode + ' ' + resData.responseData;
				kakaoTalk.initErrorLayout(msg);
			}
		}, function (res) {
			var errMsg;
			if(res.detailMessage) errMsg = res.detailMessage;
			else errMsg = res;
			console.log(errMsg);
			kakaoTalk.initErrorLayout(commSign.getLanguage('kakaotalk', 'L00007'));
		});
	},
	// 옵션에 대한 처리, 서명 값 및 EnvCI 값에 구분자 처리
	doFin: function (aCmsSignedData, aEnvCi) {
		var signFuncName = SimpleSign.aFuncName;
		var outputHexFlag = SimpleSign.aOption & 256 ? false : true;
		var mediaID = SimpleSign.kakaoTalkInfo.locationId;
		var tmpOutput;

		if (signFuncName == "SignDataWithVID" || signFuncName == "SignDataWithVID_Serial") {
			AnySign.mSimpleAuthEnvCi = aEnvCi + ":5";
		}

		if(Array.isArray(aCmsSignedData)) {
			tmpOutput = aCmsSignedData.map(function(v) {
				var output = v.signed_document;
				if (outputHexFlag)
					output = commSign.base64ToHex(output)
				
				output += ":5";

				return output;
			});
			
			if (signFuncName == "MultiSignWithSerial") {
				tmpOutput = tmpOutput.join(SimpleSign.aDelimeter);
				tmpOutput += SimpleSign.aDelimeter;
				SimpleSign.aDelimeter = undefined;
			}
		} else {
			tmpOutput = aCmsSignedData;
			if (outputHexFlag)
				tmpOutput = commSign.base64ToHex(tmpOutput);

			tmpOutput += ":5";
		}

		commSign.SetLastLocation(mediaID);
		SimpleSign.doSuccess(tmpOutput);
	},
};