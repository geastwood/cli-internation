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

let listUsers = () => io.listUsers().then(userListObj => {
    return Object.keys(userListObj).map(userId => ({name: userListObj[userId].name, value: userId}))
});

exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.listUsers = listUsers;
