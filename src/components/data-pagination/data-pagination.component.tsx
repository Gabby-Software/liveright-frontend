import React, { FC } from 'react'

import { CaretRightIcon } from '../../assets/media/icons'
import { Pagination, Styles } from './data-pagination.styles'

type Props = {
  page: number
  setPage: (page: number) => void
  total: number
  justify?: 'start' | 'center' | 'end'
}
const DataPagination: FC<Props> = ({
  page,
  setPage,
  total,
  justify,
  children
}) => {
  return (
    <Styles $justify={justify} className={'data-pagination'}>
      {children}
      <Pagination
        current={page}
        defaultCurrent={1}
        total={total}
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
