
/**
 * @name         : postToURL
 * @description  : 파라메터를 포함한 post 페이지 요청
 * @date         : 2018. 10. 11
 * @author	     : 이우철
 */
function postToURL(path, params, target) {
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", path);
    if(target == undefined || target == null){
    	form.setAttribute("target", "_self");
	} else {
		form.setAttribute("target", target);
	}

    //form.target=target;

    //Spring Security의 token값 설정
    var csrfField = document.createElement("input");
    csrfField.setAttribute("type", "hidden");
    csrfField.setAttribute("name", $("meta[name='_csrf_parameter']").attr("content"));
    csrfField.setAttribute("value", $("meta[name='_csrf']").attr("content"));
    form.appendChild(csrfField);

    // parameter 세팅
    for (var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
    //form.remove(); // 필요없을 경우 삭제, 반복적으로 사용할 경우 그대로 둠
    return false;
}

/**
 * @name         : getToURL
 * @description  : 파라메터를 포함한 get 페이지 요청
 * @date         : 2020. 04. 14
 * @author	     : 이우철
 */
function getToURL(path, params) {
    // parameter 세팅
	var paramStr = "";


    for (var key in params) {
    	if (paramStr == "") { paramStr += "?" } else { paramStr += "&" }
        paramStr += key + "=" + params[key];
    }

    window.location.href = path + paramStr;
}
function tapReport(path, params) {
    var form = document.createElement("form");
    /*window.open('', 'report_viewer');*/

    form.setAttribute("method", "post");
    form.setAttribute("action", path);
    form.setAttribute("target", "_self");

    //Spring Security의 token값 설정
    var csrfField = document.createElement("input");
    csrfField.setAttribute("type", "hidden");
    csrfField.setAttribute("name", $("meta[name='_csrf_parameter']").attr("content"));
    csrfField.setAttribute("value", $("meta[name='_csrf']").attr("content"));
    form.appendChild(csrfField);

    for (var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);

    form.submit();
    //form.remove(); // 필요없을 경우 삭제, 반복적으로 사용할 경우 그대로 둠
    return false;
}
/**
 * @name         : popupReport
 * @description  : 리포트 팝업
 * @date         : 2018. 11. 05
 * @author	     : 이우철
 */
function popupReport(path, params) {
    var form = document.createElement("form");
    window.open('', 'report_viewer', 'width=900, height=1000');

    form.setAttribute("method", "post");
    form.setAttribute("action", path);
    form.setAttribute("target", "report_viewer");

    //Spring Security의 token값 설정
    var csrfField = document.createElement("input");
    csrfField.setAttribute("type", "hidden");
    csrfField.setAttribute("name", $("meta[name='_csrf_parameter']").attr("content"));
    csrfField.setAttribute("value", $("meta[name='_csrf']").attr("content"));
    form.appendChild(csrfField);

    for (var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);

    form.submit();
    //form.remove(); // 필요없을 경우 삭제, 반복적으로 사용할 경우 그대로 둠
    return false;
}

/**
 * @name         : fn_getFormData
 * @description  : 폼데이터를 Json Arry로 직렬화
 * @date         :
 * @author	     :
 */
function fn_getFormData(form, data) {
	var unindexed_array = $(form).serializeArray();
	var indexed_array = {};

	$.map(unindexed_array, function(n, i) {
		indexed_array[n['name']] = n['value'].trim();
	});

	$.extend(indexed_array, data);
	return indexed_array;
};


/**
 * @name         : fn_getFormDataToJson
 * @description  : 폼데이터를 Json 으로 변환
 * @date         :
 * @author	     :
 */
function fn_getFormDataToJson(form) {
	JSON.stringify(fn_getFormData(form));

}

/**
 * @name         : toBizrNumFormat
 * @description  : 사업자등록번호 포맷팅(숫자)
 * @date         :
 * @author	     :
 */
function toBizrnoNumFormat(str){

	if (nvl(str) == "") {
		return "";
	}

    var bizNumStr = str.replace(/[^0-9]/g, '');

    var tmp = '';

    if( bizNumStr.length < 4) {
        return bizNumStr;
    } else if(bizNumStr.length < 6) {
        tmp += bizNumStr.substr(0, 3);
        tmp += '-';
        tmp += bizNumStr.substr(3);
        return tmp;
    } else if(bizNumStr.length < 11) {
        tmp += bizNumStr.substr(0, 3);
        tmp += '-';
        tmp += bizNumStr.substr(3, 2);
        tmp += '-';
        tmp += bizNumStr.substr(5);
        return tmp;
    } else {
        tmp += bizNumStr.substr(0, 3);
        tmp += '-';
        tmp += bizNumStr.substr(3, 3);
        tmp += '-';
        tmp += bizNumStr.substr(6);
        return tmp;
    }
}

/**
 * @name         : toBizrnoFormat
 * @description  : 사업자등록번호 포맷팅
 * @date         :
 * @author	     :
 */
function toBizrnoFormat(str){
    var bizrno = str.replace(/-/gi,"");
    var rtnStr = "";

    if( bizrno.length < 4) {
        return bizrno;
    } else if(bizrno.length < 6) {
        rtnStr += bizrno.substr(0, 3);
        rtnStr += '-';
        rtnStr += bizrno.substr(3);
        return rtnStr;
    } else if(bizrno.length < 11) {
        rtnStr += bizrno.substr(0, 3);
        rtnStr += '-';
        rtnStr += bizrno.substr(3, 2);
        rtnStr += '-';
        rtnStr += bizrno.substr(5);
        return rtnStr;
    } else {
        rtnStr += bizrno.substr(0, 3);
        rtnStr += '-';
        rtnStr += bizrno.substr(3, 3);
        rtnStr += '-';
        rtnStr += bizrno.substr(6);
        return rtnStr;
    }
}

/**
 * @name         : toCorporateNumFormat
 * @description  : 법인등록번호 포맷팅(숫자)
 * @date         : 2023. 08. 03.
 * @author	     :
 */
function toCorporateNumFormat(str){

	if (nvl(str) == "") {
		return "";
	}

    var corporateNumStr = str.replace(/[^0-9]/g, '');

    var tmp = '';

    if( corporateNumStr.length < 7) {
        return corporateNumStr;
    } else if(corporateNumStr.length < 14) {
        tmp += corporateNumStr.substr(0, 6);
        tmp += '-';
        tmp += corporateNumStr.substr(6);
        return tmp;
    } else {
        tmp += corporateNumStr.substr(0, 6);
        tmp += '-';
        tmp += corporateNumStr.substr(6, 13);
        tmp += '-';
        tmp += corporateNumStr.substr(13);
        return tmp;
    }
}

/**
 * @name         : toCorporationrnoFormat
 * @description  : 법인등록번호 포맷팅
 * @date         : 2023. 08. 03.
 * @author	     :
 */
function toCorporationrnoFormat(str){
    var corporationrno = str.replace(/-/gi,"");
    var rtnStr = "";

    if( corporationrno.length < 7) {
        return corporationrno;
    } else if(corporationrno.length < 14) {
        rtnStr += corporationrno.substr(0, 6);
        rtnStr += '-';
        rtnStr += corporationrno.substr(6);
        return rtnStr;
    } else {
        rtnStr += corporateNumStr.substr(0, 6);
        rtnStr += '-';
        rtnStr += corporateNumStr.substr(6, 13);
        rtnStr += '-';
        rtnStr += corporateNumStr.substr(13);
        return rtnStr;
    }
}

/**
 * @name         : brnoFormat
 * @description  : 사업자등록번호 입력 -> 000-00-00000
 * @date         : 2023. 08. 03.
 * @author       : 허윤정
 */
function brnoFormat(str) {
	var brnoStr = str.value.replace(/[^0-9]/g, '');

    var formattedBrno = '';

    if (brnoStr.length < 4) {
        formattedBrno = brnoStr;
    } else if (brnoStr.length < 6) {
        formattedBrno = brnoStr.substr(0, 3) + '-' + brnoStr.substr(3);
    }  else if (brnoStr.length < 11) {
        formattedBrno = brnoStr.substr(0, 3) + '-' + brnoStr.substr(3, 2) + '-' + brnoStr.substr(5);
    }

    str.value = formattedBrno;
}

/**
 * @name         : crnoFormat
 * @description  : 법인등록번호 입력 -> 000000-0000000
 * @date         : 2023. 08. 03.
 * @author       : 허윤정
 */
function crnoFormat(str) {
	var crnoStr = str.value.replace(/[^0-9]/g, '');

    var formattedCrno = '';

    if (crnoStr.length < 7) {
        formattedCrno = crnoStr;
    } else if (crnoStr.length < 14) {
        formattedCrno = crnoStr.substr(0, 6) + '-' + crnoStr.substr(6);
    }

    str.value = formattedCrno;
}


/**
 * @name         : telFormat
 * @description  : 연락처
 * @date         : 2023. 08. 03.
 * @author       : 허윤정
 */
function telFormat(str) {
	var telStr = str.value.replace(/[^0-9]/g, '');

    var formattedTel = '';

    if (telStr.length <= 2) {
        formattedTel = telStr;
    } else if (telStr.length <= 5) {
        formattedTel = telStr.substr(0, 2) + '-' + telStr.substr(2);
    } else if (telStr.length <= 9) {
        formattedTel = telStr.substr(0, 2) + '-' + telStr.substr(2, 3) + '-' + telStr.substr(5);
    } else if (telStr.length <= 10) {
        formattedTel = telStr.substr(0, 3) + '-' + telStr.substr(3, 3) + '-' + telStr.substr(6);
    } else if (telStr.length <= 11) {
        formattedTel = telStr.substr(0, 3) + '-' + telStr.substr(3, 4) + '-' + telStr.substr(7);
    }

    str.value = formattedTel;
}

/**
 * @name         : timeFormat
 * @description  : 운영시간 -> 00:00
 * @date         : 2023. 08. 03.
 * @author       : 허윤정
 * @modifier     : 김경룡(2023. 10. 27)
 * @description  : 23시59분 초과 입력 불가능 처리
 */
function timeFormat(str) {
	var timStr = str.value.replace(/[^0-9]/g, '');

    if (timStr.length < 3) {
        str.value = timStr;
 	} else if (timStr.length < 5) {
		 if(timStr.substr(0, 4) > 2359) {
			 alert("23시59분까지 작성할 수 있습니다.");
			 str.value = '';
			 return;
		 } else {
	        var formattedTime = timStr.substr(0, 2) + ':' + timStr.substr(2);
	        str.value = formattedTime;
		 }
    }
}

/**
 * @name         : textOnly
 * @description  : 문자만 입력가능
 * @date         : 2023. 08. 03.
 * @author       : 허윤정
 */
function textOnly(text) {
	text.value = text.value.replace(/^[^ㄱ-힣a-zA-Z]+|[^ㄱ-힣a-zA-Z,\s]+/g, '');
}

/**
 * @name         : charOnly
 * @description  : 문자, 특수문자 입력가능
 * @date         : 2023. 08. 03.
 * @author       : 허윤정
 */
function charOnly(char) {
	char.value = char.value.replace(/^[^0-9ㄱ-힣a-zA-Z().,_-]+|[^0-9ㄱ-힣a-zA-Z().,_-\s]+/g, '');
}

/**
 * @name         : content
 * @description  : 문자, 특수문자, 띄워쓰기, 줄바꿈 입력가능
 * @date         : 2023. 08. 03.
 * @author       : 허윤정
 */
function content(content) {
	content.value = content.value.replace(/^[^0-9ㄱ-힣a-zA-Z().,_-]+|[^0-9ㄱ-힣a-zA-Z().,_-\s\n]+/g, '');
}

/**
 * @name         : numberOnly
 * @description  : 숫자만 입력가능
 * @date         : 2023. 08. 03.
 * @author       : 허윤정
 */
function numberOnly(number) {
	number.value = number.value.replace(/[^0-9]/g, '');
}

/**
 * @name         : locationOnly
 * @description  : 숫자, 소수점 입력가능 (경, 위도)
 * @date         : 2023. 08. 31.
 * @author       : 허윤정
 */
function locationOnly(location) {
	location.value = location.value.replace(/[^\d\.]/g, '');
}

/**
 * @name         : dateToStr
 * @description  : date -> yyyy-mm-dd로 변환
 * @date         : 2018. 09. 27.
 * @author         : 이광호
 */
function dateToStr(date) {

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    if((month + '').length < 2) month = '0' + month;
    if((day + '').length < 2) day = '0' + day;

    return year + '-' + month + '-' + day;

}

/**
 * @name         : dateFormatting
 * @description  : 데이트 스트링 포맷팅
 * @date         :
 * @author	     :
 */
function dateFormatting (dateStr) {
	var formattedStr = '';

	if (dateStr != null && dateStr != '') {
		var f_dateStr = dateStr.replace(/[^0-9]/g, '');

		if (f_dateStr.length == 8) {
			formattedStr = f_dateStr.match(/([0-9]{4})([0-9]{2})([0-9]{2})/).splice(1,3).join('-');
		} else if (f_dateStr.length == 12) {
            var res = f_dateStr.match(/([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/);
            formattedStr = res.splice(1,3).join('-') + " " + res.splice(1,2).join(":");
        } else if (f_dateStr.length == 14) {
			var res = f_dateStr.match(/([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/);
			formattedStr = res.splice(1,3).join('-') + " " + res.splice(1,3).join(":");
		}
	}

	return formattedStr;
}

/**
 * @name         : FormatNumber
 * @description  : 1000단위 콤마 처리
 * @date         :
 * @author	     :
 */
function FormatNumber(num) {

	if(num == undefined){
		num = "0";
	}

    //소수점 제외 1000단 위 콤마로 수정
	var parts = num.toString().split(".");
	return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1]?"."+parts[1]:"");

}

/**
 * @name         : leadingZeros
 * @description  : digits 자릿수까지 0으로 채워준다.
 * @date         :
 * @author	     :
 */
function leadingZeros(n, digits) {
	var zero = '';

	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++) {
			zero += '0';
		}
	}
	return zero + n;
}

/**
 * @name         : nvl
 * @description  : 주어진 값에 대한 Null 여부 체크 후 기본값 반환
 * @date         :
 * @author	     :
 */
function nvl(str, defaultVal) {
    var defaultValue = "";

    if (typeof defaultVal !== 'undefined') {
        defaultValue = defaultVal;
    }

    if (typeof str === "undefined" || str === null || str === '' || str === undefined) {
        return defaultValue;
    }

    return str;
}

/**
 * @name         : sec2hhmm
 * @description  : 초를 시분으로 변환
 * @date         :
 * @author	     :
 */
function sec2hhmm(seconds) {
	var hour = parseInt(seconds/3600);
	var min = parseInt((seconds%3600)/60);
	var sec = seconds%60;

	return hour + "시간 " + min + "분";
}

// =====파일 다운로드 처리 시작=====
/**
 * @name         : fileDownload
 * @description  : 파일다운로드
 * @date         :
 * @author	     :
 */
function tempFileDownload(path, filename, realFilename) {
	$.download("path=" + path + "&filename=" + filename + "&realFilename=" + realFilename, 'POST', '_self');
}

function fileDownload(atchFileSn, filename) {
	if (nvl(atchFileSn) == "" || nvl(filename) == "") {
//		alert("파일 다운로드를 위한 인자값이 충분하지 않습니다.");
		return false;
	}

	$.download("atchFileSn=" + atchFileSn + "&filename=" + filename, 'POST', '_self');
}

// Ajax 파일 다운로드
jQuery.download = function(data, method, target) {
	// url과 data를 입력받음
	var url = contextPath + "/cmmn/fileDownload";
	var inputs = '';

	if (url && data) {
		// data 는 string 또는 array/object 를 파라미터로 받는다.
		data = typeof data == 'string' ? data : jQuery.param(data);
		// 파라미터를 form의 input으로 만든다.
		jQuery.each(data.split('&'), function() {
			var pair = this.split('=');
			inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
		});
	}

	if (typeof (target) == 'undefined') {
		target = "_self";
	}

    //Spring Security의 token값 설정
	var csrfInput = '<input type="hidden" name="' + $("meta[name='_csrf_parameter']").attr("content") + '" value="' + $("meta[name='_csrf']").attr("content") + '" />';

	// request를 보낸다.
	jQuery('<form action="' + url + '" method="' + (method || 'post') + '" target="' + target + '" accept-charset="UTF-8" onsubmit="emulAcceptCharset(this)">' + inputs + csrfInput + '</form>').appendTo('body').submit().remove();
};
function fileDownloadget(atchFileSn, filename) {
	if (nvl(atchFileSn) == "" || nvl(filename) == "") {
//		alert("파일 다운로드를 위한 인자값이 충분하지 않습니다.");
		return false;
	}

	$.downloadget("atchmnflSn=" + atchFileSn + "&atchmnflNm=" + filename, 'get', '_self');
}

// Ajax 파일 다운로드
jQuery.downloadget = function(data, method, target) {
	// url과 data를 입력받음
	var url = contextPath + "/cmmn/fileDownloadGet";
	var inputs = '';

	if (url && data) {
		// data 는 string 또는 array/object 를 파라미터로 받는다.
		data = typeof data == 'string' ? data : jQuery.param(data);
		// 파라미터를 form의 input으로 만든다.
		jQuery.each(data.split('&'), function() {
			var pair = this.split('=');
			inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
		});
	}

	if (typeof (target) == 'undefined') {
		target = "_self";
	}

    //Spring Security의 token값 설정
	var csrfInput = '<input type="hidden" name="' + $("meta[name='_csrf_parameter']").attr("content") + '" value="' + $("meta[name='_csrf']").attr("content") + '" />';

	// request를 보낸다.
	jQuery('<form action="' + url + '" method="' + (method || 'get') + '" target="' + target + '" accept-charset="UTF-8" onsubmit="emulAcceptCharset(this)">' + inputs + csrfInput + '</form>').appendTo('body').submit().remove();
};


/**
 * @name         : decryptFileDownload
 * @description  : 복호화 파일 다운로드
 * @date         : 2023. 11. 27
 * @author	     : 정영훈
 */
function decryptFileDownload(atchFileSn, filename) {
	if (nvl(atchFileSn) == "" || nvl(filename) == "") {
		alert("파일 다운로드 중 오류가 발생했습니다.");
		return false;
	}
	$.decryptDownload("atchFileSn=" + atchFileSn + "&filename=" + filename, 'GET', '_self');
}
// Ajax 복호화 파일 다운로드
jQuery.decryptDownload = function(data, method, target) {

	// url과 data를 입력받음
	var url = contextPath + "/cmmn/decryptFileDownloadGet";
	var inputs = '';

	if (url && data) {
		// data 는 string 또는 array/object 를 파라미터로 받는다.
		data = typeof data == 'string' ? data : jQuery.param(data);
		// 파라미터를 form의 input으로 만든다.
		jQuery.each(data.split('&'), function() {
			var pair = this.split('=');
			inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
		});
	}

	if (typeof (target) == 'undefined') {
		target = "_self";
	}

    //Spring Security의 token값 설정
	var csrfInput = '<input type="hidden" name="' + $("meta[name='_csrf_parameter']").attr("content") + '" value="' + $("meta[name='_csrf']").attr("content") + '" />';

	// request를 보낸다.
	var form = jQuery('<form action="' + url + '" method="' + (method || 'get') + '" target="' + target + '" accept-charset="UTF-8" onsubmit="emulAcceptCharset(this)">' + inputs + csrfInput + '</form>');
	form.appendTo('body');

	jQuery.ajax({
        url: url + '?' + form.serialize(),
        method: method || 'get',
        success: function(response) {
            form.submit();
        },
        error: function(xhr, status, error) {
            alert("파일 다운로드 중 오류가 발생했습니다.");
        },
        complete: function() {
   			 form.remove();
		}
    });
}

function emulAcceptCharset(app_form) {
	if (app_form.canHaveHTML) { // detect IE
		document.charset = app_form.acceptCharset;
	}
	return true;
}

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/gi, "")
}

