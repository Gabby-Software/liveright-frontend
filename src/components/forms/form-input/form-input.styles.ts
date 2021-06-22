import styled from "styled-components";

export default styled.div`

.text_input {
    &__cont {
        position: relative;
    }
    &__label {
        position: absolute;
        color: ${p => p.theme.vars.colors.secondary};
        transition: ${p => p.theme.vars.defaults.transition};
        font-size: 14px;
        top: 14px;
        left: 18px;
    }
    &__input {
        display: block;
        background-color: #fbfbfb;
        padding: 20px 16px 8px 16px;
        border: 1px solid ${p => p.theme.vars.colors.inputBorder};
        color: ${p => p.theme.vars.colors.dark};
        border-radius: 6px;
        outline: none;
        width: 100%;
        box-sizing: border-box;
        &:focus~.text_input__label, &:not([value=""])~.text_input__label {
            top: 10px;
            font-size: 10px;
        }
    }
}
`;
