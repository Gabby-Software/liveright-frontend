/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process')
const { logger } = require('./logger')

module.exports.update = () => {
  logger.info('updating package...')
  exec('yarn add ./cli', (err) => {
    if (err) {
      logger.error('filed to update')
    } else logger.success('package updated successfully')
  })
}
