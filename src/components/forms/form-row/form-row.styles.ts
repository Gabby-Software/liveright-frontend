import styled from "styled-components";
import {media} from "../../../assets/styles/_media";

export default styled.div`
${media('tablet', 'min')`
    display: flex;
    >div {
        width:100%;
        margin-right: 14px;
        &:last-child {
            margin-right: 0;
        }
    }
`}`;
