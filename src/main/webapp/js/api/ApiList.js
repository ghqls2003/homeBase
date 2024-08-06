(function(W, D, $) {

	W.$apiList = W.$apiList || {};

	$(document).ready(function() {
		$apiList.ui.pageLoad();		//최초 페이지 로드 시
		$apiList.event.setUIEvent();
	});

	$apiList.ui = {
		/**
		 *
		 * @name         : pageLoad
		 * @description  : 최초 페이지 로드 시 UI에 적용
		 * @date         : 2023. 10. 16.
		 * @author	     : 김상훈
		 */
		pageLoad: function() {
			$apiList.ui.issueApi();
		},

		issueApi: function(UserSn) {
			var UserSn = UserSn
			const arg = {};
			arg.UserSn = UserSn;

			$apiList.ui.apiListview();

		},

		apiListview: function() {
			$('#update_btn2').hide();
			const param = {};
			ajax(true, contextPath + '/api/apiList/listView', 'body', '조회중입니다', param, function(data) {
				const apiNmContainer = $('#ApiNm');

				for (let i = 0; i < data.data_req.length; i++) {
					const apiNm = data.data_req[i].apiNm;
					const apiSn = data.data_req[i].apiSn;
					const selectedData = data.data_req[i];
					const selectedData2 = data.data_res[i];
					const button = $('<li style ="display : flex;" class="tab-link current"><button>').text("· " + apiNm);

					button.on('click', function() {


						$apiList.ui.apiExplain(selectedData);
						$apiList.ui.apiResponse(selectedData2);
					});

					apiNmContainer.append(button);
					if (i == 0) {
						button.trigger('click');
					}
				}

			});
		},

		apiExplain: function(selectedData) {

			$('#apiRequest').empty();
			$('#ApiExplain').html(selectedData.apiExpln);
			$('#apiAdr').html(selectedData.dmndAddr);
			const table = document.createElement('table');

			const thead = document.createElement('thead');
			thead.innerHTML = `
			        <tr>
			            <th>요청변수</th>
			            <th>값</th>
			            <th>필수여부</th>
			            <th>설명</th>
			        </tr>
			    `;

			table.appendChild(thead);

			if (selectedData.vl && selectedData.parameter && selectedData.esntlYn && selectedData.expln) {
				const vlArray = selectedData.vl.split(', ');
				const parameterArray = selectedData.parameter.split(', ');
				const esntlYnArray = selectedData.esntlYn.split(', ');
				const explnArray = selectedData.expln.split(', ');
//				람다
				const updatedExplnArray = explnArray.map(item => item.replace(/^\((.*)\)$/, '$1'));
//				람다를 풀어둔것
//				 const updateExplnArray = explnArray.map(function(item){
//					return item.replace(/^\((.*)\)$/, '$1')
//				})


				for (let i = 0; i < vlArray.length; i++) {
					const tr = document.createElement('tr');
					tr.innerHTML = `
                <td id="paramRequest">${parameterArray[i]}</td>
                <td id="viRequest">${vlArray[i]}</td>
                <td id="YnRequest">${esntlYnArray[i]}</td>
                <td id="ExplainRequest">${updatedExplnArray[i]}</td>
            `;
					table.appendChild(tr);
				}
			}
			const button = $('<div class="btn_flex">< button class= "blue_btn" >신청하기');

			$('#apiRequest').append(table);

		},

		apiResponse: function(selectedData2) {
			$('#ApiResponse').empty();

			const table = document.createElement('table');
			const thead = document.createElement('thead');

			thead.innerHTML = `
	                <tr>
	                    <th>출력변수</th>
	                    <th>값</th>
	                    <th>설명</th>
	                </tr>
			    `;

			table.appendChild(thead);
			if (selectedData2.vl && selectedData2.parameter && selectedData2.esntlYn && selectedData2.expln) {
				const vlArray = selectedData2.vl.split(', ');
				const parameterArray = selectedData2.parameter.split(', ');
				const expln = selectedData2.expln;

				const regex = /(?:[^,(]+|\([^)]+\))+/g;
				const explnArray = expln.match(regex).map(part => part.trim());
				const updatedExplnArray = explnArray.map(item => item.replace(/^\((.*)\)$/, '$1'));

				for (let i = 0; i < vlArray.length; i++) {
					const tr = document.createElement('tr');
					tr.innerHTML = `
            <td id="paramResponse">${parameterArray[i]}</td>
            <td id="viResponse">${vlArray[i]}</td>
            <td id="ExplainResponse">${updatedExplnArray[i]}</td>
        `;
					table.appendChild(tr);
				}
			} else {
				console.error('데이터가 비어 있습니다.');
			}

			$('#ApiResponse').append(table);
		},


	};


	//이벤트 정의
	$apiList.event = {
		setUIEvent: function() {

		},
	};
}(window, document, jQuery));
