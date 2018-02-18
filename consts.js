module.exports = {
    //API_TOKEN
    BOT_API : '513186941:AAEGpeojzOvWY7aycLjvTT_wj3Tch9wHxR8',
    WEBHOOK_URL: 'https://23da1da4.ngrok.io/webHook',
    EXCHANGE_RATE: 0.27226,
    //Regular expressions
    MAIN_RE: /\d+([.]|[,])?\d*(\s|)+AED/gi,
    NUM_RE: /\d+([.]|[,])?\d*(\s|)/gi,
    //Texts
    WELCOME_T: '*Hi!*\nThis bot will automatically convert *AED* to *USD*.\nType *number+aed* to see how it works.\nFor example: 1500aed, 12.21AED and etc.',
}
