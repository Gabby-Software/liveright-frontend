/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function */
import { Skeleton } from 'antd'
import React, { useContext } from 'react'

import { onlyClient } from '../../guards/client.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import ProfileAddresses from './sections/profile-addresses/profile-addresses.component'
import ProfileBasic from './sections/profile-basic/profile-basic.component'
import ProfileImage from './sections/profile-image/profile-image.component'
import ProfileInfo from './sections/profile-info/profile-info.component'
import ProfileTnb from './sections/profile-tnb/profile-tnb.component'
import { TrainerContext, TrainerProvider } from './trainer.context'
import Styles from './trainer.styles'

const TrainerContent = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //     dispatch({type: ACTION_GET_TRAINER_REQUEST});
  // }, []);
  const { loading, error } = useContext(TrainerContext)
  const isMobile = useIsMobile()
  if (loading) return <Skeleton />
  if (error) return <p>{error}</p>

  return (
    <Styles className={'profile'}>
      {/*<ProfileSidebar/>*/}
      <div className={'profile__main'}>
        <ProfileImage />
        <ProfileBasic title={'Basic Trainer Profile'} />
        <ProfileAddresses />
        <ProfileInfo title={'Trainer Info'} />
        <ProfileTnb />
      </div>
    </Styles>
  )
}
const Trainer = () => (
  <TrainerProvider>
    <TrainerContent />
  </TrainerProvider>
)
export default onlyClient(Trainer)
