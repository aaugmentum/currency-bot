const fs = require('fs');

const PATH = './utils/localstorage/db.json';

const writeToDisk = async (str) => {
    fs.writeFile(PATH, str, 'utf8', (err) => {
        if(err) throw err;
        console.log('Saved!');
    });
}



const readFromDisk = async () => {
    return new Promise((resolve, reject) => {
        fs.readFile(PATH, 'utf8', (err, data) => {
            if(err) reject(err);
            else resolve(data);
        });
    });
}

const saveItem = async (key, value) => {
    try {
        let obj = JSON.parse(await readFromDisk());
        obj[key] = value;
        writeToDisk(JSON.stringify(obj));
    } catch (err) {
        console.log(err);
    }
    
}

const getItem = async (key) => {
    try {
        const obj = JSON.parse(await readFromDisk());
        if(key in obj && obj[key] !== null) return obj[key];
        else throw new Error("The key is not found");
    } catch (err) {
        console.log(err);
        return '';
    }
}

const getItems = async (keys) => {
    try {
        const obj = JSON.parse(await readFromDisk());
        let result = {};
        keys.forEach((key, i, arr) => {
            if(key in obj && obj[key] !== null) result[key] = obj[key];
            else throw new Error(`The key ${key} is not found`);
        });
        return result;
    } catch (err) {
        console.log(err);
        return '';
    }
}

const saveItems = async (keyValue) => {
    try {
        let obj = JSON.parse(await readFromDisk());
        Object.keys(keyValue).forEach((key, i, arr) => obj[key] = keyValue[key]);
        writeToDisk(JSON.stringify(obj));
    } catch (err) {
        console.log(err);
        return '';
    }
}

let db = {
    saveItem: saveItem,
    getItem: getItem,
    getItems: getItems,
    saveItems: saveItems 
}

module.exports = db;