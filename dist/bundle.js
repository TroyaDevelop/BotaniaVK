/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _vkontakte_vk_bridge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vkontakte/vk-bridge */ \"./node_modules/@vkontakte/vk-bridge/dist/index.umd.js\");\n\n\n\n\n// Инициализация VK Bridge\n_vkontakte_vk_bridge__WEBPACK_IMPORTED_MODULE_2__.send('VKWebAppInit').then(function () {\n  console.log('VK Bridge initialized');\n})[\"catch\"](function (error) {\n  console.error('VK Bridge initialization failed', error);\n});\nfunction testVkBridge() {\n  return _testVkBridge.apply(this, arguments);\n}\nfunction _testVkBridge() {\n  _testVkBridge = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__.mark(function _callee() {\n    var userInfo;\n    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__.wrap(function _callee$(_context) {\n      while (1) switch (_context.prev = _context.next) {\n        case 0:\n          _context.prev = 0;\n          _context.next = 3;\n          return _vkontakte_vk_bridge__WEBPACK_IMPORTED_MODULE_2__.send('VKWebAppGetUserInfo');\n        case 3:\n          userInfo = _context.sent;\n          console.log('User Info:', userInfo);\n          _context.next = 10;\n          break;\n        case 7:\n          _context.prev = 7;\n          _context.t0 = _context[\"catch\"](0);\n          console.error(\"Error:\", _context.t0);\n        case 10:\n        case \"end\":\n          return _context.stop();\n      }\n    }, _callee, null, [[0, 7]]);\n  }));\n  return _testVkBridge.apply(this, arguments);\n}\ntestVkBridge();\n\n//# sourceURL=webpack://botania-vk/./main.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _asyncToGenerator)\n/* harmony export */ });\nfunction asyncGeneratorStep(n, t, e, r, o, a, c) {\n  try {\n    var i = n[a](c),\n      u = i.value;\n  } catch (n) {\n    return void e(n);\n  }\n  i.done ? t(u) : Promise.resolve(u).then(r, o);\n}\nfunction _asyncToGenerator(n) {\n  return function () {\n    var t = this,\n      e = arguments;\n    return new Promise(function (r, o) {\n      var a = n.apply(t, e);\n      function _next(n) {\n        asyncGeneratorStep(a, r, o, _next, _throw, \"next\", n);\n      }\n      function _throw(n) {\n        asyncGeneratorStep(a, r, o, _next, _throw, \"throw\", n);\n      }\n      _next(void 0);\n    });\n  };\n}\n\n\n//# sourceURL=webpack://botania-vk/./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _typeof = (__webpack_require__(/*! ./typeof.js */ \"./node_modules/@babel/runtime/helpers/typeof.js\")[\"default\"]);\nfunction _regeneratorRuntime() {\n  \"use strict\"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */\n  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {\n    return e;\n  }, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n  var t,\n    e = {},\n    r = Object.prototype,\n    n = r.hasOwnProperty,\n    o = Object.defineProperty || function (t, e, r) {\n      t[e] = r.value;\n    },\n    i = \"function\" == typeof Symbol ? Symbol : {},\n    a = i.iterator || \"@@iterator\",\n    c = i.asyncIterator || \"@@asyncIterator\",\n    u = i.toStringTag || \"@@toStringTag\";\n  function define(t, e, r) {\n    return Object.defineProperty(t, e, {\n      value: r,\n      enumerable: !0,\n      configurable: !0,\n      writable: !0\n    }), t[e];\n  }\n  try {\n    define({}, \"\");\n  } catch (t) {\n    define = function define(t, e, r) {\n      return t[e] = r;\n    };\n  }\n  function wrap(t, e, r, n) {\n    var i = e && e.prototype instanceof Generator ? e : Generator,\n      a = Object.create(i.prototype),\n      c = new Context(n || []);\n    return o(a, \"_invoke\", {\n      value: makeInvokeMethod(t, r, c)\n    }), a;\n  }\n  function tryCatch(t, e, r) {\n    try {\n      return {\n        type: \"normal\",\n        arg: t.call(e, r)\n      };\n    } catch (t) {\n      return {\n        type: \"throw\",\n        arg: t\n      };\n    }\n  }\n  e.wrap = wrap;\n  var h = \"suspendedStart\",\n    l = \"suspendedYield\",\n    f = \"executing\",\n    s = \"completed\",\n    y = {};\n  function Generator() {}\n  function GeneratorFunction() {}\n  function GeneratorFunctionPrototype() {}\n  var p = {};\n  define(p, a, function () {\n    return this;\n  });\n  var d = Object.getPrototypeOf,\n    v = d && d(d(values([])));\n  v && v !== r && n.call(v, a) && (p = v);\n  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);\n  function defineIteratorMethods(t) {\n    [\"next\", \"throw\", \"return\"].forEach(function (e) {\n      define(t, e, function (t) {\n        return this._invoke(e, t);\n      });\n    });\n  }\n  function AsyncIterator(t, e) {\n    function invoke(r, o, i, a) {\n      var c = tryCatch(t[r], t, o);\n      if (\"throw\" !== c.type) {\n        var u = c.arg,\n          h = u.value;\n        return h && \"object\" == _typeof(h) && n.call(h, \"__await\") ? e.resolve(h.__await).then(function (t) {\n          invoke(\"next\", t, i, a);\n        }, function (t) {\n          invoke(\"throw\", t, i, a);\n        }) : e.resolve(h).then(function (t) {\n          u.value = t, i(u);\n        }, function (t) {\n          return invoke(\"throw\", t, i, a);\n        });\n      }\n      a(c.arg);\n    }\n    var r;\n    o(this, \"_invoke\", {\n      value: function value(t, n) {\n        function callInvokeWithMethodAndArg() {\n          return new e(function (e, r) {\n            invoke(t, n, e, r);\n          });\n        }\n        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();\n      }\n    });\n  }\n  function makeInvokeMethod(e, r, n) {\n    var o = h;\n    return function (i, a) {\n      if (o === f) throw Error(\"Generator is already running\");\n      if (o === s) {\n        if (\"throw\" === i) throw a;\n        return {\n          value: t,\n          done: !0\n        };\n      }\n      for (n.method = i, n.arg = a;;) {\n        var c = n.delegate;\n        if (c) {\n          var u = maybeInvokeDelegate(c, n);\n          if (u) {\n            if (u === y) continue;\n            return u;\n          }\n        }\n        if (\"next\" === n.method) n.sent = n._sent = n.arg;else if (\"throw\" === n.method) {\n          if (o === h) throw o = s, n.arg;\n          n.dispatchException(n.arg);\n        } else \"return\" === n.method && n.abrupt(\"return\", n.arg);\n        o = f;\n        var p = tryCatch(e, r, n);\n        if (\"normal\" === p.type) {\n          if (o = n.done ? s : l, p.arg === y) continue;\n          return {\n            value: p.arg,\n            done: n.done\n          };\n        }\n        \"throw\" === p.type && (o = s, n.method = \"throw\", n.arg = p.arg);\n      }\n    };\n  }\n  function maybeInvokeDelegate(e, r) {\n    var n = r.method,\n      o = e.iterator[n];\n    if (o === t) return r.delegate = null, \"throw\" === n && e.iterator[\"return\"] && (r.method = \"return\", r.arg = t, maybeInvokeDelegate(e, r), \"throw\" === r.method) || \"return\" !== n && (r.method = \"throw\", r.arg = new TypeError(\"The iterator does not provide a '\" + n + \"' method\")), y;\n    var i = tryCatch(o, e.iterator, r.arg);\n    if (\"throw\" === i.type) return r.method = \"throw\", r.arg = i.arg, r.delegate = null, y;\n    var a = i.arg;\n    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, \"return\" !== r.method && (r.method = \"next\", r.arg = t), r.delegate = null, y) : a : (r.method = \"throw\", r.arg = new TypeError(\"iterator result is not an object\"), r.delegate = null, y);\n  }\n  function pushTryEntry(t) {\n    var e = {\n      tryLoc: t[0]\n    };\n    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);\n  }\n  function resetTryEntry(t) {\n    var e = t.completion || {};\n    e.type = \"normal\", delete e.arg, t.completion = e;\n  }\n  function Context(t) {\n    this.tryEntries = [{\n      tryLoc: \"root\"\n    }], t.forEach(pushTryEntry, this), this.reset(!0);\n  }\n  function values(e) {\n    if (e || \"\" === e) {\n      var r = e[a];\n      if (r) return r.call(e);\n      if (\"function\" == typeof e.next) return e;\n      if (!isNaN(e.length)) {\n        var o = -1,\n          i = function next() {\n            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;\n            return next.value = t, next.done = !0, next;\n          };\n        return i.next = i;\n      }\n    }\n    throw new TypeError(_typeof(e) + \" is not iterable\");\n  }\n  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, \"constructor\", {\n    value: GeneratorFunctionPrototype,\n    configurable: !0\n  }), o(GeneratorFunctionPrototype, \"constructor\", {\n    value: GeneratorFunction,\n    configurable: !0\n  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, \"GeneratorFunction\"), e.isGeneratorFunction = function (t) {\n    var e = \"function\" == typeof t && t.constructor;\n    return !!e && (e === GeneratorFunction || \"GeneratorFunction\" === (e.displayName || e.name));\n  }, e.mark = function (t) {\n    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, \"GeneratorFunction\")), t.prototype = Object.create(g), t;\n  }, e.awrap = function (t) {\n    return {\n      __await: t\n    };\n  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {\n    return this;\n  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {\n    void 0 === i && (i = Promise);\n    var a = new AsyncIterator(wrap(t, r, n, o), i);\n    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {\n      return t.done ? t.value : a.next();\n    });\n  }, defineIteratorMethods(g), define(g, u, \"Generator\"), define(g, a, function () {\n    return this;\n  }), define(g, \"toString\", function () {\n    return \"[object Generator]\";\n  }), e.keys = function (t) {\n    var e = Object(t),\n      r = [];\n    for (var n in e) r.push(n);\n    return r.reverse(), function next() {\n      for (; r.length;) {\n        var t = r.pop();\n        if (t in e) return next.value = t, next.done = !1, next;\n      }\n      return next.done = !0, next;\n    };\n  }, e.values = values, Context.prototype = {\n    constructor: Context,\n    reset: function reset(e) {\n      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = \"next\", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) \"t\" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);\n    },\n    stop: function stop() {\n      this.done = !0;\n      var t = this.tryEntries[0].completion;\n      if (\"throw\" === t.type) throw t.arg;\n      return this.rval;\n    },\n    dispatchException: function dispatchException(e) {\n      if (this.done) throw e;\n      var r = this;\n      function handle(n, o) {\n        return a.type = \"throw\", a.arg = e, r.next = n, o && (r.method = \"next\", r.arg = t), !!o;\n      }\n      for (var o = this.tryEntries.length - 1; o >= 0; --o) {\n        var i = this.tryEntries[o],\n          a = i.completion;\n        if (\"root\" === i.tryLoc) return handle(\"end\");\n        if (i.tryLoc <= this.prev) {\n          var c = n.call(i, \"catchLoc\"),\n            u = n.call(i, \"finallyLoc\");\n          if (c && u) {\n            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);\n            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);\n          } else if (c) {\n            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);\n          } else {\n            if (!u) throw Error(\"try statement without catch or finally\");\n            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);\n          }\n        }\n      }\n    },\n    abrupt: function abrupt(t, e) {\n      for (var r = this.tryEntries.length - 1; r >= 0; --r) {\n        var o = this.tryEntries[r];\n        if (o.tryLoc <= this.prev && n.call(o, \"finallyLoc\") && this.prev < o.finallyLoc) {\n          var i = o;\n          break;\n        }\n      }\n      i && (\"break\" === t || \"continue\" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);\n      var a = i ? i.completion : {};\n      return a.type = t, a.arg = e, i ? (this.method = \"next\", this.next = i.finallyLoc, y) : this.complete(a);\n    },\n    complete: function complete(t, e) {\n      if (\"throw\" === t.type) throw t.arg;\n      return \"break\" === t.type || \"continue\" === t.type ? this.next = t.arg : \"return\" === t.type ? (this.rval = this.arg = t.arg, this.method = \"return\", this.next = \"end\") : \"normal\" === t.type && e && (this.next = e), y;\n    },\n    finish: function finish(t) {\n      for (var e = this.tryEntries.length - 1; e >= 0; --e) {\n        var r = this.tryEntries[e];\n        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;\n      }\n    },\n    \"catch\": function _catch(t) {\n      for (var e = this.tryEntries.length - 1; e >= 0; --e) {\n        var r = this.tryEntries[e];\n        if (r.tryLoc === t) {\n          var n = r.completion;\n          if (\"throw\" === n.type) {\n            var o = n.arg;\n            resetTryEntry(r);\n          }\n          return o;\n        }\n      }\n      throw Error(\"illegal catch attempt\");\n    },\n    delegateYield: function delegateYield(e, r, n) {\n      return this.delegate = {\n        iterator: values(e),\n        resultName: r,\n        nextLoc: n\n      }, \"next\" === this.method && (this.arg = t), y;\n    }\n  }, e;\n}\nmodule.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://botania-vk/./node_modules/@babel/runtime/helpers/regeneratorRuntime.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

