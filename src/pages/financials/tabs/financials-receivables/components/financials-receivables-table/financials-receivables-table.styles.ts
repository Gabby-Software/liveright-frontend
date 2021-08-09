import styled from "styled-components";

export default styled.div`
margin-bottom: 100px;
.invoice-table {

    &__status {
        &__paid {
            color: ${p => p.theme.vars.colors.success};
        }
        &__overdue {
            color: ${p => p.theme.vars.colors.error};
        }
        &__outstanding, &__due {
            color: ${p => p.theme.vars.colors.warning};
        }
        &__cancelled {
            color: ${p => p.theme.vars.colors.secondary};
        }
    }
    &__actions {
        display: flex;
        aling-items: center;
    }
    &__link {
        button {
            border-radius: 0;
            padding: 4px 17px;
            width: auto;
        }
        display: block;
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
