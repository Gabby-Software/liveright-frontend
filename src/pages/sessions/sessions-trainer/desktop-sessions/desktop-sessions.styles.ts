import styled from "styled-components";
import {Form} from "formik";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import Card from "../../../../components/card/card.style";

export const AwaitingCard = styled(Card)`
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  padding: 24px 16px;
  margin-right: 24px;
  min-width: 300px;
  
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
    max-width: 220px;
`;

export const TitleContent = styled(Form)`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 32px;
    width: 100%;

  .select_input__cont {
      max-width: 200px;
      .ant-select {
        display: flex;
        align-items: center;
        padding: 0;
        height: 40px;
      }
  }
  
    button {
      padding: 4px 17px;
      box-shadow: none;
      width: auto;
      height: 40px;
    }
`

export default styled.div`
    display: flex;
    overflow: auto;
    .sessions {
        width: 100%;
        padding-bottom: 100px;
      
        .carousel__cont {
          padding: 16px;
        }
      
        &__options {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 40px;
          
          button {
            padding: 4px 17px;
            box-shadow: none;
            width: auto;
            height: 40px;
            margin-right: 4px;
          }
        }
      
        &__progress {
          display: flex;
          flex-direction: row;
          
          div:first-child {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-top: 54px;
            padding-bottom: 32px;
            margin-right: 32px;
          }
        }
    }
`;
