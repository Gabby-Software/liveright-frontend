const {logger} = require('./logger');

const availableCommands = [
    {name: 'help', ex: 'lr help'},
    {name: 'create', ex: 'lr create <component|page|pipe|manager|command|hook|form|enum> -name {name}'},
    {name: 'export-locales', ex: 'lr export-locales'},
    {name: 'init-env', ex: 'lr init-env'},
];
const help = () => {
    logger.log(logger.colors.green, 'Below available commands');
    availableCommands.forEach(({name,ex})=>{
        console.log(`${logger.colors.blue} ${name} ${logger.colors.reset}${logger.colors.yellow} - ${ex}${logger.colors.reset}`);
    })
};

module.exports.help = help;
