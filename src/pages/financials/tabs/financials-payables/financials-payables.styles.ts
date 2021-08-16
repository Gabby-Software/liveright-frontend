import styled from "styled-components";
import {media} from "../../../../assets/styles/_media";

export default styled.div`
position: relative;
.invoices-cta {
    position: absolute;
    top: 0;
    right:0;
    ${media('tablet', 'max')`
        position: static;
        display: block;
        margin-bottom: 24px;
    `}
}
`;
