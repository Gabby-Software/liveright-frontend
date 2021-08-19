import styled from "styled-components";
import {darken} from "../../../../../assets/styles/_media";

export default styled.div`
    background-color: ${p => p.color === 'primary' ? p.theme.vars.colors.primary : p.theme.vars.colors.background_v2};
    color: ${p => p.color === 'primary' ? 'white' : p.theme.vars.colors.dark_v2};
    border-radius: 8px;
    margin-left: 14px;
    cursor: pointer;
    transition: ${p => p.theme.vars.defaults.transition};
    &:hover {
        background-color: ${p => p.color === 'primary' ? p.theme.vars.colors.primaryDarken : darken(p.theme.vars.colors.background_v2, .96)};
    } 
    svg {
        width: 45px;
        height: 45px;
        padding: 11px;
        display: block;
    }
    &.chat-action {
        &__disabled {
            opacity: .7;
        }
    }
`;
