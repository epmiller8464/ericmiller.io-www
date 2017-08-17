'use strict';

// const EventEmitter = require('events').EventEmitter
// import Letters from './letters'
// import particlesJS from './particles'

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
  // ctrl.addEventListener('click', applyFx)¬
  $('#read-more').click(function () {
    // $('#read-more').addClass('hide')
    alert('this isnt doing anything now');
  });

  $('#reload-me').click(function () {
    $('#reload-me').addClass('hide');
    retype();
  });
};

var startTyping = function startTyping(_ref) {
  var el = _ref.el,
      text = _ref.text;

  // $('.tech').typed({
  $('.tech').typed({
    strings: ['Currently I am writing applications node.js but I love python, go, and swift.'],
    typeSpeed: 0,
    html: true,
    showCursor: false,
    startDelay: 0,
    callback: function callback() {
      $('.github').typed({
        strings: ['Check me out on <a href="https://github.com/epmiller8464">Github</a>'],
        typeSpeed: 0,
        html: true,
        showCursor: false,
        startDelay: 0,
        callback: function callback() {
          $('#reload-me').removeClass('hide');
        }
      });
    }
  });
};

var doneLoading = function doneLoading() {
  $('body').removeClass('loading');
  retype();
};

function retype() {
  $('.greeting').text('');
  $('.intro').text('');
  $('.skills').text('');
  $('.tech').text('');
  $('.github').text('');
  $('.greeting').typed({
    strings: ['<span class="br">Hello</span>'],
    typeSpeed: 50,
    showCursor: false,
    html: true,
    callback: function callback() {
      $('.intro').typed({
        strings: ['I\'m Eric Miller a software developer in Austin, TX.'],
        typeSpeed: 10,
        html: true,
        showCursor: false,
        startDelay: 10,
        callback: function callback() {
          $('.skills').typed({
            strings: ['I like tight time lines and developing elegant solutions to complex problems. I am a full-stack javascript developer.'],
            typeSpeed: 0,
            html: true,
            showCursor: false,
            startDelay: 20,
            callback: function callback() {
              $('#read-more').removeClass('hide');
            }
          });
        }
      });
    }
  });
}

function VisualVoiceMail(opts) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

  if (!(this instanceof VisualVoiceMail)) return new VisualVoiceMail(opts, callback);

  var self = this;
  self.player = null;
  self.audioComponents = [];
  self.isMobileDevice = browser().mobile;
  self.touched = false;

  self.voicemailElements = {
    $mute: null,
    $replay: null
  };

  self.recording = {
    $container: $('.audio-controls')
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
    });
    //
    _player.on('end', function () {
      if (!played) {
        window.localStorage.setItem('_vm_played', 1);
      }
    });
    return _player;
  };

  self.showAudioControls = function showAudioControls() {
    var self = this;

    self.recording.$container.removeClass('hide');
  };

  self.showAudioControls = function disableAudioControls() {
    var self = this;

    self.recording.$container.addClass('hide');
    //            $('.audio-controls').addClass('hide')
  };

  self.bindEvents = function bindEvents() {
    var self = this;
    smoothScroll.init();
    $(document).ready(function () {
      $('#top-scroll').affix({
        offset: {
          top: $(window).height()
        }
      });
      $('[name=email]').keypress(function () {
        if (new RegExp(/.+@.+\..+/).test($(this).val())) {
          $('.btn.next').removeClass('hide');
        } else {
          self.hideAudioControls();
        }
      });
      $('[name=email]').focusout(function () {
        if (new RegExp(/.+@.+\..+/).test($(this).val())) {
          $('.btn.next').removeClass('hide');
          //                    incrementStep()
        } else {
          //                    alert('invalid asshole')
          $(this).addClass('hasError');
        }
      });
      $('.next').click(function () {
        // 1. hide the previous step
        // 2. enable client side socket.io code
        self.showAudioControls();
      });
      $('#show-record-btn').click(function () {
        $('#show-record-btn').children('.fa').removeClass('text-success').addClass('text-danger');
        $('#record-container').removeClass('hide');
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
          cb();
        });
      }).onReady();
    });
    // particlesJS.load('particles-js', 'particles.json', () => {
    //   console.log('particlesJS loaded')
    //   initEvents()
    //   Loading(options, handler, () => {
    //     doneLoading()
    //     cb()
    //   })
    // })
  }
};
// return Loaded
// module.exports.Loaded = Loaded
window.App = App;
exports.App = App;
//# sourceMappingURL=app.js.map