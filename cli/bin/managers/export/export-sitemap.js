const {logger} = require('../logger');

function exportSitemap() {
    const fs = require('fs');
    const excel = require('excel4node');
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('routes', {});
    worksheet.column(1).setWidth(30);
    worksheet.column(2).setWidth(30);
    let contents = fs.readFileSync('src/config/routes.config.ts');
    contents = contents.toString().replace(/^.*\[(.*)].*$/s, "$1");
    contents = contents.split("{")
        .map(x => x.trim())
        .filter(x => !!x)
        .map(x => x.split(',')
            .slice(0, 2)
            .map(t => t
                .split(':')[1]
                .trim()
                .replace(/["']/g, ''))
        );
    const headStyle = workbook.createStyle({
        font: {
            color: '#007324',
            size: 14,
            weight: 'bold'
        }
    });
    worksheet.cell(1, 1).string('Name').style(headStyle);
    worksheet.cell(1, 2).string('Url').style(headStyle);
    for(const [i,[title, url]] of contents.entries()) {
        worksheet.cell(i+2, 1).string(title);
        worksheet.cell(i+2, 2).string(url);
    }
    workbook.write('sitemap.xlsx');
    logger.success('app routes exported to sitemap.xlsx')
}

module.exports.exportSitemap = exportSitemap;
