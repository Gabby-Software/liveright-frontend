import React, { useMemo, useState } from 'react'

import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as CardiogramIcon } from '../../../../assets/media/icons/cardiogram.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import PageSubtitle from '../../../../components/titles/page-subtitle.styles'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { OptionType } from '../../../../types/option.type'
import { OVER_TIME } from '../../progress.constants'
import { OverTimeType } from '../../progress.types'
import HealthCard from '../progress-health-card/progress-health-card.component'
import OverTimeDesktop from '../progress-overtime-desktop/progress-overtime-desktop.component'
import OverTimeMobile from '../progress-overtime-mobile/progress-overtime-mobile.component'
import { CardsWrapper, Wrapper } from './progress-health-data.styles'

interface Props {}

const HealthData: React.FC<Props> = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [isGraphView, setIsGraphView] = useState(false)
  const [overTime, setOverTime] = useState<OverTimeType>(OVER_TIME.MONTH)
  const overTimeOptions = useMemo<OptionType[]>(
    () => [
      { label: t(`progress:${OVER_TIME.WEEK}`), value: OVER_TIME.WEEK },
      { label: t(`progress:${OVER_TIME.MONTH}`), value: OVER_TIME.MONTH },
      { label: t(`progress:${OVER_TIME.QUARTER}`), value: OVER_TIME.QUARTER },
      { label: t(`progress:${OVER_TIME.YTD}`), value: OVER_TIME.YTD },
      {
        label: t(`progress:${OVER_TIME.LAST_YEAR}`),
        value: OVER_TIME.LAST_YEAR
      },
      { label: t(`progress:${OVER_TIME.SPECIFIC}`), value: OVER_TIME.SPECIFIC }
    ],
    []
  )

  return (
    <Wrapper>
      <PageSubtitle>{t('progress:todayHighlights')}</PageSubtitle>
      <CardsWrapper size="middle">
        <HealthCard
          icon={<SleepIcon />}
          data="From 22:10 to 07:00"
          quality="good"
        />
        <HealthCard icon={<CardiogramIcon />} data="80" quality="good" />
        <HealthCard icon={<StepsIcon />} />
        <HealthCard icon={<BloodIcon />} />
      </CardsWrapper>

      {isMobile ? (
        <OverTimeMobile
          filter={overTime}
          setFilter={setOverTime}
          filterOptions={overTimeOptions}
          graphView={isGraphView}
          setGraphView={setIsGraphView}
        />
      ) : (
        <OverTimeDesktop
          filter={overTime}
          setFilter={setOverTime}
          filterOptions={overTimeOptions}
          graphView={isGraphView}
          setGraphView={setIsGraphView}
        />
      )}

      <PageSubtitle>{t('progress:average')}</PageSubtitle>
      <CardsWrapper size="middle">
        <HealthCard
          icon={<SleepIcon />}
          data="From 22:10 to 07:00"
          quality="good"
        />
        <HealthCard icon={<CardiogramIcon />} data="80" quality="good" />
      </CardsWrapper>
    </Wrapper>
  )
}

export default HealthData
