import { Tooltip } from 'antd'
import { useFormikContext } from 'formik'
import React, { ReactElement } from 'react'

import { ReactComponent as InfoIcon } from '../../../../../assets/media/icons/info.svg'
import FormInput from '../../../../../components/forms/form-input/form-input.component'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { HealthDataType } from '../../../../../types/health-data.type'
import { HealthData, QualityType } from '../../../../progress/progress.types'
import { LogName, LogQuality, Wrapper } from './log-card-desktop.styles'

interface Props {
  name: string
  inputName: string
  inputLabel: string
  quality: QualityType
  Icon: ReactElement
}

const LogCardDesktop: React.FC<Props> = (props) => {
  const { Icon, name, inputName, inputLabel, quality } = props
  const { t } = useTranslation()
  const { getFieldMeta } = useFormikContext<HealthData>()
  const { value } = getFieldMeta(inputName)

  return (
    <Wrapper>
      <div>
        <LogName>
          {Icon}
          <span>{name}</span>
          <Tooltip title="TBD">
            <InfoIcon />
          </Tooltip>
        </LogName>
        <FormInput name={inputName} label={inputLabel} />
        <LogQuality show={!!value} quality={quality}>
          <span>
            {t('progress:qualityLabel')}
            <Tooltip title="TBD">
              <InfoIcon />
            </Tooltip>
          </span>
          <span>{t(`progress:quality.${quality}`)}</span>
        </LogQuality>
      </div>
    </Wrapper>
  )
}

export default LogCardDesktop
