import { Skeleton } from 'antd'
import get from 'lodash/get'
import React from 'react'

import { SortGroupIcon } from '../../assets/media/icons'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { classes } from '../../pipes/classes.pipe'
import Styles from './data-table.styles'

interface Props<G> {
  labels: string[]
  keys?: string[]
  render?: { [key: string]: (item: G) => React.ReactNode }
  data: { [key: string]: any }[]
  onClick?: (item: G) => void
  active?: number
  children?: React.ReactNode
  className?: string
  loading?: boolean
  error?: string
  actionWidth?: string
  round?: string
}
const DataTable = ({
  labels,
  render,
  data,
  keys,
  onClick,
  active,
  children,
  className,
  loading,
  error,
  actionWidth,
  round
}: Props<any>) => {
  const { t } = useTranslation()
  return (
    <Styles
      round={round}
      className={`data-table ${className}`}
      actionWidth={actionWidth}
    >
      <thead className={'data-table__head'}>
        {labels.map((label, index) => (
          <th key={label + index.toString()} className={'data-table__th'}>
            <div className="data-table__th-container">
              {t(label)}
              <SortGroupIcon />
            </div>
          </th>
        ))}
      </thead>

      <tbody className={'data-table__body'}>
        {error ? (
          <p className={'data-table__error'}>{error}</p>
        ) : loading && !data.length ? (
          <Skeleton />
        ) : data?.length ? (
          data.map((item, index) => (
            <tr
              key={item.id || index}
              className={classes(
                'data-table__tr',
                onClick && 'data-table__tr__clickable',
                active && active === item.id && 'data-table__tr__active'
              )}
              onClick={onClick ? () => onClick(item) : undefined}
            >
              {(keys || labels).map((key) => (
                <td
                  key={key}
                  className={'data-table__td'}
                  {...(key === 'options' || key === 'actions'
                    ? { width: 1 }
                    : {})}
                >
                  {render && render[key] ? render[key](item) : get(item, key)}
                </td>
              ))}
            </tr>
          ))
        ) : null}

        {children}
      </tbody>
    </Styles>
  )
}

export default DataTable
