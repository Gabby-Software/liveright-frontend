import styled from "styled-components";

export default styled.div`
font-size: 16px;
font-weight: 400;
.invoice-m-summary {

    &__row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 13px;
        font-size: 16px;
        &__space {
            margin-bottom: 36px;
        }
        &__big {
            font-size: 18px;
        }
    }
    &__item {
        white-space: nowrap;
    }
    &__bold {
        font-weight: 500;
    }
    &__ebold {
        font-weight: 600;
    }
    &__hr {
        margin: 32px -20px;
        width: calc(100% + 40px);
        border-top: 1px solid ${p => p.theme.vars.colors.light};
    }
}
`;
