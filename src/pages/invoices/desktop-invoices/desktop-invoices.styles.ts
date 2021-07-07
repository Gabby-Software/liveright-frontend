import styled from "styled-components";

export default styled.div`
    padding: 40px;
    display: flex;
    overflow: auto;
    .invoices {
        &__data {
            width: 100%;
            max-width: 920px;
            margin: auto;
        }
        &__view {
            margin:  0 0 auto 40px;
        }
        &__filter {
            margin: auto 0 0 auto;
            max-width: 242px;
        }
        &__filters {
            margin-bottom: 24px;
        }
    
`;
