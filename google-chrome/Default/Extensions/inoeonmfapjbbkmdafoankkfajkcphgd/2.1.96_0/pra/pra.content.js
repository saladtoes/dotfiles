/*! @license DOMPurify 3.0.3 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.3/LICENSE */

const {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf,
  getOwnPropertyDescriptor
} = Object;
let {
  freeze,
  seal,
  create: create$2
} = Object; // eslint-disable-line import/no-mutable-exports

let {
  apply,
  construct
} = typeof Reflect !== 'undefined' && Reflect;
if (!apply) {
  apply = function apply(fun, thisValue, args) {
    return fun.apply(thisValue, args);
  };
}
if (!freeze) {
  freeze = function freeze(x) {
    return x;
  };
}
if (!seal) {
  seal = function seal(x) {
    return x;
  };
}
if (!construct) {
  construct = function construct(Func, args) {
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
function unapply(func) {
  return function (thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return apply(func, thisArg, args);
  };
}
function unconstruct(func) {
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return construct(func, args);
  };
}
/* Add properties to a lookup table */

function addToSet(set, array, transformCaseFunc) {
  var _transformCaseFunc;
  transformCaseFunc = (_transformCaseFunc = transformCaseFunc) !== null && _transformCaseFunc !== void 0 ? _transformCaseFunc : stringToLowerCase;
  if (setPrototypeOf) {
    // Make 'in' and truthy checks like Boolean(set.constructor)
    // independent of any properties defined on Object.prototype.
    // Prevent prototype setters from intercepting set as a this value.
    setPrototypeOf(set, null);
  }
  let l = array.length;
  while (l--) {
    let element = array[l];
    if (typeof element === 'string') {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        // Config presets (e.g. tags.js, attrs.js) are immutable.
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}
/* Shallow clone an object */

function clone(object) {
  const newObject = create$2(null);
  for (const [property, value] of entries(object)) {
    newObject[property] = value;
  }
  return newObject;
}
/* This method automatically checks if the prop is function
 * or getter and behaves accordingly. */

function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === 'function') {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue(element) {
    console.warn('fallback value for', element);
    return null;
  }
  return fallbackValue;
}
const html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']); // SVG

const svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
const svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']); // List of SVG elements that are disallowed by default.
// We still need to know them so that we can do namespace
// checks properly in case one wants to add them to
// allow-list.

const svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
const mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'mprescripts']); // Similarly to SVG, we want to know all MathML elements,
// even those that we disallow by default.

const mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
const text = freeze(['#text']);
const html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns', 'slot']);
const svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
const mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
const xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);
const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode

const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
const TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape

const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape

const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
);

const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
);

const DOCTYPE_NAME = seal(/^html$/i);
var EXPRESSIONS = /*#__PURE__*/Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR: MUSTACHE_EXPR,
  ERB_EXPR: ERB_EXPR,
  TMPLIT_EXPR: TMPLIT_EXPR,
  DATA_ATTR: DATA_ATTR,
  ARIA_ATTR: ARIA_ATTR,
  IS_ALLOWED_URI: IS_ALLOWED_URI,
  IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA,
  ATTR_WHITESPACE: ATTR_WHITESPACE,
  DOCTYPE_NAME: DOCTYPE_NAME
});
const getGlobal = () => typeof window === 'undefined' ? null : window;
/**
 * Creates a no-op policy for internal use only.
 * Don't export this function outside this module!
 * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
 * @param {HTMLScriptElement} purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
 * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
 * are not supported or creating the policy failed).
 */

