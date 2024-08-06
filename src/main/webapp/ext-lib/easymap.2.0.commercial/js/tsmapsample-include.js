/**
 * Created by htkim on 2014-11-04.
 */
(function () {

	function getPath() {
		var scripts = document.getElementsByTagName('script');
		for (var i = 0; i < scripts.length; i++) {
			var src = scripts[i].src;
			if (src) {
				var res = src.match(/^(.*)tsmapsample-include\.js$/);
				if (res) {
					//console.log("getPath =>"+res[1]);
					return res[1];
				}
			}
		}
	}

	function createScriptStr(srcUrl) {

		var scriptStart, scriptEnd;
		scriptStart = '<script type="text/javascript" src="';
		scriptEnd = '"></script>';

		return scriptStart + srcUrl + scriptEnd;
	}

	function createCssStr(cssUrl) {
		var cssStart, cssEnd;
		cssStart = '<link rel="stylesheet" href="';
		cssEnd = '">';
		return cssStart + cssUrl + cssEnd;
	}

	function writeDocument(arr, strFunc) {
		var idx = 0, len = arr.length;
		for (; idx < len; idx++) {
			document.writeln(strFunc(arr[idx]));
		}
	}

	var tsmapCssUrls, tsmapSrcUrls, path;
	path = getPath();
	tsmapCssUrls = [
		//path + '../dist/tsmap.css', path + 'css/screen.css'
        '/css/gis/tsmap.css', '/css/gis/screen-sample.css'
	];

	tsmapSrcUrls = [
		//path + '../dist/tsmap-src.js'
        '/js/gis/tsmap-src.js'
	];

	writeDocument(tsmapCssUrls, createCssStr);
	writeDocument(tsmapSrcUrls, createScriptStr);
	//var markerIconUrl = 'https://sgisapi.kostat.go.kr/maps/images';
    var markerIconUrl = '/images/gis';
//	document.writeln('<script defer>tsmap.Const.IMAGE_PATH = "' + path + '../dist/images";</script>');
	document.writeln('<script defer>tsmap.Const.IMAGE_PATH ="' + markerIconUrl + '";</script>');
})();