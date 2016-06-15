let program = require('commander');
let pkg = require('./package.json');
let validUserCommands = ['create', 'delete', 'list'];
let validGroupCommands = ['create', 'delete', 'list'];
let userCli = require('./src/user-cli');
let groupCli = require('./src/group-cli');
let errHandler = err => console.log(err);
let contains = (arr, item) => arr.indexOf(item) !== -1;

program.version(`Current version: ${pkg.version}`);

program.command('user [cmd]')
    .description(`user commands, ${validUserCommands.join('|')} defaults to 'list'`)
    .action((cmd, opts) => {
        if (!contains(validUserCommands, cmd)) {
            console.log('Error', `${cmd} is not valid, only ${validUserCommands.join(', ')} supported`);
        }
        userCli(cmd).catch(errHandler);
    });

program.command('group [cmd]')
    .description(`group commands, ${validGroupCommands.join('|')} defaults to 'list'`)
    .action((cmd, opts) => {
        if (!contains(validGroupCommands, cmd)) {
            console.log('Error', `${cmd} is not valid, only ${validGroupCommands.join(', ')} supported`);
        }
        groupCli(cmd).catch(errHandler);
    });

program.parse(process.argv);
