import React, {useState, useEffect} from 'react';
import Styles from './bottom-button.styles';
import FormButton from "../forms/form-button/form-button.component";
import {ButtonProps} from "antd";

const BottomButton = (props: ButtonProps) => {
    return (
        <Styles>
            <div className={'bottom-button__cont'}>
                <FormButton {...props}/>
            </div>
        </Styles>
    )
};

export default BottomButton;
