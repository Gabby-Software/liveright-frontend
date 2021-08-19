import { useEffect, useState } from 'react'

import { EP_GET_TRAINER } from '../enums/api.enum'
import api from '../managers/api.manager'
import logger from '../managers/logger.manager'
import { FileType } from '../types/file.type'
import { useAuth } from './auth.hook'

export const useClientsTrainer = () => {
  const [trainer, setTrainer] = useState<null | {
    id: number
    first_name: string
    last_name: string
    avatar: null | FileType
  }>()
  const { type } = useAuth()
  useEffect(() => {
    api
      .get(EP_GET_TRAINER + `?return_minimal=1`)
      .then((res) => res.data.data)
      .then((res) => {
        logger.success('trainer data', res)
        setTrainer(res)
      })
      .catch(() => {})
  }, [type])
  return trainer
}
