import React from 'react'

import { asMoney } from '../../../../../../pipes/as-money.pipe'
import Styles from './financials-overview-label.styles'

type Props = {
  label: string
  value: number
  currency: string
}
const FinancialsOverviewLabel = ({ label, value, currency }: Props) => {
  return (
    <Styles className={'f-overview-label'}>
      <div className={'f-overview-label__title'}>{label}</div>
      <div className={'f-overview-label__value'}>{asMoney(value)}</div>
      <div className={'f-overview-label__currency'}>{currency}</div>
    </Styles>
  )
}

export default FinancialsOverviewLabel
