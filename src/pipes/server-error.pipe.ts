/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function */
import { AxiosError } from 'axios'

import logger from '../managers/logger.manager'

export const serverError: (e: AxiosError) => string = (e: AxiosError) => {
  if (e.response?.data?.errors) {
    const err = Object.values(e.response?.data?.errors)[0] as string | string[]
    logger.error(
      'server response',
      err,
      e.response,
      typeof err === 'string' ? err : err[0]
    )
    return typeof err === 'string' ? err : err[0]
  }
  logger.error('server response 2', e, e.response)
  return typeof e === 'string' ? e : e.response?.data?.message || e.message
}
