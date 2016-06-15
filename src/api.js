let io = require('./io');
let sha1 = require('sha1');

let createUser = (username) => {
    let id = sha1(username);
    return io.createUser({
        [id]: {
            name: username
        }
    }).then(() => ({name: username, id}));
};

exports.createUser = createUser;
