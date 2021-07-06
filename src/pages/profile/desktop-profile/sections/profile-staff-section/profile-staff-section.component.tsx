import React, {useState, useEffect} from 'react';
import Styles from './profile-staff-section.styles';
import ProfileTitle from "../../../../../components/profile/profile-title/profile-title.component";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import Card from "../../../../../components/card/card.style";
import {ReactComponent as Invoices} from "../../../../../assets/media/icons/invoices.svg";
import {ReactComponent as Sessions} from "../../../../../assets/media/icons/sessions.svg";
type StaffItemType = {
    Icon: React.ElementType,
    title: string;
    text1: string;
    text2: string;
};
const staffItems: StaffItemType[] = [
    {title: 'Invoices', Icon: Invoices, text1: '3 Open Invoices', text2: 'Invoice History'},
    {title: 'Sessions', Icon: Sessions, text1: '4 Free Sessions', text2: '2 Upcoming Sessions'},
];
const ProfileStaffSection = () => {
    const {t} = useTranslation();
    return (
        <Styles>
            <ProfileTitle title={t('profile:trainer-info')}/>
            <div className={'staff__cont'}>
                {
                    staffItems.map(({Icon, text1, text2, title}, i) => (
                        <Card className={'staff'} key={i}>
                            <div className={'staff__heading'}>
                                <Icon/>
                                <h3 className={'staff__title'}>{title}</h3>
                            </div>
                            <div className={'staff__body'}>
                                <div>{text1}</div>
                                <div>{text2}</div>
                            </div>
                        </Card>
                    ))
                }
            </div>
        </Styles>
    )
};

export default ProfileStaffSection;