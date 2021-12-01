const token = require('./../token.json')
const { Client, MessageEmbed  } = require('discord.js');
const PREFIX = "ch";

const bot = new Client();

console.log(token.token);
bot.on("ready", () => {

    console.log(`Logging In: ${bot.user.tag}`);
    console.log("**************");
    console.log(`Your bot is up to: ${bot.user.presence }`);
})

 bot.on('message', (message) => {
    console.log(`${message.author.tag} sent ${message.content}`);
    if(message.content == "Fuck" || message.content == "fuck" || message.content == "nigga" || message.content == "Nigga") {
       message.delete();
        message.reply(` Woah, watch it there your swearing! `)
        


    }

    
    

    if(message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        console.log(CMD_NAME);
        console.log(args);
        
        if(args[0] === "serverInfo") {
            message.reply("Hi, you asked for it please check #about")
        }
        if(args[0] === "kick"){
            if(!message.member.hasPermission('KICK_MEMBERS')) message.reply("No permissions sorry")
            if(args.length === 1){ message.reply("Specify a user please!")}
           const member = message.guild.members.cache.get(args[1]);
           console.log(member)
           if(member) {
               member.kick().then((member) => message.channel.send(`${member} was kicked`)).catch((err) => message.channel.send('I do not have permission'))
           }else {
               message.channel.send("That member already left/kicked/banned")
           }
        }else if(args[0] === "ban") {
            if(!message.member.hasPermission("BAN_MEMBERS")) {
                message.reply("You do not have permission")
            }
            if(args.length === 1) {
                message.reply("Specify a user ID")
            }
            try {
                const user = message.guild.members.ban(args[1]);
                console.log(user)
                message.channel.send(`That user is banned`)
            } catch (err) {
                message.channel.send(err)
                console.log(err);
                
            }
        }
    }
    

})

bot.login(token.token);