//=====파일 다운로드 처리 종료=====

//=====파일 업로드 처리 시작=====
/**
 * @name         : fileUpload
 * @description  : ajax 통신
 * @date         : formData
 * @author	     :
 */
function fileAjax(url, formData, fn_success, fn_complete) {

    var loader = isLoading($('body')[0], {
        type: "overlay",
        class : "fa fa-refresh fa-spin",
        text: "파일업로드중입니다."
    });

    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

    $.ajax({
        url : url,
        type: 'POST',
        dataType: 'json',
        data: formData,
        processData: false,
        contentType: false,
        beforeSend : function(xhr) {
                loader.loading();
                xhr.setRequestHeader(header, token);
        },
        success : function(data) {
            if(fn_success != null || fn_success != undefined){
                fn_success(data);
            }else{

            }
        },
        error : function(jxhr, textStatus) {
            alert("처리중 에러가 발생하였습니다.");
        },
        complete : function(xhr, status) {

            loader.remove();

            if(fn_complete != null || fn_complete != undefined){
                fn_complete(xhr);
            }
        }
    });
}

/**
 * @name         : encryptFileAjax
 * @description  : ajax 통신
 * @date         : formData
 * @author	     : 정영훈 231024
 */
function encryptFileAjax(url, formData, fn_success, fn_complete) {

    var loader = isLoading($('body')[0], {
        type: "overlay",
        class : "fa fa-refresh fa-spin",
        text: "파일업로드중입니다."
    });

    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");

    $.ajax({
        url : url,
        type: 'POST',
        dataType: 'json',
        data: formData,
        processData: false,
        contentType: false,
        beforeSend : function(xhr) {
                loader.loading();
                xhr.setRequestHeader(header, token);
        },
        success : function(data) {
            if(fn_success != null || fn_success != undefined){
                fn_success(data);
            }else{

            }
        },
        error : function(jxhr, textStatus) {
            alert("처리중 에러가 발생하였습니다.");
        },
        complete : function(xhr, status) {

            loader.remove();

            if(fn_complete != null || fn_complete != undefined){
                fn_complete(xhr);
            }
        }
    });
}

