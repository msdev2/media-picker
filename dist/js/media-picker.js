/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/resources/assets/js/api.js":
/*!****************************************!*\
  !*** ./src/resources/assets/js/api.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return _regeneratorDefine2(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function d(t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () {
    return this;
  }), _regeneratorDefine2(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function _regenerator() {
    return {
      w: i,
      m: f
    };
  })();
}
function _regeneratorDefine2(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine2(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine2(e, r, n, t);
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function postData(_x, _x2) {
  return _postData.apply(this, arguments);
}
function _postData() {
  _postData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(endpoint, formData) {
    var _document$querySelect;
    var csrfToken, response, result, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          csrfToken = (_document$querySelect = document.querySelector('meta[name="csrf-token"]')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute('content');
          _context.p = 1;
          _context.n = 2;
          return fetch("/media-picker/".concat(endpoint), {
            method: 'POST',
            body: formData,
            headers: {
              'X-CSRF-TOKEN': csrfToken,
              'Accept': 'application/json'
            }
          });
        case 2:
          response = _context.v;
          _context.n = 3;
          return response.json();
        case 3:
          result = _context.v;
          if (response.ok) {
            _context.n = 4;
            break;
          }
          throw new Error(result.message || 'An unknown error occurred.');
        case 4:
          return _context.a(2, result);
        case 5:
          _context.p = 5;
          _t = _context.v;
          alert(_t.message);
          throw _t;
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[1, 5]]);
  }));
  return _postData.apply(this, arguments);
}

/***/ }),

/***/ "./src/resources/assets/js/app.js":
/*!****************************************!*\
  !*** ./src/resources/assets/js/app.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_MediaPicker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/MediaPicker.js */ "./src/resources/assets/js/components/MediaPicker.js");
/* harmony import */ var _components_Editor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Editor.js */ "./src/resources/assets/js/components/Editor.js");
/* harmony import */ var _components_ModalManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ModalManager.js */ "./src/resources/assets/js/components/ModalManager.js");



// We don't need to import MoveModal here as it's a dependency of MediaPicker

document.addEventListener('DOMContentLoaded', function () {
  // 1. Initialize all inline pickers
  document.querySelectorAll('.ms-media-picker-container[data-is-inline="true"]').forEach(function (el) {
    new _components_MediaPicker_js__WEBPACK_IMPORTED_MODULE_0__["default"](el, {
      isInline: true
    });
  });

  // 2. Initialize all standalone modal trigger buttons
  document.querySelectorAll('button.ms-media-picker').forEach(function (button) {
    button.addEventListener('click', function () {
      var selector = button.dataset.targetSelector;
      var type = button.dataset.targetType;

      // This is for the automatic data-attribute functionality
      var callback = function callback(file) {
        if (!selector || !type) return; // Only run if data attributes are present
        var target = document.querySelector(selector);
        if (!target) return console.error("Target element \"".concat(selector, "\" not found."));
        if (type === 'input') target.value = file.url;else if (type === 'image') target.src = file.url;else if (type === 'html') target.innerHTML = "<img src=\"".concat(file.url, "\" alt=\"").concat(file.name, "\" style=\"max-width:100%;\">");
      };
      var targetElement = selector ? document.querySelector(selector) : null;
      var acceptString = targetElement ? targetElement.accept : '';

      // CRITICAL FIX: Pass the button itself as the trigger element.
      _components_ModalManager_js__WEBPACK_IMPORTED_MODULE_2__["default"].open(callback, acceptString, button);
    });
  });

  // 3. Initialize all editors
  document.querySelectorAll('.ms-media-editor-container').forEach(function (el) {
    new _components_Editor_js__WEBPACK_IMPORTED_MODULE_1__["default"](el);
  });
});

/***/ }),

/***/ "./src/resources/assets/js/components/Editor.js":
/*!******************************************************!*\
  !*** ./src/resources/assets/js/components/Editor.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ModalManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalManager.js */ "./src/resources/assets/js/components/ModalManager.js");
