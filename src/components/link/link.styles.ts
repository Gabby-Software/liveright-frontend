import styled from "styled-components";
import {Link} from "react-router-dom";

export default styled(Link)`
    color: ${p => p.theme.vars.colors.primary};
    transition: ${p => p.theme.vars.defaults.transition};
    font-weight: 600;
    &:hover {
        color: ${p => p.theme.vars.colors.primaryLight};
    }
`;
