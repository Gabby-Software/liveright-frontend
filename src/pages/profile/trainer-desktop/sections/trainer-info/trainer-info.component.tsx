import React, {useState, useEffect} from 'react';
import Styles from './trainer-info.styles';
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import {useTrainer} from "../../../../../hooks/trainer.hook";
import ProfileTitle from "../../../../../components/profile/profile-title/profile-title.component";
import ProfileInfo from "../../../../../components/profile/profile-info/profile-info.component";

const TrainerInfo = () => {
    const {t} = useTranslation();
    const {about, qualifications, additional_information} = useTrainer();
    const items  = [
        {name: t('profile:about'), value: about, formName: 'about'},
        {name: t('profile:qualifications'), value: qualifications,formName:'qualifications'},
        {name: t('profile:additional-information'), value: additional_information,formName:'additional_information'},
    ];
    return (
        <Styles>
            <ProfileTitle title={t('profile:trainer-info')}/>
            <div className={'trainer-info__cont'}>
                {
                    items.map(t => <ProfileInfo {...t}/>)
                }
            </div>
        </Styles>
    );
};

export default TrainerInfo;
