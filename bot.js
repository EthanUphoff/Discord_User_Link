const Discord = require('discord.js')
const bot = new Discord.Client()

var prefix = "url?"

bot.login('')

bot.on('ready', function(){
  console.log('The bot is online!')
  bot.user.setActivity(`url\?help`)
})

bot.on('message', function(msg) {
  if(msg.content == 'What is my url?'){
    urlstuff(msg, msg.author)
  } else if(msg.content.startsWith(prefix)){
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    if(command == 'help'){
      msg.channel.send('You can either type ``What is my url?`` or ``url?<mentions>``');
    } else if(command == ''){
      msg.channel.send('Must include a mention.')
    } else if (msg.mentions.users.size < 1) {
      msg.channel.send('No mentions found, make sure you are actually mentioning someone.');
    } else {
      var dismentions = msg.mentions.users
      dismentions.forEach(function(item, index, array){
          urlstuff(msg, item);
      })
    }
  }
})

function urlstuff(msg, items){
  msg.channel.send({embed: {
    color: Math.floor(Math.random() * 16777214) + 1,
    author: {
      name: items.username,
      icon_url: items.avatarURL
    },
    title: 'https://discordapp.com/users/' + items.id,
    url: 'https://discordapp.com/users/' + items.id
  }})
}
