var __exportcertrelay = function(__SANDBOX) {
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

exportcertrelay_tk1 = null; var gCertList,
	gMediaRadio,
	gProviderName,
	gSelectedSubjectRDN,
	gSelectedIssuerRDN,
	gSelectedCertSerial,
	gSelectedCertClass,
	gSelectedCertSource,
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
				   "xwup_media_webpage"],
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
	gFilter,
	gPFXInfo,
	gMediaLength,
	gMediaPage = 1,
	gStorage,
	gEvent;

XWC.getLocaleResource("exportcertrelay", XWC.lang());

function onload(aDialogObj) {
	var info,
		html,
		certInfo,
		aTableNextBtn,
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
		gStorage = "";
	
		if (AnySign.mAnySignLiteSupport) {
		gSelectedMediaID = gDialogObj.args.certLocation || XWC.CERT_LOCATION_LOCALSTORAGE;
	} else {
		gSelectedMediaID = gDialogObj.args.certLocation || 1;
	}

	if (AnySign.mDefaultCertLocation)
		gSelectedMediaID = AnySign.mDefaultCertLocation;
	
	aInputType = __SANDBOX.getInputType(gSelectedMediaID);
	
	if (aInputType == "4pc" && AnySign.mAnySignLoad) {
		AnySign.mAnySignEnable = true;
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
	
		if (!(__SANDBOX.isIE() && navigator.userAgent.indexOf('Windows NT 6.2') >= 0)) {
		__112.onkeyup = function () { checkCaps(); };
		__112.onblur = function () { __98.style.display = 'none'; };
		setCapsLockToolTip(__112, __98, 100, 10);
	}

	XWC.UI.setDragAndDrop(__2, true);
	__2.firstChild.appendChild(document.createTextNode(XWC.S.title));

		gCertTableView = new XWC.UI.TableView(__69);

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
				if (gCertList[i][7])
					gSelectedCertSource = gCertList[i][7];
				gSelectedRowIndex = i;
				break;
			}
		}
		
		aExpireAlert = __90;
		if (gCertList[gSelectedRowIndex][0] == 1) {
			aGrandMom = __69;

			aAddOffset = aGrandMom;

			aExpireAlert.style.top = aSelectedRowElement.offsetTop + aGrandMom.offsetTop - aGrandMom.scrollTop + aSelectedRowElement.offsetHeight + 4 - aExpireAlert.parentNode.offsetTop + "px";
			aExpireAlert.style.left = aSelectedRowElement.cells[1].offsetLeft + 60 + "px";


			expireMessage = XWC.S.willbeexpired.split("%s").join(gCertList[gSelectedRowIndex][4]);
			aElement = __93;
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
							}
		} else {
			aExpireAlert.style.display = "none";
			
			setTimeout (function () {if(gInputHandler) gInputHandler.refresh();}, 0);
			setTimeout (function () {if(gInputHandler) gInputHandler.clear();}, 0);
		}

	};

	gCertTableView.onRefresh = function (aData) {
		var tr, td, i, temp;
		gCertTableBody = __69.getElementsByTagName("table")[0].tBodies[0];
		gCertTableBody.removeAttribute("tabindex");
		if (aData.length == 1) {
			if (AnySign.mDivInsertOption == 0)
				gCertTableBody.setAttribute("tabindex", 3, 0);
			else 
				gCertTableBody.setAttribute("tabindex", 0, 0);
		}
		gCertList = aData;

		for (i = 0; i < aData.length; i++) {
			certInfo = aData[i];
			tr = XWC.UI.createElement("tr");
			tr.setAttribute("role", "row", 0);
			tr.setAttribute("aria-selected", "false", 0);
			tr.setAttribute('subject', certInfo[2]);
			tr.setAttribute("issuer", certInfo[5]);
			tr.setAttribute("serial", certInfo[6]);
			
			statusTextCell = gCertTableView.createTextCell(XWC.S["table_select"] + XWC.S["cert_status" + certInfo[0]]);
			statusTextCell.style.width = "0px";
			statusTextCell.style.height = "0px";
			statusTextCell.style.display = "none";

			td = XWC.UI.createElement("td");
			imageTextCell1 = gCertTableView.createImageTextCell(AnySign.mBasePath + "/img/cert" + certInfo[0] + ".png",
									   certInfo[1], XWC.S["cert_status" + certInfo[0]]);
						td.appendChild(statusTextCell);
			td.appendChild(imageTextCell1);
			tr.appendChild(td);

			td = XWC.UI.createElement("td");
			textCell1 = gCertTableView.createTextCell(XWC.Util.getCNFromRDN(certInfo[2]));
			td.appendChild(textCell1);
			tr.appendChild(td);

			td = XWC.UI.createElement("td");
			textCell2 = gCertTableView.createTextCell(certInfo[4]);
			textCell2.style.textAlign = "center";
			td.appendChild(textCell2);
			tr.appendChild(td);

			td = XWC.UI.createElement("td");
			textCell3 = gCertTableView.createTextCell(certInfo[3]);
			textCell3.style.textAlign = "center";
			td.appendChild(textCell3);
			tr.appendChild(td);

			if (AnySign.mDivInsertOption > 0)
				tr.setAttribute("tabindex", 3, 0);
			else
				tr.setAttribute("tabindex", 0, 0);
			
			tr.onkeyup = function(e) {
				e = e || window.event;

				var aKeyCode = e.which || e.keyCode;

				if (aKeyCode == 9 && e.shiftKey) {
					__69.focus();
				} else if (aKeyCode == 9) {
					aTableNextBtn.focus();
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

	gMediaRadio = XWC.UI.RadioButtonGroup([	__39,
											__42,
											__45,
											__48,
											__51,
											__54,
											__57,
											__66,
											__33,
											__36,
											__60,
											__63]);

	gMediaRadio.setDisabledAll();

	if (typeof AnySign.mLanguage === 'string' && AnySign.mLanguage.toLowerCase() == "en-us") {
		var media_localstorage = __33.firstChild.nextSibling;
		media_localstorage.className += " xwup-font10";
		var media_memorystorage = __36.firstChild.nextSibling;
		media_memorystorage.className += " xwup-font10";
		var media_hdd = __39.firstChild.nextSibling;
		media_hdd.className += " xwup-font10";
		var media_removable = __42.firstChild.nextSibling;
		media_removable.className += " xwup-font10";
		var media_savetoken = __45.firstChild.nextSibling;
		media_savetoken.className += " xwup-font10";
		var media_pkcs11 = __48.firstChild.nextSibling;
		media_pkcs11.className += " xwup-font10";
		var media_mobile = __51.firstChild.nextSibling;
		media_mobile.className += " xwup-font10";
		var media_smartcert = __54.firstChild.nextSibling;
		media_smartcert.className += " xwup-font10";
		var media_securedisk = __57.firstChild.nextSibling;
		media_securedisk.className += " xwup-font10";
		var media_nfciccard = __66.firstChild.nextSibling;
		media_nfciccard.className += " xwup-font10";
		var media_xfs = __60.firstChild.nextSibling;
		media_xfs.className += " xwup-font10";
		var media_webpage = __63.firstChild.nextSibling;
		media_webpage.className += " xwup-font10";
	} else {
		var media_removable = __42.firstChild.nextSibling;
		media_removable.style.letterSpacing = "-2px";
		var media_smartcert = __54.firstChild.nextSibling;
		media_smartcert.style.letterSpacing = "-1px";
		var media_securedisk = __57.firstChild.nextSibling;
		media_securedisk.style.letterSpacing = "-1px";
	}

	if (__SANDBOX.IEVersion < 7) {
		__97.style.display = "none";
		__96.style.display = "none";
		__102.style.display = "none";
		__101.style.display = "none";
		__112.className = "exportcertrelay_input_type1";
	}
	
		if (AnySign.mAnySignLiteSupport) {
				if (gStorage.indexOf("LOCALSTORAGE") < 0) {
			gStorage = "LOCALSTORAGE," + gStorage;
		}
		__SANDBOX.refreshCertLocationSet (gStorage);
	}

	if(document.getElementById("TouchEnKey")) {
			} else {
		__117.onclick = function(e) {
			setTranskeyXYPosition(__117);
		}
	}

	createInputHandler_lite();
	setInputHandler("lite");

	setPasswordInputEnable();
	
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
	gMediaLength = mediaArray.length;
	
	locationArray.push(__13);
	locationArray.push(__14);
	locationArray.push(__15);
	locationArray.push(__16);
	locationArray.push(__17);
	locationArray.push(__18);
	locationArray.push(__19);
	locationArray.push(__20);
	locationArray.push(__21);
	locationArray.push(__22);
	locationArray.push(__23);
	locationArray.push(__24);
	locationArray.push(__25);
	locationArray.push(__26);
	locationArray.push(__27);
	
	for (index = 0; index < mediaArray.length; index++) {
		switch (mediaArray[index]) {
		case "localstorage":
			locationArray[index].appendChild(__33);
			__33.style.display = "block";
			break;
		case "memorystorage":
			locationArray[index].appendChild(__36);
			__36.style.display = "block";
			break;
		case "hard":
			locationArray[index].appendChild(__39);
			__39.style.display = "block";
			break;
		case "removable":
			locationArray[index].appendChild(__42);
			__42.style.display = "block";
			break;
		case "usbtoken":
			locationArray[index].appendChild(__45);
			__45.style.display = "block";
			break;
		case "pkcs11":
			locationArray[index].appendChild(__48);
			__48.style.display = "block";
			break;
		case "mobile":
			locationArray[index].appendChild(__51);
			__51.style.display = "block";
			break;
		case "smartcert":
			locationArray[index].appendChild(__54);
			__54.style.display = "block";
			break;
		case "securedisk":
			locationArray[index].appendChild(__57);
			__57.style.display = "block";
			break;
		case "nfciccard":
			locationArray[index].appendChild(__66);
			__66.style.display = "block";
			break;
		case "xfs":
			locationArray[index].appendChild(__60);
			__60.style.display = "block";
			break;
		case "webpage":
			locationArray[index].appendChild(__63);
			__63.style.display = "block";
			break;
		default:
		}
	}
	
	var aSelectMediaName;
	switch (aMediaType) {
	case XWC.CERT_LOCATION_HARD: 		if (__39.style.display == "block") {
			aCheckedRadioIndex = 0;
			aSelectMediaName = "hard";
		}
		break;
	case XWC.CERT_LOCATION_REMOVABLE: 		if (__42.style.display == "block") {
			aCheckedRadioIndex = 1;
			aSelectMediaName = "removable";
		}
		break;
	case XWC.CERT_LOCATION_ICCARD: 	case XWC.CERT_LOCATION_KEPCOICCARD: 		if (__45.style.display == "block") {
			aCheckedRadioIndex = 2;
			aSelectMediaName = "usbtoken";
		}
		break;
	case XWC.CERT_LOCATION_PKCS11: 		if (__48.style.display == "block") {
			aCheckedRadioIndex = 3;
			aSelectMediaName = "pkcs11";
		}
		break;
	case XWC.CERT_LOCATION_YESSIGNM: 	case XWC.CERT_LOCATION_MPHONE: 		if (__51.style.display == "block") {
			aCheckedRadioIndex = 4;
			aSelectMediaName = "mobile";
		}
		break;
	case XWC.CERT_LOCATION_LOCALSTORAGE: 		if (__33.style.display == "block") {
			aCheckedRadioIndex = 8;
			aSelectMediaName = "localstorage";
		}
		break;
	case XWC.CERT_LOCATION_MEMORYSTORAGE: 		if (__36.style.display == "block") {
			aCheckedRadioIndex = 9;
			aSelectMediaName = "memorystorage";
		}
		break;
	case XWC.CERT_LOCATION_XECUREFREESIGN: 		if (__60.style.display == "block") {
			aCheckedRadioIndex = 10;
			aSelectMediaName = "xfs";
		}
		break;
	case XWC.CERT_LOCATION_WEBPAGE: 		if (__63.style.display == "block") {
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
	
	var aSelectMediaIndex = mediaArray.indexOf(aSelectMediaName);
	
				if (mediaArray.length < 6) {
		__13.style.display = "";
		__14.style.display = "";
		__15.style.display = "";
		__16.style.display = "";
		__17.style.display = "";
	}
	else if (mediaArray.length == 6) {		
		__13.style.width = "16%";
		__13.firstChild.style.width = "67px";
		__13.firstChild.style.padding = "1px";
		__14.style.width = "16%";
		__14.firstChild.style.width = "67px";
		__14.firstChild.style.padding = "1px";
		__15.style.width = "16%";
		__15.firstChild.style.width = "67px";
		__15.firstChild.style.padding = "1px";
		__16.style.width = "16%";
		__16.firstChild.style.width = "67px";
		__16.firstChild.style.padding = "1px";
		__17.style.width = "16%";
		__17.firstChild.style.width = "67px";
		__17.firstChild.style.padding = "1px";
		__18.style.width = "16%";
		__18.firstChild.style.width = "67px";
		__18.firstChild.style.padding = "1px";
		
		__13.style.display = "";
		__14.style.display = "";
		__15.style.display = "";
		__16.style.display = "";
		__17.style.display = "";
		__18.style.display = "";
	}
	else if (mediaArray.length > 6) {
						__31.getElementsByTagName("span")[0].className = "xwup-ico-arrow-left-disabled";
		__29.getElementsByTagName("span")[0].className = "xwup-ico-arrow-right";
		
		__28.style.width = "5%";
		
		for (index = 0; index < locationArray.length; index++) {
			locationArray[index].style.width = "19%";
			if(locationArray[index].firstChild)
				locationArray[index].firstChild.style.width = "70px";
		}
		
		__28.style.display = "";
		__13.style.display = "";
		__14.style.display = "";
		__15.style.display = "";
		__16.style.display = "";
		__17.style.display = "";
		
		if(aSelectMediaIndex > 4)
			onMediaRight();
		if(aSelectMediaIndex > 9)
			onMediaRight();
	}

		_setMediaRadio = function ()
	{
		gMediaRadio.setLocationEnable("hard", __39);
		gMediaRadio.setLocationEnable("removable", __42);
		gMediaRadio.setLocationEnable("usbtoken", __45, true);
		gMediaRadio.setLocationEnable("pkcs11", __48, true);
		gMediaRadio.setLocationEnable("mobile", __51, true);
		gMediaRadio.setLocationEnable("smartcert", __54, true);
		gMediaRadio.setLocationEnable("securedisk", __57, true);
		gMediaRadio.setLocationEnable("nfciccard", __66, true);
		gMediaRadio.setLocationEnable("localstorage", __33);
		gMediaRadio.setLocationEnable("memorystorage", __36);
		gMediaRadio.setLocationEnable("xfs", __60);
		gMediaRadio.setLocationEnable("webpage", __63);
		
		if ((__SANDBOX.certLocationSet["mphone"]) || (__SANDBOX.certLocationSet["mobisign"]))
			gMediaRadio.setDisabled (__51, false);
		
		if (AnySign.mPlatform.aName.indexOf("mac") == 0 || AnySign.mPlatform.aName.indexOf("linux") == 0)
		{
			gMediaRadio.setDisabled (__45, true);
			gMediaRadio.setDisabled (__48, true);
			gMediaRadio.setDisabled (__51, true);
			gMediaRadio.setDisabled (__54, true);
			gMediaRadio.setDisabled (__57, true);
		}
		
		if (aCheckedRadioIndex >= 0) {
			gMediaRadio.setChecked(aCheckedRadioIndex);
		}
		
		if (__SANDBOX.isIE () > 7)
			setTimeout (function () {setFocus();}, 0);

		if (aMediaType == XWC.CERT_LOCATION_PKCS11)
		{
			setButtonManager("enabled");
			gNeedPassword = setPasswordInputEnable(false);
			__48.focus();
		}
	}
		_CB_getCertTree = function (aCertList) 
	{
		if (__SANDBOX.isFailed(aCertList))
			aCertList = "";

		refreshTableView(aCertList);
		__SANDBOX.isDialogLoaded = true;
		if (gSelectedMediaID == XWC.CERT_LOCATION_LOCALSTORAGE) {
			setDragAndDropElement (true, aCertList);
		}
		
		_setMediaRadio();
	}
		_CB_getMediaList = function ()
	{
		var aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();	
		if (aErrorObject.code == XW_ERROR_VERIFY_INTEGRITY) {
			alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
			return;
		}
		
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
	
	__113.style.display = 'none';
	__114.style.display = 'none';

	return 0;
}

function onMediaLeft() {
	
	if (gMediaPage == 2) {
		gMediaPage = 1;
		
		__13.style.display = "";
		__14.style.display = "";
		__15.style.display = "";
		__16.style.display = "";
		__17.style.display = "";
		
		__18.style.display = "none";
		__19.style.display = "none";
		__20.style.display = "none";
		__21.style.display = "none";
		__22.style.display = "none";
		
		__31.disabled = true;
		__31.getElementsByTagName("span")[0].className = "xwup-ico-arrow-left-disabled";
		__29.disabled = false;
		__29.getElementsByTagName("span")[0].className = "xwup-ico-arrow-right";
		
	} else if (gMediaPage == 3) {
		gMediaPage = 2;
		
		__18.style.display = "";
		__19.style.display = "";
		__20.style.display = "";
		__21.style.display = "";
		__22.style.display = "";
		
		__23.style.display = "none";
		__24.style.display = "none";
		__25.style.display = "none";
		__26.style.display = "none";
		__27.style.display = "none";
		
		__29.disabled = false;
		__29.getElementsByTagName("span")[0].className = "xwup-ico-arrow-right";
	}
}

function onMediaRight() {
	
	if (gMediaPage == 1) {
		gMediaPage = 2;
		
		__13.style.display = "none";
		__14.style.display = "none";
		__15.style.display = "none";
		__16.style.display = "none";
		__17.style.display = "none";
		
		__18.style.display = "";
		__19.style.display = "";
		__20.style.display = "";
		__21.style.display = "";
		__22.style.display = "";
		
		__31.disabled = false;
		__31.getElementsByTagName("span")[0].className = "xwup-ico-arrow-left";
		
		if (gMediaLength < 11) {
			__29.disabled = true;
			__29.getElementsByTagName("span")[0].className = "xwup-ico-arrow-right-disabled";
		}
		
	} else if (gMediaPage == 2) {
		gMediaPage = 3;
		
		__18.style.display = "none";
		__19.style.display = "none";
		__20.style.display = "none";
		__21.style.display = "none";
		__22.style.display = "none";
		
		__23.style.display = "";
		__24.style.display = "";
		__25.style.display = "";
		__26.style.display = "";
		__27.style.display = "";
		
		__31.disabled = false;
		__31.getElementsByTagName("span")[0].className = "xwup-ico-arrow-left";
		__29.disabled = true;
		__29.getElementsByTagName("span")[0].className = "xwup-ico-arrow-right-disabled";
	}
}

function setFocus() {
	if (gCertTableBody != undefined) 
	{
		var aTableRows = gCertTableBody.getElementsByTagName('tr');

		if (aTableRows.length > 0) {
			setTimeout (function () {
				if(gInputHandler) gInputHandler.refresh();
			});
		}
	}
	if (AnySign.mDivInsertOption == 0)
		__2.parentNode.focus();
}

function setOKButtonDisabled(aEnable) {
	__123.disabled = aEnable;
}

function onNextButtonClick (e) {
	var aGuideModule,
		aGuideDialog = null,
		aKeyword = null,
		aKeywordResult = 0,
		aPin = null,
		aAuthCode,
		aMediaType;
	
	var pageDivInsertOption = AnySign.mDivInsertOption;
	
	aMediaType = Math.floor(parseInt(gSelectedMediaID, 10) / 100) * 100;
	setOKButtonDisabled(true);

		_callback = function ()
	{
		if(gInputHandler) gInputHandler.clear();
		setOKButtonDisabled(false);
	}
	
	_cb_exportCertRelayFromBrowser = function (aResult)
	{
		if (aGuideDialog) {
			aGuideDialog.dispose();
		}

		setOKButtonDisabled(false);

		if (__SANDBOX.isFailed(aResult, gErrCallback)) {
			if(gInputHandler) gInputHandler.clear();
			return;
		}

		__131.value = aAuthCode[0];
		__132.value = aAuthCode[1];
		__133.value = aAuthCode[2];

		__5.style.display = "none";
		__124.style.display = "block";
	}

		_next_savepasswd = function ()
	{
		var aSavePasswdModule= __SANDBOX.loadModule("savepasswd");
		aSavePasswdDialog = aSavePasswdModule({
			args: {messageType: "import", inputType: "lite"},
			onconfirm: function (aResult) {
				var aNewKeyword = aResult;

				aSavePasswdDialog.dispose();

				aAuthCode = createRandomAuth();
				var aTotalAuthCode = "";
				aAuthCode.forEach (function (num) {
					aTotalAuthCode += num;
				});

				_show_guidewindow();

				__SANDBOX.upInterface().exportCertRelayFromBrowser (AnySign.mCertRelayFromBrowserServerUrl,
																	aTotalAuthCode,
																	gSelectedIssuerRDN,
																	gSelectedCertSerial,
																	aKeyword,
																	aNewKeyword,
																	AnySign.mWithCredentialsForCORS,
																	_cb_exportCertRelayFromBrowser);
			},
			oncancel: function () {
				aSavePasswdDialog.dispose();
				setOKButtonDisabled(false);
			}
		});
		aSavePasswdDialog.show();
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
		AnySign.setInfoDialog();
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
			gSelectedCertSource = "";
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
						
						AnySign.setInfoDialog();
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
						_next_savepasswd();
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

					var aKeywordTryLimit = gDialogObj.args.keywordTryLimit;
					
					if (aErrorObject.code == XW_ERROR_INCORRECT_PASSWORD_KMCERT) {
						setOKButtonDisabled(false);
					} else if (aErrorObject.code == XW_ERROR_VERIFYPASSWORD || aErrorObject.code == '21') {
						alert(XWC.S.keyworderror1.split("%s").join(aKeywordTryLimit) + XWC.S.keyworderror2.split("%s").join(gPasswordTryCount));
						if (gPasswordTryCount++ >= aKeywordTryLimit) {
							aKeywordResult = -3;
							if (gSelectedMediaID == XWC.CERT_LOCATION_XECUREFREESIGN) {
								var _cb_logout = function(){ onCancelButtonClick(); }
								__SANDBOX.upInterface().xfsLogout(_cb_logout);
							} else {
								onCancelButtonClick();
							}
						} else {
							setOKButtonDisabled(false);
						}
					} else if (aErrorObject.code == XW_ERROR_PLUGINS_NOT_SECUREINPUT) {
						alert(XWC.S.not_allowed);
						if (gSelectedMediaID == XWC.CERT_LOCATION_XECUREFREESIGN) {
							var _cb_logout = function(){ onCancelButtonClick(); }
							__SANDBOX.upInterface().xfsLogout(_cb_logout);
						} else {
							onCancelButtonClick();
						}
					} else if (aErrorObject.code == XW_OPENCERT_ERROR_INCORRECT_PASSWORD) {
						alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
						setOKButtonDisabled(false);
						if (gPasswordTryCount++ >= aKeywordTryLimit) {
							aKeywordResult = -3;
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
					AnySign.setInfoDialog();
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
	AnySign.setInfoDialog();
	__SANDBOX.upInterface().SetCloudTrayView(false);
	__SANDBOX.isDialogLoaded = false;
	gDialogObj.oncancel();		
}

function onBackButtonClick(e) {
	__124.style.display = "none";
	__5.style.display = "block";

	if(gInputHandler) gInputHandler.clear();
}

function onOkButtonClick(e) {
	onCancelButtonClick(e);
}

function onLocalStorageButtonClick(element) {
	gSelectedButton = 9;
	gSelectedSmartCert = false;
	refreshTableView("");
	
	AnySign.mAnySignEnable = false;
	setInputHandler("lite");
	setPasswordInputEnable();
	setButtonManager ("disabled");
	
	gSelectedMediaID = XWC.CERT_LOCATION_LOCALSTORAGE;
	
	var _cb_getCertTree = function (aCertList) {
		if (__SANDBOX.isFailed(aCertList))
			aCertList = "";

		setButtonManager ("enabled");
		setDragAndDropElement (true, aCertList);
		refreshTableView(aCertList);
	}
	
	var _cb_getMediaList = function () {
		__SANDBOX.upInterface().getCertTree(XWC.CERT_LOCATION_LOCALSTORAGE, 2, gSearchCondition, 5, gCAList, gCertSerial, _cb_getCertTree);
	}
	
	__SANDBOX.upInterface().getMediaList(XWC.CERT_LOCATION_LOCALSTORAGE, 0, 1, _cb_getMediaList);
}

function onMemoryStorageButtonClick(element) {
	gSelectedButton = 10;
	gSelectedSmartCert = false;
	refreshTableView("");
	
	AnySign.mAnySignEnable = false;
	setInputHandler("lite");
	setPasswordInputEnable();
	
	var pageDivInsertOption = AnySign.mDivInsertOption;
	AnySign.mDivInsertOption = 0;
	
	gSelectedMediaID = XWC.CERT_LOCATION_MEMORYSTORAGE;
	setDragAndDropElement (false);

	AnySign.mShowInfoDialog.close = false;
	AnySign.setInfoDialog('show', true);
	
	var aGuideDialog = null;
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
			onconfirm: function (aKeyword) {
				inputpassDialog.dispose();
				element.focus();
				
				var _cb_setCertificate = function (aPWCheck) {
					if (aPWCheck == 0 || aPWCheck == 1) { 						_cb_exportCertRelayFromBrowser = function (aResult)
						{
							if (aGuideDialog) {
								aGuideDialog.dispose();
							}

							setOKButtonDisabled(false);

							if (__SANDBOX.isFailed(aResult, gErrCallback)) {
								if(gInputHandler) gInputHandler.clear();
								return;
							}

							__131.value = aAuthCode[0];
							__132.value = aAuthCode[1];
							__133.value = aAuthCode[2];

							__5.style.display = "none";
							__124.style.display = "block";
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

												_next_savepasswd = function ()
						{
							var aSavePasswdModule= __SANDBOX.loadModule("savepasswd");
							aSavePasswdDialog = aSavePasswdModule({
								args: {messageType: "import", inputType: "lite"},
								onconfirm: function (aNewKeyword) {
									aSavePasswdDialog.dispose();

									aAuthCode = createRandomAuth();
									var aTotalAuthCode = "";
									aAuthCode.forEach (function (num) {
										aTotalAuthCode += num;
									});

									_show_guidewindow();

									__SANDBOX.upInterface().exportCertRelayFromBrowser (AnySign.mCertRelayFromBrowserServerUrl,
																						aTotalAuthCode,
																						gSelectedSubjectRDN,
																						gSelectedCertSerial,
																						aKeyword,
																						aNewKeyword,
																						AnySign.mWithCredentialsForCORS,
																						_cb_exportCertRelayFromBrowser);
								},
								oncancel: function () {
									aSavePasswdDialog.dispose();
									setOKButtonDisabled(false);
								}
							});
							aSavePasswdDialog.show();
						}

						_next_savepasswd();
					} else {
						var aErrorObject = __SANDBOX.upInterface().setErrCodeAndMsg();
						if (aErrorObject.code == XW_ERROR_VERIFYPASSWORD) {
							alert(XWC.S.keyworderror);
						} else {
							alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
						}
					}
				}
				
				__SANDBOX.upInterface().setCertificate (aPfx, aSignCert, aSignKey, aKmCert, aKmKey, aKeyword, aIsSavePFX, gSearchCondition, gCAList, gCertSerial, _cb_setCertificate);
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
		var oldzIndex;
		var informationDialog = document.getElementById('xwup_title_information');
		if (informationDialog) {
			informationDialog = informationDialog.parentNode.parentNode;
			oldzIndex = informationDialog.style.zIndex;
		}

		var pfxModule = __SANDBOX.loadModule("pfxdialog");
		var pfxDialog = pfxModule({
			onconfirm: function (aPFX, aSignCert, aSignKey, aKmCert, aKmKey) {
				pfxDialog.dispose();
				openPasswdDialog(aPFX, aSignCert, aSignKey, aKmCert, aKmKey);
				if (informationDialog) informationDialog.style.zIndex = oldzIndex;
			},
			oncancel: function () {
				pfxDialog.dispose();
				element.focus();
				AnySign.mDivInsertOption = pageDivInsertOption;
				if (informationDialog) informationDialog.style.zIndex = oldzIndex;
			}
		});

		pfxDialog.show();
		if (informationDialog) informationDialog.style.zIndex = __SANDBOX.addDialogOffset() - 9;
	}
	
	AnySign.setInfoDialog('show', true);
	_pfxdialogOpen();
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
		else if (pageDivInsertOption > 0)
		{
			alert(XWC.S.sign_complete_msg + "\n" + XWC.S.go_next_step_msg);
			__112.style.display = 'none';
			
			__120.style.display = 'none';
		}
		
		_callback = function ()
		{
			if(gInputHandler) gInputHandler.clear();
			AnySign.mAnySignEnable = aAnySignEnable;
		}
		
		AnySign.setInfoDialog();
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

function refreshTableView(aCertList) {
	var aList;

	__90.style.display = "none";

	gSelectedSubjectRDN = null;
	gSelectedIssuerRDN = null;
	gSelectedCertSerial = null;
	gSelectedCertClass = null;
	gSelectedRowIndex = null;
	gSelectedCertSource = null;

	aList = stringToCertList(aCertList);

	if (gFilter) {
		gFilter(aList);
	}

	gCertTableView.refresh(aList);
	
		try {
		if(gInputHandler) gInputHandler.clear();
	} catch (e) {
			}
	
		setTimeout (function () {
		try {
			if(gInputHandler) gInputHandler.refresh();
		} catch (e) {
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
	
	__110.style.display = 'none';
	__120.style.display = 'none';
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
		__110.style.display = 'none';
		__120.style.display = 'none';
	} else {
				__120.style.display = '';
	}

	if (AnySign.mWBStyleApply) {
		if (AnySign.mPlatform == AnySign.mPlatformList[0] ||AnySign.mPlatform == AnySign.mPlatformList[1] || (__SANDBOX.browserName == "opera" && __SANDBOX.browserVersion >= 12.0))
		{
			__112.readOnly = true;
			__114.checked = true;
			__114.disabled = true;
			exportcertrelay_tk1.useTransKey = true;
		}
	}
	
	return aKeywordInputEnable;
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

function onInputMouseCheckBoxClick (aEvent)
{
	var aChecked = false;
	var aTransKey = false;

	aEvent = aEvent || window.event;

	var objMouseBtn = __114;
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

	aTransKey = exportcertrelay_tk1;

	if (aChecked)
	{
		aTransKey.useTransKey = true;
		__112.readOnly = true;
		showTransKeyBtn ("exportcertrelay_tk1");
		aTransKey.clear ();
	}
	else
	{
		aTransKey.useTransKey = false;
		__112.readOnly = false;
		aTransKey.clear ();
		aTransKey.close ();
	}

	if (!exportcertrelay_tk1.useTransKey && aChecked == null)
	{
		aTransKey.useTransKey = true;
		__112.readOnly = true;
		showTransKeyBtn ("exportcertrelay_tk1");
		aTransKey.clear ();
	}
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
	
	__110.style.display = '';
	
	if (aInputType == "lite") {
		__110.style.display = 'none';
		__115.style.display = '';
		aElement = __117;
		gInputHandler = gInputHandler_lite;
	} else {
		__110.style.display = '';
		__115.style.display = 'none';
		aElement = __112;
		gInputHandler = gInputHandler_4pc;
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
	if (__SANDBOX.IEVersion == 8) {
		gInputHandler_4pc = new __SANDBOX.inputKeyHandler("exportcertrelay", __112, 1, -122, -3, "qwerty_crt", 30, 110);
	} else {
		if (AnySign.mWBStyleApply)
			gInputHandler_4pc = new __SANDBOX.inputKeyHandler("exportcertrelay", __112, 1, -120, 5, "qwerty_crt", 30, 170);
		else
			gInputHandler_4pc = new __SANDBOX.inputKeyHandler("exportcertrelay", __112, 1, -120, 5, "qwerty_crt", 30, 110);
	}

	gInputHandler_4pc.onComplete({
		ok : function () {
			if (AnySign.mDivInsertOption < 1) {
				if (onNextButtonClick(null) == false) {
					return false;
				}
			}
		},
		close : function () {
			if (AnySign.mDivInsertOption < 1) {
				gInputHandler_4pc.clear(); 
			}
		}
	});
	
	gInputHandler = gInputHandler_4pc;
	
	if (setPasswordInputEnable()) {
		gInputHandler_4pc.onEnterKeyPress(__123);
	}
}

function createInputHandler_lite()
{
	if (__SANDBOX.IEVersion == 8) {
		gInputHandler_lite = new __SANDBOX.inputKeyHandler("exportcertrelay", __117, 1, -122, -3, "qwerty_crt", 30, 110, "lite");
	} else {
		if (AnySign.mWBStyleApply)
			gInputHandler_lite = new __SANDBOX.inputKeyHandler("exportcertrelay", __117, 1, -120, 5, "qwerty_crt", 30, 170, "lite");
		else
			gInputHandler_lite = new __SANDBOX.inputKeyHandler("exportcertrelay", __117, 1, -120, 5, "qwerty_crt", 30, 110, "lite");
	}

	gInputHandler_lite.onComplete({
		ok : function () {
			if (AnySign.mDivInsertOption < 1) {
				if (onNextButtonClick(null) == false) {
					return false;
				}
			}
		},
		close : function () {
			if (AnySign.mDivInsertOption < 1) {
				gInputHandler_lite.clear();
			}
		}
	});

	gInputHandler = gInputHandler_lite;

	if (setPasswordInputEnable()) {
		gInputHandler_lite.onEnterKeyPress(__123);
	}
}

function setDragAndDropElement (aDisplay, aCertList) {
	var aGuideZone = document.getElementById("xwup_drag_guide");
	if (aGuideZone == null) {
		return;
	}

	if (!aDisplay) {
		aGuideZone.style.display = "none";
		return;
	}

	AnySign.mShowInfoDialog.close = false;
	AnySign.setInfoDialog('show');
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
		aGuideZone.classList.remove ('xwup-drag-guide-exportcertrelay2');
		aGuideZone.childNodes[0].style.visibility = "visible";
		aGuideZone.childNodes[1].style.visibility = "visible";
	} else {
		aGuideZone.classList.add ('xwup-drag-guide-exportcertrelay2');
		aGuideZone.childNodes[0].style.visibility = "hidden";
		aGuideZone.childNodes[1].style.visibility = "hidden";
	}
}

function createRandomAuth () {
	var aNumber = new Array();
	var cn = 0;

	create = function () {
		return parseInt((window.crypto || window.msCrypto).getRandomValues(new Uint16Array(1)) % 9999);
	}

	while (aNumber.length < 3) {
		var n = create();
		if (n.toString().length != 4)
			continue;
		if (aNumber.indexOf(n) < 0)
			aNumber.push(n);
	}

	return aNumber;
}

function setTranskeyXYPosition(aElement) {
	var aElementPosition = aElement.getBoundingClientRect();
	var aInputTransKeyXY = parseInt(aElementPosition.left) + " " + (parseInt(aElementPosition.top) + parseInt(aElement.offsetHeight) + parseInt(window.pageYOffset));
	aElement.setAttribute ("data-tk-kbdxy", aInputTransKeyXY);
}

var __1 = XWC.UI.createElement('DIV');
__1.setAttribute('role', 'dialog', 0);
__1.style.width = '450px';
var __2 = XWC.UI.createElement('DIV');
__2.setAttribute('title', XWC.S.title, 0);
__2.setAttribute('id', 'xwup_title', 0);
__2.className = 'xwup-title xwup-title2';
var __3 = XWC.UI.createElement('H3');
__2.appendChild(__3);
var __4 = XWC.UI.createElement('TEXTAREA');
__4.setAttribute('tabindex', '3', 0);
__4.setAttribute('title', XWC.S.xvvcursor_guide, 0);
__4.setAttribute('id', 'xwup_xvvcursor_disabled', 0);
__4.className = 'blank0';
__4.setAttribute('disabled', 'disabled', 0);
__2.appendChild(__4);
__1.appendChild(__2);
var __5 = XWC.UI.createElement('DIV');
__5.setAttribute('id', 'xwup_body', 0);
__5.className = 'xwup-body';
var __6 = XWC.UI.createElement('DIV');
__6.className = 'blank10_relay';
__6.appendChild(document.createTextNode(XWC.S.step_1));
__5.appendChild(__6);
var __7 = XWC.UI.createElement('FIELDSET');
__7.setAttribute('role', 'radiogroup', 0);
__7.className = 'xwup-location-item-relay';
var __8 = XWC.UI.createElement('LEGEND');
if (__SANDBOX.IEVersion == 8) {
__8.style.display = 'block';
}
__8.setAttribute('id', 'xwup_legend_location_item', 0);
__8.className = 'xwup-legend-relay';
__8.appendChild(document.createTextNode(XWC.S.media_location));
__7.appendChild(__8);
var __9 = XWC.UI.createElement('TABLE');
__9.setAttribute('cellpadding', '0', 0);
__9.setAttribute('cellspacing', '0', 0);
__9.className = 'xwup-cert-position';
__9.style.width = '400px';
var __10 = XWC.UI.createElement('CAPTION');
__10.appendChild(document.createTextNode(XWC.S.media_location));
__9.appendChild(__10);
var __11 = XWC.UI.createElement('TBODY');
var __12 = XWC.UI.createElement('TR');
var __13 = XWC.UI.createElement('TD');
__13.setAttribute('id', 'xwup_location_1', 0);
__13.style.display = 'none';
__12.appendChild(__13);
var __14 = XWC.UI.createElement('TD');
__14.setAttribute('id', 'xwup_location_2', 0);
__14.style.display = 'none';
__12.appendChild(__14);
var __15 = XWC.UI.createElement('TD');
__15.setAttribute('id', 'xwup_location_3', 0);
__15.style.display = 'none';
__12.appendChild(__15);
var __16 = XWC.UI.createElement('TD');
__16.setAttribute('id', 'xwup_location_4', 0);
__16.style.display = 'none';
__12.appendChild(__16);
var __17 = XWC.UI.createElement('TD');
__17.setAttribute('id', 'xwup_location_5', 0);
__17.style.display = 'none';
__12.appendChild(__17);
var __18 = XWC.UI.createElement('TD');
__18.setAttribute('id', 'xwup_location_6', 0);
__18.style.display = 'none';
__12.appendChild(__18);
var __19 = XWC.UI.createElement('TD');
__19.setAttribute('id', 'xwup_location_7', 0);
__19.style.display = 'none';
__12.appendChild(__19);
var __20 = XWC.UI.createElement('TD');
__20.setAttribute('id', 'xwup_location_8', 0);
__20.style.display = 'none';
__12.appendChild(__20);
var __21 = XWC.UI.createElement('TD');
__21.setAttribute('id', 'xwup_location_9', 0);
__21.style.display = 'none';
__12.appendChild(__21);
var __22 = XWC.UI.createElement('TD');
__22.setAttribute('id', 'xwup_location_10', 0);
__22.style.display = 'none';
__12.appendChild(__22);
var __23 = XWC.UI.createElement('TD');
__23.setAttribute('id', 'xwup_location_11', 0);
__23.style.display = 'none';
__12.appendChild(__23);
var __24 = XWC.UI.createElement('TD');
__24.setAttribute('id', 'xwup_location_12', 0);
__24.style.display = 'none';
__12.appendChild(__24);
var __25 = XWC.UI.createElement('TD');
__25.setAttribute('id', 'xwup_location_13', 0);
__25.style.display = 'none';
__12.appendChild(__25);
var __26 = XWC.UI.createElement('TD');
__26.setAttribute('id', 'xwup_location_14', 0);
__26.style.display = 'none';
__12.appendChild(__26);
var __27 = XWC.UI.createElement('TD');
__27.setAttribute('id', 'xwup_location_15', 0);
__27.style.display = 'none';
__12.appendChild(__27);
var __28 = XWC.UI.createElement('TD');
__28.setAttribute('id', 'xwup_location_right', 0);
__28.style.display = 'none';
var __29 = XWC.UI.createElement('BUTTON');
__29.setAttribute('tabindex', '3', 0);
__29.setAttribute('type', 'button', 0);
__29.setAttribute('id', 'xwup_media_right', 0);
__29.style.width = '18px';
__29.style.height = '29px';
__29.style.border = '0px';
__29.style.margin = '1px';
__29.style.padding = '3px';
__29.setAttribute('title', XWC.S.media_right_title, 0);
__29.onclick = function(event) {onMediaRight(this);};
var __30 = XWC.UI.createElement('SPAN');
__30.style.height = '9px';
__30.className = 'xwup-ico-arrow-right';
__29.appendChild(__30);
__28.appendChild(__29);
var __31 = XWC.UI.createElement('BUTTON');
__31.setAttribute('tabindex', '3', 0);
__31.setAttribute('type', 'button', 0);
__31.setAttribute('id', 'xwup_media_left', 0);
__31.style.width = '18px';
__31.style.height = '29px';
__31.style.border = '0px';
__31.style.margin = '1px';
__31.style.padding = '3px';
__31.setAttribute('title', XWC.S.media_left_title, 0);
__31.onclick = function(event) {onMediaLeft(this);};
var __32 = XWC.UI.createElement('SPAN');
__32.style.height = '9px';
__32.className = 'xwup-ico-arrow-left-disabled';
__31.appendChild(__32);
__28.appendChild(__31);
__12.appendChild(__28);
var __33 = XWC.UI.createElement('BUTTON');
__33.setAttribute('role', 'radio', 0);
__33.setAttribute('aria-checked', 'false', 0);
__33.setAttribute('type', 'button', 0);
__33.setAttribute('tabindex', '3', 0);
__33.style.display = 'none';
__33.setAttribute('id', 'xwup_media_localstorage', 0);
__33.onclick = function(event) {onLocalStorageButtonClick(this);};
__33.setAttribute('title', XWC.S.media_localstorage, 0);
var __34 = XWC.UI.createElement('SPAN');
__34.className = 'xwup-ico-localstorage';
__33.appendChild(__34);
var __35 = XWC.UI.createElement('SPAN');
__35.className = 'xwup-rbg-text';
__35.appendChild(document.createTextNode(XWC.S.media_localstorage));
__33.appendChild(__35);
__12.appendChild(__33);
var __36 = XWC.UI.createElement('BUTTON');
__36.setAttribute('role', 'radio', 0);
__36.setAttribute('aria-checked', 'false', 0);
__36.setAttribute('type', 'button', 0);
__36.setAttribute('tabindex', '3', 0);
__36.style.display = 'none';
__36.setAttribute('id', 'xwup_media_memorystorage', 0);
__36.onclick = function(event) {onMemoryStorageButtonClick(this);};
__36.setAttribute('title', XWC.S.media_memorystorage, 0);
var __37 = XWC.UI.createElement('SPAN');
__37.className = 'xwup-ico-memorystorage';
__36.appendChild(__37);
var __38 = XWC.UI.createElement('SPAN');
__38.className = 'xwup-rbg-text';
__38.appendChild(document.createTextNode(XWC.S.media_memorystorage));
__36.appendChild(__38);
__12.appendChild(__36);
var __39 = XWC.UI.createElement('BUTTON');
__39.setAttribute('role', 'radio', 0);
__39.setAttribute('aria-checked', 'false', 0);
__39.setAttribute('type', 'button', 0);
__39.setAttribute('tabindex', '3', 0);
__39.style.display = 'none';
__39.setAttribute('id', 'xwup_media_hdd', 0);
__39.onclick = function(event) {onHddButtonClick(this);};
__39.setAttribute('title', XWC.S.media_hdd, 0);
var __40 = XWC.UI.createElement('SPAN');
__40.className = 'xwup-ico-hdd';
__39.appendChild(__40);
var __41 = XWC.UI.createElement('SPAN');
__41.className = 'xwup-rbg-text';
__41.appendChild(document.createTextNode(XWC.S.media_hdd));
__39.appendChild(__41);
__12.appendChild(__39);
var __42 = XWC.UI.createElement('BUTTON');
__42.setAttribute('role', 'radio', 0);
__42.setAttribute('aria-checked', 'false', 0);
__42.setAttribute('type', 'button', 0);
__42.setAttribute('tabindex', '3', 0);
__42.style.display = 'none';
__42.setAttribute('id', 'xwup_media_removable', 0);
__42.onclick = function(event) {onRemovableButtonClick(this);};
__42.setAttribute('title', XWC.S.media_removable, 0);
var __43 = XWC.UI.createElement('SPAN');
__43.className = 'xwup-ico-removable';
__42.appendChild(__43);
var __44 = XWC.UI.createElement('SPAN');
__44.className = 'xwup-rbg-text';
__44.appendChild(document.createTextNode(XWC.S.media_removable));
__42.appendChild(__44);
__12.appendChild(__42);
var __45 = XWC.UI.createElement('BUTTON');
__45.setAttribute('role', 'radio', 0);
__45.setAttribute('aria-checked', 'false', 0);
__45.setAttribute('type', 'button', 0);
__45.setAttribute('tabindex', '3', 0);
__45.style.display = 'none';
__45.setAttribute('id', 'xwup_media_savetoken', 0);
__45.onclick = function(event) {onSaveTokenButtonClick(this);};
__45.setAttribute('title', XWC.S.media_savetoken, 0);
var __46 = XWC.UI.createElement('SPAN');
__46.className = 'xwup-ico-savetoken';
__45.appendChild(__46);
var __47 = XWC.UI.createElement('SPAN');
__47.className = 'xwup-rbg-text';
__47.appendChild(document.createTextNode(XWC.S.media_savetoken));
__45.appendChild(__47);
__12.appendChild(__45);
var __48 = XWC.UI.createElement('BUTTON');
__48.setAttribute('role', 'radio', 0);
__48.setAttribute('aria-checked', 'false', 0);
__48.setAttribute('type', 'button', 0);
__48.setAttribute('tabindex', '3', 0);
__48.style.display = 'none';
__48.setAttribute('id', 'xwup_media_pkcs11', 0);
__48.onclick = function(event) {onHSMButtonClick(this);};
__48.setAttribute('title', XWC.S.open_layer + XWC.S.media_pkcs11, 0);
var __49 = XWC.UI.createElement('SPAN');
__49.className = 'xwup-ico-pkcs11';
__48.appendChild(__49);
var __50 = XWC.UI.createElement('SPAN');
__50.className = 'xwup-rbg-text';
__50.appendChild(document.createTextNode(XWC.S.media_pkcs11));
__48.appendChild(__50);
__12.appendChild(__48);
var __51 = XWC.UI.createElement('BUTTON');
__51.setAttribute('role', 'radio', 0);
__51.setAttribute('aria-checked', 'false', 0);
__51.setAttribute('type', 'button', 0);
__51.setAttribute('tabindex', '3', 0);
__51.style.display = 'none';
__51.setAttribute('id', 'xwup_media_mobile', 0);
__51.onclick = function(event) {onMobileButtonClick(this);};
__51.setAttribute('title', XWC.S.media_mobile, 0);
var __52 = XWC.UI.createElement('SPAN');
__52.className = 'xwup-ico-mobile';
__51.appendChild(__52);
var __53 = XWC.UI.createElement('SPAN');
__53.className = 'xwup-rbg-text';
__53.appendChild(document.createTextNode(XWC.S.media_mobile));
__51.appendChild(__53);
__12.appendChild(__51);
var __54 = XWC.UI.createElement('BUTTON');
__54.setAttribute('role', 'radio', 0);
__54.setAttribute('aria-checked', 'false', 0);
__54.setAttribute('type', 'button', 0);
__54.setAttribute('tabindex', '3', 0);
__54.style.display = 'none';
__54.setAttribute('id', 'xwup_media_smartcert', 0);
__54.onclick = function(event) {onSmartCertButtonClick(this);};
__54.setAttribute('title', XWC.S.media_smartcert, 0);
var __55 = XWC.UI.createElement('SPAN');
__55.className = 'xwup-ico-smartcert';
__54.appendChild(__55);
var __56 = XWC.UI.createElement('SPAN');
__56.className = 'xwup-rbg-text';
__56.appendChild(document.createTextNode(XWC.S.media_smartcert));
__54.appendChild(__56);
__12.appendChild(__54);
var __57 = XWC.UI.createElement('BUTTON');
__57.setAttribute('role', 'radio', 0);
__57.setAttribute('aria-checked', 'false', 0);
__57.setAttribute('type', 'button', 0);
__57.setAttribute('tabindex', '3', 0);
__57.style.display = 'none';
__57.setAttribute('id', 'xwup_media_securedisk', 0);
__57.onclick = function(event) {onSecureDiskButtonClick(this);};
__57.setAttribute('title', XWC.S.media_securedisk, 0);
var __58 = XWC.UI.createElement('SPAN');
__58.className = 'xwup-ico-securedisk';
__57.appendChild(__58);
var __59 = XWC.UI.createElement('SPAN');
__59.className = 'xwup-rbg-text';
__59.appendChild(document.createTextNode(XWC.S.media_securedisk));
__57.appendChild(__59);
__12.appendChild(__57);
var __60 = XWC.UI.createElement('BUTTON');
__60.setAttribute('role', 'radio', 0);
__60.setAttribute('aria-checked', 'false', 0);
__60.setAttribute('type', 'button', 0);
__60.setAttribute('tabindex', '3', 0);
__60.style.display = 'none';
__60.setAttribute('id', 'xwup_media_xfs', 0);
__60.onclick = function(event) {onXecureFreeSignButtonClick(this);};
__60.setAttribute('title', XWC.S.media_xfs, 0);
var __61 = XWC.UI.createElement('SPAN');
__61.className = 'xwup-ico-xfs';
__60.appendChild(__61);
var __62 = XWC.UI.createElement('SPAN');
__62.className = 'xwup-rbg-text';
__62.appendChild(document.createTextNode(XWC.S.media_xfs));
__60.appendChild(__62);
__12.appendChild(__60);
var __63 = XWC.UI.createElement('BUTTON');
__63.setAttribute('role', 'radio', 0);
__63.setAttribute('aria-checked', 'false', 0);
__63.setAttribute('type', 'button', 0);
__63.setAttribute('tabindex', '3', 0);
__63.style.display = 'none';
__63.setAttribute('id', 'xwup_media_webpage', 0);
__63.onclick = function(event) {onWebPageButtonClick(this);};
__63.setAttribute('title', XWC.S.media_webpage, 0);
var __64 = XWC.UI.createElement('SPAN');
__64.className = 'xwup-ico-xfs';
__63.appendChild(__64);
var __65 = XWC.UI.createElement('SPAN');
__65.className = 'xwup-rbg-text';
__65.appendChild(document.createTextNode(XWC.S.media_webpage));
__63.appendChild(__65);
__12.appendChild(__63);
var __66 = XWC.UI.createElement('BUTTON');
__66.setAttribute('role', 'radio', 0);
__66.setAttribute('aria-checked', 'false', 0);
__66.setAttribute('type', 'button', 0);
__66.setAttribute('tabindex', '3', 0);
__66.style.display = 'none';
__66.setAttribute('id', 'xwup_media_nfciccard', 0);
__66.onclick = function(event) {onNFCICCardButtonClick(this);};
__66.setAttribute('title', XWC.S.media_nfciccard, 0);
var __67 = XWC.UI.createElement('SPAN');
__67.className = 'xwup-ico-nfciccard';
__66.appendChild(__67);
var __68 = XWC.UI.createElement('SPAN');
__68.className = 'xwup-rbg-text';
__68.appendChild(document.createTextNode(XWC.S.media_nfciccard));
__66.appendChild(__68);
__12.appendChild(__66);
__11.appendChild(__12);
__9.appendChild(__11);
__7.appendChild(__9);
__5.appendChild(__7);
var __69 = XWC.UI.createElement('DIV');
__69.setAttribute('tabindex', '3', 0);
__69.setAttribute('id', 'xwup_cert_table', 0);
__69.setAttribute('title', XWC.S.certtable, 0);
__69.setAttribute('role', 'application', 0);
__69.className = 'xwup-tableview';
__69.style.width = '408px';
var __70 = XWC.UI.createElement('TABLE');
__70.setAttribute('cellpadding', '0', 0);
__70.setAttribute('cellspacing', '0', 0);
__70.setAttribute('role', 'grid', 0);
__70.setAttribute('summary', XWC.S.table_summary, 0);
var __71 = XWC.UI.createElement('CAPTION');
__71.appendChild(document.createTextNode(XWC.S.certtable));
__70.appendChild(__71);
var __72 = XWC.UI.createElement('THEAD');
var __73 = XWC.UI.createElement('TR');
var __74 = XWC.UI.createElement('TH');
__74.setAttribute('role', 'columnheader', 0);
__74.setAttribute('scope', 'col', 0);
__74.className = 'xwup-mcert';
__74.setAttribute('sortType', 'IT', 0);
__74.style.width = '82px';
var __75 = XWC.UI.createElement('DIV');
__75.className = 'wide-cert-table-resizearea';
__75.appendChild(document.createTextNode(XWC.S.table_section));
var __76 = XWC.UI.createElement('DIV');
__75.appendChild(__76);
__74.appendChild(__75);
__73.appendChild(__74);
var __77 = XWC.UI.createElement('TH');
__77.setAttribute('role', 'columnheader', 0);
__77.setAttribute('scope', 'col', 0);
__77.className = 'xwup-mcert2';
__77.setAttribute('sortType', 'T', 0);
__77.style.width = '164px';
var __78 = XWC.UI.createElement('DIV');
__78.className = 'wide-cert-table-resizearea';
__78.appendChild(document.createTextNode(XWC.S.table_user));
var __79 = XWC.UI.createElement('DIV');
__78.appendChild(__79);
__77.appendChild(__78);
__73.appendChild(__77);
var __80 = XWC.UI.createElement('TH');
__80.setAttribute('role', 'columnheader', 0);
__80.setAttribute('scope', 'col', 0);
__80.className = 'xwup-mcert3';
__80.setAttribute('sortType', 'T', 0);
__80.style.width = '82px';
var __81 = XWC.UI.createElement('DIV');
__81.className = 'wide-cert-table-resizearea';
__81.appendChild(document.createTextNode(XWC.S.table_expire));
var __82 = XWC.UI.createElement('DIV');
__81.appendChild(__82);
__80.appendChild(__81);
__73.appendChild(__80);
var __83 = XWC.UI.createElement('TH');
__83.setAttribute('role', 'columnheader', 0);
__83.setAttribute('scope', 'col', 0);
__83.className = 'xwup-mcert4';
__83.setAttribute('sortType', 'T', 0);
__83.style.width = '82px';
var __84 = XWC.UI.createElement('DIV');
__84.className = 'wide-cert-table-resizearea';
__84.appendChild(document.createTextNode(XWC.S.table_issuer));
var __85 = XWC.UI.createElement('DIV');
__84.appendChild(__85);
__83.appendChild(__84);
__73.appendChild(__83);
__72.appendChild(__73);
__70.appendChild(__72);
var __86 = XWC.UI.createElement('TBODY');
var __87 = XWC.UI.createElement('TR');
var __88 = XWC.UI.createElement('TD');
__87.appendChild(__88);
__86.appendChild(__87);
__70.appendChild(__86);
__69.appendChild(__70);
__5.appendChild(__69);
var __89 = XWC.UI.createElement('DIV');
__89.className = 'xwup-widget-sec';
var __90 = XWC.UI.createElement('DIV');
__90.setAttribute('id', 'xwup_expire_alert', 0);
__90.className = 'xwup-expire-alert';
var __91 = XWC.UI.createElement('DIV');
__91.className = 'xwup-expire-icon';
var __92 = XWC.UI.createElement('IMG');
__92.setAttribute('src', AnySign.mBasePath+'/img/cert1.png', 0);
__92.setAttribute('width', '18', 0);
__92.setAttribute('height', '16', 0);
__92.setAttribute('alt', XWC.S.cert_status1, 0);
__91.appendChild(__92);
__90.appendChild(__91);
var __93 = XWC.UI.createElement('DIV');
__93.setAttribute('id', 'xwup_expire_message', 0);
__93.className = 'xwup-expire-message';
__93.appendChild(document.createTextNode(XWC.S.willbeexpired));
__90.appendChild(__93);
var __94 = XWC.UI.createElement('DIV');
__94.className = 'xwup-renew-message';
__94.appendChild(document.createTextNode(XWC.S.renewplease1));
var __95 = XWC.UI.createElement('BR');
__94.appendChild(__95);
__94.appendChild(document.createTextNode(XWC.S.renewplease2));
__90.appendChild(__94);
var __96 = XWC.UI.createElement('DIV');
__96.setAttribute('id', 'xwup_expire_arrow_border', 0);
__96.className = 'xwup-expire-arrow-border';
__90.appendChild(__96);
var __97 = XWC.UI.createElement('DIV');
__97.setAttribute('id', 'xwup_expire_arrow', 0);
__97.className = 'xwup-expire-arrow';
__90.appendChild(__97);
__89.appendChild(__90);
var __98 = XWC.UI.createElement('DIV');
__98.setAttribute('id', 'xwup_capslock', 0);
__98.className = 'xwup-expire-alert';
__98.style.display = 'none';
var __99 = XWC.UI.createElement('SPAN');
__99.className = 'fb';
__99.appendChild(document.createTextNode(XWC.S.tooltip_capslock1));
__98.appendChild(__99);
var __100 = XWC.UI.createElement('SPAN');
__100.className = 'fc';
__100.appendChild(document.createTextNode(XWC.S.tooltip_capslock2));
__98.appendChild(__100);
var __101 = XWC.UI.createElement('DIV');
__101.setAttribute('id', 'xwup_capslock_arrow_border', 0);
__101.className = 'xwup-expire-arrow-border';
__98.appendChild(__101);
var __102 = XWC.UI.createElement('DIV');
__102.setAttribute('id', 'xwup_capslock_arrow', 0);
__102.className = 'xwup-expire-arrow';
__98.appendChild(__102);
__89.appendChild(__98);
__5.appendChild(__89);
var __103 = XWC.UI.createElement('DIV');
__103.className = 'xwup-content-box-relay';
var __104 = XWC.UI.createElement('TABLE');
__104.setAttribute('cellpadding', '0', 0);
__104.setAttribute('cellspacing', '0', 0);
__104.setAttribute('border', '0', 0);
var __105 = XWC.UI.createElement('CAPTION');
__105.appendChild(document.createTextNode(XWC.S.table_manager));
__104.appendChild(__105);
var __106 = XWC.UI.createElement('TBODY');
var __107 = XWC.UI.createElement('TR');
var __108 = XWC.UI.createElement('TD');
__108.style.verticalAlign = 'middle';
var __109 = XWC.UI.createElement('FORM');
if (__SANDBOX.IEVersion <= 8) {
__109.mergeAttributes(XWC.UI.createElement("<FORM name='xwup_exportcertrelay_tek_form'>"),false);
} else {
__109.setAttribute('name', 'xwup_exportcertrelay_tek_form', 0);
}
__109.setAttribute('id', 'xwup_exportcertrelay_tek_form', 0);
__109.className = 'xwup-exportcert-passwd';
__109.onsubmit = function(event) {return false;};
var __110 = XWC.UI.createElement('DIV');
__110.className = 'xwup-passwd-field-relay';
__110.setAttribute('id', 'exportcertrelay_tk1', 0);
var __111 = XWC.UI.createElement('LABEL');
__111.htmlFor = 'xwup_exportcertrelay_tek_input1';
__111.className = 'xwup-tit-pw';
__111.appendChild(document.createTextNode(XWC.S.passwd));
__110.appendChild(__111);
var __112 = XWC.UI.createElement('INPUT');
__112.setAttribute('type', 'password', 0);
__112.setAttribute('tabindex', '3', 0);
if (__SANDBOX.IEVersion <= 8) {
__112.mergeAttributes(XWC.UI.createElement("<INPUT name='exportcertrelay_tek_input1'>"),false);
} else {
__112.setAttribute('name', 'exportcertrelay_tek_input1', 0);
}
__112.setAttribute('id', 'xwup_exportcertrelay_tek_input1', 0);
__112.setAttribute('title', XWC.S.passwd, 0);
__112.className = 'xwup-pw-box';
__112.setAttribute('kbd', 'qwerty_crt', 0);
__110.appendChild(__112);
var __113 = XWC.UI.createElement('DIV');
__113.setAttribute('title', XWC.S.passwd, 0);
__113.setAttribute('id', 'xwup_exportcertrelay_fake_input1', 0);
__113.style.display = 'none';
__110.appendChild(__113);
var __114 = XWC.UI.createElement('INPUT');
__114.setAttribute('type', 'button', 0);
if (__SANDBOX.IEVersion <= 8) {
__114.mergeAttributes(XWC.UI.createElement("<INPUT name='exportcertrelay_tek_check1'>"),false);
} else {
__114.setAttribute('name', 'exportcertrelay_tek_check1', 0);
}
__114.setAttribute('tabindex', '3', 0);
__114.setAttribute('title', XWC.S.input_mouse, 0);
__114.setAttribute('id', 'xwup_exportcertrelay_tek_check1', 0);
__114.style.display = 'none';
__114.onclick = function(event) {onInputMouseCheckBoxClick();};
__110.appendChild(__114);
__109.appendChild(__110);
var __115 = XWC.UI.createElement('DIV');
__115.className = 'xwup-passwd-field-relay';
__115.setAttribute('id', 'exportcertrelay_lite_tk1', 0);
__115.style.display = 'none';
var __116 = XWC.UI.createElement('LABEL');
__116.htmlFor = 'xwup_exportcertrelay_lite_input1';
__116.className = 'xwup-tit-pw';
__116.appendChild(document.createTextNode(XWC.S.passwd));
__115.appendChild(__116);
var __117 = XWC.UI.createElement('INPUT');
__117.setAttribute('type', 'password', 0);
__117.setAttribute('tabindex', '3', 0);
if (__SANDBOX.IEVersion <= 8) {
__117.mergeAttributes(XWC.UI.createElement("<INPUT name='exportcertrelay_lite_input1'>"),false);
} else {
__117.setAttribute('name', 'exportcertrelay_lite_input1', 0);
}
__117.setAttribute('id', 'xwup_exportcertrelay_lite_input1', 0);
__117.setAttribute('title', XWC.S.passwd, 0);
__117.className = 'xwup-pw-box';
__115.appendChild(__117);
__109.appendChild(__115);
var __118 = XWC.UI.createElement('DIV');
__118.setAttribute('id', 'xwup_exportcertrelay_tek_guide', 0);
__118.className = 'xwup-passwd-field-relay';
var __119 = XWC.UI.createElement('IMG');
__119.setAttribute('src', AnySign.mBasePath+'/img/bu.png', 0);
__119.setAttribute('width', '16', 0);
__119.setAttribute('height', '16', 0);
__119.setAttribute('alt', XWC.S.exclamation_img, 0);
__118.appendChild(__119);
var __120 = XWC.UI.createElement('SPAN');
__120.setAttribute('id', 'xwup_exportcertrelay_tek_guide_msg1', 0);
__120.appendChild(document.createTextNode(XWC.S.input_guide));
__118.appendChild(__120);
__109.appendChild(__118);
__108.appendChild(__109);
__107.appendChild(__108);
__106.appendChild(__107);
__104.appendChild(__106);
__103.appendChild(__104);
__5.appendChild(__103);
var __121 = XWC.UI.createElement('DIV');
__121.className = 'xwup-buttons-layout';
var __122 = XWC.UI.createElement('BUTTON');
__122.setAttribute('type', 'button', 0);
__122.setAttribute('tabindex', '3', 0);
__122.setAttribute('id', 'xwup_CancelButton', 0);
__122.onclick = function(event) {onCancelButtonClick(event)};
__122.appendChild(document.createTextNode(XWC.S.button_cancel));
__121.appendChild(__122);
var __123 = XWC.UI.createElement('BUTTON');
__123.setAttribute('type', 'button', 0);
__123.setAttribute('tabindex', '3', 0);
__123.setAttribute('id', 'xwup_NextButton', 0);
__123.onclick = function(event) {onNextButtonClick(event)};
__123.appendChild(document.createTextNode(XWC.S.button_next));
__121.appendChild(__123);
__5.appendChild(__121);
__1.appendChild(__5);
var __124 = XWC.UI.createElement('DIV');
__124.setAttribute('id', 'xwup_body2', 0);
__124.className = 'xwup-body';
__124.style.display = 'none';
var __125 = XWC.UI.createElement('DIV');
__125.className = 'blank10_relay';
__125.appendChild(document.createTextNode(XWC.S.step_2));
__124.appendChild(__125);
var __126 = XWC.UI.createElement('DIV');
__126.className = 'xwup-code-field';
var __127 = XWC.UI.createElement('UL');
var __128 = XWC.UI.createElement('LI');
var __129 = XWC.UI.createElement('DIV');
__129.className = 'xwup-code-field-content';
__129.appendChild(document.createTextNode(XWC.S.code_text));
__128.appendChild(__129);
var __130 = XWC.UI.createElement('DIV');
var __131 = XWC.UI.createElement('INPUT');
__131.setAttribute('id', 'xwup_code_1', 0);
__131.setAttribute('tabindex', '3', 0);
__131.setAttribute('type', 'text', 0);
__131.className = 'xwup-code-box';
__131.setAttribute('title', XWC.S.code_1, 0);
__131.setAttribute('readonly', '', 0);
__130.appendChild(__131);
var __132 = XWC.UI.createElement('INPUT');
__132.setAttribute('id', 'xwup_code_2', 0);
__132.setAttribute('tabindex', '3', 0);
__132.setAttribute('type', 'text', 0);
__132.className = 'xwup-code-box';
__132.setAttribute('title', XWC.S.code_2, 0);
__132.setAttribute('readonly', '', 0);
__130.appendChild(__132);
var __133 = XWC.UI.createElement('INPUT');
__133.setAttribute('id', 'xwup_code_3', 0);
__133.setAttribute('tabindex', '3', 0);
__133.setAttribute('type', 'text', 0);
__133.className = 'xwup-code-box';
__133.setAttribute('title', XWC.S.code_3, 0);
__133.setAttribute('readonly', '', 0);
__130.appendChild(__133);
__128.appendChild(__130);
__127.appendChild(__128);
__126.appendChild(__127);
__124.appendChild(__126);
var __134 = XWC.UI.createElement('DIV');
__134.className = 'xwup-code-explain';
var __135 = XWC.UI.createElement('OL');
var __136 = XWC.UI.createElement('LI');
__136.style.fontWeight = 'bold';
__136.appendChild(document.createTextNode(XWC.S.info_title));
__135.appendChild(__136);
var __137 = XWC.UI.createElement('LI');
__137.appendChild(document.createTextNode(XWC.S.info_1));
__135.appendChild(__137);
var __138 = XWC.UI.createElement('LI');
__138.appendChild(document.createTextNode(XWC.S.info_2));
__135.appendChild(__138);
__134.appendChild(__135);
__124.appendChild(__134);
var __139 = XWC.UI.createElement('DIV');
__139.className = 'xwup-buttons-layout';
var __140 = XWC.UI.createElement('BUTTON');
__140.setAttribute('type', 'button', 0);
__140.setAttribute('tabindex', '3', 0);
__140.setAttribute('id', 'xwup_BackButton', 0);
__140.onclick = function(event) {onBackButtonClick(event)};
__140.appendChild(document.createTextNode(XWC.S.button_back));
__139.appendChild(__140);
var __141 = XWC.UI.createElement('BUTTON');
__141.setAttribute('type', 'button', 0);
__141.setAttribute('tabindex', '3', 0);
__141.setAttribute('id', 'xwup_OkButton', 0);
__141.onclick = function(event) {onOkButtonClick(event)};
__141.appendChild(document.createTextNode(XWC.S.button_end));
__139.appendChild(__141);
__124.appendChild(__139);
__1.appendChild(__124);
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
