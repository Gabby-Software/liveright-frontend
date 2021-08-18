import styled from "styled-components";

export default styled.div`

.text_input {
    &__cont {
        position: relative;
    }
    &__label {
        position: absolute;
        color: ${p => p.theme.vars.colors.secondary2_v2};
        transition: ${p => p.theme.vars.defaults.transition};
        font-size: 14px;
        top: 15px;
        left: 18px;
        pointer-events:none;
        touch-action: none;
    }
    &__input {
        display: block;
        background-color: #fbfbfb;
        padding: 20px 16px 8px 16px;
        border: 1px solid ${p => p.theme.vars.colors.inputBorder_v2};
        color: ${p => p.theme.vars.colors.primaryDark2_v2};
        border-radius: ${p => p.theme.vars.sizes.borderRadius};
        outline: none;
        width: 100%;
        box-sizing: border-box;
        &:focus~.text_input__label, &:not([value=""])~.text_input__label {
            top: 10px;
            font-size: 10px;
        }
        &:focus {
            border-color: #c4c4c4;
        }
    }
}
&.text_input__icon {
        svg {
            color: #757575;
            width: 14px;
            height: 14px;
            position: absolute;
            top: 0;
            bottom:0;
            margin: auto;
            left: 17px;
        }
        .text_input {
            &__input {
                padding-left: 42px;
            }
            &__label {
                left: 42px;
            }
        }
    }
`;
