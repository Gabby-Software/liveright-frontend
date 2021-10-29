import { Link } from 'react-router-dom'

import {
  ExerciseIconV2,
  FoodIconV2,
  MeasurementIconV2,
  WorkoutIconV2
} from '../../../../assets/media/icons'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import DataTable from '../../../../components/data-table/data-table.component'
import { Routes } from '../../../../enums/routes.enum'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { FinancialsSummaryType } from '../../../../types/financials'
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
  return (
    <Table>
      <DataTable
        labels={labels}
        data={data}
        keys={keys}
        className={'revenue-table'}
        showSort={false}
        render={{
          name: (data) => <TableLink data={data} />,
          phone_number: (data) => data.accounts?.[0]?.['phone_number'] || '-',
          sessions: (data) =>
            t('clients:sessions-remind', {
              n: data.extras?.credits || 0
            }),
          projectedIncome: ({ projectedIncome }: FinancialsSummaryType) =>
            projectedIncome ? `${Math.ceil(projectedIncome)} AED` : '-',
          targetIncome: ({
            targetIncome,
            projectedIncome
          }: FinancialsSummaryType) => (
            <TableTarget
              targetIncome={targetIncome}
              projectedIncome={projectedIncome}
            />
          ),
          actions: () => <Actions />
        }}
      />
    </Table>
  )
}
function getPercentage(target: number, actual: number) {
  const difference = target - actual
  const percentage = (difference / target) * 100
  return Math.round(percentage)
}

function TableLink({ data }: { data: any }) {
  return (
    <Link to={`${Routes.CLIENTS}/${data.id}`}>
      {data.first_name} {data.last_name}
    </Link>
  )
}

function TableTarget({
  targetIncome = 0,
  projectedIncome = 0
}: {
  targetIncome: number
  projectedIncome: number
}) {
  const percentage = getPercentage(targetIncome, projectedIncome)
  const isNegative = getPercentage(targetIncome, projectedIncome) < 0
  return (
    <div className="percentage">
      <span>{targetIncome ? `${Math.ceil(targetIncome)} AED` : '-'}</span>
      <span
        className={(isNegative ? 'percentage__red' : 'percentage__green') || ''}
      >
        {targetIncome ? ` (${isNegative ? '' : '+'}${percentage}%)` : ''}
      </span>
    </div>
  )
}
function Actions() {
  return (
    <div className="table-actions">
      {ACTIONS.map((a, index) => (
        <IconButton key={index} size="sm">
          <a.icon />
        </IconButton>
      ))}
    </div>
  )
}
