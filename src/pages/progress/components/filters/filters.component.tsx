import { useMemo } from 'react'

import { GraphIcon, MenuIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Select from '../../../../components/form/select/select.component'
import { Subtitle } from '../../../../components/typography'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { OptionType } from '../../../../types/option.type'
import { OVER_TIME } from '../../progress.constants'
import { FilterWrapper } from '../progress-overtime-desktop/progress-overtime-desktop.styles'
import { Styles } from './filters.styles'

interface FiltersProps {
  onView: () => void
  isGraph: boolean
  filters: Record<string, any>
  onFilters: any
  isDashboard?: boolean
}

export default function Filters({
  onView,
  isGraph,
  filters,
  onFilters,
  isDashboard
}: FiltersProps) {
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  const RANGE_OPTIONS = useMemo<OptionType[]>(
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

  const filtersComponent = (
    <FilterWrapper>
      {filters.range === OVER_TIME.SPECIFIC && (
        <>
          <DatePicker
            id="progress-from"
            value={filters.from_date}
            onChange={(e, date) => onFilters('from_date', date)}
            placeholder={t('from')}
            className="filters__form-item filters__form-item_date"
          />
          <DatePicker
            id="progress-to"
            value={filters.to_date}
            onChange={(e, date) => onFilters('to_date', date)}
            placeholder={t('to')}
            className="filters__form-item filters__form-item_date"
          />
        </>
      )}

      <Select
        id="progress-range"
        value={filters.range}
        options={RANGE_OPTIONS}
        onChange={(e) => onFilters('range', e)}
        className="filters__form-item filters__form-item_select"
      />
    </FilterWrapper>
  )

  const button = (
    <Button variant="text" onClick={onView} className="filters__toggle-btn">
      {isGraph ? <MenuIcon /> : <GraphIcon />}
      <span>{isGraph ? t('progress:seeTable') : t('progress:seeGraph')}</span>
    </Button>
  )

  if (isMobile) {
    return (
      <Styles>
        <div className="filters__title-container">
          <Subtitle>Over Time</Subtitle>

          {button}
        </div>

        {filtersComponent}
      </Styles>
    )
  }

  return (
    <Styles>
      <Subtitle>Over Time</Subtitle>

      <div className="filters__filters">
        {!isDashboard && button}
        {filtersComponent}
      </div>
    </Styles>
  )
}
