import React from 'react'

import TemplateCard from './template-card/template-card.component'

interface IProps {
  labels: {
    [key: string]: string
  }
  data: any[]
}

const TemplateCardList = ({ labels, data }: IProps) => {
  const getTabularData = (d: any) => {
    const tabularData = Object.keys(labels).filter(
      (k) => k !== 'id' && k !== 'name' && d[k]
    )
    return tabularData.map((k) => ({
      label: labels[k],
      value: d[k]
    }))
  }

  return (
    <div>
      {data.map((d, i) => (
        <TemplateCard
          id={d.id}
          name={d.name}
          tabularData={getTabularData(d)}
          key={i}
        />
      ))}
    </div>
  )
}

export default TemplateCardList
