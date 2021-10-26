import React, { FC } from 'react'

import { CaretRightIcon } from '../../assets/media/icons'
import { Pagination, Styles } from './data-pagination.styles'

type Props = {
  page: number
  setPage: (page: number) => void
  total: number
  justify?: 'start' | 'center' | 'end' | 'between'
  perPage?: number
}

const DataPagination: FC<Props> = ({
  page,
  setPage,
  total,
  justify,
  perPage,
  children
}) => {
  return (
    <Styles $justify={justify} className={'data-pagination'}>
      {children}

      <Pagination
        current={page}
        defaultCurrent={1}
        showLessItems
        total={total}
        pageSize={perPage || 10}
        onChange={setPage}
        showSizeChanger={false}
        itemRender={itemRender}
      />
    </Styles>
  )
}

export default DataPagination

function itemRender(page: number, type: string, element: any) {
  switch (type) {
    case 'prev':
    case 'next':
      return <CaretRightIcon />
    case 'jump-prev':
    case 'jump-next':
      return '...'
    default:
      return element
  }
}