const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
    return null;
  } // Allow the callers to control the unique policy name
  // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
  // Policy creation with duplicate names throws in Trusted Types.

  let suffix = null;
  const ATTR_NAME = 'data-tt-policy-suffix';
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html) {
        return html;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_) {
    // Policy creation failed (most likely another DOMPurify script has
    // already run). Skip creating the policy, as this will only cause errors
    // if TT are enforced.
    console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
    return null;
  }
};
function createDOMPurify() {
  let window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
  const DOMPurify = root => createDOMPurify(root);
  /**
   * Version label, exposed for easier checks
   * if DOMPurify is up to date or not
   */

  DOMPurify.version = '3.0.3';
  /**
   * Array of elements that DOMPurify removed during sanitation.
   * Empty if nothing was removed.
   */

  DOMPurify.removed = [];
  if (!window || !window.document || window.document.nodeType !== 9) {
    // Not running in a browser, provide a factory function
    // so that you can pass your own Window
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  const originalDocument = window.document;
  const currentScript = originalDocument.currentScript;
  let {
    document
  } = window;
  const {
    DocumentFragment,
    HTMLTemplateElement,
    Node,
    Element,
    NodeFilter,
    NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser,
    trustedTypes
  } = window;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
  const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
  const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
  const getParentNode = lookupGetter(ElementPrototype, 'parentNode'); // As per issue #47, the web-components registry is inherited by a
  // new document created via createHTMLDocument. As per the spec
  // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
  // a new empty registry is used when creating a template contents owner
  // document, so we use that as our parent document to ensure nothing
  // is inherited.

  if (typeof HTMLTemplateElement === 'function') {
    const template = document.createElement('template');
    if (template.content && template.content.ownerDocument) {
      document = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = '';
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document;
  const {
    importNode
  } = originalDocument;
  let hooks = {};
  /**
   * Expose whether this browser supports running the full DOMPurify.
   */

  DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
  const {
    MUSTACHE_EXPR,
    ERB_EXPR,
    TMPLIT_EXPR,
    DATA_ATTR,
    ARIA_ATTR,
    IS_SCRIPT_OR_DATA,
    ATTR_WHITESPACE
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;
  /**
   * We consider the elements and attributes below to be safe. Ideally
   * don't add any new ones but feel free to remove unwanted ones.
   */

  /* allowed element names */

  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  /* Allowed attribute names */

  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
  /*
   * Configure how DOMPUrify should handle custom elements and their attributes as well as customized built-in elements.
   * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
   * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
   * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
   */

  let CUSTOM_ELEMENT_HANDLING = Object.seal(Object.create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */

  let FORBID_TAGS = null;
  /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */

  let FORBID_ATTR = null;
  /* Decide if ARIA attributes are okay */

  let ALLOW_ARIA_ATTR = true;
  /* Decide if custom data attributes are okay */

  let ALLOW_DATA_ATTR = true;
  /* Decide if unknown protocols are okay */

  let ALLOW_UNKNOWN_PROTOCOLS = false;
  /* Decide if self-closing tags in attributes are allowed.
   * Usually removed due to a mXSS issue in jQuery 3.0 */

  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  /* Output should be safe for common template engines.
   * This means, DOMPurify removes data attributes, mustaches and ERB
   */

  let SAFE_FOR_TEMPLATES = false;
  /* Decide if document with <html>... should be returned */

  let WHOLE_DOCUMENT = false;
  /* Track whether config is already set on this instance of DOMPurify. */

  let SET_CONFIG = false;
  /* Decide if all elements (e.g. style, script) must be children of
   * document.body. By default, browsers might move them to document.head */

  let FORCE_BODY = false;
  /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
   * string (or a TrustedHTML object if Trusted Types are supported).
   * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
   */

  let RETURN_DOM = false;
  /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
   * string  (or a TrustedHTML object if Trusted Types are supported) */

  let RETURN_DOM_FRAGMENT = false;
  /* Try to return a Trusted Type object instead of a string, return a string in
   * case Trusted Types are not supported  */

  let RETURN_TRUSTED_TYPE = false;
  /* Output should be free from DOM clobbering attacks?
   * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
   */

  let SANITIZE_DOM = true;
  /* Achieve full DOM Clobbering protection by isolating the namespace of named
   * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
   *
   * HTML/DOM spec rules that enable DOM Clobbering:
   *   - Named Access on Window (§7.3.3)
   *   - DOM Tree Accessors (§3.1.5)
   *   - Form Element Parent-Child Relations (§4.10.3)
   *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
   *   - HTMLCollection (§4.2.10.2)
   *
   * Namespace isolation is implemented by prefixing `id` and `name` attributes
   * with a constant string, i.e., `user-content-`
   */

  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
  /* Keep element content when removing element? */

  let KEEP_CONTENT = true;
  /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
   * of importing it into a new Document and returning a sanitized copy */

  let IN_PLACE = false;
  /* Allow usage of profiles like html, svg and mathMl */

  let USE_PROFILES = {};
  /* Tags to ignore content of when KEEP_CONTENT is true */

  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
  /* Tags that are safe for data: URIs */

  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
  /* Attributes safe for values like "javascript:" */

  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
  const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
  const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
  /* Document namespace */

  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  /* Allowed XHTML+XML namespaces */

  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  /* Parsing of strict XHTML documents */

  let PARSER_MEDIA_TYPE;
  const SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
  const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
  let transformCaseFunc;
  /* Keep a reference to config to pass to hooks */

  let CONFIG = null;
  /* Ideally, do not touch anything below this line */

  /* ______________________________________________ */

  const formElement = document.createElement('form');
  const isRegexOrFunction = function isRegexOrFunction(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  /**
   * _parseConfig
   *
   * @param  {Object} cfg optional config literal
   */
  // eslint-disable-next-line complexity

  const _parseConfig = function _parseConfig(cfg) {
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    /* Shield configuration object from tampering */

    if (!cfg || typeof cfg !== 'object') {
      cfg = {};
    }
    /* Shield configuration object from prototype pollution */

    cfg = clone(cfg);
    PARSER_MEDIA_TYPE =
    // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE; // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.

    transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
    /* Set configuration parameters */

    ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = 'ALLOWED_NAMESPACES' in cfg ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES),
    // eslint-disable-line indent
    cfg.ADD_URI_SAFE_ATTR,
    // eslint-disable-line indent
    transformCaseFunc // eslint-disable-line indent
    ) // eslint-disable-line indent
    : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = 'ADD_DATA_URI_TAGS' in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS),
    // eslint-disable-line indent
    cfg.ADD_DATA_URI_TAGS,
    // eslint-disable-line indent
    transformCaseFunc // eslint-disable-line indent
    ) // eslint-disable-line indent
    : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = 'FORBID_CONTENTS' in cfg ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
    FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
    USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true

    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true

    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false

    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true

    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false

    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false

    RETURN_DOM = cfg.RETURN_DOM || false; // Default false

    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false

    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false

    FORCE_BODY = cfg.FORCE_BODY || false; // Default false

    SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true

    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false

    KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true

    IN_PLACE = cfg.IN_PLACE || false; // Default false

    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    /* Parse profile info */

    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, [...text]);
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    /* Merge configuration parameters */

    if (cfg.ADD_TAGS) {
      if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
        ALLOWED_TAGS = clone(ALLOWED_TAGS);
      }
      addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
    }
    if (cfg.ADD_ATTR) {
      if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
        ALLOWED_ATTR = clone(ALLOWED_ATTR);
      }
      addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    /* Add #text in case KEEP_CONTENT is set to true */

    if (KEEP_CONTENT) {
      ALLOWED_TAGS['#text'] = true;
    }
    /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */

    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
    }
    /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */

    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ['tbody']);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      } // Overwrite existing TrustedTypes policy.

      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY; // Sign local variables required by `sanitize`.

      emptyHTML = trustedTypesPolicy.createHTML('');
    } else {
      // Uninitialized policy, attempt to initialize the internal dompurify policy.
      if (trustedTypesPolicy === undefined) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      } // If creating the internal policy succeeded sign internal variables.

      if (trustedTypesPolicy !== null && typeof emptyHTML === 'string') {
        emptyHTML = trustedTypesPolicy.createHTML('');
      }
    } // Prevent further manipulation of configuration.
    // Not available in IE8, Safari 5, etc.

    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  const MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
  const HTML_INTEGRATION_POINTS = addToSet({}, ['foreignobject', 'desc', 'title', 'annotation-xml']); // Certain elements are allowed in both SVG and HTML
  // namespace. We need to specify them explicitly
  // so that they don't get erroneously deleted from
  // HTML namespace.

  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
  /* Keep track of all possible SVG and MathML tags
   * so that we can perform the namespace checks
   * correctly. */

  const ALL_SVG_TAGS = addToSet({}, svg$1);
  addToSet(ALL_SVG_TAGS, svgFilters);
  addToSet(ALL_SVG_TAGS, svgDisallowed);
  const ALL_MATHML_TAGS = addToSet({}, mathMl$1);
  addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
  /**
   *
   *
   * @param  {Element} element a DOM element whose namespace is being checked
   * @returns {boolean} Return false if the element has a
   *  namespace that a spec-compliant parser would never
   *  return. Return true otherwise.
   */

  const _checkValidNamespace = function _checkValidNamespace(element) {
    let parent = getParentNode(element); // In JSDOM, if we're inside shadow DOM, then parentNode
    // can be null. We just simulate parent in this case.

    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: 'template'
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      // The only way to switch from HTML namespace to SVG
      // is via <svg>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'svg';
      } // The only way to switch from MathML to SVG is via`
      // svg if parent is either <annotation-xml> or MathML
      // text integration points.

      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      } // We only allow elements that are defined in SVG
      // spec. All others are disallowed in SVG namespace.

      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      // The only way to switch from HTML namespace to MathML
      // is via <math>. If it happens via any other tag, then
      // it should be killed.
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === 'math';
      } // The only way to switch from SVG to MathML is via
      // <math> and HTML integration points

      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
      } // We only allow elements that are defined in MathML
      // spec. All others are disallowed in MathML namespace.

      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      // The only way to switch from SVG to HTML is via
      // HTML integration points, and from MathML to HTML
      // is via MathML text integration points
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      } // We disallow tags that are specific for MathML
      // or SVG and should never appear in HTML namespace

      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    } // For XHTML and XML documents that support custom namespaces

    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    } // The code should never reach this place (this means
    // that the element somehow got namespace that is not
    // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
    // Return false just in case.

    return false;
  };
  /**
   * _forceRemove
   *
   * @param  {Node} node a DOM node
   */

  const _forceRemove = function _forceRemove(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      // eslint-disable-next-line unicorn/prefer-dom-node-remove
      node.parentNode.removeChild(node);
    } catch (_) {
      node.remove();
    }
  };
  /**
   * _removeAttribute
   *
   * @param  {String} name an Attribute name
   * @param  {Node} node a DOM node
   */

  const _removeAttribute = function _removeAttribute(name, node) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: node.getAttributeNode(name),
        from: node
      });
    } catch (_) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: node
      });
    }
    node.removeAttribute(name); // We void attribute values for unremovable "is"" attributes

    if (name === 'is' && !ALLOWED_ATTR[name]) {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(node);
        } catch (_) {}
      } else {
        try {
          node.setAttribute(name, '');
        } catch (_) {}
      }
    }
  };
  /**
   * _initDocument
   *
   * @param  {String} dirty a string of dirty markup
   * @return {Document} a DOM, filled with the dirty markup
   */

  const _initDocument = function _initDocument(dirty) {
    /* Create a HTML document */
    let doc;
    let leadingWhitespace;
    if (FORCE_BODY) {
      dirty = '<remove></remove>' + dirty;
    } else {
      /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
      // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    /*
     * Use the DOMParser API by default, fallback later if needs be
     * DOMParser not work for svg when has multiple root element.
     */

    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_) {}
    }
    /* Use createHTMLDocument in case DOMParser is not available */

    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, 'template', null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_) {// Syntax error if dirtyPayload is invalid xml
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    /* Work on whole document or just its body */

    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  /**
   * _createIterator
   *
   * @param  {Document} root document/fragment to create iterator for
   * @return {Iterator} iterator instance
   */

  const _createIterator = function _createIterator(root) {
    return createNodeIterator.call(root.ownerDocument || root, root,
    // eslint-disable-next-line no-bitwise
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, null, false);
  };
  /**
   * _isClobbered
   *
   * @param  {Node} elm element to check for clobbering attacks
   * @return {Boolean} true if clobbered, false if safe
   */

  const _isClobbered = function _isClobbered(elm) {
    return elm instanceof HTMLFormElement && (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string' || typeof elm.insertBefore !== 'function' || typeof elm.hasChildNodes !== 'function');
  };
  /**
   * _isNode
   *
   * @param  {Node} obj object to check whether it's a DOM node
   * @return {Boolean} true is object is a DOM node
   */

  const _isNode = function _isNode(object) {
    return typeof Node === 'object' ? object instanceof Node : object && typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
  };
  /**
   * _executeHook
   * Execute user configurable hooks
   *
   * @param  {String} entryPoint  Name of the hook's entry point
   * @param  {Node} currentNode node to work on with the hook
   * @param  {Object} data additional hook parameters
   */

  const _executeHook = function _executeHook(entryPoint, currentNode, data) {
    if (!hooks[entryPoint]) {
      return;
    }
    arrayForEach(hooks[entryPoint], hook => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  };
  /**
   * _sanitizeElements
   *
   * @protect nodeName
   * @protect textContent
   * @protect removeChild
   *
   * @param   {Node} currentNode to check for permission to exist
   * @return  {Boolean} true if node was killed, false if left alive
   */

  const _sanitizeElements = function _sanitizeElements(currentNode) {
    let content;
    /* Execute a hook if present */

    _executeHook('beforeSanitizeElements', currentNode, null);
    /* Check if element is clobbered or can clobber */

    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Now let's check the element's type and name */

    const tagName = transformCaseFunc(currentNode.nodeName);
    /* Execute a hook if present */

    _executeHook('uponSanitizeElement', currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    /* Detect mXSS attempts abusing namespace confusion */

    if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove element if anything forbids its presence */

    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
      /* Check if we have a custom element to handle */
      if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) return false;
      }
      /* Keep content except for bad-listed elements */

      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i = childCount - 1; i >= 0; --i) {
            parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    /* Check whether element has a valid namespace */

    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Make sure that older browsers don't get noscript mXSS */

    if ((tagName === 'noscript' || tagName === 'noembed') && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Sanitize element content to be template-safe */

    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
      /* Get the element's text content */
      content = currentNode.textContent;
      content = stringReplace(content, MUSTACHE_EXPR, ' ');
      content = stringReplace(content, ERB_EXPR, ' ');
      content = stringReplace(content, TMPLIT_EXPR, ' ');
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    /* Execute a hook if present */

    _executeHook('afterSanitizeElements', currentNode, null);
    return false;
  };
  /**
   * _isValidAttribute
   *
   * @param  {string} lcTag Lowercase tag name of containing element.
   * @param  {string} lcName Lowercase attribute name.
   * @param  {string} value Attribute value.
   * @return {Boolean} Returns true if `value` is valid, otherwise false.
   */
  // eslint-disable-next-line complexity

  const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
    /* Make sure attribute cannot clobber */
    if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
      return false;
    }
    /* Allow valid data-* attributes: At least one character after "-"
        (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
        XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
        We don't need to check the value; it's always URI safe. */

    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName)) ;else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName)) ;else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
      // First condition does a very basic check if a) it's basically a valid custom element tagname AND
      // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
      _basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) ||
      // Alternative, second condition checks if it's an `is`-attribute, AND
      // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ;else {
        return false;
      }
      /* Check value is safe. First, is attr inert? If so, is safe */
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ;else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, ''))) ;else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ;else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, ''))) ;else if (value) {
      return false;
    } else ;
    return true;
  };
  /**
   * _basicCustomElementCheck
   * checks if at least one dash is included in tagName, and it's not the first char
   * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
   * @param {string} tagName name of the tag of the node to sanitize
   */

  const _basicCustomElementTest = function _basicCustomElementTest(tagName) {
    return tagName.indexOf('-') > 0;
  };
  /**
   * _sanitizeAttributes
   *
   * @protect attributes
   * @protect nodeName
   * @protect removeAttribute
   * @protect setAttribute
   *
   * @param  {Node} currentNode to sanitize
   */

  const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
    let attr;
    let value;
    let lcName;
    let l;
    /* Execute a hook if present */

    _executeHook('beforeSanitizeAttributes', currentNode, null);
    const {
      attributes
    } = currentNode;
    /* Check if we have attributes; if not we might have a text node */

    if (!attributes) {
      return;
    }
    const hookEvent = {
      attrName: '',
      attrValue: '',
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR
    };
    l = attributes.length;
    /* Go backwards over all attributes; safely remove bad ones */

    while (l--) {
      attr = attributes[l];
      const {
        name,
        namespaceURI
      } = attr;
      value = name === 'value' ? attr.value : stringTrim(attr.value);
      lcName = transformCaseFunc(name);
      /* Execute a hook if present */

      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set

      _executeHook('uponSanitizeAttribute', currentNode, hookEvent);
      value = hookEvent.attrValue;
      /* Did the hooks approve of the attribute? */

      if (hookEvent.forceKeepAttr) {
        continue;
      }
      /* Remove attribute */

      _removeAttribute(name, currentNode);
      /* Did the hooks approve of the attribute? */

      if (!hookEvent.keepAttr) {
        continue;
      }
      /* Work around a security issue in jQuery 3.0 */

      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Sanitize attribute content to be template-safe */

      if (SAFE_FOR_TEMPLATES) {
        value = stringReplace(value, MUSTACHE_EXPR, ' ');
        value = stringReplace(value, ERB_EXPR, ' ');
        value = stringReplace(value, TMPLIT_EXPR, ' ');
      }
      /* Is `value` valid for this attribute? */

      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        continue;
      }
      /* Full DOM Clobbering protection via namespace isolation,
       * Prefix id and name attributes with `user-content-`
       */

      if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name')) {
        // Remove the attribute with this value
        _removeAttribute(name, currentNode); // Prefix the value and later re-create the attribute with the sanitized value

        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      /* Handle attributes that require Trusted Types */

      if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
        if (namespaceURI) ;else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case 'TrustedHTML':
              {
                value = trustedTypesPolicy.createHTML(value);
                break;
              }
            case 'TrustedScriptURL':
              {
                value = trustedTypesPolicy.createScriptURL(value);
                break;
              }
          }
        }
      }
      /* Handle invalid data-* attribute set by try-catching it */

      try {
        if (namespaceURI) {
          currentNode.setAttributeNS(namespaceURI, name, value);
        } else {
          /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
          currentNode.setAttribute(name, value);
        }
        arrayPop(DOMPurify.removed);
      } catch (_) {}
    }
    /* Execute a hook if present */

    _executeHook('afterSanitizeAttributes', currentNode, null);
  };
  /**
   * _sanitizeShadowDOM
   *
   * @param  {DocumentFragment} fragment to iterate over recursively
   */

  const _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
    let shadowNode;
    const shadowIterator = _createIterator(fragment);
    /* Execute a hook if present */

    _executeHook('beforeSanitizeShadowDOM', fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      /* Execute a hook if present */
      _executeHook('uponSanitizeShadowNode', shadowNode, null);
      /* Sanitize tags and elements */

      if (_sanitizeElements(shadowNode)) {
        continue;
      }
      /* Deep shadow DOM detected */

      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(shadowNode.content);
      }
      /* Check attributes, sanitize if necessary */

      _sanitizeAttributes(shadowNode);
    }
    /* Execute a hook if present */

    _executeHook('afterSanitizeShadowDOM', fragment, null);
  };
  /**
   * Sanitize
   * Public method providing core sanitation functionality
   *
   * @param {String|Node} dirty string or DOM node
   * @param {Object} configuration object
   */
  // eslint-disable-next-line complexity

  DOMPurify.sanitize = function (dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let body;
    let importedNode;
    let currentNode;
    let returnNode;
    /* Make sure we have a string to sanitize.
      DO NOT return early, as this will return the wrong type if
      the user has requested a DOM object rather than a string */

    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = '<!-->';
    }
    /* Stringify, in case dirty is an object */

    if (typeof dirty !== 'string' && !_isNode(dirty)) {
      if (typeof dirty.toString === 'function') {
        dirty = dirty.toString();
        if (typeof dirty !== 'string') {
          throw typeErrorCreate('dirty is not a string, aborting');
        }
      } else {
        throw typeErrorCreate('toString is not a function');
      }
    }
    /* Return dirty HTML if DOMPurify cannot run */

    if (!DOMPurify.isSupported) {
      return dirty;
    }
    /* Assign config vars */

    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    /* Clean up removed elements */

    DOMPurify.removed = [];
    /* Check if dirty is correctly typed for IN_PLACE */

    if (typeof dirty === 'string') {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      /* Do some early pre-sanitization to avoid unsafe root nodes */
      if (dirty.nodeName) {
        const tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
        }
      }
    } else if (dirty instanceof Node) {
      /* If dirty is a DOM element, append to an empty document to avoid
         elements being stripped by the parser */
      body = _initDocument('<!---->');
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
        /* Node is already a body, use as is */
        body = importedNode;
      } else if (importedNode.nodeName === 'HTML') {
        body = importedNode;
      } else {
        // eslint-disable-next-line unicorn/prefer-dom-node-append
        body.appendChild(importedNode);
      }
    } else {
      /* Exit directly if we have nothing to do */
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
      // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf('<') === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      /* Initialize the document to work on */

      body = _initDocument(dirty);
      /* Check we have a DOM node from the data */

      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
      }
    }
    /* Remove first element node (ours) if FORCE_BODY is set */

    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    /* Get node iterator */

    const nodeIterator = _createIterator(IN_PLACE ? dirty : body);
    /* Now start iterating over the created document */

    while (currentNode = nodeIterator.nextNode()) {
      /* Sanitize tags and elements */
      if (_sanitizeElements(currentNode)) {
        continue;
      }
      /* Shadow DOM detected, sanitize it */

      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }
      /* Check attributes, sanitize if necessary */

      _sanitizeAttributes(currentNode);
    }
    /* If we sanitized `dirty` in-place, return it. */

    if (IN_PLACE) {
      return dirty;
    }
    /* Return sanitized string or DOM */

    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmod) {
        /*
          AdoptNode() is not used because internal state is not reset
          (e.g. the past names map of a HTMLFormElement), this is safe
          in theory but we would rather not risk another attack vector.
          The state that is cloned by importNode() is explicitly defined
          by the specs.
        */
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    /* Serialize doctype if allowed */

    if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
    }
    /* Sanitize final string template-safe */

    if (SAFE_FOR_TEMPLATES) {
      serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR, ' ');
      serializedHTML = stringReplace(serializedHTML, ERB_EXPR, ' ');
      serializedHTML = stringReplace(serializedHTML, TMPLIT_EXPR, ' ');
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  /**
   * Public method to set the configuration once
   * setConfig
   *
   * @param {Object} cfg configuration object
   */

  DOMPurify.setConfig = function (cfg) {
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  /**
   * Public method to remove the configuration
   * clearConfig
   *
   */

  DOMPurify.clearConfig = function () {
    CONFIG = null;
    SET_CONFIG = false;
  };
  /**
   * Public method to check if an attribute value is valid.
   * Uses last set config, if any. Otherwise, uses config defaults.
   * isValidAttribute
   *
   * @param  {string} tag Tag name of containing element.
   * @param  {string} attr Attribute name.
   * @param  {string} value Attribute value.
   * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
   */

  DOMPurify.isValidAttribute = function (tag, attr, value) {
    /* Initialize shared config vars if necessary. */
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  /**
   * AddHook
   * Public method to add DOMPurify hooks
   *
   * @param {String} entryPoint entry point for the hook to add
   * @param {Function} hookFunction function to execute
   */

  DOMPurify.addHook = function (entryPoint, hookFunction) {
    if (typeof hookFunction !== 'function') {
      return;
    }
    hooks[entryPoint] = hooks[entryPoint] || [];
    arrayPush(hooks[entryPoint], hookFunction);
  };
  /**
   * RemoveHook
   * Public method to remove a DOMPurify hook at a given entryPoint
   * (pops it from the stack of hooks if more are present)
   *
   * @param {String} entryPoint entry point for the hook to remove
   * @return {Function} removed(popped) hook
   */

  DOMPurify.removeHook = function (entryPoint) {
    if (hooks[entryPoint]) {
      return arrayPop(hooks[entryPoint]);
    }
  };
  /**
   * RemoveHooks
   * Public method to remove all DOMPurify hooks at a given entryPoint
   *
   * @param  {String} entryPoint entry point for the hooks to remove
   */

  DOMPurify.removeHooks = function (entryPoint) {
    if (hooks[entryPoint]) {
      hooks[entryPoint] = [];
    }
  };
  /**
   * RemoveAllHooks
   * Public method to remove all DOMPurify hooks
   *
   */

  DOMPurify.removeAllHooks = function () {
    hooks = {};
  };
  return DOMPurify;
}
var purify = createDOMPurify();
class AudioRecorder {
  constructor() {
    this.mediaRecorder = null;
    this.chunks = [];
    this.finished = false;
    this.dateStarted = null;
  }
  async setup() {
    if (navigator.mediaDevices) {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = e => {
        this.chunks.push(e.data);
      };
      this.mediaRecorder.onstop = () => {
        this.finished = true;
        this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
      };
    } else {
      throw Error("No MediaRecorder Support");
    }
  }

  /**
   * this will startRecording a new recording
   */
  async startRecording() {
    await this.setup();
    this.finished = false;
    switch (this.mediaRecorder.state) {
      case "recording":
      case "paused":
        this.stopRecording();
        break;
    }
    this.clear();
    this.mediaRecorder.start(1000);
    this.dateStarted = new Date().getTime();
  }
  getDuration() {
    const diff = new Date().getTime() - this.dateStarted;
    const secs = Math.floor(diff / 1000);
    return secs;
  }
  getState() {
    if (!this.mediaRecorder) {
      return "init";
    }
    return this.mediaRecorder.state;
  }
  isRecording() {
    if (this.mediaRecorder == null) {
      return false;
    }
    return this.mediaRecorder.state === "recording";
  }
  async stopRecording() {
    switch (this.mediaRecorder.state) {
      case "recording":
      case "paused":
        this.mediaRecorder.stop();
        break;
    }
  }
  pause() {
    if (this.mediaRecorder.state === "recording") {
      this.mediaRecorder.pause();
    }
  }
  resume() {
    if (this.mediaRecorder.state === "paused") {
      this.mediaRecorder.resume();
    }
  }
  clear() {
    this.chunks = [];
  }
  getBlob() {
    return new Blob(this.chunks, {
      type: "audio/ogg; codecs=opus"
    });
  }
  getAudioUrl() {
    return window.URL.createObjectURL(this.getBlob());
  }
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

/**
 * @description Uploads a file to google drive or onedrive
 * @param {Blob} blob arraybuffer that contains the file
 * @param {string} fileName The name of the file
 * @param {string} rootFolder The name of root folder e.g. Texthelp
 * @param {string} feature The name of the feature
 * @param {string} accessToken Access token that has the right scope to upload a file
 * @param {string} documentID Optional, code will add metadata to this file
 */
class IUploader {
  upload(blob, fileName, rootFolder, feature, accessToken, documentID) {
    throw Error("missing function upload");
  }
}
const driveFetch = async (url, accessToken, method = "GET", extraParams = {}, extraHeaders = {}) => {
  const result = await fetch(url, _extends({
    method,
    headers: new Headers(_extends({
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }, extraHeaders))
  }, extraParams));
  return result;
};

/**
 * @function checkExists
 * @param {string} accessToken Access token
 * @param {string} id Id of the folder
 * @returns {boolean} true or false
 */
const checkExists = async (accessToken, id) => {
  const result = await fetch(`https://www.googleapis.com/drive/v3/files/${id}?fields=trashed`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const {
    trashed
  } = await result.json();
  if (trashed === true) {
    return false;
  }
  if (result.ok) {
    return true; // File exists
  }

  if (result.status === 404) {
    return false; // File does not exist
  }

  throw new Error(`Failed to check if file exists. Status code: ${result.status}`);
};
var helper = {
  driveFetch,
  checkExists
};
const configFileName = "uploadFileConfig.json";

/**
 * @function create
 * @returns json object with a file array
 * @description creates the config file tha contains information
 */
const create$1 = async accessToken => {
  const fileMetadata = {
    name: configFileName,
    parents: ["appDataFolder"]
  };
  const fileContent = {};

  // Step 1: Create the file
  const createResult = await fetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(fileMetadata)
  });
  const createData = await createResult.json();
  const fileId = createData.id;

  // Step 2: Update the file contents
  const updateResult = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(fileContent)
  });
  const updateData = await updateResult.json();
  return updateData;
};

