import { useContext } from 'react'

import { HeartRateV2Icon } from '../../../../assets/media/icons'
import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import Tabs from '../../../../components/tabs/tabs.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { PROGRESS_LOG } from '../../progress.constants'
import Filters from '../filters/filters.component'
import HealthChart from '../progress-chart/progress-chart.component'
import ProgressHealthDataContext from '../progress-health-data/progress-health-data.context'
import HealthTable from '../progress-table/progress-table.component'
import { Wrapper } from './progress-overtime-desktop.styles'

interface Props {
  graphView: boolean
  setGraphView: (value: boolean) => void
}

export default function OverTimeDesktop({ graphView, setGraphView }: Props) {
  const { t } = useTranslation()
  const { onOnlyInclude, onlyInclude, onFilters, filters } = useContext(
    ProgressHealthDataContext
  )

  const renderDataContent = () => {
    return graphView ? (
      <HealthChart onClose={() => setGraphView(false)} />
    ) : (
      <HealthTable />
    )
  }

  return (
    <Wrapper>
      <Filters
        onView={() => setGraphView(!graphView)}
        isGraph={graphView}
        filters={filters}
        onFilters={onFilters}
      />

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
