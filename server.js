//Consts
const CONSTS = require('./utils/consts.js');
const db = require('./utils/localstorage/db.js');
const request = require('./utils/network/request.js');
//Telegraf
const Telegraf = require('telegraf');
const bot = new Telegraf(CONSTS.BOT_API);
//Express
const express = require('express');
const bodyParser   = require('body-parser');
const app = express();

//START
bot.start(async (ctx) => {
    console.log('started:', ctx.from.id);
    return ctx.replyWithMarkdown(CONSTS.WELCOME_T);
})

bot.on('new_chat_members', async (ctx) => {
    ctx.replyWithMarkdown(CONSTS.WELCOME_T);
})

//MAIN
bot.hears(CONSTS.MAIN_RE, async (ctx) => {
    let m = ctx.message.text;
    let arr = m.match(CONSTS.MAIN_RE), i=0, reply='';
    const inf = await db.getItems(CONSTS.KEYS);

    for(;i<arr.length; i++) {
        reply += 'The *';
        let aed = arr[i].match(CONSTS.NUM_RE)[0];
        console.log(aed);
        reply += aed + 'AED* is *';
        let usd = aed*inf.rate;
        reply += usd.toFixed(2) + 'USD*\n';
    }
    let last = new Date();
    last.setTime(inf.date);
    console.log(last);
    reply += '\`Last update: ';
    reply += last + '\`';
    console.log(reply);
    ctx.replyWithMarkdown(reply); 
})


//WebHooks
app.get('/', (req,res) => res.send('Hello World!'));
app.use(bot.webhookCallback('/webHook'));
bot.telegram.setWebhook(CONSTS.WEBHOOK_URL);
const PORT = process.env.port || 3001;
app.listen(PORT, ()=> {
    console.log(`We are on ${PORT}`);
});

//CRON
const cron = require('node-cron');

cron.schedule('10 * * * *', () => update(), true);

async function update() {
    const rates = await request.get(CONSTS.RATE_URL);
    const forSave = {
        rate: 1/rates.rates.AED,
        date: Date.now()
    }
    console.log(forSave.date);
    await db.saveItems(forSave);
    console.log(`Saved: ${forSave}`);
}