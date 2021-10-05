import React, { useState } from 'react'

import Card from '../../../../components/cards/card/card.component'
import { FormToggleUI } from '../../../../components/forms/form-toggle/form-toggle.component'
// import { useTranslation } from '../../../modules/i18n/i18n.hook'
import Styles from './settings-metrics.styles'

const MetricsSettings = () => {
  const [email, setEmail] = useState<boolean>(true)
  const [kg, setKg] = useState<boolean>(false)
  // const { t } = useTranslation()
  return (
    <Styles>
      <div className="settings__cards">
        <Card className="settings-item">
          <h3 className="settings-item__title">Metric System</h3>

          <div className="settings-item__divider" />

          <div className="settings-item__actions">
            <div className="settings-item__action">
              <FormToggleUI
                label={'Email'}
                value={email}
                onUpdate={(val) => setEmail(val)}
              />
            </div>
            <div className="settings-item__action">
              <FormToggleUI
                label={'Kg'}
                value={kg}
                onUpdate={(val) => setKg(val)}
              />
            </div>
          </div>
        </Card>
      </div>
    </Styles>
  )
}

export default MetricsSettings
