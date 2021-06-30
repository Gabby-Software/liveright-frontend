import styled from "styled-components";

export default styled.section`
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
            color: ${p => p.theme.vars.colors.secondary};
            ${p => p.theme.extend.flexCenter}
            font-weight: 600;
            font-size: 14px;
            justify-content: flex-start;
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
        &__edit {
            ${p => p.theme.extend.flexCenter}
            color: ${p => p.theme.vars.colors.primaryDark};
            margin-left: auto;
            width: 30px;
            height: 30px;
            background-color: ${p => p.theme.vars.colors.card};
            border-radius: ${p => p.theme.vars.sizes.borderRadius};
        }
    }
`;
