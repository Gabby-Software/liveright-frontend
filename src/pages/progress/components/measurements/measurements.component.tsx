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
import Tabs from '../../../../components/tabs/tabs.component'
import { Subtitle } from '../../../../components/typography'
import { Routes } from '../../../../enums/routes.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { isClient } from '../../../../utils/api/auth'
import { getRoute } from '../../../../utils/routes'
import Filters from '../filters/filters.component'
import TablePagination from '../table-pagination/table-pagination.component'
import { Styles } from './measurements.styles'

const LABELS = [
  'Date',
  'Reported By',
  'Weight(lbs/kg)',
  'Circumference',
  'Skinfold',
  'Body Fat%',
  'Fat Mass(kg)',
  'Lean Mass(kg)'
]

const KEYS = [
  'date',
  'reportedBy',
  'weight',
  'circumference',
  'skinfold',
  'bodyFat',
  'fatMass',
  'leanMass'
]

const PHOTO_1 =
  'https://www.scotsman.com/images-e.jpimedia.uk/imagefetch/http://www.scotsman.com/webimage/Prestige.Item.1.74151213!image/image.jpg?crop=982:524,smart&width=990'
const PHOTO_2 =
  'https://i.pinimg.com/736x/48/27/13/4827136674d8a27403fd2591dabc5453.jpg'

const DATA = [
  {
    date: '2021-03-04',
    reportedBy: 'Frank Trainer',
    weight: '22 / 58 kg',
    circumference: '40 cm',
    skinfold: '48',
    bodyFat: '10',
    fatMass: '0 kg',
    leanMass: '2 kg'
  },
  {
    date: '2021-03-04',
    reportedBy: 'Frank Trainer',
    weight: '22 / 58 kg',
    circumference: '40 cm',
    skinfold: '48',
    bodyFat: '10',
    fatMass: '0 kg',
    leanMass: '2 kg'
  }
]

export default function Measurements() {
  const isMobile = useIsMobile()
  const params = useParams<any>()
  const { type } = useAuth()

  const logTo = isClient(type)
    ? getRoute(Routes.PROGRESS_CLIENT_LOG_MEASUREMENTS)
    : getRoute(Routes.PROGRESS_LOG_MEASUREMENTS, { id: params.id })

  return (
    <Styles>
      <Filters
        onView={() => {}}
        isGraph={false}
        filters={{}}
        onFilters={() => {}}
      />

      <Tabs
        className="measurements__tabs"
        activeKey=""
        onChange={() => {}}
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
            key: 'check-in',
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
            key: 'skinfold',
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
                labels={LABELS}
                keys={KEYS}
                data={DATA}
              />
            </div>

            <TablePagination
              logTo={logTo}
              page={1}
              onPage={() => {}}
              total={1}
            />
          </Card>
        ) : (
          <div>
            {DATA.map((row, index) => (
              <ProgressLogCard key={index} quality="" {...row} />
            ))}

            <DataPagination
              page={1}
              setPage={() => {}}
              total={1}
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
