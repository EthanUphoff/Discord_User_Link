const Discord = require('discord.js')
const bot = new Discord.Client()

var prefix = "url?"

bot.login('')

bot.on('ready', function(){
  console.log('The bot is online!')
  bot.user.setActivity(`on ${bot.guilds.size} servers`)
})

bot.on('message', function(msg) {
  if(msg.content == 'What is my url?'){
    msg.channel.send({embed: {
      color: Math.floor(Math.random() * 16777214) + 1,
      author: {
        name: msg.author.username,
        icon_url: msg.author.avatarURL
      },
      title: 'https://discordapp.com/users/' + msg.author.id,
      url: 'https://discordapp.com/users/' + msg.author.id
    }})
    return;
  }
  if(msg.content.startsWith(prefix)){
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    if(command == ''){
      msg.channel.send('Must include a mention.')
    } else if (msg.mentions.users.size < 1) {
      msg.channel.send('No mentions found, make sure you are actually mentioning someone.');
    } else {
      var dismentions = msg.mentions.users
      dismentions.forEach(function(item, index, array){
        msg.channel.send({embed: {
          color: Math.floor(Math.random() * 16777214) + 1,
          author: {
            name: item.username,
            icon_url: item.avatarURL
          },
          title: 'https://discordapp.com/users/' + item.id,
          url: 'https://discordapp.com/users/' + item.id
        }})
      })
    }
  }
})
