import styled from 'styled-components'

import { getColor } from '../../pipes/theme-color.pipe'

export default styled.div<any>`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
  padding: 0 1.875rem;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${getBgColor};
  border: 1px dashed ${getTextColor};
  color: ${getTextColor};
  border-radius: 10px;
  white-space: nowrap;
`

function getBgColor(props: any): string {
  switch (props.$type) {
    case 'due-soon':
    case 'due_soon':
      return getColor(props, 'orange_20')
    case 'outstanding':
      return getColor(props, 'blue_20')
    case 'overdue':
    case 'cancelled':
      return getColor(props, 'red_10')
    case 'paid':
    case 'issued':
      return getColor(props, 'green_10')
    case 'draft':
      return getColor(props, 'secondary3_v2')
    default:
      return ''
  }
}

function getTextColor(props: any): string {
  switch (props.$type) {
    case 'due-soon':
    case 'due_soon':
      return getColor(props, 'orange_100')
    case 'outstanding':
      return getColor(props, 'blue_80')
    case 'overdue':
    case 'cancelled':
      return getColor(props, 'red')
    case 'paid':
    case 'issued':
      return getColor(props, 'green_90')
    case 'draft':
      return getColor(props, 'secondary4_v2')
    default:
      return ''
  }
}
