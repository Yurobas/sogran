// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"671c5a694df60ad825952deb7e9f1dc4":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "36361745be5d2d208fd9101ffd88712e";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

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
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
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
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
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

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
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
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"7843b3960e086726267ff606847fc92b":[function(require,module,exports) {
"use strict";

var _preloader = _interopRequireDefault(require("./js/preloader"));

var _slider = _interopRequireDefault(require("./js/slider"));

var _animateBlocks = _interopRequireDefault(require("./js/animateBlocks"));

var _pop = require("./js/pop");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _slider.default('.slider__container');
(0, _pop.productTooltipInit)();
(0, _preloader.default)().then(() => {
  (0, _animateBlocks.default)();
});
},{"./js/preloader":"bd37514b50be011a101e245a9c70f959","./js/slider":"77d040d54dee718def920990509635da","./js/pop":"87197f6416ae38f80df3574a30b3d172","./js/animateBlocks":"f6626a1b73bd4d8e99225c08a5d2eb67"}],"bd37514b50be011a101e245a9c70f959":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

const anim = async (duration, cb) => {
  const start = performance.now();
  return new Promise(() => {
    const fn = (now = performance.now()) => {
      const progress = Math.min(now / (start + duration), 1);
      cb(progress) && progress != 1 && requestAnimationFrame(fn);
    };

    requestAnimationFrame(fn);
  });
};

async function _default() {
  const delay = 1500;
  let isLoaded;
  const loaded = new Promise(res => {
    window.addEventListener('load', res);
  });
  loaded.then(() => isLoaded = true);
  const status = anim(delay, progress => {
    if (isLoaded) return false;
    setData(97 * progress);
    return true;
  });
  await Promise.race([status, loaded]);
  await setData(100);
  document.querySelector('.preloader').classList.add('--off');
}

let lastProgress = 0;
let timeout;

async function setData(progress) {
  const diff = progress - lastProgress;

  if (progress - lastProgress > 10) {
    let current = diff / 2 + lastProgress;
    lastProgress = current;
    render(lastProgress);
    await wait(500, () => setData(progress));
  }

  if (lastProgress > progress) {
    return;
  }

  lastProgress = progress;
  render(lastProgress);
}

function render(progress) {
  progress |= progress;
  document.querySelector('.preloader__value').innerHTML = progress.toString().padStart(3, '0');
}

function wait(time, cb) {
  return new Promise(res => {
    clearInterval(timeout);
    timeout = setTimeout(() => (cb(), res()), time);
  });
}
},{}],"77d040d54dee718def920990509635da":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Slider {
  _touchId = null;
  coordStart = 0;
  nextSlide = 0;
  prevSlide = 0;
  activeSlide = 0;

  constructor(el) {
    this.container = document.querySelector(el);
    this.sliderWidth = this.container.getBoundingClientRect().width;
    this.slides = [...this.container.querySelectorAll('.slider__item')];
    this.listeners();
    this.touchListeners();
  }

  set coordCurrent(val) {
    this.progress = (this.coordStart - val) / this.sliderWidth;
  }

  set progress(val) {
    this._pr = -val;
    this.move();
  }

  get progress() {
    return this._pr;
  }

  listeners() {
    this.container.addEventListener('mousedown', event => {
      this.isDragable = true;
    });
    document.addEventListener('mousemove', event => {
      if (!this.isDragable) return;
    });
    document.addEventListener('mouseup', event => {
      this.isDragable = false;
    });
  }

  touchListeners() {
    this.container.addEventListener('touchstart', event => {
      if (this._touchId) return;
      this.disableTransition();
      const {
        pageX,
        identifier
      } = event.changedTouches[0];
      this.coordStart = pageX;
      this.coordCurrent = pageX;
      this._touchId = identifier;
      this.isDragable = true;
      console.log('start: ', event);
    });
    document.addEventListener('touchmove', event => {
      if (!this.isDragable) return;
      const item = this.findActiveTouch(event.changedTouches);
      if (!item) return;
      const {
        pageX
      } = item;
      this.coordCurrent = pageX;
    });
    document.addEventListener('touchend', event => {
      this.isDragable = false;
      const item = this.findActiveTouch(event.changedTouches);
      if (!item) return;
      const {
        pageX
      } = item;
      this.coordCurrent = pageX;
      this.goTo(3);
      console.log('end: ', event);
    });
  }

  disableTransition() {}

  enableTransition() {}

  findActiveTouch(arr) {
    const items = [...arr];
    const {
      _touchId
    } = this;
    const item = items.find(item => _touchId === item.identifier);
    return item;
  }

  goTo(slide) {
    this.nextSlide = slide;
    const {
      slides
    } = this;
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
  }

  move() {
    const {
      slides,
      progress,
      activeSlide
    } = this;
    console.log(progress);

    if (progress > 0) {
      this.nextSlide = Math.max(activeSlide - 1, 0);
      this.prevSlide = Math.min(activeSlide + 1, slides.length);
    } else {
      this.nextSlide = Math.min(activeSlide + 1, slides.length);
      this.prevSlide = Math.max(activeSlide - 1, 0);
    }

    const {
      nextSlide,
      prevSlide
    } = this;
    slides[nextSlide].style.transform = `translate3d(${nextSlide === activeSlide ? progress * 100 * .3 : progress * 100}%, 0, 0)`;
    slides[prevSlide].style.transform = ``;
  }

}

