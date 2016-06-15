let inquirer = require('inquirer');
let {createUser, deleteUser, listUsers, listGroups, addUserToGroups} = require('./api');

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
        .then(({name, id}) => console.log(name, id));
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
                console.log('delete', name, id);
            }
        })
};

let list = () => {
    return inquirer.prompt({
        type: 'list',
        name: 'userlist',
        message: 'Current list of Users',
        choices: () => listUsers()
    }).then(({userlist}) => {
        console.log(`userId is ${userlist}`);
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
        console.log('save user to groups');
    });
};

module.exports = userCli;
