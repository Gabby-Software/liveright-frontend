import styled from "styled-components";

export default styled.div`

.invoice {
    &__header {
        ${p => p.theme.extend.flexCenter}
        ${p => p.theme.extend.h2}
    }
    &__type {
        color: ${p => p.theme.vars.colors.primaryDark};
    }
    &__price {
        color: ${p => p.theme.vars.colors.primary};
        margin-left: auto;
    }
    &__body {
        margin: 40px 0;
    }
    &__item {
        display: flex;
        ${p => p.theme.extend.p2}
        margin: 8px 0;
        &__name {
            color: ${p => p.theme.vars.colors.secondary};
        }
        &__value {
            color: ${p => p.theme.vars.colors.primaryDark};
            margin-left: auto;
        }
    }
    &__desc {
        
        &__title {
            ${p => p.theme.extend.h2}
            color: ${p => p.theme.vars.colors.primaryDark};
        }
        &__body {
            ${p => p.theme.extend.p2}
            color: ${p => p.theme.vars.colors.secondary};
            margin: 26px 0;
        }
    }
    &__footer {
        .ant-btn {
            margin-top: 14px;
        }
    }
}

`;
