/*!
 * vue-slim-tabs v0.3.0
 * (c) egoist <0x142857@gmail.com>
 * Released under the MIT License.
 */
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

var Tabs = {
  name: "tabs",
  props: {
    defaultIndex: {
      default: 0,
      type: Number
    },
    onSelect: {
      type: Function
    }
  },
  mounted: function mounted() {
    var _this = this;

    if (this.$route.query.tab) {
      var tabs = this.$slots.default.filter(function (component) {
        return component.componentOptions;
      }).map(function (component) {
        return component.componentOptions.propsData.title;
      });
      var index = tabs.findIndex(function (title) {
        return title === _this.$route.query.tab;
      });

      if (index) {
        this.switchTab(undefined, index);
      }
    }
  },
  data: function data() {
    return {
      selectedIndex: this.defaultIndex
    };
  },
  methods: {
    switchTab: function switchTab(e, index, isDisabled) {
      if (!isDisabled) {
        this.selectedIndex = index;
        this.onSelect && this.onSelect(e, index);
        var tabs = this.$slots.default.filter(function (component) {
          return component.componentOptions;
        }).map(function (component) {
          return component.componentOptions.propsData.title;
        });
        var query = {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = new URL(window.location).searchParams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var q = _step.value;
            query[q[0]] = q[1];
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this.$router.push({
          path: new URL(window.location).pathname,
          query: _objectSpread({}, query, {
            tab: tabs[index]
          })
        });
      }
    }
  },
  render: function render() {
    var _this2 = this;

    var h = arguments[0];
    var tabs = this.$slots.default.filter(function (component) {
      return component.componentOptions;
    });
    var tabList = [];
    tabs.forEach(function (child, index) {
      var _child$componentOptio = child.componentOptions.propsData,
          title = _child$componentOptio.title,
          titleSlot = _child$componentOptio.titleSlot,
          disabled = _child$componentOptio.disabled;
      var content = titleSlot ? _this2.$slots[titleSlot] : title;
      var isDisabled = disabled === true || disabled === "";
      tabList.push(h("li", {
        "class": "vue-tab",
        attrs: {
          role: "tab",
          "aria-selected": _this2.selectedIndex === index ? "true" : "false",
          "aria-disabled": isDisabled ? "true" : "false"
        },
        on: {
          "click": function click(e) {
            return _this2.switchTab(e, index, isDisabled);
          }
        }
      }, [content]));
    });
    return h("div", {
      "class": "vue-tabs",
      attrs: {
        role: "tabs"
      }
    }, [h("ul", {
      "class": "vue-tablist",
      attrs: {
        role: "tablist"
      }
    }, [this.$slots.left, tabList, this.$slots.right]), tabs[this.selectedIndex]]);
  }
};
var Tab = {
  name: "tab",
  props: ["title", "titleSlot", "disabled"],
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": "vue-tabpanel",
      attrs: {
        role: "tabpanel"
      }
    }, [this.$slots.default]);
  }
};
function install(Vue) {
  Vue.component(Tabs.name, Tabs);
  Vue.component(Tab.name, Tab);
}

export { Tab, Tabs, install };
