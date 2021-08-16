import styled from "styled-components";
import {Link} from "react-router-dom";
import ProfileImage from "../../../../components/profile-image/profile-image.component";

export const StyledAvatar = styled(ProfileImage)`
    .profile-image__img {
        ${p => p.theme.mixin.circleImage('31px')}
        ${p => p.theme.extend.flexCenter}
        font-size: 12px;
        margin-right:10px;
    }
`
export default styled.div`
    display:block;
    border-radius: 9px;
    background-color: ${p => p.theme.vars.colors.card};
    padding: 16px;
    color: ${p => p.theme.vars.colors.primaryDark};
    &:hover {
        color: ${p => p.theme.vars.colors.primaryDark};
    }
    font-size: 1rem;
    margin-bottom: 24px;
    .invoice-li {
        &__head {
            display: flex;
            justify-content: space-between;
        }
        &__id {
            font-weight: 600;
        }
        &__date {
        
        }
        &__hr {
            margin: 16px 10px 10px 10px;
            border-bottom: 1px solid ${p => p.theme.vars.colors.secondary2};
        }
        &__label {
            font-weight: 600;
        }
        &__body {
            margin: 10px 0 20px 0;
            ${ p=>p.theme.extend.flexCenter}
        }
        &__img {
            ${p => p.theme.mixin.circleImage('31px')}
            margin-right:10px;
        }
        &__name {
            
        }
        &__price {
            margin-left: auto;
            padding-left: 10px;
            font-size: 22px;
            font-weight: 600;
        }
        &__actions {
            ${ p=>p.theme.extend.flexCenter}
        }
        &__status {
            font-weight: 600;
            margin-right: auto;
            &__paid {
                color: ${p => p.theme.vars.colors.success};
            }
            &__overdue {
                color: ${p => p.theme.vars.colors.error};
            }
            &__cancelled {
                color: ${p => p.theme.vars.colors.secondary};
            }
            &__outstanding, &__due {
                color: ${p => p.theme.vars.colors.warning};
            }
        }
        &__cta {
            margin-left: 10px;
            padding: 12px 14px;
            background-color: #f3f3f3;
            color: #676767;
            border-radius: 4px;
            &:hover {
                background-color: ${p => p.theme.vars.colors.secondary2};
                color: ${p => p.theme.vars.colors.primaryDark};
            }
        }
    }
`;
