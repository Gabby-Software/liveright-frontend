import styled from "styled-components";

export default styled.div`

.sessions {
    &__item {
        margin-bottom: 12px;
        display: block;
        color: ${p => p.theme.vars.colors.primaryDark};
        box-shadow: 1px 2px 3px ${p => p.theme.vars.colors.secondary}88;
        &__card {
            ${p => p.theme.extend.flexCenter}
        }
        &__left {
        
        }
        &__right {
            margin-left:auto;
            padding-right: 10px;
        }
        &__name {
            ${p => p.theme.extend.h3}
        }
        &__date {
            ${p => p.theme.extend.small}
            color: ${p => p.theme.vars.colors.secondary};
        }
        &__time {
            ${p => p.theme.extend.p1}
        }
    }
}
`;
