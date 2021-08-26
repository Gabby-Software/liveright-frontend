import { Space } from 'antd'
import { Form, Formik } from 'formik'
import React from 'react'

import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as CardiogramIcon } from '../../../../assets/media/icons/cardiogram.svg'
import { ReactComponent as TableIcon } from '../../../../assets/media/icons/menu.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import FormDatepicker from '../../../../components/forms/form-datepicker/form-datepicker.component'
import { FormSelectUI } from '../../../../components/forms/form-select/form-select.component'
import Tabs from '../../../../components/tabs/tabs.component'
import PageSubtitle from '../../../../components/titles/page-subtitle.styles'
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
import HealthTable from '../progress-table/progress-table.component'
import {
  FilterWrapper,
  SwitchViewButton,
  Wrapper
} from './progress-overtime-desktop.styles'

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

const OverTimeDesktop: React.FC<Props> = (props) => {
  const {
    filter,
    setFilter,
    filterOptions,
    graphView,
    setGraphView,
    activeTab,
    setActiveTab,
    data,
    specificDates,
    onSpecificDateChange,
    onPageChange
  } = props
  const { t } = useTranslation()

  const handleSwitchViewClick = () => {
    setGraphView(!graphView)
  }

  const renderDataContent = () => {
    return graphView ? (
      <HealthChart />
    ) : (
      <HealthTable
        onPageChange={onPageChange}
        data={data}
        activeTab={activeTab}
      />
    )
  }

  return (
    <Wrapper>
      <div className={'progress-overtime__header'}>
        <PageSubtitle>{t('progress:overTime')}</PageSubtitle>
        <SwitchViewButton onClick={handleSwitchViewClick} type="link">
          {graphView ? <TableIcon /> : <CardiogramIcon />}
          {graphView ? t('progress:seeTable') : t('progress:seeGraph')}
        </SwitchViewButton>
        <FilterWrapper>
          <FormSelectUI
            name="overTime"
            value={filter}
            label=""
            options={filterOptions}
            onUpdate={(value) => setFilter(value as OverTimeType)}
          />
          <Formik
            enableReinitialize
            initialValues={specificDates}
            onSubmit={() => {}}
          >
            {filter === OVER_TIME.SPECIFIC ? (
              <Form>
                <Space>
                  <FormDatepicker
                    onUpdate={onSpecificDateChange}
                    name="from_date"
                    label={t('from')}
                  />
                  <FormDatepicker
                    onUpdate={onSpecificDateChange}
                    name="to_date"
                    label={t('to')}
                  />
                </Space>
              </Form>
            ) : null}
          </Formik>
        </FilterWrapper>
      </div>
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as ProgressLogType)}
        tabs={[
          {
            icon: <SleepIcon />,
            label: t('progress:sleep'),
            key: PROGRESS_LOG.SLEEP,
            renderContent: renderDataContent
          },
          {
            icon: <CardiogramIcon />,
            label: t('progress:heart_rate_short'),
            key: PROGRESS_LOG.HEART_RATE,
            renderContent: renderDataContent
          },
          {
            icon: <StepsIcon />,
            label: t('progress:steps'),
            key: PROGRESS_LOG.STEPS,
            renderContent: renderDataContent
          },
          {
            icon: <BloodIcon />,
            label: t('progress:blood_glucose'),
            key: PROGRESS_LOG.GLICOSE,
            renderContent: renderDataContent
          }
        ]}
      />
    </Wrapper>
  )
}

export default OverTimeDesktop
