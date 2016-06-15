let inquirer = require('inquirer');
let q = require('q');
let {hasData} = require('./util');
let {
    createGroup,
    deleteGroup,
    listGroups,
    listUsers,
    addUsersToGroup,
    usersInGroup,
    removeUsersFromGroup
    } = require('./api');

let groupCli = action => {
    if (action === 'create') {
        return create();
    } else if (action === 'delete') {
        return remove();
    } else if (action === 'list') {
        return list();
    } else if (action === 'add-users') {
        return addUsers();
    } else if (action === 'remove-users') {
        return removeUsers();
    }
};

let create = () => {
    return inquirer.prompt({
        type: 'input',
        name: 'groupname',
        message: 'Specify a group name'
    }).then(({groupname}) => createGroup(groupname))
        .then(({name, id}) => console.log(`Create group ${name} (${id})`));
};

let remove = () => {
    return inquirer.prompt({
        type: 'input',
        name: 'groupname',
        message: 'Specify a group name'
    }).then(({groupname}) => deleteGroup(groupname))
        .then(({name, id, msg}) => {
            if (msg) {
                console.log(msg);
            } else {
                console.log(`Delete group ${name} (${id})`);
            }
        })
};

let list = () => {
    return inquirer.prompt({
        type: 'list',
        name: 'groupname',
        message: 'Current list of Groups',
        choices: () => listGroups(),
        when: () => {
            return listGroups().then(hasData)
        }
    }).then(({groupname}) => {
        if (groupname) {
            return usersInGroup(groupname).then((data) => {
                if (data.length) {
                    console.log(`This group has users: ${data.map(o => o.name).join(', ')}`);
                } else {
                    console.log(`this group has no users`);
                }
            })
        } else {
            return q.fcall(() => {
                console.log('Currently no groups.');
            })
        }
    });
};

let addUsers = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'grouplist',
            message: 'Current list of Users',
            choices: () => listGroups()
        },
        {
            type: 'checkbox',
            name: 'userlist',
            message: 'Current list of Users',
            choices: ({grouplist}) => {
                return listUsers(grouplist)
            },
            when: ({grouplist}) => {
                return listUsers(grouplist).then(hasData)
            }
        }
    ]).then(({grouplist, userlist}) => {
        if (userlist) {
            return addUsersToGroup({grouplist, userlist}).then(() => {
                console.log('Add users to group');
            });
        } else {
            return q.fcall(() => {
                console.log('No available user for this group');
            })
        }
    })
};

let removeUsers = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'grouplist',
            message: 'Current list of Users',
            choices: () => listGroups()
        },
        {
            type: 'checkbox',
            name: 'userlist',
            message: 'Current list of Users',
            choices: ({grouplist}) => {
                return usersInGroup(grouplist)
            },
            when: ({grouplist}) => {
                return usersInGroup(grouplist).then(hasData)
            }
        }
    ]).then(({grouplist, userlist}) => {
        if (userlist) {
            return removeUsersFromGroup({grouplist, userlist}).then(() => {
                console.log('Remove users from group');
            });
        } else {
            return q.fcall(() => {
                console.log(`No available user for this group`);
            })
        }
    })
};

module.exports = groupCli;