/* harmony import */ var _Toast_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Toast.js */ "./src/resources/assets/js/components/Toast.js");
/* harmony import */ var _PromptModal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PromptModal.js */ "./src/resources/assets/js/components/PromptModal.js");
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return _regeneratorDefine2(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function d(t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () {
    return this;
  }), _regeneratorDefine2(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function _regenerator() {
    return {
      w: i,
      m: f
    };
  })();
}
function _regeneratorDefine2(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine2(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine2(e, r, n, t);
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}



var Editor = /*#__PURE__*/function () {
  function Editor(element) {
    _classCallCheck(this, Editor);
    this.element = element;
    this.ui = {
      content: this.element.querySelector('.ms-editor-content'),
      code: this.element.querySelector('.ms-editor-code'),
      formInput: this.element.querySelector('.ms-editor-form-input'),
      toolbar: this.element.querySelector('.ms-editor-toolbar'),
      editModal: document.querySelector('.ms-media-edit-modal-backdrop')
    };
    this.state = {
      codeViewActive: false
    };
    this.savedSelection = null; // NEW: Property to store the selection
    this.init();
  }
  return _createClass(Editor, [{
    key: "init",
    value: function init() {
      var _this = this;
      this.sync();
      this.ui.content.addEventListener('input', function () {
        return _this.sync();
      });
      this.ui.code.addEventListener('input', function () {
        return _this.sync();
      });
      this.ui.toolbar.addEventListener('click', function (e) {
        return _this.handleToolbarClick(e);
      });
      this.ui.toolbar.addEventListener('change', function (e) {
        return _this.handleToolbarChange(e);
      });
      this.ui.content.addEventListener('dblclick', function (e) {
        return _this.handleMediaDoubleClick(e);
      });

      // CRITICAL FIX: Add a mousedown listener to the toolbar to save the selection
      // before focus is lost to a color picker or other UI element.
      this.ui.toolbar.addEventListener('mousedown', function (e) {
        _this.savedSelection = _this.saveSelection();
      });
    }
  }, {
    key: "sync",
    value: function sync() {
      if (this.state.codeViewActive) {
        this.ui.content.innerHTML = this.ui.code.value;
      } else {
        this.ui.code.value = this.ui.content.innerHTML;
      }
      this.ui.formInput.value = this.ui.content.innerHTML;
    }
  }, {
    key: "handleToolbarClick",
    value: function handleToolbarClick(e) {
      var target = e.target.closest('button');
      if (!target) return;
      e.preventDefault();
      var command = target.dataset.command;

      // Clicks on color picker labels should trigger the hidden input
      if (target.parentElement.classList.contains('ms-editor-tool-wrapper')) {
        target.parentElement.querySelector('input[type="color"]').click();
        return;
      }
      if (target.classList.contains('ms-code-view-btn')) {
        this.toggleCodeView(target);
      } else if (target.classList.contains('ms-add-media-btn')) {
        this.openMediaModal(target.dataset.mediaType);
      } else {
        this.execCmd(command);
      }
    }
  }, {
    key: "handleToolbarChange",
    value: function handleToolbarChange(e) {
      var target = e.target.closest('select, input[type="color"]');
      if (!target) return;
      e.preventDefault();
      var command = target.dataset.command;
      this.restoreSelection(this.savedSelection); // Restore the selection
      this.execCmd(command, target.value); // Then execute the command
    }
  }, {
    key: "toggleCodeView",
    value: function toggleCodeView(button) {
      this.state.codeViewActive = !this.state.codeViewActive;
      button.classList.toggle('active', this.state.codeViewActive);
      this.sync();
      this.ui.content.style.display = this.state.codeViewActive ? 'none' : 'block';
      this.ui.code.style.display = this.state.codeViewActive ? 'block' : 'none';
    }
  }, {
    key: "openMediaModal",
    value: function openMediaModal(mediaType) {
      var _this2 = this;
      var savedSelection = this.saveSelection();
      _ModalManager_js__WEBPACK_IMPORTED_MODULE_0__["default"].open(function (file) {
        var isImage = file.name.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i);
        var isVideo = file.name.match(/\.(mp4|webm|ogg)$/i);
        if (mediaType === 'image' && !isImage || mediaType === 'video' && !isVideo) {
          return _Toast_js__WEBPACK_IMPORTED_MODULE_1__["default"].show("Please select a valid ".concat(mediaType, " file."), 'error');
        }
        _this2.openEditDialog({
          type: mediaType,
          src: file.url,
          alt: file.name
        }, savedSelection);
      });
    }
  }, {
    key: "handleMediaDoubleClick",
    value: function handleMediaDoubleClick(e) {
      var target = e.target;
      if (target.tagName === 'IMG' || target.tagName === 'VIDEO') {
        e.preventDefault();
        var align = '';
        if (target.style["float"] === 'left' || target.style["float"] === 'right') {
          align = target.style["float"];
        } else if (target.style.display === 'block' && (target.style.marginLeft === 'auto' || target.style.marginRight === 'auto')) {
          align = 'center';
        }
        var data = {
          type: target.tagName.toLowerCase(),
          src: target.getAttribute('src'),
          alt: target.alt,
          width: target.style.width.replace('px', ''),
          height: target.style.height.replace('px', ''),
          id: target.id,
          className: target.className,
          align: align
        };
        this.openEditDialog(data, null, target);
      }
    }
  }, {
    key: "openEditDialog",
    value: function openEditDialog(data, savedSelection) {
      var _this3 = this;
      var editingElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var modal = this.ui.editModal;
      if (!modal) return console.error("Edit Media Modal not found in DOM.");
      var title = modal.querySelector('#ms-media-edit-title');
      var previewImg = modal.querySelector('#ms-media-edit-preview-img');
      var previewVideo = modal.querySelector('#ms-media-edit-preview-video');
      var altInput = modal.querySelector('#ms-media-edit-alt');
      var widthInput = modal.querySelector('#ms-media-edit-width');
      var heightInput = modal.querySelector('#ms-media-edit-height');
      var alignSelect = modal.querySelector('#ms-media-edit-align');
      var classInput = modal.querySelector('#ms-media-edit-class');
      var idInput = modal.querySelector('#ms-media-edit-id');
      var insertBtn = modal.querySelector('#ms-media-edit-insert-btn');
      var cancelBtn = modal.querySelector('#ms-media-edit-cancel-btn');
      var closeBtn = modal.querySelector('.ms-media-edit-modal-close');
      title.textContent = editingElement ? 'Edit Media' : 'Insert Media';
      insertBtn.textContent = editingElement ? 'Update' : 'Insert';
      previewImg.style.display = 'none';
      previewVideo.style.display = 'none';
      if (data.type === 'image' || data.type === 'img') {
        previewImg.style.display = 'block';
        previewImg.src = data.src;
      } else if (data.type === 'video') {
        previewVideo.style.display = 'block';
        previewVideo.src = data.src;
      }
      altInput.value = data.alt || '';
      widthInput.value = data.width || '';
      heightInput.value = data.height || '';
      alignSelect.value = data.align || '';
      classInput.value = data.className || '';
      idInput.value = data.id || '';
      modal.style.display = 'flex';
      var cleanup = function cleanup() {
        modal.style.display = 'none';
        insertBtn.onclick = null;
        cancelBtn.onclick = null;
        closeBtn.onclick = null;
      };
      var onInsert = function onInsert() {
        var element;
        if (editingElement) {
          element = editingElement;
        } else {
          element = document.createElement(data.type === 'image' ? 'img' : data.type);
          element.src = data.src;
        }
        element.alt = altInput.value;
        element.id = idInput.value;
        element.className = classInput.value;
        element.style.width = widthInput.value ? "".concat(widthInput.value, "px") : '';
        element.style.height = heightInput.value ? "".concat(heightInput.value, "px") : '';
        var align = alignSelect.value;
        element.style["float"] = align === 'left' || align === 'right' ? align : '';
        element.style.display = align === 'center' ? 'block' : '';
        element.style.marginLeft = align === 'center' ? 'auto' : '';
        element.style.marginRight = align === 'center' ? 'auto' : '';
        if (!editingElement) {
          _this3._insertHtmlAtSelection(element, savedSelection);
        }
        _this3.sync();
        cleanup();
      };
      insertBtn.onclick = onInsert;
      cancelBtn.onclick = cleanup;
      closeBtn.onclick = cleanup;
    }
  }, {
    key: "_insertHtmlAtSelection",
    value: function _insertHtmlAtSelection(element, range) {
      this.ui.content.focus();
      if (!range) {
        this.ui.content.appendChild(element);
        return;
      }
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      range.deleteContents();
      range.insertNode(element);
      range = range.cloneRange();
      range.setStartAfter(element);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, {
    key: "execCmd",
    value: function execCmd(command) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!command) return;
      if (command === 'createLink') {
        this.openLinkDialog();
        return;
      }
      document.execCommand(command, false, value);
      this.ui.content.focus();
    }
  }, {
    key: "openLinkDialog",
    value: function () {
      var _openLinkDialog = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var savedSelection, anchorEl, prompt, result, newAnchor;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              savedSelection = this.saveSelection();
              anchorEl = this._getAnchorElement(savedSelection);
              if (!(!anchorEl && savedSelection && savedSelection.collapsed)) {
                _context.n = 1;
                break;
              }
              return _context.a(2, _Toast_js__WEBPACK_IMPORTED_MODULE_1__["default"].show("Please select some text to create a link.", "error"));
            case 1:
              prompt = new _PromptModal_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
              _context.n = 2;
              return prompt.open({
                title: anchorEl ? 'Edit Link' : 'Insert Link',
                confirmText: anchorEl ? 'Update' : 'Insert',
                fields: [{
                  type: 'url',
                  name: 'url',
                  label: 'URL',
                  value: anchorEl ? anchorEl.getAttribute('href') : 'https://',
                  placeholder: 'https://example.com'
                }, {
                  type: 'checkbox',
                  name: 'newTab',
                  label: 'Open in new tab',
                  checked: anchorEl ? anchorEl.target === '_blank' : false
                }]
              });
            case 2:
              result = _context.v;
              if (result && result.url) {
                this.restoreSelection(savedSelection);
                document.execCommand('createLink', false, result.url);
                newAnchor = this._getAnchorElement(this.saveSelection());
                if (newAnchor) {
                  if (result.newTab) {
                    newAnchor.target = '_blank';
                    newAnchor.rel = 'noopener noreferrer';
                  } else {
                    newAnchor.removeAttribute('target');
                    newAnchor.removeAttribute('rel');
                  }
                }
                this.sync();
              }
            case 3:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function openLinkDialog() {
        return _openLinkDialog.apply(this, arguments);
      }
      return openLinkDialog;
    }()
  }, {
    key: "_getAnchorElement",
    value: function _getAnchorElement(selection) {
      if (!selection) return null;
      var node = selection.startContainer;
      if (node.nodeType === Node.TEXT_NODE) {
        node = node.parentNode;
      }
      return node.closest('a');
    }
  }, {
    key: "saveSelection",
    value: function saveSelection() {
      var selection = window.getSelection();
      if (selection.rangeCount > 0 && this.ui.content.contains(selection.anchorNode)) {
        return selection.getRangeAt(0);
      }
      return null;
    }
  }, {
    key: "restoreSelection",
    value: function restoreSelection(range) {
      if (range) {
        this.ui.content.focus();
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Editor);

/***/ }),

/***/ "./src/resources/assets/js/components/MediaPicker.js":
/*!***********************************************************!*\
  !*** ./src/resources/assets/js/components/MediaPicker.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api.js */ "./src/resources/assets/js/api.js");
/* harmony import */ var _MoveModal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MoveModal.js */ "./src/resources/assets/js/components/MoveModal.js");
/* harmony import */ var _PromptModal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PromptModal.js */ "./src/resources/assets/js/components/PromptModal.js");
/* harmony import */ var _Toast_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Toast.js */ "./src/resources/assets/js/components/Toast.js");
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return _regeneratorDefine2(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function d(t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () {
    return this;
  }), _regeneratorDefine2(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function _regenerator() {
    return {
      w: i,
      m: f
    };
  })();
}
function _regeneratorDefine2(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine2(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine2(e, r, n, t);
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}




var MediaPicker = /*#__PURE__*/function () {
  function MediaPicker(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, MediaPicker);
    this.element = element;
    this.options = _objectSpread({
      isInline: false,
      onSelect: null
    }, options);
    this.state = {
      currentPath: '/',
      selectedFile: null,
      contents: {
        files: [],
        directories: [],
        all_directories: []
      }
    };
    this.ui = {
      body: this.element.querySelector('.ms-media-body'),
      breadcrumbs: this.element.querySelector('.ms-media-breadcrumbs'),
      loader: this.element.querySelector('.ms-media-loader'),
      selectBtn: this.element.querySelector('.ms-select-file-btn'),
      actionsPanel: this.element.querySelector('.ms-media-actions-panel'),
      createFolderBtn: this.element.querySelector('.ms-create-folder-btn'),
      uploadInput: this.element.querySelector('.ms-upload-file-input'),
      folderTree: this.element.querySelector('.ms-media-folder-tree')
    };
    this.attachEventListeners();
    this.loadContents('/');
  }
  return _createClass(MediaPicker, [{
    key: "attachEventListeners",
    value: function attachEventListeners() {
      var _this = this;
      if (this.ui.body) this.ui.body.addEventListener('click', function (e) {
        return _this.handleItemClick(e);
      });
      if (this.ui.folderTree) this.ui.folderTree.addEventListener('click', function (e) {
        return _this.handleFolderTreeClick(e);
      });
      if (this.ui.createFolderBtn) this.ui.createFolderBtn.addEventListener('click', function () {
        return _this.createFolder();
      });
      if (this.ui.uploadInput) this.ui.uploadInput.addEventListener('change', function (e) {
        return _this.uploadFile(e);
      });
      if (this.ui.breadcrumbs) this.ui.breadcrumbs.addEventListener('click', function (e) {
        return _this.handleBreadcrumbClick(e);
      });
      if (this.ui.selectBtn) this.ui.selectBtn.addEventListener('click', function () {
        return _this.handleSelect();
      });
      if (this.ui.actionsPanel) {
        var query = function query(selector) {
          return _this.ui.actionsPanel.querySelector(selector);
        };
        var closeBtn = query('.actions-panel-close'),
          copyBtn = query('.copy-url-btn'),
          resizeBtn = query('.get-resized-url-btn'),
          renameBtn = query('.rename-btn'),
          moveBtn = query('.move-btn'),
          deleteBtn = query('.delete-btn');
        if (closeBtn) closeBtn.addEventListener('click', function () {
          return _this.hideActionsPanel();
        });
        if (copyBtn) copyBtn.addEventListener('click', function () {
          return _this.copyToClipboard('.file-url-input');
        });
        if (resizeBtn) resizeBtn.addEventListener('click', function () {
          return _this.getResizedUrl();
        });
        if (renameBtn) renameBtn.addEventListener('click', function () {
          return _this.renameItem();
        });
        if (moveBtn) moveBtn.addEventListener('click', function () {
          return _this.moveItem();
        });
        if (deleteBtn) deleteBtn.addEventListener('click', function () {
          return _this.deleteItem();
        });
      }
    }
  }, {
    key: "loadContents",
    value: function () {
      var _loadContents = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(folder) {
        var data, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              this.showLoader(true);
              this.hideActionsPanel();
              this.state.currentPath = folder;
              _context.p = 1;
              _context.n = 2;
              return fetch("/media-picker/get-contents?folder=".concat(encodeURIComponent(folder))).then(function (res) {
                return res.json();
              });
            case 2:
              data = _context.v;
              this.state.contents = data;
              this.render();
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _t = _context.v;
              console.error("Failed to load contents:", _t);
            case 4:
              _context.p = 4;
              this.showLoader(false);
              return _context.f(4);
            case 5:
              return _context.a(2);
          }
        }, _callee, this, [[1, 3, 4, 5]]);
      }));
      function loadContents(_x) {
        return _loadContents.apply(this, arguments);
      }
      return loadContents;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      if (this.ui.breadcrumbs) {
        this.ui.breadcrumbs.innerHTML = this.state.contents.breadcrumbs.map(function (crumb, i) {
          return i === _this2.state.contents.breadcrumbs.length - 1 ? "<span>".concat(crumb.name, "</span>") : "<a href=\"#\" data-path=\"".concat(crumb.path, "\">").concat(crumb.name, "</a> &gt;");
        }).join(' ');
      }
      if (this.ui.body) {
        this.ui.body.innerHTML = '';
        this.state.contents.directories.forEach(function (dir) {
          return _this2.ui.body.insertAdjacentHTML('beforeend', _this2.renderItem(dir));
        });
        this.state.contents.files.forEach(function (file) {
          return _this2.ui.body.insertAdjacentHTML('beforeend', _this2.renderItem(file));
        });
      }
      if (this.ui.folderTree) {
        this.ui.folderTree.innerHTML = this.buildTreeHTML(this.state.contents.all_directories);
      }
    }
  }, {
    key: "buildTreeHTML",
    value: function buildTreeHTML(nodes) {
      var _this3 = this;
      var html = '<ul>';
      nodes.forEach(function (node) {
        var isActive = _this3.state.currentPath === node.path;
        html += "<li><a href=\"#\" class=\"".concat(isActive ? 'active' : '', "\" data-path=\"").concat(node.path, "\">\uD83D\uDCC1 ").concat(node.name, "</a>");
        if (node.children && node.children.length > 0) {
          html += _this3.buildTreeHTML(node.children);
        }
        html += '</li>';
      });
      html += '</ul>';
      return html;
    }
  }, {
    key: "handleItemClick",
    value: function handleItemClick(e) {
      var itemEl = e.target.closest('.ms-media-item');
      if (!itemEl) return;
      var type = itemEl.dataset.type;
      if (type === 'directory') {
        this.loadContents(itemEl.dataset.path);
      } else {
        console.log('%c[MediaPicker] Step 3: A file was clicked.', 'color: blue; font-weight: bold;');
        this.selectItem(itemEl);
      }
    }
  }, {
    key: "handleFolderTreeClick",
    value: function handleFolderTreeClick(e) {
      e.preventDefault();
      var link = e.target.closest('a');
      if (link && link.dataset.path) this.loadContents(link.dataset.path);
    }
  }, {
    key: "renderFolderTree",
    value: function renderFolderTree(nodes, container) {
      var _this4 = this;
      var html = '<ul>';
      nodes.forEach(function (node) {
        var isActive = _this4.state.currentPath === node.path;
        html += "<li><a href=\"#\" class=\"".concat(isActive ? 'active' : '', "\" data-path=\"").concat(node.path, "\">\uD83D\uDCC1 ").concat(node.name, "</a>");
        if (node.children && node.children.length > 0) {
          html += _this4.renderFolderTree(node.children, container); // Recursive call
        }
        html += '</li>';
      });
      html += '</ul>';
      container.innerHTML = html;
      return html; // Return html for modals
    }
  }, {
    key: "selectItem",
    value: function selectItem(itemEl) {
      this.element.querySelectorAll('.ms-media-item.selected').forEach(function (el) {
        return el.classList.remove('selected');
      });
      itemEl.classList.add('selected');
      this.state.selectedFile = JSON.parse(itemEl.dataset.item);
      if (this.ui.selectBtn) this.ui.selectBtn.disabled = this.state.selectedFile.type !== 'file';
      if (this.state.selectedFile.type === 'file') {
        if (this.options.isInline) {
          this.showActionsPanel();
        } else {
          console.log('[MediaPicker] This is a modal picker. Calling handleSelect() to trigger the callback...');
          this.handleSelect();
        }
      } else {
        this.hideActionsPanel();
      }
    }
  }, {
    key: "renderItem",
    value: function renderItem(item) {
      var preview = item.is_image ? "<img src=\"".concat(item.url, "\" alt=\"").concat(item.name, "\" loading=\"lazy\">") : "<div class=\"ms-media-item-icon\">".concat(item.type === 'directory' ? '📁' : '📄', "</div>");
      return "\n            <div class=\"ms-media-item\" data-path=\"".concat(item.path, "\" data-type=\"").concat(item.type, "\" data-item='").concat(JSON.stringify(item), "'>\n                ").concat(preview, "\n                <div class=\"ms-media-item-name\">").concat(item.name, "</div>\n            </div>\n        ");
    }
  }, {
    key: "handleSelect",
    value: function handleSelect() {
      if (this.state.selectedFile && this.state.selectedFile.type === 'file' && this.options.onSelect) {
        // CRITICAL FIX: Create a clean object for the callback.
        // This ensures that `file.url` is ALWAYS the public URL for external use.
        var fileForCallback = {
          name: this.state.selectedFile.name,
          url: this.state.selectedFile.public_url,
          // Use the correct public URL
          path: this.state.selectedFile.path,
          size: this.state.selectedFile.size,
          is_image: this.state.selectedFile.is_image
        };
        this.options.onSelect(fileForCallback);
      }
    }
  }, {
    key: "handleBreadcrumbClick",
    value: function handleBreadcrumbClick(e) {
      e.preventDefault();
      if (e.target.tagName === 'A') this.loadContents(e.target.dataset.path);
    }
  }, {
    key: "showActionsPanel",
    value: function showActionsPanel() {
      var file = this.state.selectedFile;
      if (!file || !this.ui.actionsPanel) return;
      var panel = this.ui.actionsPanel;
      panel.querySelector('.file-name').textContent = file.name;
      panel.querySelector('.file-size').textContent = "".concat((file.size / 1024).toFixed(2), " KB");
      panel.querySelector('.file-modified').textContent = "Modified: ".concat(new Date(file.last_modified * 1000).toLocaleDateString());

      // Use the REAL public URL here.
      panel.querySelector('.file-url-input').value = file.public_url;
      panel.querySelector('.actions-panel-preview').innerHTML = file.is_image ? "<img src=\"".concat(file.url, "\" alt=\"Preview\">") : "<div class=\"file-icon\">\uD83D\uDCC4</div>";
      panel.style.display = 'flex';
    }
  }, {
    key: "hideActionsPanel",
    value: function hideActionsPanel() {
      this.state.selectedFile = null;
      if (this.ui.selectBtn) this.ui.selectBtn.disabled = true;
      this.element.querySelectorAll('.ms-media-item.selected').forEach(function (el) {
        return el.classList.remove('selected');
      });
      if (this.ui.actionsPanel) this.ui.actionsPanel.style.display = 'none';
    }
  }, {
    key: "createFolder",
    value: function () {
      var _createFolder = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var _this5 = this;
        var prompt, name, formData;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              prompt = new _PromptModal_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
              _context2.n = 1;
              return prompt.open({
                title: 'Create New Folder',
                inputLabel: 'Folder Name',
                confirmText: 'Create'
              });
            case 1:
              name = _context2.v;
              if (!name) {
                _context2.n = 2;
                break;
              }
              // Only proceed if user confirmed
              formData = new FormData();
              formData.append('folder_name', name);
              formData.append('current_path', this.state.currentPath);
              _context2.n = 2;
              return (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.postData)('create-folder', formData).then(function () {
                return _this5.loadContents(_this5.state.currentPath);
              })["catch"](function () {});
            case 2:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function createFolder() {
        return _createFolder.apply(this, arguments);
      }
      return createFolder;
    }()
  }, {
    key: "uploadFile",
    value: function () {
      var _uploadFile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(e) {
        var _this6 = this;
        var file, formData;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              file = e.target.files[0];
              if (file) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              formData = new FormData();
              formData.append('file', file);
              formData.append('current_path', this.state.currentPath);
              _context3.n = 2;
              return (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.postData)('upload', formData).then(function () {
                return _this6.loadContents(_this6.state.currentPath);
              })["catch"](function () {});
            case 2:
              e.target.value = '';
            case 3:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function uploadFile(_x2) {
        return _uploadFile.apply(this, arguments);
      }
      return uploadFile;
    }()
  }, {
    key: "renameItem",
    value: function () {
      var _renameItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _this7 = this;
        var file, prompt, newName, formData;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              file = this.state.selectedFile;
              if (file) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              prompt = new _PromptModal_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
              _context4.n = 2;
              return prompt.open({
                title: "Rename ".concat(file.type),
                inputLabel: 'New Name',
                initialValue: file.name,
                confirmText: 'Rename'
              });
            case 2:
              newName = _context4.v;
              if (!(newName && newName !== file.name)) {
                _context4.n = 3;
                break;
              }
              formData = new FormData();
              formData.append('path', file.path);
              formData.append('new_name', newName);
              _context4.n = 3;
              return (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.postData)('rename', formData).then(function () {
                _Toast_js__WEBPACK_IMPORTED_MODULE_3__["default"].show('Item renamed successfully.'); // <-- Use new Toast
                _this7.loadContents(_this7.state.currentPath);
              })["catch"](function () {});
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function renameItem() {
        return _renameItem.apply(this, arguments);
      }
      return renameItem;
    }()
  }, {
    key: "moveItem",
    value: function () {
      var _moveItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
        var _this8 = this;
        var file, currentParentPath, moveModal, destination, formData;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              file = this.state.selectedFile;
              if (file) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              currentParentPath = file.path.substring(0, file.path.lastIndexOf('/')) || '/';
              moveModal = new _MoveModal_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
              _context5.n = 2;
              return moveModal.open(this.state.contents.all_directories, currentParentPath);
            case 2:
              destination = _context5.v;
              if (!(destination !== null)) {
                _context5.n = 3;
                break;
              }
              formData = new FormData();
              formData.append('path', file.path);
              formData.append('destination', destination);
              _context5.n = 3;
              return (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.postData)('move', formData).then(function () {
                return _this8.loadContents(_this8.state.currentPath);
              })["catch"](function () {});
            case 3:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function moveItem() {
        return _moveItem.apply(this, arguments);
      }
      return moveItem;
    }()
  }, {
    key: "getResizedUrl",
    value: function () {
      var _getResizedUrl = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var file, prompt, result1, result2, relativePath, lastSlashIndex, folderPath, fileName, resizedUrl;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              file = this.state.selectedFile;
              if (!(!file || !file.is_image)) {
                _context6.n = 1;
                break;
              }
              return _context6.a(2, _Toast_js__WEBPACK_IMPORTED_MODULE_3__["default"].show("Please select an image file.", "error"));
            case 1:
              // Use our professional PromptModal instead of the ugly browser prompt
              prompt = new _PromptModal_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
              _context6.n = 2;
              return prompt.open({
                title: 'Get Resized URL - Step 1 of 2',
                confirmText: 'Next',
                fields: [{
                  name: 'width',
                  label: 'Enter desired width (e.g., 300, or "w" for auto-height)'
                }]
              });
            case 2:
              result1 = _context6.v;
              if (!(!result1 || !result1.width)) {
                _context6.n = 3;
                break;
              }
              return _context6.a(2);
            case 3:
              _context6.n = 4;
              return prompt.open({
                title: 'Get Resized URL - Step 2 of 2',
                confirmText: 'Generate',
                fields: [{
                  name: 'height',
                  label: 'Enter desired height (e.g., 200, or "h" for auto-width)'
                }]
              });
            case 4:
              result2 = _context6.v;
              if (!(!result2 || !result2.height)) {
                _context6.n = 5;
                break;
              }
              return _context6.a(2);
            case 5:
              // The file.path is the key, e.g., "uploads/avatar/image.png"
              relativePath = file.path.replace(/^uploads\//, '');
              lastSlashIndex = relativePath.lastIndexOf('/');
              folderPath = '';
              fileName = relativePath;
              if (lastSlashIndex !== -1) {
                folderPath = relativePath.substring(0, lastSlashIndex);
                fileName = relativePath.substring(lastSlashIndex + 1);
              }
              resizedUrl = "".concat(window.location.origin, "/uploads/").concat(folderPath, "/").concat(result1.width, "/").concat(result2.height, "/").concat(fileName);
              this.ui.actionsPanel.querySelector('.file-url-input').value = resizedUrl;
              _Toast_js__WEBPACK_IMPORTED_MODULE_3__["default"].show("Resized URL generated in the input box.");
            case 6:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function getResizedUrl() {
        return _getResizedUrl.apply(this, arguments);
      }
      return getResizedUrl;
    }()
  }, {
    key: "deleteItem",
    value: function () {
      var _deleteItem = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
        var _this9 = this;
        var file, formData;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              file = this.state.selectedFile;
              if (!(!file || !confirm("Are you sure you want to delete \"".concat(file.name, "\"?")))) {
                _context7.n = 1;
                break;
              }
              return _context7.a(2);
            case 1:
              formData = new FormData();
              formData.append('path', file.path);
              formData.append('type', file.type);
              _context7.n = 2;
              return (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.postData)('delete', formData).then(function () {
                return _this9.loadContents(_this9.state.currentPath);
              })["catch"](function () {});
            case 2:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function deleteItem() {
        return _deleteItem.apply(this, arguments);
      }
      return deleteItem;
    }()
  }, {
    key: "copyToClipboard",
    value: function copyToClipboard(selector) {
      var input = this.ui.actionsPanel.querySelector(selector);
      input.select();
      document.execCommand('copy');
      _Toast_js__WEBPACK_IMPORTED_MODULE_3__["default"].show("Copied to clipboard!");
    }
  }, {
    key: "showLoader",
    value: function showLoader(show) {
      if (this.ui.loader) this.ui.loader.style.display = show ? 'flex' : 'none';
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MediaPicker);

/***/ }),

/***/ "./src/resources/assets/js/components/ModalManager.js":
/*!************************************************************!*\
  !*** ./src/resources/assets/js/components/ModalManager.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MediaPicker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MediaPicker.js */ "./src/resources/assets/js/components/MediaPicker.js");