/**
 * @name         : fileAddCheck
 * @description  : 파일 업로드 체크
 * @date         :
 * @author	     :
 */
function fileAddCheck(obj) {
	// 파일정보
    var fileObj = $(obj)[0].files;

    // 파일 없으면 리턴
    if(fileObj.length < 1)
        return;

    fileObj = fileObj[0];

	var fileObjValue = document.getElementById(obj.id).value;

	var all_names = fileObj['name'].split('.');

	var name = all_names[0]; // 파일 이름

	var ext = all_names[all_names.length-1].toLowerCase();// 확장자

	var size = fileObj['size'];// 파일사이즈

	// 이미지 확장자 검사

//	if (!fileAddExtCheck(ext)) {
//
//		alert("첨부파일 형식을 다시 확인해주세요. \n 첨부가능 확장자 : zip, hwp, doc, docx, ppt, pptx, xls, xlsx, txt, bmp, jpg, jpeg, gif, png, pdf");
//
//		fileObjValue = '';
//
//		$('#file_upload_field').val('');
//
//		return false;
//
//	}

	// 파일 사이즈

	var maxSize = 2 * 1024 * 1024;//2MB

	if (size > maxSize) {

		alert('첨부파일 사이즈는 2MB 이내로 등록 가능합니다.');

		fileObjValue = '';

		$('#'+obj.id).val('');

		return false;

	}

	return true;

}

/**
 * @name         : fileAddExtCheck
 * @description  : 파일 확장자 체크
 * @date         :
 * @author	     :
 */
function fileAddExtCheck(str) { // 파일 확장자 체크

	var ext = "zip, hwp, doc, docx, ppt, pptx, xls, xlsx, txt, bmp, jpg, jpeg, gif, png, pdf"; // 파일가능 확장자

	var cnt = 0;
	var array = new Array();
	str = str.slice(str.lastIndexOf(".") + 1).toLowerCase();
	array = ext.split(",");

	for (var i = 0; i < array.length; i++) {

		if (str == array[i].trim()) {
			cnt++;
		}
	}

	if (cnt > 0) {
		return true;
	} else {
		return false;
	}
}

//=====파일 업로드 처리 종료=====

/**
 * @name         : String.prototype.yyyymmdd
 * @description  : 년월일 포멧  20170101 ==> 2017-01-01
 * @date         :
 * @author	     :
 */
String.prototype.yyyymmdd = function() {
	var rtnStr = "";
	if (this.length == 8) {
		rtnStr = this.substring(0, 4) + "-" + this.substring(4, 6) + "-" + this.substring(6, 8);
	} else if (this.length == 6) {
		rtnStr = this.substring(0, 4) + "-" + this.substring(4, 6);
	}
	return rtnStr;
}

/**
 * @name         : txtSubstitution
 * @description  : 특수문자 치환
 * @date         :
 * @author	     :
 */
function txtSubstitution(orgTxt){
    var rtnTxt = orgTxt;
    rtnTxt = rtnTxt.replace(/&lt;/gi,'<');
    rtnTxt = rtnTxt.replace(/&gt;/gi,'>');
    rtnTxt = rtnTxt.replace(/&quot;/gi,'"');
    rtnTxt = rtnTxt.replace(/&amp;/gi,'&');
    /*rtnTxt = rtnTxt.replace(/&nbsp;/gi,' ');*/

    return rtnTxt;

}

/**
 * @name         : ajax
 * @description  : ajax 통신 (csrf 토큰 포함)
 * @date         :
 * @author	     :
 */
