import styled from "styled-components";

export default styled.div`
    .payment-data {
        &__items {
            margin: 34px 0 16px 0;
        }
        &__item {
            color: ${p => p.theme.vars.colors.secondary3};
            margin-bottom: 3px;
        }
    }
`;
