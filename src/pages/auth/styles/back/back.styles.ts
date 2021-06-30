import styled from "styled-components";
import {Link} from 'react-router-dom';

export default styled(Link)`
    position: absolute;
    top:30px;
    left:22px;
    width: 14px;
    color: black;
    @media all and (min-width: ${p =>p.theme.vars.media.tablet}px) {
        display: none;
    }
`;
