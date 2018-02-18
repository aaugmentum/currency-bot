//Consts
const CONSTS = require('./consts.js');
//Telegraf
const Telegraf = require('telegraf');
const bot = new Telegraf(CONSTS.BOT_API);
//Express
const express = require('express');
const bodyParser   = require('body-parser');
const app = express();

//START
bot.start((ctx) => {
    console.log('started:', ctx.from.id);
    return ctx.replyWithMarkdown(CONSTS.WELCOME_T);
})

bot.on('new_chat_members', (ctx) => {
    ctx.replyWithMarkdown(CONSTS.WELCOME_T);
})

//MAIN
bot.hears(CONSTS.MAIN_RE, (ctx) => {
    let m = ctx.message.text;
    let arr = m.match(CONSTS.MAIN_RE), i=0, reply='';
    console.log(arr);
    for(;i<arr.length; i++) {
        reply += 'The ';
        let aed = arr[i].match(CONSTS.NUM_RE)[0];
        console.log(aed);
        reply += aed + 'AED is ';
        let usd = aed*CONSTS.EXCHANGE_RATE;
        reply += usd.toFixed(2) + 'USD\n';
    }
    console.log(reply);
    ctx.reply(reply); 
})


//WebHooks
app.get('/', (req,res) => res.send('Hello World!'));
app.use(bot.webhookCallback('/webHook'));
bot.telegram.setWebhook(CONSTS.WEBHOOK_URL);
const PORT = process.env.port || 8080;
app.listen(PORT, ()=> {
    console.log(`We are on ${PORT}`);
});