function ajax(isLodingBool, url, isLodingElement, beforeSendText, ajaxParam, fn_success, fn_complete) {

    var loader = isLoading($(isLodingElement)[0], {
        type: "overlay",
        class : "fa fa-refresh fa-spin",
        text: beforeSendText
    });

    var header = $("meta[name='_csrf_header']").attr("content");
    var token  = $("meta[name='_csrf']").attr("content");

    $.ajax({
        url : url,
        type : 'POST',
        contentType : "application/json",
        data : JSON.stringify(ajaxParam),
        dataType : "json",
        beforeSend : function(xhr) {
        	xhr.setRequestHeader(header, token);
//            xhr.setRequestHeader("Accept-Encoding", "gzip");

            if (isLodingBool) {
                loader.loading();
            }
        },
        success : function(data) {
            if(fn_success != null || fn_complete != undefined){
                fn_success(data);
            }
        },
        error : function(xhr, textStatus) {
        	if (xhr.status == 401) {
        		alert("권한이 없습니다. 사용자 인증이 필요합니다.");
	        } else if (xhr.status == 403) {
	        	alert("세션이 만료되었습니다. 다시 로그인하세요.\n" + textStatus);
	        	// if(location.href.indexOf("/ti/") > 0)
                //     location.href = "/ti/login";
                // else
                location.href = "/";
	        } else {
	        	alert("처리 중 에러가 발생하였습니다.");
	        }
        },
        complete : function(xhr, status) {

            if (isLodingBool) {
                loader.remove();
            }

            if(fn_complete != null || fn_complete != undefined){
                fn_complete(xhr);
            }
        }
    });
}


/**
 * @name         : ajax
 * @description  : ajax 통신 (csrf 토큰 미포함)
 * @date         :
 * @author	     :
 */
function ajaxExcludeCSRF(isLodingBool, url, isLodingElement, beforeSendText, ajaxParam, fn_success, fn_complete) {

    var loader = isLoading($(isLodingElement)[0], {
        type: "overlay",
        class : "fa fa-refresh fa-spin",
        text: beforeSendText
    });

    $.ajax({
        url : url,
        type : 'POST',
        contentType : "application/json",
        data : JSON.stringify(ajaxParam),
        dataType : "json",
        beforeSend : function(xhr) {
            if (isLodingBool) {
                loader.loading();
            }
        },
        success : function(data) {
            if(fn_success != null || fn_complete != undefined){
                fn_success(data);
            }else{

            }
        },
        error : function(jxhr, textStatus) {
            alert("처리중 에러가 발생하였습니다.");
        },
        complete : function(xhr, status) {

            if (isLodingBool) {
                loader.remove();
            }

            if(fn_complete != null || fn_complete != undefined){
                fn_complete(xhr);
            }
        }
    });
}


/**
 * @name         : getCookie
 * @description  : 쿠키정보를 가져온다
 * @date         :
 * @author	     :
 */
function getCookie( name ) {
   var nameOfCookie = name + "=";
   var x = 0;
   while ( x <= document.cookie.length )
   {
       var y = (x+nameOfCookie.length);
       if ( document.cookie.substring( x, y ) == nameOfCookie ) {
           if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
               endOfCookie = document.cookie.length;
           return unescape( document.cookie.substring( y, endOfCookie ) );
       }
       x = document.cookie.indexOf( " ", x ) + 1;
       if ( x == 0 )
           break;
   }
   return "";
}

/**
 * @name         : setCookieAt00
 * @description  : 새벽  00:00:00 까지 쿠키 설정
 * @date         :
 * @author	     :
 */
function setCookieAt00( name, value) {
	var todayDate = new Date();
	todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
	todayDate.setDate( todayDate.getDate());
	// SameSite=None; Secure 적용하였기 때문에 https에서만 적용 됨.
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + "; SameSite=None; Secure";
}

/**
 * @name         : setCookie
 * @description  : 클릭한 시간까지 쿠키 설정
 * @date         :
 * @author	     :
 */
function setCookie( name, value, exp) {
  var date = new Date();
  date.setTime(date.getTime() + exp*24*60*60*1000);
  document.cookie = namae + '=' + value + ';expires=' + date.toUTCString() + ';path=/; SameSite=None; Secure';
}

// =====KENDO 관련=====
/**
 * @name           : setDatePicker
 * @description  : kendoDatePicker 공통 초기화
 * @date             : 2024. 08. 27
 * @author	       : 김경룡
 * @etc               : start/dpth = "month"는 yyyyMMdd, "year" 은 yyyyMM, "decade"는 yyyy
 */
function setDatePicker(ipId, bsVal, minVal, maxVal, format, dept) {
	$(ipId).kendoDatePicker({
		value: bsVal,
		min: minVal,
		max: maxVal,
		format: format,
		parseFormats: [format],
		start: dept,
    	depth: dept
	});
	$(ipId).prop("readonly", true);
}

/**
 * @name         : btnPeriodClick
 * @description  : 검색 기간 시작일 및 종료일 세팅
 * @date         :
 * @author	     :
 */
function btnPeriodClick(fromDate, toDate, no){
	$("#" + toDate).data("kendoDatePicker").value(moment().toDate());
	$("#" + fromDate).data("kendoDatePicker").value(moment().add(no,"month").toDate());
}

/**
 * @name         : valickFromtoDate
 * @description  : 검색 기간 시작일 및 종료일 비교
 * @date         :
 * @author	     :
 */
function valickFromtoDate(fromDateVal, toDateVal, period) {
	if (nvl(fromDateVal) != "" && nvl(toDateVal) != "") {
		if (fromDateVal > toDateVal) {
			alert("시작일은 종료일보다 늦을 수 없습니다.");
			return false;
	   	}

		// 날짜 차이 계산
		if (period != null) {
			var sdt = new Date(dateFormatting(fromDateVal));
			var edt = new Date(dateFormatting(toDateVal));

			if ((edt.getTime() - sdt.getTime()) / (1000 * 60 * 60 * 24) >= period) {
				alert("조회기간은 " + period + "일 이내로 설정하세요.");
				return false;
			}
		}
	} else {
        alert("조회일자를 선택해주세요.");
        return false;
    }

	return true;
}


function outCheckByte(obj){

	var flag = false;
	 // 한글 포함 byte수 변환
    var strByteLength = function(s,b,i,c){
        for(b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
        return b
    };

    var maxLength = obj.attr('maxlength');
    var valLength = strByteLength(obj.val());

    if(valLength > maxLength) {
    	flag = true;
    }
    return flag;
}

/**
 * @name         : toTelNum
 * @description  : 전화번호 형태로 변환
 * @date         :
 * @author	     :
 */
function toTelNum(strP) {
    if(strP == null ||  strP == '') {
        return '';
    }else if(strP == '*') {
        return '*';
    }else {
        var str = strP.replace(/[^0-9]/g, '');
        var tmp = '';
        if( str.length < 4){
            return str;
        }else if(str.length < 7){
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3);
            return tmp;
        }else if(str.substr(0, 2) == '02'){
            if (str.length == 9) {
				var re = /(\d{2})(\d{3})(\d{4})/;
                return str.replace(re, "$1-$2-$3");
            } else {
				var re = /(\d{2})(\d{4})(\d{4})/;
                return str.replace(re, "$1-$2-$3");
            }
        }else if(str.length < 11){
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3, 3);
            tmp += '-';
            tmp += str.substr(6);
            return tmp;
        }else{
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3, 4);
            tmp += '-';
            tmp += str.substr(7);
            return tmp;
        }
        return str;
    }
}

/**
 * @name         : format
 * @description  : Data format string
 * @date         :
 * @author	     :
 */
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

/**
 * @name         : pdfView
 * @description  : pdf파일 첫페이지 프리뷰
 * @date         : 2020.04.20
 * @author	     : 강보경
 *
 * <canvas class="pdfCanvas" style="width:100%; height:100%;"></canvas>
 */
pdfView = function(obj, afterFuntion) {
    var pdfjsLib = window['pdfjs-dist/build/pdf'];
    // pdfjsLib.GlobalWorkerOptions.workerSrc = contextPath+'/ext-lib/mozilla.pdf/pdf.worker.js';
    pdfjsLib.GlobalWorkerOptions.workerSrc = contextPath+'/ext-lib/mozilla.pdf/pdf.worker.min.js';

    var file = $(obj)[0].files[0];
    if(file.type == "application/pdf"){
        var fileReader = new FileReader();
        fileReader.onload = function() {
            var pdfData = new Uint8Array(this.result);
            // Using DocumentInitParameters object to load binary data.
            var loadingTask = pdfjsLib.getDocument({data: pdfData});
            loadingTask.promise.then(function(pdf) {
                console.log('PDF loaded');

                // Fetch the first page
                var pageNumber = 1;
                pdf.getPage(pageNumber).then(function(page) {
                    console.log('Page loaded');

                    var scale = 1.5;
                    var viewport = page.getViewport({scale: scale});

                    // Prepare canvas using PDF page dimensions
                    var canvas = $(obj).siblings(".pdfCanvas")[0];
                    var context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    // Render PDF page into canvas context
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    var renderTask = page.render(renderContext);
                    renderTask.promise.then(function () {
                        console.log('Page rendered');
                        afterFuntion();
                    });
                });
            }, function (reason) {
                // PDF loading error
                console.error(reason);
            });
        };
        fileReader.readAsArrayBuffer(file);
    }
}

/**
 * @name         : 공통코드목록
 * @description  : ajax 통신
 * @date         : CD_CL
 * @author	     :
 */
