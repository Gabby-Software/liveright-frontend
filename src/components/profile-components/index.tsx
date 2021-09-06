import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'
import Button from '../buttons/button/button.component'
import CardComponent from '../cards/card/card.component'

export const EditRoot = styled.div``

export const Card = styled(CardComponent)<any>`
  width: 100%;
  margin-bottom: 1.875rem;
  flex-direction: ${(props) => (props.$row ? 'row' : 'column')};
  justify-content: ${(props) => (props.$between ? 'space-between' : 'stretch')};
  align-items: ${(props) => (props.$itemsCenter ? 'center' : 'stretch')};
`

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.875rem;
`

export const Preview = styled.div`
  display: flex;
  align-items: center;
`

export const PreviewImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 9999px;
  margin-right: 1.25rem;
  border: none;
  background-color: ${getColorCarry('primary_v2')};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  & span {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
  }

  & img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`

export const PreviewContent = styled.div``

export const PreviewName = styled.p`
  font-size: 1.375rem;
  font-weight: 700;
  color: ${getColorCarry('primaryDark_v2')};
`

export const PreviewSub = styled.p`
  font-size: 1.125rem;
  font-weight: 400;
  color: ${getColorCarry('dark_v2')};
`

export const ActionContainer = styled.div`
  padding-left: 2rem;
  border-left: 1px solid ${getColorCarry('inputBorder_v2')};
`

export const ActionButton = styled(Button)``

export const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${getColorCarry('primaryDark_v2')};
  margin-bottom: 1.25rem;
`
