import styled from 'styled-components'

import FormRow from '../../../../components/forms/form-row/form-row.component'

export default styled(FormRow)`
margin-top: 40px;
    a {
        max-width: 350px;
       color: ${(p) => p.theme.vars.colors.primaryDark};
    }
.stats {
    &__head {
        font-weight: 500;
        font-size: 14px;
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        svg {
            margin-right: 12px;
            display; block;
        }
    }
    &__desc {
        color: ${(p) => p.theme.vars.colors.secondary};
        margin-bottom: 2px;
        &:last-child {
            margin-bottom: 10px;
        }
    }
}
`