/**
 * @function get
 * @returns json object with a file array
 * @description returns the config file from appDataFolder
 */
const get = async accessToken => {
  const url = `https://content.googleapis.com/drive/v3/files?${encodeURI(`q=name='${configFileName}'&spaces=appDataFolder&fields=files/id,files/description,files/trashed`)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

/**
 * @function remove
 * @returns json object with a file array
 * @description removes the config file from appDataFolder
 */
const remove = async accessToken => {
  const configFileArray = await get(accessToken);
  if (configFileArray.files.length > 0) {
    configFileArray.files.forEach(async element => {
      const fileId = element.id;
      await helper.driveFetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, accessToken, "DELETE");
    });
  }
  return null;
};

/**
 * @function getFileContent
 * @param {string} accessToken Access token
 * @param {string} fileId Id of the fine that has json content
 * @returns {object} Json object
 */
const getFileContent = async (accessToken, fileId) => {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  const response = await helper.driveFetch(url, accessToken);
  const fileContent = await response.text();
  if (fileContent === "") {
    return {};
  }
  return JSON.parse(fileContent);
};

/**
 * @function updateFileContent
 * @param {string} accessToken Access token
 * @param {string} fileId Id of the file that has a json content
 * @param {object} newData JSON object to replace the original with
 * @returns {object}
 */
const updateFileContent = async (accessToken, fileId, newData) => {
  // Step 1: Get the file metadata
  const metadataResult = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
  const metadataData = await metadataResult.json();
  const {
    etag
  } = metadataData;

  // Step 2: Update the file contents
  const updateResult = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "If-Match": etag
    },
    body: JSON.stringify(newData)
  });
  const updateData = await updateResult.json();
  return updateData;
};
var configfile = {
  create: create$1,
  get,
  remove,
  getFileContent,
  updateFileContent
};

/**
 * @function createFolder
 * @param {string} accessToken Access token to create a folder
 * @param {string} folderName Name of the folder
 * @param {string} parentId Id of the parent folder. If not passed in will create the folder in the root folder
 * @returns id of the newly created folder
 * @description Creates a folder with a specific name - optionally under a parent folder
 */
const createFolder$1 = async (accessToken, folderName, parentId) => {
  const folderMetadata = {
    name: folderName,
    mimeType: "application/vnd.google-apps.folder"
  };
  if (parentId) {
    folderMetadata.parents = [parentId];
  }
  const result = await fetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(folderMetadata)
  });
  const data = await result.json();
  return data.id;
};
var foldermanager = {
  createFolder: createFolder$1
};
const upload$1 = async (blob, fileName, accessToken, folderId) => {
  // Define the endpoint URL for uploading files to Google Drive
  const endpoint = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";

  // Define the metadata for the file
  const metadata = {
    name: fileName,
    parents: [folderId]
  };

  // Create a new FormData object
  const formData = new FormData();

  // Append the file and metadata to the FormData object
  formData.append("metadata", new Blob([JSON.stringify(metadata)], {
    type: "application/json"
  }));
  formData.append("file", blob, fileName);

  // Define the options for the Fetch API request
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: formData
  };

  // Send the Fetch API request to upload the file
  const response = await fetch(endpoint, options);
  const data = await response.json();
  if (response.ok) {
    // Return the file ID of the uploaded file
    return {
      fileId: data.id
    };
  }
  return {
    fileId: null,
    error: data
  };
};
const updateDocumentMetaData = async (accessToken, docId, metaData) => {
  const url = `https://content.googleapis.com/drive/v3/files/${docId}`;
  const result = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(metaData)
  });
  if (!result.ok) {
    throw new Error(result.statusText);
  }
  const json = await result.json();
  return json;
};
const getDocumentMetaData = async (accessToken, docId) => {
  const url = `https://content.googleapis.com/drive/v3/files/${docId}?fields=appProperties`;
  const result = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (!result.ok) {
    throw new Error(result.statusText);
  }
  if (result.status === 404) {
    return null;
  }
  const json = await result.json();
  return json;
};
const getDocumentTitle = async (accessToken, docId) => {
  const url = `https://www.googleapis.com/drive/v3/files/${docId}?fields=name`;
  const result = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (!result.ok) {
    throw new Error(result.statusText);
  }
  const json = await result.json();
  return json.name;
};
var filemanager = {
  upload: upload$1,
  getDocumentMetaData,
  updateDocumentMetaData,
  getDocumentTitle
};

