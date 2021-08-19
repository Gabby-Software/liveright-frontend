import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as BloodIcon } from '../../assets/media/icons/blood.svg'
import { ReactComponent as HeartRateIcon } from '../../assets/media/icons/cardiogram.svg'
import { ReactComponent as SleepIcon } from '../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../assets/media/icons/steps.svg'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import BottomDrawer from '../bottom-drawer/bottom-drawer.component'
import Styles from './mobile-log-drawer.styles'

type LogOptionType = {
  Icon: React.ComponentType
  title: string
  url: string
}
const logOptions: LogOptionType[] = [
  { Icon: SleepIcon, title: 'sleep', url: '/log/sleep' },
  { Icon: HeartRateIcon, title: 'heart-rate', url: '/log/heart-rate' },
  { Icon: StepsIcon, title: 'steps', url: '/log/steps' },
  { Icon: BloodIcon, title: 'blood-glucose', url: '/log/blood-glucose' }
]

type MobileLogDrawerPropsType = {
  isOpen: boolean
  onClose: () => void
}
const MobileLogDrawer = ({ isOpen, onClose }: MobileLogDrawerPropsType) => {
  const { t } = useTranslation()
  return (
    <BottomDrawer isOpen={isOpen} onClose={onClose} title={t('what-to-log')}>
      <Styles className={'log-drawer__wrapper'}>
        <div className={'log-drawer__cont'}>
          {logOptions.map(({ title, Icon, url }) => (
            <Link
              to={url}
              className={'log-drawer__button'}
              key={title}
              onClick={onClose}
            >
              <div>
                <Icon />
                <span className={'log-drawer__label'}>{t(title)}</span>
              </div>
            </Link>
          ))}
        </div>
      </Styles>
    </BottomDrawer>
  )
}

export default MobileLogDrawer
