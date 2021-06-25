import React, {useState, useEffect} from 'react';
import Styles from './profile-staff.styles';
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/reducers";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import Card from "../../../../components/card/card.style";
import {ReactComponent as Invoices} from "../../../../assets/media/icons/invoices.svg";
import {ReactComponent as Sessions} from "../../../../assets/media/icons/sessions.svg";

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
const ProfileStaff = () => {
    const profileData = useSelector((state: RootState) => state.account);
    const {t} = useTranslation();
    return (
        <Styles>
            {
                staffItems.map(({Icon, text1, text2, title}) => (
                    <Card className={'staff'}>
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
        </Styles>
    );
};

export default ProfileStaff;
