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

let socketio = io()
let mediaStream = null
socketio.on('connect', function () {
  startRecording.disabled = false
})
let currentTime = 0
let startRecording = document.getElementById('record-btn')
let stopRecording = document.getElementById('stop-recording-btn')
let playButton = document.getElementById('play-btn')
let uploadRecordingButton = document.getElementById('save-upload-btn')
let cameraPreview = document.getElementById('camera-preview')
let progressBar = document.querySelector('#progress-bar')
let percentage = document.querySelector('#percentage')
let liveAudioCanvas = document.querySelector('#live-audio-canvas')
let playbackAudioCanvas = document.querySelector('#playback-audio-canvas')
let recordAudio
let recordVideo
let sample
let liveSample

function BufferLoader (context, urlList, callback) {
  this.context = context
  this.urlList = urlList
  this.onload = callback
  this.bufferList = new Array()
  this.loadCount = 0
}

BufferLoader.prototype.loadBuffer = function (url, index) {
  // Load buffer asynchronously
  let request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'

  let loader = this

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
  for (let i = 0; i < this.urlList.length; ++i) { this.loadBuffer(this.urlList[i], i) }
}

function bytesToSize (bytes) {
  let k = 1000
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) {
    return '0 Bytes'
  }
  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10)
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}

function playSound (buffer, time) {
  let source = context.createBufferSource()
  source.buffer = buffer
  source.connect(context.destination)
  source[source.start ? 'start' : 'noteOn'](time)
}

function loadSounds (obj, soundMap, callback) {
  // Array-ify
  let names = []
  let paths = []
  for (let name in soundMap) {
    let path = soundMap[name]
    names.push(name)
    paths.push(path)
  }
  let bufferLoader = new BufferLoader(context, paths, function (bufferList) {
    for (let i = 0; i < bufferList.length; i++) {
      let buffer = bufferList[i]
      let name = names[i]
      obj[name] = buffer
    }
    if (callback) {
      callback()
    }
  })
  bufferLoader.load()
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
let clearInterval
let MAXRECORDTIME = 45000

let WIDTH = 640
let HEIGHT = 230

// Interesting parameters to tweak!
let SMOOTHING = 0.85
// let FFT_SIZE = 2048 << 0x01
let FFT_SIZE = 1024
// let FFT_SIZE = 2048 / 2

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
    this.mediaStream.stop()
    this.input.disconnect(0)
    this.filter.disconnect(0)
    cameraPreview.src = ''
    // cameraPreview.stop()

    this.startOffset = 0// += context.currentTime - this.startTime
    console.log('stopped at', context.currentTime)
  } catch (e) {
  }

  this.startOffset = 0
  this.isLive = false
}

WebVoiceMail.prototype.disconnect = function () {
  this.stop()
  this.input.disconnect(0)
  this.startOffset = 0
}

WebVoiceMail.prototype.onEnded = function () {
  alert()
  $('#stop-recording-btn').trigger('click')
  clearInterval(clearInterval)
  console.log('max record time reached...')
  console.log('the stream ended do something')
}

WebVoiceMail.prototype.draw = function () {
  this.analyser.smoothingTimeConstant = SMOOTHING
  this.analyser.fftSize = FFT_SIZE / 4

  // Get the frequency data from the currently live stream
  this.analyser.getByteFrequencyData(this.freqs)
  this.analyser.getByteTimeDomainData(this.times)

  let width = Math.floor(1 / this.freqs.length, 10)
  // let width = Math.floor(1 / this.freqs.length, 10)

  // let canvas = document.querySelector('canvas')
  let drawContext = this.canvas.getContext('2d')

  this.canvas.width = WIDTH * 1.5
  this.canvas.height = HEIGHT
  // Draw the frequency domain chart.
  for (let i = 0; i < this.analyser.frequencyBinCount; i++) {
    let value = this.freqs[i]
    // value = this.getFrequencyValue(value);//[i]
    let percent = value / 256
    let height = HEIGHT * percent
    let offset = HEIGHT - height - 1
    let barWidth = WIDTH / this.analyser.frequencyBinCount
    // let barWidth = this.freqs.length / this.analyser.frequencyBinCount
    let hue = i / this.analyser.frequencyBinCount * 360
    drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)'
    drawContext.fillRect((i * barWidth) * 1.5, offset * 0.5, 2, (height + 0.25))
  }

  // // Draw the time domain chart.
  // for (let i = 0; i < this.analyser.frequencyBinCount; i++) {
  //   let value = this.times[i]
  //   let percent = value / 256
  //   let height = HEIGHT * percent
  //   let offset = HEIGHT - height - 1
  //   let barWidth = WIDTH / this.analyser.frequencyBinCount
  //   drawContext.fillStyle = 'white'
  //   drawContext.fillRect(i * barWidth, offset, 1, 2)
  //   // drawContext.fillRect(i * barWidth, offset, barWidth, 2)
  //   // drawContext.fillRect(i * barWidth, offset, barWidth, height)
  //   //
  // }

  if (this.isLive) {
    requestAnimationFrame(this.draw.bind(this))
  }
}

