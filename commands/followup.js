const config = require('../config.js');

module.exports = {
    async command(client) {
        client.on('messageCreate', async (message) => {
            if (message.author.id === client.user.id && message.content.toLowerCase() === 'uwu') {
                followup(message);
            }
        });
    }
}

async function followup(message) {
    try {
        await message.channel.sendTyping();
        message.channel.sendSlash(config.owoId, 'battle').catch(() => message.channel.send('wb'));
        
        await timesleep(1000, 2000);

        await message.channel.sendTyping();
        message.channel.sendSlash(config.owoId, 'hunt').catch(() => message.channel.send('wh'));
    } catch {
        return;
    }
}

const timesleep = (min, max) => {
    return new Promise(res => setTimeout(res, Math.floor(Math.random() * (max - min + 1) + max)));
}