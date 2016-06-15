let program = require('commander');
let pkg = require('./package.json');
let validUserCommands = ['create', 'delete', 'list', 'add-to-group'];
let validGroupCommands = ['create', 'delete', 'list', 'add-users', 'remove-users'];
let userCli = require('./src/user-cli');
let groupCli = require('./src/group-cli');
let errHandler = err => console.log(err);
let {contains} = require('./src//util');

program.version(`Current version: ${pkg.version}`);

program.command('user [cmd]')
    .description(`user commands, ${validUserCommands.join('|')} defaults to 'list'`)
    .action((cmd = 'list', opts) => {
        if (!contains(validUserCommands, cmd)) {
            console.log(`${cmd} is not valid, only ${validUserCommands.join(', ')} supported`);
        } else {
            userCli(cmd).catch(errHandler);
        }
    });

program.command('group [cmd]')
    .description(`group commands, ${validGroupCommands.join('|')} defaults to 'list'`)
    .action((cmd = 'list', opts) => {
        if (!contains(validGroupCommands, cmd)) {
            console.log(`${cmd} is not valid, only ${validGroupCommands.join(', ')} supported`);
        } else {
            groupCli(cmd).catch(errHandler);
        }
    });

program.parse(process.argv);
