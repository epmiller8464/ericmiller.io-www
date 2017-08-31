'use strict';

var API_URL = 'https://api.twilio.com/2010-04-01';

var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);
// const {MessagingResponse, VoiceResponse} = require('twilio').Re
client.recordings.each(function (recording) {
  return console.log(recording.duration);
});

var promise = client.api.v2010.accounts(accountSid).recordings.each();
// .fetch()
// promise.then(response => {
//   console.log(response)
// })


function fetchRecordings() {}
//# sourceMappingURL=twilioClient.js.map