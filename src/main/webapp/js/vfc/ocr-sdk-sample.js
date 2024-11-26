(function (W, D, $) {
    'use strict';

    W.$drive = W.$drive || {};
    
    $(D).ready(function () {
        $("#g-ocr-btn").on("click", function () {
            ocrStart();
        });
    });

    const getLoadingMarkup = function (uiPosition, loading, fillColor) {
        return `
            <svg xmlns='http://www.w3.org/2000/svg' id='${uiPosition}-ui-loading' xmlns:xlink='http://www.w3.org/1999/xlink' style='margin: auto; background: none; display: ${
            loading ? "block" : "none"
        }; shape-rendering: auto;' width='32px' height='32px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'>
                <circle cx='84' cy='50' r='10' fill='${fillColor}'>
                    <animate attributeName='r' repeatCount='indefinite' dur='0.5555555555555556s' calcMode='spline' keyTimes='0;1' values='10;0' keySplines='0 0.5 0.5 1' begin='0s'></animate>
                    <animate attributeName='fill' repeatCount='indefinite' dur='2.2222222222222223s' calcMode='discrete' keyTimes='0;0.25;0.5;0.75;1' values='#86868600;#86868600;#86868600;#86868600;#86868600' begin='0s'></animate>
                </circle>
                <circle cx='16' cy='50' r='10' fill='${fillColor}'>
                    <animate attributeName='r' repeatCount='indefinite' dur='2.2222222222222223s' calcMode='spline' keyTimes='0;0.25;0.5;0.75;1' values='0;0;10;10;10' keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1' begin='0s'></animate>
                    <animate attributeName='cx' repeatCount='indefinite' dur='2.2222222222222223s' calcMode='spline' keyTimes='0;0.25;0.5;0.75;1' values='16;16;16;50;84' keySplines='0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1' begin='0s'></animate>
                </circle>
                <!-- Other circle animations are similar and omitted for brevity -->
            </svg>
        `;
    };

    const getProgressStatus = function (ocr, data, wasm = true) {
        const isCreditCard = data.ocrType.indexOf("credit") > -1;
        const cardTypeString = isCreditCard ? "신용카드" : "신분증";

        const result = { message: "", process: "" };

        switch (data.inProgress) {
            case ocr.IN_PROGRESS.NOT_READY:
                result.message = `${cardTypeString} 촬영을 위해 카메라를 불러오는 중 입니다.`;
                result.process = "loading";
                break;
            case ocr.IN_PROGRESS.READY:
                result.message = wasm
                    ? `영역 안에 ${cardTypeString}이 꽉 차도록 위치시키면 자동 촬영됩니다.`
                    : `영역 안에 ${cardTypeString}이 꽉 차도록 위치시킨 후 촬영 버튼을 눌러주세요.`;
                break;
            // Other cases omitted for brevity
        }

        return result;
    };

    const mergeFromResponse = function (response) {
        return {
            ocrMode: response[0],
            ocrType: response[1],
            inProgress: response[2],
            customUI: response[3],
            uiPosition: response[4],
            useTextMsg: response[5],
            useCaptureUI: response[6],
            usePreviewUI: response[7],
            recognizedImage: response[8],
        };
    };

    const ocrSdk = new AlcheraOcrSDK();

    const onSuccess = function (result) {
        console.log(result.review_result);
        ocrSdk.stopOCR();
    };

    const onFailure = function (result) {
        console.log(result);
        ocrSdk.stopOCR();
    };

    const onProgress = function (...rest) {
        const data = mergeFromResponse(rest);
        const status = getProgressStatus(ocrSdk, data);
        const loading = status.process === "loading";

        if (data.ocrMode === "wasm" && data.customUI && data.useTextMsg) {
            const el_text = $(data.customUI).find(`#${data.uiPosition}-ui-text-msg`);
            const el_loading = $(data.customUI).find(`#${data.uiPosition}-ui-loading`);

            if (el_text.length) el_text.html(status.message);
            if (el_loading.length) el_loading.html(getLoadingMarkup(data.uiPosition, loading, "#FFF"));
        }
    };
    
    const config = {
		authServerInfo: {
		baseUrl: "https://example.auth.base.url",
		credential: {
		customer_id: 0,
		username: "username",
		password: "password",
		},
		},
		ocrServerBaseUrl: "https://example.server.base.url",
		resourceBaseUrl: "https://example.resource.base.url",
		licenseKey: "any-license-key",
		useEncryptMode: false,
	};

    const ocrStart = function () {
        ocrSdk.init(config).then(function () {
            try {
                ocrSdk.stopOCR();
            } catch (e) {}
            ocrSdk.startOCR("idcard", onSuccess, onFailure, onProgress);
        });
    };

})(window, document, jQuery);
