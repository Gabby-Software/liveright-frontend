import styled from 'styled-components'

const Styles = styled.div`
  display: flex;
  overflow: auto;

  .wrapper {
    &__main {
      flex: 1;
      padding: 0 2.25rem 103px 2.25rem;
    }

    &__title {
      display: flex;
      justify-content: space-between;
    }
  }
`

export default Styles
