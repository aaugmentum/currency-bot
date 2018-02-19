const db = require('./utils/localstorage/db.js');

async function test() {
    const req = require('./utils/network/request.js');
    const result = await req.get('https://openexchangerates.org/api/latest.json?app_id=6f2d5004deb942168f5aa5d3941925ef');
    console.log(result);
    console.log(new Date());
}

test();

const cron = require('node-cron');

let task = cron.schedule('0 33 19 * * *', () => console.log('Hi'), true);

console.log('HERE');

