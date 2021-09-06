import React from 'react'

import Tabs from '../../../components/tabs/tabs.component'
import userTypes from '../../../enums/user-types.enum'
import { useAuth } from '../../../hooks/auth.hook'
import { useTitleContent } from '../../../layouts/desktop-layout/desktop-layout.component'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import LogClient from '../../progress-log/log-health-data/components/log-client/log-client.component'
import HealthData from '../components/progress-health-data/progress-health-data.component'
import TitleButton from '../components/progress-title-button/progress-title-button.component'
import { PROGRESS_SECTIONS } from '../progress.constants'
import { ProgressSectionsType } from '../progress.types'
import { Wrapper } from './progress-desktop.styles'

interface Props {
  onLogClick: (value: ProgressSectionsType) => void
}

const ProgressDesktop: React.FC<Props> = (props) => {
  const { onLogClick } = props
  const { t } = useTranslation()
  const { type } = useAuth()

  useTitleContent(<TitleButton onMenuClick={onLogClick} />)

  const renderHealthData = () => {
    return <HealthData />
  }

  const renderMeasurements = () => {
    return <div>TBD</div>
  }

  return (
    <Wrapper>
      {type === userTypes.CLIENT ? null : <LogClient />}
      <Tabs
        tabs={[
          {
            label: t('progress:sections.measurements'),
            renderContent: renderMeasurements,
            key: PROGRESS_SECTIONS.MEASUREMENTS
          },
          {
            label: t('progress:sections.health_data'),
            renderContent: renderHealthData,
            key: PROGRESS_SECTIONS.HEALTH_DATA
          }
        ]}
      />
    </Wrapper>
  )
}

export default ProgressDesktop
