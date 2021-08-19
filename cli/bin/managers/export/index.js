/* eslint-disable @typescript-eslint/no-var-requires */
const { logger } = require('../logger')
const { exportLocales } = require('./export-locales')
const { exportSitemap } = require('./export-sitemap')

const map = {
  locales: exportLocales,
  sitemap: exportSitemap
}
const exportActions = ({ info }) => {
  if (!map[info[0]]) {
    return logger.error(
      `unrecognaized option. available options: ${Object.keys(map).join(', ')}`
    )
  }
  map[info[0]]()
}
module.exports.exportActions = exportActions
