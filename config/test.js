'use strict'
// test specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  db: {
    mongoDbUri: process.env.MONGODB_URI
  },
  audio_bucket: process.env.AWS_AUDIO_BUCKET

}
