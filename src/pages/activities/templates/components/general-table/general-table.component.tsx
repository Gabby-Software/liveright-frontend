import React from 'react'

import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { classes } from '../../../../../pipes/classes.pipe'
import { Styles } from './general-table.styles'

interface GeneralTableProps {
  keys: string[]
  labels: string[]
  links: string[]
  data: { [key: string]: any }[]
  onClick?: (item: any) => void
}

export const GeneralTable = (props: GeneralTableProps) => {

  const { keys, labels, links, data, onClick } = props
  const { t } = useTranslation()

  return (
    <Styles>
      <thead className={'general-table__head'}>
        <tr>
          {labels.map((label, index) => (
            <th key={label + index.toString()} className={'general-table__th'}>
              <div className="general-table__th-container">
                {t(label)}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={'general-table__body'}>
        {data.map((item, index) => (
          <tr
            key={item.id || index}
            className={classes(
              'general-table__tr',
              onClick && 'general-table__tr__clickable'
            )}
            onClick={onClick ? () => onClick(item) : undefined}
          >
            {(keys || labels).map((key) => (
              <td key={key} className={'data-table__td'}>
                <div className="general-table__td-container">
                  {links.includes(key) && !!item[key] ? (
                    <a
                      href={item[key]}
                      target='_blank'
                      className='general-table__link'
                      rel='noreferrer'
                    >
                      {item[key]}
                    </a>
                  ) : (
                    <>{item[key] ? item[key] : 'ND'}</>
                  )}
                </div>

              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Styles>
  )
}