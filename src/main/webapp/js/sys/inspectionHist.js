(function(W, D, $) {
	
	W.$inspectionHist = W.$inspectionHist || {};
	
	var maxFileCnt = 4;
	var fileCkd = false;
	var fileNo = 0;
	var filesArr = [];
	var rowClickChk = false;
	var excelDownArc = {};
	
	$(document).ready(function() {
		kendo.ui.progress($(document.body), true);
		$inspectionHist.ui.pageLoad();		//최초 페이지 로드 시
		$inspectionHist.event.setUIEvent();
	});
	
	$inspectionHist.ui = {
		pageLoad: function() {
			$inspectionHist.ui.autoTextarea(); // 회사 자동검색 구역
			$inspectionHist.ui.search();
			$inspectionHist.ui.detailSearch(); // 상세 팝업 드롭다운
			$inspectionHist.ui.areaSearch(); // 지자체 검색
		},
		
		detailSearch: function(){
			$("#detailChckYmd").kendoDatePicker({
				value: new Date(),
				format: "yyyy-MM-dd",
				max: new Date()
			});
			$("#detailChckYmd").attr("readonly", true);
			
			//서명여부
			var signYn = [
			   	{ text: "Y"},
				{ text: "N"},
			];
			
			$("#detailSignYn").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "text",
				dataSource: signYn,
    		});

			//지도점검결과
			var rsltData = [
				{ cd: "합격" },
				{ cd: "불합격" }
			];
			
			$("#detailChckRslt").kendoDropDownList({
				dataTextField: "cd",
				dataValueField: "cd",
				dataSource: rsltData,
			});
			
//			//후속처리여부
//			var prcsCn = [
//				{ text: "경고" },
//				{ text: "벌금" },
//				{ text: "휴업" },
//			];
//			
//			$("#detailPrcsCn").kendoDropDownList({
//				dataTextField: "text",
//				dataValueField: "text",
//				dataSource: prcsCn,
//			});
			
		},
		
		insertSearch: function(){
			$("#regChckYmd").kendoDatePicker({
				value: new Date(),
				format: "yyyy-MM-dd",
				max: new Date()
			});
			$("#regChckYmd").attr("readonly", true);
			
			//서명여부
			var signYn = [
			   	{ text: "Y"},
				{ text: "N"},
			];
			
			$("#regSignYn").kendoDropDownList({
				dataTextField: "text",
				dataValueField: "text",
				dataSource: signYn,
    		});

			//지도점검결과
			var rsltData = [
				{ cd: "합격" },
				{ cd: "불합격" }
			];
			
			$("#regChckRslt").kendoDropDownList({
				dataTextField: "cd",
				dataValueField: "cd",
				dataSource: rsltData,
			});
			
		},
		
		autoTextarea: function(){
			var textareas = $('.chckCn');
			textareas.each(function() {
			    $(this).on('input', function() {
			        $(this).css('height', '0');
			        $(this).css('height', this.scrollHeight + 'px');
			    });
			});
		},
		
		// 회사 검색
		agencyNmAutoComplete: function(element){
			var param = {};
			if(authrtCd=='G01'){
				if(userCmptncZoneCd.substring(2, userCmptncZoneCd.length) == "00000000"){
					param.userCmptncZoneCd = userCmptncZoneCd.substring(0,2);
				}else{
					param.userCmptncZoneCd=userCmptncZoneCd;
				}
			};
			
			ajax(false, contextPath + '/sys/inspectionHist/agencyList', 'body', '처리중입니다.', param, function(data) {
				$(element).kendoAutoComplete({
	              	filter: "contains",
					placeholder: '회사명을 입력하세요.',
					dataTextField: "coNm",
			        dataSource: data,
					select: function(e) {
	                    var dataItem = this.dataItem(e.item.index());
	                    var bzmnSn = dataItem ? dataItem.bzmnSn : null;
	                    var coNm = dataItem ? dataItem.coNm : null;
						if(element=="#agencyNm"){
							$(element).data('value', bzmnSn);
						}else if(element=="#detailCoNm"){
							$(element).data('newBzmnSn', bzmnSn);
						}
						$(element).val(coNm);
						$inspectionHist.ui.agencyInfo(element);
                	}
				}).data("kendoAutoComplete");
			});
		},
		
		agencyInfo: function(element){
			if(element=="#agencyNm"){
				var param = $(element).data('value');
			}else if(element=="#detailCoNm"){
				var param = $(element).data('newBzmnSn');
			}
			var parameterMap={
					bzmnSn : param,
			};
			ajax(true, contextPath+'/sys/inspectionHist/agencyInfo', 'body', '처리중입니다.', parameterMap, function (data) {
				var bsnSttsMdfcnDt = !data[0].bsnSttsMdfcnDt ? '' :  dateFormatting(data[0].bsnSttsMdfcnDt);
				var agencyTelno = !data[0].agencyTelno ? '' :  $inspectionHist.ui.telNumFormat(data[0].agencyTelno);
				var brno = !data[0].brno ? '' :  toBizrnoNumFormat(data[0].brno);
				if(element=="#agencyNm"){
					if($(element).val() != ""){
						$('#bsnSttsNm').val(data[0].bsnSttsNm);
						$('#bsnSttsMdfcnDt').val(bsnSttsMdfcnDt);
						$('#agencyTelno').val(agencyTelno);
						$('#rprsvNm').val(data[0].rprsvNm);
						$('#brno').val(brno);
						$('#locgov').val(data[0].locgov);
						$('#agencyNm').data('regCmptncCd', data[0].regCmptncCd);
					}
				}else if(element=="#detailCoNm"){
					if($(element).val() != ""){
						$('#detailBsnSttsNm').val(data[0].bsnSttsNm);
						$('#BsnSttsMdfcnDt').val(bsnSttsMdfcnDt);
						$('#detailAgencyTelno').val(agencyTelno);
						$('#detailRprsvNm').val(data[0].rprsvNm);
						$('#detailBrno').val(brno);
						$('#detailLocgov').val(data[0].locgov);
						$('#detailCoNm').data('regCmptncCd', data[0].regCmptncCd);
					}
				}
			})
		},
		
		areaSearch: function() {
			var param = {};
			if (authrtCd == 'G01') {
				param.userCmptncZoneCd = userCmptncZoneCd;
				ajax(true, contextPath+'/sys/inspectionHist/ctpvNm', 'body', '처리중입니다.', param, function (data) {
					$('#searchCtpvNm').kendoDropDownList({
			            dataTextField: "ctpv_nm",
			            dataValueField: "ctpv_cd",
			            dataSource: data,
						value : "ctpv_cd",
			        });

					ajax(true, contextPath+'/sys/inspectionHist/sggNm', 'body', '처리중입니다.', param, function (data) {
						if(data.length!=0){
							$('#searchSggNm').kendoDropDownList({
					            dataTextField: "sgg_nm",
					            dataValueField: "sgg_cd",
					            dataSource: data,
								value : "sgg_cd"
					        });
						}
						$inspectionHist.ui.inspectionHistInfo();
					});
				});
			}else{
				ajax(true, contextPath+'/sys/inspectionHist/ctpvNm', 'body', '처리중입니다.', param, function (data) {
					$('#searchCtpvNm').kendoDropDownList({
			            optionLabel: "시도(전체)",
			            dataTextField: "ctpv_nm",
			            dataValueField: "ctpv_cd",
			            dataSource: data,
						value : "ctpv_cd",
						change: function() {
							if(this.value() == '') {
								$('#searchSggNm').data("kendoDropDownList").setDataSource(null);
							} else {
							    param.ctpvCd = this.value();
								ajax(true, contextPath+'/sys/inspectionHist/sggNm', 'body', '처리중입니다.', param, function (data) {
									if(data.length==0){
										data = [{ "sgg_nm": '',"sgg_cd": '' }];
									}
									$('#searchSggNm').kendoDropDownList({
							            optionLabel: "시군구(전체)",
							            dataTextField: "sgg_nm",
							            dataValueField: "sgg_cd",
							            dataSource: data,
										value : "sgg_cd"
							        });
								});
							}
						}
			        });
					$inspectionHist.ui.inspectionHistInfo();
				});
			}
			
			// 시구군
			$('#searchSggNm').kendoDropDownList({
	            optionLabel: "시군구(전체)",
	            dataSource: {}
	        });
		},
		
		// 검색옵션
		search: function() {
			var param = {};
			
			// 권한
			ajax(false, contextPath + '/sys/inspectionHist/selectAuth', 'body', '처리중입니다.', param, function(data) {
				$("#searchBzmnSeCd").kendoDropDownList({
	              optionLabel: "권한(전체)",
	              dataTextField: "cd_nm",
	              dataValueField: "cd",
	              dataSource: data,
	              value: "cd_nm"
				});
			});
			
			// 영업상태
			ajax(true, contextPath+'/sys/inspectionHist/bsnStts', 'body', '처리중입니다.', {}, function (data) {
				$('#searchBsnSttsCd').kendoDropDownList({
		            optionLabel: "영업상태(전체)",
		            dataTextField: "cd_nm",
		            dataValueField: "cd",
		            dataSource: data,
					value : "cd_nm"
		        });
			});	
			
			
			//지도점검결과
			var rsltData = [
				{ cd: "합격" },
				{ cd: "불합격" }
			];
			
			$("#searchRslt").kendoDropDownList({
				optionLabel: "지도점검결과(전체)",
				dataTextField: "cd",
				dataValueField: "cd",
				dataSource: rsltData,
			});
			
			$("#detailChckRslt").kendoDropDownList({
				dataTextField: "cd",
				dataValueField: "cd",
				dataSource: rsltData,
			});
			
			$("#selectCond").kendoDropDownList({
				optionLabel: "조건선택",
				dataTextField: "text",
				dataValueField: "value",
				dataSource: [
					{value: "1", text: "회사명"},
					{value: "2", text: "사업자등록번호"},
					{value: "3", text: "법인등록번호"}
				],
				value: "value"
			});
		},
		
		telNumFormat: function(strP) {
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
				}else if(str.length < 9){
		            tmp += str.substr(0, 4);
		            tmp += '-';
		            tmp += str.substr(4, 8);
		            return tmp;
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
		},
		
		inspectionHistInfo: function() {
			$("#inspectionHistGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sys/inspectionHist/selectInspectionHistInfo',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							var sd = $("#searchCtpvNm").val();
							var sgg = $("#searchSggNm").val();
							
							options.searchChk    = $("input[name='searchChk']:checked").val();
							options.cmptncZoneCd = sd+sgg;
							options.bzmnSeCd     = $('#searchBzmnSeCd').val();
							options.bsnSttsCd    = $('#searchBsnSttsCd').val();
							options.chckRslt     = $('#searchRslt').val();
							options.selectCond   = $('#selectCond').val();
							options.searchWrd    = $('#searchWrd').val().trim();
							
							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					page: 1,
					pageSize: 10,
					serverPaging: true,
					serverSorting: false,
					autoBind: false,
				},
				columns: [
					{ field: "rn", title: "순번", width: "30px", template: "#: rn #", sortable: false },
					{ field: "coNm", title: "회사명", width: "50px", template: "#= coNm != null ? coNm : '-' #", sortable: true },
					{ field: "jurisdiction", title: "관할지역", width: "50px", template: "#= jurisdiction != null && jurisdiction.trim() !== '' ? jurisdiction : '-' #", sortable: true },
					{ field: "exmnr", title: "지도원", width: "30px", template: "#= exmnrs != null ? exmnrs : '-' #", sortable: true },
					{ field: "bzmnSeNm", title: "권한", width: "30px", template: "#= bzmnSeNm != null ? bzmnSeNm : '-' #", sortable: true },
					{ field: "brno", title: "사업자등록번호", width: "40px", template: "#= (brno != null && brno != '          ' ) ? brno : '-' #", sortable: true },
					{ field: "crno", title: "법인등록번호", width: "40px", template: "#= (crno != null && crno != '             ' ) ? crno : '-' #", sortable: true },
					{ field: "chckYmd", title: "점검일", width: "30px", template: "#= chckYmd != null ? chckYmd : '-' #", sortable: true },
					{ field: "chckRslt", title: "결과", width: "30px", template: "#= chckRslt != null ? chckRslt : '-' #", sortable: true },
					{ title: "결과서", width: "30px", exportable: false, template: "<button class='gray_btn' style='width: 70px;height: 30px;' onclick='javascript:$inspectionHist.event.issued(`#:bzmnSn#&#:regDt#`);'>발급</button>" },
				],
				navigatable: true,
				scrollable: true,
				pageable: {
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				editable: false,
				resizable: true,
				selectable: "row",
				dataBound: function(e) {
					kendo.ui.progress($(document.body), false);
				},
				change: $inspectionHist.ui.rowClickEvent
			})
		},
		
