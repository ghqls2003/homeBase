var __xcsimportwide = function(__SANDBOX) {
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
XCS.namespace("UI");


XCS.UI.ContextMenu = function (aTarget, aTitle, aMenuItems, onMenuSelected) {
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
		e.focus();
	}

	function unfocus(e) {
		e.className = "context-menu-item-unfocused";
	}

	function mousedownItem(e) {
				onMenuSelected(e.data);
	}

	function mouseoverItem(e) {
		var aElement = e.target;
		for (var i = 0; i < aliList.length; i++)
			unfocus(aliList[i]);
		focus(aElement);
	}

	function mouseoutItem(e) {
		var aElement = e.target;
		unfocus(aElement);
	}

	function onclickDocument() {
		aTarget.parentNode.removeChild(box);
		XCS.Event.remove(document, "mousedown", onDocumentClickListener);
	}

	function keydownItem(e) {
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
		}else if (aKeyCode == 13) { 			unfocus(aliList[aSelectedLiIndex]);
			if (XecureCertShare.mPlatform == XecureCertShare.mPlatformList[0]) {
				if (__SANDBOX.browserName == "chrome" || __SANDBOX.browserName == "safari") {
				}
			}
			else{
				onclickDocument();
			}
			mousedownItem(aliList[aSelectedLiIndex]);
		}else if (aKeyCode == 27) { 			unfocus(aliList[aSelectedLiIndex]);
			if (__SANDBOX.browserName == "chrome" || __SANDBOX.browserName == "safari" || XecureCertShare.mPlatform == XecureCertShare.mPlatformList[0]) {
			} else {
				onclickDocument();
			}
			aTarget.focus();
		} else if (aKeyCode == 9) {
			if (__SANDBOX.browserName == "chrome" || __SANDBOX.browserName == "safari" || XecureCertShare.mPlatform == XecureCertShare.mPlatformList[0]) {
			} else {
				onclickDocument();
			}
			return true;
		}
		XCS.Event.stopPropagation(e);
		XCS.Event.preventDefault(e);
	}

	onDocumentClickListener = XCS.Event.add(document, "mousedown", onclickDocument);

		box = XCS.UI.createElement("div");
	box.style.zIndex = XCS.UI.offset() + 4;
	box.className = "context-menu-layout";
				if (__SANDBOX.IEVersion < 9) {
		box.style.filter = "progid:DXImageTransform.Microsoft.Shadow(color=gray, direction=135, strength=2)";
	}
	
	ul = XCS.UI.createElement("ul");
				ul.className = "ul-list-type1";
	ul.setAttribute('title', aTitle);
	if (XecureCertShare.mDivInsertOption > 0)
		ul.setAttribute('tabindex', 0, 0);
	else
		ul.setAttribute('tabindex', 3, 0);

	XCS.Event.add(ul, "keydown", keydownItem);

	for (i = 0; i < aMenuItems.length; i++) {
		li = XCS.UI.createElement("li");
														li.data = aMenuItems[i].data;
		li.appendChild(document.createTextNode(aMenuItems[i].item));
		li.onmousedown = function (e) {
			e = e || window.event;
			target = e.target || e.srcElement;
			if (__SANDBOX.browserName == "chrome" || __SANDBOX.browserName == "safari" || XecureCertShare.mPlatform == XecureCertShare.mPlatformList[0]) {
			} else {
				onclickDocument();
			}
			onMenuSelected(target.data);
		};
		if (XecureCertShare.mDivInsertOption > 0)
			li.setAttribute('tabindex', 0, 0);
		else
			li.setAttribute('tabindex', 3, 0);
		
		XCS.Event.add(li, "mouseover", mouseoverItem);
		XCS.Event.add(li, "mouseout", mouseoutItem);

		aliList[i] = li;
		ul.appendChild(li);
	}
	box.appendChild(ul);
	aTarget.parentNode.appendChild(box);
	ul.focus();
};

var gDialogObj,
	gErrCallback,
	gSelectedMediaID,
	gRadioButtons,
	gRadioButtonSpans,
	gAuthCodeSpans;

XCS.getLocaleResource("xcsimportwide", XCS.lang());

