import React from 'react'

import Styles from './financials-overview-label.styles'

type Props = {
  label: string
  value: string
  currency: string
  note?: string
  green?: boolean
}

const FinancialsOverviewLabel = ({
  label,
  value,
  currency,
  note,
  green
}: Props) => {
  return (
    <Styles className={'f-overview-label'} $green={green}>
      <div className={'f-overview-label__title'}>{label}</div>
      <div className={'f-overview-label__content'}>
        <div className={'f-overview-label__value'}>
          {value}
          <span className={'f-overview-label__currency'}> {currency}</span>
        </div>

        {note && (
          <div className={'f-overview-label__note'}>
            {note}
            <span className={'f-overview-label__currency'}> {currency}</span>
          </div>
        )}
      </div>
    </Styles>
  )
}

export default FinancialsOverviewLabel
