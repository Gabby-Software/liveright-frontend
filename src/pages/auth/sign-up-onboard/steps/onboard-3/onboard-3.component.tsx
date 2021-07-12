import React, {useState, useEffect} from 'react';
import Styles from './onboard-3.styles';
import FormTextarea from "../../../../../components/forms/form-textarea/form-textarea.component";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import {useAuth} from "../../../../../hooks/auth.hook";
import userTypes from "../../../../../enums/user-types.enum";

const Onboard3 = () => {
    const {t} = useTranslation();
    const {type} = useAuth();
    return (
        <Styles>
            {
                type === userTypes.CLIENT ?  (
                    <>
                        <FormTextarea name={'dietary_restrictions'} label={t('profile:dietary-restrictions')}/>
                        <FormTextarea name={'injuries'} label={t('profile:injuries')}/>
                    </>
                ): (
                    <>
                        <FormTextarea name={'about'} label={t('profile:about')}/>
                        <FormTextarea name={'qualifications'} label={t('profile:qualifications')}/>
                        <FormTextarea name={'additional_information'} label={t('profile:additional-information')}/>
                    </>
                )
            }
        </Styles>
    );
};

export default Onboard3;
