import React, { useContext } from 'react'

import { GraphIcon, HeartRateV2Icon } from '../../../../assets/media/icons'
import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import Button from '../../../../components/buttons/button/button.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Select from '../../../../components/form/select/select.component'
import Tabs from '../../../../components/tabs/tabs.component'
// import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { OptionType } from '../../../../types/option.type'
import { OVER_TIME, PROGRESS_LOG } from '../../progress.constants'
import HealthChart from '../progress-chart/progress-chart.component'
import ProgressHealthDataContext from '../progress-health-data/progress-health-data.context'
import HealthMobileCards from '../progress-mobile-cards/progress-mobile-cards.component'
import {
  FilterWrapper,
  TableWrapper,
  Wrapper
} from './progress-overtime-mobile.styles'

interface Props {
  filterOptions: OptionType[]
  graphView: boolean
  setGraphView: (value: boolean) => void
}

export default function OverTimeMobile({
  filterOptions,
  graphView,
  setGraphView
}: Props) {
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  const handleSwitchViewClick = () => {
    setGraphView(!graphView)
  }

  const { filters, onlyInclude, onFilters, onOnlyInclude } = useContext(
    ProgressHealthDataContext
  )

  const renderDataContent = () => () => {
    return (
      <div>
        {graphView ? (
          <HealthChart onClose={() => setGraphView(false)} />
        ) : (
          <HealthMobileCards />
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
          value={filters.range}
          options={filterOptions}
          onChange={(e) => onFilters('range', e)}
        />

        {filters.range === OVER_TIME.SPECIFIC && (
          <div className="progress__form">
            <DatePicker
              id="progress-from-date"
              onChange={(e, date) => onFilters('from_date', date)}
              placeholder={t('from')}
              className="progress__form-item"
            />
            <DatePicker
              id="progress-to-date"
              onChange={(e, date) => onFilters('to_date', date)}
              placeholder={t('to')}
              className="progress__form-item"
            />
          </div>
        )}
      </FilterWrapper>

      <TableWrapper>
        <Tabs
          activeKey={onlyInclude}
          onChange={(key: any) => onOnlyInclude(key)}
          tabPosition="top"
          tabs={[
            {
              icon: <SleepIcon />,
              label: t('progress:sleep'),
              key: PROGRESS_LOG.SLEEP,
              renderContent: renderDataContent()
            },
            {
              icon: <HeartRateV2Icon />,
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
              label: t(
                isMobile
                  ? 'progress:blood_glucose_mobile'
                  : 'progress:blood_glucose'
              ),
              key: PROGRESS_LOG.GLICOSE,
              renderContent: renderDataContent()
            }
          ]}
        />
      </TableWrapper>
    </Wrapper>
  )
}
