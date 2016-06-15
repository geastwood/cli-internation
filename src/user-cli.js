let inquirer = require('inquirer');
let q = require('q');
let {hasData} = require('./util');
let {
    createUser,
    deleteUser,
    listUsers,
    listGroups,
    addUserToGroups,
    userGroups
    } = require('./api');

let userCli = action => {
    if (action === 'create') {
        return create();
    } else if (action === 'delete') {
        return remove();
    } else if (action === 'list') {
        return list();
    } else if (action === 'add-to-group') {
        return addToGroups();
    }
};

let create = () => {
    return inquirer.prompt({
        type: 'input',
        name: 'username',
        message: 'Specify a username'
    }).then(({username}) => createUser(username))
        .then(({name, id}) => console.log(`Create user ${name} (${id})`));
};

let remove = () => {
    return inquirer.prompt({
        type: 'input',
        name: 'username',
        message: 'Specify a username'
    }).then(({username}) => deleteUser(username))
        .then(({name, id, msg}) => {
            if (msg) {
                console.log(msg);
            } else {
                console.log(`Delete user ${name} (${id})`);
            }
        })
};

let list = () => {
    return inquirer.prompt({
        type: 'list',
        name: 'userlist',
        message: 'Current list of Users',
        choices: () => listUsers(),
        when: () => {
            return listUsers().then(hasData)
        }
    }).then(({userlist}) => {
        if (userlist) {
            return userGroups(userlist).then(data => {
                if (data.length) {
                    console.log(`This user belongs to ${data.map(o => o.name).join(', ')}`);
                } else {
                    console.log('This user doesn\'t belong to any group');
                }
            });
        } else {
            return q.fcall(() => {
                console.log('currently no user');
            })
        }
    });
};

let addToGroups = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'userlist',
            message: 'Current list of Users',
            choices: () => listUsers()
        },
        {
            type: 'checkbox',
            name: 'grouplist',
            message: 'List of available Groups',
            choices: ({userlist}) => {
                return listGroups(userlist);
            }
        }
    ]).then(addUserToGroups).then(() => {
        console.log('Add user to groups');
    });
};

module.exports = userCli;
