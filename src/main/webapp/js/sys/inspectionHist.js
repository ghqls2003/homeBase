(function(W, D, $) {
	
	W.$inspectionHist = W.$inspectionHist || {};
	
	var fileCkd = false;
	var fileNo = 0;
	var filesArr = [];
	
	$(document).ready(function() {
		kendo.ui.progress($(document.body), true);
		$inspectionHist.ui.pageLoad();		//최초 페이지 로드 시
		$inspectionHist.event.setUIEvent();
		$inspectionHist.ui.agencyNmAutoComplete(); 
	});
	
	var excelDownArc = {};
	
	$inspectionHist.ui = {
		pageLoad: function() {
			$inspectionHist.ui.autoTextarea();
			$inspectionHist.ui.inspectionHistInfo();
			$inspectionHist.ui.search();
			
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
		agencyNmAutoComplete: function(){
			var param = {};
			if(authrtCd=='G01'){
				if(userCmptncZoneCd.substring(2, userCmptncZoneCd.length) == "00000000"){
					param.userCmptncZoneCd = userCmptncZoneCd.substring(0,2);
				}else{
					param.userCmptncZoneCd=userCmptncZoneCd;
				}
			};
			
			ajax(false, contextPath + '/sys/inspectionHist/agencyList', 'body', '처리중입니다.', param, function(data) {
				$("#agencyNm").kendoAutoComplete({
	              filter: "contains",
					placeholder: '법인명을 입력하세요.',
					dataTextField: "coNm",
			        dataSource: data,
					select: function(e) {
	                    var dataItem = this.dataItem(e.item.index());
	                    var bzmnSn = dataItem ? dataItem.bzmnSn : null;
	                    var coNm = dataItem ? dataItem.coNm : null;
	                    $("#agencyNm").data('value', bzmnSn);
						$("#agencyNm").val(coNm);
						$inspectionHist.ui.agencyInfo();
                	}
				}).data("kendoAutoComplete");
			});
		},
		
		agencyInfo: function(){
			//$('.inc_receiver_lists div').remove();
			//$('#inc_selec_01').data('value', '');
			var parameterMap={
					bzmnSn : $('#agencyNm').data('value'),
			};
			ajax(true, contextPath+'/sys/inspectionHist/agencyInfo', 'body', '처리중입니다.', parameterMap, function (data) {
				if($("#agencyNm").val() != ""){
					$('#bsnSttsNm').val(data[0].bsnSttsNm);;
					$('#bsnSttsMdfcnDt').val(data[0].bsnSttsMdfcnDt);;
					$('#agencyTelno').val(data[0].agencyTelno);;
					$('#rprsvNm').val(data[0].rprsvNm);;
					$('#brno').val(data[0].brno);;
					$('#jurisdiction').val(data[0].jurisdiction);;
				}
				
			})
		},
		
		// 검색옵션
		search: function() {
			var param = {};
			
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
			});
			
			// 시구군
			$('#searchSggNm').kendoDropDownList({
	            optionLabel: "시군구(전체)",
	            dataSource: {}
	        });
	        
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
			
			$("#regRslt").kendoDropDownList({
				dataTextField: "cd",
				dataValueField: "cd",
				dataSource: rsltData,
			});
			
			$("#detailRslt").kendoDropDownList({
				dataTextField: "cd",
				dataValueField: "cd",
				dataSource: rsltData,
			});
			
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
							options.cmptncZoneCd = sd+sgg;
							options.bzmnSeCd     = $('#searchBzmnSeCd').val();
							options.bsnSttsCd    = $('#searchBsnSttsCd').val();
							options.rslt         = $('#searchRslt').val();
							
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
					{ field: "jurisdiction", title: "관할지역", width: "50px", template: "#= jurisdiction != null ? jurisdiction : '-' #", sortable: true },
					{ field: "exmnr", title: "조사원", width: "30px", template: "#= exmnr != null ? exmnr : '-' #", sortable: true },
					{ field: "coNm", title: "회사명", width: "30px", template: "#= coNm != null ? coNm : '-' #", sortable: true },
					{ field: "bzmnSeNm", title: "권한", width: "30px", template: "#= bzmnSeNm != null ? bzmnSeNm : '-' #", sortable: true },
					{ field: "brno", title: "사업자번호", width: "50px", template: "#= brno != null ? brno : '-' #", sortable: true },
					{ field: "crno", title: "법인번호", width: "50px", template: "#= crno != null ? crno : '-' #", sortable: true },
					{ field: "rslt", title: "결과", width: "30px", template: "#= rslt != null ? rslt : '-' #", sortable: true },
					{ field: "roadNmAddr", title: "주소", width: "100px", template: "#= roadNmAddr != null ? roadNmAddr : '-' #", sortable: true },
					{ title: "결과서", width: "30px", exportable: false, template: "<button class='gray_btn' style='width: 70px;height: 30px;' onclick='javascript:$inspectionHist.event.issued(`#:bzmnSn#`);'>발급</button>" },
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
		// row 상세팝업
		rowClickEvent : function(e) {
			var rows = e.sender.select();
			var data;
			
			rows.each(function(e) {
                var grid = $("#inspectionHistGrid").data("kendoGrid");
                var dataItem = grid.dataItem(this);
                data = dataItem;
            });
			$inspectionHist.event.detailInfoPopup(data);

//			var crno = !data.crno ? '-' : toCorporateNumFormat(data.crno);
//			$('#crno').val(crno);
//			$('#detailExmnr').val(data.exmnr);
//			$('#detailJbgd').val(data.jbgd);
//			$('#detailOgdp').val(data.ogdp);
			
//			$(".detail_popup").addClass("view");
		},
		
	}
	
	$inspectionHist.event = {
		setUIEvent: function() {

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
			});
			
			$("#searchBtn").on("click", function() {
				$("#inspectionHistGrid").data("kendoGrid").dataSource.page(1);
            });
			
			// 등록팝업 버튼
			$(".insertPopupBtn").on("click", function() {
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
//					var ext = $("#fileUpload").val().split(".").pop().toLowerCase();
//					var files = ["jpg", "jpeg", "gif", "png", "pdf"];
//
//					if (ext.length > 0) {
//						if ($.inArray(ext, files) == -1) {
//							alert("첨부파일 형식을 다시 확인해주세요. \n 첨부가능 확장자 : jpg, jpeg, gif, png, pdf");
//							$("#fileUpload").val("");
//							$("#fileNm").val("");
//							return false;
//						} else {
//							var file = $(this).prop("files")[0]; // 선택된 파일 가져오기
//							var fileName = file.name; // 파일명 가져오기
//							$("#fileNm").val(fileName); // 파일명을 사업자등록증 input 태그에 설정
//						}
//					}



					var maxFileCnt = 4;   // 첨부파일 최대 개수
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
//					var ext = $("#fileUpload").val().split(".").pop().toLowerCase();
//					var files = ["jpg", "jpeg", "gif", "png", "pdf"];
//
//					if (ext.length > 0) {
//						if ($.inArray(ext, files) == -1) {
//							alert("첨부파일 형식을 다시 확인해주세요. \n 첨부가능 확장자 : jpg, jpeg, gif, png, pdf");
//							$("#fileUpload").val("");
//							$("#fileNm").val("");
//							return false;
//						} else {
//							var file = $(this).prop("files")[0]; // 선택된 파일 가져오기
//							var fileName = file.name; // 파일명 가져오기
//							$("#fileNm").val(fileName); // 파일명을 사업자등록증 input 태그에 설정
//						}
//					}



					var maxFileCnt = 4;   // 첨부파일 최대 개수
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
			
			
//			$('#detailFileUploadBtn').on("click", function() {
//				$("#detailFile").click();
//				$("#detailFile").change(function() {
//					var ext = $("#detailFile").val().split(".").pop().toLowerCase();
//					var files = ["jpg", "jpeg", "gif", "png", "pdf"];
//
//					if (ext.length > 0) {
//						if ($.inArray(ext, files) == -1) {
//							alert("첨부파일 형식을 다시 확인해주세요. \n 첨부가능 확장자 : jpg, jpeg, gif, png, pdf");
//							$("#detailFile").val("");
//							$("#detailFileNm").val("");
//							return false;
//						} else {
//							var file = $(this).prop("files")[0]; // 선택된 파일 가져오기
//							var fileName = file.name; // 파일명 가져오기
//							$("#detailFileNm").val(fileName); // 파일명을 사업자등록증 input 태그에 설정
//							fileCkd = true;
//						}
//					}
//				});
//			});
			

			
        	
        	// 상세팝업 - 삭제버튼 (마스터 관리자 / 사업자 전체 삭제 됨 - 요청, 마스터, 이력)
			$(".deleteBtn").on("click", function() {
				$inspectionHist.event.updateDeleteYn();
			});
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
			var brno = !data.brno ? '-' : toBizrnoNumFormat(data.brno);
			var agencyTelno = !data.agencyTelno ? '-' : toTelNum(data.agencyTelno);
			var bsnSttsMdfcnDt = !data.bsnSttsMdfcnDt ? '-' :  dateFormatting(data.bsnSttsMdfcnDt);
			$('#detailCoNm').val(data.coNm);
			$('#detailCoNm').data('value', data.bzmnSn);
			$('#detailBrno').val(brno);
			$('#detailExmnr').val(data.exmnr);
			$('#detailJbgd').val(data.jbgd);
			$('#detailOgdp').val(data.ogdp);
			$('#detailBsnSttsNm').val(data.bsnSttsNm);
			$('#detailBsnSttsMdfcnDt').val(bsnSttsMdfcnDt);
			$('#detailAgencyTelno').val(agencyTelno);
			$('#detailChckArtcl').val(data.chckArtcl);
			$('#detailEtcArtcl').val(data.etcArtcl);
			$('#detailRslt').data("kendoDropDownList").value(data.rslt);
			$('#detailSignYn').val(data.signYn);
			$('#detailTelno').val(data.telno);
			$('#detailRprsvNm').val(data.rprsvNm);
			$('#detailChckCn').val(data.chckCn);
			$('#detailChckPlc').val(data.chckPlc);
			$('#detailJurisdiction').val(data.jurisdiction);
			$('#detailJurisdiction').data('value', data.regCmptncCd);
			//$('#detailFileNm').val(data.atchFileNm);
			//$('#detailFileNo').val(data.fileatchsn1);
			//$('.detailFileList').text(data.atchFileNm);
			
			
			
			
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
//			var params = {};
//
//			ajax(true, contextPath + '/vfc/rntCnfCrtIsnHstr/selectDetailConfInfo', 'body', '확인인중입니다.', params, function(data) {
//				$("#detailRentNo").val(data[0].rentNo);
//				$("#detailVhclRegNo").val(data[0].vhclRegNo);
//				$("#detailRentSttsNm").val(data[0].rentSttsNm);
//				$("#detailRentHstryNo").val(data[0].rentHstryNo);
//				$("#startDt").val(data[0].rentBgngDt);
//				$("#endDt").val(data[0].rentEndDt);
//				$("#mdfcnDt").val(data[0].mdfcnDt);
//			});
//
//			$("#detailInfoPopup").addClass("view");
		},
		
		insertBtn: function(){
			var params ={};
			//var brno = insertBrno.replace(/[^0-9]/g, "");
			params.exmnr = $("#regExmnr").val();
			params.jbgd = $("#regJbgd").val();
			params.ogdp = $("#regOgdp").val();
			params.telno = $("#regTelno").val();
			params.chckArtcl = $("#regChckArtcl").val();
			params.etcArtcl = $("#regEtcArtcl").val();
			params.chckCn = $("#regChckCn").val();
			params.chckPlc = $("#regChckPlc").val();
			params.rslt = $("#regRslt").val();
			params.signYn = $("#regSignYn").val();
			params.bzmnSn = $('#agencyNm').data('value');
			
			var fileNm = $('.regFileList').text();
			var coNm = $('#agencyNm').data('value');
			if(coNm == null || coNm == ""){
				alert("법인명은 필수입니다");
			}else if(fileNm == null || fileNm == "") {
				alert("첨부파일은 필수입니다");
			}else if (confirm("등록 하시겠습니까?")) {
				$inspectionHist.event.insertFile(params);
			}
			
		},
		
		insertInspection: function(params){
			ajax(true, contextPath + '/sys/inspectionHist/insertInspectionHist', 'body', '확인인중입니다.', params, function (data) {
				alert("등록을 성공하셨습니다");
				$("#insertPopup").removeClass("view");
				location.reload();
		        //$("#inspectionHistGrid").data("kendoGrid").dataSource.page(1);
		    });
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
							    //console.log(params.fileatchsn1);
							});
						}else{
							params.fileAtchSn1 = nvl(response.fileSn, 0);
						}
						
						//params.fileatchsn = nvl(response.fileSn, 0);
						$inspectionHist.event.insertInspection(params);
					}
				});
			}else{
				$inspectionHist.event.insertInspection(params);
			}
			
		},
		
		issued: function(bzmnSn){
			var params = {}

			params.bzmnSn = bzmnSn;

			if (bzmnSn == null || bzmnSn == '')
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
				}
				excelDown("/sys/inspectionHist/excelDown", excelDownArc, "inspectionHist", totalRowCount);
			}
			
			
        },

		updateBtn : function(){
			var params ={};
			
			params.bzmnSn = $('#detailCoNm').data('value');
			params.coNm = $("#detailCoNm").val();
			params.exmnr = $("#detailExmnr").val();
			params.jbgd = $("#detailJbgd").val();
			params.ogdp = $("#detailOgdp").val();
			params.telno = $("#detailTelno").val();
			params.chckArtcl = $("#detailChckArtcl").val();
			params.etcArtcl = $("#detailEtcArtcl").val();
			params.chckCn = $("#detailChckCn").val();
			params.chckPlc = $("#detailChckPlc").val();
			params.rslt = $("#detailRslt").val();
			params.signYn = $("#detailSignYn").val();
			params.regCmptncCd = $('#detailJurisdiction').data('value');
			
			var j = 1;
			for(var i=1; i<5; i++){
				var detailFileSnNum = "#detailFileSn"+i;
				if ($(detailFileSnNum).attr('value')) {
					fileAtchSnNum = "fileAtchSn"+j;
					j++;
					params[fileAtchSnNum] = $(detailFileSnNum).attr('value');
				}
			}
			
			var coNm = $("#detailCoNm").val();
			var fileNm = $('.detailFileList').text();
			if(coNm == null || coNm == ""){
				alert("법인명은 필수입니다");
			}else if(fileNm == null || fileNm == "") {
				alert("첨부파일은 필수입니다");
			}else if (confirm("등록 하시겠습니까?")) {
				$inspectionHist.event.updateFile(params);
			}
			
			
//			
//			var fileNm = $('#detailFileNm').val();
//			if (fileNm == null || fileNm == "") {
//				alert("첨부파일은 필수입니다");
//				return;
//			}
//			
//			if (confirm("수정 하시겠습니까?")) {
//				if(fileNm != null || fileNm != ""){
//					
//				}
//				$inspectionHist.event.updateFile(params);
//			}

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
								//var num = index+1;
								
								for(var i=1; i<5; i++){
									var fileAtchSnNum = "fileAtchSn"+i;
									if (!params[fileAtchSnNum]) {
											params[fileAtchSnNum] = element;
											break;
									}
									
								}
								
//								var paramsNm = "fileAtchSn"+num;
//								params[paramsNm] = nvl(element, 0);
							    //console.log(params.fileatchsn1);
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
						
						//params.fileatchsn = nvl(response.fileSn, 0);
						$inspectionHist.event.updateInspection(params);
					}
				});
			}else{
				$inspectionHist.event.updateInspection(params);
			}
		},
		
		// 파일 삭제
		deleteFile: function(num) {
			var detailFileSnNum = '#detailFileSn'+num;
			param={};
			param.fileSn = $(detailFileSnNum).attr('value');
			$(detailFileSnNum).remove();
//			ajax(true, contextPath + '/cmmn/deleteFile', 'body', '처리중입니다.', param, function(data) {
//			});
		},
		
		updateInspection: function(params) {
			ajax(true, contextPath + '/sys/inspectionHist/updateInspectionHist', 'body', '처리중입니다.', params, function(data) {
				//alert(data.message);
				alert("수정되었습니다");
				$(".register_popup").removeClass("view");
				location.reload();
			});
		},
		
		updateDeleteYn : function(){
			if(confirm("삭제하시겠습니까?")){

				var params = {};

				params.bzmnSn = $('#detailCoNm').data('value');
				ajax(true, contextPath + '/sys/inspectionHist/updateDeleteYn', 'body', '확인인중입니다.', params, function (data) {
					alert("지도점검이력이 삭제되었습니다.");
					location.reload();
				});
			}
		},
		
		fileDownBtn : function(element){
			var atchFileSn = element.getAttribute('data-value');
			var atchFileNm = element.innerText;
			
			fileDownloadget(atchFileSn, atchFileNm);
		},
		
		
		
	}
	
}(window, document, jQuery));