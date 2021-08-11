import styled from "styled-components";
import Card from "../../../../components/card/card.style";

export const SwipeComponentWrapper = styled.div`
  position: absolute;
  z-index: -1;
  display: flex;
`

export const SessionCardWrapper = styled.div`
  position: relative;
`

export const StyledSessionCard = styled(Card)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  ${p => p.theme.extend.p1};
  
  & > * {
    max-width: 70%;
  }

  .session-card-with {
    font-weight: 600;
    margin: 12px 0;
  }
  
  .session-card-name {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .sessions-card-datetime {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 12px;
    right: 12px;
    width: 100px;
    
    div {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px;
      border-radius: 5px;
      margin-bottom: 8px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;
      
      span {
        ${p => p.theme.extend.label};
      }
    }
    
    span {
      color: ${p => p.theme.vars.colors.labelLight};
      ${p => p.theme.extend.h2};
    }
  }
`
