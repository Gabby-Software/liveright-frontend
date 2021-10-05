import React from 'react'
import styled from 'styled-components'

import { DownloadIcon_2 } from '../../assets/media/icons'
import fileManager from '../../managers/file.manager'
import { getColorCarry } from '../../pipes/theme-color.pipe'
import { ProfileType } from '../../types/account.type'
import Button from '../buttons/button/button.component'
import { Card, CardTitle } from '.'

const TnCButton = styled(Button)`
  color: ${getColorCarry('neutral_70')};
  padding: 0;
  height: unset;
  font-weight: 400;
  font-size: 0.875rem;
  width: unset;

  svg {
    margin-left: 0.5rem;
  }
`

export default function ProfileTnC({ profile }: { profile: ProfileType }) {
  console.log({ profile })
  return (
    <>
      <Card>
        <CardTitle>{'Terms & Conditions'}</CardTitle>
        <TnCButton
          variant={'text'}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            fileManager.downloadUrl(
              profile.terms_and_conditions.url,
              profile.terms_and_conditions.file_name
            )
          }}
          to="#"
        >
          {profile.terms_and_conditions.file_name} <DownloadIcon_2 />
        </TnCButton>
      </Card>
    </>
  )
}
