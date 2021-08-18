import React from 'react';
import Button from './form-button.styles';
import {ButtonProps} from "antd/lib/button";


const FormButton = (props: ButtonProps) => {
    return (
        <Button {...props}/>
    )
};

export default FormButton;
