import { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import {
  CalendarIcon,
  EditIcon,
  MenuIcon
} from '../../../../assets/media/icons'
import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import Card from '../../../../components/cards/card/card.component'
import ProgressLogCard, {
  ProgressLogCardRow
} from '../../../../components/cards/progress-log-card/progress-log-card.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import DataTable from '../../../../components/data-table/data-table.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../../../components/placeholders'
import Tabs from '../../../../components/tabs/tabs.component'
import { Routes } from '../../../../enums/routes.enum'
import useMeasurements from '../../../../hooks/api/progress/useMeasurements'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { isClient } from '../../../../utils/api/auth'
import { getTotal } from '../../../../utils/api/progress'
import { getRoute } from '../../../../utils/routes'
import Filters from '../filters/filters.component'
import TablePagination from '../table-pagination/table-pagination.component'
import Chart from './components/chart/chart.component'
import ComparePhotos from './components/compare-photos/compare-photos.component'
import { Styles } from './measurements.styles'

const ROW_LABELS: any = {
  date: 'Date',
  reportedBy: 'Reported By',
  weight: 'Weight',
  skinfold: 'Skinfold',
  bodyFat: 'Body Fat (%)',
  fatMass: 'Fat Mass (kg)',
  leanMass: 'Lean Mass (kg)',
  circumference: 'Circumference'
}

const VALUE_GETTER: any = {
  date: (data: any) => <span>{data.date || '-'}</span>,
  weight: (data: any) => (
    <span>
      {data.weight_lbs || '-'}/{data.weight_kgs || '-'} kg
    </span>
  ),
  circumference: (data: any) => (
    <span>
      {data.measurements ? getTotal(data, 'circumference') || '-' : '-'}
    </span>
  ),
  skinfold: (data: any) => (
    <span>{data.measurements ? getTotal(data, 'skin_fold') || '-' : '-'}</span>
  ),
  bodyFat: (data: any) => (
    <span>{data.body_fat ? `${data.body_fat}%` : '-'}</span>
  ),
  fatMass: (data: any) => (
    <span>{data.fat_mass ? `${data.fat_mass} kg` : '-'}</span>
  ),
  leanMass: (data: any) => (
    <span>{data.lean_mass ? `${data.lean_mass} kg` : '-'}</span>
  )
}

const TABS = [
  {
    icon: <MenuIcon />,
    label: 'Summary',
    key: 'summary',
    renderContent: () => <></>
  },
  {
    icon: <CalendarIcon />,
    label: 'Check-In',
    key: 'check_in',
    renderContent: () => <></>
  },
  {
    icon: <StepsIcon />,
    label: 'Circumference',
    key: 'circumference',
    renderContent: () => <></>
  },
  {
    icon: <BloodIcon />,
    label: 'Skinfold',
    key: 'skin_fold',
    renderContent: () => <></>
  }
]

export default function Measurements() {
  const isMobile = useIsMobile()
  const params = useParams<any>()
  const auth = useAuth()
  const [activeTab, setActiveTab] = useState('summary')
  const [isGraph, setGraph] = useState(false)

  const { measurements, isLoading, meta, filters, onFilters, onPage } =
    useMeasurements({
      filter: {
        account_id: params.clientId,
        range: 'month'
      }
    })

  const logTo = (logId?: string) =>
    isClient(auth.type)
      ? getRoute(Routes.PROGRESS_CLIENT_LOG_MEASUREMENTS, { logId })
      : getRoute(Routes.PROGRESS_LOG_MEASUREMENTS, {
          clientId: params.clientId,
          logId
        })

  const keys = getKeys(activeTab)

  const placeholders = isLoading ? (
    <LoadingPlaceholder spacing />
  ) : !measurements.length ? (
    <EmptyPlaceholder spacing />
  ) : null

  return (
    <Styles>
      <Filters
        onView={() => setGraph(!isGraph)}
        isGraph={isGraph}
        filters={filters}
        onFilters={onFilters}
      />

      {!isGraph && (
        <Tabs
          className="measurements__tabs"
          activeKey={activeTab}
          onChange={setActiveTab}
          tabs={TABS}
        />
      )}

      <div className="measurements__content">
        {isGraph ? (
          <Chart onClose={() => setGraph(false)} data={measurements} />
        ) : !isMobile ? (
          <Card className="measurements__table-card">
            <div className="measurements__table-container">
              <DataTable
                className="measurements__table"
                labels={keys.map((key) => ROW_LABELS[key])}
                keys={keys}
                data={measurements}
                render={{
                  ...VALUE_GETTER,
                  date: (data) => (
                    <Link to={logTo(data.id)}>
                      <span className="measurements__table-edit">
                        {data.date || '-'}
                        <EditIcon />
                      </span>
                    </Link>
                  ),
                  reportedBy: (data) => (
                    <span>
                      {data.created_by === auth.id
                        ? 'You'
                        : isClient(auth.type)
                        ? 'Trainer'
                        : 'Client'}
                    </span>
                  )
                }}
              />
            </div>

            {placeholders}

            <TablePagination
              logTo={logTo()}
              page={meta.current_page}
              onPage={onPage}
              total={meta.total}
            />
          </Card>
        ) : (
          <div>
            {measurements.map((row, index) => (
              <ProgressLogCard
                key={index}
                date={row.date}
                loggedBy={row.created_by}
                quality=""
                component={
                  <ProgressLogCardRows activeTab={activeTab} data={row} />
                }
              />
            ))}

            {placeholders}

            <DataPagination
              page={meta.current_page}
              setPage={onPage}
              total={meta.total}
              justify="center"
            />
          </div>
        )}
      </div>

      <ComparePhotos />
    </Styles>
  )
}

interface ProgressLogCardRowsProps {
  activeTab: string
  data: any
}

function ProgressLogCardRows({ activeTab, data }: ProgressLogCardRowsProps) {
  const keys = getKeys(activeTab).filter((key) => key !== 'reportedBy')
  return (
    <>
      {keys.map((key, index) => (
        <ProgressLogCardRow
          key={index}
          label={ROW_LABELS[key]}
          value={VALUE_GETTER[key] ? VALUE_GETTER[key](data) : '-'}
        />
      ))}
    </>
  )
}

function getKeys(activeTab: string): string[] {
  switch (activeTab) {
    case 'check_in':
      return ['date', 'reportedBy', 'weight']
    case 'skin_fold':
      return [
        'date',
        'reportedBy',
        'weight',
        'skinfold',
        'bodyFat',
        'fatMass',
        'leanMass'
      ]
    case 'circumference':
      return ['date', 'reportedBy', 'weight', 'circumference']
    default:
      return [
        'date',
        'reportedBy',
        'weight',
        'circumference',
        'skinfold',
        'bodyFat',
        'fatMass',
        'leanMass'
      ]
  }
}
