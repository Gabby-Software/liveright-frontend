import map from 'lodash/map'
import React, { useState } from 'react'

import { CaretDownIcon } from '../../../assets/media/icons'
import FormButton from '../../../components/forms/form-button/form-button.component'
import SmallModal from '../../../components/small-modal/small-modal.component'
import { Routes } from '../../../enums/routes.enum'
import HeaderLink from '../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import ClientInfoMobile from '../components/client-info-mobile/client-info-mobile.component'
import HealthData from '../components/progress-health-data/progress-health-data.component'
import { PROGRESS_SECTIONS } from '../progress.constants'
import { ProgressSectionsType } from '../progress.types'
import { HeaderAction, StyledTabs, Wrapper } from './progress-mobile.styles'

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
    <MobilePage
      title="Client Progress"
      headerTopComponent={
        <HeaderLink to={Routes.PROGRESS_CLIENTS}>
          Return to Progress & Metrics
        </HeaderLink>
      }
      actionComponent={
        <HeaderAction>
          Log Data
          <CaretDownIcon />
        </HeaderAction>
      }
      headerSpacing={25}
    >
      <Wrapper>
        <ClientInfoMobile />

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
    </MobilePage>
  )
}

export default ProgressMobile