function onload(aDialogObj) 
{
	var aEncryptID = "";
	var aMediaList,
		aIDList;
	var aResult;
	var guideModule;
	var guideDialog;

    gDialogObj = aDialogObj;
	if (gDialogObj.args.errCallback)
		gErrCallback = gDialogObj.args.errCallback;
	else
		gErrCallback = gErrCallback_common;
		
		_getIDListCallback = function (aResult)
	{
		if (guideDialog && XecureCertShare.mPluginMode == false)
		{
			guideDialog.dispose ();
		}

		aIDList = aResult.split ("\t\n");
		if (__SANDBOX.isFailed (aIDList, gErrCallback))
		{
		    return;
		}

				aSelectElement = __25;
		for (i = 0; i < aMediaList.length; i++) {
			if ((aMediaList[i].length > 0) && (aIDList[i] != aDialogObj.args[0])) {
				aOption = XCS.UI.createElement("option");
				aOption.value = Number(aIDList[i]);
				aOption.innerHTML = aMediaList[i];
				aSelectElement.appendChild(aOption);
			}
    	}
	}

	_getMediaListCallback = function (aResult)
	{
		aMediaList = aResult.split ("\t\n");
		if (__SANDBOX.isFailed (aMediaList, gErrCallback))
		{
			return;
		}

		aIDList = __SANDBOX.xcsInterface ().getMediaList (1);
		if (XecureCertShare.mPluginMode == true)
		{
			_getIDListCallback (aIDList);
		}
		else
		{
			__SANDBOX.extension.setcallbackFunc (_getIDListCallback);
		}
	}

		aMediaList = __SANDBOX.xcsInterface ().getMediaList (0);
	if (XecureCertShare.mPluginMode == true)
	{
		_getMediaListCallback (aMediaList);
	}
	else
	{
		__SANDBOX.extension.setcallbackFunc (_getMediaListCallback);
	}

	if (XecureCertShare.mPluginMode == false)
	{
		guideModule = __SANDBOX.loadModule ("guidewindow");
		guideDialog = guideModule ({
			type: "loading",
			args: "",
			onconfirm: "",
			oncancel: function () {
				if (guideDialog)
				{
					guideDialog.dispose ();
				}
			}
		});
	}

	if (guideDialog && XecureCertShare.mPluginMode == false)
	{
		guideDialog.show ();
	}
	else
	{
		guideDialog = null;
	}

    gRadioButtons = [ __14,
                      __20
                     ];
    
    gRadioButtonSpans = [ __13,
                          __19
                        ];
    
    gAuthCodeSpans = [ __36,
                       __39,
                       __42
                     ];
    
    onHddButtonClick();
    
 	return 0;
}    

function setFocus() {

}

function onOKButtonClick(e) { 
 
	var aResult;

	var aAuthcode = __37.value + __40.value + __43.value;
	if( aAuthcode.length < 12) {
		alert(XCS.S.authcodeerror);
		__37.focus();
		return;
	}

		_setAuthenticateCodeAndMediaIDCallback = function (aResult)
	{
		if (guideDialog && XecureCertShare.mPluginMode == false)
		{
			guideDialog.dispose ();
		}

		if (aResult != 0)
		{
			if (__SANDBOX.isFailed (aResult, gErrCallback))
			{
			}
		}
		else
		{
			alert (XCS.S.success);
		}
	
		inputClear ();
		gDialogObj.onconfirm (aResult);
	}

		_XCSPCDownloadCallback = function (aResult)
	{
		if (aResult != 0)
		{
			if (__SANDBOX.isFailed (aResult, gErrCallback))
			{
				if (guideDialog && XecureCertShare.mPluginMode == false)
				{
					guideDialog.dispose ();
				}
				
				onCancelButtonClick();

				return;
			}
		}

		aResult = __SANDBOX.xcsInterface ().setAuthenticateCodeAndMediaID (aAuthcode,
																		   gDialogObj.args.selectedMediaID);
		if (XecureCertShare.mPluginMode == true)
		{
			_setAuthenticateCodeAndMediaIDCallback (aResult);
		}
		else
		{
			__SANDBOX.extension.setcallbackFunc (_setAuthenticateCodeAndMediaIDCallback);
		}
	}

	aResult = __SANDBOX.xcsInterface ().XCSPCDownload (XecureCertShare.mServerPath);
	if (XecureCertShare.mPluginMode == true)
	{
		_XCSPCDownloadCallback (aResult);
	}
	else
	{
		__SANDBOX.extension.setcallbackFunc (_XCSPCDownloadCallback);
	}

	if (XecureCertShare.mPluginMode == false)
	{
		guideModule = __SANDBOX.loadModule ("guidewindow");
		guideDialog = guideModule ({
			type: "loading",
			args: "",
			onconfirm: "",
			oncancel: function () {
				if (guideDialog)
				{
					guideDialog.dispose ();
				}
			}
		});
	}

	if (guideDialog && XecureCertShare.mPluginMode == false)
	{
		guideDialog.show ();
	}
	else
	{
		guideDialog = null;
	}

	}

function onCancelButtonClick(e) {
	
		inputClear();
    gDialogObj.oncancel();
}

function inputClear() {
	__37.value = "";
	__40.value = "";
	__43.value = "";
	onHddButtonClick();
}

