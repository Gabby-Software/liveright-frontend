import styled from "styled-components";
import FormRow from "../../../../components/forms/form-row/form-row.component";
import {media} from "../../../../assets/styles/_media";

export default styled(FormRow)`
margin: 16px 0 46px 0;
.ant-btn {
    margin-top: 24px;
    ${media('tablet', 'min')`
        margin-top: auto;
    `}
}
`;
