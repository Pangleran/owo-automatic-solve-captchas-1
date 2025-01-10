const config = require('../config.js');
const interval = require('../interval.js');

module.exports = {
    async respon(client) {
        client.on('messageCreate', async (message) => {
            if (!message.author.bot && message.channel.id === config.channelId && message.content.includes(`<@${client.user.id}>`)) {
                interval.stopping();
                config.channelId = '-';
            }
        });
    }
}
