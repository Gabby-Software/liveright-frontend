import { Tooltip } from 'antd'
import { useFormikContext } from 'formik'
import React, { ReactElement } from 'react'

import { ReactComponent as InfoIcon } from '../../../../../assets/media/icons/info-fill.svg'
import FormInputLabeled from '../../../../../components/forms/form-input-labeled/form-input-labeled.component'
import formatter from '../../../../../managers/formatter.manager'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { HealthData, QualityType } from '../../../../progress/progress.types'
import {
  Border,
  LogName,
  LogQuality,
  Space,
  Wrapper
} from './log-card-desktop.styles'

interface Props {
  name: string
  inputName: string
  inputLabel: string
  Icon: ReactElement
  getQuality: (value: number) => QualityType
  max?: number
}

const LogCardDesktop: React.FC<Props> = (props) => {
  const { Icon, name, inputName, inputLabel, getQuality, max } = props
  const { t } = useTranslation()
  const { getFieldMeta } = useFormikContext<HealthData>()
  const { value } = getFieldMeta<string>(inputName)
  const quality = Number(value) ? getQuality(+value) : ''

  return (
    <Wrapper>
      <div>
        <LogName>
          {Icon}
          <span>{name}</span>
          <Tooltip title="TBD">
            <InfoIcon />
          </Tooltip>
          <Space />
          <Border />
        </LogName>
        <FormInputLabeled
          name={inputName}
          label={inputLabel}
          format={formatter()
            .number()
            .max(max || Infinity)}
        />
        <LogQuality quality={quality}>
          <Border />
          <div>
            <span className={'log-quality-label'}>
              {t('progress:qualityLabel')}
              <Tooltip title="TBD">
                <InfoIcon />
              </Tooltip>
            </span>
            <span className={'log-quality-value'}>
              {quality ? t(`progress:${quality}`) : '-'}
            </span>
          </div>
        </LogQuality>
      </div>
    </Wrapper>
  )
}

export default LogCardDesktop
