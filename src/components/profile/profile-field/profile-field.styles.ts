import styled from "styled-components";

export default styled.div`
    width: 33.33%;
    box-sizing:border-box;
    margin-bottom: 34px;
    padding-right: 16px;
    .field {
        &__name {
            font-size: 1rem;
            color: ${p => p.theme.vars.colors.secondary3};
        }
        &__value {
            font-size: 1rem;
            font-weight: 500;
            color: ${p => p.theme.vars.colors.primaryDark};
            margin-top:8px;
            word-break: break-word;
        }
    }
`;
