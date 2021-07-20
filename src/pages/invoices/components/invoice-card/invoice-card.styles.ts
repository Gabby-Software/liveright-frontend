import styled from "styled-components";
import {Link} from "react-router-dom";
import {media} from "../../../../assets/styles/_media";

export default styled(Link)`
margin: 32px 16px 57px 0;
padding: 23px 20px;
border-radius: 4px;
background-color: #f9f9f9;
color: ${p => p.theme.vars.colors.primaryDark};
flex-shrink:0;
&:last-child {
    margin-right: 0;
}
${media('tablet', 'min')`
display: flex;
width: 357px;
`}

.invoice-card {
    &__left {
        width: 55%;
    }
    &__right {
        width:45%;
        margin-left: 24px;
    }
    &__number {
        font-size: 20px;
        font-weight: 600;
    }
    &__issuer {
        font-size: 14px;
        font-weight: 500;
        color: #676767;
    }
    &__price {
    
    }
    &__status {
        cursor: default;
        &__overdue {
            background-color: ${p => p.theme.vars.colors.error};
            border-color: ${p => p.theme.vars.colors.error};
            &:hover {
                background-color: ${p => p.theme.vars.colors.error};
                border-color: ${p => p.theme.vars.colors.error};
            }
        }
        &__due-soon {
            background-color: ${p => p.theme.vars.colors.warning};
            border-color: ${p => p.theme.vars.colors.warning};
            &:hover {
                background-color: ${p => p.theme.vars.colors.warning};
                border-color: ${p => p.theme.vars.colors.warning};
            }
        }
    }
    &__action {
        border-radius: 0;
        margin-top: 28px;
    }
}
    
`;
