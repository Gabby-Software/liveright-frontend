import styled from "styled-components";
import ProfileImage from "../../../../components/profile-image/profile-image.component";
import {Link} from "react-router-dom";

export const AvatarStyled = styled(ProfileImage)`
    .profile-image__img {
        width: 42px;
        height: 42px;
    }
`
export default styled(Link)`
    display: block;
    margin-top: 10px;
    ${p => p.theme.extend.flexCenter}
    background-color: ${p => p.theme.vars.colors.secondary3_v2};
    padding: 14px 16px;
    border-radius: 8px;
    transition: ${p => p.theme.vars.defaults.transition};
    &:hover {
        background-color: #e8e8e8;        
    }
    &.chat-room__unread {
        background-color: #FFF8F8;
        &:hover {
            background-color: #faecec;        
        }
    }
    .chat-room {
        &__left {
            padding-right: 14px;
        }
        &__center {
            width: 100%;
            
        }
        &__right {
           align-self: flex-start;
        }
        &__name {
            color: ${p => p.theme.vars.colors.primaryDark_v2};
            font-size: 14px;
            font-weight: 700;
            line-height: 20px;            
        }
        &__message {
            color: ${p => p.theme.vars.colors.secondary4_v2};
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
                width: 170px;
                overflow:hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
        }
        &__date {
            color: ${p => p.theme.vars.colors.primary};
            font-size: 12px;
            white-space: nowrap;
        }
        &__unreads {
            ${p => p.theme.mixin.circleImage('21px')}
            ${p => p.theme.extend.flexCenter}
            background-color: ${p => p.theme.vars.colors.primary};
            color: white;
            flex-shrink: 0;
            font-size: 12px;
            margin: 5px 0 0 auto;
        }
    }
`;
