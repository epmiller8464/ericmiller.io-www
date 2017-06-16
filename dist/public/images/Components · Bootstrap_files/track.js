'use strict';

var _gauges = _gauges || [];(function () {
  var h = _gauges['slice'] ? _gauges.slice(0) : [];_gauges = { track_referrer: true, image: new Image(), track: function track() {
      this.setCookie('_gauges_cookie', 1, 1);var a = this.url();if (a) {
        this.image.src = a;var b = 60 * 60,
            d = b * 24,
            c = d * 31,
            f = d * 365,
            i = f * 10;if (!this.getCookie('_gauges_unique_hour')) {
          this.setCookie('_gauges_unique_hour', 1, b);
        }if (!this.getCookie('_gauges_unique_day')) {
          this.setCookie('_gauges_unique_day', 1, d);
        }if (!this.getCookie('_gauges_unique_month')) {
          this.setCookie('_gauges_unique_month', 1, c);
        }if (!this.getCookie('_gauges_unique_year')) {
          this.setCookie('_gauges_unique_year', 1, f);
        }if (!this.getCookie('_gauges_unique')) {
          this.setCookie('_gauges_unique', 1, i);
        }
      }
    }, push: function push(a) {
      var b = a.shift();if (b == 'track') {
        _gauges.track();
      }
    }, url: function url() {
      var a,
          b,
          d,
          c = this.$('gauges-tracker');if (c) {
        b = c.getAttribute('data-site-id');d = c.getAttribute('data-track-path');if (!d) {
          d = c.src.replace('/track.js', '/track.gif');
        }a = String(d);a += "?h[site_id]=" + b;a += "&h[resource]=" + this.resource();a += "&h[referrer]=" + this.referrer();a += "&h[title]=" + this.title();a += "&h[user_agent]=" + this.agent();a += "&h[unique]=" + this.unique();a += "&h[unique_hour]=" + this.uniqueHour();a += "&h[unique_day]=" + this.uniqueDay();a += "&h[unique_month]=" + this.uniqueMonth();a += "&h[unique_year]=" + this.uniqueYear();a += "&h[screenx]=" + this.screenWidth();a += "&h[browserx]=" + this.browserWidth();a += "&h[browsery]=" + this.browserHeight();a += "&timestamp=" + this.timestamp();
      }return a;
    }, domain: function domain() {
      return window.location.hostname;
    }, referrer: function referrer() {
      var a = '';if (!this.track_referrer) {
        return a;
      }this.track_referrer = false;try {
        a = top.document.referrer;
      } catch (e1) {
        try {
          a = parent.document.referrer;
        } catch (e2) {
          a = '';
        }
      }if (a == '') {
        a = document.referrer;
      }return this.escape(a);
    }, agent: function agent() {
      return this.escape(navigator.userAgent);
    }, escape: function (_escape) {
      function escape(_x) {
        return _escape.apply(this, arguments);
      }

      escape.toString = function () {
        return _escape.toString();
      };

      return escape;
    }(function (a) {
      return typeof encodeURIComponent == 'function' ? encodeURIComponent(a) : escape(a);
    }), resource: function resource() {
      return this.escape(document.location.href);
    }, timestamp: function timestamp() {
      return new Date().getTime();
    }, title: function title() {
      return document.title && document.title != "" ? this.escape(document.title) : '';
    }, uniqueHour: function uniqueHour() {
      if (!this.getCookie('_gauges_cookie')) {
        return 0;
      }return this.getCookie('_gauges_unique_hour') ? 0 : 1;
    }, uniqueDay: function uniqueDay() {
      if (!this.getCookie('_gauges_cookie')) {
        return 0;
      }return this.getCookie('_gauges_unique_day') ? 0 : 1;
    }, uniqueMonth: function uniqueMonth() {
      if (!this.getCookie('_gauges_cookie')) {
        return 0;
      }return this.getCookie('_gauges_unique_month') ? 0 : 1;
    }, uniqueYear: function uniqueYear() {
      if (!this.getCookie('_gauges_cookie')) {
        return 0;
      }return this.getCookie('_gauges_unique_year') ? 0 : 1;
    }, unique: function unique() {
      if (!this.getCookie('_gauges_cookie')) {
        return 0;
      }return this.getCookie('_gauges_unique') ? 0 : 1;
    }, screenWidth: function screenWidth() {
      try {
        return screen.width;
      } catch (e) {
        return 0;
      }
    }, browserDimensions: function browserDimensions() {
      var a = 0,
          b = 0;try {
        if (typeof window.innerWidth == 'number') {
          a = window.innerWidth;b = window.innerHeight;
        } else if (document.documentElement && document.documentElement.clientWidth) {
          a = document.documentElement.clientWidth;b = document.documentElement.clientHeight;
        } else if (document.body && document.body.clientWidth) {
          a = document.body.clientWidth;b = document.body.clientHeight;
        }
      } catch (e) {}return { width: a, height: b };
    }, browserWidth: function browserWidth() {
      return this.browserDimensions().width;
    }, browserHeight: function browserHeight() {
      return this.browserDimensions().height;
    }, $: function $(a) {
      if (document.getElementById) {
        return document.getElementById(a);
      }return null;
    }, setCookie: function setCookie(a, b, d) {
      var c, f;b = escape(b);if (d) {
        c = new Date();c.setTime(c.getTime() + d * 1000);f = '; expires=' + c.toGMTString();
      } else {
        f = '';
      }document.cookie = a + "=" + b + f + "; path=/";
    }, getCookie: function getCookie(a) {
      var b = a + "=",
          d = document.cookie.split(';');for (var c = 0; c < d.length; c++) {
        var f = d[c];while (f.charAt(0) == ' ') {
          f = f.substring(1, f.length);
        }if (f.indexOf(b) == 0) {
          return unescape(f.substring(b.length, f.length));
        }
      }return null;
    } };_gauges.track();for (var g = 0, j = h.length; g < j; g++) {
    _gauges.push(h[g]);
  }
})();
//# sourceMappingURL=track.js.map