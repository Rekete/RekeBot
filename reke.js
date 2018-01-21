import * as Discord from 'discord.js';
import * as commands from './commands/commands';

const client = new Discord.Client();

client.on('message', message => {
    commands.execute(client, message);
});

client.login(process.env.BOT_TOKEN);
