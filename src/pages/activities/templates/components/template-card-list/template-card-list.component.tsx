import React from 'react'
import { Link } from 'react-router-dom'

import TemplateCard from './template-card/template-card.component'

interface IProps {
  labels: {
    [key: string]: string
  }
  data: any[]
  baseLink: string
}

const TemplateCardList = ({ labels, data, baseLink }: IProps) => {
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
        <Link to={`${baseLink}/${d.id}`} key={i}>
          <TemplateCard
            id={d.id}
            name={d.name}
            tabularData={getTabularData(d)}
          />
        </Link>
      ))}
    </div>
  )
}

export default TemplateCardList
