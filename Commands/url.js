module.exports = {
  urlstuff: function (msg, items) {
    urlstuff(msg, items)
  }
}

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