WebVoiceMail.prototype.getFrequencyValue = function (freq) {
  let nyquist = context.sampleRate / 2
  let index = Math.round(freq / nyquist * this.freqs.length)
  return this.freqs[index]
}

VisualizerSample.prototype.monitorTime = function () {
  console.log('context time: %s, buffer duration', context.currentTime, this.buffer.duration)

  requestAnimationFrame(this.time.bind(this))
}

WebVoiceMail.prototype.sample = function (freq) {
  let sampleRate = context.sampleRate
  let index = Math.round(freq / sampleRate * this.freqs.length)
  return this.freqs[index]
}

WebVoiceMail.prototype.onError = function onStreamError (e) {
  console.error(e)
}
let image
WebVoiceMail.prototype.captureCanvasImage = function () {
  // this.canvas
  image = this.canvas.toDataURL('image/png')
  $('#snapshot').prop('src', image)
}

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
    // let button = document.querySelector('button')
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
  // $('#rerecord').prop('disabled', true)
  this.stop()

  this.startTime = context.currentTime
  console.log('started at', this.startOffset)
  this.source = context.createBufferSource()
  // Connect graph
  this.source.onEnded = this.onEnded
  this.source.connect(this.analyser)
  this.source.buffer = this.buffer
  this.source.loop = false
  // Start playback, but make sure we stay in bound of the buffer.
  this.source[this.source.start ? 'start' : 'noteOn'](0, this.startOffset % this.buffer.duration)
  console.log('duration: ', this.buffer.duration)
  // Start visualizer.
  this.isPlaying = true
  this.draw()
  this.time()
}

VisualizerSample.prototype.time = function () {
  console.log('context time: %s, buffer duration', context.currentTime, this.buffer.duration)

  requestAnimationFrame(this.time.bind(this))
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
  console.log('stopping...')
  this.stop()
  // $('#rerecord').prop('disabled', false)
  alert('done')
}

VisualizerSample.prototype.draw = function () {
  this.analyser.smoothingTimeConstant = 0.8
  this.analyser.fftSize = FFT_SIZE / 4

  // Get the frequency data from the currently live stream
  this.analyser.getByteFrequencyData(this.freqs)
  this.analyser.getByteTimeDomainData(this.times)

  let width = Math.floor(1 / this.freqs.length, 10)
  // let width = Math.floor(1 / this.freqs.length, 10)

  // let canvas = document.querySelector('canvas')
  let drawContext = this.canvas.getContext('2d')

  this.canvas.width = WIDTH * 1.5
  this.canvas.height = HEIGHT
  // Draw the frequency domain chart.
  for (let i = 0; i < this.analyser.frequencyBinCount; i++) {
    let value = this.freqs[i]
    // value = this.getFrequencyValue(value);//[i]
    let percent = value / 256
    let height = HEIGHT * percent
    let offset = HEIGHT - height - 1
    let barWidth = WIDTH / this.analyser.frequencyBinCount
    // let barWidth = this.freqs.length / this.analyser.frequencyBinCount
    let hue = i / this.analyser.frequencyBinCount * 360
    drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)'
    drawContext.fillRect((i * barWidth) * 1.5, offset * 0.5, 2, (height + 0.25))
  }

  // // Draw the time domain chart.
  // for (let i = 0; i < this.analyser.frequencyBinCount; i++) {
  //   let value = this.times[i]
  //   let percent = value / 256
  //   let height = HEIGHT * percent
  //   let offset = HEIGHT - height - 1
  //   let barWidth = WIDTH / this.analyser.frequencyBinCount
  //   drawContext.fillStyle = 'white'
  //   drawContext.fillRect(i * barWidth, offset, 1, 2)
  //   // drawContext.fillRect(i * barWidth, offset, barWidth, 2)
  //   // drawContext.fillRect(i * barWidth, offset, barWidth, height)
  //   //
  // }

  // if (this.isPlaying) {
  requestAnimationFrame(this.draw.bind(this))
  // }
}
VisualizerSample.prototype.getFrequencyValue = function (freq) {
  let nyquist = context.sampleRate / 2
  let index = Math.round(freq / nyquist * this.freqs.length)
  return this.freqs[index]
}

