var __certselectwide = function(__SANDBOX) {
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
XWC.namespace("UI");

XWC.UI.TableView = function (aElement, aOption) {
	var mTable = aElement.getElementsByTagName("table")[0],
		aHeadCells,
		aResizer,
		aInputElement,
		temp,
		i,
		j,
		aHeadOffset = (aOption && aOption.noHeader) ? 0 : 1;

	this.mTable = mTable;
	this.mView = aElement;
	this.mSortMode = 1;
	this.mSelectedRowObj = null;
	this.onSelectRow = function () {};
	this.onRefresh = function () {};
	this.onRowClick = function () {};

		function onkeyupMover(e) {
		e = e || window.event;
		var aKeyCode = e.which || e.keyCode,
			aIndex,
			aRows;

		aRows = this.mTable.tBodies[0].rows;

		if (aKeyCode == 38) { 	    	if (!this.mSelectedRowObj)
				aIndex = aRows.length - aHeadOffset;
		    else {
				aIndex = this.mSelectedRowObj.rowIndex - aHeadOffset - 1;
		    }

			if (aIndex < 0) return;
		    this.selectRow(aRows[aIndex]);

						aBottom = this.mSelectedRowObj.offsetTop + this.mSelectedRowObj.offsetHeight;
		    if (this.mSelectedRowObj.rowIndex == 1) {
				this.mTable.parentNode.scrollTop = 0;
		    }
		    else if (this.mSelectedRowObj.offsetTop < this.mTable.parentNode.scrollTop) {
				this.mTable.parentNode.scrollTop = this.mSelectedRowObj.offsetTop;
	    	}
		}
		else if (aKeyCode == 40) { 			if (!this.mSelectedRowObj) 
					aIndex = 0;
  			else {		
				aIndex = this.mSelectedRowObj.rowIndex - aHeadOffset + 1;
	    	}
			if (aIndex > aRows.length - 1) return;
    		this.selectRow(aRows[aIndex]);	    
   
				    	aBottom = this.mSelectedRowObj.offsetTop + this.mSelectedRowObj.offsetHeight;
			if (aBottom > this.mTable.parentNode.scrollTop + this.mTable.parentNode.offsetHeight) {
				this.mTable.parentNode.scrollTop = aBottom - this.mTable.parentNode.offsetHeight;
    		}
		}
		else if (aKeyCode == 13) {
		}
		else if (aKeyCode == 9) {
			return false;
		} else {
			return true;
		}
		XWC.Event.stopPropagation(e);
		XWC.Event.preventDefault(e);
	}

	XWC.Event.add(aElement, "keyup", onkeyupMover, this);
	aInputElement = XWC.UI.nextSibling(aElement).getElementsByTagName("form")[0];
	if (aInputElement) {
		XWC.Event.add(aInputElement, "keyup", onkeyupMover, this);
	}

	if (aOption && aOption.noHeader) {
		return;
	}

		function onclickSort(e) {
		var aSortType = e.target.parentNode.getAttribute("sortType"),
			aColumnIndex = e.target.parentNode.cellIndex,
			aRows = [],
			aSortDirection = 1,
			aSortDir = this.mSortMode,
			aSortFunc,
			i;

				switch (aSortType) {
		case "T":
			aSortFunc = XWC.UI.TableView.sortTextCell;
			break;
		case "IT":
		case "TI":
			aSortFunc = XWC.UI.TableView.sortImageTextCell;
			break;
		default:
			return;
		}

		for (i = 0; i < mTable.tBodies[0].rows.length; i++) {
			aRows[i] = mTable.tBodies[0].rows[i];
		}

		aRows = aRows.sort(function (e1, e2) {
			var ret;
			try {
				ret = aSortDir * aSortFunc(e1.cells[aColumnIndex], e2.cells[aColumnIndex]);
			} catch (e) {
				return 1;
			}
			return ret;
		});

		this.mSortMode = -1 * this.mSortMode;

		for (i = 0; i < aRows.length; i++) {
			mTable.tBodies[0].appendChild(aRows[i]);
		}
	}

	function mousedownResizer(e) {
		var x = e.clientX || e.pageX,
			aIndex = e.target.parentNode.parentNode.index,
			aCell,
			aMouseupListener,
			aMousemoveListener;

		aMousemoveListener = XWC.Event.add(document, "mousemove", function (e) {
			var aHeadWidth,
				aCellWidth;

			aHeadWidth = parseInt(aHeadCells[aIndex].style.width, 10) + (e.clientX || e.pageX) - x;
			if (aHeadWidth < 0) aHeadWidth = 0;
			aHeadCells[aIndex].style.width = aHeadWidth + "px";

			x = e.clientX || e.pageX;

			XWC.Event.stopPropagation(e);
			XWC.Event.preventDefault(e);
		});

		aMouseupListener = XWC.Event.add(document, "mouseup", function (e) {
			XWC.Event.remove(document, "mousemove", aMousemoveListener);
			XWC.Event.remove(document, "mouseup", aMouseupListener);

			XWC.Event.stopPropagation(e);
			XWC.Event.preventDefault(e);
		});

		XWC.Event.stopPropagation(e);
		XWC.Event.preventDefault(e);
	}

	function onclickResizer(e) {
		XWC.Event.stopPropagation(e);
		XWC.Event.preventDefault(e);
	}


	temp = mTable.getElementsByTagName("thead")[0];
	aHeadCells = XWC.UI.firstChildOf(temp).childNodes;
	for (i = 0, j = 0; i < aHeadCells.length; i++, j++) {
		
				if (typeof (aHeadCells[i].getAttribute("sortType")) != "undefined") {
			XWC.Event.add(aHeadCells[i], "click", onclickSort, this);
		}

				aResizer = aHeadCells[i].firstChild.childNodes[1];
		if (aResizer) {
			aResizer.className = "xwup-tableview-resizer";
			aResizer.style.zIndex = XWC.UI.offset() + 4;

			XWC.Event.add(aResizer, "mousedown", mousedownResizer);
			XWC.Event.add(aResizer, "click", onclickResizer);
		}

		aHeadCells[i].index = i;
	}
};

XWC.UI.TableView.prototype.selectRow = function (aObject) {
	var aLastSelected = this.mSelectedRowObj,
		tds,
		i=0,
		buttons;

	if (aLastSelected) {
		aLastSelected.className = "xwup-tableview-unselected-row";
		aLastSelected.setAttribute("aria-selected", "false", 0);
		if(aLastSelected.querySelector("img")) {
			aLastSelected.querySelector("img").setAttribute("alt", aLastSelected.querySelector("img").getAttribute("alt").replace(XWC.S.cert_select, ""), 0);
		} else {
			aLastSelected.setAttribute("title", aLastSelected.title.replace(XWC.S.media_select, ''), 0);
		}
		
	}

	if (typeof aObject == "undefined")
		return;

	buttons = aObject.getElementsByTagName("button");
	aObject.className = "xwup-tableview-selected-row";
	if (AnySign.mWebAccessibility.mSetHightContrast) {
		aObject.className = "xwup-tableview-selected-row-webAccess";
	}
	if (buttons != "undefined") {
		if (buttons.length > 0) {
			for (i = 0; i <buttons.length; i++) {
				buttons[i].className = "xwup-tableview-viewbutton";
			}
		}
	}
	aObject.setAttribute("aria-selected", "true", 0);
	if(aObject.querySelector("img")) {
		aObject.querySelector("img").setAttribute("alt", XWC.S.cert_select + aObject.querySelector("img").alt, 0);
	} else {
		aObject.setAttribute("title", aObject.title + XWC.S.media_select, 0);
	}
	
	this.mSelectedRowObj = aObject;
	if (AnySign.mDivInsertOption == 0) {
		try {
			aObject.focus();
		} catch (e) {
			console.log("try catch - aObject.focus");
		}
	}

	this.onSelectRow(aObject);
};

XWC.UI.TableView.prototype.refresh = function (aData) {
	var aRows = this.mTable.tBodies[0].rows,
		aCells,
		aHeadCells,
		i,
		j,
		onclickRow = function (thiz, obj) {
			return function (e) {
				e = e || window.event;
				thiz.selectRow(obj);
				thiz.onRowClick(e);
				XWC.Event.stopPropagation(e); 
				XWC.Event.preventDefault(e); 			};
		};

	while (this.mTable.tBodies[0].firstChild) {
		this.mTable.tBodies[0].removeChild(this.mTable.tBodies[0].firstChild);
	}

	this.onRefresh(aData);

	for (i = 0; i < aRows.length; i++) {
		aCells = aRows[i].cells;

		aHeadCells = this.mTable.getElementsByTagName("tr")[0].getElementsByTagName("th");
		if (aHeadCells && aHeadCells.length > 0) {
			for (j = 0; j < aCells.length; j++) {
								aCells[j].onclick = onclickRow(this, aRows[i]); 			}
		}
		aRows[i].onclick = onclickRow(this, aRows[i]);
	}
	
	this.mSelectedRowObj = null;
};

XWC.UI.TableView.prototype.createImageTextCell = function (aImageURL, aText, aImageAlt) {
	var aCell = XWC.UI.createElement("div"),
		__4,
		__5;

	aCell.className = "xwup-tableview-cell";
	aCell.setAttribute("title", aText);
		
	__4 = XWC.UI.createElement("img");
	
	if (__SANDBOX.IEVersion == 6) {
		__4.style.width = '1.0px';
		__4.style.height = '1.0px';
		__4.style.boarder="0px";
		__4.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+aImageURL+"', sizingMethod='image');";
		__4.setAttribute("src", "");
	}else{
		__4.setAttribute("src", aImageURL);
	}
	
	if (aImageAlt) {
		__4.setAttribute("alt", aImageAlt);
	}

	aCell.appendChild(__4);
	aCell.appendChild(document.createTextNode(aText));

	return aCell;
};

XWC.UI.TableView.prototype.createTextCell = function (aText) {
	var aCell = XWC.UI.createElement("div");
	aCell.className = "xwup-tableview-cell";	
	aCell.setAttribute("title", aText);
	aCell.style.display = "block";
	aCell.appendChild(document.createTextNode(aText));
	return aCell;
};

XWC.UI.TableView.prototype.createHiddenTextCell = function (aText) { 	var aCell = XWC.UI.createElement("div");
	aCell.className = "xwup-tableview-cell";
	aCell.appendChild(document.createTextNode(aText));
	aCell.style.visibility = "hidden";
	aCell.style.width = "0";
	return aCell;
};

XWC.UI.TableView.sortImageTextCell = function (e1, e2) {
	return e1.firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.nodeValue.localeCompare(
		e2.firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.nodeValue
	);
};

XWC.UI.TableView.sortTextCell = function (e1, e2) {
	return e1.firstChild.firstChild.nodeValue.localeCompare(e2.firstChild.firstChild.nodeValue);
};

XWC.namespace("UI");


XWC.UI.ContextMenu = function (aTarget, aTitle, aMenuItems, onMenuSelected) {
	var x, y,
		box,
		ul,
		li,
		a,
		aElement,
		onDocumentClickListener,
		i,
		aliList = [],
		aParentNode,
		aOldParentDisp,
		aSelectedLiIndex = -1;

	if (aMenuItems.length <= 0) {
		return;
	}

	function focus(e) {
		e.className = "context-menu-item-focused";
		e.firstChild.className = "context-menu-item-focused-a";
		e.focus();
	}

	function unfocus(e) {
		e.className = "context-menu-item-unfocused";
		e.firstChild.className = "context-menu-item-unfocused-a";
	}

	function mousedownItem(e) {
				onMenuSelected(e.data);
	}

	function mouseoverItem(e) {
		var aElement = e.target;
		if (aElement.tagName == "A")
			aElement = aElement.parentNode;

		for (var i = 0; i < aliList.length; i++)
			unfocus(aliList[i]);

		focus(aElement);
	}

	function mouseoutItem(e) {
		var aElement = e.target;

		if (aElement.tagName == "A")
			aElement = aElement.parentNode;

		unfocus(aElement);
	}

	function onclickDocument() {
		aTarget.parentNode.removeChild(box);
		XWC.Event.remove(document, "mousedown", onDocumentClickListener);
	}

	function keyupItem(e) {
		e = e || window.event;
		target = e.target || e.srcElement;
		
		var aKeyCode = e.which || e.keyCode;
		if (aKeyCode == 38) { 			if (aSelectedLiIndex > 0) {
				unfocus(aliList[aSelectedLiIndex]);
				aSelectedLiIndex = aSelectedLiIndex - 1;
			}
			if (aSelectedLiIndex == -1) aSelectedLiIndex = 0;
			focus(aliList[aSelectedLiIndex]);
		}else if (aKeyCode == 40) { 			if (aSelectedLiIndex < aliList.length - 1) {
				if (aSelectedLiIndex > -1) unfocus(aliList[aSelectedLiIndex]);
				aSelectedLiIndex = aSelectedLiIndex + 1;
			}
			focus(aliList[aSelectedLiIndex]);
		}else if (aKeyCode == 13) { 			if (aSelectedLiIndex == -1) {
				aSelectedLiIndex = 0;
				focus(aliList[aSelectedLiIndex]);
			} else {
				unfocus(aliList[aSelectedLiIndex]);
				onclickDocument();
				mousedownItem(aliList[aSelectedLiIndex]);
			}
		}else if (aKeyCode == 27) { 			if (aSelectedLiIndex == -1) aSelectedLiIndex = 0;
			unfocus(aliList[aSelectedLiIndex]);
			onclickDocument();
			aTarget.focus();
		} else if (aKeyCode == 9) { 			onclickDocument();
			return true;
		}

		XWC.Event.stopPropagation(e);
		XWC.Event.preventDefault(e);
	}

	onDocumentClickListener = XWC.Event.add(document, "mousedown", onclickDocument);

		box = XWC.UI.createElement("div");
	box.style.zIndex = XWC.UI.offset() + 4;
	box.className = "context-menu-layout";
				if (__SANDBOX.IEVersion < 7) {
		box.style.filter = "progid:DXImageTransform.Microsoft.Shadow(color=gray, direction=135, strength=2)";
	}
	
	ul = XWC.UI.createElement("ul");
				ul.className = "ul-list-type1";
	ul.setAttribute('title', aTitle);
	if (AnySign.mDivInsertOption > 0)
		ul.setAttribute('tabindex', 0, 0);
	else
		ul.setAttribute('tabindex', 3, 0);

	XWC.Event.add(ul, "keyup", keyupItem)

	for (i = 0; i < aMenuItems.length; i++) {
		a = XWC.UI.createElement("a");
		a.appendChild(document.createTextNode(aMenuItems[i].item));

		li = XWC.UI.createElement("li");
		li.data = aMenuItems[i].data;
		li.appendChild(a);
		li.onmousedown = function (e) {
			e = e || window.event;
			target = e.target || e.srcElement;
			try {
				target = e.target || e.srcElement;
			} catch(e) {
				try {
					target = e.srcElement;
				} catch(e) {
					target = e.target;
				}
			}
			
			onclickDocument();
			onMenuSelected(target.data);

			XWC.Event.stopPropagation(e);
			XWC.Event.preventDefault(e);
		};
		a.setAttribute ("href", "javascript:;", 0);
		a.data = aMenuItems[i].data;
		if (AnySign.mDivInsertOption > 0)
			li.setAttribute('tabindex', 0, 0);
		else
			li.setAttribute('tabindex', 3, 0);
		
		XWC.Event.add(li, "mouseover", mouseoverItem);
		XWC.Event.add(li, "mouseout", mouseoutItem);

		aliList[i] = li;
		ul.appendChild(li);
	}
	box.appendChild(ul);
	aTarget.parentNode.appendChild(box);
	ul.focus();
};

certselectwide_tk1 = null; var gCertList,
	gMediaRadio,
	gProviderName,
	gSelectedSubjectRDN,
	gSelectedIssuerRDN,
	gSelectedCertSerial,
	gSelectedCertClass,
	gSelectedRowIndex,
	gSelectedMediaID,
	gSelectedButton = 1, 	gMaxButton = 12,
	gSelectedSmartCert = false,
	gCurrentStateList = [],
	gButtonList = ["xwup_media_hdd",
				   "xwup_media_removable",
				   "xwup_media_savetoken",
				   "xwup_media_pkcs11",
				   "xwup_media_mobile",
				   "xwup_media_smartcert",
				   "xwup_media_securedisk",
				   "xwup_media_nfciccard",
				   "xwup_media_localstorage",
				   "xwup_media_memorystorage",
				   "xwup_media_xfs",
				   "xwup_media_webpage",
				   "xwup_find",
				   "xwup_view",
				   "xwup_delete"],
	gCertTableView,
	gDialogObj,
	gPasswordTryCount = 1,
	gCertSerial,
	gSearchCondition,
	gCAList,
	gErrCallback,
	gNeedPassword,
	gDisablePasswordInput,
	gCertTableBody,
	gInputHandler,
	gInputHandler_4pc,
	gInputHandler_lite,
	gInputHandler_xfs,
	gInputHandler_e2e,
	gFilter,
	gPFXInfo,
	gMediaLength,
	gStorage,
	gEvent;

XWC.getLocaleResource("certselectwide", XWC.lang());

function onload(aDialogObj) {
	var info,
		html,
		certInfo,
		aMediaType,
		aInputType,
		aCheckedRadioIndex = -1;
	
	gDialogObj = aDialogObj;
	gErrCallback = gDialogObj.args.errCallback || gErrCallback_common;
	gCertSerial = gDialogObj.args.certSerial || "";
	gSearchCondition = gDialogObj.args.searchCondition || 0;
	gCAList = gDialogObj.args.caList || "";
	gDisablePasswordInput = aDialogObj.args.disablePasswordInput;
	gFilter = aDialogObj.args.filter;
	gPFXInfo = {withPFX:false,pfxPath:"",passwd:""};
	gStorage = AnySign.mStorage;
	
		if (AnySign.mAnySignLiteSupport) {
		gSelectedMediaID = gDialogObj.args.certLocation || XWC.CERT_LOCATION_LOCALSTORAGE;
	} else if (AnySign.mWebPageStorageSupport) {
		gSelectedMediaID = gDialogObj.args.certLocation || XWC.CERT_LOCATION_WEBPAGE;
	} else if (AnySign.mXecureFreeSignSupport) {
		gSelectedMediaID = gDialogObj.args.certLocation || XWC.CERT_LOCATION_XECUREFREESIGN;
	} else {
		gSelectedMediaID = gDialogObj.args.certLocation || 1;
	}

	if (AnySign.mDefaultCertLocation)
		gSelectedMediaID = AnySign.mDefaultCertLocation;
	
	aInputType = __SANDBOX.getInputType(gSelectedMediaID);
	
	if (aInputType == "4pc" && AnySign.mAnySignLoad) {
		AnySign.mAnySignEnable = true;
	} else if (aInputType == "e2e" && AnySign.mWebPageStorageSupport) {
		AnySign.mAnySignEnable = false;
	} else if (aInputType == "xfs" && AnySign.mXecureFreeSignSupport) {
		AnySign.mAnySignEnable = false;
	} else {
		if (AnySign.mAnySignLiteSupport) {
			if (aInputType != "lite") {
				gSelectedMediaID = XWC.CERT_LOCATION_LOCALSTORAGE;
			}
			AnySign.mAnySignEnable = false;
		} else {
			if (!AnySign.mAnySignLoad) {
				gSelectedMediaID = -1;
			} else if (aInputType != "4pc") {
				gSelectedMediaID = 1;
			}
			AnySign.mAnySignEnable = true;
		}
	}
	
		aMediaType = Math.floor(parseInt(gSelectedMediaID, 10) / 100) * 100;
	aInputType = __SANDBOX.getInputType(gSelectedMediaID);
	
	if (!AnySign.mExtensionSetting.mExternalCallback.func)
		AnySign.mExtensionSetting.mExternalCallback.result = 0;
	
	if (!__SANDBOX.isIE())
		__4.style.display = "none";
	
								
	function disabledFindButton() {
		__118.style.display = "none";
	}
	
	if (gDialogObj.type == "sign-no-pfx" ||
		gDialogObj.type == "renew" || gDialogObj.type == "revoke" ||
		gDialogObj.type == "envelope" || gDialogObj.type == "deenvelope") {
		disabledFindButton();
	}

		gCertTableView = new XWC.UI.TableView(__57);

	gCertTableView.onSelectRow = function (aObject) {
		var aSelectedRowElement = gCertTableBody.rows[aObject.rowIndex - 1],
			aSelectedRowObject = gCertTableView.mSelectedRowObj,
			aIssuerRDN = aSelectedRowObject.getAttribute("issuer"),
			aCertSerial = aSelectedRowObject.getAttribute("serial"),
			aExpireAlert,
			aGrandMom,
			expireMessage,
			expireMessages,
			aElement,
			i;

		for (i = 0; i < gCertList.length; i++) {
			if (aIssuerRDN == gCertList[i][5] && aCertSerial == gCertList[i][6]) {
				gSelectedSubjectRDN = gCertList[i][2];
				gSelectedIssuerRDN = gCertList[i][5];
				gSelectedCertSerial = gCertList[i][6];
				gSelectedCertClass = gCertList[i][1];
				gSelectedRowIndex = i;
				break;
			}
		}
		
		aExpireAlert = __77;
		if (gCertList[gSelectedRowIndex][0] == 1) {
			aGrandMom = __57;

			aAddOffset = aGrandMom;

			if (AnySign.mPlatform == AnySign.mPlatformList[1]) {	
				aExpireAlert.style.top = aSelectedRowElement.offsetTop + aGrandMom.offsetTop - aGrandMom.scrollTop + aSelectedRowElement.offsetHeight + 4 + "px";
			} else {
				aExpireAlert.style.top = aSelectedRowElement.offsetTop + aGrandMom.offsetTop - aGrandMom.scrollTop + aSelectedRowElement.offsetHeight + 'px';
			}
			
			var position = GetAbsolutePos(__57);
			aExpireAlert.style.left = position.x + aSelectedRowElement.cells[1].offsetLeft + 'px';
						aExpireAlert.style.zIndex = XWC.UI.offset() + 3;

			expireMessage = XWC.S.willbeexpired.split("%s").join(gCertList[gSelectedRowIndex][4]);
			aElement = __80;
			while (aElement.firstChild) { aElement.removeChild(aElement.firstChild); }

			expireMessages = expireMessage.split("\n");
			for (i = 0; i < expireMessages.length; i++) {
				aElement.appendChild(document.createTextNode(expireMessages[i]));
				aElement.appendChild(XWC.UI.createElement("BR"));
			}
			
			aExpireAlert.style.display = "block";
			
			aGrandMom.onscroll = function () { aExpireAlert.style.display = "none"; };
			aExpireAlert.onclick = function () { aExpireAlert.style.display = "none"; };
			
			setTimeout (function () {if(gInputHandler) gInputHandler.refresh();}, 0);
			setTimeout (function () {if(gInputHandler) gInputHandler.clear();}, 0);
			try {
				setTimeout (function () {aExpireAlert.style.display = "none";}, 2200);
			} catch(ex) {
								console.log("try catch - onSelectRow");
			}
		} else {
			aExpireAlert.style.display = "none";
			
			setTimeout (function () {if(gInputHandler) gInputHandler.refresh();}, 0);
			setTimeout (function () {if(gInputHandler) gInputHandler.clear();}, 0);
		}

	};

	gCertTableView.onRefresh = function (aData) {
		var tr, td, i, temp;
		gCertTableBody = __57.getElementsByTagName("table")[0].tBodies[0];
		gCertList = aData;

		for (i = 0; i < aData.length; i++) {
			certInfo = aData[i];
			tr = XWC.UI.createElement("tr");
			tr.setAttribute("role", "row", 0);
			tr.setAttribute("aria-selected", "false", 0);
			tr.setAttribute('subject', certInfo[2]);
			tr.setAttribute("issuer", certInfo[5]);
			tr.setAttribute("serial", certInfo[6]);
			tr.className = "tr-style-case3";

			td = XWC.UI.createElement("td");
			td.className="xwup-td-style-case1";
			imageTextCell1 = gCertTableView.createImageTextCell(AnySign.mBasePath + "/img/cert" + certInfo[0] + ".png",
									   certInfo[1], XWC.S["cert_status" + certInfo[0]]);
			td.appendChild(imageTextCell1);
			tr.appendChild(td);

			td = XWC.UI.createElement("td");
			td.className="xwup-td-style-case2";
			textCell1 = gCertTableView.createTextCell(XWC.Util.getCNFromRDN(certInfo[2]));
			td.appendChild(textCell1);
			tr.appendChild(td);

			td = XWC.UI.createElement("td");
			td.className="xwup-td-style-case2";
			textCell2 = gCertTableView.createTextCell(certInfo[4]);
			td.appendChild(textCell2);
			tr.appendChild(td);

			td = XWC.UI.createElement("td");
			td.className="xwup-td-style-case2";
			textCell3 = gCertTableView.createTextCell(certInfo[3]);
			td.appendChild(textCell3);
			tr.appendChild(td);

			tr.setAttribute("tabindex", 0, 0);

			tr.onkeyup = function(e) {
				e = e || window.event;

				var aKeyCode = e.which || e.keyCode;

				if (aKeyCode == 9 && e.shiftKey) {
					__57.focus();
				} else if (aKeyCode == 9) {
					__100.focus();
				} else if (aKeyCode == 32) {
					return false;
				} else {
					return true;
				}

				XWC.Event.stopPropagation(e);
				XWC.Event.preventDefault(e);
			};
			
			gCertTableBody.appendChild(tr);
		}
		
		var aTableRows = gCertTableBody.getElementsByTagName('tr');
		if (aTableRows.length > 0) {
			setTimeout (function () {gCertTableView.selectRow(aTableRows[0]);});
		}
	};

	var aDragAndDropElement = __2.parentNode;
	var aGuideZoneElement = __57;
	XWC.UI.setPFXDragAndDrop ("certselectwide", aDragAndDropElement, aGuideZoneElement, function (aPFX, aSignCert, aSignKey, aKmCert, aKmKey, aHandle) {
		var aIsSavePFX = true;
		var IsSavePFX= function () {
			aIsSavePFX = !aIsSavePFX;	
		};
		var inputpasswdModule = __SANDBOX.loadModule("inputpasswd");
		var inputpasswdDialog = inputpasswdModule({
			args: {messageType: "certificate",
				   inputType: "lite",
				   descType: "pfx",
				   isSave: true,
				   isSaveEnable: true,
				   func: IsSavePFX},
			onconfirm: function(aResult) { 
				AnySign.mDivInsertOption = pageDivInsertOption;
				inputpasswdDialog.dispose();

				var _cb_setCertificate = function (aPWCheck) {
					if (aPWCheck == 0 || aPWCheck == 1) { 						_callback = function ()
						{
							if(gInputHandler) gInputHandler.clear();
							setOKButtonDisabled(false);
						}
						
						gDialogObj.onconfirm({
							mediaID: XWC.CERT_LOCATION_MEMORYSTORAGE,
							passwd: aResult,
							passwdResult: 0,
							pfxPath: "",
							withPFX: true,
							callback: _callback
						});
					} else {
						var aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
						if (aErrorObject.code == XW_ERROR_VERIFYPASSWORD) {
							alert(XWC.S.keyworderror);
						} else {
							alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
						}
					}
				}
				
				__SANDBOX.upInterface().setCertificate (aPFX, aSignCert, aSignKey, aKmCert, aKmKey, aResult, aIsSavePFX, gSearchCondition, gCAList, gCertSerial, _cb_setCertificate);
			},
			oncancel: function(e) {
				AnySign.mDivInsertOption = pageDivInsertOption;
				inputpasswdDialog.dispose();
			}
		});
		var pageDivInsertOption = AnySign.mDivInsertOption;
		AnySign.mDivInsertOption = 0;
		inputpasswdDialog.show();
	});


	gMediaRadio = XWC.UI.RadioButtonGroup([	__26,
											__29,
											__32,
											__35,
											__38,
											__41,
											__47,
											__44,
											__20,
											__23,
											__50,
											__53],
											"wide");

	gMediaRadio.updateDisabled();
	
	var media_hdd = __26.firstChild.nextSibling;
	media_hdd.style.padding = "0 0 0 5px";
	var media_savetoken = __32.firstChild.nextSibling;
	media_savetoken.style.padding = "0 0 0 5px";
	var media_xfs = __50.firstChild.nextSibling;
	media_xfs.style.padding = "0 0 0 5px";
	var media_webpage = __53.firstChild.nextSibling;
	media_webpage.style.padding = "0 0 0 5px";
	
	if (__SANDBOX.IEVersion < 7) {
		__89.style.display = "none";
		__88.style.display = "none";
	}
	
		if (AnySign.mXecureFreeSignSupport) {
		if (gStorage.indexOf("XFS") < 0) {
			gStorage = "XFS," + gStorage;
		}
		__SANDBOX.refreshCertLocationSet (gStorage);
	}
	
		if (AnySign.mWebPageStorageSupport) {
		if (gStorage.indexOf("WEBPAGE") < 0) {
			gStorage = "WEBPAGE," + gStorage;
		}
		__SANDBOX.refreshCertLocationSet (gStorage);
		
		if (AnySign.mStorage == "") {
			disabledFindButton();
			setDeleteButton(false);
		}
	}
	
		if (AnySign.mAnySignLiteSupport) {
		if (gStorage.indexOf("MEMORYSTORAGE") < 0) {
			gStorage = "MEMORYSTORAGE," + gStorage;
		}
		if (gStorage.indexOf("LOCALSTORAGE") < 0) {
			gStorage = "LOCALSTORAGE," + gStorage;
		}
		__SANDBOX.refreshCertLocationSet (gStorage);
		disabledFindButton();
	}
	
		if (gDialogObj.type == "envelope") {
		setPasswordInputDisable();
	} else {
				if (AnySign.mAnySignLiteSupport)
			createInputHandler_lite();
		
				if (AnySign.mXecureFreeSignSupport)
			createInputHandler_xfs();
		
				if (AnySign.mWebPageStorageSupport)
			createInputHandler_e2e();
		
				if (AnySign.mAnySignLoad)
			createInputHandler_4pc();
		
		switch (aInputType) {
		case "4pc":
			setInputHandler();
			break;
		case "lite":
			setInputHandler("lite");
			break;
		case "xfs":
			setInputHandler("xfs");
			break;
		case "e2e":
			setInputHandler("e2e");
			break;
		default: 					}
		
		setPasswordInputEnable();
	}
	
		function getMediaArray() {
		var i;
		var name;
		var usbtoken = false;
		var mobile = false;
		var storage = gStorage.split(",");
		var mediaArray = new Array();
		
		for (i = 0; i < storage.length; i++) {
			name = storage[i].toLowerCase();
			if (AnySign.mAnySignLiteSupport) {
				if (name == "localstorage" || name == "memorystorage") {
					mediaArray.push(name);
				}
			}
			if (AnySign.mXecureFreeSignSupport) {
				if (name == "xfs") {
					mediaArray.push(name);
				}
			}
			if (AnySign.mWebPageStorageSupport) {
				if (name == "webpage") {
					mediaArray.push(name);
				}
			}
			if (name == "hard" || name == "removable" || name == "pkcs11" || name == "smartcert" || name == "securedisk") {
				mediaArray.push(name);
			}
			if (name == "usbtoken" || name == "iccard" || name == "csp" || name == "kepcoiccard") {
				if (!usbtoken) {
					mediaArray.push("usbtoken");
					usbtoken = true;
				}
			}
			if (name == "mobisign" || name == "mphone" || name == "mobile") {
				if (!mobile) {
					mediaArray.push("mobile");
					mobile = true;
				}
			}
			if (name == "nfciccard") {
				mediaArray.push(name);
			}
		}
		return mediaArray;
	}
	
	var mediaArray = getMediaArray();
	var locationArray = new Array();
	var index = 0;
	var aMediaLength;
	if (mediaArray.length > 10)
	 	aMediaLength = 10;
	else
		aMediaLength = mediaArray.length;
	
	locationArray.push(__10);
	locationArray.push(__11);
	locationArray.push(__12);
	locationArray.push(__13);
	locationArray.push(__14);
	locationArray.push(__15);
	locationArray.push(__16);
	locationArray.push(__17);
	locationArray.push(__18);
	locationArray.push(__19);
	
	for (index = 0; index < aMediaLength; index++) {
		switch (mediaArray[index]) {
		case "localstorage":
			locationArray[index].style.display = "";
			locationArray[index].appendChild(__20);
			__20.style.display = "block";
			break;
		case "memorystorage":
			locationArray[index].style.display = "";
			locationArray[index].appendChild(__23);
			__23.style.display = "block";
			break;
		case "hard":
			locationArray[index].style.display = "";
			locationArray[index].appendChild(__26);
			__26.style.display = "block";
			break;
		case "removable":
			locationArray[index].style.display = "";
			locationArray[index].appendChild(__29);
			__29.style.display = "block";
			break;
		case "usbtoken":
			locationArray[index].style.display = "";
			locationArray[index].appendChild(__32);
			__32.style.display = "block";
			break;
		case "pkcs11":
			locationArray[index].style.display = "";
			locationArray[index].appendChild(__35);
			__35.style.display = "block";
			break;
		case "mobile":
			locationArray[index].style.display = "";
			locationArray[index].appendChild(__38);
			__38.style.display = "block";
			break;
		case "smartcert":
			locationArray[index].style.display = "";
			locationArray[index].appendChild(__41);
			__41.style.display = "block";
			break;
		case "securedisk":
			locationArray[index].style.display = "";
			locationArray[index].appendChild(__47);
			__47.style.display = "block";
			break;
		case "nfciccard":
			locationArray[index].style.display = "";
			locationArray[index].appendChild(__44);
			__44.style.display = "block";
			break;
		case "xfs":
			locationArray[index].style.display = "";
			locationArray[index].appendChild(__50);
			__50.style.display = "block";
			break;
		case "webpage":
			locationArray[index].style.display = "";
			locationArray[index].appendChild(__53);
			__53.style.display = "block";
			break;
		default:
		}
	}
	
	var aSelectMediaName;
	switch (aMediaType) {
	case XWC.CERT_LOCATION_HARD: 		if (__26.style.display == "block") {
			aCheckedRadioIndex = 0;
			aSelectMediaName = "hard";
		}
		break;
	case XWC.CERT_LOCATION_REMOVABLE: 		if (__29.style.display == "block") {
			aCheckedRadioIndex = 1;
			aSelectMediaName = "removable";
		}
		break;
	case XWC.CERT_LOCATION_ICCARD: 	case XWC.CERT_LOCATION_KEPCOICCARD: 		if (__32.style.display == "block") {
			aCheckedRadioIndex = 2;
			aSelectMediaName = "usbtoken";
		}
		break;
	case XWC.CERT_LOCATION_PKCS11: 		if (__35.style.display == "block") {
			aCheckedRadioIndex = 3;
			aSelectMediaName = "pkcs11";
		}
		break;
	case XWC.CERT_LOCATION_YESSIGNM: 	case XWC.CERT_LOCATION_MPHONE: 		if (__38.style.display == "block") {
			aCheckedRadioIndex = 4;
			aSelectMediaName = "mobile";
		}
		break;
	case XWC.CERT_LOCATION_LOCALSTORAGE: 		if (__20.style.display == "block") {
			aCheckedRadioIndex = 8;
			aSelectMediaName = "localstorage";
		}
		break;
	case XWC.CERT_LOCATION_MEMORYSTORAGE: 		if (__23.style.display == "block") {
			aCheckedRadioIndex = 9;
			aSelectMediaName = "memorystorage";
		}
		break;
	case XWC.CERT_LOCATION_XECUREFREESIGN: 		if (__50.style.display == "block") {
			aCheckedRadioIndex = 10;
			aSelectMediaName = "xfs";
		}
		break;
	case XWC.CERT_LOCATION_WEBPAGE: 		if (__53.style.display == "block") {
			aCheckedRadioIndex = 11;
			aSelectMediaName = "webpage";
		}
		break;
	default:
			}
	
	if (aCheckedRadioIndex == -1) {
		aMediaType = -1;
		gSelectedMediaID = -1;
	}
	
			
	var location_td_name;
	var location_td_width = 100 / aMediaLength + "%";
	var location_button_width;
	var location_button_width2;
	var location_ico_padding;
	
	switch (aMediaLength) {
	case 1:
		location_button_width = "948px";
		break;
	case 2:
		location_button_width = "475px";
		break;
	case 3:
		location_button_width = "317px";
		break;
	case 4:
		location_button_width = "238px";
		break;
	case 5:
		location_button_width = "191px";
		break;
	case 6:
		location_button_width = "159px";
		location_button_width2 = "160px";
		break;
	case 7:
		location_button_width = "137px";
		break;
	case 8:
		location_button_width = "120px";
		break;
	case 9:
		location_button_width = "107px";
		break;
	case 10:
		location_button_width = "95.5px";
		break;
	default:
		location_button_width = 955 / aMediaLength + "px";
	}
	
	if (aMediaLength <= 5)
		location_ico_padding = "0 " + 20 + "px 0 0";
	else
		location_ico_padding = "0";
	
	for (index = 0; index < aMediaLength; index++) {
		location_td_name = "xwup_location_" + (index + 1);
		XWC.$(location_td_name).style.width = location_td_width;
		
		if (aMediaLength == 6 && index > 2)
			XWC.$(location_td_name).firstChild.style.width = location_button_width2;
		else
			XWC.$(location_td_name).firstChild.style.width = location_button_width;
		
		XWC.$(location_td_name).firstChild.firstChild.style.padding = location_ico_padding;
	}
	
	if (AnySign.mStorageEnable == false) {
		__6.style.display = "none";
	} else {
		__56.style.borderTop = "transparent";
	}
	
		_setMediaRadio = function ()
	{
		gMediaRadio.setLocationEnable("hard", __26);
		gMediaRadio.setLocationEnable("removable", __29);
		gMediaRadio.setLocationEnable("usbtoken", __32, true);
		gMediaRadio.setLocationEnable("pkcs11", __35, true);
		gMediaRadio.setLocationEnable("mobile", __38, true);
		gMediaRadio.setLocationEnable("smartcert", __41, true);
		gMediaRadio.setLocationEnable("securedisk", __47, true);
		gMediaRadio.setLocationEnable("nfciccard", __44, true);
		gMediaRadio.setLocationEnable("localstorage", __20);
		gMediaRadio.setLocationEnable("memorystorage", __23);
		gMediaRadio.setLocationEnable("xfs", __50);
		gMediaRadio.setLocationEnable("webpage", __53);
		
		if ((__SANDBOX.certLocationSet["mphone"]) || (__SANDBOX.certLocationSet["mobisign"]))
			gMediaRadio.setDisabled (__38, false);
		
		if (AnySign.mPlatform.aName.indexOf("mac") == 0 || AnySign.mPlatform.aName.indexOf("linux") == 0)
		{
			gMediaRadio.setDisabled (__32, true);
			gMediaRadio.setDisabled (__35, true);
			gMediaRadio.setDisabled (__38, true);
			gMediaRadio.setDisabled (__41, true);
			gMediaRadio.setDisabled (__47, true);
		}
		
				if (gDialogObj.args.funcname == "SignFile" || gDialogObj.args.funcname == "MultiFileSign") {
			gMediaRadio.setDisabled (__32, true);
			gMediaRadio.setDisabled (__35, true);
			gMediaRadio.setDisabled (__47, true);
		}
		
				if (gDialogObj.args.funcname == "SignFileEx" || gDialogObj.args.funcname == "SignFileExWithVID") {
			gMediaRadio.setDisabled (__47, true);
		}
		
				if (gDialogObj.args.funcname == "EnvelopeFileWithCert" || gDialogObj.args.funcname == "DeEnvelopeFileWithCert") {
			gMediaRadio.setDisabled (__32, true);
			gMediaRadio.setDisabled (__38, true);
			gMediaRadio.setDisabled (__47, true);
		}
		
		if (gDialogObj.args.funcname == "EnvelopeDataWithCert" || gDialogObj.args.funcname == "DeEnvelopeDataWithCert") {
			gMediaRadio.setDisabled (__47, true);
			gMediaRadio.setDisabled (__44, true);
			gMediaRadio.setDisabled (__53, true);
			
			if (gDialogObj.args.funcname == "EnvelopeDataWithCert" && gDialogObj.args.multicert == true) {
				if (AnySign.mAnySignEnable == true) {
					gMediaRadio.setDisabled (__20, true);
					gMediaRadio.setDisabled (__23, true);
				} else {
					gMediaRadio.setDisabled (__26, true);
					gMediaRadio.setDisabled (__29, true);
					gMediaRadio.setDisabled (__32, true);
					gMediaRadio.setDisabled (__35, true);
					gMediaRadio.setDisabled (__38, true);
					gMediaRadio.setDisabled (__41, true);
					
					if(gDialogObj.args.disablePFX == true)
						gMediaRadio.setDisabled (__23, true);
				}
			}
		}
		
		if (__SANDBOX.certLocationSet["smartcert"]) {
			if (gDialogObj.type.indexOf("sign") < 0) { 				gMediaRadio.setDisabled (__41, true);
			}
			if (gDialogObj.args.funcname == "SignFile" || gDialogObj.args.funcname == "MultiFileSign" ||
				gDialogObj.args.funcname == "SignFileEx" || gDialogObj.args.funcname == "SignFileExWithVID" ||
				gDialogObj.args.funcname == "EnvelopeFileWithCert" || gDialogObj.args.funcname == "DeEnvelopeFileWithCert") {
				gMediaRadio.setDisabled (__41, true);
			}
		}
		
		if (gDialogObj.type == "renew") {
			gMediaRadio.setDisabled (__44, true);
			gMediaRadio.setDisabled (__23, true);
			gMediaRadio.setDisabled (__50, true);
			gMediaRadio.setDisabled (__53, true);
		}
		
		if (gDialogObj.args.funcname == "GetCertPath") {
			gMediaRadio.setDisabled (__32, true);
			gMediaRadio.setDisabled (__35, true);
			gMediaRadio.setDisabled (__38, true);
			gMediaRadio.setDisabled (__41, true);
			gMediaRadio.setDisabled (__47, true);
			gMediaRadio.setDisabled (__44, true);
			gMediaRadio.setDisabled (__20, true);
			gMediaRadio.setDisabled (__23, true);
			gMediaRadio.setDisabled (__50, true);
			gMediaRadio.setDisabled (__53, true);
		}
		
		if (gDialogObj.args.funcname == "SignDataAdd" || gDialogObj.args.funcname == "DeEnvelopeDataWithCert") {
			if (AnySign.mXecureFreeSignData.signType != 2)
				gMediaRadio.setDisabled (__50, true);
		}
		
		if (aCheckedRadioIndex >= 0) {
			gMediaRadio.setChecked(aCheckedRadioIndex);
		}
		
		if (aMediaType == XWC.CERT_LOCATION_PKCS11)
		{
			gNeedPassword = setPasswordInputEnable(false);
		}
	}
		_CB_getCertTree = function (aCertList) 
	{
		if (__SANDBOX.isFailed(aCertList))
			aCertList = "";

		refreshTableView(aCertList);
		if (gSelectedMediaID == XWC.CERT_LOCATION_LOCALSTORAGE)
			setDragAndDropElement (true, aCertList);
		
		_setMediaRadio();
	}
		_CB_getMediaList = function ()
	{
				__SANDBOX.upInterface().getCertTree(gSelectedMediaID, 2, gSearchCondition, 5, gCAList, gCertSerial, _CB_getCertTree);
	}
		_CB_setConvertTable = function ()
	{
		__SANDBOX.upInterface().getMediaList(aMediaType, 0, 1, _CB_getMediaList);
	}
		
	if (gSelectedMediaID >= 0) {
		__SANDBOX.setConvertTable(_CB_setConvertTable);
	} else {
		_setMediaRadio();
	}
	
	if (AnySign.mWBStyleApply) {
		__101.style.display = 'inline-block';
		if (__SANDBOX.isIE () < 9) {
			__101.style.display = 'inline';
			__101.style.zoom = '1';
			__102.style.display = 'inline';
			__102.style.zoom = '1';
		}

		__102.style.backgroundImage = 'url(' + AnySign.mBasePath + '/img/off.png)';
		__102.style.backgroundRepeat = "no-repeat";
		if (__SANDBOX.isIE () < 9) {
					} else {
			__102.style.margin = '2px 15px 0px 0px';
		}
		__102.style.width = '29px';
		__102.style.height= '27px';
		__102.style.border = '0px';
		__102.onclick = function(event) {onInputMouseCheckBoxClick (event);};

		__100.style.border = '1.0px solid #0078d4';
	}
	else {
		__101.style.display = 'none';
        __102.style.display = 'none';
	}
	
	return 0;
}

function setFocus() {
	if (typeof gCertTableBody != "undefined") {
		var aTableRows = gCertTableBody.getElementsByTagName('tr');

		if (aTableRows.length > 0) {
			setTimeout (function () {
				if(gInputHandler) gInputHandler.refresh();
			});
		}
	}
}

function setOKButtonDisabled(aEnable) {
	}

function onOKButtonClick(e) {
	var aGuideModule,
		aGuideDialog = null,
		aKeyword = null,
		aKeywordResult = 0,
		aPin = null,
		aMediaType;
	
	var pageDivInsertOption = AnySign.mDivInsertOption;
	
	aMediaType = Math.floor(parseInt(gSelectedMediaID, 10) / 100) * 100;
	setOKButtonDisabled(true);

		_callback = function ()
	{
		if(gInputHandler) gInputHandler.clear();
		setOKButtonDisabled(false);
	}
	
	_confirmCallback = function ()
	{
		gDialogObj.onconfirm({
			mediaID: gSelectedMediaID,
			providerName: gProviderName,
			smartCert: gSelectedSmartCert,
			subjectRDN : gSelectedSubjectRDN,
			issuerRDN : gSelectedIssuerRDN,
			certSerial : gSelectedCertSerial,
			passwd: aKeyword,
			passwdResult: aKeywordResult,
			pin: aPin,
			dialog: aGuideDialog,
			callback: _callback
		});
	}
		_show_guidewindow = function ()
	{
		aGuideModule = __SANDBOX.loadModule("guidewindow");
		aGuideDialog = aGuideModule({
			type: "loading",
			args: "",
			onconfirm: "",
			oncancel: function () {aGuideDialog.dispose();}
		});
		aGuideDialog.show();
	}
		_fn_final = function (aCallback)
	{
		var _final_callback = function () {
			if (aGuideDialog) {
				aGuideDialog.dispose ();
				aGuideDialog = null;
			}
			
			if (aCallback)
				aCallback ();
		}
		
		if (aMediaType == XWC.CERT_LOCATION_ICCARD || aMediaType == XWC.CERT_LOCATION_KEPCOICCARD) {
			__SANDBOX.upInterface().logoutStoreToken(gSelectedMediaID, _final_callback);
		} else if (aMediaType == XWC.CERT_LOCATION_PKCS11) {
			__SANDBOX.upInterface().finalizePKCS11FromName (gProviderName, _final_callback);
		} else if (aMediaType == XWC.CERT_LOCATION_SECUREDISK) {
			__SANDBOX.upInterface().finalizeSecureDiskFromName (gProviderName, _final_callback);
		} else {
			_final_callback ();
		}
	}
		
	if (gPFXInfo.withPFX == true) {
	
		gDialogObj.onconfirm({
							withPFX: gPFXInfo.withPFX,
							pfxPath: gPFXInfo.pfxPath,
							passwd: gPFXInfo.passwd,
							callback: _callback
		});
		gPFXInfo = {withPFX:false,pfxPath:"",passwd:""};
		
	}
	else
	{
		if (gSelectedMediaID != XWC.CERT_LOCATION_MPHONE + 1 && gSelectedSmartCert != true) {
			if (!gSelectedIssuerRDN || !gSelectedCertSerial) {
				alert(XWC.S.selecterror);
				setOKButtonDisabled(false);
				return;
			}
		} else {
			gSelectedSubjectRDN = "";
			gSelectedIssuerRDN = "";
			gSelectedCertSerial = "";
			gSelectedCertClass = "";
		}

		if (gNeedPassword == true)
		{
			if (gInputHandler.getLength() == 0) {
				alert(XWC.S.nokeyworderror);
				setOKButtonDisabled(false);
				return;
			}
			
						_open_savepasswd = function (aPFXCert)
			{
				var aSaveKeyword;
				_CB_setCertificate = function (aResult)
				{
					if (aResult == 0) {
						if (gCertList[gSelectedRowIndex][0] == 1 && AnySign.mExpireDateAlert) {
							var aExpireMessage = XWC.S.willbeexpired.split("%s");
							aExpireMessage = aExpireMessage[0] + gCertList[gSelectedRowIndex][4] + aExpireMessage[1];
							aExpireMessage += "\n";
							aExpireMessage += XWC.S.renewplease1 + XWC.S.renewplease2;
							alert(aExpireMessage);
						}
						
						gDialogObj.onconfirm({
							mediaID: gSelectedMediaID,
							subjectRDN : gSelectedSubjectRDN,
							issuerRDN : gSelectedIssuerRDN,
							certSerial : gSelectedCertSerial,
							passwd: aSaveKeyword,
							callback: _callback
						});
					} else {
						var aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
						alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
						setOKButtonDisabled(false);
					}
				}
				
				AnySign.mDivInsertOption = 0;
				var inputpasswdModule = __SANDBOX.loadModule("inputpasswd");
				var inputpasswdDialog = inputpasswdModule({
					args: {messageType: "certificate2",
						   descType: "copy",
						   inputType: "lite",
						   errCallback: gErrCallback},
					onconfirm: function(aResult) { 
						AnySign.mDivInsertOption = pageDivInsertOption;
						inputpasswdDialog.dispose();
						aSaveKeyword = aResult;
						
						__SANDBOX.upInterface().importCertFromPFX (gSelectedMediaID,
																   aSaveKeyword,
																   aSaveKeyword,
																   aPFXCert,
																   null, null, null, null, null,
																   1,
																   _CB_setCertificate);
					},
					oncancel: function() {
						AnySign.mDivInsertOption = pageDivInsertOption;
						inputpasswdDialog.dispose();
						setOKButtonDisabled(false);
					}
				});
				inputpasswdDialog.show();
			}
			
						_resultCheckFun = function (aResult)
			{
				if (gSelectedMediaID == XWC.CERT_LOCATION_XECUREFREESIGN && AnySign.mXecureFreeSignData.signType == 2) {
					if (aResult) {
						_open_savepasswd (aResult);
						return;
					}
				} else {
					if (aResult == 0) {
						if (gCertList[gSelectedRowIndex][0] == 1 && AnySign.mExpireDateAlert) {
							var aExpireMessage = XWC.S.willbeexpired.split("%s");
							aExpireMessage = aExpireMessage[0] + gCertList[gSelectedRowIndex][4] + aExpireMessage[1];
							aExpireMessage += "\n";
							aExpireMessage += XWC.S.renewplease1 + XWC.S.renewplease2;
							alert(aExpireMessage);
						}
						_confirmCallback ();
						return;
					}
				}
				
				var aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
				if (aErrorObject.code == XW_ERROR_INCORRECT_PASSWORD_KMCERT) {
					if (confirm(XWC.S.incorrect_kmcertPW)) {
												_confirmCallback ();
						return;
					}
				}
				
				var _fn_final_callback = function ()
				{
					gInputHandler.clear();
					
					if (aErrorObject.code == XW_ERROR_INCORRECT_PASSWORD_KMCERT) {
						setOKButtonDisabled(false);
					} else if (aErrorObject.code == XW_ERROR_VERIFYPASSWORD) {
						alert(XWC.S.keyworderror);
						if (gPasswordTryCount++ >= gDialogObj.args.keywordTryLimit) {
							aKeywordResult = -3;
							
							var _CB_setError = function () {
								aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
								gErrCallback (aErrorObject);
							}
							
							var _cb_logout = function(){
								refreshTableView("");
								__SANDBOX.upInterface().setError (XW_ERROR_PLUGINS_INCORRECT_PWD, _CB_setError);
							}
							
							if (gSelectedMediaID == XWC.CERT_LOCATION_XECUREFREESIGN) {
								__SANDBOX.upInterface().xfsLogout(_cb_logout);
							} else {
								__SANDBOX.upInterface().setError (XW_ERROR_PLUGINS_INCORRECT_PWD, _CB_setError);
							}
						}
						gInputHandler.focus();
					} else if (aErrorObject.code == XW_ERROR_PLUGINS_NOT_SECUREINPUT) {
						alert(XWC.S.not_allowed);
						if (gSelectedMediaID == XWC.CERT_LOCATION_XECUREFREESIGN) {
							var _cb_logout = function(){ onCancelButtonClick(); }
							__SANDBOX.upInterface().xfsLogout(_cb_logout);
						} else {
							onCancelButtonClick();
						}
					} else {
						alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
						if (gSelectedMediaID == XWC.CERT_LOCATION_XECUREFREESIGN) {
							var _cb_getCertTree = function (aResult) {
								refreshTableView(aResult);
								setOKButtonDisabled(false);
							}
							__SANDBOX.upInterface().getCertTree(XWC.CERT_LOCATION_XECUREFREESIGN, 2, gSearchCondition, 5, gCAList, gCertSerial, _cb_getCertTree);
						} else {
							setOKButtonDisabled(false);
						}
					}
				}
				_fn_final (_fn_final_callback);
			}
						_inputHandlerCallback = function (aResult)
			{
				var aGetKeyword = gInputHandler.getValue(aResult);
				
				if (aMediaType == XWC.CERT_LOCATION_SECUREDISK) {
					aKeyword = "";
					aPin = aGetKeyword; 					
					AnySign.mDivInsertOption = 0;
					_show_guidewindow ();
					AnySign.mDivInsertOption = pageDivInsertOption;
					
					__SANDBOX.upInterface().loginSecureDiskFromIndex (gSelectedMediaID,
																	  aGetKeyword,
																	  gSelectedSubjectRDN,
																	  gSelectedIssuerRDN,
																	  gSelectedCertSerial,
																	  (gDialogObj.type == "renew" ? 3 : 0),
																	  _resultCheckFun);
				} else if (aMediaType == XWC.CERT_LOCATION_WEBPAGE) {
					gDialogObj.onconfirm({
						mediaID: gSelectedMediaID,
						subjectRDN : gSelectedSubjectRDN,
						issuerRDN : gSelectedIssuerRDN,
						certSerial : gSelectedCertSerial,
						passwd: aGetKeyword
					});
				} else {
					aKeyword = aGetKeyword;
					if (gSelectedMediaID == XWC.CERT_LOCATION_XECUREFREESIGN && AnySign.mXecureFreeSignData.signType == 2) {
						__SANDBOX.upInterface().exportCertToPFX (gSelectedMediaID,
																gSelectedIssuerRDN,
																gSelectedCertSerial,
																aGetKeyword,
																null, null, 0,
																_resultCheckFun);
					} else {
						__SANDBOX.upInterface().verifyPassword (gSelectedMediaID,
																gSelectedIssuerRDN,
																gSelectedCertSerial,
																aGetKeyword,
																_resultCheckFun);
					}
				}
			}
						
			gInputHandler.generateSessionID(0, _inputHandlerCallback);
		}
		else
		{
			if (aMediaType == XWC.CERT_LOCATION_PKCS11 && gSelectedSmartCert == false)
			{
				AnySign.mDivInsertOption = 0;
				
								_resultCheckFun = function (aResult)
				{
					if (aResult == 0)
					{
						aKeyword = "";
						_confirmCallback ();
					}
					else
					{
						var aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
						var _fn_final_callback = function () {
							alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
							setOKButtonDisabled(false);
						}
						_fn_final (_fn_final_callback);
					}
				}
								
				var verifyhsmModule = __SANDBOX.loadModule("verifyhsm");
				var verifyhsmDialog = verifyhsmModule({
					args: {},
					onconfirm: function (aResult) {
						verifyhsmDialog.dispose();
						_show_guidewindow ();
						AnySign.mDivInsertOption = pageDivInsertOption;
						
						aPin = aResult;
						__SANDBOX.upInterface().loginPKCS11FromIndex(gSelectedMediaID, aResult, _resultCheckFun);
					},
					oncancel: function () {
						AnySign.mDivInsertOption = pageDivInsertOption;
						verifyhsmDialog.dispose();
						setOKButtonDisabled(false);
					}
				});
				verifyhsmDialog.show();
			}
			else
			{
				if (gSelectedMediaID == XWC.CERT_LOCATION_MPHONE + 1 || gSelectedSmartCert == true) {
					AnySign.mDivInsertOption = 0;
					_show_guidewindow ();
					AnySign.mDivInsertOption = pageDivInsertOption;
				}
				
				aKeyword = "";
				_confirmCallback ();
			}
		}
	}
}

function onCancelButtonClick(e) {
	}

function onHddButtonClick(element) {
	onChangeInfo(element);
	gSelectedButton = 1;
	gSelectedSmartCert = false;
	refreshTableView("");
	setDragAndDropElement (false);
	
	if (checkAnySignLoad() == false) {
		gEvent = element;
		onCheckMedia();	
		return;
	}
	
	AnySign.mAnySignEnable = true;
	setInputHandler();
	setPasswordInputEnable();
	setDeleteButton(true);
	setButtonManager ("disabled");

		_CB_getCertTree = function (aCertList)
	{
		setButtonManager ("enabled");
		if (__SANDBOX.isFailed(aCertList))
			aCertList = "";

		gSelectedMediaID = 1;
		refreshTableView(aCertList);
		element.focus();
	}
		_CB_getMediaList = function ()
	{
		__SANDBOX.upInterface().getCertTree(1, 2, gSearchCondition, 5, gCAList, gCertSerial, _CB_getCertTree);
	}
	
	__SANDBOX.upInterface().getMediaList(XWC.CERT_LOCATION_HARD, 0, 1, _CB_getMediaList);
}

function onRemovableButtonClick(element) {
	onChangeInfo(element);
	var aMediaList;
	
	gSelectedButton = 2;
	gSelectedSmartCert = false;
	refreshTableView("");
	setDragAndDropElement (false);
	
	if (checkAnySignLoad() == false) {
		gEvent = element;
		onCheckMedia();	
		return;
	}
	
	AnySign.mAnySignEnable = true;
	setInputHandler();
	setPasswordInputEnable();
	setDeleteButton(true);
	setButtonManager ("disabled");
	
		_CB_getMediaList_refresh = function (aResult)
	{
		setButtonManager ("enabled");
		var aMenuItems = [];
		
		if (__SANDBOX.isFailed(aResult, gErrCallback)) {
			onCancelButtonClick();
			return;
		}
		
		var aIDList = aResult.split("\t\n");
		
		for (var i = 0; i < aMediaList.length; i++) {
			if (aMediaList[i].length > 0) {
				aMenuItems.push({ item: aMediaList[i], data: Number(aIDList[i]) });
			}
		}
		
		XWC.UI.ContextMenu(element, XWC.S.media_removable_list, aMenuItems, aContextMenuFunc);
	}
		_CB_getMediaList = function (aResult)
	{
		aMediaList = aResult.split("\t\n");
		
		if (__SANDBOX.isFailed(aMediaList, gErrCallback)) {
			onCancelButtonClick();
			return;
		}

		__SANDBOX.upInterface().getMediaList(XWC.CERT_LOCATION_REMOVABLE, 1, 0, _CB_getMediaList_refresh);
	}
		_CB_getCertTree = function (aResult)
	{
		if (__SANDBOX.isFailed(aResult)) {
			aResult = "";
		}

		refreshTableView(aResult);
		element.focus();
	}
		
	function aContextMenuFunc(aMenuData)
	{
		gSelectedMediaID = aMenuData;
		gSelectedIssureRDN = null;
		gSelectedCertSerial = null;
		gSelectedRowIndex = null;
		gSelectedCertClass = null;
		
		__SANDBOX.upInterface().getCertTree(aMenuData, 2, gSearchCondition, 5, gCAList, gCertSerial, _CB_getCertTree);
	}

	__SANDBOX.upInterface().getMediaList(XWC.CERT_LOCATION_REMOVABLE, 0, 1, _CB_getMediaList);
}

function onSaveTokenButtonClick(element)
{
	onChangeInfo(element);
	var	aGuideModule,
		aGuideDialog,
		aCertList,
		aMenuItems = [];
	
	gSelectedButton = 3;
	gSelectedSmartCert = false;
	refreshTableView("");
	setDragAndDropElement (false);

	if (checkAnySignLoad() == false) {
		gEvent = element;
		onCheckMedia();	
		return;
	}
	
	AnySign.mAnySignEnable = true;
	setInputHandler();
	setPasswordInputEnable();
	setDeleteButton(true);
	
	var pageDivInsertOption = AnySign.mDivInsertOption;
	
	if (__SANDBOX.certLocationSet["iccard"])
		aMenuItems.push({ item: XWC.S.iccard, data: XWC.CERT_LOCATION_ICCARD});
	
	if (__SANDBOX.certLocationSet["kepcoiccard"])
		aMenuItems.push({ item: XWC.S.kepcoiccard, data: XWC.CERT_LOCATION_KEPCOICCARD});
	
		_CB_logoutStoreToken = function ()
	{
		if (!__SANDBOX.isFailed(aCertList))
			refreshTableView(aCertList);
			
		aGuideDialog.dispose ();
		element.focus();
	}
		_CB_getCertTree = function (aResult)
	{
		aCertList = aResult;
		
		__SANDBOX.upInterface().logoutStoreToken(gSelectedMediaID, _CB_logoutStoreToken);
	}
		_CB_loginStoreToken = function (result)
	{
		var aErrorObject;
		if (result != 0)
		{
			aGuideDialog.dispose ();
			element.focus();
			
			aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
			alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
		}
		else
		{ 
			__SANDBOX.upInterface().getCertTree(gSelectedMediaID, 2, gSearchCondition, 5, gCAList, gCertSerial, _CB_getCertTree);
		}
	}
	
	function aContextMenuFunc(aMenuData) {
		
		AnySign.mDivInsertOption = 0;
		
		gSelectedMediaID = aMenuData;
		
				ShowIccardDialog = function (aMediaID)
		{
			gSelectedMediaID = aMediaID;
			
			var aMediaType = Math.floor(gSelectedMediaID / 100) * 100;
			var aICCardType;
			if (aMediaType == XWC.CERT_LOCATION_KEPCOICCARD)
				aICCardType = "kepco";
			else
				aICCardType = "iccard";
			
			AnySign.SetUITarget (__32);
			var iccardModule = __SANDBOX.loadModule("iccard");
			var iccardDialog = iccardModule({
				type: aICCardType,
				args: {},
				onconfirm: function (aPin) {
					iccardDialog.dispose();

					aGuideModule = __SANDBOX.loadModule("guidewindow");
					aGuideDialog = aGuideModule({
						type: "loading",
						args: "",
						onconfirm: "",
						oncancel: function () {aGuideDialog.dispose();}
					});
					
					__SANDBOX.upInterface().loginStoreToken(gSelectedMediaID, aPin, 1, _CB_loginStoreToken);
					
					aGuideDialog.show();
					AnySign.mDivInsertOption = pageDivInsertOption;
				},
				oncancel: function () {
					iccardDialog.dispose();
					element.focus();
					AnySign.mDivInsertOption = pageDivInsertOption;
				}
			});
			iccardDialog.show();
		}
		
		if (gSelectedMediaID == XWC.CERT_LOCATION_ICCARD) {
			AnySign.SetUITarget (__32);
			var iccardlistModule = __SANDBOX.loadModule("iccardlist");
			var iccardlistDialog = iccardlistModule({
				args: {},
				onconfirm: function (aResult) {
					iccardlistDialog.dispose();
					ShowIccardDialog (XWC.CERT_LOCATION_ICCARD + aResult);
				},
				oncancel: function () {
					iccardlistDialog.dispose();
					element.focus();
					AnySign.mDivInsertOption = pageDivInsertOption;
				}
			});
			iccardlistDialog.show();
		} else if (gSelectedMediaID == XWC.CERT_LOCATION_KEPCOICCARD) {
			_CB_initStoreToken = function (aResult)
			{
				var aErrCallback = function (aErrorObject) {
										alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
				}
				
				if (!__SANDBOX.isFailed(aResult, aErrCallback)) {
					ShowIccardDialog (XWC.CERT_LOCATION_KEPCOICCARD + 1);
				}
			}
			__SANDBOX.upInterface().initStoreToken(XWC.CERT_LOCATION_KEPCOICCARD + 1, _CB_initStoreToken);
		}
	}

	XWC.UI.ContextMenu(element, XWC.S.media_savetoken_list, aMenuItems, aContextMenuFunc);
}

function onSmartCertButtonClick(element) {
	onChangeInfo(element);
	var aResult = "",
		aIndex = 0,
		aProviderName = "",
		aSmartCertDataList,
		aErrorObject,
		aGuideModule,
		aGuideDialog;
	
	gSelectedButton = 6;
	gSelectedSmartCert = false;
	refreshTableView("");
	setDragAndDropElement (false);

	if (checkAnySignLoad() == false) {
		gEvent = element;
		onCheckMedia();	
		return;
	}
	
	AnySign.mAnySignEnable = true;
	setInputHandler();
	setPasswordInputEnable(false);
	setDeleteButton(false);
	setButtonManager ("disabled");
	
	gNeedPassword = false;
	
	gSelectedIssureRDN = "";
	gSelectedCertSerial = "";
	gSelectedRowIndex = null;
	
	aSmartCertDataList = AnySign.mSmartCertDataList;
	
	var pageDivInsertOption = AnySign.mDivInsertOption;
	AnySign.mDivInsertOption = 0;
	
	function installSmartCert(index) {
		if (aGuideDialog)
			aGuideDialog.dispose();
		
		if (confirm(XWC.JSSTR("smartcert_install"))) {
			var aURL = aSmartCertDataList[index].mInstallURL;
			var aOption = aSmartCertDataList[index].mInstallPageOption;
			
			window.open (aURL, 'DownLoadPage', aOption);
		}
		
		setButtonManager ("enabled");
		element.focus();
	}
	
	function getSmartCertOption(aDataList, aAddOption) {
		var option = 0x04;
		if (aDataList.mSiteDomainURL != "" || aDataList.mServiceServerIP != "" || aDataList.mServiceServerPort != "" || aDataList.mSiteCode != "")
			option += 0x01;
		if (aDataList.mLoginOrder == "1")
			option += 0x08;
		if (aDataList.mMagicNum != "" || aDataList.mFilterShowExpired != "" || aDataList.mFilterOIDList != "" || aDataList.mFilterCACert != "" || aDataList.mFilterUserCert != "")
			option += 0x10;
		if (aDataList.mPlainDataView == "YES")
			option += 0x20;
		
		if (aAddOption != undefined)
			option += aAddOption;
		
		return option;
	}
	
		_getMediaList = function (result)
	{
		var aMediaList = result.split("\t\n");
		if (aMediaList == "") {
			installSmartCert(0);
			return;
		}
		
				var aFind = false;
		var aMediaIndex = 0;
		var aServiceInfo = "";
		var aOption = 0;
		var i = 0;
		
		for (i = 0; i < aSmartCertDataList.length; i++) {
			aFind = false;
			for (aMediaIndex = 0; aMediaIndex < aMediaList.length; aMediaIndex++) {
				if (aMediaList[aMediaIndex].indexOf(aSmartCertDataList[i].mProvider) == 0) {
					aSmartCertDataList[i].mProviderIndex = aMediaIndex;
					aSmartCertDataList[i].mProviderName = aMediaList[aMediaIndex];
					aFind = true;
					break;
				}
			}
			if (!aFind) {
				installSmartCert(i);
				return;
			}
		}
		
				aIndex = 0;
		aProviderName = aSmartCertDataList[aIndex].mProviderName;
		aServiceInfo = (aSmartCertDataList[aIndex].mSiteDomainURL == "" ? "NONE" : aSmartCertDataList[aIndex].mSiteDomainURL) + "|" +
					   (aSmartCertDataList[aIndex].mServiceServerIP == "" ? "NONE" : aSmartCertDataList[aIndex].mServiceServerIP) + "|" +
					   (aSmartCertDataList[aIndex].mServiceServerPort == "" ? "NONE" : aSmartCertDataList[aIndex].mServiceServerPort) + "|" +
					   (aSmartCertDataList[aIndex].mSiteCode == "" ? "NONE" : aSmartCertDataList[aIndex].mSiteCode);
		aOption = getSmartCertOption(aSmartCertDataList[aIndex]);
		
		__SANDBOX.upInterface().initializePKCS11FromNameEx(aProviderName, aServiceInfo, aOption, _initializePKCS11FromNameEx);
	}
	
		_initializePKCS11FromNameEx = function (result)
	{
		aResult = result;
		if (result == "OK") { 			_setPhoneData();
		} else if (result == "") { 			aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
			__SANDBOX.upInterface().finalizePKCS11FromName(aProviderName, _error_finalizePKCS11FromName);
			
		} else { 			__SANDBOX.upInterface().finalizePKCS11FromName(aProviderName, _finalizePKCS11FromName);
		}
	}
	
		_initializePKCS11FromNameEx2 = function (result)
	{
		aResult = result;
		if (result == "OK") { 			_setPhoneData();
		} else { 			aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
			__SANDBOX.upInterface().finalizePKCS11FromName(aProviderName, _error_finalizePKCS11FromName);
		}
	}
	
		_finalizePKCS11FromName = function ()
	{
		var aFind = false;
		var aServiceInfo = "";
		var aOption = 0;
		
				for (aIndex = 0; aIndex < aSmartCertDataList.length; aIndex++) {			
			if (aResult.indexOf (aSmartCertDataList[aIndex].mDriverName) == 0) {
				aFind = true;
				break;
			}
		}
		
		if (!aFind) { 			if (aGuideDialog)
				aGuideDialog.dispose();
			
			alert(XWC.JSSTR("smartcert_not_supported"));
			setButtonManager ("enabled");
			element.focus();
			return;
		}
		
				aProviderName = aSmartCertDataList[aIndex].mProviderName;
		aServiceInfo = (aSmartCertDataList[aIndex].mSiteDomainURL == "" ? "NONE" : aSmartCertDataList[aIndex].mSiteDomainURL) + "|" +
					   (aSmartCertDataList[aIndex].mServiceServerIP == "" ? "NONE" : aSmartCertDataList[aIndex].mServiceServerIP) + "|" +
					   (aSmartCertDataList[aIndex].mServiceServerPort == "" ? "NONE" : aSmartCertDataList[aIndex].mServiceServerPort) + "|" +
					   (aSmartCertDataList[aIndex].mSiteCode == "" ? "NONE" : aSmartCertDataList[aIndex].mSiteCode);
		aOption = getSmartCertOption(aSmartCertDataList[aIndex], 0x02);
		
		__SANDBOX.upInterface().initializePKCS11FromNameEx(aProviderName, aServiceInfo, aOption, _initializePKCS11FromNameEx2);
	}
	
		_error_finalizePKCS11FromName = function ()
	{
		if (aGuideDialog)
			aGuideDialog.dispose();
		
		if (aProviderName.indexOf("Mobile_SmartCert") == 0) { 			if (aErrorObject.code != XW_ERROR_MIRAE_6 && aErrorObject.code != XW_ERROR_MIRAE_PKCS11_6)
				alert(XWC.JSSTR("smartcert_error"));
		} else {
			if (aErrorObject.code == XW_ERROR_MIRAE_1 || aErrorObject.code == XW_ERROR_MIRAE_PKCS11_1)
				alert(XWC.JSSTR("smartcert_cancel"));
			else
				alert(XWC.JSSTR("smartcert_error"));
		}
		setButtonManager ("enabled");
		element.focus();
	}
	
		_setPhoneData = function (result)
	{
		var aSetPhoneData = "";
		
				aSetPhoneData = (aSmartCertDataList[aIndex].mMagicNum == "" ? "NONE" : aSmartCertDataList[aIndex].mMagicNum) + "$" +
						(aSmartCertDataList[aIndex].mFilterShowExpired == "" ? "NONE" : aSmartCertDataList[aIndex].mFilterShowExpired) + "$" +
						(aSmartCertDataList[aIndex].mFilterOIDList == "" ? "NONE" : aSmartCertDataList[aIndex].mFilterOIDList) + "$" +
						(aSmartCertDataList[aIndex].mFilterCACert == "" ? "NONE" : aSmartCertDataList[aIndex].mFilterCACert) + "$" +
						(aSmartCertDataList[aIndex].mFilterUserCert == "" ? "NONE" : aSmartCertDataList[aIndex].mFilterUserCert);
		__SANDBOX.upInterface().setPhoneData(aSetPhoneData, 0x040, _final);
	}
	
		_final = function ()
	{
		if (aGuideDialog)
			aGuideDialog.dispose();
		
		gSelectedMediaID = XWC.CERT_LOCATION_PKCS11 + aSmartCertDataList[aIndex].mProviderIndex + 1;
		gSelectedSmartCert = true;
		onOKButtonClick(null);
		setButtonManager ("enabled");
	}
		
	aGuideModule = __SANDBOX.loadModule("guidewindow");
	aGuideDialog = aGuideModule({
		type: "loading",
		args: "",
		onconfirm: "",
		oncancel: function () {aGuideDialog.dispose();}
	});
	aGuideDialog.show();
	AnySign.mDivInsertOption = pageDivInsertOption;
	
		__SANDBOX.upInterface().getMediaList(XWC.CERT_LOCATION_PKCS11, 0, 1, _getMediaList);
}

function onHSMButtonClick(element) {
	onChangeInfo(element);
	var aGuideModule,
		aGuideDialog,
		aCertList,
		hsmselectDialog;
	
	gSelectedButton = 4;
	gSelectedSmartCert = false;
	refreshTableView("");
	setDragAndDropElement (false);
	
	if (checkAnySignLoad() == false) {
		gEvent = element;
		onCheckMedia();	
		return;
	}
	
	AnySign.mAnySignEnable = true;
	setInputHandler();
	setPasswordInputEnable();
	setDeleteButton(true);
	
	var pageDivInsertOption = AnySign.mDivInsertOption;
	AnySign.mDivInsertOption = 0;
	
		_CB_finalizePKCS11FromName = function ()
	{
		if (!__SANDBOX.isFailed(aCertList))
			refreshTableView(aCertList);
		
		hsmselectDialog.dispose();
		setButtonManager("enabled");
		gNeedPassword = setPasswordInputEnable(false);
		element.focus();
	}
		_CB_getCertTree = function (aResult)
	{
		aCertList = aResult;
		
		__SANDBOX.upInterface().finalizePKCS11FromName (gProviderName, _CB_finalizePKCS11FromName);
	}
		_open_hsmselect = function ()
	{
		AnySign.SetUITarget (__35);
		var hsmselectModule = __SANDBOX.loadModule("hsmselect");
		hsmselectDialog = hsmselectModule({
			onconfirm: function (aResult, aProviderName, aUbikey) {
				if(aResult < 0) {
					setButtonManager("enabled");
					hsmselectDialog.dispose();
					element.focus();
					return;
				}
				
				gProviderName = aProviderName;
				gSelectedMediaID = XWC.CERT_LOCATION_PKCS11 + aResult;
				
				if (!aUbikey) {
					__SANDBOX.upInterface().getCertTree(gSelectedMediaID, 2, gSearchCondition, 5, gCAList, gCertSerial, _CB_getCertTree);
				} else {
					hsmselectDialog.dispose();
					setButtonManager("enabled");
										gSelectedSmartCert = true;
					refreshTableView("");
					onOKButtonClick(null);
				}
			},
			oncancel: function () {
				setButtonManager("enabled");
				hsmselectDialog.dispose();
				element.focus();
			}
		});
		hsmselectDialog.show();
		AnySign.mDivInsertOption = pageDivInsertOption;
	}
		_CB_hsmDriverManager = function (aResult)
	{
		if (aResult != 0)
		{
			var aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
			if(aErrorObject.code == XW_ERROR_PLUGINS_HSM_NOT_FIND_TOKEN)
			{
				if (confirm(XWC.S.savetoken_msg))
					window.open(XWC.S.rootca_url, "_blank");
			}
			else
			{
				alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
			}
		}
	}
		_CB_getMediaList = function (aMediaList)
	{
		if (aGuideDialog)
			aGuideDialog.dispose();
		
		setButtonManager("disabled");
		
		if (aMediaList)
			aMediaList = aMediaList.split("\t\n");
		
		if (aMediaList == "")
		{
			if (confirm(XWC.JSSTR("installNotifyHSM")) == true)
			{
				__SANDBOX.upInterface().hsmDriverManager (_CB_hsmDriverManager);
			}
			
			setButtonManager("enabled");
			element.focus();
			AnySign.mDivInsertOption = pageDivInsertOption;
		}
		else
		{
			_open_hsmselect ();
		}
	}
		
	aGuideModule = __SANDBOX.loadModule("guidewindow");
	aGuideDialog = aGuideModule({
					type: "loading",
					args: "",
					onconfirm: "",
					oncancel: function () {aGuideDialog.dispose();}
	});
	aGuideDialog.show();
	
	__SANDBOX.upInterface().getMediaList(XWC.CERT_LOCATION_PKCS11, 0, 1, _CB_getMediaList);
}

function onSecureDiskButtonClick(element) {
	onChangeInfo(element);
	var aGuideModule,
		aGuideDialog,
		aCertList;
		
	gSelectedButton = 7;
	gSelectedSmartCert = false;
	refreshTableView("");
	setDragAndDropElement (false);
	
	if (checkAnySignLoad() == false) {
		gEvent = element;
		onCheckMedia();	
		return;
	}
	
	var pageDivInsertOption = AnySign.mDivInsertOption;
	AnySign.mDivInsertOption = 0;
	
	AnySign.mAnySignEnable = true;
	setInputHandler();
	setPasswordInputEnable();
	setDeleteButton(true);
	setButtonManager ("disabled");
	
	gSelectedMediaID = XWC.CERT_LOCATION_SECUREDISK + 1;
	
		_finalizeSecureDiskFromName = function ()
	{
		if (aGuideDialog)
			aGuideDialog.dispose();
		
		if (!__SANDBOX.isFailed(aCertList))
			refreshTableView(aCertList);
		
		setButtonManager("enabled");
		element.focus();
	}
	
		_getCertTree = function (aResult)
 	{
		aCertList = aResult;
		
		__SANDBOX.upInterface().finalizeSecureDiskFromName (gProviderName, _finalizeSecureDiskFromName);
 	}
	
		_securedisk_install = function ()
	{
		var aURL = AnySign.mSecureDiskData.mInstallURL;
		var aOption = AnySign.mSecureDiskData.mInstallPageOption;
		
		if (aURL == null || aURL == undefined || aURL == "")
		{
			alert(XWC.JSSTR("securedisk_notable"));
		}
		else
		{
			if (confirm(XWC.JSSTR("securedisk_install")) == true)
				window.open (aURL, 'DownLoadPage', aOption);
		}
	}
	
		_initializeSecureDiskFromName = function (aResult)
	{
		if (aResult == 0) {
			__SANDBOX.upInterface().getCertTree(gSelectedMediaID, 2, gSearchCondition, 5, gCAList, gCertSerial, _getCertTree);
		} else {
						
			if (aGuideDialog)
				aGuideDialog.dispose();
			
			var aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
			if (aErrorObject.code == XW_ERROR_SECUREDISK_LOAD_FAILED) {
				_securedisk_install ();
			} else {
				alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
			}
			
			setButtonManager ("enabled");
			element.focus();
		}
	}
	
		_getMediaList = function (aProviderName)
	{
		if (aProviderName == "")
		{
			if (aGuideDialog)
				aGuideDialog.dispose();
			
			_securedisk_install ();
			
			setButtonManager ("enabled");
			element.focus();
		}
		else
		{
			gProviderName = aProviderName;
			
			__SANDBOX.upInterface().initializeSecureDiskFromName(aProviderName, _initializeSecureDiskFromName);
		}
	}
		
	aGuideModule = __SANDBOX.loadModule("guidewindow");
	aGuideDialog = aGuideModule({
					type: "loading",
					args: "",
					onconfirm: "",
					oncancel: function () {aGuideDialog.dispose();}
	});
	aGuideDialog.show();
	AnySign.mDivInsertOption = pageDivInsertOption;
	
	__SANDBOX.upInterface().getMediaList(XWC.CERT_LOCATION_SECUREDISK, 0, 1, _getMediaList);
}

function onNFCICCardButtonClick(element) {
	onChangeInfo(element);
	gSelectedButton = 8;
	gSelectedSmartCert = false;
	refreshTableView("");
	setDragAndDropElement (false);
	
	AnySign.mAnySignEnable = false;
	setInputHandler("lite");
	setPasswordInputEnable();
	setDeleteButton(false);
	
	}

function onLocalStorageButtonClick(element) {
	onChangeInfo(element);
	gSelectedButton = 9;
	gSelectedSmartCert = false;
	refreshTableView("");
	
	AnySign.mAnySignEnable = false;
	setInputHandler("lite");
	setPasswordInputEnable();
	setDeleteButton(true);
	
	gSelectedMediaID = XWC.CERT_LOCATION_LOCALSTORAGE;
	
	var _cb_getCertTree = function (aCertList) {
		if (__SANDBOX.isFailed(aCertList))
			aCertList = "";

		setDragAndDropElement (true, aCertList);
		refreshTableView(aCertList);
	}
	
	var _cb_getMediaList = function () {
		__SANDBOX.upInterface().getCertTree(XWC.CERT_LOCATION_LOCALSTORAGE, 2, gSearchCondition, 5, gCAList, gCertSerial, _cb_getCertTree);
	}
	
	__SANDBOX.upInterface().getMediaList(XWC.CERT_LOCATION_LOCALSTORAGE, 0, 1, _cb_getMediaList);
}

function onMemoryStorageButtonClick(element) {
	onChangeInfo(element);
	gSelectedButton = 10;
	gSelectedSmartCert = false;
	refreshTableView("");
	
	AnySign.mAnySignEnable = false;
	setInputHandler("lite");
	setPasswordInputEnable();
	setDeleteButton(true);
	
	var pageDivInsertOption = AnySign.mDivInsertOption;
	AnySign.mDivInsertOption = 0;
	
	gSelectedMediaID = XWC.CERT_LOCATION_MEMORYSTORAGE;
	setDragAndDropElement (false);
	
	var aIsSavePFX = false;
	var IsSavePFX= function () {
		aIsSavePFX = !aIsSavePFX;	
	}

	var openPasswdDialog = function (pfx, signCert, signKey, kmCert, kmKey) {
		var aPfx = pfx;
		var aSignCert = signCert;
		var aSignKey = signKey;
		var aKmCert = kmCert;
		var aKmKey = kmKey;
		
		var inputpassModule = __SANDBOX.loadModule("inputpasswd");
		var inputpassDialog = inputpassModule({
			args: {messageType: "certificate",
				   descType: "pfx",
				   inputType: "lite",
				   isSave: false,
				   func: IsSavePFX},
			onconfirm: function (aResult) {
				inputpassDialog.dispose();
				element.focus();
				
				var _cb_setCertificate = function (aPWCheck) {
					if (aPWCheck == 0 || aPWCheck == 1) { 						_callback = function ()
						{
							if(gInputHandler) gInputHandler.clear();
							setOKButtonDisabled(false);
						}
						
						gDialogObj.onconfirm({
							mediaID: XWC.CERT_LOCATION_MEMORYSTORAGE,
							passwd: aResult,
							passwdResult: 0,
							pfxPath: "",
							withPFX: true,
							callback: _callback
						});
					} else {
						var aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
						if (aErrorObject.code == XW_ERROR_VERIFYPASSWORD) {
							alert(XWC.S.keyworderror);
						} else {
							alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
						}
					}
				}
				
				__SANDBOX.upInterface().setCertificate (aPfx, aSignCert, aSignKey, aKmCert, aKmKey, aResult, aIsSavePFX, gSearchCondition, gCAList, gCertSerial, _cb_setCertificate);
			},
			oncancel: function () {
				inputpassDialog.dispose();
				element.focus();
			}
		});
		inputpassDialog.show();
		AnySign.mDivInsertOption = pageDivInsertOption;
	}
	
	var _pfxdialogOpen = function () {
		var pfxModule = __SANDBOX.loadModule("pfxdialog");
		var pfxDialog = pfxModule({
			onconfirm: function (aPFX, aSignCert, aSignKey, aKmCert, aKmKey) {
				pfxDialog.dispose();
				openPasswdDialog(aPFX, aSignCert, aSignKey, aKmCert, aKmKey);
			},
			oncancel: function () {
				pfxDialog.dispose();
				element.focus();
				AnySign.mDivInsertOption = pageDivInsertOption;
			}
		});
		pfxDialog.show();
	}
	
	_pfxdialogOpen();
}

function onXecureFreeSignButtonClick(element) {
	onChangeInfo(element);
	gSelectedButton = 11;
	gSelectedSmartCert = false;
	refreshTableView("");
	
	AnySign.mAnySignEnable = false;
	setInputHandler("xfs");
	setPasswordInputEnable();
	setDeleteButton(true);
	
	gSelectedMediaID = XWC.CERT_LOCATION_XECUREFREESIGN;
	setDragAndDropElement (false);
	
	var _cb_getCertTree2 = function (aResult) {
		if (aResult == "") {
			var aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
			if (aErrorObject.code == 0)
				alert(XWC.S.xfs_no_cert)
			else
				alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
			
						
								} else {
			refreshTableView(aResult);
		}
	}
	
	var _openXFSLogin = function () {
		var pageDivInsertOption = AnySign.mDivInsertOption;
		AnySign.mDivInsertOption = 0;
		
		var xfsModule = __SANDBOX.loadModule("xfslogin");
		var xfsDialog = xfsModule({
			args:"",
			onconfirm: function (aResult) {
				xfsDialog.dispose();
				if(aResult == 0) {
					__SANDBOX.upInterface().getCertTree(XWC.CERT_LOCATION_XECUREFREESIGN, 2, gSearchCondition, 5, gCAList, gCertSerial, _cb_getCertTree2);
				} else {
									}
			},
			oncancel: function () {
				xfsDialog.dispose();
			}
		});
		xfsDialog.show();
		AnySign.mDivInsertOption = pageDivInsertOption;
	}
	
	var _cb_getCertTree = function (aResult) {
		if (aResult == "") {
						
								} else {
			refreshTableView(aResult);
		}
	}
	
	var _cb_getMediaList = function (aResult) {
		if (aResult == 0) {					__SANDBOX.upInterface().getCertTree(XWC.CERT_LOCATION_XECUREFREESIGN, 2, gSearchCondition, 5, gCAList, gCertSerial, _cb_getCertTree);
		} else {
			var aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
			if (aErrorObject.code == XW_ERROR_NOT_LOGIN)
				_openXFSLogin();				else
				alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));			}
	}
	
		__SANDBOX.upInterface().getMediaList(XWC.CERT_LOCATION_XECUREFREESIGN, 0, 1, _cb_getMediaList);
}

