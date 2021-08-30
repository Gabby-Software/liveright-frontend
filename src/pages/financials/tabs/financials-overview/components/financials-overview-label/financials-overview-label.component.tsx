import React from 'react'

import Styles from './financials-overview-label.styles'

type Props = {
  label: string
  value: number
  currency: string
  green?: boolean
}

const FinancialsOverviewLabel = ({ label, value, currency, green }: Props) => {
  return (
    <Styles className={'f-overview-label'} $green={green}>
      <div className={'f-overview-label__title'}>{label}</div>
      <div className={'f-overview-label__value'}>
        {value}
        <span className={'f-overview-label__currency'}> {currency}</span>
      </div>
    </Styles>
  )
}

export default FinancialsOverviewLabel
