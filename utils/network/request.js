const https = require('https');
const urlParse = require('url');

const get = async function(url) {
    return new Promise((resolve, reject) => {
        const urlParsed = urlParse.parse(url);
        const options = {
            host: urlParsed.host,
            path: urlParsed.path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }    
        };
        console.log(options);
        const req = https.request(options, (res) => {
            let out = '';
            console.log(options.host + ':' + res.statusCode);

            res.on('data', function (chunk) {
                out += chunk;
            });
    
            res.on('end', function() {
                const obj = JSON.parse(out);
                resolve(obj);
            });
        });

        req.on('error', (err) => reject(err));
        req.end();
    });
}


module.exports.get = get;
