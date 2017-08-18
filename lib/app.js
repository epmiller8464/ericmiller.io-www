'use strict'

const noop = function () {}
const $ = window.$ || noop

const CONSTANTS = {
  $el: 'body',
  class: 'loading',
  LOADING_TIMEOUT: 5000
}
const TYPED_TEXT = {
  GREETING: ['.greeting', '<span class="br">Hello</span>'],
  INTRO: ['.intro', 'I am Eric Miller, a software developer, systems architect, and world traveler in Austin, TX.'],
  TECH: ['.tech', 'I work across the full stack but my head is always in the cloud. I love Node.js, Python, and Go.'],
  SKILLS: ['.skills', 'I deliver beautiful code for complex problems implemented in elegant solutions.'],
  PASSION: ['.passion', 'I have a passion for real-time communication, scalable distributed systems, WebRTC and other p2p technologies.'],
  WHO: ['.who', 'I’m a self starter who is constantly learning and pushing my skills to the bleeding edge.'],
  GITHUB: ['.github', 'Check me out on <a href="https://github.com/epmiller8464">Github</a>']
}

let Loaded = function (opts, loadedHandler = noop, doneHandler = noop) {
  if (!(this instanceof Loaded)) return new Loaded(opts, loadedHandler, doneHandler)
  let self = this
  // self.events = new EventEmitter()
  self.delay = opts.delay
  self.loadedHandler = loadedHandler
  self.doneHandler = doneHandler

  self.onReady = function () {
    let self = this
    console.log('page ready called delay: %s', self.delay)
    setTimeout(function () {
      self.loadedHandler()
      self.doneHandler()
    }, self.delay, self)
  }
  return self
}

const initEvents = (opts) => {
  $('#read-more').click(function () {
    $('#read-more').addClass('hide')
    continueTyping()
  })

  $('#reload-me').click(function () {
    $('#reload-me').addClass('hide')
    retype()
  })
}

const doneLoading = () => {
  $('body').removeClass('loading')
  retype()
}

// [CONSTANTS.TECH, CONSTANTS.WHATIDO, CONSTANTS.PASSION, CONSTANTS.WHO]
const TEXT_INDEX = Object.keys(TYPED_TEXT)

const tail = function (i, k, done = noop) {
  console.log(arguments)
  let key = TEXT_INDEX[i]
  if (!key || i > k) return done()

  let textSet = TYPED_TEXT[key]
  console.log(textSet)
  let selector = textSet[0]
  let text = textSet[1]
  $(selector).typed({
    strings: [text],
    typeSpeed: 0,
    html: true,
    showCursor: false,
    startDelay: 0,
    callback: function () {
      return tail(++i, k, done)
    }
  })
}

const startTyping = (done = () => {$('#read-more').removeClass('hide')}) => {
  tail(0, 1, done)
}

const continueTyping = () => {
  tail(2, TEXT_INDEX.length)
}

function retype () {
  $('.greeting').text('')
  $('.intro').text('')
  $('.skills').text('')
  $('.tech').text('')
  $('.github').text('')
  $('.who').text('')
  startTyping()
}