function onWebPageButtonClick(element) {
	onChangeInfo(element);
	gSelectedButton = 15;
	gSelectedSmartCert = false;
	refreshTableView("");
	setDragAndDropElement (false);
	
	AnySign.mAnySignEnable = false;
	setInputHandler("e2e");
	setPasswordInputEnable();
	setDeleteButton(false);
	
	gSelectedMediaID = XWC.CERT_LOCATION_WEBPAGE;
	
	var _cb_getCertTree = function (aResult) {
		refreshTableView(aResult);
	}
		
	__SANDBOX.upInterface().getCertTree(XWC.CERT_LOCATION_WEBPAGE, 2, gSearchCondition, 5, gCAList, gCertSerial, _cb_getCertTree);
}

function onMobileButtonClick(element) {
	onChangeInfo(element);
	var aMobiList,
		aInfoList,
		aMenuItems;
	
	gSelectedButton = 5;
	gSelectedSmartCert = false;
	refreshTableView("");
	setDragAndDropElement (false);
	
	if (checkAnySignLoad() == false) {
		gEvent = element;
		onCheckMedia();	
		return;
	}
	
	AnySign.mAnySignEnable = true;
	setInputHandler();
	setPasswordInputEnable();
	setDeleteButton(false);
	
	aMobiList = XWC.S.mobile_mobi;
	aInfoList = XWC.S.mobile_info;

	aMenuItems = [];

	if (AnySign.mPlatform.aName.indexOf("mac universal") != 0)
	{
		if (__SANDBOX.certLocationSet["mphone"])
			aMenuItems.push({ item: aInfoList, data: XWC.CERT_LOCATION_YESSIGNM + 1 });
	}
	if (AnySign.mPlatform.aName.indexOf("windows") == 0)
	{
		if (__SANDBOX.certLocationSet["mobisign"])
			aMenuItems.push({ item: aMobiList, data: XWC.CERT_LOCATION_MPHONE + 1 });
	}
	
	function aContextMenuFunc(aMenuData) {
		var aUbikeyData,
			aMobiSignData,
			aPhoneData,
			aGuideModule,
			aGuideDialog;
		
		var pageDivInsertOption = AnySign.mDivInsertOption;
		AnySign.mDivInsertOption = 0;
		
		setButtonManager ("disabled");
		
		gSelectedMediaID = aMenuData;
		gSelectedRowIndex = null;
		
				_CB_getCertTree = function (aResult)
		{
			if (aGuideDialog)
				aGuideDialog.dispose();
			
			setButtonManager ("enabled");
			
			if (__SANDBOX.isFailed(aResult)) {
				aResult = "";
			}

						if (gSelectedMediaID == XWC.CERT_LOCATION_YESSIGNM + 1) {
				var aList = XWC.stringToArray(aResult);
				if (aList != "") {
					if (aList[0][0] == '2') {
						alert(XWC.JSSTR("mobileError"));
						onCancelButtonClick();
						return;
					}
				}
				setPasswordInputEnable();
			}
			else if (gSelectedMediaID == XWC.CERT_LOCATION_MPHONE + 1) {
				gNeedPassword = setPasswordInputEnable(false);
				
				onOKButtonClick(null);
			}
			
			refreshTableView(aResult);
			element.focus();
		}
				_CB_getMediaList = function (aResult)
		{
			if ((typeof (aResult) == "string" && aResult == ""))
			{
				var aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();

				if (aErrorObject.code == XW_ERROR_PLUGINS_FAILED_TO_LOAD_DLL)
				{
					if (aGuideDialog)
						aGuideDialog.dispose();
					
					aResult = confirm(XWC.JSSTR("installNotify"));
					
					var aURL, aOpenOption;
					if (gSelectedMediaID == XWC.CERT_LOCATION_YESSIGNM + 1) {
						aURL = AnySign.mUbikeyData.mInstallURL;
						aOpenOption = AnySign.mUbikeyData.mInstallPageOption;
					} else {
						aURL = AnySign.mMobiSignData.mInstallURL;
						aOpenOption = AnySign.mMobiSignData.mInstallPageOption;
					}
					
					if (aResult == true) {
						window.open(aURL, 'DownLoadPage', aOpenOption);
					}
					
					setButtonManager ("enabled");
					element.focus();
					return;
				}
			}
			
			__SANDBOX.upInterface().getCertTree(gSelectedMediaID, 2, gSearchCondition, 5, gCAList, gCertSerial, _CB_getCertTree);
		}
				_CB_setPhoneData = function ()
		{
			var aMediaType = Math.floor(parseInt(gSelectedMediaID, 10) / 100) * 100;
			
			__SANDBOX.upInterface().getMediaList(aMediaType, 0, 1, _CB_getMediaList);
		}
		
		aGuideModule = __SANDBOX.loadModule("guidewindow");
		aGuideDialog = aGuideModule({
						type: "loading",
						args: "",
						onconfirm: "",
						oncancel: function () {aGuideDialog.dispose();}
		});
		aGuideDialog.show();
		AnySign.mDivInsertOption = pageDivInsertOption;

		switch (gSelectedMediaID) { 		case XWC.CERT_LOCATION_YESSIGNM + 1: 			aUbikeyData = AnySign.mUbikeyData;

			aPhoneData = AnySign.mXgateAddress + "&"
								+ aUbikeyData.mSite + "|" + aUbikeyData.mLiveUpdate + "&"
								+ aUbikeyData.mSecurity + "|" + aUbikeyData.mKeyboardSecurity + "&"
								+ aUbikeyData.mVersion;
			
			__SANDBOX.upInterface().setPhoneData (aPhoneData, 0x10, _CB_setPhoneData);
			break;
		case XWC.CERT_LOCATION_MPHONE + 1: 			aMobiSignData = AnySign.mMobiSignData;
			aPhoneData = aMobiSignData.mSite + "&" + aMobiSignData.mVersion;

			__SANDBOX.upInterface().setPhoneData (aPhoneData, 0x20, _CB_setPhoneData);
			break;
		default:
		}
	}
		
	XWC.UI.ContextMenu(element, XWC.S.media_mobile, aMenuItems, aContextMenuFunc);
}

