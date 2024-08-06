var __xcsexport = function(__SANDBOX) {
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

XCS.UI.TableView = function (aElement, aOption) {
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

		function onkeydownMover(e) {
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
		XCS.Event.stopPropagation(e);
		XCS.Event.preventDefault(e);
	}

	XCS.Event.add(aElement, "keydown", onkeydownMover, this);
	aInputElement = XCS.UI.nextSibling(aElement).getElementsByTagName("form")[0];
	if (aInputElement) {
		XCS.Event.add(aInputElement, "keydown", onkeydownMover, this);
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
			aSortFunc = XCS.UI.TableView.sortTextCell;
			break;
		case "IT":
		case "TI":
			aSortFunc = XCS.UI.TableView.sortImageTextCell;
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

		aMousemoveListener = XCS.Event.add(document, "mousemove", function (e) {
			var aHeadWidth,
				aCellWidth;

			aHeadWidth = parseInt(aHeadCells[aIndex].style.width, 10) + (e.clientX || e.pageX) - x;
			if (aHeadWidth < 0) aHeadWidth = 0;
			aHeadCells[aIndex].style.width = aHeadWidth + "px";

			x = e.clientX || e.pageX;

			XCS.Event.stopPropagation(e);
			XCS.Event.preventDefault(e);
		});

		aMouseupListener = XCS.Event.add(document, "mouseup", function (e) {
			XCS.Event.remove(document, "mousemove", aMousemoveListener);
			XCS.Event.remove(document, "mouseup", aMouseupListener);

			XCS.Event.stopPropagation(e);
			XCS.Event.preventDefault(e);
		});

		XCS.Event.stopPropagation(e);
		XCS.Event.preventDefault(e);
	}

	function onclickResizer(e) {
		XCS.Event.stopPropagation(e);
		XCS.Event.preventDefault(e);
	}


	temp = mTable.getElementsByTagName("thead")[0];
	aHeadCells = XCS.UI.firstChildOf(temp).childNodes;
	for (i = 0, j = 0; i < aHeadCells.length; i++, j++) {
		
				if (typeof (aHeadCells[i].getAttribute("sortType")) != "undefined") {
			XCS.Event.add(aHeadCells[i], "click", onclickSort, this);
		}

				aResizer = aHeadCells[i].firstChild.childNodes[1];
		if (aResizer) {
			aResizer.className = "xcs-tableview-resizer";
			aResizer.style.zIndex = XCS.UI.offset() + 4;

			XCS.Event.add(aResizer, "mousedown", mousedownResizer);
			XCS.Event.add(aResizer, "click", onclickResizer);
		}

		aHeadCells[i].index = i;
	}
};

XCS.UI.TableView.prototype.selectRow = function (aObject) {
	var aLastSelected = this.mSelectedRowObj,
		tds,
		i=0,
		buttons;

	if (aLastSelected) {
		aLastSelected.className = "xcs-tableview-unselected-row";
		aLastSelected.setAttribute("aria-selected", "false", 0);
		if(aLastSelected.querySelector("img")) {
		    aLastSelected.querySelector("img").setAttribute("alt", aLastSelected.querySelector("img").getAttribute("alt").replace(XCS.S.table_select, ""), 0);
		} else {
		    aLastSelected.setAttribute("title", aLastSelected.title.replace(XCS.S.media_select, ''), 0);
		}
	}

	if (typeof aObject == "undefined")
		return;

	buttons = aObject.getElementsByTagName("button");
	aObject.className = "xcs-tableview-selected-row";
	if (buttons != "undefined") {
		if (buttons.length > 0) {
			for (i = 0; i <buttons.length; i++) {
				buttons[i].className = "xcs-tableview-viewbutton";
			}
		}
	}
	aObject.setAttribute("aria-selected", "true", 0);
    	if(aObject.querySelector("img")) {
	        aObject.querySelector("img").setAttribute("alt", XCS.S.table_select + aObject.querySelector("img").alt, 0);
	    } else {
	        aObject.setAttribute("title", aObject.title + XCS.S.media_select, 0);
	    }

	this.mSelectedRowObj = aObject;
	if (XecureCertShare.mDivInsertOption == 0) {
		try {
			aObject.focus();
		} catch (e) {
			console.log("try catch - aObject.focus");
		}
	}

	this.onSelectRow(aObject);
};

XCS.UI.TableView.prototype.refresh = function (aData) {
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
				XCS.Event.stopPropagation(e); 
				XCS.Event.preventDefault(e); 			};
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

XCS.UI.TableView.prototype.createImageTextCell = function (aImageURL, aText, aImageAlt) {
	var aCell = XCS.UI.createElement("div"),
		__4,
		__5;

	aCell.className = "xcs-tableview-cell";
		
	__4 = XCS.UI.createElement("img");
	
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

XCS.UI.TableView.prototype.createTextCell = function (aText) {
	var aCell = XCS.UI.createElement("div");
	aCell.className = "xcs-tableview-cell";	
	aCell.setAttribute("title", aText);
	aCell.style.display = "block";
	aCell.appendChild(document.createTextNode(aText));
	return aCell;
};

XCS.UI.TableView.prototype.createHiddenTextCell = function (aText) { 	var aCell = XCS.UI.createElement("div");
	aCell.className = "xcs-tableview-cell";
	aCell.appendChild(document.createTextNode(aText));
	aCell.style.visibility = "hidden";
	aCell.style.width = "0";
	return aCell;
};

XCS.UI.TableView.sortImageTextCell = function (e1, e2) {
	return e1.firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.nodeValue.localeCompare(
		e2.firstChild.firstChild.firstChild.firstChild.childNodes[1].firstChild.nodeValue
	);
};

XCS.UI.TableView.sortTextCell = function (e1, e2) {
	return e1.firstChild.firstChild.nodeValue.localeCompare(e2.firstChild.firstChild.nodeValue);
};

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

var gMediaRadio,
	gSelectedSubjectRDN,
	gSelectedIssuerRDN,
	gSelectedCertSerial,
	gSelectedCertClass,
	gSelectedRowIndex,
	gSelectedMediaID,
	gCertTableView,
	gDialogObj,
	gErrCallback,
	gNextEventCallback,
	gPasswordTryCount = 1,
	gCertSerial,
	gSearchCondition,
	gCAList,
	gPassword,
	gDisablePasswordInput,
	gCertTableBody,
	gInputHandler,
	gInputHandler_pass,
	gInputHandler_confirm,
	gChangePwd,
	gUserId,
	gEncryptID,
	gNewEncryptID,
	gNewPassword;


XCS.getLocaleResource("xcsexport", XCS.lang());


function enableChangePwd(element)
{
   if (element.checked) {
	   __81.disabled = true;
	   __84.disabled = true;
	   gChangePwd = false;
      
   } else {
	    __81.disabled = false;
	   __84.disabled = false;
	   gChangePwd = true;
   }
}


function onload(aDialogObj) {
	var certInfo,
	aMediaType,
	aCertList,
	aCheckedRadioIndex;

	var guideModule;
	var guideDialog;
	gDialogObj = aDialogObj;
	gErrCallback = gDialogObj.args.errCallback || gErrCallback_common;

	gCertSerial = gDialogObj.args.certSerial || "";
	gSelectedMediaID = gDialogObj.args.certLocation || 1;
	gSearchCondition = gDialogObj.args.searchCondition || 0;
	gCAList = gDialogObj.args.caList || "";
	gDisablePasswordInput = aDialogObj.args.disablePasswordInput;
	gFilter = aDialogObj.args.filter; 	gUserId = aDialogObj.args.userId;

		if (!(__SANDBOX.isIE() && navigator.userAgent.indexOf('Windows NT 6.2') >= 0)) {
		__49.onkeydown = function () { checkCaps(); };
		__49.onblur = function () { __73.style.display = 'none'; };
	}

		if (XecureCertShare.mDivInsertOption != 0) {
		__6.setAttribute("alt", XCS.S.banner_explain, 0);
		header = __5;
		
		if (gDialogObj.args.htmlData) {
			__6.style.display = "none";
	
			info = XCS.UI.createElement("div");
			info.className = "info-type1";
			info.appendChild(document.createTextNode(XCS.S.info));
			header.appendChild(info);
	
			html = XCS.UI.createElement("iframe");
			html.className = "frame-type1"; 
			html.frameBorder = "0px";
			header.appendChild(html);
			if (__SANDBOX.isIE() && location.hostname != document.domain) {
				html.src = 'javascript:(function(){document.open();document.domain="' + document.domain + '";document.close();})()';
			}
	
			html.contentWindow.document.write(gDialogObj.args.htmlData);
		} else {
			__6.style.display = "inline-block";
		}
	}

		gCertTableView = new XCS.UI.TableView(__27);

	gCertTableBody = __27.getElementsByTagName("table")[0].tBodies[0];

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
		
		aExpireAlert = __54;
		if (gCertList[gSelectedRowIndex][0] == 1) {
			aGrandMom = __27;

			aAddOffset = aGrandMom;

			aExpireAlert.style.top = aSelectedRowElement.offsetTop + aGrandMom.offsetTop - aGrandMom.scrollTop + aSelectedRowElement.offsetHeight + 4 - aExpireAlert.parentNode.offsetTop + "px";
			aExpireAlert.style.left = aSelectedRowElement.cells[1].offsetLeft + 60 + "px";


			expireMessage = XCS.S.willbeexpired.split("%s").join(gCertList[gSelectedRowIndex][4]);
			aElement = __57;
			while (aElement.firstChild) { aElement.removeChild(aElement.firstChild); }

			expireMessages = expireMessage.split("\n");
			for (i = 0; i < expireMessages.length; i++) {
				aElement.appendChild(document.createTextNode(expireMessages[i]));
				aElement.appendChild(XCS.UI.createElement("BR"));
			}

			aExpireAlert.style.display = "block";

			aGrandMom.onscroll = function () { aExpireAlert.style.display = "none"; };
			aExpireAlert.onclick = function () { aExpireAlert.style.display = "none"; };
			setTimeout (function () {gInputHandler.refresh();}, 0);
			setTimeout (function () {gInputHandler.clear();}, 0);
			try {
				setTimeout (function () {aExpireAlert.style.display = "none";}, 2200);
			} catch(ex) {
							}
		} else {
			aExpireAlert.style.display = "none";
			setTimeout (function () {gInputHandler.refresh();}, 0);
			setTimeout (function () {gInputHandler.clear();}, 0);
		}

	};

	gCertTableView.onRefresh = function (aData) {
		var tr, td, i;
		gCertTableBody = __27.getElementsByTagName("table")[0].tBodies[0];
		gCertTableBody.removeAttribute("tabindex");
		if (aData.length == 1) {
			if (XecureCertShare.mDivInsertOption == 0)
				gCertTableBody.setAttribute("tabindex", 3, 0);
			else 
				gCertTableBody.setAttribute("tabindex", 0, 0);
		}
		gCertList = aData;

		for (i = 0; i < aData.length; i++) {
			certInfo = aData[i];
			tr = XCS.UI.createElement("tr");
			tr.setAttribute("role", "row", 0);
			tr.setAttribute("aria-selected", "false", 0);
			tr.setAttribute('subject', certInfo[2]);
			tr.setAttribute("issuer", certInfo[5]);
			tr.setAttribute("serial", certInfo[6]);
			
			statusTextCell = gCertTableView.createTextCell(XCS.S["table_select"] + XCS.S["cert_status" + certInfo[0]]);
			statusTextCell.style.width = "0px";
			statusTextCell.style.height = "0px";
			statusTextCell.style.display = "none";

			td = XCS.UI.createElement("td");
			imageTextCell1 = gCertTableView.createImageTextCell(XecureCertShare.mBasePath + "/img/cert" + certInfo[0] + ".png",
									   certInfo[1], XCS.S["cert_status" + certInfo[0]]);
			imageTextCell1.style.textAlign = "left";
			td.appendChild(statusTextCell);
			td.appendChild(imageTextCell1);
			tr.appendChild(td);

			td = XCS.UI.createElement("td");
			textCell1 = gCertTableView.createTextCell(XCS.Util.getCNFromRDN(certInfo[2]));
			td.appendChild(textCell1);
			tr.appendChild(td);

			td = XCS.UI.createElement("td");
			textCell2 = gCertTableView.createTextCell(certInfo[4]);
			textCell2.style.textAlign = "center";
			td.appendChild(textCell2);
			tr.appendChild(td);

			td = XCS.UI.createElement("td");
			textCell3 = gCertTableView.createTextCell(certInfo[3]);
			textCell3.style.textAlign = "center";
			td.appendChild(textCell3);
			tr.appendChild(td);

			if (XecureCertShare.mDivInsertOption > 0)
				tr.setAttribute("tabindex", 3, 0);
			else
				tr.setAttribute("tabindex", 0, 0);
			
			tr.onkeydown = function(e) {
				e = e || window.event;

				var aKeyCode = e.which || e.keyCode;

				if (aKeyCode == 9 && e.shiftKey) {
					__27.focus();
				} else if (aKeyCode == 13) {
					__49.focus();
				} else if (aKeyCode == 32) {
					return false;
				} else {
					return true;
				}

				XCS.Event.stopPropagation(e);
				XCS.Event.preventDefault(e);
			};
			
			gCertTableBody.appendChild(tr);
		}
		
		var aTableRows = gCertTableBody.getElementsByTagName('tr');
		if (aTableRows.length > 0) {
			setTimeout (function () { gCertTableView.selectRow(aTableRows[0]);});
		}
	};

	var aResult;

		_getCertificateListCallback = function (aCertList) 
	{
		if (guideDialog && XecureCertShare.mPluginMode == false) 		{
			guideDialog.dispose ();
		}

		if (__SANDBOX.isFailed(aCertList) || aCertList.length == 0) {
			aCertList = "";
		}
		
		refreshTableView(aCertList);
	};
		_XCSPCUploadCallback = function (result) 
	{
		if (result != 0) {
			if (__SANDBOX.isFailed(result, gErrCallback)) {
				if (guideDialog && XecureCertShare.mPluginMode == false) 				{
					guideDialog.dispose ();
				}
				
				onCancelButtonClick();
				return;
			}
			
		}
		aCertList = "";

		aAuthCode = "";
		
				aCertList = __SANDBOX.xcsInterface().getCertificateList(gSelectedMediaID);
		if (XecureCertShare.mPluginMode == true)
			_getCertificateListCallback (aCertList);
		else 			__SANDBOX.extension.setcallbackFunc (_getCertificateListCallback);	
	};

	if (XecureCertShare.mPluginMode == false) 	{
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
	
		aResult = __SANDBOX.xcsInterface().XCSPCUpload(XecureCertShare.mServerPath);
	if (XecureCertShare.mPluginMode == true)
		_XCSPCUploadCallback (aResult);
	else 		__SANDBOX.extension.setcallbackFunc (_XCSPCUploadCallback);

	if (guideDialog && XecureCertShare.mPluginMode == false) 	{
		guideDialog.show ();
				
	}
	else
	{
		guideDialog = null;
	}
	
		aMediaType = Math.floor(parseInt(gSelectedMediaID, 10) / 100) * 100;

	var aCheckedRadioIndex = 0;
	
	switch (aMediaType) {
	case XCS.CERT_LOCATION_HARD: 		aCheckedRadioIndex = 0;
		break;
	case XCS.CERT_LOCATION_REMOVABLE: 		aCheckedRadioIndex = 1;
		break;

	default:
		alert("Unknown mediaType for checked radio"); 	}

	if (__SANDBOX.IEVersion == 8) {
		gInputHandler = new __SANDBOX.inputKeyHandler("certselect", __49, null, 1, -122, -3, "qwerty_crt", 30, 150);
	} else {
		gInputHandler = new __SANDBOX.inputKeyHandler("certselect", __49, null, 1, -120, 5, "qwerty_crt", 30, 150);
	}
		
	gInputHandler.onComplete({
		ok : function () {
			if (XecureCertShare.mDivInsertOption < 1) {
				if (onOKButtonClick(null) == false) {
					return false;
				}
			}
		},
		close : function () {
			if (XecureCertShare.mDivInsertOption < 1) {
				gInputHandler.clear(); 
			}
		}
	});

		if (setPasswordInputEnable()) {
		gInputHandler.onEnterKeyPress(__109);
	}
	gMediaRadio = XCS.UI.RadioButtonGroup([__19, __24]);

	__SANDBOX.setLocationEnable (["hard"], [__19]);
	__SANDBOX.setLocationEnable (["removable"], [__24]);

	if (XecureCertShare.mLanguage == "en-US") {
				var media_removable = __24.getElementsByClassName("xcs-rbg-text")[0];
		media_removable.style.letterSpacing = 0;
	}

	gMediaRadio.updateDisabled();
	gMediaRadio.setChecked(aCheckedRadioIndex);

	if (__SANDBOX.IEVersion < 7) {
		__77.style.display = "none";
		__76.style.display = "none";
		__65.style.display = "none";
		__64.style.display = "none";
		__49.className = "certselect_input_type1"; 	}

	if (XecureCertShare.mDivInsertOption > 0) {
		__19.removeAttribute("tabindex");
		__24.removeAttribute("tabindex");
		__27.removeAttribute("tabindex");
		__49.removeAttribute("tabindex");
	}

	var aNextButtonClickListeners;

	XCS.UI.setDragAndDrop(__2);
	gInputHandler_pass = new __SANDBOX.inputKeyHandler("xcsexport", __81, null, 2, -70, 5, "qwerty_crt", 30, 200);
	gInputHandler_confirm = new __SANDBOX.inputKeyHandler("xcsexport", __84, null, 3, -70, 5, "qwerty_crt", 30, 200);

	gInputHandler_pass.onComplete({
		ok : function () {},
		close : function () { gInputHandler_pass.clear(); }
	});
	gInputHandler_confirm.onComplete({
		ok : function () {},
		close : function () { gInputHandler_confirm.clear(); }
	});

		XCS.Event.add(__84, "keyup", function (e) {
		var aKeyCode = e.keyCode || e.which;
		if(aKeyCode == 13) {
			__109.click();
		}
	});

		XCS.Event.add(__96, "keyup", function (e) {
		var aKeyCode = e.keyCode || e.which;
		if(aKeyCode == 9) {
			if(e.shiftKey) {
							} else {
							}
		} else if (aKeyCode == 8) {
			
		} else {
			if( __96.value.length == 4 )
				__97.focus();
		}
	});
	XCS.Event.add(__97, "keyup", function (e) {
		var aKeyCode = e.keyCode || e.which;
		if(aKeyCode == 9) {
			if(e.shiftKey) {
							} else {
							}
		} else if (aKeyCode == 8) {
			if( __97.value.length == 0 )
				__96.focus();
		} else {
			if( __97.value.length == 4 )
				__98.focus();
		}
	});
	XCS.Event.add(__98, "keyup", function (e) {
		var aKeyCode = e.keyCode || e.which;
		if(aKeyCode == 9) {
			if(e.shiftKey) {
							} else {
							}
		} else if (aKeyCode == 8) {
			if( __98.value.length == 0 )
				__97.focus();
		} else {
			
		}
	});
		
	aNextButtonClickListeners = [
	    		function () {
						if(gSelectedIssuerRDN == null || gSelectedCertSerial == null){
				alert(XCS.S.nocertselecterror);
				return;
			}
			
						if (gInputHandler.getLength() == 0) {
				alert(XCS.S.nopassworderror);
				return;
			}

			if(XecureCertShare.mXCSXFree.mUseQR == true) 
			{
				__94.style.display = "none";
				__99.style.display = "block";
			}
			else
			{
				__94.style.display = "block";
				__99.style.display = "none";	
			}
			
						_setCertificateCallback = function (result)
			{
				__102.style.display = "block";
				
				if(result == null || result === 'undefined' || result.length < XecureCertShare.mXCSXFree.mQRLength) {
					alert(XCS.S.createcodeerror);
					
					onCancelButtonClick(); 				}
				else {
					makeQRCode(result);
				}
				
				__102.style.display = "none";
			};
			
						_verifyPasswordCallback = function(aPasswdVerifyResult)
			{
				if (aPasswdVerifyResult != 0) { 					gInputHandler.clear();
					aErrorObject = __SANDBOX.xcsInterface().setErrCodeAndMsg();
					if (aErrorObject.code == -1) {
						alert(aErrorObject.msg.replace(/\\n/g, '\r\n'));
						return false;
					} else if (aErrorObject.code == 22000015) {
						if (!confirm(XCS.S.incorrect_kmcertPW)) {
							return false;
						}
					}else {
						alert(XCS.S.passworderror1.split("%s").join(XecureCertShare.mLimitPassword) + XCS.S.passworderror2.split("%s").join(gPasswordTryCount));
						if (gPasswordTryCount++ >= XecureCertShare.mLimitPassword) {
							aPasswordResult = XecureCertShare.mLimitPassword;
							onCancelButtonClick();
						
							return false;
						} else {
							return false;
						}
					}
				} 
				else if(aPasswdVerifyResult == 0) { 					gPassword = aPassword;
					gEncryptID = aEncryptID;
					gInputHandler.finish();

					gNextEventCallback (true);
					__81.focus();
				}
				else if (gCertList[gSelectedRowIndex][0] == 1 && XecureCertShare.mExpireDateAlert) {
					aExpireMessage = XCS.S.willbeexpired.split("%s");
					aExpireMessage = aExpireMessage[0] + gCertList[gSelectedRowIndex][4] + aExpireMessage[1];
					aExpireMessage += "\n";
					aExpireMessage += XCS.S.renewplease1 + XCS.S.renewplease2;
					alert(aExpireMessage);	
				}

				if(XecureCertShare.mPluginMode == false && XecureCertShare.mUseMobilePwd == false && XecureCertShare.mXCSXFree.mUseQR == true ) 				{
					aResult = __SANDBOX.xcsInterface().setCertificate(12, gSelectedMediaID, gSelectedIssuerRDN, gSelectedCertSerial, gPassword, gPassword);
				
					__SANDBOX.extension.setcallbackFunc (_setCertificateCallback);		
				}
			};
			
			aEncryptID = gInputHandler.generateSessionID ();
			aPassword = gInputHandler.getValue (aEncryptID);

			if(XecureCertShare.mTransKeyEnable == true){
				aPasswdVerifyResult = __SANDBOX.xcsInterface().verifyPasswordTransKey(gSelectedMediaID,
					gSelectedIssuerRDN,
					gSelectedCertSerial,
					aPassword,
					window.location.host,
					aEncryptID);
			} else {
				aPasswdVerifyResult = __SANDBOX.xcsInterface().verifyPassword(gSelectedMediaID,
					gSelectedIssuerRDN,
					gSelectedCertSerial,
					aPassword);
			}
			
			if (XecureCertShare.mPluginMode == true) 
			{
				_verifyPasswordCallback (aPasswdVerifyResult);
			}
			else 			{
				__SANDBOX.extension.setcallbackFunc (_verifyPasswordCallback);
			}
			
		},

				

		
				function () {

						var	aNewPassword;
			var	aPasswordConfirm;
			var	aResult;
					
			_setCertificateCallback = function (result)
			{
				__102.style.display = "block";
				
				makeQRCode(result);
				
				__102.style.display = "none";
				
				__109.focus();	
				
				gNextEventCallback (true);
			};

						if(gInputHandler_pass.getLength() == 0 || gInputHandler_confirm.getLength() == 0) {
				
				if(gChangePwd == false && XecureCertShare.mXCSXFree.mUseQR == false) {
					gNextEventCallback (true);
					__96.focus();
					return;
				} else if (gChangePwd == false && XecureCertShare.mXCSXFree.mUseQR == true) {
					aResult = __SANDBOX.xcsInterface().setCertificate(XecureCertShare.mXCSXFree.mQRLength, gSelectedMediaID, gSelectedIssuerRDN, gSelectedCertSerial, gPassword, gPassword);
					__SANDBOX.extension.setcallbackFunc (_setCertificateCallback);
					return;
				} else {
					alert(XCS.S.lengtherror);
					return;
				}
			}

									aEncryptID1 = gInputHandler_pass.generateSessionID();
			aNewPassword = gInputHandler_pass.getValue(aEncryptID1);
			
			aEncryptID2 = gInputHandler_confirm.generateSessionID();
			aPasswordConfirm = gInputHandler_confirm.getValue(aEncryptID2);
			
			
									_checkPasswordCallback = function(result)
			{
				if (result != 0) {

					if (__SANDBOX.isFailed(result, gErrCallback)) {
						gInputHandler_pass.clear();
						gInputHandler_confirm.clear();
					}
					return false;
				}

				if(XecureCertShare.mPluginMode == false && XecureCertShare.mXCSXFree.mUseQR == true) 				{
					aResult = __SANDBOX.xcsInterface().setCertificate(XecureCertShare.mXCSXFree.mQRLength, gSelectedMediaID, gSelectedIssuerRDN, gSelectedCertSerial, gPassword, aNewPassword);
				
					__SANDBOX.extension.setcallbackFunc (_setCertificateCallback);		
				}
				else 
				{
					gNewEncryptID = aEncryptID1;
					gNewPassword = aNewPassword;
					gNextEventCallback (true);
					__96.focus();
				}
			};

			if(XecureCertShare.mPasswordCheckOption != 'undefined')
			{
				if(XecureCertShare.mTransKeyEnable == true) {
					aResult = __SANDBOX.xcsInterface().checkPasswordTransKey(aNewPassword, aPasswordConfirm, 1, XecureCertShare.mPasswordCheckOption, window.location.host, aEncryptID1, aEncryptID2);				
				} else {
					aResult = __SANDBOX.xcsInterface().checkPasswordWithOption(aNewPassword, aPasswordConfirm, 1, XecureCertShare.mPasswordCheckOption);			
				}
			}
			else
			{
				if(XecureCertShare.mTransKeyEnable == true) {
										alert('미구현 개발자 문의');
					return;
				} else {
					aResult = __SANDBOX.xcsInterface().checkPassword(aNewPassword, aPasswordConfirm, 1);
				}
			}
			if (XecureCertShare.mPluginMode == true)
				_checkPasswordCallback (aResult);
			else 				__SANDBOX.extension.setcallbackFunc (_checkPasswordCallback);
			
		},
		
				function () {

			if(XecureCertShare.mPluginMode == true || XecureCertShare.mXCSXFree.mUseQR == false) {
							
				var aAuthcode = __96.value + __97.value + __98.value;
				
								if( aAuthcode.length < 12) {
					alert(XCS.S.authcodeerror);
					return false;
				}
				else if( aAuthcode.length == 12) {
					if (XCS.Util.checkAuthcodeFormat (__96.value) == false
						|| XCS.Util.checkAuthcodeFormat (__97.value) == false
						|| XCS.Util.checkAuthcodeFormat (__98.value) == false)
					{
						alert (XCS.S.authcodesyntaxerror);
						return false;
					}

					gNextEventCallback (true);
				}
			}
			else { 				gNextEventCallback (true);
			}
		},

	];

	new XCS_UI_WizardView(__7,
			  aNextButtonClickListeners,
			  null);
	
	if (!(__SANDBOX.isIE() && navigator.userAgent.indexOf('Windows NT 6.2') >= 0)) {
		setCapsLockToolTip(__49, __73, 0, 58);
		setCapsLockToolTip(__81, __73, 0, 15);
		setCapsLockToolTip(__84, __73, 0, 58);
	}

	return 0;
}

function makeQRCode (authcode) {		
	
	var qr_img_div = __103;
	var qr_txt_div = __104;
	
	var qr_img = document.getElementById("xcs-qrcode");
	if(qr_img != null) {
		qr_img.parentNode.removeChild(qr_img);
	}
	
	var qr_txt = document.getElementById("xcs-qrcode-txt");
	if(qr_txt != null) {
		qr_txt.parentNode.removeChild(qr_txt);
	}
	
	qr_img = XCS.UI.createElement("div");
	qr_img.className = "xcs-qrcode";
	qr_img.id = "xcs-qrcode";
	qr_img_div.appendChild(qr_img);
	
	qr_txt = XCS.UI.createElement("div");
	qr_txt.className = "xcs-qrcode-txt"; 
	qr_txt.id = "xcs-qrcode-txt"; 
	qr_txt.innerHTML = authcode.substr(0, 4) + " " + authcode.substr(4, 4) + " " + (authcode.length > 8 ? authcode.substr(8, authcode.length - 8) : "");
	qr_txt_div.appendChild(qr_txt);
	
	var qrcode = new QRCode(qr_img, {
		width : 140,
		height : 140
	});
	
	qrcode.makeCode(authcode);
	var qrcode = document.getElementById('xcs-qrcode');
	if (qrcode == null) return;

	try {
		var img = qrcode.getElementsByTagName('img');
		img[0].setAttribute('alt', 'QR Code');
	} catch (e) {
		console.log('[error] set alt property');
	}
}

function setFocus() {
	gInputHandler_pass.refresh();
	__2.focus();
	
	var aTableRows = gCertTableBody.getElementsByTagName('tr');

	if (aTableRows.length > 0) {
		setTimeout (function () {
			gInputHandler.refresh();
		});
	}
}

function onOKButtonClick() {

}

function onCancelButtonClick() {
	gInputHandler.finish();
	gDialogObj.oncancel();
}

function onHddButtonClick(element) {
	var aCertList;

	refreshTableView("");

	__49.disabled = false;

	setPasswordInputEnable();

		_getCertificateListCallback = function (aCertList)
	{
		if (__SANDBOX.isFailed(aCertList)) {
			aCertList = "";
		}
		
		gSelectedMediaID = 1;
		gSelectedIssuerRDN = null;
		gSelectedCertSerial = null;
		gSelectedRowIndex = null;
		gSelectedCertClass = null;

		refreshTableView(aCertList);
		
		element.focus();
	};

	
	
	aCertList = __SANDBOX.xcsInterface().getCertificateList(1);
	if (XecureCertShare.mPluginMode == true)
		_getCertificateListCallback (aCertList);
	else 		__SANDBOX.extension.setcallbackFunc (_getCertificateListCallback);	
	
}

function onRemovableButtonClick(element) {
	var aMediaList,
		aMenuItems = [],
		aIDList,
		i;
	var guideModule;
	var guideDialog;

	refreshTableView("");

	setPasswordInputEnable();

	function aContextMenuFunc(aMenuData) {
		var aCertList;

		if (gDialogObj.type != "envelope")
			__49.disabled = false;

		gSelectedMediaID = aMenuData;
		gSelectedIssuerRDN = null;
		gSelectedCertSerial = null;
		gSelectedRowIndex = null;
	
				_getCertificateListCallback = function(aCertList) 
		{
			if (__SANDBOX.isFailed(aCertList)) {
				aCertList = "";
			}	
			
			refreshTableView(aCertList);
			__24.focus();
			
		};
		
		aCertList = __SANDBOX.xcsInterface().getCertificateList(aMenuData);
		if (XecureCertShare.mPluginMode == true)
			_getCertificateListCallback (aCertList);
		else 			__SANDBOX.extension.setcallbackFunc (_getCertificateListCallback);	

	};

		_getIDListCallback = function(result)
	{
		if (guideDialog && XecureCertShare.mPluginMode == false)
		{
			guideDialog.dispose ();
		}
	
		aIDList = result.split("\t\n");

		if (__SANDBOX.isFailed(aIDList, gErrCallback)) {
			onCancelButtonClick();
			return;
		}
				
		for (i = 0; i < aMediaList.length; i++) {
			if (aMediaList[i].length > 0) {
				aMenuItems.push({ item: aMediaList[i], data: Number(aIDList[i]) });
			}
		}	
		
		__49.disabled = true;
		XCS.UI.ContextMenu(element, XCS.S.media_removable_list, aMenuItems, aContextMenuFunc);
	};
	
	_getMediaListCallback = function(result)
	{
		aMediaList = result.split("\t\n");
		if (__SANDBOX.isFailed(aMediaList, gErrCallback)) {
			onCancelButtonClick();
			return;
		}
		
		aIDList = __SANDBOX.xcsInterface().getMediaList(1);
		if (XecureCertShare.mPluginMode == true)
			_getIDListCallback (aIDList);
		else 			__SANDBOX.extension.setcallbackFunc (_getIDListCallback);	
		
	};

	if (XecureCertShare.mPluginMode == false) 	{
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
	
	aMediaList = __SANDBOX.xcsInterface().getMediaList(0);
	if (XecureCertShare.mPluginMode == true)
		_getMediaListCallback (aMediaList);
	else 		__SANDBOX.extension.setcallbackFunc (_getMediaListCallback);	

	if (guideDialog && XecureCertShare.mPluginMode == false) 	{
		guideDialog.show ();
	}
	else
	{
		guideDialog = null;
	}
}

function refreshTableView(aCertList) {
	var aList;
	var aResultList = [];

	__54.style.display = "none";

	gSelectedIssuerRDN = null;
	gSelectedCertSerial = null;
	gSelectedCertClass = null;
	gSelectedRowIndex = null;

	aList = stringToCertList(aCertList);

	if (gCAList != "" && (gCAList != null || gCAList != undefined)) {
		aList.forEach(function(item) {
			gCAList.indexOf(XCS.Util.getCNFromRDN(item[5])) != -1 ? aResultList[aResultList.length] = item : '';
		});
	}

	if(XecureCertShare.mExpireDateShort) {
		aResultList.forEach(function(item, index) {
			aResultList[index][4] = item[4].slice(0,10);
		});
	}

	gCertTableView.refresh(aResultList);
	setTimeout (function () {gInputHandler.refresh();}, 0);
}

function onComplete(aResult) { 
	var	aResult;
	var	aEncryptID;
	var	aAuthcode;
	var	aNewPassword;
	var guideModule;
	var guideDialog;

	
	if(XecureCertShare.mPluginMode == false && XecureCertShare.mXCSXFree.mUseQR == true)
	{
		gDialogObj.onconfirm(0);
		gPassword = "";
		gInputHandler_pass.finish();
		gInputHandler_confirm.finish();
		return;
	}
	
		aEncryptID = gInputHandler_pass.generateSessionID ();
	aNewPassword = gInputHandler_pass.getValue (aEncryptID);
	if(XecureCertShare.mXCSXFree.mUseScrap != true) {
		aAuthcode = __96.value + __97.value + __98.value;
	} else {
				var randNum = Math.floor(Math.random() * 1000000000000);
		XecureCertShare.XCSSetRandomValue(randNum);
		aAuthcode = randNum + gUserId;
	}

		_setCertificateWithSecureInputCallback = function(result)
	{
		if (guideDialog && XecureCertShare.mPluginMode == false) 		{
			guideDialog.dispose ();
		}

		if (result !== 0) {

			if (__SANDBOX.isFailed(result, gErrCallback)) {
				gInputHandler.clear();
				gInputHandler_pass.clear();
				gInputHandler_confirm.clear();
			}
		}
		else {
			alert(XCS.S.success);
			gDialogObj.args.userCallback(aAuthcode);
		}

		gDialogObj.onconfirm(result);
		gPassword = "";
		gInputHandler_pass.finish();
		gInputHandler_confirm.finish();
	};
		_setAuthenticateCodeAndCertificateCallback = function(result)
	{
		if (guideDialog && XecureCertShare.mPluginMode == false) 		{
			guideDialog.dispose ();
		}

		if (result != 0) {

			if (__SANDBOX.isFailed(result, gErrCallback)) {
				gInputHandler.clear();
				gInputHandler_pass.clear();
				gInputHandler_confirm.clear();
			}
		}
		else {
			alert(XCS.S.success);
		}

		gDialogObj.onconfirm(result);
		gPassword = "";
		gNewPassword = "";
		gEncryptID = "";
		gNewEncryptID = "";
		gInputHandler_pass.finish();
		gInputHandler_confirm.finish();
	};

	if (XecureCertShare.mPluginMode == false) 	{
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
	
	if(XecureCertShare.mXCSXFree.mUseScrap == true) {
		aResult = __SANDBOX.xcsInterface().setCertificateWithSecureInput(aAuthcode, gSelectedMediaID, gSelectedIssuerRDN, gSelectedCertSerial, gPassword, gPassword);
		if (XecureCertShare.mPluginMode == true)
			_setCertificateWithSecureInputCallback (aResult);
		else
			__SANDBOX.extension.setcallbackFunc (_setCertificateWithSecureInputCallback);

	} else if(XecureCertShare.mPluginMode == true || XecureCertShare.mXCSXFree.mUseQR != true) {
		if (XecureCertShare.mUseMobilePwd == false || gChangePwd == false) {
			if(XecureCertShare.mTransKeyEnable)
				aResult = __SANDBOX.xcsInterface().setAuthenticateCodeAndCertificateTK(aAuthcode, gSelectedMediaID, gSelectedIssuerRDN, gSelectedCertSerial, gPassword, gPassword, window.location.host, gEncryptID, gEncryptID);
			else
				aResult = __SANDBOX.xcsInterface().setAuthenticateCodeAndCertificate(aAuthcode, gSelectedMediaID, gSelectedIssuerRDN, gSelectedCertSerial, gPassword, gPassword);
		}
		else {
			if(XecureCertShare.mTransKeyEnable)
				aResult = __SANDBOX.xcsInterface().setAuthenticateCodeAndCertificateTK(aAuthcode, gSelectedMediaID, gSelectedIssuerRDN, gSelectedCertSerial, gPassword, gNewPassword, window.location.host, gEncryptID, gNewEncryptID);
			else
				aResult = __SANDBOX.xcsInterface().setAuthenticateCodeAndCertificate(aAuthcode, gSelectedMediaID, gSelectedIssuerRDN, gSelectedCertSerial, gPassword, aNewPassword);
		}
	
		if (XecureCertShare.mPluginMode == true)
			_setAuthenticateCodeAndCertificateCallback (aResult);
		else
			__SANDBOX.extension.setcallbackFunc (_setAuthenticateCodeAndCertificateCallback);		
	}
	
	if (guideDialog && XecureCertShare.mPluginMode == false) 	{
		guideDialog.show ();
	}
	else
	{
		guideDialog = null;
	}

	return;
}

function stringToCertList(aString) {
	var aResultList = [],
		aList,
		i,
		j = 0;

	if (aString) {
		aList = XCS.stringToArray(aString);

		for (i = 0; i < aList.length; i++) {
			if (aList[i][1].length == 0) {
				aList[i][1] = XCS.S.privatecert;
			}
			if (aList[i][0] == '2' && !XecureCertShare.mShowExpiredCert) {
				continue;
			}else {
				aResultList[j++] = aList[i];
			}
		}
	}

	return aResultList;
}


function setPasswordInputEnable(aEnable) {
	var aPasswordInputEnable;

	if (aEnable == undefined) {
		if (gDialogObj.type == "envelope") {
			gNeedPassword = false;
			aPasswordInputEnable = false;
		} else {
			gNeedPassword = true;
			aPasswordInputEnable = !gDisablePasswordInput;
		}
	} else {
		aPasswordInputEnable = aEnable;
	}

	gInputHandler.enable(aPasswordInputEnable);
	gInputHandler.clear();
	
	return aPasswordInputEnable;
}


function XCS_UI_WizardView(aElement,
			   aNextButtonClickListeners,
			   aPrevButtonClickListeners) {
	var mPages = [],
		mCurrentPageIndex,
		mComplete = '',
		mNextButtonClickListeners,
		mPrevButtonClickListeners,
		temp,
		i;

	mCurrentPageIndex = 0;
	mNextButtonClickListeners = aNextButtonClickListeners;
	mPrevButtonClickListeners = aPrevButtonClickListeners;

		temp = aElement.firstChild;
	while (temp) {
		if (temp.nodeName.toLowerCase() == "div") {
			mPages.push(temp);
		}
		temp = temp.nextSibling;
	}

	for (i = 0; i < mPages.length; i++) {
		hide(mPages[i]);
	}

	show(mPages[0]);
	__108.disabled = true;

	if(XecureCertShare.mXCSXFree.mUseScrap == true) {
		gChangePwd = false;
		__108.style.display = "none";
		__109.innerHTML = XCS.S.button_complete;
	}
    
	XCS.Event.add(__109, "click", function (e) {
		
		gNextEventCallback = function ()
		{		
						if (mCurrentPageIndex == mPages.length - 1 || XecureCertShare.mXCSXFree.mUseScrap == true) {
			    onComplete(mComplete);
			    return;
			}
				
			if (mCurrentPageIndex == 0) {
				__108.disabled = false;
			}
			hide(mPages[mCurrentPageIndex]);
			
			if (mCurrentPageIndex == 0 && XecureCertShare.mUseMobilePwd == false)
			{
				mCurrentPageIndex++;
			}
						if (mCurrentPageIndex == mPages.length - 2) {
				__109.innerHTML = XCS.S.button_complete;
			}
			show(mPages[++mCurrentPageIndex]);			

		};
		
		if (mNextButtonClickListeners && mNextButtonClickListeners[mCurrentPageIndex]) {
			if (!mNextButtonClickListeners[mCurrentPageIndex](e)) {
				return;
			}
		}

	});

	XCS.Event.add(__108, "click", function (e) {
		if (mPrevButtonClickListeners && mPrevButtonClickListeners[mCurrentPageIndex]) {
			if (!mPrevButtonClickListeners[mCurrentPageIndex](e)) {
				return;
			}
		}

		if (mCurrentPageIndex == mPages.length - 1) {
			__109.innerHTML = XCS.S.button_next;
		}

		if (mCurrentPageIndex == 1) {
									__108.disabled = true; 
			gInputHandler.refresh();
		}
		else if(mCurrentPageIndex == 2) {
			gInputHandler.refresh();
		}
		
		
		if (mCurrentPageIndex - 1 >= 0) {
			hide(mPages[mCurrentPageIndex]);
			if (mCurrentPageIndex == 2 && XecureCertShare.mUseMobilePwd == false)
			{
				mCurrentPageIndex--;
			}
			show(mPages[--mCurrentPageIndex]);
		}
	});

	function hide(element) { element.style.display = "none"; }
	function show(element) { 
		element.style.display = "block";
		if (XecureCertShare.mTransKeyEnable) {
			var aElement1 = document.getElementById("xcs_export_tek_input1");
			if(aElement1) {
				var aElementPosition = aElement1.getBoundingClientRect();
				var aInputTransKeyXY = parseInt(aElementPosition.left) + " " + (parseInt(aElementPosition.top) + parseInt(aElement1.offsetHeight) + parseInt(window.pageYOffset));
				aElement1.setAttribute ("data-tk-kbdxy", aInputTransKeyXY);
			}
			var aElement2 = document.getElementById("xcs_export_tek_input2");
			if(aElement2) {
				var aElementPosition = aElement2.getBoundingClientRect();
				var aInputTransKeyXY = parseInt(aElementPosition.left) + " " + (parseInt(aElementPosition.top) + parseInt(aElement2.offsetHeight) + parseInt(window.pageYOffset));
				aElement2.setAttribute ("data-tk-kbdxy", aInputTransKeyXY);
			}
		}
		
	}
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
__6.setAttribute('alt', XCS.S.xcsexport, 0);
__5.appendChild(__6);
__4.appendChild(__5);
var __7 = XCS.UI.createElement('DIV');
__7.className = 'xcs-xcsexport-area';
var __8 = XCS.UI.createElement('DIV');
__8.setAttribute('id', 'xcs_page1', 0);
__8.className = 'xcs-xcsexport-sec';
__8.style.display = 'block';
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
var __14 = XCS.UI.createElement('FIELDSET');
__14.className = 'xcs-location-item';
var __15 = XCS.UI.createElement('TABLE');
__15.setAttribute('cellpadding', '0', 0);
__15.setAttribute('cellspacing', '0', 0);
__15.className = 'xcs-cert-position';
__15.style.width = '410px';
var __16 = XCS.UI.createElement('TBODY');
var __17 = XCS.UI.createElement('TR');
var __18 = XCS.UI.createElement('TD');
var __19 = XCS.UI.createElement('BUTTON');
__19.setAttribute('aria-checked', 'false', 0);
__19.setAttribute('type', 'button', 0);
__19.setAttribute('tabindex', '3', 0);
__19.setAttribute('id', 'xcs_media_hdd', 0);
__19.onclick = function(event) {onHddButtonClick(this);};
__19.setAttribute('title', XCS.S.media_hdd, 0);
var __20 = XCS.UI.createElement('LABEL');
var __21 = XCS.UI.createElement('SPAN');
__21.className = 'xcs-ico-hdd';
__20.appendChild(__21);
var __22 = XCS.UI.createElement('SPAN');
__22.className = 'xcs-rbg-text';
__22.appendChild(document.createTextNode(XCS.S.media_hdd));
__20.appendChild(__22);
__19.appendChild(__20);
__18.appendChild(__19);
__17.appendChild(__18);
var __23 = XCS.UI.createElement('TD');
var __24 = XCS.UI.createElement('BUTTON');
__24.setAttribute('aria-checked', 'false', 0);
__24.setAttribute('type', 'button', 0);
__24.setAttribute('tabindex', '3', 0);
__24.setAttribute('id', 'xcs_media_removable', 0);
__24.onclick = function(event) {onRemovableButtonClick(this);};
__24.setAttribute('title', XCS.S.media_removable, 0);
var __25 = XCS.UI.createElement('SPAN');
__25.className = 'xcs-ico-removable';
__24.appendChild(__25);
var __26 = XCS.UI.createElement('SPAN');
__26.className = 'xcs-rbg-text';
__26.style.letterSpacing = '-2px';
__26.appendChild(document.createTextNode(XCS.S.media_removable));
__24.appendChild(__26);
__23.appendChild(__24);
__17.appendChild(__23);
__16.appendChild(__17);
__15.appendChild(__16);
__14.appendChild(__15);
__8.appendChild(__14);
var __27 = XCS.UI.createElement('DIV');
__27.setAttribute('tabindex', '3', 0);
__27.setAttribute('id', 'xcs_cert_table', 0);
__27.setAttribute('title', XCS.S.certtable, 0);
__27.setAttribute('role', 'application', 0);
__27.className = 'xcs-tableview';
__27.style.width = '408px';
var __28 = XCS.UI.createElement('TABLE');
__28.setAttribute('cellpadding', '0', 0);
__28.setAttribute('cellspacing', '0', 0);
__28.setAttribute('role', 'grid', 0);
__28.setAttribute('summary', XCS.S.table_summary, 0);
var __29 = XCS.UI.createElement('THEAD');
var __30 = XCS.UI.createElement('TR');
var __31 = XCS.UI.createElement('TH');
__31.setAttribute('role', 'columnheader', 0);
__31.setAttribute('scope', 'col', 0);
__31.className = 'xcs-mcert';
__31.setAttribute('sortType', 'IT', 0);
__31.style.width = '79px';
var __32 = XCS.UI.createElement('DIV');
__32.className = 'wide-cert-table-resizearea';
__32.appendChild(document.createTextNode(XCS.S.table_section));
var __33 = XCS.UI.createElement('DIV');
__32.appendChild(__33);
__31.appendChild(__32);
__30.appendChild(__31);
var __34 = XCS.UI.createElement('TH');
__34.setAttribute('role', 'columnheader', 0);
__34.setAttribute('scope', 'col', 0);
__34.className = 'xcs-mcert2';
__34.setAttribute('sortType', 'T', 0);
__34.style.width = '160px';
var __35 = XCS.UI.createElement('DIV');
__35.className = 'wide-cert-table-resizearea';
__35.appendChild(document.createTextNode(XCS.S.table_user));
var __36 = XCS.UI.createElement('DIV');
__35.appendChild(__36);
__34.appendChild(__35);
__30.appendChild(__34);
var __37 = XCS.UI.createElement('TH');
__37.setAttribute('role', 'columnheader', 0);
__37.setAttribute('scope', 'col', 0);
__37.className = 'xcs-mcert3';
__37.setAttribute('sortType', 'T', 0);
__37.style.width = '84px';
var __38 = XCS.UI.createElement('DIV');
__38.className = 'wide-cert-table-resizearea';
__38.appendChild(document.createTextNode(XCS.S.table_expire));
var __39 = XCS.UI.createElement('DIV');
__38.appendChild(__39);
__37.appendChild(__38);
__30.appendChild(__37);
var __40 = XCS.UI.createElement('TH');
__40.setAttribute('role', 'columnheader', 0);
__40.setAttribute('scope', 'col', 0);
__40.className = 'xcs-mcert4';
__40.setAttribute('sortType', 'T', 0);
__40.style.width = '82px';
var __41 = XCS.UI.createElement('DIV');
__41.className = 'wide-cert-table-resizearea';
__41.appendChild(document.createTextNode(XCS.S.table_issuer));
var __42 = XCS.UI.createElement('DIV');
__41.appendChild(__42);
__40.appendChild(__41);
__30.appendChild(__40);
__29.appendChild(__30);
__28.appendChild(__29);
var __43 = XCS.UI.createElement('TBODY');
var __44 = XCS.UI.createElement('TR');
var __45 = XCS.UI.createElement('TD');
__44.appendChild(__45);
__43.appendChild(__44);
__28.appendChild(__43);
__27.appendChild(__28);
__8.appendChild(__27);
var __46 = XCS.UI.createElement('FORM');
if (__SANDBOX.IEVersion <= 8) {
__46.mergeAttributes(XCS.UI.createElement("<FORM name='xcs_certselect_tek_form'>"),false);
} else {
__46.setAttribute('name', 'xcs_certselect_tek_form', 0);
}
__46.setAttribute('id', 'xcs_certselect_tek_form', 0);
__46.onsubmit = function(event) {return false;};
var __47 = XCS.UI.createElement('DIV');
__47.className = 'xcs-passwd-field';
__47.setAttribute('id', 'certselect_tk1', 0);
var __48 = XCS.UI.createElement('LABEL');
__48.htmlFor = 'xcs_certselect_tek_input1';
__48.className = 'xcs-tit-pw';
__48.appendChild(document.createTextNode(XCS.S.certpasswd));
__47.appendChild(__48);
var __49 = XCS.UI.createElement('INPUT');
__49.setAttribute('type', 'password', 0);
__49.setAttribute('tabindex', '3', 0);
if (__SANDBOX.IEVersion <= 8) {
__49.mergeAttributes(XCS.UI.createElement("<INPUT name='certselect_tek_input1'>"),false);
} else {
__49.setAttribute('name', 'certselect_tek_input1', 0);
}
__49.setAttribute('id', 'xcs_certselect_tek_input1', 0);
__49.setAttribute('title', XCS.S.passwd, 0);
__49.className = 'xcs-pw-box';
__47.appendChild(__49);
__46.appendChild(__47);
var __50 = XCS.UI.createElement('DIV');
__50.className = 'xcs-passwd-guide';
var __51 = XCS.UI.createElement('IMG');
__51.setAttribute('src', XecureCertShare.mBasePath+'/img/bu.png', 0);
__51.setAttribute('width', '12', 0);
__51.setAttribute('height', '12', 0);
__51.setAttribute('alt', XCS.S.blank, 0);
__50.appendChild(__51);
var __52 = XCS.UI.createElement('SPAN');
__52.appendChild(document.createTextNode(XCS.S.passwordinfo));
__50.appendChild(__52);
__46.appendChild(__50);
__8.appendChild(__46);
var __53 = XCS.UI.createElement('DIV');
__53.className = 'xcs-widget-sec';
var __54 = XCS.UI.createElement('DIV');
__54.setAttribute('id', 'xcs_expire_alert', 0);
__54.className = 'xcs-expire-alert';
var __55 = XCS.UI.createElement('DIV');
__55.className = 'xcs-expire-icon';
var __56 = XCS.UI.createElement('IMG');
__56.setAttribute('src', XecureCertShare.mBasePath+'/img/cert1.png', 0);
__56.setAttribute('width', '18', 0);
__56.setAttribute('height', '16', 0);
__56.setAttribute('alt', XCS.S.cert_status1, 0);
__55.appendChild(__56);
__54.appendChild(__55);
var __57 = XCS.UI.createElement('DIV');
__57.setAttribute('id', 'xcs_expire_message', 0);
__57.className = 'xcs-expire-message';
__57.appendChild(document.createTextNode(XCS.S.willbeexpired));
__54.appendChild(__57);
var __58 = XCS.UI.createElement('DIV');
__58.className = 'xcs-renew-message';
__58.appendChild(document.createTextNode(XCS.S.renewplease));
__54.appendChild(__58);
var __59 = XCS.UI.createElement('DIV');
__59.setAttribute('id', 'xcs_expire_arrow_border', 0);
__59.className = 'xcs-expire-arrow-border';
__54.appendChild(__59);
var __60 = XCS.UI.createElement('DIV');
__60.setAttribute('id', 'xcs_expire_arrow', 0);
__60.className = 'xcs-expire-arrow';
__54.appendChild(__60);
__53.appendChild(__54);
var __61 = XCS.UI.createElement('DIV');
__61.setAttribute('id', 'xcs_capslock', 0);
__61.className = 'xcs-expire-alert';
__61.style.display = 'none';
var __62 = XCS.UI.createElement('SPAN');
__62.className = 'fb';
__62.appendChild(document.createTextNode(XCS.S.tooltip_capslock1));
__61.appendChild(__62);
var __63 = XCS.UI.createElement('SPAN');
__63.className = 'fc';
__63.appendChild(document.createTextNode(XCS.S.tooltip_capslock2));
__61.appendChild(__63);
var __64 = XCS.UI.createElement('DIV');
__64.setAttribute('id', 'xcs_capslock_arrow_border', 0);
__64.className = 'xcs-expire-arrow-border';
__61.appendChild(__64);
var __65 = XCS.UI.createElement('DIV');
__65.setAttribute('id', 'xcs_capslock_arrow', 0);
__65.className = 'xcs-expire-arrow';
__61.appendChild(__65);
__53.appendChild(__61);
__8.appendChild(__53);
__7.appendChild(__8);
var __66 = XCS.UI.createElement('DIV');
__66.setAttribute('id', 'xcs_page2', 0);
__66.className = 'xcs-xcsexport-sec';
__66.style.display = 'none';
var __67 = XCS.UI.createElement('DIV');
__67.className = 'xcs-box-layout';
var __68 = XCS.UI.createElement('DIV');
__68.className = 'xcs-box-border';
var __69 = XCS.UI.createElement('DIV');
__69.className = 'xcs-step-info';
__69.appendChild(document.createTextNode(XCS.S.seconddesc));
__68.appendChild(__69);
var __70 = XCS.UI.createElement('DIV');
__70.className = 'xcs-step-info-detail';
var __71 = XCS.UI.createElement('SPAN');
__71.className = 'third';
__71.appendChild(document.createTextNode(XCS.S.seconddetaildesc));
__70.appendChild(__71);
__68.appendChild(__70);
__67.appendChild(__68);
__66.appendChild(__67);
var __72 = XCS.UI.createElement('DIV');
__72.className = 'xcs-widget-sec';
var __73 = XCS.UI.createElement('DIV');
__73.setAttribute('id', 'xcs_capslock', 0);
__73.className = 'xcs-expire-alert';
var __74 = XCS.UI.createElement('SPAN');
__74.className = 'fb';
__74.appendChild(document.createTextNode(XCS.S.tooltip_capslock1));
__73.appendChild(__74);
var __75 = XCS.UI.createElement('SPAN');
__75.className = 'fc';
__75.appendChild(document.createTextNode(XCS.S.tooltip_capslock2));
__73.appendChild(__75);
var __76 = XCS.UI.createElement('DIV');
__76.setAttribute('id', 'xcs_expire_arrow_border', 0);
__76.className = ' ';
__73.appendChild(__76);
var __77 = XCS.UI.createElement('DIV');
__77.setAttribute('id', 'xcs_expire_arrow', 0);
__77.className = 'xcs-expire-arrow';
__73.appendChild(__77);
__72.appendChild(__73);
__66.appendChild(__72);
var __78 = XCS.UI.createElement('FORM');
if (__SANDBOX.IEVersion <= 8) {
__78.mergeAttributes(XCS.UI.createElement("<FORM name='xcs_export_tek_form'>"),false);
} else {
__78.setAttribute('name', 'xcs_export_tek_form', 0);
}
__78.setAttribute('id', 'xcs_export_tek_form', 0);
__78.onsubmit = function(event) {return false;};
var __79 = XCS.UI.createElement('DIV');
__79.className = 'xcs-passwd-group';
__79.style.marginLeft = '10px';
__79.setAttribute('id', 'xcsexport_tk1', 0);
var __80 = XCS.UI.createElement('LABEL');
__80.className = 'xcs-pw-txt';
__80.htmlFor = 'xcs_export_tek_input1';
__80.appendChild(document.createTextNode(XCS.S.passwd));
__79.appendChild(__80);
var __81 = XCS.UI.createElement('INPUT');
__81.setAttribute('tabindex', '3', 0);
if (__SANDBOX.IEVersion <= 8) {
__81.mergeAttributes(XCS.UI.createElement("<INPUT name='export_tek_input1'>"),false);
} else {
__81.setAttribute('name', 'export_tek_input1', 0);
}
__81.setAttribute('id', 'xcs_export_tek_input1', 0);
__81.setAttribute('type', 'password', 0);
__81.className = 'xcs-input-passwd';
__81.setAttribute('title', XCS.S.passwd, 0);
__79.appendChild(__81);
__78.appendChild(__79);
var __82 = XCS.UI.createElement('DIV');
__82.className = 'xcs-passwd-group';
__82.style.marginLeft = '10px';
__82.setAttribute('id', 'xcsexport_tk2', 0);
var __83 = XCS.UI.createElement('LABEL');
__83.className = 'xcs-pw-txt';
__83.htmlFor = 'xcs_export_tek_input2';
__83.appendChild(document.createTextNode(XCS.S.passwdconfirm));
__82.appendChild(__83);
var __84 = XCS.UI.createElement('INPUT');
__84.setAttribute('tabindex', '3', 0);
if (__SANDBOX.IEVersion <= 8) {
__84.mergeAttributes(XCS.UI.createElement("<INPUT name='export_tek_input2'>"),false);
} else {
__84.setAttribute('name', 'export_tek_input2', 0);
}
__84.setAttribute('id', 'xcs_export_tek_input2', 0);
__84.setAttribute('type', 'password', 0);
__84.className = 'xcs-input-passwd';
__84.setAttribute('title', XCS.S.passwdconfirm, 0);
__82.appendChild(__84);
__78.appendChild(__82);
var __85 = XCS.UI.createElement('DIV');
__85.className = 'xcs-passwd-group';
__85.style.marginLeft = '10px';
var __86 = XCS.UI.createElement('INPUT');
__86.setAttribute('tabindex', '3', 0);
__86.setAttribute('type', 'checkbox', 0);
__86.className = 'xcs-inputcheck';
__86.setAttribute('id', 'xcs_no_change_pwd', 0);
__86.onclick = function(event) {enableChangePwd(this)};
if (__SANDBOX.IEVersion <= 8) {
__86.mergeAttributes(XCS.UI.createElement("<INPUT name='export_tex_pwdOption'>"),false);
} else {
__86.setAttribute('name', 'export_tex_pwdOption', 0);
}
__86.setAttribute('value', '', 0);
__86.setAttribute('title', XCS.S.no_change_pwd, 0);
__85.appendChild(__86);
__85.appendChild(document.createTextNode(XCS.S.no_change_pwd));
var __87 = XCS.UI.createElement('BR');
__85.appendChild(__87);
__78.appendChild(__85);
__66.appendChild(__78);
__7.appendChild(__66);
var __88 = XCS.UI.createElement('DIV');
__88.setAttribute('id', 'xcs_page3', 0);
__88.className = 'xcs-xcsexport-sec';
__88.style.display = 'none';
var __89 = XCS.UI.createElement('DIV');
__89.className = 'xcs-box-layout';
var __90 = XCS.UI.createElement('DIV');
__90.className = 'xcs-box-border';
var __91 = XCS.UI.createElement('DIV');
__91.className = 'xcs-step-info';
__91.appendChild(document.createTextNode(XCS.S.thirddesc));
__90.appendChild(__91);
var __92 = XCS.UI.createElement('DIV');
__92.className = 'xcs-step-info-detail';
var __93 = XCS.UI.createElement('SPAN');
__93.className = 'second';
__93.appendChild(document.createTextNode(XCS.S.thirddetaildesc));
__92.appendChild(__93);
__90.appendChild(__92);
__89.appendChild(__90);
__88.appendChild(__89);
var __94 = XCS.UI.createElement('DIV');
__94.className = 'xcs-passwd-field';
__94.style.display = 'none';
var __95 = XCS.UI.createElement('LABEL');
__95.htmlFor = 'xcs_authcode_input';
__95.className = 'xcs-tit-auth';
__95.style.marginLeft = '10px';
__95.appendChild(document.createTextNode(XCS.S.authcode));
__94.appendChild(__95);
var __96 = XCS.UI.createElement('INPUT');
__96.setAttribute('type', 'text', 0);
__96.setAttribute('tabindex', '3', 0);
if (__SANDBOX.IEVersion <= 8) {
__96.mergeAttributes(XCS.UI.createElement("<INPUT name='authcode_input1'>"),false);
} else {
__96.setAttribute('name', 'authcode_input1', 0);
}
__96.setAttribute('id', 'xcs_authcode_input1', 0);
__96.setAttribute('title', XCS.S.authcode, 0);
__96.className = 'xcs-auth-box';
__96.setAttribute('maxlength', '4', 0);
__96.style.marginLeft = '10px';
__96.style.textAlign = 'center';
__94.appendChild(__96);
__94.appendChild(document.createTextNode(XCS.S.authcodedelimiter));
var __97 = XCS.UI.createElement('INPUT');
__97.setAttribute('type', 'text', 0);
__97.setAttribute('tabindex', '3', 0);
if (__SANDBOX.IEVersion <= 8) {
__97.mergeAttributes(XCS.UI.createElement("<INPUT name='authcode_input2'>"),false);
} else {
__97.setAttribute('name', 'authcode_input2', 0);
}
__97.setAttribute('id', 'xcs_authcode_input2', 0);
__97.setAttribute('title', XCS.S.authcode, 0);
__97.className = 'xcs-auth-box';
__97.setAttribute('maxlength', '4', 0);
__97.style.textAlign = 'center';
__94.appendChild(__97);
__94.appendChild(document.createTextNode(XCS.S.authcodedelimiter));
var __98 = XCS.UI.createElement('INPUT');
__98.setAttribute('type', 'text', 0);
__98.setAttribute('tabindex', '3', 0);
if (__SANDBOX.IEVersion <= 8) {
__98.mergeAttributes(XCS.UI.createElement("<INPUT name='authcode_input3'>"),false);
} else {
__98.setAttribute('name', 'authcode_input3', 0);
}
__98.setAttribute('id', 'xcs_authcode_input3', 0);
__98.setAttribute('title', XCS.S.authcode, 0);
__98.className = 'xcs-auth-box';
__98.setAttribute('maxlength', '4', 0);
__98.style.textAlign = 'center';
__94.appendChild(__98);
__88.appendChild(__94);
var __99 = XCS.UI.createElement('DIV');
__99.className = 'xcs-qrcode-field';
__99.style.display = 'none';
var __100 = XCS.UI.createElement('DIV');
__100.className = 'authcode_qr_div';
var __101 = XCS.UI.createElement('DIV');
__101.className = 'authcode_qr_in_div';
var __102 = XCS.UI.createElement('DIV');
__102.className = 'qr_ing_txt';
__102.appendChild(document.createTextNode(XCS.S.qr_ing));
__101.appendChild(__102);
var __103 = XCS.UI.createElement('DIV');
__103.className = 'authcode_qr_img_div';
__101.appendChild(__103);
__100.appendChild(__101);
__99.appendChild(__100);
var __104 = XCS.UI.createElement('DIV');
__104.className = 'authcode_qr_txt_div';
__99.appendChild(__104);
var __105 = XCS.UI.createElement('DIV');
__105.className = 'qr_quide_txt';
__105.appendChild(document.createTextNode(XCS.S.qr_guide_msg));
__99.appendChild(__105);
__88.appendChild(__99);
__7.appendChild(__88);
__4.appendChild(__7);
var __106 = XCS.UI.createElement('DIV');
__106.className = 'xcs-buttons-layout';
var __107 = XCS.UI.createElement('BUTTON');
__107.setAttribute('tabindex', '3', 0);
__107.setAttribute('type', 'button', 0);
__107.setAttribute('id', 'xcs_cancel', 0);
__107.onclick = function(event) {onCancelButtonClick()};
__107.appendChild(document.createTextNode(XCS.S.button_cancel));
__106.appendChild(__107);
var __108 = XCS.UI.createElement('BUTTON');
__108.setAttribute('tabindex', '3', 0);
__108.setAttribute('type', 'button', 0);
__108.setAttribute('id', 'xcs_previous', 0);
__108.appendChild(document.createTextNode(XCS.S.button_prev));
__106.appendChild(__108);
var __109 = XCS.UI.createElement('BUTTON');
__109.setAttribute('tabindex', '3', 0);
__109.setAttribute('type', 'button', 0);
__109.setAttribute('id', 'xcs_next', 0);
__109.appendChild(document.createTextNode(XCS.S.button_next));
__106.appendChild(__109);
__4.appendChild(__106);
__1.appendChild(__4);
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
