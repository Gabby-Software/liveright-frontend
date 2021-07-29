import styled from "styled-components";
import {media} from "../../../../../assets/styles/_media";

export default styled.div`

.session-top {
    color: ${p => p.theme.vars.colors.primaryDark};
    &__head {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
        ${media('tablet', 'max')`
            display: block;
        `}
    }
    &__client {
        display:flex;
        align-items: center;
        ${media('tablet', 'max')`
            margin-bottom: 24px;
        `}
    }
    &__image {
        ${p => p.theme.mixin.circleImage('32px')}
        margin-right: 10px;
    }
    &__name {
        ${p => p.theme.extend.p1}
    }
    &__credits {
        border: 1px solid ${p => p.theme.vars.colors.secondary};
        color: ${p => p.theme.vars.colors.secondary};
        display: flex;
        justify-content: space-between;
        max-width: 320px;
        padding: 4px 12px;
        margin: auto 0;
        ${media('tablet', 'max')`
            max-width: none;
        `}
    }
    &__requested {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 40px 0;
        ${media('tablet', 'max')`
            display: block;
            margin: 24px 0;
        `}
        &__label {
            background-color: ${p => p.theme.vars.colors.primary}88;
            padding: 6px 12px;
            font-weight: 600;
            white-space: nowrap;
            width: 100%;
            flex-shrink: 2;
            ${media('tablet', 'max')`
                margin-bottom: 24px;
            `}
        }
        &__dates {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;
            ${media('tablet', 'max')`
                justify-content: flex-start;
            `}
        }
        &__date {
            ${p => p.theme.extend.flexCenter}
            ${media('tablet', 'max')`
                margin-right: 24px;
            `}
            svg {
                width: 16px;
                height: auto;
                display: block;
                margin-right: 10px;
            }
        }
    }
}
`;