function onFindCertButtonClick(e) {
	e = e || window.event;

	var inputpassModule,
		inputpassDialog,
		target,
		aKeyword,
		aPFXFilePath;
	
	gSelectedButton = 12;
	gSelectedSmartCert = false;
	
	if (checkAnySignLoad() == false) {
		gEvent = e;
		onCheckMedia();	
		return;
	}
	
	var aAnySignEnable = AnySign.mAnySignEnable;
	AnySign.mAnySignEnable = true;
	
	var pageDivInsertOption = AnySign.mDivInsertOption;
	AnySign.mDivInsertOption = 0;
	
	target = e.target || e.srcElement;

		_openFileDialog = function () {
		AnySign.SetUITarget (target);
		var fileModule = __SANDBOX.loadModule("fileselect");
		var fileDialog = fileModule({
			args: {	searchType:	"",
					extType: 0,
					isPFXFile: true,
					isSaveMode: false,
					defaultName: ""
			},
			onconfirm: function (aResult) {
				fileDialog.dispose();
				
				if (aResult == "") 				{
					AnySign.mDivInsertOption = pageDivInsertOption;
					AnySign.mAnySignEnable = aAnySignEnable;
					return;
				}
				
				aPFXFilePath = aResult;
				_openInputpasswd();
			},
			oncancel: function (e) { 
				target.focus();
				fileDialog.dispose();
				AnySign.mDivInsertOption = pageDivInsertOption;
				AnySign.mAnySignEnable = aAnySignEnable;
			}
		});
		fileDialog.show();
	};
	
		_checkPFXPwdCallback = function (aResult)
	{
		if (aResult != 0)
		{
			var aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
			
			if (aResult == -3) {
				alert(XWC.S.keyworderror);
			} else if (aResult == -4) {
				alert(XWC.S.notableCert);
			} else {
				alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
			}
			
			inputpassDialog.dispose();
			AnySign.mAnySignEnable = aAnySignEnable;
			target.focus();
			return;
		}
		else
		{
			alert(XWC.S.sign_complete_msg + "\n" + XWC.S.go_next_step_msg);
			__100.style.display = 'none';
			
			__114.style.display = 'none';
			__115.style.display = 'none';
			__116.style.display = 'inline';
			__116.setAttribute("tabindex", 0, 0);
		}
		
		_callback = function ()
		{
			if(gInputHandler) gInputHandler.clear();
			AnySign.mAnySignEnable = aAnySignEnable;
		}
		
		gDialogObj.onconfirm({
			withPFX: true,
			pfxPath: aPFXFilePath,
			passwd: aKeyword,
			callback: _callback
		});
		
		inputpassDialog.dispose();
	}
	
		_openInputpasswd = function () {
		AnySign.SetUITarget (target);
		inputpassModule = __SANDBOX.loadModule("inputpasswd");
		inputpassDialog = inputpassModule({
			args: { messageType: "certificate",
					inputType: "4pc",
					errCallback: gErrCallback },
			onconfirm: function (aResult) {
				aKeyword = aResult;
				__SANDBOX.upInterface().checkPFXPwdWithFilter(aPFXFilePath, aKeyword, gSearchCondition, gCAList, gCertSerial, _checkPFXPwdCallback);
			},
			oncancel: function (e) {
				target.focus();
				inputpassDialog.dispose();
				AnySign.mAnySignEnable = aAnySignEnable;
			}
		});
		inputpassDialog.show();
		AnySign.mDivInsertOption = pageDivInsertOption;
	};
	
	_openFileDialog();
}

