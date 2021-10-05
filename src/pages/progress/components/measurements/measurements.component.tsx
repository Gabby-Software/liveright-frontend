import { useState } from 'react'
import { useParams } from 'react-router'

import { CalendarIcon, MenuIcon } from '../../../../assets/media/icons'
import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import Card from '../../../../components/cards/card/card.component'
import ProgressLogCard from '../../../../components/cards/progress-log-card/progress-log-card.component'
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
import ComparePhotos from './components/compare-photos/compare-photos.component'
import { Styles } from './measurements.styles'

export default function Measurements() {
  const isMobile = useIsMobile()
  const params = useParams<any>()
  const auth = useAuth()
  const [activeTab, setActiveTab] = useState('summary')

  const { measurements, isLoading, meta, filters, onFilters } = useMeasurements(
    {
      filter: {
        account_id: params.id,
        range: 'month'
      }
    }
  )

  const logTo = isClient(auth.type)
    ? getRoute(Routes.PROGRESS_CLIENT_LOG_MEASUREMENTS)
    : getRoute(Routes.PROGRESS_LOG_MEASUREMENTS, { id: params.id })

  const placeholders = isLoading ? (
    <LoadingPlaceholder spacing />
  ) : !measurements.length ? (
    <EmptyPlaceholder spacing />
  ) : null

  return (
    <Styles>
      <Filters
        onView={() => {}}
        isGraph={false}
        filters={filters}
        onFilters={onFilters}
      />

      <Tabs
        className="measurements__tabs"
        activeKey={activeTab}
        onChange={setActiveTab}
        tabs={[
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
        ]}
      />

      <div className="measurements__content">
        {!isMobile ? (
          <Card className="measurements__table-card">
            <div className="measurements__table-container">
              <DataTable
                className="measurements__table"
                labels={getLabels(activeTab)}
                keys={getKeys(activeTab)}
                data={measurements}
                render={{
                  date: (data) => <span>{data.date || '-'}</span>,
                  reportedBy: (data) => (
                    <span>
                      {data.created_by === auth.id ? 'You' : 'Trainer'}
                    </span>
                  ),
                  weight: (data) => (
                    <span>
                      {data.weight_lbs || '-'}/{data.weight_kgs || '-'} kg
                    </span>
                  ),
                  circumference: (data) => (
                    <span>
                      {data.measurements
                        ? getTotal(data, 'circumference') || '-'
                        : '-'}
                    </span>
                  ),
                  skinfold: (data) => (
                    <span>
                      {data.measurements
                        ? getTotal(data, 'skin_fold') || '-'
                        : '-'}
                    </span>
                  ),
                  bodyFat: (data) => <span>{data.body_fat || '-'}</span>,
                  fatMass: (data) => <span>{data.fat_mass || '-'}</span>,
                  leanMass: (data) => <span>{data.lean_mass || '-'}</span>
                }}
              />
            </div>

            {placeholders}

            <TablePagination
              logTo={logTo}
              page={meta.current_page}
              onPage={() => {}}
              total={meta.total}
            />
          </Card>
        ) : (
          <div>
            {measurements.map((row, index) => (
              <ProgressLogCard
                key={index}
                quality=""
                weight={`${row.weight_lbs || '-'}/${row.weight_kgs || '-'} kg`}
                circumference={
                  row.measurements ? getTotal(row, 'circumference') || '-' : '-'
                }
                skinfold={
                  row.measurements ? getTotal(row, 'skin_fold') || '-' : '-'
                }
                bodyFat={row.body_fat || '-'}
                fatMass={row.fat_mass || '-'}
                leanMass={row.lean_mass || '-'}
                loggedBy={row.created_by}
                {...row}
              />
            ))}

            {placeholders}

            <DataPagination
              page={meta.current_page}
              setPage={() => {}}
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

function getLabels(activeTab: string): string[] {
  switch (activeTab) {
    case 'check_in':
      return ['Date', 'Reported By', 'Weight(lbs/kg)']
    case 'skin_fold':
      return [
        'Date',
        'Reported By',
        'Weight(lbs/kg)',
        'Skinfold',
        'Body Fat%',
        'Fat Mass(kg)',
        'Lean Mass(kg)'
      ]
    case 'circumference':
      return ['Date', 'Reported By', 'Weight(lbs/kg)', 'Circumference']
    default:
      return [
        'Date',
        'Reported By',
        'Weight(lbs/kg)',
        'Circumference',
        'Skinfold',
        'Body Fat%',
        'Fat Mass(kg)',
        'Lean Mass(kg)'
      ]
  }
}
