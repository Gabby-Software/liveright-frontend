import React from 'react'

import { CaretRightIcon } from '../../assets/media/icons'
import { Pagination, Styles } from './data-pagination.styles'

type Props = {
  page: number
  setPage: (page: number) => void
  total: number
  justify?: 'start' | 'center'
}
const DataPagination = ({ page, setPage, total, justify }: Props) => {
  return (
    <Styles $justify={justify}>
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
