import styled from 'styled-components'

export default styled.div`
  position: relative;
  z-index: 1;
  .swipe {
    &__content {
      position: relative;
      z-index: 2;
    }
    &__actions {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 200px;
      z-index: 1;
    }
  }
`
