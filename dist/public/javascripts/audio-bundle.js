'use strict';

context = new (window.AudioContext || window.webkitAudioContext || webkitAudioContext)();

if (!context.createGain) {
  context.createGain = context.createGainNode;
}
if (!context.createDelay) {
  context.createDelay = context.createDelayNode;
}
if (!context.createScriptProcessor) {
  context.createScriptProcessor = context.createJavaScriptNode;
}

// shim layer with setTimeout fallback
window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

var socketio = io();
var mediaStream = null;
socketio.on('connect', function () {
  startRecording.disabled = false;
});
var currentTime = 0;
var startRecording = document.getElementById('record-btn');
var stopRecording = document.getElementById('stop-recording-btn');
var playButton = document.getElementById('play-btn');
var deleteRecordingButton = document.getElementById('delete-upload-btn');
var cameraPreview = document.getElementById('camera-preview');
var progressBar = document.querySelector('#progress-bar');
var percentage = document.querySelector('#percentage');
var liveAudioCanvas = document.querySelector('#live-audio-canvas');
var playbackAudioCanvas = document.querySelector('#playback-audio-canvas');
var recordAudio;
var recordVideo;
var sample;
var liveSample;

function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function (url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  console.log(url);
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  var loader = this;

  request.onload = function () {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(request.response, function (buffer) {
      if (!buffer) {
        alert('error decoding file data: ' + url);
        return;
      }
      loader.bufferList[index] = buffer;
      if (++loader.loadCount == loader.urlList.length) {
        loader.onload(loader.bufferList);
      }
    }, function (error) {
      console.error('decodeAudioData error', error);
    });
  };

  request.onerror = function () {
    alert('BufferLoader: XHR error');
  };

  request.send();
};

BufferLoader.prototype.load = function () {
  for (var i = 0; i < this.urlList.length; ++i) {
    this.loadBuffer(this.urlList[i], i);
  }
};

function bytesToSize(bytes) {
  var k = 1000;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
    return '0 Bytes';
  }
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

function playSound(buffer, time) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source[source.start ? 'start' : 'noteOn'](time);
}

