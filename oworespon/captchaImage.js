const interval = require('../interval.js');
const config = require('../config.js');
const axios = require('axios');

module.exports = {
    async respon(client) {
        client.on('messageCreate', async (message) => {
            if (message.author.id !== config.owoId && message.channel.id !== config.channelId) return;

            const Captcha = [
                `**⚠️ | <@${client.user.id}>**, Beep Boop.`,
                `**⚠️ | ${client.user.username}**, Beep Boop.`,
            ];

            if (Captcha.some(captcha => message.content.includes(captcha))) {
                solver(client, message.attachments.first().url);
            }
        });
    }
}

async function solver(client, image) {
    interval.stopping();

    const response = await axios.get(image,
        {
            responseType: 'arraybuffer'
        });

    const base64Data = Buffer.from(response.data).toString('base64');

    const postData = {
        userid: 'elsran',
        apikey: 'nCjjtQRFS1aOJhq5Lzy0',
        data: base64Data,
        mode: 'auto',
        numeric: false,
        len_str: 6
    };

    const solvedtxt = await axios.post('https://api.apitruecaptcha.org/one/gettext',
        postData,
        {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.data.result);

    if (solvedtxt) {
        const replacetxt = replace(solvedtxt);
        setTimeout(() => client.users.send(config.owoId, replacetxt), Math.floor(Math.random() * (7000 - 5000 + 1) + 7000));
    }
        
}

function replace(text) {
    return text
    .toLowerCase()
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/2/g, 'z')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/6/g, 'g')
    .replace(/7/g, 't')
    .replace(/8/g, 'b')
    .replace(/9/g, 'q')
}
