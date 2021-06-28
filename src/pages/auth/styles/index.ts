import styled from "styled-components";
export {default as Logo} from './logo.styles';
export {default as SwitchState} from './switch-state.styles';
export {default as Wrapper} from './wrapper.styles';
export {default as ForgetPassword} from './forgot-password.styles';
export {default as Title} from './title';
export {default as ResendEmail} from './resend-email.styles';

export default styled.div`
    font-family: 'Work Sans', sans-serif;
    ${p => p.theme.extend.flexCenter}
    justify-content: flex-center;
    background-color: white;
    .center {
        text-align: center;
    }
    .switch__wrapper {
        margin-bottom: 54px;
        max-width: 320px;
        margin-right: auto;
        margin-left: auto;
    }
    .text_input__wrapper {
        margin-bottom: 12px;
    }
    .sign-up__name {
        @media all and (min-width: ${p => p.theme.vars.media.tablet}px) {
            display: flex;
            justify-content: space-between;
            .text_input__wrapper {
                width: 48%;
            }
        }
    }
    .sign-up__skip {
         @media all and (max-width: ${p => p.theme.vars.media.tablet}px) {
            position: absolute;
            top: -20px;
            right: 0;
            max-width: 100px;
        }
    }
    .ant-btn {
        margin-top: 36px;
    }
    .forgot-password {
        &__title {
            font-weight: 700;
            font-size: 1.5rem;
            margin: 0 0 25px 0;
            @media all and (min-width: ${p =>p.theme.vars.media.tablet}px) {
                font-size: 36px;
                margin-top: min(190px, 15vh);
            }
        }
        &__desc {
            font-size: 14px;
            margin: 25px 0 50px 0;
            @media all and (min-width: ${p =>p.theme.vars.media.tablet}px) {
                font-size: 18px;
                display:flex;
                flex-direction:column;
                align-items:center;
                >span {white-space:nowrap;}
            }
        }
        &__hr {
            @media all and (min-width: ${p =>p.theme.vars.media.tablet}px) {
                border-bottom: 1px solid ${p =>p.theme.vars.colors.secondary};
                max-width: 164px;
                margin: 15px auto;
            }
        }
    }
`;
