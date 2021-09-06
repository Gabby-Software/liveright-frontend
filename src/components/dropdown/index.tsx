import { Dropdown as AntdDropdown, Menu } from 'antd'
import styled from 'styled-components'

import { getColor } from '../../pipes/theme-color.pipe'

const { Item } = Menu

export const Dropdown = styled(AntdDropdown)``

export const DropdownMenu = styled(Menu)`
  border-radius: 10px;
  box-shadow: 0px 4px 19px rgba(0, 0, 0, 0.08);
  padding: 1rem 0;
`

export const DropdownMenuItem = styled<any>(Item)`
  padding: 0.5rem 1rem;
  min-width: 140px;

  & .ant-dropdown-menu-title-content {
    display: flex;
    align-items: center;

    & svg {
      margin-right: 0.5rem;
      color: ${(props) =>
        props.$error ? getColor(props, 'primary_v2') : 'inherit'};
    }
  }
`