exports.default = Slider;
},{}],"87197f6416ae38f80df3574a30b3d172":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productTooltipInit = productTooltipInit;

var _globalListeners = require("./globalListeners");

function productTooltipInit() {
  const items = document.querySelectorAll('.productTooltip');
  const classes = ['--left', '--right'];
  items.forEach(item => {
    // @ts-ignore
    (0, _globalListeners.clickOutside)(item, () => {
      item.classList.remove('--active');
    });
    item.querySelector('.productTooltip__icon').addEventListener('click', event => {
      const node = event.currentTarget;
      const block = item.querySelector('.productTooltip__info');

      if (!item.classList.contains('--active')) {
        Object.assign(block.style, {
          opacity: 0,
          transition: 'none'
        });
        item.classList.add('--active');
        const {
          right,
          left,
          width
        } = block.getBoundingClientRect();
        const {
          documentElement: {
            clientWidth
          }
        } = document;

        if (clientWidth - right < 30) {
          item.classList.remove('--right');
          item.classList.add('--left');
        } else if (left < 30) {
          item.classList.add('--right');
          item.classList.remove('--left');
        }

        item.classList.remove('--active');
      }

      requestAnimationFrame(() => requestAnimationFrame(() => {
        Object.assign(block.style, {
          opacity: '',
          transition: ''
        });
        item.classList.toggle('--active');
      }));
    });
  });
}
},{"./globalListeners":"5a52a410d912921ed9195b66ee527565"}],"5a52a410d912921ed9195b66ee527565":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clickOutside = clickOutside;
exports.keyupEsc = keyupEsc;
const listeners = [];
globalThis?.addEventListener('click', event => {
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
    // 2 проверки, 1 надежная, 2 резервный план
    // если 1 метод не работает то он возвращает тру чтоб пошло ко 2
    if (isClickInside(event, item)) {
      return;
    }

    const isAllInside = ignoreEls?.some(el => isClickInside(event, el)) ?? true;

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
globalThis?.addEventListener('keyup', event => {
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
},{}],"f6626a1b73bd4d8e99225c08a5d2eb67":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = () => {
  [...document.querySelectorAll('.animate')].forEach(item => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
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

exports.default = _default;
},{}]},{},["671c5a694df60ad825952deb7e9f1dc4","7843b3960e086726267ff606847fc92b"], null)

//# sourceMappingURL=sanya.36361745.js.map
