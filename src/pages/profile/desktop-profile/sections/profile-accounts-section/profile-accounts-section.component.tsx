import React, {useState, useEffect} from 'react';
import Styles from './profile-accounts-section.styles';
import ProfileTitle from "../../../../../components/profile/profile-title/profile-title.component";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/reducers";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import profilePlaceholder from '../../../../../assets/media/profile-placeholder.png';
import ProfileAccount from "../../../../../components/profile/profile-account/profile-account.component";
import {ReactComponent as AddIcon} from "../../../../../assets/media/icons/add.svg";

type AccountType = {
    name: string;
    type: string;
    image: string;
};
const accounts:AccountType[] = [
    {name: 'Chris Hemington', type: 'Trainer', image: profilePlaceholder},
    {name: 'John Doe', type: 'Trainer', image: profilePlaceholder},
];
const ProfileAccountsSection = () => {
    // const profileData = useSelector((state: RootState) => state.account);
    const {t} = useTranslation();
    return (
        <Styles>
            <ProfileTitle title={t('profile:accounts')}/>
            <div className={'accounts__cont'}>
                {
                    accounts.map(account => (
                        <ProfileAccount key={account.name} {...account}/>
                    ))
                }
                <div className={'accounts__add'}>
                    <AddIcon/>
                </div>
            </div>
        </Styles>
    )
};

export default ProfileAccountsSection;