/* eslint-disable class-methods-use-this */

class GoogleDriveUploader extends IUploader {
  /**
   * @private
   */
  async getConfigData(accessToken) {
    const configurations = await configfile.get(accessToken);
    let configId;
    // check if file is there
    if (configurations.files.length < 1) {
      // create new config file if needed
      const createResult = await configfile.create(accessToken);
      configId = createResult.id;
    } else {
      configId = configurations.files[0].id;
    }

    // get config file
    const configJson = await configfile.getFileContent(accessToken, configId);
    return {
      configJson,
      configId
    };
  }
  async upload(blob, fileName, rootFolder, feature, accessToken, documentID = null) {
    // get config file
    const {
      configJson,
      configId
    } = await this.getConfigData(accessToken);

    // check if the rootFolder exists in the config
    let rootId;
    if (configJson[rootFolder] && configJson[rootFolder].rootId) {
      rootId = configJson[rootFolder].rootId;
    }
    let changed = false;
    if (!rootId) {
      rootId = await foldermanager.createFolder(accessToken, rootFolder);
      configJson[rootFolder] = {
        rootId
      };
      changed = true;
    } else {
      const rootExists = await helper.checkExists(accessToken, rootId);
      if (!rootExists) {
        rootId = await foldermanager.createFolder(accessToken, rootFolder);
        configJson[rootFolder].rootId = rootId;
        changed = true;
      }
    }
    let featureId;
    // if(!documentID) {
    featureId = configJson[rootFolder][feature];
    if (!featureId) {
      featureId = await foldermanager.createFolder(accessToken, feature, rootId);
      configJson[rootFolder][feature] = featureId;
      changed = true;
    } else {
      const featureExists = await helper.checkExists(accessToken, featureId);
      if (!featureExists) {
        featureId = await foldermanager.createFolder(accessToken, feature, rootId);
        configJson[rootFolder][feature] = featureId;
        changed = true;
      }
    }
    // }

    // if the config changed refresh the data on drive
    if (changed) {
      await configfile.updateFileContent(accessToken, configId, configJson);
    }

    // if documentID was provided get featureId from there
    if (documentID) {
      let metaDataChanged = false;
      const metadata = await filemanager.getDocumentMetaData(accessToken, documentID);
      const documentTitle = await filemanager.getDocumentTitle(accessToken, documentID);
      if (metadata && metadata.appProperties && metadata.appProperties[feature]) {
        // check if folder exists
        const featureFolderExists = await helper.checkExists(accessToken, metadata.appProperties[feature]);
        if (!featureFolderExists) {
          const documentFolderId = await foldermanager.createFolder(accessToken, documentTitle, featureId);
          metadata.appProperties[feature] = documentFolderId;
          metaDataChanged = true;
        }
        featureId = metadata.appProperties[feature];
      } else if (metadata && metadata.appProperties && !metadata.appProperties[feature]) {
        const documentFolderId = await foldermanager.createFolder(accessToken, documentTitle, featureId);
        metadata.appProperties[feature] = documentFolderId;
        metaDataChanged = true;
      }
      if (metaDataChanged) {
        await filemanager.updateDocumentMetaData(accessToken, documentID, metadata);
      }
      featureId = metadata.appProperties[feature];
    }

    // upload the file
    const fileUploadResult = await filemanager.upload(blob, fileName, accessToken, featureId);
    return fileUploadResult;
  }
}
const checkIfFolderExists = async (folderPath, accessToken) => {
  const result = {
    exists: null,
    id: null
  };
  const response = await fetch(`https://graph.microsoft.com/v1.0/me/drive/root:${folderPath}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (response.ok) {
    const folderInfo = await response.json();
    result.exists = true;
    result.id = folderInfo.id;
  } else if (response.status === 404) {
    result.exists = false;
  } else {
    throw new Error(`Error checking for folder. status: ${response.status}, statusText: ${response.statusText}`);
  }
  return result;
};

/**
 *
 * @param {string} accessToken Access Token
 * @param {string} driveId Drive Id
 * @param {string} folderName Name of the new folder
 * @param {string} parentFolderId Parent Folder Id, defaults to root
 * @returns {string} Folder Id of the created folder
 */
const createFolder = async (accessToken, driveId, folderName, parentFolderId = "root") => {
  const response = await fetch(`https://graph.microsoft.com/v1.0/drives/${driveId}/items/${parentFolderId}/children`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: folderName,
      folder: {}
    })
  });
  if (response.ok) {
    const folderInfo = await response.json();
    return folderInfo.id;
  }
  return null;
};
var FolderManager = {
  checkIfFolderExists,
  createFolder
};
const getDriveId = async accessToken => {
  const response = await fetch("https://graph.microsoft.com/v1.0/me/drive", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (response.ok) {
    const drive = await response.json();
    return drive.id;
  }
  return null;
};
const upload = async (accessToken, driveId, folderId, fileName, blob) => {
  const fileType = blob.type;
  const now = new Date();
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };
  const formattedDate = now.toLocaleString("en-US", options).replace(/:/g, "-").replace(/\//g, "-").replace(", ", "-");
  const modFileName = `${fileName.slice(0, 30)}${formattedDate.replace(" PM", "").replace(" AM", "")}.ogg`;
  const response = await fetch(`https://graph.microsoft.com/v1.0/drives/${driveId}/items/${folderId}:/${modFileName}:/content`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": fileType
    },
    body: blob
  });
  const data = await response.json();
  if (response.ok) {
    return {
      fileId: data.id
    };
  }
  return {
    fileId: null,
    error: data
  };
};
var Graph = {
  getDriveId,
  upload
};
class OneDriveUploader extends IUploader {
  async upload(file, fileName, rootFolder, feature, accessToken, documentID = null) {
    this.file = file;
    this.rootFolder = rootFolder;
    this.feature = feature;
    this.documentID = documentID;
    this.accessToken = accessToken;
    const driveId = await Graph.getDriveId(accessToken);
    if (driveId === null) {
      throw new Error("Can't get driveid");
    }

    // check root folder
    let rootFolderId;
    const rootFolderExists = await FolderManager.checkIfFolderExists(`/${rootFolder}`, accessToken);
    if (!rootFolderExists.exists) {
      rootFolderId = await FolderManager.createFolder(accessToken, driveId, rootFolder);
    } else {
      rootFolderId = rootFolderExists.id;
    }
    if (rootFolderId === null) {
      throw new Error("Error while creating the root folder");
    }

    // check feature folder
    let featureFolderId;
    const featureFolderExists = await FolderManager.checkIfFolderExists(`/${rootFolder}/${feature}`, accessToken);
    if (!featureFolderExists.exists) {
      featureFolderId = await FolderManager.createFolder(accessToken, driveId, feature, rootFolderId);
    } else {
      featureFolderId = featureFolderExists.id;
    }
    if (featureFolderId === null) {
      throw new Error("Error while creating the feature folder");
    }
    const fileUploadResult = await Graph.upload(accessToken, driveId, featureFolderId, encodeURI(fileName), file);
    const uploadResult = _extends({}, fileUploadResult, {
      driveId
    });
    return uploadResult;
  }
}
const getUploader = platform => {
  let uploader = null;
  switch (platform) {
    case "googledrive":
      uploader = new GoogleDriveUploader();
      break;
    case "msonedrive":
      uploader = new OneDriveUploader();
      break;
  }
  return uploader;
};
var uploaderFactory = {
  getUploader
};

