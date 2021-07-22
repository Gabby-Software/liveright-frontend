import styled from "styled-components";
import {Link} from "react-router-dom";

export default styled(Link)`
    ${p =>p.theme.extend.flexCenter}
    font-weight: 600;
    font-size: 18px;
    color: ${p =>p.theme.vars.colors.primaryDark};
    margin: 0 0 32px 0;
    &:hover {
        color: ${p =>p.theme.vars.colors.primaryDark};
    }
    .mobile-back {
        &__icon {
            width: 9px;
            height: auto;
            margin-right: 10px;
            display: block; 
        }
        &__alias {
            margin-right: auto;
        }
    }
`;
