import React from 'react'

import { classes } from '../../pipes/classes.pipe'
import { CardStyles, ContStyles } from './overall-card.styles'

type Props = {
  type?: string
  label: string
  value: string
}
const OverallCard = ({ type = 'default', label, value }: Props) => {
  return (
    <CardStyles className={classes('overall', `overall__${type}`)}>
      <div className={classes('overall__value')}>{value}</div>
      <div className={'overall__label'}>{label}</div>
    </CardStyles>
  )
}
const Overall = ({ children }: React.ComponentProps<any>) => {
  return <ContStyles>{children}</ContStyles>
}
Overall.Card = OverallCard

export default Overall
