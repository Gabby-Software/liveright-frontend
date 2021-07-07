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
            transition: ${p =>p.theme.vars.defaults.transition};
            width: 0;
            overflow: hidden;
            flex-shrink:0;
            &__card {
                width: 432px;    
            }
            &__open {
                width: 432px;
            }
        }
        &__close {
            margin: 24px 8px;
            cursor:pointer;
        }
        &__filter {
            margin: auto 0 0 auto;
            max-width: 242px;
            flex-shrink:2;
        }
        &__filters {
            margin-bottom: 24px;
        }
    
`;
