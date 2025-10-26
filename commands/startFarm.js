const { running } = require('../function.js');
const config = require('../config.js');

module.exports = {
    async command(client) {
        client.on('messageCreate', async (message) => {
            if (message.author.id === client.user.id && message.content.toLowerCase() === config.cmdrun) {
                config.channelId = message.channel.id;
                running(client);
            }
        });
    }
}
