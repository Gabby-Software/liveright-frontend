import styled from "styled-components";

export default styled.div`
.add-invoice {
    &__data {
        display: flex;
        justify-content:space-between;
        margin-bottom: 24px;
        &__label {
            ${p => p.theme.extend.label}
        }
        &__value {
            ${p => p.theme.extend.p1}
        }
        
    }
}
`;
