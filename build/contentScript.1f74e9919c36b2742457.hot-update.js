"use strict";
globalThis["webpackHotUpdatereact_chrome_app"]("contentScript",{

/***/ "./src/pages/content/Content.jsx":
/*!***************************************!*\
  !*** ./src/pages/content/Content.jsx ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../components/ScrapButton'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../util/handlePreviewEvent'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../components/Shortcuts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();
// @ts-nocheck




function Content() {
  _s();
  const [previewUrl, setPreviewUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [accessToken, setAccessToken] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  document.addEventListener("mouseover", async e => {
    setPreviewUrl(await Object(function webpackMissingModule() { var e = new Error("Cannot find module '../util/handlePreviewEvent'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(e, 700));
  }, {
    capture: true
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    chrome.runtime.sendMessage({
      action: "getToken"
    }, response => {
      if (response.accessToken) {
        setAccessToken(response.accessToken);
      }
    });
  }, []);
  chrome.runtime.onMessage.addListener((message, ..._) => {
    if (message.action === "updateToken" && !message.variable) {
      setAccessToken(message.accessToken);
    }
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../components/Shortcuts'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
    setPreviewUrl: setPreviewUrl
  }), accessToken && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../components/ScrapButton'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
    accessToken: accessToken
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      width: "40vw",
      marginLeft: "35px",
      marginTop: "-30px",
      height: "78vh",
      top: "72px",
      position: "sticky"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("iframe", {
    id: "previewer",
    title: "previewer",
    src: previewUrl,
    style: {
      width: "100%",
      height: "100%"
    }
  })));
}
_s(Content, "iRLnJBVByS9+HBP6MLQMP3mZrHI=");
_c = Content;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Content);
var _c;
__webpack_require__.$Refresh$.register(_c, "Content");

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
/******/ 	__webpack_require__.h = () => ("ee0f345b2dc8e9aee2a5")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=contentScript.1f74e9919c36b2742457.hot-update.js.map