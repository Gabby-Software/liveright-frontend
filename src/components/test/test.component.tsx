import React, {useState, useEffect} from 'react';
import Styles from './test.styles';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import Animator from "../../hoc/animator/animator.component";
import FormButton from "../forms/form-button/form-button.component";
import {toast} from "../toast/toast.component";

const Test = () => {
    const {t} = useTranslation();
    const [left, setLeft] = useState<number>(0);
    return <Styles>
        <h1>{t('hello-world')}</h1>
        <div>
            <span>styles test</span>
            <FormButton type={'primary'} onClick={() => toast.show({type: 'success', msg: 'I am a success message! '+Math.random()})}>SUCCESS TOAST</FormButton>
            <FormButton type={'default'} onClick={() => toast.show({type: 'error', msg: 'Some error occur, please try again later! '+Math.random()})}>Error TOAST</FormButton>
        </div>
        <div>
            <button onClick={() =>setLeft(200)}>200</button>
            <button onClick={() =>setLeft(500)}>500</button>
            <button onClick={() =>setLeft(700)}>700</button>
        </div>
        <Animator value={left} duration={1000} func={Animator.SPRING(1.5)}>
            {({value}) => (
                <div className={'circle'} style={{left:`${value}px`}}/>
            )}
        </Animator>
    </Styles>;
};

export default Test;