/**
 * @description Uploads a file to google drive or onedrive
 * @param {Blob} blob arraybuffer that contains the file
 * @param {string} fileName The name of the file
 * @param {string} rootFolder The name of root folder e.g. Texthelp
 * @param {string} feature The name of the feature
 * @param {string} accessToken Access token that has the right scope to upload a file
 * @param {string} documentID Optional, code will add metadata to this file
 * @param {string} platform Platform where the upload has to be done googledrive / onedrive
 * @returns {{Promise<{fileId: string, error?: any}>} } A promise that resolves to an object with 'fileId' property indicating the uploaded file id and optional 'error' property if an error occurs
 */
const uploadFile = async (blob, fileName, rootFolder, feature, accessToken, documentID = null, platform = "googledrive") => {
  try {
    const uploader = uploaderFactory.getUploader(platform);
    const fileId = await uploader.upload(blob, fileName, rootFolder, feature, accessToken, documentID);
    return fileId;
  } catch (e) {
    return {
      fileId: null,
      error: e
    };
  }
};
var fileuploader = {
  uploadFile
};

/**
 * @typedef {Object} PlatformEnum
 * @description Share platform enum
 * @property {string} MSONEDRIVE - Microsoft OneDrive platform value
 * @property {string} GOOGLEDRIVE - Google Drive platform value
 */

