import React from 'react'

import Tabs from '../../../components/tabs/tabs.component'
import { useTitleContent } from '../../../layouts/desktop-layout/desktop-layout.component'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import HealthData from '../components/progress-health-data/progress-health-data.component'
import TitleButton from '../components/progress-title-button/progress-title-button.component'
import { PROGRESS_SECTIONS } from '../progress.constants'
import { Wrapper } from './progress-desktop.styles'

const ProgressDesktop = () => {
  const { t } = useTranslation()

  useTitleContent(<TitleButton onMenuClick={() => {}} />)

  const renderHealthData = () => {
    return <HealthData />
  }

  const renderMeasurements = () => {
    return <div>TBD</div>
  }

  return (
    <Wrapper>
      <Tabs
        tabs={[
          {
            label: t('progress:sections.healthData'),
            renderContent: renderHealthData,
            key: PROGRESS_SECTIONS.HEALTH_DATA
          },
          {
            label: t('progress:sections.measurements'),
            renderContent: renderMeasurements,
            key: PROGRESS_SECTIONS.MEASUREMENTS
          }
        ]}
      />
    </Wrapper>
  )
}

export default ProgressDesktop
