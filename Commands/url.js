module.exports = {
  urlstuff: function (msg, items) {
    urlstuff(msg, items)
  }
}

// Sends an embedded message to the channel the message was initially sent in
// which contains the link to the requested user profile
function urlstuff (msg, items) {
  msg.channel.send({ embed: {
    color: Math.floor(Math.random() * 16777214) + 1,
    author: {
      name: items.username,
      icon_url: items.avatarURL
    },
    title: 'https://discordapp.com/users/' + items.id,
    url: 'https://discordapp.com/users/' + items.id
  }
  })
}
