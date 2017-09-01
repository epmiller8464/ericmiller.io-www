'use strict';

var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// const {MessagingResponse, VoiceResponse} = require('twilio').Re

function fetchCalls() {
  //  client.recordings.each(recording => console.log(recording.duration));
  var calls = [];
  client.calls.each(function (call) {
    var rt = fetchTranscribedRecordings(call.sid);
    calls.push(rt);
  });
  return calls;
}

function fetchIncomingCall(cid, cb) {
  var call = {
    call: {},
    from: '',
    recordings: []
  };
  client.api.calls(cid).fetch().then(function (c) {

    return cb({
      call: c,
      rtcs: fetchTranscribedRecordings(c.sid)
    });
  });
  // .then((c)=>{
  //   c.recordings.each(r=> r.transcriptions.each(t=>)
  // })
  // client.calls('CA062ccb1bbd7ffc5799f79bf46eef06f0').fetch()
  // .then((c) => {
  //   call.call = c
  // })
  //
  // client
  // .calls(cid)
  // .fetch()
  // .then(call => console.log(call.to))
  // client.calls.get(cid).each((call) => {
  //   let rt = fetchTranscribedRecordings(call.sid)
  //   calls.push(rt)
  // })
  // return calls
}

function fetchTranscribedRecordings(cid) {
  var transcribe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var cb = arguments[2];

  // client.recordings.each(recording => console.log(recording.duration));
  // client.calls(cid).recordings.each(recording => recording.transcriptions().get()))
  var x = [];
  client.api.calls(cid).recordings.page(function (page) {
    var r = {};
    var ts = [];
    // recording.transcriptions.each(t => ts.push(t.transcriptionText))
    return cb(page.instances);
  });
  // let map = {
  //   cid: cid,
  //   from: '',
  //   recordings: []
  // }
  //
  // client.recordings.each({callSid: cid}, (r) => {
  //   let n = {rid: r.sid, duration: r.duration, uri: r.uri, transcriptions: []}
  //   if (transcribe)
  //     r.transcriptions.each(t => n.transcriptions.push({sid: t.sid, uri: t.uri, text: t.transcriptionText}))
  //   map.recordings.push(n)
  // })
  //
  // return map
}

function onboardNewCallData(callLog) {}

function notifyMe(to, from) {}

function notifyServer(to, from) {}

function pushNotify() {}

function updateCallLog() {}

module.exports = {
  onboardNewCallData: onboardNewCallData,
  fetchCall: fetchCall,
  fetchCalls: fetchCalls,
  fetchTranscribedRecordings: fetchTranscribedRecordings,
  notifyMe: notifyMe,
  notifyServer: notifyServer,
  pushNotify: pushNotify,
  updateCallLog: updateCallLog
};
//# sourceMappingURL=voice-service.js.map