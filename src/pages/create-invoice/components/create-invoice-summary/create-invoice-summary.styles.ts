import styled from "styled-components";

export default styled.div`
max-width: 200px;
margin-left:auto;
.ci-items__summary {
        margin: 40px 0;
        &__item {
            display: flex;
            justify-content: space-between;
        }
        &__label {
            color: ${p => p.theme.vars.colors.primaryDark};
            font-weight: 500;
        }
        &__value {
            color: ${p => p.theme.vars.colors.primary};
            font-weight: 600;
        }
}
`;
