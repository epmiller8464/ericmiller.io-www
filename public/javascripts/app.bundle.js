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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var noop = function noop() {};
var $ = window.$ || noop;

var CONSTANTS = {
  $el: 'body',
  class: 'loading',
  LOADING_TIMEOUT: 5000
};
var TYPED_TEXT = {
  GREETING: ['.greeting', '<span class="br">Hello</span>'],
  INTRO: ['.intro', 'I am Eric Miller, a software developer, systems architect, and travel enthusiast living in Austin, TX.'],
  TECH: ['.tech', 'I work across the full stack with my head in the cloud. I love Node.js, Python, and Go.<br/>My interests involve real-time communication, boston terriers, scalable distributed systems, cryptocurrencies, webrtc and other p2p technologies.'],
  WHO: ['.who', 'I am a passionate and driven individual who\'s curiosity for learning keeps my skills on the bleeding edge.'],
  GITHUB: ['.github', 'Check me out on <a href="javascript:window.open(\'https://github.com/epmiller8464\')">Github</a>']
};

var Loaded = function Loaded(opts) {
  var loadedHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  var doneHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

  if (!(this instanceof Loaded)) return new Loaded(opts, loadedHandler, doneHandler);
  var self = this;
  // self.events = new EventEmitter()
  self.delay = opts.delay;
  self.loadedHandler = loadedHandler;
  self.doneHandler = doneHandler;

  self.onReady = function () {
    var self = this;
    console.log('page ready called delay: %s', self.delay);
    setTimeout(function () {
      self.loadedHandler();
      self.doneHandler();
    }, self.delay, self);
  };
  return self;
};

var initEvents = function initEvents(opts) {
  $('#read-more').click(function () {
    $('#read-more').addClass('hide');
    continueTyping();
  });

  $('#reload-me').click(function () {
    $('#reload-me').addClass('hide');
    retype();
  });
};

// const doneLoading = () => {
//   $('body').removeClass('loading')
//   retype()
// }

// [CONSTANTS.TECH, CONSTANTS.WHATIDO, CONSTANTS.PASSION, CONSTANTS.WHO]
var TEXT_INDEX = Object.keys(TYPED_TEXT);

var tail = function tail(i, k) {
  var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

  // console.log(arguments)
  var key = TEXT_INDEX[i];
  if (!key || i > k) return done();

  var textSet = TYPED_TEXT[key];
  // console.log(textSet)
  var selector = textSet[0];
  var text = textSet[1];
  $(selector).typed({
    strings: [text],
    // smartBackspace: false,
    typeSpeed: 0,
    html: true,
    showCursor: false,
    startDelay: 0,
    callback: function callback() {
      return tail(++i, k, done);
    }
  });
};

var startTyping = function startTyping() {
  var done = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
    $('#read-more').removeClass('hide');
  };

  tail(0, 1, done);
};

var continueTyping = function continueTyping() {
  tail(2, TEXT_INDEX.length

  // $('.tech').typed({
  //   strings: [TYPED_TEXT.TECH[1], TYPED_TEXT.SKILLS[1], TYPED_TEXT.PASSION[1], TYPED_TEXT.WHO[1]],
  //   smartBackspace: true,
  //   typeSpeed: 0,
  //   html: true,
  //   showCursor: false,
  //   startDelay: 0,
  //   callback: function () {
  //     // return tail(++i, k, done)
  //   }
  // })
  );
};

function retype() {
  $('.greeting').text('');
  $('.intro').text('');
  $('.skills').text('');
  $('.tech').text('');
  $('.github').text('');
  $('.who').text('');
  startTyping();
}

