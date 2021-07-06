import styled from "styled-components";
import {Select} from "antd";

export const MobileStyles = styled.div`
.select_input {
    &__cont {
        position: relative;
        display: block;
    }
    &__label {
        color: ${p => p.theme.vars.colors.primaryDark};
        transition: ${p => p.theme.vars.defaults.transition};
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
        text-align: left;
    }
    &__input {
        display: block;
        padding: 14px 16px;
        background-color: #fbfbfb;
        border: 1px solid #c4c4c4;
        color: ${p => p.theme.vars.colors.dark};
        border-radius: ${p => p.theme.vars.sizes.borderRadius};
        outline: none;
        width: 100%;
        box-sizing: border-box;
        &:focus {
            border-color: black;
        }
    }
}
`;

export const DesktopStyles = styled.div`
width: 100%;
.select_input {
    &__cont {
        position: relative;
        display: block;
    }
    &__label {
        color: ${p => p.theme.vars.colors.primaryDark};
        transition: ${p => p.theme.vars.defaults.transition};
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
        text-align: left;
    }
}
.ant-select {
    display: block;
    padding: 9px 3px;
    background-color: #fbfbfb;
    border: 1px solid #c4c4c4;
    color: ${p => p.theme.vars.colors.dark};
    border-radius: ${p => p.theme.vars.sizes.borderRadius};
    outline: none;
    width: 100%;
    box-sizing: border-box;
    svg {
        transform-origin: center center;
        transition: ${p => p.theme.vars.defaults.transition};
    }
    &-selector {
        border: none !important;
        background: none !important;
        cursor:pointer;
        box-shadow: none !important;
    }
    &-selection-item {
        text-align: left;
        
    }
    &-open {
        svg {
            transform: rotate(180deg);
        }
    }
}

`;