function onViewVerifyButtonClick(e) {
	var aCertInfo,
		target;
	
	e = e || window.event;
	target = e.target || e.srcElement;
	
	target.disabled = true;

	if (target == 'undefined') target = __57;
	
	if (!gSelectedIssuerRDN && !gSelectedCertSerial)
	{
		target.disabled = false;
		alert(XWC.S.noselection);
		return;
	}
	
	var pageDivInsertOption = AnySign.mDivInsertOption;
	AnySign.mDivInsertOption = 0;

	_open_viewverify = function (aResult)
	{
		var aCertClass,
			aCertVerifyMsg,
			div_target;
		
		aCertClass = gSelectedCertClass; 
		aCertVerifyMsg = __SANDBOX.upInterface().setErrCodeAndMsg().msg;
		
		AnySign.SetUITarget(__57);
		var viewverifyModule = __SANDBOX.loadModule("viewverify");
		var viewverifydialog = viewverifyModule({
			onconfirm: function () { 
				target.disabled = false;
				target.focus();
				viewverifydialog.dispose(); 
				AnySign.mDivInsertOption = pageDivInsertOption;
			},
			oncancel: function () { 
				target.disabled = false;
				target.focus();
				viewverifydialog.dispose();
				AnySign.mDivInsertOption = pageDivInsertOption;
			},
			args: [ aResult, aCertInfo.split("$"), aCertClass, aCertVerifyMsg ]
		});
		viewverifydialog.show();
	}

	_CB_getCertTree = function (aResult)
	{
		if (__SANDBOX.isFailed(aResult, gErrCallback)) {
			AnySign.mDivInsertOption = pageDivInsertOption;
			onCancelButtonClick();
			return;
		}
		
		aCertInfo = aResult;
		
		if (gSelectedMediaID == XWC.CERT_LOCATION_XECUREFREESIGN || gSelectedMediaID == XWC.CERT_LOCATION_WEBPAGE) {
			_open_viewverify (gCertList[gSelectedRowIndex][0]);
		} else {
			__SANDBOX.upInterface().verifyCert(gSelectedMediaID, 2, gSelectedIssuerRDN, gSelectedCertSerial, 0, _open_viewverify);
		}
	}
	
	__SANDBOX.upInterface().getCertTree(gSelectedMediaID, 2, 24, 0, gSelectedIssuerRDN, gSelectedCertSerial, _CB_getCertTree);
}

