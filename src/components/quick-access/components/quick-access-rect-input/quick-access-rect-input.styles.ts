import styled from 'styled-components'

import FormInputLabeled from '../../../forms/form-input-labeled/form-input-labeled.component'

export default styled(FormInputLabeled)`
  .text_input {
    &__wrapper {
      margin-bottom: 50px;
    }
    &__label {
      color: #404040;
    }
    &__input {
      height: 70px;
      width: 98px;
    }
  }
`
