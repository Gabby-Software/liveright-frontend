import React, { useMemo } from 'react'

import BtnDropdown, {
  BtnDropDownOptionType
} from '../../../../components/btn-dropdown/btn-dropdown.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { PROGRESS_SECTIONS } from '../../progress.constants'
import { ProgressSectionsType } from '../../progress.types'
import { StyledButton } from './progress-title-button.styles'

interface Props {
  onMenuClick: (value: ProgressSectionsType) => void
}

const TitleButton: React.FC<Props> = (props) => {
  const { onMenuClick } = props
  const { t } = useTranslation()

  const menu: BtnDropDownOptionType[] = useMemo(() => {
    return Object.values(PROGRESS_SECTIONS).map((section) => ({
      label: t(`progress:sections.${section}`),
      onClick: () => onMenuClick(section)
    }))
  }, [])

  return (
    <StyledButton>
      <BtnDropdown menu={menu} />
    </StyledButton>
  )
}

export default TitleButton
