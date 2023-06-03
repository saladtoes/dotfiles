/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 79);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ log; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ error; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* reexport */ warn; });

// CONCATENATED MODULE: ./src/scripts/time/format.ts
function iso8601DateTimeZone(d) {
  const offset = -d.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + sign + pad(offset / 60) + ':' + pad(offset % 60);
}

function pad(n) {
  const abs = Math.floor(Math.abs(n));
  return (abs < 10 ? '0' : '') + abs;
}
// CONCATENATED MODULE: ./src/scripts/time/index.ts

// CONCATENATED MODULE: ./src/scripts/log/log.ts

let remoteLogging = undefined;
chrome.storage.local.get('remoteLoggingURL', d => {
  if (d && d.remoteLoggingURL && d.remoteLoggingURL.startsWith('http')) {
    log(`Remote logging initialised: ${d}`);
    remoteLogging = d;
  }
});

function remoteLog(request) {
  if (!remoteLogging || !remoteLogging.remoteLoggingURL) {
    return;
  }

  fetch(`${remoteLogging.remoteLoggingURL}`, request).catch(e => {
    console.error('failed to remote log', e);
  });
}

function isRemoteLogging() {
  return remoteLogging !== undefined;
}

function log(...args) {
  console.log.apply(console, [iso8601DateTimeZone(new Date()), ...args]);

  if (isRemoteLogging()) {
    remoteLog({
      method: 'POST',
      body: JSON.stringify(['INFO', ...args])
    });
  }
}
function error(...args) {
  console.error.apply(console, [iso8601DateTimeZone(new Date()), ...args]);

  if (isRemoteLogging()) {
    remoteLog({
      method: 'POST',
      body: JSON.stringify(['ERROR', ...args])
    });
  }
}
function warn(...args) {
  console.warn.apply(console, [iso8601DateTimeZone(new Date()), ...args]);

  if (isRemoteLogging()) {
    remoteLog({
      method: 'POST',
      body: JSON.stringify(['WARN', ...args])
    });
  }
}
// CONCATENATED MODULE: ./src/scripts/log/index.ts


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return authenticateWithGSuitePD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return authenticateWithGSuite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getGoogleAuthInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getGSuiteUserInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getRsaPublicKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return isGSuiteEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return revokeCachedGSuiteAuthToken; });
/* unused harmony export sendAndRejectOnFailure */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return encryptCredentials; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return inMemoryCreds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return rememberCredsInMemory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return clearInMemoryCreds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return inMemoryCredsAvailable; });
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _offnetwork__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _offnetworkcache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _printer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};





const GoogleUserInfoURL = 'https://www.googleapis.com/oauth2/v2/userinfo';
const GSuiteTokenRevokeUrl = 'https://accounts.google.com/o/oauth2/revoke';
function authenticateWithGSuitePD(serverBaseURL, isInteractive) {
  return __awaiter(this, void 0, void 0, function* () {
    Object(_log__WEBPACK_IMPORTED_MODULE_0__[/* log */ "b"])(`Authenticating with G-Suite: serverBaseURL=${serverBaseURL}, isInteractive=${isInteractive}`);
    return Promise.all([getRsaPublicKey(serverBaseURL), getGoogleAuthInfo(isInteractive)]).then(([rsaKey, authInfo]) => {
      const plainCredentials = `${authInfo.email}:${authInfo.token}`;
      return rsaKey.encrypt(plainCredentials);
    });
  });
}
function authenticateWithGSuite(printJob, isInteractive, encryptForMobility = true) {
  return __awaiter(this, void 0, void 0, function* () {
    Object(_log__WEBPACK_IMPORTED_MODULE_0__[/* log */ "b"])(`Authenticating with G-Suite: 
		printJobId=${printJob.printerId}, isInteractive=${isInteractive}, encryptForMobility=${encryptForMobility}`);

    if (encryptForMobility) {
      const serverBaseURL = Object(_printer__WEBPACK_IMPORTED_MODULE_3__[/* getUrlBaseOfPrinterUrl */ "a"])(printJob.printerId);
      return Promise.all([getRsaPublicKey(serverBaseURL), getGoogleAuthInfo(isInteractive)]).then(([rsaKey, authInfo]) => {
        return encryptCredentialsWithKey(`${authInfo.email}`, `${authInfo.token}`, rsaKey);
      });
    }

    return getGoogleAuthInfo(isInteractive).then(googleAuth => new Promise(resolve => {
      return resolve({
        provider: 'google',
        userid: googleAuth.email,
        token: googleAuth.token
      });
    }));
  });
}
function getGoogleAuthInfo(isInteractive) {
  return __awaiter(this, void 0, void 0, function* () {
    Object(_log__WEBPACK_IMPORTED_MODULE_0__[/* log */ "b"])(`Getting auth info from G-Suite: isInteractive=${isInteractive}`);

    const retryWithRefreshedToken = (e, oldToken) => {
      console.error('failed to get Google user info. refreshing token...', e);
      const details = {
        interactive: isInteractive
      };
      return refreshToken(oldToken, details).then(newToken => getGSuiteUserInfo(newToken));
    };

    return getGSuiteToken(isInteractive).then(token => getGSuiteUserInfo(token).catch(e => retryWithRefreshedToken(e, token)));
  });
}

function getGSuiteToken(isInteractive) {
  return __awaiter(this, void 0, void 0, function* () {
    const details = {
      interactive: isInteractive
    };
    return new Promise((resolve, reject) => {
      chrome.identity.getAuthToken(details, token => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
          return;
        }

        resolve(token);
      });
    });
  });
}

function refreshToken(expiredToken, details) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      chrome.identity.removeCachedAuthToken({
        token: expiredToken
      }, () => {
        chrome.identity.getAuthToken(details, token => {
          if (chrome.runtime.lastError) {
            Object(_log__WEBPACK_IMPORTED_MODULE_0__[/* error */ "a"])(`Failed to refresh token: ${chrome.runtime.lastError.message}`);
            reject(chrome.runtime.lastError.message);
            return;
          }

          resolve(token);
        });
      });
    });
  });
}

function getGSuiteUserInfo(accessToken) {
  return __awaiter(this, void 0, void 0, function* () {
    Object(_log__WEBPACK_IMPORTED_MODULE_0__[/* log */ "b"])('Fetching user info from G-Suite...');
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${GoogleUserInfoURL}?access_token=${accessToken}`);

      xhr.onload = () => {
        if (xhr.status !== 200) {
          Object(_log__WEBPACK_IMPORTED_MODULE_0__[/* error */ "a"])(`Failed to resolve G-Suite user: ${xhr.responseText}`);
          reject(xhr);
          return;
        }

        const resp = JSON.parse(xhr.responseText);
        Object(_log__WEBPACK_IMPORTED_MODULE_0__[/* log */ "b"])(`Resolved user: ${resp.email}`);
        resolve({
          token: accessToken,
          email: resp.email
        });
      };

      sendAndRejectOnFailure(xhr, reject);
    }));
  });
}
function getRsaPublicKey(urlBase) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        parseRsaKey(xhr, resolve, reject);
      };

      xhr.open('GET', urlBase + '/public-key', true);
      xhr.setRequestHeader('client-type', 'ChromeApp-' + chrome.runtime.getManifest().version);
      sendAndRejectOnFailure(xhr, reject);
    });

    function parseRsaKey(xhr, onSuccess, onError) {
      if (xhr.status === 200) {
        try {
          const resp = JSON.parse(xhr.responseText);

          if (!resp.modulus || !resp.exponent) {
            onError('Invalid encryption key info returned by the server');
          } else {
            const rsa = new RSAKey();
            rsa.setPublic(resp.modulus, resp.exponent);
            onSuccess(rsa);
          }
        } catch (e) {
          onError('Failed to get encryption key. Error: ' + e);
        }
      } else {
        onError('Failed to get encryption key. HTTP response: ' + xhr.status + ' ' + xhr.statusText);
      }
    }
  });
}

function isGSuiteEnabledHTTP(urlBase) {
  return __awaiter(this, void 0, void 0, function* () {
    Object(_log__WEBPACK_IMPORTED_MODULE_0__[/* log */ "b"])(`Checking if GSuite is enabled on server: ${urlBase}...`);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject(xhr.responseText);
          return;
        }

        try {
          const resp = JSON.parse(xhr.responseText);

          if ('signInWithGoogle' in resp) {
            resolve(resp.signInWithGoogle);
          } else {
            reject('unexpected options response - key \'signInWithGoogle\' does not exist');
          }
        } catch (e) {
          reject(e);
        }
      };

      xhr.open('GET', urlBase + '/auth-options', true);
      xhr.setRequestHeader('client-type', 'ChromeApp-' + chrome.runtime.getManifest().version);
      sendAndRejectOnFailure(xhr, reject);
    });
  });
}

function isGSuiteEnabledRTC(printerId) {
  return __awaiter(this, void 0, void 0, function* () {
    const serverId = yield Object(_offnetworkcache__WEBPACK_IMPORTED_MODULE_2__[/* getServerIdForPrinter */ "d"])(printerId);

    if (!serverId) {
      throw new Error(`unknown server id for printer: ${printerId}`);
    }

    const serverInfo = Object(_offnetworkcache__WEBPACK_IMPORTED_MODULE_2__[/* getServerIdToServerInfoCache */ "f"])().get(serverId);

    if (serverInfo) {
      return serverInfo.signInWithGoogle;
    }

    Object(_log__WEBPACK_IMPORTED_MODULE_0__[/* log */ "b"])(`Information for server '${serverId}' is not cached, fetching...`);
    return Object(_offnetwork__WEBPACK_IMPORTED_MODULE_1__[/* getServerInfoRTC */ "c"])(serverId).then(info => info.signInWithGoogle).catch(e => {
      Object(_log__WEBPACK_IMPORTED_MODULE_0__[/* error */ "a"])('Unable to determine if Google sign-in is enabled.', e);
      throw e;
    });
  });
}

function isGSuiteEnabled(printJob, cloudPrintJob = false) {
  return __awaiter(this, void 0, void 0, function* () {
    Object(_log__WEBPACK_IMPORTED_MODULE_0__[/* log */ "b"])(`isGSuiteEnabled: printerId=${printJob.printerId} (${cloudPrintJob ? 'Cloud Job' : 'Local Job'})`);

    if (cloudPrintJob) {
      return isGSuiteEnabledRTC(printJob.printerId);
    }

    const urlBase = Object(_printer__WEBPACK_IMPORTED_MODULE_3__[/* getUrlBaseOfPrinterUrl */ "a"])(printJob.printerId);
    return isGSuiteEnabledHTTP(urlBase);
  });
}
function revokeCachedGSuiteAuthToken(msBufferTime = 0) {
  return __awaiter(this, void 0, void 0, function* () {
    Object(_log__WEBPACK_IMPORTED_MODULE_0__[/* log */ "b"])('Revoking auth token with G-Suite...');
    return new Promise((resolve, reject) => {
      chrome.identity.getAuthToken({
        interactive: false
      }, token => {
        if (token === null) {
          resolve();
          return;
        }

        const tokenParam = 'token=' + token;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', GSuiteTokenRevokeUrl + '?' + tokenParam);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.onload = () => {
          if (xhr.status === 200) {
            setTimeout(() => {
              resolve();
            }, msBufferTime);
          } else {
            reject(xhr.responseText);
          }
        };

        sendAndRejectOnFailure(xhr, reject);
      });
    });
  });
}
function sendAndRejectOnFailure(xhr, reject) {
  xhr.onerror = _ => {
    reject('Connection failed');
  };

  xhr.send();
}

function encryptCredentialsWithKey(username, password, rsaKey) {
  Object(_log__WEBPACK_IMPORTED_MODULE_0__[/* log */ "b"])('Encrypting credentials...');
  const plainCredentials = username + ':' + password;
  return rsaKey.encrypt(plainCredentials);
}

function encryptCredentials(mpServerBaseUrl, username, password) {
  return __awaiter(this, void 0, void 0, function* () {
    return getRsaPublicKey(mpServerBaseUrl).then(rsaKey => {
      return encryptCredentialsWithKey(username, password, rsaKey);
    });
  });
}
const inMemoryCreds = {
  rememberMe: false
};
function rememberCredsInMemory(credentials) {
  inMemoryCreds.username = credentials.username;
  inMemoryCreds.password = credentials.password;
  inMemoryCreds.rememberMe = credentials.rememberMe;
}
function clearInMemoryCreds() {
  inMemoryCreds.username = undefined;
  inMemoryCreds.password = undefined;
}
function inMemoryCredsAvailable() {
  return inMemoryCreds.username != null && inMemoryCreds.password != null;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ getManagedStorageData; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ getLocalStorageData; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* reexport */ setLocalStorageData; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* reexport */ saveMap; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* reexport */ loadMap; });

// CONCATENATED MODULE: ./src/scripts/storage/storage.ts
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

function getManagedStorageData(key) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      chrome.storage.managed.get(key, function (data) {
        if (data && data[key]) {
          resolve(data[key]);
        } else if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(undefined);
        }
      });
    });
  });
}
function getLocalStorageData(key) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, result => {
        if (result && result[key]) {
          resolve(result[key]);
        } else if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(undefined);
        }
      });
    });
  });
}
function setLocalStorageData(key, data) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({
        [key]: data
      }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
        } else {
          resolve(data);
        }
      });
    });
  });
}
function saveMap(key, map) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({
        [key]: Array.from(map.entries())
      }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
        } else {
          resolve(key);
        }
      });
    });
  });
}
function loadMap(key) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key, d => {
        if (d && d[key]) {
          const map = new Map();

          for (const [k, v] of d[key]) {
            map.set(k, v);
          }

          resolve(map);
        } else if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
        } else {
          resolve(undefined);
        }
      });
    });
  });
}
// CONCATENATED MODULE: ./src/scripts/storage/index.ts


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "g", function() { return /* binding */ initCache; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ getServerIdToClientCache; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* binding */ getServerIdToServerInfoCache; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ getPrinterNameToServerIdCache; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ getPrintTokenCache; });
__webpack_require__.d(__webpack_exports__, "i", function() { return /* binding */ updatePrintToken; });
__webpack_require__.d(__webpack_exports__, "k", function() { return /* binding */ updateServerInfo; });
__webpack_require__.d(__webpack_exports__, "j", function() { return /* binding */ updatePrinterCache; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ getPrinterCapabilities; });
__webpack_require__.d(__webpack_exports__, "h", function() { return /* binding */ updateLastPrintedTime; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ getServerIdForPrinter; });

// UNUSED EXPORTS: printerCapabilitiesCache

// EXTERNAL MODULE: ./src/scripts/log/index.ts + 3 modules
var log = __webpack_require__(0);

// EXTERNAL MODULE: ./src/scripts/printer/capabilities.ts
var capabilities = __webpack_require__(17);

// EXTERNAL MODULE: ./src/scripts/storage/index.ts + 1 modules
var storage = __webpack_require__(2);

// CONCATENATED MODULE: ./src/scripts/wait.ts
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

function sleep(millis) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise(r => setTimeout(r, millis));
  });
}

function waitForCondition(condTestFunc, sleepMillis = 1000, sleepMaxMillis = 60000) {
  return __awaiter(this, void 0, void 0, function* () {
    const started = performance.now();

    while (!condTestFunc()) {
      if (performance.now() - started > sleepMaxMillis) {
        return false;
      }

      yield sleep(sleepMillis);
    }

    return true;
  });
}
// CONCATENATED MODULE: ./src/scripts/offnetworkcache.ts
var offnetworkcache_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};





const printerCapabilitiesCache = new Map();
const serverIdToClientCache = new Map();
const storageKeyServerIdToInfoCache = 'serverIdToInfoCache';
const serverIdToInfoCache = new Map();
const storageKeyPrinterTimeUsedMap = 'printerTimeUsedMap';
const storageKeyPrinterCapabilitiesMap = 'printerCapabilitiesMap';
const storageKeyPrinterServerMap = 'printerServerMap';
const storageKeyPrintTokenCache = 'printTokenCache';
const printerTimeUsedMap = new Map();
const printerNameToServerIdCache = new Map();
const printTokenCache = new Map();
const storageKeyReclaimStorageLimitKb = 'reclaimStorageLimitKb';
const storageKeyPrintedOlderThanDays = 'printedOlderThanDays';
let offnetworkcache_reclaimStorageLimitKb;
let offnetworkcache_printedOlderThanDays;
let cacheLoaded = false;
function initCache() {
  return Promise.all([Object(storage["a" /* getLocalStorageData */])(storageKeyReclaimStorageLimitKb).then(v => v ? +v : 4096), Object(storage["a" /* getLocalStorageData */])(storageKeyPrintedOlderThanDays).then(v => v ? +v : 30)]).then(([storageLimit, printedAge]) => {
    offnetworkcache_reclaimStorageLimitKb = storageLimit;
    offnetworkcache_printedOlderThanDays = printedAge;
    Object(log["b" /* log */])(`Local storage cleanup settings: reclaimStorageLimitKb=${offnetworkcache_reclaimStorageLimitKb} KiB, ` + `printedOlderThanDays=${offnetworkcache_printedOlderThanDays} days`);
    populateCache(offnetworkcache_reclaimStorageLimitKb, offnetworkcache_printedOlderThanDays);
  });
}
function getServerIdToClientCache() {
  return serverIdToClientCache;
}
function getServerIdToServerInfoCache() {
  return serverIdToInfoCache;
}
function getPrinterNameToServerIdCache() {
  return printerNameToServerIdCache;
}
function getPrintTokenCache() {
  return printTokenCache;
}
function updatePrintToken(printTokenCacheID, printToken) {
  Object(log["b" /* log */])(`saving print token to cache for: ${printTokenCacheID}`);
  getPrintTokenCache().set(printTokenCacheID, printToken);
  saveMapToStorage(storageKeyPrintTokenCache, printTokenCache).then(() => Object(log["b" /* log */])(`Updated print token for: ${printTokenCacheID}`));
}
function updateServerInfo(serverId, serverInfo) {
  const idToServerInfoCache = getServerIdToServerInfoCache();
  idToServerInfoCache.set(serverId, serverInfo);
  saveMapToStorage(storageKeyServerIdToInfoCache, idToServerInfoCache).then(() => Object(log["b" /* log */])(`Updated info for server '${serverId}: ${JSON.stringify(serverInfo)}...`));
}

function populateCache(reclaimStorageLimitKb, printedOlderThanDays) {
  Promise.all([loadMapFromStorage(storageKeyPrinterTimeUsedMap, printerTimeUsedMap), loadMapFromStorage(storageKeyPrinterCapabilitiesMap, printerCapabilitiesCache), loadMapFromStorage(storageKeyPrinterServerMap, printerNameToServerIdCache), loadMapFromStorage(storageKeyPrintTokenCache, printTokenCache), loadMapFromStorage(storageKeyServerIdToInfoCache, serverIdToInfoCache)]).then(() => {
    chrome.storage.local.getBytesInUse(bytesInUse => {
      Object(log["b" /* log */])(`[OffNetworkCache:populateCache] total cached storage: ${(bytesInUse / 1024).toFixed(2)}KiB`);

      if (bytesInUse / 1024 >= reclaimStorageLimitKb) {
        Object(log["c" /* warn */])(`Exceeded storage limit threshold of ${reclaimStorageLimitKb}KiB, 
					cleanup capabilities for printers not used in ${printedOlderThanDays} days...`);
        cleanupStorage(printedOlderThanDays).then(() => Object(log["b" /* log */])(`Completed cleanup of printers used > ${printedOlderThanDays} days`));
      }

      cacheLoaded = true;
      Object(log["b" /* log */])('[OffNetworkCache:populateCache] completed.');
    });
  });
}

function loadMapFromStorage(key, toMap) {
  return Object(storage["c" /* loadMap */])(key).then(map => {
    if (map) {
      copyToMap(map, toMap);
      Object(log["b" /* log */])(`Loaded '${key}' with ${map.size} items from local storage...`);
    } else {
      Object(log["b" /* log */])(`Unable to load '${key} from local storage - it does not exist`);
    }
  }).catch(reason => Object(log["a" /* error */])(`Unable to load '${key}' from local storage: ${reason}`));
}

function saveMapToStorage(key, map) {
  return Object(storage["d" /* saveMap */])(key, map).then(() => Object(log["b" /* log */])(`Saved '${key}' with ${map.size} items to local storage...`)).catch(reason => {
    Object(log["a" /* error */])(`Failed to save data to local storage: ${reason}`);

    if (reason && reason.toLowerCase().includes('quota')) {
      cleanupStorage(offnetworkcache_printedOlderThanDays).then(() => Object(log["b" /* log */])(`Completed cleanup of printers used > ${offnetworkcache_printedOlderThanDays} days`));
    }
  });
}

function copyToMap(src, dst) {
  dst.clear();
  src.forEach((value, key) => dst.set(key, value));
}

function daysAgo(timestampMillis) {
  const millisPerDay = 1000 * 60 * 60 * 24;

  if (timestampMillis === undefined) {
    return undefined;
  }

  return (Date.now() - timestampMillis) / millisPerDay;
}

function cleanupStorage(printedOlderThanDays) {
  return offnetworkcache_awaiter(this, void 0, void 0, function* () {
    Object(log["b" /* log */])(`[OffNetworkCache:cleanupStorage] Storage cleanup requested, printing threshold=${printedOlderThanDays}days`);
    chrome.storage.local.getBytesInUse(usedBytes => {
      Object(log["b" /* log */])(`[OffNetworkCache:cleanupStorage] Storage cleanup, ${(usedBytes / 1024).toFixed(2)}KiB used`);
      Object(log["b" /* log */])(`[OffNetworkCache:cleanupStorage] ${printerCapabilitiesCache.size} printer capabilities cached`);
    });

    for (const printerId of printerCapabilitiesCache.keys()) {
      const printerName = printerNameFromUrl(printerId);
      const unusedPrinter = printerName == undefined || (yield getServerIdForPrinter(printerId)) === undefined;
      const printedDays = daysAgo(printerTimeUsedMap.get(printerId));
      let discard = false;

      if (unusedPrinter) {
        Object(log["b" /* log */])(`[OffNetworkCache:cleanupStorage] Discarding unused printer capability: ${printerName}`);
        discard = true;
      } else if (printedDays === undefined || printedDays > printedOlderThanDays) {
        Object(log["b" /* log */])(`[OffNetworkCache:cleanupStorage] Discarding printer capability older than ${printedOlderThanDays} days: 
			${printerName}, last printed: ${printedDays ? printedDays.toFixed(0) + ' days ago' : 'never'}`);
        discard = true;
      }

      if (discard) {
        printerTimeUsedMap.delete(printerId);
        printerCapabilitiesCache.delete(printerId);
      }
    }

    Object(log["b" /* log */])(`[OffNetworkCache:cleanupStorage] ${printerCapabilitiesCache.size} printer capabilities after clean-up`);
    Promise.all([saveMapToStorage(storageKeyPrinterTimeUsedMap, printerTimeUsedMap), saveMapToStorage(storageKeyPrinterCapabilitiesMap, printerCapabilitiesCache)]).then(() => {
      chrome.storage.local.getBytesInUse(bytesInUse => {
        Object(log["b" /* log */])(`[OffNetworkCache:cleanupStorage] Cleanup complete, ${(bytesInUse / 1024).toFixed(2)}KiB used`);
      });
    });
  });
}

function updatePrinterCache(serverId, printers) {
  return offnetworkcache_awaiter(this, void 0, void 0, function* () {
    for (const printer of printers) {
      printerCapabilitiesCache.set(printer.id, printer.capabilities);
      printerNameToServerIdCache.set(printer.name, serverId);
    }

    yield Promise.all([saveMapToStorage(storageKeyPrinterTimeUsedMap, printerTimeUsedMap), saveMapToStorage(storageKeyPrinterCapabilitiesMap, printerCapabilitiesCache), saveMapToStorage(storageKeyPrinterServerMap, printerNameToServerIdCache)]).catch(e => {
      Object(log["a" /* error */])(`Failed to save data caches to storage: ${e.name} - ${e.message}`);
    });
  });
}
function getPrinterCapabilities(printerId) {
  const cap = printerCapabilitiesCache.get(printerId);

  if (!cap) {
    Object(log["b" /* log */])(`Cached printer capability for '${printerId}' missing from cache!`);
    return null;
  }

  Object(log["b" /* log */])(`Found cached printer capabilities for: ${printerId} => ${JSON.stringify(cap)}`);
  return Object(capabilities["b" /* parseMobilityPrintCapabilities */])(cap);
}
function updateLastPrintedTime(printerUrl) {
  printerTimeUsedMap.set(printerUrl, Date.now());
  saveMapToStorage(storageKeyPrinterTimeUsedMap, printerTimeUsedMap).then(() => {
    Object(log["b" /* log */])(`Saved last printed date for: ${printerUrl}`);
  });
}
function getServerIdForPrinter(printerUrl) {
  return offnetworkcache_awaiter(this, void 0, void 0, function* () {
    const printerName = printerNameFromUrl(printerUrl);

    if (!printerName) {
      return undefined;
    }

    const ready = yield waitForCondition(() => {
      Object(log["b" /* log */])('[OffNetworkCache:getServerIdForPrinter] Waiting for cache to be loaded and ready...');
      return cacheLoaded;
    });

    if (!ready) {
      Object(log["a" /* error */])('[OffNetworkCache:getServerIdForPrinter] Giving up waited for cache to be ready...');
      return undefined;
    }

    for (const [cachedPrinterName, serverId] of printerNameToServerIdCache) {
      if (cachedPrinterName.startsWith(printerName)) {
        return serverId;
      }
    }

    return undefined;
  });
}

function printerNameFromUrl(printerUrl) {
  try {
    const urlPath = new URL(printerUrl).pathname;
    const lastSlash = urlPath.lastIndexOf('/');
    return decodeURIComponent(urlPath.substring(lastSlash + 1));
  } catch (e) {
    Object(log["a" /* error */])(`Cannot find printer name - invalid URL: ${printerUrl}`, e);
    return undefined;
  }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ initCloudPrint; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ isCloudPrintError; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* binding */ saveBYODLink; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ getServerInfoRTC; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ getPrintersFromAllServers; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ getPrinterInfoRTC; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* binding */ submitPrintJobRTC; });

// UNUSED EXPORTS: getOffNetworkLinks

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.unscopables.flat.js
var es_array_unscopables_flat = __webpack_require__(22);

// CONCATENATED MODULE: ./node_modules/pc-mobility-cloud/client/ts/session.ts
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

function createSession(baseUrl, req) {
  return __awaiter(this, void 0, void 0, function* () {
    const init = prepareRequestInit(req.clientToken, req.clientId);
    init.method = "POST";
    const response = yield fetch(`${sessionPath(baseUrl)}`, init);

    if (response.status !== 200) {
      throw `error creating client session [${response.status}]`;
    }

    return yield response.json();
  });
}
function createOffer(baseUrl, req) {
  return __awaiter(this, void 0, void 0, function* () {
    const init = prepareRequestInit(req.clientToken, req.clientId);
    init.method = "PUT";
    init.body = JSON.stringify({
      iceOffer: req.iceOffer
    });
    const response = yield fetch(`${sessionPath(baseUrl)}/${req.sessionId}/offer`, init);

    if (response.status == 400) {
      throw `error sending offer: expired session`;
    }

    if (response.status != 200) {
      throw `error sending offer: [${response.status}]`;
    }

    return yield response.json();
  });
}
function notifyClientCandidates(baseUrl, req) {
  return __awaiter(this, void 0, void 0, function* () {
    const init = prepareRequestInit(req.clientToken, req.clientId);
    init.method = "POST";
    init.body = JSON.stringify({
      iceCandidates: req.iceCandidates
    });
    const response = yield fetch(`${sessionPath(baseUrl)}/${req.sessionId}/candidate`, init);

    if (response.status == 400) {
      throw `error notifying new candidates: expired session`;
    }

    if (response.status != 200) {
      throw `error notifying new candidates: [${response.status}]`;
    }

    return yield response.json();
  });
}
function getAnswer(baseUrl, req) {
  return __awaiter(this, void 0, void 0, function* () {
    const init = prepareRequestInit(req.clientToken, req.clientId);
    init.method = "GET";
    const response = yield fetch(`${sessionPath(baseUrl)}/${req.sessionId}/answer`, init);

    if (response.status == 404) {
      return "pending";
    }

    if (response.status == 400) {
      throw "error retrieving answer: expired session";
    }

    if (response.status != 200) {
      throw `error retrieving answer: [${response.status}]`;
    }

    return yield response.json();
  });
}
function getServerCandidates(baseUrl, req) {
  return __awaiter(this, void 0, void 0, function* () {
    const date = req.since;
    const init = prepareRequestInit(req.clientToken, req.clientId);
    init.method = "GET";
    const response = yield fetch(`${sessionPath(baseUrl)}/${req.sessionId}/servercandidates?since=${req.since}`, init);

    if (response.status == 400) {
      throw `error receiving new candidates: expired session`;
    }

    if (response.status != 200) {
      throw `error receiving new candidates: [${response.status}]`;
    }

    return yield response.json();
  });
}
function deleteSession(baseUrl, req) {
  return __awaiter(this, void 0, void 0, function* () {
    const init = prepareRequestInit(req.clientToken, req.clientId);
    init.method = "DELETE";
    const response = yield fetch(`${sessionPath(baseUrl)}/${req.sessionId}`, init);

    if (response.status != 200) {
      throw `error deleting session: [${response.status}]`;
    }

    return yield response.json();
  });
}

function prepareRequestInit(clientToken, clientId) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${clientToken}`);
  headers.append("X-PaperCut-Client-Id", clientId);
  headers.append("User-Agent", "PaperCutMobilityPrintCloudClientES/1.0.0");
  return {
    headers: headers
  };
}

function sessionPath(baseUrl) {
  return `${baseUrl}/client/v1/session`;
}
// CONCATENATED MODULE: ./node_modules/pc-mobility-cloud/client/ts/index.ts

// EXTERNAL MODULE: ./src/scripts/log/index.ts + 3 modules
var log = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(21);

// CONCATENATED MODULE: ./src/scripts/peer/blob.ts


var blob_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const DEFAULT_CHUNK_SIZE = 16384;
const MIN_CHUNK_SIZE = 1;
function chunkBlob(blob, chunkSize) {
  if (chunkSize < MIN_CHUNK_SIZE) {
    chunkSize = DEFAULT_CHUNK_SIZE;
  }

  return {
    *[Symbol.iterator]() {
      let offset = 0;
      let end = Math.min(offset + chunkSize, blob.size);

      while (offset < blob.size) {
        yield blob.slice(offset, end);
        offset = end;
        end = Math.min(offset + chunkSize, blob.size);
      }

      return;
    }

  };
}
function blobToArrayBuffer(blob) {
  return blob_awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => resolve(reader.result);

      reader.onerror = () => reject(reader.error);

      reader.readAsArrayBuffer(blob);
    });
  });
}
function blobToString(blob) {
  return blob_awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => resolve(reader.result);

      reader.onerror = () => reject(reader.error);

      reader.readAsBinaryString(blob);
    });
  });
}
// CONCATENATED MODULE: ./src/scripts/peer/message.ts
class Message {
  constructor(ev) {
    this.ev = ev;
  }

  stringData() {
    return this.ev.data;
  }

  data() {
    return this.ev.data;
  }

}
// CONCATENATED MODULE: ./src/scripts/peer/datachannel.ts


var datachannel_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};




class datachannel_DataChannel {
  constructor(dataChannel, getChunkSize) {
    this.dataChannel = dataChannel;
    this.getChunkSize = getChunkSize;
    this.label = dataChannel.label;
  }

  sendBlob(b) {
    return datachannel_awaiter(this, void 0, void 0, function* () {
      const chunkSize = this.getChunkSize();
      const thresholdLow = chunkSize;
      const thresholdHigh = Math.max(chunkSize * 8, 1024 * 1024);
      const chunked = chunkBlob(b, chunkSize)[Symbol.iterator]();
      const numChunks = Math.ceil(b.size / chunkSize);
      const logEveryNChunks = Math.floor(1024 * 1024 / chunkSize);
      Object(log["b" /* log */])(`[${this.dataChannel.label}]: sendBlob: size=${b.size} bytes, numChunks=${numChunks}`);
      this.dataChannel.bufferedAmountLowThreshold = thresholdLow;
      const deferred = {
        resolved: false
      };
      deferred.promise = new Promise(resolve => {
        deferred.resolve = () => {
          deferred.resolved = true;
          resolve();
        };
      });
      let chunkIdx = 0;
      let fillInProgress = false;

      const fillToCapacity = () => datachannel_awaiter(this, void 0, void 0, function* () {
        fillInProgress = true;

        while (true) {
          if (this.dataChannel.bufferedAmount >= thresholdHigh) {
            fillInProgress = false;
            return;
          }

          const {
            value,
            done
          } = chunked.next();

          if (done) {
            deferred.resolve();
            return;
          }

          if (chunkIdx > 0 && chunkIdx % logEveryNChunks === 0) {
            Object(log["b" /* log */])(`Transferred ${chunkIdx + 1} out of ${numChunks} chunks. [`, 'label=', this.label, ']');
          }

          const buf = yield blobToArrayBuffer(value);
          this.dataChannel.send(buf);
          chunkIdx++;
        }
      });

      this.dataChannel.onbufferedamountlow = () => datachannel_awaiter(this, void 0, void 0, function* () {
        if (deferred.resolved || fillInProgress) {
          return;
        }

        yield fillToCapacity();
      });

      Object(log["b" /* log */])('Starting data channel transfer. [', 'size=', b.size, 'chunkSize=', chunkSize, 'chunks=', numChunks, 'bufferHigh=', thresholdHigh, ']');
      const start = Date.now();
      yield fillToCapacity();
      yield deferred.promise;
      this.dataChannel.onbufferedamountlow = undefined;
      Object(log["b" /* log */])('Data channel transfer complete. [', 'label=', this.label, 'duration=', Date.now() - start, ']');
    });
  }

  sendString(s) {
    Object(log["b" /* log */])(`[${this.dataChannel.label}]: sendString: size=${s.length} bytes`);

    if (this.isClosed()) {
      Object(log["a" /* error */])(`Cannot send message on closed channel '${this.dataChannel.label}`);
      return;
    }

    this.dataChannel.send(s);
  }

  isClosed() {
    return this.dataChannel.readyState === 'closed';
  }

  close() {
    this.dataChannel.close();
  }

  onOpen(f) {
    this.dataChannel.onopen = ev => {
      f(this, ev);
    };
  }

  onMessage(f) {
    this.dataChannel.onmessage = ev => {
      const msg = new Message(ev);
      f(this, msg);
    };
  }

  clearOnMessage() {
    this.dataChannel.onmessage = null;
  }

  onClose(f) {
    this.dataChannel.onclose = ev => {
      f(this, ev);
    };
  }

  onError(f) {
    this.dataChannel.onerror = ev => {
      f(this, ev);
    };
  }

}
// CONCATENATED MODULE: ./src/scripts/peer/signal.ts
function decodeSessionDescription(offer) {
  return JSON.parse(atob(offer));
}
function encodeSessionDescription(sd) {
  return btoa(JSON.stringify(sd));
}
// CONCATENATED MODULE: ./src/scripts/peer/peer.ts
var peer_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};




