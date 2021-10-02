import React, { useState } from 'react'

import Card from '../../../components/cards/card/card.component'
import RadioGroup from '../../../components/form/radio-group/radio-group.component'
import LanguagesData from './settings-languages.data'
import Styles from './settings-languages.styles'

const LanguageSettings = () => {
  const [currentValue, setCurrentValue] = useState<string>(
    LanguagesData[0].value
  )
  return (
    <Styles>
      <div className="settings__cards">
        <Card className="settings-item">
          <h3 className="settings-item__title">Language</h3>

          <div className="settings-item__divider" />

          <div className="settings-item__actions">
            <RadioGroup
              name="languages-settings"
              align="vertical"
              options={LanguagesData}
              onChange={(e) => setCurrentValue(e.target.value)}
              value={currentValue}
            />
          </div>
        </Card>
      </div>
    </Styles>
  )
}

export default LanguageSettings