function getCodeData(cdCl, fn_success, fn_complete){

	var cdata = {};
	cdata.cdCl = cdCl;

    var header = $("meta[name='_csrf_header']").attr("content");
    var token  = $("meta[name='_csrf']").attr("content");

	$.ajax({
		url	: contextPath+'/cmmn/CommonCode.do',
        type : 'POST',
        contentType : "application/json",
        data : JSON.stringify(cdata),
		dataType: "json",
        beforeSend : function(xhr) {
        	xhr.setRequestHeader(header, token);
        },
		success : function(data) {
            if(fn_success != null || fn_success != undefined){
                fn_success(data);
            }else{

            }
		},
		error 	: function(xhr, status){
			cds = null;
            alert("처리중 에러가 발생하였습니다.");
		},
        complete : function(xhr, status) {
            if(fn_complete != null || fn_complete != undefined){
                fn_complete(xhr);
            }
        }
	});
}

/**
 * @name         : fnCreateDialog
 * @description  : 다이얼로그 생성
 * @date         :
 * @author       :
 */
function fnCreateDialog(dialog_id) {
    var templateString = "<div id='#: dialog_id #'></div>";
    var template = kendo.template(templateString);

    if ($("#" + dialog_id).length > 0) {
        // 동일 다이얼로그 삭제 후 띄움
        $("#" + dialog_id).parent().remove();
    }

    $("#dialog").html(template({ dialog_id: dialog_id }));

    return $("#" + dialog_id);
}

//개인식별정보 포함여부
function getPrvYn() {
    var havingPrvYnTag = $("[data-menu-id=" + sessionMenuId + "]");
    var prvYn = $(havingPrvYnTag).data("prvYn");
    return prvYn;
}

// 엑셀다운 사유값 검증
function validateExcelDownReason(reason) {
    if (!reason || reason.trim().length < 20) {
        alert('다운로드 사유는 20자 이상 입력하셔야 합니다.');
        return false;
    }

    var specialCharacterReg = /[^\w\sㄱ-힣.]|[\_]/g;
    if (specialCharacterReg.test(reason)) {
        alert('특수문자는 포함할 수 없습니다.');
        return false;
    }

    return true;
}

//개인정보가 포함된 엑셀자료일 경우 팝업을 띄움. 아니면 바로 다운로드
function excelDown(excelPath, params, fileNm, cnt = 0) {
	const MAX_DOWNLOAD_COUNT = 10000;	// 다운로드 가능한 최대 row 수

	if (cnt > MAX_DOWNLOAD_COUNT) {
		alert("현재 다운로드 요청 건수는 " + cnt + "건 입니다. 최대 " + MAX_DOWNLOAD_COUNT + "건 까지만 다운로드가 가능합니다. 검색 조건을 설정하여 " + MAX_DOWNLOAD_COUNT + "건 이하로 조회 후 다운로드 하세요.");
		return;
	} else {
		ajax(false, contextPath+"/cmmn/selectPrvYn", "", "", {menuCd: sessionMenuId}, function(result) {
			if (result != null) {
				var prvYn = result[0].prvc_idntf_yn;

				if (prvYn === "Y") {
					if ($("#elxExcelDownReason").length === 0) {
						var $excelDownReasonInput = '<input type="hidden" id="elxExcelDownReason" name="excelDownReason" />';
						$(".sub03").append($excelDownReasonInput);
					}
					$("#excelDownReasonPopup").remove();


					var dialogCont = '<div id="excelDownReasonPopup" class="popup popup_type02 view">';
					dialogCont    += '    <div class="box">';
					dialogCont    += '        <div class="popup_top">';
					dialogCont    += '            <h4>엑셀다운로드</h4>';
					dialogCont    += '            <div class="close">';
					dialogCont    += '            <span></span>';
					dialogCont    += '            <span></span>';
					dialogCont    += '            </div>';
					dialogCont    += '        </div>';
					dialogCont    += '        <div class="content">';
					dialogCont 	  += '            <table class="rental_tb01 tb cont">';
					dialogCont    += '				<tr>';
					dialogCont    += '					<th colspan="2">개인정보가 포함된 자료를 다운로드하기 위해선 사유가 필요합니다.</th>';
					dialogCont    += '				</tr>';

					dialogCont    += '				<tr>';
					dialogCont    += '					<th>사유입력</th>';
					dialogCont    += '					<td class="textarea_wr"><textarea class="noteBox" rows="5" id="excelDownReason" maxlength="4000"  placeholder = "사유입력(최소 20자 이상 입력하세요) "></textarea></td>';
					dialogCont    += '              </tr>';

					dialogCont    += '              </table>';
					dialogCont    += '              <div class="btn_flex" style="margin-top: 22px;">';
					dialogCont    += '                  <button class="blue_btn" id="btnExcelDownload">다운로드</button>';
					dialogCont    += '                  <button class="gray_btn" id="btnClose">취소</button>';
					dialogCont    += '			  </div>';
					dialogCont    += '		  </div>';
					dialogCont    += '	  </div>';
					dialogCont    += '</div>';

					$(document).on("click", ".close", function() {
						$("#excelDownReasonPopup").removeClass("view");
					});

					$(document).on("click", "#btnClose", function() {
						$('#excelDownReasonPopup .close').click();
					});

					$(document).off("click", "#btnExcelDownload").on("click", "#btnExcelDownload", function() {
						var excelDownReason = $("#excelDownReason").val();
						if(validateExcelDownReason(excelDownReason)){
							params.excelDownReason = $("#excelDownReason").val();
							excelDownAjax(excelPath, params, fileNm);
							$("#excelDownReasonPopup").removeClass("view");
						}
					});

					$(".sub03").append(dialogCont);
					$("#excelDownReasonPopup").addClass("view");

				} else if (prvYn === "N" || prvYn === "") {
					excelDownAjax(excelPath, params, fileNm);
				}
			}
		});
	}
}

function excelDownAjax(excelPath, downFormName, fileNm) {
    var loader = isLoading($('body')[0], {
        type: "overlay",
        class : "fa fa-refresh fa-spin",
        text: "엑셀파일을 생성하는 중입니다."
    });

    /* 지점명을 배열로 보내기 위해 ajax post 로 보내고 엑셀 파일 받도록 구현 함.
     * Json ajax는 구현에 문제가 있어 네이티브 ajax 방식으로 구현
     * */

//    var params = fn_getFormData($(downFormName));

	var xhr = new XMLHttpRequest();
    // url따오기
//    var link = document.location.href;
//    var linkFileName = link.substr(link.lastIndexOf('/')+1);
//    if (linkFileName.indexOf('.do') != -1) {
//        linkFileName = linkFileName.slice(0, -3);
//    }
	var today = new Date();
	var year = ('' + today.getFullYear()).slice(-2);
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	var hours = ('0' + today.getHours()).slice(-2);
	var minutes = ('0' + today.getMinutes()).slice(-2);
	var dateString = year + month + day + hours + minutes;

    var linkFileName = fileNm + '_' + dateString + '.xlsx';
	var osCheck = window.navigator.platform.toLowerCase(); // win, mac이면 pc환경

	function isMobileWeb() {
	    var userAgent = navigator.userAgent.toLowerCase();
	    return /inRimsApp/i.test(userAgent)
	}

//	function isInApp() {
//	    // 일반적으로 웹뷰에서는 특정 문자열을 사용자 에이전트에 추가하여 구별할 수 있습니다.
//	    // 이 문자열은 앱 개발자가 정의해야 합니다.
//	    // 예시: 'myappwebview'
//	    var userAgent = navigator.userAgent.toLowerCase();
//	    return /myappwebview/i.test(userAgent);
//	}

    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            loader.remove();

            if (window.navigator.msSaveOrOpenBlob) {
                var blob = this.response;

                window.navigator.msSaveBlob(blob, linkFileName);
            } else {

                var a = document.createElement("a");
                var url;
                if(	osCheck.includes('win') ||
                	osCheck.includes('mac') ||
                	osCheck.includes('iphone') ||
                	!isMobileWeb()
                	){
					// WEB + IPHONE
					url = URL.createObjectURL(this.response);

	                a.href = url;
	                a.download = linkFileName;
	                document.body.appendChild(a);
	                a.click();
	                window.URL.revokeObjectURL(url);
				}else{
					// ETC
					var reader = new FileReader();
					reader.readAsDataURL(this.response);
					reader.onloadend = function(){
						const base64data = reader.result;
		            	ocrInterface.getBase64FromBlobData(base64data);
		            }
				}
            }
        } else if (this.readyState == 1) {
            loader.loading();
        }
    }

    xhr.open('POST', contextPath + excelPath);
    xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.responseType = 'blob'; // !!필수!!
    console.log(downFormName)
    xhr.send(JSON.stringify(downFormName)); // 파라미터 설정
}


