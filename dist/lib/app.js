'use strict';
// const EventEmitter = require('events').EventEmitter
// import Letters from './letters'
// import particlesJS from './particles'

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CONSTANTS = {
  $el: 'body',
  class: 'loading',
  LOADING_TIMEOUT: 5000
};

var App = {
  load: function load() {}
};

var init = function init(options) {
  var body = document.body;
  particlesJS.load('particles-js', 'particles.json', particlesLoaded);
  imagesLoaded(body, function () {
    // Show current grid.
    // grids[currentGrid].classList.remove('grid--hidden')
    // Init/Bind events.
    // Remove loading class from body
    initEvents();
    // body.classList.remove('loading')
  });
};

var Loading = function Loading(opts, loadedHandler) {
  var self = this;
  // self.events = new EventEmitter()
  self.delay = opts.delay;
  self.loadHandler = loadedHandler;
  self.pageReady = function () {
    console.log('page ready called delay: %s', self.delay);
    setTimeout(function () {
      self.loadHandler();
    }, self.delay, self);
  };
  return self;
};

var initEvents = function initEvents(opts) {
  // ctrl.addEventListener('click', applyFx)¬
  $('#read-more').click(function () {
    $('#read-more').addClass('hide');
  });
};

var particlesLoaded = function particlesLoaded() {};
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
var restartTyping = function restartTyping() {};
var loadVoiceMail = function loadVoiceMail() {};
var playVoiceMail = function playVoiceMail() {};
var replayVoiceMail = function replayVoiceMail() {};
var muteVoiceMail = function muteVoiceMail() {};
var unmuteVoiceMail = function unmuteVoiceMail() {};

var onReady = function onReady() {
  $('body').removeClass('loading');
  // $('body').addClass('loading')

  retype();

  $('#reload-me').click(function () {
    $('#reload-me').addClass('hide');
    retype();
  });
};
//
var _loading = new Loading({ delay: 3000 }, onReady);
$(document).ready(function () {
  _loading.pageReady();
});

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

//
// var el = document.querySelector('.my-text')
//
// // All the possible options (these are the default values)
// // Remember that every option (except individualDelays) can be defined as single value or array
// var options = {
//   size: 100,         // Font size, defined by the height of the letters (pixels)
//   weight: 1,         // Font weight (pixels)
//   rounded: false,    // Rounded letter endings
//   color: '#5F6062',  // Font color
//   duration: 1,       // Duration of the animation of each letter (seconds)
//   delay: [0, 0.05],  // Delay animation among letters (seconds)
//   fade: 0.5,         // Fade effect duration (seconds)
//   easing: d3.easeCubicInOut.ease,   // Easing function
//   individualDelays: false               // If false (default), every letter delay increase gradually, showing letters from left to right always. If you want to show letters in a disorderly way, set it to true, and define different delays for the desired letters.
// }

// Initializing the text (Letters parameters: container-element, options)
// var myText = new Letters(el, options)
// myText.show()

init({ delay: 3000, onReady: onReady });
// module.exports = Loading
exports.Loading = Loading;
//# sourceMappingURL=app.js.map