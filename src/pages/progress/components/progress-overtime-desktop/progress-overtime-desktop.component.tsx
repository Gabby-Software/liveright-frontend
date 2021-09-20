import { useContext } from 'react'

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
import { OVER_TIME, PROGRESS_LOG } from '../../progress.constants'
import HealthChart from '../progress-chart/progress-chart.component'
import ProgressHealthDataContext from '../progress-health-data/progress-health-data.context'
import HealthTable from '../progress-table/progress-table.component'
import { FilterWrapper, Wrapper } from './progress-overtime-desktop.styles'

interface Props {
  filterOptions: OptionType[]
  graphView: boolean
  setGraphView: (value: boolean) => void
}

export default function OverTimeDesktop({
  filterOptions,
  graphView,
  setGraphView
}: Props) {
  const { t } = useTranslation()
  const { onOnlyInclude, onlyInclude, onFilters, filters } = useContext(
    ProgressHealthDataContext
  )

  const handleSwitchViewClick = () => {
    setGraphView(!graphView)
  }

  const renderDataContent = () => {
    return graphView ? (
      <HealthChart onClose={() => setGraphView(false)} />
    ) : (
      <HealthTable />
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
            {filters.range === OVER_TIME.SPECIFIC && (
              <>
                <DatePicker
                  id="progress-from"
                  value={filters.from_date}
                  onChange={(e, date) => onFilters('from_date', date)}
                  placeholder={t('from')}
                  className="progress-overtime__form-item progress-overtime__form-item_date"
                />
                <DatePicker
                  id="progress-to"
                  value={filters.to_date}
                  onChange={(e, date) => onFilters('to_date', date)}
                  placeholder={t('to')}
                  className="progress-overtime__form-item progress-overtime__form-item_date"
                />
              </>
            )}

            <Select
              id="progress-range"
              value={filters.range}
              options={filterOptions}
              onChange={(e) => onFilters('range', e)}
              className="progress-overtime__form-item progress-overtime__form-item_select"
            />
          </FilterWrapper>
        </div>
      </div>

      <Tabs
        activeKey={onlyInclude}
        onChange={(key: any) => onOnlyInclude(key)}
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
