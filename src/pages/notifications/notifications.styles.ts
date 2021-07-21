import styled from "styled-components";
import {media} from "../../assets/styles/_media";

export default styled.div`

    .notification {
        &__hr {
            position: relative;
            z-index: 1;
            margin: 49px 0;
            ${p => p.theme.extend.flexCenter}
            &:before {
                ${p => p.theme.extend.pseudo}
                z-index: -1;
                top:0;
                bottom:0;
                left:0;
                right:0;
                margin: auto;
                height:1px;
                background-color: #afafaf;
            }
            span {
                background-color: white;
                padding: 0 35px;
                font-size: 16px;
                font-weight: 500;
                color: ${p => p.theme.vars.colors.labelLight}
                ${media('tablet', 'min')`
                    padding: 0 65px;
                `}
            }
        }
        &__date-label {
            margin: 24px 0;
            font-size: 18px;
            font-weight: 600;
            color: #333;
            ${media('tablet', 'min')`
                margin: 45px 0;
                font-size: 22px;
            `}
        }
    }
`;