const peer_MIN_CHUNK_SIZE = 16 * 1024;
const MAX_CHUNK_SIZE = 256 * 1024;
class peer_Peer {
  constructor(iceConfig) {
    this.dataChannels = new Map();
    this.connectionStateChangeCallbacks = [];
    this.connection = new RTCPeerConnection(createRTCConfig(iceConfig));

    this.connection.onconnectionstatechange = ev => {
      for (const f of this.connectionStateChangeCallbacks) {
        f(this, ev);
      }
    };
  }

  createDataChannel(label) {
    const dc = this.connection.createDataChannel(label);
    const channel = new datachannel_DataChannel(dc, this.getChunkSize.bind(this));
    this.dataChannels.set(label, channel);
    return channel;
  }

  getChunkSize() {
    if (this.connection.sctp) {
      Object(log["b" /* log */])(`Using SCTP specified chunk size value: ${this.connection.sctp.maxMessageSize}bytes`);
      return Math.min(this.connection.sctp.maxMessageSize - 1, MAX_CHUNK_SIZE);
    }

    Object(log["b" /* log */])(`Using fall-back chunk size value: ${peer_MIN_CHUNK_SIZE}bytes`);
    return peer_MIN_CHUNK_SIZE;
  }

  onDataChannel(f) {
    this.connection.ondatachannel = ev => {
      const dc = new datachannel_DataChannel(ev.channel, this.getChunkSize.bind(this));
      this.dataChannels.set(dc.label, dc);
      f(this, dc);
    };
  }

  onNegotiationNeeded(f) {
    this.connection.onnegotiationneeded = ev => {
      f(this, ev);
    };
  }

  onICECandidate(f) {
    this.connection.onicecandidate = ev => {
      f(this, ev);
    };
  }

  isPeerConnected() {
    console.log('checking peer connection state: ', this.connection.iceConnectionState);
    return this.connection.connectionState === 'connected';
  }

  close() {
    this.connection.close();
  }

  createAnswer(offer) {
    return peer_awaiter(this, void 0, void 0, function* () {
      const offerSessionDescription = decodeSessionDescription(offer);
      yield this.connection.setRemoteDescription(offerSessionDescription);
      const answer = yield this.connection.createAnswer();
      yield this.connection.setLocalDescription(answer);
      return encodeSessionDescription(answer);
    });
  }

  onConnectionStateChange(f) {
    this.connectionStateChangeCallbacks.push(f);
  }

  onICEConnectionStateChange(f) {
    return peer_awaiter(this, void 0, void 0, function* () {
      this.connection.oniceconnectionstatechange = ev => {
        f(this, ev);
      };
    });
  }

  getConnectionState() {
    return this.connection.connectionState;
  }

  getICEConnectionState() {
    return this.connection.iceConnectionState;
  }

  createOffer() {
    return peer_awaiter(this, void 0, void 0, function* () {
      const offer = yield this.connection.createOffer();
      yield this.connection.setLocalDescription(offer);
      const result = this.connection.localDescription;
      return encodeSessionDescription(result);
    });
  }

  registerAnswer(answer) {
    return peer_awaiter(this, void 0, void 0, function* () {
      const answerSessionDescription = decodeSessionDescription(answer);
      yield this.connection.setRemoteDescription(answerSessionDescription);
    });
  }

  addIceCandidate(candidate) {
    return this.connection.addIceCandidate(candidate);
  }

  getDataChannel(label) {
    return this.dataChannels.get(label);
  }

  getSelectedCandidatePair() {
    const iceTransport = this.getICETransport();

    if (!iceTransport) {
      return null;
    }

    return iceTransport.getSelectedCandidatePair();
  }

  getICETransport() {
    const sctp = this.connection.sctp;

    if (!sctp) {
      return null;
    }

    return sctp.transport.iceTransport;
  }

  waitForLiveConnection(waitFor) {
    return new Promise((res, rej) => {
      const timeout = setTimeout(() => rej('timeout waiting for peer connection, state:' + this.getConnectionState()), waitFor);
      this.onConnectionStateChange((ctx, _) => {
        switch (ctx.getConnectionState()) {
          case 'connected':
            clearTimeout(timeout);
            res();
            break;

          case 'failed':
            clearTimeout(timeout);
            rej('failed');
            break;
        }
      });
    });
  }

}

function createRTCConfig(iceConfig) {
  return {
    iceServers: iceConfig.servers,
    iceTransportPolicy: 'all'
  };
}
// CONCATENATED MODULE: ./src/scripts/peer/index.ts





// CONCATENATED MODULE: ./src/scripts/cloudprint/client.ts


var client_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};



class client_MobRTCClient {
  constructor(id, peer, timeout, chunkSize, version) {
    this.id = id;
    this.peer = peer;
    this.timeout = timeout;
    this.chunkSize = chunkSize;
    this.version = version;
    this.shortTimeout = timeout / 4;
  }

  getID() {
    return this.id;
  }

  getServerInfo() {
    return client_awaiter(this, void 0, void 0, function* () {
      Object(log["b" /* log */])('Fetching server info...');
      const dc = this.getServerInfoChannel();
      dc.sendString(' ');
      return this.readJsonResponseFromChannel(dc, this.shortTimeout);
    });
  }

  sendPrintJobDetails(printToken, printerUrl, params, fileSize) {
    return client_awaiter(this, void 0, void 0, function* () {
      Object(log["b" /* log */])(`Submitting print job details: printerUrl=${printerUrl}, fileSize=${fileSize} bytes.`);
      const msg = JSON.stringify({
        clientVersion: this.version,
        printToken,
        printerUrl,
        params,
        fileSize
      });
      const dc = this.getJobDetailsChannel();
      dc.sendString(msg);
      let buf;
      let data;

      try {
        buf = yield this.readChunkedResponse(dc);
        data = byteArrayToString(buf);
      } catch (e) {
        Object(log["a" /* error */])('error parsing print job details response', e);
        throw e;
      }

      if (client_MobRTCClient.isError(data)) {
        throw new Error(data);
      }

      return data;
    });
  }

  sendPrintJob(file) {
    return client_awaiter(this, void 0, void 0, function* () {
      if (file.size == 0) {
        throw new Error(`invalid file size: [${file.size}]`);
      }

      return this.getJobChannel().sendBlob(file);
    });
  }

  isReady() {
    return this.peer && this.peer.isPeerConnected();
  }

  close() {
    this.peer.close();
  }

  getPrintToken(shareToken) {
    return client_awaiter(this, void 0, void 0, function* () {
      Object(log["b" /* log */])('Exchanging share token for print token.');
      return new Promise((resolve, reject) => client_awaiter(this, void 0, void 0, function* () {
        const dc = this.getTokenChannel();
        dc.sendString(shareToken);
        let buf;

        try {
          buf = yield this.readChunkedResponse(dc);
        } catch (e) {
          return reject(e);
        }

        let printToken;

        try {
          printToken = byteArrayToString(buf);
        } catch (e) {
          Object(log["a" /* error */])('error parsing auth-token response', e);
          return reject(e);
        }

        if (client_MobRTCClient.isError(printToken)) {
          return reject(`failed to exchange shareToken for printToken: ${printToken}`);
        }

        return resolve(printToken);
      }));
    });
  }

  readChunkedResponse(dc, chunkTimeout = this.timeout) {
    Object(log["b" /* log */])(`[${dc.label}]: readChunkedResponse,  chunkTimeout=${chunkTimeout}ms`);
    return new Promise((resolve, reject) => {
      let chunkIdx = 0;
      const startTime = performance.now();
      const buf = [];
      let onTimeout = setTimeout(() => {
        dc.clearOnMessage();
        return reject(`${chunkTimeout}ms timeout waiting for the first response.`);
      }, chunkTimeout);
      let logEveryNChunks = 0;
      dc.onMessage((ctx, msg) => {
        clearTimeout(onTimeout);
        onTimeout = setTimeout(() => {
          ctx.clearOnMessage();
          return reject(`timeout waiting for data chunk: [${chunkIdx}]`);
        }, this.timeout);
        chunkIdx++;

        if (msg.stringData() === 'FINISH') {
          clearTimeout(onTimeout);
          ctx.clearOnMessage();

          if (buf.length == 0) {
            return resolve(new Uint8Array());
          }

          const result = buf.reduce((prev, next) => concatByteArrays(prev, next));
          Object(log["b" /* log */])(`[${dc.label}]: `, `Finished receiving ${(result.length / 1024).toFixed(2)}KiB,`, `chunks received: [${chunkIdx}]`, `took: ${(performance.now() - startTime).toFixed(2)} ms`);
          return resolve(result);
        }

        const chunk = msg.data();
        buf.push(new Uint8Array(chunk));

        if (logEveryNChunks === 0 && chunk.byteLength > 0) {
          logEveryNChunks = Math.floor(1024 * 1024 / chunk.byteLength);
        } else if (logEveryNChunks > 0 && chunkIdx > 0 && chunkIdx % logEveryNChunks === 0) {
          Object(log["b" /* log */])(`[${dc.label}]: `, `Received ${chunkIdx} chunks,`, `${(chunk.byteLength * chunkIdx / 1024).toFixed(2)}KiB .`);
        }
      });
    });
  }

  getPrinters(printToken) {
    return client_awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => client_awaiter(this, void 0, void 0, function* () {
        const dc = this.getPrinterChannel();
        dc.sendString(printToken);
        let printers;

        try {
          printers = yield this.readJsonResponseFromChannel(dc);
        } catch (e) {
          Object(log["a" /* error */])('error reading printer info response', e);
          return reject(e);
        }

        printers.forEach(p => {
          p.id = `http://localhost:9163/printers/${encodeURIComponent(p.name)}`;
          p.name = `${p.name} - [${p.description}]`;
        });
        return resolve(printers);
      }));
    });
  }

  getCapabilities(printerId) {
    return client_awaiter(this, void 0, void 0, function* () {
      const dc = this.getCapabilitiesChannel();
      dc.sendString(printerId);
      return this.readJsonResponseFromChannel(dc);
    });
  }

  readJsonResponseFromChannel(dc, timeout = this.timeout) {
    return client_awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => client_awaiter(this, void 0, void 0, function* () {
        let buf;

        try {
          buf = yield this.readChunkedResponse(dc, timeout);
          const data = byteArrayToString(buf);

          if (client_MobRTCClient.isError(data)) {
            Object(log["a" /* error */])(`[${dc.label}]: Server responded with error: ${data}`);
            return reject(`Server responded with error on: ${dc.label}`);
          }

          try {
            resolve(JSON.parse(data));
          } catch (e) {
            Object(log["a" /* error */])('error parsing JSON response: ', e, buf);
            return reject(e);
          }
        } catch (e) {
          Object(log["a" /* error */])('error reading response: ', e, buf);
          return reject(e);
        }
      }));
    });
  }

  getServerInfoChannel() {
    return this.peer.getDataChannel(SERVER_INFO_LABEL);
  }

  getPrinterChannel() {
    return this.peer.getDataChannel(PRINTER_CHANNEL_LABEL);
  }

  getJobChannel() {
    return this.peer.getDataChannel(JOB_CHANNEL_LABEL);
  }

  getTokenChannel() {
    return this.peer.getDataChannel(TOKEN_CHANNEL_LABEL);
  }

  getCapabilitiesChannel() {
    return this.peer.getDataChannel(CAPABILITIES_CHANNEL_LABEL);
  }

  getJobDetailsChannel() {
    return this.peer.getDataChannel(JOB_DETAILS_LABEL);
  }

  static isError(data) {
    return data.startsWith('ERROR:');
  }

}
function byteArrayToString(buf) {
  const utf8decode = new TextDecoder();
  return utf8decode.decode(buf);
}
function concatByteArrays(head, tail) {
  const concatResult = new Uint8Array(head.length + tail.length);
  concatResult.set(head);
  concatResult.set(tail, head.length);
  return concatResult;
}
// CONCATENATED MODULE: ./src/scripts/cloudprint/clientbuilder.ts
var clientbuilder_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};





const SERVER_INFO_LABEL = 'SERVERINFO';
const JOB_CHANNEL_LABEL = 'JOB';
const JOB_DETAILS_LABEL = 'JOBDETAILS';
const PRINTER_CHANNEL_LABEL = 'PRINTER';
const TOKEN_CHANNEL_LABEL = 'TOKEN';
const CAPABILITIES_CHANNEL_LABEL = 'CAPABILITIES';
const CLIENT_API_BASE_URL_PROD = 'https://mp.cloud.papercut.com';
const CLIENT_API_BASE_URL_TEST = 'https://mp.cloud.papercut.software';
class clientbuilder_MobRTCClientBuilder {
  constructor(serverId) {
    this.clientId = '';
    this.timeout = 20000;
    this.shareToken = '';
    this.printToken = '';
    this.baseUrl = CLIENT_API_BASE_URL_PROD;
    this.serverId = serverId;
  }

  setClientId(clientId) {
    this.clientId = clientId;
    return this;
  }

  setTimeout(timeout) {
    this.timeout = timeout;
    return this;
  }

  setShareToken(shareToken) {
    this.shareToken = shareToken;
    return this;
  }

  setPrintToken(printToken) {
    this.printToken = printToken;
    return this;
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
    return this;
  }

