import styled from "styled-components";
import {media} from "../../../assets/styles/_media";

export default styled.label`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
.toggle {
    &__label {
        font-weight: 500;
        font-size: 16px;
        color: ${p => p.theme.vars.colors.primaryDark};
        ${media('tablet', 'min')`
            font-size: 20px;
        `}
    }
    &__body {
        position: relative;
        border-radius: 10px;
        width: 40px;
        height: 20px;
        flex-shrink:0;
        margin-left: 22px;
        transition: ${p => p.theme.vars.defaults.transition};
        &:before {
            ${p => p.theme.extend.pseudo}
            transition: ${p => p.theme.vars.defaults.transition};
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: white;
            top:0;
            bottom:0;
            margin: auto;
        }
        &__off {
            background-color: ${p => p.theme.vars.colors.secondary2};
            &:before {
                left: 2px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0);
            }
            &:hover {
                background-color: ${p => p.theme.vars.colors.secondary}
            }
        }
        &__on {
            background-color: ${p => p.theme.vars.colors.primary};
            &:before {
                left: calc(100% - 18px);
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
            }
            &:hover {
                background-color: ${p => p.theme.vars.colors.primaryDarken}
            }
        }
        
    }
}
`;