/**
 * @name			: kendoExcelAOPAcc
 * @description	: kendoExcelExport AOP 접근제어 테스트중
 * @date				: 2024. 11. 04
 * @author			: 김경룡
 */
function kendoExcelAOPAcc(a_data, accUrl) {
	console.log('연결')
	console.log(sessionMenuId)
	return new Promise((resolve, reject) => {
		syncAjax(false, false, contextPath + "/cmmn/selectPrvYn", "", "", {menuCd: sessionMenuId}, function(result) {
	        if (result != null) {  // 여기 조건문 메뉴ID가 없으면 에러날수있음. 체크 필요
	            var prvYn = result[0].prvc_idntf_yn;
	
				if (prvYn === "Y") {
//				if(1){
					if ($("#elxExcelDownReason").length === 0) {
						var $excelDownReasonInput = '<input type="hidden" id="elxExcelDownReason" name="excelDownReason" />';
						$(".sub03").append($excelDownReasonInput);
					}
					$("#excelDownReasonPopup").remove();
	
					var dialogCont = '<div id="excelDownReasonPopup" class="popup popup_type02 view">';
						dialogCont    += '    <div class="box">';
						dialogCont    += '        <div class="popup_top">';
						dialogCont    += '            <h4>엑셀다운로드</h4>';
						dialogCont    += '            <div class="close">';
						dialogCont    += '            <span></span>';
						dialogCont    += '            <span></span>';
						dialogCont    += '            </div>';
						dialogCont    += '        </div>';
						dialogCont    += '        <div class="content">';
						dialogCont 	  += '            <table class="rental_tb01 tb cont">';
						dialogCont    += '				<tr>';
						dialogCont    += '					<th colspan="2">개인정보가 포함된 자료를 다운로드하기 위해선 사유가 필요합니다.</th>';
						dialogCont    += '				</tr>';
	
						dialogCont    += '				<tr>';
						dialogCont    += '					<th>사유입력</th>';
						dialogCont    += '					<td class="textarea_wr"><textarea class="noteBox" rows="5" id="excelDownReason" maxlength="4000"  placeholder = "사유입력(최소 20자 이상 입력하세요) "></textarea></td>';
						dialogCont    += '              </tr>';
	
						dialogCont    += '              </table>';
						dialogCont    += '              <div class="btn_flex" style="margin-top: 22px;">';
						dialogCont    += '                  <button class="blue_btn" id="btnExcelDownload">다운로드</button>';
						dialogCont    += '                  <button class="gray_btn" id="btnClose">취소</button>';
						dialogCont    += '			  </div>';
						dialogCont    += '		  </div>';
						dialogCont    += '	  </div>';
						dialogCont    += '</div>';
	
					$(document).on("click", ".close", function() {
						$("#excelDownReasonPopup").removeClass("view");
					});
	
					$(document).on("click", "#btnClose", function() {
						$('#excelDownReasonPopup .close').click();
					});
	
					$(document).off("click", "#btnExcelDownload").on("click", "#btnExcelDownload", function() {
						var excelDownReason = $("#excelDownReason").val();
						if(validateExcelDownReason(excelDownReason)){
							var params = {
		                    	excelDownReason: $("#excelDownReason").val(),
		                        total: a_data.length
		                    };
		                    ajax(false, contextPath + accUrl, "", "", params, function(result) {resolve(true);});
							$("#excelDownReasonPopup").removeClass("view");
						}
					});
	
					$(".sub03").append(dialogCont);
					$("#excelDownReasonPopup").addClass("view");
				} else {
					var params = {total: a_data.length};
		            ajax(false, contextPath + accUrl, "", "", params, function(result) {resolve(true);});
				}
	        };
	    });
	});
}

function showExcelReasonPopup(callback) {
    if ($("#elxExcelDownReason").length === 0) {
        var $excelDownReasonInput = '<input type="hidden" id="elxExcelDownReason" name="excelDownReason" />';
        $(".sub03").append($excelDownReasonInput);
    }

    $("#excelDownReasonPopup").remove(); // 기존 팝업 제거

    var dialogCont = '<div id="excelDownReasonPopup" class="popup popup_type02 view">';
    dialogCont    += '    <div class="box">';
    dialogCont    += '        <div class="popup_top">';
    dialogCont    += '            <h4>엑셀다운로드</h4>';
    dialogCont    += '            <div class="close">';
    dialogCont    += '            <span></span>';
    dialogCont    += '            <span></span>';
    dialogCont    += '            </div>';
    dialogCont    += '        </div>';
    dialogCont    += '        <div class="content">';
    dialogCont    += '            <table class="rental_tb01 tb cont">';
    dialogCont    += '                <tr><th colspan="2">개인정보가 포함된 자료를 다운로드하기 위해선 사유가 필요합니다.</th></tr>';
    dialogCont    += '                <tr>';
    dialogCont    += '                    <th>사유입력</th>';
    dialogCont    += '                    <td class="textarea_wr"><textarea class="noteBox" rows="5" id="excelDownReason" maxlength="4000" placeholder="사유입력(최소 20자 이상 입력하세요) "></textarea></td>';
    dialogCont    += '                </tr>';
    dialogCont    += '            </table>';
    dialogCont    += '            <div class="btn_flex" style="margin-top: 22px;">';
    dialogCont    += '                <button class="blue_btn" id="btnExcelDownload">다운로드</button>';
    dialogCont    += '                <button class="gray_btn" id="btnClose">취소</button>';
    dialogCont    += '            </div>';
    dialogCont    += '        </div>';
    dialogCont    += '    </div>';
    dialogCont    += '</div>';

    $(".sub03").append(dialogCont);
    $("#excelDownReasonPopup").addClass("view");

    // 팝업 닫기 이벤트
    $(document).on("click", ".close, #btnClose", function() {
        $("#excelDownReasonPopup").removeClass("view");
    });

    // 다운로드 버튼 클릭 시
    $(document).off("click", "#btnExcelDownload").on("click", "#btnExcelDownload", function() {
        var excelDownReason = $("#excelDownReason").val();
        callback(excelDownReason); // 입력된 사유를 콜백으로 전달
        $("#excelDownReasonPopup").removeClass("view"); // 팝업 닫기
    });
}

/**
 * 엑셀 파일 스트리밍 다운로드 관련 객체 - 연속 요청 제한용
 * @since 240401
 * @author 정영훈
 */
var preventRepeatRequest = (function() {
    var isRequest = false;
    var blockDuration = 1500; // 1.5초 제한

    return function() {
        if (isRequest) {
            var message = "이미 진행 중인 다운로드가 존재하는 경우,"
            message += "\n\n다운로드가 완료된 뒤에 요청해 주세요."
            alert(message);
            return isRequest;
        }
        isRequest = true;
        setTimeout(function() {
            isRequest = false;
        }, blockDuration);
    };
})();

/**
 * 엑셀 파일 스트리밍 다운로드 관련 객체 - grid와 excel 요청하는 조회 조건 비교용
 * @since 240401
 * @author 정영훈
 */
var searchFilterForExcelStream = {
	params: null,
	setData : function(requestParams) {
		//키값 검증:kendoGrid 페이징 처리 속성이 있으면 제거하고 비교
		var forbiddenProperties = ['page', 'pageSize', 'skip', 'take'];
		forbiddenProperties.forEach(prop => {
            if (requestParams.hasOwnProperty(prop)) {
                delete requestParams[prop];
            }
        });
		this.params = requestParams; 
	},  
	getData : function() { return this.params; }
}

/**
 * 엑셀 파일 스트리밍 다운로드
 * @param {string} path 요청할 Controller 경로
 * @param {Object} params 엑셀 다운 조회 조건
 * @param {number} total 데이터의 총 row 개수
 * @since        : 240401
 * @author       : 정영훈
 */
