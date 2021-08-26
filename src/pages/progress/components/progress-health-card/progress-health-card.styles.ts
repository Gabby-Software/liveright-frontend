import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { media } from '../../../../assets/styles/_media'
import Card from '../../../../components/card/card.style'
import FormButton from '../../../../components/forms/form-button/form-button.component'

const noLogsStyles = css`
  border: 1px solid ${(p) => p.theme.vars.colors.link};
  background-color: ${(p) => p.theme.vars.colors.link_bg};
  color: ${(p) => p.theme.vars.colors.primaryDark_v2};
  svg {
    order: 2;
    margin-left: auto;
    margin-right: 10px;
    ${media('tablet', 'max')`
      order: 0;
    `}
  }
`

export const StyledCard = styled(Card)<{ noLogs: boolean }>`
  display: flex;
  align-items: center;
  height: 93px;
  width: 280px;
  padding: 20px 18px;
  color: white;
  font-size: 16px;
  user-select: none;
  border: 1px solid transparent;
  background-color: ${({ theme }) => theme.vars.colors.primaryDark_v2};
  margin-right: 24px;
  &:last-child {
    margin-right: 0;
  }
  svg {
    display: block;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    margin-right: 25px;
  }
  ${({ noLogs }) => (noLogs ? noLogsStyles : '')}
  ${media('tablet', 'max')`
      width: calc(50% - 10px);
      margin-right: 20px;
      height: auto;
      flex-direction: column;
      text-align: center;
      &:nth-child(even) {
        margin-right: 0;
      }
      &:nth-child(-n +2) {
        margin-bottom: 20px;
      }
      svg {
        margin: 0 0 5px 0;
      }
  `}
`

export const Quality = styled.div`
  color: #c2c2c2;
  margin-bottom: 5px;
`

export const Data = styled.span`
  font-size: 16px;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
`
export const LogLink = styled(Link)`
  color: ${(p) => p.theme.vars.colors.link};
  display: flex;
  align-items: center;
  margin-top: 5px;
  font-size: 14px;
  svg {
    height: 8px;
    width: auto;
    margin: 0 0 0 13px;
  }
  ${media('tablet', 'max')`
    justify-content: center;
  `}
`
export const Button = styled(FormButton)`
  padding: 4px;
`
