import {
  ExerciseIconV2,
  FoodIconV2,
  MeasurementIconV2,
  WorkoutIconV2
} from '../../../../assets/media/icons'
import { Link } from 'react-router-dom'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import DataTable from '../../../../components/data-table/data-table.component'
import { Routes } from '../../../../enums/routes.enum'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { Table } from './table-wrapper.styles'

interface IProps {
  labels: string[]
  keys: string[]
  data: any[]
}
const ACTIONS = [
  {
    icon: WorkoutIconV2,
    title: 'Workshops'
  },
  {
    icon: ExerciseIconV2,
    title: 'Exercises'
  },
  {
    icon: FoodIconV2,
    title: 'Meals'
  },
  {
    icon: MeasurementIconV2,
    title: 'Measures'
  }
]

export const TableWrapper = ({ labels, keys, data }: IProps) => {
  const { t } = useTranslation()
  const clients = data.filter((item, index) => index <= 3)
  return (
    <Table>
      <DataTable
        labels={labels}
        data={clients}
        keys={keys}
        className={'revenue-table'}
        showSort={false}
        render={{
          name: (data) => (
            <Link to={`${Routes.CLIENTS}/${data.id}`}>
              {data.first_name} {data.last_name}
            </Link>
          ),
          phone_number: (data) => data.accounts?.[0]?.['phone_number'] || '-',
          sessions: (data) =>
            t('clients:sessions-remind', {
              n: data.extras?.credits || 0
            }),
          actions: () => (
            <div className="table-actions">
              {ACTIONS.map((a, index) => (
                <IconButton key={index} size="sm">
                  <a.icon />
                </IconButton>
              ))}
            </div>
          )
        }}
      />
    </Table>
  )
}
