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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _vkontakte_vk_bridge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vkontakte/vk-bridge */ \"./node_modules/@vkontakte/vk-bridge/dist/index.umd.js\");\n\n\n// Инициализируем VK Bridge\n_vkontakte_vk_bridge__WEBPACK_IMPORTED_MODULE_0__.send('VKWebAppInit').then(function () {\n  console.log('VK Bridge initialized');\n  // После успешной инициализации получаем информацию о пользователе\n  return _vkontakte_vk_bridge__WEBPACK_IMPORTED_MODULE_0__.send('VKWebAppGetUserInfo');\n}).then(function (data) {\n  console.log('User data:', data);\n  // Отображаем информацию о пользователе\n  document.getElementById('myElement').innerHTML = \"\\n            \\u041F\\u0440\\u0438\\u0432\\u0435\\u0442, \".concat(data.first_name, \"!\\n            <br>\\n            ID: \").concat(data.id, \"\\n        \");\n})[\"catch\"](function (error) {\n  console.error(error);\n  document.getElementById('myElement').innerHTML = 'Произошла ошибка при инициализации';\n});\n\n//# sourceURL=webpack://botania-vk/./main.js?");

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