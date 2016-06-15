let fs = require('fs');
let path = require('path');
let q = require('q');
let dataFilePath = path.join(__dirname, '../data.json');

let readFile = () => q.nfcall(fs.readFile, dataFilePath, 'utf8').then(JSON.parse).catch(() => ({}));
let toJson = v => JSON.stringify(v, null, 2);
let saveToFile = v => q.nfcall(fs.writeFile, dataFilePath, v, 'utf8');

let createUser = (user) => {
    return readFile().then(json => {
        return Object.assign({}, json, {
            users: Object.assign({}, json.users, user)
        });
    }).then(toJson).then(saveToFile);
};

exports.createUser = createUser;
