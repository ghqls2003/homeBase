var __xcsimport = function(__SANDBOX) {
function loadDoc(gUITarget) {
var XCS = {
	$: function (id) {
		return document.getElementById(id);
	},

	namespace: function (aModuleName) {
		if (!XCS[aModuleName]) {
			XCS[aModuleName] = {};
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
		return XecureCertShare.mLanguage;
	},

	getLocaleResource: function (module, lang) {
		var req;
		if (window.XMLHttpRequest) {
			req = new window.XMLHttpRequest;
		} else {
			req = new ActiveXObject("MSXML2.XMLHTTP.3.0");
		}
		req.open('GET', XecureCertShare.mBasePath + "/locale/" + module + "_" + lang + ".js", false);
		req.send(null);
		XCS.S = eval(req.responseText);
	},
	
	getStyleResource: function (module, lang) {
		var req;
		if (window.XMLHttpRequest) {
			req = new window.XMLHttpRequest;
		} else {
			req = new ActiveXObject("MSXML2.XMLHTTP.3.0");
		}
		req.open('GET', XecureCertShare.mBasePath + "/css/" + module + "_" + lang + ".css", false);
		req.send(null);
		XCS.S = eval(req.responseText);
	},

	STR: function (id) {
		document.write(XCS.S[id]);
	},

	JSSTR: function (aID) {
		return XCS.S[aID];
	}
};

XCS.Util = {
	getCNFromRDN: function (rdn) {
		var base_position = rdn.indexOf("cn="),
			next_position = rdn.indexOf(",", base_position);

		if (base_position != -1) {
			base_position += 3;
		} else {
			base_position = rdn.indexOf("ou=");
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

	checkAuthcodeFormat: function (authcode) {
		var aCharCode;

		for (aIndex = 0; aIndex < authcode.length; aIndex++)
		{
			aCharCode = authcode.charCodeAt (aIndex);
			if (aCharCode < 48 || aCharCode > 57)
			{
				return false;
			}
		}

		return true;
	},

	checkPasswordFormat: function (passwd, passwdconfirm, confirm) {
		var containsChar, containsNum, i, aCharCode;
		containsChar = containsNum = false;

				if (passwd.length < 8 || passwd.length > 56) {
			alert(XCS.S.lengtherror);
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
			alert(XCS.S.syntaxerror);
			return false;
		}

		if (confirm && passwd != passwdconfirm) {
			alert(XCS.S.matcherror);
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
	}};


XCS.Event = {
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

XCS.UI = {};

XCS.UI.ImagePreloadHandler = (function () {
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

XCS.UI.createImage = function (aSrc) {
	var aImage = document.createElement("img");

	XCS.UI.ImagePreloadHandler.add (aImage);	
	aImage.src = aSrc;

	return aImage;
};

XCS.UI.findParent = function (aElement, aTagName) {
	var aParent = aElement;

	while (aParent) {
		if (aParent.tagName && (aParent.tagName.toUpperCase() == aTagName.toUpperCase())) {
			return aParent;
		}
		aParent = aParent.parentNode;
	}

	return;
};

XCS.UI.createElement = function (aTagName) {
	var aElement;

	if (__SANDBOX.isIE() && aTagName.indexOf("FORM") >= 0) {
		if (XCS.UI.findParent (gUITarget, "FORM")) {
			aTagName = aTagName.split("FORM").join("DIV");
		}
	}

	aElement = document.createElement(aTagName);

	aElement.style.cssText = XecureCertShare.mUISettings.mCSSDefault;

	return aElement;
};

XCS.UI.firstChildOf = function (aElement) {
	var temp = aElement.firstChild;
	return temp;
};

XCS.UI.nextSibling = function (aElement) {
	var temp = aElement.nextSibling;
	return temp;
};

XCS.UI.offset = function () {
	return __SANDBOX.dialogOffset + 2;
};
XCS.UI.RadioButtonGroup = function (aElements, aType) {
	var aTemp,
		aButtons = aElements,
		aButton,
		aSelectedButton,
		i;

	function __mouseover (e, thiz) {		
		if (aType != "wide") {
			thiz.className = "xcs-rbg-hover";
		}
		if (thiz.id == "xcs_media_removable")
			thiz.getElementsByTagName("span")[1].style.cssText += ';letter-spacing:-2px !important';
	}

	function __mouseout (e, thiz) {
		if (aType != "wide") {
			thiz.className = "xcs-rbg-normal";
		}
		if (thiz.id == "xcs_media_removable")
			thiz.getElementsByTagName("span")[1].style.cssText += ';letter-spacing:-2px !important';
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
				aSelectedButton.className = "xcs-wide-rbg";
			} else {
				aSelectedButton.className = "xcs-rbg-normal";
				if (aSelectedButton.id == "xcs_media_removable")
					aSelectedButton.getElementsByTagName("span")[1].style.cssText += ';letter-spacing:-2px !important';
				__addHoverAction (aSelectedButton);
				__removeHoverAction (this);
			}

			aSelectedButton.setAttribute("aria-checked", "false", 0);
		}

		if (aType == "wide") {
			this.className = "wide-xcs-rbg-pressed";
		} else {
			this.className = "xcs-rbg-pressed";
			if (this.id == "xcs_media_removable")
				this.getElementsByTagName("span")[1].style.cssText += ';letter-spacing:-2px !important';
			__removeHoverAction (this);
		}

		this.setAttribute("aria-checked", "true", 0);
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
		XCS.Event.dispatch(__indexOrElement(aIndexOrElement), "click");
	}

	function _setDisabled (aIndexOrElement, aDisable) {
		var aElement = __indexOrElement(aIndexOrElement);
		var aImage = aElement.getElementsByTagName("span")[0];
		var aText = aElement.getElementsByTagName("span")[1];

		if (aType == "wide") {
			aElement.style.color = "#000";
		} else {
			aElement.className = "xcs-rbg-disabled";
		}

		if (aElement.id == "xcs_media_removable")
			aText.style.cssText += ';letter-spacing:-2px !important';
		
		var bgname;
		if (aDisable) {
			if (aElement.getElementsByTagName("span")[0].className.indexOf("-disabled") < 0) {
				bgname = aElement.getElementsByTagName("span")[0].className;
				aElement.getElementsByTagName("span")[0].className = bgname + "-disabled";
			}
			aElement.setAttribute ("aria-disabled", "true", 0);
		} else {
			if (aElement.getElementsByTagName("span")[0].className.indexOf("-disabled") > -1) {
				bgname = aElement.getElementsByTagName("span")[0].className;
				aElement.getElementsByTagName("span")[0].className = bgname.split("-disabled")[0];
			}
			aElement.setAttribute ("aria-disabled", "false", 0);
		}
		aElement.disabled = aDisable;
		__removeHoverAction (aElement);
	}
	
	function _updateDisabled () {
		var i;

		for (i = 0; i < aButtons.length; i++) {
			if (aButtons[i].disabled) {
				_setDisabled(aButtons[i], true);
			}
		}
	}

	return {
		select: _select,
		setDisabled : _setDisabled,
		updateDisabled : _updateDisabled,
		setChecked: _setChecked
	}
};

XCS.UI.TabAdapter = function (element, eventfunction, firstSelectedIndex) {
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
	
	function onkeydownTab(e) {
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

		XCS.Event.stopPropagation(e);
		XCS.Event.preventDefault(e);
	}

		aTabNavButtonNodeList = element.getElementsByTagName("li");

	for (i = 0; i < aTabNavButtonNodeList.length; i++) {
		unselectTabIndex(i);

		aNavButton = aTabNavButtonNodeList[i];
		aNavButton.index = i;

		XCS.Event.add(aNavButton.firstChild, "click", onclickTab);
		XCS.Event.add(aNavButton, "keydown", onkeydownTab);
	}

		for (i = 0; i < aTabNavButtonNodeList.length; i++) {
		aTabNavButtonNodeList[i].setAttribute ("role", "tab", 0);
	}

	selectTabIndex(aSelectedTabIndex);

	return {
		getSelectedIndex : function() {
			return aSelectedTabIndex;
		},
		getSelectedElement : function() {
			return aTabNavButtonNodeList;
		}
	}
};

XCS.UI.appendTabControl = function (aElement, firstfocus) {
	var i,
		aTabableElements = [],
		aChildNodeList = aElement.getElementsByTagName('*'),
		aNode,
		aCurrentElementIndex = 0,
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
	
	function _keydownHandler (e) {
		e = e || window.event;
		var aKeyCode = e.which || e.keyCode;

		if (aKeyCode == 9) {
			if (e.shiftKey) {
				_previousFocus();
			} else {
				_nextFocus();
			}

			XCS.Event.stopPropagation(e);
			XCS.Event.preventDefault(e);
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

	aOldKeydownEventListner = document.onkeydown;
	document.onkeydown = _keydownHandler;

	return {
		remove : function () {
			document.onkeydown = aOldKeydownEventListner;
		}
	}
};

XCS.UI.setDragAndDrop = function (aElement) {

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
		
		var dragGuide = XCS.UI.createElement('div');
		dragGuide.style.zIndex = XCS.UI.offset() + 1;
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

	element.onkeydown = function() {
		if (GetKeyStateCheck("caps") == "ON") {
			if (__SANDBOX.IEVersion <= 7) {
				capslock.style.top = (element.offsetHeight + Y + 50) + "px";
				capslock.style.left = (element.offsetLeft) + "px";
			} else {
				capslock.style.top = (element.offsetHeight + Y + 40) + "px";
				capslock.style.left = (element.offsetLeft) + "px";
			}

			capslock.style.zIndex = XCS.UI.offset() + 3;
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


XCS.CERT_LOCATION_HARD			 = 0;
XCS.CERT_LOCATION_REMOVABLE		 = 100;
XCS.CERT_LOCATION_ICCARD		 = 200;
XCS.CERT_LOCATION_CSP			 = 300;
XCS.CERT_LOCATION_PKCS11		 = 400;
XCS.CERT_LOCATION_USBTOKEN		 = 500;
XCS.CERT_LOCATION_USBTOKEN_KB	 = 600;
XCS.CERT_LOCATION_USBTOKEN_KIUP	 = 700;
XCS.CERT_LOCATION_YESSIGNM		 = 1100;
XCS.CERT_LOCATION_MPHONE		 = 1200;
var gDialogObj,
	gErrCallback,
	gNextEventCallback,
	gSelectedMediaID,
	gRadioButtons;

XCS.getLocaleResource("xcsimport", XCS.lang());

function onload(aDialogObj) 
{
	var aMediaList,
		aIDList;
	var aResult;
	var i = 0;
	var guideModule;
	var guideDialog;

    gDialogObj = aDialogObj;
	if (gDialogObj.args.errCallback)
		gErrCallback = gDialogObj.args.errCallback;
	else
		gErrCallback = gErrCallback_common;
		
	XCS.UI.setDragAndDrop(__2);
	
    gRadioButtons = [ __25,
                      __28
                      ];
	
		_getIDListCallback = function (result)
	{
		if (guideDialog && XecureCertShare.mPluginMode == false)
		{
			guideDialog.dispose ();
		}

		aIDList = result.split("\t\n");

		if (__SANDBOX.isFailed(aIDList, gErrCallback)) {
			return;
		}
		
		if(aIDList.length > 0)
		{
			if(aIDList[aIDList.length-1] == "")
			{
				aIDList.length = aIDList.length - 1;
				aMediaList.length = aIDList.length;
			}	
		}
		
			    if(aMediaList.length == 0)
	    {
	       	__30.disabled = true;
	       	__28.disabled = true;
	    }
	    else
	    {
	    	aSelectElement = __30;
	    	 
		    for (i = 0; i < aMediaList.length; i++) {
				if ((aMediaList[i].length > 0) && (aIDList[i] != aDialogObj.args[0])) {
					if(aMediaList[i] != "" && aIDList[i] != "")
					{
						aOption = XCS.UI.createElement("option");
						aOption.value = Number(aIDList[i]);
						aOption.innerHTML = aMediaList[i];
						aSelectElement.appendChild(aOption);
					}
				}
		    }
	    }
	    
	    onHddButtonClick();
		__16.focus();
	};
	
	_getMediaListCallback = function (result)
	{
		aMediaList = result.split("\t\n");

		if (__SANDBOX.isFailed(aMediaList, gErrCallback)) {
			return;
		}
		
		aIDList = __SANDBOX.xcsInterface().getMediaList(1);
		if (XecureCertShare.mPluginMode == true)
			_getIDListCallback (aIDList);
		else
			__SANDBOX.extension.setcallbackFunc (_getIDListCallback);

	};
	
		_XCSPCDownloadCallback = function (result)
	{
		if (result != 0) {
			if (__SANDBOX.isFailed(result, gErrCallback)) {
				if (guideDialog && XecureCertShare.mPluginMode == false)
				{
					guideDialog.dispose ();
				}
				
				onCancelButtonClick();
				return;
			}
		}
	
				aMediaList = __SANDBOX.xcsInterface().getMediaList(0);
		if (XecureCertShare.mPluginMode == true)
			_getMediaListCallback (aMediaList);
		else
			__SANDBOX.extension.setcallbackFunc (_getMediaListCallback);
	};
	
	if (XecureCertShare.mPluginMode == false)
	{
		guideModule = __SANDBOX.loadModule("guidewindow");
		guideDialog = guideModule({
			type: "loading",
			args: "",
			onconfirm: "",
			oncancel: function () {
				if (guideDialog)
					guideDialog.dispose ();
			}
		});
	}
	
	aResult = __SANDBOX.xcsInterface().XCSPCDownload(XecureCertShare.mServerPath);
	if (XecureCertShare.mPluginMode == true)
		_XCSPCDownloadCallback (aResult);
	else
		__SANDBOX.extension.setcallbackFunc (_XCSPCDownloadCallback);
	
	if (guideDialog && XecureCertShare.mPluginMode == false)
	{
		guideDialog.show ();
	}
	else
	{
		guideDialog = null;
	}
	XCS.Event.add(__16, "keyup", function (e) {
		var aKeyCode = e.keyCode || e.which;
		if(aKeyCode == 9) {
			if(e.shiftKey) {
							} else {
							}
		} else if (aKeyCode == 8) {
			
		} else {
			if( __16.value.length == 4 )
				__17.focus();
		}
	});
	XCS.Event.add(__17, "keyup", function (e) {
		var aKeyCode = e.keyCode || e.which;
		if(aKeyCode == 9) {
			if(e.shiftKey) {
							} else {
							}
		} else if (aKeyCode == 8) {
			if( __17.value.length == 0 )
				__16.focus();
		} else {
			if( __17.value.length == 4 )
				__18.focus();
		}
	});
	XCS.Event.add(__18, "keyup", function (e) {
		var aKeyCode = e.keyCode || e.which;
		if(aKeyCode == 9) {
			if(e.shiftKey) {
							} else {
							}
		} else if (aKeyCode == 8) {
			if( __18.value.length == 0 )
				__17.focus();
		} else {
			
		}
	});

    var aNextButtonClickListeners = [
    		function() {
	
			__34.focus();
			
			gNextEventCallback(true);
			
		},
    ];

	__34.innerHTML = XCS.S.button_complete;

    aWizardView = new XCS_UI_WizardView(__7,
					aNextButtonClickListeners,
					null);



	return 0;
}    

function setFocus() {

}

function onComplete(aResult) { 
 
	var aResult;
	var guideModule;
	var guideDialog;

	var aAuthcode

	if(XecureCertShare.mXCSXFree.mUseScrap != true) {
		aAuthcode = __16.value + __17.value + __18.value;

		if( aAuthcode.length < 12) {
			alert(XCS.S.authcodeerror);
			return;
		}
		else if (XCS.Util.checkAuthcodeFormat (__16.value) == false
				|| XCS.Util.checkAuthcodeFormat (__17.value) == false
				|| XCS.Util.checkAuthcodeFormat (__18.value) == false)
		{
			alert (XCS.S.authcodesyntaxerror);
			return;
		}
	} else {
		
									}
		
		_setAuthenticateCodeAndMediaIDCallback = function (result)
	{
		if (guideDialog && XecureCertShare.mPluginMode == false)
		{
			guideDialog.dispose ();
		}

		if (result != 0) {
			if (__SANDBOX.isFailed(result, gErrCallback)) {

			}
		}
		else
		{
			alert(XCS.S.success);
		}		

		gDialogObj.onconfirm(result);
	};

	if (XecureCertShare.mPluginMode == false)
	{
		guideModule = __SANDBOX.loadModule ("guidewindow");
		guideDialog = guideModule ({
			type: "loading",
			args: "",
			onconfirm: "",
			oncancel: function () {
				if (guideDialog)
					guideDialog.dispose ();
			}
		});
	}

	aResult = __SANDBOX.xcsInterface().setAuthenticateCodeAndMediaID(aAuthcode,
																	 gDialogObj.args.selectedMediaID);

	if (XecureCertShare.mPluginMode == true)
		_setAuthenticateCodeAndMediaIDCallback (aResult);
	else
		__SANDBOX.extension.setcallbackFunc (_setAuthenticateCodeAndMediaIDCallback);

	if (guideDialog && XecureCertShare.mPluginMode == false)
	{
		guideDialog.show ();
	}
	else
	{
		guideDialog = null;
	}
}

function onCancelButtonClick() {
	
    gDialogObj.oncancel();
}

function onHddButtonClick(e) {
	var i;

    for (i = 0; i < gRadioButtons.length; i++) {
		gRadioButtons[i].checked = false;
    }
    gRadioButtons[0].checked = true;
	
	if (__25.value == "on") {
		__30.disabled = true;
			gDialogObj.args.selectedMediaID = 1;
	} else {
		__30.disabled = false;
	}
}

function onRemovableButtonClick(e) {
	var i;

    for (i = 0; i < gRadioButtons.length; i++) {
		gRadioButtons[i].checked = false;
    }
    gRadioButtons[1].checked = true;

    if (__28.value == "on") {
		__30.disabled = false;
		gDialogObj.args.selectedMediaID = 101 + __30.selectedIndex;
	} else {
		__30.disabled = true;

	}


}

function XCS_UI_WizardView(aElement,
			   aNextButtonClickListeners,
			   aPrevButtonClickListeners)
{
    var mPages = new Array();
    var mCurrentPageIndex = 0;
    var mNextButtonClickListeners = aNextButtonClickListeners;
    var mPrevButtonClickListeners = aPrevButtonClickListeners;
	var mComplete = '';
	var i = 0;
    
        var temp = aElement.firstChild;
    while (temp) {
		if (temp.nodeName.toLowerCase() == "div") 
		    mPages.push(temp);
		temp = temp.nextSibling;
    }

    for (i = 0; i < mPages.length; i++)
		hide(mPages[i]);

    show(mPages[0]);
    __33.disabled = true;

    XCS.Event.add(__34, "click", function(e) {
    	
    	gNextEventCallback = function () 
	    {
						if (mCurrentPageIndex == mPages.length-1) {
			    onComplete(mComplete);
			    return;
			}
		
						if (mCurrentPageIndex == mPages.length - 2) {
				__34.innerHTML = XCS.S.button_complete;
			}
		
			if (mCurrentPageIndex == 0) {
				__33.disabled = false;
			}
		
			hide(mPages[mCurrentPageIndex]);
			show(mPages[++mCurrentPageIndex]);    	
	    };
	    		
		if (mNextButtonClickListeners &&
		    mNextButtonClickListeners[mCurrentPageIndex])
		    if (!mNextButtonClickListeners[mCurrentPageIndex](e))
				return;

	});

    XCS.Event.add(__33, "click", function(e) {
	if (mPrevButtonClickListeners &&
	    mPrevButtonClickListeners[mCurrentPageIndex]) {
	    if (!mPrevButtonClickListeners[mCurrentPageIndex](e))
		return;
	}

	if (mCurrentPageIndex == mPages.length-1) {
	    __34.innerHTML = XCS.S.button_next;
	}
	
	if (mCurrentPageIndex == 1)
	    __33.disabled = true;

	if (mCurrentPageIndex-1 >= 0) {
	    hide(mPages[mCurrentPageIndex]);
	    show(mPages[--mCurrentPageIndex]);
	}
    });

    function show(element) { element.style.display = "block"; }
    function hide(element) { element.style.display = "none"; }
}

var __1 = XCS.UI.createElement('DIV');
__1.style.width = '450px';
var __2 = XCS.UI.createElement('DIV');
__2.setAttribute('id', 'xcs_title', 0);
__2.className = 'title';
__2.setAttribute('tabindex', '3', 0);
var __3 = XCS.UI.createElement('H3');
__3.appendChild(document.createTextNode(XCS.S.title));
__2.appendChild(__3);
__1.appendChild(__2);
var __4 = XCS.UI.createElement('DIV');
__4.setAttribute('id', 'xcs_body', 0);
__4.className = 'xcs-body';
var __5 = XCS.UI.createElement('DIV');
__5.setAttribute('id', 'xcs_header', 0);
var __6 = XCS.UI.createElement('IMG');
__6.setAttribute('id', 'xcs_banner', 0);
__6.setAttribute('src', XecureCertShare.mBasePath+'/img/banner.png', 0);
__6.setAttribute('width', '410', 0);
__6.setAttribute('height', '66', 0);
__6.className = 'banner';
__6.setAttribute('alt', XCS.S.xcsimport, 0);
__5.appendChild(__6);
__4.appendChild(__5);
var __7 = XCS.UI.createElement('DIV');
__7.className = 'xcs-xcsimport-area';
var __8 = XCS.UI.createElement('DIV');
__8.setAttribute('id', 'xcs_page1', 0);
__8.className = 'xcs-xcsimport-sec';
var __9 = XCS.UI.createElement('DIV');
__9.className = 'xcs-box-layout';
var __10 = XCS.UI.createElement('DIV');
__10.className = 'xcs-box-border';
var __11 = XCS.UI.createElement('DIV');
__11.className = 'xcs-step-info';
__11.appendChild(document.createTextNode(XCS.S.firstdesc));
__10.appendChild(__11);
var __12 = XCS.UI.createElement('DIV');
__12.className = 'xcs-step-info-detail';
var __13 = XCS.UI.createElement('SPAN');
__13.className = 'first';
__13.appendChild(document.createTextNode(XCS.S.firstdetaildesc));
__12.appendChild(__13);
__10.appendChild(__12);
__9.appendChild(__10);
__8.appendChild(__9);
var __14 = XCS.UI.createElement('DIV');
__14.className = 'xcs-passwd-field';
var __15 = XCS.UI.createElement('LABEL');
__15.htmlFor = 'xcs_authcode_input';
__15.className = 'xcs-tit-auth';
__15.style.marginLeft = '10px';
__15.appendChild(document.createTextNode(XCS.S.authcode));
__14.appendChild(__15);
var __16 = XCS.UI.createElement('INPUT');
__16.setAttribute('type', 'text', 0);
__16.setAttribute('tabindex', '3', 0);
if (__SANDBOX.IEVersion <= 8) {
__16.mergeAttributes(XCS.UI.createElement("<INPUT name='authcode_input1'>"),false);
} else {
__16.setAttribute('name', 'authcode_input1', 0);
}
__16.setAttribute('id', 'xcs_authcode_input1', 0);
__16.setAttribute('title', XCS.S.first_authcode, 0);
__16.className = 'xcs-auth-box';
__16.setAttribute('maxlength', '4', 0);
__16.style.marginLeft = '10px';
__16.style.textAlign = 'center';
__14.appendChild(__16);
__14.appendChild(document.createTextNode(XCS.S.authcodedelimiter));
var __17 = XCS.UI.createElement('INPUT');
__17.setAttribute('type', 'text', 0);
__17.setAttribute('tabindex', '3', 0);
if (__SANDBOX.IEVersion <= 8) {
__17.mergeAttributes(XCS.UI.createElement("<INPUT name='authcode_input2'>"),false);
} else {
__17.setAttribute('name', 'authcode_input2', 0);
}
__17.setAttribute('id', 'xcs_authcode_input2', 0);
__17.setAttribute('title', XCS.S.second_authcode, 0);
__17.className = 'xcs-auth-box';
__17.setAttribute('maxlength', '4', 0);
__17.style.textAlign = 'center';
__14.appendChild(__17);
__14.appendChild(document.createTextNode(XCS.S.authcodedelimiter));
var __18 = XCS.UI.createElement('INPUT');
__18.setAttribute('type', 'text', 0);
__18.setAttribute('tabindex', '3', 0);
if (__SANDBOX.IEVersion <= 8) {
__18.mergeAttributes(XCS.UI.createElement("<INPUT name='authcode_input3'>"),false);
} else {
__18.setAttribute('name', 'authcode_input3', 0);
}
__18.setAttribute('id', 'xcs_authcode_input3', 0);
__18.setAttribute('title', XCS.S.third_authcode, 0);
__18.className = 'xcs-auth-box';
__18.setAttribute('maxlength', '4', 0);
__18.style.textAlign = 'center';
__14.appendChild(__18);
__8.appendChild(__14);
var __19 = XCS.UI.createElement('DIV');
__19.className = 'xcs-box-layout';
__19.style.marginTop = '20px';
var __20 = XCS.UI.createElement('DIV');
__20.className = 'xcs-box-border';
var __21 = XCS.UI.createElement('DIV');
__21.className = 'xcs-step-info';
__21.appendChild(document.createTextNode(XCS.S.seconddesc));
__20.appendChild(__21);
var __22 = XCS.UI.createElement('DIV');
__22.className = 'xcs-step-info-detail';
var __23 = XCS.UI.createElement('SPAN');
__23.className = 'second';
__23.appendChild(document.createTextNode(XCS.S.seconddetaildesc));
__22.appendChild(__23);
__20.appendChild(__22);
__19.appendChild(__20);
__8.appendChild(__19);
var __24 = XCS.UI.createElement('DIV');
__24.className = 'xcs-slsave';
__24.style.marginLeft = '10px';
var __25 = XCS.UI.createElement('INPUT');
__25.setAttribute('tabindex', '3', 0);
if (__SANDBOX.IEVersion <= 8) {
__25.mergeAttributes(XCS.UI.createElement("<INPUT name='loc'>"),false);
} else {
__25.setAttribute('name', 'loc', 0);
}
__25.setAttribute('id', 'xcs_certsaveloc_hdd', 0);
__25.setAttribute('type', 'radio', 0);
__25.setAttribute('title', XCS.S.hdd, 0);
__25.onclick = function(event) {onHddButtonClick(event);};
__24.appendChild(__25);
var __26 = XCS.UI.createElement('LABEL');
__26.htmlFor = 'xcs_certsaveloc_hdd';
__26.appendChild(document.createTextNode(XCS.S.hdd));
__24.appendChild(__26);
__8.appendChild(__24);
var __27 = XCS.UI.createElement('DIV');
__27.className = 'xcs-slremovable';
__27.style.marginLeft = '10px';
var __28 = XCS.UI.createElement('INPUT');
__28.setAttribute('tabindex', '3', 0);
if (__SANDBOX.IEVersion <= 8) {
__28.mergeAttributes(XCS.UI.createElement("<INPUT name='loc'>"),false);
} else {
__28.setAttribute('name', 'loc', 0);
}
__28.setAttribute('id', 'xcs_certsaveloc_removable', 0);
__28.setAttribute('type', 'radio', 0);
__28.setAttribute('title', XCS.S.removable, 0);
__28.onclick = function(event) {onRemovableButtonClick(event);};
__27.appendChild(__28);
var __29 = XCS.UI.createElement('LABEL');
__29.htmlFor = 'xcs_certsaveloc_removable';
__29.appendChild(document.createTextNode(XCS.S.removable));
__27.appendChild(__29);
__8.appendChild(__27);
var __30 = XCS.UI.createElement('SELECT');
__30.setAttribute('tabindex', '3', 0);
__30.setAttribute('id', 'xcs_removableselect', 0);
__30.setAttribute('title', XCS.S.removablelist, 0);
__30.className = 'xcs-slselect-cert';
__30.style.marginLeft = '25px';
__30.onchange = function(event) {onRemovableButtonClick(event);};
__30.setAttribute('disabled', 'disabled', 0);
__8.appendChild(__30);
__7.appendChild(__8);
__4.appendChild(__7);
var __31 = XCS.UI.createElement('DIV');
__31.className = 'xcs-buttons-layout';
var __32 = XCS.UI.createElement('BUTTON');
__32.setAttribute('tabindex', '3', 0);
__32.setAttribute('type', 'button', 0);
__32.setAttribute('id', 'xcs_cancel', 0);
__32.onclick = function(event) {onCancelButtonClick()};
__32.appendChild(document.createTextNode(XCS.S.button_cancel));
__31.appendChild(__32);
var __33 = XCS.UI.createElement('BUTTON');
__33.setAttribute('tabindex', '3', 0);
__33.setAttribute('type', 'button', 0);
__33.setAttribute('id', 'xcs_previous', 0);
__33.appendChild(document.createTextNode(XCS.S.button_prev));
__31.appendChild(__33);
var __34 = XCS.UI.createElement('BUTTON');
__34.setAttribute('tabindex', '3', 0);
__34.setAttribute('type', 'button', 0);
__34.setAttribute('id', 'xcs_next', 0);
__34.appendChild(document.createTextNode(XCS.S.button_next));
__31.appendChild(__34);
__4.appendChild(__31);
__1.appendChild(__4);
var __35 = XCS.UI.createElement('IFRAME');
__35.className = 'not';
__35.setAttribute('title', XCS.S.no_content, 0);
__1.appendChild(__35);
__1.onload = onload;
if (typeof setFocus != "undefined") {
__1.setFocus = setFocus;
}
if (!XecureCertShare.mDivInsertOption) {
setTimeout(function () {__1.tabControl = XCS.UI.appendTabControl(__1);}, 0);
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

	//var aCallbackFocusID = [];

	if (XecureCertShare.mUISettings.mUITarget) {
		aTarget = XecureCertShare.mUISettings.mUITarget;
		delete XecureCertShare.mUISettings.mUITarget;
	} else {
		/*
		aEvent = window.event;

		if (!aEvent) {
			while (aCaller.caller) {
				aCaller = aCaller.caller;
			}

			if (aCaller.arguments)
				aEvent = aCaller.arguments[0];
		} else {
			aEvent = window.event;
		}

		if (typeof aEvent == 'object' && ("srcElement" in aEvent || "target" in aEvent)) {
			aTarget = aEvent.srcElement || aEvent.target;
		} else {
			aTarget = aBody;
		}
		
		if (__SANDBOX.IEVersion == 7)
		{
			if (aTarget == null)
				aTarget = aBody;
		}
		else
		{
			if (aTarget == null || aTarget instanceof XMLHttpRequest) { //FF
				aTarget = aBody;
			}
		}

		if (aTarget == document) { //FF
			aTarget = aBody;	
		}
		*/
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
		if (aParentPointer.getAttribute("xcscaller") || (aParentPointer.tagName && aParentPointer.tagName.toUpperCase() == "BUTTON")) {
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
			//aBody.appendChild(aElement);
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
		ApA = aElement.parentNode;
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


    var overlay = document.createElement('div');
	overlay.cssText = XecureCertShare.mUISettings.mCSSDefault;
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
		overlay.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+XecureCertShare.mBasePath+"/img/gray.png', sizingMethod='scale')";
	}
    else if(__SANDBOX.browserName == "chrome" && __SANDBOX.browserVersion > 9) {
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

    var doc = loadDoc(aTarget);

	doc.style.display = 'block';
	var winWidth = parseInt(doc.style.width, 10);
	if (doc.style.marginLeft)
		winWidth += parseInt(doc.style.marginLeft,10);
	if (doc.style.marginRight)
		winWidth += parseInt(doc.style.marginRight, 10);

    var win = document.createElement('div');
	win.setAttribute ("role", "dialog", 0);
	//win.cssText = XecureCertShare.mUISettings.mCSSDefault;

	if (aTarget.id != "certDialog" && aTarget.id != "xcsImportDialog" && aTarget.id != "xcsExportDialog" && aTarget.id != "xcs_embedded_area")
	    win.style.position = 'absolute';
	
	win.style.top = getScrollTop() - aOffsetTop+ 'px';
	win.style.left= getScrollLeft() - aOffsetLeft + 'px';
	
	if (XecureCertShare.mDivInsertOption != 1) {
		win.style.zIndex = aDialogOffset + 2;
		win.style.width = winWidth + 2 + 'px';
		win.className = "xcs_common xcs_cert_pop";
	}


	if (aTarget.id != "certDialog" && aTarget.id != "xcsImportDialog" && aTarget.id != "xcsExportDialog" && aTarget.id != "xcs_embedded_area") {
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

		//if (target.type) {
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
				
				win.style.top  = (scTop  + ((fullHeight - height) / 3) - aOffsetTop) + "px";
				win.style.left = (scLeft + ((fullWidth  - width)  / 2) - aOffsetLeft) + "px";

				if(XecureCertShare.mTransKeyEnable) {
					var aElement = document.getElementById("xcs_certselect_tek_input1");
					if(aElement) {
						var aElementPosition = aElement.getBoundingClientRect();
						var aInputTransKeyXY = parseInt(aElementPosition.left) + " " + (parseInt(aElementPosition.top) + parseInt(aElement.offsetHeight) + parseInt(window.pageYOffset));
						aElement.setAttribute ("data-tk-kbdxy", aInputTransKeyXY);
					}
				}
			}
			
			centerWindow();

			overlay.style.display = 'block';
			win.style.visibility = 'visible';

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
						// while (inputElements[i].disabled) { i++; }
						// inputElements[i].focus();
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
    	    if (overlay.parentNode != null) UIRemove(overlay);

			if (__SANDBOX.IEVersion <= 8) {
				document.onmousedown   = selectableEventBackup.onmousedown;
				document.onmouseup     = selectableEventBackup.onmouseup;
			} else {
				document.onselectstart = selectableEventBackup.onselectstart;
			}
    	},

		getUITarget: function() {
			return aTarget;
		}
    };
}

};
