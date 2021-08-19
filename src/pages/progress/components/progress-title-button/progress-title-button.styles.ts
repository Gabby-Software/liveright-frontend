import styled, {css} from "styled-components";
import FormButton from "../../../../components/forms/form-button/form-button.component";

const desktopStyles = css`
  width: 200px;
  padding: 0;
  margin-left: auto;
`;

export const StyledButton = styled(FormButton)<{isMobile?: boolean}>`
  ${({isMobile}) => isMobile ? '' : desktopStyles};
`
