const interval = require('../interval.js');
const config = require('../config.js');
const axios = require('axios');

module.exports = {
    async respon(client) {
        client.on('messageCreate', async (message) => {
            if (message.author.id === config.owoId && message.channel.id === config.channelId) {

                const Captcha = [
                    `**⚠️ |** <@${client.user.id}>,`,
                    `**⚠️ |** ${client.user.username},`,
                ];

                if (Captcha.some(captcha => message.content.includes(captcha))) {
                    auto_solver();
                }
            }
        });
    }
}

async function auto_solver() {
    interval.stopping();
    
    await new Promise(res => setTimeout(res, 5000));
    
    try {
        const solution = await solvehcap();
        const solve = await axios.post('https://owobot.com/api/captcha/verify', {
            token: solution
        }, {
            headers: {
                Cookie: config.cookie
            }});

        if (solve.status === 200) {
            console.log('🟢 success verify');
        } else {
            console.log('🔴 invalid verify');
        }
    } catch (err) {
        console.clear();
        console.error(err.message);;
    }
}

async function solvehcap() {
    console.clear();
    
    const options = {
        method: 'GET',
        url: 'https://v1.captchaly.com/hcaptcha?url=https://owobot.com&sitekey=a6a1d5ce-612d-472d-8e37-7601408fbc09',
        headers: {
            Authorization: 'Bearer CP_95bmwPTRmYpTU42F6zxTr1Zzh221qLRmM44jQ4meYbp4'
        }
    };
    
    while (true) {
        await new Promise(res => setTimeout(res, 2000));
        
        const { data } = await axios.request(options);
        
        if (data.token) {
            return data.token;
        } else {
            await new Promise(res => setTimeout(res, 30000));
            return solvehcap();
        }
    }
}