function VisualVoiceMail(opts) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

  if (!(this instanceof VisualVoiceMail)) return new VisualVoiceMail(opts, callback);

  var self = this;
  self.player = null;
  self.audioComponents = [];
  self.isMobileDevice = browser().mobile;
  self.touched = false;
  self.token = null;
  self.audioContext = null;
  self.siriWave = new SiriWave({
    container: document.getElementById('wavebg'),
    // style: 'ios9',
    speed: 0.05,
    color: '#f4846d',
    frequency: 4,
    amplitude: 0.3,
    autostart: false
  });
  self.voicemailElements = {
    $mute: null,
    $replay: null
  };

  self.recording = {
    $container: $('#record-container')
  };

  self.type = function type() {
    var self = this;

    $('.voice-message-text').typed({
      strings: ['You have reached the voice mail of Eric Miller. Please leave your name, number and a short message and i will get back to you as soon as possible. <br/> Thanks!'],
      typeSpeed: 0.99,
      //                    startDelay: 500,
      html: true,
      showCursor: false,
      startDelay: 0,
      //                    onStart: (arrayPos, self) => {console.log('on start')},
      //                    preStringTyped: (arrayPos, self) => {console.log('on preStringTyped %s %s', arrayPos, self)},
      callback: function callback() {
        $('#go-to-record').removeClass('hide').children('.glyphicon').addClass('intensifies').fadeIn();
        var i = window.localStorage.getItem('_vm_played');
        window.localStorage.setItem('_vm_played', ++i);
        console.log(i);
      }
    });
  };

  self.loadAudioVisualControl = function loadAudioVisualControl() {
    var _cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    var self = this;

    var cb = _cb;
    var self = this;
    var played = false; // window.localStorage.getItem('_vm_played')
    var _player = new Howl({
      src: ['./media/em-vm.wav'],
      autoplay: true,
      preload: true,
      loop: false,
      volume: !played ? 0.5 : 0.1,
      html5: true,
      rate: 0.83,
      mute: true
    });
    _player.once('load', function () {
      console.log('audio loaded');
      console.log(_player.duration());
      self.type();
      _cb(true);
    }
    //
    );_player.on('end', function () {
      if (!played) {
        window.localStorage.setItem('_vm_played', 1);
      }
    });
    return _player;
  };
  self.enableRecording = function showAudioControls(enable) {
    var self = this;
    if (enable) {
      $('#show-record-btn').prop('disabled', false);
      $('#show-record-btn').children('.fa').removeClass('text-muted').addClass('text-success');
    } else {
      $('#show-record-btn').prop('disabled', true);
      $('#show-record-btn').children('.fa').addClass('text-muted').removeClass('text-success');
      self.hideAudioControls();
    }
  };
  self.showModal = function () {
    grecaptcha.reset();
    self.enableRecaptcha(false);
    $('#submit-recaptcha').prop('disabled', true);
    $('#robot-form').removeClass('has-error');
    $('input[name=email]').val('');
    $('#verify-modal').modal({ show: true, backdrop: 'static', keyboard: false });
  };
  self.showAudioControls = function showAudioControls() {
    var self = this;
    self.recording.$container.removeClass('hide');
    self.siriWave.start();
  };

  self.hideAudioControls = function disableAudioControls() {
    var self = this;
    self.recording.$container.addClass('hide');
  };
  self.enableRecaptcha = function (enable) {
    if (enable) {
      $('.g-recaptcha').removeClass('hide');
    } else {
      $('.g-recaptcha').addClass('hide');
    }
  };

  self.resetRecaptcha = function () {
    $('#submit-recaptcha').prop('disabled', true);
    grecaptcha.reset();
  };

  self.bindEvents = function bindEvents() {
    var self = this;
    smoothScroll.init();
    $(document).ready(function () {
      $('#top-scroll').affix({
        offset: {
          top: $(window).height()
        }
      }

      // $('#robot-form').form().submit()

      );$('[name=email]').keydown(function () {
        if (new RegExp(/.+@.+\..+/).test($(this).val())) {
          // $('.btn.next').removeClass('hide')
          return self.enableRecaptcha(true);
        } else {
          // self.enableRecording(false)
          return self.enableRecaptcha(false);
        }
        self.enableRecaptcha(false);
      });
      $('[name=email]').focusout(function () {
        if (new RegExp(/.+@.+\..+/).test($(this).val())) {
          // $('.btn.next').removeClass('hide')
          return self.enableRecaptcha(true);
        } else {
          // self.enableRecording(false)
          return self.enableRecaptcha(false);
        }
        self.enableRecaptcha(false);
      });
      $('.next').click(function () {
        // 1. hide the previous step
        // 2. enable client side socket.io code
        self.showAudioControls();
      }

      // $('.btn.next').click(function () {
      //   // $('#record-container').removeClass('hide')

      //
      // })

      );$('#show-record-btn').click(function () {
        // self.showAudioControls()
        self.showModal();
      });
      $('#submit-recaptcha').click(function () {
        // $('#submit-recaptcha')
        $('#verify-modal').modal('toggle');
        self.showAudioControls();
      });
    });
  };

  self.bindTouchEvents = function bindTouchEvents() {
    var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    var self = this;
    $('#alert-row').removeClass('hide');
    var el = document.getElementsByTagName('body')[0];
    var touched = false;
    el.addEventListener('touchstart', function () {
      if (touched) {
        return;
      }

      touched = true;
      self.player = self.loadAudioVisualControl(cb);
      cb();
    }, false);
  };

  self.loadRecordedMessage = function loadRecordedMessage() {
    var self = this;
    var _audioComponents = [];
    var voices = $('div[data-audio-src]').map(function (i, el) {
      return {
        el: '#' + $(el).prop('id'),
        recordingKey: $(el).data('recording-key'),
        waveFormEl: $(el).data('wave-form-container'),
        waveform: [$(el).data('wave-form').split(',')],
        controls: {
          $play: $(el).find('button.play')[0],
          $pause: $(el).find('button.pause')[0],
          $stop: $(el).find('button.stop')[0],
          $delete: $(el).find('button.delete')[0],
          $status: $(el).find('.status')[0],
          $duration: $(el).find('.duration')[0]
        },
        howl: {
          src: [$(el).data('audio-src')],
          autoplay: false,
          preload: false,
          loop: false,
          volume: 0.5,
          html5: true
        }

      };
    }).toArray();

    for (var i = 0; i < voices.length; i++) {
      var config = voices[i];
      var audio = new AudioComponent(config);
      _audioComponents.push(audio);
    }
    return _audioComponents;
  };

  self.init = function init() {
    var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

    var self = this;

    self.bindEvents();
    if (self.isMobileDevice) {
      self.bindTouchEvents(cb);
    } else {
      self.player = self.loadAudioVisualControl(cb);
    }
    self.audioComponents = self.loadRecordedMessage();
  };
  self.verified = function (token, cb) {
    // console.log(response)
    // $('#submit-recaptcha')
    var self = this;
    self.token = token;
    var data = $('#robot-form').serializeArray();
    var hasError = false;
    for (var i = 0; i < data.length; i++) {
      if (!data[i].value) {
        $('#robot-form').addClass('has-error');
        hasError = true;
      } else {
        if (data[i].name === 'g-recaptcha-response') {
          hasError = data[i].value !== self.token;
        }
      }
    }

    if (hasError) {
      return;
    }

    data = $('#robot-form').serialize();
    $.ajax({
      method: 'POST',
      url: '/voicemail/recaptcha',
      headers: {
        // 'X_CSRF_TOKEN': extractCSRF()
      },
      data: data
    }).done(function (r) {
      $('#submit-recaptcha').prop('disabled', false);
      self.audioContext = r;
      return cb(r);
    }).fail(function (e) {
      console.log('opps ', e);
      self.resetRecaptcha();
    });
  };
  self.init(callback);
  return self;
}

var App = {
  me: function me(options) {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

    // let body = document.body
    particlesJS.load('particles-js', 'particles.json', function () {
      console.log('particlesJS loaded');
      initEvents();
      Loaded(options, noop, function () {
        $('body').removeClass('loading');
        retype();
        cb();
      }).onReady();
    });
  },
  voicemail: function voicemail(options) {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

    var body = document.body;
    var visualVoiceMail = null;

    imagesLoaded(body, function () {
      console.log('images loaded');
      Loaded(options, function () {
        visualVoiceMail = new VisualVoiceMail({}, function () {
          console.log('done loading');
          $('body').removeClass('loading');
          return cb(visualVoiceMail);
        });
      }).onReady();
    });
  }
  // return Loaded
  // module.exports.Loaded = Loaded
};window.App = App;
exports.App = App;

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map