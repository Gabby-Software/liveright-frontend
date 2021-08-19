import React from 'react'

import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as CardiogramIcon } from '../../../../assets/media/icons/cardiogram.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import { FormSelectUI } from '../../../../components/forms/form-select/form-select.component'
import Tabs from '../../../../components/tabs/tabs.component'
import PageSubtitle from '../../../../components/titles/page-subtitle.styles'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { OptionType } from '../../../../types/option.type'
import { PROGRESS_LOG } from '../../progress.constants'
import { OverTimeType } from '../../progress.types'
import HealthChart from '../progress-chart/progress-chart.component'
import HealthTable from '../progress-table/progress-table.component'
import {
  FilterWrapper,
  SwitchViewButton,
  TableWrapper,
  Wrapper
} from './progress-overtime-desktop.styles'

interface Props {
  filter: OverTimeType
  setFilter: (value: OverTimeType) => void
  filterOptions: OptionType[]
  graphView: boolean
  setGraphView: (value: boolean) => void
}

const OverTimeDesktop: React.FC<Props> = (props) => {
  const { filter, setFilter, filterOptions, graphView, setGraphView } = props
  const { t } = useTranslation()

  const handleSwitchViewClick = () => {
    setGraphView(!graphView)
  }

  const renderDataContent = () => () => {
    return graphView ? <HealthChart /> : <HealthTable />
  }

  return (
    <Wrapper>
      <PageSubtitle>{t('progress:overTime')}</PageSubtitle>
      <FilterWrapper>
        <FormSelectUI
          name="overTime"
          value={filter}
          label=""
          options={filterOptions}
          onUpdate={(value) => setFilter(value as OverTimeType)}
        />
        <SwitchViewButton onClick={handleSwitchViewClick} type="link">
          {graphView ? t('progress:seeTable') : t('progress:seeGraph')}
        </SwitchViewButton>
      </FilterWrapper>
      <TableWrapper>
        <Tabs
          tabPosition="left"
          tabs={[
            {
              icon: <SleepIcon />,
              label: t('progress:sleep'),
              key: PROGRESS_LOG.SLEEP,
              renderContent: renderDataContent()
            },
            {
              icon: <CardiogramIcon />,
              label: t('progress:heartRate'),
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
              label: t('progress:bloodGlicose'),
              key: PROGRESS_LOG.GLICOSE,
              renderContent: renderDataContent()
            }
          ]}
        />
      </TableWrapper>
    </Wrapper>
  )
}

export default OverTimeDesktop