function loadSounds(obj, soundMap, callback) {
  // Array-ify
  var names = [];
  var paths = [];
  for (var name in soundMap) {
    var path = soundMap[name];
    names.push(name);
    paths.push(path);
  }
  var bufferLoader = new BufferLoader(context, paths, function (bufferList) {
    for (var i = 0; i < bufferList.length; i++) {
      var buffer = bufferList[i];
      var name = names[i];
      obj[name] = buffer;
    }
    if (callback) {
      callback();
    }
  });
  bufferLoader.load();
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
var _clearInterval;
var MAXRECORDTIME = 45000;

var WIDTH = 640;
var HEIGHT = 130;

// Interesting parameters to tweak!
var SMOOTHING = 0.85;
// var FFT_SIZE = 2048 << 0x01
var FFT_SIZE = 1024;
// var FFT_SIZE = 2048 / 2

function WebVoiceMail(config, cb) {
  this.mediaStream = config.source;
  this.input = context.createMediaStreamSource(this.mediaStream);
  // Connect the input to a filter.
  this.filter = context.createBiquadFilter();
  this.filter.frequency.value = 60.0;
  this.filter.type = 'notch';
  this.filter.Q = 10.0;

  this.analyser = context.createAnalyser();
  // Connect graph.
  this.input.connect(this.filter);
  this.filter.connect(this.analyser);

  this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
  this.times = new Uint8Array(this.analyser.frequencyBinCount);
  this.sampleBuffer = new Uint8Array(this.analyser.frequencyBinCount);
  this.isLive = true;
  this.startTime = 0;
  this.startOffset = 0;
  this.maxTime = 45000;
  this.index = 0;
  this.canvas = config.canvas;
  this.recording = false;
  this.siriWave = new SiriWave({
    container: document.getElementById('wavebg'),
    // style: 'ios9',
    speed: 0.05,
    color: '#f4846d',
    frequency: 4,
    amplitude: 0.3,
    autostart: true
  });
  return this;
}

// Toggle playback
WebVoiceMail.prototype.togglePlayback = function () {
  this.play();
};

WebVoiceMail.prototype.play = function () {
  // $('#rerecord').prop('disabled', true)
  // this.stop()

  this.startTime = context.currentTime;
  console.log('started at', this.startOffset);
  this.source = context.createBufferSource();
  // Connect graph
  this.source.connect(this.analyser);
  this.source.buffer = this.buffer;
  this.source.loop = false;
  // Start playback, but make sure we stay in bound of the buffer.
  this.source[this.source.start ? 'start' : 'noteOn'](0, this.startOffset % this.buffer.duration);
  // Start visualizer.
  this.isLive = true;

  this.source.onEnded = this.onEnded;
  requestAnimationFrame(this.draw.bind(this));
};

WebVoiceMail.prototype.stop = function () {
  //   if (this.isLive) {
  try {
    // this.source[this.source.stop ? 'stop' : 'noteOff'](0)
    this.recording = false;
    this.siriWave.stop();
    this.mediaStream.stop();
    this.input.disconnect(0);
    this.filter.disconnect(0);
    cameraPreview.src = '';
    // cameraPreview.stop()
    this.captureCanvasImage();
    this.startOffset = 0; // += context.currentTime - this.startTime
    console.log('stopped at', context.currentTime);
  } catch (e) {}

  this.startOffset = 0;
  this.isLive = false;
};

WebVoiceMail.prototype.disconnect = function () {
  this.stop();
  this.input.disconnect(0);
  this.startOffset = 0;
};

WebVoiceMail.prototype.onEnded = function () {
  // alert()
  // this.captureCanvasImage()

  clearInterval(_clearInterval);
  endRecording();
};
var time = 0;
WebVoiceMail.prototype.draw = function (timestamp) {
  this.analyser.smoothingTimeConstant = SMOOTHING;
  this.analyser.fftSize = FFT_SIZE / 4;

  // Get the frequency data from the currently live stream
  this.analyser.getByteFrequencyData(this.freqs);
  this.analyser.getByteTimeDomainData(this.times);

  var width = Math.floor(1 / this.freqs.length, 10);
  // var width = Math.floor(1 / this.freqs.length, 10)

  // var canvas = document.querySelector('canvas')
  var drawContext = this.canvas.getContext('2d');

  this.canvas.width = WIDTH;
  this.canvas.height = HEIGHT;
  // Draw the frequency domain chart.
  var t = 0;

  for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
    var value = this.freqs[i];
    var percent = value / 256;
    // var height = value * (value * percent)
    var height = HEIGHT * percent;
    var offset = HEIGHT - height - 1;
    var barWidth = WIDTH / this.analyser.frequencyBinCount;
    // var barWidth = this.freqs.length / this.analyser.frequencyBinCount
    var hue = i / this.analyser.frequencyBinCount * 360;
    drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
    if (!this.recording) {
      drawContext.fillRect(i * barWidth * 1, offset * 0.5, 1.5, height / 2 > 0 ? height / 2 : 1);
    } else {
      drawContext.fillRect(i * barWidth * 1, offset, 1.5, 1);
    }
    t += value; // (height / 2) > 0 ? (height / 2) : 1
  }
  this.sampleBuffer[i] += this.getFrequencyValue(t / this.analyser.frequencyBinCount);
  // this.sampleBuffer[i] = this.getFrequencyValue(t / this.analyser.frequencyBinCount)
  // this.index++
  // Draw the time domain chart.
  for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
    var value = this.sampleBuffer[i] / 2;
    var percent = value / 256;
    var height = HEIGHT * percent;
    var offset = HEIGHT - height - 1;
    var barWidth = WIDTH / this.analyser.frequencyBinCount;
    // drawContext.fillStyle = 'rgba(233,233,233,0.5)'
    // var hue = i / this.sampleBuffer.length * 360
    var hue = i / this.analyser.frequencyBinCount * 360;

    drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
    drawContext.fillRect(i * (this.canvas.width / 100), HEIGHT - height, 2, height > 0 ? height : 1);
    // drawContext.fillRect(i * (this.canvas.width / 100), HEIGHT - value, 2, this.sampleBuffer[i] > 2 ? (this.sampleBuffer[i]) : 2)
    // drawContext.fillRect(i * barWidth, offset, barWidth, 2)
    // drawContext.fillRect(i * barWidth, offset, barWidth, height)
    //
  }

  // this.sampleBuffer.push()
  if (this.isLive) {
    requestAnimationFrame(this.draw.bind(this));
  }
};