  build() {
    return clientbuilder_awaiter(this, void 0, void 0, function* () {
      let receivedAnswer = false;
      const clientCandidates = [];
      const clientToken = this.printToken || this.shareToken;
      const {
        id,
        iceConfig
      } = yield createSession(this.baseUrl, {
        clientToken,
        clientId: this.clientId
      });
      let sessionDeleted = false;
      Object(log["b" /* log */])('[MOB RTC Builder]: ICE servers', iceConfig.servers);
      const sessionParams = {
        clientToken,
        sessionId: id,
        clientId: this.clientId
      };
      Object(log["b" /* log */])(`[MOB RTC Builder]: starting peer connection: serverId=${this.serverId}, sessionId=${id}, clientId=${this.clientId}`);
      const peer = new peer_Peer(iceConfig);
      peer.onConnectionStateChange((ctx, _) => {
        if (sessionDeleted) {
          return;
        }

        switch (ctx.getConnectionState()) {
          case 'closed':
          case 'failed':
            Object(log["b" /* log */])('RTC connection closed, deleting session.', 'sessionId', id);
            sessionDeleted = true;
            deleteSession(this.baseUrl, Object.assign({}, sessionParams)).then(() => {
              Object(log["b" /* log */])('Cloud session deleted.', 'sessionId', id);
            });
            break;

          default:
            Object(log["b" /* log */])(`RTC connection state changed: ${ctx.getConnectionState()}`);
        }
      });
      peer.onICECandidate((ctx, ev) => clientbuilder_awaiter(this, void 0, void 0, function* () {
        if (ev.candidate == null) {
          Object(log["b" /* log */])('candidates exhausted');
          return;
        }

        if (!receivedAnswer) {
          clientCandidates.push(JSON.stringify(ev.candidate));
          return;
        }

        try {
          Object(log["b" /* log */])('found candidate, sending to remote peer', ev.candidate);
          yield notifyClientCandidates(this.baseUrl, Object.assign(Object.assign({}, sessionParams), {
            iceCandidates: [JSON.stringify(ev.candidate)]
          }));
        } catch (e) {
          ctx.close();
          yield deleteSession(this.baseUrl, Object.assign({}, sessionParams));
          throw e;
        }
      }));
      const start = Date.now();
      const peerConnectionLive = peer.waitForLiveConnection(this.timeout);
      Object(log["b" /* log */])('registering ice candidate send handler');
      const offer = new Promise(res => {
        peer.onNegotiationNeeded((ctx, _) => clientbuilder_awaiter(this, void 0, void 0, function* () {
          const offer = yield ctx.createOffer();
          res(offer);
        }));
      });
      const dataChannels = this.setDataChannelHandlers(peer);
      Object(log["b" /* log */])('sending offer to remote peer');
      yield createOffer(this.baseUrl, Object.assign(Object.assign({}, sessionParams), {
        iceOffer: yield offer
      }));
      Object(log["b" /* log */])('awaiting answer');
      const answer = yield pollGetAnswer(this.baseUrl, Object.assign({}, sessionParams), {
        interval: 500,
        timeout: 15000
      });

      if (answer == 'timeout') {
        throw new Error('could not retrieve remote answer');
      }

      Object(log["b" /* log */])('registering remote answer locally');
      yield peer.registerAnswer(answer.iceAnswer);
      receivedAnswer = true;

      if (clientCandidates.length > 0) {
        Object(log["b" /* log */])('sending buffered candidate to peer');
        yield notifyClientCandidates(this.baseUrl, Object.assign(Object.assign({}, sessionParams), {
          iceCandidates: clientCandidates
        }));
      }

      this.pollForCandidates(peer, sessionParams);

      try {
        yield peerConnectionLive;
      } catch (e) {
        throw e;
      }

      const sel = peer.getSelectedCandidatePair();
      Object(log["b" /* log */])(`Selected peer candidates, local: ${JSON.stringify(sel.local)}, remote: ${JSON.stringify(sel.remote)}`);
      Object(log["b" /* log */])(`Peer connection live. Time to establish connection: ${(Date.now() - start) / 1000} seconds.`);

      try {
        yield Promise.race([dataChannels, new Promise(res => setTimeout(res, this.timeout))]);
      } catch (e) {
        throw e;
      }

      Object(log["b" /* log */])('Data channels live.');
      const version = 'ChromeApp-' + chrome.runtime.getManifest().version;
      Object(log["b" /* log */])(`Creating Mobility Cloud client: 
			version=${version},
			serverId=${this.serverId}, 
			sessionId=${sessionParams.sessionId}
			clientId=${sessionParams.clientId}
			timeout=${this.timeout}ms, 
			maxChunkSize=${iceConfig.maxChunkSize}`);
      return new client_MobRTCClient(sessionParams.sessionId, peer, this.timeout, iceConfig.maxChunkSize, version);
    });
  }

  pollForCandidates(peer, sessionParams, timeoutMs = 20000) {
    Object(log["b" /* log */])('start polling for server candidates');
    new Promise(res => clientbuilder_awaiter(this, void 0, void 0, function* () {
      let time = 0;
      let shouldBreak = false;
      setTimeout(() => {
        shouldBreak = true;
      }, timeoutMs);

      while (true) {
        const {
          iceCandidates,
          updated
        } = yield getServerCandidates(this.baseUrl, Object.assign(Object.assign({}, sessionParams), {
          since: time
        }));
        time = updated;
        iceCandidates.forEach(c => {
          Object(log["b" /* log */])('candidate', c);
          const candidate = JSON.parse(c);
          peer.addIceCandidate(candidate);
        });
        yield delay(500);

        if (shouldBreak) {
          break;
        }
      }

      res();
    })).then(_ => {
      Object(log["b" /* log */])('stopped waiting for more server candidates');
    });
  }

  setDataChannelHandler(peer, label) {
    const channel = peer.createDataChannel(label);
    channel.onClose((ctx, _) => {
      Object(log["b" /* log */])(`[MOB RTC Client]: [${ctx.label}] datachannel closed`);
    });
    channel.onError((ctx, ev) => {
      if (ev.error.message == 'Transport channel closed') {} else {
        Object(log["b" /* log */])(`[MOB RTC Client]: [${ctx.label}] datachannel error`, ev.error.errorDetail);
      }
    });
    return new Promise(resolve => {
      channel.onOpen((ctx, _) => {
        Object(log["b" /* log */])(`[MOB RTC Client]: [${ctx.label}] datachannel open and ready`);
        resolve();
      });
    });
  }

  setDataChannelHandlers(peer) {
    return Promise.all([this.setDataChannelHandler(peer, SERVER_INFO_LABEL), this.setDataChannelHandler(peer, CAPABILITIES_CHANNEL_LABEL), this.setDataChannelHandler(peer, TOKEN_CHANNEL_LABEL), this.setDataChannelHandler(peer, PRINTER_CHANNEL_LABEL), this.setDataChannelHandler(peer, JOB_CHANNEL_LABEL), this.setDataChannelHandler(peer, JOB_DETAILS_LABEL)]);
  }

}

function delay(ms) {
  return clientbuilder_awaiter(this, void 0, void 0, function* () {
    return new Promise(res => setTimeout(() => {
      chrome.runtime.sendMessage({
        msg: 'keep active'
      });
      res();
    }, ms));
  });
}

function pollGetAnswer(baseUrl, req, pollOptions) {
  return clientbuilder_awaiter(this, void 0, void 0, function* () {
    let shouldBreak = false;
    const timeout = setTimeout(() => {
      shouldBreak = true;
    }, pollOptions.timeout);

    while (true) {
      if (shouldBreak) {
        break;
      }

      const response = yield getAnswer(baseUrl, req);

      if (response !== 'pending') {
        clearTimeout(timeout);
        return response;
      }

      yield delay(pollOptions.interval);
    }

    return 'timeout';
  });
}
// CONCATENATED MODULE: ./src/scripts/cloudprint/shareToken.ts
const shareTokenSubject = 'tokenCreation';

class jwt {}

class CloudPrintShareToken {
  constructor(orgID, serverID, expiry, expired) {
    this.orgID = orgID;
    this.serverID = serverID;
    this.expiry = expiry;
    this.expired = expired;
    this.tokenString = '';
  }

  toString() {
    return this.tokenString;
  }

  static parse(tokenStr) {
    let tokenObj = new jwt();

    try {
      tokenObj = parseJwt(tokenStr);
    } catch (e) {
      throw new Error('error parsing jwt');
    }

    if (tokenObj.sub !== shareTokenSubject) {
      throw new Error('jwt is not a share token');
    }

    const expiryDate = new Date(tokenObj.exp * 1000);
    const expired = expiryDate < new Date();
    const shareToken = new CloudPrintShareToken(tokenObj.org, tokenObj.srv, expiryDate, expired);
    shareToken.tokenString = tokenStr;
    return shareToken;
  }

}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
// CONCATENATED MODULE: ./src/scripts/cloudprint/link.ts

class link_CloudPrintLink {
  constructor(orgId, serverId, shareToken, testEnv) {
    this.orgId = orgId;
    this.serverId = serverId;
    this.shareToken = shareToken;
    this.testEnv = testEnv;
  }

  static parse(link) {
    const url = new URL(link);
    let testEnv = false;

    if (url.host.endsWith('.papercut.com')) {} else if (url.host.endsWith('.papercut.software')) {
      testEnv = true;
    } else {
      throw new Error('unexpected link domain');
    }

    const shareTokenStr = url.searchParams.get('token');

    if (!shareTokenStr) {
      throw new Error('link token param not found');
    }

    const shareToken = CloudPrintShareToken.parse(shareTokenStr);
    return new link_CloudPrintLink(shareToken.orgID, shareToken.serverID, shareToken.toString(), testEnv);
  }

}
// CONCATENATED MODULE: ./src/scripts/cloudprint/index.ts



// CONCATENATED MODULE: ./src/scripts/random/string.ts
const RANDOM_STRING_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function cryptoRandomString(length) {
  let result = '';

  for (const v of crypto.getRandomValues(new Uint32Array(length))) {
    result += RANDOM_STRING_CHARSET[v % RANDOM_STRING_CHARSET.length];
  }

  return result;
}
// CONCATENATED MODULE: ./src/scripts/random/index.ts

// EXTERNAL MODULE: ./src/scripts/storage/index.ts + 1 modules
var storage = __webpack_require__(2);

// CONCATENATED MODULE: ./src/scripts/identity/clientId.ts
var clientId_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};



const CLIENT_ID_LENGTH = 22;
function getClientId() {
  return clientId_awaiter(this, void 0, void 0, function* () {
    const clientId = yield Object(storage["a" /* getLocalStorageData */])('clientId');

    if (clientId) {
      return Promise.resolve(clientId);
    } else {
      return Object(storage["e" /* setLocalStorageData */])('clientId', cryptoRandomString(CLIENT_ID_LENGTH));
    }
  });
}
// CONCATENATED MODULE: ./src/scripts/identity/index.ts

// EXTERNAL MODULE: ./src/scripts/offnetworkcache.ts + 1 modules
var offnetworkcache = __webpack_require__(3);

// CONCATENATED MODULE: ./src/scripts/offnetwork.ts


var offnetwork_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};





function initCloudPrint() {
  return offnetwork_awaiter(this, void 0, void 0, function* () {
    Object(log["b" /* log */])('[OffNetwork] Initializing Cloud Print');
    yield getClientId();
    return Object(offnetworkcache["g" /* initCache */])();
  });
}
const LINKS_STORAGE_KEY = 'CloudPrintInviteLinks';
const CLOUD_PRINT_ERR = 'Cloud Print error';
function isCloudPrintError(e) {
  if (typeof e === 'string') {
    return e.includes(CLOUD_PRINT_ERR);
  }

  return e && e.message && e.message.includes(CLOUD_PRINT_ERR);
}
function saveBYODLink(link) {
  return offnetwork_awaiter(this, void 0, void 0, function* () {
    const links = yield getAllLinks();

    if (!links.includes(link)) {
      Object(log["b" /* log */])(`no existing link found, saving the received link as a BYOD link: ${link}`);
      const byodLinks = yield getBYODLinks();
      byodLinks.push(link);
      chrome.storage.local.set({
        CloudPrintInviteLinks: byodLinks
      });
    } else {
      Object(log["b" /* log */])('found existing link');
    }
  });
}

function getBYODLinks() {
  return new Promise(res => {
    chrome.storage.local.get(LINKS_STORAGE_KEY, data => {
      if (data && data[LINKS_STORAGE_KEY]) {
        Object(log["b" /* log */])(`getting ${data[LINKS_STORAGE_KEY].length} BYOD link(s)...`);
        return res(data[LINKS_STORAGE_KEY]);
      } else {
        Object(log["b" /* log */])('no BYOD links found');
        res([]);
      }
    });
  });
}

function getManagedLinks() {
  return new Promise(res => {
    chrome.storage.managed.get(LINKS_STORAGE_KEY, data => {
      if (data && data[LINKS_STORAGE_KEY]) {
        Object(log["b" /* log */])(`getting ${data[LINKS_STORAGE_KEY].length} managed link(s)...`);
        return res(data[LINKS_STORAGE_KEY]);
      } else {
        Object(log["b" /* log */])('no managed links found');
        return res([]);
      }
    });
  });
}

function getAllLinks() {
  return offnetwork_awaiter(this, void 0, void 0, function* () {
    const storedLinks = yield getManagedLinks();
    const byodLinks = yield getBYODLinks();
    return storedLinks.concat(byodLinks);
  });
}

function getOffNetworkLinks() {
  return offnetwork_awaiter(this, void 0, void 0, function* () {
    const allLinks = yield getAllLinks();
    const links = allLinks.map(s => {
      try {
        return link_CloudPrintLink.parse(s);
      } catch (e) {
        Object(log["a" /* error */])('Failed to parse Cloud Print link.', 'link', s, e);
      }
    }).filter(res => res != null);
    Object(log["b" /* log */])('Parsed Cloud Print links.', links.map(l => l.orgId + '/' + l.serverId));
    return links;
  });
}

function getPrintTokenCacheID(serverId, shareToken) {
  return serverId + ':' + shareToken;
}

function getOrExchangePrintToken(serverId, shareToken) {
  return offnetwork_awaiter(this, void 0, void 0, function* () {
    const printTokenCacheID = getPrintTokenCacheID(serverId, shareToken);
    const cachedPrintToken = Object(offnetworkcache["a" /* getPrintTokenCache */])().get(printTokenCacheID);

    if (cachedPrintToken) {
      Object(log["b" /* log */])(`got cached print token for: ${printTokenCacheID}`);
      return cachedPrintToken;
    }

    const client = yield getMobRTCClient(serverId);
    const printToken = yield client.getPrintToken(shareToken);
    Object(offnetworkcache["i" /* updatePrintToken */])(printTokenCacheID, printToken);
    return printToken;
  });
}

function getShareToken(serverId) {
  return offnetwork_awaiter(this, void 0, void 0, function* () {
    return (yield getLink(serverId)).shareToken;
  });
}

function getLink(serverId) {
  return offnetwork_awaiter(this, void 0, void 0, function* () {
    const link = (yield getOffNetworkLinks()).find(link => link.serverId == serverId);

    if (!link) {
      throw new Error(`no link for server ${serverId}`);
    }

    return link;
  });
}

function createMobRTCClient(serverId) {
  return offnetwork_awaiter(this, void 0, void 0, function* () {
    Object(log["b" /* log */])(`Creating Mobility Print Cloud Print client for server '${serverId}' ...`);
    let client;
    const clientId = yield getClientId();
    const clientBuilder = new clientbuilder_MobRTCClientBuilder(serverId).setClientId(clientId);

    if ((yield getLink(serverId)).testEnv) {
      clientBuilder.setBaseUrl(CLIENT_API_BASE_URL_TEST);
    }

    const shareToken = yield getShareToken(serverId);
    const printTokenCacheID = getPrintTokenCacheID(serverId, shareToken);
    const printToken = Object(offnetworkcache["a" /* getPrintTokenCache */])().get(printTokenCacheID);

    if (printToken) {
      clientBuilder.setPrintToken(printToken);
    } else {
      clientBuilder.setShareToken(shareToken);
    }

    try {
      client = yield clientBuilder.build();
    } catch (e) {
      Object(log["a" /* error */])(`Could not create Mobility Cloud Print client: ${serverId}`, e);
      throw new Error(`${CLOUD_PRINT_ERR}: Could not connect: ${e}`);
    }

    Object(offnetworkcache["e" /* getServerIdToClientCache */])().set(serverId, client);

    try {
      const serverInfo = yield client.getServerInfo();
      Object(offnetworkcache["k" /* updateServerInfo */])(serverId, serverInfo);
    } catch (e) {
      Object(log["a" /* error */])('Could not obtain server info', e);
    }

    return client;
  });
}

function getMobRTCClient(serverId) {
  return offnetwork_awaiter(this, void 0, void 0, function* () {
    const client = Object(offnetworkcache["e" /* getServerIdToClientCache */])().get(serverId);

    if (client && client.isReady()) {
      return client;
    } else if (client) {
      Object(log["b" /* log */])(`Ignoring stale Cloud Print client: ${client.getID()} for server: ${serverId}`);
    }

    return createMobRTCClient(serverId);
  });
}

function getServerInfoRTC(serverId) {
  return offnetwork_awaiter(this, void 0, void 0, function* () {
    Object(log["b" /* log */])(`Requesting server info via RTC: ${serverId}`);
    let client;

    try {
      client = yield getMobRTCClient(serverId);
    } catch (e) {
      Object(log["a" /* error */])('[OffNetwork:getServerInfo] error ', e);
      throw new Error('can not get server info from cloud connection');
    }

    const serverInfo = yield client.getServerInfo();
    Object(log["b" /* log */])('Received server info.', serverInfo);
    return serverInfo;
  });
}
function getPrintersFromAllServers() {
  return offnetwork_awaiter(this, void 0, void 0, function* () {
    let links;

    try {
      links = yield getOffNetworkLinks();
    } catch (e) {
      Object(log["a" /* error */])('[OffNetwork:getPrintersFromAllServers] failed to update links: ', e);
    }

    if (links.length === 0) {
      Object(log["b" /* log */])('[OffNetwork:getPrintersFromAllServers] No Cloud Print links, skipping Cloud Print discovery.');
      return [];
    }

    Object(log["b" /* log */])('[OffNetwork:getPrintersFromAllServers] links', links);
    const serverIds = new Set(links.map(link => link.serverId));
    const printerNameToServerIdCache = Object(offnetworkcache["c" /* getPrinterNameToServerIdCache */])();

    for (const [printerName, serverId] of printerNameToServerIdCache.entries()) {
      if (!serverIds.has(serverId)) {
        printerNameToServerIdCache.delete(printerName);
      }
    }

    try {
      return (yield Promise.all([...serverIds].map(getPrintersFromServer))).flat(Infinity);
    } catch (e) {
      Object(log["a" /* error */])('[OffNetwork:getPrintersFromOffNetWork] failed: ', e);
      return [];
    }
  });
}

function getPrintersFromServer(serverId) {
  return offnetwork_awaiter(this, void 0, void 0, function* () {
    let client;

    try {
      client = yield getMobRTCClient(serverId);
    } catch (e) {
      Object(log["a" /* error */])('[OffNetwork:getPrintersFromServer]: ', e);
      return [];
    }

    const shareToken = yield getShareToken(serverId);
    const printToken = yield getOrExchangePrintToken(serverId, shareToken);
    let printers;

    try {
      printers = yield client.getPrinters(printToken);
      Object(log["b" /* log */])('[OffNetwork:getPrintersFromServer]', `serverId: ${serverId}`, printers);
    } catch (e) {
      Object(log["a" /* error */])('[OffNetwork:getPrintersFromServer]: ', e);
      const printTokenCacheID = getPrintTokenCacheID(serverId, shareToken);
      Object(offnetworkcache["a" /* getPrintTokenCache */])().delete(printTokenCacheID);
      return [];
    }

    yield Object(offnetworkcache["j" /* updatePrinterCache */])(serverId, printers);
    return printers;
  });
}

function getPrinterInfoRTC(printerId) {
  return offnetwork_awaiter(this, void 0, void 0, function* () {
    const serverId = yield Object(offnetworkcache["d" /* getServerIdForPrinter */])(printerId);

    if (!serverId) {
      throw new Error(`unknown server id for printer: ${printerId}`);
    }

    Object(log["b" /* log */])('Requesting printer capabilities via RTC.', `serverId: ${serverId}, printerId: ${printerId}`);
    let client;

    try {
      client = yield getMobRTCClient(serverId);
    } catch (e) {
      Object(log["a" /* error */])('[OffNetwork:getCapabilitiesOffNetwork] error ', e);
      throw new Error('can not get capabilities from cloud connection');
    }

    const capabilities = yield client.getCapabilities(printerId);
    Object(log["b" /* log */])('Received printer capabilities.', capabilities);
    return capabilities;
  });
}
function submitPrintJobRTC(file, printerUrl, params) {
  return offnetwork_awaiter(this, void 0, void 0, function* () {
    const serverId = yield Object(offnetworkcache["d" /* getServerIdForPrinter */])(printerUrl);

    if (!serverId) {
      throw new Error(`unknown server id for printer ${printerUrl}`);
    }

    Object(log["b" /* log */])('[OffNetwork:submitPrintJobRTC]', 'serverId', serverId, 'params', Object.assign(Object.assign({}, params), {
      credentials: '[REDACTED]'
    }));
    let client;

    try {
      client = yield getMobRTCClient(serverId);
    } catch (e) {
      Object(log["a" /* error */])('[OffNetwork:submitPrintJobRTC] Cloud Print connection can not be established.', e);
      throw e;
    }

    const shareToken = yield getShareToken(serverId);
    const printToken = yield getOrExchangePrintToken(serverId, shareToken);
    let jobDetails;

    try {
      jobDetails = yield client.sendPrintJobDetails(printToken, printerUrl, params, file.size);
      Object(log["b" /* log */])('[OffNetwork:submitPrintJobRTC] sendPrintJobDetails response', jobDetails);
    } catch (e) {
      Object(log["a" /* error */])('[OffNetwork:submitPrintJobRTC] sendPrintJobDetails failed', e);
      const printTokenCacheID = getPrintTokenCacheID(serverId, shareToken);
      Object(offnetworkcache["a" /* getPrintTokenCache */])().delete(printTokenCacheID);
      throw new Error(`${CLOUD_PRINT_ERR}: ${e}`);
    }

    try {
      yield client.sendPrintJob(file);
    } catch (e) {
      Object(log["a" /* error */])('[OffNetwork:submitPrintJobRTC] sendPrintJob failed', e);
      throw new Error(`${CLOUD_PRINT_ERR}: ${e}`);
    }

    Object(offnetworkcache["h" /* updateLastPrintedTime */])(printerUrl);
    return jobDetails;
  });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(49)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ getUrlBaseOfPrinterUrl; });

// CONCATENATED MODULE: ./src/scripts/printer/printer.ts
function getUrlBaseOfPrinterUrl(printerUrl) {
  return printerUrl.replace(/\/printers\/.*/i, '');
}
// CONCATENATED MODULE: ./src/scripts/printer/index.ts


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ OAuthProviderIDs; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* reexport */ getPrintersFromPrintDeploy; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* reexport */ getPreconfiguredPrintDeployServer; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* reexport */ getPrintDeployClient; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ getPDAuthForMobilityServer; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* reexport */ printDeployStorage; });

// UNUSED EXPORTS: GoogleOpenIDOAuthProvider, toPrintDeployTokenInfo, printDeployOauthProviders, ManagedStorageKeys, PrintDeployAuthMethods

// EXTERNAL MODULE: ./src/scripts/auth.ts
var auth = __webpack_require__(1);

// CONCATENATED MODULE: ./src/scripts/printdeploy/googleauth.ts

class googleauth_GoogleOpenIDOAuthProvider {
  getAccessToken() {
    return Object(auth["f" /* getGoogleAuthInfo */])(true).then(authInfo => {
      return {
        accessToken: authInfo.token
      };
    });
  }

  getUserInfo(oauthToken) {
    return Object(auth["e" /* getGSuiteUserInfo */])(oauthToken.accessToken).then(userInfo => {
      return {
        email: userInfo.email
      };
    });
  }

}
// CONCATENATED MODULE: ./src/scripts/printdeploy/oauth.ts

