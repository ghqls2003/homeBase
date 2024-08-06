(function() { 
    return {
    firstdesc: "1. 모바일 기기로 이동할 인증서를 선택하고 암호를 입력하십시오.",
    seconddesc: "2. 모바일 기기에서 사용할 인증서 암호를 입력하고  확인하십시오.",
    thirddesc: "3. QR코드를 스캔하거나, 인증 번호를 입력하십시오.",
    
    firstdetaildesc: "",
    seconddetaildesc: "영대소문자, 특수문자, 숫자 혼합 10자리 이상 사용하시기 바랍니다.",
    thirddetaildesc: "",
	
	title: "PC에서 모바일 기기로 인증서 내보내기",

	certtable : "인증서 목록",
	certpasswd: "인증서 암호",
	passwd: "암호",
	passwdconfirm: "암호 확인",
	blinkpasswdfail: "암호를 입력하지 않았습니다.",
	passwordinfo : "인증서 암호는 대소문자를 구분합니다.",
	passworderror1: "인증서 암호가 올바르지 않습니다.\n인증서 암호는 대문자 소문자를 구분합니다.\n암호 %s회",
	passworderror2: "(현재 %s회 오류) 오류시 재시도 해주시기 바랍니다.",
	selectpassworderror: "인증서 암호가 올바르지 않습니다.\n인증서 암호는 대문자 소문자를 구분합니다.\n<Caps Lock>키가 켜져 있는지 확인하시고 다시 입력하십시오.",
	passwordfail: "인증서 암호를 %s회이상 실패하셨습니다.",
	lengtherror: "모바일 기기에서 사용할 비밀번호를 입력하십시오.",
	matcherror: "확인을 위한 암호가 일치하지 않습니다. 같은 암호를 두번 입력하십시오.",
	syntaxerror: "비밀번호는 문자와 숫자를 조합하여야 합니다.",
	nopassworderror: "인증서 암호를 입력하십시오.",
	nocertselecterror: "인증서를 선택하십시오.",
	createcodeerror: "인증번호 생성에 실패했습니다. 프로그램 재 설치 후 시도해 주세요.",
	
	privatecert : "일반인증서",
	
	authcode: "인증 번호",
	authcodeerror: "인증 번호를 입력하십시오.",
	authcodesyntaxerror: "인증 번호는 숫자이여야 합니다.",
	authcodedelimiter: "-",

	media_location: "인증서 위치",
	media_hdd: "하드디스크",
	media_mobile: "휴대폰",
	media_pkcs11: "보안토큰",
	media_removable: "이동식디스크",
	media_savetoken: "저장토큰",
	media_setting : "인증서 설정영역",
	media_removable_list : "이동식디스크 목록",

	table_select: "선택 ",
	table_expire: "만료일",
	table_issuer: "발급자",
	table_section: "구분",
	table_user: "사용자",
	
	willbeexpired: "선택하신 인증서는\n%s 만료 예정입니다.",
	renewplease: "만료일 이전에 인증서를 갱신해 주시기 바랍니다.",
	
	input_mouse: "마우스로 입력",
	
	tooltip_capslock1: "\"CapsLock\" ",
	tooltip_capslock2: "이 켜져 있습니다.",
	
	qr_ing: "...QR코드 생성 중 입니다...",
	qr_guide_msg: "스마트폰에서 QR코드를 스캔하거나,\r\n 인증코드를 입력하여 인증서 가져오기를 완료 하십시오.",

	fail: "PC에서 인증서 내보내기에 실패했습니다.",
	success: "PC에서 인증서 내보내기를 완료했습니다.\r\n모바일 기기에서 인증서 가져오기를 수행하여, 인증서 이동을 완료 하십시오.",
	
	button_cancel: "취소",
	button_prev: "< 뒤로",
	button_next: "다음 >",
	button_complete: "마침",
	
	no_change_pwd: "인증서 비밀번호를 기존과 동일하게 사용",

	/* 접근성 */
	cert_status0: "정상 인증서",
	cert_status1: "만료 예정 인증서",
	cert_status2: "만료 된 인증서",
	table_summary: "구분, 사용자, 만료일, 발급자",
	close: "닫기",
	blank: "",
	xcsexport: "XecureCertShare 배너, 내보내기를 위한 인증서를 선택하십시오"
    };
})();
