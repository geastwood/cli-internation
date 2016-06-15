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

let deleteUser = (username) => {
    let id = sha1(username);
    return io.deleteUser(id).then((res) => ({
        name: username, id,
        msg: res && res.status === 1 ? 'user not exisit' : null
    }))
};

exports.createUser = createUser;
exports.deleteUser = deleteUser;
