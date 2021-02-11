// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/preloader.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var anim = function (duration, cb) {
  return __awaiter(void 0, void 0, Promise, function () {
    var start;
    return __generator(this, function (_a) {
      start = performance.now();
      return [2
      /*return*/
      , new Promise(function () {
        var fn = function (now) {
          if (now === void 0) {
            now = performance.now();
          }

          var progress = Math.min(now / (start + duration), 1);
          cb(progress) && progress != 1 && requestAnimationFrame(fn);
        };

        requestAnimationFrame(fn);
      })];
    });
  });
};

function default_1() {
  return __awaiter(this, void 0, Promise, function () {
    var delay, isLoaded, loaded, status;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          delay = 1500;
          loaded = new Promise(function (res) {
            window.addEventListener('load', res);
          });
          loaded.then(function () {
            return isLoaded = true;
          });
          status = anim(delay, function (progress) {
            if (isLoaded) return false;
            setData(97 * progress);
            return true;
          });
          return [4
          /*yield*/
          , Promise.race([status, loaded])];

        case 1:
          _a.sent();

          return [4
          /*yield*/
          , setData(100)];

        case 2:
          _a.sent();

          document.querySelector('.preloader').classList.add('--off');
          return [2
          /*return*/
          ];
      }
    });
  });
}

exports.default = default_1;
var lastProgress = 0;
var timeout;

function setData(progress) {
  return __awaiter(this, void 0, void 0, function () {
    var diff, current;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          diff = progress - lastProgress;
          if (!(progress - lastProgress > 10)) return [3
          /*break*/
          , 2];
          current = diff / 2 + lastProgress;
          lastProgress = current;
          render(lastProgress);
          return [4
          /*yield*/
          , wait(500, function () {
            return setData(progress);
          })];

        case 1:
          _a.sent();

          _a.label = 2;

        case 2:
          if (lastProgress > progress) {
            return [2
            /*return*/
            ];
          }

          lastProgress = progress;
          render(lastProgress);
          return [2
          /*return*/
          ];
      }
    });
  });
}

function render(progress) {
  progress |= progress;
  document.querySelector('.preloader__value').innerHTML = progress.toString().padStart(3, '0');
}

function wait(time, cb) {
  return new Promise(function (res) {
    clearInterval(timeout);
    timeout = setTimeout(function () {
      return cb(), res();
    }, time);
  });
}
},{}],"js/header.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initHeader = void 0;
var header = document.querySelector('.header');
var height = header.getBoundingClientRect().height;
var wrapper = document.querySelector('.wrapper');

function initHeader() {
  window.addEventListener('scroll', function (event) {
    var scrollY = window.scrollY;

    if (scrollY > height) {
      header.classList.add('--hide');
      wrapper.style.paddingTop = height + "px";
    } else {
      header.classList.remove('--hide');
      wrapper.style.paddingTop = '';
    }

    if (scrollY > 400) {
      header.classList.add('--scroll');
    } else {
      header.classList.remove('--scroll');
    }
  });
}

