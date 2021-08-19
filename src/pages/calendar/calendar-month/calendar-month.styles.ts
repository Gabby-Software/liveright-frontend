import styled from 'styled-components'

export default styled.div`
  .calendar-month {
    &__week {
      display: flex;
    }
    &__cont {
      margin: 24px;
      width: calc(100% - 48px);
      overflow: auto;
    }
  }
`
