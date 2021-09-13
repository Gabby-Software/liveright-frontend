import { Tooltip } from 'antd'
import { useFormikContext } from 'formik'
import React, { ReactElement } from 'react'

import { ReactComponent as InfoIcon } from '../../../../../assets/media/icons/info-fill.svg'
import Input from '../../../../../components/form/input/input.component'
import formatter from '../../../../../managers/formatter.manager'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { HealthData, QualityType } from '../../../../progress/progress.types'
import { LogName, LogQuality, Wrapper } from './log-card-desktop.styles'

interface Props {
  name: string
  inputName: string
  inputLabel: string
  Icon: ReactElement
  getQuality: (value: number) => QualityType
  max?: number
}

const LogCardDesktop: React.FC<Props> = (props) => {
  const { Icon, name, inputName, inputLabel, getQuality } = props
  const { t } = useTranslation()
  const { getFieldMeta, values, setFieldValue } = useFormikContext<HealthData>()
  const { value } = getFieldMeta<string>(inputName)
  const quality = Number(value) ? getQuality(+value) : ''

  return (
    <Wrapper>
      <div className="log-card__name">
        <LogName>
          {Icon}
          <span>{name}</span>
          <Tooltip title="TBD">
            <InfoIcon />
          </Tooltip>
        </LogName>
      </div>

      <div className="log-card__control">
        <Input
          formik
          id={`log-progress-${inputName}`}
          name={inputName}
          value={(values as any)[inputName]}
          label={inputLabel}
          format={formatter().number()}
          onChange={(e) => setFieldValue(inputName, e.target.value)}
        />
      </div>

      <div className="log-card__quality">
        <LogQuality quality={quality}>
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