const OAuthProviderIDs = {
  Google: 'google'
};
function toPrintDeployTokenInfo(session) {
  return {
    authMethod: session.providerID,
    token: session.sessionToken
  };
}
const printDeployOauthProviders = new Map();
printDeployOauthProviders.set(OAuthProviderIDs.Google, new googleauth_GoogleOpenIDOAuthProvider());
// CONCATENATED MODULE: ./src/scripts/http/http.ts
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

function getResponseBody(resp) {
  return __awaiter(this, void 0, void 0, function* () {
    if (resp.ok) {
      return resp.json().then(respBody => respBody);
    }

    throw Error(`request ${resp.url} failed with HTTP ${resp.status} ${resp.statusText}`);
  });
}
// CONCATENATED MODULE: ./src/scripts/http/index.ts

// EXTERNAL MODULE: ./src/scripts/log/index.ts + 3 modules
var log = __webpack_require__(0);

// EXTERNAL MODULE: ./src/scripts/main.ts + 6 modules
var main = __webpack_require__(28);

// EXTERNAL MODULE: ./src/scripts/printer/index.ts + 1 modules
var scripts_printer = __webpack_require__(6);

// EXTERNAL MODULE: ./src/scripts/storage/index.ts + 1 modules
var storage = __webpack_require__(2);

// CONCATENATED MODULE: ./src/scripts/printdeploy/printdeploy.types.ts
const PrintDeployAuthMethods = {
  Username: 'username',
  Google: 'google'
};
// CONCATENATED MODULE: ./src/scripts/printdeploy/client/encryption.ts
const RSA_STRING_MAXLEN = 245;
class ClientEncryptionService {
  constructor(rsaKey, useAuthHeaderEncryption = false) {
    this.rsaKey = rsaKey;
    this.useAuthHeaderEncryption = useAuthHeaderEncryption;
  }

  encryptRequestBody(body) {
    const jsonBodyStr = JSON.stringify(body);

    if (this.rsaKey) {
      return this.encryptLongString(this.rsaKey, jsonBodyStr);
    }

    return jsonBodyStr;
  }

  encryptAuthHeaderValue(headerValue) {
    if (this.useAuthHeaderEncryption && this.rsaKey) {
      const encryptedHeader = this.encryptLongString(this.rsaKey, headerValue);

      if (encryptedHeader) {
        return encryptedHeader;
      }
    }

    return headerValue;
  }

  encryptLongString(rsaKey, str) {
    if (str.length <= RSA_STRING_MAXLEN) {
      return rsaKey.encrypt(str);
    }

    try {
      const pattern = `.{1,${RSA_STRING_MAXLEN}}`;
      return str.match(new RegExp(pattern, 'g')).map(s => rsaKey.encrypt(s)).reduce((acc, encryptedChunk) => acc + ',' + encryptedChunk);
    } catch (e) {
      console.error('encryption failed', e);
      return undefined;
    }
  }

}
// CONCATENATED MODULE: ./src/scripts/printdeploy/client/client.ts
var client_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};





const DEFAULT_PRINT_DEPLOY_HTTPS_PORT = 9174;
const DEFAULT_PRINT_DEPLOY_HTTP_PORT = 9173;
class client_PrintDeployClientBuilder {
  constructor(host) {
    this.useHTTPSEncryption = () => new ClientEncryptionService();

    this.host = host;
  }

  withAccessibleTLSPort(port) {
    this.accessibleTLSPort = port;
    return this;
  }

  withStrictSSL(strictSSL) {
    this.strictSSL = strictSSL;
    return this;
  }

  withOAuthProviders(oauthProviders) {
    this.oauthProviders = oauthProviders;
    return this;
  }

  build() {
    return client_awaiter(this, void 0, void 0, function* () {
      if (!this.oauthProviders) {
        this.oauthProviders = new Map();
      }

      if (this.hasCustomAccessibleTLSPort() || this.strictSSL) {
        const port = this.accessibleTLSPort || DEFAULT_PRINT_DEPLOY_HTTPS_PORT;
        const serverBaseURL = `https://${this.host}:${port}`;
        const client = new client_PDClient(serverBaseURL, this.oauthProviders, this.useHTTPSEncryption());
        return Promise.resolve(client);
      }

      const httpsServerBaseURL = `https://${this.host}:${DEFAULT_PRINT_DEPLOY_HTTPS_PORT}`;
      return fetch(httpsServerBaseURL).then(() => {
        const client = new client_PDClient(httpsServerBaseURL, this.oauthProviders, this.useHTTPSEncryption());
        return Promise.resolve(client);
      }).catch(_ => {
        const httpBaseUrl = `http://${this.host}:${DEFAULT_PRINT_DEPLOY_HTTP_PORT}`;
        return this.useEncryptedHTTP(httpBaseUrl).then(encryptionService => {
          return new client_PDClient(httpBaseUrl, this.oauthProviders, encryptionService);
        });
      });
    });
  }

  useEncryptedHTTP(httpBaseUrl) {
    return client_awaiter(this, void 0, void 0, function* () {
      if (httpBaseUrl.startsWith('https://')) {
        return Promise.reject('only use encrypted HTTP if the target host doesn\'t support HTTPS');
      }

      return Object(auth["g" /* getRsaPublicKey */])(httpBaseUrl).then(rsaKey => client_awaiter(this, void 0, void 0, function* () {
        const useAuthHeaderEncryption = yield this.isAuthHeaderEncryptionSupported(httpBaseUrl);
        return new ClientEncryptionService(rsaKey, useAuthHeaderEncryption);
      }));
    });
  }

  isAuthHeaderEncryptionSupported(httpBaseUrl) {
    return client_awaiter(this, void 0, void 0, function* () {
      return fetch(`${httpBaseUrl}/${PrintDeployPaths.GET_CONFIG}`).then(resp => {
        return resp.status === 200;
      });
    });
  }

  hasCustomAccessibleTLSPort() {
    return this.accessibleTLSPort && this.accessibleTLSPort !== 0 && this.accessibleTLSPort !== DEFAULT_PRINT_DEPLOY_HTTPS_PORT;
  }

}
var PrintDeployPaths;

(function (PrintDeployPaths) {
  PrintDeployPaths["LOGIN"] = "deploy/login";
  PrintDeployPaths["GET_PRINTERS"] = "deploy/printers";
  PrintDeployPaths["GET_CONFIG"] = "deploy/config";
  PrintDeployPaths["CREATE_OAUTH_SESSION"] = "deploy/oauth/session";
})(PrintDeployPaths || (PrintDeployPaths = {}));

const PrintDeployUnauthorizedError = 'Unauthorized';

class client_PDClient {
  constructor(serverBaseURL, oauthProviders, encryptionService) {
    this.encryptionService = encryptionService;
    this.providers = oauthProviders;
    this.serverBaseURL = serverBaseURL;
  }

  login(credentials) {
    return client_awaiter(this, void 0, void 0, function* () {
      const username = credentials.username;
      const password = credentials.password;

      if (!username || !password) {
        return Promise.reject('missing required username/password to get PaperCut token');
      }

      const request = {
        headers: this.generateHeaders(),
        method: 'POST',
        body: this.encryptionService.encryptRequestBody({
          username,
          password
        })
      };
      return fetch(`${this.serverBaseURL}/${PrintDeployPaths.LOGIN}`, request).then(r => getResponseBody(r)).then(body => {
        return {
          authMethod: PrintDeployAuthMethods.Username,
          token: body.Token
        };
      });
    });
  }

  getConfig() {
    return client_awaiter(this, void 0, void 0, function* () {
      const headers = this.generateHeaders();
      return fetch(`${this.serverBaseURL}/${PrintDeployPaths.GET_CONFIG}`, {
        headers
      }).then(r => getResponseBody(r));
    });
  }

  getPrinters(tokenInfo, clientInfo) {
    return client_awaiter(this, void 0, void 0, function* () {
      const fetchPrinters = clientInfo => {
        const headers = this.generateHeaders(tokenInfo);
        const request = {
          headers: headers,
          method: 'POST',
          body: this.encryptionService.encryptRequestBody(clientInfo)
        };
        return fetch(`${this.serverBaseURL}/${PrintDeployPaths.GET_PRINTERS}`, request);
      };

      return fetchPrinters(clientInfo).then(handleInvalidToken).then(resp => getResponseBody(resp)).then(body => body.printers);

      function handleInvalidToken(resp) {
        if (resp.status === 401) {
          return Promise.reject(PrintDeployUnauthorizedError);
        }

        return Promise.resolve(resp);
      }
    });
  }

  createOAuthSession(providerID) {
    return client_awaiter(this, void 0, void 0, function* () {
      const oAuthProvider = this.providers.get(providerID);

      if (!oAuthProvider) {
        console.error('no such provider');
        return Promise.reject(`no registered provider for providerID=${providerID}`);
      }

      const oAuthToken = yield oAuthProvider.getAccessToken();
      const url = `${this.serverBaseURL}/${PrintDeployPaths.CREATE_OAUTH_SESSION}`;
      const reqBody = {
        providerId: providerID,
        accessToken: oAuthToken.accessToken
      };
      return fetch(url, {
        method: 'POST',
        headers: this.generateHeaders(),
        body: this.encryptionService.encryptRequestBody(reqBody)
      }).then(resp => {
        if (resp.status === 403) {
          return Promise.reject('Unknown user');
        }

        return getResponseBody(resp);
      }).then(body => client_awaiter(this, void 0, void 0, function* () {
        const sessionInfo = {
          providerID: providerID,
          username: body.username,
          sessionToken: body.sessionToken,
          oauthToken: oAuthToken,
          email: body.email
        };
        return Promise.resolve(sessionInfo);
      }));
    });
  }

  getServerBaseURL() {
    return this.serverBaseURL;
  }

  generateHeaders(tokenInfo) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    if (tokenInfo) {
      const header = `Bearer ${tokenInfo.token}`;
      headers['Authorization'] = this.encryptionService.encryptAuthHeaderValue(header);

      if (tokenInfo.authMethod !== PrintDeployAuthMethods.Username) {
        headers['PrintDeployAuthenticationType'] = tokenInfo.authMethod;
      }
    }

    return headers;
  }

}
// EXTERNAL MODULE: ./src/scripts/chrome/runtime.ts + 1 modules
var runtime = __webpack_require__(8);

// CONCATENATED MODULE: ./src/scripts/printdeploy/client/clientinfo.ts
var clientinfo_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};


function getClientInfo() {
  return clientinfo_awaiter(this, void 0, void 0, function* () {
    return Promise.all([Object(runtime["b" /* getInstanceId */])(), Object(runtime["d" /* getPlatformInfo */])(), Object(runtime["c" /* getLocalIPAddresses */])()]).then(([instanceId, platformInfo, ipAddresses]) => {
      const chromeOSVersion = Object(runtime["a" /* getChromeOSVersion */])();
      const clientInfo = {
        machine: {
          hostname: instanceId,
          os: {
            name: 'chrome',
            version: chromeOSVersion,
            arch: platformInfo.arch
          },
          ipAddresses: ipAddresses,
          activeDirectoryDomainName: ''
        }
      };
      return clientInfo;
    });
  });
}
// CONCATENATED MODULE: ./src/scripts/printdeploy/client/index.ts



// CONCATENATED MODULE: ./src/scripts/printdeploy/storage.ts
var storage_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};


const OAUTH_SESSION_TOKEN_KEY = 'OauthSession';
const PRINT_DEPLOY_AUTH_REPO = 'printDeployAuthRepo';
const PRINT_DEPLOY_CONFIG_KEY = 'printDeployConfig';
const PAPERCUT_AUTH_KEY = 'papercutAuthCookie';

class storage_PrintDeployLocalStorage {
  getCachedConfig() {
    return storage_awaiter(this, void 0, void 0, function* () {
      return Object(storage["a" /* getLocalStorageData */])(PRINT_DEPLOY_CONFIG_KEY);
    });
  }

  getCachedOAuthSessionToken() {
    return this.getCachedAuthToken(OAUTH_SESSION_TOKEN_KEY);
  }

  getCachedPrintDeployToken() {
    return this.getCachedAuthToken(PAPERCUT_AUTH_KEY);
  }

  getCachedMobilityPrintServerToken(serverBaseUrl) {
    return storage_awaiter(this, void 0, void 0, function* () {
      return this.getCachedAuthToken(serverBaseUrl);
    });
  }

  cacheConfig(config) {
    return storage_awaiter(this, void 0, void 0, function* () {
      return Object(storage["e" /* setLocalStorageData */])(PRINT_DEPLOY_CONFIG_KEY, config);
    });
  }

  cacheMobilityPrintServerToken(serverBaseUrl, token) {
    return storage_awaiter(this, void 0, void 0, function* () {
      return this.cacheAuthToken(serverBaseUrl, token);
    });
  }

  cachePaperCutToken(token) {
    return storage_awaiter(this, void 0, void 0, function* () {
      return this.cacheAuthToken(PAPERCUT_AUTH_KEY, token);
    });
  }

  cacheOAuthSessionToken(sessionToken) {
    return storage_awaiter(this, void 0, void 0, function* () {
      return this.cacheAuthToken(OAUTH_SESSION_TOKEN_KEY, sessionToken);
    });
  }

  removeMobilityPrintServerToken(server) {
    return storage_awaiter(this, void 0, void 0, function* () {
      const authRepo = yield Object(storage["a" /* getLocalStorageData */])(PRINT_DEPLOY_AUTH_REPO);

      if (!authRepo) {
        return Promise.resolve({});
      }

      delete authRepo[server];
      return Object(storage["e" /* setLocalStorageData */])(PRINT_DEPLOY_AUTH_REPO, authRepo);
    });
  }

  cacheAuthToken(key, value) {
    return storage_awaiter(this, void 0, void 0, function* () {
      let authRepo = yield Object(storage["a" /* getLocalStorageData */])(PRINT_DEPLOY_AUTH_REPO);

      if (!authRepo) {
        authRepo = {};
      }

      authRepo[key] = value;
      yield Object(storage["e" /* setLocalStorageData */])(PRINT_DEPLOY_AUTH_REPO, authRepo);
      return Promise.resolve(value);
    });
  }

  getCachedAuthToken(key) {
    return storage_awaiter(this, void 0, void 0, function* () {
      return Object(storage["a" /* getLocalStorageData */])(PRINT_DEPLOY_AUTH_REPO).then(authRepo => {
        if (!authRepo) {
          return undefined;
        }

        return authRepo[key];
      });
    });
  }

  invalidateAllCachedTokens() {
    return Object(storage["e" /* setLocalStorageData */])(PRINT_DEPLOY_AUTH_REPO, {});
  }

}

const printDeployStorage = new storage_PrintDeployLocalStorage();
// CONCATENATED MODULE: ./src/scripts/printdeploy/printdeploy.ts
var printdeploy_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};












var ManagedStorageKeys;

(function (ManagedStorageKeys) {
  ManagedStorageKeys["PrintDeployServerHosts"] = "PrintDeployServerHosts";
  ManagedStorageKeys["AccessiblePrintDeployTLSPort"] = "AccessiblePrintDeployTLSPort";
  ManagedStorageKeys["StrictSSLCheckingEnabled"] = "StrictSSLCheckingEnabled";
})(ManagedStorageKeys || (ManagedStorageKeys = {}));

function getPrintersFromPrintDeploy() {
  return printdeploy_awaiter(this, void 0, void 0, function* () {
    const pdHost = yield getPreconfiguredPrintDeployServer();

    if (!pdHost) {
      Object(log["b" /* log */])('[getPreconfiguredPrintDeployServer] no Print Deploy servers preconfigured');
      return [[], false];
    }

    try {
      Object(log["b" /* log */])('[getPrintersFromPrintDeploy] found Print Deploy server:', pdHost);
      const printers = yield getPrintersFromPrintDeployHost(pdHost);
      return [printers, true];
    } catch (e) {
      Object(log["b" /* log */])('[getPrintersFromPrintDeployHost] failed to get printers:', e);
      return [[], true];
    }
  });
}
function getPreconfiguredPrintDeployServer() {
  return printdeploy_awaiter(this, void 0, void 0, function* () {
    return Object(storage["b" /* getManagedStorageData */])(ManagedStorageKeys.PrintDeployServerHosts).then(hosts => {
      if (!hosts || hosts.length === 0) {
        return null;
      }

      return hosts[0];
    });
  });
}
function getPrintDeployClient(pdHost) {
  return printdeploy_awaiter(this, void 0, void 0, function* () {
    const strictSSLCheckingEnabled = yield Object(storage["b" /* getManagedStorageData */])(ManagedStorageKeys.StrictSSLCheckingEnabled);
    const accessibleTLSPort = yield Object(storage["b" /* getManagedStorageData */])(ManagedStorageKeys.AccessiblePrintDeployTLSPort);
    const pdClient = yield new client_PrintDeployClientBuilder(pdHost).withAccessibleTLSPort(accessibleTLSPort).withStrictSSL(strictSSLCheckingEnabled).withOAuthProviders(printDeployOauthProviders).build();
    Object(log["b" /* log */])(`[printDeployClientBuilder] built PDClient with serverBaseURL=${pdClient.getServerBaseURL()}`);
    return Promise.resolve(pdClient);
  });
}

function getPrintersFromPrintDeployHost(pdHost) {
  return printdeploy_awaiter(this, void 0, void 0, function* () {
    const pdClient = yield getPrintDeployClient(pdHost);
    const clientConfig = yield pdClient.getConfig().catch(_e => undefined);

    if (clientConfig) {
      Object(log["b" /* log */])('[pdClient.getConfig] received config from server:', clientConfig);
      yield printDeployStorage.cacheConfig(clientConfig);
    }

    return getPrintersForClient(pdClient).then(getAndSaveTokensForPrinters).then(mapPrintersForPrintProvider);
  });
}

function getAndSaveTokensForPrinters(printers) {
  return printdeploy_awaiter(this, void 0, void 0, function* () {
    const clientConfig = yield printDeployStorage.getCachedConfig();
    const mpServers = printers.map(printer => {
      return getSecureURLForMPServer(Object(scripts_printer["a" /* getUrlBaseOfPrinterUrl */])(printer.connection.name), clientConfig);
    });
    const uniqueMPServers = Array.from(new Set(mpServers));
    Object(log["b" /* log */])(`[printdeploy.uniqueMPServers] found ${uniqueMPServers.length} unique MP servers from the discovered queues`, uniqueMPServers);
    return Promise.all(uniqueMPServers.map(getMobilityPrintTokenIfMissing)).then(() => printers);

    function getMobilityPrintTokenIfMissing(mpServerURL) {
      return printdeploy_awaiter(this, void 0, void 0, function* () {
        return printDeployStorage.getCachedMobilityPrintServerToken(mpServerURL).then(token => token ? token : fetchTokenFromMobilityPrintServer(mpServerURL, auth["h" /* inMemoryCreds */])).then(token => {
          return auth["h" /* inMemoryCreds */].rememberMe ? printDeployStorage.cacheMobilityPrintServerToken(mpServerURL, token) : token;
        }).catch(e => {
          Object(log["b" /* log */])(`[getMobilityPrintToken] failed to get token for MP server ${mpServerURL} via HTTPS. This may happen ` + 'if the MP server isn\'t using a non-zero length CA-signed certificate. We will use encrypted HTTP ' + 'instead. error:', e.message || e);
          return null;
        });
      });
    }
  });
}

function getSecureURLForMPServer(mpServerURL, config) {
  const server = mpServerURL.replace(/http:/gi, 'https:');
  let tlsPort = config === null || config === void 0 ? void 0 : config.AccessibleMobilityPrintTLSPort;

  if (!tlsPort || tlsPort == 0) {
    tlsPort = 9164;
  }

  return server.replace(/:9163/gi, `:${tlsPort}`);
}

function getPrintersForClient(pdClient) {
  return printdeploy_awaiter(this, void 0, void 0, function* () {
    const fetchPrinters = () => {
      return getPrintDeployToken(pdClient).then(tokenInfo => {
        return getClientInfo().then(clientInfo => {
          Object(log["b" /* log */])(`[getPrinters] getting printers with the following user details: ${JSON.stringify(clientInfo)}`);
          return pdClient.getPrinters(tokenInfo, clientInfo);
        });
      });
    };

    return fetchPrinters().catch(e => {
      if (e === PrintDeployUnauthorizedError) {
        return printDeployStorage.invalidateAllCachedTokens().then(() => fetchPrinters());
      }

      return Promise.reject(e);
    });
  });
}

function getPrintDeployToken(pdClient) {
  return printdeploy_awaiter(this, void 0, void 0, function* () {
    const usernameToken = yield printDeployStorage.getCachedPrintDeployToken();

    if (usernameToken) {
      return {
        authMethod: PrintDeployAuthMethods.Username,
        token: usernameToken
      };
    }

    const oauthSessionCreds = yield printDeployStorage.getCachedOAuthSessionToken();

    if (oauthSessionCreds) {
      return toPrintDeployTokenInfo(oauthSessionCreds);
    }

    const handleMissingPaperCutToken = () => {
      if (Object(auth["i" /* inMemoryCredsAvailable */])()) {
        return pdClient.login(auth["h" /* inMemoryCreds */]).catch(() => askUserToAuthenticateForPrintDeploy(pdClient));
      }

      return askUserToAuthenticateForPrintDeploy(pdClient);
    };

    return handleMissingPaperCutToken();
  });
}

function fetchTokenFromMobilityPrintServer(mpServerBaseUrl, credentials) {
  return printdeploy_awaiter(this, void 0, void 0, function* () {
    const {
      username,
      password
    } = credentials;

    if (!username || !password) {
      return Promise.reject('missing required username/password to get token from Mobility Print server');
    }

    if (mpServerBaseUrl.startsWith('http:')) {
      return Promise.reject('cannot get token from MP server using non-HTTPS URL');
    }

    const authUrl = `${mpServerBaseUrl}/token?printerName=none`;
    const requestParams = {
      headers: {
        Authorization: `Basic ${btoa(username + ':' + password)}`
      },
      method: 'GET'
    };
    return fetch(authUrl, requestParams).then(resp => getResponseBody(resp)).then(body => body.token);
  });
}

function askUserToAuthenticateForPrintDeploy(pdClient) {
  return printdeploy_awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, _reject) => printdeploy_awaiter(this, void 0, void 0, function* () {
      const onCredentialsEntered = evt => {
        Object(auth["k" /* rememberCredsInMemory */])(evt.credentials);
        pdClient.login(evt.credentials).then(tokenInfo => printdeploy_awaiter(this, void 0, void 0, function* () {
          if (evt.credentials.rememberMe) {
            yield printDeployStorage.cachePaperCutToken(tokenInfo.token);
          }

          resolve(tokenInfo);
          evt.onFinish();
        })).catch(e => printdeploy_awaiter(this, void 0, void 0, function* () {
          if (e === PrintDeployUnauthorizedError) {
            yield printDeployStorage.invalidateAllCachedTokens();
          }

          return resolveErrorForUser(e).catch(evt.onDisplayError);
        }));
      };

      const onOAuthSessionCreated = evt => printdeploy_awaiter(this, void 0, void 0, function* () {
        var _a;

        Object(auth["k" /* rememberCredsInMemory */])(Object.assign(Object.assign({}, auth["h" /* inMemoryCreds */]), {
          rememberMe: evt.rememberMe
        }));

        if (evt.rememberMe) {
          yield printDeployStorage.cacheOAuthSessionToken(evt.sessionCreds);
        }

        (_a = evt.onFinish) === null || _a === void 0 ? void 0 : _a.call(evt);
        resolve(toPrintDeployTokenInfo(evt.sessionCreds));
      });

      yield showLoginWindow(onCredentialsEntered, onOAuthSessionCreated);
    }));
  });
}

