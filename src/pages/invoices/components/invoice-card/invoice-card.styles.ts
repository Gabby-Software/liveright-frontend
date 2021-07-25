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
display: block;
width: 187px;
text-align: center;
transition: ${p => p.theme.vars.defaults.transition};
&:hover {
   background-color: #f6f6f6;
   box-shadow: 4px 4px 14px #e1e1e1;
}
&:last-child {
    margin-right: 0;
}
${media('tablet', 'min')`
    display: flex;
    width: 357px;
    text-align: left;
`}

.invoice-card {
    &__left {
        ${media('tablet', 'min')`
            width: 55%;
            `}
    }
    &__right {
        
        ${media('tablet', 'min')`
            width:45%;
            margin-left: 24px;
        `}
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
        margin-bottom: 12px;
        ${media('tablet', 'min')`
            margin-bottom: 28px;
        `}
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
        padding-right: 10px;
        padding-left:10px;
        ${p => p.theme.extend.flexCenter};
    }
}
    
`;
