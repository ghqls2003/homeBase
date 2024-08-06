<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head>
<title>AnyPIN(애니핀)</title>
<meta charset="utf-8">
<meta name="format-detection" content="telephone=no">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<link rel="stylesheet" type="text/css" href="css/anysign.css">

<!-- XecureKeyPad Plugin -->
<script type="text/javascript" src="../XecureKeypad/js/xkeypad_config.js"></script>
<script type="text/javascript" src="../XecureKeypad/js/xkeypad_html5_pin.js"></script>

<!-- Pattern UI -->
<link href="../patternLock/patternLock.css"  rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="../patternLock/patternLockjQuery-1.12.4.js"></script>
<script type="text/javascript" src="../patternLock/patternLock_min.js"></script>

<script type="text/javascript" src="../anyPinInterface.js"></script>

<!-- FacePhi -->
<script type="text/javascript" src="../FacePhi/FPhiUserControl/FPhiUserControl.js"></script>

<script type="text/javascript">
	var interval;
	var anypin_ui_for_test = true;
	var aRequestCertRaFunc = function (callback, param) {
		var ra_result_log = "";
		ra_result_log = "id:" + param.id + "\n" + "deviceId:" + param.deviceId + "\n";

		var req= new XMLHttpRequest ();
		var url = AnyPin.mBasePath + "/../test/user_regist_anypin.jsp";
		url += "?commandType=new";
		url += "&user_policy_type=104";
		url += "&targetRA=2048";
		url += "&user_public_or_private=xecureca";
		url += "&user_id=" + param.deviceId;
		url += "&real_id=" + param.id;

		req.open ("GET", url, false);
		req.send (null);

		var res = eval (req.responseText);

		if (parseInt (res["code"]) == 0) {

			var refNum = res["refcode"];
			var authCode = res["authcode"];
			var name = res["name"];
			var ssn = res["ssn"];
			var userid = res["userid"];
			var realid = res["realid"];
			var check_real_id = res["check_real_id"];
			var cert_status = res["cert_status"];

			ra_result_log += "[등록 결과]\n" + 
				"refcode:" + refNum + "\n" +
				"authcode:" + authCode + "\n" +
				"name:" + name + "\n" +
				"ssn:" + ssn + "\n" +
				"userid(deviceId):" + userid + "\n" +
				"realid(id):" + realid + "\n" +
				"check_real_id(id):" + check_real_id + "\n" +
				"cert_status:" + cert_status;

			callback(refNum, authCode);
		}
		else
		{
			ra_result_log += "[등록 결과]\n" +
				"code:" + res["code"] + "\n" +
				"reason:" + res["reason"] + "\n" +
				"moreInformation:" + res["moreinformation"] + "\n";

		}
	};

	function init(){
		AnyPin.InitAnyPin();
		AnyPin.GetPinIDList("", 16, getPinIDList_callback, getPinIDList_err_callback);
	}
	
	function certLogin() {
	}

	function generateRandom (min, max) {
		var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
		return ranNum.toString();
	}

	function runLogin () {
		document.getElementById("regist_step").style.display = "none";
		AnyPin.Dialog.show('login', login_callback, login_err_callback);
		document.getElementById("function_step").style.display = "none";

		interval = setInterval(function () {
			var get_div = document.getElementById('AnyPIN');
			if (get_div.children.length) {
				document.getElementById("function_step").style.display = "block";
				clearInterval(interval);
			}
		}, 100);
	}

	function goRegistStep () {
		document.getElementById("regist_step").style.display = "none";
		document.getElementById("function_step").style.display = "none";

		AnyPin.mId = 'AbankUser' + generateRandom(1, 100);
		AnyPin.SetRequestCertRaFunc(aRequestCertRaFunc);

		AnyPin.GetPinIDList("", 16, function(result) {
			AnyPin.Dialog.show('regist', regist_callback, regist_err_callback);

			interval = setInterval(function () {
				var get_div = document.getElementById('AnyPIN');
				if (get_div.children.length) {
					document.getElementById("function_step").style.display = "block";
					clearInterval(interval);
				}
			}, 100);
		}, function () {
			alert('[' + result.code + '] ' + result.msg);
			document.getElementById("function_step").style.display = "block";
		});
	}

	function goLoginStep () {
		var callback = function (result) {
			if (result) {
				runLogin();
			} else {
				alert('사용할 수 있는 핀 아이디가 없습니다');
			}
		};

		var err_callback = function (result) {
			var alert_msg = "[" + result.code + "] " + result.msg;
			alert(alert_msg);
		};

		AnyPin.GetPinIDList("", 16, callback, err_callback);
	}

	function goDeleteStep () {
		var callback = function (result) {
			if (result) {
				document.getElementById("function_step").style.display = "none";
				AnyPin.Dialog.show('delete', delete_callback, delete_err_callback);

				interval = setInterval(function () {
					var get_div = document.getElementById('AnyPIN');
					if (get_div.children.length) {
						document.getElementById("function_step").style.display = "block";
						clearInterval(interval);
					}
				}, 100);
			} else {
				alert('사용할 수 있는 핀 아이디가 없습니다');
			}
		}

		var err_callback = function (result) {
			var alert_msg = "[" + result.code + "] " + result.msg;
			alert(alert_msg);
		};

		AnyPin.GetPinIDList("", 16, callback, err_callback);
	}

	function goChangeStep () {
		var callback = function (result) {
			if (result) {
				document.getElementById("function_step").style.display = "none";
				AnyPin.Dialog.show('change', change_callback, change_err_callback);

				interval = setInterval(function () {
					var get_div = document.getElementById('AnyPIN');
					if (get_div.children.length) {
						document.getElementById("function_step").style.display = "block";
						clearInterval(interval);
					}
				}, 100);
			} else {
				alert('사용할 수 있는 핀 아이디가 없습니다');
			}
		}

		var err_callback = function (result) {
			var alert_msg = "[" + result.code + "] " + result.msg;
			alert(alert_msg);
		};

		AnyPin.GetPinIDList("", 16, callback, err_callback);
	}

	function getPinIDList_err_callback (result) {
		alert('[' + result.code + '] ' + result.msg);
		document.getElementById("regist_step").style.display = "block";
	}

	function getPinIDList_callback (aResult) {
		if (aResult > 0) {
			runLogin();
		} else {
			document.getElementById("function_step").style.display = "none";
			document.getElementById("regist_step").style.display = "block";
		}
	}

	function login_callback (result) {
		onSendToServer(result); 
	}

	function login_err_callback (result) {
		clearInterval(interval);
		document.getElementById("function_step").style.display = "none";
		document.getElementById("regist_step").style.display = "block";
	}

	function regist_callback () {
		if (AnyPin.mLanguage == "ko-KR")
			alert('등록완료');
		else
			alert('Completed registration process');

		location.reload();
	}

	function regist_err_callback (result) {
		clearInterval(interval);
		document.getElementById("function_step").style.display = "none";
		runLogin();
	}

	function delete_callback () {
	}

	function delete_err_callback () {
		document.getElementById("function_step").style.display = "none";
		document.getElementById("regist_step").style.display = "block";
		clearInterval(interval);
	}

	function change_callback () {
	}

	function change_err_callback () {
		document.getElementById("function_step").style.display = "none";
		document.getElementById("regist_step").style.display = "block";
		clearInterval(interval);
	}
	
	function onSendToServer(value) {
	
		var aRequest = new XMLHttpRequest ();
		var aResponse = "";
		var aURL = "";
		var aMessage = "";
	
		aURL = "./sign_result.jsp";
		aRequest.open ("POST", aURL, false);
		aRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		aRequest.send ("SIGNED=" + encodeURIComponent(value));
	
		try{
			aResponse = eval (aRequest.responseText);

			// 43033, cert is not yet valid
			if(parseInt (aResponse["code"]) == 0 || parseInt (aResponse["code"]) == 43033) {
			    document.getElementById('suc').onclick();
			} else {
				var failUrl = "/XecureDemo/up/juhwa_anypin/test/login_fail.jsp?code=" + aResponse["code"] + "&reason=" + aResponse["reason"];
				document.getElementById("fail").href = failUrl;
			    document.getElementById('fail').onclick();
			}
		}catch (evalException){
			alert ("Evaluate exception(" + evalException + "):\n" + aRequest.responseText);
			return;
		}

		//aMessage += "사용자 RDN:\n" + aResponse["subjectRDN"] + "\n";
		//aMessage += "사용자 인증서:\n" + aResponse["certificatePEM"] + "\n";
	}
	
	function fn_userCheck(){
	}

	function fn_submit(){
	}

	function goHome(){
		location.href="login.jsp";
	}	

	function goFail() {
		location.href="login_fail.jsp";
	}

	function goAsset() {
		location.href="asset_search.jsp";
	}
