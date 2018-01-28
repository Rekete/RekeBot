const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config/config.json");
const wifipiano2 = require('wifipiano2');
var randomColor = require('randomcolor'); 
var color = randomColor(); 

client.on('ready', () => {
    console.log('Estoy listooo yujuuu!');
});

client.on("ready", () => {
    client.user.setPresence({ game: { name: 'osu!', type: 0 } });
});

client.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}

});

client.on('message', message => {
    if (message.content === 'lenny') {
    	message.reply(' ( ͡° ͜ʖ ͡°)');
  	}

});

client.on('message', message => {
    if (message.content === 'reke') {
    	message.reply('WAT');
  	}

});

client.on("message", async message => {

  if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "di") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "kickeo") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "baneo") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purgar") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Por favor, di un numero de mensajes, entre 2 y 100, para borrar ( ͠° ͟ ͜ʖ ͡°)");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
    if(command === "pp") {
        
        try { 
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

    return message.reply(`**Stars:** ${stars} | **OD:** ${od} | **Objectos:** ${objectCount} | **PP:** ${(Math.floor(pp * 100) / 100))}`);

} catch (err) {
        console.log(err);
    }}
    
    if(command === "osu") {
        
    try {
        if (args.length == 0) return await message.reply("Por favor, especifica un nombre de usuario de osu! ( ◔ ʖ̯ ◔ )");

        const username = args.join("%20");

        const channel = await client.channels.get(message.channel.id);
        const hex = randomColor().replace("#", "");
        return message.reply(`http://lemmmy.pw/osusig/sig.php?colour=hex${hex}&uname=${username}&mode=3&pp=1&countryrank`);

    } catch (err) {
        console.log(err);
    }}
    
    if(command === "ripple") {
        
    try {
        if (args.length == 0) return await message.reply("Por favor, especifica un nombre de usuario de ripple! ლ( ͡° ͜ʖ ͡°ლ)");

        const username = args.join("%20");

        const channel = await client.channels.get(message.channel.id);
        const hex = randomColor().replace("#", "");
        return message.reply(`http://sig.ripple.moe/sig.php?colour=hex${hex}&uname=${username}&mode=3&pp=0&countryrank`);

    } catch (err) {
        console.log(err);
    }}
       if(command === "mapa") {
        
        try { 
            if (args.length < 3) return message.reply("Mapa no encontrado ! WTF! fking normie, dime un titulo, artista y fuente para buscar ejemplo *-mapa osu peppy tutorial*");

    let title = args[0];
    let artist = args[1];
    let source = args[2];
          
    return message.reply(`http://osusearch.com/search/?title=${title}&artist=${artist}&source=${source}&modes=Mania`);

    } catch (err) {
        console.log(err);
    }}
});
// 
client.login(process.env.BOT_TOKEN);
