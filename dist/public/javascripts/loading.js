'use strict';

var EventEmitter = require('events').EventEmitter;

var Loading = function Loading(opts, loadedHandler) {
  var self = this;
  // self.events = new EventEmitter()
  self.delay = opts.delay;
  self.loadHandler = loadedHandler;
  self.pageReady = function () {
    console.log('page ready called');
    setTimeout(function () {
      self.loadHandler();
    }, self.delay, self);
  };
  return self;
};

function onReady() {
  $('.loader-panel').removeClass('loading');
  particlesJS.load('particles-js', 'particles.json', function () {});
  retype();
  $('#read-more').click(function () {
    $('#read-more').addClass('hide');
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
  });
  $('#reload-me').click(function () {
    $('#reload-me').addClass('hide');
    retype();
  });
}

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
    strings: ['Hello'],
    typeSpeed: 50,
    showCursor: false,
    callback: function callback() {
      //              /,
      $('.intro').typed({
        strings: ['My name is Eric Miller I am software developer in Austin, TX.'],
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
//# sourceMappingURL=loading.js.map