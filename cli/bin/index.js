#!/usr/bin/env node
const {initENV} = require('./managers/init-env');
const {help} = require('./managers/help');
const {create} = require('./managers/create');
const {update} = require('./managers/update');
const {logger} = require('./managers/logger');
const {exportActions} = require('./managers/export');
const {translations} = require('./managers/translations');

const commands = {
    'init-env': initENV,
    'export': exportActions,
    help, create, update, translations
};
const args = parseArgs();
if (!args.command) return logger.error(`please specify a command`);
if (!commands[args.command]) return logger.error(`command not found: ${args.command}`);
commands[args.command](args);


function parseArgs() {
    const args = process.argv.slice(2);
    const command = args.shift();
    const info = [];
    while (args.length && !args[0].startsWith('-')) {
        info.push(args.shift());
    }
    const argsData = {};
    while (args.length && args[0].startsWith('-')) {
        argsData[args.shift().substring(1)] = args.shift();
    }
    return {command, info, ...argsData};
}
