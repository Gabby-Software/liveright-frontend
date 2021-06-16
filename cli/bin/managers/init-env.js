const fs = require('fs');
const {logger} = require('./logger');
const initENV = () => {
    fs.copyFile('.env.example', '.env', (err) => {
        if (err) throw err;
        logger.success('.env.example was copied to .env');
    });
};
module.exports.initENV = initENV;