function showLoginWindow(onCredentialsEntered, onOAuthSessionCreated) {
  return printdeploy_awaiter(this, void 0, void 0, function* () {
    let hasAuthenticated = false;

    const onClose = () => {
      if (!hasAuthenticated) {
        throw new Error('user closed the login window without authenticating');
      }
    };

    const config = yield printDeployStorage.getCachedConfig();
    const showGoogleLogin = config && config.AuthMethods.includes(PrintDeployAuthMethods.Google);

    const wrapHandler = handler => {
      return evt => {
        hasAuthenticated = true;
        handler === null || handler === void 0 ? void 0 : handler(evt);
      };
    };

    Object(main["displayLoginWindow"])({
      onClose,
      onCredentialsEntered: wrapHandler(onCredentialsEntered),
      onOAuthSessionCreated: wrapHandler(onOAuthSessionCreated),
      showRememberMe: true,
      showGoogleLogin,
      usePrintDeploy: true
    });
  });
}

function mapPrintersForPrintProvider(printers) {
  return printers.map(({
    name,
    connection
  }) => {
    const displayName = getNormalisedName(name);
    return {
      id: `${connection.name}/printers/${encodeURI(displayName)}`,
      name: displayName,
      description: name,
      authMode: 'per-server',
      capabilities: undefined
    };
  });
}

function getNormalisedName(mpPrinterName) {
  const regex = /(.*)\[.*\]\(Mobility\)$/gm;

  if (!regex.test(mpPrinterName)) {
    return mpPrinterName;
  }

  return mpPrinterName.substring(0, mpPrinterName.lastIndexOf('[')).trim();
}

function resolveErrorForUser(e) {
  if (e.message) {
    if (e.message.includes('HTTP 401')) {
      return Promise.reject('Invalid username and password');
    } else if (e.message.includes('HTTP 500')) {
      return Promise.reject('An internal server error occurred');
    } else if (e.message.includes('Failed to fetch')) {
      return Promise.reject('Connection failed');
    }
  }

  return Promise.reject('Unknown error.');
}

function getPDAuthForMobilityServer(mpServer) {
  return printdeploy_awaiter(this, void 0, void 0, function* () {
    const cachedToken = yield printDeployStorage.getCachedMobilityPrintServerToken(mpServer);

    if (cachedToken) {
      Object(log["b" /* log */])(`[getPrintDeployAuth] found cached token for ${mpServer}`);
      return Promise.resolve({
        token: cachedToken
      });
    }

    return handleMissingToken().catch(_e => {
      Object(log["b" /* log */])(`[getPrintDeployAuth] did not find any cached tokens or credentials for MP server "${mpServer}. asking ` + 'user to authenticate..."');
      return askUserToAuthenticateForMPServer(mpServer);
    });

    function handleMissingToken() {
      return printdeploy_awaiter(this, void 0, void 0, function* () {
        const oauthSession = yield printDeployStorage.getCachedOAuthSessionToken();

        if (oauthSession && oauthSession.providerID === OAuthProviderIDs.Google) {
          return Object(auth["b" /* authenticateWithGSuitePD */])(mpServer, false).then(encryptedCreds => {
            Object(log["b" /* log */])(`[getPrintDeployAuth] generated encrypted oauth credentials for ${oauthSession.providerID}`);
            return {
              encryptedCreds,
              authOption: OAuthProviderIDs.Google
            };
          });
        }

        if (Object(auth["i" /* inMemoryCredsAvailable */])()) {
          return Object(auth["d" /* encryptCredentials */])(mpServer, auth["h" /* inMemoryCreds */].username, auth["h" /* inMemoryCreds */].password).then(encryptedCreds => {
            Object(log["b" /* log */])('[getPrintDeployAuth] generated encrypted basic credentials');
            return {
              encryptedCreds
            };
          });
        }

        return Promise.reject(PrintDeployUnauthorizedError);
      });
    }
  });
}

function askUserToAuthenticateForMPServer(mpServer) {
  return new Promise((resolve, reject) => printdeploy_awaiter(this, void 0, void 0, function* () {
    const onCredentialsEntered = evt => {
      Object(auth["k" /* rememberCredsInMemory */])(evt.credentials);
      Object(auth["d" /* encryptCredentials */])(mpServer, auth["h" /* inMemoryCreds */].username, auth["h" /* inMemoryCreds */].password).then(encryptedCreds => {
        evt === null || evt === void 0 ? void 0 : evt.onFinish();
        resolve({
          encryptedCreds
        });
      }).catch(e => reject(e));
    };

    const onOAuthSessionCreated = evt => printdeploy_awaiter(this, void 0, void 0, function* () {
      var _a;

      Object(auth["k" /* rememberCredsInMemory */])(Object.assign(Object.assign({}, auth["h" /* inMemoryCreds */]), {
        rememberMe: evt.rememberMe
      }));

      if (evt.rememberMe) {
        yield printDeployStorage.cacheOAuthSessionToken(evt.sessionCreds);
      }

      (_a = evt.onFinish) === null || _a === void 0 ? void 0 : _a.call(evt);
      resolve({
        token: evt.sessionCreds.oauthToken.accessToken,
        authOption: OAuthProviderIDs.Google
      });
    });

    yield showLoginWindow(onCredentialsEntered, onOAuthSessionCreated);
  }));
}
// CONCATENATED MODULE: ./src/scripts/printdeploy/index.ts






/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ getLocalIPAddresses; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ getChromeOSVersion; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ getPlatformInfo; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ getInstanceId; });

// EXTERNAL MODULE: ./src/scripts/knownhost/knownhost.ts
var knownhost = __webpack_require__(16);

// CONCATENATED MODULE: ./src/scripts/knownhost/index.ts

// EXTERNAL MODULE: ./src/scripts/log/index.ts + 3 modules
var log = __webpack_require__(0);

// CONCATENATED MODULE: ./src/scripts/chrome/runtime.ts
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};



function getLocalIPAddresses() {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise(resolve => {
      chrome.system.network.getNetworkInterfaces(interfaces => {
        const localIPAddresses = interfaces.map(i => i.address).filter(knownhost["b" /* isIpV4 */]);
        Object(log["b" /* log */])('[localIPAddresses] detected: ', localIPAddresses);
        resolve(localIPAddresses);
      });
    });
  });
}
function getChromeOSVersion() {
  const versionString = navigator.userAgent.match(/Chrome\/(\S+)/);

  if (Array.isArray(versionString) && versionString.length === 2) {
    return versionString[1];
  }

  return 'unknown';
}
function getPlatformInfo() {
  return new Promise(resolve => {
    chrome.runtime.getPlatformInfo(platformInfo => {
      resolve(platformInfo);
    });
  });
}
function getInstanceId() {
  return new Promise(resolve => {
    chrome.instanceID.getID(id => {
      resolve(id);
    });
  });
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(13);

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var shared = __webpack_require__(29);
var has = __webpack_require__(9);
var uid = __webpack_require__(35);
var NATIVE_SYMBOL = __webpack_require__(36);
var USE_SYMBOL_AS_UID = __webpack_require__(51);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(31);
var anObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(33);

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addProtocolAndPortIfNeeded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isIpV4; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);

function addProtocolAndPortIfNeeded(value) {
  let processedAddress = value;
  const schemeSplit = value.split('://');
  const hasScheme = /^http[s]?$/.test(schemeSplit[0]) && schemeSplit.length > 1;
  const portSplit = value.split(':');
  const hasPort = portSplit.length > 1 && /^\d{1,5}$/.test(portSplit.pop());

  if (!hasScheme) {
    console.log('[KnownHost:addProtocolAndPortIfNeeded] adding scheme for:', value);
    processedAddress = `${_constants__WEBPACK_IMPORTED_MODULE_0__[/* MOBILITY_PRINT_SERVER_DEFAULT_PROTOCOL */ "b"]}://${processedAddress}`;
  }

  if (!hasPort) {
    console.log('[KnownHost:addProtocolAndPortIfNeeded] adding port for:', value);
    processedAddress = `${processedAddress}:${_constants__WEBPACK_IMPORTED_MODULE_0__[/* MOBILITY_PRINT_SERVER_DEFAULT_PORT */ "a"]}`;
  }

  return processedAddress;
}
function isIpV4(value) {
  return !!value.match(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/gim);
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createPrinterCapabilities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return parseMobilityPrintCapabilities; });
const defaultColorOptions = [{
  type: "STANDARD_COLOR",
  is_default: true
}, {
  type: "STANDARD_MONOCHROME"
}];
const defaultDuplexOptions = [{
  type: "NO_DUPLEX",
  is_default: true
}, {
  type: "LONG_EDGE"
}, {
  type: "SHORT_EDGE"
}];
const defaultPaperSize = "A4";
const defaultMediaSizes = [{
  name: "ISO_A0",
  width_microns: 841000,
  height_microns: 1189000,
  is_default: false,
  custom_display_name: "A0"
}, {
  name: "ISO_A1",
  width_microns: 594000,
  height_microns: 841000,
  is_default: false,
  custom_display_name: "A1"
}, {
  name: "ISO_A2",
  width_microns: 420000,
  height_microns: 594000,
  is_default: false,
  custom_display_name: "A2"
}, {
  name: "ISO_A3",
  width_microns: 297000,
  height_microns: 420000,
  is_default: false,
  custom_display_name: "A3"
}, {
  name: "ISO_A4",
  width_microns: 210000,
  height_microns: 297000,
  is_default: "A4" === defaultPaperSize.toUpperCase(),
  custom_display_name: "A4"
}, {
  name: "ISO_A5",
  width_microns: 148000,
  height_microns: 210000,
  is_default: false,
  custom_display_name: "A5"
}, {
  name: "ISO_A6",
  width_microns: 105000,
  height_microns: 148000,
  is_default: false,
  custom_display_name: "A6"
}, {
  name: "ISO_A7",
  width_microns: 74000,
  height_microns: 105000,
  is_default: false,
  custom_display_name: "A7"
}, {
  name: "ISO_A8",
  width_microns: 52000,
  height_microns: 74000,
  is_default: false,
  custom_display_name: "A8"
}, {
  name: "ISO_A9",
  width_microns: 37000,
  height_microns: 52000,
  is_default: false,
  custom_display_name: "A9"
}, {
  name: "ISO_A10",
  width_microns: 26000,
  height_microns: 37000,
  is_default: false,
  custom_display_name: "A10"
}, {
  name: "JIS_B0",
  width_microns: 1030000,
  height_microns: 1456000,
  is_default: false,
  custom_display_name: "JIS B0"
}, {
  name: "JIS_B1",
  width_microns: 728000,
  height_microns: 1030000,
  is_default: false,
  custom_display_name: "JIS B1"
}, {
  name: "JIS_B2",
  width_microns: 515000,
  height_microns: 728000,
  is_default: false,
  custom_display_name: "JIS B2"
}, {
  name: "JIS_B3",
  width_microns: 364000,
  height_microns: 515000,
  is_default: false,
  custom_display_name: "JIS B3"
}, {
  name: "JIS_B4",
  width_microns: 257000,
  height_microns: 364000,
  is_default: false,
  custom_display_name: "JIS B4"
}, {
  name: "JIS_B5",
  width_microns: 182000,
  height_microns: 257000,
  is_default: false,
  custom_display_name: "JIS B5"
}, {
  name: "JIS_B6",
  width_microns: 128000,
  height_microns: 182000,
  is_default: false,
  custom_display_name: "JIS B6"
}, {
  name: "JIS_B7",
  width_microns: 91000,
  height_microns: 128000,
  is_default: false,
  custom_display_name: "JIS B7"
}, {
  name: "JIS_B8",
  width_microns: 64000,
  height_microns: 91000,
  is_default: false,
  custom_display_name: "JIS B8"
}, {
  name: "JIS_B9",
  width_microns: 45000,
  height_microns: 64000,
  is_default: false,
  custom_display_name: "JIS B9"
}, {
  name: "JIS_B10",
  width_microns: 32000,
  height_microns: 45000,
  is_default: false,
  custom_display_name: "JIS B10"
}, {
  name: "ISO_B0",
  width_microns: 1000000,
  height_microns: 1414000,
  is_default: false,
  custom_display_name: "ISO B0"
}, {
  name: "ISO_B1",
  width_microns: 707000,
  height_microns: 1000000,
  is_default: false,
  custom_display_name: "ISO B1"
}, {
  name: "ISO_B2",
  width_microns: 500000,
  height_microns: 707000,
  is_default: false,
  custom_display_name: "ISO B2"
}, {
  name: "ISO_B3",
  width_microns: 353000,
  height_microns: 500000,
  is_default: false,
  custom_display_name: "ISO B3"
}, {
  name: "ISO_B4",
  width_microns: 250000,
  height_microns: 353000,
  is_default: false,
  custom_display_name: "ISO B4"
}, {
  name: "ISO_B5",
  width_microns: 176000,
  height_microns: 250000,
  is_default: false,
  custom_display_name: "ISO B5"
}, {
  name: "ISO_B6",
  width_microns: 125000,
  height_microns: 176000,
  is_default: false,
  custom_display_name: "ISO B6"
}, {
  name: "ISO_B7",
  width_microns: 88000,
  height_microns: 125000,
  is_default: false,
  custom_display_name: "ISO B7"
}, {
  name: "ISO_B8",
  width_microns: 62000,
  height_microns: 88000,
  is_default: false,
  custom_display_name: "ISO B8"
}, {
  name: "ISO_B9",
  width_microns: 44000,
  height_microns: 62000,
  is_default: false,
  custom_display_name: "ISO B9"
}, {
  name: "ISO_B10",
  width_microns: 31000,
  height_microns: 44000,
  is_default: false,
  custom_display_name: "ISO B10"
}, {
  name: "NA_LETTER",
  width_microns: 215900,
  height_microns: 279400,
  is_default: false,
  custom_display_name: "Letter"
}, {
  name: "NA_LEGAL",
  width_microns: 215900,
  height_microns: 355600,
  is_default: false,
  custom_display_name: "Legal"
}, {
  name: "NA_5X7",
  width_microns: 127000,
  height_microns: 177800,
  is_default: false,
  custom_display_name: "5X7"
}, {
  name: "NA_EXECUTIVE",
  width_microns: 184150,
  height_microns: 266700,
  is_default: false,
  custom_display_name: "Executive"
}, {
  name: "NA_INVOICE",
  width_microns: 139700,
  height_microns: 215900,
  is_default: false,
  custom_display_name: "Invoice"
}, {
  name: "NA_LEDGER",
  width_microns: 279400,
  height_microns: 431800,
  is_default: false,
  custom_display_name: "Ledger"
}];
function createPrinterCapabilities(colorOptions = defaultColorOptions, duplexOptions = defaultDuplexOptions, mediaSizes = defaultMediaSizes) {
  return {
    version: '1.0',
    printer: {
      supported_content_type: [{
        content_type: 'application/pdf'
      }],
      color: {
        option: colorOptions
      },
      duplex: {
        option: duplexOptions
      },
      page_orientation: {
        option: [{
          type: 'PORTRAIT',
          is_default: true
        }, {
          type: 'LANDSCAPE',
          is_default: false
        }, {
          type: 'AUTO',
          is_default: false
        }]
      },
      copies: {
        default: 1,
        max: 100
      },
      media_size: {
        option: mediaSizes
      }
    }
  };
}
function parseMobilityPrintCapabilities(capabilities) {
  const mediaSizes = capabilities.mediaSizes.map(m => ({
    name: 'CUSTOM',
    width_microns: m.widthMicrons,
    height_microns: m.heightMicrons,
    is_default: m.isDefault,
    custom_display_name: m.customDisplayName || m.name
  }));

  if (mediaSizes.length > 0 && mediaSizes.every(function (m) {
    return !m.is_default;
  })) {
    mediaSizes[0].is_default = true;
  }

  const colorOptions = capabilities.color.map(function (n) {
    return {
      type: n
    };
  });

  if (colorOptions.length > 0) {
    colorOptions[0]['is_default'] = true;
  }

  const duplexOptions = capabilities.duplex.map(function (n) {
    return {
      type: n
    };
  });

  if (duplexOptions.length > 0) {
    duplexOptions[0]['is_default'] = true;
  }

  return createPrinterCapabilities(colorOptions, duplexOptions, mediaSizes);
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MOBILITY_PRINT_SERVER_DEFAULT_PORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MOBILITY_PRINT_SERVER_DEFAULT_PROTOCOL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return dnsUrls; });
const MOBILITY_PRINT_SERVER_DEFAULT_PORT = 9163;
const MOBILITY_PRINT_SERVER_DEFAULT_PROTOCOL = 'http';
const dns = [];
const DNS_DEFAULT_ZONE_NAME = 'pc-printer-discovery';
const DNS_MAX_SERVERS = 20;
dns.push(MOBILITY_PRINT_SERVER_DEFAULT_PROTOCOL + '://rpc.' + DNS_DEFAULT_ZONE_NAME + ':' + MOBILITY_PRINT_SERVER_DEFAULT_PORT);

for (let i = 0; i < DNS_MAX_SERVERS; i++) {
  dns.push(MOBILITY_PRINT_SERVER_DEFAULT_PROTOCOL + '://rpc.' + DNS_DEFAULT_ZONE_NAME + '-' + (i + 1) + ':' + MOBILITY_PRINT_SERVER_DEFAULT_PORT);
}

