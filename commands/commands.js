import * as config from '../config/config.json';

import { ripple } from './ripple';
import { osu } from './osu';
import { checkMap } from './map';
import { pp } from './pp';

export async function execute(client, message) {
    try {
        if (message.author.bot) return;
        if (!message.content.startsWith(config.commandPrefix)) return;
        if (!message.guild) return await message.reply("No acepto privados, no me molestes D: habla en un canal general");

        const command = message.content.split(" ")[0].slice(config.commandPrefix.length);
        const args = message.content.split(" ").slice(1);

        switch (command) {
            case 'ripple':
                console.log(`[VIBE - COMMANDS] User ${message.author} executed command: ${command}`);
                return await ripple(client, message, args);
            case 'osu':
                console.log(`[VIBE - COMMANDS] User ${message.author} executed command: ${command}`);
                return await osu(client, message, args);
            case 'map':
                console.log(`[VIBE - COMMANDS] User ${message.author} executed command: ${command}`);
                return await checkMap(client, message, args);
            case 'pp':
                console.log(`[VIBE - COMMANDS] User ${message.author} executed command: ${command}`);
                return await pp(client, message, args);
        }

    } catch (err) {
        console.log(err);
    }
}