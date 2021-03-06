const Discord = require('discord.js')
const bot = new Discord.Client()
var info = require('./Commands/info.js')
var url = require('./Commands/url.js')

var prefix = "url?"

bot.login('')

bot.on('ready', function(){
    console.log('The bot is online!')
    bot.user.setActivity(`url\?help`)
})

bot.on('message', function(msg) {
    if(msg.content == 'What is my url?'){
        url.urlstuff(msg, msg.author)
    } else if(msg.content.startsWith(prefix)){
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift();

        if(command == 'help'){
            msg.channel.send('You can either type ``What is my url?`` or ``url?<mentions>`` \n For more information on a user, type ``url?info <mentions?>``');
        } else if(command == ''){
            msg.channel.send('Must include a mention.')
        } else if(command == 'info' && msg.guild != null && msg.guild.available){
            if(msg.mentions.users.size < 1){
                info.userinfo(msg, msg.author, msg.member);
            } else if(msg.mentions.users.size > 0){
                info.userinfo(msg, msg.mentions.users.first(), msg.mentions.members.first());
            }
        } else if(command == 'info' && (msg.channel.type == 'dm' || msg.channel.type == 'group')){
          if(msg.mentions.users.size < 1){
              info.userinfodm(msg, msg.author);
          } else if(msg.mentions.users.size > 0){
              info.userinfodm(msg, msg.mentions.users.first());
          }
        } else if (msg.mentions.users.size < 1) {
            msg.channel.send('No mentions found, make sure you are actually mentioning someone.');
        } else if (msg.mentions.users.size > 0){
            var dismentions = msg.mentions.users
            dismentions.forEach(function(item, index, array){
                url.urlstuff(msg, item);
            })
        }
    }
})
