import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export default styled.div`
  background-color: #ffffff;
  padding-bottom: 2.125rem;

  border-radius: 10px;

  input::placeholder {
    color: ${getColorCarry('neutral_50')};
  }

  .clients {
    &__activities {
      max-width: 0;
      overflow: hidden;
      white-space: nowrap;
      transition: ${(p) => p.theme.vars.defaults.transition};
    }
  }

  .data-table__tr {
    &:hover {
      .clients__activities {
        max-width: 100%;
      }
    }
  }
`

// export default styled.div`
//   display: flex;
//   overflow: auto;
//   .clients {
//     &__cont {
//       max-width: 1500px;
//       width: 100%;
//       margin: auto;
//     }
//     &__activities {
//       max-width: 0;
//       overflow: hidden;
//       white-space: nowrap;
//       transition: ${(p) => p.theme.vars.defaults.transition};
//     }
//     &__no-data {
//       text-align: center;
//       margin-top: 24px;
//       font-weight: 500;
//       color: ${(p) => p.theme.vars.colors.primaryDark};
//     }
//   }
//   .data-table__tr {
//     &:hover {
//       .clients__activities {
//         max-width: 100%;
//       }
//     }
//   }
// `
