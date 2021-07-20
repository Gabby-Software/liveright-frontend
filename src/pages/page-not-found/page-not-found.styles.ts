import styled from "styled-components";
import bg from '../../assets/media/404.svg';
import {media} from "../../assets/styles/_media";

export default styled.h1`
    background-image: url("${bg}");
    background-size: cover;
    h1 {
        font-size: 8.5rem;
        font-weight: 600;
        letter-spacing: 8px;
        margin: 0;
    }
    p {
        margin-bottom:100px;
        font-size: 22px;
    }
    .pnf {
        &__cont {
            ${p => p.theme.extend.flexCenter}
            max-width: 800px;
            height: 100vh;
            margin: auto;
            color: ${p => p.theme.vars.colors.primaryDark};
            flex-direction: column;
            padding: 152px;
            text-align: center;
            border-right: 1px solid ${p => p.theme.vars.colors.light};
            border-left: 1px solid ${p => p.theme.vars.colors.light};
        }
    }
    ${media('tablet', 'max')`
        h1 {
            font-size: 6rem;
            letter-spacing: 3px;
        }
        p {
            font-size: 16px;
        }
        .pnf {
            &__cont {
                padding: 20px;
                border-right: none;
                border-left: none;
            }
        }
    `}
    
`;
