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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = __webpack_require__(2);
var cards_1 = __webpack_require__(3);
var _ = __webpack_require__(4);
var howler_1 = __webpack_require__(5);
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function (props) {
        return preact_1.h("div", { className: 'container' },
            preact_1.h(Filterer, { AllCards: cards_1.default }));
    };
    return App;
}(preact_1.Component));
exports.default = App;
var howlCache = {};
var Filterer = /** @class */ (function (_super) {
    __extends(Filterer, _super);
    function Filterer(props) {
        var _this = _super.call(this, props) || this;
        _this.pageSize = 10;
        _this.onPage = function (cards) {
            _this.setState({ PageCards: cards });
        };
        _this.playSound = function (url) {
            var h = new howler_1.Howl({ src: "https://yoggstatic.hearth.cards/s" + url });
            h.play();
            console.log(url);
        };
        _this.state = {
            FilteredCards: [],
            PageCards: [],
            ShowGold: false,
        };
        _this.filter();
        return _this;
    }
    Filterer.prototype.filter = function () {
        var fc = _.filter(this.props.AllCards, function (c) { return c.Sounds.length > 0; });
        fc = _.filter(fc, function (c) { return c.Collectible; });
        fc = _.sortBy(fc, function (c) { return c.Name; });
        this.setState({ FilteredCards: fc });
    };
    Filterer.prototype.render = function (props) {
        var _this = this;
        var rows = _.values(_.groupBy(this.state.PageCards, function (c, i) { return Math.floor(i / 5); }));
        console.log(rows);
        return preact_1.h("div", { className: 'flex-ver' },
            preact_1.h("div", { className: 'filter-blocks' }, rows.map(function (cs) {
                return preact_1.h("div", { className: 'flex-hor' }, cs.map(function (c) {
                    return preact_1.h("div", { className: 'filter-block flex-ver text-center' },
                        preact_1.h("div", null, c.GoldImage && _this.state.ShowGold ? preact_1.h("video", { key: c.GoldImage, autoPlay: true, loop: true, class: 'filter-img' },
                            preact_1.h("source", { src: 'https://goldstatic.hearth.cards/img' + c.GoldImage }))
                            : preact_1.h("img", { class: 'filter-img', src: 'https://cardstatic.hearth.cards/img' + c.RegImage })),
                        preact_1.h("div", { className: 'text-center' }, c.Sounds.map(function (s) {
                            return preact_1.h("button", { className: 'btn btn-xs btn-primary', onClick: _this.playSound.bind(_this, s.URL) }, s.Name);
                        })));
                }));
            })),
            preact_1.h("hr", null),
            preact_1.h(Pager, { AllItems: this.state.FilteredCards, PageSize: 10, OnChange: this.onPage }));
    };
    return Filterer;
}(preact_1.Component));
var Pager = /** @class */ (function (_super) {
    __extends(Pager, _super);
    function Pager(props) {
        var _this = _super.call(this, props) || this;
        _this.next = function () {
            _this.repage(1);
        };
        _this.prev = function () {
            _this.repage(-1);
        };
        _this.state = { CurrentPage: 0 };
        _this.repage(0);
        return _this;
    }
    Pager.prototype.repage = function (diff) {
        var p = this.props;
        var ps = p.PageSize;
        var cp = Math.min(this.state.CurrentPage + diff, this.maxPage());
        if (cp < 0) {
            cp = 0;
        }
        ;
        var start = cp * ps;
        var end = Math.min(((cp + 1) * ps) - 1, p.AllItems.length - 1);
        var set = p.AllItems.slice(start, end + 1);
        this.setState({
            CurrentPage: cp,
        });
        p.OnChange(set);
    };
    Pager.prototype.render = function (props) {
        var s = this.state;
        return preact_1.h("div", { className: 'text-center' },
            preact_1.h("button", { onClick: this.prev }, "<"),
            s.CurrentPage,
            " / ",
            this.maxPage(),
            preact_1.h("button", { onClick: this.next }, ">"));
    };
    Pager.prototype.maxPage = function () {
        return Math.ceil(this.props.AllItems.length / this.props.PageSize) - 1;
    };
    return Pager;
}(preact_1.Component));
preact_1.render(preact_1.h(App, { name: "World", id: "/" }), document.querySelector('#app'));


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return rerender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/** Virtual DOM Node */
function VNode() {}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
var options = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	//syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	//vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
};

var stack = [];

var EMPTY_CHILDREN = [];

/** JSX/hyperscript reviver
*	Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *	@see http://jasonformat.com/wtf-is-jsx
 *	@public
 */
function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	// if a "vnode hook" is defined, pass every created VNode to it
	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

/** Copy own-properties from `props` onto `obj`.
 *	@returns obj
 *	@private
 */
function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

/** Call a function asynchronously, as soon as possible.
 *	@param {Function} callback
 */
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

function cloneElement(vnode, props) {
	return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

/** Check if two nodes are equivalent.
 *	@param {Element} node
 *	@param {VNode} vnode
 *	@private
 */
function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

/** Check if an Element has a given normalized name.
*	@param {Element} node
*	@param {String} nodeName
 */
function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {
		// ignore
	} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, value == null ? '' : value);
		if (value == null || value === false) node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!diffLevel++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		// hydration is indicated by the existing element to be diffed not having a prop cache
		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	// append the element if its a new parent
	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	// diffLevel being reduced to 0 means we're exiting the diff
	if (! --diffLevel) {
		hydrating = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts();
	}

	return ret;
}

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	// empty values (null, undefined, booleans) render as empty Text nodes
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	// Fast case: Strings & Numbers create/update Text nodes.
	if (typeof vnode === 'string' || typeof vnode === 'number') {

		// update if it's already a Text node:
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	// If the VNode represents a Component, perform a component diff:
	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	// If there's no existing element or it's the wrong type, create a new one:
	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			// move children into the replacement node
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			} // if the previous Element was mounted into the DOM, replace it inline
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			// recycle the old element (skips non-Element node types)
			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes(out, vnode.attributes, props);

	// restore previous SVG mode: (in case we're exiting an SVG namespace)
	isSvgMode = prevSvgMode;

	return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	// Build up a map of keyed children and an Array of unkeyed children:
	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			// attempt to find a node based on key matching
			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	// remove unused keyed children:
	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	// remove orphaned unkeyed children:
	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		unmountComponent(component);
	} else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
	var name;

	// remove attributes no longer present on the vnode by setting them to undefined
	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	// add new & update changed attributes
	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

/** Reclaim a component for later re-use by the recycler. */
function collectComponent(component) {
	var name = component.constructor.name;
	(components[name] || (components[name] = [])).push(component);
}

/** Create a component. Normalizes differences between PFC's and classful Components. */
function createComponent(Ctor, props, context) {
	var list = components[Ctor.name],
	    inst;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props, state, context) {
	return this.constructor(props, context);
}

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (!component.base || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (opts !== 0) {
		if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    rendered,
	    inst,
	    cbase;

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {
			// set up high order component link

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	if (component._renderCallbacks != null) {
		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}
	}

	if (!diffLevel && !isChild) flushMounts();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		collectComponent(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
function Component(props, context) {
	this._dirty = true;

	/** @public
  *	@type {object}
  */
	this.context = context;

	/** @public
  *	@type {object}
  */
	this.props = props;

	/** @public
  *	@type {object}
  */
	this.state = this.state || {};
}

extend(Component.prototype, {

	/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */

	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  *	@param {function} callback	A function to be called once component state is updated
  */
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = extend({}, s);
		extend(s, typeof state === 'function' ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		enqueueRender(this);
	},


	/** Immediately perform a synchronous re-render of the component.
  *	@param {function} callback		A function to be called after component is re-rendered.
  *	@private
  */
	forceUpdate: function forceUpdate(callback) {
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		renderComponent(this, 2);
	},


	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
	render: function render() {}
});

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};


/* harmony default export */ __webpack_exports__["default"] = (preact);
//# sourceMappingURL=preact.esm.js.map


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Cards = [{ "Name": "Heroic Strike", "RegImage": "/330-114-1.png", "GoldImage": "/0-1-1.webm", "Collectible": true, "Sounds": [] }, { "Name": "Lightning Bolt", "RegImage": "/330-662-10.png", "GoldImage": "/0-10-10.webm", "Collectible": true, "Sounds": [] }, { "Name": "Blessing of Wisdom", "RegImage": "/330-833-100.png", "GoldImage": "/0-100-100.webm", "Collectible": true, "Sounds": [] }, { "Name": "Starving Buzzard", "RegImage": "/330-273-101.png", "GoldImage": "/0-101-101.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_CS2_237_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_CS2_237_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_CS2_237_EnterPlay.ogg" }] }, { "Name": "Southsea Deckhand", "RegImage": "/330-165-103.png", "GoldImage": "/0-103-103.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_146_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_146_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_146_Play_01.ogg" }] }, { "Name": "Stomp", "RegImage": "/334-764-105.png", "GoldImage": "/0-105-105.webm", "Sounds": [{ "Name": "Play1", "URL": "/KingMukla_Stomp_Cast_1.ogg" }] }, { "Name": "Far Sight", "RegImage": "/330-0-107.png", "GoldImage": "/0-107-107.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Shaman_FarSight_PreCast.ogg" }, { "Name": "Play2", "URL": "/Nature_Target_Start_01.ogg" }] }, { "Name": "Holy Light", "RegImage": "/330-69-108.png", "GoldImage": "/0-108-108.webm", "Collectible": true, "Sounds": [] }, { "Name": "Anduin Wrynn", "RegImage": "/331-752-110.png", "GoldImage": "/0-110-110.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_09_Attack_16.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_09_Death_17.ogg" }] }, { "Name": "Moonfire", "RegImage": "/330-638-111.png", "GoldImage": "/0-111-111.webm", "Sounds": [] }, { "Name": "Worgen Infiltrator", "RegImage": "/330-363-112.png", "GoldImage": "/0-112-112.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_010_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_010_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_010_Play_01.ogg" }] }, { "Name": "Explosive Shot", "RegImage": "/330-950-114.png", "GoldImage": "/0-114-114.webm", "Collectible": true, "Sounds": [] }, { "Name": "Frog", "RegImage": "/331-758-115.png", "GoldImage": "/0-115-115.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_HexFrog_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_HexFrog_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_HexFrog_EnterPlay.ogg" }] }, { "Name": "Laughing Sister", "RegImage": "/330-285-116.png", "GoldImage": "/0-116-116.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_DREAM_01_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_DREAM_01_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_DREAM_01_Play_01.ogg" }] }, { "Name": "Lightwell", "RegImage": "/330-806-117.png", "GoldImage": "/0-117-117.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_341_Attack_Lightwell - Copy.ogg" }, { "Name": "Death1", "URL": "/EX1_341_Death_Lightwell.ogg" }, { "Name": "Play1", "URL": "/EX1_341_Play_Lightwell.ogg" }] }, { "Name": "Void Terror", "RegImage": "/330-746-119.png", "GoldImage": "/0-119-119.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_304_VoidTerror_Attack.ogg" }, { "Name": "Death1", "URL": "/EX1_304_VoidTerror_Death.ogg" }, { "Name": "Play1", "URL": "/EX1_304_VoidTerror_Play.ogg" }] }, { "Name": "Nourish", "RegImage": "/330-610-120.png", "GoldImage": "/0-120-120.webm", "Collectible": true, "Sounds": [] }, { "Name": "Infernal", "RegImage": "/331-174-121.png", "GoldImage": "/0-121-121.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_tk34_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_tk34_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_tk34_EnterPlay.ogg" }] }, { "Name": "Velen's Chosen", "RegImage": "/331-325-12174.png", "GoldImage": "/12-174-12174.webm", "Collectible": true, "Sounds": [] }, { "Name": "Piloted Sky Golem", "RegImage": "/331-644-12175.png", "GoldImage": "/12-175-12175.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/GVG_105_PilotedSkyGolem_Attack.ogg" }, { "Name": "Death1", "URL": "/GVG_105_PilotedSkyGolem_Death.ogg" }, { "Name": "Play1", "URL": "/GVG_105_PilotedSkyGolem_EnterPlay.ogg" }] }, { "Name": "Enhance-o Mechano", "RegImage": "/331-650-12176.png", "GoldImage": "/12-176-12176.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_107_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/CleanMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_107_Death_03.ogg" }, { "Name": "Death2", "URL": "/CleanMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_107_Play_01.ogg" }, { "Name": "Play2", "URL": "/CleanMechSmall_Play_Underlay.ogg" }] }, { "Name": "Madder Bomber", "RegImage": "/331-595-12177.png", "GoldImage": "/12-177-12177.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_090_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_090_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_090_Play_01.ogg" }] }, { "Name": "Unstable Portal", "RegImage": "/331-304-12178.png", "GoldImage": "/12-178-12178.webm", "Collectible": true, "Sounds": [] }, { "Name": "Cogmaster", "RegImage": "/331-334-12179.png", "GoldImage": "/12-179-12179.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_069_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/Cogmaster_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_069_Death_03.ogg" }, { "Name": "Death2", "URL": "/Cogmaster_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_069_Play_01.ogg" }, { "Name": "Play2", "URL": "/Cogmaster_Play_Underlay.ogg" }] }, { "Name": "Explosive Sheep", "RegImage": "/331-550-12180.png", "GoldImage": "/12-180-12180.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_076_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_076_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_076_EnterPlay.ogg" }] }, { "Name": "Annoy-o-Tron", "RegImage": "/331-580-12181.png", "GoldImage": "/12-181-12181.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_085_Attack_02_ALT.ogg" }, { "Name": "Attack2", "URL": "/ClunkyMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_085_Death_03.ogg" }, { "Name": "Death2", "URL": "/ClunkyMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_085_Play_01.ogg" }, { "Name": "Play2", "URL": "/ClunkyMechSmall_Play_Underlay.ogg" }] }, { "Name": "Dr. Boom", "RegImage": "/331-659-12182.png", "GoldImage": "/12-182-12182.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/GVG_110_DrBoom_Attack.ogg" }, { "Name": "Death1", "URL": "/GVG_110_DrBoom_Death.ogg" }, { "Name": "Play1", "URL": "/GVG_110_DrBoom_Play.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Misc1.ogg" }] }, { "Name": "Blingtron 3000", "RegImage": "/331-692-12183.png", "GoldImage": "/12-183-12183.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_119_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/CleanMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_119_Death_03.ogg" }, { "Name": "Death2", "URL": "/CleanMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_119_Play_01_ALT.ogg" }, { "Name": "Play2", "URL": "/Blingtron_Play_Stinger.ogg" }, { "Name": "Play3", "URL": "/CleanMechSmall_Play_Underlay.ogg" }] }, { "Name": "Spider Tank", "RegImage": "/331-448-12184.png", "GoldImage": "/12-184-12184.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_044_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_044_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_044_EnterPlay.ogg" }] }, { "Name": "Upgraded Repair Bot", "RegImage": "/331-574-12185.png", "GoldImage": "/12-185-12185.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_083_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/ClunkyMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_083_Death_03.ogg" }, { "Name": "Death2", "URL": "/ClunkyMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_083_Play_01.ogg" }, { "Name": "Play2", "URL": "/ClunkyMechSmall_Play_Underlay.ogg" }] }, { "Name": "Sneed's Old Shredder", "RegImage": "/331-677-12187.png", "GoldImage": "/12-187-12187.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_114_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_114_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_114_EnterPlay.ogg" }, { "Name": "Play2", "URL": "/Battle_Play_Stinger_4.ogg" }] }, { "Name": "Mechwarper", "RegImage": "/331-313-12188.png", "GoldImage": "/12-188-12188.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_006_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/CleanMechLarge_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_006_Death_03.ogg" }, { "Name": "Death2", "URL": "/CleanMechLarge_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_006_Play_01.ogg" }, { "Name": "Play2", "URL": "/CleanMechLarge_Play_Underlay.ogg" }] }, { "Name": "Micro Machine", "RegImage": "/331-638-12189.png", "GoldImage": "/12-189-12189.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_103_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/ClunkyMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_103_Death_03.ogg" }, { "Name": "Death2", "URL": "/ClunkyMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_103_Play_01.ogg" }, { "Name": "Play2", "URL": "/ClunkyMechSmall_Play_Underlay.ogg" }] }, { "Name": "Mimiron's Head", "RegImage": "/331-665-12190.png", "GoldImage": "/12-190-12190.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_111_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/Mimiron_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_111_Death_03.ogg" }, { "Name": "Death2", "URL": "/Mimiron_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_111_Play_01.ogg" }, { "Name": "Play2", "URL": "/Ulduar_Play_Stinger_2.ogg" }, { "Name": "Play3", "URL": "/Mimiron_Play_Underlay.ogg" }] }, { "Name": "Piloted Shredder", "RegImage": "/331-617-12191.png", "GoldImage": "/12-191-12191.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_096_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_096_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_096_Play.ogg" }] }, { "Name": "Flamecannon", "RegImage": "/331-298-12192.png", "GoldImage": "/12-192-12192.webm", "Collectible": true, "Sounds": [] }, { "Name": "Bomb Lobber", "RegImage": "/331-626-12193.png", "GoldImage": "/12-193-12193.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_099_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_099_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_099_Play_01.ogg" }] }, { "Name": "Goblin Blastmage", "RegImage": "/331-307-12195.png", "GoldImage": "/12-195-12195.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_004_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/GoblinBlastMage_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_004_Death_03.ogg" }, { "Name": "Death2", "URL": "/GoblinBlastMage_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_004_Play_01.ogg" }, { "Name": "Play2", "URL": "/GoblinBlastMage_Play_Underlay.ogg" }] }, { "Name": "Mekgineer Thermaplugg", "RegImage": "/331-683-12196.png", "GoldImage": "/12-196-12196.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_116_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/ClunkyMechLarge_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_116_Death_03.ogg" }, { "Name": "Death2", "URL": "/ClunkyMechLarge_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_116_Play_01.ogg" }, { "Name": "Play2", "URL": "/GnomeVillain_Play_Stinger_1.ogg" }, { "Name": "Play3", "URL": "/ClunkyMechLarge_Play_Underlay.ogg" }] }, { "Name": "Shrinkmeister", "RegImage": "/331-328-12197.png", "GoldImage": "/12-197-12197.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_011_Attack_Alt_03.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_011_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_011_Play_01.ogg" }] }, { "Name": "Recombobulator", "RegImage": "/331-653-12198.png", "GoldImage": "/12-198-12198.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_108_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_108_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_108_Play_01.ogg" }] }, { "Name": "Gnomish Experimenter", "RegImage": "/331-602-12199.png", "GoldImage": "/12-199-12199.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_092_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_092_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_092_Play_01.ogg" }] }, { "Name": "Hellfire", "RegImage": "/330-15-122.png", "GoldImage": "/0-122-122.webm", "Collectible": true, "Sounds": [] }, { "Name": "Clockwork Gnome", "RegImage": "/331-571-12200.png", "GoldImage": "/12-200-12200.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_082_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/CleanMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_082_Death_03.ogg" }, { "Name": "Death2", "URL": "/CleanMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_082_Play_01.ogg" }, { "Name": "Play2", "URL": "/CleanMechSmall_Play_Underlay.ogg" }, { "Name": "Trigger1", "URL": "/Shared_Gearsplosion_Sound_01.ogg" }] }, { "Name": "Clockwork Giant", "RegImage": "/331-698-12201.png", "GoldImage": "/12-201-12201.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_121_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_121_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_121_EnterPlay.ogg" }] }, { "Name": "Tinkertown Technician", "RegImage": "/331-635-12202.png", "GoldImage": "/12-202-12202.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_102_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_102_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_102_Play_01.ogg" }, { "Name": "Play2", "URL": "/Shared_Gearsplosion_Sound_01.ogg" }] }, { "Name": "Bouncing Blade", "RegImage": "/331-469-12203.png", "GoldImage": "/12-203-12203.webm", "Collectible": true, "Sounds": [] }, { "Name": "Ogre Warmaul", "RegImage": "/331-481-12211.png", "GoldImage": "/12-211-12211.webm", "Collectible": true, "Sounds": [] }, { "Name": "Goblin Auto-Barber", "RegImage": "/331-364-12212.png", "GoldImage": "/12-212-12212.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_023_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_023_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_023_EnterPlay.ogg" }] }, { "Name": "Goblin Sapper", "RegImage": "/331-614-12213.png", "GoldImage": "/12-213-12213.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_095_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_095_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_095_Play_01.ogg" }] }, { "Name": "Illuminator", "RegImage": "/331-592-12214.png", "GoldImage": "/12-214-12214.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_089_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_089_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_089_Play_01.ogg" }] }, { "Name": "Shieldmaiden", "RegImage": "/331-478-12215.png", "GoldImage": "/12-215-12215.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_053_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_053_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_053_Play_01.ogg" }, { "Name": "Play2", "URL": "/Generic_Untargeted_Cast_01.ogg" }] }, { "Name": "Jeeves", "RegImage": "/331-611-12216.png", "GoldImage": "/12-216-12216.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_094_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/CleanMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_094_Death_04.ogg" }, { "Name": "Death2", "URL": "/CleanMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_094_Play_01.ogg" }, { "Name": "Play2", "URL": "/CleanMechSmall_Play_Underlay.ogg" }, { "Name": "Trigger1", "URL": "/VO_GVG_094_Trigger_03.ogg" }, { "Name": "Trigger2", "URL": "/CleanMechSmall_Trigger_Underlay.ogg" }] }, { "Name": "Foe Reaper 4000", "RegImage": "/331-674-12217.png", "GoldImage": "/12-217-12217.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_113_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/ClunkyMechLarge_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_113_Death_03.ogg" }, { "Name": "Death2", "URL": "/ClunkyMechLarge_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_113_Play_01.ogg" }, { "Name": "Play2", "URL": "/Battle_Play_Stinger_3.ogg" }, { "Name": "Play3", "URL": "/ClunkyMechLarge_Play_Underlay.ogg" }] }, { "Name": "Ancestor's Call", "RegImage": "/331-385-12218.png", "GoldImage": "/12-218-12218.webm", "Collectible": true, "Sounds": [] }, { "Name": "Anodized Robo Cub", "RegImage": "/331-388-12219.png", "GoldImage": "/12-219-12219.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_030_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_030_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_030_EnterPlay.ogg" }] }, { "Name": "Screwjank Clunker", "RegImage": "/331-484-12220.png", "GoldImage": "/12-220-12220.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_055_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/ClunkyMechLarge_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_055_Death_03.ogg" }, { "Name": "Death2", "URL": "/ClunkyMechLarge_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_055_Play_01.ogg" }, { "Name": "Play2", "URL": "/ClunkyMechLarge_Play_Underlay.ogg" }] }, { "Name": "Fel Cannon", "RegImage": "/331-355-12221.png", "GoldImage": "/12-221-12221.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/GVG_020_FelCannon_Attack.ogg" }, { "Name": "Death1", "URL": "/GVG_020_FelCannon_Death.ogg" }, { "Name": "Play1", "URL": "/GVG_020_FelCannon_Play.ogg" }] }, { "Name": "Cobalt Guardian", "RegImage": "/331-508-12222.png", "GoldImage": "/12-222-12222.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_062_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/CleanMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_062_Death_03.ogg" }, { "Name": "Death2", "URL": "/CleanMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_062_Play_01.ogg" }, { "Name": "Play2", "URL": "/CleanMechSmall_Play_Underlay.ogg" }] }, { "Name": "Muster for Battle", "RegImage": "/331-505-12223.png", "GoldImage": "/12-223-12223.webm", "Collectible": true, "Sounds": [] }, { "Name": "Call Pet", "RegImage": "/331-346-12224.png", "GoldImage": "/12-224-12224.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Shaman_FarSight_PreCast.ogg" }, { "Name": "Play2", "URL": "/Nature_Target_Start_01.ogg" }] }, { "Name": "Toshley", "RegImage": "/331-680-12225.png", "GoldImage": "/12-225-12225.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_115_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_115_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_115_Play_01.ogg" }, { "Name": "Play2", "URL": "/Gnome_Play_Stinger_2.ogg" }, { "Name": "Play3", "URL": "/Shared_Gearsplosion_Sound_01.ogg" }, { "Name": "Trigger1", "URL": "/Shared_Gearsplosion_Sound_01.ogg" }] }, { "Name": "Mech-Bear-Cat", "RegImage": "/331-412-12226.png", "GoldImage": "/12-226-12226.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_034_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_034_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_034_EnterPlay.ogg" }, { "Name": "Trigger1", "URL": "/Shared_Gearsplosion_Sound_01.ogg" }] }, { "Name": "Antique Healbot", "RegImage": "/331-529-12227.png", "GoldImage": "/12-227-12227.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_072_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/ClunkyMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_072_Death_04.ogg" }, { "Name": "Death2", "URL": "/ClunkyMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_072_Play_01.ogg" }, { "Name": "Play2", "URL": "/ClunkyMechSmall_Play_Underlay.ogg" }] }, { "Name": "Coghammer", "RegImage": "/331-499-12228.png", "GoldImage": "/12-228-12228.webm", "Collectible": true, "Sounds": [] }, { "Name": "Iron Sensei", "RegImage": "/331-376-12229.png", "GoldImage": "/12-229-12229.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_027_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/ClunkyMechLarge_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_027_Death_03.ogg" }, { "Name": "Death2", "URL": "/ClunkyMechLarge_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_027_Play_01_ALT.ogg" }, { "Name": "Play2", "URL": "/ClunkyMechLarge_Play_Underlay.ogg" }] }, { "Name": "Snowchugger", "RegImage": "/331-301-12230.png", "GoldImage": "/12-230-12230.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_002_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/SnowChugger_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_002_Death_03.ogg" }, { "Name": "Death2", "URL": "/SnowChugger_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_002_Play_01.ogg" }, { "Name": "Play2", "URL": "/SnowChugger_Play_Underlay.ogg" }] }, { "Name": "Whirling Zap-o-matic", "RegImage": "/331-421-12231.png", "GoldImage": "/12-231-12231.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_037_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/WhirlingZapomatic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_037_Death_03.ogg" }, { "Name": "Death2", "URL": "/WhirlingZapomatic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_037_Play_01.ogg" }, { "Name": "Play2", "URL": "/WhirlingZapomatic_Play_Underlay.ogg" }] }, { "Name": "Gahz'rilla", "RegImage": "/331-466-12232.png", "GoldImage": "/12-232-12232.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/GVG_049_Gahzrilla_Attack.ogg" }, { "Name": "Death1", "URL": "/GVG_049_Gahzrilla_Death.ogg" }, { "Name": "Play1", "URL": "/GVG_049_Gahzrilla_EnterPlay.ogg" }, { "Name": "Play2", "URL": "/Beast_Play_Stinger_2.ogg" }] }, { "Name": "Burly Rockjaw Trogg", "RegImage": "/331-526-12233.png", "GoldImage": "/12-233-12233.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_068_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_068_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_068_Play_01.ogg" }] }, { "Name": "Dunemaul Shaman", "RegImage": "/331-520-12234.png", "GoldImage": "/12-234-12234.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_066_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_066_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_066_Play_01.ogg" }, { "Name": "Trigger1", "URL": "/VO_GVG_066_Trigger_03.ogg" }] }, { "Name": "Ogre Ninja", "RegImage": "/331-589-12235.png", "GoldImage": "/12-235-12235.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_088_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_088_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_088_Play_01.ogg" }, { "Name": "Trigger1", "URL": "/VO_GVG_088_Trigger_01.ogg" }] }, { "Name": "Sabotage", "RegImage": "/331-460-12236.png", "GoldImage": "/12-236-12236.webm", "Collectible": true, "Sounds": [] }, { "Name": "Demonheart", "RegImage": "/331-352-12237.png", "GoldImage": "/12-237-12237.webm", "Collectible": true, "Sounds": [] }, { "Name": "Feign Death", "RegImage": "/331-373-12238.png", "GoldImage": "/12-238-12238.webm", "Collectible": true, "Sounds": [] }, { "Name": "Lil' Exorcist", "RegImage": "/331-620-12239.png", "GoldImage": "/12-239-12239.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_097_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_097_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_097_Play_01.ogg" }] }, { "Name": "Scarlet Purifier", "RegImage": "/331-632-12240.png", "GoldImage": "/12-240-12240.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_101_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_101_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_101_Play_01.ogg" }] }, { "Name": "Crackle", "RegImage": "/331-424-12241.png", "GoldImage": "/12-241-12241.webm", "Collectible": true, "Sounds": [] }, { "Name": "Steamwheedle Sniper", "RegImage": "/331-586-12242.png", "GoldImage": "/12-242-12242.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_087_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_087_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_087_Play_01.ogg" }] }, { "Name": "Druid of the Fang", "RegImage": "/331-562-12243.png", "GoldImage": "/12-243-12243.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_080_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/DruidOfTheFang_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_080_Death_03.ogg" }, { "Name": "Death2", "URL": "/DruidOfTheFang_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_080_Play_01.ogg" }, { "Name": "Play2", "URL": "/DruidOfTheFang_Play_Underlay.ogg" }] }, { "Name": "Bolvar Fordragon", "RegImage": "/331-511-12244.png", "GoldImage": "/12-244-12244.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_063_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_063_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_063_Play_01.ogg" }, { "Name": "Play2", "URL": "/VO_GVG_063_Play_Special_03.ogg" }, { "Name": "Play3", "URL": "/Alliance_Play_Stinger_2.ogg" }] }, { "Name": "Anima Golem", "RegImage": "/331-553-12245.png", "GoldImage": "/12-245-12245.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/GVG_077_SonOfAnimus_Attack.ogg" }, { "Name": "Death1", "URL": "/GVG_077_SonOfAnimus_Death.ogg" }, { "Name": "Play1", "URL": "/GVG_077_SonOfAnimus_EnterPlay.ogg" }] }, { "Name": "Arcane Nullifier X-21", "RegImage": "/331-599-12246.png", "GoldImage": "/12-246-12246.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_091_Attack_02_ALT.ogg" }, { "Name": "Attack2", "URL": "/ClunkyMechLarge_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_091_Death_03.ogg" }, { "Name": "Death2", "URL": "/ClunkyMechLarge_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_091_Play_01.ogg" }, { "Name": "Play2", "URL": "/ClunkyMechLarge_Play_Underlay.ogg" }] }, { "Name": "Flying Machine", "RegImage": "/331-577-12247.png", "GoldImage": "/12-247-12247.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_084_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/FlyingMachine_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_084_Death_03.ogg" }, { "Name": "Death2", "URL": "/FlyingMachine_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_084_Play_01.ogg" }, { "Name": "Play2", "URL": "/FlyingMachine_Play_Underlay.ogg" }] }, { "Name": "Force-Tank MAX", "RegImage": "/331-559-12248.png", "GoldImage": "/12-248-12248.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_079_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_079_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_079_EnterPlay.ogg" }] }, { "Name": "Gilblin Stalker", "RegImage": "/331-568-12249.png", "GoldImage": "/12-249-12249.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_081_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_081_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_081_Play_01.ogg" }] }, { "Name": "Hobgoblin", "RegImage": "/331-641-12250.png", "GoldImage": "/12-250-12250.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_104_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_104_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_104_Play_01.ogg" }] }, { "Name": "Junkbot", "RegImage": "/331-647-12251.png", "GoldImage": "/12-251-12251.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_106_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/CleanMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_106_Death_03.ogg" }, { "Name": "Death2", "URL": "/CleanMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_106_Play_01.ogg" }, { "Name": "Play2", "URL": "/CleanMechSmall_Play_Underlay.ogg" }] }, { "Name": "Kezan Mystic", "RegImage": "/331-544-12252.png", "GoldImage": "/12-252-12252.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_074_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_074_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_074_Play_01.ogg" }] }, { "Name": "Mechanical Yeti", "RegImage": "/331-556-12253.png", "GoldImage": "/12-253-12253.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_078_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_078_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_078_EnterPlay.ogg" }, { "Name": "Trigger1", "URL": "/Shared_Gearsplosion_Sound_01.ogg" }] }, { "Name": "Metaltooth Leaper", "RegImage": "/331-463-12254.png", "GoldImage": "/12-254-12254.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_048_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_048_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_048_EnterPlay.ogg" }] }, { "Name": "One-eyed Cheat", "RegImage": "/331-370-12255.png", "GoldImage": "/12-255-12255.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_025_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/OneEyedCheat_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_025_Death_03.ogg" }, { "Name": "Death2", "URL": "/OneEyedCheat_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_025_Play_01.ogg" }, { "Name": "Play2", "URL": "/OneEyedCheat_Play_Underlay.ogg" }] }, { "Name": "Shadowboxer", "RegImage": "/331-538-12256.png", "GoldImage": "/12-256-12256.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_072_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_072_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_072_EnterPlay.ogg" }] }, { "Name": "Shielded Minibot", "RegImage": "/331-496-12257.png", "GoldImage": "/12-257-12257.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_058_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/CleanMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_058_Death_03.ogg" }, { "Name": "Death2", "URL": "/CleanMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_058_Play_01.ogg" }, { "Name": "Play2", "URL": "/CleanMechSmall_Play_Underlay.ogg" }] }, { "Name": "Ship's Cannon", "RegImage": "/331-547-12258.png", "GoldImage": "/12-258-12258.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_075_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_075_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_075_EnterPlay.ogg" }] }, { "Name": "Vitality Totem", "RegImage": "/331-427-12259.png", "GoldImage": "/12-259-12259.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_039_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_039_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_039_EnterPlay.ogg" }] }, { "Name": "Warbot", "RegImage": "/331-472-12260.png", "GoldImage": "/12-260-12260.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_051_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/ClunkyMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_051_Death_03.ogg" }, { "Name": "Death2", "URL": "/ClunkyMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_051_Play_01.ogg" }, { "Name": "Play2", "URL": "/ClunkyMechSmall_Play_Underlay.ogg" }] }, { "Name": "Wee Spellstopper", "RegImage": "/331-701-12261.png", "GoldImage": "/12-261-12261.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_122_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_122_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_122_Play_01.ogg" }] }, { "Name": "Mini-Mage", "RegImage": "/331-656-12262.png", "GoldImage": "/12-262-12262.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_109_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_109_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_109_Play_01.ogg" }] }, { "Name": "Salty Dog", "RegImage": "/331-532-12263.png", "GoldImage": "/12-263-12263.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_070_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_070_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_070_Play_01.ogg" }] }, { "Name": "Fel Reaver", "RegImage": "/331-343-12264.png", "GoldImage": "/12-264-12264.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_016_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_016_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_016_EnterPlay.ogg" }] }, { "Name": "Cogmaster's Wrench", "RegImage": "/331-367-12265.png", "GoldImage": "/12-265-12265.webm", "Collectible": true, "Sounds": [] }, { "Name": "Stonesplinter Trogg", "RegImage": "/331-523-12266.png", "GoldImage": "/12-266-12266.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_067_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_067_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_067_Play_01.ogg" }] }, { "Name": "Glaivezooka", "RegImage": "/331-445-12267.png", "GoldImage": "/12-267-12267.webm", "Collectible": true, "Sounds": [] }, { "Name": "Hemet Nesingwary", "RegImage": "/331-695-12268.png", "GoldImage": "/12-268-12268.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_120_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_120_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_120_Play_01.ogg" }, { "Name": "Play10", "URL": "/FX_FireballEvent04_SpellImpact_01.ogg" }, { "Name": "Play11", "URL": "/Tutorial_Rifle_Fire_01.ogg" }, { "Name": "Play12", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Beast_Villain.ogg" }, { "Name": "Play3", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play4", "URL": "/FX_FireballEvent04_SpellCancel_01.ogg" }, { "Name": "Play5", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play6", "URL": "/FX_FireballEvent04_SpellImpact_01.ogg" }, { "Name": "Play7", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play8", "URL": "/FX_FireballEvent04_SpellCancel_01.ogg" }, { "Name": "Play9", "URL": "/Tutorial_Rifle_Fire_01.ogg" }] }, { "Name": "Powermace", "RegImage": "/331-418-12269.png", "GoldImage": "/12-269-12269.webm", "Collectible": true, "Sounds": [] }, { "Name": "Tree of Life", "RegImage": "/331-409-12270.png", "GoldImage": "/12-270-12270.webm", "Collectible": true, "Sounds": [] }, { "Name": "Floating Watcher", "RegImage": "/331-629-12271.png", "GoldImage": "/12-271-12271.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_100_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/FloatingWatcher_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_100_Death_04.ogg" }, { "Name": "Death2", "URL": "/FloatingWatcher_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_100_Play_01.ogg" }, { "Name": "Play2", "URL": "/FloatingWatcher_Play_Underlay.ogg" }, { "Name": "Trigger1", "URL": "/VO_GVG_100_Trigger_03.ogg" }, { "Name": "Trigger2", "URL": "/FloatingWatcher_Trigger_Underlay.ogg" }] }, { "Name": "Troggzor the Earthinator", "RegImage": "/331-689-12272.png", "GoldImage": "/12-272-12272.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_118_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_118_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_118_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Misc2.ogg" }] }, { "Name": "Grove Tender", "RegImage": "/331-400-12273.png", "GoldImage": "/12-273-12273.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_032_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/FourHoofSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_032_Death_03.ogg" }, { "Name": "Death2", "URL": "/FourHoofSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_032_Play_01.ogg" }, { "Name": "Play2", "URL": "/FourHoofSmall_Play_Underlay.ogg" }] }, { "Name": "Puddlestomper", "RegImage": "/331-514-12274.png", "GoldImage": "/12-274-12274.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_064_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_064_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_064_EnterPlay.ogg" }] }, { "Name": "Siege Engine", "RegImage": "/331-583-12275.png", "GoldImage": "/12-275-12275.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/GVG_086_SiegeEngine_Attack.ogg" }, { "Name": "Death1", "URL": "/GVG_086_SiegeEngine_Death.ogg" }, { "Name": "Play1", "URL": "/GVG_086_SiegeEngine_EnterPlay.ogg" }] }, { "Name": "Tinker's Sharpsword Oil", "RegImage": "/331-361-12276.png", "GoldImage": "/12-276-12276.webm", "Collectible": true, "Sounds": [] }, { "Name": "Siltfin Spiritwalker", "RegImage": "/331-430-12277.png", "GoldImage": "/12-277-12277.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/GVG_040_SiltfinSpiritwalker_Attack.ogg" }, { "Name": "Death1", "URL": "/GVG_040_SiltfinSpiritwalker_Death.ogg" }, { "Name": "Play1", "URL": "/GVG_040_SiltfinSpiritwalker_EnterPlay.ogg" }] }, { "Name": "Shadowbomber", "RegImage": "/331-322-12278.png", "GoldImage": "/12-278-12278.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_009_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_009_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_009_Play_01_ALT.ogg" }] }, { "Name": "Recycle", "RegImage": "/331-397-12279.png", "GoldImage": "/12-279-12279.webm", "Collectible": true, "Sounds": [] }, { "Name": "Quartermaster", "RegImage": "/331-502-12280.png", "GoldImage": "/12-280-12280.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_060_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_060_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_060_Play_01.ogg" }] }, { "Name": "Ogre Brute", "RegImage": "/331-517-12281.png", "GoldImage": "/12-281-12281.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_065_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_065_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_065_Play_01.ogg" }, { "Name": "Trigger1", "URL": "/VO_GVG_065_Trigger_03.ogg" }] }, { "Name": "Mogor the Ogre", "RegImage": "/331-671-12282.png", "GoldImage": "/12-282-12282.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_112_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_112_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_112_Play_01.ogg" }, { "Name": "Play2", "URL": "/Battle_Play_Stinger_2.ogg" }, { "Name": "Trigger1", "URL": "/VO_GVG_112_Trigger_03.ogg" }] }, { "Name": "Mistress of Pain", "RegImage": "/339-278-12283.png", "GoldImage": "/12-283-12283.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_018_Attack_02_Alt.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_018_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_018_Play_01.ogg" }] }, { "Name": "Lost Tallstrider", "RegImage": "/331-535-12284.png", "GoldImage": "/12-284-12284.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/GVG_071_LostTallstrider_Attack.ogg" }, { "Name": "Death1", "URL": "/GVG_071_LostTallstrider_Death.ogg" }, { "Name": "Play1", "URL": "/GVG_071_LostTallstrider_EnterPlay.ogg" }] }, { "Name": "King of Beasts", "RegImage": "/331-457-12285.png", "GoldImage": "/12-285-12285.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_046_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_046_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_046_EnterPlay.ogg" }] }, { "Name": "Gnomeregan Infantry", "RegImage": "/331-623-12286.png", "GoldImage": "/12-286-12286.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_098_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_098_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_098_Play_01.ogg" }] }, { "Name": "Gazlowe", "RegImage": "/331-686-12287.png", "GoldImage": "/12-287-12287.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_117_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_117_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_117_Play_01.ogg" }, { "Name": "Play2", "URL": "/NeutralGoblin_Stinger_1.ogg" }] }, { "Name": "Target Dummy", "RegImage": "/331-608-12288.png", "GoldImage": "/12-288-12288.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/GVG_093_TargetDummy_Attack.ogg" }, { "Name": "Death1", "URL": "/GVG_093_TargetDummy_Death.ogg" }, { "Name": "Play1", "URL": "/GVG_093_TargetDummy_EnterPlay.ogg" }] }, { "Name": "Flame Leviathan", "RegImage": "/331-316-12290.png", "GoldImage": "/12-290-12290.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_007_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/SFX_GVG_007_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_007_Death_03.ogg" }, { "Name": "Death2", "URL": "/SFX_GVG_007_Death.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_007_Play_01.ogg" }, { "Name": "Play2", "URL": "/SFX_GVG_007_EnterPlay.ogg" }, { "Name": "Play3", "URL": "/Ulduar_Play_Stinger_1.ogg" }, { "Name": "Trigger1", "URL": "/VO_GVG_007_Trigger_04.ogg" }, { "Name": "Trigger2", "URL": "/SFX_GVG_007_Trigger.ogg" }] }, { "Name": "Trade Prince Gallywix", "RegImage": "/331-379-12291.png", "GoldImage": "/12-291-12291.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_028_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_028_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_028_Play_01.ogg" }, { "Name": "Play2", "URL": "/Goblin_Play_Stinger_1.ogg" }, { "Name": "Trigger1", "URL": "/VO_GVG_028_Trigger_03.ogg" }, { "Name": "Trigger2", "URL": "/GadgetzanAuctioneer_card_spawn_coins.ogg" }] }, { "Name": "Neptulon", "RegImage": "/331-442-12292.png", "GoldImage": "/12-292-12292.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_042_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/Neptulon_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_042_Death_03.ogg" }, { "Name": "Death2", "URL": "/Neptulon_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_042_Play_01.ogg" }, { "Name": "Play2", "URL": "/Neptulon_Play_Stinger.ogg" }, { "Name": "Play3", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Malorne", "RegImage": "/331-415-12293.png", "GoldImage": "/12-293-12293.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_035_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/FourHoofLarge_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_035_Death_04.ogg" }, { "Name": "Death2", "URL": "/FourHoofLarge_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_035_Play_01.ogg" }, { "Name": "Play2", "URL": "/Hyjal_Play_Stinger_1.ogg" }, { "Name": "Trigger1", "URL": "/VO_GVG_035_Trigger_03.ogg" }] }, { "Name": "Mal'Ganis", "RegImage": "/331-358-12294.png", "GoldImage": "/12-294-12294.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_021_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_021_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_021_Play_01.ogg" }, { "Name": "Play2", "URL": "/MalGanis_Play_Stinger.ogg" }] }, { "Name": "Iron Juggernaut", "RegImage": "/331-487-12295.png", "GoldImage": "/12-295-12295.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/GVG_056_IronJuggernaut_Attack.ogg" }, { "Name": "Death1", "URL": "/GVG_056_IronJuggernaut_Death.ogg" }, { "Name": "Play1", "URL": "/GVG_056_IronJuggernaut_EnterPlay.ogg" }, { "Name": "Play2", "URL": "/GarroshTheme_Play_Stinger_1.ogg" }] }, { "Name": "Vol'jin", "RegImage": "/331-337-12296.png", "GoldImage": "/12-296-12296.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_014_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_014_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_014_Play_01.ogg" }, { "Name": "Play2", "URL": "/VO_GVG_014_Play_Special_03.ogg" }, { "Name": "Play3", "URL": "/Troll_Play_Stinger_1.ogg" }] }, { "Name": "Light of the Naaru", "RegImage": "/331-331-12297.png", "GoldImage": "/12-297-12297.webm", "Collectible": true, "Sounds": [] }, { "Name": "Dark Wispers", "RegImage": "/331-433-12298.png", "GoldImage": "/12-298-12298.webm", "Collectible": true, "Sounds": [] }, { "Name": "Darkbomb", "RegImage": "/331-340-12299.png", "GoldImage": "/12-299-12299.webm", "Collectible": true, "Sounds": [] }, { "Name": "Young Priestess", "RegImage": "/330-345-123.png", "GoldImage": "/0-123-123.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_004_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_004_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_004_Play_01.ogg" }] }, { "Name": "Echo of Medivh", "RegImage": "/331-310-12300.png", "GoldImage": "/12-300-12300.webm", "Collectible": true, "Sounds": [] }, { "Name": "Lightbomb", "RegImage": "/331-319-12301.png", "GoldImage": "/12-301-12301.webm", "Collectible": true, "Sounds": [] }, { "Name": "Imp-losion", "RegImage": "/331-451-12302.png", "GoldImage": "/12-302-12302.webm", "Collectible": true, "Sounds": [] }, { "Name": "Crush", "RegImage": "/331-475-12303.png", "GoldImage": "/12-303-12303.webm", "Collectible": true, "Sounds": [] }, { "Name": "Cobra Shot", "RegImage": "/331-541-12304.png", "GoldImage": "/12-304-12304.webm", "Collectible": true, "Sounds": [] }, { "Name": "Seal of Light", "RegImage": "/331-493-12305.png", "GoldImage": "/12-305-12305.webm", "Collectible": true, "Sounds": [] }, { "Name": "Soot Spewer", "RegImage": "/331-704-12306.png", "GoldImage": "/12-306-12306.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_123_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_123_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_123_EnterPlay.ogg" }] }, { "Name": "Gallywix's Coin", "RegImage": "/331-382-12327.png", "GoldImage": "/12-327-12327.webm", "Sounds": [] }, { "Name": "Attack Mode", "RegImage": "/331-391-12328.png", "GoldImage": "/12-328-12328.webm", "Sounds": [] }, { "Name": "Tank Mode", "RegImage": "/331-394-12330.png", "GoldImage": "/12-330-12330.webm", "Sounds": [] }, { "Name": "Gift of Mana", "RegImage": "/331-403-12332.png", "GoldImage": "/12-332-12332.webm", "Sounds": [] }, { "Name": "Gift of Cards", "RegImage": "/331-406-12333.png", "GoldImage": "/12-333-12333.webm", "Sounds": [] }, { "Name": "Dark Wispers", "RegImage": "/331-436-12335.png", "GoldImage": "/12-335-12335.webm", "Sounds": [] }, { "Name": "Dark Wispers", "RegImage": "/331-439-12336.png", "GoldImage": "/12-336-12336.webm", "Sounds": [] }, { "Name": "Imp", "RegImage": "/331-454-12339.png", "GoldImage": "/12-339-12339.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_045t_Imp_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_045t_Imp_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_045t_Imp_EnterPlay.ogg" }] }, { "Name": "Burrowing Mine", "RegImage": "/331-490-12345.png", "GoldImage": "/12-345-12345.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/BurrowingMine_trigger.ogg" }] }, { "Name": "Druid of the Fang", "RegImage": "/331-565-12353.png", "GoldImage": "/12-353-12353.webm", "Sounds": [{ "Name": "Attack1", "URL": "/GVG_080t_DruidOfTheFang_Serpent_Attack.ogg" }, { "Name": "Death1", "URL": "/GVG_080t_DruidOfTheFang_Serpent_Death.ogg" }, { "Name": "Play1", "URL": "/GVG_080t_DruidOfTheFang_Serpent_Play.ogg" }] }, { "Name": "Chicken", "RegImage": "/331-605-12355.png", "GoldImage": "/12-355-12355.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_Mekka4t_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_Mekka4t_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_Mekka4t_EnterPlay.ogg" }] }, { "Name": "Boom Bot", "RegImage": "/331-662-12361.png", "GoldImage": "/12-361-12361.webm", "Sounds": [{ "Name": "Attack1", "URL": "/GVG_110t_BoomBot_Attack.ogg" }, { "Name": "Death1", "URL": "/GVG_110t_BoomBot_Death.ogg" }, { "Name": "Play1", "URL": "/GVG_110t_BoomBot_EnterPlay.ogg" }] }, { "Name": "V-07-TR-0N", "RegImage": "/331-668-12362.png", "GoldImage": "/12-362-12362.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_111t_Attack_06.ogg" }, { "Name": "Attack2", "URL": "/CleanMechLarge_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_111t_Death_07.ogg" }, { "Name": "Death2", "URL": "/CleanMechLarge_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_111t_Play_05.ogg" }, { "Name": "Play2", "URL": "/CleanMechLarge_Play_Underlay.ogg" }] }, { "Name": "Armor Plating", "RegImage": "/334-50-12366.png", "GoldImage": "/12-366-12366.webm", "Sounds": [] }, { "Name": "Time Rewinder", "RegImage": "/334-53-12368.png", "GoldImage": "/12-368-12368.webm", "Sounds": [] }, { "Name": "Rusty Horn", "RegImage": "/334-56-12369.png", "GoldImage": "/12-369-12369.webm", "Sounds": [] }, { "Name": "Finicky Cloakfield", "RegImage": "/334-59-12370.png", "GoldImage": "/12-370-12370.webm", "Sounds": [] }, { "Name": "Emergency Coolant", "RegImage": "/334-62-12372.png", "GoldImage": "/12-372-12372.webm", "Sounds": [] }, { "Name": "Reversing Switch", "RegImage": "/334-65-12373.png", "GoldImage": "/12-373-12373.webm", "Sounds": [] }, { "Name": "Whirling Blades", "RegImage": "/334-68-12375.png", "GoldImage": "/12-375-12375.webm", "Sounds": [] }, { "Name": "Earth Elemental", "RegImage": "/339-175-124.png", "GoldImage": "/0-124-124.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_250_Earth_Elemental_Attack3.ogg" }, { "Name": "Death1", "URL": "/EX1_250_Earth_Elemental_Death2.ogg" }, { "Name": "Play1", "URL": "/EX1_250_Earth_Elemental_EnterPlay2.ogg" }] }, { "Name": "Ethereal Arcanist", "RegImage": "/330-701-125.png", "GoldImage": "/0-125-125.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_274_Ethereal_Arcanist_Attack1.ogg" }, { "Name": "Death1", "URL": "/EX1_274_Ethereal_Arcanist_Death1.ogg" }, { "Name": "Play1", "URL": "/EX1_274_Ethereal_Arcanist_EnterPlay1.ogg" }] }, { "Name": "Lesser Heal", "RegImage": "/329-871-126.png", "GoldImage": "/0-126-126.webm", "Sounds": [] }, { "Name": "Master of Disguise", "RegImage": "/333-471-127.png", "GoldImage": "/0-127-127.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_014_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_014_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_014_Play_01.ogg" }] }, { "Name": "Dark Iron Dwarf", "RegImage": "/330-426-128.png", "GoldImage": "/0-128-128.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_046_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_046_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_046_Play_01.ogg" }] }, { "Name": "Dust Devil", "RegImage": "/330-668-129.png", "GoldImage": "/0-129-129.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_243_Dust_Devil_Attack3.ogg" }, { "Name": "Death1", "URL": "/EX1_243_Dust_Devil_Death3.ogg" }, { "Name": "Play1", "URL": "/EX1_243_Dust_Devil_EnterPlay1.ogg" }] }, { "Name": "Kor'kron Elite", "RegImage": "/333-465-130.png", "GoldImage": "/0-130-130.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_011_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_011_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_011_Play_01.ogg" }] }, { "Name": "Gadgetzan Auctioneer", "RegImage": "/330-486-131.png", "GoldImage": "/0-131-131.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_095_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_095_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_095_Play_01.ogg" }] }, { "Name": "Mark of Nature", "RegImage": "/330-582-133.png", "GoldImage": "/0-133-133.webm", "Sounds": [] }, { "Name": "Headcrack", "RegImage": "/330-558-135.png", "GoldImage": "/0-135-135.webm", "Collectible": true, "Sounds": [] }, { "Name": "Massive Gnoll", "RegImage": "/334-746-137.png", "GoldImage": "/0-137-137.webm", "Sounds": [{ "Name": "Death1", "URL": "/WoW_TU4a_003_Gnoll_Death.ogg" }, { "Name": "Play1", "URL": "/GnollPissed2.ogg" }] }, { "Name": "Priestess of Elune", "RegImage": "/331-46-138.png", "GoldImage": "/0-138-138.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_583_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_583_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_583_Play_01.ogg" }] }, { "Name": "Jaina Proudmoore", "RegImage": "/334-749-139.png", "GoldImage": "/0-139-139.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_08_Attack_71.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_08_Death_72.ogg" }] }, { "Name": "Patient Assassin", "RegImage": "/330-932-14.png", "GoldImage": "/0-14-14.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_522_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_522_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_522_Play_01.ogg" }] }, { "Name": "Cult Master", "RegImage": "/331-70-140.png", "GoldImage": "/0-140-140.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_595_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_595_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_595_Play_01.ogg" }] }, { "Name": "The Coin", "RegImage": "/331-292-141.png", "GoldImage": "/0-141-141.webm", "Sounds": [] }, { "Name": "Avenging Wrath", "RegImage": "/330-857-142.png", "GoldImage": "/0-142-142.webm", "Collectible": true, "Sounds": [] }, { "Name": "Dark Iron Skulker", "RegImage": "/328-274-14434.png", "GoldImage": "/14-434-14434.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_008_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_008_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRM_008_Play_01.ogg" }] }, { "Name": "Grim Patron", "RegImage": "/328-320-14435.png", "GoldImage": "/14-435-14435.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_019_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_019_Death_04_ALT2.ogg" }, { "Name": "Play1", "URL": "/VO_BRM_019_Play_01.ogg" }, { "Name": "Trigger1", "URL": "/VO_BRM_019_Trigger_03.ogg" }] }, { "Name": "Hungry Dragon", "RegImage": "/328-338-14436.png", "GoldImage": "/14-436-14436.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/BRM_026_HungryDragon_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRM_026_HungryDragon_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRM_026_HungryDragon_EnterPlay_1.ogg" }] }, { "Name": "Blackwing Technician", "RegImage": "/328-368-14437.png", "GoldImage": "/14-437-14437.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_033_Attack_03.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_033_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_BRM_033_Play_01.ogg" }] }, { "Name": "Rend Blackhand", "RegImage": "/328-356-14438.png", "GoldImage": "/14-438-14438.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA09_1_RESPONSE_04.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_029_Death_10.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA09_1_START_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Misc2.ogg" }] }, { "Name": "Axe Flinger", "RegImage": "/328-311-14439.png", "GoldImage": "/14-439-14439.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_016_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_016_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRM_016_Play_01.ogg" }] }, { "Name": "Lava Shock", "RegImage": "/328-296-14440.png", "GoldImage": "/14-440-14440.webm", "Collectible": true, "Sounds": [] }, { "Name": "Dragonkin Sorcerer", "RegImage": "/328-323-14441.png", "GoldImage": "/14-441-14441.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_020_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_020_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRM_020_Play_01.ogg" }] }, { "Name": "Dragon Egg", "RegImage": "/328-326-14442.png", "GoldImage": "/14-442-14442.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/BRM_022_4 DragonEgg_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRM_022_4 DragonEgg_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRM_022_4 DragonEgg_EnterPlay_1.ogg" }, { "Name": "Trigger1", "URL": "/DragonEgg_Burst_FX_Sound_01.ogg" }, { "Name": "Trigger2", "URL": "/DragonEgg_Burst_FX_Sound_02.ogg" }, { "Name": "Trigger3", "URL": "/DragonEgg_Burst_FX_Sound_03.ogg" }] }, { "Name": "Imp Gang Boss", "RegImage": "/328-265-14443.png", "GoldImage": "/14-443-14443.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_006_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_006_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRM_006_Play_01.ogg" }] }, { "Name": "Core Rager", "RegImage": "/328-305-14444.png", "GoldImage": "/14-444-14444.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/BRM_014_CoreRager_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRM_014_CoreRager_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRM_014_CoreRager_EnterPlay_1.ogg" }] }, { "Name": "Flamewaker", "RegImage": "/328-250-14445.png", "GoldImage": "/14-445-14445.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_002_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_002_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRM_002_Play_01.ogg" }] }, { "Name": "Dragon's Breath", "RegImage": "/328-253-14446.png", "GoldImage": "/14-446-14446.webm", "Collectible": true, "Sounds": [] }, { "Name": "Blackwing Corruptor", "RegImage": "/328-371-14447.png", "GoldImage": "/14-447-14447.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_034_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_034_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRM_034_Play_01.ogg" }] }, { "Name": "Nefarian", "RegImage": "/328-359-14448.png", "GoldImage": "/14-448-14448.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_030_Attack_20.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_030_Death_21.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA13_1_HP_GENERIC_18.ogg" }, { "Name": "Play10", "URL": "/VO_BRMA13_1_HP_WARRIOR_09.ogg" }, { "Name": "Play11", "URL": "/Pegasus_Stinger_Deathwing2.ogg" }, { "Name": "Play2", "URL": "/VO_BRMA13_1_HP_DRUID_14.ogg" }, { "Name": "Play3", "URL": "/VO_BRMA13_1_HP_HUNTER_12.ogg" }, { "Name": "Play4", "URL": "/VO_BRMA13_1_HP_MAGE_11.ogg" }, { "Name": "Play5", "URL": "/VO_BRMA13_1_HP_PALADIN_07.ogg" }, { "Name": "Play6", "URL": "/VO_BRMA13_1_HP_PRIEST_08.ogg" }, { "Name": "Play7", "URL": "/VO_BRMA13_1_HP_ROGUE_15.ogg" }, { "Name": "Play8", "URL": "/VO_BRMA13_1_HP_SHAMAN_13.ogg" }, { "Name": "Play9", "URL": "/VO_BRMA13_1_HP_WARLOCK_10.ogg" }] }, { "Name": "Drakonid Crusher", "RegImage": "/328-332-14449.png", "GoldImage": "/14-449-14449.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_024_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_024_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRM_024_Play_01.ogg" }] }, { "Name": "Volcanic Drake", "RegImage": "/328-335-14450.png", "GoldImage": "/14-450-14450.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/BRM_025_VolcanicDrake_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRM_025_VolcanicDrake_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRM_025_VolcanicDrake_EnterPlay_1.ogg" }] }, { "Name": "Chromaggus", "RegImage": "/328-365-14451.png", "GoldImage": "/14-451-14451.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/BRM_031_Chromaggus_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRM_031_Chromaggus_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRM_031_Chromaggus_EnterPlay_1.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Deathwing.ogg" }, { "Name": "Trigger1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Dragon Consort", "RegImage": "/328-317-14452.png", "GoldImage": "/14-452-14452.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/BRM_018_DragonConsort_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRM_018_DragonConsort_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRM_018_DragonConsort_EnterPlay_1.ogg" }] }, { "Name": "Solemn Vigil", "RegImage": "/328-247-14453.png", "GoldImage": "/14-453-14453.webm", "Collectible": true, "Sounds": [] }, { "Name": "Emperor Thaurissan", "RegImage": "/328-353-14454.png", "GoldImage": "/14-454-14454.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA03_1_HERO_POWER_06.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_028_Death_08.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA03_1_CARD_04.ogg" }, { "Name": "Play2", "URL": "/Battle_Play_Stinger_2.ogg" }] }, { "Name": "Fireguard Destroyer", "RegImage": "/328-299-14455.png", "GoldImage": "/14-455-14455.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_012_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_012_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRM_012_Play_01.ogg" }] }, { "Name": "Majordomo Executus", "RegImage": "/328-341-14456.png", "GoldImage": "/14-456-14456.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA06_1_TURN1_02_ALT.ogg" }, { "Name": "Death1", "URL": "/BRM_027_MajordomoExecutus_Death_1.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA06_1_START_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_War.ogg" }, { "Name": "Trigger1", "URL": "/VO_BRMA06_3_INTRO_01.ogg" }, { "Name": "Trigger2", "URL": "/Pegasus_Stinger_Ragnaros.ogg" }] }, { "Name": "Druid of the Flame", "RegImage": "/328-280-14457.png", "GoldImage": "/14-457-14457.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_010_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_010_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRM_010_Play_01.ogg" }] }, { "Name": "Volcanic Lumberer", "RegImage": "/328-277-14458.png", "GoldImage": "/14-458-14458.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/BRM_009_VolcanicLumberer_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRM_009_VolcanicLumberer_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRM_009_VolcanicLumberer_Play_1.ogg" }] }, { "Name": "Quick Shot", "RegImage": "/328-302-14459.png", "GoldImage": "/14-459-14459.webm", "Collectible": true, "Sounds": [] }, { "Name": "Twilight Whelp", "RegImage": "/328-256-14460.png", "GoldImage": "/14-460-14460.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_BRM_004_Twilight_Whelp_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_BRM_004_Twilight_Whelp_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_BRM_004_Twilight_Whelp_EnterPlay.ogg" }] }, { "Name": "Resurrect", "RegImage": "/328-314-14461.png", "GoldImage": "/14-461-14461.webm", "Collectible": true, "Sounds": [] }, { "Name": "Gang Up", "RegImage": "/328-271-14462.png", "GoldImage": "/14-462-14462.webm", "Collectible": true, "Sounds": [] }, { "Name": "Demonwrath", "RegImage": "/328-262-14463.png", "GoldImage": "/14-463-14463.webm", "Collectible": true, "Sounds": [] }, { "Name": "Revenge", "RegImage": "/328-308-14464.png", "GoldImage": "/14-464-14464.webm", "Collectible": true, "Sounds": [] }, { "Name": "Coren Direbrew", "RegImage": "/328-377-14470.png", "GoldImage": "/14-470-14470.webm", "Sounds": [] }, { "Name": "Coren Direbrew", "RegImage": "/328-380-14471.png", "GoldImage": "/14-471-14471.webm", "Sounds": [] }, { "Name": "Pile On!", "RegImage": "/328-383-14472.png", "GoldImage": "/14-472-14472.webm", "Sounds": [{ "Name": "Play1", "URL": "/Pile_On_card_draw.ogg" }] }, { "Name": "Pile On!", "RegImage": "/328-386-14473.png", "GoldImage": "/14-473-14473.webm", "Sounds": [{ "Name": "Play1", "URL": "/Pile_On_card_draw.ogg" }] }, { "Name": "Dark Iron Bouncer", "RegImage": "/328-395-14474.png", "GoldImage": "/14-474-14474.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA01_3_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA01_3_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA01_3_Play_01.ogg" }] }, { "Name": "Get 'em!", "RegImage": "/328-398-14475.png", "GoldImage": "/14-475-14475.webm", "Sounds": [] }, { "Name": "Guzzler", "RegImage": "/328-401-14476.png", "GoldImage": "/14-476-14476.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA01_4t_Attack_05.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA01_4t_Death_06.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA01_4t_Play1_01.ogg" }] }, { "Name": "High Justice Grimstone", "RegImage": "/328-404-14477.png", "GoldImage": "/14-477-14477.webm", "Sounds": [] }, { "Name": "High Justice Grimstone", "RegImage": "/328-407-14478.png", "GoldImage": "/14-478-14478.webm", "Sounds": [] }, { "Name": "Jeering Crowd", "RegImage": "/328-410-14479.png", "GoldImage": "/14-479-14479.webm", "Sounds": [{ "Name": "Play1", "URL": "/JeeringCrowd_1.ogg" }] }, { "Name": "Jeering Crowd", "RegImage": "/328-419-14480.png", "GoldImage": "/14-480-14480.webm", "Sounds": [{ "Name": "Play1", "URL": "/JeeringCrowd_1.ogg" }] }, { "Name": "Dark Iron Spectator", "RegImage": "/328-422-14481.png", "GoldImage": "/14-481-14481.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA02_2t_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA02_2t_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA02_2t_Play_01.ogg" }] }, { "Name": "Emperor Thaurissan", "RegImage": "/328-425-14482.png", "GoldImage": "/14-482-14482.webm", "Sounds": [] }, { "Name": "Emperor Thaurissan", "RegImage": "/328-428-14483.png", "GoldImage": "/14-483-14483.webm", "Sounds": [] }, { "Name": "Power of the Firelord", "RegImage": "/328-431-14484.png", "GoldImage": "/14-484-14484.webm", "Sounds": [] }, { "Name": "Moira Bronzebeard", "RegImage": "/328-434-14485.png", "GoldImage": "/14-485-14485.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA03_3_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA03_3_Death_02.ogg" }] }, { "Name": "Moira Bronzebeard", "RegImage": "/328-437-14486.png", "GoldImage": "/14-486-14486.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA03_3_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA03_3_Death_02.ogg" }] }, { "Name": "Garr", "RegImage": "/328-440-14487.png", "GoldImage": "/14-487-14487.webm", "Sounds": [] }, { "Name": "Garr", "RegImage": "/328-443-14488.png", "GoldImage": "/14-488-14488.webm", "Sounds": [] }, { "Name": "Magma Pulse", "RegImage": "/328-446-14489.png", "GoldImage": "/14-489-14489.webm", "Sounds": [] }, { "Name": "Firesworn", "RegImage": "/328-449-14490.png", "GoldImage": "/14-490-14490.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_BRMA04_3_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_BRMA04_3_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_BRMA04_3_Play.ogg" }] }, { "Name": "Firesworn", "RegImage": "/328-452-14491.png", "GoldImage": "/14-491-14491.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_BRMA04_3_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_BRMA04_3_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_BRMA04_3_Play.ogg" }] }, { "Name": "Rock Out", "RegImage": "/328-455-14492.png", "GoldImage": "/14-492-14492.webm", "Sounds": [] }, { "Name": "Rock Out", "RegImage": "/328-458-14493.png", "GoldImage": "/14-493-14493.webm", "Sounds": [] }, { "Name": "Baron Geddon", "RegImage": "/328-461-14494.png", "GoldImage": "/14-494-14494.webm", "Sounds": [] }, { "Name": "Baron Geddon", "RegImage": "/328-464-14495.png", "GoldImage": "/14-495-14495.webm", "Sounds": [] }, { "Name": "Ignite Mana", "RegImage": "/328-467-14496.png", "GoldImage": "/14-496-14496.webm", "Sounds": [] }, { "Name": "Ignite Mana", "RegImage": "/328-470-14497.png", "GoldImage": "/14-497-14497.webm", "Sounds": [] }, { "Name": "Living Bomb", "RegImage": "/328-473-14498.png", "GoldImage": "/14-498-14498.webm", "Sounds": [] }, { "Name": "Living Bomb", "RegImage": "/328-476-14500.png", "GoldImage": "/14-500-14500.webm", "Sounds": [] }, { "Name": "Majordomo Executus", "RegImage": "/328-479-14502.png", "GoldImage": "/14-502-14502.webm", "Sounds": [] }, { "Name": "Majordomo Executus", "RegImage": "/328-482-14503.png", "GoldImage": "/14-503-14503.webm", "Sounds": [] }, { "Name": "The Majordomo", "RegImage": "/328-485-14504.png", "GoldImage": "/14-504-14504.webm", "Sounds": [] }, { "Name": "The Majordomo", "RegImage": "/328-488-14505.png", "GoldImage": "/14-505-14505.webm", "Sounds": [] }, { "Name": "Ragnaros the Firelord", "RegImage": "/328-494-14506.png", "GoldImage": "/14-506-14506.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_027h_Attack_15.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_027h_Death_63.ogg" }] }, { "Name": "Ragnaros the Firelord", "RegImage": "/328-497-14507.png", "GoldImage": "/14-507-14507.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_027h_Attack_15.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_027h_Death_63.ogg" }] }, { "Name": "Flamewaker Acolyte", "RegImage": "/328-500-14508.png", "GoldImage": "/14-508-14508.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA06_4_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA06_4_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA06_4_Play_01.ogg" }] }, { "Name": "Flamewaker Acolyte", "RegImage": "/328-503-14509.png", "GoldImage": "/14-509-14509.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA06_4_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA06_4_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA06_4_Play_01.ogg" }] }, { "Name": "Highlord Omokk", "RegImage": "/328-506-14510.png", "GoldImage": "/14-510-14510.webm", "Sounds": [] }, { "Name": "Highlord Omokk", "RegImage": "/328-509-14511.png", "GoldImage": "/14-511-14511.webm", "Sounds": [] }, { "Name": "ME SMASH", "RegImage": "/328-512-14512.png", "GoldImage": "/14-512-14512.webm", "Sounds": [] }, { "Name": "ME SMASH", "RegImage": "/328-521-14513.png", "GoldImage": "/14-513-14513.webm", "Sounds": [] }, { "Name": "TIME FOR SMASH", "RegImage": "/328-524-14514.png", "GoldImage": "/14-514-14514.webm", "Sounds": [] }, { "Name": "General Drakkisath", "RegImage": "/328-527-14515.png", "GoldImage": "/14-515-14515.webm", "Sounds": [] }, { "Name": "General Drakkisath", "RegImage": "/328-530-14516.png", "GoldImage": "/14-516-14516.webm", "Sounds": [] }, { "Name": "Intense Gaze", "RegImage": "/328-533-14517.png", "GoldImage": "/14-517-14517.webm", "Sounds": [] }, { "Name": "Intense Gaze", "RegImage": "/328-536-14518.png", "GoldImage": "/14-518-14518.webm", "Sounds": [] }, { "Name": "Drakkisath's Command", "RegImage": "/328-539-14519.png", "GoldImage": "/14-519-14519.webm", "Sounds": [] }, { "Name": "Rend Blackhand", "RegImage": "/328-542-14520.png", "GoldImage": "/14-520-14520.webm", "Sounds": [] }, { "Name": "Rend Blackhand", "RegImage": "/328-545-14521.png", "GoldImage": "/14-521-14521.webm", "Sounds": [] }, { "Name": "Open the Gates", "RegImage": "/328-548-14522.png", "GoldImage": "/14-522-14522.webm", "Sounds": [] }, { "Name": "Open the Gates", "RegImage": "/328-554-14523.png", "GoldImage": "/14-523-14523.webm", "Sounds": [] }, { "Name": "Whelp", "RegImage": "/328-557-14524.png", "GoldImage": "/14-524-14524.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_BRM_022t_BlackWhelp_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_BRM_022t_BlackWhelp_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_BRM_022t_BlackWhelp_EnterPlay.ogg" }] }, { "Name": "Whelp", "RegImage": "/328-560-14525.png", "GoldImage": "/14-525-14525.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_BRM_022t_BlackWhelp_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_BRM_022t_BlackWhelp_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_BRM_022t_BlackWhelp_EnterPlay.ogg" }] }, { "Name": "Old Horde", "RegImage": "/328-563-14526.png", "GoldImage": "/14-526-14526.webm", "Sounds": [] }, { "Name": "Old Horde", "RegImage": "/328-566-14527.png", "GoldImage": "/14-527-14527.webm", "Sounds": [] }, { "Name": "Old Horde Orc", "RegImage": "/328-569-14528.png", "GoldImage": "/14-528-14528.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA09_3t_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA09_3t_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA09_3t_Play_01.ogg" }] }, { "Name": "Old Horde Orc", "RegImage": "/328-572-14529.png", "GoldImage": "/14-529-14529.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA09_3t_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA09_3t_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA09_3t_Play_01.ogg" }] }, { "Name": "Blackwing", "RegImage": "/328-575-14530.png", "GoldImage": "/14-530-14530.webm", "Sounds": [] }, { "Name": "Blackwing", "RegImage": "/328-578-14531.png", "GoldImage": "/14-531-14531.webm", "Sounds": [] }, { "Name": "Dragonkin", "RegImage": "/328-581-14532.png", "GoldImage": "/14-532-14532.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA09_4t_Dragonkin_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA09_4t_Dragonkin_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRMA09_4t_Dragonkin_EnterPlay_1.ogg" }] }, { "Name": "Dragonkin", "RegImage": "/328-584-14533.png", "GoldImage": "/14-533-14533.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA09_4t_Dragonkin_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA09_4t_Dragonkin_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRMA09_4t_Dragonkin_EnterPlay_1.ogg" }] }, { "Name": "Dismount", "RegImage": "/328-587-14534.png", "GoldImage": "/14-534-14534.webm", "Sounds": [] }, { "Name": "Dismount", "RegImage": "/328-590-14535.png", "GoldImage": "/14-535-14535.webm", "Sounds": [] }, { "Name": "Gyth", "RegImage": "/328-593-14536.png", "GoldImage": "/14-536-14536.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRM_025_VolcanicDrake_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRM_025_VolcanicDrake_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRM_025_VolcanicDrake_EnterPlay_1.ogg" }] }, { "Name": "Gyth", "RegImage": "/328-596-14537.png", "GoldImage": "/14-537-14537.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRM_025_VolcanicDrake_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRM_025_VolcanicDrake_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRM_025_VolcanicDrake_EnterPlay_1.ogg" }] }, { "Name": "The True Warchief", "RegImage": "/328-599-14538.png", "GoldImage": "/14-538-14538.webm", "Sounds": [] }, { "Name": "Razorgore the Untamed", "RegImage": "/328-602-14539.png", "GoldImage": "/14-539-14539.webm", "Sounds": [] }, { "Name": "Razorgore the Untamed", "RegImage": "/328-605-14540.png", "GoldImage": "/14-540-14540.webm", "Sounds": [] }, { "Name": "The Rookery", "RegImage": "/328-608-14541.png", "GoldImage": "/14-541-14541.webm", "Sounds": [] }, { "Name": "The Rookery", "RegImage": "/328-611-14543.png", "GoldImage": "/14-543-14543.webm", "Sounds": [] }, { "Name": "Corrupted Egg", "RegImage": "/328-614-14544.png", "GoldImage": "/14-544-14544.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA10_4_CorruptedEgg_Attack.ogg" }, { "Name": "Death1", "URL": "/BRMA10_4_CorruptedEgg_Death.ogg" }, { "Name": "Play1", "URL": "/BRMA10_4_CorruptedEgg_EnterPlay.ogg" }] }, { "Name": "Corrupted Egg", "RegImage": "/328-617-14545.png", "GoldImage": "/14-545-14545.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA10_4_CorruptedEgg_Attack.ogg" }, { "Name": "Death1", "URL": "/BRMA10_4_CorruptedEgg_Death.ogg" }, { "Name": "Play1", "URL": "/BRMA10_4_CorruptedEgg_EnterPlay.ogg" }] }, { "Name": "Chromatic Drake", "RegImage": "/328-620-14546.png", "GoldImage": "/14-546-14546.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA10_5_ChromaticDrake_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA10_5_ChromaticDrake_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRMA10_5_ChromaticDrake_EnterPlay_1.ogg" }] }, { "Name": "Chromatic Drake", "RegImage": "/328-623-14547.png", "GoldImage": "/14-547-14547.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA10_5_ChromaticDrake_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA10_5_ChromaticDrake_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRMA10_5_ChromaticDrake_EnterPlay_1.ogg" }] }, { "Name": "Razorgore's Claws", "RegImage": "/328-626-14548.png", "GoldImage": "/14-548-14548.webm", "Sounds": [] }, { "Name": "Vaelastrasz the Corrupt", "RegImage": "/328-629-14550.png", "GoldImage": "/14-550-14550.webm", "Sounds": [] }, { "Name": "Vaelastrasz the Corrupt", "RegImage": "/328-632-14551.png", "GoldImage": "/14-551-14551.webm", "Sounds": [] }, { "Name": "Essence of the Red", "RegImage": "/328-635-14552.png", "GoldImage": "/14-552-14552.webm", "Sounds": [] }, { "Name": "Essence of the Red", "RegImage": "/328-638-14553.png", "GoldImage": "/14-553-14553.webm", "Sounds": [] }, { "Name": "Burning Adrenaline", "RegImage": "/328-644-14554.png", "GoldImage": "/14-554-14554.webm", "Sounds": [] }, { "Name": "Chromaggus", "RegImage": "/328-647-14555.png", "GoldImage": "/14-555-14555.webm", "Sounds": [] }, { "Name": "Mutation", "RegImage": "/328-650-14556.png", "GoldImage": "/14-556-14556.webm", "Sounds": [] }, { "Name": "Chromaggus", "RegImage": "/328-653-14557.png", "GoldImage": "/14-557-14557.webm", "Sounds": [] }, { "Name": "Brood Affliction", "RegImage": "/328-656-14558.png", "GoldImage": "/14-558-14558.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Brood Affliction", "RegImage": "/328-659-14559.png", "GoldImage": "/14-559-14559.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Brood Affliction: Red", "RegImage": "/328-662-14560.png", "GoldImage": "/14-560-14560.webm", "Sounds": [] }, { "Name": "Brood Affliction: Red", "RegImage": "/328-665-14561.png", "GoldImage": "/14-561-14561.webm", "Sounds": [] }, { "Name": "Brood Affliction: Green", "RegImage": "/328-668-14562.png", "GoldImage": "/14-562-14562.webm", "Sounds": [] }, { "Name": "Brood Affliction: Green", "RegImage": "/328-671-14563.png", "GoldImage": "/14-563-14563.webm", "Sounds": [] }, { "Name": "Brood Affliction: Blue", "RegImage": "/328-674-14564.png", "GoldImage": "/14-564-14564.webm", "Sounds": [] }, { "Name": "Brood Affliction: Blue", "RegImage": "/328-677-14565.png", "GoldImage": "/14-565-14565.webm", "Sounds": [] }, { "Name": "Brood Affliction: Black", "RegImage": "/328-680-14566.png", "GoldImage": "/14-566-14566.webm", "Sounds": [] }, { "Name": "Brood Affliction: Black", "RegImage": "/328-683-14567.png", "GoldImage": "/14-567-14567.webm", "Sounds": [] }, { "Name": "Brood Affliction: Bronze", "RegImage": "/328-686-14568.png", "GoldImage": "/14-568-14568.webm", "Sounds": [] }, { "Name": "Brood Affliction: Bronze", "RegImage": "/328-689-14569.png", "GoldImage": "/14-569-14569.webm", "Sounds": [] }, { "Name": "Chromatic Mutation", "RegImage": "/328-692-14570.png", "GoldImage": "/14-570-14570.webm", "Sounds": [] }, { "Name": "Chromatic Dragonkin", "RegImage": "/328-695-14571.png", "GoldImage": "/14-571-14571.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA12_8t_ChromaticDragonkin_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA12_8t_ChromaticDragonkin_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRMA12_8t_ChromaticDragonkin_EnterPlay_1.ogg" }] }, { "Name": "Chromatic Dragonkin", "RegImage": "/328-698-14572.png", "GoldImage": "/14-572-14572.webm", "Sounds": [] }, { "Name": "Lord Victor Nefarius", "RegImage": "/328-701-14573.png", "GoldImage": "/14-573-14573.webm", "Sounds": [] }, { "Name": "Lord Victor Nefarius", "RegImage": "/328-704-14574.png", "GoldImage": "/14-574-14574.webm", "Sounds": [] }, { "Name": "True Form", "RegImage": "/328-707-14575.png", "GoldImage": "/14-575-14575.webm", "Sounds": [] }, { "Name": "True Form", "RegImage": "/328-710-14576.png", "GoldImage": "/14-576-14576.webm", "Sounds": [] }, { "Name": "Nefarian", "RegImage": "/328-713-14577.png", "GoldImage": "/14-577-14577.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/BlackrockWorld_Untargetted_Sound_01.ogg" }] }, { "Name": "Nefarian", "RegImage": "/328-716-14578.png", "GoldImage": "/14-578-14578.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/BlackrockWorld_Untargetted_Sound_01.ogg" }] }, { "Name": "Wild Magic", "RegImage": "/328-719-14579.png", "GoldImage": "/14-579-14579.webm", "Sounds": [] }, { "Name": "Wild Magic", "RegImage": "/328-725-14580.png", "GoldImage": "/14-580-14580.webm", "Sounds": [] }, { "Name": "Son of the Flame", "RegImage": "/328-728-14581.png", "GoldImage": "/14-581-14581.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA13_5_SonOfTheFlame_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA13_5_SonOfTheFlame_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRMA13_5_SonOfTheFlame_EnterPlay_1.ogg" }] }, { "Name": "Living Lava", "RegImage": "/328-731-14582.png", "GoldImage": "/14-582-14582.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA13_6_LivingLava_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA13_6_LivingLava_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRMA13_6_LivingLava_EnterPlay_1.ogg" }] }, { "Name": "Whirling Ash", "RegImage": "/328-734-14583.png", "GoldImage": "/14-583-14583.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA13_7_WhirlingAsh_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA13_7_WhirlingAsh_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRMA13_7_WhirlingAsh_EnterPlay_1.ogg" }] }, { "Name": "DIE, INSECT!", "RegImage": "/328-737-14584.png", "GoldImage": "/14-584-14584.webm", "Sounds": [] }, { "Name": "Omnotron Defense System", "RegImage": "/328-740-14585.png", "GoldImage": "/14-585-14585.webm", "Sounds": [] }, { "Name": "Activate!", "RegImage": "/328-743-14586.png", "GoldImage": "/14-586-14586.webm", "Sounds": [] }, { "Name": "Activate!", "RegImage": "/328-746-14587.png", "GoldImage": "/14-587-14587.webm", "Sounds": [] }, { "Name": "Recharge", "RegImage": "/328-752-14588.png", "GoldImage": "/14-588-14588.webm", "Sounds": [] }, { "Name": "Magmaw", "RegImage": "/328-755-14589.png", "GoldImage": "/14-589-14589.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_BRMA14_12_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_BRMA14_12_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_BRMA14_12_Play.ogg" }] }, { "Name": "Omnotron Defense System", "RegImage": "/328-758-14590.png", "GoldImage": "/14-590-14590.webm", "Sounds": [] }, { "Name": "Activate Arcanotron", "RegImage": "/328-761-14591.png", "GoldImage": "/14-591-14591.webm", "Sounds": [] }, { "Name": "Activate Arcanotron", "RegImage": "/328-764-14592.png", "GoldImage": "/14-592-14592.webm", "Sounds": [] }, { "Name": "Arcanotron", "RegImage": "/328-767-14593.png", "GoldImage": "/14-593-14593.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA14_3_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/IronGolem_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA14_3_Death_03.ogg" }, { "Name": "Death2", "URL": "/IronGolem_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA14_3_Play_01.ogg" }, { "Name": "Play2", "URL": "/IronGolem_Play_Underlay.ogg" }] }, { "Name": "Activate Toxitron", "RegImage": "/328-770-14594.png", "GoldImage": "/14-594-14594.webm", "Sounds": [] }, { "Name": "Activate Toxitron", "RegImage": "/328-773-14595.png", "GoldImage": "/14-595-14595.webm", "Sounds": [] }, { "Name": "Toxitron", "RegImage": "/328-776-14596.png", "GoldImage": "/14-596-14596.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA14_5_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/IronGolem_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA14_5_Death_03.ogg" }, { "Name": "Death2", "URL": "/IronGolem_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA14_5_Play_01.ogg" }, { "Name": "Play2", "URL": "/IronGolem_Play_Underlay.ogg" }, { "Name": "Trigger1", "URL": "/VO_BRMA14_5_Trigger_01.ogg" }, { "Name": "Trigger2", "URL": "/FX_Warlock_AE_GasWave_Green_01.ogg" }] }, { "Name": "Toxitron", "RegImage": "/328-779-14597.png", "GoldImage": "/14-597-14597.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA14_5_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/IronGolem_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA14_5_Death_03.ogg" }, { "Name": "Death2", "URL": "/IronGolem_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA14_5_Play_01.ogg" }, { "Name": "Play2", "URL": "/IronGolem_Play_Underlay.ogg" }, { "Name": "Trigger1", "URL": "/VO_BRMA14_5_Trigger_01.ogg" }, { "Name": "Trigger2", "URL": "/FX_Warlock_AE_GasWave_Green_01.ogg" }] }, { "Name": "Activate Electron", "RegImage": "/328-782-14598.png", "GoldImage": "/14-598-14598.webm", "Sounds": [] }, { "Name": "Activate Electron", "RegImage": "/328-785-14599.png", "GoldImage": "/14-599-14599.webm", "Sounds": [] }, { "Name": "Windfury", "RegImage": "/329-967-146.png", "GoldImage": "/0-146-146.webm", "Collectible": true, "Sounds": [] }, { "Name": "Electron", "RegImage": "/328-788-14600.png", "GoldImage": "/14-600-14600.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA14_7_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/IronGolem_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA14_7_Death_03.ogg" }, { "Name": "Death2", "URL": "/IronGolem_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA14_7_Play_01.ogg" }, { "Name": "Play2", "URL": "/IronGolem_Play_Underlay.ogg" }] }, { "Name": "Electron", "RegImage": "/328-791-14601.png", "GoldImage": "/14-601-14601.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA14_7_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/IronGolem_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA14_7_Death_03.ogg" }, { "Name": "Death2", "URL": "/IronGolem_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA14_7_Play_01.ogg" }, { "Name": "Play2", "URL": "/IronGolem_Play_Underlay.ogg" }] }, { "Name": "Activate Magmatron", "RegImage": "/328-794-14602.png", "GoldImage": "/14-602-14602.webm", "Sounds": [] }, { "Name": "Activate Magmatron", "RegImage": "/328-797-14603.png", "GoldImage": "/14-603-14603.webm", "Sounds": [] }, { "Name": "Magmatron", "RegImage": "/328-800-14604.png", "GoldImage": "/14-604-14604.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA14_9_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/IronGolem_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA14_9_Death_03.ogg" }, { "Name": "Death2", "URL": "/IronGolem_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA14_9_Play_01.ogg" }, { "Name": "Play2", "URL": "/IronGolem_Play_Underlay.ogg" }] }, { "Name": "Magmatron", "RegImage": "/328-803-14605.png", "GoldImage": "/14-605-14605.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA14_9_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/IronGolem_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA14_9_Death_03.ogg" }, { "Name": "Death2", "URL": "/IronGolem_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA14_9_Play_01.ogg" }, { "Name": "Play2", "URL": "/IronGolem_Play_Underlay.ogg" }] }, { "Name": "Maloriak", "RegImage": "/328-806-14606.png", "GoldImage": "/14-606-14606.webm", "Sounds": [] }, { "Name": "Maloriak", "RegImage": "/328-809-14607.png", "GoldImage": "/14-607-14607.webm", "Sounds": [] }, { "Name": "The Alchemist", "RegImage": "/328-812-14608.png", "GoldImage": "/14-608-14608.webm", "Sounds": [] }, { "Name": "The Alchemist", "RegImage": "/328-815-14609.png", "GoldImage": "/14-609-14609.webm", "Sounds": [] }, { "Name": "Release the Aberrations!", "RegImage": "/328-818-14611.png", "GoldImage": "/14-611-14611.webm", "Sounds": [] }, { "Name": "Aberration", "RegImage": "/328-821-14612.png", "GoldImage": "/14-612-14612.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA_15_4_Aberration_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA_15_4_Aberration_Death_1.ogg" }] }, { "Name": "Atramedes", "RegImage": "/328-824-14613.png", "GoldImage": "/14-613-14613.webm", "Sounds": [] }, { "Name": "Atramedes", "RegImage": "/328-827-14614.png", "GoldImage": "/14-614-14614.webm", "Sounds": [] }, { "Name": "Echolocate", "RegImage": "/328-830-14615.png", "GoldImage": "/14-615-14615.webm", "Sounds": [] }, { "Name": "Echolocate", "RegImage": "/328-833-14616.png", "GoldImage": "/14-616-14616.webm", "Sounds": [] }, { "Name": "Sonic Breath", "RegImage": "/328-836-14617.png", "GoldImage": "/14-617-14617.webm", "Sounds": [] }, { "Name": "Reverberating Gong", "RegImage": "/328-839-14619.png", "GoldImage": "/14-619-14619.webm", "Sounds": [] }, { "Name": "Dragonteeth", "RegImage": "/328-842-14620.png", "GoldImage": "/14-620-14620.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/Druid_Shapeshift_Cast_1.ogg" }] }, { "Name": "Nefarian", "RegImage": "/328-845-14622.png", "GoldImage": "/14-622-14622.webm", "Sounds": [] }, { "Name": "Nefarian", "RegImage": "/328-848-14623.png", "GoldImage": "/14-623-14623.webm", "Sounds": [] }, { "Name": "Onyxia", "RegImage": "/328-851-14624.png", "GoldImage": "/14-624-14624.webm", "Sounds": [] }, { "Name": "Onyxia", "RegImage": "/328-854-14625.png", "GoldImage": "/14-625-14625.webm", "Sounds": [] }, { "Name": "LAVA!", "RegImage": "/328-857-14626.png", "GoldImage": "/14-626-14626.webm", "Sounds": [] }, { "Name": "Bone Minions", "RegImage": "/328-860-14627.png", "GoldImage": "/14-627-14627.webm", "Sounds": [] }, { "Name": "Bone Minions", "RegImage": "/328-866-14628.png", "GoldImage": "/14-628-14628.webm", "Sounds": [] }, { "Name": "Bone Construct", "RegImage": "/328-869-14629.png", "GoldImage": "/14-629-14629.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA17_6_BoneConstruct_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA17_6_BoneConstruct_Death_1.ogg" }] }, { "Name": "Bone Construct", "RegImage": "/328-872-14630.png", "GoldImage": "/14-630-14630.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA17_6_BoneConstruct_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA17_6_BoneConstruct_Death_1.ogg" }] }, { "Name": "Chromatic Prototype", "RegImage": "/328-875-14631.png", "GoldImage": "/14-631-14631.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA17_7_ChromaticPrototype_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA17_7_ChromaticPrototype_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRMA17_7_ChromaticPrototype_EnterPlay_1.ogg" }] }, { "Name": "Nefarian Strikes!", "RegImage": "/328-878-14632.png", "GoldImage": "/14-632-14632.webm", "Sounds": [] }, { "Name": "Nefarian Strikes!", "RegImage": "/328-881-14633.png", "GoldImage": "/14-633-14633.webm", "Sounds": [] }, { "Name": "Onyxiclaw", "RegImage": "/328-884-14634.png", "GoldImage": "/14-634-14634.webm", "Sounds": [] }, { "Name": "Flameheart", "RegImage": "/328-374-14635.png", "GoldImage": "/14-635-14635.webm", "Sounds": [] }, { "Name": "Whelp", "RegImage": "/328-259-14641.png", "GoldImage": "/14-641-14641.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_BRM_004_Twilight_Whelp_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_BRM_004_Twilight_Whelp_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_BRM_004_Twilight_Whelp_EnterPlay.ogg" }] }, { "Name": "Imp", "RegImage": "/328-268-14642.png", "GoldImage": "/14-642-14642.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_GVG_045t_Imp_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_GVG_045t_Imp_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_GVG_045t_Imp_EnterPlay.ogg" }] }, { "Name": "Firecat Form", "RegImage": "/339-143-14643.png", "GoldImage": "/14-643-14643.webm", "Sounds": [] }, { "Name": "Fire Hawk Form", "RegImage": "/339-146-14644.png", "GoldImage": "/14-644-14644.webm", "Sounds": [] }, { "Name": "Druid of the Flame", "RegImage": "/328-289-14645.png", "GoldImage": "/14-645-14645.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRM_010t_FirecatForm_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRM_010t_FirecatForm_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRM_010t_FirecatForm_EnterPlay_1.ogg" }] }, { "Name": "Druid of the Flame", "RegImage": "/328-293-14646.png", "GoldImage": "/14-646-14646.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRM_010t2_FirehawkForm_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRM_010t2_FirehawkForm_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRM_010t2_FirehawkForm_EnterPlay_1.ogg" }] }, { "Name": "Black Whelp", "RegImage": "/328-329-14652.png", "GoldImage": "/14-652-14652.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_BRM_022t_BlackWhelp_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_BRM_022t_BlackWhelp_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_BRM_022t_BlackWhelp_EnterPlay.ogg" }] }, { "Name": "Ragnaros the Firelord", "RegImage": "/328-344-14654.png", "GoldImage": "/14-654-14654.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_027h_Attack_15.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_027h_Death_63.ogg" }] }, { "Name": "DIE, INSECT!", "RegImage": "/328-347-14655.png", "GoldImage": "/14-655-14655.webm", "Sounds": [] }, { "Name": "DIE, INSECTS!", "RegImage": "/328-350-14656.png", "GoldImage": "/14-656-14656.webm", "Sounds": [] }, { "Name": "Tail Swipe", "RegImage": "/328-362-14658.png", "GoldImage": "/14-658-14658.webm", "Sounds": [] }, { "Name": "Fireblast", "RegImage": "/329-949-14689.png", "GoldImage": "/14-689-14689.webm", "Sounds": [] }, { "Name": "Reinforce", "RegImage": "/330-90-14690.png", "GoldImage": "/14-690-14690.webm", "Sounds": [] }, { "Name": "Armor Up!", "RegImage": "/330-102-14691.png", "GoldImage": "/14-691-14691.webm", "Sounds": [{ "Name": "Play1", "URL": "/Magni_HeroPower_HammerImpact_Sound_01.ogg" }] }, { "Name": "Steady Shot", "RegImage": "/330-333-14692.png", "GoldImage": "/14-692-14692.webm", "Sounds": [] }, { "Name": "Magni Bronzebeard", "RegImage": "/331-710-14693.png", "GoldImage": "/14-693-14693.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_11_Attack_32.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_11_Death_33.ogg" }] }, { "Name": "Alleria Windrunner", "RegImage": "/331-734-14694.png", "GoldImage": "/14-694-14694.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_14_Attack_32.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_14_Death_33.ogg" }] }, { "Name": "Medivh", "RegImage": "/331-746-14695.png", "GoldImage": "/14-695-14695.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_12_Attack_32.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_12_Death_33.ogg" }] }, { "Name": "Living Bomb", "RegImage": "/328-887-14696.png", "GoldImage": "/14-696-14696.webm", "Sounds": [] }, { "Name": "Open the Gates", "RegImage": "/328-890-14698.png", "GoldImage": "/14-698-14698.webm", "Sounds": [] }, { "Name": "Dragonkin Spellcaster", "RegImage": "/328-893-14699.png", "GoldImage": "/14-699-14699.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA09_4t_Dragonkin_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA09_4t_Dragonkin_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRMA09_4t_Dragonkin_EnterPlay_1.ogg" }] }, { "Name": "Cabal Shadow Priest", "RegImage": "/330-480-147.png", "GoldImage": "/0-147-147.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_091_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_091_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_091_Play_01.ogg" }] }, { "Name": "Lucifron", "RegImage": "/328-896-14700.png", "GoldImage": "/14-700-14700.webm", "Sounds": [{ "Name": "Attack1", "URL": "/TU4e_003_Attack_NagaMyrmidon.ogg" }, { "Name": "Death1", "URL": "/TU4e_003_Death_NagaMyrmidon.ogg" }, { "Name": "Play1", "URL": "/TU4e_003_Play_NagaMyrmidon.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Elemental_Villain.ogg" }, { "Name": "Play3", "URL": "/FX_Warlock_AE_GasWave_HeroPower_01.ogg" }] }, { "Name": "Atramedes", "RegImage": "/328-899-14701.png", "GoldImage": "/14-701-14701.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA16_1_CARD_04.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA16_1_DEATH_06s.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA16_1_START_01.ogg" }] }, { "Name": "Moira Bronzebeard", "RegImage": "/328-902-14703.png", "GoldImage": "/14-703-14703.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMC_87_Moira_Attack.ogg" }, { "Name": "Death1", "URL": "/BRMC_87_Moira_Death.ogg" }, { "Name": "Play1", "URL": "/BRMC_87_Moira_Play.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Lesser_Villain.ogg" }] }, { "Name": "Drakonid Slayer", "RegImage": "/328-905-14704.png", "GoldImage": "/14-704-14704.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_024_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_024_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRM_024_Play_01.ogg" }] }, { "Name": "Whirling Ash", "RegImage": "/328-908-14705.png", "GoldImage": "/14-705-14705.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA13_7_WhirlingAsh_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA13_7_WhirlingAsh_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRMA13_7_WhirlingAsh_EnterPlay_1.ogg" }] }, { "Name": "Living Lava", "RegImage": "/328-911-14706.png", "GoldImage": "/14-706-14706.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA13_6_LivingLava_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA13_6_LivingLava_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRMA13_6_LivingLava_EnterPlay_1.ogg" }] }, { "Name": "Son of the Flame", "RegImage": "/328-914-14707.png", "GoldImage": "/14-707-14707.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA13_5_SonOfTheFlame_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA13_5_SonOfTheFlame_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRMA13_5_SonOfTheFlame_EnterPlay_1.ogg" }] }, { "Name": "Coren Direbrew", "RegImage": "/328-917-14708.png", "GoldImage": "/14-708-14708.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMC_92_Coren_Attack.ogg" }, { "Name": "Death1", "URL": "/BRMC_92_Coren_Death.ogg" }, { "Name": "Play1", "URL": "/BRMC_92_Coren_Play.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Lesser_Villain.ogg" }, { "Name": "Play3", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Omnotron Defense System", "RegImage": "/328-920-14709.png", "GoldImage": "/14-709-14709.webm", "Sounds": [] }, { "Name": "Sulfuras", "RegImage": "/328-923-14710.png", "GoldImage": "/14-710-14710.webm", "Sounds": [] }, { "Name": "Golemagg", "RegImage": "/328-926-14711.png", "GoldImage": "/14-711-14711.webm", "Sounds": [{ "Name": "Attack1", "URL": "/EX1_620_Molten_Giant_Attack1.ogg" }, { "Name": "Death1", "URL": "/EX1_620_Molten_Giant_Death1.ogg" }, { "Name": "Play1", "URL": "/EX1_620_Molten_Giant_EnterPlay2.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Elemental_Villain.ogg" }] }, { "Name": "Core Hound Puppies", "RegImage": "/328-929-14712.png", "GoldImage": "/14-712-14712.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRM_014_CoreRager_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRM_014_CoreRager_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRM_014_CoreRager_EnterPlay_1.ogg" }] }, { "Name": "Core Hound Pup", "RegImage": "/328-932-14713.png", "GoldImage": "/14-713-14713.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRM_014_CoreRager_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRM_014_CoreRager_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRM_014_CoreRager_EnterPlay_1.ogg" }] }, { "Name": "High Justice Grimstone", "RegImage": "/328-935-14714.png", "GoldImage": "/14-714-14714.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMC_92_Coren_Attack.ogg" }, { "Name": "Death1", "URL": "/BRMC_92_Coren_Death.ogg" }, { "Name": "Play1", "URL": "/BRMC_92_Coren_Play.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Lesser_Villain.ogg" }] }, { "Name": "Vaelastrasz", "RegImage": "/328-938-14715.png", "GoldImage": "/14-715-14715.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMC_97_Vaelastrasz_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMC_97_Vaelastrasz_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRMC_97_Vaelastrasz_Play_1.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Elemental_Villain.ogg" }] }, { "Name": "Razorgore", "RegImage": "/328-941-14717.png", "GoldImage": "/14-717-14717.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BRMA09_4t_Dragonkin_Attack_1.ogg" }, { "Name": "Death1", "URL": "/BRMA09_4t_Dragonkin_Death_1.ogg" }, { "Name": "Play1", "URL": "/BRMA09_4t_Dragonkin_EnterPlay_1.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Lesser_Villain.ogg" }] }, { "Name": "Garr", "RegImage": "/328-944-14719.png", "GoldImage": "/14-719-14719.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_BRMA04_3_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_BRMA04_3_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_BRMA04_3_Play.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Misc2.ogg" }] }, { "Name": "Rock Elemental", "RegImage": "/328-947-14720.png", "GoldImage": "/14-720-14720.webm", "Sounds": [{ "Name": "Attack1", "URL": "/EX1_250_Earth_Elemental_Attack3.ogg" }, { "Name": "Death1", "URL": "/EX1_250_Earth_Elemental_Death2.ogg" }, { "Name": "Play1", "URL": "/EX1_250_Earth_Elemental_EnterPlay2.ogg" }] }, { "Name": "Ragnaros the Firelord", "RegImage": "/334-710-14721.png", "GoldImage": "/14-721-14721.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_027h_Attack_15.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_027h_Death_63.ogg" }] }, { "Name": "Nefarian", "RegImage": "/334-713-14722.png", "GoldImage": "/14-722-14722.webm", "Sounds": [{ "Name": "Attack1", "URL": "/OnyxiaBoss_EmoteResponse_1.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_030_Death_21.ogg" }] }, { "Name": "Wild Magic", "RegImage": "/334-716-14723.png", "GoldImage": "/14-723-14723.webm", "Sounds": [] }, { "Name": "Molten Rage", "RegImage": "/334-719-14724.png", "GoldImage": "/14-724-14724.webm", "Sounds": [] }, { "Name": "Big Banana", "RegImage": "/334-89-14725.png", "GoldImage": "/14-725-14725.webm", "Sounds": [] }, { "Name": "Deviate Banana", "RegImage": "/334-92-14727.png", "GoldImage": "/14-727-14727.webm", "Sounds": [] }, { "Name": "Rotten Banana", "RegImage": "/334-95-14729.png", "GoldImage": "/14-729-14729.webm", "Sounds": [] }, { "Name": "Savagery", "RegImage": "/331-37-148.png", "GoldImage": "/0-148-148.webm", "Collectible": true, "Sounds": [] }, { "Name": "Mark of Nature", "RegImage": "/330-576-149.png", "GoldImage": "/0-149-149.webm", "Collectible": true, "Sounds": [] }, { "Name": "Oasis Snapjaw", "RegImage": "/330-135-15.png", "GoldImage": "/0-15-15.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CS2_119_Oasis_Snapjaw_Attack1.ogg" }, { "Name": "Death1", "URL": "/CS2_119_Oasis_Snapjaw_Death2.ogg" }, { "Name": "Play1", "URL": "/CS2_119_Oasis_Snapjaw_EnterPlay2.ogg" }] }, { "Name": "Windspeaker", "RegImage": "/331-55-151.png", "GoldImage": "/0-151-151.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_587_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_587_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_587_Play_01.ogg" }] }, { "Name": "Stormforged Axe", "RegImage": "/330-680-152.png", "GoldImage": "/0-152-152.webm", "Collectible": true, "Sounds": [] }, { "Name": "Ancient Watcher", "RegImage": "/330-423-153.png", "GoldImage": "/0-153-153.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_045_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_045_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_045_EnterPlay.ogg" }] }, { "Name": "Naturalize", "RegImage": "/330-603-154.png", "GoldImage": "/0-154-154.webm", "Collectible": true, "Sounds": [] }, { "Name": "Bananas", "RegImage": "/334-770-156.png", "GoldImage": "/0-156-156.webm", "Sounds": [] }, { "Name": "Questing Adventurer", "RegImage": "/330-420-157.png", "GoldImage": "/0-157-157.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_044_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_044_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_044_Play_01.ogg" }, { "Name": "Trigger1", "URL": "/wow_levelup.ogg" }, { "Name": "Trigger2", "URL": "/wow_levelup.ogg" }] }, { "Name": "Noble Sacrifice", "RegImage": "/330-534-158.png", "GoldImage": "/0-158-158.webm", "Collectible": true, "Sounds": [] }, { "Name": "Shan'do's Lesson", "RegImage": "/331-25-159.png", "GoldImage": "/0-159-159.webm", "Sounds": [] }, { "Name": "Naga Myrmidon", "RegImage": "/334-797-16.png", "GoldImage": "/0-16-16.webm", "Sounds": [{ "Name": "Attack1", "URL": "/TU4e_003_Attack_NagaMyrmidon.ogg" }, { "Name": "Death1", "URL": "/TU4e_003_Death_NagaMyrmidon.ogg" }, { "Name": "Play1", "URL": "/TU4e_003_Play_NagaMyrmidon.ogg" }] }, { "Name": "Vaporize", "RegImage": "/331-67-160.png", "GoldImage": "/0-160-160.webm", "Collectible": true, "Sounds": [] }, { "Name": "Whirlwind", "RegImage": "/330-884-161.png", "GoldImage": "/0-161-161.webm", "Collectible": true, "Sounds": [] }, { "Name": "Tundra Rhino", "RegImage": "/330-309-162.png", "GoldImage": "/0-162-162.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_DS1_178_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_DS1_178_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_DS1_178_EnterPlay.ogg" }] }, { "Name": "Tracking", "RegImage": "/330-315-163.png", "GoldImage": "/0-163-163.webm", "Collectible": true, "Sounds": [] }, { "Name": "Shiv", "RegImage": "/330-710-164.png", "GoldImage": "/0-164-164.webm", "Collectible": true, "Sounds": [] }, { "Name": "Power of the Wild", "RegImage": "/330-591-165.png", "GoldImage": "/0-165-165.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Shared_PawUntargeted02_PreCast.ogg" }] }, { "Name": "Commanding Shout", "RegImage": "/333-531-166.png", "GoldImage": "/0-166-166.webm", "Collectible": true, "Sounds": [] }, { "Name": "Arcane Shot", "RegImage": "/330-318-167.png", "GoldImage": "/0-167-167.webm", "Collectible": true, "Sounds": [] }, { "Name": "Power Overwhelming", "RegImage": "/339-184-170.png", "GoldImage": "/0-170-170.webm", "Collectible": true, "Sounds": [] }, { "Name": "Doomhammer", "RegImage": "/331-7-172.png", "GoldImage": "/0-172-172.webm", "Collectible": true, "Sounds": [] }, { "Name": "Core Hound", "RegImage": "/330-234-173.png", "GoldImage": "/0-173-173.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CS2_201_Core_Hound_Attack2.ogg" }, { "Name": "Death1", "URL": "/CS2_201_Core_Hound_Death1.ogg" }, { "Name": "Play1", "URL": "/CS2_201_Core_Hound_EnterPlay1.ogg" }] }, { "Name": "Wolfrider", "RegImage": "/330-147-174.png", "GoldImage": "/0-174-174.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_124_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/SFX_CS2_124_Wolf_Attack_00.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_124_Death_03.ogg" }, { "Name": "Death2", "URL": "/SFX_CS2_124_Wolf_Death_00.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_124_Play_01.ogg" }, { "Name": "Play2", "URL": "/SFX_CS2_124_Wolf_EnterPlay_00.ogg" }] }, { "Name": "Ancient Mage", "RegImage": "/331-49-176.png", "GoldImage": "/0-176-176.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_584_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_584_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_584_Play_01.ogg" }] }, { "Name": "Frostbolt", "RegImage": "/329-919-177.png", "GoldImage": "/0-177-177.webm", "Collectible": true, "Sounds": [] }, { "Name": "Imp Master", "RegImage": "/331-76-178.png", "GoldImage": "/0-178-178.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_597_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_597_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_597_Play_01.ogg" }] }, { "Name": "The Beast", "RegImage": "/331-34-179.png", "GoldImage": "/0-179-179.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_577_The_Beast_Attack2.ogg" }, { "Name": "Death1", "URL": "/EX1_577_The_Beast_Death1.ogg" }, { "Name": "Play1", "URL": "/EX1_577_The_Beast_EnterPlay1.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Beast_Villain.ogg" }] }, { "Name": "Gruul", "RegImage": "/333-537-18.png", "GoldImage": "/0-18-18.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_038_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_038_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_038_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Misc2.ogg" }] }, { "Name": "Treant", "RegImage": "/331-28-181.png", "GoldImage": "/0-181-181.webm", "Sounds": [{ "Name": "Attack1", "URL": "/EX1_573t Treant_Attack2.ogg" }, { "Name": "Death1", "URL": "/EX1_573t Treant_Death2.ogg" }, { "Name": "Play1", "URL": "/EX1_573t Treant_EnterPlay1.ogg" }] }, { "Name": "Arcanite Reaper", "RegImage": "/330-123-182.png", "GoldImage": "/0-182-182.webm", "Collectible": true, "Sounds": [] }, { "Name": "Wicked Knife", "RegImage": "/330-48-183.png", "GoldImage": "/0-183-183.webm", "Sounds": [] }, { "Name": "Nightblade", "RegImage": "/331-64-184.png", "GoldImage": "/0-184-184.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_593_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_593_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_593_Play_01.ogg" }] }, { "Name": "Shapeshift", "RegImage": "/329-910-185.png", "GoldImage": "/0-185-185.webm", "Sounds": [] }, { "Name": "Ice Lance", "RegImage": "/339-156-188.png", "GoldImage": "/0-188-188.webm", "Collectible": true, "Sounds": [] }, { "Name": "Humility", "RegImage": "/330-827-189.png", "GoldImage": "/0-189-189.webm", "Collectible": true, "Sounds": [] }, { "Name": "Nat Pagle", "RegImage": "/330-980-19.png", "GoldImage": "/0-19-19.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_557_Attack_03.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_557_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_557_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Gnome.ogg" }] }, { "Name": "Panther", "RegImage": "/330-600-190.png", "GoldImage": "/0-190-190.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_160t_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_160t_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_160t_EnterPlay.ogg" }] }, { "Name": "Argent Protector", "RegImage": "/330-830-191.png", "GoldImage": "/0-191-191.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_362_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_362_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_362_Play_01.ogg" }] }, { "Name": "Lightspawn", "RegImage": "/330-800-192.png", "GoldImage": "/0-192-192.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_335_Lightspawn_Attack2.ogg" }, { "Name": "Death1", "URL": "/EX1_335_Lightspawn_Death4.ogg" }, { "Name": "Play1", "URL": "/EX1_335_Lightspawn_EnterPlay2.ogg" }] }, { "Name": "Warsong Commander", "RegImage": "/330-471-193.png", "GoldImage": "/0-193-193.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_084_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_084_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_084_Play_01.ogg" }] }, { "Name": "King Krush", "RegImage": "/330-962-194.png", "GoldImage": "/0-194-194.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_543_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_543_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_543_EnterPlay.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Beast_Villain.ogg" }] }, { "Name": "Starfall", "RegImage": "/333-447-195.png", "GoldImage": "/0-195-195.webm", "Sounds": [] }, { "Name": "Blood Imp", "RegImage": "/330-9-196.png", "GoldImage": "/0-196-196.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_059_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_059_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_059_Play_01.ogg" }] }, { "Name": "Mana Wraith", "RegImage": "/331-118-197.png", "GoldImage": "/0-197-197.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_616_Mana_Wraith_Attack2.ogg" }, { "Name": "Death1", "URL": "/EX1_616_Mana_Wraith_Death2.ogg" }, { "Name": "Play1", "URL": "/EX1_616_Mana_Wraith_EnterPlay1.ogg" }] }, { "Name": "Betrayal", "RegImage": "/330-525-198.png", "GoldImage": "/0-198-198.webm", "Collectible": true, "Sounds": [] }, { "Name": "Valeera Sanguinar", "RegImage": "/331-719-2.png", "GoldImage": "/0-2-2.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_03_Attack_16.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_03_Death_17.ogg" }] }, { "Name": "Life Tap", "RegImage": "/330-3-20.png", "GoldImage": "/0-20-20.webm", "Sounds": [{ "Name": "Play1", "URL": "/Warlock_LifeTap_Cast_1.ogg" }, { "Name": "Play2", "URL": "/Warlock_LifeTap_Cast_1.ogg" }] }, { "Name": "Damaged Golem", "RegImage": "/334-86-200.png", "GoldImage": "/0-200-200.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_skele21_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_skele21_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_skele21_EnterPlay.ogg" }] }, { "Name": "Dagger Mastery", "RegImage": "/330-54-201.png", "GoldImage": "/0-201-201.webm", "Sounds": [] }, { "Name": "Illidan Stormrage", "RegImage": "/331-112-203.png", "GoldImage": "/0-203-203.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_TUTORIAL_05_ILLIDAN_04_05.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_614_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_TUTORIAL_05_ILLIDAN_01_02.ogg" }, { "Name": "Play2", "URL": "/VO_EX1_614_Alternate_15-01.ogg" }, { "Name": "Play3", "URL": "/Pegasus_Stinger_Demon_HumanVillain.ogg" }] }, { "Name": "Leader of the Pack", "RegImage": "/330-597-204.png", "GoldImage": "/0-204-204.webm", "Sounds": [] }, { "Name": "Sinister Strike", "RegImage": "/330-36-205.png", "GoldImage": "/0-205-205.webm", "Collectible": true, "Sounds": [] }, { "Name": "Eye for an Eye", "RegImage": "/330-546-206.png", "GoldImage": "/0-206-206.webm", "Collectible": true, "Sounds": [] }, { "Name": "Inner Fire", "RegImage": "/329-865-207.png", "GoldImage": "/0-207-207.webm", "Collectible": true, "Sounds": [] }, { "Name": "Succubus", "RegImage": "/330-749-208.png", "GoldImage": "/0-208-208.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_306_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_306_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_306_Play_01.ogg" }] }, { "Name": "Injured Blademaster", "RegImage": "/330-207-209.png", "GoldImage": "/0-209-209.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_181_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_181_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_181_Play_01.ogg" }] }, { "Name": "Squire", "RegImage": "/330-177-21.png", "GoldImage": "/0-21-21.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_152_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_152_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_152_Play_01.ogg" }] }, { "Name": "Snake Trap", "RegImage": "/330-971-210.png", "GoldImage": "/0-210-210.webm", "Collectible": true, "Sounds": [] }, { "Name": "Demolisher", "RegImage": "/330-498-212.png", "GoldImage": "/0-212-212.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_102_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_102_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_102_EnterPlay.ogg" }] }, { "Name": "Faerie Dragon", "RegImage": "/333-495-213.png", "GoldImage": "/0-213-213.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/NEW1_023_Faerie_Dragon_Attack_2.ogg" }, { "Name": "Death1", "URL": "/NEW1_023_Faerie_Dragon_Death_3.ogg" }, { "Name": "Play1", "URL": "/NEW1_023_Faerie_Dragon_EnterPlay_2.ogg" }] }, { "Name": "Feral Spirit", "RegImage": "/330-683-214.png", "GoldImage": "/0-214-214.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Shared_PawUntargeted02_PreCast.ogg" }] }, { "Name": "Slam", "RegImage": "/330-863-215.png", "GoldImage": "/0-215-215.webm", "Collectible": true, "Sounds": [] }, { "Name": "Ancestral Healing", "RegImage": "/329-970-216.png", "GoldImage": "/0-216-216.webm", "Collectible": true, "Sounds": [] }, { "Name": "Old Murk-Eye", "RegImage": "/330-450-217.png", "GoldImage": "/0-217-217.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_062_Old_Murk_Eye_Attack1.ogg" }, { "Name": "Death1", "URL": "/EX1_062_Old_Murk_Eye_Death1.ogg" }, { "Name": "Play1", "URL": "/EX1_062_Old_Murk_Eye_EnterPlay1.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Beast_Villain.ogg" }] }, { "Name": "Sheep", "RegImage": "/330-282-218.png", "GoldImage": "/0-218-218.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_CS2_tk1_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_CS2_tk1_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_CS2_tk1_EnterPlay.ogg" }] }, { "Name": "Summon a Panther", "RegImage": "/330-594-219.png", "GoldImage": "/0-219-219.webm", "Sounds": [] }, { "Name": "Hunter's Mark", "RegImage": "/330-60-22.png", "GoldImage": "/0-22-22.webm", "Collectible": true, "Sounds": [] }, { "Name": "Archmage Antonidas", "RegImage": "/330-986-220.png", "GoldImage": "/0-220-220.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_559_Attack_03.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_559_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_559_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Alliance.ogg" }, { "Name": "Trigger1", "URL": "/VO_EX1_559_Trigger_02.ogg" }, { "Name": "Trigger2", "URL": "/Shared_Fire_Start_1.ogg" }] }, { "Name": "Sunwalker", "RegImage": "/330-411-221.png", "GoldImage": "/0-221-221.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_032_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_032_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_032_Play_01.ogg" }] }, { "Name": "Murloc Warleader", "RegImage": "/330-923-222.png", "GoldImage": "/0-222-222.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_507_Murloc_Warleader_Attack1.ogg" }, { "Name": "Death1", "URL": "/EX1_507_Murloc_Warleader_Death1.ogg" }, { "Name": "Play1", "URL": "/EX1_507_Murloc_Warleader_EnterPlay1.ogg" }] }, { "Name": "Lock and Load", "RegImage": "/327-980-22258.png", "GoldImage": "/22-258-22258.webm", "Collectible": true, "Sounds": [] }, { "Name": "Maiden of the Lake", "RegImage": "/328-55-22259.png", "GoldImage": "/22-259-22259.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_085_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_085_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_085_PLAY_01.ogg" }] }, { "Name": "Skycap'n Kragg", "RegImage": "/328-10-22260.png", "GoldImage": "/22-260-22260.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_070_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/Kragg_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_070_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/Kragg_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_070_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/Pirate_Play_Stinger_1.ogg" }] }, { "Name": "Coldarra Drake", "RegImage": "/327-791-22261.png", "GoldImage": "/22-261-22261.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/AT_008_ColdarraDrake_Attack_1.ogg" }, { "Name": "Death1", "URL": "/AT_008_ColdarraDrake_Death_1.ogg" }, { "Name": "Play1", "URL": "/AT_008_ColdarraDrake_Play_1.ogg" }] }, { "Name": "Frost Giant", "RegImage": "/328-160-22262.png", "GoldImage": "/22-262-22262.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_120_Attack_01.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_120_Death_01.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_120_Play_01.ogg" }] }, { "Name": "Lowly Squire", "RegImage": "/328-46-22263.png", "GoldImage": "/22-263-22263.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_082_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_082_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_082_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/Argent_Squire_Horn.ogg" }] }, { "Name": "Nexus-Champion Saraad", "RegImage": "/328-178-22264.png", "GoldImage": "/22-264-22264.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_127_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/EtherealMount_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_127_DEATH_04.ogg" }, { "Name": "Death2", "URL": "/EtherealMount_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_127_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/Ethereal_Play_Stinger_1.ogg" }, { "Name": "Play3", "URL": "/EtherealMount_Play_Underlay.ogg" }, { "Name": "Trigger1", "URL": "/VO_AT_127_TRIGGER_05.ogg" }] }, { "Name": "Totem Golem", "RegImage": "/327-953-22265.png", "GoldImage": "/22-265-22265.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_052_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_052_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_052_Play.ogg" }] }, { "Name": "Kodorider", "RegImage": "/328-97-22266.png", "GoldImage": "/22-266-22266.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_099_ATTACK_04.ogg" }, { "Name": "Attack2", "URL": "/Kodo_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_099_DEATH_05.ogg" }, { "Name": "Death2", "URL": "/Kodo_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_099_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/Kodo_Play_Underlay.ogg" }] }, { "Name": "Effigy", "RegImage": "/327-770-22267.png", "GoldImage": "/22-267-22267.webm", "Collectible": true, "Sounds": [] }, { "Name": "Fallen Hero", "RegImage": "/327-773-22268.png", "GoldImage": "/22-268-22268.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_003_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_003_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_003_PLAY_01.ogg" }] }, { "Name": "Draenei Totemcarver", "RegImage": "/327-935-22269.png", "GoldImage": "/22-269-22269.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_047_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_047_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_047_PLAY_01.ogg" }] }, { "Name": "Tuskarr Totemic", "RegImage": "/327-932-22270.png", "GoldImage": "/22-270-22270.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_046_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_046_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_046_PLAY_01.ogg" }] }, { "Name": "Thunder Bluff Valiant", "RegImage": "/327-941-22271.png", "GoldImage": "/22-271-22271.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_049_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_049_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_049_PLAY_01.ogg" }] }, { "Name": "Ball of Spiders", "RegImage": "/327-983-22272.png", "GoldImage": "/22-272-22272.webm", "Collectible": true, "Sounds": [] }, { "Name": "Poisoned Blade", "RegImage": "/327-869-22273.png", "GoldImage": "/22-273-22273.webm", "Collectible": true, "Sounds": [] }, { "Name": "Garrison Commander", "RegImage": "/328-40-22274.png", "GoldImage": "/22-274-22274.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_080_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_080_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_080_PLAY_01.ogg" }] }, { "Name": "Silver Hand Regent", "RegImage": "/328-103-22275.png", "GoldImage": "/22-275-22275.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_100_ATTACK_ALT1_04.ogg" }, { "Name": "Death1", "URL": "/VO_AT_100_DEATH_05.ogg" }, { "Name": "Play1", "URL": "/VO_AT_100_PLAY_01.ogg" }] }, { "Name": "Justicar Trueheart", "RegImage": "/328-193-22276.png", "GoldImage": "/22-276-22276.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_132_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/ArmoredWarhorse1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_132_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/ArmoredWarhorse1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_132_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/Tournament_Play_Stinger_1.ogg" }, { "Name": "Play3", "URL": "/ArmoredWarhorseNoVox_Play_Underlay.ogg" }] }, { "Name": "King's Defender", "RegImage": "/327-995-22286.png", "GoldImage": "/22-286-22286.webm", "Collectible": true, "Sounds": [] }, { "Name": "Holy Champion", "RegImage": "/327-800-22287.png", "GoldImage": "/22-287-22287.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_011_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_011_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_011_PLAY_01.ogg" }] }, { "Name": "Wilfred Fizzlebang", "RegImage": "/327-848-22288.png", "GoldImage": "/22-288-22288.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_027_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_027_DEATH_04.ogg" }, { "Name": "Play1", "URL": "/VO_AT_027_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/VO_AT_027_JARAXXUS_03.ogg" }, { "Name": "Play3", "URL": "/VO_EX1_323_FIZZLEBANG_01.ogg" }, { "Name": "Play4", "URL": "/Tournament_Play_Stinger_4.ogg" }] }, { "Name": "North Sea Kraken", "RegImage": "/328-112-22289.png", "GoldImage": "/22-289-22289.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_103_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_103_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_103_Play.ogg" }] }, { "Name": "Tournament Medic", "RegImage": "/328-73-22290.png", "GoldImage": "/22-290-22290.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_091_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_091_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_091_PLAY_01.ogg" }] }, { "Name": "Coliseum Manager", "RegImage": "/328-130-22291.png", "GoldImage": "/22-291-22291.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_110_ATTACK_ALT1_04.ogg" }, { "Name": "Death1", "URL": "/VO_AT_110_DEATH_05.ogg" }, { "Name": "Play1", "URL": "/VO_AT_110_PLAY_01.ogg" }, { "Name": "Trigger1", "URL": "/VO_AT_110_TRIGGER_06.ogg" }] }, { "Name": "Flame Juggler", "RegImage": "/328-82-22292.png", "GoldImage": "/22-292-22292.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_094_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_094_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_094_PLAY_01.ogg" }] }, { "Name": "Savage Combatant", "RegImage": "/327-899-22293.png", "GoldImage": "/22-293-22293.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_039_ATTACK_03.ogg" }, { "Name": "Death1", "URL": "/VO_AT_039_DEATH_05.ogg" }, { "Name": "Play1", "URL": "/VO_AT_039_PLAY_01.ogg" }] }, { "Name": "Clockwork Knight", "RegImage": "/328-88-22294.png", "GoldImage": "/22-294-22294.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_096_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/Mechanohorse_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_096_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/Mechanohorse_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_096_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/Mechanohorse_Play_Underlay.ogg" }] }, { "Name": "Eydis Darkbane", "RegImage": "/328-190-22295.png", "GoldImage": "/22-295-22295.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_131_ATTACK_03.ogg" }, { "Name": "Death1", "URL": "/VO_AT_131_DEATH_04.ogg" }, { "Name": "Play1", "URL": "/VO_AT_131_PLAY_ALT1_02.ogg" }, { "Name": "Play2", "URL": "/Tournament_Play_Stinger_2.ogg" }] }, { "Name": "Fjola Lightbane", "RegImage": "/328-184-22296.png", "GoldImage": "/22-296-22296.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_129_ATTACK_03.ogg" }, { "Name": "Death1", "URL": "/VO_AT_129_DEATH_04.ogg" }, { "Name": "Play1", "URL": "/VO_AT_129_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/Tournament_Play_Stinger_2.ogg" }, { "Name": "Trigger1", "URL": "/Fjola_Lightbane_Trigger_Sound.ogg" }] }, { "Name": "Silent Knight", "RegImage": "/328-85-22297.png", "GoldImage": "/22-297-22297.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_095_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_095_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_095_PLAY_01.ogg" }] }, { "Name": "Argent Watchman", "RegImage": "/328-127-22298.png", "GoldImage": "/22-298-22298.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_109_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/WingedMount1_Attack_Underlay.ogg" }, { "Name": "Attack3", "URL": "/Hippogryph_Attack_VoxUnderlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_109_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/WingedMount1_Death_Underlay.ogg" }, { "Name": "Death3", "URL": "/Hippogryph_Death_VoxUnderlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_109_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/WingedMount1_Play_Underlay.ogg" }, { "Name": "Play3", "URL": "/Hippogryph_Play_VoxUnderlay.ogg" }] }, { "Name": "Spellslinger", "RegImage": "/327-788-22299.png", "GoldImage": "/22-299-22299.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_007_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_007_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_007_PLAY_01.ogg" }] }, { "Name": "Illidan Stormrage", "RegImage": "/334-788-223.png", "GoldImage": "/0-223-223.webm", "Sounds": [] }, { "Name": "Demonfuse", "RegImage": "/327-839-22300.png", "GoldImage": "/22-300-22300.webm", "Collectible": true, "Sounds": [] }, { "Name": "Argent Horserider", "RegImage": "/328-61-22301.png", "GoldImage": "/22-301-22301.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_087_ATTACK_04.ogg" }, { "Name": "Attack2", "URL": "/ArmoredWarhorse3_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_087_DEATH_06.ogg" }, { "Name": "Death2", "URL": "/ArmoredWarhorse3_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_087_PLAY_ALT1_02.ogg" }, { "Name": "Play2", "URL": "/ArmoredWarhorse3_Play_Underlay.ogg" }] }, { "Name": "Flame Lance", "RegImage": "/327-767-22302.png", "GoldImage": "/22-302-22302.webm", "Collectible": true, "Sounds": [] }, { "Name": "Darnassus Aspirant", "RegImage": "/327-896-22303.png", "GoldImage": "/22-303-22303.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_038_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/ArmoredTiger_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_038_DEATH_04.ogg" }, { "Name": "Death2", "URL": "/ArmoredTiger_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_038_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/ArmoredTiger_Play_Underlay.ogg" }] }, { "Name": "Wrathguard", "RegImage": "/327-845-22304.png", "GoldImage": "/22-304-22304.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_026_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_026_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_026_PLAY_01.ogg" }] }, { "Name": "Shado-Pan Rider", "RegImage": "/327-851-22305.png", "GoldImage": "/22-305-22305.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_028_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/ArmoredTiger_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_028_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/ArmoredTiger_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_028_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/ArmoredTiger_Play_Underlay.ogg" }] }, { "Name": "Master of Ceremonies", "RegImage": "/328-151-22306.png", "GoldImage": "/22-306-22306.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_117_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_117_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_117_PLAY_01.ogg" }] }, { "Name": "Druid of the Saber", "RegImage": "/327-908-22307.png", "GoldImage": "/22-307-22307.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_042_ATTACK_01.ogg" }, { "Name": "Death1", "URL": "/VO_AT_042_DEATH_03_ALT.ogg" }, { "Name": "Play1", "URL": "/VO_AT_042_PLAY_01.ogg" }] }, { "Name": "Crowd Favorite", "RegImage": "/328-163-22308.png", "GoldImage": "/22-308-22308.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_121_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_121_DEATH_03_ALT.ogg" }, { "Name": "Play1", "URL": "/VO_AT_121_PLAY_01.ogg" }] }, { "Name": "Bash", "RegImage": "/327-992-22309.png", "GoldImage": "/22-309-22309.webm", "Collectible": true, "Sounds": [] }, { "Name": "Brave Archer", "RegImage": "/327-974-22310.png", "GoldImage": "/22-310-22310.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_059_ATTACK_03.ogg" }, { "Name": "Death1", "URL": "/VO_AT_059_DEATH_05.ogg" }, { "Name": "Play1", "URL": "/VO_AT_059_PLAY_01.ogg" }] }, { "Name": "Gadgetzan Jouster", "RegImage": "/328-244-22311.png", "GoldImage": "/22-311-22311.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_133_ATTACK_ALT1_03.ogg" }, { "Name": "Attack2", "URL": "/Shredder_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_133_DEATH_04.ogg" }, { "Name": "Death2", "URL": "/Shredder_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_133_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/Shredder_Play_Underlay.ogg" }] }, { "Name": "Armored Warhorse", "RegImage": "/328-124-22312.png", "GoldImage": "/22-312-22312.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_108_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/ArmoredWarhorseNoVox_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_108_Death_01.ogg" }, { "Name": "Death2", "URL": "/ArmoredWarhorseNoVox_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_108_Play_01.ogg" }, { "Name": "Play2", "URL": "/ArmoredWarhorseNoVox_Play_Underlay.ogg" }] }, { "Name": "Eadric the Pure", "RegImage": "/328-43-22313.png", "GoldImage": "/22-313-22313.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_081_ATTACK_03.ogg" }, { "Name": "Death1", "URL": "/VO_AT_081_DEATH_04.ogg" }, { "Name": "Play1", "URL": "/VO_AT_081_PLAY_ALT1_02.ogg" }, { "Name": "Play2", "URL": "/Tournament_Play_Stinger_3.ogg" }] }, { "Name": "The Skeleton Knight", "RegImage": "/328-181-22314.png", "GoldImage": "/22-314-22314.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_128_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_128_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_128_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/SkeletonKnight_Play_Stinger.ogg" }] }, { "Name": "Tuskarr Jouster", "RegImage": "/328-115-22315.png", "GoldImage": "/22-315-22315.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_104_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/TurtleMount_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_104_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/TurtleMount_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_104_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/TurtleMount_Play_Underlay.ogg" }] }, { "Name": "Argent Lance", "RegImage": "/328-31-22316.png", "GoldImage": "/22-316-22316.webm", "Collectible": true, "Sounds": [] }, { "Name": "Master Jouster", "RegImage": "/328-136-22317.png", "GoldImage": "/22-317-22317.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_112_ATTACK_03.ogg" }, { "Name": "Attack2", "URL": "/ArmoredWarhorse2_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_112_DEATH_04.ogg" }, { "Name": "Death2", "URL": "/ArmoredWarhorse2_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_112_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/ArmoredWarhorse2_Play_Underlay.ogg" }] }, { "Name": "Mukla's Champion", "RegImage": "/328-70-22318.png", "GoldImage": "/22-318-22318.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_090_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/HippoMount_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_090_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/HippoMount_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_090_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/HippoMount_Play_Underlay.ogg" }] }, { "Name": "Ancestral Knowledge", "RegImage": "/327-956-22319.png", "GoldImage": "/22-319-22319.webm", "Collectible": true, "Sounds": [] }, { "Name": "Bolster", "RegImage": "/328-4-22320.png", "GoldImage": "/22-320-22320.webm", "Collectible": true, "Sounds": [] }, { "Name": "Burgle", "RegImage": "/327-866-22321.png", "GoldImage": "/22-321-22321.webm", "Collectible": true, "Sounds": [] }, { "Name": "Injured Kvaldir", "RegImage": "/328-118-22322.png", "GoldImage": "/22-322-22322.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_105_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_105_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_105_PLAY_01_ALT.ogg" }] }, { "Name": "Gormok the Impaler", "RegImage": "/328-166-22323.png", "GoldImage": "/22-323-22323.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/AT_122_GormokTheImpaler_Attack.ogg" }, { "Name": "Death1", "URL": "/AT_122_GormokTheImpaler_Death.ogg" }, { "Name": "Play1", "URL": "/AT_122_GormokTheImpaler_Play.ogg" }, { "Name": "Play2", "URL": "/Tournament_Beast_Play_Stinger.ogg" }] }, { "Name": "Anub'arak", "RegImage": "/327-878-22324.png", "GoldImage": "/22-324-22324.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_036_ATTACK_ALT1_05.ogg" }, { "Name": "Death1", "URL": "/VO_AT_036_DEATH_06.ogg" }, { "Name": "Play1", "URL": "/VO_AT_036_PLAY_01_ALT.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Undead2.ogg" }, { "Name": "Trigger1", "URL": "/VO_AT_036_TRIGGER_ALT1_08.ogg" }] }, { "Name": "Aviana", "RegImage": "/327-929-22325.png", "GoldImage": "/22-325-22325.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_045_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_045_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_045_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/Hyjal_Play_Stinger_2.ogg" }] }, { "Name": "Grand Crusader", "RegImage": "/328-154-22326.png", "GoldImage": "/22-326-22326.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_118_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/ArmoredWarhorse1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_118_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/ArmoredWarhorse1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_118_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/ArmoredWarhorse1_Play_Underlay.ogg" }] }, { "Name": "Confuse", "RegImage": "/327-815-22327.png", "GoldImage": "/22-327-22327.webm", "Collectible": true, "Sounds": [] }, { "Name": "Flash Heal", "RegImage": "/327-962-22328.png", "GoldImage": "/22-328-22328.webm", "Collectible": true, "Sounds": [] }, { "Name": "Living Roots", "RegImage": "/327-884-22329.png", "GoldImage": "/22-329-22329.webm", "Collectible": true, "Sounds": [] }, { "Name": "Warhorse Trainer", "RegImage": "/328-25-22330.png", "GoldImage": "/22-330-22330.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_075_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/ArmoredWarhorse3_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_075_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/ArmoredWarhorse3_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_075_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/ArmoredWarhorse3_Play_Underlay.ogg" }] }, { "Name": "Charged Hammer", "RegImage": "/327-944-22331.png", "GoldImage": "/22-331-22331.webm", "Collectible": true, "Sounds": [] }, { "Name": "Fist of Jaraxxus", "RegImage": "/327-833-22332.png", "GoldImage": "/22-332-22332.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/FistOfJaraxxus_FX_Impact_Sound.ogg" }, { "Name": "Play2", "URL": "/Spell_AshbringerMissile_1.ogg" }, { "Name": "Trigger1", "URL": "/FistOfJaraxxus_FX_Impact_Sound.ogg" }, { "Name": "Trigger2", "URL": "/Spell_AshbringerMissile_1.ogg" }] }, { "Name": "Alexstrasza's Champion", "RegImage": "/328-13-22333.png", "GoldImage": "/22-333-22333.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_071_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/ArmoredWarhorse1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_071_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/ArmoredWarhorse1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_071_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/ArmoredWarhorse1_Play_Underlay.ogg" }] }, { "Name": "Astral Communion", "RegImage": "/327-923-22334.png", "GoldImage": "/22-334-22334.webm", "Collectible": true, "Sounds": [] }, { "Name": "Lance Carrier", "RegImage": "/328-52-22335.png", "GoldImage": "/22-335-22335.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_084_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_084_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_084_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/Argent_Gruntling_Horn.ogg" }] }, { "Name": "Cutpurse", "RegImage": "/327-860-22336.png", "GoldImage": "/22-336-22336.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_031_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_031_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_031_PLAY_01.ogg" }, { "Name": "Trigger1", "URL": "/GadgetzanAuctioneer_card_spawn_coins.ogg" }] }, { "Name": "Dreadsteed", "RegImage": "/339-134-22337.png", "GoldImage": "/22-337-22337.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_019_Attack.ogg" }, { "Name": "Attack2", "URL": "/Dreadsteed_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_019_Death.ogg" }, { "Name": "Death2", "URL": "/Dreadsteed_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_019_Play.ogg" }, { "Name": "Play2", "URL": "/Dreadsteed_Play_Underlay.ogg" }] }, { "Name": "Icehowl", "RegImage": "/328-175-22338.png", "GoldImage": "/22-338-22338.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_125_Attack_01.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_125_Death_01.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_125_Play_01.ogg" }, { "Name": "Play2", "URL": "/Tournament_Beast_Play_Stinger.ogg" }] }, { "Name": "Sea Reaver", "RegImage": "/328-187-22339.png", "GoldImage": "/22-339-22339.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_130_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_130_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_130_PLAY_01.ogg" }, { "Name": "Trigger1", "URL": "/VO_AT_130_TRIGGER_04.ogg" }] }, { "Name": "Healing Wave", "RegImage": "/327-938-22340.png", "GoldImage": "/22-340-22340.webm", "Collectible": true, "Sounds": [] }, { "Name": "Light's Champion", "RegImage": "/328-121-22341.png", "GoldImage": "/22-341-22341.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_106_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_106_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_106_PLAY_01.ogg" }] }, { "Name": "Varian Wrynn", "RegImage": "/328-16-22342.png", "GoldImage": "/22-342-22342.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_072_ATTACK_03.ogg" }, { "Name": "Death1", "URL": "/VO_AT_072_DEATH_04.ogg" }, { "Name": "Play1", "URL": "/VO_AT_072_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/VO_AT_072_ANDUIN_ALT3_01.ogg" }, { "Name": "Play3", "URL": "/Varian_Wrynn_Play_Stinger.ogg" }] }, { "Name": "Rhonin", "RegImage": "/327-794-22343.png", "GoldImage": "/22-343-22343.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_009_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_009_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_009_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/Dalaran_Play_Stinger_1.ogg" }] }, { "Name": "Ram Wrangler", "RegImage": "/327-797-22344.png", "GoldImage": "/22-344-22344.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_010_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_010_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_010_PLAY_01.ogg" }] }, { "Name": "Elemental Destruction", "RegImage": "/327-950-22345.png", "GoldImage": "/22-345-22345.webm", "Collectible": true, "Sounds": [] }, { "Name": "Bolf Ramshield", "RegImage": "/328-172-22346.png", "GoldImage": "/22-346-22346.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_124_ATTACK_04.ogg" }, { "Name": "Attack2", "URL": "/RamMount_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_124_DEATH_05.ogg" }, { "Name": "Death2", "URL": "/RamMount_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_124_PLAY_ALT2_03.ogg" }, { "Name": "Play2", "URL": "/Tournament_Play_Stinger_5.ogg" }, { "Name": "Play3", "URL": "/RamMount_Play_Underlay.ogg" }] }, { "Name": "Buccaneer", "RegImage": "/327-854-22347.png", "GoldImage": "/22-347-22347.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_029_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_029_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_029_PLAY_01.ogg" }] }, { "Name": "Shady Dealer", "RegImage": "/327-863-22348.png", "GoldImage": "/22-348-22348.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_032_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_032_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_032_PLAY_01.ogg" }] }, { "Name": "The Mistcaller", "RegImage": "/327-959-22349.png", "GoldImage": "/22-349-22349.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_054_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_054_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_054_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/BoreanTundra_Play_Stinger_1.ogg" }] }, { "Name": "Tournament Attendee", "RegImage": "/328-91-22350.png", "GoldImage": "/22-350-22350.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_097_ATTACK_03.ogg" }, { "Name": "Death1", "URL": "/VO_AT_097_DEATH_04.ogg" }, { "Name": "Play1", "URL": "/VO_AT_097_PLAY_01.ogg" }] }, { "Name": "Twilight Guardian", "RegImage": "/327-818-22351.png", "GoldImage": "/22-351-22351.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/AT_017_TwilightGuardian_Attack_1.ogg" }, { "Name": "Death1", "URL": "/AT_017_TwilightGuardian_Death_1.ogg" }, { "Name": "Play1", "URL": "/AT_017_TwilightGuardian_Play_1.ogg" }] }, { "Name": "Boneguard Lieutenant", "RegImage": "/328-67-22352.png", "GoldImage": "/22-352-22352.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_089_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/UndeadHorse_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_089_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/UndeadHorse_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_089_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/UndeadHorse_Play_Underlay.ogg" }] }, { "Name": "Chillmaw", "RegImage": "/328-169-22353.png", "GoldImage": "/22-353-22353.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_123_Attack_01.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_123_Death_01.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_123_Play_01.ogg" }, { "Name": "Play2", "URL": "/Tournament_Beast_Play_Stinger.ogg" }] }, { "Name": "Sparring Partner", "RegImage": "/328-7-22354.png", "GoldImage": "/22-354-22354.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_069_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_069_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_069_PLAY_01.ogg" }] }, { "Name": "Kvaldir Raider", "RegImage": "/328-157-22355.png", "GoldImage": "/22-355-22355.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_119_ATTACK_03.ogg" }, { "Name": "Death1", "URL": "/VO_AT_119_DEATH_04.ogg" }, { "Name": "Play1", "URL": "/VO_AT_119_PLAY_01.ogg" }] }, { "Name": "Shadowfiend", "RegImage": "/327-809-22356.png", "GoldImage": "/22-356-22356.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_014_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_014_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_014_Play.ogg" }] }, { "Name": "Spawn of Shadows", "RegImage": "/327-803-22357.png", "GoldImage": "/22-357-22357.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_012_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_012_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_012_PLAY_01.ogg" }] }, { "Name": "Arcane Blast", "RegImage": "/327-776-22358.png", "GoldImage": "/22-358-22358.webm", "Collectible": true, "Sounds": [] }, { "Name": "Dalaran Aspirant", "RegImage": "/327-785-22359.png", "GoldImage": "/22-359-22359.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_006_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/ArmoredWarhorse2_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_006_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/ArmoredWarhorse2_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_006_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/ArmoredWarhorse2_Play_Underlay.ogg" }, { "Name": "Trigger1", "URL": "/VO_AT_006_TRIGGER_04.ogg" }] }, { "Name": "Knight of the Wild", "RegImage": "/327-905-22360.png", "GoldImage": "/22-360-22360.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_041_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_041_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_041_PLAY_01.ogg" }] }, { "Name": "Wildwalker", "RegImage": "/327-902-22361.png", "GoldImage": "/22-361-22361.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_040_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_040_DEATH_05.ogg" }, { "Name": "Play1", "URL": "/VO_AT_040_PLAY_01.ogg" }] }, { "Name": "Murloc Knight", "RegImage": "/328-28-22362.png", "GoldImage": "/22-362-22362.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/AT_076_MurlocKnight_Attack.ogg" }, { "Name": "Attack2", "URL": "/FrogMount_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/AT_076_MurlocKnight_Death.ogg" }, { "Name": "Death2", "URL": "/FrogMount_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/AT_076_MurlocKnight_Play.ogg" }, { "Name": "Play2", "URL": "/FrogMount_Play_Underlay.ogg" }] }, { "Name": "Competitive Spirit", "RegImage": "/328-19-22363.png", "GoldImage": "/22-363-22363.webm", "Collectible": true, "Sounds": [] }, { "Name": "Bear Trap", "RegImage": "/327-977-22364.png", "GoldImage": "/22-364-22364.webm", "Collectible": true, "Sounds": [] }, { "Name": "Stablemaster", "RegImage": "/327-968-22365.png", "GoldImage": "/22-365-22365.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_057_ATTACK_03.ogg" }, { "Name": "Death1", "URL": "/VO_AT_057_DEATH_04.ogg" }, { "Name": "Play1", "URL": "/VO_AT_057_PLAY_01.ogg" }] }, { "Name": "Saboteur", "RegImage": "/328-58-22366.png", "GoldImage": "/22-366-22366.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_086_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_086_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_086_PLAY_01.ogg" }] }, { "Name": "Recruiter", "RegImage": "/328-139-22367.png", "GoldImage": "/22-367-22367.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_113_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_113_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_113_PLAY_01.ogg" }, { "Name": "Trigger1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Confessor Paletress", "RegImage": "/327-821-22368.png", "GoldImage": "/22-368-22368.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_018_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_018_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_018_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/Tournament_Play_Stinger_3.ogg" }] }, { "Name": "Dragonhawk Rider", "RegImage": "/328-49-22369.png", "GoldImage": "/22-369-22369.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_083_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/WingedMount1_Attack_Underlay.ogg" }, { "Name": "Attack3", "URL": "/CS2_169_Young_Dragonhawk_Attack1.ogg" }, { "Name": "Death1", "URL": "/VO_AT_083_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/WingedMount1_Death_Underlay.ogg" }, { "Name": "Death3", "URL": "/CS2_169_Young_Dragonhawk_Death1.ogg" }, { "Name": "Play1", "URL": "/VO_AT_083_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/WingedMount1_Play_Underlay.ogg" }, { "Name": "Play3", "URL": "/CS2_169_Young_Dragonhawk_EnterPlay1.ogg" }] }, { "Name": "King's Elekk", "RegImage": "/327-971-22370.png", "GoldImage": "/22-370-22370.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_058_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_058_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_058_Play.ogg" }] }, { "Name": "Undercity Valiant", "RegImage": "/327-857-22371.png", "GoldImage": "/22-371-22371.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_030_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/UndeadHorse_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_030_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/UndeadHorse_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_030_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/UndeadHorse_Play_Underlay.ogg" }, { "Name": "Play3", "URL": "/FX_Warlock_G_Rays_Loop.ogg" }, { "Name": "Play4", "URL": "/FX_Warlock_C_SkullBolt.ogg" }, { "Name": "Play5", "URL": "/FX_Warlock_G_Rays_Loop.ogg" }, { "Name": "Play6", "URL": "/FX_Warlock_C_SkullBolt.ogg" }, { "Name": "Play7", "URL": "/FX_Warlock_J_SkullBolt_Impact.ogg" }] }, { "Name": "Sideshow Spelleater", "RegImage": "/328-94-22372.png", "GoldImage": "/22-372-22372.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_098_ATTACK_03.ogg" }, { "Name": "Death1", "URL": "/VO_AT_098_DEATH_04.ogg" }, { "Name": "Play1", "URL": "/VO_AT_098_PLAY_ALT1_02.ogg" }] }, { "Name": "Seal of Champions", "RegImage": "/328-22-22373.png", "GoldImage": "/22-373-22373.webm", "Collectible": true, "Sounds": [] }, { "Name": "Refreshment Vendor", "RegImage": "/328-133-22374.png", "GoldImage": "/22-374-22374.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_111_ATTACK_03.ogg" }, { "Name": "Attack2", "URL": "/Cart_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_111_DEATH_04.ogg" }, { "Name": "Death2", "URL": "/Cart_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_111_PLAY_ALT1_02.ogg" }, { "Name": "Play2", "URL": "/Cart_Play_Underlay.ogg" }] }, { "Name": "Pit Fighter", "RegImage": "/328-106-22375.png", "GoldImage": "/22-375-22375.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_101_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_101_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_101_PLAY_01.ogg" }] }, { "Name": "Magnataur Alpha", "RegImage": "/328-1-22376.png", "GoldImage": "/22-376-22376.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/AT_067_MagnataurAlpha_Attack.ogg" }, { "Name": "Death1", "URL": "/AT_067_MagnataurAlpha_Death.ogg" }, { "Name": "Play1", "URL": "/AT_067_MagnataurAlpha_Play.ogg" }] }, { "Name": "Captured Jormungar", "RegImage": "/328-109-22377.png", "GoldImage": "/22-377-22377.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_102_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_102_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_102_Play.ogg" }] }, { "Name": "Fencing Coach", "RegImage": "/328-145-22378.png", "GoldImage": "/22-378-22378.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_115_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_115_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_115_PLAY_01.ogg" }] }, { "Name": "Convert", "RegImage": "/327-812-22379.png", "GoldImage": "/22-379-22379.webm", "Collectible": true, "Sounds": [] }, { "Name": "Enter the Coliseum", "RegImage": "/328-34-22380.png", "GoldImage": "/22-380-22380.webm", "Collectible": true, "Sounds": [] }, { "Name": "Frigid Snobold", "RegImage": "/328-79-22381.png", "GoldImage": "/22-381-22381.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_093_ATTACK_ALT1_04.ogg" }, { "Name": "Death1", "URL": "/VO_AT_093_DEATH_05.ogg" }, { "Name": "Play1", "URL": "/VO_AT_093_PLAY_01.ogg" }] }, { "Name": "Mogor's Champion", "RegImage": "/328-64-22382.png", "GoldImage": "/22-382-22382.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_088_ATTACK_03.ogg" }, { "Name": "Attack2", "URL": "/Kodo_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_088_DEATH_05.ogg" }, { "Name": "Death2", "URL": "/Kodo_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_088_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/Kodo_Play_Underlay.ogg" }, { "Name": "Trigger1", "URL": "/VO_AT_088_TRIGGER_01.ogg" }] }, { "Name": "Mulch", "RegImage": "/327-926-22383.png", "GoldImage": "/22-383-22383.webm", "Collectible": true, "Sounds": [] }, { "Name": "Powershot", "RegImage": "/327-965-22384.png", "GoldImage": "/22-384-22384.webm", "Collectible": true, "Sounds": [] }, { "Name": "Power Word: Glory", "RegImage": "/327-806-22385.png", "GoldImage": "/22-385-22385.webm", "Collectible": true, "Sounds": [] }, { "Name": "Tiny Knight of Evil", "RegImage": "/327-830-22386.png", "GoldImage": "/22-386-22386.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_021_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/FelhoundMount_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_021_DEATH_05.ogg" }, { "Name": "Death2", "URL": "/FelhoundMount_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_021_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/FelhoundMount_Play_Underlay.ogg" }] }, { "Name": "Void Crusher", "RegImage": "/327-836-22387.png", "GoldImage": "/22-387-22387.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_023_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_023_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_023_PLAY_01.ogg" }] }, { "Name": "Dark Bargain", "RegImage": "/327-842-22388.png", "GoldImage": "/22-388-22388.webm", "Collectible": true, "Sounds": [] }, { "Name": "Dreadscale", "RegImage": "/327-989-22389.png", "GoldImage": "/22-389-22389.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_063t_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_063t_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_063t_Play.ogg" }, { "Name": "Play2", "URL": "/Tournament_Beast_Play_Stinger.ogg" }] }, { "Name": "Evil Heckler", "RegImage": "/328-142-22390.png", "GoldImage": "/22-390-22390.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_114_ATTACK_03.ogg" }, { "Name": "Death1", "URL": "/VO_AT_114_DEATH_05.ogg" }] }, { "Name": "Fearsome Doomguard", "RegImage": "/327-827-22391.png", "GoldImage": "/22-391-22391.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_020_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_020_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_020_PLAY_01.ogg" }] }, { "Name": "Ice Rager", "RegImage": "/328-76-22392.png", "GoldImage": "/22-392-22392.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/AT_092_IceRager_Attack.ogg" }, { "Name": "Death1", "URL": "/AT_092_IceRager_Death.ogg" }, { "Name": "Play1", "URL": "/AT_092_IceRager_Play.ogg" }] }, { "Name": "Acidmaw", "RegImage": "/327-986-22393.png", "GoldImage": "/22-393-22393.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_063_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_063_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_063_Play.ogg" }, { "Name": "Play2", "URL": "/Tournament_Beast_Play_Stinger.ogg" }] }, { "Name": "Mysterious Challenger", "RegImage": "/328-37-22394.png", "GoldImage": "/22-394-22394.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_079_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/ArmoredWarhorseNoVox_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_079_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/ArmoredWarhorse3_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_079_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/ArmoredWarhorseNoVox_Play_Underlay.ogg" }] }, { "Name": "Orgrimmar Aspirant", "RegImage": "/327-998-22395.png", "GoldImage": "/22-395-22395.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_066_ATTACK_02.ogg" }, { "Name": "Attack2", "URL": "/WolfMount_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_AT_066_DEATH_03.ogg" }, { "Name": "Death2", "URL": "/WolfMount_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_AT_066_PLAY_01.ogg" }, { "Name": "Play2", "URL": "/WolfMount_Play_Underlay.ogg" }] }, { "Name": "Polymorph: Boar", "RegImage": "/327-779-22396.png", "GoldImage": "/22-396-22396.webm", "Collectible": true, "Sounds": [] }, { "Name": "Beneath the Grounds", "RegImage": "/327-872-22397.png", "GoldImage": "/22-397-22397.webm", "Collectible": true, "Sounds": [] }, { "Name": "Wyrmrest Agent", "RegImage": "/328-148-22398.png", "GoldImage": "/22-398-22398.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_116_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_116_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_116_PLAY_01.ogg" }] }, { "Name": "Fireblast Rank 2", "RegImage": "/329-952-22399.png", "GoldImage": "/22-399-22399.webm", "Sounds": [] }, { "Name": "Tank Up!", "RegImage": "/330-105-22400.png", "GoldImage": "/22-400-22400.webm", "Sounds": [{ "Name": "Play1", "URL": "/Magni_HeroPower_HammerImpact_Sound_01.ogg" }] }, { "Name": "Ballista Shot", "RegImage": "/330-336-22401.png", "GoldImage": "/22-401-22401.webm", "Sounds": [] }, { "Name": "Tarnished Coin", "RegImage": "/334-98-22413.png", "GoldImage": "/22-413-22413.webm", "Sounds": [] }, { "Name": "Choose a New Card!", "RegImage": "/334-101-22414.png", "GoldImage": "/22-414-22414.webm", "Sounds": [] }, { "Name": "Pirate", "RegImage": "/334-104-22417.png", "GoldImage": "/22-417-22417.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_018_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_018_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_018_Play_01.ogg" }] }, { "Name": "Boar", "RegImage": "/327-782-22420.png", "GoldImage": "/22-420-22420.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_005t_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_005t_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_005t_PLAY_01.ogg" }] }, { "Name": "Ambush!", "RegImage": "/327-875-22435.png", "GoldImage": "/22-435-22435.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/Crush_CustomDeath_Sound_01.ogg" }, { "Name": "Trigger2", "URL": "/Crush_CustomDeath_Sound_01.ogg" }] }, { "Name": "Nerubian", "RegImage": "/327-881-22436.png", "GoldImage": "/22-436-22436.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_NAX1_03_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_NAX1_03_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_NAX1_03_EnterPlay.ogg" }] }, { "Name": "Living Roots", "RegImage": "/327-887-22437.png", "GoldImage": "/22-437-22437.webm", "Sounds": [] }, { "Name": "Living Roots", "RegImage": "/327-890-22438.png", "GoldImage": "/22-438-22438.webm", "Sounds": [] }, { "Name": "Sapling", "RegImage": "/327-893-22439.png", "GoldImage": "/22-439-22439.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_037t_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_037t_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_037t_Play.ogg" }] }, { "Name": "Lion Form", "RegImage": "/339-137-22443.png", "GoldImage": "/22-443-22443.webm", "Sounds": [] }, { "Name": "Panther Form", "RegImage": "/339-140-22444.png", "GoldImage": "/22-444-22444.webm", "Sounds": [] }, { "Name": "Sabertooth Lion", "RegImage": "/327-917-22445.png", "GoldImage": "/22-445-22445.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_042t_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_042t_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_042t_EnterPlay.ogg" }] }, { "Name": "Sabertooth Panther", "RegImage": "/327-920-22446.png", "GoldImage": "/22-446-22446.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_042t2_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_042t2_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_042t2_EnterPlay.ogg" }] }, { "Name": "Lightning Jolt", "RegImage": "/327-947-22451.png", "GoldImage": "/22-451-22451.webm", "Sounds": [] }, { "Name": "War Kodo", "RegImage": "/328-100-22474.png", "GoldImage": "/22-474-22474.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_099t_Attack.ogg" }, { "Name": "Attack2", "URL": "/ArmoredKodoNoVox_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_099t_Death.ogg" }, { "Name": "Death2", "URL": "/ArmoredKodoNoVox_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_099t_Play.ogg" }, { "Name": "Play2", "URL": "/ArmoredKodoNoVox_Play_Underlay.ogg" }] }, { "Name": "Dire Shapeshift", "RegImage": "/328-196-22481.png", "GoldImage": "/22-481-22481.webm", "Sounds": [] }, { "Name": "Ballista Shot", "RegImage": "/328-199-22483.png", "GoldImage": "/22-483-22483.webm", "Sounds": [] }, { "Name": "Fireblast Rank 2", "RegImage": "/328-202-22484.png", "GoldImage": "/22-484-22484.webm", "Sounds": [] }, { "Name": "The Silver Hand", "RegImage": "/328-205-22485.png", "GoldImage": "/22-485-22485.webm", "Sounds": [] }, { "Name": "Heal", "RegImage": "/328-208-22486.png", "GoldImage": "/22-486-22486.webm", "Sounds": [] }, { "Name": "Poisoned Daggers", "RegImage": "/328-211-22487.png", "GoldImage": "/22-487-22487.webm", "Sounds": [] }, { "Name": "Poisoned Dagger", "RegImage": "/328-217-22488.png", "GoldImage": "/22-488-22488.webm", "Sounds": [] }, { "Name": "Totemic Slam", "RegImage": "/328-223-22489.png", "GoldImage": "/22-489-22489.webm", "Sounds": [] }, { "Name": "Healing Totem", "RegImage": "/328-226-22490.png", "GoldImage": "/22-490-22490.webm", "Sounds": [] }, { "Name": "Searing Totem", "RegImage": "/328-229-22491.png", "GoldImage": "/22-491-22491.webm", "Sounds": [] }, { "Name": "Stoneclaw Totem", "RegImage": "/328-232-22492.png", "GoldImage": "/22-492-22492.webm", "Sounds": [] }, { "Name": "Wrath of Air Totem", "RegImage": "/328-235-22493.png", "GoldImage": "/22-493-22493.webm", "Sounds": [] }, { "Name": "Soul Tap", "RegImage": "/328-238-22494.png", "GoldImage": "/22-494-22494.webm", "Sounds": [{ "Name": "Play1", "URL": "/Warlock_LifeTap_Cast_1.ogg" }, { "Name": "Play2", "URL": "/Warlock_LifeTap_Cast_1.ogg" }] }, { "Name": "Tank Up!", "RegImage": "/328-241-22495.png", "GoldImage": "/22-495-22495.webm", "Sounds": [] }, { "Name": "Pile On!!!", "RegImage": "/328-389-22497.png", "GoldImage": "/22-497-22497.webm", "Sounds": [{ "Name": "Play1", "URL": "/Pile_On_card_draw.ogg" }] }, { "Name": "Jeering Crowd", "RegImage": "/328-416-22498.png", "GoldImage": "/22-498-22498.webm", "Sounds": [] }, { "Name": "Jeering Crowd", "RegImage": "/328-413-22499.png", "GoldImage": "/22-499-22499.webm", "Sounds": [] }, { "Name": "Houndmaster", "RegImage": "/330-303-225.png", "GoldImage": "/0-225-225.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_DS1_070_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_DS1_070_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_DS1_070_Play_01.ogg" }] }, { "Name": "The Majordomo", "RegImage": "/328-491-22500.png", "GoldImage": "/22-500-22500.webm", "Sounds": [] }, { "Name": "ME SMASH", "RegImage": "/328-518-22501.png", "GoldImage": "/22-501-22501.webm", "Sounds": [] }, { "Name": "ME SMASH", "RegImage": "/328-515-22502.png", "GoldImage": "/22-502-22502.webm", "Sounds": [] }, { "Name": "Open the Gates", "RegImage": "/328-551-22503.png", "GoldImage": "/22-503-22503.webm", "Sounds": [] }, { "Name": "Wild Magic", "RegImage": "/328-722-22504.png", "GoldImage": "/22-504-22504.webm", "Sounds": [] }, { "Name": "Activate!", "RegImage": "/328-749-22505.png", "GoldImage": "/22-505-22505.webm", "Sounds": [] }, { "Name": "Bone Minions", "RegImage": "/328-863-22506.png", "GoldImage": "/22-506-22506.webm", "Sounds": [] }, { "Name": "Poison Cloud", "RegImage": "/333-135-22507.png", "GoldImage": "/22-507-22507.webm", "Sounds": [{ "Name": "Play1", "URL": "/FX_Warlock_AE_GasWave_Green_01.ogg" }] }, { "Name": "Decimate", "RegImage": "/333-156-22508.png", "GoldImage": "/22-508-22508.webm", "Sounds": [] }, { "Name": "Web Wrap", "RegImage": "/333-267-22509.png", "GoldImage": "/22-509-22509.webm", "Sounds": [] }, { "Name": "Harvest", "RegImage": "/333-369-22510.png", "GoldImage": "/22-510-22510.webm", "Sounds": [] }, { "Name": "Annoy-o-Tron", "RegImage": "/334-476-22512.png", "GoldImage": "/22-512-22512.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_085_Attack_02_ALT.ogg" }, { "Name": "Attack2", "URL": "/ClunkyMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_085_Death_03.ogg" }, { "Name": "Death2", "URL": "/ClunkyMechSmall_Death_Underlay.ogg" }] }, { "Name": "Hello! Hello! Hello!", "RegImage": "/334-479-22513.png", "GoldImage": "/22-513-22513.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_GVG_085_Attack_02_ALT.ogg" }, { "Name": "Attack2", "URL": "/ClunkyMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_GVG_085_Death_03.ogg" }, { "Name": "Death2", "URL": "/ClunkyMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_GVG_085_Play_01.ogg" }, { "Name": "Play2", "URL": "/ClunkyMechSmall_Play_Underlay.ogg" }] }, { "Name": "Boom Bot", "RegImage": "/334-482-22514.png", "GoldImage": "/22-514-22514.webm", "Sounds": [{ "Name": "Attack1", "URL": "/GVG_110t_BoomBot_Attack.ogg" }, { "Name": "Death1", "URL": "/GVG_110t_BoomBot_Death.ogg" }] }, { "Name": "Boom Bot Jr.", "RegImage": "/334-485-22515.png", "GoldImage": "/22-515-22515.webm", "Sounds": [] }, { "Name": "Decimate", "RegImage": "/333-159-22521.png", "GoldImage": "/22-521-22521.webm", "Sounds": [{ "Name": "Play1", "URL": "/KingMukla_Stomp_Cast_1.ogg" }] }, { "Name": "Prioritize", "RegImage": "/334-164-22522.png", "GoldImage": "/22-522-22522.webm", "Sounds": [] }, { "Name": "Bomb Salvo", "RegImage": "/334-167-22523.png", "GoldImage": "/22-523-22523.webm", "Sounds": [] }, { "Name": "Release Coolant", "RegImage": "/269-370-22524.png", "GoldImage": "/22-524-22524.webm", "Sounds": [] }, { "Name": "Overclock", "RegImage": "/334-170-22525.png", "GoldImage": "/22-525-22525.webm", "Sounds": [] }, { "Name": "Double Zap", "RegImage": "/334-173-22526.png", "GoldImage": "/22-526-22526.webm", "Sounds": [] }, { "Name": "Kill the Lorewalker", "RegImage": "/334-176-22527.png", "GoldImage": "/22-527-22527.webm", "Sounds": [] }, { "Name": "Execute", "RegImage": "/330-120-227.png", "GoldImage": "/0-227-227.webm", "Collectible": true, "Sounds": [] }, { "Name": "Prophet Velen", "RegImage": "/330-818-228.png", "GoldImage": "/0-228-228.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_350_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_350_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_350_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Misc1.ogg" }] }, { "Name": "Mind Shatter", "RegImage": "/331-150-229.png", "GoldImage": "/0-229-229.webm", "Sounds": [{ "Name": "Play1", "URL": "/Shared_Shadow_PreCastHigh_1.ogg" }, { "Name": "Play2", "URL": "/Shared_Shadow_Cast_1.ogg" }, { "Name": "Play3", "URL": "/Shared_Shadow_Start_1.ogg" }, { "Name": "Play4", "URL": "/Shared_Shadow_PreCastHigh_1.ogg" }, { "Name": "Play5", "URL": "/Shared_Shadow_Cast_1.ogg" }, { "Name": "Play6", "URL": "/Warlock_Corruption_Impact_1.ogg" }, { "Name": "Play7", "URL": "/Shared_Shadow_Fizzle_1.ogg" }] }, { "Name": "Aldor Peacekeeper", "RegImage": "/330-848-23.png", "GoldImage": "/0-23-23.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_382_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_382_Death_03-01.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_382_Play_01.ogg" }] }, { "Name": "Worthless Imp", "RegImage": "/330-776-230.png", "GoldImage": "/0-230-230.webm", "Sounds": [{ "Name": "Attack1", "URL": "/WoW_EX1_317t_Worthless_Imp_Attack.ogg" }, { "Name": "Death1", "URL": "/WoW_EX1_317t_Worthless_Imp_Death.ogg" }, { "Name": "Play1", "URL": "/WoW_EX1_317t_Worthless_Imp_EnterPlay.ogg" }] }, { "Name": "Bananas", "RegImage": "/330-375-231.png", "GoldImage": "/0-231-231.webm", "Sounds": [] }, { "Name": "Temple Enforcer", "RegImage": "/331-138-232.png", "GoldImage": "/0-232-232.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_623_Temple_Enforcer_Attack_2.ogg" }, { "Name": "Death1", "URL": "/EX1_623_Temple_Enforcer_Death_4.ogg" }, { "Name": "Play1", "URL": "/EX1_623_Temple_Enforcer_EnterPlay_1.ogg" }] }, { "Name": "Frost Shock", "RegImage": "/329-961-233.png", "GoldImage": "/0-233-233.webm", "Collectible": true, "Sounds": [] }, { "Name": "Wrath", "RegImage": "/330-570-234.png", "GoldImage": "/0-234-234.webm", "Sounds": [] }, { "Name": "Ysera Awakens", "RegImage": "/330-288-235.png", "GoldImage": "/0-235-235.webm", "Sounds": [] }, { "Name": "Felguard", "RegImage": "/330-737-236.png", "GoldImage": "/0-236-236.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_301_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_301_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_301_Play_01.ogg" }] }, { "Name": "Force of Nature", "RegImage": "/331-13-237.png", "GoldImage": "/0-237-237.webm", "Collectible": true, "Sounds": [] }, { "Name": "Ironbark Protector", "RegImage": "/330-258-238.png", "GoldImage": "/0-238-238.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CS2_232_Ironbark_Protector_Attack4.ogg" }, { "Name": "Death1", "URL": "/CS2_232_Ironbark_Protector_Death5.ogg" }, { "Name": "Play1", "URL": "/CS2_232_Ironbark_Protector_EnterPlay2.ogg" }] }, { "Name": "Deadly Shot", "RegImage": "/331-122-239.png", "GoldImage": "/0-239-239.webm", "Collectible": true, "Sounds": [] }, { "Name": "Shieldbearer", "RegImage": "/330-890-24.png", "GoldImage": "/0-24-24.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_405_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_405_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_405_Play_01.ogg" }] }, { "Name": "Emboldener 3000", "RegImage": "/333-84-240.png", "GoldImage": "/0-240-240.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_Mekka3_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_Mekka3_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_Mekka3_EnterPlay.ogg" }] }, { "Name": "Malygos", "RegImage": "/330-998-241.png", "GoldImage": "/0-241-241.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_563_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_563_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_563_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Neutral1.ogg" }] }, { "Name": "Ancient of War", "RegImage": "/330-653-242.png", "GoldImage": "/0-242-242.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_178_Ancient_Of_War_Attack3.ogg" }, { "Name": "Death1", "URL": "/EX1_178_Ancient_Of_War_Death2.ogg" }, { "Name": "Play1", "URL": "/EX1_178_Ancient_Of_War_EnterPlay1.ogg" }] }, { "Name": "Ancient Secrets", "RegImage": "/333-456-243.png", "GoldImage": "/0-243-243.webm", "Sounds": [] }, { "Name": "Blade Flurry", "RegImage": "/330-261-244.png", "GoldImage": "/0-244-244.webm", "Collectible": true, "Sounds": [] }, { "Name": "Tinkmaster Overspark", "RegImage": "/330-468-245.png", "GoldImage": "/0-245-245.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_083_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_083_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_083_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Gnome.ogg" }] }, { "Name": "Gnomish Inventor", "RegImage": "/330-168-246.png", "GoldImage": "/0-246-246.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_147_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_147_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_147_Play_01.ogg" }] }, { "Name": "Youthful Brewmaster", "RegImage": "/330-432-247.png", "GoldImage": "/0-247-247.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_049_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_049_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_049_Play_01.ogg" }] }, { "Name": "Reinforce", "RegImage": "/330-87-248.png", "GoldImage": "/0-248-248.webm", "Sounds": [] }, { "Name": "Mass Dispel", "RegImage": "/331-153-249.png", "GoldImage": "/0-249-249.webm", "Collectible": true, "Sounds": [] }, { "Name": "Wild Pyromancer", "RegImage": "/333-486-25.png", "GoldImage": "/0-25-25.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_020_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_020_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_020_Play_01.ogg" }] }, { "Name": "Light's Justice", "RegImage": "/330-72-250.png", "GoldImage": "/0-250-250.webm", "Collectible": true, "Sounds": [] }, { "Name": "Gelbin Mekkatorque", "RegImage": "/330-513-251.png", "GoldImage": "/0-251-251.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_112_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_112_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_112_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Gnome.ogg" }] }, { "Name": "Corruption", "RegImage": "/330-18-252.png", "GoldImage": "/0-252-252.webm", "Collectible": true, "Sounds": [] }, { "Name": "Armor Up!", "RegImage": "/330-99-253.png", "GoldImage": "/0-253-253.webm", "Sounds": [] }, { "Name": "Bloodlust", "RegImage": "/329-979-256.png", "GoldImage": "/0-256-256.webm", "Collectible": true, "Sounds": [] }, { "Name": "Uther Lightbringer", "RegImage": "/331-725-257.png", "GoldImage": "/0-257-257.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_04_Attack_16.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_04_Death_17.ogg" }] }, { "Name": "Healing Touch", "RegImage": "/329-889-258.png", "GoldImage": "/0-258-258.webm", "Collectible": true, "Sounds": [] }, { "Name": "Cone of Cold", "RegImage": "/330-704-26.png", "GoldImage": "/0-26-26.webm", "Collectible": true, "Sounds": [] }, { "Name": "Consecration", "RegImage": "/330-78-260.png", "GoldImage": "/0-260-260.webm", "Collectible": true, "Sounds": [] }, { "Name": "Dread Corsair", "RegImage": "/333-492-261.png", "GoldImage": "/0-261-261.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_022_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_022_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_022_Play_01.ogg" }] }, { "Name": "Uproot", "RegImage": "/330-659-262.png", "GoldImage": "/0-262-262.webm", "Sounds": [] }, { "Name": "Mana Wyrm", "RegImage": "/333-468-263.png", "GoldImage": "/0-263-263.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/NEW1_012_Mana_Wyrm_Attack2.ogg" }, { "Name": "Death1", "URL": "/NEW1_012_Mana_Wyrm_Death3.ogg" }, { "Name": "Play1", "URL": "/NEW1_012_Mana_Wyrm_EnterPlay1.ogg" }] }, { "Name": "Mountain Giant", "RegImage": "/330-504-264.png", "GoldImage": "/0-264-264.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_105_Mountain_Giant_Attack1.ogg" }, { "Name": "Death1", "URL": "/EX1_105_Mountain_Giant_Death1.ogg" }, { "Name": "Play1", "URL": "/EX1_105_Mountain_Giant_EnterPlay3.ogg" }] }, { "Name": "Thrallmar Farseer", "RegImage": "/330-393-265.png", "GoldImage": "/0-265-265.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_021_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_021_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_021_Play_01.ogg" }] }, { "Name": "Bite", "RegImage": "/339-187-266.png", "GoldImage": "/0-266-266.webm", "Collectible": true, "Sounds": [] }, { "Name": "Captain Greenskin", "RegImage": "/333-498-267.png", "GoldImage": "/0-267-267.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_024_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_024_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_024_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Gnome.ogg" }] }, { "Name": "Silver Hand Recruit", "RegImage": "/330-96-268.png", "GoldImage": "/0-268-268.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_101t_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_101t_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_101t_Play_01.ogg" }] }, { "Name": "Booty Bay Bodyguard", "RegImage": "/330-216-27.png", "GoldImage": "/0-27-27.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_187_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_187_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_187_Play_01.ogg" }] }, { "Name": "Hex", "RegImage": "/330-677-270.png", "GoldImage": "/0-270-270.webm", "Collectible": true, "Sounds": [] }, { "Name": "Treant", "RegImage": "/330-588-272.png", "GoldImage": "/0-272-272.webm", "Sounds": [{ "Name": "Attack1", "URL": "/EX1_158t Treant_Attack2.ogg" }, { "Name": "Death1", "URL": "/EX1_158t Treant_Death2.ogg" }, { "Name": "Play1", "URL": "/EX1_158t Treant_EnterPlay1.ogg" }] }, { "Name": "Explorer's Hat", "RegImage": "/332-529-27209.png", "GoldImage": "/27-209-27209.webm", "Collectible": true, "Sounds": [] }, { "Name": "Elise Starseeker", "RegImage": "/332-505-27210.png", "GoldImage": "/27-210-27210.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_079_Attack_13.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_079_Death_14.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_079_Play_15.ogg" }, { "Name": "Play2", "URL": "/LOE_Hero_Play_Stinger_1.ogg" }] }, { "Name": "Jeweled Scarab", "RegImage": "/332-469-27211.png", "GoldImage": "/27-211-27211.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/LOE_029_JeweledScarab_Attack.ogg" }, { "Name": "Death1", "URL": "/LOE_029_JeweledScarab_Death.ogg" }, { "Name": "Play1", "URL": "/LOE_029_JeweledScarab_Play.ogg" }] }, { "Name": "Golden Monkey", "RegImage": "/332-445-27212.png", "GoldImage": "/27-212-27212.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOE_019t2_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOE_019t2_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOE_019t2_Play.ogg" }] }, { "Name": "Map to the Golden Monkey", "RegImage": "/332-442-27213.png", "GoldImage": "/27-213-27213.webm", "Sounds": [] }, { "Name": "Brann Bronzebeard", "RegImage": "/332-502-27214.png", "GoldImage": "/27-214-27214.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_077_Attack_12.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_077_Death_13.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_077_Play_16.ogg" }, { "Name": "Play2", "URL": "/VO_LOE_077_MAGNI_14.ogg" }, { "Name": "Play3", "URL": "/LOE_Hero_Play_Stinger_1.ogg" }] }, { "Name": "Sir Finley Mrrgglton", "RegImage": "/332-499-27215.png", "GoldImage": "/27-215-27215.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_076_Attack_13.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_076_Death_alt_15.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_076_Play_alt4_20.ogg" }, { "Name": "Play2", "URL": "/VO_FINLEY_MORGL_02.ogg" }, { "Name": "Play3", "URL": "/LOE_Hero_Play_Stinger_1.ogg" }] }, { "Name": "Forgotten Torch", "RegImage": "/332-388-27216.png", "GoldImage": "/27-216-27216.webm", "Collectible": true, "Sounds": [] }, { "Name": "Sacred Trial", "RegImage": "/332-466-27217.png", "GoldImage": "/27-217-27217.webm", "Collectible": true, "Sounds": [] }, { "Name": "Huge Toad", "RegImage": "/332-478-27219.png", "GoldImage": "/27-219-27219.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOE_046_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOE_046_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOE_046_Play.ogg" }] }, { "Name": "Unearthed Raptor", "RegImage": "/332-439-27220.png", "GoldImage": "/27-220-27220.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/LOE_019_UnearthedRaptor_Attack.ogg" }, { "Name": "Death1", "URL": "/LOE_019_UnearthedRaptor_Death.ogg" }, { "Name": "Play1", "URL": "/LOE_019_UnearthedRaptor_Play.ogg" }] }, { "Name": "Pit Snake", "RegImage": "/332-418-27221.png", "GoldImage": "/27-221-27221.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOE_010_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOE_010_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOE_010_Play.ogg" }] }, { "Name": "Obsidian Destroyer", "RegImage": "/332-412-27222.png", "GoldImage": "/27-222-27222.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOE_009_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOE_009_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOE_009_Play.ogg" }] }, { "Name": "Wobbling Runts", "RegImage": "/332-511-27223.png", "GoldImage": "/27-223-27223.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_089_Attack_Trio.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_089_Death_Trio.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_089_Play_Trio.ogg" }] }, { "Name": "Everyfin is Awesome", "RegImage": "/332-544-27224.png", "GoldImage": "/27-224-27224.webm", "Collectible": true, "Sounds": [] }, { "Name": "Murloc Tinyfin", "RegImage": "/332-895-27225.png", "GoldImage": "/27-225-27225.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/LOEA10_3_BabyMurloc_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA10_3_BabyMurloc_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA10_3_BabyMurloc_Play.ogg" }] }, { "Name": "Tomb Spider", "RegImage": "/332-481-27226.png", "GoldImage": "/27-226-27226.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOE_047_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOE_047_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOE_047_Play.ogg" }] }, { "Name": "Dart Trap", "RegImage": "/332-451-27227.png", "GoldImage": "/27-227-27227.webm", "Collectible": true, "Sounds": [] }, { "Name": "Reno Jackson", "RegImage": "/332-421-27228.png", "GoldImage": "/27-228-27228.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_011_Attack_10.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_011_Death_11.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_011_Play_12.ogg" }, { "Name": "Play2", "URL": "/LOE_Hero_Play_Stinger_1.ogg" }] }, { "Name": "Tomb Pillager", "RegImage": "/332-424-27229.png", "GoldImage": "/27-229-27229.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_012_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_012_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_012_Play_01.ogg" }, { "Name": "Trigger1", "URL": "/GadgetzanAuctioneer_card_spawn_coins.ogg" }] }, { "Name": "Raven Idol", "RegImage": "/332-547-27230.png", "GoldImage": "/27-230-27230.webm", "Collectible": true, "Sounds": [] }, { "Name": "Naga Sea Witch", "RegImage": "/332-472-27231.png", "GoldImage": "/27-231-27231.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_038_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_038_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_038_Play_01.ogg" }] }, { "Name": "Curse of Rafaam", "RegImage": "/332-400-27232.png", "GoldImage": "/27-232-27232.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Eerie Statue", "RegImage": "/332-532-27233.png", "GoldImage": "/27-233-27233.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/LOE_107_EerieStatue_Attack.ogg" }, { "Name": "Death1", "URL": "/LOE_107_EerieStatue_Death.ogg" }, { "Name": "Play1", "URL": "/LOE_107_EerieStatue_Play.ogg" }] }, { "Name": "Djinni of Zephyrs", "RegImage": "/332-490-27234.png", "GoldImage": "/27-234-27234.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_053_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_053_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_053_Play_01.ogg" }] }, { "Name": "Fossilized Devilsaur", "RegImage": "/332-496-27235.png", "GoldImage": "/27-235-27235.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOE_073_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOE_073_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOE_073_Play.ogg" }] }, { "Name": "Jungle Moonkin", "RegImage": "/332-487-27236.png", "GoldImage": "/27-236-27236.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/LOE_051_JungleMoonkin_Attack.ogg" }, { "Name": "Death1", "URL": "/LOE_051_JungleMoonkin_Death.ogg" }, { "Name": "Play1", "URL": "/LOE_051_JungleMoonkin_Play.ogg" }] }, { "Name": "Gorillabot A-3", "RegImage": "/332-475-27237.png", "GoldImage": "/27-237-27237.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOE_039_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOE_039_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOE_039_Play.ogg" }] }, { "Name": "Entomb", "RegImage": "/332-526-27238.png", "GoldImage": "/27-238-27238.webm", "Collectible": true, "Sounds": [] }, { "Name": "Summoning Stone", "RegImage": "/332-508-27239.png", "GoldImage": "/27-239-27239.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/LOE_086_SummoningStone_Attack.ogg" }, { "Name": "Death1", "URL": "/LOE_086_SummoningStone_Death.ogg" }, { "Name": "Play1", "URL": "/LOE_086_SummoningStone_Play.ogg" }] }, { "Name": "Anyfin Can Happen", "RegImage": "/332-463-27240.png", "GoldImage": "/27-240-27240.webm", "Collectible": true, "Sounds": [] }, { "Name": "Anubisath Sentinel", "RegImage": "/332-493-27241.png", "GoldImage": "/27-241-27241.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOE_061_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOE_061_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOE_061_Play.ogg" }] }, { "Name": "Excavated Evil", "RegImage": "/332-541-27242.png", "GoldImage": "/27-242-27242.webm", "Collectible": true, "Sounds": [] }, { "Name": "Dark Peddler", "RegImage": "/332-457-27243.png", "GoldImage": "/27-243-27243.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_023_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_023_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_023_Play_01.ogg" }] }, { "Name": "Rumbling Elemental", "RegImage": "/332-427-27244.png", "GoldImage": "/27-244-27244.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/LOE_016_RumblingElemental_Attack.ogg" }, { "Name": "Death1", "URL": "/LOE_016_RumblingElemental_Death.ogg" }, { "Name": "Play1", "URL": "/LOE_016_RumblingElemental_Play.ogg" }] }, { "Name": "Ancient Shade", "RegImage": "/332-535-27245.png", "GoldImage": "/27-245-27245.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_110_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_110_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_110_Play_01.ogg" }] }, { "Name": "Tunnel Trogg", "RegImage": "/332-436-27246.png", "GoldImage": "/27-246-27246.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_018_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_018_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_018_Play_01.ogg" }, { "Name": "Trigger1", "URL": "/Shared_Rage_InnerRage_Impact_1.ogg" }, { "Name": "Trigger2", "URL": "/Lightning_Idle_03_Sound_01.ogg" }, { "Name": "Trigger3", "URL": "/Shared_Rage_InnerRage_Impact_1.ogg" }, { "Name": "Trigger4", "URL": "/Lightning_Idle_03_Sound_01.ogg" }] }, { "Name": "Cursed Blade", "RegImage": "/332-559-27248.png", "GoldImage": "/27-248-27248.webm", "Collectible": true, "Sounds": [] }, { "Name": "Ethereal Conjurer", "RegImage": "/332-394-27249.png", "GoldImage": "/27-249-27249.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_003_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_003_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_003_Play_01.ogg" }] }, { "Name": "Museum Curator", "RegImage": "/332-397-27250.png", "GoldImage": "/27-250-27250.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_006_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_006_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_006_Play3_05.ogg" }] }, { "Name": "Desert Camel", "RegImage": "/332-448-27251.png", "GoldImage": "/27-251-27251.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOE_020_Attack.ogg" }, { "Name": "Attack2", "URL": "/Camel_Mount_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/SFX_LOE_020_Death.ogg" }, { "Name": "Death2", "URL": "/Camel_Mount_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/SFX_LOE_020_Play.ogg" }, { "Name": "Play2", "URL": "/Camel_Mount_Play_Underlay.ogg" }] }, { "Name": "Animated Armor", "RegImage": "/332-562-27252.png", "GoldImage": "/27-252-27252.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/LOEA14_1_SteelSentinel_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA14_1_SteelSentinel_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA16_27_SteelSentinel_Start.ogg" }] }, { "Name": "Mounted Raptor", "RegImage": "/332-484-27253.png", "GoldImage": "/27-253-27253.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOE_050_Attack.ogg" }, { "Name": "Attack2", "URL": "/Raptor_Mount_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/SFX_LOE_050_Death.ogg" }, { "Name": "Death2", "URL": "/Raptor_Mount_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/SFX_LOE_050_Play.ogg" }, { "Name": "Play2", "URL": "/Raptor_Mount_Play_Underlay.ogg" }] }, { "Name": "Arch-Thief Rafaam", "RegImage": "/332-523-27254.png", "GoldImage": "/27-254-27254.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOEA16_1_RESPONSE_03.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_092_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_092_Play_04.ogg" }, { "Name": "Play2", "URL": "/LOE_Villain_Play_Stinger_1.ogg" }, { "Name": "Play3", "URL": "/Rafaam_FX_Sound.ogg" }, { "Name": "Play4", "URL": "/Rafaam_FX_Sound.ogg" }] }, { "Name": "Fierce Monkey", "RegImage": "/332-454-27255.png", "GoldImage": "/27-255-27255.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOE_022_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOE_022_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOE_022_Play.ogg" }] }, { "Name": "Reliquary Seeker", "RegImage": "/332-556-27256.png", "GoldImage": "/27-256-27256.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_116_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_116_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_116_Play4_06.ogg" }] }, { "Name": "Mirror of Doom", "RegImage": "/333-60-27257.png", "GoldImage": "/27-257-27257.webm", "Sounds": [] }, { "Name": "Timepiece of Horror", "RegImage": "/333-57-27258.png", "GoldImage": "/27-258-27258.webm", "Sounds": [] }, { "Name": "Lantern of Power", "RegImage": "/333-54-27259.png", "GoldImage": "/27-259-27259.webm", "Sounds": [] }, { "Name": "Keeper of Uldaman", "RegImage": "/332-433-27260.png", "GoldImage": "/27-260-27260.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_017_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_017_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_017_Play_01.ogg" }] }, { "Name": "Winter's Veil Gift", "RegImage": "/334-314-27270.png", "GoldImage": "/27-270-27270.webm", "Sounds": [{ "Name": "Attack1", "URL": "/GiftCrate_Attack.ogg" }, { "Name": "Death1", "URL": "/GiftCrate_Death.ogg" }, { "Name": "Play1", "URL": "/GiftCrate_Play.ogg" }, { "Name": "Trigger1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Stolen Winter's Veil Gift", "RegImage": "/334-317-27271.png", "GoldImage": "/27-271-27271.webm", "Sounds": [] }, { "Name": "Mech Fan", "RegImage": "/334-488-27272.png", "GoldImage": "/27-272-27272.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRMA02_2t_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_BRMA02_2t_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA02_2t_Play_01.ogg" }] }, { "Name": "Dire Fate: Taunt and Charge", "RegImage": "/334-494-27275.png", "GoldImage": "/27-275-27275.webm", "Sounds": [] }, { "Name": "Battlecry Bonus", "RegImage": "/334-497-27276.png", "GoldImage": "/27-276-27276.webm", "Sounds": [] }, { "Name": "Fate: Bananas", "RegImage": "/334-509-27281.png", "GoldImage": "/27-281-27281.webm", "Sounds": [] }, { "Name": "Dire Fate: Windfury", "RegImage": "/334-512-27283.png", "GoldImage": "/27-283-27283.webm", "Sounds": [] }, { "Name": "Dire Fate: Card", "RegImage": "/334-515-27285.png", "GoldImage": "/27-285-27285.webm", "Sounds": [] }, { "Name": "Fate: Spells", "RegImage": "/334-518-27287.png", "GoldImage": "/27-287-27287.webm", "Sounds": [] }, { "Name": "Fate: Portals", "RegImage": "/334-521-27289.png", "GoldImage": "/27-289-27289.webm", "Sounds": [] }, { "Name": "Fate: Coin", "RegImage": "/334-527-27290.png", "GoldImage": "/27-290-27290.webm", "Sounds": [] }, { "Name": "Spell Bonus", "RegImage": "/334-533-27292.png", "GoldImage": "/27-292-27292.webm", "Sounds": [] }, { "Name": "Deathrattle Bonus", "RegImage": "/334-539-27294.png", "GoldImage": "/27-294-27294.webm", "Sounds": [] }, { "Name": "Sun Raider Phaerix", "RegImage": "/332-571-27297.png", "GoldImage": "/27-297-27297.webm", "Sounds": [] }, { "Name": "Sun Raider Phaerix", "RegImage": "/332-574-27298.png", "GoldImage": "/27-298-27298.webm", "Sounds": [] }, { "Name": "Blessings of the Sun", "RegImage": "/332-577-27299.png", "GoldImage": "/27-299-27299.webm", "Sounds": [] }, { "Name": "Wisp", "RegImage": "/330-255-273.png", "GoldImage": "/0-273-273.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CS2_231_Wisp_Attack2.ogg" }, { "Name": "Death1", "URL": "/CS2_231_Wisp_Death1.ogg" }, { "Name": "Play1", "URL": "/CS2_231_Wisp_EnterPlay1.ogg" }] }, { "Name": "Blessings of the Sun", "RegImage": "/332-580-27300.png", "GoldImage": "/27-300-27300.webm", "Sounds": [] }, { "Name": "Rod of the Sun", "RegImage": "/332-583-27301.png", "GoldImage": "/27-301-27301.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOEA01_11_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOEA01_11_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOEA01_11_Play.ogg" }] }, { "Name": "Rod of the Sun", "RegImage": "/332-586-27302.png", "GoldImage": "/27-302-27302.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOEA01_11_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOEA01_11_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOEA01_11_Play.ogg" }] }, { "Name": "Tol'vir Hoplite", "RegImage": "/332-589-27304.png", "GoldImage": "/27-304-27304.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOEA01_12_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOEA01_12_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_LOEA01_12_Play_01.ogg" }] }, { "Name": "Tol'vir Hoplite", "RegImage": "/332-592-27305.png", "GoldImage": "/27-305-27305.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOEA01_12_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOEA01_12_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_LOEA01_12_Play_01.ogg" }] }, { "Name": "Zinaar", "RegImage": "/332-595-27306.png", "GoldImage": "/27-306-27306.webm", "Sounds": [] }, { "Name": "Zinaar", "RegImage": "/332-598-27307.png", "GoldImage": "/27-307-27307.webm", "Sounds": [] }, { "Name": "Djinn’s Intuition", "RegImage": "/332-601-27308.png", "GoldImage": "/27-308-27308.webm", "Sounds": [] }, { "Name": "Djinn’s Intuition", "RegImage": "/332-604-27309.png", "GoldImage": "/27-309-27309.webm", "Sounds": [] }, { "Name": "Wish for Power", "RegImage": "/332-607-27310.png", "GoldImage": "/27-310-27310.webm", "Sounds": [] }, { "Name": "Wish for Valor", "RegImage": "/332-610-27311.png", "GoldImage": "/27-311-27311.webm", "Sounds": [] }, { "Name": "Wish for Glory", "RegImage": "/332-613-27312.png", "GoldImage": "/27-312-27312.webm", "Sounds": [] }, { "Name": "Wish for More Wishes", "RegImage": "/332-616-27313.png", "GoldImage": "/27-313-27313.webm", "Sounds": [] }, { "Name": "Wish for Companionship", "RegImage": "/332-619-27314.png", "GoldImage": "/27-314-27314.webm", "Sounds": [] }, { "Name": "Leokk", "RegImage": "/332-622-27315.png", "GoldImage": "/27-315-27315.webm", "Sounds": [] }, { "Name": "Misha", "RegImage": "/332-625-27316.png", "GoldImage": "/27-316-27316.webm", "Sounds": [] }, { "Name": "Temple Escape", "RegImage": "/332-628-27317.png", "GoldImage": "/27-317-27317.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/TempleEscape_ceiling_collapse.ogg" }, { "Name": "Trigger2", "URL": "/TempleEscape_ceiling_rumble.ogg" }] }, { "Name": "Temple Escape", "RegImage": "/332-631-27320.png", "GoldImage": "/27-320-27320.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/TempleEscape_ceiling_collapse.ogg" }, { "Name": "Trigger2", "URL": "/TempleEscape_ceiling_rumble.ogg" }] }, { "Name": "Escape!", "RegImage": "/332-634-27321.png", "GoldImage": "/27-321-27321.webm", "Sounds": [] }, { "Name": "Escape!", "RegImage": "/332-637-27322.png", "GoldImage": "/27-322-27322.webm", "Sounds": [] }, { "Name": "Pit of Spikes", "RegImage": "/332-640-27323.png", "GoldImage": "/27-323-27323.webm", "Sounds": [] }, { "Name": "Swing Across", "RegImage": "/332-643-27324.png", "GoldImage": "/27-324-27324.webm", "Sounds": [] }, { "Name": "Walk Across Gingerly", "RegImage": "/332-646-27325.png", "GoldImage": "/27-325-27325.webm", "Sounds": [] }, { "Name": "Orsis Guard", "RegImage": "/332-649-27326.png", "GoldImage": "/27-326-27326.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOEA04_13bt_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOEA04_13bt_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_LOEA04_13bt_Play_01.ogg" }] }, { "Name": "Orsis Guard", "RegImage": "/332-652-27327.png", "GoldImage": "/27-327-27327.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOEA04_13bt_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOEA04_13bt_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_LOEA04_13bt_Play_01.ogg" }] }, { "Name": "Giant Insect", "RegImage": "/332-655-27328.png", "GoldImage": "/27-328-27328.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOEA04_23_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOEA04_23_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOEA04_23_Play.ogg" }] }, { "Name": "Giant Insect", "RegImage": "/332-658-27329.png", "GoldImage": "/27-329-27329.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOEA04_23_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOEA04_23_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOEA04_23_Play.ogg" }] }, { "Name": "Anubisath Temple Guard", "RegImage": "/332-661-27330.png", "GoldImage": "/27-330-27330.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOEA04_24_Attack2_03.ogg" }, { "Name": "Death1", "URL": "/VO_LOEA04_24_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_LOEA04_24_Play_01.ogg" }] }, { "Name": "Anubisath Temple Guard", "RegImage": "/332-664-27331.png", "GoldImage": "/27-331-27331.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOEA04_24_Attack2_03.ogg" }, { "Name": "Death1", "URL": "/VO_LOEA04_24_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_LOEA04_24_Play_01.ogg" }] }, { "Name": "Seething Statue", "RegImage": "/332-667-27332.png", "GoldImage": "/27-332-27332.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOEA04_25_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOEA04_25_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOEA04_25_Play.ogg" }] }, { "Name": "Seething Statue", "RegImage": "/332-670-27333.png", "GoldImage": "/27-333-27333.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOEA04_25_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOEA04_25_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOEA04_25_Play.ogg" }] }, { "Name": "Animated Statue", "RegImage": "/332-673-27334.png", "GoldImage": "/27-334-27334.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA04_27_AnimatedStatue_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA04_27_AnimatedStatue_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA04_27_AnimatedStatue_Play.ogg" }] }, { "Name": "A Glowing Pool", "RegImage": "/332-676-27335.png", "GoldImage": "/27-335-27335.webm", "Sounds": [] }, { "Name": "Drink Deeply", "RegImage": "/332-679-27336.png", "GoldImage": "/27-336-27336.webm", "Sounds": [] }, { "Name": "Wade Through", "RegImage": "/332-682-27337.png", "GoldImage": "/27-337-27337.webm", "Sounds": [] }, { "Name": "The Eye", "RegImage": "/332-685-27338.png", "GoldImage": "/27-338-27338.webm", "Sounds": [] }, { "Name": "Touch It", "RegImage": "/332-688-27339.png", "GoldImage": "/27-339-27339.webm", "Sounds": [] }, { "Name": "Investigate the Runes", "RegImage": "/332-691-27340.png", "GoldImage": "/27-340-27340.webm", "Sounds": [] }, { "Name": "The Darkness", "RegImage": "/332-694-27341.png", "GoldImage": "/27-341-27341.webm", "Sounds": [] }, { "Name": "Take the Shortcut", "RegImage": "/332-697-27342.png", "GoldImage": "/27-342-27342.webm", "Sounds": [] }, { "Name": "No Way!", "RegImage": "/332-700-27343.png", "GoldImage": "/27-343-27343.webm", "Sounds": [] }, { "Name": "Chieftain Scarvash", "RegImage": "/332-703-27344.png", "GoldImage": "/27-344-27344.webm", "Sounds": [] }, { "Name": "Chieftain Scarvash", "RegImage": "/332-706-27345.png", "GoldImage": "/27-345-27345.webm", "Sounds": [] }, { "Name": "Trogg Hate Minions!", "RegImage": "/332-709-27346.png", "GoldImage": "/27-346-27346.webm", "Sounds": [] }, { "Name": "Trogg Hate Minions!", "RegImage": "/332-712-27347.png", "GoldImage": "/27-347-27347.webm", "Sounds": [] }, { "Name": "Trogg Hate Minions!", "RegImage": "/332-715-27348.png", "GoldImage": "/27-348-27348.webm", "Sounds": [] }, { "Name": "Trogg Hate Minions!", "RegImage": "/332-718-27349.png", "GoldImage": "/27-349-27349.webm", "Sounds": [] }, { "Name": "Trogg Hate Spells!", "RegImage": "/332-721-27350.png", "GoldImage": "/27-350-27350.webm", "Sounds": [] }, { "Name": "Trogg Hate Spells!", "RegImage": "/332-724-27351.png", "GoldImage": "/27-351-27351.webm", "Sounds": [] }, { "Name": "Stonesculpting", "RegImage": "/332-727-27352.png", "GoldImage": "/27-352-27352.webm", "Sounds": [] }, { "Name": "Stonesculpting", "RegImage": "/332-730-27353.png", "GoldImage": "/27-353-27353.webm", "Sounds": [] }, { "Name": "Earthen Statue", "RegImage": "/332-733-27354.png", "GoldImage": "/27-354-27354.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA06_02t_EarthenStatue_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA06_02t_EarthenStatue_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA06_02t_EarthenStatue_Play.ogg" }] }, { "Name": "Earthen Statue", "RegImage": "/332-736-27355.png", "GoldImage": "/27-355-27355.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA06_02t_EarthenStatue_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA06_02t_EarthenStatue_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA06_02t_EarthenStatue_Play.ogg" }] }, { "Name": "Animate Earthen", "RegImage": "/332-739-27356.png", "GoldImage": "/27-356-27356.webm", "Sounds": [] }, { "Name": "Animate Earthen", "RegImage": "/332-742-27359.png", "GoldImage": "/27-359-27359.webm", "Sounds": [] }, { "Name": "Shattering Spree", "RegImage": "/332-745-27360.png", "GoldImage": "/27-360-27360.webm", "Sounds": [] }, { "Name": "Shattering Spree", "RegImage": "/332-748-27361.png", "GoldImage": "/27-361-27361.webm", "Sounds": [] }, { "Name": "Mine Cart", "RegImage": "/332-751-27362.png", "GoldImage": "/27-362-27362.webm", "Sounds": [] }, { "Name": "Mine Shaft", "RegImage": "/332-754-27363.png", "GoldImage": "/27-363-27363.webm", "Sounds": [] }, { "Name": "Mine Shaft", "RegImage": "/332-757-27364.png", "GoldImage": "/27-364-27364.webm", "Sounds": [] }, { "Name": "Flee the Mine!", "RegImage": "/332-760-27365.png", "GoldImage": "/27-365-27365.webm", "Sounds": [] }, { "Name": "Flee the Mine!", "RegImage": "/332-763-27366.png", "GoldImage": "/27-366-27366.webm", "Sounds": [] }, { "Name": "Chasing Trogg", "RegImage": "/332-766-27367.png", "GoldImage": "/27-367-27367.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA07_09_ChasingTrogg_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA07_09_ChasingTrogg_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA07_09_ChasingTrogg_Play.ogg" }] }, { "Name": "Debris", "RegImage": "/332-769-27368.png", "GoldImage": "/27-368-27368.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA07_11_Debris_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA07_11_Debris_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA07_11_Debris_Play.ogg" }] }, { "Name": "Earthen Pursuer", "RegImage": "/332-772-27369.png", "GoldImage": "/27-369-27369.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOEA07_12_Play_01.ogg" }, { "Name": "Death1", "URL": "/VO_LOEA07_12_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_LOEA07_12_Play_01.ogg" }] }, { "Name": "Lumbering Golem", "RegImage": "/332-775-27370.png", "GoldImage": "/27-370-27370.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA07_14_LumberingGolem_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA07_14_LumberingGolem_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA07_14_LumberingGolem_Play.ogg" }] }, { "Name": "Dynamite", "RegImage": "/332-778-27371.png", "GoldImage": "/27-371-27371.webm", "Sounds": [] }, { "Name": "Boom!", "RegImage": "/332-781-27372.png", "GoldImage": "/27-372-27372.webm", "Sounds": [] }, { "Name": "Barrel Forward", "RegImage": "/332-784-27373.png", "GoldImage": "/27-373-27373.webm", "Sounds": [] }, { "Name": "Spiked Decoy", "RegImage": "/332-787-27374.png", "GoldImage": "/27-374-27374.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA07_24_SpikedDecoy_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA07_24_SpikedDecoy_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA07_24_SpikedDecoy_Play.ogg" }] }, { "Name": "Mechanical Parrot", "RegImage": "/332-790-27375.png", "GoldImage": "/27-375-27375.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_LOEA07_25_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_LOEA07_25_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_LOEA07_25_Play.ogg" }] }, { "Name": "Consult Brann", "RegImage": "/332-793-27376.png", "GoldImage": "/27-376-27376.webm", "Sounds": [] }, { "Name": "Repairs", "RegImage": "/332-796-27377.png", "GoldImage": "/27-377-27377.webm", "Sounds": [] }, { "Name": "Throw Rocks", "RegImage": "/332-799-27378.png", "GoldImage": "/27-378-27378.webm", "Sounds": [] }, { "Name": "Archaedas", "RegImage": "/332-802-27379.png", "GoldImage": "/27-379-27379.webm", "Sounds": [] }, { "Name": "Archaedas", "RegImage": "/332-805-27380.png", "GoldImage": "/27-380-27380.webm", "Sounds": [] }, { "Name": "Lord Slitherspear", "RegImage": "/332-808-27381.png", "GoldImage": "/27-381-27381.webm", "Sounds": [] }, { "Name": "Hungry Naga", "RegImage": "/332-811-27382.png", "GoldImage": "/27-382-27382.webm", "Sounds": [] }, { "Name": "Hungry Naga", "RegImage": "/332-814-27383.png", "GoldImage": "/27-383-27383.webm", "Sounds": [] }, { "Name": "Hungry Naga", "RegImage": "/332-817-27384.png", "GoldImage": "/27-384-27384.webm", "Sounds": [] }, { "Name": "Hungry Naga", "RegImage": "/332-820-27385.png", "GoldImage": "/27-385-27385.webm", "Sounds": [] }, { "Name": "Lord Slitherspear", "RegImage": "/332-823-27386.png", "GoldImage": "/27-386-27386.webm", "Sounds": [] }, { "Name": "Enraged!", "RegImage": "/332-826-27387.png", "GoldImage": "/27-387-27387.webm", "Sounds": [] }, { "Name": "Enraged!", "RegImage": "/332-829-27390.png", "GoldImage": "/27-390-27390.webm", "Sounds": [] }, { "Name": "Getting Hungry", "RegImage": "/332-832-27391.png", "GoldImage": "/27-391-27391.webm", "Sounds": [] }, { "Name": "Getting Hungry", "RegImage": "/332-835-27394.png", "GoldImage": "/27-394-27394.webm", "Sounds": [] }, { "Name": "Getting Hungry", "RegImage": "/332-838-27395.png", "GoldImage": "/27-395-27395.webm", "Sounds": [] }, { "Name": "Getting Hungry", "RegImage": "/332-841-27396.png", "GoldImage": "/27-396-27396.webm", "Sounds": [] }, { "Name": "Endless Hunger", "RegImage": "/332-844-27397.png", "GoldImage": "/27-397-27397.webm", "Sounds": [] }, { "Name": "Rare Spear", "RegImage": "/332-847-27398.png", "GoldImage": "/27-398-27398.webm", "Sounds": [] }, { "Name": "Rare Spear", "RegImage": "/332-850-27399.png", "GoldImage": "/27-399-27399.webm", "Sounds": [] }, { "Name": "Water Elemental", "RegImage": "/329-943-274.png", "GoldImage": "/0-274-274.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CS2_033_Attack_WaterElemental.ogg" }, { "Name": "Death1", "URL": "/CS2_033_Death_WaterElemental.ogg" }, { "Name": "Play1", "URL": "/CS2_033_Play_WaterElemental.ogg" }] }, { "Name": "Hungry Naga", "RegImage": "/332-853-27400.png", "GoldImage": "/27-400-27400.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA09_5_HungryNaga_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA09_5_HungryNaga_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA09_5_HungryNaga_Play.ogg" }] }, { "Name": "Hungry Naga", "RegImage": "/332-856-27401.png", "GoldImage": "/27-401-27401.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA09_5_HungryNaga_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA09_5_HungryNaga_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA09_5_HungryNaga_Play.ogg" }] }, { "Name": "Slithering Archer", "RegImage": "/332-859-27402.png", "GoldImage": "/27-402-27402.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOEA09_6_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOEA09_6_Death_05.ogg" }, { "Name": "Play1", "URL": "/VO_LOEA09_6_Play_01.ogg" }] }, { "Name": "Slithering Archer", "RegImage": "/332-862-27403.png", "GoldImage": "/27-403-27403.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOEA09_6_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOEA09_6_Death_05.ogg" }, { "Name": "Play1", "URL": "/VO_LOEA09_6_Play_01.ogg" }] }, { "Name": "Cauldron", "RegImage": "/332-865-27404.png", "GoldImage": "/27-404-27404.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA09_7_Cauldron_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA09_7_Cauldron_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA09_7_Cauldron_Play.ogg" }, { "Name": "Trigger1", "URL": "/Splash_Impact_Sound.ogg" }] }, { "Name": "Cauldron", "RegImage": "/332-868-27406.png", "GoldImage": "/27-406-27406.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA09_7_Cauldron_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA09_7_Cauldron_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA09_7_Cauldron_Play.ogg" }, { "Name": "Trigger1", "URL": "/Splash_Impact_Sound.ogg" }] }, { "Name": "Slithering Guard", "RegImage": "/332-871-27407.png", "GoldImage": "/27-407-27407.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA09_8_SlitherpearSiren_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA09_8_SlitherpearSiren_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA09_8_SlitherpearSiren_Play.ogg" }] }, { "Name": "Slithering Guard", "RegImage": "/332-874-27408.png", "GoldImage": "/27-408-27408.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA09_8_SlitherpearSiren_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA09_8_SlitherpearSiren_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA09_8_SlitherpearSiren_Play.ogg" }] }, { "Name": "Naga Repellent", "RegImage": "/332-877-27409.png", "GoldImage": "/27-409-27409.webm", "Sounds": [] }, { "Name": "Naga Repellent", "RegImage": "/332-880-27410.png", "GoldImage": "/27-410-27410.webm", "Sounds": [] }, { "Name": "Giantfin", "RegImage": "/332-883-27411.png", "GoldImage": "/27-411-27411.webm", "Sounds": [] }, { "Name": "Giantfin", "RegImage": "/332-886-27412.png", "GoldImage": "/27-412-27412.webm", "Sounds": [] }, { "Name": "Mrglmrgl MRGL!", "RegImage": "/332-889-27413.png", "GoldImage": "/27-413-27413.webm", "Sounds": [] }, { "Name": "Mrglmrgl MRGL!", "RegImage": "/332-892-27414.png", "GoldImage": "/27-414-27414.webm", "Sounds": [] }, { "Name": "Mrgl Mrgl Nyah Nyah", "RegImage": "/332-898-27415.png", "GoldImage": "/27-415-27415.webm", "Sounds": [] }, { "Name": "Mrgl Mrgl Nyah Nyah", "RegImage": "/332-901-27416.png", "GoldImage": "/27-416-27416.webm", "Sounds": [] }, { "Name": "Lady Naz'jar", "RegImage": "/332-904-27417.png", "GoldImage": "/27-417-27417.webm", "Sounds": [] }, { "Name": "Lady Naz'jar", "RegImage": "/332-907-27418.png", "GoldImage": "/27-418-27418.webm", "Sounds": [] }, { "Name": "Pearl of the Tides", "RegImage": "/332-910-27419.png", "GoldImage": "/27-419-27419.webm", "Sounds": [] }, { "Name": "Pearl of the Tides", "RegImage": "/332-913-27420.png", "GoldImage": "/27-420-27420.webm", "Sounds": [] }, { "Name": "Skelesaurus Hex", "RegImage": "/332-916-27421.png", "GoldImage": "/27-421-27421.webm", "Sounds": [] }, { "Name": "Skelesaurus Hex", "RegImage": "/332-919-27422.png", "GoldImage": "/27-422-27422.webm", "Sounds": [] }, { "Name": "Ancient Power", "RegImage": "/332-922-27423.png", "GoldImage": "/27-423-27423.webm", "Sounds": [] }, { "Name": "Ancient Power", "RegImage": "/332-925-27424.png", "GoldImage": "/27-424-27424.webm", "Sounds": [] }, { "Name": "The Steel Sentinel", "RegImage": "/332-928-27425.png", "GoldImage": "/27-425-27425.webm", "Sounds": [] }, { "Name": "The Steel Sentinel", "RegImage": "/332-931-27426.png", "GoldImage": "/27-426-27426.webm", "Sounds": [] }, { "Name": "Platemail Armor", "RegImage": "/332-934-27427.png", "GoldImage": "/27-427-27427.webm", "Sounds": [] }, { "Name": "Platemail Armor", "RegImage": "/332-937-27428.png", "GoldImage": "/27-428-27428.webm", "Sounds": [] }, { "Name": "Rafaam", "RegImage": "/332-940-27429.png", "GoldImage": "/27-429-27429.webm", "Sounds": [] }, { "Name": "Rafaam", "RegImage": "/332-943-27430.png", "GoldImage": "/27-430-27430.webm", "Sounds": [] }, { "Name": "Unstable Portal", "RegImage": "/332-946-27431.png", "GoldImage": "/27-431-27431.webm", "Sounds": [] }, { "Name": "Unstable Portal", "RegImage": "/332-949-27432.png", "GoldImage": "/27-432-27432.webm", "Sounds": [] }, { "Name": "Boneraptor", "RegImage": "/332-952-27433.png", "GoldImage": "/27-433-27433.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOE_019_UnearthedRaptor_Attack.ogg" }, { "Name": "Death1", "URL": "/LOE_019_UnearthedRaptor_Death.ogg" }, { "Name": "Play1", "URL": "/LOE_019_UnearthedRaptor_Play.ogg" }] }, { "Name": "Boneraptor", "RegImage": "/332-955-27434.png", "GoldImage": "/27-434-27434.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOE_019_UnearthedRaptor_Attack.ogg" }, { "Name": "Death1", "URL": "/LOE_019_UnearthedRaptor_Death.ogg" }, { "Name": "Play1", "URL": "/LOE_019_UnearthedRaptor_Play.ogg" }] }, { "Name": "Rafaam", "RegImage": "/332-958-27435.png", "GoldImage": "/27-435-27435.webm", "Sounds": [] }, { "Name": "Hakkari Blood Goblet", "RegImage": "/332-961-27436.png", "GoldImage": "/27-436-27436.webm", "Sounds": [] }, { "Name": "Crown of Kael'thas", "RegImage": "/332-964-27437.png", "GoldImage": "/27-437-27437.webm", "Sounds": [] }, { "Name": "Medivh's Locket", "RegImage": "/332-967-27438.png", "GoldImage": "/27-438-27438.webm", "Sounds": [] }, { "Name": "Eye of Orsis", "RegImage": "/332-970-27439.png", "GoldImage": "/27-439-27439.webm", "Sounds": [] }, { "Name": "Khadgar's Pipe", "RegImage": "/332-973-27440.png", "GoldImage": "/27-440-27440.webm", "Sounds": [] }, { "Name": "Ysera's Tear", "RegImage": "/332-976-27441.png", "GoldImage": "/27-441-27441.webm", "Sounds": [] }, { "Name": "Rummage", "RegImage": "/332-979-27442.png", "GoldImage": "/27-442-27442.webm", "Sounds": [{ "Name": "Play1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Rummage", "RegImage": "/332-982-27443.png", "GoldImage": "/27-443-27443.webm", "Sounds": [{ "Name": "Play1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Animated Statue", "RegImage": "/332-985-27444.png", "GoldImage": "/27-444-27444.webm", "Sounds": [] }, { "Name": "Zinaar", "RegImage": "/332-988-27445.png", "GoldImage": "/27-445-27445.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_02_RESPONSE.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_053_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_02_START.ogg" }, { "Name": "Trigger1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Zinaar", "RegImage": "/332-991-27446.png", "GoldImage": "/27-446-27446.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_02_RESPONSE.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_053_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_02_START.ogg" }, { "Name": "Trigger1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Sun Raider Phaerix", "RegImage": "/332-994-27447.png", "GoldImage": "/27-447-27447.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_01_RESPONSE.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_01_DEATH_2.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_01_STAFF_2.ogg" }] }, { "Name": "Sun Raider Phaerix", "RegImage": "/332-997-27448.png", "GoldImage": "/27-448-27448.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_01_RESPONSE.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_01_DEATH_2.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_01_STAFF_2.ogg" }] }, { "Name": "Rafaam", "RegImage": "/333-0-27449.png", "GoldImage": "/27-449-27449.webm", "Sounds": [] }, { "Name": "Staff of Origination", "RegImage": "/333-3-27450.png", "GoldImage": "/27-450-27450.webm", "Sounds": [] }, { "Name": "Blessing of the Sun", "RegImage": "/333-6-27451.png", "GoldImage": "/27-451-27451.webm", "Sounds": [] }, { "Name": "Chieftain Scarvash", "RegImage": "/333-9-27454.png", "GoldImage": "/27-454-27454.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_04_RESPONSE.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_04_DEATH.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_04_SCARVASH_TURN_2.ogg" }] }, { "Name": "Chieftain Scarvash", "RegImage": "/333-12-27455.png", "GoldImage": "/27-455-27455.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_04_RESPONSE.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_04_DEATH.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_04_SCARVASH_TURN_2.ogg" }] }, { "Name": "Archaedas", "RegImage": "/333-15-27456.png", "GoldImage": "/27-456-27456.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_08_RESPONSE.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_08_DEATH.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_08_START.ogg" }] }, { "Name": "Archaedas", "RegImage": "/333-18-27457.png", "GoldImage": "/27-457-27457.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_08_RESPONSE.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_08_DEATH.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_08_START.ogg" }] }, { "Name": "Lord Slitherspear", "RegImage": "/333-21-27458.png", "GoldImage": "/27-458-27458.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA09_5_HungryNaga_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_LOEA09_DEATH.ogg" }, { "Name": "Play1", "URL": "/VO_LOEA09_1_RESPONSE.ogg" }] }, { "Name": "Lord Slitherspear", "RegImage": "/333-24-27459.png", "GoldImage": "/27-459-27459.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA09_5_HungryNaga_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_LOEA09_DEATH.ogg" }, { "Name": "Play1", "URL": "/VO_LOEA09_1_RESPONSE.ogg" }] }, { "Name": "Giantfin", "RegImage": "/333-27-27460.png", "GoldImage": "/27-460-27460.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOEA16_24_Giantfin_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_LOEA16_24_Giantfin_Death.ogg" }, { "Name": "Play1", "URL": "/VO_LOEA16_24_Giantfin_Play.ogg" }] }, { "Name": "Giantfin", "RegImage": "/333-30-27461.png", "GoldImage": "/27-461-27461.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOEA16_24_Giantfin_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_LOEA16_24_Giantfin_Death.ogg" }, { "Name": "Play1", "URL": "/VO_LOEA16_24_Giantfin_Play.ogg" }] }, { "Name": "Lady Naz'jar", "RegImage": "/333-33-27462.png", "GoldImage": "/27-462-27462.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_12_RESPONSE.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_12_DEATH.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_12_START.ogg" }] }, { "Name": "Lady Naz'jar", "RegImage": "/333-36-27463.png", "GoldImage": "/27-463-27463.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_12_RESPONSE.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_12_DEATH.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_12_START.ogg" }] }, { "Name": "Skelesaurus Hex", "RegImage": "/333-39-27464.png", "GoldImage": "/27-464-27464.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA16_26_SkelesaurusHex_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA16_26_SkelesaurusHex_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA16_26_SkelesaurusHex_Play.ogg" }] }, { "Name": "Skelesaurus Hex", "RegImage": "/333-42-27465.png", "GoldImage": "/27-465-27465.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA16_26_SkelesaurusHex_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA16_26_SkelesaurusHex_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA16_26_SkelesaurusHex_Play.ogg" }] }, { "Name": "The Steel Sentinel", "RegImage": "/333-45-27466.png", "GoldImage": "/27-466-27466.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA14_1_SteelSentinel_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA14_1_SteelSentinel_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA16_27_SteelSentinel_Start.ogg" }] }, { "Name": "The Steel Sentinel", "RegImage": "/333-48-27467.png", "GoldImage": "/27-467-27467.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA14_1_SteelSentinel_Attack.ogg" }, { "Name": "Death1", "URL": "/LOEA14_1_SteelSentinel_Death.ogg" }, { "Name": "Play1", "URL": "/LOEA16_27_SteelSentinel_Start.ogg" }] }, { "Name": "Staff of Origination", "RegImage": "/333-51-27468.png", "GoldImage": "/27-468-27468.webm", "Sounds": [] }, { "Name": "Mummy Zombie", "RegImage": "/333-63-27473.png", "GoldImage": "/27-473-27473.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOEA16_5t_MummyZombie_Attack_1.ogg" }, { "Name": "Death1", "URL": "/LOEA16_5t_MummyZombie_Death_1.ogg" }, { "Name": "Play1", "URL": "/LOEA16_5t_MummyZombie_Play_1.ogg" }] }, { "Name": "Shard of Sulfuras", "RegImage": "/333-66-27474.png", "GoldImage": "/27-474-27474.webm", "Sounds": [] }, { "Name": "Benediction Splinter", "RegImage": "/333-69-27475.png", "GoldImage": "/27-475-27475.webm", "Sounds": [] }, { "Name": "Putress' Vial", "RegImage": "/333-72-27476.png", "GoldImage": "/27-476-27476.webm", "Sounds": [] }, { "Name": "Lothar's Left Greave", "RegImage": "/333-75-27478.png", "GoldImage": "/27-478-27478.webm", "Sounds": [] }, { "Name": "Looming Presence", "RegImage": "/332-565-27479.png", "GoldImage": "/27-479-27479.webm", "Sounds": [] }, { "Name": "Looming Presence", "RegImage": "/332-568-27480.png", "GoldImage": "/27-480-27480.webm", "Sounds": [] }, { "Name": "Roaring Torch", "RegImage": "/332-391-27481.png", "GoldImage": "/27-481-27481.webm", "Sounds": [] }, { "Name": "Cursed!", "RegImage": "/332-403-27482.png", "GoldImage": "/27-482-27482.webm", "Sounds": [] }, { "Name": "Eye of Hakkar", "RegImage": "/332-406-27483.png", "GoldImage": "/27-483-27483.webm", "Sounds": [] }, { "Name": "Eye of Hakkar", "RegImage": "/332-409-27484.png", "GoldImage": "/27-484-27484.webm", "Sounds": [] }, { "Name": "Scarab", "RegImage": "/332-415-27486.png", "GoldImage": "/27-486-27486.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOE_009t_Scarab_Attack.ogg" }, { "Name": "Death1", "URL": "/LOE_009t_Scarab_Death.ogg" }, { "Name": "Play1", "URL": "/LOE_009t_Scarab_Play.ogg" }] }, { "Name": "Rock", "RegImage": "/332-430-27488.png", "GoldImage": "/27-488-27488.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOE_016t_Rock_Attack.ogg" }, { "Name": "Death1", "URL": "/LOE_016t_Rock_Death.ogg" }, { "Name": "Play1", "URL": "/LOE_016t_Rock_Play.ogg" }] }, { "Name": "Rolling Boulder", "RegImage": "/332-460-27494.png", "GoldImage": "/27-494-27494.webm", "Sounds": [{ "Name": "Attack1", "URL": "/LOE_024t_RollingBoulder_Attack.ogg" }, { "Name": "Death1", "URL": "/LOE_024t_RollingBoulder_Death.ogg" }, { "Name": "Play1", "URL": "/LOE_024t_RollingBoulder_Play.ogg" }, { "Name": "Trigger1", "URL": "/LOE_024t_RollingBoulder_Trigger.ogg" }] }, { "Name": "Rascally Runt", "RegImage": "/332-514-27499.png", "GoldImage": "/27-499-27499.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_089_Attack2_03.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_089_Death2_05_ALT1.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_089_Play2_06.ogg" }] }, { "Name": "Healing Totem", "RegImage": "/333-459-275.png", "GoldImage": "/0-275-275.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_NEW1_009_Attack_00.ogg" }, { "Name": "Death1", "URL": "/NEW1_009_healing_totem_Death.ogg" }, { "Name": "Play1", "URL": "/NEW1_009_healing_totem_EnterPlay.ogg" }] }, { "Name": "Wily Runt", "RegImage": "/332-517-27500.png", "GoldImage": "/27-500-27500.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_089_2_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_089_2_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_089_2_Play_01.ogg" }] }, { "Name": "Grumbly Runt", "RegImage": "/332-520-27501.png", "GoldImage": "/27-501-27501.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_089_3_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_089_3_Death2_05.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_089_3_Play_01.ogg" }] }, { "Name": "Ancient Curse", "RegImage": "/332-538-27503.png", "GoldImage": "/27-503-27503.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/Fiery_Idle_Sound_01.ogg" }, { "Name": "Trigger2", "URL": "/VoidTerror_ConsumeEssence_PreCast_1.ogg" }, { "Name": "Trigger3", "URL": "/Fiery_Idle_Sound_01.ogg" }] }, { "Name": "Raven Idol", "RegImage": "/339-991-27505.png", "GoldImage": "/27-505-27505.webm", "Sounds": [] }, { "Name": "Raven Idol", "RegImage": "/339-994-27506.png", "GoldImage": "/27-506-27506.webm", "Sounds": [] }, { "Name": "Gearmaster Mechazod", "RegImage": "/331-761-27509.png", "GoldImage": "/27-509-27509.webm", "Sounds": [] }, { "Name": "Foam Sword", "RegImage": "/274-992-27515.png", "GoldImage": "/27-515-27515.webm", "Sounds": [] }, { "Name": "Gearmaster Mechazod", "RegImage": "/334-161-27516.png", "GoldImage": "/27-516-27516.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/Shared_Fire_Cast_Large_1.ogg" }] }, { "Name": "Hardpacked Snowballs", "RegImage": "/334-311-27518.png", "GoldImage": "/27-518-27518.webm", "Sounds": [] }, { "Name": "Murloc Bonus", "RegImage": "/334-500-27522.png", "GoldImage": "/27-522-27522.webm", "Sounds": [] }, { "Name": "Dire Fate: Murlocs", "RegImage": "/334-503-27523.png", "GoldImage": "/27-523-27523.webm", "Sounds": [] }, { "Name": "Fate: Confusion", "RegImage": "/334-506-27524.png", "GoldImage": "/27-524-27524.webm", "Sounds": [] }, { "Name": "Dire Fate: Unstable Portals", "RegImage": "/334-524-27529.png", "GoldImage": "/27-529-27529.webm", "Sounds": [] }, { "Name": "Dire Fate: Manaburst", "RegImage": "/334-530-27530.png", "GoldImage": "/27-530-27530.webm", "Sounds": [] }, { "Name": "Fate: Armor", "RegImage": "/334-536-27534.png", "GoldImage": "/27-534-27534.webm", "Sounds": [] }, { "Name": "Cash In", "RegImage": "/334-722-27538.png", "GoldImage": "/27-538-27538.webm", "Sounds": [] }, { "Name": "Blizzard", "RegImage": "/329-931-276.png", "GoldImage": "/0-276-276.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/AE_Frost_Cast_01.ogg" }, { "Name": "Play2", "URL": "/AE_Frost_End_01.ogg" }] }, { "Name": "Gladiator's Longbow", "RegImage": "/330-321-278.png", "GoldImage": "/0-278-278.webm", "Collectible": true, "Sounds": [] }, { "Name": "Scavenging Hyena", "RegImage": "/330-935-279.png", "GoldImage": "/0-279-279.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_531_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_531_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_531_EnterPlay.ogg" }] }, { "Name": "Ice Block", "RegImage": "/330-731-28.png", "GoldImage": "/0-28-28.webm", "Collectible": true, "Sounds": [] }, { "Name": "Azure Drake", "RegImage": "/339-178-280.png", "GoldImage": "/0-280-280.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/WoW_EX1_284_AzureDrake_Attack.ogg" }, { "Name": "Death1", "URL": "/WoW_EX1_284_AzureDrake_Death.ogg" }, { "Name": "Play1", "URL": "/WoW_EX1_284_AzureDrake_EnterPlay.ogg" }] }, { "Name": "Wild Growth", "RegImage": "/329-904-282.png", "GoldImage": "/0-282-282.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Nature_Target_Start_01.ogg" }] }, { "Name": "Guardian of Kings", "RegImage": "/330-66-283.png", "GoldImage": "/0-283-283.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_088_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_088_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_088_Play_01.ogg" }] }, { "Name": "Conceal", "RegImage": "/339-166-284.png", "GoldImage": "/0-284-284.webm", "Collectible": true, "Sounds": [] }, { "Name": "Nozdormu", "RegImage": "/330-989-285.png", "GoldImage": "/0-285-285.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_560_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_560_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_560_Play_01.ogg" }, { "Name": "Play2", "URL": "/Nozdormu_Play_Stinger.ogg" }] }, { "Name": "SI:7 Agent", "RegImage": "/330-552-286.png", "GoldImage": "/0-286-286.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_134_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_134_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_134_Play_01.ogg" }] }, { "Name": "Cat Form", "RegImage": "/339-169-287.png", "GoldImage": "/0-287-287.webm", "Sounds": [] }, { "Name": "Shado-Pan Monk", "RegImage": "/334-815-288.png", "GoldImage": "/0-288-288.webm", "Sounds": [{ "Name": "Death1", "URL": "/VO_TU4f_003_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_TU4f_003_Play_01.ogg" }] }, { "Name": "Bluegill Warrior", "RegImage": "/330-201-289.png", "GoldImage": "/0-289-289.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CS2_173_Bluegill_Warrior_Attack3.ogg" }, { "Name": "Death1", "URL": "/CS2_173_Bluegill_Warrior_Death1.ogg" }, { "Name": "Play1", "URL": "/CS2_173_Bluegill_Warrior_EnterPlay1.ogg" }] }, { "Name": "Blessing of Kings", "RegImage": "/330-75-29.png", "GoldImage": "/0-29-29.webm", "Collectible": true, "Sounds": [] }, { "Name": "Hound", "RegImage": "/330-956-290.png", "GoldImage": "/0-290-290.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_538t_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_538t_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_538t_EnterPlay.ogg" }] }, { "Name": "Truesilver Champion", "RegImage": "/330-84-293.png", "GoldImage": "/0-293-293.webm", "Collectible": true, "Sounds": [] }, { "Name": "Brawl", "RegImage": "/330-893-297.png", "GoldImage": "/0-297-297.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Brawl_Loop_01.ogg" }, { "Name": "Play10", "URL": "/Brawl_End_01.ogg" }, { "Name": "Play11", "URL": "/Brawl_Start_Bell.ogg" }, { "Name": "Play2", "URL": "/Brawl_Loop_01.ogg" }, { "Name": "Play3", "URL": "/Brawl_Rock_Loop_01.ogg" }, { "Name": "Play4", "URL": "/Brawl_Start_01.ogg" }, { "Name": "Play5", "URL": "/Brawl_Start_Bell.ogg" }, { "Name": "Play6", "URL": "/tavern_crowd_play_reaction_very_positive_1.ogg" }, { "Name": "Play7", "URL": "/Brawl_Loop_01.ogg" }, { "Name": "Play8", "URL": "/Brawl_Rock_Loop_01.ogg" }, { "Name": "Play9", "URL": "/tavern_crowd_play_reaction_very_positive_5.ogg" }] }, { "Name": "Stoneclaw Totem", "RegImage": "/329-994-298.png", "GoldImage": "/0-298-298.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_CS2_051_Attack_00.ogg" }, { "Name": "Death1", "URL": "/CS2_051_Death_StoneclawTotem.ogg" }, { "Name": "Play1", "URL": "/CS2_051_Play_StoneclawTotem.ogg" }] }, { "Name": "Transcendence", "RegImage": "/334-824-299.png", "GoldImage": "/0-299-299.webm", "Sounds": [] }, { "Name": "Edwin VanCleef", "RegImage": "/331-109-3.png", "GoldImage": "/0-3-3.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_613_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_613_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_613_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Lesser_Villain.ogg" }] }, { "Name": "Mirror Image", "RegImage": "/329-928-30.png", "GoldImage": "/0-30-30.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/mirror_entity_cast.ogg" }, { "Name": "Play2", "URL": "/mirror_entity_cast.ogg" }] }, { "Name": "Mindgames", "RegImage": "/330-809-301.png", "GoldImage": "/0-301-301.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Shared_Shadow_Start_1.ogg" }] }, { "Name": "Alexstrasza", "RegImage": "/330-992-303.png", "GoldImage": "/0-303-303.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_561_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_561_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_561_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Dragon_Good.ogg" }] }, { "Name": "Bestial Wrath", "RegImage": "/330-968-304.png", "GoldImage": "/0-304-304.webm", "Collectible": true, "Sounds": [] }, { "Name": "Dire Wolf Alpha", "RegImage": "/330-606-305.png", "GoldImage": "/0-305-305.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_162_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_162_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_162_EnterPlay.ogg" }] }, { "Name": "Spellbender", "RegImage": "/334-728-309.png", "GoldImage": "/0-309-309.webm", "Collectible": true, "Sounds": [] }, { "Name": "Chillwind Yeti", "RegImage": "/330-210-31.png", "GoldImage": "/0-31-31.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CS2_182_ChillwindYeti_Attack1.ogg" }, { "Name": "Death1", "URL": "/CS2_182_ChillwindYeti_Death4.ogg" }, { "Name": "Play1", "URL": "/CS2_182_ChillwindYeti_EnterPlay1.ogg" }] }, { "Name": "Stormwind Champion", "RegImage": "/330-246-310.png", "GoldImage": "/0-310-310.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_222_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_222_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_222_Play_01.ogg" }] }, { "Name": "Soul of the Forest", "RegImage": "/330-585-311.png", "GoldImage": "/0-311-311.webm", "Collectible": true, "Sounds": [] }, { "Name": "Corrupted Healbot", "RegImage": "/333-744-31109.png", "GoldImage": "/31-109-31109.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CorruptedHealbot_OG_147_Attack.ogg" }, { "Name": "Attack2", "URL": "/ClunkyMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/CorruptedHealbot_OG_147_Death.ogg" }, { "Name": "Death2", "URL": "/ClunkyMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/CorruptedHealbot_OG_147_Play.ogg" }, { "Name": "Play2", "URL": "/ClunkyMechSmall_Play_Underlay.ogg" }] }, { "Name": "C'Thun", "RegImage": "/333-918-31110.png", "GoldImage": "/31-110-31110.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_280_Male_OldGod_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_280_Male_OldGod_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_280_Male_OldGod_Play_01.ogg" }, { "Name": "Play2", "URL": "/CThun_Play_Stinger.ogg" }] }, { "Name": "Polluted Hoarder", "RegImage": "/334-14-31111.png", "GoldImage": "/31-111-31111.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_323_Male_Gnome_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_323_Male_Gnome_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_323_Male_Gnome_Play_01.ogg" }] }, { "Name": "Twilight Elder", "RegImage": "/333-933-31112.png", "GoldImage": "/31-112-31112.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_286_Male_Gnome_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_286_Male_Gnome_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_286_Male_Gnome_Play_01.ogg" }, { "Name": "Trigger1", "URL": "/VO_OG_286_Male_Gnome_Trigger_01.ogg" }] }, { "Name": "Beckoner of Evil", "RegImage": "/333-921-31114.png", "GoldImage": "/31-114-31114.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_281_Female_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_281_Female_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_281_Female_Human_Play_01.ogg" }] }, { "Name": "Validated Doomsayer", "RegImage": "/333-810-31115.png", "GoldImage": "/31-115-31115.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_200_Male_BloodElf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_200_Male_BloodElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_200_Male_BloodElf_Play_01.ogg" }, { "Name": "Trigger1", "URL": "/VO_OG_200_Male_BloodElf_Trigger_01.ogg" }, { "Name": "Trigger2", "URL": "/Fire_PowerUpMinion_FX_Sound.ogg" }, { "Name": "Trigger3", "URL": "/Fire_PowerUpMinion_FX_Sound.ogg" }] }, { "Name": "Stand Against Darkness", "RegImage": "/333-909-31116.png", "GoldImage": "/31-116-31116.webm", "Collectible": true, "Sounds": [] }, { "Name": "Hogger, Doom of Elwynn", "RegImage": "/333-996-31117.png", "GoldImage": "/31-117-31117.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_318_HoggerDofE_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_318_HoggerDofE_Death.ogg" }, { "Name": "Play1", "URL": "/OG_318_HoggerDofE_Play.ogg" }, { "Name": "Play2", "URL": "/HoggerDoom_Play_Stinger.ogg" }] }, { "Name": "Giant Sand Worm", "RegImage": "/333-963-31118.png", "GoldImage": "/31-118-31118.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_308_GiantSandWorm_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_308_GiantSandWorm_Death.ogg" }, { "Name": "Play1", "URL": "/OG_308_GiantSandWorm_Play.ogg" }] }, { "Name": "Eater of Secrets", "RegImage": "/333-885-31121.png", "GoldImage": "/31-121-31121.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_254_Androgynous _Faceless_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_254_Androgynous _Faceless_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_254_Androgynous _Faceless_Play_01.ogg" }] }, { "Name": "Lady Liadrin", "RegImage": "/331-728-31127.png", "GoldImage": "/31-127-31127.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_13_Attack_32.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_13_Death_33.ogg" }] }, { "Name": "Massive Runeblade", "RegImage": "/334-329-31136.png", "GoldImage": "/31-136-31136.webm", "Sounds": [] }, { "Name": "Anub'Rekhan", "RegImage": "/334-332-31137.png", "GoldImage": "/31-137-31137.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_FP1_026_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_FP1_026_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_FP1_026_EnterPlay.ogg" }] }, { "Name": "Noth the Plaguebringer", "RegImage": "/334-335-31138.png", "GoldImage": "/31-138-31138.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_AT_089_ATTACK_02.ogg" }, { "Name": "Death1", "URL": "/VO_AT_089_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/VO_AT_089_PLAY_01.ogg" }] }, { "Name": "Darkness Calls", "RegImage": "/334-338-31139.png", "GoldImage": "/31-139-31139.webm", "Sounds": [] }, { "Name": "Uncover Staff Piece", "RegImage": "/334-341-31140.png", "GoldImage": "/31-140-31140.webm", "Sounds": [] }, { "Name": "Sapphiron", "RegImage": "/334-344-31142.png", "GoldImage": "/31-142-31142.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_AT_123_Attack_01.ogg" }, { "Name": "Death1", "URL": "/SFX_AT_123_Death_01.ogg" }, { "Name": "Play1", "URL": "/SFX_AT_123_Play_01.ogg" }] }, { "Name": "Patchwerk", "RegImage": "/334-347-31143.png", "GoldImage": "/31-143-31143.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_097_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_097_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_097_Play_01.ogg" }] }, { "Name": "Lady Blaumeux", "RegImage": "/334-350-31144.png", "GoldImage": "/31-144-31144.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_NightElf_Female_A_Attack1.ogg" }, { "Name": "Death1", "URL": "/VOX_NightElf_Female_A_Death1.ogg" }, { "Name": "Play1", "URL": "/VOX_NightElf_Female_A_Play1.ogg" }] }, { "Name": "Sir Zeliek", "RegImage": "/334-353-31145.png", "GoldImage": "/31-145-31145.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_BloodElf_Male_A_Attack1.ogg" }, { "Name": "Death1", "URL": "/VOX_BloodElf_Male_A_Death1.ogg" }, { "Name": "Play1", "URL": "/VOX_BloodElf_Male_A_Play1.ogg" }] }, { "Name": "Gluth", "RegImage": "/334-356-31146.png", "GoldImage": "/31-146-31146.webm", "Sounds": [{ "Name": "Attack1", "URL": "/OG_337_CyclopianHorror_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_337_CyclopianHorror_Death.ogg" }, { "Name": "Play1", "URL": "/OG_337_CyclopianHorror_Play.ogg" }] }, { "Name": "Gothik the Harvester", "RegImage": "/334-359-31147.png", "GoldImage": "/31-147-31147.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_Human_Male_B_Attack2.ogg" }, { "Name": "Death1", "URL": "/VOX_Human_Male_B_Death1.ogg" }, { "Name": "Play1", "URL": "/VOX_Human_Male_B_Play1.ogg" }] }, { "Name": "Spectral Gothik", "RegImage": "/334-362-31148.png", "GoldImage": "/31-148-31148.webm", "Sounds": [{ "Name": "Attack1", "URL": "/EX1_616_Mana_Wraith_Attack2.ogg" }, { "Name": "Death1", "URL": "/EX1_616_Mana_Wraith_Death2.ogg" }, { "Name": "Play1", "URL": "/EX1_616_Mana_Wraith_EnterPlay1.ogg" }] }, { "Name": "Grand Widow Faerlina", "RegImage": "/334-365-31149.png", "GoldImage": "/31-149-31149.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_LOE_116_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_LOE_116_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_LOE_116_Play4_06.ogg" }] }, { "Name": "Grobbulus", "RegImage": "/334-368-31150.png", "GoldImage": "/31-150-31150.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Darkspeaker_OG_102_Attack.ogg" }, { "Name": "Death1", "URL": "/Darkspeaker_OG_102_Death.ogg" }, { "Name": "Play1", "URL": "/Darkspeaker_OG_102_Play.ogg" }] }, { "Name": "Fallout Slime", "RegImage": "/334-371-31151.png", "GoldImage": "/31-151-31151.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_NAX11_03_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_NAX11_03_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_NAX11_03_EnterPlay.ogg" }] }, { "Name": "Heigan the Unclean", "RegImage": "/334-374-31152.png", "GoldImage": "/31-152-31152.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_113_Male_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_113_Male_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_113_Male_Human_Play_01.ogg" }] }, { "Name": "Instructor Razuvious", "RegImage": "/334-377-31153.png", "GoldImage": "/31-153-31153.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_009_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_009_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_009_EnterPlay_01.ogg" }] }, { "Name": "Necromancy", "RegImage": "/340-24-31154.png", "GoldImage": "/31-154-31154.webm", "Sounds": [] }, { "Name": "Staff, First Piece", "RegImage": "/334-389-31155.png", "GoldImage": "/31-155-31155.webm", "Sounds": [] }, { "Name": "Staff, Two Pieces", "RegImage": "/334-392-31156.png", "GoldImage": "/31-156-31156.webm", "Sounds": [] }, { "Name": "Staff of Origination", "RegImage": "/334-395-31157.png", "GoldImage": "/31-157-31157.webm", "Sounds": [] }, { "Name": "Kel'Thuzad", "RegImage": "/334-380-31158.png", "GoldImage": "/31-158-31158.webm", "Sounds": [] }, { "Name": "Rafaam", "RegImage": "/334-383-31159.png", "GoldImage": "/31-159-31159.webm", "Sounds": [] }, { "Name": "City of Stormwind", "RegImage": "/334-542-31160.png", "GoldImage": "/31-160-31160.webm", "Sounds": [] }, { "Name": "Barracks", "RegImage": "/334-545-31161.png", "GoldImage": "/31-161-31161.webm", "Sounds": [] }, { "Name": "Armory", "RegImage": "/334-548-31162.png", "GoldImage": "/31-162-31162.webm", "Sounds": [] }, { "Name": "Shieldsman", "RegImage": "/334-638-31167.png", "GoldImage": "/31-167-31167.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_Human_Male_C_Attack2.ogg" }, { "Name": "Attack2", "URL": "/Shield1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VOX_Human_Male_C_Death3.ogg" }, { "Name": "Death2", "URL": "/Shield1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VOX_Human_Male_C_Play2.ogg" }, { "Name": "Play2", "URL": "/Shield1_Play_Underlay.ogg" }] }, { "Name": "Battle Standard", "RegImage": "/334-641-31169.png", "GoldImage": "/31-169-31169.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Party_Banner_Attack.ogg" }, { "Name": "Death1", "URL": "/Party_Banner_Death.ogg" }, { "Name": "Play1", "URL": "/Party_Banner_Play.ogg" }] }, { "Name": "Swordsman", "RegImage": "/334-644-31171.png", "GoldImage": "/31-171-31171.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_Human_Male_A_Attack2.ogg" }, { "Name": "Attack2", "URL": "/Sword1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VOX_Human_Male_A_Death2.ogg" }, { "Name": "Death2", "URL": "/Sword1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VOX_Human_Male_A_Attack1.ogg" }, { "Name": "Play2", "URL": "/Sword1_Play_Underlay.ogg" }] }, { "Name": "Skeleton", "RegImage": "/80-579-313.png", "Sounds": [] }, { "Name": "Shadow Word: Pain", "RegImage": "/330-264-315.png", "GoldImage": "/0-315-315.webm", "Collectible": true, "Sounds": [] }, { "Name": "Totemic Call", "RegImage": "/329-982-316.png", "GoldImage": "/0-316-316.webm", "Sounds": [{ "Name": "Play1", "URL": "/Shaman_TotemicCall_Cast_1.ogg" }] }, { "Name": "Unleash the Hounds", "RegImage": "/330-953-317.png", "GoldImage": "/0-317-317.webm", "Collectible": true, "Sounds": [] }, { "Name": "Defender", "RegImage": "/330-537-318.png", "GoldImage": "/0-318-318.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_130a_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_130a_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_130a_Play_01.ogg" }] }, { "Name": "Thrall", "RegImage": "/331-713-319.png", "GoldImage": "/0-319-319.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_Hero_02_Attack_16.ogg" }, { "Name": "Death1", "URL": "/VO_Hero_02_Death_17.ogg" }] }, { "Name": "Leokk", "RegImage": "/333-525-32.png", "GoldImage": "/0-32-32.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_NEW1_033_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_NEW1_033_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_NEW1_033_EnterPlay.ogg" }] }, { "Name": "Jaina Proudmoore", "RegImage": "/331-743-320.png", "GoldImage": "/0-320-320.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_08_Attack_71.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_08_Death_72.ogg" }] }, { "Name": "Imp", "RegImage": "/331-79-321.png", "GoldImage": "/0-321-321.webm", "Sounds": [{ "Name": "Attack1", "URL": "/WoW_EX1_598_Imp_Attack.ogg" }, { "Name": "Death1", "URL": "/WoW_EX1_598_Imp_Death.ogg" }, { "Name": "Play1", "URL": "/WoW_EX1_598_Imp_EnterPlay.ogg" }] }, { "Name": "War Golem", "RegImage": "/330-213-323.png", "GoldImage": "/0-323-323.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CS2_186_War_Golem_Attack3.ogg" }, { "Name": "Death1", "URL": "/CS2_186_War_Golem_Death3.ogg" }, { "Name": "Play1", "URL": "/CS2_186_War_Golem_EnterPlay1.ogg" }] }, { "Name": "Southsea Captain", "RegImage": "/333-510-324.png", "GoldImage": "/0-324-324.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_027_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_027_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_027_Play_01.ogg" }] }, { "Name": "Stormpike Commando", "RegImage": "/330-171-325.png", "GoldImage": "/0-325-325.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_150_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_150_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_150_Play_01.ogg" }, { "Name": "Play10", "URL": "/Tutorial_Rifle_Fire_01.ogg" }, { "Name": "Play11", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play2", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play3", "URL": "/FX_FireballEvent04_SpellCancel_01.ogg" }, { "Name": "Play4", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play5", "URL": "/FX_FireballEvent04_SpellImpact_01.ogg" }, { "Name": "Play6", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play7", "URL": "/FX_FireballEvent04_SpellCancel_01.ogg" }, { "Name": "Play8", "URL": "/Tutorial_Rifle_Fire_01.ogg" }, { "Name": "Play9", "URL": "/FX_FireballEvent04_SpellImpact_01.ogg" }] }, { "Name": "Sen'jin Shieldmasta", "RegImage": "/330-204-326.png", "GoldImage": "/0-326-326.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_179_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_179_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_179_Play_01.ogg" }] }, { "Name": "Sense Demons", "RegImage": "/330-773-327.png", "GoldImage": "/0-327-327.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Shared_Shadow_Start_1.ogg" }, { "Name": "Play2", "URL": "/Shared_Shadow_PreCast_2.ogg" }] }, { "Name": "Cruel Taskmaster", "RegImage": "/331-82-328.png", "GoldImage": "/0-328-328.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_603_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_603_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_603_Play_01.ogg" }] }, { "Name": "Savage Roar", "RegImage": "/329-898-329.png", "GoldImage": "/0-329-329.webm", "Collectible": true, "Sounds": [] }, { "Name": "Sylvanas Windrunner", "RegImage": "/339-163-33.png", "GoldImage": "/0-33-33.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_Sylvanas_02_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_Sylvanas_04_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_Sylvanas_01_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Dark2.ogg" }] }, { "Name": "Millhouse Manastorm", "RegImage": "/334-752-330.png", "GoldImage": "/0-330-330.webm", "Sounds": [] }, { "Name": "Klaxxi Amber-Weaver", "RegImage": "/333-792-33121.png", "GoldImage": "/33-121-33121.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_188_Male_Klaxxi_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_OG_188_Male_Klaxxi_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_188_Male_Klaxxi_Play_02.ogg" }] }, { "Name": "Ancient Shieldbearer", "RegImage": "/333-954-33122.png", "GoldImage": "/33-122-33122.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_301_Female_Dwarf_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Shield1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_OG_301_Female_Dwarf_Death_01.ogg" }, { "Name": "Death2", "URL": "/Shield1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_OG_301_Female_Dwarf_Play_01.ogg" }, { "Name": "Play2", "URL": "/Shield1_Play_Underlay.ogg" }, { "Name": "Play3", "URL": "/Generic_Untargeted_Cast_01.ogg" }] }, { "Name": "C'Thun's Chosen", "RegImage": "/333-927-33123.png", "GoldImage": "/33-123-33123.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_283_Female_Undead_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_283_Female_Undead_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_283_Female_Undead_Play_01.ogg" }] }, { "Name": "Forbidden Flame", "RegImage": "/333-666-33124.png", "GoldImage": "/33-124-33124.webm", "Collectible": true, "Sounds": [] }, { "Name": "Forbidden Shaping", "RegImage": "/333-684-33125.png", "GoldImage": "/33-125-33125.webm", "Collectible": true, "Sounds": [] }, { "Name": "Forbidden Healing", "RegImage": "/333-807-33126.png", "GoldImage": "/33-126-33126.webm", "Collectible": true, "Sounds": [] }, { "Name": "Herald Volazj", "RegImage": "/333-990-33127.png", "GoldImage": "/33-127-33127.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_316_Male_Faceless_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_316_Male_Faceless_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_316_Male_Faceless_Play_01.ogg" }, { "Name": "Play2", "URL": "/Volazj_Play_Stinger.ogg" }] }, { "Name": "Infested Tauren", "RegImage": "/333-879-33128.png", "GoldImage": "/33-128-33128.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_249_Male_Tauren_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_249_Male_Tauren_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_249_Male_Tauren_Play_01.ogg" }] }, { "Name": "DOOM!", "RegImage": "/333-864-33129.png", "GoldImage": "/33-129-33129.webm", "Collectible": true, "Sounds": [] }, { "Name": "Tentacle of N'Zoth", "RegImage": "/333-753-33130.png", "GoldImage": "/33-130-33130.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/TentacleOfNZoth_OG_151_Attack.ogg" }, { "Name": "Death1", "URL": "/TentacleOfNZoth_OG_151_Death.ogg" }, { "Name": "Play1", "URL": "/TentacleOfNZoth_OG_151_Play.ogg" }, { "Name": "Trigger1", "URL": "/Warlock_Hellfire_Cast_1.ogg" }] }, { "Name": "Hallazeal the Ascended", "RegImage": "/333-831-33131.png", "GoldImage": "/33-131-33131.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_209_Male_Elemental_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_209_Male_Elemental_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_209_Male_Elemental_Play_01.ogg" }, { "Name": "Play2", "URL": "/Vashjir_Play_Stinger_1.ogg" }] }, { "Name": "N'Zoth's First Mate", "RegImage": "/333-975-33132.png", "GoldImage": "/33-132-33132.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_312_Male_Qiraji_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/SilithidWing_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_OG_312_Male_Qiraji_Death_01.ogg" }, { "Name": "Death2", "URL": "/SilithidWing_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_OG_312_Male_Qiraji_Play_02.ogg" }, { "Name": "Play2", "URL": "/SilithidWing_Play_Underlay.ogg" }] }, { "Name": "Faceless Shambler", "RegImage": "/333-783-33133.png", "GoldImage": "/33-133-33133.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/FacelessShambler_OG_174_Attack.ogg" }, { "Name": "Death1", "URL": "/FacelessShambler_OG_174_Death.ogg" }, { "Name": "Play1", "URL": "/FacelessShambler_OG_174_Play.ogg" }] }, { "Name": "N'Zoth, the Corruptor", "RegImage": "/333-726-33134.png", "GoldImage": "/33-134-33134.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_042_Male_OldGod_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_042_Male_OldGod_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_042_Male_OldGod_Play_01.ogg" }, { "Name": "Play2", "URL": "/NZoth_Play_Stinger.ogg" }] }, { "Name": "Undercity Huckster", "RegImage": "/334-29-33135.png", "GoldImage": "/33-135-33135.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_330_Male_Undead_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_330_Male_Undead_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_330_Male_Undead_Play_01.ogg" }] }, { "Name": "Renounce Darkness", "RegImage": "/333-708-33136.png", "GoldImage": "/33-136-33136.webm", "Collectible": true, "Sounds": [] }, { "Name": "Spawn of N'Zoth", "RegImage": "/333-891-33137.png", "GoldImage": "/33-137-33137.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SpawnOfNZoth_OG_256_Attack.ogg" }, { "Name": "Death1", "URL": "/SpawnOfNZoth_OG_256_Death.ogg" }, { "Name": "Play1", "URL": "/SpawnOfNZoth_OG_256_Play.ogg" }] }, { "Name": "The Boogeymonster", "RegImage": "/333-951-33138.png", "GoldImage": "/33-138-33138.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_300_Male_Monster_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_300_Male_Monster_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_300_Male_Monster_Play_01.ogg" }, { "Name": "Play2", "URL": "/Cursed_Play_Stinger_1.ogg" }] }, { "Name": "Xaril, Poisoned Mind", "RegImage": "/333-636-33139.png", "GoldImage": "/33-139-33139.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_080_Male_Klaxxi_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_080_Male_Klaxxi_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_080_Male_Klaxxi_Play_01.ogg" }, { "Name": "Play2", "URL": "/Klaxxi_Play_Stinger_1.ogg" }, { "Name": "Play3", "URL": "/add_card_to_hand_1.ogg" }, { "Name": "Trigger1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Tentacles for Arms", "RegImage": "/333-579-33140.png", "GoldImage": "/33-140-33140.webm", "Collectible": true, "Sounds": [] }, { "Name": "Infest", "RegImage": "/333-600-33146.png", "GoldImage": "/33-146-33146.webm", "Collectible": true, "Sounds": [] }, { "Name": "Ragnaros, Lightlord", "RegImage": "/333-858-33147.png", "GoldImage": "/33-147-33147.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_229_Male_Demon_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_229_Male_Demon_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_229_Male_Demon_Play_01.ogg" }, { "Name": "Play2", "URL": "/Firelands_Play_Stinger_1.ogg" }, { "Name": "Trigger1", "URL": "/VO_OG_229_Male_Demon_Trigger_01.ogg" }] }, { "Name": "Cult Apothecary", "RegImage": "/333-948-33148.png", "GoldImage": "/33-148-33148.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_295_Male_Worgen_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_295_Male_Worgen_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_295_Male_Worgen_Play_01.ogg" }] }, { "Name": "Mukla, Tyrant of the Vale", "RegImage": "/333-717-33149.png", "GoldImage": "/33-149-33149.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_122_Mukla_TotV_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_122_Mukla_TotV_Death.ogg" }, { "Name": "Play1", "URL": "/OG_122_Mukla_TotV_Play.ogg" }, { "Name": "Play2", "URL": "/MuklaTyrant_Play_Stinger.ogg" }, { "Name": "Play3", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Shadow Word: Horror", "RegImage": "/333-681-33150.png", "GoldImage": "/33-150-33150.webm", "Collectible": true, "Sounds": [] }, { "Name": "Mark of Y'Shaarj", "RegImage": "/333-612-33151.png", "GoldImage": "/33-151-33151.webm", "Collectible": true, "Sounds": [] }, { "Name": "Scaled Nightmare", "RegImage": "/333-900-33152.png", "GoldImage": "/33-152-33152.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_271_ScaledNightmare_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_271_ScaledNightmare_Death.ogg" }, { "Name": "Play1", "URL": "/OG_271_ScaledNightmare_Play.ogg" }, { "Name": "Trigger1", "URL": "/Scaled_PowerUpMinion_FX_Sound.ogg" }, { "Name": "Trigger2", "URL": "/Scaled_PowerUpMinion_FX_Sound.ogg" }] }, { "Name": "Steward of Darkshire", "RegImage": "/333-969-33153.png", "GoldImage": "/33-153-33153.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_310_Female_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_310_Female_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_310_Female_Human_Play_01.ogg" }] }, { "Name": "Skeram Cultist", "RegImage": "/334-44-33154.png", "GoldImage": "/33-154-33154.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_339_Male_Qiraji_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_339_Male_Qiraji_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_339_Male_Qiraji_Play_02.ogg" }] }, { "Name": "Cabalist's Tome", "RegImage": "/333-672-33155.png", "GoldImage": "/33-155-33155.webm", "Collectible": true, "Sounds": [] }, { "Name": "Y'Shaarj, Rage Unbound", "RegImage": "/333-585-33156.png", "GoldImage": "/33-156-33156.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_133_Male_OldGod_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_133_Male_OldGod_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_133_Male_OldGod_Play_01.ogg" }, { "Name": "Play2", "URL": "/YShaarj_Play_Stinger.ogg" }] }, { "Name": "Ancient Harbinger", "RegImage": "/333-936-33157.png", "GoldImage": "/33-157-33157.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_290_Female_Night Elf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_290_Female_Night Elf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_290_Female_Night Elf_Play_01.ogg" }] }, { "Name": "Vilefin Inquisitor", "RegImage": "/333-549-33158.png", "GoldImage": "/33-158-33158.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VilefinInquisitor_OG_006_Attack.ogg" }, { "Name": "Attack2", "URL": "/HolyMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VilefinInquisitor_OG_006_Death.ogg" }, { "Name": "Death2", "URL": "/HolyMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VilefinInquisitor_OG_006_Play.ogg" }, { "Name": "Play2", "URL": "/HolyMagic_Play_Underlay.ogg" }] }, { "Name": "Thing from Below", "RegImage": "/333-570-33159.png", "GoldImage": "/33-159-33159.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ThingFromBelow_OG_028_Attack.ogg" }, { "Name": "Death1", "URL": "/ThingFromBelow_OG_028_Death.ogg" }, { "Name": "Play1", "URL": "/ThingFromBelow_OG_028_Play.ogg" }] }, { "Name": "Master of Evolution", "RegImage": "/334-26-33160.png", "GoldImage": "/33-160-33160.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_328_MasterOfEvolution_Attack.ogg" }, { "Name": "Attack2", "URL": "/ShadowMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/OG_328_MasterOfEvolution_Death.ogg" }, { "Name": "Death2", "URL": "/ShadowMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/OG_328_MasterOfEvolution_Play.ogg" }, { "Name": "Play2", "URL": "/ShadowMagic_Play_Underlay.ogg" }] }, { "Name": "Ravaging Ghoul", "RegImage": "/333-747-33161.png", "GoldImage": "/33-161-33161.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_149_RavagingGhoul_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_149_RavagingGhoul_Death.ogg" }, { "Name": "Play1", "URL": "/OG_149_RavagingGhoul_Play.ogg" }] }, { "Name": "Mire Keeper", "RegImage": "/333-813-33162.png", "GoldImage": "/33-162-33162.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_202_Male_Keeper_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_202_Male_Keeper_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_202_Male_Keeper_Play_01.ogg" }] }, { "Name": "Hammer of Twilight", "RegImage": "/333-573-33163.png", "GoldImage": "/33-163-33163.webm", "Collectible": true, "Sounds": [] }, { "Name": "Blood of The Ancient One", "RegImage": "/333-777-33164.png", "GoldImage": "/33-164-33164.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/BloodOfTheAncientOne_OG_173_Attack.ogg" }, { "Name": "Death1", "URL": "/BloodOfTheAncientOne_OG_173_Death.ogg" }, { "Name": "Play1", "URL": "/BloodOfTheAncientOne_OG_173_Play.ogg" }] }, { "Name": "Blood Warriors", "RegImage": "/333-912-33166.png", "GoldImage": "/33-166-33166.webm", "Collectible": true, "Sounds": [] }, { "Name": "Call of the Wild", "RegImage": "/333-834-33167.png", "GoldImage": "/33-167-33167.webm", "Collectible": true, "Sounds": [] }, { "Name": "Yogg-Saron, Hope's End", "RegImage": "/333-729-33168.png", "GoldImage": "/33-168-33168.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_134_Male_OldGod_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_134_Male_OldGod_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_134_Male_OldGod_Play_01.ogg" }, { "Name": "Play2", "URL": "/YoggSaron_Play_Stinger.ogg" }] }, { "Name": "Spreading Madness", "RegImage": "/333-705-33169.png", "GoldImage": "/33-169-33169.webm", "Collectible": true, "Sounds": [] }, { "Name": "Cho'gall", "RegImage": "/333-714-33170.png", "GoldImage": "/33-170-33170.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_121_Male_Ogre_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_121_Male_Ogre_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_121_Male_Ogre_Play_01.ogg" }, { "Name": "Play2", "URL": "/ChoGall_Play_Stinger.ogg" }] }, { "Name": "Possessed Villager", "RegImage": "/333-867-33171.png", "GoldImage": "/33-171-33171.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_241_Male_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_241_Male_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_241_Male_Human_Play_01.ogg" }] }, { "Name": "Wisps of the Old Gods", "RegImage": "/333-795-33172.png", "GoldImage": "/33-172-33172.webm", "Collectible": true, "Sounds": [] }, { "Name": "Soggoth the Slitherer", "RegImage": "/334-47-33173.png", "GoldImage": "/33-173-33173.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_340_Male_Faceless_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_340_Male_Faceless_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_340_Male_Faceless_Play_01.ogg" }, { "Name": "Play2", "URL": "/Soggoth_Play_Stinger.ogg" }] }, { "Name": "Thistle Tea", "RegImage": "/333-633-33174.png", "GoldImage": "/33-174-33174.webm", "Collectible": true, "Sounds": [] }, { "Name": "Twilight Summoner", "RegImage": "/333-903-33175.png", "GoldImage": "/33-175-33175.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_272_Male_Troll_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Parchment_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_OG_272_Male_Troll_Death_01.ogg" }, { "Name": "Death2", "URL": "/Parchment_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_OG_272_Male_Troll_Play_01.ogg" }, { "Name": "Play2", "URL": "/Parchment_Play_Underlay.ogg" }] }, { "Name": "Embrace the Shadow", "RegImage": "/333-690-33176.png", "GoldImage": "/33-176-33176.webm", "Collectible": true, "Sounds": [] }, { "Name": "Deathwing, Dragonlord", "RegImage": "/333-993-33177.png", "GoldImage": "/33-177-33177.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_317_Male_Dragon_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_317_Male_Dragon_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_317_Male_Dragon_Play_01.ogg" }, { "Name": "Play2", "URL": "/Dragonlord_Play_Stinger.ogg" }, { "Name": "Trigger1", "URL": "/Deathwing_FX_Sound.ogg" }] }, { "Name": "Faceless Summoner", "RegImage": "/333-828-33178.png", "GoldImage": "/33-178-33178.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_207_Androgynous _Faceless_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_207_Androgynous _Faceless_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_207_Androgynous _Faceless_Play_01.ogg" }] }, { "Name": "Servant of Yogg-Saron", "RegImage": "/333-669-33179.png", "GoldImage": "/33-179-33179.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_087_ServantOfYoggSaron_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_087_ServantOfYoggSaron_Death.ogg" }, { "Name": "Play1", "URL": "/OG_087_ServantOfYoggSaron_Play.ogg" }] }, { "Name": "Shadowcaster", "RegImage": "/333-939-33180.png", "GoldImage": "/33-180-33180.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_291_Female_Goblin_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_291_Female_Goblin_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_291_Female_Goblin_Play_01.ogg" }] }, { "Name": "Forlorn Stalker", "RegImage": "/333-942-33181.png", "GoldImage": "/33-181-33181.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_292_Male_Worgen_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_292_Male_Worgen_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_292_Male_Worgen_Play_01.ogg" }] }, { "Name": "Fireblast", "RegImage": "/329-955-33182.png", "GoldImage": "/33-182-33182.webm", "Sounds": [] }, { "Name": "Fireblast Rank 2", "RegImage": "/329-958-33183.png", "GoldImage": "/33-183-33183.webm", "Sounds": [] }, { "Name": "Khadgar", "RegImage": "/331-749-33184.png", "GoldImage": "/33-184-33184.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_08b_Attack_15.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_08b_DEATH_63_ALT.ogg" }] }, { "Name": "Drain Life", "RegImage": "/330-12-332.png", "GoldImage": "/0-332-332.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }, { "Name": "Play2", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }] }, { "Name": "Nightmare", "RegImage": "/330-297-334.png", "GoldImage": "/0-334-334.webm", "Sounds": [] }, { "Name": "Al'Akir the Windlord", "RegImage": "/333-462-335.png", "GoldImage": "/0-335-335.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_010_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_010_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_010_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Elemental_Villain.ogg" }] }, { "Name": "Treant", "RegImage": "/331-177-337.png", "GoldImage": "/0-337-337.webm", "Sounds": [{ "Name": "Attack1", "URL": "/EX1_tk9_Treant_Attack2.ogg" }, { "Name": "Death1", "URL": "/EX1_tk9_Treant_Death2.ogg" }, { "Name": "Play1", "URL": "/EX1_tk9_Treant_EnterPlay1.ogg" }] }, { "Name": "Stranglethorn Tiger", "RegImage": "/330-405-338.png", "GoldImage": "/0-338-338.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_028_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_028_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_028_EnterPlay.ogg" }] }, { "Name": "Millhouse Manastorm", "RegImage": "/333-513-339.png", "GoldImage": "/0-339-339.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_029_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_029_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_029_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Gnome.ogg" }] }, { "Name": "Ancient of Lore", "RegImage": "/333-450-34.png", "GoldImage": "/0-34-34.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/NEW1_008_AncientOfLore_Attack.ogg" }, { "Name": "Death1", "URL": "/NEW1_008_AncientOfLore_Death.ogg" }, { "Name": "Play1", "URL": "/NEW1_008_AncientOfLore_EnterPlay.ogg" }] }, { "Name": "Voidwalker", "RegImage": "/330-24-340.png", "GoldImage": "/0-340-340.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_065_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_065_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_065_Play_01.ogg" }] }, { "Name": "Explosive Trap", "RegImage": "/331-100-344.png", "GoldImage": "/0-344-344.webm", "Collectible": true, "Sounds": [] }, { "Name": "Mortal Strike", "RegImage": "/330-896-345.png", "GoldImage": "/0-345-345.webm", "Collectible": true, "Sounds": [] }, { "Name": "Mogu'shan Warden", "RegImage": "/330-872-346.png", "GoldImage": "/0-346-346.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_396_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_396_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_396_Play_01.ogg" }] }, { "Name": "Sacrificial Pact", "RegImage": "/333-432-348.png", "GoldImage": "/0-348-348.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }, { "Name": "Play2", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }] }, { "Name": "Flames of Azzinoth", "RegImage": "/334-791-349.png", "GoldImage": "/0-349-349.webm", "Sounds": [] }, { "Name": "Hammer of Wrath", "RegImage": "/330-81-350.png", "GoldImage": "/0-350-350.webm", "Collectible": true, "Sounds": [] }, { "Name": "Demented Frostcaller", "RegImage": "/333-663-35184.png", "GoldImage": "/35-184-35184.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_085_Androgynous _Faceless_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/FrostMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_OG_085_Androgynous _Faceless_Death_01.ogg" }, { "Name": "Death2", "URL": "/FrostMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_OG_085_Androgynous _Faceless_Play_02.ogg" }, { "Name": "Play2", "URL": "/FrostMagic_Play_Underlay.ogg" }] }, { "Name": "Shifting Shade", "RegImage": "/334-35-35186.png", "GoldImage": "/35-186-35186.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_335_Male_Shade_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_335_Male_Shade_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_335_Male_Shade_Play_02.ogg" }] }, { "Name": "Twilight Flamecaller", "RegImage": "/333-660-35187.png", "GoldImage": "/35-187-35187.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_083_Male_Human_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Flamecaller_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_OG_083_Male_Human_Death_01.ogg" }, { "Name": "Death2", "URL": "/Flamecaller_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_OG_083_Male_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/Flamecaller_Play_Underlay.ogg" }] }, { "Name": "Princess Huhuran", "RegImage": "/340-21-35188.png", "GoldImage": "/35-188-35188.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_309_Female_Wasp_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/SilithidWing_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_OG_309_Female_Wasp_Death_01.ogg" }, { "Name": "Death2", "URL": "/SilithidWing_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_OG_309_Female_Wasp_Play_01.ogg" }, { "Name": "Play2", "URL": "/AQ_Play_Stinger_3.ogg" }, { "Name": "Play3", "URL": "/SilithidWing_Play_Underlay.ogg" }] }, { "Name": "Dark Arakkoa", "RegImage": "/333-945-35189.png", "GoldImage": "/35-189-35189.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_293_Male_Arakkoa_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_293_Male_Arakkoa_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_293_Male_Arakkoa_Play_01.ogg" }] }, { "Name": "Shifter Zerus", "RegImage": "/333-720-35190.png", "GoldImage": "/35-190-35190.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ShifterZerus_OG_123_Attack.ogg" }, { "Name": "Death1", "URL": "/ShifterZerus_OG_123_Death.ogg" }, { "Name": "Play1", "URL": "/ShifterZerus_OG_123_Play.ogg" }, { "Name": "Play2", "URL": "/Vashjir_Play_Stinger_2.ogg" }] }, { "Name": "Twilight Darkmender", "RegImage": "/333-678-35191.png", "GoldImage": "/35-191-35191.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_096_Female_Night Elf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_096_Female_Night Elf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_096_Female_Night Elf_Play_01.ogg" }] }, { "Name": "Hooded Acolyte", "RegImage": "/334-32-35192.png", "GoldImage": "/35-192-35192.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_334_Female_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_334_Female_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_334_Female_Human_Play_01.ogg" }] }, { "Name": "Power Word: Tentacles", "RegImage": "/333-675-35193.png", "GoldImage": "/35-193-35193.webm", "Collectible": true, "Sounds": [] }, { "Name": "Journey Below", "RegImage": "/333-630-35194.png", "GoldImage": "/35-194-35194.webm", "Collectible": true, "Sounds": [] }, { "Name": "Shadow Strike", "RegImage": "/333-786-35195.png", "GoldImage": "/35-195-35195.webm", "Collectible": true, "Sounds": [] }, { "Name": "Disciple of C'Thun", "RegImage": "/333-774-35196.png", "GoldImage": "/35-196-35196.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_162_Male_Panderan_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_162_Male_Panderan_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_162_Male_Panderan_Play_01.ogg" }] }, { "Name": "Blade of C'Thun", "RegImage": "/333-924-35197.png", "GoldImage": "/35-197-35197.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_282_Male_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_282_Male_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_282_Male_Human_Play_01.ogg" }] }, { "Name": "Bladed Cultist", "RegImage": "/333-627-35198.png", "GoldImage": "/35-198-35198.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_070_Male_Troll_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Daggers_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_OG_070_Male_Troll_Death_01.ogg" }, { "Name": "Death2", "URL": "/Daggers_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_OG_070_Male_Troll_Play_01.ogg" }, { "Name": "Play2", "URL": "/Daggers_Play_Underlay.ogg" }] }, { "Name": "Darkshire Alchemist", "RegImage": "/333-861-35199.png", "GoldImage": "/35-199-35199.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_234_Female_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_234_Female_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_234_Female_Human_Play_01.ogg" }] }, { "Name": "Silithid Swarmer", "RegImage": "/333-582-35200.png", "GoldImage": "/35-200-35200.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_034_SilithidSwarmer_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_034_SilithidSwarmer_Death.ogg" }, { "Name": "Play1", "URL": "/OG_034_SilithidSwarmer_Play.ogg" }] }, { "Name": "Twin Emperor Vek'lor", "RegImage": "/333-723-35201.png", "GoldImage": "/35-201-35201.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_131_Male_Qiraji_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_131_Male_Qiraji_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_131_Male_Qiraji_Play_01.ogg" }, { "Name": "Play2", "URL": "/AQ_Play_Stinger_2.ogg" }] }, { "Name": "Twilight Geomancer", "RegImage": "/333-930-35202.png", "GoldImage": "/35-202-35202.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_284_Female_Orc_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Geomancer_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_OG_284_Female_Orc_Death_01.ogg" }, { "Name": "Death2", "URL": "/Geomancer_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_OG_284_Female_Orc_Play_01.ogg" }, { "Name": "Play2", "URL": "/Geomancer_Play_Underlay.ogg" }] }, { "Name": "Blackwater Pirate", "RegImage": "/334-11-35203.png", "GoldImage": "/35-203-35203.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_322_Female_Goblin_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/Swords1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_OG_322_Female_Goblin_Death_01.ogg" }, { "Name": "Death2", "URL": "/Swords1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_OG_322_Female_Goblin_Play_01.ogg" }, { "Name": "Play2", "URL": "/Swords1_Play_Underlay.ogg" }] }, { "Name": "Bloodsail Cultist", "RegImage": "/333-987-35204.png", "GoldImage": "/35-204-35204.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_315_Female_Gnome_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/ClawNCutlass_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_OG_315_Female_Gnome_Death_01.ogg" }, { "Name": "Death2", "URL": "/ClawNCutlass_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_OG_315_Female_Gnome_Play_01.ogg" }, { "Name": "Play2", "URL": "/ClawNCutlass_Play_Underlay.ogg" }] }, { "Name": "Bloodhoof Brave", "RegImage": "/333-843-35205.png", "GoldImage": "/35-205-35205.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_218_Male_Tauren_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_218_Male_Tauren_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_218_Male_Tauren_Play_01.ogg" }] }, { "Name": "Malkorok", "RegImage": "/333-846-35207.png", "GoldImage": "/35-207-35207.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_220_Male_Orc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_220_Male_Orc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_220_Male_Orc_Play_01.ogg" }, { "Name": "Play2", "URL": "/Malkorok_Play_Stinger.ogg" }] }, { "Name": "Fandral Staghelm", "RegImage": "/339-997-35208.png", "GoldImage": "/35-208-35208.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_044_Male_Night Elf_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_OG_044_Male_Night Elf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_044_Male_Night Elf_Play_02.ogg" }, { "Name": "Play2", "URL": "/VO_OG_044_Male_Night Elf_Tyrande_01.ogg" }, { "Name": "Play3", "URL": "/Staghelm_Play_Stinger.ogg" }] }, { "Name": "Blood To Ichor", "RegImage": "/333-981-35209.png", "GoldImage": "/35-209-35209.webm", "Collectible": true, "Sounds": [] }, { "Name": "Feral Rage", "RegImage": "/333-603-35210.png", "GoldImage": "/35-210-35210.webm", "Collectible": true, "Sounds": [] }, { "Name": "Doomcaller", "RegImage": "/333-888-35211.png", "GoldImage": "/35-211-35211.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_255_Male_Orc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_255_Male_Orc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_255_Male_Orc_Play_01.ogg" }] }, { "Name": "Crazed Worshipper", "RegImage": "/334-8-35212.png", "GoldImage": "/35-212-35212.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_321_Male_Dwarf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_321_Male_Dwarf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_321_Male_Dwarf_Play_01.ogg" }] }, { "Name": "Forbidden Ancient", "RegImage": "/333-615-35213.png", "GoldImage": "/35-213-35213.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ForbiddenAncient_OG_051_Attack.ogg" }, { "Name": "Death1", "URL": "/ForbiddenAncient_OG_051_Death.ogg" }, { "Name": "Play1", "URL": "/ForbiddenAncient_OG_051_Play.ogg" }] }, { "Name": "Fiery Bat", "RegImage": "/333-789-35214.png", "GoldImage": "/35-214-35214.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/FieryBat_OG_179_Attack.ogg" }, { "Name": "Attack2", "URL": "/WingedMount1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/FieryBat_OG_179_Death.ogg" }, { "Name": "Death2", "URL": "/WingedMount1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/FieryBat_OG_179_Play.ogg" }, { "Name": "Play2", "URL": "/WingedMount1_Play_Underlay.ogg" }] }, { "Name": "Infested Wolf", "RegImage": "/333-837-35215.png", "GoldImage": "/35-215-35215.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/InfestedWolf_OG_216_Attack.ogg" }, { "Name": "Death1", "URL": "/InfestedWolf_OG_216_Death.ogg" }, { "Name": "Play1", "URL": "/InfestedWolf_OG_216_Play.ogg" }] }, { "Name": "Psych-o-Tron", "RegImage": "/333-741-35216.png", "GoldImage": "/35-216-35216.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_145_Male_Mech_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/ClunkyMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_OG_145_Male_Mech_Death_01.ogg" }, { "Name": "Death2", "URL": "/ClunkyMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_OG_145_Male_Mech_Play_01.ogg" }, { "Name": "Play2", "URL": "/ClunkyMechSmall_Play_Underlay.ogg" }] }, { "Name": "Forbidden Ritual", "RegImage": "/333-699-35217.png", "GoldImage": "/35-217-35217.webm", "Collectible": true, "Sounds": [] }, { "Name": "Carrion Grub", "RegImage": "/334-17-35218.png", "GoldImage": "/35-218-35218.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_325 CarrionGrub_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_325 CarrionGrub_Death.ogg" }, { "Name": "Play1", "URL": "/OG_325 CarrionGrub_Play.ogg" }] }, { "Name": "Bilefin Tidehunter", "RegImage": "/333-762-35219.png", "GoldImage": "/35-219-35219.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_156_BilefinTidehunter_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_156_BilefinTidehunter_Death.ogg" }, { "Name": "Play1", "URL": "/OG_156_BilefinTidehunter_Play.ogg" }] }, { "Name": "On the Hunt", "RegImage": "/333-621-35220.png", "GoldImage": "/35-220-35220.webm", "Collectible": true, "Sounds": [] }, { "Name": "Darkshire Librarian", "RegImage": "/333-693-35221.png", "GoldImage": "/35-221-35221.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_109_Female_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_109_Female_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_109_Female_Human_Play_01.ogg" }] }, { "Name": "Zealous Initiate", "RegImage": "/333-768-35222.png", "GoldImage": "/35-222-35222.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_158_Male_Faceless_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_158_Male_Faceless_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_158_Male_Faceless_Play_01.ogg" }] }, { "Name": "Twisted Worgen", "RegImage": "/333-873-35223.png", "GoldImage": "/35-223-35223.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_247_Male_Worgen_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_247_Male_Worgen_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_247_Male_Worgen_Play_01.ogg" }] }, { "Name": "Darkshire Councilman", "RegImage": "/340-6-35224.png", "GoldImage": "/35-224-35224.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_113_Male_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_113_Male_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_113_Male_Human_Play_01.ogg" }] }, { "Name": "Cyclopian Horror", "RegImage": "/334-38-35225.png", "GoldImage": "/35-225-35225.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_337_CyclopianHorror_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_337_CyclopianHorror_Death.ogg" }, { "Name": "Play1", "URL": "/OG_337_CyclopianHorror_Play.ogg" }] }, { "Name": "Flamewreathed Faceless", "RegImage": "/333-561-35226.png", "GoldImage": "/35-226-35226.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_024_Male_Faceless_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Flamecaller_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_OG_024_Male_Faceless_Death_01.ogg" }, { "Name": "Death2", "URL": "/Flamecaller_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_OG_024_Male_Faceless_Play_01.ogg" }, { "Name": "Play2", "URL": "/Flamecaller_Play_Underlay.ogg" }] }, { "Name": "Stormcrack", "RegImage": "/333-825-35227.png", "GoldImage": "/35-227-35227.webm", "Collectible": true, "Sounds": [] }, { "Name": "Corrupted Seer", "RegImage": "/333-771-35228.png", "GoldImage": "/35-228-35228.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_161_CorruptedSeer_Attack.ogg" }, { "Name": "Attack2", "URL": "/ShadowMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/OG_161_CorruptedSeer_Death.ogg" }, { "Name": "Death2", "URL": "/ShadowMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/OG_161_CorruptedSeer_Play.ogg" }, { "Name": "Play2", "URL": "/ShadowMagic_Play_Underlay.ogg" }] }, { "Name": "Darkspeaker", "RegImage": "/333-687-35229.png", "GoldImage": "/35-229-35229.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/Darkspeaker_OG_102_Attack.ogg" }, { "Name": "Death1", "URL": "/Darkspeaker_OG_102_Death.ogg" }, { "Name": "Play1", "URL": "/Darkspeaker_OG_102_Play.ogg" }] }, { "Name": "Anomalus", "RegImage": "/333-711-35230.png", "GoldImage": "/35-230-35230.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_120_Male_Elemental_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_120_Male_Elemental_Death_02.ogg" }, { "Name": "Death2", "URL": "/VO_OG_120_Male_Elemental_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_120_Male_Elemental_Play_01.ogg" }, { "Name": "Play2", "URL": "/BoreanTundra_Play_Stinger_2.ogg" }] }, { "Name": "Eternal Sentinel", "RegImage": "/333-564-35231.png", "GoldImage": "/35-231-35231.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_026_Male_Qiraji_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_026_Male_Qiraji_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_026_Male_Qiraji_Play_01.ogg" }] }, { "Name": "Evolve", "RegImage": "/333-567-35232.png", "GoldImage": "/35-232-35232.webm", "Collectible": true, "Sounds": [] }, { "Name": "Nerubian Prophet", "RegImage": "/333-732-35233.png", "GoldImage": "/35-233-35233.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_138_NerubianProphet_Attack.ogg" }, { "Name": "Attack2", "URL": "/ShadowMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/OG_138_NerubianProphet_Death.ogg" }, { "Name": "Death2", "URL": "/ShadowMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/OG_138_NerubianProphet_Play.ogg" }, { "Name": "Play2", "URL": "/ShadowMagic_Play_Underlay.ogg" }] }, { "Name": "Primal Fusion", "RegImage": "/333-558-35234.png", "GoldImage": "/35-234-35234.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Shared_Rage_InnerRage_Impact_1.ogg" }, { "Name": "Play2", "URL": "/Lightning_Idle_03_Sound_01.ogg" }, { "Name": "Play3", "URL": "/Shared_Rage_InnerRage_Impact_1.ogg" }, { "Name": "Play4", "URL": "/Lightning_Idle_03_Sound_01.ogg" }] }, { "Name": "Addled Grizzly", "RegImage": "/333-978-35235.png", "GoldImage": "/35-235-35235.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_313_Female_Bear_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_313_Female_Bear_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_313_Female_Bear_Play_01.ogg" }] }, { "Name": "Aberrant Berserker", "RegImage": "/333-750-35236.png", "GoldImage": "/35-236-35236.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_150_Male_Troll_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_150_Male_Troll_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_150_Male_Troll_Play_01.ogg" }] }, { "Name": "A Light in the Darkness", "RegImage": "/333-972-35237.png", "GoldImage": "/35-237-35237.webm", "Collectible": true, "Sounds": [] }, { "Name": "Am'gam Rager", "RegImage": "/333-876-35238.png", "GoldImage": "/35-238-35238.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_248_AmgamRager_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_248_AmgamRager_Death.ogg" }, { "Name": "Play1", "URL": "/OG_248_AmgamRager_Play.ogg" }] }, { "Name": "Cult Sorcerer", "RegImage": "/333-960-35239.png", "GoldImage": "/35-239-35239.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_303_Female_Human_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/ArcaneMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_OG_303_Female_Human_Death_01.ogg" }, { "Name": "Death2", "URL": "/ArcaneMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_OG_303_Female_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/ArcaneMagic_Play_Underlay.ogg" }] }, { "Name": "Bog Creeper", "RegImage": "/333-759-35240.png", "GoldImage": "/35-240-35240.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/BogCreeper_OG_153_Attack.ogg" }, { "Name": "Death1", "URL": "/BogCreeper_OG_153_Death.ogg" }, { "Name": "Play1", "URL": "/BogCreeper_OG_153_Play.ogg" }] }, { "Name": "Southsea Squidface", "RegImage": "/333-894-35241.png", "GoldImage": "/35-241-35241.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_267_Female_Faceless_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_267_Female_Faceless_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_267_Female_Faceless_Play_01.ogg" }] }, { "Name": "Usher of Souls", "RegImage": "/333-957-35242.png", "GoldImage": "/35-242-35242.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_302_Female_Gnome_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_302_Female_Gnome_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_302_Female_Gnome_Play_01.ogg" }] }, { "Name": "Squirming Tentacle", "RegImage": "/334-23-35243.png", "GoldImage": "/35-243-35243.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SquirmingTentacle_OG_327_Attack.ogg" }, { "Name": "Death1", "URL": "/SquirmingTentacle_OG_327_Death.ogg" }, { "Name": "Play1", "URL": "/SquirmingTentacle_OG_327_Play.ogg" }] }, { "Name": "Shatter", "RegImage": "/333-654-35244.png", "GoldImage": "/35-244-35244.webm", "Collectible": true, "Sounds": [] }, { "Name": "Selfless Hero", "RegImage": "/333-849-35245.png", "GoldImage": "/35-245-35245.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_221_Female_Draenai_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_221_Female_Draenai_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_221_Female_Draenai_Play_01.ogg" }] }, { "Name": "Rallying Blade", "RegImage": "/333-852-35246.png", "GoldImage": "/35-246-35246.webm", "Collectible": true, "Sounds": [] }, { "Name": "Midnight Drake", "RegImage": "/334-5-35247.png", "GoldImage": "/35-247-35247.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_320_MidnightDrake_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_320_MidnightDrake_Death.ogg" }, { "Name": "Play1", "URL": "/OG_320_MidnightDrake_Play.ogg" }] }, { "Name": "Nat, the Darkfisher", "RegImage": "/334-41-35248.png", "GoldImage": "/35-248-35248.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_338_Male_Human_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/AquaticDark_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_OG_338_Male_Human_Death_01.ogg" }, { "Name": "Death2", "URL": "/AquaticDark_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_OG_338_Male_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/Marsh_Play_Stinger_1.ogg" }, { "Name": "Play3", "URL": "/AquaticDark_Play_Underlay.ogg" }] }, { "Name": "Faceless Behemoth", "RegImage": "/333-735-35249.png", "GoldImage": "/35-249-35249.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_141_Androgynous _Faceless_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_141_Androgynous _Faceless_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_141_Androgynous _Faceless_Play_01.ogg" }] }, { "Name": "Grotesque Dragonhawk", "RegImage": "/333-756-35250.png", "GoldImage": "/35-250-35250.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/OG_152_GrotesqueDragonhawk_Attack.ogg" }, { "Name": "Attack2", "URL": "/WingedMount1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/OG_152_GrotesqueDragonhawk_Death.ogg" }, { "Name": "Death2", "URL": "/WingedMount1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/OG_152_GrotesqueDragonhawk_Play.ogg" }, { "Name": "Play2", "URL": "/WingedMount1_Play_Underlay.ogg" }] }, { "Name": "Duskboar", "RegImage": "/334-20-35251.png", "GoldImage": "/35-251-35251.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/Duskboar_OG_326_Attack.ogg" }, { "Name": "Death1", "URL": "/Duskboar_OG_326_Death.ogg" }, { "Name": "Play1", "URL": "/Duskboar_OG_326_Play.ogg" }] }, { "Name": "Divine Strength", "RegImage": "/333-855-35252.png", "GoldImage": "/35-252-35252.webm", "Collectible": true, "Sounds": [] }, { "Name": "Eldritch Horror", "RegImage": "/333-738-35253.png", "GoldImage": "/35-253-35253.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_142_Male_Faceless_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_142_Male_Faceless_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_142_Male_Faceless_Play_01.ogg" }] }, { "Name": "Evolved Kobold", "RegImage": "/333-657-35254.png", "GoldImage": "/35-254-35254.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_082_Male_Kobold_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_082_Male_Kobold_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_082_Male_Kobold_Play_01.ogg" }] }, { "Name": "Druid of the Claw", "RegImage": "/333-591-35256.png", "GoldImage": "/35-256-35256.webm", "Sounds": [{ "Name": "Attack1", "URL": "/DruidOfTheClaw_OG_044a_Attack.ogg" }, { "Name": "Death1", "URL": "/DruidOfTheClaw_OG_044a_Death.ogg" }, { "Name": "Play1", "URL": "/DruidOfTheClaw_OG_044a_Play.ogg" }] }, { "Name": "The Silver Hand", "RegImage": "/330-93-35257.png", "GoldImage": "/35-257-35257.webm", "Sounds": [] }, { "Name": "Second Class: Druid", "RegImage": "/334-131-35258.png", "GoldImage": "/35-258-35258.webm", "Sounds": [] }, { "Name": "Second Class: Hunter", "RegImage": "/334-134-35259.png", "GoldImage": "/35-259-35259.webm", "Sounds": [] }, { "Name": "Second Class: Mage", "RegImage": "/334-137-35260.png", "GoldImage": "/35-260-35260.webm", "Sounds": [] }, { "Name": "Second Class: Paladin", "RegImage": "/334-140-35261.png", "GoldImage": "/35-261-35261.webm", "Sounds": [] }, { "Name": "Second Class: Priest", "RegImage": "/334-143-35263.png", "GoldImage": "/35-263-35263.webm", "Sounds": [] }, { "Name": "Second Class: Rogue", "RegImage": "/334-146-35264.png", "GoldImage": "/35-264-35264.webm", "Sounds": [] }, { "Name": "Second Class: Shaman", "RegImage": "/334-149-35265.png", "GoldImage": "/35-265-35265.webm", "Sounds": [] }, { "Name": "Second Class: Warlock", "RegImage": "/334-152-35266.png", "GoldImage": "/35-266-35266.webm", "Sounds": [] }, { "Name": "Second Class: Warrior", "RegImage": "/334-155-35267.png", "GoldImage": "/35-267-35267.webm", "Sounds": [] }, { "Name": "Offensive Play", "RegImage": "/334-674-35271.png", "GoldImage": "/35-271-35271.webm", "Sounds": [] }, { "Name": "Silver Hand Murloc", "RegImage": "/333-552-35275.png", "GoldImage": "/35-275-35275.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SilverHandMurloc_OG_006a_Attack.ogg" }, { "Name": "Death1", "URL": "/SilverHandMurloc_OG_006a_Death.ogg" }, { "Name": "Play1", "URL": "/SilverHandMurloc_OG_006a_Play.ogg" }] }, { "Name": "The Tidal Hand", "RegImage": "/333-555-35276.png", "GoldImage": "/35-276-35276.webm", "Sounds": [] }, { "Name": "Twilight Elemental", "RegImage": "/333-576-35278.png", "GoldImage": "/35-278-35278.webm", "Sounds": [{ "Name": "Attack1", "URL": "/TwilightElemental_OG_031a_Attack.ogg" }, { "Name": "Death1", "URL": "/TwilightElemental_OG_031a_Death.ogg" }, { "Name": "Play1", "URL": "/TwilightElemental_OG_031a_Play.ogg" }] }, { "Name": "Evolve Spines", "RegImage": "/340-0-35280.png", "GoldImage": "/35-280-35280.webm", "Sounds": [] }, { "Name": "Evolve Scales", "RegImage": "/340-3-35281.png", "GoldImage": "/35-281-35281.webm", "Sounds": [] }, { "Name": "Rusty Hook", "RegImage": "/333-618-35285.png", "GoldImage": "/35-285-35285.webm", "Sounds": [] }, { "Name": "Mastiff", "RegImage": "/333-624-35286.png", "GoldImage": "/35-286-35286.webm", "Sounds": [{ "Name": "Attack1", "URL": "/OG_061t_Mastiff_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_061t_Mastiff_Death.ogg" }, { "Name": "Play1", "URL": "/OG_061t_Mastiff_Play.ogg" }] }, { "Name": "Kingsblood Toxin", "RegImage": "/333-639-35289.png", "GoldImage": "/35-289-35289.webm", "Sounds": [] }, { "Name": "Bloodthistle Toxin", "RegImage": "/333-642-35290.png", "GoldImage": "/35-290-35290.webm", "Sounds": [] }, { "Name": "Briarthorn Toxin", "RegImage": "/333-645-35291.png", "GoldImage": "/35-291-35291.webm", "Sounds": [] }, { "Name": "Fadeleaf Toxin", "RegImage": "/333-648-35293.png", "GoldImage": "/35-293-35293.webm", "Sounds": [] }, { "Name": "Firebloom Toxin", "RegImage": "/333-651-35295.png", "GoldImage": "/35-295-35295.webm", "Sounds": [] }, { "Name": "Icky Tentacle", "RegImage": "/333-702-35300.png", "GoldImage": "/35-300-35300.webm", "Sounds": [{ "Name": "Attack1", "URL": "/IckyTentacle_OG_114a_Attack.ogg" }, { "Name": "Attack2", "URL": "/FloatingWatcher_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/IckyTentacle_OG_114a_Death.ogg" }, { "Name": "Death2", "URL": "/FloatingWatcher_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/IckyTentacle_OG_114a_Play.ogg" }, { "Name": "Play2", "URL": "/FloatingWatcher_Trigger_Underlay.ogg" }] }, { "Name": "Ooze", "RegImage": "/333-765-35308.png", "GoldImage": "/35-308-35308.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Slime_OG_156a_Attack.ogg" }, { "Name": "Death1", "URL": "/Slime_OG_156a_Death.ogg" }, { "Name": "Play1", "URL": "/Slime_OG_156a_Play.ogg" }] }, { "Name": "The Ancient One", "RegImage": "/333-780-35310.png", "GoldImage": "/35-310-35310.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_173a_Androgynous _Monster_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_173a_Androgynous _Monster_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_173a_Androgynous _Monster_Play_01.ogg" }] }, { "Name": "Many Wisps", "RegImage": "/340-9-35313.png", "GoldImage": "/35-313-35313.webm", "Sounds": [] }, { "Name": "Big Wisps", "RegImage": "/340-12-35314.png", "GoldImage": "/35-314-35314.webm", "Sounds": [] }, { "Name": "Wisp", "RegImage": "/333-804-35315.png", "GoldImage": "/35-315-35315.webm", "Sounds": [{ "Name": "Attack1", "URL": "/OG_195c_EvilWisp_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_195c_EvilWisp_Death.ogg" }, { "Name": "Play1", "URL": "/OG_195c_EvilWisp_Play.ogg" }] }, { "Name": "Y'Shaarj's Strength", "RegImage": "/340-15-35318.png", "GoldImage": "/35-318-35318.webm", "Sounds": [] }, { "Name": "Yogg-Saron's Magic", "RegImage": "/340-18-35320.png", "GoldImage": "/35-320-35320.webm", "Sounds": [] }, { "Name": "Slime", "RegImage": "/333-822-35321.png", "GoldImage": "/35-321-35321.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Slime_OG_202c_Attack.ogg" }, { "Name": "Death1", "URL": "/Slime_OG_202c_Death.ogg" }, { "Name": "Play1", "URL": "/Slime_OG_202c_Play.ogg" }] }, { "Name": "Spider", "RegImage": "/333-840-35322.png", "GoldImage": "/35-322-35322.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Spider_OG_216a_Attack.ogg" }, { "Name": "Death1", "URL": "/Spider_OG_216a_Death.ogg" }, { "Name": "Play1", "URL": "/Spider_OG_216a_Play.ogg" }] }, { "Name": "Shadowbeast", "RegImage": "/333-870-35326.png", "GoldImage": "/35-326-35326.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Shadowbeast_OG_241a_Attack.ogg" }, { "Name": "Death1", "URL": "/Shadowbeast_OG_241a_Death.ogg" }, { "Name": "Play1", "URL": "/Shadowbeast_OG_241a_Play.ogg" }] }, { "Name": "Slime", "RegImage": "/333-882-35327.png", "GoldImage": "/35-327-35327.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Slime_OG_249a_Attack.ogg" }, { "Name": "Death1", "URL": "/Slime_OG_249a_Death.ogg" }, { "Name": "Play1", "URL": "/Slime_OG_249a_Play.ogg" }] }, { "Name": "Nerubian Soldier", "RegImage": "/333-897-35331.png", "GoldImage": "/35-331-35331.webm", "Sounds": [] }, { "Name": "Faceless Destroyer", "RegImage": "/333-906-35333.png", "GoldImage": "/35-333-35333.webm", "Sounds": [{ "Name": "Attack1", "URL": "/FacelessDestroyer_OG_272t_Attack.ogg" }, { "Name": "Death1", "URL": "/FacelessDestroyer_OG_272t_Death.ogg" }, { "Name": "Play1", "URL": "/FacelessDestroyer_OG_272t_Play.ogg" }] }, { "Name": "C'Thun", "RegImage": "/333-915-35334.png", "GoldImage": "/35-334-35334.webm", "Sounds": [] }, { "Name": "Slime", "RegImage": "/333-984-35350.png", "GoldImage": "/35-350-35350.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Slime_OG_314b_Attack.ogg" }, { "Name": "Death1", "URL": "/Slime_OG_314b_Death.ogg" }, { "Name": "Play1", "URL": "/Slime_OG_314b_Play.ogg" }] }, { "Name": "Gnoll", "RegImage": "/333-999-35353.png", "GoldImage": "/35-353-35353.webm", "Sounds": [{ "Name": "Attack1", "URL": "/OG_318t_InfestedGnoll_Attack.ogg" }, { "Name": "Death1", "URL": "/OG_318t_InfestedGnoll_Death.ogg" }, { "Name": "Play1", "URL": "/OG_318t_InfestedGnoll_Play.ogg" }] }, { "Name": "Twin Emperor Vek'nilash", "RegImage": "/334-2-35354.png", "GoldImage": "/35-354-35354.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_OG_319_Male_Giant_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_OG_319_Male_Giant_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_OG_319_Male_Giant_Play_01.ogg" }, { "Name": "Play2", "URL": "/AQ_Play_Stinger_1.ogg" }] }, { "Name": "Druid of the Flame", "RegImage": "/333-594-35365.png", "GoldImage": "/35-365-35365.webm", "Sounds": [{ "Name": "Attack1", "URL": "/DruidOfTheFlame_OG_44b_Attack.ogg" }, { "Name": "Death1", "URL": "/DruidOfTheFlame_OG_44b_Death.ogg" }, { "Name": "Play1", "URL": "/DruidOfTheFlame_OG_44b_Play.ogg" }] }, { "Name": "Sabertooth Tiger", "RegImage": "/333-597-35366.png", "GoldImage": "/35-366-35366.webm", "Sounds": [{ "Name": "Attack1", "URL": "/TigerForm_OG_044c_Attack.ogg" }, { "Name": "Death1", "URL": "/TigerForm_OG_044c_Death.ogg" }, { "Name": "Play1", "URL": "/TigerForm_OG_044c_Play.ogg" }] }, { "Name": "Totemic Call", "RegImage": "/329-985-35367.png", "GoldImage": "/35-367-35367.webm", "Sounds": [{ "Name": "Play1", "URL": "/Shaman_TotemicCall_Cast_1.ogg" }] }, { "Name": "Totemic Slam", "RegImage": "/329-988-35368.png", "GoldImage": "/35-368-35368.webm", "Sounds": [] }, { "Name": "Morgl the Oracle", "RegImage": "/331-716-35369.png", "GoldImage": "/35-369-35369.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_15_Attack_36.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_15_Death_37.ogg" }] }, { "Name": "Glorious Finale", "RegImage": "/334-185-35370.png", "GoldImage": "/35-370-35370.webm", "Sounds": [] }, { "Name": "Twisted Light", "RegImage": "/334-188-35371.png", "GoldImage": "/35-371-35371.webm", "Sounds": [] }, { "Name": "Bamboozle", "RegImage": "/334-191-35372.png", "GoldImage": "/35-372-35372.webm", "Sounds": [] }, { "Name": "Cleave", "RegImage": "/334-194-35373.png", "GoldImage": "/35-373-35373.webm", "Sounds": [] }, { "Name": "Cleave", "RegImage": "/334-197-35374.png", "GoldImage": "/35-374-35374.webm", "Sounds": [] }, { "Name": "Elemental Eruption", "RegImage": "/334-200-35375.png", "GoldImage": "/35-375-35375.webm", "Sounds": [] }, { "Name": "Flame Missiles", "RegImage": "/334-203-35376.png", "GoldImage": "/35-376-35376.webm", "Sounds": [] }, { "Name": "Flame Missiles", "RegImage": "/334-206-35377.png", "GoldImage": "/35-377-35377.webm", "Sounds": [] }, { "Name": "Explosive Rune", "RegImage": "/334-209-35378.png", "GoldImage": "/35-378-35378.webm", "Sounds": [] }, { "Name": "Explosive Rune", "RegImage": "/334-212-35380.png", "GoldImage": "/35-380-35380.webm", "Sounds": [] }, { "Name": "Explosive Runes", "RegImage": "/334-215-35381.png", "GoldImage": "/35-381-35381.webm", "Sounds": [] }, { "Name": "Don't Push Me!", "RegImage": "/334-218-35382.png", "GoldImage": "/35-382-35382.webm", "Sounds": [] }, { "Name": "Immolate", "RegImage": "/334-221-35383.png", "GoldImage": "/35-383-35383.webm", "Sounds": [] }, { "Name": "Immolate", "RegImage": "/334-224-35384.png", "GoldImage": "/35-384-35384.webm", "Sounds": [] }, { "Name": "Dragonscale Warrior", "RegImage": "/334-227-35385.png", "GoldImage": "/35-385-35385.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_Orc_Female_A_Attack2.ogg" }, { "Name": "Death1", "URL": "/VOX_Orc_Female_A_Death2.ogg" }, { "Name": "Play1", "URL": "/VOX_Orc_Female_A_Play2.ogg" }] }, { "Name": "Freewheeling Skulker", "RegImage": "/334-230-35386.png", "GoldImage": "/35-386-35386.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_Gnome_Male_A_Attack2.ogg" }, { "Name": "Death1", "URL": "/VOX_Gnome_Male_A_Death2.ogg" }, { "Name": "Play1", "URL": "/VOX_Gnome_Male_A_Play2.ogg" }] }, { "Name": "Shadow or Light?", "RegImage": "/334-233-35388.png", "GoldImage": "/35-388-35388.webm", "Sounds": [] }, { "Name": "Secrets of Shadow", "RegImage": "/334-236-35389.png", "GoldImage": "/35-389-35389.webm", "Sounds": [] }, { "Name": "Alms of Light", "RegImage": "/334-239-35390.png", "GoldImage": "/35-390-35390.webm", "Sounds": [] }, { "Name": "Intrepid Dragonstalker", "RegImage": "/334-242-35391.png", "GoldImage": "/35-391-35391.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_NightElf_Female_A_Attack1.ogg" }, { "Name": "Death1", "URL": "/VOX_NightElf_Female_A_Death1.ogg" }, { "Name": "Play1", "URL": "/VOX_NightElf_Female_A_Play1.ogg" }] }, { "Name": "Main Tank", "RegImage": "/334-245-35392.png", "GoldImage": "/35-392-35392.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_Human_Male_B_Play1.ogg" }, { "Name": "Death1", "URL": "/VOX_Human_Male_B_Death1.ogg" }, { "Name": "Play1", "URL": "/VOX_Human_Male_B_Play2.ogg" }] }, { "Name": "Raid Healer", "RegImage": "/334-251-35394.png", "GoldImage": "/35-394-35394.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_Human_Female_A_Attack1.ogg" }, { "Name": "Death1", "URL": "/VOX_Human_Female_A_Death1.ogg" }, { "Name": "Play1", "URL": "/VOX_Human_Female_A_Play2.ogg" }] }, { "Name": "Nefarian", "RegImage": "/334-266-35395.png", "GoldImage": "/35-395-35395.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/Shadowy_Deck_AE_Sound.ogg" }, { "Name": "Trigger2", "URL": "/Pinata_SwitchesSide.ogg" }, { "Name": "Trigger3", "URL": "/Shadowy_Deck_AE_Sound.ogg" }] }, { "Name": "Devilsaur", "RegImage": "/331-165-354.png", "GoldImage": "/0-354-354.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_tk29_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_tk29_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_tk29_EnterPlay.ogg" }] }, { "Name": "Holy Wrath", "RegImage": "/330-836-355.png", "GoldImage": "/0-355-355.webm", "Collectible": true, "Sounds": [] }, { "Name": "Elven Archer", "RegImage": "/330-222-356.png", "GoldImage": "/0-356-356.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_189_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_189_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_189_Play_01.ogg" }] }, { "Name": "Murloc Tidehunter", "RegImage": "/330-917-357.png", "GoldImage": "/0-357-357.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_506_Murloc_Scout_Attack2.ogg" }, { "Name": "Death1", "URL": "/EX1_506_Murloc_Scout_Death2.ogg" }, { "Name": "Play1", "URL": "/EX1_506_Murloc_Scout_EnterPlay1.ogg" }] }, { "Name": "Demigod's Favor", "RegImage": "/331-22-358.png", "GoldImage": "/0-358-358.webm", "Sounds": [] }, { "Name": "Baine Bloodhoof", "RegImage": "/330-510-359.png", "GoldImage": "/0-359-359.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_110t_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_110t_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_110t_Play_01.ogg" }] }, { "Name": "Dread Infernal", "RegImage": "/330-21-36.png", "GoldImage": "/0-36-36.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_CS2_064_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_CS2_064_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_CS2_064_EnterPlay.ogg" }] }, { "Name": "Twilight Drake", "RegImage": "/330-417-360.png", "GoldImage": "/0-360-360.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/WoW_EX1_043_TwilightDrake_Attack.ogg" }, { "Name": "Death1", "URL": "/WoW_EX1_043_TwilightDrake_Death.ogg" }, { "Name": "Play1", "URL": "/WoW_EX1_043_TwilightDrake_EnterPlay.ogg" }] }, { "Name": "Magma Rager", "RegImage": "/330-132-362.png", "GoldImage": "/0-362-362.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_CS2_118_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_CS2_118_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_CS2_118_EnterPlay.ogg" }] }, { "Name": "Eaglehorn Bow", "RegImage": "/330-947-363.png", "GoldImage": "/0-363-363.webm", "Collectible": true, "Sounds": [] }, { "Name": "Preparation", "RegImage": "/330-564-364.png", "GoldImage": "/0-364-364.webm", "Collectible": true, "Sounds": [] }, { "Name": "Wrath of Air Totem", "RegImage": "/329-997-365.png", "GoldImage": "/0-365-365.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_CS2_052_Attack_00.ogg" }, { "Name": "Death1", "URL": "/CS2_052_Death_WrathofAirTotem.ogg" }, { "Name": "Play1", "URL": "/CS2_052_Play_WrathofAirTotem.ogg" }] }, { "Name": "Inner Rage", "RegImage": "/331-91-366.png", "GoldImage": "/0-366-366.webm", "Collectible": true, "Sounds": [] }, { "Name": "Totemic Might", "RegImage": "/330-671-367.png", "GoldImage": "/0-367-367.webm", "Collectible": true, "Sounds": [] }, { "Name": "Mind Control Tech", "RegImage": "/330-474-368.png", "GoldImage": "/0-368-368.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_085_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_085_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_085_Play_01.ogg" }] }, { "Name": "Huffer", "RegImage": "/333-528-369.png", "GoldImage": "/0-369-369.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_NEW1_034_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_NEW1_034_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_NEW1_034_EnterPlay.ogg" }] }, { "Name": "Sunfury Protector", "RegImage": "/330-444-372.png", "GoldImage": "/0-372-372.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_058_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_058_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_058_Play_01.ogg" }] }, { "Name": "King Mukla", "RegImage": "/330-372-373.png", "GoldImage": "/0-373-373.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_TUTORIAL_03_MUKLA_02_02.ogg" }, { "Name": "Death1", "URL": "/VO_TUTORIAL_03_MUKLA_08_08.ogg" }, { "Name": "Play1", "URL": "/VO_TUTORIAL_03_MUKLA_01_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Beast_Villain.ogg" }] }, { "Name": "Rooted", "RegImage": "/330-656-375.png", "GoldImage": "/0-375-375.webm", "Sounds": [] }, { "Name": "Barrel", "RegImage": "/334-761-376.png", "GoldImage": "/0-376-376.webm", "Sounds": [] }, { "Name": "Crazed Hunter", "RegImage": "/334-782-377.png", "GoldImage": "/0-377-377.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_TU4d_002_Play_01.ogg" }, { "Name": "Death1", "URL": "/VO_TU4d_002_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_TU4d_002_Play_01.ogg" }] }, { "Name": "Fan of Knives", "RegImage": "/330-531-378.png", "GoldImage": "/0-378-378.webm", "Collectible": true, "Sounds": [] }, { "Name": "Circle of Healing", "RegImage": "/331-132-38.png", "GoldImage": "/0-38-38.webm", "Collectible": true, "Sounds": [] }, { "Name": "Gnoll", "RegImage": "/334-740-381.png", "GoldImage": "/0-381-381.webm", "Sounds": [{ "Name": "Death1", "URL": "/WoW_TU4a_003_Gnoll_Death.ogg" }, { "Name": "Play1", "URL": "/GnollReady1.ogg" }] }, { "Name": "Eviscerate", "RegImage": "/330-522-382.png", "GoldImage": "/0-382-382.webm", "Collectible": true, "Sounds": [] }, { "Name": "Equality", "RegImage": "/331-126-383.png", "GoldImage": "/0-383-383.webm", "Collectible": true, "Sounds": [] }, { "Name": "Sap", "RegImage": "/331-40-385.png", "GoldImage": "/0-385-385.webm", "Collectible": true, "Sounds": [] }, { "Name": "Harvest Golem", "RegImage": "/330-977-386.png", "GoldImage": "/0-386-386.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_556_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_556_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_556_EnterPlay.ogg" }] }, { "Name": "Hidden Gnome", "RegImage": "/334-767-387.png", "GoldImage": "/0-387-387.webm", "Sounds": [] }, { "Name": "Dalaran Mage", "RegImage": "/331-43-388.png", "GoldImage": "/0-388-388.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_582_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_582_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_582_Play_01.ogg" }] }, { "Name": "Stampeding Kodo", "RegImage": "/333-546-389.png", "GoldImage": "/0-389-389.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/KotoBeastYes1.ogg" }, { "Name": "Death1", "URL": "/KodoBeastDeath.ogg" }, { "Name": "Play1", "URL": "/KotoBeastReady1.ogg" }] }, { "Name": "Hogger", "RegImage": "/333-540-39.png", "GoldImage": "/0-39-39.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_TUTORIAL_01_HOGGER_01_01.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_040_Death_12.ogg" }, { "Name": "Play1", "URL": "/VO_TUTORIAL_01_HOGGER_02_02.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Beast_Villain.ogg" }] }, { "Name": "Flametongue Totem", "RegImage": "/331-4-390.png", "GoldImage": "/0-390-390.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_565_Attack_00.ogg" }, { "Name": "Death1", "URL": "/EX1_565_Death_FlameTongueTotem.ogg" }, { "Name": "Play1", "URL": "/EX1_565_Play_FlametongueTotem.ogg" }] }, { "Name": "Tirion Fordring", "RegImage": "/330-851-391.png", "GoldImage": "/0-391-391.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_383_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_383_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_383_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Alliance.ogg" }] }, { "Name": "Jungle Panther", "RegImage": "/330-384-392.png", "GoldImage": "/0-392-392.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_017_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_017_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_017_EnterPlay.ogg" }] }, { "Name": "Crazy Monkey", "RegImage": "/334-827-393.png", "GoldImage": "/0-393-393.webm", "Sounds": [{ "Name": "Death1", "URL": "/MONKEY_DEATH_03.ogg" }, { "Name": "Play1", "URL": "/MONKEY_ENTER_PLAY_02.ogg" }] }, { "Name": "Blessing of Might", "RegImage": "/330-63-394.png", "GoldImage": "/0-394-394.webm", "Collectible": true, "Sounds": [] }, { "Name": "Loot Hoarder", "RegImage": "/330-489-395.png", "GoldImage": "/0-395-395.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_096_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_096_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_096_Play_01.ogg" }] }, { "Name": "The Black Knight", "RegImage": "/330-342-396.png", "GoldImage": "/0-396-396.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_002_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_002_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_002_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Undead2.ogg" }] }, { "Name": "Brewmaster", "RegImage": "/334-821-397.png", "GoldImage": "/0-397-397.webm", "Sounds": [] }, { "Name": "Twisting Nether", "RegImage": "/330-761-398.png", "GoldImage": "/0-398-398.webm", "Collectible": true, "Sounds": [] }, { "Name": "Pandaren Scout", "RegImage": "/334-812-399.png", "GoldImage": "/0-399-399.webm", "Sounds": [{ "Name": "Death1", "URL": "/VO_TU4f_002_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_TU4f_002_Play_01.ogg" }] }, { "Name": "Sorcerer's Apprentice", "RegImage": "/331-94-4.png", "GoldImage": "/0-4-4.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_608_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_608_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_608_Play_01.ogg" }] }, { "Name": "Mind Control", "RegImage": "/329-862-401.png", "GoldImage": "/0-401-401.webm", "Collectible": true, "Sounds": [] }, { "Name": "Pit Lord", "RegImage": "/330-764-402.png", "GoldImage": "/0-402-402.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_313_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_313_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_313_Play_01.ogg" }] }, { "Name": "Battle Axe", "RegImage": "/330-878-403.png", "GoldImage": "/0-403-403.webm", "Sounds": [] }, { "Name": "Mukla's Big Brother", "RegImage": "/334-773-404.png", "GoldImage": "/0-404-404.webm", "Sounds": [{ "Name": "Death1", "URL": "/VO_TUTORIAL_03_BRO_02_02.ogg" }, { "Name": "Play1", "URL": "/VO_TUTORIAL_03_BRO_01_01.ogg" }] }, { "Name": "Poultryizer", "RegImage": "/333-87-405.png", "GoldImage": "/0-405-405.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_Mekka4_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_Mekka4_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_Mekka4_EnterPlay.ogg" }] }, { "Name": "Lord Jaraxxus", "RegImage": "/330-788-406.png", "GoldImage": "/0-406-406.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_323_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_323_Death_03.ogg" }] }, { "Name": "Multi-Shot", "RegImage": "/330-312-407.png", "GoldImage": "/0-407-407.webm", "Collectible": true, "Sounds": [] }, { "Name": "Druid of the Claw", "RegImage": "/330-628-408.png", "GoldImage": "/0-408-408.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_165t1_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_165t1_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_165t1_EnterPlay.ogg" }] }, { "Name": "Holy Smite", "RegImage": "/329-868-409.png", "GoldImage": "/0-409-409.webm", "Collectible": true, "Sounds": [] }, { "Name": "Ironforge Rifleman", "RegImage": "/330-159-41.png", "GoldImage": "/0-41-41.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_141_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_141_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_141_Play_01.ogg" }, { "Name": "Play10", "URL": "/Tutorial_Rifle_Fire_01.ogg" }, { "Name": "Play11", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play2", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play3", "URL": "/FX_FireballEvent04_SpellCancel_01.ogg" }, { "Name": "Play4", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play5", "URL": "/FX_FireballEvent04_SpellImpact_01.ogg" }, { "Name": "Play6", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play7", "URL": "/FX_FireballEvent04_SpellCancel_01.ogg" }, { "Name": "Play8", "URL": "/Tutorial_Rifle_Fire_01.ogg" }, { "Name": "Play9", "URL": "/FX_FireballEvent04_SpellImpact_01.ogg" }] }, { "Name": "Voodoo Doctor", "RegImage": "/330-366-410.png", "GoldImage": "/0-410-410.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_011_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_011_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_011_Play_01.ogg" }] }, { "Name": "Kirin Tor Mage", "RegImage": "/331-106-411.png", "GoldImage": "/0-411-411.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_612_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_612_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_612_Play_01.ogg" }] }, { "Name": "Lord of the Arena", "RegImage": "/330-186-414.png", "GoldImage": "/0-414-414.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_162_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_162_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_162_Play_01.ogg" }] }, { "Name": "Mind Blast", "RegImage": "/330-324-415.png", "GoldImage": "/0-415-415.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Shared_Shadow_PreCastHigh_1.ogg" }, { "Name": "Play2", "URL": "/Shared_Shadow_Cast_1.ogg" }, { "Name": "Play3", "URL": "/Shared_Shadow_Start_1.ogg" }, { "Name": "Play4", "URL": "/Shared_Shadow_PreCastHigh_1.ogg" }, { "Name": "Play5", "URL": "/Shared_Shadow_Cast_1.ogg" }, { "Name": "Play6", "URL": "/Warlock_Corruption_Impact_1.ogg" }, { "Name": "Play7", "URL": "/Shared_Shadow_Fizzle_1.ogg" }] }, { "Name": "Defias Ringleader", "RegImage": "/330-540-417.png", "GoldImage": "/0-417-417.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_131_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_131_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_131_Play_01.ogg" }] }, { "Name": "Spellbreaker", "RegImage": "/330-429-42.png", "GoldImage": "/0-42-42.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_048_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_048_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_048_Play_01.ogg" }] }, { "Name": "Murloc Tidecaller", "RegImage": "/330-929-420.png", "GoldImage": "/0-420-420.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_509_Murloc_Tidecaller_Attack1.ogg" }, { "Name": "Death1", "URL": "/EX1_509_Murloc_Tidecaller_Death1.ogg" }, { "Name": "Play1", "URL": "/EX1_509_Murloc_Tidecaller_EnterPlay1.ogg" }] }, { "Name": "Ivory Knight", "RegImage": "/331-854-42019.png", "GoldImage": "/42-19-42019.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/KAR_A10_05_WhiteKnight_Attack_01.ogg" }, { "Name": "Death1", "URL": "/KAR_A10_05_WhiteKnight_Death_01.ogg" }, { "Name": "Play1", "URL": "/KAR_A10_05_WhiteKnight_Play_01.ogg" }] }, { "Name": "Kindly Grandmother", "RegImage": "/331-776-42020.png", "GoldImage": "/42-20-42020.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_005_Female_BigBadWolf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_005_Female_BigBadWolf_Death_03.ogg" }, { "Name": "Death2", "URL": "/VO_KAR_005_Female_BigBadWolf_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_005_Female_BigBadWolf_Play_01.ogg" }] }, { "Name": "Barnes", "RegImage": "/331-914-42021.png", "GoldImage": "/42-21-42021.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_114_Male_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_114_Male_Human_Death_02.ogg" }, { "Name": "Play1", "URL": "/Barnes_Play_Stinger.ogg" }] }, { "Name": "The Curator", "RegImage": "/331-857-42022.png", "GoldImage": "/42-22-42022.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_061_Male_ArcaneGolem_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Curator_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_061_Male_ArcaneGolem_Death_02.ogg" }, { "Name": "Death2", "URL": "/Curator_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_061_Male_ArcaneGolem_Play_01.ogg" }, { "Name": "Play2", "URL": "/Curator_Play_Stinger.ogg" }, { "Name": "Play3", "URL": "/Curator_Play_Underlay.ogg" }] }, { "Name": "Ethereal Peddler", "RegImage": "/331-872-42023.png", "GoldImage": "/42-23-42023.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_070_Female_Ethereal_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_070_Female_Ethereal_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_070_Female_Ethereal_Play_01.ogg" }] }, { "Name": "Enchanted Raven", "RegImage": "/331-923-42024.png", "GoldImage": "/42-24-42024.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/KAR_300_EnchantedRaven_Attack_01.ogg" }, { "Name": "Death1", "URL": "/KAR_300_EnchantedRaven_Death_01.ogg" }, { "Name": "Play1", "URL": "/KAR_300_EnchantedRaven_Play_01.ogg" }] }, { "Name": "Firelands Portal", "RegImage": "/331-881-42025.png", "GoldImage": "/42-25-42025.webm", "Collectible": true, "Sounds": [] }, { "Name": "Malchezaar's Imp", "RegImage": "/331-887-42027.png", "GoldImage": "/42-27-42027.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_089_Male_Imp_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/ShadowMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_089_Male_Imp_Death_01.ogg" }, { "Name": "Death2", "URL": "/ShadowMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_089_Male_Imp_Play_04.ogg" }, { "Name": "Play2", "URL": "/ShadowMagic_Play_Underlay.ogg" }] }, { "Name": "Babbling Book", "RegImage": "/331-785-42028.png", "GoldImage": "/42-28-42028.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_009_Male_Book_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/BabblingBook_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_009_Male_Book_Death_01.ogg" }, { "Name": "Death2", "URL": "/BabblingBook_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_009_Male_Book_Play_01.ogg" }, { "Name": "Play2", "URL": "/BabblingBook_Play_Underlay.ogg" }, { "Name": "Play3", "URL": "/SpawnToHand_BabblingBook_Sound.ogg" }, { "Name": "Play4", "URL": "/SpawnToHand_BabblingBook_Sound.ogg" }] }, { "Name": "Book Wyrm", "RegImage": "/331-833-42029.png", "GoldImage": "/42-29-42029.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_033_Male_Dragon_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_033_Male_Dragon_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_033_Male_Dragon_Play_01.ogg" }] }, { "Name": "Moroes", "RegImage": "/331-848-42030.png", "GoldImage": "/42-30-42030.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_044_Male_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_044_Male_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_044_Male_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/Moroes_Play_Stinger.ogg" }] }, { "Name": "Prince Malchezaar", "RegImage": "/331-905-42031.png", "GoldImage": "/42-31-42031.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_096_Male_Demon_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_096_Male_Demon_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_096_Male_Demon_Play_01.ogg" }, { "Name": "Play2", "URL": "/Malchezaar_Play_Stinger.ogg" }, { "Name": "Trigger1", "URL": "/VO_KAR_096_Male_Demon_Trigger_01.ogg" }, { "Name": "Trigger2", "URL": "/Malchezaar_CardSummons_FX_Sound.ogg" }, { "Name": "Trigger3", "URL": "/VO_KAR_096_Male_Demon_Trigger_02.ogg" }, { "Name": "Trigger4", "URL": "/Malchezaar_CardSummons_FX_Sound.ogg" }, { "Name": "Trigger5", "URL": "/VO_KAR_096_Male_Demon_Trigger_01.ogg" }, { "Name": "Trigger6", "URL": "/Malchezaar_CardSummons_FX_Sound.ogg" }, { "Name": "Trigger7", "URL": "/VO_KAR_096_Male_Demon_Trigger_02.ogg" }, { "Name": "Trigger8", "URL": "/Malchezaar_CardSummons_FX_Sound.ogg" }] }, { "Name": "Protect the King!", "RegImage": "/331-815-42032.png", "GoldImage": "/42-32-42032.webm", "Collectible": true, "Sounds": [] }, { "Name": "Kara Kazham!", "RegImage": "/331-803-42033.png", "GoldImage": "/42-33-42033.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/VO_GULDAN_Male_Orc_Response_08.ogg" }] }, { "Name": "Pompous Thespian", "RegImage": "/331-794-42034.png", "GoldImage": "/42-34-42034.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_011_Male_NightElf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_011_Male_NightElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_011_Male_NightElf_Play_01.ogg" }] }, { "Name": "Zoobot", "RegImage": "/331-902-42035.png", "GoldImage": "/42-35-42035.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/KAR_095_Zoobot-201_Attack_01.ogg" }, { "Name": "Death1", "URL": "/KAR_095_Zoobot-201_Death_01.ogg" }, { "Name": "Play1", "URL": "/KAR_095_Zoobot-201_Play_01.ogg" }] }, { "Name": "Medivh, the Guardian", "RegImage": "/331-908-42036.png", "GoldImage": "/42-36-42036.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_097_Male_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_097_Male_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_097_Male_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/MedivhGuardian_Play_Stinger.ogg" }] }, { "Name": "Silverware Golem", "RegImage": "/331-920-42037.png", "GoldImage": "/42-37-42037.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_205_Male_SilverwareGolem_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/SilverwareGolem_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_SilverwareGolem_Male_SilverwareGolem_SilverwareDeath_03.ogg" }, { "Name": "Death2", "URL": "/SilverwareGolem_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_205_Male_SilverwareGolem_Play_01.ogg" }, { "Name": "Play2", "URL": "/SilverwareGolem_Underlay_Play.ogg" }] }, { "Name": "Netherspite Historian", "RegImage": "/331-860-42039.png", "GoldImage": "/42-39-42039.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_062_Female_Gnome_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/BookA_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_062_Female_Gnome_Death_01.ogg" }, { "Name": "Death2", "URL": "/BookA_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_062_Female_Gnome_Play_01.ogg" }, { "Name": "Play2", "URL": "/BookA_Play_Underlay.ogg" }] }, { "Name": "Moonglade Portal", "RegImage": "/331-878-42040.png", "GoldImage": "/42-40-42040.webm", "Collectible": true, "Sounds": [] }, { "Name": "Fool's Bane", "RegImage": "/331-821-42041.png", "GoldImage": "/42-41-42041.webm", "Collectible": true, "Sounds": [] }, { "Name": "Spirit Claws", "RegImage": "/331-863-42042.png", "GoldImage": "/42-42-42042.webm", "Collectible": true, "Sounds": [] }, { "Name": "Arcane Anomaly", "RegImage": "/331-839-42043.png", "GoldImage": "/42-43-42043.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/KAR_036_ArcaneAnomaly_Attack.ogg" }, { "Name": "Death1", "URL": "/KAR_036_ArcaneAnomaly_Death.ogg" }, { "Name": "Play1", "URL": "/KAR_036_ArcaneAnomaly_Play.ogg" }] }, { "Name": "Avian Watcher", "RegImage": "/331-842-42044.png", "GoldImage": "/42-44-42044.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/KAR_037_RavenWatcher_Attack_01.ogg" }, { "Name": "Death1", "URL": "/KAR_037_RavenWatcher_Death_01.ogg" }, { "Name": "Play1", "URL": "/KAR_037_RavenWatcher_Play_01.ogg" }] }, { "Name": "Maelstrom Portal", "RegImage": "/331-875-42045.png", "GoldImage": "/42-45-42045.webm", "Collectible": true, "Sounds": [] }, { "Name": "Swashburglar", "RegImage": "/331-869-42046.png", "GoldImage": "/42-46-42046.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_070_a_Male_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_070_a_Male_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_070_a_Male_Human_Play_01.ogg" }] }, { "Name": "Wicked Witchdoctor", "RegImage": "/331-800-42047.png", "GoldImage": "/42-47-42047.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_021_Female_Troll_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_021_Female_Troll_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_021_Female_Troll_Play_02.ogg" }, { "Name": "Trigger1", "URL": "/VO_KAR_021_Female_Troll_Trigger_01.ogg" }] }, { "Name": "Medivh's Valet", "RegImage": "/331-893-42048.png", "GoldImage": "/42-48-42048.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_092_Male_Human_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Monkey_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_092_Male_Human_Death_01.ogg" }, { "Name": "Death2", "URL": "/Monkey_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_092_Male_Human_Play_07.ogg" }, { "Name": "Play2", "URL": "/Monkey_Play_Underlay.ogg" }] }, { "Name": "Arcane Giant", "RegImage": "/331-935-42049.png", "GoldImage": "/42-49-42049.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/KAR_711_ArcaneGiant_Attack_01.ogg" }, { "Name": "Death1", "URL": "/KAR_711_ArcaneGiant_Death_01.ogg" }, { "Name": "Play1", "URL": "/KAR_711_ArcaneGiant_Play_01.ogg" }] }, { "Name": "Cloaked Huntress", "RegImage": "/331-782-42050.png", "GoldImage": "/42-50-42050.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_006_Female_Human_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/ArmoredWarhorseNoVox_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_006_Female_Human_Death_02.ogg" }, { "Name": "Death2", "URL": "/ArmoredWarhorseNoVox_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_006_Female_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/ArmoredWarhorse1_Play_Underlay.ogg" }] }, { "Name": "Cat Trick", "RegImage": "/331-770-42051.png", "GoldImage": "/42-51-42051.webm", "Collectible": true, "Sounds": [] }, { "Name": "Nightbane Templar", "RegImage": "/331-788-42052.png", "GoldImage": "/42-52-42052.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_010_Female_BloodElf_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/HolyMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_010_Female_BloodElf_Death_01.ogg" }, { "Name": "Death2", "URL": "/HolyMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_010_Female_BloodElf_Play_02.ogg" }, { "Name": "Play2", "URL": "/HolyMagic_Play_Underlay.ogg" }] }, { "Name": "Pantry Spider", "RegImage": "/331-830-42053.png", "GoldImage": "/42-53-42053.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/PantrySpiders_KAR_030a_Attack.ogg" }, { "Name": "Death1", "URL": "/PantrySpiders_KAR_030a_Death.ogg" }, { "Name": "Play1", "URL": "/PantrySpiders_KAR_030a_Play.ogg" }] }, { "Name": "Silvermoon Portal", "RegImage": "/331-884-42054.png", "GoldImage": "/42-54-42054.webm", "Collectible": true, "Sounds": [] }, { "Name": "Menagerie Magician", "RegImage": "/331-926-42055.png", "GoldImage": "/42-55-42055.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_702_Male_Goblin_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Magician_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_702_Male_Goblin_Death_01.ogg" }, { "Name": "Death2", "URL": "/Magician_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_702_Male_Goblin_Play_01.ogg" }, { "Name": "Play2", "URL": "/Magician_Play_Underlay.ogg" }] }, { "Name": "Priest of the Feast", "RegImage": "/331-836-42056.png", "GoldImage": "/42-56-42056.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_035_Male_Dwarf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_035_Male_Dwarf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_035_Male_Dwarf_Play_01.ogg" }] }, { "Name": "Deadly Fork", "RegImage": "/331-896-42057.png", "GoldImage": "/42-57-42057.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_094_Male_Fork_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/Fork_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_094_Male_Fork_Death_01.ogg" }, { "Name": "Death2", "URL": "/Fork_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_094_Male_Fork_Play_02.ogg" }, { "Name": "Play2", "URL": "/Fork_Underlay_Play.ogg" }] }, { "Name": "Onyx Bishop", "RegImage": "/331-917-42058.png", "GoldImage": "/42-58-42058.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_204_Male_ChessPiece_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_204_Male_ChessPiece_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_204_Male_ChessPiece_Play_01.ogg" }, { "Name": "Play2", "URL": "/BlackBishop_Play_Underlay.ogg" }] }, { "Name": "Menagerie Warden", "RegImage": "/331-866-42059.png", "GoldImage": "/42-59-42059.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_065_Female_NightElf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_065_Female_NightElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_065_Female_NightElf_Play_01.ogg" }] }, { "Name": "Violet Illusionist", "RegImage": "/331-938-42060.png", "GoldImage": "/42-60-42060.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_712_Female_Human_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/ArcaneMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_712_Female_Human_Death_01.ogg" }, { "Name": "Death2", "URL": "/ArcaneMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_712_Female_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/ArcaneMagic_Play_Underlay.ogg" }] }, { "Name": "Purify", "RegImage": "/331-797-42061.png", "GoldImage": "/42-61-42061.webm", "Collectible": true, "Sounds": [] }, { "Name": "Arcanosmith", "RegImage": "/331-929-42062.png", "GoldImage": "/42-62-42062.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_710_Male_Gnome_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Arcanosmith_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_710_Male_Gnome_Death_01.ogg" }, { "Name": "Death2", "URL": "/Arcanosmith_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_710_Male_Gnome_Play_01.ogg" }, { "Name": "Play2", "URL": "/Arcanosmith_Play_Underlay.ogg" }] }, { "Name": "Moat Lurker", "RegImage": "/331-845-42063.png", "GoldImage": "/42-63-42063.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/MoatLurker_KAR_041_Attack.ogg" }, { "Name": "Death1", "URL": "/MoatLurker_KAR_041_Death.ogg" }, { "Name": "Play1", "URL": "/MoatLurker_KAR_041_Play.ogg" }] }, { "Name": "Ironforge Portal", "RegImage": "/331-890-42064.png", "GoldImage": "/42-64-42064.webm", "Collectible": true, "Sounds": [] }, { "Name": "Runic Egg", "RegImage": "/331-824-42065.png", "GoldImage": "/42-65-42065.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/KAR_029_RunicEgg_Attack_01.ogg" }, { "Name": "Death1", "URL": "/KAR_029_RunicEgg_Death_01.ogg" }, { "Name": "Play1", "URL": "/KAR_029_RunicEgg_Play_01.ogg" }] }, { "Name": "Wanda Wonderhooves", "RegImage": "/332-364-42068.png", "GoldImage": "/42-68-42068.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_Human_Female_A_Attack1.ogg" }, { "Name": "Death1", "URL": "/VOX_Human_Female_A_Death1.ogg" }, { "Name": "Play1", "URL": "/VOX_Human_Female_A_Play2.ogg" }] }, { "Name": "Susie Sizzlesong", "RegImage": "/332-367-42069.png", "GoldImage": "/42-69-42069.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_NightElf_Female_A_Attack1.ogg" }, { "Name": "Death1", "URL": "/VOX_NightElf_Female_A_Death1.ogg" }, { "Name": "Play1", "URL": "/VOX_NightElf_Female_A_Play1.ogg" }] }, { "Name": "Mark Moonwalker", "RegImage": "/332-370-42070.png", "GoldImage": "/42-70-42070.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_Human_Male_B_Play2.ogg" }, { "Name": "Death1", "URL": "/VOX_Human_Male_B_Death1.ogg" }, { "Name": "Play1", "URL": "/VOX_Human_Male_B_Play1.ogg" }] }, { "Name": "Red Riding Hood", "RegImage": "/332-373-42071.png", "GoldImage": "/42-71-42071.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_Human_Female_A_Attack1.ogg" }, { "Name": "Death1", "URL": "/VOX_Human_Female_A_Death1.ogg" }, { "Name": "Play1", "URL": "/VOX_Human_Female_A_Play2.ogg" }] }, { "Name": "Party Elemental", "RegImage": "/332-376-42073.png", "GoldImage": "/42-73-42073.webm", "Sounds": [{ "Name": "Attack1", "URL": "/KARA_13_20_PartyElemental_Attack.ogg" }, { "Name": "Death1", "URL": "/KARA_13_20_PartyElemental_Death.ogg" }, { "Name": "Play1", "URL": "/KARA_13_20_PartyElemental_Special_Play.ogg" }] }, { "Name": "Mime", "RegImage": "/332-379-42074.png", "GoldImage": "/42-74-42074.webm", "Sounds": [] }, { "Name": "Romulo", "RegImage": "/332-382-42075.png", "GoldImage": "/42-75-42075.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KARA_06_01_Male_Human_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/Romulo_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KARA_06_01_Male_Human_Death_01.ogg" }, { "Name": "Death2", "URL": "/Romulo_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KARA_06_01_Male_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/Romulo_Play_Underlay.ogg" }] }, { "Name": "Party Elemental", "RegImage": "/334-326-42076.png", "GoldImage": "/42-76-42076.webm", "Sounds": [{ "Name": "Attack1", "URL": "/KARA_13_20_PartyElemental_Attack.ogg" }, { "Name": "Death1", "URL": "/KARA_13_20_PartyElemental_Death.ogg" }, { "Name": "Play1", "URL": "/KARA_13_20_PartyElemental_Play.ogg" }] }, { "Name": "Party Portal!", "RegImage": "/334-323-42077.png", "GoldImage": "/42-77-42077.webm", "Sounds": [{ "Name": "Play1", "URL": "/KarazhanWorld_Untargetted_portal_SFX.ogg" }, { "Name": "Play2", "URL": "/tavern_crowd_play_reaction_positive_2.ogg" }, { "Name": "Play3", "URL": "/KarazhanWorld_Untargetted_Ping_SFX.ogg" }, { "Name": "Play4", "URL": "/KarazhanWorld_Untargetted_CardFlip_SFX.ogg" }, { "Name": "Play5", "URL": "/FX_MinionSummonLarge_Drop.ogg" }] }, { "Name": "Prince Malchezaar", "RegImage": "/332-73-42083.png", "GoldImage": "/42-83-42083.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/ShadowNexusWorld_Untargetted_Sound.ogg" }] }, { "Name": "Prince Malchezaar", "RegImage": "/332-76-42084.png", "GoldImage": "/42-84-42084.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/ShadowNexusWorld_Untargetted_Sound.ogg" }] }, { "Name": "Legion", "RegImage": "/332-79-42085.png", "GoldImage": "/42-85-42085.webm", "Sounds": [] }, { "Name": "Abyssal", "RegImage": "/332-82-42086.png", "GoldImage": "/42-86-42086.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Infernal_KARA_00_02a_Attack.ogg" }, { "Name": "Death1", "URL": "/Infernal_KARA_00_02a_Death.ogg" }, { "Name": "Play1", "URL": "/Infernal_KARA_00_02a_Play.ogg" }] }, { "Name": "Legion", "RegImage": "/332-85-42087.png", "GoldImage": "/42-87-42087.webm", "Sounds": [] }, { "Name": "Medivh", "RegImage": "/332-88-42088.png", "GoldImage": "/42-88-42088.webm", "Sounds": [] }, { "Name": "Medivh", "RegImage": "/332-91-42089.png", "GoldImage": "/42-89-42089.webm", "Sounds": [] }, { "Name": "Medivh", "RegImage": "/332-94-42090.png", "GoldImage": "/42-90-42090.webm", "Sounds": [] }, { "Name": "Brilliance", "RegImage": "/332-97-42091.png", "GoldImage": "/42-91-42091.webm", "Sounds": [] }, { "Name": "Brilliance", "RegImage": "/332-100-42092.png", "GoldImage": "/42-92-42092.webm", "Sounds": [] }, { "Name": "Archmage's Insight", "RegImage": "/332-103-42093.png", "GoldImage": "/42-93-42093.webm", "Sounds": [] }, { "Name": "Arcane Power", "RegImage": "/332-106-42095.png", "GoldImage": "/42-95-42095.webm", "Sounds": [{ "Name": "Play1", "URL": "/Arcane_Power_Targetted_Medivh_Sound.ogg" }, { "Name": "Play2", "URL": "/Arcane_Power_Targetted_Medivh_Sound.ogg" }] }, { "Name": "Astral Portal", "RegImage": "/332-109-42097.png", "GoldImage": "/42-97-42097.webm", "Sounds": [] }, { "Name": "Archmage's Apprentice", "RegImage": "/332-112-42098.png", "GoldImage": "/42-98-42098.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KARA_00_08_Male_Human_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/ArcaneMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KARA_00_08_Male_Human_Death_01.ogg" }, { "Name": "Death2", "URL": "/ArcaneMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KARA_00_08_Male_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/ArcaneMagic_Play_Underlay.ogg" }] }, { "Name": "Mage Armor", "RegImage": "/332-115-42099.png", "GoldImage": "/42-99-42099.webm", "Sounds": [] }, { "Name": "Shadowform", "RegImage": "/331-144-421.png", "GoldImage": "/0-421-421.webm", "Collectible": true, "Sounds": [] }, { "Name": "Mysterious Rune", "RegImage": "/332-118-42100.png", "GoldImage": "/42-100-42100.webm", "Sounds": [] }, { "Name": "Evocation", "RegImage": "/332-121-42101.png", "GoldImage": "/42-101-42101.webm", "Sounds": [] }, { "Name": "Dorothee", "RegImage": "/332-124-42102.png", "GoldImage": "/42-102-42102.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KARA_04_01_Female_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KARA_04_01_Female_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KARA_04_01_Female_Human_Play_01.ogg" }] }, { "Name": "The Crone", "RegImage": "/332-127-42103.png", "GoldImage": "/42-103-42103.webm", "Sounds": [] }, { "Name": "The Crone", "RegImage": "/332-130-42104.png", "GoldImage": "/42-104-42104.webm", "Sounds": [] }, { "Name": "Twister", "RegImage": "/332-133-42105.png", "GoldImage": "/42-105-42105.webm", "Sounds": [] }, { "Name": "Flying Monkey", "RegImage": "/332-136-42106.png", "GoldImage": "/42-106-42106.webm", "Sounds": [{ "Name": "Attack1", "URL": "/FlyingMonkey_KARA_04_05_Attack.ogg" }, { "Name": "Death1", "URL": "/FlyingMonkey_KARA_04_05_Death.ogg" }, { "Name": "Play1", "URL": "/FlyingMonkey_KARA_04_05_Play.ogg" }] }, { "Name": "Flying Monkey", "RegImage": "/332-139-42107.png", "GoldImage": "/42-107-42107.webm", "Sounds": [{ "Name": "Attack1", "URL": "/FlyingMonkey_KARA_04_05_Attack.ogg" }, { "Name": "Death1", "URL": "/FlyingMonkey_KARA_04_05_Death.ogg" }, { "Name": "Play1", "URL": "/FlyingMonkey_KARA_04_05_Play.ogg" }] }, { "Name": "Kindly Grandmother", "RegImage": "/332-142-42108.png", "GoldImage": "/42-108-42108.webm", "Sounds": [] }, { "Name": "Big Bad Wolf", "RegImage": "/332-145-42110.png", "GoldImage": "/42-110-42110.webm", "Sounds": [] }, { "Name": "Big Bad Wolf", "RegImage": "/332-148-42111.png", "GoldImage": "/42-111-42111.webm", "Sounds": [] }, { "Name": "Trembling", "RegImage": "/332-151-42112.png", "GoldImage": "/42-112-42112.webm", "Sounds": [] }, { "Name": "Trembling", "RegImage": "/332-154-42113.png", "GoldImage": "/42-113-42113.webm", "Sounds": [] }, { "Name": "Big Bad Claws", "RegImage": "/332-157-42114.png", "GoldImage": "/42-114-42114.webm", "Sounds": [] }, { "Name": "Big Bad Claws", "RegImage": "/332-160-42115.png", "GoldImage": "/42-115-42115.webm", "Sounds": [] }, { "Name": "Romulo", "RegImage": "/332-163-42116.png", "GoldImage": "/42-116-42116.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KARA_06_01_Male_Human_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Romulo_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KARA_06_01_Male_Human_Death_01.ogg" }, { "Name": "Death2", "URL": "/Romulo_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KARA_06_01_Male_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/Romulo_Play_Underlay.ogg" }] }, { "Name": "Romulo", "RegImage": "/332-166-42118.png", "GoldImage": "/42-118-42118.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KARA_06_01_Male_Human_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Romulo_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KARA_06_01_Male_Human_Death_01.ogg" }, { "Name": "Death2", "URL": "/Romulo_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KARA_06_01_Male_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/Romulo_Play_Underlay.ogg" }] }, { "Name": "Julianne", "RegImage": "/332-169-42119.png", "GoldImage": "/42-119-42119.webm", "Sounds": [] }, { "Name": "Julianne", "RegImage": "/332-172-42120.png", "GoldImage": "/42-120-42120.webm", "Sounds": [] }, { "Name": "True Love", "RegImage": "/332-175-42121.png", "GoldImage": "/42-121-42121.webm", "Sounds": [] }, { "Name": "True Love", "RegImage": "/332-178-42122.png", "GoldImage": "/42-122-42122.webm", "Sounds": [] }, { "Name": "Curator", "RegImage": "/332-181-42123.png", "GoldImage": "/42-123-42123.webm", "Sounds": [] }, { "Name": "Curator", "RegImage": "/332-184-42124.png", "GoldImage": "/42-124-42124.webm", "Sounds": [] }, { "Name": "Gallery Protection", "RegImage": "/332-187-42125.png", "GoldImage": "/42-125-42125.webm", "Sounds": [] }, { "Name": "Murloc Escaping!", "RegImage": "/332-190-42127.png", "GoldImage": "/42-127-42127.webm", "Sounds": [{ "Name": "Play1", "URL": "/Curator_PortalMinion_CustomSpawn_Sound.ogg" }] }, { "Name": "Murlocs Escaping!", "RegImage": "/332-193-42128.png", "GoldImage": "/42-128-42128.webm", "Sounds": [{ "Name": "Play1", "URL": "/Curator_PortalMinion_CustomSpawn_Sound.ogg" }] }, { "Name": "Stampeding Beast!", "RegImage": "/332-196-42129.png", "GoldImage": "/42-129-42129.webm", "Sounds": [{ "Name": "Play1", "URL": "/Curator_PortalMinion_CustomSpawn_Sound.ogg" }] }, { "Name": "Stampeding Beast!", "RegImage": "/332-199-42130.png", "GoldImage": "/42-130-42130.webm", "Sounds": [{ "Name": "Play1", "URL": "/Curator_PortalMinion_CustomSpawn_Sound.ogg" }] }, { "Name": "Demons Loose!", "RegImage": "/332-202-42131.png", "GoldImage": "/42-131-42131.webm", "Sounds": [{ "Name": "Play1", "URL": "/Curator_PortalMinion_CustomSpawn_Sound.ogg" }] }, { "Name": "Demons Loose!", "RegImage": "/332-205-42132.png", "GoldImage": "/42-132-42132.webm", "Sounds": [{ "Name": "Play1", "URL": "/Curator_PortalMinion_CustomSpawn_Sound.ogg" }] }, { "Name": "Haywire Mech!", "RegImage": "/332-208-42133.png", "GoldImage": "/42-133-42133.webm", "Sounds": [{ "Name": "Play1", "URL": "/Curator_PortalMinion_CustomSpawn_Sound.ogg" }] }, { "Name": "Haywire Mech!", "RegImage": "/332-211-42134.png", "GoldImage": "/42-134-42134.webm", "Sounds": [{ "Name": "Play1", "URL": "/Curator_PortalMinion_CustomSpawn_Sound.ogg" }] }, { "Name": "Dragons Free!", "RegImage": "/332-214-42135.png", "GoldImage": "/42-135-42135.webm", "Sounds": [{ "Name": "Play1", "URL": "/Curator_PortalMinion_CustomSpawn_Sound.ogg" }] }, { "Name": "Dragons Free!", "RegImage": "/332-217-42136.png", "GoldImage": "/42-136-42136.webm", "Sounds": [{ "Name": "Play1", "URL": "/Curator_PortalMinion_CustomSpawn_Sound.ogg" }] }, { "Name": "Netherspite", "RegImage": "/332-220-42137.png", "GoldImage": "/42-137-42137.webm", "Sounds": [] }, { "Name": "Netherspite", "RegImage": "/332-223-42138.png", "GoldImage": "/42-138-42138.webm", "Sounds": [] }, { "Name": "Nether Rage", "RegImage": "/332-226-42139.png", "GoldImage": "/42-139-42139.webm", "Sounds": [] }, { "Name": "Nether Rage", "RegImage": "/332-229-42142.png", "GoldImage": "/42-142-42142.webm", "Sounds": [] }, { "Name": "Nether Breath", "RegImage": "/332-232-42143.png", "GoldImage": "/42-143-42143.webm", "Sounds": [] }, { "Name": "Nether Breath", "RegImage": "/332-235-42145.png", "GoldImage": "/42-145-42145.webm", "Sounds": [] }, { "Name": "Terrifying Roar", "RegImage": "/332-238-42147.png", "GoldImage": "/42-147-42147.webm", "Sounds": [] }, { "Name": "Terrifying Roar", "RegImage": "/332-241-42148.png", "GoldImage": "/42-148-42148.webm", "Sounds": [] }, { "Name": "Blue Portal", "RegImage": "/332-244-42149.png", "GoldImage": "/42-149-42149.webm", "Sounds": [] }, { "Name": "Red Portal", "RegImage": "/332-247-42151.png", "GoldImage": "/42-151-42151.webm", "Sounds": [] }, { "Name": "Terestian Illhoof", "RegImage": "/332-250-42153.png", "GoldImage": "/42-153-42153.webm", "Sounds": [] }, { "Name": "Terestian Illhoof", "RegImage": "/332-253-42154.png", "GoldImage": "/42-154-42154.webm", "Sounds": [] }, { "Name": "Curator", "RegImage": "/332-256-42155.png", "GoldImage": "/42-155-42155.webm", "Sounds": [] }, { "Name": "Many Imps!", "RegImage": "/332-259-42156.png", "GoldImage": "/42-156-42156.webm", "Sounds": [] }, { "Name": "Icky Imp", "RegImage": "/332-262-42157.png", "GoldImage": "/42-157-42157.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KARA_09_03a_Male_Imp_Attack_01.ogg" }, { "Name": "Play1", "URL": "/VO_KARA_09_03a_Male_Imp_Play_01.ogg" }, { "Name": "Trigger1", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }] }, { "Name": "Icky Imp", "RegImage": "/332-265-42158.png", "GoldImage": "/42-158-42158.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KARA_09_03a_Male_Imp_Attack_01.ogg" }, { "Name": "Play1", "URL": "/VO_KARA_09_03a_Male_Imp_Play_01.ogg" }, { "Name": "Trigger1", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }] }, { "Name": "Many Imps!", "RegImage": "/332-268-42159.png", "GoldImage": "/42-159-42159.webm", "Sounds": [] }, { "Name": "Dark Pact", "RegImage": "/332-271-42160.png", "GoldImage": "/42-160-42160.webm", "Sounds": [] }, { "Name": "Summon Kil'rek", "RegImage": "/332-274-42161.png", "GoldImage": "/42-161-42161.webm", "Sounds": [] }, { "Name": "Summon Kil'rek", "RegImage": "/332-277-42162.png", "GoldImage": "/42-162-42162.webm", "Sounds": [] }, { "Name": "Shadow Volley", "RegImage": "/332-280-42163.png", "GoldImage": "/42-163-42163.webm", "Sounds": [] }, { "Name": "Shadow Volley", "RegImage": "/332-283-42164.png", "GoldImage": "/42-164-42164.webm", "Sounds": [] }, { "Name": "Steal Life", "RegImage": "/332-286-42165.png", "GoldImage": "/42-165-42165.webm", "Sounds": [{ "Name": "Play1", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }, { "Name": "Play2", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }] }, { "Name": "Steal Life", "RegImage": "/332-289-42166.png", "GoldImage": "/42-166-42166.webm", "Sounds": [{ "Name": "Play1", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }, { "Name": "Play2", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }] }, { "Name": "Kil'rek", "RegImage": "/332-292-42167.png", "GoldImage": "/42-167-42167.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KARA_09_08_Male_Imp_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KARA_09_08_Male_Imp_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KARA_09_08_Male_Imp_Play_01.ogg" }] }, { "Name": "Kil'rek", "RegImage": "/332-295-42168.png", "GoldImage": "/42-168-42168.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KARA_09_08_Male_Imp_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KARA_09_08_Male_Imp_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KARA_09_08_Male_Imp_Play_01.ogg" }] }, { "Name": "Nightbane", "RegImage": "/332-298-42169.png", "GoldImage": "/42-169-42169.webm", "Sounds": [] }, { "Name": "Nightbane", "RegImage": "/332-301-42170.png", "GoldImage": "/42-170-42170.webm", "Sounds": [] }, { "Name": "Manastorm", "RegImage": "/332-304-42171.png", "GoldImage": "/42-171-42171.webm", "Sounds": [] }, { "Name": "Shade of Aran", "RegImage": "/332-307-42172.png", "GoldImage": "/42-172-42172.webm", "Sounds": [] }, { "Name": "Shade of Aran", "RegImage": "/332-310-42173.png", "GoldImage": "/42-173-42173.webm", "Sounds": [] }, { "Name": "Ley Lines", "RegImage": "/332-313-42174.png", "GoldImage": "/42-174-42174.webm", "Sounds": [] }, { "Name": "Ley Lines", "RegImage": "/332-316-42175.png", "GoldImage": "/42-175-42175.webm", "Sounds": [] }, { "Name": "Flame Wreath", "RegImage": "/332-319-42176.png", "GoldImage": "/42-176-42176.webm", "Sounds": [] }, { "Name": "Flame Wreath", "RegImage": "/332-322-42177.png", "GoldImage": "/42-177-42177.webm", "Sounds": [] }, { "Name": "Nazra Wildaxe", "RegImage": "/332-325-42178.png", "GoldImage": "/42-178-42178.webm", "Sounds": [] }, { "Name": "Nazra Wildaxe", "RegImage": "/332-328-42179.png", "GoldImage": "/42-179-42179.webm", "Sounds": [] }, { "Name": "The Horde", "RegImage": "/332-331-42180.png", "GoldImage": "/42-180-42180.webm", "Sounds": [] }, { "Name": "The Horde", "RegImage": "/332-334-42181.png", "GoldImage": "/42-181-42181.webm", "Sounds": [] }, { "Name": "Orc Warrior", "RegImage": "/332-337-42182.png", "GoldImage": "/42-182-42182.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KARA_13_03_Female_Orc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KARA_13_03_Female_Orc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KARA_13_03_Female_Orc_Play_01.ogg" }] }, { "Name": "Orc Warrior", "RegImage": "/332-340-42183.png", "GoldImage": "/42-183-42183.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KARA_13_03_Female_Orc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KARA_13_03_Female_Orc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KARA_13_03_Female_Orc_Play_01.ogg" }] }, { "Name": "Prince Malchezaar", "RegImage": "/332-343-42184.png", "GoldImage": "/42-184-42184.webm", "Sounds": [] }, { "Name": "Prince Malchezaar", "RegImage": "/332-346-42185.png", "GoldImage": "/42-185-42185.webm", "Sounds": [] }, { "Name": "Shadow Bolt Volley", "RegImage": "/332-349-42186.png", "GoldImage": "/42-186-42186.webm", "Sounds": [] }, { "Name": "Demonic Presence", "RegImage": "/332-352-42188.png", "GoldImage": "/42-188-42188.webm", "Sounds": [] }, { "Name": "Demonic Presence", "RegImage": "/332-355-42189.png", "GoldImage": "/42-189-42189.webm", "Sounds": [] }, { "Name": "Legion", "RegImage": "/332-358-42190.png", "GoldImage": "/42-190-42190.webm", "Sounds": [] }, { "Name": "Legion", "RegImage": "/332-361-42191.png", "GoldImage": "/42-191-42191.webm", "Sounds": [] }, { "Name": "Atiesh", "RegImage": "/332-385-42192.png", "GoldImage": "/42-192-42192.webm", "Sounds": [] }, { "Name": "Cat in a Hat", "RegImage": "/331-773-42195.png", "GoldImage": "/42-195-42195.webm", "Sounds": [{ "Name": "Attack1", "URL": "/CatInAHat_KAR_004a_Attack.ogg" }, { "Name": "Death1", "URL": "/CatInAHat_KAR_004a_Death.ogg" }, { "Name": "Play1", "URL": "/CatInAHat_KAR_004a_Play.ogg" }] }, { "Name": "Big Bad Wolf", "RegImage": "/331-779-42196.png", "GoldImage": "/42-196-42196.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_005a_Male_Worgen_Attack_03.ogg" }, { "Name": "Death1", "URL": "/VO_BigBadWolf_Male_Worgen_WolfDeath_04.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_005a_Male_Worgen_Play_01.ogg" }] }, { "Name": "Whelp", "RegImage": "/331-791-42197.png", "GoldImage": "/42-197-42197.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Whelp_KAR_010a_Attack.ogg" }, { "Name": "Death1", "URL": "/Whelp_KAR_010a_Death.ogg" }, { "Name": "Play1", "URL": "/Whelp_KAR_010a_Play.ogg" }] }, { "Name": "Candle", "RegImage": "/331-806-42198.png", "GoldImage": "/42-198-42198.webm", "Sounds": [{ "Name": "Attack1", "URL": "/KAR_025a_Candle_Attack_01.ogg" }, { "Name": "Death1", "URL": "/KAR_025a_Candle_Death_04.ogg" }, { "Name": "Play1", "URL": "/KAR_025a_Candle_Play_01.ogg" }] }, { "Name": "Broom", "RegImage": "/331-809-42199.png", "GoldImage": "/42-199-42199.webm", "Sounds": [{ "Name": "Attack1", "URL": "/KAR_025b_Broom_Attack_01.ogg" }, { "Name": "Death1", "URL": "/KAR_025b_Broom_Death_01.ogg" }, { "Name": "Play1", "URL": "/KAR_025b_Broom_Play_01.ogg" }] }, { "Name": "Knife Juggler", "RegImage": "/333-483-422.png", "GoldImage": "/0-422-422.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_019_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_019_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_019_Play_01.ogg" }] }, { "Name": "Teapot", "RegImage": "/331-812-42200.png", "GoldImage": "/42-200-42200.webm", "Sounds": [{ "Name": "Attack1", "URL": "/KAR_025c_Teapot_Attack_01.ogg" }, { "Name": "Death1", "URL": "/KAR_025c_Teapot_Death_01.ogg" }, { "Name": "Play1", "URL": "/KAR_025c_Teapot_Play_01.ogg" }] }, { "Name": "Pawn", "RegImage": "/331-818-42201.png", "GoldImage": "/42-201-42201.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A10_01_Male_ChessPiece_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Sword1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A10_01_Male_ChessPiece_Death_01.ogg" }, { "Name": "Death2", "URL": "/Sword1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A10_01_Male_ChessPiece_Play_02.ogg" }, { "Name": "Play2", "URL": "/Sword1_Play_Underlay.ogg" }] }, { "Name": "Cellar Spider", "RegImage": "/331-827-42202.png", "GoldImage": "/42-202-42202.webm", "Sounds": [{ "Name": "Attack1", "URL": "/CellarSpiders_KAR_030_Attack.ogg" }, { "Name": "Death1", "URL": "/CellarSpiders_KAR_030_Death.ogg" }, { "Name": "Play1", "URL": "/CellarSpiders_KAR_030_Play.ogg" }] }, { "Name": "Steward", "RegImage": "/331-851-42205.png", "GoldImage": "/42-205-42205.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_Human_Male_B_Attack2.ogg" }, { "Name": "Attack2", "URL": "/Steward_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VOX_Human_Male_B_Death1.ogg" }, { "Name": "Death2", "URL": "/Steward_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VOX_Human_Male_B_Death2.ogg" }, { "Name": "Play2", "URL": "/Steward_Play_Underlay.ogg" }] }, { "Name": "Sharp Fork", "RegImage": "/331-899-42207.png", "GoldImage": "/42-207-42207.webm", "Sounds": [] }, { "Name": "Atiesh", "RegImage": "/331-911-42209.png", "GoldImage": "/42-209-42209.webm", "Sounds": [] }, { "Name": "Animated Shield", "RegImage": "/331-932-42212.png", "GoldImage": "/42-212-42212.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_710m_Male_Shield_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/AnimatedShield_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_710m_Male_Shield_Death_01.ogg" }, { "Name": "Death2", "URL": "/AnimatedShield_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_710m_Male_Shield_Play_01.ogg" }, { "Name": "Play2", "URL": "/AnimatedShield_Play_Underlay.ogg" }] }, { "Name": "Magic Mirror", "RegImage": "/331-941-42213.png", "GoldImage": "/42-213-42213.webm", "Sounds": [] }, { "Name": "Magic Mirror", "RegImage": "/331-944-42214.png", "GoldImage": "/42-214-42214.webm", "Sounds": [] }, { "Name": "Reflections", "RegImage": "/331-947-42215.png", "GoldImage": "/42-215-42215.webm", "Sounds": [] }, { "Name": "Reflections", "RegImage": "/331-950-42217.png", "GoldImage": "/42-217-42217.webm", "Sounds": [] }, { "Name": "Plate", "RegImage": "/331-953-42218.png", "GoldImage": "/42-218-42218.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A02_01_Female_Plate_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Plate_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A02_01_Female_Plate_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A02_01_Female_Plate_Play_01.ogg" }] }, { "Name": "Plate", "RegImage": "/331-956-42219.png", "GoldImage": "/42-219-42219.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A02_01_Female_Plate_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Plate_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A02_01_Female_Plate_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A02_01_Female_Plate_Play_01.ogg" }] }, { "Name": "Spoon", "RegImage": "/331-959-42220.png", "GoldImage": "/42-220-42220.webm", "Sounds": [] }, { "Name": "Spoon", "RegImage": "/331-962-42221.png", "GoldImage": "/42-221-42221.webm", "Sounds": [] }, { "Name": "Fork", "RegImage": "/331-965-42222.png", "GoldImage": "/42-222-42222.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A02_03_Male_Fork_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Fork_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A02_03_Male_Fork_Death_02.ogg" }, { "Name": "Death2", "URL": "/Fork_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A02_03_Male_Fork_Play_01.ogg" }, { "Name": "Play2", "URL": "/Fork_Underlay_Play.ogg" }] }, { "Name": "Fork", "RegImage": "/331-968-42223.png", "GoldImage": "/42-223-42223.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A02_03_Male_Fork_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Fork_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A02_03_Male_Fork_Death_02.ogg" }, { "Name": "Death2", "URL": "/Fork_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A02_03_Male_Fork_Play_01.ogg" }, { "Name": "Play2", "URL": "/Fork_Underlay_Play.ogg" }] }, { "Name": "Knife", "RegImage": "/331-971-42224.png", "GoldImage": "/42-224-42224.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A02_04_Male_Knife_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Knife_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A02_04_Male_Knife_Death_02.ogg" }, { "Name": "Death2", "URL": "/Knife_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A02_04_Male_Knife_Play_01.ogg" }, { "Name": "Play2", "URL": "/Knife_Underlay_Play.ogg" }] }, { "Name": "Knife", "RegImage": "/331-974-42225.png", "GoldImage": "/42-225-42225.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A02_04_Male_Knife_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Knife_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A02_04_Male_Knife_Death_02.ogg" }, { "Name": "Death2", "URL": "/Knife_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A02_04_Male_Knife_Play_01.ogg" }, { "Name": "Play2", "URL": "/Knife_Underlay_Play.ogg" }] }, { "Name": "Cup", "RegImage": "/331-977-42226.png", "GoldImage": "/42-226-42226.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A02_05_Female_Cup_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Cup_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A02_05_Female_Cup_Death_01.ogg" }, { "Name": "Death2", "URL": "/Cup_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A02_05_Female_Cup_Play_01.ogg" }, { "Name": "Play2", "URL": "/Cup_Underlay_Play.ogg" }] }, { "Name": "Cup", "RegImage": "/331-980-42227.png", "GoldImage": "/42-227-42227.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A02_05_Female_Cup_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Cup_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A02_05_Female_Cup_Death_01.ogg" }, { "Name": "Death2", "URL": "/Cup_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A02_05_Female_Cup_Play_01.ogg" }, { "Name": "Play2", "URL": "/Cup_Underlay_Play.ogg" }] }, { "Name": "Pitcher", "RegImage": "/331-983-42228.png", "GoldImage": "/42-228-42228.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A02_06_Female_Pitcher_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Pitcher_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A02_06_Female_Pitcher_Death_01.ogg" }, { "Name": "Death2", "URL": "/Pitcher_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A02_06_Female_Pitcher_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pitcher_Underlay_Play.ogg" }] }, { "Name": "Pitcher", "RegImage": "/331-986-42230.png", "GoldImage": "/42-230-42230.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A02_06_Female_Pitcher_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Pitcher_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A02_06_Female_Pitcher_Death_01.ogg" }, { "Name": "Death2", "URL": "/Pitcher_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A02_06_Female_Pitcher_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pitcher_Underlay_Play.ogg" }] }, { "Name": "Set the Table", "RegImage": "/331-989-42232.png", "GoldImage": "/42-232-42232.webm", "Sounds": [] }, { "Name": "Set the Table", "RegImage": "/331-992-42235.png", "GoldImage": "/42-235-42235.webm", "Sounds": [] }, { "Name": "Pour a Round", "RegImage": "/331-995-42236.png", "GoldImage": "/42-236-42236.webm", "Sounds": [] }, { "Name": "Tossing Plates", "RegImage": "/331-998-42237.png", "GoldImage": "/42-237-42237.webm", "Sounds": [] }, { "Name": "Silverware Golem", "RegImage": "/332-1-42238.png", "GoldImage": "/42-238-42238.webm", "Sounds": [] }, { "Name": "Silverware Golem", "RegImage": "/332-4-42239.png", "GoldImage": "/42-239-42239.webm", "Sounds": [] }, { "Name": "Be Our Guest", "RegImage": "/332-7-42240.png", "GoldImage": "/42-240-42240.webm", "Sounds": [] }, { "Name": "Be Our Guest", "RegImage": "/332-10-42241.png", "GoldImage": "/42-241-42241.webm", "Sounds": [] }, { "Name": "Black Pawn", "RegImage": "/332-13-42242.png", "GoldImage": "/42-242-42242.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A10_02_Male_ChessPiece_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A10_02_Male_ChessPiece_Death_01.ogg" }, { "Name": "Death2", "URL": "/BlackPawn_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A10_02_Male_ChessPiece_Play_02.ogg" }, { "Name": "Play2", "URL": "/BlackPawn_Play_Underlay.ogg" }] }, { "Name": "White Pawn", "RegImage": "/332-16-42243.png", "GoldImage": "/42-243-42243.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A10_01_Male_ChessPiece_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A10_01_Male_ChessPiece_Death_01.ogg" }, { "Name": "Death2", "URL": "/Sword1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A10_01_Male_ChessPiece_Play_02.ogg" }, { "Name": "Play2", "URL": "/Sword1_Play_Underlay.ogg" }] }, { "Name": "Black Rook", "RegImage": "/332-19-42244.png", "GoldImage": "/42-244-42244.webm", "Sounds": [{ "Name": "Death1", "URL": "/BlackRook_Death.ogg" }, { "Name": "Play1", "URL": "/BlackRook_Play.ogg" }] }, { "Name": "White Rook", "RegImage": "/332-22-42245.png", "GoldImage": "/42-245-42245.webm", "Sounds": [{ "Name": "Death1", "URL": "/Minion_SFX_WhiteRook_KAR_A10_04_Death_02.ogg" }, { "Name": "Play1", "URL": "/Minion_SFX_WhiteRook_KAR_A10_04_Play_06.ogg" }] }, { "Name": "White Bishop", "RegImage": "/332-25-42246.png", "GoldImage": "/42-246-42246.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A10_05_Male_ChessPiece_Play_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A10_05_Male_ChessPiece_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A10_05_Male_ChessPiece_Play_01.ogg" }, { "Name": "Play2", "URL": "/WhiteBishop_Underlay_Play.ogg" }] }, { "Name": "Black Bishop", "RegImage": "/332-28-42247.png", "GoldImage": "/42-247-42247.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A10_06_Male_ChessPiece_Play_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A10_06_Male_ChessPiece_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A10_06_Male_ChessPiece_Play_01.ogg" }, { "Name": "Play2", "URL": "/BlackBishop_Play_Underlay.ogg" }] }, { "Name": "Black Knight", "RegImage": "/332-31-42248.png", "GoldImage": "/42-248-42248.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ArmoredWarhorse1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/ArmoredWarhorse1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/ArmoredWarhorseNoVox_Play_Underlay.ogg" }] }, { "Name": "White Knight", "RegImage": "/332-34-42249.png", "GoldImage": "/42-249-42249.webm", "Sounds": [{ "Name": "Attack1", "URL": "/KAR_A10_05_WhiteKnight_Attack_01.ogg" }, { "Name": "Death1", "URL": "/KAR_A10_05_WhiteKnight_Death_01.ogg" }, { "Name": "Play1", "URL": "/KAR_A10_05_WhiteKnight_Play_01.ogg" }] }, { "Name": "White Queen", "RegImage": "/332-37-42250.png", "GoldImage": "/42-250-42250.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A10_09_Female_ChessPiece_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A10_09_Female_ChessPiece_Death_01.ogg" }, { "Name": "Death2", "URL": "/WhiteQueen_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A10_09_Female_ChessPiece_Play_01.ogg" }, { "Name": "Play2", "URL": "/WhiteQueen_Underlay_Play.ogg" }] }, { "Name": "Black Queen", "RegImage": "/332-40-42251.png", "GoldImage": "/42-251-42251.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_A10_10_Female_ChessPiece_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_A10_10_Female_ChessPiece_Death_01.ogg" }, { "Name": "Death2", "URL": "/BlackQueen_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_A10_10_Female_ChessPiece_Play_01.ogg" }, { "Name": "Play2", "URL": "/BlackQueen_Play_Underlay.ogg" }] }, { "Name": "Castle", "RegImage": "/332-43-42252.png", "GoldImage": "/42-252-42252.webm", "Sounds": [] }, { "Name": "Castle", "RegImage": "/332-46-42253.png", "GoldImage": "/42-253-42253.webm", "Sounds": [] }, { "Name": "Cheat", "RegImage": "/332-49-42254.png", "GoldImage": "/42-254-42254.webm", "Sounds": [] }, { "Name": "White King", "RegImage": "/332-52-42255.png", "GoldImage": "/42-255-42255.webm", "Sounds": [] }, { "Name": "White King", "RegImage": "/332-55-42256.png", "GoldImage": "/42-256-42256.webm", "Sounds": [] }, { "Name": "Black King", "RegImage": "/332-64-42257.png", "GoldImage": "/42-257-42257.webm", "Sounds": [] }, { "Name": "Black King", "RegImage": "/332-67-42258.png", "GoldImage": "/42-258-42258.webm", "Sounds": [] }, { "Name": "Lesser Heal", "RegImage": "/329-874-42259.png", "GoldImage": "/42-259-42259.webm", "Sounds": [] }, { "Name": "Heal", "RegImage": "/329-877-42260.png", "GoldImage": "/42-260-42260.webm", "Sounds": [] }, { "Name": "Tyrande Whisperwind", "RegImage": "/331-755-42261.png", "GoldImage": "/42-261-42261.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_09a_Attack_15.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_09a_DEATH_63.ogg" }] }, { "Name": "White King", "RegImage": "/332-58-42262.png", "GoldImage": "/42-262-42262.webm", "Sounds": [] }, { "Name": "Black King", "RegImage": "/332-70-42263.png", "GoldImage": "/42-263-42263.webm", "Sounds": [] }, { "Name": "Dorothee", "RegImage": "/334-278-42264.png", "GoldImage": "/42-264-42264.webm", "Sounds": [] }, { "Name": "Homing Chicken", "RegImage": "/333-78-423.png", "GoldImage": "/0-423-423.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_Mekka1_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_Mekka1_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_Mekka1_EnterPlay.ogg" }] }, { "Name": "Coldlight Seer", "RegImage": "/330-501-424.png", "GoldImage": "/0-424-424.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_103_Coldlight_Seer_Attack2.ogg" }, { "Name": "Death1", "URL": "/EX1_103_Coldlight_Seer_Death2.ogg" }, { "Name": "Play1", "URL": "/EX1_103_Coldlight_Seer_EnterPlay1.ogg" }] }, { "Name": "Alarm-o-Bot", "RegImage": "/330-351-425.png", "GoldImage": "/0-425-425.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_006_AlarmOBot_Attack1.ogg" }, { "Name": "Death1", "URL": "/EX1_006_AlarmOBot_Death2.ogg" }, { "Name": "Play1", "URL": "/EX1_006_AlarmOBot_EnterPlay1.ogg" }] }, { "Name": "Acolyte of Pain", "RegImage": "/330-354-428.png", "GoldImage": "/0-428-428.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_007_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_007_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_007_Play_01.ogg" }] }, { "Name": "Mortal Coil", "RegImage": "/330-740-43.png", "GoldImage": "/0-43-43.webm", "Collectible": true, "Sounds": [] }, { "Name": "Mark of Nature", "RegImage": "/330-579-430.png", "GoldImage": "/0-430-430.webm", "Sounds": [] }, { "Name": "Power Word: Shield", "RegImage": "/329-883-431.png", "GoldImage": "/0-431-431.webm", "Collectible": true, "Sounds": [] }, { "Name": "Onyxia", "RegImage": "/330-995-432.png", "GoldImage": "/0-432-432.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_562_Attack_03.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_562_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_562_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Deathwing.ogg" }] }, { "Name": "Assassin's Blade", "RegImage": "/330-45-433.png", "GoldImage": "/0-433-433.webm", "Collectible": true, "Sounds": [] }, { "Name": "Shattered Sun Cleric", "RegImage": "/330-387-434.png", "GoldImage": "/0-434-434.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_019_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_019_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_019_Play_01.ogg" }] }, { "Name": "Novice Engineer", "RegImage": "/330-378-435.png", "GoldImage": "/0-435-435.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_015_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_015_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_015_Play_01.ogg" }] }, { "Name": "Lightwarden", "RegImage": "/330-339-436.png", "GoldImage": "/0-436-436.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_001_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_001_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_001_Play_01.ogg" }] }, { "Name": "Mind Vision", "RegImage": "/329-880-438.png", "GoldImage": "/0-438-438.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Shaman_FarSight_PreCast.ogg" }] }, { "Name": "Repair Bot", "RegImage": "/333-81-439.png", "GoldImage": "/0-439-439.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_Mekka2_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_Mekka2_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_Mekka2_EnterPlay.ogg" }] }, { "Name": "Flamestrike", "RegImage": "/329-940-44.png", "GoldImage": "/0-44-44.webm", "Collectible": true, "Sounds": [] }, { "Name": "Legacy of the Emperor", "RegImage": "/334-818-441.png", "GoldImage": "/0-441-441.webm", "Sounds": [] }, { "Name": "Shadow Madness", "RegImage": "/330-797-442.png", "GoldImage": "/0-442-442.webm", "Collectible": true, "Sounds": [] }, { "Name": "Hogger SMASH!", "RegImage": "/334-743-443.png", "GoldImage": "/0-443-443.webm", "Sounds": [] }, { "Name": "King Mukla", "RegImage": "/334-755-444.png", "GoldImage": "/0-444-444.webm", "Sounds": [] }, { "Name": "Misdirection", "RegImage": "/330-938-447.png", "GoldImage": "/0-447-447.webm", "Collectible": true, "Sounds": [] }, { "Name": "Druid of the Claw", "RegImage": "/330-632-45.png", "GoldImage": "/0-45-45.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_165t2_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_165t2_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_165t2_EnterPlay.ogg" }] }, { "Name": "Faceless Manipulator", "RegImage": "/331-1-450.png", "GoldImage": "/0-450-450.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/WoW_EX1_564_FacelessManipulator_Attack.ogg" }, { "Name": "Death1", "URL": "/WoW_EX1_564_FacelessManipulator_Death.ogg" }, { "Name": "Play1", "URL": "/WoW_EX1_564_FacelessManipulator_EnterPlay.ogg" }] }, { "Name": "Spirit Wolf", "RegImage": "/331-159-451.png", "GoldImage": "/0-451-451.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_tk11_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_tk11_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_tk11_EnterPlay.ogg" }] }, { "Name": "Demonfire", "RegImage": "/331-73-452.png", "GoldImage": "/0-452-452.webm", "Collectible": true, "Sounds": [] }, { "Name": "Bloodsail Corsair", "RegImage": "/333-501-453.png", "GoldImage": "/0-453-453.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_025_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_025_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_025_Play_01.ogg" }] }, { "Name": "Rampage", "RegImage": "/330-111-454.png", "GoldImage": "/0-454-454.webm", "Collectible": true, "Sounds": [] }, { "Name": "Flame of Azzinoth", "RegImage": "/334-794-455.png", "GoldImage": "/0-455-455.webm", "Sounds": [{ "Name": "Attack1", "URL": "/TU4e_002t_Flame_of_Azzinoth_Attack.ogg" }, { "Name": "Death1", "URL": "/TU4e_002t_Flame_of_Azzinoth_Death.ogg" }, { "Name": "Play1", "URL": "/TU4e_002t_Flame_of_Azzinoth_Play.ogg" }] }, { "Name": "Lorewalker Cho", "RegImage": "/330-495-456.png", "GoldImage": "/0-456-456.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_Tutorial06_CHO_03_01.ogg" }, { "Name": "Death1", "URL": "/VO_Tutorial06_CHO_22_03.ogg" }, { "Name": "Play1", "URL": "/VO_Tutorial06_CHO_02_03.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Pandaria_2.ogg" }] }, { "Name": "Holy Fire", "RegImage": "/331-141-457.png", "GoldImage": "/0-457-457.webm", "Collectible": true, "Sounds": [] }, { "Name": "Keeper of the Grove", "RegImage": "/330-635-459.png", "GoldImage": "/0-459-459.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_166_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_166_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_166_Play_01.ogg" }] }, { "Name": "Argent Commander", "RegImage": "/330-456-463.png", "GoldImage": "/0-463-463.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_067_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_067_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_067_Play_01.ogg" }] }, { "Name": "Starfall", "RegImage": "/333-441-464.png", "GoldImage": "/0-464-464.webm", "Collectible": true, "Sounds": [] }, { "Name": "Doomsayer", "RegImage": "/333-489-467.png", "GoldImage": "/0-467-467.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_021_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_021_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_021_Play_01.ogg" }] }, { "Name": "Squirrel", "RegImage": "/331-162-469.png", "GoldImage": "/0-469-469.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_tk28_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_tk28_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_tk28_EnterPlay.ogg" }] }, { "Name": "Razorfen Hunter", "RegImage": "/330-225-47.png", "GoldImage": "/0-47-47.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_196_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_196_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_196_Play_01.ogg" }] }, { "Name": "Hemet Nesingwary", "RegImage": "/334-779-470.png", "GoldImage": "/0-470-470.webm", "Sounds": [] }, { "Name": "Backstab", "RegImage": "/330-27-471.png", "GoldImage": "/0-471-471.webm", "Collectible": true, "Sounds": [] }, { "Name": "Dragonling Mechanic", "RegImage": "/330-399-472.png", "GoldImage": "/0-472-472.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_025_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_025_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_025_Play_01.ogg" }] }, { "Name": "Argent Squire", "RegImage": "/330-357-473.png", "GoldImage": "/0-473-473.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_008_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_008_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_008_Play_01.ogg" }] }, { "Name": "Deathwing", "RegImage": "/333-516-474.png", "GoldImage": "/0-474-474.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_030_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_030_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_030_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Deathwing3.ogg" }] }, { "Name": "Scarlet Crusader", "RegImage": "/330-390-475.png", "GoldImage": "/0-475-475.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_020_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_020_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_020_Play_01.ogg" }] }, { "Name": "Fen Creeper", "RegImage": "/329-856-476.png", "GoldImage": "/0-476-476.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_CS1_069_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_CS1_069_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_CS1_069_EnterPlay.ogg" }] }, { "Name": "Tauren Warrior", "RegImage": "/330-860-477.png", "GoldImage": "/0-477-477.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_390_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_390_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_390_Play_01.ogg" }] }, { "Name": "Kobold Geomancer", "RegImage": "/330-162-479.png", "GoldImage": "/0-479-479.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_142_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_142_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_142_Play_01.ogg" }] }, { "Name": "Mark of the Wild", "RegImage": "/329-895-480.png", "GoldImage": "/0-480-480.webm", "Collectible": true, "Sounds": [] }, { "Name": "Steady Shot", "RegImage": "/330-330-481.png", "GoldImage": "/0-481-481.webm", "Sounds": [] }, { "Name": "Lord Jaraxxus", "RegImage": "/330-785-482.png", "GoldImage": "/0-482-482.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_323_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_323_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_323_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Demon_HumanVillain.ogg" }] }, { "Name": "Secretkeeper", "RegImage": "/330-462-483.png", "GoldImage": "/0-483-483.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_080_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_080_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_080_Play_01.ogg" }] }, { "Name": "Rexxar", "RegImage": "/331-731-484.png", "GoldImage": "/0-484-484.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_05_Attack_16.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_05_Death_17.ogg" }] }, { "Name": "Nourish", "RegImage": "/330-616-485.png", "GoldImage": "/0-485-485.webm", "Sounds": [] }, { "Name": "Murloc Scout", "RegImage": "/330-920-486.png", "GoldImage": "/0-486-486.webm", "Sounds": [{ "Name": "Attack1", "URL": "/EX1_506a_Murloc_Tidehunter_Attack1.ogg" }, { "Name": "Death1", "URL": "/EX1_506a_Murloc_Tidehunter_Death1.ogg" }, { "Name": "Play1", "URL": "/EX1_506a_Murloc_Tidehunter_EnterPlay1.ogg" }] }, { "Name": "Kill Command", "RegImage": "/330-959-488.png", "GoldImage": "/0-488-488.webm", "Collectible": true, "Sounds": [] }, { "Name": "Arcane Intellect", "RegImage": "/329-916-489.png", "GoldImage": "/0-489-489.webm", "Collectible": true, "Sounds": [] }, { "Name": "Frost Nova", "RegImage": "/329-925-49.png", "GoldImage": "/0-49-49.webm", "Collectible": true, "Sounds": [] }, { "Name": "Hogger", "RegImage": "/334-734-490.png", "GoldImage": "/0-490-490.webm", "Sounds": [] }, { "Name": "Rockbiter Weapon", "RegImage": "/329-976-491.png", "GoldImage": "/0-491-491.webm", "Collectible": true, "Sounds": [] }, { "Name": "Shield Block", "RegImage": "/331-88-493.png", "GoldImage": "/0-493-493.webm", "Collectible": true, "Sounds": [] }, { "Name": "Warglaive of Azzinoth", "RegImage": "/334-800-494.png", "GoldImage": "/0-494-494.webm", "Sounds": [] }, { "Name": "Ysera", "RegImage": "/331-16-495.png", "GoldImage": "/0-495-495.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_572_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_572_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_572_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Dragon_Good.ogg" }, { "Name": "Trigger1", "URL": "/Ysera_DreamCardSummon_1.ogg" }] }, { "Name": "Pyroblast", "RegImage": "/330-713-496.png", "GoldImage": "/0-496-496.webm", "Collectible": true, "Sounds": [] }, { "Name": "Piranha Launcher", "RegImage": "/329-64-49618.png", "GoldImage": "/49-618-49618.webm", "Collectible": true, "Sounds": [] }, { "Name": "Lotus Assassin", "RegImage": "/329-268-49619.png", "GoldImage": "/49-619-49619.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_634_Male_Pandaren_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/SwordHeavy_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_634_Male_Pandaren_Death_01.ogg" }, { "Name": "Death2", "URL": "/SwordHeavy_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_634_Male_Pandaren_Play_01.ogg" }, { "Name": "Play2", "URL": "/SwordHeavy_Underlay_Play.ogg" }] }, { "Name": "Kabal Talonpriest", "RegImage": "/329-259-49620.png", "GoldImage": "/49-620-49620.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_626_Male_Arakkoa_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_626_Male_Arakkoa_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_626_Male_Arakkoa_Play_01.ogg" }] }, { "Name": "Kabal Courier", "RegImage": "/329-295-49621.png", "GoldImage": "/49-621-49621.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_649_Female_Harpy_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/WingFlapMedium_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_649_Female_Harpy_Death_01.ogg" }, { "Name": "Death2", "URL": "/WingFlapMedium_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_649_Female_Harpy_Play_01.ogg" }, { "Name": "Play2", "URL": "/WingFlapMedium_Underlay_Play.ogg" }] }, { "Name": "Kazakus", "RegImage": "/329-136-49622.png", "GoldImage": "/49-622-49622.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_621_Male_ShadowTroll_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_621_Male_ShadowTroll_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_621_Male_ShadowTroll_Play_01.ogg" }, { "Name": "Play2", "URL": "/Troll_Play_Stinger_2.ogg" }] }, { "Name": "I Know a Guy", "RegImage": "/329-589-49623.png", "GoldImage": "/49-623-49623.webm", "Collectible": true, "Sounds": [] }, { "Name": "Patches the Pirate", "RegImage": "/329-274-49624.png", "GoldImage": "/49-624-49624.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_637_Male_Beholder_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/FloatingWatcher_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_637_Male_Beholder_Death_01.ogg" }, { "Name": "Death2", "URL": "/FloatingWatcher_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_637_Male_Beholder_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pirate_Play_Stinger_2.ogg" }, { "Name": "Play3", "URL": "/FloatingWatcher_Play_Underlay.ogg" }] }, { "Name": "Big-Time Racketeer", "RegImage": "/329-289-49625.png", "GoldImage": "/49-625-49625.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_648_Male_Goblin_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_648_Male_Goblin_Death_01.ogg" }, { "Name": "Death2", "URL": "/RocketLauncher_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_648_Male_Goblin_Play_02.ogg" }, { "Name": "Play2", "URL": "/Rocket_Underlay_Play.ogg" }] }, { "Name": "Second-Rate Bruiser", "RegImage": "/329-304-49626.png", "GoldImage": "/49-626-49626.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_652_Male_Ogre_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_652_Male_Ogre_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_652_Male_Ogre_Play_02.ogg" }] }, { "Name": "Grimestreet Informant", "RegImage": "/329-37-49627.png", "GoldImage": "/49-627-49627.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_321_Male_OrcAdolescent_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/Sword1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_321_Male_OrcAdolescent_Death_02.ogg" }, { "Name": "Death2", "URL": "/AlleyArmorsmith_Underlay_Death.ogg" }, { "Name": "Death3", "URL": "/SergeantSally_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_321_Male_OrcAdolescent_Play_02.ogg" }] }, { "Name": "Kun the Forgotten King", "RegImage": "/329-4-49628.png", "GoldImage": "/49-628-49628.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_308_Male_Mogu_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_308_Male_Mogu_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_308_Male_Mogu_Play_01.ogg" }, { "Name": "Play2", "URL": "/Mogu_Play_Stinger_1.ogg" }] }, { "Name": "Lotus Agents", "RegImage": "/329-568-49629.png", "GoldImage": "/49-629-49629.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_852_Female_Pandaren_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Swords1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_852_Female_Pandaren_Death_01.ogg" }, { "Name": "Death2", "URL": "/Swords1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_852_Female_Pandaren_Play_01.ogg" }, { "Name": "Play2", "URL": "/Swords1_Play_Underlay.ogg" }] }, { "Name": "Potion of Madness", "RegImage": "/329-94-49630.png", "GoldImage": "/49-630-49630.webm", "Collectible": true, "Sounds": [] }, { "Name": "Small-Time Recruits", "RegImage": "/329-586-49631.png", "GoldImage": "/49-631-49631.webm", "Collectible": true, "Sounds": [] }, { "Name": "Finja, the Flying Star", "RegImage": "/329-82-49632.png", "GoldImage": "/49-632-49632.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_344_Male_Murloc_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Finja_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_344_Male_Murloc_Death_02.ogg" }, { "Name": "Death2", "URL": "/Finja_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_344_Male_Murloc_Play_01.ogg" }, { "Name": "Play2", "URL": "/Finja_Underlay_Play.ogg" }, { "Name": "Play3", "URL": "/Finja_Play_Stinger.ogg" }] }, { "Name": "Wickerflame Burnbristle", "RegImage": "/339-153-49633.png", "GoldImage": "/49-633-49633.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_815_Male_Dwarf_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Cannon_Underlay_Play.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_815_Male_Dwarf_Death_01.ogg" }, { "Name": "Death2", "URL": "/Wickerflame_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_815_Male_Dwarf_Play_02.ogg" }, { "Name": "Play2", "URL": "/Burnbristle_Play_Stinger.ogg" }] }, { "Name": "Kooky Chemist", "RegImage": "/328-974-49634.png", "GoldImage": "/49-634-49634.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_063_Male_Undead_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Potion_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_063_Male_Undead_Death_01.ogg" }, { "Name": "Death2", "URL": "/Potion_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/Potion_Underlay_Play_03.ogg" }, { "Name": "Play2", "URL": "/VO_CFM_063_Male_Undead_Play_01.ogg" }] }, { "Name": "Lunar Visions", "RegImage": "/329-556-49635.png", "GoldImage": "/49-635-49635.webm", "Collectible": true, "Sounds": [] }, { "Name": "Pilfered Power", "RegImage": "/329-124-49636.png", "GoldImage": "/49-636-49636.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Nature_Target_Start_01.ogg" }] }, { "Name": "Manic Soulcaster", "RegImage": "/329-328-49637.png", "GoldImage": "/49-637-49637.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_660_Female_BloodElf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_660_Female_BloodElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_660_Female_BloodElf_Play_01.ogg" }] }, { "Name": "Drakonid Operative", "RegImage": "/329-100-49638.png", "GoldImage": "/49-638-49638.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_605_Male_Drakanoid_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_605_Male_Drakanoid_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_605_Male_Drakanoid_Play_02.ogg" }] }, { "Name": "Fel Orc Soulfiend", "RegImage": "/329-112-49639.png", "GoldImage": "/49-639-49639.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_609_Male_FelOrc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_609_Male_FelOrc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_609_Male_FelOrc_Play_01.ogg" }] }, { "Name": "Getaway Kodo", "RegImage": "/329-538-49640.png", "GoldImage": "/49-640-49640.webm", "Collectible": true, "Sounds": [{ "Name": "Trigger1", "URL": "/spell_Redemption_target_1.ogg" }] }, { "Name": "Meanstreet Marshal", "RegImage": "/329-526-49641.png", "GoldImage": "/49-641-49641.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_759_Male_Tuskarr_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_759_Male_Tuskarr_Death_01.ogg" }, { "Name": "Death2", "URL": "/Shotgun_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_759_Male_Tuskarr_Play_01.ogg" }, { "Name": "Play2", "URL": "/Shotgun_Underlay_Play.ogg" }] }, { "Name": "Mark of the Lotus", "RegImage": "/329-121-49642.png", "GoldImage": "/49-642-49642.webm", "Collectible": true, "Sounds": [] }, { "Name": "Counterfeit Coin", "RegImage": "/329-262-49643.png", "GoldImage": "/49-643-49643.webm", "Collectible": true, "Sounds": [] }, { "Name": "Pint-Size Potion", "RegImage": "/329-331-49644.png", "GoldImage": "/49-644-49644.webm", "Collectible": true, "Sounds": [] }, { "Name": "Friendly Bartender", "RegImage": "/329-310-49645.png", "GoldImage": "/49-645-49645.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_654_Male_Tauren_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/FriendlyBartender_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_654_Male_Tauren_Death_01.ogg" }, { "Name": "Death2", "URL": "/FriendlyBartender_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_654_Male_Tauren_Play_01.ogg" }, { "Name": "Play2", "URL": "/FriendlyBartender_Underlay_Play.ogg" }] }, { "Name": "Mistress of Mixtures", "RegImage": "/328-995-49646.png", "GoldImage": "/49-646-49646.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_120_Female_Undead_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Potion_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_120_Female_Undead_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_120_Female_Undead_Play_01.ogg" }, { "Name": "Play2", "URL": "/Potion_Underlay_Play_01.ogg" }] }, { "Name": "Wind-up Burglebot", "RegImage": "/328-956-49647.png", "GoldImage": "/49-647-49647.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_025_Male_Mech_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/CleanMechSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_025_Male_Mech_Death_01.ogg" }, { "Name": "Death2", "URL": "/CleanMechSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_025_Male_Mech_Play_01.ogg" }, { "Name": "Play2", "URL": "/CleanMechSmall_Play_Underlay.ogg" }, { "Name": "Play3", "URL": "/GadgetzanAuctioneer_card_spawn_coins.ogg" }] }, { "Name": "Dragonfire Potion", "RegImage": "/329-334-49648.png", "GoldImage": "/49-648-49648.webm", "Collectible": true, "Sounds": [] }, { "Name": "Shaku, the Collector", "RegImage": "/329-532-49657.png", "GoldImage": "/49-657-49657.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_781_Male_Sha_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/ShakuTheCollector_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_781_Male_Sha_Death_01.ogg" }, { "Name": "Death2", "URL": "/ShakuTheCollector_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_781_Male_Sha_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pandaria_Play_Stinger_1.ogg" }, { "Name": "Play3", "URL": "/ShakuTheCollector_Underlay_Play.ogg" }] }, { "Name": "Grook Fu Master", "RegImage": "/329-343-49658.png", "GoldImage": "/49-658-49658.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_666_Male_Hozen_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/Staff_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_666_Male_Hozen_Death_01.ogg" }, { "Name": "Death2", "URL": "/Staff_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_666_Male_Hozen_Play_01.ogg" }, { "Name": "Play2", "URL": "/Staff_Underlay_Play.ogg" }] }, { "Name": "Auctionmaster Beardo", "RegImage": "/329-544-49659.png", "GoldImage": "/49-659-49659.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_807_Male_Goblin_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Coin_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_807_Male_Goblin_Death_01.ogg" }, { "Name": "Death2", "URL": "/Coin_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_807_Male_Goblin_Play_01.ogg" }, { "Name": "Play2", "URL": "/Goblin_Play_Stinger_2.ogg" }] }, { "Name": "Trogg Beastrager", "RegImage": "/329-70-49660.png", "GoldImage": "/49-660-49660.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_338_Male_Trogg_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_338_Male_Trogg_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_338_Male_Trogg_Play_01.ogg" }, { "Name": "Play2", "URL": "/HarrisonJ_EX1_558_whip_attack.ogg" }] }, { "Name": "Stolen Goods", "RegImage": "/329-511-49661.png", "GoldImage": "/49-661-49661.webm", "Collectible": true, "Sounds": [] }, { "Name": "Grimestreet Outfitter", "RegImage": "/329-514-49662.png", "GoldImage": "/49-662-49662.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_753_Male_Goblin_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_753_Male_Goblin_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_753_Male_Goblin_Play_01.ogg" }] }, { "Name": "Alley Armorsmith", "RegImage": "/329-523-49663.png", "GoldImage": "/49-663-49663.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_756_Female_Orc_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/AlleyArmorsmith_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_756_Female_Orc_Death_01.ogg" }, { "Name": "Death2", "URL": "/AlleyArmorsmith_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_756_Female_Orc_Play_01.ogg" }, { "Name": "Play2", "URL": "/AlleyArmorsmith_Underlay_Play.ogg" }] }, { "Name": "Grimestreet Smuggler", "RegImage": "/329-571-49664.png", "GoldImage": "/49-664-49664.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_853_Female_Tauren_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_853_Female_Tauren_Death_02.ogg" }, { "Name": "Death2", "URL": "/MachineGun_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_853_Female_Tauren_Play_01.ogg" }, { "Name": "Play2", "URL": "/MachineGun_Underlay_Play.ogg" }] }, { "Name": "Grimestreet Enforcer", "RegImage": "/329-277-49667.png", "GoldImage": "/49-667-49667.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_639_Male_Dwarf_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/SergeantSally_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_639_Male_Dwarf_Death_01.ogg" }, { "Name": "Death2", "URL": "/AlleyArmorsmith_Underlay_Death.ogg" }, { "Name": "Death3", "URL": "/SergeantSally_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_639_Male_Dwarf_Play_01.ogg" }] }, { "Name": "Grimestreet Pawnbroker", "RegImage": "/329-520-49668.png", "GoldImage": "/49-668-49668.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_755_Female_Goblin_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_755_Female_Goblin_Death_01.ogg" }, { "Name": "Death2", "URL": "/RocketLauncher_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_755_Female_Goblin_Play_01.ogg" }, { "Name": "Play2", "URL": "/Rocket_Underlay_Play.ogg" }] }, { "Name": "Shaky Zipgunner", "RegImage": "/329-61-49669.png", "GoldImage": "/49-669-49669.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_336_Male_Gnoll_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_336_Male_Gnoll_Death_01.ogg" }, { "Name": "Death2", "URL": "/Shotgun_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_336_Male_Gnoll_Play_01.ogg" }, { "Name": "Play2", "URL": "/Blunderbuss_Underlay_Play.ogg" }] }, { "Name": "Worgen Greaser", "RegImage": "/329-340-49670.png", "GoldImage": "/49-670-49670.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_665_Male_Worgen_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_665_Male_Worgen_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_665_Male_Worgen_Play_01.ogg" }] }, { "Name": "Hired Gun", "RegImage": "/329-307-49671.png", "GoldImage": "/49-671-49671.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_653_Male_Orc_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Cannon_Underlay_Play.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_653_Male_Orc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_653_Male_Orc_Play_01.ogg" }] }, { "Name": "Blowgill Sniper", "RegImage": "/329-286-49672.png", "GoldImage": "/49-672-49672.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_647_Male_Murloc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_647_Male_Murloc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_647_Male_Murloc_Play_01.ogg" }] }, { "Name": "Dirty Rat", "RegImage": "/329-535-49673.png", "GoldImage": "/49-673-49673.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_790_Male_Kobold_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_790_Male_Kobold_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_790_Male_Kobold_Play_03.ogg" }] }, { "Name": "Dispatch Kodo", "RegImage": "/329-58-49674.png", "GoldImage": "/49-674-49674.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CFM_ClumsyKodo_Attack.ogg" }, { "Name": "Attack2", "URL": "/ArmoredKodoNoVox_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/CFM_ClumsyKodo_Death.ogg" }, { "Name": "Death2", "URL": "/ArmoredKodoNoVox_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/CFM_ClumsyKodo_Play.ogg" }, { "Name": "Play2", "URL": "/ArmoredKodoNoVox_Play_Underlay.ogg" }] }, { "Name": "Backroom Bouncer", "RegImage": "/329-322-49675.png", "GoldImage": "/49-675-49675.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_658_Male_Tauren_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_658_Male_Tauren_Death_06.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_658_Male_Tauren_Play_03.ogg" }] }, { "Name": "Smuggler's Run", "RegImage": "/329-1-49676.png", "GoldImage": "/49-676-49676.webm", "Collectible": true, "Sounds": [] }, { "Name": "Doppelgangster", "RegImage": "/329-349-49677.png", "GoldImage": "/49-677-49677.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_668_Male_Dwarf_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_668_Male_Dwarf_Death_01.ogg" }, { "Name": "Death2", "URL": "/Shotgun_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_668_Male_Dwarf_Play_02.ogg" }, { "Name": "Play2", "URL": "/Shotgun_Underlay_Play.ogg" }] }, { "Name": "Grimestreet Protector", "RegImage": "/328-971-49678.png", "GoldImage": "/49-678-49678.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_062_Male_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_062_Male_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_062_Male_Human_Play_01.ogg" }] }, { "Name": "Grimy Gadgeteer", "RegImage": "/329-517-49679.png", "GoldImage": "/49-679-49679.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_754_Male_Goblin_Attack_03.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_754_Male_Goblin_Death_02.ogg" }, { "Name": "Death2", "URL": "/MachineGun_Underlay_Death.ogg" }, { "Name": "Death3", "URL": "/LuckyDoBuccaneer_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_754_Male_Goblin_Play_01.ogg" }, { "Name": "Play2", "URL": "/MachineGun_Underlay_Play.ogg" }] }, { "Name": "Brass Knuckles", "RegImage": "/329-265-49680.png", "GoldImage": "/49-680-49680.webm", "Collectible": true, "Sounds": [] }, { "Name": "Rat Pack", "RegImage": "/329-31-49681.png", "GoldImage": "/49-681-49681.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_316_Male_Rat_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_316_Male_Rat_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_316_Male_Rat_Play.ogg" }] }, { "Name": "Knuckles", "RegImage": "/329-52-49682.png", "GoldImage": "/49-682-49682.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CFM_Knuckles_Attack.ogg" }, { "Name": "Death1", "URL": "/CFM_Knuckles_Death.ogg" }, { "Name": "Play1", "URL": "/CFM_Knuckles_Play.ogg" }, { "Name": "Play2", "URL": "/Knuckles_Play_Stinger.ogg" }] }, { "Name": "Don Han'Cho", "RegImage": "/329-370-49683.png", "GoldImage": "/49-683-49683.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_685_Male_Ogre_Attack_01_Hon.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_685_Male_Ogre_Death_01_Hon.ogg" }, { "Name": "Death2", "URL": "/MachineGun_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_685_Male_Ogre_Play_01_Hon.ogg" }, { "Name": "Play2", "URL": "/DonHanCho_Play_Stinger.ogg" }, { "Name": "Play3", "URL": "/MachineGun_Underlay_Play.ogg" }] }, { "Name": "Madam Goya", "RegImage": "/329-367-49684.png", "GoldImage": "/49-684-49684.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_672_Female_Pandaren_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_672_Female_Pandaren_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_672_Female_Pandaren_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pandaria_Play_Stinger_3.ogg" }] }, { "Name": "Grimscale Chum", "RegImage": "/329-298-49685.png", "GoldImage": "/49-685-49685.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_650_Male_Murloc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_650_Male_Murloc_Death_01.ogg" }, { "Name": "Death2", "URL": "/RocketLauncher_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_650_Male_Murloc_Play_04.ogg" }, { "Name": "Play2", "URL": "/Rocket_Underlay_Play.ogg" }] }, { "Name": "Leatherclad Hogleader", "RegImage": "/329-553-49686.png", "GoldImage": "/49-686-49686.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_810_Female_Quilboar_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/LeathercladHogleader_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_810_Female_Quilboar_Attack_02.ogg" }, { "Name": "Death2", "URL": "/Hogrider_Skid_Underaly_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_810_Female_Quilboar_Play_01.ogg" }, { "Name": "Play2", "URL": "/LeathercladHogleader_Underlay_Play.ogg" }] }, { "Name": "Spiked Hogrider", "RegImage": "/329-376-49687.png", "GoldImage": "/49-687-49687.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_688_Male_Quilboar_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/SpikedHogrider_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_688_Male_Quilboar_Death_01.ogg" }, { "Name": "Death2", "URL": "/Hogrider_Skid_Underaly_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_688_Male_Quilboar_Play_01.ogg" }, { "Name": "Play2", "URL": "/SpikedHogrider_Underlay_Play.ogg" }] }, { "Name": "Tanaris Hogchopper", "RegImage": "/329-550-49688.png", "GoldImage": "/49-688-49688.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_809_Male_Quilboar_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/TanarisHogchopper_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_809_Male_Quilboar_Death_01.ogg" }, { "Name": "Death2", "URL": "/Hogrider_Skid_Underaly_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_809_Male_Quilboar_Play_01.ogg" }, { "Name": "Play2", "URL": "/TanarisHogchopper_Underlay_Play.ogg" }] }, { "Name": "Volcanic Potion", "RegImage": "/328-980-49689.png", "GoldImage": "/49-689-49689.webm", "Collectible": true, "Sounds": [] }, { "Name": "Kabal Chemist", "RegImage": "/329-130-49690.png", "GoldImage": "/49-690-49690.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_619_Female_BloodElf_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Potion_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_619_Female_BloodElf_Death_01.ogg" }, { "Name": "Death2", "URL": "/Potion_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_619_Female_BloodElf_Play_02.ogg" }, { "Name": "Play2", "URL": "/Potion_Underlay_Play_02.ogg" }, { "Name": "Play3", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Abyssal Enforcer", "RegImage": "/329-508-49691.png", "GoldImage": "/49-691-49691.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/AbyssalEnforcer_CFM_751_Attack.ogg" }, { "Name": "Death1", "URL": "/AbyssalEnforcer_CFM_751_Death.ogg" }, { "Name": "Play1", "URL": "/AbyssalEnforcer_CFM_751_Play.ogg" }] }, { "Name": "Kabal Lackey", "RegImage": "/328-983-49692.png", "GoldImage": "/49-692-49692.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_066_Male_Goren_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Potion_Kabal_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_066_Male_Goren_Death_01.ogg" }, { "Name": "Death2", "URL": "/Potion_Kabal_Underlay_Death.ogg" }, { "Name": "Death3", "URL": "/GlassShatter_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_066_Male_Goren_Play_01.ogg" }, { "Name": "Play2", "URL": "/Potion_Kabal_Underlay_Play.ogg" }] }, { "Name": "Inkmaster Solia", "RegImage": "/329-373-49693.png", "GoldImage": "/49-693-49693.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_687_Female_BloodElf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_687_Female_BloodElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_687_Female_BloodElf_Play_02.ogg" }, { "Name": "Play2", "URL": "/Troll_Play_Stinger_3.ogg" }] }, { "Name": "Potion of Polymorph", "RegImage": "/329-133-49694.png", "GoldImage": "/49-694-49694.webm", "Collectible": true, "Sounds": [] }, { "Name": "Seadevil Stinger", "RegImage": "/329-397-49695.png", "GoldImage": "/49-695-49695.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_699_Male_Murloc_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/ShadowMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_699_Male_Murloc_Death_01.ogg" }, { "Name": "Death2", "URL": "/ShadowMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_699_Male_Murloc_Play_01.ogg" }, { "Name": "Play2", "URL": "/ShadowMagic_Play_Underlay.ogg" }] }, { "Name": "Bomb Squad", "RegImage": "/329-346-49696.png", "GoldImage": "/49-696-49696.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_667_Female_Goblin_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Cannon_Underlay_Play.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_667_Female_Goblin_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_667_Female_Goblin_Play_01.ogg" }, { "Name": "Play2", "URL": "/Cannon_Underlay_Play.ogg" }] }, { "Name": "Backstreet Leper", "RegImage": "/329-283-49697.png", "GoldImage": "/49-697-49697.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_646_Male_Gnome_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/Potion_Kabal_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_646_Male_Gnome_Death_01.ogg" }, { "Name": "Death2", "URL": "/Potion_Kabal_Underlay_Death.ogg" }, { "Name": "Death3", "URL": "/GlassShatter_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_646_Male_Gnome_Play_01.ogg" }, { "Name": "Play2", "URL": "/Potion_Kabal_Underlay_Play.ogg" }] }, { "Name": "Bloodfury Potion", "RegImage": "/329-118-49698.png", "GoldImage": "/49-698-49698.webm", "Collectible": true, "Sounds": [] }, { "Name": "Felfire Potion", "RegImage": "/328-989-49699.png", "GoldImage": "/49-699-49699.webm", "Collectible": true, "Sounds": [] }, { "Name": "Kabal Crystal Runner", "RegImage": "/329-529-49700.png", "GoldImage": "/49-700-49700.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_760_Female_Dranei_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/KabalCrystalRunner_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_760_Female_Dranei_Death_01.ogg" }, { "Name": "Death2", "URL": "/KabalCrystalRunner_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_760_Female_Dranei_Play_01.ogg" }, { "Name": "Play2", "URL": "/KabalCrystalRunner_Underlay_Play.ogg" }] }, { "Name": "Toxic Sewer Ooze", "RegImage": "/329-313-49701.png", "GoldImage": "/49-701-49701.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ToxicSewerOoze_CFM_655_Attack.ogg" }, { "Name": "Death1", "URL": "/ToxicSewerOoze_CFM_655_Death.ogg" }, { "Name": "Play1", "URL": "/ToxicSewerOoze_CFM_655_Play.ogg" }] }, { "Name": "Raza the Chained", "RegImage": "/328-950-49702.png", "GoldImage": "/49-702-49702.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_020_Male_Ethereal_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/RazaTheUnchained_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_020_Male_Ethereal_Death_01.ogg" }, { "Name": "Death2", "URL": "/RazaTheUnchained_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_020_Male_Ethereal_Play_01.ogg" }, { "Name": "Play2", "URL": "/RazaTheUnchained_Underlay_Play.ogg" }, { "Name": "Play3", "URL": "/Cursed_Play_Stinger_2.ogg" }] }, { "Name": "Jade Blossom", "RegImage": "/329-493-49703.png", "GoldImage": "/49-703-49703.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Nature_Target_Start_01.ogg" }] }, { "Name": "Burgly Bully", "RegImage": "/329-358-49704.png", "GoldImage": "/49-704-49704.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_669_Male_Trogg_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/Coin_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_669_Male_Trogg_Death_01.ogg" }, { "Name": "Death2", "URL": "/Coin_Underlay_Death.ogg" }, { "Name": "Death3", "URL": "/Shotgun_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_669_Male_Trogg_Attack_01.ogg" }, { "Name": "Play2", "URL": "/Coin_Underlay_Play.ogg" }, { "Name": "Play3", "URL": "/Blunderbuss_Underlay_Play.ogg" }, { "Name": "Trigger1", "URL": "/GadgetzanAuctioneer_card_spawn_coins.ogg" }] }, { "Name": "Mana Geode", "RegImage": "/329-103-49705.png", "GoldImage": "/49-705-49705.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ManaGeode_CFM_606_Attack.ogg" }, { "Name": "Death1", "URL": "/ManaGeode_CFM_606_Death.ogg" }, { "Name": "Play1", "URL": "/ManaGeode_CFM_606_Play.ogg" }] }, { "Name": "Aya Blackpaw", "RegImage": "/329-583-49706.png", "GoldImage": "/49-706-49706.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_902_Female_Pandaren_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/AyaBlackpaw_Underlay_Play.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_902_Female_Pandaren_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_902_Female_Pandaren_Play_02.ogg" }, { "Name": "Play2", "URL": "/Pandaria_Play_Stinger_2.ogg" }] }, { "Name": "Jade Lightning", "RegImage": "/329-400-49707.png", "GoldImage": "/49-707-49707.webm", "Collectible": true, "Sounds": [] }, { "Name": "Jade Spirit", "RegImage": "/329-496-49708.png", "GoldImage": "/49-708-49708.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CFM_715_JadeElemental_Attack.ogg" }, { "Name": "Death1", "URL": "/CFM_715_JadeElemental_Death.ogg" }, { "Name": "Play1", "URL": "/CFM_715_JadeElemental_Play.ogg" }] }, { "Name": "Hozen Healer", "RegImage": "/328-986-49710.png", "GoldImage": "/49-710-49710.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_067_Male_Hozen_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Lotus_Underlay_Attack.ogg" }, { "Name": "Attack3", "URL": "/VerminSensei_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_067_Male_Hozen_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_067_Male_Hozen_Play_03.ogg" }, { "Name": "Play2", "URL": "/Lotus_Underlay_Play.ogg" }, { "Name": "Play3", "URL": "/VerminSensei_Underlay_Play.ogg" }] }, { "Name": "Jade Shuriken", "RegImage": "/329-379-49711.png", "GoldImage": "/49-711-49711.webm", "Collectible": true, "Sounds": [] }, { "Name": "Fight Promoter", "RegImage": "/329-49-49712.png", "GoldImage": "/49-712-49712.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_328_Female_Orc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_328_Female_Orc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_328_Female_Orc_Play_03.ogg" }, { "Name": "Play2", "URL": "/CoinFlip_Underlay_Play.ogg" }] }, { "Name": "Jade Swarmer", "RegImage": "/329-382-49713.png", "GoldImage": "/49-713-49713.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_691_Male_Mantid_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Swords1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_691_Male_Mantid_Death_01.ogg" }, { "Name": "Death2", "URL": "/Swords1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_691_Male_Mantid_Play_01.ogg" }, { "Name": "Play2", "URL": "/Swords1_Play_Underlay.ogg" }] }, { "Name": "Jade Idol", "RegImage": "/329-85-49714.png", "GoldImage": "/49-714-49714.webm", "Collectible": true, "Sounds": [] }, { "Name": "Devolve", "RegImage": "/329-391-49715.png", "GoldImage": "/49-715-49715.webm", "Collectible": true, "Sounds": [] }, { "Name": "Call in the Finishers", "RegImage": "/329-13-49716.png", "GoldImage": "/49-716-49716.webm", "Collectible": true, "Sounds": [] }, { "Name": "Jade Behemoth", "RegImage": "/329-79-49718.png", "GoldImage": "/49-718-49718.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/JadeElekk_CFM_343_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeElekk_CFM_343_Death.ogg" }, { "Name": "Play1", "URL": "/JadeElekk_CFM_343_Play.ogg" }] }, { "Name": "Jinyu Waterspeaker", "RegImage": "/328-968-49719.png", "GoldImage": "/49-719-49719.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_061_Male_Jinyu_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_061_Male_Jinyu_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_061_Male_Jinyu_Play_01.ogg" }, { "Name": "Play2", "URL": "/JinyuWaterspeaker_Underlay_Play.ogg" }] }, { "Name": "Jade Chieftain", "RegImage": "/329-19-49720.png", "GoldImage": "/49-720-49720.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_312_Male_Mogu_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_312_Male_Mogu_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_312_Male_Mogu_Play_01.ogg" }] }, { "Name": "Virmen Sensei", "RegImage": "/329-562-49721.png", "GoldImage": "/49-721-49721.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_816_Male_Vermin_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/VerminSensei_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_816_Male_Vermin_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_816_Male_Vermin_Play_01.ogg" }, { "Name": "Play2", "URL": "/VerminSensei_Underlay_Play.ogg" }] }, { "Name": "Gadgetzan Ferryman", "RegImage": "/329-385-49722.png", "GoldImage": "/49-722-49722.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_693_Female_Jinyu_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/GadgetzanFerryman_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_693_Female_Jinyu_Death_01.ogg" }, { "Name": "Death2", "URL": "/GadgetzanFerryman_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_693_Female_Jinyu_Play_01.ogg" }, { "Name": "Play2", "URL": "/GadgetzanFerryman_Underlay_Play.ogg" }] }, { "Name": "Daring Reporter", "RegImage": "/329-565-49723.png", "GoldImage": "/49-723-49723.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_851_Female_NightElf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_851_Female_NightElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_851_Female_NightElf_Play_01.ogg" }] }, { "Name": "Jade Claws", "RegImage": "/329-502-49724.png", "GoldImage": "/49-724-49724.webm", "Collectible": true, "Sounds": [] }, { "Name": "Shadow Sensei", "RegImage": "/329-388-49725.png", "GoldImage": "/49-725-49725.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_694_Male_Mantid_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/SwordHeavy_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_694_Male_Mantid_Death_01.ogg" }, { "Name": "Death2", "URL": "/SwordHeavy_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_694_Male_Mantid_Play_01.ogg" }, { "Name": "Play2", "URL": "/SwordHeavy_Underlay_Play.ogg" }] }, { "Name": "White Eyes", "RegImage": "/329-40-49726.png", "GoldImage": "/49-726-49726.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_324_Male_Pandaren_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/SwordHeavy_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_324_Male_Pandaren_Death_01.ogg" }, { "Name": "Death2", "URL": "/SwordHeavy_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_324_Male_Pandaren_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pandaria_Play_Stinger_4.ogg" }, { "Name": "Play3", "URL": "/SwordHeavy_Underlay_Play.ogg" }] }, { "Name": "Sergeant Sally", "RegImage": "/329-73-49728.png", "GoldImage": "/49-728-49728.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_341_Female_Gnome_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/SergeantSally_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_341_Female_Gnome_Death_01.ogg" }, { "Name": "Death2", "URL": "/SergeantSally_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_341_Female_Gnome_Play_01.ogg" }, { "Name": "Play2", "URL": "/Gnome_Play_Stinger_4.ogg" }, { "Name": "Play3", "URL": "/SergeantSally_Underlay_Play.ogg" }] }, { "Name": "Hobart Grapplehammer", "RegImage": "/329-280-49729.png", "GoldImage": "/49-729-49729.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_643_Male_Goblin_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Cogmaster_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_643_Male_Goblin_Death_01.ogg" }, { "Name": "Death2", "URL": "/Cogmaster_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_643_Male_Goblin_Play_01.ogg" }, { "Name": "Play2", "URL": "/Gnome_Play_Stinger_3.ogg" }, { "Name": "Play3", "URL": "/Cogmaster_Play_Underlay.ogg" }] }, { "Name": "Naga Corsair", "RegImage": "/329-301-49730.png", "GoldImage": "/49-730-49730.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_651_Female_Naga_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/NagaCorsair_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_651_Female_Naga_Death_01.ogg" }, { "Name": "Death2", "URL": "/NagaCorsair_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_651_Female_Naga_Play_01.ogg" }, { "Name": "Play2", "URL": "/BlackQueen_Play_Underlay.ogg" }] }, { "Name": "Wrathion", "RegImage": "/329-541-49731.png", "GoldImage": "/49-731-49731.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_806_Male_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_806_Male_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_806_Male_Human_Play_02.ogg" }, { "Name": "Play2", "URL": "/Wrathion_Play_Stinger.ogg" }] }, { "Name": "Public Defender", "RegImage": "/328-998-49732.png", "GoldImage": "/49-732-49732.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_300_Male_Tauren_Attack_03.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_300_Male_Tauren_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_300_Male_Tauren_Play_01.ogg" }] }, { "Name": "Ancient of Blossoms", "RegImage": "/329-574-49733.png", "GoldImage": "/49-733-49733.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CFM_AncientofBlossoms_Attack.ogg" }, { "Name": "Death1", "URL": "/CFM_AncientofBlossoms_Death.ogg" }, { "Name": "Play1", "URL": "/CFM_AncientofBlossoms_Play.ogg" }] }, { "Name": "Freezing Potion", "RegImage": "/328-953-49734.png", "GoldImage": "/49-734-49734.webm", "Collectible": true, "Sounds": [] }, { "Name": "Smuggler's Crate", "RegImage": "/329-55-49735.png", "GoldImage": "/49-735-49735.webm", "Collectible": true, "Sounds": [] }, { "Name": "Hidden Cache", "RegImage": "/328-959-49736.png", "GoldImage": "/49-736-49736.webm", "Collectible": true, "Sounds": [] }, { "Name": "Genzo, the Shark", "RegImage": "/329-547-49737.png", "GoldImage": "/49-737-49737.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_808_Male_Undead_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_808_Male_Undead_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_808_Male_Undead_Play_01.ogg" }, { "Name": "Play2", "URL": "/Undercity_Play_Stinger_1.ogg" }] }, { "Name": "Defias Cleaner", "RegImage": "/329-577-49738.png", "GoldImage": "/49-738-49738.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_855_Male_Human_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/DefiasCleaner_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_855_Male_Human_Death_01.ogg" }, { "Name": "Death2", "URL": "/DefiasCleaner_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_855_Male_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/DefiasCleaner_Underlay_Play.ogg" }] }, { "Name": "Cryomancer", "RegImage": "/339-149-49739.png", "GoldImage": "/49-739-49739.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_671_Female_Wretched_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/FrostMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_671_Female_Wretched_Death_01.ogg" }, { "Name": "Death2", "URL": "/FrostMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_671_Female_Wretched_Play_03.ogg" }, { "Name": "Play2", "URL": "/FrostMagic_Play_Underlay.ogg" }] }, { "Name": "Greater Arcane Missiles", "RegImage": "/329-256-49740.png", "GoldImage": "/49-740-49740.webm", "Collectible": true, "Sounds": [] }, { "Name": "Blastcrystal Potion", "RegImage": "/329-109-49741.png", "GoldImage": "/49-741-49741.webm", "Collectible": true, "Sounds": [] }, { "Name": "Kabal Trafficker", "RegImage": "/329-337-49742.png", "GoldImage": "/49-742-49742.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_663_Female_Undead_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/KabalTrafficker_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_663_Female_Undead_Death_01.ogg" }, { "Name": "Death2", "URL": "/Potion_Kabal_Underlay_Death.ogg" }, { "Name": "Death3", "URL": "/GlassShatter_Underlay_Death.ogg" }, { "Name": "Death4", "URL": "/GlassShatter_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_663_Female_Undead_Play_01.ogg" }, { "Name": "Play2", "URL": "/KabalTrafficker_Underlay_Play.ogg" }, { "Name": "Trigger1", "URL": "/SpawnToHand_DemonPortal_Sound.ogg" }, { "Name": "Trigger2", "URL": "/SpawnToHand_DemonPortal_Sound.ogg" }] }, { "Name": "Gadgetzan Socialite", "RegImage": "/329-325-49743.png", "GoldImage": "/49-743-49743.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_659_Female_Gnome_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_659_Female_Gnome_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_659_Female_Gnome_Play_01.ogg" }] }, { "Name": "Krul the Unshackled", "RegImage": "/329-505-49744.png", "GoldImage": "/49-744-49744.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_750_Male_VoidWalker_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/RazaTheUnchained_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_750_Male_VoidWalker_Death_01.ogg" }, { "Name": "Death2", "URL": "/RazaTheUnchained_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_750_Male_VoidWalker_Play_01.ogg" }, { "Name": "Play2", "URL": "/Mysterious_Play_Stinger_1.ogg" }, { "Name": "Play3", "URL": "/RazaTheUnchained_Underlay_Play.ogg" }] }, { "Name": "Alleycat", "RegImage": "/329-25-49745.png", "GoldImage": "/49-745-49745.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/GoldTuskCub_CFM_315_Attack.ogg" }, { "Name": "Death1", "URL": "/GoldTuskCub_CFM_315_Death.ogg" }, { "Name": "Play1", "URL": "/GoldTuskCub_CFM_315_Play.ogg" }] }, { "Name": "Sleep with the Fishes", "RegImage": "/329-499-49746.png", "GoldImage": "/49-746-49746.webm", "Collectible": true, "Sounds": [] }, { "Name": "Unlicensed Apothecary", "RegImage": "/329-580-49747.png", "GoldImage": "/49-747-49747.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_900_Male_Imp_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Potion_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_900_Male_Imp_Death_01.ogg" }, { "Name": "Death2", "URL": "/Potion_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_900_Male_Imp_Play_01.ogg" }, { "Name": "Play2", "URL": "/Potion_Underlay_Play_01.ogg" }] }, { "Name": "Celestial Dreamer", "RegImage": "/329-127-49748.png", "GoldImage": "/49-748-49748.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_617_Female_NightElf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_617_Female_NightElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_617_Female_NightElf_Play_01.ogg" }, { "Name": "Play2", "URL": "/CelestialDreamer_Underlay_Play.ogg" }] }, { "Name": "Finders Keepers", "RegImage": "/329-22-49749.png", "GoldImage": "/49-749-49749.webm", "Collectible": true, "Sounds": [] }, { "Name": "Crystalweaver", "RegImage": "/329-115-49750.png", "GoldImage": "/49-750-49750.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_610_Male_Dranei_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_610_Male_Dranei_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_610_Male_Dranei_Play_01.ogg" }] }, { "Name": "Lotus Illusionist", "RegImage": "/329-394-49751.png", "GoldImage": "/49-751-49751.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_697_Female_NightElf_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Lotus_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_697_Female_NightElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_697_Female_NightElf_Play_01.ogg" }, { "Name": "Play2", "URL": "/Lotus_Underlay_Play.ogg" }] }, { "Name": "Shadow Rager", "RegImage": "/329-271-49752.png", "GoldImage": "/49-752-49752.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CFM_636_ShadowRager_Attack.ogg" }, { "Name": "Death1", "URL": "/CFM_636_ShadowRager_Death.ogg" }, { "Name": "Play1", "URL": "/CFM_636_ShadowRager_Play.ogg" }] }, { "Name": "Kabal Songstealer", "RegImage": "/329-319-49753.png", "GoldImage": "/49-753-49753.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_657_Male_Arakkoa_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_657_Male_Arakkoa_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_657_Male_Arakkoa_Play_01.ogg" }] }, { "Name": "Luckydo Buccaneer", "RegImage": "/329-76-49754.png", "GoldImage": "/49-754-49754.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_BKP2_Male_Grummle_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/LuckyDoBuccaneer_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_BKP2_Male_Grummle_Death_01.ogg" }, { "Name": "Death2", "URL": "/LuckyDoBuccaneer_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_BKP2_Male_Grummle_Play_01.ogg" }, { "Name": "Play2", "URL": "/LuckyDoBuccaneer_Underlay_Play.ogg" }] }, { "Name": "Greater Healing Potion", "RegImage": "/329-97-49755.png", "GoldImage": "/49-755-49755.webm", "Collectible": true, "Sounds": [] }, { "Name": "Mayor Noggenfogger", "RegImage": "/329-361-49756.png", "GoldImage": "/49-756-49756.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_670_Male_Goblin_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Potion_Kabal_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_670_Male_Goblin_Death_01.ogg" }, { "Name": "Death2", "URL": "/Potion_Kabal_Underlay_Death.ogg" }, { "Name": "Death3", "URL": "/GlassShatter_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_670_Male_Goblin_Play_01.ogg" }, { "Name": "Play2", "URL": "/Goblin_Play_Stinger_3.ogg" }, { "Name": "Play3", "URL": "/Potion_Kabal_Underlay_Play.ogg" }] }, { "Name": "Streetwise Investigator", "RegImage": "/329-316-49757.png", "GoldImage": "/49-757-49757.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_656_Male_NightElf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_656_Male_NightElf_Death_01.ogg" }, { "Name": "Death2", "URL": "/Shotgun_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_656_Male_NightElf_Play_01.ogg" }, { "Name": "Play2", "URL": "/Blunderbuss_Underlay_Play.ogg" }] }, { "Name": "Weasel Tunneler", "RegImage": "/328-992-49758.png", "GoldImage": "/49-758-49758.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_095_Male_Weasel_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_095_Male_Weasel_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_095_Male_Weasel_Play.ogg" }] }, { "Name": "Small-Time Buccaneer", "RegImage": "/329-46-49759.png", "GoldImage": "/49-759-49759.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_325_Male_Gnome_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/Sword1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_325_Male_Gnome_Death_01.ogg" }, { "Name": "Death2", "URL": "/Sword1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_325_Male_Gnome_Play_01.ogg" }, { "Name": "Play2", "URL": "/Sword1_Play_Underlay.ogg" }] }, { "Name": "Blubber Baron", "RegImage": "/328-977-49760.png", "GoldImage": "/49-760-49760.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_064_Male_Tuskarr_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Coin_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_064_Male_Tuskarr_Death_01.ogg" }, { "Name": "Death2", "URL": "/Coin_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_064_Male_Tuskarr_Play_01.ogg" }, { "Name": "Play2", "URL": "/Coin_Underlay_Play.ogg" }] }, { "Name": "Street Trickster", "RegImage": "/328-962-49761.png", "GoldImage": "/49-761-49761.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_039_Male_Imp_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_039_Male_Imp_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_039_Male_Imp_Play_01.ogg" }] }, { "Name": "Red Mana Wyrm", "RegImage": "/328-965-49762.png", "GoldImage": "/49-762-49762.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CFM_RedManaWyrm_Attack.ogg" }, { "Name": "Death1", "URL": "/CFM_RedManaWyrm_Death.ogg" }, { "Name": "Play1", "URL": "/CFM_RedManaWyrm_Play.ogg" }] }, { "Name": "Forgotten Armor", "RegImage": "/329-7-49769.png", "GoldImage": "/49-769-49769.webm", "Sounds": [] }, { "Name": "Forgotten Mana", "RegImage": "/329-10-49770.png", "GoldImage": "/49-770-49770.webm", "Sounds": [] }, { "Name": "Murloc Razorgill", "RegImage": "/329-16-49771.png", "GoldImage": "/49-771-49771.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_310t_Male_Murloc_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_310t_Male_Murloc_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_310t_Male_Murloc_Play.ogg" }] }, { "Name": "Tabbycat", "RegImage": "/329-28-49772.png", "GoldImage": "/49-772-49772.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SilverTuskCub_CFM_315e_Attack.ogg" }, { "Name": "Death1", "URL": "/SilverTuskCub_CFM_315e_Death.ogg" }, { "Name": "Play1", "URL": "/SilverTuskCub_CFM_315e_Play.ogg" }] }, { "Name": "Rat", "RegImage": "/329-34-49773.png", "GoldImage": "/49-773-49773.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Rat_CFM_316t_Attack.ogg" }, { "Name": "Death1", "URL": "/Rat_CFM_316t_Death.ogg" }, { "Name": "Play1", "URL": "/Rat_CFM_316t_Play.ogg" }, { "Name": "Play2", "URL": "/Rat_Underlay_Play.ogg" }] }, { "Name": "The Storm Guardian", "RegImage": "/329-43-49774.png", "GoldImage": "/49-774-49774.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_324t_Male_Pandaren_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_324t_Male_Pandaren_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_324t_Male_Pandaren_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pandaria_Play_Stinger_5.ogg" }] }, { "Name": "Piranha", "RegImage": "/329-67-49779.png", "GoldImage": "/49-779-49779.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Piranha_CFM_337t_Attack.ogg" }, { "Name": "Death1", "URL": "/Piranha_CFM_337t_Death.ogg" }, { "Name": "Play1", "URL": "/Piranha_CFM_337t_Play.ogg" }] }, { "Name": "Jade Idol", "RegImage": "/329-88-49782.png", "GoldImage": "/49-782-49782.webm", "Sounds": [] }, { "Name": "Jade Idol", "RegImage": "/329-91-49783.png", "GoldImage": "/49-783-49783.webm", "Sounds": [] }, { "Name": "Crystal", "RegImage": "/329-106-49785.png", "GoldImage": "/49-785-49785.webm", "Sounds": [{ "Name": "Attack1", "URL": "/CFM_606t_CrystalShard_Attack.ogg" }, { "Name": "Death1", "URL": "/CFM_606t_CrystalShard_Death.ogg" }, { "Name": "Death2", "URL": "/GlassShatter_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/CFM_606t_CrystalShard_Play.ogg" }] }, { "Name": "Kabal Demon", "RegImage": "/329-139-49791.png", "GoldImage": "/49-791-49791.webm", "Sounds": [{ "Name": "Attack1", "URL": "/KabalDemon_Attack.ogg" }, { "Name": "Death1", "URL": "/KabalDemon_Death.ogg" }, { "Name": "Play1", "URL": "/KabalDemon_Play.ogg" }] }, { "Name": "Kabal Demon", "RegImage": "/329-142-49792.png", "GoldImage": "/49-792-49792.webm", "Sounds": [{ "Name": "Attack1", "URL": "/KabalDemon_Attack.ogg" }, { "Name": "Death1", "URL": "/KabalDemon_Death.ogg" }, { "Name": "Play1", "URL": "/KabalDemon_Play.ogg" }] }, { "Name": "Kabal Demon", "RegImage": "/329-145-49793.png", "GoldImage": "/49-793-49793.webm", "Sounds": [{ "Name": "Attack1", "URL": "/KabalDemon_Attack.ogg" }, { "Name": "Death1", "URL": "/KabalDemon_Death.ogg" }, { "Name": "Play1", "URL": "/KabalDemon_Play.ogg" }] }, { "Name": "Sheep", "RegImage": "/329-148-49794.png", "GoldImage": "/49-794-49794.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_CS2_tk1_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_CS2_tk1_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_CS2_tk1_EnterPlay.ogg" }] }, { "Name": "Kazakus Potion", "RegImage": "/329-151-49798.png", "GoldImage": "/49-798-49798.webm", "Sounds": [] }, { "Name": "Netherbloom", "RegImage": "/329-154-49799.png", "GoldImage": "/49-799-49799.webm", "Sounds": [] }, { "Name": "Cairne Bloodhoof", "RegImage": "/330-507-498.png", "GoldImage": "/0-498-498.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_110_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_110_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_110_Play_01.ogg" }, { "Name": "Play2", "URL": "/VO_EX1_110_Alternate_04.ogg" }, { "Name": "Play3", "URL": "/Pegasus_Stinger_Horde2.ogg" }] }, { "Name": "Lesser Potion", "RegImage": "/329-157-49800.png", "GoldImage": "/49-800-49800.webm", "Sounds": [] }, { "Name": "Greater Potion", "RegImage": "/329-160-49801.png", "GoldImage": "/49-801-49801.webm", "Sounds": [] }, { "Name": "Superior Potion", "RegImage": "/329-163-49802.png", "GoldImage": "/49-802-49802.webm", "Sounds": [] }, { "Name": "Kazakus Potion", "RegImage": "/329-166-49803.png", "GoldImage": "/49-803-49803.webm", "Sounds": [] }, { "Name": "Kazakus Potion", "RegImage": "/329-169-49804.png", "GoldImage": "/49-804-49804.webm", "Sounds": [] }, { "Name": "Heart of Fire", "RegImage": "/329-172-49805.png", "GoldImage": "/49-805-49805.webm", "Sounds": [] }, { "Name": "Stonescale Oil", "RegImage": "/329-175-49806.png", "GoldImage": "/49-806-49806.webm", "Sounds": [] }, { "Name": "Felbloom", "RegImage": "/329-178-49807.png", "GoldImage": "/49-807-49807.webm", "Sounds": [] }, { "Name": "Icecap", "RegImage": "/329-181-49808.png", "GoldImage": "/49-808-49808.webm", "Sounds": [] }, { "Name": "Heart of Fire", "RegImage": "/329-184-49809.png", "GoldImage": "/49-809-49809.webm", "Sounds": [] }, { "Name": "Netherbloom", "RegImage": "/329-187-49810.png", "GoldImage": "/49-810-49810.webm", "Sounds": [] }, { "Name": "Mystic Wool", "RegImage": "/329-190-49811.png", "GoldImage": "/49-811-49811.webm", "Sounds": [] }, { "Name": "Kingsblood", "RegImage": "/329-193-49812.png", "GoldImage": "/49-812-49812.webm", "Sounds": [] }, { "Name": "Shadow Oil", "RegImage": "/329-196-49813.png", "GoldImage": "/49-813-49813.webm", "Sounds": [{ "Name": "Play1", "URL": "/SpawnToHand_DemonPortal_Sound.ogg" }, { "Name": "Play2", "URL": "/SpawnToHand_DemonPortal_Sound.ogg" }] }, { "Name": "Goldthorn", "RegImage": "/329-199-49814.png", "GoldImage": "/49-814-49814.webm", "Sounds": [] }, { "Name": "Heart of Fire", "RegImage": "/329-202-49815.png", "GoldImage": "/49-815-49815.webm", "Sounds": [] }, { "Name": "Stonescale Oil", "RegImage": "/329-205-49816.png", "GoldImage": "/49-816-49816.webm", "Sounds": [] }, { "Name": "Icecap", "RegImage": "/329-208-49817.png", "GoldImage": "/49-817-49817.webm", "Sounds": [] }, { "Name": "Netherbloom", "RegImage": "/329-211-49818.png", "GoldImage": "/49-818-49818.webm", "Sounds": [] }, { "Name": "Mystic Wool", "RegImage": "/329-214-49819.png", "GoldImage": "/49-819-49819.webm", "Sounds": [] }, { "Name": "Stonescale Oil", "RegImage": "/329-217-49820.png", "GoldImage": "/49-820-49820.webm", "Sounds": [] }, { "Name": "Kingsblood", "RegImage": "/329-220-49821.png", "GoldImage": "/49-821-49821.webm", "Sounds": [] }, { "Name": "Shadow Oil", "RegImage": "/329-223-49822.png", "GoldImage": "/49-822-49822.webm", "Sounds": [{ "Name": "Play1", "URL": "/SpawnToHand_DemonPortal_Sound.ogg" }, { "Name": "Play2", "URL": "/SpawnToHand_DemonPortal_Sound.ogg" }] }, { "Name": "Goldthorn", "RegImage": "/329-226-49823.png", "GoldImage": "/49-823-49823.webm", "Sounds": [] }, { "Name": "Felbloom", "RegImage": "/329-229-49824.png", "GoldImage": "/49-824-49824.webm", "Sounds": [] }, { "Name": "Ichor of Undeath", "RegImage": "/329-232-49825.png", "GoldImage": "/49-825-49825.webm", "Sounds": [] }, { "Name": "Ichor of Undeath", "RegImage": "/329-235-49826.png", "GoldImage": "/49-826-49826.webm", "Sounds": [] }, { "Name": "Ichor of Undeath", "RegImage": "/329-238-49827.png", "GoldImage": "/49-827-49827.webm", "Sounds": [] }, { "Name": "Felbloom", "RegImage": "/329-241-49828.png", "GoldImage": "/49-828-49828.webm", "Sounds": [] }, { "Name": "Icecap", "RegImage": "/329-244-49829.png", "GoldImage": "/49-829-49829.webm", "Sounds": [] }, { "Name": "Goldthorn", "RegImage": "/329-247-49830.png", "GoldImage": "/49-830-49830.webm", "Sounds": [] }, { "Name": "Kingsblood", "RegImage": "/329-250-49831.png", "GoldImage": "/49-831-49831.webm", "Sounds": [] }, { "Name": "Shadow Oil", "RegImage": "/329-253-49832.png", "GoldImage": "/49-832-49832.webm", "Sounds": [{ "Name": "Play1", "URL": "/SpawnToHand_DemonPortal_Sound.ogg" }, { "Name": "Play2", "URL": "/SpawnToHand_DemonPortal_Sound.ogg" }] }, { "Name": "\"Little Friend\"", "RegImage": "/329-292-49838.png", "GoldImage": "/49-838-49838.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_648t_Male_Ogre_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_648t_Male_Ogre_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_648t_Male_Ogre_Play_02.ogg" }] }, { "Name": "Doppelgangster", "RegImage": "/329-352-49843.png", "GoldImage": "/49-843-49843.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_668t_Male_Faceless_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_668t_Male_Faceless_Death_01.ogg" }, { "Name": "Death2", "URL": "/Shotgun_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_668t_Male_Faceless_Play_05.ogg" }, { "Name": "Play2", "URL": "/Shotgun_Underlay_Play.ogg" }] }, { "Name": "Doppelgangster", "RegImage": "/329-355-49844.png", "GoldImage": "/49-844-49844.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_668t2_Male_Faceless_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CFM_668t2_Male_Faceless_Death_01.ogg" }, { "Name": "Death2", "URL": "/Shotgun_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_CFM_668t2_Male_Faceless_Play_05.ogg" }, { "Name": "Play2", "URL": "/Shotgun_Underlay_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-403-49850.png", "GoldImage": "/49-850-49850.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier1_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier1_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier1_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-406-49851.png", "GoldImage": "/49-851-49851.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier1_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier1_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier1_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-409-49852.png", "GoldImage": "/49-852-49852.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier1_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier1_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier1_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-412-49853.png", "GoldImage": "/49-853-49853.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-415-49854.png", "GoldImage": "/49-854-49854.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-418-49855.png", "GoldImage": "/49-855-49855.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-421-49856.png", "GoldImage": "/49-856-49856.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-424-49857.png", "GoldImage": "/49-857-49857.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-427-49858.png", "GoldImage": "/49-858-49858.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-430-49859.png", "GoldImage": "/49-859-49859.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-433-49860.png", "GoldImage": "/49-860-49860.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-436-49861.png", "GoldImage": "/49-861-49861.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-439-49862.png", "GoldImage": "/49-862-49862.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-442-49863.png", "GoldImage": "/49-863-49863.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-445-49864.png", "GoldImage": "/49-864-49864.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-448-49865.png", "GoldImage": "/49-865-49865.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-451-49866.png", "GoldImage": "/49-866-49866.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-454-49867.png", "GoldImage": "/49-867-49867.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-457-49868.png", "GoldImage": "/49-868-49868.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier2_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier2_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier2_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-460-49869.png", "GoldImage": "/49-869-49869.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier3_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier3_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier3_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-463-49870.png", "GoldImage": "/49-870-49870.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier3_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier3_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier3_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-466-49871.png", "GoldImage": "/49-871-49871.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier3_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier3_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier3_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-469-49872.png", "GoldImage": "/49-872-49872.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier3_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier3_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier3_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-472-49873.png", "GoldImage": "/49-873-49873.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier3_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier3_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier3_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-475-49874.png", "GoldImage": "/49-874-49874.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier3_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier3_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier3_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-478-49875.png", "GoldImage": "/49-875-49875.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier3_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier3_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier3_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-481-49876.png", "GoldImage": "/49-876-49876.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier3_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier3_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier3_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-484-49877.png", "GoldImage": "/49-877-49877.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier3_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier3_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier3_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-487-49878.png", "GoldImage": "/49-878-49878.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier3_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier3_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier3_Play.ogg" }] }, { "Name": "Jade Golem", "RegImage": "/329-490-49879.png", "GoldImage": "/49-879-49879.webm", "Sounds": [{ "Name": "Attack1", "URL": "/JadeGolem_Tier3_Attack.ogg" }, { "Name": "Death1", "URL": "/JadeGolem_Tier3_Death.ogg" }, { "Name": "Play1", "URL": "/JadeGolem_Tier3_Play.ogg" }] }, { "Name": "White King", "RegImage": "/332-61-49888.png", "GoldImage": "/49-888-49888.webm", "Sounds": [] }, { "Name": "Pile On!!!", "RegImage": "/334-125-49893.png", "GoldImage": "/49-893-49893.webm", "Sounds": [{ "Name": "Play1", "URL": "/Pile_On_card_draw.ogg" }] }, { "Name": "The Rookery", "RegImage": "/334-128-49894.png", "GoldImage": "/49-894-49894.webm", "Sounds": [] }, { "Name": "Gearmaster Mechazod", "RegImage": "/334-158-49895.png", "GoldImage": "/49-895-49895.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/Shared_Fire_Cast_Large_1.ogg" }] }, { "Name": "Main Tank", "RegImage": "/334-248-49896.png", "GoldImage": "/49-896-49896.webm", "Sounds": [] }, { "Name": "Follow MY Rules!", "RegImage": "/334-254-49897.png", "GoldImage": "/49-897-49897.webm", "Sounds": [] }, { "Name": "Cast from Shadow", "RegImage": "/334-257-49898.png", "GoldImage": "/49-898-49898.webm", "Sounds": [] }, { "Name": "Vicious Swipe", "RegImage": "/334-260-49899.png", "GoldImage": "/49-899-49899.webm", "Sounds": [] }, { "Name": "Hand of Protection", "RegImage": "/330-842-499.png", "GoldImage": "/0-499-499.webm", "Collectible": true, "Sounds": [] }, { "Name": "Meddling Fool!", "RegImage": "/334-263-49900.png", "GoldImage": "/49-900-49900.webm", "Sounds": [] }, { "Name": "Nefarian", "RegImage": "/334-272-49901.png", "GoldImage": "/49-901-49901.webm", "Sounds": [] }, { "Name": "Peruse", "RegImage": "/334-275-49902.png", "GoldImage": "/49-902-49902.webm", "Sounds": [] }, { "Name": "Dr. Boom Boom Boom Boom", "RegImage": "/334-293-49908.png", "GoldImage": "/49-908-49908.webm", "Sounds": [] }, { "Name": "Annoy-o-p-Tron", "RegImage": "/334-296-49911.png", "GoldImage": "/49-911-49911.webm", "Sounds": [] }, { "Name": "Dwarf Demolitionist", "RegImage": "/334-299-49912.png", "GoldImage": "/49-912-49912.webm", "Sounds": [] }, { "Name": "Force-Tank OMEGA MAX", "RegImage": "/334-302-49913.png", "GoldImage": "/49-913-49913.webm", "Sounds": [] }, { "Name": "Omegawarper", "RegImage": "/334-308-49914.png", "GoldImage": "/49-914-49914.webm", "Sounds": [] }, { "Name": "Ancient Power", "RegImage": "/334-434-49915.png", "GoldImage": "/49-915-49915.webm", "Sounds": [] }, { "Name": "The Portal Opens", "RegImage": "/334-551-49916.png", "GoldImage": "/49-916-49916.webm", "Sounds": [] }, { "Name": "Dark Wanderer", "RegImage": "/334-554-49917.png", "GoldImage": "/49-917-49917.webm", "Sounds": [] }, { "Name": "The Cow King", "RegImage": "/334-557-49918.png", "GoldImage": "/49-918-49918.webm", "Sounds": [{ "Name": "Attack1", "URL": "/CowKing_TB_SPT_DPromo_Hero2_Play.ogg" }, { "Name": "Death1", "URL": "/CowKing_TB_SPT_DPromo_Hero2_Death.ogg" }] }, { "Name": "Weapon Rack", "RegImage": "/334-560-49919.png", "GoldImage": "/49-919-49919.webm", "Sounds": [{ "Name": "Attack1", "URL": "/WeaponRack_Attack.ogg" }, { "Name": "Death1", "URL": "/WeaponRack_Death.ogg" }, { "Name": "Play1", "URL": "/WeaponRack_Play.ogg" }, { "Name": "Trigger1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Discarded Armor", "RegImage": "/334-563-49920.png", "GoldImage": "/49-920-49920.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Shield1_Attack_Underlay.ogg" }, { "Name": "Attack2", "URL": "/GiftCrate_Attack.ogg" }, { "Name": "Death1", "URL": "/Shield1_Death_Underlay.ogg" }, { "Name": "Death2", "URL": "/GiftCrate_Death.ogg" }, { "Name": "Play1", "URL": "/Shield1_Play_Underlay.ogg" }, { "Name": "Trigger1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Chest of Gold!", "RegImage": "/334-566-49921.png", "GoldImage": "/49-921-49921.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ChestOfGold_Attack.ogg" }, { "Name": "Attack2", "URL": "/GiftCrate_Attack.ogg" }, { "Name": "Death1", "URL": "/ChestOfGold_Death.ogg" }, { "Name": "Death2", "URL": "/GiftCrate_Death.ogg" }, { "Name": "Play1", "URL": "/ChestOfGold_Play.ogg" }] }, { "Name": "Twisting Nether?", "RegImage": "/334-569-49923.png", "GoldImage": "/49-923-49923.webm", "Sounds": [] }, { "Name": "Diabolical Powers", "RegImage": "/334-572-49924.png", "GoldImage": "/49-924-49924.webm", "Sounds": [] }, { "Name": "So Many...", "RegImage": "/334-575-49925.png", "GoldImage": "/49-925-49925.webm", "Sounds": [] }, { "Name": "Hell Bovine", "RegImage": "/334-578-49926.png", "GoldImage": "/49-926-49926.webm", "Sounds": [{ "Name": "Attack1", "URL": "/HellBovine_TB_SPT_DPromoMinion_Attack.ogg" }, { "Name": "Death1", "URL": "/HellBovine_TB_SPT_DPromoMinion_Death.ogg" }, { "Name": "Play1", "URL": "/HellBovine_TB_SPT_DPromoMinion_Play.ogg" }] }, { "Name": "Guardian", "RegImage": "/334-581-49927.png", "GoldImage": "/49-927-49927.webm", "Sounds": [{ "Name": "Death1", "URL": "/EX1_565_Death_FlameTongueTotem.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_565_Attack_00.ogg" }] }, { "Name": "Hell Bovine Champion", "RegImage": "/334-584-49928.png", "GoldImage": "/49-928-49928.webm", "Sounds": [{ "Name": "Attack1", "URL": "/HellBovineChampion_TB_SPT_DPromoMinionChamp_Attack.ogg" }, { "Name": "Death1", "URL": "/HellBovineChampion_TB_SPT_DPromoMinionChamp_Death.ogg" }, { "Name": "Play1", "URL": "/HellBovineChampion_TB_SPT_DPromoMinionChamp_Play.ogg" }] }, { "Name": "Hell Bovine", "RegImage": "/334-587-49929.png", "GoldImage": "/49-929-49929.webm", "Sounds": [{ "Name": "Attack1", "URL": "/HellBovine_TB_SPT_DPromoMinion_Attack.ogg" }, { "Name": "Death1", "URL": "/HellBovine_TB_SPT_DPromoMinion_Death.ogg" }] }, { "Name": "Enigmatic Portal", "RegImage": "/334-590-49930.png", "GoldImage": "/49-930-49930.webm", "Sounds": [{ "Name": "Play1", "URL": "/EnigmaticPortal_Play_Sound.ogg" }] }, { "Name": "Visions of the Assassin", "RegImage": "/334-593-49931.png", "GoldImage": "/49-931-49931.webm", "Sounds": [] }, { "Name": "Visions of the Barbarian", "RegImage": "/334-596-49933.png", "GoldImage": "/49-933-49933.webm", "Sounds": [] }, { "Name": "Visions of Hate", "RegImage": "/334-599-49934.png", "GoldImage": "/49-934-49934.webm", "Sounds": [] }, { "Name": "Visions of the Crusader", "RegImage": "/334-602-49935.png", "GoldImage": "/49-935-49935.webm", "Sounds": [] }, { "Name": "Visions of Valor", "RegImage": "/334-605-49936.png", "GoldImage": "/49-936-49936.webm", "Sounds": [] }, { "Name": "Visions of Fate", "RegImage": "/334-608-49937.png", "GoldImage": "/49-937-49937.webm", "Sounds": [] }, { "Name": "Visions of the Amazon", "RegImage": "/334-611-49938.png", "GoldImage": "/49-938-49938.webm", "Sounds": [] }, { "Name": "Visions of the Sorcerer", "RegImage": "/334-614-49939.png", "GoldImage": "/49-939-49939.webm", "Sounds": [] }, { "Name": "Visions of the Necromancer", "RegImage": "/334-617-49940.png", "GoldImage": "/49-940-49940.webm", "Sounds": [] }, { "Name": "Visions of Knowledge", "RegImage": "/334-620-49941.png", "GoldImage": "/49-941-49941.webm", "Sounds": [] }, { "Name": "Lightning", "RegImage": "/334-623-49943.png", "GoldImage": "/49-943-49943.webm", "Sounds": [] }, { "Name": "Summon Guardians", "RegImage": "/334-626-49944.png", "GoldImage": "/49-944-49944.webm", "Sounds": [] }, { "Name": "Moo...", "RegImage": "/334-629-49945.png", "GoldImage": "/49-945-49945.webm", "Sounds": [] }, { "Name": "The Portal Opens", "RegImage": "/334-632-49947.png", "GoldImage": "/49-947-49947.webm", "Sounds": [] }, { "Name": "Stampede", "RegImage": "/334-635-49948.png", "GoldImage": "/49-948-49948.webm", "Sounds": [] }, { "Name": "Shield Slam", "RegImage": "/330-905-50.png", "GoldImage": "/0-50-50.webm", "Collectible": true, "Sounds": [] }, { "Name": "Ironbeak Owl", "RegImage": "/330-237-500.png", "GoldImage": "/0-500-500.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_CS2_203_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_CS2_203_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_CS2_203_EnterPlay.ogg" }] }, { "Name": "Wrath", "RegImage": "/330-573-501.png", "GoldImage": "/0-501-501.webm", "Sounds": [] }, { "Name": "Raid Leader", "RegImage": "/330-144-502.png", "GoldImage": "/0-502-502.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_122_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/VO_CS2_122_Male_Orc_Attack_02.ogg" }, { "Name": "Attack3", "URL": "/VO_CS2_122_Male_Orc_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_122_Death_03.ogg" }, { "Name": "Death2", "URL": "/VO_CS2_122_Male_Orc_Death_03.ogg" }, { "Name": "Death3", "URL": "/VO_CS2_122_Male_Orc_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_122_Play_01.ogg" }, { "Name": "Play2", "URL": "/VO_CS2_122_Male_Orc_Play_01.ogg" }, { "Name": "Play3", "URL": "/VO_CS2_122_Male_Orc_Play_01.ogg" }] }, { "Name": "Ragnaros the Firelord", "RegImage": "/339-181-503.png", "GoldImage": "/0-503-503.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_298_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_298_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_298_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Elemental_Villain.ogg" }, { "Name": "Trigger1", "URL": "/VO_EX1_298_Trigger_03.ogg" }] }, { "Name": "Arathi Weaponsmith", "RegImage": "/330-875-504.png", "GoldImage": "/0-504-504.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_398_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_398_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_398_Play_01.ogg" }] }, { "Name": "Lay on Hands", "RegImage": "/330-821-506.png", "GoldImage": "/0-506-506.webm", "Collectible": true, "Sounds": [] }, { "Name": "Doomguard", "RegImage": "/330-758-507.png", "GoldImage": "/0-507-507.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_310_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_310_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_310_Play_01.ogg" }] }, { "Name": "Venture Co. Mercenary", "RegImage": "/330-252-509.png", "GoldImage": "/0-509-509.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_227_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_227_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_227_Play_01.ogg" }] }, { "Name": "Unbound Elemental", "RegImage": "/330-695-51.png", "GoldImage": "/0-51-51.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_258_Unbound_Elemental_Attack3.ogg" }, { "Name": "Death1", "URL": "/EX1_258_Unbound_Elemental_Death1.ogg" }, { "Name": "Play1", "URL": "/EX1_258_Unbound_Elemental_EnterPlay1.ogg" }, { "Name": "Trigger1", "URL": "/Shared_Rage_InnerRage_Impact_1.ogg" }, { "Name": "Trigger2", "URL": "/Lightning_Idle_03_Sound_01.ogg" }, { "Name": "Trigger3", "URL": "/Shared_Rage_InnerRage_Impact_1.ogg" }, { "Name": "Trigger4", "URL": "/Lightning_Idle_03_Sound_01.ogg" }] }, { "Name": "Grimscale Oracle", "RegImage": "/330-926-510.png", "GoldImage": "/0-510-510.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_508_Grimscale_Oracle_Attack2.ogg" }, { "Name": "Death1", "URL": "/EX1_508_Grimscale_Oracle_Death2.ogg" }, { "Name": "Play1", "URL": "/EX1_508_Grimscale_Oracle_EnterPlay1.ogg" }] }, { "Name": "Snake", "RegImage": "/330-974-512.png", "GoldImage": "/0-512-512.webm", "Sounds": [{ "Name": "Attack1", "URL": "/EX1_554t_Attack_Snake.ogg" }, { "Name": "Death1", "URL": "/EX1_554t_Death_Snake.ogg" }, { "Name": "Play1", "URL": "/EX1_554t_Play_Snake.ogg" }] }, { "Name": "Leper Gnome", "RegImage": "/330-408-513.png", "GoldImage": "/0-513-513.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_029_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_029_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_029_Play_01.ogg" }] }, { "Name": "Ancient Teachings", "RegImage": "/333-453-517.png", "GoldImage": "/0-517-517.webm", "Sounds": [] }, { "Name": "Ravenholdt Assassin", "RegImage": "/330-183-518.png", "GoldImage": "/0-518-518.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_161_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_161_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_161_Play_01.ogg" }] }, { "Name": "Ironfur Grizzly", "RegImage": "/330-150-519.png", "GoldImage": "/0-519-519.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CS2_125_Ironfur_Grizzly_Attack3.ogg" }, { "Name": "Death1", "URL": "/CS2_125_Ironfur_Grizzly_Death1.ogg" }, { "Name": "Play1", "URL": "/CS2_125_Ironfur_Grizzly_EnterPlay1.ogg" }] }, { "Name": "Excess Mana", "RegImage": "/329-907-520.png", "GoldImage": "/0-520-520.webm", "Sounds": [] }, { "Name": "Fireball", "RegImage": "/329-934-522.png", "GoldImage": "/0-522-522.webm", "Collectible": true, "Sounds": [] }, { "Name": "Violet Teacher", "RegImage": "/333-504-523.png", "GoldImage": "/0-523-523.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_026_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_026_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_026_Play_01.ogg" }] }, { "Name": "Dispel", "RegImage": "/330-641-524.png", "GoldImage": "/0-524-524.webm", "Sounds": [] }, { "Name": "Bloodmage Thalnos", "RegImage": "/330-369-525.png", "GoldImage": "/0-525-525.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_012_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_012_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_012_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Undead1.ogg" }] }, { "Name": "Volcano", "RegImage": "/334-869-52581.png", "GoldImage": "/52-581-52581.webm", "Collectible": true, "Sounds": [] }, { "Name": "Pyros", "RegImage": "/334-872-52582.png", "GoldImage": "/52-582-52582.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/Pyros_UNG_027_Attack.ogg" }, { "Name": "Death1", "URL": "/Pyros_UNG_027_Death.ogg" }, { "Name": "Play1", "URL": "/Pyros_UNG_027_Play.ogg" }, { "Name": "Play2", "URL": "/Pyros_Play_Stinger_1.ogg" }] }, { "Name": "Verdant Longneck", "RegImage": "/335-1-52583.png", "GoldImage": "/52-583-52583.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_100_VerdantMegasaur_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_100_VerdantMegasaur_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_100_VerdantMegasaur_Play.ogg" }] }, { "Name": "Amara, Warden of Hope", "RegImage": "/335-295-52584.png", "GoldImage": "/52-584-52584.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_940t8_Female_Titan_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_940t8_Female_Titan_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_940t8_Female_Titan_Play_01.ogg" }, { "Name": "Play2", "URL": "/Amara_Play_Stinger.ogg" }] }, { "Name": "Pyros", "RegImage": "/334-875-52585.png", "GoldImage": "/52-585-52585.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Pyros_UNG_027t2_Attack.ogg" }, { "Name": "Death1", "URL": "/Pyros_UNG_027t2_Death.ogg" }, { "Name": "Play1", "URL": "/Pyros_UNG_027t2_Play.ogg" }, { "Name": "Play2", "URL": "/Pyros_Play_Stinger_2.ogg" }] }, { "Name": "Pyros", "RegImage": "/334-878-52586.png", "GoldImage": "/52-586-52586.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Pyros_UNG_027t4_Attack.ogg" }, { "Name": "Death1", "URL": "/Pyros_UNG_027t4_Death.ogg" }, { "Name": "Play1", "URL": "/Pyros_UNG_027t4_Play.ogg" }, { "Name": "Play2", "URL": "/Pyros_Play_Stinger_3.ogg" }] }, { "Name": "Liquid Membrane", "RegImage": "/335-374-52587.png", "GoldImage": "/52-587-52587.webm", "Sounds": [{ "Name": "Play1", "URL": "/Liquid_Membrane_Impact_Sound.ogg" }, { "Name": "Play2", "URL": "/Liquid_Membrane_Impact_Sound.ogg" }] }, { "Name": "Awaken the Makers", "RegImage": "/335-292-52588.png", "GoldImage": "/52-588-52588.webm", "Collectible": true, "Sounds": [{ "Name": "Trigger1", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger2", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger3", "URL": "/add_LegendaryQuest_card_to_hand.ogg" }] }, { "Name": "Flaming Claws", "RegImage": "/335-368-52589.png", "GoldImage": "/52-589-52589.webm", "Sounds": [{ "Name": "Play1", "URL": "/Flaming_Claws_Impact_Sound.ogg" }, { "Name": "Play2", "URL": "/Flaming_Claws_Impact_Sound.ogg" }] }, { "Name": "Crackling Shield", "RegImage": "/335-383-52590.png", "GoldImage": "/52-590-52590.webm", "Sounds": [{ "Name": "Play1", "URL": "/Crackling_Shield_Impact_Sound.ogg" }, { "Name": "Play2", "URL": "/Crackling_Shield_Impact_Sound.ogg" }] }, { "Name": "Living Spores", "RegImage": "/335-362-52591.png", "GoldImage": "/52-591-52591.webm", "Sounds": [{ "Name": "Play1", "URL": "/Living_Spores_Impact_Sound.ogg" }, { "Name": "Play2", "URL": "/Living_Spores_Impact_Sound.ogg" }] }, { "Name": "Massive", "RegImage": "/335-377-52592.png", "GoldImage": "/52-592-52592.webm", "Sounds": [{ "Name": "Play1", "URL": "/Massive_Impact_Sound.ogg" }, { "Name": "Play2", "URL": "/Massive_Impact_Sound.ogg" }] }, { "Name": "Lightning Speed", "RegImage": "/335-380-52593.png", "GoldImage": "/52-593-52593.webm", "Sounds": [{ "Name": "Play1", "URL": "/Lightning_Speed_Impact_Sound.ogg" }, { "Name": "Play2", "URL": "/Lightning_Speed_Impact_Sound.ogg" }] }, { "Name": "Plant", "RegImage": "/335-365-52594.png", "GoldImage": "/52-594-52594.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Plant_UNG_999t2t1_Attack.ogg" }, { "Name": "Death1", "URL": "/Plant_UNG_999t2t1_Death.ogg" }, { "Name": "Play1", "URL": "/Plant_UNG_999t2t1_Play.ogg" }] }, { "Name": "Gentle Megasaur", "RegImage": "/334-995-52595.png", "GoldImage": "/52-595-52595.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_089_LumberingIsle_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_089_LumberingIsle_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_089_LumberingIsle_Play.ogg" }] }, { "Name": "Poison Spit", "RegImage": "/335-356-52596.png", "GoldImage": "/52-596-52596.webm", "Sounds": [{ "Name": "Play1", "URL": "/Poison_Spit_Impact_Sound.ogg" }, { "Name": "Play2", "URL": "/Poison_Spit_Impact_Sound.ogg" }] }, { "Name": "Rocky Carapace", "RegImage": "/335-371-52597.png", "GoldImage": "/52-597-52597.webm", "Sounds": [{ "Name": "Play1", "URL": "/Rocky_Carapace_Impact_Sound.ogg" }, { "Name": "Play2", "URL": "/Rocky_Carapace_Impact_Sound.ogg" }] }, { "Name": "Shrouding Mist", "RegImage": "/335-353-52598.png", "GoldImage": "/52-598-52598.webm", "Sounds": [{ "Name": "Play1", "URL": "/Shared_SneakyUntargettedImpactStandard_1.ogg" }, { "Name": "Play2", "URL": "/Shared_SneakyUntargettedImpactStandard_1.ogg" }] }, { "Name": "Volcanic Might", "RegImage": "/335-359-52599.png", "GoldImage": "/52-599-52599.webm", "Sounds": [{ "Name": "Play1", "URL": "/Volcanic_Might_Impact_Sound.ogg" }, { "Name": "Play2", "URL": "/Volcanic_Might_Impact_Sound.ogg" }] }, { "Name": "Ancestral Spirit", "RegImage": "/329-964-526.png", "GoldImage": "/0-526-526.webm", "Collectible": true, "Sounds": [] }, { "Name": "Han'Cho", "RegImage": "/334-107-52601.png", "GoldImage": "/52-601-52601.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_685_Male_Ogre_Attack_01_Hon.ogg" }, { "Name": "Death1", "URL": "/VO_BOSS_HAN_Male_Ogre_Death_02.ogg" }] }, { "Name": "Smuggle", "RegImage": "/334-110-52602.png", "GoldImage": "/52-602-52602.webm", "Sounds": [] }, { "Name": "Aya Blackpaw", "RegImage": "/334-113-52603.png", "GoldImage": "/52-603-52603.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_902_Female_Pandaren_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_BOSS_AYA_Female_Pandaren_Death_01.ogg" }] }, { "Name": "Construct Golem", "RegImage": "/334-116-52604.png", "GoldImage": "/52-604-52604.webm", "Sounds": [] }, { "Name": "Kazakus", "RegImage": "/334-119-52605.png", "GoldImage": "/52-605-52605.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_CFM_621_Male_ShadowTroll_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_BOSS_KAZAKUS_Male_Troll_Death_01.ogg" }] }, { "Name": "Brew Potion", "RegImage": "/334-122-52606.png", "GoldImage": "/52-606-52606.webm", "Sounds": [{ "Name": "Play1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Rock Candy", "RegImage": "/334-437-52607.png", "GoldImage": "/52-607-52607.webm", "Sounds": [] }, { "Name": "Regenerative Cookies", "RegImage": "/334-440-52608.png", "GoldImage": "/52-608-52608.webm", "Sounds": [] }, { "Name": "Divine Sweets", "RegImage": "/334-443-52609.png", "GoldImage": "/52-609-52609.webm", "Sounds": [] }, { "Name": "Piñata Golem", "RegImage": "/334-446-52610.png", "GoldImage": "/52-610-52610.webm", "Sounds": [{ "Name": "Death1", "URL": "/Pinata_Death.ogg" }, { "Name": "Play1", "URL": "/Pinata_Play.ogg" }, { "Name": "Trigger1", "URL": "/Shadowy_Deck_AE_Sound.ogg" }, { "Name": "Trigger2", "URL": "/Pinata_SwitchesSide.ogg" }, { "Name": "Trigger3", "URL": "/Shadowy_Deck_AE_Sound.ogg" }] }, { "Name": "Decorate", "RegImage": "/334-449-52611.png", "GoldImage": "/52-611-52611.webm", "Sounds": [] }, { "Name": "Pelt", "RegImage": "/334-452-52612.png", "GoldImage": "/52-612-52612.webm", "Sounds": [] }, { "Name": "Party Crasher", "RegImage": "/334-455-52613.png", "GoldImage": "/52-613-52613.webm", "Sounds": [{ "Name": "Death1", "URL": "/VOX_Human_Male_A_Death2.ogg" }, { "Name": "Death2", "URL": "/Sword1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VOX_Human_Male_A_Attack1.ogg" }, { "Name": "Play2", "URL": "/Sword1_Play_Underlay.ogg" }, { "Name": "Trigger1", "URL": "/VOX_Human_Male_A_Attack2.ogg" }, { "Name": "Trigger2", "URL": "/Sword1_Attack_Underlay.ogg" }] }, { "Name": "Party Crasher", "RegImage": "/334-458-52614.png", "GoldImage": "/52-614-52614.webm", "Sounds": [{ "Name": "Death1", "URL": "/VOX_Human_Male_A_Death2.ogg" }, { "Name": "Death2", "URL": "/Sword1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VOX_Human_Male_A_Attack1.ogg" }, { "Name": "Play2", "URL": "/Sword1_Play_Underlay.ogg" }, { "Name": "Trigger1", "URL": "/VOX_Human_Male_A_Attack2.ogg" }, { "Name": "Trigger2", "URL": "/Sword1_Attack_Underlay.ogg" }] }, { "Name": "Something in the Punch", "RegImage": "/334-461-52616.png", "GoldImage": "/52-616-52616.webm", "Sounds": [] }, { "Name": "Party Supplies", "RegImage": "/334-464-52617.png", "GoldImage": "/52-617-52617.webm", "Sounds": [] }, { "Name": "Fruit Plate", "RegImage": "/334-467-52618.png", "GoldImage": "/52-618-52618.webm", "Sounds": [] }, { "Name": "Like a Sore Thumb", "RegImage": "/334-470-52619.png", "GoldImage": "/52-619-52619.webm", "Sounds": [] }, { "Name": "Noise Complaint", "RegImage": "/334-473-52620.png", "GoldImage": "/52-620-52620.webm", "Sounds": [] }, { "Name": "Decorated Stormwind", "RegImage": "/334-647-52622.png", "GoldImage": "/52-622-52622.webm", "Sounds": [] }, { "Name": "City of Stormwind", "RegImage": "/334-650-52623.png", "GoldImage": "/52-623-52623.webm", "Sounds": [] }, { "Name": "Partytown Stormwind", "RegImage": "/334-653-52624.png", "GoldImage": "/52-624-52624.webm", "Sounds": [] }, { "Name": "Party Capital", "RegImage": "/334-656-52625.png", "GoldImage": "/52-625-52625.webm", "Sounds": [] }, { "Name": "Party Barracks", "RegImage": "/334-659-52626.png", "GoldImage": "/52-626-52626.webm", "Sounds": [] }, { "Name": "Party Armory", "RegImage": "/334-662-52627.png", "GoldImage": "/52-627-52627.webm", "Sounds": [] }, { "Name": "Happy Partygoer", "RegImage": "/334-665-52628.png", "GoldImage": "/52-628-52628.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_Human_Male_C_Attack2.ogg" }, { "Name": "Attack2", "URL": "/Shield1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VOX_Human_Male_C_Death3.ogg" }, { "Name": "Death2", "URL": "/Shield1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VOX_Human_Male_C_Play2.ogg" }, { "Name": "Play2", "URL": "/Shield1_Play_Underlay.ogg" }] }, { "Name": "Party Banner", "RegImage": "/334-668-52629.png", "GoldImage": "/52-629-52629.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Party_Banner_Attack.ogg" }, { "Name": "Death1", "URL": "/Party_Banner_Death.ogg" }, { "Name": "Play1", "URL": "/Party_Banner_Play.ogg" }] }, { "Name": "Ornery Partygoer", "RegImage": "/334-671-52630.png", "GoldImage": "/52-630-52630.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_Human_Male_A_Attack2.ogg" }, { "Name": "Attack2", "URL": "/Sword1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VOX_Human_Male_A_Death2.ogg" }, { "Name": "Death2", "URL": "/Sword1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VOX_Human_Male_A_Attack1.ogg" }, { "Name": "Play2", "URL": "/Sword1_Play_Underlay.ogg" }] }, { "Name": "Whelp", "RegImage": "/330-327-527.png", "GoldImage": "/0-527-527.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ds1_whelptoken_Whelp_Attack1.ogg" }, { "Name": "Death1", "URL": "/ds1_whelptoken_Whelp_Death2.ogg" }, { "Name": "Play1", "URL": "/ds1_whelptoken_Whelp_EnterPlay1.ogg" }] }, { "Name": "Soulfire", "RegImage": "/330-752-529.png", "GoldImage": "/0-529-529.webm", "Collectible": true, "Sounds": [] }, { "Name": "Ashbringer", "RegImage": "/330-854-53.png", "GoldImage": "/0-53-53.webm", "Sounds": [] }, { "Name": "Forked Lightning", "RegImage": "/330-692-530.png", "GoldImage": "/0-530-530.webm", "Collectible": true, "Sounds": [] }, { "Name": "Counterspell", "RegImage": "/330-722-531.png", "GoldImage": "/0-531-531.webm", "Collectible": true, "Sounds": [{ "Name": "Trigger1", "URL": "/Mage_CounterSpell_Cast_1.ogg" }] }, { "Name": "Claw", "RegImage": "/329-886-532.png", "GoldImage": "/0-532-532.webm", "Collectible": true, "Sounds": [] }, { "Name": "Emerald Drake", "RegImage": "/330-291-534.png", "GoldImage": "/0-534-534.webm", "Sounds": [{ "Name": "Attack1", "URL": "/WoW_DREAM_03_EmeraldDrake_Attack.ogg" }, { "Name": "Death1", "URL": "/WoW_DREAM_03_EmeraldDrake_Death.ogg" }, { "Name": "Play1", "URL": "/WoW_DREAM_03_EmeraldDrake_EnterPlay.ogg" }] }, { "Name": "River Crocolisk", "RegImage": "/330-138-535.png", "GoldImage": "/0-535-535.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_CS2_120_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_CS2_120_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_CS2_120_EnterPlay.ogg" }] }, { "Name": "Baron Geddon", "RegImage": "/330-686-539.png", "GoldImage": "/0-539-539.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_249_Baron_Geddon_Attack1.ogg" }, { "Name": "Death1", "URL": "/EX1_249_Baron_Geddon_Death1.ogg" }, { "Name": "Play1", "URL": "/VO_BRMA05_1_START_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Elemental_Villain.ogg" }] }, { "Name": "Pint-Sized Summoner", "RegImage": "/330-459-54.png", "GoldImage": "/0-54-54.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_076_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_076_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_076_Play_01.ogg" }] }, { "Name": "Finkle Einhorn", "RegImage": "/331-156-541.png", "GoldImage": "/0-541-541.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_finkle_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_finkle_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_finkle_Play_01.ogg" }] }, { "Name": "Defender of Argus", "RegImage": "/330-483-542.png", "GoldImage": "/0-542-542.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_093_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_093_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_093_Play_01.ogg" }] }, { "Name": "Silence", "RegImage": "/330-794-544.png", "GoldImage": "/0-544-544.webm", "Collectible": true, "Sounds": [] }, { "Name": "Archmage", "RegImage": "/330-180-545.png", "GoldImage": "/0-545-545.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_155_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_155_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_155_Play_01.ogg" }] }, { "Name": "Shadow Word: Death", "RegImage": "/331-135-547.png", "GoldImage": "/0-547-547.webm", "Collectible": true, "Sounds": [] }, { "Name": "Innervate", "RegImage": "/330-644-548.png", "GoldImage": "/0-548-548.webm", "Collectible": true, "Sounds": [] }, { "Name": "Murloc Raider", "RegImage": "/330-189-55.png", "GoldImage": "/0-55-55.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CS2_168_Murloc_Raider_Attack1.ogg" }, { "Name": "Death1", "URL": "/CS2_168_Murloc_Raider_Death2.ogg" }, { "Name": "Play1", "URL": "/CS2_168_Murloc_Raider_EnterPlay1.ogg" }] }, { "Name": "Shadowstep", "RegImage": "/330-561-550.png", "GoldImage": "/0-550-550.webm", "Collectible": true, "Sounds": [] }, { "Name": "Chicken", "RegImage": "/333-90-552.png", "GoldImage": "/0-552-552.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_Mekka4t_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_Mekka4t_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_Mekka4t_EnterPlay.ogg" }] }, { "Name": "Snipe", "RegImage": "/331-97-553.png", "GoldImage": "/0-553-553.webm", "Collectible": true, "Sounds": [] }, { "Name": "Divine Spirit", "RegImage": "/330-270-554.png", "GoldImage": "/0-554-554.webm", "Collectible": true, "Sounds": [] }, { "Name": "Galvadon", "RegImage": "/335-325-55444.png", "GoldImage": "/55-444-55444.webm", "Sounds": [{ "Name": "Attack1", "URL": "/UNG_954t1_Anklos_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_954t1_Anklos_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_954t1_Anklos_Play.ogg" }, { "Name": "Play2", "URL": "/Marsh_Play_Stinger_2.ogg" }] }, { "Name": "Explore Un'Goro", "RegImage": "/335-250-55445.png", "GoldImage": "/55-445-55445.webm", "Collectible": true, "Sounds": [] }, { "Name": "Tortollan Shellraiser", "RegImage": "/334-902-55446.png", "GoldImage": "/55-446-55446.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_037_Female_Tortollan_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_037_Female_Tortollan_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_037_Female_Tortollan_Play_01.ogg" }] }, { "Name": "Lakkari Sacrifice", "RegImage": "/335-130-55447.png", "GoldImage": "/55-447-55447.webm", "Collectible": true, "Sounds": [{ "Name": "Trigger1", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger2", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger3", "URL": "/add_LegendaryQuest_card_to_hand.ogg" }] }, { "Name": "Nether Portal", "RegImage": "/335-133-55448.png", "GoldImage": "/55-448-55448.webm", "Sounds": [] }, { "Name": "Lakkari Felhound", "RegImage": "/335-151-55449.png", "GoldImage": "/55-449-55449.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/LakkariFelhound_UNG_833_Attack.ogg" }, { "Name": "Death1", "URL": "/LakkariFelhound_UNG_833_Death.ogg" }, { "Name": "Play1", "URL": "/LakkariFelhound_UNG_833_Play.ogg" }] }, { "Name": "Arcanologist", "RegImage": "/334-857-55450.png", "GoldImage": "/55-450-55450.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_020_Female_Gnome_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_020_Female_Gnome_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_020_Female_Gnome_Play_01.ogg" }] }, { "Name": "Elise the Trailblazer", "RegImage": "/335-190-55451.png", "GoldImage": "/55-451-55451.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_851_Female_Night Elf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_851_Female_Night Elf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_851_Female_Night Elf_Play_01.ogg" }, { "Name": "Play2", "URL": "/Marsh_Play_Stinger_4.ogg" }] }, { "Name": "Un'Goro Pack", "RegImage": "/335-193-55452.png", "GoldImage": "/55-452-55452.webm", "Sounds": [] }, { "Name": "Golakka Crawler", "RegImage": "/335-94-55453.png", "GoldImage": "/55-453-55453.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_807_GollakaCrawler_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_807_GollakaCrawler_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_807_GollakaCrawler_Play.ogg" }] }, { "Name": "Swamp King Dred", "RegImage": "/335-238-55454.png", "GoldImage": "/55-454-55454.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_919_SwampKingDred_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_919_SwampKingDred_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_919_SwampKingDred_Play.ogg" }, { "Name": "Play2", "URL": "/Troll_Play_Stinger_4.ogg" }, { "Name": "Trigger1", "URL": "/UNG_919_SwampKingDred_Trigger.ogg" }] }, { "Name": "Dinosize", "RegImage": "/334-836-55455.png", "GoldImage": "/55-455-55455.webm", "Collectible": true, "Sounds": [] }, { "Name": "Tar Creeper", "RegImage": "/335-268-55456.png", "GoldImage": "/55-456-55456.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/TarCreeper_UNG_928_Attack.ogg" }, { "Name": "Death1", "URL": "/TarCreeper_UNG_928_Death.ogg" }, { "Name": "Play1", "URL": "/TarCreeper_UNG_928_Play.ogg" }] }, { "Name": "Sherazin, Corpse Flower", "RegImage": "/334-932-55457.png", "GoldImage": "/55-457-55457.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SherazinCorpseFlower_UNG_065_Attack.ogg" }, { "Name": "Death1", "URL": "/SherazinCorpseFlower_UNG_065_Death.ogg" }, { "Name": "Play1", "URL": "/SherazinCorpseFlower_UNG_065_Play.ogg" }, { "Name": "Play2", "URL": "/Troll_Play_Stinger_7.ogg" }] }, { "Name": "Sherazin, Seed", "RegImage": "/334-935-55458.png", "GoldImage": "/55-458-55458.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/CorpseFlowerSeed_CustomSpawn_Spin_Sound.ogg" }, { "Name": "Trigger2", "URL": "/CorpseFlower_CustomSummon.ogg" }] }, { "Name": "Nether Imp", "RegImage": "/335-139-55459.png", "GoldImage": "/55-459-55459.webm", "Sounds": [{ "Name": "Attack1", "URL": "/NetherImp_UNG_829t3_Attack.ogg" }, { "Name": "Death1", "URL": "/NetherImp_UNG_829t3_Death.ogg" }, { "Name": "Play1", "URL": "/NetherImp_UNG_829t3_Play.ogg" }] }, { "Name": "Nether Portal", "RegImage": "/335-136-55460.png", "GoldImage": "/55-460-55460.webm", "Sounds": [{ "Name": "Play1", "URL": "/NetherPortal_UNG_829t2_Play.ogg" }] }, { "Name": "Crystalline Oracle", "RegImage": "/334-893-55461.png", "GoldImage": "/55-461-55461.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/LivingLight_UNG_032_Attack.ogg" }, { "Name": "Death1", "URL": "/LivingLight_UNG_032_Death.ogg" }, { "Name": "Play1", "URL": "/LivingLight_UNG_032_Play.ogg" }] }, { "Name": "Sunkeeper Tarim", "RegImage": "/334-848-55462.png", "GoldImage": "/55-462-55462.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_015_Male_Tolvir_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_015_Male_Tolvir_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_015_Male_Tolvir_Play_01.ogg" }, { "Name": "Play2", "URL": "/Uldum_Play_Stinger_1.ogg" }] }, { "Name": "Shadow Visions", "RegImage": "/334-887-55463.png", "GoldImage": "/55-463-55463.webm", "Collectible": true, "Sounds": [] }, { "Name": "Clutchmother Zavas", "RegImage": "/335-163-55464.png", "GoldImage": "/55-464-55464.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ClutchmotherZavas_UNG_836_Attack.ogg" }, { "Name": "Death1", "URL": "/ClutchmotherZavas_UNG_836_Death.ogg" }, { "Name": "Play1", "URL": "/ClutchmotherZavas_UNG_836_Play.ogg" }, { "Name": "Play2", "URL": "/Silithus_Play_Stinger_1.ogg" }, { "Name": "Trigger1", "URL": "/ClutchmotherZavas_CustomDiscard_Exit_Sound.ogg" }, { "Name": "Trigger2", "URL": "/ClutchmotherZavas_CustomDiscard_Exit_Sound.ogg" }] }, { "Name": "Flame Geyser", "RegImage": "/334-851-55465.png", "GoldImage": "/55-465-55465.webm", "Collectible": true, "Sounds": [] }, { "Name": "Fire Fly", "RegImage": "/335-100-55466.png", "GoldImage": "/55-466-55466.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_809_GiantFirefly_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_809_GiantFirefly_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_809_GiantFirefly_Play.ogg" }] }, { "Name": "Stone Sentinel", "RegImage": "/335-58-55467.png", "GoldImage": "/55-467-55467.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_070_Male_Elemental_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_070_Male_Elemental_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_070_Male_Elemental_Play_01.ogg" }] }, { "Name": "Ozruk", "RegImage": "/335-208-55468.png", "GoldImage": "/55-468-55468.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_859_Male_Elemental_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_859_Male_Elemental_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_859_Male_Elemental_Play_01.ogg" }, { "Name": "Play2", "URL": "/Ozruk_Play_Stinger.ogg" }] }, { "Name": "Flame Elemental", "RegImage": "/335-103-55469.png", "GoldImage": "/55-469-55469.webm", "Sounds": [{ "Name": "Attack1", "URL": "/UNG_809t1_FlameElemental_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_809t1_FlameElemental_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_809t1_FlameElemental_Play.ogg" }] }, { "Name": "Unite the Murlocs", "RegImage": "/335-301-55470.png", "GoldImage": "/55-470-55470.webm", "Collectible": true, "Sounds": [{ "Name": "Trigger1", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger2", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger3", "URL": "/add_LegendaryQuest_card_to_hand.ogg" }] }, { "Name": "Primalfin Lookout", "RegImage": "/335-286-55471.png", "GoldImage": "/55-471-55471.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_937_Male_Murloc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_937_Male_Murloc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_937_Male_Murloc_Play_01.ogg" }] }, { "Name": "Megafin", "RegImage": "/335-304-55472.png", "GoldImage": "/55-472-55472.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_942t_Male_Murloc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_942t_Male_Murloc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_942t_Male_Murloc_Play_05.ogg" }, { "Name": "Play2", "URL": "/Troll_Play_Stinger_10.ogg" }] }, { "Name": "Kalimos, Primal Lord", "RegImage": "/335-64-55473.png", "GoldImage": "/55-473-55473.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_211_Male_Elemental_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_211_Male_Elemental_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_211_Male_Elemental_Play_01.ogg" }, { "Name": "Play2", "URL": "/Kalimos_Play_Stinger.ogg" }] }, { "Name": "Invocation of Water", "RegImage": "/335-73-55474.png", "GoldImage": "/55-474-55474.webm", "Sounds": [] }, { "Name": "Invocation of Fire", "RegImage": "/335-76-55475.png", "GoldImage": "/55-475-55475.webm", "Sounds": [] }, { "Name": "Invocation of Earth", "RegImage": "/335-67-55476.png", "GoldImage": "/55-476-55476.webm", "Sounds": [] }, { "Name": "Invocation of Air", "RegImage": "/335-79-55477.png", "GoldImage": "/55-477-55477.webm", "Sounds": [] }, { "Name": "Tol'vir Stoneshaper", "RegImage": "/334-944-55478.png", "GoldImage": "/55-478-55478.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_208_Male_Tolvir_Attack_03.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_208_Male_Tolvir_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_208_Male_Tolvir_Play_02.ogg" }] }, { "Name": "Hydrologist", "RegImage": "/334-845-55479.png", "GoldImage": "/55-479-55479.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_011_Female_Murloc_Attack_05.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_011_Female_Murloc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_011_Female_Murloc_Play_01.ogg" }] }, { "Name": "Rock Elemental", "RegImage": "/335-61-55480.png", "GoldImage": "/55-480-55480.webm", "Sounds": [{ "Name": "Attack1", "URL": "/UNG_206_RockElemental_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_206_RockElemental_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_206_RockElemental_Play.ogg" }] }, { "Name": "The Caverns Below", "RegImage": "/334-938-55481.png", "GoldImage": "/55-481-55481.webm", "Collectible": true, "Sounds": [{ "Name": "Trigger1", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger2", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger3", "URL": "/add_LegendaryQuest_card_to_hand.ogg" }] }, { "Name": "Crystal Core", "RegImage": "/334-941-55482.png", "GoldImage": "/55-482-55482.webm", "Sounds": [] }, { "Name": "Mimic Pod", "RegImage": "/334-920-55483.png", "GoldImage": "/55-483-55483.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Nature_Impact_Leaves_01_Sound.ogg" }, { "Name": "Play2", "URL": "/Nature_Impact_Leaves_01_Sound.ogg" }] }, { "Name": "Tol'vir Warden", "RegImage": "/335-217-55484.png", "GoldImage": "/55-484-55484.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_913_Male_Tolvir_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_913_Male_Tolvir_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_913_Male_Tolvir_Play_01.ogg" }] }, { "Name": "Glacial Shard", "RegImage": "/335-55-55485.png", "GoldImage": "/55-485-55485.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_079_Male_Elemental_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_079_Male_Elemental_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_079_Male_Elemental_Play_01.ogg" }] }, { "Name": "Curious Glimmerroot", "RegImage": "/334-899-55486.png", "GoldImage": "/55-486-55486.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CuriousGlimmerroot_UNG_035_Attack.ogg" }, { "Name": "Death1", "URL": "/CuriousGlimmerroot_UNG_035_Death.ogg" }, { "Name": "Play1", "URL": "/CuriousGlimmerroot_UNG_035_Play.ogg" }] }, { "Name": "Volcanosaur", "RegImage": "/334-833-55487.png", "GoldImage": "/55-487-55487.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_002_Volcanosaur_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_002_Volcanosaur_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_002_Volcanosaur_Play.ogg" }] }, { "Name": "Gluttonous Ooze", "RegImage": "/335-307-55488.png", "GoldImage": "/55-488-55488.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/GluttonousOoze_UNG_946_Attack.ogg" }, { "Name": "Death1", "URL": "/GluttonousOoze_UNG_946_Death.ogg" }, { "Name": "Play1", "URL": "/GluttonousOoze_UNG_946_Play.ogg" }] }, { "Name": "Mana Bind", "RegImage": "/334-866-55489.png", "GoldImage": "/55-489-55489.webm", "Collectible": true, "Sounds": [] }, { "Name": "Vilespine Slayer", "RegImage": "/334-929-55490.png", "GoldImage": "/55-490-55490.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VilespineSlayer_UNG_064_Attack.ogg" }, { "Name": "Death1", "URL": "/VilespineSlayer_UNG_064_Death.ogg" }, { "Name": "Play1", "URL": "/VilespineSlayer_UNG_064_Play.ogg" }] }, { "Name": "Living Mana", "RegImage": "/335-31-55491.png", "GoldImage": "/55-491-55491.webm", "Collectible": true, "Sounds": [] }, { "Name": "Mirage Caller", "RegImage": "/334-863-55492.png", "GoldImage": "/55-492-55492.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_022_Male_Tolvir_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_022_Male_Tolvir_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_022_Male_Tolvir_Play_01.ogg" }] }, { "Name": "Corrupting Mist", "RegImage": "/335-145-55493.png", "GoldImage": "/55-493-55493.webm", "Collectible": true, "Sounds": [] }, { "Name": "Mana Treant", "RegImage": "/335-34-55494.png", "GoldImage": "/55-494-55494.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ManaTreant_UNG_111t1_Attack.ogg" }, { "Name": "Death1", "URL": "/ManaTreant_UNG_111t1_Death.ogg" }, { "Name": "Play1", "URL": "/ManaTreant_UNG_111t1_Play.ogg" }] }, { "Name": "Lost in the Jungle", "RegImage": "/335-341-55495.png", "GoldImage": "/55-495-55495.webm", "Collectible": true, "Sounds": [] }, { "Name": "Molten Blade", "RegImage": "/335-271-55496.png", "GoldImage": "/55-496-55496.webm", "Collectible": true, "Sounds": [] }, { "Name": "The Marsh Queen", "RegImage": "/335-241-55497.png", "GoldImage": "/55-497-55497.webm", "Collectible": true, "Sounds": [{ "Name": "Trigger1", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger2", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger3", "URL": "/add_LegendaryQuest_card_to_hand.ogg" }] }, { "Name": "Queen Carnassa", "RegImage": "/335-244-55498.png", "GoldImage": "/55-498-55498.webm", "Sounds": [{ "Name": "Attack1", "URL": "/QueenCarnassa_UNG_920t1_Attack.ogg" }, { "Name": "Death1", "URL": "/QueenCarnassa_UNG_920t1_Death.ogg" }, { "Name": "Play1", "URL": "/QueenCarnassa_UNG_920t1_Play.ogg" }, { "Name": "Play2", "URL": "/Stranglethorn_Play_Stinger_1.ogg" }] }, { "Name": "Carnassa's Brood", "RegImage": "/335-247-55499.png", "GoldImage": "/55-499-55499.webm", "Sounds": [{ "Name": "Attack1", "URL": "/CarnassasBrood_UNG_920t_Attack.ogg" }, { "Name": "Death1", "URL": "/CarnassasBrood_UNG_920t_Death.ogg" }, { "Name": "Play1", "URL": "/CarnassasBrood_UNG_920t_Play.ogg" }] }, { "Name": "Crackling Razormaw", "RegImage": "/335-226-55500.png", "GoldImage": "/55-500-55500.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_915_CleverRazormaw_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_915_CleverRazormaw_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_915_CleverRazormaw_Play.ogg" }] }, { "Name": "King Mosh", "RegImage": "/335-274-55501.png", "GoldImage": "/55-501-55501.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/KingMosh_UNG_933_Attack.ogg" }, { "Name": "Death1", "URL": "/KingMosh_UNG_933_Death.ogg" }, { "Name": "Play1", "URL": "/KingMosh_UNG_933_Play.ogg" }, { "Name": "Play2", "URL": "/Troll_Play_Stinger_5.ogg" }] }, { "Name": "Raptor Hatchling", "RegImage": "/335-220-55502.png", "GoldImage": "/55-502-55502.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_914_RaptorHatchling_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_914_RaptorHatchling_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_914_RaptorHatchling_Play.ogg" }] }, { "Name": "Raptor Patriarch", "RegImage": "/335-223-55504.png", "GoldImage": "/55-504-55504.webm", "Sounds": [{ "Name": "Attack1", "URL": "/RaptorPatriarch_UNG_914t_Attack.ogg" }, { "Name": "Death1", "URL": "/RaptorPatriarch_UNG_914t_Death.ogg" }, { "Name": "Play1", "URL": "/RaptorPatriarch_UNG_914t_Play.ogg" }] }, { "Name": "Terrorscale Stalker", "RegImage": "/335-82-55505.png", "GoldImage": "/55-505-55505.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_856_Male_Saurok_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_856_Male_Saurok_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_856_Male_Saurok_Play_01.ogg" }] }, { "Name": "Thunder Lizard", "RegImage": "/334-971-55506.png", "GoldImage": "/55-506-55506.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_082_ThunderLizard_Attack.ogg" }, { "Name": "Attack2", "URL": "/ThunderLizard_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/UNG_082_ThunderLizard_Death.ogg" }, { "Name": "Death2", "URL": "/ThunderLizard_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/UNG_082_ThunderLizard_Play.ogg" }, { "Name": "Play2", "URL": "/ThunderLizard_Play_Underlay.ogg" }] }, { "Name": "Lightfused Stegodon", "RegImage": "/335-347-55507.png", "GoldImage": "/55-507-55507.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/LightfusedStegadon_UNG_962_Attack.ogg" }, { "Name": "Death1", "URL": "/LightfusedStegadon_UNG_962_Death.ogg" }, { "Name": "Play1", "URL": "/LightfusedStegadon_UNG_962_Play.ogg" }] }, { "Name": "Hemet, Jungle Hunter", "RegImage": "/335-169-55508.png", "GoldImage": "/55-508-55508.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_840_Male_Dwarf_Attack_03.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_840_Male_Dwarf_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_840_Male_Dwarf_Play_05.ogg" }, { "Name": "Play2", "URL": "/Hemet_JH_Play_Stinger.ogg" }] }, { "Name": "Blazecaller", "RegImage": "/335-184-55509.png", "GoldImage": "/55-509-55509.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_907_Male_Elemental_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_907_Male_Elemental_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_907_Male_Elemental_Play_02.ogg" }] }, { "Name": "Ravenous Pterrordax", "RegImage": "/334-905-55510.png", "GoldImage": "/55-510-55510.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_047_RavenousPterrordax_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_047_RavenousPterrordax_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_047_RavenousPterrordax_Play.ogg" }] }, { "Name": "Servant of Kalimos", "RegImage": "/335-118-55511.png", "GoldImage": "/55-511-55511.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_816_Male_Elemental_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_816_Male_Elemental_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_816_Male_Elemental_Play_01.ogg" }] }, { "Name": "The Last Kaleidosaur", "RegImage": "/335-322-55512.png", "GoldImage": "/55-512-55512.webm", "Collectible": true, "Sounds": [{ "Name": "Trigger1", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger2", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger3", "URL": "/add_LegendaryQuest_card_to_hand.ogg" }] }, { "Name": "Evolving Spores", "RegImage": "/335-22-55513.png", "GoldImage": "/55-513-55513.webm", "Collectible": true, "Sounds": [] }, { "Name": "Spirit Echo", "RegImage": "/335-332-55514.png", "GoldImage": "/55-514-55514.webm", "Collectible": true, "Sounds": [] }, { "Name": "Tortollan Primalist", "RegImage": "/334-992-55515.png", "GoldImage": "/55-515-55515.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_088_Female_Tortollan_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_088_Female_Tortollan_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_088_Female_Tortollan_Play_01.ogg" }] }, { "Name": "Spikeridged Steed", "RegImage": "/335-316-55516.png", "GoldImage": "/55-516-55516.webm", "Collectible": true, "Sounds": [] }, { "Name": "Cornered Sentry", "RegImage": "/335-262-55517.png", "GoldImage": "/55-517-55517.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_926_Female_Draenei_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_926_Female_Draenei_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_926_Female_Draenei_Play_01.ogg" }] }, { "Name": "Raptor", "RegImage": "/334-962-55518.png", "GoldImage": "/55-518-55518.webm", "Sounds": [{ "Name": "Attack1", "URL": "/UNG_076t1_Raptor_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_076t1_Raptor_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_076t1_Raptor_Play.ogg" }] }, { "Name": "Stegodon", "RegImage": "/335-106-55519.png", "GoldImage": "/55-519-55519.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/Stegodon_UNG_810_Attack.ogg" }, { "Name": "Death1", "URL": "/Stegodon_UNG_810_Death.ogg" }, { "Name": "Play1", "URL": "/Stegodon_UNG_810_Play.ogg" }] }, { "Name": "Tyrantus", "RegImage": "/335-196-55520.png", "GoldImage": "/55-520-55520.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/Tyrantus_UNG_852_Attack.ogg" }, { "Name": "Death1", "URL": "/Tyrantus_UNG_852_Death.ogg" }, { "Name": "Play1", "URL": "/Tyrantus_UNG_852_Play.ogg" }, { "Name": "Play2", "URL": "/Troll_Play_Stinger_8.ogg" }] }, { "Name": "Ravasaur Runt", "RegImage": "/334-839-55521.png", "GoldImage": "/55-521-55521.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/RavasaurRunt_UNG_009_Attack.ogg" }, { "Name": "Death1", "URL": "/RavasaurRunt_UNG_009_Death.ogg" }, { "Name": "Play1", "URL": "/RavasaurRunt_UNG_009_Play.ogg" }] }, { "Name": "Spiritsinger Umbra", "RegImage": "/335-205-55522.png", "GoldImage": "/55-522-55522.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_900_Female_Tortollan_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_900_Female_Tortollan_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_900_Female_Tortollan_Play_03.ogg" }, { "Name": "Play2", "URL": "/Marsh_Play_Stinger_5.ogg" }] }, { "Name": "Fire Plume's Heart", "RegImage": "/335-277-55523.png", "GoldImage": "/55-523-55523.webm", "Collectible": true, "Sounds": [{ "Name": "Trigger1", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger2", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger3", "URL": "/add_LegendaryQuest_card_to_hand.ogg" }] }, { "Name": "Direhorn Hatchling", "RegImage": "/335-335-55524.png", "GoldImage": "/55-524-55524.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_957_DirehornHatchling_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_957_DirehornHatchling_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_957_DirehornHatchling_Play.ogg" }] }, { "Name": "Giant Wasp", "RegImage": "/335-115-55525.png", "GoldImage": "/55-525-55525.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_814_GiantWasp_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_814_GiantWasp_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_814_GiantWasp_Play.ogg" }] }, { "Name": "Dinomancy", "RegImage": "/335-232-55526.png", "GoldImage": "/55-526-55526.webm", "Collectible": true, "Sounds": [] }, { "Name": "Grievous Bite", "RegImage": "/335-211-55527.png", "GoldImage": "/55-527-55527.webm", "Collectible": true, "Sounds": [] }, { "Name": "Jeweled Macaw", "RegImage": "/335-214-55528.png", "GoldImage": "/55-528-55528.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/JeweledMacaw_UNG_912_Attack.ogg" }, { "Name": "Death1", "URL": "/JeweledMacaw_UNG_912_Death.ogg" }, { "Name": "Play1", "URL": "/JeweledMacaw_UNG_912_Play.ogg" }, { "Name": "Play2", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Stonehill Defender", "RegImage": "/334-950-55529.png", "GoldImage": "/55-529-55529.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_928_Male_Tortollan_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_928_Male_Tortollan_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_928_Male_Tortollan_Play_01.ogg" }] }, { "Name": "Ornery Direhorn", "RegImage": "/335-259-55530.png", "GoldImage": "/55-530-55530.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_925_OrneryDirehorn_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_925_OrneryDirehorn_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_925_OrneryDirehorn_Play.ogg" }] }, { "Name": "Sulfuras", "RegImage": "/335-280-55531.png", "GoldImage": "/55-531-55531.webm", "Sounds": [] }, { "Name": "Stubborn Gastropod", "RegImage": "/335-97-55532.png", "GoldImage": "/55-532-55532.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/StubbornGastropod_UNG_808_Attack.ogg" }, { "Name": "Death1", "URL": "/StubbornGastropod_UNG_808_Death.ogg" }, { "Name": "Play1", "URL": "/StubbornGastropod_UNG_808_Play.ogg" }] }, { "Name": "Primordial Drake", "RegImage": "/335-187-55533.png", "GoldImage": "/55-533-55533.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_848_PrimordialDrake_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_848_PrimordialDrake_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_848_PrimordialDrake_Play.ogg" }] }, { "Name": "Sated Threshadon", "RegImage": "/334-842-55534.png", "GoldImage": "/55-534-55534.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_010_SatedThreshadon_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_010_SatedThreshadon_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_010_SatedThreshadon_Play.ogg" }] }, { "Name": "Tar Lord", "RegImage": "/335-166-55535.png", "GoldImage": "/55-535-55535.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/TarLord_UNG_838_Attack.ogg" }, { "Name": "Death1", "URL": "/TarLord_UNG_838_Death.ogg" }, { "Name": "Play1", "URL": "/TarLord_UNG_838_Play.ogg" }] }, { "Name": "Stampede", "RegImage": "/335-229-55536.png", "GoldImage": "/55-536-55536.webm", "Collectible": true, "Sounds": [] }, { "Name": "Charged Devilsaur", "RegImage": "/334-998-55537.png", "GoldImage": "/55-537-55537.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_099_ChargedDevilsaur_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_099_ChargedDevilsaur_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_099_ChargedDevilsaur_Play.ogg" }] }, { "Name": "Jungle Giants", "RegImage": "/335-40-55538.png", "GoldImage": "/55-538-55538.webm", "Collectible": true, "Sounds": [{ "Name": "Trigger1", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger2", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger3", "URL": "/add_LegendaryQuest_card_to_hand.ogg" }] }, { "Name": "Barnabus the Stomper", "RegImage": "/335-43-55539.png", "GoldImage": "/55-539-55539.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BarnabusTheStomper_UNG_116t_Attack.ogg" }, { "Name": "Death1", "URL": "/BarnabusTheStomper_UNG_116t_Death.ogg" }, { "Name": "Play1", "URL": "/BarnabusTheStomper_UNG_116t_Play.ogg" }, { "Name": "Play2", "URL": "/Marsh_Play_Stinger_3.ogg" }] }, { "Name": "Binding Heal", "RegImage": "/334-890-55540.png", "GoldImage": "/55-540-55540.webm", "Collectible": true, "Sounds": [] }, { "Name": "Elder Longneck", "RegImage": "/335-28-55541.png", "GoldImage": "/55-541-55541.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_109_WitheredLongneck_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_109_WitheredLongneck_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_109_WitheredLongneck_Play.ogg" }] }, { "Name": "Free From Amber", "RegImage": "/335-199-55542.png", "GoldImage": "/55-542-55542.webm", "Collectible": true, "Sounds": [] }, { "Name": "Radiant Elemental", "RegImage": "/334-896-55543.png", "GoldImage": "/55-543-55543.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/RadiantElemental_UNG_034_Attack.ogg" }, { "Name": "Death1", "URL": "/RadiantElemental_UNG_034_Death.ogg" }, { "Name": "Play1", "URL": "/RadiantElemental_UNG_034_Play.ogg" }] }, { "Name": "Shellshifter", "RegImage": "/335-4-55544.png", "GoldImage": "/55-544-55544.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_101_Male_Tortollan_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_101_Male_Tortollan_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_101_Male_Tortollan_Play_01.ogg" }] }, { "Name": "Lyra the Sunshard", "RegImage": "/335-350-55545.png", "GoldImage": "/55-545-55545.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_963_Female_Elemental_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_963_Female_Elemental_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_963_Female_Elemental_Play_01.ogg" }, { "Name": "Play2", "URL": "/Sunshard_Play_Stinger.ogg" }] }, { "Name": "Giant Anaconda", "RegImage": "/334-986-55546.png", "GoldImage": "/55-546-55546.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_086_GiantAnaconda_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_086_GiantAnaconda_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_086_GiantAnaconda_Play.ogg" }] }, { "Name": "Tortollan Forager", "RegImage": "/334-965-55547.png", "GoldImage": "/55-547-55547.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_078_Female_Tortollan_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_078_Female_Tortollan_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_078_Female_Tortollan_Play_01.ogg" }] }, { "Name": "Earthen Scales", "RegImage": "/335-25-55548.png", "GoldImage": "/55-548-55548.webm", "Collectible": true, "Sounds": [] }, { "Name": "Air Elemental", "RegImage": "/334-854-55549.png", "GoldImage": "/55-549-55549.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_019_AirElemental_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_019_AirElemental_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_019_AirElemental_Play.ogg" }] }, { "Name": "Volatile Elemental", "RegImage": "/335-124-55550.png", "GoldImage": "/55-550-55550.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_818_Male_Elemental_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_818_Male_Elemental_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_818_Male_Elemental_Play_03.ogg" }] }, { "Name": "Open the Waygate", "RegImage": "/334-881-55551.png", "GoldImage": "/55-551-55551.webm", "Collectible": true, "Sounds": [{ "Name": "Trigger1", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger2", "URL": "/QuestCompleteSpell_Sound.ogg" }, { "Name": "Trigger3", "URL": "/add_LegendaryQuest_card_to_hand.ogg" }] }, { "Name": "Primordial Glyph", "RegImage": "/335-298-55552.png", "GoldImage": "/55-552-55552.webm", "Collectible": true, "Sounds": [] }, { "Name": "Molten Reflection", "RegImage": "/335-310-55553.png", "GoldImage": "/55-553-55553.webm", "Collectible": true, "Sounds": [] }, { "Name": "Time Warp", "RegImage": "/334-884-55554.png", "GoldImage": "/55-554-55554.webm", "Sounds": [{ "Name": "Play1", "URL": "/TimeWarp_Fullboard_Sound.ogg" }, { "Name": "Play2", "URL": "/TimeWarp_Fullboard_Sound.ogg" }] }, { "Name": "Tidal Surge", "RegImage": "/335-121-55555.png", "GoldImage": "/55-555-55555.webm", "Collectible": true, "Sounds": [] }, { "Name": "The Voraxx", "RegImage": "/335-172-55556.png", "GoldImage": "/55-556-55556.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_843_Phytos_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_843_Phytos_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_843_Phytos_Play.ogg" }, { "Name": "Play2", "URL": "/Troll_Play_Stinger_6.ogg" }] }, { "Name": "Fire Plume Harbinger", "RegImage": "/335-52-55557.png", "GoldImage": "/55-557-55557.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_202_Male_Elemental_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_202_Male_Elemental_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_202_Male_Elemental_Play_01.ogg" }] }, { "Name": "Meteor", "RegImage": "/335-329-55558.png", "GoldImage": "/55-558-55558.webm", "Collectible": true, "Sounds": [] }, { "Name": "Igneous Elemental", "RegImage": "/335-178-55559.png", "GoldImage": "/55-559-55559.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_845_Male_Elemental_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_845_Male_Elemental_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_845_Male_Elemental_Play_01.ogg" }] }, { "Name": "Frozen Crusher", "RegImage": "/334-968-55560.png", "GoldImage": "/55-560-55560.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_205_GlacialShard_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_205_GlacialShard_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_205_GlacialShard_Play.ogg" }] }, { "Name": "Shimmering Tempest", "RegImage": "/335-181-55561.png", "GoldImage": "/55-561-55561.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_846_ShimmeringTempest_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_846_ShimmeringTempest_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_846_ShimmeringTempest_Play.ogg" }] }, { "Name": "Stormwatcher", "RegImage": "/335-112-55562.png", "GoldImage": "/55-562-55562.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_813_Female_Elemental_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_813_Female_Elemental_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_813_Female_Elemental_Play_01.ogg" }] }, { "Name": "Fire Plume Phoenix", "RegImage": "/334-980-55563.png", "GoldImage": "/55-563-55563.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/FireplumePhoenix_UNG084_Attack.ogg" }, { "Name": "Death1", "URL": "/FireplumePhoenix_UNG084_Death.ogg" }, { "Name": "Play1", "URL": "/FireplumePhoenix_UNG084_Play.ogg" }] }, { "Name": "Hot Spring Guardian", "RegImage": "/335-289-55564.png", "GoldImage": "/55-564-55564.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/HotSpringGuardian_UNG_938_Attack.ogg" }, { "Name": "Death1", "URL": "/HotSpringGuardian_UNG_938_Death.ogg" }, { "Name": "Play1", "URL": "/HotSpringGuardian_UNG_938_Play.ogg" }] }, { "Name": "Primalfin Champion", "RegImage": "/335-319-55565.png", "GoldImage": "/55-565-55565.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_953_Male_Murloc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_953_Male_Murloc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_953_Male_Murloc_Play_01.ogg" }] }, { "Name": "Adaptation", "RegImage": "/335-344-55566.png", "GoldImage": "/55-566-55566.webm", "Collectible": true, "Sounds": [] }, { "Name": "Devilsaur Egg", "RegImage": "/334-974-55567.png", "GoldImage": "/55-567-55567.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/DevilsaurEgg_UNG_083_Attack.ogg" }, { "Name": "Death1", "URL": "/DevilsaurEgg_UNG_083_Death.ogg" }, { "Name": "Play1", "URL": "/DevilsaurEgg_UNG_083_Play.ogg" }] }, { "Name": "Emerald Reaver", "RegImage": "/335-88-55568.png", "GoldImage": "/55-568-55568.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_803_EmeraldReaver_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_803_EmeraldReaver_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_803_EmeraldReaver_Play.ogg" }] }, { "Name": "Cruel Dinomancer", "RegImage": "/335-142-55569.png", "GoldImage": "/55-569-55569.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_830_Female_Saurok_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_830_Female_Saurok_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_830_Female_Saurok_Play_01.ogg" }] }, { "Name": "Bittertide Hydra", "RegImage": "/334-989-55570.png", "GoldImage": "/55-570-55570.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/BittertideHydra_UNG_087_Attack.ogg" }, { "Name": "Death1", "URL": "/BittertideHydra_UNG_087_Death.ogg" }, { "Name": "Play1", "URL": "/BittertideHydra_UNG_087_Play.ogg" }] }, { "Name": "Chittering Tunneler", "RegImage": "/335-160-55571.png", "GoldImage": "/55-571-55571.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ChitteringTunneler_UNG_835_Attack.ogg" }, { "Name": "Death1", "URL": "/ChitteringTunneler_UNG_835_Death.ogg" }, { "Name": "Play1", "URL": "/ChitteringTunneler_UNG_835_Play.ogg" }] }, { "Name": "Iron Hide", "RegImage": "/335-256-55572.png", "GoldImage": "/55-572-55572.webm", "Collectible": true, "Sounds": [] }, { "Name": "Nesting Roc", "RegImage": "/335-85-55573.png", "GoldImage": "/55-573-55573.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_801_NestingRoc_Attack.ogg" }, { "Name": "Attack2", "URL": "/WingFlapMedium_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_801_NestingRoc_Death.ogg" }, { "Name": "Death2", "URL": "/WingFlapMedium_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_801_NestingRoc_Play.ogg" }, { "Name": "Play2", "URL": "/WingFlapMedium_Underlay_Play.ogg" }] }, { "Name": "Rockpool Hunter", "RegImage": "/334-953-55574.png", "GoldImage": "/55-574-55574.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_073_Male_Murloc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_073_Male_Murloc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_073_Male_Murloc_Play_01.ogg" }] }, { "Name": "Emerald Hive Queen", "RegImage": "/334-983-55575.png", "GoldImage": "/55-575-55575.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_805_EmeraldHiveQueen_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_805_EmeraldHiveQueen_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_805_EmeraldHiveQueen_Play.ogg" }] }, { "Name": "Biteweed", "RegImage": "/334-926-55576.png", "GoldImage": "/55-576-55576.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_063_SproutingSporling_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_063_SproutingSporling_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_063_SproutingSporling_Play.ogg" }] }, { "Name": "Sudden Genesis", "RegImage": "/335-265-55577.png", "GoldImage": "/55-577-55577.webm", "Collectible": true, "Sounds": [] }, { "Name": "Tar Lurker", "RegImage": "/334-908-55578.png", "GoldImage": "/55-578-55578.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/TarLurker_UNG_049_Attack.ogg" }, { "Name": "Death1", "URL": "/TarLurker_UNG_049_Death.ogg" }, { "Name": "Play1", "URL": "/TarLurker_UNG_049_Play.ogg" }] }, { "Name": "Razorpetal Lasher", "RegImage": "/334-917-55579.png", "GoldImage": "/55-579-55579.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_058_RazorpetalLasher_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_058_RazorpetalLasher_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_058_RazorpetalLasher_Play.ogg" }] }, { "Name": "Razorpetal Volley", "RegImage": "/334-911-55580.png", "GoldImage": "/55-580-55580.webm", "Collectible": true, "Sounds": [] }, { "Name": "Vinecleaver", "RegImage": "/335-313-55581.png", "GoldImage": "/55-581-55581.webm", "Collectible": true, "Sounds": [] }, { "Name": "Humongous Razorleaf", "RegImage": "/335-175-55582.png", "GoldImage": "/55-582-55582.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_844_HumongusRaptorLeaf_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_844_HumongusRaptorLeaf_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_844_HumongusRaptorLeaf_Play.ogg" }] }, { "Name": "Ultrasaur", "RegImage": "/335-91-55583.png", "GoldImage": "/55-583-55583.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_806_Ultrasaur_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_806_Ultrasaur_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_806_Ultrasaur_Play.ogg" }] }, { "Name": "Vicious Fledgling", "RegImage": "/334-956-55584.png", "GoldImage": "/55-584-55584.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_075_HungryFledgling_Attack.ogg" }, { "Name": "Attack2", "URL": "/WingFlapMedium_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_075_HungryFledgling_Death.ogg" }, { "Name": "Death2", "URL": "/WingFlapMedium_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_075_HungryFledgling_Play.ogg" }, { "Name": "Play2", "URL": "/WingFlapMedium_Underlay_Play.ogg" }] }, { "Name": "Steam Surger", "RegImage": "/334-860-55585.png", "GoldImage": "/55-585-55585.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_021_SteamSurger_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_021_SteamSurger_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_021_SteamSurger_Play.ogg" }] }, { "Name": "Sabretooth Stalker", "RegImage": "/335-109-55586.png", "GoldImage": "/55-586-55586.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SabretoothStalker_UNG_812_Attack.ogg" }, { "Name": "Death1", "URL": "/SabretoothStalker_UNG_812_Death.ogg" }, { "Name": "Play1", "URL": "/SabretoothStalker_UNG_812_Play.ogg" }] }, { "Name": "Obsidian Shard", "RegImage": "/334-923-55587.png", "GoldImage": "/55-587-55587.webm", "Collectible": true, "Sounds": [] }, { "Name": "Envenom Weapon", "RegImage": "/335-127-55588.png", "GoldImage": "/55-588-55588.webm", "Collectible": true, "Sounds": [] }, { "Name": "Feeding Time", "RegImage": "/335-154-55589.png", "GoldImage": "/55-589-55589.webm", "Collectible": true, "Sounds": [] }, { "Name": "Bright-Eyed Scout", "RegImage": "/335-37-55590.png", "GoldImage": "/55-590-55590.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_080_Female_Dwarf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_080_Female_Dwarf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_080_Female_Dwarf_Play_01.ogg" }] }, { "Name": "Pterrordax Hatchling", "RegImage": "/334-830-55591.png", "GoldImage": "/55-591-55591.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_001_PterrordaxHatchling_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_001_PterrordaxHatchling_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_001_PterrordaxHatchling_Play.ogg" }] }, { "Name": "Hallucination", "RegImage": "/335-202-55592.png", "GoldImage": "/55-592-55592.webm", "Collectible": true, "Sounds": [] }, { "Name": "Giant Mastodon", "RegImage": "/334-947-55593.png", "GoldImage": "/55-593-55593.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/UNG_071_GiantMastadon_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_071_GiantMastadon_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_071_GiantMastadon_Play.ogg" }] }, { "Name": "Bloodbloom", "RegImage": "/335-148-55594.png", "GoldImage": "/55-594-55594.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }, { "Name": "Play2", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }, { "Name": "Play3", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }] }, { "Name": "Eggnapper", "RegImage": "/334-959-55595.png", "GoldImage": "/55-595-55595.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_076_Male_Tortollan_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_076_Male_Tortollan_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_076_Male_Tortollan_Play_01.ogg" }] }, { "Name": "Primalfin Totem", "RegImage": "/335-46-55596.png", "GoldImage": "/55-596-55596.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/PrimalfinTotem_UNG_201_Attack.ogg" }, { "Name": "Death1", "URL": "/PrimalfinTotem_UNG_201_Death.ogg" }, { "Name": "Play1", "URL": "/PrimalfinTotem_UNG_201_Play.ogg" }] }, { "Name": "Stone Elemental", "RegImage": "/335-70-55597.png", "GoldImage": "/55-597-55597.webm", "Sounds": [{ "Name": "Attack1", "URL": "/StoneElemental_UNG_211aa_Attack.ogg" }, { "Name": "Death1", "URL": "/StoneElemental_UNG_211aa_Death.ogg" }, { "Name": "Play1", "URL": "/StoneElemental_UNG_211aa_Play.ogg" }] }, { "Name": "Choose Your Path", "RegImage": "/335-253-55598.png", "GoldImage": "/55-598-55598.webm", "Sounds": [] }, { "Name": "Devilsaur", "RegImage": "/334-977-55599.png", "GoldImage": "/55-599-55599.webm", "Sounds": [{ "Name": "Attack1", "URL": "/UNG_083t1_Devilsaur_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_083t1_Devilsaur_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_083t1_Devilsaur_Play.ogg" }] }, { "Name": "Razorpetal", "RegImage": "/334-914-55600.png", "GoldImage": "/55-600-55600.webm", "Sounds": [] }, { "Name": "Direhorn Matriarch", "RegImage": "/335-338-55601.png", "GoldImage": "/55-601-55601.webm", "Sounds": [{ "Name": "Attack1", "URL": "/UNG_957t1_DirehornMatriarch_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_957t1_DirehornMatriarch_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_957t1_DirehornMatriarch_Play.ogg" }] }, { "Name": "Primalfin", "RegImage": "/335-49-55602.png", "GoldImage": "/55-602-55602.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_UNG_201t_Male_Murloc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_UNG_201t_Male_Murloc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_UNG_201t_Male_Murloc_Play_01.ogg" }] }, { "Name": "Pterrordax", "RegImage": "/335-157-55603.png", "GoldImage": "/55-603-55603.webm", "Sounds": [{ "Name": "Attack1", "URL": "/UNG_834t1_Pterrordax_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_834t1_Pterrordax_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_834t1_Pterrordax_Play.ogg" }] }, { "Name": "Poisoned Daggers", "RegImage": "/328-214-55604.png", "GoldImage": "/55-604-55604.webm", "Sounds": [] }, { "Name": "Poisoned Dagger", "RegImage": "/328-220-55605.png", "GoldImage": "/55-605-55605.webm", "Sounds": [] }, { "Name": "Wicked Knife", "RegImage": "/330-51-55647.png", "GoldImage": "/55-647-55647.webm", "Sounds": [] }, { "Name": "Dagger Mastery", "RegImage": "/330-57-55648.png", "GoldImage": "/55-648-55648.webm", "Sounds": [] }, { "Name": "Maiev Shadowsong", "RegImage": "/331-722-55649.png", "GoldImage": "/55-649-55649.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_03a_Attack_15.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_03a_DEATH_63.ogg" }] }, { "Name": "Nefarian", "RegImage": "/334-269-55653.png", "GoldImage": "/55-653-55653.webm", "Sounds": [{ "Name": "Trigger1", "URL": "/Shadowy_Deck_AE_Sound.ogg" }, { "Name": "Trigger2", "URL": "/Pinata_SwitchesSide.ogg" }, { "Name": "Trigger3", "URL": "/Shadowy_Deck_AE_Sound.ogg" }] }, { "Name": "Understudy", "RegImage": "/334-398-55654.png", "GoldImage": "/55-654-55654.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_Human_Male_A_Attack2.ogg" }, { "Name": "Death1", "URL": "/VOX_Human_Male_A_Death2.ogg" }, { "Name": "Play1", "URL": "/VOX_Human_Male_A_Attack1.ogg" }] }, { "Name": "Nadia, Mankrik's Wife", "RegImage": "/334-491-55655.png", "GoldImage": "/55-655-55655.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VOX_Orc_Female_A_Attack1.ogg" }, { "Name": "Death1", "URL": "/VOX_Orc_Female_A_Death2.ogg" }, { "Name": "Play1", "URL": "/VOX_Orc_Female_A_Play2.ogg" }] }, { "Name": "Raptor Form", "RegImage": "/340-33-55674.png", "GoldImage": "/55-674-55674.webm", "Sounds": [] }, { "Name": "Direhorn Form", "RegImage": "/340-36-55675.png", "GoldImage": "/55-675-55675.webm", "Sounds": [] }, { "Name": "Shellshifter", "RegImage": "/335-13-55676.png", "GoldImage": "/55-676-55676.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ShellshifterStealth_UNG_101t_Attack.ogg" }, { "Name": "Attack2", "URL": "/ShellshifterStealth_UNG_101t_Attack.ogg" }, { "Name": "Death1", "URL": "/ShellshifterStealth_UNG_101t_Death.ogg" }, { "Name": "Death2", "URL": "/ShellshifterStealth_UNG_101t_Death.ogg" }, { "Name": "Play1", "URL": "/ShellshifterStealth_UNG_101t_Play.ogg" }, { "Name": "Play2", "URL": "/ShellshifterStealth_UNG_101t_Play.ogg" }] }, { "Name": "Shellshifter", "RegImage": "/335-16-55677.png", "GoldImage": "/55-677-55677.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ShellShifterTaunt_UNG101t2_Attack.ogg" }, { "Name": "Death1", "URL": "/ShellShifterTaunt_UNG101t2_Death.ogg" }, { "Name": "Play1", "URL": "/ShellShifterTaunt_UNG101t2_Play.ogg" }] }, { "Name": "Shellshifter", "RegImage": "/335-19-55678.png", "GoldImage": "/55-678-55678.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ShellshifterCombo_UNG_101t3_Attack.ogg" }, { "Name": "Death1", "URL": "/ShellshifterCombo_UNG_101t3_Death.ogg" }, { "Name": "Play1", "URL": "/ShellshifterCombo_UNG_101t3_Play.ogg" }] }, { "Name": "Earthen Ring Farseer", "RegImage": "/330-129-557.png", "GoldImage": "/0-557-557.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_117_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_117_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_117_Play_01.ogg" }] }, { "Name": "Dinomancy", "RegImage": "/335-235-55705.png", "GoldImage": "/55-705-55705.webm", "Sounds": [] }, { "Name": "DIE, INSECT!", "RegImage": "/335-283-55711.png", "GoldImage": "/55-711-55711.webm", "Sounds": [] }, { "Name": "Captain's Parrot", "RegImage": "/333-474-559.png", "GoldImage": "/0-559-559.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_016_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_016_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_016_Play_01.ogg" }] }, { "Name": "Arcane Explosion", "RegImage": "/329-922-56.png", "GoldImage": "/0-56-56.webm", "Collectible": true, "Sounds": [] }, { "Name": "Reckless Rocketeer", "RegImage": "/330-240-560.png", "GoldImage": "/0-560-560.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_213_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_213_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_213_Play_01.ogg" }] }, { "Name": "Dream", "RegImage": "/330-294-561.png", "GoldImage": "/0-561-561.webm", "Sounds": [] }, { "Name": "Kidnapper", "RegImage": "/333-438-562.png", "GoldImage": "/0-562-562.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_005_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_005_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_005_Play_01.ogg" }] }, { "Name": "Goldshire Footman", "RegImage": "/329-853-564.png", "GoldImage": "/0-564-564.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS1_042_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS1_042_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS1_042_Play_01.ogg" }] }, { "Name": "Gnoll", "RegImage": "/333-543-565.png", "GoldImage": "/0-565-565.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_NEW1_040t_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_NEW1_040t_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_NEW1_040t_EnterPlay.ogg" }] }, { "Name": "Summoning Portal", "RegImage": "/330-767-566.png", "GoldImage": "/0-566-566.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_315_Attack_00.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_315_Death_00.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_315_EnterPlay_00.ogg" }] }, { "Name": "Sword of Justice", "RegImage": "/330-839-567.png", "GoldImage": "/0-567-567.webm", "Collectible": true, "Sounds": [] }, { "Name": "Assassinate", "RegImage": "/330-39-568.png", "GoldImage": "/0-568-568.webm", "Collectible": true, "Sounds": [] }, { "Name": "Mirror Entity", "RegImage": "/330-728-569.png", "GoldImage": "/0-569-569.webm", "Collectible": true, "Sounds": [{ "Name": "Trigger1", "URL": "/mirror_entity_cast.ogg" }, { "Name": "Trigger2", "URL": "/mirror_entity_cast.ogg" }] }, { "Name": "Angry Chicken", "RegImage": "/330-360-57.png", "GoldImage": "/0-57-57.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_009_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_009_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_009_EnterPlay.ogg" }] }, { "Name": "Ancient Brewmaster", "RegImage": "/330-441-572.png", "GoldImage": "/0-572-572.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_057_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_057_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_057_Play_01.ogg" }] }, { "Name": "Siphon Soul", "RegImage": "/330-755-573.png", "GoldImage": "/0-573-573.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Shared_Shadow_PreCastHigh_1.ogg" }, { "Name": "Play2", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }, { "Name": "Play3", "URL": "/Warlock_SiphonSoul_Cast_1.ogg" }, { "Name": "Play4", "URL": "/Shared_Shadow_Start_1.ogg" }, { "Name": "Play5", "URL": "/Shared_Shadow_PreCastHigh_1.ogg" }, { "Name": "Play6", "URL": "/Warlock_SiphonSoul_Cast_1.ogg" }, { "Name": "Play7", "URL": "/Warlock_SiphonSoul_TargetImpact_1.ogg" }, { "Name": "Play8", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }] }, { "Name": "Bloodfen Raptor", "RegImage": "/330-198-576.png", "GoldImage": "/0-576-576.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CS2_172_StranglethornRaptor_Attack.ogg" }, { "Name": "Death1", "URL": "/CS2_172_StranglethornRaptor_Death.ogg" }, { "Name": "Play1", "URL": "/CS2_172_StranglethornRaptor_EnterPlay.ogg" }] }, { "Name": "Abusive Sergeant", "RegImage": "/330-219-577.png", "GoldImage": "/0-577-577.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_188_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_188_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_188_Play_01.ogg" }] }, { "Name": "Animal Companion", "RegImage": "/333-519-578.png", "GoldImage": "/0-578-578.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/VO_W2_462_AnimalSummon_18.ogg" }] }, { "Name": "Nourish", "RegImage": "/330-613-58.png", "GoldImage": "/0-58-58.webm", "Sounds": [] }, { "Name": "Shotgun Blast", "RegImage": "/334-785-580.png", "GoldImage": "/0-580-580.webm", "Sounds": [{ "Name": "Play1", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play10", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play2", "URL": "/FX_FireballEvent04_SpellCancel_01.ogg" }, { "Name": "Play3", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play4", "URL": "/FX_FireballEvent04_SpellImpact_01.ogg" }, { "Name": "Play5", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play6", "URL": "/FX_FireballEvent04_SpellCancel_01.ogg" }, { "Name": "Play7", "URL": "/Tutorial_Rifle_Fire_01.ogg" }, { "Name": "Play8", "URL": "/FX_FireballEvent04_SpellImpact_01.ogg" }, { "Name": "Play9", "URL": "/Tutorial_Rifle_Fire_01.ogg" }] }, { "Name": "Divine Favor", "RegImage": "/330-815-581.png", "GoldImage": "/0-581-581.webm", "Collectible": true, "Sounds": [] }, { "Name": "Shadow of Nothing", "RegImage": "/330-812-582.png", "GoldImage": "/0-582-582.webm", "Sounds": [{ "Name": "Attack1", "URL": "/EX1_345t_ShadowOfNothing_Attack.ogg" }, { "Name": "Death1", "URL": "/EX1_345t_ShadowOfNothing_Death.ogg" }, { "Name": "Play1", "URL": "/EX1_345t_ShadowOfNothing_Play.ogg" }] }, { "Name": "Heavy Axe", "RegImage": "/330-902-583.png", "GoldImage": "/0-583-583.webm", "Sounds": [] }, { "Name": "Master Swordsmith", "RegImage": "/333-534-584.png", "GoldImage": "/0-584-584.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_037_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_037_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_037_Play_01.ogg" }] }, { "Name": "Will of Mukla", "RegImage": "/334-776-586.png", "GoldImage": "/0-586-586.webm", "Sounds": [] }, { "Name": "Druid of the Claw", "RegImage": "/330-619-587.png", "GoldImage": "/0-587-587.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_165_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_165_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_165_Play_01.ogg" }] }, { "Name": "Shallow Gravedigger", "RegImage": "/339-615-58720.png", "GoldImage": "/58-720-58720.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_702_Female_Gnome_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/Staff_Underlay_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_702_Female_Gnome_Death_01.ogg" }, { "Name": "Death2", "URL": "/BlackPawn_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_702_Female_Gnome_Play_01.ogg" }, { "Name": "Play2", "URL": "/Gravedigger_Play_Underlay.ogg" }] }, { "Name": "Chillblade Champion", "RegImage": "/339-651-58721.png", "GoldImage": "/58-721-58721.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_820_Male_Gnome_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Sword1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_820_Male_Gnome_Death_01.ogg" }, { "Name": "Death2", "URL": "/SwordHeavy_Underlay_Death.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_820_Male_Gnome_Play_01.ogg" }, { "Name": "Play2", "URL": "/SwordHeavy_Underlay_Play.ogg" }, { "Name": "Play3", "URL": "/SwordHeavy_Underlay_Play.ogg" }] }, { "Name": "Spirit Lash", "RegImage": "/339-630-58722.png", "GoldImage": "/58-722-58722.webm", "Collectible": true, "Sounds": [] }, { "Name": "Prince Keleseth", "RegImage": "/339-767-58723.png", "GoldImage": "/58-723-58723.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_851_Male_Vampire_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_851_Male_Vampire_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_851_Male_Vampire_Play_01.ogg" }, { "Name": "Play2", "URL": "/Prince_Keleseth_Play_Stinger.ogg" }] }, { "Name": "Deathstalker Rexxar", "RegImage": "/339-667-58724.png", "GoldImage": "/58-724-58724.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_828_Male_Orc_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_828_Male_Orc_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_828_Male_Orc_Play_01.ogg" }] }, { "Name": "Build-A-Beast", "RegImage": "/339-669-58725.png", "Sounds": [] }, { "Name": "Pile On!!!", "RegImage": "/328-392-58726.png", "GoldImage": "/58-726-58726.webm", "Sounds": [{ "Name": "Play1", "URL": "/Pile_On_card_draw.ogg" }] }, { "Name": "Essence of the Red", "RegImage": "/328-641-58727.png", "GoldImage": "/58-727-58727.webm", "Sounds": [] }, { "Name": "INFERNO!", "RegImage": "/331-171-58728.png", "GoldImage": "/58-728-58728.webm", "Sounds": [] }, { "Name": "Gearmaster Mechazod", "RegImage": "/331-764-58739.png", "GoldImage": "/58-739-58739.webm", "Sounds": [] }, { "Name": "Kill Objective: Anub'arak", "RegImage": "/331-767-58740.png", "GoldImage": "/58-740-58740.webm", "Sounds": [] }, { "Name": "Coop Boss", "RegImage": "/334-179-58744.png", "GoldImage": "/58-744-58744.webm", "Sounds": [] }, { "Name": "Madness", "RegImage": "/334-182-58745.png", "GoldImage": "/58-745-58745.webm", "Sounds": [] }, { "Name": "Brazier", "RegImage": "/334-281-58747.png", "GoldImage": "/58-747-58747.webm", "Sounds": [] }, { "Name": "Fireworks", "RegImage": "/334-284-58748.png", "GoldImage": "/58-748-58748.webm", "Sounds": [] }, { "Name": "Mini-Rag", "RegImage": "/334-287-58749.png", "GoldImage": "/58-749-58749.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_298_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_298_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_298_Play_01.ogg" }, { "Name": "Trigger1", "URL": "/VO_EX1_298_Trigger_03.ogg" }] }, { "Name": "Ragnaros?", "RegImage": "/334-290-58750.png", "GoldImage": "/58-750-58750.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_298_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/GVG_093_TargetDummy_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_298_Death_04.ogg" }, { "Name": "Death2", "URL": "/GVG_093_TargetDummy_Death.ogg" }, { "Name": "Play1", "URL": "/VO_BRM_027h_Thinking1_12.ogg" }, { "Name": "Play2", "URL": "/GVG_093_TargetDummy_EnterPlay.ogg" }] }, { "Name": "Ragnaros the Firelord", "RegImage": "/334-305-58751.png", "GoldImage": "/58-751-58751.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_BRM_027h_Attack_15.ogg" }, { "Name": "Death1", "URL": "/VO_BRM_027h_Death_63.ogg" }] }, { "Name": "Shadow Tower New", "RegImage": "/334-320-58753.png", "GoldImage": "/58-753-58753.webm", "Sounds": [] }, { "Name": "Puzzle 1", "RegImage": "/334-401-58754.png", "GoldImage": "/58-754-58754.webm", "Sounds": [] }, { "Name": "Puzzle 2", "RegImage": "/334-404-58755.png", "GoldImage": "/58-755-58755.webm", "Sounds": [] }, { "Name": "Puzzle 5", "RegImage": "/334-407-58756.png", "GoldImage": "/58-756-58756.webm", "Sounds": [] }, { "Name": "Puzzle 6", "RegImage": "/334-410-58757.png", "GoldImage": "/58-757-58757.webm", "Sounds": [] }, { "Name": "Puzzle 7", "RegImage": "/334-413-58758.png", "GoldImage": "/58-758-58758.webm", "Sounds": [] }, { "Name": "Puzzle 3", "RegImage": "/334-416-58759.png", "GoldImage": "/58-759-58759.webm", "Sounds": [] }, { "Name": "Puzzle 9", "RegImage": "/334-419-58760.png", "GoldImage": "/58-760-58760.webm", "Sounds": [] }, { "Name": "Puzzle 4", "RegImage": "/334-422-58761.png", "GoldImage": "/58-761-58761.webm", "Sounds": [] }, { "Name": "Puzzle 8", "RegImage": "/334-425-58762.png", "GoldImage": "/58-762-58762.webm", "Sounds": [] }, { "Name": "Continue", "RegImage": "/334-428-58763.png", "GoldImage": "/58-763-58763.webm", "Sounds": [] }, { "Name": "Restart", "RegImage": "/334-431-58764.png", "GoldImage": "/58-764-58764.webm", "Sounds": [] }, { "Name": "Your Next Victim Comes", "RegImage": "/334-677-58771.png", "GoldImage": "/58-771-58771.webm", "Sounds": [] }, { "Name": "Fierce Forest", "RegImage": "/334-680-58772.png", "GoldImage": "/58-772-58772.webm", "Sounds": [] }, { "Name": "Spy Stalker", "RegImage": "/334-683-58773.png", "GoldImage": "/58-773-58773.webm", "Sounds": [] }, { "Name": "Secret Magus", "RegImage": "/334-686-58774.png", "GoldImage": "/58-774-58774.webm", "Sounds": [] }, { "Name": "New Hero!", "RegImage": "/334-689-58775.png", "GoldImage": "/58-775-58775.webm", "Sounds": [] }, { "Name": "Mysterious e-SCALE-ation", "RegImage": "/340-27-58776.png", "GoldImage": "/58-776-58776.webm", "Sounds": [] }, { "Name": "Unbreakable", "RegImage": "/334-695-58777.png", "GoldImage": "/58-777-58777.webm", "Sounds": [] }, { "Name": "The Saint", "RegImage": "/334-698-58778.png", "GoldImage": "/58-778-58778.webm", "Sounds": [] }, { "Name": "Totems Versus Secrets", "RegImage": "/334-701-58779.png", "GoldImage": "/58-779-58779.webm", "Sounds": [] }, { "Name": "Death Becomes", "RegImage": "/340-30-58780.png", "GoldImage": "/58-780-58780.webm", "Sounds": [] }, { "Name": "The Rock", "RegImage": "/334-707-58781.png", "GoldImage": "/58-781-58781.webm", "Sounds": [] }, { "Name": "Arcane Missiles", "RegImage": "/330-707-589.png", "GoldImage": "/0-589-589.webm", "Collectible": true, "Sounds": [] }, { "Name": "Misha", "RegImage": "/333-522-593.png", "GoldImage": "/0-593-593.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_NEW1_032_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_NEW1_032_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_NEW1_032_EnterPlay.ogg" }] }, { "Name": "Polymorph", "RegImage": "/329-913-595.png", "GoldImage": "/0-595-595.webm", "Collectible": true, "Sounds": [] }, { "Name": "Abomination", "RegImage": "/330-492-597.png", "GoldImage": "/0-597-597.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_097_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_097_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_097_Play_01.ogg" }] }, { "Name": "Frost Elemental", "RegImage": "/330-716-598.png", "GoldImage": "/0-598-598.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_283_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_283_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_283_EnterPlay.ogg" }] }, { "Name": "Dual Warglaives", "RegImage": "/334-806-599.png", "GoldImage": "/0-599-599.webm", "Sounds": [] }, { "Name": "Boulderfist Ogre", "RegImage": "/330-231-60.png", "GoldImage": "/0-60-60.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_200_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_200_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_200_Play_01.ogg" }] }, { "Name": "Northshire Cleric", "RegImage": "/330-267-600.png", "GoldImage": "/0-600-600.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_235_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_235_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_235_Play_01.ogg" }] }, { "Name": "Harrison Jones", "RegImage": "/330-983-602.png", "GoldImage": "/0-602-602.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/HarrisonJ_EX1_558_whip_attack.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_558_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_558_Play_01.ogg" }, { "Name": "Play2", "URL": "/PlayCardStinger_Harrison_Jones.ogg" }] }, { "Name": "Stormwind Knight", "RegImage": "/330-156-603.png", "GoldImage": "/0-603-603.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_131_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_131_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_131_Play_01.ogg" }] }, { "Name": "Frostwolf Warlord", "RegImage": "/330-249-604.png", "GoldImage": "/0-604-604.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_226_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_226_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_226_Play_01.ogg" }] }, { "Name": "Cenarius", "RegImage": "/331-19-605.png", "GoldImage": "/0-605-605.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_573_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_573_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_573_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Misc1.ogg" }] }, { "Name": "Barrel Toss", "RegImage": "/334-758-606.png", "GoldImage": "/0-606-606.webm", "Sounds": [] }, { "Name": "Flesheating Ghoul", "RegImage": "/334-725-610.png", "GoldImage": "/0-610-610.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/tt_004_FleshEating_Ghoul_Attack1.ogg" }, { "Name": "Death1", "URL": "/tt_004_FleshEating_Ghoul_Death1.ogg" }, { "Name": "Play1", "URL": "/tt_004_FleshEating_Ghoul_EnterPlay1.ogg" }] }, { "Name": "Silverback Patriarch", "RegImage": "/330-153-611.png", "GoldImage": "/0-611-611.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CS2_127_Silverback_Patriarch_Attack3.ogg" }, { "Name": "Death1", "URL": "/CS2_127_Silverback_Patriarch_Death1.ogg" }, { "Name": "Play1", "URL": "/CS2_127_Silverback_Patriarch_EnterPlay1.ogg" }] }, { "Name": "Crazed Alchemist", "RegImage": "/330-447-612.png", "GoldImage": "/0-612-612.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_059_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_059_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_059_Play_01.ogg" }] }, { "Name": "Mana Tide Totem", "RegImage": "/331-31-613.png", "GoldImage": "/0-613-613.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_575_Attack_00.ogg" }, { "Name": "Death1", "URL": "/EX1_575_mana_tide_totem_Death.ogg" }, { "Name": "Play1", "URL": "/EX1_575_mana_tide_totem_EnterPlay.ogg" }, { "Name": "Trigger1", "URL": "/Spell_ManaTideTotem_CustomTrigger_1.ogg" }] }, { "Name": "Sea Giant", "RegImage": "/331-52-614.png", "GoldImage": "/0-614-614.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_586_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_586_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_586_EnterPlay.ogg" }] }, { "Name": "Gul'dan", "RegImage": "/331-740-618.png", "GoldImage": "/0-618-618.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_07_Attack_16.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_07_Death_17.ogg" }] }, { "Name": "Frost Lich Jaina", "RegImage": "/339-729-61810.png", "GoldImage": "/61-810-61810.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_833_Female_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_833_Female_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_833_Female_Human_Play_04.ogg" }] }, { "Name": "Ticking Abomination", "RegImage": "/339-470-61811.png", "GoldImage": "/61-811-61811.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_099_Male_Abomination_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/Ticking_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_099_Male_Abomination_Death_02.ogg" }, { "Name": "Death2", "URL": "/Ticking_Death_Underlay.ogg" }, { "Name": "Death3", "URL": "/NullSilence.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_099_Male_Abomination_Play_02.ogg" }, { "Name": "Play2", "URL": "/Ticking_Play_Underlay.ogg" }] }, { "Name": "Plague Scientist", "RegImage": "/339-639-61812.png", "GoldImage": "/61-812-61812.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_809_Male_Gnome_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_809_Male_Gnome_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_809_Male_Gnome_Play_01.ogg" }] }, { "Name": "Ice Breaker", "RegImage": "/339-518-61813.png", "GoldImage": "/61-813-61813.webm", "Collectible": true, "Sounds": [] }, { "Name": "Blood-Queen Lana'thel", "RegImage": "/339-758-61814.png", "GoldImage": "/61-814-61814.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_841_Female_Sanlayn_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_841_Female_Sanlayn_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_841_Female_Sanlayn_Play_01.ogg" }, { "Name": "Play2", "URL": "/Lanathel_Play_Stinger.ogg" }] }, { "Name": "Blood Razor", "RegImage": "/339-394-61815.png", "GoldImage": "/61-815-61815.webm", "Collectible": true, "Sounds": [] }, { "Name": "Prince Taldaram", "RegImage": "/339-770-61816.png", "GoldImage": "/61-816-61816.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_852_Male_Vampire_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_852_Male_Vampire_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_852_Male_Vampire_Play_01.ogg" }, { "Name": "Play2", "URL": "/Prince_Taldaram_Play_Stinger.ogg" }] }, { "Name": "Nerubian Unraveler", "RegImage": "/339-621-61817.png", "GoldImage": "/61-817-61817.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_706_Male_Nerubian_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_706_Male_Nerubian_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_706_Male_Nerubian_Play_01.ogg" }] }, { "Name": "Mountainfire Armor", "RegImage": "/339-391-61818.png", "GoldImage": "/61-818-61818.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_062_Male_Spirit_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Armor_Type_A_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_062_Male_Spirit_Death_01.ogg" }, { "Name": "Death2", "URL": "/Armor_Type_A_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_062_Male_Spirit_Play_02.ogg" }, { "Name": "Play2", "URL": "/Armor_Type_A_Play_Underlay.ogg" }] }, { "Name": "Professor Putricide", "RegImage": "/339-479-61819.png", "GoldImage": "/61-819-61819.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_204_Male_Undead_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_204_Male_Undead_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_204_Male_Undead_Play_02.ogg" }, { "Name": "Play2", "URL": "/Putricide_Play_Stinger.ogg" }, { "Name": "Trigger1", "URL": "/VO_ICC_204_Male_Undead_Trigger_01.ogg" }] }, { "Name": "Ghastly Conjurer", "RegImage": "/339-406-61820.png", "GoldImage": "/61-820-61820.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_080_Female_BloodElf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_080_Female_BloodElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_080_Female_BloodElf_Play_01.ogg" }] }, { "Name": "Leeching Poison", "RegImage": "/339-509-61821.png", "GoldImage": "/61-821-61821.webm", "Collectible": true, "Sounds": [] }, { "Name": "Sindragosa", "RegImage": "/339-752-61822.png", "GoldImage": "/61-822-61822.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_838_Female_Dragon_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_838_Female_Dragon_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_838_Female_Dragon_Play_03.ogg" }, { "Name": "Play2", "URL": "/Sindragosa_Play_Stinger.ogg" }] }, { "Name": "Frozen Champion", "RegImage": "/339-755-61823.png", "GoldImage": "/61-823-61823.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ICC_838t_FrozenChampion_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_838t_FrozenChampion_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_838t_FrozenChampion_Play.ogg" }] }, { "Name": "Bring It On!", "RegImage": "/339-749-61824.png", "GoldImage": "/61-824-61824.webm", "Collectible": true, "Sounds": [] }, { "Name": "Coldwraith", "RegImage": "/339-536-61825.png", "GoldImage": "/61-825-61825.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_252_Male_Undead_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_252_Male_Undead_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_252_Male_Undead_Play_02.ogg" }] }, { "Name": "Voodoo Hexxer", "RegImage": "/339-440-61826.png", "GoldImage": "/61-826-61826.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_912_Female_Troll_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/FrostMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_912_Female_Troll_Death_01.ogg" }, { "Name": "Death2", "URL": "/FrostMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_912_Female_Troll_Play_01.ogg" }, { "Name": "Play2", "URL": "/FrostMagic_Play_Underlay.ogg" }] }, { "Name": "Bearshark", "RegImage": "/339-587-61827.png", "GoldImage": "/61-827-61827.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/GrizzlyGrotesque_ICC_419_Attack.ogg" }, { "Name": "Death1", "URL": "/GrizzlyGrotesque_ICC_419_Death.ogg" }, { "Name": "Play1", "URL": "/GrizzlyGrotesque_ICC_419_Play.ogg" }] }, { "Name": "Hadronox", "RegImage": "/339-743-61828.png", "GoldImage": "/61-828-61828.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ICC_835_Hadronox_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_835_Hadronox_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_835_Hadronox_Play.ogg" }, { "Name": "Play2", "URL": "/Hadronox_Play_Stinger.ogg" }] }, { "Name": "Abominable Bowman", "RegImage": "/339-657-61829.png", "GoldImage": "/61-829-61829.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_243_Male_Abomination_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_243_Male_Abomination_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_243_Male_Abomination_Play_01.ogg" }] }, { "Name": "Fatespinner", "RegImage": "/339-337-61830.png", "GoldImage": "/61-830-61830.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_047_Female_Nerubian_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_047_Female_Nerubian_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_047_Female_Nerubian_Play_01.ogg" }] }, { "Name": "Bolvar, Fireblood", "RegImage": "/339-785-61831.png", "GoldImage": "/61-831-61831.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_858_Male_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_858_Male_Human_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_858_Male_Human_Play_02.ogg" }, { "Name": "Play2", "URL": "/Bolvar_Fireblood_Play_Stinger.ogg" }, { "Name": "Trigger1", "URL": "/VO_ICC_858_Male_Human_Trigger_03.ogg" }] }, { "Name": "Corpsetaker", "RegImage": "/339-815-61832.png", "GoldImage": "/61-832-61832.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_068_Female_BloodElf_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/ShadowMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_068_Female_BloodElf_Death_01.ogg" }, { "Name": "Death2", "URL": "/ShadowMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_068_Female_BloodElf_Play_02.ogg" }, { "Name": "Play2", "URL": "/ShadowMagic_Play_Underlay.ogg" }] }, { "Name": "Light's Sorrow", "RegImage": "/339-409-61833.png", "GoldImage": "/61-833-61833.webm", "Collectible": true, "Sounds": [] }, { "Name": "Bonemare", "RegImage": "/339-618-61834.png", "GoldImage": "/61-834-61834.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ICC_705_Bonemare_Attack.ogg" }, { "Name": "Attack2", "URL": "/ArmoredWarhorseNoVox_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/ICC_705_Bonemare_Death.ogg" }, { "Name": "Death2", "URL": "/ArmoredWarhorseNoVox_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/ICC_705_Bonemare_Play.ogg" }, { "Name": "Play2", "URL": "/ArmoredWarhorseNoVox_Play_Underlay.ogg" }] }, { "Name": "Eternal Servitude", "RegImage": "/339-494-61835.png", "GoldImage": "/61-835-61835.webm", "Collectible": true, "Sounds": [] }, { "Name": "Moonfire", "RegImage": "/329-892-619.png", "GoldImage": "/0-619-619.webm", "Collectible": true, "Sounds": [] }, { "Name": "Thoughtsteal", "RegImage": "/330-803-62.png", "GoldImage": "/0-62-62.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }, { "Name": "Play2", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }, { "Name": "Play3", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }] }, { "Name": "Swipe", "RegImage": "/329-901-620.png", "GoldImage": "/0-620-620.webm", "Collectible": true, "Sounds": [] }, { "Name": "Malfurion Stormrage", "RegImage": "/331-737-621.png", "GoldImage": "/0-621-621.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_06_Attack_16.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_06_Death_17.ogg" }] }, { "Name": "Flame Burst", "RegImage": "/334-803-622.png", "GoldImage": "/0-622-622.webm", "Sounds": [] }, { "Name": "Gurubashi Berserker", "RegImage": "/330-881-624.png", "GoldImage": "/0-624-624.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_399_Attack_02.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_399_Death_02.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_399_EnterPlay_02.ogg" }] }, { "Name": "Emperor Cobra", "RegImage": "/330-647-625.png", "GoldImage": "/0-625-625.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_170_Emperor_Cobra_Attack1.ogg" }, { "Name": "Death1", "URL": "/EX1_170_Emperor_Cobra_Death2.ogg" }, { "Name": "Play1", "URL": "/EX1_170_Emperor_Cobra_EnterPlay1.ogg" }] }, { "Name": "Spiteful Smith", "RegImage": "/330-243-627.png", "GoldImage": "/0-627-627.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_221_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_221_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_221_Play_01.ogg" }] }, { "Name": "Animated Berserker", "RegImage": "/339-521-62834.png", "GoldImage": "/62-834-62834.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_238_Male_Spirit_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Armor_Type_A_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_238_Male_Spirit_Death_01.ogg" }, { "Name": "Death2", "URL": "/Armor_Type_A_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_238_Male_Spirit_Play_02.ogg" }, { "Name": "Play2", "URL": "/Armor_Type_A_Play_Underlay.ogg" }, { "Name": "Trigger1", "URL": "/VO_ICC_238_Male_Spirit_Trigger_01.ogg" }, { "Name": "Trigger2", "URL": "/Armor_Type_A_Trigger_Underlay.ogg" }] }, { "Name": "Sanguine Reveler", "RegImage": "/339-800-62835.png", "GoldImage": "/62-835-62835.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_903_Male_Sanlayn_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_903_Male_Sanlayn_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_903_Male_Sanlayn_Play_01.ogg" }] }, { "Name": "Howling Commander", "RegImage": "/339-627-62836.png", "GoldImage": "/62-836-62836.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_801_Female_Dwarf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_801_Female_Dwarf_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_801_Female_Dwarf_Play_01.ogg" }] }, { "Name": "Venomstrike Trap", "RegImage": "/339-473-62837.png", "GoldImage": "/62-837-62837.webm", "Collectible": true, "Sounds": [] }, { "Name": "Shadowblade", "RegImage": "/339-764-62838.png", "GoldImage": "/62-838-62838.webm", "Collectible": true, "Sounds": [] }, { "Name": "Snowflipper Penguin", "RegImage": "/339-295-62839.png", "GoldImage": "/62-839-62839.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ICC_023_SnowFlipper_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_023_SnowFlipper_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_023_SnowFlipper_Play.ogg" }] }, { "Name": "Defile", "RegImage": "/339-334-62840.png", "GoldImage": "/62-840-62840.webm", "Collectible": true, "Sounds": [] }, { "Name": "Spreading Plague", "RegImage": "/339-379-62841.png", "GoldImage": "/62-841-62841.webm", "Collectible": true, "Sounds": [] }, { "Name": "Dead Man's Hand", "RegImage": "/339-449-62842.png", "GoldImage": "/62-842-62842.webm", "Collectible": true, "Sounds": [] }, { "Name": "Icy Touch", "RegImage": "/339-731-62843.png", "Sounds": [] }, { "Name": "Prince Valanar", "RegImage": "/339-773-62844.png", "GoldImage": "/62-844-62844.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_853_Male_Vampire_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_853_Male_Vampire_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_853_Male_Vampire_Play_01.ogg" }, { "Name": "Play2", "URL": "/Prince_Valanar_Play_Stinger.ogg" }] }, { "Name": "Moorabi", "RegImage": "/339-545-62845.png", "GoldImage": "/62-845-62845.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_289_Male_Troll_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_289_Male_Troll_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_289_Male_Troll_Play_02.ogg" }, { "Name": "Play2", "URL": "/Moorabi_Play_Stinger.ogg" }, { "Name": "Trigger1", "URL": "/VO_ICC_289_Male_Troll_Trigger_02.ogg" }] }, { "Name": "Cryostasis", "RegImage": "/339-385-62846.png", "GoldImage": "/62-846-62846.webm", "Collectible": true, "Sounds": [] }, { "Name": "Doomed Apprentice", "RegImage": "/339-428-62847.png", "GoldImage": "/62-847-62847.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_083_Female_Gnome_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/FrostMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_083_Female_Gnome_Death_01.ogg" }, { "Name": "Death2", "URL": "/FrostMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_083_Female_Gnome_Play_01.ogg" }, { "Name": "Play2", "URL": "/FrostMagic_Play_Underlay.ogg" }] }, { "Name": "Ice Walker", "RegImage": "/339-403-62848.png", "GoldImage": "/62-848-62848.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ICC_068_IceWalker_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_068_IceWalker_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_068_IceWalker_Play.ogg" }] }, { "Name": "Meat Wagon", "RegImage": "/339-648-62849.png", "GoldImage": "/62-849-62849.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/MeatWagon_ICC_812_Attack.ogg" }, { "Name": "Death1", "URL": "/MeatWagon_ICC_812_Death.ogg" }, { "Name": "Play1", "URL": "/MeatWagon_ICC_812_Play.ogg" }] }, { "Name": "Necrotic Geist", "RegImage": "/339-788-62850.png", "GoldImage": "/62-850-62850.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_900_Male_Geist_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_900_Male_Geist_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_900_Male_Geist_Play_01.ogg" }, { "Name": "Trigger1", "URL": "/VO_ICC_900_Male_Geist_Trigger_02.ogg" }] }, { "Name": "Cobalt Scalebane", "RegImage": "/339-316-62851.png", "GoldImage": "/62-851-62851.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_027_Male_Dragon_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_027_Male_Dragon_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_027_Male_Dragon_Play_01.ogg" }] }, { "Name": "Gnomeferatu", "RegImage": "/339-578-62852.png", "GoldImage": "/62-852-62852.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_407_Female_Gnome_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_407_Female_Gnome_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_407_Female_Gnome_Play_01.ogg" }] }, { "Name": "Val'kyr Soulclaimer", "RegImage": "/339-581-62853.png", "GoldImage": "/62-853-62853.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_408_Female_ValKyr_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_408_Female_ValKyr_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_408_Female_ValKyr_Play_01.ogg" }] }, { "Name": "Stitched Tracker", "RegImage": "/339-584-62854.png", "GoldImage": "/62-854-62854.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_415_Male_Orc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_415_Male_Orc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_415_Male_Orc_Play_01.ogg" }] }, { "Name": "Sunborne Val'kyr", "RegImage": "/339-313-62855.png", "GoldImage": "/62-855-62855.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_028_Female_ValKyr_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_028_Female_ValKyr_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_028_Female_ValKyr_Play_01.ogg" }] }, { "Name": "Archbishop Benedictus", "RegImage": "/339-500-62856.png", "GoldImage": "/62-856-62856.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_215_Male_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_215_Male_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_215_Male_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/Benedictus_Play_Stinger.ogg" }] }, { "Name": "Embrace Darkness", "RegImage": "/339-761-62857.png", "GoldImage": "/62-857-62857.webm", "Collectible": true, "Sounds": [] }, { "Name": "Phantom Freebooter", "RegImage": "/339-283-62858.png", "GoldImage": "/62-858-62858.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_KAR_061i_Female_Ghost_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_KAR_061i_Female_Ghost_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_KAR_061i_Female_Ghost_Play_01.ogg" }] }, { "Name": "Mindbreaker", "RegImage": "/339-797-62859.png", "GoldImage": "/62-859-62859.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_902_Male_Undead_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_902_Male_Undead_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_902_Male_Undead_Play_01.ogg" }] }, { "Name": "Crypt Lord", "RegImage": "/339-636-62860.png", "GoldImage": "/62-860-62860.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_807_Male_GiantBeetle_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_807_Male_GiantBeetle_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_807_Male_GiantBeetle_Play_02.ogg" }] }, { "Name": "Thrall, Deathseer", "RegImage": "/340-195-62861.png", "GoldImage": "/62-861-62861.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_481_Male_Orc_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_481_Male_Orc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_481_Male_Orc_Play_01.ogg" }] }, { "Name": "Transmute Spirit", "RegImage": "/339-607-62862.png", "Sounds": [] }, { "Name": "Tomb Lurker", "RegImage": "/339-467-62863.png", "GoldImage": "/62-863-62863.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_098_Female_Geist_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_098_Female_Geist_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_098_Female_Geist_Play_01.ogg" }] }, { "Name": "Righteous Protector", "RegImage": "/339-328-62864.png", "GoldImage": "/62-864-62864.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_092_Female_BloodElf_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_092_Female_BloodElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_092_Female_BloodElf_Play_01.ogg" }] }, { "Name": "Runeforge Haunter", "RegImage": "/339-524-62865.png", "GoldImage": "/62-865-62865.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ICC_240_RuneforgeHaunter_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_240_RuneforgeHaunter_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_240_RuneforgeHaunter_Play.ogg" }] }, { "Name": "Corpse Raiser", "RegImage": "/339-539-62866.png", "GoldImage": "/62-866-62866.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_257_Male_Ymirjar_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/ShadowMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_257_Male_Ymirjar_Death_02.ogg" }, { "Name": "Death2", "URL": "/ShadowMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_257_Male_Ymirjar_Play_01.ogg" }, { "Name": "Play2", "URL": "/ShadowMagic_Play_Underlay.ogg" }] }, { "Name": "Corpse Widow", "RegImage": "/339-527-62867.png", "GoldImage": "/62-867-62867.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CorpseWidow_ICC_243_Attack.ogg" }, { "Name": "Death1", "URL": "/CorpseWidow_ICC_243_Death.ogg" }, { "Name": "Play1", "URL": "/CorpseWidow_ICC_243_Play.ogg" }] }, { "Name": "Devour Mind", "RegImage": "/339-485-62868.png", "GoldImage": "/62-868-62868.webm", "Collectible": true, "Sounds": [{ "Name": "Play1", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }, { "Name": "Play2", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }, { "Name": "Play3", "URL": "/Warlock_SiphonSoul_CasterImpact_1.ogg" }] }, { "Name": "Glacial Mysteries", "RegImage": "/339-437-62869.png", "GoldImage": "/62-869-62869.webm", "Collectible": true, "Sounds": [] }, { "Name": "Obsidian Statue", "RegImage": "/339-497-62870.png", "GoldImage": "/62-870-62870.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ObsidianStatue_ICC_214_Attack.ogg" }, { "Name": "Death1", "URL": "/ObsidianStatue_ICC_214_Death.ogg" }, { "Name": "Play1", "URL": "/ObsidianStatue_ICC_214_Play.ogg" }] }, { "Name": "Simulacrum", "RegImage": "/339-654-62871.png", "GoldImage": "/62-871-62871.webm", "Collectible": true, "Sounds": [] }, { "Name": "Lilian Voss", "RegImage": "/339-645-62872.png", "GoldImage": "/62-872-62872.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_811_Female_Undead_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_811_Female_Undead_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_811_Female_Undead_Play_01.ogg" }, { "Name": "Play2", "URL": "/Lilian_Voss_Play_Stinger.ogg" }] }, { "Name": "Unwilling Sacrifice", "RegImage": "/339-602-62873.png", "GoldImage": "/62-873-62873.webm", "Collectible": true, "Sounds": [] }, { "Name": "Brrrloc", "RegImage": "/339-388-62874.png", "GoldImage": "/62-874-62874.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_058_Male_Murloc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_058_Male_Murloc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_058_Male_Murloc_Play_02.ogg" }] }, { "Name": "Treachery", "RegImage": "/339-482-62875.png", "GoldImage": "/62-875-62875.webm", "Collectible": true, "Sounds": [] }, { "Name": "Valeera the Hollow", "RegImage": "/339-660-62876.png", "GoldImage": "/62-876-62876.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_827_Female_BloodElf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_827_Female_BloodElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_827_Female_BloodElf_Play_01.ogg" }] }, { "Name": "Death's Shadow", "RegImage": "/339-662-62877.png", "GoldImage": "/62-877-62877.webm", "Sounds": [] }, { "Name": "Shadow Reflection", "RegImage": "/339-664-62878.png", "GoldImage": "/62-878-62878.webm", "Sounds": [] }, { "Name": "Ultimate Infestation", "RegImage": "/339-431-62879.png", "GoldImage": "/62-879-62879.webm", "Collectible": true, "Sounds": [] }, { "Name": "Desperate Stand", "RegImage": "/339-530-62880.png", "GoldImage": "/62-880-62880.webm", "Collectible": true, "Sounds": [] }, { "Name": "Ghoul", "RegImage": "/339-791-62881.png", "GoldImage": "/62-881-62881.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ICC_034t_Ghoul_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_034t_Ghoul_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_034t_Ghoul_Play.ogg" }] }, { "Name": "Shadow Ascendant", "RegImage": "/339-488-62882.png", "GoldImage": "/62-882-62882.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_210_Female_Undead_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/ShadowMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_210_Female_Undead_Death_01.ogg" }, { "Name": "Death2", "URL": "/ShadowMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_210_Female_Undead_Play_01.ogg" }, { "Name": "Play2", "URL": "/ShadowMagic_Play_Underlay.ogg" }] }, { "Name": "Skulking Geist", "RegImage": "/339-612-62883.png", "GoldImage": "/62-883-62883.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_701_Male_Geist_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_701_Male_Geist_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_701_Male_Geist_Play_01.ogg" }, { "Name": "Play2", "URL": "/SkulkingGeist_DecksandHands_AE_BothSides.ogg" }] }, { "Name": "Ice Fishing", "RegImage": "/339-443-62884.png", "GoldImage": "/62-884-62884.webm", "Collectible": true, "Sounds": [] }, { "Name": "Roll the Bones", "RegImage": "/339-476-62885.png", "GoldImage": "/62-885-62885.webm", "Collectible": true, "Sounds": [] }, { "Name": "Acolyte of Agony", "RegImage": "/339-491-62886.png", "GoldImage": "/62-886-62886.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_212_Male_Undead_Attack_03.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_212_Male_Undead_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_212_Male_Undead_Play_01.ogg" }] }, { "Name": "Drakkari Defender", "RegImage": "/339-421-62887.png", "GoldImage": "/62-887-62887.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_081_Male_Troll_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_081_Male_Troll_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_081_Male_Troll_Play_02.ogg" }] }, { "Name": "Fallen Sun Cleric", "RegImage": "/339-458-62888.png", "GoldImage": "/62-888-62888.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_019_Female_BloodElf_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_019_Female_BloodElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_019_Female_BloodElf_Play_03.ogg" }] }, { "Name": "Shadowreaper Anduin", "RegImage": "/339-699-62889.png", "GoldImage": "/62-889-62889.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_830_Male_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_830_Male_Human_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_830_Male_Human_Play_01.ogg" }] }, { "Name": "Voidform", "RegImage": "/339-701-62890.png", "Sounds": [] }, { "Name": "Play Dead", "RegImage": "/339-376-62891.png", "GoldImage": "/62-891-62891.webm", "Collectible": true, "Sounds": [] }, { "Name": "Deathspeaker", "RegImage": "/339-596-62892.png", "GoldImage": "/62-892-62892.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_467_Female_Nerubian_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_467_Female_Nerubian_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_467_Female_Nerubian_Play_01.ogg" }] }, { "Name": "Rattling Rascal", "RegImage": "/339-298-62893.png", "GoldImage": "/62-893-62893.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_025_Male_Skeleton_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_025_Male_Skeleton_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_025_Male_Skeleton_Play_01.ogg" }] }, { "Name": "Howlfiend", "RegImage": "/339-503-62894.png", "GoldImage": "/62-894-62894.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ICC_218_Howlfiend_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_218_Howlfiend_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_218_Howlfiend_Play.ogg" }] }, { "Name": "Frozen Clone", "RegImage": "/339-424-62895.png", "GoldImage": "/62-895-62895.webm", "Collectible": true, "Sounds": [] }, { "Name": "Shadow Essence", "RegImage": "/339-515-62896.png", "GoldImage": "/62-896-62896.webm", "Collectible": true, "Sounds": [] }, { "Name": "Breath of Sindragosa", "RegImage": "/339-746-62897.png", "GoldImage": "/62-897-62897.webm", "Collectible": true, "Sounds": [] }, { "Name": "Rotface", "RegImage": "/339-575-62898.png", "GoldImage": "/62-898-62898.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_405_Male_Abomination_Attack_03.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_405_Male_Abomination_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_405_Male_Abomination_Play_01.ogg" }, { "Name": "Play2", "URL": "/Rotface_Play_Stinger.ogg" }, { "Name": "Trigger1", "URL": "/VO_ICC_405_Male_Abomination_Trigger_01.ogg" }] }, { "Name": "Bone Drake", "RegImage": "/339-310-62899.png", "GoldImage": "/62-899-62899.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/BoneDrake_ICC_027_Attack.ogg" }, { "Name": "Death1", "URL": "/BoneDrake_ICC_027_Death.ogg" }, { "Name": "Play1", "URL": "/BoneDrake_ICC_027_Play.ogg" }] }, { "Name": "Young Dragonhawk", "RegImage": "/330-192-629.png", "GoldImage": "/0-629-629.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CS2_169_Young_Dragonhawk_Attack1.ogg" }, { "Name": "Attack2", "URL": "/WingedMount1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/CS2_169_Young_Dragonhawk_Death1.ogg" }, { "Name": "Death2", "URL": "/WingedMount1_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/CS2_169_Young_Dragonhawk_EnterPlay1.ogg" }, { "Name": "Play2", "URL": "/WingedMount1_Play_Underlay.ogg" }] }, { "Name": "Webweave", "RegImage": "/339-355-62900.png", "GoldImage": "/62-900-62900.webm", "Collectible": true, "Sounds": [] }, { "Name": "Saronite Chain Gang", "RegImage": "/339-593-62901.png", "GoldImage": "/62-901-62901.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_466_Male_Draenei_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_466_Male_Draenei_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_466_Male_Draenei_Play_01.ogg" }, { "Name": "Play2", "URL": "/ChainGang_Play_Underlay.ogg" }] }, { "Name": "Happy Ghoul", "RegImage": "/339-609-62902.png", "GoldImage": "/62-902-62902.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_715_Male_Ghoul_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_715_Male_Ghoul_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_715_Male_Ghoul_Play_01.ogg" }] }, { "Name": "Despicable Dreadlord", "RegImage": "/339-412-62903.png", "GoldImage": "/62-903-62903.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_075_Male_Dreadlord_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_075_Male_Dreadlord_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_075_Male_Dreadlord_Play_01.ogg" }] }, { "Name": "Malfurion the Pestilent", "RegImage": "/340-193-62904.png", "GoldImage": "/62-904-62904.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_832_Male_NightElf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_832_Male_NightElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_832_Male_NightElf_Play_03.ogg" }] }, { "Name": "Druid of the Swarm", "RegImage": "/339-358-62905.png", "GoldImage": "/62-905-62905.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_051_Female_NightElf_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_051_Female_NightElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_051_Female_NightElf_Play_02.ogg" }] }, { "Name": "Uther of the Ebon Blade", "RegImage": "/339-680-62906.png", "GoldImage": "/62-906-62906.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_829_Male_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_829_Male_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_829_Male_Human_Play_02.ogg" }] }, { "Name": "Blackguard", "RegImage": "/339-533-62907.png", "GoldImage": "/62-907-62907.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_245_Male_Draenei_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_245_Male_Draenei_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_245_Male_Draenei_Play_02.ogg" }] }, { "Name": "Plague Lord", "RegImage": "/339-715-62908.png", "Sounds": [] }, { "Name": "Spider Plague", "RegImage": "/339-712-62909.png", "GoldImage": "/62-909-62909.webm", "Sounds": [] }, { "Name": "Scarab Plague", "RegImage": "/339-709-62910.png", "GoldImage": "/62-910-62910.webm", "Sounds": [] }, { "Name": "Spider Fangs", "RegImage": "/339-720-62911.png", "GoldImage": "/62-911-62911.webm", "Sounds": [] }, { "Name": "Scarab Shell", "RegImage": "/339-717-62912.png", "GoldImage": "/62-912-62912.webm", "Sounds": [] }, { "Name": "The Four Horsemen", "RegImage": "/339-682-62913.png", "GoldImage": "/62-913-62913.webm", "Sounds": [] }, { "Name": "Spider Form", "RegImage": "/339-361-62914.png", "GoldImage": "/62-914-62914.webm", "Sounds": [] }, { "Name": "Scarab Form", "RegImage": "/339-364-62915.png", "GoldImage": "/62-915-62915.webm", "Sounds": [] }, { "Name": "Grave Vengeance", "RegImage": "/339-684-62916.png", "GoldImage": "/62-916-62916.webm", "Sounds": [] }, { "Name": "Forge of Souls", "RegImage": "/339-542-62917.png", "GoldImage": "/62-917-62917.webm", "Collectible": true, "Sounds": [] }, { "Name": "Snowfury Giant", "RegImage": "/339-446-62918.png", "GoldImage": "/62-918-62918.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ICC_090_SnowfuryGiant_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_090_SnowfuryGiant_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_090_SnowfuryGiant_Play.ogg" }] }, { "Name": "Night Howler", "RegImage": "/339-319-62919.png", "GoldImage": "/62-919-62919.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_023_Male_Worgen_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_023_Male_Worgen_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_023_Male_Worgen_Play_01.ogg" }] }, { "Name": "Hyldnir Frostrider", "RegImage": "/339-779-62920.png", "GoldImage": "/62-920-62920.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_855_Female_Vrykul_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/CS2_125_Ironfur_Grizzly_Attack3.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_855_Female_Vrykul_Death_01.ogg" }, { "Name": "Death2", "URL": "/CS2_125_Ironfur_Grizzly_Death1.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_855_Female_Vrykul_Play_01.ogg" }, { "Name": "Play2", "URL": "/ArmoredTiger_Play_Underlay.ogg" }] }, { "Name": "Avalanche", "RegImage": "/339-415-62921.png", "GoldImage": "/62-921-62921.webm", "Collectible": true, "Sounds": [] }, { "Name": "The Lich King", "RegImage": "/339-548-62922.png", "GoldImage": "/62-922-62922.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_239_Male_Human_Attack_03.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_239_Male_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_239_Male_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/LichKing_Play_Stinger.ogg" }, { "Name": "Trigger1", "URL": "/SpawnToHand_LichKing_FX_Sound.ogg" }] }, { "Name": "Arfus", "RegImage": "/339-776-62923.png", "GoldImage": "/62-923-62923.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ICC_854_Arfus_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_854_Arfus_Death.ogg" }, { "Name": "Play1", "URL": "/Arfus_Play_Stinger.ogg" }, { "Name": "Play2", "URL": "/ICC_854_Arfus_Play.ogg" }, { "Name": "Trigger1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "Furnacefire Colossus", "RegImage": "/339-461-62924.png", "GoldImage": "/62-924-62924.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_096_Male_Giant_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_096_Male_Giant_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_096_Male_Giant_Play_02.ogg" }] }, { "Name": "Bladestorm", "RegImage": "/339-738-62925.png", "Sounds": [] }, { "Name": "Death Revenant", "RegImage": "/339-590-62926.png", "GoldImage": "/62-926-62926.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_450_Male_Spirit_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Armor_Type_A_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_450_Male_Spirit_Death_01.ogg" }, { "Name": "Death2", "URL": "/Armor_Type_A_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_450_Male_Spirit_Play_01.ogg" }, { "Name": "Play2", "URL": "/Armor_Type_A_Play_Underlay.ogg" }] }, { "Name": "Scourgelord Garrosh", "RegImage": "/339-736-62927.png", "GoldImage": "/62-927-62927.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_834_Male_Orc_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_834_Male_Orc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_834_Male_Orc_Play_01.ogg" }] }, { "Name": "Drain Soul", "RegImage": "/339-382-62928.png", "GoldImage": "/62-928-62928.webm", "Collectible": true, "Sounds": [] }, { "Name": "Drakkari Enchanter", "RegImage": "/339-794-62929.png", "GoldImage": "/62-929-62929.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_029_Female_Troll_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_029_Female_Troll_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_029_Female_Troll_Play_01.ogg" }] }, { "Name": "Arrogant Crusader", "RegImage": "/339-325-62930.png", "GoldImage": "/62-930-62930.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_034_Male_BloodElf_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_034_Male_BloodElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_034_Male_BloodElf_Play_02.ogg" }] }, { "Name": "Deadscale Knight", "RegImage": "/339-506-62931.png", "GoldImage": "/62-931-62931.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_220_Male_Murloc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_220_Male_Murloc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_220_Male_Murloc_Play_01.ogg" }] }, { "Name": "Dark Conviction", "RegImage": "/339-331-62932.png", "GoldImage": "/62-932-62932.webm", "Collectible": true, "Sounds": [] }, { "Name": "Bloodworm", "RegImage": "/339-806-62933.png", "GoldImage": "/62-933-62933.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ICC_905_Bloodworm_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_905_Bloodworm_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_905_Bloodworm_Play.ogg" }] }, { "Name": "Bloodreaver Gul'dan", "RegImage": "/340-191-62934.png", "GoldImage": "/62-934-62934.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_831_Male_Orc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_831_Male_Orc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_831_Male_Orc_Play_01.ogg" }] }, { "Name": "Siphon Life", "RegImage": "/339-705-62935.png", "Sounds": [] }, { "Name": "Strongshell Scavenger", "RegImage": "/339-633-62936.png", "GoldImage": "/62-936-62936.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_808_Male_Tauren_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_808_Male_Tauren_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_808_Male_Tauren_Play_01.ogg" }] }, { "Name": "Tuskarr Fisherman", "RegImage": "/339-455-62937.png", "GoldImage": "/62-937-62937.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_093_Male_Tuskar_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_093_Male_Tuskar_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_093_Male_Tuskar_Play_01.ogg" }] }, { "Name": "Spellweaver", "RegImage": "/339-782-62938.png", "GoldImage": "/62-938-62938.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_713_Female_SpiderDruid_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_713_Female_SpiderDruid_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_713_Female_SpiderDruid_Play_01.ogg" }] }, { "Name": "Bone Baron", "RegImage": "/339-397-62939.png", "GoldImage": "/62-939-62939.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_065_Male_Human_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/MeatWagon_ICC_812_Attack.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_065_Male_Human_Death_01.ogg" }, { "Name": "Death2", "URL": "/MeatWagon_ICC_812_Death.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_065_Male_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/MeatWagon_ICC_812_Play.ogg" }] }, { "Name": "Doomerang", "RegImage": "/339-512-62940.png", "GoldImage": "/62-940-62940.webm", "Collectible": true, "Sounds": [] }, { "Name": "Vryghoul", "RegImage": "/339-400-62941.png", "GoldImage": "/62-941-62941.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_067_Male_Vargul_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_067_Male_Vargul_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_067_Male_Vargul_Play_01.ogg" }] }, { "Name": "Exploding Bloatbat", "RegImage": "/339-292-62942.png", "GoldImage": "/62-942-62942.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ExplodingBloatbat_ICC_021_Attack.ogg" }, { "Name": "Death1", "URL": "/ExplodingBloatbat_ICC_021_Death.ogg" }, { "Name": "Play1", "URL": "/ExplodingBloatbat_ICC_021_Play.ogg" }] }, { "Name": "Skelemancer", "RegImage": "/339-286-62943.png", "GoldImage": "/62-943-62943.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_094_Male_Undead_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/ShadowMagic_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_094_Male_Undead_Death_01.ogg" }, { "Name": "Death2", "URL": "/ShadowMagic_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_094_Male_Undead_Play_01.ogg" }, { "Name": "Play2", "URL": "/ShadowMagic_Play_Underlay.ogg" }] }, { "Name": "Wicked Skeleton", "RegImage": "/339-803-62944.png", "GoldImage": "/62-944-62944.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_904_Female_Skeleton_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_904_Female_Skeleton_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_904_Female_Skeleton_Play_01.ogg" }] }, { "Name": "Spectral Pillager", "RegImage": "/339-809-62945.png", "GoldImage": "/62-945-62945.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_910_Female_Banshee_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Pillager_Play_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_910_Female_Banshee_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_910_Female_Banshee_Play_03.ogg" }, { "Name": "Play2", "URL": "/Pillager_Play_Underlay.ogg" }] }, { "Name": "Wretched Tiller", "RegImage": "/339-599-62946.png", "GoldImage": "/62-946-62946.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_468_Male_Undead_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/FourHoofSmall_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_468_Male_Undead_Death_01.ogg" }, { "Name": "Death2", "URL": "/FourHoofSmall_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_468_Male_Undead_Play_01.ogg" }, { "Name": "Play2", "URL": "/FourHoofSmall_Play_Underlay.ogg" }] }, { "Name": "Grim Necromancer", "RegImage": "/339-304-62947.png", "GoldImage": "/62-947-62947.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_285_Female_Undead_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_285_Female_Undead_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_285_Female_Undead_Play_01.ogg" }] }, { "Name": "Acherus Veteran", "RegImage": "/339-452-62948.png", "GoldImage": "/62-948-62948.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_411_Female_NightElf_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_411_Female_NightElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_411_Female_NightElf_Play_02.ogg" }] }, { "Name": "Deathaxe Punisher", "RegImage": "/339-642-62949.png", "GoldImage": "/62-949-62949.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_810_Male_Undead_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_810_Male_Undead_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_810_Male_Undead_Play_01.ogg" }] }, { "Name": "Grave Shambler", "RegImage": "/339-464-62950.png", "GoldImage": "/62-950-62950.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/ICC_097_ShamblingMound_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_097_ShamblingMound_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_097_ShamblingMound_Play.ogg" }] }, { "Name": "Tainted Zealot", "RegImage": "/339-818-62951.png", "GoldImage": "/62-951-62951.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_214_Female_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_214_Female_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_214_Female_Human_Play_01.ogg" }] }, { "Name": "Toxic Arrow", "RegImage": "/339-352-62952.png", "GoldImage": "/62-952-62952.webm", "Collectible": true, "Sounds": [] }, { "Name": "Venomancer", "RegImage": "/339-322-62953.png", "GoldImage": "/62-953-62953.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_032_Female_Nerubian_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/Corrupted_Idle_03_Sound.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_032_Female_Nerubian_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_032_Female_Nerubian_Play_01.ogg" }, { "Name": "Play2", "URL": "/Corrupted_Idle_03_Sound.ogg" }] }, { "Name": "Keening Banshee", "RegImage": "/339-812-62954.png", "GoldImage": "/62-954-62954.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_280_Female_Banshee_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_280_Female_Banshee_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_280_Female_Banshee_Play_01.ogg" }] }, { "Name": "Gnash", "RegImage": "/339-418-62955.png", "GoldImage": "/62-955-62955.webm", "Collectible": true, "Sounds": [] }, { "Name": "Reinforce", "RegImage": "/339-159-62957.png", "Sounds": [] }, { "Name": "The Silver Hand", "RegImage": "/339-161-62958.png", "Sounds": [] }, { "Name": "Soldiers of the Cold Dark", "RegImage": "/339-242-62959.png", "GoldImage": "/62-959-62959.webm", "Sounds": [] }, { "Name": "Relentless March", "RegImage": "/339-245-62960.png", "GoldImage": "/62-960-62960.webm", "Sounds": [] }, { "Name": "Remorseless Winter", "RegImage": "/339-248-62963.png", "Sounds": [] }, { "Name": "To My Aid Underling!", "RegImage": "/339-250-62964.png", "GoldImage": "/62-964-62964.webm", "Sounds": [] }, { "Name": "Freezing Blast", "RegImage": "/339-253-62965.png", "Sounds": [] }, { "Name": "Blood-Queen Lana'thel", "RegImage": "/339-255-62966.png", "Sounds": [] }, { "Name": "The Final Battle", "RegImage": "/339-257-62968.png", "GoldImage": "/62-968-62968.webm", "Sounds": [] }, { "Name": "Cancelling the Apocalypse!", "RegImage": "/339-260-62969.png", "GoldImage": "/62-969-62969.webm", "Sounds": [] }, { "Name": "Lord Marrowgar", "RegImage": "/339-190-62970.png", "Sounds": [] }, { "Name": "Professor Putricide", "RegImage": "/339-192-62971.png", "Sounds": [] }, { "Name": "Sindragosa", "RegImage": "/339-194-62972.png", "Sounds": [] }, { "Name": "MASSIVE Difficulty", "RegImage": "/339-196-62974.png", "GoldImage": "/62-974-62974.webm", "Sounds": [] }, { "Name": "Heroic Difficulty", "RegImage": "/339-199-62975.png", "GoldImage": "/62-975-62975.webm", "Sounds": [] }, { "Name": "Normal Difficulty", "RegImage": "/339-202-62976.png", "GoldImage": "/62-976-62976.webm", "Sounds": [] }, { "Name": "A New Hero Approaches", "RegImage": "/339-205-62977.png", "GoldImage": "/62-977-62977.webm", "Sounds": [] }, { "Name": "Druid", "RegImage": "/339-208-62978.png", "GoldImage": "/62-978-62978.webm", "Sounds": [] }, { "Name": "Hunter", "RegImage": "/339-211-62981.png", "GoldImage": "/62-981-62981.webm", "Sounds": [] }, { "Name": "Mage", "RegImage": "/339-214-62983.png", "GoldImage": "/62-983-62983.webm", "Sounds": [] }, { "Name": "New Hero!", "RegImage": "/339-217-62985.png", "GoldImage": "/62-985-62985.webm", "Sounds": [] }, { "Name": "Paladin", "RegImage": "/339-220-62986.png", "GoldImage": "/62-986-62986.webm", "Sounds": [] }, { "Name": "Priest", "RegImage": "/339-223-62988.png", "GoldImage": "/62-988-62988.webm", "Sounds": [] }, { "Name": "Supreme Lich King", "RegImage": "/339-226-62990.png", "Sounds": [{ "Name": "Trigger1", "URL": "/DamagedArthas_Sound.ogg" }, { "Name": "Trigger2", "URL": "/DamagedArthas_Sound.ogg" }] }, { "Name": "Supreme Lich King", "RegImage": "/339-228-62991.png", "Sounds": [] }, { "Name": "Rogue", "RegImage": "/339-230-62992.png", "GoldImage": "/62-992-62992.webm", "Sounds": [] }, { "Name": "Shaman", "RegImage": "/339-233-62994.png", "GoldImage": "/62-994-62994.webm", "Sounds": [] }, { "Name": "Warlock", "RegImage": "/339-236-62997.png", "GoldImage": "/62-997-62997.webm", "Sounds": [] }, { "Name": "Warrior", "RegImage": "/339-239-62999.png", "GoldImage": "/62-999-62999.webm", "Sounds": [] }, { "Name": "Violet Apprentice", "RegImage": "/333-507-63.png", "GoldImage": "/0-63-63.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_026t_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_026t_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_026t_Play_01.ogg" }] }, { "Name": "Flare", "RegImage": "/330-965-630.png", "GoldImage": "/0-630-630.webm", "Collectible": true, "Sounds": [] }, { "Name": "Fight the Lich King!", "RegImage": "/339-263-63004.png", "GoldImage": "/63-4-63004.webm", "Sounds": [] }, { "Name": "Lich King Modifications", "RegImage": "/339-266-63006.png", "GoldImage": "/63-6-63006.webm", "Sounds": [] }, { "Name": "Increase Health", "RegImage": "/339-269-63007.png", "GoldImage": "/63-7-63007.webm", "Sounds": [] }, { "Name": "Decrease Health", "RegImage": "/339-272-63008.png", "GoldImage": "/63-8-63008.webm", "Sounds": [] }, { "Name": "Modifications Complete", "RegImage": "/339-275-63009.png", "GoldImage": "/63-9-63009.webm", "Sounds": [] }, { "Name": "Prince Arthas", "RegImage": "/339-281-63011.png", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_Arthas_Male_Human_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_Arthas_Male_Human_DEATH_01.ogg" }] }, { "Name": "Skeletal Flayer", "RegImage": "/339-289-63013.png", "GoldImage": "/63-13-63013.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ICC_019t_SkeletalFlayer_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_019t_SkeletalFlayer_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_019t_SkeletalFlayer_Play.ogg" }] }, { "Name": "Skeletal Enforcer", "RegImage": "/339-301-63014.png", "GoldImage": "/63-14-63014.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_025t_Male_Giant_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_025t_Male_Giant_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_025t_Male_Giant_Play_01.ogg" }] }, { "Name": "Skeleton", "RegImage": "/339-307-63015.png", "GoldImage": "/63-15-63015.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ICC_026t_Male_Skeleton_Attack.ogg" }, { "Name": "Attack2", "URL": "/Sword1_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/ICC_026t_Male_Skeleton_Death.ogg" }, { "Name": "Death2", "URL": "/BlackPawn_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/ICC_026t_Male_Skeleton_Play.ogg" }, { "Name": "Play2", "URL": "/BlackPawn_Play_Underlay.ogg" }] }, { "Name": "Growth", "RegImage": "/339-340-63021.png", "GoldImage": "/63-21-63021.webm", "Sounds": [] }, { "Name": "Decay", "RegImage": "/339-343-63022.png", "GoldImage": "/63-22-63022.webm", "Sounds": [] }, { "Name": "Fatespinner", "RegImage": "/339-346-63024.png", "GoldImage": "/63-24-63024.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_047_Female_Nerubian_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_047_Female_Nerubian_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_047_Female_Nerubian_Play_02.ogg" }] }, { "Name": "Fatespinner", "RegImage": "/339-349-63025.png", "GoldImage": "/63-25-63025.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_047_Female_Nerubian_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_047_Female_Nerubian_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_047_Female_Nerubian_Play_02.ogg" }] }, { "Name": "Druid of the Swarm", "RegImage": "/339-367-63029.png", "GoldImage": "/63-29-63029.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ICC_051t_DruidofTheSwarm_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_051t_DruidofTheSwarm_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_051t_DruidofTheSwarm_Play.ogg" }] }, { "Name": "Druid of the Swarm", "RegImage": "/339-370-63030.png", "GoldImage": "/63-30-63030.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ICC_051t2_DruidoftheSwarm_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_051t2_DruidoftheSwarm_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_051t2_DruidoftheSwarm_Play.ogg" }] }, { "Name": "Druid of the Swarm", "RegImage": "/339-373-63031.png", "GoldImage": "/63-31-63031.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ICC_051t3_DruidoftheSwarm_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_051t3_DruidoftheSwarm_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_051t3_DruidoftheSwarm_Play.ogg" }] }, { "Name": "Ghoul Infestor", "RegImage": "/339-434-63035.png", "GoldImage": "/63-35-63035.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_901_Male_Ghoul_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_901_Male_Ghoul_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_901_Male_Ghoul_Play_01.ogg" }] }, { "Name": "Frostmourne", "RegImage": "/339-551-63047.png", "GoldImage": "/63-47-63047.webm", "Sounds": [] }, { "Name": "Army of the Dead", "RegImage": "/339-554-63049.png", "GoldImage": "/63-49-63049.webm", "Sounds": [] }, { "Name": "Doom Pact", "RegImage": "/339-557-63050.png", "GoldImage": "/63-50-63050.webm", "Sounds": [] }, { "Name": "Death Grip", "RegImage": "/339-560-63051.png", "GoldImage": "/63-51-63051.webm", "Sounds": [] }, { "Name": "Death Coil", "RegImage": "/339-563-63052.png", "GoldImage": "/63-52-63052.webm", "Sounds": [] }, { "Name": "Obliterate", "RegImage": "/339-566-63053.png", "GoldImage": "/63-53-63053.webm", "Sounds": [] }, { "Name": "Anti-Magic Shell", "RegImage": "/339-569-63054.png", "GoldImage": "/63-54-63054.webm", "Sounds": [] }, { "Name": "Death and Decay", "RegImage": "/339-572-63056.png", "GoldImage": "/63-56-63056.webm", "Sounds": [] }, { "Name": "Zombeast", "RegImage": "/339-624-63062.png", "GoldImage": "/63-62-63062.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Zombeast_ICC_800h3t_Attack.ogg" }, { "Name": "Death1", "URL": "/Zombeast_ICC_800h3t_Death.ogg" }, { "Name": "Play1", "URL": "/Zombeast_ICC_800h3t_Play.ogg" }] }, { "Name": "Zombeast", "RegImage": "/339-671-63073.png", "GoldImage": "/63-73-63073.webm", "Sounds": [{ "Name": "Attack1", "URL": "/Zombeast_ICC_800h3t_Attack.ogg" }, { "Name": "Death1", "URL": "/Zombeast_ICC_800h3t_Death.ogg" }, { "Name": "Play1", "URL": "/Zombeast_ICC_800h3t_Play.ogg" }] }, { "Name": "Stubborn Gastropod", "RegImage": "/339-674-63074.png", "GoldImage": "/63-74-63074.webm", "Sounds": [{ "Name": "Attack1", "URL": "/StubbornGastropod_UNG_808_Attack.ogg" }, { "Name": "Death1", "URL": "/StubbornGastropod_UNG_808_Death.ogg" }, { "Name": "Play1", "URL": "/StubbornGastropod_UNG_808_Play.ogg" }] }, { "Name": "Giant Wasp", "RegImage": "/339-677-63075.png", "GoldImage": "/63-75-63075.webm", "Sounds": [{ "Name": "Attack1", "URL": "/UNG_814_GiantWasp_Attack.ogg" }, { "Name": "Death1", "URL": "/UNG_814_GiantWasp_Death.ogg" }, { "Name": "Play1", "URL": "/UNG_814_GiantWasp_Play.ogg" }] }, { "Name": "Deathlord Nazgrim", "RegImage": "/339-687-63078.png", "GoldImage": "/63-78-63078.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_829t2_Male_Orc_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/ArmoredWarhorseNoVox_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_829t2_Male_Orc_Death_01.ogg" }, { "Name": "Death2", "URL": "/ArmoredWarhorseNoVox_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_829t2_Male_Orc_Play_01.ogg" }, { "Name": "Play2", "URL": "/ArmoredWarhorseNoVox_Play_Underlay.ogg" }] }, { "Name": "Thoras Trollbane", "RegImage": "/339-690-63079.png", "GoldImage": "/63-79-63079.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_829t3_Male_Human_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/ArmoredWarhorseNoVox_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_829t3_Male_Human_Death_01.ogg" }, { "Name": "Death2", "URL": "/ArmoredWarhorseNoVox_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_829t3_Male_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/ArmoredWarhorseNoVox_Play_Underlay.ogg" }] }, { "Name": "Inquisitor Whitemane", "RegImage": "/339-693-63080.png", "GoldImage": "/63-80-63080.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_829t4_Female_Human_Attack_01.ogg" }, { "Name": "Attack2", "URL": "/ArmoredWarhorseNoVox_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_829t4_Female_Human_Death_01.ogg" }, { "Name": "Death2", "URL": "/ArmoredWarhorseNoVox_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_829t4_Female_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/ArmoredWarhorseNoVox_Play_Underlay.ogg" }] }, { "Name": "Darion Mograine", "RegImage": "/339-696-63081.png", "GoldImage": "/63-81-63081.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICC_829t5_Male_Human_Attack_02.ogg" }, { "Name": "Attack2", "URL": "/ArmoredWarhorseNoVox_Attack_Underlay.ogg" }, { "Name": "Death1", "URL": "/VO_ICC_829t5_Male_Human_Death_01.ogg" }, { "Name": "Death2", "URL": "/ArmoredWarhorseNoVox_Death_Underlay.ogg" }, { "Name": "Play1", "URL": "/VO_ICC_829t5_Male_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/ArmoredWarhorseNoVox_Play_Underlay.ogg" }] }, { "Name": "Frost Widow", "RegImage": "/339-723-63090.png", "GoldImage": "/63-90-63090.webm", "Sounds": [{ "Name": "Attack1", "URL": "/FrostWidow_ICC_832t3_Attack.ogg" }, { "Name": "Death1", "URL": "/FrostWidow_ICC_832t3_Death.ogg" }, { "Name": "Play1", "URL": "/FrostWidow_ICC_832t3_Play.ogg" }] }, { "Name": "Scarab Beetle", "RegImage": "/339-726-63091.png", "GoldImage": "/63-91-63091.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ICC_832t4_ScarabBeetle_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_832t4_ScarabBeetle_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_832t4_ScarabBeetle_Play.ogg" }] }, { "Name": "Water Elemental", "RegImage": "/339-733-63095.png", "GoldImage": "/63-95-63095.webm", "Sounds": [{ "Name": "Attack1", "URL": "/CS2_033_Attack_WaterElemental.ogg" }, { "Name": "Death1", "URL": "/CS2_033_Death_WaterElemental.ogg" }, { "Name": "Play1", "URL": "/CS2_033_Play_WaterElemental.ogg" }] }, { "Name": "Shadowmourne", "RegImage": "/339-740-63097.png", "GoldImage": "/63-97-63097.webm", "Sounds": [] }, { "Name": "The Lich King", "RegImage": "/339-821-63109.png", "Sounds": [] }, { "Name": "Blood Tap", "RegImage": "/339-823-63110.png", "GoldImage": "/63-110-63110.webm", "Sounds": [] }, { "Name": "Army of the Dead", "RegImage": "/339-826-63111.png", "GoldImage": "/63-111-63111.webm", "Sounds": [] }, { "Name": "Ghoul", "RegImage": "/339-829-63112.png", "GoldImage": "/63-112-63112.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ICC_034t_Ghoul_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_034t_Ghoul_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_034t_Ghoul_Play.ogg" }] }, { "Name": "Frostmourne", "RegImage": "/339-832-63113.png", "GoldImage": "/63-113-63113.webm", "Sounds": [] }, { "Name": "Eager Rogue", "RegImage": "/339-835-63114.png", "GoldImage": "/63-114-63114.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICCA01_007_Male_Gnome_Attack_03.ogg" }, { "Name": "Death1", "URL": "/VO_ICCA01_007_Male_Gnome_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICCA01_007_Male_Gnome_Play_01.ogg" }] }, { "Name": "Terrible Tank", "RegImage": "/339-838-63115.png", "GoldImage": "/63-115-63115.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICCA01_008_Male_Orc_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICCA01_008_Male_Orc_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICCA01_008_Male_Orc_Play_01.ogg" }] }, { "Name": "Needy Hunter", "RegImage": "/339-841-63116.png", "GoldImage": "/63-116-63116.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICCA01_009_Male_NightElf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICCA01_009_Male_NightElf_Death_02.ogg" }, { "Name": "Play1", "URL": "/VO_ICCA01_009_Male_NightElf_Play_01.ogg" }, { "Name": "Trigger1", "URL": "/add_card_to_hand_1.ogg" }] }, { "Name": "A. F. Kay", "RegImage": "/339-844-63117.png", "GoldImage": "/63-117-63117.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICCA01_010_Female_Human_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICCA01_010_Female_Human_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICCA01_010_Female_Human_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Alliance.ogg" }] }, { "Name": "Warlock on Fire", "RegImage": "/339-847-63118.png", "GoldImage": "/63-118-63118.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICCA01_011_Female_Troll_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICCA01_011_Female_Troll_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICCA01_011_Female_Troll_Play_01.ogg" }] }, { "Name": "Tirion Fordring", "RegImage": "/339-850-63119.png", "Sounds": [] }, { "Name": "Sindragosa", "RegImage": "/339-852-63121.png", "Sounds": [] }, { "Name": "Unchained Magic", "RegImage": "/339-854-63122.png", "GoldImage": "/63-122-63122.webm", "Sounds": [] }, { "Name": "Block of Ice", "RegImage": "/339-857-63123.png", "GoldImage": "/63-123-63123.webm", "Sounds": [] }, { "Name": "Frost Breath", "RegImage": "/339-860-63124.png", "Sounds": [] }, { "Name": "Frost Breath", "RegImage": "/339-862-63125.png", "Sounds": [] }, { "Name": "Frost Breath", "RegImage": "/339-864-63126.png", "Sounds": [] }, { "Name": "Ice Claw", "RegImage": "/339-866-63127.png", "Sounds": [] }, { "Name": "Blood-Queen Lana'thel", "RegImage": "/339-868-63128.png", "Sounds": [] }, { "Name": "Vampiric Bite", "RegImage": "/339-870-63130.png", "Sounds": [] }, { "Name": "Sleeping Acolyte", "RegImage": "/339-872-63131.png", "GoldImage": "/63-131-63131.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICCA05_003_Female_BloodElf_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICCA05_003_Female_BloodElf_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICCA05_003_Female_BloodElf_WakeUp_01.ogg" }] }, { "Name": "Vampiric Leech", "RegImage": "/339-875-63132.png", "Sounds": [] }, { "Name": "Bite of the Blood-Queen", "RegImage": "/339-877-63133.png", "GoldImage": "/63-133-63133.webm", "Sounds": [] }, { "Name": "Blood Essence", "RegImage": "/339-880-63134.png", "GoldImage": "/63-134-63134.webm", "Sounds": [] }, { "Name": "Lord Marrowgar", "RegImage": "/339-883-63135.png", "Sounds": [] }, { "Name": "Skeletal Reconstruction", "RegImage": "/339-885-63136.png", "Sounds": [] }, { "Name": "Bryn'troll, the Bone Arbiter", "RegImage": "/339-887-63137.png", "GoldImage": "/63-137-63137.webm", "Sounds": [] }, { "Name": "Bone Storm", "RegImage": "/339-890-63138.png", "GoldImage": "/63-138-63138.webm", "Sounds": [] }, { "Name": "Bone Spike", "RegImage": "/339-893-63139.png", "GoldImage": "/63-139-63139.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ICCA06_005_Bonespike_Attack.ogg" }, { "Name": "Death1", "URL": "/ICCA06_005_Bonespike_Death.ogg" }, { "Name": "Play1", "URL": "/ICCA06_005_Bonespike_Play.ogg" }] }, { "Name": "Professor Putricide", "RegImage": "/339-896-63140.png", "Sounds": [] }, { "Name": "Professor Putricide", "RegImage": "/339-898-63141.png", "Sounds": [] }, { "Name": "Professor Putricide", "RegImage": "/339-900-63142.png", "Sounds": [] }, { "Name": "Mad Science", "RegImage": "/339-902-63143.png", "Sounds": [] }, { "Name": "Madder Science", "RegImage": "/339-904-63144.png", "Sounds": [] }, { "Name": "Growing Ooze", "RegImage": "/339-906-63145.png", "GoldImage": "/63-145-63145.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ICCA07_004_GrowingOoze_Attack.ogg" }, { "Name": "Death1", "URL": "/ICCA07_004_GrowingOoze_Death.ogg" }, { "Name": "Play1", "URL": "/ICCA07_004_GrowingOoze_Play.ogg" }] }, { "Name": "Maddest Science", "RegImage": "/339-909-63147.png", "GoldImage": "/63-147-63147.webm", "Sounds": [] }, { "Name": "Festergut", "RegImage": "/339-912-63148.png", "GoldImage": "/63-148-63148.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICCA07_008_Male_Abomination_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICCA07_008_Male_Abomination_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICCA07_008_Male_Abomination_Play_01.ogg" }] }, { "Name": "Tentacles", "RegImage": "/339-915-63149.png", "GoldImage": "/63-149-63149.webm", "Sounds": [] }, { "Name": "The Lich King", "RegImage": "/339-918-63150.png", "GoldImage": "/63-150-63150.webm", "Sounds": [] }, { "Name": "The Scourge", "RegImage": "/339-921-63151.png", "GoldImage": "/63-151-63151.webm", "Sounds": [] }, { "Name": "Ghoul", "RegImage": "/339-924-63152.png", "GoldImage": "/63-152-63152.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ICC_034t_Ghoul_Attack.ogg" }, { "Name": "Death1", "URL": "/ICC_034t_Ghoul_Death.ogg" }, { "Name": "Play1", "URL": "/ICC_034t_Ghoul_Play.ogg" }] }, { "Name": "Val'kyr Shadowguard", "RegImage": "/339-927-63153.png", "GoldImage": "/63-153-63153.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICCA08_017_Female_ValKyr_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICCA08_017_Female_ValKyr_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICCA08_017_Female_ValKyr_Play_02.ogg" }, { "Name": "Trigger1", "URL": "/VO_ICCA08_017_Female_ValKyr_Special_01.ogg" }] }, { "Name": "Frostmourne", "RegImage": "/339-930-63154.png", "GoldImage": "/63-154-63154.webm", "Sounds": [] }, { "Name": "The True Lich", "RegImage": "/339-933-63155.png", "GoldImage": "/63-155-63155.webm", "Sounds": [] }, { "Name": "Fallen Champions", "RegImage": "/339-936-63156.png", "GoldImage": "/63-156-63156.webm", "Sounds": [] }, { "Name": "Necrotic Plague", "RegImage": "/339-939-63159.png", "GoldImage": "/63-159-63159.webm", "Sounds": [] }, { "Name": "The Hunted", "RegImage": "/339-942-63161.png", "GoldImage": "/63-161-63161.webm", "Sounds": [] }, { "Name": "Purge the Weak", "RegImage": "/339-946-63162.png", "GoldImage": "/63-162-63162.webm", "Sounds": [] }, { "Name": "Soul Reaper", "RegImage": "/339-949-63163.png", "GoldImage": "/63-163-63163.webm", "Sounds": [] }, { "Name": "The True King", "RegImage": "/339-952-63164.png", "GoldImage": "/63-164-63164.webm", "Sounds": [] }, { "Name": "The Price of Power", "RegImage": "/339-955-63165.png", "GoldImage": "/63-165-63165.webm", "Sounds": [] }, { "Name": "Shut up, Priest", "RegImage": "/339-958-63166.png", "GoldImage": "/63-166-63166.webm", "Sounds": [] }, { "Name": "Remorseless Winter", "RegImage": "/339-961-63167.png", "GoldImage": "/63-167-63167.webm", "Sounds": [] }, { "Name": "Harvest of Souls", "RegImage": "/339-964-63168.png", "GoldImage": "/63-168-63168.webm", "Sounds": [] }, { "Name": "Trapped Soul", "RegImage": "/339-967-63169.png", "GoldImage": "/63-169-63169.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICCA08_033_Male_HumanGhost_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICCA08_033_Male_HumanGhost_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICCA08_033_Male_HumanGhost_Death_06.ogg" }] }, { "Name": "Blood Rune", "RegImage": "/339-970-63170.png", "GoldImage": "/63-170-63170.webm", "Sounds": [] }, { "Name": "Blood Beast", "RegImage": "/339-973-63171.png", "GoldImage": "/63-171-63171.webm", "Sounds": [{ "Name": "Attack1", "URL": "/BloodBeast_ICCA09_001t1_Attack.ogg" }, { "Name": "Death1", "URL": "/BloodBeast_ICCA09_001t1_Death.ogg" }, { "Name": "Play1", "URL": "/BloodBeast_ICCA09_001t1_Play.ogg" }] }, { "Name": "Deathbringer Saurfang", "RegImage": "/339-976-63172.png", "GoldImage": "/63-172-63172.webm", "Sounds": [] }, { "Name": "Valithria Dreamwalker", "RegImage": "/339-979-63174.png", "GoldImage": "/63-174-63174.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICCA10_001_Female_GreenDragon_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_ICCA10_001_Female_GreenDragon_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICCA10_001_Female_GreenDragon_Play_01.ogg" }] }, { "Name": "Lady Deathwhisper", "RegImage": "/339-982-63175.png", "GoldImage": "/63-175-63175.webm", "Sounds": [] }, { "Name": "Whisper of Death", "RegImage": "/339-985-63176.png", "GoldImage": "/63-176-63176.webm", "Sounds": [] }, { "Name": "Skeletal Knight", "RegImage": "/339-988-63177.png", "GoldImage": "/63-177-63177.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_ICCA11_001_Male_Undead_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_ICCA11_001_Male_Undead_Death_01.ogg" }, { "Name": "Play1", "URL": "/VO_ICCA11_001_Male_Undead_Play_01.ogg" }] }, { "Name": "Fiery War Axe", "RegImage": "/330-117-632.png", "GoldImage": "/0-632-632.webm", "Collectible": true, "Sounds": [] }, { "Name": "Wrath", "RegImage": "/330-567-633.png", "GoldImage": "/0-633-633.webm", "Collectible": true, "Sounds": [] }, { "Name": "Silvermoon Guardian", "RegImage": "/330-396-634.png", "GoldImage": "/0-634-634.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_023_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_023_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_023_Play_01.ogg" }] }, { "Name": "Garrosh Hellscream", "RegImage": "/331-707-635.png", "GoldImage": "/0-635-635.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_HERO_01_Attack_16.ogg" }, { "Name": "Death1", "URL": "/VO_HERO_01_Death_17.ogg" }] }, { "Name": "Fire Elemental", "RegImage": "/329-973-636.png", "GoldImage": "/0-636-636.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/CS2_042_Attack_FireElemental.ogg" }, { "Name": "Death1", "URL": "/CS2_042_Death_FireElemental.ogg" }, { "Name": "Play1", "URL": "/CS2_042_Play_FireElemental.ogg" }] }, { "Name": "Bloodsail Raider", "RegImage": "/333-480-637.png", "GoldImage": "/0-637-637.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NEW1_018_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NEW1_018_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NEW1_018_Play_01.ogg" }] }, { "Name": "Upgrade!", "RegImage": "/330-899-638.png", "GoldImage": "/0-638-638.webm", "Collectible": true, "Sounds": [] }, { "Name": "Amani Berserker", "RegImage": "/330-869-641.png", "GoldImage": "/0-641-641.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_393_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_393_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_393_Play_01.ogg" }] }, { "Name": "Repentance", "RegImage": "/330-845-642.png", "GoldImage": "/0-642-642.webm", "Collectible": true, "Sounds": [] }, { "Name": "Grommash Hellscream", "RegImage": "/330-914-643.png", "GoldImage": "/0-643-643.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_414_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_414_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_414_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Horde1.ogg" }] }, { "Name": "Armorsmith", "RegImage": "/330-887-644.png", "GoldImage": "/0-644-644.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_402_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_402_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_402_Play_01.ogg" }] }, { "Name": "Spellbender", "RegImage": "/334-731-645.png", "GoldImage": "/0-645-645.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_tt_010a_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_tt_010a_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_tt_010a_Play_01.ogg" }] }, { "Name": "Charge", "RegImage": "/330-108-646.png", "GoldImage": "/0-646-646.webm", "Collectible": true, "Sounds": [] }, { "Name": "Shadow Bolt", "RegImage": "/330-6-647.png", "GoldImage": "/0-647-647.webm", "Collectible": true, "Sounds": [] }, { "Name": "Silver Hand Knight", "RegImage": "/330-174-648.png", "GoldImage": "/0-648-648.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_151_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_151_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_151_Play_01.ogg" }] }, { "Name": "Boar", "RegImage": "/330-276-65.png", "GoldImage": "/0-65-65.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_CS2_boar_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_CS2_boar_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_CS2_boar_EnterPlay.ogg" }] }, { "Name": "Mirror Image", "RegImage": "/330-279-650.png", "GoldImage": "/0-650-650.webm", "Sounds": [{ "Name": "Attack1", "URL": "/CS2_mirror_Attack.ogg" }, { "Name": "Death1", "URL": "/CS2_mirror_Death.ogg" }, { "Name": "Play1", "URL": "/CS2_mirror_EnterPlay.ogg" }] }, { "Name": "Starfall", "RegImage": "/333-444-653.png", "GoldImage": "/0-653-653.webm", "Sounds": [] }, { "Name": "Lorewalker Cho", "RegImage": "/334-809-655.png", "GoldImage": "/0-655-655.webm", "Sounds": [] }, { "Name": "Auchenai Soulpriest", "RegImage": "/331-61-656.png", "GoldImage": "/0-656-656.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_591_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_591_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_591_Play_01.ogg" }] }, { "Name": "Redemption", "RegImage": "/330-555-657.png", "GoldImage": "/0-657-657.webm", "Collectible": true, "Sounds": [] }, { "Name": "Vanish", "RegImage": "/333-435-658.png", "GoldImage": "/0-658-658.webm", "Collectible": true, "Sounds": [] }, { "Name": "Ogre Magi", "RegImage": "/330-228-659.png", "GoldImage": "/0-659-659.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_197_Attack_02_MIX.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_197_Death_03_MIX.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_197_Play_01_MIX.ogg" }] }, { "Name": "Hungry Crab", "RegImage": "/333-477-660.png", "GoldImage": "/0-660-660.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/NEW1_017_Hungry_Crab_Attack1.ogg" }, { "Name": "Death1", "URL": "/NEW1_017_Hungry_Crab_Death3.ogg" }, { "Name": "Play1", "URL": "/NEW1_017_Hungry_Crab_EnterPlay1.ogg" }] }, { "Name": "Bear Form", "RegImage": "/339-172-662.png", "GoldImage": "/0-662-662.webm", "Sounds": [] }, { "Name": "Frostwolf Grunt", "RegImage": "/330-141-663.png", "GoldImage": "/0-663-663.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_CS2_121_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_CS2_121_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_CS2_121_Play_01.ogg" }] }, { "Name": "Battle Rage", "RegImage": "/330-866-664.png", "GoldImage": "/0-664-664.webm", "Collectible": true, "Sounds": [] }, { "Name": "Avatar of the Coin", "RegImage": "/331-289-666.png", "GoldImage": "/0-666-666.webm", "Sounds": [] }, { "Name": "Starfire", "RegImage": "/330-650-667.png", "GoldImage": "/0-667-667.webm", "Collectible": true, "Sounds": [] }, { "Name": "Blood Fury", "RegImage": "/330-791-669.png", "GoldImage": "/0-669-669.webm", "Sounds": [] }, { "Name": "Mana Addict", "RegImage": "/330-438-67.png", "GoldImage": "/0-67-67.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_055_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_055_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_055_Play_01.ogg" }] }, { "Name": "Bane of Doom", "RegImage": "/330-782-670.png", "GoldImage": "/0-670-670.webm", "Collectible": true, "Sounds": [] }, { "Name": "Holy Nova", "RegImage": "/329-859-671.png", "GoldImage": "/0-671-671.webm", "Collectible": true, "Sounds": [] }, { "Name": "Ice Barrier", "RegImage": "/330-725-672.png", "GoldImage": "/0-672-672.webm", "Collectible": true, "Sounds": [] }, { "Name": "Shadowflame", "RegImage": "/330-743-673.png", "GoldImage": "/0-673-673.webm", "Collectible": true, "Sounds": [] }, { "Name": "Leeroy Jenkins", "RegImage": "/330-516-674.png", "GoldImage": "/0-674-674.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_116_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_116_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_116_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Leeroy_Jenkins.ogg" }] }, { "Name": "Windfury Harpy", "RegImage": "/330-414-675.png", "GoldImage": "/0-675-675.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_033_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_033_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_033_EnterPlay.ogg" }] }, { "Name": "Lightning Storm", "RegImage": "/330-698-676.png", "GoldImage": "/0-676-676.webm", "Collectible": true, "Sounds": [] }, { "Name": "Fireblast", "RegImage": "/329-946-677.png", "GoldImage": "/0-677-677.webm", "Sounds": [] }, { "Name": "Riverpaw Gnoll", "RegImage": "/334-737-678.png", "GoldImage": "/0-678-678.webm", "Sounds": [{ "Name": "Attack1", "URL": "/GnollReady1.ogg" }, { "Name": "Death1", "URL": "/WoW_TU4a_003_Gnoll_Death.ogg" }, { "Name": "Play1", "URL": "/GnollReady1.ogg" }] }, { "Name": "Lava Burst", "RegImage": "/330-665-679.png", "GoldImage": "/0-679-679.webm", "Collectible": true, "Sounds": [] }, { "Name": "Mechanical Dragonling", "RegImage": "/330-402-680.png", "GoldImage": "/0-680-680.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_025t_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_025t_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_025t_EnterPlay.ogg" }] }, { "Name": "Elite Tauren Chieftain", "RegImage": "/334-71-682.png", "GoldImage": "/0-682-682.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_PRO_001_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_PRO_001_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_PRO_001_EnterPlay.ogg" }] }, { "Name": "Zombie Chow", "RegImage": "/331-180-683.png", "GoldImage": "/0-683-683.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_001_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_001_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_001_EnterPlay_01.ogg" }] }, { "Name": "Flame of Azzinoth", "RegImage": "/331-115-685.png", "GoldImage": "/0-685-685.webm", "Sounds": [{ "Name": "Attack1", "URL": "/TU4e_002t_Flame_of_Azzinoth_Attack.ogg" }, { "Name": "Death1", "URL": "/TU4e_002t_Flame_of_Azzinoth_Death.ogg" }, { "Name": "Play1", "URL": "/TU4e_002t_Flame_of_Azzinoth_Play.ogg" }] }, { "Name": "NOOOOOOOOOOOO", "RegImage": "/331-295-687.png", "GoldImage": "/0-687-687.webm", "Sounds": [] }, { "Name": "Hyena", "RegImage": "/330-944-689.png", "GoldImage": "/0-689-689.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_531_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_531_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_531_EnterPlay.ogg" }] }, { "Name": "Frothing Berserker", "RegImage": "/331-85-69.png", "GoldImage": "/0-69-69.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_604_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_604_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_604_Play_01.ogg" }] }, { "Name": "Blessed Champion", "RegImage": "/330-824-7.png", "GoldImage": "/0-7-7.webm", "Collectible": true, "Sounds": [] }, { "Name": "Mind Spike", "RegImage": "/331-147-70.png", "GoldImage": "/0-70-70.webm", "Sounds": [{ "Name": "Play1", "URL": "/Shared_Shadow_PreCastHigh_1.ogg" }, { "Name": "Play2", "URL": "/Shared_Shadow_Cast_1.ogg" }, { "Name": "Play3", "URL": "/Shared_Shadow_Start_1.ogg" }, { "Name": "Play4", "URL": "/Shared_Shadow_PreCastHigh_1.ogg" }, { "Name": "Play5", "URL": "/Shared_Shadow_Cast_1.ogg" }, { "Name": "Play6", "URL": "/Warlock_Corruption_Impact_1.ogg" }, { "Name": "Play7", "URL": "/Shared_Shadow_Fizzle_1.ogg" }] }, { "Name": "I Am Murloc", "RegImage": "/334-74-714.png", "GoldImage": "/0-714-714.webm", "Sounds": [] }, { "Name": "Murloc", "RegImage": "/334-77-715.png", "GoldImage": "/0-715-715.webm", "Sounds": [{ "Name": "Attack1", "URL": "/EX1_506a_Murloc_Tidehunter_Attack1.ogg" }, { "Name": "Death1", "URL": "/EX1_506a_Murloc_Tidehunter_Death1.ogg" }, { "Name": "Play1", "URL": "/EX1_506a_Murloc_Tidehunter_EnterPlay1.ogg" }] }, { "Name": "Rogues Do It...", "RegImage": "/334-80-716.png", "GoldImage": "/0-716-716.webm", "Sounds": [] }, { "Name": "Power of the Horde", "RegImage": "/334-83-717.png", "GoldImage": "/0-717-717.webm", "Sounds": [] }, { "Name": "Whelp", "RegImage": "/330-519-719.png", "GoldImage": "/0-719-719.webm", "Sounds": [{ "Name": "Attack1", "URL": "/ds1_whelptoken_Whelp_Attack1.ogg" }, { "Name": "Death1", "URL": "/ds1_whelptoken_Whelp_Death2.ogg" }, { "Name": "Play1", "URL": "/ds1_whelptoken_Whelp_EnterPlay1.ogg" }] }, { "Name": "Big Game Hunter", "RegImage": "/330-348-73.png", "GoldImage": "/0-73-73.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_005_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_005_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_005_Play_01.ogg" }, { "Name": "Play10", "URL": "/Tutorial_Rifle_Fire_01.ogg" }, { "Name": "Play11", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play2", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play3", "URL": "/FX_FireballEvent04_SpellCancel_01.ogg" }, { "Name": "Play4", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play5", "URL": "/FX_FireballEvent04_SpellImpact_01.ogg" }, { "Name": "Play6", "URL": "/Tutorial_Rifle_Cock_01.ogg" }, { "Name": "Play7", "URL": "/FX_FireballEvent04_SpellCancel_01.ogg" }, { "Name": "Play8", "URL": "/Tutorial_Rifle_Fire_01.ogg" }, { "Name": "Play9", "URL": "/FX_FireballEvent04_SpellImpact_01.ogg" }] }, { "Name": "Acidic Swamp Ooze", "RegImage": "/330-453-74.png", "GoldImage": "/0-74-74.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_066_AcidicSwampOoze_Attack.ogg" }, { "Name": "Death1", "URL": "/EX1_066_AcidicSwampOoze_Death.ogg" }, { "Name": "Play1", "URL": "/EX1_066_AcidicSwampOoze_EnterPlay.ogg" }] }, { "Name": "Blood Knight", "RegImage": "/331-58-75.png", "GoldImage": "/0-75-75.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_590_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_590_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_590_Play_01.ogg" }] }, { "Name": "Stonetusk Boar", "RegImage": "/330-195-76.png", "GoldImage": "/0-76-76.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_CS2_171_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_CS2_171_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_CS2_171_EnterPlay.ogg" }] }, { "Name": "Earth Shock", "RegImage": "/330-674-77.png", "GoldImage": "/0-77-77.webm", "Collectible": true, "Sounds": [] }, { "Name": "Poison Seeds", "RegImage": "/331-247-7726.png", "GoldImage": "/7-726-7726.webm", "Collectible": true, "Sounds": [] }, { "Name": "Anub'ar Ambusher", "RegImage": "/331-271-7728.png", "GoldImage": "/7-728-7728.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_FP1_026_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_FP1_026_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_FP1_026_EnterPlay.ogg" }] }, { "Name": "Avenge", "RegImage": "/331-253-7729.png", "GoldImage": "/7-729-7729.webm", "Collectible": true, "Sounds": [] }, { "Name": "Shade of Naxxramas", "RegImage": "/331-195-7730.png", "GoldImage": "/7-730-7730.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_005_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_005_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_005_EnterPlay_01.ogg" }, { "Name": "Trigger1", "URL": "/Sneaky_Target_Start_01.ogg" }] }, { "Name": "Reincarnate", "RegImage": "/331-268-7731.png", "GoldImage": "/7-731-7731.webm", "Collectible": true, "Sounds": [] }, { "Name": "Duplicate", "RegImage": "/331-243-7732.png", "GoldImage": "/7-732-7732.webm", "Collectible": true, "Sounds": [] }, { "Name": "Voidcaller", "RegImage": "/331-259-7733.png", "GoldImage": "/7-733-7733.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_022_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_022_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_022_EnterPlay_01.ogg" }] }, { "Name": "Death's Bite", "RegImage": "/331-256-7734.png", "GoldImage": "/7-734-7734.webm", "Collectible": true, "Sounds": [] }, { "Name": "Dark Cultist", "RegImage": "/331-262-7735.png", "GoldImage": "/7-735-7735.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_023_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_023_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_023_EnterPlay_01.ogg" }] }, { "Name": "Dancing Swords", "RegImage": "/331-280-7736.png", "GoldImage": "/7-736-7736.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/FP1_029_DancingSwords_Attack.ogg" }, { "Name": "Death1", "URL": "/FP1_029_DancingSwords_Death.ogg" }, { "Name": "Play1", "URL": "/FP1_029_DancingSwords_EnterPlay.ogg" }] }, { "Name": "Undertaker", "RegImage": "/331-277-7737.png", "GoldImage": "/7-737-7737.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_028_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_028_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_028_EnterPlay_01.ogg" }] }, { "Name": "Nerubian Egg", "RegImage": "/331-201-7738.png", "GoldImage": "/7-738-7738.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_FP1_007_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_FP1_007_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_FP1_007_EnterPlay.ogg" }] }, { "Name": "Nerubian", "RegImage": "/331-204-7739.png", "GoldImage": "/7-739-7739.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_007t_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_007t_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_007t_EnterPlay_01.ogg" }] }, { "Name": "Baron Rivendare", "RegImage": "/331-286-7740.png", "GoldImage": "/7-740-7740.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_031_Attack_07.ogg" }, { "Name": "Death1", "URL": "/VO_NAX9_01_DEATH_05.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_031_EnterPlay_06.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Naxx_5.ogg" }] }, { "Name": "Webspinner", "RegImage": "/331-216-7741.png", "GoldImage": "/7-741-7741.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_FP1_011_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_FP1_011_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_FP1_011_EnterPlay.ogg" }] }, { "Name": "Kel'Thuzad", "RegImage": "/331-225-7742.png", "GoldImage": "/7-742-7742.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_013_Attack_03.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_013_Death_04.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_013_Play_02.ogg" }, { "Name": "Play2", "URL": "/VO_FP1_013_Play_alt_01.ogg" }, { "Name": "Play3", "URL": "/Pegasus_Stinger_Naxx_6.ogg" }] }, { "Name": "Stalagg", "RegImage": "/331-228-7744.png", "GoldImage": "/7-744-7744.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_014_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_014_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_014_EnterPlay_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Naxx_3.ogg" }] }, { "Name": "Feugen", "RegImage": "/331-234-7745.png", "GoldImage": "/7-745-7745.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_015_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_015_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_015_EnterPlay_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Naxx_3.ogg" }] }, { "Name": "Loatheb", "RegImage": "/331-283-7746.png", "GoldImage": "/7-746-7746.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX6_01_CARD_Attack_03.ogg" }, { "Name": "Death1", "URL": "/VO_NAX6_01_DEATH_06.ogg" }, { "Name": "Play1", "URL": "/VO_NAX6_01_START_Play_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Naxx_4.ogg" }, { "Name": "Play3", "URL": "/FX_Warlock_AE_GasWave_HeroPower_01.ogg" }] }, { "Name": "Maexxna", "RegImage": "/331-213-7747.png", "GoldImage": "/7-747-7747.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_FP1_010_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_FP1_010_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_FP1_010_EnterPlay.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Naxx_1.ogg" }] }, { "Name": "Mad Scientist", "RegImage": "/331-192-7748.png", "GoldImage": "/7-748-7748.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_004_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_004_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_004_EnterPlay_01.ogg" }] }, { "Name": "Sludge Belcher", "RegImage": "/331-219-7749.png", "GoldImage": "/7-749-7749.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_012_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_012_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_012_EnterPlay_01.ogg" }, { "Name": "Trigger1", "URL": "/Sneaky_Target_Start_01.ogg" }, { "Name": "Trigger2", "URL": "/FX_Spore_Impact_Sound_01.ogg" }] }, { "Name": "Stoneskin Gargoyle", "RegImage": "/331-274-7750.png", "GoldImage": "/7-750-7750.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_FP1_027_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_FP1_027_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_FP1_027_EnterPlay.ogg" }] }, { "Name": "Spectral Knight", "RegImage": "/331-207-7751.png", "GoldImage": "/7-751-7751.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_008_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_008_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_008_EnterPlay_01.ogg" }] }, { "Name": "Deathlord", "RegImage": "/331-210-7753.png", "GoldImage": "/7-753-7753.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_009_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_009_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_009_EnterPlay_01.ogg" }] }, { "Name": "Echoing Ooze", "RegImage": "/331-189-7754.png", "GoldImage": "/7-754-7754.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_FP1_003_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_FP1_003_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_FP1_003_EnterPlay.ogg" }] }, { "Name": "Nerub'ar Weblord", "RegImage": "/331-240-7755.png", "GoldImage": "/7-755-7755.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_017_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_017_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_017_EnterPlay_01.ogg" }] }, { "Name": "Haunted Creeper", "RegImage": "/331-183-7756.png", "GoldImage": "/7-756-7756.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_FP1_002_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_FP1_002_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_FP1_002_EnterPlay.ogg" }] }, { "Name": "Unstable Ghoul", "RegImage": "/331-265-7757.png", "GoldImage": "/7-757-7757.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_FP1_024_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_FP1_024_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_FP1_024_EnterPlay.ogg" }] }, { "Name": "Wailing Soul", "RegImage": "/331-237-7758.png", "GoldImage": "/7-758-7758.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/FP1_016_WailingSoul_Attack.ogg" }, { "Name": "Death1", "URL": "/FP1_016_WailingSoul_Death.ogg" }, { "Name": "Play1", "URL": "/FP1_016_WailingSoul_EnterPlay.ogg" }] }, { "Name": "Thaddius", "RegImage": "/331-231-7759.png", "GoldImage": "/7-759-7759.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX13_01_HP_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAX13_01_DEATH_LINE_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_014t_EnterPlay_01.ogg" }, { "Name": "Play2", "URL": "/Pegasus_Stinger_Naxx_2.ogg" }] }, { "Name": "Spectral Spider", "RegImage": "/331-186-7760.png", "GoldImage": "/7-760-7760.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_FP1_002t_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_FP1_002t_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_FP1_002t_EnterPlay.ogg" }] }, { "Name": "Deathcharger", "RegImage": "/331-198-7762.png", "GoldImage": "/7-762-7762.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_FP1_006_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_FP1_006_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_FP1_006_EnterPlay.ogg" }] }, { "Name": "Slime", "RegImage": "/331-222-7764.png", "GoldImage": "/7-764-7764.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_FP1_012t_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_FP1_012t_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_FP1_012t_EnterPlay.ogg" }] }, { "Name": "Treant", "RegImage": "/331-250-7766.png", "GoldImage": "/7-766-7766.webm", "Sounds": [{ "Name": "Attack1", "URL": "/EX1_573t Treant_Attack2.ogg" }, { "Name": "Death1", "URL": "/EX1_573t Treant_Death2.ogg" }, { "Name": "Play1", "URL": "/EX1_573t Treant_EnterPlay1.ogg" }] }, { "Name": "Patchwerk", "RegImage": "/333-105-7771.png", "GoldImage": "/7-771-7771.webm", "Sounds": [] }, { "Name": "Patchwerk", "RegImage": "/333-108-7772.png", "GoldImage": "/7-772-7772.webm", "Sounds": [] }, { "Name": "Hook", "RegImage": "/333-111-7773.png", "GoldImage": "/7-773-7773.webm", "Sounds": [] }, { "Name": "Hook", "RegImage": "/333-114-7774.png", "GoldImage": "/7-774-7774.webm", "Sounds": [] }, { "Name": "Hateful Strike", "RegImage": "/333-117-7775.png", "GoldImage": "/7-775-7775.webm", "Sounds": [] }, { "Name": "Hateful Strike", "RegImage": "/333-120-7776.png", "GoldImage": "/7-776-7776.webm", "Sounds": [] }, { "Name": "Grobbulus", "RegImage": "/333-123-7777.png", "GoldImage": "/7-777-7777.webm", "Sounds": [] }, { "Name": "Grobbulus", "RegImage": "/333-126-7778.png", "GoldImage": "/7-778-7778.webm", "Sounds": [] }, { "Name": "Poison Cloud", "RegImage": "/333-129-7779.png", "GoldImage": "/7-779-7779.webm", "Sounds": [{ "Name": "Play1", "URL": "/FX_Warlock_AE_GasWave_Green_01.ogg" }] }, { "Name": "Poison Cloud", "RegImage": "/333-132-7780.png", "GoldImage": "/7-780-7780.webm", "Sounds": [{ "Name": "Play1", "URL": "/FX_Warlock_AE_GasWave_Green_01.ogg" }] }, { "Name": "Fallout Slime", "RegImage": "/333-138-7781.png", "GoldImage": "/7-781-7781.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_NAX11_03_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_NAX11_03_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_NAX11_03_EnterPlay.ogg" }] }, { "Name": "Mutating Injection", "RegImage": "/333-141-7782.png", "GoldImage": "/7-782-7782.webm", "Sounds": [] }, { "Name": "Gluth", "RegImage": "/333-144-7784.png", "GoldImage": "/7-784-7784.webm", "Sounds": [] }, { "Name": "Gluth", "RegImage": "/333-147-7785.png", "GoldImage": "/7-785-7785.webm", "Sounds": [] }, { "Name": "Decimate", "RegImage": "/333-150-7786.png", "GoldImage": "/7-786-7786.webm", "Sounds": [{ "Name": "Play1", "URL": "/KingMukla_Stomp_Cast_1.ogg" }] }, { "Name": "Decimate", "RegImage": "/333-153-7788.png", "GoldImage": "/7-788-7788.webm", "Sounds": [{ "Name": "Play1", "URL": "/KingMukla_Stomp_Cast_1.ogg" }] }, { "Name": "Jaws", "RegImage": "/333-162-7789.png", "GoldImage": "/7-789-7789.webm", "Sounds": [] }, { "Name": "Jaws", "RegImage": "/333-165-7791.png", "GoldImage": "/7-791-7791.webm", "Sounds": [] }, { "Name": "Enrage", "RegImage": "/333-168-7792.png", "GoldImage": "/7-792-7792.webm", "Sounds": [] }, { "Name": "Thaddius", "RegImage": "/333-171-7794.png", "GoldImage": "/7-794-7794.webm", "Sounds": [] }, { "Name": "Thaddius", "RegImage": "/333-174-7795.png", "GoldImage": "/7-795-7795.webm", "Sounds": [] }, { "Name": "Polarity Shift", "RegImage": "/333-177-7796.png", "GoldImage": "/7-796-7796.webm", "Sounds": [] }, { "Name": "Supercharge", "RegImage": "/333-180-7798.png", "GoldImage": "/7-798-7798.webm", "Sounds": [] }, { "Name": "Feugen", "RegImage": "/333-183-7800.png", "GoldImage": "/7-800-7800.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_015_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_015_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_015_EnterPlay_01.ogg" }] }, { "Name": "Stalagg", "RegImage": "/333-186-7801.png", "GoldImage": "/7-801-7801.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_FP1_014_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_FP1_014_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_FP1_014_EnterPlay_01.ogg" }] }, { "Name": "Sapphiron", "RegImage": "/333-189-7802.png", "GoldImage": "/7-802-7802.webm", "Sounds": [] }, { "Name": "Sapphiron", "RegImage": "/333-192-7803.png", "GoldImage": "/7-803-7803.webm", "Sounds": [] }, { "Name": "Frost Breath", "RegImage": "/333-195-7804.png", "GoldImage": "/7-804-7804.webm", "Sounds": [] }, { "Name": "Frozen Champion", "RegImage": "/333-198-7805.png", "GoldImage": "/7-805-7805.webm", "Sounds": [] }, { "Name": "Pure Cold", "RegImage": "/333-201-7806.png", "GoldImage": "/7-806-7806.webm", "Sounds": [] }, { "Name": "Kel'Thuzad", "RegImage": "/333-204-7807.png", "GoldImage": "/7-807-7807.webm", "Sounds": [] }, { "Name": "Kel'Thuzad", "RegImage": "/333-207-7809.png", "GoldImage": "/7-809-7809.webm", "Sounds": [] }, { "Name": "Frost Blast", "RegImage": "/333-210-7811.png", "GoldImage": "/7-811-7811.webm", "Sounds": [] }, { "Name": "Frost Blast", "RegImage": "/333-213-7812.png", "GoldImage": "/7-812-7812.webm", "Sounds": [] }, { "Name": "Guardian of Icecrown", "RegImage": "/333-216-7813.png", "GoldImage": "/7-813-7813.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_NAX15_03n_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_NAX15_03n_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_NAX15_03n_EnterPlay.ogg" }] }, { "Name": "Guardian of Icecrown", "RegImage": "/333-219-7814.png", "GoldImage": "/7-814-7814.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_NAX15_03t_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_NAX15_03t_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_NAX15_03t_EnterPlay.ogg" }] }, { "Name": "Chains", "RegImage": "/333-222-7815.png", "GoldImage": "/7-815-7815.webm", "Sounds": [] }, { "Name": "Chains", "RegImage": "/333-225-7817.png", "GoldImage": "/7-817-7817.webm", "Sounds": [] }, { "Name": "Mr. Bigglesworth", "RegImage": "/333-228-7818.png", "GoldImage": "/7-818-7818.webm", "Sounds": [{ "Name": "Attack1", "URL": "/NAX15_05 MrBigglesworth_Attack.ogg" }, { "Name": "Death1", "URL": "/NAX15_05 MrBigglesworth_Death.ogg" }, { "Name": "Play1", "URL": "/NAX15_05 MrBigglesworth_Play.ogg" }] }, { "Name": "Anub'Rekhan", "RegImage": "/333-231-7819.png", "GoldImage": "/7-819-7819.webm", "Sounds": [] }, { "Name": "Nerubian", "RegImage": "/333-234-7820.png", "GoldImage": "/7-820-7820.webm", "Sounds": [] }, { "Name": "Skitter", "RegImage": "/333-237-7821.png", "GoldImage": "/7-821-7821.webm", "Sounds": [] }, { "Name": "Anub'Rekhan", "RegImage": "/333-93-7822.png", "GoldImage": "/7-822-7822.webm", "Sounds": [] }, { "Name": "Nerubian", "RegImage": "/333-96-7823.png", "GoldImage": "/7-823-7823.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_NAX1_03_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_NAX1_03_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_NAX1_03_EnterPlay.ogg" }] }, { "Name": "Skitter", "RegImage": "/333-99-7824.png", "GoldImage": "/7-824-7824.webm", "Sounds": [] }, { "Name": "Locust Swarm", "RegImage": "/333-102-7825.png", "GoldImage": "/7-825-7825.webm", "Sounds": [] }, { "Name": "Grand Widow Faerlina", "RegImage": "/333-240-7826.png", "GoldImage": "/7-826-7826.webm", "Sounds": [] }, { "Name": "Grand Widow Faerlina", "RegImage": "/333-243-7827.png", "GoldImage": "/7-827-7827.webm", "Sounds": [] }, { "Name": "Rain of Fire", "RegImage": "/333-246-7828.png", "GoldImage": "/7-828-7828.webm", "Sounds": [] }, { "Name": "Rain of Fire", "RegImage": "/333-249-7829.png", "GoldImage": "/7-829-7829.webm", "Sounds": [] }, { "Name": "Worshipper", "RegImage": "/333-252-7830.png", "GoldImage": "/7-830-7830.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX2_05_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAX2_05_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NAX2_05_EnterPlay_01.ogg" }] }, { "Name": "Worshipper", "RegImage": "/333-255-7831.png", "GoldImage": "/7-831-7831.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX2_05_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAX2_05_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NAX2_05_EnterPlay_01.ogg" }] }, { "Name": "Maexxna", "RegImage": "/333-258-7832.png", "GoldImage": "/7-832-7832.webm", "Sounds": [] }, { "Name": "Maexxna", "RegImage": "/333-261-7833.png", "GoldImage": "/7-833-7833.webm", "Sounds": [] }, { "Name": "Web Wrap", "RegImage": "/333-264-7834.png", "GoldImage": "/7-834-7834.webm", "Sounds": [] }, { "Name": "Web Wrap", "RegImage": "/333-270-7835.png", "GoldImage": "/7-835-7835.webm", "Sounds": [] }, { "Name": "Necrotic Poison", "RegImage": "/333-273-7836.png", "GoldImage": "/7-836-7836.webm", "Sounds": [] }, { "Name": "Noth the Plaguebringer", "RegImage": "/333-276-7837.png", "GoldImage": "/7-837-7837.webm", "Sounds": [] }, { "Name": "Noth the Plaguebringer", "RegImage": "/333-279-7838.png", "GoldImage": "/7-838-7838.webm", "Sounds": [] }, { "Name": "Skeleton", "RegImage": "/333-282-7839.png", "GoldImage": "/7-839-7839.webm", "Sounds": [{ "Name": "Attack1", "URL": "/NAX4_03_Skeleton_Attack.ogg" }, { "Name": "Death1", "URL": "/NAX4_03_Skeleton_Death.ogg" }, { "Name": "Play1", "URL": "/NAX4_03_Skeleton_EnterPlay.ogg" }] }, { "Name": "Skeleton", "RegImage": "/333-285-7840.png", "GoldImage": "/7-840-7840.webm", "Sounds": [{ "Name": "Attack1", "URL": "/NAX4_03_Skeleton_Attack.ogg" }, { "Name": "Death1", "URL": "/NAX4_03_Skeleton_Death.ogg" }, { "Name": "Play1", "URL": "/NAX4_03_Skeleton_EnterPlay.ogg" }] }, { "Name": "Raise Dead", "RegImage": "/333-288-7841.png", "GoldImage": "/7-841-7841.webm", "Sounds": [] }, { "Name": "Raise Dead", "RegImage": "/333-291-7842.png", "GoldImage": "/7-842-7842.webm", "Sounds": [] }, { "Name": "Plague", "RegImage": "/333-294-7843.png", "GoldImage": "/7-843-7843.webm", "Sounds": [{ "Name": "Play1", "URL": "/FX_Warlock_AE_GasWave_Green_01.ogg" }] }, { "Name": "Heigan the Unclean", "RegImage": "/333-297-7844.png", "GoldImage": "/7-844-7844.webm", "Sounds": [] }, { "Name": "Heigan the Unclean", "RegImage": "/333-300-7845.png", "GoldImage": "/7-845-7845.webm", "Sounds": [] }, { "Name": "Eruption", "RegImage": "/333-303-7846.png", "GoldImage": "/7-846-7846.webm", "Sounds": [{ "Name": "Play1", "URL": "/Shared_Eruption_FX_01.ogg" }] }, { "Name": "Eruption", "RegImage": "/333-306-7847.png", "GoldImage": "/7-847-7847.webm", "Sounds": [{ "Name": "Play1", "URL": "/Shared_Eruption_FX_01.ogg" }] }, { "Name": "Mindpocalypse", "RegImage": "/333-309-7848.png", "GoldImage": "/7-848-7848.webm", "Sounds": [] }, { "Name": "Loatheb", "RegImage": "/333-312-7849.png", "GoldImage": "/7-849-7849.webm", "Sounds": [] }, { "Name": "Loatheb", "RegImage": "/333-315-7850.png", "GoldImage": "/7-850-7850.webm", "Sounds": [] }, { "Name": "Necrotic Aura", "RegImage": "/333-318-7851.png", "GoldImage": "/7-851-7851.webm", "Sounds": [{ "Name": "Play1", "URL": "/FX_Warlock_AE_GasWave_HeroPower_01.ogg" }] }, { "Name": "Necrotic Aura", "RegImage": "/333-321-7853.png", "GoldImage": "/7-853-7853.webm", "Sounds": [{ "Name": "Play1", "URL": "/FX_Warlock_AE_GasWave_HeroPower_01.ogg" }] }, { "Name": "Deathbloom", "RegImage": "/333-324-7854.png", "GoldImage": "/7-854-7854.webm", "Sounds": [] }, { "Name": "Spore", "RegImage": "/333-327-7855.png", "GoldImage": "/7-855-7855.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_NAX6_03t_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_NAX6_03t_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_NAX6_03t_EnterPlay.ogg" }, { "Name": "Trigger1", "URL": "/Warlock_AE_GasWave_Orange_Sound_01.ogg" }] }, { "Name": "Sporeburst", "RegImage": "/333-330-7857.png", "GoldImage": "/7-857-7857.webm", "Sounds": [{ "Name": "Play1", "URL": "/Warlock_AE_GasWave_Orange_Sound_01.ogg" }] }, { "Name": "Instructor Razuvious", "RegImage": "/333-333-7858.png", "GoldImage": "/7-858-7858.webm", "Sounds": [] }, { "Name": "Instructor Razuvious", "RegImage": "/333-336-7859.png", "GoldImage": "/7-859-7859.webm", "Sounds": [] }, { "Name": "Understudy", "RegImage": "/333-339-7860.png", "GoldImage": "/7-860-7860.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX7_02_Attack_01.ogg" }, { "Name": "Death1", "URL": "/VO_NAX7_02_Death_02.ogg" }] }, { "Name": "Unbalancing Strike", "RegImage": "/333-342-7861.png", "GoldImage": "/7-861-7861.webm", "Sounds": [] }, { "Name": "Unbalancing Strike", "RegImage": "/333-345-7862.png", "GoldImage": "/7-862-7862.webm", "Sounds": [] }, { "Name": "Massive Runeblade", "RegImage": "/333-348-7863.png", "GoldImage": "/7-863-7863.webm", "Sounds": [] }, { "Name": "Massive Runeblade", "RegImage": "/333-351-7864.png", "GoldImage": "/7-864-7864.webm", "Sounds": [] }, { "Name": "Mind Control Crystal", "RegImage": "/333-354-7865.png", "GoldImage": "/7-865-7865.webm", "Sounds": [] }, { "Name": "Gothik the Harvester", "RegImage": "/333-357-7866.png", "GoldImage": "/7-866-7866.webm", "Sounds": [] }, { "Name": "Gothik the Harvester", "RegImage": "/333-360-7867.png", "GoldImage": "/7-867-7867.webm", "Sounds": [] }, { "Name": "Harvest", "RegImage": "/333-363-7868.png", "GoldImage": "/7-868-7868.webm", "Sounds": [] }, { "Name": "Harvest", "RegImage": "/333-366-7869.png", "GoldImage": "/7-869-7869.webm", "Sounds": [] }, { "Name": "Unrelenting Trainee", "RegImage": "/333-372-7870.png", "GoldImage": "/7-870-7870.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX8_03_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAX8_03_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NAX8_03_EnterPlay_01.ogg" }] }, { "Name": "Spectral Trainee", "RegImage": "/333-375-7871.png", "GoldImage": "/7-871-7871.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX8_03t_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAX8_03t_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NAX8_03t_EnterPlay_01.ogg" }] }, { "Name": "Unrelenting Warrior", "RegImage": "/333-378-7872.png", "GoldImage": "/7-872-7872.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX8_04_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAX8_04_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NAX8_04_EnterPlay_01.ogg" }] }, { "Name": "Spectral Warrior", "RegImage": "/333-381-7873.png", "GoldImage": "/7-873-7873.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX8_04t_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAX8_04t_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NAX8_042t_EnterPlay_01.ogg" }] }, { "Name": "Unrelenting Rider", "RegImage": "/333-384-7874.png", "GoldImage": "/7-874-7874.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX8_05_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAX8_05_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NAX8_05_EnterPlay_01.ogg" }] }, { "Name": "Spectral Rider", "RegImage": "/333-387-7875.png", "GoldImage": "/7-875-7875.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX8_05t_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAX8_05t_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NAX8_05t_EnterPlay_01.ogg" }] }, { "Name": "Baron Rivendare", "RegImage": "/333-390-7876.png", "GoldImage": "/7-876-7876.webm", "Sounds": [] }, { "Name": "Baron Rivendare", "RegImage": "/333-393-7877.png", "GoldImage": "/7-877-7877.webm", "Sounds": [] }, { "Name": "Lady Blaumeux", "RegImage": "/333-396-7878.png", "GoldImage": "/7-878-7878.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX9_03_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAX9_03_Death_03.ogg" }] }, { "Name": "Lady Blaumeux", "RegImage": "/333-399-7879.png", "GoldImage": "/7-879-7879.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX9_03_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAX9_03_Death_03.ogg" }] }, { "Name": "Thane Korth'azz", "RegImage": "/333-402-7880.png", "GoldImage": "/7-880-7880.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX9_04_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAX9_04_Death_03.ogg" }] }, { "Name": "Thane Korth'azz", "RegImage": "/333-405-7881.png", "GoldImage": "/7-881-7881.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX9_04_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAX9_04_Death_03.ogg" }] }, { "Name": "Sir Zeliek", "RegImage": "/333-408-7882.png", "GoldImage": "/7-882-7882.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX9_02_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAX9_02_Death_03.ogg" }] }, { "Name": "Sir Zeliek", "RegImage": "/333-411-7883.png", "GoldImage": "/7-883-7883.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAX9_02_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAX9_02_Death_03.ogg" }] }, { "Name": "Runeblade", "RegImage": "/333-414-7884.png", "GoldImage": "/7-884-7884.webm", "Sounds": [] }, { "Name": "Runeblade", "RegImage": "/333-417-7885.png", "GoldImage": "/7-885-7885.webm", "Sounds": [] }, { "Name": "Unholy Shadow", "RegImage": "/333-420-7886.png", "GoldImage": "/7-886-7886.webm", "Sounds": [] }, { "Name": "Mark of the Horsemen", "RegImage": "/333-423-7887.png", "GoldImage": "/7-887-7887.webm", "Sounds": [{ "Name": "Play1", "URL": "/FX_Warlock_AE_GasWave_HeroPower_01.ogg" }] }, { "Name": "Necroknight", "RegImage": "/333-426-7889.png", "GoldImage": "/7-889-7889.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_NAXM_001_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_NAXM_001_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_NAXM_001_EnterPlay_01.ogg" }] }, { "Name": "Skeletal Smith", "RegImage": "/333-429-7890.png", "GoldImage": "/7-890-7890.webm", "Sounds": [{ "Name": "Attack1", "URL": "/NAXM_002_SkeletalSmith_Attack.ogg" }, { "Name": "Death1", "URL": "/NAXM_002_SkeletalSmith_Death.ogg" }, { "Name": "Play1", "URL": "/NAXM_002_SkeletalSmith_EnterPlay.ogg" }] }, { "Name": "Savannah Highmane", "RegImage": "/330-941-8.png", "GoldImage": "/0-8-8.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_534_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_534_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_534_EnterPlay.ogg" }] }, { "Name": "Mad Bomber", "RegImage": "/330-465-80.png", "GoldImage": "/0-80-80.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_082_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_082_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_082_Play_01.ogg" }] }, { "Name": "Cleave", "RegImage": "/330-126-81.png", "GoldImage": "/0-81-81.webm", "Collectible": true, "Sounds": [] }, { "Name": "Perdition's Blade", "RegImage": "/330-549-82.png", "GoldImage": "/0-82-82.webm", "Collectible": true, "Sounds": [] }, { "Name": "INFERNO!", "RegImage": "/331-168-83.png", "GoldImage": "/0-83-83.webm", "Sounds": [{ "Name": "Play1", "URL": "/VO_Jaxus_Summon.ogg" }] }, { "Name": "Darkscale Healer", "RegImage": "/330-300-84.png", "GoldImage": "/0-84-84.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_DS1_055_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_DS1_055_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_DS1_055_Play_01.ogg" }] }, { "Name": "Flame Imp", "RegImage": "/330-779-85.png", "GoldImage": "/0-85-85.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_319_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_319_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_319_Play_01.ogg" }] }, { "Name": "Timber Wolf", "RegImage": "/330-306-86.png", "GoldImage": "/0-86-86.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_DS1_175_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_DS1_175_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_DS1_175_EnterPlay.ogg" }] }, { "Name": "Deadly Poison", "RegImage": "/330-33-87.png", "GoldImage": "/0-87-87.webm", "Collectible": true, "Sounds": [] }, { "Name": "Coldlight Oracle", "RegImage": "/330-435-88.png", "GoldImage": "/0-88-88.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_050_Coldlight_Oracle_Attack1.ogg" }, { "Name": "Death1", "URL": "/EX1_050_Coldlight_Oracle_Death1.ogg" }, { "Name": "Play1", "URL": "/EX1_050_Coldlight_Oracle_EnterPlay1.ogg" }] }, { "Name": "Defias Bandit", "RegImage": "/330-543-9.png", "GoldImage": "/0-9-9.webm", "Sounds": [{ "Name": "Attack1", "URL": "/VO_EX1_131t_Attack_02.ogg" }, { "Name": "Death1", "URL": "/VO_EX1_131t_Death_03.ogg" }, { "Name": "Play1", "URL": "/VO_EX1_131t_Play_01.ogg" }] }, { "Name": "Sprint", "RegImage": "/330-42-90.png", "GoldImage": "/0-90-90.webm", "Collectible": true, "Sounds": [] }, { "Name": "Cold Blood", "RegImage": "/330-30-92.png", "GoldImage": "/0-92-92.webm", "Collectible": true, "Sounds": [] }, { "Name": "Molten Giant", "RegImage": "/331-129-94.png", "GoldImage": "/0-94-94.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_620_Molten_Giant_Attack1.ogg" }, { "Name": "Death1", "URL": "/EX1_620_Molten_Giant_Death1.ogg" }, { "Name": "Play1", "URL": "/EX1_620_Molten_Giant_EnterPlay2.ogg" }] }, { "Name": "Raging Worgen", "RegImage": "/330-911-95.png", "GoldImage": "/0-95-95.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/SFX_EX1_412_Attack.ogg" }, { "Name": "Death1", "URL": "/SFX_EX1_412_Death.ogg" }, { "Name": "Play1", "URL": "/SFX_EX1_412_EnterPlay.ogg" }] }, { "Name": "Gorehowl", "RegImage": "/330-908-96.png", "GoldImage": "/0-96-96.webm", "Collectible": true, "Sounds": [] }, { "Name": "Arcane Golem", "RegImage": "/330-477-97.png", "GoldImage": "/0-97-97.webm", "Collectible": true, "Sounds": [{ "Name": "Attack1", "URL": "/EX1_089_Arcane_Golem_Attack5.ogg" }, { "Name": "Death1", "URL": "/EX1_089_Arcane_Golem_Death4.ogg" }, { "Name": "Play1", "URL": "/EX1_089_Arcane_Golem_EnterPlay2.ogg" }] }, { "Name": "Searing Totem", "RegImage": "/329-991-98.png", "GoldImage": "/0-98-98.webm", "Sounds": [{ "Name": "Attack1", "URL": "/SFX_CS2_050_Attack_00.ogg" }, { "Name": "Death1", "URL": "/CS2_050_Death_SearingTotem.ogg" }, { "Name": "Play1", "URL": "/CS2_050_Play_SearingTotem.ogg" }] }, { "Name": "Freezing Trap", "RegImage": "/331-103-99.png", "GoldImage": "/0-99-99.webm", "Collectible": true, "Sounds": [] }];
exports.default = Cards;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return _;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 *  howler.js v2.0.4
 *  howlerjs.com
 *
 *  (c) 2013-2017, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

(function() {

  'use strict';

  /** Global Methods **/
  /***************************************************************************/

  /**
   * Create the global controller. All contained methods and properties apply
   * to all sounds that are currently playing or will be in the future.
   */
  var HowlerGlobal = function() {
    this.init();
  };
  HowlerGlobal.prototype = {
    /**
     * Initialize the global Howler object.
     * @return {Howler}
     */
    init: function() {
      var self = this || Howler;

      // Create a global ID counter.
      self._counter = 1000;

      // Internal properties.
      self._codecs = {};
      self._howls = [];
      self._muted = false;
      self._volume = 1;
      self._canPlayEvent = 'canplaythrough';
      self._navigator = (typeof window !== 'undefined' && window.navigator) ? window.navigator : null;

      // Public properties.
      self.masterGain = null;
      self.noAudio = false;
      self.usingWebAudio = true;
      self.autoSuspend = true;
      self.ctx = null;

      // Set to false to disable the auto iOS enabler.
      self.mobileAutoEnable = true;

      // Setup the various state values for global tracking.
      self._setup();

      return self;
    },

    /**
     * Get/set the global volume for all sounds.
     * @param  {Float} vol Volume from 0.0 to 1.0.
     * @return {Howler/Float}     Returns self or current volume.
     */
    volume: function(vol) {
      var self = this || Howler;
      vol = parseFloat(vol);

      // If we don't have an AudioContext created yet, run the setup.
      if (!self.ctx) {
        setupAudioContext();
      }

      if (typeof vol !== 'undefined' && vol >= 0 && vol <= 1) {
        self._volume = vol;

        // Don't update any of the nodes if we are muted.
        if (self._muted) {
          return self;
        }

        // When using Web Audio, we just need to adjust the master gain.
        if (self.usingWebAudio) {
          self.masterGain.gain.value = vol;
        }

        // Loop through and change volume for all HTML5 audio nodes.
        for (var i=0; i<self._howls.length; i++) {
          if (!self._howls[i]._webAudio) {
            // Get all of the sounds in this Howl group.
            var ids = self._howls[i]._getSoundIds();

            // Loop through all sounds and change the volumes.
            for (var j=0; j<ids.length; j++) {
              var sound = self._howls[i]._soundById(ids[j]);

              if (sound && sound._node) {
                sound._node.volume = sound._volume * vol;
              }
            }
          }
        }

        return self;
      }

      return self._volume;
    },

    /**
     * Handle muting and unmuting globally.
     * @param  {Boolean} muted Is muted or not.
     */
    mute: function(muted) {
      var self = this || Howler;

      // If we don't have an AudioContext created yet, run the setup.
      if (!self.ctx) {
        setupAudioContext();
      }

      self._muted = muted;

      // With Web Audio, we just need to mute the master gain.
      if (self.usingWebAudio) {
        self.masterGain.gain.value = muted ? 0 : self._volume;
      }

      // Loop through and mute all HTML5 Audio nodes.
      for (var i=0; i<self._howls.length; i++) {
        if (!self._howls[i]._webAudio) {
          // Get all of the sounds in this Howl group.
          var ids = self._howls[i]._getSoundIds();

          // Loop through all sounds and mark the audio node as muted.
          for (var j=0; j<ids.length; j++) {
            var sound = self._howls[i]._soundById(ids[j]);

            if (sound && sound._node) {
              sound._node.muted = (muted) ? true : sound._muted;
            }
          }
        }
      }

      return self;
    },

    /**
     * Unload and destroy all currently loaded Howl objects.
     * @return {Howler}
     */
    unload: function() {
      var self = this || Howler;

      for (var i=self._howls.length-1; i>=0; i--) {
        self._howls[i].unload();
      }

      // Create a new AudioContext to make sure it is fully reset.
      if (self.usingWebAudio && self.ctx && typeof self.ctx.close !== 'undefined') {
        self.ctx.close();
        self.ctx = null;
        setupAudioContext();
      }

      return self;
    },

    /**
     * Check for codec support of specific extension.
     * @param  {String} ext Audio file extention.
     * @return {Boolean}
     */
    codecs: function(ext) {
      return (this || Howler)._codecs[ext.replace(/^x-/, '')];
    },

    /**
     * Setup various state values for global tracking.
     * @return {Howler}
     */
    _setup: function() {
      var self = this || Howler;

      // Keeps track of the suspend/resume state of the AudioContext.
      self.state = self.ctx ? self.ctx.state || 'running' : 'running';

      // Automatically begin the 30-second suspend process
      self._autoSuspend();

      // Check if audio is available.
      if (!self.usingWebAudio) {
        // No audio is available on this system if noAudio is set to true.
        if (typeof Audio !== 'undefined') {
          try {
            var test = new Audio();

            // Check if the canplaythrough event is available.
            if (typeof test.oncanplaythrough === 'undefined') {
              self._canPlayEvent = 'canplay';
            }
          } catch(e) {
            self.noAudio = true;
          }
        } else {
          self.noAudio = true;
        }
      }

      // Test to make sure audio isn't disabled in Internet Explorer.
      try {
        var test = new Audio();
        if (test.muted) {
          self.noAudio = true;
        }
      } catch (e) {}

      // Check for supported codecs.
      if (!self.noAudio) {
        self._setupCodecs();
      }

      return self;
    },

    /**
     * Check for browser support for various codecs and cache the results.
     * @return {Howler}
     */
    _setupCodecs: function() {
      var self = this || Howler;
      var audioTest = null;

      // Must wrap in a try/catch because IE11 in server mode throws an error.
      try {
        audioTest = (typeof Audio !== 'undefined') ? new Audio() : null;
      } catch (err) {
        return self;
      }

      if (!audioTest || typeof audioTest.canPlayType !== 'function') {
        return self;
      }

      var mpegTest = audioTest.canPlayType('audio/mpeg;').replace(/^no$/, '');

      // Opera version <33 has mixed MP3 support, so we need to check for and block it.
      var checkOpera = self._navigator && self._navigator.userAgent.match(/OPR\/([0-6].)/g);
      var isOldOpera = (checkOpera && parseInt(checkOpera[0].split('/')[1], 10) < 33);

      self._codecs = {
        mp3: !!(!isOldOpera && (mpegTest || audioTest.canPlayType('audio/mp3;').replace(/^no$/, ''))),
        mpeg: !!mpegTest,
        opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
        ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
        oga: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
        wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
        aac: !!audioTest.canPlayType('audio/aac;').replace(/^no$/, ''),
        caf: !!audioTest.canPlayType('audio/x-caf;').replace(/^no$/, ''),
        m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
        mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
        weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ''),
        webm: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ''),
        dolby: !!audioTest.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ''),
        flac: !!(audioTest.canPlayType('audio/x-flac;') || audioTest.canPlayType('audio/flac;')).replace(/^no$/, '')
      };

      return self;
    },

    /**
     * Mobile browsers will only allow audio to be played after a user interaction.
     * Attempt to automatically unlock audio on the first user interaction.
     * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
     * @return {Howler}
     */
    _enableMobileAudio: function() {
      var self = this || Howler;

      // Only run this on mobile devices if audio isn't already eanbled.
      var isMobile = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(self._navigator && self._navigator.userAgent);
      var isTouch = !!(('ontouchend' in window) || (self._navigator && self._navigator.maxTouchPoints > 0) || (self._navigator && self._navigator.msMaxTouchPoints > 0));
      if (self._mobileEnabled || !self.ctx || (!isMobile && !isTouch)) {
        return;
      }

      self._mobileEnabled = false;

      // Some mobile devices/platforms have distortion issues when opening/closing tabs and/or web views.
      // Bugs in the browser (especially Mobile Safari) can cause the sampleRate to change from 44100 to 48000.
      // By calling Howler.unload(), we create a new AudioContext with the correct sampleRate.
      if (!self._mobileUnloaded && self.ctx.sampleRate !== 44100) {
        self._mobileUnloaded = true;
        self.unload();
      }

      // Scratch buffer for enabling iOS to dispose of web audio buffers correctly, as per:
      // http://stackoverflow.com/questions/24119684
      self._scratchBuffer = self.ctx.createBuffer(1, 1, 22050);

      // Call this method on touch start to create and play a buffer,
      // then check if the audio actually played to determine if
      // audio has now been unlocked on iOS, Android, etc.
      var unlock = function() {
        // Fix Android can not play in suspend state.
        Howler._autoResume();

        // Create an empty buffer.
        var source = self.ctx.createBufferSource();
        source.buffer = self._scratchBuffer;
        source.connect(self.ctx.destination);

        // Play the empty buffer.
        if (typeof source.start === 'undefined') {
          source.noteOn(0);
        } else {
          source.start(0);
        }

        // Calling resume() on a stack initiated by user gesture is what actually unlocks the audio on Android Chrome >= 55.
        if (typeof self.ctx.resume === 'function') {
          self.ctx.resume();
        }

        // Setup a timeout to check that we are unlocked on the next event loop.
        source.onended = function() {
          source.disconnect(0);

          // Update the unlocked state and prevent this check from happening again.
          self._mobileEnabled = true;
          self.mobileAutoEnable = false;

          // Remove the touch start listener.
          document.removeEventListener('touchend', unlock, true);
        };
      };

      // Setup a touch start listener to attempt an unlock in.
      document.addEventListener('touchend', unlock, true);

      return self;
    },

    /**
     * Automatically suspend the Web Audio AudioContext after no sound has played for 30 seconds.
     * This saves processing/energy and fixes various browser-specific bugs with audio getting stuck.
     * @return {Howler}
     */
    _autoSuspend: function() {
      var self = this;

      if (!self.autoSuspend || !self.ctx || typeof self.ctx.suspend === 'undefined' || !Howler.usingWebAudio) {
        return;
      }

      // Check if any sounds are playing.
      for (var i=0; i<self._howls.length; i++) {
        if (self._howls[i]._webAudio) {
          for (var j=0; j<self._howls[i]._sounds.length; j++) {
            if (!self._howls[i]._sounds[j]._paused) {
              return self;
            }
          }
        }
      }

      if (self._suspendTimer) {
        clearTimeout(self._suspendTimer);
      }

      // If no sound has played after 30 seconds, suspend the context.
      self._suspendTimer = setTimeout(function() {
        if (!self.autoSuspend) {
          return;
        }

        self._suspendTimer = null;
        self.state = 'suspending';
        self.ctx.suspend().then(function() {
          self.state = 'suspended';

          if (self._resumeAfterSuspend) {
            delete self._resumeAfterSuspend;
            self._autoResume();
          }
        });
      }, 30000);

      return self;
    },

    /**
     * Automatically resume the Web Audio AudioContext when a new sound is played.
     * @return {Howler}
     */
    _autoResume: function() {
      var self = this;

      if (!self.ctx || typeof self.ctx.resume === 'undefined' || !Howler.usingWebAudio) {
        return;
      }

      if (self.state === 'running' && self._suspendTimer) {
        clearTimeout(self._suspendTimer);
        self._suspendTimer = null;
      } else if (self.state === 'suspended') {
        self.ctx.resume().then(function() {
          self.state = 'running';

          // Emit to all Howls that the audio has resumed.
          for (var i=0; i<self._howls.length; i++) {
            self._howls[i]._emit('resume');
          }
        });

        if (self._suspendTimer) {
          clearTimeout(self._suspendTimer);
          self._suspendTimer = null;
        }
      } else if (self.state === 'suspending') {
        self._resumeAfterSuspend = true;
      }

      return self;
    }
  };

  // Setup the global audio controller.
  var Howler = new HowlerGlobal();

  /** Group Methods **/
  /***************************************************************************/

  /**
   * Create an audio group controller.
   * @param {Object} o Passed in properties for this group.
   */
  var Howl = function(o) {
    var self = this;

    // Throw an error if no source is provided.
    if (!o.src || o.src.length === 0) {
      console.error('An array of source files must be passed with any new Howl.');
      return;
    }

    self.init(o);
  };
  Howl.prototype = {
    /**
     * Initialize a new Howl group object.
     * @param  {Object} o Passed in properties for this group.
     * @return {Howl}
     */
    init: function(o) {
      var self = this;

      // If we don't have an AudioContext created yet, run the setup.
      if (!Howler.ctx) {
        setupAudioContext();
      }

      // Setup user-defined default properties.
      self._autoplay = o.autoplay || false;
      self._format = (typeof o.format !== 'string') ? o.format : [o.format];
      self._html5 = o.html5 || false;
      self._muted = o.mute || false;
      self._loop = o.loop || false;
      self._pool = o.pool || 5;
      self._preload = (typeof o.preload === 'boolean') ? o.preload : true;
      self._rate = o.rate || 1;
      self._sprite = o.sprite || {};
      self._src = (typeof o.src !== 'string') ? o.src : [o.src];
      self._volume = o.volume !== undefined ? o.volume : 1;

      // Setup all other default properties.
      self._duration = 0;
      self._state = 'unloaded';
      self._sounds = [];
      self._endTimers = {};
      self._queue = [];

      // Setup event listeners.
      self._onend = o.onend ? [{fn: o.onend}] : [];
      self._onfade = o.onfade ? [{fn: o.onfade}] : [];
      self._onload = o.onload ? [{fn: o.onload}] : [];
      self._onloaderror = o.onloaderror ? [{fn: o.onloaderror}] : [];
      self._onpause = o.onpause ? [{fn: o.onpause}] : [];
      self._onplay = o.onplay ? [{fn: o.onplay}] : [];
      self._onstop = o.onstop ? [{fn: o.onstop}] : [];
      self._onmute = o.onmute ? [{fn: o.onmute}] : [];
      self._onvolume = o.onvolume ? [{fn: o.onvolume}] : [];
      self._onrate = o.onrate ? [{fn: o.onrate}] : [];
      self._onseek = o.onseek ? [{fn: o.onseek}] : [];
      self._onresume = [];

      // Web Audio or HTML5 Audio?
      self._webAudio = Howler.usingWebAudio && !self._html5;

      // Automatically try to enable audio on iOS.
      if (typeof Howler.ctx !== 'undefined' && Howler.ctx && Howler.mobileAutoEnable) {
        Howler._enableMobileAudio();
      }

      // Keep track of this Howl group in the global controller.
      Howler._howls.push(self);

      // If they selected autoplay, add a play event to the load queue.
      if (self._autoplay) {
        self._queue.push({
          event: 'play',
          action: function() {
            self.play();
          }
        });
      }

      // Load the source file unless otherwise specified.
      if (self._preload) {
        self.load();
      }

      return self;
    },

    /**
     * Load the audio file.
     * @return {Howler}
     */
    load: function() {
      var self = this;
      var url = null;

      // If no audio is available, quit immediately.
      if (Howler.noAudio) {
        self._emit('loaderror', null, 'No audio support.');
        return;
      }

      // Make sure our source is in an array.
      if (typeof self._src === 'string') {
        self._src = [self._src];
      }

      // Loop through the sources and pick the first one that is compatible.
      for (var i=0; i<self._src.length; i++) {
        var ext, str;

        if (self._format && self._format[i]) {
          // If an extension was specified, use that instead.
          ext = self._format[i];
        } else {
          // Make sure the source is a string.
          str = self._src[i];
          if (typeof str !== 'string') {
            self._emit('loaderror', null, 'Non-string found in selected audio sources - ignoring.');
            continue;
          }

          // Extract the file extension from the URL or base64 data URI.
          ext = /^data:audio\/([^;,]+);/i.exec(str);
          if (!ext) {
            ext = /\.([^.]+)$/.exec(str.split('?', 1)[0]);
          }

          if (ext) {
            ext = ext[1].toLowerCase();
          }
        }

        // Log a warning if no extension was found.
        if (!ext) {
          console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
        }

        // Check if this extension is available.
        if (ext && Howler.codecs(ext)) {
          url = self._src[i];
          break;
        }
      }

      if (!url) {
        self._emit('loaderror', null, 'No codec support for selected audio sources.');
        return;
      }

      self._src = url;
      self._state = 'loading';

      // If the hosting page is HTTPS and the source isn't,
      // drop down to HTML5 Audio to avoid Mixed Content errors.
      if (window.location.protocol === 'https:' && url.slice(0, 5) === 'http:') {
        self._html5 = true;
        self._webAudio = false;
      }

      // Create a new sound object and add it to the pool.
      new Sound(self);

      // Load and decode the audio data for playback.
      if (self._webAudio) {
        loadBuffer(self);
      }

      return self;
    },

    /**
     * Play a sound or resume previous playback.
     * @param  {String/Number} sprite   Sprite name for sprite playback or sound id to continue previous.
     * @param  {Boolean} internal Internal Use: true prevents event firing.
     * @return {Number}          Sound ID.
     */
    play: function(sprite, internal) {
      var self = this;
      var id = null;

      // Determine if a sprite, sound id or nothing was passed
      if (typeof sprite === 'number') {
        id = sprite;
        sprite = null;
      } else if (typeof sprite === 'string' && self._state === 'loaded' && !self._sprite[sprite]) {
        // If the passed sprite doesn't exist, do nothing.
        return null;
      } else if (typeof sprite === 'undefined') {
        // Use the default sound sprite (plays the full audio length).
        sprite = '__default';

        // Check if there is a single paused sound that isn't ended.
        // If there is, play that sound. If not, continue as usual.
        var num = 0;
        for (var i=0; i<self._sounds.length; i++) {
          if (self._sounds[i]._paused && !self._sounds[i]._ended) {
            num++;
            id = self._sounds[i]._id;
          }
        }

        if (num === 1) {
          sprite = null;
        } else {
          id = null;
        }
      }

      // Get the selected node, or get one from the pool.
      var sound = id ? self._soundById(id) : self._inactiveSound();

      // If the sound doesn't exist, do nothing.
      if (!sound) {
        return null;
      }

      // Select the sprite definition.
      if (id && !sprite) {
        sprite = sound._sprite || '__default';
      }

      // If the sound hasn't loaded, we must wait to get the audio's duration.
      // We also need to wait to make sure we don't run into race conditions with
      // the order of function calls.
      if (self._state !== 'loaded') {
        // Set the sprite value on this sound.
        sound._sprite = sprite;

        // Makr this sounded as not ended in case another sound is played before this one loads.
        sound._ended = false;

        // Add the sound to the queue to be played on load.
        var soundId = sound._id;
        self._queue.push({
          event: 'play',
          action: function() {
            self.play(soundId);
          }
        });

        return soundId;
      }

      // Don't play the sound if an id was passed and it is already playing.
      if (id && !sound._paused) {
        // Trigger the play event, in order to keep iterating through queue.
        if (!internal) {
          setTimeout(function() {
            self._emit('play', sound._id);
          }, 0);
        }

        return sound._id;
      }

      // Make sure the AudioContext isn't suspended, and resume it if it is.
      if (self._webAudio) {
        Howler._autoResume();
      }

      // Determine how long to play for and where to start playing.
      var seek = Math.max(0, sound._seek > 0 ? sound._seek : self._sprite[sprite][0] / 1000);
      var duration = Math.max(0, ((self._sprite[sprite][0] + self._sprite[sprite][1]) / 1000) - seek);
      var timeout = (duration * 1000) / Math.abs(sound._rate);

      // Update the parameters of the sound
      sound._paused = false;
      sound._ended = false;
      sound._sprite = sprite;
      sound._seek = seek;
      sound._start = self._sprite[sprite][0] / 1000;
      sound._stop = (self._sprite[sprite][0] + self._sprite[sprite][1]) / 1000;
      sound._loop = !!(sound._loop || self._sprite[sprite][2]);

      // Begin the actual playback.
      var node = sound._node;
      if (self._webAudio) {
        // Fire this when the sound is ready to play to begin Web Audio playback.
        var playWebAudio = function() {
          self._refreshBuffer(sound);

          // Setup the playback params.
          var vol = (sound._muted || self._muted) ? 0 : sound._volume;
          node.gain.setValueAtTime(vol, Howler.ctx.currentTime);
          sound._playStart = Howler.ctx.currentTime;

          // Play the sound using the supported method.
          if (typeof node.bufferSource.start === 'undefined') {
            sound._loop ? node.bufferSource.noteGrainOn(0, seek, 86400) : node.bufferSource.noteGrainOn(0, seek, duration);
          } else {
            sound._loop ? node.bufferSource.start(0, seek, 86400) : node.bufferSource.start(0, seek, duration);
          }

          // Start a new timer if none is present.
          if (timeout !== Infinity) {
            self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
          }

          if (!internal) {
            setTimeout(function() {
              self._emit('play', sound._id);
            }, 0);
          }
        };

        var isRunning = (Howler.state === 'running');
        if (self._state === 'loaded' && isRunning) {
          playWebAudio();
        } else {
          // Wait for the audio to load and then begin playback.
          var event = !isRunning && self._state === 'loaded' ? 'resume' : 'load';
          self.once(event, playWebAudio, isRunning ? sound._id : null);

          // Cancel the end timer.
          self._clearTimer(sound._id);
        }
      } else {
        // Fire this when the sound is ready to play to begin HTML5 Audio playback.
        var playHtml5 = function() {
          node.currentTime = seek;
          node.muted = sound._muted || self._muted || Howler._muted || node.muted;
          node.volume = sound._volume * Howler.volume();
          node.playbackRate = sound._rate;
          node.play();

          // Setup the new end timer.
          if (timeout !== Infinity) {
            self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
          }

          if (!internal) {
            self._emit('play', sound._id);
          }
        };

        // Play immediately if ready, or wait for the 'canplaythrough'e vent.
        var loadedNoReadyState = (self._state === 'loaded' && (window && window.ejecta || !node.readyState && Howler._navigator.isCocoonJS));
        if (node.readyState === 4 || loadedNoReadyState) {
          playHtml5();
        } else {
          var listener = function() {
            // Begin playback.
            playHtml5();

            // Clear this listener.
            node.removeEventListener(Howler._canPlayEvent, listener, false);
          };
          node.addEventListener(Howler._canPlayEvent, listener, false);

          // Cancel the end timer.
          self._clearTimer(sound._id);
        }
      }

      return sound._id;
    },

    /**
     * Pause playback and save current position.
     * @param  {Number} id The sound ID (empty to pause all in group).
     * @return {Howl}
     */
    pause: function(id) {
      var self = this;

      // If the sound hasn't loaded, add it to the load queue to pause when capable.
      if (self._state !== 'loaded') {
        self._queue.push({
          event: 'pause',
          action: function() {
            self.pause(id);
          }
        });

        return self;
      }

      // If no id is passed, get all ID's to be paused.
      var ids = self._getSoundIds(id);

      for (var i=0; i<ids.length; i++) {
        // Clear the end timer.
        self._clearTimer(ids[i]);

        // Get the sound.
        var sound = self._soundById(ids[i]);

        if (sound && !sound._paused) {
          // Reset the seek position.
          sound._seek = self.seek(ids[i]);
          sound._rateSeek = 0;
          sound._paused = true;

          // Stop currently running fades.
          self._stopFade(ids[i]);

          if (sound._node) {
            if (self._webAudio) {
              // Make sure the sound has been created.
              if (!sound._node.bufferSource) {
                continue;
              }

              if (typeof sound._node.bufferSource.stop === 'undefined') {
                sound._node.bufferSource.noteOff(0);
              } else {
                sound._node.bufferSource.stop(0);
              }

              // Clean up the buffer source.
              self._cleanBuffer(sound._node);
            } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
              sound._node.pause();
            }
          }
        }

        // Fire the pause event, unless `true` is passed as the 2nd argument.
        if (!arguments[1]) {
          self._emit('pause', sound ? sound._id : null);
        }
      }

      return self;
    },

    /**
     * Stop playback and reset to start.
     * @param  {Number} id The sound ID (empty to stop all in group).
     * @param  {Boolean} internal Internal Use: true prevents event firing.
     * @return {Howl}
     */
    stop: function(id, internal) {
      var self = this;

      // If the sound hasn't loaded, add it to the load queue to stop when capable.
      if (self._state !== 'loaded') {
        self._queue.push({
          event: 'stop',
          action: function() {
            self.stop(id);
          }
        });

        return self;
      }

      // If no id is passed, get all ID's to be stopped.
      var ids = self._getSoundIds(id);

      for (var i=0; i<ids.length; i++) {
        // Clear the end timer.
        self._clearTimer(ids[i]);

        // Get the sound.
        var sound = self._soundById(ids[i]);

        if (sound) {
          // Reset the seek position.
          sound._seek = sound._start || 0;
          sound._rateSeek = 0;
          sound._paused = true;
          sound._ended = true;

          // Stop currently running fades.
          self._stopFade(ids[i]);

          if (sound._node) {
            if (self._webAudio) {
              // Make sure the sound's AudioBufferSourceNode has been created.
              if (sound._node.bufferSource) {
                if (typeof sound._node.bufferSource.stop === 'undefined') {
                  sound._node.bufferSource.noteOff(0);
                } else {
                  sound._node.bufferSource.stop(0);
                }

                // Clean up the buffer source.
                self._cleanBuffer(sound._node);
              }
            } else if (!isNaN(sound._node.duration) || sound._node.duration === Infinity) {
              sound._node.currentTime = sound._start || 0;
              sound._node.pause();
            }
          }

          if (!internal) {
            self._emit('stop', sound._id);
          }
        }
      }

      return self;
    },

    /**
     * Mute/unmute a single sound or all sounds in this Howl group.
     * @param  {Boolean} muted Set to true to mute and false to unmute.
     * @param  {Number} id    The sound ID to update (omit to mute/unmute all).
     * @return {Howl}
     */
    mute: function(muted, id) {
      var self = this;

      // If the sound hasn't loaded, add it to the load queue to mute when capable.
      if (self._state !== 'loaded') {
        self._queue.push({
          event: 'mute',
          action: function() {
            self.mute(muted, id);
          }
        });

        return self;
      }

      // If applying mute/unmute to all sounds, update the group's value.
      if (typeof id === 'undefined') {
        if (typeof muted === 'boolean') {
          self._muted = muted;
        } else {
          return self._muted;
        }
      }

      // If no id is passed, get all ID's to be muted.
      var ids = self._getSoundIds(id);

      for (var i=0; i<ids.length; i++) {
        // Get the sound.
        var sound = self._soundById(ids[i]);

        if (sound) {
          sound._muted = muted;

          if (self._webAudio && sound._node) {
            sound._node.gain.setValueAtTime(muted ? 0 : sound._volume, Howler.ctx.currentTime);
          } else if (sound._node) {
            sound._node.muted = Howler._muted ? true : muted;
          }

          self._emit('mute', sound._id);
        }
      }

      return self;
    },

    /**
     * Get/set the volume of this sound or of the Howl group. This method can optionally take 0, 1 or 2 arguments.
     *   volume() -> Returns the group's volume value.
     *   volume(id) -> Returns the sound id's current volume.
     *   volume(vol) -> Sets the volume of all sounds in this Howl group.
     *   volume(vol, id) -> Sets the volume of passed sound id.
     * @return {Howl/Number} Returns self or current volume.
     */
    volume: function() {
      var self = this;
      var args = arguments;
      var vol, id;

      // Determine the values based on arguments.
      if (args.length === 0) {
        // Return the value of the groups' volume.
        return self._volume;
      } else if (args.length === 1 || args.length === 2 && typeof args[1] === 'undefined') {
        // First check if this is an ID, and if not, assume it is a new volume.
        var ids = self._getSoundIds();
        var index = ids.indexOf(args[0]);
        if (index >= 0) {
          id = parseInt(args[0], 10);
        } else {
          vol = parseFloat(args[0]);
        }
      } else if (args.length >= 2) {
        vol = parseFloat(args[0]);
        id = parseInt(args[1], 10);
      }

      // Update the volume or return the current volume.
      var sound;
      if (typeof vol !== 'undefined' && vol >= 0 && vol <= 1) {
        // If the sound hasn't loaded, add it to the load queue to change volume when capable.
        if (self._state !== 'loaded') {
          self._queue.push({
            event: 'volume',
            action: function() {
              self.volume.apply(self, args);
            }
          });

          return self;
        }

        // Set the group volume.
        if (typeof id === 'undefined') {
          self._volume = vol;
        }

        // Update one or all volumes.
        id = self._getSoundIds(id);
        for (var i=0; i<id.length; i++) {
          // Get the sound.
          sound = self._soundById(id[i]);

          if (sound) {
            sound._volume = vol;

            // Stop currently running fades.
            if (!args[2]) {
              self._stopFade(id[i]);
            }

            if (self._webAudio && sound._node && !sound._muted) {
              sound._node.gain.setValueAtTime(vol, Howler.ctx.currentTime);
            } else if (sound._node && !sound._muted) {
              sound._node.volume = vol * Howler.volume();
            }

            self._emit('volume', sound._id);
          }
        }
      } else {
        sound = id ? self._soundById(id) : self._sounds[0];
        return sound ? sound._volume : 0;
      }

      return self;
    },

    /**
     * Fade a currently playing sound between two volumes (if no id is passsed, all sounds will fade).
     * @param  {Number} from The value to fade from (0.0 to 1.0).
     * @param  {Number} to   The volume to fade to (0.0 to 1.0).
     * @param  {Number} len  Time in milliseconds to fade.
     * @param  {Number} id   The sound id (omit to fade all sounds).
     * @return {Howl}
     */
    fade: function(from, to, len, id) {
      var self = this;
      var diff = Math.abs(from - to);
      var dir = from > to ? 'out' : 'in';
      var steps = diff / 0.01;
      var stepLen = (steps > 0) ? len / steps : len;

      // Since browsers clamp timeouts to 4ms, we need to clamp our steps to that too.
      if (stepLen < 4) {
        steps = Math.ceil(steps / (4 / stepLen));
        stepLen = 4;
      }

      // If the sound hasn't loaded, add it to the load queue to fade when capable.
      if (self._state !== 'loaded') {
        self._queue.push({
          event: 'fade',
          action: function() {
            self.fade(from, to, len, id);
          }
        });

        return self;
      }

      // Set the volume to the start position.
      self.volume(from, id);

      // Fade the volume of one or all sounds.
      var ids = self._getSoundIds(id);
      for (var i=0; i<ids.length; i++) {
        // Get the sound.
        var sound = self._soundById(ids[i]);

        // Create a linear fade or fall back to timeouts with HTML5 Audio.
        if (sound) {
          // Stop the previous fade if no sprite is being used (otherwise, volume handles this).
          if (!id) {
            self._stopFade(ids[i]);
          }

          // If we are using Web Audio, let the native methods do the actual fade.
          if (self._webAudio && !sound._muted) {
            var currentTime = Howler.ctx.currentTime;
            var end = currentTime + (len / 1000);
            sound._volume = from;
            sound._node.gain.setValueAtTime(from, currentTime);
            sound._node.gain.linearRampToValueAtTime(to, end);
          }

          var vol = from;
          sound._interval = setInterval(function(soundId, sound) {
            // Update the volume amount, but only if the volume should change.
            if (steps > 0) {
              vol += (dir === 'in' ? 0.01 : -0.01);
            }

            // Make sure the volume is in the right bounds.
            vol = Math.max(0, vol);
            vol = Math.min(1, vol);

            // Round to within 2 decimal points.
            vol = Math.round(vol * 100) / 100;

            // Change the volume.
            if (self._webAudio) {
              if (typeof id === 'undefined') {
                self._volume = vol;
              }

              sound._volume = vol;
            } else {
              self.volume(vol, soundId, true);
            }

            // When the fade is complete, stop it and fire event.
            if ((to < from && vol <= to) || (to > from && vol >= to)) {
              clearInterval(sound._interval);
              sound._interval = null;
              self.volume(to, soundId);
              self._emit('fade', soundId);
            }
          }.bind(self, ids[i], sound), stepLen);
        }
      }

      return self;
    },

    /**
     * Internal method that stops the currently playing fade when
     * a new fade starts, volume is changed or the sound is stopped.
     * @param  {Number} id The sound id.
     * @return {Howl}
     */
    _stopFade: function(id) {
      var self = this;
      var sound = self._soundById(id);

      if (sound && sound._interval) {
        if (self._webAudio) {
          sound._node.gain.cancelScheduledValues(Howler.ctx.currentTime);
        }

        clearInterval(sound._interval);
        sound._interval = null;
        self._emit('fade', id);
      }

      return self;
    },

    /**
     * Get/set the loop parameter on a sound. This method can optionally take 0, 1 or 2 arguments.
     *   loop() -> Returns the group's loop value.
     *   loop(id) -> Returns the sound id's loop value.
     *   loop(loop) -> Sets the loop value for all sounds in this Howl group.
     *   loop(loop, id) -> Sets the loop value of passed sound id.
     * @return {Howl/Boolean} Returns self or current loop value.
     */
    loop: function() {
      var self = this;
      var args = arguments;
      var loop, id, sound;

      // Determine the values for loop and id.
      if (args.length === 0) {
        // Return the grou's loop value.
        return self._loop;
      } else if (args.length === 1) {
        if (typeof args[0] === 'boolean') {
          loop = args[0];
          self._loop = loop;
        } else {
          // Return this sound's loop value.
          sound = self._soundById(parseInt(args[0], 10));
          return sound ? sound._loop : false;
        }
      } else if (args.length === 2) {
        loop = args[0];
        id = parseInt(args[1], 10);
      }

      // If no id is passed, get all ID's to be looped.
      var ids = self._getSoundIds(id);
      for (var i=0; i<ids.length; i++) {
        sound = self._soundById(ids[i]);

        if (sound) {
          sound._loop = loop;
          if (self._webAudio && sound._node && sound._node.bufferSource) {
            sound._node.bufferSource.loop = loop;
            if (loop) {
              sound._node.bufferSource.loopStart = sound._start || 0;
              sound._node.bufferSource.loopEnd = sound._stop;
            }
          }
        }
      }

      return self;
    },

    /**
     * Get/set the playback rate of a sound. This method can optionally take 0, 1 or 2 arguments.
     *   rate() -> Returns the first sound node's current playback rate.
     *   rate(id) -> Returns the sound id's current playback rate.
     *   rate(rate) -> Sets the playback rate of all sounds in this Howl group.
     *   rate(rate, id) -> Sets the playback rate of passed sound id.
     * @return {Howl/Number} Returns self or the current playback rate.
     */
    rate: function() {
      var self = this;
      var args = arguments;
      var rate, id;

      // Determine the values based on arguments.
      if (args.length === 0) {
        // We will simply return the current rate of the first node.
        id = self._sounds[0]._id;
      } else if (args.length === 1) {
        // First check if this is an ID, and if not, assume it is a new rate value.
        var ids = self._getSoundIds();
        var index = ids.indexOf(args[0]);
        if (index >= 0) {
          id = parseInt(args[0], 10);
        } else {
          rate = parseFloat(args[0]);
        }
      } else if (args.length === 2) {
        rate = parseFloat(args[0]);
        id = parseInt(args[1], 10);
      }

      // Update the playback rate or return the current value.
      var sound;
      if (typeof rate === 'number') {
        // If the sound hasn't loaded, add it to the load queue to change playback rate when capable.
        if (self._state !== 'loaded') {
          self._queue.push({
            event: 'rate',
            action: function() {
              self.rate.apply(self, args);
            }
          });

          return self;
        }

        // Set the group rate.
        if (typeof id === 'undefined') {
          self._rate = rate;
        }

        // Update one or all volumes.
        id = self._getSoundIds(id);
        for (var i=0; i<id.length; i++) {
          // Get the sound.
          sound = self._soundById(id[i]);

          if (sound) {
            // Keep track of our position when the rate changed and update the playback
            // start position so we can properly adjust the seek position for time elapsed.
            sound._rateSeek = self.seek(id[i]);
            sound._playStart = self._webAudio ? Howler.ctx.currentTime : sound._playStart;
            sound._rate = rate;

            // Change the playback rate.
            if (self._webAudio && sound._node && sound._node.bufferSource) {
              sound._node.bufferSource.playbackRate.value = rate;
            } else if (sound._node) {
              sound._node.playbackRate = rate;
            }

            // Reset the timers.
            var seek = self.seek(id[i]);
            var duration = ((self._sprite[sound._sprite][0] + self._sprite[sound._sprite][1]) / 1000) - seek;
            var timeout = (duration * 1000) / Math.abs(sound._rate);

            // Start a new end timer if sound is already playing.
            if (self._endTimers[id[i]] || !sound._paused) {
              self._clearTimer(id[i]);
              self._endTimers[id[i]] = setTimeout(self._ended.bind(self, sound), timeout);
            }

            self._emit('rate', sound._id);
          }
        }
      } else {
        sound = self._soundById(id);
        return sound ? sound._rate : self._rate;
      }

      return self;
    },

    /**
     * Get/set the seek position of a sound. This method can optionally take 0, 1 or 2 arguments.
     *   seek() -> Returns the first sound node's current seek position.
     *   seek(id) -> Returns the sound id's current seek position.
     *   seek(seek) -> Sets the seek position of the first sound node.
     *   seek(seek, id) -> Sets the seek position of passed sound id.
     * @return {Howl/Number} Returns self or the current seek position.
     */
    seek: function() {
      var self = this;
      var args = arguments;
      var seek, id;

      // Determine the values based on arguments.
      if (args.length === 0) {
        // We will simply return the current position of the first node.
        id = self._sounds[0]._id;
      } else if (args.length === 1) {
        // First check if this is an ID, and if not, assume it is a new seek position.
        var ids = self._getSoundIds();
        var index = ids.indexOf(args[0]);
        if (index >= 0) {
          id = parseInt(args[0], 10);
        } else {
          id = self._sounds[0]._id;
          seek = parseFloat(args[0]);
        }
      } else if (args.length === 2) {
        seek = parseFloat(args[0]);
        id = parseInt(args[1], 10);
      }

      // If there is no ID, bail out.
      if (typeof id === 'undefined') {
        return self;
      }

      // If the sound hasn't loaded, add it to the load queue to seek when capable.
      if (self._state !== 'loaded') {
        self._queue.push({
          event: 'seek',
          action: function() {
            self.seek.apply(self, args);
          }
        });

        return self;
      }

      // Get the sound.
      var sound = self._soundById(id);

      if (sound) {
        if (typeof seek === 'number' && seek >= 0) {
          // Pause the sound and update position for restarting playback.
          var playing = self.playing(id);
          if (playing) {
            self.pause(id, true);
          }

          // Move the position of the track and cancel timer.
          sound._seek = seek;
          sound._ended = false;
          self._clearTimer(id);

          // Restart the playback if the sound was playing.
          if (playing) {
            self.play(id, true);
          }

          // Update the seek position for HTML5 Audio.
          if (!self._webAudio && sound._node) {
            sound._node.currentTime = seek;
          }

          self._emit('seek', id);
        } else {
          if (self._webAudio) {
            var realTime = self.playing(id) ? Howler.ctx.currentTime - sound._playStart : 0;
            var rateSeek = sound._rateSeek ? sound._rateSeek - sound._seek : 0;
            return sound._seek + (rateSeek + realTime * Math.abs(sound._rate));
          } else {
            return sound._node.currentTime;
          }
        }
      }

      return self;
    },

    /**
     * Check if a specific sound is currently playing or not (if id is provided), or check if at least one of the sounds in the group is playing or not.
     * @param  {Number}  id The sound id to check. If none is passed, the whole sound group is checked.
     * @return {Boolean} True if playing and false if not.
     */
    playing: function(id) {
      var self = this;

      // Check the passed sound ID (if any).
      if (typeof id === 'number') {
        var sound = self._soundById(id);
        return sound ? !sound._paused : false;
      }

      // Otherwise, loop through all sounds and check if any are playing.
      for (var i=0; i<self._sounds.length; i++) {
        if (!self._sounds[i]._paused) {
          return true;
        }
      }

      return false;
    },

    /**
     * Get the duration of this sound. Passing a sound id will return the sprite duration.
     * @param  {Number} id The sound id to check. If none is passed, return full source duration.
     * @return {Number} Audio duration in seconds.
     */
    duration: function(id) {
      var self = this;
      var duration = self._duration;

      // If we pass an ID, get the sound and return the sprite length.
      var sound = self._soundById(id);
      if (sound) {
        duration = self._sprite[sound._sprite][1] / 1000;
      }

      return duration;
    },

    /**
     * Returns the current loaded state of this Howl.
     * @return {String} 'unloaded', 'loading', 'loaded'
     */
    state: function() {
      return this._state;
    },

    /**
     * Unload and destroy the current Howl object.
     * This will immediately stop all sound instances attached to this group.
     */
    unload: function() {
      var self = this;

      // Stop playing any active sounds.
      var sounds = self._sounds;
      for (var i=0; i<sounds.length; i++) {
        // Stop the sound if it is currently playing.
        if (!sounds[i]._paused) {
          self.stop(sounds[i]._id);
        }

        // Remove the source or disconnect.
        if (!self._webAudio) {
          // Set the source to 0-second silence to stop any downloading (except in IE).
          var checkIE = /MSIE |Trident\//.test(Howler._navigator && Howler._navigator.userAgent);
          if (!checkIE) {
            sounds[i]._node.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
          }

          // Remove any event listeners.
          sounds[i]._node.removeEventListener('error', sounds[i]._errorFn, false);
          sounds[i]._node.removeEventListener(Howler._canPlayEvent, sounds[i]._loadFn, false);
        }

        // Empty out all of the nodes.
        delete sounds[i]._node;

        // Make sure all timers are cleared out.
        self._clearTimer(sounds[i]._id);

        // Remove the references in the global Howler object.
        var index = Howler._howls.indexOf(self);
        if (index >= 0) {
          Howler._howls.splice(index, 1);
        }
      }

      // Delete this sound from the cache (if no other Howl is using it).
      var remCache = true;
      for (i=0; i<Howler._howls.length; i++) {
        if (Howler._howls[i]._src === self._src) {
          remCache = false;
          break;
        }
      }

      if (cache && remCache) {
        delete cache[self._src];
      }

      // Clear global errors.
      Howler.noAudio = false;

      // Clear out `self`.
      self._state = 'unloaded';
      self._sounds = [];
      self = null;

      return null;
    },

    /**
     * Listen to a custom event.
     * @param  {String}   event Event name.
     * @param  {Function} fn    Listener to call.
     * @param  {Number}   id    (optional) Only listen to events for this sound.
     * @param  {Number}   once  (INTERNAL) Marks event to fire only once.
     * @return {Howl}
     */
    on: function(event, fn, id, once) {
      var self = this;
      var events = self['_on' + event];

      if (typeof fn === 'function') {
        events.push(once ? {id: id, fn: fn, once: once} : {id: id, fn: fn});
      }

      return self;
    },

    /**
     * Remove a custom event. Call without parameters to remove all events.
     * @param  {String}   event Event name.
     * @param  {Function} fn    Listener to remove. Leave empty to remove all.
     * @param  {Number}   id    (optional) Only remove events for this sound.
     * @return {Howl}
     */
    off: function(event, fn, id) {
      var self = this;
      var events = self['_on' + event];
      var i = 0;

      // Allow passing just an event and ID.
      if (typeof fn === 'number') {
        id = fn;
        fn = null;
      }

      if (fn || id) {
        // Loop through event store and remove the passed function.
        for (i=0; i<events.length; i++) {
          var isId = (id === events[i].id);
          if (fn === events[i].fn && isId || !fn && isId) {
            events.splice(i, 1);
            break;
          }
        }
      } else if (event) {
        // Clear out all events of this type.
        self['_on' + event] = [];
      } else {
        // Clear out all events of every type.
        var keys = Object.keys(self);
        for (i=0; i<keys.length; i++) {
          if ((keys[i].indexOf('_on') === 0) && Array.isArray(self[keys[i]])) {
            self[keys[i]] = [];
          }
        }
      }

      return self;
    },

    /**
     * Listen to a custom event and remove it once fired.
     * @param  {String}   event Event name.
     * @param  {Function} fn    Listener to call.
     * @param  {Number}   id    (optional) Only listen to events for this sound.
     * @return {Howl}
     */
    once: function(event, fn, id) {
      var self = this;

      // Setup the event listener.
      self.on(event, fn, id, 1);

      return self;
    },

    /**
     * Emit all events of a specific type and pass the sound id.
     * @param  {String} event Event name.
     * @param  {Number} id    Sound ID.
     * @param  {Number} msg   Message to go with event.
     * @return {Howl}
     */
    _emit: function(event, id, msg) {
      var self = this;
      var events = self['_on' + event];

      // Loop through event store and fire all functions.
      for (var i=events.length-1; i>=0; i--) {
        if (!events[i].id || events[i].id === id || event === 'load') {
          setTimeout(function(fn) {
            fn.call(this, id, msg);
          }.bind(self, events[i].fn), 0);

          // If this event was setup with `once`, remove it.
          if (events[i].once) {
            self.off(event, events[i].fn, events[i].id);
          }
        }
      }

      return self;
    },

    /**
     * Queue of actions initiated before the sound has loaded.
     * These will be called in sequence, with the next only firing
     * after the previous has finished executing (even if async like play).
     * @return {Howl}
     */
    _loadQueue: function() {
      var self = this;

      if (self._queue.length > 0) {
        var task = self._queue[0];

        // don't move onto the next task until this one is done
        self.once(task.event, function() {
          self._queue.shift();
          self._loadQueue();
        });

        task.action();
      }

      return self;
    },

    /**
     * Fired when playback ends at the end of the duration.
     * @param  {Sound} sound The sound object to work with.
     * @return {Howl}
     */
    _ended: function(sound) {
      var self = this;
      var sprite = sound._sprite;

      // If we are using IE and there was network latency we may be clipping
      // audio before it completes playing. Lets check the node to make sure it
      // believes it has completed, before ending the playback.
      if (!self._webAudio && self._node && !self._node.ended) {
        setTimeout(self._ended.bind(self, sound), 100);
        return self;
      }

      // Should this sound loop?
      var loop = !!(sound._loop || self._sprite[sprite][2]);

      // Fire the ended event.
      self._emit('end', sound._id);

      // Restart the playback for HTML5 Audio loop.
      if (!self._webAudio && loop) {
        self.stop(sound._id, true).play(sound._id);
      }

      // Restart this timer if on a Web Audio loop.
      if (self._webAudio && loop) {
        self._emit('play', sound._id);
        sound._seek = sound._start || 0;
        sound._rateSeek = 0;
        sound._playStart = Howler.ctx.currentTime;

        var timeout = ((sound._stop - sound._start) * 1000) / Math.abs(sound._rate);
        self._endTimers[sound._id] = setTimeout(self._ended.bind(self, sound), timeout);
      }

      // Mark the node as paused.
      if (self._webAudio && !loop) {
        sound._paused = true;
        sound._ended = true;
        sound._seek = sound._start || 0;
        sound._rateSeek = 0;
        self._clearTimer(sound._id);

        // Clean up the buffer source.
        self._cleanBuffer(sound._node);

        // Attempt to auto-suspend AudioContext if no sounds are still playing.
        Howler._autoSuspend();
      }

      // When using a sprite, end the track.
      if (!self._webAudio && !loop) {
        self.stop(sound._id);
      }

      return self;
    },

    /**
     * Clear the end timer for a sound playback.
     * @param  {Number} id The sound ID.
     * @return {Howl}
     */
    _clearTimer: function(id) {
      var self = this;

      if (self._endTimers[id]) {
        clearTimeout(self._endTimers[id]);
        delete self._endTimers[id];
      }

      return self;
    },

    /**
     * Return the sound identified by this ID, or return null.
     * @param  {Number} id Sound ID
     * @return {Object}    Sound object or null.
     */
    _soundById: function(id) {
      var self = this;

      // Loop through all sounds and find the one with this ID.
      for (var i=0; i<self._sounds.length; i++) {
        if (id === self._sounds[i]._id) {
          return self._sounds[i];
        }
      }

      return null;
    },

    /**
     * Return an inactive sound from the pool or create a new one.
     * @return {Sound} Sound playback object.
     */
    _inactiveSound: function() {
      var self = this;

      self._drain();

      // Find the first inactive node to recycle.
      for (var i=0; i<self._sounds.length; i++) {
        if (self._sounds[i]._ended) {
          return self._sounds[i].reset();
        }
      }

      // If no inactive node was found, create a new one.
      return new Sound(self);
    },

    /**
     * Drain excess inactive sounds from the pool.
     */
    _drain: function() {
      var self = this;
      var limit = self._pool;
      var cnt = 0;
      var i = 0;

      // If there are less sounds than the max pool size, we are done.
      if (self._sounds.length < limit) {
        return;
      }

      // Count the number of inactive sounds.
      for (i=0; i<self._sounds.length; i++) {
        if (self._sounds[i]._ended) {
          cnt++;
        }
      }

      // Remove excess inactive sounds, going in reverse order.
      for (i=self._sounds.length - 1; i>=0; i--) {
        if (cnt <= limit) {
          return;
        }

        if (self._sounds[i]._ended) {
          // Disconnect the audio source when using Web Audio.
          if (self._webAudio && self._sounds[i]._node) {
            self._sounds[i]._node.disconnect(0);
          }

          // Remove sounds until we have the pool size.
          self._sounds.splice(i, 1);
          cnt--;
        }
      }
    },

    /**
     * Get all ID's from the sounds pool.
     * @param  {Number} id Only return one ID if one is passed.
     * @return {Array}    Array of IDs.
     */
    _getSoundIds: function(id) {
      var self = this;

      if (typeof id === 'undefined') {
        var ids = [];
        for (var i=0; i<self._sounds.length; i++) {
          ids.push(self._sounds[i]._id);
        }

        return ids;
      } else {
        return [id];
      }
    },

    /**
     * Load the sound back into the buffer source.
     * @param  {Sound} sound The sound object to work with.
     * @return {Howl}
     */
    _refreshBuffer: function(sound) {
      var self = this;

      // Setup the buffer source for playback.
      sound._node.bufferSource = Howler.ctx.createBufferSource();
      sound._node.bufferSource.buffer = cache[self._src];

      // Connect to the correct node.
      if (sound._panner) {
        sound._node.bufferSource.connect(sound._panner);
      } else {
        sound._node.bufferSource.connect(sound._node);
      }

      // Setup looping and playback rate.
      sound._node.bufferSource.loop = sound._loop;
      if (sound._loop) {
        sound._node.bufferSource.loopStart = sound._start || 0;
        sound._node.bufferSource.loopEnd = sound._stop;
      }
      sound._node.bufferSource.playbackRate.value = sound._rate;

      return self;
    },

    /**
     * Prevent memory leaks by cleaning up the buffer source after playback.
     * @param  {Object} node Sound's audio node containing the buffer source.
     * @return {Howl}
     */
    _cleanBuffer: function(node) {
      var self = this;

      if (self._scratchBuffer) {
        node.bufferSource.onended = null;
        node.bufferSource.disconnect(0);
        try { node.bufferSource.buffer = self._scratchBuffer; } catch(e) {}
      }
      node.bufferSource = null;

      return self;
    }
  };

  /** Single Sound Methods **/
  /***************************************************************************/

  /**
   * Setup the sound object, which each node attached to a Howl group is contained in.
   * @param {Object} howl The Howl parent group.
   */
  var Sound = function(howl) {
    this._parent = howl;
    this.init();
  };
  Sound.prototype = {
    /**
     * Initialize a new Sound object.
     * @return {Sound}
     */
    init: function() {
      var self = this;
      var parent = self._parent;

      // Setup the default parameters.
      self._muted = parent._muted;
      self._loop = parent._loop;
      self._volume = parent._volume;
      self._rate = parent._rate;
      self._seek = 0;
      self._paused = true;
      self._ended = true;
      self._sprite = '__default';

      // Generate a unique ID for this sound.
      self._id = ++Howler._counter;

      // Add itself to the parent's pool.
      parent._sounds.push(self);

      // Create the new node.
      self.create();

      return self;
    },

    /**
     * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
     * @return {Sound}
     */
    create: function() {
      var self = this;
      var parent = self._parent;
      var volume = (Howler._muted || self._muted || self._parent._muted) ? 0 : self._volume;

      if (parent._webAudio) {
        // Create the gain node for controlling volume (the source will connect to this).
        self._node = (typeof Howler.ctx.createGain === 'undefined') ? Howler.ctx.createGainNode() : Howler.ctx.createGain();
        self._node.gain.setValueAtTime(volume, Howler.ctx.currentTime);
        self._node.paused = true;
        self._node.connect(Howler.masterGain);
      } else {
        self._node = new Audio();

        // Listen for errors (http://dev.w3.org/html5/spec-author-view/spec.html#mediaerror).
        self._errorFn = self._errorListener.bind(self);
        self._node.addEventListener('error', self._errorFn, false);

        // Listen for 'canplaythrough' event to let us know the sound is ready.
        self._loadFn = self._loadListener.bind(self);
        self._node.addEventListener(Howler._canPlayEvent, self._loadFn, false);

        // Setup the new audio node.
        self._node.src = parent._src;
        self._node.preload = 'auto';
        self._node.volume = volume * Howler.volume();

        // Begin loading the source.
        self._node.load();
      }

      return self;
    },

    /**
     * Reset the parameters of this sound to the original state (for recycle).
     * @return {Sound}
     */
    reset: function() {
      var self = this;
      var parent = self._parent;

      // Reset all of the parameters of this sound.
      self._muted = parent._muted;
      self._loop = parent._loop;
      self._volume = parent._volume;
      self._rate = parent._rate;
      self._seek = 0;
      self._rateSeek = 0;
      self._paused = true;
      self._ended = true;
      self._sprite = '__default';

      // Generate a new ID so that it isn't confused with the previous sound.
      self._id = ++Howler._counter;

      return self;
    },

    /**
     * HTML5 Audio error listener callback.
     */
    _errorListener: function() {
      var self = this;

      // Fire an error event and pass back the code.
      self._parent._emit('loaderror', self._id, self._node.error ? self._node.error.code : 0);

      // Clear the event listener.
      self._node.removeEventListener('error', self._errorFn, false);
    },

    /**
     * HTML5 Audio canplaythrough listener callback.
     */
    _loadListener: function() {
      var self = this;
      var parent = self._parent;

      // Round up the duration to account for the lower precision in HTML5 Audio.
      parent._duration = Math.ceil(self._node.duration * 10) / 10;

      // Setup a sprite if none is defined.
      if (Object.keys(parent._sprite).length === 0) {
        parent._sprite = {__default: [0, parent._duration * 1000]};
      }

      if (parent._state !== 'loaded') {
        parent._state = 'loaded';
        parent._emit('load');
        parent._loadQueue();
      }

      // Clear the event listener.
      self._node.removeEventListener(Howler._canPlayEvent, self._loadFn, false);
    }
  };

  /** Helper Methods **/
  /***************************************************************************/

  var cache = {};

  /**
   * Buffer a sound from URL, Data URI or cache and decode to audio source (Web Audio API).
   * @param  {Howl} self
   */
  var loadBuffer = function(self) {
    var url = self._src;

    // Check if the buffer has already been cached and use it instead.
    if (cache[url]) {
      // Set the duration from the cache.
      self._duration = cache[url].duration;

      // Load the sound into this Howl.
      loadSound(self);

      return;
    }

    if (/^data:[^;]+;base64,/.test(url)) {
      // Decode the base64 data URI without XHR, since some browsers don't support it.
      var data = atob(url.split(',')[1]);
      var dataView = new Uint8Array(data.length);
      for (var i=0; i<data.length; ++i) {
        dataView[i] = data.charCodeAt(i);
      }

      decodeAudioData(dataView.buffer, self);
    } else {
      // Load the buffer from the URL.
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function() {
        // Make sure we get a successful response back.
        var code = (xhr.status + '')[0];
        if (code !== '0' && code !== '2' && code !== '3') {
          self._emit('loaderror', null, 'Failed loading audio file with status: ' + xhr.status + '.');
          return;
        }

        decodeAudioData(xhr.response, self);
      };
      xhr.onerror = function() {
        // If there is an error, switch to HTML5 Audio.
        if (self._webAudio) {
          self._html5 = true;
          self._webAudio = false;
          self._sounds = [];
          delete cache[url];
          self.load();
        }
      };
      safeXhrSend(xhr);
    }
  };

  /**
   * Send the XHR request wrapped in a try/catch.
   * @param  {Object} xhr XHR to send.
   */
  var safeXhrSend = function(xhr) {
    try {
      xhr.send();
    } catch (e) {
      xhr.onerror();
    }
  };

  /**
   * Decode audio data from an array buffer.
   * @param  {ArrayBuffer} arraybuffer The audio data.
   * @param  {Howl}        self
   */
  var decodeAudioData = function(arraybuffer, self) {
    // Decode the buffer into an audio source.
    Howler.ctx.decodeAudioData(arraybuffer, function(buffer) {
      if (buffer && self._sounds.length > 0) {
        cache[self._src] = buffer;
        loadSound(self, buffer);
      }
    }, function() {
      self._emit('loaderror', null, 'Decoding audio data failed.');
    });
  };

  /**
   * Sound is now loaded, so finish setting everything up and fire the loaded event.
   * @param  {Howl} self
   * @param  {Object} buffer The decoded buffer sound source.
   */
  var loadSound = function(self, buffer) {
    // Set the duration.
    if (buffer && !self._duration) {
      self._duration = buffer.duration;
    }

    // Setup a sprite if none is defined.
    if (Object.keys(self._sprite).length === 0) {
      self._sprite = {__default: [0, self._duration * 1000]};
    }

    // Fire the loaded event.
    if (self._state !== 'loaded') {
      self._state = 'loaded';
      self._emit('load');
      self._loadQueue();
    }
  };

  /**
   * Setup the audio context when available, or switch to HTML5 Audio mode.
   */
  var setupAudioContext = function() {
    // Check if we are using Web Audio and setup the AudioContext if we are.
    try {
      if (typeof AudioContext !== 'undefined') {
        Howler.ctx = new AudioContext();
      } else if (typeof webkitAudioContext !== 'undefined') {
        Howler.ctx = new webkitAudioContext();
      } else {
        Howler.usingWebAudio = false;
      }
    } catch(e) {
      Howler.usingWebAudio = false;
    }

    // Check if a webview is being used on iOS8 or earlier (rather than the browser).
    // If it is, disable Web Audio as it causes crashing.
    var iOS = (/iP(hone|od|ad)/.test(Howler._navigator && Howler._navigator.platform));
    var appVersion = Howler._navigator && Howler._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    var version = appVersion ? parseInt(appVersion[1], 10) : null;
    if (iOS && version && version < 9) {
      var safari = /safari/.test(Howler._navigator && Howler._navigator.userAgent.toLowerCase());
      if (Howler._navigator && Howler._navigator.standalone && !safari || Howler._navigator && !Howler._navigator.standalone && !safari) {
        Howler.usingWebAudio = false;
      }
    }

    // Create and expose the master GainNode when using Web Audio (useful for plugins or advanced usage).
    if (Howler.usingWebAudio) {
      Howler.masterGain = (typeof Howler.ctx.createGain === 'undefined') ? Howler.ctx.createGainNode() : Howler.ctx.createGain();
      Howler.masterGain.gain.value = Howler._muted ? 0 : 1;
      Howler.masterGain.connect(Howler.ctx.destination);
    }

    // Re-run the setup on Howler.
    Howler._setup();
  };

  // Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return {
        Howler: Howler,
        Howl: Howl
      };
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }

  // Add support for CommonJS libraries such as browserify.
  if (true) {
    exports.Howler = Howler;
    exports.Howl = Howl;
  }

  // Define globally in case AMD is not available or unused.
  if (typeof window !== 'undefined') {
    window.HowlerGlobal = HowlerGlobal;
    window.Howler = Howler;
    window.Howl = Howl;
    window.Sound = Sound;
  } else if (typeof global !== 'undefined') { // Add to global in Node.js (for testing, etc).
    global.HowlerGlobal = HowlerGlobal;
    global.Howler = Howler;
    global.Howl = Howl;
    global.Sound = Sound;
  }
})();


/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.0.4
 *  howlerjs.com
 *
 *  (c) 2013-2017, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

(function() {

  'use strict';

  // Setup default properties.
  HowlerGlobal.prototype._pos = [0, 0, 0];
  HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];
  
  /** Global Methods **/
  /***************************************************************************/

  /**
   * Helper method to update the stereo panning position of all current Howls.
   * Future Howls will not use this value unless explicitly set.
   * @param  {Number} pan A value of -1.0 is all the way left and 1.0 is all the way right.
   * @return {Howler/Number}     Self or current stereo panning value.
   */
  HowlerGlobal.prototype.stereo = function(pan) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self.ctx || !self.ctx.listener) {
      return self;
    }

    // Loop through all Howls and update their stereo panning.
    for (var i=self._howls.length-1; i>=0; i--) {
      self._howls[i].stereo(pan);
    }

    return self;
  };

  /**
   * Get/set the position of the listener in 3D cartesian space. Sounds using
   * 3D position will be relative to the listener's position.
   * @param  {Number} x The x-position of the listener.
   * @param  {Number} y The y-position of the listener.
   * @param  {Number} z The z-position of the listener.
   * @return {Howler/Array}   Self or current listener position.
   */
  HowlerGlobal.prototype.pos = function(x, y, z) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self.ctx || !self.ctx.listener) {
      return self;
    }

    // Set the defaults for optional 'y' & 'z'.
    y = (typeof y !== 'number') ? self._pos[1] : y;
    z = (typeof z !== 'number') ? self._pos[2] : z;

    if (typeof x === 'number') {
      self._pos = [x, y, z];
      self.ctx.listener.setPosition(self._pos[0], self._pos[1], self._pos[2]);
    } else {
      return self._pos;
    }

    return self;
  };

  /**
   * Get/set the direction the listener is pointing in the 3D cartesian space.
   * A front and up vector must be provided. The front is the direction the
   * face of the listener is pointing, and up is the direction the top of the
   * listener is pointing. Thus, these values are expected to be at right angles
   * from each other.
   * @param  {Number} x   The x-orientation of the listener.
   * @param  {Number} y   The y-orientation of the listener.
   * @param  {Number} z   The z-orientation of the listener.
   * @param  {Number} xUp The x-orientation of the top of the listener.
   * @param  {Number} yUp The y-orientation of the top of the listener.
   * @param  {Number} zUp The z-orientation of the top of the listener.
   * @return {Howler/Array}     Returns self or the current orientation vectors.
   */
  HowlerGlobal.prototype.orientation = function(x, y, z, xUp, yUp, zUp) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self.ctx || !self.ctx.listener) {
      return self;
    }

    // Set the defaults for optional 'y' & 'z'.
    var or = self._orientation;
    y = (typeof y !== 'number') ? or[1] : y;
    z = (typeof z !== 'number') ? or[2] : z;
    xUp = (typeof xUp !== 'number') ? or[3] : xUp;
    yUp = (typeof yUp !== 'number') ? or[4] : yUp;
    zUp = (typeof zUp !== 'number') ? or[5] : zUp;

    if (typeof x === 'number') {
      self._orientation = [x, y, z, xUp, yUp, zUp];
      self.ctx.listener.setOrientation(x, y, z, xUp, yUp, zUp);
    } else {
      return or;
    }

    return self;
  };

  /** Group Methods **/
  /***************************************************************************/

  /**
   * Add new properties to the core init.
   * @param  {Function} _super Core init method.
   * @return {Howl}
   */
  Howl.prototype.init = (function(_super) {
    return function(o) {
      var self = this;

      // Setup user-defined default properties.
      self._orientation = o.orientation || [1, 0, 0];
      self._stereo = o.stereo || null;
      self._pos = o.pos || null;
      self._pannerAttr = {
        coneInnerAngle: typeof o.coneInnerAngle !== 'undefined' ? o.coneInnerAngle : 360,
        coneOuterAngle: typeof o.coneOuterAngle !== 'undefined' ? o.coneOuterAngle : 360,
        coneOuterGain: typeof o.coneOuterGain !== 'undefined' ? o.coneOuterGain : 0,
        distanceModel: typeof o.distanceModel !== 'undefined' ? o.distanceModel : 'inverse',
        maxDistance: typeof o.maxDistance !== 'undefined' ? o.maxDistance : 10000,
        panningModel: typeof o.panningModel !== 'undefined' ? o.panningModel : 'HRTF',
        refDistance: typeof o.refDistance !== 'undefined' ? o.refDistance : 1,
        rolloffFactor: typeof o.rolloffFactor !== 'undefined' ? o.rolloffFactor : 1
      };

      // Setup event listeners.
      self._onstereo = o.onstereo ? [{fn: o.onstereo}] : [];
      self._onpos = o.onpos ? [{fn: o.onpos}] : [];
      self._onorientation = o.onorientation ? [{fn: o.onorientation}] : [];

      // Complete initilization with howler.js core's init function.
      return _super.call(this, o);
    };
  })(Howl.prototype.init);

  /**
   * Get/set the stereo panning of the audio source for this sound or all in the group.
   * @param  {Number} pan  A value of -1.0 is all the way left and 1.0 is all the way right.
   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
   * @return {Howl/Number}    Returns self or the current stereo panning value.
   */
  Howl.prototype.stereo = function(pan, id) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self._webAudio) {
      return self;
    }

    // If the sound hasn't loaded, add it to the load queue to change stereo pan when capable.
    if (self._state !== 'loaded') {
      self._queue.push({
        event: 'stereo',
        action: function() {
          self.stereo(pan, id);
        }
      });

      return self;
    }

    // Check for PannerStereoNode support and fallback to PannerNode if it doesn't exist.
    var pannerType = (typeof Howler.ctx.createStereoPanner === 'undefined') ? 'spatial' : 'stereo';

    // Setup the group's stereo panning if no ID is passed.
    if (typeof id === 'undefined') {
      // Return the group's stereo panning if no parameters are passed.
      if (typeof pan === 'number') {
        self._stereo = pan;
        self._pos = [pan, 0, 0];
      } else {
        return self._stereo;
      }
    }

    // Change the streo panning of one or all sounds in group.
    var ids = self._getSoundIds(id);
    for (var i=0; i<ids.length; i++) {
      // Get the sound.
      var sound = self._soundById(ids[i]);

      if (sound) {
        if (typeof pan === 'number') {
          sound._stereo = pan;
          sound._pos = [pan, 0, 0];

          if (sound._node) {
            // If we are falling back, make sure the panningModel is equalpower.
            sound._pannerAttr.panningModel = 'equalpower';

            // Check if there is a panner setup and create a new one if not.
            if (!sound._panner || !sound._panner.pan) {
              setupPanner(sound, pannerType);
            }

            if (pannerType === 'spatial') {
              sound._panner.setPosition(pan, 0, 0);
            } else {
              sound._panner.pan.value = pan;
            }
          }

          self._emit('stereo', sound._id);
        } else {
          return sound._stereo;
        }
      }
    }

    return self;
  };

  /**
   * Get/set the 3D spatial position of the audio source for this sound or
   * all in the group. The most common usage is to set the 'x' position for
   * left/right panning. Setting any value higher than 1.0 will begin to
   * decrease the volume of the sound as it moves further away.
   * @param  {Number} x  The x-position of the audio from -1000.0 to 1000.0.
   * @param  {Number} y  The y-position of the audio from -1000.0 to 1000.0.
   * @param  {Number} z  The z-position of the audio from -1000.0 to 1000.0.
   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
   * @return {Howl/Array}    Returns self or the current 3D spatial position: [x, y, z].
   */
  Howl.prototype.pos = function(x, y, z, id) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self._webAudio) {
      return self;
    }

    // If the sound hasn't loaded, add it to the load queue to change position when capable.
    if (self._state !== 'loaded') {
      self._queue.push({
        event: 'pos',
        action: function() {
          self.pos(x, y, z, id);
        }
      });

      return self;
    }

    // Set the defaults for optional 'y' & 'z'.
    y = (typeof y !== 'number') ? 0 : y;
    z = (typeof z !== 'number') ? -0.5 : z;

    // Setup the group's spatial position if no ID is passed.
    if (typeof id === 'undefined') {
      // Return the group's spatial position if no parameters are passed.
      if (typeof x === 'number') {
        self._pos = [x, y, z];
      } else {
        return self._pos;
      }
    }

    // Change the spatial position of one or all sounds in group.
    var ids = self._getSoundIds(id);
    for (var i=0; i<ids.length; i++) {
      // Get the sound.
      var sound = self._soundById(ids[i]);

      if (sound) {
        if (typeof x === 'number') {
          sound._pos = [x, y, z];

          if (sound._node) {
            // Check if there is a panner setup and create a new one if not.
            if (!sound._panner || sound._panner.pan) {
              setupPanner(sound, 'spatial');
            }

            sound._panner.setPosition(x, y, z);
          }

          self._emit('pos', sound._id);
        } else {
          return sound._pos;
        }
      }
    }

    return self;
  };

  /**
   * Get/set the direction the audio source is pointing in the 3D cartesian coordinate
   * space. Depending on how direction the sound is, based on the `cone` attributes,
   * a sound pointing away from the listener can be quiet or silent.
   * @param  {Number} x  The x-orientation of the source.
   * @param  {Number} y  The y-orientation of the source.
   * @param  {Number} z  The z-orientation of the source.
   * @param  {Number} id (optional) The sound ID. If none is passed, all in group will be updated.
   * @return {Howl/Array}    Returns self or the current 3D spatial orientation: [x, y, z].
   */
  Howl.prototype.orientation = function(x, y, z, id) {
    var self = this;

    // Stop right here if not using Web Audio.
    if (!self._webAudio) {
      return self;
    }

    // If the sound hasn't loaded, add it to the load queue to change orientation when capable.
    if (self._state !== 'loaded') {
      self._queue.push({
        event: 'orientation',
        action: function() {
          self.orientation(x, y, z, id);
        }
      });

      return self;
    }

    // Set the defaults for optional 'y' & 'z'.
    y = (typeof y !== 'number') ? self._orientation[1] : y;
    z = (typeof z !== 'number') ? self._orientation[2] : z;

    // Setup the group's spatial orientation if no ID is passed.
    if (typeof id === 'undefined') {
      // Return the group's spatial orientation if no parameters are passed.
      if (typeof x === 'number') {
        self._orientation = [x, y, z];
      } else {
        return self._orientation;
      }
    }

    // Change the spatial orientation of one or all sounds in group.
    var ids = self._getSoundIds(id);
    for (var i=0; i<ids.length; i++) {
      // Get the sound.
      var sound = self._soundById(ids[i]);

      if (sound) {
        if (typeof x === 'number') {
          sound._orientation = [x, y, z];

          if (sound._node) {
            // Check if there is a panner setup and create a new one if not.
            if (!sound._panner) {
              // Make sure we have a position to setup the node with.
              if (!sound._pos) {
                sound._pos = self._pos || [0, 0, -0.5];
              }

              setupPanner(sound, 'spatial');
            }

            sound._panner.setOrientation(x, y, z);
          }

          self._emit('orientation', sound._id);
        } else {
          return sound._orientation;
        }
      }
    }

    return self;
  };

  /**
   * Get/set the panner node's attributes for a sound or group of sounds.
   * This method can optionall take 0, 1 or 2 arguments.
   *   pannerAttr() -> Returns the group's values.
   *   pannerAttr(id) -> Returns the sound id's values.
   *   pannerAttr(o) -> Set's the values of all sounds in this Howl group.
   *   pannerAttr(o, id) -> Set's the values of passed sound id.
   *
   *   Attributes:
   *     coneInnerAngle - (360 by default) There will be no volume reduction inside this angle.
   *     coneOuterAngle - (360 by default) The volume will be reduced to a constant value of
   *                      `coneOuterGain` outside this angle.
   *     coneOuterGain - (0 by default) The amount of volume reduction outside of `coneOuterAngle`.
   *     distanceModel - ('inverse' by default) Determines algorithm to use to reduce volume as audio moves
   *                      away from listener. Can be `linear`, `inverse` or `exponential`.
   *     maxDistance - (10000 by default) Volume won't reduce between source/listener beyond this distance.
   *     panningModel - ('HRTF' by default) Determines which spatialization algorithm is used to position audio.
   *                     Can be `HRTF` or `equalpower`.
   *     refDistance - (1 by default) A reference distance for reducing volume as the source
   *                    moves away from the listener.
   *     rolloffFactor - (1 by default) How quickly the volume reduces as source moves from listener.
   * 
   * @return {Howl/Object} Returns self or current panner attributes.
   */
  Howl.prototype.pannerAttr = function() {
    var self = this;
    var args = arguments;
    var o, id, sound;

    // Stop right here if not using Web Audio.
    if (!self._webAudio) {
      return self;
    }

    // Determine the values based on arguments.
    if (args.length === 0) {
      // Return the group's panner attribute values.
      return self._pannerAttr;
    } else if (args.length === 1) {
      if (typeof args[0] === 'object') {
        o = args[0];

        // Set the grou's panner attribute values.
        if (typeof id === 'undefined') {
          self._pannerAttr = {
            coneInnerAngle: typeof o.coneInnerAngle !== 'undefined' ? o.coneInnerAngle : self._coneInnerAngle,
            coneOuterAngle: typeof o.coneOuterAngle !== 'undefined' ? o.coneOuterAngle : self._coneOuterAngle,
            coneOuterGain: typeof o.coneOuterGain !== 'undefined' ? o.coneOuterGain : self._coneOuterGain,
            distanceModel: typeof o.distanceModel !== 'undefined' ? o.distanceModel : self._distanceModel,
            maxDistance: typeof o.maxDistance !== 'undefined' ? o.maxDistance : self._maxDistance,
            panningModel: typeof o.panningModel !== 'undefined' ? o.panningModel : self._panningModel,
            refDistance: typeof o.refDistance !== 'undefined' ? o.refDistance : self._refDistance,
            rolloffFactor: typeof o.rolloffFactor !== 'undefined' ? o.rolloffFactor : self._rolloffFactor
          };
        }
      } else {
        // Return this sound's panner attribute values.
        sound = self._soundById(parseInt(args[0], 10));
        return sound ? sound._pannerAttr : self._pannerAttr;
      }
    } else if (args.length === 2) {
      o = args[0];
      id = parseInt(args[1], 10);
    }

    // Update the values of the specified sounds.
    var ids = self._getSoundIds(id);
    for (var i=0; i<ids.length; i++) {
      sound = self._soundById(ids[i]);

      if (sound) {
        // Merge the new values into the sound.
        var pa = sound._pannerAttr;
        pa = {
          coneInnerAngle: typeof o.coneInnerAngle !== 'undefined' ? o.coneInnerAngle : pa.coneInnerAngle,
          coneOuterAngle: typeof o.coneOuterAngle !== 'undefined' ? o.coneOuterAngle : pa.coneOuterAngle,
          coneOuterGain: typeof o.coneOuterGain !== 'undefined' ? o.coneOuterGain : pa.coneOuterGain,
          distanceModel: typeof o.distanceModel !== 'undefined' ? o.distanceModel : pa.distanceModel,
          maxDistance: typeof o.maxDistance !== 'undefined' ? o.maxDistance : pa.maxDistance,
          panningModel: typeof o.panningModel !== 'undefined' ? o.panningModel : pa.panningModel,
          refDistance: typeof o.refDistance !== 'undefined' ? o.refDistance : pa.refDistance,
          rolloffFactor: typeof o.rolloffFactor !== 'undefined' ? o.rolloffFactor : pa.rolloffFactor
        };

        // Update the panner values or create a new panner if none exists.
        var panner = sound._panner;
        if (panner) {
          panner.coneInnerAngle = pa.coneInnerAngle;
          panner.coneOuterAngle = pa.coneOuterAngle;
          panner.coneOuterGain = pa.coneOuterGain;
          panner.distanceModel = pa.distanceModel;
          panner.maxDistance = pa.maxDistance;
          panner.panningModel = pa.panningModel;
          panner.refDistance = pa.refDistance;
          panner.rolloffFactor = pa.rolloffFactor;
        } else {
          // Make sure we have a position to setup the node with.
          if (!sound._pos) {
            sound._pos = self._pos || [0, 0, -0.5];
          }

          // Create a new panner node.
          setupPanner(sound, 'spatial');
        }
      }
    }

    return self;
  };

  /** Single Sound Methods **/
  /***************************************************************************/

  /**
   * Add new properties to the core Sound init.
   * @param  {Function} _super Core Sound init method.
   * @return {Sound}
   */
  Sound.prototype.init = (function(_super) {
    return function() {
      var self = this;
      var parent = self._parent;

      // Setup user-defined default properties.
      self._orientation = parent._orientation;
      self._stereo = parent._stereo;
      self._pos = parent._pos;
      self._pannerAttr = parent._pannerAttr;

      // Complete initilization with howler.js core Sound's init function.
      _super.call(this);

      // If a stereo or position was specified, set it up.
      if (self._stereo) {
        parent.stereo(self._stereo);
      } else if (self._pos) {
        parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
      }
    };
  })(Sound.prototype.init);

  /**
   * Override the Sound.reset method to clean up properties from the spatial plugin.
   * @param  {Function} _super Sound reset method.
   * @return {Sound}
   */
  Sound.prototype.reset = (function(_super) {
    return function() {
      var self = this;
      var parent = self._parent;

      // Reset all spatial plugin properties on this sound.
      self._orientation = parent._orientation;
      self._pos = parent._pos;
      self._pannerAttr = parent._pannerAttr;

      // Complete resetting of the sound.
      return _super.call(this);
    };
  })(Sound.prototype.reset);

  /** Helper Methods **/
  /***************************************************************************/

  /**
   * Create a new panner node and save it on the sound.
   * @param  {Sound} sound Specific sound to setup panning on.
   * @param {String} type Type of panner to create: 'stereo' or 'spatial'.
   */
  var setupPanner = function(sound, type) {
    type = type || 'spatial';

    // Create the new panner node.
    if (type === 'spatial') {
      sound._panner = Howler.ctx.createPanner();
      sound._panner.coneInnerAngle = sound._pannerAttr.coneInnerAngle;
      sound._panner.coneOuterAngle = sound._pannerAttr.coneOuterAngle;
      sound._panner.coneOuterGain = sound._pannerAttr.coneOuterGain;
      sound._panner.distanceModel = sound._pannerAttr.distanceModel;
      sound._panner.maxDistance = sound._pannerAttr.maxDistance;
      sound._panner.panningModel = sound._pannerAttr.panningModel;
      sound._panner.refDistance = sound._pannerAttr.refDistance;
      sound._panner.rolloffFactor = sound._pannerAttr.rolloffFactor;
      sound._panner.setPosition(sound._pos[0], sound._pos[1], sound._pos[2]);
      sound._panner.setOrientation(sound._orientation[0], sound._orientation[1], sound._orientation[2]);
    } else {
      sound._panner = Howler.ctx.createStereoPanner();
      sound._panner.pan.value = sound._stereo;
    }

    sound._panner.connect(sound._node);

    // Update the connections.
    if (!sound._paused) {
      sound._parent.pause(sound._id, true).play(sound._id);
    }
  };
})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map