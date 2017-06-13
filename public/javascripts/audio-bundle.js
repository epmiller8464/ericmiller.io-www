// Start off by initializing a new context.
context = new (window.AudioContext || window.webkitAudioContext)()

if (!context.createGain) { context.createGain = context.createGainNode }
if (!context.createDelay) { context.createDelay = context.createDelayNode }
if (!context.createScriptProcessor) { context.createScriptProcessor = context.createJavaScriptNode }

// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()

function bytesToSize (bytes) {
  var k = 1000
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) {
    return '0 Bytes'
  }
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10)
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}

function playSound (buffer, time) {
  var source = context.createBufferSource()
  source.buffer = buffer
  source.connect(context.destination)
  source[source.start ? 'start' : 'noteOn'](time)
}

function loadSounds (obj, soundMap, callback) {
  // Array-ify
  var names = []
  var paths = []
  for (var name in soundMap) {
    var path = soundMap[name]
    names.push(name)
    paths.push(path)
  }
  bufferLoader = new BufferLoader(context, paths, function (bufferList) {
    for (var i = 0; i < bufferList.length; i++) {
      var buffer = bufferList[i]
      var name = names[i]
      obj[name] = buffer
    }
    if (callback) {
      callback()
    }
  })
  bufferLoader.load()
}

function BufferLoader (context, urlList, callback) {
  this.context = context
  this.urlList = urlList
  this.onload = callback
  this.bufferList = new Array()
  this.loadCount = 0
}

BufferLoader.prototype.loadBuffer = function (url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'

  var loader = this

  request.onload = function () {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function (buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url)
          return
        }
        loader.bufferList[index] = buffer
        if (++loader.loadCount == loader.urlList.length) { loader.onload(loader.bufferList) }
      },
      function (error) {
        console.error('decodeAudioData error', error)
      }
    )
  }

  request.onerror = function () {
    alert('BufferLoader: XHR error')
  }

  request.send()
}

BufferLoader.prototype.load = function () {
  for (var i = 0; i < this.urlList.length; ++i) { this.loadBuffer(this.urlList[i], i) }
}

