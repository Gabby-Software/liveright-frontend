import styled from "styled-components";
import {media} from "../../assets/styles/_media";

const PageSubtitle = styled.h2`
    font-weight: 600;
    font-size: 20px;
    color: ${p => p.theme.vars.colors.dark2};
    margin: 8px 0;
    ${media('tablet', 'max')`
        font-weight: 500;
    `}
`;

export default PageSubtitle;
