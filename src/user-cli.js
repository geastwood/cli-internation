let inquirer = require('inquirer');
let {createUser} = require('./api');

let userCli = action => {
    if (action === 'create') {
        return create();
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

module.exports = userCli;
