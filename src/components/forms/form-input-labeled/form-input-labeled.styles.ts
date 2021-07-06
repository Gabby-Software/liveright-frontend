import styled from "styled-components";

export default styled.div`

.text_input {
    &__cont {
        position: relative;
        display: block;
    }
    &__content {
        position: relative;
        svg {
            height: 14px;
            display: block;
            position: absolute;
            top:0;
            bottom:0;
            right: 16px;
            margin: auto;
        }
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

&.text_input{
    &__error {
        .text_input {
            &__input {
                border-color: ${p => p.theme.vars.colors.error};
                padding-right: 40px;
            }
        }
        svg {
            color: ${p => p.theme.vars.colors.error};
        }
    }
    &__icon {
        .text_input {
            &__input {
                padding-right: 40px;
            }
        }
    }
}
`;
