import styled from "styled-components";

export const SwipeContent = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
        
  svg {
    width: 70px;
    height: 70px;
    color: ${({theme}) => theme.vars.colors.primaryLight};
  }
`;

export default styled.div`
`;
