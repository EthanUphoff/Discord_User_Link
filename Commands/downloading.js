const fs = require('fs');
const ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg();

module.exports = {
  dl: function(str, id, msg){
    dl(str, id, msg);
  }
};

function dl(str, id, msg){
  ffmpeg(ytdl(str))
  .audioBitrate(96)
  .save(id + ".mp3")
  .on('end', () => {
    msg.channel.send({
      files: ["./" + msg.author.id + ".mp3"]
      })
    .then(
      setTimeout(function(){
        deleting(id);
      }, 2000))
    .catch(console.error);
  })
}

function down(str, id){
  ytdl(str).pipe(fs.createWriteStream(id + '.mp4'));
}

function modify(id){
  ffmpeg(id +'.mp4').noVideo().audioBitrate(96).save(id + ".mp3");
}

function sending(msg){
  msg.channel.send("Hewwo", {
    files: ["./" + msg.author.id + ".mp3"]
    })
  .then(console.log)
  .catch(console.error);
}

function deleting(id){
  fs.unlink(id + ".mp3", (err) => {
  });
  fs.unlink(id + ".mp4", (err) => {
  });
}