/**
 * @type {PlatformEnum}
 * @description An enum representing the supported share platforms
 */
const platformEnum = Object.freeze({
  MSONEDRIVE: "msonedrive",
  GOOGLEDRIVE: "googledrive"
});

/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions

/**
 * Validate user access token
 * @async
 * @param {string} token - User access token to validate
 * @returns {Promise<{valid: boolean, error?: any}>} - A promise that resolves to an object with 'valid' property indicating whether the token is valid and optional 'error' property if an error occurs
 * @throws {Error} - If an error occurs while validating the token
*/
const validateToken$1 = async token => {
  try {
    const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`);
    const data = await response.json();

    // Check if the token is valid
    if (data && data.audience && data.expires_in > 0) {
      return {
        valid: true
      };
    }
    return {
      valid: false,
      error: data
    };
  } catch (error) {
    console.log(error);
  }

  // If the function has not returned true, the token is invalid
  return {
    valid: false,
    error: "validateToken fetch error"
  };
};

/**
 * Get a sharing link for a file
 * @async
 * @param {string} accessToken - User access token
 * @param {string} fileId - File ID to create a sharing link for
 * @returns {Promise<string>} - A promise that resolves to a sharing link URL
 * @throws {Error} - If an error occurs while getting the sharing link
*/
const fileLink$1 = async (accessToken, fileId) => {
  const apiUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?fields=webViewLink`;
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    const failReasonObj = await response.json();
    throw new Error(failReasonObj);
  }
  const data = await response.json();
  return data.webViewLink;
};

/**
 * Add permission to a file in Google Drive
 * @async
 * @param {string} accessToken - User access token
 * @param {string} fileId - File ID to share
 * @param {string} emailAddress - Email address of the recipient
 * @param {string} role - Role of the recipient in the shared file
 * @param {boolean} sendNotificationEmail - Indicates whether to send an email notification to the recipient
 * @param {string} emailMessage - Custom message to include in the email notification
 * @throws {Error} - If an error occurs while adding permission to the file
*/
const drivePermission = async (accessToken, fileId, emailAddress, role, sendNotificationEmail, emailMessage) => {
  // Set the request parameters
  const requestParams = {
    type: "user",
    role,
    emailAddress
  };

  // Call the Drive API to add the permission to the file
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions?sendNotificationEmail=${sendNotificationEmail}&supportsAllDrives=true&emailMessage=${emailMessage}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestParams)
  });
  const data = await response.json();
  if (!response.ok) {
    return {
      success: false,
      error: data
    };
  }
  return {
    success: true
  };
};

/**
 * Share a file with another user by adding permission to it in Google Drive
 * @async
 * @param {Object} params - An object containing required parameters
 * @param {string} params.accessToken - User access token
 * @param {string} params.fileId - File ID to share
 * @param {string} params.emailAddress - Email address of the recipient
 * @param {string} params.role - Role of the recipient in the shared file
 * @param {boolean} params.sendNotificationEmail - Indicates whether to send an email notification to the recipient
 * @param {string} params.emailMessage - Custom message to include in the email notification
 * @throws {Error} - If an error occurs while sharing the file
*/
const shareFile$1 = async params => {
  const {
    accessToken,
    fileId,
    emailAddress,
    role,
    sendNotificationEmail,
    emailMessage
  } = params;
  const shareResult = await drivePermission(accessToken, fileId, emailAddress, role, sendNotificationEmail, emailMessage);
  return shareResult;
};

/**
 * Share a file with another user by generating a sharing link for it
 * @async
 * @param {Object} params - An object containing required parameters
 * @param {string} params.accessToken - User access token
 * @param {string} params.fileId - File ID to share
 * @returns {Promise<string>} - A promise that resolves to a sharing link URL
 * @throws {Error} - If an error occurs while sharing the file
*/
const shareLink$2 = async params => {
  const {
    accessToken,
    fileId
  } = params;
  const link = await fileLink$1(accessToken, fileId);
  return link;
};
var googledrive = {
  shareFile: shareFile$1,
  shareLink: shareLink$2,
  validateToken: validateToken$1
};

/* eslint-disable no-console */

/**
 * Validate user access token
 * @async
 * @param {string} accessToken - User access token to validate
 * @returns {Promise<{valid: boolean}>} - A promise that resolves to an object with 'valid' property indicating whether the token is valid
 * @throws {Error} - If an error occurs while validating the token
*/
const validateToken = async accessToken => {
  const response = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  if (response.ok) {
    // The token is valid
    return {
      valid: true
    };
  }
  // The token is invalid or has expired
  return {
    valid: false
  };
};

/**
 * Share a file with another user using a sharing link
 * @async
 * @param {string} accessToken - User access token
 * @param {string} driveId - Drive ID of the file to share
 * @param {string} fileId - File ID to share
 * @param {string} email - Email address of the recipient
 * @param {boolean} sendInvitation - Indicates whether to send an email invitation to the recipient
 * @param {string} emailMessage - Custom message to include in the email invitation
 * @throws {Error} - If an error occurs while sharing the file
*/
const share$1 = async (accessToken, driveId, fileId, email, sendInvitation, emailMessage) => {
  try {
    // Set the permissions for the sharing link
    const invite = await fetch(`https://graph.microsoft.com/v1.0/drives/${driveId}/items/${fileId}/invite`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        requireSignIn: true,
        sendInvitation,
        roles: ["read"],
        recipients: [{
          email
        }],
        message: emailMessage
      })
    });
    const inviteData = invite.json();
    if (!invite.ok) {
      return {
        success: false,
        error: inviteData
      };
    }
    return {
      success: true
    };
  } catch (error) {
    return {
      success: false,
      error
    };
  }
};

/**
 * Share a file with another user using a sharing link
 * @async
 * @param {Object} params - An object containing required parameters
 * @param {string} params.accessToken - User access token
 * @param {string} params.driveId - Drive ID of the file to share
 * @param {string} params.fileId - File ID to share
 * @param {boolean} params.sendNotificationEmail - Indicates whether to send an email invitation to the recipient
 * @param {string} params.emailAddress - Email address of the recipient
 * @param {string} params.emailMessage - Custom message to include in the email invitation
 * @throws {Error} - If an error occurs while sharing the file
*/
const shareFile = async params => {
  const {
    accessToken,
    driveId,
    fileId,
    sendNotificationEmail,
    emailAddress,
    emailMessage
  } = params;
  const shareResult = await share$1(accessToken, driveId, fileId, emailAddress, sendNotificationEmail, emailMessage);
  return shareResult;
};

