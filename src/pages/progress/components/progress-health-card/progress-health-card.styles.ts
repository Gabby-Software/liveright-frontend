import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

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
  }
`

export const StyledCard = styled(Card)<{ noLogs: boolean }>`
  display: flex;
  align-items: center;
  height: 93px;
  width: 280px;
  padding: 20px 10px 20px 20px;
  color: white;
  font-size: 16px;
  user-select: none;
  border: 1px solid transparent;
  background-color: ${({ theme }) => theme.vars.colors.primaryDark_v2};
  svg {
    display: block;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    margin-right: 25px;
  }
  ${({ noLogs }) => (noLogs ? noLogsStyles : '')}
`

export const Quality = styled.div`
  color: #c2c2c2;
  margin-bottom: 5px;
`

export const Data = styled.span`
  font-size: 16px;
  font-weight: 400;
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
    margin-left: 13px;
  }
`
export const Button = styled(FormButton)`
  padding: 4px;
`
