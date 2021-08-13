import styled from "styled-components";
import FormRow from "../../../../../../components/forms/form-row/form-row.component";
import {media} from "../../../../../../assets/styles/_media";

export default styled(FormRow)`
margin: 40px 0 46px 0;
.ant-btn {
    margin-top: 24px;
    ${media('tablet', 'min')`
        margin-top: auto;
    `}
}
.text_input__wrapper, .select_input__wrapper {
    margin-bottom: 12px;
}
`;