/*
 * Copyright 2013 Boris Smus. All Rights Reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var WIDTH = 720
var HEIGHT = 360

// Interesting parameters to tweak!
var SMOOTHING = 0.85
// var FFT_SIZE = 2048 << 0x01
var FFT_SIZE = 1024
// var FFT_SIZE = 2048 / 2

function WebVoiceMail (config, cb) {

  this.mediaStream = config.source
  this.input = context.createMediaStreamSource(this.mediaStream)
  // Connect the input to a filter.
  this.filter = context.createBiquadFilter()
  this.filter.frequency.value = 60.0
  this.filter.type = 'notch'
  this.filter.Q = 10.0

  this.analyser = context.createAnalyser()
  // Connect graph.
  this.input.connect(this.filter)
  this.filter.connect(this.analyser)

  this.freqs = new Uint8Array(this.analyser.frequencyBinCount)
  this.times = new Uint8Array(this.analyser.frequencyBinCount)
  this.sampleBuffer = new Uint8Array(this.analyser.frequencyBinCount)
  this.isLive = true
  this.startTime = 0
  this.startOffset = 0
  this.maxTime = 45000
  this.canvas = config.canvas
  return this
}

// Toggle playback
WebVoiceMail.prototype.togglePlayback = function () {
  this.play()
}

WebVoiceMail.prototype.play = function () {
  // $('#rerecord').prop('disabled', true)
  // this.stop()

  this.startTime = context.currentTime
  console.log('started at', this.startOffset)
  this.source = context.createBufferSource()
  // Connect graph
  this.source.connect(this.analyser)
  this.source.buffer = this.buffer
  this.source.loop = false
  // Start playback, but make sure we stay in bound of the buffer.
  this.source[this.source.start ? 'start' : 'noteOn'](0, this.startOffset % this.buffer.duration)
  // Start visualizer.
  this.isLive = true

  this.source.onEnded = this.onEnded
  requestAnimationFrame(this.draw.bind(this))
}

WebVoiceMail.prototype.stop = function () {
//   if (this.isLive) {
  try {
    // this.source[this.source.stop ? 'stop' : 'noteOff'](0)
    this.source.disconnect(0)
    this.mediaStream.stop()
    // this.startOffset = 0// += context.currentTime - this.startTime
    console.log('stopped at', context.currentTime)
  } catch (e) {
  }

  this.startOffset = 0
  this.isLive = false
}

WebVoiceMail.prototype.disconnect = function () {
  this.stop()
  this.source.disconnect(0)
  this.startOffset = 0
}

WebVoiceMail.prototype.onEnded = function () {
  // this.stop()
  // $('#rerecord').prop('disabled', false)
  console.log('the stream ended do something')
}

WebVoiceMail.prototype.draw = function () {
  this.analyser.smoothingTimeConstant = SMOOTHING
  this.analyser.fftSize = FFT_SIZE / 4

  // Get the frequency data from the currently live stream
  this.analyser.getByteFrequencyData(this.freqs)
  this.analyser.getByteTimeDomainData(this.times)

  var width = Math.floor(1 / this.freqs.length, 10)
  // var width = Math.floor(1 / this.freqs.length, 10)

  // var canvas = document.querySelector('canvas')
  var drawContext = this.canvas.getContext('2d')

  this.canvas.width = WIDTH * 1.5
  this.canvas.height = HEIGHT
  // Draw the frequency domain chart.
  for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
    var value = this.freqs[i]
    // value = this.getFrequencyValue(value);//[i]
    var percent = value / 256
    var height = HEIGHT * percent
    var offset = HEIGHT - height - 1
    var barWidth = WIDTH / this.analyser.frequencyBinCount
    var hue = i / this.analyser.frequencyBinCount * 360
    drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)'
    drawContext.fillRect((i * barWidth) * 2, offset * 0.5, 2, (height))
  }

  // Draw the time domain chart.
  // for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
  //   var value = this.times[i]
  //   var percent = value / 256
  //   var height = HEIGHT * percent
  //   var offset = HEIGHT - height - 1
  //   var barWidth = WIDTH / this.analyser.frequencyBinCount
  //   drawContext.fillStyle = 'white'
  //   drawContext.fillRect(i * barWidth, offset, 1, 2)
  // drawContext.fillRect(i * barWidth, offset, barWidth, 2)
  // drawContext.fillRect(i * barWidth, offset, barWidth, height)

  // }

  if (this.isLive) {
    requestAnimationFrame(this.draw.bind(this))
  }
}

WebVoiceMail.prototype.getFrequencyValue = function (freq) {
  var nyquist = context.sampleRate / 2
  var index = Math.round(freq / nyquist * this.freqs.length)
  return this.freqs[index]
}

WebVoiceMail.prototype.sample = function (freq) {
  var sampleRate = context.sampleRate
  var index = Math.round(freq / sampleRate * this.freqs.length)
  return this.freqs[index]
}

WebVoiceMail.prototype.onError = function onStreamError (e) {
  console.error(e)
}

WebVoiceMail.prototype.captureCanvasImage = function () {
  // this.canvas
  $('#captured').prop('src', this.canvas.toDataURL('image/png'))
}
$('#snap').click(function () {
  liveSample.captureCanvasImage()
})
function VisualizerSample (config, cb) {
  this.analyser = context.createAnalyser()

  this.analyser.connect(context.destination)
  this.analyser.minDecibels = config.minDecibels || -140
  this.analyser.maxDecibels = config.maxDecibels || 0
  loadSounds(this, {
    buffer: config.source
  }, onLoaded)
  this.freqs = new Uint8Array(this.analyser.frequencyBinCount)
  this.times = new Uint8Array(this.analyser.frequencyBinCount)

  function onLoaded () {
    // var button = document.querySelector('button')
    // button.removeAttribute('disabled')
    $('#playback-click').text('Play/pause')
    $('#playback-click').prop('disabled', false)

    return cb()
  }

  this.isPlaying = false
  this.startTime = 0
  this.startOffset = 0
  this.canvas = config.canvas
}

// Toggle playback
VisualizerSample.prototype.togglePlayback = function () {
  this.play()
}

VisualizerSample.prototype.play = function () {
  $('#rerecord').prop('disabled', true)
  this.stop()

  this.startTime = context.currentTime
  console.log('started at', this.startOffset)
  this.source = context.createBufferSource()
  // Connect graph
  this.source.connect(this.analyser)
  this.source.buffer = this.buffer
  this.source.loop = false
  // Start playback, but make sure we stay in bound of the buffer.
  this.source[this.source.start ? 'start' : 'noteOn'](0, this.startOffset % this.buffer.duration)
  // Start visualizer.
  this.isPlaying = true

  this.source.onEnded = this.onEnded
  requestAnimFrame(this.draw.bind(this))
}

VisualizerSample.prototype.stop = function () {
//   if (this.isPlaying) {
  try {
    this.source[this.source.stop ? 'stop' : 'noteOff'](0)
    this.startOffset += context.currentTime - this.startTime
    console.log('paused at', this.startOffset)
  } catch (e) {

  }

//   }
  this.startOffset = 0
  this.isPlaying = false
}

VisualizerSample.prototype.disconnect = function () {
  this.stop()
  this.source.disconnect(0)
  this.startOffset = 0
}

VisualizerSample.prototype.onEnded = function () {
  this.stop()
  $('#rerecord').prop('disabled', false)
}

VisualizerSample.prototype.draw = function () {
  this.analyser.smoothingTimeConstant = SMOOTHING
  this.analyser.fftSize = FFT_SIZE

  // Get the frequency data from the currently playing music
  this.analyser.getByteFrequencyData(this.freqs)
  this.analyser.getByteTimeDomainData(this.times)

  var width = Math.floor(1 / this.freqs.length, 10)

  var drawContext = this.canvas.getContext('2d')
  this.canvas.width = WIDTH
  this.canvas.height = HEIGHT
  // Draw the frequency domain chart.
  for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
    var value = this.freqs[i]
    var percent = value / 256
    var height = HEIGHT * percent
    var offset = HEIGHT - height - 1
    var barWidth = WIDTH / this.analyser.frequencyBinCount
    var hue = i / this.analyser.frequencyBinCount * 360
    drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)'
    drawContext.fillRect(i * barWidth, offset, barWidth, height)
  }

  // Draw the time domain chart.
  for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
    var value = this.times[i]
    var percent = value / 256
    var height = HEIGHT * percent
    var offset = HEIGHT - height - 1
    var barWidth = WIDTH / this.analyser.frequencyBinCount
    drawContext.fillStyle = 'white'
    drawContext.fillRect(i * barWidth, offset, 1, 2)
  }

  if (this.isPlaying) {
    requestAnimationFrame(this.draw.bind(this))
  }
}

VisualizerSample.prototype.getFrequencyValue = function (freq) {
  var nyquist = context.sampleRate / 2
  var index = Math.round(freq / nyquist * this.freqs.length)
  return this.freqs[index]
}

if (false /* for Microsoft Edge */) {
//            cameraPreview.parentNode.innerHTML = '<audio id="camera-preview" controls style="border: 1px solid rgb(15, 158, 238); width: 94%;"></audio> '
}

