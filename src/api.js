let io = require('./io');
let sha1 = require('sha1');
let toChoiceArray = obj => {
    return Object.keys(obj).map(id => ({name: obj[id].name, value: id}))
};

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
        msg: res && res.status === 1 ? 'user not exist' : null
    }))
};

let listUsers = (groupId) => io.listUsers(groupId).then(toChoiceArray);


let createGroup = (groupname) => {
    let id = sha1(groupname);
    return io.createGroup({
        [id]: {
            name: groupname
        }
    }).then(() => ({name: groupname, id}));
};

let deleteGroup = (groupname) => {
    let id = sha1(groupname);

    return io.deleteGroup(id).then((res = {}) => ({
        name: groupname, id,
        msg: res.status === 1 ? 'Group not exist' : res.status === 2 ? 'Group not empty' : null
    }))
};

let listGroups = (userId) => io.listGroups(userId).then(toChoiceArray);

let addUserToGroups = io.addUserToGroups;

let addUsersToGroup = io.addUsersToGroup;

let usersInGroup = (groupId) => io.usersInGroup(groupId).then(toChoiceArray);

let userGroups = (userId) => io.userGroups(userId).then(toChoiceArray);

let removeUsersFromGroup = io.removeUsersFromGroup;

exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.listUsers = listUsers;

exports.createGroup = createGroup;
exports.deleteGroup = deleteGroup;
exports.listGroups = listGroups;

exports.addUserToGroups = addUserToGroups;
exports.addUsersToGroup = addUsersToGroup;
exports.removeUsersFromGroup = removeUsersFromGroup;
exports.usersInGroup = usersInGroup;
exports.userGroups = userGroups;
