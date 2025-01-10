const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://v1.captchaly.com/account',
  headers: {
      Authorization: 'Bearer CP_95bmwPTRmYpTU42F6zxTr1Zzh221qLRmM44jQ4meYbp4'
  }
};

module.exports = {
    async command(client) {
        client.on('messageCreate', async (message) => {
            if (message.author.id === client.user.id && message.content.toLowerCase().startsWith('icaptchaly')) {
                try {
                    const { data } = await axios.request(options);
                    
                    await message.edit(`${data.email}\nbalance : $${data.balance}`);
                    return;
                } catch {
                    await message.edit('mungkin terjadi kesalahan');
                    return;
                }
            }
        });
    }
}