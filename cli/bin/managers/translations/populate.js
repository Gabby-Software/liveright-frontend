const {logger} = require('../logger');
const TRANSLATION_PATH = './src/assets/strings';
function populate(file, dest) {
    const fs = require('fs');
    logger.info(`populating /en/${file}.json to /${dest}/${file}.json`);
    fs.writeFileSync(`${TRANSLATION_PATH}/en/${file}.json`,
        fs.readFileSync(`${TRANSLATION_PATH}/${dest}/${file}.json`));
    logger.success(`/en/${file}.json copied to /${dest}/${file}.json`);
}
module.exports.populate = populate;
