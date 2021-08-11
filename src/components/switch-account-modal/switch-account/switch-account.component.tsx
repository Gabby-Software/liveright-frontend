import React, {useContext} from 'react';
import Styles from './switch-account.styles';
import Card from "../../card/card.style";
import SwitchAccountModalContext from "../switch-account-modal.context";
import AccountActions from "../../../enums/account-actions.enum";
import profilePlaceholder from "../../../assets/media/profile-placeholder.png";
import {ReactComponent as PlusIcon} from "../../../assets/media/icons/add.svg";
import {toast} from "../../toast/toast.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import ProfileAccount from "../../profile/profile-account/profile-account.component";
import {useAuth} from "../../../hooks/auth.hook";
import {useDispatch} from "react-redux";
import {ACTION_SWITCH_ACCOUNT_REQUEST} from "../../../store/action-types";
import logger from "../../../managers/logger.manager";

const SwitchAccount = () => {
    const {onClose, setState} = useContext(SwitchAccountModalContext);
    const {first_name, last_name, avatar, accounts} = useAuth();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const switchAccount = (uuid: string) => {
        logger.info('SWITCH_ACCOUNT', 1, uuid);
        dispatch({
            type: ACTION_SWITCH_ACCOUNT_REQUEST,
            payload: {
                uuid,
                onSuccess: () => {
                    onClose();
                    toast.show({type: 'success', msg: t('alerts:switch-account-success')});
                }
            }
        });
    };
    return (
        <Styles>
            {
                accounts.map(({uuid, type, is_current}, i) => (
                    <Card className={'swa-card'} onClick={() => switchAccount(uuid)} key={i}>
                        <ProfileAccount first_name={first_name} last_name={last_name} type={type} image={avatar?.url || ''}
                                        active={is_current}/>
                    </Card>
                ))
            }
            {/*<Card className={'swa-card__add'} onClick={() => setState(AccountActions.ADD_ACCOUNT)}>*/}
            {/*    <span>{t('menu.add-account')}</span>*/}
            {/*</Card>*/}
        </Styles>
    )
};

export default SwitchAccount;
