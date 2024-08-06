(function (W, D, $) {
    'use strict';

	W.$authSwitch = W.$authSwitch || {};

	var selectData = {};

	$(document).ready(function() {
		$authSwitch.ui.pageLoad();
		$authSwitch.event.setUIEvent();
	});

	$authSwitch.ui = {
		pageLoad : function() {
            var userDataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url           : contextPath + "/cmmn/trnsprtUserList",
                        type          : "POST",
                        contentType   : "application/json",
                        dataType      : "json",
                        pageSize      : 10,
                        serverPaging  : true,
                        beforeSend    : function(xhr) {
                          xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
                        },
                        success: function (data) {
                          options.success(data);
                        },
                        error: function (xhr, error) {
                          console.debug(xhr); console.debug(error);
                        }
                    },

                    parameterMap: function(options) {
                        return JSON.stringify(options);
                    }
                },
                schema: {
                    data: function(response) {
                        $.each(response, function(k, v) {
                            response[k].userIdNm = v.user_id + " | " + v.user_nm;
                        });

                        return response;
                    }
                }
            });

			$("#userId").kendoAutoComplete({
                filter         : "contains",
                minLength      : 2,
                dataTextField  : "user_id",
                placeholder    : "사용자 선택",
                delay          : 500,
                dataSource: userDataSource,
				select: function(e) {
					selectData = {
						userSn : e.dataItem.user_sn,
						userId : e.dataItem.user_id,
						userNm : e.dataItem.user_nm,
						authrtCd : e.dataItem.authrt_cd,
						bzmnSn : e.dataItem.bzmn_sn,
						cmptncZoneCd : e.dataItem.cmptnc_zone_cd,
						acntSttsCd : e.dataItem.acnt_stts_cd,
						aprvSttsCd : e.dataItem.aprv_stts_cd
					}
				},
				template: '#: user_id # | #: user_nm #'
            });
		}
	};

	$authSwitch.event = {
		setUIEvent : function() {
			$("#switchBtn").on("click", function() {
				if(!$('#warnChk').is(':checked'))
					alert("사업자권한 획득 주의사항 동의 후 전환할 수 있습니다.")
				else if($("#userId").val() == '' || Object.keys(selectData).length == 0)
					alert("사용자를 선택해 주십시오.")
				else if(selectData.aprvSttsCd != '2' || selectData.acntSttsCd != '1')
					alert("사용자 계정 상태를 확인해 주십시오.")
                else
					postToURL(contextPath + '/ma/switchSessionAuthrtCd', selectData);
            });
		},
	};
}(window, document, jQuery));