import { ButtonProps } from 'antd'
import React from 'react'

import FormButton from '../forms/form-button/form-button.component'
import Styles from './bottom-button.styles'

const BottomButton = (props: ButtonProps) => {
  return (
    <Styles>
      <div className={'bottom-button__cont'}>
        <FormButton {...props} />
      </div>
    </Styles>
  )
}

export default BottomButton
