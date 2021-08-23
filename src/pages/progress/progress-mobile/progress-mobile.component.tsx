import map from 'lodash/map'
import React, { useState } from 'react'

import FormButton from '../../../components/forms/form-button/form-button.component'
import SmallModal from '../../../components/small-modal/small-modal.component'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import HealthData from '../components/progress-health-data/progress-health-data.component'
import { PROGRESS_SECTIONS } from '../progress.constants'
import { ProgressSectionsType } from '../progress.types'
import { StyledTabs, Wrapper } from './progress-mobile.styles'

interface Props {
  onLogClick: (value: ProgressSectionsType) => void
}

const ProgressMobile: React.FC<Props> = (props) => {
  const { onLogClick } = props
  const { t } = useTranslation()
  const [logModal, setLogModal] = useState(false)

  const renderHealthData = () => {
    return <HealthData />
  }

  const renderMeasurements = () => {
    return <div>123</div>
  }

  return (
    <Wrapper>
      <FormButton onClick={() => setLogModal(true)} type="primary">
        {t('progress:sections.log')}
      </FormButton>
      <StyledTabs
        tabs={[
          {
            label: t('progress:sections.health_data'),
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
      <SmallModal
        onCancel={() => setLogModal(false)}
        visible={logModal}
        title={t('progress:sections.log')}
        menu={map(PROGRESS_SECTIONS, (value) => ({
          name: t(`progress:sections.${value}`),
          onClick: () => onLogClick(value)
        }))}
      />
    </Wrapper>
  )
}

export default ProgressMobile
