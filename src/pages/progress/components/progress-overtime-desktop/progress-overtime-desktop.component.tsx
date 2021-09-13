import { FC } from 'react'

import {
  GraphIcon,
  HeartRateV2Icon,
  MenuIcon
} from '../../../../assets/media/icons'
import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
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
import HealthTable from '../progress-table/progress-table.component'
import { FilterWrapper, Wrapper } from './progress-overtime-desktop.styles'

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

const OverTimeDesktop: FC<Props> = (props) => {
  const {
    filter,
    setFilter,
    filterOptions,
    graphView,
    setGraphView,
    activeTab,
    setActiveTab,
    data,
    // specificDates,
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
      <div className="progress-overtime__header">
        <h3 className="progress-overtime__title">{t('progress:overTime')}</h3>

        <div className="progress-overtime__header-filters">
          <Button
            variant="text"
            onClick={handleSwitchViewClick}
            className="progress-overtime__toggle-btn"
          >
            {graphView ? <MenuIcon /> : <GraphIcon />}
            <span>
              {graphView ? t('progress:seeTable') : t('progress:seeGraph')}
            </span>
          </Button>

          <FilterWrapper>
            {filter === OVER_TIME.SPECIFIC && (
              <>
                <DatePicker
                  id="progress-from"
                  onChange={(e, date) =>
                    onSpecificDateChange('from_date', date)
                  }
                  placeholder={t('from')}
                  className="progress-overtime__form-item progress-overtime__form-item_date"
                />
                <DatePicker
                  id="progress-to"
                  onChange={(e, date) => onSpecificDateChange('to_date', date)}
                  placeholder={t('to')}
                  className="progress-overtime__form-item progress-overtime__form-item_date"
                />
              </>
            )}

            <Select
              id="progress-range"
              value={filter}
              options={filterOptions}
              onChange={(value) => setFilter(value as OverTimeType)}
              className="progress-overtime__form-item progress-overtime__form-item_select"
            />
          </FilterWrapper>
        </div>
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
            icon: <HeartRateV2Icon />,
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
