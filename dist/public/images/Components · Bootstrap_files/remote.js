"use strict";

(function (g) {
  var window = this;var uwa = function uwa(a, b) {
    var c = [];g.Dl(b, function (a) {
      try {
        var b = g.oD.prototype.o.call(this, a, !0);
      } catch (f) {
        if ("Storage: Invalid value was encountered" == f) return;throw f;
      }g.t(b) ? g.nD(b) && c.push(a) : c.push(a);
    }, a);
    return c;
  },
      vwa = function vwa(a, b) {
    var c = uwa(a, b);
    (0, g.G)(c, function (a) {
      g.oD.prototype.remove.call(this, a);
    }, a);
  },
      A8 = function A8(a, b) {
    g.N0.call(this, g.T("YTP_MDX_TITLE"), 0, a, b);
    this.U = a;this.F = {};this.T(a, "onMdxReceiversChange", this.J);this.T(a, "presentingplayerstatechange", this.J);this.J();
  },
      wwa = function wwa() {
    var a = g.MG;
    vwa(a, a.g.Wd(!0));
  },
      B8 = function B8(a) {
    g.oH.call(this, "ScreenServiceProxy");
    this.ed = a;this.o = [];this.o.push(this.ed.$_s("screenChange", (0, g.y)(this.xT, this)));this.o.push(this.ed.$_s("onlineScreenChange", (0, g.y)(this.HP, this)));
  },
      C8 = function C8(a) {
    g.bH("cloudview", a);
  },
      xwa = function xwa(a) {
    C8("setApiReady_ " + a);
    g.qa("yt.mdx.remote.cloudview.apiReady_", a, void 0);
  },
      D8 = function D8() {
    return g.v("yt.mdx.remote.cloudview.instance_");
  },
      ywa = function ywa(a) {
    g.dG[a] && (a = g.dG[a], (0, g.G)(a, function (a) {
      g.bG[a] && delete g.bG[a];
    }), a.length = 0);
  },
      E8 = function E8() {
    return g.v("yt.mdx.remote.connection_");
  },
      F8 = function F8(a) {
    g.qa("yt.mdx.remote.connectData_", a, void 0);
  },
      zwa = function zwa(a) {
    g.qa("yt.mdx.remote.currentScreenId_", a, void 0);
  },
      G8 = function G8() {
    return g.v("yt.mdx.remote.currentScreenId_");
  },
      I8 = function I8() {
    if (!H8) {
      var a = g.v("yt.mdx.remote.screenService_");
      H8 = a ? new B8(a) : null;
    }return H8;
  },
      J8 = function J8(a) {
    g.qa("yt.mdx.remote.cloudview.initializing_", a, void 0);
  },
      K8 = function K8() {
    return !!g.v("yt.mdx.remote.cloudview.apiReady_");
  },
      L8 = function L8(a) {
    C8("setCastInstalled_ " + a);
    g.OG("yt-remote-cast-installed", a);
  },
      M8 = function M8(a) {
    g.bH("cloudview", a);
  },
      Awa = function Awa(a, b) {
    D8().init(a, b);
  },
      N8 = function N8() {
    return !!g.PG("yt-remote-cast-installed");
  },
      Bwa = function Bwa() {
    C8("dispose");
    var a = D8();a && a.dispose();g.qa("yt.mdx.remote.cloudview.instance_", null, void 0);xwa(!1);g.fG(O8);O8.length = 0;
  },
      Cwa = function Cwa() {
    var a = window.document.createElement("a");
    g.Gd(a, "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js");a = a.href.replace(/^[a-zA-Z]+:\/\//, "//");return "js-" + g.Ua(a);
  },
      Dwa = function Dwa(a, b) {
    var c = window.document.createElement("script");
    c.id = a;c.onload = function () {
      b && (0, window.setTimeout)(b, 0);
    };
    c.onreadystatechange = function () {
      switch (c.readyState) {case "loaded":case "complete":
          c.onload();}
    };
    c.src = "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js";var d = window.document.getElementsByTagName("head")[0] || window.document.body;d.insertBefore(c, d.firstChild);return c;
  },
      Ewa = function Ewa(a) {
    var b = g.aG();
    if (b) if (b.clear(a), a) ywa(a);else for (var c in g.dG) {
      ywa(c);
    }
  },
      P8 = function P8(a) {
    return 0 <= window.navigator.userAgent.indexOf(a);
  },
      Q8 = function Q8() {
    return g.v("yt.mdx.remote.channelParams_") || {};
  },
      S8 = function S8(a) {
    var b = E8();
    F8(null);a || zwa("");g.qa("yt.mdx.remote.connection_", a, void 0);R8 && ((0, g.G)(R8, function (b) {
      b(a);
    }), R8.length = 0);
    b && !a ? g.iG("yt-remote-connection-change", !1) : !b && a && g.iG("yt-remote-connection-change", !0);
  },
      Fwa = function Fwa() {
    return g.v("yt.mdx.remote.connectData_");
  },
      T8 = function T8() {
    var a = G8();
    if (!a) return null;var b = I8().de();return g.nH(b, a);
  },
      Gwa = function Gwa(a, b) {
    L8(!0);
    J8(!1);Awa(a, function (a) {
      a ? (xwa(!0), g.gG("yt-remote-cast2-api-ready")) : (M8("Failed to initialize cast API."), L8(!1), g.QG("yt-remote-cast-available"), g.QG("yt-remote-cast-receiver"), Bwa());b(a);
    });
  },
      Hwa = function Hwa() {
    return N8() ? D8() ? D8().getCastSession() : (M8("getCastSelector: Cast is not initialized."), null) : (M8("getCastSelector: Cast API is not installed!"), null);
  },
      Iwa = function Iwa() {
    var a = Cwa(),
        b = window.document.getElementById(a),
        c = b && g.qF(b, "loaded");
    c || b && !c || (b = Dwa(a, function () {
      g.qF(b, "loaded") || (g.rF(b, "loaded", "true"), g.gG(a), g.yE(g.Aa(Ewa, a), 0));
    }));
  },
      Jwa = function Jwa(a) {
    return (0, g.H)(a, function (a) {
      return { key: a.id,
        name: a.name };
    });
  },
      Kwa = function Kwa() {
    if (g.spa) {
      var a = 2,
          b = g.Eh(),
          c = function c() {
        a--;
        0 == a && b && b(!0);
      };
      window.__onGCastApiAvailable = c;g.Jh("//www.gstatic.com/cast/sdk/libs/sender/1.0/cast_framework.js", g.Gh, c);
    }
  },
      V8 = function V8(a, b) {
    G8();
    T8() && T8();zwa(a.id);var c = new g.sI(U8, a, Q8());c.connect(b, Fwa());c.subscribe("beforeDisconnect", function (a) {
      g.iG("yt-remote-before-disconnect", a);
    });
    c.subscribe("beforeDispose", function () {
      E8() && (E8(), S8(null));
    });
    S8(c);
  },
      W8 = function W8() {
    var a = g.tH();
    if (!a) return null;var b = I8().de();return g.nH(b, a);
  },
      X8 = function X8(a) {
    g.bH("remote", a);
  },
      Y8 = function Y8() {
    var a = E8();
    return !!a && 3 != a.getProxyState();
  },
      Z8 = function Z8() {
    K8() ? D8().stopSession() : M8("stopSession called before API ready.");
    var a = E8();a && (a.disconnect(1), S8(null));
  },
      Lwa = function Lwa() {
    var a = I8().ed.$_gos();
    var b = T8();b && E8() && (g.mH(a, b) || a.push(b));return Jwa(a);
  },
      a9 = function a9(a, b) {
    g.SF.call(this);
    this.g = 0;this.B = a;this.D = [];this.C = new g.CB();this.A = this.o = null;this.J = (0, g.y)(this.PN, this);this.F = (0, g.y)(this.kl, this);this.G = (0, g.y)(this.ON, this);this.K = (0, g.y)(this.cO, this);var c = 0;a ? (c = a.getProxyState(), 3 != c && (a.subscribe("proxyStateChange", this.Yt, this), Mwa(this))) : c = 3;0 != c && (b ? this.Yt(c) : g.yE((0, g.y)(function () {
      this.Yt(c);
    }, this), 0));
    var d = Hwa();d && $8(this, d);this.subscribe("yt-remote-cast2-session-change", this.K);
  },
      b9 = function b9(a) {
    return new g.hI(a.B.getPlayerContextData());
  },
      Nwa = function Nwa(a, b, c, d, e) {
    var f = b9(a),
        k = e || f.listId;
    d = d || 0;var l = { videoId: b, currentIndex: d };g.lI(f, b, d);g.t(c) && (g.jI(f, c), l.currentTime = c);g.t(k) && (l.listId = k);c9(a, "setPlaylist", l);e || d9(a, f);
  },
      Mwa = function Mwa(a) {
    (0, g.G)("nowAutoplaying autoplayDismissed remotePlayerChange remoteQueueChange autoplayModeChange autoplayUpNext previousNextChange".split(" "), function (a) {
      this.D.push(this.B.subscribe(a, g.Aa(this.ZP, a), this));
    }, a);
  },
      Owa = function Owa(a) {
    (0, g.G)(a.D, function (a) {
      this.B.unsubscribeByKey(a);
    }, a);
    a.D.length = 0;
  },
      e9 = function e9(a, b) {
    50 > a.C.Mc() && g.EB(a.C, b);
  },
      f9 = function f9(a, b, c) {
    var d = b9(a);
    g.jI(d, c);-1E3 != d.g && (d.g = b);d9(a, d);
  },
      c9 = function c9(a, b, c) {
    a.B.sendMessage(b, c);
  },
      d9 = function d9(a, b) {
    Owa(a);
    a.B.setPlayerContextData(g.mI(b));Mwa(a);
  },
      $8 = function $8(a, b) {
    a.A && (a.A.removeUpdateListener(a.J), a.A.removeMediaListener(a.F), a.kl(null));
    a.A = b;a.A && (g9("Setting cast session: " + a.A.sessionId), a.A.addUpdateListener(a.J), a.A.addMediaListener(a.F), a.A.media.length && a.kl(a.A.media[0]));
  },
      Pwa = function Pwa(a) {
    var b = a.o.media,
        c = a.o.customData;
    if (b && c) {
      var d = b9(a);b.contentId != d.videoId && g9("Cast changing video to: " + b.contentId);d.videoId = b.contentId;d.g = c.playerState;g.jI(d, a.o.getEstimatedTime());d9(a, d);
    } else g9("No cast media video. Ignoring state update.");
  },
      g9 = function g9(a) {
    g.bH("CP", a);
  },
      h9 = function h9(a, b, c) {
    return (0, g.y)(function (a) {
      this.oc("Failed to " + b + " with cast v2 channel. Error code: " + a.code);
      a.code != window.chrome.cast.ErrorCode.TIMEOUT && (this.oc("Retrying " + b + " using MDx browser channel."), c9(this, b, c));
    }, a);
  },
      Qwa = function Qwa(a, b) {
    var c = !1;
    D8() || (c = new g.bI(a, b), c.subscribe("yt-remote-cast2-availability-change", function (a) {
      g.OG("yt-remote-cast-available", a);g.iG("yt-remote-cast2-availability-change", a);
    }), c.subscribe("yt-remote-cast2-receiver-selected", function (a) {
      C8("onReceiverSelected: " + a.friendlyName);
      g.OG("yt-remote-cast-receiver", a);g.iG("yt-remote-cast2-receiver-selected", a);
    }), c.subscribe("yt-remote-cast2-receiver-resumed", function (a) {
      C8("onReceiverResumed: " + a.friendlyName);
      g.OG("yt-remote-cast-receiver", a);
    }), c.subscribe("yt-remote-cast2-session-change", function (a) {
      C8("onSessionChange: " + g.jH(a));
      a || g.QG("yt-remote-cast-receiver");g.iG("yt-remote-cast2-session-change", a);
    }), g.qa("yt.mdx.remote.cloudview.instance_", c, void 0), c = !0);
    C8("cloudview.createSingleton_: " + c);return c;
  },
      Rwa = function Rwa() {
    var a = 0 <= g.Ib.search(/\ (CrMo|Chrome|CriOS)\//);
    return g.VE || a;
  },
      i9 = function i9(a, b) {
    K8() ? D8().setConnectedScreenStatus(a, b) : M8("setConnectedScreenStatus called before ready.");
  },
      Swa = function Swa() {
    C8("clearCurrentReceiver");
    g.QG("yt-remote-cast-receiver");
  },
      Twa = function Twa() {
    if (P8("CriOS")) {
      var a = window.__gCrWeb && window.__gCrWeb.message && window.__gCrWeb.message.invokeOnHost;
      if (a) {
        Kwa();a({ command: "cast.sender.init" });return;
      }
    }if (!window.chrome || P8("Edge")) g.Gh();else if (Kwa(), P8("Android") && P8("Chrome/") && window.navigator.presentation) {
      var a = "",
          b = g.Ch();55 <= b ? a = "55" : 50 <= b && (a = "50");g.Jh("//www.gstatic.com/eureka/clank" + a + g.Hh, g.Gh);
    } else g.Kh(0);
  },
      Uwa = function Uwa(a) {
    a ? (g.OG("yt-remote-session-app", a.app), g.OG("yt-remote-session-name", a.name)) : (g.QG("yt-remote-session-app"), g.QG("yt-remote-session-name"));
    g.qa("yt.mdx.remote.channelParams_", a, void 0);
  },
      Vwa = function Vwa() {
    var a = Q8();
    if (g.Vb(a)) {
      var a = g.sH(),
          b = g.PG("yt-remote-session-name") || "",
          c = g.PG("yt-remote-session-app") || "",
          a = { device: "REMOTE_CONTROL", id: a, name: b, app: c, "mdx-version": 3 };g.qa("yt.mdx.remote.channelParams_", a, void 0);
    }
  },
      Wwa = function Wwa() {
    var a = W8();
    a ? (X8("Resume connection to: " + g.jH(a)), V8(a, 0)) : (g.BH(), Swa(), X8("Skipping connecting because no session screen found."));
  },
      Xwa = function Xwa(a) {
    X8("remote.onCastSessionChange_: " + g.jH(a));
    if (a) {
      var b = T8();b && b.id == a.id ? i9(b.id, "YouTube TV") : (b && Z8(), V8(a, 1));
    } else E8() && Z8();
  },
      Ywa = function Ywa() {
    var a = Lwa(),
        b = T8();
    b || (b = W8());return g.ab(a, function (a) {
      return b && g.gH(b, a.key) ? !0 : !1;
    });
  },
      Zwa = function Zwa() {
    var a = g.PG("yt-remote-cast-receiver");
    return a ? a.friendlyName : null;
  },
      $wa = function $wa(a, b, c, d, e) {
    Rwa() ? Qwa(b, e) && (J8(!0), window.chrome && window.chrome.cast && window.chrome.cast.isAvailable ? Gwa(a, c) : (window.__onGCastApiAvailable = function (b, d) {
      b ? Gwa(a, c) : (M8("Failed to load cast API: " + d), L8(!1), J8(!1), g.QG("yt-remote-cast-available"), g.QG("yt-remote-cast-receiver"), Bwa(), c(!1));
    }, d ? window.spf ? window.spf.script.load("https://www.gstatic.com/cv/js/sender/v1/cast_sender.js", "", void 0) : Iwa() : Twa())) : C8("Cannot initialize because not running Chrome");
  },
      axa = function axa(a) {
    this.port = this.domain = "";
    this.g = "/api/lounge";this.o = !0;a = a || window.document.location.href;var b = g.wg(a) || "";b && (this.port = ":" + b);this.domain = g.vg(a) || "";a = g.Ib;0 <= a.search("MSIE") && (a = a.match(/MSIE ([\d.]+)/)[1], 0 > g.Ta(a, "10.0") && (this.o = !1));
  },
      bxa = function bxa(a) {
    for (var b, c = []; !(b = a.next()).done;) {
      c.push(b.value);
    }return c;
  },
      j9 = function j9() {
    var a = Ywa();
    !a && N8() && Zwa() && (a = { key: "cast-selector-receiver", name: Zwa() });return a;
  },
      cxa = function cxa() {
    var a = Lwa();
    N8() && g.PG("yt-remote-cast-available") && a.push({ key: "cast-selector-receiver", name: "Cast..." });return a;
  },
      dxa = function dxa(a) {
    var b = { device: "Desktop",
      app: "youtube-desktop" },
        b = g.PD("MDX_CONFIG") || b;g.MG && wwa();g.vH();U8 || (U8 = new axa(b ? b.loungeApiHost : void 0), g.DH() && (U8.g = "/api/loungedev"));R8 || (R8 = g.v("yt.mdx.remote.deferredProxies_") || [], g.qa("yt.mdx.remote.deferredProxies_", R8, void 0));Vwa();var c = I8();if (!c) {
      var d = new g.OH(U8);g.qa("yt.mdx.remote.screenService_", d, void 0);c = I8();$wa(a, d, function (a) {
        a ? G8() && i9(G8(), "YouTube TV") : d.subscribe("onlineScreenChange", function () {
          g.iG("yt-remote-receiver-availability-change");
        });
      }, !(!b || !b.loadCastApiSetupScript), b ? b.appId : void 0);
    }b && !g.v("yt.mdx.remote.initialized_") && (g.qa("yt.mdx.remote.initialized_", !0, void 0), X8("Initializing: " + g.ng(b)), k9.push(g.eG("yt-remote-cast2-availability-change", function () {
      g.iG("yt-remote-receiver-availability-change");
    })), k9.push(g.eG("yt-remote-cast2-receiver-selected", function () {
      F8(null);
      g.iG("yt-remote-auto-connect", "cast-selector-receiver");
    })), k9.push(g.eG("yt-remote-cast2-receiver-resumed", function () {
      g.iG("yt-remote-receiver-resumed", "cast-selector-receiver");
    })), k9.push(g.eG("yt-remote-cast2-session-change", Xwa)), k9.push(g.eG("yt-remote-connection-change", function (a) {
      a ? i9(G8(), "YouTube TV") : W8() || (i9(null, null), Swa());
    })), a = Q8(), b.isAuto && (a.id += "#dial"), g.aF("desktop_enable_autoplay") && (a.capabilities = ["atp"]), a.name = b.device, a.app = b.app, (b = b.theme) && (a.theme = b), X8(" -- with channel params: " + g.ng(a)), Uwa(a), c.start(), G8() || Wwa());
  },
      l9 = function l9() {
    N8() ? D8() ? K8() ? (C8("Requesting cast selector."), D8().requestSession()) : (C8("Wait for cast API to be ready to request the session."), O8.push(g.eG("yt-remote-cast2-api-ready", l9))) : M8("requestCastSelector: Cast is not initialized.") : M8("requestCastSelector: Cast API is not installed!");
  },
      m9 = function m9(a, b, c) {
    g.K.call(this);
    this.F = a;this.U = b;this.o = new g.PF(this);g.L(this, this.o);this.o.T(b, "onCaptionsTrackListChanged", this.bP);this.o.T(b, "captionschanged", this.NN);this.o.T(b, "captionssettingschanged", this.UB);this.o.T(b, "videoplayerreset", this.Xn);this.o.T(b, "mdxautoplaycancel", this.AG);this.O = this.o.T(b, "onVolumeChange", this.oA);this.D = !1;this.g = c;c.subscribe("proxyStateChange", this.zA, this);c.subscribe("remotePlayerChange", this.ol, this);c.subscribe("remoteQueueChange", this.Xn, this);c.subscribe("autoplayUpNext", this.bA, this);c.subscribe("previousNextChange", this.wA, this);c.subscribe("nowAutoplaying", this.pA, this);c.subscribe("autoplayDismissed", this.aA, this);this.suggestion = null;this.G = new g.VP(64);this.A = new g.rt(this.PB, 500, this);g.L(this, this.A);this.B = new g.rt(this.QB, 1E3, this);g.L(this, this.B);this.C = {};this.K = new g.rt(this.iC, 1E3, this);g.L(this, this.K);this.J = new g.ek(this.LL, 1E3, this);g.L(this, this.J);this.M = g.x;this.UB();this.Xn();this.ol();
  },
      n9 = function n9(a, b) {
    var c = a.F,
        d = a.U.ia().lengthSeconds;
    c.J = b || 0;c.g.Y("progresssync", b, d);
  },
      exa = function exa(a) {
    n9(a, 0);
    a.A.stop();o9(a, new g.VP(64));
  },
      q9 = function q9(a, b) {
    if (p9(a) && !a.D) {
      var c = null;
      b && (c = { style: a.U.mi() }, g.ac(c, b));a.g.IB(a.U.ia().videoId, c);a.C = b9(a.g).o;
    }
  },
      r9 = function r9(a, b) {
    var c = a.U.Rf();
    c ? Nwa(a.g, a.U.ia().videoId, b, c.be(), c.listId.toString()) : Nwa(a.g, a.U.ia().videoId, b);o9(a, new g.VP(1));
  },
      fxa = function fxa(a, b) {
    if (b) {
      var c = a.U.Ac("captions", "tracklist", { Tx: 1 });
      c && c.length ? (a.U.Ed("captions", "track", b), a.D = !1) : (a.U.Tk("captions"), a.D = !0);
    } else a.U.Ed("captions", "track", {});
  },
      p9 = function p9(a) {
    return b9(a.g).videoId == a.U.ia().videoId;
  },
      o9 = function o9(a, b) {
    a.B.stop();
    var c = a.G;if (!g.aQ(c, b)) {
      var d = g.V(b, 2);if (d != g.V(a.G, 2)) {
        var e = a.U;g.X1(e.app, d, e.playerType);
      }a.G = b;gxa(a.F, c, b);
    }
  },
      s9 = function s9(a) {
    g.Y.call(this, { H: "div",
      N: "ytp-remote", L: [{ H: "div", N: "ytp-remote-display-status", L: [{ H: "div", N: "ytp-remote-display-status-icon", L: [g.UD()] }, { H: "div", N: "ytp-remote-display-status-text", L: ["{{statustext}}"] }] }] });this.o = new g.GV(this, 250);g.L(this, this.o);this.A = a;this.T(a, "presentingplayerstatechange", this.B);hxa(this, g.IU(a));
  },
      hxa = function hxa(a, b) {
    if (3 == a.A.Xa()) {
      var c = { RECEIVER_NAME: a.A.Ac("remote", "currentReceiver").name },
          c = g.V(b, 128) ? g.T("YTP_MDX_STATUS_ERROR_2", c) : b.yb() || g.V(b, 4) ? g.T("YTP_MDX_STATUS_PLAYING_2", c) : g.T("YTP_MDX_STATUS_CONNECTED_2", c);
      a.Ga("statustext", c);a.o.show();
    } else a.o.hide();
  },
      t9 = function t9(a) {
    g.qV.call(this, a);
    this.A = { key: g.lH(), name: g.T("YTP_MDX_MY_COMPUTER") };this.C = null;this.D = [];this.K = this.o = null;this.G = [this.A];this.B = this.A;this.F = new g.VP(64);this.J = 0;var b = g.BU(a).D;b && (b = b.A && b.A.g) && (b = new A8(a, b), g.L(this, b));b = new s9(a);g.L(this, b);g.cV(a, b.element, 5);
  },
      gxa = function gxa(a, b, c) {
    a.F = c;
    a.g.Y("presentingplayerstatechange", new g.fQ(c, b));
  },
      u9 = function u9(a, b) {
    if (b.key != a.B.key) if (b.key == a.A.key) Z8();else {
      a.B = b;var c = a.g.getPlaylistId();var d = a.g.ia().videoId;if (c || d) {
        var e = a.g.Rf();if (e) {
          var f = [];for (var k = 0; k < e.getLength(); k++) {
            f[k] = e.jc(k).videoId;
          }
        } else f = [a.g.ia().videoId];c = { videoIds: f, listId: c, videoId: d, index: Math.max(a.g.Gy(), 0), currentTime: a.g.getCurrentTime() };
      } else c = null;X8("Connecting to: " + g.ng(b));"cast-selector-receiver" == b.key ? (F8(c || null), c = c || null, K8() ? D8().setLaunchParams(c) : M8("setLaunchParams called before ready.")) : !c && Y8() && G8() == b.key ? g.iG("yt-remote-connection-change", !0) : (Z8(), F8(c || null), c = I8().de(), (c = g.nH(c, b.key)) && V8(c, 1));
    }
  };
  g.p(A8, g.N0);A8.prototype.J = function () {
    var a = this.U.Ac("remote", "receivers");a && 1 < a.length && !this.U.Ac("remote", "quickCast") ? (this.F = g.Eb(a, this.B, this), g.P0(this, (0, g.H)(a, this.B)), a = this.U.Ac("remote", "currentReceiver"), g.O0(this, this.B(a)), this.enable(!0)) : this.enable(!1);
  };
  A8.prototype.B = function (a) {
    return a.key;
  };
  A8.prototype.mf = function (a) {
    return "cast-selector-receiver" == a ? g.T("YTP_MDX_CAST_SELECTOR") : this.F[a].name;
  };
  A8.prototype.td = function (a) {
    g.N0.prototype.td.call(this, a);this.U.Ed("remote", "currentReceiver", this.F[a]);this.A.Xb();
  };
  g.z(B8, g.oH);g.h = B8.prototype;g.h.de = function (a) {
    return this.ed.$_gs(a);
  };
  g.h.contains = function (a) {
    return !!this.ed.$_c(a);
  };
  g.h.get = function (a) {
    return this.ed.$_g(a);
  };
  g.h.start = function () {
    this.ed.$_st();
  };
  g.h.Uo = function (a, b, c) {
    this.ed.$_a(a, b, c);
  };
  g.h.remove = function (a, b, c) {
    this.ed.$_r(a, b, c);
  };
  g.h.Do = function (a, b, c, d) {
    this.ed.$_un(a, b, c, d);
  };
  g.h.X = function () {
    for (var a = 0, b = this.o.length; a < b; ++a) {
      this.ed.$_ubk(this.o[a]);
    }this.o.length = 0;this.ed = null;B8.aa.X.call(this);
  };
  g.h.xT = function () {
    this.Y("screenChange");
  };
  g.h.HP = function () {
    this.Y("onlineScreenChange");
  };
  var H8 = null,
      O8 = [],
      R8 = null,
      U8 = null;g.z(a9, g.SF);g.h = a9.prototype;g.h.play = function () {
    1 == this.g ? (this.o ? this.o.play(null, g.x, h9(this, "play")) : c9(this, "play"), f9(this, 1, g.kI(b9(this))), this.Y("remotePlayerChange")) : e9(this, this.play);
  };
  g.h.pause = function () {
    1 == this.g ? (this.o ? this.o.pause(null, g.x, h9(this, "pause")) : c9(this, "pause"), f9(this, 2, g.kI(b9(this))), this.Y("remotePlayerChange")) : e9(this, this.pause);
  };
  g.h.vC = function (a) {
    if (1 == this.g) {
      if (this.o) {
        var b = b9(this),
            c = new window.chrome.cast.media.SeekRequest();c.currentTime = a;c.resumeState = b.yb() || 3 == b.g ? window.chrome.cast.media.ResumeState.PLAYBACK_START : window.chrome.cast.media.ResumeState.PLAYBACK_PAUSE;this.o.seek(c, g.x, h9(this, "seekTo", { newTime: a }));
      } else c9(this, "seekTo", { newTime: a });f9(this, 3, a);this.Y("remotePlayerChange");
    } else e9(this, g.Aa(this.vC, a));
  };
  g.h.stop = function () {
    if (1 == this.g) {
      this.o ? this.o.stop(null, g.x, h9(this, "stopVideo")) : c9(this, "stopVideo");var a = b9(this);a.index = -1;a.videoId = "";g.iI(a);d9(this, a);this.Y("remotePlayerChange");
    } else e9(this, this.stop);
  };
  g.h.setVolume = function (a, b) {
    if (1 == this.g) {
      var c = b9(this);if (this.A) {
        if (c.volume != a) {
          var d = Math.round(a) / 100;this.A.setReceiverVolumeLevel(d, (0, g.y)(function () {
            g9("set receiver volume: " + d);
          }, this), (0, g.y)(function () {
            this.oc("failed to set receiver volume.");
          }, this));
        }c.muted != b && this.A.setReceiverMuted(b, (0, g.y)(function () {
          g9("set receiver muted: " + b);
        }, this), (0, g.y)(function () {
          this.oc("failed to set receiver muted.");
        }, this));
      } else {
        var e = { volume: a,
          muted: b };-1 != c.volume && (e.delta = a - c.volume);c9(this, "setVolume", e);
      }c.muted = b;c.volume = a;d9(this, c);
    } else e9(this, g.Aa(this.setVolume, a, b));
  };
  g.h.IB = function (a, b) {
    if (1 == this.g) {
      var c = b9(this),
          d = { videoId: a };b && (c.o = { trackName: b.name, languageCode: b.languageCode, sourceLanguageCode: b.translationLanguage ? b.translationLanguage.languageCode : "", languageName: b.languageName, format: b.format, kind: b.kind }, d.style = g.ng(b.style), g.ac(d, c.o));c9(this, "setSubtitlesTrack", d);d9(this, c);
    } else e9(this, g.Aa(this.IB, a, b));
  };
  g.h.Xt = function (a, b) {
    if (1 == this.g) {
      c9(this, "setAudioTrack", { videoId: a, audioTrackId: b.Vc.id });var c = b9(this);c.audioTrackId = b.Vc.id;d9(this, c);
    } else e9(this, g.Aa(this.Xt, a, b));
  };
  g.h.uC = function (a, b) {
    if (1 == this.g) {
      if (a && b) {
        var c = b9(this);g.lI(c, a, b);d9(this, c);
      }c9(this, "previous");
    } else e9(this, g.Aa(this.uC, a, b));
  };
  g.h.tC = function (a, b) {
    if (1 == this.g) {
      if (a && b) {
        var c = b9(this);g.lI(c, a, b);d9(this, c);
      }c9(this, "next");
    } else e9(this, g.Aa(this.tC, a, b));
  };
  g.h.tw = function () {
    1 == this.g ? c9(this, "dismissAutoplay") : e9(this, this.tw);
  };
  g.h.dispose = function () {
    if (3 != this.g) {
      var a = this.g;this.g = 3;this.Y("proxyStateChange", a, this.g);
    }a9.aa.dispose.call(this);
  };
  g.h.X = function () {
    Owa(this);this.B = null;this.C.clear();$8(this, null);a9.aa.X.call(this);
  };
  g.h.Yt = function (a) {
    if ((a != this.g || 2 == a) && 3 != this.g && 0 != a) {
      var b = this.g;this.g = a;this.Y("proxyStateChange", b, a);if (1 == a) for (; !this.C.isEmpty();) {
        g.FB(this.C).apply(this);
      } else 3 == a && this.dispose();
    }
  };
  g.h.ZP = function (a, b) {
    this.Y(a, b);
  };
  g.h.PN = function (a) {
    if (!a) this.kl(null), $8(this, null);else if (this.A.receiver.volume) {
      a = this.A.receiver.volume;var b = b9(this),
          c = Math.round(100 * a.level || 0);if (b.volume != c || b.muted != a.muted) g9("Cast volume update: " + a.level + (a.muted ? " muted" : "")), b.volume = c, b.muted = !!a.muted, d9(this, b);
    }
  };
  g.h.kl = function (a) {
    g9("Cast media: " + !!a);this.o && this.o.removeUpdateListener(this.G);if (this.o = a) this.o.addUpdateListener(this.G), Pwa(this), this.Y("remotePlayerChange");
  };
  g.h.ON = function (a) {
    a ? (Pwa(this), this.Y("remotePlayerChange")) : this.kl(null);
  };
  g.h.cO = function () {
    var a = Hwa();a && $8(this, a);
  };
  g.h.oc = function (a) {
    g.bH("CP", a);
  };
  var k9 = [];g.h = axa.prototype;g.h.Yh = function (a) {
    var b = this.g;if (g.t(void 0) ? 0 : this.o) b = "https://" + this.domain + this.port + this.g;return g.Dg(b + a, {});
  };
  g.h.Wt = function (a, b, c, d) {
    c = { format: "JSON", method: "POST", context: this, timeout: 5E3, withCredentials: !1, Ob: g.Aa(this.sT, c, !0), onError: g.Aa(this.rT, d), gd: g.Aa(this.tT, d) };b && (c.Sb = b, c.headers = { "Content-Type": "application/x-www-form-urlencoded" });return g.ME(a, c);
  };
  g.h.sT = function (a, b, c, d) {
    b ? a(d) : a({ text: c.responseText });
  };
  g.h.rT = function (a, b) {
    a(Error("Request error: " + b.status));
  };
  g.h.tT = function (a) {
    a(Error("request timed out"));
  };g.p(m9, g.K);g.h = m9.prototype;g.h.X = function () {
    g.K.prototype.X.call(this);this.A.stop();this.B.stop();this.M();this.g.unsubscribe("proxyStateChange", this.zA, this);this.g.unsubscribe("remotePlayerChange", this.ol, this);this.g.unsubscribe("remoteQueueChange", this.Xn, this);this.g.unsubscribe("autoplayUpNext", this.bA, this);this.g.unsubscribe("previousNextChange", this.wA, this);this.g.unsubscribe("nowAutoplaying", this.pA, this);this.g.unsubscribe("autoplayDismissed", this.aA, this);this.g = this.F = null;
  };
  g.h.dz = function (a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) {
      c[d - 1] = arguments[d];
    }if (2 != this.g.g) if (p9(this)) {
      if (1081 != b9(this.g).g || "control_seek" != a) switch (a) {case "control_toggle_play_pause":
          b9(this.g).yb() ? this.g.pause() : this.g.play();break;case "control_play":
          this.g.play();break;case "control_pause":
          this.g.pause();break;case "control_seek":
          this.J.aj(c[0], c[1]);break;case "control_subtitles_set_track":
          q9(this, c[0]);break;case "control_set_audio_track":
          c = c[0], p9(this) && this.g.Xt(this.U.ia().videoId, c);}
    } else switch (a) {case "control_toggle_play_pause":case "control_play":case "control_pause":
        r9(this, this.U.getCurrentTime());break;case "control_seek":
        r9(this, c[0]);break;case "control_subtitles_set_track":
        q9(this, c[0]);break;case "control_set_audio_track":
        c = c[0], p9(this) && this.g.Xt(this.U.ia().videoId, c);}
  };
  g.h.NN = function (a) {
    this.dz("control_subtitles_set_track", g.Vb(a) ? null : a);
  };
  g.h.UB = function () {
    var a = this.U.Ac("captions", "track");g.Vb(a) || q9(this, a);
  };
  g.h.oA = function (a) {
    if (p9(this)) {
      this.g.unsubscribe("remotePlayerChange", this.ol, this);var b = Math.round(a.volume);a = !!a.muted;var c = b9(this.g);if (b != c.volume || a != c.muted) this.g.setVolume(b, a), this.K.start();this.g.subscribe("remotePlayerChange", this.ol, this);
    }
  };
  g.h.bP = function () {
    g.Vb(this.C) || fxa(this, this.C);this.D = !1;
  };
  g.h.zA = function (a, b) {
    this.B.stop();2 == b && this.QB();
  };
  g.h.ol = function () {
    if (p9(this)) {
      this.A.stop();var a = b9(this.g);switch (a.g) {case 1081:
          o9(this, new g.VP(8));break;case 1:
          this.PB();o9(this, new g.VP(8));break;case 1083:case 3:
          o9(this, new g.VP(9));break;case 0:
          o9(this, new g.VP(2));this.J.stop();n9(this, this.U.ia().lengthSeconds);break;case 1082:
          o9(this, new g.VP(4));break;case 2:
          o9(this, new g.VP(4));n9(this, g.kI(a));break;case -1:
          o9(this, new g.VP(64));break;case -1E3:
          a = { errorCode: "mdx.remoteerror", message: g.T("YTP_MDX_PLAYER_ERROR") }, o9(this, new g.VP(128, a));}var a = b9(this.g).o,
          b = this.C;(a || b ? a && b && a.trackName == b.trackName && a.languageCode == b.languageCode && a.languageName == b.languageName && a.format == b.format && a.kind == b.kind : 1) || (this.C = a, fxa(this, a));a = b9(this.g);-1 == a.volume || Math.round(this.U.getVolume()) == a.volume && this.U.Le() == a.muted || this.K.isActive() || this.iC();
    } else exa(this);
  };
  g.h.wA = function () {
    this.U.Y("mdxpreviousnextchange");
  };
  g.h.Xn = function () {
    p9(this) || exa(this);
  };
  g.h.AG = function () {
    this.g.tw();
  };
  g.h.bA = function (a) {
    a && (a = g.ME("/watch_queue_ajax", { method: "GET", bd: { action_get_watch_queue_item: 1, video_id: a }, Ob: (0, g.y)(this.aR, this) })) && (this.M = (0, g.y)(a.abort, a));
  };
  g.h.aR = function (a, b) {
    var c = new g.jP({ videoId: b.videoId, title: b.title, author: b.author, murlmq_webp: b.url });this.suggestion = c;this.U.Y("mdxautoplayupnext", c);
  };
  g.h.pA = function (a) {
    (0, window.isNaN)(a) || this.U.Y("mdxnowautoplaying", a);
  };
  g.h.aA = function () {
    this.U.Y("mdxautoplaycanceled");
  };
  g.h.LL = function (a, b) {
    -1 == b9(this.g).g ? r9(this, a) : b && this.g.vC(a);
  };
  g.h.iC = function () {
    if (p9(this)) {
      var a = b9(this.g);this.o.Da(this.O);a.muted ? this.U.mute() : this.U.yg();this.U.setVolume(a.volume);this.O = this.o.T(this.U, "onVolumeChange", this.oA);
    }
  };
  g.h.PB = function () {
    this.A.stop();if (!this.g.na()) {
      var a = b9(this.g);a.yb() && o9(this, new g.VP(8));n9(this, g.kI(a));this.A.start();
    }
  };
  g.h.QB = function () {
    this.B.stop();this.A.stop();var a = this.g.B.getReconnectTimeout();2 == this.g.g && !(0, window.isNaN)(a) && this.B.start();
  };g.p(s9, g.Y);s9.prototype.B = function (a) {
    hxa(this, a.state);
  };g.p(t9, g.qV);g.h = t9.prototype;g.h.create = function () {
    dxa("embedded" == g.X(this.g).g);this.D.push(g.eG("yt-remote-before-disconnect", this.KN, this));this.D.push(g.eG("yt-remote-connection-change", this.jQ, this));this.D.push(g.eG("yt-remote-receiver-availability-change", this.xA, this));this.D.push(g.eG("yt-remote-auto-connect", this.hQ, this));this.D.push(g.eG("yt-remote-receiver-resumed", this.gQ, this));this.xA();
  };
  g.h.load = function () {
    this.g.Qp();g.qV.prototype.load.call(this);this.C = new m9(this, this.g, this.o);var a = Fwa(),
        a = a ? a.currentTime : 0,
        b = Y8() ? new a9(E8(), void 0) : null;0 == a && b && (a = g.kI(b9(b)));0 != a && (this.J = a || 0, this.g.Y("progresssync", a, void 0));gxa(this, this.F, this.F);g.b2(this.g.app, 6);
  };
  g.h.unload = function () {
    this.g.Y("mdxautoplaycanceled");this.B = this.A;g.Oe(this.C, this.o);this.o = this.C = null;g.qV.prototype.unload.call(this);g.b2(this.g.app, 5);
  };
  g.h.X = function () {
    g.fG(this.D);g.qV.prototype.X.call(this);
  };
  g.h.Yk = function (a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) {
      c[d - 1] = arguments[d];
    }this.loaded && this.C.dz.apply(this.C, [].concat([a], c instanceof Array ? c : bxa(g.ka(c))));
  };
  g.h.nH = function () {
    return this.loaded ? this.C.suggestion : null;
  };
  g.h.Lf = function () {
    return this.o ? b9(this.o).Lf : !1;
  };
  g.h.hasNext = function () {
    return this.o ? b9(this.o).hasNext : !1;
  };
  g.h.getCurrentTime = function () {
    return this.J;
  };
  g.h.rL = function () {
    var a = b9(this.o),
        b = this.g.ia();return { allowSeeking: this.g.Pd(), clipEnd: b.clipEnd, clipStart: b.clipStart, current: this.getCurrentTime(), displayedStart: -1, duration: a.getDuration(), ingestionTime: a.F ? a.C + ((0, g.F)() - a.A) / 1E3 : a.C, isPeggedToLive: 1 >= (a.F ? a.B + ((0, g.F)() - a.A) / 1E3 : a.B) - this.getCurrentTime(), loaded: a.K, seekableEnd: a.F ? a.B + ((0, g.F)() - a.A) / 1E3 : a.B, seekableStart: 0 < a.D ? a.D + ((0, g.F)() - a.A) / 1E3 : a.D };
  };
  g.h.sL = function () {
    this.o && this.o.tC();
  };
  g.h.tL = function () {
    this.o && this.o.uC();
  };
  g.h.KN = function (a) {
    1 == a && (this.K = this.o ? b9(this.o) : null);
  };
  g.h.jQ = function () {
    var a = Y8() ? new a9(E8(), void 0) : null;if (a) {
      var b = this.B;this.loaded && this.unload();this.o = a;this.K = null;b.key != this.A.key && (this.B = b, this.load());
    } else g.Ne(this.o), this.o = null, this.loaded && (this.unload(), (a = this.K) && a.videoId == this.g.ia().videoId && this.g.Ey(a.videoId, g.kI(a)));this.g.Y("videodatachange", "newdata", this.g.ia(), 3);
  };
  g.h.xA = function () {
    this.G = [this.A].concat(cxa());var a = j9() || this.A;u9(this, a);this.g.za("onMdxReceiversChange");
  };
  g.h.hQ = function () {
    var a = j9();u9(this, a);
  };
  g.h.gQ = function () {
    this.B = j9();
  };
  g.h.qL = function (a, b) {
    switch (a) {case "casting":
        return this.loaded;case "receivers":
        return this.G;case "currentReceiver":
        return b && ("cast-selector-receiver" == b.key ? l9() : u9(this, b)), this.loaded ? this.B : this.A;case "quickCast":
        return 2 == this.G.length && "cast-selector-receiver" == this.G[1].key ? (b && l9(), !0) : !1;}
  };
  g.h.uL = function () {
    c9(this.o, "sendDebugCommand", { debugCommand: "stats4nerds " });
  };
  g.h.Gd = function () {
    return !1;
  };window._exportCheck == g.Da && g.qa("ytmod.player.remote", t9, void 0);
})(_yt_player);
//# sourceMappingURL=remote.js.map