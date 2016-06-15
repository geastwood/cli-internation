let inquirer = require('inquirer');
let {createGroup, deleteGroup, listGroups} = require('./api');

let groupCli = action => {
    if (action === 'create') {
        return create();
    } else if (action === 'delete') {
        return remove();
    } else if (action === 'list') {
        return list();
    }
};

let create = () => {
    return inquirer.prompt({
        type: 'input',
        name: 'groupname',
        message: 'Specify a group name'
    }).then(({groupname}) => createGroup(groupname))
        .then(({name, id}) => console.log(name, id));
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
                console.log('delete', name, id);
            }
        })
};

let list = () => {
    return inquirer.prompt({
        type: 'list',
        name: 'groupname',
        message: 'Current list of Groups',
        choices: () => listGroups()
    }).then(({groupname}) => {
        console.log(`groupname is ${groupname}`);
    });
};

module.exports = groupCli;
