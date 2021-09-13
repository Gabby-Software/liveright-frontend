import { Form, Formik } from 'formik'
import React from 'react'

import { GraphIcon } from '../../../../assets/media/icons'
import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as CardiogramIcon } from '../../../../assets/media/icons/cardiogram.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import Button from '../../../../components/buttons/button/button.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Select from '../../../../components/form/select/select.component'
import Tabs from '../../../../components/tabs/tabs.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { OptionType } from '../../../../types/option.type'
import { PaginatedDataType } from '../../../../types/paginated-data.type'
import { OVER_TIME, PROGRESS_LOG } from '../../progress.constants'
import {
  HealthData as HealthDataType,
  OverTimeType,
  ProgressLogType
} from '../../progress.types'
import HealthChart from '../progress-chart/progress-chart.component'
import HealthMobileCards from '../progress-mobile-cards/progress-mobile-cards.component'
import {
  FilterWrapper,
  TableWrapper,
  Wrapper
} from './progress-overtime-mobile.styles'

interface Props {
  filter: OverTimeType
  setFilter: (value: OverTimeType) => void
  filterOptions: OptionType[]
  graphView: boolean
  setGraphView: (value: boolean) => void
  activeTab: ProgressLogType
  setActiveTab: (value: ProgressLogType) => void
  data: PaginatedDataType<HealthDataType>
  specificDates: { from_date: string; to_date: string }
  onSpecificDateChange: (name: string, date: string) => void
  onPageChange: (page?: number) => void
}

const OverTimeMobile: React.FC<Props> = (props) => {
  const {
    filter,
    setFilter,
    filterOptions,
    graphView,
    setGraphView,
    activeTab,
    setActiveTab,
    specificDates,
    onSpecificDateChange,
    onPageChange,
    data
  } = props
  const { t } = useTranslation()

  const handleSwitchViewClick = () => {
    setGraphView(!graphView)
  }

  const renderDataContent = () => () => {
    return (
      <div>
        {graphView ? (
          <HealthChart />
        ) : (
          <HealthMobileCards
            data={data}
            activeTab={activeTab}
            onPageChange={onPageChange}
          />
        )}
      </div>
    )
  }

  return (
    <Wrapper>
      <div className="progress__subtitle-container">
        <h3 className="progress__subtitle">{t('progress:overTime')}</h3>

        <Button
          variant="text"
          onClick={handleSwitchViewClick}
          className="progress__chart-btn"
        >
          <GraphIcon />
          <span>
            {graphView ? t('progress:seeCards') : t('progress:seeGraph')}
          </span>
        </Button>
      </div>

      <FilterWrapper>
        <Select
          id="progress-over-due"
          value={filter}
          options={filterOptions}
          onChange={(value) => setFilter(value as OverTimeType)}
        />

        <Formik
          enableReinitialize
          initialValues={specificDates}
          onSubmit={() => {}}
        >
          {filter === OVER_TIME.SPECIFIC && (
            <Form className="progress__form">
              <DatePicker
                id="progress-from-date"
                onChange={(e, date) => onSpecificDateChange('from_date', date)}
                placeholder={t('from')}
                className="progress__form-item"
              />
              <DatePicker
                id="progress-to-date"
                onChange={(e, date) => onSpecificDateChange('to_date', date)}
                placeholder={t('to')}
                className="progress__form-item"
              />
            </Form>
          )}
        </Formik>
      </FilterWrapper>

      <TableWrapper>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as ProgressLogType)}
          tabPosition="top"
          tabs={[
            {
              icon: <SleepIcon />,
              label: t('progress:sleep'),
              key: PROGRESS_LOG.SLEEP,
              renderContent: renderDataContent()
            },
            {
              icon: <CardiogramIcon />,
              label: t('progress:heart_rate'),
              key: PROGRESS_LOG.HEART_RATE,
              renderContent: renderDataContent()
            },
            {
              icon: <StepsIcon />,
              label: t('progress:steps'),
              key: PROGRESS_LOG.STEPS,
              renderContent: renderDataContent()
            },
            {
              icon: <BloodIcon />,
              label: t('progress:blood_glucose'),
              key: PROGRESS_LOG.GLICOSE,
              renderContent: renderDataContent()
            }
          ]}
        />
      </TableWrapper>
    </Wrapper>
  )
}

export default OverTimeMobile
