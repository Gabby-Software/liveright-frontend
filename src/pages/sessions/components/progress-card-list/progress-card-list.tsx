import React from 'react'

import {
  ClientSolidIcon,
  GroupSolidIcon,
  OptionSolidIcon,
  PhoneSolidIcon,
  RevenueSolidIcon
} from '../../../../assets/media/icons'
import Select from '../../../../components/form/select/select.component'
import {
  statisticRange,
  statisticRangeOptions
} from '../../../../enums/financials.enum'
import useStatistic from '../../../../hooks/api/stat/useStatistic'
import { useFinancialOverview } from '../../../../hooks/useFinancialOverview'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import ProgressCard from '../progress-card/progress-card.component'

const RANGE_FACTORS = {
  week: 0.25,
  month: 1,
  year: 12
}

const ProgressCardList = () => {
  const { t } = useTranslation()
  const { statistic, progressCount, count, onRange, range } = useStatistic()
  const { monthlyTarget, coaching, consultations, pt, other } =
    useFinancialOverview()

  return (
    <div>
      <div className="sessions__date-range">
        <Select
          id="sessions-progress-range"
          options={statisticRangeOptions}
          defaultValue={statisticRange.WEEK}
          onChange={onRange}
        />
      </div>

      <div className="sessions__progress">
        <ProgressCard
          title={t('revenue')}
          current={statistic.total || 0}
          target={Math.ceil(
            (monthlyTarget || 0) * (RANGE_FACTORS as any)[range]
          )}
          icon={<RevenueSolidIcon />}
          money
          earn={statistic.total}
        />
        <ProgressCard
          title={t('sessions:ptSessions')}
          current={count.pt}
          target={Math.ceil(
            (pt[0].target || 0) * (RANGE_FACTORS as any)[range]
          )}
          icon={<GroupSolidIcon />}
          earn={statistic.pt_sessions}
        />
        <ProgressCard
          title={t('sessions:coaching')}
          current={progressCount.coaching_sessions}
          target={Math.ceil(
            (coaching[0].target || 0) * (RANGE_FACTORS as any)[range]
          )}
          icon={<ClientSolidIcon />}
          earn={statistic.coaching_sessions}
        />
        <ProgressCard
          title={t('sessions:consultation')}
          current={progressCount.consultations_sessions}
          target={Math.ceil(
            (consultations[0].target || 0) * (RANGE_FACTORS as any)[range]
          )}
          icon={<PhoneSolidIcon />}
          earn={statistic.consultations_sessions}
        />
        <ProgressCard
          title={t('sessions:other')}
          current={statistic.other}
          target={Math.ceil(
            (other[0].target || 0) * (RANGE_FACTORS as any)[range]
          )}
          icon={<OptionSolidIcon />}
          earn={statistic.other}
        />
      </div>
    </div>
  )
}

export default ProgressCardList
