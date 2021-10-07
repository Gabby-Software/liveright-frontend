import moment from 'moment'
import { useState } from 'react'
import { useParams } from 'react-router'

import {
  BackCamIcon,
  FrontCamIcon,
  SidesIcon
} from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import Card from '../../../../../../components/cards/card/card.component'
import PhotoCard from '../../../../../../components/cards/photo-card/photo-card.component'
import DatePicker from '../../../../../../components/form/date-picker/date-picker.component'
import { EmptyPlaceholder } from '../../../../../../components/placeholders'
import Tabs from '../../../../../../components/tabs/tabs.component'
import { Subtitle } from '../../../../../../components/typography'
import useMeasurements from '../../../../../../hooks/api/progress/useMeasurements'
import { DATE_FORMAT, MONTH_RENDER_FORMAT } from '../../../../../../utils/date'
import { Styles } from './compare-photos.styles'

const TABS = [
  {
    icon: <FrontCamIcon />,
    label: 'Front',
    key: 'front',
    renderContent: () => <></>
  },
  {
    icon: <BackCamIcon />,
    label: 'Back',
    key: 'back',
    renderContent: () => <></>
  },
  {
    icon: <SidesIcon />,
    label: 'Side',
    key: 'side',
    renderContent: () => <></>
  }
]

export default function ComparePhotos() {
  const params = useParams<any>()
  const [activeTab, setActiveTab] = useState('front')

  const measurementFrom = useMeasurements({
    per_page: 1,
    filter: {
      account_id: params.id
    },
    requireDate: true
  })
  const measurementTo = useMeasurements({
    per_page: 1,
    filter: {
      account_id: params.id
    },
    requireDate: true
  })

  const from = measurementFrom.measurements[0] || {}
  const to = measurementTo.measurements[0] || {}

  return (
    <Styles>
      <div>
        <Subtitle>Compare Photos</Subtitle>

        <div className="compare-photos__container">
          <DatePicker
            id="measurements-compare-from"
            placeholder="Compare"
            className="compare-photos__field"
            value={measurementFrom.filters.date}
            onChange={(e, date) => measurementFrom.onFilters('date', date)}
          />
          <DatePicker
            id="measurements-compare-to"
            placeholder="With"
            className="compare-photos__field"
            value={measurementTo.filters.date}
            onChange={(e, date) => measurementTo.onFilters('date', date)}
          />
          <Button variant="secondary" className="compare-photos__button">
            Compare
          </Button>
        </div>
      </div>

      <Tabs
        justify="between"
        activeKey={activeTab}
        onChange={setActiveTab}
        tabs={TABS}
      />

      <Card className="compare-photos__card">
        {measurementTo.filters.date && measurementFrom.filters.date ? (
          <>
            <PhotoCard
              key={activeTab + '_from'}
              img={from.images?.[activeTab]}
              title={
                from.date
                  ? moment(from.date, DATE_FORMAT).format(MONTH_RENDER_FORMAT)
                  : '-'
              }
            />

            <div className="compare-photos__divider">VS</div>

            <PhotoCard
              key={activeTab + '_to'}
              img={to.images?.[activeTab]}
              title={
                to.date
                  ? moment(to.date, DATE_FORMAT).format(MONTH_RENDER_FORMAT)
                  : '-'
              }
            />
          </>
        ) : (
          <EmptyPlaceholder spacing text="Select dates to compare" />
        )}
      </Card>
    </Styles>
  )
}
