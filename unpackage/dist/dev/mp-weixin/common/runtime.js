
  !function(){try{var a=Function("return this")();a&&!a.Math&&(Object.assign(a,{isFinite:isFinite,Array:Array,Date:Date,Error:Error,Function:Function,Math:Math,Object:Object,RegExp:RegExp,String:String,TypeError:TypeError,setTimeout:setTimeout,clearTimeout:clearTimeout,setInterval:setInterval,clearInterval:clearInterval}),"undefined"!=typeof Reflect&&(a.Reflect=Reflect))}catch(a){}}();
  /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		"common/runtime": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"common/runtime": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"components/ncu-carousel/ncu-carousel":1,"components/ncu-goods-details-card/ncu-goods-details-card":1,"components/ncu-tabbar/ncu-tabbar":1,"components/ncu-thread/ncu-thread":1,"pages/person/index":1,"components/ncu-category-item/ncu-category-item":1,"components/ncu-float-btn/ncu-float-btn":1,"components/ncu-goods/ncu-goods":1,"components/ncu-loading-part/ncu-loading-part":1,"components/ncu-modal/ncu-modal":1,"components/ncu-no-data/ncu-no-data":1,"components/ncu-popup-select/ncu-popup-select":1,"components/ncu-radius-btn/ncu-radius-btn":1,"components/ncu-scroll-wrapper-v2/ncu-scroll-wrapper-v2":1,"components/ncu-threads/ncu-threads":1,"pages/shop/index":1,"components/ncu-chat-list-item/ncu-chat-list-item":1,"components/light-input/light-input":1,"components/ncu-float-nav/ncu-float-nav":1,"components/ncu-popup-confirm-modal/ncu-popup-confirm-modal":1,"components/user-info-card/user-info-card":1,"components/ncu-chat-message/ncu-chat-message":1,"components/ncu-popup-modal/ncu-popup-modal":1,"components/ncu-chat-input/ncu-chat-input":1,"components/ncu-custom-header/ncu-custom-header":1,"components/ncu-message/ncu-message":1,"components/ncu-comment-foot/ncu-comment-foot":1,"components/ncu-comment-item/ncu-comment-item":1,"components/ncu-comment/ncu-comment":1,"components/ncu-button/ncu-button":1,"pages/mall/search/search-tab":1,"components/ncu-header-wrapper/ncu-header-wrapper":1,"components/ncu-tag-item/ncu-tag-item":1,"components/ncu-tag-item-light/ncu-tag-item-light":1,"pages/login/login":1,"pages/login/register":1,"components/ncu-loading/ncu-loading":1,"components/ncu-popup-option/ncu-popup-option":1,"components/ncu-img/ncu-img":1,"components/ncu-settings-item/ncu-settings-item":1,"components/ncu-title/ncu-title":1,"components/ncu-scroll-wrapper/ncu-scroll-wrapper":1,"components/ncu-nav/ncu-nav":1,"components/ncu-avatar/ncu-avatar":1,"components/ncu-icon-popup/ncu-icon-popup":1,"components/v-valid-input/v-valid-input":1,"components/ncu-goods-details-card/ncu-goods-details-tab":1,"components/ncu-appreciate/ncu-appreciate":1,"components/ncu-thread/ncu-thread-author":1,"components/ncu-thread/ncu-thread-content-main":1,"components/ncu-confirm-modal/ncu-confirm-modal":1,"components/ncu-profile-card/ncu-profile-card":1,"components/ncu-goods-card/ncu-goods-card":1,"components/ncu-loading/ncu-loading-bounce-ball":1,"components/ncu-loading/ncu-loading-bounce-stick":1,"components/ncu-loading/ncu-loading-elem":1,"components/ncu-loading/ncu-loading-rect":1,"components/ncu-ripple-wrapper/ncu-ripple-wrapper":1,"components/ncu-float-nav/ncu-float-nav-item":1,"components/ncu-layer/ncu-layer":1,"components/ncu-emoji/ncu-emoji":1,"components/ncu-chat-input/ncu-chat-operation":1,"components/ncu-back-arrow/ncu-back-arrow":1,"components/ncu-comment-foot/ncu-comment-input":1,"components/ncu-comment-item/ncu-comment-item-name":1,"components/ncu-dance-words/ncu-dance-words":1,"components/ncu-form-item/ncu-form-item":1,"components/v-input/v-input":1,"components/ncu-img-choose/ncu-img-choose":1,"components/ncu-icon-wrapper/ncu-icon-wrapper":1,"components/ncu-profile-card/ncu-profile-card-items":1,"components/ncu-profile-card/ncu-profile-card-tab":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "" + ({"components/ncu-carousel/ncu-carousel":"components/ncu-carousel/ncu-carousel","components/ncu-goods-details-card/ncu-goods-details-card":"components/ncu-goods-details-card/ncu-goods-details-card","components/ncu-tabbar/ncu-tabbar":"components/ncu-tabbar/ncu-tabbar","components/ncu-thread/ncu-thread":"components/ncu-thread/ncu-thread","pages/person/index":"pages/person/index","components/ncu-category-item/ncu-category-item":"components/ncu-category-item/ncu-category-item","components/ncu-float-btn/ncu-float-btn":"components/ncu-float-btn/ncu-float-btn","components/ncu-goods/ncu-goods":"components/ncu-goods/ncu-goods","components/ncu-loading-part/ncu-loading-part":"components/ncu-loading-part/ncu-loading-part","components/ncu-modal/ncu-modal":"components/ncu-modal/ncu-modal","components/ncu-no-data/ncu-no-data":"components/ncu-no-data/ncu-no-data","components/ncu-popup-select/ncu-popup-select":"components/ncu-popup-select/ncu-popup-select","components/ncu-radius-btn/ncu-radius-btn":"components/ncu-radius-btn/ncu-radius-btn","components/ncu-scroll-wrapper-v2/ncu-scroll-wrapper-v2":"components/ncu-scroll-wrapper-v2/ncu-scroll-wrapper-v2","components/ncu-threads/ncu-threads":"components/ncu-threads/ncu-threads","pages/shop/index":"pages/shop/index","components/ncu-chat-list-item/ncu-chat-list-item":"components/ncu-chat-list-item/ncu-chat-list-item","components/light-input/light-input":"components/light-input/light-input","components/ncu-float-nav/ncu-float-nav":"components/ncu-float-nav/ncu-float-nav","components/ncu-popup-confirm-modal/ncu-popup-confirm-modal":"components/ncu-popup-confirm-modal/ncu-popup-confirm-modal","components/user-info-card/user-info-card":"components/user-info-card/user-info-card","components/ncu-chat-message/ncu-chat-message":"components/ncu-chat-message/ncu-chat-message","components/ncu-popup-modal/ncu-popup-modal":"components/ncu-popup-modal/ncu-popup-modal","components/ncu-chat-input/ncu-chat-input":"components/ncu-chat-input/ncu-chat-input","components/ncu-custom-header/ncu-custom-header":"components/ncu-custom-header/ncu-custom-header","components/ncu-message/ncu-message":"components/ncu-message/ncu-message","components/ncu-comment-foot/ncu-comment-foot":"components/ncu-comment-foot/ncu-comment-foot","components/ncu-comment-item/ncu-comment-item":"components/ncu-comment-item/ncu-comment-item","components/ncu-comment/ncu-comment":"components/ncu-comment/ncu-comment","components/ncu-button/ncu-button":"components/ncu-button/ncu-button","pages/mall/search/search-tab":"pages/mall/search/search-tab","components/ncu-header-wrapper/ncu-header-wrapper":"components/ncu-header-wrapper/ncu-header-wrapper","components/ncu-tag-item/ncu-tag-item":"components/ncu-tag-item/ncu-tag-item","components/ncu-tag-item-light/ncu-tag-item-light":"components/ncu-tag-item-light/ncu-tag-item-light","pages/login/login":"pages/login/login","pages/login/register":"pages/login/register","components/ncu-loading/ncu-loading":"components/ncu-loading/ncu-loading","components/ncu-popup-option/ncu-popup-option":"components/ncu-popup-option/ncu-popup-option","components/ncu-img/ncu-img":"components/ncu-img/ncu-img","components/ncu-settings-item/ncu-settings-item":"components/ncu-settings-item/ncu-settings-item","components/ncu-title/ncu-title":"components/ncu-title/ncu-title","components/ncu-scroll-wrapper/ncu-scroll-wrapper":"components/ncu-scroll-wrapper/ncu-scroll-wrapper","components/ncu-nav/ncu-nav":"components/ncu-nav/ncu-nav","components/ncu-avatar/ncu-avatar":"components/ncu-avatar/ncu-avatar","components/ncu-icon-popup/ncu-icon-popup":"components/ncu-icon-popup/ncu-icon-popup","components/v-valid-input/v-valid-input":"components/v-valid-input/v-valid-input","components/ncu-goods-details-card/ncu-goods-details-tab":"components/ncu-goods-details-card/ncu-goods-details-tab","components/ncu-appreciate/ncu-appreciate":"components/ncu-appreciate/ncu-appreciate","components/ncu-thread/ncu-thread-author":"components/ncu-thread/ncu-thread-author","components/ncu-thread/ncu-thread-content-main":"components/ncu-thread/ncu-thread-content-main","components/ncu-confirm-modal/ncu-confirm-modal":"components/ncu-confirm-modal/ncu-confirm-modal","components/ncu-profile-card/ncu-profile-card":"components/ncu-profile-card/ncu-profile-card","components/ncu-goods-card/ncu-goods-card":"components/ncu-goods-card/ncu-goods-card","components/ncu-loading/ncu-loading-bounce-ball":"components/ncu-loading/ncu-loading-bounce-ball","components/ncu-loading/ncu-loading-bounce-stick":"components/ncu-loading/ncu-loading-bounce-stick","components/ncu-loading/ncu-loading-elem":"components/ncu-loading/ncu-loading-elem","components/ncu-loading/ncu-loading-rect":"components/ncu-loading/ncu-loading-rect","components/ncu-ripple-wrapper/ncu-ripple-wrapper":"components/ncu-ripple-wrapper/ncu-ripple-wrapper","components/ncu-float-nav/ncu-float-nav-item":"components/ncu-float-nav/ncu-float-nav-item","components/ncu-layer/ncu-layer":"components/ncu-layer/ncu-layer","components/ncu-emoji/ncu-emoji":"components/ncu-emoji/ncu-emoji","components/ncu-chat-input/ncu-chat-operation":"components/ncu-chat-input/ncu-chat-operation","components/ncu-back-arrow/ncu-back-arrow":"components/ncu-back-arrow/ncu-back-arrow","components/ncu-comment-foot/ncu-comment-input":"components/ncu-comment-foot/ncu-comment-input","components/ncu-comment-item/ncu-comment-item-name":"components/ncu-comment-item/ncu-comment-item-name","components/ncu-dance-words/ncu-dance-words":"components/ncu-dance-words/ncu-dance-words","components/ncu-form-item/ncu-form-item":"components/ncu-form-item/ncu-form-item","components/v-input/v-input":"components/v-input/v-input","components/ncu-img-choose/ncu-img-choose":"components/ncu-img-choose/ncu-img-choose","components/ncu-icon-wrapper/ncu-icon-wrapper":"components/ncu-icon-wrapper/ncu-icon-wrapper","components/ncu-profile-card/ncu-profile-card-items":"components/ncu-profile-card/ncu-profile-card-items","components/ncu-profile-card/ncu-profile-card-tab":"components/ncu-profile-card/ncu-profile-card-tab"}[chunkId]||chunkId) + ".wxss";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = global["webpackJsonp"] = global["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// run deferred modules from other chunks
/******/ 	checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ([]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/runtime.js.map
  