var __confirmwindow = function(__SANDBOX) {
function loadDoc(gUITarget) {
var XWC = {
	$: function (id) {
		return document.getElementById(id);
	},

	namespace: function (aModuleName) {
		if (!XWC[aModuleName]) {
			XWC[aModuleName] = {};
		}
	},

	stringToArray: function (aString) {
		var aArray, aRows, i;
		aArray = [];
		aRows = aString.split("\t\n");
		for (i = 0; i < aRows.length - 1; i++) {
			aArray.push(aRows[i].split("$"));
		}
		return aArray;
	},

	lang: function () {
		return AnySign.mLanguage;
	},

	getLocaleResource: function (module, lang) {
		try { __SANDBOX.integrityModule = module; }catch(e) {console.log('try catch - integrityModule');}

		var req;
		if (window.ActiveXObject) {
			try {
				req = new ActiveXObject("MSXML2.XMLHTTP.3.0");
			}catch(e) {
				try {
					req = new ActiveXObject("Microsoft.XMLHTTP");
				}catch(e){
					console.log("try catch - new ActiveXObject");
				}
			}
		}
		else if (window.XMLHttpRequest) {
			req = new window.XMLHttpRequest;
		}

		var d = new Date();
		var year = d.getFullYear().toString();
		var month = (d.getMonth()+1).toString();
		var day = d.getDate().toString();
		var hour = d.getHours().toString();
		var minutes = Math.floor(d.getMinutes()/10) * 10

		var path = AnySign.mBasePath + "/locale/" +  module + "_" + lang + ".js?version=" + year + month + day + hour + minutes;

		req.open('GET', path, false);
		req.send(null);
		XWC.S = (new Function ('return ' + req.responseText))();
	},

	STR: function (id) {
		document.write(XWC.S[id]);
	},

	JSSTR: function (aID) {
		return XWC.S[aID];
	}
};

XWC.Util = {
	getCNFromRDN: function (rdn) {
		var base_position = rdn.indexOf("cn="),
			next_position = rdn.indexOf(",", base_position);

		if (base_position != -1) {
			base_position += 3;
		} else {
			base_position = rdn.toUpperCase().indexOf("OU=");
			next_position = rdn.indexOf(",", base_position);
			base_position += 3;
		}
		if (base_position == -1) {
			base_position = 0;
		}
		if (next_position == -1) {
			next_position = rdn.length;
		}
		return rdn.substring(base_position, next_position);
	},

	checkPwdFormat: function (passwd, passwdconfirm, confirm) {
		var containsChar, containsNum, i, aCharCode;
		containsChar = containsNum = false;

				if (passwd.length < 8 || passwd.length > 56) {
			alert(XWC.S.lengtherror);
			return false;
		}

				for (i = 0; i < passwd.length; i++) {
			aCharCode = passwd.charCodeAt(i);
			if (aCharCode > 47 && aCharCode < 58) {
				containsNum = true;
			} else {
				containsChar = true;
			}

			if (containsNum && containsChar) {
				break;
			}
		}

		if (!containsNum || !containsChar) {
			alert(XWC.S.syntaxerror);
			return false;
		}

		if (confirm && passwd != passwdconfirm) {
			alert(XWC.S.matcherror);
			return false;
		}

		return true;
	},

		getCurrentDate: function () {
		var currentDate = new Date(),
			year = currentDate.getFullYear(),
			month = currentDate.getMonth() + 1,
			day = currentDate.getDate(),
			hours = currentDate.getHours(),
			minutes = currentDate.getMinutes(),
			seconds = currentDate.getSeconds();

		return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
	},

	getRANameFromRDN: function (rdn) {
		var i = 0,
			j = 0,
		    aArrayRDN,
		    aArrayNameValue;
		
		aArrayRDN = rdn.split(",");		
		for (i = 0; i < aArrayRDN.length; i++) {
			aArrayNameValue = aArrayRDN[i].split("=");
			if (aArrayNameValue[0] == "ou") {
				for (j = 0; j < AnySign.mRAList.length; j++) {
					if (AnySign.mRAList[j].aOU == aArrayNameValue[1]) {
						if (AnySign.mLanguage == "ko-KR")
							return AnySign.mRAList[j].aKRName;
						else
							return AnySign.mRAList[j].aUSName;
					}
				}
			}
		}
		
		return null;
	}
};


XWC.Event = {
	add: function (aTarget, aType, aListener, aThisObj) {
		var aListenerHelper = function (e) {
			if (!e) {
				var aWindow = window;
				while (!(e = aWindow.event)) { aWindow = parent; }
			}
			if (!e.target) {
				e.target = e.srcElement;
			}
			if (!aThisObj) {
				aThisObj = this;
			}
			aListener.apply(aThisObj, [e]);
		};

		if (aTarget.addEventListener) {
			aTarget.addEventListener(aType, aListenerHelper, false);
		} else {
			aTarget.attachEvent("on" + aType, aListenerHelper);
		}

		return aListenerHelper;
	},

	remove: function (aTarget, aType, aListener) {
		if (aTarget.removeEventListener) {
			aTarget.removeEventListener(aType, aListener, false);
		} else {
			aTarget.detachEvent("on" + aType, aListener);
		}
	},

	dispatch: function (aTarget, aType) {
		if (aTarget.dispatchEvent) {
			var evt = document.createEvent("HTMLEvents");
			evt.initEvent(aType, true, true);
			aTarget.dispatchEvent(evt);
		} else {
			aTarget.fireEvent("on" + aType);
		}
	},

	preventDefault: function (e) {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	},

	stopPropagation: function (e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	}
};

XWC.UI = {};

XWC.UI.ImagePreloadHandler = (function () {
	var aCounter = 0,
		aCallback;

	function _onload () {
		aCounter--;
		if (aCounter == 0 && aCallback) {
			aCallback();
		}
	}

	return {
		add: function (aElement) { 
			aElement.onload = _onload;
			aElement.onerror = _onload;
			aElement.onabort = _onload;
			return aCounter++; 
		},
		setCallback: function (aFunction) {
			aCallback = aFunction;
		}
	}
})();

XWC.UI.createImage = function (aSrc) {
	var aImage = document.createElement("img");

	XWC.UI.ImagePreloadHandler.add (aImage);	
	aImage.src = aSrc;

	return aImage;
};

XWC.UI.findParent = function (aElement, aTagName) {
	var aParent = aElement;

	while (aParent) {
		if (aParent.tagName && (aParent.tagName.toUpperCase() == aTagName.toUpperCase())) {
			return aParent;
		}
		aParent = aParent.parentNode;
	}

	return;
};

XWC.UI.createElement = function (aTagName) {
	var aElement;

	if (__SANDBOX.isIE() && aTagName.indexOf("FORM") >= 0) {
		if (XWC.UI.findParent (gUITarget, "FORM")) {
			aTagName = aTagName.split("FORM").join("DIV");
		}
	}

	aElement = document.createElement(aTagName);

	aElement.style.cssText = AnySign.mUISettings.mCSSDefault;

	return aElement;
};

XWC.UI.firstChildOf = function (aElement) {
	var temp = aElement.firstChild;
	return temp;
};

XWC.UI.nextSibling = function (aElement) {
	var temp = aElement.nextSibling;
	return temp;
};

XWC.UI.offset = function () {
	return __SANDBOX.dialogOffset + 2;
};
XWC.UI.RadioButtonGroup = function (aElements, aType) {
	var aTemp,
		aButtons = aElements,
		aButton,
		aSelectedButton,
		i;

	function __mouseover (e, thiz) {		
		if (aType != "wide") {
			thiz.className = "xwup-rbg-hover";
			if (thiz.childNodes[0]) {
				var pngpath= "/img/icon_" + thiz.id.split("xwup_media_")[1];
				backgroundImage = "url('" + AnySign.mBasePath + pngpath+ "_hover.png')";
				backgroundImage += ",url('" + AnySign.mBasePath + pngpath+ ".png')";
				thiz.childNodes[0].style.backgroundImage = backgroundImage;
			}
		}
	}

	function __mouseout (e, thiz) {
		if (aType != "wide") {
			thiz.className = "xwup-rbg-normal";
			if (thiz.childNodes[0]) {
				var pngpath= "/img/icon_" + thiz.id.split("xwup_media_")[1];
				thiz.childNodes[0].style.backgroundImage = "url('" + AnySign.mBasePath + pngpath+ ".png')";
			}
		}
	}

	function __onclick (e) {
		__setChecked.apply(this);

		if (this.orionclick) {
			this.orionclick();
		}
	}

	var aTypes = ["mouseover", "mouseout", "blur"],
		aListners= [__mouseover, __mouseout, __mouseout];

	function __addHoverAction (aElement) {
		var i,
			aListner;


		aElement.listeners = [];
		for (i = 0; i < aTypes.length; i++) {
			aListner = (function () {
				var aTarget = aElement,
					aFunction = aListners[i];
				return function (e) {
					aFunction (e, aTarget);
				}
			})();

			if (aElement.addEventListener) {
				aElement.addEventListener(aTypes[i], aListner, false);
			} else {
				aElement.attachEvent("on" + aTypes[i], aListner);
			}

			aElement.listeners.push (aListner);
		}
	}

	function __removeHoverAction (aElement) {
		var i = 0,
			aListners = aElement.listeners;

		for (i = aListners.length - 1; i >= 0 ; i--) {
			if (aElement.removeEventListener) {
				aElement.removeEventListener(aTypes[i], aListners[i], false);
			} else {
				aElement.detachEvent("on" + aTypes[i], aListners[i]);
			}
			aListners.pop ();
		}
	}

	function __setChecked (e) {
		if (aSelectedButton) {
			if (aType == "wide") {
				aSelectedButton.className = "xwup-wide-rbg";
			} else {
				aSelectedButton.className = "xwup-rbg-normal";
				__addHoverAction (aSelectedButton);
				__removeHoverAction (this);

				var pngpath= "/img/icon_" + aSelectedButton.id.split("xwup_media_")[1];
				aSelectedButton.childNodes[0].style.backgroundImage = "url('" + AnySign.mBasePath + pngpath+ ".png')";
			}

			aSelectedButton.setAttribute("aria-checked", "false", 0);
			aSelectedButton.setAttribute("title", aSelectedButton.title.replace(XWC.S.media_select, ''), 0);
		}

		if (aType == "wide") {
			this.className = "wide-xwup-rbg-pressed";
		} else {
			this.className = "xwup-rbg-pressed";
			__removeHoverAction (this);

			var pngpath= "/img/icon_" + this.id.split("xwup_media_")[1];
			backgroundImage = "url('" + AnySign.mBasePath + pngpath+ "_selected.png')";
			backgroundImage += ",url('" + AnySign.mBasePath + pngpath+ ".png')";
			this.childNodes[0].style.backgroundImage = backgroundImage;
		}

		this.setAttribute("aria-checked", "true", 0);
		this.title += XWC.S.media_select;
		aSelectedButton = this;
	}

	for (i = 0; i < aButtons.length; i++) {
		aButton = aButtons[i];
		aButton.style.cursor = "pointer";

		if (aType != "wide")
			__addHoverAction (aButton);

		aButton.orionclick = aButton.onclick; 		aButton.onclick = __onclick;
	}

	function __indexOrElement (aIndexOrElement) {
		var aElement;
		if (typeof aIndexOrElement == "number") {
			aElement = aButtons[aIndexOrElement];
		} else {
			aElement = aIndexOrElement;
		}
		return aElement;
	}

	function _setChecked (aIndexOrElement) {
		__setChecked.apply(__indexOrElement(aIndexOrElement));
	}

	function _select (aIndexOrElement) {
		XWC.Event.dispatch(__indexOrElement(aIndexOrElement), "click");
	}

	function _setDisabledAll () {
		for (var i = 0; i < aButtons.length; i++)
			_setDisabled (aButtons[i], true);
	}

	function _setDisabled (aIndexOrElement, aDisable) {
		var aElement = __indexOrElement(aIndexOrElement);
		var aImage = aElement.getElementsByTagName("span")[0];
		var aText = aElement.getElementsByTagName("span")[1];

		if (aType == "wide") {
			aElement.style.color = "#000";
		} else {
			aElement.className = "xwup-rbg-disabled";
		}
		
		var bgname;
		if (aDisable) {
			if (aElement.getElementsByTagName("span")[0].className.indexOf("-disabled") < 0) {
				bgname = aElement.getElementsByTagName("span")[0].className;
				aElement.getElementsByTagName("span")[0].className = bgname + "-disabled";
			}
			aElement.setAttribute ("aria-disabled", "true", 0);
			aText.style.color = "#ddd";
		} else {
			if (aElement.getElementsByTagName("span")[0].className.indexOf("-disabled") > -1) {
				bgname = aElement.getElementsByTagName("span")[0].className;
				aElement.getElementsByTagName("span")[0].className = bgname.split("-disabled")[0];
			}
			aElement.setAttribute ("aria-disabled", "false", 0);
			aText.style.color = "black";
		}
		aElement.disabled = aDisable;
		if (aType != "wide")
		{
			__removeHoverAction (aElement);
			if (aDisable == false)
				__addHoverAction (aElement);
		}
	}
	
	function _updateDisabled () {
		var i;

		for (i = 0; i < aButtons.length; i++) {
			if (aButtons[i].disabled) {
				_setDisabled(aButtons[i], true);
			}
		}
	}

	function _setLocationEnable (aName, aElement, aIsWinOnly, aIsWin32Only)
	{
		var aDisable = false;

		if (aIsWinOnly)
		{
			if (navigator.platform != "Win32" && navigator.platform != "Win64")
				aDisable = true;
		}

		if (aIsWin32Only)
		{
			if (navigator.platform == "Win64")
				aDisable = true;
		}

		if (!__SANDBOX.certLocationSet[aName])
			aDisable = true;

		_setDisabled (aElement, aDisable);
	}

	return {
		select: _select,
		setDisabled : _setDisabled,
		setDisabledAll : _setDisabledAll,
		updateDisabled : _updateDisabled,
		setChecked: _setChecked,
		setLocationEnable : _setLocationEnable
	}
};

XWC.UI.TabAdapter = function (element, eventfunction, firstSelectedIndex) {
	var aSelectedTabIndex = firstSelectedIndex || 0,
		aTabListNode,
		aTabNavButtonNodeList,
		aTabEvent = eventfunction,
		i,
		aNavButton;

	function selectTabIndex(aIndex) {
		aTabNavButtonNodeList[aIndex].className = "tabnav-selected";
		if (aTabEvent != "undefined")
			aTabEvent(aSelectedTabIndex);
	}

	function unselectTabIndex(aIndex) {
		aTabNavButtonNodeList[aIndex].className = "tabnav-unselected";
	}

	function onclickTab(e) {
		unselectTabIndex([aSelectedTabIndex]);

		if(e.target.tagName=="A"){
			aSelectedTabIndex = e.target.parentNode.index;	
		}else{
			aSelectedTabIndex = e.target.index;
		}
		selectTabIndex(aSelectedTabIndex);
	}
	
	function onkeyupTab(e) {
		e = e || window.event;
		
		var aKeyCode = e.which || e.keyCode;

		if (aKeyCode == 37) {
			unselectTabIndex(aSelectedTabIndex);

			if (aSelectedTabIndex > 0)
				aSelectedTabIndex = aSelectedTabIndex - 1;

			selectTabIndex(aSelectedTabIndex);
		}
		else if (aKeyCode == 39) {
			unselectTabIndex(aSelectedTabIndex);

			if (aSelectedTabIndex < aTabNavButtonNodeList.length - 1)
				aSelectedTabIndex = aSelectedTabIndex + 1;

			selectTabIndex(aSelectedTabIndex);
		}
		else if (aKeyCode == 13 || aKeyCode == 32) {
			onclickTab(e);
			return true;
		}
		else {
			return true;
		}

		XWC.Event.stopPropagation(e);
		XWC.Event.preventDefault(e);
	}

		aTabNavButtonNodeList = element.getElementsByTagName("li");

	for (i = 0; i < aTabNavButtonNodeList.length; i++) {
		unselectTabIndex(i);

		aNavButton = aTabNavButtonNodeList[i];
		aNavButton.index = i;

		XWC.Event.add(aNavButton.firstChild, "click", onclickTab);
		XWC.Event.add(aNavButton, "keyup", onkeyupTab);
	}

		for (i = 0; i < aTabNavButtonNodeList.length; i++) {
		aTabNavButtonNodeList[i].setAttribute ("role", "tab", 0);
	}

	selectTabIndex(aSelectedTabIndex);

	return {
		getSelectedIndex : function() {
			return aSelectedTabIndex;
		},
		setSelectedIndex : function(index) {
			aTabNavButtonNodeList[aSelectedTabIndex].className = "tabnav-unselected";
			aSelectedTabIndex = index;
			aTabNavButtonNodeList[index].className = "tabnav-selected";
		},
		getSelectedElement : function() {
			return aTabNavButtonNodeList;
		},
		selectTab : function (index) {
			unselectTabIndex([aSelectedTabIndex]);
			aSelectedTabIndex = index;
			selectTabIndex(index);
		},
		unSelectTab : function (index) {
			unselectTabIndex([aSelectedTabIndex]);
			aSelectedTabIndex = index;
			aTabNavButtonNodeList[index].className = "tabnav-selected";
		}
	}
};

XWC.UI.appendTabControl = function (aElement, firstfocus) {
	var i,
		aTabableElements = [],
		aChildNodeList = aElement.getElementsByTagName('*'),
		aNode,
		aCurrentElementIndex = 0,
		aOldKeyupEventListner,
		aOldKeydownEventListner;

	function _tabSort (e1, e2) {
		return e1.getAttribute("tabindex", 0) - e2.getAttribute("tabindex", 0);
	}

	function _nextFocus () {
		var aNext,
			aPass;
			
		aCurrentElementIndex = ++aCurrentElementIndex % aTabableElements.length;

		aNext = aTabableElements[aCurrentElementIndex];
		aPass  = aNext.disabled || aNext.offsetWidth == 0;

		if (aPass) {
			_nextFocus();
		} else {
			aNext.focus();
		}
	}

	function _previousFocus() {
		var aPrev,
			aPass;

		--aCurrentElementIndex;
		if (aCurrentElementIndex < 0) {
			aCurrentElementIndex = aTabableElements.length - 1;
		}

		aPrev = aTabableElements[aCurrentElementIndex];
		aPass  = aPrev.disabled || aPrev.offsetWidth == 0;

		if (aPass) {
			_previousFocus();
		} else {
			aPrev.focus();
		}
	}

	function _reverseFocusElement(e, aStartElementIndex) {

		var aCheckReverse = aStartElementIndex - aCurrentElementIndex;

		if (e.shiftKey) {
			if(aCheckReverse < 0)
			{
				if( aStartElementIndex == 0)
				{
					return false;
				}

				if(document.getElementById('xwup_title_information'))
					++aCurrentElementIndex;

				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			if(aCheckReverse > 0)
			{
				if( aStartElementIndex == aTabableElements.length)
				{
					return false;
				}

				if(document.getElementById('xwup_title_information'))
					--aCurrentElementIndex;

				return true;
			}
			else
			{
				return false;
			}
		}
	}
	
	function _keyupHandler (e) {
		e = e || window.event;
		var aKeyCode = e.which || e.keyCode;

		var aStartElementIndex = aCurrentElementIndex;

		if (aKeyCode == 9) {
			if (e.shiftKey) {
				_previousFocus();
			} else {
				_nextFocus();
			}

			XWC.Event.stopPropagation(e);
			XWC.Event.preventDefault(e);

			return _reverseFocusElement(e, aStartElementIndex);
		}
	}

	function _onfocus (e) {
		var i = 0;
		for (i = 0; i < aTabableElements.length; i++) {
			if (aTabableElements[i] == this) {
				aCurrentElementIndex = i;
				break;
			}
		}
	}

	for (i = 0; i < aChildNodeList.length; i++) {
		aNode = aChildNodeList[i];
		if (aNode.getAttribute("tabindex",0) > 0) {
			if (aNode.tagName.toUpperCase() == "TR") {
				continue;
			}

			aTabableElements.push(aNode);
			aNode.onfocus = _onfocus;
		}
	}

	if (aTabableElements.length == 0) {
		return;
	}

	aTabableElements.sort (_tabSort);

	aOldKeyupEventListner = document.onkeyup;
	document.onkeyup = _keyupHandler;
	aOldKeydownEventListner = document.onkeydown;
	document.onkeydown = function(e) {
		if(e.keyCode == 9 || e.keyCode == 38 || e.keyCode == 40)
			return false;
	};

	return {
		remove : function () {
			document.onkeyup = aOldKeyupEventListner;
			document.onkeydown = aOldKeydownEventListner;
		}
	}
};

XWC.UI.setPFXDragAndDrop = function (aType, aDragAndDropElement, aGuideZoneElement, aUserCallback) {
	var aPFX, aSignCert, aSignKey, aKmCert, aKmKey = null;
	var aDragZone, aDragZoneParent, aGuideZone, aGuideZoneParent;

	aDragZoneParent = document.createElement("DIV");
	aDragZoneParent.style.position = "relative";

	aDragZone = document.createElement("DIV");
	aDragZone.id = "xwup_drag_zone";
	aDragZone.className = "xwup-drag-zone";

	aDragZoneParent.appendChild(aDragZone);
	aDragAndDropElement.appendChild(aDragZoneParent);

	aGuideZoneParent = document.createElement("DIV");
	aGuideZoneParent.style.position = "relative";

	aGuideZone = document.createElement("DIV");
	aGuideZone.id = "xwup_drag_guide";
	aGuideZone.className = "xwup-drag-guide-" + aType;
	if (aType != "certmanager") aGuideZone.style.zIndex = -200;

	var aImg = document.createElement("IMG");
	aImg.src = AnySign.mBasePath + "/img/icon_memorystorage.png";
	aImg.setAttribute("alt", "");

	var aPtag = document.createElement("P");
	aPtag.style.textAlign = "center";
	var aSpan = document.createElement("SPAN");
	aSpan.className = "xwup-drag-guide-span";
	var aText = document.createTextNode(XWC.S.pfx_guide);
	aSpan.appendChild(aText);
	var aBrTag = document.createElement("BR");
	aSpan.appendChild(aBrTag);
	var aText2 = document.createTextNode(XWC.S.pfx_guide2);
	aSpan.appendChild(aText2);
	aPtag.appendChild(aSpan);

	aGuideZone.appendChild(aImg);
	aGuideZone.appendChild(aPtag);
	aGuideZoneParent.appendChild(aGuideZone);

	aGuideZoneElement.parentNode.insertBefore(aGuideZoneParent, aGuideZoneElement.nextSibling);
	
	function handleDragEnter (e) {
		if (aGuideZone.style.display == "none" || aGuideZone.style.display == "") return;

		e.dataTransfer.dropEffect = 'copy'; 

		aDragZone.classList.add ("xwup-drag-overlay-" + aType);
		aDragZone.style.zIndex = __SANDBOX.addDialogOffset() + 50;
		aDragZone.style.display = "block";

		aGuideZone.classList.add ("xwup-drag-hover");

		aSpan.classList.add ("xwup-drag-guide-span-hover");

		if (aGuideZone.className.indexOf('xwup-drag-guide-certmanager2') > 0 ||
			aGuideZone.className.indexOf('xwup-drag-guide-certselectwide2') > 0 ||
			aGuideZone.className.indexOf('xwup-drag-guide-certselect2') > 0 || 
			aGuideZone.className.indexOf('xwup-drag-guide-certrelay2') > 0) {
			aGuideZone.style.zIndex = 0;
			aGuideZone.childNodes[0].style.visibility = "visible";
			aGuideZone.childNodes[1].style.visibility = "visible";
		}

		XWC.Event.stopPropagation(e);
		XWC.Event.preventDefault(e);
	}

	function handleDragOver (e) {
		XWC.Event.stopPropagation(e);
		XWC.Event.preventDefault(e);
	}

	function handleDragLeave (e) {
		aDragZone.style.display = "none";

		aGuideZone.classList.remove ("xwup-drag-hover");

		aSpan.classList.remove ("xwup-drag-guide-span-hover");

		if (aGuideZone.className.indexOf('xwup-drag-guide-certmanager2') > 0 ||
			aGuideZone.className.indexOf('xwup-drag-guide-certselectwide2') > 0 ||
			aGuideZone.className.indexOf('xwup-drag-guide-certselect2') > 0 ||
			aGuideZone.className.indexOf('xwup-drag-guide-certrelay2') > 0) {
			aGuideZone.style.zIndex = -200;
			aGuideZone.childNodes[0].style.visibility = "hidden";
			aGuideZone.childNodes[1].style.visibility = "hidden";
		}

		XWC.Event.stopPropagation(e);
		XWC.Event.preventDefault(e);
	}

	function handleDrop (e) {
		var files = e.dataTransfer.files;
		var aSignCert, aSignKey, aKmCert, aKmKey = null;

				if(files.length == 0) { 			handleDragLeave(e);
			return -1;
		} else if(files.length == 1) { 			var lastDot = files[0].name.lastIndexOf('.');
			if(lastDot > 0) {
				var fileExt = files[0].name.substring(lastDot, files[0].name.length).toLowerCase();
				if(fileExt == '.der' || fileExt == '.cer' || fileExt == '.key') {
					alert(XWC.S.error_fileNum);
					handleDragLeave(e);
					return -1;
				} else if(fileExt != '.pfx' && fileExt != '.p12') {
					alert(XWC.S.error_fileExt);
					handleDragLeave(e);
					return -1;
				}
			} else {
				alert(XWC.S.error_fileExt);
				handleDragLeave(e);
				return -1;
			}
		} else if(files.length == 2) {
			for(var i = 0; i < files.length; i++) {
				var lastDot = files[i].name.lastIndexOf('.');
                var fileExt = files[i].name.substring(lastDot, files[i].name.length).toLowerCase();
                var name = files[i].name.toLowerCase();

                if(fileExt == '.pfx' || fileExt == '.p12') {
                    alert(XWC.S.error_fileNum);
                    handleDragLeave(e);
                    return -1;
                }
                if(fileExt == ".der" || fileExt == ".cer") {
                    aSignCert = name;
                } else if(fileExt == ".key") {
					aSignKey = name;
				} else {
					alert(XWC.S.error_fileExt);
					handleDragLeave(e);
					return -1;
				}
			}
			
			if(!(aSignCert && aSignKey)) {
				alert(XWC.S.error_fileExt);
				handleDragLeave(e);
				return -1;
			}
		} else if(files.length == 4) {
			for(var i = 0; i < files.length; i++) {
				var name = files[i].name.toLowerCase();
				if(fileExt == '.pfx' || fileExt == '.p12') {
					alert(XWC.S.error_fileNum);
					handleDragLeave(e);
					return -1;
				}
				if(name == "signcert.der" || name.indexOf("sig.cer") > 0) {
					aSignCert = name;
				} else if(name == "signpri.key" || name.indexOf("sig.key") > 0) {
					aSignKey = name;
				} else if(name == "kmcert.der" || name.indexOf("env.cer") > 0) {
					aKmCert = name;
				} else if(name == "kmpri.key" || name.indexOf("env.key") > 0) {
					aKmKey = name;
				} else {
					alert(XWC.S.error_fileExt);
					handleDragLeave(e);
					return -1;
				}
			}
			
			if(!(aSignCert && aSignKey && aKmCert && aKmKey )) {
				alert(XWC.S.error_fileExt);
				handleDragLeave(e);
				return -1;
			}
		} else {
			alert(XWC.S.error_fileNum);
			handleDragLeave(e);
			return -1;
		}
		
				var signCert, signKey, kmCert, kmKey, pfx;
		var count = 0;
		
		var readCert = function(file) {
			var name = file.name.toLowerCase();
			var reader = new FileReader();
			reader.onload = function(e) {
				if(name == aSignCert) {
					signCert = e.target.result;
				} else if(name == aSignKey) {
					signKey = e.target.result;
				} else if(name == aKmCert) {
					kmCert = e.target.result;
				} else if(name == aKmKey) {
					kmKey = e.target.result;
				} else { 					pfx = e.target.result;
				}
				
				count++;
				if(count == files.length) {
					if(count == 2) {
						aSignCert = signCert;
						aSignKey = signKey;
					} else if(count == 4) {
						aSignCert = signCert;
						aSignKey = signKey;
						aKmCert = kmCert;
						aKmKey = kmKey;
					} else  { 						aPFX = pfx;
					}
					handleDragLeave(e);
					aUserCallback(aPFX, aSignCert, aSignKey, aKmCert, aKmKey);
				}
			};
			reader.readAsArrayBuffer(file);
		}
		
		for(var i = 0; i < files.length; i++) {
			readCert(files[i]);
		}
	}
	if (aDragAndDropElement.addEventListener && aDragZone.addEventListener)
	{
		aDragAndDropElement.addEventListener ('dragenter', handleDragEnter, false);
		aDragZone.addEventListener ('dragleave', handleDragLeave, false);
		aDragZone.addEventListener ('drop', handleDrop, false);
	}
	else if (aDragAndDropElement.attachEvent && aDragZone.attachEvent)
	{
		aDragAndDropElement.attachEvent('ondragenter', handleDragEnter);
		aDragZone.attachEvent ('ondragleave', handleDragLeave);
		aDragZone.attachEvent ('ondrop', handleDrop);
	}

		};

XWC.UI.setDragAndDropImg = function (aElement) {
    var body = document.body,
        win = aElement.parentNode.parentNode;

    function _getViewport() {
        var x_x = 0,
            y_y = 0;

        if (window.innerHeight!=window.undefined) {
            x_x = window.innerWidth;
            y_y = window.innerHeight;
        } else if (document.compatMode=='CSS1Compat') {
            x_x = document.documentElement.clientWidth;
            y_y = document.documentElement.clientHeight;
        } else if (body) {
            x_x = body.clientWidth;
            y_y = body.clientHeight;
        }

        return {width:x_x, height:y_y};
    }

    function _getScroll() {
        var x_x = 0,
            y_y = 0;

        if (self.pageYOffset && self.pageXOffset) {                 x_x = self.pageXOffset;
            y_y = self.pageYOffset;
        } else if (document.documentElement && document.documentElement.scrollTop) {                x_x = document.documentElement.scrollLeft;
            y_y = document.documentElement.scrollTop;
        } else if (body) {                      x_x = body.scrollLeft;
            y_y = body.scrollTop;
        }

        return {left:x_x, top:y_y};
    }

    function _getPosition(element) {
        var x_x = 0,
            y_y = 0;

        while (element && element.parentNode) {
            style = element.currentStyle || window.getComputedStyle(element, null);
            position = style.position;
            if (position == "absolute" || position == "relative") {
                x_x += element.offsetLeft;
                y_y += element.offsetTop;
            } else if (position == "fixed" || position == "static") {
                temp_x_y = _getScroll();
                x_x += temp_x_y.left + element.offsetLeft;
                y_y += temp_x_y.top + element.offsetTop;
                break;
            }
            element = element.parentNode;
        }

        return {left:x_x, top:y_y};
    }

    var aOffset = _getPosition(aElement);
    var aImg = aElement.nextSibling.childNodes[0];

    aImg.onmousedown = function(e) {

        var eventHandlerBackup = {};
        eventHandlerBackup.onmouseup     = document.onmouseup;
        eventHandlerBackup.onmousemove   = document.onmousemove;
        eventHandlerBackup.onselectstart = document.onselectstart;

        var dragGuide = XWC.UI.createElement('div');
        dragGuide.style.zIndex = XWC.UI.offset() + 1;
        dragGuide.style.border = '2px solid black';
        dragGuide.style.position = 'absolute';
        dragGuide.style.display = 'block';
        dragGuide.style.top = win.style.top;
        dragGuide.style.left = win.style.left;
        dragGuide.style.width = win.clientWidth + 'px';
        dragGuide.style.height = win.clientHeight + 'px';
        dragGuide.style.backgroundImage = 'none';

        win.parentNode.insertBefore(dragGuide, win);

        e = e || window.event;
        var mousePos = { x: e.clientX, y: e.clientY };
        document.onmouseup = function(e) {
            document.onmouseup     = eventHandlerBackup.onmouseup;
            document.onmousemove   = eventHandlerBackup.onmousemove;
            document.onselectstart = eventHandlerBackup.onselectstart;
            win.style.top  = parseInt(dragGuide.style.top) + 'px';
            win.style.left = parseInt(dragGuide.style.left) + 'px';
            dragGuide.parentNode.removeChild (dragGuide);
            win.style.display = 'block';
            e = e || window.event;
            if (e.preventDefault)  { e.preventDefault(); } else { e.returnValue = false; }
            if (e.stopPropagation) { e.stopPropagation(); } else { e.cancelBubble = true; }
            return false;
        };
        document.onmousemove = function(e) {
            e = e || window.event;
            dragGuide.style.display = 'block';
            win.style.display = 'none';

            var x = e.clientX;
            var y = e.clientY;
            var viewport = _getViewport();
            var scroll   = _getScroll();
            var offset   = aOffset;

            var left = parseInt(dragGuide.style.left) + (x - mousePos.x);
            var dgWidth = parseInt(dragGuide.style.width);
            var prevLeft = parseInt(dragGuide.style.left);
            if ( ( left + dgWidth + 3 < scroll.left+viewport.width && left >= scroll.left )
                || ( (dgWidth + prevLeft - scroll.left) > viewport.width && left < prevLeft && left > scroll.left )
                || ( prevLeft < scroll.left && left > prevLeft)
               )
                dragGuide.style.left = left + 'px';
            var top = parseInt(dragGuide.style.top) + (y - mousePos.y);
            var dgHeight = parseInt(dragGuide.style.height);
            var prevTop = parseInt(dragGuide.style.top);
            if ( (top + parseInt(dragGuide.style.height) + 3 < scroll.top+viewport.height && top >= scroll.top)
                || ( (dgHeight + prevTop - scroll.top) > viewport.height && top < prevTop) )
                dragGuide.style.top = top + 'px';
            mousePos = { x:x, y:y };
            if (e.preventDefault)  { e.preventDefault(); } else { e.returnValue = false; }
            if (e.stopPropagation) { e.stopPropagation(); } else { e.cancelBubble = true; }
            return false;
        };
        document.onselectstart = null;
        if (e.preventDefault)  { e.preventDefault(); } else { e.returnValue = false; }
        if (e.stopPropagation) { e.stopPropagation(); } else { e.cancelBubble = true; }
        return false;
    };
};

XWC.UI.setDragAndDrop = function (aElement, aInfoEnable) {

	var body = document.body,
		win = aElement.parentNode.parentNode;

	function _getViewport() {
		var x_x = 0,
			y_y = 0;
			
		if (window.innerHeight!=window.undefined) {
			x_x = window.innerWidth;
			y_y = window.innerHeight;
		} else if (document.compatMode=='CSS1Compat') {
			x_x = document.documentElement.clientWidth;
			y_y = document.documentElement.clientHeight;
		} else if (body) {
			x_x = body.clientWidth;
			y_y = body.clientHeight;
		}
			
		return {width:x_x, height:y_y}; 
    }
		
	function _getScroll() {
		var x_x = 0,
			y_y = 0;
			
		if (self.pageYOffset && self.pageXOffset) { 				x_x = self.pageXOffset;
			y_y = self.pageYOffset;
		} else if (document.documentElement && document.documentElement.scrollTop) {				x_x = document.documentElement.scrollLeft;
			y_y = document.documentElement.scrollTop;
		} else if (body) {						x_x = body.scrollLeft;
			y_y = body.scrollTop;
		}
		
		return {left:x_x, top:y_y};
    }
	
	function _getPosition(element) {
		var x_x = 0,
			y_y = 0;

		while (element && element.parentNode) {
			style = element.currentStyle || window.getComputedStyle(element, null);
			position = style.position;
			if (position == "absolute" || position == "relative") {
				x_x += element.offsetLeft;
				y_y += element.offsetTop;
			} else if (position == "fixed" || position == "static") {
				temp_x_y = _getScroll();
				x_x += temp_x_y.left + element.offsetLeft;
				y_y += temp_x_y.top + element.offsetTop;
				break;
			}
			element = element.parentNode;
		}
		
		return {left:x_x, top:y_y};
	}
	
	var aOffset = _getPosition(aElement);
	
	aElement.onmousedown = function(e) {     
		var eventHandlerBackup = {};
		eventHandlerBackup.onmouseup     = document.onmouseup;
		eventHandlerBackup.onmousemove   = document.onmousemove;
		eventHandlerBackup.onselectstart = document.onselectstart;
		
		var dragGuide = XWC.UI.createElement('div');
		dragGuide.style.zIndex = XWC.UI.offset() + 1;
		dragGuide.style.border = '2px solid black';
		dragGuide.style.position = 'absolute';
		dragGuide.style.display = 'block';
		dragGuide.style.top = win.style.top;
		dragGuide.style.left = win.style.left;
		dragGuide.style.width = win.clientWidth + 'px';
		dragGuide.style.height = win.clientHeight + 'px';
		dragGuide.style.backgroundImage = 'none';

		win.parentNode.insertBefore(dragGuide, win);

		var element = document.getElementById('xwup_title_information');
		if (element) AnySign.setInfoDialog();

		e = e || window.event;
		var mousePos = { x: e.clientX, y: e.clientY };
		document.onmouseup = function(e) {
			document.onmouseup     = eventHandlerBackup.onmouseup;
			document.onmousemove   = eventHandlerBackup.onmousemove;
			document.onselectstart = eventHandlerBackup.onselectstart;
			win.style.top  = parseInt(dragGuide.style.top) + 'px';
			win.style.left = parseInt(dragGuide.style.left) + 'px';
			dragGuide.parentNode.removeChild (dragGuide);
			win.style.display = 'block';
			e = e || window.event;
			if (e.preventDefault)  { e.preventDefault(); } else { e.returnValue = false; }
			if (e.stopPropagation) { e.stopPropagation(); } else { e.cancelBubble = true; }
			
			if (element) AnySign.setInfoDialog('show');

			return false;
		};
		document.onmousemove = function(e) {
			e = e || window.event;			
			dragGuide.style.display = 'block';
			win.style.display = 'none';
			
			var x = e.clientX;
			var y = e.clientY;
			var viewport = _getViewport();
			var scroll	 = _getScroll();
			var offset	 = aOffset;

			var left = parseInt(dragGuide.style.left) + (x - mousePos.x);
			var dgWidth = parseInt(dragGuide.style.width);
			var prevLeft = parseInt(dragGuide.style.left);
			if ( ( left + dgWidth + 3 < scroll.left+viewport.width && left >= scroll.left )
				|| ( (dgWidth + prevLeft - scroll.left) > viewport.width && left < prevLeft && left > scroll.left ) 
				|| ( prevLeft < scroll.left && left > prevLeft)
			   )
				dragGuide.style.left = left + 'px';
			var top = parseInt(dragGuide.style.top) + (y - mousePos.y);
			var dgHeight = parseInt(dragGuide.style.height);
			var prevTop = parseInt(dragGuide.style.top);
			if ( (top + parseInt(dragGuide.style.height) + 3 < scroll.top+viewport.height && top >= scroll.top)
				|| ( (dgHeight + prevTop - scroll.top) > viewport.height && top < prevTop) )
				dragGuide.style.top = top + 'px';
			mousePos = { x:x, y:y };
			if (e.preventDefault)  { e.preventDefault(); } else { e.returnValue = false; }
			if (e.stopPropagation) { e.stopPropagation(); } else { e.cancelBubble = true; }
			return false;
		};
		document.onselectstart = null;
		if (e.preventDefault)  { e.preventDefault(); } else { e.returnValue = false; }
		if (e.stopPropagation) { e.stopPropagation(); } else { e.cancelBubble = true; }
		return false;	 
	};
};

function setCapsLockToolTip(element, capslock, X, Y) {

	element.onkeyup = function() {
		if (GetKeyStateCheck("caps") == "ON") {
			if (__SANDBOX.IEVersion > 7 || !__SANDBOX.isIE()) {
				capslock.style.top = (element.offsetTop + element.offsetHeight + Y) + "px";
				capslock.style.left = (element.offsetLeft + X) + "px";
			} else if (__SANDBOX.IEVersion == 7) {
				capslock.style.top = (element.offsetTop + (element.offsetHeight*3) -5 + Y) + "px";
				capslock.style.left = (element.offsetLeft + X + 4) + "px";
			} else {
				capslock.style.top = (element.offsetTop + element.offsetHeight + 40 + Y) + "px";
				capslock.style.left = (element.offsetLeft + X + 5) + "px";
			}

			capslock.style.zIndex = XWC.UI.offset() + 3;
			capslock.style.display = 'block';
		}
		else if (GetKeyStateCheck("caps") == "OFF") {
			capslock.style.display = 'none';
		}
	}
	
	element.onblur = function() {
		capslock.style.display = 'none';
	}
}

function GetKeyStateCheck(keyname) {
	try {
		return document.getElementById('TouchEnKey').GetKeyState(keyname);
	} catch(e) {
		return 'OFF';
	}
}

function GetAbsolutePos(obj) {
    var position = new Object;
    position.x = 0;
    position.y = 0;

    if (obj) {
        position.x = obj.offsetLeft;
        position.y = obj.offsetTop;

        if (obj.offsetParent) {
            var parentpos = GetAbsolutePos(obj.offsetParent);
            position.x += parentpos.x;
            position.y += parentpos.y;
        }
    }
    return position;
}


XWC.CERT_LOCATION_HARD			 = 0;
XWC.CERT_LOCATION_REMOVABLE		 = 100;
XWC.CERT_LOCATION_ICCARD		 = 200;
XWC.CERT_LOCATION_CSP			 = 300;
XWC.CERT_LOCATION_PKCS11		 = 400;
XWC.CERT_LOCATION_USBTOKEN		 = 500;
XWC.CERT_LOCATION_USBTOKEN_KB	 = 600;
XWC.CERT_LOCATION_USBTOKEN_KIUP	 = 700;
XWC.CERT_LOCATION_YESSIGNM		 = 1100;
XWC.CERT_LOCATION_MPHONE		 = 1200;
XWC.CERT_LOCATION_LOCALSTORAGE	 = 2000;
XWC.CERT_LOCATION_MEMORYSTORAGE	 = 2100;
XWC.CERT_LOCATION_SESSIONSTORAGE = 2200;
XWC.CERT_LOCATION_XECUREFREESIGN = 2300;
XWC.CERT_LOCATION_WEBPAGE		 = 2400;
XWC.CERT_LOCATION_SECUREDISK	 = 3000;
XWC.CERT_LOCATION_KEPCOICCARD	 = 3100;
XWC.CERT_LOCATION_SIMPLE_AUTH	 = 5000;
XWC.CERT_LOCATION_SIMPLE_YESSIGN = 5010;
var gDialogObj,
	gXgateAddress,
	gCAList,
	gPlain,
	gOption,
	gDescription,
	gLimitPassword,
	gCertSerial,
	gCertLocation,
	gErrCallback,
	gDialogParam;

XWC.getLocaleResource("confirmwindow", XWC.lang(), "UTF8");

function onload(aDialogObj) {	
    gDialogObj = aDialogObj;
	gDialogParam = gDialogObj.args.certSelectDialogParam;

	var aConfirmOption;
	
	XWC.UI.setDragAndDrop(__2);
	if (AnySign.mBrowser.aName == "explorer" || AnySign.mBrowser.aName == "firefox" || AnySign.mBrowser.aName == "opera") {
		try {
			__5.style.whiteSpace = "pre-line";
		} catch (err) {
			console.log("try catch - element.style.whiteSpace");
		}
	}

	if (__SANDBOX.isIE() == 7) {
		var aPre= document.createElement("pre");
		aPre.appendChild(document.createTextNode(gDialogParam.args.plain));
		__5.appendChild (aPre);
	} else if (__SANDBOX.isIE() == 9) {
		__5.value = gDialogParam.args.plain;
	} else {
		__5.appendChild(document.createTextNode(gDialogParam.args.plain));
	}

	aConfirmOption = gDialogParam.args.option & 0x01;
	if (!aConfirmOption) {
		onCancelButtonClick();
	}
	
	if (AnySign.mWBStyleApply)
	{
		var aButton = XWC.UI.createElement("a");
		var aParent = document.getElementById("xwup_body");

		aButton.id = "xwup_close";
		aButton.title = XWC.S.close;
		aButton.setAttribute ("tabindex", 2, 0);
		aButton.setAttribute ("href", "javascript:;", 0);
		aButton.className = "xwup-close-button";
		aButton.onclick = function () { onCancelButtonClick(); };

		aParent.appendChild(aButton);
	}

	return 0;
}

function onOKButtonClick() {
    gDialogObj.onconfirm();
}

function onCancelButtonClick() {
	var aConfirmOption = gDialogParam.args.option & 0x01;
	if (!aConfirmOption) {
		onCancelButtonClick();
	}

    gDialogObj.oncancel();
}


var __1 = XWC.UI.createElement('DIV');
__1.style.width = '400px';
var __2 = XWC.UI.createElement('DIV');
__2.setAttribute('id', 'xwup_title', 0);
__2.className = 'title';
__2.setAttribute('tabindex', '2', 0);
var __3 = XWC.UI.createElement('H3');
__3.appendChild(document.createTextNode(XWC.S.title));
__2.appendChild(__3);
__1.appendChild(__2);
var __4 = XWC.UI.createElement('DIV');
__4.setAttribute('id', 'xwup_body', 0);
__4.className = 'xwup-body';
var __5 = XWC.UI.createElement('TEXTAREA');
__5.setAttribute('cols', '20', 0);
__5.setAttribute('rows', '7', 0);
__5.setAttribute('tabindex', '2', 0);
__5.setAttribute('id', 'xwup_plaintext', 0);
__5.className = 'xwup-confim-area';
__5.setAttribute('readOnly', 'readonly', 0);
__4.appendChild(__5);
var __6 = XWC.UI.createElement('DIV');
__6.className = 'xwup-buttons-layout';
var __7 = XWC.UI.createElement('BUTTON');
__7.setAttribute('tabindex', '2', 0);
__7.setAttribute('type', 'button', 0);
__7.setAttribute('id', 'xwup_ok', 0);
__7.onclick = function(event) {onOKButtonClick()};
__7.appendChild(document.createTextNode(XWC.S.button_ok));
__6.appendChild(__7);
var __8 = XWC.UI.createElement('BUTTON');
__8.setAttribute('tabindex', '2', 0);
__8.setAttribute('type', 'button', 0);
__8.setAttribute('id', 'xwup_cancel', 0);
__8.onclick = function(event) {onCancelButtonClick()};
__8.appendChild(document.createTextNode(XWC.S.button_cancel));
__6.appendChild(__8);
__4.appendChild(__6);
__1.appendChild(__4);
__1.onload = onload;
if (typeof setFocus != "undefined") {
__1.setFocus = setFocus;
}
if (!AnySign.mDivInsertOption) {
setTimeout(function () {__1.tabControl = XWC.UI.appendTabControl(__1);}, 0);
}
return __1;

}
return function(option) {
    /**
     * COMMON DHTML FUNCTIONS
     * These are handy functions I use all the time.
     *
     * By Seth Banks (webmaster at subimage dot com)
     * http://www.subimage.com/
     *
     * Up to date code can be found at http://www.subimage.com/dhtml/
     *
     * This code is free for you to use anywhere, just keep this comment block.
     */

    /**
     * Code below taken from - http://www.evolt.org/article/document_body_doctype_switching_and_more/17/30655/
     *
     * Modified 4/22/04 to work with Opera/Moz (by webmaster at subimage dot com)
     *
     * Gets the full width/height because it's different for most browsers.
     */

	var aBody = document.body,
		aDialogOffset = __SANDBOX.addDialogOffset(),
		aTarget,
		aParent,
		aEvent,
		aCaller = arguments.callee.caller,
		aOffsetTop = 0,
		aOffsetLeft = 0,
		i,
		aParentPointer,
		aStyle,
		aPosition;
	
	if(AnySign.mUISettings.mUITarget_signVerify) {
		aTarget = AnySign.mUISettings.mUITarget_signVerify;
		delete AnySign.mUISettings.mUITarget_signVerify;
	} else if (AnySign.mUISettings.mUITarget) {
		aTarget = AnySign.mUISettings.mUITarget;
		delete AnySign.mUISettings.mUITarget;
	} else if(AnySign.mUISettings.mUITarget_xTsign) {
	    
	    aTarget = AnySign.mUISettings.mUITarget_xTsign;
	    delete AnySign.mUISettings.mUITarget_xTsign;
	    
	} else {
		aTarget = document.body;
	}

	aParentPointer = aTarget;
	while (aParentPointer && aParentPointer.parentNode) {
		var computedStyle;
		try {
			computedStyle = window.getComputedStyle(aParentPointer, null);
		} catch (ex) {
			computedStyle = "";
		}
		aStyle = aParentPointer.currentStyle || computedStyle;
		aPosition = aStyle.position;
		if (aPosition == "absolute" || aPosition == "relative") {
			aOffsetTop += aParentPointer.offsetTop;
			aOffsetLeft += aParentPointer.offsetLeft;
		} else if (aPosition == "fixed") {
			aOffsetTop += getScrollTop() + aParentPointer.offsetTop;
			aOffsetLeft += getScrollLeft() + aParentPointer.offsetLeft;
			break;
		}

		aParentPointer = aParentPointer.parentNode;
	}

	aParentPointer = aTarget;
	while (aParentPointer && aParentPointer != aBody) {
		if (aParentPointer.getAttribute("xwupcaller") || (aParentPointer.tagName && aParentPointer.tagName.toUpperCase() == "BUTTON")) {
			aTarget = aParentPointer;
		}
		aParentPointer = aParentPointer.parentNode;
	}

	aParent = aTarget.parentNode;

	function UIAppend (aElement)
	{
		if (aTarget == aBody)
		{
			aBody.insertBefore(aElement, aBody.firstChild);
		}
		else if (aElement == aParent.lastChild)
		{
			aParent.appendChild(aElement);
		}
		else if (option.appendChild) {
			aParent.appendChild(aElement);
		} else
		{
			aParent.insertBefore(aElement, aTarget.nextSibling);
		}
	}

	function UIRemove (aElement) {
		if (aElement == null)
			return;

		ApA = aElement.parentNode;
		if (ApA)
			ApA.removeChild (aElement);
	}

    function getViewportHeight() {
		if (window.innerHeight!=window.undefined) return window.innerHeight;
		if (document.compatMode=='CSS1Compat') return document.documentElement.clientHeight;
		if (aBody) return aBody.clientHeight; 

		return window.undefined; 
    }
    function getViewportWidth() {
		var offset = 17;
		var width = null;
		if (window.innerWidth!=window.undefined) return window.innerWidth; 
		if (document.compatMode=='CSS1Compat') return document.documentElement.clientWidth; 
		if (aBody) return aBody.clientWidth; 
    }

    /**
     * Gets the real scroll top
     */
    function getScrollTop() {
		if (self.pageYOffset) // all except Explorer
		{
			return self.pageYOffset;
		}
		else if (document.documentElement && document.documentElement.scrollTop)
			// Explorer 6 Strict
		{
			return document.documentElement.scrollTop;
		}
		else if (aBody) // all other Explorers
		{
			return aBody.scrollTop;
		}
    }
    function getScrollLeft() {
		if (self.pageXOffset) // all except Explorer
		{
			return self.pageXOffset;
		}
		else if (document.documentElement && document.documentElement.scrollLeft)
			// Explorer 6 Strict
		{
			return document.documentElement.scrollLeft;
		}
		else if (aBody) // all other Explorers
		{
			return aBody.scrollLeft;
		}
    }
    
    function dummyEvent(e) {
		e.stopPropagation();
		e.preventDefault();
	}
	
    	var overlay = document.createElement('div');
	//overlay.cssText = AnySign.mUISettings.mCSSDefault;
	var _resizeOverlayFunction;
	overlay.style.zIndex = aDialogOffset;
	overlay.style.backgroundImage = 'none';
	overlay.style.marginLeft = '0px';
	overlay.style.cursor = 'auto';
    overlay.onclick = null;
	if (__SANDBOX.IEVersion <= 6)
	{
    	overlay.style.position = 'absolute';

		_resizeOverlayFunction = function (e) {
			overlay.style.width = aBody.scrollWidth;
			overlay.style.height = aBody.scrollHeight;
		}
		window.attachEvent("onresize", _resizeOverlayFunction);
		window.attachEvent("onscroll", _resizeOverlayFunction);
		_resizeOverlayFunction();
	   	overlay.style.top = -aOffsetTop + 'px';
	    overlay.style.left = -aOffsetLeft + 'px';
	}
	else
	{
    	overlay.style.position = 'fixed';
    	overlay.style.width = '100%';
    	overlay.style.height = '100%';
	   	overlay.style.top = '0';
	    overlay.style.left = '0';
	}
    overlay.style.display = 'none';
	if (__SANDBOX.isIE() < 9) {
		overlay.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+AnySign.mBasePath+"/img/gray.png', sizingMethod='scale')";
	}
    else if((__SANDBOX.browserName == "chrome" && __SANDBOX.browserVersion > 9) ||
    		(__SANDBOX.browserName == "opera" && __SANDBOX.browserVersion > 12) ||
    		(__SANDBOX.browserName == "safari" && __SANDBOX.browserVersion >= 5.1) ||
    		__SANDBOX.browserName == "edge") {
        overlay.style.background = '-webkit-radial-gradient(rgba(127, 127, 127, 0.5), rgba(127, 127, 127, 0.5) 35%, rgba(0, 0, 0, 0.7))';
    }
    else if(__SANDBOX.browserName == "firefox")
    {
        overlay.style.background = '-moz-radial-gradient(rgba(127, 127, 127, 0.5), rgba(127, 127, 127, 0.5) 35%, rgba(0, 0, 0, 0.7))';
    }
	else {
    	overlay.style.backgroundColor = '#333333';
    	overlay.style.opacity = '0.2';
	}
	
	if (overlay.addEventListener) {
		overlay.addEventListener ('dragenter', dummyEvent, false);
		overlay.addEventListener ('dragover', dummyEvent, false);
		overlay.addEventListener ('dragleave', dummyEvent, false);
		overlay.addEventListener ('drop', dummyEvent, false);
	}
	
    var doc = loadDoc(aTarget);

	doc.style.display = 'block';
	var winWidth = parseInt(doc.style.width, 10);
	if (doc.style.marginLeft)
		winWidth += parseInt(doc.style.marginLeft,10);
	if (doc.style.marginRight)
		winWidth += parseInt(doc.style.marginRight, 10);

    var win = document.createElement('div');
	win.setAttribute ("role", "dialog", 0);
	win.style.zIndex = aDialogOffset + 2;
	if (aTarget.id != "certDialog" && aTarget.id != "xwup_embedded_area")
	    win.style.position = 'absolute';
	win.style.display = 'block';
	win.style.visibility = 'hidden';
    win.style.width = winWidth + 'px';
	win.style.top = getScrollTop() - aOffsetTop+ 'px';
	win.style.left= getScrollLeft() - aOffsetLeft + 'px';
	if (AnySign.mDivInsertOption == 1) {
		win.className = "xwup_common xwup_cert_wide";
	}
	else if (AnySign.mDivInsertOption == 2) {
		win.className = "xwup_common xwup_cert_mini";
	}
	else
	{
		win.className = "xwup_common xwup_cert_pop";
	}
	
	if (win.addEventListener) {
		win.addEventListener ('dragenter', dummyEvent, false);
		win.addEventListener ('dragover', dummyEvent, false);
		win.addEventListener ('dragleave', dummyEvent, false);
		win.addEventListener ('drop', dummyEvent, false);
	}

	//if (aTarget.id != "certDialog" && aTarget.id != "xwup_embedded_area") {
	if (aTarget.id != "certDialog" && aTarget.id != "xwup_embedded_area" && aTarget.id != "xwup_cert_pop_embedded_area") {
	    UIAppend(overlay);
	}
	UIAppend(win);

    win.appendChild(doc);

	var aResult = doc.onload({
			type: option.type,
			args: option.args, 
     		onconfirm: option.onconfirm,
     		oncancel: option.oncancel
     	});    
	if(aResult != 0) {
   		UIRemove(win);
    	UIRemove(overlay);
		alert("Module loading error");
		return;
	}	

	var selectableEventBackup = {};
	function unselectableHandler (e) {
		var target,
			targetName,
			targetType;
		e = e || window.event;
 
		target = e.target || e.srcElement;

		if (target.tagName) {
			targetName = target.tagName.toLowerCase();
		}

		if (typeof target.type == "string" && target.type) {
			targetType = target.type.toLowerCase();
		}

		if  ( (targetName == "input" && (targetType == "text" || targetType == "password" )) 
			  || (targetName == "html") 
			  || (targetName == "textarea") 
			  || (targetName == "select") 
			  || (targetName == "button") ) {
			return true;
		} else {
			return false;
		}
	}

    return {
    	show: function() {
			var theBody = document.getElementsByTagName("BODY")[0];	    
			var fullHeight = getViewportHeight();
			var fullWidth = getViewportWidth();

			function centerWindow() {
				var width = doc.offsetWidth;
				var height = doc.offsetHeight;
				var scTop = parseInt(getScrollTop(),10);
				var scLeft = parseInt(theBody.scrollLeft,10);
				
				//win.style.top  = (scTop  + ((fullHeight - height) / 3) - aOffsetTop) + "px";
				//win.style.left = (scLeft + ((fullWidth  - width)  / 2) - aOffsetLeft) + "px";
				if(aTarget.id != "xwup_cert_pop_embedded_area") {
					win.style.top = (scTop + ((fullHeight - height) / 3) - aOffsetTop) + "px";
					win.style.left = (scLeft + ((fullWidth - width) / 2) - aOffsetLeft) + "px";
				} else {
					win.style.top = "50px";
					win.style.left = "0px";
					win.style.borderRadius = "0px 0px 16px 16px";
				}
			}
			
			centerWindow();

			overlay.style.display = 'block';
			win.style.visibility = 'visible';
			try {Integrity.setObserver(__SANDBOX.integrityModule);}catch(e){}

			// focus
			if (doc.setFocus) {
				setTimeout(doc.setFocus,0);
			} else {
				var liElements = doc.getElementsByTagName("li");
				if (liElements.length > 0) {
					liElements[0].focus();
				}   
				else {
					var inputElements = doc.getElementsByTagName("input");
					if (inputElements.length > 0) {
						var i = 0;
						while (inputElements[i].disabled || inputElements[i].style.display == "none") {
							i++; 
							if(inputElements.length <=  i) break;
						}
						if (inputElements[i] != undefined) {
							inputElements[i].focus();	
						}
					}
					else {
						var buttonElements = doc.getElementsByTagName("button");
						if (buttonElements.length > 0 && !buttonElements.disabled)
							buttonElements[0].focus();
					}
				}
			}

			//redraw win for IE8 rendering bug
			//don't check version number for compat view
			if (__SANDBOX.isIE())
			{
				win.style.cssText = win.style.cssText;
			}

			if (__SANDBOX.IEVersion <= 8) {
				selectableEventBackup.onmousedown = document.onmousedown;
				selectableEventBackup.onmouseup = document.onmouseup;
				document.onmousedown = unselectableHandler;
				document.onmouseup = function (e) { return true; };
			} else {
				selectableEventBackup.onselectstart = document.onselectstart;
				document.onselectstart = unselectableHandler;
			}

			if (doc.onShow) {
				setTimeout(doc.onShow, 0);
			}

			__SANDBOX.dialogStack.push (win);

    	},
    	
    	hide: function() {
    	    overlay.style.display = 'none';
    	    win.style.display = 'none';
    	},
    	
    	dispose: function() {
			if (doc.tabControl)
				doc.tabControl.remove();
	
			__SANDBOX.dialogStack.pop (win);

			__SANDBOX.removeDialogOffset();
			if (_resizeOverlayFunction) {
		 		window.detachEvent("onresize", _resizeOverlayFunction);
				window.detachEvent("onscroll", _resizeOverlayFunction);
				_resizeOverlayFunction = undefined;
			}

    	    UIRemove(win);
    	    win = null;

			if (document.getElementById('xwup_title_information') == null && __SANDBOX.dialogStack[0])
				__SANDBOX.dialogStack[0].style.boxShadow = "";

    	    if (overlay ? overlay.parentNode != null : null)
    	    {
    	    	UIRemove(overlay);
    	    	overlay = null;
    	    }

			if (__SANDBOX.IEVersion <= 8) {
				document.onmousedown   = selectableEventBackup.onmousedown;
				document.onmouseup     = selectableEventBackup.onmouseup;
			} else {
				document.onselectstart = selectableEventBackup.onselectstart;
			}
    	},

		getUITarget: function() {
			return aTarget;
		},
		
		append: function() {
            function centerWindow() {
                var certselect = document.getElementsByClassName('xwup_common xwup_cert_pop')[1];
                var left = certselect.style.left.split("px")[0];
		var information = document.getElementsByClassName('xwup_common xwup_cert_pop')[0];

                win.style.top = certselect.style.top;
		win.style.left = Number(left) + 452 + 'px';
		if(document.getElementById("xTsign") && document.getElementById("xwup_title_information")) {		
			//win.style.top = information.style.top;
			win.style.top = '0px';
			win.style.left = '452px';
		}
            }

            centerWindow();

            overlay.style.display = 'none';
            win.style.visibility = 'visible';

			// 
			win.style.zIndex = __SANDBOX.dialogStack[0].style.zIndex;
			__SANDBOX.dialogStack[0].style.boxShadow = 'none';
			//
			
            try {Integrity.setObserver(__SANDBOX.integrityModule);}catch(e){}

            if (doc.onShow) {
                setTimeout(doc.onShow, 0);
            }

            __SANDBOX.dialogStack.push (win);
			AnySign.mShowInfoDialog.close = false;
        }
    };
}

};
