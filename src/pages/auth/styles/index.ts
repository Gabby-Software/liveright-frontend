import styled from "styled-components";
export {default as Logo} from './logo.styles';
export {default as SwitchState} from './switch-state.styles';
export {default as Wrapper} from './wrapper.styles';
export {default as ForgetPassword} from './forgot-password.styles';

export default styled.div`
    font-family: 'Work Sans', sans-serif;
    ${p => p.theme.extend.flexCenter}
    justify-content: flex-start;
    background-color: #41414188;
    .center {
        text-align: center;
    }
    .switch__wrapper {
        margin-bottom: 54px;
    }
    .text_input__wrapper {
        margin-bottom: 12px;
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
