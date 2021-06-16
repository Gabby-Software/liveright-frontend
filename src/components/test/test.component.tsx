import React, {useState, useEffect} from 'react';
import Styles from './test.styles';
import {useTranslation} from "../../modules/i18n/i18n.hook";

const Test = () => {
    const {t} = useTranslation();
    return <Styles>
        <h1>{t('hello-world')}</h1>
        <div>
            <span>styles test</span>
        </div>
    </Styles>;
};

export default Test;
