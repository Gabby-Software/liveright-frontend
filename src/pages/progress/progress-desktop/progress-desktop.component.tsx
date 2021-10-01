import { CaretDownIcon } from '../../../assets/media/icons'
import Button from '../../../components/buttons/button/button.component'
import MobileBack from '../../../components/mobile-back/mobile-back.component'
import { Routes } from '../../../enums/routes.enum'
import userTypes from '../../../enums/user-types.enum'
import { useAuth } from '../../../hooks/auth.hook'
import LogClient from '../../progress-log/log-health-data/components/log-client/log-client.component'
import Content from '../components/content/content.component'
import LogDropdown from '../components/log-dropdown/log-dropdown.component'
import { Wrapper } from './progress-desktop.styles'

export default function ProgressDesktop() {
  const { type } = useAuth()

  const dropdown = (
    <LogDropdown>
      <Button className="progress__header-btn">
        Log Data
        <CaretDownIcon />
      </Button>
    </LogDropdown>
  )

  return (
    <>
      <Wrapper>
        {type === userTypes.CLIENT ? (
          <div className="progress__title-container">
            <h2 className="progress__title">Progress & Metrics</h2>

            {dropdown}
          </div>
        ) : (
          <MobileBack
            to={Routes.PROGRESS_CLIENTS}
            alias="progress"
            component={dropdown}
          />
        )}

        {type !== userTypes.CLIENT && <LogClient />}

        <Content />
      </Wrapper>
    </>
  )
}
