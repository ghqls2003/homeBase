(function() { 
    return {

	firstdesc: "1. Select the certificate for export and enter the certificate password.",
	seconddesc: "2. Enter the auth code.",
	thirddesc: "3. Enter the new password for certificate export.",
	
    firstdetaildesc: "",
    seconddetaildesc: "",
    thirddetaildesc: "",
    
	title: "Export Certificate to mobile device",

	certtable: "List",
	certpasswd: "Password",
	passwd: "Password",
	passwdconfirm: "Confirm password",
	passwdfail: "The password is not correct.",
	passwordinfo : "인증서 암호는 대소문자를 구분합니다.",
	passworderror1: "인증서 암호가 올바르지 않습니다.\n인증서 암호는 대문자 소문자를 구분합니다.\n암호 %s회",
	passworderror2: "(현재 %s회 오류) 오류시 재시도 해주시기 바랍니다.",
	selectpassworderror: "인증서 암호가 올바르지 않습니다.\n인증서 암호는 대문자 소문자를 구분합니다.\n<Caps Lock>키가 켜져 있는지 확인하시고 다시 입력하십시오.",
	passwordfail: "Incorrect password more than %s times.",
	passwordfail: "인증서 암호를 %s회이상 실패하셨습니다.",
	lengtherror: "Input password again.",
	matcherror: "The passwords do not match. Please check and re-enter the passwords.",
	syntaxerror: "The password needs to be at least 8 characters long and it must be alphanumeric.",
	nopassworderror: "인증서 암호를 입력하십시오.",
	nocertselecterror: "인증서를 선택하십시오.",
	createcodeerror: "인증번호 생성에 실패했습니다. 프로그램 재 설치 후 시도해 주세요.",

	
	privatecert : "Certificate",
	
	authcode: "Auth code",
	authcodeerror: "Enter the auth code.",
	authcodesyntaxerror: "The Auth code must be number.",
	authcodedelimiter: "-",
	
	media_location: "Location",
	media_hdd: "Hard Disk",
	media_mobile: "Mobile Phone",
	media_pkcs11: "Crypto Token",
	media_removable: "Portable Drive",
	media_savetoken: "Storage Token",
	media_removable_list : "Portable Drive List",
	
	table_select: "Select ",
	table_expire: "Expiration",
	table_issuer: "Issuer",
	table_section: "Division",
	table_user: "User",
	table_manager: "certificate manager",

	willbeexpired: "The chosen certificate will be expired in %s.",
	renewplease: "",
	
	input_mouse: "input mouse",

	tooltip_capslock1: "\"CapsLock\" ",
	tooltip_capslock2: "is On.",
	
	qr_ing: "...QR코드 생성 중 입니다...",
	qr_guide_msg: "스마트폰에서 QR코드를 스캔하거나,\r\n 인증코드를 입력하여 인증서 가져오기를 완료 하십시오.",
	
	fail: "Fail to export certificate.",
	success: "Success to export certificate.",
	
	button_cancel: "Cancel",
	button_prev: "< Prev",
	button_next: "Next >",
	button_complete: "Complete",

	cert_status0: "Valid certificate",
	cert_status1: "The certificate is scheduled to expire.",
	cert_status2: "Expired certificate",

	table_summary: "Division, User, Expiration, Issuer",

	close: "close",
	blank:"",
	xcsexport: "XecureCertShare Banner, Choose a certificate for export"
    };
})();
