/**
 * Created by ghostmac on 6/2/16.
 */
var noop = function () {}

function PeerClient (opts) {
  var self = this
  self.channel = opts.channel || null
  self.username = opts.username || null
  self.socket = opts.socket
  self.id = self.socket.id
  self.broadcastConnection = null
  self.emitter = new EventEmitter()
  self.connected = false

  var connection
  self.socket.on('connect', function (s) {
    console.log('client connected')

    if (!self.connected) {
      console.log('conneted to server')
      self.joinOrCreateRoom()
    }
  })

  self.socket.on('join-broadcast', function (data) {
    console.log('join-broadcast %s', data)
  })
  self.socket.on('message', function (data) {
    console.log('>> %s', JSON.stringify(data))
    $('#messages').prepend('<li><p>' + data.username + '>> ' + data.data + '</p></li>')
  })

  self.socket.on('connect-error', function (e) {

    console.log('connect-error: %s', e)
    self.updateDisplay(SEM.connecterror)
  })

  self.socket.on('connect-timeout', function (e) {
    self.updateDisplay(SEM.connecttimeout)

    console.log('connection timeout %s', self.socket.id)
  })

  self.socket.on('reconnect', function (n) {
    self.reconnect()
    console.log('client %s reconnected to room %s - attempt(%s)', self.socket.id, self.socket.nsp, n)
  })

  self.socket.on('reconnecting', function (n) {
    self.updateDisplay(SEM.reconnecting)

    console.log('reconnecting : %s', n)
  })

  self.socket.on('reconnect-attempt', function (e) {
    self.updateDisplay(SEM.reconnectattempt)

    console.log('client %s attempting to reconnect to room %s', self.socket.id, self.socket.nsp)
  })

  self.socket.on('reconnect-error', function (e) {
    self.updateDisplay(SEM.reconnecterror)

    console.log('reconnect-error -> client %s failed to reconnect to room %s', self.socket.id, self.socket.nsp)
  })

  self.socket.on('reconnect-failed', function (e) {
    self.updateDisplay(SEM.reconnectfailed)

    console.log('reconnect-failed -> client %s attempting to reconnect to room %s ---> failed', self.socket.id, self.socket.nsp)
  })

  self.socket.on('disconnect', function (e) {
    self.disconnect()
  })

  self.socket.on('error', function (e) {
    console.log('socket error: %s', e)
    self.updateDisplay(SEM.error)
    self.connected = false
    if (e.toString() === 'Invalid namespace') {
      console.error('socket error: %s', e)
    }
  })
  return self
}

PeerClient.prototype.send = function (msg) {
  var self = this
  console.log('msg', msg)
  self.socket.emit('message', {username: self.username, data: msg})
}

PeerClient.prototype.joinOrCreateRoom = function () {
  var self = this

  self.socket.emit('join-broadcast', {channel: self.channel, id: self.id, username: self.username})
  self.updateDisplay(SEM.connect)

}
PeerClient.prototype.joinBroadcast = function () {
  var self = this
}

PeerClient.prototype.reconnect = function () {
  var self = this
  self.updateDisplay(SEM.reconnect)

}

PeerClient.prototype.disconnect = function () {
  var self = this
  
}

function userJoined (data) {
  var html = '<li class="list-group-item" style="font-size: 0.75em;">' +
    '    <h6 class="pull-left">' + data.username + '</h6>' +
    '    <span style="padding-top: 10px; padding-left: 10px;"' +
    '          class="glyphicon glyphicon-heart text-success"></span>' +
    '</li>'
  $('#peers').prepend(html)
}