import styled from "styled-components";

export default styled.div`
    background-color: ${p =>p.theme.vars.colors.card};
    border-radius:${p => p.theme.vars.sizes.borderRadius};
    padding: 15px 13px;
    min-width: 247px;
    display: flex;
    margin-right: 27px;
    .account {
        &__img {
            ${p =>p.theme.mixin.circleImage('45px')}
        }
        &__data {
            margin-left: 15px;
        }
        &__name {
            font-size: 14px;
            font-weight: 500;
            color:black;
        }
        &__type {
            font-size:12px;
            color: ${p => p.theme.vars.colors.secondary3};
        }
    }
`;
