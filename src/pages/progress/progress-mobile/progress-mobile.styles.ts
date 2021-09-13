import styled from 'styled-components'

import Button from '../../../components/buttons/button/button.component'
import Tabs from '../../../components/tabs/tabs.component'

export const Wrapper = styled.div`
  margin-bottom: 4rem;
`

export const StyledTabs = styled(Tabs)`
  margin-top: 16px;

  .ant-tabs-nav-list {
    width: 100%;
  }

  .ant-tabs-tab {
    display: flex;
    flex: 1;
    ${({ theme }) => theme.extend.h2}
  }

  .ant-tabs-tab-btn {
    width: 100%;
    text-align: center;
  }
`

export const HeaderAction = styled(Button)`
  & svg {
    margin-left: 1rem;
  }
`
