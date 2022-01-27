import React from 'react'

import Styles from './template-card.styles'

interface IProps {
  id: number
  name: string
  tabularData: any[]
}

// data will be an array of object which will be sent by preprocessing it will Object.entries function.
// data = [ [key, value], [key, value], ... ]

const TemplateCard = ({ id, name, tabularData }: IProps) => {
  return (
    <Styles>
      <p className="card-id">ID {id}</p>
      <h6 className="card-name">{name}</h6>
      <div className="card-tabular-data">
        {tabularData.map((d, i) => (
          <div className="card-tabular-data__item" key={i}>
            <div className="card-tabular-data__label">{d.label}</div>
            <div>{d.value}</div>
          </div>
        ))}
      </div>
    </Styles>
  )
}

export default TemplateCard
