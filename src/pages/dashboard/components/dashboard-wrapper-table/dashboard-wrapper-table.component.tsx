import DataTable from '../../../../components/data-table/data-table.component'
import { Table } from './dashboard-wrapper-table.styles'

interface IProps {
  labels: string[]
  keys: string[]
  data: { from: string; actual: string; target: string }[]
}

export const RevenueTable = ({ labels, keys, data }: IProps) => {
  return (
    <Table>
      <DataTable
        labels={labels}
        data={data}
        keys={keys}
        className={'revenue-table'}
        showSort={false}
        //   render={}
        //   onClick={}
        //   active={}
        //   children={}
        //   loading={}
        //   error={}
        //   actionWidth={}
        // round={'10px'}
      />
    </Table>
  )
}
