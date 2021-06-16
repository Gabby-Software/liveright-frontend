const {logger} = require('../logger');
function exportLocales(){
    const fs = require('fs');
    const excel = require('excel4node');
    const workbook = new excel.Workbook();
    const BASE_URL = 'src/assets/strings';
    const languages = [
        {name:'English', slug:'en'},
        {name:'Spanish', slug:'es'},
    ];
    const cellStyle = workbook.createStyle({
        font: {
            color: '#2b2b2b',
            size: 12
        }
    });
    const keyStyle = workbook.createStyle({
        font: {
            color: '#031c4a',
            size: 12
        }
    });
    const headStyle = workbook.createStyle({
        font: {
            color: '#007324',
            size: 14,
            weight: 'bold'
        }
    });
    const files = fs.readdirSync(`${BASE_URL}/${languages[0].slug}`);
    logger.info('files', files);
    for (const file of files) {
        if(!file.endsWith('.json')) continue;
        const name = file.replace('.json','');
        logger.info(`exporting strings from ${file}`);
        const worksheet = workbook.addWorksheet(name, {});
        worksheet.column(1).setWidth(30);
        worksheet.column(2).setWidth(60);
        worksheet.column(3).setWidth(60);
        worksheet.column(4).setWidth(60);
        worksheet.cell(1,1).string('Key').style(headStyle);
        languages.forEach((l,i) => worksheet.cell(1,i+2).string(l.name).style(headStyle));
        let row = 2;
        const langData = languages.map(lang => JSON.parse(fs.readFileSync(`${BASE_URL}/${lang.slug}/${file}`)));
        Object.entries(langData[0]).forEach(([key, val]) => {
            if(typeof val === 'object') {
                Object.entries(val).forEach(([k,v])=> {
                    try {
                        worksheet.cell(row, 1).string(`${name}:${key}.${k}`).style({color: '#031c4a'});
                        langData.forEach((l,i) => worksheet.cell(row, i+2).string(l[key][k]||'').style(cellStyle));
                        row++;
                    } catch(e){
                        logger.warn(e.message, name, key, k, v);
                    }
                });
            } else {
                worksheet.cell(row,1).string(`${name}:${key}`).style({color: '#031c4a'});
                langData.forEach((l,i) => worksheet.cell(row, i+2).string(l[key]||'').style(cellStyle));
                row++;
            }
        });
    }
    logger.success('export completed. data saved in strings.xlsx');
    workbook.write('strings.xlsx');
}
module.exports.exportLocales = exportLocales;
