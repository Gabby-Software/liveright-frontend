import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'

const AddClientDrawerStyles = styled.div`
  background-color: white;
  min-height: 100%;
  .add-client-drawer {
    &__mask {
      overflow: hidden;
    }
    &__content {
      padding: 30px;
    }
    &__body {
      display: flex;
      position: relative;
      transition: ${(p) => p.theme.vars.defaults.transition};
      height: 100%;
    }
  }

  .client-add__message__wrap {
    width: 100% !important;
  }

  @media ${mediaQueries.LANDSCAPE} {
    .client-add__message__wrap {
      width: 100% !important;
    }
  }
`
export default AddClientDrawerStyles
