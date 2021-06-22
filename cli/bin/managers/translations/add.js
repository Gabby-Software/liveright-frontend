const {logger} = require('../logger');
const TRANSLATION_PATH = './src/assets/strings';
const languages = ['en', 'es'];
function add(file) {
    const fs = require('fs');
    languages.forEach(lang => {
        logger.info(`creating ${TRANSLATION_PATH}/${lang}/${file}.json`);
        fs.writeFileSync(`${TRANSLATION_PATH}/${lang}/${file}.json`, '{}');
        const exports = fs.readFileSync(`${TRANSLATION_PATH}/${lang}/index.ts`).toString();
        fs.writeFileSync(`${TRANSLATION_PATH}/${lang}/index.ts`, exports.replace(/(export.*)};.*$/s, `import {default as ${file}} from './${file}.json';\n$1,${file}};`));
        logger.success(`translation file ${file} setup`);
    });
}
module.exports.add = add;