//		exmnrNum : function(e) {
//			var num = 0;
//			var exmnrArr = [];
//			var data = {};
//			if(e.exmnr!=null && e.exmnr!=''){
//				exmnrArr.push(e.exmnr);
//				num++;
//			}else if(e.exmnr2!=null && e.exmnr2!=''){
//				exmnrArr.push(e.exmnr2);
//				num++;
//			}else if(e.exmnr3!=null && e.exmnr3!=''){
//				exmnrArr.push(e.exmn3);
//				num++;
//			}
//			
//			data[exmnrArr] = exmnrArr;
//			data[exmnrNum] = num;
//			return data;
//		},
		
		// row 상세팝업
		rowClickEvent : function(e) {
			var param = "#detailCoNm";
			
			if(!rowClickChk){
				$inspectionHist.ui.agencyNmAutoComplete(param); 
				rowClickChk = true;
			}
			var rows = e.sender.select();
			var data;
			
			rows.each(function(e) {
                var grid = $("#inspectionHistGrid").data("kendoGrid");
                var dataItem = grid.dataItem(this);
                data = dataItem;
            });
			$inspectionHist.event.detailInfoPopup(data);
			
			$('.chckCn').each(function() {
			    $(this).trigger('input');
			  });
		},
		
	}
	
	$inspectionHist.event = {
		setUIEvent: function() {
			$("#regChckRslt").on("change", function() {
				params = [];
				params.chckRslt = "#regChckRslt";
				params.prcsCn = "regPrcsCn";
				params.divNm = ".regPrcsCnDiv";
				
				$inspectionHist.event.chckRsltClick(params);
			});
			
			$("#detailChckRslt").on("change", function() {
				params = [];
				params.chckRslt = "#detailChckRslt";
				params.prcsCn = "detailPrcsCn";
				params.divNm = ".detailPrcsCnDiv";
				
				$inspectionHist.event.chckRsltClick(params);
			});
			
			// 등록 팝업 X, 닫기 버튼
			$(".insertClose").on("click", function() {
				location.reload();
        	});

			// 상세 팝업 X, 닫기 버튼
			$(".detailClose").on("click",function(){
				var grid = $("#inspectionHistGrid").data("kendoGrid");
				grid.dataSource.read();
				$("#detailFileUpload").val("");
				$(".detailFileList").empty();
				grid.clearSelection();  // 상세보기 팝업창 닫았을 때, select 해제
			    $(".scrollBar02").scrollTop(0);
			    $("body").css("overflow", "auto");
				filesArr = []; 
				$('#detailPrcsCn').closest('span.k-dropdownlist').remove();
				$('#detailPrcsCn').remove();
			});
			
			$("#searchBtn").on("click", function() {
				$inspectionHist.event.searchClick();
            });
			
			// 등록팝업 버튼
			$(".insertPopupBtn").on("click", function() {
				var param = "#agencyNm"
				
				$inspectionHist.ui.insertSearch(); 
				$inspectionHist.ui.agencyNmAutoComplete(param); 
				$(".register_popup").addClass("view");
			});
			
			//등록버튼
			$(".insertBtn").on("click", function() {
            	$inspectionHist.event.insertBtn();
        	});

			//엑셀 다운로드 버튼
			$(".excelDownBtn").on("click", function() {
            	$inspectionHist.event.excelDownBtn();
        	});
			
			//수정 버튼
			$(".updateBtn ").on("click", function() {
            	$inspectionHist.event.updateBtn();
        	});
			
			//등록팝업 파일업로드 버튼
			$('#fileUploadBtn').on("click", function() {
				$("#fileUpload").click();
				$("#fileUpload").change(function() {
					var fileList =  $("#fileUpload")[0];
				    var attFileCnt = document.querySelectorAll('.regFilebox').length;    // 기존 추가된 첨부파일 개수
				    var remainFileCnt = maxFileCnt - attFileCnt;    // 추가로 첨부가능한 개수
				    var curFileCnt = fileList.files.length;  // 현재 선택된 첨부파일 개수

					// 첨부파일 개수 확인
				    if (curFileCnt > remainFileCnt) {
				        alert("첨부파일은 최대 " + maxFileCnt + "개 까지 첨부 가능합니다.");
				    }
				
				    for (var i = 0; i < Math.min(curFileCnt, remainFileCnt); i++) {
				
				        const file = fileList.files[i];
				
				        // 첨부파일 검증
				        if ($inspectionHist.event.fileValidation(file)) {
				            // 파일 배열에 담기
				            var reader = new FileReader();
				            reader.onload = function () {
				                filesArr.push(file);
				            };
				            reader.readAsDataURL(file)
				
				            // 목록 추가
				            let htmlData = '';
				            htmlData += '<div id="file' + fileNo + '" class="filebox regFilebox">';
				            htmlData += '   <p class="name">' + file.name + '</p>';
				            htmlData += '   <a class="delete" onclick="$inspectionHist.event.deleteEachFile(' + fileNo + ');" value=' + fileNo + '><img src="'+contextPath+'/images/ico_close.png" /></a>';
				            htmlData += '</div>';
				            $('.regFileList').append(htmlData);
				            fileNo++;
							fileCkd = true;
				        } else {
				            continue;
				        }
				    }
				    // 초기화
				    $("#fileUpload").val("");

				});
			});
			
			//상세팝업 파일업로드 버튼
			$('#detailFileUploadBtn').on("click", function() {
				$("#detailFileUpload").click();
				$("#detailFileUpload").change(function() {
					var fileList =  $("#detailFileUpload")[0];
				    var attFileCnt = document.querySelectorAll('.detailFilebox').length;    // 기존 추가된 첨부파일 개수
				    var remainFileCnt = maxFileCnt - attFileCnt;    // 추가로 첨부가능한 개수
				    var curFileCnt = fileList.files.length;  // 현재 선택된 첨부파일 개수

					// 첨부파일 개수 확인
				    if (curFileCnt > remainFileCnt) {
				        alert("첨부파일은 최대 " + maxFileCnt + "개 까지 첨부 가능합니다.");
				    }
				
				    for (var i = 0; i < Math.min(curFileCnt, remainFileCnt); i++) {
				
				        const file = fileList.files[i];
				
				        // 첨부파일 검증
				        if ($inspectionHist.event.fileValidation(file)) {
				            // 파일 배열에 담기
				            var reader = new FileReader();
				            reader.onload = function () {
				                filesArr.push(file);
				            };
				            reader.readAsDataURL(file)
				
				            // 목록 추가
				            let htmlData = '';
				            htmlData += '<div id="file' + fileNo + '" class="filebox detailFilebox">';
				            htmlData += '   <p class="name">' + file.name + '</p>';
				            htmlData += '   <a class="delete" onclick="$inspectionHist.event.deleteEachFile(' + fileNo + ');" value=' + fileNo + '><img src="'+contextPath+'/images/ico_close.png" /></a>';
				            htmlData += '</div>';
				            $('.detailFileList').append(htmlData);
				            fileNo++;
							fileCkd = true;
				        } else {
				            continue;
				        }
				    }
				    // 초기화
				    $("#detailFileUpload").val("");

				});
			});
			
			$(".deleteBtn").on("click", function() {
				$inspectionHist.event.updateDeleteYn();
			});
			
			$("#searchWrd").on('keydown', function(e) {
                if (e.key === 'Enter') {
                    $inspectionHist.event.searchClick();
                }
            });
			
		},
		
		searchClick: function() {
			var selectCond = $("#selectCond").val();
			var searchWrd = $('#searchWrd').val().trim();
			
			if(selectCond == '' && searchWrd != '') {
				alert("조건을 선택해주세요.");
				$("#selectCond").focus();
			} else {
				var sd = $("#searchCtpvNm").val();
				var sgg = $("#searchSggNm").val();
				excelDownArc.cmptncZoneCd = sd+sgg;
				excelDownArc.searchChk    = $("input[name='searchChk']:checked").val();
				excelDownArc.bzmnSeCd     = $('#searchBzmnSeCd').val();
				excelDownArc.bsnSttsCd    = $('#searchBsnSttsCd').val();
				excelDownArc.chckRslt     = $('#searchRslt').val();
				excelDownArc.selectCond   = selectCond;
				excelDownArc.searchWrd    = searchWrd;
				
				$("#inspectionHistGrid").data("kendoGrid").dataSource.page(1);
			}
		},
		
		chckRsltClick: function(params) {
			if($(params.chckRslt).val()=="불합격"){
				$('#'+params.prcsCn).removeClass('input');
				$('#'+params.prcsCn).removeClass('readOnlyGrayBtn');
				$('#'+params.prcsCn).removeAttr('readonly');
				//후속처리여부
				var prcsCn = [
					{ text: "경고" },
					{ text: "벌금" },
					{ text: "휴업" },
				];
				
				$('#'+params.prcsCn).kendoDropDownList({
					dataTextField: "text",
					dataValueField: "text",
					dataSource: prcsCn,
				});
			}else if($(params.chckRslt).val()=="합격"){
				$('#'+params.prcsCn).closest('span.k-dropdownlist').remove();
				var inputElement = $('<input>', {
				    type: 'text',
				    id: params.prcsCn,
				    name: params.prcsCn,
				    maxlength: '80',
				    class: 'input readOnlyGrayBtn',
				    'aria-label': '후속처리내용',
				    readonly: true
				});
				
				$(params.divNm).append(inputElement);
			}
		},
		
		fileValidation: function(obj) {
		    var fileTypes = ['application/pdf', 'image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
		    if (obj.size > (2 * 1024 * 1024)) {
		        alert("첨부파일 사이즈는 2MB 이내로 등록 가능합니다.");
		        return false;
		    } else if (obj.name.lastIndexOf('.') == -1) {
		        alert("확장자가 없는 파일은 제외되었습니다.");
		        return false;
		    } else if (!fileTypes.includes(obj.type)) {
		        alert("첨부파일 형식을 다시 확인해주세요. \n 첨부가능 확장자 : jpg, jpeg, gif, png, pdf");
		        return false;
		    } else {
		        return true;
		    }
			
		},
		
		deleteEachFile: function(num) {
			 document.querySelector("#file" + num).remove();
   			 filesArr[num].is_delete = true;
		},
		
		detailInfoPopup: function(data) {
			var brno = toBizrnoNumFormat(data.brno);
			var agencyTelno = $inspectionHist.ui.telNumFormat(data.agencyTelno);
			var telno = $inspectionHist.ui.telNumFormat(data.telno);
			var bsnSttsMdfcnDt = dateFormatting(data.bsnSttsMdfcnDt);
			
			var day = new Date();
			if (data.chckYmd != '' && data.chckYmd != null) {
				var chckYmd = data.chckYmd;
			} else {
				var chckYmd = dateToStr(day);
			}
			
			$('#detailCoNm').val(data.coNm);
			$('#detailCoNm').data('value', data.bzmnSn);
			$('#detailCoNm').data('regDt', data.regDt);
			$('#detailCoNm').data('regCmptncCd', data.regCmptncCd);
			$('#detailBrno').val(brno);
			$('#detailExmnr').val(data.exmnr);
			$('#detailExmnr2').val(data.exmnr2);
			$('#detailExmnr3').val(data.exmnr3);
			$('#detailJbgd').val(data.jbgd);
			$('#detailJbgd2').val(data.jbgd2);
			$('#detailJbgd3').val(data.jbgd3);
			$('#detailOgdp').val(data.ogdp);
			$('#detailOgdp2').val(data.ogdp2);
			$('#detailOgdp3').val(data.ogdp3 );
			$('#detailBsnSttsNm').val(data.bsnSttsNm);
			$('#detailBsnSttsMdfcnDt').val(bsnSttsMdfcnDt);
			$('#detailAgencyTelno').val(agencyTelno);
			$('#detailChckArtcl').val(data.chckArtcl);
			$('#detailEtcArtcl').val(data.etcArtcl);
			$('#detailChckYmd').val(chckYmd);
			$('#detailChckRslt').data("kendoDropDownList").value(data.chckRslt);
			$('#detailChckIdfr').val(data.chckIdfr);
			$('#detailIdfrOgdp').val(data.idfrOgdp);
			$('#detailIdfrJbgd').val(data.idfrJbgd);
			$('#detailSignYn').data("kendoDropDownList").value(data.signYn);
			$('#detailTelno').val(telno);
			$('#detailRprsvNm').val(data.rprsvNm);
			$('#detailChckCn').val(data.chckCn);
			$('#detailChckPlc').val(data.chckPlc);
			$('#detailLocgov').val(data.locgov);
			if(data.prcsCn!=null&&data.prcsCn!=""){ //불합격
				var inputElement = $('<input>', {
				    type: 'text',
				    id: 'detailPrcsCn',
				    name: 'detailPrcsCn',
				    maxlength: '80',
				    'aria-label': '후속처리내용',
				});
				$('.detailPrcsCnDiv').append(inputElement);
				
				//후속처리여부
				var prcsCn = [
					{ text: "경고" },
					{ text: "벌금" },
					{ text: "휴업" },
				];
				
				$("#detailPrcsCn").kendoDropDownList({
					dataTextField: "text",
					dataValueField: "text",
					dataSource: prcsCn,
				});

				$('#detailPrcsCn').data("kendoDropDownList").value(data.prcsCn);
			}else{
				var inputElement = $('<input>', {
				    type: 'text',
				    id: 'detailPrcsCn',
				    name: 'detailPrcsCn',
				    maxlength: '80',
				    class: 'input readOnlyGrayBtn',
				    'aria-label': '후속처리내용',
				    readonly: true
				});
				$('.detailPrcsCnDiv').append(inputElement);
			}
			
			
			for (var i = 1; i < 5; i++) {
			    var fileSnNum = 'fileAtchSn' + i;
			    var fileNmNum = 'fileAtchNm' + i;
			    if (data[fileSnNum] != '' && data[fileSnNum] != null&& data[fileSnNum] != 0) {
			        var htmlData = '';
			        htmlData += '<div id="detailFileSn' + i + '" value= "' + data[fileSnNum] + '" class="filebox detailFilebox">';
			        htmlData += '   <p class="name" onclick="$inspectionHist.event.fileDownBtn(this);" data-value=' + data[fileSnNum] + '>' + data[fileNmNum] + '</p>';
			        htmlData += '   <a class="delete" onclick="$inspectionHist.event.deleteFile(' + i +');" value=' + data[fileSnNum] + '><img src="'+contextPath+'/images/ico_close.png" /></a>';
			        htmlData += '</div>';
			        
			        $('.detailFileList').append(htmlData);
			    }
			}
			
			$(".detail_popup").addClass("view");
		},
		
		insertBtn: function(){
			var params ={};
			var tel = nvl($("#regTelno").val());
			var telno = tel.replace(/-/g, "");
			var regChckYmd = $("#regChckYmd").val();
			var chckYmd = regChckYmd.replace(/-/g, "");
			params.exmnr = $("#regExmnr").val();
			params.exmnr2 = $("#regExmnr2").val();
			params.exmnr3 = $("#regExmnr3").val();
			params.jbgd = $("#regJbgd").val();
			params.jbgd2 = $("#regJbgd2").val();
			params.jbgd3 = $("#regJbgd3").val();
			params.ogdp = $("#regOgdp").val();
			params.ogdp2 = $("#regOgdp2").val();
			params.ogdp3 = $("#regOgdp3").val();
			params.telno = telno;
			params.chckArtcl = $("#regChckArtcl").val();
			params.etcArtcl = $("#regEtcArtcl").val();
			params.chckCn = $("#regChckCn").val();
			params.chckPlc = $("#regChckPlc").val();
			params.chckRslt = $("#regChckRslt").val();
			params.chckIdfr = $("#regChckIdfr").val();
			params.chckYmd = chckYmd;
			params.idfrJbgd = $("#regIdfrJbgd").val();
			params.idfrOgdp = $("#regIdfrOgdp").val();
			params.signYn = $("#regSignYn").val();
			params.bzmnSn = $("#agencyNm").data('value');
			params.regCmptncCd = $("#agencyNm").data('regCmptncCd');
			params.prcsCn = $("#regPrcsCn").val();
			params.locgov = $("#locgov").val();
			params.fileNm = $(".regFileList").text();
			params.coNm = $('#agencyNm').data('value');
			params.transferFn = "insertFile";
			
			$inspectionHist.event.paramsValidation(params);
		},
		
		insertFile: function(params){
			if (fileCkd == true) {
				// 폼데이터 담기
			    var formData = new FormData();
			    for (var i = 0; i < filesArr.length; i++) {
			        // 삭제되지 않은 파일만 폼데이터에 담기
			        if (!filesArr[i].is_delete) {
			            formData.append("files", filesArr[i]);
			        }
			    }

				fileAjax(contextPath + "/sys/inspectionHist/filesUpload", formData, function(response) {
					if (response != null) {
						var fileSnString = String(response.fileSn);
						if (fileSnString.includes(',')) {
						    var fileSnList = response.fileSn.split(',');
							fileSnList.forEach((element, index) => {
								var num = index+1;
								var paramsNm = "fileAtchSn"+num;
								params[paramsNm] = nvl(element, 0);
							});
						}else{
							params.fileAtchSn1 = nvl(response.fileSn, 0);
						}
						$inspectionHist.event.insertInspection(params);
					}
				});
			}else{
				$inspectionHist.event.insertInspection(params);
			}
			
		},
		
		insertInspection: function(params){
			ajax(true, contextPath + '/sys/inspectionHist/insertInspectionHist', 'body', '확인인중입니다.', params, function (data) {
				alert("등록을 성공하셨습니다");
				$("#insertPopup").removeClass("view");
				location.reload();
		    });
		},
		
		// 클립리포트
		issued: function(data){
			var params = {};
			
			var parts = data.split("&");
			
			params.bzmnSn = parts[0];
			params.regDt = parts[1];
			
			if (params.bzmnSn == null || params.bzmnSn == '')
				alert('결과서를 발급할 수 없습니다.');
			else {
				popupReport(contextPath + '/sys/inspectionReport', params);
			}

		},
		
		excelDownBtn: function() {
			var totalRowCount = $("#inspectionHistGrid").data("kendoGrid").dataSource.total();
			if(totalRowCount == 0) {
				alert("데이터가 존재하지 않습니다.");
			} else {
				if(Object.keys(excelDownArc).length === 0) {
					var sd = $("#searchCtpvNm").val();
					var sgg = $("#searchSggNm").val();
					excelDownArc.cmptncZoneCd = sd+sgg;
					excelDownArc.searchChk    = $("input[name='searchChk']:checked").val();
					excelDownArc.bzmnSeCd     = $('#searchBzmnSeCd').val();
					excelDownArc.bsnSttsCd    = $('#searchBsnSttsCd').val();
					excelDownArc.chckRslt     = $('#searchRslt').val();
					excelDownArc.selectCond   = $("#selectCond").val();
					excelDownArc.searchWrd    = $('#searchWrd').val().trim();
				}
				excelDown("/sys/inspectionHist/excelDown", excelDownArc, "inspectionHist", totalRowCount);
			}
        },

		updateBtn : function(){
			var params ={};
			var tel = nvl($("#detailTelno").val());
			var telno = tel.replace(/-/g, "");
			var detailChckYmd = $("#detailChckYmd").val();
			var chckYmd = detailChckYmd.replace(/-/g, "");
			params.bzmnSn = $('#detailCoNm').data('value');
			params.regCmptncCd = $("#detailCoNm").data('regCmptncCd');
			params.regDt = $('#detailCoNm').data('regDt');
			params.newBzmnSn = $('#detailCoNm').data('newBzmnSn')||$('#detailCoNm').data('value');
			params.coNm = $("#detailCoNm").val();
			params.exmnr = $("#detailExmnr").val();
			params.exmnr2 = $("#detailExmnr2").val();
			params.exmnr3 = $("#detailExmnr3").val();
			params.jbgd = $("#detailJbgd").val();
			params.jbgd2 = $("#detailJbgd2").val();
			params.jbgd3 = $("#detailJbgd3").val();
			params.ogdp = $("#detailOgdp").val();
			params.ogdp2 = $("#detailOgdp2").val();
			params.ogdp3 = $("#detailOgdp3").val();
			params.telno = telno;
			params.chckArtcl = $("#detailChckArtcl").val();
			params.etcArtcl = $("#detailEtcArtcl").val();
			params.chckYmd = chckYmd;
			params.chckCn = $("#detailChckCn").val();
			params.chckPlc = $("#detailChckPlc").val();
			params.chckRslt = $("#detailChckRslt").val();
			params.chckIdfr = $("#detailChckIdfr").val();
			params.idfrJbgd = $("#detailIdfrJbgd").val();
			params.idfrOgdp = $("#detailIdfrOgdp").val();
			params.signYn = $("#detailSignYn").val();
			params.locgov = $('#detailLocgov').val();
			params.prcsCn = $("#detailPrcsCn").val();
			params.coNm = $("#detailCoNm").val();
			params.prcsCn = $("#detailPrcsCn").val();
			params.fileNm = $('.detailFileList').text();
			params.transferFn = "updateFile";
			
			var j = 1;
			for(var i=1; i<5; i++){
				var detailFileSnNum = "#detailFileSn"+i;
				if ($(detailFileSnNum).attr('value')) {
					fileAtchSnNum = "fileAtchSn"+j;
					j++;
					params[fileAtchSnNum] = $(detailFileSnNum).attr('value');
				}
			}
			$inspectionHist.event.paramsValidation(params);
		},
		
		updateFile: function(params) {
			if (fileCkd == true) {
				// 폼데이터 담기
			    var formData = new FormData();
			    for (var i = 0; i < filesArr.length; i++) {
			        // 삭제되지 않은 파일만 폼데이터에 담기
			        if (!filesArr[i].is_delete) {
			            formData.append("files", filesArr[i]);
			        }
			    }

				fileAjax(contextPath + "/sys/inspectionHist/filesUpload", formData, function(response) {
					if (response != null) {
						var fileSnString = String(response.fileSn);
						if (fileSnString.includes(',')) {
						    var fileSnList = response.fileSn.split(',');
							fileSnList.forEach((element, index) => {
								for(var i=1; i<5; i++){
									var fileAtchSnNum = "fileAtchSn"+i;
									if (!params[fileAtchSnNum]) {
										params[fileAtchSnNum] = element;
										break;
									}
								}
							});
						}else{
							for(var i=1; i<5; i++){
								var fileAtchSnNum = "fileAtchSn"+i;
								if (!params[fileAtchSnNum]) {
									params[fileAtchSnNum] = response.fileSn;
									break;
								}
							}
						}
						$inspectionHist.event.updateInspection(params);
					}
				});
			}else{
				$inspectionHist.event.updateInspection(params);
			}
		},
		
		updateInspection: function(params) {
			ajax(true, contextPath + '/sys/inspectionHist/updateInspectionHist', 'body', '처리중입니다.', params, function(data) {
				alert("수정되었습니다");
				$(".register_popup").removeClass("view");
				location.reload();
			});
		},
		
		updateDeleteYn : function(){
			if(confirm("삭제하시겠습니까?")){
				var params = {};
				params.bzmnSn = $('#detailCoNm').data('value');
				params.regDt = $('#detailCoNm').data('regDt');
				ajax(true, contextPath + '/sys/inspectionHist/updateDeleteYn', 'body', '확인인중입니다.', params, function (data) {
					alert("지도점검이력이 삭제되었습니다.");
					location.reload();
				});
			}
		},
		
		// 파일 삭제
		deleteFile: function(num) {
			var detailFileSnNum = '#detailFileSn'+num;
			param={};
			param.fileSn = $(detailFileSnNum).attr('value');
			$(detailFileSnNum).remove();
		},
		
		fileDownBtn : function(element){
			var atchFileSn = element.getAttribute('data-value');
			var atchFileNm = element.innerText;
			fileDownloadget(atchFileSn, atchFileNm);
		},
		
		paramsValidation: function(params) {
			if(params.exmnr == "" && params.jbgd == "" && params.ogdp == "" && params.exmnr2 == "" && params.jbgd2 == "" && params.ogdp2 == "" && params.exmnr3 == "" && params.jbgd3 == "" && params.ogdp3 == "") {
				alert("지도원 정보는 필수입니다.");
			}else if((params.exmnr != "" ||params.jbgd != "" || params.ogdp != "")&&(params.exmnr == "" || params.jbgd == "" || params.ogdp == "")) {
				alert("첫번째 지도원 정보를 확인해주세요.");
			}else if((params.exmnr2 != "" ||params.jbgd2 != "" || params.ogdp2 != "")&&(params.exmnr2 == "" || params.jbgd2 == "" || params.ogdp2 == "")) {
				alert("두번째 지도원 정보를 확인해주세요.");
			}else if((params.exmnr3 != "" ||params.jbgd3 != "" || params.ogdp3 != "")&&(params.exmnr3 == "" || params.jbgd3 == "" || params.ogdp3 == "")) {
				alert("세번째 지도원 정보를 확인해주세요.");
			}else if(params.coNm == null || params.coNm == "") {
				alert("회사명은 필수입니다");
			}else if(params.chckArtcl == null || params.chckArtcl == "") {
				alert("점검항목은 필수입니다");
			}else if(params.chckPlc == null || params.chckPlc == "") {
				alert("점검장소는 필수입니다");
			}else if(params.chckYmd == null || params.chckYmd == "") {
				alert("점검일자는 필수입니다");
			}else if(params.chckCn == null || params.chckCn == "") {
				alert("점검내용은 필수입니다");
			}else if(params.fileNm == null || params.fileNm == "") {
				alert("첨부파일은 필수입니다");
			}else if(params.chckRslt == null || params.chckRslt == "") {
				alert("점검결과는 필수입니다");
			}else if(params.chckIdfr == null || params.chckIdfr == "") {
				alert("확인자 성명은 필수입니다");
			}else if(params.idfrJbgd == null || params.idfrJbgd == "") {
				alert("확인자 직급은 필수입니다");
			}else if(params.idfrOgdp == null || params.idfrOgdp == "") {
				alert("확인자 소속은 필수입니다");
			}else if(params.signYn == null || params.signYn == "") {
				alert("서명여부는 필수입니다");
			}else if(params.telno == null || params.telno == "") {
				alert("확인자 연락처는 필수입니다");
			}else if(params.transferFn == "insertFile"){
				if(confirm("등록 하시겠습니까?")) {
					$inspectionHist.event[params.transferFn](params);
				}
			}else if(params.transferFn == "updateFile"){
				if(confirm("수정 하시겠습니까?")) {
					$inspectionHist.event[params.transferFn](params);
				}
			}
		},
	}
}(window, document, jQuery));