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

client.on('message', message => {
    if (message.content === 'reke') {
    	message.reply('WAT');
  	}

});
import * as wifipiano2 from 'wifipiano2';
import * as utils from '../utils/utils';

export async function pp(client, message, args) {
    if (args.length < 3) return message.reply("Por favor usa el formato `-pp (Numero de stars) (numero od) (numero de objetos)`");

    let stars = args[0];
    let od = args[1];
    let objectCount = args[2];

    let pp = wifipiano2.calculate({
            starRating: stars, 
            overallDifficulty: od, 
            objects: objectCount,
            mods: 'none',
            score: 1000000,
            accuracy: 100.00
        });    

    client.channels.get(message.channel.id)
        .sendMessage(`**Stars:** ${stars} | **OD:** ${od} | **Objectos:** ${utils.addCommas(objectCount)} | **PP:** ${utils.addCommas((Math.floor(pp * 100) / 100))}`);

}
// 
client.login(process.env.BOT_TOKEN);
