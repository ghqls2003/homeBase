/**
 * 확인이력조회
 *
 * history : 네이버시스템(주), 1.0, 2023/06/07  초기 작성
 * author : 이우철
 * version : 1.0
 * see : jQuery 플러그인(라이브러리 모듈화), Immediately-invoked function
 *
 */
(function (W, D, $) {
    // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
    'use strict';

    W.$drvfc = W.$drvfc || {};
    var codeType =''; //  확인결과 조건 , 타입 저장 변수

    $(document).ready(function() {
       $drvfc.ui.pageLoad();      //최초 페이지 로드 시
       $drvfc.event.setUIEvent();



    });

    // jQuery custom function
    // 라이브러리를 사용하는 외부에서 접근할 수 있도록(전역함수) encapsulation
    // 객체 메소드는 jQuery.fn($.fn)으로 정의하여 사용함. jQuery.prototype 의 별칭

   $drvfc.ui = {

         // 최초 페이지 로드 시 UI에 적용
        pageLoad : function() {
        // 조회조건
        //날짜데이터 세팅
        var nowYear = new Date().getFullYear();
        var nowMonth = new Date().getMonth();
        var nowDate = new Date().getDate();
        var nowHours = new Date().getHours();
        // 초기 조회속도 향상을 위해 7일치로 세팅. 최대 조회기간은 1달 유지
        var oneMonthAgo = new Date(new Date().setDate(new Date().getDate() - 7));
        // 관리자일 경우 : default : 1일치로 세팅. 최대 조회기간은 3일 유지
        var oneDayAgo = new Date(new Date().setDate(new Date().getDate() - 1));

         if(curAuthrtCd == 'Z01'){
            $("#start-picker01").kendoDatePicker({
                format: "yyyy-MM-dd",
                value:  new Date(oneDayAgo),
                change: function() {
                  var start = new Date($("#start-picker01").val());
                  var end = new Date($("#end-picker01").val());
               }
            });
         }else{
           $("#start-picker01").kendoDatePicker({
                format: "yyyy-MM-dd",
                value:  new Date(oneMonthAgo),
                change: function() {
                   var start = new Date($("#start-picker01").val());
                   var end = new Date($("#end-picker01").val());
                }
           });
         }

        $("#end-picker01").kendoDatePicker({
            format: "yyyy-MM-dd",
            value: new Date(nowYear, nowMonth, nowDate),
        });

        var setStrtTm = "00:00";
        $("#start-timePicker01").kendoTimePicker({
            value: setStrtTm,
            interval: 10,
            format: "HH:mm"
        });

        var setEndTm = "23:59";
        $("#end-timePicker01").kendoTimePicker({
            value: setEndTm,
            interval: 10,
            format: "HH:mm"
        });


        $('button.k-input-button.k-button.k-button-md.k-button-solid.k-button-solid-base.k-icon-button:eq(1),button.k-input-button.k-button.k-button-md.k-button-solid.k-button-solid-base.k-icon-button:eq(3)').removeClass("k-input-button");

        var mthd = [{cd_id:'1', 'cd_nm':'직접입력'}, {cd_id:'2', 'cd_nm':'OCR'}, {cd_id:'3', 'cd_nm':'모바일면허증'}, {cd_id:'4', 'cd_nm':'API'}];


         $('#searchMthd').kendoDropDownList({
               optionLabel: "확인방법 (전체)",
               dataTextField: "cd_nm",
               dataValueField: "cd_id",
               dataSource: mthd,
            //value : "cd_id"
         });

        ajax(true, contextPath+'/vfc/drvVfcHist/ckResultsList.do', 'body', '처리중입니다.', {}, function (data) {
            var ckResults = data.ckResults;
            $('#ckResults').kendoDropDownList({
               optionLabel: "확인결과 (전체)",
               dataTextField: "cdNm",
               dataValueField: "cd",
               dataSource: ckResults,
               value : "cd",
            });
        });

         // 그리드 생성
        $drvfc.ui.kendoGridLoad();
      },

      dateFomat: function(data) {
         var date = new Date(data);
         return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
      },

      // 확인이력목록
      kendoGridLoad: function() {
         $("#grid").kendoGrid({
            dataSource: {
               data: null,
               transport: {
                  read: {
                     dataType: "json",
                     contentType: "application/json; charset=utf-8",
                     url: contextPath + '/vfc/drvVfcHist/listView.do',
                     type: "POST",
                     beforeSend: function(xhr) {
                        xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
                     }
                  },
                  parameterMap:function(options){

                            var param = $drvfc.event.filter();
                            options.vrfcMthd = param.vrfcMthd;
                            options.bzmnSnKwd = param.bzmnSnKwd;
                            options.startDtTm = param.startDtTm;
                            options.endDtTm = param.endDtTm;
                            options.rqstrNm = param.rqstrNm;
                            options.cmpnyName = param.cmpnyName;
                            options.codeType = param.codeType;
                            options.cd = param.cd;
                            return JSON.stringify(options);

                  }
               },
               schema: {
                  data: "data",
                  total: "total",
               },
               //page: 1, //초기화할때 첫 로딩 페이지 지정
               serverPaging: true,
            },
            columns: [
               { field: "sn",          title: "순번",         width: "65px",  template: "#=sn #" },
               { field: "dln",         title: "면허번호",     width: "180px", template: "#= dln != null ? dln : '-' #"},
               { field: "lcnsType",    title: "면허종별",     width: "80px",  template: "#= lcnsType != null ? lcnsType : '-' #"},
               { field: "vrfcDmndDt",  title: "확인요청일시", width: "150px", template: "#= vrfcDmndDt != null ? $drvfc.ui.dateFomat(vrfcDmndDt) : '-' #"},
               { field: "vrfcMthd",    title: "확인방법",     width: "130px", template: "#= vrfcMthd != null ? vrfcMthd : '-' #"},
               { field: "resNm",       title: "확인결과",     width: "150px", template: "#= verifyNm != null ? verifyNm : '-' #"},
               { field: "rqstrNm",     title: "요청자",       width: "150px", template: "#= rqstrNm != null ? rqstrNm : '-' #"},
               { field: "coNm",        title: "소속사업자명",   width: "150px", template: "#= coNm != null ? coNm : '-' #"}
            ],
            dataBound: function(){
				var formatTotal = FormatNumber(this.dataSource.total());
                $('#totalRowCnt').text(formatTotal);
            },

            navigatable: true,
            pageable: {
               pageSize: 10,
               buttonCount: 5,
            },
            noRecords: {
               template: "데이터가 없습니다."
            },
            editable: false,
            resizable: true,
            selectable: "row",
         });
      },


      // 엑셀다운로드
      excelDown: function() {
            var fileNm = 'drvVfcHist'
            var params = {};
            var data = $drvfc.event.filter();
            var totalRowCount = $("#grid").data("kendoGrid").dataSource.total();
            if(totalRowCount == 0) {
              alert("데이터가 존재하지 않습니다.");
            }else{
                params.vrfcMthd = data.vrfcMthd;
                params.bzmnSnKwd = data.bzmnSnKwd;
                params.startDtTm = data.startDtTm;
                params.endDtTm = data.endDtTm;
                params.rqstrNm = data.rqstrNm;
                params.cmpnyName = data.cmpnyName;
                params.cd = data.cd;
                params.codeType = data.codeType;
            }
             excelDown("/vfc/drvVfcHist/excelBySelectInfo", params, fileNm, totalRowCount);
      }

    };

    //이벤트 정의
   $drvfc.event = {
        // 조회 버튼 클릭 핸들러
        setUIEvent : function() {
           $(window).on('resize', $drvfc.event.resizeGrid);
           $('#btnSearch').on('click', $drvfc.event.btnApplyClickHandler);

            // 엑셀다운로드버튼
            $(".excelDownBtn").on("click", function() {
              $drvfc.ui.excelDown();
            });

            $("#searchOwn").on('keydown', function(e) {
                if (e.key === 'Enter') {
                   $drvfc.event.btnApplyClickHandler();
            }
            });
            $("#searchCoNm").on('keydown', function(e) {
                if (e.key === 'Enter') {
                    $drvfc.event.btnApplyClickHandler();
                }
            });

            $("#rqstrNm").on('keydown', function(e) {
                if (e.key === 'Enter') {
                    $drvfc.event.btnApplyClickHandler();
                }
            });
            $("#cmpnyName").on('keydown', function(e) {
                if (e.key === 'Enter') {
                    $drvfc.event.btnApplyClickHandler();
                }
            });
        },

        filter: function() {
            var param = {}
            var startDt =  $("#start-picker01").val();
            var endDt = $("#end-picker01").val();
            var startTime = $("#start-timePicker01").val();
            var endTime = $("#end-timePicker01").val();
            var endDtTm = endDt +" "+ endTime+":59";
            var startDtTm = startDt +" "+ startTime+":00";
            var rqstrNm =  $("#rqstrNm").val();
            var cmpnyName =  $("#cmpnyName").val();
            //예 cd = "verify_cd_test"
            var ckResults = $("#ckResults").val();
            var parts = ckResults.split("_");
            var codeType = parts.slice(0, -1).join("_"); // "req_rslt_cd"
            codeType = (codeType == "req_rslt_cd") ? "req" : "verify" ;
            var cd = parts[parts.length - 1]; // "99"
            param.vrfcMthd = $("#searchMthd").val();
            param.bzmnSnKwd = $("#searchCoNm").val();
            param.startDtTm = startDtTm;
            param.endDtTm = endDtTm;
            param.rqstrNm = rqstrNm;
            param.cmpnyName = cmpnyName;
            param.codeType = codeType;
            param.cd = cd;
            console.log(param)
            return param;
        },

        resizeGrid : function() {
         $("#grid").data("kendoGrid").resize();
      },

      // 검색 조회
      btnApplyClickHandler : function(e) {
            var start = new Date($("#start-picker01").val());
            var end = new Date($("#end-picker01").val());

            if(curAuthrtCd == 'Z01'){
                $drvfc.event.authrtCdAdmin(start,end);
            }else{
                $drvfc.event.authrtCdUser(start,end);
            }

            if(new Date($('#start-picker01').val()) > new Date($('#end-picker01').val())){
              alert("시작일은 종료일보다 늦을 수 없습니다.\n종료일은 시작일보다 빠를 수 없습니다.");
               $('#start-picker01').data("kendoDatePicker").value(new Date($('#end-picker01').val()));
            }
            var grid = $('#grid').data('kendoGrid');
            grid.dataSource.page(1);
      },
      authrtCdAdmin : function(start,end) {
            // 관리자일 경우 default= 1day, max = 3day(curAuthrtCd = Z01)
            if(end > new Date(new Date(start).setDate(start.getDate() + 3))){
                 alert("3일 이상 으로 선택할 수 없습니다.");
                 $('#end-picker01').data("kendoDatePicker").value(new Date(start.setDate(start.getDate() + 3)));
            }
      },
      authrtCdUser : function(start,end) {
            if(end > new Date(new Date(start).setMonth(start.getMonth() + 1))){
                 alert("한 달 이상 으로 선택할 수 없습니다.");
                 $('#end-picker01').data("kendoDatePicker").value(new Date(start.setMonth(start.getMonth() + 1)));
                }
     },
    };

}(window, document, jQuery));