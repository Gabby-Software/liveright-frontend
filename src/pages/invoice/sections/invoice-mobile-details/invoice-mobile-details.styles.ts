import styled from "styled-components";

export default styled.div`
margin: 40px 0;
.accordion__item__card {
    background-color: white;
    border-radius: 0;
    border-top: 1px solid ${p => p.theme.vars.colors.light};
    border-bottom: 1px solid ${p => p.theme.vars.colors.light};
}
    .invoice-att {
        width: 100%;
        font-weight: 500;
        font-size: 16px;
        color: ${p => p.theme.vars.colors.primaryDark};
        margin: 41px 0;
        &:nth-child(even) {
            text-align: right;
            .invoice-att {
                &__desc {
                    margin-left: auto;
                }
            }
        }
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
    }
`;
