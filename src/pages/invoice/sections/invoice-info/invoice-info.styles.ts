import styled from "styled-components";

export default styled.div`
    .data-table {
        &__td {
            &:not(:first-child) {
                font-size: 16px;
            }
        }
    }
    .invoice-info {
        &__summary {
            display: flex;
            justify-content: space-between;
            padding: 30px 30px 50px 30px;
            border: 1px solid ${p => p.theme.vars.colors.light};
            border-top: none;
            color: ${p => p.theme.vars.colors.primaryDark};
            &__left {
                font-size: 14px;
                margin-top: 33px;
            }
            &__right {
                font-size: 16px;
            }
        }
        &__s {
            margin-bottom: 20px;
            &-key {
                
            }
            &-value {
                font-weight: 600;
                margin-top: 2px;
            }
        }
        &__d {
            &-key {
                font-weight: 600;
                font-size: 1rem;
                margin-top: 10px;
            }
            &-value {
                font-weight: 500;
                font-size: 1rem;
                margin-top: 10px;
            }
        }
        &__thanks {
            font-weight: 500;
            font-size: 14px;
            color: #676767;
            margin-top: 20px;
            margin-bottom: 40px;
        }
    }
`;
