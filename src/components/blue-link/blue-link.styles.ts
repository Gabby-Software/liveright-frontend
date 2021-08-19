import styled from "styled-components";
import {Link} from "react-router-dom";

export default styled(Link)`
    font-size: 14px;
    font-weight: 400;
    color: ${p => p.theme.vars.colors.link};
    will-change: color;
    display: inline-flex;
    align-items: center;
    transition: ${p => p.theme.vars.defaults.transition};
    &:hover {
        color: ${p => p.theme.vars.colors.link_darken};
    }
`;
