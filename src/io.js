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

let deleteUser = (userId) => {
    return readFile().then(json => {
        let {users} = json;
        if (users[userId]) {
            delete users[userId];
            return q.fcall(() => json).then(toJson).then(saveToFile);
        } else {
            return q.fcall(() => ({status: 1}))
        }
    })
};

let listUsers = () => {
    return readFile().then(json => (json.users || {}));
};

exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.listUsers = listUsers;
