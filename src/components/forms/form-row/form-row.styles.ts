import styled from 'styled-components'

import { media } from '../../../assets/styles/_media'

export default styled.div`
  ${media('tablet', 'min')`
    display: flex;
    >* {
        width:100%;
        margin-right: 14px;
        margin-top: auto;       
        &:last-child {
            margin-right: 0;
        }
    }
`}
`
