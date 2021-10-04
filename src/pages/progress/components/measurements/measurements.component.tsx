import { useState } from 'react'
import { useParams } from 'react-router'

import { CalendarIcon, MenuIcon } from '../../../../assets/media/icons'
import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import PhotoCard from '../../../../components/cards/photo-card/photo-card.component'
import ProgressLogCard from '../../../../components/cards/progress-log-card/progress-log-card.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import DataTable from '../../../../components/data-table/data-table.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../../../components/placeholders'
import Tabs from '../../../../components/tabs/tabs.component'
import { Subtitle } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import useMeasurements from '../../../../hooks/api/progress/useMeasurements'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { isClient } from '../../../../utils/api/auth'
import { getTotal } from '../../../../utils/api/progress'
import { getRoute } from '../../../../utils/routes'
import Filters from '../filters/filters.component'
import TablePagination from '../table-pagination/table-pagination.component'
import { Styles } from './measurements.styles'

const PHOTO_1 =
  'https://www.scotsman.com/images-e.jpimedia.uk/imagefetch/http://www.scotsman.com/webimage/Prestige.Item.1.74151213!image/image.jpg?crop=982:524,smart&width=990'
const PHOTO_2 =
  'https://i.pinimg.com/736x/48/27/13/4827136674d8a27403fd2591dabc5453.jpg'

export default function Measurements() {
  const isMobile = useIsMobile()
  const params = useParams<any>()
  const { type } = useAuth()
  const [activeTab, setActiveTab] = useState('summary')

  const { measurements, isLoading, meta, filters, onFilters } = useMeasurements(
    {
      filter: {
        account_id: params.id,
        range: 'month'
      }
    }
  )

  const logTo = isClient(type)
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
                  reportedBy: (data) => <span>{data.created_by || '-'}</span>,
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
              <ProgressLogCard key={index} quality="" {...row} />
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

      <div>
        <Subtitle>Compare Photos</Subtitle>

        <div className="measurements__photo-filters">
          <DatePicker
            id="measurements-compare-from"
            placeholder="Compare"
            className="measurements__photo-filters-field"
          />
          <DatePicker
            id="measurements-compare-to"
            placeholder="With"
            className="measurements__photo-filters-field"
          />
          <Button
            variant="secondary"
            className="measurements__photo-filters-button"
          >
            Compare
          </Button>
        </div>
      </div>

      <Tabs
        activeKey=""
        onChange={() => {}}
        tabs={[
          {
            icon: <MenuIcon />,
            label: 'Front',
            key: 'Front',
            renderContent: () => <></>
          },
          {
            icon: <CalendarIcon />,
            label: 'Back',
            key: 'back',
            renderContent: () => <></>
          },
          {
            icon: <StepsIcon />,
            label: 'Side',
            key: 'side',
            renderContent: () => <></>
          }
        ]}
      />

      <Card className="measurements__photo-card">
        <PhotoCard img={PHOTO_1} title="Spetember 3rd, 2021" />

        <div className="measurements__photo-divider">VS</div>

        <PhotoCard img={PHOTO_2} title="October 3rd, 2021" />
      </Card>
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
