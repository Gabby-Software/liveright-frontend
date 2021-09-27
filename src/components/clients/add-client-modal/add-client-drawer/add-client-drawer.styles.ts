import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'

const AddClientDrawerStyles = styled.div<any>`
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

  @media ${mediaQueries.MOBILE} {
    width: 100%;
    position: absolute;
    left: 0;
    min-height: calc(100% - 9.4rem);

    .ant-btn-default {
      display: none;
    }
  }
`
export default AddClientDrawerStyles
