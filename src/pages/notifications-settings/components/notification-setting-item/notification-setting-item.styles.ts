import styled from 'styled-components'

import { media } from '../../../../assets/styles/_media'

export default styled.div`
  background-color: ${(p) => p.theme.vars.colors.card};
  padding: 28px 20px;
  margin-bottom: 16px;
  ${media('tablet', 'min')`
    width: calc(50% - 8px);
    &:nth-child(even){
        margin-left: 16px;
    }
`}
  .notset-item {
    &__title {
      color: ${(p) => p.theme.vars.colors.primaryDark};
      font-size: 16px;
      font-weight: 600px;
      padding-bottom: 25px;
      ${media('tablet', 'min')`
            font-size: 20px;
            position: relative;
            margin-bottom: 34px;
            &:before {
                content: '';
                position: absolute;
                display: block;
                bottom: 0;
                left:0;
                width: 124px;
                border-bottom: 1px solid #c4c4c4;
            }
        `}
    }
    &__actions {
      display: flex;
      justify-content: space-between;
    }
    &__action {
      ${media('tablet', 'min')`
        width: 50%;
        &:last-child {
                margin-left: 100px;  
        }
        `}
    }
  }
`
