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
import useGoals from '../../../../hooks/api/goals/useGoals'
import useStatistic from '../../../../hooks/api/stat/useStatistic'
import { useAuth } from '../../../../hooks/auth.hook'
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
  const { uuid } = useAuth()
  const { getGoalsTargetByType } = useGoals({ filter: { account_id: uuid } })

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
            (getGoalsTargetByType('total_monthly_revenue') || 0) *
              (RANGE_FACTORS as any)[range]
          )}
          icon={<RevenueSolidIcon />}
          money
          earn={statistic.total}
        />
        <ProgressCard
          title={t('sessions:ptSessions')}
          current={count.pt}
          target={Math.ceil(
            (getGoalsTargetByType('pt_session_quantity') || 0) *
              (RANGE_FACTORS as any)[range]
          )}
          icon={<GroupSolidIcon />}
          earn={statistic.pt_sessions}
        />
        <ProgressCard
          title={t('sessions:coaching')}
          current={progressCount.coaching_sessions}
          target={Math.ceil(
            (getGoalsTargetByType('coaching_quantity') || 0) *
              (RANGE_FACTORS as any)[range]
          )}
          icon={<ClientSolidIcon />}
          earn={statistic.coaching_sessions}
        />
        <ProgressCard
          title={t('sessions:consultation')}
          current={progressCount.consultations_sessions}
          target={Math.ceil(
            (getGoalsTargetByType('consultation_quantity') || 0) *
              (RANGE_FACTORS as any)[range]
          )}
          icon={<PhoneSolidIcon />}
          earn={statistic.consultations_sessions}
        />
        <ProgressCard
          title={t('sessions:other')}
          current={statistic.other}
          target={Math.ceil(
            (getGoalsTargetByType('other') || 0) * (RANGE_FACTORS as any)[range]
          )}
          icon={<OptionSolidIcon />}
          earn={statistic.other}
        />
      </div>
    </div>
  )
}

export default ProgressCardList
