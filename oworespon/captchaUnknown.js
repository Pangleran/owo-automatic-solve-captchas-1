const interval = require('../interval.js');
const config = require('../config.js');

module.exports = {
    async respon(client) {
        client.on('messageCreate', async (message) => {
            if (message.author.id === config.owoId && message.content.includes(`**🚫 | ${client.user.id}**,`)) {
                return interval.stopping();
            }
        });
    }
}
