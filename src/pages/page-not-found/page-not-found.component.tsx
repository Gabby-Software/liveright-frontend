import React, {useState, useEffect} from 'react';
import Styles from './page-not-found.styles';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {Link} from "react-router-dom";
import {Routes} from "../../enums/routes.enum";
import FormButton from "../../components/forms/form-button/form-button.component";


const PageNotFound = () => {
    const {t} = useTranslation();
    return (
        <Styles>
            <div className={'pnf__cont'}>
            <h1>404</h1>
            <p>{t('not-found-desc')}</p>
            <Link to={Routes.HOME}>
                <FormButton type={'primary'}>
                    {t('back-home')}
                </FormButton>
            </Link>
            </div>
        </Styles>
    );
};

export default PageNotFound;
