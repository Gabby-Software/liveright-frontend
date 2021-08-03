import styled from "styled-components";
import {Form} from "formik";
import FormButton from "../../../../components/forms/form-button/form-button.component";

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
