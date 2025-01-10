const config = require('../config.js');

module.exports = {
    async respon(client) {
        client.on('messageCreate', async (message) => {
            if (message.author.id === config.owoId && message.content === `<@${client.user.id}>` && message.embeds.length > 0) {
                if (message.embeds[0].author.name.includes('challenges you to a duel!')) {
                    setTimeout(() => clickbutton(message), 5000);
                }
            }
        });
    }
}

async function clickbutton(message) {
    try {
        await message.clickButton({
            X: 0,
            Y: 0
        });
    } catch {
        return;
    }
}