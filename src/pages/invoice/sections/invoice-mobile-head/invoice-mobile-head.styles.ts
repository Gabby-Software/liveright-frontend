import styled from "styled-components";

export default styled.div`
display: flex;
.ant-btn {
    padding: 13px;
    margin-bottom: 27px;
}
.invoice-m-head {
    &__left, &__right {
        width: 50%;
        font-size: 16px;
    }
    &__price {
        font-weight: 600;
        font-size: 24px;
        margin:  0 0 30px 0;
    }
    &__data {
        margin-top:20px;
    }
    &__label {
        font-weight: 600;
    }
    &__value {
        &__error {
            color: ${p => p.theme.vars.colors.error};
        }
    }
        &__cta {
            border-color: ${p =>p.theme.vars.colors.primaryDark};
            background-color: ${p =>p.theme.vars.colors.primaryDark};
            &:hover {
                border-color: ${p =>p.theme.vars.colors.primaryDark};
                background-color: ${p =>p.theme.vars.colors.primaryDark};
                opacity: .8;
            }
        }
        &__icons {
            display: flex;
            justify-content: space-around;
            padding: 5px;
        }
        &__action {
            display: block;
            height: 25px;
            width: auto;
            color: ${p => p.theme.vars.colors.primaryDark};
            cursor: pointer;
            transition: ${p => p.theme.vars.defaults.transition};
            &:hover {
                opacity: .8;
            }
        }
}
`;