WebVoiceMail.prototype.getFrequencyValue = function (freq) {
  var nyquist = context.sampleRate / 2;
  var index = Math.round(freq / nyquist * this.freqs.length);
  return this.freqs[index];
};

VisualizerSample.prototype.monitorTime = function () {
  console.log('context time: %s, buffer duration', context.currentTime, this.buffer.duration);

  requestAnimationFrame(this.time.bind(this));
};

WebVoiceMail.prototype.sample = function (time) {

  var freqs = new Uint8Array(this.analyser.frequencyBinCount);
  var times = new Uint8Array(this.analyser.frequencyBinCount);
  var t = 0;
  for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
    var value = freqs[i];
    // value = this.getFrequencyValue(value)//[i]
    var percent = value / 256;
    var height = HEIGHT * percent;
    // var offset = HEIGHT - height - 1
    // var barWidth = WIDTH / this.analyser.frequencyBinCount
    // // var barWidth = this.freqs.length / this.analyser.frequencyBinCount
    // var hue = i / this.analyser.frequencyBinCount * 360
    // drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)'
    // drawContext.fillRect((i * barWidth) * 1.5, offset * 0.5, 2, (height + 0.25))
    t += height;
  }
  this.sampleBuffer[time] = this.getFrequencyValue(t / this.analyser.frequencyBinCount);
  this.index++;
  // var sampleRate = context.sampleRate
  // var index = Math.round(freq / sampleRate * this.freqs.length)
  // return this.freqs[index]
};

WebVoiceMail.prototype.onError = function onStreamError(e) {
  console.error(e);
};
var image;
WebVoiceMail.prototype.captureCanvasImage = function () {
  // this.canvas
  image = this.canvas.toDataURL('image/png');
  $('#snapshot').prop('src', image);
};

function VisualizerSample(config, cb) {
  this.analyser = context.createAnalyser();

  this.analyser.connect(context.destination);
  this.analyser.minDecibels = config.minDecibels || -140;
  this.analyser.maxDecibels = config.maxDecibels || 0;
  loadSounds(this, {
    buffer: config.source
  }, onLoaded);
  this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
  this.times = new Uint8Array(this.analyser.frequencyBinCount);

  function onLoaded() {
    // var button = document.querySelector('button')
    // button.removeAttribute('disabled')
    $('#playback-click').text('Play/pause');
    $('#playback-click').prop('disabled', false);

    return cb();
  }

  this.isPlaying = false;
  this.startTime = 0;
  this.startOffset = 0;
  this.index = 0;
  this.canvas = config.canvas;
}

// Toggle playback
VisualizerSample.prototype.togglePlayback = function () {
  this.play();
};

VisualizerSample.prototype.play = function () {
  // $('#rerecord').prop('disabled', true)
  this.stop();

  this.startTime = context.currentTime;
  console.log('started at', this.startOffset);
  this.source = context.createBufferSource();
  // Connect graph
  this.source.onEnded = this.onEnded;
  this.source.connect(this.analyser);
  this.source.buffer = this.buffer;
  this.source.loop = false;
  // Start playback, but make sure we stay in bound of the buffer.
  this.source[this.source.start ? 'start' : 'noteOn'](0, this.startOffset % this.buffer.duration);
  console.log('duration: ', this.buffer.duration);
  // Start visualizer.
  this.isPlaying = true;
  this.draw();
  this.time();
};