/**
 * Get a sharing link for a file
 * @async
 * @param {string} accessToken - User access token
 * @param {string} fileId - File ID to create a sharing link for
 * @param {string} driveId - Drive ID of the file to create a sharing link for
 * @returns {Promise<string>} - A promise that resolves to a sharing link URL
 * @throws {Error} - If an error occurs while getting the sharing link
*/
const fileLink = async (accessToken, fileId, driveId) => {
  const response = await fetch(`https://graph.microsoft.com/v1.0/drives/${driveId}/items/${fileId}/createLink`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "view",
      scope: "users"
    })
  });
  if (!response.ok) {
    throw new Error(`Error creating sharing link: ${response.status} ${response.statusText}`);
  }

  // Get the sharing link URL from the response
  const data = await response.json();
  const linkUrl = data.link.webUrl;
  return linkUrl;
};

/**
 * Get a sharing link for a file
 * @async
 * @param {Object} params - An object containing required parameters
 * @param {string} params.accessToken - User access token
 * @param {string} params.fileId - File ID to create a sharing link for
 * @param {string} params.driveId - Drive ID of the file to create a sharing link for
 * @returns {Promise<string>} - A promise that resolves to a sharing link URL
 * @throws {Error} - If an error occurs while getting the sharing link
*/
const shareLink$1 = async params => {
  const {
    accessToken,
    fileId,
    driveId
  } = params;
  const link = await fileLink(accessToken, fileId, driveId);
  return link;
};
var msonedrives = {
  shareFile,
  shareLink: shareLink$1,
  validateToken
};

/**
 * Creates a share platform driver based on the given platform.
 * @param { platformenum } platform - The name of the share platform to create a driver for.
 * @returns {Object|null} - The share platform driver object, or null if the platform is not recognized.
 */
const create = platform => {
  let drive;
  switch (platform) {
    case platformEnum.GOOGLEDRIVE:
      drive = googledrive;
      break;
    case platformEnum.MSONEDRIVE:
      drive = msonedrives;
      break;
    default:
      drive = null;
  }
  return drive;
};
var Sharefilefactory = {
  /**
   * Creates a share platform driver based on the given platform.
   * @function create
   * @param {string} platform - The name of the share platform to create a driver for.
   * @returns {Object|null} - The share platform driver object, or null if the platform is not recognized.
   */
  create
};

/* eslint-disable no-console */

/**
 * Validate user access token for a specific platform
 * @async
 * @param {platformenum} platform - The platform to validate the token for
 * @param {string} accessToken - User access token to validate
 * @returns {Promise<{valid: boolean}>} - A promise that resolves to an object with 'valid' property indicating whether the token is valid
 * @throws {Error} - If an error occurs while validating the token
*/
const validateAccessToken = async (platform, accessToken) => {
  const validationObject = await platform.validateToken(accessToken);
  return validationObject;
};

/**
 * @param { platformenum } platform The platform where the share will happen
 * @param { Object } params Parameters
 * @param { string } params.accessToken Access token
 * @param { string } params.driveId Drive id (only for MS)
 * @param { string } params.fileId File Id
 * @param { boolean } params.sendNotificationEmail - Indicates whether to send an email invitation to the recipient
 * @param { string } params.emailAddress - Email address of the recipient
 * @param { string } params.emailMessage - Custom message to include in the email invitation
 * @param {boolean} validate - (Optional) A boolean indicating whether to validate the access token. Default is true.
 * @returns {Promise<{valid: boolean}>} - A promise that resolves to an object indicating whether the share was successful
 * @throws {Error} - If an error occurs while sharing the file
*/
const sharefile = async (platform, params, validate = true) => {
  const platformObj = Sharefilefactory.create(platform);
  if (validate) {
    const check = await validateAccessToken(platformObj, params.accessToken);
    if (!check.valid) {
      return {
        success: false,
        error: "access token not valid",
        validationError: check
      };
    }
  }
  const shareResult = await platformObj.shareFile(params);
  return shareResult;
};

/**
 * Get a sharing link for a file on a specific platform
 * @async
 * @param {platformenum} platform - The platform to get the sharing link for
 * @param {Object} params - An object containing required parameters
 * @param {string} params.accessToken - User access token
 * @param {string} params.fileId - File ID to create a sharing link for
 * @param { string } params.driveId Drive id (only for MS)
 * @param {boolean} validate - (Optional) A boolean indicating whether to validate the access token. Default is true.
 * @returns {Promise<string>} - A promise that resolves to a sharing link URL
 * @throws {Error} - If an error occurs while getting the sharing link
*/
const shareLink = async (platform, params, validate = true) => {
  const platformObj = Sharefilefactory.create(platform);
  if (validate) {
    const check = await validateAccessToken(platformObj, params.accessToken);
    if (!check.valid) {
      return check;
    }
  }
  const link = await platformObj.shareLink(params);
  return link;
};
const thShare = {
  platformenum: platformEnum,
  sharefile,
  shareLink
};
const initialise$1 = async () => {
  let minutes = 0;
  let seconds = 0;
  let timer;
  const audioRecorder = document.querySelector("#rw-record-audio");
  const audioPlayback = document.querySelector("#rw-playback-audio");
  const stopButton = document.querySelector("#rw-stop");
  const timerEl = document.querySelector("#rw-timer");
  const sendToTeacher = document.querySelector("#rw-send-to-teacher");
  const player = document.querySelector("#practice-read-aloud-preview-audio");
  const updateTimer = () => {
    seconds += 1;
    if (seconds === 60) {
      minutes += 1;
      seconds = 0;
    }
    const timeString = `${minutes.toString().padStart(2, "0")} :${seconds.toString().padStart(2, "0")}`;
    timerEl.textContent = timeString;
  };
  const resetTimer = () => {
    clearInterval(timer);
    minutes = 0;
    seconds = 0;
    timerEl.textContent = "00:00";
  };
  const startTimer = () => {
    timer = setInterval(updateTimer, 1000);
  };
  const recordListener = () => {
    if (document.querySelector(".rw-record-panel").dataset.disabled === "true") {
      return;
    }
    if (!window.thPra.audioRecorder) {
      window.thPra.audioRecorder = new AudioRecorder();
    }
    switch (window.thPra.audioRecorder.getState()) {
      case "inactive":
      case "init":
        window.thPra.audioRecorder.startRecording();
        audioRecorder.querySelector("svg").classList.add("rw-record-animated");
        audioPlayback.classList.remove("disabled");
        audioPlayback.classList.add("rw-display-none");
        audioPlayback.nextElementSibling.classList.add("rw-display-none");
        sendToTeacher.classList.add("rw-display-none");
        stopButton.classList.remove("rw-display-none");
        stopButton.nextElementSibling.classList.remove("rw-display-none");
        timerEl.classList.remove("rw-display-none");
        startTimer();
        break;
    }
  };
  const stopRecording = () => {
    resetTimer();
    stopButton.classList.add("rw-display-none");
    stopButton.nextElementSibling.classList.add("rw-display-none");
    audioPlayback.classList.remove("rw-display-none");
    audioPlayback.nextElementSibling.classList.remove("rw-display-none");
    timerEl.classList.add("rw-display-none");
    sendToTeacher.classList.remove("rw-display-none");
    audioRecorder.classList.remove("disabled");
    audioRecorder.querySelector("svg").classList.remove("rw-record-animated");
    window.thPra.audioRecorder.stopRecording();
  };
  const stopPlayback = () => {
    resetTimer();
    stopRecording();
    if (!player.paused) {
      player.currentTime = 0;
      player.pause();
    }
  };
  const stopListener = () => {
    const state = window.thPra.audioRecorder.getState();
    if (state === "recording") {
      stopRecording();
      sendToTeacher.classList.remove("disabled");
    } else {
      stopPlayback();
    }
  };
  const playbackEnded = () => {
    stopPlayback();
  };
  const playListener = () => {
    if (document.querySelector(".rw-record-panel").dataset.disabled === "true") {
      return;
    }
    if (!window.thPra.audioRecorder || !window.thPra.audioRecorder.finished) {
      return;
    }
    audioPlayback.classList.add("rw-display-none");
    audioPlayback.nextElementSibling.classList.add("rw-display-none");
    stopButton.classList.remove("rw-display-none");
    audioRecorder.classList.add("disabled");
    sendToTeacher.classList.add("rw-display-none");
    timerEl.classList.remove("rw-display-none");
    startTimer();
    player.setAttribute("src", window.thPra.audioRecorder.getAudioUrl());
    player.play();
  };

  // Event listeners
  audioRecorder.addEventListener("pointerup", recordListener);
  stopButton.addEventListener("pointerup", stopListener);
  audioPlayback.addEventListener("pointerup", playListener);
  player.addEventListener("ended", playbackEnded);
};
var AudioPage = {
  initialise: initialise$1
};
const googlePraScopes = ["https://www.googleapis.com/auth/drive.apps.readonly", "https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/drive.appdata", "https://www.googleapis.com/auth/drive.file"];
const msPraScopes = ["user.read", "files.readwrite"];

