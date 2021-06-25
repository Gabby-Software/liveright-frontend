import styled from "styled-components";

export default styled.div`
    ${p => p.theme.extend.flexCenter}
    .profile-heading {
        &__image {
            ${p => p.theme.mixin.circleImage('86px')}
            
        }
        &__data {
            margin-left: 10px;
        }
        &__name {
            font-weight: 500;
            font-size: 18px;
            color: ${p => p.theme.vars.colors.primaryDark};
        }
        &__address {
            color: ${p => p.theme.vars.colors.secondary3};
            ${p => p.theme.extend.flexCenter}
            font-weight: 600;
            font-size: 14px;
            svg {
                width: 11px;
                display: block;
                margin-right: 5px;
            }
            span {
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
`;
