const {logger} = require('../logger');
const {add} = require('./add');
const {populate} = require('./populate');

const map = {
    add,populate
};

function translations({info, f, file, dest, d}) {
    if(!map[info[0]]) {
        return logger.error(`unrecognaized option. available options: ${Object.keys(map).join(', ')}`);
    }
    if(!(file || f)) {
        return logger.error(`param -file (or -f) is required`);
    }
    map[info[0]](file||f, dest||d);
}

module.exports.translations = translations;
