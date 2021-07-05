import React, {useState, useEffect} from 'react';
import Styles from './profile-payment-info.styles';
import {useProfile} from "../../../../hooks/profile.hook";
import Card from "../../../../components/card/card.style";
import {date} from "../../../../pipes/date.pipe";
import {ReactComponent as EmailIcon} from "../../../../assets/media/icons/email.svg";
import {ReactComponent as PhoneIcon} from "../../../../assets/media/icons/phone.svg";
import {OptionType} from "../../../../types/option.type";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";

const ProfilePaymentInfo = () => {
    const {payment_info} = useProfile();
    const {t} = useTranslation();
    const items: OptionType[] = [
        {label: t('profile:payment-info.bank'), value: payment_info.bank},
        {label: t('profile:payment-info.branch-name'), value: payment_info.branch_name},
        {label: t('profile:payment-info.name-on-account'), value: payment_info.name_on_account},
        {label: t('profile:payment-info.account-number'), value: payment_info.account_number},
    ];
    return (
        <Styles>
            <Card className={'payment-data__items'}>
                {
                    items.map(({label,value}) => value?(
                        <div className={'payment-data__item'}>{label} {value}</div>
                    ):null)
                }
            </Card>
        </Styles>
    );
};

export default ProfilePaymentInfo;
