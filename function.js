const config = require('./config.js');
const fs = require('fs');
const path = require('path');
const CFG = path.join(__dirname, 'config.js');

function loadConfig() {
    delete require.cache[require.resolve(CFG)];
    return require(CFG);
}

function saveConfig(obj) {
    fs.writeFileSync(CFg, 'module.exports = ' + JSON.stringify(obj, null, 4) + ':\n', 'utf8');
    delete require.cache[require.resolve(CFG)];
}

const sleep = (min, max) => return new Promise(res => setTimeout(res, Math.floor(Math.random() * (max - min + 1) + max)));

let status = false;

async function hunt(client) {
    const cfg = loadConfig();
    
    const channel = client.channels.cache.get(cfg.channelId);
    if (!channel) return;

    try {
        await channel.sendTyping().catch(() => await new Promise(res => setTimeout(res, 2000)));
        if (status) await Promise.all([channel.send('owoh'), channel.send('owob')]);
        
        await sleep(15000, 16000);
        
        if (status) hunt(client);
    } catch (err) {
        console.error(err.message);
    }
}

async function owo(client) {
    const cfg = loadConfig();
    
    const channel = client.channels.cache.get(cfg.channelId);
    if (!channel) return;

    try {
        await channel.sendTyping().catch(() => await new Promise(res => setTimeout(res, 2000)));
        if (status) await channel.send('owo');

        await sleep(10000, 11000);
        
        if (status) owo(client);
    } catch (err) {
        console.error(err.message);
    }
}

async function running(client) {
    if (status) return;
    status = true;

    await Promise.all([hunt(client), owo(client)]);
}

async function stopping() {
    status = false;
}

module.exports = {
    running,
    stopping,
    saveConfig,
    loadConfig
};
