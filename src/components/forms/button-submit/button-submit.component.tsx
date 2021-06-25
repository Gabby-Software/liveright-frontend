import React, {useState, useEffect} from 'react';
import Styles from './button-submit.styles';
import FormButton from "../form-button/form-button.component";

export type SubmitProps = {
    isSubmitting: boolean;
    isValid: boolean;
    dirty: boolean;
    children: React.ReactNode
};
const ButtonSubmit = ({isSubmitting, isValid, dirty, children}: SubmitProps) => {
    return (
        <FormButton
            className={'button-submit'}
            type={'primary'}
            loading={isSubmitting}
            htmlType={'submit'}
            disabled={
                !isValid
            // || !dirty
                || isSubmitting}
        >{children}</FormButton>
    );
};

export default ButtonSubmit;
