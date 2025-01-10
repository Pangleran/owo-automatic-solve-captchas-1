const interval = require('../interval.js');
const config = require('../config.js');

module.exports = {
    async command(client) {
        client.on('messageCreate', async (message) => {
            if (message.author.id === client.user.id && message.content.toLowerCase() === 'iwi') {
                config.channelId = message.channel.id;
                interval.running(client);
            }
        });
    }
}