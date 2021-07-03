import styled from "styled-components";

export default styled.div`
&:first-child {
    margin-top: 14px;
}
.activity-small {

    &__content {
        display:flex;
        justify-content: flex-start;
        align-items: center;
        margin: 4px 0;
        &:before {
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 8px;
            flex-shrink: 0;
        }
    }
    &__meal {
        &:before {
            background-color: ${p => p.theme.vars.colors.success}; 
        }
    }
    &__workout {
        &:before {
            background-color: ${p => p.theme.vars.colors.warning}; 
        }
    }
    &__session {
        &:before {
            background-color: ${p => p.theme.vars.colors.info}; 
        }
    }
    &__name {
        font-size: 12px;
        font-weight: 500;
        margin-right: auto;
        width: 100%;
        text-align:left;
        line-height: 16px;
        height: 16px;
        overflow: hidden;
        color: ${p => p.theme.vars.colors.secondary3};
        @media all and (max-width: 1500px) {
            display: none;
        }
    }
    &__time {
        font-size: 12px;
        font-weight: 400;
        color: ${p => p.theme.vars.colors.secondary};
        margin-left: 8px;
    }
}
`;
