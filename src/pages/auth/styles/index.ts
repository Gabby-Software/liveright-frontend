import styled from "styled-components";
export {default as Logo} from './logo.styles';
export {default as SwitchState} from './switch-state.styles';
export {default as Wrapper} from './wrapper.styles';
export {default as ForgetPassword} from './forgot-password.styles';
export {default as Title} from './title';

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
    .ant-btn {
        margin-top: 36px;
    }
    .forgot-password {
        &__title {
            font-weight: 500;
            font-size: 18px;
            text-align:left;
        }
        &__desc {
            font-size: 12px;
            margin-bottom: 2rem;
            text-align:left;
        }
    }
`;