VisualizerSample.prototype.time = function () {
  console.log('context time: %s, buffer duration', context.currentTime, this.buffer.duration);

  requestAnimationFrame(this.time.bind(this));
};

VisualizerSample.prototype.stop = function () {
  //   if (this.isPlaying) {
  try {
    this.source[this.source.stop ? 'stop' : 'noteOff'](0);
    this.startOffset += context.currentTime - this.startTime;
    console.log('paused at', this.startOffset);
  } catch (e) {}
  //   }
  this.startOffset = 0;
  this.isPlaying = false;
};

VisualizerSample.prototype.disconnect = function () {
  this.stop();
  this.source.disconnect(0);
  this.startOffset = 0;
};

VisualizerSample.prototype.onEnded = function () {
  console.log('stopping...');
  this.stop();
  // $('#rerecord').prop('disabled', false)
  alert('done');
};

VisualizerSample.prototype.draw = function () {
  this.analyser.smoothingTimeConstant = 0.8;
  this.analyser.fftSize = FFT_SIZE / 4;

  // Get the frequency data from the currently live stream
  this.analyser.getByteFrequencyData(this.freqs);
  this.analyser.getByteTimeDomainData(this.times);

  var width = Math.floor(1 / this.freqs.length, 10);
  // var width = Math.floor(1 / this.freqs.length, 10)

  // var canvas = document.querySelector('canvas')
  var drawContext = this.canvas.getContext('2d');

  this.canvas.width = WIDTH * 1.5;
  this.canvas.height = HEIGHT;
  // Draw the frequency domain chart.
  for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
    var value = this.freqs[i];
    // value = this.getFrequencyValue(value);//[i]

    var percent = value / 256;
    var height = HEIGHT * percent;
    var offset = HEIGHT - height - 1;
    var barWidth = WIDTH / this.analyser.frequencyBinCount;
    // var barWidth = this.freqs.length / this.analyser.frequencyBinCount
    var hue = i / this.analyser.frequencyBinCount * 360;
    drawContext.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
    drawContext.fillRect(i * barWidth * 1.5, offset * 0.5, 2, height + 0.25);
  }

  // if (this.isPlaying) {
  requestAnimationFrame(this.draw.bind(this));
  // }
};
VisualizerSample.prototype.getFrequencyValue = function (freq) {
  var nyquist = context.sampleRate / 2;
  var index = Math.round(freq / nyquist * this.freqs.length);
  return this.freqs[index];
};

if (false /* for Microsoft Edge */) {
    //            cameraPreview.parentNode.innerHTML = '<audio id="camera-preview" controls style="border: 1px solid rgb(15, 158, 238); width: 94%;"></audio> '
  }

function initAudio() {
  startRecording.disabled = false;
  stopRecording.disabled = true;
  playButton.disabled = true;
  deleteRecordingButton.disabled = true;

  if (sample) {
    sample.disconnect();
  }

  navigator.getUserMedia({
    audio: true,
    video: false
  }, function (stream) {
    mediaStream = stream;
    liveSample = new WebVoiceMail({ type: 'live-audio', source: stream, canvas: liveAudioCanvas });
    liveSample.draw();
  }, function (error) {
    alert(JSON.stringify(error));
  });
  cameraPreview.onEnded = function () {
    alert('done');
  };
}

