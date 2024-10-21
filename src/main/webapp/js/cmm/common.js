// ************************** header **************************

  //스크롤
  $(window).scroll(function(){
    if($(this).scrollTop() > 10 ) {
        $('.header').addClass('on');
      } else {
        $('.header').removeClass('on');
      }
  });

  //마우스오버 서브메뉴
  $('.header .gnb').on('mouseover', function(){
    $('.header').addClass('active');
  });

  $('.header .gnb').on('mouseleave', function(){
      $('.header').removeClass('active');
  });


  //햄버거버튼
  $('.ham_menu_btn').click(function(){
    $('.ham_menu').toggleClass('active');
  });
  $(".ham_menu .gnb").on("click", "> li", function () {
	  $(this).toggleClass('active');
	  $(this).siblings().removeClass('active');
	});
  $('.ham_menu_btn').click(function(){
    $('.ham_bg').toggleClass('active');
  });


  //권한신청 탭메뉴
  $('.authority_02 ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('.authority_02 ul.tabs li').removeClass('current');
    $('.authority_02 .tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  })


// ************************** 팝업 **************************

  // 권한신청 - 회사찾기 팝업
  $(".company_search").on("click",function(){
    $(".c_search_popup").addClass("view");
  });

  $(".c_search_popup .cancel_btn").on("click",function(){
    $(".c_search_popup").removeClass("view");
  });
  $(".c_search_popup .close").on("click",function(){
    $(".c_search_popup").removeClass("view");
  });

  //
  $(".company_search02").on("click",function(){
    $(".c_search_popup02").addClass("view");
  });
  $(".c_search_popup02 .cancel_btn").on("click",function(){
    $(".c_search_popup02").removeClass("view");
  });
  $(".c_search_popup02 .close").on("click",function(){
    $(".c_search_popup02").removeClass("view");
  });

  //
  $(".company_search03").on("click",function(){
    $(".c_search_popup03").addClass("view");
  });
  $(".c_search_popup03 .cancel_btn").on("click",function(){
    $(".c_search_popup03").removeClass("view");
  });
  $(".c_search_popup03 .close").on("click",function(){
    $(".c_search_popup03").removeClass("view");
  });


  // 권한신청 - 공동인증서 등록 팝업
  $(".cer_regis").on("click",function(){
    $(".cer_popup").addClass("view");
  });
  $(".popup .close").on("click",function(){
    $(".cer_popup").removeClass("view");
  });


  // 권한신청 - 공동인증서 등록 팝업
  $(".cer_regis_02").on("click",function(){
    $(".cer_popup02").addClass("view");
  });
  $(".cer_popup02 .close").on("click",function(){
    $(".cer_popup02").removeClass("view");
  });

  // 권한신청 - 회사정보입력 / 도로명주소 찾기 팝업
  $(".office_ad01").on("click",function(){
    $(".com_address01").addClass("view");
  });
  $(".com_address01 .cancel_btn").on("click",function(){
    $(".com_address01").removeClass("view");
  });
  $(".com_address01 .close").on("click",function(){
    $(".com_address01").removeClass("view");
  });

  // 권한신청 - 회사정보입력 / 지번주소 찾기 팝업
  $(".office_ad02").on("click",function(){
    $(".com_address02").addClass("view");
  });
  $(".com_address02 .cancel_btn").on("click",function(){
    $(".com_address02").removeClass("view");
  });
  $(".com_address02 .close").on("click",function(){
    $(".com_address02").removeClass("view");
  });

  // 권한신청 - 회사정보입력 / 차고지 도로명 주소 찾기 팝업
  $(".office_ad03").on("click",function(){
    $(".com_address03").addClass("view");
  });
  $(".com_address03 .cancel_btn").on("click",function(){
    $(".com_address03").removeClass("view");
  });
  $(".com_address03 .close").on("click",function(){
    $(".com_address03").removeClass("view");
  });

  // 운전자격검증 - 사진촬영 팝업
  $(".photo_btn").on("click",function(){
    $(".photo_popup").addClass("view");
  });
  $(".photo_popup .cancel_btn").on("click",function(){
    $(".photo_popup").removeClass("view");
  });
  $(".photo_popup .close").on("click",function(){
    $(".photo_popup").removeClass("view");
  });

  // 운전자격검증 - 모바일 면허증 팝업
  $(".license_btn").on("click",function(){
    $(".license_popup").addClass("view");
  });
  $(".license_popup .cancel_btn").on("click",function(){
    $(".license_popup").removeClass("view");
  });
  $(".license_popup .close").on("click",function(){
    $(".license_popup").removeClass("view");
  });

  // 운전자격검증 - 모바일 면허증 팝업
  $(".carNum_btn").on("click",function(){
    $(".carNum_popup").addClass("view");
  });
  $(".carNum_popup .cancel_btn").on("click",function(){
	$(".carNum_popup .k-grid-display-block").remove();
	$("#carNum_grid").remove();
	$(".carNum_popup .cont").append(
		`<table id="carNum_grid">
            <caption>대여차량 조회</caption>
        </table>`); 
    $(".carNum_popup").removeClass("view");
  });
  $(".carNum_popup .close").on("click",function(){
	$(".carNum_popup .k-grid-display-block").remove();
	$("#carNum_grid").remove();
	$(".carNum_popup .cont").append(
		`<table id="carNum_grid">
            <caption>대여차량 조회</caption>
        </table>`); 
    $(".carNum_popup").removeClass("view");
  });

  // 운전자격검증 - 운전면허 번호 규칙 가이드 팝업
  // $("button.info-btn").click(function (){
  // 	$(".rule_pop").toggle();
  // });

  $("button.info-btn").on("click",function(){
    $(".rule_pop").addClass("view");
  });
  $(".rule_pop .close").on("click",function(){
    $(".rule_pop").removeClass("view");
  });




  // 사업자관리 - 사업자등록 팝업
  $(".sub03 .register_btn").on("click",function(){
    $(".register_popup").addClass("view");
  });
  $(".register_popup .cancel_btn").on("click",function(){
    $(".register_popup").removeClass("view");
  });
  $(".register_popup .close").on("click",function(){
    $(".register_popup").removeClass("view");
  });

  // 사업자관리 - 사업자등록 팝업
  $(".sub03 #operator_grid tr").on("click",function(){
    $(".detail_popup").addClass("view");
  });
  $(".detail_popup .cancel_btn").on("click",function(){
    $(".detail_popup").removeClass("view");
  });
  $(".detail_popup .close").on("click",function(){
    $(".detail_popup").removeClass("view");
  });

  // 운전자격검증 - 사업자 상세 팝업 ->  도로명 주소 찾기 팝업
  $(".sub03 .office_ad01").on("click",function(){
    $(".com_address01").addClass("view");
  });
  $(".com_address01 .sm_close_btn").on("click",function(){
    $(".sub03 .com_address01").removeClass("view");
  });

  // 운전자격검증 - 사업자 상세 팝업 ->  지번주소찾기 팝업
  $(".sub03 .office_ad02").on("click",function(){
    $(".com_address02").addClass("view");
  });
  $(".com_address02 .sm_close_btn").on("click",function(){
    $(".sub03 .com_address02").removeClass("view");
  });

    // 운전자격검증 - 사업자 상세 팝업 ->  차고지도로명주소 찾기 팝업
  $(".sub03 .office_ad03").on("click",function(){
    $(".com_address03").addClass("view");
  });
  $(".com_address03 .sm_close_btn").on("click",function(){
    $(".sub03 .com_address03").removeClass("view");
  });

  // 운전자격검증 - 사업자 등록 팝업 ->  도로명 주소 찾기 팝업
  $(".sub03 .office_ad04").on("click",function(){
    $(".com_address01_2").addClass("view");
  });
  $(".com_address01_2 .sm_close_btn").on("click",function(){
    $(".sub03 .com_address01_2").removeClass("view");
  });

  // 운전자격검증 - 사업자 등록 팝업 ->  지번주소찾기 팝업
  $(".sub03 .office_ad05").on("click",function(){
    $(".com_address01_2").addClass("view");
  });
  $(".com_address01_2 .sm_close_btn").on("click",function(){
    $(".sub03 .com_address01_2").removeClass("view");
  });


  // 운전자격검증 - 사업자 등록 팝업 ->  차고지도로명주소 찾기 팝업
  $(".sub03 .office_ad06").on("click",function(){
    $(".com_address03_2").addClass("view");
  });
  $(".com_address03_2 .sm_close_btn").on("click",function(){
    $(".sub03 .com_address03_2").removeClass("view");
  });


  // 차량정보관리 - 엑셀 업로드 팝업
  $(".excel_upload").on("click",function(){
    $(".excel_upload_popup").addClass("view");
  });
  $(".excel_upload_popup .cancel_btn").on("click",function(){
    $(".excel_upload_popup").removeClass("view");
  });
  $(".excel_upload_popup .close").on("click",function(){
    $(".excel_upload_popup").removeClass("view");
  });


  // 차량등록관리 - 차량등록 팝업 / 사업자등록증 : 회사찾기
  $(".sub03_4 .v_Register01").on("click",function(){
    $(".sub03_4 .car_register01").addClass("view");
  });
  $(".sub03_4 .car_register01 .sm_close_btn").on("click",function(){
    $(".sub03_4 .car_register01").removeClass("view");
  });


  // 차량등록관리 - 차량상세 팝업 / 사업자등록증 : 회사찾기
  $(".v_Register02").on("click",function(){
    $(".car_register02").addClass("view");
  });
  $(".car_register02 .sm_close_btn").on("click",function(){
    $(".car_register02").removeClass("view");
  });


//오픈 API - API 이용 현황
  $(".sub03 #api_grid tr").on("click",function(){
    $(".detail_popup").addClass("view");
  });

// ************************** kendo **************************
  $(document).ready(function () {

    // 헤더 검색창
    $(".hr_search").kendoTextBox({
        placeholder: "검색어를 입력하세요",
        label: "헤더검색창"
    });

    //헤더 - 로그인 후 : 회원정보/권한신청/마이페이지 셀렉트
    $("#mem_select").kendoDropDownList();

    // 사이드메뉴 검색창
    $(".sidemenu_search").kendoTextBox({
      placeholder: "검색어를 입력하세요",
      label: "사이드메뉴검색창"
    });

    // 데이터피커
    $(".start-date").kendoDatePicker();
    $(".end-date").kendoDatePicker();
    $(".business_date").kendoDatePicker();


    // 운전자격검증 페이지 = 셀렉트
    var data = [
      { text: "서울", value: "1" },
      { text: "부산", value: "2" },
      { text: "인천", value: "3" },
      { text: "광주", value: "4" },
      { text: "대전", value: "5" },
    ];
    $("#num_plate").kendoDropDownList({
        // height: 400,
        dataSource: data,
        dataTextField: "text",
        dataValueField: "value",
    });

    // 권한신청 회사찾기 팝업 = 셀렉트
    var data = [
      { text: "회사명", value: "1" },
      { text: "회사명2", value: "2" },
      { text: "회사명3", value: "3" },
      { text: "회사명4", value: "4" },
    ];
    $("#popup_select").kendoDropDownList({
        dataSource: data,
        dataTextField: "text",
        dataValueField: "value",
    });

    //
    var data = [
      { text: "회사명", value: "1" },
      { text: "회사명2", value: "2" },
      { text: "회사명3", value: "3" },
      { text: "회사명4", value: "4" },
    ];
    $("#popup_select02").kendoDropDownList({
        dataSource: data,
        dataTextField: "text",
        dataValueField: "value",
    });

    //
    var data = [
      { text: "회사명", value: "1" },
      { text: "회사명2", value: "2" },
      { text: "회사명3", value: "3" },
      { text: "회사명4", value: "4" },
    ];
    $("#popup_select03").kendoDropDownList({
        dataSource: data,
        dataTextField: "text",
        dataValueField: "value",
    });


    //권한신청 : 회사정보 입력 = 사업소종류 셀렉
    var data = [
      { text: "선택", value: "1" },
      { text: "선택", value: "2" },
      { text: "선택", value: "3" },
      { text: "선택", value: "4" },
    ];
    $("#office_type").kendoDropDownList({
        dataSource: data,
        dataTextField: "text",
        dataValueField: "value",
    });

    //권한신청 : 회사정보 입력 = 시도 셀렉
    var data = [
      { text: "서울특별시", value: "1" },
      { text: "서울특별시", value: "2" },
      { text: "서울특별시", value: "3" },
      { text: "서울특별시", value: "4" },
    ];
    $("#area_selec01").kendoDropDownList({
        dataSource: data,
        dataTextField: "text",
        dataValueField: "value",
    });


    //권한신청 : 회사정보 입력 = 시군구 셀렉
    var data = [
      { text: "서울특별시", value: "1" },
      { text: "서울특별시", value: "2" },
      { text: "서울특별시", value: "3" },
      { text: "서울특별시", value: "4" },
    ];
    $("#area_selec02").kendoDropDownList({
        dataSource: data,
        dataTextField: "text",
        dataValueField: "value",
    });

    //권한신청 : 회사정보 입력 = 상태변경일시 셀렉
    var con01 = [
      { text: "선택", value: "1" },
      { text: "선택", value: "2" },
      { text: "선택", value: "3" },
      { text: "선택", value: "4" },
    ];
    $("#conditions").kendoDropDownList({
        dataSource: con01,
        dataTextField: "text",
        dataValueField: "value",
    });

    //사업자관리 : 사업자등록 팝업  영업상태
    var con02 = [
      { text: "선택", value: "1" },
      { text: "선택", value: "2" },
      { text: "선택", value: "3" },
      { text: "선택", value: "4" },
    ];
    $("#conditions02").kendoDropDownList({
        dataSource: con02,
        dataTextField: "text",
        dataValueField: "value",
    });


    //권한신청 : 차량 수 넘버텍스트박스
    $(".Num_pic").kendoNumericTextBox({});


    //사업자관리 셀렉트
    var slec_01 = [
      { text: "서울특별시", value: "1" },
      { text: "서울특별시", value: "2" },
      { text: "서울특별시", value: "3" },
      { text: "서울특별시", value: "4" },
      { text: "서울특별시", value: "5" },
    ];
    $(".sub03 #slec_01").kendoDropDownList({
        dataSource: slec_01,
        dataTextField: "text",
        dataValueField: "value",
    });

    //
    var slec_02 = [
      { text: "강남구", value: "1" },
      { text: "강남구", value: "2" },
      { text: "강남구", value: "3" },
      { text: "강남구", value: "4" },
      { text: "강남구", value: "5" },
    ];
    $(".sub03 #slec_02").kendoDropDownList({
        dataSource: slec_02,
        dataTextField: "text",
        dataValueField: "value",
    });

    //
    var slec_03 = [
      { text: "운수회사 조회", value: "1" },
      { text: "운수회사 조회", value: "2" },
      { text: "운수회사 조회", value: "3" },
      { text: "운수회사 조회", value: "4" },
      { text: "운수회사 조회", value: "5" },
    ];
    $(".sub03 #slec_03").kendoDropDownList({
        dataSource: slec_03,
        dataTextField: "text",
        dataValueField: "value",
    });

    //
    var slec_04 = [
      { text: "영업상태", value: "1" },
      { text: "영업상태", value: "2" },
      { text: "영업상태", value: "3" },
      { text: "영업상태", value: "4" },
      { text: "영업상태", value: "5" },
    ];
    $(".sub03 #slec_04").kendoDropDownList({
        dataSource: slec_04,
        dataTextField: "text",
        dataValueField: "value",
    });

    //
    var location01 = [
      { text: "서울특별시", value: "1" },
      { text: "서울특별시", value: "2" },
      { text: "서울특별시", value: "3" },
      { text: "서울특별시", value: "4" },
      { text: "서울특별시", value: "5" },
    ];
    $(".sub03 #location_info01").kendoDropDownList({
        dataSource: location01,
        dataTextField: "text",
        dataValueField: "value",
    });

    //
    var location02 = [
      { text: "강남구", value: "1" },
      { text: "강남구", value: "2" },
      { text: "강남구", value: "3" },
      { text: "강남구", value: "4" },
      { text: "강남구", value: "5" },
    ];
    $(".sub03 #location_info02").kendoDropDownList({
        dataSource: location02,
        dataTextField: "text",
        dataValueField: "value",
    });


    // 시/도
    var location02 = [
      { text: "시/도 01", value: "1" },
      { text: "시/도 02", value: "2" },
      { text: "시/도 03", value: "3" },
      { text: "시/도 04", value: "4" },
      { text: "시/도 05", value: "5" },
    ];
    $(".sub03 .lc_01").kendoDropDownList({
        dataSource: location02,
        dataTextField: "text",
        dataValueField: "value",
    });

     // 읍/면/동
     var location02 = [
      { text: "읍/면/동 01", value: "1" },
      { text: "읍/면/동 02", value: "2" },
      { text: "읍/면/동 03", value: "3" },
      { text: "읍/면/동 04", value: "4" },
      { text: "읍/면/동 05", value: "5" },
    ];
    $(".sub03 .lc_02").kendoDropDownList({
        dataSource: location02,
        dataTextField: "text",
        dataValueField: "value",
    });


    // 사용여부
    var location02 = [
      { text: "사용함", value: "1" },
      { text: "사용 안 함", value: "2" },
    ];
    $(".sub03 .use_status").kendoDropDownList({
        dataSource: location02,
        dataTextField: "text",
        dataValueField: "value",
    });


    // 검색조건
    var location02 = [
      { text: "검색조건", value: "1" },
      { text: "검색조건1", value: "2" },
      { text: "검색조건2", value: "3" },
      { text: "검색조건3", value: "4" },
    ];
    $(".condition").kendoDropDownList({
        dataSource: location02,
        dataTextField: "text",
        dataValueField: "value",
    });


    var api_01 = [
      { text: "상태 1", value: "1" },
      { text: "상태 2", value: "2" },
      { text: "상태 3", value: "3" },
      { text: "상태 4", value: "4" },
    ];
    $("#api_01").kendoDropDownList({
        dataSource: api_01,
        dataTextField: "text",
        dataValueField: "value",
    });


  });

  // ****************************************************

  //권한신청 : 정보 입력 탭메뉴
  $('.authority_02 ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('.authority_02 ul.tabs li').removeClass('current');
    $('.authority_02 .tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  })


  // 회사정보입력 / 사업자등록증 파일 첨부
  $("#file_01").on('change',function(){
    var fileName = $("#file_01").val();
    $(".upload-name01").val(fileName);
  });
  //
  $("#file_01_2").on('change',function(){
    var fileName = $("#file_01_2").val();
    $(".upload-name01_2").val(fileName);
  });

  // 회사정보입력 / 법인인감증명서 파일 첨부
  $("#file_02").on('change',function(){
    var fileName = $("#file_02").val();
    $(".upload-name02").val(fileName);
  });
  //
  $("#file_02_2").on('change',function(){
    var fileName = $("#file_02_2").val();
    $(".upload-name02_2").val(fileName);
  });

  // 사업자관리 : 렌터카업체에 대한 관할지 변경 안내 / 툴팁 focus
  $(".sub03 .tooltip button").focus(function(){
    $(".sub03 .tooltiptext").addClass("on");
  });
  $(".sub03 .tooltip button").blur(function(){
      $(".sub03 .tooltiptext").removeClass("on");
  });

  //api 목록 탭메뉴
  $('.api_page .api_list ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('.api_page .api_list ul.tabs li').removeClass('current');
    $('.api_page .api_list .tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  });




