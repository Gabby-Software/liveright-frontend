import styled from "styled-components";

export default styled.div`
    .data-table {
        &__td {
            color: #676767 !important;
            &:not(:first-child) {
                font-size: 16px;
                @media only print {
                    font-size: 10px;
                }
            }
            @media only print {
                font-size: 10px;
                padding: 16px 16px;
            }
        }
        &__th {
            @media only print {
                font-size: 10px !important;
                white-space: nowrap;
                padding: 16px 16px;
            }
        }
    }
    .invoice-info {
        &__summary {
            &__left {
                font-size: 14px;
                margin-top: 33px;
                @media only print {
                    font-size: 10px !important;
                }
            }
            &__right {
                font-size: 16px;
                @media only print {
                    font-size: 10px !important;
                }
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
                white-space:nowrap;
                @media only print {
                    font-size: 12px;
                }
            }
            &-value {
                font-weight: 500;
                font-size: 1rem;
                margin-top: 10px;
                white-space:nowrap;
                text-align: right;
                @media only print {
                    font-size: 12px;
                }
            }
        }
        &__thanks {
            font-weight: 500;
            font-size: 14px;
            color: #676767;
            margin-top: 20px;
            margin-bottom: 40px;
            @media only print {
                 font-size: 10px !important;
            }
        }
        &__item {
            font-size: 14px;
            @media only print {
                    font-size: 10px;
                }
        }
        &__type {
            color: ${p => p.theme.vars.colors.primaryDark};
            font-weight: 600;
        }
    }
`;