function onHddButtonClick(e) {
	var i;
	

    for (i = 0; i < gRadioButtons.length; i++) {
		gRadioButtons[i].checked = false;
    }
    gRadioButtons[0].checked = true;
    
    gRadioButtonSpans[0].className = "inprdo checked";
    gRadioButtonSpans[1].className = "inprdo";
    
	if (__14.value == "on") {
		__25.disabled = true;
			gDialogObj.args.selectedMediaID = 1;
	} else {
		__25.disabled = false;
	}


}

function onRemovableButtonClick(e) {
	var i;

    for (i = 0; i < gRadioButtons.length; i++) {
		gRadioButtons[i].checked = false;
    }
    gRadioButtons[1].checked = true;

    gRadioButtonSpans[0].className = "inprdo";
    gRadioButtonSpans[1].className = "inprdo checked";
    
    if (__20.value == "on") {
		__25.disabled = false;
		gDialogObj.args.selectedMediaID = 101 + __25.selectedIndex;
	} else {
		__25.disabled = true;

	}

}

function onAuthCodeSpanfocus(index) {
	var i;
	
	for(i=0; i<3; i++)
	{
		if(i == index)
			gAuthCodeSpans[i].className="inptx onfocus";
		else
			gAuthCodeSpans[i].className="inptx";
			
	}
}