exports.initHeader = initHeader;
},{}],"js/slider.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Slider =
/** @class */
function () {
  function Slider(el) {
    this._touchId = null;
    this.coordStart = 0;
    this.nextSlide = 0;
    this.prevSlide = 0;
    this.activeSlide = 0;
    this.container = document.querySelector(el);
    this.sliderWidth = this.container.getBoundingClientRect().width;
    this.slides = __spreadArrays(this.container.querySelectorAll('.slider__item'));
    this.listeners();
    this.touchListeners();
  }

  Object.defineProperty(Slider.prototype, "coordCurrent", {
    set: function (val) {
      this.progress = (this.coordStart - val) / this.sliderWidth;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Slider.prototype, "progress", {
    get: function () {
      return this._pr;
    },
    set: function (val) {
      this._pr = -val;
      this.move();
    },
    enumerable: false,
    configurable: true
  });

  Slider.prototype.listeners = function () {
    var _this = this;

    this.container.addEventListener('mousedown', function (event) {
      _this.isDragable = true;
    });
    document.addEventListener('mousemove', function (event) {
      if (!_this.isDragable) return;
    });
    document.addEventListener('mouseup', function (event) {
      _this.isDragable = false;
    });
  };

  Slider.prototype.touchListeners = function () {
    var _this = this;

    this.container.addEventListener('touchstart', function (event) {
      if (_this._touchId) return;

      _this.disableTransition();

      var _a = event.changedTouches[0],
          pageX = _a.pageX,
          identifier = _a.identifier;
      _this.coordStart = pageX;
      _this.coordCurrent = pageX;
      _this._touchId = identifier;
      _this.isDragable = true;
      console.log('start: ', event);
    });
    document.addEventListener('touchmove', function (event) {
      if (!_this.isDragable) return;

      var item = _this.findActiveTouch(event.changedTouches);

      if (!item) return;
      var pageX = item.pageX;
      _this.coordCurrent = pageX;
    });
    document.addEventListener('touchend', function (event) {
      _this.isDragable = false;

      var item = _this.findActiveTouch(event.changedTouches);

      if (!item) return;
      var pageX = item.pageX;
      _this.coordCurrent = pageX;

      _this.goTo(3);

      console.log('end: ', event);
    });
  };

  Slider.prototype.disableTransition = function () {};

  Slider.prototype.enableTransition = function () {};

  Slider.prototype.findActiveTouch = function (arr) {
    var items = __spreadArrays(arr);

    var _touchId = this._touchId;
    var item = items.find(function (item) {
      return _touchId === item.identifier;
    });
    return item;
  };

  Slider.prototype.goTo = function (slide) {
    this.nextSlide = slide;
    var slides = this.slides;
    this.enableTransition(); // switch(direction) {
    //   case -1: 
    //     slides[slide].classList.add('left')
    //   default:
    //     slides[slide].classList.add('right')
    // }
    // requestAnimationFrame(() => requestAnimationFrame(() => {
    //   this.slides.forEach((item, index) => {
    //     switch(true) {
    //       case i < slide:
    //         item.style.transform = `translateX(${-100}%)`
    //         break
    //       case slide:
    //         item.style.transform = `translateX(${0}%)`
    //         break
    //       case slide + 1:
    //         item.style.transform = `translateX(${100}%)`
    //         break
    //       default
    //     }
    //   })
    // }))
  };

  Slider.prototype.move = function () {
    var _a = this,
        slides = _a.slides,
        progress = _a.progress,
        activeSlide = _a.activeSlide;

    console.log(progress);

    if (progress > 0) {
      this.nextSlide = Math.max(activeSlide - 1, 0);
      this.prevSlide = Math.min(activeSlide + 1, slides.length);
    } else {
      this.nextSlide = Math.min(activeSlide + 1, slides.length);
      this.prevSlide = Math.max(activeSlide - 1, 0);
    }

    var _b = this,
        nextSlide = _b.nextSlide,
        prevSlide = _b.prevSlide;

    slides[nextSlide].style.transform = "translate3d(" + (nextSlide === activeSlide ? progress * 100 * .3 : progress * 100) + "%, 0, 0)";
    slides[prevSlide].style.transform = "";
  };

  return Slider;
}();

exports.default = Slider;
},{}],"js/animateBlocks.ts":[function(require,module,exports) {
"use strict";

var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  __spreadArrays(document.querySelectorAll('.animate')).forEach(function (item) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('--animated');
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: .5
    });
    observer.observe(item);
  });
};
},{}],"js/globalListeners.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clickOutside = clickOutside;
exports.keyupEsc = keyupEsc;
const listeners = [];
globalThis.addEventListener('click', event => {
  function isClickInside(event, el) {
    if (el instanceof Function) {
      el = el();
    }

    if (!el) {
      return;
    }

    if (event.path) {
      return event.path.includes(el);
    }

    if (document.body.contains(event.target)) {
      return el.contains(event.target);
    }

    return true;
  }

  listeners.forEach(([item, ignoreEls, cb]) => {
    var _ignoreEls$some;

    // 2 проверки, 1 надежная, 2 резервный план
    // если 1 метод не работает то он возвращает тру чтоб пошло ко 2
    if (isClickInside(event, item)) {
      return;
    }

    const isAllInside = (_ignoreEls$some = ignoreEls.some(el => isClickInside(event, el))) !== null && _ignoreEls$some !== void 0 ? _ignoreEls$some : true;

    if (isAllInside) {
      return;
    }

    cb(event, item);
  });
});
/**
 * 
 * @param {HTMLElement} target Элемент
 * @param {Array<HTMLElement|Function>} ignoreEls Массив элементов снаружи таргета, клик по которым тоже возможен, можно передать функцию которая вернет элемент
 * @param {Function} [callback] Коллбек после клика снаружи
 * @returns {Function} Функция удаления обработчика
 */

