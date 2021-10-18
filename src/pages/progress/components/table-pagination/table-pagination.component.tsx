import { AddIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
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
  const { t } = useTranslation()
  return (
    <Pagination>
      <DataPagination
        page={page}
        setPage={onPage}
        total={total}
        justify="between"
      >
        <Button to={logTo} variant="text" className="pagination__link">
          {t('progress:missingDay')}
          <AddIcon />
        </Button>
      </DataPagination>
    </Pagination>
  )
}