var __1 = XCS.UI.createElement('DIV');
__1.setAttribute('role', 'dialog', 0);
__1.style.width = '946px';
var __2 = XCS.UI.createElement('DIV');
__2.className = 'sub_content';
var __3 = XCS.UI.createElement('DIV');
__3.setAttribute('id', 'xcs_import_wide', 0);
__3.className = 'cerbx imp';
var __4 = XCS.UI.createElement('OL');
var __5 = XCS.UI.createElement('LI');
__5.className = 'sav';
var __6 = XCS.UI.createElement('H5');
__6.className = 'stt';
__6.appendChild(document.createTextNode(XCS.S.secondtitle));
__5.appendChild(__6);
var __7 = XCS.UI.createElement('DIV');
__7.className = 'section';
var __8 = XCS.UI.createElement('P');
__8.className = 'tip';
var __9 = XCS.UI.createElement('SPAN');
__9.className = 'ct';
var __10 = XCS.UI.createElement('SPAN');
__10.className = 'spc';
__9.appendChild(__10);
__9.appendChild(document.createTextNode(XCS.S.seconddesc));
__8.appendChild(__9);
__7.appendChild(__8);
var __11 = XCS.UI.createElement('UL');
__11.className = 'inp_rdo';
var __12 = XCS.UI.createElement('LI');
__12.className = 's1';
var __13 = XCS.UI.createElement('SPAN');
__13.setAttribute('id', 'xcs_certsaveloc_input_hdd', 0);
__13.className = 'inprdo checked';
__13.onclick = function(event) {onHddButtonClick(event);};
var __14 = XCS.UI.createElement('INPUT');
__14.setAttribute('type', 'radio', 0);
if (__SANDBOX.IEVersion <= 8) {
__14.mergeAttributes(XCS.UI.createElement("<INPUT name='rdo'>"),false);
} else {
__14.setAttribute('name', 'rdo', 0);
}
__14.setAttribute('id', 'xcs_certsaveloc_hdd', 0);
__14.setAttribute('checked', 'checked', 0);
__13.appendChild(__14);
__12.appendChild(__13);
var __15 = XCS.UI.createElement('LABEL');
__15.htmlFor = 'rdo1';
var __16 = XCS.UI.createElement('SPAN');
__16.className = 'spc r1';
__15.appendChild(__16);
var __17 = XCS.UI.createElement('STRONG');
__17.className = 'tx';
__17.appendChild(document.createTextNode(XCS.S.hdd));
__15.appendChild(__17);
__12.appendChild(__15);
__11.appendChild(__12);
var __18 = XCS.UI.createElement('LI');
__18.className = 's2';
var __19 = XCS.UI.createElement('SPAN');
__19.setAttribute('id', 'xcs_certsaveloc_input_removable', 0);
__19.className = 'inprdo';
__19.onclick = function(event) {onRemovableButtonClick(event);};
var __20 = XCS.UI.createElement('INPUT');
__20.setAttribute('type', 'radio', 0);
if (__SANDBOX.IEVersion <= 8) {
__20.mergeAttributes(XCS.UI.createElement("<INPUT name='rdo'>"),false);
} else {
__20.setAttribute('name', 'rdo', 0);
}
__20.setAttribute('id', 'xcs_certsaveloc_removable', 0);
__19.appendChild(__20);
__18.appendChild(__19);
var __21 = XCS.UI.createElement('LABEL');
__21.htmlFor = 'rdo2';
var __22 = XCS.UI.createElement('SPAN');
__22.className = 'spc r2';
__21.appendChild(__22);
var __23 = XCS.UI.createElement('STRONG');
__23.className = 'tx';
__23.appendChild(document.createTextNode(XCS.S.removable));
__21.appendChild(__23);
var __24 = XCS.UI.createElement('SPAN');
__24.className = 'select';
var __25 = XCS.UI.createElement('SELECT');
__25.setAttribute('id', 'xcs_removableselect', 0);
__25.onchange = function(event) {onRemovableButtonClick(event);};
__25.setAttribute('disabled', 'disabled', 0);
__24.appendChild(__25);
var __26 = XCS.UI.createElement('SPAN');
__26.className = 'vg';
__24.appendChild(__26);
__21.appendChild(__24);
__18.appendChild(__21);
__11.appendChild(__18);
__7.appendChild(__11);
var __27 = XCS.UI.createElement('P');
__27.className = 'imp_cmt';
__7.appendChild(__27);
__5.appendChild(__7);
__4.appendChild(__5);
var __28 = XCS.UI.createElement('LI');
__28.className = 'inp small';
var __29 = XCS.UI.createElement('H5');
__29.className = 'stt';
__29.appendChild(document.createTextNode(XCS.S.firsttitle));
__28.appendChild(__29);
var __30 = XCS.UI.createElement('DIV');
__30.className = 'section';
var __31 = XCS.UI.createElement('P');
__31.className = 'tip';
var __32 = XCS.UI.createElement('SPAN');
__32.className = 'ct';
var __33 = XCS.UI.createElement('SPAN');
__33.className = 'spc';
__32.appendChild(__33);
__32.appendChild(document.createTextNode(XCS.S.firstdesc));
__31.appendChild(__32);
__30.appendChild(__31);
var __34 = XCS.UI.createElement('UL');
__34.className = 'inp_cer';
var __35 = XCS.UI.createElement('LI');
var __36 = XCS.UI.createElement('SPAN');
__36.setAttribute('id', 'xcs_authcode_span1', 0);
__36.className = 'inptx';
var __37 = XCS.UI.createElement('INPUT');
__37.setAttribute('id', 'xcs_authcode_input1', 0);
__37.setAttribute('maxlength', '4', 0);
__37.setAttribute('type', 'text', 0);
__37.onfocus = function(event) {onAuthCodeSpanfocus(0);};
__36.appendChild(__37);
__35.appendChild(__36);
__34.appendChild(__35);
var __38 = XCS.UI.createElement('LI');
var __39 = XCS.UI.createElement('SPAN');
__39.setAttribute('id', 'xcs_authcode_span2', 0);
__39.className = 'inptx';
var __40 = XCS.UI.createElement('INPUT');
__40.setAttribute('id', 'xcs_authcode_input2', 0);
__40.setAttribute('maxlength', '4', 0);
__40.setAttribute('type', 'text', 0);
__40.onfocus = function(event) {onAuthCodeSpanfocus(1);};
__39.appendChild(__40);
__38.appendChild(__39);
__34.appendChild(__38);
var __41 = XCS.UI.createElement('LI');
var __42 = XCS.UI.createElement('SPAN');
__42.setAttribute('id', 'xcs_authcode_span3', 0);
__42.className = 'inptx';
var __43 = XCS.UI.createElement('INPUT');
__43.setAttribute('id', 'xcs_authcode_input3', 0);
__43.setAttribute('maxlength', '4', 0);
__43.setAttribute('type', 'text', 0);
__43.onfocus = function(event) {onAuthCodeSpanfocus(2);};
__42.appendChild(__43);
__41.appendChild(__42);
__34.appendChild(__41);
__30.appendChild(__34);
var __44 = XCS.UI.createElement('P');
__44.className = 'spc pic';
__30.appendChild(__44);
__28.appendChild(__30);
__4.appendChild(__28);
__3.appendChild(__4);
var __45 = XCS.UI.createElement('DIV');
__45.className = 'spc arr';
__3.appendChild(__45);
__2.appendChild(__3);
var __46 = XCS.UI.createElement('DIV');
__46.className = 'bnarea';
var __47 = XCS.UI.createElement('A');
__47.className = 'sp bn_def';
__47.onclick = function(event) {onOKButtonClick(event)};
var __48 = XCS.UI.createElement('SPAN');
__48.appendChild(document.createTextNode(XCS.S.button_ok));
__47.appendChild(__48);
__46.appendChild(__47);
var __49 = XCS.UI.createElement('A');
__49.setAttribute('href', '#', 0);
__49.className = 'sp bn_def2';
__49.onclick = function(event) {onCancelButtonClick(event)};
var __50 = XCS.UI.createElement('SPAN');
__50.appendChild(document.createTextNode(XCS.S.button_cancel));
__49.appendChild(__50);
__46.appendChild(__49);
__2.appendChild(__46);
__1.appendChild(__2);
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
