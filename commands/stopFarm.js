const { stopping } = require('../function.js');
const config = require('../config.js');

module.exports = {
    async command(client) {
        client.on('messageCreate', async (message) => {
            if (message.author.id === client.user.id && message.content.toLowerCase() === config.cmdstop) {
                cfg.channelId = null;
                cfg.status = false;
                await Promise.all([
                    saveConfig(cfg),
                    stopping();
                ]);
            }
        });
    }
}
