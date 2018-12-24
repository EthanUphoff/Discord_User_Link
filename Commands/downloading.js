const fs = require('fs')
const ytdl = require('ytdl-core')
var ffmpeg = require('fluent-ffmpeg')

module.exports = {
  dl: function (str, id, msg) {
    dl(str, id, msg)
  }
}

// Downloads a youtube video and converts it to mp3 with an audio bitrate of 96
// to lower the overall file size. If it finds the file to be too large it will
// send a message to channel the request was sent in saying that the file
// was too large. Once it's done sending the file or sending the message it
// deletes the file accordingly.
function dl (str, id, msg) {
  ffmpeg(ytdl(str))
    .audioBitrate(96)
    .save(id + '.mp3')
    .on('end', () => {
      msg.channel.send({
        files: ['./' + id + '.mp3']
      })
        .then(
          setTimeout(function () {
            deleting(id)
          }, 10))
        .catch(err => {
          if (err.message === 'Request entity too large') {
            msg.channel.send('File size was too large, try a shorter youtube video.')
          }
        })
    })
}

// Deletes the file created by the users request
function deleting (id) {
  fs.unlink(id + '.mp3', (err) => {
    if (err) {
      console.log(err)
    }
  })
}