function onDeleteCertButtonClick(e) {
	var aTarget,
		aGuideModule,
		aGuideDialog;
	
	e = e || window.event;
	aTarget = e.target || e.srcElement;
	
	if (aTarget == 'undefined') aTarget = __57;
	
	if (!gSelectedIssuerRDN && !gSelectedCertSerial) {
		alert(XWC.S.noselection);
		aTarget.focus();
		return;
	}
	
	var pageDivInsertOption = AnySign.mDivInsertOption;
	
	var aMediaType = Math.floor(parseInt(gSelectedMediaID, 10) / 100) * 100;
	
		_show_guidewindow = function ()
	{
		aGuideModule = __SANDBOX.loadModule("guidewindow");
		aGuideDialog = aGuideModule({
			type: "loading",
			args: "",
			onconfirm: "",
			oncancel: function () {aGuideDialog.dispose();}
		});
		aGuideDialog.show();
	}
		_fn_final = function (aCallback)
	{
		var _final_callback = function () {
			if (aGuideDialog) {
				aGuideDialog.dispose ();
				aGuideDialog = null;
			}
			
			if (aCallback)
				aCallback ();
		}
		
		if (aMediaType == XWC.CERT_LOCATION_PKCS11) {
			__SANDBOX.upInterface().finalizePKCS11FromName (gProviderName, _final_callback);
		}
		else if (aMediaType == XWC.CERT_LOCATION_ICCARD || aMediaType == XWC.CERT_LOCATION_KEPCOICCARD) {
			__SANDBOX.upInterface().logoutStoreToken(gSelectedMediaID, _final_callback);
		}
		else if (aMediaType == XWC.CERT_LOCATION_SECUREDISK) {
			__SANDBOX.upInterface().finalizeSecureDiskFromName (gProviderName, _final_callback);
		} else {
			_final_callback();
		}
	}
		_CB_getCertTree = function (aResult)
	{
		if (__SANDBOX.isFailed(aResult)) {
			aResult = "";
		}
		
		refreshTableView(aResult);
		if (gSelectedMediaID == XWC.CERT_LOCATION_LOCALSTORAGE)
			setDragAndDropElement (true, aResult);
		_fn_final ();
		aTarget.focus();
	}
		_CB_getMediaList = function ()
	{
		__SANDBOX.upInterface().getCertTree(gSelectedMediaID, 2, gSearchCondition, 5, gCAList, gCertSerial, _CB_getCertTree);
	}
		_CB_deleteCertificate = function (aResult)
	{
		if (__SANDBOX.isFailed(aResult, gErrCallback)) {
			alert(XWC.S.deletefail);
		}
		
		__SANDBOX.upInterface().getMediaList(aMediaType , 0, 1, _CB_getMediaList);
	}
		_deleteCertificate = function ()
	{
		__SANDBOX.upInterface().deleteCertificate(gSelectedMediaID, 2, gSelectedIssuerRDN, gSelectedCertSerial, _CB_deleteCertificate);
	}
		
	function _verifyhsm_result()
	{
		_CB_loginPKCS11FromIndex = function (aResult)
		{
			if (aResult != 0) {
				var aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
				var _fn_final_callback = function () {
					alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
					aTarget.focus();
				}
				_fn_final (_fn_final_callback);
			}
			else
			{
				_deleteCertificate ();
			}
		}
		
		AnySign.mDivInsertOption = 0;
		AnySign.SetUITarget (aTarget);
		
		var verifyhsmModule = __SANDBOX.loadModule("verifyhsm");
		var verifyhsmDialog = verifyhsmModule({
			args: {},
			onconfirm: function (pin) {
				verifyhsmDialog.dispose();
				_show_guidewindow ();
				AnySign.mDivInsertOption = pageDivInsertOption;
				
				__SANDBOX.upInterface().loginPKCS11FromIndex(gSelectedMediaID, pin, _CB_loginPKCS11FromIndex);
			},
			oncancel: function () {
				verifyhsmDialog.dispose(); 
				AnySign.mDivInsertOption = pageDivInsertOption;
				aTarget.focus();
			}
		});
		verifyhsmDialog.show();
	}
	
	function _iccard_result()
	{
		_CB_loginStoreToken = function (aResult)
		{
			if(aResult != 0) {
				var aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
				var _fn_final_callback = function () {
					alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
					aTarget.focus();
				}
				_fn_final (_fn_final_callback);
			}
			else
			{
				_deleteCertificate ();
			}
		}
		
		AnySign.mDivInsertOption = 0;
		AnySign.SetUITarget (aTarget);
		
		var aICCardType;
		if (aMediaType == XWC.CERT_LOCATION_KEPCOICCARD)
			aICCardType = "kepco";
		else
			aICCardType = "iccard";
		
		var iccardModule = __SANDBOX.loadModule("iccard");
		var iccardDialog = iccardModule({
			type: aICCardType,
			args: {},
			onconfirm: function (aPin) {
				iccardDialog.dispose();
				_show_guidewindow ();
				AnySign.mDivInsertOption = pageDivInsertOption;
				
				__SANDBOX.upInterface().loginStoreToken(gSelectedMediaID, aPin, 0, _CB_loginStoreToken);
			},
			oncancel: function () {
				iccardDialog.dispose();
				AnySign.mDivInsertOption = pageDivInsertOption;
				aTarget.focus();
			}
		});
		iccardDialog.show();
	}
	
	function _securedisk_result()
	{
		_CB_initializeSecureDiskFromName = function (aResult)
		{
			if (aResult != 0) {
				var _fn_final_callback = function () {
					alert(XWC.JSSTR("securedisk_error"));
					aTarget.focus();
				}
				_fn_final (_fn_final_callback);
			}
			else
			{
				_deleteCertificate ();
			}
		}
		
		AnySign.mDivInsertOption = 0;
		_show_guidewindow ();
		AnySign.mDivInsertOption = pageDivInsertOption;
		
		__SANDBOX.upInterface().initializeSecureDiskFromName(gProviderName, _CB_initializeSecureDiskFromName);
	}
	
	if (confirm(XWC.S.deleteconfirm)) {
		if (aMediaType == XWC.CERT_LOCATION_PKCS11) {
			_verifyhsm_result();
		}
		else if (aMediaType == XWC.CERT_LOCATION_ICCARD || aMediaType == XWC.CERT_LOCATION_KEPCOICCARD) {
			_iccard_result();
		}
		else if (aMediaType == XWC.CERT_LOCATION_SECUREDISK) {
			_securedisk_result();
		} else {
			aGuideDialog = null;
			_deleteCertificate();
		}
	}
}