dns.push(MOBILITY_PRINT_SERVER_DEFAULT_PROTOCOL + '://localhost:' + MOBILITY_PRINT_SERVER_DEFAULT_PORT);
const dnsUrls = dns;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/*! MIT License. Copyright 2015-2018 Richard Moore <me@ricmoo.com>. See LICENSE.txt. */
(function(root) {
  "use strict";

  function checkInt(value) {
    return (parseInt(value) === value);
  }

  function checkInts(arrayish) {
    if (!checkInt(arrayish.length)) { return false; }

    for (var i = 0; i < arrayish.length; i++) {
      if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
        return false;
      }
    }

    return true;
  }

  function coerceArray(arg, copy) {

    // ArrayBuffer view
    if (arg.buffer && arg.name === 'Uint8Array') {

      if (copy) {
        if (arg.slice) {
          arg = arg.slice();
        } else {
          arg = Array.prototype.slice.call(arg);
        }
      }

      return arg;
    }

    // It's an array; check it is a valid representation of a byte
    if (Array.isArray(arg)) {
      if (!checkInts(arg)) {
        throw new Error('Array contains invalid value: ' + arg);
      }

      return new Uint8Array(arg);
    }

    // Something else, but behaves like an array (maybe a Buffer? Arguments?)
    if (checkInt(arg.length) && checkInts(arg)) {
      return new Uint8Array(arg);
    }

    throw new Error('unsupported array-like object');
  }

  function createArray(length) {
    return new Uint8Array(length);
  }

  function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
    if (sourceStart != null || sourceEnd != null) {
      if (sourceArray.slice) {
        sourceArray = sourceArray.slice(sourceStart, sourceEnd);
      } else {
        sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
      }
    }
    targetArray.set(sourceArray, targetStart);
  }



  var convertUtf8 = (function() {
    function toBytes(text) {
      var result = [], i = 0;
      text = encodeURI(text);
      while (i < text.length) {
        var c = text.charCodeAt(i++);

        // if it is a % sign, encode the following 2 bytes as a hex value
        if (c === 37) {
          result.push(parseInt(text.substr(i, 2), 16))
          i += 2;

          // otherwise, just the actual byte
        } else {
          result.push(c)
        }
      }

      return coerceArray(result);
    }

    function fromBytes(bytes) {
      var result = [], i = 0;

      while (i < bytes.length) {
        var c = bytes[i];

        if (c < 128) {
          result.push(String.fromCharCode(c));
          i++;
        } else if (c > 191 && c < 224) {
          result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f)));
          i += 2;
        } else {
          result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)));
          i += 3;
        }
      }

      return result.join('');
    }

    return {
      toBytes: toBytes,
      fromBytes: fromBytes,
    }
  })();

  var convertHex = (function() {
    function toBytes(text) {
      var result = [];
      for (var i = 0; i < text.length; i += 2) {
        result.push(parseInt(text.substr(i, 2), 16));
      }

      return result;
    }

    // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html
    var Hex = '0123456789abcdef';

    function fromBytes(bytes) {
      var result = [];
      for (var i = 0; i < bytes.length; i++) {
        var v = bytes[i];
        result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
      }
      return result.join('');
    }

    return {
      toBytes: toBytes,
      fromBytes: fromBytes,
    }
  })();


  // Number of rounds by keysize
  var numberOfRounds = {16: 10, 24: 12, 32: 14}

  // Round constant words
  var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];

  // S-box and Inverse S-box (S is for Substitution)
  var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
  var Si =[0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];

  // Transformations for encryption
  var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
  var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
  var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
  var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c];

  // Transformations for decryption
  var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
  var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
  var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
  var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0];

  // Transformations for decryption key expansion
  var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
  var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
  var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
  var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];

  function convertToInt32(bytes) {
    var result = [];
    for (var i = 0; i < bytes.length; i += 4) {
      result.push(
        (bytes[i    ] << 24) |
        (bytes[i + 1] << 16) |
        (bytes[i + 2] <<  8) |
        bytes[i + 3]
      );
    }
    return result;
  }

  var AES = function(key) {
    if (!(this instanceof AES)) {
      throw Error('AES must be instanitated with `new`');
    }

    Object.defineProperty(this, 'key', {
      value: coerceArray(key, true)
    });

    this._prepare();
  }


  AES.prototype._prepare = function() {

    var rounds = numberOfRounds[this.key.length];
    if (rounds == null) {
      throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
    }

    // encryption round keys
    this._Ke = [];

    // decryption round keys
    this._Kd = [];

    for (var i = 0; i <= rounds; i++) {
      this._Ke.push([0, 0, 0, 0]);
      this._Kd.push([0, 0, 0, 0]);
    }

    var roundKeyCount = (rounds + 1) * 4;
    var KC = this.key.length / 4;

    // convert the key into ints
    var tk = convertToInt32(this.key);

    // copy values into round key arrays
    var index;
    for (var i = 0; i < KC; i++) {
      index = i >> 2;
      this._Ke[index][i % 4] = tk[i];
      this._Kd[rounds - index][i % 4] = tk[i];
    }

    // key expansion (fips-197 section 5.2)
    var rconpointer = 0;
    var t = KC, tt;
    while (t < roundKeyCount) {
      tt = tk[KC - 1];
      tk[0] ^= ((S[(tt >> 16) & 0xFF] << 24) ^
        (S[(tt >>  8) & 0xFF] << 16) ^
        (S[ tt        & 0xFF] <<  8) ^
        S[(tt >> 24) & 0xFF]        ^
        (rcon[rconpointer] << 24));
      rconpointer += 1;

      // key expansion (for non-256 bit)
      if (KC != 8) {
        for (var i = 1; i < KC; i++) {
          tk[i] ^= tk[i - 1];
        }

        // key expansion for 256-bit keys is "slightly different" (fips-197)
      } else {
        for (var i = 1; i < (KC / 2); i++) {
          tk[i] ^= tk[i - 1];
        }
        tt = tk[(KC / 2) - 1];

        tk[KC / 2] ^= (S[ tt        & 0xFF]        ^
          (S[(tt >>  8) & 0xFF] <<  8) ^
          (S[(tt >> 16) & 0xFF] << 16) ^
          (S[(tt >> 24) & 0xFF] << 24));

        for (var i = (KC / 2) + 1; i < KC; i++) {
          tk[i] ^= tk[i - 1];
        }
      }

      // copy values into round key arrays
      var i = 0, r, c;
      while (i < KC && t < roundKeyCount) {
        r = t >> 2;
        c = t % 4;
        this._Ke[r][c] = tk[i];
        this._Kd[rounds - r][c] = tk[i++];
        t++;
      }
    }

    // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
    for (var r = 1; r < rounds; r++) {
      for (var c = 0; c < 4; c++) {
        tt = this._Kd[r][c];
        this._Kd[r][c] = (U1[(tt >> 24) & 0xFF] ^
          U2[(tt >> 16) & 0xFF] ^
          U3[(tt >>  8) & 0xFF] ^
          U4[ tt        & 0xFF]);
      }
    }
  }

  AES.prototype.encrypt = function(plaintext) {
    if (plaintext.length != 16) {
      throw new Error('invalid plaintext size (must be 16 bytes)');
    }

    var rounds = this._Ke.length - 1;
    var a = [0, 0, 0, 0];

    // convert plaintext to (ints ^ key)
    var t = convertToInt32(plaintext);
    for (var i = 0; i < 4; i++) {
      t[i] ^= this._Ke[0][i];
    }

    // apply round transforms
    for (var r = 1; r < rounds; r++) {
      for (var i = 0; i < 4; i++) {
        a[i] = (T1[(t[ i         ] >> 24) & 0xff] ^
          T2[(t[(i + 1) % 4] >> 16) & 0xff] ^
          T3[(t[(i + 2) % 4] >>  8) & 0xff] ^
          T4[ t[(i + 3) % 4]        & 0xff] ^
          this._Ke[r][i]);
      }
      t = a.slice();
    }

    // the last round is special
    var result = createArray(16), tt;
    for (var i = 0; i < 4; i++) {
      tt = this._Ke[rounds][i];
      result[4 * i    ] = (S[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
      result[4 * i + 1] = (S[(t[(i + 1) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
      result[4 * i + 2] = (S[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
      result[4 * i + 3] = (S[ t[(i + 3) % 4]        & 0xff] ^  tt       ) & 0xff;
    }

    return result;
  }

  AES.prototype.decrypt = function(ciphertext) {
    if (ciphertext.length != 16) {
      throw new Error('invalid ciphertext size (must be 16 bytes)');
    }

    var rounds = this._Kd.length - 1;
    var a = [0, 0, 0, 0];

    // convert plaintext to (ints ^ key)
    var t = convertToInt32(ciphertext);
    for (var i = 0; i < 4; i++) {
      t[i] ^= this._Kd[0][i];
    }

    // apply round transforms
    for (var r = 1; r < rounds; r++) {
      for (var i = 0; i < 4; i++) {
        a[i] = (T5[(t[ i          ] >> 24) & 0xff] ^
          T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
          T7[(t[(i + 2) % 4] >>  8) & 0xff] ^
          T8[ t[(i + 1) % 4]        & 0xff] ^
          this._Kd[r][i]);
      }
      t = a.slice();
    }

    // the last round is special
    var result = createArray(16), tt;
    for (var i = 0; i < 4; i++) {
      tt = this._Kd[rounds][i];
      result[4 * i    ] = (Si[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
      result[4 * i + 1] = (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
      result[4 * i + 2] = (Si[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
      result[4 * i + 3] = (Si[ t[(i + 1) % 4]        & 0xff] ^  tt       ) & 0xff;
    }

    return result;
  }


  /**
   *  Mode Of Operation - Electonic Codebook (ECB)
   */
  var ModeOfOperationECB = function(key) {
    if (!(this instanceof ModeOfOperationECB)) {
      throw Error('AES must be instanitated with `new`');
    }

    this.description = "Electronic Code Block";
    this.name = "ecb";

    this._aes = new AES(key);
  }

  ModeOfOperationECB.prototype.encrypt = function(plaintext) {
    plaintext = coerceArray(plaintext);

    if ((plaintext.length % 16) !== 0) {
      throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
    }

    var ciphertext = createArray(plaintext.length);
    var block = createArray(16);

    for (var i = 0; i < plaintext.length; i += 16) {
      copyArray(plaintext, block, 0, i, i + 16);
      block = this._aes.encrypt(block);
      copyArray(block, ciphertext, i);
    }

    return ciphertext;
  }

  ModeOfOperationECB.prototype.decrypt = function(ciphertext) {
    ciphertext = coerceArray(ciphertext);

    if ((ciphertext.length % 16) !== 0) {
      throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
    }

    var plaintext = createArray(ciphertext.length);
    var block = createArray(16);

    for (var i = 0; i < ciphertext.length; i += 16) {
      copyArray(ciphertext, block, 0, i, i + 16);
      block = this._aes.decrypt(block);
      copyArray(block, plaintext, i);
    }

    return plaintext;
  }


  /**
   *  Mode Of Operation - Cipher Block Chaining (CBC)
   */
  var ModeOfOperationCBC = function(key, iv) {
    if (!(this instanceof ModeOfOperationCBC)) {
      throw Error('AES must be instanitated with `new`');
    }

    this.description = "Cipher Block Chaining";
    this.name = "cbc";

    if (!iv) {
      iv = createArray(16);

    } else if (iv.length != 16) {
      throw new Error('invalid initialation vector size (must be 16 bytes)');
    }

    this._lastCipherblock = coerceArray(iv, true);

    this._aes = new AES(key);
  }

  ModeOfOperationCBC.prototype.encrypt = function(plaintext) {
    plaintext = coerceArray(plaintext);

    if ((plaintext.length % 16) !== 0) {
      throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
    }

    var ciphertext = createArray(plaintext.length);
    var block = createArray(16);

    for (var i = 0; i < plaintext.length; i += 16) {
      copyArray(plaintext, block, 0, i, i + 16);

      for (var j = 0; j < 16; j++) {
        block[j] ^= this._lastCipherblock[j];
      }

      this._lastCipherblock = this._aes.encrypt(block);
      copyArray(this._lastCipherblock, ciphertext, i);
    }

    return ciphertext;
  }

  ModeOfOperationCBC.prototype.decrypt = function(ciphertext) {
    ciphertext = coerceArray(ciphertext);

    if ((ciphertext.length % 16) !== 0) {
      throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
    }

    var plaintext = createArray(ciphertext.length);
    var block = createArray(16);

    for (var i = 0; i < ciphertext.length; i += 16) {
      copyArray(ciphertext, block, 0, i, i + 16);
      block = this._aes.decrypt(block);

      for (var j = 0; j < 16; j++) {
        plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
      }

      copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
    }

    return plaintext;
  }


  /**
   *  Mode Of Operation - Cipher Feedback (CFB)
   */
  var ModeOfOperationCFB = function(key, iv, segmentSize) {
    if (!(this instanceof ModeOfOperationCFB)) {
      throw Error('AES must be instanitated with `new`');
    }

    this.description = "Cipher Feedback";
    this.name = "cfb";

    if (!iv) {
      iv = createArray(16);

    } else if (iv.length != 16) {
      throw new Error('invalid initialation vector size (must be 16 size)');
    }

    if (!segmentSize) { segmentSize = 1; }

    this.segmentSize = segmentSize;

    this._shiftRegister = coerceArray(iv, true);

    this._aes = new AES(key);
  }

  ModeOfOperationCFB.prototype.encrypt = function(plaintext) {
    //console.log('plaintext.length', plaintext.length);
    //console.log('this.segmentSize', this.segmentSize);
    //console.log('plaintext.length % this.segmentSize = ', plaintext.length % this.segmentSize);
    if ((plaintext.length % this.segmentSize) != 0) {
      throw new Error('invalid plaintext size (must be segmentSize bytes)');
    }

    var encrypted = coerceArray(plaintext, true);

    var xorSegment;
    for (var i = 0; i < encrypted.length; i += this.segmentSize) {
      xorSegment = this._aes.encrypt(this._shiftRegister);
      for (var j = 0; j < this.segmentSize; j++) {
        encrypted[i + j] ^= xorSegment[j];
      }

      // Shift the register
      copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
      copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
    }

    return encrypted;
  }

  ModeOfOperationCFB.prototype.decrypt = function(ciphertext) {
    if ((ciphertext.length % this.segmentSize) != 0) {
      throw new Error('invalid ciphertext size (must be segmentSize bytes)');
    }

    var plaintext = coerceArray(ciphertext, true);

    var xorSegment;
    for (var i = 0; i < plaintext.length; i += this.segmentSize) {
      xorSegment = this._aes.encrypt(this._shiftRegister);

      for (var j = 0; j < this.segmentSize; j++) {
        plaintext[i + j] ^= xorSegment[j];
      }

      // Shift the register
      copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
      copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
    }

    return plaintext;
  }

  /**
   *  Mode Of Operation - Output Feedback (OFB)
   */
  var ModeOfOperationOFB = function(key, iv) {
    if (!(this instanceof ModeOfOperationOFB)) {
      throw Error('AES must be instanitated with `new`');
    }

    this.description = "Output Feedback";
    this.name = "ofb";

    if (!iv) {
      iv = createArray(16);

    } else if (iv.length != 16) {
      throw new Error('invalid initialation vector size (must be 16 bytes)');
    }

    this._lastPrecipher = coerceArray(iv, true);
    this._lastPrecipherIndex = 16;

    this._aes = new AES(key);
  }

  ModeOfOperationOFB.prototype.encrypt = function(plaintext) {
    var encrypted = coerceArray(plaintext, true);

    for (var i = 0; i < encrypted.length; i++) {
      if (this._lastPrecipherIndex === 16) {
        this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
        this._lastPrecipherIndex = 0;
      }
      encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
    }

    return encrypted;
  }

  // Decryption is symetric
  ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;


  /**
   *  Counter object for CTR common mode of operation
   */
  var Counter = function(initialValue) {
    if (!(this instanceof Counter)) {
      throw Error('Counter must be instanitated with `new`');
    }

    // We allow 0, but anything false-ish uses the default 1
    if (initialValue !== 0 && !initialValue) { initialValue = 1; }

    if (typeof(initialValue) === 'number') {
      this._counter = createArray(16);
      this.setValue(initialValue);

    } else {
      this.setBytes(initialValue);
    }
  }

  Counter.prototype.setValue = function(value) {
    if (typeof(value) !== 'number' || parseInt(value) != value) {
      throw new Error('invalid counter value (must be an integer)');
    }

    // We cannot safely handle numbers beyond the safe range for integers
    if (value > Number.MAX_SAFE_INTEGER) {
      throw new Error('integer value out of safe range');
    }

    for (var index = 15; index >= 0; --index) {
      this._counter[index] = value % 256;
      value = parseInt(value / 256);
    }
  }

  Counter.prototype.setBytes = function(bytes) {
    bytes = coerceArray(bytes, true);

    if (bytes.length != 16) {
      throw new Error('invalid counter bytes size (must be 16 bytes)');
    }

    this._counter = bytes;
  };

  Counter.prototype.increment = function() {
    for (var i = 15; i >= 0; i--) {
      if (this._counter[i] === 255) {
        this._counter[i] = 0;
      } else {
        this._counter[i]++;
        break;
      }
    }
  }


  /**
   *  Mode Of Operation - Counter (CTR)
   */
  var ModeOfOperationCTR = function(key, counter) {
    if (!(this instanceof ModeOfOperationCTR)) {
      throw Error('AES must be instanitated with `new`');
    }

    this.description = "Counter";
    this.name = "ctr";

    if (!(counter instanceof Counter)) {
      counter = new Counter(counter)
    }

    this._counter = counter;

    this._remainingCounter = null;
    this._remainingCounterIndex = 16;

    this._aes = new AES(key);
  }

  ModeOfOperationCTR.prototype.encrypt = function(plaintext) {
    var encrypted = coerceArray(plaintext, true);

    for (var i = 0; i < encrypted.length; i++) {
      if (this._remainingCounterIndex === 16) {
        this._remainingCounter = this._aes.encrypt(this._counter._counter);
        this._remainingCounterIndex = 0;
        this._counter.increment();
      }
      encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
    }

    return encrypted;
  }

  // Decryption is symetric
  ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;


  ///////////////////////
  // Padding

  // See:https://tools.ietf.org/html/rfc2315
  function pkcs7pad(data) {
    data = coerceArray(data, true);
    var padder = 16 - (data.length % 16);
    var result = createArray(data.length + padder);
    copyArray(data, result);
    for (var i = data.length; i < result.length; i++) {
      result[i] = padder;
    }
    return result;
  }

  function pkcs7strip(data) {
    data = coerceArray(data, true);
    if (data.length < 16) { throw new Error('PKCS#7 invalid length'); }

    var padder = data[data.length - 1];
    if (padder > 16) { throw new Error('PKCS#7 padding byte out of range'); }

    var length = data.length - padder;
    for (var i = 0; i < padder; i++) {
      if (data[length + i] !== padder) {
        throw new Error('PKCS#7 invalid padding byte');
      }
    }

    var result = createArray(length);
    copyArray(data, result, 0, 0, length);
    return result;
  }

  ///////////////////////
  // Exporting


  // The block cipher
  var aesjs = {
    AES: AES,
    Counter: Counter,

    ModeOfOperation: {
      ecb: ModeOfOperationECB,
      cbc: ModeOfOperationCBC,
      cfb: ModeOfOperationCFB,
      ofb: ModeOfOperationOFB,
      ctr: ModeOfOperationCTR
    },

    utils: {
      hex: convertHex,
      utf8: convertUtf8
    },

    padding: {
      pkcs7: {
        pad: pkcs7pad,
        strip: pkcs7strip
      }
    },

    _arrayTest: {
      coerceArray: coerceArray,
      createArray: createArray,
      copyArray: copyArray,
    }
  };


  // node.js
  if (true) {
    module.exports = aesjs

    // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
  } else {}


})(this);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(10);
var definePropertyModule = __webpack_require__(14);
var createPropertyDescriptor = __webpack_require__(34);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(43);
var DESCRIPTORS = __webpack_require__(10);
var global = __webpack_require__(5);
var has = __webpack_require__(9);
var isObject = __webpack_require__(15);
var defineProperty = __webpack_require__(14).f;
var copyConstructorProperties = __webpack_require__(46);

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(48);

addToUnscopables('flat');


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var createNonEnumerableProperty = __webpack_require__(20);

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(55);
var requireObjectCoercible = __webpack_require__(56);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "authOptions", function() { return /* binding */ authOptions; });
__webpack_require__.d(__webpack_exports__, "dnsDiscoveredUrls", function() { return /* binding */ dnsDiscoveredUrls; });
__webpack_require__.d(__webpack_exports__, "cachePrinterAuthModes", function() { return /* binding */ cachePrinterAuthModes; });
__webpack_require__.d(__webpack_exports__, "displayLoginWindow", function() { return /* binding */ displayLoginWindow; });
__webpack_require__.d(__webpack_exports__, "updateOverrideUrl", function() { return /* binding */ updateOverrideUrl; });
__webpack_require__.d(__webpack_exports__, "onPrintersDiscovered", function() { return /* binding */ onPrintersDiscovered; });

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.unscopables.flat.js
var es_array_unscopables_flat = __webpack_require__(22);

// EXTERNAL MODULE: ./src/scripts/auth.ts
var auth = __webpack_require__(1);

// EXTERNAL MODULE: ./src/scripts/chrome/runtime.ts + 1 modules
var runtime = __webpack_require__(8);

// EXTERNAL MODULE: ./src/scripts/constants.ts
var constants = __webpack_require__(18);

// EXTERNAL MODULE: ./src/lib/aes-js.js
var aes_js = __webpack_require__(19);
var aes_js_default = /*#__PURE__*/__webpack_require__.n(aes_js);

// EXTERNAL MODULE: ./src/scripts/log/index.ts + 3 modules
var log = __webpack_require__(0);

// CONCATENATED MODULE: ./src/scripts/encryption.ts
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};




function isChromeEncryptionEnabled(urlBase, isCloudPrintJob) {
  return new Promise(resolve => {
    if (isCloudPrintJob) {
      Object(log["b" /* log */])('Chrome encryption is off for cloud print jobs');
      resolve(false);
      return;
    }

    Object(log["b" /* log */])(`Checking if Chrome encryption should be enabled for '${urlBase}'...`);
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      if (xhr.status !== 200) {
        resolve(false);
        return;
      }

      try {
        const resp = JSON.parse(xhr.responseText);

        if ('chromeEncryption' in resp) {
          resolve(resp.chromeEncryption);
        } else {
          resolve(false);
        }
      } catch (e) {
        resolve(false);
      }
    };

    xhr.open('GET', urlBase + '/server-config', true);
    xhr.setRequestHeader('client-type', 'ChromeApp-' + chrome.runtime.getManifest().version);

    xhr.onerror = () => {
      resolve(false);
    };

    xhr.send();
  });
}

function randomBytes(length) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return array;
}

function encryptDocument(doc, title, printerId) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = ev => {
        Object(log["b" /* log */])('[encryptDocument] FileReader.onload ready for encryption of document with type:', doc.type);
        const bytes = new Uint8Array(ev.target.result);
        const paddedBytes = aes_js_default.a.padding.pkcs7.pad(bytes);
        const key = randomBytes(32);
        const iv = randomBytes(16);
        const aes = new aes_js_default.a.ModeOfOperation.cfb(key, iv, 16);
        const encryptedBytes = aes.encrypt(paddedBytes);
        const blob = new Blob([encryptedBytes], {
          type: doc.type
        });
        const urlBase = printerId.replace(/\/printers\/.*/i, '');
        const keyHex = aes_js_default.a.utils.hex.fromBytes(key);
        const ivHex = aes_js_default.a.utils.hex.fromBytes(iv);
        Object(auth["g" /* getRsaPublicKey */])(urlBase).then(rsa => {
          const keyHexEncrypted = rsa.encrypt(keyHex);
          resolve({
            blob,
            key: keyHexEncrypted,
            iv: ivHex,
            title: rsa.encrypt(title)
          });
        }).catch(e => {
          Object(log["b" /* log */])('[encryptDocument] getRsaPublicKey error', e);
          reject(e);
        });
      };

      reader.readAsArrayBuffer(doc);
    });
  });
}
// CONCATENATED MODULE: ./src/scripts/flag/flag.ts
var flag_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var Flag;

(function (Flag) {
  Flag["CloudPrintForceRTC"] = "CloudPrintForceRTC";
})(Flag || (Flag = {}));

class Flags {
  constructor(storage) {
    this.storage = storage;
  }

  get(flag) {
    return flag_awaiter(this, void 0, void 0, function* () {
      return (yield this.storage.get(flag)) === true;
    });
  }

  set(flag, enabled) {
    return this.storage.set(flag, enabled);
  }

}
// CONCATENATED MODULE: ./src/scripts/flag/index.ts

// CONCATENATED MODULE: ./src/scripts/flagstorage/flagstorage.ts
var flagstorage_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

class ChromeFlagStorage {
  constructor(storage = chrome.storage.local, flagsKey = 'flags') {
    this.storage = storage;
    this.flagsKey = flagsKey;
  }

  get(name) {
    return flagstorage_awaiter(this, void 0, void 0, function* () {
      const flags = yield this.getFlags();
      const val = flags[name];

      if (val === undefined) {
        return undefined;
      }

      return val === true;
    });
  }

  set(name, enabled) {
    return flagstorage_awaiter(this, void 0, void 0, function* () {
      const flags = yield this.getFlags();
      flags[name] = enabled;
      return this.setFlags(flags);
    });
  }

  getFlags() {
    return new Promise((res, rej) => {
      this.storage.get(this.flagsKey, d => {
        if (chrome.runtime.lastError) {
          return rej(chrome.runtime.lastError);
        }

        return res(d[this.flagsKey] || {});
      });
    });
  }

  setFlags(flags) {
    return new Promise((res, rej) => {
      this.storage.set({
        [this.flagsKey]: flags
      }, () => {
        if (chrome.runtime.lastError) {
          return rej(chrome.runtime.lastError);
        }

        return res();
      });
    });
  }

}
// CONCATENATED MODULE: ./src/scripts/flagstorage/index.ts

// EXTERNAL MODULE: ./src/scripts/offnetwork.ts + 17 modules
var offnetwork = __webpack_require__(4);

// EXTERNAL MODULE: ./src/scripts/offnetworkcache.ts + 1 modules
var offnetworkcache = __webpack_require__(3);

// EXTERNAL MODULE: ./src/scripts/printdeploy/index.ts + 11 modules
var printdeploy = __webpack_require__(7);

// EXTERNAL MODULE: ./src/scripts/printer/index.ts + 1 modules
var printer = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.all-settled.js
var es_promise_all_settled = __webpack_require__(69);

// EXTERNAL MODULE: ./src/scripts/knownhost/knownhost.ts
var knownhost = __webpack_require__(16);

// CONCATENATED MODULE: ./src/scripts/printerdiscovery.ts




var printerdiscovery_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};







(function () {
  return printerdiscovery_awaiter(this, void 0, void 0, function* () {
    Object(log["b" /* log */])('Registering printer discovery listener...');
    chrome.printerProvider.onGetPrintersRequested.addListener(getPrintersRequested);
  });
})();

const CHROME_CALLBACK_DEADLINE_MS = 30000;
const getPrintersCallbacks = [];

function getPrintersRequested(callback) {
  const requestNow = getPrintersCallbacks.length == 0;
  getPrintersCallbacks.push(callback);

  if (requestNow) {
    Object(log["b" /* log */])('[getPrintersRequested] fetching printers');

    const doCancel = () => {
      Object(log["b" /* log */])(`Cancelling running printer discovery results due to ${CHROME_CALLBACK_DEADLINE_MS}ms timeout...`);

      while (getPrintersCallbacks.length) {
        getPrintersCallbacks.shift()([]);
      }
    };

    const cancelTimeout = window.setTimeout(() => {
      doCancel();
    }, CHROME_CALLBACK_DEADLINE_MS);
    getAllPrinters().then(printers => {
      window.clearTimeout(cancelTimeout);
      const chromePrinterInfo = printers.map(printer => {
        return {
          id: printer.id,
          name: printer.name,
          description: printer.description
        };
      }).sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      Object(log["b" /* log */])(`[getPrintersRequested] completed, discovered ${printers.length} printers`);

      while (getPrintersCallbacks.length) {
        getPrintersCallbacks.shift()(chromePrinterInfo);
      }
    }).catch(reason => {
      window.clearTimeout(cancelTimeout);
      doCancel();
      Object(log["b" /* log */])('[getPrintersRequested] failed: ', reason);
    });
  } else {
    Object(log["b" /* log */])(`[getPrintersRequested] ${getPrintersCallbacks.length - 1} call(s) in progress, return same results`);
  }
}

function getAllPrinters() {
  return printerdiscovery_awaiter(this, void 0, void 0, function* () {
    const start = performance.now();
    const printers = yield getPrintersFromEnabledModes();
    const elapsed = (performance.now() - start).toFixed(2);
    Object(log["b" /* log */])(`${printers.length} total unique printer(s) discovered in ${elapsed}ms: `, printers);
    yield cachePrinterAuthModes(printers);
    return printers;
  });
}

function getPrintersFromEnabledModes() {
  return printerdiscovery_awaiter(this, void 0, void 0, function* () {
    try {
      const [printDeployPrinters, printDeployEnabled] = yield Object(printdeploy["e" /* getPrintersFromPrintDeploy */])();

      if (printDeployEnabled) {
        Object(log["b" /* log */])(`${printDeployPrinters.length} Print Deploy printer(s) discovered:`, printDeployPrinters);
        return printDeployPrinters;
      }

      const cloudPrintersPromise = Object(offnetwork["b" /* getPrintersFromAllServers */])();
      const knownHostPrinters = yield getPrintersKnownHost();
      Object(log["b" /* log */])(`${knownHostPrinters.length} Known Host printer(s) discovered:`, knownHostPrinters);
      const dnsPrinters = [];

      if (knownHostPrinters.length === 0) {
        dnsPrinters.push(...(yield getPrintersDNS()));
        Object(log["b" /* log */])(`${dnsPrinters.length} mDNS/DNS printer(s) discovered:`, dnsPrinters);
      }

      const cloudPrinters = yield cloudPrintersPromise;
      Object(log["b" /* log */])(`${cloudPrinters.length} Cloud Print printer(s) discovered:`, cloudPrinters);
      const allPrinters = new Map();

      for (const printer of cloudPrinters) {
        allPrinters.set(printer.name, printer);
      }

      for (const printer of knownHostPrinters) {
        allPrinters.set(printer.name, printer);
      }

      for (const printer of dnsPrinters) {
        allPrinters.set(printer.name, printer);
      }

      return Array.from(allPrinters.values());
    } catch (e) {
      Object(log["a" /* error */])('error retrieving printers: ', e);
      return [];
    }
  });
}

function getPrintersKnownHost() {
  return printerdiscovery_awaiter(this, void 0, void 0, function* () {
    Object(log["b" /* log */])('[getPrintersKnownHost]');
    let mpHosts;

    try {
      mpHosts = yield getPreconfiguredMobilityPrintServerHosts();
    } catch (e) {
      Object(log["b" /* log */])(e);
      return [];
    }

    Object(log["b" /* log */])('[KnownHost] MobilityPrintServerHosts:', mpHosts);
    const printers = [];
    const results = yield Promise.allSettled(mpHosts.map(mpHost => getPrinters(mpHost, onPrintersDiscovered)));

    for (let i = 0; i < results.length; i++) {
      const result = results[i];

      if (result.status === 'rejected') {
        Object(log["b" /* log */])(`[KnownHost] Failed to fetch printers from ${mpHosts[i]}.`);
        continue;
      }

      printers.push(...result.value);
    }

    return printers;
  });
}

function getLocalIPAddresses() {
  return printerdiscovery_awaiter(this, void 0, void 0, function* () {
    return new Promise(resolve => {
      chrome.system.network.getNetworkInterfaces(interfaces => {
        const localIPAddresses = interfaces.map(i => i.address).filter(knownhost["b" /* isIpV4 */]);
        Object(log["b" /* log */])('[localIPAddresses] detected: ', localIPAddresses);
        resolve(localIPAddresses);
      });
    });
  });
}

function getPreconfiguredMobilityPrintServerHosts() {
  return printerdiscovery_awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      chrome.storage.managed.get('MobilityPrintServerHosts', function (data) {
        if (data && data.MobilityPrintServerHosts) {
          Object(log["b" /* log */])('[KnownHost:getHosts] found provided known hosts', data.MobilityPrintServerHosts);
          const hosts = data.MobilityPrintServerHosts.map(knownhost["a" /* addProtocolAndPortIfNeeded */]);
          resolve(hosts);
        } else {
          reject('MobilityPrintServerHosts policy is not configured. This may be intended.');
        }
      });
    });
  });
}

