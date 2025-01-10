let connection;

module.exports = {
    async command(client) {
        client.on('messageCreate', async (message) => {
            if (message.author.id === client.user.id && message.content.toLowerCase().startsWith('xvoice')) {
                const channelId = message.content.split(' ')[1];
                if (!channelId) {
                    return;
                }

                await voice(client, channelId);
            }
            
            if (message.author.id === client.user.id && message.content.toLowerCase().startsWith('xdc')) {
                await connection.disconnect();
            }
        });
    }
}

async function voice(client, channelId) {
    const channel = await client.channels.cache.get(channelId);

    if (channel) {
        connection = await client.voice.joinChannel(channel, {
            selfMute: false,
            selfDeaf: false,
            selfVideo: false
        });
    }
}