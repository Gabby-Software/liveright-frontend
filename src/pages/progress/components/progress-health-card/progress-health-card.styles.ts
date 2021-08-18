import styled, {css} from "styled-components";

import Card from "../../../../components/card/card.style";
import FormButton from "../../../../components/forms/form-button/form-button.component";

const noLogsStyles = css`
  background-color: rgb(255, 214, 214);
`;

export const StyledCard = styled(Card)<{noLogs: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  height: 170px;
  padding: 24px 16px;
  color: ${({theme}) => theme.vars.colors.primaryDark};
  user-select: none;
  
  ${({noLogs}) => noLogs ? noLogsStyles : ''}
`;

export const Quality = styled.span`
  font-style: italic;
  ${({theme}) => theme.extend.p2}
`;

export const Data = styled.span`
  ${({theme}) => theme.extend.h3}
  text-align: center;
`;

export const Button = styled(FormButton)`
  padding: 4px;
`;
