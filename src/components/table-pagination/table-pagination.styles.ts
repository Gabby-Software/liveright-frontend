import styled from "styled-components";

export default styled.div`
display: flex;
align-items: center;
justify-content:space-between;
padding: 14px 30px;
background: ${p => p.theme.vars.colors.card};
border: 1px solid #DFDFE1;
.t-pagination {
    &__left, &__right {
        display: flex;
        align-items: center;
        font-weight:500;
        font-size: 14px;
        color: ${p => p.theme.vars.colors.primaryDark};
    }
    &__light {
        color: #afafaf;
        margin: 0 10px;
    }
    &__page {
        display: block;
        border-radius: 2px;
        background-color: white;
        padding: 3px 8px;
        border: 1px solid #dfdfdf;
        margin: 0 25px;
    }
    &__actions {
        
    }
    &__action {
        margin: 0 15px;
        cursor: pointer;
        &__prev {
        
        }
        &__next {
        
        }
    }
}
`;
