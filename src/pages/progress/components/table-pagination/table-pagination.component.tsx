import { AddIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import { Pagination } from '../progress-table/progress-table.styles'

interface TablePaginationProps {
  logTo: string
  page: number
  onPage: any
  total: number
}

export default function TablePagination({
  page,
  onPage,
  total,
  logTo
}: TablePaginationProps) {
  return (
    <Pagination>
      <DataPagination
        page={page}
        setPage={onPage}
        total={total}
        justify="between"
      >
        <Button to={logTo} variant="text" className="pagination__link">
          Some day missing? Add it
          <AddIcon />
        </Button>
      </DataPagination>
    </Pagination>
  )
}
