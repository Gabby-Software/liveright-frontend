import styled from "styled-components";
import {Link} from 'react-router-dom';

export default styled(Link)`
    display: block;
    font-weight: 500;
    color: #333333;
    margin-top: 24px;
    font-size:14px;
    &:hover {
        color: #333333;
        text-decoration: underline;
    }
`
