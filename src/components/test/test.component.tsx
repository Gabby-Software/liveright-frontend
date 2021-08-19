import React, {useState, useEffect} from 'react';
import Styles from './test.styles';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import Animator from "../../hoc/animator/animator.component";
import FormButton from "../forms/form-button/form-button.component";
import {toast} from "../toast/toast.component";

const Test = () => {
    return (
        <Styles>
            <p style={{fontWeight: 300}}>AaBbCcDdEeFfGgHhŞşIıİi Example</p>
            <p style={{fontWeight: 300}}><i>AaBbCcDdEeFfGgHhŞşIıİi Example</i></p>
            <p style={{fontWeight: 400}}>AaBbCcDdEeFfGgHhŞşIıİi Example</p>
            <p style={{fontWeight: 400}}><i>AaBbCcDdEeFfGgHhŞşIıİi Example</i></p>
            <p style={{fontWeight: 700}}>AaBbCcDdEeFfGgHhŞşIıİi Example</p>
            <p style={{fontWeight: 700}}><i>AaBbCcDdEeFfGgHhŞşIıİi Example</i></p>
            <p style={{fontWeight: 900}}>AaBbCcDdEeFfGgHhŞşIıİi Example</p>
            <p style={{fontWeight: 900}}><i>AaBbCcDdEeFfGgHhŞşIıİi Example</i></p>
        </Styles>
    );
};

export default Test;
