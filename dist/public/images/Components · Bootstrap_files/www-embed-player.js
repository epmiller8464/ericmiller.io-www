"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  var l;function aa(a, b) {
    function c() {}
    c.prototype = b.prototype;a.A = b.prototype;a.prototype = new c();a.prototype.constructor = a;for (var d in b) {
      if (Object.defineProperties) {
        var e = Object.getOwnPropertyDescriptor(b, d);e && Object.defineProperty(a, d, e);
      } else a[d] = b[d];
    }
  }
  var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value);
  },
      ca = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this;
  function da(a, b) {
    if (b) {
      for (var c = ca, d = a.split("."), e = 0; e < d.length - 1; e++) {
        var f = d[e];f in c || (c[f] = {});c = c[f];
      }d = d[d.length - 1];e = c[d];f = b(e);f != e && null != f && ba(c, d, { configurable: !0, writable: !0, value: f });
    }
  }
  da("String.prototype.startsWith", function (a) {
    return a ? a : function (a, c) {
      if (null == this) throw new TypeError("The 'this' value for String.prototype.startsWith must not be null or undefined");if (a instanceof RegExp) throw new TypeError("First argument to String.prototype.startsWith must not be a regular expression");var b = this + "";a += "";for (var e = b.length, f = a.length, g = Math.max(0, Math.min(c | 0, b.length)), h = 0; h < f && g < e;) {
        if (b[g++] != a[h++]) return !1;
      }return h >= f;
    };
  });
  var ea = "function" == typeof Object.create ? Object.create : function (a) {
    function b() {}
    b.prototype = a;return new b();
  },
      ha = "undefined" != typeof Reflect && Reflect.construct || function (a, b, c) {
    void 0 === c && (c = a);
    c = ea(c.prototype || Object.prototype);return Function.prototype.apply.call(a, c, b) || c;
  };
  da("Reflect.construct", function (a) {
    return a || ha;
  });
  var n = this;function p(a) {
    return void 0 !== a;
  }
  function q(a) {
    return "string" == typeof a;
  }
  function r(a, b, c) {
    a = a.split(".");c = c || n;a[0] in c || !c.execScript || c.execScript("var " + a[0]);for (var d; a.length && (d = a.shift());) {
      !a.length && p(b) ? c[d] = b : c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {};
    }
  }
  function t(a, b) {
    for (var c = a.split("."), d = b || n, e; e = c.shift();) {
      if (null != d[e]) d = d[e];else return null;
    }return d;
  }
  function u() {}
  function ia(a) {
    a.na = void 0;a.getInstance = function () {
      return a.na ? a.na : a.na = new a();
    };
  }
  function ja(a) {
    var b = typeof a === "undefined" ? "undefined" : _typeof(a);if ("object" == b) {
      if (a) {
        if (a instanceof Array) return "array";if (a instanceof Object) return b;var c = Object.prototype.toString.call(a);if ("[object Window]" == c) return "object";if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function";
      } else return "null";
    } else if ("function" == b && "undefined" == typeof a.call) return "object";return b;
  }
  function ka(a) {
    return "array" == ja(a);
  }
  function la(a) {
    var b = ja(a);return "array" == b || "object" == b && "number" == typeof a.length;
  }
  function ma(a) {
    return "function" == ja(a);
  }
  function na(a) {
    var b = typeof a === "undefined" ? "undefined" : _typeof(a);return "object" == b && null != a || "function" == b;
  }
  var oa = "closure_uid_" + (1E9 * Math.random() >>> 0),
      pa = 0;function qa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function ra(a, b, c) {
    if (!a) throw Error();if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);return function () {
        var c = Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c, d);return a.apply(b, c);
      };
    }return function () {
      return a.apply(b, arguments);
    };
  }
  function v(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? v = qa : v = ra;return v.apply(null, arguments);
  }
  function w(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);return function () {
      var b = c.slice();b.push.apply(b, arguments);return a.apply(this, b);
    };
  }
  var x = Date.now || function () {
    return +new Date();
  };
  function z(a, b) {
    function c() {}
    c.prototype = b.prototype;a.A = b.prototype;a.prototype = new c();a.prototype.constructor = a;a.ob = function (a, c, f) {
      for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) {
        d[e - 2] = arguments[e];
      }return b.prototype[c].apply(a, d);
    };
  }
  ;var sa = document,
      A = window;function B(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, B);else {
      var b = Error().stack;b && (this.stack = b);
    }a && (this.message = String(a));
  }
  z(B, Error);B.prototype.name = "CustomError";var ua = String.prototype.trim ? function (a) {
    return a.trim();
  } : function (a) {
    return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
  };
  function va(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  function wa(a) {
    for (var b = 0, c = 0; c < a.length; ++c) {
      b = 31 * b + a.charCodeAt(c) >>> 0;
    }return b;
  }
  ;var xa = Array.prototype.indexOf ? function (a, b, c) {
    return Array.prototype.indexOf.call(a, b, c);
  } : function (a, b, c) {
    c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
    if (q(a)) return q(b) && 1 == b.length ? a.indexOf(b, c) : -1;for (; c < a.length; c++) {
      if (c in a && a[c] === b) return c;
    }return -1;
  },
      C = Array.prototype.forEach ? function (a, b, c) {
    Array.prototype.forEach.call(a, b, c);
  } : function (a, b, c) {
    for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++) {
      f in e && b.call(c, e[f], f, a);
    }
  },
      ya = Array.prototype.map ? function (a, b, c) {
    return Array.prototype.map.call(a, b, c);
  } : function (a, b, c) {
    for (var d = a.length, e = Array(d), f = q(a) ? a.split("") : a, g = 0; g < d; g++) {
      g in f && (e[g] = b.call(c, f[g], g, a));
    }return e;
  };
  function za(a, b) {
    a: {
      var c = a.length;for (var d = q(a) ? a.split("") : a, e = 0; e < c; e++) {
        if (e in d && b.call(void 0, d[e], e, a)) {
          c = e;break a;
        }
      }c = -1;
    }return 0 > c ? null : q(a) ? a.charAt(c) : a[c];
  }
  function Aa(a, b) {
    var c = xa(a, b);0 <= c && Array.prototype.splice.call(a, c, 1);
  }
  function Ba(a) {
    var b = a.length;if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) {
        c[d] = a[d];
      }return c;
    }return [];
  }
  function Ca(a, b) {
    for (var c = 1; c < arguments.length; c++) {
      var d = arguments[c];if (la(d)) {
        var e = a.length || 0,
            f = d.length || 0;a.length = e + f;for (var g = 0; g < f; g++) {
          a[e + g] = d[g];
        }
      } else a.push(d);
    }
  }
  ;function Da(a, b) {
    this.b = p(a) ? a : 0;this.f = p(b) ? b : 0;
  }
  Da.prototype.equals = function (a) {
    return a instanceof Da && (this == a ? !0 : this && a ? this.b == a.b && this.f == a.f : !1);
  };
  Da.prototype.ceil = function () {
    this.b = Math.ceil(this.b);this.f = Math.ceil(this.f);return this;
  };
  Da.prototype.floor = function () {
    this.b = Math.floor(this.b);this.f = Math.floor(this.f);return this;
  };
  Da.prototype.round = function () {
    this.b = Math.round(this.b);this.f = Math.round(this.f);return this;
  };function Ea(a, b) {
    this.width = a;this.height = b;
  }
  l = Ea.prototype;l.aspectRatio = function () {
    return this.width / this.height;
  };
  l.isEmpty = function () {
    return !(this.width * this.height);
  };
  l.ceil = function () {
    this.width = Math.ceil(this.width);this.height = Math.ceil(this.height);return this;
  };
  l.floor = function () {
    this.width = Math.floor(this.width);this.height = Math.floor(this.height);return this;
  };
  l.round = function () {
    this.width = Math.round(this.width);this.height = Math.round(this.height);return this;
  };function Fa(a, b) {
    for (var c = la(b), d = c ? b : arguments, c = c ? 0 : 1; c < d.length && (a = a[d[c]], p(a)); c++) {}return a;
  }
  function Ga(a) {
    var b = Ha,
        c;for (c in b) {
      if (a.call(void 0, b[c], c, b)) return c;
    }
  }
  function Ia(a) {
    for (var b in a) {
      return !1;
    }return !0;
  }
  function Ja(a, b) {
    if (null !== a && b in a) throw Error('The object already contains the key "' + b + '"');a[b] = !0;
  }
  function Ka(a) {
    var b = {},
        c;for (c in a) {
      b[c] = a[c];
    }return b;
  }
  var La = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ma(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
      d = arguments[e];for (c in d) {
        a[c] = d[c];
      }for (var f = 0; f < La.length; f++) {
        c = La[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
      }
    }
  }
  ;function Na(a) {
    Na[" "](a);return a;
  }
  Na[" "] = u;function Oa(a, b) {
    var c = Pa;return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a);
  }
  ;function Qa() {
    var a = Ra;try {
      var b;if (b = !!a && null != a.location.href) a: {
        try {
          Na(a.foo);b = !0;break a;
        } catch (c) {}b = !1;
      }return b;
    } catch (c) {
      return !1;
    }
  }
  ;var Sa = function () {
    var a = !1;try {
      var b = Object.defineProperty({}, "passive", { get: function get() {
          a = !0;
        } });
      n.addEventListener("test", null, b);
    } catch (c) {}return a;
  }();var Ta = !1,
      Ua = "";function Va(a) {
    a = a.match(/[\d]+/g);if (!a) return "";a.length = 3;return a.join(".");
  }
  (function () {
    if (navigator.plugins && navigator.plugins.length) {
      var a = navigator.plugins["Shockwave Flash"];if (a && (Ta = !0, a.description)) {
        Ua = Va(a.description);return;
      }if (navigator.plugins["Shockwave Flash 2.0"]) {
        Ta = !0;Ua = "2.0.0.11";return;
      }
    }if (navigator.mimeTypes && navigator.mimeTypes.length && (a = navigator.mimeTypes["application/x-shockwave-flash"], Ta = !(!a || !a.enabledPlugin))) {
      Ua = Va(a.enabledPlugin.description);return;
    }try {
      var b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");Ta = !0;Ua = Va(b.GetVariable("$version"));
      return;
    } catch (c) {}try {
      b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");Ta = !0;Ua = "6.0.21";return;
    } catch (c) {}try {
      b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), Ta = !0, Ua = Va(b.GetVariable("$version"));
    } catch (c) {}
  })();
  var Wa = Ta,
      Xa = Ua;var E;a: {
    var Ya = n.navigator;if (Ya) {
      var Za = Ya.userAgent;if (Za) {
        E = Za;break a;
      }
    }E = "";
  }function F(a) {
    return -1 != E.indexOf(a);
  }
  ;function $a() {
    return (F("Chrome") || F("CriOS")) && !F("Edge");
  }
  ;function ab() {
    return F("iPhone") && !F("iPod") && !F("iPad");
  }
  ;var bb = F("Opera"),
      cb = F("Trident") || F("MSIE"),
      db = F("Edge"),
      eb = F("Gecko") && !(-1 != E.toLowerCase().indexOf("webkit") && !F("Edge")) && !(F("Trident") || F("MSIE")) && !F("Edge"),
      fb = -1 != E.toLowerCase().indexOf("webkit") && !F("Edge"),
      gb = F("Macintosh"),
      hb = F("Windows"),
      ib = F("Android"),
      jb = ab(),
      kb = F("iPad"),
      lb = F("iPod");function mb() {
    var a = n.document;return a ? a.documentMode : void 0;
  }
  var nb;a: {
    var ob = "",
        pb = function () {
      var a = E;if (eb) return (/rv\:([^\);]+)(\)|;)/.exec(a)
      );if (db) return (/Edge\/([\d\.]+)/.exec(a)
      );if (cb) return (/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a)
      );if (fb) return (/WebKit\/(\S+)/.exec(a)
      );if (bb) return (/(?:Version)[ \/]?(\S+)/.exec(a)
      );
    }();
    pb && (ob = pb ? pb[1] : "");if (cb) {
      var qb = mb();if (null != qb && qb > parseFloat(ob)) {
        nb = String(qb);break a;
      }
    }nb = ob;
  }var rb = nb,
      Pa = {};
  function sb(a) {
    return Oa(a, function () {
      for (var b = 0, c = ua(String(rb)).split("."), d = ua(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
        var g = c[f] || "",
            h = d[f] || "";do {
          g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];if (0 == g[0].length && 0 == h[0].length) break;b = va(0 == g[1].length ? 0 : parseInt(g[1], 10), 0 == h[1].length ? 0 : parseInt(h[1], 10)) || va(0 == g[2].length, 0 == h[2].length) || va(g[2], h[2]);g = g[3];h = h[3];
        } while (0 == b);
      }return 0 <= b;
    });
  }
  var tb;var ub = n.document;tb = ub && cb ? mb() || ("CSS1Compat" == ub.compatMode ? parseInt(rb, 10) : 5) : void 0;(function () {
    if (hb) {
      var a = /Windows NT ([0-9.]+)/;return (a = a.exec(E)) ? a[1] : "0";
    }return gb ? (a = /10[_.][0-9_.]+/, (a = a.exec(E)) ? a[0].replace(/_/g, ".") : "10") : ib ? (a = /Android\s+([^\);]+)(\)|;)/, (a = a.exec(E)) ? a[1] : "") : jb || kb || lb ? (a = /(?:iPhone|CPU)\s+OS\s+(\S+)/, (a = a.exec(E)) ? a[1].replace(/_/g, ".") : "") : "";
  })();var vb = F("Firefox"),
      wb = ab() || F("iPod"),
      xb = F("iPad"),
      yb = F("Android") && !($a() || F("Firefox") || F("Opera") || F("Silk")),
      zb = $a(),
      Ab = F("Safari") && !($a() || F("Coast") || F("Opera") || F("Edge") || F("Silk") || F("Android")) && !(ab() || F("iPad") || F("iPod"));function Bb(a) {
    return (a = a.exec(E)) ? a[1] : "";
  }
  (function () {
    if (vb) return Bb(/Firefox\/([0-9.]+)/);if (cb || db || bb) return rb;if (zb) return ab() || F("iPad") || F("iPod") ? Bb(/CriOS\/([0-9.]+)/) : Bb(/Chrome\/([0-9.]+)/);if (Ab && !(ab() || F("iPad") || F("iPod"))) return Bb(/Version\/([0-9.]+)/);if (wb || xb) {
      var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(E);if (a) return a[1] + "." + a[2];
    } else if (yb) return (a = Bb(/Android\s+([0-9.]+)/)) ? a : Bb(/Version\/([0-9.]+)/);return "";
  })();!eb && !cb || cb && 9 <= Number(tb) || eb && sb("1.9.1");cb && sb("9");function Cb() {
    this.b = "";this.f = Db;
  }
  Cb.prototype.ma = !0;Cb.prototype.la = function () {
    return this.b;
  };
  var Db = {};function Eb() {
    this.b = "";this.f = Fb;
  }
  Eb.prototype.ma = !0;Eb.prototype.la = function () {
    return this.b;
  };
  function Gb(a) {
    return a instanceof Eb && a.constructor === Eb && a.f === Fb ? a.b : "type_error:SafeUrl";
  }
  var Hb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;function Ib(a) {
    if (a instanceof Eb) return a;a = a.ma ? a.la() : String(a);Hb.test(a) || (a = "about:invalid#zClosurez");return Jb(a);
  }
  var Fb = {};function Jb(a) {
    var b = new Eb();b.b = a;return b;
  }
  Jb("about:blank");function Kb() {
    this.b = "";
  }
  Kb.prototype.ma = !0;Kb.prototype.la = function () {
    return this.b;
  };
  function Lb(a) {
    var b = new Kb();b.b = a;return b;
  }
  Lb("<!DOCTYPE html>");Lb("");Lb("<br>");function Mb(a, b) {
    var c = b instanceof Eb ? b : Ib(b);a.href = Gb(c);
  }
  ;function Nb(a) {
    var b = document;return q(a) ? b.getElementById(a) : a;
  }
  function Ob(a) {
    if (!a) return null;if (a.firstChild) return a.firstChild;for (; a && !a.nextSibling;) {
      a = a.parentNode;
    }return a ? a.nextSibling : null;
  }
  function Pb(a) {
    if (!a) return null;if (!a.previousSibling) return a.parentNode;for (a = a.previousSibling; a && a.lastChild;) {
      a = a.lastChild;
    }return a;
  }
  function Qb(a, b) {
    for (var c = 0; a;) {
      if (b(a)) return a;a = a.parentNode;c++;
    }return null;
  }
  ;function Rb(a) {
    Sb();var b = new Cb();b.b = a;return b;
  }
  var Sb = u;function Tb(a) {
    "number" == typeof a && (a = Math.round(a) + "px");return a;
  }
  ;var Ub = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function H(a) {
    return a.match(Ub);
  }
  function Vb(a) {
    return a ? decodeURI(a) : a;
  }
  function Wb(a, b, c) {
    if (ka(b)) for (var d = 0; d < b.length; d++) {
      Wb(a, String(b[d]), c);
    } else null != b && c.push(a + ("" === b ? "" : "=" + encodeURIComponent(String(b))));
  }
  function Xb(a) {
    var b = [],
        c;for (c in a) {
      Wb(c, a[c], b);
    }return b.join("&");
  }
  function Yb(a, b) {
    var c = Xb(b);if (c) {
      var d = a.indexOf("#");0 > d && (d = a.length);var e = a.indexOf("?");if (0 > e || e > d) {
        e = d;var f = "";
      } else f = a.substring(e + 1, d);d = [a.substr(0, e), f, a.substr(d)];e = d[1];d[1] = c ? e ? e + "&" + c : c : e;c = d[0] + (d[1] ? "?" + d[1] : "") + d[2];
    } else c = a;return c;
  }
  ;var Zb = !!window.google_async_iframe_id,
      Ra = Zb && window.parent || window;function $b(a, b) {
    var c = ac();this.label = a;this.type = b;this.value = c;this.duration = 0;this.uniqueId = this.label + "_" + this.type + "_" + Math.random();
  }
  ;function bc(a, b) {
    this.events = [];this.f = b || n;var c = null;b && (b.google_js_reporting_queue = b.google_js_reporting_queue || [], this.events = b.google_js_reporting_queue, c = b.google_measure_js_timing);a: {
      try {
        var d = (this.f || n).top.location.hash;if (d) {
          var e = d.match(/\bdeid=([\d,]+)/);var f = e && e[1] || "";break a;
        }
      } catch (g) {}f = "";
    }f = f.indexOf && 0 <= f.indexOf("1337");this.b = (this.b = null != c ? c : Math.random() < a) || f;c = this.f.performance;this.g = !!(c && c.mark && c.clearMarks && f);
  }
  bc.prototype.i = function (a) {
    if (a && this.g) {
      var b = this.f.performance;b.clearMarks("goog_" + a.uniqueId + "_start");b.clearMarks("goog_" + a.uniqueId + "_end");
    }
  };
  bc.prototype.start = function (a, b) {
    if (!this.b) return null;var c = new $b(a, b);this.g && this.f.performance.mark("goog_" + c.uniqueId + "_start");return c;
  };
  bc.prototype.end = function (a) {
    this.b && (a.duration = ac() - a.value, this.g && this.f.performance.mark("goog_" + a.uniqueId + "_end"), this.b && this.events.push(a));
  };
  function ac() {
    var a = n.performance;return a && a.now ? a.now() : x();
  }
  ;if (Zb && !Qa()) {
    var cc = "." + sa.domain;try {
      for (; 2 < cc.split(".").length && !Qa();) {
        sa.domain = cc = cc.substr(cc.indexOf(".") + 1), Ra = window.parent;
      }
    } catch (a) {}Qa() || (Ra = window);
  }var dc = Ra,
      I = new bc(1, dc);function ec() {
    dc.google_measure_js_timing || (I.events != I.f.google_js_reporting_queue && (I.events.length = 0, I.g && C(I.events, I.i, I)), I.b = !1);
  }
  if ("complete" == dc.document.readyState) ec();else if (I.b) {
    var fc = function fc() {
      ec();
    };
    dc.addEventListener ? dc.addEventListener("load", fc, Sa ? void 0 : !1) : dc.attachEvent && dc.attachEvent("onload", fc);
  };var gc = new Date().getTime();function hc(a) {
    if (!a) return "";a = a.split("#")[0].split("?")[0];a = a.toLowerCase();0 == a.indexOf("//") && (a = window.location.protocol + a);/^[\w\-]*:\/\//.test(a) || (a = window.location.href);var b = a.substring(a.indexOf("://") + 3),
        c = b.indexOf("/");-1 != c && (b = b.substring(0, c));a = a.substring(0, a.indexOf("://"));if ("http" !== a && "https" !== a && "chrome-extension" !== a && "file" !== a && "android-app" !== a && "chrome-search" !== a) throw Error("Invalid URI scheme in origin");var c = "",
        d = b.indexOf(":");if (-1 != d) {
      var e = b.substring(d + 1),
          b = b.substring(0, d);if ("http" === a && "80" !== e || "https" === a && "443" !== e) c = ":" + e;
    }return a + "://" + b + c;
  }
  ; /*
    gapi.loader.OBJECT_CREATE_TEST_OVERRIDE &&*/
  var ic = window,
      jc = document,
      kc = ic.location;function lc() {}
  var mc = /\[native code\]/;function J(a, b, c) {
    return a[b] = a[b] || c;
  }
  function nc(a) {
    a = a.sort();for (var b = [], c = void 0, d = 0; d < a.length; d++) {
      var e = a[d];e != c && b.push(e);c = e;
    }return b;
  }
  function K() {
    var a;if ((a = Object.create) && mc.test(a)) a = a(null);else {
      a = {};for (var b in a) {
        a[b] = void 0;
      }
    }return a;
  }
  var oc = J(ic, "gapi", {});var L;L = J(ic, "___jsl", K());J(L, "I", 0);J(L, "hel", 10);function pc() {
    var a = kc.href;if (L.dpo) var b = L.h;else {
      b = L.h;var c = RegExp("([#].*&|[#])jsh=([^&#]*)", "g"),
          d = RegExp("([?#].*&|[?#])jsh=([^&#]*)", "g");if (a = a && (c.exec(a) || d.exec(a))) try {
        b = decodeURIComponent(a[2]);
      } catch (e) {}
    }return b;
  }
  function qc(a) {
    var b = J(L, "PQ", []);L.PQ = [];var c = b.length;if (0 === c) a();else for (var d = 0, e = function e() {
      ++d === c && a();
    }, f = 0; f < c; f++) {
      b[f](e);
    }
  }
  function rc(a) {
    return J(J(L, "H", K()), a, K());
  }
  ;function sc() {
    function a() {
      e[0] = 1732584193;e[1] = 4023233417;e[2] = 2562383102;e[3] = 271733878;e[4] = 3285377520;y = m = 0;
    }
    function b(a) {
      for (var b = g, c = 0; 64 > c; c += 4) {
        b[c / 4] = a[c] << 24 | a[c + 1] << 16 | a[c + 2] << 8 | a[c + 3];
      }for (c = 16; 80 > c; c++) {
        a = b[c - 3] ^ b[c - 8] ^ b[c - 14] ^ b[c - 16], b[c] = (a << 1 | a >>> 31) & 4294967295;
      }a = e[0];for (var d = e[1], f = e[2], h = e[3], k = e[4], m, D, c = 0; 80 > c; c++) {
        40 > c ? 20 > c ? (m = h ^ d & (f ^ h), D = 1518500249) : (m = d ^ f ^ h, D = 1859775393) : 60 > c ? (m = d & f | h & (d | f), D = 2400959708) : (m = d ^ f ^ h, D = 3395469782), m = ((a << 5 | a >>> 27) & 4294967295) + m + k + D + b[c] & 4294967295, k = h, h = f, f = (d << 30 | d >>> 2) & 4294967295, d = a, a = m;
      }e[0] = e[0] + a & 4294967295;e[1] = e[1] + d & 4294967295;e[2] = e[2] + f & 4294967295;
      e[3] = e[3] + h & 4294967295;e[4] = e[4] + k & 4294967295;
    }
    function c(a, c) {
      if ("string" === typeof a) {
        a = unescape(encodeURIComponent(a));for (var d = [], e = 0, g = a.length; e < g; ++e) {
          d.push(a.charCodeAt(e));
        }a = d;
      }c || (c = a.length);d = 0;if (0 == m) for (; d + 64 < c;) {
        b(a.slice(d, d + 64)), d += 64, y += 64;
      }for (; d < c;) {
        if (f[m++] = a[d++], y++, 64 == m) for (m = 0, b(f); d + 64 < c;) {
          b(a.slice(d, d + 64)), d += 64, y += 64;
        }
      }
    }
    function d() {
      var a = [],
          d = 8 * y;56 > m ? c(h, 56 - m) : c(h, 64 - (m - 56));for (var g = 63; 56 <= g; g--) {
        f[g] = d & 255, d >>>= 8;
      }b(f);for (g = d = 0; 5 > g; g++) {
        for (var k = 24; 0 <= k; k -= 8) {
          a[d++] = e[g] >> k & 255;
        }
      }return a;
    }
    for (var e = [], f = [], g = [], h = [128], k = 1; 64 > k; ++k) {
      h[k] = 0;
    }var m, y;a();return { reset: a, update: c, digest: d, Ga: function Ga() {
        for (var a = d(), b = "", c = 0; c < a.length; c++) {
          b += "0123456789ABCDEF".charAt(Math.floor(a[c] / 16)) + "0123456789ABCDEF".charAt(a[c] % 16);
        }return b;
      } };
  }
  ;function tc(a, b, c) {
    var d = [],
        e = [];if (1 == (ka(c) ? 2 : 1)) return e = [b, a], C(d, function (a) {
      e.push(a);
    }), uc(e.join(" "));
    var f = [],
        g = [];C(c, function (a) {
      g.push(a.key);f.push(a.value);
    });
    c = Math.floor(new Date().getTime() / 1E3);e = 0 == f.length ? [c, b, a] : [f.join(":"), c, b, a];C(d, function (a) {
      e.push(a);
    });
    a = uc(e.join(" "));a = [c, a];0 == g.length || a.push(g.join(""));return a.join("_");
  }
  function uc(a) {
    var b = sc();b.update(a);return b.Ga().toLowerCase();
  }
  ;function vc(a) {
    this.b = a || { cookie: "" };
  }
  l = vc.prototype;l.isEnabled = function () {
    return navigator.cookieEnabled;
  };
  l.set = function (a, b, c, d, e, f) {
    if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');p(c) || (c = -1);e = e ? ";domain=" + e : "";d = d ? ";path=" + d : "";f = f ? ";secure" : "";c = 0 > c ? "" : 0 == c ? ";expires=" + new Date(1970, 1, 1).toUTCString() : ";expires=" + new Date(x() + 1E3 * c).toUTCString();this.b.cookie = a + "=" + b + e + d + c + f;
  };
  l.get = function (a, b) {
    for (var c = a + "=", d = (this.b.cookie || "").split(";"), e = 0, f; e < d.length; e++) {
      f = ua(d[e]);if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);if (f == a) return "";
    }return b;
  };
  l.remove = function (a, b, c) {
    var d = p(this.get(a));this.set(a, "", 0, b, c);return d;
  };
  l.isEmpty = function () {
    return !this.b.cookie;
  };
  l.clear = function () {
    for (var a = (this.b.cookie || "").split(";"), b = [], c = [], d, e, f = 0; f < a.length; f++) {
      e = ua(a[f]), d = e.indexOf("="), -1 == d ? (b.push(""), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
    }for (a = b.length - 1; 0 <= a; a--) {
      this.remove(b[a]);
    }
  };
  var wc = new vc("undefined" == typeof document ? null : document);wc.f = 3950;function yc() {
    var a = [],
        b = hc(String(n.location.href)),
        c = n.__OVERRIDE_SID;null == c && (c = new vc(document).get("SID"));if (c && (b = (c = 0 == b.indexOf("https:") || 0 == b.indexOf("chrome-extension:")) ? n.__SAPISID : n.__APISID, null == b && (b = new vc(document).get(c ? "SAPISID" : "APISID")), b)) {
      var c = c ? "SAPISIDHASH" : "APISIDHASH",
          d = String(n.location.href);return d && b && c ? [c, tc(hc(d), b, a || null)].join(" ") : null;
    }return null;
  }
  ;var zc = J(L, "perf", K());J(zc, "g", K());var Ac = J(zc, "i", K());J(zc, "r", []);K();K();function Bc(a, b, c) {
    b && 0 < b.length && (b = Cc(b), c && 0 < c.length && (b += "___" + Cc(c)), 28 < b.length && (b = b.substr(0, 28) + (b.length - 28)), c = b, b = J(Ac, "_p", K()), J(b, c, K())[a] = new Date().getTime(), b = zc.r, "function" === typeof b ? b(a, "_p", c) : b.push([a, "_p", c]));
  }
  function Cc(a) {
    return a.join("__").replace(/\./g, "_").replace(/\-/g, "_").replace(/\,/g, "_");
  }
  ;var Dc = K(),
      Ec = [];function M(a) {
    throw Error("Bad hint" + (a ? ": " + a : ""));
  }
  Ec.push(["jsl", function (a) {
    for (var b in a) {
      if (Object.prototype.hasOwnProperty.call(a, b)) {
        var c = a[b];"object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) ? L[b] = J(L, b, []).concat(c) : J(L, b, c);
      }
    }if (b = a.u) a = J(L, "us", []), a.push(b), (b = /^https:(.*)$/.exec(b)) && a.push("http:" + b[1]);
  }]);
  var Fc = /^(\/[a-zA-Z0-9_\-]+)+$/,
      Gc = [/\/amp\//, /\/amp$/, /^\/amp$/],
      Hc = /^[a-zA-Z0-9\-_\.,!]+$/,
      Ic = /^gapi\.loaded_[0-9]+$/,
      Jc = /^[a-zA-Z0-9,._-]+$/;function Kc(a, b, c, d) {
    var e = a.split(";"),
        f = e.shift(),
        g = Dc[f],
        h = null;g ? h = g(e, b, c, d) : M("no hint processor for: " + f);h || M("failed to generate load url");b = h;c = b.match(Lc);(d = b.match(Mc)) && 1 === d.length && Nc.test(b) && c && 1 === c.length || M("failed sanity: " + a);return h;
  }
  function Oc(a, b, c, d) {
    function e(a) {
      return encodeURIComponent(a).replace(/%2C/g, ",");
    }
    a = Pc(a);Ic.test(c) || M("invalid_callback");b = Qc(b);d = d && d.length ? Qc(d) : null;return [encodeURIComponent(a.Za).replace(/%2C/g, ",").replace(/%2F/g, "/"), "/k=", e(a.version), "/m=", e(b), d ? "/exm=" + e(d) : "", "/rt=j/sv=1/d=1/ed=1", a.ra ? "/am=" + e(a.ra) : "", a.za ? "/rs=" + e(a.za) : "", a.Ca ? "/t=" + e(a.Ca) : "", "/cb=", e(c)].join("");
  }
  function Pc(a) {
    "/" !== a.charAt(0) && M("relative path");for (var b = a.substring(1).split("/"), c = []; b.length;) {
      a = b.shift();if (!a.length || 0 == a.indexOf(".")) M("empty/relative directory");else if (0 < a.indexOf("=")) {
        b.unshift(a);break;
      }c.push(a);
    }a = {};for (var d = 0, e = b.length; d < e; ++d) {
      var f = b[d].split("="),
          g = decodeURIComponent(f[0]),
          h = decodeURIComponent(f[1]);2 == f.length && g && h && (a[g] = a[g] || h);
    }b = "/" + c.join("/");Fc.test(b) || M("invalid_prefix");c = 0;for (d = Gc.length; c < d; ++c) {
      Gc[c].test(b) && M("invalid_prefix");
    }c = Rc(a, "k", !0);d = Rc(a, "am");e = Rc(a, "rs");a = Rc(a, "t");return { Za: b, version: c, ra: d, za: e, Ca: a };
  }
  function Qc(a) {
    for (var b = [], c = 0, d = a.length; c < d; ++c) {
      var e = a[c].replace(/\./g, "_").replace(/-/g, "_");Jc.test(e) && b.push(e);
    }return b.join(",");
  }
  function Rc(a, b, c) {
    a = a[b];!a && c && M("missing: " + b);if (a) {
      if (Hc.test(a)) return a;M("invalid: " + b);
    }return null;
  }
  var Nc = /^https?:\/\/[a-z0-9_.-]+\.google\.com(:\d+)?\/[a-zA-Z0-9_.,!=\-\/]+$/,
      Mc = /\/cb=/g,
      Lc = /\/\//g;function Sc() {
    var a = pc();if (!a) throw Error("Bad hint");return a;
  }
  Dc.m = function (a, b, c, d) {
    (a = a[0]) || M("missing_hint");return "https://apis.google.com" + Oc(a, b, c, d);
  };
  var Tc = decodeURI("%73cript"),
      Uc = /^[-+_0-9\/A-Za-z]+={0,2}$/;function Vc(a, b) {
    for (var c = [], d = 0; d < a.length; ++d) {
      var e = a[d],
          f;if (f = e) {
        a: {
          for (f = 0; f < b.length; f++) {
            if (b[f] === e) break a;
          }f = -1;
        }f = 0 > f;
      }f && c.push(e);
    }return c;
  }
  function Wc() {
    var a = L.nonce;if (void 0 !== a) return a && a === String(a) && a.match(Uc) ? a : L.nonce = null;var b = J(L, "us", []);if (!b || !b.length) return L.nonce = null;for (var c = jc.getElementsByTagName(Tc), d = 0, e = c.length; d < e; ++d) {
      var f = c[d];if (f.src && (a = String(f.nonce || f.getAttribute("nonce") || "") || null)) {
        for (var g = 0, h = b.length; g < h && b[g] !== f.src; ++g) {}if (g !== h && a && a === String(a) && a.match(Uc)) return L.nonce = a;
      }
    }return null;
  }
  function Xc(a) {
    if ("loading" != jc.readyState) Yc(a);else {
      var b = Wc(),
          c = "";null !== b && (c = ' nonce="' + b + '"');jc.write("<" + Tc + ' src="' + encodeURI(a) + '"' + c + "></" + Tc + ">");
    }
  }
  function Yc(a) {
    var b = jc.createElement(Tc);b.setAttribute("src", a);a = Wc();null !== a && b.setAttribute("nonce", a);b.async = "true";(a = jc.getElementsByTagName(Tc)[0]) ? a.parentNode.insertBefore(b, a) : (jc.head || jc.body || jc.documentElement).appendChild(b);
  }
  function Zc(a, b) {
    var c = b && b._c;if (c) for (var d = 0; d < Ec.length; d++) {
      var e = Ec[d][0],
          f = Ec[d][1];f && Object.prototype.hasOwnProperty.call(c, e) && f(c[e], a, b);
    }
  }
  function $c(a, b, c) {
    ad(function () {
      var c = b === pc() ? J(oc, "_", K()) : K();c = J(rc(b), "_", c);a(c);
    }, c);
  }
  function bd(a, b) {
    var c = b || {};"function" == typeof b && (c = {}, c.callback = b);Zc(a, c);var d = a ? a.split(":") : [],
        e = c.h || Sc(),
        f = J(L, "ah", K());if (f["::"] && d.length) {
      for (var g = [], h = null; h = d.shift();) {
        var k = h.split("."),
            k = f[h] || f[k[1] && "ns:" + k[0] || ""] || e,
            m = g.length && g[g.length - 1] || null,
            y = m;m && m.hint == k || (y = { hint: k, features: [] }, g.push(y));y.features.push(h);
      }var D = g.length;if (1 < D) {
        var N = c.callback;N && (c.callback = function () {
          0 == --D && N();
        });
      }for (; d = g.shift();) {
        cd(d.features, c, d.hint);
      }
    } else cd(d || [], c, e);
  }
  function cd(a, b, c) {
    function d(a, b) {
      if (D) return 0;ic.clearTimeout(y);N.push.apply(N, G);var d = ((oc || {}).config || {}).update;d ? d(f) : f && J(L, "cu", []).push(f);if (b) {
        Bc("me0", a, ta);try {
          $c(b, c, m);
        } finally {
          Bc("me1", a, ta);
        }
      }return 1;
    }
    a = nc(a) || [];var e = b.callback,
        f = b.config,
        g = b.timeout,
        h = b.ontimeout,
        k = b.onerror,
        m = void 0;"function" == typeof k && (m = k);var y = null,
        D = !1;if (g && !h || !g && h) throw "Timeout requires both the timeout parameter and ontimeout parameter to be set";var k = J(rc(c), "r", []).sort(),
        N = J(rc(c), "L", []).sort(),
        ta = [].concat(k);0 < g && (y = ic.setTimeout(function () {
      D = !0;h();
    }, g));
    var G = Vc(a, N);if (G.length) {
      var G = Vc(a, k),
          fa = J(L, "CP", []),
          ga = fa.length;fa[ga] = function (a) {
        function b() {
          var a = fa[ga + 1];a && a();
        }
        function c(b) {
          fa[ga] = null;d(G, a) && qc(function () {
            e && e();b();
          });
        }
        if (!a) return 0;Bc("ml1", G, ta);0 < ga && fa[ga - 1] ? fa[ga] = function () {
          c(b);
        } : c(b);
      };
      if (G.length) {
        var xc = "loaded_" + L.I++;oc[xc] = function (a) {
          fa[ga](a);oc[xc] = null;
        };
        a = Kc(c, G, "gapi." + xc, k);k.push.apply(k, G);Bc("ml0", G, ta);b.sync || ic.___gapisync ? Xc(a) : Yc(a);
      } else fa[ga](lc);
    } else d(G) && e && e();
  }
  function ad(a, b) {
    if (L.hee && 0 < L.hel) try {
      return a();
    } catch (c) {
      b && b(c), L.hel--, bd("debug_error", function () {
        try {
          window.___jsl.hefn(c);
        } catch (d) {
          throw c;
        }
      });
    } else try {
      return a();
    } catch (c) {
      throw b && b(c), c;
    }
  }
  oc.load = function (a, b) {
    return ad(function () {
      return bd(a, b);
    });
  };function dd(a, b, c) {
    this.i = c;this.g = a;this.j = b;this.f = 0;this.b = null;
  }
  dd.prototype.get = function () {
    if (0 < this.f) {
      this.f--;var a = this.b;this.b = a.next;a.next = null;
    } else a = this.g();return a;
  };
  function ed(a, b) {
    a.j(b);a.f < a.i && (a.f++, b.next = a.b, a.b = b);
  }
  ;function fd(a) {
    n.setTimeout(function () {
      throw a;
    }, 0);
  }
  var gd;
  function hd() {
    var a = n.MessageChannel;"undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !F("Presto") && (a = function a() {
      var a = document.createElement("IFRAME");a.style.display = "none";a.src = "";document.documentElement.appendChild(a);var b = a.contentWindow,
          a = b.document;a.open();a.write("");a.close();var c = "callImmediate" + Math.random(),
          d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
          a = v(function (a) {
        if (("*" == d || a.origin == d) && a.data == c) this.port1.onmessage();
      }, this);
      b.addEventListener("message", a, !1);this.port1 = {};this.port2 = { postMessage: function postMessage() {
          b.postMessage(c, d);
        } };
    });
    if ("undefined" !== typeof a && !F("Trident") && !F("MSIE")) {
      var b = new a(),
          c = {},
          d = c;b.port1.onmessage = function () {
        if (p(c.next)) {
          c = c.next;var a = c.ta;c.ta = null;a();
        }
      };
      return function (a) {
        d.next = { ta: a };d = d.next;b.port2.postMessage(0);
      };
    }return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function (a) {
      var b = document.createElement("SCRIPT");
      b.onreadystatechange = function () {
        b.onreadystatechange = null;b.parentNode.removeChild(b);b = null;a();a = null;
      };
      document.documentElement.appendChild(b);
    } : function (a) {
      n.setTimeout(a, 0);
    };
  }
  ;function id() {
    this.f = this.b = null;
  }
  var kd = new dd(function () {
    return new jd();
  }, function (a) {
    a.reset();
  }, 100);
  id.prototype.remove = function () {
    var a = null;this.b && (a = this.b, this.b = this.b.next, this.b || (this.f = null), a.next = null);return a;
  };
  function jd() {
    this.next = this.scope = this.b = null;
  }
  jd.prototype.set = function (a, b) {
    this.b = a;this.scope = b;this.next = null;
  };
  jd.prototype.reset = function () {
    this.next = this.scope = this.b = null;
  };function ld(a, b) {
    md || nd();od || (md(), od = !0);var c = pd,
        d = kd.get();d.set(a, b);c.f ? c.f.next = d : c.b = d;c.f = d;
  }
  var md;function nd() {
    if (-1 != String(n.Promise).indexOf("[native code]")) {
      var a = n.Promise.resolve(void 0);md = function md() {
        a.then(qd);
      };
    } else md = function md() {
      var a = qd;
      !ma(n.setImmediate) || n.Window && n.Window.prototype && !F("Edge") && n.Window.prototype.setImmediate == n.setImmediate ? (gd || (gd = hd()), gd(a)) : n.setImmediate(a);
    };
  }
  var od = !1,
      pd = new id();function qd() {
    for (var a; a = pd.remove();) {
      try {
        a.b.call(a.scope);
      } catch (b) {
        fd(b);
      }ed(kd, a);
    }od = !1;
  }
  ;function O() {
    this.f = this.f;this.H = this.H;
  }
  O.prototype.f = !1;O.prototype.dispose = function () {
    this.f || (this.f = !0, this.o());
  };
  function rd(a, b) {
    a.f ? p(void 0) ? b.call(void 0) : b() : (a.H || (a.H = []), a.H.push(p(void 0) ? v(b, void 0) : b));
  }
  O.prototype.o = function () {
    if (this.H) for (; this.H.length;) {
      this.H.shift()();
    }
  };
  function sd(a) {
    a && "function" == typeof a.dispose && a.dispose();
  }
  function td(a) {
    for (var b = 0, c = arguments.length; b < c; ++b) {
      var d = arguments[b];la(d) ? td.apply(null, d) : sd(d);
    }
  }
  ;var ud = "StopIteration" in n ? n.StopIteration : { message: "StopIteration", stack: "" };function vd() {}
  vd.prototype.next = function () {
    throw ud;
  };
  vd.prototype.da = function () {
    return this;
  };
  function wd(a) {
    if (a instanceof vd) return a;if ("function" == typeof a.da) return a.da(!1);if (la(a)) {
      var b = 0,
          c = new vd();c.next = function () {
        for (;;) {
          if (b >= a.length) throw ud;if (b in a) return a[b++];b++;
        }
      };
      return c;
    }throw Error("Not implemented");
  }
  function xd(a, b) {
    if (la(a)) try {
      C(a, b, void 0);
    } catch (c) {
      if (c !== ud) throw c;
    } else {
      a = wd(a);try {
        for (;;) {
          b.call(void 0, a.next(), void 0, a);
        }
      } catch (c) {
        if (c !== ud) throw c;
      }
    }
  }
  function yd(a) {
    if (la(a)) return Ba(a);a = wd(a);var b = [];xd(a, function (a) {
      b.push(a);
    });
    return b;
  }
  ;function zd(a) {
    return (/^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
    );
  }
  function Ad(a) {
    a = String(a);if (zd(a)) try {
      return eval("(" + a + ")");
    } catch (b) {}throw Error("Invalid JSON string: " + a);
  }
  function Bd(a) {
    var b = [];Cd(new Dd(), a, b);return b.join("");
  }
  function Dd() {}
  function Cd(a, b, c) {
    if (null == b) c.push("null");else {
      if ("object" == (typeof b === "undefined" ? "undefined" : _typeof(b))) {
        if (ka(b)) {
          var d = b;b = d.length;c.push("[");for (var e = "", f = 0; f < b; f++) {
            c.push(e), Cd(a, d[f], c), e = ",";
          }c.push("]");return;
        }if (b instanceof String || b instanceof Number || b instanceof Boolean) b = b.valueOf();else {
          c.push("{");e = "";for (d in b) {
            Object.prototype.hasOwnProperty.call(b, d) && (f = b[d], "function" != typeof f && (c.push(e), Ed(d, c), c.push(":"), Cd(a, f, c), e = ","));
          }c.push("}");return;
        }
      }switch (typeof b === "undefined" ? "undefined" : _typeof(b)) {case "string":
          Ed(b, c);break;case "number":
          c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");break;case "boolean":
          c.push(String(b));break;case "function":
          c.push("null");break;default:
          throw Error("Unknown type: " + (typeof b === "undefined" ? "undefined" : _typeof(b)));}
    }
  }
  var Fd = { '"': '\\"', "\\": "\\\\", "/": "\\/", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\x0B": "\\u000b" },
      Gd = /\uffff/.test("\uFFFF") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;function Ed(a, b) {
    b.push('"', a.replace(Gd, function (a) {
      var b = Fd[a];b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), Fd[a] = b);return b;
    }), '"');
  }
  ;function Hd(a) {
    a.prototype.then = a.prototype.then;a.prototype.$goog_Thenable = !0;
  }
  ;function P(a, b) {
    this.b = 0;this.w = void 0;this.i = this.f = this.g = null;this.j = this.l = !1;if (a != u) try {
      var c = this;a.call(b, function (a) {
        Id(c, 2, a);
      }, function (a) {
        Id(c, 3, a);
      });
    } catch (d) {
      Id(this, 3, d);
    }
  }
  function Jd() {
    this.next = this.context = this.f = this.g = this.b = null;this.i = !1;
  }
  Jd.prototype.reset = function () {
    this.context = this.f = this.g = this.b = null;this.i = !1;
  };
  var Kd = new dd(function () {
    return new Jd();
  }, function (a) {
    a.reset();
  }, 100);
  function Ld(a, b, c) {
    var d = Kd.get();d.g = a;d.f = b;d.context = c;return d;
  }
  function Md(a) {
    if (a instanceof P) return a;var b = new P(u);Id(b, 2, a);return b;
  }
  function Nd(a) {
    return new P(function (b, c) {
      c(a);
    });
  }
  P.prototype.then = function (a, b, c) {
    return Od(this, ma(a) ? a : null, ma(b) ? b : null, c);
  };
  Hd(P);function Pd(a, b) {
    return Od(a, null, b, void 0);
  }
  P.prototype.cancel = function (a) {
    0 == this.b && ld(function () {
      var b = new Qd(a);Rd(this, b);
    }, this);
  };
  function Rd(a, b) {
    if (0 == a.b) if (a.g) {
      var c = a.g;if (c.f) {
        for (var d = 0, e = null, f = null, g = c.f; g && (g.i || (d++, g.b == a && (e = g), !(e && 1 < d))); g = g.next) {
          e || (f = g);
        }e && (0 == c.b && 1 == d ? Rd(c, b) : (f ? (d = f, d.next == c.i && (c.i = d), d.next = d.next.next) : Sd(c), Td(c, e, 3, b)));
      }a.g = null;
    } else Id(a, 3, b);
  }
  function Ud(a, b) {
    a.f || 2 != a.b && 3 != a.b || Vd(a);a.i ? a.i.next = b : a.f = b;a.i = b;
  }
  function Od(a, b, c, d) {
    var e = Ld(null, null, null);e.b = new P(function (a, g) {
      e.g = b ? function (c) {
        try {
          var e = b.call(d, c);a(e);
        } catch (m) {
          g(m);
        }
      } : a;
      e.f = c ? function (b) {
        try {
          var e = c.call(d, b);!p(e) && b instanceof Qd ? g(b) : a(e);
        } catch (m) {
          g(m);
        }
      } : g;
    });
    e.b.g = a;Ud(a, e);return e.b;
  }
  P.prototype.C = function (a) {
    this.b = 0;Id(this, 2, a);
  };
  P.prototype.D = function (a) {
    this.b = 0;Id(this, 3, a);
  };
  function Id(a, b, c) {
    if (0 == a.b) {
      a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));a.b = 1;a: {
        var d = c,
            e = a.C,
            f = a.D;if (d instanceof P) {
          Ud(d, Ld(e || u, f || null, a));var g = !0;
        } else {
          if (d) try {
            var h = !!d.$goog_Thenable;
          } catch (m) {
            h = !1;
          } else h = !1;if (h) d.then(e, f, a), g = !0;else {
            if (na(d)) try {
              var k = d.then;if (ma(k)) {
                Wd(d, k, e, f, a);g = !0;break a;
              }
            } catch (m) {
              f.call(a, m);g = !0;break a;
            }g = !1;
          }
        }
      }g || (a.w = c, a.b = b, a.g = null, Vd(a), 3 != b || c instanceof Qd || Xd(a, c));
    }
  }
  function Wd(a, b, c, d, e) {
    function f(a) {
      h || (h = !0, d.call(e, a));
    }
    function g(a) {
      h || (h = !0, c.call(e, a));
    }
    var h = !1;try {
      b.call(a, g, f);
    } catch (k) {
      f(k);
    }
  }
  function Vd(a) {
    a.l || (a.l = !0, ld(a.B, a));
  }
  function Sd(a) {
    var b = null;a.f && (b = a.f, a.f = b.next, b.next = null);a.f || (a.i = null);return b;
  }
  P.prototype.B = function () {
    for (var a; a = Sd(this);) {
      Td(this, a, this.b, this.w);
    }this.l = !1;
  };
  function Td(a, b, c, d) {
    if (3 == c && b.f && !b.i) for (; a && a.j; a = a.g) {
      a.j = !1;
    }if (b.b) b.b.g = null, Yd(b, c, d);else try {
      b.i ? b.g.call(b.context) : Yd(b, c, d);
    } catch (e) {
      Zd.call(null, e);
    }ed(Kd, b);
  }
  function Yd(a, b, c) {
    2 == b ? a.g.call(a.context, c) : a.f && a.f.call(a.context, c);
  }
  function Xd(a, b) {
    a.j = !0;ld(function () {
      a.j && Zd.call(null, b);
    });
  }
  var Zd = fd;function Qd(a) {
    B.call(this, a);
  }
  z(Qd, B);Qd.prototype.name = "cancel";function Q(a) {
    O.call(this);this.l = 1;this.i = [];this.j = 0;this.b = [];this.g = {};this.w = !!a;
  }
  z(Q, O);l = Q.prototype;l.subscribe = function (a, b, c) {
    var d = this.g[a];d || (d = this.g[a] = []);var e = this.l;this.b[e] = a;this.b[e + 1] = b;this.b[e + 2] = c;this.l = e + 3;d.push(e);return e;
  };
  function $d(a, b, c, d) {
    if (b = a.g[b]) {
      var e = a.b;(b = za(b, function (a) {
        return e[a + 1] == c && e[a + 2] == d;
      })) && a.K(b);
    }
  }
  l.K = function (a) {
    var b = this.b[a];if (b) {
      var c = this.g[b];0 != this.j ? (this.i.push(a), this.b[a + 1] = u) : (c && Aa(c, a), delete this.b[a], delete this.b[a + 1], delete this.b[a + 2]);
    }return !!b;
  };
  l.W = function (a, b) {
    var c = this.g[a];if (c) {
      for (var d = Array(arguments.length - 1), e = 1, f = arguments.length; e < f; e++) {
        d[e - 1] = arguments[e];
      }if (this.w) for (e = 0; e < c.length; e++) {
        var g = c[e];ae(this.b[g + 1], this.b[g + 2], d);
      } else {
        this.j++;try {
          for (e = 0, f = c.length; e < f; e++) {
            g = c[e], this.b[g + 1].apply(this.b[g + 2], d);
          }
        } finally {
          if (this.j--, 0 < this.i.length && 0 == this.j) for (; g = this.i.pop();) {
            this.K(g);
          }
        }
      }return 0 != e;
    }return !1;
  };
  function ae(a, b, c) {
    ld(function () {
      a.apply(b, c);
    });
  }
  l.clear = function (a) {
    if (a) {
      var b = this.g[a];b && (C(b, this.K, this), delete this.g[a]);
    } else this.b.length = 0, this.g = {};
  };
  l.o = function () {
    Q.A.o.call(this);this.clear();this.i.length = 0;
  };function be(a) {
    this.b = a;
  }
  be.prototype.set = function (a, b) {
    p(b) ? this.b.set(a, Bd(b)) : this.b.remove(a);
  };
  be.prototype.get = function (a) {
    try {
      var b = this.b.get(a);
    } catch (c) {
      return;
    }if (null !== b) try {
      return Ad(b);
    } catch (c) {
      throw "Storage: Invalid value was encountered";
    }
  };
  be.prototype.remove = function (a) {
    this.b.remove(a);
  };function ce(a) {
    this.b = a;
  }
  z(ce, be);function de(a) {
    this.data = a;
  }
  function ee(a) {
    return !p(a) || a instanceof de ? a : new de(a);
  }
  ce.prototype.set = function (a, b) {
    ce.A.set.call(this, a, ee(b));
  };
  ce.prototype.f = function (a) {
    a = ce.A.get.call(this, a);if (!p(a) || a instanceof Object) return a;throw "Storage: Invalid value was encountered";
  };
  ce.prototype.get = function (a) {
    if (a = this.f(a)) {
      if (a = a.data, !p(a)) throw "Storage: Invalid value was encountered";
    } else a = void 0;return a;
  };function fe(a) {
    this.b = a;
  }
  z(fe, ce);fe.prototype.set = function (a, b, c) {
    if (b = ee(b)) {
      if (c) {
        if (c < x()) {
          fe.prototype.remove.call(this, a);return;
        }b.expiration = c;
      }b.creation = x();
    }fe.A.set.call(this, a, b);
  };
  fe.prototype.f = function (a, b) {
    var c = fe.A.f.call(this, a);if (c) {
      var d;if (d = !b) {
        d = c.creation;var e = c.expiration;d = !!e && e < x() || !!d && d > x();
      }if (d) fe.prototype.remove.call(this, a);else return c;
    }
  };function ge(a) {
    this.b = a;
  }
  z(ge, fe);function he() {}
  ;function ie() {}
  z(ie, he);ie.prototype.clear = function () {
    var a = yd(this.da(!0)),
        b = this;C(a, function (a) {
      b.remove(a);
    });
  };function je(a) {
    this.b = a;
  }
  z(je, ie);l = je.prototype;l.isAvailable = function () {
    if (!this.b) return !1;try {
      return this.b.setItem("__sak", "1"), this.b.removeItem("__sak"), !0;
    } catch (a) {
      return !1;
    }
  };
  l.set = function (a, b) {
    try {
      this.b.setItem(a, b);
    } catch (c) {
      if (0 == this.b.length) throw "Storage mechanism: Storage disabled";throw "Storage mechanism: Quota exceeded";
    }
  };
  l.get = function (a) {
    a = this.b.getItem(a);if (!q(a) && null !== a) throw "Storage mechanism: Invalid value was encountered";return a;
  };
  l.remove = function (a) {
    this.b.removeItem(a);
  };
  l.da = function (a) {
    var b = 0,
        c = this.b,
        d = new vd();d.next = function () {
      if (b >= c.length) throw ud;var d = c.key(b++);if (a) return d;d = c.getItem(d);if (!q(d)) throw "Storage mechanism: Invalid value was encountered";return d;
    };
    return d;
  };
  l.clear = function () {
    this.b.clear();
  };
  l.key = function (a) {
    return this.b.key(a);
  };function ke() {
    var a = null;try {
      a = window.localStorage || null;
    } catch (b) {}this.b = a;
  }
  z(ke, je);function le() {
    var a = null;try {
      a = window.sessionStorage || null;
    } catch (b) {}this.b = a;
  }
  z(le, je);var me = "Microsoft Internet Explorer" == navigator.appName,
      ne = window.performance && window.performance.timing && window.performance.now ? function () {
    return window.performance.timing.navigationStart + window.performance.now();
  } : function () {
    return new Date().getTime();
  };
  function oe(a, b) {
    if (1 < b.length) a[b[0]] = b[1];else {
      var c = b[0],
          d;for (d in c) {
        a[d] = c[d];
      }
    }
  }
  ;var pe = window.yt && window.yt.config_ || window.ytcfg && window.ytcfg.data_ || {};r("yt.config_", pe, void 0);function R(a) {
    oe(pe, arguments);
  }
  function S(a, b) {
    return a in pe ? pe[a] : b;
  }
  ;function T(a, b) {
    var c = t("yt.logging.errors.log");c ? c(a, b, void 0, void 0, void 0) : (c = S("ERRORS", []), c.push([a, b, void 0, void 0, void 0]), R("ERRORS", c));
  }
  function qe(a) {
    return a && window.yterr ? function () {
      try {
        return a.apply(this, arguments);
      } catch (b) {
        T(b);
      }
    } : a;
  }
  ;function U(a) {
    return S("EXPERIMENT_FLAGS", {})[a];
  }
  ;var re = {};function se(a) {
    return re[a] || (re[a] = String(a).replace(/\-([a-z])/g, function (a, c) {
      return c.toUpperCase();
    }));
  }
  function te(a, b) {
    return a ? a.dataset ? a.dataset[se(b)] : a.getAttribute("data-" + b) : null;
  }
  function ue(a) {
    a && (a.dataset ? a.dataset[se("loaded")] = "true" : a.setAttribute("data-loaded", "true"));
  }
  ;function V(a, b) {
    ma(a) && (a = qe(a));return window.setTimeout(a, b);
  }
  ;var ve = t("ytPubsubPubsubInstance") || new Q();Q.prototype.subscribe = Q.prototype.subscribe;Q.prototype.unsubscribeByKey = Q.prototype.K;Q.prototype.publish = Q.prototype.W;Q.prototype.clear = Q.prototype.clear;r("ytPubsubPubsubInstance", ve, void 0);var we = t("ytPubsubPubsubSubscribedKeys") || {};r("ytPubsubPubsubSubscribedKeys", we, void 0);var xe = t("ytPubsubPubsubTopicToKeys") || {};r("ytPubsubPubsubTopicToKeys", xe, void 0);var ye = t("ytPubsubPubsubIsSynchronous") || {};r("ytPubsubPubsubIsSynchronous", ye, void 0);
  function ze(a, b) {
    var c = Ae();if (c) {
      var d = c.subscribe(a, function () {
        var c = arguments;var f = function f() {
          we[d] && b.apply(window, c);
        };
        try {
          ye[a] ? f() : V(f, 0);
        } catch (g) {
          T(g);
        }
      }, void 0);
      we[d] = !0;xe[a] || (xe[a] = []);xe[a].push(d);return d;
    }return 0;
  }
  function Ae() {
    return t("ytPubsubPubsubInstance");
  }
  function Be(a) {
    xe[a] && (a = xe[a], C(a, function (a) {
      we[a] && delete we[a];
    }), a.length = 0);
  }
  function Ce(a) {
    var b = Ae();if (b) if (b.clear(a), a) Be(a);else for (var c in xe) {
      Be(c);
    }
  }
  function De(a, b) {
    var c = Ae();c && c.publish.apply(c, arguments);
  }
  function Ee(a) {
    var b = Ae();b && ("number" == typeof a ? a = [a] : q(a) && (a = [parseInt(a, 10)]), C(a, function (a) {
      b.unsubscribeByKey(a);delete we[a];
    }));
  }
  ;var Fe = /\.vflset|-vfl[a-zA-Z0-9_+=-]+/,
      Ge = /-[a-zA-Z]{2,3}_[a-zA-Z]{2,3}(?=(\/|$))/;function He(a, b) {
    var c = Ie(a),
        d = document.getElementById(c),
        e = d && te(d, "loaded"),
        f = d && !e;if (e) b && b();else {
      if (b) {
        var e = ze(c, b),
            g = "" + (b[oa] || (b[oa] = ++pa));Je[g] = e;
      }f || (d = Ke(a, c, function () {
        te(d, "loaded") || (ue(d), De(c), V(w(Ce, c), 0));
      }));
    }
  }
  function Ke(a, b, c) {
    var d = document.createElement("script");d.id = b;d.onload = function () {
      c && setTimeout(c, 0);
    };
    d.onreadystatechange = function () {
      switch (d.readyState) {case "loaded":case "complete":
          d.onload();}
    };
    d.src = a;a = document.getElementsByTagName("head")[0] || document.body;a.insertBefore(d, a.firstChild);return d;
  }
  function Le(a) {
    a = Ie(a);var b = document.getElementById(a);b && (Ce(a), b.parentNode.removeChild(b));
  }
  function Me(a, b) {
    if (a && b) {
      var c = "" + (b[oa] || (b[oa] = ++pa));(c = Je[c]) && Ee(c);
    }
  }
  function Ie(a) {
    var b = document.createElement("a");Mb(b, a);a = b.href.replace(/^[a-zA-Z]+:\/\//, "//");return "js-" + wa(a);
  }
  var Je = {};function Ne(a, b) {
    if (window.spf) {
      var c = "";if (a) {
        var d = a.indexOf("jsbin/"),
            e = a.lastIndexOf(".js"),
            f = d + 6;-1 < d && -1 < e && e > f && (c = a.substring(f, e), c = c.replace(Fe, ""), c = c.replace(Ge, ""), c = c.replace("debug-", ""), c = c.replace("tracing-", ""));
      }spf.script.load(a, c, b);
    } else He(a, b);
  }
  ;var Oe = null;function Pe() {
    var a = S("BG_I", null),
        b = S("BG_IU", null),
        c = S("BG_P", void 0);b ? Ne(b, function () {
      window.botguard ? Qe(c) : (Le(b), T(Error("Unable to load Botguard from " + b), "WARNING"));
    }) : a && (eval(a), Qe(c));
  }
  function Qe(a) {
    Oe = new window.botguard.bg(a);U("botguard_periodic_refresh") ? ne() : U("botguard_always_refresh");
  }
  function Re() {
    return null != Oe;
  }
  function Se() {
    return Oe ? Oe.invoke() : null;
  }
  ;x();var Te = p(XMLHttpRequest) ? function () {
    return new XMLHttpRequest();
  } : p(ActiveXObject) ? function () {
    return new ActiveXObject("Microsoft.XMLHTTP");
  } : null;
  function Ue() {
    if (!Te) return null;var a = Te();return "open" in a ? a : null;
  }
  function Ve(a) {
    switch (a && "status" in a ? a.status : -1) {case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:
        return !0;default:
        return !1;}
  }
  ;function We(a) {
    "?" == a.charAt(0) && (a = a.substr(1));a = a.split("&");for (var b = {}, c = 0, d = a.length; c < d; c++) {
      var e = a[c].split("=");if (1 == e.length && e[0] || 2 == e.length) {
        var f = decodeURIComponent((e[0] || "").replace(/\+/g, " ")),
            e = decodeURIComponent((e[1] || "").replace(/\+/g, " "));f in b ? ka(b[f]) ? Ca(b[f], e) : b[f] = [b[f], e] : b[f] = e;
      }
    }return b;
  }
  function Xe(a, b) {
    var c = a.split("#", 2);a = c[0];var c = 1 < c.length ? "#" + c[1] : "",
        d = a.split("?", 2);a = d[0];var d = We(d[1] || ""),
        e;for (e in b) {
      d[e] = b[e];
    }return Yb(a, d) + c;
  }
  ;var Ye = { "X-Goog-Visitor-Id": "SANDBOXED_VISITOR_ID", "X-YouTube-Client-Name": "INNERTUBE_CONTEXT_CLIENT_NAME", "X-YouTube-Client-Version": "INNERTUBE_CONTEXT_CLIENT_VERSION", "X-Youtube-Identity-Token": "ID_TOKEN", "X-YouTube-Page-CL": "PAGE_CL", "X-YouTube-Page-Label": "PAGE_BUILD_LABEL", "X-YouTube-Variants-Checksum": "VARIANTS_CHECKSUM" },
      Ze = !1;
  function $e(a, b) {
    b = void 0 === b ? {} : b;var c = void 0;c = window.location.href;var d = H(a)[1] || null,
        e = Vb(H(a)[3] || null);d && e ? (d = c, c = H(a), d = H(d), c = c[3] == d[3] && c[1] == d[1] && c[4] == d[4]) : c = e ? Vb(H(c)[3] || null) == e && (Number(H(c)[4] || null) || null) == (Number(H(a)[4] || null) || null) : !0;for (var f in Ye) {
      if ((e = d = S(Ye[f])) && !(e = c)) {
        var g = a,
            e = f,
            h = S("CORS_HEADER_WHITELIST") || {};e = (g = Vb(H(g)[3] || null)) ? (h = h[g]) ? 0 <= xa(h, e) : !1 : !0;
      }e && (b[f] = d);
    }return b;
  }
  function af(a, b) {
    var c = S("XSRF_FIELD_NAME", void 0),
        d;b.headers && (d = b.headers["Content-Type"]);return !b.qb && (!Vb(H(a)[3] || null) || b.withCredentials || Vb(H(a)[3] || null) == document.location.hostname) && "POST" == b.method && (!d || "application/x-www-form-urlencoded" == d) && !(b.F && b.F[c]);
  }
  function bf(a, b) {
    var c = b.format || "JSON";b.La && (a = document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port : "") + a);var d = S("XSRF_FIELD_NAME", void 0),
        e = S("XSRF_TOKEN", void 0),
        f = b.kb;f && (f[d] && delete f[d], a = Xe(a, f || {}));var f = b.postBody || "",
        g = b.F;af(a, b) && (g || (g = {}), g[d] = e);g && q(f) && (d = We(f), Ma(d, g), f = b.xa && "JSON" == b.xa ? JSON.stringify(d) : Xb(d));d = f || g && !Ia(g);!Ze && d && "POST" != b.method && (Ze = !0, T(Error("AJAX request with postData should use POST")));var h = !1,
        k,
        m = cf(a, function (a) {
      if (!h) {
        h = !0;k && window.clearTimeout(k);var d = Ve(a),
            e = null;if (d || 400 <= a.status && 500 > a.status) e = df(c, a, b.pb);if (d) a: if (204 == a.status) d = !0;else {
          switch (c) {case "XML":
              d = 0 == parseInt(e && e.return_code, 10);break a;case "RAW":
              d = !0;break a;}d = !!e;
        }var e = e || {},
            f = b.context || n;d ? b.J && b.J.call(f, a, e) : b.onError && b.onError.call(f, a, e);b.Qa && b.Qa.call(f, a, e);
      }
    }, b.method, f, b.headers, b.responseType, b.withCredentials);
    b.O && 0 < b.timeout && (k = V(function () {
      h || (h = !0, m.abort(), window.clearTimeout(k), b.O.call(b.context || n, m));
    }, b.timeout));
  }
  function df(a, b, c) {
    var d = null;switch (a) {case "JSON":
        a = b.responseText;b = b.getResponseHeader("Content-Type") || "";a && 0 <= b.indexOf("json") && (d = JSON.parse(a));break;case "XML":
        if (b = (b = b.responseXML) ? ef(b) : null) d = {}, C(b.getElementsByTagName("*"), function (a) {
          d[a.tagName] = ff(a);
        });}c && gf(d);
    return d;
  }
  function gf(a) {
    if (na(a)) for (var b in a) {
      var c;(c = "html_content" == b) || (c = b.length - 5, c = 0 <= c && b.indexOf("_html", c) == c);if (c) {
        c = b;var d = Lb(a[b]);a[c] = d;
      } else gf(a[b]);
    }
  }
  function ef(a) {
    return a ? (a = ("responseXML" in a ? a.responseXML : a).getElementsByTagName("root")) && 0 < a.length ? a[0] : null : null;
  }
  function ff(a) {
    var b = "";C(a.childNodes, function (a) {
      b += a.nodeValue;
    });
    return b;
  }
  function hf(a, b) {
    b.method = "POST";b.F || (b.F = {});bf(a, b);
  }
  function cf(a, b, c, d, e, f, g) {
    function h() {
      4 == (k && "readyState" in k ? k.readyState : 0) && b && qe(b)(k);
    }
    c = void 0 === c ? "GET" : c;d = void 0 === d ? "" : d;var k = Ue();if (!k) return null;"onloadend" in k ? k.addEventListener("loadend", h, !1) : k.onreadystatechange = h;k.open(c, a, !0);f && (k.responseType = f);g && (k.withCredentials = !0);c = "POST" == c;if (e = $e(a, e)) for (var m in e) {
      k.setRequestHeader(m, e[m]), "content-type" == m.toLowerCase() && (c = !1);
    }c && k.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");k.send(d);return k;
  }
  ;var jf = {},
      kf = 0;function lf(a, b) {
    a && (S("USE_NET_AJAX_FOR_PING_TRANSPORT", !1) ? cf(a, b) : mf(a, b));
  }
  function mf(a, b) {
    var c = new Image(),
        d = "" + kf++;jf[d] = c;c.onload = c.onerror = function () {
      b && jf[d] && b();delete jf[d];
    };
    c.src = a;
  }
  ;function nf(a, b, c, d, e) {
    b = void 0 === b ? "ERROR" : b;e = void 0 === e ? !1 : e;c = { name: c || S("INNERTUBE_CONTEXT_CLIENT_NAME", 1), version: d || S("INNERTUBE_CONTEXT_CLIENT_VERSION", void 0) };b = void 0 === b ? "ERROR" : b;e = window && window.yterr || (void 0 === e ? !1 : e) || !1;if (a && e && !(5 <= of)) {
      e = a.stacktrace;d = a.columnNumber;var f = t("window.location.href");if (q(a)) a = { message: a, name: "Unknown error", lineNumber: "Not available", fileName: f, stack: "Not available" };else {
        var g = !1;try {
          var h = a.lineNumber || a.line || "Not available";
        } catch (D) {
          h = "Not available", g = !0;
        }try {
          var k = a.fileName || a.filename || a.sourceURL || n.$googDebugFname || f;
        } catch (D) {
          k = "Not available", g = !0;
        }a = !g && a.lineNumber && a.fileName && a.stack && a.message && a.name ? a : { message: a.message || "Not available", name: a.name || "UnknownError", lineNumber: h, fileName: k, stack: a.stack || "Not available" };
      }e = e || a.stack;h = a.lineNumber.toString();isNaN(h) || isNaN(d) || (h = h + ":" + d);if (!(pf[a.message] || 0 <= e.indexOf("/YouTubeCenter.js") || 0 <= e.indexOf("/mytube.js"))) {
        k = a.fileName;h = { kb: { a: "logerror", t: "jserror", type: a.name, msg: a.message.substr(0, 1E3), line: h, level: b, "client.name": c.name }, F: { url: S("PAGE_NAME", window.location.href), file: k }, method: "POST" };c.version && (h["client.version"] = c.version);e && (h.F.stack = e);for (var m in c) {
          h.F["client." + m] = c[m];
        }if (m = S("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS", void 0)) for (var y in m) {
          h.F[y] = m[y];
        }bf("/error_204", h);pf[a.message] = !0;of++;
      }
    }
  }
  var of = 0,
      pf = {};var qf = window.yt && window.yt.msgs_ || window.ytcfg && window.ytcfg.msgs || {};r("yt.msgs_", qf, void 0);function rf(a) {
    oe(qf, arguments);
  }
  ;function sf(a, b) {
    var c = 5E3;isNaN(c) && (c = void 0);var d = t("yt.scheduler.instance.addJob");return d ? d(a, b, c) : void 0 === c ? (a(), NaN) : V(a, c || 0);
  }
  function tf(a) {
    if (!isNaN(a)) {
      var b = t("yt.scheduler.instance.cancelJob");b ? b(a) : window.clearTimeout(a);
    }
  }
  ;var uf = [],
      vf = !1;function wf() {
    function a() {
      vf = !0;"google_ad_status" in window ? R("DCLKSTAT", 1) : R("DCLKSTAT", 2);
    }
    Ne("//static.doubleclick.net/instream/ad_status.js", a);uf.push(sf(function () {
      vf || "google_ad_status" in window || (Me("//static.doubleclick.net/instream/ad_status.js", a), R("DCLKSTAT", 3));
    }, 1));
  }
  function xf() {
    return parseInt(S("DCLKSTAT", 0), 10);
  }
  ;var yf = 0,
      zf = t("ytDomDomGetNextId") || function () {
    return ++yf;
  };
  r("ytDomDomGetNextId", zf, void 0);var Af = { stopImmediatePropagation: 1, stopPropagation: 1, preventMouseEvent: 1, preventManipulation: 1, preventDefault: 1, layerX: 1, layerY: 1, screenX: 1, screenY: 1, scale: 1, rotation: 1, webkitMovementX: 1, webkitMovementY: 1 };
  function Bf(a) {
    this.type = "";this.state = this.source = this.data = this.currentTarget = this.relatedTarget = this.target = null;this.charCode = this.keyCode = 0;this.shiftKey = this.ctrlKey = this.altKey = !1;this.clientY = this.clientX = 0;this.changedTouches = this.touches = null;if (a = a || window.event) {
      this.event = a;for (var b in a) {
        b in Af || (this[b] = a[b]);
      }(b = a.target || a.srcElement) && 3 == b.nodeType && (b = b.parentNode);this.target = b;if (b = a.relatedTarget) try {
        b = b.nodeName ? b : null;
      } catch (c) {
        b = null;
      } else "mouseover" == this.type ? b = a.fromElement : "mouseout" == this.type && (b = a.toElement);this.relatedTarget = b;this.clientX = void 0 != a.clientX ? a.clientX : a.pageX;this.clientY = void 0 != a.clientY ? a.clientY : a.pageY;this.keyCode = a.keyCode ? a.keyCode : a.which;this.charCode = a.charCode || ("keypress" == this.type ? this.keyCode : 0);this.altKey = a.altKey;this.ctrlKey = a.ctrlKey;this.shiftKey = a.shiftKey;
    }
  }
  Bf.prototype.preventDefault = function () {
    this.event && (this.event.returnValue = !1, this.event.preventDefault && this.event.preventDefault());
  };
  Bf.prototype.stopPropagation = function () {
    this.event && (this.event.cancelBubble = !0, this.event.stopPropagation && this.event.stopPropagation());
  };
  Bf.prototype.stopImmediatePropagation = function () {
    this.event && (this.event.cancelBubble = !0, this.event.stopImmediatePropagation && this.event.stopImmediatePropagation());
  };var Ha = t("ytEventsEventsListeners") || {};r("ytEventsEventsListeners", Ha, void 0);var Cf = t("ytEventsEventsCounter") || { count: 0 };r("ytEventsEventsCounter", Cf, void 0);function Df(a, b, c, d) {
    d = void 0 === d ? !1 : d;a.addEventListener && ("mouseenter" != b || "onmouseenter" in document ? "mouseleave" != b || "onmouseenter" in document ? "mousewheel" == b && "MozBoxSizing" in document.documentElement.style && (b = "MozMousePixelScroll") : b = "mouseout" : b = "mouseover");return Ga(function (e) {
      return !!e.length && e[0] == a && e[1] == b && e[2] == c && e[4] == !!d;
    });
  }
  function Ef(a, b, c) {
    var d = void 0 === d ? !1 : d;if (!a || !a.addEventListener && !a.attachEvent) return "";var e = Df(a, b, c, d);if (e) return e;var e = ++Cf.count + "",
        f = !("mouseenter" != b && "mouseleave" != b || !a.addEventListener || "onmouseenter" in document);var g = f ? function (d) {
      d = new Bf(d);if (!Qb(d.relatedTarget, function (b) {
        return b == a;
      })) return d.currentTarget = a, d.type = b, c.call(a, d);
    } : function (b) {
      b = new Bf(b);
      b.currentTarget = a;return c.call(a, b);
    };
    g = qe(g);a.addEventListener ? ("mouseenter" == b && f ? b = "mouseover" : "mouseleave" == b && f ? b = "mouseout" : "mousewheel" == b && "MozBoxSizing" in document.documentElement.style && (b = "MozMousePixelScroll"), a.addEventListener(b, g, d)) : a.attachEvent("on" + b, g);Ha[e] = [a, b, c, g, d];return e;
  }
  function Ff(a) {
    a && ("string" == typeof a && (a = [a]), C(a, function (a) {
      if (a in Ha) {
        var b = Ha[a],
            d = b[0],
            e = b[1],
            f = b[3],
            b = b[4];d.removeEventListener ? d.removeEventListener(e, f, b) : d.detachEvent && d.detachEvent("on" + e, f);delete Ha[a];
      }
    }));
  }
  ;function Gf() {
    if (null == t("_lact", window)) {
      var a = parseInt(S("LACT"), 10),
          a = isFinite(a) ? x() - Math.max(a, 0) : -1;r("_lact", a, window);r("_fact", a, window);-1 == a && Hf();Ef(document, "keydown", Hf);Ef(document, "keyup", Hf);Ef(document, "mousedown", Hf);Ef(document, "mouseup", Hf);ze("page-mouse", Hf);ze("page-scroll", Hf);ze("page-resize", Hf);
    }
  }
  function Hf() {
    null == t("_lact", window) && (Gf(), t("_lact", window));var a = x();r("_lact", a, window);-1 == t("_fact", window) && r("_fact", a, window);De("USER_ACTIVE");
  }
  function If() {
    var a = t("_lact", window);return null == a ? -1 : Math.max(x() - a, 0);
  }
  var Jf = Hf;function Kf(a, b, c, d, e) {
    this.g = a;this.j = b;this.i = c;this.f = d;this.b = e;
  }
  var Lf = 1;function Mf(a) {
    var b = {};void 0 !== a.g ? b.trackingParams = a.g : (b.veType = a.j, null != a.i && (b.veCounter = a.i), null != a.f && (b.elementIndex = a.f));void 0 !== a.b && (b.dataElement = Mf(a.b));return b;
  }
  ;var Nf = { log_event: "events", log_interaction: "interactions" },
      Of = Object.create(null);Of.log_event = "GENERIC_EVENT_LOGGING";Of.log_interaction = "INTERACTION_LOGGING";var Pf = {},
      Qf = {},
      Rf = 0,
      W = t("ytLoggingTransportLogPayloadsQueue_") || {};r("ytLoggingTransportLogPayloadsQueue_", W, void 0);var Sf = t("ytLoggingTransportTokensToCttTargetIds_") || {};r("ytLoggingTransportTokensToCttTargetIds_", Sf, void 0);var Tf = t("ytLoggingTransportDispatchedStats_") || {};r("ytLoggingTransportDispatchedStats_", Tf, void 0);
  var Uf = t("ytLoggingTransportCapturedTime_") || {};r("ytytLoggingTransportCapturedTime_", Uf, void 0);function Vf(a, b) {
    Qf[a.endpoint] = b;if (a.ea) {
      var c = a.ea;var d = {};c.videoId ? d.videoId = c.videoId : c.playlistId && (d.playlistId = c.playlistId);Sf[a.ea.token] = d;c = Wf(a.endpoint, a.ea.token);
    } else c = Wf(a.endpoint);c.push(a.wa);d = Number(U("web_logging_max_batch") || 0) || 20;c.length >= d ? Xf() : Yf();
  }
  function Xf() {
    window.clearTimeout(Rf);if (!Ia(W)) {
      for (var a in W) {
        var b = Pf[a];if (!b) {
          var c = Qf[a];if (!c) continue;b = new c();Pf[a] = b;
        }var c = void 0,
            d = a,
            e = b,
            f = Nf[d],
            g = Tf[d] || {};Tf[d] = g;b = Math.round(ne());for (c in W[d]) {
          var h = e.f();h[f] = Wf(d, c);g.dispatchedEventCount = g.dispatchedEventCount || 0;g.dispatchedEventCount += h[f].length;h.requestTimeMs = b;var k = Sf[c];if (k) a: {
            var m = h,
                y = c;if (k.videoId) var D = "VIDEO";else if (k.playlistId) D = "PLAYLIST";else break a;m.credentialTransferTokenTargetId = k;m.context = m.context || {};m.context.user = m.context.user || {};m.context.user.credentialTransferTokens = [{ token: y, scope: D }];
          }delete Sf[c];e.g(d, h, {});
        }c = g;d = b;c.previousDispatchMs && (b = d - c.previousDispatchMs, e = c.diffCount || 0, c.averageTimeBetweenDispatchesMs = e ? (c.averageTimeBetweenDispatchesMs * e + b) / (e + 1) : b, c.diffCount = e + 1);c.previousDispatchMs = d;delete W[a];
      }Ia(W) || Yf();
    }
  }
  function Yf() {
    window.clearTimeout(Rf);Rf = V(Xf, S("LOGGING_BATCH_TIMEOUT", 1E4));
  }
  function Wf(a, b) {
    b || (b = "");W[a] = W[a] || {};W[a][b] = W[a][b] || [];return W[a][b];
  }
  ;function Zf(a, b, c, d, e) {
    var f = {};f.eventTimeMs = Math.round(d || ne());f[a] = b;f.context = { lastActivityMs: String(If()) };Vf({ endpoint: "log_event", wa: f, ea: e }, c);
  }
  ;function $f(a, b, c, d) {
    ag(a, { attachChild: { csn: b, parentVisualElement: Mf(c), visualElements: [Mf(d)] } }, void 0);
  }
  function bg(a, b, c) {
    U("interaction_logging_on_gel_web") ? c.forEach(function (c) {
      Zf("visualElementShown", { csn: b, ve: Mf(c), eventType: 1 }, a);
    }) : (c = ya(c, function (a) {
      return Mf(a);
    }), ag(a, { visibilityUpdate: { csn: b,
        visualElements: c } }));
  }
  function ag(a, b, c) {
    b.eventTimeMs = Math.round(ne());b.lactMs = If();c && (b.clientData = cg(c));Vf({ endpoint: "log_interaction", wa: b }, a);
  }
  function cg(a) {
    var b = {};a.analyticsChannelData && (b.analyticsDatas = ya(a.analyticsChannelData, function (a) {
      return { tabName: a.tabName, cardName: a.cardName, isChannelScreen: a.isChannelScreen, insightId: a.insightId, externalChannelId: a.externalChannelId, externalContentOwnerId: a.externalContentOwnerId };
    }));
    return { playbackData: { clientPlaybackNonce: a.clientPlaybackNonce }, analyticsChannelData: b, externalLinkData: a.externalLinkData };
  }
  ;function dg() {
    if (!eg && !fg || !window.JSON) return null;try {
      var a = eg.get("yt-player-two-stage-token");
    } catch (b) {}if (!q(a)) try {
      a = fg.get("yt-player-two-stage-token");
    } catch (b) {}if (!q(a)) return null;try {
      a = JSON.parse(a, void 0);
    } catch (b) {}return a;
  }
  var fg,
      gg = new ke();fg = gg.isAvailable() ? new ge(gg) : null;var eg,
      hg = new le();eg = hg.isAvailable() ? new ge(hg) : null;function ig() {
    var a = S("ROOT_VE_TYPE", void 0);return a ? new Kf(void 0, a, void 0) : null;
  }
  function jg() {
    var a = S("client-screen-nonce", void 0);a || (a = S("EVENT_ID", void 0));return a;
  }
  ;function kg(a, b, c) {
    b = void 0 === b ? {} : b;c = void 0 === c ? !1 : c;var d = S("EVENT_ID");d && (b.ei || (b.ei = d));if (b) {
      var d = a,
          e = S("VALID_SESSION_TEMPDATA_DOMAINS", []),
          f = Vb(H(window.location.href)[3] || null);f && e.push(f);f = Vb(H(d)[3] || null);if (0 <= xa(e, f) || !f && 0 == d.lastIndexOf("/", 0)) if (U("autoescape_tempdata_url") && (e = document.createElement("a"), Mb(e, d), d = e.href), d) {
        var f = H(d),
            d = f[5],
            e = f[6],
            f = f[7],
            g = "";d && (g += d);e && (g += "?" + e);f && (g += "#" + f);d = g;e = d.indexOf("#");if (d = 0 > e ? d : d.substr(0, e)) {
          if (b.itct || b.ved) b.csn = b.csn || jg();d = "ST-" + wa(d).toString(36);e = b ? Xb(b) : "";wc.set("" + d, e, 5, "/", "youtube.com");b && (b = b.itct || b.ved, d = t("yt.logging.screen.storeParentElement"), b && d && d(new Kf(b)));
        }
      }
    }if (c) return !1;if ((window.ytspf || {}).enabled) spf.navigate(a);else {
      var h = void 0 === h ? {} : h;var k = void 0 === k ? "" : k;var m = void 0 === m ? window : m;c = m.location;a = Yb(a, h) + k;a = a instanceof Eb ? a : Ib(a);c.href = Gb(a);
    }return !0;
  }
  ;var lg = t("yt.abuse.botguardInitialized") || Re;r("yt.abuse.botguardInitialized", lg, void 0);var mg = t("yt.abuse.invokeBotguard") || Se;r("yt.abuse.invokeBotguard", mg, void 0);var ng = t("yt.abuse.dclkstatus.checkDclkStatus") || xf;r("yt.abuse.dclkstatus.checkDclkStatus", ng, void 0);var og = t("yt.player.exports.navigate") || kg;r("yt.player.exports.navigate", og, void 0);var pg = t("yt.util.activity.init") || Gf;r("yt.util.activity.init", pg, void 0);var qg = t("yt.util.activity.getTimeSinceActive") || If;
  r("yt.util.activity.getTimeSinceActive", qg, void 0);var rg = t("yt.util.activity.setTimestamp") || Jf;r("yt.util.activity.setTimestamp", rg, void 0);function sg(a) {
    a = { client: { hl: a.Oa, gl: a.Na, clientName: a.Ma, clientVersion: a.innertubeContextClientVersion } };S("DELEGATED_SESSION_ID") && (a.user = { onBehalfOfUser: S("DELEGATED_SESSION_ID") });return a;
  }
  function tg() {
    return { apiaryHost: S("APIARY_HOST", void 0), Ea: S("APIARY_HOST_FIRSTPARTY", void 0), gapiHintOverride: !!S("GAPI_HINT_OVERRIDE", void 0), gapiHintParams: S("GAPI_HINT_PARAMS", void 0), innertubeApiKey: S("INNERTUBE_API_KEY", void 0), innertubeApiVersion: S("INNERTUBE_API_VERSION", void 0), Ma: S("INNERTUBE_CONTEXT_CLIENT_NAME", "WEB"), innertubeContextClientVersion: S("INNERTUBE_CONTEXT_CLIENT_VERSION", void 0), Oa: S("INNERTUBE_CONTEXT_HL", void 0), Na: S("INNERTUBE_CONTEXT_GL", void 0), xhrApiaryHost: S("XHR_APIARY_HOST", void 0) || "", Pa: S("INNERTUBE_HOST_OVERRIDE", void 0) || "" };
  }
  function ug(a, b, c) {
    c.context && c.context.capabilities && (c = c.context.capabilities, c.snapshot || c.golden) && (a = "vix");return "/youtubei/" + a + "/" + b;
  }
  ;function vg(a) {
    this.b = a || tg();wg || (wg = xg(this.b));
  }
  function xg(a) {
    return new P(function (b) {
      try {
        var c = { gapiHintOverride: a.gapiHintOverride, _c: { jsl: { h: a.gapiHintParams } }, callback: b };b = c;b = void 0 === b ? {} : b;ma(b) && (b = { callback: b });b._c && b._c.jsl && b._c.jsl.h || Ma(b, { _c: { jsl: { h: S("GAPI_HINT_PARAMS", void 0) } } });c = b;if (c.gapiHintOverride || S("GAPI_HINT_OVERRIDE")) {
          var d = document.location.href;if (-1 != d.indexOf("?")) {
            var d = (d || "").split("#")[0],
                e = d.split("?", 2);var f = We(1 < e.length ? e[1] : e[0]);
          } else f = {};var g = f.gapi_jsh;g && Ma(c, { _c: { jsl: { h: g } } });
        }bd("client", c);
      } catch (h) {
        T(h);
      }
    }).then(function () {});
  }
  vg.prototype.i = function () {
    var a = t("gapi.config.update");a("googleapis.config/auth/useFirstPartyAuth", !0);a("googleapis.config/auth/useFirstPartyAuthV2", !0);var b = this.b.apiaryHost;/^[\s\xa0]*$/.test(null == b ? "" : String(b)) || a("googleapis.config/root", (-1 == b.indexOf("://") ? "//" : "") + b);b = this.b.Ea;/^[\s\xa0]*$/.test(null == b ? "" : String(b)) || a("googleapis.config/root-1p", (-1 == b.indexOf("://") ? "//" : "") + b);b = S("SESSION_INDEX");a("googleapis.config/sessionIndex", b);t("gapi.client.setApiKey")(this.b.innertubeApiKey);
  };
  vg.prototype.f = function () {
    return { context: sg(this.b) };
  };
  vg.prototype.g = function (a, b, c) {
    var d,
        e = !1;0 < c.timeout && (d = V(function () {
      e || (e = !0, c.O && c.O());
    }, c.timeout));
    yg(this, a, b, function (a) {
      if (!e) if (e = !0, d && window.clearTimeout(d), a) c.J && c.J(a);else if (c.onError) c.onError();
    });
  };
  function yg(a, b, c, d) {
    var e = { path: ug(a.b.innertubeApiVersion, b, c), headers: { "X-Goog-Visitor-Id": S("VISITOR_DATA") }, method: "POST", body: Bd(c) },
        f = v(a.i, a);wg.then(function () {
      f();t("gapi.client.request")(e).execute(d || u);
    });
  }
  var wg = null;function zg(a) {
    this.b = a || tg();
  }
  zg.prototype.f = function () {
    return { context: sg(this.b) };
  };
  zg.prototype.g = function (a, b, c) {
    !S("VISITOR_DATA") && .01 > Math.random() && T(Error("Missing VISITOR_DATA when sending innertube request."), "WARNING");var d = { headers: { "Content-Type": "application/json", "X-Goog-Visitor-Id": S("VISITOR_DATA", "") }, F: b, xa: "JSON", O: c.O, J: function J(a, b) {
        c.J && c.J(b);
      },
      onError: function onError(a, b) {
        if (c.onError) c.onError(b);
      },
      timeout: c.timeout, withCredentials: !0 },
        e = yc();e && (d.headers.Authorization = e, d.headers["X-Goog-AuthUser"] = S("SESSION_INDEX", 0));var f = this.b.xhrApiaryHost;f && !f.startsWith("http") && (f = "//" + f);U("youtubei_for_web") && (f = "");var g = this.b.Pa;g && (f = g);e && !f && (d.headers["x-origin"] = window.location.origin);hf("" + f + ug(this.b.innertubeApiVersion, a, b) + "?alt=json&key=" + this.b.innertubeApiKey, d);
  };function Ag() {
    return U("enable_youtubei_innertube") ? zg : vg;
  }
  ;function Bg(a) {
    a = a || {};this.url = a.url || "";this.urlV9As2 = a.url_v9as2 || "";this.args = a.args || Ka(Cg);this.assets = a.assets || {};this.attrs = a.attrs || Ka(Dg);this.params = a.params || Ka(Eg);this.minVersion = a.min_version || "8.0.0";this.fallback = a.fallback || null;this.fallbackMessage = a.fallbackMessage || null;this.html5 = !!a.html5;this.disable = a.disable || {};this.loaded = !!a.loaded;this.messages = a.messages || {};
  }
  var Cg = { enablejsapi: 1 },
      Dg = {},
      Eg = { allowscriptaccess: "always", allowfullscreen: "true", bgcolor: "#000000" };function Fg(a) {
    a instanceof Bg || (a = new Bg(a));return a;
  }
  function Gg(a) {
    var b = new Bg(),
        c;for (c in a) {
      if (a.hasOwnProperty(c)) {
        var d = a[c];b[c] = "object" == ja(d) ? Ka(d) : d;
      }
    }return b;
  }
  ;function Hg(a) {
    O.call(this);this.b = [];this.g = a || this;
  }
  aa(Hg, O);function Ig(a, b, c, d) {
    d = qe(v(d, a.g));d = { target: b, name: c, sa: d };b.addEventListener(c, d.sa, void 0);a.b.push(d);
  }
  function Jg(a) {
    for (; a.b.length;) {
      var b = a.b.pop();b.target.removeEventListener(b.name, b.sa);
    }
  }
  Hg.prototype.o = function () {
    Jg(this);O.prototype.o.call(this);
  };function Kg() {
    this.g = this.f = this.b = 0;this.i = "";var a = t("window.navigator.plugins"),
        b = t("window.navigator.mimeTypes"),
        a = a && a["Shockwave Flash"],
        b = b && b["application/x-shockwave-flash"],
        b = a && b && b.enabledPlugin && a.description || "";if (a = b) {
      var c = a.indexOf("Shockwave Flash");0 <= c && (a = a.substr(c + 15));for (var c = a.split(" "), d = "", a = "", e = 0, f = c.length; e < f; e++) {
        if (d) {
          if (a) break;else a = c[e];
        } else d = c[e];
      }d = d.split(".");c = parseInt(d[0], 10) || 0;d = parseInt(d[1], 10) || 0;e = 0;if ("r" == a.charAt(0) || "d" == a.charAt(0)) e = parseInt(a.substr(1), 10) || 0;a = [c, d, e];
    } else a = [0, 0, 0];this.i = b;b = a;this.b = b[0];this.f = b[1];this.g = b[2];if (0 >= this.b) {
      if (me) try {
        var g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
      } catch (y) {
        g = null;
      } else {
        var h = document.body;var k = document.createElement("object");k.setAttribute("type", "application/x-shockwave-flash");g = h.appendChild(k);
      }if (g && "GetVariable" in g) try {
        var m = g.GetVariable("$version");
      } catch (y) {
        m = "";
      }h && k && h.removeChild(k);(g = m || "") ? (g = g.split(" ")[1].split(","), g = [parseInt(g[0], 10) || 0, parseInt(g[1], 10) || 0, parseInt(g[2], 10) || 0]) : g = [0, 0, 0];this.b = g[0];this.f = g[1];this.g = g[2];
    }
  }
  ia(Kg);function Lg(a, b, c, d) {
    b = "string" == typeof b ? b.split(".") : [b, c, d];b[0] = parseInt(b[0], 10) || 0;b[1] = parseInt(b[1], 10) || 0;b[2] = parseInt(b[2], 10) || 0;return a.b > b[0] || a.b == b[0] && a.f > b[1] || a.b == b[0] && a.f == b[1] && a.g >= b[2];
  }
  ;var Mg = /cssbin\/(?:debug-)?([a-zA-Z0-9_-]+?)(?:-2x|-web|-rtl|-vfl|.css)/;function Ng(a) {
    a = a || "";if (window.spf) {
      var b = a.match(Mg);spf.style.load(a, b ? b[1] : "", void 0);
    } else Og(a);
  }
  function Og(a) {
    var b = Pg(a),
        c = document.getElementById(b),
        d = c && te(c, "loaded");d || c && !d || (c = Qg(a, b, function () {
      te(c, "loaded") || (ue(c), De(b), V(w(Ce, b), 0));
    }));
  }
  function Qg(a, b, c) {
    var d = document.createElement("link");d.id = b;d.onload = function () {
      c && setTimeout(c, 0);
    };
    a = Rb(a);d.rel = "stylesheet";d.href = a instanceof Cb && a.constructor === Cb && a.f === Db ? a.b : "type_error:TrustedResourceUrl";(document.getElementsByTagName("head")[0] || document.body).appendChild(d);return d;
  }
  function Pg(a) {
    var b = document.createElement("A");a = Jb(a);Mb(b, a);b = b.href.replace(/^[a-zA-Z]+:\/\//, "//");return "css-" + wa(b);
  }
  ;var X = {},
      Rg = (X["api.invalidparam"] = 2, X.auth = 150, X["drm.auth"] = 150, X["heartbeat.net"] = 150, X["heartbeat.servererror"] = 150, X["heartbeat.stop"] = 150, X["html5.unsupportedads"] = 5, X["fmt.noneavailable"] = 5, X["fmt.decode"] = 5, X["fmt.unplayable"] = 5, X["html5.missingapi"] = 5, X["html5.unsupportedlive"] = 5, X["drm.unavailable"] = 5, X);var Sg;var Tg = E,
      Tg = Tg.toLowerCase();if (-1 != Tg.indexOf("android")) {
    var Ug = Tg.match(/android\D*(\d\.\d)[^\;|\)]*[\;\)]/);if (Ug) Sg = Number(Ug[1]);else {
      var Vg = { cupcake: 1.5, donut: 1.6, eclair: 2, froyo: 2.2, gingerbread: 2.3, honeycomb: 3, "ice cream sandwich": 4, jellybean: 4.1, kitkat: 4.4, lollipop: 5.1, marshmallow: 6, nougat: 7.1 },
          Wg = [],
          Xg = 0,
          Yg;for (Yg in Vg) {
        Wg[Xg++] = Yg;
      }var Zg = Tg.match("(" + Wg.join("|") + ")");Sg = Zg ? Vg[Zg[0]] : 0;
    }
  } else Sg = void 0;var $g = ['video/mp4; codecs="avc1.42001E, mp4a.40.2"', 'video/webm; codecs="vp8.0, vorbis"'],
      ah = ['audio/mp4; codecs="mp4a.40.2"'];var bh = t("ytLoggingLatencyUsageStats_") || {};r("ytLoggingLatencyUsageStats_", bh, void 0);var ch = 0;function dh(a) {
    bh[a] = bh[a] || { count: 0 };var b = bh[a];b.count++;b.time = ne();ch || (ch = sf(eh, 0));return 10 < b.count ? (11 == b.count && nf(Error("CSI data exceeded logging limit with key: " + a)), !0) : !1;
  }
  function eh() {
    var a = ne(),
        b;for (b in bh) {
      6E4 < a - bh[b].time && delete bh[b];
    }ch = 0;
  }
  ;function fh(a, b) {
    this.version = a;this.args = b;
  }
  ;function gh(a) {
    this.topic = a;
  }
  gh.prototype.toString = function () {
    return this.topic;
  };var hh = t("ytPubsub2Pubsub2Instance") || new Q();Q.prototype.subscribe = Q.prototype.subscribe;Q.prototype.unsubscribeByKey = Q.prototype.K;Q.prototype.publish = Q.prototype.W;Q.prototype.clear = Q.prototype.clear;r("ytPubsub2Pubsub2Instance", hh, void 0);var ih = t("ytPubsub2Pubsub2SubscribedKeys") || {};r("ytPubsub2Pubsub2SubscribedKeys", ih, void 0);var jh = t("ytPubsub2Pubsub2TopicToKeys") || {};r("ytPubsub2Pubsub2TopicToKeys", jh, void 0);var kh = t("ytPubsub2Pubsub2IsAsync") || {};r("ytPubsub2Pubsub2IsAsync", kh, void 0);
  r("ytPubsub2Pubsub2SkipSubKey", null, void 0);function lh(a, b) {
    var c = t("ytPubsub2Pubsub2Instance");c && c.publish.call(c, a.toString(), a, b);
  }
  ;var Y = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};function mh() {
    var a = S("TIMING_TICK_EXPIRATION");a || (a = {}, R("TIMING_TICK_EXPIRATION", a));return a;
  }
  function nh() {
    var a = mh(),
        b;for (b in a) {
      tf(a[b]);
    }R("TIMING_TICK_EXPIRATION", {});
  }
  ;function oh(a, b) {
    fh.call(this, 1, arguments);
  }
  z(oh, fh);function ph(a, b) {
    fh.call(this, 1, arguments);
  }
  z(ph, fh);var qh = new gh("aft-recorded"),
      rh = new gh("timing-sent");var sh = x().toString();var th = { vc: !0 },
      uh = { ad_at: "adType", cpn: "clientPlaybackNonce", csn: "clientScreenNonce", is_nav: "isNavigation", yt_lt: "loadType", yt_ad: "isMonetized", yt_ad_pr: "prerollAllowed", yt_red: "isRedSubscriber", yt_vis: "isVisible", docid: "videoId", plid: "videoId", fmt: "playerInfo.itag" },
      vh = "ap c cver ei yt_fss yt_li GetBrowse_rid GetPlayer_rid GetSearch_rid GetWatchNext_rid ad_allowed ad_cpn ad_docid ba c cmt cver ncnp nr p pa paused pc prerender psc rc srt st start vpil vpni vps yt_abt yt_ad_an yt_eil yt_fn yt_fs yt_hrd yt_li yt_pft yt_pl yt_pre yt_pt yt_pvis yt_ref yt_sts".split(" "),
      wh = ["isNavigation", "isMonetized", "prerollAllowed", "isRedSubscriber", "isVisible"],
      xh = !1;
  function yh(a) {
    if ("_" != a[0]) {
      var b = a;Y.mark && (0 == b.lastIndexOf("mark_", 0) || (b = "mark_" + b), Y.mark(b));
    }var b = zh(),
        c = ne();b[a] && (b["_" + a] = b["_" + a] || [b[a]], b["_" + a].push(c));b[a] = c;b = mh();if (c = b[a]) tf(c), b[a] = 0;Ah()["tick_" + a] = void 0;ne();U("csi_on_gel") ? (b = Bh(), "_start" == a ? dh("baseline_" + b) || Zf("latencyActionBaselined", { clientActionNonce: b }, zg, void 0) : dh("tick_" + a + "_" + b) || Zf("latencyActionTicked", { tickName: a, clientActionNonce: b }, zg, void 0), a = !0) : a = !1;if (a = !a) a = !t("yt.timing.pingSent_");if (a && (b = S("TIMING_ACTION", void 0), a = zh(), t("ytglobal.timingready_") && b && a._start && (b = Ch()))) {
      U("tighter_critical_section") && !xh && (lh(qh, new oh(Math.round(b - a._start), void 0)), xh = !0);b = !0;c = S("TIMING_WAIT", []);if (c.length) for (var d = 0, e = c.length; d < e; ++d) {
        if (!(c[d] in a)) {
          b = !1;break;
        }
      }b && Dh();
    }
  }
  function Eh() {
    var a = Fh().info.yt_lt = "hot_bg";Ah().info_yt_lt = a;if (U("csi_on_gel")) if ("yt_lt" in uh) {
      var b = {},
          c = uh.yt_lt.split(".");0 <= xa(wh, c) && (a = !!a);for (var d = b, e = 0; e < c.length - 1; e++) {
        d[c[e]] = d[c[e]] || {}, d = d[c[e]];
      }b[c[c.length - 1]] = a;a = Bh();c = Object.keys(b).join("");dh("info_" + c + "_" + a) || (b.clientActionNonce = a, Zf("latencyActionInfo", b, zg));
    } else 0 <= xa(vh, "yt_lt") || T(Error("Unknown label yt_lt logged with GEL CSI."));
  }
  function Ch() {
    var a = zh();if (a.aft) return a.aft;for (var b = S("TIMING_AFT_KEYS", ["ol"]), c = b.length, d = 0; d < c; d++) {
      var e = a[b[d]];if (e) return e;
    }return NaN;
  }
  function Dh() {
    nh();if (!U("csi_on_gel")) {
      var a = zh(),
          b = Fh().info,
          c = a._start,
          d;for (d in a) {
        if (0 == d.lastIndexOf("_", 0) && ka(a[d])) {
          var e = d.slice(1);if (e in th) {
            var f = ya(a[d], function (a) {
              return Math.round(a - c);
            });
            b["all_" + e] = f.join();
          }delete a[d];
        }
      }e = !!b.ap;if (f = t("ytglobal.timingReportbuilder_")) {
        if (f = f(a, b, void 0)) Gh(f, e), Hh(), Ih(), Jh(!1, void 0), S("TIMING_ACTION") && R("PREVIOUS_ACTION", S("TIMING_ACTION")), R("TIMING_ACTION", "");
      } else {
        var g = S("CSI_SERVICE_NAME", "youtube");f = { v: 2, s: g, action: S("TIMING_ACTION", void 0) };var h = b.srt;void 0 !== a.srt && delete b.srt;if (b.h5jse) {
          var k = window.location.protocol + t("ytplayer.config.assets.js");(k = Y.getEntriesByName ? Y.getEntriesByName(k)[0] : null) ? b.h5jse = Math.round(b.h5jse - k.responseEnd) : delete b.h5jse;
        }a.aft = Ch();Kh() && "youtube" == g && (Eh(), g = a.vc, k = a.pbs, delete a.aft, b.aft = Math.round(k - g));for (var m in b) {
          "_" != m.charAt(0) && (f[m] = b[m]);
        }a.ps = ne();b = {};m = [];for (d in a) {
          "_" != d.charAt(0) && (g = Math.round(a[d] - c), b[d] = g, m.push(d + "." + g));
        }f.rt = m.join(",");(a = t("ytdebug.logTiming")) && a(f, b);Gh(f, e, void 0);lh(rh, new ph(b.aft + (h || 0), void 0));
      }
    }
  }
  var Ih = v(Y.clearResourceTimings || Y.webkitClearResourceTimings || Y.mozClearResourceTimings || Y.msClearResourceTimings || Y.oClearResourceTimings || u, Y);
  function Gh(a, b, c) {
    if (U("debug_csi_data")) {
      var d = t("yt.timing.csiData");d || (d = [], r("yt.timing.csiData", d, void 0));d.push({ page: location.href, time: new Date(), args: a });
    }var d = "",
        e;for (e in a) {
      d += "&" + e + "=" + a[e];
    }a = "/csi_204?" + d.substring(1);if (window.navigator && window.navigator.sendBeacon && b) try {
      window.navigator && window.navigator.sendBeacon && window.navigator.sendBeacon(a, "") || lf(a, void 0);
    } catch (f) {
      lf(a, void 0);
    } else lf(a);Jh(!0, c);
  }
  function Bh() {
    var a = Fh().nonce;if (!a) {
      a: {
        if (window.crypto && window.crypto.getRandomValues) try {
          var b = Array(16),
              c = new Uint8Array(16);window.crypto.getRandomValues(c);for (a = 0; a < b.length; a++) {
            b[a] = c[a];
          }var d = b;break a;
        } catch (e) {}d = Array(16);for (b = 0; 16 > b; b++) {
          c = x();for (a = 0; a < c % 23; a++) {
            d[b] = Math.random();
          }d[b] = Math.floor(256 * Math.random());
        }if (sh) for (b = 1, c = 0; c < sh.length; c++) {
          d[b % 16] = d[b % 16] ^ d[(b - 1) % 16] / 4 ^ sh.charCodeAt(c), b++;
        }
      }b = [];for (c = 0; c < d.length; c++) {
        b.push("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_".charAt(d[c] & 63));
      }a = b.join("");Fh().nonce = a;
    }return a;
  }
  function zh() {
    return Fh().tick;
  }
  function Ah() {
    var a = Fh();"gel" in a || (a.gel = {});return a.gel;
  }
  function Fh() {
    return t("ytcsi.data_") || Hh();
  }
  function Hh() {
    var a = { tick: {}, info: {} };r("ytcsi.data_", a, void 0);return a;
  }
  function Jh(a, b) {
    r("yt.timing." + (b || "") + "pingSent_", a, void 0);
  }
  function Kh() {
    var a = zh(),
        b = a.pbr,
        c = a.vc,
        a = a.pbs;return b && c && a && b < c && c < a && 1 == Fh().info.yt_pvis;
  }
  ;function Lh(a, b) {
    O.call(this);this.B = this.l = a;this.U = b;this.D = !1;this.g = {};this.aa = this.T = null;this.V = new Q();rd(this, w(sd, this.V));this.j = {};this.L = this.ba = this.i = this.ia = this.b = null;this.X = !1;this.M = this.C = this.w = this.R = null;this.ca = {};this.Da = ["onReady"];this.Y = new Hg(this);rd(this, w(sd, this.Y));this.ga = null;this.pa = NaN;this.Z = {};Mh(this);this.G("onDetailedError", v(this.Ta, this));this.G("onTabOrderChange", v(this.Fa, this));this.G("onTabAnnounce", v(this.qa, this));this.G("WATCH_LATER_VIDEO_ADDED", v(this.Ua, this));this.G("WATCH_LATER_VIDEO_REMOVED", v(this.Va, this));vb || (this.G("onMouseWheelCapture", v(this.Ra, this)), this.G("onMouseWheelRelease", v(this.Sa, this)));this.G("onAdAnnounce", v(this.qa, this));this.N = new Hg(this);rd(this, w(sd, this.N));this.ha = !1;this.fa = null;
  }
  z(Lh, O);var Nh = ["drm.unavailable", "fmt.noneavailable", "html5.missingapi", "html5.unsupportedads", "html5.unsupportedlive"];l = Lh.prototype;l.oa = function (a, b) {
    this.f || (Oh(this, a), Ph(this, b), this.D && Qh(this));
  };
  function Oh(a, b) {
    a.ia = b;a.b = Gg(b);a.i = a.b.attrs.id || a.i;"video-player" == a.i && (a.i = a.U, a.b.attrs.id = a.U);a.B.id == a.i && (a.i += "-player", a.b.attrs.id = a.i);a.b.args.enablejsapi = "1";a.b.args.playerapiid = a.U;a.ba || (a.ba = Rh(a, a.b.args.jsapicallback || "onYouTubePlayerReady"));a.b.args.jsapicallback = null;var c = a.b.attrs.width;c && (a.B.style.width = Tb(Number(c) || c));if (c = a.b.attrs.height) a.B.style.height = Tb(Number(c) || c);
  }
  l.Ia = function () {
    return this.ia;
  };
  function Qh(a) {
    a.b.loaded || (a.b.loaded = !0, "0" != a.b.args.autoplay ? a.g.loadVideoByPlayerVars(a.b.args) : a.g.cueVideoByPlayerVars(a.b.args));
  }
  function Sh(a) {
    var b = a.b && a.b.args && a.b.args.fflags;if (b && (0 <= b.indexOf("web_player_disable_flash=true") || 0 <= b.indexOf("web_player_disable_flash_playerproxy=true"))) return !1;if (!p(a.b.disable.flash)) {
      var b = a.b.disable;var c = Lg(Kg.getInstance(), a.b.minVersion);b.flash = !c;
    }return !a.b.disable.flash;
  }
  function Th(a, b) {
    var c;(c = !b) || (c = 5 != (Rg[b.errorCode] || 5) ? !1 : (c = a.b && a.b.args && a.b.args.fflags) && 0 <= c.indexOf("web_player_disable_flash_fallback=true") ? !1 : -1 != Nh.indexOf(b.errorCode));if (c && Sh(a)) {
      (c = Uh(a)) && c.stopVideo && c.stopVideo();var d = a.b;c && c.getUpdatedConfigurationData && (c = c.getUpdatedConfigurationData(), d = Fg(c));d.args.autoplay = 1;d.args.html5_unavailable = "1";Oh(a, d);Ph(a, "flash");
    }
  }
  function Ph(a, b) {
    if (!a.f) {
      if (!b) {
        var c;if (!(c = !a.b.html5 && Sh(a))) {
          if (!p(a.b.disable.html5)) {
            c = !0;void 0 != a.b.args.deviceHasDisplay && (c = a.b.args.deviceHasDisplay);if (2.2 == Sg) var d = !0;else {
              a: {
                var e = c;c = t("yt.player.utils.videoElement_");c || (c = document.createElement("VIDEO"), r("yt.player.utils.videoElement_", c, void 0));try {
                  if (c.canPlayType) for (var e = e ? $g : ah, f = 0; f < e.length; f++) {
                    if (c.canPlayType(e[f])) {
                      d = null;break a;
                    }
                  }d = "fmt.noneavailable";
                } catch (g) {
                  d = "html5.missingapi";
                }
              }d = !d;
            }d && (d = Vh(a) || a.b.assets.js);
            a.b.disable.html5 = !d;d || (a.b.args.html5_unavailable = "1");
          }c = !!a.b.disable.html5;
        }b = c ? Sh(a) ? "flash" : "unsupported" : "html5";
      }("flash" == b ? a.lb : a.mb).call(a);
    }
  }
  function Vh(a) {
    var b = !0,
        c = Uh(a);c && a.b && (a = a.b, b = te(c, "version") == a.assets.js);return b && !!t("yt.player.Application.create");
  }
  l.mb = function () {
    if (!this.X) {
      var a = Vh(this);if (a && "html5" == Wh(this)) this.L = "html5", this.D || this.P();else if (Xh(this), this.L = "html5", a && this.w) this.l.appendChild(this.w), this.P();else {
        this.b.loaded = !0;var b = !1;this.R = v(function () {
          b = !0;var a = this.l,
              d = Gg(this.b);t("yt.player.Application.create")(a, d);this.P();
        }, this);
        this.X = !0;a ? this.R() : (Ne(this.b.assets.js, this.R), Ng(this.b.assets.css), Yh(this) && !b && r("yt.player.Application.create", null, void 0));
      }
    }
  };
  l.lb = function () {
    var a = Gg(this.b);if (!this.C) {
      var b = Uh(this);b && (this.C = document.createElement("SPAN"), this.C.tabIndex = 0, Ig(this.Y, this.C, "focus", this.ua), this.M = document.createElement("SPAN"), this.M.tabIndex = 0, Ig(this.Y, this.M, "focus", this.ua), b.parentNode && b.parentNode.insertBefore(this.C, b), b.parentNode && b.parentNode.insertBefore(this.M, b.nextSibling));
    }a.attrs.width = a.attrs.width || "100%";a.attrs.height = a.attrs.height || "100%";if ("flash" == Wh(this)) this.L = "flash", this.D || this.P();else {
      Xh(this);this.L = "flash";this.b.loaded = !0;var b = Kg.getInstance(),
          c = (-1 < b.i.indexOf("Gnash") && -1 == b.i.indexOf("AVM2") || 9 == b.b && 1 == b.f || 9 == b.b && 0 == b.f && 1 == b.g ? 0 : 9 <= b.b) || -1 < navigator.userAgent.indexOf("Sony/COM2") && !Lg(b, 9, 1, 58) ? a.url : a.urlV9As2;window != window.top && document.referrer && (a.args.framer = document.referrer.substring(0, 128));b = this.l;if (c) {
        var b = q(b) ? Nb(b) : b,
            d = Ka(a.attrs);d.tabindex = 0;var e = Ka(a.params);e.flashvars = Xb(a.args);if (me) {
          d.classid = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";e.movie = c;var a = document.createElement("object");
          for (g in d) {
            a.setAttribute(g, d[g]);
          }for (var f in e) {
            var g = document.createElement("param");g.setAttribute("name", f);g.setAttribute("value", e[f]);a.appendChild(g);
          }
        } else {
          d.type = "application/x-shockwave-flash";d.src = c;a = document.createElement("embed");a.setAttribute("name", d.id);for (var h in d) {
            a.setAttribute(h, d[h]);
          }for (var k in e) {
            a.setAttribute(k, e[k]);
          }
        }f = document.createElement("div");f.appendChild(a);b.innerHTML = f.innerHTML;
      }this.P();
    }
  };
  l.ua = function () {
    Uh(this).focus();
  };
  function Uh(a) {
    var b = Nb(a.i);!b && a.B && a.B.querySelector && (b = a.B.querySelector("#" + a.i));return b;
  }
  l.P = function () {
    if (!this.f) {
      var a = Uh(this),
          b = !1;try {
        a && a.getApiInterface && a.getApiInterface() && (b = !0);
      } catch (f) {}if (b) {
        if (this.X = !1, a.isNotServable && a.isNotServable(this.b.args.video_id)) Th(this);else {
          Mh(this);this.D = !0;a = Uh(this);a.addEventListener && (this.T = Zh(this, a, "addEventListener"));a.removeEventListener && (this.aa = Zh(this, a, "removeEventListener"));for (var b = a.getApiInterface(), b = b.concat(a.getInternalApiInterface()), c = 0; c < b.length; c++) {
            var d = b[c];this.g[d] || (this.g[d] = Zh(this, a, d));
          }for (var e in this.j) {
            this.T(e, this.j[e]);
          }Qh(this);this.ba && this.ba(this.g);this.V.W("onReady", this.g);
        }
      } else this.pa = V(v(this.P, this), 50);
    }
  };
  function Zh(a, b, c) {
    var d = b[c];return function () {
      try {
        return a.ga = null, d.apply(b, arguments);
      } catch (e) {
        "Bad NPObject as private data!" != e.message && "sendAbandonmentPing" != c && (e.message += " (" + c + ")", a.ga = e, T(e, "WARNING"));
      }
    };
  }
  function Mh(a) {
    a.D = !1;if (a.aa) for (var b in a.j) {
      a.aa(b, a.j[b]);
    }for (var c in a.Z) {
      window.clearTimeout(parseInt(c, 10));
    }a.Z = {};a.T = null;a.aa = null;for (var d in a.g) {
      a.g[d] = null;
    }a.g.addEventListener = v(a.G, a);a.g.removeEventListener = v(a.bb, a);a.g.destroy = v(a.dispose, a);a.g.getLastError = v(a.Ja, a);a.g.getPlayerType = v(a.Ka, a);a.g.getCurrentVideoConfig = v(a.Ia, a);a.g.loadNewVideoConfig = v(a.oa, a);a.g.isReady = v(a.nb, a);
  }
  l.nb = function () {
    return this.D;
  };
  l.G = function (a, b) {
    if (!this.f) {
      var c = Rh(this, b);if (c) {
        if (!(0 <= xa(this.Da, a) || this.j[a])) {
          var d = $h(this, a);this.T && this.T(a, d);
        }this.V.subscribe(a, c);"onReady" == a && this.D && V(w(c, this.g), 0);
      }
    }
  };
  l.bb = function (a, b) {
    if (!this.f) {
      var c = Rh(this, b);c && $d(this.V, a, c);
    }
  };
  function Rh(a, b) {
    var c = b;if ("string" == typeof b) {
      if (a.ca[b]) return a.ca[b];c = function c() {
        var a = t(b);a && a.apply(n, arguments);
      };
      a.ca[b] = c;
    }return c ? c : null;
  }
  function $h(a, b) {
    var c = "ytPlayer" + b + a.U;a.j[b] = c;n[c] = function (c) {
      var d = V(function () {
        if (!a.f) {
          a.V.W(b, c);var e = a.Z,
              g = String(d);g in e && delete e[g];
        }
      }, 0);
      Ja(a.Z, String(d));
    };
    return c;
  }
  l.Fa = function (a) {
    a = a ? Pb : Ob;for (var b = a(document.activeElement); b && (1 != b.nodeType || b == this.C || b == this.M || (b.focus(), b != document.activeElement));) {
      b = a(b);
    }
  };
  l.qa = function (a) {
    De("a11y-announce", a);
  };
  l.Ta = function (a) {
    Th(this, a);
  };
  l.Ua = function (a) {
    De("WATCH_LATER_VIDEO_ADDED", a);
  };
  l.Va = function (a) {
    De("WATCH_LATER_VIDEO_REMOVED", a);
  };
  l.Ra = function () {
    if (!this.ha) {
      if (zb) {
        var a = document,
            b = a.scrollingElement ? a.scrollingElement : fb || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement,
            a = a.parentWindow || a.defaultView;this.fa = cb && sb("10") && a.pageYOffset != b.scrollTop ? new Da(b.scrollLeft, b.scrollTop) : new Da(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop);Ig(this.N, window, "scroll", this.Ya);Ig(this.N, this.l, "touchmove", this.Xa);
      } else Ig(this.N, this.l, "mousewheel", this.va), Ig(this.N, this.l, "wheel", this.va);this.ha = !0;
    }
  };
  l.Sa = function () {
    Jg(this.N);this.ha = !1;
  };
  l.va = function (a) {
    a = a || window.event;a.returnValue = !1;a.preventDefault && a.preventDefault();
  };
  l.Ya = function () {
    window.scrollTo(this.fa.b, this.fa.f);
  };
  l.Xa = function (a) {
    a.preventDefault();
  };
  l.Ka = function () {
    return this.L || Wh(this);
  };
  l.Ja = function () {
    return this.ga;
  };
  function Wh(a) {
    return (a = Uh(a)) ? "div" == a.tagName.toLowerCase() ? "html5" : "flash" : null;
  }
  function Xh(a) {
    yh("dcp");a.cancel();Mh(a);a.L = null;a.b && (a.b.loaded = !1);var b = Uh(a);"html5" == Wh(a) ? Vh(a) || !Yh(a) ? a.w = b : (b && b.destroy && b.destroy(), a.w = null) : b && b.destroy && b.destroy();for (var b = a.l, c; c = b.firstChild;) {
      b.removeChild(c);
    }Jg(a.Y);a.C = null;a.M = null;
  }
  l.cancel = function () {
    this.R && Me(this.b.assets.js, this.R);window.clearTimeout(this.pa);this.X = !1;
  };
  l.o = function () {
    Xh(this);if (this.w && this.b && this.w.destroy) try {
      this.w.destroy();
    } catch (b) {
      T(b);
    }this.ca = null;for (var a in this.j) {
      n[this.j[a]] = null;
    }this.ia = this.b = this.g = null;delete this.l;delete this.B;Lh.A.o.call(this);
  };
  function Yh(a) {
    return a.b && a.b.args && a.b.args.fflags ? -1 != a.b.args.fflags.indexOf("player_destroy_old_version=true") : !1;
  }
  ;var ai = {},
      bi = "player_uid_" + (1E9 * Math.random() >>> 0);function ci(a) {
    var b = "player",
        b = q(b) ? Nb(b) : b;a = Fg(a);var c = bi + "_" + (b[oa] || (b[oa] = ++pa)),
        d = ai[c];if (d) return d.oa(a), d.g;d = new Lh(b, c);ai[c] = d;De("player-added", d.g);rd(d, w(di, d));V(function () {
      d.oa(a);
    }, 0);
    return d.g;
  }
  function di(a) {
    ai[a.U] = null;
  }
  ;function ei(a, b, c) {
    if (na(a)) {
      b = "endSeconds startSeconds mediaContentUrl suggestedQuality videoId two_stage_token".split(" ");c = {};for (var d = 0; d < b.length; d++) {
        var e = b[d];a[e] && (c[e] = a[e]);
      }return c;
    }return { videoId: a, startSeconds: b, suggestedQuality: c };
  }
  function fi(a, b, c) {
    q(a) && (a = { mediaContentUrl: a, startSeconds: b, suggestedQuality: c });b = /\/([ve]|embed)\/([^#?]+)/.exec(a.mediaContentUrl);a.videoId = b && b[2] ? b[2] : null;return ei(a);
  }
  function gi(a, b, c, d) {
    if (na(a) && !ka(a)) {
      b = "playlist list listType index startSeconds suggestedQuality".split(" ");c = {};for (d = 0; d < b.length; d++) {
        var e = b[d];a[e] && (c[e] = a[e]);
      }return c;
    }b = { index: b, startSeconds: c, suggestedQuality: d };q(a) && 16 == a.length ? b.list = "PL" + a : b.playlist = a;return b;
  }
  function hi(a) {
    var b = a.video_id || a.videoId;if (q(b)) {
      var c = dg() || {},
          d = dg() || {};p(void 0) ? d[b] = void 0 : delete d[b];var e = x() + 3E5,
          f = fg;if (f && window.JSON) {
        q(d) || (d = JSON.stringify(d, void 0));try {
          f.set("yt-player-two-stage-token", d, e);
        } catch (g) {
          f.remove("yt-player-two-stage-token");
        }
      }(b = c[b]) && (a.two_stage_token = b);
    }
  }
  function ii(a) {
    return (0 == a.search("cue") || 0 == a.search("load")) && "loadModule" != a;
  }
  ;function ji(a) {
    O.call(this);this.g = a;this.g.subscribe("command", this.ya, this);this.i = {};this.j = !1;
  }
  z(ji, O);l = ji.prototype;l.start = function () {
    this.j || this.f || (this.j = !0, ki(this.g, "RECEIVING"));
  };
  l.ya = function (a, b) {
    if (this.j && !this.f) {
      var c = b || {};switch (a) {case "addEventListener":
          if (q(c.event) && (c = c.event, !(c in this.i))) {
            var d = v(this.eb, this, c);this.i[c] = d;this.addEventListener(c, d);
          }break;case "removeEventListener":
          q(c.event) && li(this, c.event);break;default:
          this.b.isReady() && this.b[a] && (c = mi(a, b || {}), c = this.b[a].apply(this.b, c), (c = ni(a, c)) && this.j && !this.f && ki(this.g, a, c));}
    }
  };
  l.eb = function (a, b) {
    this.j && !this.f && ki(this.g, a, this.ja(a, b));
  };
  l.ja = function (a, b) {
    if (null != b) return { value: b };
  };
  function li(a, b) {
    b in a.i && (a.removeEventListener(b, a.i[b]), delete a.i[b]);
  }
  l.o = function () {
    var a = this.g;a.f || $d(a.b, "command", this.ya, this);this.g = null;for (var b in this.i) {
      li(this, b);
    }ji.A.o.call(this);
  };function oi(a, b) {
    ji.call(this, b);this.b = a;this.start();
  }
  z(oi, ji);oi.prototype.addEventListener = function (a, b) {
    this.b.addEventListener(a, b);
  };
  oi.prototype.removeEventListener = function (a, b) {
    this.b.removeEventListener(a, b);
  };
  function mi(a, b) {
    switch (a) {case "loadVideoById":
        return b = ei(b), hi(b), [b];case "cueVideoById":
        return b = ei(b), hi(b), [b];case "loadVideoByPlayerVars":
        return hi(b), [b];case "cueVideoByPlayerVars":
        return hi(b), [b];case "loadPlaylist":
        return b = gi(b), hi(b), [b];case "cuePlaylist":
        return b = gi(b), hi(b), [b];case "seekTo":
        return [b.seconds, b.allowSeekAhead];case "playVideoAt":
        return [b.index];case "setVolume":
        return [b.volume];case "setPlaybackQuality":
        return [b.suggestedQuality];case "setPlaybackRate":
        return [b.suggestedRate];
      case "setLoop":
        return [b.loopPlaylists];case "setShuffle":
        return [b.shufflePlaylist];case "getOptions":
        return [b.module];case "getOption":
        return [b.module, b.option];case "setOption":
        return [b.module, b.option, b.value];case "handleGlobalKeyDown":
        return [b.keyCode, b.shiftKey];}return [];
  }
  function ni(a, b) {
    switch (a) {case "isMuted":
        return { muted: b };case "getVolume":
        return { volume: b };case "getPlaybackRate":
        return { playbackRate: b };case "getAvailablePlaybackRates":
        return { availablePlaybackRates: b };case "getVideoLoadedFraction":
        return { videoLoadedFraction: b };case "getPlayerState":
        return { playerState: b };case "getCurrentTime":
        return { currentTime: b };case "getPlaybackQuality":
        return { playbackQuality: b };case "getAvailableQualityLevels":
        return { availableQualityLevels: b };case "getDuration":
        return { duration: b };
      case "getVideoUrl":
        return { videoUrl: b };case "getVideoEmbedCode":
        return { videoEmbedCode: b };case "getPlaylist":
        return { playlist: b };case "getPlaylistIndex":
        return { playlistIndex: b };case "getOptions":
        return { options: b };case "getOption":
        return { option: b };}
  }
  oi.prototype.ja = function (a, b) {
    switch (a) {case "onReady":
        return;case "onStateChange":
        return { playerState: b };case "onPlaybackQualityChange":
        return { playbackQuality: b };case "onPlaybackRateChange":
        return { playbackRate: b };case "onError":
        return { errorCode: b };}return oi.A.ja.call(this, a, b);
  };
  oi.prototype.o = function () {
    oi.A.o.call(this);delete this.b;
  };function pi(a, b, c, d) {
    O.call(this);this.g = b || null;this.B = "*";this.i = c || null;this.sessionId = null;this.channel = d || null;this.D = !!a;this.w = v(this.C, this);window.addEventListener("message", this.w);
  }
  aa(pi, O);
  pi.prototype.C = function (a) {
    if (!("*" != this.i && a.origin != this.i || this.g && a.source != this.g) && q(a.data)) {
      try {
        var b = Ad(a.data);
      } catch (c) {
        return;
      }if (!(null == b || this.D && (this.sessionId && this.sessionId != b.id || this.channel && this.channel != b.channel)) && b) switch (b.event) {case "listening":
          "null" != a.origin ? this.i = this.B = a.origin : T(Error("MessageEvent origin is null"), "WARNING");this.g = a.source;this.sessionId = b.id;this.b && (this.b(), this.b = null);break;case "command":
          this.j && (this.l && !(0 <= xa(this.l, b.func)) || this.j(b.func, b.args));}
    }
  };
  pi.prototype.sendMessage = function (a, b) {
    var c = b || this.g;if (c) {
      this.sessionId && (a.id = this.sessionId);this.channel && (a.channel = this.channel);try {
        var d = Bd(a);c.postMessage(d, this.B);
      } catch (e) {
        T(e, "WARNING");
      }
    }
  };
  pi.prototype.o = function () {
    window.removeEventListener("message", this.w);O.prototype.o.call(this);
  };function qi(a, b, c) {
    pi.call(this, a, b, c || S("POST_MESSAGE_ORIGIN", void 0) || window.document.location.protocol + "//" + window.document.location.hostname, "widget");this.l = this.b = this.j = null;
  }
  aa(qi, pi);function ri() {
    var a = !!S("WIDGET_ID_ENFORCE"),
        a = this.f = new qi(a),
        b = v(this.ab, this);a.j = b;a.l = null;this.f.channel = "widget";if (a = S("WIDGET_ID")) this.f.sessionId = a;this.i = [];this.l = !1;this.j = {};
  }
  l = ri.prototype;l.ab = function (a, b) {
    if ("addEventListener" == a && b) {
      var c = b[0];this.j[c] || "onReady" == c || (this.addEventListener(c, si(this, c)), this.j[c] = !0);
    } else this.Ba(a, b);
  };
  l.Ba = function () {};
  function si(a, b) {
    return v(function (a) {
      this.sendMessage(b, a);
    }, a);
  }
  l.addEventListener = function () {};
  l.Ha = function () {
    this.l = !0;this.sendMessage("initialDelivery", this.ka());this.sendMessage("onReady");C(this.i, this.Aa, this);this.i = [];
  };
  l.ka = function () {
    return null;
  };
  function ti(a, b) {
    a.sendMessage("infoDelivery", b);
  }
  l.Aa = function (a) {
    this.l ? this.f.sendMessage(a) : this.i.push(a);
  };
  l.sendMessage = function (a, b) {
    this.Aa({ event: a, info: void 0 == b ? null : b });
  };
  l.dispose = function () {
    this.f = null;
  };function ui(a) {
    ri.call(this);this.b = a;this.g = [];this.addEventListener("onReady", v(this.Wa, this));this.addEventListener("onVideoProgress", v(this.ib, this));this.addEventListener("onVolumeChange", v(this.jb, this));this.addEventListener("onApiChange", v(this.cb, this));this.addEventListener("onPlaybackQualityChange", v(this.fb, this));this.addEventListener("onPlaybackRateChange", v(this.gb, this));this.addEventListener("onStateChange", v(this.hb, this));
  }
  z(ui, ri);l = ui.prototype;l.Ba = function (a, b) {
    if (this.b[a]) {
      b = b || [];if (0 < b.length && ii(a)) {
        var c = b;if (na(c[0]) && !ka(c[0])) c = c[0];else {
          var d = {};switch (a) {case "loadVideoById":case "cueVideoById":
              d = ei.apply(window, c);break;case "loadVideoByUrl":case "cueVideoByUrl":
              d = fi.apply(window, c);break;case "loadPlaylist":case "cuePlaylist":
              d = gi.apply(window, c);}c = d;
        }hi(c);b.length = 1;b[0] = c;
      }this.b[a].apply(this.b, b);ii(a) && ti(this, this.ka());
    }
  };
  l.Wa = function () {
    var a = v(this.Ha, this);this.f.b = a;
  };
  l.addEventListener = function (a, b) {
    this.g.push({ eventType: a, listener: b });this.b.addEventListener(a, b);
  };
  l.ka = function () {
    if (!this.b) return null;var a = this.b.getApiInterface();Aa(a, "getVideoData");for (var b = { apiInterface: a }, c = 0, d = a.length; c < d; c++) {
      var e = a[c],
          f = e;if (0 == f.search("get") || 0 == f.search("is")) {
        var f = e,
            g = 0;0 == f.search("get") ? g = 3 : 0 == f.search("is") && (g = 2);f = f.charAt(g).toLowerCase() + f.substr(g + 1);try {
          var h = this.b[e]();b[f] = h;
        } catch (k) {}
      }
    }b.videoData = this.b.getVideoData();b.currentTimeLastUpdated_ = x() / 1E3;return b;
  };
  l.hb = function (a) {
    a = { playerState: a, currentTime: this.b.getCurrentTime(), duration: this.b.getDuration(), videoData: this.b.getVideoData(), videoStartBytes: 0, videoBytesTotal: this.b.getVideoBytesTotal(), videoLoadedFraction: this.b.getVideoLoadedFraction(), playbackQuality: this.b.getPlaybackQuality(), availableQualityLevels: this.b.getAvailableQualityLevels(), videoUrl: this.b.getVideoUrl(), playlist: this.b.getPlaylist(), playlistIndex: this.b.getPlaylistIndex(), currentTimeLastUpdated_: x() / 1E3, playbackRate: this.b.getPlaybackRate(),
      mediaReferenceTime: this.b.getMediaReferenceTime() };this.b.getProgressState && (a.progressState = this.b.getProgressState());this.b.getStoryboardFormat && (a.storyboardFormat = this.b.getStoryboardFormat());ti(this, a);
  };
  l.fb = function (a) {
    ti(this, { playbackQuality: a });
  };
  l.gb = function (a) {
    ti(this, { playbackRate: a });
  };
  l.cb = function () {
    for (var a = this.b.getOptions(), b = { namespaces: a }, c = 0, d = a.length; c < d; c++) {
      var e = a[c],
          f = this.b.getOptions(e);b[e] = { options: f };for (var g = 0, h = f.length; g < h; g++) {
        var k = f[g],
            m = this.b.getOption(e, k);b[e][k] = m;
      }
    }this.sendMessage("apiInfoDelivery", b);
  };
  l.jb = function () {
    ti(this, { muted: this.b.isMuted(), volume: this.b.getVolume() });
  };
  l.ib = function (a) {
    a = { currentTime: a, videoBytesLoaded: this.b.getVideoBytesLoaded(), videoLoadedFraction: this.b.getVideoLoadedFraction(), currentTimeLastUpdated_: x() / 1E3, playbackRate: this.b.getPlaybackRate(), mediaReferenceTime: this.b.getMediaReferenceTime() };this.b.getProgressState && (a.progressState = this.b.getProgressState());ti(this, a);
  };
  l.dispose = function () {
    ui.A.dispose.call(this);for (var a = 0; a < this.g.length; a++) {
      var b = this.g[a];this.b.removeEventListener(b.eventType, b.listener);
    }this.g = [];
  };function vi() {
    O.call(this);this.b = new Q();rd(this, w(sd, this.b));
  }
  z(vi, O);vi.prototype.subscribe = function (a, b, c) {
    return this.f ? 0 : this.b.subscribe(a, b, c);
  };
  vi.prototype.K = function (a) {
    return this.f ? !1 : this.b.K(a);
  };
  vi.prototype.l = function (a, b) {
    this.f || this.b.W.apply(this.b, arguments);
  };function wi(a, b, c) {
    vi.call(this);this.g = a;this.i = b;this.j = c;
  }
  z(wi, vi);function ki(a, b, c) {
    if (!a.f) {
      var d = a.g;d.f || a.i != d.b || (a = { id: a.j, command: b }, c && (a.data = c), d.b.postMessage(Bd(a), d.i));
    }
  }
  wi.prototype.o = function () {
    this.i = this.g = null;wi.A.o.call(this);
  };function xi(a, b, c) {
    O.call(this);this.b = a;this.i = c;this.j = Ef(window, "message", v(this.l, this));this.g = new wi(this, a, b);rd(this, w(sd, this.g));
  }
  z(xi, O);xi.prototype.l = function (a) {
    var b;if (b = !this.f) if (b = a.origin == this.i) a: {
      b = this.b;do {
        b: {
          var c = a.source;do {
            if (c == b) {
              c = !0;break b;
            }if (c == c.parent) break;c = c.parent;
          } while (null != c);c = !1;
        }if (c) {
          b = !0;break a;
        }b = b.opener;
      } while (null != b);b = !1;
    }if (b && (a = a.data, q(a))) {
      try {
        a = Ad(a);
      } catch (d) {
        return;
      }a.command && (b = this.g, b.f || b.l("command", a.command, a.data));
    }
  };
  xi.prototype.o = function () {
    Ff(this.j);this.b = null;xi.A.o.call(this);
  };function yi() {
    var a = Ka(zi);return new P(function (b, c) {
      a.J = function (a) {
        Ve(a) ? b(a) : c(new Ai("Request failed, status=" + a.status, "net.badstatus"));
      };
      a.onError = function () {
        c(new Ai("Unknown request error", "net.unknown"));
      };
      a.O = function () {
        c(new Ai("Request timed out", "net.timeout"));
      };
      bf("//googleads.g.doubleclick.net/pagead/id", a);
    });
  }
  function Ai(a, b) {
    B.call(this, a + ", errorCode=" + b);this.errorCode = b;this.name = "PromiseAjaxError";
  }
  aa(Ai, B);function Bi(a) {
    B.call(this, a.message || a.description || a.name);this.b = a instanceof Qd;
  }
  aa(Bi, B);Bi.prototype.name = "BiscottiError";function Ci() {
    B.call(this, "Biscotti ID is missing from server");
  }
  aa(Ci, B);Ci.prototype.name = "BiscottiMissingError";function Di(a, b) {
    this.f = a;this.b = b;
  }
  Di.prototype.then = function (a, b, c) {
    try {
      if (p(this.f)) return a ? Md(a.call(c, this.f)) : Md(this.f);if (p(this.b)) {
        if (!b) return Nd(this.b);var d = b.call(c, this.b);return !p(d) && this.b.b ? Nd(this.b) : Md(d);
      }throw Error("Invalid Result state");
    } catch (e) {
      return Nd(e);
    }
  };
  Hd(Di);var zi = { format: "RAW", method: "GET", timeout: 5E3, withCredentials: !0 },
      Ei = null;function Fi() {
    var a = S("PLAYER_CONFIG", void 0);if (a && "1" == a.privembed) return Nd(Error("Biscotti ID is not available in private embed mode"));Ei || (Ei = Pd(yi().then(Gi), function (a) {
      return Hi(2, a);
    }));
    return Ei;
  }
  function Gi(a) {
    a = a.responseText;if (0 != a.lastIndexOf(")]}'", 0)) throw new Ci();a = JSON.parse(a.substr(4));if ((Fa(window, "settings", "experiments", "flags", "html5_serverside_ignore_biscotti_id_on_retry") || S("EXP_HTML5_SERVERSIDE_IGNORE_BISCOTTI_ID_ON_RETRY", !1) || U("html5_serverside_ignore_biscotti_id_on_retry")) && 1 < (a.type || 1)) throw new Ci();a = a.id;Ii(a);Ei = new Di(a);Ji(18E5, 2);return a;
  }
  function Hi(a, b) {
    var c = new Bi(b);Ii("");Ei = new Di(void 0, c);0 < a && Ji(12E4, a - 1);throw c;
  }
  function Ji(a, b) {
    V(function () {
      Pd(yi().then(Gi, function (a) {
        return Hi(b, a);
      }), u);
    }, a);
  }
  function Ii(a) {
    r("yt.ads.biscotti.lastId_", a, void 0);
  }
  ;function Ki() {}
  function Li(a) {
    var b = S("PLAYER_CONFIG", void 0);if (!b || "1" != b.privembed) {
      a && !t("yt.ads.biscotti.getId_") && r("yt.ads.biscotti.getId_", Fi, void 0);try {
        try {
          var c = t("yt.ads.biscotti.getId_");var d = c ? c() : Fi();
        } catch (e) {
          d = Nd(e);
        }d.then(Mi, Ki);V(Li, 18E5);
      } catch (e) {
        T(e);
      }
    }
  }
  var Ni = 0;
  function Mi(a) {
    a: {
      try {
        var b = window.top.location.href;
      } catch (G) {
        b = 2;break a;
      }b = null != b ? b == window.document.location.href ? 0 : 1 : 2;
    }b = { dt: gc, flash: Xa || "0", frm: b };b.u_tz = -new Date().getTimezoneOffset();try {
      var c = A.history.length;
    } catch (G) {
      c = 0;
    }b.u_his = c;b.u_java = !!A.navigator && "unknown" !== typeof A.navigator.javaEnabled && !!A.navigator.javaEnabled && A.navigator.javaEnabled();A.screen && (b.u_h = A.screen.height, b.u_w = A.screen.width, b.u_ah = A.screen.availHeight, b.u_aw = A.screen.availWidth, b.u_cd = A.screen.colorDepth);A.navigator && A.navigator.plugins && (b.u_nplug = A.navigator.plugins.length);A.navigator && A.navigator.mimeTypes && (b.u_nmime = A.navigator.mimeTypes.length);b.bid = a;b.ca_type = Wa ? "flash" : "image";if (U("enable_server_side_search_pyv") || U("enable_server_side_mweb_search_pyv")) {
      a = window;try {
        var d = a.screenX;var e = a.screenY;
      } catch (G) {}try {
        var f = a.outerWidth;var g = a.outerHeight;
      } catch (G) {}try {
        var h = a.innerWidth;var k = a.innerHeight;
      } catch (G) {}k = [a.screenLeft, a.screenTop, d, e, a.screen ? a.screen.availWidth : void 0, a.screen ? a.screen.availTop : void 0, f, g, h, k];h = window.top || A;try {
        if (h.document && !h.document.body) var m = new Ea(-1, -1);else {
          var y = (h || window).document,
              D = "CSS1Compat" == y.compatMode ? y.documentElement : y.body;m = new Ea(D.clientWidth, D.clientHeight).round();
        }var N = m;
      } catch (G) {
        N = new Ea(-12245933, -12245933);
      }m = 0;window.SVGElement && document.createElementNS && (m |= 1);N = { bc: m, bih: N.height, biw: N.width, brdim: k.join(), vis: { visible: 1, hidden: 2, prerender: 3, preview: 4 }[sa.webkitVisibilityState || sa.mozVisibilityState || sa.visibilityState || ""] || 0, wgl: !!A.WebGLRenderingContext };
      for (var ta in N) {
        b[ta] = N[ta];
      }
    }b.bsq = Ni++;hf("//www.youtube.com/ad_data_204", { La: !1, F: b });
  }
  ;function Oi() {
    this.b = S("ALT_PREF_COOKIE_NAME", "PREF");var a = wc.get("" + this.b, void 0);if (a) for (var a = unescape(a).split("&"), b = 0; b < a.length; b++) {
      var c = a[b].split("="),
          d = c[0];(c = c[1]) && (Z[d] = c.toString());
    }
  }
  ia(Oi);var Z = t("yt.prefs.UserPrefs.prefs_") || {};r("yt.prefs.UserPrefs.prefs_", Z, void 0);function Pi(a) {
    if (/^f([1-9][0-9]*)$/.test(a)) throw Error("ExpectedRegexMatch: " + a);
  }
  function Qi(a) {
    if (!/^\w+$/.test(a)) throw Error("ExpectedRegexMismatch: " + a);
  }
  function Ri(a) {
    a = void 0 !== Z[a] ? Z[a].toString() : null;return null != a && /^[A-Fa-f0-9]+$/.test(a) ? parseInt(a, 16) : null;
  }
  Oi.prototype.get = function (a, b) {
    Qi(a);Pi(a);var c = void 0 !== Z[a] ? Z[a].toString() : null;return null != c ? c : b ? b : "";
  };
  Oi.prototype.set = function (a, b) {
    Qi(a);Pi(a);if (null == b) throw Error("ExpectedNotNull");Z[a] = b.toString();
  };
  Oi.prototype.remove = function (a) {
    Qi(a);Pi(a);delete Z[a];
  };
  Oi.prototype.clear = function () {
    Z = {};
  };var Si = null,
      Ti = null,
      Ui = null,
      Vi = {};function Wi(a) {
    Zf(a.payload_name, a.payload, U("enable_youtubei_innertube") ? zg : vg, void 0, void 0);
  }
  function Xi(a) {
    var b = a.id;a = a.ve_type;var c = Lf++;a = new Kf(void 0, a, c, void 0, void 0);Vi[b] = a;b = jg();c = ig();b && c && $f(Ag(), b, c, a);
  }
  function Yi(a) {
    var b = a.csn;a = a.root_ve_type;if (b && a && (R("client-screen-nonce", b), R("ROOT_VE_TYPE", a), a = ig())) for (var c in Vi) {
      var d = Vi[c];if (d) {
        var e = b,
            f = a;$f(Ag(), e, f, d);
      }
    }
  }
  function Zi(a) {
    Vi[a.id] = new Kf(a.tracking_params);
  }
  function $i(a) {
    var b = jg();a = Vi[a.id];if (b && a) {
      var c = Ag();ag(c, { click: { csn: b, visualElement: Mf(a) } }, void 0);
    }
  }
  function aj(a) {
    a = a.ids;var b = jg();if (b) {
      for (var c = [], d = 0; d < a.length; d++) {
        var e = Vi[a[d]];e && c.push(e);
      }c.length && bg(Ag(), b, c);
    }
  }
  function bj() {
    var a = Si;a && a.startInteractionLogging && a.startInteractionLogging();
  }
  ;r("yt.setConfig", R, void 0);r("yt.config.set", R, void 0);r("yt.setMsg", rf, void 0);r("yt.msgs.set", rf, void 0);r("yt.logging.errors.log", nf, void 0);
  r("writeEmbed", function () {
    var a = S("PLAYER_CONFIG", void 0);Li(!0);"gvn" == a.args.ps && (document.body.style.backgroundColor = "transparent");var b = document.referrer,
        c = S("POST_MESSAGE_ORIGIN");window != window.top && b && b != document.URL && (a.args.loaderUrl = b);S("LIGHTWEIGHT_AUTOPLAY") && (a.args.autoplay = "1");a.args.autoplay && hi(a.args);Si = a = ci(a);a.addEventListener("onScreenChanged", Yi);a.addEventListener("onLogClientVeCreated", Xi);a.addEventListener("onLogServerVeCreated", Zi);a.addEventListener("onLogToGel", Wi);
    a.addEventListener("onLogVeClicked", $i);a.addEventListener("onLogVesShown", aj);a.addEventListener("onReady", bj);b = S("POST_MESSAGE_ID", "player");S("ENABLE_JS_API") ? Ui = new ui(a) : S("ENABLE_POST_API") && q(b) && q(c) && (Ti = new xi(window.parent, b, c), Ui = new oi(a, Ti.g));S("BG_P") && (S("BG_I") || S("BG_IU")) && Pe();wf();
  }, void 0);
  r("yt.www.watch.ads.restrictioncookie.spr", function (a) {
    lf(a + "mac_204?action_fcts=1");return !0;
  }, void 0);
  var cj = qe(function () {
    yh("ol");var a = Oi.getInstance(),
        b = 1 < window.devicePixelRatio;if (!!((Ri("f" + (Math.floor(119 / 31) + 1)) || 0) & 67108864) != b) {
      var c = "f" + (Math.floor(119 / 31) + 1),
          d = Ri(c) || 0,
          d = b ? d | 67108864 : d & -67108865;0 == d ? delete Z[c] : Z[c] = d.toString(16).toString();var a = a.b,
          b = [],
          e;for (e in Z) {
        b.push(e + "=" + escape(Z[e]));
      }wc.set("" + a, b.join("&"), 63072E3, "/", "youtube.com");
    }
  }),
      dj = qe(function () {
    var a = Si;
    a && a.sendAbandonmentPing && a.sendAbandonmentPing();S("PL_ATT") && (Oe = null);for (var a = 0, b = uf.length; a < b; a++) {
      tf(uf[a]);
    }uf.length = 0;Le("//static.doubleclick.net/instream/ad_status.js");vf = !1;R("DCLKSTAT", 0);td(Ui, Ti);if (a = Si) a.removeEventListener("onScreenChanged", Yi), a.removeEventListener("onLogClientVeCreated", Xi), a.removeEventListener("onLogServerVeCreated", Zi), a.removeEventListener("onLogToGel", Wi), a.removeEventListener("onLogVeClicked", $i), a.removeEventListener("onLogVesShown", aj), a.removeEventListener("onReady", bj), a.destroy();Vi = {};
  });
  window.addEventListener ? (window.addEventListener("load", cj), window.addEventListener("unload", dj)) : window.attachEvent && (window.attachEvent("onload", cj), window.attachEvent("onunload", dj));
}).call(undefined);
//# sourceMappingURL=www-embed-player.js.map