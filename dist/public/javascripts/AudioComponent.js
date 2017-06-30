'use strict';

var AudioComponent = function AudioComponent(options) {
  var self = this;
  //            EventEmitter.call(self)
  self._config = options;
  self._src = [];
  self._el = options.el;
  self._recordingKey = options.recordingKey;
  self._waveform = options.waveform;
  self._emitter = new EventEmitter();
  self._player = {};
  self._controls = {
    $play: null,
    $pause: null,
    $stop: null,
    $delete: null,
    $status: null,
    $duration: null
  };
  self._clearAnimationFrame = null;
  self.init(options);
  return self;
};

AudioComponent.prototype = {
  init: function init(options) {
    var self = this;
    console.log('initialization');
    if (!options.howl.src || !_.isArray(options.howl.src) || !(_.isArray(options.howl.src) && options.howl.src.length)) {
      throw new Error('no src files found');
    }
    self._controls.$play = options.controls.$play;
    self._controls.$pause = options.controls.$pause;
    self._controls.$stop = options.controls.$stop;
    self._controls.$delete = options.controls.$delete;
    self._controls.$status = options.controls.$status;
    self._controls.$duration = options.controls.$duration;

    self._controls.$play.onclick = function () {
      self.playClick();
    };
    self._controls.$pause.onclick = function () {
      self.pauseClick();
    };
    self._controls.$stop.onclick = function () {
      self.stopClick();
    };
    self._controls.$delete.onclick = function () {
      self.deleteClick();
    };

    self._player = new Howl(options.howl);

    self._player.once('load', function () {
      self.onLoaded();
    });
    self._player.on('play', function () {
      self.onPlay();
    });
    self._player.on('pause', function () {
      self.onPause();
    });
    self._player.on('stop', function () {
      self.onStop();
    });
    self._player.on('loaderror', function () {
      self.onError();
    });
    self._player.on('end', function () {
      self.onEnd();
    });

    self.on('playing', self.onPlaying);
    //                $($(self._el).children('button.pause')[0]).click(self.pause)
    //                $($(self._el).children('button.stop')[0]).click(self.stop)
    self._controls.$play.disabled = false;
    // $($(self._el).find('.status')[0]).text('listo!')
  }
};

AudioComponent.prototype.playClick = function () {
  var self = this;
  console.log('play click');
  // console.log('loading')
  console.log(self._player.state());
  if (self._player.state() === 'loaded') {
    self._player.play();
  } else {
    self._controls.$status.textContent = 'Loading';
    self._player.load();
  }
};

AudioComponent.prototype.pauseClick = function () {
  var self = this;
  self._player.pause();
};

AudioComponent.prototype.stopClick = function () {
  var self = this;
  self._player.stop();
  self.destroy();
};

AudioComponent.prototype.deleteClick = function () {
  var self = this;
  self._player.stop();
  self._player.unload();
  // self.destroy()
  var recordingKey = self._recordingKey;
  console.log('deleting record: %s', recordingKey);
  $.ajax({
    method: 'DELETE',
    url: '/voice-mail/' + recordingKey,
    data: { key: recordingKey }
  }).done(function (response) {
    if (response.success) {
      self._controls.$status.innerHTML = response.message + '<br/> <b class="text-warning">The page will reload in a few seconds...</b>';
      setTimeout(function () {
        window.location.href = window.location.href;
      }, 3000);
    } else {
      console.log(response);
    }
  }).fail(function (e) {
    console.log(e);
  });
};

AudioComponent.prototype.onLoaded = function () {
  var self = this;
  // $($(self._el).find('.duration')[0]).text(self._player.duration() >> 0)
  // $(self._controls.$duration).text(self._player.duration() >> 0)
  self._controls.$duration.textContent = self._player.duration() >> 0;
  self._player.play();
};

AudioComponent.prototype.onPlay = function () {
  var self = this;
  self._controls.$play.disabled = true;
  self._controls.$pause.disabled = false;
  self._controls.$stop.disabled = false;
  // $($(self._el).find('.status')[0]).text('playing')
  self._controls.$status.textContent = 'Playing';
  // $(self._controls.$status).text('playing')
  self.emit('playing', self);
};

AudioComponent.prototype.onError = function () {
  console.error(arguments);
};

AudioComponent.prototype.onPause = function () {
  var self = this;
  self._controls.$play.disabled = false;
  self._controls.$pause.disabled = true;
  self._controls.$stop.disabled = true;
  self._controls.$status.textContent = 'Paused';
};

AudioComponent.prototype.onStop = function () {
  console.log('stopped!');
  var self = this;
  self._controls.$play.disabled = false;
  self._controls.$pause.disabled = true;
  self._controls.$stop.disabled = true;
  self._controls.$status.textContent = 'Stopped';
  self.reset();
  console.log('reset controls');
};

AudioComponent.prototype.onEnd = function () {
  console.log('Finished!');
  var self = this;
  self._controls.$status.textContent = 'Done';
  self._controls.$duration.textContent = self._player.duration() >> 0;
};

AudioComponent.prototype.progress = function () {
  var self = this;
};

AudioComponent.prototype.onPlaying = function (self) {
  // var self = this
  console.log('Playing');
  // self._clearAnimationFrame = setInterval(function () {self.animateWaveform()}, 500)
  self._clearAnimationFrame = window.requestAnimationFrame(function () {
    self.animateWaveform();
  });
};

AudioComponent.prototype.animateWaveform = function () {
  var self = this;
  $($(self._el).find('.duration')[0]).text(self._player.duration() - self._player.seek() >> 0);
  // console.log(self._player.duration() - (self._player.seek()))
  self._clearAnimationFrame = window.requestAnimationFrame(function () {
    self.animateWaveform();
  });
};

AudioComponent.prototype.destroy = function () {
  var self = this;
};

AudioComponent.prototype.reset = function () {
  var self = this;
  // clearInterval(self._clearAnimationFrame)
  window.cancelAnimationFrame(self._clearAnimationFrame);
};

AudioComponent.prototype.on = function (event, handler) {
  var self = this;
  return self._emitter.on(event, handler, true);
};

AudioComponent.prototype.off = function (event, handler) {
  var self = this;
  return self._emitter.off(event, handler, true);
};

AudioComponent.prototype.emit = function (event, payload) {
  var self = this;
  return self._emitter.emit(event, payload);
};
//# sourceMappingURL=AudioComponent.js.map