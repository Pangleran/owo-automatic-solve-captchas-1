const config = require('./config.js');

let status = false;

async function hunt(client) {
    const channel = client.channels.cache.get(config.channelId);
    if (!channel) {
        status = false;
        return;
    }

    try {
        await channel.sendTyping();
        // await sleep(1000, 2000);
        
        if (status) { await channel.send('wh'); }
        
        await channel.sendTyping();
        // await sleep(1000, 2000);
        
        if (status) { await channel.send('wb'); }
        
        // await sleep(13500, 15000);
        await sleep(15000, 15500);
        
        if (status) { hunt(client); }
    } catch {
        status = false;
        return;
    }
}

async function owo(client) {
    const channel = client.channels.cache.get(config.channelId);
    if (!channel) {
        status = false;
        return;
    }

    try {
        await sleep(5000, 6000);
        
        if (status) { await channel.send('owo'); }
        
        await sleep(5000, 6000);
        
        if (status) { owo(client); }
    } catch {
        status = false;
        return;
    }
}

async function running(client) {
    if (status) return;
    status = true;

    await Promise.all([hunt(client), owo(client)]);
}

async function stopping() {
    if (!status) return;
    status = false;
}

const sleep = (min, max) => {
    return new Promise(res => setTimeout(res, Math.floor(Math.random() * (max - min + 1) + max)));
}

module.exports = {
    running,
    stopping
};