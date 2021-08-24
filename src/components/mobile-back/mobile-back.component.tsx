import React, { useEffect, useState } from 'react'

import { ReactComponent as BackIcon } from '../../assets/media/icons/back-arrow.svg'
import { usePage } from '../../hooks/page.hook'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import Styles from './mobile-back.styles'

const backData: {
  setTo: (to: string) => void
  setAlias: (alias: string) => void
} = {
  setTo: () => {},
  setAlias: () => {}
}
export const useMobileBack = (to: string, alias: string) => {
  useEffect(() => {
    backData.setTo(to)
    backData.setAlias(alias)
    return () => {
      backData.setTo('')
      backData.setAlias('')
    }
  }, [])
}
const MobileBack = () => {
  const [to, setTo] = useState('')
  const [alias, setAlias] = useState('')
  backData.setTo = setTo
  backData.setAlias = setAlias
  const page = usePage()
  const { t } = useTranslation()
  if (!page?.back?.url && !to) return null
  return (
    <Styles to={to || page?.back?.url || ''} className={'mobile-back'}>
      <BackIcon className={'mobile-back__icon'} />
      <span className={'mobile-back__alias'}>
        {t(`back-to`, { to: t(`menu.${alias || page?.back?.alias || ''}`) })}
      </span>
    </Styles>
  )
}

export default MobileBack
