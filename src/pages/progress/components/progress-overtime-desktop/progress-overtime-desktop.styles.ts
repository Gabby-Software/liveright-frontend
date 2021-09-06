import { Button } from 'antd'
import styled from 'styled-components'

import Card from '../../../../components/card/card.style'

export const Wrapper = styled.div`
  max-width: 1200px;
  .progress-overtime {
    &__header {
      ${(p) => p.theme.extend.flexCenter}
      margin-bottom:30px;
    }
  }
`

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: 0 0 0 30px;
  form {
    display: flex;
    align-items: center;
  }
  .text_input__wrapper {
    min-width: 150px;
    margin-left: 24px;
  }
`

export const SwitchViewButton = styled(Button)`
  margin: 0 0 0 auto;
  padding: 0;
  ${(p) => p.theme.extend.flexCenter}
  border-bottom: 1px solid ${(p) => p.theme.vars.colors.link};
  svg {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`

export const TableWrapper = styled(Card)<{ isMobile?: boolean }>`
  margin-bottom: 32px;
`