function clickOutside(target, ignoreEls, callback) {
  if (ignoreEls instanceof Function) {
    callback = ignoreEls;
    ignoreEls = [];
  }

  const arr = [target, ignoreEls, callback];
  listeners.push(arr);
  return () => {
    const index = listeners.indexOf(arr);

    if (!~index) {
      // если не нашло
      return;
    }

    listeners.splice(listeners.indexOf(arr), 1);
  };
}

const keyListeners = [];
globalThis.addEventListener('keyup', event => {
  keyListeners.forEach(([cb]) => {
    cb(event);
  });
});

function keyupEsc(callback) {
  const arr = [event => {
    const {
      which,
      code,
      key,
      keyCode
    } = event;

    if (which === 27 || keyCode === 27 || code === 'Escape' || key === 'Escape') {
      return callback(event);
    }
  }];
  keyListeners.push(arr);
  return () => {
    const index = keyListeners.indexOf(arr);

    if (!~index) {
      // если не нашло
      return;
    }

    keyListeners.splice(keyListeners.indexOf(arr), 1);
  };
}
},{}],"js/pop.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productTooltipInit = void 0;

var globalListeners_1 = require("./globalListeners");

function productTooltipInit() {
  var items = document.querySelectorAll('.productTooltip');
  var classes = ['--left', '--right'];
  items.forEach(function (item) {
    // @ts-ignore
    globalListeners_1.clickOutside(item, function () {
      item.classList.remove('--active');
    });
    item.querySelector('.productTooltip__icon').addEventListener('click', function (event) {
      var node = event.currentTarget;
      var block = item.querySelector('.productTooltip__info');

      if (!item.classList.contains('--active')) {
        Object.assign(block.style, {
          opacity: 0,
          transition: 'none'
        });
        item.classList.add('--active');

        var _a = block.getBoundingClientRect(),
            right = _a.right,
            left = _a.left,
            width = _a.width;

        var clientWidth = document.documentElement.clientWidth;

        if (clientWidth - right < 30) {
          item.classList.remove('--right');
          item.classList.add('--left');
        } else if (left < 30) {
          item.classList.add('--right');
          item.classList.remove('--left');
        }

        item.classList.remove('--active');
      }

      requestAnimationFrame(function () {
        return requestAnimationFrame(function () {
          Object.assign(block.style, {
            opacity: '',
            transition: ''
          });
          item.classList.toggle('--active');
        });
      });
    });
  });
}

exports.productTooltipInit = productTooltipInit;
},{"./globalListeners":"js/globalListeners.js"}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var preloader_1 = __importDefault(require("./js/preloader"));

var header_1 = require("./js/header");

var slider_1 = __importDefault(require("./js/slider"));

var animateBlocks_1 = __importDefault(require("./js/animateBlocks"));

new slider_1.default('.slider__container');

var pop_1 = require("./js/pop");

pop_1.productTooltipInit();
preloader_1.default().then(function () {
  animateBlocks_1.default();
  header_1.initHeader();
});
},{"./js/preloader":"js/preloader.ts","./js/header":"js/header.ts","./js/slider":"js/slider.ts","./js/animateBlocks":"js/animateBlocks.ts","./js/pop":"js/pop.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50540" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map