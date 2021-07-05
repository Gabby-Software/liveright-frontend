import React, {useState, useEffect} from 'react';
import Styles from './trainer-data.styles';
import ProfileTitle from "../../../../../components/profile/profile-title/profile-title.component";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import ProfileField from "../../../../../components/profile/profile-field/profile-field.component";
import {date} from "../../../../../pipes/date.pipe";
import {useTrainer} from "../../../../../hooks/trainer.hook";

type dataItemType = {
    name: string;
    value: string;
};
const TrainerData = () => {
    const {t} = useTranslation();
    const trainer = useTrainer();
    const dataItems: dataItemType[] = [
        {name: t('profile:first-name'), value: trainer.first_name},
        {name: t('profile:last-name'), value: trainer.last_name},
        {name: t('profile:birth-date'), value: date(trainer.birthday)},
        {name: t('profile:email'), value: trainer.email},
        {name: t('profile:phone'), value: trainer.phone_number},
        {name: t('profile:address'), value: trainer.address},
        {name: t('profile:join-date'), value: date(trainer.created_at)},
        {name: t('profile:gender'), value: trainer.gender || ''},
    ];
    return (
      <Styles>
          <ProfileTitle title={t('profile:personal-profile')}/>
          <div className={'trainer-data__cont'}>
              {
                  dataItems.filter(t => t.value).map((item: dataItemType) => (
                      <ProfileField key={item.name} {...item} formName={''}/>
                  ))
              }
          </div>
      </Styles>
    );
};

export default TrainerData;