if (false /* for Microsoft Edge */) {
//            cameraPreview.parentNode.innerHTML = '<audio id="camera-preview" controls style="border: 1px solid rgb(15, 158, 238); width: 94%;"></audio> '
}

function initAudio () {
  startRecording.disabled = false
  stopRecording.disabled = true
  playButton.disabled = true
  uploadRecordingButton.disabled = true

  if (sample) { sample.disconnect() }

  navigator.getUserMedia({
    audio: true,
    video: false
  }, function (stream) {
    mediaStream = stream
    liveSample = new WebVoiceMail({type: 'live-audio', source: stream, canvas: liveAudioCanvas})
    liveSample.draw()
  }, function (error) {
    alert(JSON.stringify(error))
  })
  cameraPreview.onEnded = function () { alert('done') }
}

startRecording.onclick = function () {
  // initAudio()
  startRecording.disabled = true
  playButton.disabled = true
  uploadRecordingButton.disabled = true
  $('.status.on').text('Recording....').addClass('recording')
  // if (!recordAudio) {

  recordAudio = RecordRTC(liveSample.mediaStream, {
    type: 'audio',
    recorderType: StereoAudioRecorder,
    onAudioProcessStarted: function () {
      // recordVideo.startRecording()
      cameraPreview.src = window.URL.createObjectURL(mediaStream)
      cameraPreview.play()
      cameraPreview.muted = true
      cameraPreview.controls = false
      clearInterval = showProgress()
      setInterval(showProgress, 1000)
    }
  })
  // }
  recordAudio.setRecordingDuration(45000, liveSample.onEnded)
  recordAudio.startRecording()
  currentTime = recordAudio.recordingDuration
  stopRecording.disabled = false
}
let duration = 45
let imageCaptured = false
function showProgress () {
  $('.time-remaining').text(duration + ' seconds')
  if (duration < (45 / 2) && !imageCaptured) {
    liveSample.captureCanvasImage()
    imageCaptured = true
  }
  duration--
}

stopRecording.onclick = function () {
  $('.status.on.recording').text('Recording stopped').removeClass('recording')
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
  //         let files = {
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

  // cameraPreview.stop()
  cameraPreview.poster = 'ajax-loader.gif'
  recordAudio.stopRecording(function () {
    // get audio data-URL
    recordAudio.getDataURL(function (audioDataURL) {
      let files = {
        audio: {
          type: recordAudio.getBlob().type || 'audio/wav',
          dataURL: audioDataURL,
          image: image,
          email: 'epmiller8464@gmail.com'
        }
      }
      socketio.emit('message', files)
      // if (mediaStream)
      //   mediaStream.stop()
      liveSample.stop()
      cameraPreview.src = ''
    })
  })
}

playButton.onclick = function () {
  sample.togglePlayback()
}

uploadRecordingButton.onclick = function () {
  // $('#start-recording').trigger('click')
  // sample.togglePlayback()
  sample.startOffset = sample.buffer.duration / 2
  sample.play()
  // initAudio()
}

socketio.on('merged', function (fileName) {
  let href = (location.href.split('/').pop().length ? location.href.replace(location.href.split('/').pop(), '') : location.href)
  href = href + 'uploads/' + fileName
  console.log('got file ' + href)
  sample = new VisualizerSample({source: href, canvas: liveAudioCanvas}, function () {
    startRecording.disabled = true
    playButton.disabled = false
    uploadRecordingButton.disabled = false
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