startRecording.onclick = function () {
  // initAudio()
  startRecording.disabled = true;
  playButton.disabled = true;
  deleteRecordingButton.disabled = true;
  $('.status.on').text('Recording....').addClass('recording');
  liveSample.recording = true;

  recordAudio = RecordRTC(liveSample.mediaStream, {
    type: 'audio',
    recorderType: StereoAudioRecorder,
    onAudioProcessStarted: function onAudioProcessStarted() {
      // recordVideo.startRecording()
      cameraPreview.src = window.URL.createObjectURL(mediaStream);
      cameraPreview.play();
      cameraPreview.muted = true;
      cameraPreview.controls = false;
      showProgress();
      // _clearInterval = setInterval(showProgress, 1000)
    }
  });
  // }
  recordAudio.setRecordingDuration(45000, liveSample.onEnded);
  recordAudio.startRecording();
  currentTime = recordAudio.recordingDuration;
  stopRecording.disabled = false;
};
var duration = 45;
var start = null;
var imageCaptured = false;
function showProgress(timestamp) {
  if (!start) {
    start = Date.now();
    liveSample.sample(0);
  }
  // console.log()
  var diff = Date.now() - start;
  var current = Math.floor(diff) / 500 >> 0;

  liveSample.sample(current);
  if (current !== time) {
    time = current;
    // console.log(time, timestamp)
    $('.time-remaining').text(duration - time + ' seconds');
  }

  if (time > duration / 2 && !imageCaptured) {}
  // liveSample.captureCanvasImage()
  // imageCaptured = true

  // duration--
  // time += timestamp

  requestAnimationFrame(showProgress);
}

stopRecording.onclick = function () {
  endRecording();
};

playButton.onclick = function () {
  sample.togglePlayback();
};
var recordingKey = null;
var fileName = null;
deleteRecordingButton.onclick = function () {
  // $('#start-recording').trigger('click')
  // sample.togglePlayback()
  // sample.startOffset = sample.buffer.duration / 2
  // sample.play()
  // initAudio()
  $.ajax({
    // method: 'POST',
    method: 'DELETE',
    url: '/voice-mail/' + recordingKey,
    data: { key: recordingKey, fileName: fileName }
  }).done(function (msg) {
    window.location.href = window.location.href;
  });
  // $.ajax({method:'POST',})
};

socketio.on('merged', function (payload) {
  var _fileName = payload.fileName;
  var key = payload.key;
  var href = location.href.split('/').pop().length ? location.href.replace(location.href.split('/').pop(), '') : location.href;
  href = href + 'uploads/' + _fileName;
  console.log('got file ' + href);
  sample = new VisualizerSample({ source: href, canvas: liveAudioCanvas }, function () {
    startRecording.disabled = true;
    playButton.disabled = false;
    deleteRecordingButton.disabled = false;
    recordingKey = key;
    fileName = _fileName;
    console.log(key, fileName);
    // $('#delete-upload-btn').data('recording-key', key)
  });
});

socketio.on('ffmpeg-output', function (result) {
  if (parseInt(result) >= 100) {
    progressBar.parentNode.style.display = 'none';
    return;
  }
  progressBar.parentNode.style.display = 'block';
  progressBar.value = result;
  //   percentage.innerHTML = 'Ffmpeg Progress ' + result + '%'
});
socketio.on('ffmpeg-error', function (error) {
  alert(error);
});

function endRecording() {
  if (!liveSample.isLive) {
    console.log('Recording stopped.');
    return;
  }
  // liveSample.captureCanvasImage()
  $('.status.on.recording').text('Recording stopped').removeClass('recording');
  startRecording.disabled = false;
  stopRecording.disabled = true;
  // cameraPreview.stop()
  cameraPreview.poster = 'ajax-loader.gif';
  liveSample.stop();

  recordAudio.stopRecording(function () {
    // get audio data-URL
    recordAudio.getDataURL(function (audioDataURL) {
      var files = {
        audio: {
          type: recordAudio.getBlob().type || 'audio/wav',
          dataURL: audioDataURL,
          image: image,
          email: 'epmiller8464@gmail.com',
          waveForm: liveSample.sampleBuffer
        }
      };
      socketio.emit('message', files);
      // if (mediaStream)
      //   mediaStream.stop()
      cameraPreview.src = '';
    });
  });
}
//# sourceMappingURL=Audio-Bundle.js.map