</script>
</head>
<body onload="init();">
<form name='xecure'><input type=hidden name='p'></form>
<div id="failDiv" style="display:none;"><a href='login_fail.jsp' id="fail" onClick="goFail();"></a></div>
<div id="sucDiv" style="display:none;"><a href='asset_search.jsp' id="suc" onClick="goAsset();"></a></div>
<div id="wrap">
	<!-- header -->
	<div id="header" class="no_lnb">
		<h1 class="logo"><a href="#" onClick="goHome()">A Bank</a></h1>
		<div class="gnb">
			<ul>
			<li><a href="#" class="m_gnb1">개인</a></li>
			<li><a href="#" class="m_gnb2">기업</a></li>
			<li><a href="#" class="m_gnb3">카드</a></li>
			<li><a href="#" class="m_gnb4">전체서비스</a></li>
			</ul>
			<div class="inp_box">
				<fieldset>
				<legend>검색</legend>
				<input type="text" title="검색어 입력">
				<button type="button">검색하기</button>
				</fieldset>
			</div>
		</div>
	</div>
	<!-- //header -->
	
	<hr>
	
	<!-- container -->
	<div id="container">
		<div id="content">
			<div class="visual_a v3">
				<h2>인터넷뱅킹 로그인</h2>
			</div>
			<!-- 로그인 -->
			<div class="login_area">
				<div class="login_left">
					
					<h3 style="margin-left:80px;">공인인증서 로그인</h3>
					<form id="form_SignDataCMS" name="form_SignDataCMS" method="post" action="./test/sign_result.jsp">
						<input type="hidden" name="aXgateAddress"/>
						<input type="hidden" name="aCAList"/>
						<input type="hidden" name="aPlain" />
						<input type="hidden" name="aDescription"/>
						<input type="hidden" name="aLimitPassword"/>
						<input type="hidden" id="output_id1" name="aResult" />
						<div style="display:none;">
							<input type="checkbox" class="inputcheck" name="aOption" value="0" checked disabled="true"/>
							0x00000000 : 기본 서명<br/>
							<input type="checkbox" class="inputcheck" name="aOption" value="1" />
							0x00000001 : 서명확인창을 보여준다.<br/>
							<input type="checkbox" class="inputcheck" name="aOption" value="2"/>
							0x00000002 : 로그인한 인증서만 보여준다..<br/>
							<input type="checkbox" class="inputcheck" name="aOption" value="256"/>
							0x00000100 : 출력 값을 Base64로 <br/>
							<input type="checkbox" class="inputcheck" name="aOption" value="512" checked/>
							0x00000200 : 서명 시간 추가.<br/>
							<input type="checkbox" class="inputcheck" name="aOption" value="8388608"/>
							0x00800000 : SignKorea 축약서명 (PKCS1)<br/>
							<input type="checkbox" class="inputcheck" name="aOption" value="33619968"/>
							0x02010000 : SignKorea 풀서명 (NO CMS + SignKorea)<br/>
							<input type="checkbox" class="inputcheck" name="aOption" value="1048576"/>
							0x00100000 : 인증서 위치 캐쉬<br/>
						</div>
					<fieldset>
					<legend>공인인증서 로그인</legend>
					
					<button type="button" class="certificate" 
						    onClick="certLogin();"/>공인인증서 로그인</button>
					
					<dl>
						<dt>공인인증서 자동팝업</dt>
						<dd>
							<span class="radio checked"><input type="radio" name="use_popup" id="use_auto" checked="checked"></span>
							<label for="use_auto">사용</label>
							<span class="radio"><input type="radio" name="use_popup" id="notuse_auto"></span>
							<label for="notuse_auto">사용안함</label>
						</dd>
					</dl>
					<div class="wrap_btn">
						<button type="button" class="certificate_s1">인증서 발급/재발급</button>
						<button type="button" class="certificate_s2">타기관 인증서 등록</button>
					</div>
					</fieldset>
					</form>
				</div>
				<div class="login_right">
					<h3 style="margin-left:147px;">아이디 로그인</h3>
					
					<form name="form_XecureSubmit1" id="form_XecureSubmit1" method="post" action="loginChk.jsp" style="margin-top:30px;">
					<!--AnyPIN UI-->
					<div class="anypin_zone">
						<div id="AnyPIN"></div>
					</div>

					<!--AnyPIN UI etc-->
					<div class="anypin_zone_etc">
						<div id="regist_step" style="display:none;margin-top:50px;">
							편리한 로그인을 위해 PIN 인증을 이용해보세요.<br><br>
							<button type="button" class="login_s1" style="margin-left:92px;" onclick="goRegistStep();">핀 등록</button>
						</div>
						<div id="function_step" class="wrap_btn" style="width:366px;font-size:14px;text-align:center;display:none;margin-left:-80px;">
							<button type="button" class="login_s1" onclick="goRegistStep();">핀 등록</button>
							<button type="button" class="login_s2" onclick="goLoginStep();">핀 로그인</button>
							<button type="button" class="certificate_s3" onclick="goChangeStep();">핀 변경</button>
							<button type="button" class="login_s3" onclick="goDeleteStep();">핀 해제(삭제)</button>
							<!--a href="javascript:;" style="text-decoration:underline;display:inline-block;margin-right:10px;" onclick="goRegistStep();">등록</a>
							<a href="javascript:;" style="text-decoration:underline;display:inline-block;margin-right:10px;" onclick="goLoginStep();">로그인</a>
							<a href="javascript:;" style="text-decoration:underline;display:inline-block;" onclick="goDeleteStep();">해제</a-->
						</div>
					</div>
					</form>
				</div>
			</div>
			<!-- //로그인 -->
			<div class="wrap_quick">
				<div class="block">
					<h3 class="blind">바로가기메뉴</h3>
					<strong>조회/이체</strong>
					<ul>
						<li><a href="#">계좌조회</a></li>
						<li><a href="#">거래내역조회</a></li>
						<li><a href="#">즉시이체/예약이체</a></li>
						<li><a href="#">즐겨찾는이체</a></li>
						<li><a href="#">이체결과조회</a></li>
						<li><a href="#">자동이체</a></li>
					</ul>
				</div>
				<div class="block">
					<strong>공과금</strong>
					<ul>
						<li><a href="#">지로납부</a></li>
						<li><a href="#">지방세</a></li>
						<li><a href="#">전화요금</a></li>
						<li><a href="#">아파트관리비</a></li>
						<li><a href="#">통합징수보험료</a></li>
						<li><a href="#">등록금</a></li>
					</ul>
				</div>
				<div class="block">
					<strong>금융상품</strong>
					<ul>
						<li><a href="#">예금신규</a></li>
						<li><a href="#">펀드신규</a></li>
						<li><a href="#">펀드계좌조회</a></li>
						<li><a href="#">대출신청</a></li>
						<li><a href="#">대출이자납부</a></li>
						<li><a href="#">해외송금</a></li>
					</ul>
				</div>
				<div class="block">
					<strong>뱅킹관리</strong>
					<ul>
						<li><a href="#">자주쓰는입금계좌관리</a></li>
						<li><a href="#">계좌별명달기</a></li>
						<li><a href="#">SMS통지서비스</a></li>
						<li><a href="#">증명서발급</a></li>
						<li><a href="#">보안서비스</a></li>
						<li><a href="#">분실신고</a></li>
					</ul>
				</div>
				<div class="inner_quick">
					<strong>주요서비스 바로가기</strong>
					<ul>
						<li class="m_inner1"><span>인터넷뱅킹</span><a href="#" class="btn">체험하기</a></li>
						<li class="m_inner2"><span>보안프로그램</span><a href="#" class="btn">설치하기</a></li>
						<li class="m_inner3"><span>유의사항</span><a href="#" class="btn">알아보기</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<!-- //container -->
	<hr>
	
	<!-- footer -->
	<div id="footer">
		<p class="f_menu">
			<a href="#">개인정보처리방침</a> <span>|</span>
			<a href="#">영업점안내</a> <span>|</span>
			<a href="#">사이트맵</a>
		</p>
		<p class="copy">COPYRIGHT(C) 2015 SOFTFORUM. ALL RIGHTS RESERVED.</p>
		<ul>
			<li><a href="#" class="btn twitter">트위터 바로가기</a></li>
			<li><a href="#" class="btn facebook">페이스북 바로가기</a></li>
		</ul>
	</div>
	<!-- //footer -->
</div>
<!-- 로딩중 레이어 -->
<div class="layer loading" style="display:none">
	<img src="img/loading.gif" alt="보안프로그램 로딩중" width="316" height="303">
	<p class="blind">
		잠시만 기다려 주십시오. 고객님의 안전한 인터넷뱅킹 이용을 위해 보안프로그램을 로딩중입니다.
	</p>
</div>
<!-- //로딩중 레이어 -->
<!-- 공인인증서 레이어 -->
<div class="layer" style="display:none">
	<img src="img/@temp_pop.png" alt="임시" width="462" height="592">
</div>
<!-- //공인인증서 레이어 -->
<div class="dimmed" style="display:none"></div>
</body>
</html>
