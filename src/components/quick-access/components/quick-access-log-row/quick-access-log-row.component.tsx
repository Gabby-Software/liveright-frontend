import React, { FC } from 'react'

import formatter from '../../../../managers/formatter.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import QuickAccessRectInput from '../quick-access-rect-input/quick-access-rect-input.component'
import Styles from './quick-access-log-row.styles'

type Props = {
  label: string
  getQuality: (x: number) => string
  min: number
  max: number
}
const QuickAccessLogRow: FC<Props> = ({ label, getQuality, min, max }) => {
  const { t } = useTranslation()
  return (
    <Styles>
      <QuickAccessRectInput
        label={label}
        name={'data'}
        onUpdate={(val) => getQuality(+val)}
        format={formatter().number().min(min).max(max)}
      />
      <div className={'qa-log__quality'}>
        <div className={'qa-log__quality__label'}>{t('quality')}</div>
        <div className={'qa-log__quality__value'}>Good</div>
      </div>
    </Styles>
  )
}

export default QuickAccessLogRow
