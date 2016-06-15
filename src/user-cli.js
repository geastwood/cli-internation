let inquirer = require('inquirer');
let {createUser, deleteUser} = require('./api');

let userCli = action => {
    if (action === 'create') {
        return create();
    } else if (action === 'delete') {
        return remove();
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

module.exports = userCli;
