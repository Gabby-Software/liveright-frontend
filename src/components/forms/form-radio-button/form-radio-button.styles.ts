import styled from "styled-components";

export default styled.div`

    .radio {
        display: flex;
        &__label {
            color: ${p => p.theme.vars.colors.primaryDark};
            transition: ${p => p.theme.vars.defaults.transition};
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
            text-align: left;
        }
        &__cont {
            
        }
        &__button {
            width: 100%;
            ${p => p.theme.extend.flexCenter}
            justify-content:flex-start;
            margin-right: 1rem;
            border-radius: ${p => p.theme.vars.sizes.borderRadius};
            border: 1px solid ${p => p.theme.vars.colors.inputBorder};
            color: ${p => p.theme.vars.colors.inputBorder};
            letter-spacing: .8px;
            font-weight: 600;
            font-size: 14px;
            padding: 13px 12px;
            transition: ${p =>p.theme.vars.defaults.transition};
            cursor: pointer;
            &:before {
                content: '';
                display: block;
                border-radius: 50%;
                border: 2px solid ${p => p.theme.vars.colors.inputBorder};
                width: 16px;
                height: 16px;
                padding:2px;
                margin-right: 13px;
            }
            &:last-child {
                margin-right: 0;
            }
            &__active {
                color: ${p =>p.theme.vars.colors.primaryDark};
                background-color: ${p => p.theme.vars.colors.card};
                border-color: ${p => p.theme.vars.colors.card};
                &:before {
                    background: radial-gradient(circle at center, ${p =>p.theme.vars.colors.primaryDark} 40%, transparent 40%);
                    border-color: ${p =>p.theme.vars.colors.primaryDark};
                } 
            }
        }
    }
`;
