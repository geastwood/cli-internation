let program = require('commander'),
    pkg = require('./package.json'),
    validUserCommands = ['create', 'delete', 'list'],
    validGroupCommands = ['create', 'delete', 'list'],
    contains = (arr, item) => arr.indexOf(item) !== -1;

program.version(`Current version: ${pkg.version}`);

program.command('user [cmd]')
    .description('user commands')
    .action((cmd, opts) => {
        if (!contains(validUserCommands, cmd)) {
            console.log('Error', `${cmd} is not valid, only ${validUserCommands.join(', ')} supported`);
        }
        console.log(cmd);
    });

program.command('group [cmd]')
    .description('description commands')
    .action((cmd, opts) => {
        if (!contains(validGroupCommands, cmd)) {
            console.log('Error', `${cmd} is not valid, only ${validGroupCommands.join(', ')} supported`);
        }
        console.log(cmd);
    });

program.parse(process.argv);
