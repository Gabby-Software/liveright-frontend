import styled from 'styled-components'

export default styled.div`
  display: flex;
  width: 100%;

  .add-session {
    &__form {
      width: 100%;
      display: flex;
      height: 100%;
    }

    &__left {
      width: 100%;
      max-width: 60%;
      padding-right: 1.875rem;
      display: flex;
      flex-direction: column;
    }

    &__right {
      width: 100%;
      max-width: 40%;
      display: flex;
      flex-direction: column;
    }

    &__top-container {
      margin-bottom: 1.875rem;
    }

    &__calendar-card {
      flex: 1;
    }
  }
`