// eslint-disable-next-line import/prefer-default-export
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */

const displayMessage = async message => {
  const messageOverlay = document.querySelector(".message-overlay");
  const messageConteiner = messageOverlay.querySelector(".message");
  messageConteiner.textContent = message;
  messageOverlay.classList.remove("rw-display-none");
  await new Promise(resolve => {
    setTimeout(resolve, 3000);
  });
  messageOverlay.classList.add("rw-display-none");
  messageConteiner.textContent = "";
};
const getAccessTokenFromServiceWorker = async loginType => {
  const accessToken = await chrome.runtime.sendMessage({
    command: "swGetAndValidateAccessToken",
    authType: loginType === thShare.platformenum.GOOGLEDRIVE ? "Google" : "Microsoft",
    scopes: loginType === thShare.platformenum.GOOGLEDRIVE ? googlePraScopes : msPraScopes
  });
  if (typeof accessToken === "string") {
    return {
      accessToken
    };
  }
  return accessToken;
};

/* eslint-disable no-undef */

const getDataForShare = async () => {
  const {
    accessToken,
    error
  } = await getAccessTokenFromServiceWorker(window.thPra.loginType);
  const {
    driveId,
    fileId
  } = document.querySelector(".share-dialog").dataset;
  return {
    accessToken,
    fileId,
    driveId,
    error
  };
};
const disableButtons = disable => {
  const shareButton = document.querySelector("#sharebutton");
  const copyLinkButton = document.querySelector("#copyLink");
  shareButton.disabled = disable;
  copyLinkButton.disabled = disable;
};
const shareFileProcess = async (accessToken, fileId, driveId) => {
  disableButtons(true);
  const sharePanel = document.querySelector(".share-dialog");
  const emailAddress = purify.sanitize(document.querySelector("#emailAddress").value);
  const role = "reader";
  const sendNotificationEmail = document.querySelector("#sendNotificationEmail").checked;
  const title = document.querySelector(".rw-header-text").textContent;
  const emailMessage = `Your student just recorded themselves reading and wanted to share it with you.

    Document Title: ${title}
    Document Url: ${window.thPra.url}
    
    Message: ${purify.sanitize(document.querySelector("#emailMessage").value)}`;
  const shareResult = await thShare.sharefile(window.thPra.loginType, {
    accessToken,
    fileId,
    emailAddress,
    role,
    sendNotificationEmail,
    emailMessage,
    driveId
  });
  sharePanel.classList.add("rw-display-none");
  if (shareResult.success === false) {
    await displayMessage("Could not share your audio recording. Please try again later");
  } else if (shareResult.success === true) {
    await displayMessage("Successfully shared your audio recording");
  }
};
const clearShare = () => {
  document.querySelector("#emailAddress").value = "";
  document.querySelector("#sendNotificationEmail").checked = true;
  document.querySelector("#emailMessage").value = "";
  document.querySelector("#emailMessage").classList.remove("rw-display-none");
  document.querySelector(".rw-record-panel").dataset.disabled = false;
};
const share = async e => {
  if (e.target.disabled) {
    return;
  }
  const {
    accessToken,
    fileId,
    driveId,
    error
  } = await getDataForShare();
  await shareFileProcess(accessToken, fileId, driveId);
  clearShare();
};
const cancel = async () => {
  document.querySelector(".share-dialog").classList.add("rw-display-none");
  clearShare();
};
const copyLink = async e => {
  if (e.target.disabled || e.target.closest("button").disabled) {
    return;
  }
  const {
    accessToken,
    fileId,
    driveId,
    error
  } = await getDataForShare();
  await shareFileProcess(accessToken, fileId, driveId);
  const link = await thShare.shareLink(window.thPra.loginType, {
    accessToken,
    fileId,
    driveId
  });
  navigator.clipboard.writeText(link);
  clearShare();
};
const initialise = async () => {
  const copyLinkButton = document.querySelector("#copyLink");
  copyLinkButton.addEventListener("pointerup", copyLink);
  const shareButton = document.querySelector("#sharebutton");
  shareButton.addEventListener("pointerup", share);
  const cancelButton = document.querySelector("#calncelbutton");
  cancelButton.addEventListener("pointerup", cancel);
  const sendMessageCheckbox = document.querySelector("#sendNotificationEmail");
  const sendMessageText = document.querySelector("#emailMessage");
  sendMessageCheckbox.addEventListener("change", e => {
    if (e.target.checked) {
      sendMessageText.classList.remove("rw-display-none");
    } else {
      sendMessageText.classList.add("rw-display-none");
    }
  });

  // #region email field
  const emailAddressElement = document.querySelector("#emailAddress");
  const validateEmail = e => {
    const {
      valid
    } = e.target.validity;
    if (!valid || e.target.value === "") {
      shareButton.disabled = true;
      copyLinkButton.disabled = true;
    } else {
      shareButton.disabled = false;
      copyLinkButton.disabled = false;
    }
  };
  emailAddressElement.addEventListener("input", validateEmail);
  // #endregion
};

var SharePage = {
  share,
  copyLink,
  initialise
};

/* eslint-disable no-undef */

const onMessageHandler = async (message, sender) => {
  if (chrome.runtime.id === sender.id && message.command && message.command === "th-practicereadingaloud") {
    document.querySelector(".rw-header-text").textContent = purify.sanitize(message.data.documentTitle);
    document.querySelector("#sharetitle").textContent = `"${purify.sanitize(message.data.documentTitle)}"`;
    document.querySelector(".rw-record-body").innerHTML = purify.sanitize(message.data.html);
    window.thPra = window.thPra || {};
    const loginType = message.data.loginType === "google" ? thShare.platformenum.GOOGLEDRIVE : thShare.platformenum.MSONEDRIVE;
    window.thPra.loginType = loginType;
    window.thPra.url = message.data.url;
  }
};
chrome.runtime.onMessage.addListener(onMessageHandler);
document.addEventListener("DOMContentLoaded", () => {
  SharePage.initialise();
  AudioPage.initialise();
  const handleAccountChange = event => {
    const loginType = event.detail.login.toLowerCase() === "google" ? thShare.platformenum.GOOGLEDRIVE : thShare.platformenum.MSONEDRIVE;
    window.thPra.loginType = loginType;
  };
  const handleToolbarStateChange = async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 100);
    });
    const toolbar = document.querySelector("gw-toolbar");
    const header = document.querySelector("h1");
    const toolbarHeight = toolbar ? toolbar.getBoundingClientRect().height : 0;
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    // eslint-disable-next-line no-nested-ternary
    document.querySelector(".rw-record-body").setAttribute("style", `height: calc(100vh - ${toolbarHeight + headerHeight + 30}px);`);
  };
  document.addEventListener("th-account-changed", handleAccountChange);
  document.body.addEventListener("th-toolbar-state", handleToolbarStateChange);
  window.addEventListener("resize", handleToolbarStateChange);
  const sendToTeacher = document.querySelector("#rw-send-to-teacher");
  const sendToTeacherListener = async () => {
    if (sendToTeacher.hasAttribute("disabled") || document.querySelector(".rw-record-panel").dataset.disabled === "true") {
      return;
    }
    const sharePanel = document.querySelector(".share-dialog");
    const audioPanel = document.querySelector(".rw-record-panel");
    const overlay = document.querySelector(".overlay");
    overlay.classList.remove("rw-display-none");
    const {
      accessToken,
      error
    } = await getAccessTokenFromServiceWorker(window.thPra.loginType);
    if (error) {
      overlay.classList.add("rw-display-none");
      displayMessage("Please make sure that you grant us the necessary permissions and try again.");
      console.log(error);
      return;
    }
    const blob = window.thPra.audioRecorder.getBlob();
    const title = `${encodeURIComponent(document.querySelector(".rw-header-text").textContent.replace(/ /g, "_"))}.ogg`;
    const uploadResult = await fileuploader.uploadFile(blob, title, "Texthelp", "PracticeReadingAloud", accessToken, null, window.thPra.loginType);
    if (!uploadResult || uploadResult.fileId === null) {
      // upload ran into an error
      overlay.classList.add("rw-display-none");
      displayMessage("Error happened at upload time");
      console.log(uploadResult);
      return;
    }
    sharePanel.dataset.fileId = uploadResult.fileId;
    if (uploadResult.driveId) {
      sharePanel.dataset.driveId = uploadResult.driveId;
    }
    overlay.classList.add("rw-display-none");
    sharePanel.classList.remove("rw-display-none");
    audioPanel.dataset.disabled = true;
  };

  // Event listeners
  sendToTeacher.addEventListener("pointerup", sendToTeacherListener);
});
window.thPra = window.thPra || {};
window.thPra.audioRecorder = window.thPra.AudioRecorder || new AudioRecorder();
