"use strict";
globalThis["webpackHotUpdatereact_chrome_app"]("popup",{

/***/ "./src/pages/popup/Popup.jsx":
/*!***********************************!*\
  !*** ./src/pages/popup/Popup.jsx ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/env */ "./utils/env.js");
/* harmony import */ var _utils_env__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_env__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();


const Popup = () => {
  _s();
  const [accessToken, setAccessToken] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [userName, setUserName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateToken") {
      setAccessToken(message.accessToken);
    }
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    chrome.runtime.sendMessage({
      action: "getToken"
    }, response => {
      console.log("got accessToken", response.accessToken);
      setAccessToken(response.accessToken);
    });
  }, [setAccessToken]);
  const gotoHomepage = url => {
    chrome.tabs.create({
      url
    });
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (accessToken) {
      const getUserName = async accessToken => {
        try {
          const response = await fetch(`${_utils_env__WEBPACK_IMPORTED_MODULE_1__.SERVER_ADDR}/giveUserName`, {
            method: "post",
            headers: new Headers({
              Authorization: `Bearer ${accessToken}`
            })
          });
          const data = await response.json();
          setUserName(data.username);
        } catch (error) {
          console.log(error);
        }
      };
      getUserName(accessToken);
    }
  }, [accessToken]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      width: "300px",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, accessToken ? `환영합니다 ${userName}님!` : "스크랩하려면 로그인해주세요."), accessToken ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => {
      gotoHomepage(_utils_env__WEBPACK_IMPORTED_MODULE_1__.HOMEPAGE_ADDR + "/storage");
    }
  }, "\uBCF4\uAD00\uD568 \uAC00\uAE30") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    onClick: () => {
      gotoHomepage(_utils_env__WEBPACK_IMPORTED_MODULE_1__.HOMEPAGE_ADDR);
    }
  }, "\uB85C\uADF8\uC778 \uD558\uB7EC\uAC00\uAE30"));
};
_s(Popup, "/USa4vIwDG+m4m/XizTuphmO91o=");
_c = Popup;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popup);
var _c;
__webpack_require__.$Refresh$.register(_c, "Popup");

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5fe480460e2dda145a93")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=popup.e15c0e250f51339d1ef3.hot-update.js.map