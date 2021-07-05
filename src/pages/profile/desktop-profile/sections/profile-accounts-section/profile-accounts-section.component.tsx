import React, {useState} from 'react';
import Styles from './profile-accounts-section.styles';
import ProfileTitle from "../../../../../components/profile/profile-title/profile-title.component";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import profilePlaceholder from '../../../../../assets/media/profile-placeholder.png';
import ProfileAccount from "../../../../../components/profile/profile-account/profile-account.component";
import SwitchAccountModal from "../../../../../components/switch-account-modal/switch-account-modal.component";
import AccountActions from "../../../../../enums/account-actions.enum";

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
    const [addAccountOpen, setAddAccountOpen] = useState(false);
    const activeAccount = 0;
    const {t} = useTranslation();
    return (
        <Styles>
            <ProfileTitle title={t('profile:accounts')}/>
            <div className={'accounts__cont'}>
                {
                    accounts.map((account,i) => (
                        <ProfileAccount active={i === activeAccount} key={account.name} {...account}/>
                    ))
                }
                <div className={'accounts__add'} onClick={() => setAddAccountOpen(true)}>
                    <span>{t('menu.add-account')}</span>
                </div>
            </div>
            <SwitchAccountModal isOpen={addAccountOpen}
                                onClose={() => setAddAccountOpen(false)}
                                action={AccountActions.ADD_ACCOUNT}
            />
        </Styles>
    )
};

export default ProfileAccountsSection;
