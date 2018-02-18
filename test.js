const db = require('./utils/localstorage/db.js');

async function test() {
    await db.saveItems({'rate': 0.27, 'date': '18-02-2018'});
    let obj = await db.getItems(['rate', 'date']);
    console.log(obj);
}

test();