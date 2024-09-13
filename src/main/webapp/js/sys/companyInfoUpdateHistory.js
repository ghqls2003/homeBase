(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';

	W.$company = W.$company || {};
	
	var excelDownArc = {};
	
	$(document).ready(function() {
		kendo.ui.progress($(document.body), true);
		
		$company.ui.pageLoad();		//최초 페이지 로드 시
		$company.event.setUIEvent();
	});

	$company.ui = {
		pageLoad: function() {
			// Z01 관리자, M01 국토부, K01 교통안전공단
			if (authrtCd == 'Z01' || authrtCd == 'M01' || authrtCd == 'K01') {
				$company.ui.searchAdmin();
			// G01 지자체, G02 대여사업자조합
			} else if (authrtCd == 'G01' || authrtCd == 'G02') {
				$company.ui.searchG01();
			}
			$company.ui.companyInfoUpdateHistoryGrid();
		},
		
		// 관리자
		searchAdmin: function() {
			var param = {};
			
			$company.comm.syncAjax(false, true, contextPath + '/sys/company/selectCtpvNm', 'body', '처리중입니다.', param, function(data) {
				$('#searchCtpvNm').kendoDropDownList({
					optionLabel: "시도(전체)",
					dataTextField: "ctpv_nm",
					dataValueField: "ctpv_cd",
					dataSource: data,
					value: "ctpv_nm",
					change: function() {
						if(this.value() == '') {
							$("#searchSggNm").data("kendoDropDownList").setDataSource(null);
						} else {
							param.ctpvCd = this.value();
							$company.comm.syncAjax(false, true, contextPath + '/sys/company/selectSggNm', 'body', '처리중입니다.', param, function(data) {
								if(data.length==0){
									$('#searchSggNm').kendoDropDownList({
										optionLabel: "시군구"
								    });
								}else{
									$('#searchSggNm').kendoDropDownList({
										optionLabel: "시군구(전체)",
										dataTextField: "sgg_nm",
										dataValueField: "stdg_cd",
										dataSource: data,
										value: "sgg_nm",
									});
								}
								
							});
						}
					}
				});
			});
			
			// 시군구
			$('#searchSggNm').kendoDropDownList({
				optionLabel: "시군구(전체)"
			});
			
			// 회사명, 수정사유, 영업상태 조회 조건
			$company.ui.searchCond();			
		},
		
		// 지자체, 대여사업자조합
		searchG01: function() {
			var param = {
				regCmptncCd : getCmptncZoneCd
			};
			
			// 시도
			ajax(true, contextPath+'/sys/company/selectCtpvNm', 'body', '처리중입니다.', param, function (data) {
				$('#searchCtpvNm').kendoDropDownList({
		            dataTextField: "ctpv_nm",
		            dataValueField: "ctpv_cd",
		            dataSource: data,
					value : "ctpv_nm"
		        });
			});

			// 시구군
			if(param.regCmptncCd == '3611000000') { // 세종특별자차시
				$('#searchSggNm').kendoDropDownList({
		            optionLabel: "시군구(전체)"
				});
			} else if(param.regCmptncCd.substring(2, param.regCmptncCd.length) == "00000000") { // 광역지자체
				param.ctpvCd = param.regCmptncCd.substring(0, 2);
				param.regCmptncCd = "";
				ajax(true, contextPath+'/sys/company/selectSggNm', 'body', '처리중입니다.', param, function (data) {
					$('#searchSggNm').kendoDropDownList({
						optionLabel: "시군구(전체)",
			            dataTextField: "sgg_nm",
			            dataValueField: "stdg_cd",
			            dataSource: data,
						value : "sgg_nm"
					});
		        });
			} else {
				ajax(true, contextPath+'/sys/company/selectSggNm', 'body', '처리중입니다.', param, function (data) {
					$('#searchSggNm').kendoDropDownList({
			            dataTextField: "sgg_nm",
			            dataValueField: "stdg_cd",
			            dataSource: data,
						value : "sgg_nm"
					});
		        });
			}
			
			// 회사명, 수정사유, 영업상태 조회 조건
			$company.ui.searchCond();
		},

		// 사업자정보 갱신 이력 조회 그리드
		companyInfoUpdateHistoryGrid: function() {
			$("#companyGrid").kendoGrid({
				dataSource: {
					data: null,
					transport: {
						read: {
							dataType: "json",
							contentType: "application/json; charset=utf-8",
							url: contextPath + '/sys/company/selectCompanyHistoryInfo',
							type: "POST",
							beforeSend: function(xhr) {
								xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
							}
						},
						parameterMap: function(options) {
							var regCmptncCd = '';
							
							if (authrtCd == 'Z01' || authrtCd == 'M01' || authrtCd == 'K01') {
								var ctpvCd = $('#searchCtpvNm').val();
								var sggCd = $('#searchSggNm').val();
								if (ctpvCd != '' && sggCd != '') {
									regCmptncCd = sggCd;
								} else if (ctpvCd != '' && sggCd == '') {
									regCmptncCd = ctpvCd;
								}
							} else if (authrtCd == 'G01' || authrtCd == 'G02') {
								if(getCmptncZoneCd.substring(2, getCmptncZoneCd.length) == '00000000') {
									regCmptncCd = getCmptncZoneCd.substring(0, 2);
								} else {
									regCmptncCd = getCmptncZoneCd;
								}
							} else {
								regCmptncCd = 'isNull';
							}
							options.regCmptncCd = regCmptncCd;
							options.searchCompany = $('#searchCompany').val();
							options.searchBsnStts = $('#searchBsnStts').val();
							options.searchChk = $("input[name='searchChk']:checked").val();
							return JSON.stringify(options);
						}
					},
					schema: {
						data: "data",
						total: "total",
					},
					pageSize: 10,
					serverPaging: true
				},
				navigatable: true,
				sortable: {
                    mode: "single",
                    allowUnsort: true
                },
				pageable: {
					pageSizes: [5, 10, 20],
					buttonCount: 5,
					serverPaging: true
				},
				noRecords: {
					template: "데이터가 없습니다."
				},
				columns: [
					{ title: "순번", width: "50px", field: "rn", template: "#: rn #", sortable: false },
					{ title: "회사명", width: "130px", field: "co_nm", template: "#= co_nm != null ? co_nm : '-' #", sortable: true },
					{ title: "사업자등록번호", width: "100px", field: "brno", template: "#= (brno != null && brno != '          ' ) ? brno : '-' #", sortable: false },
					{ title: "법인등록번호", width: "100px", field: "crno", template: "#= (crno != null && crno != '             ' ) ? crno : '-' #", sortable: false },
					{ title: "수정사유", width: "130px", field: "mdfcn_rsn", template: "#= (mdfcn_rsn != null && mdfcn_rsn != '') ? mdfcn_rsn : '-' #", sortable: false },
					{ title: "수정일", width: "80px", field: "reg_dt", template: "#= reg_dt != null ? reg_dt : '-' #", sortable: false },
					{ title: "등록자", width: "80px", field: "user_nm", template: "#= user_nm != null ? user_nm : '-' #", sortable: false },
					{ title: "누적횟수", width: "80px", field: "cnt", template: "#= cnt != null ? cnt : '-' #", sortable: false },
					{ title: "관할지", width: "100px", field: "jurisdiction", template: "#= jurisdiction != ' ' ? jurisdiction : '-' #", sortable: false },
					{ title: "소재지", width: "100px", field: "locgov", template: "#= locgov != ' ' ? locgov : '-' #", sortable: false },
					{ title: "비고", width: "100px", field: "rmrk", template: "#= (rmrk != null && rmrk != '') ? rmrk : '-' #", sortable: false }
				],
				scrollable: true,
				editable: false,
				resizable: true,
				selectable: "row",
				dataBound: function() {
					kendo.ui.progress($(document.body), false);
				},
				change: $company.ui.rowClickEvent
			});
		},

		rowClickEvent: function(e) {
			var rows = e.sender.select();
			var data;

			rows.each(function(e) {
				var grid = $("#companyGrid").data("kendoGrid");
				var dataItem = grid.dataItem(this);
				data = dataItem;
			});

			$company.ui.detailPopup(data.bzmn_sn);
			$(".detail_popup").addClass("view");
			$("body").css("overflow", "hidden");

		},

		detailPopup: function(bzmnSn) {
			var param = {
				bzmnSn : bzmnSn
			};
			ajax(true, contextPath + '/sys/company/selectDetailInfo', 'body', '처리중입니다.', param, function(data) {
				var total = data.total;
				var data = data.data;

				var html = '';
				for(var i=0; i<data.length; i++) {
					// 사업자등록번호
					var brno = data[i].brno;
					if(brno != null && brno != '        ') {
						data[i].brno = toBizrnoNumFormat(brno);
					} else {
						data[i].brno = ''
					}


					// 법인등록번호
					var crno = data[i].crno;
					if(crno != null && crno != '        ') {
						data[i].crno = toCorporateNumFormat(crno);
					} else {
						data[i].crno = ''
					}

					// 차고지 도로명 주소
					if(data[i].garage_road_nm_addr == '없음') {
						data[i].garage_road_nm_addr = '';
					}

					// 사업게시일
					var day = data[i].biz_strt_day;
					if(day != null && day != '        ') {
						data[i].biz_strt_day = day.substring(0, 4) + '-' + day.substring(4, 6) + '-' + day.substring(6, 8);
					}else {
						data[i].biz_strt_day = ''
					}


					// 상태변경일시
					var mdf_day = data[i].bsn_stts_mdfcn_dt;
					if(mdf_day != null && mdf_day != '        ') {
						data[i].bsn_stts_mdfcn_dt = mdf_day.substring(0, 4) + '-' + mdf_day.substring(4, 6) + '-' + mdf_day.substring(6, 8);
					}else {
						data[i].bsn_stts_mdfcn_dt = ''
					}

					// 전화번호
					var tel = data[i].telno;
					if(tel != null) {
						var telLength = tel.length;
						if(telLength == 9) {
							data[i].telno = tel.substring(0, 2) + '-' + tel.substring(2, 5) + '-' + tel.substring(5, 9);
						}else if(telLength == 10) {
							data[i].telno = tel.substring(0, 3) + '-' + tel.substring(3, 6) + '-' + tel.substring(6, 10);
						}else if(telLength == 11) {
							data[i].telno = tel.substring(0, 3) + '-' + tel.substring(3, 7) + '-' + tel.substring(7, 11);
						}
					}else {
						data[i].telno = ''
					}

					html += '<div class="detail_popup top_info">';
					html += '	<div style="color: #000">';
					if(i == 0) {
						html += '		<span>현재</span>';
					}else {
						html += '       <span>수정</span>';
					}
					html += '       <span id="mdfcnRn" style="margin-left: 5px; color: red">'+nvl(total,' ')+'</span>';
					html += '	</div>';
					html += '	<div>';
					html += '       <span class="mdfcnDate">수정일시</span>';
					html += '       <span id="mdfcnDt" style="margin-left: 5px; color: red">'+nvl(data[i].reg_dt,' ')+'</span>';
					html += '	</div>';
					html += '	<div>';
					html += '       <span class="mdfcnName">수정자명</span>';
					html += '       <span id="mdfcnName" style="margin-left: 5px; color: blue;">'+nvl(data[i].user_nm,' ')+'</span>';
					html += '	</div>';
					html += '</div>';

					html += '<div class="contBox">';
					html += '	<div class="nameBox nameBox-flex">';
					html += '		<h4 class="name">관할 지자체 정보</h4>';
					html += '	</div>';
					html += '	<div class="cont cont-flex">';
					html += '		<table class="tb rental_tb01">';
					html += '			<tr>';
					html += '				<th scope="col">지역</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="ctpvNm">지역</label>';
					html += '						<input type="text" id="ctpvNm" class="input no_line" aria-label="지역" placeholder="지역" value="'+nvl(data[i].reg_ctpv_nm,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '		</table>';
					html += '		<table class="tb rental_tb01">';
					html += '			<tr>';
					html += '				<th scope="col">지자체</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="cdSggNm">지자체</label>';
					html += '						<input type="text" id="cdSggNm" class="input no_line" aria-label="지자체" placeholder="지자체" value="'+nvl(data[i].reg_sgg_nm,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '		</table>';
					html += '	</div>';
					html += '</div>';

					html += '<div class="contBox">';
					html += '	<div class="nameBox nameBox-flex">';
					html += '		<h4 class="name">회사 기본 정보</h4>';
					html += '	</div>';
					html += '	<div class="cont cont-flex">';
					html += '		<table class="tb rental_tb01">';
					html += '			<tr>';
					html += '				<th scope="col">회사명</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="coNm">회사명</label>';
					html += '						<input type="text" id="coNm" class="input no_line" aria-label="회사명" placeholder="회사명" value="'+nvl(data[i].co_nm,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">사업자등록번호</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="brno">사업자등록번호</label>';
					html += '						<input type="text" id="brno" class="input no_line" aria-label="사업자등록번호" placeholder="사업자등록번호" value="'+nvl(data[i].brno,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">사업소종류</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="bzmnSeCd">사업소종류</label>';
					html += '						<input type="text" id="bzmnSeCd" class="input no_line" aria-label="사업소종류" placeholder="사업소종류" value="'+nvl(data[i].bzmn_se_nm,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';

					if(data[i].bzmn_se_nm == "영업소(예약소)") {
						html += '			<tr>';
						html += '				<th scope="col">주사무소</th>';
						html += '				<td>';
						html += '					<div class="tb_flex">';
						html += '						<label for=""></label>';
						html += '						<input type="text" id="" class="input no_line" aria-label="주사무소" placeholder="주사무소" value="'+nvl(data[i].up_brno_nm,' ')+'" readonly/>';
						html += '					</div>';
						html += '				</td>';
						html += '			</tr>';
					}

					html += '		</table>';
					html += '		<table class="tb rental_tb01">';
					html += '			<tr>';
					html += '				<th scope="col">대표자명</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="rprsvNm">대표자명</label>';
					html += '						<input type="text" id="rprsvNm" class="input no_line" aria-label="대표자명" placeholder="대표자명" value="'+nvl(data[i].rprsv_nm,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">법인등록번호</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="crno">법인등록번호</label>';
					html += '						<input type="text" id="crno" class="input no_line" aria-label="법인등록번호" placeholder="법인등록번호" value="'+nvl(data[i].crno,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">사업게시일</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="bizStrtDay">사업게시일</label>';
					html += '						<input type="text" id="bizStrtDay" class="input no_line" aria-label="사업게시일" placeholder="사업게시일" value="'+nvl(data[i].biz_strt_day,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '		</table>';
					html += '	</div>';
					html += '</div>';

					html += '<div class="contBox">';
					html += '	<div class="nameBox nameBox-flex">';
					html += '		<h4 class="name">회사 소재지 정보</h4>';
					html += '	</div>';
					html += '	<div class="cont cont-flex">';
					html += '		<table class="tb rental_tb01">';
					html += '			<tr>';
					html += '				<th scope="col">시도</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="sggCdCtpvNm">시도</label>';
					html += '						<input type="text" id="sggCdCtpvNm" class="input no_line" aria-label="시도" placeholder="시도" value="'+nvl(data[i].ctpv_nm,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">도로명주소</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="roadNmAr">도로명주소</label>';
					html += '						<input type="text" id="roadNmAddr" class="input no_line" aria-label="도로명주소" placeholder="도로명주소" value="'+nvl(data[i].road_nm_addr,' ')+'" reaonly/>';
					html += '					</iv>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">지번주소</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="lotnoAddr">지번주소</label>';
					html += '						<input type="text" id="lotnoAddr" class="input no_line" aria-label="지번주소" placeholder="지번주소" value="'+nvl(data[i].lotno_addr,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">차고지 도로명주소</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="garageRoadNmAddr">차고지 도로명주소</label>';
					html += '						<input type="text" id="garageRoadNmAddr" class="input no_line" aria-label="차고지 도로명주소" placeholder="차고지 도로명주소" value="'+nvl(data[i].garage_road_nm_addr,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '		</table>';
					html += '		<table class="tb rental_tb01">';
					html += '			<tr>';
					html += '				<th scope="col">시군구</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="sggCdSggNm">시군구</label>';
					html += '						<input type="text" id="sggCdSggNm" class="input no_line" aria-label="시군구" placeholder="시군구" value="'+nvl(data[i].sgg_nm,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">위치정보</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '			            <label for="location_lat">위도</label>';
					html += '			            <input type="text" id="location_lat" name="location_lat" class="input no_line" placeholder="위도" maxLength="200" aria-label="위도"';
					html += '								value="위도 : '+nvl(data[i].lat,' ')+'" readOnly />';
					html += '			            <label for="location_lot">경도</label>';
					html += '			            <input type="text" id="location_lot" name="location_lot" class="input no_line" placeholder="경도" maxLength="200" aria-label="경도"';
					html += '								value="경도 : '+nvl(data[i].lot,' ')+'" readOnly />';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">상세주소</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="roadNmDaddr">상세주소</label>';
					html += '						<input type="text" id="roadNmDaddr" class="input no_line" aria-label="상세주소" placeholder="상세주소" value="'+nvl(data[i].road_nm_daddr,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">차고지 도로명상세주소</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="garageRoadNmDaddr">차고지 도로명상세주소</label>';
					html += '						<input type="text" id="garageRoadNmDaddr" class="input no_line" aria-label="차고지 도로명상세주소" placeholder="차고지 도로명상세주소" value="'+nvl(data[i].garage_road_nm_daddr,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '		</table>';
					html += '	</div>';
					html += '</div>';

					html += '<div class="contBox">';
					html += '	<div class="nameBox nameBox-flex">';
					html += '		<h4 class="name">회사 상태 정보</h4>';
					html += '	</div>';
					html += '	<div class="cont cont-flex">';
					html += '		<table class="tb rental_tb01">';
					html += '			<tr>';
					html += '				<th scope="col">영업상태</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="bsnStts">영업상태</label>';
					html += '						<input type="text" id="bsnStts" class="input no_line" aria-label="영업상태" placeholder="영업상태" value="'+nvl(data[i].bsn_stts_nm,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">상태변경일시</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="bsnSttsMdfcnDt">상태변경일시</label>';
					html += '						<input type="text" id="bsnSttsMdfcnDt" class="input no_line" aria-label="상태변경일시" placeholder="상태변경일시" value="'+nvl(data[i].bsn_stts_mdfcn_dt,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">연락처</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="telNumber">연락처</label>';
					html += '						<input type="text" id="telNumber" class="input no_line" aria-label="연락처" placeholder="연락처" value="'+nvl(data[i].telno,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">차량등록대수</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="vhclRegCntom">차량등록대수</label>';
					html += '						<input type="text" id="vhclRegCntom" class="input no_line" aria-label="차량등록대수" placeholder="차량등록대수" value="'+nvl(data[i].vhcl_reg_noh,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">승용차대수</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="sednCarNoh">승용차대수</label>';
					html += '						<input type="text" id="sednCarNoh" class="input no_line" aria-label="승용차대수" placeholder="승용차대수" value="'+nvl(data[i].car_noh,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">승합차대수</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="passVhcleNoh">승합차대수</label>';
					html += '						<input type="text" id="passVhcleNoh" class="input no_line" aria-label="승합차대수" placeholder="승합차대수" value="'+nvl(data[i].van_noh,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '		</table>';
					html += '		<table class="tb rental_tb01">';
					html += '			<tr>';
					html += '				<th scope="col">평일운영시간</th>';
					html += '				<td>';
					html += '					<ul class="hours">';
					html += '						<li class="hour_input">';
					html += '							<label for="operBgngDt">평일오픈시간</label>';
					html += '							<input id="operBgngDt" class="input no_line" aria-label="평일오픈시간" placeholder="00:00" value="'+nvl(data[i].oper_bgng_dt,' ')+'" readonly/>';
					html += '						</li>';
					html += '						<li class="bar">~</li>';
					html += '						<li class="hour_input">';
					html += '							<label for="operEndDt">평일마감시간</label>';
					html += '							<input id="operEndDt" class="input no_line" aria-label="평일마감시간" placeholder="00:00" value="'+nvl(data[i].oper_end_dt,' ')+'" readonly/>';
					html += '						</li>';
					html += '					</ul>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">전기승용차</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="elecSednCarNoh">전기승용차</label>';
					html += '						<input type="text" id="elecSednCarNoh" class="input no_line" aria-label="전기승용차" placeholder="전기승용차" value="'+nvl(data[i].elcty_car_noh,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col">전기승합차</th>';
					html += '				<td>';
					html += '					<div class="tb_flex">';
					html += '						<label for="elecPassVhcleNoh">전기승합차</label>';
					html += '						<input type="text" id="elecPassVhcleNoh" class="input no_line" aria-label="전기승합차" placeholder="전기승합차" value="'+nvl(data[i].elcty_van_noh,' ')+'" readonly/>';
					html += '					</div>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col" class="note_name">비고</th>';
					html += '				<td class="textarea_wr">';
					html += '					<label for="rmrk">비고</label>';
					html += '					<textarea id="rmrk" name="rmrk" cols="30" rows="10" class="input no_line" aria-label="비고" placeholder="비고" readonly >'+nvl(data[i].rmrk,' ')+'</textarea>';
					html += '				</td>';
					html += '			</tr>';
					html += '			<tr>';
					html += '				<th scope="col" class="note_name">수정사유</th>';
					html += '				<td class="textarea_wr">';
					html += '					<label for="mdfcnRsn">수정사유</label>';
					html += '					<textarea id="rmrk" name="mdfcnRsn" cols="30" rows="5" class="input no_line" aria-label="수정사유" placeholder="수정사유" style="height: 100%;"'
					html += '							  readonly >'+nvl(data[i].mdfcn_rsn,' ')+'</textarea>';
					html += '				</td>';
					html += '			</tr>';
					html += '		</table>';
					html += '	</div>';
					html += '</div>';

					html += '<div style="margin: 50px"></div>';
					total -= 1;
				}

				$('#detailContent').html(html);

			});
		},
		/**
         *
         * @name         : searchCond
         * @description  : 조회 조건(회사명, 수정사유, 영업상태)
         * @date         : 2024. 03. 21
         * @author       : 김경룡
         */
		searchCond: function() {
			
			/* 추후에 넣어보자! */
			
//			var dropData = [{"cd" : "1", "cd_nm" : "회사명"}, {"cd" : "2", "cd_nm" : "수정사유"}];
//			// 회사명, 수정사유 조건 조회
//			$("#dropCond").kendoDropDownList({
//				dataTextField: "cd_nm",
//				dataValueField: "cd",
//				dataSource: dropData,
//				value: "cd_nm",
//				change: function(e) {
//					console.log(e)
//				}
//			})

			// 영업상태
			ajax(true, contextPath+'/sys/company/searchBsnStts', 'body', '처리중입니다.', {}, function (data) {
				$('#searchBsnStts').kendoDropDownList({
		            optionLabel: "영업상태(전체)",
		            dataTextField: "cd_nm",
		            dataValueField: "cd",
		            dataSource: data,
					value : "cd_nm"
		        });
			});			
		}
	};

	//이벤트 정의
	$company.event = {
		setUIEvent: function() {

			// 엔터로 검색
			document.addEventListener('keydown', function(event) {
			  if (event.key === "Enter") {
				$("#companyGrid").data("kendoGrid").dataSource.page(1);
			  }
			});

			// 엑셀 다운로드 버튼
			$(".excelDownBtn").on("click", function() {
				$company.event.excelDownBtn();
			});

			// 검색 버튼
			$('.searchBtn').on("click", function() {
				var ctpvCd = $('#searchCtpvNm').val();
				var sggCd = $('#searchSggNm').val();
				
				if(ctpvCd != '' && sggCd != '') {excelDownArc.regCmptncCd = sggCd;}
				else if(ctpvCd != '' && sggCd == '') {excelDownArc.regCmptncCd = ctpvCd;}
				excelDownArc.searchCompany = $('#searchCompany').val();
				excelDownArc.searchBsnStts = $('#searchBsnStts').val();
				excelDownArc.searchChk = $("input[name='searchChk']:checked").val();
				excelDownArc._csrf = $('._csrf').val();
				
				$("#companyGrid").data("kendoGrid").dataSource.page(1);
			});

			// 닫기, X 버튼
			$('.popClose').on("click", function() {
				$(".scrollBar02").scrollTop(0);
				$("body").css("overflow", "auto");
				$("#companyGrid").data("kendoGrid").dataSource.page(1);
			});
		},
		
		// 엑셀다운로드
		excelDownBtn: function() {
			var ctpvCd = $('#searchCtpvNm').val();
			var sggCd = $('#searchSggNm').val();
			var regCmptncCd = null;
			var fileName = "companyInfoUpdateHistory";
			
			if (ctpvCd != '' && sggCd != '') {regCmptncCd = sggCd;}
			else if (ctpvCd != '' && sggCd == '') {regCmptncCd = ctpvCd;}

			var totalRowCount = $("#companyGrid").data("kendoGrid").dataSource.total();
			
			if(totalRowCount == 0) {
				alert("데이터가 존재하지 않습니다.");
			} else {
				if(Object.keys(excelDownArc).length == 0) {
					excelDownArc.regCmptncCd = regCmptncCd;
					excelDownArc.searchCompany = "";
					excelDownArc.searchBsnStts = "";
					excelDownArc.searchChk = "jurisdiction";
				}
				excelDown("/sys/company/excelDown", excelDownArc, fileName, totalRowCount);
			}
		}

	};
	
	$company.comm = {
		/**
		 * @Description : AJAX 통신 Sync Choice 모드
		 * @Author      : 비동기 처리 (토근포함)
		 * @Date        :
		 */

		syncAjax: function(choiceSync, isLodingBool, url, isLodingElement, beforeSendText, ajaxParam, fn_success, fn_complete) {

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
	};
}(window, document, jQuery));