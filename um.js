let program = require('commander');
let pkg = require('./package.json');
let validUserCommands = ['create', 'delete', 'list'];
let validGroupCommands = ['create', 'delete', 'list'];
let userCli = require('./src/user-cli');
let contains = (arr, item) => arr.indexOf(item) !== -1;

program.version(`Current version: ${pkg.version}`);

program.command('user [cmd]')
    .description(`user commands, ${validUserCommands.join('|')} defaults to 'list'`)
    .action((cmd, opts) => {
        if (!contains(validUserCommands, cmd)) {
            console.log('Error', `${cmd} is not valid, only ${validUserCommands.join(', ')} supported`);
        }
        userCli(cmd).catch(err => {
            console.log(err);
        });
    });

program.command('group [cmd]')
    .description(`group commands, ${validGroupCommands.join('|')} defaults to 'list'`)
    .action((cmd, opts) => {
        if (!contains(validGroupCommands, cmd)) {
            console.log('Error', `${cmd} is not valid, only ${validGroupCommands.join(', ')} supported`);
        }
    });

program.parse(process.argv);