function getPrintersDNS() {
  return printerdiscovery_awaiter(this, void 0, void 0, function* () {
    Object(log["b" /* log */])('[getPrintersDNS]');
    const result = yield Promise.all(dnsDiscoveredUrls().map(u => getPrinters(u, onPrintersDiscovered)));
    return result.flat(Infinity);
  });
}

function getPrinters(url, responseCallback) {
  return printerdiscovery_awaiter(this, void 0, void 0, function* () {
    const requestUrl = `${url}/printers?ignoreCapabilities=true`;
    return getLocalIPAddresses().then(ipList => {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();

        try {
          Object(log["b" /* log */])(`[getPrinters] executing GET request to [${requestUrl}]`);
          xhr.open('GET', requestUrl, true);
        } catch (e) {
          Object(log["b" /* log */])(`[getPrinters] ignoring invalid url [${requestUrl}]`);
          resolve([]);
        }

        xhr.timeout = 3000;

        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve(processPrintersListResponse(xhr, responseCallback));
          } else {
            Object(log["b" /* log */])(`[getPrinters] request to [${requestUrl}] failed`, this.status, xhr.statusText);
            resolve([]);
          }
        };

        xhr.onerror = function () {
          Object(log["b" /* log */])(`[getPrinters] request to [${requestUrl}] failed`, this.status, xhr.statusText);
          resolve([]);
        };

        xhr.ontimeout = function () {
          Object(log["b" /* log */])(`[getPrinters] request to [${requestUrl}] timed out`, this.status, xhr.statusText);
          resolve([]);
        };

        xhr.setRequestHeader('client-type', 'ChromeApp-' + chrome.runtime.getManifest().version);
        xhr.setRequestHeader('Local-Ip-Addresses', ipList.toString());
        xhr.send();
      });
    });
  });
}

function processPrintersListResponse(xhr, onPrintersResponse) {
  Object(log["b" /* log */])(`[processPrintersListResponse] JSON response from [${xhr.responseURL}]`, xhr.responseText);

  try {
    const resp = JSON.parse(xhr.responseText);
    Object(log["b" /* log */])('[processPrintersListResponse] got successful response from:', xhr.responseURL, resp.map(p => p.name));
    const ret = resp.map(p => ({
      id: xhr.responseURL.replace(/\/printers.*/, '/printers/') + encodeURIComponent(p.name),
      name: p.name + ' - [' + p.description + ']',
      description: p.description,
      authMode: p.authMode
    }));
    onPrintersResponse(ret);
    return ret;
  } catch (e) {
    Object(log["b" /* log */])('[processPrintersListResponse] Invalid JSON response from: [' + xhr.responseURL + '], error: ', e);
    return [];
  }
}
// EXTERNAL MODULE: ./src/scripts/printer/capabilities.ts
var printer_capabilities = __webpack_require__(17);

// EXTERNAL MODULE: ./src/scripts/storage/index.ts + 1 modules
var storage = __webpack_require__(2);

// CONCATENATED MODULE: ./src/scripts/main.ts


var main_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};















const authOptions = {
  perPrinter: 'per-printer',
  perJob: 'per-job',
  perServer: 'per-server',
  guestNone: 'none',
  standaloneNone: 'standalone-none'
};
const flags = new Flags(new ChromeFlagStorage());
let mdnsUrls = [];
let overrideUrl;
Promise.all([Object(runtime["a" /* getChromeOSVersion */])(), Object(runtime["d" /* getPlatformInfo */])()]).then(info => {
  const manifest = chrome.runtime.getManifest();
  Object(log["b" /* log */])(`[Startup] ${manifest.name} - ${manifest.version}`);
  Object(log["b" /* log */])(`[Startup] running on Chrome: ${info[0]}, ${info[1].os}_${info[1].arch}`);
  Object(log["b" /* log */])('[Startup] reset auth-modes');
});

(() => main_awaiter(void 0, void 0, void 0, function* () {
  yield Object(offnetwork["d" /* initCloudPrint */])();
}))();

let authModes = {};
chrome.runtime.onInstalled.addListener(function (details) {
  return main_awaiter(this, void 0, void 0, function* () {
    chrome.management.getSelf(ext => main_awaiter(this, void 0, void 0, function* () {
      Object(log["b" /* log */])(`[install] ${ext.name} - ${ext.version}, installType: ${ext.installType}, reason: ${details.reason}`);
    }));
  });
});
chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
  Object(log["b" /* log */])(`[onMessageExternal] message received from ${sender.url}`);
  Object(offnetwork["f" /* saveBYODLink */])(request.link.href).then(function () {
    sendResponse({
      message: 'link set up successfully'
    });
  });
});
chrome.app.runtime.onLaunched.addListener(function (launchData) {
  Object(log["b" /* log */])(`[Launch] source: ${launchData.source}`);
  const screenWidth = screen.availWidth;
  const screenHeight = screen.availHeight;
  const width = 494,
        height = 610;
  chrome.app.window.create('index.html', {
    frame: 'none',
    resizable: false,
    outerBounds: {
      width: width,
      height: height,
      left: Math.round((screenWidth - width) / 2),
      top: Math.round((screenHeight - height) / 2)
    }
  });
});
chrome.storage.local.get('overrideUrl', d => {
  if (d && d.overrideUrl) {
    overrideUrl = d.overrideUrl;
  }
});
chrome.storage.local.get('mdnsUrls', d => {
  if (d && d.mdnsUrls) {
    mdnsUrls = d.mdnsUrls;
  }
});
chrome.storage.local.get('authModes', d => {
  if (d && d.authModes) {
    authModes = d.authModes;
  }
});
chrome.commands.onCommand.addListener(command => {
  if (command === 'open-options') {
    const screenWidth = screen.availWidth;
    const screenHeight = screen.availHeight;
    const width = 500,
          height = 300;
    chrome.app.window.create('options.html', {
      id: 'options',
      outerBounds: {
        width: width,
        height: height,
        left: Math.round((screenWidth - width) / 2),
        top: Math.round((screenHeight - height) / 2)
      }
    }, newWindow => {
      const content = newWindow.contentWindow;
      content.updateOverrideUrl = updateOverrideUrl;
    });
  }
});

function setPrinterAuthModes(printers) {
  printers.forEach(p => {
    if (p.authMode) {
      authModes[p.id] = p.authMode;
    } else {
      authModes[p.id] = authOptions.perPrinter;
    }
  });
  chrome.storage.local.set({
    authModes: authModes
  });
}

function dnsDiscoveredUrls() {
  if (overrideUrl) {
    return [overrideUrl];
  }

  return constants["c" /* dnsUrls */].concat(mdnsUrls.map(i => i.url));
}
function cachePrinterAuthModes(values) {
  return main_awaiter(this, void 0, void 0, function* () {
    Object(log["b" /* log */])('Caching printer auth modes:', values);
    return new Promise(resolve => {
      let allPrinters = [];

      if (values) {
        allPrinters = values.flat(Infinity);
        setPrinterAuthModes(allPrinters);
        allPrinters.forEach(p => {
          delete p.authMode;
        });
      }

      resolve(allPrinters);
    });
  });
}

function getPrinterInfo(printerId) {
  return main_awaiter(this, void 0, void 0, function* () {
    if (yield flags.get(Flag.CloudPrintForceRTC)) {
      Object(log["b" /* log */])(`Skipping local capabilities fetch due to ${Flag.CloudPrintForceRTC} flag enabled.`);
      return Object(offnetwork["a" /* getPrinterInfoRTC */])(printerId);
    } else {
      if (yield main_isCloudPrintJob(printerId)) {
        return Object(offnetwork["a" /* getPrinterInfoRTC */])(printerId);
      } else {
        return getPrinterInfoHTTP(printerId);
      }
    }
  });
}

chrome.printerProvider.onGetCapabilityRequested.addListener((printerId, resultCallback) => main_awaiter(void 0, void 0, void 0, function* () {
  Object(log["b" /* log */])('Requesting printer capabilities for printer', printerId);
  const capabilities = Object(offnetworkcache["b" /* getPrinterCapabilities */])(printerId);

  if (capabilities) {
    return resultCallback(capabilities);
  }

  getPrinterInfo(printerId).then(j => {
    Object(log["b" /* log */])('printer capabilities result:', j);
    return j;
  }).then(p => {
    const caps = Object(printer_capabilities["b" /* parseMobilityPrintCapabilities */])(p.capabilities);
    Object(log["b" /* log */])('returning printer capabilities of: ', printerId, caps);
    return resultCallback(caps);
  }).catch(e => {
    Object(log["a" /* error */])(`failed to retrieve printer capabilities of: ${printerId}. Will use defaults instead: `, e);
    const caps = Object(printer_capabilities["a" /* createPrinterCapabilities */])();
    Object(log["b" /* log */])('returning printer capabilities of: ', printerId, caps);
    return resultCallback(caps);
  });
}));

function getPrinterInfoHTTP(printerId) {
  return main_awaiter(this, void 0, void 0, function* () {
    Object(log["b" /* log */])('Requesting printer capabilities via HTTP.', `printerId: ${printerId}`);
    const res = yield fetch(printerId, {
      headers: {
        'client-type': 'ChromeApp-' + chrome.runtime.getManifest().version
      }
    });

    if (!res.ok) {
      Object(log["a" /* error */])(`Failed to retrieve printer capabilities for ${printerId} via HTTP.`, res.statusText);
      throw new Error(res.statusText);
    }

    return res.json();
  });
}

let printJobForm;

function checkPrinterAccessibility(url) {
  return main_awaiter(this, void 0, void 0, function* () {
    if (yield flags.get(Flag.CloudPrintForceRTC)) {
      Object(log["b" /* log */])(`Skipping local printer accessibility check due to ${Flag.CloudPrintForceRTC} flag enabled.`);
      return false;
    }

    const headers = new Headers();
    headers.append('client-type', 'ChromeApp-' + chrome.runtime.getManifest().version);

    try {
      const response = yield fetch(url, {
        headers: headers
      });
      const accessible = response.status == 200;

      if (!accessible) {
        Object(log["b" /* log */])(`printer '${url}' local access rejected via response code: ${response.status}`);
      }

      return accessible;
    } catch (e) {
      Object(log["b" /* log */])(`printer '${url}' is not locally accessible: ${e.message}`);
    }

    return false;
  });
}

function main_isCloudPrintJob(printerId) {
  return main_awaiter(this, void 0, void 0, function* () {
    const serverId = yield Object(offnetworkcache["d" /* getServerIdForPrinter */])(printerId);

    if (serverId) {
      Object(log["b" /* log */])(`confirmed Cloud Print printer: ${printerId} from server: ${serverId}`);
      const locallyAccessible = yield checkPrinterAccessibility(printerId);
      Object(log["b" /* log */])(`printer '${printerId} ${locallyAccessible ? 'is' : 'is not'} locally accessible.`);
      return !locallyAccessible;
    }

    Object(log["b" /* log */])(`printer id '${printerId}' does not match any Cloud Print servers, assuming local network job`);
    return false;
  });
}

function submitPrintJob(printJob, cloudPrintJob, resultCallback) {
  const authMode = authModes[printJob.printerId];
  Object(log["b" /* log */])(`[OnPrintRequested]: printer=${printJob.printerId}, authMode=${authMode}`);

  switch (authMode) {
    case authOptions.standaloneNone:
      return submitWithStandaloneMode(printJob);

    case authOptions.guestNone:
      return submitWithGuestMode(printJob);

    case authOptions.perServer:
      return submitWithPrintDeployAuth(printJob, resultCallback);

    case authOptions.perPrinter:
      return submitWithPerPrinterAuth(printJob, cloudPrintJob);

    case authOptions.perJob:
      return submitWithPerJobAuth(printJob, cloudPrintJob);

    default:
      throw new Error(`Unsupported auth mode: ${authMode}`);
  }
}

chrome.printerProvider.onPrintRequested.addListener(function (printJob, resultCallback) {
  return main_awaiter(this, void 0, void 0, function* () {
    Object(log["b" /* log */])(`[onPrintRequested]: job requested for printerId=${printJob.printerId} 
							using authMode="${authModes[printJob.printerId]}" 
							and printJob=${JSON.stringify(printJob)}`);

    try {
      const cloudPrintJob = yield main_isCloudPrintJob(printJob.printerId);
      yield updatePrintJobForm(printJob, resultCallback, cloudPrintJob).then(() => main_awaiter(this, void 0, void 0, function* () {
        return submitPrintJob(printJob, cloudPrintJob, resultCallback).then(() => {
          Object(log["b" /* log */])(`[onPrintRequested]: submitted for printerId=${printJob.printerId}`);
        });
      })).catch(err => {
        Object(log["a" /* error */])('[onPrintRequested]: print submit failed ', err ? err : 'unknown error');
        resultCallback('FAILED');
      }).finally(() => {
        Object(log["b" /* log */])(`[onPrintRequested]: completing for printerId=${printJob.printerId}`);
      });
    } catch (e) {
      Object(log["a" /* error */])(`[onPrintRequested]: printing to '${printJob.printerId}' failed`, e);
      resultCallback('FAILED');
    }
  });
});

function submitWithPerPrinterAuth(printJob, cloudPrintJob) {
  Object(log["b" /* log */])('printJobForm.printerUrl:', printJobForm.printerUrl);
  return getPrinterAuthState(printJobForm.printerUrl).then(printerPrefs => {
    Object(log["b" /* log */])('[OnPrintRequested]: Retrieved printerPrefs for ' + printJobForm.printerUrl + ': ', printerPrefs);

    if (printerPrefs == null || !printerPrefs.isRemember) {
      Object(log["b" /* log */])('[OnPrintRequested]: Either no printerPrefs stored for this printer or isRemember is false. ' + 'Prompting user to login... printerPrefs:', printerPrefs);
      return startAuthentication(printJob, false, cloudPrintJob);
    } else if (printerPrefs.token) {
      if (printerPrefs.lastAuthOption === 'google') {
        Object(log["b" /* log */])('[OnPrintRequested]: Last authentication method used for this printer was GSuite. ' + 'Attempting to log in using G Suite...');
        return startAuthentication(printJob, true, cloudPrintJob);
      }

      Object(log["b" /* log */])('[OnPrintRequested]: Using cached bearer token for ' + printJobForm.printerUrl);

      if (cloudPrintJob) {
        submitJobWithTokenWebRTC(printerPrefs.token, printerPrefs.isRemember).then(() => {
          Object(log["b" /* log */])('[OnPrintRequested]: Job submitted successfully');
          printJobForm.callBack('OK');
        }).catch(() => {
          Object(log["b" /* log */])('[OnPrintRequested]: Job failed to submit. Restarting authentication...');
          chrome.storage.local.remove(printJobForm.printerUrl);
          return startAuthentication(printJob, true, cloudPrintJob);
        });
        return;
      }

      submitPrintJobHTTP(printJobForm.printerUrl, printJobForm.form, printerPrefs.token).then(() => {
        Object(log["b" /* log */])('[OnPrintRequested]: Job submitted successfully');
        printJobForm.callBack('OK');
      }).catch(() => {
        Object(log["b" /* log */])('[OnPrintRequested]: Job failed to submit. Restarting authentication...');
        chrome.storage.local.remove(printJobForm.printerUrl);
        return startAuthentication(printJob, true, cloudPrintJob);
      });
    } else {
      Object(log["b" /* log */])('[OnPrintRequested]: Token is empty for ' + printJobForm.printerUrl);
      return startAuthentication(printJob, printerPrefs.isRemember, cloudPrintJob);
    }
  });
}

function submitWithPrintDeployAuth(printJob, resultCallback) {
  const mpServer = Object(printer["a" /* getUrlBaseOfPrinterUrl */])(printJob.printerId);

  const submitJob = printJob => Object(printdeploy["b" /* getPDAuthForMobilityServer */])(mpServer).then(authDetails => {
    const {
      token,
      encryptedCreds,
      authOption
    } = authDetails;

    if (token) {
      return submitPrintJobHTTP(printJobForm.printerUrl, printJobForm.form, token).then(() => {
        Object(log["b" /* log */])('[submitWithPrintDeployAuth]: Job submitted successfully with a cached token');
        resultCallback('OK');
      });
    }

    if (!encryptedCreds) {
      return Promise.reject('no credentials available');
    }

    const authOpt = authOption || authModes[printJob.printerId];
    return submitJobWithCredentialsHTTP(encryptedCreds, auth["h" /* inMemoryCreds */].rememberMe, resultCallback, authOpt);
  });

  return submitJob(printJob).catch(e => {
    Object(log["b" /* log */])('[submitWithPrintDeployAuth]: Job submission failed. error:', e);

    if (e.status === 401) {
      const urlBase = Object(printer["a" /* getUrlBaseOfPrinterUrl */])(printJob.printerId);
      Object(log["b" /* log */])('[submitWithPrintDeployAuth]: MP server token expired for "%s". Invalidating token to trigger ' + 're-authentication...', urlBase);
      return printdeploy["f" /* printDeployStorage */].removeMobilityPrintServerToken(urlBase).then(() => submitJob(printJob));
    } else {
      resultCallback('FAILED');
    }
  }).finally(() => {
    Object(auth["c" /* clearInMemoryCreds */])();
  });
}

function submitWithStandaloneMode(printJob) {
  Object(log["b" /* log */])('authMode set to none - standalone mode');
  return submitPrint(printJob.printerId, printJobForm.form, printJobForm.printDoc).then(() => {
    Object(log["b" /* log */])('[OnPrintRequested]: Job submitted successfully');
    printJobForm.callBack('OK');
  }).catch(e => {
    Object(log["a" /* error */])(`error printing: [${e}]`);
    Object(log["b" /* log */])('[OnPrintRequested]: Job failed to submit in standalone so no retry...');
    printJobForm.callBack('FAILED');
  });
}

function submitWithGuestMode(printJob) {
  Object(log["b" /* log */])('authMode set to none - guest mode');
  return submitPrintJobHTTP(printJob.printerId, printJobForm.form).then(() => {
    Object(log["b" /* log */])('[OnPrintRequested]: Job submitted successfully');
    printJobForm.callBack('OK');
  }).catch(() => {
    Object(log["b" /* log */])('[OnPrintRequested]: Job failed to submit. Restarting authentication...');
    chrome.storage.local.remove(printJobForm.printerUrl);
    return startAuthentication(printJob);
  });
}

function submitWithPerJobAuth(printJob, cloudPrintJob) {
  Object(log["b" /* log */])('[OnPrintRequested]: Auth mode is per job for ' + printJobForm.printerUrl + '. Prompting user to log in...');
  return startAuthentication(printJob, false, cloudPrintJob);
}

function submitPrint(printerUrl, form, file) {
  return main_awaiter(this, void 0, void 0, function* () {
    if (yield checkPrinterAccessibility(printerUrl)) {
      Object(log["b" /* log */])('Printer is locally accessible. Submitting job using HTTP.');
      return submitPrintJobHTTP(printerUrl, form);
    } else {
      Object(log["b" /* log */])('Printer is not locally accessible. Submitting job using RTC.');
      const params = {};
      printJobForm.form.forEach((v, k) => {
        if (k === 'iv' || k === 'key') {
          return;
        }

        params[k] = v;
      });
      return Object(offnetwork["g" /* submitPrintJobRTC */])(file, printerUrl, params);
    }
  });
}

function updatePrintJobForm(printJob, resultCallback, isCloudPrintJob) {
  Object(log["b" /* log */])(`[OnPrintRequested]: convert ticket to form for '${printJob.printerId}', cloud print job: ${isCloudPrintJob}`);
  const f = new FormData();
  const ticket = printJob.ticket;
  f.append('printerName', printJob.printerId);
  f.append('copies', ticket.print.copies ? ticket.print.copies.copies : 1);
  f.append('duplex', ticket.print.duplex ? ticket.print.duplex.type : 'NO_DUPLEX');
  f.append('color', ticket.print.color ? ticket.print.color.type : 'AUTO');
  f.append('mediaWidthMicrons', ticket.print.media_size ? ticket.print.media_size.width_microns : 0);
  f.append('mediaHeightMicrons', ticket.print.media_size ? ticket.print.media_size.height_microns : 0);
  printJobForm = {
    form: f,
    callBack: resultCallback,
    printerUrl: printJob.printerId,
    printDoc: printJob.document
  };
  const urlBase = Object(printer["a" /* getUrlBaseOfPrinterUrl */])(printJob.printerId);
  return isChromeEncryptionEnabled(urlBase, isCloudPrintJob).then(enabled => {
    Object(log["b" /* log */])('Chrome encryption enabled is set to: ' + enabled);

    if (enabled) {
      return encryptDocument(printJob.document, printJob.title, printJob.printerId).then(result => {
        f.append('printDocument', result.blob);
        f.append('key', result.key);
        f.append('iv', result.iv);
        f.append('documentName', result.title);
        Object(log["b" /* log */])('encrypted document added to printJobForm');
      });
    } else {
      return new Promise(resolve => {
        f.append('printDocument', printJob.document);
        f.append('documentName', printJob.title);
        resolve();
      });
    }
  });
}

function startAuthentication(printJob, isRemember = true, cloudPrintJob = false) {
  let gSuiteEnabled = false;
  Object(log["b" /* log */])(`[startAuthentication]: printerId=${printJob.printerId}, isRemember=${isRemember}, cloudPrintJob=${cloudPrintJob}`);
  return Object(auth["j" /* isGSuiteEnabled */])(printJob, cloudPrintJob).then(enabled => {
    gSuiteEnabled = enabled;

    if (!gSuiteEnabled) {
      Object(log["b" /* log */])('[startAuthentication]: GSuite is not enabled so showing login window instead with no Google sign in ' + 'option...');
      return Promise.reject('GSuite is not enabled');
    }

    if (!isRemember) {
      Object(log["b" /* log */])('[startAuthentication]: Auth mode is per job or user did not ask to be remembered so showing login window ' + 'instead with a Google sign in option...');
      return Promise.reject('Auth mode is per job. Ignoring cache-based authentication.');
    }

    Object(log["b" /* log */])('[startAuthentication]: GSuite is enabled and isRemember is enabled for this printer. Attempting to ' + 'auto-login...');
    return Object(auth["a" /* authenticateWithGSuite */])(printJob, false, !cloudPrintJob);
  }).then(authInfo => {
    Object(log["b" /* log */])('[startAuthentication]: Credentials retrieved successfully. Now sending job with the credentials...');
    return submitJobWithCredentials(authInfo, false, response => {
      if (response && response.ok) {
        Object(log["b" /* log */])('[startAuthentication]: Authentication successful. Job submitted successfully.');
      } else {
        const errorMessage = response != null ? response.message : 'response is null';

        if (Object(offnetwork["e" /* isCloudPrintError */])(errorMessage)) {
          Object(log["a" /* error */])('[startAuthentication]: Failed to connect while authenticating credentials: ' + errorMessage);
          printJobForm.callBack('FAILED');
          return;
        }

        Object(log["a" /* error */])('[startAuthentication]: Failed to authenticate credentials: ' + errorMessage);
        openLogin(printJob, isRemember, true);
      }
    }, 'google', cloudPrintJob);
  }).catch(e => {
    if (e instanceof Error) {
      Object(log["a" /* error */])('Failed to check if Google sign-in is enabled. Reason: ', e);
    }

    if (Object(offnetwork["e" /* isCloudPrintError */])(e)) {
      throw e;
    }

    getPrinterAuthState(printJob.printerId).then(printerPrefs => {
      gSuiteEnabled = gSuiteEnabled || printerPrefs && printerPrefs.lastAuthOption === 'google';
      const showRememberMe = authModes[printJob.printerId] === authOptions.perPrinter;
      Object(log["c" /* warn */])(`[startAuthentication] Asking the user to authenticate again in login window. 
						Remember-me ${showRememberMe ? 'enabled' : 'disabled'}, 
						Google Login ${gSuiteEnabled ? 'enabled' : 'disabled'}`);
      openLogin(printJob, showRememberMe, gSuiteEnabled, cloudPrintJob);
    });
  });
}

