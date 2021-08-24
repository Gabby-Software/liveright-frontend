import { Pagination as AntdPagination } from 'antd'
import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export const Styles = styled.div<any>`
  display: flex;
  justify-content: ${getJustify};
  padding-top: 1.25rem;
`

function getJustify(props: any): string {
  switch (props.$justify) {
    case 'start':
      return 'flex-start'
    case 'center':
      return 'center'
    default:
      return 'flex-end'
  }
}

export const Pagination = styled(AntdPagination)`
  .ant-pagination {
    &-item,
    &-prev,
    &-next,
    &-jump-prev,
    &-jump-next {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 36px;
      width: 36px;
      background-color: ${getColorCarry('secondary3_v2')};
      border-color: ${getColorCarry('secondary3_v2')};
      border-radius: 6px;

      .ant-pagination-item-link {
        background-color: ${getColorCarry('secondary3_v2')};
        border-color: ${getColorCarry('secondary3_v2')};
        border-radius: 6px;
      }
    }
    &-next,
    &-prev {
      color: ${getColorCarry('primary_v2')};
      background-color: transparent;

      &:hover {
        background-color: ${getColorCarry('secondary3_v2')};
      }
    }
    &-prev {
      & svg {
        transform: rotate(180deg);
      }
    }
    &-item,
    &-jump-prev,
    &-jump-next {
      color: ${getColorCarry('secondary2_v2')};
      font-size: 0.875rem;

      & a {
        color: inherit;
        font-size: inherit;
      }

      &-active,
      &:hover {
        border-color: ${getColorCarry('primary_v2')};
        background-color: ${getColorCarry('primary_v2')};
        color: #fff;
      }
    }
  }
`
