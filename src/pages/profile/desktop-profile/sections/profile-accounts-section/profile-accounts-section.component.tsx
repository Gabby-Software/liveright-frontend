import React, {useState} from 'react';
import Styles from './profile-accounts-section.styles';
import ProfileTitle from "../../../../../components/profile/profile-title/profile-title.component";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import profilePlaceholder from '../../../../../assets/media/profile-placeholder.png';
import ProfileAccount from "../../../../../components/profile/profile-account/profile-account.component";
import SwitchAccountModal from "../../../../../components/switch-account-modal/switch-account-modal.component";
import AccountActions from "../../../../../enums/account-actions.enum";
import {useAuth} from "../../../../../hooks/auth.hook";
import {useDispatch} from "react-redux";
import {ACTION_SWITCH_ACCOUNT_REQUEST, ACTION_SWITCH_ACCOUNT_SUCCESS} from "../../../../../store/action-types";
import {toast} from "../../../../../components/toast/toast.component";

const ProfileAccountsSection = () => {
    const [addAccountOpen, setAddAccountOpen] = useState(false);
    const {accounts, first_name, last_name, avatar_thumb} = useAuth();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const switchAccount = (uuid: string) => {
        dispatch({
            type: ACTION_SWITCH_ACCOUNT_REQUEST, payload: {
                uuid,
                onSuccess: () => {
                    toast.show({type: 'success', msg: t('alerts:switch-account-success')});
                    window.scrollTo({
                        top:0,
                        behavior:'smooth'
                    })
                }
            }
        })
    };
    return (
        <Styles>
            <ProfileTitle title={t('profile:accounts')}/>
            <div className={'accounts__cont'}>
                {
                    accounts.map(({uuid, is_current, type}) => (
                        <ProfileAccount active={is_current} key={uuid} type={type} first_name={first_name}
                                        last_name={last_name} image={avatar_thumb || ''} onClick={() => switchAccount(uuid)}/>
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
