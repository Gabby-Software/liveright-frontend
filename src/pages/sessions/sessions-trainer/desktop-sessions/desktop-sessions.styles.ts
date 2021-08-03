import styled from "styled-components";
import FormButton from "../../../../components/forms/form-button/form-button.component";

export default styled.div`
    display: flex;
    overflow: auto;
    .select_input__wrapper {
        max-width: 260px;
    }
    .sessions {
        width: 100%;
        &__upcoming-table {
            margin-bottom: 48px;
        }
    }
`;
export const AddSessionAction = styled(FormButton)`
    margin-left: auto;
    max-width: 220px;
`;
