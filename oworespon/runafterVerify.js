const interval = require('../interval.js');
const config = require('../config.js');

module.exports = {
    async respon(client) {
        client.on('messageCreate', async (message) => {
            if (message.author.id === config.owoId && message.channel.type === 'DM' && message.content.includes('Thank')) {
                setTimeout(() => return interval.running(client), Math.floor(Math.random() * (15000 - 13000 + 1) + 15000));
            }
        });
    }
}
