import styled from "styled-components";
import Card from "../../../../components/card/card.style";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import {Form as UnstyledForm} from "formik";

export const AwaitingCard = styled(Card)`
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  padding: 24px 16px;
  margin: 8px;
  margin-bottom: 16px;
  
  div:first-child {
    display: flex;
    flex-direction: row;
    user-select: none;

    .ant-avatar {
      margin-right: 8px;
    }
  }
  
  .schedule-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    cursor: pointer;
    user-select: none;
    margin-top: 24px;
    color: ${({theme}) => theme.vars.colors.primary};
    
    span:first-child {
      margin-right: 8px;
      transition: all 0.1s linear;
      border-bottom: 1px solid ${({theme}) => theme.vars.colors.primary};
    }

    &:hover {
      span:first-child {
        margin-right: 12px;
      }
    }
  }
`;

export const AddSessionAction = styled(FormButton)`
    max-width: 120px;
`;

export const ManageTargetsAction = styled(FormButton)`
`;

export const Form = styled(UnstyledForm)`
    width: 100%;

  .select_input__cont {
    width: 100%;
      .ant-select {
        display: flex;
        align-items: center;
        padding: 0;
        height: 40px;
      }
  }
`

export const TitleContent = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  
  .sessions {
    &__options {
      display: flex;
      flex-direction: row;
      max-width: 100%;
      margin-top: 16px;

      button:nth-child(1) {
        width: 75%;
        box-shadow: none;
        margin-right: 8px;
      }
    }

    &__progress {
      display: flex;
      flex-direction: column;
      margin: 40px 0;
      
      &__labels {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 24px 24px 16px;
        width: 200px;
        margin-left: auto;
        ${({theme}) => theme.extend.label};
      }
    }
  }
`;
