"use strict";
globalThis["webpackHotUpdatereact_chrome_app"]("contentScript",{

/***/ "./src/pages/content/index.js":
/*!************************************!*\
  !*** ./src/pages/content/index.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Content */ "./src/pages/content/Content.jsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

// @ts-nocheck



const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";
const root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(rootElement);
const selectRoot = () => {
  const body = document.querySelector(".GyAeWb");
  const rightSide = document.querySelector(".TQc1id");
  const topSnippet = document.querySelector(".M8OgIe");
  if (rightSide) {
    body.removeChild(rightSide);
    body.appendChild(rootElement);
    body.style.flexWrap = "nowrap";
  } else if (topSnippet) {
    const wrapper = document.createElement("div");
    wrapper.className = "content-warpper";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "row";
    const leftSide = document.querySelector("#center_col");
    wrapper.appendChild(leftSide);
    wrapper.appendChild(rootElement);
    body.appendChild(wrapper);
  } else {
    body.append(rootElement);
    body.style.flexWrap = "nowrap";
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Content__WEBPACK_IMPORTED_MODULE_2__["default"], null);
};
root.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null, selectRoot()));

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
/******/ 	__webpack_require__.h = () => ("fda1616ff3f20dcd189a")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=contentScript.ee0f345b2dc8e9aee2a5.hot-update.js.map