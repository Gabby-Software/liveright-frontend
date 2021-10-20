import DataTable from '../../../../components/data-table/data-table.component'
import { Table } from './dashboard-revenue.styles'

const MOCK_DATA = [
  { from: 'Sessions', actual: '3,000 AED', target: '0 AED (+100%)' },
  { from: 'Coaching', actual: '3,000 AED', target: '0 AED (+100%)' },
  {
    from: 'Consultation',
    actual: '3,000 AED',
    target: '0 AED (+100%)'
  },
  { from: 'Other', actual: '3,000 AED', target: '0 AED (+100%)' }
]

const KEYS: string[] = ['from', 'actual', 'target']
const LABELS: string[] = ['clients:from', 'profile:actual', 'profile:target']

export const RevenueTable = () => {
  return (
    <Table>
      <DataTable
        labels={LABELS}
        data={MOCK_DATA}
        keys={KEYS}
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
