import styled from "styled-components";
import {media} from "../../../assets/styles/_media";

export default styled.div`
    .switch {
        &__wrapper {
            max-width: 230px;
            margin: 31px auto;
            ${media('tablet', 'min')`
                order: 2;
                margin: 31px 40px 31px auto;
            `}
        }
    }
    .calendar-heading {
        &__controller {
            ${p => p.theme.extend.flexCenter}
            margin: 46px 40px 28px 40px;
            ${media('tablet', 'min')`
                min-width: 320px;
            `}
        }
        &__icon {
            background-color: ${p => p.theme.vars.colors.light};
            padding: 12px 11px;
            box-sizing: content-box;
            height: 12px;
            color: black;
            transition: ${p =>p.theme.vars.defaults.transition};
            &:first-child {
                border-radius: ${p => p.theme.vars.sizes.borderRadius} 0 0 ${p => p.theme.vars.sizes.borderRadius}; 
            }
            &:last-child {
                border-radius: 0 ${p => p.theme.vars.sizes.borderRadius} ${p => p.theme.vars.sizes.borderRadius} 0; 
            }
            &:hover {
                background-color: ${p => p.theme.vars.colors.secondary2};
            }
        }
        &__label {
            width: 100%;
            text-align: center;
            font-weight: 600;
            &.week {
                font-size: 14px;
                ${media('tablet', 'min')`
                    font-size:18px;
                `}
            }
            &.month {
                font-size: 18px;
            }
        }
        &__days {
            ${p =>p.theme.extend.flexCenter};
            margin: 24px 28px;
        }
        &__day {
            width: 100%;
            text-align: center;
            font-weight: 600;
            font-size: 12px;
            ${media('tablet', 'min')`
                   font-size: 14px;
            `}  
        }
        &__top {
            ${media('tablet', 'min')`
                display: flex;
            `}
        }
    }
`;