function excelDownStream(path, params, total) {
	// check: 연속으로 클릭하는가? 
	preventRepeat();
	function preventRepeat(){
		var isRequest = preventRepeatRequest();
		if(!isRequest){
			paramsEqual(path, params, total);
		}
		return;
	}	

	/**
	 * 객체에서 빈값 제거
	 */
	function removeEmptyKeys(obj) {
		for(var key in obj) {
			if (obj[key] === "" || obj[key] === null || obj[key] === undefined ) {
	            delete obj[key];
	        }
		}
	}
	/**
	 * 조회 조건과 엑셀 요청 조건이 일치하는지 비교
	 */
	function isParamsEqual(excelObj) {
		removeEmptyKeys(excelObj);
		
		var searchObj = searchFilterForExcelStream.getData();
		removeEmptyKeys(searchObj);
		
	    var excelParams = JSON.stringify(excelObj);
		var searchParams = JSON.stringify(searchObj);
		
		return searchParams === excelParams;
	}

	// check: 조회한 조건과, 엑셀 조건이 서로 일치하는가?
	function paramsEqual(path, params, total){
		var preprocessParams = Object.assign({}, params);
		if(!isParamsEqual(preprocessParams)){
			var message = "'현재 조회된 조회 조건'과\n'엑셀을 요청하는 조회 조건'이 서로 다릅니다."
	            message += "\n\n조건 재설정 또는 변경한 조건으로 조회 후 엑셀을 요청하세요."
	        alert(message);
	        return;
		}
		checkTotalCnt_fromClient(path, params, total);
	} 
	
	function limitRow(total){
		var limit = {
			count: 100000, //100_000
			korean: "10만"
		}
		var overLimitMessage = "요청하신 데이터가 "+ limit.korean +" 건을 초과하였습니다.";
			overLimitMessage += "\n\n조회 조건을 다시 설정하여 "+ limit.korean +" 건 이하로 요청해 주세요.";
		if(total > limit.count){
			alert(overLimitMessage);
			return false;
		}
		return true;
	}
	// check: 제한 건수를 초과하는가?
	function checkTotalCnt_fromClient(path, params, total){
		if(total === undefined || total === ''){
			console.error("개별 페이지에서 total 값을 인자로 전달 필요");
			return;
		}   
		if(limitRow(total)){
			params.total = total;
			checkDownloadStatus(path, params); 
			//checkTotalCnt_fromServer(params); (중단: check: 제한 건수 서버체크 )
		}
	}
	
	/**
	// 중단: check: 제한 건수 서버체크 
	function checkTotalCnt_fromServer(params){
		serverCount(params)
			.then(cnt => {
				if(cnt == 0){
					alert("데이터가 존재하지 않습니다.\n조회 조건을 확인해 주세요.");
					return;
				}
				if(limitRow(cnt)){
					params.total = parseInt(cnt);
					checkDownloadStatus(excelPath, params);
				}
			})
			.catch(error => {
		        console.error('엑셀 스트리밍 데이터양 체크 serverCount2:', error);
		    });
	}
	// 중단: check: 제한 건수 서버체크
	function serverCount(params) {
		const csrfToken = $("meta[name='_csrf']").attr("content");
		return new Promise((resolve, reject) => {
			
			fetch(contextPath + excelPath + '/cnt', {
				method: 'POST',
				headers:{
					'Content-Type': 'application/json',
	   				'X-CSRF-TOKEN': csrfToken 
				},
				body: JSON.stringify(params) 
			})
			.then(response => {
				if(!response.ok){
					throw new Error("응답 오류가 발생했습니다.")
				}
				return response.text();
			})
			.then(data => {
				resolve(data);
			})
			.catch((error) => {
			  console.error('엑셀 스트리밍 데이터양 체크 serverCount1', error);
			  reject(error);
			});
		})
	}
	*/
	
	//check : 진행 중인 다운로드 존재하는가? 서버 체크
	function checkDownloadStatus(excelPath, params) {
	    const csrfToken = $("meta[name='_csrf']").attr("content");
		
		fetch(contextPath + excelPath + '/isProgress', {
			method: 'GET',
        	headers: {'X-CSRF-TOKEN': csrfToken}
		})
		.then(response => {
			if (!response.ok) {
				throw new Error("서버에서 다운로드 상태 확인에 실패하였습니다.")
            }
            return response.text();
		})
		.then(serverProgress => {
			 if (serverProgress === "true") {
				var message = "이미 진행 중인 다운로드가 존재합니다."
				message += "\n진행 중인 다운로드가 완료된 뒤에 요청해 주세요."
				message += "\n\n** 다운로드 도중 취소를 한 경우, 잠시 후에 다시 요청해 주세요."
            	alert(message);
	        } else {
				excelDownReasonForStream(excelPath, params);
	        }
		})
		.catch(error => {
	        console.error('처리 중 오류 발생:', error);
   		});
	}
	
	// check : 개인정보 포함한 데이터인가? 서버체크
	function excelDownReasonForStream(excelPath, params) {
	    ajax(false, contextPath + "/cmmn/selectPrvYn", "", "", { menuCd: sessionMenuId }, function(result) {
	        if (result != null) {
	            var prvYn = result[0].prvc_idntf_yn;
	
	            if (prvYn === "Y") {
	                createExcelDownReasonPopup(excelPath, params);
	            } else if (prvYn === "N" || prvYn === "") {
	                requestStream(excelPath, params);
	            }
	        }
	    });
	}
	function createExcelDownReasonPopup(excelPath, params) {
	    if ($("#elxExcelDownReason").length === 0) {
	        $(".sub03").append('<input type="hidden" id="elxExcelDownReason" name="excelDownReason" />');
	    }
	
	    $("#excelDownReasonPopup").remove();
	
	    var dialogCont = `
	        <div id="excelDownReasonPopup" class="popup popup_type02 view">
	            <div class="box">
	                <div class="popup_top">
	                    <h4>엑셀다운로드</h4>
	                    <div class="close">
	                        <span></span>
	                        <span></span>
	                    </div>
	                </div>
	                <div class="content">
	                    <table class="rental_tb01 tb cont">
	                        <tr>
	                            <th colspan="2">개인정보가 포함된 자료를 다운로드하기 위해선 사유가 필요합니다.</th>
	                        </tr>
	                        <tr>
	                            <th>사유입력</th>
	                            <td class="textarea_wr"><textarea class="noteBox" rows="5" id="excelDownReason" maxlength="4000" placeholder="사유입력(최소 20자 이상 입력하세요) "></textarea></td>
	                        </tr>
	                    </table>
	                    <div class="btn_flex" style="margin-top: 22px;">
	                        <button class="blue_btn" id="btnExcelDownload">다운로드</button>
	                        <button class="gray_btn" id="btnClose">취소</button>
	                    </div>
	                </div>
	            </div>
	        </div>`;
	
	    $(".sub03").append(dialogCont);
	    $("#excelDownReasonPopup").addClass("view");
	
	    $(document).on("click", ".close", function() {
	        $("#excelDownReasonPopup").removeClass("view");
	    });
	
	    $(document).on("click", "#btnClose", function() {
	        $('#excelDownReasonPopup .close').click();
	    });
	
	    $(document).off("click", "#btnExcelDownload").on("click", "#btnExcelDownload", function() {
	        var excelDownReason = $("#excelDownReason").val();
	        if (validateExcelDownReason(excelDownReason)) {
	            params.excelDownReason = excelDownReason;
	            requestStream(excelPath, params);
	            $("#excelDownReasonPopup").removeClass("view");
	        }
	    });
	}
	
	function requestStream(excelPath, params) {
	    const csrfToken = $("meta[name='_csrf']").attr("content");
	    const url = contextPath + excelPath;
	    const formData = new FormData();
	    formData.append('params', JSON.stringify(params));
	
	    // 새로운 폼 요소 생성
	    const form = document.createElement('form');
	    form.method = 'POST';
	    form.action = url;
	    form.style.display = 'none';
	
	    // 폼에 CSRF 토큰 추가
	    const csrfInput = document.createElement('input');
	    csrfInput.type = 'hidden';
	    csrfInput.name = '_csrf';
	    csrfInput.value = csrfToken;
	    form.appendChild(csrfInput);
	
	    // 폼에 파라미터 추가
	    const paramsInput = document.createElement('input');
	    paramsInput.type = 'hidden';
	    paramsInput.name = 'params';
	    paramsInput.value = JSON.stringify(params);
	    form.appendChild(paramsInput);
	
	    // body에 폼 추가
	    document.body.appendChild(form);
	
	    // 폼 서브밋 및 폼 제거
	    form.submit();
	    document.body.removeChild(form);
	}
}

// IE10 map
CustomMap = function(){
   this.map = new Object();
};

CustomMap.prototype = {
    put : function(key, value){
        this.map[key] = value;
    },
    set : function(key, value){
        if (key in this.map) {
            delete this.map[key];
        }

        this.map[key] = value;
    },
    get : function(key){
        if(this.size() == 0)
        return '';
        return this.map[key];
    },
    containsKey : function(key){
        return key in this.map;
    },
    containsValue : function(value){
        for(var prop in this.map){
            if(this.map[prop] == value) return true;
        };
        return false;
    },
    isEmpty : function(){
        return (this.size() == 0);
    },
    clear : function(){
        for(var prop in this.map){
            delete this.map[prop];
        };
    },
    remove : function(key){
        delete this.map[key];
    },
    keys : function(){
        var keys = new Array();
        for(var prop in this.map){
            keys.push(prop);
        };
        return keys;
    },
    values : function(){
        var values = new Array();
        for(var prop in this.map){
            values.push(this.map[prop]);
        };
        return values;
    },
    size : function(){
        var count = 0;
        for (var prop in this.map) {
            count++;
        };
        return count;
    }
};

/**
 * 메뉴조회
 */
