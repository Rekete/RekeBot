const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}

});
import * as commands from './commands/commands';

const client = new Discord.Client();

client.on('message', (message) => {
    commands.execute(client, message);
});
// 
client.login(process.env.BOT_TOKEN);

    