function openLogin(printJob, showRememberMe = true, showGoogleLogin = false, cloudPrintJob = false) {
  const urlBase = Object(printer["a" /* getUrlBaseOfPrinterUrl */])(printJob.printerId);

  const onClose = () => {
    printJobForm.callBack('OK');
    printJobForm = null;
  };

  displayLoginWindow({
    printJob,
    urlBase,
    showRememberMe,
    showGoogleLogin,
    onClose,
    useCloudPrint: cloudPrintJob
  });
}

function displayLoginWindow({
  printJob = undefined,
  urlBase = undefined,
  showRememberMe,
  showGoogleLogin = false,
  onSuccess = undefined,
  onClose = undefined,
  onCredentialsEntered = undefined,
  onOAuthSessionCreated = undefined,
  useCloudPrint = false,
  usePrintDeploy = false
}) {
  const screenWidth = screen.availWidth;
  const screenHeight = screen.availHeight;
  const width = 494,
        height = 675;
  Object(log["b" /* log */])(`[displayLoginWindow]: rememberMe:${showRememberMe}, googleLogin:${showGoogleLogin}, ` + `cloudPrint:${useCloudPrint}, printDeploy:${usePrintDeploy}`);
  chrome.app.window.create('login.html', {
    id: 'login-dialog',
    frame: 'none',
    resizable: false,
    outerBounds: {
      width: width,
      height: height,
      left: Math.round((screenWidth - width) / 2),
      top: Math.round((screenHeight - height) / 2)
    }
  }, newWindow => {
    const content = newWindow.contentWindow;
    content.printJob = printJob;
    content.showRememberMe = showRememberMe;
    content.showGoogleLogin = showGoogleLogin;
    content.onCredentialsEntered = onCredentialsEntered;
    content.onSuccess = onSuccess;
    content.urlBase = urlBase;
    content.useCloudPrint = useCloudPrint;
    content.usePrintDeploy = usePrintDeploy;
    content.onOAuthSessionCreated = onOAuthSessionCreated;

    if (onClose) {
      newWindow.onClosed.addListener(onClose);
    }
  });
}
function updateOverrideUrl(newUrl) {
  chrome.storage.local.set({
    overrideUrl: newUrl
  });
  overrideUrl = newUrl;
}

function mdnsListener(services) {
  Object(log["b" /* log */])('[MDNS:mdnsListener] all services so far: ', mdnsUrls);
  const now = Date.now();
  mdnsUrls = mdnsUrls.filter(i => now - i.addedOn < 60 * 60 * 1000);
  Object(log["b" /* log */])('[MDNS:mdnsListener] all services after removing old records: ', mdnsUrls);
  Object(log["b" /* log */])('[MDNS:mdnsListener] found services: ', services);
  services.filter(s => s.serviceHostPort && s.ipAddress).map(s => 'http://' + s.ipAddress + s.serviceHostPort.substring(s.serviceHostPort.lastIndexOf(':'))).filter(u => mdnsUrls.findIndex(i => i.url == u) === -1).forEach(u => {
    mdnsUrls.push({
      url: u,
      addedOn: now
    });
    Object(log["b" /* log */])('[MDNS:mdnsListener] found valid non duplicate service: ', u);
  });
  Object(log["b" /* log */])('[MDNS:mdnsListener] all services after adding new: ', mdnsUrls);
  chrome.storage.local.set({
    mdnsUrls: mdnsUrls
  });
}

chrome.mdns.onServiceList.addListener(mdnsListener, {
  serviceType: '_banksia._tcp.local'
});
setInterval(() => {
  chrome.mdns.onServiceList.removeListener(mdnsListener);
  chrome.mdns.onServiceList.addListener(mdnsListener, {
    serviceType: '_banksia._tcp.local'
  });
  chrome.mdns.forceDiscovery(() => {});
}, 6000 * 1000);

function submitPrintJobHTTP(printerUrl, data, authToken) {
  const url = `${printerUrl}/jobs`;
  Object(log["b" /* log */])(`[submitPrintJobHTTP]: submitting print job to: ${url}`);
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        Object(log["a" /* error */])(`[submitPrintJobHTTP]: failed to submit job, server replied with: ${xhr.statusText}`);
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.onerror = function () {
      Object(log["a" /* error */])(`[submitPrintJobHTTP]: failed to submit job, server replied with: ${xhr.statusText}`);
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };

    xhr.setRequestHeader('client-type', 'ChromeApp-' + chrome.runtime.getManifest().version);

    if (authToken) {
      xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);
    }

    xhr.send(data);
  });
}

chrome.runtime.onMessage.addListener((message, sender, responseCallback) => {
  if (!message.credentials || message.useCloudPrint === undefined) {
    Object(log["b" /* log */])(`Received unknown message from ${sender.url}: ${JSON.stringify(message)}`);
    return;
  }

  Object(log["b" /* log */])(`Received ${message.useCloudPrint ? 'cloud' : 'local'} print job message from ${sender.url}`);
  submitJobWithCredentials(message.credentials, message.remember, responseCallback, message.authOption, message.useCloudPrint);
  return true;
});

function submitJobWithCredentials(credentials, isRemember, responseCallback, authOption, cloudPrint) {
  Object(log["b" /* log */])(`submitJobWithCredentials: authOption=${authOption}, cloudPrint=${cloudPrint}, isRemember=${isRemember}`);

  if (!printJobForm) {
    Object(log["b" /* log */])('No print job data set, not submitting!');
    return;
  }

  if (cloudPrint) {
    submitJobWithCredentialsWebRTC(credentials, isRemember, authOption).then(() => {
      Object(log["b" /* log */])('[submitJobWithCredentials] print job submitted.');
      printJobForm.callBack('OK');
      responseCallback({
        ok: true
      });
    }).catch(e => {
      Object(log["a" /* error */])('[submitJobWithCredentials] job failed to submit.', e);
      responseCallback({
        ok: false,
        message: e.message
      });
    });
    return;
  }

  submitJobWithCredentialsHTTP(credentials, isRemember, responseCallback, authOption);
}

function savePrinterAuthState(printerUrl, token, isRemember, authOption) {
  Object(log["b" /* log */])(`saving remember-me print token for printer: ${printerUrl}, authOption=${authOption}`);
  chrome.storage.local.set({
    [printerUrl]: {
      token: token,
      isRemember: isRemember,
      lastAuthOption: authOption
    }
  });
}

function getPrinterAuthState(printerId) {
  return Object(storage["a" /* getLocalStorageData */])(printerId);
}

function submitJobWithCredentialsHTTP(credentials, isRemember, responseCallback, authOption) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      Object(log["b" /* log */])('[submitJobWithCredentials] print job result status: ', xhr.status, xhr);
      const printerUrl = printJobForm.printerUrl;
      let jsonResponse;
      const result = xhr.response;

      if (result) {
        jsonResponse = JSON.parse(result);
      }

      if (xhr.status === 200) {
        Object(log["b" /* log */])('[submitJobWithCredentials] print job submitted.');
        printJobForm.callBack('OK');
        printJobForm = null;

        if (jsonResponse && jsonResponse.t && authModes[printerUrl] === authOptions.perPrinter) {
          savePrinterAuthState(printerUrl, jsonResponse.t, isRemember, authOption);
        }

        if (jsonResponse && jsonResponse.t && authModes[printerUrl] === 'per-server') {
          const mpServerBaseUrl = Object(printer["a" /* getUrlBaseOfPrinterUrl */])(printerUrl);

          if (isRemember) {
            printdeploy["f" /* printDeployStorage */].cacheMobilityPrintServerToken(mpServerBaseUrl, jsonResponse.t);
          }
        }

        responseCallback({
          ok: true
        });
      } else if (xhr.status === 401) {
        const message = jsonResponse && jsonResponse.message ? jsonResponse.message : 'Invalid username or password';
        printJobForm.form.delete('credentials');
        chrome.storage.local.remove(printerUrl);
        responseCallback({
          ok: false,
          message: message
        });
      } else if (xhr.status === 403) {
        const message = jsonResponse && jsonResponse.message ? jsonResponse.message : 'Access Denied';
        printJobForm.form.delete('credentials');
        chrome.storage.local.remove(printerUrl);
        responseCallback({
          ok: false,
          message: message
        });
      } else {
        printJobForm.callBack('FAILED');
        printJobForm = null;
        chrome.storage.local.remove(printerUrl);
        responseCallback({
          ok: true
        });
      }
    }
  };

  if (authOption == null) {
    printJobForm.form.delete('authOption');
  } else {
    printJobForm.form.set('authOption', authOption);
  }

  printJobForm.form.append('authOption', authOption);
  printJobForm.form.delete('credentials');
  printJobForm.form.append('remember', isRemember);
  printJobForm.form.append('credentials', credentials);
  Object(log["b" /* log */])('[submitJobWithCredentials] Sending print job to:', printJobForm.printerUrl + '/jobs');
  xhr.open('POST', printJobForm.printerUrl + '/jobs', true);
  xhr.setRequestHeader('client-type', 'ChromeApp-' + chrome.runtime.getManifest().version);
  xhr.send(printJobForm.form);
  return true;
}

function submitJobWithCredentialsWebRTC(credentials, isRemember, authOption) {
  return main_awaiter(this, void 0, void 0, function* () {
    printJobForm.form.delete('credentials');
    printJobForm.form.append('remember', isRemember);
    printJobForm.form.append('credentials', credentials);
    const params = {};
    printJobForm.form.forEach((v, k) => {
      if (k === 'iv' || k === 'key') {
        return;
      }

      params[k] = v;
    });
    params['credentials'] = credentials;
    const token = yield Object(offnetwork["g" /* submitPrintJobRTC */])(printJobForm.printDoc, printJobForm.printerUrl, params);

    if (token && authModes[printJobForm.printerUrl] === authOptions.perPrinter) {
      if (isRemember) {
        savePrinterAuthState(printJobForm.printerUrl, token, isRemember, authOption);
      }
    }
  });
}

function submitJobWithTokenWebRTC(token, isRemember) {
  return main_awaiter(this, void 0, void 0, function* () {
    printJobForm.form.delete('credentials');
    printJobForm.form.append('remember', isRemember);
    const params = {};
    params['rememberedToken'] = token;
    printJobForm.form.forEach((v, k) => {
      if (k === 'iv' || k === 'key') {
        return;
      }

      params[k] = v;
    });
    yield Object(offnetwork["g" /* submitPrintJobRTC */])(printJobForm.printDoc, printJobForm.printerUrl, params);
  });
}

function onPrintersDiscovered(p) {
  p.map(p => {
    if (p.authMode) {
      authModes[p.id] = p.authMode;
    } else {
      authModes[p.id] = authOptions.perPrinter;
    }
  });
  Object(log["b" /* log */])('[onPrintersDiscovered] authModes: ', authModes);
  chrome.storage.local.set({
    authModes: authModes
  });
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(50);
var store = __webpack_require__(30);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var setGlobal = __webpack_require__(23);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(10);
var fails = __webpack_require__(13);
var createElement = __webpack_require__(32);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var isObject = __webpack_require__(15);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(15);

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(13);

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toIndexedObject = __webpack_require__(24);
var indexOf = __webpack_require__(57).indexOf;
var hiddenKeys = __webpack_require__(25);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 38 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(40);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(60);
var global = __webpack_require__(5);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(29);
var uid = __webpack_require__(35);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var getOwnPropertyDescriptor = __webpack_require__(44).f;
var createNonEnumerableProperty = __webpack_require__(20);
var redefine = __webpack_require__(62);
var setGlobal = __webpack_require__(23);
var copyConstructorProperties = __webpack_require__(46);
var isForced = __webpack_require__(68);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(10);
var propertyIsEnumerableModule = __webpack_require__(61);
var createPropertyDescriptor = __webpack_require__(34);
var toIndexedObject = __webpack_require__(24);
var toPrimitive = __webpack_require__(33);
var has = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(31);

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(30);

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var ownKeys = __webpack_require__(65);
var getOwnPropertyDescriptorModule = __webpack_require__(44);
var definePropertyModule = __webpack_require__(14);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(12);
var create = __webpack_require__(52);
var definePropertyModule = __webpack_require__(14);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(36);

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var defineProperties = __webpack_require__(53);
var enumBugKeys = __webpack_require__(26);
var hiddenKeys = __webpack_require__(25);
var html = __webpack_require__(59);
var documentCreateElement = __webpack_require__(32);
var sharedKey = __webpack_require__(42);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(10);
var definePropertyModule = __webpack_require__(14);
var anObject = __webpack_require__(11);
var objectKeys = __webpack_require__(54);

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(37);
var enumBugKeys = __webpack_require__(26);

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(13);
var classof = __webpack_require__(38);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(24);
var toLength = __webpack_require__(39);
var toAbsoluteIndex = __webpack_require__(58);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(40);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(41);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);

module.exports = global;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var createNonEnumerableProperty = __webpack_require__(20);
var has = __webpack_require__(9);
var setGlobal = __webpack_require__(23);
var inspectSource = __webpack_require__(45);
var InternalStateModule = __webpack_require__(63);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(64);
var global = __webpack_require__(5);
var isObject = __webpack_require__(15);
var createNonEnumerableProperty = __webpack_require__(20);
var objectHas = __webpack_require__(9);
var sharedKey = __webpack_require__(42);
var hiddenKeys = __webpack_require__(25);

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var inspectSource = __webpack_require__(45);

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(41);
var getOwnPropertyNamesModule = __webpack_require__(66);
var getOwnPropertySymbolsModule = __webpack_require__(67);
var anObject = __webpack_require__(11);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(37);
var enumBugKeys = __webpack_require__(26);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),
/* 67 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(13);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(43);
var aFunction = __webpack_require__(27);
var newPromiseCapabilityModule = __webpack_require__(70);
var perform = __webpack_require__(71);
var iterate = __webpack_require__(72);

// `Promise.allSettled` method
// https://github.com/tc39/proposal-promise-allSettled
$({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (e) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: e };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(27);

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var isArrayIteratorMethod = __webpack_require__(73);
var toLength = __webpack_require__(39);
var bind = __webpack_require__(74);
var getIteratorMethod = __webpack_require__(75);
var callWithSafeIterationClosing = __webpack_require__(78);

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(12);
var Iterators = __webpack_require__(47);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(27);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(76);
var Iterators = __webpack_require__(47);
var wellKnownSymbol = __webpack_require__(12);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(77);
var classofRaw = __webpack_require__(38);
var wellKnownSymbol = __webpack_require__(12);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(12);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _offnetwork__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _printdeploy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);





(function () {
  const loginWindow = window;

  const toggleRemember = function () {
    if (typeof loginWindow.showRememberMe === 'undefined') {
      Object(_log__WEBPACK_IMPORTED_MODULE_1__[/* log */ "b"])('Remember me is not set yet, waiting again.');
      setTimeout(toggleRemember, 500);
    } else {
      $('#remember-me-container').toggle(loginWindow.showRememberMe);
    }
  };

  const credentialsResponseHandler = function (response) {
    Object(_log__WEBPACK_IMPORTED_MODULE_1__[/* log */ "b"])('credentialsResponseHandler');
    exitLoadingState();
    updateUiOnJobSubmissionResponse(response);
  };

  const updateUiOnJobSubmissionResponse = function (response) {
    exitLoadingState();

    if (response && response.ok) {
      Object(_log__WEBPACK_IMPORTED_MODULE_1__[/* log */ "b"])('Authentication successful. Job submitted successfully.');
      hideErrors();
      window.close();
    } else {
      const error = response && response.message ? response.message : 'Failed to log in. Please try again.';
      showMessageForError(error);
    }
  };

  const enterLoadingState = function () {
    const loginButton = $('#login');
    loginButton.attr('disabled', 'disabled').addClass('loading');
    const googleLoginBtn = $('#googlelogin');
    googleLoginBtn.attr('disabled', 'disabled').addClass('loading');
  };

  const exitLoadingState = function () {
    const loginButton = $('#login');
    loginButton.removeAttr('disabled').removeClass('loading');
    const googleLoginBtn = $('#googlelogin');
    googleLoginBtn.removeAttr('disabled').removeClass('loading');
  };

  const hideErrors = function () {
    $('span.error-message').each((idx, em) => {
      $(em).hide();
    });
  };

  function isAuthError(err) {
    if (err) {
      return err.includes('user and password') || err.includes('authentication');
    }

    return false;
  }

  function isConnectionError(err) {
    if (err) {
      return err.includes('Connection failed') || err.includes('Could not connect') || Object(_offnetwork__WEBPACK_IMPORTED_MODULE_2__[/* isCloudPrintError */ "e"])(err);
    }

    return false;
  }

  const showMessageForError = function (err) {
    Object(_log__WEBPACK_IMPORTED_MODULE_1__[/* error */ "a"])('showMessageForError:', err);
    $('.error-message').hide();

    if (isAuthError(err)) {
      $('#error-message-invalid-creds').show();
    } else if (err === 'The user did not approve access.') {
      $('#error-message-grant-access').show();
    } else if (err === 'Unknown user') {
      $('#error-message-unknown-g-account').show();
    } else if (err === 'GSuite not supported') {
      $('#error-message-gsuite-not-supported').show();
    } else if (isConnectionError(err)) {
      $('#error-message-connection-failed').show();
    } else if (err.includes('let third-party apps access Directory data')) {
      $('#error-message-gsuite-third-party-access').show();
    } else if (err.includes('Printer access denied by group restriction')) {
      $('#error-message-denied-group-restriction').show();
    } else {
      $('#error-message-invalid-creds').show();
    }

    return err;
  };

  const loginUsingPaperCutCredentials = function () {
    enterLoadingState();
    const isRemember = $('#remember').is(':checked');
    const username = $('#username').val();
    const password = $('#password').val();
    Object(_log__WEBPACK_IMPORTED_MODULE_1__[/* log */ "b"])(`Credentials entered for username="${username}" with ${password.length === 0 ? 'an empty' : 'a non-empty'} password`);

    if (loginWindow.useCloudPrint === true) {
      sendPrintJobMessage({
        username: username,
        password: password
      }, isRemember, loginWindow.useCloudPrint, credentialsResponseHandler);
      return;
    }

    Object(_auth__WEBPACK_IMPORTED_MODULE_0__[/* encryptCredentials */ "d"])(loginWindow.urlBase, username, password).then(encryptedCreds => {
      sendPrintJobMessage(encryptedCreds, isRemember, loginWindow.useCloudPrint, credentialsResponseHandler);
    }).catch(e => {
      exitLoadingState();
      showMessageForError(e);
    });
  };

  const loginUsingGSuite = function () {
    enterLoadingState();
    const isRemember = $('#remember').is(':checked');
    Object(_log__WEBPACK_IMPORTED_MODULE_1__[/* log */ "b"])(`loginUsingGSuite selected: isRemember=${isRemember}`);

    if (loginWindow.usePrintDeploy) {
      return Object(_printdeploy__WEBPACK_IMPORTED_MODULE_3__[/* getPreconfiguredPrintDeployServer */ "c"])().then(host => Object(_printdeploy__WEBPACK_IMPORTED_MODULE_3__[/* getPrintDeployClient */ "d"])(host)).then(client => client.createOAuthSession(_printdeploy__WEBPACK_IMPORTED_MODULE_3__[/* OAuthProviderIDs */ "a"].Google)).then(session => {
        var _a;

        const onFinish = () => {
          exitLoadingState();
          window.close();
        };

        (_a = loginWindow.onOAuthSessionCreated) === null || _a === void 0 ? void 0 : _a.call(loginWindow, {
          sessionCreds: session,
          rememberMe: isRemember,
          onFinish: onFinish
        });
      }).catch(e => {
        showMessageForError(e);
        exitLoadingState();
      });
    }

    Object(_auth__WEBPACK_IMPORTED_MODULE_0__[/* authenticateWithGSuite */ "a"])(loginWindow.printJob, true, !loginWindow.useCloudPrint).then(credentials => {
      sendPrintJobMessage(credentials, isRemember, loginWindow.useCloudPrint, handleResponse, 'google');
    }).catch(e => {
      showMessageForError(e);
      exitLoadingState();
    });

    function handleResponse(response) {
      Object(_log__WEBPACK_IMPORTED_MODULE_1__[/* log */ "b"])('handleResponse', response);

      if (response && response.message === 'Invalid username or password') {
        response.message = 'Unknown user';
        Object(_auth__WEBPACK_IMPORTED_MODULE_0__[/* revokeCachedGSuiteAuthToken */ "l"])(5000).finally(() => {
          updateUiOnJobSubmissionResponse(response);
        });
      } else {
        if (!isRemember) {
          Object(_auth__WEBPACK_IMPORTED_MODULE_0__[/* revokeCachedGSuiteAuthToken */ "l"])().finally(() => {
            updateUiOnJobSubmissionResponse(response);
          });
        } else {
          updateUiOnJobSubmissionResponse(response);
        }
      }
    }
  };

  const onLoginClick = function () {
    if (loginWindow.onCredentialsEntered) {
      const rememberMe = $('#remember').is(':checked');
      const credentials = {
        username: ($('#username').val() || '').toString(),
        password: ($('#password').val() || '').toString(),
        rememberMe: rememberMe
      };
      loginWindow.onCredentialsEntered({
        credentials,
        type: 'papercut',
        onDisplayError: e => {
          exitLoadingState();
          showMessageForError(e);
        },
        onFinish: () => {
          exitLoadingState();
          window.close();
        }
      });
      enterLoadingState();
    } else {
      loginUsingPaperCutCredentials();
    }
  };

  const initialise = function () {
    toggleRemember();
    const loginForm = $('#login-form');
    loginForm.validate({
      errorPlacement: function (error, element) {
        $(element).closest('form').find('label[for=\'' + element.attr('id') + '\']').append(error);
      },
      errorElement: 'span',
      messages: {
        username: {
          required: ' (required)'
        },
        password: {
          required: ' (required)'
        }
      }
    });

    if (loginWindow.showGoogleLogin) {
      const googleLoginButton = $('#googlelogin');
      googleLoginButton.show();
      googleLoginButton.on('click', function () {
        hideErrors();
        loginUsingGSuite();
      });
    } else {
      $('#googlelogin').hide();
      $('span#or').hide();
    }

    $('#login').on('click', function () {
      if (loginForm.valid()) {
        onLoginClick();
      }
    });
    $('#close').on('click', function () {
      window.close();
    });
    loginForm.find('input').keypress(function (e) {
      if (e.which == 10 || e.which == 13) {
        if (loginForm.valid()) {
          onLoginClick();
        }
      }
    });
    loginForm.find('input').on('input', function () {
      hideErrors();
    });
    $(document).keyup(function (event) {
      if (event.keyCode === 27) {
        window.close();
      }
    });
  };

  initialise();
})();

const sendPrintJobMessage = function (credentials, isRemember, useCloudPrint = false, responseHandler, authOption = '') {
  Object(_log__WEBPACK_IMPORTED_MODULE_1__[/* log */ "b"])(`sendPrintJobMessage: isRemember=${isRemember}, useCloudPrint=${useCloudPrint}, authOption=${authOption}`);
  chrome.runtime.sendMessage({
    credentials: credentials,
    remember: isRemember,
    useCloudPrint: useCloudPrint,
    authOption: authOption
  }, {}, responseHandler);
};

/***/ })
/******/ ]);