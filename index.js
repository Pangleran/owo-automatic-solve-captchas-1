console.clear();
require('dotenv').config();

const Discord = require('discord.js-selfbot-v13');
const axios = require('axios');
const fs = require('fs');

const config = require('./config.js');

const client = new Discord.Client({ checkUpdate: false });

fs.readdirSync('./commands')
.filter(file => file.endsWith('.js'))
.forEach(file => require(`./commands/${file}`).command(client));

fs.readdirSync('./oworespon')
.filter(file => file.endsWith('.js'))
.forEach(file => require(`./oworespon/${file}`).respon(client));

client.login(process.env.token).then(() => {
    console.log(client.user.tag);
    require('./error/processError.js').loadError(client);
}).catch((err) => {
    console.clear();
    console.error(err.message);
});
