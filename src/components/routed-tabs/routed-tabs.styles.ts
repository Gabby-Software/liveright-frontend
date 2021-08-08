import styled from "styled-components";

export default styled.div`
    display: flex;
    position: relative;
    margin-bottom: 70px;
.tabs {

    &__item {
        display: block;
        color: ${p => p.theme.vars.colors.secondary};
        transition: ${p => p.theme.vars.defaults.transition};
        font-weight: 500;
        font-size: 14px;
        padding: 4px 12px;
        &:hover {
            color: ${p => p.theme.vars.colors.primary};
        }
        &__active {
            color: ${p => p.theme.vars.colors.primary};
        }
        &__wrapper {
            
        }
    }
    &__indicator {
        transition: ${p => p.theme.vars.defaults.transition};
        position: absolute;
        background-color: ${p => p.theme.vars.colors.primary};
        height: 2px;
        width: var(--w);
        left: var(--l);
        bottom: 0;
    }
}
`;
