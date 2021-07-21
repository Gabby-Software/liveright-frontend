import styled from "styled-components";

export default styled.div`
    display: flex;
    overflow: hidden;
    .invoice-att {
        width: 100%;
        font-weight: 500;
        font-size: 16px;
        color: ${p => p.theme.vars.colors.primaryDark};
        &__title {
            color: ${p => p.theme.vars.colors.primary};
        }
        &__name {
            font-weight: 600;
            font-size: 18px;
            margin: 17px 0 14px 0;
        }
        &__desc {
            max-width: 185px;
        }
        &__actions {
            .ant-btn-primary {
                border-radius: 4px;
                padding: 13px;
                width: 207px;
                margin-bottom: 16px;
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
            justify-content: space-between;
            padding: 5px 14px;
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