var socketio = io()
var mediaStream = null
socketio.on('connect', function () {
  startRecording.disabled = false
})
var startRecording = document.getElementById('start-recording')
var stopRecording = document.getElementById('stop-recording')
var cameraPreview = document.getElementById('camera-preview')
var progressBar = document.querySelector('#progress-bar')
var percentage = document.querySelector('#percentage')
var liveAudioCanvas = document.querySelector('#live-audio-canvas')
var playbackAudioCanvas = document.querySelector('#live-audio-canvas')
var recordAudio
var recordVideo
var sample
var liveSample

startRecording.onclick = function () {
  startRecording.disabled = true

  if (sample) { sample.disconnect() }

  navigator.getUserMedia({
    audio: true
    // video: true
  }, function (stream) {
    mediaStream = stream

    // recordAudio = RecordRTC(stream, {
    //   type: 'audio',
    //   recorderType: StereoAudioRecorder,
    //   onAudioProcessStarted: function () {
    liveSample = new WebVoiceMail({type: 'live-audio', source: mediaStream, canvas: liveAudioCanvas})
    liveSample.draw()
    // recordVideo.startRecording()
    cameraPreview.src = window.URL.createObjectURL(stream)
    cameraPreview.play()
    cameraPreview.muted = true
    cameraPreview.controls = false
//                        cameraPreview.context
//       }
//     })
    // var videoOnlyStream = new MediaStream()
    // stream.getVideoTracks().forEach(function (track) {
    //   videoOnlyStream.addTrack(track)
    // })
    // recordVideo = RecordRTC(videoOnlyStream, {
    //   type: 'video',
    //   recorderType: !!navigator.mozGetUserMedia ? MediaStreamRecorder : WhammyRecorder
    // })
    recordAudio.startRecording()

    stopRecording.disabled = false
  }, function (error) {
    alert(JSON.stringify(error))
  })
}
stopRecording.onclick = function () {
  startRecording.disabled = false
  stopRecording.disabled = true
  // stop audio recorder
  // recordAudio.stopRecording(function () {
  //   // stop video recorder
  //   recordVideo.stopRecording(function () {
  //     // get audio data-URL
  //     recordAudio.getDataURL(function (audioDataURL) {
  //       // get video data-URL
  //       recordVideo.getDataURL(function (videoDataURL) {
  //         var files = {
  //           audio: {
  //             type: recordAudio.getBlob().type || 'audio/wav',
  //             dataURL: audioDataURL
  //           },
  //           video: {
  //             type: recordVideo.getBlob().type || 'video/webm',
  //             dataURL: videoDataURL
  //           }
  //         }
  //         socketio.emit('message', files)
  //         if (mediaStream) mediaStream.stop()
  //       })
  //     })
  //     cameraPreview.src = ''
  //     cameraPreview.poster = 'ajax-loader.gif'
  //   })
  // })
  // if firefox or if you want to record only audio
  // stop audio recorder
  recordAudio.stopRecording(function () {
    // get audio data-URL
    recordAudio.getDataURL(function (audioDataURL) {
      var files = {
        audio: {
          type: recordAudio.getBlob().type || 'audio/wav',
          dataURL: audioDataURL
        }
      }
      socketio.emit('message', files)
      if (mediaStream) mediaStream.stop()
    })
    cameraPreview.src = ''
    cameraPreview.poster = 'ajax-loader.gif'
  })
}

$('#rerecord').click(function () {
  // $('#start-recording').trigger('click')
  startRecording.click()
})
socketio.on('merged', function (fileName) {
  var href = (location.href.split('/').pop().length ? location.href.replace(location.href.split('/').pop(), '') : location.href)
  href = href + 'uploads/' + fileName
  console.log('got file ' + href)
  sample = new VisualizerSample(href, function () {
    sample.togglePlayback()
// tes
//     cameraPreview.src = href
//     cameraPreview.play()
//     cameraPreview.muted = false
//     cameraPreview.controls = true
  })
})

socketio.on('ffmpeg-output', function (result) {
  if (parseInt(result) >= 100) {
    progressBar.parentNode.style.display = 'none'
    return
  }
  progressBar.parentNode.style.display = 'block'
  progressBar.value = result
  percentage.innerHTML = 'Ffmpeg Progress ' + result + '%'
})
socketio.on('ffmpeg-error', function (error) {
  alert(error)
})
