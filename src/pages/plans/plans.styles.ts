import styled from "styled-components";
import {media} from "../../assets/styles/_media";

export default styled.div`
    ${p => p.theme.extend.layout}
    ${media('tablet', 'min')`
        margin: 40px;
        padding:0;
    `}
    .plans {
        &__filters {
            max-width: 540px;
            margin-bottom: 40px;
        }
    }    
`;