function refreshTableView(aCertList) {
	var aList;

	__77.style.display = "none";

	gSelectedSubjectRDN = null;
	gSelectedIssuerRDN = null;
	gSelectedCertSerial = null;
	gSelectedCertClass = null;
	gSelectedRowIndex = null;

	aList = stringToCertList(aCertList);

	if (gFilter) {
		gFilter(aList);
	}

	gCertTableView.refresh(aList);
	
		try {
		if(gInputHandler) gInputHandler.clear();
	} catch (e) {
				console.log("try catch - gInputHandler.clear");
	}
	
		setTimeout (function () {
		try {
			if(gInputHandler) gInputHandler.refresh();
		} catch (e) {
						console.log("try catch - gInputHandler.refresh");
		}
	}, 0);
}

function stringToCertList(aString) {
	var aResultList = [],
		aList,
		i,
		j = 0;

	if (aString) {
		aList = XWC.stringToArray(aString);

		for (i = 0; i < aList.length; i++) {
			if (aList[i][1].length == 0) {
				aList[i][1] = XWC.S.privatecert;
			}
			if (aList[i][0] == '2' && !AnySign.mShowExpiredCert) {
				continue;
			}else {
				aResultList[j++] = aList[i];
			}
		}
	}

	return aResultList;
}

function setPasswordInputDisable() {	
	gNeedPassword = false;
	
	__98.style.display = 'none';
	__103.style.display = 'none';
	__106.style.display = 'none';
	__109.style.display = 'none';
	
	__114.style.display = 'none';
	__115.style.display = '';
}

function setPasswordInputEnable(aEnable) {
	var aKeywordInputEnable;
	
	if (gDialogObj.type == "envelope")
		return false;
	
	if (aEnable == undefined) {
		gNeedPassword = true;
		aKeywordInputEnable = !gDisablePasswordInput;
	} else {
		aKeywordInputEnable = aEnable;
	}
	
	if (gInputHandler) {
		gInputHandler.enable(aKeywordInputEnable);
		gInputHandler.clear();
	}
	
	if(!aKeywordInputEnable) {
		__98.style.display = 'none';
		__103.style.display = 'none';
		__106.style.display = 'none';
		__109.style.display = 'none';
		
		__114.style.display = 'none';
		__115.style.display = '';
	} else {
				__114.style.display = '';
		__115.style.display = 'none';
	}
	
	return aKeywordInputEnable;
}

