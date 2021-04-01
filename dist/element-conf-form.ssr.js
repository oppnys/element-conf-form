'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var FormType = {
  INPUT: 'input',
  BUTTON: 'button',
  SELECT: 'select',
  RADIO: 'radio',
  RADIOBUTTON: 'radiobutton',
  SWITCH: 'switch',
  SLIDER: 'slider',
  CASCADER: 'cascader',
  TIMEPICKER: 'timePicker',
  DATEPICKER: 'timerPicker'
};//
var script = {
  name: 'ElementConfForm',
  props: {
    forms: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    rules: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      FormType: FormType,
      rulesData: null
    };
  },
  mounted: function mounted() {
    this.rulesData = this.generateObj(this.forms, 'property', 'value');
  },
  methods: {
    clearForm: function clearForm() {
      this.$refs.forms.resetFields();
    },
    submitForm: function submitForm(data) {
      var _this = this;

      if (data.validate) {
        this.$refs.forms.validate(function (valid, params) {
          if (valid) {
            data.handle(_this.rulesData);
          } else {
            _this.$message.error(_this.deconstructObj(params));
          }
        });
      } else {
        data.handle(this.rulesData);
      }
    },
    deconstructObj: function deconstructObj() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var res = [];

      for (var key in obj) {
        res.push(obj[key][0]['message']);
      }

      return res[0];
    },
    propertyFilter: function propertyFilter(item) {
      // eslint-disable-next-line no-prototype-builtins
      return this.rulesData && this.rulesData.hasOwnProperty(item.property);
    },
    generateObj: function generateObj() {
      var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var keyName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (arr) {
        var obj = {};
        arr.map(function (item) {
          if (item[keyName]) {
            var key = item[keyName];
            var value = item[val] || '';
            obj[key] = value;
          }
        });
        return obj;
      }

      return null;
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('el-form', _vm._b({
    ref: "forms",
    attrs: {
      "model": _vm.rulesData,
      "rules": _vm.rules
    }
  }, 'el-form', _vm.$attrs, false), _vm._l(_vm.forms, function (item, index) {
    return _c('el-form-item', {
      key: index,
      attrs: {
        "label": item.label,
        "prop": item.property
      }
    }, [item.type === _vm.FormType.INPUT && _vm.propertyFilter(item) ? [_c('el-input', _vm._b({
      attrs: {
        "placeholder": "请输入"
      },
      model: {
        value: _vm.rulesData[item.property],
        callback: function callback($$v) {
          _vm.$set(_vm.rulesData, item.property, $$v);
        },
        expression: "rulesData[item.property]"
      }
    }, 'el-input', item.attrs, false))] : item.type === _vm.FormType.SELECT && _vm.propertyFilter(item) ? [_c('el-select', _vm._b({
      model: {
        value: _vm.rulesData[item.property],
        callback: function callback($$v) {
          _vm.$set(_vm.rulesData, item.property, $$v);
        },
        expression: "rulesData[item.property]"
      }
    }, 'el-select', item.attrs, false), _vm._l(item.options, function (option) {
      return _c('el-option', {
        key: option.value,
        attrs: {
          "label": option.label,
          "value": option.value
        }
      });
    }), 1)] : _vm._e(), _vm._v(" "), item.type === _vm.FormType.RADIO && _vm.propertyFilter(item) ? [_c('el-radio-group', _vm._b({
      model: {
        value: _vm.rulesData[item.property],
        callback: function callback($$v) {
          _vm.$set(_vm.rulesData, item.property, $$v);
        },
        expression: "rulesData[item.property]"
      }
    }, 'el-radio-group', item.attrs, false), _vm._l(item.options, function (radio) {
      return _c('el-radio', _vm._b({
        key: radio.value,
        attrs: {
          "label": radio.value
        }
      }, 'el-radio', radio.attrs, false), [_vm._v("\n          " + _vm._s(radio.label) + "\n        ")]);
    }), 1)] : _vm._e(), _vm._v(" "), item.type === _vm.FormType.RADIOBUTTON && _vm.propertyFilter(item) ? [_c('el-radio-group', _vm._b({
      model: {
        value: _vm.rulesData[item.property],
        callback: function callback($$v) {
          _vm.$set(_vm.rulesData, item.property, $$v);
        },
        expression: "rulesData[item.property]"
      }
    }, 'el-radio-group', item.attrs, false), _vm._l(item.options, function (radio) {
      return _c('el-radio-button', _vm._b({
        key: radio.value,
        attrs: {
          "label": radio.value
        }
      }, 'el-radio-button', radio.attrs, false), [_vm._v("\n          " + _vm._s(radio.label) + "\n        ")]);
    }), 1)] : _vm._e(), _vm._v(" "), item.type === _vm.FormType.SWITCH && _vm.propertyFilter(item) ? [_c('el-switch', _vm._b({
      model: {
        value: _vm.rulesData[item.property],
        callback: function callback($$v) {
          _vm.$set(_vm.rulesData, item.property, $$v);
        },
        expression: "rulesData[item.property]"
      }
    }, 'el-switch', item.attrs, false))] : _vm._e(), _vm._v(" "), item.type === _vm.FormType.SLIDER && _vm.propertyFilter(item) ? [_c('el-slider', _vm._b({
      model: {
        value: _vm.rulesData[item.property],
        callback: function callback($$v) {
          _vm.$set(_vm.rulesData, item.property, $$v);
        },
        expression: "rulesData[item.property]"
      }
    }, 'el-slider', item.attrs, false))] : _vm._e(), _vm._v(" "), item.type === _vm.FormType.CASCADER && _vm.propertyFilter(item) ? [_c('el-cascader', _vm._b({
      attrs: {
        "options": item.options
      },
      model: {
        value: _vm.rulesData[item.property],
        callback: function callback($$v) {
          _vm.$set(_vm.rulesData, item.property, $$v);
        },
        expression: "rulesData[item.property]"
      }
    }, 'el-cascader', item.attrs, false))] : _vm._e(), _vm._v(" "), item.type === _vm.FormType.TIMEPICKER && _vm.propertyFilter(item) ? [_c('el-time-select', _vm._b({
      model: {
        value: _vm.rulesData[item.property],
        callback: function callback($$v) {
          _vm.$set(_vm.rulesData, item.property, $$v);
        },
        expression: "rulesData[item.property]"
      }
    }, 'el-time-select', item.attrs, false))] : _vm._e(), _vm._v(" "), item.type === _vm.FormType.DATEPICKER && _vm.propertyFilter(item) ? [_c('el-date-picker', _vm._b({
      model: {
        value: _vm.rulesData[item.property],
        callback: function callback($$v) {
          _vm.$set(_vm.rulesData, item.property, $$v);
        },
        expression: "rulesData[item.property]"
      }
    }, 'el-date-picker', item.attrs, false))] : item.type === _vm.FormType.BUTTON ? _vm._l(item.buttons, function (button, indey) {
      return _c('el-button', _vm._b({
        key: indey,
        on: {
          "click": function click($event) {
            return _vm.submitForm(button);
          }
        }
      }, 'el-button', button.attrs, false), [_vm._v("\n        " + _vm._s(button.value) + "\n      ")]);
    }) : _vm._e()], 2);
  }), 1);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = "data-v-5fcb234c";
/* module identifier */

var __vue_module_identifier__ = "data-v-5fcb234c";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component('ElementConfForm', installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;