function VisualVoiceMail (opts, callback = noop) {
  if (!(this instanceof VisualVoiceMail)) return new VisualVoiceMail(opts, callback)

  var self = this
  self.player = null
  self.audioComponents = []
  self.isMobileDevice = browser().mobile
  self.touched = false

  self.voicemailElements = {
    $mute: null,
    $replay: null
  }

  self.recording = {
    $container: $('.audio-controls')
  }

  self.type = function type () {
    var self = this

    $('.voice-message-text').typed({
      strings: ['You have reached the voice mail of Eric Miller. Please leave your name, number and a short message and i will get back to you as soon as possible. <br/> Thanks!'],
      typeSpeed: 0.99,
//                    startDelay: 500,
      html: true,
      showCursor: false,
      startDelay: 0,
//                    onStart: (arrayPos, self) => {console.log('on start')},
//                    preStringTyped: (arrayPos, self) => {console.log('on preStringTyped %s %s', arrayPos, self)},
      callback: function () {
        $('#go-to-record').removeClass('hide').children('.glyphicon').addClass('intensifies').fadeIn()
        var i = window.localStorage.getItem('_vm_played')
        window.localStorage.setItem('_vm_played', ++i)
        console.log(i)
      }
    })
  }

  self.loadAudioVisualControl = function loadAudioVisualControl (_cb = noop) {
    var self = this

    let cb = _cb
    var self = this
    var played = false// window.localStorage.getItem('_vm_played')
    var _player = new Howl({
      src: ['./media/em-vm.wav'],
      autoplay: true,
      preload: true,
      loop: false,
      volume: !(played) ? 0.5 : 0.1,
      html5: true,
      rate: 0.83,
      mute: true
    })
    _player.once('load', function () {
      console.log('audio loaded')
      console.log(_player.duration())
      self.type()
      _cb(true)
    })
//
    _player.on('end', function () {
      if (!played) { window.localStorage.setItem('_vm_played', 1) }
    })
    return _player
  }

  self.showAudioControls = function showAudioControls () {
    var self = this

    self.recording.$container.removeClass('hide')
  }

  self.showAudioControls = function disableAudioControls () {
    var self = this

    self.recording.$container.addClass('hide')
//            $('.audio-controls').addClass('hide')
  }

  self.bindEvents = function bindEvents () {
    var self = this
    smoothScroll.init()
    $(document).ready(() => {
      $('#top-scroll').affix({
        offset: {
          top: $(window).height()
        }
      })
      $('[name=email]').keypress(function () {
        if (new RegExp(/.+@.+\..+/).test($(this).val())) {
          $('.btn.next').removeClass('hide')
        } else {
          self.hideAudioControls()
        }
      })
      $('[name=email]').focusout(function () {
        if (new RegExp(/.+@.+\..+/).test($(this).val())) {
          $('.btn.next').removeClass('hide')
//                    incrementStep()
        } else {
//                    alert('invalid asshole')
          $(this).addClass('hasError')
        }
      })
      $('.next').click(function () {
        // 1. hide the previous step
        // 2. enable client side socket.io code
        self.showAudioControls()
      })
      $('#show-record-btn').click(function () {
        $('#show-record-btn').children('.fa').removeClass('text-success').addClass('text-danger')
        $('#record-container').removeClass('hide')
      })
    })
  }

  self.bindTouchEvents = function bindTouchEvents (cb = noop) {
    var self = this
    $('#alert-row').removeClass('hide')
    var el = document.getElementsByTagName('body')[0]
    var touched = false
    el.addEventListener('touchstart', function () {
      if (touched) { return }

      touched = true
      self.player = self.loadAudioVisualControl(cb)
      cb()
    }, false)
  }

  self.loadRecordedMessage = function loadRecordedMessage () {
    var self = this
    var _audioComponents = []
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

      }
    }).toArray()

    for (var i = 0; i < voices.length; i++) {
      var config = voices[i]
      var audio = new AudioComponent(config)
      _audioComponents.push(audio)
    }
    return _audioComponents
  }

  self.init = function init (cb = noop) {
    var self = this

    self.bindEvents()
    if (self.isMobileDevice) {
      self.bindTouchEvents(cb)
    } else {
      self.player = self.loadAudioVisualControl(cb)
    }
    self.audioComponents = self.loadRecordedMessage()
  }

  self.init(callback)
  return self
}

const App = {
  me: function (options, cb = noop) {
    // let body = document.body
    particlesJS.load('particles-js', 'particles.json', function () {
      console.log('particlesJS loaded')
      initEvents()
      Loaded(options, noop, function () {
        $('body').removeClass('loading')
        retype()
        cb()
      }).onReady()
    })
  },
  voicemail: (options, cb = noop) => {
    let body = document.body
    let visualVoiceMail = null

    imagesLoaded(body, () => {
      console.log('images loaded')
      Loaded(options, () => {
        visualVoiceMail = new VisualVoiceMail({}, () => {
          console.log('done loading')
          $('body').removeClass('loading')
          cb()
        })
      }).onReady()
    })
  }
}
// return Loaded
// module.exports.Loaded = Loaded
window.App = App
export { App }
