module.exports = {
    //API_TOKEN
    BOT_API : '501293315:AAHIOylnqFwUFLygXUtNrglOzUY8HzGVsiI',
    WEBHOOK_URL: 'https://542491ed.ngrok.io/webHook',
    RATE_URL: 'https://openexchangerates.org/api/latest.json?app_id=6f2d5004deb942168f5aa5d3941925ef',
    //Regular expressions
    MAIN_RE: /\d+([.]|[,])?\d*(\s|)+(AED|АЕД)/gi,
    NUM_RE: /\d+([.]|[,])?\d*(\s|)/gi,
    //DB
    RATE_KEY: 'rate',
    //Texts
    WELCOME_T: '*Hi!*\nThis bot will automatically convert *AED* to *USD*.\nType *number+aed* to see how it works.\nFor example: 1500aed, 12.21AED and etc.',
}