var ModalManager = {
  modalEl: null,
  pickerInstance: null,
  currentCallback: null,
  getPickerHTML: function getPickerHTML(acceptString) {
    return "\n            <div class=\"ms-media-picker-container\" data-is-inline=\"false\">\n                <div class=\"ms-media-header\">\n                    <nav class=\"ms-media-breadcrumbs\"></nav>\n                    <div class=\"ms-media-actions\">\n                        <button type=\"button\" class=\"ms-media-btn ms-create-folder-btn\">New Folder</button>\n                        <label class=\"ms-media-btn ms-media-btn-primary\">\n                            Upload File <input type=\"file\" class=\"ms-upload-file-input\" style=\"display: none;\" accept=\"".concat(acceptString, "\">\n                        </label>\n                    </div>\n                </div>\n                <div class=\"ms-media-body-wrapper\">\n                    <div class=\"ms-media-sidebar\">\n                        <div class=\"sidebar-header\">Folders</div>\n                        <div class=\"ms-media-folder-tree\"></div>\n                    </div>\n                    <div class=\"ms-media-body\"></div>\n                </div>\n                <div class=\"ms-media-footer\">\n                    <div class=\"ms-media-selection-info\"></div>\n                    <button type=\"button\" class=\"ms-media-btn ms-media-btn-primary ms-select-file-btn\" disabled>Select File</button>\n                </div>\n                <div class=\"ms-media-loader\" style=\"display: none;\"><div class=\"spinner\"></div></div>\n            </div>\n        ");
  },
  open: function open(onSelectCallback) {
    var _this = this;
    var acceptString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var triggerEl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (!this.modalEl) this.init();
    this.currentCallback = onSelectCallback;
    this.triggerElement = triggerEl; // NEW: Store the trigger element

    var placeholder = this.modalEl.querySelector('#ms-modal-picker-placeholder');
    placeholder.innerHTML = this.getPickerHTML(acceptString);

    // This is the callback we will give to the MediaPicker instance.
    var pickerCallback = function pickerCallback(file) {
      // CRITICAL FIX: ALWAYS dispatch the global event first.
      // We include the file data AND the original trigger element.
      var event = new CustomEvent('ms-media-file-selected', {
        detail: {
          file: file,
          triggerElement: _this.triggerElement
        }
      });
      document.dispatchEvent(event);

      // THEN, check if a specific callback was also provided and execute it.
      if (_this.currentCallback) {
        _this.currentCallback(file);
      }
      _this.close();
    };
    this.pickerInstance = new _MediaPicker_js__WEBPACK_IMPORTED_MODULE_0__["default"](placeholder.firstElementChild, {
      isInline: false,
      onSelect: pickerCallback // Pass our new, smart callback
    });
    this.modalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  },
  close: function close() {
    if (this.modalEl) this.modalEl.style.display = 'none';
    this.currentCallback = null;
    this.triggerElement = null; // NEW: Clear the trigger element
    document.body.style.overflow = '';
    this.modalEl.querySelector('#ms-modal-picker-placeholder').innerHTML = '';
    this.pickerInstance = null;
  },
  init: function init() {
    var _this2 = this;
    var modalHTML = "<div class=\"ms-media-picker-modal-content\"><button class=\"ms-media-modal-close\">&times;</button><div id=\"ms-modal-picker-placeholder\"></div></div>";
    this.modalEl = document.createElement('div');
    this.modalEl.className = 'ms-media-picker-modal-backdrop';
    this.modalEl.style.display = 'none';
    this.modalEl.innerHTML = modalHTML;
    document.body.appendChild(this.modalEl);
    this.modalEl.querySelector('.ms-media-modal-close').onclick = function () {
      return _this2.close();
    };
    this.modalEl.addEventListener('click', function (e) {
      if (e.target === _this2.modalEl) _this2.close();
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalManager);

/***/ }),

/***/ "./src/resources/assets/js/components/MoveModal.js":
/*!*********************************************************!*\
  !*** ./src/resources/assets/js/components/MoveModal.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var MoveModal = /*#__PURE__*/function () {
  function MoveModal() {
    _classCallCheck(this, MoveModal);
    this.element = null; // Will be created when opened
    this.promise = null;
    this.state = {
      selectedPath: null
    };

    // Bind event handlers to `this` instance to prevent scope issues
    this._handleTreeClick = this._handleTreeClick.bind(this);
    this._handleConfirmClick = this._handleConfirmClick.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._handleBackdropClick = this._handleBackdropClick.bind(this);
  }

  // This is the single entry point to use the modal
  return _createClass(MoveModal, [{
    key: "open",
    value: function open(directoryTree, currentPath) {
      var _this = this;
      return new Promise(function (resolve) {
        _this.promise = {
          resolve: resolve
        };
        _this._createModalElement(); // 1. Create the DOM element
        _this.render(directoryTree, currentPath); // 2. Populate it with data
        _this.attachEventListeners(); // 3. Attach listeners to the now-existing elements
        _this.element.style.display = 'flex';
      });
    }
  }, {
    key: "_createModalElement",
    value: function _createModalElement() {
      // Creates the modal from a string and appends it to the body
      var modalDiv = document.createElement('div');
      modalDiv.className = 'ms-media-folder-modal-backdrop';
      modalDiv.innerHTML = "\n            <div class=\"ms-media-folder-modal-content\">\n                <h4>Select Destination Folder</h4>\n                <div class=\"ms-media-folder-modal-tree\"></div>\n                <div class=\"ms-media-folder-modal-actions\">\n                    <button type=\"button\" class=\"ms-media-btn ms-folder-modal-cancel-btn\">Cancel</button>\n                    <button type=\"button\" class=\"ms-media-btn ms-media-btn-primary ms-folder-modal-move-btn\" disabled>Move Here</button>\n                </div>\n            </div>\n        ";
      document.body.appendChild(modalDiv);
      this.element = modalDiv;
    }
  }, {
    key: "render",
    value: function render(nodes, currentPath) {
      // This recursive function builds the nested <ul> list
      var _buildTreeHTML = function buildTreeHTML(nodeArray) {
        var html = '<ul>';
        nodeArray.forEach(function (node) {
          var isDisabled = node.path === currentPath;
          html += "<li><a href=\"#\" class=\"".concat(isDisabled ? 'disabled' : '', "\" data-path=\"").concat(node.path, "\" title=\"").concat(isDisabled ? 'Current folder' : '', "\">\uD83D\uDCC1 ").concat(node.name, "</a>");
          if (node.children && node.children.length > 0) {
            html += _buildTreeHTML(node.children);
          }
          html += '</li>';
        });
        html += '</ul>';
        return html;
      };
      this.element.querySelector('.ms-media-folder-modal-tree').innerHTML = _buildTreeHTML(nodes);
    }
  }, {
    key: "attachEventListeners",
    value: function attachEventListeners() {
      // Now that the element exists, we can safely query it and attach listeners
      this.ui = {
        tree: this.element.querySelector('.ms-media-folder-modal-tree'),
        moveBtn: this.element.querySelector('.ms-media-folder-modal-move-btn'),
        cancelBtn: this.element.querySelector('.ms-media-folder-modal-cancel-btn')
      };
      this.ui.tree.addEventListener('click', this._handleTreeClick);
      this.ui.moveBtn.addEventListener('click', this._handleConfirmClick);
      this.ui.cancelBtn.addEventListener('click', this._handleCancelClick);
      this.element.addEventListener('click', this._handleBackdropClick);
    }
  }, {
    key: "_handleTreeClick",
    value: function _handleTreeClick(e) {
      e.preventDefault();
      var link = e.target.closest('a');
      if (link && !link.classList.contains('disabled')) {
        this.ui.tree.querySelectorAll('a').forEach(function (el) {
          return el.classList.remove('selected');
        });
        link.classList.add('selected');
        this.state.selectedPath = link.dataset.path;
        this.ui.moveBtn.disabled = false;
      }
    }
  }, {
    key: "_handleConfirmClick",
    value: function _handleConfirmClick() {
      this._resolveAndClose(this.state.selectedPath);
    }
  }, {
    key: "_handleCancelClick",
    value: function _handleCancelClick() {
      this._resolveAndClose(null);
    }
  }, {
    key: "_handleBackdropClick",
    value: function _handleBackdropClick(e) {
      if (e.target === this.element) this._resolveAndClose(null);
    }
  }, {
    key: "_resolveAndClose",
    value: function _resolveAndClose(value) {
      if (this.promise) this.promise.resolve(value);
      this.element.remove(); // Clean up the DOM element
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MoveModal);

/***/ }),

/***/ "./src/resources/assets/js/components/PromptModal.js":
/*!***********************************************************!*\
  !*** ./src/resources/assets/js/components/PromptModal.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var PromptModal = /*#__PURE__*/function () {
  function PromptModal() {
    _classCallCheck(this, PromptModal);
    this.element = null;
    this.promise = null;
    this.config = null;
  }
  return _createClass(PromptModal, [{
    key: "open",
    value: function open() {
      var _this = this;
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.config = _objectSpread({
        title: 'Enter a value',
        confirmText: 'OK',
        fields: []
      }, config);
      return new Promise(function (resolve) {
        _this.promise = {
          resolve: resolve
        };
        _this._createModalElement();
        _this.attachEventListeners();
        _this.element.style.display = 'flex';

        // Focus the first text input
        var firstInput = _this.element.querySelector('input[type="text"], input[type="url"]');
        if (firstInput) {
          firstInput.focus();
          firstInput.select();
        }
      });
    }
  }, {
    key: "_createModalElement",
    value: function _createModalElement() {
      var modalDiv = document.createElement('div');
      modalDiv.className = 'ms-dialog-backdrop';
      var fieldsHTML = this.config.fields.map(function (field) {
        if (field.type === 'checkbox') {
          return "\n                    <div class=\"ms-dialog-group checkbox\">\n                        <input type=\"checkbox\" id=\"ms-prompt-input-".concat(field.name, "\" name=\"").concat(field.name, "\" ").concat(field.checked ? 'checked' : '', ">\n                        <label for=\"ms-prompt-input-").concat(field.name, "\">").concat(field.label, "</label>\n                    </div>\n                ");
        }
        // Default to text/url input
        return "\n                <div class=\"ms-dialog-group\">\n                    <label for=\"ms-prompt-input-".concat(field.name, "\">").concat(field.label, "</label>\n                    <input type=\"").concat(field.type || 'text', "\" id=\"ms-prompt-input-").concat(field.name, "\" name=\"").concat(field.name, "\" value=\"").concat(field.value || '', "\" placeholder=\"").concat(field.placeholder || '', "\">\n                </div>\n            ");
      }).join('');
      modalDiv.innerHTML = "\n            <div class=\"ms-dialog-content\">\n                <div class=\"ms-dialog-header\">\n                    <h4>".concat(this.config.title, "</h4>\n                    <button type=\"button\" class=\"ms-dialog-close\">&times;</button>\n                </div>\n                <div class=\"ms-dialog-body\">").concat(fieldsHTML, "</div>\n                <div class=\"ms-dialog-footer\">\n                    <button type=\"button\" class=\"ms-media-btn ms-prompt-cancel-btn\">Cancel</button>\n                    <button type=\"button\" class=\"ms-media-btn ms-media-btn-primary ms-prompt-confirm-btn\">").concat(this.config.confirmText, "</button>\n                </div>\n            </div>\n        ");
      document.body.appendChild(modalDiv);
      this.element = modalDiv;
    }
  }, {
    key: "attachEventListeners",
    value: function attachEventListeners() {
      var _this2 = this;
      var confirmBtn = this.element.querySelector('.ms-prompt-confirm-btn');
      var cancelBtn = this.element.querySelector('.ms-prompt-cancel-btn');
      var closeBtn = this.element.querySelector('.ms-dialog-close');
      confirmBtn.onclick = function () {
        return _this2._handleConfirm();
      };
      cancelBtn.onclick = function () {
        return _this2._resolveAndClose(null);
      };
      closeBtn.onclick = function () {
        return _this2._resolveAndClose(null);
      };
      this.element.addEventListener('click', function (e) {
        if (e.target === _this2.element) _this2._resolveAndClose(null);
      });
    }
  }, {
    key: "_handleConfirm",
    value: function _handleConfirm() {
      var _this3 = this;
      var result = {};
      this.config.fields.forEach(function (field) {
        var input = _this3.element.querySelector("[name=\"".concat(field.name, "\"]"));
        if (input) {
          result[field.name] = field.type === 'checkbox' ? input.checked : input.value;
        }
      });
      this._resolveAndClose(result);
    }
  }, {
    key: "_resolveAndClose",
    value: function _resolveAndClose(value) {
      if (this.promise) this.promise.resolve(value);
      this.element.remove();
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PromptModal);

/***/ }),

/***/ "./src/resources/assets/js/components/Toast.js":
/*!*****************************************************!*\
  !*** ./src/resources/assets/js/components/Toast.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var Toast = /*#__PURE__*/function () {
  function Toast() {
    _classCallCheck(this, Toast);
  }
  return _createClass(Toast, null, [{
    key: "_getContainer",
    value:
    // A private helper to create the toast container if it doesn't exist.
    function _getContainer() {
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.id = 'ms-toast-container';
        document.body.appendChild(this.container);

        // Add the necessary CSS animations to the document head once.
        if (!document.getElementById('ms-toast-animations')) {
          var style = document.createElement('style');
          style.id = 'ms-toast-animations';
          style.innerHTML = "\n                    @keyframes ms-toast-fade-in {\n                        to { opacity: 1; transform: translateY(0); }\n                    }\n                    @keyframes ms-toast-fade-out {\n                        to { opacity: 0; transform: translateY(20px); }\n                    }\n                ";
          document.head.appendChild(style);
        }
      }
      return this.container;
    }

    // The public method to show a toast.
  }, {
    key: "show",
    value: function show(message) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
      var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;
      var container = this._getContainer();
      var toast = document.createElement('div');
      toast.className = "ms-toast ".concat(type);
      toast.textContent = message;
      container.appendChild(toast);

      // Set a timeout to automatically remove the toast.
      setTimeout(function () {
        toast.style.animation = 'ms-toast-fade-out 0.3s forwards';
        // Listen for the animation to end before removing the element.
        toast.addEventListener('animationend', function () {
          return toast.remove();
        });
      }, duration);
    }
  }]);
}();
_defineProperty(Toast, "container", null);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toast);

/***/ }),

/***/ "./src/resources/assets/scss/media-picker.scss":
/*!*****************************************************!*\
  !*** ./src/resources/assets/scss/media-picker.scss ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/media-picker": 0,
/******/ 			"css/media-picker": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmedia_picker"] = self["webpackChunkmedia_picker"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/media-picker"], () => (__webpack_require__("./src/resources/assets/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/media-picker"], () => (__webpack_require__("./src/resources/assets/scss/media-picker.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;