eval("function _typeof(o) {\n  \"@babel/helpers - typeof\";\n\n  return module.exports = _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) {\n    return typeof o;\n  } : function (o) {\n    return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o;\n  }, module.exports.__esModule = true, module.exports[\"default\"] = module.exports, _typeof(o);\n}\nmodule.exports = _typeof, module.exports.__esModule = true, module.exports[\"default\"] = module.exports;\n\n//# sourceURL=webpack://botania-vk/./node_modules/@babel/runtime/helpers/typeof.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// TODO(Babel 8): Remove this file.\n\nvar runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ \"./node_modules/@babel/runtime/helpers/regeneratorRuntime.js\")();\nmodule.exports = runtime;\n\n// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=\ntry {\n  regeneratorRuntime = runtime;\n} catch (accidentalStrictMode) {\n  if (typeof globalThis === \"object\") {\n    globalThis.regeneratorRuntime = runtime;\n  } else {\n    Function(\"r\", \"regeneratorRuntime = r\")(runtime);\n  }\n}\n\n\n//# sourceURL=webpack://botania-vk/./node_modules/@babel/runtime/regenerator/index.js?");

/***/ }),

/***/ "./node_modules/@vkontakte/vk-bridge/dist/index.umd.js":
/*!*************************************************************!*\
  !*** ./node_modules/@vkontakte/vk-bridge/dist/index.umd.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("!function(e,n){ true?n(exports):0}(this,(function(e){\"use strict\";var n=function(){return n=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e},n.apply(this,arguments)};function t(e,n,t,r){return new(t||(t=Promise))((function(o,a){function i(e){try{s(r.next(e))}catch(e){a(e)}}function p(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(i,p)}s((r=r.apply(e,n||[])).next())}))}function r(e,n){var t,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:p(0),throw:p(1),return:p(2)},\"function\"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function p(p){return function(s){return function(p){if(t)throw new TypeError(\"Generator is already executing.\");for(;a&&(a=0,p[0]&&(i=0)),i;)try{if(t=1,r&&(o=2&p[0]?r.return:p[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,p[1])).done)return o;switch(r=0,o&&(p=[2&p[0],o.value]),p[0]){case 0:case 1:o=p;break;case 4:return i.label++,{value:p[1],done:!1};case 5:i.label++,r=p[1],p=[0];continue;case 7:p=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==p[0]&&2!==p[0])){i=0;continue}if(3===p[0]&&(!o||p[1]>o[0]&&p[1]<o[3])){i.label=p[1];break}if(6===p[0]&&i.label<o[1]){i.label=o[1],o=p;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(p);break}o[2]&&i.ops.pop(),i.trys.pop();continue}p=n.call(e,i)}catch(e){p=[6,e],r=0}finally{t=o=0}if(5&p[0])throw p[1];return{value:p[0]?p[1]:void 0,done:!0}}([p,s])}}}function o(e,n,t){if(t||2===arguments.length)for(var r,o=0,a=n.length;o<a;o++)!r&&o in n||(r||(r=Array.prototype.slice.call(n,0,o)),r[o]=n[o]);return e.concat(r||Array.prototype.slice.call(n))}function a(e,t,r){var o=function(e){var n={current:0,next:function(){return++this.current}},t={};return{add:function(r,o){var a=null!=o?o:\"\".concat(n.next(),\"_\").concat(e);return t[a]=r,a},resolve:function(e,n,r){var o=t[e];o&&(r(n)?o.resolve(n):o.reject(n),t[e]=null)}}}(r);return t((function(e){if(e.detail&&e.detail.data&&\"object\"==typeof e.detail.data&&\"request_id\"in e.detail.data){var n=e.detail.data,t=n.request_id,r=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&\"function\"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)n.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(t[r[o]]=e[r[o]])}return t}(n,[\"request_id\"]);t&&o.resolve(t,r,(function(e){return!(\"error_type\"in e)}))}})),function(t,r){return void 0===r&&(r={}),new Promise((function(a,i){var p=o.add({resolve:a,reject:i},r.request_id);e(t,n(n({},r),{request_id:p}))}))}}var i,p=\"undefined\"!=typeof window,s=Boolean(p&&window.AndroidBridge),u=Boolean(p&&window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.VKWebAppClose),c=Boolean(p&&window.ReactNativeWebView&&\"function\"==typeof window.ReactNativeWebView.postMessage),d=p&&!s&&!u,l=d&&/(^\\?|&)vk_platform=mobile_web(&|$)/.test(location.search),f=d?\"message\":\"VKWebAppEvent\",b=o([\"VKWebAppInit\",\"VKWebAppGetCommunityAuthToken\",\"VKWebAppAddToCommunity\",\"VKWebAppAddToHomeScreenInfo\",\"VKWebAppClose\",\"VKWebAppCopyText\",\"VKWebAppCreateHash\",\"VKWebAppGetUserInfo\",\"VKWebAppSetLocation\",\"VKWebAppSendToClient\",\"VKWebAppGetClientVersion\",\"VKWebAppGetPhoneNumber\",\"VKWebAppGetEmail\",\"VKWebAppGetGroupInfo\",\"VKWebAppGetGeodata\",\"VKWebAppGetCommunityToken\",\"VKWebAppGetConfig\",\"VKWebAppGetLaunchParams\",\"VKWebAppSetTitle\",\"VKWebAppGetAuthToken\",\"VKWebAppCallAPIMethod\",\"VKWebAppJoinGroup\",\"VKWebAppLeaveGroup\",\"VKWebAppAllowMessagesFromGroup\",\"VKWebAppDenyNotifications\",\"VKWebAppAllowNotifications\",\"VKWebAppOpenPayForm\",\"VKWebAppOpenApp\",\"VKWebAppShare\",\"VKWebAppShowWallPostBox\",\"VKWebAppScroll\",\"VKWebAppShowOrderBox\",\"VKWebAppShowLeaderBoardBox\",\"VKWebAppShowInviteBox\",\"VKWebAppShowRequestBox\",\"VKWebAppAddToFavorites\",\"VKWebAppShowStoryBox\",\"VKWebAppStorageGet\",\"VKWebAppStorageGetKeys\",\"VKWebAppStorageSet\",\"VKWebAppFlashGetInfo\",\"VKWebAppSubscribeStoryApp\",\"VKWebAppOpenWallPost\",\"VKWebAppCheckAllowedScopes\",\"VKWebAppCheckBannerAd\",\"VKWebAppHideBannerAd\",\"VKWebAppShowBannerAd\",\"VKWebAppCheckNativeAds\",\"VKWebAppShowNativeAds\",\"VKWebAppRetargetingPixel\",\"VKWebAppConversionHit\",\"VKWebAppShowSubscriptionBox\",\"VKWebAppCheckSurvey\",\"VKWebAppShowSurvey\",\"VKWebAppScrollTop\",\"VKWebAppScrollTopStart\",\"VKWebAppScrollTopStop\",\"VKWebAppShowSlidesSheet\",\"VKWebAppTranslate\",\"VKWebAppRecommend\",\"VKWebAppAddToProfile\",\"VKWebAppGetFriends\"],d&&!l?[\"VKWebAppResizeWindow\",\"VKWebAppAddToMenu\",\"VKWebAppShowInstallPushBox\",\"VKWebAppShowCommunityWidgetPreviewBox\",\"VKWebAppCallStart\",\"VKWebAppCallJoin\",\"VKWebAppCallGetStatus\"]:[\"VKWebAppShowImages\"],!0),A=p?window.AndroidBridge:void 0,v=u?window.webkit.messageHandlers:void 0,h=d?parent:void 0;var m,w,W,y,V,K,_,g,S,E;e.EAdsFormats=void 0,(m=e.EAdsFormats||(e.EAdsFormats={})).REWARD=\"reward\",m.INTERSTITIAL=\"interstitial\",e.BannerAdLayoutType=void 0,(w=e.BannerAdLayoutType||(e.BannerAdLayoutType={})).RESIZE=\"resize\",w.OVERLAY=\"overlay\",e.BannerAdLocation=void 0,(W=e.BannerAdLocation||(e.BannerAdLocation={})).TOP=\"top\",W.BOTTOM=\"bottom\",e.BannerAdAlign=void 0,(y=e.BannerAdAlign||(e.BannerAdAlign={})).LEFT=\"left\",y.RIGHT=\"right\",y.CENTER=\"center\",e.BannerAdHeightType=void 0,(V=e.BannerAdHeightType||(e.BannerAdHeightType={})).COMPACT=\"compact\",V.REGULAR=\"regular\",e.BannerAdOrientation=void 0,(K=e.BannerAdOrientation||(e.BannerAdOrientation={})).HORIZONTAL=\"horizontal\",K.VERTICAL=\"vertical\",e.EGrantedPermission=void 0,(_=e.EGrantedPermission||(e.EGrantedPermission={})).CAMERA=\"camera\",_.LOCATION=\"location\",_.PHOTO=\"photo\",e.EGetLaunchParamsResponseLanguages=void 0,(g=e.EGetLaunchParamsResponseLanguages||(e.EGetLaunchParamsResponseLanguages={})).RU=\"ru\",g.UK=\"uk\",g.UA=\"ua\",g.EN=\"en\",g.BE=\"be\",g.KZ=\"kz\",g.PT=\"pt\",g.ES=\"es\",e.EGetLaunchParamsResponseGroupRole=void 0,(S=e.EGetLaunchParamsResponseGroupRole||(e.EGetLaunchParamsResponseGroupRole={})).ADMIN=\"admin\",S.EDITOR=\"editor\",S.MEMBER=\"member\",S.MODER=\"moder\",S.NONE=\"none\",e.EGetLaunchParamsResponsePlatforms=void 0,(E=e.EGetLaunchParamsResponsePlatforms||(e.EGetLaunchParamsResponsePlatforms={})).DESKTOP_WEB=\"desktop_web\",E.DESKTOP_WEB_MESSENGER=\"desktop_web_messenger\",E.DESKTOP_APP_MESSENGER=\"desktop_app_messenger\",E.MOBILE_WEB=\"mobile_web\",E.MOBILE_ANDROID=\"mobile_android\",E.MOBILE_ANDROID_MESSENGER=\"mobile_android_messenger\",E.MOBILE_IPHONE=\"mobile_iphone\",E.MOBILE_IPHONE_MESSENGER=\"mobile_iphone_messenger\",E.MOBILE_IPAD=\"mobile_ipad\";var O=function(e){var n=void 0,p=[],l=Math.random().toString(36).substring(2,5);function m(e){p.push(e)}function w(e){return s?!(!A||\"function\"!=typeof A[e]):u?!(!v||!v[e]||\"function\"!=typeof v[e].postMessage):!!d&&b.includes(e)}function W(){return u||s}function y(){return d&&window.parent!==window}function V(){return W()||y()}function K(e){if(u||s)return o([],p,!0).map((function(n){return n.call(null,e)}));var t=null==e?void 0:e.data;if(d&&t){if(c&&\"string\"==typeof t)try{t=JSON.parse(t)}catch(e){}var r=t.type,a=t.data,i=t.frameId;r&&(\"VKWebAppSettings\"!==r?o([],p,!0).map((function(e){return e({detail:{type:r,data:a}})})):n=i)}}c&&/(android)/i.test(navigator.userAgent)?document.addEventListener(f,K):\"undefined\"!=typeof window&&\"addEventListener\"in window&&window.addEventListener(f,K);var _=a((function(t,r){A&&A[t]?A[t](JSON.stringify(r)):v&&v[t]&&\"function\"==typeof v[t].postMessage?v[t].postMessage(r):c?window.ReactNativeWebView.postMessage(JSON.stringify({handler:t,params:r})):h&&\"function\"==typeof h.postMessage&&h.postMessage({handler:t,params:r,type:\"vk-connect\",webFrameId:n,connectVersion:e},\"*\")}),m,l);return m((function(e){if(e.detail&&\"SetSupportedHandlers\"===e.detail.type)i=new Set(e.detail.data.supportedHandlers)})),{send:_,sendPromise:_,subscribe:m,unsubscribe:function(e){var n=p.indexOf(e);n>-1&&p.splice(n,1)},supports:function(e){return console.warn(\"bridge.supports method is deprecated. Use bridge.supportsAsync instead.\"),w(e)},supportsAsync:function(e){return t(this,void 0,void 0,(function(){var n;return r(this,(function(t){switch(t.label){case 0:if(s||u)return[2,w(e)];if(i)return[2,i.has(e)];t.label=1;case 1:return t.trys.push([1,3,,4]),[4,_(\"SetSupportedHandlers\")];case 2:return n=t.sent(),i=new Set(n.supportedHandlers),[3,4];case 3:return t.sent(),i=new Set([\"VKWebAppInit\"]),[3,4];case 4:return[2,i.has(e)]}}))}))},isWebView:W,isIframe:y,isEmbedded:V,isStandalone:function(){return!V()}}}(\"2.15.6\");e.applyMiddleware=function e(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return t.includes(void 0)||t.includes(null)?e.apply(void 0,t.filter((function(e){return\"function\"==typeof e}))):function(e){if(0===t.length)return e;var r,o={subscribe:e.subscribe,send:function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];return e.send.apply(e,n)}},a=t.filter((function(e){return\"function\"==typeof e})).map((function(e){return e(o)})).reduce((function(e,n){return function(t){return e(n(t))}}));return r=a(e.send),n(n({},e),{send:r})}},e.default=O,e.parseURLSearchParamsForGetLaunchParams=function(n){var t={};try{var r=new URLSearchParams(n);r.forEach((function(n,r){switch(r){case\"vk_ts\":case\"vk_is_recommended\":case\"vk_profile_id\":case\"vk_has_profile_button\":case\"vk_testing_group_id\":case\"vk_user_id\":case\"vk_app_id\":case\"vk_group_id\":t[r]=Number(n);break;case\"sign\":case\"vk_chat_id\":case\"vk_ref\":case\"vk_access_token_settings\":t[r]=n;break;case\"odr_enabled\":t.odr_enabled=\"1\"===n?1:void 0;break;case\"vk_is_app_user\":case\"vk_are_notifications_enabled\":case\"vk_is_favorite\":t[r]=function(e){switch(e){case\"0\":return 0;case\"1\":return 1;default:return}}(n);break;case\"vk_language\":t.vk_language=function(n){return Object.values(e.EGetLaunchParamsResponseLanguages).some((function(e){return e===n}))}(n)?n:void 0;break;case\"vk_viewer_group_role\":t.vk_viewer_group_role=function(n){return Object.values(e.EGetLaunchParamsResponseGroupRole).some((function(e){return e===n}))}(n)?n:void 0;break;case\"vk_platform\":t.vk_platform=function(n){return Object.values(e.EGetLaunchParamsResponsePlatforms).some((function(e){return e===n}))}(n)?n:void 0}}))}catch(e){console.warn(e)}return t},Object.defineProperty(e,\"__esModule\",{value:!0})}));\n//# sourceMappingURL=index.umd.js.map\n\n\n//# sourceURL=webpack://botania-vk/./node_modules/@vkontakte/vk-bridge/dist/index.umd.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;