function rotationFocus(e) {
	e = e || window.event;
	var aKeyCode = e.which || e.keyCode;

	if (aKeyCode == 9 || aKeyCode == 40) 	{
		__26.focus();
	} else {
		return false;
	}

	XWC.Event.stopPropagation(e);
	XWC.Event.preventDefault(e);
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

function checkCaps(e, txtPwd) {
	if (!__SANDBOX.isIE()) {
		if(e.getModifierState("CapsLock")) {
			__85.style.top = (txtPwd.offsetTop + 40) + "px";
			__85.style.left = (txtPwd.offsetLeft - 20) + "px";
			__85.style.zIndex = XWC.UI.offset() + 3;
			__85.style.display = 'block';
		} else {
			__85.style.display = 'none';
		}
	}
}

function setTranskeyXYPosition(aElement) {
	var aElementPosition = aElement.getBoundingClientRect();
	var aInputTransKeyXY = parseInt(aElementPosition.left) + " " + (parseInt(aElementPosition.top) + parseInt(aElement.offsetHeight) + parseInt(window.pageYOffset));
	aElement.setAttribute ("data-tk-kbdxy", aInputTransKeyXY);
}

function setButtonManager (type)
{
	var index,
		element;
	
	switch (type)
	{
		case "disabled":
			for (index = 0; index < gButtonList.length; index++)
			{
				element = document.getElementById(gButtonList[index]);
				gCurrentStateList[index] = element.disabled;
				if (index < gMaxButton && index != gSelectedButton-1)
					gMediaRadio.setDisabled (element, true);
				else
					element.disabled = true;
			}
			break;
		case "enabled":
			for (index = 0; index < gCurrentStateList.length; index++)
			{
				element = document.getElementById(gButtonList[index]);
				if (index < gMaxButton && index != gSelectedButton-1)
					gMediaRadio.setDisabled (element, gCurrentStateList[index]);
				else
					element.disabled = gCurrentStateList[index];
			}
			gCurrentStateList = [];
			break;
		default:
	}
}

function setDeleteButton (enable)
{
	if (enable == true)
		__SANDBOX.setButton([__120], "disabled", false, null);
	else
		__SANDBOX.setButton([__120], "disabled", true, null);
}

function onInputMouseCheckBoxClick (aEvent)
{
	var aChecked = false;
	var aTransKey = false;

	aEvent = aEvent || window.event;

	var objMouseBtn = __102;
	var bgImgUrl = objMouseBtn.style.backgroundImage;

	if (bgImgUrl.indexOf("off.png") > 0)
	{
		objMouseBtn.style.backgroundImage = bgImgUrl.replace("off.png", "on.png");
		aChecked = true;
	}
	else
	{
		objMouseBtn.style.backgroundImage = bgImgUrl.replace("on.png", "off.png");
		aChecked = false;
	}

	aTransKey = certselectwide_tk1;

	if (aChecked)
	{
		aTransKey.useTransKey = true;
		__100.readOnly = true;
		showTransKeyBtn ("certselectwide_tk1");
		aTransKey.clear ();
	}
	else
	{
		aTransKey.useTransKey = false;
		__100.readOnly = false;
		aTransKey.clear ();
		aTransKey.close ();
	}

	if (!certselectwide_tk1.useTransKey && aChecked == null)
	{
		aTransKey.useTransKey = true;
		__100.readOnly = true;
		showTransKeyBtn ("certselectwide_tk1");
		aTransKey.clear ();
	}
}

function checkAnySignLoad() {
	if (!AnySign.mAnySignLoad)
		return false;
	
	if (AnySign.mExtensionSetting.mExternalCallback.func &&
		AnySign.mExtensionSetting.mExternalCallback.result != 0)
		return false;
		
	return true;
}

function onCheckMedia(e) {
		if (gSelectedButton != 12)
		setInputHandler("4pc", false);
	
	var _refreshMedia = function () {
		if (gSelectedButton == 1) {
			onHddButtonClick(gEvent);
		} else if (gSelectedButton == 2) {
			onRemovableButtonClick(gEvent);
		} else if (gSelectedButton == 3) {
			onSaveTokenButtonClick(gEvent);
		} else if (gSelectedButton == 4) {
			onHSMButtonClick(gEvent);
		} else if (gSelectedButton == 5) {
			onMobileButtonClick(gEvent);
		} else if (gSelectedButton == 6) {
			onSmartCertButtonClick(gEvent);
		} else if (gSelectedButton == 7) {
			onSecureDiskButtonClick(gEvent);
		} else if (gSelectedButton == 12) {
			onFindCertButtonClick(gEvent);
		}
	}
	
	var _CB_external = function (aResult) {
		if (aResult == undefined || aResult == 0) {
			AnySign.mExtensionSetting.mExternalCallback.result = 0;
			
			if (gDialogObj.type != "envelope")
				createInputHandler_4pc();
			
			__SANDBOX.setConvertTable(_refreshMedia);
		} else {
					}
	}
	
	var _Func_external = function (aResult) {
		if (AnySign.mExtensionSetting.mExternalCallback.func &&
			AnySign.mExtensionSetting.mExternalCallback.result != 0)
			AnySign.mExtensionSetting.mExternalCallback.func(_CB_external);
		else
			_CB_external(0);
	}

			
	if (!AnySign.mAnySignLoad) {
		AnySign.mAnySignEnable = true;
		AnySign.mExtensionSetting.mImgIntervalError = false;
		AnySign.mExtensionSetting.mInstallCheck_Level = 1;
		AnySign.mExtensionSetting.mLoadCallback.func = _Func_external;
		AnySign.mExtensionSetting.mLoadCallback.param = "";
		
		AnySign.StartAnySign();
	} else {
		_Func_external();
	}
}

function setInputHandler(aInputType, aEnable)
{
	var aElement;
	
	if (gDialogObj.type == "envelope")
		return;
	
	if (aInputType == "lite") {
		__98.style.display = 'none';
		__103.style.display = 'inline';
		__106.style.display = 'none';
		__109.style.display = 'none';
		aElement = __105;
		gInputHandler = gInputHandler_lite;
	} else if (aInputType == "xfs") {
		__98.style.display = 'none';
		__103.style.display = 'none';
		__106.style.display = 'inline';
		__109.style.display = 'none';
		aElement = __108;
		gInputHandler = gInputHandler_xfs;
	} else if (aInputType == "e2e") {
		__98.style.display = 'none';
		__103.style.display = 'none';
		__106.style.display = 'none';
		__109.style.display = 'inline';
		aElement = __111;
		gInputHandler = gInputHandler_e2e;
	} else  {
		__98.style.display = 'inline';
		__103.style.display = 'none';
		__106.style.display = 'none';
		__109.style.display = 'none';
		aElement = __100;
		gInputHandler = gInputHandler_4pc;
	}

	if(document.getElementById("TouchEnKey")) {
		if(!__SANDBOX.isIE())
			setCapsLockToolTip(__100, __85, 100, 10);
	} else {
		aElement.onkeyup = function(e) {
			checkCaps(e, aElement);
			setTranskeyXYPosition(aElement);
		}
		aElement.onclick = function(e) {
			checkCaps(e, aElement);
			setTranskeyXYPosition(aElement);
		}
		aElement.onblur = function() { __85.style.display = 'none'; }
	}
	
	if (aEnable != undefined) {
		if (aEnable) {
			aElement.style.backgroundColor = '#FFFFFF';
			aElement.disabled = false;
		} else {
			aElement.style.backgroundColor = '#EEEEEE';
			aElement.disabled = true;
		}
	}
}

function createInputHandler_4pc()
{
	gInputHandler_4pc = new __SANDBOX.inputKeyHandler("certselectwide", __100, 1, 78, 18, "qwerty_crt", 30, 230);

	gInputHandler_4pc.onComplete({
		ok : function () {},
		close : function () {}
	});
	
	gInputHandler = gInputHandler_4pc;
	
	if (setPasswordInputEnable()) {
		gInputHandler_4pc.onEnterKeyPress(__122);
	}
}

function createInputHandler_lite()
{
	gInputHandler_lite = new __SANDBOX.inputKeyHandler("certselectwide", __105, 1, 78, 18, "qwerty_crt", 30, 230, "lite");

	gInputHandler_lite.onComplete({
		ok : function () {},
		close : function () {}
	});
	
	gInputHandler = gInputHandler_lite;
	
	if (setPasswordInputEnable()) {
		gInputHandler_lite.onEnterKeyPress(__122);
	}
}

function createInputHandler_xfs()
{
	var aInputType = "e2e";
		
	gInputHandler_xfs = new __SANDBOX.inputKeyHandler("certselectwide", __108, 1, 78, 18, "qwerty_crt", 30, 230, aInputType);

	gInputHandler_xfs.onComplete({
		ok : function () {},
		close : function () {}
	});
	
	gInputHandler = gInputHandler_xfs;
	
	if (setPasswordInputEnable()) {
		gInputHandler_xfs.onEnterKeyPress(__122);
	}
}

function createInputHandler_e2e()
{
	gInputHandler_e2e = new __SANDBOX.inputKeyHandler("certselectwide", __111, 1, 78, 18, "qwerty_crt", 30, 230, "e2e");

	gInputHandler_e2e.onComplete({
		ok : function () {},
		close : function () {}
	});
	
	gInputHandler = gInputHandler_e2e;
	
	if (setPasswordInputEnable()) {
		gInputHandler_e2e.onEnterKeyPress(__122);
	}
}

function setDragAndDropElement (aDisplay, aCertList) {
	var aGuideZone = document.getElementById("xwup_drag_guide");
	if (aGuideZone == null) return;

	if (!aDisplay) {
		aGuideZone.style.display = "none";
		return;
	}

	var aList = XWC.stringToArray(aCertList);
	var aResultList = [];
		for (var i = 0; i < aList.length; i++) 
	{
		if (aList[i][0] == '2' && !AnySign.mShowExpiredCert) 
		{
			continue;
		}
		else
		{
			aResultList.push(aList);
		}		
	}

	aGuideZone.style.display = "block";
	if (aResultList.length == 0) {
		aGuideZone.style.zIndex = 0;
		aGuideZone.classList.remove ('xwup-drag-guide-certselectwide2');
		aGuideZone.childNodes[0].style.visibility = "visible";
		aGuideZone.childNodes[1].style.visibility = "visible";
	} else {
		aGuideZone.style.zIndex = -200;
		aGuideZone.classList.add ('xwup-drag-guide-certselectwide2');
		aGuideZone.childNodes[0].style.visibility = "hidden";
		aGuideZone.childNodes[1].style.visibility = "hidden";
	}
}

function onChangeInfo(element) {
	var tabInfo = document.getElementById("xwup_tab_info");

        tabInfo.style.visibility = "hidden";
	tabInfo.innerText = element.innerText;
}

var __1 = XWC.UI.createElement('DIV');
__1.setAttribute('role', 'dialog', 0);
__1.style.width = '946px';
__1.style.position = 'relative';
var __2 = XWC.UI.createElement('DIV');
__2.setAttribute('tabindex', '0', 0);
__2.setAttribute('title', XWC.S.title, 0);
__2.setAttribute('id', 'xwup_title', 0);
__2.className = 'xwup-title-wide';
var __3 = XWC.UI.createElement('H3');
__3.appendChild(document.createTextNode(XWC.S.title));
__2.appendChild(__3);
var __4 = XWC.UI.createElement('TEXTAREA');
__4.setAttribute('tabindex', '0', 0);
__4.setAttribute('title', XWC.S.xvvcursor_guide, 0);
__4.setAttribute('id', 'xwup_xvvcursor_disabled', 0);
__4.className = 'blank0';
__4.setAttribute('disabled', 'disabled', 0);
__2.appendChild(__4);
var __5 = XWC.UI.createElement('H3');
__5.setAttribute('id', 'xwup_tab_info', 0);
__2.appendChild(__5);
__1.appendChild(__2);
var __6 = XWC.UI.createElement('TABLE');
__6.setAttribute('cellpadding', '0', 0);
__6.setAttribute('cellspacing', '0', 0);
__6.className = 'xwup-location-wideitem';
__6.setAttribute('title', XWC.S.media_location, 0);
var __7 = XWC.UI.createElement('CAPTION');
__7.appendChild(document.createTextNode(XWC.S.media_location));
__6.appendChild(__7);
var __8 = XWC.UI.createElement('TBODY');
var __9 = XWC.UI.createElement('TR');
var __10 = XWC.UI.createElement('TD');
__10.setAttribute('id', 'xwup_location_1', 0);
__10.style.display = 'none';
__9.appendChild(__10);
var __11 = XWC.UI.createElement('TD');
__11.setAttribute('id', 'xwup_location_2', 0);
__11.style.display = 'none';
__9.appendChild(__11);
var __12 = XWC.UI.createElement('TD');
__12.setAttribute('id', 'xwup_location_3', 0);
__12.style.display = 'none';
__9.appendChild(__12);
var __13 = XWC.UI.createElement('TD');
__13.setAttribute('id', 'xwup_location_4', 0);
__13.style.display = 'none';
__9.appendChild(__13);
var __14 = XWC.UI.createElement('TD');
__14.setAttribute('id', 'xwup_location_5', 0);
__14.style.display = 'none';
__9.appendChild(__14);
var __15 = XWC.UI.createElement('TD');
__15.setAttribute('id', 'xwup_location_6', 0);
__15.style.display = 'none';
__9.appendChild(__15);
var __16 = XWC.UI.createElement('TD');
__16.setAttribute('id', 'xwup_location_7', 0);
__16.style.display = 'none';
__9.appendChild(__16);
var __17 = XWC.UI.createElement('TD');
__17.setAttribute('id', 'xwup_location_8', 0);
__17.style.display = 'none';
__9.appendChild(__17);
var __18 = XWC.UI.createElement('TD');
__18.setAttribute('id', 'xwup_location_9', 0);
__18.style.display = 'none';
__9.appendChild(__18);
var __19 = XWC.UI.createElement('TD');
__19.setAttribute('id', 'xwup_location_10', 0);
__19.style.display = 'none';
__9.appendChild(__19);
var __20 = XWC.UI.createElement('BUTTON');
__20.setAttribute('tabindex', '0', 0);
__20.setAttribute('role', 'radio', 0);
__20.setAttribute('aria-checked', 'false', 0);
__20.setAttribute('type', 'button', 0);
__20.className = 'xwup-wide-rbg';
__20.style.display = 'none';
__20.setAttribute('id', 'xwup_media_localstorage', 0);
__20.onclick = function(event) {onLocalStorageButtonClick(this);};
var __21 = XWC.UI.createElement('SPAN');
__21.className = 'xwup-ico-localstorage';
__20.appendChild(__21);
var __22 = XWC.UI.createElement('SPAN');
__22.className = 'xwup-rbg-text';
__22.appendChild(document.createTextNode(XWC.S.media_localstorage));
__20.appendChild(__22);
__9.appendChild(__20);
var __23 = XWC.UI.createElement('BUTTON');
__23.setAttribute('tabindex', '0', 0);
__23.setAttribute('role', 'radio', 0);
__23.setAttribute('aria-checked', 'false', 0);
__23.setAttribute('type', 'button', 0);
__23.className = 'xwup-wide-rbg';
__23.style.display = 'none';
__23.setAttribute('id', 'xwup_media_memorystorage', 0);
__23.onclick = function(event) {onMemoryStorageButtonClick(this);};
var __24 = XWC.UI.createElement('SPAN');
__24.className = 'xwup-ico-memorystorage';
__23.appendChild(__24);
var __25 = XWC.UI.createElement('SPAN');
__25.className = 'xwup-rbg-text';
__25.appendChild(document.createTextNode(XWC.S.media_memorystorage));
__23.appendChild(__25);
__9.appendChild(__23);
var __26 = XWC.UI.createElement('BUTTON');
__26.setAttribute('tabindex', '0', 0);
__26.setAttribute('role', 'radio', 0);
__26.setAttribute('aria-checked', 'false', 0);
__26.setAttribute('type', 'button', 0);
__26.className = 'xwup-wide-rbg';
__26.style.display = 'none';
__26.setAttribute('id', 'xwup_media_hdd', 0);
__26.onclick = function(event) {onHddButtonClick(this);};
var __27 = XWC.UI.createElement('SPAN');
__27.className = 'xwup-ico-hdd';
__26.appendChild(__27);
var __28 = XWC.UI.createElement('SPAN');
__28.className = 'xwup-rbg-text';
__28.appendChild(document.createTextNode(XWC.S.media_hdd));
__26.appendChild(__28);
__9.appendChild(__26);
var __29 = XWC.UI.createElement('BUTTON');
__29.setAttribute('tabindex', '0', 0);
__29.setAttribute('role', 'radio', 0);
__29.setAttribute('aria-checked', 'false', 0);
__29.setAttribute('type', 'button', 0);
__29.className = 'xwup-wide-rbg';
__29.style.display = 'none';
__29.setAttribute('id', 'xwup_media_removable', 0);
__29.onclick = function(event) {onRemovableButtonClick(this);};
var __30 = XWC.UI.createElement('SPAN');
__30.className = 'xwup-ico-removable';
__29.appendChild(__30);
var __31 = XWC.UI.createElement('SPAN');
__31.className = 'xwup-rbg-text';
__31.appendChild(document.createTextNode(XWC.S.media_removable));
__29.appendChild(__31);
__9.appendChild(__29);
var __32 = XWC.UI.createElement('BUTTON');
__32.setAttribute('tabindex', '0', 0);
__32.setAttribute('role', 'radio', 0);
__32.setAttribute('aria-checked', 'false', 0);
__32.setAttribute('type', 'button', 0);
__32.className = 'xwup-wide-rbg';
__32.style.display = 'none';
__32.setAttribute('id', 'xwup_media_savetoken', 0);
__32.onclick = function(event) {onSaveTokenButtonClick(this);};
var __33 = XWC.UI.createElement('SPAN');
__33.className = 'xwup-ico-savetoken';
__32.appendChild(__33);
var __34 = XWC.UI.createElement('SPAN');
__34.className = 'xwup-rbg-text';
__34.appendChild(document.createTextNode(XWC.S.media_savetoken));
__32.appendChild(__34);
__9.appendChild(__32);
var __35 = XWC.UI.createElement('BUTTON');
__35.setAttribute('tabindex', '0', 0);
__35.setAttribute('role', 'radio', 0);
__35.setAttribute('aria-checked', 'false', 0);
__35.setAttribute('type', 'button', 0);
__35.className = 'xwup-wide-rbg';
__35.style.display = 'none';
__35.setAttribute('id', 'xwup_media_pkcs11', 0);
__35.onclick = function(event) {onHSMButtonClick(this);};
var __36 = XWC.UI.createElement('SPAN');
__36.className = 'xwup-ico-pkcs11';
__35.appendChild(__36);
var __37 = XWC.UI.createElement('SPAN');
__37.className = 'xwup-rbg-text';
__37.appendChild(document.createTextNode(XWC.S.media_pkcs11));
__35.appendChild(__37);
__9.appendChild(__35);
var __38 = XWC.UI.createElement('BUTTON');
__38.setAttribute('tabindex', '0', 0);
__38.setAttribute('role', 'radio', 0);
__38.setAttribute('aria-checked', 'false', 0);
__38.setAttribute('type', 'button', 0);
__38.className = 'xwup-wide-rbg';
__38.style.display = 'none';
__38.setAttribute('id', 'xwup_media_mobile', 0);
__38.onclick = function(event) {onMobileButtonClick(this);};
var __39 = XWC.UI.createElement('SPAN');
__39.className = 'xwup-ico-mobile';
__38.appendChild(__39);
var __40 = XWC.UI.createElement('SPAN');
__40.className = 'xwup-rbg-text';
__40.appendChild(document.createTextNode(XWC.S.media_mobile));
__38.appendChild(__40);
__9.appendChild(__38);
var __41 = XWC.UI.createElement('BUTTON');
__41.setAttribute('tabindex', '0', 0);
__41.setAttribute('role', 'radio', 0);
__41.setAttribute('aria-checked', 'false', 0);
__41.setAttribute('type', 'button', 0);
__41.className = 'xwup-wide-rbg';
__41.style.display = 'none';
__41.setAttribute('id', 'xwup_media_smartcert', 0);
__41.onclick = function(event) {onSmartCertButtonClick(this);};
var __42 = XWC.UI.createElement('SPAN');
__42.className = 'xwup-ico-smartcert';
__41.appendChild(__42);
var __43 = XWC.UI.createElement('SPAN');
__43.className = 'xwup-rbg-text';
__43.appendChild(document.createTextNode(XWC.S.media_smartcert));
__41.appendChild(__43);
__9.appendChild(__41);
var __44 = XWC.UI.createElement('BUTTON');
__44.setAttribute('tabindex', '0', 0);
__44.setAttribute('role', 'radio', 0);
__44.setAttribute('aria-checked', 'false', 0);
__44.setAttribute('type', 'button', 0);
__44.className = 'xwup-wide-rbg';
__44.style.display = 'none';
__44.setAttribute('id', 'xwup_media_nfciccard', 0);
__44.onclick = function(event) {onNFCICCardButtonClick(this);};
var __45 = XWC.UI.createElement('SPAN');
__45.className = 'xwup-ico-nfciccard';
__44.appendChild(__45);
var __46 = XWC.UI.createElement('SPAN');
__46.className = 'xwup-rbg-text';
__46.appendChild(document.createTextNode(XWC.S.media_nfciccard));
__44.appendChild(__46);
__9.appendChild(__44);
var __47 = XWC.UI.createElement('BUTTON');
__47.setAttribute('tabindex', '0', 0);
__47.setAttribute('role', 'radio', 0);
__47.setAttribute('aria-checked', 'false', 0);
__47.setAttribute('type', 'button', 0);
__47.className = 'xwup-wide-rbg';
__47.style.display = 'none';
__47.setAttribute('id', 'xwup_media_securedisk', 0);
__47.onclick = function(event) {onSecureDiskButtonClick(this);};
var __48 = XWC.UI.createElement('SPAN');
__48.className = 'xwup-ico-securedisk';
__47.appendChild(__48);
var __49 = XWC.UI.createElement('SPAN');
__49.className = 'xwup-rbg-text';
__49.appendChild(document.createTextNode(XWC.S.media_securedisk));
__47.appendChild(__49);
__9.appendChild(__47);
var __50 = XWC.UI.createElement('BUTTON');
__50.setAttribute('tabindex', '0', 0);
__50.setAttribute('role', 'radio', 0);
__50.setAttribute('aria-checked', 'false', 0);
__50.setAttribute('type', 'button', 0);
__50.className = 'xwup-wide-rbg';
__50.style.display = 'none';
__50.setAttribute('id', 'xwup_media_xfs', 0);
__50.onclick = function(event) {onXecureFreeSignButtonClick(this);};
var __51 = XWC.UI.createElement('SPAN');
__51.className = 'xwup-ico-xfs';
__50.appendChild(__51);
var __52 = XWC.UI.createElement('SPAN');
__52.className = 'xwup-rbg-text';
__52.appendChild(document.createTextNode(XWC.S.media_xfs));
__50.appendChild(__52);
__9.appendChild(__50);
var __53 = XWC.UI.createElement('BUTTON');
__53.setAttribute('tabindex', '0', 0);
__53.setAttribute('role', 'radio', 0);
__53.setAttribute('aria-checked', 'false', 0);
__53.setAttribute('type', 'button', 0);
__53.className = 'xwup-wide-rbg';
__53.style.display = 'none';
__53.setAttribute('id', 'xwup_media_webpage', 0);
__53.onclick = function(event) {onWebPageButtonClick(this);};
var __54 = XWC.UI.createElement('SPAN');
__54.className = 'xwup-ico-xfs';
__53.appendChild(__54);
var __55 = XWC.UI.createElement('SPAN');
__55.className = 'xwup-rbg-text';
__55.appendChild(document.createTextNode(XWC.S.media_webpage));
__53.appendChild(__55);
__9.appendChild(__53);
__8.appendChild(__9);
__6.appendChild(__8);
__1.appendChild(__6);
var __56 = XWC.UI.createElement('DIV');
__56.className = 'xwup-wide-body';
var __57 = XWC.UI.createElement('DIV');
__57.setAttribute('tabindex', '0', 0);
__57.setAttribute('id', 'xwup_cert_table_outline', 0);
__57.setAttribute('role', 'application', 0);
__57.className = 'wide-cert-table-outline';
__57.setAttribute('title', XWC.S.certtable, 0);
var __58 = XWC.UI.createElement('TABLE');
__58.setAttribute('cellpadding', '0', 0);
__58.setAttribute('cellspacing', '0', 0);
__58.setAttribute('role', 'grid', 0);
__58.setAttribute('summary', XWC.S.table_summary, 0);
__58.className = 'wide-cert-table';
var __59 = XWC.UI.createElement('CAPTION');
__59.appendChild(document.createTextNode(XWC.S.certtable));
__58.appendChild(__59);
var __60 = XWC.UI.createElement('THEAD');
var __61 = XWC.UI.createElement('TR');
__61.setAttribute('role', 'row', 0);
var __62 = XWC.UI.createElement('TH');
__62.setAttribute('role', 'columnheader', 0);
__62.setAttribute('scope', 'col', 0);
__62.setAttribute('sortType', 'IT', 0);
__62.style.width = '25%';
var __63 = XWC.UI.createElement('DIV');
__63.className = 'wide-cert-table-resizearea';
__63.appendChild(document.createTextNode(XWC.S.table_section));
var __64 = XWC.UI.createElement('DIV');
__63.appendChild(__64);
__62.appendChild(__63);
__61.appendChild(__62);
var __65 = XWC.UI.createElement('TH');
__65.setAttribute('role', 'columnheader', 0);
__65.setAttribute('scope', 'col', 0);
__65.setAttribute('sortType', 'T', 0);
__65.style.width = '25%';
var __66 = XWC.UI.createElement('DIV');
__66.className = 'wide-cert-table-resizearea';
__66.appendChild(document.createTextNode(XWC.S.table_user));
var __67 = XWC.UI.createElement('DIV');
__66.appendChild(__67);
__65.appendChild(__66);
__61.appendChild(__65);
var __68 = XWC.UI.createElement('TH');
__68.setAttribute('role', 'columnheader', 0);
__68.setAttribute('scope', 'col', 0);
__68.setAttribute('sortType', 'T', 0);
__68.style.width = '25%';
var __69 = XWC.UI.createElement('DIV');
__69.className = 'wide-cert-table-resizearea';
__69.appendChild(document.createTextNode(XWC.S.table_expire));
var __70 = XWC.UI.createElement('DIV');
__69.appendChild(__70);
__68.appendChild(__69);
__61.appendChild(__68);
var __71 = XWC.UI.createElement('TH');
__71.setAttribute('role', 'columnheader', 0);
__71.setAttribute('scope', 'col', 0);
__71.setAttribute('sortType', 'T', 0);
__71.style.width = '25%';
var __72 = XWC.UI.createElement('DIV');
__72.className = 'wide-cert-table-resizearea';
__72.appendChild(document.createTextNode(XWC.S.table_issuer));
var __73 = XWC.UI.createElement('DIV');
__72.appendChild(__73);
__71.appendChild(__72);
__61.appendChild(__71);
__60.appendChild(__61);
__58.appendChild(__60);
var __74 = XWC.UI.createElement('TBODY');
var __75 = XWC.UI.createElement('TR');
var __76 = XWC.UI.createElement('TD');
__75.appendChild(__76);
__74.appendChild(__75);
__58.appendChild(__74);
__57.appendChild(__58);
__56.appendChild(__57);
var __77 = XWC.UI.createElement('DIV');
__77.setAttribute('id', 'xwup_expire_alert', 0);
__77.className = 'xwup-expire-alert';
__77.style.display = 'none';
var __78 = XWC.UI.createElement('DIV');
__78.className = 'xwup-expire-icon';
var __79 = XWC.UI.createElement('IMG');
__79.setAttribute('src', AnySign.mBasePath+'/img/cert1.png', 0);
__79.setAttribute('alt', XWC.S.cert_status1, 0);
__78.appendChild(__79);
__77.appendChild(__78);
var __80 = XWC.UI.createElement('DIV');
__80.setAttribute('id', 'xwup_expire_message', 0);
__80.className = 'xwup-expire-message';
__80.appendChild(document.createTextNode(XWC.S.willbeexpired));
__77.appendChild(__80);
var __81 = XWC.UI.createElement('DIV');
__81.className = 'xwup-renew-message';
__81.appendChild(document.createTextNode(XWC.S.renewplease1));
var __82 = XWC.UI.createElement('BR');
__81.appendChild(__82);
__81.appendChild(document.createTextNode(XWC.S.renewplease2));
__77.appendChild(__81);
var __83 = XWC.UI.createElement('DIV');
__83.setAttribute('id', 'xwup_expire_arrow_border', 0);
__83.className = 'xwup-expire-arrow-border';
__77.appendChild(__83);
var __84 = XWC.UI.createElement('DIV');
__84.setAttribute('id', 'xwup_expire_arrow', 0);
__84.className = 'xwup-expire-arrow';
__77.appendChild(__84);
__56.appendChild(__77);
var __85 = XWC.UI.createElement('DIV');
__85.setAttribute('id', 'xwup_capslock', 0);
__85.className = 'xwup-expire-alert';
__85.style.display = 'none';
var __86 = XWC.UI.createElement('SPAN');
if (__SANDBOX.IEVersion < 7) {
__86.style.display = 'inline';
__86.style.zoom = '1';
}
else {
__86.style.display = "inline-block";
}
__86.style.color = '#0078D4';
__86.style.fontWeight = 'bold';
__86.appendChild(document.createTextNode(XWC.S.tooltip_capslock1));
__85.appendChild(__86);
var __87 = XWC.UI.createElement('SPAN');
__87.style.color = '#0078D4';
__87.appendChild(document.createTextNode(XWC.S.tooltip_capslock2));
__85.appendChild(__87);
var __88 = XWC.UI.createElement('DIV');
__88.setAttribute('id', 'xwup_expire_arrow_border', 0);
__88.className = 'xwup-expire-arrow-border';
__85.appendChild(__88);
var __89 = XWC.UI.createElement('DIV');
__89.setAttribute('id', 'xwup_expire_arrow', 0);
__89.className = 'xwup-expire-arrow';
__85.appendChild(__89);
__56.appendChild(__85);
var __90 = XWC.UI.createElement('DIV');
__90.style.height = '15px';
__56.appendChild(__90);
var __91 = XWC.UI.createElement('DIV');
__91.className = 'xwup-password-field-wide';
var __92 = XWC.UI.createElement('TABLE');
__92.setAttribute('cellpadding', '0', 0);
__92.setAttribute('cellspacing', '0', 0);
var __93 = XWC.UI.createElement('CAPTION');
__93.appendChild(document.createTextNode(XWC.S.table_manager));
__92.appendChild(__93);
var __94 = XWC.UI.createElement('TBODY');
var __95 = XWC.UI.createElement('TR');
var __96 = XWC.UI.createElement('TD');
var __97 = XWC.UI.createElement('FORM');
__97.setAttribute('action', '', 0);
if (__SANDBOX.IEVersion <= 8) {
__97.mergeAttributes(XWC.UI.createElement("<FORM name='xwup_certselectwide_tek_form'>"),false);
} else {
__97.setAttribute('name', 'xwup_certselectwide_tek_form', 0);
}
__97.setAttribute('id', 'xwup_certselectwide_tek_form', 0);
__97.onsubmit = function(event) {return false;};
var __98 = XWC.UI.createElement('DIV');
__98.style.display = 'inline';
__98.setAttribute('id', 'certselectwide_tk1', 0);
var __99 = XWC.UI.createElement('LABEL');
__99.htmlFor = 'xwup_certselectwide_tek_input1';
__99.className = 'xwup-password-label-wide';
__99.appendChild(document.createTextNode(XWC.S.passwd));
__98.appendChild(__99);
var __100 = XWC.UI.createElement('INPUT');
__100.setAttribute('tabindex', '0', 0);
__100.setAttribute('type', 'password', 0);
if (__SANDBOX.IEVersion <= 8) {
__100.mergeAttributes(XWC.UI.createElement("<INPUT name='certselectwide_tek_input1'>"),false);
} else {
__100.setAttribute('name', 'certselectwide_tek_input1', 0);
}
__100.setAttribute('id', 'xwup_certselectwide_tek_input1', 0);
__100.setAttribute('title', XWC.S.passwd, 0);
__100.setAttribute('kbd', 'qwerty_crt', 0);
__100.className = 'xwup-password-input-wide';
__98.appendChild(__100);
var __101 = XWC.UI.createElement('DIV');
__101.setAttribute('title', XWC.S.passwd, 0);
__101.setAttribute('id', 'xwup_certselectwide_fake_input1', 0);
__98.appendChild(__101);
var __102 = XWC.UI.createElement('INPUT');
__102.setAttribute('type', 'button', 0);
if (__SANDBOX.IEVersion <= 8) {
__102.mergeAttributes(XWC.UI.createElement("<INPUT name='certselectwide_tek_check1'>"),false);
} else {
__102.setAttribute('name', 'certselectwide_tek_check1', 0);
}
__102.setAttribute('tabindex', '0', 0);
__102.setAttribute('title', XWC.S.input_mouse, 0);
__102.setAttribute('id', 'xwup_certselectwide_tek_check1', 0);
__102.onclick = function(event) {onInputMouseCheckBoxClick();};
__98.appendChild(__102);
__97.appendChild(__98);
var __103 = XWC.UI.createElement('DIV');
__103.setAttribute('id', 'certselectwide_lite_tk1', 0);
__103.style.display = 'none';
var __104 = XWC.UI.createElement('LABEL');
__104.htmlFor = 'xwup_certselectwide_lite_input1';
__104.className = 'xwup-password-label-wide';
__104.appendChild(document.createTextNode(XWC.S.passwd));
__103.appendChild(__104);
var __105 = XWC.UI.createElement('INPUT');
__105.setAttribute('tabindex', '0', 0);
__105.setAttribute('type', 'password', 0);
if (__SANDBOX.IEVersion <= 8) {
__105.mergeAttributes(XWC.UI.createElement("<INPUT name='certselectwide_lite_input1'>"),false);
} else {
__105.setAttribute('name', 'certselectwide_lite_input1', 0);
}
__105.setAttribute('id', 'xwup_certselectwide_lite_input1', 0);
__105.setAttribute('title', XWC.S.passwd, 0);
__105.className = 'xwup-password-input-wide';
__103.appendChild(__105);
__97.appendChild(__103);
var __106 = XWC.UI.createElement('DIV');
__106.style.display = 'none';
var __107 = XWC.UI.createElement('LABEL');
__107.htmlFor = 'xwup_certselectwide_xfs_input1';
__107.className = 'xwup-password-label-wide';
__107.appendChild(document.createTextNode(XWC.S.passwd));
__106.appendChild(__107);
var __108 = XWC.UI.createElement('INPUT');
__108.setAttribute('tabindex', '0', 0);
__108.setAttribute('type', 'password', 0);
if (__SANDBOX.IEVersion <= 8) {
__108.mergeAttributes(XWC.UI.createElement("<INPUT name='certselectwide_xfs_input1'>"),false);
} else {
__108.setAttribute('name', 'certselectwide_xfs_input1', 0);
}
__108.setAttribute('id', 'xwup_certselectwide_xfs_input1', 0);
__108.setAttribute('title', XWC.S.passwd, 0);
__108.className = 'xwup-password-input-wide';
__106.appendChild(__108);
__97.appendChild(__106);
var __109 = XWC.UI.createElement('DIV');
__109.style.display = 'none';
var __110 = XWC.UI.createElement('LABEL');
__110.htmlFor = 'xwup_certselectwide_e2e_input1';
__110.className = 'xwup-password-label-wide';
__110.appendChild(document.createTextNode(XWC.S.passwd));
__109.appendChild(__110);
var __111 = XWC.UI.createElement('INPUT');
__111.setAttribute('tabindex', '0', 0);
__111.setAttribute('type', 'password', 0);
if (__SANDBOX.IEVersion <= 8) {
__111.mergeAttributes(XWC.UI.createElement("<INPUT name='certselectwide_e2e_input1'>"),false);
} else {
__111.setAttribute('name', 'certselectwide_e2e_input1', 0);
}
__111.setAttribute('id', 'xwup_certselectwide_e2e_input1', 0);
__111.setAttribute('title', XWC.S.passwd, 0);
__111.className = 'xwup-password-input-wide';
__109.appendChild(__111);
__97.appendChild(__109);
var __112 = XWC.UI.createElement('DIV');
__112.setAttribute('id', 'xwup_certselectwide_tek_guide', 0);
__112.className = 'xwup-password-text-wide';
var __113 = XWC.UI.createElement('IMG');
__113.setAttribute('src', AnySign.mBasePath+'/img/bu.png', 0);
__113.style.marginRight = '4px';
__113.setAttribute('alt', XWC.S.exclamation_img, 0);
__112.appendChild(__113);
var __114 = XWC.UI.createElement('SPAN');
__114.setAttribute('id', 'xwup_certselectwide_tek_guide_msg1', 0);
__114.appendChild(document.createTextNode(XWC.S.input_guide));
__112.appendChild(__114);
var __115 = XWC.UI.createElement('SPAN');
__115.setAttribute('id', 'xwup_certselectwide_tek_guide_msg2', 0);
__115.appendChild(document.createTextNode(XWC.S.input_guide2));
__112.appendChild(__115);
var __116 = XWC.UI.createElement('SPAN');
__116.setAttribute('id', 'xwup_certselectwide_tek_guide_msg3', 0);
__116.style.display = 'none';
__116.appendChild(document.createTextNode(XWC.S.sign_complete_msg));
__112.appendChild(__116);
__97.appendChild(__112);
__96.appendChild(__97);
__95.appendChild(__96);
var __117 = XWC.UI.createElement('TD');
__117.style.textAlign = 'right';
var __118 = XWC.UI.createElement('BUTTON');
__118.setAttribute('tabindex', '0', 0);
__118.setAttribute('type', 'button', 0);
__118.className = 'button-on-table';
__118.setAttribute('id', 'xwup_find', 0);
__118.onclick = function(event) {onFindCertButtonClick(event);};
__118.setAttribute('title', XWC.S.open_layer + XWC.S.searchcert, 0);
__118.appendChild(document.createTextNode(XWC.S.searchcert));
__117.appendChild(__118);
var __119 = XWC.UI.createElement('BUTTON');
__119.setAttribute('tabindex', '0', 0);
__119.setAttribute('type', 'button', 0);
__119.className = 'button-on-table';
__119.setAttribute('id', 'xwup_view', 0);
__119.onclick = function(event) {onViewVerifyButtonClick(event);};
__119.setAttribute('title', XWC.S.open_layer + XWC.S.viewcert, 0);
__119.appendChild(document.createTextNode(XWC.S.viewcert));
__117.appendChild(__119);
var __120 = XWC.UI.createElement('BUTTON');
__120.setAttribute('tabindex', '0', 0);
__120.setAttribute('type', 'button', 0);
__120.className = 'button-on-table';
__120.setAttribute('id', 'xwup_delete', 0);
__120.onclick = function(event) {onDeleteCertButtonClick(event);};
__120.setAttribute('title', XWC.S.open_layer + XWC.S.deletecert, 0);
__120.appendChild(document.createTextNode(XWC.S.deletecert));
__117.appendChild(__120);
__95.appendChild(__117);
__94.appendChild(__95);
__92.appendChild(__94);
__91.appendChild(__92);
__56.appendChild(__91);
__1.appendChild(__56);
var __121 = XWC.UI.createElement('DIV');
__121.className = 'xwup-buttons-layout';
__121.style.display = 'none';
var __122 = XWC.UI.createElement('BUTTON');
__122.setAttribute('type', 'button', 0);
__122.className = 'OKButton';
__122.setAttribute('id', 'xwup_OkButton', 0);
__122.setAttribute('title', XWC.S.button_ok, 0);
__122.onclick = function(event) {onOKButtonClick(event)};
__121.appendChild(__122);
var __123 = XWC.UI.createElement('BUTTON');
__123.setAttribute('type', 'button', 0);
__123.className = 'CancelButton';
__123.setAttribute('id', 'xwup_CancelButton', 0);
__123.setAttribute('title', XWC.S.button_cancel, 0);
__123.onclick = function(event) {onCancelButtonClick(event)};
__121.appendChild(__123);
__1.appendChild(__121);
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
