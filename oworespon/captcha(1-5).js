const interval = require('../interval.js');
const config = require('../config.js');

module.exports = {
    async respon(client) {
        client.on('messageCreate', async (message) => {
            if (message.author.id !== config.owoId && message.channel.id !== config.channelId) return;

            const Captcha = [
                `⚠️ **|** <@${client.user.id}>!`,
                `⚠️ **|** ${client.user.username}!`,
            ];

            if (Captcha.some(captcha => message.content.includes(captcha))) {
                return interval.stopping();
            }
        });
    }
}
