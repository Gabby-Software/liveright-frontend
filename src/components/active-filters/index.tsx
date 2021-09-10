import { PropsWithChildren } from 'react'

import { CrossIcon } from '../../assets/media/icons'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { FilterCard, Styles } from './index.styles'

export function ActiveFilters({ children }: PropsWithChildren<any>) {
  const { t } = useTranslation()
  return (
    <Styles>
      <p className="active-filters__title">{t('active-filters')}</p>

      {children}
    </Styles>
  )
}

interface ActiveFilterCardProps {
  label: string
  value: string
  onDelete: () => void
}

export function ActiveFilterCard({
  label,
  value,
  onDelete
}: ActiveFilterCardProps) {
  return (
    <FilterCard>
      <p className="filter-card__title">
        {label}:<span> {value}</span>
      </p>

      <CrossIcon onClick={onDelete} />
    </FilterCard>
  )
}
