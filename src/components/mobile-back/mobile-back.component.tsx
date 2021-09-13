import React, { ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { CaretLeftIcon } from '../../assets/media/icons'
import { usePage } from '../../hooks/page.hook'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { Styles } from './mobile-back.styles'

const backData: {
  setTo: (to: string) => void
  setAlias: (alias: string) => void
} = {
  setTo: () => {},
  setAlias: () => {}
}

export function useMobileBack(to: string, alias: string) {
  useEffect(() => {
    backData.setTo(to)
    backData.setAlias(alias)
    return () => {
      backData.setTo('')
      backData.setAlias('')
    }
  }, [])
}

interface MobileBackProps {
  to?: string
  alias?: string
  component?: ReactNode
}

export default function MobileBack(props: MobileBackProps) {
  const [to, setTo] = useState(props.to || '')
  const [alias, setAlias] = useState(props.alias || '')

  backData.setTo = setTo
  backData.setAlias = setAlias

  const page = usePage()
  const { t } = useTranslation()

  if (!page?.back?.url && !to) {
    return null
  }

  return (
    <Styles>
      <div>
        <Link to={to || page?.back?.url || ''} className="mobile-back__link">
          <CaretLeftIcon />
          <span>
            {t(`back-to`, {
              to: t(`menu.${alias || page?.back?.alias || ''}`)
            })}
          </span>
        </Link>
      </div>

      {!!props.component && <div>{props.component}</div>}
    </Styles>
  )
}