function defaultMenuInfoList(){
	ajax(false, contextPath + "/ma/main/menuInfoList", '', '', {}, function(data) {
         if (data.success) {
			// 메뉴조회시
			
			/**
			 * @author : 김경룡
			 * @date : 2024.09.02
			 * @description : 기존 order 숫자로 height를 구하니 9가 최대라서 메뉴 갯수로 다시 작성
			*/
			var upMenuCdCount = data.menuInfoList.reduce((acc, item) => {
				var { upMenuCd } = item;
				acc[upMenuCd] = (acc[upMenuCd] || 0) + 1;
					return acc;
			}, {});
			
			var maxNumber = Math.max(...Object.values(upMenuCdCount));
			
			/* 기존코드 */
//			const numbers = data.menuInfoList.map(item => {
//			  if (Array.isArray(item.path) && item.path.length >= 2) {
//			    return Number(item.path[1]);
//			  }
//			  return 0; 
//			});
//			const filteredNumbers = numbers.filter(num => !isNaN(num));
//			const maxNumber = Math.max(...filteredNumbers);
			
			if(maxNumber > 6){
				var dynamicChange = maxNumber - 6;
				dynamicChange = (dynamicChange*35)+300

				let rootAfterStyle = document.createElement("style");
				// 1번 css -> gnb클릭시 높이 고정
				// 2번 css -> 해당구문 삭제시 gnb항목 클릭 후 추가된 메뉴사라짐
				// 3번 css -> 해당구문 삭제시 gnb사라짐
				// 4번 css -> 해당구문 삭제시 gnb사라짐
				rootAfterStyle.innerHTML =
				`
				.header .gnb:focus-within::before {
					height: ${dynamicChange}px;
				}

				.header .gnb-wr .gnb:focus-within > li .depth-wr {
					height: 100%;
					min-height: ${dynamicChange}px;
				}

				.header .gnb-wr .gnb:hover > li .depth-wr {
					height: 100%;
					min-height: ${dynamicChange}px;
				}

				.header .gnb-wr .pcGnb:hover::before {
					height: ${dynamicChange}px;
					max-height: ${dynamicChange}px;
					min-height: ${dynamicChange}px;
					overflow:visible;
					transition: .3s;
					transition-property: height;
				}
				`;
				document.head.appendChild(rootAfterStyle);
			}
	        let menuHtml = '';
//	        if (data.menuInfoList) {
//		        data.menuInfoList.forEach((menuItem) => {
//		            if (menuItem.depth === 1) {
//		                menuHtml += `<li><a href="#" class="titFont">${menuItem.menuNm}</a>`;
//		                let submenuHtml = '';
//		                data.menuInfoList.forEach((submenuItem) => {
//		                    if (submenuItem.depth === 2 && submenuItem.upMenuCd === menuItem.menuCd) {
//		                        submenuHtml += `<li><a href="${contextPath}/${submenuItem.menuUrl}">- ${submenuItem.menuNm}</a></li>`;
//		                    }
//		                });
//		                if (submenuHtml !== '') {
//		                    menuHtml += `<ul class="depth-wr"><li><p class="titFont">${menuItem.menuNm}</p><ul class="depth">${submenuHtml}</ul></li></ul>`;
//		                }
//		                menuHtml += '</li>';
//		            }
//		        });
//
//		        $("ul.pcGnb").html(menuHtml);
//			}


//			if (data.menuInfoList) {
//			    data.menuInfoList.forEach((menuItem) => {
//			        if (menuItem.depth === 1) {
//			            let firstSubmenuUrl = ''; // 첫 번째 서브 메뉴 URL을 저장하기 위한 변수
//			            let submenuHtml = '';
//			            data.menuInfoList.forEach((submenuItem, index) => {
//			                if (submenuItem.depth === 2 && submenuItem.upMenuCd === menuItem.menuCd) {
//			                    if (index === 1) { // 첫 번째 서브 메뉴 URL 저장
//			                        firstSubmenuUrl = `${contextPath}/${submenuItem.menuUrl}`;
//			                    }
//			                    submenuHtml += `<li><a href="${contextPath}/${submenuItem.menuUrl}">- ${submenuItem.menuNm}</a></li>`;
//			                }
//			            });
//			            if (submenuHtml !== '') {
//			                menuHtml += `<li><a href="${firstSubmenuUrl}" class="titFont">${menuItem.menuNm}</a>`;
//			                menuHtml += `<ul class="depth-wr"><li><p class="titFont">${menuItem.menuNm}</p><ul class="depth">${submenuHtml}</ul></li></ul>`;
//			            } else {
//			                menuHtml += `<li><a href="#" class="titFont">${menuItem.menuNm}</a></li>`;
//			            }
//			        }
//			    });
//
//			    $("ul.pcGnb").html(menuHtml);
//			}
			if (data.menuInfoList) {
			    data.menuInfoList.forEach((menuItem) => {
			        if (menuItem.depth === 1) {
			            let firstSubmenuUrl = ''; // 첫 번째 서브 메뉴 URL을 저장하기 위한 변수
			            let submenuHtml = '';
			            data.menuInfoList.forEach((submenuItem) => {
			                if (submenuItem.depth === 2 && submenuItem.upMenuCd === menuItem.menuCd) {
			                    // 첫 번째 서브 메뉴 URL 저장
			                    if (!firstSubmenuUrl) {
			                        firstSubmenuUrl = `${contextPath}/${submenuItem.menuUrl}`;
			                    }
			                    submenuHtml += `<li><a href="${contextPath}/${submenuItem.menuUrl}">- ${submenuItem.menuNm}</a></li>`;
			                }
			            });
			            if (submenuHtml !== '') {
			                menuHtml += `<li><a href="${firstSubmenuUrl}" class="titFont">${menuItem.menuNm}</a>`;
			                menuHtml += `<ul class="depth-wr"><li><p class="titFont">${menuItem.menuNm}</p><ul class="depth">${submenuHtml}</ul></li></ul>`;
			            } else {
			                menuHtml += `<li><a href="#" class="titFont">${menuItem.menuNm}</a></li>`;
			            }
			        }
			    });
			    $("ul.pcGnb").html(menuHtml);
			}else{
				$(".header .gnb").off("mouseover");
			}
	    }

		// 모바일
         if (data.success) {

	        let menuHtml = '';
	        if (data.menuInfoList) {
		        data.menuInfoList.forEach((menuItem) => {
		            if (menuItem.depth === 1) {
		                menuHtml += `<li class=""><a href="#" class="titFont">${menuItem.menuNm}</a>`;
		                let submenuHtml = '';
		                data.menuInfoList.forEach((submenuItem) => {
		                    if (submenuItem.depth === 2 && submenuItem.upMenuCd === menuItem.menuCd) {
		                        submenuHtml += `<li><a href="${contextPath}/${submenuItem.menuUrl}">- ${submenuItem.menuNm}</a></li>`;
		                    }
		                });
		                if (submenuHtml !== '') {
		                    menuHtml += `<ul class="gnb-depth">${submenuHtml}</ul>`;
		                }
		                menuHtml += '</li>';
		            }
		        });

		        $("ul.mobileGnb").html(menuHtml);
			} else{
				$(".header .gnb").off("mouseover");
			}
	    }
    });
}


/**
 * @author : 김경룡
 * @date : 2024.10.30
 * @description : kendoExcel사용테스트 중
*/
function syncAjax(choiceSync, isLodingBool, url, isLodingElement, beforeSendText, ajaxParam, fn_success, fn_complete) {

			var loader = isLoading($(isLodingElement)[0], {
				type: "overlay",
				class: "fa fa-refresh fa-spin",
				text: beforeSendText
			});

			var header = $("meta[name='_csrf_header']").attr("content");
			var token = $("meta[name='_csrf']").attr("content");

			$.ajax({
				url: url,
				type: 'POST',
				async: choiceSync,
				contentType: "application/json",
				data: JSON.stringify(ajaxParam),
				dataType: "json",
				beforeSend: function(xhr) {

					xhr.setRequestHeader(header, token);

					if (isLodingBool) {
						loader.loading();
					}
				},
				success: function(data) {
					if (fn_success != null || fn_complete != undefined) {
						fn_success(data);
					}
				},
				error: function(xhr, textStatus) {
					if (xhr.status == 401) {
						alert("권한이 없습니다. 사용자 인증이 필요합니다.");
					} else if (xhr.status == 403) {
						alert("세션이 만료되었습니다. 다시 로그인하세요.\n" + textStatus);
						location.href = "/rims";
					} else {
						alert("처리 중 에러가 발생하였습니다.");
					}
				},
				complete: function(xhr, status) {
					if (isLodingBool) {
						loader.remove();
					}
					$(".is-loading-element-overlay").remove();
					if (fn_complete != null || fn_complete != undefined) {
						fn_complete(xhr);
					}
				}
			});
		}