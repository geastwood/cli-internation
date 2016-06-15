let fs = require('fs');
let path = require('path');
let q = require('q');
let dataFilePath = path.join(__dirname, '../data.json');
let {contains} = require('./util');

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
        let {users, groupUsers} = json;
        if (users[userId]) {
            delete users[userId];
            Object.keys((groupUsers || {})).forEach(groupId => {
                delete groupUsers[groupId][userId]
            });
            return q.fcall(() => json).then(toJson).then(saveToFile);
        } else {
            return q.fcall(() => ({status: 1}))
        }
    })
};

// if pass a groupId, filter out users that have been assigned to this group
let listUsers = (groupId) => {
    return readFile().then(json => {
        let {users, groupUsers} = json;

        if (groupId) { // filter for groupId
            let userIds = Object.keys(groupUsers[groupId] || {});
            return Object.keys(users).reduce((carry, userId) => {
                if (!contains(userIds, userId)) {
                    carry[userId] = users[userId];
                }
                return carry;
            }, {});
        }

        return users || {};
    });
};

let createGroup = (group) => {
    return readFile().then(json => {
        return Object.assign({}, json, {
            groups: Object.assign({}, json.groups, group)
        });
    }).then(toJson).then(saveToFile);
};

let deleteGroup = (groupId) => {
    return readFile().then(json => {
        let {groups} = json;
        if (groups[groupId]) {
            delete groups[groupId];
            return q.fcall(() => json).then(toJson).then(saveToFile);
        } else {
            return q.fcall(() => ({status: 1}))
        }
    })
};

// if pass a userId, select group that doesn't contain this user
let listGroups = (userId) => {
    return readFile().then(json => {
        let {groups, groupUsers} = json;
        if (!groupUsers) {
            groupUsers = json.groupUsers = {};
        }

        if (userId) {
            return Object.keys(groups).reduce((carry, groupId) => {
                if (!groupUsers[groupId]) {
                    carry[groupId] = groups[groupId];
                } else {
                    if (!contains(Object.keys(groupUsers[groupId]), userId)) {
                        carry[groupId] = groups[groupId];
                    }
                }
                return carry;
            }, {});
        }

        return groups || {}
    });
};

let addUserToGroups = (data) => {
    return readFile().then((json) => {
        let {users, groupUsers} = json;

        if (!groupUsers) {
            groupUsers = json.groupUsers = {};
        }

        data.grouplist.forEach(groupId => {
            let obj, userId = data.userlist;
            if (!groupUsers[groupId]) {
                groupUsers[groupId] = {};
            }
            obj = groupUsers[groupId];
            obj[userId] = users[userId]
        });
        return json;
    }).then(toJson).then(saveToFile);
};

let addUsersToGroup = (data) => {
    return readFile().then(json => {
        let {users, groupUsers} = json;
        let {grouplist: groupId, userlist: userIds} = data, group;

        if (!groupUsers[groupId]) {
            groupUsers[groupId] = {};
        }

        group = groupUsers[groupId];

        userIds.forEach(userId => {
            group[userId] = users[userId];
        });

        return json;
    }).then(toJson).then(saveToFile);
};

let usersInGroup = groupId => readFile().then(json => json.groupUsers[groupId] || {});

let removeUsersFromGroup = data => {
    return readFile().then(json => {
        let {groupUsers} = json;
        let {grouplist: groupId, userlist: userIds} = data, group;

        userIds.forEach(userId => {
            delete groupUsers[groupId][userId];
        });

        return json;
    }).then(toJson).then(saveToFile);
};

let userGroups = userId => {
    return readFile().then(json => {
        let {groups, groupUsers} = json;
        return Object.keys((groupUsers || {})).reduce((carry, groupId) => {
            let groupUser = groupUsers[groupId];
            if (contains(Object.keys(groupUser), userId)) {
                carry[groupId] = groups[groupId];
            }
            return carry;
        }, {});
    });
};

exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.listUsers = listUsers;

exports.createGroup = createGroup;
exports.deleteGroup = deleteGroup;
exports.listGroups = listGroups;

exports.addUserToGroups = addUserToGroups;
exports.addUsersToGroup = addUsersToGroup;
exports.usersInGroup = usersInGroup;
exports.userGroups = userGroups;
exports.removeUsersFromGroup = removeUsersFromGroup;
