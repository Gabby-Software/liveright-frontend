import styled from "styled-components";
import {media} from "../../assets/styles/_media";

export default styled.div`

.notif-settings {
    &__cont {
        max-width: 1050px;
        ${media('tablet', 'min')`
            display: flex;
            flex-wrap: wrap;
        `}
    }
    &__note {
        font-weight: 500;
        fot-size: 16px;
        color: #afafaf;
        margin: 52px 0;
    }
}
`;
