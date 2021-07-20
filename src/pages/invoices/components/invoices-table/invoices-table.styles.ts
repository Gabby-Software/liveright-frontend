import styled from "styled-components";

export default styled.div`
margin-bottom: 100px;
.invoice-table {

    &__status {
    
    }
    &__actions {
        display: flex;
    }
    &__link {
        button {
            border-radius: 0;
            padding: 4px 17px;
            width: auto;
        }
        display: block;
        margin-left: auto;
    }
    &__action {
        display: block;
        color: #afafaf;
        margin-left: 28px;
        flex-shrink:0;
        cursor: pointer;
        transition: ${p => p.theme.vars.defaults.transition};
        &:first-child {
            margin-left: auto;
        }
        &:hover {
            color: ${p => p.theme.vars.colors.secondary3};
        }
    }
}
`;
